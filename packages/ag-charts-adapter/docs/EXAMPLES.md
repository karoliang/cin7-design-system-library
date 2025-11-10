# AG Charts Component Examples

This document provides comprehensive examples of all AG Charts components with real-world data scenarios and advanced configurations.

## 📋 Table of Contents

1. [RangeChart Examples](#rangechart-examples)
2. [OHLCChart Examples](#ohlcchart-examples)
3. [HeatmapChart Examples](#heatmapchart-examples)
4. [TreemapChart Examples](#treemapchart-examples)
5. [Performance Examples](#performance-examples)
6. [Integration Examples](#integration-examples)

---

## 📊 RangeChart Examples

### Example 1: Temperature Monitoring

```tsx
import { RangeChart } from '@cin7/ag-charts-adapter/react';

const TemperatureRangeExample = () => {
  const weatherData = [
    { x: 'Mon', min: 18, max: 28, category: 'Day' },
    { x: 'Mon', min: 12, max: 16, category: 'Night' },
    { x: 'Tue', min: 20, max: 30, category: 'Day' },
    { x: 'Tue', min: 14, max: 18, category: 'Night' },
    { x: 'Wed', min: 16, max: 25, category: 'Day' },
    { x: 'Wed', min: 11, max: 15, category: 'Night' },
    { x: 'Thu', min: 19, max: 29, category: 'Day' },
    { x: 'Thu', min: 13, max: 17, category: 'Night' },
    { x: 'Fri', min: 21, max: 31, category: 'Day' },
    { x: 'Fri', min: 15, max: 19, category: 'Night' },
  ];

  return (
    <RangeChart
      title="Weekly Temperature Forecast"
      subtitle="Day vs Night Temperature Ranges"
      series={[
        {
          name: 'Day Time',
          data: weatherData.filter(d => d.category === 'Day'),
          color: '#ff9800',
          fillOpacity: 0.6,
        },
        {
          name: 'Night Time',
          data: weatherData.filter(d => d.category === 'Night'),
          color: '#2196f3',
          fillOpacity: 0.6,
        },
      ]}
      height={400}
      xAxis={{
        title: 'Day of Week',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      }}
      yAxis={{
        title: 'Temperature (°C)',
        min: 0,
        max: 40,
        labelFormat: '{value}°C',
      }}
      legend={true}
      markers={true}
    />
  );
};
```

### Example 2: Stock Price Bands

```tsx
const StockBandsExample = () => {
  const stockData = [
    { x: '2024-01', min: 145, max: 165 },
    { x: '2024-02', min: 150, max: 172 },
    { x: '2024-03', min: 148, max: 168 },
    { x: '2024-04', min: 155, max: 178 },
    { x: '2024-05', min: 160, max: 182 },
    { x: '2024-06', min: 158, max: 185 },
  ];

  return (
    <RangeChart
      title="AAPL Price Bands"
      subtitle="Monthly Support and Resistance Levels"
      series={[
        {
          name: 'Price Range',
          data: stockData,
          color: '#4caf50',
          strokeWidth: 2,
          fillOpacity: 0.3,
        },
      ]}
      dataLabels={true}
      fillOpacity={0.4}
      chartOptions={{
        theme: {
          mode: 'light',
          palette: {
            fills: ['#4caf50'],
            strokes: ['#2e7d32'],
          },
        },
      }}
    />
  );
};
```

---

## 💹 OHLCChart Examples

### Example 1: Daily Stock Analysis

```tsx
import { OHLCChart } from '@cin7/ag-charts-adapter/react';

const DailyStockExample = () => {
  const stockData = [
    {
      x: '2024-01-15',
      open: 182.52,
      high: 185.68,
      low: 181.25,
      close: 184.91,
      volume: 52473900
    },
    {
      x: '2024-01-16',
      open: 184.92,
      high: 186.35,
      low: 183.47,
      close: 185.85,
      volume: 48265300
    },
    {
      x: '2024-01-17',
      open: 185.90,
      high: 188.44,
      low: 184.63,
      close: 187.65,
      volume: 61328900
    },
    {
      x: '2024-01-18',
      open: 187.50,
      high: 189.78,
      low: 186.92,
      close: 188.03,
      volume: 55847200
    },
    {
      x: '2024-01-19',
      open: 188.05,
      high: 190.35,
      low: 187.24,
      close: 189.84,
      volume: 58294700
    },
  ];

  return (
    <OHLCChart
      title="AAPL Stock Price"
      subtitle="Daily OHLC with Volume"
      variant="candlestick"
      showVolume={true}
      series={[
        {
          name: 'AAPL',
          data: stockData,
          bullishColor: '#4caf50',
          bearishColor: '#f44336',
          candleWidth: 8,
          wicks: true,
        },
      ]}
      height={500}
      xAxis={{
        title: 'Date',
        type: 'time',
        labelFormat: '%b %d',
      }}
      yAxis={{
        title: 'Price ($)',
        min: 180,
        max: 192,
        labelFormat: '${value:.2f}',
      }}
      legend={false}
    />
  );
};
```

### Example 2: Cryptocurrency Analysis

```tsx
const CryptoExample = () => {
  const btcData = [
    {
      x: '2024-01-01',
      open: 42256.87,
      high: 43578.23,
      low: 41892.45,
      close: 43234.78,
      volume: 28456789012
    },
    {
      x: '2024-01-02',
      open: 43234.78,
      high: 44567.89,
      low: 42678.34,
      close: 44123.45,
      volume: 31245678901
    },
    {
      x: '2024-01-03',
      open: 44123.45,
      high: 45234.56,
      low: 43567.89,
      close: 44876.23,
      volume: 29876543210
    },
  ];

  return (
    <OHLCChart
      title="Bitcoin Price Analysis"
      variant="hollow-candlestick"
      showVolume={true}
      volumeColor="#ff9800"
      series={[
        {
          name: 'BTC/USD',
          data: btcData,
          bullishColor: '#ff9800',
          bearishColor: '#03a9f4',
          candleWidth: 6,
        },
      ]}
      chartOptions={{
        theme: {
          mode: 'dark',
          palette: {
            fills: ['#ff9800', '#03a9f4'],
            strokes: ['#f57c00', '#0277bd'],
          },
        },
        background: {
          fill: '#1a1a1a',
        },
      }}
    />
  );
};
```

---

## 🔥 HeatmapChart Examples

### Example 1: Correlation Matrix

```tsx
import { HeatmapChart } from '@cin7/ag-charts-adapter/react';

const CorrelationMatrixExample = () => {
  const correlationData = [
    { x: 'Stocks', y: 'Stocks', value: 1.00 },
    { x: 'Stocks', y: 'Bonds', value: -0.23 },
    { x: 'Stocks', y: 'Real Estate', value: 0.74 },
    { x: 'Stocks', y: 'Commodities', value: 0.31 },
    { x: 'Stocks', y: 'Cash', value: -0.08 },

    { x: 'Bonds', y: 'Stocks', value: -0.23 },
    { x: 'Bonds', y: 'Bonds', value: 1.00 },
    { x: 'Bonds', y: 'Real Estate', value: -0.15 },
    { x: 'Bonds', y: 'Commodities', value: -0.42 },
    { x: 'Bonds', y: 'Cash', value: 0.18 },

    { x: 'Real Estate', y: 'Stocks', value: 0.74 },
    { x: 'Real Estate', y: 'Bonds', value: -0.15 },
    { x: 'Real Estate', y: 'Real Estate', value: 1.00 },
    { x: 'Real Estate', y: 'Commodities', value: 0.56 },
    { x: 'Real Estate', y: 'Cash', value: -0.12 },

    { x: 'Commodities', y: 'Stocks', value: 0.31 },
    { x: 'Commodities', y: 'Bonds', value: -0.42 },
    { x: 'Commodities', y: 'Real Estate', value: 0.56 },
    { x: 'Commodities', y: 'Commodities', value: 1.00 },
    { x: 'Commodities', y: 'Cash', value: -0.28 },

    { x: 'Cash', y: 'Stocks', value: -0.08 },
    { x: 'Cash', y: 'Bonds', value: 0.18 },
    { x: 'Cash', y: 'Real Estate', value: -0.12 },
    { x: 'Cash', y: 'Commodities', value: -0.28 },
    { x: 'Cash', y: 'Cash', value: 1.00 },
  ];

  const categories = ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'];

  return (
    <HeatmapChart
      title="Asset Class Correlation Matrix"
      subtitle="5-Year Correlation Analysis"
      series={[
        {
          name: 'Correlation',
          data: correlationData,
          colorScheme: 'blues',
          colorRange: {
            min: '#d32f2f',
            middle: '#ffffff',
            max: '#1976d2',
          },
          dataLabels: true,
          labelFormat: '{value:.2f}',
          borderWidth: 2,
          borderColor: '#ffffff',
        },
      ]}
      xCategories={categories}
      yCategories={categories}
      colorScale='linear'
      legend={true}
      legendPosition='right'
      height={450}
    />
  );
};
```

### Example 2: Website Activity Heatmap

```tsx
const ActivityHeatmapExample = () => {
  const generateActivityData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const data = [];

    days.forEach(day => {
      hours.forEach(hour => {
        // Simulate activity pattern
        let baseActivity = Math.random() * 50;

        // Increase activity during business hours
        if (hour >= 9 && hour <= 17) {
          baseActivity += 150;
        }

        // Decrease activity on weekends
        if (day === 'Sat' || day === 'Sun') {
          baseActivity *= 0.3;
        }

        // Peak hours
        if ((hour === 12 || hour === 15) && day !== 'Sat' && day !== 'Sun') {
          baseActivity += 100;
        }

        data.push({
          x: day,
          y: hour.toString().padStart(2, '0') + ':00',
          value: Math.round(baseActivity),
        });
      });
    });

    return data;
  };

  return (
    <HeatmapChart
      title="Weekly Website Activity"
      subtitle="User Activity by Day and Hour"
      series={[
        {
          name: 'Active Users',
          data: generateActivityData(),
          colorScheme: 'viridis',
          dataLabels: false,
          borderWidth: 1,
          borderColor: '#f5f5f5',
        },
      ]}
      xCategories={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
      yCategories={Array.from({ length: 24 }, (_, i) =>
        i.toString().padStart(2, '0') + ':00'
      )}
      xAxis={{
        title: 'Day of Week',
      }}
      yAxis={{
        title: 'Hour of Day',
      }}
      height={500}
      chartOptions={{
        theme: {
          mode: 'light',
        },
      }}
    />
  );
};
```

---

## 🌳 TreemapChart Examples

### Example 1: Portfolio Allocation

```tsx
import { TreemapChart } from '@cin7/ag-charts-adapter/react';

const PortfolioAllocationExample = () => {
  const portfolioData = [
    {
      name: 'Equities',
      value: 450000,
      children: [
        { name: 'US Large Cap', value: 180000 },
        { name: 'International', value: 120000 },
        { name: 'Emerging Markets', value: 90000 },
        { name: 'Small Cap', value: 60000 },
      ],
    },
    {
      name: 'Fixed Income',
      value: 280000,
      children: [
        { name: 'Government Bonds', value: 150000 },
        { name: 'Corporate Bonds', value: 80000 },
        { name: 'Municipal Bonds', value: 50000 },
      ],
    },
    {
      name: 'Real Estate',
      value: 120000,
      children: [
        { name: 'REITs', value: 80000 },
        { name: 'Direct Property', value: 40000 },
      ],
    },
    {
      name: 'Commodities',
      value: 80000,
      children: [
        { name: 'Gold', value: 40000 },
        { name: 'Oil & Gas', value: 25000 },
        { name: 'Others', value: 15000 },
      ],
    },
    {
      name: 'Cash & Equivalents',
      value: 70000,
    },
  ];

  return (
    <TreemapChart
      title="Investment Portfolio Allocation"
      subtitle="Total Value: $1,000,000"
      series={[
        {
          name: 'Portfolio',
          data: portfolioData,
          colorScheme: 'category20',
          dataLabels: true,
          labelFormat: '{name}\n${value:,.0f}\n{percentage}%',
          padding: 2,
          showBorders: true,
          borderColor: '#ffffff',
        },
      ]}
      layout="squarify"
      height={500}
      interactive={true}
    />
  );
};
```

### Example 2: Sales Performance by Region

```tsx
const SalesByRegionExample = () => {
  const salesData = [
    {
      name: 'North America',
      value: 2450000,
      metadata: {
        growth: '+12%',
        representatives: 45,
        target: 2500000,
      },
      children: [
        {
          name: 'United States',
          value: 1850000,
          metadata: { growth: '+15%', representatives: 35 }
        },
        {
          name: 'Canada',
          value: 450000,
          metadata: { growth: '+8%', representatives: 8 }
        },
        {
          name: 'Mexico',
          value: 150000,
          metadata: { growth: '+5%', representatives: 2 }
        },
      ],
    },
    {
      name: 'Europe',
      value: 1890000,
      metadata: {
        growth: '+18%',
        representatives: 38,
        target: 2000000,
      },
      children: [
        {
          name: 'United Kingdom',
          value: 520000,
          metadata: { growth: '+20%', representatives: 12 }
        },
        {
          name: 'Germany',
          value: 480000,
          metadata: { growth: '+16%', representatives: 10 }
        },
        {
          name: 'France',
          value: 340000,
          metadata: { growth: '+14%', representatives: 8 }
        },
        {
          name: 'Others',
          value: 550000,
          metadata: { growth: '+22%', representatives: 8 }
        },
      ],
    },
    {
      name: 'Asia Pacific',
      value: 1680000,
      metadata: {
        growth: '+25%',
        representatives: 32,
        target: 1800000,
      },
      children: [
        {
          name: 'China',
          value: 680000,
          metadata: { growth: '+30%', representatives: 15 }
        },
        {
          name: 'Japan',
          value: 420000,
          metadata: { growth: '+18%', representatives: 8 }
        },
        {
          name: 'Australia',
          value: 280000,
          metadata: { growth: '+20%', representatives: 5 }
        },
        {
          name: 'Others',
          value: 300000,
          metadata: { growth: '+28%', representatives: 4 }
        },
      ],
    },
  ];

  return (
    <TreemapChart
      title="Sales Performance by Region"
      subtitle="Q4 2024 Results"
      series={[
        {
          name: 'Sales',
          data: salesData,
          colorScheme: 'blues',
          colorByValue: true,
          dataLabels: true,
          labelFormat: '{name}\n${value:,.0f}',
          padding: 3,
          showBorders: true,
          borderColor: '#ffffff',
          headerHeight: 30,
        },
      ]}
      layout="slice-dice"
      height={550}
      chartOptions={{
        theme: {
          mode: 'light',
        },
      }}
    />
  );
};
```

---

## ⚡ Performance Examples

### Example 1: Large Dataset Optimization

```tsx
const LargeDatasetExample = () => {
  // Generate 50,000 data points
  const generateLargeDataset = () => {
    const data = [];
    const startDate = new Date('2023-01-01');

    for (let i = 0; i < 50000; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      data.push({
        x: date.toISOString().split('T')[0],
        min: 100 + Math.random() * 50,
        max: 150 + Math.random() * 100,
      });
    }

    return data;
  };

  // Data aggregation for performance
  const aggregateData = (data, windowSize) => {
    const aggregated = [];

    for (let i = 0; i < data.length; i += windowSize) {
      const window = data.slice(i, i + windowSize);
      const min = Math.min(...window.map(d => d.min));
      const max = Math.max(...window.map(d => d.max));

      aggregated.push({
        x: window[Math.floor(window.length / 2)].x,
        min,
        max,
      });
    }

    return aggregated;
  };

  const rawData = generateLargeDataset();
  const aggregatedData = aggregateData(rawData, 100); // Aggregate to 500 points

  return (
    <RangeChart
      title="Large Dataset Performance"
      subtitle={`Showing ${aggregatedData.length} aggregated points from 50,000 total`}
      series={[
        {
          name: 'Performance Data',
          data: aggregatedData,
          color: '#673ab7',
          fillOpacity: 0.3,
        },
      ]}
      height={400}
      chartOptions={{
        // Enable performance optimizations
        animation: { enabled: false }, // Disable for large datasets
        sampling: {
          enabled: true,
          threshold: 1000,
        },
      }}
    />
  );
};
```

### Example 2: Real-time Data Streaming

```tsx
import { useState, useEffect } from 'react';

const RealTimeExample = () => {
  const [data, setData] = useState([
    { x: '00:00', min: 20, max: 30 },
    { x: '00:01', min: 22, max: 32 },
    { x: '00:02', min: 18, max: 28 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const now = new Date();
        const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const newDataPoint = {
          x: timeString,
          min: 15 + Math.random() * 20,
          max: 25 + Math.random() * 25,
        };

        // Keep only last 20 points for performance
        const updatedData = [...prevData, newDataPoint];
        return updatedData.slice(-20);
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <RangeChart
      title="Real-time Monitoring"
      subtitle="Updates every 2 seconds"
      series={[
        {
          name: 'Live Data',
          data: data,
          color: '#ff5722',
          fillOpacity: 0.4,
        },
      ]}
      height={300}
      chartOptions={{
        animation: {
          enabled: true,
          duration: 300, // Faster animations for real-time
        },
      }}
    />
  );
};
```

---

## 🔗 Integration Examples

### Example 1: Dashboard Integration

```tsx
import { Grid, GridItem } from '@cin7/design-system';

const DashboardExample = () => {
  const salesData = [
    { x: 'Q1', min: 850000, max: 920000 },
    { x: 'Q2', min: 910000, max: 980000 },
    { x: 'Q3', min: 980000, max: 1050000 },
    { x: 'Q4', min: 1020000, max: 1150000 },
  ];

  const regionData = [
    { name: 'North America', value: 2450000 },
    { name: 'Europe', value: 1890000 },
    { name: 'Asia Pacific', value: 1680000 },
    { name: 'Latin America', value: 680000 },
    { name: 'Africa', value: 420000 },
  ];

  return (
    <Grid columns={2} gap={4}>
      <GridItem>
        <RangeChart
          title="Quarterly Revenue Range"
          series={[{
            name: 'Revenue',
            data: salesData,
            color: '#4caf50',
          }]}
          height={300}
        />
      </GridItem>

      <GridItem>
        <TreemapChart
          title="Revenue by Region"
          series={[{
            name: 'Regional Revenue',
            data: regionData,
            colorScheme: 'blues',
          }]}
          height={300}
        />
      </GridItem>
    </Grid>
  );
};
```

### Example 2: Export Functionality

```tsx
const ExportExample = () => {
  const chartRef = useRef();

  const handleExport = (format) => {
    if (chartRef.current) {
      chartRef.current.exportChart(format);
    }
  };

  const data = [
    { x: 'Jan', min: 1000, max: 1500 },
    { x: 'Feb', min: 1200, max: 1700 },
    { x: 'Mar', min: 1100, max: 1600 },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => handleExport('png')}>
          Export as PNG
        </button>
        <button onClick={() => handleExport('svg')}>
          Export as SVG
        </button>
        <button onClick={() => handleExport('pdf')}>
          Export as PDF
        </button>
      </div>

      <RangeChart
        ref={chartRef}
        title="Exportable Chart"
        series={[{
          name: 'Data',
          data: data,
          color: '#2196f3',
        }]}
        chartOptions={{
          // Enable export functionality
          exportMenu: {
            enabled: true,
            formats: ['png', 'svg', 'pdf'],
          },
        }}
      />
    </div>
  );
};
```

---

## 🎯 Best Practices Summary

1. **Data Preparation**: Always format and validate data before rendering
2. **Performance**: Use aggregation for large datasets (>10,000 points)
3. **Responsive**: Set appropriate heights and widths for containers
4. **Accessibility**: Add titles, labels, and keyboard navigation
5. **Error Handling**: Implement fallbacks for missing or invalid data
6. **Testing**: Test with various data sizes and edge cases
7. **Memory**: Clean up charts on component unmount

---

**Need more examples?** Check out the [Advanced Charts Documentation](./ADVANCED_CHARTS.md) or explore the [Performance Guide](./PERFORMANCE.md).