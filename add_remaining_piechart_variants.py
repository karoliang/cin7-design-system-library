#!/usr/bin/env python3
"""
Add the remaining 7 PieChart variants to codeVariants.ts
Also rewrites the default variant TypeScript to be comprehensive.
"""

import re

file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# Read the file
print("Reading file...")
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line number where pieChartExamples ends
print("Finding pieChartExamples section...")
in_pie_section = False
pie_end_line = None

for i, line in enumerate(lines):
    if 'export const pieChartExamples' in line:
        in_pie_section = True
        pie_start_line = i
        print(f"Found pieChartExamples starting at line {i+1}")
    elif in_pie_section and line.strip() == '};':
        pie_end_line = i
        print(f"Found pieChartExamples ending at line {i+1}")
        break

if pie_end_line is None:
    print("ERROR: Could not find end of pieChartExamples!")
    exit(1)

# Check what's on the next line
next_section_line = lines[pie_end_line + 1] if pie_end_line + 1 < len(lines) else ""
print(f"Next section starts with: {next_section_line.strip()[:50]}...")

# The 7 new variants to add (we'll add them before the closing };)
new_variants = '''
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
  },

  semicircle: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function GoalProgressChart() {
  const data = [
    { name: 'Achieved', y: 75 },
    { name: 'Remaining', y: 25 }
  ];

  return (
    <PieChart
      title="Goal Progress"
      variant="semi-circle"
      data={data}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Goal Progress' },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      center: ['50%', '75%'],
      size: '110%'
    }
  },
  series: [{
    data: [
      { name: 'Achieved', y: 75 },
      { name: 'Remaining', y: 25 }
    ]
  }]
});`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['status', 'value'],
    data: [
      { status: 'Achieved', value: 75 },
      { status: 'Remaining', value: 25 }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'value',
    totalAngle: Math.PI,
    rotation: -Math.PI / 2,
    label: {
      field: 'status',
      display: 'outside'
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesPieOptions, PlotPieOptions } from 'highcharts';

// Semi-circle specific interfaces
interface GoalData {
  achieved: number;
  target: number;
}

interface ProgressMetrics {
  completed: number;
  remaining: number;
  percentage: number;
}

interface SemiCircleConfig {
  startAngle: number;
  endAngle: number;
  centerPosition: [string, string];
  size: string;
}

interface ProgressChartOptions {
  goal: GoalData;
  config?: Partial<SemiCircleConfig>;
  colors?: {
    achieved: string;
    remaining: string;
  };
}

// Default configuration
const DEFAULT_SEMICIRCLE_CONFIG: SemiCircleConfig = {
  startAngle: -90,
  endAngle: 90,
  centerPosition: ['50%', '75%'],
  size: '110%'
};

// Calculation functions
const calculateProgress = (goal: GoalData): ProgressMetrics => {
  const completed = Math.min(goal.achieved, goal.target);
  const remaining = Math.max(goal.target - goal.achieved, 0);
  const percentage = (completed / goal.target) * 100;

  return {
    completed,
    remaining,
    percentage
  };
};

const formatProgressLabel = (metrics: ProgressMetrics): string => {
  return \`\${metrics.percentage.toFixed(1)}% Complete\`;
};

// Series builder
const buildSemiCircleSeries = (
  metrics: ProgressMetrics,
  colors?: ProgressChartOptions['colors']
): SeriesPieOptions => {
  return {
    type: 'pie',
    name: 'Progress',
    data: [
      {
        name: 'Achieved',
        y: metrics.completed,
        color: colors?.achieved || '#108043'
      },
      {
        name: 'Remaining',
        y: metrics.remaining,
        color: colors?.remaining || '#E4E5E7'
      }
    ],
    dataLabels: {
      enabled: true,
      format: '{point.name}: {point.percentage:.1f}%'
    }
  };
};

// Options builder
const createSemiCircleOptions = (
  options: ProgressChartOptions
): Highcharts.Options => {
  const metrics = calculateProgress(options.goal);
  const config = { ...DEFAULT_SEMICIRCLE_CONFIG, ...options.config };

  const plotOptions: PlotPieOptions = {
    startAngle: config.startAngle,
    endAngle: config.endAngle,
    center: config.centerPosition,
    size: config.size,
    dataLabels: {
      enabled: true
    }
  };

  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Goal Progress',
      align: 'center',
      verticalAlign: 'middle',
      y: 80
    },
    subtitle: {
      text: formatProgressLabel(metrics),
      align: 'center',
      verticalAlign: 'middle',
      y: 100
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
    },
    plotOptions: {
      pie: plotOptions
    },
    series: [buildSemiCircleSeries(metrics, options.colors)]
  };
};

// Usage
const goalData: GoalData = {
  achieved: 75,
  target: 100
};

const progressOptions: ProgressChartOptions = {
  goal: goalData,
  config: {
    size: '120%'
  },
  colors: {
    achieved: '#108043',
    remaining: '#E4E5E7'
  }
};

const options = createSemiCircleOptions(progressOptions);
Highcharts.chart('container', options);`
  },

  withcustomcolors: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function StatusDistributionChart() {
  const data = [
    { name: 'Success', y: 80, color: '#108043' },
    { name: 'Warning', y: 15, color: '#FFC453' },
    { name: 'Error', y: 5, color: '#DE3618' }
  ];

  return (
    <PieChart
      title="Status Distribution"
      data={data}
      legend={true}
      dataLabels={true}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Status Distribution' },
  series: [{
    data: [
      { name: 'Success', y: 80, color: '#108043' },
      { name: 'Warning', y: 15, color: '#FFC453' },
      { name: 'Error', y: 5, color: '#DE3618' }
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
    fields: ['status', 'count', 'color'],
    data: [
      { status: 'Success', count: 80, color: '#108043' },
      { status: 'Warning', count: 15, color: '#FFC453' },
      { status: 'Error', count: 5, color: '#DE3618' }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'count',
    label: {
      field: 'status',
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
import type { SeriesPieOptions, ColorString } from 'highcharts';

// Color palette interfaces
interface ColorPalette {
  success: ColorString;
  warning: ColorString;
  error: ColorString;
  info: ColorString;
  neutral: ColorString;
}

enum ColorScheme {
  POLARIS = 'polaris',
  SEMANTIC = 'semantic',
  CUSTOM = 'custom'
}

interface StatusData {
  status: 'success' | 'warning' | 'error' | 'info';
  count: number;
  label?: string;
}

interface ColorConfig {
  scheme: ColorScheme;
  customPalette?: Partial<ColorPalette>;
}

// Predefined color palettes
const COLOR_PALETTES: Record<ColorScheme, ColorPalette> = {
  [ColorScheme.POLARIS]: {
    success: '#108043',
    warning: '#FFC453',
    error: '#DE3618',
    info: '#5C6AC4',
    neutral: '#8C9196'
  },
  [ColorScheme.SEMANTIC]: {
    success: '#00875A',
    warning: '#FFAB00',
    error: '#DE350B',
    info: '#0052CC',
    neutral: '#6B778C'
  },
  [ColorScheme.CUSTOM]: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    neutral: '#6B7280'
  }
};

// Color mapping function
const getStatusColor = (
  status: StatusData['status'],
  config: ColorConfig
): ColorString => {
  const palette = {
    ...COLOR_PALETTES[config.scheme],
    ...config.customPalette
  };

  return palette[status];
};

// Data transformation
const transformStatusData = (
  data: StatusData[],
  config: ColorConfig
): Array<{ name: string; y: number; color: ColorString }> => {
  return data.map(item => ({
    name: item.label || item.status.charAt(0).toUpperCase() + item.status.slice(1),
    y: item.count,
    color: getStatusColor(item.status, config)
  }));
};

// Series builder
const buildColoredSeries = (
  data: StatusData[],
  config: ColorConfig
): SeriesPieOptions => {
  const transformedData = transformStatusData(data, config);

  return {
    type: 'pie',
    name: 'Status',
    data: transformedData,
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b>: {point.percentage:.1f}%',
      style: {
        textOutline: 'none'
      }
    }
  };
};

// Options builder
const createColoredChartOptions = (
  data: StatusData[],
  config: ColorConfig
): Highcharts.Options => {
  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Status Distribution'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true
        },
        showInLegend: true
      }
    },
    series: [buildColoredSeries(data, config)]
  };
};

// Usage
const statusData: StatusData[] = [
  { status: 'success', count: 80, label: 'Success' },
  { status: 'warning', count: 15, label: 'Warning' },
  { status: 'error', count: 5, label: 'Error' }
];

const colorConfig: ColorConfig = {
  scheme: ColorScheme.POLARIS,
  customPalette: {
    success: '#108043',
    warning: '#FFC453',
    error: '#DE3618'
  }
};

const options = createColoredChartOptions(statusData, colorConfig);
Highcharts.chart('container', options);`
  },

  legendonly: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function RegionalDistributionChart() {
  const data = [
    { name: 'North America', y: 45 },
    { name: 'Europe', y: 30 },
    { name: 'Asia Pacific', y: 25 }
  ];

  return (
    <PieChart
      title="Regional Distribution"
      data={data}
      dataLabels={false}
      legend={true}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Regional Distribution' },
  plotOptions: {
    pie: {
      dataLabels: { enabled: false },
      showInLegend: true
    }
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'middle',
    layout: 'vertical'
  },
  series: [{
    data: [
      { name: 'North America', y: 45 },
      { name: 'Europe', y: 30 },
      { name: 'Asia Pacific', y: 25 }
    ]
  }]
});`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['region', 'value'],
    data: [
      { region: 'North America', value: 45 },
      { region: 'Europe', value: 30 },
      { region: 'Asia Pacific', value: 25 }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'value',
    label: {
      display: 'none'
    }
  }],
  legend: {
    docked: 'right',
    itemSelector: '.x-legend-item'
  }
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesPieOptions, LegendOptions } from 'highcharts';

// Legend-specific interfaces
interface RegionData {
  region: string;
  value: number;
  code: string;
}

enum LegendPosition {
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
  TOP = 'top'
}

enum LegendLayout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

interface LegendConfig {
  position: LegendPosition;
  layout: LegendLayout;
  align: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'middle' | 'bottom';
  itemStyle?: Highcharts.CSSObject;
  symbolRadius?: number;
}

interface LegendOnlyChartOptions {
  data: RegionData[];
  legendConfig: LegendConfig;
  showDataLabels: boolean;
}

// Default legend configurations
const LEGEND_PRESETS: Record<string, LegendConfig> = {
  rightVertical: {
    position: LegendPosition.RIGHT,
    layout: LegendLayout.VERTICAL,
    align: 'right',
    verticalAlign: 'middle',
    itemStyle: {
      fontSize: '12px',
      fontWeight: 'normal'
    },
    symbolRadius: 6
  },
  bottomHorizontal: {
    position: LegendPosition.BOTTOM,
    layout: LegendLayout.HORIZONTAL,
    align: 'center',
    verticalAlign: 'bottom',
    itemStyle: {
      fontSize: '12px',
      fontWeight: 'normal'
    },
    symbolRadius: 6
  }
};

// Data transformation
const transformRegionData = (data: RegionData[]): Array<{ name: string; y: number }> => {
  return data.map(item => ({
    name: item.region,
    y: item.value
  }));
};

// Legend formatter
const createLegendFormatter = (): ((this: Highcharts.Point) => string) => {
  return function(this: Highcharts.Point): string {
    const percentage = ((this.y || 0) / (this.series.data.reduce((sum, point) => sum + (point.y || 0), 0)) * 100).toFixed(1);
    return \`\${this.name}: \${percentage}%\`;
  };
};

// Build legend options
const buildLegendOptions = (config: LegendConfig): LegendOptions => {
  return {
    enabled: true,
    align: config.align,
    verticalAlign: config.verticalAlign,
    layout: config.layout,
    itemStyle: config.itemStyle,
    symbolRadius: config.symbolRadius,
    labelFormatter: createLegendFormatter()
  };
};

// Series builder
const buildLegendSeries = (
  data: RegionData[],
  showDataLabels: boolean
): SeriesPieOptions => {
  return {
    type: 'pie',
    name: 'Distribution',
    data: transformRegionData(data),
    showInLegend: true,
    dataLabels: {
      enabled: showDataLabels,
      format: showDataLabels ? '<b>{point.name}</b>: {point.percentage:.1f}%' : undefined
    }
  };
};

// Options builder
const createLegendOnlyOptions = (
  options: LegendOnlyChartOptions
): Highcharts.Options => {
  const { data, legendConfig, showDataLabels } = options;

  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Regional Distribution'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
    },
    legend: buildLegendOptions(legendConfig),
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: showDataLabels
        },
        showInLegend: true
      }
    },
    series: [buildLegendSeries(data, showDataLabels)]
  };
};

// Usage
const regionalData: RegionData[] = [
  { region: 'North America', value: 45, code: 'NA' },
  { region: 'Europe', value: 30, code: 'EU' },
  { region: 'Asia Pacific', value: 25, code: 'APAC' }
];

const chartOptions: LegendOnlyChartOptions = {
  data: regionalData,
  legendConfig: LEGEND_PRESETS.rightVertical,
  showDataLabels: false
};

const options = createLegendOnlyOptions(chartOptions);
Highcharts.chart('container', options);`
  },

  withpercentages: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function DeviceBreakdownChart() {
  const data = [
    { name: 'Desktop', y: 60 },
    { name: 'Mobile', y: 30 },
    { name: 'Tablet', y: 10 }
  ];

  return (
    <PieChart
      title="Device Breakdown"
      data={data}
      dataLabels={true}
      tooltip={{
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      }}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Device Breakdown' },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f}%'
      }
    }
  },
  series: [{
    data: [
      { name: 'Desktop', y: 60 },
      { name: 'Mobile', y: 30 },
      { name: 'Tablet', y: 10 }
    ]
  }]
});`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['device', 'usage'],
    data: [
      { device: 'Desktop', usage: 60 },
      { device: 'Mobile', usage: 30 },
      { device: 'Tablet', usage: 10 }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'usage',
    label: {
      field: 'device',
      display: 'outside',
      renderer: function(text, sprite, config, rendererData, index) {
        var store = rendererData.store;
        var total = 0;
        store.each(function(record) {
          total += record.get('usage');
        });
        var percentage = (config.record.get('usage') / total * 100).toFixed(1);
        return text + ': ' + percentage + '%';
      }
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesPieOptions, TooltipOptions, DataLabelsOptions } from 'highcharts';

// Percentage formatting interfaces
interface DeviceData {
  device: string;
  users: number;
}

interface PercentageMetrics {
  value: number;
  percentage: number;
  formatted: string;
}

enum LabelFormat {
  PERCENTAGE_ONLY = 'percentage',
  VALUE_AND_PERCENTAGE = 'both',
  NAME_AND_PERCENTAGE = 'name_percentage'
}

interface PercentageConfig {
  decimalPlaces: number;
  showSymbol: boolean;
  format: LabelFormat;
}

// Type for formatter functions
type PercentageFormatter = (value: number, total: number) => string;

// Formatting functions
const formatPercentage = (
  value: number,
  total: number,
  config: PercentageConfig
): string => {
  const percentage = (value / total) * 100;
  const rounded = percentage.toFixed(config.decimalPlaces);
  return config.showSymbol ? \`\${rounded}%\` : rounded;
};

const createLabelFormatter = (
  format: LabelFormat,
  config: PercentageConfig
): string => {
  switch (format) {
    case LabelFormat.PERCENTAGE_ONLY:
      return \`{point.percentage:.\${config.decimalPlaces}f}%\`;
    case LabelFormat.VALUE_AND_PERCENTAGE:
      return \`<b>{point.y}</b><br/>{point.percentage:.\${config.decimalPlaces}f}%\`;
    case LabelFormat.NAME_AND_PERCENTAGE:
      return \`<b>{point.name}</b>: {point.percentage:.\${config.decimalPlaces}f}%\`;
    default:
      return \`{point.percentage:.\${config.decimalPlaces}f}%\`;
  }
};

// Calculate metrics
const calculateMetrics = (
  data: DeviceData[],
  config: PercentageConfig
): PercentageMetrics[] => {
  const total = data.reduce((sum, item) => sum + item.users, 0);

  return data.map(item => ({
    value: item.users,
    percentage: (item.users / total) * 100,
    formatted: formatPercentage(item.users, total, config)
  }));
};

// Build data labels options
const buildDataLabelsOptions = (config: PercentageConfig): DataLabelsOptions => {
  return {
    enabled: true,
    format: createLabelFormatter(config.format, config),
    style: {
      fontWeight: 'bold',
      fontSize: '11px'
    },
    distance: 15
  };
};

// Build tooltip options
const buildTooltipOptions = (config: PercentageConfig): TooltipOptions => {
  return {
    pointFormat: \`{series.name}: <b>{point.y}</b> ({point.percentage:.\${config.decimalPlaces}f}%)\`,
    valueSuffix: ' users'
  };
};

// Series builder
const buildPercentageSeries = (
  data: DeviceData[],
  config: PercentageConfig
): SeriesPieOptions => {
  return {
    type: 'pie',
    name: 'Device Usage',
    data: data.map(item => ({
      name: item.device,
      y: item.users
    })),
    dataLabels: buildDataLabelsOptions(config)
  };
};

// Options builder
const createPercentageChartOptions = (
  data: DeviceData[],
  config: PercentageConfig
): Highcharts.Options => {
  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Device Breakdown'
    },
    tooltip: buildTooltipOptions(config),
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: buildDataLabelsOptions(config)
      }
    },
    series: [buildPercentageSeries(data, config)]
  };
};

// Usage
const deviceData: DeviceData[] = [
  { device: 'Desktop', users: 60 },
  { device: 'Mobile', users: 30 },
  { device: 'Tablet', users: 10 }
];

const percentageConfig: PercentageConfig = {
  decimalPlaces: 1,
  showSymbol: true,
  format: LabelFormat.NAME_AND_PERCENTAGE
};

const options = createPercentageChartOptions(deviceData, percentageConfig);
Highcharts.chart('container', options);`
  },

  budgetallocation: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function BudgetAllocationChart() {
  const data = [
    { name: 'Marketing', y: 35 },
    { name: 'Development', y: 45 },
    { name: 'Operations', y: 20 }
  ];

  return (
    <PieChart
      title="Budget Allocation"
      data={data}
      legend={true}
      dataLabels={true}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Budget Allocation' },
  series: [{
    data: [
      { name: 'Marketing', y: 35 },
      { name: 'Development', y: 45 },
      { name: 'Operations', y: 20 }
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
    fields: ['department', 'budget'],
    data: [
      { department: 'Marketing', budget: 35 },
      { department: 'Development', budget: 45 },
      { department: 'Operations', budget: 20 }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'budget',
    label: {
      field: 'department',
      display: 'outside'
    }
  }],
  legend: {
    docked: 'right'
  }
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesPieOptions } from 'highcharts';

// Budget-specific interfaces
interface BudgetCategory {
  department: string;
  allocated: number;
  spent: number;
  currency: string;
}

interface BudgetSummary {
  totalAllocated: number;
  totalSpent: number;
  remaining: number;
  utilizationRate: number;
}

interface AllocationData {
  category: string;
  amount: number;
  percentage: number;
}

interface BudgetChartOptions {
  categories: BudgetCategory[];
  showUtilization?: boolean;
  currency?: string;
}

// Calculation functions
const calculateBudgetSummary = (categories: BudgetCategory[]): BudgetSummary => {
  const totalAllocated = categories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const utilizationRate = (totalSpent / totalAllocated) * 100;

  return {
    totalAllocated,
    totalSpent,
    remaining,
    utilizationRate
  };
};

const transformToAllocationData = (categories: BudgetCategory[]): AllocationData[] => {
  const total = categories.reduce((sum, cat) => sum + cat.allocated, 0);

  return categories.map(cat => ({
    category: cat.department,
    amount: cat.allocated,
    percentage: (cat.allocated / total) * 100
  }));
};

// Formatting functions
const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const createBudgetTooltip = (currency: string) => {
  return {
    pointFormatter: function(this: Highcharts.Point): string {
      const value = formatCurrency(this.y || 0, currency);
      const percentage = ((this.percentage || 0)).toFixed(1);
      return \`<b>\${this.name}</b><br/>
              Amount: \${value}<br/>
              Percentage: \${percentage}%\`;
    }
  };
};

// Series builder
const buildBudgetSeries = (
  data: AllocationData[],
  currency: string
): SeriesPieOptions => {
  return {
    type: 'pie',
    name: 'Budget',
    data: data.map(item => ({
      name: item.category,
      y: item.amount
    })),
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b><br/>{point.percentage:.1f}%',
      style: {
        fontWeight: 'bold',
        fontSize: '11px'
      }
    }
  };
};

// Options builder
const createBudgetChartOptions = (
  options: BudgetChartOptions
): Highcharts.Options => {
  const { categories, showUtilization = false, currency = 'USD' } = options;
  const allocationData = transformToAllocationData(categories);
  const summary = calculateBudgetSummary(categories);

  const subtitle = showUtilization
    ? \`Total: \${formatCurrency(summary.totalAllocated, currency)} | Utilization: \${summary.utilizationRate.toFixed(1)}%\`
    : \`Total: \${formatCurrency(summary.totalAllocated, currency)}\`;

  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Budget Allocation'
    },
    subtitle: {
      text: subtitle
    },
    tooltip: createBudgetTooltip(currency),
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true
        },
        showInLegend: true
      }
    },
    series: [buildBudgetSeries(allocationData, currency)]
  };
};

// Usage
const budgetCategories: BudgetCategory[] = [
  { department: 'Marketing', allocated: 350000, spent: 320000, currency: 'USD' },
  { department: 'Development', allocated: 450000, spent: 430000, currency: 'USD' },
  { department: 'Operations', allocated: 200000, spent: 180000, currency: 'USD' }
];

const chartOptions: BudgetChartOptions = {
  categories: budgetCategories,
  showUtilization: true,
  currency: 'USD'
};

const options = createBudgetChartOptions(chartOptions);
Highcharts.chart('container', options);`
  },

  taskcompletion: {
    react: `import { PieChart } from '@cin7/highcharts-adapter/react';

function TaskCompletionChart() {
  const data = [
    { name: 'Completed', y: 70, color: '#108043' },
    { name: 'In Progress', y: 20, color: '#FFC453' },
    { name: 'Pending', y: 10, color: '#5C6AC4' }
  ];

  return (
    <PieChart
      title="Task Status"
      variant="donut"
      innerSize="60%"
      data={data}
      legend={true}
      dataLabels={true}
      height={400}
    />
  );
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  title: { text: 'Task Status' },
  plotOptions: {
    pie: {
      innerSize: '60%',
      dataLabels: { enabled: true }
    }
  },
  series: [{
    data: [
      { name: 'Completed', y: 70, color: '#108043' },
      { name: 'In Progress', y: 20, color: '#FFC453' },
      { name: 'Pending', y: 10, color: '#5C6AC4' }
    ]
  }],
  legend: { enabled: true }
});`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['status', 'count', 'color'],
    data: [
      { status: 'Completed', count: 70, color: '#108043' },
      { status: 'In Progress', count: 20, color: '#FFC453' },
      { status: 'Pending', count: 10, color: '#5C6AC4' }
    ]
  }),
  series: [{
    type: 'pie',
    angleField: 'count',
    donut: 60,
    label: {
      field: 'status',
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
import type { SeriesPieOptions, ColorString } from 'highcharts';

// Task status interfaces
enum TaskStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PENDING = 'pending',
  BLOCKED = 'blocked'
}

interface Task {
  id: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignee?: string;
}

interface CompletionMetrics {
  total: number;
  completed: number;
  inProgress: number;
  pending: number;
  blocked: number;
  completionRate: number;
}

interface StatusCount {
  status: TaskStatus;
  count: number;
  percentage: number;
  color: ColorString;
}

interface TaskCompletionOptions {
  tasks: Task[];
  showMetrics?: boolean;
  innerSize?: string;
}

// Status color mapping
const STATUS_COLORS: Record<TaskStatus, ColorString> = {
  [TaskStatus.COMPLETED]: '#108043',
  [TaskStatus.IN_PROGRESS]: '#FFC453',
  [TaskStatus.PENDING]: '#5C6AC4',
  [TaskStatus.BLOCKED]: '#DE3618'
};

// Metrics calculation
const calculateCompletionMetrics = (tasks: Task[]): CompletionMetrics => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
  const inProgress = tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length;
  const pending = tasks.filter(t => t.status === TaskStatus.PENDING).length;
  const blocked = tasks.filter(t => t.status === TaskStatus.BLOCKED).length;
  const completionRate = (completed / total) * 100;

  return {
    total,
    completed,
    inProgress,
    pending,
    blocked,
    completionRate
  };
};

const groupByStatus = (tasks: Task[]): StatusCount[] => {
  const metrics = calculateCompletionMetrics(tasks);
  const statusGroups: StatusCount[] = [];

  if (metrics.completed > 0) {
    statusGroups.push({
      status: TaskStatus.COMPLETED,
      count: metrics.completed,
      percentage: (metrics.completed / metrics.total) * 100,
      color: STATUS_COLORS[TaskStatus.COMPLETED]
    });
  }

  if (metrics.inProgress > 0) {
    statusGroups.push({
      status: TaskStatus.IN_PROGRESS,
      count: metrics.inProgress,
      percentage: (metrics.inProgress / metrics.total) * 100,
      color: STATUS_COLORS[TaskStatus.IN_PROGRESS]
    });
  }

  if (metrics.pending > 0) {
    statusGroups.push({
      status: TaskStatus.PENDING,
      count: metrics.pending,
      percentage: (metrics.pending / metrics.total) * 100,
      color: STATUS_COLORS[TaskStatus.PENDING]
    });
  }

  if (metrics.blocked > 0) {
    statusGroups.push({
      status: TaskStatus.BLOCKED,
      count: metrics.blocked,
      percentage: (metrics.blocked / metrics.total) * 100,
      color: STATUS_COLORS[TaskStatus.BLOCKED]
    });
  }

  return statusGroups;
};

// Formatting functions
const formatStatusLabel = (status: TaskStatus): string => {
  return status
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Series builder
const buildTaskCompletionSeries = (
  statusCounts: StatusCount[],
  innerSize: string = '60%'
): SeriesPieOptions => {
  return {
    type: 'pie',
    name: 'Tasks',
    data: statusCounts.map(item => ({
      name: formatStatusLabel(item.status),
      y: item.count,
      color: item.color
    })),
    innerSize,
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b><br/>{point.y} tasks ({point.percentage:.1f}%)',
      style: {
        fontWeight: 'bold',
        fontSize: '11px'
      }
    }
  };
};

// Options builder
const createTaskCompletionOptions = (
  options: TaskCompletionOptions
): Highcharts.Options => {
  const { tasks, showMetrics = true, innerSize = '60%' } = options;
  const metrics = calculateCompletionMetrics(tasks);
  const statusCounts = groupByStatus(tasks);

  const subtitle = showMetrics
    ? \`\${metrics.total} total tasks | \${metrics.completionRate.toFixed(1)}% complete\`
    : undefined;

  return {
    chart: {
      type: 'pie',
      height: 400
    },
    title: {
      text: 'Task Status'
    },
    subtitle: subtitle ? {
      text: subtitle
    } : undefined,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> ({point.percentage:.1f}%)'
    },
    legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true
        },
        showInLegend: true
      }
    },
    series: [buildTaskCompletionSeries(statusCounts, innerSize)]
  };
};

// Usage
const tasks: Task[] = [
  { id: '1', status: TaskStatus.COMPLETED, priority: 'high' },
  { id: '2', status: TaskStatus.COMPLETED, priority: 'medium' },
  { id: '3', status: TaskStatus.COMPLETED, priority: 'low' },
  { id: '4', status: TaskStatus.IN_PROGRESS, priority: 'high' },
  { id: '5', status: TaskStatus.IN_PROGRESS, priority: 'medium' },
  { id: '6', status: TaskStatus.PENDING, priority: 'low' }
];

const chartOptions: TaskCompletionOptions = {
  tasks,
  showMetrics: true,
  innerSize: '60%'
};

const options = createTaskCompletionOptions(chartOptions);
Highcharts.chart('container', options);`
  },

'''

# Insert the new variants before the closing };
print("Inserting new variants...")
new_lines = lines[:pie_end_line] + [new_variants] + lines[pie_end_line:]

# Write the file
print("Writing file...")
with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("\n✅ Successfully added 7 new PieChart variants!")
print(f"   - donut (with comprehensive TypeScript)")
print(f"   - semicircle (with angle configuration types)")
print(f"   - withcustomcolors (with ColorScheme enum)")
print(f"   - legendonly (with LegendConfig interface)")
print(f"   - withpercentages (with PercentageFormatter type)")
print(f"   - budgetallocation (with BudgetSummary interface)")
print(f"   - taskcompletion (with TaskStatus enum)")
print(f"\nTotal: 8 variants (1 existing + 7 new)")
