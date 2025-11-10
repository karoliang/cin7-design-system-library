/**
 * Vanilla JS utility for creating AG Charts line charts
 */

import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaLineChartSeries {
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

export interface VanillaLineChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: VanillaLineChartSeries[];
  /** X-axis configuration */
  xAxis?: {
    title?: string;
    categories?: string[];
    type?: 'category' | 'number';
    min?: number;
    max?: number;
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string;
    min?: number;
    max?: number;
    labelFormat?: string;
  };
  /** Enable smooth curves */
  smooth?: boolean;
  /** Enable markers */
  markers?: boolean;
  /** Stacking mode */
  stacking?: 'normal' | 'percent';
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
 * Initialize a line chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initLineChart } from '@cin7/ag-charts-adapter/vanilla';
 *
 * const chart = initLineChart({
 *   container: '#my-chart',
 *   title: 'Sales Trend',
 *   series: [{
 *     name: 'Sales',
 *     data: [1, 3, 2, 4, 5, 4, 6, 7]
 *   }],
 *   xAxis: {
 *     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
 *   }
 * });
 * ```
 */
export async function initLineChart(options: VanillaLineChartOptions): Promise<any> {
  const {
    container,
    title,
    subtitle,
    series,
    xAxis = {},
    yAxis = {},
    _smooth = false,
    markers = false,
    stacking,
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
    throw new Error(`Container not found: ${container}`);
  }

  // Load AG Charts dynamically if not already loaded
  const AgCharts = await loadAgCharts();

  // Apply theme
  const agTheme = getCin7AgChartsTheme(theme);

  // Transform series data for AG Charts
  const agSeries = series.map((seriesItem) => ({
    type: 'line',
    xKey: seriesItem.data.some(point => Array.isArray(point) && typeof point[0] === 'string') ? 'x' : undefined,
    yKey: 'y',
    data: seriesItem.data.map((point, index) => {
      if (Array.isArray(point)) {
        return { x: point[0], y: point[1] };
      }
      if (typeof point === 'string') {
        return { x: index, y: 0 }; // This shouldn't happen with proper data
      }
      return { x: index, y: point };
    }),
    stroke: seriesItem.color,
    strokeWidth: seriesItem.strokeWidth || 2,
    marker: {
      enabled: seriesItem.marker !== false ? markers : false,
      size: 6,
      strokeWidth: 2,
    },
    // @ts-ignore - stacking property exists in AG Charts
    stacked: stacking === 'normal' || stacking === 'percent',
    // @ts-ignore - stacking as percent
    groupBy: stacking === 'percent' ? 'y' : undefined,
    label: {
      enabled: false, // Data labels handled separately if needed
    },
  }));

  // Build axes configuration
  const axes = [];

  // X-axis configuration
  if (xAxis.categories || xAxis.type === 'category') {
    axes.push({
      type: 'category',
      position: 'bottom',
      title: {
        text: xAxis.title,
        enabled: !!xAxis.title,
      },
      category: xAxis.categories,
      min: xAxis.min,
      max: xAxis.max,
    });
  } else {
    axes.push({
      type: 'number',
      position: 'bottom',
      title: {
        text: xAxis.title,
        enabled: !!xAxis.title,
      },
      min: xAxis.min,
      max: xAxis.max,
    });
  }

  // Y-axis configuration
  axes.push({
    type: 'number',
    position: 'left',
    title: {
      text: yAxis.title,
      enabled: !!yAxis.title,
    },
    min: yAxis.min,
    max: yAxis.max,
    label: {
      format: yAxis.labelFormat,
    },
  });

  // Build chart configuration
  const config = {
    ...agTheme,
    ...chartOptions,
    container: containerEl as HTMLElement,
    title: {
      text: title,
      enabled: !!title,
    },
    subtitle: {
      text: subtitle,
      enabled: !!subtitle,
    },
    series: agSeries,
    axes,
    legend: {
      enabled: legend,
    },
    width,
    height,
    // Performance optimizations
    animation: true,
    interaction: {
      crosshair: {
        enabled: true,
      },
    },
  };

  // Create and return chart
  const chart = AgCharts.createAgChart(config);

  return chart;
}

/**
 * Load AG Charts library dynamically
 */
function loadAgCharts(): Promise<any> {
  return new Promise((resolve, reject) => {
    // Check if AG Charts is already loaded
    if ((window as any).AgCharts) {
      resolve((window as any).AgCharts);
      return;
    }

    // Load AG Charts Community dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/ag-charts-community@9.2.0/dist/umd/ag-charts-community.js';
    script.onload = () => {
      if ((window as any).AgCharts) {
        resolve((window as any).AgCharts);
      } else {
        reject(new Error('AG Charts failed to load properly'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load AG Charts script'));
    document.head.appendChild(script);
  });
}

/**
 * Update line chart data
 */
export function updateLineChartData(
  chart: any,
  seriesData: VanillaLineChartSeries[]
): void {
  if (!chart || !chart.updateOptions) {
    throw new Error('Invalid chart instance');
  }

  // Transform updated series data
  const agSeries = seriesData.map((seriesItem) => ({
    type: 'line',
    xKey: seriesItem.data.some(point => Array.isArray(point) && typeof point[0] === 'string') ? 'x' : undefined,
    yKey: 'y',
    data: seriesItem.data.map((point, index) => {
      if (Array.isArray(point)) {
        return { x: point[0], y: point[1] };
      }
      return { x: index, y: point };
    }),
    stroke: seriesItem.color,
    strokeWidth: seriesItem.strokeWidth || 2,
    marker: {
      enabled: seriesItem.marker !== false,
      size: 6,
      strokeWidth: 2,
    },
  }));

  // Update chart with new data
  chart.updateOptions({ series: agSeries });
}

/**
 * Destroy line chart
 */
export function destroyLineChart(chart: any): void {
  if (chart && chart.destroy) {
    chart.destroy();
  } else if (chart && chart.destroyChart) {
    chart.destroyChart();
  }
}
