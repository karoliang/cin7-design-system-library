# @cin7/highcharts-adapter

Highcharts integration for Cin7 DSL with comprehensive multi-language support (React, ExtJS, Vanilla JS, TypeScript) and seamless Cin7 design token integration.

## Features

- ✅ **Multi-Language Support**: React, ExtJS, Vanilla JS, and TypeScript
- ✅ **Design Token Integration**: Automatic theming with Cin7 design tokens
- ✅ **Type-Safe Builders**: Fluent API for building chart configurations
- ✅ **Data Transformers**: Convert business data to chart-ready formats
- ✅ **Responsive Charts**: Auto-resize and mobile-friendly
- ✅ **Accessibility**: ARIA labels and keyboard navigation
- ✅ **Dark Mode**: Automatic theme switching

## Installation

```bash
pnpm add @cin7/highcharts-adapter
```

## Quick Start

### React

```tsx
import { LineChart } from '@cin7/highcharts-adapter/react';

function SalesChart() {
  return (
    <LineChart
      title="Monthly Sales"
      series={[{
        name: 'Sales',
        data: [1, 3, 2, 4, 5, 4, 6, 7]
      }]}
      xAxis={{ categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] }}
    />
  );
}
```

### ExtJS

```javascript
import { Cin7HighchartsLine } from '@cin7/highcharts-adapter/extjs';

// Register components
Cin7HighchartsLine.register();

// Create chart
const chart = Cin7HighchartsLine.create({
  title: 'Monthly Sales',
  series: [{
    name: 'Sales',
    data: [1, 3, 2, 4, 5, 4, 6, 7]
  }],
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  }
});
```

### Vanilla JavaScript

```javascript
import { initLineChart } from '@cin7/highcharts-adapter/vanilla';

const chart = initLineChart({
  container: '#my-chart',
  title: 'Monthly Sales',
  series: [{
    name: 'Sales',
    data: [1, 3, 2, 4, 5, 4, 6, 7]
  }],
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
  }
});
```

### TypeScript SDK

```typescript
import { ChartBuilderFactory, DataTransformers } from '@cin7/highcharts-adapter/typescript';

// Build chart configuration
const config = ChartBuilderFactory.createLineChart()
  .setTitle('Monthly Sales')
  .addSeries('Sales', [1, 3, 2, 4, 5, 4, 6, 7])
  .setCategories(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'])
  .enableSmooth()
  .build();

// Transform business data
const salesData = [
  { date: new Date('2025-01-01'), amount: 1200 },
  { date: new Date('2025-01-02'), amount: 1500 },
  // ...
];

const chartData = DataTransformers.transformTimeSeries(salesData);
```

## Chart Types

### Line Chart

```tsx
<LineChart
  title="Trend Analysis"
  series={[{ name: 'Series 1', data: [1, 2, 3, 4] }]}
  smooth={true}        // Enable smooth curves
  markers={true}       // Show data point markers
  stacking="normal"    // Enable stacking
/>
```

### Bar/Column Chart

```tsx
<BarChart
  title="Category Comparison"
  orientation="vertical"  // or "horizontal"
  series={[{ name: 'Series 1', data: [1, 2, 3, 4] }]}
  stacking="percent"      // or "normal"
  dataLabels={true}
/>
```

### Pie/Donut Chart

```tsx
<PieChart
  title="Distribution"
  variant="donut"  // or "pie" or "semi-circle"
  data={[
    { name: 'Category A', y: 45 },
    { name: 'Category B', y: 30 },
    { name: 'Category C', y: 25 }
  ]}
/>
```

## Theme Configuration

```tsx
import { LineChart } from '@cin7/highcharts-adapter/react';

<LineChart
  theme={{
    mode: 'dark',  // 'light' or 'dark'
    colors: ['#5C6AC4', '#006FBB', '#47C1BF'],  // Custom colors
  }}
  // ... other props
/>
```

## Data Transformation

```typescript
import { DataTransformers } from '@cin7/highcharts-adapter/typescript';

// Group and aggregate data
const grouped = DataTransformers.sumBy(salesData, 'product', 'amount');

// Transform for multiple series
const { categories, series } = DataTransformers.transformMultipleSeries(
  data,
  'region',    // series key
  'month',     // category key
  'revenue'    // value key
);

// Calculate percentages
const withPercentage = DataTransformers.calculatePercentage(data, 'value');
```

## Advanced Features

### Real-Time Updates

```typescript
import { updateLineChartData } from '@cin7/highcharts-adapter/vanilla';

// Update chart data dynamically
updateLineChartData(chart, [
  { name: 'Series 1', data: [2, 4, 6, 8] }
]);
```

### Export Charts

```typescript
import { exportChartToImage, exportChartToCSV } from '@cin7/highcharts-adapter/utilities';

// Export as image
exportChartToImage(chart, 'sales-chart', 'image/png');

// Export as CSV
exportChartToCSV(chart, 'sales-data');
```

### Responsive Configuration

```tsx
<LineChart
  responsive={true}
  height={400}
  width="100%"
  // Chart auto-resizes on window resize
/>
```

## Design Token Integration

All charts automatically use Cin7 design tokens for:

- Colors (data visualization palette)
- Typography
- Spacing
- Border radius
- Shadows
- Dark/light mode theming

## API Reference

See the [full documentation](https://cin7-dsl.netlify.app/components/charts) for detailed API reference.

## TypeScript Support

Full TypeScript support with type definitions included.

```typescript
import type { LineChartProps, BarChartProps, PieChartProps } from '@cin7/highcharts-adapter/react';
import type { ChartConfig, ChartDataPoint } from '@cin7/highcharts-adapter/typescript';
```

## License

MIT License - See [LICENSING.md](./LICENSING.md) for Highcharts commercial license requirements.

## Contributing

See the main [Cin7 DSL repository](https://github.com/cin7/cin7-design-system-library) for contribution guidelines.
