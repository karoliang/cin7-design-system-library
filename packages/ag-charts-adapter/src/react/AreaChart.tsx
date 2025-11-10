/**
 * AreaChart - Area chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import type { AgChartOptions } from 'ag-charts-community';

export interface AreaChartSeries {
  /** Series name */
  name: string;
  /** Data points */
  data: (number | [string, number] | [number, number])[];
  /** Stroke color */
  color?: string;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Stroke width */
  strokeWidth?: number;
  /** Enable markers */
  marker?: boolean;
}

export interface AreaChartAxisConfig {
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

export interface AreaChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: AreaChartSeries[];
  /** X-axis configuration */
  xAxis?: AreaChartAxisConfig;
  /** Y-axis configuration */
  yAxis?: AreaChartAxisConfig;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Enable markers on data points */
  markers?: boolean;
  /** Enable smooth curves (spline area) */
  smooth?: boolean;
  /** Stacking mode */
  stacking?: 'normal' | 'percent';
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean;
  /** Default fill opacity (0-1) */
  fillOpacity?: number;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Area chart component for visualizing volume and cumulative data over time
 *
 * @example
 * ```tsx
 * <AreaChart
 *   title="Sales Volume"
 *   series={[{
 *     name: 'Sales',
 *     data: [1, 3, 2, 4, 5, 4, 6, 7]
 *   }]}
 *   xAxis={{ categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] }}
 * />
 * ```
 */
export const AreaChart: React.FC<AreaChartProps> = ({
  title,
  subtitle,
  series,
  xAxis = {},
  yAxis = {},
  dataLabels = false,
  markers = false,
  smooth = false,
  stacking,
  legend = true,
  tooltip = true,
  fillOpacity = 0.75,
  chartOptions = {},
  ...containerProps
}) => {
  // Convert series data to AG Charts format
  const agSeries = series.map((seriesItem) => ({
    type: smooth ? 'area' : 'area',
    xKey: typeof seriesItem.data[0] === 'string' || Array.isArray(seriesItem.data[0]) ? 'x' : undefined,
    yKey: 'y',
    data: seriesItem.data.map((point, index) => {
      if (Array.isArray(point)) {
        return { x: point[0], y: point[1] };
      }
      if (typeof point === 'string') {
        return { x: index, y: 0 }; // This shouldn't happen with proper data
      }
      return { x: index, y: point };
    }),
    stroke: seriesItem.color,
    strokeWidth: seriesItem.strokeWidth || 2,
    fill: seriesItem.color,
    fillOpacity: seriesItem.fillOpacity || fillOpacity,
    marker: {
      enabled: seriesItem.marker !== false ? markers : false,
      size: 6,
      strokeWidth: 2,
    },
    // @ts-ignore - stacking property exists in AG Charts
    stacked: stacking === 'normal' || stacking === 'percent',
    // @ts-ignore - stacking as percent
    groupBy: stacking === 'percent' ? 'y' : undefined,
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
        type: 'category',
        position: 'bottom',
        title: {
          text: xAxis.title,
          enabled: !!xAxis.title,
        },
        gridLine: {
          enabled: xAxis.gridLines !== false,
        },
        min: xAxis.min,
        max: xAxis.max,
        label: {
          format: xAxis.labelFormat,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: yAxis.title,
          enabled: !!yAxis.title,
        },
        gridLine: {
          enabled: yAxis.gridLines !== false,
        },
        min: yAxis.min,
        max: yAxis.max,
        label: {
          format: yAxis.labelFormat,
        },
      },
    ],
    legend: {
      enabled: legend,
    },
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Area chart'} />;
};

export default AreaChart;
