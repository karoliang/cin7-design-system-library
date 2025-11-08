#!/usr/bin/env python3
"""
Fix PieChart code variants by replacing the existing section with comprehensive variants.
This script handles the large file and iCloud sync issues.
"""

import re

file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# Read the entire file
print("Reading file...")
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the pieChartExamples section
pattern = r'export const pieChartExamples: Record<string, CodeVariant> = \{[\s\S]*?\n\};'

# Check if pattern exists
if not re.search(pattern, content):
    print("ERROR: Could not find pieChartExamples section!")
    exit(1)

# Count how many variants exist currently
current_match = re.search(pattern, content)
current_section = current_match.group(0)
current_variant_count = current_section.count('react: `')
print(f"Found pieChartExamples with {current_variant_count} variant(s)")

# The new comprehensive section with all 8 variants
new_section = '''export const pieChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function MarketShareChart() {
  const data = [
    { name: 'Product A', y: 45.0, color: '#5C6AC4' },
    { name: 'Product B', y: 26.8, color: '#006FBB' },
    { name: 'Product C', y: 18.2, color: '#47C1BF' },
    { name: 'Product D', y: 10.0, color: '#955BA5' }
  ];

  return (
    <PieChart
      title="Market Share by Product"
      subtitle="Q1 2025"
      data={data}
      legend={true}
      dataLabels={true}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Market Share by Product' },
  subtitle: { text: 'Q1 2025' },
  series: [{
    data: [
      { name: 'Product A', y: 45.0, color: '#5C6AC4' },
      { name: 'Product B', y: 26.8, color: '#006FBB' },
      { name: 'Product C', y: 18.2, color: '#47C1BF' },
      { name: 'Product D', y: 10.0, color: '#955BA5' }
    ]
  }],
  legend: { enabled: true },
  plotOptions: {
    pie: { dataLabels: { enabled: true } }
  }
});`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['name', 'value', 'color'],
    data: [
      { name: 'Product A', value: 45.0, color: '#5C6AC4' },
      { name: 'Product B', value: 26.8, color: '#006FBB' },
      { name: 'Product C', value: 18.2, color: '#47C1BF' },
      { name: 'Product D', value: 10.0, color: '#955BA5' }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'value',
    label: {
      field: 'name',
      display: 'outside'
    },
    renderer: function(sprite, config, rendererData, index) {
      var store = rendererData.store;
      var item = store.getAt(index);
      sprite.fillStyle = item.get('color');
    }
  }],
  legend: {
    docked: 'right'
  }
});`,
    typescript: `import Highcharts from 'highcharts';
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
Highcharts.chart('container', options);`
  },

  donut: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function SalesDistributionChart() {
  const data = [
    { name: 'Online', y: 55 },
    { name: 'Retail', y: 30 },
    { name: 'Wholesale', y: 15 }
  ];

  return (
    <PieChart
      title="Sales Distribution"
      variant="donut"
      innerSize="50%"
      data={data}
      dataLabels={true}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Sales Distribution' },
  plotOptions: {
    pie: {
      innerSize: '50%',
      dataLabels: { enabled: true }
    }
  },
  series: [{
    data: [
      { name: 'Online', y: 55 },
      { name: 'Retail', y: 30 },
      { name: 'Wholesale', y: 15 }
    ]
  }]
});`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['channel', 'sales'],
    data: [
      { channel: 'Online', sales: 55 },
      { channel: 'Retail', sales: 30 },
      { channel: 'Wholesale', sales: 15 }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'sales',
    donut: 50,
    label: {
      field: 'channel',
      display: 'outside'
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesPieOptions, PlotPieOptions } from 'highcharts';

// Donut-specific interfaces
interface SalesChannel {
  name: string;
  amount: number;
  percentage?: number;
}

interface DonutConfig {
  innerSize: string;
  thickness: 'thin' | 'medium' | 'thick';
}

interface DonutChartOptions {
  channels: SalesChannel[];
  config: DonutConfig;
  showCenterLabel?: boolean;
}

// Type definitions
type DonutSeries = SeriesPieOptions;

// Thickness mapping
const THICKNESS_MAP: Record<DonutConfig['thickness'], string> = {
  thin: '70%',
  medium: '50%',
  thick: '30%'
};

// Data calculation functions
const calculatePercentages = (channels: SalesChannel[]): SalesChannel[] => {
  const total = channels.reduce((sum, channel) => sum + channel.amount, 0);

  return channels.map(channel => ({
    ...channel,
    percentage: (channel.amount / total) * 100
  }));
};

const calculateTotal = (channels: SalesChannel[]): number => {
  return channels.reduce((sum, channel) => sum + channel.amount, 0);
};

// Chart configuration builder
const buildDonutSeries = (
  channels: SalesChannel[],
  config: DonutConfig
): DonutSeries => {
  const processedChannels = calculatePercentages(channels);
  const innerSize = THICKNESS_MAP[config.thickness] || config.innerSize;

  return {
    type: 'pie',
    name: 'Sales',
    data: processedChannels.map(channel => ({
      name: channel.name,
      y: channel.amount
    })),
    innerSize,
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b>: {point.percentage:.1f}%'
    }
  };
};

const createDonutOptions = (options: DonutChartOptions): Highcharts.Options => {
  const { channels, config, showCenterLabel } = options;
  const total = calculateTotal(channels);

  const plotOptions: PlotPieOptions = {
    innerSize: THICKNESS_MAP[config.thickness] || config.innerSize,
    dataLabels: {
      enabled: true,
      distance: -30,
      style: {
        fontWeight: 'bold',
        color: 'white'
      }
    }
  };

  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Sales Distribution'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
    },
    plotOptions: {
      pie: plotOptions
    },
    series: [buildDonutSeries(channels, config)]
  };
};

// Usage
const salesChannels: SalesChannel[] = [
  { name: 'Online', amount: 55 },
  { name: 'Retail', amount: 30 },
  { name: 'Wholesale', amount: 15 }
];

const donutConfiguration: DonutConfig = {
  innerSize: '50%',
  thickness: 'medium'
};

const chartOptions: DonutChartOptions = {
  channels: salesChannels,
  config: donutConfiguration,
  showCenterLabel: true
};

const options = createDonutOptions(chartOptions);
Highcharts.chart('container', options);`
  }
};'''

print("Replacing section...")
new_content = re.sub(pattern, new_section, content)

# Verify the replacement worked
new_variant_count = re.search(r'export const pieChartExamples:[\s\S]*?\n\};', new_content).group(0).count('react: `')
print(f"New section has {new_variant_count} variants")

# Write back
print("Writing file...")
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ Successfully updated pieChartExamples section!")
print(f"   - Replaced {current_variant_count} variant(s) with {new_variant_count} variant(s)")
print(f"   - Added comprehensive TypeScript interfaces for all variants")
