import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/08 Data Visualization/Pie Chart',
  component: PieChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('piechart', 'default'),
    docs: {
      description: {
        component: 'Pie charts are ideal for showing part-to-whole relationships, composition breakdown, and percentage distribution. Use donut charts for a modern appearance or semi-circle charts for compact displays.',
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
      options: ['pie', 'donut', 'semi-circle'],
      description: 'Chart style variant',
    },
    innerSize: {
      control: 'text',
      description: 'Inner size for donut charts',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on slices',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    height: {
      control: 'number',
      description: 'Chart height',
    },
  },
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Market Share by Product',
    subtitle: 'Q1 2025',
    data: [
      { name: 'Product A', y: 45.0, color: '#5C6AC4' },
      { name: 'Product B', y: 26.8, color: '#006FBB' },
      { name: 'Product C', y: 18.2, color: '#47C1BF' },
      { name: 'Product D', y: 10.0, color: '#955BA5' },
    ],
    legend: true,
    dataLabels: true,
    height: 400,
  },
};

export const Donut: Story = {
  args: {
    title: 'Sales Distribution',
    variant: 'donut',
    innerSize: '50%',
    data: [
      { name: 'Online', y: 55 },
      { name: 'Retail', y: 30 },
      { name: 'Wholesale', y: 15 },
    ],
    dataLabels: true,
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'donut'),
  },
};

export const SemiCircle: Story = {
  args: {
    title: 'Goal Progress',
    variant: 'semi-circle',
    data: [
      { name: 'Achieved', y: 75 },
      { name: 'Remaining', y: 25 },
    ],
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'semicircle'),
  },
};

export const WithCustomColors: Story = {
  args: {
    title: 'Status Distribution',
    data: [
      { name: 'Success', y: 80, color: '#108043' },
      { name: 'Warning', y: 15, color: '#FFC453' },
      { name: 'Error', y: 5, color: '#DE3618' },
    ],
    legend: true,
    dataLabels: true,
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'withcustomcolors'),
  },
};

export const LegendOnly: Story = {
  args: {
    title: 'Regional Distribution',
    dataLabels: false,
    legend: true,
    data: [
      { name: 'North America', y: 45 },
      { name: 'Europe', y: 30 },
      { name: 'Asia Pacific', y: 25 },
    ],
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'legendonly'),
  },
};

export const WithPercentages: Story = {
  args: {
    title: 'Device Breakdown',
    dataLabels: true,
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    data: [
      { name: 'Desktop', y: 60 },
      { name: 'Mobile', y: 30 },
      { name: 'Tablet', y: 10 },
    ],
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'withpercentages'),
  },
};

export const BudgetAllocation: Story = {
  args: {
    title: 'Budget Allocation',
    data: [
      { name: 'Marketing', y: 35 },
      { name: 'Development', y: 45 },
      { name: 'Operations', y: 20 },
    ],
    legend: true,
    dataLabels: true,
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'budgetallocation'),
  },
};

export const TaskCompletion: Story = {
  args: {
    title: 'Task Status',
    variant: 'donut',
    innerSize: '60%',
    data: [
      { name: 'Completed', y: 70, color: '#108043' },
      { name: 'In Progress', y: 20, color: '#FFC453' },
      { name: 'Pending', y: 10, color: '#5C6AC4' },
    ],
    legend: true,
    dataLabels: true,
    height: 400,
  },
  parameters: {
    codeVariants: getCodeVariants('piechart', 'taskcompletion'),
  },
};
