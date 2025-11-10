/**
 * ExtJS Pie Chart component using Highcharts
 */

import * as Highcharts from 'highcharts';
import { Cin7HighchartsBase } from './Cin7HighchartsBase';

export interface PieChartConfig {
  title?: string;
  subtitle?: string;
  data?: Highcharts.PointOptionsObject[];
  seriesName?: string;
  variant?: 'pie' | 'donut' | 'semi-circle';
  dataLabels?: boolean;
  innerSize?: string | number;
}

/**
 * ExtJS panel component for Highcharts pie charts
 */
export class Cin7HighchartsPie {
  static xtype = 'cin7highchartspie';

  static register(): void {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      console.warn('ExtJS is not available. Skipping Cin7HighchartsPie registration.');
      return;
    }

    // Register base first
    Cin7HighchartsBase.register();

    const Ext = (window as any).Ext;

    Ext.define('Cin7.chart.HighchartsPie', {
      extend: 'Cin7.chart.HighchartsPanel',
      xtype: this.xtype,

      config: {
        variant: 'pie',
        dataLabels: true,
        seriesName: 'Data',
        innerSize: undefined,
      },

      initComponent: function (this: any) {
        // Build chart config from properties
        let calculatedInnerSize = this.innerSize;
        if (!calculatedInnerSize) {
          if (this.variant === 'donut') {
            calculatedInnerSize = '50%';
          } else if (this.variant === 'semi-circle') {
            calculatedInnerSize = '40%';
          }
        }

        const startAngle = this.variant === 'semi-circle' ? -90 : 0;
        const endAngle = this.variant === 'semi-circle' ? 90 : 360;

        this.chartConfig = Ext.apply(
          {
            chart: {
              type: 'pie',
            },
            title: {
              text: this.title || '',
            },
            subtitle: {
              text: this.subtitle || '',
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: this.dataLabels,
                  format: '<b>{point.name}</b>: {point.percentage:.1f}%',
                },
                innerSize: calculatedInnerSize,
                startAngle,
                endAngle,
              },
            },
            series: [
              {
                type: 'pie',
                name: this.seriesName,
                data: this.data || [],
              },
            ],
          },
          this.chartConfig || {}
        );

        this.callParent(arguments);
      },
    });
  }

  /**
   * Create a pie chart panel
   */
  static create(config: PieChartConfig & { [key: string]: any }): any {
    if (typeof window === 'undefined' || !(window as any).Ext) {
      throw new Error('ExtJS is not available');
    }

    const Ext = (window as any).Ext;
    return Ext.create('Cin7.chart.HighchartsPie', config);
  }
}
