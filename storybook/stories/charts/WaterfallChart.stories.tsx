import type { Meta, StoryObj } from '@storybook/react';
import { WaterfallChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Charts/WaterfallChart',
  component: WaterfallChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('waterfallchart', 'default'),
    docs: {
      description: {
        component: 'Waterfall charts visualize the cumulative effect of sequential positive and negative values, making them ideal for financial analysis, profit & loss statements, and cash flow tracking.',
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
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on bars',
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
} satisfies Meta<typeof WaterfallChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Financial Waterfall',
    subtitle: 'Quarterly Performance Analysis',
    series: [
      {
        name: 'Financial Flow',
        data: [
          { name: 'Starting Balance', y: 120000 },
          { name: 'Product Sales', y: 50000 },
          { name: 'Service Revenue', y: 30000 },
          { name: 'Q1 Total', isIntermediateSum: true },
          { name: 'Operating Costs', y: -40000 },
          { name: 'Marketing Expenses', y: -15000 },
          { name: 'R&D Investment', y: -10000 },
          { name: 'Ending Balance', isSum: true },
        ],
      },
    ],
    yAxis: {
      title: { text: 'Amount ($)' },
    },
    height: 400,
  },
};

export const ProfitAndLoss: Story = {
  args: {
    title: 'Profit & Loss Statement',
    subtitle: 'Annual Financial Summary',
    series: [
      {
        name: 'P&L',
        data: [
          { name: 'Gross Revenue', y: 500000 },
          { name: 'Cost of Goods', y: -180000 },
          { name: 'Gross Profit', isIntermediateSum: true },
          { name: 'Operating Expenses', y: -120000 },
          { name: 'Operating Income', isIntermediateSum: true },
          { name: 'Interest Income', y: 5000 },
          { name: 'Taxes', y: -48000 },
          { name: 'Net Profit', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#28a745',
      down: '#dc3545',
      sum: '#007bff',
    },
    yAxis: {
      title: { text: 'Amount ($)' },
      labels: {
        formatter: function () {
          return '$' + (this.value as number).toLocaleString();
        },
      },
    },
    height: 400,
  },
};

export const CashFlow: Story = {
  args: {
    title: 'Cash Flow Analysis',
    subtitle: 'Monthly Cash Movement',
    series: [
      {
        name: 'Cash Flow',
        data: [
          { name: 'Opening Balance', y: 75000 },
          { name: 'Customer Payments', y: 85000 },
          { name: 'Loan Proceeds', y: 50000 },
          { name: 'Total Inflows', isIntermediateSum: true },
          { name: 'Supplier Payments', y: -60000 },
          { name: 'Payroll', y: -45000 },
          { name: 'Rent & Utilities', y: -12000 },
          { name: 'Loan Repayment', y: -20000 },
          { name: 'Equipment Purchase', y: -15000 },
          { name: 'Total Outflows', isIntermediateSum: true },
          { name: 'Closing Balance', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#20c997',
      down: '#e83e8c',
      sum: '#6610f2',
    },
    yAxis: {
      title: { text: 'Cash Amount ($)' },
    },
    height: 450,
  },
};

export const ProductComparison: Story = {
  args: {
    title: 'Product Value Analysis',
    subtitle: 'Feature-based Pricing Breakdown',
    series: [
      {
        name: 'Value Components',
        data: [
          { name: 'Base Model', y: 15000 },
          { name: 'Premium Features', y: 5000 },
          { name: 'Advanced Analytics', y: 3500 },
          { name: 'Mid-tier Value', isIntermediateSum: true },
          { name: 'Enterprise Support', y: 2500 },
          { name: 'Custom Integration', y: 4000 },
          { name: 'Cloud Storage', y: 1500 },
          { name: 'Total Enterprise Value', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#17a2b8',
      down: '#fd7e14',
      sum: '#6c757d',
    },
    yAxis: {
      title: { text: 'Value ($)' },
    },
    height: 400,
  },
};
