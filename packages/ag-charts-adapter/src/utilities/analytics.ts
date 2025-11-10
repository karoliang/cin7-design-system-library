/**
 * Analytics and metrics tracking for AG Charts migration
 * Monitors compound benefits and long-term improvements
 */

export interface MigrationMetrics {
  /** Migration completion percentage */
  completionRate: number;
  /** Components migrated */
  componentsMigrated: number;
  /** Total components to migrate */
  totalComponents: number;
  /** Performance improvements */
  performanceMetrics: {
    renderTimeImprovement: number; // percentage
    bundleSizeReduction: number; // percentage
    memoryUsageReduction: number; // percentage
  };
  /** Cost savings */
  costSavings: {
    licensingFeesSaved: number; // USD per year
    developmentTimeSaved: number; // hours per month
    maintenanceCostsReduced: number; // USD per year
  };
  /** Developer experience metrics */
  developerExperience: {
    onboardingTimeReduction: number; // percentage
    bugRateReduction: number; // percentage
    featureVelocityIncrease: number; // percentage
  };
  /** Adoption metrics */
  adoption: {
    chartsCreated: number;
    developersUsingLibrary: number;
    projectsIntegrated: number;
    satisfactionScore: number; // 1-5 scale
  };
}

export interface CompoundEffectMetrics {
  /** Time-based compound growth */
  monthlyImprovements: Array<{
    month: string;
    performanceGain: number;
    costSavings: number;
    developerProductivity: number;
    errorReduction: number;
  }>;
  /** Cumulative benefits */
  cumulativeBenefits: {
    totalCostSavings: number;
    totalHoursSaved: number;
    totalPerformanceGain: number;
    qualityImprovementScore: number;
  };
  /** Future projections */
  projections: {
    sixMonthProjection: number;
    oneYearProjection: number;
    roi: number; // Return on investment
  };
}

/**
 * Analytics manager for tracking migration progress and compound effects
 */
export class MigrationAnalytics {
  private static instance: MigrationAnalytics;
  private metrics: MigrationMetrics;
  private compoundMetrics: CompoundEffectMetrics;
  private startTime: number = Date.now();

  private constructor() {
    this.metrics = this.initializeMetrics();
    this.compoundMetrics = this.initializeCompoundMetrics();
  }

  static getInstance(): MigrationAnalytics {
    if (!MigrationAnalytics.instance) {
      MigrationAnalytics.instance = new MigrationAnalytics();
    }
    return MigrationAnalytics.instance;
  }

  /**
   * Initialize baseline metrics
   */
  private initializeMetrics(): MigrationMetrics {
    return {
      completionRate: 0,
      componentsMigrated: 0,
      totalComponents: 15, // Total components to migrate
      performanceMetrics: {
        renderTimeImprovement: 0,
        bundleSizeReduction: 0,
        memoryUsageReduction: 0,
      },
      costSavings: {
        licensingFeesSaved: 0,
        developmentTimeSaved: 0,
        maintenanceCostsReduced: 0,
      },
      developerExperience: {
        onboardingTimeReduction: 0,
        bugRateReduction: 0,
        featureVelocityIncrease: 0,
      },
      adoption: {
        chartsCreated: 0,
        developersUsingLibrary: 0,
        projectsIntegrated: 0,
        satisfactionScore: 0,
      },
    };
  }

  /**
   * Initialize compound metrics tracking
   */
  private initializeCompoundMetrics(): CompoundEffectMetrics {
    return {
      monthlyImprovements: [],
      cumulativeBenefits: {
        totalCostSavings: 0,
        totalHoursSaved: 0,
        totalPerformanceGain: 0,
        qualityImprovementScore: 0,
      },
      projections: {
        sixMonthProjection: 0,
        oneYearProjection: 0,
        roi: 0,
      },
    };
  }

  /**
   * Update migration progress
   */
  updateMigrationProgress(componentsMigrated: number): void {
    this.metrics.componentsMigrated = componentsMigrated;
    this.metrics.completionRate = (componentsMigrated / this.metrics.totalComponents) * 100;

    // Update cost savings based on completion
    this.updateCostSavings();

    // Emit progress event
    this.emitProgressEvent();
  }

  /**
   * Record performance improvements
   */
  recordPerformanceImprovement(
    renderTimeImprovement: number,
    bundleSizeReduction: number,
    memoryUsageReduction: number
  ): void {
    this.metrics.performanceMetrics = {
      renderTimeImprovement,
      bundleSizeReduction,
      memoryUsageReduction,
    };

    this.updateCompoundMetrics();
  }

  /**
   * Track component usage
   */
  trackComponentUsage(componentType: string, usageData: any): void {
    this.metrics.adoption.chartsCreated++;

    // Track specific component usage patterns
    console.log(`Component usage tracked: ${componentType}`, usageData);
  }

  /**
   * Record developer feedback
   */
  recordDeveloperFeedback(feedback: {
    satisfaction: number;
    onboardingTime: number;
    issuesEncountered: number;
  }): void {
    this.metrics.adoption.satisfactionScore = feedback.satisfaction;

    // Calculate improvements based on feedback
    const baselineOnboardingTime = 120; // 2 hours baseline
    const onboardingImprovement = ((baselineOnboardingTime - feedback.onboardingTime) / baselineOnboardingTime) * 100;
    this.metrics.developerExperience.onboardingTimeReduction = Math.max(0, onboardingImprovement);

    const baselineIssues = 10; // 10 issues baseline for onboarding
    const bugReduction = ((baselineIssues - feedback.issuesEncountered) / baselineIssues) * 100;
    this.metrics.developerExperience.bugRateReduction = Math.max(0, bugReduction);
  }

  /**
   * Update cost savings calculations
   */
  private updateCostSavings(): void {
    const completionFactor = this.metrics.completionRate / 100;

    // Licensing cost savings: $700 per developer per year
    const developersCount = 5; // Estimated developers
    this.metrics.costSavings.licensingFeesSaved = Math.round(
      700 * developersCount * completionFactor
    );

    // Development time savings: 20 hours per month per developer
    const monthlyHoursSaved = 20 * developersCount * completionFactor;
    this.metrics.costSavings.developmentTimeSaved = monthlyHoursSaved;

    // Maintenance cost reduction: $5000 per year
    this.metrics.costSavings.maintenanceCostsReduced = Math.round(
      5000 * completionFactor
    );
  }

  /**
   * Update compound metrics
   */
  private updateCompoundMetrics(): void {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format

    // Add monthly improvement data
    const monthlyData = {
      month: currentMonth,
      performanceGain: this.metrics.performanceMetrics.renderTimeImprovement,
      costSavings: this.metrics.costSavings.licensingFeesSaved / 12, // Monthly
      developerProductivity: this.metrics.developerExperience.featureVelocityIncrease,
      errorReduction: this.metrics.developerExperience.bugRateReduction,
    };

    // Update or add monthly data
    const existingIndex = this.compoundMetrics.monthlyImprovements.findIndex(
      m => m.month === currentMonth
    );

    if (existingIndex >= 0) {
      this.compoundMetrics.monthlyImprovements[existingIndex] = monthlyData;
    } else {
      this.compoundMetrics.monthlyImprovements.push(monthlyData);
    }

    // Calculate cumulative benefits
    this.calculateCumulativeBenefits();

    // Generate projections
    this.generateProjections();
  }

  /**
   * Calculate cumulative benefits over time
   */
  private calculateCumulativeBenefits(): void {
    const improvements = this.compoundMetrics.monthlyImprovements;

    this.compoundMetrics.cumulativeBenefits = {
      totalCostSavings: improvements.reduce((sum, m) => sum + m.costSavings, 0),
      totalHoursSaved: improvements.reduce((sum, m) => sum + (m.developerProductivity / 100 * 20), 0), // Estimate
      totalPerformanceGain: improvements.reduce((sum, m) => sum + m.performanceGain, 0) / Math.max(1, improvements.length),
      qualityImprovementScore: improvements.reduce((sum, m) => sum + m.errorReduction, 0) / Math.max(1, improvements.length),
    };
  }

  /**
   * Generate future projections based on current trends
   */
  private generateProjections(): void {
    const improvements = this.compoundMetrics.monthlyImprovements;

    if (improvements.length === 0) return;

    // Calculate average monthly improvements
    const avgPerformanceGain = improvements.reduce((sum, m) => sum + m.performanceGain, 0) / improvements.length;
    const avgCostSavings = improvements.reduce((sum, m) => sum + m.costSavings, 0) / improvements.length;
    const avgProductivityGain = improvements.reduce((sum, m) => sum + m.developerProductivity, 0) / improvements.length;

    // Project 6 months ahead
    this.compoundMetrics.projections.sixMonthProjection =
      avgCostSavings * 6 + (avgProductivityGain / 100 * 20 * 6 * 5); // 5 developers

    // Project 1 year ahead
    this.compoundMetrics.projections.oneYearProjection =
      avgCostSavings * 12 + (avgProductivityGain / 100 * 20 * 12 * 5);

    // Calculate ROI
    const implementationCost = 50000; // Estimated implementation cost
    const annualSavings = this.compoundMetrics.projections.oneYearProjection;
    this.compoundMetrics.projections.roi = ((annualSavings - implementationCost) / implementationCost) * 100;
  }

  /**
   * Emit progress event
   */
  private emitProgressEvent(): void {
    const event = new CustomEvent('migrationProgress', {
      detail: {
        metrics: this.metrics,
        compoundMetrics: this.compoundMetrics,
        timestamp: Date.now(),
      },
    });
    window.dispatchEvent(event);
  }

  /**
   * Get current metrics
   */
  getMetrics(): MigrationMetrics {
    return { ...this.metrics };
  }

  /**
   * Get compound metrics
   */
  getCompoundMetrics(): CompoundEffectMetrics {
    return { ...this.compoundMetrics };
  }

  /**
   * Generate comprehensive report
   */
  generateReport(): {
    summary: string;
    metrics: MigrationMetrics;
    compoundMetrics: CompoundEffectMetrics;
    recommendations: string[];
  } {
    const recommendations = this.generateRecommendations();
    const summary = this.generateSummary();

    return {
      summary,
      metrics: this.metrics,
      compoundMetrics: this.compoundMetrics,
      recommendations,
    };
  }

  /**
   * Generate executive summary
   */
  private generateSummary(): string {
    const { completionRate, costSavings, performanceMetrics } = this.metrics;
    const { cumulativeBenefits, projections } = this.compoundMetrics;

    return `
# AG Charts Migration - Executive Summary

## Migration Status
- **Completion Rate**: ${completionRate.toFixed(1)}%
- **Components Migrated**: ${this.metrics.componentsMigrated}/${this.metrics.totalComponents}
- **Timeline**: ${Math.round((Date.now() - this.startTime) / (1000 * 60 * 60 * 24))} days

## Financial Impact
- **Annual Licensing Savings**: $${costSavings.licensingFeesSaved.toLocaleString()}
- **Monthly Development Time Saved**: ${costSavings.developmentTimeSaved} hours
- **Annual Maintenance Savings**: $${costSavings.maintenanceCostsReduced.toLocaleString()}
- **6-Month Projection**: $${projections.sixMonthProjection.toLocaleString()}
- **1-Year ROI**: ${projections.roi.toFixed(1)}%

## Performance Improvements
- **Render Time Improvement**: ${performanceMetrics.renderTimeImprovement}%
- **Bundle Size Reduction**: ${performanceMetrics.bundleSizeReduction}%
- **Memory Usage Reduction**: ${performanceMetrics.memoryUsageReduction}%

## Developer Experience
- **Onboarding Time Reduction**: ${this.metrics.developerExperience.onboardingTimeReduction}%
- **Bug Rate Reduction**: ${this.metrics.developerExperience.bugRateReduction}%
- **User Satisfaction**: ${this.metrics.adoption.satisfactionScore}/5

## Compound Benefits
- **Total Cost Savings to Date**: $${cumulativeBenefits.totalCostSavings.toLocaleString()}
- **Total Hours Saved**: ${cumulativeBenefits.totalHoursSaved.toFixed(1)}
- **Quality Improvement**: ${cumulativeBenefits.qualityImprovementScore.toFixed(1)}%
    `.trim();
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    if (this.metrics.completionRate < 100) {
      recommendations.push(
        `Complete remaining ${this.metrics.totalComponents - this.metrics.componentsMigrated} components to achieve full migration benefits`
      );
    }

    if (this.metrics.performanceMetrics.renderTimeImprovement < 50) {
      recommendations.push(
        'Implement additional performance optimizations to achieve target 50% improvement'
      );
    }

    if (this.metrics.adoption.developersUsingLibrary < 5) {
      recommendations.push(
        'Increase developer onboarding and training to drive adoption'
      );
    }

    if (this.metrics.adoption.satisfactionScore < 4) {
      recommendations.push(
        'Address developer pain points to improve satisfaction score above 4/5'
      );
    }

    if (this.compoundMetrics.projections.roi < 100) {
      recommendations.push(
        'Focus on high-impact features to improve ROI above 100%'
      );
    }

    // Always include these recommendations
    recommendations.push(
      'Set up automated monitoring to track long-term compound effects',
      'Create case studies from successful implementations',
      'Establish regular performance reviews and optimization cycles'
    );

    return recommendations;
  }

  /**
   * Export metrics to JSON
   */
  exportMetrics(): string {
    return JSON.stringify({
      metrics: this.metrics,
      compoundMetrics: this.compoundMetrics,
      timestamp: Date.now(),
      migrationDuration: Date.now() - this.startTime,
    }, null, 2);
  }

  /**
   * Import metrics from JSON
   */
  importMetrics(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      this.metrics = { ...this.metrics, ...data.metrics };
      this.compoundMetrics = { ...this.compoundMetrics, ...data.compoundMetrics };
    } catch (error) {
      console.error('Failed to import metrics:', error);
      throw error;
    }
  }

  /**
   * Reset all metrics
   */
  reset(): void {
    this.metrics = this.initializeMetrics();
    this.compoundMetrics = this.initializeCompoundMetrics();
    this.startTime = Date.now();
  }
}

/**
 * Export singleton instance
 */
export const migrationAnalytics = MigrationAnalytics.getInstance();

/**
 * Convenience function to track migration progress
 */
export const trackMigrationProgress = (componentsMigrated: number): void => {
  migrationAnalytics.updateMigrationProgress(componentsMigrated);
};

/**
 * Convenience function to record performance gains
 */
export const recordPerformanceGains = (
  renderTimeImprovement: number,
  bundleSizeReduction: number,
  memoryUsageReduction: number
): void => {
  migrationAnalytics.recordPerformanceImprovement(
    renderTimeImprovement,
    bundleSizeReduction,
    memoryUsageReduction
  );
};