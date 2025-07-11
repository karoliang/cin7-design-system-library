/**
 * Dev command - start development server with all layers
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

interface DevOptions {
  port?: number;
  open?: boolean;
  https?: boolean;
  host?: string;
}

export const devCommand = new Command('dev')
  .description('Start development server with hot reload')
  .option('-p, --port <port>', 'Port to run on', '3000')
  .option('--no-open', 'Do not open browser')
  .option('--https', 'Use HTTPS', false)
  .option('--host <host>', 'Host to bind to', 'localhost')
  .action(async (options: DevOptions) => {
    console.log(chalk.cyan('\n🚀 Starting Cin7 DSL development server...\n'));

    // Check for required files
    if (!fs.existsSync('package.json')) {
      console.error(
        chalk.red('✖ No package.json found. Are you in a project directory?')
      );
      process.exit(1);
    }

    // Check for vite config
    const hasVite = fs.existsSync('vite.config.js') || fs.existsSync('vite.config.ts');
    const packageJson = await fs.readJson('package.json');
    
    // Determine dev command
    let devCommand = 'npm run dev';
    if (packageJson.scripts?.dev) {
      // Use existing dev script
      const packageManager = detectPackageManager();
      devCommand = `${packageManager} run dev`;
    } else if (hasVite) {
      // Use vite directly
      devCommand = 'npx vite';
    } else {
      console.error(
        chalk.red('✖ No dev script found in package.json')
      );
      console.log(
        chalk.yellow('Add a "dev" script to your package.json:')
      );
      console.log(
        chalk.gray('  "scripts": {\n    "dev": "vite"\n  }')
      );
      process.exit(1);
    }

    // Build command with options
    const args: string[] = [];
    if (hasVite) {
      args.push('--port', String(options.port));
      args.push('--host', options.host || 'localhost');
      if (!options.open) args.push('--no-open');
      if (options.https) args.push('--https');
    }

    const spinner = ora('Starting development server...').start();

    try {
      // Start dev server
      const [cmd, ...cmdArgs] = devCommand.split(' ');
      const devProcess = spawn(cmd, [...cmdArgs, ...args], {
        stdio: 'inherit',
        shell: true,
      });

      spinner.succeed('Development server started');

      // Show server info
      const protocol = options.https ? 'https' : 'http';
      const url = `${protocol}://${options.host || 'localhost'}:${options.port}`;
      
      console.log(chalk.green('\n✨ Server running at:'));
      console.log(chalk.cyan(`  ${url}`));
      console.log(chalk.gray('\n  Press Ctrl+C to stop\n'));

      // Handle process termination
      process.on('SIGINT', () => {
        devProcess.kill('SIGINT');
        process.exit(0);
      });

      process.on('SIGTERM', () => {
        devProcess.kill('SIGTERM');
        process.exit(0);
      });

      devProcess.on('error', (error) => {
        console.error(chalk.red('✖ Failed to start dev server:'), error);
        process.exit(1);
      });

      devProcess.on('exit', (code) => {
        if (code !== 0 && code !== null) {
          console.error(chalk.red(`✖ Dev server exited with code ${code}`));
          process.exit(code);
        }
      });

    } catch (error) {
      spinner.fail('Failed to start development server');
      console.error(error);
      process.exit(1);
    }
  });

function detectPackageManager(): string {
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json')) return 'npm';
  
  // Default to npm
  return 'npm';
}