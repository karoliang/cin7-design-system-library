/**
 * Pie/Donut chart implementation for Vanilla JavaScript
 * Enterprise-grade circular chart visualization with AG Charts integration
 */

import { AgCharts } from 'ag-charts-community';
import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';
import type { AgChartOptions, AgChartInstance, AgChartsStatic } from '../types/ag-charts';

export interface VanillaPieChartDataPoint {
  /** Category name */
  name: string;
  /** Value */
  value: number;
  /** Custom color */
  color?: string;
  /** Additional properties */
  [key: string]: any;
}

export interface VanillaPieChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Pie chart data */
  data: VanillaPieChartDataPoint[];
  /** Series name */
  seriesName?: string;
  /** Chart variant */
  variant?: 'pie' | 'donut' | 'semi-circle';
  /** Show data labels */
  dataLabels?: boolean;
  /** Inner size for donut chart */
  innerSize?: string | number;
  /** Theme configuration */
  theme?: Cin7ChartTheme;
  /** Enable legend */
  legend?: boolean;
  /** Chart dimensions */
  width?: number;
  height?: number;
  /** Additional AG Charts options */
  chartOptions?: any;
}

/**
 * Initialize a pie/donut chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initPieChart } from '@cin7/ag-charts-adapter/vanilla';
 *
 * const chart = await initPieChart({
 *   container: '#my-chart',
 *   title: 'Market Share',
 *   variant: 'donut',
 *   data: [
 *     { name: 'Product A', value: 45 },
 *     { name: 'Product B', value: 30 },
 *     { name: 'Product C', value: 25 }
 *   ]
 * });
 * ```
 */
export async function initPieChart(options: VanillaPieChartOptions): Promise<any> {
  const {
    container,
    title,
    subtitle,
    data,
    variant = 'pie',
    dataLabels = true,
    innerSize,
    theme = { mode: 'light' },
    legend = true,
    width,
    height,
    chartOptions = {},
  } = options;

  // Get container element
  const containerEl =
    typeof container === 'string' ? document.querySelector(container) : container;

  if (!containerEl) {
    throw new Error('Container element not found');
  }

  // Load AG Charts dynamically
  const AgCharts = await import('ag-charts-community').then(m => m.AgCharts) as AgChartsStatic;

  // Calculate inner radius for donut charts - ensure proper type conversion
  let calculatedInnerSize: number | string = 0;
  if (variant === 'donut' || variant === 'semi-circle') {
    if (innerSize !== undefined) {
      calculatedInnerSize = typeof innerSize === 'string' ? innerSize : Number(innerSize);
    } else {
      calculatedInnerSize = variant === 'donut' ? '40%' : '0%';
    }
  }

  // Transform data for AG Charts
  const transformedData = data.map((point: VanillaPieChartDataPoint, index: number) => ({
    ...point,
    angleKey: 'value',
    calloutLabelKey: 'name',
    sectorLabelKey: 'name',
    radiusKey: 'value',
  }));

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
    data: transformedData,
    series: [
      {
        type: 'pie',
        calloutLabelKey: 'name',
        angleKey: 'value',
        sectorLabelKey: 'name',
        innerRadius: calculatedInnerSize,
        calloutLabel: {
          enabled: dataLabels,
        },
        sectorLabel: {
          enabled: dataLabels,
        },
        tooltip: {
          enabled: true,
        },
      },
    ],
    legend: {
      enabled: legend,
    },
    ...(width && { width }),
    ...(height && { height }),
  };

  // Create and return chart
  const chart = AgCharts.createAgChart({ ...config, container: containerEl });

  // Return update function for dynamic data updates
  return {
    chart,
    updateData: (newData: VanillaPieChartDataPoint[]) => {
      const transformedNewData = newData.map((point: VanillaPieChartDataPoint, index: number) => ({
        ...point,
        angleKey: 'value',
        calloutLabelKey: 'name',
        sectorLabelKey: 'name',
        radiusKey: 'value',
      }));

      chart.updateOptions({
        data: transformedNewData,
      });
    },
    updateOptions: (newOptions: Partial<VanillaPieChartOptions>) => {
      const updatedConfig = { ...config, ...newOptions };
      chart.updateOptions(updatedConfig);
    },
    destroy: () => {
      chart.destroy();
    },
    exportChart: (format: 'png' | 'jpg' | 'svg' = 'png') => {
      return chart.downloadChart({
        format,
        fileName: `pie-chart-${Date.now()}`,
      });
    },
  };
}

/**
 * Update existing pie chart with new data
 */
export function updatePieChart(
  chart: any,
  newData: VanillaPieChartDataPoint[],
  options?: Partial<VanillaPieChartOptions>
): void {
  if (!chart || !chart.updateOptions) {
    throw new Error('Invalid chart instance');
  }

  // Transform updated data for AG Charts
  const transformedData = newData.map((point, _index) => ({
    ...point,
    angleKey: 'value',
    calloutLabelKey: 'name',
    sectorLabelKey: 'name',
    radiusKey: 'value',
  }));

  const updateConfig = {
    data: transformedData,
    ...(options?.title && { title: { text: options.title, enabled: true } }),
    ...(options?.subtitle && { subtitle: { text: options.subtitle, enabled: true } }),
    ...(options?.legend !== undefined && { legend: { enabled: options.legend } }),
    ...(options?.width && { width: options.width }),
    ...(options?.height && { height: options.height }),
  };

  chart.updateOptions(updateConfig);
}

/**
 * Destroy pie chart and clean up resources
 */
export function destroyPieChart(chart: any): void {
  if (chart && chart.destroy) {
    chart.destroy();
  }
}