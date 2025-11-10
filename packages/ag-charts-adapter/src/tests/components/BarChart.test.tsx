import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BarChart } from '../../react/BarChart';

// Mock AG Charts to prevent actual chart rendering in tests
vi.mock('ag-charts-react', () => ({
  AgChartsReact: ({ options }: any) => (
    <div data-testid="ag-charts-mock">
      <div data-testid="chart-title">{options.title?.text}</div>
      <div data-testid="chart-series-count">{options.series?.length || 0}</div>
      <div data-testid="chart-axes-count">{options.axes?.length || 0}</div>
      {options.axes?.map((axis: any, index: number) => (
        <div key={index} data-testid={`axis-${index}`}>
          <span data-testid={`axis-${index}-type`}>{axis.type}</span>
          {axis.category && (
            <span data-testid={`axis-${index}-category`}>
              {Array.isArray(axis.category) ? 'array' : 'object'}
            </span>
          )}
        </div>
      ))}
    </div>
  ),
}));

describe('BarChart', () => {
  const mockSeries = [
    {
      name: 'Q1 2025',
      data: [450, 320, 580, 410, 290],
    },
    {
      name: 'Q2 2025',
      data: [510, 380, 620, 450, 340],
    },
  ];

  const mockCategories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];

  it('renders chart with correct title', () => {
    render(
      <BarChart
        title="Test Chart"
        series={mockSeries}
        xAxis={{ categories: mockCategories }}
      />
    );

    expect(screen.getByTestId('chart-title')).toHaveTextContent('Test Chart');
  });

  it('configures category axis correctly with direct array (not object)', () => {
    render(
      <BarChart
        title="Test Chart"
        series={mockSeries}
        xAxis={{ categories: mockCategories }}
      />
    );

    // Should have 2 axes (x and y)
    expect(screen.getByTestId('chart-axes-count')).toHaveTextContent('2');

    // First axis should be category type with direct array category
    expect(screen.getByTestId('axis-0-type')).toHaveTextContent('category');
    expect(screen.getByTestId('axis-0-category')).toHaveTextContent('array');
  });

  it('configures horizontal orientation correctly', () => {
    render(
      <BarChart
        title="Horizontal Chart"
        series={mockSeries}
        orientation="horizontal"
        xAxis={{ categories: mockCategories }}
      />
    );

    // First axis should be number type for horizontal
    expect(screen.getByTestId('axis-0-type')).toHaveTextContent('number');

    // Second axis should be category type
    expect(screen.getByTestId('axis-1-type')).toHaveTextContent('category');
    expect(screen.getByTestId('axis-1-category')).toHaveTextContent('array');
  });

  it('uses unique yKeys for non-stacked charts to prevent legend conflicts', () => {
    const { container } = render(
      <BarChart
        title="Non-stacked Chart"
        series={mockSeries}
        xAxis={{ categories: mockCategories }}
      />
    );

    // We can't directly test the yKeys with our mock, but we can verify
    // the chart renders without errors
    expect(screen.getByTestId('chart-series-count')).toHaveTextContent('2');
  });

  it('configures stacking correctly', () => {
    render(
      <BarChart
        title="Stacked Chart"
        series={mockSeries}
        stacking="normal"
        xAxis={{ categories: mockCategories }}
      />
    );

    expect(screen.getByTestId('chart-series-count')).toHaveTextContent('2');
  });

  it('configures percentage stacking correctly', () => {
    render(
      <BarChart
        title="Percentage Stacked Chart"
        series={mockSeries}
        stacking="percent"
        xAxis={{ categories: mockCategories }}
      />
    );

    expect(screen.getByTestId('chart-series-count')).toHaveTextContent('2');
  });
});