/**
 * Theme utilities for Highcharts integration with Cin7 design tokens
 * Maps Polaris/Cin7 design tokens to Highcharts theme configuration
 */

import * as Highcharts from 'highcharts';
import { getTokenValue } from '@cin7/design-tokens/utilities';

export interface Cin7ChartTheme {
  mode?: 'light' | 'dark';
  colors?: string[];
  customOptions?: Highcharts.Options;
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
 * Get Highcharts theme configuration based on Cin7 design tokens
 */
export function getCin7HighchartsTheme(config: Cin7ChartTheme = {}): Highcharts.Options {
  const mode = config.mode || 'light';
  const colors = config.colors || dataVisualizationColors[mode];

  // Get design token values
  const textColor = getTokenValue('p-color-text');
  const textSubdued = getTokenValue('p-color-text-subdued');
  const bgSurface = getTokenValue('p-color-bg-surface');
  const bgBase = getTokenValue('p-color-bg');
  const borderColor = getTokenValue('p-color-border');
  const borderSubdued = getTokenValue('p-color-border-subdued');

  const theme: Highcharts.Options = {
    colors,

    chart: {
      backgroundColor: bgSurface,
      borderColor: borderSubdued,
      borderRadius: 8,
      borderWidth: 1,
      plotBackgroundColor: bgSurface,
      plotBorderColor: borderSubdued,
      plotBorderWidth: 0,
      style: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
      },
    },

    title: {
      style: {
        color: textColor,
        fontSize: '18px',
        fontWeight: '600',
      },
    },

    subtitle: {
      style: {
        color: textSubdued,
        fontSize: '14px',
      },
    },

    xAxis: {
      gridLineColor: borderSubdued,
      gridLineWidth: 0,
      labels: {
        style: {
          color: textSubdued,
          fontSize: '12px',
        },
      },
      lineColor: borderColor,
      lineWidth: 1,
      tickColor: borderColor,
      title: {
        style: {
          color: textColor,
          fontSize: '13px',
          fontWeight: '500',
        },
      },
    },

    yAxis: {
      gridLineColor: borderSubdued,
      gridLineWidth: 1,
      labels: {
        style: {
          color: textSubdued,
          fontSize: '12px',
        },
      },
      lineColor: borderColor,
      lineWidth: 0,
      minorGridLineColor: borderSubdued,
      tickColor: borderColor,
      tickWidth: 0,
      title: {
        style: {
          color: textColor,
          fontSize: '13px',
          fontWeight: '500',
        },
      },
    },

    tooltip: {
      backgroundColor: bgBase,
      borderColor: borderColor,
      borderRadius: 6,
      borderWidth: 1,
      shadow: true,
      style: {
        color: textColor,
        fontSize: '13px',
      },
    },

    plotOptions: {
      series: {
        animation: {
          duration: 300,
        },
        dataLabels: {
          color: textColor,
          style: {
            fontSize: '12px',
            fontWeight: '400',
            textOutline: 'none',
          },
        },
        marker: {
          lineColor: bgSurface,
          lineWidth: 2,
          radius: 4,
          states: {
            hover: {
              radiusPlus: 2,
            },
          },
        },
      },
      line: {
        lineWidth: 2,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
      spline: {
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      area: {
        fillOpacity: 0.1,
        lineWidth: 2,
        marker: {
          enabled: false,
        },
      },
      column: {
        borderRadius: 4,
        borderWidth: 0,
      },
      bar: {
        borderRadius: 4,
        borderWidth: 0,
      },
      pie: {
        borderColor: bgSurface,
        borderWidth: 2,
        dataLabels: {
          connectorColor: borderColor,
          style: {
            color: textColor,
            fontSize: '13px',
            fontWeight: '400',
          },
        },
      },
    },

    legend: {
      backgroundColor: 'transparent',
      borderColor: borderSubdued,
      borderRadius: 4,
      borderWidth: 0,
      itemStyle: {
        color: textColor,
        fontSize: '13px',
        fontWeight: '400',
      },
      itemHoverStyle: {
        color: textColor,
      },
      itemHiddenStyle: {
        color: textSubdued,
      },
      navigation: {
        activeColor: textColor,
        inactiveColor: textSubdued,
      },
    },

    credits: {
      enabled: false,
    },

    labels: {
      style: {
        color: textSubdued,
      },
    },

    navigation: {
      buttonOptions: {
        symbolStroke: textColor,
        theme: {
          fill: bgSurface,
          stroke: borderColor,
          r: 4,
          states: {
            hover: {
              fill: bgBase,
              stroke: borderColor,
            },
            select: {
              fill: bgBase,
              stroke: borderColor,
            },
          },
        },
      },
    },

    rangeSelector: {
      buttonTheme: {
        fill: bgSurface,
        stroke: borderColor,
        style: {
          color: textColor,
        },
        states: {
          hover: {
            fill: bgBase,
            stroke: borderColor,
          },
          select: {
            fill: bgBase,
            stroke: borderColor,
            style: {
              color: textColor,
              fontWeight: '600',
            },
          },
        },
      },
      inputBoxBorderColor: borderColor,
      inputStyle: {
        backgroundColor: bgSurface,
        color: textColor,
      },
      labelStyle: {
        color: textSubdued,
      },
    },

    navigator: {
      handles: {
        backgroundColor: bgSurface,
        borderColor: borderColor,
      },
      maskFill: `${textColor}15`, // 15 is ~9% opacity
      outlineColor: borderColor,
      series: {
        color: colors[0],
        lineColor: colors[0],
      },
      xAxis: {
        gridLineColor: borderSubdued,
      },
    },

    scrollbar: {
      barBackgroundColor: borderSubdued,
      barBorderColor: borderColor,
      buttonArrowColor: textColor,
      buttonBackgroundColor: bgSurface,
      buttonBorderColor: borderColor,
      rifleColor: textSubdued,
      trackBackgroundColor: bgBase,
      trackBorderColor: borderSubdued,
    },
  };

  // Merge with custom options if provided
  if (config.customOptions) {
    return mergeOptions(theme, config.customOptions);
  }

  return theme;
}

/**
 * Apply Cin7 theme to Highcharts globally
 */
export function applyGlobalHighchartsTheme(config: Cin7ChartTheme = {}): void {
  const theme = getCin7HighchartsTheme(config);
  Highcharts.setOptions(theme);
}

/**
 * Deep merge Highcharts options
 */
function mergeOptions(
  base: Highcharts.Options,
  custom: Highcharts.Options
): Highcharts.Options {
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
        (result as any)[key] = mergeOptions(baseValue, customValue);
      } else {
        (result as any)[key] = customValue;
      }
    }
  }

  return result;
}

/**
 * Get responsive chart configuration
 */
export function getResponsiveConfig(): Highcharts.ResponsiveOptions {
  return {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          chart: {
            height: 300,
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5,
            },
            title: {
              text: undefined,
            },
          },
          subtitle: {
            text: undefined,
          },
          credits: {
            enabled: false,
          },
        },
      },
    ],
  };
}

/**
 * Watch for theme changes in the document and update Highcharts
 */
export function watchDocumentTheme(callback?: (mode: 'light' | 'dark') => void): () => void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-cin7-theme') {
        const mode = document.documentElement.getAttribute('data-cin7-theme') as 'light' | 'dark' || 'light';
        applyGlobalHighchartsTheme({ mode });
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
