import type { Meta, StoryObj } from '@storybook/react';
import { PieChart, PieChartProps } from '../react/PieChart';

const meta: Meta<PieChartProps> = {
  title: 'Charts/PieChart',
  component: PieChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Pie charts are ideal for showing proportional data and percentages of a whole. They work best with:
- 2-7 categories for optimal readability
- Data that represents parts of a whole (100%)
- Clear, distinct categories that don't overlap

**Best Practices:**
- Start the first segment at the top (12 o'clock position)
- Use contrasting colors for adjacent segments
- Include percentages in labels for clarity
- Consider donut charts for better readability
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
    innerRadius: {
      control: { type: 'range', min: 0, max: 90, step: 5 },
      description: 'Inner radius percentage for donut charts (0-90)',
    },
    outerRadius: {
      control: { type: 'range', min: 50, max: 100, step: 5 },
      description: 'Outer radius percentage (50-100)',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show labels on pie segments',
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
  },
  args: {
    height: 400,
    dataLabels: true,
    legend: true,
    tooltip: true,
  },
};

export default meta;
type Story = StoryObj<PieChartProps>;

// Donut Chart Story (lowercase name for Storybook)
export const donut: Story = {
  args: {
    title: 'Donut Chart Example',
    subtitle: 'Inner radius creates donut effect',
    series: {
      name: 'Revenue',
      data: [
        ['Product A', 35],
        ['Product B', 25],
        ['Product C', 20],
        ['Product D', 12],
        ['Product E', 8],
      ],
    },
    innerRadius: 60,
  },
};

// Semicircle Pie Chart
export const semicircle: Story = {
  args: {
    title: 'Semicircle Chart',
    subtitle: 'Half pie chart visualization',
    series: {
      name: 'Sales',
      data: [
        ['Online', 45],
        ['Retail', 30],
        ['Phone', 15],
        ['Other', 10],
      ],
    },
    innerRadius: 30,
    outerRadius: 100,
  },
};

// Custom Colors Story
export const withcustomcolors: Story = {
  args: {
    title: 'Custom Color Scheme',
    subtitle: 'Branded colors',
    series: {
      name: 'Data',
      data: [
        { label: 'Primary', value: 40, color: '#6366f1' },
        { label: 'Success', value: 25, color: '#10b981' },
        { label: 'Warning', value: 20, color: '#f59e0b' },
        { label: 'Danger', value: 15, color: '#ef4444' },
      ],
    },
  },
};

// Legend Only Story
export const legendonly: Story = {
  args: {
    title: 'Legend Only Chart',
    subtitle: 'No data labels, only legend',
    series: {
      name: 'Categories',
      data: [
        ['Category A', 30],
        ['Category B', 25],
        ['Category C', 20],
        ['Category D', 15],
        ['Category E', 10],
      ],
    },
    dataLabels: false,
    legend: true,
  },
};

// With Percentages Story
export const withpercentages: Story = {
  args: {
    title: 'Percentage Distribution',
    subtitle: 'Values as percentages',
    series: {
      name: 'Distribution',
      data: [
        ['Segment A', 35],
        ['Segment B', 28],
        ['Segment C', 18],
        ['Segment D', 12],
        ['Segment E', 7],
      ],
    },
    dataLabels: true,
    legend: true,
  },
};

// Budget Allocation Story
export const budgetallocation: Story = {
  args: {
    title: 'Department Budget Allocation',
    subtitle: 'Annual budget distribution',
    series: {
      name: 'Budget',
      data: [
        ['Engineering', 450000],
        ['Marketing', 280000],
        ['Sales', 320000],
        ['Support', 150000],
        ['Operations', 200000],
        ['Admin', 80000],
      ],
    },
    innerRadius: 40,
    height: 500,
  },
};

// Task Completion Story
export const taskcompletion: Story = {
  args: {
    title: 'Task Completion Status',
    subtitle: 'Project progress overview',
    series: {
      name: 'Tasks',
      data: [
        ['Completed', 68],
        ['In Progress', 20],
        ['Not Started', 8],
        ['Blocked', 4],
      ],
    },
    dataLabels: true,
    legend: true,
  },
};

// Basic Pie Chart
export const Default: Story = {
  args: {
    title: 'Market Share Distribution',
    subtitle: 'Q4 2024 Results',
    series: {
      name: 'Companies',
      data: [
        ['Company A', 35],
        ['Company B', 25],
        ['Company C', 20],
        ['Company D', 12],
        ['Company E', 8],
      ],
    },
  },
};

// Donut Chart
export const DonutChart: Story = {
  args: {
    title: 'Revenue Breakdown',
    subtitle: 'By Product Category',
    series: {
      name: 'Revenue',
      data: [
        ['Electronics', 45000],
        ['Clothing', 32000],
        ['Home & Garden', 28000],
        ['Sports', 15000],
        ['Books', 8000],
      ],
    },
    innerRadius: 60,
  },
};

// Object Data Format
export const ObjectDataFormat: Story = {
  args: {
    title: 'Website Traffic Sources',
    subtitle: 'Monthly Analytics',
    series: {
      name: 'Traffic',
      data: [
        { label: 'Organic Search', value: 4200, color: '#4CAF50' },
        { label: 'Direct Traffic', value: 3100, color: '#2196F3' },
        { label: 'Social Media', value: 2800, color: '#FF9800' },
        { label: 'Email Campaign', value: 1900, color: '#9C27B0' },
        { label: 'Paid Ads', value: 1200, color: '#F44336' },
      ],
    },
  },
};

// Simple Number Array
export const NumberArray: Story = {
  args: {
    title: 'Budget Allocation',
    subtitle: 'Department Distribution',
    series: {
      name: 'Budget',
      data: [120000, 95000, 78000, 62000, 45000],
    },
    dataLabels: true,
  },
};

// Small Data Set (3 segments)
export const SmallDataSet: Story = {
  args: {
    title: 'Customer Satisfaction',
    subtitle: 'Survey Results',
    series: {
      name: 'Responses',
      data: [
        ['Satisfied', 68],
        ['Neutral', 22],
        ['Dissatisfied', 10],
      ],
    },
  },
};

// Large Data Set (7 segments)
export const LargeDataSet: Story = {
  args: {
    title: 'Project Status Overview',
    subtitle: 'Active Projects Distribution',
    series: {
      name: 'Projects',
      data: [
        ['Planning', 15],
        ['In Progress', 28],
        ['Testing', 12],
        ['Review', 8],
        ['Completed', 35],
        ['On Hold', 6],
        ['Cancelled', 3],
      ],
    },
  },
};

// No Labels (Chart Only)
export const ChartOnly: Story = {
  args: {
    title: 'Sales Distribution',
    series: {
      name: 'Sales',
      data: [
        ['North', 42],
        ['South', 28],
        ['East', 18],
        ['West', 12],
      ],
    },
    dataLabels: false,
    legend: false,
  },
};

// No Legend
export const NoLegend: Story = {
  args: {
    title: 'Mobile App Usage',
    subtitle: 'Time Spent by Feature',
    series: {
      name: 'Usage',
      data: [
        ['Navigation', 35],
        ['Search', 25],
        ['Profile', 20],
        ['Settings', 12],
        ['Help', 8],
      ],
    },
    legend: false,
  },
};

// No Tooltips
export const NoTooltips: Story = {
  args: {
    title: 'Resource Utilization',
    subtitle: 'Server Allocation',
    series: {
      name: 'Resources',
      data: [
        ['Database', 40],
        ['Application', 30],
        ['Cache', 20],
        ['Storage', 10],
      ],
    },
    tooltip: false,
  },
};

// Custom Colors with Objects
export const CustomColors: Story = {
  args: {
    title: 'Brand Performance',
    subtitle: 'Market Analysis',
    series: {
      name: 'Performance',
      data: [
        { label: 'Premium', value: 45, color: '#FF6B6B' },
        { label: 'Standard', value: 30, color: '#4ECDC4' },
        { label: 'Budget', value: 15, color: '#45B7D1' },
        { label: 'Luxury', value: 10, color: '#96CEB4' },
      ],
    },
  },
};

// Percentage Data (already sums to 100)
export const PercentageData: Story = {
  args: {
    title: 'Screen Time Distribution',
    subtitle: 'Daily Usage Patterns',
    series: {
      name: 'Time',
      data: [
        ['Work', 35],
        ['Social Media', 25],
        ['Entertainment', 20],
        ['Communication', 12],
        ['Other', 8],
      ],
    },
  },
};

// Financial Data Example
export const FinancialData: Story = {
  args: {
    title: 'Portfolio Allocation',
    subtitle: 'Investment Strategy',
    series: {
      name: 'Portfolio',
      data: [
        ['Stocks', 45],
        ['Bonds', 25],
        ['Real Estate', 15],
        ['Commodities', 10],
        ['Cash', 5],
      ],
    },
    innerRadius: 40,
  },
};

// Custom Dimensions
export const CustomDimensions: Story = {
  args: {
    title: 'Energy Consumption',
    subtitle: 'By Source Type',
    series: {
      name: 'Energy',
      data: [
        ['Electricity', 40],
        ['Natural Gas', 30],
        ['Renewable', 20],
        ['Oil', 10],
      ],
    },
    height: 600,
    innerRadius: 50,
    outerRadius: 85,
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for data...',
    series: {
      name: 'Empty',
      data: [],
    },
  },
};

// Error Handling - Invalid Data (Mixed Types)
export const InvalidData: Story = {
  args: {
    title: 'Data Validation Example',
    subtitle: 'Mixed data types',
    series: {
      name: 'Mixed',
      data: [
        ['Valid', 25],
        null as any,
        undefined as any,
        ['Another Valid', 15],
        { label: 'Object', value: 10 },
      ],
    },
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Pie Chart',
    subtitle: 'Screen reader friendly',
    series: {
      name: 'Accessible Data',
      data: [
        ['Category A', 30],
        ['Category B', 25],
        ['Category C', 20],
        ['Category D', 15],
        ['Category E', 10],
      ],
    },
    ariaLabel: 'Pie chart showing distribution across 5 categories: Category A has 30%, Category B has 25%, Category C has 20%, Category D has 15%, Category E has 10%',
  },
};

// Real-time Data Simulation Template
export const RealtimeTemplate: Story = {
  args: {
    title: 'Live Sales Dashboard',
    subtitle: 'Current performance metrics',
    series: {
      name: 'Live Sales',
      data: [
        ['Online', 45],
        ['Retail Store', 30],
        ['Phone', 15],
        ['Partner', 10],
      ],
    },
    innerRadius: 30,
  },
  parameters: {
    docs: {
      description: {
        story: 'This template can be connected to real-time data sources. Update the `series.data` array with live values to create dynamic dashboards.',
      },
    },
  },
};