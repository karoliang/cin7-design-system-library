#!/usr/bin/env node

/**
 * Cin7 DSL CLI
 * Command-line interface for scaffolding, analyzing, and migrating applications
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { createCommand } from './commands/create';
import { addCommand } from './commands/add';
import { analyzeCommand } from './commands/analyze';
import { migrateCommand } from './commands/migrate';
import { generateCommand } from './commands/generate';
import { devCommand } from './commands/dev';
import { buildCommand } from './commands/build';
import { getVersion } from './utils/version';

const program = new Command();

// ASCII art logo
const logo = chalk.cyan(`
╔═══════════════════════════════╗
║      Cin7 DSL Framework       ║
║   Multi-Layer Architecture    ║
╚═══════════════════════════════╝
`);

program
  .name('cin7')
  .description('CLI for Cin7 DSL framework')
  .version(getVersion())
  .addHelpText('before', logo);

// Register commands
program.addCommand(createCommand);
program.addCommand(addCommand);
program.addCommand(analyzeCommand);
program.addCommand(migrateCommand);
program.addCommand(generateCommand);
program.addCommand(devCommand);
program.addCommand(buildCommand);

// Error handling
program.exitOverride();

try {
  program.parse();
} catch (error: any) {
  if (error.code === 'commander.executeSubCommandAsync') {
    // Normal exit for async commands
  } else {
    console.error(chalk.red('\n✖ Error:'), error.message);
    process.exit(1);
  }
}

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}