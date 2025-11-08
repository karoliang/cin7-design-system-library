/**
 * AreaChart - Area chart component with Cin7 theming
 */

import React from 'react';
import * as Highcharts from 'highcharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';

export interface AreaChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: Highcharts.SeriesAreaOptions[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
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
  tooltip?: boolean | Highcharts.TooltipOptions;
  /** Fill opacity (0-1) */
  fillOpacity?: number;
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
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
  const options: Highcharts.Options = {
    ...chartOptions,
    chart: {
      type: smooth ? 'areaspline' : 'area',
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
            ...chartOptions.tooltip,
          },
    plotOptions: {
      area: {
        fillOpacity,
        marker: {
          enabled: markers,
        },
        dataLabels: {
          enabled: dataLabels,
        },
        stacking,
      },
      areaspline: {
        fillOpacity,
        marker: {
          enabled: markers,
        },
        dataLabels: {
          enabled: dataLabels,
        },
        stacking,
      },
      ...chartOptions.plotOptions,
    },
    series: series as Highcharts.SeriesOptionsType[],
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Area chart'} />;
};

export default AreaChart;
