import type { Meta, StoryObj } from '@storybook/react';
import { LineChart, LineChartProps } from '../react/LineChart';

const meta: Meta<LineChartProps> = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Line charts are ideal for showing trends over time and continuous data. They excel at:

- Displaying time series data and trends
- Comparing multiple related variables
- Showing rates of change and patterns
- Visualizing continuous data relationships

**Best Practices:**
- Use clear, distinct colors for multiple series
- Include markers for important data points
- Consider smooth curves for continuous data
- Start y-axis at zero for percentage data
- Use consistent time intervals
- Include gridlines for easier reading
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
    smooth: {
      control: 'boolean',
      description: 'Enable smooth curves (spline)',
    },
    markers: {
      control: 'boolean',
      description: 'Show markers on data points',
    },
    stacking: {
      control: 'select',
      options: [undefined, 'normal', 'percent'],
      description: 'Stacking mode - none, normal, or percentage',
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
    height: {
      control: { type: 'range', min: 200, max: 800, step: 50 },
      description: 'Chart height in pixels',
    },
  },
  args: {
    height: 400,
    smooth: false,
    markers: false,
    stacking: undefined,
    dataLabels: false,
    legend: true,
    tooltip: true,
  },
};

export default meta;
type Story = StoryObj<LineChartProps>;

// Basic Line Chart
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

// Multiple Series
export const MultipleSeries: Story = {
  args: {
    title: 'Stock Price Comparison',
    subtitle: 'Tech Giants Performance',
    series: [
      {
        name: 'Apple',
        data: [
          ['Jan', 145],
          ['Feb', 152],
          ['Mar', 148],
          ['Apr', 165],
          ['May', 172],
          ['Jun', 168],
          ['Jul', 175],
          ['Aug', 182],
        ],
        color: '#000000',
      },
      {
        name: 'Google',
        data: [
          ['Jan', 125],
          ['Feb', 132],
          ['Mar', 138],
          ['Apr', 142],
          ['May', 148],
          ['Jun', 155],
          ['Jul', 162],
          ['Aug', 168],
        ],
        color: '#4285F4',
      },
      {
        name: 'Microsoft',
        data: [
          ['Jan', 285],
          ['Feb', 292],
          ['Mar', 298],
          ['Apr', 305],
          ['May', 312],
          ['Jun', 318],
          ['Jul', 325],
          ['Aug', 332],
        ],
        color: '#00BCD4',
      },
    ],
  },
};

// Smooth Curves
export const SmoothCurves: Story = {
  args: {
    title: 'Temperature Trends',
    subtitle: 'Daily Averages',
    smooth: true,
    series: [
      {
        name: 'Temperature',
        data: [
          ['Mon', 18.5],
          ['Tue', 20.2],
          ['Wed', 19.8],
          ['Thu', 22.1],
          ['Fri', 24.5],
          ['Sat', 26.2],
          ['Sun', 25.8],
        ],
        color: '#FF9800',
        strokeWidth: 3,
      },
    ],
    yAxis: {
      title: 'Temperature (°C)',
    },
  },
};

// With Markers
export const WithMarkers: Story = {
  args: {
    title: 'User Growth',
    subtitle: 'Monthly Active Users',
    markers: true,
    series: [
      {
        name: 'Active Users',
        data: [
          ['Jan', 1200],
          ['Feb', 1450],
          ['Mar', 1680],
          ['Apr', 1920],
          ['May', 2150],
          ['Jun', 2380],
          ['Jul', 2620],
          ['Aug', 2850],
        ],
        color: '#9C27B0',
        strokeWidth: 2,
      },
    ],
  },
};

// Stacked Line Chart
export const StackedLines: Story = {
  args: {
    title: 'Cumulative Sales',
    subtitle: 'Product Categories',
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

// Percent Stacked Lines
export const PercentStacked: Story = {
  args: {
    title: 'Market Share Evolution',
    subtitle: 'Percentage Over Time',
    stacking: 'percent',
    series: [
      {
        name: 'Company A',
        data: [
          ['2020', 35],
          ['2021', 38],
          ['2022', 42],
          ['2023', 45],
          ['2024', 48],
        ],
        color: '#FF6B6B',
      },
      {
        name: 'Company B',
        data: [
          ['2020', 28],
          ['2021', 26],
          ['2022', 24],
          ['2023', 22],
          ['2024', 20],
        ],
        color: '#4ECDC4',
      },
      {
        name: 'Company C',
        data: [
          ['2020', 22],
          ['2021', 21],
          ['2022', 19],
          ['2023', 18],
          ['2024', 17],
        ],
        color: '#45B7D1',
      },
      {
        name: 'Others',
        data: [
          ['2020', 15],
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

// With Data Labels
export const WithDataLabels: Story = {
  args: {
    title: 'Conversion Rate',
    subtitle: 'Monthly Performance',
    dataLabels: true,
    series: [
      {
        name: 'Conversion %',
        data: [
          ['Jan', 3.2],
          ['Feb', 3.8],
          ['Mar', 4.1],
          ['Apr', 4.5],
          ['May', 4.8],
          ['Jun', 5.2],
        ],
        color: '#8BC34A',
        strokeWidth: 2,
      },
    ],
  },
};

// Smooth with Markers
export const SmoothWithMarkers: Story = {
  args: {
    title: 'Customer Satisfaction',
    subtitle: 'Quarterly Scores',
    smooth: true,
    markers: true,
    series: [
      {
        name: 'Satisfaction Score',
        data: [
          ['Q1 2023', 4.2],
          ['Q2 2023', 4.3],
          ['Q3 2023', 4.5],
          ['Q4 2023', 4.4],
          ['Q1 2024', 4.6],
          ['Q2 2024', 4.7],
          ['Q3 2024', 4.8],
          ['Q4 2024', 4.9],
        ],
        color: '#E91E63',
        strokeWidth: 3,
      },
    ],
    yAxis: {
      title: 'Score (1-5)',
      min: 3.5,
      max: 5,
    },
  },
};

// Multiple Series with Different Styles
export const MixedStyles: Story = {
  args: {
    title: 'Performance Metrics',
    subtitle: 'Different Line Styles',
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
        ],
        color: '#4CAF50',
        strokeWidth: 3,
      },
      {
        name: 'Profit Margin',
        data: [
          ['Jan', 12],
          ['Feb', 14],
          ['Mar', 11],
          ['Apr', 16],
          ['May', 15],
          ['Jun', 18],
        ],
        color: '#FF9800',
        strokeWidth: 2,
      },
      {
        name: 'Customer Count',
        data: [
          ['Jan', 1200],
          ['Feb', 1350],
          ['Mar', 1280],
          ['Apr', 1520],
          ['May', 1480],
          ['Jun', 1680],
        ],
        color: '#9C27B0',
        strokeWidth: 2,
        marker: false,
      },
    ],
  },
};

// Numeric X Values (Time Series)
export const NumericTimeSeries: Story = {
  args: {
    title: 'Sensor Data',
    subtitle: 'Hourly Measurements',
    series: [
      {
        name: 'Temperature',
        data: [
          [0, 22.1],
          [4, 20.8],
          [8, 24.5],
          [12, 28.2],
          [16, 26.9],
          [20, 23.7],
          [24, 21.3],
        ],
        color: '#F44336',
        strokeWidth: 2,
      },
    ],
    xAxis: {
      title: 'Hour',
    },
    yAxis: {
      title: 'Temperature (°C)',
    },
  },
};

// Custom Colors and Styling
export const CustomStyling: Story = {
  args: {
    title: 'Website Analytics',
    subtitle: 'Traffic Sources',
    smooth: true,
    markers: true,
    series: [
      {
        name: 'Organic Search',
        data: [
          ['Jan', 2500],
          ['Feb', 2680],
          ['Mar', 2850],
          ['Apr', 3120],
          ['May', 3380],
          ['Jun', 3650],
        ],
        color: '#4CAF50',
        strokeWidth: 3,
      },
      {
        name: 'Social Media',
        data: [
          ['Jan', 1800],
          ['Feb', 1950],
          ['Mar', 2100],
          ['Apr', 2280],
          ['May', 2450],
          ['Jun', 2620],
        ],
        color: '#1DA1F2',
        strokeWidth: 3,
      },
      {
        name: 'Direct Traffic',
        data: [
          ['Jan', 1200],
          ['Feb', 1280],
          ['Mar', 1350],
          ['Apr', 1420],
          ['May', 1480],
          ['Jun', 1550],
        ],
        color: '#FF6B6B',
        strokeWidth: 3,
      },
    ],
  },
};

// Volatile Data (Stock Market Style)
export const VolatileData: Story = {
  args: {
    title: 'Cryptocurrency Prices',
    subtitle: 'High Volatility Example',
    markers: true,
    series: [
      {
        name: 'Bitcoin',
        data: [
          ['Day 1', 45000],
          ['Day 2', 48500],
          ['Day 3', 46200],
          ['Day 4', 51200],
          ['Day 5', 49800],
          ['Day 6', 53500],
          ['Day 7', 51800],
          ['Day 8', 54200],
          ['Day 9', 52800],
          ['Day 10', 55100],
        ],
        color: '#FF9800',
        strokeWidth: 2,
      },
    ],
  },
};

// Large Dataset
export const LargeDataset: Story = {
  args: {
    title: 'Annual Performance',
    subtitle: 'Daily Metrics Over a Year',
    series: [
      {
        name: 'Sales',
        data: [
          ['Jan', 45000],
          ['Feb', 48000],
          ['Mar', 52000],
          ['Apr', 49000],
          ['May', 55000],
          ['Jun', 58000],
          ['Jul', 62000],
          ['Aug', 59000],
          ['Sep', 64000],
          ['Oct', 68000],
          ['Nov', 71000],
          ['Dec', 75000],
        ],
        color: '#673AB7',
        strokeWidth: 2,
      },
      {
        name: 'Expenses',
        data: [
          ['Jan', 32000],
          ['Feb', 34000],
          ['Mar', 36000],
          ['Apr', 35000],
          ['May', 38000],
          ['Jun', 40000],
          ['Jul', 42000],
          ['Aug', 41000],
          ['Sep', 44000],
          ['Oct', 46000],
          ['Nov', 48000],
          ['Dec', 50000],
        ],
        color: '#F44336',
        strokeWidth: 2,
      },
    ],
    height: 500,
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
        strokeWidth: 2,
      },
    ],
  },
};

// Different Line Thickness
export const VariableThickness: Story = {
  args: {
    title: 'Multi-Level Metrics',
    subtitle: 'Different Importance Levels',
    series: [
      {
        name: 'Primary Metric',
        data: [
          ['Jan', 100],
          ['Feb', 110],
          ['Mar', 105],
          ['Apr', 120],
          ['May', 125],
          ['Jun', 135],
        ],
        color: '#E91E63',
        strokeWidth: 4,
      },
      {
        name: 'Secondary Metric',
        data: [
          ['Jan', 80],
          ['Feb', 85],
          ['Mar', 82],
          ['Apr', 90],
          ['May', 92],
          ['Jun', 98],
        ],
        color: '#2196F3',
        strokeWidth: 2,
      },
      {
        name: 'Reference Line',
        data: [
          ['Jan', 60],
          ['Feb', 60],
          ['Mar', 60],
          ['Apr', 60],
          ['May', 60],
          ['Jun', 60],
        ],
        color: '#9E9E9E',
        strokeWidth: 1,
        strokeDasharray: '5,5',
      },
    ],
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for line chart data...',
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
    title: 'Accessible Line Chart',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Monthly Performance',
        data: [
          ['January', 100],
          ['February', 120],
          ['March', 115],
          ['April', 135],
          ['May', 145],
        ],
        color: '#4CAF50',
        strokeWidth: 2,
      },
    ],
    ariaLabel: 'Line chart showing monthly performance from January to May, with values ranging from 100 to 145, showing an upward trend',
  },
};

// Lowercase variants for codeVariants system compatibility
export const smoothcurves: Story = {
  ...SmoothCurves,
};

export const withmarkers: Story = {
  ...WithMarkers,
};

export const multiseries: Story = {
  ...MultipleSeries,
};

export const smoothwithmarkers: Story = {
  ...SmoothWithMarkers,
};