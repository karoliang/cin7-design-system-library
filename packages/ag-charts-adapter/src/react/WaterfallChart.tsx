/**
 * WaterfallChart - Waterfall chart component with Cin7 theming
 */

import React from 'react';
import * as Highcharts from 'highcharts';
import 'highcharts/highcharts-more';
import { ChartContainer, ChartContainerProps } from './ChartContainer';

export interface WaterfallChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: Highcharts.SeriesWaterfallOptions[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Colors for up, down, and sum points */
  colors?: {
    up?: string;
    down?: string;
    sum?: string;
  };
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean | Highcharts.TooltipOptions;
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Waterfall chart component for showing cumulative effects of sequential values
 *
 * @example
 * ```tsx
 * <WaterfallChart
 *   title="Profit & Loss"
 *   series={[{
 *     name: 'Financial Flow',
 *     data: [
 *       { name: 'Start', y: 120000 },
 *       { name: 'Revenue', y: 50000 },
 *       { name: 'Costs', y: -40000 },
 *       { name: 'Total', isSum: true }
 *     ]
 *   }]}
 * />
 * ```
 */
export const WaterfallChart: React.FC<WaterfallChartProps> = ({
  title,
  subtitle,
  series,
  xAxis = {},
  yAxis = {},
  dataLabels = true,
  colors = {
    up: '#90ed7d',
    down: '#f45b5b',
    sum: '#7cb5ec',
  },
  legend = false,
  tooltip = true,
  chartOptions = {},
  ...containerProps
}) => {
  const options: Highcharts.Options = {
    ...chartOptions,
    chart: {
      type: 'waterfall',
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
      type: 'category',
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
            pointFormat: '<b>{point.y:,.0f}</b>',
            ...chartOptions.tooltip,
          },
    plotOptions: {
      waterfall: {
        dataLabels: {
          enabled: dataLabels,
          formatter: function () {
            return Highcharts.numberFormat(this.y as number, 0, '.', ',');
          },
          style: {
            fontWeight: 'bold',
          },
        },
        upColor: colors.up,
        color: colors.down,
        borderColor: '#333',
        lineColor: '#333',
      },
      ...chartOptions.plotOptions,
    },
    series: series.map((s) => ({
      ...s,
      type: 'waterfall',
      // Set color for sum/intermediate sum points
      data: (s.data as any[])?.map((point) => {
        if (typeof point === 'object' && (point.isSum || point.isIntermediateSum)) {
          return {
            ...point,
            color: colors.sum,
          };
        }
        return point;
      }),
    })) as Highcharts.SeriesOptionsType[],
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Waterfall chart'} />;
};

export default WaterfallChart;
