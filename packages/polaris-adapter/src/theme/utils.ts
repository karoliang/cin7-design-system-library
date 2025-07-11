/**
 * Theme utility functions for Cin7 DSL
 */

import { cin7Tokens } from './tokens';

export function getCSSVariable(variable: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

export function setCSSVariable(variable: string, value: string): void {
  document.documentElement.style.setProperty(variable, value);
}

export function applyExtJSTheme(theme: 'light' | 'dark'): void {
  const root = document.documentElement;
  
  // Apply theme-specific overrides for ExtJS components
  if (theme === 'dark') {
    root.style.setProperty('--cin7-extjs-bg', '#1a1a1a');
    root.style.setProperty('--cin7-extjs-text', '#ffffff');
    root.style.setProperty('--cin7-extjs-border', '#333333');
  } else {
    root.style.setProperty('--cin7-extjs-bg', '#ffffff');
    root.style.setProperty('--cin7-extjs-text', '#000000');
    root.style.setProperty('--cin7-extjs-border', '#cccccc');
  }
}

export function getZIndex(layer: keyof typeof cin7Tokens.zIndex): number {
  return cin7Tokens.zIndex[layer];
}