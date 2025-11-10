/**
 * PieChart - Pie/Donut chart component with Cin7 theming
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import type { AgChartOptions } from 'ag-charts-community';

export interface PieChartSeries {
  /** Series name */
  name: string;
  /** Data points */
  data: (number | [string, number] | { label: string; value: number; color?: string })[];
}

export interface PieChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: PieChartSeries;
  /** Inner radius for donut chart */
  innerRadius?: number | string;
  /** Outer radius */
  outerRadius?: number | string;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Enable legend */
  legend?: boolean;
  /** Enable tooltip */
  tooltip?: boolean;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Pie/Donut chart component for proportional data visualization
 *
 * @example
 * ```tsx
 * <PieChart
 *   title="Market Share"
 *   series={{
 *     name: 'Companies',
 *     data: [
 *       ['Company A', 30],
 *       ['Company B', 25],
 *       ['Company C', 45]
 *     ]
 *   }}
 * />
 * ```
 */
export const PieChart: React.FC<PieChartProps> = ({
  title,
  subtitle,
  series,
  innerRadius,
  outerRadius,
  dataLabels = true,
  legend = true,
  tooltip = true,
  chartOptions = {},
  ...containerProps
}) => {
  // Validate series data
  if (!series || !series.data || !Array.isArray(series.data)) {
    console.error('PieChart: Invalid series data provided. Expected { name: string, data: Array }', series);
    return (
      <div
        className="chart-error"
        style={{
          padding: '20px',
          border: '1px solid #ff6b6b',
          borderRadius: '4px',
          backgroundColor: '#ffe0e0',
          textAlign: 'center'
        }}
        role="alert"
      >
        <h3>Chart Data Error</h3>
        <p>Invalid data provided to PieChart component. Please check the data format.</p>
      </div>
    );
  }

  // Convert series data to AG Charts format
  const data = series.data.filter((point, index) => {
    // Filter out null/undefined values and log warnings
    if (point === null || point === undefined) {
      console.warn(`PieChart: Skipping invalid data point at index ${index}:`, point);
      return false;
    }
    return true;
  }).map((point, index) => {
    if (Array.isArray(point)) {
      return {
        label: point[0],
        value: point[1],
      };
    }
    if (typeof point === 'number') {
      return {
        label: `Item ${index + 1}`,
        value: point,
      };
    }
    return point;
  });

  // Check if we have any valid data after filtering
  if (data.length === 0) {
    console.warn('PieChart: No valid data points found after filtering');
    return (
      <div
        className="chart-empty"
        style={{
          padding: '40px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          backgroundColor: '#f8f9fa',
          textAlign: 'center'
        }}
        role="status"
      >
        <h3>No Data Available</h3>
        <p>There is no valid data to display in the chart.</p>
      </div>
    );
  }

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
    data,
    series: [
      ({
        type: 'pie',
        calloutLabelKey: 'label',
        angleKey: 'value',
        sectorLabelKey: 'label',
        innerRadius,
        outerRadius,
        calloutLabel: {
          enabled: dataLabels,
        },
        sectorLabel: {
          enabled: dataLabels,
        },
        tooltip: {
          enabled: tooltip,
        },
        // Use legendItemName for series naming
        legendItemName: series.name,
        showInLegend: true,
      } as any),
    ],
    legend: {
      enabled: legend,
    },
  };

  return <ChartContainer options={options} {...containerProps} ariaLabel={title || 'Pie chart'} />;
};

export default PieChart;