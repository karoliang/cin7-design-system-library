#!/usr/bin/env node

/**
 * ==================================================
 * GIT HOOKS SETUP SCRIPT
 * ==================================================
 *
 * This script installs and configures Git hooks to prevent cache files
 * from being committed to the repository.
 *
 * Usage: node scripts/setup-hooks.js
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
  log(`🔧 ${title}`, colors.cyan);
  log(`${'='.repeat(60)}\n`, colors.cyan);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

/**
 * Check if we're in a Git repository
 */
function checkGitRepository() {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    return true;
  } catch (error) {
    logError('Not a Git repository. Please run this script from within a Git repository.');
    return false;
  }
}

/**
 * Get the Git hooks directory
 */
function getHooksDirectory() {
  try {
    const gitDir = execSync('git rev-parse --git-dir', { encoding: 'utf8' }).trim();
    return path.join(process.cwd(), gitDir, 'hooks');
  } catch (error) {
    logError('Could not determine Git hooks directory.');
    process.exit(1);
  }
}

/**
 * Create hooks directory if it doesn't exist
 */
function ensureHooksDirectory(hooksDir) {
  if (!fs.existsSync(hooksDir)) {
    fs.mkdirSync(hooksDir, { recursive: true });
    logInfo(`Created hooks directory: ${hooksDir}`);
  }
}

/**
 * Install pre-commit hook
 */
function installPreCommitHook(hooksDir) {
  const preCommitSource = path.join(__dirname, '../.git/hooks/pre-commit');
  const preCommitTarget = path.join(hooksDir, 'pre-commit');

  try {
    // Copy the pre-commit hook if it exists in .git/hooks
    if (fs.existsSync(preCommitSource)) {
      fs.copyFileSync(preCommitSource, preCommitTarget);

      // Make it executable
      fs.chmodSync(preCommitTarget, '755');

      logSuccess('Pre-commit hook installed successfully');
      return true;
    } else {
      logWarning('Pre-commit hook source file not found');
      return false;
    }
  } catch (error) {
    logError(`Failed to install pre-commit hook: ${error.message}`);
    return false;
  }
}

/**
 * Create pre-commit hook if it doesn't exist
 */
function createPreCommitHook(hooksDir) {
  const preCommitTarget = path.join(hooksDir, 'pre-commit');

  const hookContent = `#!/bin/bash

# ==================================================
# PRE-COMMIT HOOK: CACHE PREVENTION SYSTEM
# ==================================================
#
# This pre-commit hook prevents cache files from being committed to Git.
# It checks staged files and blocks commits if cache files are detected.
#

# ANSI color codes for better output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
CYAN='\\033[0;36m'
NC='\\033[0m' # No Color

echo -e "\${CYAN}🔍 Pre-commit cache prevention check running...\${NC}"

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only)

if [ -z "$STAGED_FILES" ]; then
    echo -e "\${GREEN}✅ No files staged for commit\${NC}"
    exit 0
fi

# Cache file patterns to block
CACHE_PATTERNS=(
    ".cache/" ".temp/" ".tmp/" "*.cache" "*.cache.*" "*.tmp" "*.temp"
    ".cache-*" ".temp-*" ".tmp-*" ".vite/" ".webpack/" ".rollup.cache/"
    ".parcel-cache/" ".turbo/" ".node_modules/" ".npm/" ".yarn/"
    ".pnpm-cache/" ".pnpm-store/" "node_modules/" "*.tsbuildinfo"
    ".rts2_cache_cjs/" ".rts2_cache_esm/" ".rts2_cache_umd/" ".eslintcache"
    ".prettiercache" ".stylelintcache" ".jest/" ".c8/" ".nyc/" "coverage/"
    ".nyc_output/" "test-results/" "playwright-report/" "dist/" "build/"
    "out/" ".out/" "storybook-static/" ".storybook-static/" ".next/"
    ".DS_Store" "Thumbs.db" "*.log" "*.pid" "*.bak" "*.backup" "*.old"
)

# Check for cache files
CACHE_FILES_FOUND=false
for file in $STAGED_FILES; do
    for pattern in "\${CACHE_PATTERNS[@]}"; do
        if [[ "$file" == *$pattern* ]]; then
            echo -e "\${RED}🚫 COMMIT BLOCKED: Cache file detected: $file\${NC}"
            echo -e "\${YELLOW}Please remove cache files from staging and try again.\${NC}"
            echo -e "\${BLUE}Use: git restore --cached $file\${NC}"
            CACHE_FILES_FOUND=true
            break 2
        fi
    done
done

if [ "$CACHE_FILES_FOUND" = true ]; then
    exit 1
fi

echo -e "\${GREEN}✅ No cache files detected. Commit allowed.\${NC}"
exit 0
`;

  try {
    fs.writeFileSync(preCommitTarget, hookContent);
    fs.chmodSync(preCommitTarget, '755');
    logSuccess('Pre-commit hook created successfully');
    return true;
  } catch (error) {
    logError(`Failed to create pre-commit hook: ${error.message}`);
    return false;
  }
}

/**
 * Test if the hook is working
 */
function testPreCommitHook() {
  try {
    // Test the hook by running it directly
    execSync('./.git/hooks/pre-commit', { stdio: 'pipe' });
    logSuccess('Pre-commit hook test passed');
    return true;
  } catch (error) {
    logError('Pre-commit hook test failed');
    return false;
  }
}

/**
 * Display hook information
 */
function displayHookInfo(hooksDir) {
  logSection('Hook Information');

  logInfo('The following Git hooks have been configured:');
  log('\n  🔍 pre-commit', colors.yellow);
  log('     Prevents cache files from being committed\n');

  logInfo('Hook behaviors:');
  log('  • Blocks commits containing cache files', colors.white);
  log('  • Provides clear error messages', colors.white);
  log('  • Suggests fixes for blocked commits', colors.white);
  log('  • Can be bypassed with --no-verify (emergency only)', colors.white);

  logInfo('\nCache prevention patterns include:');
  const patterns = [
    'node_modules/', '.cache/', '.temp/', '.tmp/', 'dist/', 'build/',
    '.vite/', '.webpack/', '*.cache', '*.tsbuildinfo', '.eslintcache',
    '*.log', '*.pid', '*.DS_Store', 'Thumbs.db'
  ];

  patterns.forEach(pattern => {
    log(`  • ${pattern}`, colors.cyan);
  });
}

/**
 * Main setup function
 */
function main() {
  log('🔧 Git Hooks Setup Script', colors.magenta);
  log('Configuring cache prevention hooks for Cin7 DSL\n', colors.cyan);

  // Check if we're in a Git repository
  if (!checkGitRepository()) {
    process.exit(1);
  }

  // Get hooks directory
  const hooksDir = getHooksDirectory();
  logInfo(`Git hooks directory: ${hooksDir}`);

  // Ensure hooks directory exists
  ensureHooksDirectory(hooksDir);

  logSection('Installing Pre-commit Hook');

  // Try to install existing pre-commit hook
  let hookInstalled = installPreCommitHook(hooksDir);

  // If that fails, create a new one
  if (!hookInstalled) {
    logInfo('Creating new pre-commit hook...');
    hookInstalled = createPreCommitHook(hooksDir);
  }

  if (!hookInstalled) {
    logError('Failed to set up pre-commit hook');
    process.exit(1);
  }

  // Test the hook
  logSection('Testing Pre-commit Hook');
  if (!testPreCommitHook()) {
    logWarning('Hook test failed, but installation may still be successful');
  }

  // Display information
  displayHookInfo(hooksDir);

  logSection('Setup Complete');
  logSuccess('Git hooks have been successfully configured!');
  logInfo('The pre-commit hook will now prevent cache files from being committed.');
  log('\nNext steps:');
  log('  1. Try to stage a cache file to test the hook:', colors.blue);
  log('     echo "test" > .cache/test', colors.magenta);
  log('     git add .cache/test', colors.magenta);
  log('     git commit -m "Test cache prevention"', colors.magenta);
  log('     git restore --cached .cache/test', colors.magenta);
  log('     rm -rf .cache', colors.magenta);
  log('\n  2. Commit your changes normally:', colors.blue);
  log('     git add .', colors.magenta);
  log('     git commit -m "Your changes"', colors.magenta);
}

// Run the setup
if (require.main === module) {
  main();
}

module.exports = {
  checkGitRepository,
  getHooksDirectory,
  installPreCommitHook,
  createPreCommitHook,
  testPreCommitHook
};