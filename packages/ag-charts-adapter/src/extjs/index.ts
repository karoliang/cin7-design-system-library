/**
 * ExtJS adapters for Highcharts integration
 */

export * from './Cin7HighchartsBase';
export * from './Cin7HighchartsLine';
export * from './Cin7HighchartsBar';
export * from './Cin7HighchartsPie';

/**
 * Register all Highcharts ExtJS components
 */
export function registerAllHighchartsComponents(): void {
  const { Cin7HighchartsBase } = require('./Cin7HighchartsBase');
  const { Cin7HighchartsLine } = require('./Cin7HighchartsLine');
  const { Cin7HighchartsBar } = require('./Cin7HighchartsBar');
  const { Cin7HighchartsPie } = require('./Cin7HighchartsPie');

  Cin7HighchartsBase.register();
  Cin7HighchartsLine.register();
  Cin7HighchartsBar.register();
  Cin7HighchartsPie.register();
}
