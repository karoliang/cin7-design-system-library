#!/usr/bin/env node

/**
 * Manual Console Error Testing Script
 *
 * This script provides a systematic approach to manually test all component variations
 * and capture console errors without Puppeteer dependencies.
 */

const fs = require('fs');
const path = require('path');

// Configuration
const OUTPUT_DIR = path.join(__dirname, 'test-results');
const LOGS_DIR = path.join(OUTPUT_DIR, 'logs');

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

// Ensure output directories exist
function ensureDirectories() {
  [OUTPUT_DIR, LOGS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate URL for component variation
function generateUrl(component, variation) {
  return `http://localhost:6006/iframe.html?id=examples-${component}--${variation}&args=&viewMode=story`;
}

// Generate testing instructions
function generateTestingInstructions() {
  console.log('🎯 CONSOLE ERROR TESTING INSTRUCTIONS\n');
  console.log('='.repeat(80));

  console.log('\n📋 STEP 1: Open Browser Developer Tools');
  console.log('   1. Open Chrome/Firefox');
  console.log('   2. Open Developer Tools (F12 or Cmd+Option+I)');
  console.log('   3. Go to Console tab');
  console.log('   4. Clear console (Ctrl+L or Cmd+K)');
  console.log('   5. Preserve log: Make sure "Preserve log" is checked');

  console.log('\n📋 STEP 2: Test Each Component Variation');
  console.log('   Open each URL below in a NEW TAB and capture ALL console output:');
  console.log('   - console.error messages');
  console.log('   - console.warning messages');
  console.log('   - Network request failures');
  console.log('   - React rendering errors');
  console.log('   - Stack traces');

  console.log('\n📋 STEP 3: Wait for Async Errors');
  console.log('   Wait at least 5 seconds on each page to catch all async errors');

  console.log('\n📋 STEP 4: Document Results');
  console.log('   Copy all console output for each component to a separate text file');

  console.log('\n' + '='.repeat(80));
  console.log('COMPONENT URLs TO TEST');
  console.log('='.repeat(80));

  // Generate URLs for all components
  const allUrls = [];

  console.log('\n📦 FRAME COMPONENTS:');
  COMPONENTS.frame.forEach(variation => {
    const url = generateUrl('frame', variation);
    console.log(`\n${variation.toUpperCase()}:`);
    console.log(`   ${url}`);
    allUrls.push({ component: 'frame', variation, url });
  });

  console.log('\n📦 BREADCRUMBS COMPONENTS:');
  COMPONENTS.breadcrumbs.forEach(variation => {
    const url = generateUrl('breadcrumbs', variation);
    console.log(`\n${variation.toUpperCase()}:`);
    console.log(`   ${url}`);
    allUrls.push({ component: 'breadcrumbs', variation, url });
  });

  console.log('\n' + '='.repeat(80));
  console.log('EXPECTED ERRORS TO CAPTURE');
  console.log('='.repeat(80));

  console.log('\n🔍 Look for these specific error patterns:');
  console.log('   • "SyntaxError: The requested module ... does not provide an export named \'default\'"');
  console.log('   • "No theme was provided" errors');
  console.log('   • "Cannot destructure property" errors');
  console.log('   • "React Error #31" messages');
  console.log('   • "require is not defined" errors');
  console.log('   • PropTypes import/export errors');
  console.log('   • Component rendering failures');
  console.log('   • Theme provider errors');

  console.log('\n' + '='.repeat(80));
  console.log('FILE NAMING CONVENTION');
  console.log('='.repeat(80));

  console.log('\n📁 Save console output as:');
  allUrls.forEach(({ component, variation }) => {
    const filename = `${component}-${variation}-console-output.txt`;
    console.log(`   ${filename}`);
  });

  console.log('\n' + '='.repeat(80));
  console.log('SAMPLE COMMAND FOR AUTOMATED TESTING');
  console.log('='.repeat(80));

  console.log('\n💡 For automated testing, you can use:');
  console.log('   npm install -g puppeteer');
  console.log('   node test-console-errors.js');

  return allUrls;
}

// Generate template files for manual testing
function generateTemplateFiles(urls) {
  console.log('\n📝 Generating template files...');

  urls.forEach(({ component, variation, url }) => {
    const filename = `${component}-${variation}-console-output.txt`;
    const filepath = path.join(LOGS_DIR, filename);

    const template = `# Console Output for ${component}-${variation}
# URL: ${url}
# Date: ${new Date().toISOString()}
# Instructions: Replace this content with actual console output from browser

=== EXPECTED ERRORS TO LOOK FOR ===
• "SyntaxError: The requested module ... does not provide an export named 'default'"
• "No theme was provided" errors
• "Cannot destructure property" errors
• "React Error #31" messages
• "require is not defined" errors
• PropTypes import/export errors
• Component rendering failures
• Theme provider errors

=== CONSOLE OUTPUT ===
[Paste browser console output here]

=== SCREENSHOT ===
[Take a screenshot and note the file name here]

=== OBSERVATIONS ===
[Add any additional observations here]

=== ERROR ANALYSIS ===
[Analyze the captured errors here]
`;

    fs.writeFileSync(filepath, template);
    console.log(`   ✅ Created template: ${filepath}`);
  });
}

// Generate a comprehensive testing report template
function generateReportTemplate() {
  const reportPath = path.join(OUTPUT_DIR, 'manual-testing-report-template.md');

  const template = `# Console Error Testing Report

## Test Information
- **Date**: ${new Date().toLocaleDateString()}
- **Tester**: [Your Name]
- **Browser**: [Chrome/Firefox Version]
- **Storybook URL**: http://localhost:6006

## Test Summary
- **Total Components Tested**: [Number]
- **Components With Errors**: [Number]
- **Components With Warnings**: [Number]
- **Critical Errors Found**: [Number]

## Component Results

### Frame Components

#### Default
- **Status**: [Pass/Fail/Partial]
- **Console Errors**: [List errors]
- **Console Warnings**: [List warnings]
- **Screenshot**: [filename]
- **Notes**: [Additional observations]

#### With Logo
- **Status**: [Pass/Fail/Partial]
- **Console Errors**: [List errors]
- **Console Warnings**: [List warnings]
- **Screenshot**: [filename]
- **Notes**: [Additional observations]

[Continue for all frame variations...]

### Breadcrumbs Components

#### Default
- **Status**: [Pass/Fail/Partial]
- **Console Errors**: [List errors]
- **Console Warnings**: [List warnings]
- **Screenshot**: [filename]
- **Notes**: [Additional observations]

[Continue for all breadcrumb variations...]

## Error Analysis

### Critical Errors
1. **Error Type**: [Name]
   - **Affected Components**: [List]
   - **Description**: [Description]
   - **Recommended Fix**: [Fix suggestion]

### Common Patterns
- [Identify recurring error patterns]

### Theme Provider Issues
- [Document any theme-related errors]

### Module Import/Export Issues
- [Document any module-related errors]

## Recommendations

### High Priority Fixes
1. [Fix 1]
2. [Fix 2]
3. [Fix 3]

### Medium Priority Improvements
1. [Improvement 1]
2. [Improvement 2]

### Low Priority Cleanup
1. [Cleanup 1]

## Next Steps
- [ ] Fix critical errors
- [ ] Test fixes
- [ ] Update documentation
- [ ] Implement automated testing

## Screenshots
[List all screenshot files here]

## Additional Notes
[Any additional testing notes]
`;

  fs.writeFileSync(reportPath, template);
  console.log(`   ✅ Created report template: ${reportPath}`);
}

// Main execution
function runManualTestingSetup() {
  console.log('🎯 Setting up Manual Console Error Testing\n');

  ensureDirectories();

  const urls = generateTestingInstructions();
  generateTemplateFiles(urls);
  generateReportTemplate();

  console.log('\n' + '='.repeat(80));
  console.log('SETUP COMPLETE');
  console.log('='.repeat(80));
  console.log(`✅ Template files created in: ${LOGS_DIR}`);
  console.log(`✅ Report template created in: ${OUTPUT_DIR}`);
  console.log('\n🚀 Ready to start manual testing!');
  console.log('Follow the instructions above to test all component variations.');
}

// Run if called directly
if (require.main === module) {
  runManualTestingSetup();
}

module.exports = { runManualTestingSetup, generateTestingInstructions };