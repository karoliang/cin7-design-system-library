# Advanced AG Charts Components

This document showcases the advanced chart components available in the AG Charts adapter, designed for enterprise-grade data visualization.

## 🎯 Overview

The AG Charts adapter provides a comprehensive suite of advanced chart components that go beyond basic visualization, offering sophisticated analysis capabilities and professional-grade features.

## 📊 Available Components

### 1. RangeChart (`RangeChart.tsx`)

**Purpose**: Visualize min/max value ranges with confidence intervals and statistical bounds.

**Key Features**:
- Dual area charts for min/max visualization
- Connector lines showing range spans
- Advanced tooltips with range calculations
- Customizable opacity and styling
- Support for time-series and categorical data

**Use Cases**:
- Temperature ranges (daily highs/lows)
- Stock price bands (support/resistance)
- Confidence intervals in statistical analysis
- Performance metrics with variance

```tsx
<RangeChart
  title="Daily Temperature Ranges"
  series={[{
    name: "Temperature",
    data: [
      { x: "Mon", min: 15, max: 25 },
      { x: "Tue", min: 18, max: 28 },
      { x: "Wed", min: 12, max: 22 }
    ],
    color: "#ff6b6b"
  }]}
  fillOpacity={0.3}
  markers={true}
/>
```

### 2. OHLCChart (`OHLCChart.tsx`)

**Purpose**: Financial data visualization with Open/High/Low/Close candlestick patterns.

**Key Features**:
- Multiple chart variants (candlestick, OHLC, hollow candlestick)
- Volume bar integration
- Bullish/bearish color coding
- Advanced financial tooltips
- Support for time-series data

**Use Cases**:
- Stock price analysis
- Cryptocurrency tracking
- Commodity price visualization
- Forex market analysis

```tsx
<OHLCChart
  title="Stock Price Movement"
  variant="candlestick"
  showVolume={true}
  series={[{
    name: "AAPL",
    data: [
      { x: "2024-01-01", open: 150, high: 155, low: 148, close: 152, volume: 1000000 },
      { x: "2024-01-02", open: 152, high: 158, low: 150, close: 156, volume: 1200000 }
    ],
    bullishColor: "#00b894",
    bearishColor: "#d63031"
  }]}
/>
```

### 3. HeatmapChart (`HeatmapChart.tsx`)

**Purpose**: 2D data density visualization with color-coded intensity mapping.

**Key Features**:
- Multiple color schemes (viridis, blues, reds, greens)
- Custom color ranges
- Support for correlation matrices
- Advanced tooltip formatting
- Grid-based layout optimization

**Use Cases**:
- Correlation matrices
- Activity heatmaps
- Risk assessment visualization
- Performance analysis grids

```tsx
<HeatmapChart
  title="Correlation Matrix"
  series={[{
    name: "Correlations",
    data: [
      { x: "Var1", y: "Var1", value: 1.0 },
      { x: "Var1", y: "Var2", value: 0.8 },
      { x: "Var2", y: "Var1", value: 0.8 },
      { x: "Var2", y: "Var2", value: 1.0 }
    ],
    colorScheme: "blues",
    dataLabels: true
  }]}
  xCategories={["Var1", "Var2"]}
  yCategories={["Var1", "Var2"]}
/>
```

### 4. TreemapChart (`TreemapChart.tsx`)

**Purpose**: Hierarchical data visualization with proportional sizing.

**Key Features**:
- Multiple layout algorithms (squarify, slice, dice)
- Hierarchical nesting support
- Color-coded categories
- Interactive tooltips with metadata
- Responsive sizing calculations

**Use Cases**:
- Portfolio allocation
- Market share visualization
- File system analysis
- Organizational structure display

```tsx
<TreemapChart
  title="Revenue by Region"
  layout="squarify"
  series={[{
    name: "Revenue",
    data: [
      { name: "North America", value: 45000 },
      { name: "Europe", value: 38000 },
      { name: "Asia", value: 52000 },
      { name: "Others", value: 15000 }
    ],
    colorScheme: "category10",
    dataLabels: true
  }]}
/>
```

## 🎨 Styling and Customization

### Color Schemes

All advanced charts support multiple color schemes:

- **Category10/Category20**: Distinct colors for categorical data
- **Viridis**: Scientific color mapping (perceptually uniform)
- **Blues/Reds/Greens**: Sequential color gradients
- **Warm/Cool**: Temperature-based color schemes
- **Custom**: User-defined color ranges

### Interactive Features

- **Tooltips**: Rich, contextual information on hover
- **Legends**: Dynamic legends with color coding
- **Animations**: Smooth transitions and updates
- **Responsive**: Automatic resizing and reflowing

## 📈 Performance Considerations

### Large Dataset Handling

- Use data aggregation for datasets > 10,000 points
- Implement virtualization for time-series data
- Consider downsampling for real-time updates
- Enable GPU acceleration where available

### Memory Management

- Charts automatically clean up on component unmount
- Use the `destroy()` method for manual cleanup
- Implement data pagination for extremely large datasets
- Monitor memory usage with performance profiling

## 🔧 Advanced Configuration

### Custom Color Mapping

```tsx
const customColorRange = {
  min: '#e3f2fd',
  middle: '#2196f3',
  max: '#0d47a1'
};

<HeatmapChart
  series={[{
    name: "Custom Heatmap",
    data: heatmapData,
    colorRange: customColorRange
  }]}
/>
```

### Data Transformation

```tsx
// Transform OHLC data for different timeframes
const transformOHLCData = (data, timeframe) => {
  // Group data by timeframe
  // Calculate OHLC for each group
  return transformedData;
};
```

### Event Handling

```tsx
<RangeChart
  series={seriesData}
  chartOptions={{
    listeners: {
      nodeClick: (event) => {
        console.log('Clicked:', event.datum);
      }
    }
  }}
/>
```

## 🚀 Best Practices

1. **Data Preparation**: Ensure data is properly formatted and sorted
2. **Responsive Design**: Use flexible sizing and breakpoints
3. **Accessibility**: Add ARIA labels and keyboard navigation
4. **Performance**: Monitor bundle size and rendering performance
5. **Testing**: Test with various data sizes and edge cases

## 🔍 Migration from Highcharts

If you're migrating from Highcharts, these components provide:

- **Compatible APIs**: Similar prop structures and naming conventions
- **Enhanced Features**: Modern visualization capabilities
- **Better Performance**: Optimized rendering and memory usage
- **TypeScript Support**: Full type safety and IntelliSense

## 📚 Additional Resources

- [AG Charts Documentation](https://www.ag-grid.com/charts/)
- [Component Examples](./EXAMPLES.md)
- [Performance Guide](./PERFORMANCE.md)
- [Migration Guide](./MIGRATION.md)

## 🤝 Contributing

When contributing to advanced chart components:

1. Follow the established TypeScript patterns
2. Include comprehensive JSDoc documentation
3. Add unit tests for new features
4. Update examples and documentation
5. Ensure responsive design compatibility

---

**Next Steps**: Explore the [Examples](./EXAMPLES.md) to see these components in action with real-world data scenarios.