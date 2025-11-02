/**
 * @cin7/extjs-adapters
 * 
 * ExtJS adapters for Cin7 DSL - bridges modern design system with enterprise components
 */

import { enterpriseTokens, animationTokens, spacingTokens } from '@cin7/design-tokens';
import { initializeTheme, applyTheme } from './utilities/theme';
import { registerComponents } from './components';

// Auto-initialize on import
if (typeof window !== 'undefined' && (window as any).Ext) {
  initializeTheme();
  registerComponents();
}

// Core exports
export { applyTheme, watchTheme } from './utilities/theme';
export { Cin7Component } from './components/base';
export * from './components';
export * from './utilities';

// Token bridges
export const cin7Tokens = {
  enterprise: enterpriseTokens,
  animation: animationTokens,
  spacing: spacingTokens,
};

// ExtJS configuration helper
export function configureExtJS(config?: {
  theme?: 'light' | 'dark';
  autoRegister?: boolean;
  tokenPrefix?: string;
}): any {
  const options = {
    theme: 'light',
    autoRegister: true,
    tokenPrefix: 'cin7',
    ...config,
  };

  // Apply theme
  if (options.theme) {
    applyTheme(options.theme);
  }

  const hasExt =
    typeof window !== 'undefined' && (window as any).Ext;

  // Register components
  if (options.autoRegister && hasExt) {
    registerComponents();
  }

  // Return Ext reference for chaining
  return hasExt ? (window as any).Ext : undefined;
}

// Version
export const version = '0.1.0';
