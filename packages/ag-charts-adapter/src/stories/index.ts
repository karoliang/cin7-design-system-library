/**
 * AG Charts Adapter Stories
 *
 * This directory contains comprehensive Storybook stories for all AG Charts components.
 * Each story file includes multiple variants demonstrating different configuration options,
 * data formats, and use cases.
 *
 * Available Stories:
 * - PieChart.stories.tsx: Pie and donut chart variants
 * - ScatterChart.stories.tsx: Scatter plots and bubble charts
 * - AreaChart.stories.tsx: Area charts with stacking and smoothing
 * - BarChart.stories.tsx: Bar and column charts with orientation options
 * - LineChart.stories.tsx: Line charts with markers and curves
 */

// Export all stories
export { default as PieChartStories } from './PieChart.stories';
export { default as ScatterChartStories } from './ScatterChart.stories';
export { default as AreaChartStories } from './AreaChart.stories';
export { default as BarChartStories } from './BarChart.stories';
export { default as LineChartStories } from './LineChart.stories';

// Re-export chart components for convenience
export { PieChart } from '../react/PieChart';
export { ScatterChart } from '../react/ScatterChart';
export { AreaChart } from '../react/AreaChart';
export { BarChart } from '../react/BarChart';
export { LineChart } from '../react/LineChart';
export { ChartContainer } from '../react/ChartContainer';