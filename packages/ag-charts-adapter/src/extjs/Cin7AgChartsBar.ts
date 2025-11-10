/**
 * ExtJS Bar/Column chart component using AG Charts
 * Enterprise-grade bar visualization with comprehensive features
 */

import { Cin7AgChartsBase, Cin7AgChartsConfig } from './Cin7AgChartsBase';

export interface Cin7AgChartsBarConfig extends Cin7AgChartsConfig {
  /** Series data */
  series?: Array<{
    name: string;
    data: (number | [string, number] | [number, number])[];
    color?: string;
    strokeWidth?: number;
    markers?: boolean;
  }>;
  /** X-axis configuration */
  xAxis?: {
    title?: string;
    categories?: string[];
    labelFormat?: string;
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
  /** Enable grid */
  grid?: boolean;
}

/**
 * ExtJS Bar/Column chart component for AG Charts integration
 * Creates an ExtJS panel with an embedded AG Charts bar/column chart
 * This is a custom implementation that provides enterprise-grade features
 */
export class Cin7AgChartsBar extends Cin7AgChartsBase {
  static xtype = 'cin7agchartsbar';

  /**
   * Register the component in ExtJS
   */
  static initComponent() {
    super.initComponent.call(this);
  }

  /**
   * Initialize the AG Charts bar chart
   */
  initializeChart() {
    const config = this.getBarChartConfig();
    this.createChart(config);
  }

  /**
   * Get bar chart configuration
   */
  getBarChartConfig(): any {
    const {
      title,
      subtitle,
      series = [],
      xAxis = {},
      yAxis = {},
      orientation = 'vertical',
      dataLabels = false,
      stacking,
      theme = { mode: 'light' },
      legend = true,
      grid = true,
      chartOptions = {},
    } = this.initialConfig;

    // Transform series data to AG Charts format
    const agSeries = series.map((seriesItem) => ({
      type: 'bar', // AG Charts v9.2.0 only accepts 'bar' series type
      xKey: typeof seriesItem.data[0] === 'string' || Array.isArray(seriesItem.data[0]) ? 'x' : undefined,
      yKey: 'y',
      data: seriesItem.data.map((point, index) => {
        if (Array.isArray(point)) {
          return { x: point[0], y: point[1] };
        }
        return { x: index, y: point };
      }),
      stroke: seriesItem.color,
      strokeWidth: seriesItem.strokeWidth || 1,
      fill: seriesItem.color,
      marker: {
        enabled: seriesItem.markers || false,
        size: 6,
        strokeWidth: 2,
      },
      label: {
        enabled: dataLabels,
        color: '#ffffff',
        formatter: (params: any) => {
          return params.y?.toString() || '0';
        },
        style: {
          fontWeight: 'bold',
          fontSize: '12px',
        },
      },
      tooltip: {
        enabled: true,
        renderer: (params: any) => {
          const point = params.datum;
          let tooltipContent = `<strong>${seriesItem.name}</strong><br/>`;

          if (xAxis.categories && xAxis.categories[point.x]) {
            tooltipContent += `${xAxis.categories[point.x]}: `;
          } else {
            tooltipContent += `X: ${point.x}, `;
          }

          tooltipContent += `${point.y}`;
          return tooltipContent;
        },
      },
      // Add stacking support
      stacked: stacking === 'normal' || stacking === 'percent',
      groupBy: stacking === 'percent' ? 'y' : undefined,
    }));

    // Create axes configuration
    const axes = [];

    if (orientation === 'vertical') {
      axes.push({
        type: xAxis.categories ? 'category' : 'number',
        position: 'bottom',
        title: {
          text: xAxis.title || (xAxis.categories ? 'Categories' : 'Values'),
          enabled: !!xAxis.title || !xAxis.categories,
        },
        categories: xAxis.categories,
        label: {
          format: xAxis.labelFormat,
        },
        grid: {
          enabled: grid,
        },
      });

      axes.push({
        type: 'number',
        position: 'left',
        title: {
          text: yAxis.title || 'Values',
          enabled: !!yAxis.title || true,
        },
        min: yAxis.min,
        max: yAxis.max,
        label: {
          format: yAxis.labelFormat,
        },
        grid: {
          enabled: grid,
        },
      });
    } else {
      // Horizontal orientation - swap axes
      axes.push({
        type: 'number',
        position: 'bottom',
        title: {
          text: xAxis.title || 'Values',
          enabled: !!xAxis.title || true,
        },
        min: xAxis.min,
        max: xAxis.max,
        label: {
          format: xAxis.labelFormat,
        },
        grid: {
          enabled: grid,
        },
      });

      axes.push({
        type: yAxis.categories ? 'category' : 'number',
        position: 'left',
        title: {
          text: yAxis.title || (yAxis.categories ? 'Categories' : 'Values'),
          enabled: !!yAxis.title || !yAxis.categories,
        },
        categories: yAxis.categories,
        label: {
          format: yAxis.labelFormat,
        },
        grid: {
          enabled: grid,
        },
      });
    }

    return {
      ...chartOptions,
      title: {
        text: title,
        enabled: !!title,
      },
      subtitle: {
        text: subtitle,
        enabled: !!subtitle,
      },
      data: [],
      series: agSeries,
      axes,
      legend: {
        enabled: legend && series.length > 1,
      },
    };
  }

  /**
   * Update chart data
   */
  updateSeries(newSeries: any[]) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const config = this.getBarChartConfig();
    config.series = config.series.map((series: any, index: number) => {
      if (newSeries[index]) {
        return {
          ...series,
          data: newSeries[index].data.map((point, idx: number) => {
            if (Array.isArray(point)) {
              return { x: point[0], y: point[1] };
            }
            return { x: idx, y: point };
          }),
        };
      }
      return series;
    });

    this.chart.updateOptions({ series: config.series });
  }

  /**
   * Add new series to the chart
   */
  addSeries(seriesConfig: any) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const currentConfig = this.getBarChartConfig();
    currentConfig.series.push({
      type: 'bar', // AG Charts v9.2.0 only accepts 'bar' series type
      xKey: typeof seriesConfig.data[0] === 'string' || Array.isArray(seriesConfig.data[0]) ? 'x' : undefined,
      yKey: 'y',
      data: seriesConfig.data.map((point: any, index: number) => {
        if (Array.isArray(point)) {
          return { x: point[0], y: point[1] };
        }
        return { x: index, y: point };
      }),
      stroke: seriesConfig.color,
      strokeWidth: seriesConfig.strokeWidth || 1,
      fill: seriesConfig.color,
      marker: {
        enabled: seriesConfig.markers || false,
        size: 6,
        strokeWidth: 2,
      },
      label: {
        enabled: this.initialConfig.dataLabels || false,
      },
      tooltip: {
        enabled: true,
      },
      stacked: this.initialConfig.stacking === 'normal' || this.initialConfig.stacking === 'percent',
      groupBy: this.initialConfig.stacking === 'percent' ? 'y' : undefined,
    });

    this.chart.updateOptions({ series: currentConfig.series });
  }

  /**
   * Remove series from the chart
   */
  removeSeries(seriesName: string) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const currentConfig = this.getBarChartConfig();
    currentConfig.series = currentConfig.series.filter((series: any) => series.name !== seriesName);

    this.chart.updateOptions({ series: currentConfig.series });
  }

  /**
   * Toggle between vertical and horizontal orientation
   */
  toggleOrientation() {
    const newOrientation = this.initialConfig.orientation === 'vertical' ? 'horizontal' : 'vertical';
    this.initialConfig.orientation = newOrientation;

    if (this.chart) {
      const config = this.getBarChartConfig();
      this.chart.destroy();
      this.createChart(config);
    }
  }

  /**
   * Export chart data
   */
  exportData(format: 'json' | 'csv' = 'json') {
    if (!this.chart) {
      return null;
    }

    const config = this.getBarChartConfig();
    const exportData = {
      title: config.title?.text,
      series: config.series.map((series: any) => ({
        name: series.name,
        data: series.data,
      })),
      exportedAt: new Date().toISOString(),
    };

    if (format === 'csv') {
      // Convert to CSV format
      const headers = ['Series', 'X', 'Y'];
      const rows = [headers];

      config.series.forEach((series: any) => {
        series.data.forEach((point: any) => {
          rows.push([series.name, point.x, point.y]);
        });
      });

      return rows.map(row => row.join(',')).join('\n');
    }

    return JSON.stringify(exportData, null, 2);
  }
}