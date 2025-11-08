# TypeScript Code Variant Fixes Required

This document outlines the TypeScript code fixes needed for Chart component variants in `/storybook/.storybook/blocks/codeVariants.ts`.

## Summary

After analysis, the following variants require comprehensive TypeScript updates:

### ✅ ScatterChart Variants (NO CHANGES NEEDED)
All 4 ScatterChart variants already have excellent comprehensive TypeScript with:
- Proper type imports from 'highcharts'
- Advanced interfaces and type aliases
- Data transformation functions
- Complex calculations (e.g., linear regression with R²)

**Variants analyzed:**
- ✅ default (line ~46525) - Good: DataPoint interface, Highcharts.Options type
- ✅ bubble (line ~46613) - Good: BubbleDataPoint interface, HighchartsMore integration
- ✅ regression (line ~46743) - EXCELLENT: RegressionResult interface, calculateLinearRegression function with R² calculation
- ✅ multiple (line ~47086) - Good: CustomerSegment type alias, data filtering and mapping

### ⚠️ AreaChart Variants (3 FIXES NEEDED)
Three variants have simple TypeScript that mirrors React code - need comprehensive versions:

#### 1. AreaChart 'stacked' (line ~46728)
**Current:** Simple props interface, basic component
**Needed:**
- Type imports: `SeriesAreaOptions, XAxisOptions, YAxisOptions, PlotAreaOptions`
- Type aliases: `ProductCategory`, `Quarter`, `Week`
- Interfaces: `WeeklyRevenueData`, `ProductLineSeries`, `StackedSalesData`
- Functions: `calculateTotalRevenue()`, `transformToSeries()`
- Advanced config objects with proper typing

#### 2. AreaChart 'percentage' (line ~46902)
**Current:** Simple props interface, basic component
**Needed:**
- Type imports: `SeriesAreaOptions, TooltipOptions`
- Type aliases: `ProductName`
- Interfaces: `YearlyMarketShare`, `ProductMarketData`, `MarketShareMetadata`
- Functions: `calculatePercentages()`, `validateDataIntegrity()`
- Percentage calculation and validation logic

#### 3. AreaChart 'splinearea' (line ~47076)
**Current:** Simple props interface, basic component
**Needed:**
- Type imports: `SeriesAreasplineOptions, MarkerOptions`
- Type aliases: `TrafficSource`
- Interfaces: `MonthlyTrafficData`, `TrafficMetrics`, `SplineConfiguration`
- Functions: `calculateGrowthRate()`, `smoothDataPoints()`
- Smooth curve configuration with markers

### ⚠️ WaterfallChart Variants (4 IMPROVEMENTS NEEDED)
All variants have basic TypeScript but could be more comprehensive:

#### 4. WaterfallChart 'default' (line ~47299)
**Current:** Basic `WaterfallDataPoint` interface
**Improvement Needed:**
- Type imports: `SeriesWaterfallOptions, PointOptionsObject`
- Enhanced interfaces with validation
- Type guards for isSum/isIntermediateSum
- Color mapping based on data point type
- Helper functions for waterfall calculations

#### 5. WaterfallChart 'profitloss' (line ~47457)
**Current:** Basic `PLDataPoint` interface
**Improvement Needed:**
- Comprehensive P&L interfaces
- Revenue/Cost categorization types
- Cumulative calculation functions
- Financial formatting utilities
- Data validation for accounting principles

#### 6. WaterfallChart 'cashflow' (line ~47656)
**Current:** Basic `CashFlowPoint` interface
**Improvement Needed:**
- Cash flow category types (operating, investing, financing)
- Period-over-period comparison interfaces
- Running balance calculations
- Cash flow statement validation
- Negative/positive flow type guards

#### 7. WaterfallChart 'productcomparison' (line ~47859)
**Current:** Basic `ProductValuePoint` interface
**Improvement Needed:**
- Feature scoring system types
- Cumulative value calculation interfaces
- Product comparison metadata
- Scoring algorithms with proper typing
- Value delta calculations

## Pattern to Follow

Based on the excellent ScatterChart 'regression' variant, comprehensive TypeScript should include:

1. **Type Imports** from 'highcharts' package
   ```typescript
   import type { SeriesAreaOptions, XAxisOptions, ... } from 'highcharts';
   ```

2. **Type Aliases** for common patterns
   ```typescript
   type CustomerSegment = 'Premium' | 'Standard' | 'Budget';
   ```

3. **Comprehensive Interfaces** for data structures
   ```typescript
   interface ChartDataPoint {
     value: number;
     timestamp: Date;
     metadata?: Record<string, unknown>;
   }
   ```

4. **Data Transformation Functions** with proper typing
   ```typescript
   const transformToChartData = (points: DataPoint[]): ChartSeries => {
     return points.map(point => ({
       x: point.x,
       y: point.y,
       ...point.metadata
     }));
   };
   ```

5. **Advanced Calculations** specific to chart type
   ```typescript
   const calculateLinearRegression = (points: Point[]): RegressionResult => {
     // Implementation with proper types
   };
   ```

6. **Metadata Interfaces** for configuration
   ```typescript
   interface ChartMetadata {
     currency: string;
     unit: string;
     year: string;
   }
   ```

## React vs TypeScript Differentiation

**React Version (10-20 lines):**
- Simple, straightforward
- Basic data arrays
- Minimal configuration
- Direct prop passing

**TypeScript Version (60-80+ lines):**
- Comprehensive type safety
- Complex data structures
- Transformation functions
- Advanced configurations
- Calculation utilities
- Type guards and validators
- Metadata handling

## Next Steps

1. Close all file watchers (Storybook dev server, TypeScript server)
2. Apply fixes one variant at a time
3. Verify build passes after each fix
4. Test that Storybook still displays correctly
5. Commit changes with descriptive message

## File Location

`/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts`

**Total Lines:** ~48,000+
**Variants to Fix:** 7 (3 AreaChart + 4 WaterfallChart)
**Variants Already Good:** 4 (all ScatterChart variants)
