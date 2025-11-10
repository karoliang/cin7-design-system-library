/**
 * ExtJS Pie/Donut chart component using AG Charts
 * Enterprise-grade circular chart visualization with comprehensive features
 */

import { Cin7AgChartsBase, Cin7AgChartsConfig } from './Cin7AgChartsBase';

export interface Cin7AgChartsPieConfig extends Cin7AgChartsConfig {
  /** Pie chart data */
  data?: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  /** Chart variant */
  variant?: 'pie' | 'donut' | 'semi-circle';
  /** Show data labels */
  dataLabels?: boolean;
  /** Inner size for donut chart */
  innerSize?: string | number;
  /** Start angle (for semi-circle) */
  startAngle?: number;
  /** End angle (for semi-circle) */
  endAngle?: number;
  /** Show legend */
  legend?: boolean;
}

/**
 * ExtJS Pie/Donut chart component for AG Charts integration
 * Creates an ExtJS panel with an embedded AG Charts pie chart
 * This is a custom implementation that provides enterprise-grade features
 */
export class Cin7AgChartsPie extends Cin7AgChartsBase {
  static xtype = 'cin7agchartspie';

  /**
   * Register the component in ExtJS
   */
  static initComponent() {
    super.initComponent.call(this);
  }

  /**
   * Initialize the AG Charts pie chart
   */
  initializeChart() {
    const config = this.getPieChartConfig();
    this.createChart(config);
  }

  /**
   * Get pie chart configuration
   */
  getPieChartConfig(): any {
    const {
      title,
      subtitle,
      data = [],
      variant = 'pie',
      dataLabels = true,
      innerSize,
      startAngle = 0,
      endAngle = 360,
      legend = true,
      theme = { mode: 'light' },
      chartOptions = {},
    } = this.initialConfig;

    // Calculate inner radius for donut charts
    let calculatedInnerSize = 0;
    if (variant === 'donut' || variant === 'semi-circle') {
      calculatedInnerSize = innerSize || (variant === 'donut' ? '40%' : '0%');
    }

    // Transform data for AG Charts
    const transformedData = data.map((point) => ({
      ...point,
      angleKey: 'value',
      calloutLabelKey: 'name',
      sectorLabelKey: 'name',
      radiusKey: 'value',
    }));

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
            formatter: (params: any) => {
              const value = params.datum.value;
              const total = params.datum.total;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${params.datum.name}: ${percentage}%`;
            },
          },
          tooltip: {
            enabled: true,
            renderer: (params: any) => {
              const point = params.datum;
              const total = params.datum.total;
              const percentage = ((point.value / total) * 100).toFixed(1);
              return `
                <div style="padding: 8px;">
                  <strong style="color: ${point.color}">${point.name}</strong><br/>
                  Value: ${point.value}<br/>
                  Percentage: ${percentage}%
                </div>
              `;
            },
          },
        },
      ],
      legend: {
        enabled: legend && data.length > 1,
        position: 'right',
      },
    };
  }

  /**
   * Update chart data
   */
  updateData(newData: any[]) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const transformedData = newData.map((point) => ({
      ...point,
      angleKey: 'value',
      calloutLabelKey: 'name',
      sectorLabelKey: 'name',
      radiusKey: 'value',
    }));

    this.chart.updateOptions({
      data: transformedData,
    });
  }

  /**
   * Add new data point
   */
  addDataPoint(dataPoint: any) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const currentData = this.initialConfig.data || [];
    const newData = [...currentData, dataPoint];

    this.initialConfig.data = newData;
    this.updateData(newData);
  }

  /**
   * Remove data point by name
   */
  removeDataPoint(name: string) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const currentData = this.initialConfig.data || [];
    const newData = currentData.filter((point: any) => point.name !== name);

    this.initialConfig.data = newData;
    this.updateData(newData);
  }

  /**
   * Update chart variant
   */
  updateVariant(variant: 'pie' | 'donut' | 'semi-circle') {
    this.initialConfig.variant = variant;

    if (this.chart) {
      const config = this.getPieChartConfig();
      this.chart.destroy();
      this.createChart(config);
    }
  }

  /**
   * Toggle between pie and donut variant
   */
  toggleDonut() {
    const newVariant = this.initialConfig.variant === 'donut' ? 'pie' : 'donut';
    this.updateVariant(newVariant);
  }

  /**
   * Get chart statistics
   */
  getStatistics() {
    if (!this.initialConfig.data || this.initialConfig.data.length === 0) {
      return null;
    }

    const data = this.initialConfig.data;
    const total = data.reduce((sum, point) => sum + point.value, 0);
    const maxValue = Math.max(...data.map(point => point.value));
    const minValue = Math.min(...data.map(point => point.value));
    const average = total / data.length;

    return {
      total,
      average,
      max: maxValue,
      min: minValue,
      count: data.length,
      dataPoints: data,
    };
  }

  /**
   * Get data point by name
   */
  getDataPoint(name: string) {
    if (!this.initialConfig.data) {
      return null;
    }

    return this.initialConfig.data.find((point: any) => point.name === name) || null;
  }

  /**
   * Highlight specific segment
   */
  highlightSegment(name: string, highlight: boolean = true) {
    if (!this.chart || !this.chart.updateOptions) {
      console.warn('Chart not initialized');
      return;
    }

    const config = this.getPieChartConfig();

    // Add highlighting to the specific segment
    config.series[0].highlightStyle = {
      item: {
        fill: highlight ? 'rgba(255, 255, 0, 0.3)' : undefined,
        stroke: highlight ? '#ffff00' : undefined,
        strokeWidth: highlight ? 3 : undefined,
      },
    };

    this.chart.updateOptions({ series: config.series });
  }

  /**
   * Export chart data
   */
  exportData(format: 'json' | 'csv' = 'json') {
    if (!this.initialConfig.data) {
      return null;
    }

    const stats = this.getStatistics();
    const exportData = {
      title: this.initialConfig.title,
      variant: this.initialConfig.variant,
      statistics: stats,
      data: this.initialConfig.data.map((point: any, index: number) => {
        const percentage = ((point.value / stats!.total) * 100).toFixed(2);
        return {
          name: point.name,
          value: point.value,
          percentage: parseFloat(percentage),
          color: point.color,
          rank: index + 1,
        };
      }),
      exportedAt: new Date().toISOString(),
    };

    if (format === 'csv') {
      // Convert to CSV format
      const headers = ['Name', 'Value', 'Percentage', 'Rank', 'Color'];
      const rows = [headers];

      exportData.data.forEach((point: any) => {
        rows.push([point.name, point.value, `${point.percentage}%`, point.rank, point.color || '']);
      });

      return rows.map(row => row.join(',')).join('\n');
    }

    return JSON.stringify(exportData, null, 2);
  }
}