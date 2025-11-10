#!/usr/bin/env node

/**
 * Start Console Error Testing
 *
 * This script opens the console error testing page in your default browser
 * and provides a summary of what needs to be tested.
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, 'test-results');
const TEST_PAGE = path.join(OUTPUT_DIR, 'console-error-test-page.html');

// Component variations to test
const COMPONENTS = {
  frame: [
    'default',
    'with-logo',
    'with-notifications',
    'ecommerce-layout',
    'minimal-layout',
    'responsive-behavior'
  ],
  breadcrumbs: [
    'default',
    'short-path',
    'long-path',
    'product-navigation',
    'ecommerce-navigation',
    'admin-panel',
    'documentation-site',
    'many-items'
  ]
};

// Open the test page
function openTestPage() {
  const platform = process.platform;
  const fileUrl = `file://${TEST_PAGE}`;

  console.log('🎯 Starting Console Error Testing\n');
  console.log('='.repeat(60));

  // Check if test page exists
  if (!fs.existsSync(TEST_PAGE)) {
    console.error('❌ Test page not found:', TEST_PAGE);
    console.error('Please run: node simple-console-test.js first');
    process.exit(1);
  }

  console.log(`📂 Test page: ${TEST_PAGE}`);
  console.log(`🌐 Opening: ${fileUrl}`);

  // Open based on platform
  let command;
  switch (platform) {
    case 'darwin':
      command = `open "${fileUrl}"`;
      break;
    case 'win32':
      command = `start "" "${fileUrl}"`;
      break;
    default:
      command = `xdg-open "${fileUrl}"`;
      break;
  }

  exec(command, (error) => {
    if (error) {
      console.error('❌ Failed to open browser:', error.message);
      console.log('\n🔗 Please open manually:', fileUrl);
    } else {
      console.log('✅ Test page opened in your default browser');
    }
  });
}

// Print testing checklist
function printChecklist() {
  console.log('\n' + '='.repeat(60));
  console.log('📋 TESTING CHECKLIST');
  console.log('='.repeat(60));

  console.log('\n🔧 Setup:');
  console.log('   ✅ Open Developer Tools (F12 or Cmd+Option+I)');
  console.log('   ✅ Go to Console tab');
  console.log('   ✅ Clear console (Ctrl+L or Cmd+K)');
  console.log('   ✅ Enable "Preserve log"');

  console.log('\n📦 Components to Test:');

  console.log('\n   Frame Components (6):');
  COMPONENTS.frame.forEach(variation => {
    console.log(`     • frame-${variation}`);
  });

  console.log('\n   Breadcrumbs Components (8):');
  COMPONENTS.breadcrumbs.forEach(variation => {
    console.log(`     • breadcrumbs-${variation}`);
  });

  console.log('\n🎯 Expected Errors to Capture:');
  console.log('   • "SyntaxError: The requested module ... does not provide an export named \'default\'"');
  console.log('   • "No theme was provided" errors');
  console.log('   • "Cannot destructure property" errors');
  console.log('   • "React Error #31" messages');
  console.log('   • "require is not defined" errors');
  console.log('   • PropTypes import/export errors');
  console.log('   • Component rendering failures');
  console.log('   • Theme provider errors');

  console.log('\n📁 Output Files:');
  const totalComponents = COMPONENTS.frame.length + COMPONENTS.breadcrumbs.length;
  console.log(`   • ${totalComponents} template files in: ${path.join(OUTPUT_DIR, 'logs')}`);
  console.log('   • Report template: manual-testing-report-template.md');
  console.log('   • Summary: CONSOLE_ERROR_TESTING_SUMMARY.md');

  console.log('\n⏱️  Time Estimate:');
  console.log('   • 5 minutes per component (waiting for async errors)');
  console.log('   • 14 components × 5 minutes = ~70 minutes');
  console.log('   • Plus documentation time: ~30 minutes');
  console.log('   • Total estimated time: ~2 hours');

  console.log('\n' + '='.repeat(60));
  console.log('🚀 Ready to start testing!');
  console.log('='.repeat(60));
}

// Main execution
function main() {
  openTestPage();
  printChecklist();

  console.log('\n📝 After testing is complete:');
  console.log('   1. Update the manual-testing-report-template.md');
  console.log('   2. Review the CONSOLE_ERROR_TESTING_SUMMARY.md');
  console.log('   3. Create GitHub issues for critical errors found');
  console.log('   4. Implement fixes based on findings');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { openTestPage, printChecklist };