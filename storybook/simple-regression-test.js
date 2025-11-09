/**
 * Simple Storybook Regression Testing Suite
 * Tests the existing running Storybook instance without launching new browsers
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class SimpleStorybookTester {
  constructor() {
    this.storybookUrl = 'http://localhost:6006';
    this.results = {
      timestamp: new Date().toISOString(),
      testResults: [],
      consoleErrors: [],
      navigationErrors: [],
      missingVariations: [],
      summary: {
        totalStories: 0,
        passedStories: 0,
        failedStories: 0,
        totalErrors: 0,
        totalWarnings: 0
      }
    };
  }

  async launchBrowser() {
    console.log('🚀 Launching browser for testing...');

    try {
      this.browser = await puppeteer.launch({
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-extensions',
          '--disable-plugins',
          '--disable-images',
          '--disable-javascript',
          '--disable-default-apps',
          '--disable-translate',
          '--disable-device-discovery-notifications',
          '--disable-software-rasterizer',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding',
          '--disable-background-networking',
          '--disable-features=TranslateUI',
          '--disable-ipc-flooding-protection',
          '--window-size=1920,1080'
        ]
      });

      const page = await this.browser.newPage();

      // Enable JavaScript for Storybook to work
      await page.setJavaScriptEnabled(true);

      // Console logging
      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        const location = msg.location();

        const logEntry = {
          type,
          text,
          url: location?.url,
          line: location?.lineNumber,
          timestamp: new Date().toISOString()
        };

        console.log(`[${type.toUpperCase()}] ${text}`);

        if (type === 'error') {
          this.results.consoleErrors.push(logEntry);
          this.results.summary.totalErrors++;
        } else if (type === 'warning') {
          this.results.summary.totalWarnings++;
        }
      });

      // Page error handling
      page.on('pageerror', (error) => {
        console.log('❌ PAGE ERROR:', error.message);
        this.results.consoleErrors.push({
          type: 'pageerror',
          text: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString()
        });
        this.results.summary.totalErrors++;
      });

      return page;

    } catch (error) {
      console.error('💥 Failed to launch browser:', error.message);
      throw error;
    }
  }

  async getStorybookNavigation() {
    console.log('🔍 Discovering Storybook structure...');

    const page = await this.launchBrowser();

    try {
      // Navigate to Storybook
      await page.goto(this.storybookUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      await page.waitForTimeout(5000); // Wait for Storybook to fully load

      // Get all navigation items
      const navigation = await page.evaluate(() => {
        // Find all story links in the sidebar
        const storyLinks = Array.from(document.querySelectorAll('a[href*="/story/"]')).map(link => ({
          title: link.textContent?.trim(),
          url: link.getAttribute('href'),
          category: 'stories'
        }));

        // Find all documentation links
        const docLinks = Array.from(document.querySelectorAll('a[href*="/docs/"]')).map(link => ({
          title: link.textContent?.trim(),
          url: link.getAttribute('href'),
          category: 'docs'
        }));

        return [...storyLinks, ...docLinks];
      });

      console.log(`📚 Found ${navigation.length} items (${storyLinks.length} stories, ${docLinks.length} docs)`);
      this.results.summary.totalStories = navigation.length;

      await this.browser.close();
      return navigation;

    } catch (error) {
      console.error('💥 Failed to discover navigation:', error.message);
      await this.browser.close();
      throw error;
    }
  }

  async testStorybookItem(item) {
    console.log(`🧪 Testing: ${item.title}`);

    const page = await this.launchBrowser();

    try {
      const testResult = {
        ...item,
        status: 'pending',
        errors: [],
        warnings: [],
        hasContent: false,
        hasCodeVariations: false,
        loadTime: 0,
        screenshot: null
      };

      const startTime = Date.now();

      // Navigate to the story/doc
      await page.goto(`${this.storybookUrl}${item.url}`, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      testResult.loadTime = Date.now() - startTime;

      // Wait for content to load
      await page.waitForTimeout(3000);

      // Collect console errors
      const consoleErrors = await page.evaluate(() => {
        const errors = [];
        const originalError = console.error;
        const originalWarn = console.warn;

        console.error = function(...args) {
          errors.push({ type: 'error', message: args.join(' ') });
          originalError.apply(console, args);
        };

        console.warn = function(...args) {
          errors.push({ type: 'warning', message: args.join(' ') });
          originalWarn.apply(console, args);
        };

        // Wait a bit to collect errors
        return new Promise(resolve => {
          setTimeout(() => {
            console.error = originalError;
            console.warn = originalWarn;
            resolve(errors);
          }, 2000);
        });
      });

      testResult.errors = consoleErrors.filter(e => e.type === 'error');
      testResult.warnings = consoleErrors.filter(e => e.type === 'warning');

      // Check for content rendering
      testResult.hasContent = await page.evaluate(() => {
        const canvas = document.querySelector('#storybook-root, #storybook-preview-wrapper, .sb-preview-main');
        if (!canvas) return false;

        // Check if there's visible content
        const rect = canvas.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && canvas.children.length > 0;
      });

      // Check for code variations
      testResult.hasCodeVariations = await page.evaluate(() => {
        return !!document.querySelector('[class*="code-variants"], [class*="codeVariants"], [data-testid="code-variants"]');
      });

      // Check for error elements
      const hasErrorElements = await page.evaluate(() => {
        const errorSelectors = [
          '[class*="error"]',
          '[class*="Error"]',
          '.sb-error',
          '.error-message',
          '[data-testid="error"]'
        ];
        return errorSelectors.some(selector => document.querySelector(selector));
      });

      if (hasErrorElements || testResult.errors.length > 0) {
        testResult.status = 'failed';
        this.results.summary.failedStories++;
        console.log(`❌ Failed: ${item.title}`);
      } else {
        testResult.status = 'passed';
        this.results.summary.passedStories++;
        console.log(`✅ Passed: ${item.title}`);
      }

      // Take screenshot for failed tests
      if (testResult.status === 'failed') {
        testResult.screenshot = await page.screenshot({
          encoding: 'base64',
          fullPage: false
        });
      }

      this.results.testResults.push(testResult);

      await this.browser.close();
      return testResult;

    } catch (error) {
      console.log(`💥 Test failed for ${item.title}:`, error.message);

      const errorResult = {
        ...item,
        status: 'error',
        error: error.message,
        stack: error.stack,
        loadTime: 0,
        errors: [{ type: 'navigation', message: error.message }],
        warnings: [],
        hasContent: false,
        hasCodeVariations: false,
        screenshot: null
      };

      this.results.testResults.push(errorResult);
      this.results.summary.failedStories++;
      this.results.summary.totalErrors++;

      await this.browser.close();
      return errorResult;
    }
  }

  async runAllTests() {
    try {
      console.log('🎯 Starting comprehensive Storybook regression testing...\n');

      // Get all stories and docs
      const items = await this.getStorybookNavigation();

      if (items.length === 0) {
        console.log('⚠️ No items found to test. Checking Storybook URL...');
        const testPage = await this.launchBrowser();
        try {
          await testPage.goto(this.storybookUrl, { waitUntil: 'networkidle2', timeout: 10000 });
          const title = await testPage.title();
          console.log(`Storybook title: ${title}`);
        } catch (error) {
          console.error('Cannot reach Storybook at:', this.storybookUrl);
        }
        await testPage.browser().close();
        return;
      }

      console.log(`\n🧪 Testing ${items.length} stories and documentation pages...\n`);

      // Test each item
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(`[${i + 1}/${items.length}] Testing: ${item.title}`);

        await this.testStorybookItem(item);

        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      this.results.completedAt = new Date().toISOString();

      console.log('\n🏁 All tests completed!');
      console.log(`📊 Summary: ${this.results.summary.passedStories} passed, ${this.results.summary.failedStories} failed`);

      // Generate report
      await this.generateReport();

      return this.results;

    } catch (error) {
      console.error('💥 Test suite failed:', error);
      throw error;
    }
  }

  async generateReport() {
    const reportPath = path.join(__dirname, 'storybook-regression-results.json');
    const htmlReportPath = path.join(__dirname, 'storybook-regression-results.html');

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    // Generate HTML report
    const htmlContent = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlContent);

    console.log(`\n📊 Reports generated:`);
    console.log(`  JSON: ${reportPath}`);
    console.log(`  HTML: ${htmlReportPath}`);

    // Print critical errors
    const criticalErrors = this.results.testResults.filter(r => r.status === 'failed' || r.status === 'error');
    if (criticalErrors.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES FOUND:');
      criticalErrors.forEach((result, index) => {
        console.log(`\n${index + 1}. ${result.title}`);
        console.log(`   Status: ${result.status}`);
        if (result.error) console.log(`   Error: ${result.error}`);
        if (result.errors.length > 0) {
          console.log(`   Console Errors:`);
          result.errors.forEach(error => console.log(`     - ${error.message}`));
        }
      });
    }

    return { reportPath, htmlReportPath };
  }

  generateHTMLReport() {
    const passedTests = this.results.testResults.filter(r => r.status === 'passed');
    const failedTests = this.results.testResults.filter(r => r.status === 'failed' || r.status === 'error');

    return `
<!DOCTYPE html>
<html>
<head>
    <title>Storybook Regression Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: white; padding: 30px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .metric h3 { margin: 0; font-size: 2em; }
        .metric.success { border-left: 4px solid #28a745; }
        .metric.error { border-left: 4px solid #dc3545; }
        .metric.warning { border-left: 4px solid #ffc107; }
        .test-item { background: white; margin: 10px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .test-item.passed { border-left: 4px solid #28a745; }
        .test-item.failed { border-left: 4px solid #dc3545; }
        .test-item.error { border-left: 4px solid #dc3545; }
        .status { padding: 4px 12px; border-radius: 12px; color: white; font-size: 0.8em; font-weight: bold; }
        .status.passed { background: #28a745; }
        .status.failed { background: #dc3545; }
        .status.error { background: #dc3545; }
        .error-details { background: #f8d7da; padding: 10px; border-radius: 4px; margin: 10px 0; }
        .tabs { display: flex; margin-bottom: 20px; }
        .tab { padding: 12px 24px; background: white; border: 1px solid #ddd; cursor: pointer; border-radius: 4px 4px 0 0; }
        .tab.active { background: #007bff; color: white; border-color: #007bff; }
        .content { display: none; background: white; padding: 20px; border-radius: 0 8px 8px 8px; }
        .content.active { display: block; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; }
        .stats { display: flex; justify-content: space-between; margin: 10px 0; }
        .timestamp { color: #666; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Storybook Regression Test Report</h1>
            <p>Generated: ${new Date(this.results.timestamp).toLocaleString()}</p>
            <p class="timestamp">Test Duration: ${this.results.completedAt ?
              Math.round((new Date(this.results.completedAt) - new Date(this.results.timestamp)) / 1000) : 'N/A'} seconds</p>
        </div>

        <div class="summary">
            <div class="metric">
                <h3>${this.results.summary.totalStories}</h3>
                <p>Total Items Tested</p>
            </div>
            <div class="metric success">
                <h3>${this.results.summary.passedStories}</h3>
                <p>Passed Tests</p>
            </div>
            <div class="metric error">
                <h3>${this.results.summary.failedStories}</h3>
                <p>Failed Tests</p>
            </div>
            <div class="metric warning">
                <h3>${this.results.summary.totalErrors}</h3>
                <p>Total Errors</p>
            </div>
        </div>

        <div class="tabs">
            <div class="tab active" onclick="showTab('overview')">Overview</div>
            <div class="tab" onclick="showTab('passed')">Passed Tests (${passedTests.length})</div>
            <div class="tab" onclick="showTab('failed')">Failed Tests (${failedTests.length})</div>
            <div class="tab" onclick="showTab('errors')">Console Errors (${this.results.consoleErrors.length})</div>
        </div>

        <div id="overview" class="content active">
            <h2>📊 Test Overview</h2>
            <div class="stats">
                <span>Success Rate: ${((this.results.summary.passedStories / this.results.summary.totalStories) * 100).toFixed(1)}%</span>
                <span>Total Test Time: ${this.results.testResults.reduce((sum, test) => sum + (test.loadTime || 0), 0)}ms</span>
            </div>

            <h3>📈 Test Results by Category</h3>
            ${Object.entries(
              this.results.testResults.reduce((acc, test) => {
                acc[test.category] = (acc[test.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([category, count]) => `<p>${category}: ${count} items</p>`).join('')}
        </div>

        <div id="passed" class="content">
            <h2>✅ Passed Tests</h2>
            ${passedTests.map(test => `
                <div class="test-item passed">
                    <h4>${test.title} <span class="status passed">PASSED</span></h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>Load Time: ${test.loadTime}ms</span>
                        <span>Has Content: ${test.hasContent ? '✅' : '❌'}</span>
                        <span>Has Code Variations: ${test.hasCodeVariations ? '✅' : '❌'}</span>
                    </div>
                </div>
            `).join('') || '<p>No passed tests found.</p>'}
        </div>

        <div id="failed" class="content">
            <h2>❌ Failed Tests</h2>
            ${failedTests.map(test => `
                <div class="test-item ${test.status}">
                    <h4>${test.title} <span class="status ${test.status}">${test.status.toUpperCase()}</span></h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>Load Time: ${test.loadTime}ms</span>
                    </div>
                    ${test.error ? `<div class="error-details"><strong>Error:</strong> ${test.error}</div>` : ''}
                    ${test.errors.length > 0 ? `
                        <div class="error-details">
                            <strong>Console Errors:</strong>
                            <ul>${test.errors.map(err => `<li>${err.message}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                    ${test.screenshot ? `<img src="data:image/png;base64,${test.screenshot}" style="max-width: 100%; border-radius: 4px;">` : ''}
                </div>
            `).join('') || '<p>No failed tests found! 🎉</p>'}
        </div>

        <div id="errors" class="content">
            <h2>🚨 Console Errors</h2>
            ${this.results.consoleErrors.map(error => `
                <div class="error-details">
                    <strong>[${error.type.toUpperCase()}]</strong> ${error.text}
                    ${error.url ? `<br><small>URL: ${error.url}</small>` : ''}
                    ${error.line ? `<br><small>Line: ${error.line}</small>` : ''}
                </div>
            `).join('') || '<p>No console errors found! ✅</p>'}
        </div>
    </div>

    <script>
        function showTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        }
    </script>
</body>
</html>`;
  }
}

// Main execution
async function runTests() {
  const tester = new SimpleStorybookTester();

  try {
    await tester.runAllTests();

    if (tester.results.summary.failedStories > 0) {
      console.log('\n❌ Some tests failed. Check the HTML report for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All tests passed!');
      process.exit(0);
    }

  } catch (error) {
    console.error('💥 Test execution failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runTests();
}

module.exports = { SimpleStorybookTester };