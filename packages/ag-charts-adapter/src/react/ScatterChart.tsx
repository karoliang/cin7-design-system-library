/**
 * ScatterChart - Scatter chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { getCin7ChartColors } from '../utilities/theme';
import { normalizeAxisTitle } from '../utilities/axisHelpers';
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
    const seriesColor = seriesItem.color || chartColors[index % chartColors.length];

    return {
      type: variant,
      xKey: 'x',
      yKey: 'y',
      sizeKey: variant === 'bubble' ? 'size' : undefined,
      data: seriesItem.data
        .filter(point => point !== null && point !== undefined && Array.isArray(point) && point.length >= 2)
        .map((point) => {
          if (point.length === 2) {
            // [x, y] - scatter plot
            return { x: point[0], y: point[1] };
          } else if (point.length === 3) {
            // [x, y, size] - bubble chart
            return { x: point[0], y: point[1], size: point[2] };
          }
          return { x: point[0], y: point[1] };
        }),
      // Apply marker properties
      marker: {
        enabled: seriesItem.marker !== false,
        size: seriesItem.markerSize || markerSize,
        strokeWidth: 2,
        fill: seriesColor,
        stroke: seriesColor,
      },
      // For bubble charts, apply size property correctly
      ...(variant === 'bubble' && {
        sizeKey: 'size',
      }),
      label: {
        enabled: dataLabels,
      },
      // Use legendItemName instead of name for series naming
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
        type: 'number',
        position: 'bottom',
        title: normalizeAxisTitle(xAxis.title),
        gridLine: {
          enabled: xAxis.gridLines !== false,
        },
        label: {
          format: xAxis.labelFormat,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: normalizeAxisTitle(yAxis.title),
        gridLine: {
          enabled: yAxis.gridLines !== false,
        },
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
