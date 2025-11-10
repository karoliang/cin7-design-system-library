/**
 * DataTransformers utility tests
 * Comprehensive testing of data transformation logic
 */

import { describe, it, expect } from 'vitest';
import { DataTransformers, CommonTransformers } from '../../typescript/DataTransformers';

describe('DataTransformers', () => {
  describe('transformTimeSeries', () => {
    it('transforms timestamp and value pairs correctly', () => {
      const data = [
        { timestamp: new Date('2023-01-01'), value: 100 },
        { timestamp: new Date('2023-01-02'), value: 150 },
        { timestamp: new Date('2023-01-03'), value: 120 },
      ];

      const result = DataTransformers.transformTimeSeries(data);

      expect(result).toEqual([
        [Date.parse('2023-01-01'), 100],
        [Date.parse('2023-01-02'), 150],
        [Date.parse('2023-01-03'), 120],
      ]);
    });

    it('handles string timestamps', () => {
      const data = [
        { timestamp: '2023-01-01', value: 100 },
        { timestamp: '2023-01-02', value: 150 },
      ];

      const result = DataTransformers.transformTimeSeries(data);

      expect(result).toEqual([
        [Date.parse('2023-01-01'), 100],
        [Date.parse('2023-01-02'), 150],
      ]);
    });

    it('handles numeric timestamps', () => {
      const data = [
        { timestamp: 1672531200000, value: 100 }, // 2023-01-01
        { timestamp: 1672617600000, value: 150 }, // 2023-01-02
      ];

      const result = DataTransformers.transformTimeSeries(data);

      expect(result).toEqual([
        [1672531200000, 100],
        [1672617600000, 150],
      ]);
    });

    it('uses custom key names', () => {
      const data = [
        { date: new Date('2023-01-01'), amount: 100 },
        { date: new Date('2023-01-02'), amount: 150 },
      ];

      const result = DataTransformers.transformTimeSeries(
        data,
        'amount',
        'date'
      );

      expect(result).toEqual([
        [Date.parse('2023-01-01'), 100],
        [Date.parse('2023-01-02'), 150],
      ]);
    });

    it('handles empty data', () => {
      const result = DataTransformers.transformTimeSeries([]);
      expect(result).toEqual([]);
    });
  });

  describe('transformCategoryData', () => {
    it('transforms category and value pairs correctly', () => {
      const data = [
        { category: 'Product A', value: 100 },
        { category: 'Product B', value: 150 },
        { category: 'Product C', value: 120 },
      ];

      const result = DataTransformers.transformCategoryData(data);

      expect(result).toEqual({
        categories: ['Product A', 'Product B', 'Product C'],
        values: [100, 150, 120],
      });
    });

    it('uses custom value key', () => {
      const data = [
        { category: 'Product A', sales: 100 },
        { category: 'Product B', sales: 150 },
      ];

      const result = DataTransformers.transformCategoryData(data, 'sales');

      expect(result).toEqual({
        categories: ['Product A', 'Product B'],
        values: [100, 150],
      });
    });

    it('handles empty data', () => {
      const result = DataTransformers.transformCategoryData([]);
      expect(result).toEqual({
        categories: [],
        values: [],
      });
    });
  });

  describe('transformPieData', () => {
    it('transforms data for pie chart correctly', () => {
      const data = [
        { name: 'Segment A', value: 30, other: 'data' },
        { name: 'Segment B', value: 45 },
        { name: 'Segment C', value: 25 },
      ];

      const result = DataTransformers.transformPieData(data);

      expect(result).toEqual([
        { name: 'Segment A', value: 30, other: 'data' },
        { name: 'Segment B', value: 45 },
        { name: 'Segment C', value: 25 },
      ]);
    });

    it('uses custom key names', () => {
      const data = [
        { label: 'Segment A', amount: 30 },
        { label: 'Segment B', amount: 45 },
      ];

      const result = DataTransformers.transformPieData(
        data,
        'label',
        'amount'
      );

      expect(result).toEqual([
        { label: 'Segment A', amount: 30 },
        { label: 'Segment B', amount: 45 },
      ]);
    });

    it('handles empty data', () => {
      const result = DataTransformers.transformPieData([]);
      expect(result).toEqual([]);
    });
  });

  describe('groupBy', () => {
    it('groups data by field correctly', () => {
      const data = [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'A', value: 15 },
        { category: 'B', value: 25 },
        { category: 'C', value: 30 },
      ];

      const result = DataTransformers.groupBy(data, 'category');

      expect(result).toEqual({
        A: [
          { category: 'A', value: 10 },
          { category: 'A', value: 15 },
        ],
        B: [
          { category: 'B', value: 20 },
          { category: 'B', value: 25 },
        ],
        C: [
          { category: 'C', value: 30 },
        ],
      });
    });

    it('handles empty data', () => {
      const result = DataTransformers.groupBy([], 'category');
      expect(result).toEqual({});
    });
  });

  describe('sumBy', () => {
    it('sums values by group correctly', () => {
      const data = [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'A', value: 15 },
        { category: 'B', value: 25 },
      ];

      const result = DataTransformers.sumBy(data, 'category', 'value');

      expect(result).toEqual([
        { category: 'A', value: 25 },
        { category: 'B', value: 45 },
      ]);
    });

    it('handles missing values', () => {
      const data = [
        { category: 'A', value: 10 },
        { category: 'A' }, // missing value
        { category: 'B', value: null }, // null value
      ];

      const result = DataTransformers.sumBy(data, 'category', 'value');

      expect(result).toEqual([
        { category: 'A', value: 10 },
        { category: 'B', value: 0 },
      ]);
    });
  });

  describe('averageBy', () => {
    it('calculates average by group correctly', () => {
      const data = [
        { category: 'A', value: 10 },
        { category: 'B', value: 20 },
        { category: 'A', value: 20 },
        { category: 'B', value: 30 },
      ];

      const result = DataTransformers.averageBy(data, 'category', 'value');

      expect(result).toEqual([
        { category: 'A', value: 15 },
        { category: 'B', value: 25 },
      ]);
    });

    it('handles empty groups', () => {
      const data = [
        { category: 'A' }, // missing value
      ];

      const result = DataTransformers.averageBy(data, 'category', 'value');

      expect(result).toEqual([
        { category: 'A', value: 0 },
      ]);
    });
  });

  describe('countBy', () => {
    it('counts items by group correctly', () => {
      const data = [
        { category: 'A' },
        { category: 'B' },
        { category: 'A' },
        { category: 'B' },
        { category: 'A' },
      ];

      const result = DataTransformers.countBy(data, 'category');

      expect(result).toEqual([
        { category: 'A', value: 3 },
        { category: 'B', value: 2 },
      ]);
    });
  });

  describe('sortBy', () => {
    it('sorts data by field in ascending order', () => {
      const data = [
        { name: 'C', value: 30 },
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
      ];

      const result = DataTransformers.sortBy(data, 'name');

      expect(result).toEqual([
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
      ]);
    });

    it('sorts data by field in descending order', () => {
      const data = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
      ];

      const result = DataTransformers.sortBy(data, 'value', 'desc');

      expect(result).toEqual([
        { name: 'C', value: 30 },
        { name: 'B', value: 20 },
        { name: 'A', value: 10 },
      ]);
    });
  });

  describe('filterBy', () => {
    it('filters data by predicate', () => {
      const data = [
        { name: 'A', value: 10 },
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
      ];

      const result = DataTransformers.filterBy(data, (item) => item.value > 15);

      expect(result).toEqual([
        { name: 'B', value: 20 },
        { name: 'C', value: 30 },
      ]);
    });
  });

  describe('transformMultipleSeries', () => {
    it('transforms data for multiple series charts', () => {
      const data = [
        { series: 'Q1', category: 'Product A', value: 100 },
        { series: 'Q1', category: 'Product B', value: 150 },
        { series: 'Q2', category: 'Product A', value: 120 },
        { series: 'Q2', category: 'Product B', value: 180 },
      ];

      const result = DataTransformers.transformMultipleSeries(
        data,
        'series',
        'category',
        'value'
      );

      expect(result).toEqual({
        categories: ['Product A', 'Product B'],
        series: [
          { name: 'Q1', data: [100, 150] },
          { name: 'Q2', data: [120, 180] },
        ],
      });
    });

    it('handles missing categories in some series', () => {
      const data = [
        { series: 'Q1', category: 'Product A', value: 100 },
        { series: 'Q1', category: 'Product B', value: 150 },
        { series: 'Q2', category: 'Product A', value: 120 },
        // Product B missing in Q2
      ];

      const result = DataTransformers.transformMultipleSeries(
        data,
        'series',
        'category',
        'value'
      );

      expect(result).toEqual({
        categories: ['Product A', 'Product B'],
        series: [
          { name: 'Q1', data: [100, 150] },
          { name: 'Q2', data: [120, 0] }, // Missing value becomes 0
        ],
      });
    });
  });

  describe('calculatePercentage', () => {
    it('calculates percentage distribution correctly', () => {
      const data = [
        { name: 'A', value: 30 },
        { name: 'B', value: 45 },
        { name: 'C', value: 25 },
      ];

      const result = DataTransformers.calculatePercentage(data, 'value');

      expect(result).toEqual([
        { name: 'A', value: 30, percentage: 30 },
        { name: 'B', value: 45, percentage: 45 },
        { name: 'C', value: 25, percentage: 25 },
      ]);
    });

    it('handles zero total', () => {
      const data = [
        { name: 'A', value: 0 },
        { name: 'B', value: 0 },
      ];

      const result = DataTransformers.calculatePercentage(data, 'value');

      expect(result).toEqual([
        { name: 'A', value: 0, percentage: 0 },
        { name: 'B', value: 0, percentage: 0 },
      ]);
    });
  });

  describe('fillTimeGaps', () => {
    it('fills missing time points with default value', () => {
      const data = [
        [1000, 10],
        [2000, 20],
        [4000, 40], // Gap at 3000
      ];

      const result = DataTransformers.fillTimeGaps(data, 1000, 0);

      expect(result).toEqual([
        [1000, 10],
        [2000, 20],
        [3000, 0], // Filled point
        [4000, 40],
      ]);
    });

    it('handles empty data', () => {
      const result = DataTransformers.fillTimeGaps([], 1000, 0);
      expect(result).toEqual([]);
    });

    it('handles single data point', () => {
      const data = [[1000, 10]];
      const result = DataTransformers.fillTimeGaps(data, 1000, 0);
      expect(result).toEqual([[1000, 10]]);
    });
  });

  describe('movingAverage', () => {
    it('calculates moving average correctly', () => {
      const data = [1, 2, 3, 4, 5];
      const result = DataTransformers.movingAverage(data, 3);

      expect(result).toEqual([1, 2, 3, 4, 5]); // First points remain unchanged
    });

    it('handles window size larger than data', () => {
      const data = [1, 2, 3];
      const result = DataTransformers.movingAverage(data, 5);

      expect(result).toEqual([1, 2, 3]);
    });

    it('handles empty data', () => {
      const result = DataTransformers.movingAverage([], 3);
      expect(result).toEqual([]);
    });
  });
});

describe('CommonTransformers', () => {
  describe('salesByPeriod', () => {
    it('transforms sales data by period', () => {
      const salesData = [
        { date: '2023-01-01', amount: 100 },
        { date: '2023-01-02', amount: 150 },
        { date: '2023-01-03', amount: 120 },
      ];

      const result = CommonTransformers.salesByPeriod(salesData, 'day');

      expect(result).toEqual([
        [Date.parse('2023-01-01'), 100],
        [Date.parse('2023-01-02'), 150],
        [Date.parse('2023-01-03'), 120],
      ]);
    });
  });

  describe('productPerformance', () => {
    it('transforms product performance data', () => {
      const products = [
        { name: 'Product A', sales: 100, revenue: 1000 },
        { name: 'Product B', sales: 150, revenue: 1500 },
        { name: 'Product C', sales: 120, revenue: 1200 },
      ];

      const result = CommonTransformers.productPerformance(products);

      expect(result).toEqual({
        categories: ['Product A', 'Product B', 'Product C'],
        sales: [100, 150, 120],
        revenue: [1000, 1500, 1200],
      });
    });
  });

  describe('marketShare', () => {
    it('transforms market share data', () => {
      const data = [
        { company: 'Company A', share: 30 },
        { company: 'Company B', share: 45 },
        { company: 'Company C', share: 25 },
      ];

      const result = CommonTransformers.marketShare(data);

      expect(result).toEqual([
        { name: 'Company A', value: 30 },
        { name: 'Company B', value: 45 },
        { name: 'Company C', value: 25 },
      ]);
    });
  });
});