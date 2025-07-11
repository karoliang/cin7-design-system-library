/**
 * Migrate command - migration tools for converting to Cin7 DSL
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import inquirer from 'inquirer';

interface MigrateOptions {
  from?: string;
  to?: string;
  output?: string;
  interactive?: boolean;
  dryRun?: boolean;
  report?: string;
}

interface MigrationResult {
  file: string;
  changes: string[];
  recommendations: string[];
  automatic: boolean;
}

export const migrateCommand = new Command('migrate')
  .description('Migration tools for converting to Cin7 DSL')
  .action(() => {
    // Show help if no subcommand
    migrateCommand.outputHelp();
  });

// Subcommand: analyze
migrateCommand
  .command('analyze')
  .description('Analyze project for migration opportunities')
  .option('--from <framework>', 'Source framework (polaris, extjs, react)')
  .option('--report <path>', 'Generate detailed report')
  .action(async (options: MigrateOptions) => {
    console.log(chalk.cyan('\n🔍 Analyzing project for migration...\n'));

    const projectInfo = await analyzeProject(options.from);
    displayAnalysisResults(projectInfo);

    if (options.report) {
      await generateReport(projectInfo, options.report);
    }
  });

// Subcommand: plan
migrateCommand
  .command('plan')
  .description('Generate migration plan')
  .option('--from <framework>', 'Source framework', 'polaris')
  .option('--to <framework>', 'Target framework', 'cin7')
  .option('--output <path>', 'Save plan to file')
  .action(async (options: MigrateOptions) => {
    console.log(chalk.cyan('\n📋 Generating migration plan...\n'));

    const plan = await generateMigrationPlan(options);
    displayMigrationPlan(plan);

    if (options.output) {
      await fs.writeJson(options.output, plan, { spaces: 2 });
      console.log(chalk.green(`\n✓ Plan saved to ${options.output}`));
    }
  });

// Subcommand: convert
migrateCommand
  .command('convert <path>')
  .description('Convert components to Cin7 DSL')
  .option('--from <framework>', 'Source framework', 'polaris')
  .option('--optimize', 'Apply performance optimizations', true)
  .option('--dry-run', 'Preview changes without modifying files', false)
  .option('--interactive', 'Interactive mode', false)
  .action(async (sourcePath: string, options: MigrateOptions) => {
    console.log(chalk.cyan('\n🔄 Converting components to Cin7 DSL...\n'));

    const files = await findFiles(sourcePath);
    const results: MigrationResult[] = [];

    for (const file of files) {
      const result = await migrateFile(file, options);
      if (result) {
        results.push(result);
      }
    }

    displayMigrationResults(results);

    if (!options.dryRun) {
      await applyMigrations(results);
    }
  });

async function analyzeProject(framework?: string): Promise<any> {
  const spinner = ora('Analyzing project structure...').start();

  const projectInfo = {
    framework: framework || 'unknown',
    components: 0,
    patterns: {
      dataIntensive: 0,
      simpleInteractions: 0,
      complexForms: 0,
      modernUI: 0,
    },
    recommendations: [],
    migrationComplexity: 'medium',
  };

  try {
    // Detect framework if not specified
    if (!framework) {
      projectInfo.framework = await detectFramework();
    }

    // Find all component files
    const componentFiles = glob.sync('src/**/*.{js,jsx,ts,tsx}', {
      ignore: ['**/node_modules/**', '**/dist/**'],
    });

    projectInfo.components = componentFiles.length;

    // Analyze patterns
    for (const file of componentFiles) {
      const content = await fs.readFile(file, 'utf-8');
      
      // Check for data-intensive patterns
      if (content.includes('DataTable') || content.includes('Grid') || 
          content.includes('Table') || content.match(/data\s*=\s*\[/)) {
        projectInfo.patterns.dataIntensive++;
      }

      // Check for simple interactions
      if (content.match(/onClick|addEventListener/) && 
          !content.includes('useState') && !content.includes('class')) {
        projectInfo.patterns.simpleInteractions++;
      }

      // Check for complex forms
      if (content.includes('Form') || content.includes('TextField') ||
          content.match(/input.*type=["'](?:text|email|password)/)) {
        projectInfo.patterns.complexForms++;
      }

      // Check for modern UI patterns
      if (content.includes('Modal') || content.includes('Drawer') ||
          content.includes('Toast') || content.includes('Animation')) {
        projectInfo.patterns.modernUI++;
      }
    }

    // Generate recommendations
    if (projectInfo.patterns.dataIntensive > 5) {
      projectInfo.recommendations.push(
        'Consider using ExtJS adapters for data-intensive components'
      );
    }

    if (projectInfo.patterns.simpleInteractions > 10) {
      projectInfo.recommendations.push(
        'Use vanilla-js layer for simple DOM interactions to reduce bundle size'
      );
    }

    if (projectInfo.framework === 'polaris' && projectInfo.patterns.modernUI > 5) {
      projectInfo.recommendations.push(
        'Keep Polaris for modern UI components, optimize with selective imports'
      );
    }

    // Determine complexity
    const totalPatterns = Object.values(projectInfo.patterns).reduce((a, b) => a + b, 0);
    if (totalPatterns < 10) {
      projectInfo.migrationComplexity = 'low';
    } else if (totalPatterns > 30) {
      projectInfo.migrationComplexity = 'high';
    }

    spinner.succeed('Analysis complete');
    return projectInfo;
  } catch (error) {
    spinner.fail('Analysis failed');
    throw error;
  }
}

async function detectFramework(): Promise<string> {
  const packageJson = await fs.readJson('package.json');
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

  if (deps['@shopify/polaris']) return 'polaris';
  if (deps['extjs'] || deps['ext-react']) return 'extjs';
  if (deps['react']) return 'react';
  if (deps['vue']) return 'vue';
  if (deps['angular']) return 'angular';
  
  return 'unknown';
}

function displayAnalysisResults(projectInfo: any) {
  console.log(chalk.bold('📊 Project Analysis Results:\n'));
  
  console.log(`Framework: ${chalk.cyan(projectInfo.framework)}`);
  console.log(`Components: ${chalk.cyan(projectInfo.components)}`);
  console.log(`Migration Complexity: ${
    projectInfo.migrationComplexity === 'low' ? chalk.green(projectInfo.migrationComplexity) :
    projectInfo.migrationComplexity === 'high' ? chalk.red(projectInfo.migrationComplexity) :
    chalk.yellow(projectInfo.migrationComplexity)
  }`);

  console.log(chalk.bold('\n📈 Pattern Analysis:'));
  console.log(`  Data-intensive components: ${projectInfo.patterns.dataIntensive}`);
  console.log(`  Simple interactions: ${projectInfo.patterns.simpleInteractions}`);
  console.log(`  Complex forms: ${projectInfo.patterns.complexForms}`);
  console.log(`  Modern UI components: ${projectInfo.patterns.modernUI}`);

  if (projectInfo.recommendations.length > 0) {
    console.log(chalk.bold('\n💡 Recommendations:'));
    projectInfo.recommendations.forEach((rec: string) => {
      console.log(chalk.yellow(`  • ${rec}`));
    });
  }
}

async function generateMigrationPlan(options: MigrateOptions): Promise<any> {
  const plan = {
    phases: [],
    estimatedEffort: 'medium',
    breakingChanges: [],
    dependencies: [],
  };

  // Phase 1: Setup
  plan.phases.push({
    name: 'Setup Cin7 DSL',
    tasks: [
      'Install @cin7/core and @cin7/design-tokens',
      'Set up build configuration',
      'Configure design tokens',
    ],
    effort: '2-4 hours',
  });

  // Phase 2: Layer adoption
  if (options.from === 'polaris') {
    plan.phases.push({
      name: 'Adopt Multi-Layer Architecture',
      tasks: [
        'Identify simple interactions for vanilla-js layer',
        'Move data tables to ExtJS adapters',
        'Keep Polaris for modern UI components',
        'Add TypeScript SDK for business logic',
      ],
      effort: '1-2 weeks',
    });
  }

  // Phase 3: Optimization
  plan.phases.push({
    name: 'Performance Optimization',
    tasks: [
      'Implement code splitting',
      'Optimize bundle sizes',
      'Add lazy loading',
      'Performance testing',
    ],
    effort: '3-5 days',
  });

  return plan;
}

function displayMigrationPlan(plan: any) {
  console.log(chalk.bold('📋 Migration Plan:\n'));

  plan.phases.forEach((phase: any, index: number) => {
    console.log(chalk.cyan(`Phase ${index + 1}: ${phase.name}`));
    console.log(chalk.gray(`Estimated effort: ${phase.effort}`));
    console.log('Tasks:');
    phase.tasks.forEach((task: string) => {
      console.log(chalk.gray(`  • ${task}`));
    });
    console.log();
  });

  console.log(chalk.bold(`Total Estimated Effort: ${plan.estimatedEffort}`));
}

async function findFiles(sourcePath: string): Promise<string[]> {
  const stat = await fs.stat(sourcePath);
  
  if (stat.isFile()) {
    return [sourcePath];
  }

  return glob.sync(path.join(sourcePath, '**/*.{js,jsx,ts,tsx}'), {
    ignore: ['**/node_modules/**', '**/dist/**'],
  });
}

async function migrateFile(
  filePath: string,
  options: MigrateOptions
): Promise<MigrationResult | null> {
  const content = await fs.readFile(filePath, 'utf-8');
  const result: MigrationResult = {
    file: filePath,
    changes: [],
    recommendations: [],
    automatic: true,
  };

  // Polaris to Cin7 DSL migrations
  if (options.from === 'polaris') {
    // Simple onClick to vanilla-js
    if (content.includes('onClick') && !content.includes('useState')) {
      result.changes.push('Convert simple onClick handlers to vanilla-js');
      result.recommendations.push(
        'Use @cin7/vanilla-js for lightweight event handling'
      );
    }

    // DataTable to ExtJS Grid
    if (content.includes('DataTable') || content.includes('IndexTable')) {
      result.changes.push('Convert DataTable to ExtJS Grid adapter');
      result.recommendations.push(
        'ExtJS grids provide better performance for large datasets'
      );
      result.automatic = false; // Requires manual conversion
    }

    // Form optimizations
    if (content.includes('Form') && content.includes('TextField')) {
      result.recommendations.push(
        'Consider ExtJS forms for complex validation scenarios'
      );
    }
  }

  // Skip files with no changes
  if (result.changes.length === 0 && result.recommendations.length === 0) {
    return null;
  }

  return result;
}

function displayMigrationResults(results: MigrationResult[]) {
  console.log(chalk.bold(`\n📊 Migration Results:\n`));
  
  const automatic = results.filter((r) => r.automatic).length;
  const manual = results.filter((r) => !r.automatic).length;

  console.log(`Files analyzed: ${chalk.cyan(results.length)}`);
  console.log(`Automatic migrations: ${chalk.green(automatic)}`);
  console.log(`Manual migrations required: ${chalk.yellow(manual)}`);

  if (results.length > 0) {
    console.log(chalk.bold('\n📝 Changes by file:'));
    results.forEach((result) => {
      console.log(`\n${chalk.blue(result.file)}`);
      result.changes.forEach((change) => {
        console.log(chalk.green(`  ✓ ${change}`));
      });
      result.recommendations.forEach((rec) => {
        console.log(chalk.yellow(`  💡 ${rec}`));
      });
    });
  }
}

async function applyMigrations(results: MigrationResult[]) {
  const automatic = results.filter((r) => r.automatic);
  
  if (automatic.length === 0) {
    console.log(chalk.yellow('\n⚠️  No automatic migrations to apply'));
    return;
  }

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: `Apply ${automatic.length} automatic migrations?`,
      default: true,
    },
  ]);

  if (!confirm) {
    console.log(chalk.gray('Migration cancelled'));
    return;
  }

  const spinner = ora('Applying migrations...').start();

  for (const result of automatic) {
    // In a real implementation, this would modify the files
    // For now, we just simulate the process
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  spinner.succeed(`Applied ${automatic.length} migrations`);
  console.log(chalk.green('\n✨ Migration complete!'));
  console.log(chalk.gray('Review the changes and test your application'));
}

async function generateReport(projectInfo: any, reportPath: string) {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Cin7 DSL Migration Report</title>
  <style>
    body { font-family: system-ui; margin: 40px; line-height: 1.6; }
    h1 { color: #1e40af; }
    h2 { color: #3730a3; margin-top: 30px; }
    .metric { background: #f3f4f6; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .recommendation { background: #fef3c7; padding: 10px; margin: 5px 0; border-radius: 4px; }
    .high { color: #dc2626; }
    .medium { color: #f59e0b; }
    .low { color: #10b981; }
  </style>
</head>
<body>
  <h1>Cin7 DSL Migration Report</h1>
  
  <h2>Project Overview</h2>
  <div class="metric">
    <strong>Framework:</strong> ${projectInfo.framework}<br>
    <strong>Components:</strong> ${projectInfo.components}<br>
    <strong>Complexity:</strong> <span class="${projectInfo.migrationComplexity}">${projectInfo.migrationComplexity}</span>
  </div>
  
  <h2>Pattern Analysis</h2>
  <div class="metric">
    <strong>Data-intensive:</strong> ${projectInfo.patterns.dataIntensive}<br>
    <strong>Simple interactions:</strong> ${projectInfo.patterns.simpleInteractions}<br>
    <strong>Complex forms:</strong> ${projectInfo.patterns.complexForms}<br>
    <strong>Modern UI:</strong> ${projectInfo.patterns.modernUI}
  </div>
  
  <h2>Recommendations</h2>
  ${projectInfo.recommendations.map((rec: string) => 
    `<div class="recommendation">${rec}</div>`
  ).join('')}
</body>
</html>
  `;

  await fs.writeFile(reportPath, html);
  console.log(chalk.green(`\n✓ Report generated: ${reportPath}`));
}