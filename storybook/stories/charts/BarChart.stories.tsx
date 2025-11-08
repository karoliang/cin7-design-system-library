import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/08 Data Visualization/Bar Chart',
  component: BarChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('barchart', 'default'),
    docs: {
      description: {
        component: 'Bar charts are ideal for comparing values across categories, showing rankings, and visualizing discrete data. Use vertical columns for time-based categories or horizontal bars for long category names.',
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Bar direction',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on bars',
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
} satisfies Meta<typeof BarChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Sales by Product Category',
    orientation: 'vertical',
    series: [
      {
        name: 'Q1 2025',
        data: [450, 320, 580, 410, 290],
      },
      {
        name: 'Q2 2025',
        data: [510, 380, 620, 450, 340],
      },
    ],
    xAxis: {
      categories: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'],
    },
    yAxis: {
      title: { text: 'Sales ($K)' },
    },
    height: 400,
  },
};

export const Horizontal: Story = {
  args: {
    title: 'Regional Performance',
    orientation: 'horizontal',
    series: [
      {
        name: 'Revenue',
        data: [107, 131, 165, 203, 178],
      },
    ],
    xAxis: {
      categories: ['North', 'South', 'East', 'West', 'Central'],
    },
    yAxis: {
      title: { text: 'Revenue ($K)' },
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('barchart', 'horizontal'),
  },
};

export const WithDataLabels: Story = {
  args: {
    title: 'Monthly Sales',
    orientation: 'vertical',
    dataLabels: true,
    series: [
      {
        name: 'Units Sold',
        data: [150, 180, 220, 195, 210, 240],
      },
    ],
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: {
      title: { text: 'Units' },
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('barchart', 'withdatalabels'),
  },
};

export const Stacked: Story = {
  args: {
    title: 'Product Composition',
    stacking: 'normal',
    series: [
      {
        name: 'Product A',
        data: [50, 60, 70, 80],
      },
      {
        name: 'Product B',
        data: [30, 40, 50, 60],
      },
      {
        name: 'Product C',
        data: [20, 30, 40, 50],
      },
    ],
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yAxis: {
      title: { text: 'Total Sales' },
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('barchart', 'stacked'),
  },
};

export const PercentageStacked: Story = {
  args: {
    title: 'Device Usage Distribution',
    stacking: 'percent',
    series: [
      {
        name: 'Desktop',
        data: [60, 55, 50, 45],
      },
      {
        name: 'Mobile',
        data: [30, 35, 40, 45],
      },
      {
        name: 'Tablet',
        data: [10, 10, 10, 10],
      },
    ],
    xAxis: {
      categories: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
    },
    yAxis: {
      title: { text: 'Percentage' },
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('barchart', 'percentagestacked'),
  },
};

export const Grouped: Story = {
  args: {
    title: 'Year-over-Year Comparison',
    grouping: true,
    series: [
      {
        name: '2024',
        data: [100, 120, 140, 160],
      },
      {
        name: '2025',
        data: [120, 150, 180, 200],
      },
    ],
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yAxis: {
      title: { text: 'Revenue ($K)' },
    },
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('barchart', 'grouped'),
  },
};
