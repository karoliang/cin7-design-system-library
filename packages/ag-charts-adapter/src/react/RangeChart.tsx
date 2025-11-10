/**
 * RangeChart - Range visualization with min/max value display
 * Advanced range chart component for AG Charts integration
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { normalizeAxisTitle } from '../utilities/axisHelpers';
import type { AgChartOptions } from 'ag-charts-community';

export interface RangeChartDataPoint {
  /** Category or timestamp */
  x: string | number | Date;
  /** Minimum value */
  min: number;
  /** Maximum value */
  max: number;
  /** Category or group */
  category?: string;
}

export interface RangeChartSeries {
  /** Series name */
  name: string;
  /** Range data points */
  data: RangeChartDataPoint[];
  /** Series color */
  color?: string;
  /** Fill opacity */
  fillOpacity?: number;
  /** Show markers */
  markers?: boolean;
  /** Stroke width */
  strokeWidth?: number;
}

export interface RangeChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Range chart data */
  series: RangeChartSeries[];
  /** Show data labels */
  dataLabels?: boolean;
  /** Show markers */
  markers?: boolean;
  /** Default fill opacity */
  fillOpacity?: number;
  /** Enable legend */
  legend?: boolean;
  /** X-axis configuration */
  xAxis?: {
    title?: string | { text: string };
    categories?: string[];
    type?: 'category' | 'time' | 'number';
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string | { text: string };
    min?: number;
    max?: number;
    labelFormat?: string;
  };
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Range chart component for visualizing min/max value ranges
 *
 * @example
 * ```tsx
 * <RangeChart
 *   title="Temperature Ranges"
 *   series={[{
 *     name: "Daily Temperature",
 *     data: [
 *       { x: "Mon", min: 15, max: 25 },
 *       { x: "Tue", min: 18, max: 28 },
 *       { x: "Wed", min: 12, max: 22 }
 *     ]
 *   }]}
 * />
 * ```
 */
export const RangeChart: React.FC<RangeChartProps> = ({
  title,
  subtitle,
  series,
  dataLabels = false,
  markers = true,
  fillOpacity = 0.6,
  legend = true,
  xAxis = {},
  yAxis = {},
  chartOptions = {},
  ...containerProps
}) => {
  // Convert series data to AG Charts format (area charts with min/max lines)
  const agSeries = series.map((seriesItem) => {
    // Create high and low data series for range visualization
    const highData = seriesItem.data.map((point) => ({
      x: point.x,
      y: point.max,
      category: point.category || seriesItem.name,
    }));

    const lowData = seriesItem.data.map((point) => ({
      x: point.x,
      y: point.min,
      category: point.category || seriesItem.name,
    }));

    return [
      {
        type: 'area',
        name: `${seriesItem.name} - Max`,
        data: highData,
        stroke: seriesItem.color,
        strokeWidth: seriesItem.strokeWidth || 2,
        fill: seriesItem.color,
        fillOpacity: (seriesItem.fillOpacity || fillOpacity) * 0.8,
        marker: {
          enabled: seriesItem.markers !== false ? markers : false,
          size: 4,
          strokeWidth: 1,
        },
        calloutLabel: {
          enabled: dataLabels,
        },
      },
      {
        type: 'area',
        name: `${seriesItem.name} - Min`,
        data: lowData,
        stroke: seriesItem.color,
        strokeWidth: seriesItem.strokeWidth || 2,
        fill: seriesItem.color,
        fillOpacity: (seriesItem.fillOpacity || fillOpacity) * 0.3,
        marker: {
          enabled: false, // Hide markers for min values for cleaner look
        },
        calloutLabel: {
          enabled: false, // Hide labels for min values
        },
      },
    ];
  }).flat();

  // Add connecting lines between min and max points
  const connectorData = series.map((seriesItem) => ({
    type: 'line',
    name: `${seriesItem.name} - Range`,
    data: seriesItem.data.map((point) => ({
      x: point.x,
      y: (point.min + point.max) / 2, // Middle point for connector
      category: point.category || seriesItem.name,
    })),
    stroke: seriesItem.color,
    strokeWidth: 1,
    strokeDasharray: [5, 5],
    marker: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      renderer: (params: any) => {
        const point = params.datum;
        const originalPoint = seriesItem.data.find(p => p.x === point.x);
        if (originalPoint) {
          const range = originalPoint.max - originalPoint.min;
          return `
            <div style="padding: 8px;">
              <strong>${seriesItem.name}</strong><br/>
              Range: ${originalPoint.min} - ${originalPoint.max}<br/>
              Span: ${range}
            </div>
          `;
        }
        return '';
      },
    },
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
    series: [...agSeries, ...connectorData],
    axes: [
      {
        type: xAxis.type || (xAxis.categories ? 'category' : 'number'),
        position: 'bottom',
        title: normalizeAxisTitle(xAxis.title) || {
          text: xAxis.categories ? 'Categories' : 'Values',
          enabled: !xAxis.categories,
        },
        categories: xAxis.categories,
        label: {
          format: xAxis.type === 'time' ? '%b %d, %Y' : undefined,
        },
        grid: {
          enabled: true,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: normalizeAxisTitle(yAxis.title) || {
          text: 'Values',
          enabled: true,
        },
        min: yAxis.min,
        max: yAxis.max,
        label: {
          format: yAxis.labelFormat,
        },
        grid: {
          enabled: true,
        },
      },
    ],
    legend: {
      enabled: legend && series.length > 1,
    },
  };

  return (
    <ChartContainer
      options={options}
      {...containerProps}
    />
  );
};