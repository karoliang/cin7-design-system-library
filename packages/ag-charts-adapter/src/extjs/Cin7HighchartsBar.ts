/**
 * ExtJS Bar Chart component using Highcharts
 */

import * as Highcharts from 'highcharts';
import { Cin7HighchartsBase } from './Cin7HighchartsBase';

export interface BarChartConfig {
  title?: string;
  subtitle?: string;
  series?: Highcharts.SeriesBarOptions[] | Highcharts.SeriesColumnOptions[];
  xAxis?: Highcharts.XAxisOptions;
  yAxis?: Highcharts.YAxisOptions;
  orientation?: 'vertical' | 'horizontal';
  stacking?: 'normal' | 'percent';
  dataLabels?: boolean;
}

/**
 * ExtJS panel component for Highcharts bar/column charts
 */
export class Cin7HighchartsBar {
  static xtype = 'cin7highchartsbar';

  static register(): void {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      console.warn('ExtJS is not available. Skipping Cin7HighchartsBar registration.');
      return;
    }

    // Register base first
    Cin7HighchartsBase.register();

    const Ext = (window as any).Ext;

    Ext.define('Cin7.chart.HighchartsBar', {
      extend: 'Cin7.chart.HighchartsPanel',
      xtype: this.xtype,

      config: {
        orientation: 'vertical',
        stacking: undefined,
        dataLabels: false,
      },

      initComponent: function (this: any) {
        // Build chart config from properties
        const chartType = this.orientation === 'vertical' ? 'column' : 'bar';

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
              [chartType]: {
                dataLabels: {
                  enabled: this.dataLabels,
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
   * Create a bar chart panel
   */
  static create(config: BarChartConfig & { [key: string]: any }): any {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      throw new Error('ExtJS is not available');
    }

    const Ext = (window as any).Ext;
    return Ext.create('Cin7.chart.HighchartsBar', config);
  }
}
