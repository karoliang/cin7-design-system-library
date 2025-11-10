/**
 * ScatterChart stories for AG Charts integration
 * Interactive examples showcasing correlation and distribution analysis
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ScatterChart } from '@cin7/ag-charts-adapter/react';

const meta: Meta<typeof ScatterChart> = {
  title: 'Charts/AG Charts/ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AG Charts ScatterChart Component

The ScatterChart component uses AG Charts for correlation analysis and distribution visualization.
Perfect for showing relationships between two variables, clustering patterns, and outlier detection.

### Key Features
- **Correlation Analysis**: Visualize relationships between variables
- **Bubble Chart Support**: Size represents third dimension
- **High Performance**: Handles thousands of data points efficiently
- **Interactive**: Zoom, pan, and hover for detailed analysis
- **Clustering**: Natural grouping visualization
- **Outlier Detection**: Easy identification of anomalies
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
      description: 'Array of data series with [x, y] or [x, y, size] points',
    },
    variant: {
      control: 'select',
      options: ['scatter', 'bubble'],
      description: 'Chart variant - scatter plot or bubble chart',
    },
    markers: {
      control: 'boolean',
      description: 'Show markers on data points',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on points',
    },
    markerSize: {
      control: { type: 'range', min: 1, max: 20, step: 1 },
      description: 'Default marker size in pixels',
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
const generateCorrelationData = (points: number = 50, correlation: number = 0.7) => {
  return Array.from({ length: points }, (_, i) => [
    Math.random() * 100,
    correlation * (Math.random() * 100) + (1 - correlation) * i * 2,
  ]);
};

const generateClusterData = () => [
  {
    name: 'Cluster A',
    data: Array.from({ length: 30 }, () => [
      20 + Math.random() * 20,
      30 + Math.random() * 20,
    ]),
    color: '#5C6AC4',
  },
  {
    name: 'Cluster B',
    data: Array.from({ length: 25 }, () => [
      60 + Math.random() * 20,
      60 + Math.random() * 20,
    ]),
    color: '#47C1BF',
  },
  {
    name: 'Cluster C',
    data: Array.from({ length: 35 }, () => [
      40 + Math.random() * 15,
      10 + Math.random() * 15,
    ]),
    color: '#F49342',
  },
];

const generateBubbleData = () => [
  {
    name: 'Tech Companies',
    data: [
      [85, 92, 1500], // [x, y, size]
      [78, 88, 1200],
      [92, 95, 2800],
      [88, 82, 900],
      [75, 79, 600],
      [95, 98, 3500],
    ],
    color: '#006FBB',
  },
  {
    name: 'Retail Companies',
    data: [
      [45, 62, 800],
      [52, 68, 950],
      [38, 55, 400],
      [58, 71, 1100],
      [42, 48, 650],
    ],
    color: '#50B83C',
  },
  {
    name: 'Healthcare Companies',
    data: [
      [65, 78, 750],
      [72, 85, 1300],
      [68, 72, 900],
      [78, 88, 1600],
      [62, 70, 550],
    ],
    color: '#DC5E27',
  },
];

export const Default: Story = {
  args: {
    title: 'Height vs Weight Correlation',
    subtitle: 'Sample dataset showing positive correlation',
    series: [
      {
        name: 'Males',
        data: [
          [170, 65], [175, 71], [180, 78], [185, 82], [190, 88],
          [172, 68], [177, 74], [182, 79], [187, 85], [192, 91],
          [174, 66], [179, 73], [184, 77], [189, 83], [194, 89],
        ],
        color: '#5C6AC4',
      },
      {
        name: 'Females',
        data: [
          [160, 55], [165, 61], [170, 65], [175, 70], [180, 75],
          [162, 57], [167, 63], [172, 67], [177, 72], [182, 77],
          [164, 59], [169, 64], [174, 68], [179, 73], [184, 78],
        ],
        color: '#C32C69',
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Height (cm)',
    },
    yAxis: {
      title: 'Weight (kg)',
    },
  },
};

export const PositiveCorrelation: Story = {
  args: {
    title: 'Strong Positive Correlation',
    subtitle: 'Marketing Spend vs Revenue Growth',
    series: [
      {
        name: 'Q1-Q4 Data',
        data: generateCorrelationData(100, 0.85),
        color: '#006FBB',
        markerSize: 8,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Marketing Spend ($K)',
    },
    yAxis: {
      title: 'Revenue Growth (%)',
    },
  },
};

export const NegativeCorrelation: Story = {
  args: {
    title: 'Negative Correlation',
    subtitle: 'Price vs Demand Analysis',
    series: [
      {
        name: 'Demand Curve',
        data: Array.from({ length: 50 }, () => [
          20 + Math.random() * 80, // Price
          100 - (Math.random() * 60 + 20), // Demand (inverse relationship)
        ]),
        color: '#DC5E27',
        markerSize: 8,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Price ($)',
    },
    yAxis: {
      title: 'Demand (Units)',
    },
  },
};

export const NoCorrelation: Story = {
  args: {
    title: 'No Correlation',
    subtitle: 'Random distribution pattern',
    series: [
      {
        name: 'Random Data',
        data: Array.from({ length: 75 }, () => [
          Math.random() * 100,
          Math.random() * 100,
        ]),
        color: '#9C6ADE',
        markerSize: 6,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Variable X',
    },
    yAxis: {
      title: 'Variable Y',
    },
  },
};

export const Clusters: Story = {
  args: {
    title: 'Customer Segmentation Clusters',
    subtitle: 'Natural grouping in customer behavior data',
    series: generateClusterData(),
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Purchase Frequency',
    },
    yAxis: {
      title: 'Average Order Value ($)',
    },
  },
};

export const BubbleChart: Story = {
  args: {
    title: 'Company Performance Bubble Chart',
    subtitle: 'Revenue vs Profit (Bubble Size = Market Cap)',
    series: generateBubbleData(),
    variant: 'bubble',
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Revenue Growth (%)',
    },
    yAxis: {
      title: 'Profit Margin (%)',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
Bubble chart where:
- X-axis: Revenue Growth percentage
- Y-axis: Profit Margin percentage
- Bubble Size: Market Capitalization in millions

This three-dimensional visualization helps identify companies that are:
- High growth, high profit (top-right, large bubbles)
- High growth, low profit (top-left, small bubbles)
- Low growth, high profit (bottom-right, medium bubbles)
        `,
      },
    },
  },
};

export const Outliers: Story = {
  args: {
    title: 'Outlier Detection',
    subtitle: 'Identifying anomalies in test scores',
    series: [
      {
        name: 'Normal Range',
        data: Array.from({ length: 40 }, () => [
          60 + Math.random() * 30, // Study hours
          65 + Math.random() * 25, // Test score
        ]),
        color: '#50B83C',
        markerSize: 6,
      },
      {
        name: 'Outliers',
        data: [
          [5, 95],   // Low study, high score (possible cheating)
          [95, 25],  // High study, low score (difficulty issues)
          [50, 100], // Average study, perfect score (advanced student)
          [10, 15],  // Low study, low score (disengaged)
        ],
        color: '#DC5E27',
        markerSize: 10,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Study Hours per Week',
    },
    yAxis: {
      title: 'Test Score (%)',
    },
  },
};

export const MultipleGroups: Story = {
  args: {
    title: 'Multi-Group Comparison',
    subtitle: 'Performance metrics across different teams',
    series: [
      {
        name: 'Engineering',
        data: generateCorrelationData(25, 0.7),
        color: '#5C6AC4',
        markerSize: 8,
      },
      {
        name: 'Sales',
        data: generateCorrelationData(30, 0.5),
        color: '#47C1BF',
        markerSize: 8,
      },
      {
        name: 'Marketing',
        data: generateCorrelationData(20, 0.8),
        color: '#BD10E0',
        markerSize: 8,
      },
      {
        name: 'Support',
        data: generateCorrelationData(35, 0.3),
        color: '#F49342',
        markerSize: 8,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Experience (Years)',
    },
    yAxis: {
      title: 'Performance Score',
    },
  },
};

export const LargeDataset: Story = {
  args: {
    title: 'High-Density Scatter Plot',
    subtitle: '10,000 data points for pattern analysis',
    series: [
      {
        name: 'High Frequency Data',
        data: Array.from({ length: 10000 }, () => [
          Math.random() * 100,
          Math.random() * 100,
        ]),
        color: '#00A0AC',
        markerSize: 2,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'X Variable',
    },
    yAxis: {
      title: 'Y Variable',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
This demonstrates the performance capabilities of AG Charts with large datasets.
The chart efficiently renders 10,000 points while maintaining smooth interactions.
        `,
      },
    },
  },
};

export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Scatter Chart',
    subtitle: 'Branded colors and custom markers',
    series: [
      {
        name: 'Premium Segment',
        data: Array.from({ length: 20 }, () => [
          70 + Math.random() * 30,
          70 + Math.random() * 30,
        ]),
        color: '#FFD700',
        markerSize: 12,
      },
      {
        name: 'Standard Segment',
        data: Array.from({ length: 40 }, () => [
          30 + Math.random() * 40,
          30 + Math.random() * 40,
        ]),
        color: '#C0C0C0',
        markerSize: 8,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Customer Satisfaction',
    },
    yAxis: {
      title: 'Brand Loyalty',
    },
  },
};

export const Scientific: Story = {
  args: {
    title: 'Scientific Data Analysis',
    subtitle: 'Experimental results correlation',
    series: [
      {
        name: 'Experiment 1',
        data: [
          [0.1, 0.12], [0.2, 0.25], [0.3, 0.38], [0.4, 0.52],
          [0.5, 0.61], [0.6, 0.78], [0.7, 0.85], [0.8, 0.95],
          [0.9, 1.08], [1.0, 1.15],
        ],
        color: '#006FBB',
        markerSize: 8,
      },
      {
        name: 'Experiment 2',
        data: [
          [0.1, 0.08], [0.2, 0.18], [0.3, 0.32], [0.4, 0.45],
          [0.5, 0.58], [0.6, 0.72], [0.7, 0.81], [0.8, 0.92],
          [0.9, 1.02], [1.0, 1.12],
        ],
        color: '#DC5E27',
        markerSize: 8,
      },
    ],
    markers: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Concentration (mol/L)',
    },
    yAxis: {
      title: 'Reaction Rate (mol/s)',
    },
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Scatter Analysis',
    subtitle: 'Hover for detailed values, zoom for closer inspection',
    series: [
      {
        name: 'Product Performance',
        data: Array.from({ length: 50 }, () => [
          Math.random() * 100,
          Math.random() * 100,
        ]),
        color: '#47C1BF',
        markerSize: 8,
      },
    ],
    markers: true,
    tooltip: true,
    height: 500,
    width: 700,
    xAxis: {
      title: 'Quality Score',
    },
    yAxis: {
      title: 'Customer Rating',
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
This interactive example showcases:
- Hover tooltips with exact coordinate values
- Zoom functionality for detailed analysis
- Pan to explore different regions
- Click for point selection
- Responsive interactions
        `,
      },
    },
  },
};