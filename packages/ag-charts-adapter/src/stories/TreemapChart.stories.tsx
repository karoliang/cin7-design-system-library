import type { Meta, StoryObj } from '@storybook/react';
import { TreemapChart, TreemapChartProps } from '../react/TreemapChart';

const meta: Meta<TreemapChartProps> = {
  title: 'Charts/TreemapChart',
  component: TreemapChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Treemap charts are excellent for visualizing hierarchical data and showing proportional relationships. They excel at:

- Displaying hierarchical structures with parent-child relationships
- Showing relative sizes of different categories
- Visualizing file systems, organizational structures, and portfolio breakdowns
- Comparing proportions across multiple dimensions

**Best Practices:**
- Use clear color schemes to distinguish categories
- Include meaningful labels and tooltips
- Limit hierarchy depth to 3-4 levels for readability
- Use consistent sizing that reflects actual values
- Consider interactive features for large datasets
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
      description: 'Treemap data series',
    },
    layout: {
      control: 'select',
      options: ['squarify', 'slice', 'dice', 'slice-dice'],
      description: 'Layout algorithm for tiles',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive features',
    },
    height: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Chart height in pixels',
    },
  },
  args: {
    height: 400,
    layout: 'squarify',
    legend: true,
    interactive: true,
  },
};

export default meta;
type Story = StoryObj<TreemapChartProps>;

// Basic Treemap
export const Default: Story = {
  args: {
    title: 'Sales by Region',
    subtitle: 'Q4 2024 Revenue Distribution',
    series: [
      {
        name: 'Revenue',
        data: [
          { name: 'North America', value: 45000 },
          { name: 'Europe', value: 38000 },
          { name: 'Asia Pacific', value: 52000 },
          { name: 'Latin America', value: 15000 },
          { name: 'Africa', value: 8000 },
        ],
        colorScheme: 'category10',
        dataLabels: true,
        labelFormat: '{name}: ${value}k',
      },
    ],
  },
};

// Hierarchical Treemap
export const HierarchicalData: Story = {
  args: {
    title: 'Company Organizational Structure',
    subtitle: 'Employee Distribution by Department',
    series: [
      {
        name: 'Organization',
        data: [
          {
            name: 'Engineering',
            value: 150,
            children: [
              { name: 'Frontend', value: 45 },
              { name: 'Backend', value: 60 },
              { name: 'DevOps', value: 25 },
              { name: 'QA', value: 20 },
            ],
          },
          {
            name: 'Sales',
            value: 80,
            children: [
              { name: 'Direct Sales', value: 35 },
              { name: 'Channel Sales', value: 25 },
              { name: 'Sales Support', value: 20 },
            ],
          },
          {
            name: 'Marketing',
            value: 45,
            children: [
              { name: 'Digital Marketing', value: 20 },
              { name: 'Content', value: 15 },
              { name: 'Events', value: 10 },
            ],
          },
          {
            name: 'Operations',
            value: 35,
            children: [
              { name: 'HR', value: 15 },
              { name: 'Finance', value: 12 },
              { name: 'Legal', value: 8 },
            ],
          },
        ],
        colorScheme: 'blues',
        dataLabels: true,
        labelFormat: '{name}: {value}',
      },
    ],
  },
};

// Portfolio Allocation
export const PortfolioAllocation: Story = {
  args: {
    title: 'Investment Portfolio Allocation',
    subtitle: 'Asset Class Distribution',
    series: [
      {
        name: 'Portfolio',
        data: [
          {
            name: 'Equities',
            value: 450000,
            children: [
              { name: 'US Large Cap', value: 200000 },
              { name: 'International', value: 150000 },
              { name: 'Emerging Markets', value: 50000 },
              { name: 'Small Cap', value: 50000 },
            ],
          },
          {
            name: 'Fixed Income',
            value: 300000,
            children: [
              { name: 'Government Bonds', value: 150000 },
              { name: 'Corporate Bonds', value: 100000 },
              { name: 'Municipal Bonds', value: 50000 },
            ],
          },
          {
            name: 'Real Estate',
            value: 150000,
            children: [
              { name: 'REITs', value: 100000 },
              { name: 'Direct Property', value: 50000 },
            ],
          },
          {
            name: 'Alternatives',
            value: 100000,
            children: [
              { name: 'Commodities', value: 60000 },
              { name: 'Hedge Funds', value: 40000 },
            ],
          },
        ],
        colorScheme: 'greens',
        dataLabels: true,
        labelFormat: '{name}: ${value}',
      },
    ],
  },
};

// File System Visualization
export const FileSystemVisualization: Story = {
  args: {
    title: 'File System Usage',
    subtitle: 'Disk Space by Directory',
    series: [
      {
        name: 'Storage',
        data: [
          {
            name: 'Users',
            value: 250,
            children: [
              { name: 'Documents', value: 80 },
              { name: 'Pictures', value: 120 },
              { name: 'Videos', value: 45 },
              { name: 'Downloads', value: 5 },
            ],
          },
          {
            name: 'Applications',
            value: 180,
            children: [
              { name: 'Productivity', value: 60 },
              { name: 'Development', value: 80 },
              { name: 'Utilities', value: 40 },
            ],
          },
          {
            name: 'System',
            value: 120,
            children: [
              { name: 'Logs', value: 30 },
              { name: 'Cache', value: 50 },
              { name: 'Configuration', value: 40 },
            ],
          },
        ],
        colorScheme: 'oranges',
        dataLabels: true,
        labelFormat: '{name}: {value}GB',
      },
    ],
  },
};

// Market Share Analysis
export const MarketShareAnalysis: Story = {
  args: {
    title: 'Market Share Analysis',
    subtitle: 'Technology Sector Distribution',
    series: [
      {
        name: 'Market Share',
        data: [
          {
            name: 'Cloud Services',
            value: 35,
            children: [
              { name: 'AWS', value: 15 },
              { name: 'Azure', value: 12 },
              { name: 'Google Cloud', value: 5 },
              { name: 'Others', value: 3 },
            ],
          },
          {
            name: 'Software',
            value: 28,
            children: [
              { name: 'Enterprise Software', value: 15 },
              { name: 'SaaS', value: 8 },
              { name: 'Productivity', value: 5 },
            ],
          },
          {
            name: 'Hardware',
            value: 22,
            children: [
              { name: 'Servers', value: 10 },
              { name: 'Storage', value: 7 },
              { name: 'Networking', value: 5 },
            ],
          },
          {
            name: 'Services',
            value: 15,
            children: [
              { name: 'Consulting', value: 8 },
              { name: 'Support', value: 4 },
              { name: 'Training', value: 3 },
            ],
          },
        ],
        colorScheme: 'category20',
        dataLabels: true,
        labelFormat: '{name}: {value}%',
      },
    ],
  },
};

// Product Category Breakdown
export const ProductCategoryBreakdown: Story = {
  args: {
    title: 'Product Category Sales',
    subtitle: 'Revenue by Product Line',
    series: [
      {
        name: 'Products',
        data: [
          {
            name: 'Electronics',
            value: 125000,
            children: [
              { name: 'Smartphones', value: 45000 },
              { name: 'Laptops', value: 35000 },
              { name: 'Tablets', value: 20000 },
              { name: 'Accessories', value: 15000 },
              { name: 'Smart Home', value: 10000 },
            ],
          },
          {
            name: 'Clothing',
            value: 85000,
            children: [
              { name: 'Men\'s Wear', value: 35000 },
              { name: 'Women\'s Wear', value: 30000 },
              { name: 'Children\'s Wear', value: 15000 },
              { name: 'Accessories', value: 5000 },
            ],
          },
          {
            name: 'Home & Garden',
            value: 65000,
            children: [
              { name: 'Furniture', value: 25000 },
              { name: 'Decor', value: 20000 },
              { name: 'Garden', value: 12000 },
              { name: 'Kitchen', value: 8000 },
            ],
          },
        ],
        colorScheme: 'custom',
        dataLabels: true,
        labelFormat: '{name}: ${value}',
      },
    ],
  },
};

// Budget Allocation
export const BudgetAllocation: Story = {
  args: {
    title: 'Company Budget Allocation',
    subtitle: 'Annual Budget Distribution',
    series: [
      {
        name: 'Budget',
        data: [
          {
            name: 'Operations',
            value: 2000000,
            children: [
              { name: 'Salaries', value: 1200000 },
              { name: 'Benefits', value: 400000 },
              { name: 'Office Space', value: 250000 },
              { name: 'Utilities', value: 150000 },
            ],
          },
          {
            name: 'Marketing',
            value: 800000,
            children: [
              { name: 'Digital Advertising', value: 350000 },
              { name: 'Content Marketing', value: 200000 },
              { name: 'Events', value: 150000 },
              { name: 'PR', value: 100000 },
            ],
          },
          {
            name: 'R&D',
            value: 1200000,
            children: [
              { name: 'Product Development', value: 700000 },
              { name: 'Research', value: 300000 },
              { name: 'Prototyping', value: 200000 },
            ],
          },
        ],
        colorScheme: 'blues',
        dataLabels: true,
        labelFormat: '{name}: ${value}',
      },
    ],
  },
};

// Website Traffic Sources
export const WebsiteTrafficSources: Story = {
  args: {
    title: 'Website Traffic Sources',
    subtitle: 'Visitor Acquisition Channels',
    series: [
      {
        name: 'Traffic',
        data: [
          {
            name: 'Organic Search',
            value: 45000,
            children: [
              { name: 'Google', value: 35000 },
              { name: 'Bing', value: 7000 },
              { name: 'Other Search', value: 3000 },
            ],
          },
          {
            name: 'Direct Traffic',
            value: 25000,
            children: [
              { name: 'Typed URL', value: 18000 },
              { name: 'Bookmarks', value: 7000 },
            ],
          },
          {
            name: 'Social Media',
            value: 20000,
            children: [
              { name: 'Facebook', value: 8000 },
              { name: 'Twitter', value: 6000 },
              { name: 'LinkedIn', value: 4000 },
              { name: 'Instagram', value: 2000 },
            ],
          },
          {
            name: 'Referral',
            value: 10000,
            children: [
              { name: 'Partner Sites', value: 6000 },
              { name: 'Blogs', value: 2500 },
              { name: 'News Sites', value: 1500 },
            ],
          },
        ],
        colorScheme: 'oranges',
        dataLabels: true,
        labelFormat: '{name}: {value}',
      },
    ],
  },
};

// Custom Color Scheme
export const CustomColorScheme: Story = {
  args: {
    title: 'Custom Branded Treemap',
    subtitle: 'Brand Color Implementation',
    series: [
      {
        name: 'Custom Data',
        data: [
          { name: 'Segment A', value: 30, color: '#6366f1' },
          { name: 'Segment B', value: 25, color: '#8b5cf6' },
          { name: 'Segment C', value: 20, color: '#ec4899' },
          { name: 'Segment D', value: 15, color: '#f43f5e' },
          { name: 'Segment E', value: 10, color: '#f97316' },
        ],
        colorScheme: 'custom',
        dataLabels: true,
        showBorders: true,
        borderColor: '#ffffff',
      },
    ],
  },
};

// Color by Value
export const ColorByValue: Story = {
  args: {
    title: 'Performance by Value',
    subtitle: 'Color Intensity Based on Values',
    series: [
      {
        name: 'Performance',
        data: [
          { name: 'Excellent', value: 95 },
          { name: 'Good', value: 80 },
          { name: 'Average', value: 65 },
          { name: 'Below Average', value: 45 },
          { name: 'Poor', value: 25 },
          { name: 'Critical', value: 10 },
        ],
        colorScheme: 'greens',
        colorByValue: true,
        dataLabels: true,
        labelFormat: '{name}: {value}%',
      },
    ],
  },
};

// Dice Layout
export const DiceLayout: Story = {
  args: {
    title: 'Treemap with Dice Layout',
    subtitle: 'Alternative Layout Algorithm',
    layout: 'dice',
    series: [
      {
        name: 'Categories',
        data: [
          { name: 'Alpha', value: 40 },
          { name: 'Beta', value: 30 },
          { name: 'Gamma', value: 20 },
          { name: 'Delta', value: 15 },
          { name: 'Epsilon', value: 10 },
          { name: 'Zeta', value: 8 },
          { name: 'Eta', value: 5 },
        ],
        colorScheme: 'blues',
        dataLabels: true,
      },
    ],
  },
};

// Slice Layout
export const SliceLayout: Story = {
  args: {
    title: 'Treemap with Slice Layout',
    subtitle: 'Sequential Slice Algorithm',
    layout: 'slice',
    series: [
      {
        name: 'Data',
        data: [
          { name: 'Large', value: 100 },
          { name: 'Medium', value: 60 },
          { name: 'Small', value: 30 },
          { name: 'Tiny', value: 15 },
          { name: 'Mini', value: 8 },
        ],
        colorScheme: 'oranges',
        dataLabels: true,
      },
    ],
  },
};

// No Legend
export const NoLegend: Story = {
  args: {
    title: 'Simple Treemap',
    subtitle: 'No Legend Display',
    legend: false,
    series: [
      {
        name: 'Simple Data',
        data: [
          { name: 'A', value: 40 },
          { name: 'B', value: 30 },
          { name: 'C', value: 20 },
          { name: 'D', value: 10 },
        ],
        colorScheme: 'category10',
        dataLabels: true,
      },
    ],
  },
};

// Small Dataset
export const SmallDataset: Story = {
  args: {
    title: 'Minimal Treemap',
    subtitle: 'Simple Three-Item Example',
    series: [
      {
        name: 'Basic',
        data: [
          { name: 'Primary', value: 60 },
          { name: 'Secondary', value: 30 },
          { name: 'Tertiary', value: 10 },
        ],
        colorScheme: 'blues',
        dataLabels: true,
      },
    ],
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for treemap data...',
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
        name: 'Mixed Data',
        data: [
          { name: 'Valid', value: 50 },
          { name: 'Invalid', value: NaN },
          { name: 'Another Valid', value: 30 },
          { name: 'Zero Value', value: 0 },
        ],
        colorScheme: 'blues',
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Treemap',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Accessible Data',
        data: [
          { name: 'Category A', value: 40 },
          { name: 'Category B', value: 30 },
          { name: 'Category C', value: 20 },
          { name: 'Category D', value: 10 },
        ],
        colorScheme: 'blues',
        dataLabels: true,
        labelFormat: '{name}: {value}%',
      },
    ],
    ariaLabel: 'Treemap showing distribution across 4 categories: Category A (40%), Category B (30%), Category C (20%), Category D (10%). Sizes are proportional to percentage values.',
  },
};