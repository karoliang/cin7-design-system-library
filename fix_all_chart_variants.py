#!/usr/bin/env python3
"""
Fix React vs TypeScript code duplication across all 12 chart component variants.
React: Simple, straightforward examples focused on basic usage
TypeScript: Comprehensive type-safe patterns with interfaces, generics, and data transformations
"""

import os
import sys

FILE_PATH = "storybook/.storybook/blocks/codeVariants.ts"

def read_file():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(content):
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

def fix_area_default(content):
    """AreaChart default variant - simpler React, comprehensive TypeScript"""

    old_react = """    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

function MonthlyRevenue() {
  return (
    <AreaChart
      title="Monthly Revenue Trend"
      subtitle="2025"
      series={[
        {
          name: 'Revenue',
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        },
      ]}
      xAxis={{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }}
      yAxis={{
        title: { text: 'Revenue ($K)' },
      }}
      height={400}
    />
  );
}

export default MonthlyRevenue;`,"""

    new_react = """    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

function MonthlyRevenue() {
  const data = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];

  return (
    <AreaChart
      title="Monthly Revenue Trend"
      subtitle="2025"
      series={[{ name: 'Revenue', data }]}
      xAxis={{ categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }}
      yAxis={{ title: { text: 'Revenue ($K)' } }}
      height={400}
    />
  );
}

export default MonthlyRevenue;`,"""

    old_ts = """    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';

interface RevenueData {
  month: string;
  value: number;
}

interface MonthlyRevenueProps {
  data?: number[];
  year?: string;
  height?: number;
}

const MonthlyRevenue: React.FC<MonthlyRevenueProps> = ({
  data = [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
  year = '2025',
  height = 400
}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <AreaChart
      title="Monthly Revenue Trend"
      subtitle={year}
      series={[
        {
          name: 'Revenue',
          data: data,
        },
      ]}
      xAxis={{
        categories: months,
      }}
      yAxis={{
        title: { text: 'Revenue ($K)' },
      }}
      height={height}
    />
  );
};

export default MonthlyRevenue;`,"""

    new_ts = """    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';
import type { SeriesAreaOptions } from 'highcharts';

interface ChartDataPoint {
  value: number;
  timestamp: Date;
  category?: string;
}

interface MonthlyRevenueData {
  monthly: ChartDataPoint[];
  metadata: {
    year: string;
    currency: string;
    unit: string;
  };
}

interface MonthlyRevenueProps {
  rawData?: MonthlyRevenueData;
  height?: number;
  enableAnimation?: boolean;
}

type ChartSeries = SeriesAreaOptions[];

const MonthlyRevenue: React.FC<MonthlyRevenueProps> = ({
  rawData,
  height = 400,
  enableAnimation = true
}) => {
  const defaultData: MonthlyRevenueData = {
    monthly: [
      { value: 29.9, timestamp: new Date('2025-01-01') },
      { value: 71.5, timestamp: new Date('2025-02-01') },
      { value: 106.4, timestamp: new Date('2025-03-01') },
      { value: 129.2, timestamp: new Date('2025-04-01') },
      { value: 144.0, timestamp: new Date('2025-05-01') },
      { value: 176.0, timestamp: new Date('2025-06-01') },
      { value: 135.6, timestamp: new Date('2025-07-01') },
      { value: 148.5, timestamp: new Date('2025-08-01') },
      { value: 216.4, timestamp: new Date('2025-09-01') },
      { value: 194.1, timestamp: new Date('2025-10-01') },
      { value: 95.6, timestamp: new Date('2025-11-01') },
      { value: 54.4, timestamp: new Date('2025-12-01') }
    ],
    metadata: { year: '2025', currency: 'USD', unit: 'K' }
  };

  const data = rawData || defaultData;

  const transformToChartData = (points: ChartDataPoint[]): number[] => {
    return points.map(point => point.value);
  };

  const generateCategories = (points: ChartDataPoint[]): string[] => {
    return points.map(point =>
      point.timestamp.toLocaleDateString('en-US', { month: 'short' })
    );
  };

  const series: ChartSeries = [{
    name: 'Revenue',
    data: transformToChartData(data.monthly),
    type: 'area',
    tooltip: {
      valueSuffix: \` \${data.metadata.currency}\`
    }
  }];

  const categories = generateCategories(data.monthly);

  return (
    <AreaChart
      title="Monthly Revenue Trend"
      subtitle={data.metadata.year}
      series={series}
      xAxis={{ categories }}
      yAxis={{
        title: {
          text: \`Revenue (\${data.metadata.currency} \${data.metadata.unit})\`
        }
      }}
      height={height}
      plotOptions={{
        area: {
          animation: enableAnimation,
          fillOpacity: 0.5
        }
      }}
    />
  );
};

export default MonthlyRevenue;`,"""

    content = content.replace(old_react, new_react, 1)
    content = content.replace(old_ts, new_ts, 1)
    return content

def fix_area_stacked(content):
    """AreaChart stacked variant"""

    old_react = """    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

function StackedSales() {
  return (
    <AreaChart
      title="Sales by Product Line"
      subtitle="Cumulative Revenue"
      stacking="normal"
      series={[
        {
          name: 'Electronics',
          data: [50, 60, 70, 80, 90, 100, 110, 120],
        },
        {
          name: 'Clothing',
          data: [40, 50, 55, 65, 70, 75, 85, 90],
        },
        {
          name: 'Food & Beverage',
          data: [30, 35, 40, 45, 50, 55, 60, 65],
        },
        {
          name: 'Home & Garden',
          data: [20, 25, 30, 35, 40, 45, 50, 55],
        },
      ]}
      xAxis={{
        categories: ['Q1 Week 1', 'Q1 Week 2', 'Q2 Week 1', 'Q2 Week 2', 'Q3 Week 1', 'Q3 Week 2', 'Q4 Week 1', 'Q4 Week 2'],
      }}
      yAxis={{
        title: { text: 'Total Revenue ($K)' },
      }}
      height={400}
    />
  );
}

export default StackedSales;`,"""

    new_react = """    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

function StackedSales() {
  const series = [
    { name: 'Electronics', data: [50, 60, 70, 80, 90, 100, 110, 120] },
    { name: 'Clothing', data: [40, 50, 55, 65, 70, 75, 85, 90] },
    { name: 'Food & Beverage', data: [30, 35, 40, 45, 50, 55, 60, 65] },
    { name: 'Home & Garden', data: [20, 25, 30, 35, 40, 45, 50, 55] }
  ];

  return (
    <AreaChart
      title="Sales by Product Line"
      subtitle="Cumulative Revenue"
      stacking="normal"
      series={series}
      xAxis={{ categories: ['Q1 W1', 'Q1 W2', 'Q2 W1', 'Q2 W2', 'Q3 W1', 'Q3 W2', 'Q4 W1', 'Q4 W2'] }}
      yAxis={{ title: { text: 'Total Revenue ($K)' } }}
      height={400}
    />
  );
}

export default StackedSales;`,"""

    content = content.replace(old_react, new_react, 1)
    return content

def main():
    print("Starting fix for all 12 chart variants...")
    print(f"File: {FILE_PATH}")

    # Read original file
    content = read_file()
    original_len = len(content)
    print(f"Original size: {original_len:,} bytes")

    # Apply all fixes
    print("\n1. Fixing AreaChart default variant...")
    content = fix_area_default(content)

    print("2. Fixing AreaChart stacked variant...")
    content = fix_area_stacked(content)

    # TODO: Add remaining 10 variants
    print("\nNOTE: This script currently fixes 2 of 12 variants.")
    print("Remaining 10 variants need to be added:")
    print("  - AreaChart: percentage, splinearea")
    print("  - ScatterChart: default, bubble, regression, multiple")
    print("  - WaterfallChart: default, profitloss, cashflow, productcomparison")

    # Write the modified content
    new_len = len(content)
    print(f"\nNew size: {new_len:,} bytes")
    print(f"Difference: {new_len - original_len:+,} bytes")

    write_file(content)
    print(f"\nFile updated successfully!")

if __name__ == '__main__':
    main()
