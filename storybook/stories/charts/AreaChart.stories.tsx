import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('areachart', 'default'),
    docs: {
      description: {
        component: 'Area charts are ideal for showing volume and magnitude over time, visualizing cumulative data, and comparing multiple data series. Use stacked areas for part-to-whole relationships or smooth curves for polished visualizations.',
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
    smooth: {
      control: 'boolean',
      description: 'Enable smooth spline curves',
    },
    markers: {
      control: 'boolean',
      description: 'Show data point markers',
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Area fill opacity',
    },
    stacking: {
      control: 'select',
      options: [undefined, 'normal', 'percent'],
      description: 'Enable data stacking',
    },
    height: {
      control: 'number',
      description: 'Chart height',
    },
  },
} satisfies Meta<typeof AreaChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Monthly Revenue Trend',
    subtitle: '2025',
    series: [
      {
        name: 'Revenue',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: { text: 'Revenue ($K)' },
    },
    height: 400,
  },
};

export const Stacked: Story = {
  args: {
    title: 'Sales by Product Line',
    subtitle: 'Cumulative Revenue',
    stacking: 'normal',
    series: [
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
    ],
    xAxis: {
      categories: ['Q1 Week 1', 'Q1 Week 2', 'Q2 Week 1', 'Q2 Week 2', 'Q3 Week 1', 'Q3 Week 2', 'Q4 Week 1', 'Q4 Week 2'],
    },
    yAxis: {
      title: { text: 'Total Revenue ($K)' },
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('areachart', 'stacked'),
  },
};

export const Percentage: Story = {
  args: {
    title: 'Market Share Distribution',
    subtitle: 'Year over Year',
    stacking: 'percent',
    series: [
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
    ],
    xAxis: {
      categories: ['2020', '2021', '2022', '2023', '2024', '2025'],
    },
    yAxis: {
      title: { text: 'Market Share (%)' },
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y}K)<br/>',
      shared: true,
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('areachart', 'percentage'),
  },
};

export const SplineArea: Story = {
  args: {
    title: 'Website Traffic Analysis',
    subtitle: 'Smooth Area Chart',
    smooth: true,
    markers: true,
    fillOpacity: 0.5,
    series: [
      {
        name: 'Organic Traffic',
        data: [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000],
      },
      {
        name: 'Paid Traffic',
        data: [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650],
      },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: { text: 'Visitors' },
    },
    tooltip: {
      shared: true,
      valueSuffix: ' visitors',
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('areachart', 'splinearea'),
  },
};
