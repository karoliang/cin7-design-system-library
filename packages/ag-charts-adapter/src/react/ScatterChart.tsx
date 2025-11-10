/**
 * ScatterChart - Scatter chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import type { AgChartOptions } from 'ag-charts-community';

export interface ScatterChartSeries {
  /** Series name */
  name: string;
  /** Data points as [x, y] pairs or [x, y, size] for bubbles */
  data: Array<[number, number] | [number, number, number]>;
  /** Point color */
  color?: string;
  /** Marker size */
  markerSize?: number;
  /** Enable markers */
  marker?: boolean;
}

export interface ScatterChartAxisConfig {
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

export interface ScatterChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: ScatterChartSeries[];
  /** X-axis configuration */
  xAxis?: ScatterChartAxisConfig;
  /** Y-axis configuration */
  yAxis?: ScatterChartAxisConfig;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Chart variant - scatter or bubble */
  variant?: 'scatter' | 'bubble';
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean;
  /** Default marker size */
  markerSize?: number;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Scatter chart component for correlation and distribution visualization
 *
 * @example
 * ```tsx
 * <ScatterChart
 *   title="Height vs Weight"
 *   series={[{
 *     name: 'Males',
 *     data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7]]
 *   }]}
 *   xAxis={{ title: { text: 'Height (cm)' } }}
 *   yAxis={{ title: { text: 'Weight (kg)' } }}
 * />
 * ```
 */
export const ScatterChart: React.FC<ScatterChartProps> = ({
  title,
  subtitle,
  series,
  xAxis = {},
  yAxis = {},
  dataLabels = false,
  variant = 'scatter',
  legend = true,
  tooltip = true,
  markerSize = 6,
  chartOptions = {},
  ...containerProps
}) => {
  // Convert series data to AG Charts format
  const agSeries = series.map((seriesItem) => ({
    type: variant,
    data: seriesItem.data.map((point) => {
      if (point.length === 2) {
        // [x, y] - scatter plot
        return { x: point[0], y: point[1] };
      } else if (point.length === 3) {
        // [x, y, size] - bubble chart
        return { x: point[0], y: point[1], size: point[2] };
      }
      return { x: point[0], y: point[1] };
    }),
    fill: seriesItem.color,
    stroke: seriesItem.color,
    marker: {
      enabled: seriesItem.marker !== false,
      size: seriesItem.markerSize || markerSize,
      strokeWidth: 2,
    },
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
        type: 'number',
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

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Scatter chart'} />;
};

export default ScatterChart;
