/**
 * Vanilla JS utility for creating AG Charts pie/donut charts
 */

import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';

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
    _seriesName = 'Data',
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
    throw new Error(`Container not found: ${container}`);
  }

  // Load AG Charts dynamically if not already loaded
  const AgCharts = await loadAgCharts();

  // Apply theme
  const agTheme = getCin7AgChartsTheme(theme);

  // Determine inner size based on variant
  let calculatedInnerSize = innerSize;
  if (!calculatedInnerSize) {
    if (variant === 'donut') {
      calculatedInnerSize = '50%';
    } else if (variant === 'semi-circle') {
      calculatedInnerSize = '40%';
    }
  }

  // Determine angles for semi-circle
  const _startAngle = variant === 'semi-circle' ? -90 : 0;
  const _endAngle = variant === 'semi-circle' ? 90 : 360;

  // Transform data for AG Charts
  const transformedData = data.map((point, _index) => ({
    ...point,
    angleKey: 'value',
    calloutLabelKey: 'name',
    sectorLabelKey: 'name',
    radiusKey: 'value',
  }));

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
    series: [{
      type: 'pie',
      calls: {
        titleKey: 'name',
        ...transformedData,
      },
      data: transformedData,
      angleKey: 'value',
      calloutLabelKey: 'name',
      sectorLabelKey: 'name',
      radiusKey: 'value',
      showInLegend: legend,
      calloutLabels: {
        enabled: dataLabels,
      },
      sectorLabels: {
        enabled: dataLabels,
        formatter: (params: any) => {
          const value = params.datum.value;
          const total = data.reduce((sum, item) => sum + item.value, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `<b>${params.datum.name}</b>: ${percentage}%`;
        },
      },
      // Inner radius for donut chart
      innerRadius: calculatedInnerSize === '50%' ? 50 : calculatedInnerSize === '40%' ? 40 : 0,
      // Semi-circle configuration
      startAngle: variant === 'semi-circle' ? -90 : 0,
      endAngle: variant === 'semi-circle' ? 90 : 360,
    }],
    legend: {
      enabled: legend,
    },
    ...(width && { width }),
    ...(height && { height }),
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
 * Update pie chart data
 */
export function updatePieChartData(
  chart: any,
  data: VanillaPieChartDataPoint[]
): void {
  if (!chart || !chart.updateOptions) {
    throw new Error('Invalid chart instance');
  }

  // Transform updated data for AG Charts
  const transformedData = data.map((point, _index) => ({
    ...point,
    angleKey: 'value',
    calloutLabelKey: 'name',
    sectorLabelKey: 'name',
    radiusKey: 'value',
  }));

  // Update chart with new data
  chart.updateOptions({
    series: [{
      ...chart.options.series[0],
      data: transformedData,
    }]
  });
}

/**
 * Destroy pie chart
 */
export function destroyPieChart(chart: any): void {
  if (chart && chart.destroy) {
    chart.destroy();
  } else if (chart && chart.destroyChart) {
    chart.destroyChart();
  }
}
