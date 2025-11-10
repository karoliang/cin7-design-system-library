/**
 * Test setup for AG Charts adapter
 * Configures testing environment with mock chart instances
 */

import { vi } from 'vitest';

// Mock AG Charts for testing
vi.mock('ag-charts-community', () => ({
  AgCharts: {
    createAgChart: vi.fn(() => ({
      updateOptions: vi.fn(),
      destroy: vi.fn(),
      canvas: {
        toBlob: vi.fn(),
      },
    })),
  },
}));

// Mock design tokens for testing
vi.mock('@cin7/design-tokens', () => ({
  getTokenValue: vi.fn((key: string) => {
    const tokens: Record<string, string> = {
      'p-color-text': '#202223',
      'p-color-text-subdued': '#6d7175',
      'p-color-bg-surface': '#ffffff',
      'p-color-bg': '#fafafa',
      'p-color-border': '#c4c4c4',
      'p-color-border-subdued': '#e1e3e3',
    };
    return tokens[key] || '';
  }),
}));

// Mock DOM APIs for chart testing
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: vi.fn((cb) => setTimeout(cb, 0)),
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: vi.fn(),
});

// Mock ResizeObserver for responsive charts
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock MutationObserver for theme watching
global.MutationObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
}));

// Setup test utilities
export const mockChartInstance = {
  updateOptions: vi.fn(),
  destroy: vi.fn(),
  canvas: {
    toBlob: vi.fn((callback: Function) => {
      // Mock canvas blob creation
      setTimeout(() => callback(new Blob()), 10);
    }),
  },
  options: {
    series: [],
    axes: [],
    legend: { enabled: true },
  },
};

export const mockAgCharts = {
  createAgChart: vi.fn(() => mockChartInstance),
};

// Test data generators
export const generateTestData = {
  lineChart: () => [
    { name: 'Series 1', data: [[1, 10], [2, 20], [3, 15], [4, 25], [5, 30]] },
    { name: 'Series 2', data: [[1, 15], [2, 25], [3, 20], [4, 30], [5, 35]] },
  ],
  barChart: () => [
    { name: 'Product A', data: [[1, 100], [2, 150], [3, 120]] },
    { name: 'Product B', data: [[1, 80], [2, 200], [3, 160]] },
  ],
  pieChart: () => [
    { name: 'Category A', value: 30 },
    { name: 'Category B', value: 45 },
    { name: 'Category C', value: 25 },
  ],
  areaChart: () => [
    { name: 'Revenue', data: [[1, 1000], [2, 1200], [3, 1100], [4, 1400], [5, 1600]] },
  ],
  scatterChart: () => [
    { name: 'Dataset 1', data: [[10, 20], [15, 25], [20, 30], [25, 35], [30, 40]] },
    { name: 'Dataset 2', data: [[12, 22], [18, 28], [22, 32], [28, 38], [32, 42]] },
  ],
};

// Performance test utilities
export const performanceTestUtils = {
  measureRenderTime: async (renderFn: Function) => {
    const start = performance.now();
    await renderFn();
    const end = performance.now();
    return end - start;
  },

  generateLargeDataset: (size: number) => {
    return Array.from({ length: size }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.1) * 100 + Math.random() * 20,
    }));
  },

  benchmarkChartUpdate: async (chart: any, updates: number) => {
    const start = performance.now();
    for (let i = 0; i < updates; i++) {
      chart.updateOptions({ data: [[i, Math.random() * 100]] });
    }
    const end = performance.now();
    return end - start;
  },
};

// Accessibility test utilities
export const accessibilityTestUtils = {
  checkAriaLabels: (element: HTMLElement) => {
    const charts = element.querySelectorAll('[role="img"]');
    return Array.from(charts).map(chart => ({
      hasAriaLabel: chart.hasAttribute('aria-label'),
      ariaLabel: chart.getAttribute('aria-label'),
    }));
  },

  checkKeyboardNavigation: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    return focusableElements.length > 0;
  },

  checkColorContrast: (foregroundColor: string, backgroundColor: string) => {
    // Simple contrast ratio calculation
    const getLuminance = (color: string) => {
      const rgb = parseInt(color.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = rgb & 0xff;
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    };

    const fgLum = getLuminance(foregroundColor);
    const bgLum = getLuminance(backgroundColor);
    const contrast = (Math.max(fgLum, bgLum) + 0.05) / (Math.min(fgLum, bgLum) + 0.05);

    return {
      ratio: contrast,
      wcagAA: contrast >= 4.5,
      wcagAAA: contrast >= 7,
    };
  },
};

// Export test configuration
export const testConfig = {
  mockChartInstance,
  mockAgCharts,
  generateTestData,
  performanceTestUtils,
  accessibilityTestUtils,
};