#!/usr/bin/env python3
"""
Script to fix TypeScript code duplication in codeVariants.ts
"""

import re

# Read the file
file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

with open(file_path, 'r') as f:
    content = f.read()

# Fix 1: AreaChart 'stacked' variant TypeScript
stacked_old = r'''    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';

interface ProductLineSeries {
  name: string;
  data: number\[\];
}

interface StackedSalesProps {
  series\?: ProductLineSeries\[\];
  categories\?: string\[\];
  height\?: number;
}

const StackedSales: React\.FC<StackedSalesProps> = \(\{
  series = \[
    \{ name: 'Electronics', data: \[50, 60, 70, 80, 90, 100, 110, 120\] \},
    \{ name: 'Clothing', data: \[40, 50, 55, 65, 70, 75, 85, 90\] \},
    \{ name: 'Food & Beverage', data: \[30, 35, 40, 45, 50, 55, 60, 65\] \},
    \{ name: 'Home & Garden', data: \[20, 25, 30, 35, 40, 45, 50, 55\] \},
  \],
  categories = \['Q1 Week 1', 'Q1 Week 2', 'Q2 Week 1', 'Q2 Week 2', 'Q3 Week 1', 'Q3 Week 2', 'Q4 Week 1', 'Q4 Week 2'\],
  height = 400
\}\) => \{
  return \(
    <AreaChart
      title="Sales by Product Line"
      subtitle="Cumulative Revenue"
      stacking="normal"
      series=\{series\}
      xAxis=\{\{
        categories: categories,
      \}\}
      yAxis=\{\{
        title: \{ text: 'Total Revenue \(\$K\)' \},
      \}\}
      height=\{height\}
    />
  \);
\};

export default StackedSales;`,
  \},
  percentage: \{'''

stacked_new = '''    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';
import type { SeriesAreaOptions, XAxisOptions, YAxisOptions, PlotAreaOptions } from 'highcharts';

type ProductCategory = 'Electronics' | 'Clothing' | 'Food & Beverage' | 'Home & Garden';
type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
type Week = 'W1' | 'W2';

interface WeeklyRevenueData {
  quarter: Quarter;
  week: Week;
  electronics: number;
  clothing: number;
  foodBeverage: number;
  homeGarden: number;
  timestamp: Date;
}

interface ProductLineSeries {
  category: ProductCategory;
  weeklyRevenue: number[];
  color?: string;
  fillOpacity?: number;
}

interface StackedSalesData {
  productLines: ProductLineSeries[];
  timeLabels: string[];
  metadata: {
    currency: string;
    unit: string;
    stackingMode: 'normal' | 'percent';
  };
}

interface StackedSalesProps {
  rawData?: StackedSalesData;
  height?: number;
  enableAnimation?: boolean;
  showDataLabels?: boolean;
}

type ChartSeries = SeriesAreaOptions[];

const StackedSales: React.FC<StackedSalesProps> = ({
  rawData,
  height = 400,
  enableAnimation = true,
  showDataLabels = false
}) => {
  const defaultData: StackedSalesData = {
    productLines: [
      { category: 'Electronics', weeklyRevenue: [50, 60, 70, 80, 90, 100, 110, 120], color: '#7CB5EC' },
      { category: 'Clothing', weeklyRevenue: [40, 50, 55, 65, 70, 75, 85, 90], color: '#434348' },
      { category: 'Food & Beverage', weeklyRevenue: [30, 35, 40, 45, 50, 55, 60, 65], color: '#90ED7D' },
      { category: 'Home & Garden', weeklyRevenue: [20, 25, 30, 35, 40, 45, 50, 55], color: '#F7A35C' }
    ],
    timeLabels: ['Q1 W1', 'Q1 W2', 'Q2 W1', 'Q2 W2', 'Q3 W1', 'Q3 W2', 'Q4 W1', 'Q4 W2'],
    metadata: {
      currency: 'USD',
      unit: 'K',
      stackingMode: 'normal'
    }
  };

  const data = rawData || defaultData;

  const calculateTotalRevenue = (weekIndex: number): number =>
    data.productLines.reduce((sum, line) => sum + line.weeklyRevenue[weekIndex], 0);

  const transformToSeries = (lines: ProductLineSeries[]): ChartSeries =>
    lines.map(line => ({
      name: line.category,
      data: line.weeklyRevenue,
      type: 'area',
      color: line.color,
      fillOpacity: line.fillOpacity || 0.7,
      tooltip: {
        valueSuffix: \` \${data.metadata.currency} \${data.metadata.unit}\`
      }
    }));

  const xAxisConfig: XAxisOptions = {
    categories: data.timeLabels,
    title: { text: 'Time Period' }
  };

  const yAxisConfig: YAxisOptions = {
    title: { text: \`Total Revenue (\${data.metadata.currency} \${data.metadata.unit})\` },
    reversedStacks: false
  };

  const plotOptions: PlotAreaOptions = {
    area: {
      stacking: data.metadata.stackingMode,
      animation: enableAnimation,
      marker: { enabled: false },
      dataLabels: {
        enabled: showDataLabels,
        format: '{point.y}'
      }
    }
  };

  const series = transformToSeries(data.productLines);

  return (
    <AreaChart
      title="Sales by Product Line"
      subtitle="Cumulative Revenue"
      stacking={data.metadata.stackingMode}
      series={series}
      xAxis={xAxisConfig}
      yAxis={yAxisConfig}
      height={height}
      plotOptions={plotOptions}
    />
  );
};

export default StackedSales;`,
  },
  percentage: {'''

# Apply the fix
content = re.sub(stacked_old, stacked_new, content, flags=re.DOTALL)

# Write back
with open(file_path, 'w') as f:
    f.write(content)

print("Fixed AreaChart 'stacked' variant")
