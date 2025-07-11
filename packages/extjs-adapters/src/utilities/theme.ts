/**
 * Theme utilities for ExtJS integration
 */

import { getTokenValue, setTokenValue } from '@cin7/design-tokens/utilities';

interface ThemeConfig {
  mode?: 'light' | 'dark';
  overrides?: Record<string, any>;
}

let currentTheme: 'light' | 'dark' = 'light';
const themeListeners: ((theme: string) => void)[] = [];

/**
 * Initialize Cin7 theme for ExtJS
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined' || !(window as any).Ext) {
    return;
  }

  const Ext = (window as any).Ext;

  // Create theme CSS
  const styleId = 'cin7-extjs-theme';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = generateThemeCSS();
    document.head.appendChild(style);
  }

  // Override ExtJS theme colors
  if (Ext.theme) {
    Ext.theme.override = Ext.theme.override || {};
    Object.assign(Ext.theme.override, {
      // Base colors from Polaris
      'base-color': getTokenValue('p-color-bg-surface'),
      'body-background-color': getTokenValue('p-color-bg'),
      'color': getTokenValue('p-color-text'),
      
      // Component specific
      'panel-header-background-color': getTokenValue('enterprise-extjs-panel-headerBackground'),
      'grid-header-background-color': getTokenValue('enterprise-dataGrid-header-background'),
      'grid-row-cell-background': getTokenValue('p-color-bg-surface'),
      'grid-row-cell-alt-background': getTokenValue('enterprise-dataGrid-row-stripedBackground'),
      
      // Borders
      'panel-border-color': getTokenValue('p-color-border'),
      'grid-header-border-width': '1px',
      'grid-row-cell-border-width': '1px',
      'grid-row-cell-border-color': getTokenValue('p-color-border-subdued'),
    });
  }
}

/**
 * Apply theme to ExtJS components
 */
export function applyTheme(themeOrConfig: string | ThemeConfig): void {
  const config = typeof themeOrConfig === 'string' 
    ? { mode: themeOrConfig as 'light' | 'dark' } 
    : themeOrConfig;

  currentTheme = config.mode || currentTheme;
  
  // Update CSS custom properties
  document.documentElement.setAttribute('data-cin7-theme', currentTheme);
  
  // Apply any overrides
  if (config.overrides) {
    Object.entries(config.overrides).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          setTokenValue(`enterprise-${key}-${subKey}`, String(subValue));
        });
      } else {
        setTokenValue(`enterprise-${key}`, String(value));
      }
    });
  }

  // Notify listeners
  themeListeners.forEach(listener => listener(currentTheme));

  // Refresh ExtJS components if available
  if ((window as any).Ext?.ComponentQuery) {
    const Ext = (window as any).Ext;
    Ext.ComponentQuery.query('panel').forEach((panel: any) => {
      if (panel.updateLayout) {
        panel.updateLayout();
      }
    });
  }
}

/**
 * Watch for theme changes
 */
export function watchTheme(callback: (theme: string) => void): () => void {
  themeListeners.push(callback);
  return () => {
    const index = themeListeners.indexOf(callback);
    if (index > -1) {
      themeListeners.splice(index, 1);
    }
  };
}

/**
 * Generate theme CSS for ExtJS components
 */
function generateThemeCSS(): string {
  return `
    /* ExtJS + Cin7 Theme Integration */
    
    /* Grid styling */
    .x-grid-header-ct {
      background: var(--cin7-enterprise-dataGrid-header-background) !important;
      height: var(--cin7-enterprise-dataGrid-header-height) !important;
      border-color: var(--p-color-border) !important;
    }
    
    .x-grid-cell {
      padding: var(--cin7-enterprise-dataGrid-cell-padding) !important;
      font-size: var(--cin7-enterprise-dataGrid-cell-fontSize) !important;
      border-color: var(--p-color-border-subdued) !important;
    }
    
    .x-grid-row {
      height: var(--cin7-enterprise-dataGrid-row-height) !important;
    }
    
    .x-grid-row:hover .x-grid-cell {
      background: var(--cin7-enterprise-dataGrid-row-hoverBackground) !important;
    }
    
    .x-grid-row-selected .x-grid-cell {
      background: var(--cin7-enterprise-dataGrid-row-selectedBackground) !important;
    }
    
    .x-grid-row-alt .x-grid-cell {
      background: var(--cin7-enterprise-dataGrid-row-stripedBackground) !important;
    }
    
    /* Form fields */
    .x-form-field {
      height: var(--cin7-enterprise-form-field-height) !important;
      font-size: var(--cin7-enterprise-form-field-fontSize) !important;
      padding: 0 var(--cin7-space-3) !important;
      border-radius: var(--p-border-radius-100) !important;
      border-color: var(--p-color-border) !important;
    }
    
    .x-form-field:focus {
      border-color: var(--p-color-border-emphasis) !important;
      outline: 2px solid var(--p-color-border-emphasis) !important;
      outline-offset: 1px !important;
    }
    
    /* Buttons */
    .x-btn {
      border-radius: var(--p-border-radius-100) !important;
      font-weight: 500 !important;
      transition: all var(--cin7-animation-duration-fast) var(--cin7-animation-easing-standard) !important;
    }
    
    .x-btn-default-small {
      padding: var(--cin7-space-2) var(--cin7-space-4) !important;
      font-size: 14px !important;
    }
    
    .x-btn-over {
      transform: translateY(-1px) !important;
      box-shadow: var(--p-shadow-300) !important;
    }
    
    /* Panels */
    .x-panel-header {
      background: var(--cin7-enterprise-extjs-panel-headerBackground) !important;
      border-color: var(--p-color-border) !important;
      padding: var(--cin7-space-3) var(--cin7-space-4) !important;
    }
    
    .x-panel-body {
      background: var(--p-color-bg-surface) !important;
      padding: var(--cin7-space-4) !important;
    }
    
    /* Animations */
    .x-mask {
      animation: cin7-fadeIn var(--cin7-animation-duration-fast) !important;
    }
    
    @keyframes cin7-fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* Dark theme adjustments */
    [data-cin7-theme="dark"] {
      .x-grid-header-ct {
        background: var(--cin7-enterprise-dataGrid-header-background) !important;
      }
      
      .x-grid-row-alt .x-grid-cell {
        background: var(--cin7-enterprise-dataGrid-row-stripedBackground) !important;
      }
    }
  `;
}