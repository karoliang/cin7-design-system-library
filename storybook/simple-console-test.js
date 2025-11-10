#!/usr/bin/env node

/**
 * Simple Console Error Test using Chrome DevTools Protocol
 *
 * This script uses Chrome's debugging protocol to capture console errors
 * without Puppeteer's complexity.
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const STORYBOOK_URL = 'http://localhost:6006';
const OUTPUT_DIR = path.join(__dirname, 'test-results');
const LOGS_DIR = path.join(OUTPUT_DIR, 'logs');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');

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
  [OUTPUT_DIR, LOGS_DIR, SCREENSHOTS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate URL for component variation
function generateUrl(component, variation) {
  return `${STORYBOOK_URL}/iframe.html?id=examples-${component}--${variation}&args=&viewMode=story`;
}

// Check if Storybook is running
async function checkStorybookRunning() {
  return new Promise((resolve) => {
    const req = http.get(`${STORYBOOK_URL}/`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Test a single URL with curl and basic response checking
async function testUrlWithCurl(component, variation) {
  const url = generateUrl(component, variation);
  const componentName = `${component}-${variation}`;
  console.log(`\n🚀 Testing: ${componentName}`);
  console.log(`   URL: ${url}`);

  return new Promise((resolve) => {
    const startTime = Date.now();

    // Use curl to check the URL response
    const curl = spawn('curl', [
      '-s', '-w', '%{http_code}|%{time_total}|%{size_download}',
      '-o', '/dev/null',
      url
    ]);

    let stdout = '';
    let stderr = '';

    curl.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    curl.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    curl.on('close', (code) => {
      const endTime = Date.now();
      const loadTime = endTime - startTime;

      const result = {
        component,
        variation,
        componentName,
        url,
        curlExitCode: code,
        stderr: stderr.trim(),
        loadTime,
        timestamp: new Date().toISOString()
      };

      // Parse curl output
      if (stdout.includes('|')) {
        const [statusCode, timeTotal, sizeDownload] = stdout.split('|');
        result.httpStatus = parseInt(statusCode);
        result.responseTime = parseFloat(timeTotal) * 1000; // Convert to ms
        result.contentSize = parseInt(sizeDownload);
      } else {
        result.httpStatus = 'unknown';
        result.responseTime = 'unknown';
        result.contentSize = 'unknown';
      }

      console.log(`   HTTP Status: ${result.httpStatus}`);
      console.log(`   Response Time: ${result.responseTime}ms`);
      console.log(`   Content Size: ${result.contentSize} bytes`);
      console.log(`   Load Time: ${loadTime}ms`);

      if (result.stderr) {
        console.log(`   Stderr: ${result.stderr}`);
      }

      // Determine status
      if (result.httpStatus === 200) {
        result.status = 'success';
        console.log(`   ✅ Success`);
      } else if (result.httpStatus >= 400) {
        result.status = 'http_error';
        console.log(`   ❌ HTTP Error: ${result.httpStatus}`);
      } else {
        result.status = 'load_error';
        console.log(`   ❌ Load Error`);
      }

      // Save result
      const logPath = path.join(LOGS_DIR, `${componentName}-curl-test.json`);
      fs.writeFileSync(logPath, JSON.stringify(result, null, 2));
      console.log(`   ✅ Log saved: ${logPath}`);

      resolve(result);
    });
  });
}

// Generate a simple HTML test page that can be used to manually capture console errors
function generateManualTestPage() {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Console Error Testing - Frame & Breadcrumbs Components</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 2px solid #e0e0e0;
            padding-bottom: 10px;
        }
        .component-section {
            margin: 30px 0;
            border: 1px solid #ddd;
            border-radius: 6px;
            overflow: hidden;
        }
        .component-header {
            background: #f8f9fa;
            padding: 15px;
            font-weight: bold;
            color: #495057;
            border-bottom: 1px solid #ddd;
        }
        .variation {
            margin: 15px;
            padding: 15px;
            background: #fafafa;
            border-radius: 4px;
            border-left: 4px solid #007bff;
        }
        .variation h4 {
            margin: 0 0 10px 0;
            color: #007bff;
        }
        .test-link {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
            margin: 5px;
            transition: background-color 0.2s;
        }
        .test-link:hover {
            background: #0056b3;
        }
        .test-link:visited {
            color: white;
        }
        .instructions {
            background: #d1ecf1;
            border: 1px solid #bee5eb;
            border-radius: 4px;
            padding: 15px;
            margin: 20px 0;
        }
        .error-patterns {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            border-radius: 4px;
            padding: 15px;
            margin: 20px 0;
        }
        .iframe-container {
            width: 100%;
            height: 600px;
            border: 1px solid #ddd;
            margin: 10px 0;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎯 Console Error Testing - Frame & Breadcrumbs Components</h1>

        <div class="instructions">
            <h3>📋 Testing Instructions</h3>
            <ol>
                <li>Open browser developer tools (F12 or Cmd+Option+I)</li>
                <li>Go to Console tab and clear it (Ctrl+L or Cmd+K)</li>
                <li>Check "Preserve log" to capture all errors</li>
                <li>Click each test link below in a NEW TAB</li>
                <li>Wait 5 seconds for async errors to appear</li>
                <li>Copy all console output to corresponding text file</li>
            </ol>
        </div>

        <div class="error-patterns">
            <h3>🔍 Error Patterns to Capture</h3>
            <ul>
                <li>"SyntaxError: The requested module ... does not provide an export named 'default'"</li>
                <li>"No theme was provided" errors</li>
                <li>"Cannot destructure property" errors</li>
                <li>"React Error #31" messages</li>
                <li>"require is not defined" errors</li>
                <li>PropTypes import/export errors</li>
                <li>Component rendering failures</li>
                <li>Theme provider errors</li>
            </ul>
        </div>

        <div class="component-section">
            <div class="component-header">📦 Frame Components (6 variations)</div>`;

  // Add Frame component variations
  COMPONENTS.frame.forEach(variation => {
    const url = generateUrl('frame', variation);
    const displayName = variation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    htmlContent += `
            <div class="variation">
                <h4>${displayName}</h4>
                <a href="${url}" target="_blank" class="test-link">Test in New Tab</a>
                <a href="javascript:void(0)" onclick="loadInIframe('${url}')" class="test-link">Test in Iframe</a>
                <div><small>Save console output as: <code>frame-${variation}-console-output.txt</code></small></div>
            </div>`;
  });

  htmlContent += `
        </div>

        <div class="component-section">
            <div class="component-header">📦 Breadcrumbs Components (8 variations)</div>`;

  // Add Breadcrumbs component variations
  COMPONENTS.breadcrumbs.forEach(variation => {
    const url = generateUrl('breadcrumbs', variation);
    const displayName = variation.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    htmlContent += `
            <div class="variation">
                <h4>${displayName}</h4>
                <a href="${url}" target="_blank" class="test-link">Test in New Tab</a>
                <a href="javascript:void(0)" onclick="loadInIframe('${url}')" class="test-link">Test in Iframe</a>
                <div><small>Save console output as: <code>breadcrumbs-${variation}-console-output.txt</code></small></div>
            </div>`;
  });

  htmlContent += `
        </div>

        <div class="component-section">
            <div class="component-header">🖼️ Iframe Testing Area</div>
            <div class="iframe-container">
                <iframe id="testFrame" src="about:blank"></iframe>
            </div>
            <p><small>Click "Test in Iframe" to load components here (note: iframe may have different security context)</small></p>
        </div>
    </div>

    <script>
        function loadInIframe(url) {
            const iframe = document.getElementById('testFrame');
            iframe.src = url;

            // Clear console instruction
            console.clear();
            console.log('🚀 Loading component in iframe:', url);
            console.log('📋 Watch for console errors above...');
        }

        // Auto-clear console on page load
        console.clear();
        console.log('🎯 Console Error Testing Page Loaded');
        console.log('📋 Open Developer Tools and follow instructions above');
    </script>
</body>
</html>`;

  const testPagePath = path.join(OUTPUT_DIR, 'console-error-test-page.html');
  fs.writeFileSync(testPagePath, htmlContent);
  console.log(`   ✅ Created test page: ${testPagePath}`);
  return testPagePath;
}

// Generate summary report
function generateSummaryReport(results) {
  console.log('\\n📊 Generating summary report...');

  const summary = {
    testRun: {
      timestamp: new Date().toISOString(),
      totalComponents: Object.values(COMPONENTS).flat().length,
      testedSuccessfully: results.filter(r => r.status === 'success').length,
      withHttpErrors: results.filter(r => r.status === 'http_error').length,
      withLoadErrors: results.filter(r => r.status === 'load_error').length
    },
    components: results,
    recommendations: []
  };

  // Analyze results
  const failedComponents = results.filter(r => r.status !== 'success');
  if (failedComponents.length > 0) {
    summary.recommendations.push({
      type: 'component-fixes',
      priority: 'high',
      description: `${failedComponents.length} components are failing to load`,
      affectedComponents: failedComponents.map(c => c.componentName)
    });
  }

  const slowComponents = results.filter(r => r.responseTime > 5000);
  if (slowComponents.length > 0) {
    summary.recommendations.push({
      type: 'performance',
      priority: 'medium',
      description: `${slowComponents.length} components are slow to load (>5s)`,
      affectedComponents: slowComponents.map(c => c.componentName)
    });
  }

  // Save summary report
  const summaryPath = path.join(OUTPUT_DIR, 'simple-test-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  console.log(`   ✅ Summary report saved: ${summaryPath}`);
  return summary;
}

// Main test execution
async function runSimpleTests() {
  console.log('🎯 Starting Simple Console Error Testing\\n');

  ensureDirectories();

  // Check if Storybook is running
  const isRunning = await checkStorybookRunning();
  if (!isRunning) {
    console.error('❌ Storybook is not running at', STORYBOOK_URL);
    console.error('Please start Storybook with: cd storybook && pnpm dev');
    process.exit(1);
  }

  console.log('✅ Storybook is running');

  const results = [];

  // Test all Frame variations
  console.log('\\n📦 Testing Frame Components...');
  for (const variation of COMPONENTS.frame) {
    const result = await testUrlWithCurl('frame', variation);
    results.push(result);
  }

  // Test all Breadcrumbs variations
  console.log('\\n📦 Testing Breadcrumbs Components...');
  for (const variation of COMPONENTS.breadcrumbs) {
    const result = await testUrlWithCurl('breadcrumbs', variation);
    results.push(result);
  }

  // Generate summary report
  const summary = generateSummaryReport(results);

  // Generate manual test page
  const testPagePath = generateManualTestPage();

  // Print final summary
  console.log('\\n' + '='.repeat(80));
  console.log('SIMPLE TESTING COMPLETE');
  console.log('='.repeat(80));
  console.log(`✅ Total Components Tested: ${summary.testRun.totalComponents}`);
  console.log(`✅ Successful: ${summary.testRun.testedSuccessfully}`);
  console.log(`❌ HTTP Errors: ${summary.testRun.withHttpErrors}`);
  console.log(`❌ Load Errors: ${summary.testRun.withLoadErrors}`);

  console.log(`\\n📁 Results saved to: ${OUTPUT_DIR}`);
  console.log(`🌐 Manual test page: file://${testPagePath}`);
  console.log(`\\n🎯 Next Steps:`);
  console.log(`   1. Open the manual test page in your browser`);
  console.log(`   2. Open Developer Tools`);
  console.log(`   3. Test each component and capture console errors`);
  console.log(`   4. Save console output to the provided template files`);
}

// Run if called directly
if (require.main === module) {
  runSimpleTests().catch(error => {
    console.error('❌ Testing failed:', error);
    process.exit(1);
  });
}

module.exports = { runSimpleTests, testUrlWithCurl };