#!/usr/bin/env python3
"""
Fix React vs TypeScript code duplication in chart components.
Makes React simpler and TypeScript more comprehensive with type-safe patterns.
"""

import re

# File to modify
FILE_PATH = "storybook/.storybook/blocks/codeVariants.ts"

# AreaChart default variant
AREA_DEFAULT_REACT = """  default: {
    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

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

AREA_DEFAULT_TS = """    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
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

export default MonthlyRevenue;`,
  },"""

def main():
    print("Reading file...")
    with open(FILE_PATH, 'r') as f:
        content = f.read()

    original_length = len(content)
    print(f"Original file length: {original_length:,} characters")

    # Find and replace AreaChart default
    pattern = r"(// AreaChart Component Examples\nexport const areaChartExamples: Record<string, CodeVariant> = \{\n  default: \{\n    react: `[^`]+`),(\n    vanilla:)"

    match = re.search(pattern, content, re.MULTILINE | re.DOTALL)
    if match:
        print("Found AreaChart default pattern")
        print(f"Match starts at: {match.start()}")
        print(f"Match ends at: {match.end()}")
    else:
        print("WARNING: Could not find AreaChart default pattern")
        print("\nSearching for AreaChart Component Examples...")
        area_match = re.search(r"// AreaChart Component Examples", content)
        if area_match:
            print(f"Found at position: {area_match.start()}")
            # Show context
            start = area_match.start()
            print("\nContext (next 500 chars):")
            print(content[start:start+500])

    print("\nDone (dry run - no changes made)")
    print("Would need to implement actual replacements for all 12 variants")

if __name__ == '__main__':
    main()
