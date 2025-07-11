/**
 * Chart components for ExtJS
 */

import { Cin7Component } from '../components/base';
import { enterpriseTokens } from '@cin7/design-tokens';

export class Cin7Chart extends Cin7Component {
  static xtype = 'cin7chart';

  static register(): void {
    this.define('Cin7.chart.Chart', {
      extend: 'Ext.chart.CartesianChart',
      xtype: this.xtype,
      
      config: {
        animate: true,
        shadow: false,
        insetPadding: 20,
        background: 'transparent',
      },

      initComponent: function() {
        // Apply Cin7 theme
        this.theme = this.theme || 'cin7-default';
        this.colors = this.colors || enterpriseTokens.charts.colors.primary;
        
        // Default interactions
        this.interactions = this.interactions || ['itemhighlight'];
        
        // Default legend
        if (this.legend !== false) {
          this.legend = Ext.apply({
            docked: 'bottom',
            marker: {
              size: 16,
            },
          }, this.legend);
        }
        
        this.callParent();
      },
    });
  }

  /**
   * Create chart with type
   */
  static create(type: string, config: any): any {
    const typeMap: Record<string, string> = {
      'line': 'cin7linechart',
      'bar': 'cin7barchart',
      'pie': 'cin7piechart',
      'area': 'cin7areachart',
    };

    const xtype = typeMap[type] || 'cin7chart';
    return Cin7Component.create(Ext.apply({ xtype }, config));
  }
}

// Line chart
export class Cin7LineChart extends Cin7Component {
  static xtype = 'cin7linechart';

  static register(): void {
    this.define('Cin7.chart.LineChart', {
      extend: 'Cin7.chart.Chart',
      xtype: this.xtype,
      
      initComponent: function() {
        // Default line series config
        if (this.series) {
          this.series = this.series.map((series: any) => Ext.apply({
            type: 'line',
            smooth: true,
            style: {
              lineWidth: 2,
            },
            marker: {
              radius: 4,
              lineWidth: 2,
            },
            highlight: {
              scale: 1.5,
            },
            tooltip: {
              trackMouse: true,
              renderer: series.tooltipRenderer,
            },
          }, series));
        }
        
        this.callParent();
      },
    });
  }
}

// Bar chart
export class Cin7BarChart extends Cin7Component {
  static xtype = 'cin7barchart';

  static register(): void {
    this.define('Cin7.chart.BarChart', {
      extend: 'Cin7.chart.Chart',
      xtype: this.xtype,
      
      initComponent: function() {
        // Default bar series config
        if (this.series) {
          this.series = this.series.map((series: any) => Ext.apply({
            type: 'bar',
            style: {
              minGapWidth: 20,
              maxBarWidth: 50,
            },
            highlight: {
              strokeStyle: 'black',
              fillStyle: 'gold',
            },
            label: {
              display: 'insideEnd',
              field: series.yField,
              orientation: 'vertical',
              textAlign: 'center',
            },
          }, series));
        }
        
        this.callParent();
      },
    });
  }
}

// Export all chart types
export const ChartTypes = {
  Cin7Chart,
  Cin7LineChart,
  Cin7BarChart,
};