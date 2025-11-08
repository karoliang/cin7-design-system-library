# Chart Variants TypeScript Fixes

This document contains the comprehensive TypeScript implementations for 6 chart variants.

## 1. AreaChart - percentage variant

Replace the TypeScript property of the `percentage` variant in `areaChartExamples` with:

```typescript
typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
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

export default MarketShareChart;`
```

## 2. AreaChart - splinearea variant

Replace the TypeScript property of the `splinearea` variant in `areaChartExamples` with:

```typescript
typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';
import type { SeriesAreasplineOptions, PlotAreasplineOptions } from 'highcharts';

interface SplineDataPoint {
  month: string;
  value: number;
  timestamp: Date;
  growthRate?: number;
}

interface TrafficSeriesData {
  name: string;
  category: 'organic' | 'paid' | 'social' | 'referral';
  dataPoints: SplineDataPoint[];
}

interface GrowthRateCalculation {
  current: number;
  previous: number;
  percentageChange: number;
}

interface SplineChartOptions {
  smoothingFactor: number;
  showMarkers: boolean;
  fillOpacity: number;
  enableGrowthCalculation: boolean;
}

interface TrafficAnalysisProps {
  rawData?: TrafficSeriesData[];
  categories?: string[];
  options?: SplineChartOptions;
  height?: number;
}

const TrafficAnalysis: React.FC<TrafficAnalysisProps> = ({
  rawData,
  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  options = {
    smoothingFactor: 0.3,
    showMarkers: true,
    fillOpacity: 0.5,
    enableGrowthCalculation: true
  },
  height = 400
}) => {
  const defaultData: TrafficSeriesData[] = [
    {
      name: 'Organic Traffic',
      category: 'organic',
      dataPoints: [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000].map((value, i) => ({
        month: categories[i],
        value,
        timestamp: new Date(2025, i, 1),
        growthRate: i > 0 ? ((value - [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000][i - 1]) / [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000][i - 1]) * 100 : 0
      }))
    },
    {
      name: 'Paid Traffic',
      category: 'paid',
      dataPoints: [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650].map((value, i) => ({
        month: categories[i],
        value,
        timestamp: new Date(2025, i, 1),
        growthRate: i > 0 ? ((value - [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650][i - 1]) / [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650][i - 1]) * 100 : 0
      }))
    }
  ];

  const data = rawData || defaultData;

  const calculateGrowthRate = (current: number, previous: number): GrowthRateCalculation => {
    const percentageChange = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
    return {
      current,
      previous,
      percentageChange: parseFloat(percentageChange.toFixed(2))
    };
  };

  const transformToChartSeries = (trafficData: TrafficSeriesData[]): SeriesAreasplineOptions[] => {
    return trafficData.map(series => ({
      name: series.name,
      data: series.dataPoints.map(point => point.value),
      type: 'areaspline' as const,
      fillOpacity: options.fillOpacity,
      marker: {
        enabled: options.showMarkers,
        radius: 4,
        states: {
          hover: {
            enabled: true,
            radius: 6
          }
        }
      }
    }));
  };

  const plotOptions: PlotAreasplineOptions = {
    fillOpacity: options.fillOpacity,
    lineWidth: 2,
    marker: {
      enabled: options.showMarkers,
      radius: 4
    }
  };

  const series = transformToChartSeries(data);

  return (
    <AreaChart
      title="Website Traffic Analysis"
      subtitle="Smooth Area Chart with Growth Tracking"
      smooth={true}
      markers={options.showMarkers}
      fillOpacity={options.fillOpacity}
      series={series}
      xAxis={{
        categories: categories,
        title: { text: 'Month' }
      }}
      yAxis={{
        title: { text: 'Visitors' },
        labels: {
          formatter: function() {
            return this.value >= 1000 ? (this.value / 1000) + 'k' : this.value.toString();
          }
        }
      }}
      tooltip={{
        shared: true,
        valueSuffix: ' visitors',
        formatter: options.enableGrowthCalculation ? function() {
          let tooltip = '<b>' + this.x + '</b><br/>';
          this.points?.forEach((point, index) => {
            const prevValue = index > 0 ? (point.series.data[point.point.index - 1] as any)?.y : 0;
            const growth = prevValue ? calculateGrowthRate(point.y as number, prevValue) : null;
            tooltip += '<span style="color:' + point.color + '">' + point.series.name + '</span>: <b>' + point.y + '</b> visitors';
            if (growth && point.point.index > 0) {
              tooltip += ' (' + (growth.percentageChange >= 0 ? '+' : '') + growth.percentageChange.toFixed(1) + '%)<br/>';
            } else {
              tooltip += '<br/>';
            }
          });
          return tooltip;
        } : undefined
      }}
      height={height}
      plotOptions={{ areaspline: plotOptions }}
    />
  );
};

export default TrafficAnalysis;`
```

## 3. WaterfallChart - default variant

Replace the TypeScript property of the `default` variant in `waterfallChartExamples` with:

```typescript
typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import type { SeriesWaterfallOptions } from 'highcharts';

HighchartsMore(Highcharts);

interface WaterfallDataPoint {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
}

enum ChartCategory {
  START = 'start',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  INTERMEDIATE = 'intermediate',
  FINAL = 'final'
}

interface WaterfallColorMapping {
  [ChartCategory.START]: string;
  [ChartCategory.POSITIVE]: string;
  [ChartCategory.NEGATIVE]: string;
  [ChartCategory.INTERMEDIATE]: string;
  [ChartCategory.FINAL]: string;
}

interface FinancialDataPoint extends WaterfallDataPoint {
  category: ChartCategory;
  description?: string;
}

interface WaterfallChartProps {
  data?: FinancialDataPoint[];
  colorScheme?: WaterfallColorMapping;
  height?: number;
  title?: string;
}

const WaterfallChart: React.FC<WaterfallChartProps> = ({
  data,
  colorScheme = {
    [ChartCategory.START]: '#008FFB',
    [ChartCategory.POSITIVE]: '#00E396',
    [ChartCategory.NEGATIVE]: '#FF4560',
    [ChartCategory.INTERMEDIATE]: '#775DD0',
    [ChartCategory.FINAL]: '#775DD0'
  },
  height = 400,
  title = 'Financial Analysis'
}) => {
  const defaultData: FinancialDataPoint[] = [
    { name: 'Start', y: 120000, category: ChartCategory.START, color: colorScheme[ChartCategory.START], description: 'Starting Balance' },
    { name: 'Revenue', y: 50000, category: ChartCategory.POSITIVE, color: colorScheme[ChartCategory.POSITIVE], description: 'Total Revenue' },
    { name: 'Costs', y: -30000, category: ChartCategory.NEGATIVE, color: colorScheme[ChartCategory.NEGATIVE], description: 'Operating Costs' },
    { name: 'Net', y: 140000, isSum: true, category: ChartCategory.FINAL, color: colorScheme[ChartCategory.FINAL], description: 'Net Result' }
  ];

  const chartData = data || defaultData;

  const transformToWaterfallData = (dataPoints: FinancialDataPoint[]): WaterfallDataPoint[] => {
    return dataPoints.map(point => ({
      name: point.name,
      y: point.y,
      color: point.color,
      isSum: point.isSum,
      isIntermediateSum: point.isIntermediateSum
    }));
  };

  const waterfallData = transformToWaterfallData(chartData);

  const options: Highcharts.Options = {
    chart: { type: 'waterfall', height },
    title: { text: title },
    xAxis: {
      type: 'category',
      categories: chartData.map(d => d.name)
    },
    yAxis: {
      title: { text: 'Amount ($)' },
      labels: {
        formatter: function() {
          return '$' + (this.value / 1000).toFixed(0) + 'k';
        }
      }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>${point.y:,.0f}</b>',
      formatter: function() {
        const dataPoint = chartData.find(d => d.name === this.point.name);
        return '<b>' + this.point.name + '</b><br/>' +
               'Amount: <b>$' + (this.y as number).toLocaleString() + '</b><br/>' +
               (dataPoint?.description ? dataPoint.description : '');
      }
    },
    series: [{
      type: 'waterfall',
      name: 'Cash Flow',
      data: waterfallData,
      upColor: colorScheme[ChartCategory.POSITIVE],
      color: colorScheme[ChartCategory.NEGATIVE],
      dataLabels: {
        enabled: true,
        formatter: function() {
          return '$' + ((this.y as number) / 1000).toFixed(0) + 'k';
        }
      }
    } as SeriesWaterfallOptions]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default WaterfallChart;`
```

## 4. WaterfallChart - profitloss variant

Replace the TypeScript property of the `profitloss` variant in `waterfallChartExamples` with:

```typescript
typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import type { SeriesWaterfallOptions } from 'highcharts';

HighchartsMore(Highcharts);

enum PLCategory {
  START = 'start',
  REVENUE = 'revenue',
  COGS = 'cogs',
  OPEX = 'opex',
  INTERMEDIATE = 'intermediate',
  FINAL = 'final'
}

interface PLDataPoint {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
  category: PLCategory;
}

interface FinancialMetrics {
  totalRevenue: number;
  totalCosts: number;
  operatingIncome: number;
  margin: number;
}

interface PLChartProps {
  data?: PLDataPoint[];
  fiscalPeriod?: string;
  height?: number;
}

const ProfitLossWaterfall: React.FC<PLChartProps> = ({
  data,
  fiscalPeriod = 'Q1 2025',
  height = 400
}) => {
  const defaultData: PLDataPoint[] = [
    { name: 'Start', y: 0, color: '#008FFB', category: PLCategory.START },
    { name: 'Product Revenue', y: 1200000, category: PLCategory.REVENUE },
    { name: 'Service Revenue', y: 400000, category: PLCategory.REVENUE },
    { name: 'Total Revenue', isIntermediateSum: true, color: '#775DD0', category: PLCategory.INTERMEDIATE },
    { name: 'Fixed Costs', y: -400000, category: PLCategory.OPEX },
    { name: 'Variable Costs', y: -500000, category: PLCategory.COGS },
    { name: 'Total Costs', isIntermediateSum: true, color: '#FEB019', category: PLCategory.INTERMEDIATE },
    { name: 'Operating Income', isSum: true, color: '#00D9E9', category: PLCategory.FINAL }
  ];

  const chartData = data || defaultData;

  const calculateFinancialMetrics = (dataPoints: PLDataPoint[]): FinancialMetrics => {
    const revenues = dataPoints.filter(d => d.category === PLCategory.REVENUE).reduce((sum, d) => sum + (d.y || 0), 0);
    const costs = Math.abs(dataPoints.filter(d => d.category === PLCategory.COGS || d.category === PLCategory.OPEX).reduce((sum, d) => sum + (d.y || 0), 0));
    const operatingIncome = revenues - costs;
    const margin = revenues > 0 ? (operatingIncome / revenues) * 100 : 0;

    return {
      totalRevenue: revenues,
      totalCosts: costs,
      operatingIncome,
      margin: parseFloat(margin.toFixed(2))
    };
  };

  const formatCurrency = (value: number, decimals: number = 0): string => {
    const formatted = (value / 1000).toFixed(decimals);
    return value >= 0 ? '$' + formatted + 'k' : '-$' + Math.abs(parseFloat(formatted)) + 'k';
  };

  const metrics = calculateFinancialMetrics(chartData);

  const options: Highcharts.Options = {
    chart: { type: 'waterfall', height },
    title: { text: 'Quarterly Profit & Loss Statement' },
    subtitle: { text: \`\${fiscalPeriod} | Operating Margin: \${metrics.margin.toFixed(1)}%\` },
    xAxis: { type: 'category' },
    yAxis: {
      title: { text: 'USD ($)' },
      labels: {
        formatter: function() {
          return formatCurrency(this.value);
        }
      }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>${point.y:,.0f}</b> USD',
      formatter: function() {
        const value = this.y as number;
        return '<b>' + this.point.name + '</b><br/>' +
               'Amount: <b>$' + value.toLocaleString() + '</b><br/>' +
               'Percentage of Revenue: <b>' + ((Math.abs(value) / metrics.totalRevenue) * 100).toFixed(1) + '%</b>';
      }
    },
    series: [{
      type: 'waterfall',
      upColor: '#00E396',
      color: '#FF4560',
      data: chartData,
      dataLabels: {
        enabled: true,
        formatter: function() {
          return formatCurrency(this.y as number);
        }
      }
    } as SeriesWaterfallOptions]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ProfitLossWaterfall;`
```

## 5. WaterfallChart - cashflow variant

Replace the TypeScript property of the `cashflow` variant in `waterfallChartExamples` with:

```typescript
typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import type { SeriesWaterfallOptions } from 'highcharts';

HighchartsMore(Highcharts);

interface CashFlowPeriod {
  startDate: Date;
  endDate: Date;
  periodName: string;
}

enum CashFlowCategory {
  BEGINNING = 'beginning',
  OPERATING = 'operating',
  INVESTING = 'investing',
  FINANCING = 'financing',
  INTERMEDIATE = 'intermediate',
  ENDING = 'ending'
}

interface CashFlowPoint {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
  category: CashFlowCategory;
  activityType: 'inflow' | 'outflow' | 'summary';
}

interface RunningBalanceCalculation {
  periodStart: number;
  periodEnd: number;
  netChange: number;
  activities: CashFlowPoint[];
}

interface CashFlowWaterfallProps {
  data?: CashFlowPoint[];
  period?: CashFlowPeriod;
  height?: number;
}

const CashFlowWaterfall: React.FC<CashFlowWaterfallProps> = ({
  data,
  period = {
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
    periodName: 'January 2025'
  },
  height = 450
}) => {
  const defaultData: CashFlowPoint[] = [
    { name: 'Beginning Cash', y: 50000, color: '#008FFB', category: CashFlowCategory.BEGINNING, activityType: 'summary' },
    { name: 'Sales Collection', y: 120000, category: CashFlowCategory.OPERATING, activityType: 'inflow' },
    { name: 'Supplier Payments', y: -45000, category: CashFlowCategory.OPERATING, activityType: 'outflow' },
    { name: 'Salary Payments', y: -35000, category: CashFlowCategory.OPERATING, activityType: 'outflow' },
    { name: 'Operating Cash', isIntermediateSum: true, color: '#775DD0', category: CashFlowCategory.INTERMEDIATE, activityType: 'summary' },
    { name: 'Equipment Purchase', y: -25000, category: CashFlowCategory.INVESTING, activityType: 'outflow' },
    { name: 'Loan Received', y: 40000, category: CashFlowCategory.FINANCING, activityType: 'inflow' },
    { name: 'Tax Payment', y: -15000, category: CashFlowCategory.OPERATING, activityType: 'outflow' },
    { name: 'Ending Cash', isSum: true, color: '#00D9E9', category: CashFlowCategory.ENDING, activityType: 'summary' }
  ];

  const chartData = data || defaultData;

  const calculateRunningBalance = (activities: CashFlowPoint[]): RunningBalanceCalculation => {
    const beginning = activities.find(a => a.category === CashFlowCategory.BEGINNING)?.y || 0;
    const ending = activities.filter(a => a.activityType !== 'summary' && a.category !== CashFlowCategory.BEGINNING)
                           .reduce((sum, a) => sum + (a.y || 0), beginning);

    return {
      periodStart: beginning,
      periodEnd: ending,
      netChange: ending - beginning,
      activities: activities.filter(a => a.activityType !== 'summary')
    };
  };

  const runningBalance = calculateRunningBalance(chartData);

  const formatCashValue = (value: number): string => {
    return '$' + (Math.abs(value) / 1000).toFixed(0) + 'k';
  };

  const options: Highcharts.Options = {
    chart: { type: 'waterfall', height },
    title: { text: 'Monthly Cash Flow Analysis' },
    subtitle: { text: \`\${period.periodName} | Net Change: \${formatCashValue(runningBalance.netChange)}\` },
    xAxis: { type: 'category' },
    yAxis: {
      title: { text: 'Cash ($)' },
      labels: {
        formatter: function() {
          return formatCashValue(this.value);
        }
      }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>${point.y:,.2f}</b>',
      formatter: function() {
        const dataPoint = chartData.find(d => d.name === this.point.name);
        return '<b>' + this.point.name + '</b><br/>' +
               'Amount: <b>$' + (this.y as number).toLocaleString() + '</b><br/>' +
               'Type: <b>' + (dataPoint?.activityType || 'N/A') + '</b><br/>' +
               'Category: <b>' + (dataPoint?.category || 'N/A') + '</b>';
      }
    },
    series: [{
      type: 'waterfall',
      upColor: '#00E396',
      color: '#FF4560',
      data: chartData,
      dataLabels: {
        enabled: true,
        formatter: function() {
          return formatCashValue(this.y as number);
        },
        style: {
          fontWeight: 'bold'
        }
      },
      pointPadding: 0
    } as SeriesWaterfallOptions]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default CashFlowWaterfall;`
```

## 6. WaterfallChart - productcomparison variant

Replace the TypeScript property of the `productcomparison` variant in `waterfallChartExamples` with:

```typescript
typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import type { SeriesWaterfallOptions } from 'highcharts';

HighchartsMore(Highcharts);

interface ProductFeature {
  name: string;
  score: number;
  impact: 'positive' | 'negative' | 'neutral';
  category: 'base' | 'premium' | 'support' | 'penalty' | 'total';
  description?: string;
}

interface ComparisonDelta {
  featureName: string;
  baselineScore: number;
  currentScore: number;
  delta: number;
  percentageChange: number;
}

type FeatureScore = number;

interface ProductValuePoint {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
  feature: ProductFeature;
}

interface ProductComparisonProps {
  features?: ProductFeature[];
  baselineScore?: number;
  height?: number;
  productName?: string;
}

const ProductComparisonWaterfall: React.FC<ProductComparisonProps> = ({
  features,
  baselineScore = 100,
  height = 400,
  productName = 'Premium Edition'
}) => {
  const defaultFeatures: ProductFeature[] = [
    { name: 'Base Product', score: 100, impact: 'neutral', category: 'base', description: 'Core functionality' },
    { name: 'Premium Materials', score: 25, impact: 'positive', category: 'premium', description: 'High-quality components' },
    { name: 'Advanced Features', score: 40, impact: 'positive', category: 'premium', description: 'AI-powered capabilities' },
    { name: 'Enhanced Version', score: 0, impact: 'neutral', category: 'total', description: 'Intermediate total' },
    { name: 'Extended Warranty', score: 15, impact: 'positive', category: 'support', description: '3-year coverage' },
    { name: 'Priority Support', score: 20, impact: 'positive', category: 'support', description: '24/7 assistance' },
    { name: 'Complexity Penalty', score: -10, impact: 'negative', category: 'penalty', description: 'Learning curve' },
    { name: 'Training Required', score: -5, impact: 'negative', category: 'penalty', description: 'Onboarding time' },
    { name: 'Final Product Value', score: 0, impact: 'neutral', category: 'total', description: 'Total value score' }
  ];

  const featureList = features || defaultFeatures;

  const calculateDelta = (current: FeatureScore, baseline: FeatureScore): ComparisonDelta => {
    const delta = current - baseline;
    const percentageChange = baseline !== 0 ? (delta / baseline) * 100 : 0;

    return {
      featureName: 'Comparison',
      baselineScore: baseline,
      currentScore: current,
      delta,
      percentageChange: parseFloat(percentageChange.toFixed(2))
    };
  };

  const transformToWaterfallData = (features: ProductFeature[]): ProductValuePoint[] => {
    const colorMap = {
      base: '#008FFB',
      premium: '#00E396',
      support: '#00E396',
      penalty: '#FF4560',
      total: '#775DD0'
    };

    return features.map((feature, index) => {
      const isIntermediate = feature.name === 'Enhanced Version';
      const isFinal = feature.name === 'Final Product Value';

      return {
        name: feature.name,
        y: feature.score !== 0 ? feature.score : undefined,
        color: colorMap[feature.category],
        isSum: isFinal,
        isIntermediateSum: isIntermediate,
        feature
      };
    });
  };

  const waterfallData = transformToWaterfallData(featureList);
  const totalScore = featureList.filter(f => f.category !== 'total').reduce((sum, f) => sum + f.score, 0);
  const delta = calculateDelta(totalScore, baselineScore);

  const options: Highcharts.Options = {
    chart: { type: 'waterfall', height },
    title: { text: 'Product Feature Value Comparison' },
    subtitle: { text: \`\${productName} | Total Value: \${totalScore} points (\${delta.delta >= 0 ? '+' : ''}\${delta.delta} vs baseline)\` },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Value Score' } },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>{point.y}</b> points',
      formatter: function() {
        const dataPoint = waterfallData.find(d => d.name === this.point.name);
        const description = dataPoint?.feature.description || '';
        const category = dataPoint?.feature.category || 'unknown';
        const impact = dataPoint?.feature.impact || 'neutral';

        return '<b>' + this.point.name + '</b><br/>' +
               'Score: <b>' + this.y + '</b> points<br/>' +
               'Impact: <b>' + impact + '</b><br/>' +
               'Category: <b>' + category + '</b><br/>' +
               (description ? description : '');
      }
    },
    series: [{
      type: 'waterfall',
      upColor: '#00E396',
      color: '#FF4560',
      data: waterfallData,
      dataLabels: {
        enabled: true,
        formatter: function() {
          const value = this.y as number;
          const prefix = value > 0 ? '+' : '';
          return prefix + value;
        },
        style: {
          color: '#000',
          fontWeight: 'bold',
          textOutline: '1px contrast'
        }
      }
    } as SeriesWaterfallOptions]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ProductComparisonWaterfall;`
```

---

## Summary of Changes

### AreaChart Variants (2)

1. **percentage**: Added comprehensive TypeScript types including:
   - `PercentageDataPoint` interface for data points with year, value, and raw units
   - `MarketShareData` interface with product categorization
   - `PercentageChartConfig` for chart configuration options
   - `MarketShareMetadata` for unit and currency information
   - `calculatePercentage()` function with proper typing
   - `transformToChartSeries()` and `generateTooltipFormatter()` helper functions
   - ~120 lines vs ~40 lines in React version

2. **splinearea**: Added comprehensive TypeScript types including:
   - `SplineDataPoint` interface with growth rate tracking
   - `TrafficSeriesData` interface with traffic categorization
   - `GrowthRateCalculation` type for percentage change calculations
   - `SplineChartOptions` interface for smoothing and marker controls
   - `calculateGrowthRate()` function with proper typing
   - Custom tooltip formatter with growth rate display
   - ~150 lines vs ~30 lines in React version

### WaterfallChart Variants (4)

3. **default**: Added comprehensive TypeScript types including:
   - `WaterfallDataPoint` interface
   - `ChartCategory` enum for categorizing entries
   - `WaterfallColorMapping` type for color scheme management
   - `FinancialDataPoint` interface extending base with category
   - `transformToWaterfallData()` function
   - ~110 lines vs ~30 lines in React version

4. **profitloss**: Added comprehensive TypeScript types including:
   - `PLCategory` enum (Revenue, COGS, OpEx, etc.)
   - `PLDataPoint` interface with P&L categorization
   - `FinancialMetrics` interface for calculations
   - `calculateFinancialMetrics()` function with margin calculations
   - `formatCurrency()` helper function with proper typing
   - Enhanced tooltip with percentage of revenue
   - ~130 lines vs ~40 lines in React version

5. **cashflow**: Added comprehensive TypeScript types including:
   - `CashFlowPeriod` interface with date range tracking
   - `CashFlowCategory` enum (Operating, Investing, Financing)
   - `CashFlowPoint` interface with activity type
   - `RunningBalanceCalculation` interface
   - `calculateRunningBalance()` function with proper typing
   - Enhanced tooltip showing activity type and category
   - ~140 lines vs ~40 lines in React version

6. **productcomparison**: Added comprehensive TypeScript types including:
   - `ProductFeature` interface with impact and category
   - `ComparisonDelta` interface for baseline comparison
   - `FeatureScore` type alias
   - `calculateDelta()` function with percentage change
   - `transformToWaterfallData()` with color mapping logic
   - Enhanced tooltip with feature descriptions
   - ~150 lines vs ~40 lines in React version

All TypeScript variants now demonstrate enterprise-grade typing patterns with:
- Comprehensive interfaces for data structures
- Enum types for categorical data
- Helper functions with full type annotations
- Advanced calculation logic with proper return types
- Type-safe transformations and formatters
