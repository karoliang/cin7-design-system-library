#!/usr/bin/env node

/**
 * ==================================================
 * COMPREHENSIVE CACHE CLEANING SCRIPT
 * ==================================================
 *
 * This script provides comprehensive cache cleaning for the Cin7 DSL project.
 * It can clean various types of caches, build artifacts, and temporary files.
 *
 * Usage:
 *   node scripts/clean-caches.js [mode]
 *
 * Modes:
 *   - git:        Clean caches before Git operations (default)
 *   - deployment: Clean caches before deployment
 *   - all:        Clean all possible caches
 *   - dry-run:    Show what would be deleted without actually deleting
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = colors.white) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, colors.cyan);
  log(`🧹 ${title}`, colors.cyan);
  log(`${'='.repeat(60)}\n`, colors.cyan);
}

// Comprehensive cache patterns
const CACHE_PATTERNS = {
  // General cache directories
  general: [
    '.cache', '.temp', '.tmp', '.temp-*', '.cache-*',
    '.cache-db', '.cache-loader'
  ],

  // Build tool caches
  buildTools: [
    '.vite', '.webpack', '.rollup.cache', '.parcel-cache',
    '.turbo', '.fuse-box'
  ],

  // Package manager caches
  packageManagers: [
    'node_modules', '.npm', '.yarn', '.pnpm-cache', '.pnpm-store',
    '.pnpm', '.yarn-integrity', '.yarn-metadata', 'package-lock.json',
    'yarn.lock', 'pnpm-lock.yaml', '.npmrc'
  ],

  // TypeScript and compilation caches
  typescript: [
    '*.tsbuildinfo', '*.tsbuildinfo.*',
    '.rts2_cache_cjs', '.rts2_cache_esm', '.rts2_cache_umd'
  ],

  // Linter and formatter caches
  linting: [
    '.eslintcache', '.prettiercache', '.stylelintcache'
  ],

  // Testing caches
  testing: [
    '.jest', '.nyc', '.coverage', 'coverage', '.nyc_output',
    'test-results', 'playwright-report'
  ],

  // Build outputs and artifacts
  buildOutputs: [
    'dist', 'build', 'out', '.out', 'storybook-static', '.storybook-static',
    'storybook.out', 'storybook-build', '.next'
  ],

  // Storybook specific
  storybook: [
    'storybook-static', '.storybook-static', 'storybook.out',
    'storybook-build', 'node_modules/.storybook', '.cache/storybook',
    '.temp/storybook'
  ],

  // Polaris specific
  polaris: [
    'polaris/polaris-react/.out', 'polaris/polaris-react/dist',
    'polaris/polaris-icons/dist', 'polaris/polaris-tokens/dist',
    'polaris/polaris.shopify.com/.next', 'polaris/polaris.shopify.com/out',
    'polaris/polaris.shopify.com/public/storybook'
  ],

  // Development server files
  devServer: [
    '.hmr-update', '.hot-update.*', '.dev-server', 'webpack-dev-server'
  ],

  // Documentation builds
  documentation: [
    'docs/.vitepress/dist', 'docs/.docusaurus'
  ],

  // IDE and editor files
  ide: [
    '.vscode', '.idea', '*.swp', '*.swo', '*~', '.emacs*', '.projectile',
    '.vim/', 'tags'
  ],

  // OS and system files
  system: [
    '.DS_Store', 'Thumbs.db', 'desktop.ini', '$RECYCLE.BIN', '.Trashes'
  ],

  // Logs and temporary files
  logs: [
    '*.log', '*.log.*', 'logs/', '.pnpm-debug.log*', 'npm-debug.log*',
    'yarn-debug.log*', 'lerna-debug.log*', '*storybook.log'
  ],

  // Runtime files
  runtime: [
    '*.pid', '*.seed', '*.pid.lock'
  ],

  // Backup files
  backups: [
    '*.bak', '*.backup', '*.old', '*.orig', '*.rej', '.~*', '*~'
  ],

  // Database files
  database: [
    '*.sqlite', '*.sqlite3', '*.db'
  ],

  // Large files and archives
  largeFiles: [
    '*.zip', '*.tar.gz', '*.tgz', '*.7z', '*.rar', '*.tar', '*.gz', '*.bz2', '*.xz'
  ]
};

// Mode-specific cache selections
const MODE_CONFIGS = {
  git: [
    ...CACHE_PATTERNS.general,
    ...CACHE_PATTERNS.buildTools,
    ...CACHE_PATTERNS.packageManagers,
    ...CACHE_PATTERNS.typescript,
    ...CACHE_PATTERNS.linting,
    ...CACHE_PATTERNS.buildOutputs,
    ...CACHE_PATTERNS.storybook,
    ...CACHE_PATTERNS.polaris,
    ...CACHE_PATTERNS.documentation
  ],

  deployment: [
    ...CACHE_PATTERNS.general,
    ...CACHE_PATTERNS.buildTools,
    ...CACHE_PATTERNS.buildOutputs,
    ...CACHE_PATTERNS.storybook,
    ...CACHE_PATTERNS.polaris,
    ...CACHE_PATTERNS.documentation
  ],

  all: Object.values(CACHE_PATTERNS).flat()
};

/**
 * Get patterns based on the specified mode
 */
function getPatterns(mode = 'git') {
  const patterns = MODE_CONFIGS[mode] || MODE_CONFIGS.git;
  return [...new Set(patterns)]; // Remove duplicates
}

/**
 * Check if a path exists
 */
function pathExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a path is a directory
 */
function isDirectory(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Find files/directories matching patterns
 */
function findMatchingPatterns(patterns, baseDir = process.cwd()) {
  const matches = [];

  for (const pattern of patterns) {
    try {
      // Handle glob patterns
      const cmd = process.platform === 'win32' ? 'dir' : 'find';

      if (pattern.includes('*')) {
        // Use find for glob patterns
        const findCmd = `find "${baseDir}" -name "${pattern}" 2>/dev/null || true`;
        try {
          const result = execSync(findCmd, { encoding: 'utf8' });
          if (result.trim()) {
            matches.push(...result.trim().split('\n').filter(Boolean));
          }
        } catch (e) {
          // Silently ignore find command errors
        }
      } else {
        // Direct path check
        const fullPath = path.join(baseDir, pattern);
        if (pathExists(fullPath)) {
          matches.push(fullPath);
        }
      }
    } catch (error) {
      // Silently ignore pattern matching errors
    }
  }

  return [...new Set(matches)]; // Remove duplicates
}

/**
 * Delete a file or directory
 */
function deletePath(filePath, isDir = false) {
  try {
    if (isDir) {
      fs.rmSync(filePath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(filePath);
    }
    return true;
  } catch (error) {
    log(`  ⚠️  Could not delete ${filePath}: ${error.message}`, colors.yellow);
    return false;
  }
}

/**
 * Clean caches for a specific mode
 */
function cleanCaches(mode = 'git', dryRun = false) {
  const patterns = getPatterns(mode);
  const matches = findMatchingPatterns(patterns);

  if (matches.length === 0) {
    log('✨ No cache files found to clean!', colors.green);
    return { deleted: 0, errors: 0 };
  }

  log(`Found ${matches.length} cache files/directories to clean:`, colors.yellow);

  let deleted = 0;
  let errors = 0;

  for (const match of matches) {
    const isDir = isDirectory(match);
    const fileType = isDir ? 'directory' : 'file';

    if (dryRun) {
      log(`  📄 Would delete ${fileType}: ${match}`, colors.blue);
      deleted++;
    } else {
      const success = deletePath(match, isDir);
      if (success) {
        log(`  🗑️  Deleted ${fileType}: ${path.relative(process.cwd(), match)}`, colors.green);
        deleted++;
      } else {
        errors++;
      }
    }
  }

  return { deleted, errors };
}

/**
 * Clean pnpm store
 */
function cleanPnpmStore(dryRun = false) {
  logSection('Cleaning pnpm Store');

  if (dryRun) {
    log('📄 Would run: pnpm store prune', colors.blue);
    return true;
  }

  try {
    execSync('pnpm store prune', { stdio: 'inherit' });
    log('✅ pnpm store cleaned successfully', colors.green);
    return true;
  } catch (error) {
    log(`⚠️  Could not clean pnpm store: ${error.message}`, colors.yellow);
    return false;
  }
}

/**
 * Clean Git cache
 */
function cleanGitCache(dryRun = false) {
  logSection('Cleaning Git Cache');

  if (dryRun) {
    log('📄 Would run: git clean -fdX', colors.blue);
    log('📄 Would run: git gc --prune=now', colors.blue);
    return true;
  }

  try {
    execSync('git clean -fdX', { stdio: 'inherit' });
    log('✅ Git cache cleaned successfully', colors.green);

    try {
      execSync('git gc --prune=now', { stdio: 'inherit' });
      log('✅ Git garbage collection completed', colors.green);
    } catch (gcError) {
      log(`⚠️  Git garbage collection failed: ${gcError.message}`, colors.yellow);
    }

    return true;
  } catch (error) {
    log(`⚠️  Could not clean Git cache: ${error.message}`, colors.yellow);
    return false;
  }
}

/**
 * Show summary
 */
function showSummary(deleted, errors, pnpmSuccess, gitSuccess, dryRun = false) {
  logSection(dryRun ? 'DRY RUN SUMMARY' : 'CLEANING SUMMARY');

  if (dryRun) {
    log(`📊 Files that would be deleted: ${deleted}`, colors.blue);
  } else {
    log(`🗑️  Files deleted: ${deleted}`, colors.green);
  }

  if (errors > 0) {
    log(`⚠️  Errors encountered: ${errors}`, colors.yellow);
  }

  log(`📦 pnpm store: ${pnpmSuccess ? '✅ Success' : '❌ Failed'}`, pnpmSuccess ? colors.green : colors.red);
  log(`🔧 Git cache: ${gitSuccess ? '✅ Success' : '❌ Failed'}`, gitSuccess ? colors.green : colors.red);

  if (dryRun) {
    log('\n💡 Run without --dry-run to actually delete these files', colors.cyan);
  } else {
    log('\n🎉 Cache cleaning completed!', colors.green);
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'git';
  const isDryRun = args.includes('--dry-run') || mode === 'dry-run';
  const actualMode = isDryRun ? (mode === 'dry-run' ? 'git' : mode) : mode;

  log('🧹 Cin7 DSL Cache Cleaner', colors.magenta);
  log(`Mode: ${isDryRun ? 'DRY RUN' : actualMode.toUpperCase()}`, colors.cyan);

  // Validate mode
  if (!['git', 'deployment', 'all', 'dry-run'].includes(mode)) {
    log(`❌ Invalid mode: ${mode}`, colors.red);
    log('Valid modes: git, deployment, all, dry-run', colors.yellow);
    process.exit(1);
  }

  // Clean caches
  const { deleted, errors } = cleanCaches(actualMode, isDryRun);

  // Clean pnpm store
  const pnpmSuccess = cleanPnpmStore(isDryRun);

  // Clean Git cache
  const gitSuccess = cleanGitCache(isDryRun);

  // Show summary
  showSummary(deleted, errors, pnpmSuccess, gitSuccess, isDryRun);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  cleanCaches,
  cleanPnpmStore,
  cleanGitCache,
  CACHE_PATTERNS,
  MODE_CONFIGS
};