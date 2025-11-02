/**
 * PieChart - Pie/Donut chart component with Cin7 theming
 */

import React from 'react';
import * as Highcharts from 'highcharts';
import { ChartContainer, ChartContainerProps } from './ChartContainer';

export interface PieChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  data: Highcharts.PointOptionsObject[];
  /** Series name */
  seriesName?: string;
  /** Chart variant */
  variant?: 'pie' | 'donut' | 'semi-circle';
  /** Show data labels */
  dataLabels?: boolean;
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean | Highcharts.TooltipOptions;
  /** Inner size for donut chart (percentage or pixels) */
  innerSize?: string | number;
  /** Start angle for pie */
  startAngle?: number;
  /** End angle for pie */
  endAngle?: number;
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Pie/Donut chart component for showing part-to-whole relationships
 *
 * @example
 * ```tsx
 * <PieChart
 *   title="Market Share"
 *   variant="donut"
 *   data={[
 *     { name: 'Product A', y: 45 },
 *     { name: 'Product B', y: 30 },
 *     { name: 'Product C', y: 25 }
 *   ]}
 * />
 * ```
 */
export const PieChart: React.FC<PieChartProps> = ({
  title,
  subtitle,
  data,
  seriesName = 'Data',
  variant = 'pie',
  dataLabels = true,
  legend = true,
  tooltip = true,
  innerSize,
  startAngle,
  endAngle,
  chartOptions = {},
  ...containerProps
}) => {
  // Determine inner size based on variant
  let calculatedInnerSize = innerSize;
  if (!innerSize) {
    if (variant === 'donut') {
      calculatedInnerSize = '50%';
    } else if (variant === 'semi-circle') {
      calculatedInnerSize = '40%';
    }
  }

  // Determine angles for semi-circle
  const calculatedStartAngle = startAngle ?? (variant === 'semi-circle' ? -90 : 0);
  const calculatedEndAngle = endAngle ?? (variant === 'semi-circle' ? 90 : 360);

  const options: Highcharts.Options = {
    ...chartOptions,
    chart: {
      type: 'pie',
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
            pointFormat: '<b>{point.percentage:.1f}%</b><br/>Value: {point.y}',
            ...chartOptions.tooltip,
          },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: dataLabels,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
        showInLegend: legend,
        innerSize: calculatedInnerSize,
        startAngle: calculatedStartAngle,
        endAngle: calculatedEndAngle,
        ...chartOptions.plotOptions?.pie,
      },
      ...chartOptions.plotOptions,
    },
    series: [
      {
        type: 'pie',
        name: seriesName,
        data,
      },
    ],
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Pie chart'} />;
};

export default PieChart;
