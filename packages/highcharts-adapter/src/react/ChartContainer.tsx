/**
 * ChartContainer - Base wrapper component for Highcharts with Cin7 theming
 */

import React, { useEffect, useRef, useState } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getCin7HighchartsTheme, Cin7ChartTheme, getResponsiveConfig } from '../utilities/theme';

export interface ChartContainerProps {
  /** Highcharts configuration options */
  options: Highcharts.Options;
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
  onChartReady?: (chart: Highcharts.Chart) => void;
  /** Callback when chart updates */
  onChartUpdate?: (chart: Highcharts.Chart) => void;
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
  theme = { mode: 'light' },
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
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  const [chartReady, setChartReady] = useState(false);

  // Apply theme to options
  const themedOptions = React.useMemo(() => {
    const baseTheme = getCin7HighchartsTheme(theme);
    const mergedOptions: Highcharts.Options = {
      ...baseTheme,
      ...options,
      chart: {
        ...baseTheme.chart,
        ...options.chart,
        height: typeof height === 'number' ? height : undefined,
        width: typeof width === 'number' ? width : undefined,
      },
    };

    // Add responsive config if enabled
    if (responsive) {
      mergedOptions.responsive = getResponsiveConfig();
    }

    return mergedOptions;
  }, [options, theme, height, width, responsive]);

  // Handle chart ready
  const handleChartCallback = (chart: Highcharts.Chart) => {
    if (!chartReady) {
      setChartReady(true);
      if (onChartReady) {
        onChartReady(chart);
      }
    } else if (onChartUpdate) {
      onChartUpdate(chart);
    }
  };

  // Watch for theme changes in document
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const observer = new MutationObserver(() => {
      const documentTheme = document.documentElement.getAttribute('data-cin7-theme') as 'light' | 'dark' | null;
      if (documentTheme && chartRef.current?.chart) {
        // Force chart reflow when theme changes
        chartRef.current.chart.reflow();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-cin7-theme'],
    });

    return () => observer.disconnect();
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
      <HighchartsReact
        highcharts={Highcharts}
        options={themedOptions}
        ref={chartRef}
        callback={handleChartCallback}
      />
    </div>
  );
};

export default ChartContainer;
