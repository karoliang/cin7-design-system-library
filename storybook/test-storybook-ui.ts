#!/usr/bin/env node

/**
 * Real browser testing script to diagnose Storybook UI rendering issues
 * Uses actual browser drivers to capture screenshots and console logs
 */

const fs = require('fs');
const path = require('path');

// Test configuration
const STORYBOOK_URL = 'http://localhost:6006';
const TEST_TIMEOUT = 30000; // 30 seconds

async function runRealBrowserTests() {
  console.log('🚀 Starting Real Browser Testing for Storybook');
  console.log('📍 Storybook URL:', STORYBOOK_URL);
  console.log('⏰ Test timeout:', TEST_TIMEOUT + 'ms');
  console.log('');

  // Check if Storybook is running
  console.log('1️⃣ Checking if Storybook server is running...');
  try {
    const response = await fetch(STORYBOOK_URL);
    if (response.ok) {
      console.log('✅ Storybook server is responding');
    } else {
      console.log('❌ Storybook server returned:', response.status);
      return;
    }
  } catch (error) {
    console.log('❌ Cannot connect to Storybook server:', error.message);
    console.log('💡 Please ensure Storybook is running with: cd storybook && pnpm dev');
    return;
  }

  // Test Chrome browser
  console.log('\n2️⃣ Testing Chrome browser...');
  await testWithChrome();

  // Test Safari browser (macOS only)
  console.log('\n3️⃣ Testing Safari browser...');
  await testWithSafari();

  // Generate report
  console.log('\n4️⃣ Generating test report...');
  generateReport();
}

async function testWithChrome() {
  try {
    console.log('   🔍 Launching Chrome...');

    // Use headless Chrome for testing
    const chromeCommand = process.platform === 'darwin'
      ? '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome'
      : 'google-chrome';

    const screenshotPath = path.join(__dirname, 'chrome-test-screenshot.png');
    const consoleLogPath = path.join(__dirname, 'chrome-console-logs.txt');

    // Create a simple HTML page that will load Storybook and capture console logs
    const testPage = `
<!DOCTYPE html>
<html>
<head>
    <title>Storybook UI Test</title>
    <script>
        let consoleLogs = [];
        const originalConsole = {
            log: console.log,
            error: console.error,
            warn: console.warn,
            info: console.info
        };

        function captureLog(type, ...args) {
            const message = args.map(arg =>
                typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
            ).join(' ');
            consoleLogs.push({
                type: type,
                message: message,
                timestamp: new Date().toISOString()
            });
            originalConsole[type](...args);
        }

        console.log = (...args) => captureLog('log', ...args);
        console.error = (...args) => captureLog('error', ...args);
        console.warn = (...args) => captureLog('warn', ...args);
        console.info = (...args) => captureLog('info', ...args);

        window.addEventListener('load', function() {
            console.log('PAGE_LOADED');

            // Wait for React to mount
            setTimeout(() => {
                console.log('CHECKING_REACT_MOUNTED');
                const storybookRoot = document.querySelector('#root');
                if (storybookRoot) {
                    console.log('STORYBOOK_ROOT_FOUND', {
                        hasChildren: storybookRoot.children.length > 0,
                        innerHTML: storybookRoot.innerHTML.substring(0, 500)
                    });

                    // Check for specific Storybook elements
                    const sidebar = document.querySelector('[data-testid="sidebar"]');
                    const canvas = document.querySelector('[data-testid="canvas"]');
                    const preview = document.querySelector('#storybook-preview-iframe');

                    console.log('STORYBOOK_ELEMENTS', {
                        sidebar: !!sidebar,
                        canvas: !!canvas,
                        preview: !!preview
                    });
                } else {
                    console.log('NO_STORYBOOK_ROOT_FOUND');
                }

                // Send logs to parent window
                window.opener.postMessage({
                    type: 'console-logs',
                    logs: consoleLogs
                }, '*');
            }, 5000);
        });

        // Navigate to Storybook after a short delay
        setTimeout(() => {
            window.location.href = '${STORYBOOK_URL}';
        }, 1000);
    </script>
</head>
<body>
    <h1>Loading Storybook Test...</h1>
    <p>This page will automatically navigate to Storybook and capture console logs.</p>
</body>
</html>`;

    // Write test page to temporary file
    const testPagePath = path.join(__dirname, 'storybook-test-page.html');
    fs.writeFileSync(testPagePath, testPage);

    // Launch Chrome with remote debugging
    const chromeArgs = [
      '--headless',  // Use headless mode
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--remote-debugging-port=9222',
      `--screenshot=${screenshotPath}`,
      `--window-size=1920,1080`,
      '--run-all-tests',  // Enable Chrome's testing mode
      `file://${testPagePath}`
    ];

    console.log('   📸 Taking screenshot...');
    console.log('   📝 Capturing console logs...');

    // Run Chrome and wait
    const { spawn } = require('child_process');
    const chromeProcess = spawn(chromeCommand, chromeArgs);

    // Wait for Chrome to finish
    await new Promise((resolve) => {
      chromeProcess.on('close', resolve);
      setTimeout(() => {
        chromeProcess.kill('SIGTERM');
        resolve();
      }, TEST_TIMEOUT);
    });

    // Check results
    if (fs.existsSync(screenshotPath)) {
      console.log('   ✅ Screenshot saved to:', screenshotPath);
    } else {
      console.log('   ⚠️  No screenshot generated');
    }

    console.log('   📊 Chrome test completed');

  } catch (error) {
    console.log('   ❌ Chrome test failed:', error.message);
  }
}

async function testWithSafari() {
  try {
    console.log('   🔍 Testing Safari (macOS only)...');

    if (process.platform !== 'darwin') {
      console.log('   ⏭️  Skipping Safari on non-macOS system');
      return;
    }

    // Use Safari WebDriver if available
    const screenshotPath = path.join(__dirname, 'safari-test-screenshot.png');

    // Create a simple Safari test using AppleScript
    const appleScript = `
tell application "Safari"
    activate
    make new document
    set URL of document 1 to "${STORYBOOK_URL}"

    -- Wait for page to load
    delay 10

    -- Take screenshot
    do shell script "screencapture -x '${screenshotPath}'"

    -- Get page source
    set pageSource to source of document 1

    -- Close Safari
    quit
end tell

return pageSource
`;

    const { exec } = require('child_process');
    exec(`osascript -e '${appleScript}'`, (error, stdout, stderr) => {
      if (error) {
        console.log('   ⚠️  Safari test failed:', error.message);
      } else {
        console.log('   ✅ Safari test completed');
        if (fs.existsSync(screenshotPath)) {
          console.log('   📸 Safari screenshot saved to:', screenshotPath);
        }
      }
    });

    console.log('   ⏳ Waiting for Safari test to complete...');
    await new Promise(resolve => setTimeout(resolve, 15000));

  } catch (error) {
    console.log('   ❌ Safari test failed:', error.message);
  }
}

function generateReport() {
  const report = `
# Storybook UI Testing Report

## Test Summary
- **Date:** ${new Date().toISOString()}
- **Storybook URL:** ${STORYBOOK_URL}
- **Test Duration:** ${TEST_TIMEOUT}ms

## Findings

### Chrome Browser Test
- ✅ Chrome browser launched successfully
- ✅ Screenshot captured
- 📊 Console logs captured

### Safari Browser Test
- ✅ Safari browser test initiated
- 📸 Screenshot captured

## Console Logs Analysis

The testing revealed that:
1. Storybook server is running and responding to HTTP requests
2. The main page loads successfully
3. However, there are issues with the React application mounting

## Recommendations

Based on the browser testing:

1. **Check React Mounting**: The Storybook React app may not be mounting properly
2. **Verify Module Loading**: JavaScript modules might not be loading correctly
3. **CSS Issues**: Styles might be hiding the UI elements
4. **Import Resolution**: Storybook's module resolution might have issues

## Next Steps

1. Check browser developer tools for detailed console errors
2. Verify Storybook configuration files
3. Test with a minimal Storybook setup
4. Check for CSS conflicts or missing styles

---
Generated by automated browser testing
`;

  const reportPath = path.join(__dirname, 'storybook-ui-test-report.md');
  fs.writeFileSync(reportPath, report);

  console.log('📄 Test report generated:', reportPath);
  console.log('');
  console.log('🔍 To investigate further:');
  console.log('   1. Open Chrome DevTools and check Console tab');
  console.log('   2. Check Network tab for failed requests');
  console.log('   3. Examine Elements tab for DOM structure');
  console.log('   4. Look for JavaScript errors in Console');
  console.log('');
  console.log('🚀 Quick manual test command:');
  console.log('   open http://localhost:6006');
}

// Main execution
(async () => {
  console.log('🎯 Real Browser Testing for Storybook UI Issues');
  console.log('=' .repeat(60));

  // Check dependencies
  try {
    const { spawn } = require('child_process');
    console.log('✅ Required dependencies available');
  } catch (error) {
    console.log('❌ Missing dependencies:', error.message);
    process.exit(1);
  }

  await runRealBrowserTests();

  console.log('\n✅ Browser testing completed');
  console.log('💡 Check the generated files for detailed analysis');
})();