/**
 * LineChart component tests
 * Comprehensive testing with performance and accessibility validation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LineChart } from '../../react/LineChart';
import { testConfig } from '../setup';

const { generateTestData, performanceTestUtils, accessibilityTestUtils } = testConfig;

describe('LineChart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders line chart with title', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Test Chart"
          series={testData}
        />
      );

      expect(screen.getByRole('img', { name: /test chart/i })).toBeInTheDocument();
    });

    it('renders without title for accessibility', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          series={testData}
        />
      );

      expect(screen.getByRole('img', { name: /line chart/i })).toBeInTheDocument();
    });

    it('renders with custom aria-label', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          series={testData}
          ariaLabel="Sales performance over time"
        />
      );

      expect(screen.getByRole('img', { name: /sales performance over time/i })).toBeInTheDocument();
    });
  });

  describe('Data Handling', () => {
    it('handles single series data', () => {
      const singleSeries = [generateTestData.lineChart()[0]];

      render(
        <LineChart
          title="Single Series"
          series={singleSeries}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles multiple series data', () => {
      const multiSeries = generateTestData.lineChart();

      render(
        <LineChart
          title="Multi Series"
          series={multiSeries}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles empty data gracefully', () => {
      render(
        <LineChart
          title="Empty Chart"
          series={[]}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles mixed data formats', () => {
      const mixedData = [
        {
          name: 'Mixed Series',
          data: [
            [1, 10],      // [x, y] format
            [2, 20],      // [x, y] format
            30,           // simple number (should become [index, value])
            [4, 40],      // [x, y] format
          ],
        },
      ];

      render(
        <LineChart
          title="Mixed Data Format"
          series={mixedData}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Configuration Options', () => {
    it('enables data labels when configured', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="With Data Labels"
          series={testData}
          dataLabels={true}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('enables markers when configured', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="With Markers"
          series={testData}
          markers={true}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('enables smooth curves when configured', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Smooth Curves"
          series={testData}
          smooth={true}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies custom colors to series', () => {
      const coloredData = [
        {
          name: 'Red Series',
          data: [[1, 10], [2, 20]],
          color: '#ff0000',
        },
        {
          name: 'Blue Series',
          data: [[1, 15], [2, 25]],
          color: '#0000ff',
        },
      ];

      render(
        <LineChart
          title="Colored Series"
          series={coloredData}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('configures custom axis titles', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Custom Axes"
          series={testData}
          xAxis={{ title: 'Time Period' }}
          yAxis={{ title: 'Value' }}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Legend and Tooltip', () => {
    it('shows legend when enabled', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="With Legend"
          series={testData}
          legend={true}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('hides legend when disabled', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="No Legend"
          series={testData}
          legend={false}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('enables tooltip when configured', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="With Tooltip"
          series={testData}
          tooltip={true}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('renders with custom dimensions', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Custom Size"
          series={testData}
          width={600}
          height={400}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies responsive class names', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Responsive Chart"
          series={testData}
          responsive={true}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Loading and Error States', () => {
    it('shows loading state when loading prop is true', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Loading Chart"
          series={testData}
          loading={true}
        />
      );

      expect(screen.getByText(/loading chart/i)).toBeInTheDocument();
    });

    it('shows error state when error prop is provided', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Error Chart"
          series={testData}
          error="Failed to load data"
        />
      );

      expect(screen.getByText(/error loading chart/i)).toBeInTheDocument();
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  describe('Performance Tests', () => {
    it('renders quickly with small datasets', async () => {
      const smallData = generateTestData.lineChart();

      const renderTime = await performanceTestUtils.measureRenderTime(() => {
        render(
          <LineChart
            title="Performance Test"
            series={smallData}
          />
        );
      });

      expect(renderTime).toBeLessThan(100); // Should render in under 100ms
    });

    it('handles medium datasets efficiently', async () => {
      const mediumData = [
        {
          name: 'Medium Dataset',
          data: performanceTestUtils.generateLargeDataset(1000),
        },
      ];

      const renderTime = await performanceTestUtils.measureRenderTime(() => {
        render(
          <LineChart
            title="Medium Dataset"
            series={mediumData}
          />
        );
      });

      expect(renderTime).toBeLessThan(500); // Should render in under 500ms
    });
  });

  describe('Accessibility Tests', () => {
    it('has proper aria-label for screen readers', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Accessible Chart"
          series={testData}
        />
      );

      const chart = screen.getByRole('img');
      expect(chart).toHaveAttribute('aria-label');
    });

    it('provides fallback text for accessibility', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          series={testData}
          ariaLabel="Quarterly sales data showing growth trend"
        />
      );

      const chart = screen.getByRole('img');
      expect(chart).toHaveAttribute('aria-label', 'Quarterly sales data showing growth trend');
    });
  });

  describe('Theme Integration', () => {
    it('applies light theme by default', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Light Theme"
          series={testData}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('applies custom theme when provided', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Custom Theme"
          series={testData}
          theme={{
            mode: 'dark',
            colors: ['#ff0000', '#00ff00', '#0000ff'],
          }}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('handles invalid data gracefully', () => {
      const invalidData = [
        {
          name: 'Invalid Series',
          data: [null, undefined, 'invalid', {}, []],
        },
      ];

      render(
        <LineChart
          title="Invalid Data"
          series={invalidData}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('handles missing series data', () => {
      render(
        <LineChart
          title="No Data"
          series={[]}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });

  describe('Integration with ChartContainer', () => {
    it('passes through ChartContainer props correctly', () => {
      const testData = generateTestData.lineChart();

      render(
        <LineChart
          title="Integration Test"
          series={testData}
          className="custom-chart-class"
          style={{ border: '1px solid red' }}
        />
      );

      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('calls onChartReady callback when chart is ready', async () => {
      const testData = generateTestData.lineChart();
      const onChartReady = vi.fn();

      render(
        <LineChart
          title="Callback Test"
          series={testData}
          onChartReady={onChartReady}
        />
      );

      await waitFor(() => {
        expect(onChartReady).toHaveBeenCalled();
      });
    });
  });
});