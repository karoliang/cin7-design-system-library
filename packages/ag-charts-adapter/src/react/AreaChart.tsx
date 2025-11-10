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
  const agSeries = series.map((seriesItem) => {
    // Determine data structure and xKey
    let xKey: string = 'x';
    let processedData: any[] = [];

    if (Array.isArray(seriesItem.data[0])) {
      // Data is in format [x, y] pairs
      xKey = 'x';
      processedData = seriesItem.data.map((point) => ({
        x: point[0],
        y: point[1],
      }));
    } else if (typeof seriesItem.data[0] === 'string') {
      // Data is categories, need to map to indices
      xKey = 'category';
      processedData = seriesItem.data.map((point, index) => ({
        category: point,
        y: 0, // This should be updated with actual y values
      }));
    } else {
      // Data is just y values with implicit x indices
      xKey = 'x';
      processedData = seriesItem.data.map((point, index) => ({
        x: index,
        y: point,
      }));
    }

    return {
      type: 'area',
      xKey,
      yKey: 'y',
      data: processedData,
      // Remove stroke and fill properties - colors are handled through theme
      // For custom colors, use item styling in chartOptions
      strokeWidth: seriesItem.strokeWidth || 2,
      fillOpacity: seriesItem.fillOpacity || fillOpacity,
      // Note: AG Charts doesn't support 'smooth' property directly
      // Use line interpolation instead if needed in chartOptions
      marker: {
        enabled: seriesItem.marker !== false ? markers : false,
        size: 6,
        strokeWidth: 2,
      },
      stacked: stacking === 'normal' || stacking === 'percent',
      groupBy: stacking === 'percent' ? 'y' : undefined,
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
        type: 'category',
        position: 'bottom',
        title: xAxis.title,
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
        title: yAxis.title,
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

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Area chart'} />;
};

export default AreaChart;
