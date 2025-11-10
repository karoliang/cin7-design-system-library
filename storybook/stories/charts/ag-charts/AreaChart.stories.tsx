/**
 * AreaChart stories for AG Charts integration
 * Interactive examples showcasing AG Charts AreaChart component capabilities
 */

import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart } from '@cin7/ag-charts-adapter/react';

const meta: Meta<typeof AreaChart> = {
  title: 'Charts/AG Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AG Charts AreaChart Component

The AreaChart component uses AG Charts for high-performance data visualization with smooth animations and responsive design.
Perfect for showing volume trends, cumulative data, and time-series analysis.

### Key Features
- **High Performance**: Canvas-based rendering for smooth interactions
- **Responsive Design**: Automatically adapts to container size
- **Theme Integration**: Seamless Cin7 design system theming
- **Accessibility**: Full screen reader support with ARIA labels
- **Animation**: Smooth transitions and data updates
- **Stacking**: Support for normal and percentage stacking
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Chart title displayed above the chart',
    },
    subtitle: {
      control: 'text',
      description: 'Chart subtitle displayed below the title',
    },
    series: {
      control: 'object',
      description: 'Array of data series to display',
    },
    smooth: {
      control: 'boolean',
      description: 'Enable smooth curves (spline area)',
    },
    stacking: {
      control: 'select',
      options: ['normal', 'percent', undefined],
      description: 'Stacking mode for multiple series',
    },
    markers: {
      control: 'boolean',
      description: 'Show markers on data points',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on points',
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Fill opacity for area (0-1)',
    },
    legend: {
      control: 'boolean',
      description: 'Show chart legend',
    },
    tooltip: {
      control: 'boolean',
      description: 'Enable hover tooltips',
    },
    height: {
      control: 'number',
      description: 'Chart height in pixels',
    },
    width: {
      control: 'number',
      description: 'Chart width in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data generators
const generateTimeSeriesData = (points: number = 12) => {
  return Array.from({ length: points }, (_, i) => ({
    name: `Month ${i + 1}`,
    data: Array.from({ length: 30 }, (_, day) => [
      day + 1,
      Math.floor(Math.random() * 100) + 50,
    ]),
  }));
};

const generateCategoryData = () => [
  {
    name: 'Revenue',
    data: [
      ['Q1', 120000],
      ['Q2', 150000],
      ['Q3', 180000],
      ['Q4', 210000],
    ],
    color: '#5C6AC4',
    fillOpacity: 0.6,
  },
  {
    name: 'Costs',
    data: [
      ['Q1', 80000],
      ['Q2', 95000],
      ['Q3', 110000],
      ['Q4', 125000],
    ],
    color: '#DC5E27',
    fillOpacity: 0.6,
  },
];

const generateStackedData = () => [
  {
    name: 'Product A',
    data: [
      ['Jan', 65],
      ['Feb', 78],
      ['Mar', 90],
      ['Apr', 81],
      ['May', 56],
      ['Jun', 85],
    ],
    color: '#5C6AC4',
  },
  {
    name: 'Product B',
    data: [
      ['Jan', 48],
      ['Feb', 58],
      ['Mar', 40],
      ['Apr', 65],
      ['May', 68],
      ['Jun', 82],
    ],
    color: '#006FBB',
  },
  {
    name: 'Product C',
    data: [
      ['Jan', 28],
      ['Feb', 38],
      ['Mar', 40],
      ['Apr', 36],
      ['May', 56],
      ['Jun', 62],
    ],
    color: '#47C1BF',
  },
];

export const Default: Story = {
  args: {
    title: 'Monthly Revenue Trend',
    subtitle: 'Showing growth over the last 12 months',
    series: [
      {
        name: 'Revenue',
        data: [
          [1, 45000],
          [2, 52000],
          [3, 48000],
          [4, 61000],
          [5, 58000],
          [6, 67000],
          [7, 72000],
          [8, 69000],
          [9, 75000],
          [10, 82000],
          [11, 86000],
          [12, 92000],
        ],
        color: '#5C6AC4',
        fillOpacity: 0.3,
      },
    ],
    height: 400,
    width: 800,
  },
};

export const SmoothCurves: Story = {
  args: {
    title: 'Smooth Area Chart',
    subtitle: 'Using spline interpolation for smooth curves',
    series: [
      {
        name: 'User Growth',
        data: [
          [1, 1000],
          [2, 1200],
          [3, 1800],
          [4, 2400],
          [5, 3200],
          [6, 4100],
          [7, 5300],
          [8, 6800],
        ],
        color: '#47C1BF',
        fillOpacity: 0.4,
      },
    ],
    smooth: true,
    markers: true,
    height: 400,
    width: 800,
  },
};

export const StackedNormal: Story = {
  args: {
    title: 'Stacked Area Chart - Normal',
    subtitle: 'Multiple series stacked with absolute values',
    series: generateStackedData(),
    stacking: 'normal',
    markers: true,
    height: 400,
    width: 800,
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Sales ($ thousands)',
    },
  },
};

export const StackedPercentage: Story = {
  args: {
    title: 'Stacked Area Chart - Percentage',
    subtitle: 'Multiple series showing percentage distribution',
    series: generateStackedData(),
    stacking: 'percent',
    markers: true,
    height: 400,
    width: 800,
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Percentage (%)',
      labelFormat: '{value}%',
    },
  },
};

export const MultipleSeries: Story = {
  args: {
    title: 'Revenue vs Costs Analysis',
    subtitle: 'Comparing revenue streams against costs',
    series: generateCategoryData(),
    markers: true,
    dataLabels: true,
    height: 400,
    width: 800,
    xAxis: {
      title: 'Quarter',
    },
    yAxis: {
      title: 'Amount ($)',
      labelFormat: '${value:,.0f}',
    },
  },
};

export const WithDataLabels: Story = {
  args: {
    title: 'Area Chart with Data Labels',
    subtitle: 'Showing exact values on each data point',
    series: [
      {
        name: 'Sales Target',
        data: [
          ['Week 1', 85],
          ['Week 2', 92],
          ['Week 3', 78],
          ['Week 4', 95],
          ['Week 5', 88],
        ],
        color: '#50B83C',
        fillOpacity: 0.5,
      },
    ],
    dataLabels: true,
    markers: true,
    height: 400,
    width: 800,
  },
};

export const HighOpacity: Story = {
  args: {
    title: 'High Opacity Area Chart',
    subtitle: 'Emphasizing data with stronger colors',
    series: [
      {
        name: 'Performance',
        data: [
          [1, 75],
          [2, 82],
          [3, 79],
          [4, 88],
          [5, 91],
          [6, 86],
        ],
        color: '#BD10E0',
        fillOpacity: 0.8,
      },
    ],
    markers: true,
    height: 400,
    width: 800,
  },
};

export const LowOpacity: Story = {
  args: {
    title: 'Low Opacity Area Chart',
    subtitle: 'Subtle visualization for background context',
    series: [
      {
        name: 'Background Trend',
        data: [
          [1, 60],
          [2, 65],
          [3, 62],
          [4, 68],
          [5, 72],
          [6, 70],
        ],
        color: '#9C6ADE',
        fillOpacity: 0.1,
      },
    ],
    markers: false,
    height: 400,
    width: 800,
  },
};

export const LargeDataset: Story = {
  args: {
    title: 'Large Dataset Performance',
    subtitle: 'Handling 1000+ data points efficiently',
    series: [
      {
        name: 'High Frequency Data',
        data: Array.from({ length: 1000 }, (_, i) => [
          i,
          Math.sin(i * 0.1) * 100 + Math.random() * 20 + 150,
        ]),
        color: '#00A0AC',
        fillOpacity: 0.2,
      },
    ],
    markers: false, // Disable markers for better performance
    height: 400,
    width: 800,
  },
};

export const CustomTheme: Story = {
  args: {
    title: 'Custom Themed Area Chart',
    subtitle: 'Using dark theme with custom colors',
    series: [
      {
        name: 'Dark Theme Data',
        data: [
          [1, 120],
          [2, 135],
          [3, 125],
          [4, 145],
          [5, 160],
          [6, 155],
        ],
        color: '#00E3F0',
        fillOpacity: 0.4,
      },
    ],
    theme: {
      mode: 'dark',
      colors: ['#00E3F0', '#FF6D9A', '#FFA86C'],
    },
    markers: true,
    height: 400,
    width: 800,
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Area Chart',
    subtitle: 'Hover over points to see tooltips',
    series: [
      {
        name: 'Q1 Performance',
        data: [
          ['Jan', 45],
          ['Feb', 52],
          ['Mar', 48],
        ],
        color: '#F49342',
        fillOpacity: 0.3,
      },
      {
        name: 'Q2 Performance',
        data: [
          ['Apr', 58],
          ['May', 65],
          ['Jun', 62],
        ],
        color: '#50B83C',
        fillOpacity: 0.3,
      },
    ],
    markers: true,
    tooltip: true,
    height: 400,
    width: 800,
  },
  parameters: {
    docs: {
      description: {
        story: `
This interactive example demonstrates:
- Hover tooltips showing exact values
- Click interactions for detailed views
- Responsive behavior on window resize
- Smooth animations on data updates
        `,
      },
    },
  },
};

// Responsive story for testing different screen sizes
export const Responsive: Story = {
  args: {
    title: 'Responsive Area Chart',
    subtitle: 'Automatically adjusts to container size',
    series: [
      {
        name: 'Responsive Data',
        data: [
          ['Mobile', 45],
          ['Tablet', 68],
          ['Desktop', 82],
          ['Large Screen', 75],
        ],
        color: '#C32C69',
        fillOpacity: 0.5,
      },
    ],
    responsive: true,
    height: 300,
    width: '100%',
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1024px', height: '768px' },
        },
      },
    },
  },
};