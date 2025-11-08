import type { Meta, StoryObj } from '@storybook/react';
import { ScatterChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Charts/ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('scatterchart', 'default'),
    docs: {
      description: {
        component: 'Scatter charts are ideal for showing correlations between variables, identifying patterns and outliers, and visualizing data distributions. Use bubble charts for three-dimensional data or regression lines to highlight trends.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Chart title',
    },
    subtitle: {
      control: 'text',
      description: 'Chart subtitle',
    },
    variant: {
      control: 'select',
      options: ['scatter', 'bubble'],
      description: 'Chart variant',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on points',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    markerSize: {
      control: 'number',
      description: 'Size of scatter point markers',
    },
    height: {
      control: 'number',
      description: 'Chart height',
    },
  },
} satisfies Meta<typeof ScatterChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Height vs Weight Distribution',
    subtitle: 'Adult population sample',
    series: [
      {
        name: 'Males',
        color: '#5C6AC4',
        data: [
          [174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6],
          [187.2, 78.8], [181.5, 74.8], [184.0, 86.4], [184.5, 78.4],
          [175.0, 62.0], [184.0, 81.6], [180.0, 76.6], [177.8, 83.6],
          [192.0, 90.0], [176.0, 74.6], [174.0, 71.0], [184.0, 79.6],
          [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
        ],
      },
      {
        name: 'Females',
        color: '#955BA5',
        data: [
          [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0],
          [155.8, 53.6], [170.0, 59.0], [159.1, 47.6], [166.0, 69.8],
          [176.2, 66.8], [160.2, 75.2], [172.5, 55.2], [170.9, 54.2],
          [172.9, 62.5], [153.4, 42.0], [160.0, 50.0], [147.2, 49.8],
          [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
        ],
      },
    ],
    xAxis: {
      title: { text: 'Height (cm)' },
      startOnTick: true,
      endOnTick: true,
      showLastLabel: true,
    },
    yAxis: {
      title: { text: 'Weight (kg)' },
    },
    legend: true,
    height: 400,
  },
};

export const BubbleChart: Story = {
  args: {
    title: 'Sales Performance by Region',
    subtitle: 'Revenue, Profit, and Market Share',
    variant: 'bubble',
    series: [
      {
        name: 'North America',
        color: '#5C6AC4',
        data: [
          [95, 95, 13.8],
          [86.5, 102.9, 14.7],
          [80.8, 91.5, 15.8],
          [80.4, 102.5, 12.0],
          [80.3, 86.1, 11.8],
        ],
      },
      {
        name: 'Europe',
        color: '#006FBB',
        data: [
          [78, 93, 10.0],
          [74, 89, 9.0],
          [70, 85, 8.5],
          [68, 82, 7.8],
          [75, 90, 9.5],
        ],
      },
      {
        name: 'Asia Pacific',
        color: '#47C1BF',
        data: [
          [92, 105, 16.2],
          [88, 98, 15.0],
          [85, 94, 14.5],
          [89, 100, 15.8],
          [91, 103, 16.0],
        ],
      },
    ],
    xAxis: {
      title: { text: 'Revenue ($M)' },
    },
    yAxis: {
      title: { text: 'Profit ($M)' },
    },
    tooltip: {
      useHTML: true,
      headerFormat: '<table>',
      pointFormat: '<tr><th colspan="2"><h3>{series.name}</h3></th></tr>' +
        '<tr><th>Revenue:</th><td>${point.x}M</td></tr>' +
        '<tr><th>Profit:</th><td>${point.y}M</td></tr>' +
        '<tr><th>Market Share:</th><td>{point.z}%</td></tr>',
      footerFormat: '</table>',
      followPointer: true,
    },
    legend: true,
    height: 400,
  },
};

export const WithRegressionLine: Story = {
  args: {
    title: 'Marketing Spend vs Revenue',
    subtitle: 'Quarterly analysis with trend line',
    series: [
      {
        type: 'scatter',
        name: 'Actual Data',
        color: '#5C6AC4',
        data: [
          [10, 25], [15, 35], [20, 42], [25, 48], [30, 55],
          [35, 62], [40, 68], [45, 75], [50, 82], [55, 88],
          [60, 95], [65, 102], [70, 108], [75, 115], [80, 122],
        ],
        marker: {
          radius: 5,
        },
      },
      {
        type: 'line',
        name: 'Trend Line',
        color: '#DE3618',
        dashStyle: 'Dash',
        data: [
          [10, 23.5], [85, 125],
        ],
        marker: {
          enabled: false,
        },
        states: {
          hover: {
            lineWidth: 0,
          },
        },
        enableMouseTracking: false,
      },
    ],
    xAxis: {
      title: { text: 'Marketing Spend ($K)' },
    },
    yAxis: {
      title: { text: 'Revenue ($K)' },
    },
    legend: true,
    height: 400,
  },
};

export const MultipleSeriesScatter: Story = {
  args: {
    title: 'Customer Segmentation Analysis',
    subtitle: 'Purchase frequency vs average order value',
    series: [
      {
        name: 'Premium Customers',
        color: '#108043',
        data: [
          [8, 250], [9, 280], [10, 320], [11, 350], [12, 380],
          [13, 420], [14, 450], [15, 480],
        ],
      },
      {
        name: 'Regular Customers',
        color: '#5C6AC4',
        data: [
          [3, 120], [4, 140], [5, 160], [6, 180], [7, 200],
          [8, 220], [9, 240], [10, 260],
        ],
      },
      {
        name: 'Occasional Customers',
        color: '#FFC453',
        data: [
          [1, 50], [1, 60], [2, 70], [2, 80], [3, 90],
          [3, 100], [4, 110], [4, 120],
        ],
      },
      {
        name: 'At Risk Customers',
        color: '#DE3618',
        data: [
          [1, 200], [1, 220], [2, 240], [2, 180], [1, 190],
        ],
      },
    ],
    xAxis: {
      title: { text: 'Monthly Purchase Frequency' },
      min: 0,
    },
    yAxis: {
      title: { text: 'Average Order Value ($)' },
      min: 0,
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x} purchases/month, ${point.y} avg order',
    },
    legend: true,
    height: 400,
  },
};
