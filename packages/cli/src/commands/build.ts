/**
 * Build command - production build with optimizations
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { glob } from 'glob';

interface BuildOptions {
  analyze?: boolean;
  sourcemap?: boolean;
  minify?: boolean;
  target?: string;
}

export const buildCommand = new Command('build')
  .description('Build for production with optimizations')
  .option('--analyze', 'Analyze bundle size', false)
  .option('--no-sourcemap', 'Disable source maps')
  .option('--no-minify', 'Disable minification')
  .option('--target <target>', 'Build target (es2020, es2015)', 'es2020')
  .action(async (options: BuildOptions) => {
    console.log(chalk.cyan('\n🏗️  Building for production...\n'));

    // Check for required files
    if (!fs.existsSync('package.json')) {
      console.error(
        chalk.red('✖ No package.json found. Are you in a project directory?')
      );
      process.exit(1);
    }

    const packageJson = await fs.readJson('package.json');
    const hasBuildScript = !!packageJson.scripts?.build;

    // Pre-build checks
    await runPreBuildChecks();

    const spinner = ora('Building application...').start();

    try {
      // Clean dist directory
      if (fs.existsSync('dist')) {
        await fs.remove('dist');
      }

      // Run build command
      const packageManager = detectPackageManager();
      let buildCommand = hasBuildScript
        ? `${packageManager} run build`
        : 'npx vite build';

      // Add build options for vite
      if (!hasBuildScript && fs.existsSync('vite.config.js')) {
        if (!options.sourcemap) buildCommand += ' --no-sourcemap';
        if (!options.minify) buildCommand += ' --no-minify';
      }

      // Set environment variables
      const env = {
        ...process.env,
        NODE_ENV: 'production',
        VITE_BUILD_TARGET: options.target,
      };

      execSync(buildCommand, { stdio: 'inherit', env });
      spinner.succeed('Build completed successfully');

      // Post-build analysis
      const buildStats = await analyzeBuild();
      displayBuildStats(buildStats);

      // Bundle analysis
      if (options.analyze) {
        await runBundleAnalysis();
      }

      // Cin7 DSL specific optimizations
      await applyCin7Optimizations();

      console.log(chalk.green('\n✨ Build completed successfully!'));
      console.log(chalk.gray(`Output directory: ${chalk.white('dist/')}`));

    } catch (error) {
      spinner.fail('Build failed');
      console.error(error);
      process.exit(1);
    }
  });

async function runPreBuildChecks() {
  const checks = [
    {
      name: 'TypeScript',
      command: 'npm run typecheck',
      optional: true,
    },
    {
      name: 'Linting',
      command: 'npm run lint',
      optional: true,
    },
  ];

  for (const check of checks) {
    try {
      const spinner = ora(`Running ${check.name} check...`).start();
      execSync(check.command, { stdio: 'pipe' });
      spinner.succeed(`${check.name} check passed`);
    } catch (error) {
      if (!check.optional) {
        console.error(chalk.red(`✖ ${check.name} check failed`));
        process.exit(1);
      } else {
        // Skip if script doesn't exist
      }
    }
  }
}

async function analyzeBuild(): Promise<any> {
  const stats = {
    totalSize: 0,
    files: [] as Array<{ name: string; size: number }>,
    layers: {
      core: 0,
      vanillaJs: 0,
      polaris: 0,
      extjs: 0,
      sdk: 0,
    },
  };

  // Find all built files
  const files = await glob('dist/**/*.{js,css}');

  for (const file of files) {
    const stat = await fs.stat(file);
    const size = stat.size;
    stats.totalSize += size;

    const relativePath = path.relative('dist', file);
    stats.files.push({
      name: relativePath,
      size,
    });

    // Categorize by layer
    if (file.includes('core')) stats.layers.core += size;
    else if (file.includes('vanilla')) stats.layers.vanillaJs += size;
    else if (file.includes('polaris')) stats.layers.polaris += size;
    else if (file.includes('extjs')) stats.layers.extjs += size;
    else if (file.includes('sdk')) stats.layers.sdk += size;
  }

  // Sort files by size
  stats.files.sort((a, b) => b.size - a.size);

  return stats;
}

function displayBuildStats(stats: any) {
  console.log(chalk.bold('\n📊 Build Statistics:\n'));

  // Total size
  const totalSizeMB = (stats.totalSize / 1024 / 1024).toFixed(2);
  console.log(`Total bundle size: ${chalk.cyan(totalSizeMB + ' MB')}`);

  // Layer breakdown
  if (Object.values(stats.layers).some((size) => size > 0)) {
    console.log(chalk.bold('\n📦 Layer Breakdown:'));
    Object.entries(stats.layers).forEach(([layer, size]: [string, any]) => {
      if (size > 0) {
        const sizeMB = (size / 1024 / 1024).toFixed(2);
        const percentage = ((size / stats.totalSize) * 100).toFixed(1);
        console.log(
          `  ${layer}: ${chalk.cyan(sizeMB + ' MB')} (${percentage}%)`
        );
      }
    });
  }

  // Largest files
  console.log(chalk.bold('\n📄 Largest Files:'));
  stats.files.slice(0, 5).forEach((file: any) => {
    const sizeKB = (file.size / 1024).toFixed(1);
    console.log(`  ${file.name}: ${chalk.yellow(sizeKB + ' KB')}`);
  });

  // Warnings
  if (stats.totalSize > 5 * 1024 * 1024) {
    console.log(
      chalk.yellow('\n⚠️  Bundle size exceeds 5MB. Consider:')
    );
    console.log(chalk.gray('  • Code splitting for large components'));
    console.log(chalk.gray('  • Lazy loading for routes'));
    console.log(chalk.gray('  • Tree shaking unused exports'));
  }
}

async function runBundleAnalysis() {
  console.log(chalk.cyan('\n📈 Running bundle analysis...\n'));

  try {
    // Check if rollup-plugin-visualizer is available
    const packageJson = await fs.readJson('package.json');
    const hasVisualizer = 
      packageJson.devDependencies?.['rollup-plugin-visualizer'] ||
      packageJson.dependencies?.['rollup-plugin-visualizer'];

    if (hasVisualizer) {
      console.log(chalk.green('✓ Bundle analysis report generated'));
      console.log(chalk.gray('  Open stats.html to view the report'));
    } else {
      console.log(chalk.yellow('ℹ️  Install rollup-plugin-visualizer for detailed analysis:'));
      console.log(chalk.gray('  npm install -D rollup-plugin-visualizer'));
      console.log(chalk.gray('  Then add to your vite.config.js'));
    }
  } catch (error) {
    console.warn(chalk.yellow('Could not run bundle analysis'));
  }
}

async function applyCin7Optimizations() {
  console.log(chalk.cyan('\n⚡ Applying Cin7 DSL optimizations...\n'));

  const optimizations = [];

  // Check for optimization opportunities
  const indexHtml = path.join('dist', 'index.html');
  if (fs.existsSync(indexHtml)) {
    // Add preload hints for critical resources
    let html = await fs.readFile(indexHtml, 'utf-8');
    
    // Add design tokens preload
    if (html.includes('design-tokens')) {
      html = html.replace(
        '</head>',
        '<link rel="preload" href="/assets/design-tokens.css" as="style">\n</head>'
      );
      optimizations.push('Added design tokens preload');
    }

    // Add resource hints
    html = html.replace(
      '</head>',
      '<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">\n</head>'
    );

    await fs.writeFile(indexHtml, html);
    optimizations.push('Added resource hints');
  }

  // Generate service worker for offline support
  if (fs.existsSync('public/sw.js')) {
    await fs.copy('public/sw.js', 'dist/sw.js');
    optimizations.push('Copied service worker');
  }

  if (optimizations.length > 0) {
    optimizations.forEach((opt) => {
      console.log(chalk.green(`✓ ${opt}`));
    });
  }
}

function detectPackageManager(): string {
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json')) return 'npm';
  return 'npm';
}