/**
 * LineChart - Line chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { getCin7ChartColors } from '../utilities/theme';
import { normalizeAxisTitle } from '../utilities/axisHelpers';
import type { AgChartOptions } from 'ag-charts-community';

export interface LineChartSeries {
  /** Series name */
  name: string;
  /** Data points */
  data: (number | [string, number] | [number, number])[];
  /** Stroke color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Enable markers */
  marker?: boolean;
}

export interface LineChartAxisConfig {
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

export interface LineChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: LineChartSeries[];
  /** X-axis configuration */
  xAxis?: LineChartAxisConfig;
  /** Y-axis configuration */
  yAxis?: LineChartAxisConfig;
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
  tooltip?: boolean;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
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
    // Determine data structure and xKey
    let xKey: string = 'x';
    let processedData: any[] = [];

    // Filter out invalid data points and process the valid ones
    const validData = seriesItem.data.filter(point => point !== null && point !== undefined);

    if (validData.length === 0) {
      processedData = [];
    } else if (Array.isArray(validData[0])) {
      // Data is in format [x, y] pairs
      xKey = 'x';
      processedData = validData.map((point) => ({
        x: point[0],
        y: point[1],
      })).filter(point => point.x !== null && point.x !== undefined && point.y !== null && point.y !== undefined);
    } else if (typeof validData[0] === 'string') {
      // Data is categories, need to map to indices with actual y values
      xKey = 'x';
      processedData = validData.map((point, index) => ({
        x: point,
        y: 0, // This case shouldn't happen - LineChart should receive y values
      }));
    } else {
      // Data is just y values with implicit x indices
      xKey = 'x';
      processedData = validData.map((point, index) => ({
        x: index,
        y: point,
      })).filter(point => point.y !== null && point.y !== undefined);
    }

    const seriesColor = seriesItem.color || chartColors[index % chartColors.length];

    return {
      type: 'line',
      xKey,
      yKey: 'y',
      data: processedData,
      // Apply stroke property at series level using StrokeOptions
      stroke: seriesColor,
      strokeWidth: seriesItem.strokeWidth || 2,
      strokeOpacity: 1,
      marker: {
        enabled: seriesItem.marker !== false ? markers : false,
        // Apply marker fill and stroke to match line color
        fill: seriesColor,
        stroke: seriesColor,
        strokeWidth: 1,
      },
      stacked: stacking === 'normal' || stacking === 'percent',
      // For percent stacking, set normalizedTo to 100
      ...(stacking === 'percent' && { normalizedTo: 100 }),
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
        type: 'category' as any,
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
        type: 'number' as any,
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

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Line chart'} />;
};

export default LineChart;