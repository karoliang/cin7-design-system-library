/**
 * BarChart - Bar/Column chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { getCin7ChartColors } from '../utilities/theme';
import { normalizeAxisTitle } from '../utilities/axisHelpers';
import type { AgChartOptions } from 'ag-charts-community';

export interface BarChartSeries {
  /** Series name */
  name: string;
  /** Data points */
  data: (number | [string, number])[];
  /** Fill color */
  color?: string;
}

export interface BarChartAxisConfig {
  /** Axis title - can be string or object with text property */
  title?: string | { text: string };
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Label format */
  labelFormat?: string;
  /** Show grid lines */
  gridLines?: boolean;
  /** Categories for categorical axes */
  categories?: string[];
}

export interface BarChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: BarChartSeries[];
  /** X-axis configuration */
  xAxis?: BarChartAxisConfig;
  /** Y-axis configuration */
  yAxis?: BarChartAxisConfig;
  /** Chart orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Enable data labels */
  dataLabels?: boolean;
  /** Stacking mode */
  stacking?: 'normal' | 'percent';
  /** Enable grouping for multiple series */
  grouping?: boolean;
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Bar/Column chart component for categorical data visualization
 *
 * @example
 * ```tsx
 * <BarChart
 *   title="Sales by Quarter"
 *   series={[{
 *     name: 'Q1',
 *     data: [['Jan', 100], ['Feb', 120], ['Mar', 140]]
 *   }]}
 *   orientation="vertical"
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = ({
  title,
  subtitle,
  series,
  xAxis = {},
  yAxis = {},
  orientation = 'vertical',
  dataLabels = false,
  stacking,
  grouping = true,
  legend = true,
  tooltip = true,
  chartOptions = {},
  ...containerProps
}) => {
  const isHorizontal = orientation === 'horizontal';

  // Get theme mode and colors
  const getThemeMode = (): 'light' | 'dark' => {
    if (typeof document !== 'undefined') {
      const mode = document.documentElement.getAttribute('data-cin7-theme') as 'light' | 'dark';
      return mode || 'light';
    }
    return 'light';
  };

  const chartColors = getCin7ChartColors(getThemeMode());

  // Convert series data to AG Charts format
  const agSeries = series.map((seriesItem, index) => {
    const yKey = stacking ? 'y' : `y_${index}`; // Use same yKey for stacked charts
    return {
      type: 'bar', // AG Charts v9.2.0 only accepts 'bar' for both orientations
      xKey: 'x',
      yKey: yKey,
      data: seriesItem.data.map((point, index) => {
        if (Array.isArray(point)) {
          return { x: point[0], [yKey]: point[1] };
        }
        // Use numerical indices for x-axis when categories are provided
        return { x: index, [yKey]: point };
      }),
      // Colors are handled through fills/stroke in item styling, not series level
      // For now, we'll let the theme handle colors automatically
      label: {
        enabled: dataLabels,
      },
      // Configure stacking
      ...(stacking && {
        stacked: true,
        // For percent stacking, set normalizedTo to 100
        ...(stacking === 'percent' && { normalizedTo: 100 }),
      }),
      // Series name for legend - use legendItemName instead of name
      legendItemName: seriesItem.name,
      showInLegend: true,
    };
  });

  
  const options: AgChartOptions = {
    ...chartOptions,
    title: {
      text: title,
      enabled: !!title,
    },
    subtitle: {
      text: subtitle,
      enabled: !!subtitle,
    },
    data: [],
    series: agSeries as any,
    axes: [
      {
        type: isHorizontal ? 'number' : 'category',
        position: isHorizontal ? 'bottom' : 'left',
        title: normalizeAxisTitle(isHorizontal ? yAxis.title : xAxis.title),
        gridLine: {
          enabled: isHorizontal ? (yAxis.gridLines !== false) : (xAxis.gridLines !== false),
        },
        label: {
          format: isHorizontal ? yAxis.labelFormat : xAxis.labelFormat,
        },
        // Category axis configuration - remove invalid category property
        // Categories are automatically inferred from data x values
      },
      {
        type: isHorizontal ? 'category' : 'number',
        position: isHorizontal ? 'left' : 'bottom',
        title: normalizeAxisTitle(isHorizontal ? xAxis.title : yAxis.title),
        gridLine: {
          enabled: isHorizontal ? (xAxis.gridLines !== false) : (yAxis.gridLines !== false),
        },
        label: {
          format: isHorizontal ? xAxis.labelFormat : yAxis.labelFormat,
        },
        // Category axis configuration - remove invalid category property
        // Categories are automatically inferred from data x values
      },
    ],
    legend: {
      enabled: legend,
    },
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Bar chart'} />;
};

export default BarChart;