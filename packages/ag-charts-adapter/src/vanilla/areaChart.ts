/**
 * Area chart implementation for Vanilla JavaScript
 * Enterprise-grade area visualization with gradient fills and stacked support
 */

import { AgCharts } from 'ag-charts-community';
import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaAreaChartDataPoint {
  /** Category name or x-axis value */
  x: string | number;
  /** Y-axis value */
  y: number;
  /** Series/category */
  series?: string;
  /** Additional properties */
  [key: string]: any;
}

export interface VanillaAreaChartSeries {
  /** Series name */
  name: string;
  /** Series data */
  data: VanillaAreaChartDataPoint[];
  /** Series color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Fill opacity */
  fillOpacity?: number;
  /** Show markers */
  markers?: boolean;
}

export interface VanillaAreaChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Area chart data */
  data: VanillaAreaChartSeries[];
  /** Chart variant */
  variant?: 'area' | 'stacked' | 'percentage';
  /** Enable smooth curves */
  smooth?: boolean;
  /** Show data labels */
  dataLabels?: boolean;
  /** Show markers */
  markers?: boolean;
  /** Default fill opacity */
  fillOpacity?: number;
  /** Theme configuration */
  theme?: Cin7ChartTheme;
  /** Enable legend */
  legend?: boolean;
  /** Chart dimensions */
  width?: number;
  height?: number;
  /** X-axis configuration */
  xAxis?: {
    title?: string;
    categories?: string[];
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string;
    min?: number;
    max?: number;
  };
  /** Additional AG Charts options */
  chartOptions?: any;
}

/**
 * Initialize an area chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initAreaChart } from '@cin7/ag-charts-adapter/vanilla';
 *
 * const chart = await initAreaChart({
 *   container: '#my-chart',
 *   title: 'Revenue Trends',
 *   variant: 'stacked',
 *   smooth: true,
 *   data: [
 *     {
 *       name: 'Product A',
 *       data: [
 *         { x: 'Q1', y: 100 },
 *         { x: 'Q2', y: 150 },
 *         { x: 'Q3', y: 180 }
 *       ]
 *     }
 *   ]
 * });
 * ```
 */
export async function initAreaChart(options: VanillaAreaChartOptions): Promise<any> {
  const {
    container,
    title,
    subtitle,
    data,
    variant = 'area',
    smooth = false,
    dataLabels = false,
    markers = false,
    fillOpacity = 0.75,
    theme = { mode: 'light' },
    legend = true,
    width,
    height,
    xAxis = {},
    yAxis = {},
    chartOptions = {},
  } = options;

  // Get container element
  const containerEl =
    typeof container === 'string' ? document.querySelector(container) : container;

  if (!containerEl) {
    throw new Error('Container element not found');
  }

  // Load AG Charts dynamically
  const AgCharts = await import('ag-charts-community').then(m => m.AgCharts);

  // Determine if data is categorized
  const hasCategories = data.length > 0 &&
    data[0].data.length > 0 &&
    typeof data[0].data[0].x === 'string';

  // Process data for AG Charts
  let processedData: any[] = [];
  let categories: string[] = [];

  if (hasCategories) {
    // Categorical data - transform to AG Charts format
    categories = Array.from(new Set(data.flatMap(series =>
      series.data.map(point => point.x as string)
    )));

    processedData = data.map(series => ({
      type: 'area',
      name: series.name,
      data: series.data.map(point => ({
        x: point.x,
        y: point.y,
      })),
      stroke: series.color,
      strokeWidth: series.strokeWidth || 2,
      fill: series.color,
      fillOpacity: series.fillOpacity || fillOpacity,
      smooth: smooth,
      marker: {
        enabled: series.markers !== false ? markers : false,
        size: 6,
        strokeWidth: 2,
      },
      calloutLabel: {
        enabled: dataLabels,
      },
      // Add gradient fills for modern appearance
      fillGradient: {
        gradient: 'linear',
        stops: [
          { offset: 0, color: series.color + '40' }, // 40% opacity at top
          { offset: 1, color: series.color }, // Full opacity at bottom
        ],
      },
    }));
  } else {
    // Numerical data
    processedData = data.map(series => ({
      type: 'area',
      name: series.name,
      data: series.data.map(point => ({
        x: point.x,
        y: point.y,
      })),
      stroke: series.color,
      strokeWidth: series.strokeWidth || 2,
      fill: series.color,
      fillOpacity: series.fillOpacity || fillOpacity,
      smooth: smooth,
      marker: {
        enabled: series.markers !== false ? markers : false,
        size: 6,
        strokeWidth: 2,
      },
      calloutLabel: {
        enabled: dataLabels,
      },
      fillGradient: {
        gradient: 'linear',
        stops: [
          { offset: 0, color: series.color + '40' },
          { offset: 1, color: series.color },
        ],
      },
    }));
  }

  // Apply stacking configuration
  if (variant === 'stacked' || variant === 'percentage') {
    processedData = processedData.map(series => ({
      ...series,
      stacked: true,
      groupBy: variant === 'percentage' ? 'y' : undefined,
    }));
  }

  // Create axes configuration
  const axes = [
    {
      type: hasCategories ? 'category' : 'number',
      position: 'bottom',
      title: {
        text: xAxis.title || (hasCategories ? 'Category' : 'X Axis'),
        enabled: !!xAxis.title || !hasCategories,
      },
      categories: hasCategories ? (xAxis.categories || categories) : undefined,
      grid: {
        enabled: true,
      },
    },
    {
      type: 'number',
      position: 'left',
      title: {
        text: yAxis.title || 'Value',
        enabled: !!yAxis.title || true,
      },
      min: yAxis.min,
      max: yAxis.max,
      grid: {
        enabled: true,
      },
    },
  ];

  // Apply theme
  const cin7Theme = getCin7AgChartsTheme(theme);

  // Create chart configuration
  const config = {
    ...chartOptions,
    ...cin7Theme,
    title: {
      text: title,
      enabled: !!title,
    },
    subtitle: {
      text: subtitle,
      enabled: !!subtitle,
    },
    data: [],
    series: processedData,
    axes,
    legend: {
      enabled: legend && data.length > 1,
    },
    ...(width && { width }),
    ...(height && { height }),
  };

  // Create and return chart
  const chart = AgCharts.createAgChart(containerEl, config);

  // Return update function for dynamic data updates
  return {
    chart,
    updateData: (newData: VanillaAreaChartSeries[]) => {
      // Process new data
      let newProcessedData = processedData;

      if (hasCategories) {
        const newCategories = Array.from(new Set(newData.flatMap(series =>
          series.data.map(point => point.x as string)
        )));

        newProcessedData = newData.map(series => ({
          type: 'area',
          name: series.name,
          data: series.data.map(point => ({
            x: point.x,
            y: point.y,
          })),
          stroke: series.color,
          strokeWidth: series.strokeWidth || 2,
          fill: series.color,
          fillOpacity: series.fillOpacity || fillOpacity,
          smooth: smooth,
          marker: {
            enabled: series.markers !== false ? markers : false,
            size: 6,
            strokeWidth: 2,
          },
        }));
      }

      // Apply stacking
      if (variant === 'stacked' || variant === 'percentage') {
        newProcessedData = newProcessedData.map(series => ({
          ...series,
          stacked: true,
          groupBy: variant === 'percentage' ? 'y' : undefined,
        }));
      }

      chart.updateOptions({
        series: newProcessedData,
      });
    },
    updateOptions: (newOptions: Partial<VanillaAreaChartOptions>) => {
      const updatedConfig = { ...config, ...newOptions };
      chart.updateOptions(updatedConfig);
    },
    destroy: () => {
      chart.destroy();
    },
    exportChart: (format: 'png' | 'jpg' | 'svg' = 'png') => {
      return chart.downloadChart({
        format,
        fileName: `area-chart-${Date.now()}`,
      });
    },
    switchVariant: (newVariant: 'area' | 'stacked' | 'percentage') => {
      const updatedSeries = processedData.map(series => {
        const baseSeries = { ...series };

        if (newVariant === 'area') {
          delete baseSeries.stacked;
          delete baseSeries.groupBy;
        } else if (newVariant === 'stacked') {
          baseSeries.stacked = true;
          delete baseSeries.groupBy;
        } else if (newVariant === 'percentage') {
          baseSeries.stacked = true;
          baseSeries.groupBy = 'y';
        }

        return baseSeries;
      });

      chart.updateOptions({
        series: updatedSeries,
      });
    },
  };
}

/**
 * Update existing area chart with new data
 */
export function updateAreaChart(
  chart: any,
  newData: VanillaAreaChartSeries[],
  options?: Partial<VanillaAreaChartOptions>
): void {
  if (!chart || !chart.updateOptions) {
    throw new Error('Invalid chart instance');
  }

  const updateConfig = {
    series: newData,
    ...(options?.title && { title: { text: options.title, enabled: true } }),
    ...(options?.subtitle && { subtitle: { text: options.subtitle, enabled: true } }),
    ...(options?.legend !== undefined && { legend: { enabled: options.legend } }),
    ...(options?.width && { width: options.width }),
    ...(options?.height && { height: options.height }),
  };

  chart.updateOptions(updateConfig);
}

/**
 * Destroy area chart and clean up resources
 */
export function destroyAreaChart(chart: any): void {
  if (chart && chart.destroy) {
    chart.destroy();
  }
}