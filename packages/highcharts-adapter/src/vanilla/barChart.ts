/**
 * Vanilla JS utility for creating Highcharts bar/column charts
 */

import * as Highcharts from 'highcharts';
import { getCin7HighchartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaBarChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Series data */
  series: Highcharts.SeriesBarOptions[] | Highcharts.SeriesColumnOptions[];
  /** X-axis configuration */
  xAxis?: Highcharts.XAxisOptions;
  /** Y-axis configuration */
  yAxis?: Highcharts.YAxisOptions;
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
  /** Additional Highcharts options */
  chartOptions?: Highcharts.Options;
}

/**
 * Initialize a bar/column chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initBarChart } from '@cin7/highcharts-adapter/vanilla';
 *
 * const chart = initBarChart({
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
export function initBarChart(options: VanillaBarChartOptions): Highcharts.Chart {
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

  // Apply theme
  const baseTheme = getCin7HighchartsTheme(theme);
  const chartType = orientation === 'vertical' ? 'column' : 'bar';

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
      [chartType]: {
        ...baseTheme.plotOptions?.[chartType],
        dataLabels: {
          enabled: dataLabels,
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
 * Update bar chart data
 */
export function updateBarChartData(
  chart: Highcharts.Chart,
  seriesData: Array<{ name?: string; data: number[] | Highcharts.PointOptionsObject[] }>
): void {
  seriesData.forEach((data, index) => {
    if (chart.series[index]) {
      chart.series[index].setData(data.data, false);
      if (data.name) {
        chart.series[index].update({ name: data.name }, false);
      }
    }
  });
  chart.redraw();
}

/**
 * Destroy bar chart
 */
export function destroyBarChart(chart: Highcharts.Chart): void {
  chart.destroy();
}
