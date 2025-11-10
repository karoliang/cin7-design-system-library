/**
 * Scatter/Bubble chart implementation for Vanilla JavaScript
 * Enterprise-grade scatter visualization with correlation analysis
 */

import { AgCharts } from 'ag-charts-community';
import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface VanillaScatterChartDataPoint {
  /** X-axis value */
  x: number;
  /** Y-axis value */
  y: number;
  /** Bubble size (for bubble charts) */
  size?: number;
  /** Category/group */
  category?: string;
  /** Additional properties */
  [key: string]: any;
}

export interface VanillaScatterChartOptions {
  /** Container element or selector */
  container: string | HTMLElement;
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Scatter chart data */
  data: VanillaScatterChartDataPoint[];
  /** Series name */
  seriesName?: string;
  /** Chart variant */
  variant?: 'scatter' | 'bubble';
  /** Show trend line */
  trendLine?: boolean;
  /** Enable correlation analysis */
  correlation?: boolean;
  /** Show data labels */
  dataLabels?: boolean;
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
 * Initialize a scatter/bubble chart in a DOM element
 *
 * @example
 * ```javascript
 * import { initScatterChart } from '@cin7/ag-charts-adapter/vanilla';
 *
 * const chart = await initScatterChart({
 *   container: '#my-chart',
 *   title: 'Correlation Analysis',
 *   variant: 'bubble',
 *   data: [
 *     { x: 10, y: 20, size: 5, category: 'Group A' },
 *     { x: 15, y: 35, size: 8, category: 'Group B' },
 *     { x: 25, y: 45, size: 12, category: 'Group A' }
 *   ]
 * });
 * ```
 */
export async function initScatterChart(options: VanillaScatterChartOptions): Promise<any> {
  const {
    container,
    title,
    subtitle,
    data,
    seriesName = 'Data',
    variant = 'scatter',
    trendLine = false,
    correlation = false,
    dataLabels = false,
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
  const AgCharts = await import('ag-charts-community').then(m => m.AgCharts);

  // Group data by category if provided
  const categoryGroups = data.reduce((groups, point) => {
    const category = point.category || seriesName;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(point);
    return groups;
  }, {} as Record<string, VanillaScatterChartDataPoint[]>);

  // Create series for each category
  const series = Object.entries(categoryGroups).map(([category, categoryData]) => ({
    type: 'scatter',
    name: category,
    data: categoryData.map(point => ({
      ...point,
      size: point.size || (variant === 'bubble' ? 5 : undefined),
    })),
    marker: {
      size: variant === 'bubble' ? undefined : 6,
      strokeWidth: 2,
    },
    tooltip: {
      enabled: true,
      renderer: (params: any) => {
        const point = params.datum;
        let tooltipContent = `<strong>${category}</strong><br/>`;
        tooltipContent += `X: ${point.x}<br/>`;
        tooltipContent += `Y: ${point.y}`;

        if (variant === 'bubble' && point.size) {
          tooltipContent += `<br/>Size: ${point.size}`;
        }

        return tooltipContent;
      },
    },
  }));

  // Calculate and add trend line if requested
  if (trendLine && data.length > 1) {
    const { xValues, yValues, slope, intercept, correlationCoefficient } = calculateLinearRegression(data);

    const trendLineData = xValues.map(x => ({
      x,
      y: slope * x + intercept,
    }));

    series.push({
      type: 'line',
      name: 'Trend Line',
      data: trendLineData,
      stroke: '#666666',
      strokeWidth: 2,
      strokeDasharray: [5, 5],
      marker: {
        enabled: false,
      },
      tooltip: {
        enabled: true,
        renderer: () => `Trend: y = ${slope.toFixed(2)}x + ${intercept.toFixed(2)}`,
      },
    });
  }

  // Apply theme
  const cin7Theme = getCin7AgChartsTheme(theme);

  // Create axes configuration
  const axes = [
    {
      type: 'number',
      position: 'bottom',
      title: {
        text: 'X Axis',
        enabled: true,
      },
      grid: {
        enabled: true,
      },
    },
    {
      type: 'number',
      position: 'left',
      title: {
        text: 'Y Axis',
        enabled: true,
      },
      grid: {
        enabled: true,
      },
    },
  ];

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
    data,
    series,
    axes,
    legend: {
      enabled: legend && Object.keys(categoryGroups).length > 1,
    },
    ...(width && { width }),
    ...(height && { height }),
  };

  // Create and return chart
  const chart = AgCharts.createAgChart(containerEl, config);

  // Return update function for dynamic data updates
  return {
    chart,
    updateData: (newData: VanillaScatterChartDataPoint[]) => {
      // Re-group data by category
      const newCategoryGroups = newData.reduce((groups, point) => {
        const category = point.category || seriesName;
        if (!groups[category]) {
          groups[category] = [];
        }
        groups[category].push(point);
        return groups;
      }, {} as Record<string, VanillaScatterChartDataPoint[]>);

      // Update series
      const newSeries = Object.entries(newCategoryGroups).map(([category, categoryData]) => ({
        type: 'scatter',
        name: category,
        data: categoryData.map(point => ({
          ...point,
          size: point.size || (variant === 'bubble' ? 5 : undefined),
        })),
        marker: {
          size: variant === 'bubble' ? undefined : 6,
          strokeWidth: 2,
        },
      }));

      chart.updateOptions({
        data: newData,
        series: newSeries,
      });
    },
    updateOptions: (newOptions: Partial<VanillaScatterChartOptions>) => {
      const updatedConfig = { ...config, ...newOptions };
      chart.updateOptions(updatedConfig);
    },
    destroy: () => {
      chart.destroy();
    },
    exportChart: (format: 'png' | 'jpg' | 'svg' = 'png') => {
      return chart.downloadChart({
        format,
        fileName: `scatter-chart-${Date.now()}`,
      });
    },
    getCorrelation: () => {
      if (data.length > 1) {
        const { correlationCoefficient } = calculateLinearRegression(data);
        return {
          coefficient: correlationCoefficient,
          strength: getCorrelationStrength(correlationCoefficient),
        };
      }
      return null;
    },
  };
}

/**
 * Calculate linear regression statistics
 */
function calculateLinearRegression(data: VanillaScatterChartDataPoint[]) {
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.x, 0);
  const sumY = data.reduce((sum, point) => sum + point.y, 0);
  const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumX2 = data.reduce((sum, point) => sum + point.x * point.x, 0);
  const sumY2 = data.reduce((sum, point) => sum + point.y * point.y, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Calculate correlation coefficient
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const correlationCoefficient = numerator / denominator;

  return {
    xValues: data.map(point => point.x),
    yValues: data.map(point => point.y),
    slope,
    intercept,
    correlationCoefficient: isNaN(correlationCoefficient) ? 0 : correlationCoefficient,
  };
}

/**
 * Get correlation strength description
 */
function getCorrelationStrength(coefficient: number): string {
  const abs = Math.abs(coefficient);
  if (abs >= 0.8) return 'Strong';
  if (abs >= 0.5) return 'Moderate';
  if (abs >= 0.3) return 'Weak';
  return 'Very Weak';
}

/**
 * Update existing scatter chart with new data
 */
export function updateScatterChart(
  chart: any,
  newData: VanillaScatterChartDataPoint[],
  options?: Partial<VanillaScatterChartOptions>
): void {
  if (!chart || !chart.updateOptions) {
    throw new Error('Invalid chart instance');
  }

  const updateConfig = {
    data: newData,
    ...(options?.title && { title: { text: options.title, enabled: true } }),
    ...(options?.subtitle && { subtitle: { text: options.subtitle, enabled: true } }),
    ...(options?.legend !== undefined && { legend: { enabled: options.legend } }),
    ...(options?.width && { width: options.width }),
    ...(options?.height && { height: options.height }),
  };

  chart.updateOptions(updateConfig);
}

/**
 * Destroy scatter chart and clean up resources
 */
export function destroyScatterChart(chart: any): void {
  if (chart && chart.destroy) {
    chart.destroy();
  }
}