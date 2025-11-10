/**
 * BarChart - Bar/Column chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
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
  /** Axis title */
  title?: string;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Label format */
  labelFormat?: string;
  /** Show grid lines */
  gridLines?: boolean;
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

  // Convert series data to AG Charts format
  const agSeries = series.map((seriesItem) => ({
    type: isHorizontal ? 'bar' : 'column',
    xKey: 'x',
    yKey: 'y',
    data: seriesItem.data.map((point) => {
      if (Array.isArray(point)) {
        return { x: point[0], y: point[1] };
      }
      return { x: seriesItem.name, y: point };
    }),
    fill: seriesItem.color,
    // @ts-ignore - stacking property exists in AG Charts
    stacked: stacking === 'normal' || stacking === 'percent',
    // @ts-ignore - grouping property exists in AG Charts
    grouped: grouping,
    label: {
      enabled: dataLabels,
    },
  }));

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
        title: isHorizontal && yAxis.title ? {
          text: yAxis.title,
          enabled: true,
        } : !isHorizontal && xAxis.title ? {
          text: xAxis.title,
          enabled: true,
        } : undefined,
        gridLine: {
          enabled: isHorizontal ? (yAxis.gridLines !== false) : (xAxis.gridLines !== false),
        },
          label: {
          format: isHorizontal ? yAxis.labelFormat : xAxis.labelFormat,
        },
      },
      {
        type: isHorizontal ? 'category' : 'number',
        position: isHorizontal ? 'left' : 'bottom',
        title: isHorizontal && xAxis.title ? {
          text: xAxis.title,
          enabled: true,
        } : !isHorizontal && yAxis.title ? {
          text: yAxis.title,
          enabled: true,
        } : undefined,
        gridLine: {
          enabled: isHorizontal ? (xAxis.gridLines !== false) : (yAxis.gridLines !== false),
        },
          label: {
          format: isHorizontal ? xAxis.labelFormat : yAxis.labelFormat,
        },
      },
    ],
    legend: {
      enabled: legend,
    },
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Bar chart'} />;
};

export default BarChart;