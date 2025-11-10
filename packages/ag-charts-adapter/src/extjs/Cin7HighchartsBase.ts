/**
 * Base ExtJS panel component for embedding Highcharts
 */

import * as Highcharts from 'highcharts';
import { getCin7HighchartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface Cin7HighchartsConfig {
  /** Highcharts configuration options */
  chartConfig?: Highcharts.Options;
  /** Theme configuration */
  theme?: Cin7ChartTheme;
  /** Chart type */
  chartType?: string;
  /** Auto-resize with panel */
  autoResize?: boolean;
}

/**
 * Base class for ExtJS + Highcharts integration
 * Creates an ExtJS panel with an embedded Highcharts chart
 */
export class Cin7HighchartsBase {
  static xtype = 'cin7highcharts';

  /**
   * Register the component in ExtJS
   */
  static register(): void {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      console.warn('ExtJS is not available. Skipping Cin7Highcharts registration.');
      return;
    }

    const Ext = (window as any).Ext;

    Ext.define('Cin7.chart.HighchartsPanel', {
      extend: 'Ext.panel.Panel',
      xtype: this.xtype,

      config: {
        chartConfig: null,
        theme: { mode: 'light' },
        chartType: 'line',
        autoResize: true,
      },

      layout: 'fit',
      border: false,

      initComponent: function (this: any) {
        this.html = `<div id="${this.id}-chart-container" style="width:100%;height:100%;"></div>`;
        this.callParent(arguments);
      },

      afterRender: function (this: any) {
        this.callParent(arguments);

        // Create Highcharts chart after panel is rendered
        const container = document.getElementById(`${this.id}-chart-container`);
        if (container && this.chartConfig) {
          const theme = getCin7HighchartsTheme(this.theme || { mode: 'light' });
          const options: Highcharts.Options = {
            ...theme,
            ...this.chartConfig,
            chart: {
              ...theme.chart,
              ...this.chartConfig.chart,
              renderTo: container,
            },
          };

          this.chart = Highcharts.chart(container, options);

          // Handle resize if enabled
          if (this.autoResize) {
            this.on('resize', () => {
              if (this.chart) {
                // Delay to ensure panel dimensions are updated
                setTimeout(() => {
                  this.chart.reflow();
                }, 100);
              }
            });
          }
        }
      },

      onDestroy: function (this: any) {
        if (this.chart) {
          this.chart.destroy();
          this.chart = null;
        }
        this.callParent(arguments);
      },

      /**
       * Update chart data
       */
      updateChartData: function (this: any, seriesData: any[]) {
        if (this.chart && this.chart.series) {
          seriesData.forEach((data, index) => {
            if (this.chart.series[index]) {
              this.chart.series[index].setData(data, false);
            }
          });
          this.chart.redraw();
        }
      },

      /**
       * Get the underlying Highcharts instance
       */
      getChart: function (this: any): Highcharts.Chart | null {
        return this.chart || null;
      },

      /**
       * Export chart to image
       */
      exportChart: function (this: any, type: string = 'image/png') {
        if (this.chart) {
          this.chart.exportChart({ type });
        }
      },
    });
  }

  /**
   * Create a Highcharts panel instance
   */
  static create(config: any): any {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      throw new Error('ExtJS is not available');
    }

    const Ext = (window as any).Ext;
    return Ext.create('Cin7.chart.HighchartsPanel', config);
  }
}
