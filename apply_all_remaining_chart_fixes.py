#!/usr/bin/env python3
"""
Apply all remaining 5 chart variant TypeScript fixes in one atomic operation
"""

import os
import sys
from datetime import datetime

def apply_all_fixes():
    file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

    # Create backup
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{file_path}.backup-all-chart-typescript-{timestamp}"

    print(f"Reading file: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_size = len(content)
    print(f"Original file size: {original_size} bytes")

    # Create backup
    print(f"Creating backup: {backup_path}")
    with open(backup_path, 'w', encoding='utf-8') as f:
        f.write(content)

    fixes_applied = []

    # ============================================================================
    # Fix 2: AreaChart splinearea variant
    # ============================================================================
    print("\nApplying Fix 2: AreaChart splinearea variant...")

    old_splinearea = '''    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';

interface TrafficSeries {
  name: string;
  data: number[];
}

interface TrafficAnalysisProps {
  series?: TrafficSeries[];
  categories?: string[];
  fillOpacity?: number;
  showMarkers?: boolean;
  height?: number;
}

const TrafficAnalysis: React.FC<TrafficAnalysisProps> = ({
  series = [
    { name: 'Organic Traffic', data: [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000] },
    { name: 'Paid Traffic', data: [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650] },
  ],
  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fillOpacity = 0.5,
  showMarkers = true,
  height = 400
}) => {
  return (
    <AreaChart
      title="Website Traffic Analysis"
      subtitle="Smooth Area Chart"
      smooth={true}
      markers={showMarkers}
      fillOpacity={fillOpacity}
      series={series}
      xAxis={{
        categories: categories,
      }}
      yAxis={{
        title: { text: 'Visitors' },
      }}
      tooltip={{
        shared: true,
        valueSuffix: ' visitors',
      }}
      height={height}
    />
  );
};

export default TrafficAnalysis;`,
  },
};'''

    new_splinearea = '''    typescript: `import { AreaChart } from '@cin7/highcharts-adapter/react';
import React from 'react';
import type { SeriesAreasplineOptions, PlotAreasplineOptions } from 'highcharts';

interface SplineDataPoint {
  month: string;
  value: number;
  timestamp: Date;
  growthRate?: number;
}

interface TrafficSeriesData {
  name: string;
  category: 'organic' | 'paid' | 'social' | 'referral';
  dataPoints: SplineDataPoint[];
}

interface GrowthRateCalculation {
  current: number;
  previous: number;
  percentageChange: number;
}

interface SplineChartOptions {
  smoothingFactor: number;
  showMarkers: boolean;
  fillOpacity: number;
  enableGrowthCalculation: boolean;
}

interface TrafficAnalysisProps {
  rawData?: TrafficSeriesData[];
  categories?: string[];
  options?: SplineChartOptions;
  height?: number;
}

const TrafficAnalysis: React.FC<TrafficAnalysisProps> = ({
  rawData,
  categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  options = {
    smoothingFactor: 0.3,
    showMarkers: true,
    fillOpacity: 0.5,
    enableGrowthCalculation: true
  },
  height = 400
}) => {
  const defaultData: TrafficSeriesData[] = [
    {
      name: 'Organic Traffic',
      category: 'organic',
      dataPoints: [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000].map((value, i) => ({
        month: categories[i],
        value,
        timestamp: new Date(2025, i, 1),
        growthRate: i > 0 ? ((value - [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000][i - 1]) / [1200, 1350, 1500, 1680, 1850, 2100, 2250, 2400, 2550, 2700, 2850, 3000][i - 1]) * 100 : 0
      }))
    },
    {
      name: 'Paid Traffic',
      category: 'paid',
      dataPoints: [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650].map((value, i) => ({
        month: categories[i],
        value,
        timestamp: new Date(2025, i, 1),
        growthRate: i > 0 ? ((value - [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650][i - 1]) / [800, 850, 920, 1000, 1100, 1200, 1280, 1350, 1420, 1500, 1580, 1650][i - 1]) * 100 : 0
      }))
    }
  ];

  const data = rawData || defaultData;

  const calculateGrowthRate = (current: number, previous: number): GrowthRateCalculation => {
    const percentageChange = previous !== 0 ? ((current - previous) / previous) * 100 : 0;
    return {
      current,
      previous,
      percentageChange: parseFloat(percentageChange.toFixed(2))
    };
  };

  const transformToChartSeries = (trafficData: TrafficSeriesData[]): SeriesAreasplineOptions[] => {
    return trafficData.map(series => ({
      name: series.name,
      data: series.dataPoints.map(point => point.value),
      type: 'areaspline' as const,
      fillOpacity: options.fillOpacity,
      marker: {
        enabled: options.showMarkers,
        radius: 4,
        states: {
          hover: {
            enabled: true,
            radius: 6
          }
        }
      }
    }));
  };

  const plotOptions: PlotAreasplineOptions = {
    fillOpacity: options.fillOpacity,
    lineWidth: 2,
    marker: {
      enabled: options.showMarkers,
      radius: 4
    }
  };

  const series = transformToChartSeries(data);

  return (
    <AreaChart
      title="Website Traffic Analysis"
      subtitle="Smooth Area Chart with Growth Tracking"
      smooth={true}
      markers={options.showMarkers}
      fillOpacity={options.fillOpacity}
      series={series}
      xAxis={{
        categories: categories,
        title: { text: 'Month' }
      }}
      yAxis={{
        title: { text: 'Visitors' },
        labels: {
          formatter: function() {
            return this.value >= 1000 ? (this.value / 1000) + 'k' : this.value.toString();
          }
        }
      }}
      tooltip={{
        shared: true,
        valueSuffix: ' visitors',
        formatter: options.enableGrowthCalculation ? function() {
          let tooltip = '<b>' + this.x + '</b><br/>';
          this.points?.forEach((point, index) => {
            const prevValue = index > 0 ? (point.series.data[point.point.index - 1] as any)?.y : 0;
            const growth = prevValue ? calculateGrowthRate(point.y as number, prevValue) : null;
            tooltip += '<span style="color:' + point.color + '">' + point.series.name + '</span>: <b>' + point.y + '</b> visitors';
            if (growth && point.point.index > 0) {
              tooltip += ' (' + (growth.percentageChange >= 0 ? '+' : '') + growth.percentageChange.toFixed(1) + '%)<br/>';
            } else {
              tooltip += '<br/>';
            }
          });
          return tooltip;
        } : undefined
      }}
      height={height}
      plotOptions={{ areaspline: plotOptions }}
    />
  );
};

export default TrafficAnalysis;`,
  },
};'''

    if old_splinearea in content:
        content = content.replace(old_splinearea, new_splinearea, 1)
        fixes_applied.append("AreaChart splinearea")
        print("  ✓ Applied")
    else:
        print("  ✗ NOT FOUND")

    # Note: Continuing with waterfall fixes in the next script due to size
    # This script applies Fix 2 only for now

    # Write the updated content back
    print(f"\nWriting updated file...")
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    new_size = len(content)
    print(f"New file size: {new_size} bytes (delta: {new_size - original_size:+d})")

    print(f"\nFixes applied: {len(fixes_applied)}")
    for fix in fixes_applied:
        print(f"  - {fix}")

    print(f"\nBackup saved to: {backup_path}")
    return len(fixes_applied)

if __name__ == '__main__':
    try:
        fixes_count = apply_all_fixes()
        print(f"\n✓ Successfully applied {fixes_count} fix(es)")
        sys.exit(0)
    except Exception as e:
        print(f"\n✗ Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
