/**
 * Vanilla JS utility for creating AG Charts bar/column charts
 */

import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaBarChartSeries {
  /** Series name */
  name: string;
  /** Data points */
  data: (number | [string, number] | [number, number])[];
  /** Stroke color */
  color?: string;
  /** Stroke width */
  strokeWidth?: number;
}

export interface VanillaBarChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: VanillaBarChartSeries[];
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
  /** Chart orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Enable data labels */
  dataLabels?: boolean;
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
 * Initialize a bar/column chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initBarChart } from '@cin7/ag-charts-adapter/vanilla';
 *
 * const chart = await initBarChart({
 *   container: '#my-chart',
 *   title: 'Sales by Product',
 *   orientation: 'vertical',
 *   series: [{
 *     name: 'Q1 Sales',
 *     data: [100, 200, 150, 300]
 *   }],
 *   xAxis: {
 *     categories: ['Product A', 'Product B', 'Product C', 'Product D']
 *   }
 * });
 * ```
 */
export async function initBarChart(options: VanillaBarChartOptions): Promise<any> {
  const {
    container,
    title,
    subtitle,
    series,
    xAxis = {},
    yAxis = {},
    orientation = 'vertical',
    dataLabels = false,
    stacking,
    theme = { mode: 'light' },
    legend = true,
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
  const chartType = orientation === 'vertical' ? 'column' : 'bar';

  // Transform series data for AG Charts
  const agSeries = series.map((seriesItem) => ({
    type: chartType,
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
    fill: seriesItem.color,
    stroke: seriesItem.color,
    strokeWidth: seriesItem.strokeWidth || 1,
    // @ts-ignore - stacking property exists in AG Charts
    stacked: stacking === 'normal' || stacking === 'percent',
    // @ts-ignore - stacking as percent
    groupBy: stacking === 'percent' ? 'y' : undefined,
    label: {
      enabled: dataLabels,
    },
  }));

  // Build axes configuration
  const axes = [];

  // X-axis configuration (swap for horizontal orientation)
  const xAxisPosition = orientation === 'horizontal' ? 'left' : 'bottom';
  const yAxisPosition = orientation === 'horizontal' ? 'bottom' : 'left';

  if (xAxis.categories || xAxis.type === 'category') {
    axes.push({
      type: 'category',
      position: xAxisPosition,
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
      position: xAxisPosition,
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
    position: yAxisPosition,
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
  const config: any = {
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
    ...(width && { width }),
    ...(height && { height }),
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
 * Update bar chart data
 */
export function updateBarChartData(
  chart: any,
  seriesData: VanillaBarChartSeries[]
): void {
  if (!chart || !chart.updateOptions) {
    throw new Error('Invalid chart instance');
  }

  // Transform updated series data
  const agSeries = seriesData.map((seriesItem) => ({
    type: chart.options.series[0].type,
    xKey: seriesItem.data.some(point => Array.isArray(point) && typeof point[0] === 'string') ? 'x' : undefined,
    yKey: 'y',
    data: seriesItem.data.map((point, index) => {
      if (Array.isArray(point)) {
        return { x: point[0], y: point[1] };
      }
      return { x: index, y: point };
    }),
    fill: seriesItem.color,
    stroke: seriesItem.color,
    strokeWidth: seriesItem.strokeWidth || 1,
    label: {
      enabled: chart.options.series[0].label?.enabled || false,
    },
  }));

  // Update chart with new data
  chart.updateOptions({ series: agSeries });
}

/**
 * Destroy bar chart
 */
export function destroyBarChart(chart: any): void {
  if (chart && chart.destroy) {
    chart.destroy();
  } else if (chart && chart.destroyChart) {
    chart.destroyChart();
  }
}
