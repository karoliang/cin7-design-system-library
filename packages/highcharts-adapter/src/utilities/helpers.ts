/**
 * Helper utilities for Highcharts integration
 */

import * as Highcharts from 'highcharts';

/**
 * Format number with locale-aware formatting
 */
export function formatNumber(value: number, decimals: number = 0, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format currency with locale-aware formatting
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`;
}

/**
 * Format large numbers with abbreviations (K, M, B)
 */
export function formatAbbreviated(value: number): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Format date for chart labels
 */
export function formatDate(
  timestamp: number,
  format: 'short' | 'medium' | 'long' = 'medium',
  locale: string = 'en-US'
): string {
  const date = new Date(timestamp);

  const formats: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: 'short', day: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
  };

  return new Intl.DateTimeFormat(locale, formats[format]).format(date);
}

/**
 * Export chart to image
 * Note: Requires Highcharts exporting module to be loaded
 */
export function exportChartToImage(
  chart: any,
  filename: string = 'chart',
  type: 'image/png' | 'image/jpeg' | 'image/svg+xml' = 'image/png'
): void {
  if (chart.exportChart) {
    chart.exportChart({
      type,
      filename,
    });
  }
}

/**
 * Export chart data to CSV
 * Note: Requires Highcharts exporting module to be loaded
 */
export function exportChartToCSV(chart: any): void {
  if (chart.downloadCSV) {
    chart.downloadCSV();
  }
}

/**
 * Print chart
 * Note: Requires Highcharts exporting module to be loaded
 */
export function printChart(chart: any): void {
  if (chart.print) {
    chart.print();
  }
}

/**
 * Get chart image as data URL
 * Note: Requires Highcharts exporting module to be loaded
 */
export async function getChartDataURL(
  chart: any,
  type: 'image/png' | 'image/jpeg' = 'image/png',
  scale: number = 2
): Promise<string | null> {
  return new Promise((resolve) => {
    if (chart.exportChartLocal) {
      chart.exportChartLocal(
        {
          type,
          scale,
        },
        {},
        (dataURL: string) => {
          resolve(dataURL);
        }
      );
    } else {
      resolve(null);
    }
  });
}

/**
 * Create common tooltip formatter for currency
 */
export function createCurrencyTooltipFormatter(
  currency: string = 'USD',
  locale: string = 'en-US'
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject): string {
    const point = this.point || this;
    const value = point.y || 0;
    const formattedValue = formatCurrency(value, currency, locale);

    return `<b>${point.series.name}</b><br/>${this.x}: ${formattedValue}`;
  };
}

/**
 * Create common tooltip formatter for percentage
 */
export function createPercentageTooltipFormatter(
  decimals: number = 1
): Highcharts.TooltipFormatterCallbackFunction {
  return function (this: Highcharts.TooltipFormatterContextObject): string {
    const point = this.point || this;
    const value = point.y || 0;
    const formattedValue = formatPercentage(value, decimals);

    return `<b>${point.series.name}</b><br/>${this.x}: ${formattedValue}`;
  };
}

/**
 * Create accessibility options for charts
 */
export function createAccessibilityOptions(description: string): Highcharts.AccessibilityOptions {
  return {
    enabled: true,
    description,
    keyboardNavigation: {
      enabled: true,
    },
    point: {
      valueSuffix: '',
    },
  };
}

/**
 * Validate chart data
 */
export function validateChartData(data: any[]): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!Array.isArray(data)) {
    errors.push('Data must be an array');
    return { valid: false, errors };
  }

  if (data.length === 0) {
    errors.push('Data array is empty');
    return { valid: false, errors };
  }

  // Check for valid data structure
  data.forEach((item, index) => {
    if (typeof item === 'object' && item !== null) {
      if (!item.hasOwnProperty('x') && !item.hasOwnProperty('y') && !item.hasOwnProperty('name')) {
        errors.push(`Item at index ${index} is missing required properties`);
      }
    } else if (typeof item !== 'number' && !Array.isArray(item)) {
      errors.push(`Item at index ${index} has invalid type`);
    }
  });

  return { valid: errors.length === 0, errors };
}

/**
 * Transform data to Highcharts series format
 */
export function transformToSeriesData(
  data: Array<{ x: any; y: number; [key: string]: any }>,
  xKey: string = 'x',
  yKey: string = 'y'
): Highcharts.PointOptionsObject[] {
  return data.map((item) => {
    const { [xKey]: x, [yKey]: y, ...rest } = item;
    return {
      x,
      y,
      ...rest,
    };
  });
}
