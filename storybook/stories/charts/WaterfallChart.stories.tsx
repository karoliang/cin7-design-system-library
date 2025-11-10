import type { Meta, StoryObj } from '@storybook/react';
import { WaterfallChart, WaterfallChartProps } from '@cin7/ag-charts-adapter/react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta: Meta<WaterfallChartProps> = {
  title: 'Cin7 DSL/Data Visualization/Waterfall Chart',
  component: WaterfallChart,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('waterfallchart', 'default'),
    docs: {
      description: {
        component: `
Waterfall charts visualize the cumulative effect of sequential positive and negative values, making them ideal for financial analysis, profit & loss statements, and cash flow tracking.

**Best Practices:**
- Use clear, descriptive labels for each data point
- Distinguish between positive, negative, and subtotal values
- Maintain consistent color coding for value types
- Include intermediate totals for complex data sets
- Ensure the final sum is clearly identifiable
- Use appropriate scaling for large values
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title for the chart',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle providing additional context',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on bars',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    tooltip: {
      control: 'boolean',
      description: 'Enable tooltips on hover',
    },
    height: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Chart height in pixels',
    },
    colors: {
      control: 'object',
      description: 'Color configuration for up, down, sum, and intermediate values',
    },
    xAxis: {
      control: 'object',
      description: 'X-axis configuration',
    },
    yAxis: {
      control: 'object',
      description: 'Y-axis configuration',
    },
  },
  args: {
    height: 400,
    dataLabels: true,
    legend: false,
    tooltip: true,
  },
};

export default meta;
type Story = StoryObj<WaterfallChartProps>;

// 1. Default - Basic Financial Waterfall
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
      title: 'Amount ($)',
    },
    height: 400,
  },
};

// 2. ProfitAndLoss - Complete P&L Statement
export const ProfitAndLoss: Story = {
  args: {
    title: 'Profit & Loss Statement',
    subtitle: 'Annual Financial Summary',
    series: [
      {
        name: 'P&L Analysis',
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
      title: 'Amount ($)',
    },
    height: 400,
  },
};

// 3. CashFlow - Detailed Cash Movement
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
      intermediate: '#ffa726',
    },
    yAxis: {
      title: 'Cash Amount ($)',
    },
    height: 450,
  },
};

// 4. ProductComparison - Value Analysis
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
      title: 'Value ($)',
    },
    height: 400,
  },
};

// 5. BudgetAnalysis - Budget vs Actual
export const BudgetAnalysis: Story = {
  args: {
    title: 'Budget Analysis',
    subtitle: 'Department Budget Variance',
    series: [
      {
        name: 'Budget Variance',
        data: [
          { name: 'Initial Budget', y: 1000000 },
          { name: 'Sales Bonus', y: -80000 },
          { name: 'Training Costs', y: -25000 },
          { name: 'Q1 Variance', isIntermediateSum: true },
          { name: 'New Hire Costs', y: -45000 },
          { name: 'Equipment Upgrade', y: -120000 },
          { name: 'Travel Savings', y: 35000 },
          { name: 'Final Budget', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#6f42c1',
      down: '#e74c3c',
      sum: '#2ecc71',
    },
    yAxis: {
      title: 'Budget Amount ($)',
    },
    height: 400,
  },
};

// 6. InventoryAnalysis - Stock Movement
export const InventoryAnalysis: Story = {
  args: {
    title: 'Inventory Movement Analysis',
    subtitle: 'Monthly Stock Changes',
    series: [
      {
        name: 'Stock Changes',
        data: [
          { name: 'Opening Stock', y: 5000 },
          { name: 'Purchases', y: 2000 },
          { name: 'Production', y: 1500 },
          { name: 'Total Additions', isIntermediateSum: true },
          { name: 'Sales', y: -3200 },
          { name: 'Returns', y: -150 },
          { name: 'Damages', y: -50 },
          { name: 'Closing Stock', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#00bcd4',
      down: '#ff5722',
      sum: '#4caf50',
    },
    yAxis: {
      title: 'Units',
    },
    height: 400,
  },
};

// 7. RevenueBreakdown - Revenue Sources
export const RevenueBreakdown: Story = {
  args: {
    title: 'Revenue Breakdown',
    subtitle: 'Revenue Sources Analysis',
    series: [
      {
        name: 'Revenue Streams',
        data: [
          { name: 'Product Sales', y: 250000 },
          { name: 'Service Revenue', y: 80000 },
          { name: 'Subscription Revenue', y: 45000 },
          { name: 'Total Revenue', isIntermediateSum: true },
          { name: 'Returns & Refunds', y: -15000 },
          { name: 'Discounts', y: -12000 },
          { name: 'Net Revenue', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#4caf50',
      down: '#f44336',
      sum: '#2196f3',
    },
    yAxis: {
      title: 'Revenue ($)',
    },
    height: 400,
  },
};

// 8. CustomColors - Custom Color Scheme
export const CustomColors: Story = {
  args: {
    title: 'Custom Color Scheme',
    subtitle: 'Branded Waterfall Chart',
    series: [
      {
        name: 'Branded Analysis',
        data: [
          { name: 'Starting Point', y: 100000 },
          { name: 'Growth', y: 30000 },
          { name: 'Expansion', y: 25000 },
          { name: 'Milestone', isIntermediateSum: true },
          { name: 'Setbacks', y: -15000 },
          { name: 'Challenges', y: -10000 },
          { name: 'Final Result', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#ff6b6b',
      down: '#4ecdc4',
      sum: '#45b7d1',
      intermediate: '#96ceb4',
    },
    yAxis: {
      title: 'Value ($)',
    },
    height: 400,
  },
};

// 9. LargeValues - Large Number Formatting
export const LargeValues: Story = {
  args: {
    title: 'Enterprise Financial Overview',
    subtitle: 'Multi-Million Dollar Analysis',
    series: [
      {
        name: 'Enterprise Flow',
        data: [
          { name: 'Starting Capital', y: 50000000 },
          { name: 'Q1 Revenue', y: 12500000 },
          { name: 'Q2 Revenue', y: 18750000 },
          { name: 'H1 Total', isIntermediateSum: true },
          { name: 'Operational Costs', y: -22000000 },
          { name: 'Marketing Investment', y: -8500000 },
          { name: 'R&D Investment', y: -12000000 },
          { name: 'Year End Value', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#1e88e5',
      down: '#d32f2f',
      sum: '#43a047',
    },
    yAxis: {
      title: 'Amount (Millions $)',
    },
    height: 450,
  },
};

// 10. NoDataLabels - Clean View
export const NoDataLabels: Story = {
  args: {
    title: 'Clean Waterfall View',
    subtitle: 'Without Data Labels',
    series: [
      {
        name: 'Clean Analysis',
        data: [
          { name: 'Initial Value', y: 75000 },
          { name: 'Increment 1', y: 15000 },
          { name: 'Increment 2', y: 22000 },
          { name: 'Subtotal', isIntermediateSum: true },
          { name: 'Deduction 1', y: -8000 },
          { name: 'Deduction 2', y: -12000 },
          { name: 'Final Value', isSum: true },
        ],
      },
    ],
    dataLabels: false,
    colors: {
      up: '#8bc34a',
      down: '#ff9800',
      sum: '#3f51b5',
    },
    yAxis: {
      title: 'Amount ($)',
    },
    height: 400,
  },
};

// 11. WithLegend - Multiple Series
export const WithLegend: Story = {
  args: {
    title: 'Departmental Performance',
    subtitle: 'Multi-Department Analysis',
    series: [
      {
        name: 'Marketing Department',
        data: [
          { name: 'Budget Start', y: 200000 },
          { name: 'Campaign A', y: 30000 },
          { name: 'Campaign B', y: 25000 },
          { name: 'Q1 Total', isIntermediateSum: true },
          { name: 'Ad Spend', y: -35000 },
          { name: 'Content Creation', y: -15000 },
          { name: 'Q1 Result', isSum: true },
        ],
      },
    ],
    legend: true,
    colors: {
      up: '#e91e63',
      down: '#9c27b0',
      sum: '#673ab7',
    },
    yAxis: {
      title: 'Marketing Budget ($)',
    },
    height: 400,
  },
};

// 12. CompactView - Small Chart
export const CompactView: Story = {
  args: {
    title: 'Compact Analysis',
    series: [
      {
        name: 'Summary',
        data: [
          { name: 'Start', y: 10000 },
          { name: 'Growth', y: 5000 },
          { name: 'Costs', y: -3000 },
          { name: 'Final', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#00acc1',
      down: '#ff6f00',
      sum: '#7cb342',
    },
    height: 250,
  },
};

// 13. NegativeStart - Starting from Negative
export const NegativeStart: Story = {
  args: {
    title: 'Recovery Analysis',
    subtitle: 'Starting from Negative Position',
    series: [
      {
        name: 'Recovery Path',
        data: [
          { name: 'Initial Debt', y: -50000 },
          { name: 'Payment 1', y: 15000 },
          { name: 'Payment 2', y: 12000 },
          { name: 'Partial Recovery', isIntermediateSum: true },
          { name: 'Extra Income', y: 8000 },
          { name: 'Final Payment', y: 15000 },
          { name: 'Debt Cleared', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#4caf50',
      down: '#f44336',
      sum: '#2196f3',
    },
    yAxis: {
      title: 'Amount ($)',
    },
    height: 400,
  },
};

// 14. ZeroBased - Starting from Zero
export const ZeroBased: Story = {
  args: {
    title: 'Growth Analysis',
    subtitle: 'Starting from Zero',
    series: [
      {
        name: 'Growth Journey',
        data: [
          { name: 'Starting Point', y: 0 },
          { name: 'Initial Investment', y: 10000 },
          { name: 'First Returns', y: 5000 },
          { name: 'Growth Phase', isIntermediateSum: true },
          { name: 'Reinvestment', y: -3000 },
          { name: 'Additional Returns', y: 8000 },
          { name: 'Final Value', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#00897b',
      down: '#d81b60',
      sum: '#5e35b1',
    },
    yAxis: {
      title: 'Value ($)',
    },
    height: 400,
  },
};

// 15. ComplexData - Complex Multi-Stage Analysis
export const ComplexData: Story = {
  args: {
    title: 'Complex Project Analysis',
    subtitle: 'Multi-Stage Financial Breakdown',
    series: [
      {
        name: 'Project Financials',
        data: [
          { name: 'Initial Investment', y: -100000 },
          { name: 'Phase 1 Revenue', y: 35000 },
          { name: 'Phase 2 Revenue', y: 45000 },
          { name: 'Phase 1 Complete', isIntermediateSum: true },
          { name: 'Additional Costs', y: -15000 },
          { name: 'Marketing Spend', y: -8000 },
          { name: 'Phase 3 Revenue', y: 60000 },
          { name: 'Phase 2 Complete', isIntermediateSum: true },
          { name: 'Operational Costs', y: -12000 },
          { name: 'Final Revenue', y: 25000 },
          { name: 'Project Result', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#ff7043',
      down: '#26a69a',
      sum: '#7e57c2',
      intermediate: '#ffb74d',
    },
    yAxis: {
      title: 'Project Value ($)',
    },
    height: 500,
  },
};