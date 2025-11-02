/**
 * BarChart - Bar/Column chart component with Cin7 theming
 */

import React from 'react';
import * as Highcharts from 'highcharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';

export interface BarChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: Highcharts.SeriesBarOptions[] | Highcharts.SeriesColumnOptions[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
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
  tooltip?: boolean | Highcharts.TooltipOptions;
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Bar/Column chart component for comparing categories
 *
 * @example
 * ```tsx
 * <BarChart
 *   title="Sales by Product"
 *   orientation="vertical"
 *   series={[{
 *     name: 'Q1 Sales',
 *     data: [100, 200, 150, 300]
 *   }]}
 *   xAxis={{ categories: ['Product A', 'Product B', 'Product C', 'Product D'] }}
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
  const chartType = orientation === 'vertical' ? 'column' : 'bar';

  const options: Highcharts.Options = {
    ...chartOptions,
    chart: {
      type: chartType,
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
      [chartType]: {
        dataLabels: {
          enabled: dataLabels,
        },
        stacking,
        grouping,
      },
      ...chartOptions.plotOptions,
    },
    series: series as Highcharts.SeriesOptionsType[],
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Bar chart'} />;
};

export default BarChart;
