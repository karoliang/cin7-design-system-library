#!/usr/bin/env python3
"""
Rewrite the default PieChart variant TypeScript to be comprehensive
instead of just adding `: Highcharts.Options`.
"""

import re

file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# Read the file
print("Reading file...")
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the default variant's TypeScript section
# The pattern matches from "default: {" to the end of the typescript backtick
pattern = r"(pieChartExamples[^=]*=[^{]*\{\s*default:\s*\{[^}]*typescript:\s*`)(.*?)(`\s*\})"

def replacement(match):
    prefix = match.group(1)
    suffix = match.group(3)

    new_typescript = """import Highcharts from 'highcharts';
import type { SeriesPieOptions, PointOptionsObject } from 'highcharts';

// Data structure interfaces
interface PieSliceData {
  name: string;
  value: number;
  color?: string;
  description?: string;
}

interface ChartMetadata {
  title: string;
  subtitle?: string;
  period: string;
}

// Configuration interfaces
interface PieChartConfig {
  showLegend: boolean;
  showDataLabels: boolean;
  enableTooltips: boolean;
  height?: number;
}

interface TooltipConfig {
  pointFormat: string;
  valueSuffix: string;
}

// Type aliases for Highcharts types
type PiePoint = PointOptionsObject;
type PieSeries = SeriesPieOptions[];

// Data transformation functions
const transformToPiePoints = (data: PieSliceData[]): PiePoint[] => {
  return data.map(slice => ({
    name: slice.name,
    y: slice.value,
    color: slice.color || undefined
  }));
};

const createTooltipConfig = (suffix: string = ''): TooltipConfig => ({
  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  valueSuffix: suffix
});

// Chart options builder
const buildChartOptions = (
  data: PieSliceData[],
  metadata: ChartMetadata,
  config: PieChartConfig
): Highcharts.Options => {
  const series: PieSeries = [{
    type: 'pie',
    name: 'Market Share',
    data: transformToPiePoints(data),
    dataLabels: {
      enabled: config.showDataLabels,
      format: '<b>{point.name}</b>: {point.percentage:.1f}%'
    }
  }];

  return {
    chart: {
      type: 'pie',
      height: config.height || 400
    },
    title: {
      text: metadata.title
    },
    subtitle: {
      text: metadata.subtitle
    },
    tooltip: config.enableTooltips ? createTooltipConfig() : undefined,
    legend: {
      enabled: config.showLegend
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: config.showDataLabels
        },
        showInLegend: config.showLegend
      }
    },
    series
  };
};

// Usage
const marketData: PieSliceData[] = [
  { name: 'Product A', value: 45.0, color: '#5C6AC4', description: 'Leading product' },
  { name: 'Product B', value: 26.8, color: '#006FBB', description: 'Growing segment' },
  { name: 'Product C', value: 18.2, color: '#47C1BF', description: 'Niche market' },
  { name: 'Product D', value: 10.0, color: '#955BA5', description: 'New launch' }
];

const chartMetadata: ChartMetadata = {
  title: 'Market Share by Product',
  subtitle: 'Q1 2025',
  period: '2025-Q1'
};

const chartConfig: PieChartConfig = {
  showLegend: true,
  showDataLabels: true,
  enableTooltips: true,
  height: 400
};

const options = buildChartOptions(marketData, chartMetadata, chartConfig);
Highcharts.chart('container', options);"""

    return prefix + new_typescript + suffix

# Apply the replacement
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Check if replacement happened
if new_content == content:
    print("ERROR: Pattern not found or replacement failed!")
    print("Trying alternative approach...")

    # Try to find just the typescript section within default
    # Look for the specific simple typescript code
    simple_ts_pattern = r"(default:\s*\{[^}]*typescript:\s*`)import Highcharts from 'highcharts';\s*const options: Highcharts\.Options = \{[^`]*\};\s*Highcharts\.chart\('container', options\);(`)"

    if re.search(simple_ts_pattern, content, re.DOTALL):
        print("Found the simple TypeScript pattern!")
        new_typescript_full = """import Highcharts from 'highcharts';
import type { SeriesPieOptions, PointOptionsObject } from 'highcharts';

// Data structure interfaces
interface PieSliceData {
  name: string;
  value: number;
  color?: string;
  description?: string;
}

interface ChartMetadata {
  title: string;
  subtitle?: string;
  period: string;
}

// Configuration interfaces
interface PieChartConfig {
  showLegend: boolean;
  showDataLabels: boolean;
  enableTooltips: boolean;
  height?: number;
}

interface TooltipConfig {
  pointFormat: string;
  valueSuffix: string;
}

// Type aliases for Highcharts types
type PiePoint = PointOptionsObject;
type PieSeries = SeriesPieOptions[];

// Data transformation functions
const transformToPiePoints = (data: PieSliceData[]): PiePoint[] => {
  return data.map(slice => ({
    name: slice.name,
    y: slice.value,
    color: slice.color || undefined
  }));
};

const createTooltipConfig = (suffix: string = ''): TooltipConfig => ({
  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
  valueSuffix: suffix
});

// Chart options builder
const buildChartOptions = (
  data: PieSliceData[],
  metadata: ChartMetadata,
  config: PieChartConfig
): Highcharts.Options => {
  const series: PieSeries = [{
    type: 'pie',
    name: 'Market Share',
    data: transformToPiePoints(data),
    dataLabels: {
      enabled: config.showDataLabels,
      format: '<b>{point.name}</b>: {point.percentage:.1f}%'
    }
  }];

  return {
    chart: {
      type: 'pie',
      height: config.height || 400
    },
    title: {
      text: metadata.title
    },
    subtitle: {
      text: metadata.subtitle
    },
    tooltip: config.enableTooltips ? createTooltipConfig() : undefined,
    legend: {
      enabled: config.showLegend
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: config.showDataLabels
        },
        showInLegend: config.showLegend
      }
    },
    series
  };
};

// Usage
const marketData: PieSliceData[] = [
  { name: 'Product A', value: 45.0, color: '#5C6AC4', description: 'Leading product' },
  { name: 'Product B', value: 26.8, color: '#006FBB', description: 'Growing segment' },
  { name: 'Product C', value: 18.2, color: '#47C1BF', description: 'Niche market' },
  { name: 'Product D', value: 10.0, color: '#955BA5', description: 'New launch' }
];

const chartMetadata: ChartMetadata = {
  title: 'Market Share by Product',
  subtitle: 'Q1 2025',
  period: '2025-Q1'
};

const chartConfig: PieChartConfig = {
  showLegend: true,
  showDataLabels: true,
  enableTooltips: true,
  height: 400
};

const options = buildChartOptions(marketData, chartMetadata, chartConfig);
Highcharts.chart('container', options);"""

        new_content = re.sub(simple_ts_pattern, r"\1" + new_typescript_full + r"\2", content, flags=re.DOTALL)
    else:
        print("Could not find the pattern!")
        exit(1)

# Write the file
print("Writing file...")
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("\n✅ Successfully rewrote default variant TypeScript!")
print("   - Added PieSliceData, ChartMetadata interfaces")
print("   - Added PieChartConfig, TooltipConfig interfaces")
print("   - Added transformToPiePoints() function")
print("   - Added buildChartOptions() builder pattern")
print("   - ~100 lines vs original ~5 lines")
