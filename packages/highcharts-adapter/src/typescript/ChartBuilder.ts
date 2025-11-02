/**
 * Type-safe chart configuration builder for business logic layer
 */

import * as Highcharts from 'highcharts';

/**
 * Type-safe builder for Highcharts line chart configuration
 */
export class LineChartBuilder {
  private config: Highcharts.Options = {
    chart: { type: 'line' },
    series: [],
  };

  /**
   * Set chart title
   */
  setTitle(title: string, subtitle?: string): this {
    this.config.title = { text: title };
    if (subtitle) {
      this.config.subtitle = { text: subtitle };
    }
    return this;
  }

  /**
   * Add a data series
   */
  addSeries(name: string, data: number[] | Highcharts.PointOptionsObject[]): this {
    if (!this.config.series) {
      this.config.series = [];
    }
    (this.config.series as Highcharts.SeriesOptionsType[]).push({
      type: 'line',
      name,
      data,
    } as Highcharts.SeriesLineOptions);
    return this;
  }

  /**
   * Configure X-axis
   */
  configureXAxis(options: Highcharts.XAxisOptions): this {
    this.config.xAxis = options;
    return this;
  }

  /**
   * Configure Y-axis
   */
  configureYAxis(options: Highcharts.YAxisOptions): this {
    this.config.yAxis = options;
    return this;
  }

  /**
   * Set categories for X-axis
   */
  setCategories(categories: string[]): this {
    this.config.xAxis = { ...this.config.xAxis, categories };
    return this;
  }

  /**
   * Enable or disable legend
   */
  setLegend(enabled: boolean): this {
    this.config.legend = { enabled };
    return this;
  }

  /**
   * Enable smooth curves
   */
  enableSmooth(): this {
    if (this.config.chart) {
      this.config.chart.type = 'spline';
    }
    return this;
  }

  /**
   * Enable markers on data points
   */
  enableMarkers(): this {
    this.config.plotOptions = {
      ...this.config.plotOptions,
      series: {
        ...this.config.plotOptions?.series,
        marker: { enabled: true },
      },
    };
    return this;
  }

  /**
   * Enable stacking
   */
  enableStacking(mode: 'normal' | 'percent' = 'normal'): this {
    this.config.plotOptions = {
      ...this.config.plotOptions,
      series: {
        ...this.config.plotOptions?.series,
        stacking: mode,
      },
    };
    return this;
  }

  /**
   * Build and return the configuration
   */
  build(): Highcharts.Options {
    return this.config;
  }
}

/**
 * Type-safe builder for Highcharts bar/column chart configuration
 */
export class BarChartBuilder {
  private config: Highcharts.Options = {
    chart: { type: 'column' },
    series: [],
  };

  /**
   * Set chart title
   */
  setTitle(title: string, subtitle?: string): this {
    this.config.title = { text: title };
    if (subtitle) {
      this.config.subtitle = { text: subtitle };
    }
    return this;
  }

  /**
   * Set chart orientation
   */
  setOrientation(orientation: 'vertical' | 'horizontal'): this {
    if (this.config.chart) {
      this.config.chart.type = orientation === 'vertical' ? 'column' : 'bar';
    }
    return this;
  }

  /**
   * Add a data series
   */
  addSeries(name: string, data: number[] | Highcharts.PointOptionsObject[]): this {
    if (!this.config.series) {
      this.config.series = [];
    }
    const type = this.config.chart?.type === 'bar' ? 'bar' : 'column';
    (this.config.series as Highcharts.SeriesOptionsType[]).push({
      type,
      name,
      data,
    } as Highcharts.SeriesBarOptions | Highcharts.SeriesColumnOptions);
    return this;
  }

  /**
   * Configure X-axis
   */
  configureXAxis(options: Highcharts.XAxisOptions): this {
    this.config.xAxis = options;
    return this;
  }

  /**
   * Configure Y-axis
   */
  configureYAxis(options: Highcharts.YAxisOptions): this {
    this.config.yAxis = options;
    return this;
  }

  /**
   * Set categories for X-axis
   */
  setCategories(categories: string[]): this {
    this.config.xAxis = { ...this.config.xAxis, categories };
    return this;
  }

  /**
   * Enable or disable legend
   */
  setLegend(enabled: boolean): this {
    this.config.legend = { enabled };
    return this;
  }

  /**
   * Enable data labels
   */
  enableDataLabels(): this {
    const chartType = this.config.chart?.type || 'column';
    this.config.plotOptions = {
      ...this.config.plotOptions,
      [chartType]: {
        ...this.config.plotOptions?.[chartType],
        dataLabels: { enabled: true },
      },
    };
    return this;
  }

  /**
   * Enable stacking
   */
  enableStacking(mode: 'normal' | 'percent' = 'normal'): this {
    const chartType = this.config.chart?.type || 'column';
    this.config.plotOptions = {
      ...this.config.plotOptions,
      [chartType]: {
        ...this.config.plotOptions?.[chartType],
        stacking: mode,
      },
    };
    return this;
  }

  /**
   * Build and return the configuration
   */
  build(): Highcharts.Options {
    return this.config;
  }
}

/**
 * Type-safe builder for Highcharts pie chart configuration
 */
export class PieChartBuilder {
  private config: Highcharts.Options = {
    chart: { type: 'pie' },
    series: [],
  };

  /**
   * Set chart title
   */
  setTitle(title: string, subtitle?: string): this {
    this.config.title = { text: title };
    if (subtitle) {
      this.config.subtitle = { text: subtitle };
    }
    return this;
  }

  /**
   * Set chart data
   */
  setData(data: Highcharts.PointOptionsObject[], seriesName: string = 'Data'): this {
    this.config.series = [
      {
        type: 'pie',
        name: seriesName,
        data,
      },
    ];
    return this;
  }

  /**
   * Convert to donut chart
   */
  asDonut(innerSize: string | number = '50%'): this {
    this.config.plotOptions = {
      ...this.config.plotOptions,
      pie: {
        ...this.config.plotOptions?.pie,
        innerSize,
      },
    };
    return this;
  }

  /**
   * Convert to semi-circle chart
   */
  asSemiCircle(): this {
    this.config.plotOptions = {
      ...this.config.plotOptions,
      pie: {
        ...this.config.plotOptions?.pie,
        startAngle: -90,
        endAngle: 90,
        innerSize: '40%',
      },
    };
    return this;
  }

  /**
   * Enable or disable data labels
   */
  setDataLabels(enabled: boolean): this {
    this.config.plotOptions = {
      ...this.config.plotOptions,
      pie: {
        ...this.config.plotOptions?.pie,
        dataLabels: { enabled },
      },
    };
    return this;
  }

  /**
   * Enable or disable legend
   */
  setLegend(enabled: boolean): this {
    this.config.legend = { enabled };
    this.config.plotOptions = {
      ...this.config.plotOptions,
      pie: {
        ...this.config.plotOptions?.pie,
        showInLegend: enabled,
      },
    };
    return this;
  }

  /**
   * Build and return the configuration
   */
  build(): Highcharts.Options {
    return this.config;
  }
}

/**
 * Factory for creating chart builders
 */
export class ChartBuilderFactory {
  /**
   * Create a line chart builder
   */
  static createLineChart(): LineChartBuilder {
    return new LineChartBuilder();
  }

  /**
   * Create a bar chart builder
   */
  static createBarChart(): BarChartBuilder {
    return new BarChartBuilder();
  }

  /**
   * Create a pie chart builder
   */
  static createPieChart(): PieChartBuilder {
    return new PieChartBuilder();
  }
}
