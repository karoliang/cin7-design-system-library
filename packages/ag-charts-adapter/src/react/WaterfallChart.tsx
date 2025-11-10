/**
 * WaterfallChart - Waterfall chart component with Cin7 theming
 * Custom AG Charts implementation since waterfall charts aren't natively supported
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { normalizeAxisTitle } from '../utilities/axisHelpers';
import type { AgChartOptions } from 'ag-charts-community';

export interface WaterfallDataPoint {
  /** Category name */
  name: string;
  /** Value (positive or negative) */
  y: number;
  /** Whether this is a sum/total point */
  isSum?: boolean;
  /** Whether this is an intermediate sum */
  isIntermediateSum?: boolean;
  /** Custom label */
  label?: string;
}

export interface WaterfallChartSeries {
  /** Series name */
  name: string;
  /** Data points for the waterfall */
  data: WaterfallDataPoint[];
  /** Stroke color override */
  stroke?: string;
}

export interface WaterfallChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: WaterfallChartSeries[];
  /** X-axis configuration */
  xAxis?: {
    title?: string;
    labelFormat?: string;
    gridLines?: boolean;
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string;
    labelFormat?: string;
    gridLines?: boolean;
    min?: number;
    max?: number;
  };
  /** Enable data labels */
  dataLabels?: boolean;
  /** Colors for up, down, and sum points */
  colors?: {
    up?: string;
    down?: string;
    sum?: string;
    intermediate?: string;
  };
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Waterfall chart component for showing cumulative effects of sequential values
 * Custom AG Charts implementation with column-based visualization
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
    intermediate: '#ffa726',
  },
  legend = false,
  tooltip = true,
  chartOptions = {},
  ...containerProps
}) => {
  // Transform waterfall data for AG Charts column visualization
  const transformWaterfallData = (data: WaterfallDataPoint[]) => {
    const transformedData: any[] = [];
    let cumulative = 0;

    data.forEach((point, index) => {
      let yValue = point.y;
      let color = point.y >= 0 ? colors.up : colors.down;

      if (point.isSum || point.isIntermediateSum) {
        color = point.isIntermediateSum ? colors.intermediate : colors.sum;
      }

      // Calculate cumulative value for intermediate sums
      if (!point.isSum) {
        cumulative += point.y;
      } else {
        yValue = cumulative;
      }

      transformedData.push({
        x: index,
        y: yValue,
        label: point.label || point.name,
        color,
        isSum: point.isSum,
        isIntermediateSum: point.isIntermediateSum,
        categoryKey: point.name,
      });
    });

    return transformedData;
  };

  // Transform all series
  const agSeries = series.map((seriesItem) => ({
    type: 'bar' as const,
    xKey: 'x',
    yKey: 'y',
    data: transformWaterfallData(seriesItem.data),
    strokeWidth: 1,
    cornerRadius: 2,
    label: {
      enabled: dataLabels,
      color: '#333333',
      formatter: (params: any) => {
        const value = params.datum.y;
        const sign = value >= 0 ? '+' : '';
        return `${sign}${value.toLocaleString()}`;
      },
      style: {
        fontWeight: 'bold',
        fontSize: 12,
      },
    },
    // Custom tooltip for waterfall
    tooltip: {
      enabled: tooltip,
      renderer: (params: any) => {
        const datum = params.datum;
        const sign = datum.y >= 0 ? '+' : '';
        return {
          title: datum.categoryKey,
          content: `Value: ${sign}${datum.y.toLocaleString()}`,
        };
      },
    },
    // Series name for legend - use legendItemName for v9.3.2 compatibility
    legendItemName: seriesItem.name,
    showInLegend: true,
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
    series: agSeries,
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: normalizeAxisTitle(xAxis.title),
        gridLine: {
          enabled: xAxis.gridLines !== false,
        },
        label: {
          formatter: (params: any) => {
            const datum = params.datum;
            return datum?.categoryKey || params.value;
          },
        },
        // Category axis configuration - categories are inferred from data x values
      },
      {
        type: 'number',
        position: 'left',
        title: normalizeAxisTitle(yAxis.title),
        gridLine: {
          enabled: yAxis.gridLines !== false,
        },
        label: {
          formatter: (params: any) => {
            const value = params.value;
            const sign = value >= 0 ? '+' : '';
            return `${sign}${value.toLocaleString()}`;
          },
        },
        // Set min/max if provided
        ...(yAxis.min !== undefined && { min: yAxis.min }),
        ...(yAxis.max !== undefined && { max: yAxis.max }),
      },
    ],
    legend: {
      enabled: legend,
    },
    };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Waterfall chart'} />;
};

export default WaterfallChart;
