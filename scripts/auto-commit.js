#!/usr/bin/env node

/**
 * Automatic Git Commit and Push Script
 *
 * This script automatically detects changes and commits them to GitHub
 * with meaningful commit messages based on the changes detected.
 *
 * Usage: node scripts/auto-commit.js
 *        pnpm auto-commit
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for better output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function execCommand(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: 'pipe',
      ...options
    });
    return result.trim();
  } catch (error) {
    log(`Error executing command: ${command}`, 'red');
    log(`Error: ${error.message}`, 'red');
    return null;
  }
}

function detectChanges() {
  log('🔍 Detecting changes...', 'cyan');

  // Check if there are any changes
  const status = execCommand('git status --porcelain');
  if (!status) {
    log('✅ No changes to commit', 'green');
    return null;
  }

  // Parse git status output
  const changedFiles = status.split('\n').filter(line => line.trim());
  const changes = {
    added: [],
    modified: [],
    deleted: [],
    renamed: [],
    untracked: []
  };

  changedFiles.forEach(line => {
    const statusCode = line.substring(0, 2);
    const filePath = line.substring(3);

    if (statusCode.startsWith('A') || statusCode.startsWith('??')) {
      (statusCode.startsWith('A') ? changes.added : changes.untracked).push(filePath);
    } else if (statusCode.startsWith('M')) {
      changes.modified.push(filePath);
    } else if (statusCode.startsWith('D')) {
      changes.deleted.push(filePath);
    } else if (statusCode.startsWith('R')) {
      changes.renamed.push(filePath);
    }
  });

  return changes;
}

function generateCommitMessage(changes) {
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  let message = '';
  let type = 'auto';
  let description = '';

  // Analyze changes to determine commit type and description
  const allFiles = [
    ...changes.added,
    ...changes.modified,
    ...changes.deleted,
    ...changes.untracked,
    ...changes.renamed
  ];

  // Check for specific patterns in changed files
  const storybookFiles = allFiles.filter(f => f.includes('storybook'));
  const packageFiles = allFiles.filter(f => f.includes('package.json') || f.includes('pnpm-lock.yaml'));
  const docsFiles = allFiles.filter(f => f.includes('docs') || f.includes('.md'));
  const componentFiles = allFiles.filter(f => f.includes('stories/') || f.includes('components/'));
  const configFiles = allFiles.filter(f => f.includes('config') || f.includes('.config.') || f.includes('vite.config.'));

  if (storybookFiles.length > 0 && componentFiles.length > 0) {
    type = 'storybook';
    description = `update Storybook components (${storybookFiles.length} files)`;
  } else if (packageFiles.length > 0) {
    type = 'deps';
    description = `update dependencies and configuration`;
  } else if (docsFiles.length > 0) {
    type = 'docs';
    description = `update documentation (${docsFiles.length} files)`;
  } else if (configFiles.length > 0) {
    type = 'config';
    description = `update project configuration`;
  } else if (changes.deleted.length > 0 && changes.deleted.length === allFiles.length) {
    type = 'remove';
    description = `remove files (${changes.deleted.length} files)`;
  } else if (changes.added.length > 0 && changes.added.length === allFiles.length) {
    type = 'add';
    description = `add new files (${changes.added.length} files)`;
  } else {
    type = 'update';
    description = `sync changes (${allFiles.length} files)`;
  }

  // Create commit message
  message = `${type}: ${description}`;

  // Add file details for larger changes
  if (allFiles.length > 5) {
    message += `\n\nChanged files:\n${allFiles.slice(0, 10).map(f => `  - ${f}`).join('\n')}`;
    if (allFiles.length > 10) {
      message += `\n  ... and ${allFiles.length - 10} more`;
    }
  }

  return {
    message,
    timestamp,
    changes: allFiles.length,
    breakdown: changes
  };
}

function createCommit(commitInfo) {
  log('📝 Staging changes...', 'yellow');

  // Stage all changes
  const addResult = execCommand('git add -A');
  if (addResult === null && execCommand('git status --porcelain')) {
    log('❌ Failed to stage changes', 'red');
    return false;
  }

  log('✅ Changes staged successfully', 'green');

  // Create commit with the generated message
  const fullMessage = `${commitInfo.message}\n\n🤖 Auto-commit at ${commitInfo.timestamp}\n📊 ${commitInfo.changes} files changed\n\nGenerated with [Claude Code](https://claude.com/claude-code)\n\nCo-Authored-By: Claude <noreply@anthropic.com>`;

  log('📦 Creating commit...', 'yellow');
  const commitResult = execCommand(`git commit -m "${fullMessage.replace(/"/g, '\\"')}"`);

  if (commitResult === null) {
    log('❌ Failed to create commit', 'red');
    return false;
  }

  log('✅ Commit created successfully', 'green');
  return true;
}

function pushToGitHub() {
  log('🚀 Pushing to GitHub...', 'yellow');

  // Get current branch
  const currentBranch = execCommand('git rev-parse --abbrev-ref HEAD') || 'main';

  // Push to remote
  const pushResult = execCommand(`git push origin ${currentBranch}`);

  if (pushResult === null) {
    log('❌ Failed to push to GitHub', 'red');
    return false;
  }

  log('✅ Pushed to GitHub successfully', 'green');
  return true;
}

function showSummary(commitInfo, success) {
  log('\n📋 Auto-Commit Summary:', 'cyan');
  log('========================', 'cyan');
  log(`📅 Timestamp: ${commitInfo.timestamp}`, 'blue');
  log(`📊 Files Changed: ${commitInfo.changes}`, 'blue');
  log(`📝 Commit Type: ${commitInfo.message.split(':')[0]}`, 'blue');

  if (commitInfo.breakdown) {
    const { breakdown } = commitInfo;
    if (breakdown.added.length > 0) log(`  ➕ Added: ${breakdown.added.length}`, 'green');
    if (breakdown.modified.length > 0) log(`  📝 Modified: ${breakdown.modified.length}`, 'yellow');
    if (breakdown.deleted.length > 0) log(`  ➖ Deleted: ${breakdown.deleted.length}`, 'red');
    if (breakdown.untracked.length > 0) log(`  ❓ Untracked: ${breakdown.untracked.length}`, 'blue');
    if (breakdown.renamed.length > 0) log(`  🔄 Renamed: ${breakdown.renamed.length}`, 'cyan');
  }

  log(`🎯 Status: ${success ? '✅ Success' : '❌ Failed'}`, success ? 'green' : 'red');
  log('========================', 'cyan');
}

function main() {
  log('🤖 Starting Automatic Git Commit and Push...', 'cyan');
  log('==========================================', 'cyan');

  try {
    // Check if we're in a git repository
    const gitRepo = execCommand('git rev-parse --git-dir');
    if (!gitRepo) {
      log('❌ Not in a git repository', 'red');
      process.exit(1);
    }

    // Check for remote connection
    const remoteUrl = execCommand('git config --get remote.origin.url');
    if (!remoteUrl) {
      log('⚠️ No remote origin configured - will only create local commit', 'yellow');
    }

    // Detect changes
    const changes = detectChanges();
    if (!changes) {
      log('🎉 No action needed - repository is up to date', 'green');
      return;
    }

    // Generate commit message
    const commitInfo = generateCommitMessage(changes);
    log(`📝 Generated commit: ${commitInfo.message}`, 'blue');

    // Create commit
    const commitSuccess = createCommit(commitInfo);
    if (!commitSuccess) {
      showSummary(commitInfo, false);
      process.exit(1);
    }

    // Push to GitHub if remote is available
    let pushSuccess = true;
    if (remoteUrl) {
      pushSuccess = pushToGitHub();
    } else {
      log('⏭️ Skipping push - no remote configured', 'yellow');
    }

    // Show summary
    showSummary(commitInfo, commitSuccess && pushSuccess);

    if (commitSuccess && pushSuccess) {
      log('🎉 Auto-commit completed successfully!', 'green');
    } else {
      log('⚠️ Auto-commit completed with issues', 'yellow');
      process.exit(1);
    }

  } catch (error) {
    log(`💥 Unexpected error: ${error.message}`, 'red');
    log(error.stack, 'red');
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main, detectChanges, generateCommitMessage };