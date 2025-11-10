/**
 * @cin7/highcharts-adapter - Highcharts integration for Cin7 DSL
 *
 * Multi-language support for Highcharts with Cin7 design tokens integration
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
export const name = '@cin7/highcharts-adapter';

/**
 * Initialize all Highcharts components for the current environment
 */
export function initializeHighcharts(): void {
  // Apply global theme if in browser
  if (typeof window !== 'undefined') {
    const { applyGlobalHighchartsTheme } = require('./utilities/theme');
    applyGlobalHighchartsTheme({ mode: 'light' });

    // Register ExtJS components if ExtJS is available
    if ((window as any).Ext) {
      const { registerAllHighchartsComponents } = require('./extjs');
      registerAllHighchartsComponents();
    }
  }
}
