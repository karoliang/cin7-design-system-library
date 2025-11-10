/**
 * Theme utilities for AG Charts integration with Cin7 design tokens
 * Maps Polaris/Cin7 design tokens to AG Charts theme configuration
 */

import type { AgThemeOptions } from 'ag-charts-community';

// Import design tokens with fallback
let getTokenValue: (key: string) => string;
try {
  ({ getTokenValue } = require('@cin7/design-tokens'));
} catch {
  // Fallback for when design-tokens is not available during build
  getTokenValue = (_key: string) => '';
}

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

  const theme: AgThemeOptions = {
    baseTheme: mode === 'dark' ? 'ag-dark' : 'ag-default',
    palette: {
      colors,
      fills: colors,
      strokes: colors.map((color) => color),
    },
    overrides: {
      common: {
        background: {
          visible: true,
          fill: bgSurface,
        },
        padding: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
        title: {
          enabled: true,
          color: textColor,
          fontSize: 18,
          fontWeight: '600',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
        },
        subtitle: {
          enabled: true,
          color: textSubdued,
          fontSize: 14,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
        },
        legend: {
          enabled: true,
          position: 'right',
          spacing: 20,
          item: {
            padding: {
              top: 4,
              right: 8,
              bottom: 4,
              left: 8,
            },
            label: {
              color: textColor,
              fontSize: 13,
              fontWeight: '400',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
            },
            marker: {
              size: 12,
              shape: 'square',
              strokeWidth: 2,
            },
          },
        },
      },
      cartesian: {
        axes: {
          category: {
            line: {
              color: borderColor,
              width: 1,
            },
            tick: {
              color: borderColor,
              width: 1,
              size: 6,
            },
            label: {
              color: textSubdued,
              fontSize: 12,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
            },
            gridStyle: {
              colors: [borderSubdued],
              lineDash: [0],
              strokeWidth: 0,
            },
          },
          number: {
            line: {
              color: borderColor,
              width: 1,
            },
            tick: {
              color: borderColor,
              width: 1,
              size: 6,
            },
            label: {
              color: textSubdued,
              fontSize: 12,
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
            },
            gridStyle: {
              colors: [borderSubdued],
              lineDash: [0],
              strokeWidth: 1,
            },
          },
        },
      },
      line: {
        series: {
          strokeWidth: 2,
          marker: {
            enabled: false,
            size: 6,
            strokeWidth: 2,
            fill: bgSurface,
          },
          highlightStyle: {
            item: {
              strokeWidth: 2,
              fill: bgSurface,
            },
          },
          tooltip: {
            enabled: true,
            color: textColor,
            backgroundColor: bgBase,
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
        },
      },
      area: {
        series: {
          fill: {
            opacity: 0.1,
          },
          strokeWidth: 2,
          marker: {
            enabled: false,
            size: 6,
            strokeWidth: 2,
            fill: bgSurface,
          },
          highlightStyle: {
            item: {
              strokeWidth: 2,
              fill: bgSurface,
            },
          },
          tooltip: {
            enabled: true,
            color: textColor,
            backgroundColor: bgBase,
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
        },
      },
      bar: {
        series: {
          strokeWidth: 0,
          cornerRadius: 4,
          label: {
            enabled: false,
            color: textColor,
            fontSize: 12,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
          highlightStyle: {
            item: {
              strokeWidth: 2,
              fill: bgSurface,
            },
          },
          tooltip: {
            enabled: true,
            color: textColor,
            backgroundColor: bgBase,
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
        },
      },
      column: {
        series: {
          strokeWidth: 0,
          cornerRadius: 4,
          label: {
            enabled: false,
            color: textColor,
            fontSize: 12,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
          highlightStyle: {
            item: {
              strokeWidth: 2,
              fill: bgSurface,
            },
          },
          tooltip: {
            enabled: true,
            color: textColor,
            backgroundColor: bgBase,
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
        },
      },
      pie: {
        series: {
          strokeWidth: 2,
          calloutLabel: {
            enabled: true,
            color: textColor,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
          sectorLabel: {
            enabled: false,
            color: textColor,
            fontSize: 12,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
          highlightStyle: {
            item: {
              strokeWidth: 2,
              fill: bgSurface,
            },
          },
          tooltip: {
            enabled: true,
            color: textColor,
            backgroundColor: bgBase,
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
          title: {
            enabled: true,
            color: textColor,
            fontSize: 16,
            fontWeight: '600',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
        },
      },
      scatter: {
        series: {
          marker: {
            size: 8,
            strokeWidth: 2,
            fill: bgSurface,
          },
          highlightStyle: {
            item: {
              strokeWidth: 2,
              fill: bgSurface,
            },
          },
          tooltip: {
            enabled: true,
            color: textColor,
            backgroundColor: bgBase,
            borderColor: borderColor,
            borderWidth: 1,
            fontSize: 13,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
          },
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