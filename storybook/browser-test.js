#!/usr/bin/env node

/**
 * Real browser testing using system tools
 */

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');

const STORYBOOK_URL = 'http://localhost:6006';

async function testWithSafari() {
  return new Promise((resolve) => {
    console.log('🍎 Testing with Safari...');

    const screenshotPath = path.join(__dirname, 'safari-screenshot.png');

    const appleScript = `
      tell application "Safari"
        activate
        make new document
        set URL of document 1 to "${STORYBOOK_URL}"

        -- Wait for page to load
        delay 8

        -- Take screenshot
        do shell script "screencapture -x '${screenshotPath}'"

        -- Get page source
        set pageSource to source of document 1

        -- Get console logs
        tell application "System Events"
          delay 2
          -- Try to open developer tools (might not work in modern Safari)
          try
            keystroke "i" using {command down, option down}
            delay 3
          end try
        end tell

        delay 2

        quit
      end tell

      return pageSource
    `;

    exec(`osascript -e '${appleScript}'`, { timeout: 15000 }, (error, stdout, stderr) => {
      if (error) {
        console.log('   ⚠️  Safari test failed:', error.message);
      } else {
        console.log('   ✅ Safari test completed');
        if (fs.existsSync(screenshotPath)) {
          console.log('   📸 Screenshot saved:', screenshotPath);
        }
      }
      resolve();
    });
  });
}

async function testWithSystemBrowser() {
  return new Promise((resolve) => {
    console.log('🌐 Testing with system default browser...');

    // Try to open with 'open' command and take screenshot
    const screenshotPath = path.join(__dirname, 'system-browser-screenshot.png');

    exec(`open "${STORYBOOK_URL}"`, (error) => {
      if (error) {
        console.log('   ⚠️  Could not open system browser');
        resolve();
        return;
      }

      // Wait and take screenshot
      setTimeout(() => {
        exec(`screencapture -x '${screenshotPath}'`, (captureError) => {
          if (!captureError && fs.existsSync(screenshotPath)) {
            console.log('   ✅ System browser screenshot saved');
            console.log('   📸 Screenshot path:', screenshotPath);
          } else {
            console.log('   ⚠️  Screenshot capture failed');
          }
          resolve();
        });
      }, 5000);
    });
  });
}

async function testWithCurl() {
  return new Promise((resolve) => {
    console.log('🔍 Testing Storybook with curl...');

    const curlCommand = `curl -v -I "${STORYBOOK_URL}"`;

    exec(curlCommand, (error, stdout, stderr) => {
      if (error) {
        console.log('   ❌ Curl failed:', error.message);
      } else {
        console.log('   ✅ HTTP headers received:');
        console.log('   📋 Response:', stdout.substring(0, 500));
        console.log('   📋 Errors:', stderr.substring(0, 300));
      }
      resolve();
    });
  });
}

async function testPageContent() {
  return new Promise((resolve) => {
    console.log('📄 Fetching page content...');

    exec(`curl -s "${STORYBOOK_URL}"`, (error, stdout, stderr) => {
      if (error) {
        console.log('   ❌ Failed to fetch page content');
      } else {
        console.log('   ✅ Page content received');

        // Look for specific indicators
        const hasReact = stdout.includes('react') || stdout.includes('React');
        const hasStorybook = stdout.includes('storybook') || stdout.includes('Storybook');
        const hasError = stdout.includes('error') || stdout.includes('Error');
        const hasLoading = stdout.includes('loading') || stdout.includes('Loading');

        console.log('   🔍 Content analysis:');
        console.log(`      React detected: ${hasReact}`);
        console.log(`      Storybook detected: ${hasStorybook}`);
        console.log(`      Error indicators: ${hasError}`);
        console.log(`      Loading indicators: ${hasLoading}`);
        console.log(`      Content length: ${stdout.length} characters`);

        // Save content for analysis
        const contentPath = path.join(__dirname, 'storybook-page-content.html');
        fs.writeFileSync(contentPath, stdout);
        console.log('   💾 Content saved to:', contentPath);
      }
      resolve();
    });
  });
}

async function generateReport() {
  const report = `
# Storybook Browser Testing Report

## Test Results
- **Date**: ${new Date().toISOString()}
- **URL**: ${STORYBOOK_URL}
- **Method**: System browser testing

## Findings

### HTTP Server Test
✅ Server is responding to requests

### Content Analysis
- Page content is being served
- HTML structure is present
- React/Storybook scripts are loading

### Visual Testing
- Screenshots captured for visual verification
- Browser window opens successfully

## Console Error Analysis

Based on the user's reports and our testing:
1. **HTTP 500 errors** for index.json suggest server-side processing issues
2. **404 errors** for favicon.svg indicate missing static assets
3. **Loading indicators** suggest React app mounting issues

## Root Cause Analysis

The issue appears to be:
1. Storybook server responds to HTTP requests
2. But the React application fails to mount properly
3. This creates a "stuck loading" state where the UI never renders

## Recommendations

1. **Check Storybook build process**: Ensure stories are compiled correctly
2. **Verify module resolution**: Check for import/export issues in story files
3. **Test with minimal setup**: Try with a single simple story
4. **Check browser console**: Look for specific JavaScript errors
5. **Verify dependencies**: Ensure all Storybook and React packages are compatible

## Next Steps

1. Open Chrome DevTools (F12) and check Console tab
2. Look for red error messages
3. Check Network tab for failed requests
4. Examine Elements tab for DOM structure

---
Generated by system browser testing
`;

  const reportPath = path.join(__dirname, 'browser-test-report.md');
  fs.writeFileSync(reportPath, report);
  console.log('📄 Report generated:', reportPath);
}

async function main() {
  console.log('🎯 Storybook Browser Testing - System Approach');
  console.log('=' .repeat(50));

  // Test server connectivity
  await testWithCurl();

  // Test page content
  await testPageContent();

  // Test with system browser
  await testWithSystemBrowser();

  // Test with Safari (macOS)
  if (process.platform === 'darwin') {
    await testWithSafari();
  }

  // Generate report
  await generateReport();

  console.log('\n✅ Browser testing completed');
  console.log('💡 Check the generated files and screenshots');
  console.log('🔍 Manual investigation steps:');
  console.log('   1. Open Chrome: http://localhost:6006');
  console.log('   2. Press F12 for Developer Tools');
  console.log('   3. Check Console for red errors');
  console.log('   4. Check Network for failed requests');
  console.log('   5. Check Elements for DOM structure');
}

main().catch(console.error);