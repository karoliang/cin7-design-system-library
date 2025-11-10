/**
 * ChartContainer - Base wrapper component for AG Charts with Cin7 theming
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import type { AgChartOptions, AgChartInstance } from 'ag-charts-community';
import { getCin7AgChartsTheme, Cin7ChartTheme, getDocumentTheme, watchDocumentTheme } from '../utilities/theme';

export interface ChartContainerProps {
  /** AG Charts configuration options */
  options: AgChartOptions;
  /** Theme configuration (light/dark mode, custom colors) */
  theme?: Cin7ChartTheme;
  /** Chart height in pixels or CSS value */
  height?: number | string;
  /** Chart width in pixels or CSS value */
  width?: number | string;
  /** Enable responsive behavior */
  responsive?: boolean;
  /** CSS class name for container */
  className?: string;
  /** Callback when chart is created */
  onChartReady?: (chart: AgChartInstance) => void;
  /** Callback when chart updates */
  onChartUpdate?: (chart: AgChartInstance) => void;
  /** Loading state */
  loading?: boolean;
  /** Error state */
  error?: string | null;
  /** Accessibility description */
  ariaLabel?: string;
}

/**
 * Base chart container component with Cin7 design system integration
 */
export const ChartContainer: React.FC<ChartContainerProps> = ({
  options,
  theme,
  height = 400,
  width = '100%',
  responsive = true,
  className = '',
  onChartReady,
  onChartUpdate,
  loading = false,
  error = null,
  ariaLabel,
}) => {
  const chartRef = useRef<AgChartsReactReact>(null);
  const [chartReady, setChartReady] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Cin7ChartTheme>(() => ({
    mode: getDocumentTheme(),
    ...theme,
  }));

  // Merge theme with options
  const getThemedOptions = useCallback(() => {
    const mergedTheme = { ...currentTheme, ...theme };
    const cin7Theme = getCin7AgChartsTheme(mergedTheme);

    return {
      ...cin7Theme,
      ...options,
      height: typeof height === 'number' ? height : undefined,
      width: typeof width === 'number' ? width : undefined,
    } as AgChartOptions;
  }, [options, currentTheme, theme, height, width]);

  // Handle chart ready callback
  const handleChartReady = useCallback((chart: AgChartInstance) => {
    if (!chartReady) {
      setChartReady(true);
      if (onChartReady) {
        onChartReady(chart);
      }
    } else if (onChartUpdate) {
      onChartUpdate(chart);
    }
  }, [chartReady, onChartReady, onChartUpdate]);

  // Watch for theme changes
  useEffect(() => {
    const stopWatching = watchDocumentTheme((mode) => {
      setCurrentTheme(prev => ({ ...prev, mode }));
    });

    return stopWatching;
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div
        className={`cin7-chart-loading ${className}`}
        style={{
          height,
          width,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--p-color-bg-surface)',
          border: '1px solid var(--p-color-border-subdued)',
          borderRadius: '8px',
        }}
      >
        <div style={{ textAlign: 'center', color: 'var(--p-color-text-subdued)' }}>
          <div className="cin7-spinner" style={{ marginBottom: '8px' }}>
            Loading chart...
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div
        className={`cin7-chart-error ${className}`}
        role="alert"
        style={{
          height,
          width,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--p-color-bg-surface-critical)',
          border: '1px solid var(--p-color-border-critical)',
          borderRadius: '8px',
          padding: '16px',
        }}
      >
        <div style={{ textAlign: 'center', color: 'var(--p-color-text-critical)' }}>
          <strong>Error loading chart</strong>
          <p style={{ marginTop: '8px', fontSize: '14px' }}>{error}</p>
        </div>
      </div>
    );
  }

  // Render chart
  return (
    <div
      className={`cin7-chart-container ${className}`}
      style={{
        height: typeof height === 'string' ? height : undefined,
        width: typeof width === 'string' ? width : undefined,
      }}
      role="img"
      aria-label={ariaLabel || 'Data visualization chart'}
    >
      <AgChartsReact
        ref={chartRef}
        options={getThemedOptions()}
        onChartReady={handleChartReady}
      />
    </div>
  );
};

export default ChartContainer;
