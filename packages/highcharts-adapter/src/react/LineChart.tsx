/**
 * LineChart - Line chart component with Cin7 theming
 */

import React from 'react';
import * as Highcharts from 'highcharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';

export interface LineChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: Highcharts.SeriesLineOptions[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Enable markers on data points */
  markers?: boolean;
  /** Enable smooth curves */
  smooth?: boolean;
  /** Stacking mode */
  stacking?: 'normal' | 'percent';
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean | Highcharts.TooltipOptions;
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Line chart component for time series and trend visualization
 *
 * @example
 * ```tsx
 * <LineChart
 *   title="Sales Over Time"
 *   series={[{
 *     name: 'Sales',
 *     data: [1, 3, 2, 4, 5, 4, 6, 7]
 *   }]}
 *   xAxis={{ categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] }}
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = ({
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
  chartOptions = {},
  ...containerProps
}) => {
  const options: Highcharts.Options = {
    ...chartOptions,
    chart: {
      type: smooth ? 'spline' : 'line',
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
            shared: true,
            crosshairs: true,
            ...chartOptions.tooltip,
          },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: dataLabels,
        },
        marker: {
          enabled: markers,
        },
        stacking,
      },
      ...chartOptions.plotOptions,
    },
    series: series as Highcharts.SeriesOptionsType[],
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Line chart'} />;
};

export default LineChart;
