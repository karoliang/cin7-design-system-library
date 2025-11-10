import type { Meta, StoryObj } from '@storybook/react';
import { BarChart, BarChartProps } from '../react/BarChart';

const meta: Meta<BarChartProps> = {
  title: 'Charts/BarChart',
  component: BarChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Bar charts are versatile for comparing quantities across categories. They excel at:

- Comparing values across discrete categories
- Showing rankings and orderings
- Displaying time-based categorical data
- Visualizing survey results and polls

**Best Practices:**
- Start y-axis at zero for accurate comparisons
- Use consistent bar widths
- Limit categories to 8-12 for readability
- Consider horizontal bars for long category names
- Use stacking to show composition
- Group related categories together
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
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Chart orientation',
    },
    stacking: {
      control: 'select',
      options: [undefined, 'normal', 'percent'],
      description: 'Stacking mode - none, normal, or percentage',
    },
    grouping: {
      control: 'boolean',
      description: 'Group multiple series together',
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
    orientation: 'vertical',
    stacking: undefined,
    grouping: true,
    dataLabels: false,
    legend: true,
    tooltip: true,
  },
};

export default meta;
type Story = StoryObj<BarChartProps>;

// Basic Vertical Bar Chart
export const Default: Story = {
  args: {
    title: 'Monthly Sales',
    subtitle: '2024 Performance',
    series: [
      {
        name: 'Sales',
        data: [
          ['Jan', 45000],
          ['Feb', 52000],
          ['Mar', 48000],
          ['Apr', 61000],
          ['May', 58000],
          ['Jun', 67000],
        ],
      },
    ],
  },
};

// Horizontal Bar Chart
export const Horizontal: Story = {
  args: {
    title: 'Product Performance',
    subtitle: 'Annual Revenue',
    orientation: 'horizontal',
    series: [
      {
        name: 'Revenue',
        data: [
          ['Laptops', 125000],
          ['Phones', 98000],
          ['Tablets', 76000],
          ['Accessories', 54000],
          ['Monitors', 42000],
        ],
        color: '#2196F3',
      },
    ],
  },
};

// Grouped Bar Chart
export const Grouped: Story = {
  args: {
    title: 'Regional Sales Comparison',
    subtitle: 'Q4 2024',
    series: [
      {
        name: 'North Region',
        data: [
          ['Electronics', 125000],
          ['Clothing', 85000],
          ['Home & Garden', 65000],
        ],
        color: '#4CAF50',
      },
      {
        name: 'South Region',
        data: [
          ['Electronics', 98000],
          ['Clothing', 92000],
          ['Home & Garden', 71000],
        ],
        color: '#FF9800',
      },
      {
        name: 'East Region',
        data: [
          ['Electronics', 142000],
          ['Clothing', 78000],
          ['Home & Garden', 88000],
        ],
        color: '#9C27B0',
      },
    ],
  },
};

// Stacked Bar Chart
export const Stacked: Story = {
  args: {
    title: 'Department Budget Breakdown',
    subtitle: 'Annual Allocation',
    stacking: 'normal',
    series: [
      {
        name: 'Salaries',
        data: [
          ['Engineering', 450000],
          ['Marketing', 280000],
          ['Sales', 320000],
          ['Operations', 250000],
        ],
        color: '#F44336',
      },
      {
        name: 'Equipment',
        data: [
          ['Engineering', 120000],
          ['Marketing', 45000],
          ['Sales', 35000],
          ['Operations', 85000],
        ],
        color: '#2196F3',
      },
      {
        name: 'Training',
        data: [
          ['Engineering', 50000],
          ['Marketing', 35000],
          ['Sales', 65000],
          ['Operations', 40000],
        ],
        color: '#4CAF50',
      },
    ],
  },
};

// Percent Stacked Bar Chart
export const PercentStacked: Story = {
  args: {
    title: 'Survey Response Distribution',
    subtitle: 'Customer Satisfaction',
    stacking: 'percent',
    series: [
      {
        name: 'Very Satisfied',
        data: [
          ['Product Quality', 45],
          ['Customer Service', 38],
          ['Price', 25],
          ['Delivery', 52],
        ],
        color: '#4CAF50',
      },
      {
        name: 'Satisfied',
        data: [
          ['Product Quality', 30],
          ['Customer Service', 35],
          ['Price', 28],
          ['Delivery', 28],
        ],
        color: '#8BC34A',
      },
      {
        name: 'Neutral',
        data: [
          ['Product Quality', 15],
          ['Customer Service', 18],
          ['Price', 32],
          ['Delivery', 12],
        ],
        color: '#FFC107',
      },
      {
        name: 'Dissatisfied',
        data: [
          ['Product Quality', 10],
          ['Customer Service', 9],
          ['Price', 15],
          ['Delivery', 8],
        ],
        color: '#F44336',
      },
    ],
  },
};

// With Data Labels
export const WithDataLabels: Story = {
  args: {
    title: 'Quarterly Revenue',
    subtitle: 'With Value Labels',
    dataLabels: true,
    series: [
      {
        name: 'Revenue',
        data: [
          ['Q1', 125000],
          ['Q2', 142000],
          ['Q3', 138000],
          ['Q4', 165000],
        ],
        color: '#9C27B0',
      },
    ],
  },
};

// Single Series Numeric Values
export const NumericData: Story = {
  args: {
    title: 'Weekly Website Traffic',
    subtitle: 'Visitor Count',
    series: [
      {
        name: 'Visitors',
        data: [1200, 1450, 1680, 1920, 2150, 1890, 1650],
        color: '#00BCD4',
      },
    ],
    xAxis: {
      title: 'Day of Week',
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
  },
};

// Long Category Names (Horizontal)
export const LongCategoryNames: Story = {
  args: {
    title: 'Customer Feedback Categories',
    subtitle: 'Response Count',
    orientation: 'horizontal',
    series: [
      {
        name: 'Responses',
        data: [
          ['Product Quality and Durability', 145],
          ['Customer Service Response Time', 128],
          ['User Interface and Experience', 112],
          ['Pricing and Value for Money', 98],
          ['Delivery and Shipping Options', 87],
        ],
        color: '#FF5722',
      },
    ],
    height: 500,
  },
};

// Negative Values
export const NegativeValues: Story = {
  args: {
    title: 'Monthly Profit/Loss',
    subtitle: 'Financial Performance',
    series: [
      {
        name: 'Profit/Loss',
        data: [
          ['Jan', 25000],
          ['Feb', -8000],
          ['Mar', 35000],
          ['Apr', 42000],
          ['May', -15000],
          ['Jun', 58000],
        ],
        color: '#607D8B',
      },
    ],
  },
};

// Custom Colors
export const CustomColors: Story = {
  args: {
    title: 'Brand Awareness Survey',
    subtitle: 'Recognition by Brand',
    series: [
      {
        name: 'Recognition %',
        data: [
          ['Brand A', 85],
          ['Brand B', 72],
          ['Brand C', 68],
          ['Brand D', 54],
          ['Brand E', 41],
        ],
        color: '#E91E63',
      },
    ],
  },
};

// Large Dataset
export const LargeDataset: Story = {
  args: {
    title: 'Monthly Performance Metrics',
    subtitle: '2-Year Trend',
    series: [
      {
        name: 'Sales',
        data: [
          ['Jan-2023', 45000],
          ['Feb-2023', 48000],
          ['Mar-2023', 52000],
          ['Apr-2023', 49000],
          ['May-2023', 55000],
          ['Jun-2023', 58000],
          ['Jul-2023', 62000],
          ['Aug-2023', 59000],
          ['Sep-2023', 64000],
          ['Oct-2023', 68000],
          ['Nov-2023', 71000],
          ['Dec-2023', 75000],
          ['Jan-2024', 78000],
          ['Feb-2024', 82000],
          ['Mar-2024', 85000],
          ['Apr-2024', 88000],
          ['May-2024', 92000],
          ['Jun-2024', 95000],
        ],
        color: '#3F51B5',
      },
    ],
    height: 600,
  },
};

// Mixed Data Types
export const MixedDataTypes: Story = {
  args: {
    title: 'Project Status Overview',
    subtitle: 'Task Completion',
    series: [
      {
        name: 'Completed Tasks',
        data: [
          ['Project Alpha', 85],
          ['Project Beta', 92],
          ['Project Gamma', 78],
        ],
        color: '#4CAF50',
      },
      {
        name: 'In Progress',
        data: [
          ['Project Alpha', 10],
          ['Project Beta', 5],
          ['Project Gamma', 15],
        ],
        color: '#FF9800',
      },
      {
        name: 'Pending',
        data: [
          ['Project Alpha', 5],
          ['Project Beta', 3],
          ['Project Gamma', 7],
        ],
        color: '#9E9E9E',
      },
    ],
  },
};

// No Legend
export const NoLegend: Story = {
  args: {
    title: 'Single Metric Performance',
    subtitle: 'Conversion Rate',
    legend: false,
    series: [
      {
        name: 'Conversion Rate',
        data: [
          ['Homepage', 4.2],
          ['Product Page', 6.8],
          ['Cart', 12.5],
          ['Checkout', 85.2],
        ],
        color: '#009688',
      },
    ],
  },
};

// Horizontal Stacked
export const HorizontalStacked: Story = {
  args: {
    title: 'Skill Distribution',
    subtitle: 'Team Composition',
    orientation: 'horizontal',
    stacking: 'normal',
    series: [
      {
        name: 'Senior Developers',
        data: [
          ['Frontend', 8],
          ['Backend', 6],
          ['DevOps', 4],
          ['QA', 3],
        ],
        color: '#F44336',
      },
      {
        name: 'Mid-level Developers',
        data: [
          ['Frontend', 12],
          ['Backend', 8],
          ['DevOps', 3],
          ['QA', 6],
        ],
        color: '#2196F3',
      },
      {
        name: 'Junior Developers',
        data: [
          ['Frontend', 5],
          ['Backend', 4],
          ['DevOps', 2],
          ['QA', 4],
        ],
        color: '#4CAF50',
      },
    ],
  },
};

// Custom Dimensions and Styling
export const CustomStyling: Story = {
  args: {
    title: 'Revenue Comparison',
    subtitle: 'Year over Year Growth',
    series: [
      {
        name: '2023',
        data: [
          ['Q1', 125000],
          ['Q2', 142000],
          ['Q3', 138000],
          ['Q4', 165000],
        ],
        color: '#FF6B6B',
      },
      {
        name: '2024',
        data: [
          ['Q1', 145000],
          ['Q2', 168000],
          ['Q3', 172000],
          ['Q4', 195000],
        ],
        color: '#4ECDC4',
      },
    ],
    height: 500,
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for bar chart data...',
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
    subtitle: 'Mixed data types',
    series: [
      {
        name: 'Mixed',
        data: [
          ['Valid', 25],
          null as any,
          undefined as any,
          ['Another Valid', 15],
        ],
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Bar Chart',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Sales Data',
        data: [
          ['Product A', 45000],
          ['Product B', 38000],
          ['Product C', 52000],
          ['Product D', 41000],
        ],
        color: '#4CAF50',
      },
    ],
    ariaLabel: 'Bar chart showing sales data for 4 products. Product A: $45,000, Product B: $38,000, Product C: $52,000, Product D: $41,000',
  },
};