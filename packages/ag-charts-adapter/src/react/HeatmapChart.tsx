/**
 * HeatmapChart - 2D data density visualization
 * Advanced heatmap for correlation matrices and data intensity analysis
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import { normalizeAxisTitle } from '../utilities/axisHelpers';
import type { AgChartOptions } from 'ag-charts-community';

export interface HeatmapChartDataPoint {
  /** X-axis category */
  x: string | number;
  /** Y-axis category */
  y: string | number;
  /** Value/intensity at this coordinate */
  value: number;
  /** Custom color override */
  color?: string;
  /** Optional label for this cell */
  label?: string;
}

export interface HeatmapChartSeries {
  /** Series name */
  name: string;
  /** Heatmap data points */
  data: HeatmapChartDataPoint[];
  /** Color scheme */
  colorScheme?: 'viridis' | 'blues' | 'reds' | 'greens' | 'warm' | 'cool' | 'custom';
  /** Custom color range */
  colorRange?: {
    min: string;
    max: string;
    middle?: string;
  };
  /** Show data labels */
  dataLabels?: boolean;
  /** Label format */
  labelFormat?: string;
  /** Cell border width */
  borderWidth?: number;
  /** Cell border color */
  borderColor?: string;
}

export interface HeatmapChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Heatmap data */
  series: HeatmapChartSeries[];
  /** X-axis categories */
  xCategories?: string[];
  /** Y-axis categories */
  yCategories?: string[];
  /** Color scale type */
  colorScale?: 'linear' | 'logarithmic' | 'threshold';
  /** Show legend */
  legend?: boolean;
  /** Legend position */
  legendPosition?: 'right' | 'bottom' | 'left' | 'top';
  /** X-axis configuration */
  xAxis?: {
    title?: string | { text: string };
    labelRotation?: number;
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string | { text: string };
    labelRotation?: number;
  };
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Heatmap chart component for 2D data density visualization
 *
 * @example
 * ```tsx
 * <HeatmapChart
 *   title="Correlation Matrix"
 *   series={[{
 *     name: "Correlations",
 *     data: [
 *       { x: "Var1", y: "Var1", value: 1.0 },
 *       { x: "Var1", y: "Var2", value: 0.8 },
 *       { x: "Var2", y: "Var1", value: 0.8 },
 *       { x: "Var2", y: "Var2", value: 1.0 }
 *     ]
 *   }]}
 *   colorScheme="blues"
 * />
 * ```
 */
export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  title,
  subtitle,
  series,
  xCategories = [],
  yCategories = [],
  colorScale = 'linear',
  legend = true,
  legendPosition = 'right',
  xAxis = {},
  yAxis = {},
  chartOptions = {},
  ...containerProps
}) => {
  // Define color schemes
  const colorSchemes = {
    viridis: {
      colors: ['#440154', '#31688e', '#35b779', '#fde725'],
      interpolate: true,
    },
    blues: {
      colors: ['#f7fbff', '#deebf7', '#9ecae1', '#4292c6', '#2171b5', '#08519c', '#08306b'],
      interpolate: true,
    },
    reds: {
      colors: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
      interpolate: true,
    },
    greens: {
      colors: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
      interpolate: true,
    },
    warm: {
      colors: ['#fff5f0', '#fee0d2', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#99000d'],
      interpolate: true,
    },
    cool: {
      colors: ['#f7fbff', '#deebf7', '#9ecae1', '#4292c6', '#2171b5', '#08519c', '#08306b'],
      interpolate: true,
    },
    custom: {
      colors: ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
      interpolate: true,
    },
  };

  // Process heatmap data for AG Charts
  const agSeries = series.map((seriesItem) => {
    const scheme = colorSchemes[seriesItem.colorScheme || 'blues'];
    const borderWidth = seriesItem.borderWidth || 1;
    const borderColor = seriesItem.borderColor || '#ffffff';

    // Find min and max values for color scaling
    const values = seriesItem.data.map(point => point.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Create a custom color mapper function
    const getColorForValue = (value: number): string => {
      if (seriesItem.colorRange) {
        // Use custom color range
        const normalizedValue = (value - minValue) / (maxValue - minValue);

        if (seriesItem.colorRange.middle) {
          if (normalizedValue < 0.5) {
            return interpolateColor(seriesItem.colorRange.min, seriesItem.colorRange.middle, normalizedValue * 2);
          } else {
            return interpolateColor(seriesItem.colorRange.middle, seriesItem.colorRange.max, (normalizedValue - 0.5) * 2);
          }
        } else {
          return interpolateColor(seriesItem.colorRange.min, seriesItem.colorRange.max, normalizedValue);
        }
      }

      // Use predefined color scheme
      const normalizedValue = (value - minValue) / (maxValue - minValue);
      const colorIndex = Math.floor(normalizedValue * (scheme.colors.length - 1));
      return scheme.colors[Math.min(colorIndex, scheme.colors.length - 1)];
    };

    // Transform data for AG Charts
    const transformedData = seriesItem.data.map(point => ({
      x: point.x,
      y: point.y,
      value: point.value,
      color: point.color || getColorForValue(point.value),
      label: point.label || (seriesItem.labelFormat ?
        seriesItem.labelFormat.replace('{value}', point.toString()) :
        value.toString()),
    }));

    return {
      type: 'heatmap' as any,
      data: transformedData,
      xKey: 'x',
      yKey: 'y',
      colorKey: 'color',
      colorDomain: [minValue, maxValue],
      colorRange: seriesItem.colorRange ?
        [seriesItem.colorRange.min, seriesItem.colorRange.middle || seriesItem.colorRange.min, seriesItem.colorRange.max] :
        scheme.colors,
      tooltip: {
        enabled: true,
        renderer: (params: any) => {
          const point = params.datum;
          return `
            <div style="padding: 8px;">
              <strong>${seriesItem.name}</strong><br/>
              X: ${point.x}<br/>
              Y: ${point.y}<br/>
              Value: ${point.value.toFixed(2)}
            </div>
          `;
        },
      },
      label: {
        enabled: seriesItem.dataLabels || false,
        color: '#ffffff',
        fontSize: 10,
        fontWeight: 'bold',
        formatter: (params: any) => params.datum.label,
      },
    };
  });

  const options: AgChartOptions = {
    ...chartOptions,
    title: {
      text: title,
      enabled: !!title,
    },
    subtitle: {
      text: subtitle,
      enabled: !!subtitle,
    },
    data: [],
    series: agSeries,
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: normalizeAxisTitle(xAxis.title) || {
          text: 'X Axis',
          enabled: false,
        },
        categories: xCategories.length > 0 ? xCategories : undefined,
        label: {
          rotation: xAxis.labelRotation || 0,
        },
        grid: {
          enabled: false,
        },
      },
      {
        type: 'category',
        position: 'left',
        title: normalizeAxisTitle(yAxis.title) || {
          text: 'Y Axis',
          enabled: false,
        },
        categories: yCategories.length > 0 ? yCategories : undefined,
        label: {
          rotation: yAxis.labelRotation || 0,
        },
        grid: {
          enabled: false,
        },
      },
    ],
    legend: {
      enabled: legend,
      position: legendPosition,
      gradient: {
        enabled: true,
      },
    },
  };

  return (
    <ChartContainer
      options={options}
      {...containerProps}
    />
  );
};

/**
 * Helper function to interpolate between two colors
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  // Convert hex to RGB
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);

  if (!c1 || !c2) return color1;

  // Interpolate
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);

  // Convert back to hex
  return rgbToHex(r, g, b);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}