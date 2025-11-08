#!/usr/bin/env python3
"""
Script to fix AreaChart and WaterfallChart TypeScript variants
"""

import re

def main():
    file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix 1: AreaChart percentage variant
    old_percentage_ts = r'''    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';

interface MarketShareData \{
  name: string;
  data: number\[\];
\}

interface MarketShareChartProps \{
  products\?: MarketShareData\[\];
  years\?: string\[\];
  height\?: number;
\}

const MarketShareChart: React\.FC<MarketShareChartProps> = \(\{
  products = \[
    \{ name: 'Product A', data: \[50, 55, 58, 60, 62, 65\] \},
    \{ name: 'Product B', data: \[30, 28, 27, 25, 24, 22\] \},
    \{ name: 'Product C', data: \[20, 17, 15, 15, 14, 13\] \},
  \],
  years = \['2020', '2021', '2022', '2023', '2024', '2025'\],
  height = 400
\}\) => \{
  return \(
    <AreaChart
      title="Market Share Distribution"
      subtitle="Year over Year"
      stacking="percent"
      series=\{products\}
      xAxis=\{\{
        categories: years,
      \}\}
      yAxis=\{\{
        title: \{ text: 'Market Share \(%\)' \},
      \}\}
      tooltip=\{\{
        pointFormat: '<span style="color:\{series\.color\}"\>\{series\.name\}</span>: <b>\{point\.percentage:\.1f\}%</b> \(\{point\.y\}K\)<br/>',
        shared: true,
      \}\}
      height=\{height\}
    />
  \);
\};

export default MarketShareChart;`,
  \},
  splinearea: \{'''

    new_percentage_ts = '''    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';
import type { SeriesAreaOptions, TooltipOptions } from 'highcharts';

interface PercentageDataPoint {
  year: string;
  value: number;
  rawUnits: number;
}

interface MarketShareData {
  product: string;
  dataPoints: PercentageDataPoint[];
  category: 'electronics' | 'clothing' | 'food' | 'other';
}

interface PercentageChartConfig {
  enablePercentageDisplay: boolean;
  showRawValues: boolean;
  decimalPrecision: number;
}

interface MarketShareMetadata {
  unit: 'K' | 'M' | 'B';
  currency: string;
  fiscalYear: string;
}

interface MarketShareChartProps {
  rawData?: MarketShareData[];
  years?: string[];
  config?: PercentageChartConfig;
  metadata?: MarketShareMetadata;
  height?: number;
}

const MarketShareChart: React.FC<MarketShareChartProps> = ({
  rawData,
  years = ['2020', '2021', '2022', '2023', '2024', '2025'],
  config = {
    enablePercentageDisplay: true,
    showRawValues: true,
    decimalPrecision: 1
  },
  metadata = { unit: 'K', currency: 'USD', fiscalYear: '2025' },
  height = 400
}) => {
  const defaultData: MarketShareData[] = [
    {
      product: 'Product A',
      category: 'electronics',
      dataPoints: years.map((year, i) => ({
        year,
        value: [50, 55, 58, 60, 62, 65][i],
        rawUnits: [50000, 55000, 58000, 60000, 62000, 65000][i]
      }))
    },
    {
      product: 'Product B',
      category: 'clothing',
      dataPoints: years.map((year, i) => ({
        year,
        value: [30, 28, 27, 25, 24, 22][i],
        rawUnits: [30000, 28000, 27000, 25000, 24000, 22000][i]
      }))
    },
    {
      product: 'Product C',
      category: 'food',
      dataPoints: years.map((year, i) => ({
        year,
        value: [20, 17, 15, 15, 14, 13][i],
        rawUnits: [20000, 17000, 15000, 15000, 14000, 13000][i]
      }))
    }
  ];

  const data = rawData || defaultData;

  const calculatePercentage = (
    value: number,
    total: number,
    precision: number = config.decimalPrecision
  ): number => {
    return parseFloat(((value / total) * 100).toFixed(precision));
  };

  const transformToChartSeries = (marketData: MarketShareData[]): SeriesAreaOptions[] => {
    return marketData.map(product => ({
      name: product.product,
      data: product.dataPoints.map(point => point.value),
      type: 'area' as const,
      tooltip: {
        valueSuffix: metadata.unit
      }
    }));
  };

  const generateTooltipFormatter = (): TooltipOptions => ({
    pointFormat: config.showRawValues
      ? '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y}' + metadata.unit + ')<br/>'
      : '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b><br/>',
    shared: true
  });

  const series = transformToChartSeries(data);
  const tooltipConfig = generateTooltipFormatter();

  return (
    <AreaChart
      title="Market Share Distribution"
      subtitle={\`Year over Year - FY \${metadata.fiscalYear}\`}
      stacking="percent"
      series={series}
      xAxis={{ categories: years }}
      yAxis={{ title: { text: 'Market Share (%)' } }}
      tooltip={tooltipConfig}
      height={height}
      plotOptions={{
        area: {
          stacking: 'percent',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            enabled: false,
            states: {
              hover: { enabled: true, radius: 5 }
            }
          }
        }
      }}
    />
  );
};

export default MarketShareChart;`,
  },
  splinearea: {'''

    # Apply fix
    content = re.sub(old_percentage_ts, new_percentage_ts, content, count=1, flags=re.MULTILINE | re.DOTALL)

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Fixed AreaChart percentage variant")

if __name__ == '__main__':
    main()
