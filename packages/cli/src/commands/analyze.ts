/**
 * Analyze command - performance analysis for Cin7 DSL applications
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

interface AnalyzeOptions {
  output?: string;
  format?: 'json' | 'html' | 'csv';
  compare?: string;
  metrics?: string[];
  device?: 'mobile' | 'desktop';
}

const defaultMetrics = [
  'performance',
  'accessibility',
  'best-practices',
  'seo',
];

export const analyzeCommand = new Command('analyze')
  .description('Analyze application performance and quality')
  .argument('[url]', 'URL to analyze (defaults to local dev server)')
  .option('-o, --output <path>', 'Output file path')
  .option('-f, --format <format>', 'Output format (json, html, csv)', 'html')
  .option('--compare <path>', 'Compare with previous report')
  .option('--metrics <metrics>', 'Comma-separated metrics to analyze', defaultMetrics.join(','))
  .option('--device <device>', 'Device type (mobile, desktop)', 'desktop')
  .action(async (url: string | undefined, options: AnalyzeOptions) => {
    console.log(chalk.cyan('\n📊 Analyzing application performance...\n'));

    // Default to local dev server if no URL provided
    const targetUrl = url || detectLocalServer();
    if (!targetUrl) {
      console.error(
        chalk.red('✖ No URL provided and no local server detected')
      );
      console.log(
        chalk.yellow('Please provide a URL or start your dev server')
      );
      process.exit(1);
    }

    const spinner = ora(`Analyzing ${targetUrl}...`).start();

    let chrome: any;
    try {
      // Launch Chrome
      chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--disable-gpu'],
      });

      // Configure Lighthouse options
      const lighthouseOptions = {
        logLevel: 'error' as const,
        output: options.format as any,
        port: chrome.port,
        onlyCategories: options.metrics?.split(',') || defaultMetrics,
        formFactor: options.device as any,
        screenEmulation: {
          mobile: options.device === 'mobile',
          width: options.device === 'mobile' ? 375 : 1350,
          height: options.device === 'mobile' ? 667 : 940,
          deviceScaleFactor: options.device === 'mobile' ? 2 : 1,
          disabled: false,
        },
      };

      // Run Lighthouse
      const runnerResult = await lighthouse(targetUrl, lighthouseOptions);
      
      if (!runnerResult) {
        throw new Error('Lighthouse analysis failed');
      }

      spinner.succeed('Analysis complete');

      // Process results
      const report = runnerResult.report;
      const lhr = runnerResult.lhr;

      // Display summary
      displaySummary(lhr);

      // Check for Cin7 DSL specific patterns
      analyzeCin7Patterns(lhr);

      // Save report if requested
      if (options.output) {
        const outputPath = path.resolve(options.output);
        await fs.ensureDir(path.dirname(outputPath));
        
        if (typeof report === 'string') {
          await fs.writeFile(outputPath, report);
        } else {
          await fs.writeJson(outputPath, report, { spaces: 2 });
        }
        
        console.log(chalk.green(`\n✓ Report saved to ${outputPath}`));
      }

      // Compare with previous report if provided
      if (options.compare) {
        await compareReports(lhr, options.compare);
      }

      // Performance recommendations
      provideRecommendations(lhr);

    } catch (error) {
      spinner.fail('Analysis failed');
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    } finally {
      if (chrome) {
        await chrome.kill();
      }
    }
  });

function detectLocalServer(): string | null {
  // Common local server URLs
  const commonPorts = [3000, 5173, 8080, 4200, 3001];
  
  for (const port of commonPorts) {
    try {
      // Simple check - in real implementation would actually test connection
      return `http://localhost:${port}`;
    } catch {
      continue;
    }
  }
  
  return null;
}

function displaySummary(lhr: any) {
  console.log(chalk.bold('\n📈 Performance Summary:\n'));

  const categories = lhr.categories;
  const scores: Record<string, number> = {};

  Object.entries(categories).forEach(([key, category]: [string, any]) => {
    const score = Math.round(category.score * 100);
    scores[key] = score;
    
    const color = score >= 90 ? chalk.green : score >= 50 ? chalk.yellow : chalk.red;
    const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
    
    console.log(`${emoji} ${category.title}: ${color(score)}/100`);
  });

  // Key metrics
  if (lhr.audits) {
    console.log(chalk.bold('\n⚡ Key Metrics:\n'));
    
    const metrics = [
      { key: 'first-contentful-paint', name: 'First Contentful Paint' },
      { key: 'largest-contentful-paint', name: 'Largest Contentful Paint' },
      { key: 'total-blocking-time', name: 'Total Blocking Time' },
      { key: 'cumulative-layout-shift', name: 'Cumulative Layout Shift' },
      { key: 'speed-index', name: 'Speed Index' },
    ];

    metrics.forEach(({ key, name }) => {
      const audit = lhr.audits[key];
      if (audit) {
        const value = audit.displayValue || audit.score;
        const color = audit.score >= 0.9 ? chalk.green : audit.score >= 0.5 ? chalk.yellow : chalk.red;
        console.log(`${name}: ${color(value)}`);
      }
    });
  }
}

function analyzeCin7Patterns(lhr: any) {
  console.log(chalk.bold('\n🔍 Cin7 DSL Analysis:\n'));

  const patterns = {
    vanillaOptimization: false,
    polarisUsage: false,
    extjsDetected: false,
    designTokens: false,
    multiLayerArchitecture: false,
  };

  // Check for Cin7 DSL patterns in the page
  const scripts = lhr.audits['network-requests']?.details?.items || [];
  
  scripts.forEach((item: any) => {
    if (item.url.includes('@cin7/vanilla-js')) patterns.vanillaOptimization = true;
    if (item.url.includes('@cin7/polaris-adapter')) patterns.polarisUsage = true;
    if (item.url.includes('@cin7/extjs-adapters')) patterns.extjsDetected = true;
    if (item.url.includes('@cin7/design-tokens')) patterns.designTokens = true;
  });

  // Check for multi-layer usage
  const detectedLayers = Object.values(patterns).filter(Boolean).length;
  if (detectedLayers >= 2) patterns.multiLayerArchitecture = true;

  // Display findings
  if (patterns.multiLayerArchitecture) {
    console.log(chalk.green('✅ Multi-layer architecture detected'));
  }

  if (patterns.vanillaOptimization) {
    console.log(chalk.green('✅ Vanilla JS optimizations in use'));
  }

  if (patterns.polarisUsage) {
    console.log(chalk.blue('ℹ️  Polaris components detected'));
    if (lhr.audits['uses-responsive-images']?.score < 0.9) {
      console.log(chalk.yellow('   Consider lazy loading Polaris images'));
    }
  }

  if (patterns.extjsDetected) {
    console.log(chalk.blue('ℹ️  ExtJS components detected'));
    console.log(chalk.yellow('   Monitor bundle size for ExtJS libraries'));
  }

  if (!patterns.designTokens) {
    console.log(chalk.yellow('⚠️  Design tokens not detected'));
    console.log(chalk.gray('   Consider using @cin7/design-tokens for consistent styling'));
  }
}

async function compareReports(currentLhr: any, previousPath: string) {
  try {
    const previousReport = await fs.readJson(previousPath);
    const previousLhr = previousReport.lhr || previousReport;

    console.log(chalk.bold('\n📊 Comparison with Previous Report:\n'));

    Object.entries(currentLhr.categories).forEach(([key, category]: [string, any]) => {
      const currentScore = Math.round(category.score * 100);
      const previousScore = Math.round(previousLhr.categories[key]?.score * 100 || 0);
      const diff = currentScore - previousScore;

      const emoji = diff > 0 ? '📈' : diff < 0 ? '📉' : '➡️';
      const color = diff > 0 ? chalk.green : diff < 0 ? chalk.red : chalk.gray;

      console.log(
        `${emoji} ${category.title}: ${currentScore} (${color(`${diff > 0 ? '+' : ''}${diff}`)})`
      );
    });
  } catch (error) {
    console.error(chalk.yellow('⚠️  Could not compare with previous report'));
  }
}

function provideRecommendations(lhr: any) {
  console.log(chalk.bold('\n💡 Recommendations:\n'));

  const recommendations: string[] = [];

  // Performance recommendations
  if (lhr.categories.performance.score < 0.9) {
    if (lhr.audits['uses-text-compression']?.score < 1) {
      recommendations.push('Enable text compression (gzip/brotli) on your server');
    }
    if (lhr.audits['uses-responsive-images']?.score < 1) {
      recommendations.push('Optimize images with responsive sizing and modern formats');
    }
    if (lhr.audits['render-blocking-resources']?.score < 1) {
      recommendations.push('Eliminate render-blocking resources');
    }
  }

  // Cin7 DSL specific recommendations
  const bundleSize = lhr.audits['total-byte-weight']?.numericValue || 0;
  if (bundleSize > 1000000) { // 1MB
    recommendations.push('Consider using @cin7/vanilla-js for lightweight interactions instead of heavy frameworks');
  }

  if (lhr.audits['dom-size']?.numericValue > 1500) {
    recommendations.push('Large DOM detected - consider using ExtJS virtual scrolling for data tables');
  }

  // Display recommendations
  if (recommendations.length > 0) {
    recommendations.forEach((rec) => {
      console.log(chalk.yellow(`• ${rec}`));
    });
  } else {
    console.log(chalk.green('✅ Your application is well optimized!'));
  }

  console.log(chalk.gray('\nFor detailed recommendations, see the full report.'));
}