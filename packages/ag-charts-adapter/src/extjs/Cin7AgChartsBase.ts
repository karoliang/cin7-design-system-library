/**
 * Base ExtJS panel component for embedding AG Charts
 * Custom implementation since AG Charts doesn't have official ExtJS support
 */

import { getCin7AgChartsTheme, Cin7ChartTheme } from '../utilities/theme';

export interface Cin7AgChartsConfig {
  /** AG Charts configuration options */
  chartOptions?: any;
  /** Theme configuration */
  theme?: Cin7ChartTheme;
  /** Chart type */
  chartType?: string;
  /** Auto-resize with panel */
  autoResize?: boolean;
  /** Performance mode for large datasets */
  performanceMode?: boolean;
}

/**
 * Base class for ExtJS + AG Charts integration
 * Creates an ExtJS panel with an embedded AG Charts chart
 * This is a custom implementation that provides enterprise-grade features
 */
export class Cin7AgChartsBase {
  static xtype = 'cin7agcharts';

  /**
   * Register the component in ExtJS
   */
  static register(): void {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      console.warn('ExtJS is not available. Skipping Cin7AgCharts registration.');
      return;
    }

    const Ext = (window as any).Ext;

    Ext.define('Cin7.chart.AgChartsPanel', {
      extend: 'Ext.panel.Panel',
      xtype: this.xtype,

      config: {
        chartOptions: null,
        theme: { mode: 'light' },
        chartType: 'line',
        autoResize: true,
        performanceMode: false,
      },

      layout: 'fit',
      border: false,

      initComponent: function (this: any) {
        this.html = `<div id="${this.id}-chart-container" style="width:100%;height:100%;"></div>`;
        this.callParent(arguments);
      },

      afterRender: function (this: any) {
        this.callParent(arguments);

        // Create AG Charts chart after panel is rendered
        const container = document.getElementById(`${this.id}-chart-container`);
        if (container && this.chartOptions) {
          const theme = getCin7AgChartsTheme(this.theme || { mode: 'light' });

          // Merge theme with chart options
          const options = {
            ...theme,
            ...this.chartOptions,
            container: container,
          };

          // Load AG Charts dynamically
          this.loadAgCharts().then((AgCharts: any) => {
            this.chart = AgCharts.createAgChart(options);

            // Handle resize if enabled
            if (this.autoResize) {
              this.on('resize', () => {
                if (this.chart) {
                  // AG Charts has better resize handling than Highcharts
                  setTimeout(() => {
                    this.chart.updateOptions({ width: container.offsetWidth, height: container.offsetHeight });
                  }, 50);
                }
              });
            }
          }).catch((error: any) => {
            console.error('Failed to load AG Charts:', error);
            this.showErrorMessage('Failed to load chart library');
          });
        }
      },

      /**
       * Load AG Charts library dynamically
       * This allows for lazy loading and better performance
       */
      loadAgCharts: function (this: any): Promise<any> {
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
      },

      /**
       * Display error message in the panel
       */
      showErrorMessage: function (this: any, message: string) {
        const container = document.getElementById(`${this.id}-chart-container`);
        if (container) {
          container.innerHTML = `
            <div style="
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              color: #dc3545;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
              text-align: center;
              padding: 20px;
            ">
              <div>
                <div style="font-size: 18px; margin-bottom: 8px;">Chart Loading Error</div>
                <div style="font-size: 14px; opacity: 0.8;">${message}</div>
              </div>
            </div>
          `;
        }
      },

      onDestroy: function (this: any) {
        if (this.chart) {
          // AG Charts destruction
          if (this.chart.destroy) {
            this.chart.destroy();
          } else if (this.chart.destroyChart) {
            this.chart.destroyChart();
          }
          this.chart = null;
        }
        this.callParent(arguments);
      },

      /**
       * Update chart data with performance optimization
       */
      updateChartData: function (this: any, data: any[], seriesIndex?: number) {
        if (this.chart) {
          if (seriesIndex !== undefined && this.chart.options.series?.[seriesIndex]) {
            // Update specific series
            const series = this.chart.options.series[seriesIndex];
            series.data = data;
            this.chart.updateOptions({ series: this.chart.options.series });
          } else {
            // Update all series
            const options = { data: data };
            this.chart.updateOptions(options);
          }
        }
      },

      /**
       * Get the underlying AG Charts instance
       */
      getChart: function (this: any): any {
        return this.chart || null;
      },

      /**
       * Export chart to image using canvas
       * Custom implementation since AG Charts Community has limited export
       */
      exportChart: function (this: any, options: { type?: string; filename?: string } = {}) {
        if (this.chart) {
          const type = options.type || 'image/png';
          const filename = options.filename || 'chart';

          // Use AG Charts canvas export
          if (this.chart.canvas) {
            const canvas = this.chart.canvas;

            // Convert canvas to blob
            canvas.toBlob((blob: Blob) => {
              if (blob) {
                // Download the image
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${filename}.${type.split('/')[1] || 'png'}`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
            }, type);
          } else {
            console.warn('Chart canvas not available for export');
          }
        }
      },

      /**
       * Set performance mode for large datasets
       */
      setPerformanceMode: function (this: any, enabled: boolean) {
        this.performanceMode = enabled;
        if (this.chart) {
          // Enable/disable animations and other performance features
          const options = {
            animation: !enabled,
            // Add more performance optimizations as needed
          };
          this.chart.updateOptions(options);
        }
      },

      /**
       * Add real-time data streaming capability
       * Enterprise feature for live dashboards
       */
      startDataStream: function (this: any, dataStream: { subscribe: Function }) {
        if (!this.dataStreamSubscription) {
          this.dataStreamSubscription = dataStream.subscribe((dataPoint: any) => {
            this.updateChartData([dataPoint], 0); // Add to first series
          });
        }
      },

      /**
       * Stop real-time data streaming
       */
      stopDataStream: function (this: any) {
        if (this.dataStreamSubscription) {
          this.dataStreamSubscription();
          this.dataStreamSubscription = null;
        }
      },
    });
  }

  /**
   * Create an AG Charts panel instance
   */
  static create(config: Cin7AgChartsConfig): any {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      throw new Error('ExtJS is not available');
    }

    const Ext = (window as any).Ext;
    return Ext.create('Cin7.chart.AgChartsPanel', config);
  }

  /**
   * Auto-register the component when the module loads
   */
  static {
    this.register();
  }
}