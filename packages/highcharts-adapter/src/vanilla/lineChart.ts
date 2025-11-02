/**
 * Vanilla JS utility for creating Highcharts line charts
 */

import * as Highcharts from 'highcharts';
import { getCin7HighchartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaLineChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: Highcharts.SeriesLineOptions[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
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
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Initialize a line chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initLineChart } from '@cin7/highcharts-adapter/vanilla';
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
export function initLineChart(options: VanillaLineChartOptions): Highcharts.Chart {
  const {
    container,
    title,
    subtitle,
    series,
    xAxis = {},
    yAxis = {},
    smooth = false,
    markers = false,
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

  // Apply theme
  const baseTheme = getCin7HighchartsTheme(theme);
  const chartType = smooth ? 'spline' : 'line';

  // Build chart configuration
  const config: Highcharts.Options = {
    ...baseTheme,
    ...chartOptions,
    chart: {
      ...baseTheme.chart,
      type: chartType,
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
    xAxis: {
      ...baseTheme.xAxis,
      ...xAxis,
    },
    yAxis: {
      ...baseTheme.yAxis,
      ...yAxis,
    },
    legend: {
      ...baseTheme.legend,
      enabled: legend,
    },
    plotOptions: {
      ...baseTheme.plotOptions,
      series: {
        ...baseTheme.plotOptions?.series,
        marker: {
          enabled: markers,
        },
        stacking,
      },
    },
    series: series as Highcharts.SeriesOptionsType[],
  };

  // Create and return chart
  return Highcharts.chart(containerEl as HTMLElement, config);
}

/**
 * Update line chart data
 */
export function updateLineChartData(
  chart: Highcharts.Chart,
  seriesData: Array<{ name?: string; data: number[] | Highcharts.PointOptionsObject[] }>
): void {
  seriesData.forEach((data, index) => {
    if (chart.series[index]) {
      chart.series[index].setData(data.data, false);
      if (data.name) {
        chart.series[index].update({ type: chart.series[index].type, name: data.name } as Highcharts.SeriesOptionsType, false);
      }
    }
  });
  chart.redraw();
}

/**
 * Destroy line chart
 */
export function destroyLineChart(chart: Highcharts.Chart): void {
  chart.destroy();
}
