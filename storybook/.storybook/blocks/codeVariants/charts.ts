import type { CodeVariant } from './types';

export const lineChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function LineChart() {
  const options = {
    title: { text: 'Sales Trend' },
    series: [{ data: [1, 2, 3, 4, 5] }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: { data: [{month: 'Jan', value: 100}] },
  axes: [{type: 'numeric', position: 'left'}],
  series: [{type: 'line', yField: 'value'}]
});`,
    vanilla: `Highcharts.chart('container', {
  title: { text: 'Sales Trend' },
  series: [{ data: [1, 2, 3, 4, 5] }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesLineOptions, PointOptionsObject } from 'highcharts';

interface TimeSeriesPoint {
  timestamp: Date;
  value: number;
  annotation?: string;
}

interface TrendData {
  points: TimeSeriesPoint[];
  metric: string;
  unit: string;
}

interface LineChartConfig {
  showMarkers: boolean;
  enableArea: boolean;
  smooth: boolean;
  dashStyle?: 'Solid' | 'Dash' | 'Dot' | 'DashDot';
}

interface TrendAnalysis {
  average: number;
  min: number;
  max: number;
  trend: 'up' | 'down' | 'stable';
}

type LineSeries = SeriesLineOptions[];

class LineChartBuilder {
  private data: TrendData;
  private config: LineChartConfig;

  constructor(data: TrendData, config: LineChartConfig) {
    this.data = data;
    this.config = config;
  }

  private analyzeTrend(): TrendAnalysis {
    const values = this.data.points.map(p => p.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;

    return {
      average: parseFloat(avg.toFixed(2)),
      min: Math.min(...values),
      max: Math.max(...values),
      trend: values[values.length - 1] > values[0] ? 'up' :
             values[values.length - 1] < values[0] ? 'down' : 'stable'
    };
  }

  private transformToHighchartsData(): PointOptionsObject[] {
    return this.data.points.map(point => ({
      x: point.timestamp.getTime(),
      y: point.value,
      name: point.annotation
    }));
  }

  private buildSeries(): LineSeries {
    return [{
      type: this.config.smooth ? 'spline' : 'line',
      name: this.data.metric,
      data: this.transformToHighchartsData(),
      marker: {
        enabled: this.config.showMarkers
      },
      dashStyle: this.config.dashStyle || 'Solid',
      fillOpacity: this.config.enableArea ? 0.3 : 0
    }];
  }

  build(): Highcharts.Options {
    const analysis = this.analyzeTrend();

    return {
      chart: { type: 'line' },
      title: {
        text: \`\${this.data.metric} Trend\`
      },
      subtitle: {
        text: \`Trend: \${analysis.trend.toUpperCase()} | Avg: \${analysis.average}\${this.data.unit}\`
      },
      xAxis: {
        type: 'datetime',
        title: { text: 'Time' }
      },
      yAxis: {
        title: { text: \`\${this.data.metric} (\${this.data.unit})\` },
        plotLines: [{
          value: analysis.average,
          color: 'red',
          dashStyle: 'Dash',
          width: 2,
          label: {
            text: \`Average: \${analysis.average}\${this.data.unit}\`
          }
        }]
      },
      series: this.buildSeries()
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage Example
const trendData: TrendData = {
  points: [
    { timestamp: new Date('2025-01-01'), value: 29.9 },
    { timestamp: new Date('2025-02-01'), value: 71.5 },
    { timestamp: new Date('2025-03-01'), value: 106.4 }
  ],
  metric: 'Sales',
  unit: 'K'
};

const lineConfig: LineChartConfig = {
  showMarkers: true,
  enableArea: false,
  smooth: true
};

const chart = new LineChartBuilder(trendData, lineConfig)
  .render('line-chart-container');`
  },
  smoothcurves: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function SmoothLineChart() {
  const options = {
    chart: { type: 'spline' },
    title: { text: 'Temperature Trend' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
    yAxis: { title: { text: 'Temperature (°C)' } },
    series: [{
      name: 'Temperature',
      data: [5, 10, 15, 20, 25]
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'spline' },
  title: { text: 'Temperature Trend' },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  series: [{
    name: 'Temperature',
    data: [5, 10, 15, 20, 25]
  }]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: {
    data: [
      { month: 'Jan', temp: 5 },
      { month: 'Feb', temp: 10 },
      { month: 'Mar', temp: 15 },
      { month: 'Apr', temp: 20 },
      { month: 'May', temp: 25 }
    ]
  },
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Temperature (°C)' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: 'month'
  }],
  series: [{
    type: 'line',
    xField: 'month',
    yField: 'temp',
    smooth: true,
    style: { lineWidth: 2 }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesSplineOptions } from 'highcharts';

interface TemperatureReading {
  month: string;
  temperature: number;
  humidity?: number;
}

interface SmoothChartConfig {
  tension: number;
  showPoints: boolean;
  interpolation: 'cardinal' | 'monotone' | 'catmullRom';
}

class SmoothLineChartBuilder {
  private data: TemperatureReading[];
  private config: SmoothChartConfig;

  constructor(data: TemperatureReading[], config: SmoothChartConfig) {
    this.data = data;
    this.config = config;
  }

  private buildSeries(): SeriesSplineOptions[] {
    return [{
      type: 'spline',
      name: 'Temperature',
      data: this.data.map(d => ({
        name: d.month,
        y: d.temperature
      })),
      marker: {
        enabled: this.config.showPoints,
        radius: 4
      }
    }];
  }

  build(): Highcharts.Options {
    return {
      chart: { type: 'spline' },
      title: { text: 'Temperature Trend (Smooth Curve)' },
      xAxis: {
        categories: this.data.map(d => d.month),
        title: { text: 'Month' }
      },
      yAxis: {
        title: { text: 'Temperature (°C)' }
      },
      plotOptions: {
        spline: {
          lineWidth: 3,
          marker: {
            enabled: this.config.showPoints
          }
        }
      },
      series: this.buildSeries()
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const tempData: TemperatureReading[] = [
  { month: 'Jan', temperature: 5 },
  { month: 'Feb', temperature: 10 },
  { month: 'Mar', temperature: 15 },
  { month: 'Apr', temperature: 20 },
  { month: 'May', temperature: 25 }
];

const smoothConfig: SmoothChartConfig = {
  tension: 0.4,
  showPoints: false,
  interpolation: 'cardinal'
};

const chart = new SmoothLineChartBuilder(tempData, smoothConfig)
  .render('smooth-chart-container');`
  },
  withmarkers: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function LineChartWithMarkers() {
  const options = {
    chart: { type: 'line' },
    title: { text: 'Sales with Data Points' },
    xAxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
    yAxis: { title: { text: 'Revenue ($K)' } },
    series: [{
      name: 'Revenue',
      data: [120, 150, 180, 210],
      marker: { enabled: true, radius: 5, symbol: 'circle' }
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'line' },
  title: { text: 'Sales with Data Points' },
  xAxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
  series: [{
    name: 'Revenue',
    data: [120, 150, 180, 210],
    marker: { enabled: true, radius: 5 }
  }]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: {
    data: [
      { quarter: 'Q1', revenue: 120 },
      { quarter: 'Q2', revenue: 150 },
      { quarter: 'Q3', revenue: 180 },
      { quarter: 'Q4', revenue: 210 }
    ]
  },
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Revenue ($K)' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: 'quarter'
  }],
  series: [{
    type: 'line',
    xField: 'quarter',
    yField: 'revenue',
    marker: {
      type: 'circle',
      radius: 5,
      fillStyle: '#3498db'
    },
    style: { lineWidth: 2 }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesLineOptions, PointMarkerOptionsObject } from 'highcharts';

interface DataPoint {
  label: string;
  value: number;
  highlighted?: boolean;
}

interface MarkerConfig {
  size: number;
  shape: 'circle' | 'square' | 'diamond' | 'triangle';
  fillColor: string;
  lineColor: string;
  lineWidth: number;
}

class MarkerLineChartBuilder {
  private data: DataPoint[];
  private markerConfig: MarkerConfig;

  constructor(data: DataPoint[], config: MarkerConfig) {
    this.data = data;
    this.markerConfig = config;
  }

  private createMarker(): PointMarkerOptionsObject {
    return {
      enabled: true,
      radius: this.markerConfig.size,
      symbol: this.markerConfig.shape,
      fillColor: this.markerConfig.fillColor,
      lineColor: this.markerConfig.lineColor,
      lineWidth: this.markerConfig.lineWidth
    };
  }

  private buildSeries(): SeriesLineOptions[] {
    return [{
      type: 'line',
      name: 'Data Series',
      data: this.data.map(point => ({
        name: point.label,
        y: point.value,
        marker: point.highlighted ? {
          ...this.createMarker(),
          radius: this.markerConfig.size * 1.5
        } : this.createMarker()
      })),
      marker: this.createMarker()
    }];
  }

  build(): Highcharts.Options {
    return {
      chart: { type: 'line' },
      title: { text: 'Line Chart with Markers' },
      xAxis: {
        categories: this.data.map(d => d.label),
        title: { text: 'Period' }
      },
      yAxis: {
        title: { text: 'Value' }
      },
      plotOptions: {
        line: {
          marker: {
            enabled: true
          }
        }
      },
      series: this.buildSeries()
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const dataPoints: DataPoint[] = [
  { label: 'Q1', value: 120 },
  { label: 'Q2', value: 150, highlighted: true },
  { label: 'Q3', value: 180 },
  { label: 'Q4', value: 210, highlighted: true }
];

const markerConfig: MarkerConfig = {
  size: 5,
  shape: 'circle',
  fillColor: '#3498db',
  lineColor: '#2980b9',
  lineWidth: 2
};

const chart = new MarkerLineChartBuilder(dataPoints, markerConfig)
  .render('marker-chart-container');`
  },
  multiseries: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function MultiSeriesLineChart() {
  const options = {
    chart: { type: 'line' },
    title: { text: 'Product Comparison' },
    xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yAxis: { title: { text: 'Sales Volume' } },
    series: [
      { name: 'Product A', data: [100, 120, 140, 160, 180, 200] },
      { name: 'Product B', data: [80, 95, 110, 125, 140, 155] },
      { name: 'Product C', data: [60, 75, 90, 105, 120, 135] }
    ]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'line' },
  title: { text: 'Product Comparison' },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  series: [
    { name: 'Product A', data: [100, 120, 140, 160, 180, 200] },
    { name: 'Product B', data: [80, 95, 110, 125, 140, 155] },
    { name: 'Product C', data: [60, 75, 90, 105, 120, 135] }
  ]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 700,
  height: 500,
  store: {
    data: [
      { month: 'Jan', productA: 100, productB: 80, productC: 60 },
      { month: 'Feb', productA: 120, productB: 95, productC: 75 },
      { month: 'Mar', productA: 140, productB: 110, productC: 90 },
      { month: 'Apr', productA: 160, productB: 125, productC: 105 },
      { month: 'May', productA: 180, productB: 140, productC: 120 },
      { month: 'Jun', productA: 200, productB: 155, productC: 135 }
    ]
  },
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Sales Volume' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: 'month'
  }],
  series: [{
    type: 'line',
    xField: 'month',
    yField: 'productA',
    title: 'Product A',
    style: { lineWidth: 2 }
  }, {
    type: 'line',
    xField: 'month',
    yField: 'productB',
    title: 'Product B',
    style: { lineWidth: 2 }
  }, {
    type: 'line',
    xField: 'month',
    yField: 'productC',
    title: 'Product C',
    style: { lineWidth: 2 }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesLineOptions } from 'highcharts';

interface ProductData {
  month: string;
  sales: number;
}

interface ProductSeries {
  name: string;
  data: ProductData[];
  color: string;
  dashStyle?: 'Solid' | 'Dash' | 'Dot';
}

interface MultiSeriesConfig {
  showLegend: boolean;
  enableTooltip: boolean;
  stackSeries: boolean;
}

class MultiSeriesChartBuilder {
  private series: ProductSeries[];
  private config: MultiSeriesConfig;

  constructor(series: ProductSeries[], config: MultiSeriesConfig) {
    this.series = series;
    this.config = config;
  }

  private getAllMonths(): string[] {
    const monthsSet = new Set<string>();
    this.series.forEach(s => s.data.forEach(d => monthsSet.add(d.month)));
    return Array.from(monthsSet).sort();
  }

  private buildSeries(): SeriesLineOptions[] {
    const months = this.getAllMonths();

    return this.series.map(productSeries => ({
      type: 'line',
      name: productSeries.name,
      color: productSeries.color,
      dashStyle: productSeries.dashStyle || 'Solid',
      data: months.map(month => {
        const dataPoint = productSeries.data.find(d => d.month === month);
        return dataPoint ? dataPoint.sales : null;
      }),
      marker: { enabled: false }
    }));
  }

  build(): Highcharts.Options {
    return {
      chart: { type: 'line' },
      title: { text: 'Multi-Series Product Comparison' },
      xAxis: {
        categories: this.getAllMonths(),
        title: { text: 'Month' }
      },
      yAxis: {
        title: { text: 'Sales Volume' }
      },
      legend: {
        enabled: this.config.showLegend
      },
      tooltip: {
        enabled: this.config.enableTooltip,
        shared: true,
        crosshairs: true
      },
      plotOptions: {
        line: {
          stacking: this.config.stackSeries ? 'normal' : undefined
        }
      },
      series: this.buildSeries()
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const productSeriesData: ProductSeries[] = [
  {
    name: 'Product A',
    color: '#3498db',
    data: [
      { month: 'Jan', sales: 100 },
      { month: 'Feb', sales: 120 },
      { month: 'Mar', sales: 140 }
    ]
  },
  {
    name: 'Product B',
    color: '#e74c3c',
    data: [
      { month: 'Jan', sales: 80 },
      { month: 'Feb', sales: 95 },
      { month: 'Mar', sales: 110 }
    ]
  }
];

const multiConfig: MultiSeriesConfig = {
  showLegend: true,
  enableTooltip: true,
  stackSeries: false
};

const chart = new MultiSeriesChartBuilder(productSeriesData, multiConfig)
  .render('multi-series-container');`
  },
  smoothwithmarkers: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function SmoothLineWithMarkers() {
  const options = {
    chart: { type: 'spline' },
    title: { text: 'Growth Trend with Milestones' },
    xAxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
    yAxis: { title: { text: 'Users' } },
    series: [{
      name: 'User Growth',
      data: [1000, 1500, 2200, 3100],
      marker: { enabled: true, radius: 6, symbol: 'diamond' }
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'spline' },
  title: { text: 'Growth Trend with Milestones' },
  xAxis: { categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
  series: [{
    name: 'User Growth',
    data: [1000, 1500, 2200, 3100],
    marker: { enabled: true, radius: 6 }
  }]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: {
    data: [
      { week: 'Week 1', users: 1000 },
      { week: 'Week 2', users: 1500 },
      { week: 'Week 3', users: 2200 },
      { week: 'Week 4', users: 3100 }
    ]
  },
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Users' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: 'week'
  }],
  series: [{
    type: 'line',
    xField: 'week',
    yField: 'users',
    smooth: true,
    marker: {
      type: 'diamond',
      radius: 6,
      fillStyle: '#2ecc71'
    },
    style: {
      lineWidth: 3,
      strokeStyle: '#27ae60'
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import type { SeriesSplineOptions, PointMarkerOptionsObject } from 'highcharts';

interface MilestonePoint {
  label: string;
  value: number;
  milestone?: string;
  markerSize?: number;
}

interface SmoothMarkerConfig {
  curveTension: number;
  markerStyle: {
    symbol: 'circle' | 'square' | 'diamond' | 'triangle';
    size: number;
    color: string;
  };
  lineWidth: number;
}

class SmoothMarkerChartBuilder {
  private data: MilestonePoint[];
  private config: SmoothMarkerConfig;

  constructor(data: MilestonePoint[], config: SmoothMarkerConfig) {
    this.data = data;
    this.config = config;
  }

  private createMarkerForPoint(point: MilestonePoint): PointMarkerOptionsObject {
    const baseSize = point.markerSize || this.config.markerStyle.size;

    return {
      enabled: true,
      radius: baseSize,
      symbol: this.config.markerStyle.symbol,
      fillColor: this.config.markerStyle.color,
      lineWidth: 2,
      lineColor: '#ffffff'
    };
  }

  private buildSeries(): SeriesSplineOptions[] {
    return [{
      type: 'spline',
      name: 'Growth Trend',
      data: this.data.map(point => ({
        name: point.label,
        y: point.value,
        marker: this.createMarkerForPoint(point),
        dataLabels: point.milestone ? {
          enabled: true,
          format: point.milestone
        } : undefined
      })),
      lineWidth: this.config.lineWidth,
      color: this.config.markerStyle.color
    }];
  }

  build(): Highcharts.Options {
    return {
      chart: { type: 'spline' },
      title: { text: 'Smooth Line with Markers' },
      xAxis: {
        categories: this.data.map(d => d.label),
        title: { text: 'Period' }
      },
      yAxis: {
        title: { text: 'Value' }
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      series: this.buildSeries()
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const milestoneData: MilestonePoint[] = [
  { label: 'Week 1', value: 1000, milestone: 'Launch' },
  { label: 'Week 2', value: 1500 },
  { label: 'Week 3', value: 2200, milestone: '2K Users!', markerSize: 8 },
  { label: 'Week 4', value: 3100, milestone: '3K Users!', markerSize: 10 }
];

const smoothMarkerConfig: SmoothMarkerConfig = {
  curveTension: 0.5,
  markerStyle: {
    symbol: 'diamond',
    size: 6,
    color: '#2ecc71'
  },
  lineWidth: 3
};

const chart = new SmoothMarkerChartBuilder(milestoneData, smoothMarkerConfig)
  .render('smooth-marker-container');`
  }
};

// BarChart Component Examples

export const barChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function BarChart() {
  const options = {
    chart: { type: 'column' },
    title: { text: 'Sales by Category' },
    series: [{ data: [10, 20, 30] }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: { data: [{category: 'A', value: 100}] },
  series: [{type: 'bar', yField: 'value'}]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'column' },
  series: [{ data: [10, 20, 30] }]
});`,
    typescript: `import Highcharts from 'highcharts';
const options: Highcharts.Options = {
  chart: { type: 'column' },
  series: [{ type: 'column', data: [10, 20, 30] }]
};
Highcharts.chart('container', options);`
  },
  horizontal: {
    react: `import { BarChart } from '@cin7/highcharts-adapter/react';

function HorizontalBarChart() {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const series = [
    { name: 'Revenue', data: [45000, 52000, 48000, 58000, 61000] }
  ];

  return (
    <BarChart
      title="Monthly Revenue"
      subtitle="2025"
      categories={categories}
      series={series}
      horizontal={true}
      yAxisTitle="Revenue ($)"
      xAxisTitle="Months"
    />
  );
}`,
    vanilla: `import Highcharts from 'highcharts';

const chart = Highcharts.chart('container', {
  chart: { type: 'bar' },
  title: { text: 'Monthly Revenue' },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  yAxis: { title: { text: 'Revenue ($)' } },
  series: [{
    name: 'Revenue',
    data: [45000, 52000, 48000, 58000, 61000]
  }]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['month', 'revenue'],
    data: [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 58000 },
      { month: 'May', revenue: 61000 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'bottom',
    title: { text: 'Revenue ($)' }
  }, {
    type: 'category',
    position: 'left',
    fields: ['month']
  }],
  series: [{
    type: 'bar',
    xField: 'month',
    yField: 'revenue',
    label: { field: 'revenue', display: 'insideEnd' }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';

interface MonthlyRevenue {
  month: string;
  revenue: number;
}

interface HorizontalBarChartConfig {
  title: string;
  subtitle?: string;
  data: MonthlyRevenue[];
  yAxisTitle?: string;
  xAxisTitle?: string;
}

class HorizontalBarChartBuilder {
  private config: HorizontalBarChartConfig;

  constructor(config: HorizontalBarChartConfig) {
    this.config = config;
  }

  private getCategories(): string[] {
    return this.config.data.map(item => item.month);
  }

  private getSeriesData(): number[] {
    return this.config.data.map(item => item.revenue);
  }

  build(): Highcharts.Options {
    return {
      chart: {
        type: 'bar',
        backgroundColor: '#FFFFFF'
      },
      title: {
        text: this.config.title,
        style: { fontSize: '16px', fontWeight: 'bold' }
      },
      subtitle: {
        text: this.config.subtitle
      },
      xAxis: {
        categories: this.getCategories(),
        title: {
          text: this.config.xAxisTitle || 'Months'
        }
      },
      yAxis: {
        title: {
          text: this.config.yAxisTitle || 'Revenue ($)'
        },
        labels: {
          format: '{value:,.0f}'
        }
      },
      series: [{
        type: 'bar',
        name: 'Revenue',
        data: this.getSeriesData(),
        color: '#5C6AC4'
      }],
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: 'Revenue: \${point.y:,.0f}'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const data: MonthlyRevenue[] = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 58000 },
  { month: 'May', revenue: 61000 }
];

const chartBuilder = new HorizontalBarChartBuilder({
  title: 'Monthly Revenue',
  subtitle: '2025',
  data,
  yAxisTitle: 'Revenue ($)',
  xAxisTitle: 'Months'
});

chartBuilder.render('container');`
  },
  withdatalabels: {
    react: `import { BarChart } from '@cin7/highcharts-adapter/react';

function BarChartWithLabels() {
  const categories = ['Product A', 'Product B', 'Product C', 'Product D'];
  const series = [
    {
      name: 'Units Sold',
      data: [1250, 2180, 1560, 2340],
      dataLabels: {
        enabled: true,
        format: '{point.y:,.0f}'
      }
    }
  ];

  return (
    <BarChart
      title="Product Sales"
      categories={categories}
      series={series}
      yAxisTitle="Units"
    />
  );
}`,
    vanilla: `import Highcharts from 'highcharts';

const chart = Highcharts.chart('container', {
  chart: { type: 'column' },
  title: { text: 'Product Sales' },
  xAxis: { categories: ['Product A', 'Product B', 'Product C', 'Product D'] },
  yAxis: { title: { text: 'Units' } },
  plotOptions: {
    column: {
      dataLabels: {
        enabled: true,
        format: '{point.y:,.0f}'
      }
    }
  },
  series: [{
    name: 'Units Sold',
    data: [1250, 2180, 1560, 2340]
  }]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['product', 'units'],
    data: [
      { product: 'Product A', units: 1250 },
      { product: 'Product B', units: 2180 },
      { product: 'Product C', units: 1560 },
      { product: 'Product D', units: 2340 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Units' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['product']
  }],
  series: [{
    type: 'bar',
    xField: 'product',
    yField: 'units',
    label: {
      field: 'units',
      display: 'insideEnd',
      renderer: function(value) {
        return Ext.util.Format.number(value, '0,000');
      }
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';

interface ProductSales {
  product: string;
  units: number;
}

interface DataLabelConfig {
  enabled: boolean;
  format?: string;
  color?: string;
  style?: Highcharts.CSSObject;
}

interface BarChartWithLabelsConfig {
  title: string;
  data: ProductSales[];
  dataLabels: DataLabelConfig;
  yAxisTitle?: string;
}

class BarChartWithDataLabels {
  private config: BarChartWithLabelsConfig;

  constructor(config: BarChartWithLabelsConfig) {
    this.config = config;
  }

  private getCategories(): string[] {
    return this.config.data.map(item => item.product);
  }

  private getSeriesData(): number[] {
    return this.config.data.map(item => item.units);
  }

  build(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
        backgroundColor: '#FFFFFF'
      },
      title: {
        text: this.config.title,
        style: { fontSize: '16px', fontWeight: 'bold' }
      },
      xAxis: {
        categories: this.getCategories()
      },
      yAxis: {
        title: {
          text: this.config.yAxisTitle || 'Units'
        }
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: this.config.dataLabels.enabled,
            format: this.config.dataLabels.format || '{point.y:,.0f}',
            color: this.config.dataLabels.color || '#000000',
            style: this.config.dataLabels.style || {
              fontSize: '12px',
              fontWeight: 'bold'
            }
          }
        }
      },
      series: [{
        type: 'column',
        name: 'Units Sold',
        data: this.getSeriesData(),
        color: '#5C6AC4'
      }],
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: 'Units: {point.y:,.0f}'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      }
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const salesData: ProductSales[] = [
  { product: 'Product A', units: 1250 },
  { product: 'Product B', units: 2180 },
  { product: 'Product C', units: 1560 },
  { product: 'Product D', units: 2340 }
];

const chart = new BarChartWithDataLabels({
  title: 'Product Sales',
  data: salesData,
  dataLabels: {
    enabled: true,
    format: '{point.y:,.0f}'
  },
  yAxisTitle: 'Units'
});

chart.render('container');`
  },
  stacked: {
    react: `import { BarChart } from '@cin7/highcharts-adapter/react';

function StackedBarChart() {
  const categories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const series = [
    { name: 'North', data: [25000, 28000, 31000, 34000] },
    { name: 'South', data: [18000, 21000, 24000, 26000] },
    { name: 'East', data: [22000, 24000, 26000, 29000] },
    { name: 'West', data: [20000, 23000, 25000, 28000] }
  ];

  return (
    <BarChart
      title="Regional Sales by Quarter"
      categories={categories}
      series={series}
      stacking="normal"
      yAxisTitle="Revenue ($)"
    />
  );
}`,
    vanilla: `import Highcharts from 'highcharts';

const chart = Highcharts.chart('container', {
  chart: { type: 'column' },
  title: { text: 'Regional Sales by Quarter' },
  xAxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
  yAxis: { title: { text: 'Revenue ($)' } },
  plotOptions: {
    column: { stacking: 'normal' }
  },
  series: [
    { name: 'North', data: [25000, 28000, 31000, 34000] },
    { name: 'South', data: [18000, 21000, 24000, 26000] },
    { name: 'East', data: [22000, 24000, 26000, 29000] },
    { name: 'West', data: [20000, 23000, 25000, 28000] }
  ]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['quarter', 'north', 'south', 'east', 'west'],
    data: [
      { quarter: 'Q1', north: 25000, south: 18000, east: 22000, west: 20000 },
      { quarter: 'Q2', north: 28000, south: 21000, east: 24000, west: 23000 },
      { quarter: 'Q3', north: 31000, south: 24000, east: 26000, west: 25000 },
      { quarter: 'Q4', north: 34000, south: 26000, east: 29000, west: 28000 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Revenue ($)' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['quarter']
  }],
  series: [{
    type: 'bar',
    xField: 'quarter',
    yField: ['north', 'south', 'east', 'west'],
    stacked: true,
    title: ['North', 'South', 'East', 'West']
  }]
});`,
    typescript: `import Highcharts from 'highcharts';

interface RegionalSales {
  quarter: string;
  north: number;
  south: number;
  east: number;
  west: number;
}

interface StackedBarChartConfig {
  title: string;
  data: RegionalSales[];
  stackingType: 'normal' | 'percent';
  yAxisTitle?: string;
}

class StackedBarChartBuilder {
  private config: StackedBarChartConfig;

  constructor(config: StackedBarChartConfig) {
    this.config = config;
  }

  private getCategories(): string[] {
    return this.config.data.map(item => item.quarter);
  }

  private getSeries(): Highcharts.SeriesOptionsType[] {
    const regions = ['north', 'south', 'east', 'west'];
    const colors = ['#5C6AC4', '#006FBB', '#47C1BF', '#955BA5'];

    return regions.map((region, index) => ({
      type: 'column' as const,
      name: region.charAt(0).toUpperCase() + region.slice(1),
      data: this.config.data.map(item => item[region as keyof RegionalSales] as number),
      color: colors[index]
    }));
  }

  build(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
        backgroundColor: '#FFFFFF'
      },
      title: {
        text: this.config.title,
        style: { fontSize: '16px', fontWeight: 'bold' }
      },
      xAxis: {
        categories: this.getCategories()
      },
      yAxis: {
        title: {
          text: this.config.yAxisTitle || 'Revenue ($)'
        },
        labels: {
          format: '{value:,.0f}'
        }
      },
      plotOptions: {
        column: {
          stacking: this.config.stackingType
        }
      },
      series: this.getSeries(),
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: \${point.y:,.0f}<br/>Total: \${point.stackTotal:,.0f}'
      },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom'
      },
      credits: {
        enabled: false
      }
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const salesData: RegionalSales[] = [
  { quarter: 'Q1', north: 25000, south: 18000, east: 22000, west: 20000 },
  { quarter: 'Q2', north: 28000, south: 21000, east: 24000, west: 23000 },
  { quarter: 'Q3', north: 31000, south: 24000, east: 26000, west: 25000 },
  { quarter: 'Q4', north: 34000, south: 26000, east: 29000, west: 28000 }
];

const chartBuilder = new StackedBarChartBuilder({
  title: 'Regional Sales by Quarter',
  data: salesData,
  stackingType: 'normal',
  yAxisTitle: 'Revenue ($)'
});

chartBuilder.render('container');`
  },
  percentagestacked: {
    react: `import { BarChart } from '@cin7/highcharts-adapter/react';

function PercentageStackedChart() {
  const categories = ['Q1', 'Q2', 'Q3', 'Q4'];
  const series = [
    { name: 'Online', data: [35, 42, 48, 51] },
    { name: 'Retail', data: [45, 38, 35, 32] },
    { name: 'Wholesale', data: [20, 20, 17, 17] }
  ];

  return (
    <BarChart
      title="Sales Channel Distribution"
      subtitle="Percentage by Quarter"
      categories={categories}
      series={series}
      stacking="percent"
      yAxisTitle="Percentage (%)"
    />
  );
}`,
    vanilla: `import Highcharts from 'highcharts';

const chart = Highcharts.chart('container', {
  chart: { type: 'column' },
  title: { text: 'Sales Channel Distribution' },
  subtitle: { text: 'Percentage by Quarter' },
  xAxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] },
  yAxis: {
    title: { text: 'Percentage (%)' },
    labels: { format: '{value}%' }
  },
  plotOptions: {
    column: { stacking: 'percent' }
  },
  series: [
    { name: 'Online', data: [35, 42, 48, 51] },
    { name: 'Retail', data: [45, 38, 35, 32] },
    { name: 'Wholesale', data: [20, 20, 17, 17] }
  ]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['quarter', 'online', 'retail', 'wholesale'],
    data: [
      { quarter: 'Q1', online: 35, retail: 45, wholesale: 20 },
      { quarter: 'Q2', online: 42, retail: 38, wholesale: 20 },
      { quarter: 'Q3', online: 48, retail: 35, wholesale: 17 },
      { quarter: 'Q4', online: 51, retail: 32, wholesale: 17 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Percentage (%)' },
    maximum: 100,
    renderer: function(value) {
      return value + '%';
    }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['quarter']
  }],
  series: [{
    type: 'bar',
    xField: 'quarter',
    yField: ['online', 'retail', 'wholesale'],
    stacked: true,
    fullStack: true,
    title: ['Online', 'Retail', 'Wholesale']
  }]
});`,
    typescript: `import Highcharts from 'highcharts';

interface ChannelDistribution {
  quarter: string;
  online: number;
  retail: number;
  wholesale: number;
}

interface PercentageStackedConfig {
  title: string;
  subtitle?: string;
  data: ChannelDistribution[];
  yAxisTitle?: string;
}

class PercentageStackedBarChart {
  private config: PercentageStackedConfig;

  constructor(config: PercentageStackedConfig) {
    this.config = config;
  }

  private getCategories(): string[] {
    return this.config.data.map(item => item.quarter);
  }

  private getSeries(): Highcharts.SeriesOptionsType[] {
    const channels = ['online', 'retail', 'wholesale'];
    const colors = ['#5C6AC4', '#006FBB', '#47C1BF'];

    return channels.map((channel, index) => ({
      type: 'column' as const,
      name: channel.charAt(0).toUpperCase() + channel.slice(1),
      data: this.config.data.map(item => item[channel as keyof ChannelDistribution] as number),
      color: colors[index]
    }));
  }

  build(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
        backgroundColor: '#FFFFFF'
      },
      title: {
        text: this.config.title,
        style: { fontSize: '16px', fontWeight: 'bold' }
      },
      subtitle: {
        text: this.config.subtitle
      },
      xAxis: {
        categories: this.getCategories()
      },
      yAxis: {
        title: {
          text: this.config.yAxisTitle || 'Percentage (%)'
        },
        labels: {
          format: '{value}%'
        }
      },
      plotOptions: {
        column: {
          stacking: 'percent'
        }
      },
      series: this.getSeries(),
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}%<br/>Percentage: {point.percentage:.1f}%'
      },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom'
      },
      credits: {
        enabled: false
      }
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const channelData: ChannelDistribution[] = [
  { quarter: 'Q1', online: 35, retail: 45, wholesale: 20 },
  { quarter: 'Q2', online: 42, retail: 38, wholesale: 20 },
  { quarter: 'Q3', online: 48, retail: 35, wholesale: 17 },
  { quarter: 'Q4', online: 51, retail: 32, wholesale: 17 }
];

const chart = new PercentageStackedBarChart({
  title: 'Sales Channel Distribution',
  subtitle: 'Percentage by Quarter',
  data: channelData,
  yAxisTitle: 'Percentage (%)'
});

chart.render('container');`
  },
  grouped: {
    react: `import { BarChart } from '@cin7/highcharts-adapter/react';

function GroupedBarChart() {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const series = [
    { name: '2024', data: [42000, 45000, 48000, 51000, 54000] },
    { name: '2025', data: [45000, 48000, 52000, 55000, 58000] }
  ];

  return (
    <BarChart
      title="Revenue Comparison"
      subtitle="Year over Year"
      categories={categories}
      series={series}
      yAxisTitle="Revenue ($)"
      grouped={true}
    />
  );
}`,
    vanilla: `import Highcharts from 'highcharts';

const chart = Highcharts.chart('container', {
  chart: { type: 'column' },
  title: { text: 'Revenue Comparison' },
  subtitle: { text: 'Year over Year' },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] },
  yAxis: { title: { text: 'Revenue ($)' } },
  plotOptions: {
    column: { grouping: true }
  },
  series: [
    { name: '2024', data: [42000, 45000, 48000, 51000, 54000] },
    { name: '2025', data: [45000, 48000, 52000, 55000, 58000] }
  ]
});`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['month', 'revenue2024', 'revenue2025'],
    data: [
      { month: 'Jan', revenue2024: 42000, revenue2025: 45000 },
      { month: 'Feb', revenue2024: 45000, revenue2025: 48000 },
      { month: 'Mar', revenue2024: 48000, revenue2025: 52000 },
      { month: 'Apr', revenue2024: 51000, revenue2025: 55000 },
      { month: 'May', revenue2024: 54000, revenue2025: 58000 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: { text: 'Revenue ($)' }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['month']
  }],
  series: [{
    type: 'bar',
    xField: 'month',
    yField: 'revenue2024',
    title: '2024',
    style: { opacity: 0.8 }
  }, {
    type: 'bar',
    xField: 'month',
    yField: 'revenue2025',
    title: '2025',
    style: { opacity: 0.8 }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';

interface MonthlyComparison {
  month: string;
  revenue2024: number;
  revenue2025: number;
}

interface GroupedBarChartConfig {
  title: string;
  subtitle?: string;
  data: MonthlyComparison[];
  yAxisTitle?: string;
}

class GroupedBarChartBuilder {
  private config: GroupedBarChartConfig;

  constructor(config: GroupedBarChartConfig) {
    this.config = config;
  }

  private getCategories(): string[] {
    return this.config.data.map(item => item.month);
  }

  private getSeries(): Highcharts.SeriesOptionsType[] {
    return [
      {
        type: 'column' as const,
        name: '2024',
        data: this.config.data.map(item => item.revenue2024),
        color: '#5C6AC4'
      },
      {
        type: 'column' as const,
        name: '2025',
        data: this.config.data.map(item => item.revenue2025),
        color: '#006FBB'
      }
    ];
  }

  build(): Highcharts.Options {
    return {
      chart: {
        type: 'column',
        backgroundColor: '#FFFFFF'
      },
      title: {
        text: this.config.title,
        style: { fontSize: '16px', fontWeight: 'bold' }
      },
      subtitle: {
        text: this.config.subtitle
      },
      xAxis: {
        categories: this.getCategories()
      },
      yAxis: {
        title: {
          text: this.config.yAxisTitle || 'Revenue ($)'
        },
        labels: {
          format: '{value:,.0f}'
        }
      },
      plotOptions: {
        column: {
          grouping: true,
          pointPadding: 0.1,
          borderWidth: 0
        }
      },
      series: this.getSeries(),
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: \${point.y:,.0f}'
      },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom'
      },
      credits: {
        enabled: false
      }
    };
  }

  render(containerId: string): Highcharts.Chart {
    return Highcharts.chart(containerId, this.build());
  }
}

// Usage
const comparisonData: MonthlyComparison[] = [
  { month: 'Jan', revenue2024: 42000, revenue2025: 45000 },
  { month: 'Feb', revenue2024: 45000, revenue2025: 48000 },
  { month: 'Mar', revenue2024: 48000, revenue2025: 52000 },
  { month: 'Apr', revenue2024: 51000, revenue2025: 55000 },
  { month: 'May', revenue2024: 54000, revenue2025: 58000 }
];

const chartBuilder = new GroupedBarChartBuilder({
  title: 'Revenue Comparison',
  subtitle: 'Year over Year',
  data: comparisonData,
  yAxisTitle: 'Revenue ($)'
});

chartBuilder.render('container');`
  }
};

// PieChart Component Examples

export const pieChartExamples: Record<string, CodeVariant> = {
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

const calculatePercentage = (value: number, total: number): string => {
  return ((value / total) * 100).toFixed(1);
};

const calculateTotal = (data: PieSliceData[]): number => {
  return data.reduce((sum, slice) => sum + slice.value, 0);
};

// Configuration functions
const createTooltipConfig = (suffix: string = ''): TooltipConfig => ({
  pointFormat: '<b>{point.percentage:.1f}%</b>',
  valueSuffix: suffix
});

const createPieChartConfig = (options: Partial<PieChartConfig> = {}): PieChartConfig => ({
  showLegend: true,
  showDataLabels: true,
  enableTooltips: true,
  height: 400,
  ...options
});

// Sample data
const salesData: PieSliceData[] = [
  { name: 'Electronics', value: 450, color: '#0078D4', description: 'Tech products' },
  { name: 'Clothing', value: 320, color: '#00B7C3', description: 'Fashion items' },
  { name: 'Food', value: 180, color: '#8764B8', description: 'Groceries' },
  { name: 'Books', value: 90, color: '#D83B01', description: 'Publications' },
  { name: 'Other', value: 60, color: '#737373', description: 'Miscellaneous' }
];

const metadata: ChartMetadata = {
  title: 'Sales by Category',
  subtitle: 'Q4 2024 Distribution',
  period: 'October - December 2024'
};

const config = createPieChartConfig({
  showLegend: true,
  showDataLabels: true,
  enableTooltips: true,
  height: 400
});

// Transform data and calculate metrics
const points = transformToPiePoints(salesData);
const total = calculateTotal(salesData);
const tooltipConfig = createTooltipConfig(' sales');

// Create the pie chart
Highcharts.chart('container', {
  chart: {
    type: 'pie',
    height: config.height
  },
  title: {
    text: metadata.title
  },
  subtitle: {
    text: metadata.subtitle
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: config.showDataLabels,
        format: '<b>{point.name}</b>: {point.percentage:.1f}%'
      },
      showInLegend: config.showLegend
    }
  },
  tooltip: config.enableTooltips ? {
    pointFormat: tooltipConfig.pointFormat + tooltipConfig.valueSuffix
  } : {
    enabled: false
  },
  series: [{
    type: 'pie',
    name: 'Sales',
    data: points
  }] as SeriesPieOptions[]
});

// Log summary statistics
console.log(\`Total Sales: \${total}\`);
salesData.forEach(slice => {
  console.log(\`\${slice.name}: \${calculatePercentage(slice.value, total)}%\`);
});`
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
  }

};

// AreaChart Component Examples

export const areaChartExamples: Record<string, CodeVariant> = {
  default: {
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

export default MonthlyRevenue;`,
    vanilla: `// Vanilla JS with Highcharts
Highcharts.chart('container', {
  chart: {
    type: 'area',
    height: 400
  },
  title: {
    text: 'Monthly Revenue Trend'
  },
  subtitle: {
    text: '2025'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: 'Revenue ($K)'
    }
  },
  series: [{
    name: 'Revenue',
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  }]
});`,
    extjs: `// ExtJS Area Chart
Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['month', 'revenue'],
    data: [
      { month: 'Jan', revenue: 29.9 },
      { month: 'Feb', revenue: 71.5 },
      { month: 'Mar', revenue: 106.4 },
      { month: 'Apr', revenue: 129.2 },
      { month: 'May', revenue: 144.0 },
      { month: 'Jun', revenue: 176.0 },
      { month: 'Jul', revenue: 135.6 },
      { month: 'Aug', revenue: 148.5 },
      { month: 'Sep', revenue: 216.4 },
      { month: 'Oct', revenue: 194.1 },
      { month: 'Nov', revenue: 95.6 },
      { month: 'Dec', revenue: 54.4 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: {
      text: 'Revenue ($K)'
    }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['month']
  }],
  series: [{
    type: 'area',
    xField: 'month',
    yField: 'revenue',
    style: {
      opacity: 0.7
    }
  }]
});`,
    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';
import type { SeriesAreaOptions } from 'highcharts';

interface ChartDataPoint {
  value: number;
  timestamp: Date;
}

interface MonthlyRevenueData {
  monthly: ChartDataPoint[];
  metadata: { year: string; currency: string; unit: string };
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

  const transformToChartData = (points: ChartDataPoint[]): number[] =>
    points.map(point => point.value);

  const generateCategories = (points: ChartDataPoint[]): string[] =>
    points.map(point => point.timestamp.toLocaleDateString('en-US', { month: 'short' }));

  const series: ChartSeries = [{
    name: 'Revenue',
    data: transformToChartData(data.monthly),
    type: 'area',
    tooltip: { valueSuffix: \` \${data.metadata.currency}\` }
  }];

  return (
    <AreaChart
      title="Monthly Revenue Trend"
      subtitle={data.metadata.year}
      series={series}
      xAxis={{ categories: generateCategories(data.monthly) }}
      yAxis={{ title: { text: \`Revenue (\${data.metadata.currency} \${data.metadata.unit})\` } }}
      height={height}
      plotOptions={{ area: { animation: enableAnimation, fillOpacity: 0.5 } }}
    />
  );
};

export default MonthlyRevenue;`,
  },
  stacked: {
    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

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

export default StackedSales;`,
    vanilla: `// Vanilla JS Stacked Area Chart
Highcharts.chart('container', {
  chart: {
    type: 'area',
    height: 400
  },
  title: {
    text: 'Sales by Product Line'
  },
  subtitle: {
    text: 'Cumulative Revenue'
  },
  xAxis: {
    categories: ['Q1 Week 1', 'Q1 Week 2', 'Q2 Week 1', 'Q2 Week 2', 'Q3 Week 1', 'Q3 Week 2', 'Q4 Week 1', 'Q4 Week 2']
  },
  yAxis: {
    title: {
      text: 'Total Revenue ($K)'
    }
  },
  plotOptions: {
    area: {
      stacking: 'normal'
    }
  },
  series: [{
    name: 'Electronics',
    data: [50, 60, 70, 80, 90, 100, 110, 120]
  }, {
    name: 'Clothing',
    data: [40, 50, 55, 65, 70, 75, 85, 90]
  }, {
    name: 'Food & Beverage',
    data: [30, 35, 40, 45, 50, 55, 60, 65]
  }, {
    name: 'Home & Garden',
    data: [20, 25, 30, 35, 40, 45, 50, 55]
  }]
});`,
    extjs: `// ExtJS Stacked Area Chart
Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['quarter', 'electronics', 'clothing', 'food', 'home'],
    data: [
      { quarter: 'Q1 Week 1', electronics: 50, clothing: 40, food: 30, home: 20 },
      { quarter: 'Q1 Week 2', electronics: 60, clothing: 50, food: 35, home: 25 },
      { quarter: 'Q2 Week 1', electronics: 70, clothing: 55, food: 40, home: 30 },
      { quarter: 'Q2 Week 2', electronics: 80, clothing: 65, food: 45, home: 35 },
      { quarter: 'Q3 Week 1', electronics: 90, clothing: 70, food: 50, home: 40 },
      { quarter: 'Q3 Week 2', electronics: 100, clothing: 75, food: 55, home: 45 },
      { quarter: 'Q4 Week 1', electronics: 110, clothing: 85, food: 60, home: 50 },
      { quarter: 'Q4 Week 2', electronics: 120, clothing: 90, food: 65, home: 55 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: {
      text: 'Total Revenue ($K)'
    }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['quarter']
  }],
  series: [{
    type: 'area',
    xField: 'quarter',
    yField: 'electronics',
    title: 'Electronics',
    stacked: true
  }, {
    type: 'area',
    xField: 'quarter',
    yField: 'clothing',
    title: 'Clothing',
    stacked: true
  }, {
    type: 'area',
    xField: 'quarter',
    yField: 'food',
    title: 'Food & Beverage',
    stacked: true
  }, {
    type: 'area',
    xField: 'quarter',
    yField: 'home',
    title: 'Home & Garden',
    stacked: true
  }]
});`,
    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';

interface ProductLineSeries {
  name: string;
  data: number[];
}

interface StackedSalesProps {
  series?: ProductLineSeries[];
  categories?: string[];
  height?: number;
}

const StackedSales: React.FC<StackedSalesProps> = ({
  series = [
    { name: 'Electronics', data: [50, 60, 70, 80, 90, 100, 110, 120] },
    { name: 'Clothing', data: [40, 50, 55, 65, 70, 75, 85, 90] },
    { name: 'Food & Beverage', data: [30, 35, 40, 45, 50, 55, 60, 65] },
    { name: 'Home & Garden', data: [20, 25, 30, 35, 40, 45, 50, 55] },
  ],
  categories = ['Q1 Week 1', 'Q1 Week 2', 'Q2 Week 1', 'Q2 Week 2', 'Q3 Week 1', 'Q3 Week 2', 'Q4 Week 1', 'Q4 Week 2'],
  height = 400
}) => {
  return (
    <AreaChart
      title="Sales by Product Line"
      subtitle="Cumulative Revenue"
      stacking="normal"
      series={series}
      xAxis={{
        categories: categories,
      }}
      yAxis={{
        title: { text: 'Total Revenue ($K)' },
      }}
      height={height}
    />
  );
};

export default StackedSales;`,
  },
  percentage: {
    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

function MarketShareChart() {
  return (
    <AreaChart
      title="Market Share Distribution"
      subtitle="Year over Year"
      stacking="percent"
      series={[
        {
          name: 'Product A',
          data: [50, 55, 58, 60, 62, 65],
        },
        {
          name: 'Product B',
          data: [30, 28, 27, 25, 24, 22],
        },
        {
          name: 'Product C',
          data: [20, 17, 15, 15, 14, 13],
        },
      ]}
      xAxis={{
        categories: ['2020', '2021', '2022', '2023', '2024', '2025'],
      }}
      yAxis={{
        title: { text: 'Market Share (%)' },
      }}
      tooltip={{
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y}K)<br/>',
        shared: true,
      }}
      height={400}
    />
  );
}

export default MarketShareChart;`,
    vanilla: `// Vanilla JS Percentage Area Chart
Highcharts.chart('container', {
  chart: {
    type: 'area',
    height: 400
  },
  title: {
    text: 'Market Share Distribution'
  },
  subtitle: {
    text: 'Year over Year'
  },
  xAxis: {
    categories: ['2020', '2021', '2022', '2023', '2024', '2025']
  },
  yAxis: {
    title: {
      text: 'Market Share (%)'
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y}K)<br/>',
    shared: true
  },
  plotOptions: {
    area: {
      stacking: 'percent'
    }
  },
  series: [{
    name: 'Product A',
    data: [50, 55, 58, 60, 62, 65]
  }, {
    name: 'Product B',
    data: [30, 28, 27, 25, 24, 22]
  }, {
    name: 'Product C',
    data: [20, 17, 15, 15, 14, 13]
  }]
});`,
    extjs: `// ExtJS Percentage Area Chart
Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['year', 'productA', 'productB', 'productC'],
    data: [
      { year: '2020', productA: 50, productB: 30, productC: 20 },
      { year: '2021', productA: 55, productB: 28, productC: 17 },
      { year: '2022', productA: 58, productB: 27, productC: 15 },
      { year: '2023', productA: 60, productB: 25, productC: 15 },
      { year: '2024', productA: 62, productB: 24, productC: 14 },
      { year: '2025', productA: 65, productB: 22, productC: 13 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: {
      text: 'Market Share (%)'
    },
    minimum: 0,
    maximum: 100
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['year']
  }],
  series: [{
    type: 'area',
    xField: 'year',
    yField: 'productA',
    title: 'Product A',
    stacked: true,
    fullStack: true
  }, {
    type: 'area',
    xField: 'year',
    yField: 'productB',
    title: 'Product B',
    stacked: true,
    fullStack: true
  }, {
    type: 'area',
    xField: 'year',
    yField: 'productC',
    title: 'Product C',
    stacked: true,
    fullStack: true
  }]
});`,
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

export default MarketShareChart;`,
  },
  splinearea: {
    react: `import { AreaChart } from '@cin7/highcharts-adapter/react';

function TrafficAnalysis() {
  return (
    <AreaChart
      title="Website Traffic Analysis"
      subtitle="Smooth Area Chart"
      smooth={true}
      markers={true}
      fillOpacity={0.5}
      series={[
        {
          name: 'Organic Traffic',
          data: [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000],
        },
        {
          name: 'Paid Traffic',
          data: [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650],
        },
      ]}
      xAxis={{
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      }}
      yAxis={{
        title: { text: 'Visitors' },
      }}
      tooltip={{
        shared: true,
        valueSuffix: ' visitors',
      }}
      height={400}
    />
  );
}

export default TrafficAnalysis;`,
    vanilla: `// Vanilla JS Spline Area Chart
Highcharts.chart('container', {
  chart: {
    type: 'areaspline',
    height: 400
  },
  title: {
    text: 'Website Traffic Analysis'
  },
  subtitle: {
    text: 'Smooth Area Chart'
  },
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    title: {
      text: 'Visitors'
    }
  },
  tooltip: {
    shared: true,
    valueSuffix: ' visitors'
  },
  plotOptions: {
    areaspline: {
      fillOpacity: 0.5,
      marker: {
        enabled: true,
        radius: 4
      }
    }
  },
  series: [{
    name: 'Organic Traffic',
    data: [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000]
  }, {
    name: 'Paid Traffic',
    data: [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650]
  }]
});`,
    extjs: `// ExtJS Spline Area Chart
Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 600,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['month', 'organic', 'paid'],
    data: [
      { month: 'Jan', organic: 1200, paid: 800 },
      { month: 'Feb', organic: 1350, paid: 850 },
      { month: 'Mar', organic: 1500, paid: 920 },
      { month: 'Apr', organic: 1680, paid: 1000 },
      { month: 'May', organic: 1850, paid: 1100 },
      { month: 'Jun', organic: 2100, paid: 1200 },
      { month: 'Jul', organic: 2250, paid: 1280 },
      { month: 'Aug', organic: 2400, paid: 1350 },
      { month: 'Sep', organic: 2550, paid: 1420 },
      { month: 'Oct', organic: 2700, paid: 1500 },
      { month: 'Nov', organic: 2850, paid: 1580 },
      { month: 'Dec', organic: 3000, paid: 1650 }
    ]
  }),
  axes: [{
    type: 'numeric',
    position: 'left',
    title: {
      text: 'Visitors'
    }
  }, {
    type: 'category',
    position: 'bottom',
    fields: ['month']
  }],
  series: [{
    type: 'area',
    xField: 'month',
    yField: 'organic',
    title: 'Organic Traffic',
    smooth: true,
    marker: {
      radius: 4
    },
    style: {
      opacity: 0.5
    }
  }, {
    type: 'area',
    xField: 'month',
    yField: 'paid',
    title: 'Paid Traffic',
    smooth: true,
    marker: {
      radius: 4
    },
    style: {
      opacity: 0.5
    }
  }]
});`,
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

export default TrafficAnalysis;`,
  },
};

// ScatterChart Component Examples

export const scatterChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function ScatterChart() {
  const options = {
    chart: { type: 'scatter' },
    title: { text: 'Height vs Weight' },
    xAxis: { title: { text: 'Height (cm)' } },
    yAxis: { title: { text: 'Weight (kg)' } },
    series: [{
      name: 'Observations',
      data: [[160, 65], [170, 70], [180, 85], [165, 68], [175, 78]]
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: {
    data: [
      { height: 160, weight: 65 },
      { height: 170, weight: 70 },
      { height: 180, weight: 85 }
    ]
  },
  axes: [
    { type: 'numeric', position: 'bottom', title: 'Height (cm)' },
    { type: 'numeric', position: 'left', title: 'Weight (kg)' }
  ],
  series: [{
    type: 'scatter',
    xField: 'height',
    yField: 'weight'
  }]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'scatter' },
  title: { text: 'Height vs Weight' },
  xAxis: { title: { text: 'Height (cm)' } },
  yAxis: { title: { text: 'Weight (kg)' } },
  series: [{
    name: 'Observations',
    data: [[160, 65], [170, 70], [180, 85]]
  }]
});`,
    typescript: `import Highcharts from 'highcharts';

interface DataPoint {
  height: number;
  weight: number;
}

const data: DataPoint[] = [
  { height: 160, weight: 65 },
  { height: 170, weight: 70 },
  { height: 180, weight: 85 }
];

const options: Highcharts.Options = {
  chart: { type: 'scatter' },
  title: { text: 'Height vs Weight' },
  xAxis: { title: { text: 'Height (cm)' } },
  yAxis: { title: { text: 'Weight (kg)' } },
  series: [{
    type: 'scatter',
    name: 'Observations',
    data: data.map(d => [d.height, d.weight])
  }]
};

Highcharts.chart('container', options);`
  },
  bubble: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

function BubbleChart() {
  const options = {
    chart: { type: 'bubble' },
    title: { text: 'Product Performance' },
    xAxis: { title: { text: 'Sales Volume' } },
    yAxis: { title: { text: 'Profit Margin (%)' } },
    series: [{
      name: 'Products',
      data: [
        { x: 1000, y: 25, z: 50 },
        { x: 1500, y: 30, z: 75 },
        { x: 800, y: 20, z: 40 }
      ]
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: {
    data: [
      { sales: 1000, margin: 25, size: 50 },
      { sales: 1500, margin: 30, size: 75 },
      { sales: 800, margin: 20, size: 40 }
    ]
  },
  axes: [
    { type: 'numeric', position: 'bottom', title: 'Sales Volume' },
    { type: 'numeric', position: 'left', title: 'Profit Margin (%)' }
  ],
  series: [{
    type: 'scatter',
    xField: 'sales',
    yField: 'margin',
    marker: {
      radius: function(sprite, config, data, index) {
        return data.size / 2;
      }
    }
  }]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'bubble' },
  title: { text: 'Product Performance' },
  xAxis: { title: { text: 'Sales Volume' } },
  yAxis: { title: { text: 'Profit Margin (%)' } },
  series: [{
    name: 'Products',
    data: [
      { x: 1000, y: 25, z: 50 },
      { x: 1500, y: 30, z: 75 },
      { x: 800, y: 20, z: 40 }
    ]
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

interface BubbleDataPoint {
  x: number;
  y: number;
  z: number;
  name?: string;
}

const bubbleData: BubbleDataPoint[] = [
  { x: 1000, y: 25, z: 50, name: 'Product A' },
  { x: 1500, y: 30, z: 75, name: 'Product B' },
  { x: 800, y: 20, z: 40, name: 'Product C' }
];

const options: Highcharts.Options = {
  chart: { type: 'bubble' },
  title: { text: 'Product Performance' },
  xAxis: { title: { text: 'Sales Volume' } },
  yAxis: { title: { text: 'Profit Margin (%)' } },
  series: [{
    type: 'bubble',
    name: 'Products',
    data: bubbleData
  }]
};

Highcharts.chart('container', options);`
  },
  regression: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function RegressionChart() {
  const scatterData = [[5, 2], [10, 8], [15, 16], [20, 23], [25, 32]];

  // Calculate linear regression
  const regression = calculateRegression(scatterData);
  const regressionLine = scatterData.map(point => [point[0], regression.slope * point[0] + regression.intercept]);

  const options = {
    chart: { type: 'scatter' },
    title: { text: 'Sales Trend with Regression' },
    xAxis: { title: { text: 'Month' } },
    yAxis: { title: { text: 'Sales ($1000)' } },
    series: [
      {
        type: 'scatter',
        name: 'Actual Sales',
        data: scatterData,
        marker: { radius: 4 }
      },
      {
        type: 'line',
        name: 'Trend Line',
        data: regressionLine,
        marker: { enabled: false },
        enableMouseTracking: false
      }
    ]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

function calculateRegression(data) {
  const n = data.length;
  const sumX = data.reduce((sum, p) => sum + p[0], 0);
  const sumY = data.reduce((sum, p) => sum + p[1], 0);
  const sumXY = data.reduce((sum, p) => sum + p[0] * p[1], 0);
  const sumX2 = data.reduce((sum, p) => sum + p[0] * p[0], 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: {
    data: [
      { month: 5, sales: 2 },
      { month: 10, sales: 8 },
      { month: 15, sales: 16 },
      { month: 20, sales: 23 },
      { month: 25, sales: 32 }
    ]
  },
  axes: [
    { type: 'numeric', position: 'bottom', title: 'Month' },
    { type: 'numeric', position: 'left', title: 'Sales ($1000)' }
  ],
  series: [
    {
      type: 'scatter',
      xField: 'month',
      yField: 'sales',
      marker: { type: 'circle', radius: 4 }
    },
    {
      type: 'line',
      xField: 'month',
      yField: 'sales',
      smooth: true,
      style: { lineWidth: 2, stroke: '#ff0000' }
    }
  ]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'scatter' },
  title: { text: 'Sales Trend with Regression' },
  xAxis: { title: { text: 'Month' } },
  yAxis: { title: { text: 'Sales ($1000)' } },
  series: [
    {
      type: 'scatter',
      name: 'Actual Sales',
      data: [[5, 2], [10, 8], [15, 16], [20, 23], [25, 32]],
      marker: { radius: 4 }
    },
    {
      type: 'line',
      name: 'Trend Line',
      data: [[5, 3.2], [10, 9.4], [15, 15.6], [20, 21.8], [25, 28]],
      marker: { enabled: false },
      enableMouseTracking: false
    }
  ]
});`,
    typescript: `import Highcharts from 'highcharts';

interface Point {
  x: number;
  y: number;
}

interface RegressionResult {
  slope: number;
  intercept: number;
  rSquared: number;
}

function calculateLinearRegression(points: Point[]): RegressionResult {
  const n = points.length;
  const sumX = points.reduce((sum, p) => sum + p.x, 0);
  const sumY = points.reduce((sum, p) => sum + p.y, 0);
  const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = points.reduce((sum, p) => sum + p.x * p.x, 0);
  const sumY2 = points.reduce((sum, p) => sum + p.y * p.y, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const yMean = sumY / n;
  const ssTotal = points.reduce((sum, p) => sum + Math.pow(p.y - yMean, 2), 0);
  const ssResidual = points.reduce((sum, p) => sum + Math.pow(p.y - (slope * p.x + intercept), 2), 0);
  const rSquared = 1 - (ssResidual / ssTotal);

  return { slope, intercept, rSquared };
}

const scatterData: Point[] = [
  { x: 5, y: 2 },
  { x: 10, y: 8 },
  { x: 15, y: 16 },
  { x: 20, y: 23 },
  { x: 25, y: 32 }
];

const regression = calculateLinearRegression(scatterData);
const regressionLine = scatterData.map(p => ({
  x: p.x,
  y: regression.slope * p.x + regression.intercept
}));

const options: Highcharts.Options = {
  chart: { type: 'scatter' },
  title: { text: \`Sales Trend (R² = \${regression.rSquared.toFixed(3)})\` },
  xAxis: { title: { text: 'Month' } },
  yAxis: { title: { text: 'Sales ($1000)' } },
  series: [
    {
      type: 'scatter',
      name: 'Actual Sales',
      data: scatterData.map(p => [p.x, p.y]),
      marker: { radius: 4 }
    },
    {
      type: 'line',
      name: 'Trend Line',
      data: regressionLine.map(p => [p.x, p.y]),
      marker: { enabled: false },
      enableMouseTracking: false
    }
  ]
};

Highcharts.chart('container', options);`
  },
  multiple: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function MultipleSeriesScatter() {
  const options = {
    chart: { type: 'scatter' },
    title: { text: 'Customer Segments' },
    xAxis: { title: { text: 'Purchase Frequency' } },
    yAxis: { title: { text: 'Average Order Value ($)' } },
    series: [
      {
        name: 'Premium',
        color: '#7CB5EC',
        data: [[12, 250], [15, 300], [18, 275], [20, 320]]
      },
      {
        name: 'Standard',
        color: '#90ED7D',
        data: [[8, 150], [10, 180], [12, 160], [14, 190]]
      },
      {
        name: 'Budget',
        color: '#F7A35C',
        data: [[4, 80], [6, 100], [5, 90], [7, 110]]
      }
    ]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: {
    data: [
      { segment: 'Premium', frequency: 12, value: 250 },
      { segment: 'Premium', frequency: 15, value: 300 },
      { segment: 'Standard', frequency: 8, value: 150 },
      { segment: 'Standard', frequency: 10, value: 180 },
      { segment: 'Budget', frequency: 4, value: 80 },
      { segment: 'Budget', frequency: 6, value: 100 }
    ]
  },
  axes: [
    { type: 'numeric', position: 'bottom', title: 'Purchase Frequency' },
    { type: 'numeric', position: 'left', title: 'Average Order Value ($)' }
  ],
  series: [
    {
      type: 'scatter',
      xField: 'frequency',
      yField: 'value',
      title: 'Premium',
      store: { filters: [{ property: 'segment', value: 'Premium' }] },
      marker: { fill: '#7CB5EC' }
    },
    {
      type: 'scatter',
      xField: 'frequency',
      yField: 'value',
      title: 'Standard',
      store: { filters: [{ property: 'segment', value: 'Standard' }] },
      marker: { fill: '#90ED7D' }
    },
    {
      type: 'scatter',
      xField: 'frequency',
      yField: 'value',
      title: 'Budget',
      store: { filters: [{ property: 'segment', value: 'Budget' }] },
      marker: { fill: '#F7A35C' }
    }
  ]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'scatter' },
  title: { text: 'Customer Segments' },
  xAxis: { title: { text: 'Purchase Frequency' } },
  yAxis: { title: { text: 'Average Order Value ($)' } },
  series: [
    {
      name: 'Premium',
      color: '#7CB5EC',
      data: [[12, 250], [15, 300], [18, 275], [20, 320]]
    },
    {
      name: 'Standard',
      color: '#90ED7D',
      data: [[8, 150], [10, 180], [12, 160], [14, 190]]
    },
    {
      name: 'Budget',
      color: '#F7A35C',
      data: [[4, 80], [6, 100], [5, 90], [7, 110]]
    }
  ]
});`,
    typescript: `import Highcharts from 'highcharts';

type CustomerSegment = 'Premium' | 'Standard' | 'Budget';

interface CustomerData {
  segment: CustomerSegment;
  frequency: number;
  orderValue: number;
}

interface SeriesData {
  name: CustomerSegment;
  color: string;
  data: [number, number][];
}

const customerData: CustomerData[] = [
  { segment: 'Premium', frequency: 12, orderValue: 250 },
  { segment: 'Premium', frequency: 15, orderValue: 300 },
  { segment: 'Premium', frequency: 18, orderValue: 275 },
  { segment: 'Premium', frequency: 20, orderValue: 320 },
  { segment: 'Standard', frequency: 8, orderValue: 150 },
  { segment: 'Standard', frequency: 10, orderValue: 180 },
  { segment: 'Standard', frequency: 12, orderValue: 160 },
  { segment: 'Standard', frequency: 14, orderValue: 190 },
  { segment: 'Budget', frequency: 4, orderValue: 80 },
  { segment: 'Budget', frequency: 6, orderValue: 100 },
  { segment: 'Budget', frequency: 5, orderValue: 90 },
  { segment: 'Budget', frequency: 7, orderValue: 110 }
];

const segmentColors: Record<CustomerSegment, string> = {
  Premium: '#7CB5EC',
  Standard: '#90ED7D',
  Budget: '#F7A35C'
};

const series: SeriesData[] = ['Premium', 'Standard', 'Budget'].map(segment => ({
  name: segment as CustomerSegment,
  color: segmentColors[segment as CustomerSegment],
  data: customerData
    .filter(d => d.segment === segment)
    .map(d => [d.frequency, d.orderValue] as [number, number])
}));

const options: Highcharts.Options = {
  chart: { type: 'scatter' },
  title: { text: 'Customer Segments' },
  xAxis: { title: { text: 'Purchase Frequency' } },
  yAxis: { title: { text: 'Average Order Value ($)' } },
  series: series.map(s => ({
    type: 'scatter',
    name: s.name,
    color: s.color,
    data: s.data
  }))
};

Highcharts.chart('container', options);`
  }
};

// WaterfallChart Component Examples

export const waterfallChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

// Initialize waterfall module
HighchartsMore(Highcharts);

function WaterfallChart() {
  const options = {
    chart: { type: 'waterfall' },
    title: { text: 'Financial Analysis' },
    xAxis: {
      type: 'category',
      categories: ['Start', 'Revenue', 'Costs', 'Net']
    },
    yAxis: { title: { text: 'Amount ($)' } },
    series: [{
      type: 'waterfall',
      name: 'Cash Flow',
      data: [
        { y: 120000, color: '#008FFB' },
        { y: 50000, color: '#00E396' },
        { y: -30000, color: '#FF4560' },
        { y: 140000, isSum: true, color: '#775DD0' }
      ]
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: Ext.create('Ext.data.Store', {
    fields: ['category', 'value', 'isSum'],
    data: [
      { category: 'Start', value: 120000, isSum: false },
      { category: 'Revenue', value: 50000, isSum: false },
      { category: 'Costs', value: -30000, isSum: false },
      { category: 'Net', value: 140000, isSum: true }
    ]
  }),
  axes: [
    { type: 'category', position: 'bottom', fields: ['category'] },
    { type: 'numeric', position: 'left', fields: ['value'], title: { text: 'Amount ($)' } }
  ],
  series: [{
    type: 'bar',
    xField: 'category',
    yField: 'value',
    renderer: function(sprite, config, rendererData, index) {
      var store = rendererData.store;
      var record = store.getAt(index);
      var isSum = record.get('isSum');
      var value = record.get('value');

      return {
        fillStyle: isSum ? '#775DD0' : (value >= 0 ? '#00E396' : '#FF4560')
      };
    }
  }]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'waterfall' },
  title: { text: 'Financial Analysis' },
  xAxis: {
    type: 'category',
    categories: ['Start', 'Revenue', 'Costs', 'Net']
  },
  yAxis: { title: { text: 'Amount ($)' } },
  series: [{
    type: 'waterfall',
    name: 'Cash Flow',
    data: [
      { y: 120000, color: '#008FFB' },
      { y: 50000, color: '#00E396' },
      { y: -30000, color: '#FF4560' },
      { y: 140000, isSum: true, color: '#775DD0' }
    ]
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

interface WaterfallDataPoint {
  y: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
}

const options: Highcharts.Options = {
  chart: { type: 'waterfall' },
  title: { text: 'Financial Analysis' },
  xAxis: {
    type: 'category',
    categories: ['Start', 'Revenue', 'Costs', 'Net']
  },
  yAxis: { title: { text: 'Amount ($)' } },
  series: [{
    type: 'waterfall',
    name: 'Cash Flow',
    data: [
      { y: 120000, color: '#008FFB' } as WaterfallDataPoint,
      { y: 50000, color: '#00E396' } as WaterfallDataPoint,
      { y: -30000, color: '#FF4560' } as WaterfallDataPoint,
      { y: 140000, isSum: true, color: '#775DD0' } as WaterfallDataPoint
    ]
  }]
};

Highcharts.chart('container', options);`
  },
  profitloss: {
    react: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

function ProfitLossWaterfall() {
  const options = {
    chart: { type: 'waterfall' },
    title: { text: 'Quarterly Profit & Loss Statement' },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: { text: 'USD ($)' }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>\${point.y:,.0f}</b> USD'
    },
    series: [{
      type: 'waterfall',
      upColor: '#00E396',
      color: '#FF4560',
      data: [
        { name: 'Start', y: 0, color: '#008FFB' },
        { name: 'Product Revenue', y: 1200000 },
        { name: 'Service Revenue', y: 400000 },
        { name: 'Total Revenue', isIntermediateSum: true, color: '#775DD0' },
        { name: 'Fixed Costs', y: -400000 },
        { name: 'Variable Costs', y: -500000 },
        { name: 'Total Costs', isIntermediateSum: true, color: '#FEB019' },
        { name: 'Operating Income', isSum: true, color: '#00D9E9' }
      ],
      dataLabels: {
        enabled: true,
        formatter: function() {
          return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
        }
      }
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['name', 'value', 'isSum', 'isIntermediate'],
    data: [
      { name: 'Start', value: 0, isSum: false, isIntermediate: false },
      { name: 'Product Revenue', value: 1200000, isSum: false, isIntermediate: false },
      { name: 'Service Revenue', value: 400000, isSum: false, isIntermediate: false },
      { name: 'Total Revenue', value: 1600000, isSum: false, isIntermediate: true },
      { name: 'Fixed Costs', value: -400000, isSum: false, isIntermediate: false },
      { name: 'Variable Costs', value: -500000, isSum: false, isIntermediate: false },
      { name: 'Total Costs', value: -900000, isSum: false, isIntermediate: true },
      { name: 'Operating Income', value: 700000, isSum: true, isIntermediate: false }
    ]
  }),
  axes: [
    { type: 'category', position: 'bottom', fields: ['name'], label: { rotate: { degrees: -45 } } },
    { type: 'numeric', position: 'left', fields: ['value'], title: { text: 'USD ($)' } }
  ],
  series: [{
    type: 'bar',
    xField: 'name',
    yField: 'value',
    label: {
      field: 'value',
      display: 'insideEnd',
      renderer: function(value) {
        return Ext.util.Format.number(value / 1000, '0,0') + 'k';
      }
    },
    renderer: function(sprite, config, rendererData, index) {
      var store = rendererData.store;
      var record = store.getAt(index);
      var isSum = record.get('isSum');
      var isIntermediate = record.get('isIntermediate');
      var value = record.get('value');

      var color;
      if (isSum) color = '#00D9E9';
      else if (isIntermediate) color = value >= 0 ? '#775DD0' : '#FEB019';
      else color = value >= 0 ? '#00E396' : '#FF4560';

      return { fillStyle: color };
    }
  }]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'waterfall' },
  title: { text: 'Quarterly Profit & Loss Statement' },
  xAxis: { type: 'category' },
  yAxis: { title: { text: 'USD ($)' } },
  legend: { enabled: false },
  tooltip: {
    pointFormat: '<b>\${point.y:,.0f}</b> USD'
  },
  series: [{
    type: 'waterfall',
    upColor: '#00E396',
    color: '#FF4560',
    data: [
      { name: 'Start', y: 0, color: '#008FFB' },
      { name: 'Product Revenue', y: 1200000 },
      { name: 'Service Revenue', y: 400000 },
      { name: 'Total Revenue', isIntermediateSum: true, color: '#775DD0' },
      { name: 'Fixed Costs', y: -400000 },
      { name: 'Variable Costs', y: -500000 },
      { name: 'Total Costs', isIntermediateSum: true, color: '#FEB019' },
      { name: 'Operating Income', isSum: true, color: '#00D9E9' }
    ],
    dataLabels: {
      enabled: true,
      formatter: function() {
        return Highcharts.numberFormat(this.y / 1000, 0, ',') + 'k';
      }
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

interface PLDataPoint extends Highcharts.PointOptionsObject {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
}

const plData: PLDataPoint[] = [
  { name: 'Start', y: 0, color: '#008FFB' },
  { name: 'Product Revenue', y: 1200000 },
  { name: 'Service Revenue', y: 400000 },
  { name: 'Total Revenue', isIntermediateSum: true, color: '#775DD0' },
  { name: 'Fixed Costs', y: -400000 },
  { name: 'Variable Costs', y: -500000 },
  { name: 'Total Costs', isIntermediateSum: true, color: '#FEB019' },
  { name: 'Operating Income', isSum: true, color: '#00D9E9' }
];

const options: Highcharts.Options = {
  chart: { type: 'waterfall' },
  title: { text: 'Quarterly Profit & Loss Statement' },
  xAxis: { type: 'category' },
  yAxis: { title: { text: 'USD ($)' } },
  legend: { enabled: false },
  tooltip: {
    pointFormat: '<b>\${point.y:,.0f}</b> USD'
  },
  series: [{
    type: 'waterfall',
    upColor: '#00E396',
    color: '#FF4560',
    data: plData,
    dataLabels: {
      enabled: true,
      formatter: function() {
        return Highcharts.numberFormat(this.y as number / 1000, 0, ',') + 'k';
      }
    }
  }]
};

Highcharts.chart('container', options);`
  },
  cashflow: {
    react: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

function CashFlowWaterfall() {
  const options = {
    chart: { type: 'waterfall' },
    title: { text: 'Monthly Cash Flow Analysis' },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: { text: 'Cash ($)' }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>\${point.y:,.2f}</b>'
    },
    series: [{
      type: 'waterfall',
      upColor: '#00E396',
      color: '#FF4560',
      data: [
        { name: 'Beginning Cash', y: 50000, color: '#008FFB' },
        { name: 'Sales Collection', y: 120000 },
        { name: 'Supplier Payments', y: -45000 },
        { name: 'Salary Payments', y: -35000 },
        { name: 'Operating Cash', isIntermediateSum: true, color: '#775DD0' },
        { name: 'Equipment Purchase', y: -25000 },
        { name: 'Loan Received', y: 40000 },
        { name: 'Tax Payment', y: -15000 },
        { name: 'Ending Cash', isSum: true, color: '#00D9E9' }
      ],
      dataLabels: {
        enabled: true,
        formatter: function() {
          return '$' + Highcharts.numberFormat(Math.abs(this.y) / 1000, 0) + 'k';
        },
        style: {
          fontWeight: 'bold'
        }
      },
      pointPadding: 0
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 900,
  height: 450,
  store: Ext.create('Ext.data.Store', {
    fields: ['activity', 'amount', 'type'],
    data: [
      { activity: 'Beginning Cash', amount: 50000, type: 'start' },
      { activity: 'Sales Collection', amount: 120000, type: 'inflow' },
      { activity: 'Supplier Payments', amount: -45000, type: 'outflow' },
      { activity: 'Salary Payments', amount: -35000, type: 'outflow' },
      { activity: 'Operating Cash', amount: 90000, type: 'intermediate' },
      { activity: 'Equipment Purchase', amount: -25000, type: 'outflow' },
      { activity: 'Loan Received', amount: 40000, type: 'inflow' },
      { activity: 'Tax Payment', amount: -15000, type: 'outflow' },
      { activity: 'Ending Cash', amount: 90000, type: 'total' }
    ]
  }),
  axes: [
    {
      type: 'category',
      position: 'bottom',
      fields: ['activity'],
      label: { rotate: { degrees: -45 } }
    },
    {
      type: 'numeric',
      position: 'left',
      fields: ['amount'],
      title: { text: 'Cash ($)' },
      label: {
        renderer: function(value) {
          return '$' + Ext.util.Format.number(value / 1000, '0') + 'k';
        }
      }
    }
  ],
  series: [{
    type: 'bar',
    xField: 'activity',
    yField: 'amount',
    label: {
      field: 'amount',
      display: 'insideEnd',
      renderer: function(value) {
        return '$' + Ext.util.Format.number(Math.abs(value) / 1000, '0') + 'k';
      }
    },
    renderer: function(sprite, config, rendererData, index) {
      var store = rendererData.store;
      var record = store.getAt(index);
      var type = record.get('type');
      var amount = record.get('amount');

      var colorMap = {
        start: '#008FFB',
        inflow: '#00E396',
        outflow: '#FF4560',
        intermediate: '#775DD0',
        total: '#00D9E9'
      };

      return { fillStyle: colorMap[type] || '#999' };
    }
  }]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'waterfall' },
  title: { text: 'Monthly Cash Flow Analysis' },
  xAxis: { type: 'category' },
  yAxis: { title: { text: 'Cash ($)' } },
  legend: { enabled: false },
  tooltip: {
    pointFormat: '<b>\${point.y:,.2f}</b>'
  },
  series: [{
    type: 'waterfall',
    upColor: '#00E396',
    color: '#FF4560',
    data: [
      { name: 'Beginning Cash', y: 50000, color: '#008FFB' },
      { name: 'Sales Collection', y: 120000 },
      { name: 'Supplier Payments', y: -45000 },
      { name: 'Salary Payments', y: -35000 },
      { name: 'Operating Cash', isIntermediateSum: true, color: '#775DD0' },
      { name: 'Equipment Purchase', y: -25000 },
      { name: 'Loan Received', y: 40000 },
      { name: 'Tax Payment', y: -15000 },
      { name: 'Ending Cash', isSum: true, color: '#00D9E9' }
    ],
    dataLabels: {
      enabled: true,
      formatter: function() {
        return '$' + Highcharts.numberFormat(Math.abs(this.y) / 1000, 0) + 'k';
      },
      style: { fontWeight: 'bold' }
    },
    pointPadding: 0
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

interface CashFlowPoint extends Highcharts.PointOptionsObject {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
}

const cashFlowData: CashFlowPoint[] = [
  { name: 'Beginning Cash', y: 50000, color: '#008FFB' },
  { name: 'Sales Collection', y: 120000 },
  { name: 'Supplier Payments', y: -45000 },
  { name: 'Salary Payments', y: -35000 },
  { name: 'Operating Cash', isIntermediateSum: true, color: '#775DD0' },
  { name: 'Equipment Purchase', y: -25000 },
  { name: 'Loan Received', y: 40000 },
  { name: 'Tax Payment', y: -15000 },
  { name: 'Ending Cash', isSum: true, color: '#00D9E9' }
];

const options: Highcharts.Options = {
  chart: { type: 'waterfall' },
  title: { text: 'Monthly Cash Flow Analysis' },
  xAxis: { type: 'category' },
  yAxis: { title: { text: 'Cash ($)' } },
  legend: { enabled: false },
  tooltip: {
    pointFormat: '<b>\${point.y:,.2f}</b>'
  },
  series: [{
    type: 'waterfall',
    upColor: '#00E396',
    color: '#FF4560',
    data: cashFlowData,
    dataLabels: {
      enabled: true,
      formatter: function() {
        return '$' + Highcharts.numberFormat(Math.abs(this.y as number) / 1000, 0) + 'k';
      },
      style: { fontWeight: 'bold' }
    },
    pointPadding: 0
  }]
};

Highcharts.chart('container', options);`
  },
  productcomparison: {
    react: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);

function ProductComparisonWaterfall() {
  const options = {
    chart: { type: 'waterfall' },
    title: { text: 'Product Feature Value Comparison' },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: { text: 'Value Score' }
    },
    legend: { enabled: false },
    tooltip: {
      pointFormat: '<b>{point.y}</b> points'
    },
    series: [{
      type: 'waterfall',
      upColor: '#00E396',
      color: '#FF4560',
      data: [
        { name: 'Base Product', y: 100, color: '#008FFB' },
        { name: 'Premium Materials', y: 25 },
        { name: 'Advanced Features', y: 40 },
        { name: 'Enhanced Version', isIntermediateSum: true, color: '#775DD0' },
        { name: 'Extended Warranty', y: 15 },
        { name: 'Priority Support', y: 20 },
        { name: 'Complexity Penalty', y: -10 },
        { name: 'Training Required', y: -5 },
        { name: 'Final Product Value', isSum: true, color: '#00D9E9' }
      ],
      dataLabels: {
        enabled: true,
        formatter: function() {
          const prefix = this.y > 0 ? '+' : '';
          return prefix + this.y;
        },
        style: {
          color: '#000',
          fontWeight: 'bold',
          textOutline: '1px contrast'
        }
      }
    }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  renderTo: Ext.getBody(),
  width: 900,
  height: 400,
  store: Ext.create('Ext.data.Store', {
    fields: ['feature', 'score', 'cumulative', 'type'],
    data: [
      { feature: 'Base Product', score: 100, cumulative: 100, type: 'base' },
      { feature: 'Premium Materials', score: 25, cumulative: 125, type: 'positive' },
      { feature: 'Advanced Features', score: 40, cumulative: 165, type: 'positive' },
      { feature: 'Enhanced Version', score: 165, cumulative: 165, type: 'intermediate' },
      { feature: 'Extended Warranty', score: 15, cumulative: 180, type: 'positive' },
      { feature: 'Priority Support', score: 20, cumulative: 200, type: 'positive' },
      { feature: 'Complexity Penalty', score: -10, cumulative: 190, type: 'negative' },
      { feature: 'Training Required', score: -5, cumulative: 185, type: 'negative' },
      { feature: 'Final Product Value', score: 185, cumulative: 185, type: 'total' }
    ]
  }),
  axes: [
    {
      type: 'category',
      position: 'bottom',
      fields: ['feature'],
      label: { rotate: { degrees: -45 } }
    },
    {
      type: 'numeric',
      position: 'left',
      fields: ['score'],
      title: { text: 'Value Score' }
    }
  ],
  series: [{
    type: 'bar',
    xField: 'feature',
    yField: 'score',
    label: {
      field: 'score',
      display: 'insideEnd',
      renderer: function(value) {
        var prefix = value > 0 ? '+' : '';
        return prefix + value;
      }
    },
    renderer: function(sprite, config, rendererData, index) {
      var store = rendererData.store;
      var record = store.getAt(index);
      var type = record.get('type');

      var colorMap = {
        base: '#008FFB',
        positive: '#00E396',
        negative: '#FF4560',
        intermediate: '#775DD0',
        total: '#00D9E9'
      };

      return { fillStyle: colorMap[type] || '#999' };
    }
  }]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'waterfall' },
  title: { text: 'Product Feature Value Comparison' },
  xAxis: { type: 'category' },
  yAxis: { title: { text: 'Value Score' } },
  legend: { enabled: false },
  tooltip: {
    pointFormat: '<b>{point.y}</b> points'
  },
  series: [{
    type: 'waterfall',
    upColor: '#00E396',
    color: '#FF4560',
    data: [
      { name: 'Base Product', y: 100, color: '#008FFB' },
      { name: 'Premium Materials', y: 25 },
      { name: 'Advanced Features', y: 40 },
      { name: 'Enhanced Version', isIntermediateSum: true, color: '#775DD0' },
      { name: 'Extended Warranty', y: 15 },
      { name: 'Priority Support', y: 20 },
      { name: 'Complexity Penalty', y: -10 },
      { name: 'Training Required', y: -5 },
      { name: 'Final Product Value', isSum: true, color: '#00D9E9' }
    ],
    dataLabels: {
      enabled: true,
      formatter: function() {
        const prefix = this.y > 0 ? '+' : '';
        return prefix + this.y;
      },
      style: {
        color: '#000',
        fontWeight: 'bold',
        textOutline: '1px contrast'
      }
    }
  }]
});`,
    typescript: `import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

interface ProductValuePoint extends Highcharts.PointOptionsObject {
  name: string;
  y?: number;
  color?: string;
  isSum?: boolean;
  isIntermediateSum?: boolean;
}

const productData: ProductValuePoint[] = [
  { name: 'Base Product', y: 100, color: '#008FFB' },
  { name: 'Premium Materials', y: 25 },
  { name: 'Advanced Features', y: 40 },
  { name: 'Enhanced Version', isIntermediateSum: true, color: '#775DD0' },
  { name: 'Extended Warranty', y: 15 },
  { name: 'Priority Support', y: 20 },
  { name: 'Complexity Penalty', y: -10 },
  { name: 'Training Required', y: -5 },
  { name: 'Final Product Value', isSum: true, color: '#00D9E9' }
];

const options: Highcharts.Options = {
  chart: { type: 'waterfall' },
  title: { text: 'Product Feature Value Comparison' },
  xAxis: { type: 'category' },
  yAxis: { title: { text: 'Value Score' } },
  legend: { enabled: false },
  tooltip: {
    pointFormat: '<b>{point.y}</b> points'
  },
  series: [{
    type: 'waterfall',
    upColor: '#00E396',
    color: '#FF4560',
    data: productData,
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
  }]
};

Highcharts.chart('container', options);`
  }
};

// FormPanel Component Examples
