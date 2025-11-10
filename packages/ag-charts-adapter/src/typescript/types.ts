/**
 * TypeScript types for chart data models
 */

import type { AgData } from 'ag-charts-community';

/**
 * Chart type enum
 */
export enum ChartType {
  LINE = 'line',
  SPLINE = 'spline',
  BAR = 'bar',
  COLUMN = 'column',
  PIE = 'pie',
  AREA = 'area',
  SCATTER = 'scatter',
}

/**
 * Chart theme mode
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Chart data point
 */
export interface ChartDataPoint {
  x?: number | string;
  y?: number;
  name?: string;
  color?: string;
  [key: string]: any;
}

/**
 * Chart series
 */
export interface ChartSeries {
  name: string;
  data: number[] | ChartDataPoint[];
  type?: ChartType;
  color?: string;
  visible?: boolean;
}

/**
 * Chart configuration
 */
export interface ChartConfig {
  type: ChartType;
  title?: string;
  subtitle?: string;
  series: ChartSeries[];
  categories?: string[];
  theme?: ThemeMode;
  legend?: boolean;
  tooltip?: boolean;
  responsive?: boolean;
}

/**
 * Chart data source
 */
export interface ChartDataSource<T = any> {
  /** Fetch data from source */
  fetch(): Promise<T[]>;
  /** Transform data to chart format */
  transform(data: T[]): any[];
  /** Refresh interval in milliseconds */
  refreshInterval?: number;
}

/**
 * Real-time chart data stream
 */
export interface ChartDataStream<T = any> {
  /** Subscribe to data updates */
  subscribe(callback: (data: T) => void): () => void;
  /** Transform incoming data */
  transform(data: T): number | ChartDataPoint;
}

/**
 * Chart export options
 */
export interface ChartExportOptions {
  type: 'image/png' | 'image/jpeg' | 'image/svg+xml' | 'application/pdf';
  filename?: string;
  scale?: number;
  width?: number;
  height?: number;
}

/**
 * Chart drill-down data
 */
export interface DrillDownData {
  name: string;
  id: string;
  data: ChartDataPoint[];
}
