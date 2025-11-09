import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/Data Visualization/Line Chart',
  component: LineChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('linechart', 'default'),
    docs: {
      description: {
        component: 'Line charts are ideal for showing trends over time, comparing multiple data series, and visualizing continuous data. Use smooth curves (splines) for more polished visualizations or straight lines for precise data representation.',
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
    height: {
      control: 'number',
      description: 'Chart height',
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Quarterly Revenue',
    subtitle: '2024-2025',
    series: [
      {
        name: 'Q1',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
      },
      {
        name: 'Q2',
        data: [45.2, 82.3, 98.7, 115.4, 138.2, 152.8],
      },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      title: { text: 'Revenue ($K)' },
    },
    height: 400,
  },
};

export const SmoothCurves: Story = {
  parameters: {
    codeVariants: getCodeVariants('linechart', 'smoothcurves'),
  },
  args: {
    title: 'Sales Trend',
    smooth: true,
    series: [
      {
        name: 'Sales',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
      },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      title: { text: 'Sales ($K)' },
    },
    height: 400,
  },
};

export const WithMarkers: Story = {
  parameters: {
    codeVariants: getCodeVariants('linechart', 'withmarkers'),
  },
  args: {
    title: 'Order Tracking',
    markers: true,
    series: [
      {
        name: 'Orders',
        data: [10, 15, 12, 18, 20, 17],
      },
    ],
    xAxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    yAxis: {
      title: { text: 'Orders' },
    },
    height: 400,
  },
};

export const MultiSeries: Story = {
  parameters: {
    codeVariants: getCodeVariants('linechart', 'multiseries'),
  },
  args: {
    title: 'Regional Sales Comparison',
    series: [
      {
        name: 'North America',
        data: [120, 150, 180, 200],
      },
      {
        name: 'Europe',
        data: [100, 130, 160, 190],
      },
      {
        name: 'Asia Pacific',
        data: [80, 110, 140, 170],
      },
    ],
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yAxis: {
      title: { text: 'Sales ($K)' },
    },
    height: 400,
  },
};

export const SmoothWithMarkers: Story = {
  parameters: {
    codeVariants: getCodeVariants('linechart', 'smoothwithmarkers'),
  },
  args: {
    title: 'Product Performance',
    smooth: true,
    markers: true,
    series: [
      {
        name: 'Product A',
        data: [12, 15, 18, 20, 19, 22],
      },
      {
        name: 'Product B',
        data: [8, 11, 14, 16, 15, 18],
      },
    ],
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    },
    yAxis: {
      title: { text: 'Units Sold' },
    },
    height: 400,
  },
};
