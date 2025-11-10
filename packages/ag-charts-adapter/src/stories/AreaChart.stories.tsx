import type { Meta, StoryObj } from '@storybook/react';
import { AreaChart, AreaChartProps } from '../react/AreaChart';

const meta: Meta<AreaChartProps> = {
  title: 'Charts/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Area charts are excellent for showing trends over time or continuous data, particularly when you want to emphasize volume or magnitude. They're ideal for:

- Time series data with cumulative totals
- Showing data composition and changes over time
- Visualizing trends with filled areas for impact
- Comparing multiple related datasets

**Best Practices:**
- Use semi-transparent fills for overlapping areas
- Stacked areas work well for showing composition
- Percent stacking shows relative proportions
- Consider smoothing for continuous data trends
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
    stacking: {
      control: 'select',
      options: [undefined, 'normal', 'percent'],
      description: 'Stacking mode - none, normal, or percentage',
    },
    smooth: {
      control: 'boolean',
      description: 'Enable smooth curves (spline area)',
    },
    markers: {
      control: 'boolean',
      description: 'Show markers on data points',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    tooltip: {
      control: 'boolean',
      description: 'Enable tooltips on hover',
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Default fill opacity (0-1)',
    },
    height: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Chart height in pixels',
    },
  },
  args: {
    height: 400,
    stacking: undefined,
    smooth: false,
    markers: false,
    dataLabels: false,
    legend: true,
    tooltip: true,
    fillOpacity: 0.75,
  },
};

export default meta;
type Story = StoryObj<AreaChartProps>;

// Basic Area Chart
export const Default: Story = {
  args: {
    title: 'Monthly Revenue',
    subtitle: '2024 Performance',
    series: [
      {
        name: 'Revenue',
        data: [
          ['Jan', 45000],
          ['Feb', 52000],
          ['Mar', 48000],
          ['Apr', 61000],
          ['May', 58000],
          ['Jun', 67000],
          ['Jul', 72000],
          ['Aug', 69000],
        ],
        color: '#4CAF50',
      },
    ],
  },
};

// Stacked Area Chart
export const StackedAreas: Story = {
  args: {
    title: 'Product Sales Breakdown',
    subtitle: 'Stacked by Category',
    stacking: 'normal',
    series: [
      {
        name: 'Electronics',
        data: [
          ['Q1', 120000],
          ['Q2', 135000],
          ['Q3', 142000],
          ['Q4', 158000],
        ],
        color: '#2196F3',
      },
      {
        name: 'Clothing',
        data: [
          ['Q1', 85000],
          ['Q2', 92000],
          ['Q3', 88000],
          ['Q4', 105000],
        ],
        color: '#FF9800',
      },
      {
        name: 'Home & Garden',
        data: [
          ['Q1', 65000],
          ['Q2', 71000],
          ['Q3', 78000],
          ['Q4', 82000],
        ],
        color: '#4CAF50',
      },
    ],
  },
};

// Percent Stacked Area Chart
export const PercentStacked: Story = {
  args: {
    title: 'Market Share Over Time',
    subtitle: 'Percentage Distribution',
    stacking: 'percent',
    series: [
      {
        name: 'Company A',
        data: [
          ['2021', 35],
          ['2022', 38],
          ['2023', 42],
          ['2024', 45],
        ],
        color: '#FF6B6B',
      },
      {
        name: 'Company B',
        data: [
          ['2021', 28],
          ['2022', 26],
          ['2023', 24],
          ['2024', 22],
        ],
        color: '#4ECDC4',
      },
      {
        name: 'Company C',
        data: [
          ['2021', 22],
          ['2022', 21],
          ['2023', 19],
          ['2024', 18],
        ],
        color: '#45B7D1',
      },
      {
        name: 'Others',
        data: [
          ['2021', 15],
          ['2022', 15],
          ['2023', 15],
          ['2024', 15],
        ],
        color: '#96CEB4',
      },
    ],
  },
};

// Smooth Area Chart
export const SmoothArea: Story = {
  args: {
    title: 'Website Traffic',
    subtitle: 'Daily Visitors Trend',
    smooth: true,
    series: [
      {
        name: 'Visitors',
        data: [
          ['Mon', 1200],
          ['Tue', 1450],
          ['Wed', 1380],
          ['Thu', 1620],
          ['Fri', 1890],
          ['Sat', 2100],
          ['Sun', 1950],
        ],
        color: '#9C27B0',
        fillOpacity: 0.6,
      },
    ],
  },
};

// Multiple Series with Markers
export const MultipleSeries: Story = {
  args: {
    title: 'Regional Performance',
    subtitle: 'Sales Comparison',
    markers: true,
    series: [
      {
        name: 'North Region',
        data: [
          ['Jan', 45000],
          ['Feb', 48000],
          ['Mar', 52000],
          ['Apr', 58000],
          ['May', 62000],
          ['Jun', 68000],
        ],
        color: '#F44336',
      },
      {
        name: 'South Region',
        data: [
          ['Jan', 38000],
          ['Feb', 42000],
          ['Mar', 45000],
          ['Apr', 49000],
          ['May', 53000],
          ['Jun', 57000],
        ],
        color: '#2196F3',
      },
    ],
  },
};

// Numeric X Values (Time Series)
export const NumericXValues: Story = {
  args: {
    title: 'Stock Price Analysis',
    subtitle: 'Daily Closing Prices',
    series: [
      {
        name: 'Tech Stock',
        data: [
          [1, 145.20],
          [2, 147.80],
          [3, 146.50],
          [4, 149.20],
          [5, 151.80],
          [6, 150.30],
          [7, 152.90],
          [8, 154.60],
        ],
        color: '#00BCD4',
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Price ($)',
    },
  },
};

// Custom Fill Opacity
export const CustomOpacity: Story = {
  args: {
    title: 'Temperature Ranges',
    subtitle: 'Daily High/Low Averages',
    series: [
      {
        name: 'Temperature Range',
        data: [
          ['Jan', 8, 15],
          ['Feb', 9, 16],
          ['Mar', 12, 19],
          ['Apr', 15, 22],
          ['May', 18, 25],
          ['Jun', 21, 28],
          ['Jul', 23, 30],
          ['Aug', 22, 29],
        ],
        color: '#FF5722',
        fillOpacity: 0.3,
      },
    ],
  },
};

// With Data Labels
export const WithDataLabels: Story = {
  args: {
    title: 'Quarterly Growth',
    subtitle: 'With Value Labels',
    dataLabels: true,
    series: [
      {
        name: 'Growth Rate',
        data: [
          ['Q1', 12.5],
          ['Q2', 15.8],
          ['Q3', 18.2],
          ['Q4', 22.1],
        ],
        color: '#8BC34A',
      },
    ],
  },
};

// Financial Data Example
export const FinancialData: Story = {
  args: {
    title: 'Portfolio Performance',
    subtitle: 'Asset Class Returns',
    stacking: 'normal',
    series: [
      {
        name: 'Stocks',
        data: [
          ['2020', 100000],
          ['2021', 125000],
          ['2022', 118000],
          ['2023', 142000],
          ['2024', 168000],
        ],
        color: '#E91E63',
      },
      {
        name: 'Bonds',
        data: [
          ['2020', 50000],
          ['2021', 52500],
          ['2022', 54800],
          ['2023', 57200],
          ['2024', 59700],
        ],
        color: '#3F51B5',
      },
      {
        name: 'Real Estate',
        data: [
          ['2020', 75000],
          ['2021', 79500],
          ['2022', 84200],
          ['2023', 89100],
          ['2024', 94300],
        ],
        color: '#009688',
      },
    ],
  },
};

// Smooth Stacked Areas
export const SmoothStacked: Story = {
  args: {
    title: 'Energy Consumption',
    subtitle: 'By Source Type',
    stacking: 'normal',
    smooth: true,
    series: [
      {
        name: 'Renewable',
        data: [
          ['2019', 120],
          ['2020', 145],
          ['2021', 178],
          ['2022', 212],
          ['2023', 256],
          ['2024', 298],
        ],
        color: '#4CAF50',
        fillOpacity: 0.7,
      },
      {
        name: 'Natural Gas',
        data: [
          ['2019', 280],
          ['2020', 275],
          ['2021', 265],
          ['2022', 258],
          ['2023', 242],
          ['2024', 228],
        ],
        color: '#FF9800',
        fillOpacity: 0.7,
      },
      {
        name: 'Coal',
        data: [
          ['2019', 180],
          ['2020', 165],
          ['2021', 148],
          ['2022', 132],
          ['2023', 115],
          ['2024', 98],
        ],
        color: '#757575',
        fillOpacity: 0.7,
      },
    ],
  },
};

// Custom Colors and Styling
export const CustomStyling: Story = {
  args: {
    title: 'Social Media Growth',
    subtitle: 'Platform Engagement',
    series: [
      {
        name: 'Instagram',
        data: [
          ['Jan', 2500],
          ['Feb', 2800],
          ['Mar', 3200],
          ['Apr', 3680],
          ['May', 4200],
          ['Jun', 4850],
        ],
        color: '#E4405F',
        fillOpacity: 0.5,
        strokeWidth: 3,
      },
      {
        name: 'Twitter',
        data: [
          ['Jan', 1800],
          ['Feb', 1950],
          ['Mar', 2100],
          ['Apr', 2280],
          ['May', 2450],
          ['Jun', 2620],
        ],
        color: '#1DA1F2',
        fillOpacity: 0.5,
        strokeWidth: 3,
      },
    ],
  },
};

// Large Dataset
export const LargeDataset: Story = {
  args: {
    title: 'Annual Sales History',
    subtitle: '5-Year Trend Analysis',
    series: [
      {
        name: 'Sales',
        data: [
          ['2019-Q1', 125000],
          ['2019-Q2', 132000],
          ['2019-Q3', 128000],
          ['2019-Q4', 145000],
          ['2020-Q1', 138000],
          ['2020-Q2', 142000],
          ['2020-Q3', 156000],
          ['2020-Q4', 168000],
          ['2021-Q1', 162000],
          ['2021-Q2', 175000],
          ['2021-Q3', 182000],
          ['2021-Q4', 195000],
          ['2022-Q1', 188000],
          ['2022-Q2', 198000],
          ['2022-Q3', 212000],
          ['2022-Q4', 228000],
        ],
        color: '#673AB7',
      },
    ],
    height: 500,
  },
};

// With Markers and Smooth
export const MarkersAndSmooth: Story = {
  args: {
    title: 'Customer Satisfaction',
    subtitle: 'Monthly Scores',
    smooth: true,
    markers: true,
    series: [
      {
        name: 'Satisfaction Score',
        data: [
          ['Jan', 4.2],
          ['Feb', 4.3],
          ['Mar', 4.5],
          ['Apr', 4.4],
          ['May', 4.6],
          ['Jun', 4.7],
          ['Jul', 4.8],
          ['Aug', 4.9],
        ],
        color: '#FFC107',
        fillOpacity: 0.4,
      },
    ],
    yAxis: {
      title: 'Score (1-5)',
      min: 3.5,
      max: 5,
    },
  },
};

// No Legend
export const NoLegend: Story = {
  args: {
    title: 'Single Metric Trend',
    subtitle: 'System Performance',
    legend: false,
    series: [
      {
        name: 'CPU Usage',
        data: [
          ['00:00', 25],
          ['04:00', 18],
          ['08:00', 45],
          ['12:00', 68],
          ['16:00', 72],
          ['20:00', 52],
          ['24:00', 32],
        ],
        color: '#FF5722',
      },
    ],
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for area chart data...',
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
    title: 'Accessible Area Chart',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Monthly Growth',
        data: [
          ['January', 100],
          ['February', 120],
          ['March', 115],
          ['April', 135],
          ['May', 145],
        ],
        color: '#4CAF50',
      },
    ],
    ariaLabel: 'Area chart showing monthly growth from January to May, with values ranging from 100 to 145',
  },
};