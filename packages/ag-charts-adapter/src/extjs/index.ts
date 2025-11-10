/**
 * ExtJS adapters for AG Charts integration
 * Custom enterprise implementation with advanced features
 */

// AG Charts components
export * from './Cin7AgChartsBase';
export * from './Cin7AgChartsLine';
export * from './Cin7AgChartsBar';
export * from './Cin7AgChartsPie';

/**
 * Register all AG Charts ExtJS components
 */
export function registerAllChartComponents(): void {
  const { Cin7AgChartsBase } = require('./Cin7AgChartsBase');
  const { Cin7AgChartsLine } = require('./Cin7AgChartsLine');
  const { Cin7AgChartsBar } = require('./Cin7AgChartsBar');
  const { Cin7AgChartsPie } = require('./Cin7AgChartsPie');

  Cin7AgChartsBase.register();
  Cin7AgChartsLine.register();
  Cin7AgChartsBar.register();
  Cin7AgChartsPie.register();
}

/**
 * Legacy alias for backward compatibility
 * @deprecated Use registerAllChartComponents instead
 */
export function registerAllAgChartsComponents(): void {
  registerAllChartComponents();
}
