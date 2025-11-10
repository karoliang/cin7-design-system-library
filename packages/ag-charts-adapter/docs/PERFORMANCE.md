# AG Charts Performance Optimization Guide

This guide provides comprehensive strategies for optimizing AG Charts performance across different use cases and data volumes.

## 📊 Table of Contents

1. [Performance Metrics](#performance-metrics)
2. [Large Dataset Handling](#large-dataset-handling)
3. [Memory Management](#memory-management)
4. [Rendering Optimization](#rendering-optimization)
5. [Real-time Data](#real-time-data)
6. [Mobile Performance](#mobile-performance)
7. [Monitoring & Profiling](#monitoring--profiling)

---

## 📈 Performance Metrics

### Key Indicators

- **Initial Render Time**: Time to first chart display
- **Update Latency**: Time to reflect data changes
- **Memory Usage**: RAM consumption during operation
- **Frame Rate**: Animation smoothness (target: 60fps)
- **Bundle Size**: Impact on application load time

### Benchmarks

| Data Points | Initial Render | Update Time | Memory Usage |
|-------------|----------------|-------------|--------------|
| 1,000       | <50ms          | <10ms       | ~2MB         |
| 10,000      | <200ms         | <50ms       | ~8MB         |
| 50,000      | <800ms         | <200ms      | ~32MB        |
| 100,000     | >2s            | >500ms      | ~64MB        |

---

## 🗄️ Large Dataset Handling

### Data Aggregation Strategies

#### 1. Time-based Aggregation

```tsx
const aggregateByTime = (data, interval) => {
  const aggregated = new Map();

  data.forEach(point => {
    const key = Math.floor(point.x / interval) * interval;

    if (!aggregated.has(key)) {
      aggregated.set(key, {
        x: key,
        values: [],
        count: 0
      });
    }

    aggregated.get(key).values.push(point.y);
    aggregated.get(key).count++;
  });

  // Convert to OHLC format
  return Array.from(aggregated.values()).map(bucket => ({
    x: bucket.x,
    open: Math.min(...bucket.values),
    high: Math.max(...bucket.values),
    low: Math.min(...bucket.values),
    close: bucket.values[bucket.values.length - 1],
    volume: bucket.count
  }));
};

// Usage
const aggregatedData = aggregateByTime(rawData, 3600000); // 1-hour intervals
```

#### 2. LTTB (Largest Triangle Three Buckets)

```tsx
const lttbDownsample = (data, threshold) => {
  if (data.length <= threshold) return data;

  const sampled = [];
  const bucketSize = (data.length - 2) / (threshold - 2);

  // Always include first and last points
  sampled.push(data[0]);

  for (let i = 0; i < threshold - 2; i++) {
    // Calculate bucket boundaries
    const avgXStart = Math.floor((i + 1) * bucketSize) + 1;
    const avgXEnd = Math.floor((i + 2) * bucketSize) + 1;

    const avgXStartIndex = Math.floor(avgXStart);
    const avgXEndIndex = Math.floor(avgXEnd);

    // Calculate average point in next bucket
    let avgX = 0;
    let avgY = 0;
    const avgRangeStart = Math.floor((i + 1) * bucketSize);
    const avgRangeEnd = Math.floor((i + 2) * bucketSize);

    for (let j = avgRangeStart; j < avgRangeEnd && j < data.length; j++) {
      avgX += data[j].x;
      avgY += data[j].y;
    }

    avgX /= avgRangeEnd - avgRangeStart;
    avgY /= avgRangeEnd - avgRangeStart;

    // Find point with largest triangle area
    let maxArea = -1;
    let maxAreaIndex = avgRangeStart;

    for (let j = avgRangeStart; j < avgRangeEnd && j < data.length; j++) {
      const area = Math.abs(
        (sampled[sampled.length - 1].x - avgX) * (data[j].y - sampled[sampled.length - 1].y) -
        (sampled[sampled.length - 1].x - data[j].x) * (avgY - sampled[sampled.length - 1].y)
      );

      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = j;
      }
    }

    sampled.push(data[maxAreaIndex]);
  }

  sampled.push(data[data.length - 1]);
  return sampled;
};
```

#### 3. Dynamic Sampling

```tsx
const getOptimalDataPoints = (containerWidth, dataDensity = 1) => {
  // Rule of thumb: 1 data point per 2 pixels
  const basePoints = Math.floor(containerWidth / 2);
  return Math.max(100, Math.min(1000, basePoints * dataDensity));
};

const ResponsiveChart = ({ data, ...props }) => {
  const [containerSize, setContainerSize] = useState({ width: 800 });
  const [sampledData, setSampledData] = useState(data);

  useEffect(() => {
    const optimalPoints = getOptimalDataPoints(containerSize.width);

    if (data.length > optimalPoints) {
      setSampledData(lttbDownsample(data, optimalPoints));
    } else {
      setSampledData(data);
    }
  }, [data, containerSize]);

  return (
    <div
      ref={(el) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          setContainerSize({ width: rect.width, height: rect.height });
        }
      }}
    >
      <Chart data={sampledData} {...props} />
    </div>
  );
};
```

### Progressive Loading

```tsx
const ProgressiveChart = ({ dataSource, ...props }) => {
  const [loadedData, setLoadedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreData = useCallback(async (offset = 0, limit = 10000) => {
    setIsLoading(true);

    try {
      const newData = await dataSource.fetch(offset, limit);
      setLoadedData(prev => [...prev, ...newData]);

      // Continue loading if there's more data
      if (newData.length === limit) {
        setTimeout(() => loadMoreData(offset + limit, limit), 100);
      }
    } finally {
      setIsLoading(false);
    }
  }, [dataSource]);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <Chart data={loadedData} {...props} />
    </div>
  );
};
```

---

## 💾 Memory Management

### Chart Cleanup

```tsx
import { useEffect, useRef } from 'react';

const OptimizedChart = ({ data, ...props }) => {
  const chartRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup chart instance
      if (chartRef.current && chartRef.current.destroy) {
        chartRef.current.destroy();
        chartRef.current = null;
      }

      // Clear any pending timeouts/intervals
      if (cleanupRef.current) {
        clearTimeout(cleanupRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Debounced chart updates
    if (cleanupRef.current) {
      clearTimeout(cleanupRef.current);
    }

    cleanupRef.current = setTimeout(() => {
      if (chartRef.current && chartRef.current.updateOptions) {
        chartRef.current.updateOptions({ data });
      }
    }, 100); // 100ms debounce
  }, [data]);

  return <Chart ref={chartRef} {...props} />;
};
```

### Memory Pool Pattern

```tsx
class ChartDataPool {
  constructor(poolSize = 1000) {
    this.pool = [];
    this.poolSize = poolSize;
    this.allocated = new Set();
  }

  acquire() {
    if (this.pool.length > 0) {
      const item = this.pool.pop();
      this.allocated.add(item);
      return item;
    }

    // Create new item if pool is empty
    const item = { x: 0, y: 0, metadata: {} };
    this.allocated.add(item);
    return item;
  }

  release(item) {
    if (this.allocated.has(item)) {
      // Reset item state
      item.x = 0;
      item.y = 0;
      item.metadata = {};

      this.allocated.delete(item);

      if (this.pool.length < this.poolSize) {
        this.pool.push(item);
      }
    }
  }

  clear() {
    this.pool = [];
    this.allocated.clear();
  }
}

// Usage in high-frequency updates
const dataPool = new ChartDataPool();

const HighFrequencyChart = ({ dataStream }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDataPoint = dataStream.getNext();

      setChartData(prevData => {
        // Release old data points back to pool
        prevData.forEach(point => dataPool.release(point));

        // Acquire new data points
        const transformedData = newDataPoint.map(rawPoint => {
          const pooledPoint = dataPool.acquire();
          pooledPoint.x = rawPoint.x;
          pooledPoint.y = rawPoint.y;
          return pooledPoint;
        });

        return transformedData;
      });
    }, 16); // ~60fps

    return () => {
      clearInterval(interval);
      dataPool.clear();
    };
  }, [dataStream]);

  return <Chart data={chartData} />;
};
```

---

## 🎨 Rendering Optimization

### Virtual Scrolling

```tsx
const VirtualScrollChart = ({ data, height = 400, itemHeight = 30 }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(height);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    data.length
  );

  const visibleData = data.slice(visibleStart, visibleEnd);

  return (
    <div
      style={{ height, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: data.length * itemHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: visibleStart * itemHeight,
            height: visibleData.length * itemHeight,
            width: '100%'
          }}
        >
          <Chart
            data={visibleData}
            height={visibleData.length * itemHeight}
            virtualScrolling={{
              enabled: true,
              startIndex: visibleStart,
              endIndex: visibleEnd
            }}
          />
        </div>
      </div>
    </div>
  );
};
```

### Canvas Rendering for Large Datasets

```tsx
const CanvasChart = ({ data, width, height }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up drawing context
    ctx.strokeStyle = '#2196f3';
    ctx.lineWidth = 2;
    ctx.beginPath();

    // Draw data points
    data.forEach((point, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (point.y / Math.max(...data.map(d => d.y))) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw points only for visible data
    const step = Math.max(1, Math.floor(data.length / (width / 2)));
    data.forEach((point, index) => {
      if (index % step === 0) {
        const x = (index / (data.length - 1)) * width;
        const y = height - (point.y / Math.max(...data.map(d => d.y))) * height;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
  }, [data, width, height]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(drawChart);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawChart]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ border: '1px solid #ddd' }}
    />
  );
};
```

### Web Workers for Data Processing

```tsx
// worker.ts
self.onmessage = (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'AGGREGATE':
      const aggregated = aggregateData(data.data, data.interval);
      self.postMessage({ type: 'AGGREGATED', data: aggregated });
      break;

    case 'FILTER':
      const filtered = filterData(data.data, data.filters);
      self.postMessage({ type: 'FILTERED', data: filtered });
      break;

    case 'TRANSFORM':
      const transformed = transformData(data.data, data.transformations);
      self.postMessage({ type: 'TRANSFORMED', data: transformed });
      break;
  }
};

// Component usage
const WorkerChart = ({ rawData }) => {
  const [processedData, setProcessedData] = useState([]);
  const workerRef = useRef(null);

  useEffect(() => {
    // Create worker
    workerRef.current = new Worker('./worker.js');

    workerRef.current.onmessage = (event) => {
      const { type, data } = event.data;

      switch (type) {
        case 'AGGREGATED':
          setProcessedData(data);
          break;
      }
    };

    // Send data to worker
    workerRef.current.postMessage({
      type: 'AGGREGATE',
      data: {
        data: rawData,
        interval: 1000 // 1-second intervals
      }
    });

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, [rawData]);

  return <Chart data={processedData} />;
};
```

---

## ⚡ Real-time Data Optimization

### Debounced Updates

```tsx
const useDebouncedData = (data, delay = 100) => {
  const [debouncedData, setDebouncedData] = useState(data);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setDebouncedData(data);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay]);

  return debouncedData;
};

const RealTimeChart = ({ liveData }) => {
  const debouncedData = useDebouncedData(liveData, 50);

  return <Chart data={debouncedData} />;
};
```

### Sliding Window

```tsx
const SlidingWindowChart = ({ dataStream, windowSize = 100 }) => {
  const [windowData, setWindowData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = dataStream.getNext();

      setWindowData(prevData => {
        const updatedData = [...prevData, newPoint];

        // Keep only the last N points
        if (updatedData.length > windowSize) {
          return updatedData.slice(-windowSize);
        }

        return updatedData;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [dataStream, windowSize]);

  return <Chart data={windowData} />;
};
```

### Differential Updates

```tsx
const DifferentialChart = ({ dataSource }) => {
  const [baseData, setBaseData] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const processUpdates = async () => {
      const newUpdates = await dataSource.getUpdates();

      if (newUpdates.length > 0) {
        // Apply updates to base data
        setBaseData(prevData => {
          const updatedData = [...prevData];

          newUpdates.forEach(update => {
            if (update.type === 'add') {
              updatedData.push(update.data);
            } else if (update.type === 'update') {
              const index = updatedData.findIndex(d => d.id === update.id);
              if (index !== -1) {
                updatedData[index] = { ...updatedData[index], ...update.data };
              }
            } else if (update.type === 'remove') {
              const index = updatedData.findIndex(d => d.id === update.id);
              if (index !== -1) {
                updatedData.splice(index, 1);
              }
            }
          });

          return updatedData;
        });

        setUpdates([]);
      }
    };

    const interval = setInterval(processUpdates, 5000);
    return () => clearInterval(interval);
  }, [dataSource]);

  return <Chart data={baseData} />;
};
```

---

## 📱 Mobile Performance

### Touch-Optimized Interactions

```tsx
const MobileOptimizedChart = ({ data, ...props }) => {
  const [touchState, setTouchState] = useState(null);

  const handleTouchStart = (e) => {
    setTouchState({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      timestamp: Date.now()
    });
  };

  const handleTouchMove = (e) => {
    if (!touchState) return;

    const deltaX = e.touches[0].clientX - touchState.startX;
    const deltaY = e.touches[0].clientY - touchState.startY;
    const deltaTime = Date.now() - touchState.timestamp;

    // Debounce touch events for better performance
    if (deltaTime > 16) { // ~60fps
      // Handle pan/zoom
      setTouchState({
        ...touchState,
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        timestamp: Date.now()
      });
    }
  };

  return (
    <Chart
      data={data}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      performance={{
        reduceAnimations: true,
        simplifyTooltips: true,
        disableShadows: true
      }}
      {...props}
    />
  );
};
```

### Responsive Data Density

```tsx
const AdaptiveDensityChart = ({ data }) => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isLowEnd: false,
    maxDataPoints: 1000
  });

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isLowEnd = connection ? connection.effectiveType.includes('2g') : false;

      setDeviceInfo({
        isMobile,
        isLowEnd,
        maxDataPoints: isMobile ? (isLowEnd ? 200 : 500) : 1000
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const optimizedData = useMemo(() => {
    if (data.length <= deviceInfo.maxDataPoints) {
      return data;
    }

    return lttbDownsample(data, deviceInfo.maxDataPoints);
  }, [data, deviceInfo.maxDataPoints]);

  return (
    <Chart
      data={optimizedData}
      performance={{
        animations: !deviceInfo.isLowEnd,
        shadows: !deviceInfo.isMobile,
        gradients: !deviceInfo.isLowEnd
      }}
    />
  );
};
```

---

## 🔍 Monitoring & Profiling

### Performance Monitoring Hook

```tsx
const usePerformanceMonitor = (chartName) => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    updateTime: 0,
    memoryUsage: 0,
    frameRate: 60
  });

  const startMeasure = useCallback((operation) => {
    performance.mark(`${chartName}-${operation}-start`);
  }, [chartName]);

  const endMeasure = useCallback((operation) => {
    performance.mark(`${chartName}-${operation}-end`);
    performance.measure(
      `${chartName}-${operation}`,
      `${chartName}-${operation}-start`,
      `${chartName}-${operation}-end`
    );

    const measure = performance.getEntriesByName(`${chartName}-${operation}`)[0];

    setMetrics(prev => ({
      ...prev,
      [`${operation}Time`]: measure.duration
    }));

    // Clean up marks
    performance.clearMarks(`${chartName}-${operation}-start`);
    performance.clearMarks(`${chartName}-${operation}-end`);
  }, [chartName]);

  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      setMetrics(prev => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize
      }));
    }
  }, []);

  return { metrics, startMeasure, endMeasure, measureMemory };
};

// Usage
const MonitoredChart = ({ data, ...props }) => {
  const { metrics, startMeasure, endMeasure } = usePerformanceMonitor('MainChart');

  useEffect(() => {
    startMeasure('render');
    // Chart renders...
    setTimeout(() => endMeasure('render'), 0);
  }, [data]);

  return (
    <div>
      <Chart data={data} {...props} />
      <div style={{ fontSize: 12, color: '#666' }}>
        Render: {metrics.renderTime.toFixed(2)}ms |
        Memory: {(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB
      </div>
    </div>
  );
};
```

### Performance Budget Validation

```tsx
const PERFORMANCE_BUDGETS = {
  maxRenderTime: 100, // ms
  maxUpdateTime: 50,  // ms
  maxMemoryUsage: 50 * 1024 * 1024, // 50MB
  minFrameRate: 30    // fps
};

const validatePerformance = (metrics) => {
  const violations = [];

  if (metrics.renderTime > PERFORMANCE_BUDGETS.maxRenderTime) {
    violations.push(`Render time ${metrics.renderTime}ms exceeds budget of ${PERFORMANCE_BUDGETS.maxRenderTime}ms`);
  }

  if (metrics.updateTime > PERFORMANCE_BUDGETS.maxUpdateTime) {
    violations.push(`Update time ${metrics.updateTime}ms exceeds budget of ${PERFORMANCE_BUDGETS.maxUpdateTime}ms`);
  }

  if (metrics.memoryUsage > PERFORMANCE_BUDGETS.maxMemoryUsage) {
    violations.push(`Memory usage ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB exceeds budget of ${(PERFORMANCE_BUDGETS.maxMemoryUsage / 1024 / 1024)}MB`);
  }

  if (metrics.frameRate < PERFORMANCE_BUDGETS.minFrameRate) {
    violations.push(`Frame rate ${metrics.frameRate}fps below minimum of ${PERFORMANCE_BUDGETS.minFrameRate}fps`);
  }

  return violations;
};

const PerformanceValidatedChart = ({ data, ...props }) => {
  const [violations, setViolations] = useState([]);
  const { metrics, startMeasure, endMeasure, measureMemory } = usePerformanceMonitor('ValidatedChart');

  useEffect(() => {
    startMeasure('render');

    // Simulate chart render
    setTimeout(() => {
      endMeasure('render');
      measureMemory();

      const newViolations = validatePerformance(metrics);
      if (newViolations.length > 0) {
        console.warn('Performance budget violations:', newViolations);
        setViolations(newViolations);
      }
    }, 0);
  }, [data]);

  return (
    <div>
      <Chart data={data} {...props} />
      {violations.length > 0 && (
        <div style={{ backgroundColor: '#ffebee', padding: 8, marginTop: 8 }}>
          <strong>Performance Warnings:</strong>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {violations.map((violation, index) => (
              <li key={index} style={{ fontSize: 12 }}>{violation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
```

---

## 📋 Performance Checklist

### ✅ Pre-Deployment Checklist

- [ ] **Data Optimization**
  - [ ] Implement data aggregation for >10k points
  - [ ] Use LTTB downsampling for line charts
  - [ ] Enable virtual scrolling for large datasets
  - [ ] Implement progressive loading

- [ ] **Memory Management**
  - [ ] Proper chart cleanup on unmount
  - [ ] Implement object pooling for high-frequency updates
  - [ ] Monitor memory leaks in long-running applications
  - [ ] Set memory limits for data caching

- [ ] **Rendering Optimization**
  - [ ] Disable animations for low-end devices
  - [ ] Use Canvas rendering for >50k points
  - [ ] Implement Web Workers for data processing
  - [ ] Optimize touch events for mobile

- [ ] **Real-time Performance**
  - [ ] Implement debounced updates
  - [ ] Use sliding windows for streaming data
  - [ ] Apply differential updates
  - [ ] Set appropriate update intervals

- [ ] **Mobile Optimization**
  - [ ] Reduce data density on mobile
  - [ ] Simplify visual effects
  - [ ] Optimize touch interactions
  - [ ] Test on various devices

### 🚀 Performance Targets

| Metric | Target | Excellent |
|--------|--------|-----------|
| Initial Render | <100ms | <50ms |
| Update Latency | <50ms | <20ms |
| Memory Usage | <50MB | <20MB |
| Frame Rate | >30fps | 60fps |
| Bundle Size | <500KB | <200KB |

---

**Need more help?** Check out our [Examples](./EXAMPLES.md) or [Advanced Charts Documentation](./ADVANCED_CHARTS.md) for specific implementation guidance.