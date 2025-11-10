/**
 * ExtJS line chart component using AG Charts
 * Enterprise-grade line chart with advanced features
 */

import { Cin7AgChartsBase, Cin7AgChartsConfig } from './Cin7AgChartsBase';

export interface Cin7AgChartsLineConfig extends Cin7AgChartsConfig {
  /** Series data */
  series?: Array<{
    name: string;
    data: (number | [string, number] | [number, number])[];
    color?: string;
    strokeWidth?: number;
    marker?: boolean;
  }>;
  /** X-axis configuration */
  xAxis?: {
    title?: string;
    categories?: string[];
    type?: 'category' | 'number' | 'time';
    min?: number;
    max?: number;
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string;
    min?: number;
    max?: number;
  };
  /** Enable smooth curves */
  smooth?: boolean;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Enable markers */
  markers?: boolean;
}

/**
 * ExtJS line chart panel with AG Charts integration
 * Provides enterprise features like real-time updates and performance optimization
 */
export class Cin7AgChartsLine {
  static xtype = 'cin7agchartsline';

  /**
   * Register the line chart component in ExtJS
   */
  static register(): void {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      console.warn('ExtJS is not available. Skipping Cin7AgChartsLine registration.');
      return;
    }

    const Ext = (window as any).Ext;

    Ext.define('Cin7.chart.AgChartsLinePanel', {
      extend: 'Cin7.chart.AgChartsPanel',
      xtype: this.xtype,

      config: {
        series: [],
        xAxis: {},
        yAxis: {},
        smooth: false,
        dataLabels: false,
        markers: false,
      },

      initComponent: function (this: any) {
        // Generate AG Charts options from configuration
        this.chartOptions = this.generateChartOptions();
        this.callParent(arguments);
      },

      /**
       * Generate AG Charts options from component configuration
       */
      generateChartOptions: function (this: any): any {
        const series = this.series.map((seriesItem: any) => ({
          type: this.smooth ? 'line' : 'line',
          xKey: this.xAxis.type === 'category' ? 'x' : undefined,
          yKey: 'y',
          data: seriesItem.data.map((point: any, index: number) => {
            if (Array.isArray(point)) {
              return { x: point[0], y: point[1] };
            }
            if (typeof point === 'string') {
              return { x: index, y: 0 };
            }
            return { x: index, y: point };
          }),
          stroke: seriesItem.color,
          strokeWidth: seriesItem.strokeWidth || 2,
          marker: {
            enabled: seriesItem.marker !== false ? this.markers : false,
            size: 6,
            strokeWidth: 2,
          },
          label: {
            enabled: this.dataLabels,
          },
          // Performance optimizations for large datasets
          ...(this.performanceMode && {
            marker: { enabled: false },
            animation: false,
          }),
        }));

        const axes = [];

        // X-axis configuration
        if (this.xAxis.type === 'category' || this.xAxis.categories) {
          axes.push({
            type: 'category',
            position: 'bottom',
            title: {
              text: this.xAxis.title,
              enabled: !!this.xAxis.title,
            },
            category: this.xAxis.categories,
            min: this.xAxis.min,
            max: this.xAxis.max,
          });
        } else {
          axes.push({
            type: 'number',
            position: 'bottom',
            title: {
              text: this.xAxis.title,
              enabled: !!this.xAxis.title,
            },
            min: this.xAxis.min,
            max: this.xAxis.max,
          });
        }

        // Y-axis configuration
        axes.push({
          type: 'number',
          position: 'left',
          title: {
            text: this.yAxis.title,
            enabled: !!this.yAxis.title,
          },
          min: this.yAxis.min,
          max: this.yAxis.max,
        });

        return {
          series,
          axes,
          legend: {
            enabled: true,
          },
          // Performance mode optimizations
          ...(this.performanceMode && {
            animation: false,
            interaction: {
              crosshair: {
                enabled: false,
              },
            },
          }),
        };
      },

      /**
       * Update series data with animation support
       */
      updateSeriesData: function (this: any, seriesIndex: number, data: any[]) {
        if (this.chart && this.chart.options.series?.[seriesIndex]) {
          const series = this.chart.options.series[seriesIndex];
          const formattedData = data.map((point: any, index: number) => {
            if (Array.isArray(point)) {
              return { x: point[0], y: point[1] };
            }
            return { x: index, y: point };
          });

          series.data = formattedData;
          this.chart.updateOptions({ series: this.chart.options.series });
        }
      },

      /**
       * Add a new series dynamically
       */
      addSeries: function (this: any, seriesConfig: any) {
        if (this.chart) {
          const newSeries = {
            type: this.smooth ? 'line' : 'line',
            xKey: this.xAxis.type === 'category' ? 'x' : undefined,
            yKey: 'y',
            data: seriesConfig.data.map((point: any, index: number) => {
              if (Array.isArray(point)) {
                return { x: point[0], y: point[1] };
              }
              return { x: index, y: point };
            }),
            stroke: seriesConfig.color,
            strokeWidth: seriesConfig.strokeWidth || 2,
            marker: {
              enabled: seriesConfig.marker !== false ? this.markers : false,
              size: 6,
              strokeWidth: 2,
            },
            label: {
              enabled: this.dataLabels,
            },
          };

          const currentSeries = this.chart.options.series || [];
          this.chart.updateOptions({ series: [...currentSeries, newSeries] });
        }
      },

      /**
       * Toggle smooth curves
       */
      toggleSmooth: function (this: any) {
        this.smooth = !this.smooth;
        this.chartOptions = this.generateChartOptions();
        if (this.chart) {
          this.chart.updateOptions(this.chartOptions);
        }
      },

      /**
       * Toggle markers
       */
      toggleMarkers: function (this: any) {
        this.markers = !this.markers;
        this.chartOptions = this.generateChartOptions();
        if (this.chart) {
          this.chart.updateOptions(this.chartOptions);
        }
      },
    });
  }

  /**
   * Create a line chart panel instance
   */
  static create(config: Cin7AgChartsLineConfig): any {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      throw new Error('ExtJS is not available');
    }

    const Ext = (window as any).Ext;
    return Ext.create('Cin7.chart.AgChartsLinePanel', config);
  }

  /**
   * Auto-register the component when the module loads
   */
  static {
    this.register();
  }
}