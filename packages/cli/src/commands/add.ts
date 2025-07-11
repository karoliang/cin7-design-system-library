/**
 * Add command - add Cin7 DSL packages to existing projects
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import { execSync } from 'child_process';
import inquirer from 'inquirer';

interface AddOptions {
  dev?: boolean;
  exact?: boolean;
}

const availablePackages = {
  'vanilla-js': {
    name: '@cin7/vanilla-js',
    description: 'Lightweight DOM manipulation and event utilities',
    peerDependencies: ['@cin7/core'],
  },
  'typescript-sdk': {
    name: '@cin7/typescript-sdk',
    description: 'Business logic patterns and state management',
    peerDependencies: ['@cin7/core'],
  },
  'design-tokens': {
    name: '@cin7/design-tokens',
    description: 'Extended design system tokens',
    peerDependencies: [],
  },
  'polaris-adapter': {
    name: '@cin7/polaris-adapter',
    description: 'React components with Polaris integration',
    peerDependencies: ['@cin7/core', '@cin7/design-tokens', 'react', 'react-dom'],
  },
  'extjs-adapters': {
    name: '@cin7/extjs-adapters',
    description: 'Enterprise ExtJS component adapters',
    peerDependencies: ['@cin7/core', '@cin7/design-tokens'],
  },
  auth: {
    name: '@cin7/auth',
    description: 'Authentication and authorization utilities',
    peerDependencies: ['@cin7/core'],
  },
};

export const addCommand = new Command('add')
  .description('Add Cin7 DSL packages to your project')
  .argument('[packages...]', 'Packages to add')
  .option('-D, --dev', 'Add as dev dependency', false)
  .option('-E, --exact', 'Use exact version', false)
  .action(async (packages: string[], options: AddOptions) => {
    console.log(chalk.cyan('\n📦 Adding Cin7 DSL packages...\n'));

    // Check if in a valid project
    if (!fs.existsSync('package.json')) {
      console.error(
        chalk.red('✖ No package.json found. Are you in a project directory?')
      );
      process.exit(1);
    }

    // Interactive mode if no packages specified
    let selectedPackages = packages;
    if (!packages.length) {
      const currentPackageJson = fs.readJsonSync('package.json');
      const installedPackages = new Set([
        ...Object.keys(currentPackageJson.dependencies || {}),
        ...Object.keys(currentPackageJson.devDependencies || {}),
      ]);

      const choices = Object.entries(availablePackages)
        .filter(([, pkg]) => !installedPackages.has(pkg.name))
        .map(([key, pkg]) => ({
          name: `${pkg.name} - ${pkg.description}`,
          value: key,
          checked: false,
        }));

      if (choices.length === 0) {
        console.log(chalk.yellow('All available packages are already installed!'));
        return;
      }

      const answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'packages',
          message: 'Select packages to add:',
          choices,
          validate: (answer) => {
            if (answer.length < 1) {
              return 'You must choose at least one package.';
            }
            return true;
          },
        },
      ]);
      selectedPackages = answers.packages;
    }

    // Validate packages
    const validPackages: string[] = [];
    const invalidPackages: string[] = [];

    selectedPackages.forEach((pkg) => {
      if (availablePackages[pkg as keyof typeof availablePackages]) {
        validPackages.push(pkg);
      } else {
        invalidPackages.push(pkg);
      }
    });

    if (invalidPackages.length > 0) {
      console.error(
        chalk.red(`✖ Unknown packages: ${invalidPackages.join(', ')}`)
      );
      console.log(chalk.yellow('\nAvailable packages:'));
      Object.entries(availablePackages).forEach(([key, pkg]) => {
        console.log(chalk.gray(`  - ${key}: ${pkg.description}`));
      });
      process.exit(1);
    }

    // Collect all packages to install (including peer dependencies)
    const packagesToInstall = new Set<string>();
    const peerDepsToCheck = new Set<string>();

    validPackages.forEach((pkg) => {
      const packageInfo = availablePackages[pkg as keyof typeof availablePackages];
      packagesToInstall.add(packageInfo.name);
      
      // Add peer dependencies
      packageInfo.peerDependencies.forEach((peer) => {
        if (peer.startsWith('@cin7/')) {
          packagesToInstall.add(peer);
        } else {
          peerDepsToCheck.add(peer);
        }
      });
    });

    // Check for missing peer dependencies
    if (peerDepsToCheck.size > 0) {
      const packageJson = fs.readJsonSync('package.json');
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      const missingPeers = Array.from(peerDepsToCheck).filter(
        (peer) => !allDeps[peer]
      );

      if (missingPeers.length > 0) {
        console.log(
          chalk.yellow(
            `\n⚠️  Missing peer dependencies: ${missingPeers.join(', ')}`
          )
        );
        const { installPeers } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'installPeers',
            message: 'Install missing peer dependencies?',
            default: true,
          },
        ]);

        if (installPeers) {
          missingPeers.forEach((peer) => packagesToInstall.add(peer));
        }
      }
    }

    // Install packages
    const spinner = ora('Installing packages...').start();
    const packageManager = detectPackageManager();
    const installCommand = buildInstallCommand(
      packageManager,
      Array.from(packagesToInstall),
      options
    );

    try {
      execSync(installCommand, { stdio: 'inherit' });
      spinner.succeed('Packages installed successfully');

      // Update cin7.config.js if it exists
      updateCin7Config(validPackages);

      // Show post-install instructions
      showPostInstallInstructions(validPackages);

      console.log(chalk.green('\n✨ Packages added successfully!'));
    } catch (error) {
      spinner.fail('Failed to install packages');
      console.error(error);
      process.exit(1);
    }
  });

function detectPackageManager(): string {
  // Check for lock files
  if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
  if (fs.existsSync('yarn.lock')) return 'yarn';
  if (fs.existsSync('package-lock.json')) return 'npm';

  // Check for global commands
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      return 'yarn';
    } catch {
      return 'npm';
    }
  }
}

function buildInstallCommand(
  packageManager: string,
  packages: string[],
  options: AddOptions
): string {
  const packageList = packages.join(' ');
  const exactFlag = options.exact ? '--exact' : '';
  
  switch (packageManager) {
    case 'pnpm':
      return `pnpm add ${options.dev ? '-D' : ''} ${exactFlag} ${packageList}`;
    case 'yarn':
      return `yarn add ${options.dev ? '--dev' : ''} ${exactFlag} ${packageList}`;
    default:
      return `npm install ${options.dev ? '--save-dev' : '--save'} ${exactFlag} ${packageList}`;
  }
}

function updateCin7Config(packages: string[]) {
  const configPath = 'cin7.config.js';
  if (!fs.existsSync(configPath)) return;

  console.log(chalk.dim('\nUpdating cin7.config.js...'));

  try {
    // Read current config
    const configContent = fs.readFileSync(configPath, 'utf-8');
    
    // Extract current layers
    const layersMatch = configContent.match(/layers:\s*\[(.*?)\]/s);
    if (layersMatch) {
      const currentLayers = layersMatch[1]
        .split(',')
        .map((layer) => layer.trim().replace(/['"]/g, ''))
        .filter(Boolean);

      // Add new layers
      const newLayers = new Set(currentLayers);
      packages.forEach((pkg) => {
        newLayers.add(pkg);
      });

      // Update config
      const updatedConfig = configContent.replace(
        /layers:\s*\[(.*?)\]/s,
        `layers: [${Array.from(newLayers)
          .map((layer) => `'${layer}'`)
          .join(', ')}]`
      );

      fs.writeFileSync(configPath, updatedConfig);
      console.log(chalk.dim('✓ Updated cin7.config.js'));
    }
  } catch (error) {
    console.warn(chalk.yellow('⚠️  Could not update cin7.config.js'));
  }
}

function showPostInstallInstructions(packages: string[]) {
  console.log(chalk.cyan('\n📚 Next steps:'));

  packages.forEach((pkg) => {
    switch (pkg) {
      case 'vanilla-js':
        console.log(chalk.gray('\nVanilla JS utilities:'));
        console.log(chalk.gray('  import { $, on, ready } from "@cin7/vanilla-js";'));
        console.log(chalk.gray('  ready(() => $("#app").textContent = "Hello!");'));
        break;

      case 'typescript-sdk':
        console.log(chalk.gray('\nTypeScript SDK:'));
        console.log(chalk.gray('  import { BaseRepository, UseCase } from "@cin7/typescript-sdk";'));
        console.log(chalk.gray('  class ProductRepository extends BaseRepository { ... }'));
        break;

      case 'polaris-adapter':
        console.log(chalk.gray('\nPolaris React components:'));
        console.log(chalk.gray('  import { PolarisProvider, Button } from "@cin7/polaris-adapter";'));
        console.log(chalk.gray('  <PolarisProvider><Button>Click me</Button></PolarisProvider>'));
        break;

      case 'extjs-adapters':
        console.log(chalk.gray('\nExtJS adapters:'));
        console.log(chalk.gray('  import { createEnterpriseGrid } from "@cin7/extjs-adapters";'));
        console.log(chalk.gray('  const grid = createEnterpriseGrid({ ... });'));
        break;

      case 'design-tokens':
        console.log(chalk.gray('\nDesign tokens:'));
        console.log(chalk.gray('  import "@cin7/design-tokens/css";'));
        console.log(chalk.gray('  // CSS variables are now available'));
        break;
    }
  });

  console.log(chalk.gray('\nSee documentation for more examples:'));
  console.log(chalk.blue('  https://cin7dsl.netlify.app/docs'));
}