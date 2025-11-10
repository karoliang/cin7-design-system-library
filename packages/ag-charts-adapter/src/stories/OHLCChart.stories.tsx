import type { Meta, StoryObj } from '@storybook/react';
import { OHLCChart, OHLCChartProps } from '../react/OHLCChart';

const meta: Meta<OHLCChartProps> = {
  title: 'Charts/OHLCChart',
  component: OHLCChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
OHLC (Open/High/Low/Close) charts are essential for financial data visualization, particularly for stock price analysis. They excel at:

- Showing daily price movements and volatility
- Displaying market trends and reversals
- Analyzing trading patterns and sentiment
- Comparing multiple financial instruments

**Best Practices:**
- Use appropriate time intervals (daily, weekly, monthly)
- Include volume data for context when available
- Use contrasting colors for bullish vs bearish movements
- Add reference lines for key support/resistance levels
- Consider logarithmic scales for long-term price data
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
      description: 'OHLC data series',
    },
    variant: {
      control: 'select',
      options: ['candlestick', 'ohlc', 'hollow-candlestick'],
      description: 'Chart display variant',
    },
    showVolume: {
      control: 'boolean',
      description: 'Show volume bars',
    },
    volumeColor: {
      control: 'color',
      description: 'Volume bar color',
    },
    dataLabels: {
      control: 'boolean',
      description: 'Show data labels',
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
    variant: 'candlestick',
    showVolume: false,
    legend: true,
  },
};

export default meta;
type Story = StoryObj<OHLCChartProps>;

// Basic Candlestick Chart
export const Default: Story = {
  args: {
    title: 'Stock Price Movement',
    subtitle: 'Daily Candlestick Chart',
    series: [
      {
        name: 'AAPL',
        data: [
          { x: '2024-01-01', open: 150.25, high: 155.80, low: 148.90, close: 152.60, volume: 52341678 },
          { x: '2024-01-02', open: 152.60, high: 158.45, low: 150.80, close: 156.20, volume: 61234890 },
          { x: '2024-01-03', open: 156.20, high: 157.90, low: 152.30, close: 153.80, volume: 58234156 },
          { x: '2024-01-04', open: 153.80, high: 159.20, low: 151.60, close: 158.40, volume: 69023478 },
          { x: '2024-01-05', open: 158.40, high: 160.50, low: 156.70, close: 159.80, volume: 72345678 },
        ],
        bullishColor: '#00b894',
        bearishColor: '#d63031',
        wicks: true,
        candleWidth: 10,
      },
    ],
    xAxis: {
      title: 'Date',
      type: 'category',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.2f}',
    },
  },
};

// Candlestick with Volume
export const CandlestickWithVolume: Story = {
  args: {
    title: 'Stock Price with Trading Volume',
    subtitle: 'Complete Market Analysis',
    variant: 'candlestick',
    showVolume: true,
    series: [
      {
        name: 'TECH',
        data: [
          { x: 'Mon', open: 245.50, high: 252.80, low: 242.30, close: 248.90, volume: 12345678 },
          { x: 'Tue', open: 248.90, high: 255.20, low: 246.10, close: 253.40, volume: 15234890 },
          { x: 'Wed', open: 253.40, high: 256.70, low: 250.80, close: 252.20, volume: 13823456 },
          { x: 'Thu', open: 252.20, high: 258.90, low: 251.30, close: 257.60, volume: 16234890 },
          { x: 'Fri', open: 257.60, high: 261.20, low: 255.80, close: 259.80, volume: 18234567 },
        ],
        bullishColor: '#26a69a',
        bearishColor: '#ef5350',
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.2f}',
    },
  },
};

// OHLC Lines Chart
export const OHLCLines: Story = {
  args: {
    title: 'OHLC Price Chart',
    subtitle: 'Line Representation',
    variant: 'ohlc',
    series: [
      {
        name: 'CRYPTO',
        data: [
          { x: 'Day 1', open: 45000, high: 46500, low: 44200, close: 45800 },
          { x: 'Day 2', open: 45800, high: 47200, low: 45100, close: 46900 },
          { x: 'Day 3', open: 46900, high: 47500, low: 46200, close: 46600 },
          { x: 'Day 4', open: 46600, high: 48200, low: 46300, close: 47800 },
          { x: 'Day 5', open: 47800, high: 48500, low: 47100, close: 48200 },
        ],
        bullishColor: '#4caf50',
        bearishColor: '#f44336',
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.0f}',
    },
  },
};

// Hollow Candlestick
export const HollowCandlestick: Story = {
  args: {
    title: 'Hollow Candlestick Chart',
    subtitle: 'Alternative Candlestick Style',
    variant: 'hollow-candlestick',
    series: [
      {
        name: 'STOCK',
        data: [
          { x: '2024-01', open: 100.50, high: 105.80, low: 98.20, close: 103.20 },
          { x: '2024-02', open: 103.20, high: 108.90, low: 101.50, close: 107.40 },
          { x: '2024-03', open: 107.40, high: 109.20, low: 104.80, close: 105.60 },
          { x: '2024-04', open: 105.60, high: 112.50, low: 103.90, close: 111.20 },
          { x: '2024-05', open: 111.20, high: 115.80, low: 109.60, close: 114.50 },
        ],
        bullishColor: '#2196f3',
        bearishColor: '#ff5722',
        wicks: true,
      },
    ],
    xAxis: {
      title: 'Month',
      type: 'category',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.2f}',
    },
  },
};

// Multiple Stocks Comparison
export const MultipleStocks: Story = {
  args: {
    title: 'Multiple Stocks Comparison',
    subtitle: 'Relative Performance Analysis',
    series: [
      {
        name: 'AAPL',
        data: [
          { x: 'Q1', open: 150, high: 165, low: 145, close: 160 },
          { x: 'Q2', open: 160, high: 175, low: 155, close: 170 },
          { x: 'Q3', open: 170, high: 185, low: 165, close: 180 },
          { x: 'Q4', open: 180, high: 195, low: 175, close: 190 },
        ],
        bullishColor: '#4caf50',
        bearishColor: '#f44336',
        candleWidth: 8,
      },
      {
        name: 'GOOGL',
        data: [
          { x: 'Q1', open: 120, high: 135, low: 115, close: 130 },
          { x: 'Q2', open: 130, high: 145, low: 125, close: 140 },
          { x: 'Q3', open: 140, high: 155, low: 135, close: 150 },
          { x: 'Q4', open: 150, high: 165, low: 145, close: 160 },
        ],
        bullishColor: '#2196f3',
        bearishColor: '#ff9800',
        candleWidth: 8,
      },
    ],
    xAxis: {
      title: 'Quarter',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.0f}',
    },
  },
};

// Forex Currency Pairs
export const ForexPairs: Story = {
  args: {
    title: 'Forex Currency Pairs',
    subtitle: 'EUR/USD Exchange Rate',
    variant: 'candlestick',
    series: [
      {
        name: 'EUR/USD',
        data: [
          { x: 'Mon', open: 1.0850, high: 1.0920, low: 1.0820, close: 1.0890 },
          { x: 'Tue', open: 1.0890, high: 1.0950, low: 1.0860, close: 1.0910 },
          { x: 'Wed', open: 1.0910, high: 1.0940, low: 1.0870, close: 1.0880 },
          { x: 'Thu', open: 1.0880, high: 1.0930, low: 1.0840, close: 1.0920 },
          { x: 'Fri', open: 1.0920, high: 1.0980, low: 1.0890, close: 1.0950 },
        ],
        bullishColor: '#8bc34a',
        bearishColor: '#ff5722',
        candleWidth: 12,
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Exchange Rate',
      labelFormat: '{value:.4f}',
      min: 1.08,
      max: 1.10,
    },
  },
};

// Commodity Prices
export const CommodityPrices: Story = {
  args: {
    title: 'Gold Price Movement',
    subtitle: 'Daily Price Fluctuations',
    series: [
      {
        name: 'GOLD',
        data: [
          { x: 'Week 1', open: 1850, high: 1895, low: 1840, close: 1880 },
          { x: 'Week 2', open: 1880, high: 1920, low: 1865, close: 1910 },
          { x: 'Week 3', open: 1910, high: 1945, low: 1895, close: 1925 },
          { x: 'Week 4', open: 1925, high: 1960, low: 1910, close: 1950 },
          { x: 'Week 5', open: 1950, high: 1985, low: 1935, close: 1970 },
        ],
        bullishColor: '#ffd700',
        bearishColor: '#b8860b',
        candleWidth: 15,
      },
    ],
    xAxis: {
      title: 'Week',
    },
    yAxis: {
      title: 'Price ($/oz)',
      labelFormat: '${value:.0f}',
    },
  },
};

// High Volatility Period
export const HighVolatility: Story = {
  args: {
    title: 'High Volatility Trading',
    subtitle: 'Earnings Period Price Action',
    showVolume: true,
    series: [
      {
        name: 'VOLATILE',
        data: [
          { x: 'Pre-Earnings', open: 85.20, high: 88.50, low: 84.80, close: 87.30, volume: 5234167 },
          { x: 'Earnings Day', open: 92.40, high: 105.80, low: 78.20, close: 98.50, volume: 45234890 },
          { x: 'Day After', open: 95.80, high: 102.40, low: 91.60, close: 94.20, volume: 38234567 },
          { x: '2 Days After', open: 94.20, high: 97.80, low: 89.40, close: 92.60, volume: 25234156 },
          { x: 'Week Later', open: 92.60, high: 96.20, low: 90.80, close: 95.40, volume: 18234567 },
        ],
        bullishColor: '#00bcd4',
        bearishColor: '#ff5252',
        wicks: true,
      },
    ],
    xAxis: {
      title: 'Trading Period',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.2f}',
    },
  },
};

// Intraday Chart
export const IntradayChart: Story = {
  args: {
    title: 'Intraday Price Movement',
    subtitle: '5-Minute Intervals',
    series: [
      {
        name: 'INTRADAY',
        data: [
          { x: '09:30', open: 100.00, high: 100.50, low: 99.80, close: 100.20 },
          { x: '09:35', open: 100.20, high: 101.00, low: 100.10, close: 100.80 },
          { x: '09:40', open: 100.80, high: 101.50, low: 100.60, close: 101.20 },
          { x: '09:45', open: 101.20, high: 102.00, low: 101.00, close: 101.80 },
          { x: '09:50', open: 101.80, high: 102.20, low: 101.50, close: 101.90 },
          { x: '09:55', open: 101.90, high: 102.50, low: 101.70, close: 102.30 },
          { x: '10:00', open: 102.30, high: 103.00, low: 102.00, close: 102.80 },
        ],
        bullishColor: '#66bb6a',
        bearishColor: '#ef5350',
        candleWidth: 6,
      },
    ],
    xAxis: {
      title: 'Time',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.2f}',
      min: 99,
      max: 104,
    },
  },
};

// Monthly Chart
export const MonthlyChart: Story = {
  args: {
    title: 'Monthly Price Analysis',
    subtitle: 'Long-term Trend',
    series: [
      {
        name: 'MONTHLY',
        data: [
          { x: 'Jan', open: 1450, high: 1580, low: 1420, close: 1550 },
          { x: 'Feb', open: 1550, high: 1650, low: 1520, close: 1620 },
          { x: 'Mar', open: 1620, high: 1720, low: 1580, close: 1690 },
          { x: 'Apr', open: 1690, high: 1780, low: 1650, close: 1750 },
          { x: 'May', open: 1750, high: 1850, low: 1720, close: 1820 },
          { x: 'Jun', open: 1820, high: 1920, low: 1780, close: 1890 },
        ],
        bullishColor: '#9c27b0',
        bearishColor: '#ff6b6b',
        candleWidth: 20,
      },
    ],
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.0f}',
    },
  },
};

// Cryptocurrency Chart
export const CryptocurrencyChart: Story = {
  args: {
    title: 'Bitcoin Price Action',
    subtitle: '24-Hour Trading',
    showVolume: true,
    volumeColor: '#f7931a',
    series: [
      {
        name: 'BTC/USD',
        data: [
          { x: '00:00', open: 42500, high: 43200, low: 41800, close: 42800, volume: 1234567 },
          { x: '04:00', open: 42800, high: 44100, low: 42500, close: 43800, volume: 987654 },
          { x: '08:00', open: 43800, high: 44500, low: 43200, close: 44100, volume: 1567890 },
          { x: '12:00', open: 44100, high: 45200, low: 43500, close: 44800, volume: 2345678 },
          { x: '16:00', open: 44800, high: 45600, low: 44200, close: 45200, volume: 1987654 },
          { x: '20:00', open: 45200, high: 45900, low: 44600, close: 45500, volume: 1654321 },
          { x: '24:00', open: 45500, high: 46100, low: 45000, close: 45800, volume: 1432109 },
        ],
        bullishColor: '#f7931a',
        bearishColor: '#4a4a4a',
        wicks: true,
      },
    ],
    xAxis: {
      title: 'Time (UTC)',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.0f}',
    },
  },
};

// Custom Styling
export const CustomStyling: Story = {
  args: {
    title: 'Custom Styled OHLC Chart',
    subtitle: 'Branded Colors and Styling',
    series: [
      {
        name: 'CUSTOM',
        data: [
          { x: 'Day 1', open: 50.25, high: 55.80, low: 48.90, close: 52.60 },
          { x: 'Day 2', open: 52.60, high: 58.45, low: 50.80, close: 56.20 },
          { x: 'Day 3', open: 56.20, high: 57.90, low: 52.30, close: 53.80 },
          { x: 'Day 4', open: 53.80, high: 59.20, low: 51.60, close: 58.40 },
          { x: 'Day 5', open: 58.40, high: 60.50, low: 56.70, close: 59.80 },
        ],
        bullishColor: '#6366f1',
        bearishColor: '#ec4899',
        candleWidth: 12,
        wicks: true,
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.2f}',
    },
  },
};

// No Legend
export const NoLegend: Story = {
  args: {
    title: 'Single Stock Analysis',
    subtitle: 'No Legend Required',
    legend: false,
    series: [
      {
        name: 'STOCK',
        data: [
          { x: 'Jan', open: 100, high: 110, low: 95, close: 105 },
          { x: 'Feb', open: 105, high: 115, low: 102, close: 112 },
          { x: 'Mar', open: 112, high: 120, low: 108, close: 118 },
          { x: 'Apr', open: 118, high: 125, low: 115, close: 122 },
          { x: 'May', open: 122, high: 130, low: 118, close: 128 },
        ],
        bullishColor: '#4caf50',
        bearishColor: '#f44336',
      },
    ],
    xAxis: {
      title: 'Month',
    },
    yAxis: {
      title: 'Price ($)',
      labelFormat: '${value:.0f}',
    },
  },
};

// Error Handling - Empty Data
export const EmptyData: Story = {
  args: {
    title: 'No Data Available',
    subtitle: 'Waiting for OHLC data...',
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
        name: 'Invalid Data',
        data: [
          { x: 'Valid', open: 100, high: 110, low: 90, close: 105 },
          { x: 'Invalid', open: NaN, high: NaN, low: NaN, close: NaN },
          { x: 'Another Valid', open: 105, high: 115, low: 100, close: 110 },
        ],
        bullishColor: '#9e9e9e',
        bearishColor: '#757575',
      },
    ],
  },
};

// Accessibility Example
export const Accessibility: Story = {
  args: {
    title: 'Accessible OHLC Chart',
    subtitle: 'Screen reader friendly',
    series: [
      {
        name: 'Stock Price',
        data: [
          { x: 'Day 1', open: 100, high: 105, low: 98, close: 103 },
          { x: 'Day 2', open: 103, high: 108, low: 101, close: 106 },
          { x: 'Day 3', open: 106, high: 110, low: 104, close: 108 },
        ],
        bullishColor: '#4caf50',
        bearishColor: '#f44336',
      },
    ],
    xAxis: {
      title: 'Trading Day',
    },
    yAxis: {
      title: 'Price ($)',
    },
    ariaLabel: 'OHLC chart showing 3 days of stock price movements. Day 1: Open $100, High $105, Low $98, Close $103. Day 2: Open $103, High $108, Low $101, Close $106. Day 3: Open $106, High $110, Low $104, Close $108.',
  },
};