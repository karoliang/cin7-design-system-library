/**
 * Type definitions for AG Charts v9.2.0 integration
 * Provides type safety for AG Charts usage in the adapter
 */

// AG Charts Theme Options - Based on AG Charts v9.2.0 structure
export interface AgThemeOptions {
  background?: {
    visible?: boolean;
    fill?: string;
  };
  title?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
  };
  subtitle?: {
    color?: string;
    fontSize?: number;
    fontFamily?: string;
  };
  legend?: {
    label?: {
      color?: string;
      fontSize?: number;
      fontFamily?: string;
    };
    item?: {
      paddingX?: number;
      paddingY?: number;
      marker?: {
        size?: number;
        strokeWidth?: number;
      };
    };
  };
  axes?: {
    number?: {
      label?: {
        color?: string;
        fontSize?: number;
        fontFamily?: string;
      };
      title?: {
        color?: string;
        fontSize?: number;
        fontFamily?: string;
      };
      gridLine?: {
        stroke?: string;
        strokeWidth?: number;
      };
      line?: {
        stroke?: string;
        strokeWidth?: number;
      };
    };
    category?: {
      label?: {
        color?: string;
        fontSize?: number;
        fontFamily?: string;
      };
      title?: {
        color?: string;
        fontSize?: number;
        fontFamily?: string;
      };
      gridLine?: {
        stroke?: string;
        strokeWidth?: number;
      };
      line?: {
        stroke?: string;
        strokeWidth?: number;
      };
    };
  };
  series?: {
    [key: string]: any;
  };
  padding?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
}

// AG Charts Chart Options
export interface AgChartOptions {
  container?: HTMLElement | string;
  data?: any[];
  series?: any[];
  theme?: string | AgThemeOptions;
  title?: string;
  subtitle?: string;
  width?: number;
  height?: number;
  animation?: boolean;
  legend?: boolean;
  [key: string]: any;
}

// AG Charts Instance
export interface AgChartInstance {
  updateOptions(options: Partial<AgChartOptions>): void;
  destroy(): void;
  canvas?: HTMLCanvasElement;
  options: AgChartOptions;
  [key: string]: any;
}

// AG Charts Static Interface
export interface AgChartsStatic {
  createAgChart(options: AgChartOptions): AgChartInstance;
  create(options: AgChartOptions): AgChartInstance;
  VERSION: string;
  [key: string]: any;
}

// ExtJS Component Configuration (for type safety)
export interface ExtJSComponentConfig {
  title?: string;
  subtitle?: string;
  series?: any[];
  xAxis?: any;
  yAxis?: any;
  chartOptions?: any;
  theme?: any;
  legend?: boolean;
  grid?: boolean;
  [key: string]: any;
}

// ExtJS Base Component Interface
export interface ExtJSComponent {
  initialConfig: ExtJSComponentConfig;
  chart?: AgChartInstance;
  id: string;
  callParent?(args?: IArguments): void;
  on?(event: string, handler: Function): void;
  [key: string]: any;
}

// Utility Types
export type ChartDataPoint = {
  x?: number | string;
  y?: number;
  size?: number;
  category?: string;
  [key: string]: any;
};

export type SeriesData = (number | [string, number] | [number, number] | ChartDataPoint)[];

// Export for backward compatibility
export type { AgChartOptions as ChartOptions, AgChartInstance as ChartInstance };