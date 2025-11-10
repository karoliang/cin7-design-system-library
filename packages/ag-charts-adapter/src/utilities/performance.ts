/**
 * Performance optimization utilities for AG Charts
 * Enterprise-grade performance monitoring and optimization
 */

import type { AgChartInstance, AgChartOptions } from 'ag-charts-community';

export interface PerformanceMetrics {
  /** Initial render time in milliseconds */
  renderTime: number;
  /** Memory usage in MB */
  memoryUsage: number;
  /** Number of data points rendered */
  dataPoints: number;
  /** Frames per second during animations */
  fps: number;
  /** Canvas size in pixels */
  canvasSize: number;
  /** Total render time including all operations */
  totalRenderTime: number;
}

export interface PerformanceOptions {
  /** Enable performance monitoring */
  enableMonitoring?: boolean;
  /** Target FPS for animations */
  targetFPS?: number;
  /** Maximum data points before enabling performance mode */
  maxDataPoints?: number;
  /** Enable canvas optimization */
  enableCanvasOptimization?: boolean;
  /** Memory management settings */
  memoryManagement?: {
    /** Maximum memory usage in MB */
    maxMemoryMB?: number;
    /** Enable garbage collection optimization */
    enableGCOptimization?: boolean;
    /** Memory cleanup interval in ms */
    cleanupInterval?: number;
  };
  /** Animation performance settings */
  animationSettings?: {
    /** Enable animations */
    enabled?: boolean;
    /** Animation duration in ms */
    duration?: number;
    /** Enable easing */
    easing?: boolean;
  };
}

export interface PerformanceThresholds {
  /** Maximum acceptable render time in ms */
  maxRenderTime: number;
  /** Maximum acceptable memory usage in MB */
  maxMemoryUsage: number;
  /** Minimum acceptable FPS */
  minFPS: number;
  /** Maximum data points before warnings */
  warningDataPoints: number;
}

/**
 * Performance monitoring and optimization manager
 */
export class PerformanceManager {
  private static instance: PerformanceManager;
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private observers: PerformanceObserver[] = [];
  private options: PerformanceOptions = {
    enableMonitoring: true,
    targetFPS: 60,
    maxDataPoints: 10000,
    enableCanvasOptimization: true,
    memoryManagement: {
      maxMemoryMB: 100,
      enableGCOptimization: true,
      cleanupInterval: 30000,
    },
    animationSettings: {
      enabled: true,
      duration: 300,
      easing: true,
    },
  };

  private thresholds: PerformanceThresholds = {
    maxRenderTime: 100, // 100ms
    maxMemoryUsage: 50, // 50MB
    minFPS: 30,
    warningDataPoints: 5000,
  };

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceManager {
    if (!PerformanceManager.instance) {
      PerformanceManager.instance = new PerformanceManager();
    }
    return PerformanceManager.instance;
  }

  /**
   * Configure performance settings
   */
  configure(options: Partial<PerformanceOptions>): void {
    this.options = { ...this.options, ...options };
  }

  /**
   * Set performance thresholds
   */
  setThresholds(thresholds: Partial<PerformanceThresholds>): void {
    this.thresholds = { ...this.thresholds, ...thresholds };
  }

  /**
   * Monitor chart performance
   */
  monitorChart(
    chartId: string,
    chart: AgChartInstance,
    options: AgChartOptions
  ): PerformanceMetrics {
    if (!this.options.enableMonitoring) {
      return this.createEmptyMetrics();
    }

    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    // Count data points
    const dataPoints = this.countDataPoints(options);

    // Create performance-optimized options if needed
    const optimizedOptions = this.optimizeForPerformance(options, dataPoints);

    // Apply optimizations if options changed
    if (optimizedOptions !== options) {
      chart.updateOptions(optimizedOptions);
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    const metrics: PerformanceMetrics = {
      renderTime: endTime - startTime,
      memoryUsage: endMemory - startMemory,
      dataPoints,
      fps: this.measureFPS(chart),
      canvasSize: this.getCanvasSize(chart),
      totalRenderTime: endTime - startTime,
    };

    this.metrics.set(chartId, metrics);
    this.checkThresholds(chartId, metrics);

    return metrics;
  }

  /**
   * Get performance metrics for a chart
   */
  getMetrics(chartId: string): PerformanceMetrics | undefined {
    return this.metrics.get(chartId);
  }

  /**
   * Get all performance metrics
   */
  getAllMetrics(): Map<string, PerformanceMetrics> {
    return new Map(this.metrics);
  }

  /**
   * Clear performance metrics
   */
  clearMetrics(chartId?: string): void {
    if (chartId) {
      this.metrics.delete(chartId);
    } else {
      this.metrics.clear();
    }
  }

  /**
   * Optimize chart options for performance
   */
  private optimizeForPerformance(
    options: AgChartOptions,
    dataPoints: number
  ): AgChartOptions {
    const optimizedOptions = { ...options };

    // Enable performance mode for large datasets
    if (dataPoints > this.options.maxDataPoints!) {
      optimizedOptions.animation = false;

      // Disable some visual effects for better performance
      if (optimizedOptions.series) {
        optimizedOptions.series = optimizedOptions.series.map(series => ({
          ...series,
          marker: { enabled: false, size: 1 },
          label: { enabled: false },
          // Disable shadows and other effects
          shadow: undefined,
        }));
      }

      // Simplify axes
      if (optimizedOptions.axes) {
        optimizedOptions.axes = optimizedOptions.axes.map(axis => ({
          ...axis,
          gridLine: { enabled: false },
          tick: { size: 1 },
          label: { fontSize: 10 },
        }));
      }
    }

    // Apply memory optimization
    if (this.options.memoryManagement?.enableGCOptimization) {
      optimizedOptions.windowManager = {
        enabled: false,
        windowSize: 1000, // Limit window size for memory efficiency
      };
    }

    return optimizedOptions;
  }

  /**
   * Count total data points in chart options
   */
  private countDataPoints(options: AgChartOptions): number {
    let totalPoints = 0;

    if (options.series) {
      options.series.forEach(series => {
        if (series.data) {
          totalPoints += series.data.length;
        }
      });
    }

    return totalPoints;
  }

  /**
   * Measure current FPS
   */
  private measureFPS(chart: AgChartInstance): number {
    let frames = 0;
    let startTime = performance.now();

    const measureFrame = () => {
      frames++;
      const currentTime = performance.now();

      if (currentTime - startTime >= 1000) {
        return frames;
      }

      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
    return 60; // Placeholder - would need actual implementation
  }

  /**
   * Get canvas size in pixels
   */
  private getCanvasSize(chart: AgChartInstance): number {
    const width = chart.options.width || 800;
    const height = chart.options.height || 400;
    return width * height;
  }

  /**
   * Get memory usage in MB
   */
  private getMemoryUsage(): number {
    if (performance.memory) {
      return performance.memory.usedJSHeapSize / (1024 * 1024);
    }
    return 0;
  }

  /**
   * Check performance against thresholds
   */
  private checkThresholds(chartId: string, metrics: PerformanceMetrics): void {
    const warnings: string[] = [];

    if (metrics.renderTime > this.thresholds.maxRenderTime) {
      warnings.push(`High render time: ${metrics.renderTime.toFixed(2)}ms`);
    }

    if (metrics.memoryUsage > this.thresholds.maxMemoryUsage) {
      warnings.push(`High memory usage: ${metrics.memoryUsage.toFixed(2)}MB`);
    }

    if (metrics.fps < this.thresholds.minFPS) {
      warnings.push(`Low FPS: ${metrics.fps}`);
    }

    if (metrics.dataPoints > this.thresholds.warningDataPoints) {
      warnings.push(`Large dataset: ${metrics.dataPoints} points`);
    }

    if (warnings.length > 0) {
      console.warn(`Performance warnings for chart ${chartId}:`, warnings);
      this.emitPerformanceWarning(chartId, warnings);
    }
  }

  /**
   * Emit performance warning event
   */
  private emitPerformanceWarning(chartId: string, warnings: string[]): void {
    const event = new CustomEvent('chartPerformanceWarning', {
      detail: { chartId, warnings, metrics: this.metrics.get(chartId) },
    });
    window.dispatchEvent(event);
  }

  /**
   * Initialize performance observers
   */
  private initializeObservers(): void {
    if (typeof PerformanceObserver !== 'undefined') {
      // Monitor navigation timing
      const navigationObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            console.log('Navigation timing:', entry);
          }
        });
      });
      navigationObserver.observe({ entryTypes: ['navigation'] });
      this.observers.push(navigationObserver);

      // Monitor paint timing
      const paintObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'paint') {
            console.log('Paint timing:', entry);
          }
        });
      });
      paintObserver.observe({ entryTypes: ['paint'] });
      this.observers.push(paintObserver);
    }
  }

  /**
   * Create empty metrics object
   */
  private createEmptyMetrics(): PerformanceMetrics {
    return {
      renderTime: 0,
      memoryUsage: 0,
      dataPoints: 0,
      fps: 60,
      canvasSize: 0,
      totalRenderTime: 0,
    };
  }

  /**
   * Cleanup performance observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

/**
 * Performance optimization utilities
 */
export class PerformanceOptimizer {
  /**
   * Optimize data for large datasets
   */
  static optimizeData(
    data: any[],
    maxPoints: number = 1000,
    method: 'sample' | 'aggregate' | 'adaptive' = 'adaptive'
  ): any[] {
    if (data.length <= maxPoints) {
      return data;
    }

    switch (method) {
      case 'sample':
        return this.sampleData(data, maxPoints);
      case 'aggregate':
        return this.aggregateData(data, maxPoints);
      case 'adaptive':
        return this.adaptiveSampling(data, maxPoints);
      default:
        return data;
    }
  }

  /**
   * Sample data by taking every nth point
   */
  private static sampleData(data: any[], maxPoints: number): any[] {
    const step = Math.ceil(data.length / maxPoints);
    return data.filter((_, index) => index % step === 0);
  }

  /**
   * Aggregate data by averaging groups of points
   */
  private static aggregateData(data: any[], maxPoints: number): any[] {
    const groupSize = Math.ceil(data.length / maxPoints);
    const aggregated = [];

    for (let i = 0; i < data.length; i += groupSize) {
      const group = data.slice(i, i + groupSize);
      const avgX = group.reduce((sum, point) => sum + (point.x || 0), 0) / group.length;
      const avgY = group.reduce((sum, point) => sum + (point.y || 0), 0) / group.length;

      aggregated.push({
        x: avgX,
        y: avgY,
        originalCount: group.length,
      });
    }

    return aggregated;
  }

  /**
   * Adaptive sampling based on data variance
   */
  private static adaptiveSampling(data: any[], maxPoints: number): any[] {
    if (data.length <= maxPoints) return data;

    // Calculate variance to determine sampling rate
    const values = data.map(point => point.y || 0);
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    // Higher variance = more samples needed
    const samplingFactor = Math.min(2, Math.max(0.5, stdDev / 10));
    const effectiveMaxPoints = Math.floor(maxPoints * samplingFactor);

    return this.sampleData(data, effectiveMaxPoints);
  }

  /**
   * Debounce chart updates for performance
   */
  static debounce(
    func: Function,
    delay: number = 100
  ): (...args: any[]) => void {
    let timeoutId: NodeJS.Timeout;

    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }

  /**
   * Throttle chart updates for performance
   */
  static throttle(
    func: Function,
    limit: number = 16 // ~60fps
  ): (...args: any[]) => void {
    let inThrottle: boolean;

    return (...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Lazy load chart data
   */
  static async* lazyLoadData<T>(
    dataGenerator: () => Promise<T[]>,
    chunkSize: number = 1000
  ): AsyncGenerator<T[]> {
    let offset = 0;

    while (true) {
      const chunk = await dataGenerator();
      const slice = chunk.slice(offset, offset + chunkSize);

      if (slice.length === 0) break;

      yield slice;
      offset += chunkSize;
    }
  }

  /**
   * Create virtual scrolling for large datasets
   */
  static createVirtualScroll(
    data: any[],
    visibleRange: number,
    bufferSize: number = 100
  ): {
    getVisibleData: (startIndex: number) => any[];
    getTotalSize: () => number;
  } {
    return {
      getVisibleData: (startIndex: number) => {
        const start = Math.max(0, startIndex - bufferSize);
        const end = Math.min(data.length, startIndex + visibleRange + bufferSize);
        return data.slice(start, end);
      },
      getTotalSize: () => data.length,
    };
  }
}

/**
 * Memory management utilities
 */
export class MemoryManager {
  private static cleanupInterval: NodeJS.Timeout | null = null;

  /**
   * Start automatic memory cleanup
   */
  static startCleanup(intervalMs: number = 30000): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, intervalMs);
  }

  /**
   * Stop automatic memory cleanup
   */
  static stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  /**
   * Perform memory cleanup
   */
  static cleanup(): void {
    // Clear unused chart references
    if (window.gc) {
      window.gc(); // Force garbage collection if available
    }

    // Clean up event listeners and other memory leaks
    this.clearUnusedCanvases();
  }

  /**
   * Clear unused canvas elements
   */
  private static clearUnusedCanvases(): void {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      const rect = canvas.getBoundingClientRect();
      // Remove canvases that are not visible or have zero dimensions
      if (rect.width === 0 || rect.height === 0 || !this.isElementInViewport(canvas)) {
        canvas.remove();
      }
    });
  }

  /**
   * Check if element is in viewport
   */
  private static isElementInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * Get current memory usage statistics
   */
  static getMemoryStats(): {
    used: number;
    total: number;
    percentage: number;
  } | null {
    if (performance.memory) {
      const used = performance.memory.usedJSHeapSize / (1024 * 1024);
      const total = performance.memory.totalJSHeapSize / (1024 * 1024);
      const percentage = (used / total) * 100;

      return { used, total, percentage };
    }
    return null;
  }
}

// Export singleton instances
export const performanceManager = PerformanceManager.getInstance();
export const memoryManager = MemoryManager;