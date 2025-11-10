/**
 * TreemapChart - Hierarchical data visualization
 * Advanced treemap for nested data structures and proportional analysis
 */

import React from 'react';
import { ChartContainer, ChartContainerProps } from './ChartContainer';
import type { AgChartOptions } from 'ag-charts-community';

export interface TreemapChartDataPoint {
  /** Node name/label */
  name: string;
  /** Node value (size) */
  value: number;
  /** Parent node name (for hierarchy) */
  parent?: string;
  /** Custom color */
  color?: string;
  /** Additional data */
  metadata?: Record<string, any>;
  /** Children nodes (for nested structure) */
  children?: TreemapChartDataPoint[];
}

export interface TreemapChartSeries {
  /** Series name */
  name: string;
  /** Treemap data points */
  data: TreemapChartDataPoint[];
  /** Color scheme */
  colorScheme?: 'category10' | 'category20' | 'blues' | 'greens' | 'oranges' | 'custom';
  /** Show data labels */
  dataLabels?: boolean;
  /** Label format */
  labelFormat?: string;
  /** Padding between tiles */
  padding?: number;
  /** Show borders */
  showBorders?: boolean;
  /** Border color */
  borderColor?: string;
  /** Color intensity based on value */
  colorByValue?: boolean;
  /** Header height for parent nodes */
  headerHeight?: number;
}

export interface TreemapChartProps extends Omit<ChartContainerProps, 'options'> {
  /** Chart title */
  title?: string;
  /** Chart subtitle */
  subtitle?: string;
  /** Treemap data */
  series: TreemapChartSeries[];
  /** Layout algorithm */
  layout?: 'squarify' | 'slice' | 'dice' | 'slice-dice';
  /** Enable legend */
  legend?: boolean;
  /** Interactive features */
  interactive?: boolean;
  /** Additional AG Charts options */
  chartOptions?: Partial<AgChartOptions>;
}

/**
 * Treemap chart component for hierarchical data visualization
 *
 * @example
 * ```tsx
 * <TreemapChart
 *   title="Sales by Region"
 *   series={[{
 *     name: "Revenue",
 *     data: [
 *       { name: "North America", value: 45000 },
 *       { name: "Europe", value: 38000 },
 *       { name: "Asia", value: 52000, parent: "International" },
 *       { name: "International", value: 90000, children: [] }
 *     ]
 *   }]}
 *   layout="squarify"
 * />
 * ```
 */
export const TreemapChart: React.FC<TreemapChartProps> = ({
  title,
  subtitle,
  series,
  layout = 'squarify',
  legend = true,
  interactive = true,
  chartOptions = {},
  ...containerProps
}) => {
  // Define color schemes
  const colorSchemes = {
    category10: [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ],
    category20: [
      '#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c',
      '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5',
      '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f',
      '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5'
    ],
    blues: ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#084594'],
    greens: ['#f7fcf5', '#c7e9c0', '#74c476', '#238b45', '#00441b'],
    oranges: ['#fff5eb', '#fdd0a2', '#fd8d3c', '#e6550d', '#a63603'],
    custom: ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0'],
  };

  // Process treemap data for AG Charts
  const agSeries = series.map((seriesItem, seriesIndex) => {
    const scheme = colorSchemes[seriesItem.colorScheme || 'category10'];
    const padding = seriesItem.padding || 2;
    const showBorders = seriesItem.showBorders !== false;

    // Flatten hierarchical data and calculate colors
    const flattenData = (
      data: TreemapChartDataPoint[],
      parentName?: string,
      depth: number = 0
    ): any[] => {
      const result: any[] = [];

      data.forEach((node, index) => {
        const color = node.color || scheme[index % scheme.length];

        // Create node for AG Charts
        const treemapNode = {
          name: node.name,
          value: node.value,
          parent: parentName || 'root',
          color: seriesItem.colorByValue ? undefined : color,
          metadata: node.metadata,
          depth,
          index,
        };

        result.push(treemapNode);

        // Process children if they exist
        if (node.children && node.children.length > 0) {
          result.push(...flattenData(node.children, node.name, depth + 1));
        }
      });

      return result;
    };

    const flatData = flattenData(seriesItem.data);

    // Calculate value range for color scaling if colorByValue is enabled
    let minValue = 0;
    let maxValue = 0;
    if (seriesItem.colorByValue) {
      const values = flatData.map(node => node.value);
      minValue = Math.min(...values);
      maxValue = Math.max(...values);
    }

    // Color function for value-based coloring
    const getColorByValue = (value: number): string => {
      if (!seriesItem.colorByValue) return scheme[0];

      const normalizedValue = (value - minValue) / (maxValue - minValue);
      const colorIndex = Math.floor(normalizedValue * (scheme.length - 1));
      return scheme[Math.min(colorIndex, scheme.length - 1)];
    };

    return {
      type: 'treemap' as any,
      data: flatData,
      labelKey: 'name',
      sizeKey: 'value',
      parentKey: 'parent',
      colorKey: 'color',
      colorRange: seriesItem.colorByValue ? [scheme[0], scheme[scheme.length - 1]] : undefined,
      label: {
        enabled: seriesItem.dataLabels !== false,
        color: '#ffffff',
        fontSize: 12,
        fontWeight: 'bold',
        formatter: (params: any) => {
          const node = params.datum;
          const label = seriesItem.labelFormat ?
            seriesItem.labelFormat
              .replace('{name}', node.name)
              .replace('{value}', node.value.toString())
              .replace('{percentage}', ((node.value / seriesItem.data.reduce((sum, n) => sum + n.value, 0)) * 100).toFixed(1) + '%') :
            `${node.name}`;

          return label;
        },
      },
      tooltip: {
        enabled: true,
        renderer: (params: any) => {
          const node = params.datum;
          const totalValue = seriesItem.data.reduce((sum, n) => sum + n.value, 0);
          const percentage = ((node.value / totalValue) * 100).toFixed(2);

          let tooltipContent = `
            <div style="padding: 8px;">
              <strong>${seriesItem.name}</strong><br/>
              ${node.name}<br/>
              Value: ${node.value.toLocaleString()}<br/>
              Percentage: ${percentage}%
          `;

          // Add metadata if available
          if (node.metadata && Object.keys(node.metadata).length > 0) {
            tooltipContent += '<br/><div style="margin-top: 4px; font-size: 11px;">';
            Object.entries(node.metadata).forEach(([key, value]) => {
              tooltipContent += `<br/>${key}: ${value}`;
            });
            tooltipContent += '</div>';
          }

          tooltipContent += '</div>';
          return tooltipContent;
        },
      },
      fills: showBorders ? scheme.map(color => color) : scheme.map(color => color),
      strokes: showBorders ? [seriesItem.borderColor || '#ffffff'] : undefined,
      strokeWidth: showBorders ? 1 : 0,
      padding,
      animation: {
        enabled: true,
        duration: 800,
      },
    };
  });

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
    legend: {
      enabled: legend && series.length > 1,
    },
    interactions: {
      enabled: interactive,
    },
  };

  return (
    <ChartContainer
      options={options}
      {...containerProps}
    />
  );
};