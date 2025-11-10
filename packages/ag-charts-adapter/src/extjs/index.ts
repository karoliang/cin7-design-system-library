/**
 * ExtJS adapters for AG Charts integration
 * Custom enterprise implementation with advanced features
 */

// AG Charts components
export * from './Cin7AgChartsBase';
export * from './Cin7AgChartsLine';

/**
 * Register all AG Charts ExtJS components
 */
export function registerAllChartComponents(): void {
  const { Cin7AgChartsBase } = require('./Cin7AgChartsBase');
  const { Cin7AgChartsLine } = require('./Cin7AgChartsLine');

  Cin7AgChartsBase.register();
  Cin7AgChartsLine.register();
}

/**
 * Legacy alias for backward compatibility
 * @deprecated Use registerAllChartComponents instead
 */
export function registerAllAgChartsComponents(): void {
  registerAllChartComponents();
}
