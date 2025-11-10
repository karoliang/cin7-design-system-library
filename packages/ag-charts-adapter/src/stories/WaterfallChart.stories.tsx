import type { Meta, StoryObj } from '@storybook/react';
import { WaterfallChart, WaterfallChartProps } from '../react/WaterfallChart';

const meta: Meta<WaterfallChartProps> = {
  title: 'Charts/WaterfallChart',
  component: WaterfallChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Waterfall charts are perfect for showing cumulative effects and sequential changes. They excel at:

- Financial statement analysis (P&L, cash flow)
- Showing how initial values are affected by series of positive and negative changes
- Visualizing step-by-step transformations
- Break-even analysis and contribution margins

**Best Practices:**
- Use contrasting colors for positive vs negative changes
- Highlight subtotal and total points clearly
- Start with meaningful initial values
- Include clear labels for each step
- Consider using connectors to show flow
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title for the chart',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle providing additional context',
    },
    series: {
      control: 'object',
      description: 'Waterfall data series',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on bars',
    },
    colors: {
      control: 'object',
      description: 'Color configuration for up, down, and sum points',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    tooltip: {
      control: 'boolean',
      description: 'Enable tooltips',
    },
    xAxis: {
      control: 'object',
      description: 'X-axis configuration',
    },
    yAxis: {
      control: 'object',
      description: 'Y-axis configuration',
    },
    height: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Chart height in pixels',
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

// Basic Financial Waterfall
export const Default: Story = {
  args: {
    title: 'Profit & Loss Statement',
    subtitle: 'Q4 2024 Financial Results',
    series: [
      {
        name: 'Financial Flow',
        data: [
          { name: 'Starting Revenue', y: 500000 },
          { name: 'Product Sales', y: 250000 },
          { name: 'Service Revenue', y: 80000 },
          { name: 'Cost of Goods Sold', y: -180000 },
          { name: 'Operating Expenses', y: -120000 },
          { name: 'Interest Income', y: 15000 },
          { name: 'Tax Expense', y: -45000 },
          { name: 'Net Profit', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Financial Categories',
    },
    yAxis: {
      title: 'Amount ($)',
      labelFormat: '${value}',
    },
  },
};

// Revenue Analysis
export const RevenueAnalysis: Story = {
  args: {
    title: 'Revenue Breakdown Analysis',
    subtitle: 'Monthly Revenue Contributions',
    series: [
      {
        name: 'Revenue Flow',
        data: [
          { name: 'Base Revenue', y: 100000 },
          { name: 'New Customers', y: 25000 },
          { name: 'Product Upsells', y: 15000 },
          { name: 'Price Increases', y: 8000 },
          { name: 'Customer Churn', y: -12000 },
          { name: 'Discounts', y: -5000 },
          { name: 'Returns', y: -3000 },
          { name: 'Total Revenue', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Revenue Components',
    },
    yAxis: {
      title: 'Revenue ($)',
      labelFormat: '${value}',
    },
  },
};

// Cash Flow Analysis
export const CashFlowAnalysis: Story = {
  args: {
    title: 'Cash Flow Statement',
    subtitle: 'Annual Cash Movement',
    series: [
      {
        name: 'Cash Flow',
        data: [
          { name: 'Opening Balance', y: 250000 },
          { name: 'Cash from Operations', y: 180000 },
          { name: 'Cash from Investing', y: -95000 },
          { name: 'Cash from Financing', y: 45000 },
          { name: 'Loan Repayment', y: -25000 },
          { name: 'Dividend Payment', y: -15000 },
          { name: 'Closing Balance', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Cash Flow Categories',
    },
    yAxis: {
      title: 'Cash Amount ($)',
      labelFormat: '${value}',
    },
  },
};

// Budget Variance
export const BudgetVariance: Story = {
  args: {
    title: 'Budget vs Actual Analysis',
    subtitle: 'Department Budget Variance',
    series: [
      {
        name: 'Budget Analysis',
        data: [
          { name: 'Original Budget', y: 1000000 },
          { name: 'Salary Savings', y: 50000 },
          { name: 'Additional Marketing', y: -30000 },
          { name: 'Equipment Purchase', y: -45000 },
          { name: 'Unexpected Revenue', y: 25000 },
          { name: 'Contingency Used', y: -15000 },
          { name: 'Final Budget', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Budget Items',
    },
    yAxis: {
      title: 'Amount ($)',
      labelFormat: '${value}',
    },
  },
};

// Project Timeline Impact
export const ProjectTimelineImpact: Story = {
  args: {
    title: 'Project Timeline Impact Analysis',
    subtitle: 'Schedule Changes and Effects',
    series: [
      {
        name: 'Timeline Changes',
        data: [
          { name: 'Original Plan', y: 120 }, // days
          { name: 'Early Start', y: -5 },
          { name: 'Delay - Weather', y: 8 },
          { name: 'Fast Tracking', y: -3 },
          { name: 'Resource Issues', y: 6 },
          { name: 'Process Improvement', y: -4 },
          { name: 'Final Timeline', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Schedule Impact',
    },
    yAxis: {
      title: 'Days',
    },
  },
};

// Weight Loss Journey
export const WeightLossJourney: Story = {
  args: {
    title: 'Weight Loss Progress',
    subtitle: 'Monthly Changes Tracking',
    series: [
      {
        name: 'Weight Changes',
        data: [
          { name: 'Starting Weight', y: 220 }, // lbs
          { name: 'Diet Plan', y: -8 },
          { name: 'Exercise Routine', y: -12 },
          { name: 'Holiday Weight Gain', y: 3 },
          { name: 'Increased Activity', y: -7 },
          { name: 'Muscle Gain', y: 2 }, // weight gain but positive change
          { name: 'Current Weight', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Weight Change Factors',
    },
    yAxis: {
      title: 'Weight (lbs)',
    },
  },
};

// Customer Growth Analysis
export const CustomerGrowthAnalysis: Story = {
  args: {
    title: 'Customer Growth Analysis',
    subtitle: 'Quarterly Customer Changes',
    series: [
      {
        name: 'Customer Changes',
        data: [
          { name: 'Starting Customers', y: 10000 },
          { name: 'New Acquisitions', y: 2500 },
          { name: 'Referrals', y: 800 },
          { name: 'Customer Churn', y: -1200 },
          { name: 'Account Upgrades', y: 150 },
          { name: 'Account Downgrades', y: -80 },
          { name: 'Ending Customers', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Customer Movement',
    },
    yAxis: {
      title: 'Number of Customers',
    },
  },
};

// Carbon Footprint Analysis
export const CarbonFootprintAnalysis: Story = {
  args: {
    title: 'Carbon Footprint Analysis',
    subtitle: 'Annual Emissions Changes',
    series: [
      {
        name: 'CO₂ Emissions',
        data: [
          { name: 'Baseline Emissions', y: 1000 }, // tons CO2
          { name: 'Renewable Energy', y: -200 },
          { name: 'Remote Work', y: -150 },
          { name: 'New Equipment', y: 50 },
          { name: 'Efficiency Improvements', y: -120 },
          { name: 'Business Growth', y: 80 },
          { name: 'Net Emissions', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Emission Factors',
    },
    yAxis: {
      title: 'CO₂ Tons',
    },
  },
};

// Investment Portfolio Performance
export const InvestmentPortfolioPerformance: Story = {
  args: {
    title: 'Investment Portfolio Performance',
    subtitle: 'Annual Returns Breakdown',
    series: [
      {
        name: 'Portfolio Changes',
        data: [
          { name: 'Initial Investment', y: 500000 },
          { name: 'Stock Gains', y: 75000 },
          { name: 'Bond Returns', y: 25000 },
          { name: 'Real Estate Appreciation', y: 45000 },
          { name: 'Currency Losses', y: -15000 },
          { name: 'Fees', y: -8000 },
          { name: 'Final Value', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Investment Components',
    },
    yAxis: {
      title: 'Portfolio Value ($)',
      labelFormat: '${value}',
    },
  },
};

// Custom Colors
export const CustomColors: Story = {
  args: {
    title: 'Custom Styled Waterfall',
    subtitle: 'Branded Color Scheme',
    series: [
      {
        name: 'Custom Analysis',
        data: [
          { name: 'Starting Point', y: 1000 },
          { name: 'Positive Impact', y: 300 },
          { name: 'Negative Impact', y: -150 },
          { name: 'Another Positive', y: 200 },
          { name: 'Another Negative', y: -80 },
          { name: 'Final Result', isSum: true },
        ],
      },
    ],
    colors: {
      up: '#667eea',
      down: '#f56565',
      sum: '#48bb78',
      intermediate: '#ed8936',
    },
    xAxis: {
      title: 'Analysis Steps',
    },
    yAxis: {
      title: 'Value',
    },
  },
};

// Intermediate Subtotals
export const IntermediateSubtotals: Story = {
  args: {
    title: 'Sales Pipeline Analysis',
    subtitle: 'With Intermediate Subtotals',
    series: [
      {
        name: 'Sales Funnel',
        data: [
          { name: 'Leads', y: 1000 },
          { name: 'Qualified Leads', y: -300 },
          { name: 'Pipeline Subtotal', isIntermediateSum: true },
          { name: 'Proposals', y: -100 },
          { name: 'Negotiations', y: -50 },
          { name: 'Closed Deals', y: 80 },
          { name: 'Final Total', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Sales Stages',
    },
    yAxis: {
      title: 'Number of Deals',
    },
  },
};

// No Data Labels
export const NoDataLabels: Story = {
  args: {
    title: 'Clean Waterfall Chart',
    subtitle: 'No Data Labels',
    dataLabels: false,
    series: [
      {
        name: 'Clean Analysis',
        data: [
          { name: 'Start', y: 500 },
          { name: 'Add', y: 200 },
          { name: 'Subtract', y: -100 },
          { name: 'Add Again', y: 150 },
          { name: 'Final', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Steps',
    },
    yAxis: {
      title: 'Value',
    },
  },
};

// Small Dataset
export const SmallDataset: Story = {
  args: {
    title: 'Simple Change Analysis',
    subtitle: 'Minimal Dataset',
    series: [
      {
        name: 'Simple Flow',
        data: [
          { name: 'Beginning', y: 100 },
          { name: 'Increase', y: 25 },
          { name: 'Decrease', y: -10 },
          { name: 'End', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Steps',
    },
    yAxis: {
      title: 'Value',
    },
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for waterfall data...',
    series: [
      {
        name: 'Empty',
        data: [],
      },
    ],
  },
};

// Error Handling - Invalid Data
export const InvalidData: Story = {
  args: {
    title: 'Data Validation Example',
    subtitle: 'Mixed valid and invalid data points',
    series: [
      {
        name: 'Invalid Data',
        data: [
          { name: 'Valid', y: 100 },
          { name: 'Invalid', y: NaN },
          { name: 'Another Valid', y: 50 },
          { name: 'Final', isSum: true },
        ],
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Waterfall Chart',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Financial Analysis',
        data: [
          { name: 'Starting Balance', y: 10000 },
          { name: 'Income', y: 5000 },
          { name: 'Expenses', y: -3000 },
          { name: 'Final Balance', isSum: true },
        ],
      },
    ],
    xAxis: {
      title: 'Financial Category',
    },
    yAxis: {
      title: 'Amount ($)',
    },
    ariaLabel: 'Waterfall chart showing financial analysis: Starting balance of $10,000, plus income of $5,000, minus expenses of $3,000, resulting in final balance of $12,000.',
  },
};