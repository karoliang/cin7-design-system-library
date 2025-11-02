/**
 * Data transformation utilities for converting business data to chart formats
 */

import * as Highcharts from 'highcharts';

/**
 * Generic data point interface
 */
export interface DataPoint {
  [key: string]: any;
}

/**
 * Time series data point
 */
export interface TimeSeriesPoint {
  timestamp: number | Date | string;
  value: number;
  [key: string]: any;
}

/**
 * Category data point
 */
export interface CategoryPoint {
  category: string;
  value: number;
  [key: string]: any;
}

/**
 * Transform array of objects to Highcharts series data
 */
export class DataTransformers {
  /**
   * Transform time series data to Highcharts format
   */
  static transformTimeSeries(
    data: TimeSeriesPoint[],
    valueKey: string = 'value',
    timestampKey: string = 'timestamp'
  ): Array<[number, number]> {
    return data.map((point) => {
      const timestamp =
        point[timestampKey] instanceof Date
          ? (point[timestampKey] as Date).getTime()
          : typeof point[timestampKey] === 'string'
          ? new Date(point[timestampKey]).getTime()
          : (point[timestampKey] as number);

      return [timestamp, point[valueKey]];
    });
  }

  /**
   * Transform category data to Highcharts format
   */
  static transformCategoryData(
    data: CategoryPoint[],
    valueKey: string = 'value'
  ): {
    categories: string[];
    values: number[];
  } {
    return {
      categories: data.map((point) => point.category),
      values: data.map((point) => point[valueKey]),
    };
  }

  /**
   * Transform data for pie chart
   */
  static transformPieData(
    data: DataPoint[],
    nameKey: string = 'name',
    valueKey: string = 'value'
  ): Highcharts.PointOptionsObject[] {
    return data.map((point) => ({
      name: point[nameKey],
      y: point[valueKey],
      ...point,
    }));
  }

  /**
   * Group data by a field
   */
  static groupBy<T extends DataPoint>(
    data: T[],
    groupKey: string
  ): Record<string, T[]> {
    return data.reduce((groups, item) => {
      const key = String(item[groupKey]);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }

  /**
   * Aggregate data by sum
   */
  static sumBy<T extends DataPoint>(
    data: T[],
    groupKey: string,
    valueKey: string
  ): CategoryPoint[] {
    const grouped = this.groupBy(data, groupKey);
    return Object.entries(grouped).map(([category, items]) => ({
      category,
      value: items.reduce((sum, item) => sum + (item[valueKey] || 0), 0),
    }));
  }

  /**
   * Aggregate data by average
   */
  static averageBy<T extends DataPoint>(
    data: T[],
    groupKey: string,
    valueKey: string
  ): CategoryPoint[] {
    const grouped = this.groupBy(data, groupKey);
    return Object.entries(grouped).map(([category, items]) => ({
      category,
      value:
        items.reduce((sum, item) => sum + (item[valueKey] || 0), 0) /
        (items.length || 1),
    }));
  }

  /**
   * Aggregate data by count
   */
  static countBy<T extends DataPoint>(
    data: T[],
    groupKey: string
  ): CategoryPoint[] {
    const grouped = this.groupBy(data, groupKey);
    return Object.entries(grouped).map(([category, items]) => ({
      category,
      value: items.length,
    }));
  }

  /**
   * Sort data by a field
   */
  static sortBy<T extends DataPoint>(
    data: T[],
    sortKey: string,
    order: 'asc' | 'desc' = 'asc'
  ): T[] {
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;

      const comparison = aVal > bVal ? 1 : -1;
      return order === 'asc' ? comparison : -comparison;
    });
  }

  /**
   * Filter data by a condition
   */
  static filterBy<T extends DataPoint>(
    data: T[],
    predicate: (item: T) => boolean
  ): T[] {
    return data.filter(predicate);
  }

  /**
   * Transform multiple series data for stacked charts
   */
  static transformMultipleSeries<T extends DataPoint>(
    data: T[],
    seriesKey: string,
    categoryKey: string,
    valueKey: string
  ): {
    categories: string[];
    series: Array<{ name: string; data: number[] }>;
  } {
    const grouped = this.groupBy(data, seriesKey);
    const allCategories = new Set<string>();

    // Collect all unique categories
    data.forEach((item) => {
      allCategories.add(String(item[categoryKey]));
    });

    const categories = Array.from(allCategories).sort();

    // Build series data
    const series = Object.entries(grouped).map(([seriesName, items]) => {
      const valueMap = new Map(
        items.map((item) => [String(item[categoryKey]), item[valueKey]])
      );

      return {
        name: seriesName,
        data: categories.map((cat) => valueMap.get(cat) || 0),
      };
    });

    return { categories, series };
  }

  /**
   * Calculate percentage distribution
   */
  static calculatePercentage<T extends DataPoint>(
    data: T[],
    valueKey: string
  ): Array<T & { percentage: number }> {
    const total = data.reduce((sum, item) => sum + (item[valueKey] || 0), 0);

    return data.map((item) => ({
      ...item,
      percentage: total > 0 ? (item[valueKey] / total) * 100 : 0,
    }));
  }

  /**
   * Fill missing time series data points
   */
  static fillTimeGaps(
    data: Array<[number, number]>,
    interval: number,
    fillValue: number = 0
  ): Array<[number, number]> {
    if (data.length === 0) return [];

    const result: Array<[number, number]> = [];
    const sorted = [...data].sort((a, b) => a[0] - b[0]);

    let current = sorted[0][0];
    const end = sorted[sorted.length - 1][0];
    let dataIndex = 0;

    while (current <= end) {
      if (dataIndex < sorted.length && sorted[dataIndex][0] === current) {
        result.push(sorted[dataIndex]);
        dataIndex++;
      } else {
        result.push([current, fillValue]);
      }
      current += interval;
    }

    return result;
  }

  /**
   * Apply moving average smoothing
   */
  static movingAverage(
    data: number[],
    windowSize: number
  ): number[] {
    if (data.length < windowSize) {
      return data;
    }

    const result: number[] = [];

    for (let i = 0; i < data.length; i++) {
      if (i < windowSize - 1) {
        result.push(data[i]);
      } else {
        const window = data.slice(i - windowSize + 1, i + 1);
        const average = window.reduce((sum, val) => sum + val, 0) / windowSize;
        result.push(average);
      }
    }

    return result;
  }
}

/**
 * Pre-defined transformers for common use cases
 */
export const CommonTransformers = {
  /**
   * Transform sales data by period
   */
  salesByPeriod(
    salesData: Array<{ date: Date | string; amount: number }>,
    _period: 'day' | 'week' | 'month' = 'day'
  ) {
    // Implementation for sales transformation
    return DataTransformers.transformTimeSeries(
      salesData.map((sale) => ({
        timestamp: sale.date,
        value: sale.amount,
      }))
    );
  },

  /**
   * Transform product performance data
   */
  productPerformance(
    products: Array<{ name: string; sales: number; revenue: number }>
  ) {
    return {
      categories: products.map((p) => p.name),
      sales: products.map((p) => p.sales),
      revenue: products.map((p) => p.revenue),
    };
  },

  /**
   * Transform market share data for pie chart
   */
  marketShare(
    data: Array<{ company: string; share: number }>
  ): Highcharts.PointOptionsObject[] {
    return DataTransformers.transformPieData(data, 'company', 'share');
  },
};
