/**
 * AG Charts Adapter Stories
 *
 * This directory contains comprehensive Storybook stories for all AG Charts components.
 * Each story file includes multiple variants demonstrating different configuration options,
 * data formats, and use cases based on AG Charts v9.2.0 API patterns.
 *
 * Available Stories:
 * - PieChart.stories.tsx: Pie and donut chart variants with multiple examples
 * - ScatterChart.stories.tsx: Scatter plots and bubble charts with correlation patterns
 * - AreaChart.stories.tsx: Area charts with stacking, percent, and smoothing
 * - BarChart.stories.tsx: Bar and column charts with horizontal/vertical/grouped variants
 * - LineChart.stories.tsx: Line charts with markers, smooth curves, and multiple series
 * - RangeChart.stories.tsx: Range visualization for temperature ranges and error bars
 * - HeatmapChart.stories.tsx: 2D data density visualization with calendar and matrix examples
 * - OHLCChart.stories.tsx: Financial candlestick and OHLC chart variants
 * - WaterfallChart.stories.tsx: Financial analysis and cumulative effect visualization
 * - TreemapChart.stories.tsx: Hierarchical data visualization with parent-child relationships
 */

// Export all stories
export { default as PieChartStories } from './PieChart.stories';
export { default as ScatterChartStories } from './ScatterChart.stories';
export { default as AreaChartStories } from './AreaChart.stories';
export { default as BarChartStories } from './BarChart.stories';
export { default as LineChartStories } from './LineChart.stories';
export { default as RangeChartStories } from './RangeChart.stories';
export { default as HeatmapChartStories } from './HeatmapChart.stories';
export { default as OHLCChartStories } from './OHLCChart.stories';
export { default as WaterfallChartStories } from './WaterfallChart.stories';
export { default as TreemapChartStories } from './TreemapChart.stories';

// Re-export chart components for convenience
export { PieChart } from '../react/PieChart';
export { ScatterChart } from '../react/ScatterChart';
export { AreaChart } from '../react/AreaChart';
export { BarChart } from '../react/BarChart';
export { LineChart } from '../react/LineChart';
export { RangeChart } from '../react/RangeChart';
export { HeatmapChart } from '../react/HeatmapChart';
export { OHLCChart } from '../react/OHLCChart';
export { WaterfallChart } from '../react/WaterfallChart';
export { TreemapChart } from '../react/TreemapChart';
export { ChartContainer } from '../react/ChartContainer';