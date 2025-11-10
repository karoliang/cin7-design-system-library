/**
 * OHLCChart - Financial Open/High/Low/Close chart visualization
 * Advanced candlestick chart for financial data analysis
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import type { AgChartOptions } from 'ag-charts-community';

export interface OHLCChartDataPoint {
  /** Timestamp or period label */
  x: string | number | Date;
  /** Opening price */
  open: number;
  /** Highest price */
  high: number;
  /** Lowest price */
  low: number;
  /** Closing price */
  close: number;
  /** Trading volume */
  volume?: number;
}

export interface OHLCChartSeries {
  /** Series name */
  name: string;
  /** OHLC data points */
  data: OHLCChartDataPoint[];
  /** Series color for bullish candles */
  bullishColor?: string;
  /** Series color for bearish candles */
  bearishColor?: string;
  /** Show wicks (lines extending from candles) */
  wicks?: boolean;
  /** Candle width */
  candleWidth?: number;
}

export interface OHLCChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** OHLC chart data */
  series: OHLCChartSeries[];
  /** Chart variant */
  variant?: 'candlestick' | 'ohlc' | 'hollow-candlestick';
  /** Show volume bars */
  showVolume?: boolean;
  /** Volume color */
  volumeColor?: string;
  /** Enable data labels */
  dataLabels?: boolean;
  /** Enable legend */
  legend?: boolean;
  /** X-axis configuration */
  xAxis?: {
    title?: string;
    type?: 'category' | 'time' | 'number';
    labelFormat?: string;
  };
  /** Y-axis configuration */
  yAxis?: {
    title?: string;
    min?: number;
    max?: number;
    labelFormat?: string;
  };
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * OHLC chart component for financial data visualization
 *
 * @example
 * ```tsx
 * <OHLCChart
 *   title="Stock Price Movement"
 *   series={[{
 *     name: "AAPL",
 *     data: [
 *       { x: "2024-01-01", open: 150, high: 155, low: 148, close: 152 },
 *       { x: "2024-01-02", open: 152, high: 158, low: 150, close: 156 }
 *     ]
 *   }]}
 *   showVolume
 * />
 * ```
 */
export const OHLCChart: React.FC<OHLCChartProps> = ({
  title,
  subtitle,
  series,
  variant = 'candlestick',
  showVolume = false,
  volumeColor = '#7f8c8d',
  dataLabels = false,
  legend = true,
  xAxis = {},
  yAxis = {},
  chartOptions = {},
  ...containerProps
}) => {
  // Convert OHLC data to AG Charts format
  const agSeries = series.map((seriesItem) => {
    const bullishColor = seriesItem.bullishColor || '#00b894';
    const bearishColor = seriesItem.bearishColor || '#d63031';
    const candleWidth = seriesItem.candleWidth || 8;

    // Create range data for candlestick bodies
    const rangeData = seriesItem.data.map((point) => ({
      x: point.x,
      y: [Math.min(point.open, point.close), Math.max(point.open, point.close)],
      open: point.open,
      high: point.high,
      low: point.low,
      close: point.close,
      volume: point.volume,
      isBullish: point.close >= point.open,
    }));

    // Create high-low line data for wicks
    const wickData = seriesItem.data.map((point) => ({
      x: point.x,
      y: [point.low, point.high],
      open: point.open,
      close: point.close,
      isBullish: point.close >= point.open,
    }));

    const mainSeries: any[] = [];

    if (variant === 'candlestick') {
      // Candlestick bodies
      mainSeries.push({
        type: 'range-bar',
        xKey: 'x',
        yKeys: ['y'],
        data: rangeData,
        fill: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
        stroke: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
        strokeWidth: 1,
        width: candleWidth,
        tooltip: {
          enabled: true,
          renderer: (params: any) => {
            const point = params.datum;
            const change = point.close - point.open;
            const changePercent = ((change / point.open) * 100).toFixed(2);
            const range = point.high - point.low;

            return `
              <div style="padding: 8px;">
                <strong>${seriesItem.name}</strong><br/>
                Open: ${point.open.toFixed(2)}<br/>
                High: ${point.high.toFixed(2)}<br/>
                Low: ${point.low.toFixed(2)}<br/>
                Close: ${point.close.toFixed(2)}<br/>
                Change: ${change.toFixed(2)} (${changePercent}%)<br/>
                Range: ${range.toFixed(2)}
                ${point.volume ? `<br/>Volume: ${point.volume.toLocaleString()}` : ''}
              </div>
            `;
          },
        },
      });

      if (seriesItem.wicks !== false) {
        // Wicks (high-low lines)
        mainSeries.push({
          type: 'line',
          xKey: 'x',
          yKey: 'y',
          data: wickData,
          stroke: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
          strokeWidth: 1,
          marker: { enabled: false },
          tooltip: { enabled: false }, // Disable tooltip for wicks to avoid duplication
        });
      }
    } else if (variant === 'ohlc') {
      // OHLC lines format
      const ohlcData = seriesItem.data.map((point) => ({
        x: point.x,
        open: point.open,
        high: point.high,
        low: point.low,
        close: point.close,
        isBullish: point.close >= point.open,
      }));

      mainSeries.push({
        type: 'line',
        xKey: 'x',
        yKey: 'close',
        data: ohlcData,
        stroke: seriesItem.bullishColor || '#3498db',
        strokeWidth: 2,
        marker: {
          enabled: true,
          size: 4,
          fill: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
          stroke: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
        },
        tooltip: {
          enabled: true,
          renderer: (params: any) => {
            const point = params.datum;
            return `
              <div style="padding: 8px;">
                <strong>${seriesItem.name}</strong><br/>
                O: ${point.open} | H: ${point.high}<br/>
                L: ${point.low} | C: ${point.close}
              </div>
            `;
          },
        },
      });
    } else if (variant === 'hollow-candlestick') {
      // Hollow candlestick (filled when bearish, hollow when bullish)
      mainSeries.push({
        type: 'range-bar',
        xKey: 'x',
        yKeys: ['y'],
        data: rangeData,
        fill: ({ datum }: any) => datum.isBullish ? 'transparent' : bearishColor,
        stroke: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
        strokeWidth: 2,
        width: candleWidth,
        tooltip: {
          enabled: true,
          renderer: (params: any) => {
            const point = params.datum;
            return `
              <div style="padding: 8px;">
                <strong>${seriesItem.name}</strong><br/>
                Open: ${point.open}<br/>
                High: ${point.high}<br/>
                Low: ${point.low}<br/>
                Close: ${point.close}
              </div>
            `;
          },
        },
      });
    }

    // Add volume bars if enabled
    if (showVolume && seriesItem.data.some(point => point.volume)) {
      const volumeData = seriesItem.data
        .filter(point => point.volume)
        .map((point) => ({
          x: point.x,
          y: point.volume,
          isBullish: point.close >= point.open,
        }));

      mainSeries.push({
        type: 'bar',
        xKey: 'x',
        yKey: 'y',
        data: volumeData,
        fill: ({ datum }: any) => datum.isBullish ? bullishColor + '80' : bearishColor + '80',
        stroke: ({ datum }: any) => datum.isBullish ? bullishColor : bearishColor,
        strokeWidth: 1,
        tooltip: {
          enabled: true,
          renderer: (params: any) => {
            return `Volume: ${params.datum.y.toLocaleString()}`;
          },
        },
      });
    }

    return mainSeries;
  }).flat();

  const options: AgChartOptions = {
    ...chartOptions,
    title: {
      text: title,
      enabled: !!title,
    },
    subtitle: {
      text: subtitle,
      enabled: !!subtitle,
    },
    data: [],
    series: agSeries,
    axes: [
      {
        type: xAxis.type || 'category',
        position: 'bottom',
        title: {
          text: xAxis.title || 'Time',
          enabled: !!xAxis.title,
        },
        label: {
          format: xAxis.labelFormat || (xAxis.type === 'time' ? '%b %d, %Y' : undefined),
        },
        grid: {
          enabled: true,
        },
      },
      {
        type: 'number',
        position: 'left',
        title: {
          text: yAxis.title || 'Price',
          enabled: !!yAxis.title || true,
        },
        min: yAxis.min,
        max: yAxis.max,
        label: {
          format: yAxis.labelFormat || '{value:.2f}',
        },
        grid: {
          enabled: true,
        },
      },
    ],
    legend: {
      enabled: legend && series.length > 1,
    },
  };

  return (
    <ChartContainer
      options={options}
      {...containerProps}
    />
  );
};