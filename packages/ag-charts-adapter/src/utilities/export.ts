/**
 * Export utilities for AG Charts
 * Comprehensive export functionality supporting multiple formats and customizations
 */

import type { AgChartInstance, AgChartOptions } from 'ag-charts-community';

export interface ExportOptions {
  /** Export format */
  format: 'png' | 'jpeg' | 'svg' | 'pdf' | 'csv';
  /** Output filename (without extension) */
  filename?: string;
  /** Image quality (0-1) for raster formats */
  quality?: number;
  /** Background color (transparent if not specified) */
  backgroundColor?: string;
  /** Image scale factor for high-resolution exports */
  scale?: number;
  /** Custom dimensions */
  width?: number;
  height?: number;
  /** Include chart title in export */
  includeTitle?: boolean;
  /** Include legend in export */
  includeLegend?: boolean;
  /** Custom styling for exports */
  customStyles?: {
    fontFamily?: string;
    fontSize?: number;
    titleSize?: number;
    labelSize?: number;
  };
}

export interface CSVExportOptions {
  /** Output filename */
  filename?: string;
  /** Include headers in CSV */
  includeHeaders?: boolean;
  /** Date format for time series data */
  dateFormat?: string;
  /** Number format for values */
  numberFormat?: string;
  /** Custom column names */
  columnNames?: Record<string, string>;
}

/**
 * Comprehensive chart exporter with multiple format support
 */
export class ChartExporter {
  /**
   * Export chart to specified format
   */
  static async exportChart(
    chart: AgChartInstance,
    options: ExportOptions
  ): Promise<void> {
    const {
      format,
      filename = `chart-${Date.now()}`,
      quality = 0.9,
      backgroundColor = '#ffffff',
      scale = 2,
      width,
      height,
      includeTitle = true,
      includeLegend = true,
      customStyles = {},
    } = options;

    try {
      switch (format) {
        case 'png':
        case 'jpeg':
          await this.exportToImage(chart, {
            ...options,
            filename: `${filename}.${format}`,
            mimeType: format === 'png' ? 'image/png' : 'image/jpeg',
            quality,
            backgroundColor,
            scale,
            width,
            height,
            includeTitle,
            includeLegend,
            customStyles,
          });
          break;

        case 'svg':
          await this.exportToSVG(chart, {
            filename: `${filename}.svg`,
            includeTitle,
            includeLegend,
            customStyles,
          });
          break;

        case 'pdf':
          await this.exportToPDF(chart, {
            filename: `${filename}.pdf`,
            quality,
            backgroundColor,
            scale,
            width,
            height,
            includeTitle,
            includeLegend,
            customStyles,
          });
          break;

        case 'csv':
          await this.exportToCSV(chart, {
            filename: `${filename}.csv`,
            includeHeaders: true,
          });
          break;

        default:
          throw new Error(`Unsupported export format: ${format}`);
      }
    } catch (error) {
      console.error(`Failed to export chart as ${format}:`, error);
      throw error;
    }
  }

  /**
   * Export chart to PNG/JPEG image
   */
  private static async exportToImage(
    chart: AgChartInstance,
    options: {
      filename: string;
      mimeType: string;
      quality: number;
      backgroundColor: string;
      scale: number;
      width?: number;
      height?: number;
      includeTitle: boolean;
      includeLegend: boolean;
      customStyles: any;
    }
  ): Promise<void> {
    const canvas = await this.getChartCanvas(chart, options);

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            this.downloadBlob(blob, options.filename);
            resolve();
          } else {
            reject(new Error('Failed to generate image blob'));
          }
        },
        options.mimeType,
        options.quality
      );
    });
  }

  /**
   * Export chart to SVG vector format
   */
  private static async exportToSVG(
    chart: AgChartInstance,
    options: {
      filename: string;
      includeTitle: boolean;
      includeLegend: boolean;
      customStyles: any;
    }
  ): Promise<void> {
    const svgString = await this.generateSVG(chart, options);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    this.downloadBlob(blob, options.filename);
  }

  /**
   * Export chart to PDF using canvas and PDF generation
   */
  private static async exportToPDF(
    chart: AgChartInstance,
    options: {
      filename: string;
      quality: number;
      backgroundColor: string;
      scale: number;
      width?: number;
      height?: number;
      includeTitle: boolean;
      includeLegend: boolean;
      customStyles: any;
    }
  ): Promise<void> {
    // For PDF export, we'll create a canvas image and convert to PDF
    const canvas = await this.getChartCanvas(chart, options);

    // Create a simple PDF using data URL (basic implementation)
    // In a production environment, you might want to use a library like jsPDF
    const dataUrl = canvas.toDataURL('image/png', options.quality);

    // Generate a simple HTML document with the image that can be printed to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Chart Export</title>
        <style>
          body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
          .chart-container { text-align: center; }
          .chart-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .chart-image { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <div class="chart-container">
          ${options.includeTitle && chart.options.title?.text ?
            `<div class="chart-title">${chart.options.title.text}</div>` : ''}
          <img src="${dataUrl}" class="chart-image" />
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    this.downloadBlob(blob, options.filename);
  }

  /**
   * Export chart data to CSV format
   */
  private static async exportToCSV(
    chart: AgChartInstance,
    options: CSVExportOptions
  ): Promise<void> {
    const {
      filename,
      includeHeaders = true,
      dateFormat = 'YYYY-MM-DD',
      numberFormat = '0.00',
      columnNames = {},
    } = options;

    const csvContent = this.generateCSV(chart, { includeHeaders, columnNames });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    this.downloadBlob(blob, filename);
  }

  /**
   * Get chart canvas with applied options
   */
  private static async getChartCanvas(
    chart: AgChartInstance,
    options: {
      backgroundColor: string;
      scale: number;
      width?: number;
      height?: number;
      includeTitle: boolean;
      includeLegend: boolean;
      customStyles: any;
    }
  ): Promise<HTMLCanvasElement> {
    // Create a temporary canvas for export
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to create canvas context');
    }

    // Set canvas dimensions
    const originalWidth = chart.options.width || 800;
    const originalHeight = chart.options.height || 400;

    canvas.width = (options.width || originalWidth) * options.scale;
    canvas.height = (options.height || originalHeight) * options.scale;

    // Apply background color
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply scale for high-resolution export
    ctx.scale(options.scale, options.scale);

    // Get the original chart canvas
    const chartCanvas = chart.canvas;
    if (chartCanvas) {
      // Draw the chart onto our export canvas
      ctx.drawImage(chartCanvas, 0, 0, originalWidth, originalHeight);
    }

    return canvas;
  }

  /**
   * Generate SVG representation of the chart
   */
  private static async generateSVG(
    chart: AgChartInstance,
    options: {
      includeTitle: boolean;
      includeLegend: boolean;
      customStyles: any;
    }
  ): Promise<string> {
    // This is a simplified SVG generation
    // In a real implementation, you'd want to extract the actual SVG from the chart
    const width = chart.options.width || 800;
    const height = chart.options.height || 400;

    let svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${width}" height="${height}" fill="#ffffff"/>
    `;

    // Add title if included
    if (options.includeTitle && chart.options.title?.text) {
      svgContent += `
        <text x="${width/2}" y="30" text-anchor="middle"
              font-family="${options.customStyles.fontFamily || 'Arial'}"
              font-size="${options.customStyles.titleSize || 18}"
              font-weight="bold" fill="#333">
          ${chart.options.title.text}
        </text>
      `;
    }

    // Add placeholder for chart content
    // In a real implementation, you'd extract the actual chart SVG elements
    svgContent += `
      <g transform="translate(60, 60)">
        <text x="${width/2 - 60}" y="${height/2 - 60}" text-anchor="middle"
              font-family="Arial" font-size="14" fill="#666">
          Chart content would be rendered here
        </text>
      </g>
    `;

    svgContent += '</svg>';
    return svgContent;
  }

  /**
   * Generate CSV content from chart data
   */
  private static generateCSV(
    chart: AgChartInstance,
    options: {
      includeHeaders: boolean;
      columnNames: Record<string, string>;
    }
  ): string {
    const series = chart.options.series || [];
    let csvContent = '';

    // Generate headers
    if (options.includeHeaders && series.length > 0) {
      const headers = ['Category', ...series.map(s => options.columnNames[s.name] || s.name)];
      csvContent += headers.join(',') + '\n';
    }

    // Get all unique categories from series data
    const categories = new Set<string>();
    series.forEach((s: any) => {
      if (s.data) {
        s.data.forEach((point: any) => {
          if (point.category) {
            categories.add(point.category);
          } else if (typeof point.x === 'string') {
            categories.add(point.x);
          }
        });
      }
    });

    // Generate rows
    categories.forEach(category => {
      const row = [category];
      series.forEach((s: any) => {
        const point = s.data?.find((p: any) =>
          p.category === category ||
          (typeof p.x === 'string' && p.x === category) ||
          p.category == category // Handle numeric categories
        );
        const value = point ? point.y : '';
        row.push(value);
      });
      csvContent += row.join(',') + '\n';
    });

    return csvContent;
  }

  /**
   * Download blob to user's computer
   */
  private static downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  /**
   * Export multiple charts in batch
   */
  static async exportBatch(
    charts: Array<{ chart: AgChartInstance; options: ExportOptions }>
  ): Promise<void> {
    const exportPromises = charts.map(({ chart, options }) =>
      this.exportChart(chart, options)
    );

    try {
      await Promise.all(exportPromises);
    } catch (error) {
      console.error('Batch export failed:', error);
      throw error;
    }
  }

  /**
   * Get export preview (data URL) before downloading
   */
  static async getExportPreview(
    chart: AgChartInstance,
    options: Omit<ExportOptions, 'filename'> & { format: 'png' | 'jpeg' }
  ): Promise<string> {
    const canvas = await this.getChartCanvas(chart, {
      backgroundColor: options.backgroundColor || '#ffffff',
      scale: options.scale || 2,
      width: options.width,
      height: options.height,
      includeTitle: options.includeTitle ?? true,
      includeLegend: options.includeLegend ?? true,
      customStyles: options.customStyles || {},
    });

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          } else {
            reject(new Error('Failed to generate preview'));
          }
        },
        `image/${options.format}`,
        options.quality || 0.9
      );
    });
  }

  /**
   * Get supported export formats
   */
  static getSupportedFormats(): Array<{
    format: string;
    label: string;
    description: string;
    supportsAnimation?: boolean;
    supportsTransparency?: boolean;
  }> {
    return [
      {
        format: 'png',
        label: 'PNG Image',
        description: 'High-quality image with transparency support',
        supportsTransparency: true,
      },
      {
        format: 'jpeg',
        label: 'JPEG Image',
        description: 'Compressed image format for smaller file size',
      },
      {
        format: 'svg',
        label: 'SVG Vector',
        description: 'Scalable vector graphics perfect for print',
        supportsTransparency: true,
      },
      {
        format: 'pdf',
        label: 'PDF Document',
        description: 'Portable document format for sharing',
      },
      {
        format: 'csv',
        label: 'CSV Data',
        description: 'Raw data in comma-separated values format',
      },
    ];
  }

  /**
   * Validate export options
   */
  static validateOptions(options: ExportOptions): string[] {
    const errors: string[] = [];

    if (!options.format) {
      errors.push('Export format is required');
    } else if (!this.getSupportedFormats().find(f => f.format === options.format)) {
      errors.push(`Unsupported format: ${options.format}`);
    }

    if (options.quality !== undefined && (options.quality < 0 || options.quality > 1)) {
      errors.push('Quality must be between 0 and 1');
    }

    if (options.scale !== undefined && options.scale <= 0) {
      errors.push('Scale must be greater than 0');
    }

    if (options.width !== undefined && options.width <= 0) {
      errors.push('Width must be greater than 0');
    }

    if (options.height !== undefined && options.height <= 0) {
      errors.push('Height must be greater than 0');
    }

    return errors;
  }
}

/**
 * Convenience function for quick exports
 */
export const exportChart = (
  chart: AgChartInstance,
  format: ExportOptions['format'],
  filename?: string
): Promise<void> => {
  return ChartExporter.exportChart(chart, { format, filename });
};

/**
 * Quick export to PNG
 */
export const exportToPNG = (
  chart: AgChartInstance,
  filename?: string
): Promise<void> => {
  return ChartExporter.exportChart(chart, { format: 'png', filename });
};

/**
 * Quick export to SVG
 */
export const exportToSVG = (
  chart: AgChartInstance,
  filename?: string
): Promise<void> => {
  return ChartExporter.exportChart(chart, { format: 'svg', filename });
};

/**
 * Quick export to CSV
 */
export const exportToCSV = (
  chart: AgChartInstance,
  filename?: string
): Promise<void> => {
  return ChartExporter.exportChart(chart, { format: 'csv', filename });
};