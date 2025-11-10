/**
 * Theme utilities for AG Charts integration with Cin7 design tokens
 * Maps Polaris/Cin7 design tokens to AG Charts theme configuration
 */

import type { AgThemeOptions } from 'ag-charts-community';

import { getTokenValue } from '@cin7/design-tokens';

export interface Cin7ChartTheme {
  mode?: 'light' | 'dark';
  colors?: string[];
  customOptions?: AgThemeOptions;
}

/**
 * Data visualization color palette from Polaris design guidelines
 * Optimized for accessibility and clarity
 */
export const dataVisualizationColors = {
  light: [
    '#5C6AC4', // Purple
    '#006FBB', // Blue
    '#47C1BF', // Teal
    '#00A0AC', // Cyan
    '#BD10E0', // Magenta
    '#9C6ADE', // Lavender
    '#50B83C', // Green
    '#F49342', // Orange
    '#DC5E27', // Red-Orange
    '#C32C69', // Pink
  ],
  dark: [
    '#8C9AFF', // Light Purple
    '#5BCDFF', // Light Blue
    '#6FDEDB', // Light Teal
    '#00E3F0', // Light Cyan
    '#E876FF', // Light Magenta
    '#B695F8', // Light Lavender
    '#7FE072', // Light Green
    '#FFA86C', // Light Orange
    '#FF9470', // Light Red-Orange
    '#FF6D9A', // Light Pink
  ],
};

/**
 * Get color palette for charts
 */
export function getCin7ChartColors(mode: 'light' | 'dark' = 'light'): string[] {
  return dataVisualizationColors[mode];
}

/**
 * Get AG Charts theme configuration based on Cin7 design tokens
 */
export function getCin7AgChartsTheme(config: Cin7ChartTheme = {}): AgThemeOptions {
  const mode = config.mode || 'light';
  const colors = config.colors || dataVisualizationColors[mode];

  // Get design token values
  const textColor = getTokenValue('p-color-text') || (mode === 'light' ? '#202223' : '#ffffff');
  const textSubdued = getTokenValue('p-color-text-subdued') || (mode === 'light' ? '#6d7175' : '#8c9196');
  const bgSurface = getTokenValue('p-color-bg-surface') || (mode === 'light' ? '#ffffff' : '#1c1e21');
  const bgBase = getTokenValue('p-color-bg') || (mode === 'light' ? '#fafafa' : '#111315');
  const borderColor = getTokenValue('p-color-border') || (mode === 'light' ? '#c4c4c4' : '#424549');
  const borderSubdued = getTokenValue('p-color-border-subdued') || (mode === 'light' ? '#e1e3e3' : '#363a3d');

  // Use AG Charts v9.2.0 compatible theme structure
  const theme: AgThemeOptions = {
    // Basic palette configuration
    palette: {
      colors: colors,
    },
    // Text styling
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
    fontSize: 13,
    // Direct color configuration for chart elements
    background: {
      visible: false,
    },
    title: {
      color: textColor,
      fontSize: 18,
    },
    subtitle: {
      color: textSubdued,
      fontSize: 14,
    },
    legend: {
      label: {
        color: textColor,
        fontSize: 13,
      },
    },
    // Axis styling
    axes: {
      number: {
        label: {
          color: textColor,
          fontSize: 12,
        },
        title: {
          color: textColor,
          fontSize: 14,
        },
        gridline: {
          stroke: borderSubdued,
        },
        line: {
          stroke: borderColor,
        },
      },
      category: {
        label: {
          color: textColor,
          fontSize: 12,
        },
        title: {
          color: textColor,
          fontSize: 14,
        },
        gridline: {
          stroke: borderSubdued,
        },
        line: {
          stroke: borderColor,
        },
      },
    },
  };

  // Merge with custom options if provided
  if (config.customOptions) {
    return mergeThemeOptions(theme, config.customOptions);
  }

  return theme;
}

/**
 * Deep merge AG Charts theme options
 */
function mergeThemeOptions(
  base: AgThemeOptions,
  custom: AgThemeOptions
): AgThemeOptions {
  const result = { ...base };

  for (const key in custom) {
    if (custom.hasOwnProperty(key)) {
      const customValue = (custom as any)[key];
      const baseValue = (result as any)[key];

      if (
        typeof customValue === 'object' &&
        !Array.isArray(customValue) &&
        customValue !== null &&
        typeof baseValue === 'object' &&
        !Array.isArray(baseValue) &&
        baseValue !== null
      ) {
        (result as any)[key] = mergeThemeOptions(baseValue, customValue);
      } else {
        (result as any)[key] = customValue;
      }
    }
  }

  return result;
}

/**
 * Watch for theme changes in the document and return current mode
 */
export function getDocumentTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') {
    return 'light';
  }

  const mode = document.documentElement.getAttribute('data-cin7-theme') as 'light' | 'dark';
  return mode || 'light';
}

/**
 * Watch for theme changes in the document and call callback
 */
export function watchDocumentTheme(callback?: (mode: 'light' | 'dark') => void): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-cin7-theme') {
        const mode = getDocumentTheme();
        if (callback) {
          callback(mode);
        }
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-cin7-theme'],
  });

  return () => observer.disconnect();
}

/**
 * Get responsive chart configuration
 */
export function getResponsiveConfig() {
  return {
    responsive: true,
    resize: {
      debounce: 100,
    },
  };
}