import type { Meta, StoryObj } from '@storybook/react';
import { RangeChart, RangeChartProps } from '../react/RangeChart';

const meta: Meta<RangeChartProps> = {
  title: 'Charts/RangeChart',
  component: RangeChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Range charts are ideal for showing min/max value ranges, confidence intervals, and uncertainty bands. They excel at:

- Displaying temperature ranges and weather data
- Showing confidence intervals in statistical analysis
- Visualizing stock price ranges and volatility
- Representing measurement uncertainties and error bounds

**Best Practices:**
- Use consistent color schemes for related ranges
- Include clear axis labels for context
- Consider using semi-transparent fills for overlapping ranges
- Add tooltips for detailed value information
- Use markers to highlight key data points
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
      description: 'Range data series',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels on range points',
    },
    markers: {
      control: 'boolean',
      description: 'Show markers on data points',
    },
    fillOpacity: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Fill opacity for range areas (0-1)',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
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
    dataLabels: false,
    markers: true,
    fillOpacity: 0.6,
    legend: true,
  },
};

export default meta;
type Story = StoryObj<RangeChartProps>;

// Basic Range Chart
export const Default: Story = {
  args: {
    title: 'Daily Temperature Ranges',
    subtitle: 'Weekly Weather Forecast',
    series: [
      {
        name: 'Temperature',
        data: [
          { x: 'Mon', min: 12, max: 22 },
          { x: 'Tue', min: 14, max: 24 },
          { x: 'Wed', min: 15, max: 25 },
          { x: 'Thu', min: 13, max: 23 },
          { x: 'Fri', min: 16, max: 26 },
          { x: 'Sat', min: 18, max: 28 },
          { x: 'Sun', min: 17, max: 27 },
        ],
        color: '#FF9800',
      },
    ],
    xAxis: {
      title: 'Day of Week',
    },
    yAxis: {
      title: 'Temperature (°C)',
    },
  },
};

// Temperature Ranges
export const TemperatureRanges: Story = {
  args: {
    title: 'Monthly Temperature Variations',
    subtitle: 'Seasonal Temperature Patterns',
    series: [
      {
        name: 'Daily High/Low',
        data: [
          { x: 'Jan', min: -5, max: 8 },
          { x: 'Feb', min: -3, max: 10 },
          { x: 'Mar', min: 2, max: 15 },
          { x: 'Apr', min: 7, max: 20 },
          { x: 'May', min: 12, max: 25 },
          { x: 'Jun', min: 17, max: 30 },
          { x: 'Jul', min: 20, max: 33 },
          { x: 'Aug', min: 19, max: 32 },
          { x: 'Sep', min: 14, max: 27 },
          { x: 'Oct', min: 8, max: 21 },
          { x: 'Nov', min: 3, max: 14 },
          { x: 'Dec', min: -2, max: 9 },
        ],
        color: '#FF5722',
        fillOpacity: 0.5,
      },
    ],
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Temperature (°C)',
    },
  },
};

// Stock Price Ranges
export const StockPriceRanges: Story = {
  args: {
    title: 'Stock Price Volatility',
    subtitle: 'Daily Trading Ranges',
    series: [
      {
        name: 'AAPL',
        data: [
          { x: 'Mon', min: 148.50, max: 152.30 },
          { x: 'Tue', min: 150.20, max: 154.80 },
          { x: 'Wed', min: 149.80, max: 153.20 },
          { x: 'Thu', min: 152.10, max: 156.50 },
          { x: 'Fri', min: 154.60, max: 158.90 },
        ],
        color: '#4CAF50',
      },
      {
        name: 'GOOGL',
        data: [
          { x: 'Mon', min: 125.30, max: 129.80 },
          { x: 'Tue', min: 127.50, max: 131.20 },
          { x: 'Wed', min: 126.80, max: 130.40 },
          { x: 'Thu', min: 129.20, max: 133.10 },
          { x: 'Fri', min: 131.50, max: 135.80 },
        ],
        color: '#2196F3',
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Stock Price ($)',
      labelFormat: '${value}',
    },
  },
};

// Confidence Intervals
export const ConfidenceIntervals: Story = {
  args: {
    title: 'Survey Results with Confidence Intervals',
    subtitle: '95% Confidence Level',
    series: [
      {
        name: 'Product A',
        data: [
          { x: 'Q1', min: 42, max: 58 },
          { x: 'Q2', min: 45, max: 61 },
          { x: 'Q3', min: 48, max: 64 },
          { x: 'Q4', min: 52, max: 68 },
        ],
        color: '#9C27B0',
        fillOpacity: 0.4,
      },
      {
        name: 'Product B',
        data: [
          { x: 'Q1', min: 38, max: 54 },
          { x: 'Q2', min: 41, max: 57 },
          { x: 'Q3', min: 44, max: 60 },
          { x: 'Q4', min: 47, max: 63 },
        ],
        color: '#FF9800',
        fillOpacity: 0.4,
      },
    ],
    xAxis: {
      title: 'Quarter',
    },
    yAxis: {
      title: 'Customer Satisfaction (%)',
    },
  },
};

// Error Bars
export const ErrorBars: Story = {
  args: {
    title: 'Experimental Results with Error Bars',
    subtitle: 'Measurement Uncertainty Analysis',
    series: [
      {
        name: 'Experiment 1',
        data: [
          { x: 'Trial 1', min: 4.8, max: 5.2 },
          { x: 'Trial 2', min: 5.1, max: 5.5 },
          { x: 'Trial 3', min: 4.9, max: 5.3 },
          { x: 'Trial 4', min: 5.0, max: 5.4 },
          { x: 'Trial 5', min: 4.7, max: 5.1 },
        ],
        color: '#00BCD4',
        strokeWidth: 2,
        markers: true,
      },
      {
        name: 'Experiment 2',
        data: [
          { x: 'Trial 1', min: 3.9, max: 4.3 },
          { x: 'Trial 2', min: 4.2, max: 4.6 },
          { x: 'Trial 3', min: 4.0, max: 4.4 },
          { x: 'Trial 4', min: 4.1, max: 4.5 },
          { x: 'Trial 5', min: 3.8, max: 4.2 },
        ],
        color: '#E91E63',
        strokeWidth: 2,
        markers: true,
      },
    ],
    xAxis: {
      title: 'Trial Number',
    },
    yAxis: {
      title: 'Measured Value',
      min: 3,
      max: 6,
    },
  },
};

// Blood Pressure Ranges
export const BloodPressureRanges: Story = {
  args: {
    title: 'Blood Pressure Monitoring',
    subtitle: 'Daily Systolic/Diastolic Ranges',
    series: [
      {
        name: 'Blood Pressure',
        data: [
          { x: 'Mon', min: 75, max: 125 },
          { x: 'Tue', min: 78, max: 128 },
          { x: 'Wed', min: 72, max: 122 },
          { x: 'Thu', min: 80, max: 130 },
          { x: 'Fri', min: 76, max: 126 },
          { x: 'Sat', min: 74, max: 124 },
          { x: 'Sun', min: 77, max: 127 },
        ],
        color: '#F44336',
        fillOpacity: 0.3,
      },
    ],
    xAxis: {
      title: 'Day of Week',
    },
    yAxis: {
      title: 'Blood Pressure (mmHg)',
    },
  },
};

// Sales Forecast Ranges
export const SalesForecastRanges: Story = {
  args: {
    title: 'Sales Forecast with Confidence Bands',
    subtitle: 'Optimistic vs Pessimistic Scenarios',
    series: [
      {
        name: 'Forecast Range',
        data: [
          { x: 'Jan', min: 45000, max: 65000 },
          { x: 'Feb', min: 48000, max: 68000 },
          { x: 'Mar', min: 52000, max: 72000 },
          { x: 'Apr', min: 56000, max: 76000 },
          { x: 'May', min: 60000, max: 80000 },
          { x: 'Jun', min: 64000, max: 84000 },
        ],
        color: '#4CAF50',
        fillOpacity: 0.5,
      },
    ],
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Sales Revenue ($)',
      labelFormat: '${value}',
    },
  },
};

// Multiple Ranges Comparison
export const MultipleRangesComparison: Story = {
  args: {
    title: 'Performance Metrics Comparison',
    subtitle: 'Team vs Individual Ranges',
    series: [
      {
        name: 'Team Average',
        data: [
          { x: 'Week 1', min: 65, max: 85 },
          { x: 'Week 2', min: 70, max: 88 },
          { x: 'Week 3', min: 68, max: 86 },
          { x: 'Week 4', min: 72, max: 90 },
        ],
        color: '#2196F3',
        fillOpacity: 0.4,
      },
      {
        name: 'Top Performer',
        data: [
          { x: 'Week 1', min: 78, max: 92 },
          { x: 'Week 2', min: 82, max: 95 },
          { x: 'Week 3', min: 80, max: 93 },
          { x: 'Week 4', min: 85, max: 98 },
        ],
        color: '#FFD700',
        fillOpacity: 0.4,
      },
    ],
    xAxis: {
      title: 'Week',
    },
    yAxis: {
      title: 'Performance Score',
      min: 60,
      max: 100,
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled Range Chart',
    subtitle: 'Branded Colors and Styling',
    series: [
      {
        name: 'Primary Metric',
        data: [
          { x: 'A', min: 20, max: 40 },
          { x: 'B', min: 25, max: 45 },
          { x: 'C', min: 30, max: 50 },
          { x: 'D', min: 28, max: 48 },
          { x: 'E', min: 35, max: 55 },
        ],
        color: '#6366f1',
        fillOpacity: 0.7,
        strokeWidth: 3,
        markers: true,
      },
    ],
    xAxis: {
      title: 'Category',
    },
    yAxis: {
      title: 'Value Range',
    },
  },
};

// Time Series Ranges
export const TimeSeriesRanges: Story = {
  args: {
    title: 'Hourly Energy Consumption',
    subtitle: 'Minimum and Maximum Usage',
    series: [
      {
        name: 'Energy Usage',
        data: [
          { x: '00:00', min: 120, max: 180 },
          { x: '04:00', min: 90, max: 140 },
          { x: '08:00', min: 200, max: 280 },
          { x: '12:00', min: 250, max: 350 },
          { x: '16:00', min: 220, max: 310 },
          { x: '20:00', min: 180, max: 260 },
          { x: '24:00', min: 130, max: 190 },
        ],
        color: '#FF6B6B',
        fillOpacity: 0.5,
      },
    ],
    xAxis: {
      title: 'Time',
    },
    yAxis: {
      title: 'Energy (kWh)',
    },
  },
};

// No Markers
export const NoMarkers: Story = {
  args: {
    title: 'Clean Range Visualization',
    subtitle: 'No Data Point Markers',
    series: [
      {
        name: 'Range Data',
        data: [
          { x: 'Jan', min: 100, max: 150 },
          { x: 'Feb', min: 110, max: 160 },
          { x: 'Mar', min: 105, max: 155 },
          { x: 'Apr', min: 115, max: 165 },
          { x: 'May', min: 120, max: 170 },
        ],
        color: '#4ECDC4',
        markers: false,
        fillOpacity: 0.6,
      },
    ],
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Value Range',
    },
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for range chart data...',
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
          { x: 'Valid', min: 10, max: 20 },
          { x: 'Invalid', min: NaN, max: NaN },
          { x: 'Another Valid', min: 15, max: 25 },
        ],
        color: '#9E9E9E',
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Range Chart',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Temperature Range',
        data: [
          { x: 'Morning', min: 15, max: 20 },
          { x: 'Afternoon', min: 22, max: 28 },
          { x: 'Evening', min: 18, max: 24 },
        ],
        color: '#4CAF50',
        markers: true,
      },
    ],
    xAxis: {
      title: 'Time of Day',
    },
    yAxis: {
      title: 'Temperature (°C)',
    },
    ariaLabel: 'Range chart showing temperature variations throughout the day. Morning ranges from 15-20°C, Afternoon from 22-28°C, Evening from 18-24°C',
  },
};