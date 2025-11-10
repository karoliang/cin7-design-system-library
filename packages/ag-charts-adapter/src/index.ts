/**
 * @cin7/ag-charts-adapter - AG Charts integration for Cin7 DSL
 *
 * Multi-language support for AG Charts with Cin7 design tokens integration
 *
 * @packageDocumentation
 */

// Re-export utilities
export * from './utilities';

// Re-export React components
export * from './react';

// Re-export ExtJS adapters
export * from './extjs';

// Re-export Vanilla JS utilities
export * from './vanilla';

// Re-export TypeScript SDK
export * from './typescript';

// Package metadata
export const version = '0.1.0';
export const name = '@cin7/ag-charts-adapter';

/**
 * Initialize all AG Charts components for the current environment
 */
export function initializeAgCharts(): void {
  // Apply global theme if in browser
  if (typeof window !== 'undefined') {
    const { applyGlobalAgChartsTheme } = require('./utilities/theme');
    applyGlobalAgChartsTheme({ mode: 'light' });

    // Register ExtJS components if ExtJS is available
    if ((window as any).Ext) {
      const { registerAllChartComponents } = require('./extjs');
      registerAllChartComponents();
    }
  }
}

/**
 * Legacy alias for backward compatibility
 * @deprecated Use initializeAgCharts instead
 */
export function initializeHighcharts(): void {
  initializeAgCharts();
}
