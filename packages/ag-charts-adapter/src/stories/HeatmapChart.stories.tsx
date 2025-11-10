import type { Meta, StoryObj } from '@storybook/react';
import { HeatmapChart, HeatmapChartProps } from '../react/HeatmapChart';

const meta: Meta<HeatmapChartProps> = {
  title: 'Charts/HeatmapChart',
  component: HeatmapChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Heatmap charts are perfect for visualizing 2D data density, correlation matrices, and intensity patterns. They excel at:

- Showing correlation matrices and relationships
- Displaying activity patterns and intensity maps
- Visualizing data distribution across two dimensions
- Highlighting patterns in large datasets

**Best Practices:**
- Use appropriate color schemes for your data type
- Include clear axis labels and legends
- Consider colorblind-friendly palettes
- Add tooltips for detailed value information
- Use consistent color ranges across multiple charts
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
      description: 'Heatmap data series',
    },
    xCategories: {
      control: 'array',
      description: 'X-axis categories',
    },
    yCategories: {
      control: 'array',
      description: 'Y-axis categories',
    },
    colorScale: {
      control: 'select',
      options: ['linear', 'logarithmic', 'threshold'],
      description: 'Color scaling method',
    },
    legend: {
      control: 'boolean',
      description: 'Show legend',
    },
    legendPosition: {
      control: 'select',
      options: ['right', 'bottom', 'left', 'top'],
      description: 'Legend position',
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
    colorScale: 'linear',
    legend: true,
    legendPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<HeatmapChartProps>;

// Basic Correlation Matrix
export const Default: Story = {
  args: {
    title: 'Correlation Matrix',
    subtitle: 'Variable Relationships Analysis',
    xCategories: ['Var1', 'Var2', 'Var3', 'Var4', 'Var5'],
    yCategories: ['Var1', 'Var2', 'Var3', 'Var4', 'Var5'],
    series: [
      {
        name: 'Correlation Coefficient',
        data: [
          { x: 'Var1', y: 'Var1', value: 1.0 },
          { x: 'Var1', y: 'Var2', value: 0.8 },
          { x: 'Var1', y: 'Var3', value: 0.3 },
          { x: 'Var1', y: 'Var4', value: -0.2 },
          { x: 'Var1', y: 'Var5', value: 0.6 },

          { x: 'Var2', y: 'Var1', value: 0.8 },
          { x: 'Var2', y: 'Var2', value: 1.0 },
          { x: 'Var2', y: 'Var3', value: 0.4 },
          { x: 'Var2', y: 'Var4', value: -0.1 },
          { x: 'Var2', y: 'Var5', value: 0.7 },

          { x: 'Var3', y: 'Var1', value: 0.3 },
          { x: 'Var3', y: 'Var2', value: 0.4 },
          { x: 'Var3', y: 'Var3', value: 1.0 },
          { x: 'Var3', y: 'Var4', value: 0.2 },
          { x: 'Var3', y: 'Var5', value: 0.5 },

          { x: 'Var4', y: 'Var1', value: -0.2 },
          { x: 'Var4', y: 'Var2', value: -0.1 },
          { x: 'Var4', y: 'Var3', value: 0.2 },
          { x: 'Var4', y: 'Var4', value: 1.0 },
          { x: 'Var4', y: 'Var5', value: -0.3 },

          { x: 'Var5', y: 'Var1', value: 0.6 },
          { x: 'Var5', y: 'Var2', value: 0.7 },
          { x: 'Var5', y: 'Var3', value: 0.5 },
          { x: 'Var5', y: 'Var4', value: -0.3 },
          { x: 'Var5', y: 'Var5', value: 1.0 },
        ],
        colorScheme: 'blues',
        dataLabels: true,
        labelFormat: '{value:.2f}',
      },
    ],
    xAxis: {
      title: 'Variables',
    },
    yAxis: {
      title: 'Variables',
    },
  },
};

// Calendar Heatmap
export const CalendarHeatmap: Story = {
  args: {
    title: 'Activity Calendar',
    subtitle: 'Daily Activity Levels',
    xCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    yCategories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    series: [
      {
        name: 'Activity Level',
        data: [
          // Week 1
          { x: 'Mon', y: 'Week 1', value: 12 },
          { x: 'Tue', y: 'Week 1', value: 28 },
          { x: 'Wed', y: 'Week 1', value: 45 },
          { x: 'Thu', y: 'Week 1', value: 62 },
          { x: 'Fri', y: 'Week 1', value: 78 },
          { x: 'Sat', y: 'Week 1', value: 35 },
          { x: 'Sun', y: 'Week 1', value: 20 },

          // Week 2
          { x: 'Mon', y: 'Week 2', value: 15 },
          { x: 'Tue', y: 'Week 2', value: 32 },
          { x: 'Wed', y: 'Week 2', value: 48 },
          { x: 'Thu', y: 'Week 2', value: 65 },
          { x: 'Fri', y: 'Week 2', value: 82 },
          { x: 'Sat', y: 'Week 2', value: 42 },
          { x: 'Sun', y: 'Week 2', value: 25 },

          // Week 3
          { x: 'Mon', y: 'Week 3', value: 18 },
          { x: 'Tue', y: 'Week 3', value: 38 },
          { x: 'Wed', y: 'Week 3', value: 52 },
          { x: 'Thu', y: 'Week 3', value: 68 },
          { x: 'Fri', y: 'Week 3', value: 85 },
          { x: 'Sat', y: 'Week 3', value: 48 },
          { x: 'Sun', y: 'Week 3', value: 30 },

          // Week 4
          { x: 'Mon', y: 'Week 4', value: 22 },
          { x: 'Tue', y: 'Week 4', value: 42 },
          { x: 'Wed', y: 'Week 4', value: 58 },
          { x: 'Thu', y: 'Week 4', value: 72 },
          { x: 'Fri', y: 'Week 4', value: 88 },
          { x: 'Sat', y: 'Week 4', value: 52 },
          { x: 'Sun', y: 'Week 4', value: 35 },
        ],
        colorScheme: 'greens',
        colorRange: {
          min: '#f7fcf5',
          max: '#00441b',
        },
      },
    ],
    xAxis: {
      title: 'Day of Week',
    },
    yAxis: {
      title: 'Week',
    },
  },
};

// Sales Performance Matrix
export const SalesPerformanceMatrix: Story = {
  args: {
    title: 'Sales Performance by Region & Product',
    subtitle: 'Q4 2024 Results',
    xCategories: ['Electronics', 'Clothing', 'Home', 'Sports', 'Books'],
    yCategories: ['North', 'South', 'East', 'West', 'Central'],
    series: [
      {
        name: 'Sales Revenue',
        data: [
          // North Region
          { x: 'Electronics', y: 'North', value: 125000 },
          { x: 'Clothing', y: 'North', value: 85000 },
          { x: 'Home', y: 'North', value: 65000 },
          { x: 'Sports', y: 'North', value: 45000 },
          { x: 'Books', y: 'North', value: 25000 },

          // South Region
          { x: 'Electronics', y: 'South', value: 98000 },
          { x: 'Clothing', y: 'South', value: 92000 },
          { x: 'Home', y: 'South', value: 71000 },
          { x: 'Sports', y: 'South', value: 38000 },
          { x: 'Books', y: 'South', value: 22000 },

          // East Region
          { x: 'Electronics', y: 'East', value: 142000 },
          { x: 'Clothing', y: 'East', value: 78000 },
          { x: 'Home', y: 'East', value: 88000 },
          { x: 'Sports', y: 'East', value: 52000 },
          { x: 'Books', y: 'East', value: 28000 },

          // West Region
          { x: 'Electronics', y: 'West', value: 115000 },
          { x: 'Clothing', y: 'West', value: 88000 },
          { x: 'Home', y: 'West', value: 72000 },
          { x: 'Sports', y: 'West', value: 48000 },
          { x: 'Books', y: 'West', value: 24000 },

          // Central Region
          { x: 'Electronics', y: 'Central', value: 105000 },
          { x: 'Clothing', y: 'Central', value: 95000 },
          { x: 'Home', y: 'Central', value: 68000 },
          { x: 'Sports', y: 'Central', value: 42000 },
          { x: 'Books', y: 'Central', value: 20000 },
        ],
        colorScheme: 'blues',
        labelFormat: '${value/1000}k',
      },
    ],
    xAxis: {
      title: 'Product Category',
    },
    yAxis: {
      title: 'Region',
    },
  },
};

// Risk Assessment Matrix
export const RiskAssessmentMatrix: Story = {
  args: {
    title: 'Risk Assessment Matrix',
    subtitle: 'Probability vs Impact Analysis',
    xCategories: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
    yCategories: ['Very Low', 'Low', 'Medium', 'High', 'Very High'],
    series: [
      {
        name: 'Risk Level',
        data: [
          // Very Low Impact
          { x: 'Very Low', y: 'Very Low', value: 1 },
          { x: 'Low', y: 'Very Low', value: 2 },
          { x: 'Medium', y: 'Very Low', value: 3 },
          { x: 'High', y: 'Very Low', value: 4 },
          { x: 'Very High', y: 'Very Low', value: 5 },

          // Low Impact
          { x: 'Very Low', y: 'Low', value: 2 },
          { x: 'Low', y: 'Low', value: 4 },
          { x: 'Medium', y: 'Low', value: 6 },
          { x: 'High', y: 'Low', value: 8 },
          { x: 'Very High', y: 'Low', value: 10 },

          // Medium Impact
          { x: 'Very Low', y: 'Medium', value: 3 },
          { x: 'Low', y: 'Medium', value: 6 },
          { x: 'Medium', y: 'Medium', value: 9 },
          { x: 'High', y: 'Medium', value: 12 },
          { x: 'Very High', y: 'Medium', value: 15 },

          // High Impact
          { x: 'Very Low', y: 'High', value: 4 },
          { x: 'Low', y: 'High', value: 8 },
          { x: 'Medium', y: 'High', value: 12 },
          { x: 'High', y: 'High', value: 16 },
          { x: 'Very High', y: 'High', value: 20 },

          // Very High Impact
          { x: 'Very Low', y: 'Very High', value: 5 },
          { x: 'Low', y: 'Very High', value: 10 },
          { x: 'Medium', y: 'Very High', value: 15 },
          { x: 'High', y: 'Very High', value: 20 },
          { x: 'Very High', y: 'Very High', value: 25 },
        ],
        colorScheme: 'reds',
        dataLabels: true,
        labelFormat: '{value}',
      },
    ],
    xAxis: {
      title: 'Probability',
    },
    yAxis: {
      title: 'Impact',
    },
  },
};

// Website Traffic Heatmap
export const WebsiteTrafficHeatmap: Story = {
  args: {
    title: 'Website Traffic by Hour and Day',
    subtitle: 'User Activity Patterns',
    xCategories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    yCategories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    series: [
      {
        name: 'Visitors',
        data: [
          // Monday
          { x: '00:00', y: 'Mon', value: 120 },
          { x: '04:00', y: 'Mon', value: 80 },
          { x: '08:00', y: 'Mon', value: 450 },
          { x: '12:00', y: 'Mon', value: 680 },
          { x: '16:00', y: 'Mon', value: 520 },
          { x: '20:00', y: 'Mon', value: 380 },
          { x: '24:00', y: 'Mon', value: 150 },

          // Tuesday
          { x: '00:00', y: 'Tue', value: 110 },
          { x: '04:00', y: 'Tue', value: 75 },
          { x: '08:00', y: 'Tue', value: 420 },
          { x: '12:00', y: 'Tue', value: 720 },
          { x: '16:00', y: 'Tue', value: 580 },
          { x: '20:00', y: 'Tue', value: 420 },
          { x: '24:00', y: 'Tue', value: 140 },

          // Wednesday
          { x: '00:00', y: 'Wed', value: 130 },
          { x: '04:00', y: 'Wed', value: 85 },
          { x: '08:00', y: 'Wed', value: 480 },
          { x: '12:00', y: 'Wed', value: 750 },
          { x: '16:00', y: 'Wed', value: 620 },
          { x: '20:00', y: 'Wed', value: 450 },
          { x: '24:00', y: 'Wed', value: 160 },

          // Thursday
          { x: '00:00', y: 'Thu', value: 125 },
          { x: '04:00', y: 'Thu', value: 90 },
          { x: '08:00', y: 'Thu', value: 510 },
          { x: '12:00', y: 'Thu', value: 780 },
          { x: '16:00', y: 'Thu', value: 650 },
          { x: '20:00', y: 'Thu', value: 480 },
          { x: '24:00', y: 'Thu', value: 170 },

          // Friday
          { x: '00:00', y: 'Fri', value: 140 },
          { x: '04:00', y: 'Fri', value: 95 },
          { x: '08:00', y: 'Fri', value: 540 },
          { x: '12:00', y: 'Fri', value: 820 },
          { x: '16:00', y: 'Fri', value: 700 },
          { x: '20:00', y: 'Fri', value: 520 },
          { x: '24:00', y: 'Fri', value: 200 },

          // Saturday
          { x: '00:00', y: 'Sat', value: 280 },
          { x: '04:00', y: 'Sat', value: 180 },
          { x: '08:00', y: 'Sat', value: 320 },
          { x: '12:00', y: 'Sat', value: 580 },
          { x: '16:00', y: 'Sat', value: 650 },
          { x: '20:00', y: 'Sat', value: 680 },
          { x: '24:00', y: 'Sat', value: 320 },

          // Sunday
          { x: '00:00', y: 'Sun', value: 250 },
          { x: '04:00', y: 'Sun', value: 160 },
          { x: '08:00', y: 'Sun', value: 280 },
          { x: '12:00', y: 'Sun', value: 520 },
          { x: '16:00', y: 'Sun', value: 580 },
          { x: '20:00', y: 'Sun', value: 620 },
          { x: '24:00', y: 'Sun', value: 280 },
        ],
        colorScheme: 'warm',
      },
    ],
    xAxis: {
      title: 'Hour of Day',
      labelRotation: 45,
    },
    yAxis: {
      title: 'Day of Week',
    },
  },
};

// Customer Satisfaction Matrix
export const CustomerSatisfactionMatrix: Story = {
  args: {
    title: 'Customer Satisfaction by Product Category',
    subtitle: 'Rating Distribution Analysis',
    xCategories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
    yCategories: ['Quality', 'Price', 'Service', 'Delivery', 'Overall'],
    series: [
      {
        name: 'Satisfaction Score',
        data: [
          // Product A
          { x: 'Product A', y: 'Quality', value: 4.2 },
          { x: 'Product A', y: 'Price', value: 3.8 },
          { x: 'Product A', y: 'Service', value: 4.5 },
          { x: 'Product A', y: 'Delivery', value: 4.1 },
          { x: 'Product A', y: 'Overall', value: 4.2 },

          // Product B
          { x: 'Product B', y: 'Quality', value: 3.9 },
          { x: 'Product B', y: 'Price', value: 4.2 },
          { x: 'Product B', y: 'Service', value: 3.7 },
          { x: 'Product B', y: 'Delivery', value: 3.8 },
          { x: 'Product B', y: 'Overall', value: 3.9 },

          // Product C
          { x: 'Product C', y: 'Quality', value: 4.6 },
          { x: 'Product C', y: 'Price', value: 3.5 },
          { x: 'Product C', y: 'Service', value: 4.3 },
          { x: 'Product C', y: 'Delivery', value: 4.4 },
          { x: 'Product C', y: 'Overall', value: 4.5 },

          // Product D
          { x: 'Product D', y: 'Quality', value: 4.1 },
          { x: 'Product D', y: 'Price', value: 4.0 },
          { x: 'Product D', y: 'Service', value: 4.2 },
          { x: 'Product D', y: 'Delivery', value: 3.9 },
          { x: 'Product D', y: 'Overall', value: 4.1 },

          // Product E
          { x: 'Product E', y: 'Quality', value: 3.7 },
          { x: 'Product E', y: 'Price', value: 4.4 },
          { x: 'Product E', y: 'Service', value: 3.8 },
          { x: 'Product E', y: 'Delivery', value: 3.6 },
          { x: 'Product E', y: 'Overall', value: 3.9 },
        ],
        colorScheme: 'greens',
        dataLabels: true,
        labelFormat: '{value:.1f}',
      },
    ],
    xAxis: {
      title: 'Product',
    },
    yAxis: {
      title: 'Rating Category',
    },
  },
};

// Temperature Heatmap
export const TemperatureHeatmap: Story = {
  args: {
    title: 'Temperature Variations by Month and Year',
    subtitle: 'Climate Data Analysis',
    xCategories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    yCategories: ['2020', '2021', '2022', '2023', '2024'],
    series: [
      {
        name: 'Average Temperature',
        data: [
          // 2020
          { x: 'Jan', y: '2020', value: 5 }, { x: 'Feb', y: '2020', value: 7 }, { x: 'Mar', y: '2020', value: 12 },
          { x: 'Apr', y: '2020', value: 16 }, { x: 'May', y: '2020', value: 21 }, { x: 'Jun', y: '2020', value: 25 },
          { x: 'Jul', y: '2020', value: 28 }, { x: 'Aug', y: '2020', value: 27 }, { x: 'Sep', y: '2020', value: 22 },
          { x: 'Oct', y: '2020', value: 17 }, { x: 'Nov', y: '2020', value: 11 }, { x: 'Dec', y: '2020', value: 6 },

          // 2021
          { x: 'Jan', y: '2021', value: 6 }, { x: 'Feb', y: '2021', value: 8 }, { x: 'Mar', y: '2021', value: 13 },
          { x: 'Apr', y: '2021', value: 17 }, { x: 'May', y: '2021', value: 22 }, { x: 'Jun', y: '2021', value: 26 },
          { x: 'Jul', y: '2021', value: 29 }, { x: 'Aug', y: '2021', value: 28 }, { x: 'Sep', y: '2021', value: 23 },
          { x: 'Oct', y: '2021', value: 18 }, { x: 'Nov', y: '2021', value: 12 }, { x: 'Dec', y: '2021', value: 7 },

          // 2022
          { x: 'Jan', y: '2022', value: 4 }, { x: 'Feb', y: '2022', value: 6 }, { x: 'Mar', y: '2022', value: 11 },
          { x: 'Apr', y: '2022', value: 15 }, { x: 'May', y: '2022', value: 20 }, { x: 'Jun', y: '2022', value: 24 },
          { x: 'Jul', y: '2022', value: 27 }, { x: 'Aug', y: '2022', value: 26 }, { x: 'Sep', y: '2022', value: 21 },
          { x: 'Oct', y: '2022', value: 16 }, { x: 'Nov', y: '2022', value: 10 }, { x: 'Dec', y: '2022', value: 5 },

          // 2023
          { x: 'Jan', y: '2023', value: 7 }, { x: 'Feb', y: '2023', value: 9 }, { x: 'Mar', y: '2023', value: 14 },
          { x: 'Apr', y: '2023', value: 18 }, { x: 'May', y: '2023', value: 23 }, { x: 'Jun', y: '2023', value: 27 },
          { x: 'Jul', y: '2023', value: 30 }, { x: 'Aug', y: '2023', value: 29 }, { x: 'Sep', y: '2023', value: 24 },
          { x: 'Oct', y: '2023', value: 19 }, { x: 'Nov', y: '2023', value: 13 }, { x: 'Dec', y: '2023', value: 8 },

          // 2024
          { x: 'Jan', y: '2024', value: 8 }, { x: 'Feb', y: '2024', value: 10 }, { x: 'Mar', y: '2024', value: 15 },
          { x: 'Apr', y: '2024', value: 19 }, { x: 'May', y: '2024', value: 24 }, { x: 'Jun', y: '2024', value: 28 },
          { x: 'Jul', y: '2024', value: 31 }, { x: 'Aug', y: '2024', value: 30 }, { x: 'Sep', y: '2024', value: 25 },
          { x: 'Oct', y: '2024', value: 20 }, { x: 'Nov', y: '2024', value: 14 }, { x: 'Dec', y: '2024', value: 9 },
        ],
        colorScheme: 'warm',
        labelFormat: '{value}°C',
      },
    ],
    xAxis: {
      title: 'Month',
      labelRotation: 45,
    },
    yAxis: {
      title: 'Year',
    },
  },
};

// Custom Color Scheme
export const CustomColorScheme: Story = {
  args: {
    title: 'Brand Color Heatmap',
    subtitle: 'Custom Color Implementation',
    xCategories: ['A', 'B', 'C', 'D', 'E'],
    yCategories: ['1', '2', '3', '4', '5'],
    series: [
      {
        name: 'Custom Data',
        data: [
          { x: 'A', y: '1', value: 10 }, { x: 'B', y: '1', value: 25 }, { x: 'C', y: '1', value: 40 },
          { x: 'D', y: '1', value: 55 }, { x: 'E', y: '1', value: 70 },

          { x: 'A', y: '2', value: 15 }, { x: 'B', y: '2', value: 30 }, { x: 'C', y: '2', value: 45 },
          { x: 'D', y: '2', value: 60 }, { x: 'E', y: '2', value: 75 },

          { x: 'A', y: '3', value: 20 }, { x: 'B', y: '3', value: 35 }, { x: 'C', y: '3', value: 50 },
          { x: 'D', y: '3', value: 65 }, { x: 'E', y: '3', value: 80 },

          { x: 'A', y: '4', value: 25 }, { x: 'B', y: '4', value: 40 }, { x: 'C', y: '4', value: 55 },
          { x: 'D', y: '4', value: 70 }, { x: 'E', y: '4', value: 85 },

          { x: 'A', y: '5', value: 30 }, { x: 'B', y: '5', value: 45 }, { x: 'C', y: '5', value: 60 },
          { x: 'D', y: '5', value: 75 }, { x: 'E', y: '5', value: 90 },
        ],
        colorScheme: 'custom',
        dataLabels: true,
      },
    ],
    xAxis: {
      title: 'X Category',
    },
    yAxis: {
      title: 'Y Category',
    },
  },
};

// No Legend
export const NoLegend: Story = {
  args: {
    title: 'Simple Heatmap',
    subtitle: 'No Legend Display',
    legend: false,
    xCategories: ['A', 'B', 'C', 'D'],
    yCategories: ['X', 'Y', 'Z'],
    series: [
      {
        name: 'Data',
        data: [
          { x: 'A', y: 'X', value: 10 }, { x: 'B', y: 'X', value: 20 },
          { x: 'C', y: 'X', value: 30 }, { x: 'D', y: 'X', value: 40 },

          { x: 'A', y: 'Y', value: 15 }, { x: 'B', y: 'Y', value: 25 },
          { x: 'C', y: 'Y', value: 35 }, { x: 'D', y: 'Y', value: 45 },

          { x: 'A', y: 'Z', value: 20 }, { x: 'B', y: 'Z', value: 30 },
          { x: 'C', y: 'Z', value: 40 }, { x: 'D', y: 'Z', value: 50 },
        ],
        colorScheme: 'blues',
      },
    ],
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for heatmap data...',
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
    xCategories: ['A', 'B', 'C'],
    yCategories: ['X', 'Y'],
    series: [
      {
        name: 'Mixed Data',
        data: [
          { x: 'A', y: 'X', value: 10 },
          { x: 'B', y: 'X', value: NaN },
          { x: 'C', y: 'X', value: 30 },
          { x: 'A', y: 'Y', value: null as any },
          { x: 'B', y: 'Y', value: 20 },
          { x: 'C', y: 'Y', value: undefined as any },
        ],
        colorScheme: 'blues',
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible Heatmap',
    subtitle: 'Screen reader friendly',
    xCategories: ['Product A', 'Product B', 'Product C'],
    yCategories: 'Customer Satisfaction',
    series: [
      {
        name: 'Satisfaction Scores',
        data: [
          { x: 'Product A', y: 'Quality', value: 4.2 },
          { x: 'Product A', y: 'Price', value: 3.8 },
          { x: 'Product A', y: 'Service', value: 4.5 },

          { x: 'Product B', y: 'Quality', value: 3.9 },
          { x: 'Product B', y: 'Price', value: 4.2 },
          { x: 'Product B', y: 'Service', value: 3.7 },

          { x: 'Product C', y: 'Quality', value: 4.6 },
          { x: 'Product C', y: 'Price', value: 3.5 },
          { x: 'Product C', y: 'Service', value: 4.3 },
        ],
        colorScheme: 'greens',
        dataLabels: true,
        labelFormat: '{value:.1f}',
      },
    ],
    ariaLabel: 'Heatmap showing customer satisfaction scores across three products for quality, price, and service categories. Values range from 3.5 to 4.6 on a 5-point scale.',
  },
};