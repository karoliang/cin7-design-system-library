import type { Meta, StoryObj } from '@storybook/react';
import { ScatterChart, ScatterChartProps } from '../react/ScatterChart';

const meta: Meta<ScatterChartProps> = {
  title: 'Charts/ScatterChart',
  component: ScatterChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Scatter charts are perfect for showing relationships between two numerical variables, correlation patterns, and data distribution. They excel at:

- Identifying correlations and trends
- Finding outliers and anomalies
- Showing data density and clustering
- Comparing multiple groups on the same axes

**Best Practices:**
- Use consistent scales for easy comparison
- Include reference lines for means or targets
- Use different colors/shapes for multiple series
- Consider bubble charts for third dimension data
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
    variant: {
      control: 'select',
      options: ['scatter', 'bubble'],
      description: 'Chart type - scatter plot or bubble chart',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show labels on data points',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    tooltip: {
      control: 'boolean',
      description: 'Enable tooltips on hover',
    },
    markerSize: {
      control: { type: 'range', min: 2, max: 20, step: 1 },
      description: 'Default marker size',
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
    dataLabels: false,
    variant: 'scatter',
    legend: true,
    tooltip: true,
    markerSize: 6,
  },
};

export default meta;
type Story = StoryObj<ScatterChartProps>;

// Basic Scatter Plot
export const Default: Story = {
  args: {
    title: 'Height vs Weight Analysis',
    subtitle: 'Correlation Study',
    series: [
      {
        name: 'Males',
        data: [
          [165, 60],
          [170, 68],
          [175, 72],
          [180, 78],
          [185, 85],
          [168, 65],
          [172, 70],
          [178, 75],
        ],
      },
    ],
    xAxis: {
      title: 'Height (cm)',
      min: 160,
      max: 190,
    },
    yAxis: {
      title: 'Weight (kg)',
      min: 50,
      max: 90,
    },
  },
};

// Multiple Series Comparison
export const MultipleSeries: Story = {
  args: {
    title: 'Student Performance',
    subtitle: 'Math vs Science Scores',
    series: [
      {
        name: 'Class A',
        data: [
          [65, 70],
          [75, 85],
          [80, 78],
          [90, 92],
          [70, 75],
          [85, 88],
          [60, 65],
          [95, 90],
        ],
        color: '#4CAF50',
      },
      {
        name: 'Class B',
        data: [
          [70, 65],
          [80, 75],
          [85, 82],
          [88, 90],
          [75, 70],
          [90, 85],
          [65, 60],
          [92, 88],
        ],
        color: '#2196F3',
      },
    ],
    xAxis: {
      title: 'Math Score',
      min: 50,
      max: 100,
    },
    yAxis: {
      title: 'Science Score',
      min: 50,
      max: 100,
    },
  },
};

// Bubble Chart (3D Data)
export const BubbleChart: Story = {
  args: {
    title: 'Market Analysis',
    subtitle: 'Revenue vs Growth Rate (Bubble Size = Market Cap)',
    variant: 'bubble',
    series: [
      {
        name: 'Tech Companies',
        data: [
          [100, 15, 50],  // [x: revenue, y: growth, size: market cap]
          [80, 25, 30],
          [60, 35, 20],
          [120, 10, 80],
          [40, 45, 15],
          [90, 20, 40],
        ],
        color: '#FF6B6B',
      },
      {
        name: 'Retail Companies',
        data: [
          [70, 8, 35],
          [50, 12, 25],
          [85, 5, 45],
          [65, 10, 30],
          [75, 7, 38],
        ],
        color: '#4ECDC4',
      },
    ],
    xAxis: {
      title: 'Revenue ($M)',
      min: 30,
      max: 130,
    },
    yAxis: {
      title: 'Growth Rate (%)',
      min: 0,
      max: 50,
    },
    markerSize: 8,
  },
};

// Correlation Patterns
export const PositiveCorrelation: Story = {
  args: {
    title: 'Study Time vs Test Scores',
    subtitle: 'Strong Positive Correlation',
    series: [
      {
        name: 'Students',
        data: [
          [1, 45],
          [2, 52],
          [3, 58],
          [4, 65],
          [5, 70],
          [6, 75],
          [7, 82],
          [8, 88],
          [9, 92],
          [10, 95],
        ],
        color: '#45B7D1',
      },
    ],
    xAxis: {
      title: 'Study Hours per Day',
      min: 0,
      max: 12,
    },
    yAxis: {
      title: 'Test Score (%)',
      min: 40,
      max: 100,
    },
  },
};

// No Correlation Example
export const NoCorrelation: Story = {
  args: {
    title: 'Random Distribution',
    subtitle: 'No Clear Pattern',
    series: [
      {
        name: 'Random Data',
        data: [
          [20, 80],
          [80, 25],
          [40, 60],
          [70, 35],
          [30, 70],
          [60, 40],
          [50, 50],
          [90, 20],
          [25, 75],
          [85, 30],
        ],
        color: '#96CEB4',
      },
    ],
    xAxis: {
      title: 'Variable X',
      min: 0,
      max: 100,
    },
    yAxis: {
      title: 'Variable Y',
      min: 0,
      max: 100,
    },
  },
};

// Outlier Detection
export const Outliers: Story = {
  args: {
    title: 'Quality Control Analysis',
    subtitle: 'Identifying Anomalies',
    series: [
      {
        name: 'Normal Range',
        data: [
          [45, 48],
          [52, 51],
          [48, 52],
          [50, 49],
          [47, 50],
          [53, 52],
          [49, 48],
          [51, 51],
          [46, 49],
          [52, 50],
        ],
        color: '#4CAF50',
      },
      {
        name: 'Outliers',
        data: [
          [80, 35],  // Clear outlier
          [20, 85],  // Clear outlier
          [50, 50],  // Normal point in outlier series for comparison
        ],
        color: '#F44336',
        markerSize: 10,
      },
    ],
    xAxis: {
      title: 'Measurement A',
      min: 0,
      max: 100,
    },
    yAxis: {
      title: 'Measurement B',
      min: 0,
      max: 100,
    },
  },
};

// Clustering Example
export const Clusters: Story = {
  args: {
    title: 'Customer Segments',
    subtitle: 'Purchase Behavior Analysis',
    series: [
      {
        name: 'High Value',
        data: [
          [80, 85],
          [85, 90],
          [90, 88],
          [82, 87],
          [88, 92],
          [86, 89],
        ],
        color: '#FFD700',
      },
      {
        name: 'Medium Value',
        data: [
          [50, 55],
          [55, 50],
          [52, 58],
          [48, 52],
          [58, 54],
          [54, 56],
        ],
        color: '#87CEEB',
      },
      {
        name: 'Low Value',
        data: [
          [20, 25],
          [25, 20],
          [22, 28],
          [18, 22],
          [28, 24],
          [24, 26],
        ],
        color: '#98FB98',
      },
    ],
    xAxis: {
      title: 'Frequency of Purchase',
      min: 0,
      max: 100,
    },
    yAxis: {
      title: 'Average Order Value',
      min: 0,
      max: 100,
    },
  },
};

// Scientific Data Example
export const ScientificData: Story = {
  args: {
    title: 'Drug Efficacy Study',
    subtitle: 'Dosage vs Response Rate',
    series: [
      {
        name: 'Drug A',
        data: [
          [10, 15],
          [20, 28],
          [30, 45],
          [40, 62],
          [50, 75],
          [60, 82],
          [70, 87],
          [80, 90],
        ],
        color: '#E91E63',
      },
      {
        name: 'Drug B',
        data: [
          [10, 12],
          [20, 22],
          [30, 35],
          [40, 48],
          [50, 58],
          [60, 65],
          [70, 70],
          [80, 73],
        ],
        color: '#9C27B0',
      },
      {
        name: 'Placebo',
        data: [
          [10, 8],
          [20, 10],
          [30, 12],
          [40, 11],
          [50, 13],
          [60, 12],
          [70, 14],
          [80, 13],
        ],
        color: '#757575',
      },
    ],
    xAxis: {
      title: 'Dosage (mg)',
      min: 0,
      max: 100,
    },
    yAxis: {
      title: 'Response Rate (%)',
      min: 0,
      max: 100,
    },
  },
};

// With Data Labels
export const WithDataLabels: Story = {
  args: {
    title: 'Regional Performance',
    subtitle: 'Sales vs Customer Satisfaction',
    series: [
      {
        name: 'Q4 2024',
        data: [
          [85, 92],
          [78, 88],
          [92, 95],
          [70, 82],
          [88, 90],
        ],
        color: '#2196F3',
      },
    ],
    xAxis: {
      title: 'Sales Performance',
      min: 60,
      max: 100,
    },
    yAxis: {
      title: 'Customer Satisfaction',
      min: 75,
      max: 100,
    },
    dataLabels: true,
    markerSize: 8,
  },
};

// Custom Axes Configuration
export const CustomAxes: Story = {
  args: {
    title: 'Temperature vs Ice Cream Sales',
    subtitle: 'Seasonal Analysis',
    series: [
      {
        name: 'Daily Sales',
        data: [
          [15, 120],
          [18, 145],
          [22, 180],
          [25, 220],
          [28, 265],
          [30, 290],
          [32, 310],
          [35, 325],
        ],
        color: '#FF9800',
      },
    ],
    xAxis: {
      title: 'Temperature (°C)',
      min: 10,
      max: 40,
      labelFormat: '{value}°C',
      gridLines: true,
    },
    yAxis: {
      title: 'Ice Cream Sales ($)',
      min: 100,
      max: 350,
      labelFormat: '${value}',
      gridLines: true,
    },
  },
};

// Large Dataset
export const LargeDataset: Story = {
  args: {
    title: 'Population Density Analysis',
    subtitle: 'Urban Planning Data',
    series: [
      {
        name: 'Cities',
        data: Array.from({ length: 50 }, (_, i) => [
          Math.random() * 100,
          Math.random() * 100,
        ]),
        color: '#607D8B',
        markerSize: 4,
      },
    ],
    xAxis: {
      title: 'Population Density',
      min: 0,
      max: 100,
    },
    yAxis: {
      title: 'Economic Index',
      min: 0,
      max: 100,
    },
  },
};

// Time Series Scatter
export const TimeSeries: Story = {
  args: {
    title: 'Stock Volatility Analysis',
    subtitle: 'Daily Returns Analysis',
    series: [
      {
        name: 'Tech Stock',
        data: [
          [1, 2.5],
          [2, -1.8],
          [3, 3.2],
          [4, -0.5],
          [5, 1.8],
          [6, -2.1],
          [7, 4.1],
          [8, -1.2],
          [9, 2.8],
          [10, -0.8],
        ],
        color: '#00BCD4',
      },
    ],
    xAxis: {
      title: 'Trading Day',
      min: 0,
      max: 12,
    },
    yAxis: {
      title: 'Daily Return (%)',
      min: -5,
      max: 5,
    },
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for scatter plot data...',
    series: [
      {
        name: 'Empty',
        data: [],
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Scatter Plot',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Performance Metrics',
        data: [
          [70, 80],
          [85, 90],
          [60, 75],
          [90, 85],
          [75, 88],
        ],
        color: '#4CAF50',
      },
    ],
    xAxis: {
      title: 'Efficiency Score',
    },
    yAxis: {
      title: 'Quality Score',
    },
    ariaLabel: 'Scatter plot showing relationship between efficiency and quality scores for 5 data points',
  },
};