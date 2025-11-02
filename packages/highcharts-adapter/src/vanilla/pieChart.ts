/**
 * Vanilla JS utility for creating Highcharts pie/donut charts
 */

import * as Highcharts from 'highcharts';
import { getCin7HighchartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaPieChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Pie chart data */
  data: Highcharts.PointOptionsObject[];
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
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Initialize a pie/donut chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initPieChart } from '@cin7/highcharts-adapter/vanilla';
 *
 * const chart = initPieChart({
 *   container: '#my-chart',
 *   title: 'Market Share',
 *   variant: 'donut',
 *   data: [
 *     { name: 'Product A', y: 45 },
 *     { name: 'Product B', y: 30 },
 *     { name: 'Product C', y: 25 }
 *   ]
 * });
 * ```
 */
export function initPieChart(options: VanillaPieChartOptions): Highcharts.Chart {
  const {
    container,
    title,
    subtitle,
    data,
    seriesName = 'Data',
    variant = 'pie',
    dataLabels = true,
    innerSize,
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

  // Apply theme
  const baseTheme = getCin7HighchartsTheme(theme);

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
  const startAngle = variant === 'semi-circle' ? -90 : 0;
  const endAngle = variant === 'semi-circle' ? 90 : 360;

  // Build chart configuration
  const config: Highcharts.Options = {
    ...baseTheme,
    ...chartOptions,
    chart: {
      ...baseTheme.chart,
      type: 'pie',
      renderTo: containerEl as HTMLElement,
      ...chartOptions.chart,
    },
    title: {
      ...baseTheme.title,
      text: title,
      ...chartOptions.title,
    },
    subtitle: {
      ...baseTheme.subtitle,
      text: subtitle,
      ...chartOptions.subtitle,
    },
    legend: {
      ...baseTheme.legend,
      enabled: legend,
    },
    plotOptions: {
      ...baseTheme.plotOptions,
      pie: {
        ...baseTheme.plotOptions?.pie,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: dataLabels,
          format: '<b>{point.name}</b>: {point.percentage:.1f}%',
        },
        showInLegend: legend,
        innerSize: calculatedInnerSize,
        startAngle,
        endAngle,
      },
    },
    series: [
      {
        type: 'pie',
        name: seriesName,
        data,
      },
    ],
  };

  // Create and return chart
  return Highcharts.chart(containerEl as HTMLElement, config);
}

/**
 * Update pie chart data
 */
export function updatePieChartData(
  chart: Highcharts.Chart,
  data: Highcharts.PointOptionsObject[]
): void {
  if (chart.series[0]) {
    chart.series[0].setData(data, true);
  }
}

/**
 * Destroy pie chart
 */
export function destroyPieChart(chart: Highcharts.Chart): void {
  chart.destroy();
}
