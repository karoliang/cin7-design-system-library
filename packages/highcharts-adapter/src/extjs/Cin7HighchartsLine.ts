/**
 * ExtJS Line Chart component using Highcharts
 */

import * as Highcharts from 'highcharts';
import { Cin7HighchartsBase } from './Cin7HighchartsBase';

export interface LineChartConfig {
  title?: string;
  subtitle?: string;
  series?: Highcharts.SeriesLineOptions[];
  xAxis?: Highcharts.XAxisOptions;
  yAxis?: Highcharts.YAxisOptions;
  smooth?: boolean;
  markers?: boolean;
  stacking?: 'normal' | 'percent';
}

/**
 * ExtJS panel component for Highcharts line charts
 */
export class Cin7HighchartsLine {
  static xtype = 'cin7highchartsline';

  static register(): void {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      console.warn('ExtJS is not available. Skipping Cin7HighchartsLine registration.');
      return;
    }

    // Register base first
    Cin7HighchartsBase.register();

    const Ext = (window as any).Ext;

    Ext.define('Cin7.chart.HighchartsLine', {
      extend: 'Cin7.chart.HighchartsPanel',
      xtype: this.xtype,

      config: {
        smooth: false,
        markers: false,
        stacking: undefined,
      },

      initComponent: function (this: any) {
        // Build chart config from properties
        const chartType = this.smooth ? 'spline' : 'line';

        this.chartConfig = Ext.apply(
          {
            chart: {
              type: chartType,
            },
            title: {
              text: this.title || '',
            },
            subtitle: {
              text: this.subtitle || '',
            },
            xAxis: this.xAxis || {},
            yAxis: this.yAxis || {},
            plotOptions: {
              series: {
                marker: {
                  enabled: this.markers,
                },
                stacking: this.stacking,
              },
            },
            series: this.series || [],
          },
          this.chartConfig || {}
        );

        this.callParent(arguments);
      },
    });
  }

  /**
   * Create a line chart panel
   */
  static create(config: LineChartConfig & { [key: string]: any }): any {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      throw new Error('ExtJS is not available');
    }

    const Ext = (window as any).Ext;
    return Ext.create('Cin7.chart.HighchartsLine', config);
  }
}
