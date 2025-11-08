/**
 * ScatterChart - Scatter chart component with Cin7 theming
 */

import React from 'react';
import * as Highcharts from 'highcharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';

export interface ScatterChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: (Highcharts.SeriesScatterOptions | Highcharts.SeriesBubbleOptions)[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Chart variant - scatter or bubble */
  variant?: 'scatter' | 'bubble';
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean | Highcharts.TooltipOptions;
  /** Marker size */
  markerSize?: number;
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
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
  markerSize,
  chartOptions = {},
  ...containerProps
}) => {
  const options: Highcharts.Options = {
    ...chartOptions,
    chart: {
      type: variant,
      ...chartOptions.chart,
    },
    title: {
      text: title,
      ...chartOptions.title,
    },
    subtitle: {
      text: subtitle,
      ...chartOptions.subtitle,
    },
    xAxis: {
      ...xAxis,
      ...chartOptions.xAxis,
    },
    yAxis: {
      ...yAxis,
      ...chartOptions.yAxis,
    },
    legend: {
      enabled: legend,
      ...chartOptions.legend,
    },
    tooltip:
      tooltip === false
        ? { enabled: false }
        : typeof tooltip === 'object'
        ? tooltip
        : {
            shared: false,
            ...chartOptions.tooltip,
          },
    plotOptions: {
      scatter: {
        dataLabels: {
          enabled: dataLabels,
        },
        marker: {
          radius: markerSize || 5,
        },
      },
      bubble: {
        dataLabels: {
          enabled: dataLabels,
        },
        minSize: 8,
        maxSize: 40,
      },
      ...chartOptions.plotOptions,
    },
    series: series as Highcharts.SeriesOptionsType[],
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Scatter chart'} />;
};

export default ScatterChart;
