/**
 * Comprehensive Storybook Regression Testing Suite
 *
 * This automated testing framework systematically navigates through all Storybook
 * pages, tabs, and components to collect console errors and identify issues.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class StorybookRegressionTester {
  constructor() {
    this.storybookUrl = 'http://localhost:6006';
    this.results = {
      timestamp: new Date().toISOString(),
      totalPages: 0,
      pagesWithErrors: 0,
      totalErrors: 0,
      errors: [],
      warnings: [],
      navigationErrors: [],
      missingVariations: [],
      performanceIssues: []
    };
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    console.log('🚀 Initializing Storybook Regression Testing...');

    this.browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      devtools: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    });

    this.page = await this.browser.newPage();

    // Enhanced console logging
    this.page.on('console', (msg) => {
      const type = msg.type();
      const location = msg.location();
      const text = msg.text();

      const logEntry = {
        type,
        text,
        url: location?.url,
        line: location?.lineNumber,
        column: location?.columnNumber,
        timestamp: new Date().toISOString()
      };

      console.log(`[${type.toUpperCase()}] ${text}`);

      if (type === 'error') {
        this.results.errors.push(logEntry);
      } else if (type === 'warning') {
        this.results.warnings.push(logEntry);
      }
    });

    // Page error handling
    this.page.on('pageerror', (error) => {
      console.log('❌ PAGE ERROR:', error.message);
      this.results.errors.push({
        type: 'pageerror',
        text: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    });

    // Request failure handling
    this.page.on('requestfailed', (request) => {
      console.log('⚠️ REQUEST FAILED:', request.url(), request.failure());
      this.results.navigationErrors.push({
        url: request.url(),
        error: request.failure()?.errorText,
        timestamp: new Date().toISOString()
      });
    });

    // Set viewport and user agent
    await this.page.setViewport({ width: 1920, height: 1080 });
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
  }

  async discoverAllStories() {
    console.log('🔍 Discovering all stories and variants...');

    // Navigate to main Storybook page
    await this.page.goto(this.storybookUrl, { waitUntil: 'networkidle2' });
    await this.page.waitForTimeout(3000);

    // Get all story links from the sidebar
    const stories = await this.page.evaluate(() => {
      const storyElements = document.querySelectorAll('[data-testid="story"] a, a[href*="/story/"]');
      const stories = [];

      storyElements.forEach(el => {
        const href = el.getAttribute('href');
        const text = el.textContent?.trim();
        if (href && text) {
          stories.push({
            url: href,
            title: text,
            category: href.split('/')[1] || 'unknown'
          });
        }
      });

      return stories;
    });

    console.log(`📚 Discovered ${stories.length} stories`);
    return stories;
  }

  async testStory(story) {
    console.log(`🧪 Testing: ${story.title}`);

    try {
      // Navigate to story
      const fullUrl = `${this.storybookUrl}${story.url}`;
      await this.page.goto(fullUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for page to load completely
      await this.page.waitForTimeout(5000);

      // Check for specific console errors
      const consoleErrors = await this.page.evaluate(() => {
        const errors = [];

        // Check for undefined variables
        if (typeof window !== 'undefined') {
          const originalError = console.error;
          const errors = [];

          console.error = function(...args) {
            errors.push(args.join(' '));
            originalError.apply(console, args);
          };

          // Wait a bit to collect errors
          return new Promise(resolve => {
            setTimeout(() => {
              console.error = originalError;
              resolve(errors);
            }, 2000);
          });
        }

        return errors;
      });

      // Check for component rendering issues
      const renderStatus = await this.page.evaluate(() => {
        const canvas = document.querySelector('#storybook-root');
        if (!canvas) return { hasContent: false, error: 'No canvas found' };

        const hasContent = canvas.children.length > 0;
        const hasError = canvas.querySelector('[class*="error"], [class*="Error"]');

        return {
          hasContent,
          hasError: !!hasError,
          errorText: hasError?.textContent || null
        };
      });

      // Check for code variations panel
      const hasCodeVariations = await this.page.evaluate(() => {
        return !!document.querySelector('[class*="code-variants"], [class*="codeVariants"]');
      });

      // Take screenshot for visual verification
      const screenshot = await this.page.screenshot({
        encoding: 'base64',
        fullPage: false
      });

      const storyResult = {
        ...story,
        status: renderStatus.hasError ? 'error' : 'success',
        hasContent: renderStatus.hasContent,
        hasCodeVariations,
        consoleErrors,
        renderError: renderStatus.errorText,
        screenshot: `data:image/png;base64,${screenshot}`,
        testedAt: new Date().toISOString()
      };

      if (renderStatus.hasError || consoleErrors.length > 0) {
        console.log(`❌ Issues found in: ${story.title}`);
        this.results.pagesWithErrors++;
      } else {
        console.log(`✅ Passed: ${story.title}`);
      }

      return storyResult;

    } catch (error) {
      console.log(`💥 Failed to test ${story.title}:`, error.message);

      const errorResult = {
        ...story,
        status: 'failed',
        error: error.message,
        stack: error.stack,
        testedAt: new Date().toISOString()
      };

      this.results.errors.push({
        type: 'navigation_error',
        text: `Failed to load ${story.title}: ${error.message}`,
        url: story.url,
        timestamp: new Date().toISOString()
      });

      return errorResult;
    }
  }

  async checkAllPagesAndTabs() {
    console.log('📖 Checking all documentation pages and tabs...');

    const docPages = [
      '/?path=/docs/introduction--docs',
      '/?path=/docs/getting-started--docs',
      '/?path=/docs/theming--docs',
      '/?path=/docs/usage-patterns--docs',
      '/?path=/docs/integration--docs',
      '/?path=/docs/testing--docs'
    ];

    for (const pageUrl of docPages) {
      try {
        await this.page.goto(`${this.storybookUrl}${pageUrl}`, { waitUntil: 'networkidle2' });
        await this.page.waitForTimeout(3000);

        // Check for tabs and click through them
        const tabs = await this.page.evaluate(() => {
          const tabElements = document.querySelectorAll('[role="tab"], button[class*="tab"]');
          return Array.from(tabElements).map(tab => ({
            text: tab.textContent?.trim(),
            element: tab.tagName + (tab.className ? '.' + tab.className.split(' ').join('.') : '')
          }));
        });

        console.log(`📑 Found ${tabs.length} tabs on ${pageUrl}`);

        // Test each tab
        for (const tab of tabs) {
          try {
            await this.page.evaluate((tabText) => {
              const tabElement = Array.from(document.querySelectorAll('[role="tab"], button[class*="tab"]'))
                .find(el => el.textContent?.trim() === tabText);
              if (tabElement) tabElement.click();
            }, tab.text);

            await this.page.waitForTimeout(2000);
            console.log(`  ✓ Tab: ${tab.text}`);
          } catch (tabError) {
            console.log(`  ❌ Tab error: ${tab.text} - ${tabError.message}`);
          }
        }

      } catch (error) {
        console.log(`❌ Page error: ${pageUrl} - ${error.message}`);
      }
    }
  }

  async runComprehensiveTest() {
    try {
      await this.initialize();

      // Discover all stories
      const stories = await this.discoverAllStories();
      this.results.totalPages = stories.length;

      console.log(`\n🎯 Starting comprehensive regression test of ${stories.length} stories...\n`);

      const storyResults = [];

      // Test each story
      for (let i = 0; i < stories.length; i++) {
        const story = stories[i];
        console.log(`\n[${i + 1}/${stories.length}] Testing story: ${story.title}`);

        const result = await this.testStory(story);
        storyResults.push(result);

        // Small delay between tests
        await this.page.waitForTimeout(1000);
      }

      // Check documentation pages and tabs
      await this.checkAllPagesAndTabs();

      // Final results
      this.results.totalErrors = this.results.errors.length;
      this.results.storyResults = storyResults;
      this.results.completedAt = new Date().toISOString();

      console.log('\n🏁 Testing completed!');

      return this.results;

    } catch (error) {
      console.error('💥 Test suite failed:', error);
      throw error;
    }
  }

  async generateReport() {
    const reportPath = path.join(__dirname, 'storybook-regression-report.json');
    const htmlReportPath = path.join(__dirname, 'storybook-regression-report.html');

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    // Generate HTML report
    const htmlReport = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlReport);

    console.log(`📊 Reports generated:`);
    console.log(`  JSON: ${reportPath}`);
    console.log(`  HTML: ${htmlReportPath}`);

    // Print summary
    console.log('\n📈 REGRESSION TEST SUMMARY:');
    console.log(`  Total Stories Tested: ${this.results.totalPages}`);
    console.log(`  Pages with Errors: ${this.results.pagesWithErrors}`);
    console.log(`  Total Console Errors: ${this.results.totalErrors}`);
    console.log(`  Total Warnings: ${this.results.warnings.length}`);
    console.log(`  Navigation Errors: ${this.results.navigationErrors.length}`);

    if (this.results.errors.length > 0) {
      console.log('\n🚨 CRITICAL ERRORS FOUND:');
      this.results.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. [${error.type.toUpperCase()}] ${error.text}`);
        if (error.url) console.log(`     URL: ${error.url}`);
        if (error.line) console.log(`     Line: ${error.line}`);
      });
    }

    return { reportPath, htmlReportPath };
  }

  generateHTMLReport() {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Storybook Regression Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
        .header { background: #f6f8fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #0969da; }
        .metric.error { border-left-color: #cf222e; }
        .metric.warning { border-left-color: #f85149; }
        .error-item { background: #ffebe9; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #cf222e; }
        .warning-item { background: #fff8c5; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #d29922; }
        .story-item { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; border: 1px solid #d0d7de; }
        .story-item.error { border-color: #cf222e; }
        pre { background: #f6f8fa; padding: 10px; border-radius: 4px; overflow-x: auto; }
        .tabs { display: flex; margin-bottom: 20px; }
        .tab { padding: 10px 20px; background: #f6f8fa; border: 1px solid #d0d7de; cursor: pointer; }
        .tab.active { background: white; border-bottom-color: white; }
        .content { display: none; }
        .content.active { display: block; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧪 Storybook Regression Test Report</h1>
        <p>Generated: ${new Date(this.results.timestamp).toLocaleString()}</p>
        <p>Test Duration: ${this.results.completedAt ?
          Math.round((new Date(this.results.completedAt) - new Date(this.results.timestamp)) / 1000) : 'N/A'} seconds</p>
    </div>

    <div class="summary">
        <div class="metric">
            <h3>${this.results.totalPages}</h3>
            <p>Total Stories Tested</p>
        </div>
        <div class="metric error">
            <h3>${this.results.pagesWithErrors}</h3>
            <p>Pages with Errors</p>
        </div>
        <div class="metric error">
            <h3>${this.results.totalErrors}</h3>
            <p>Total Console Errors</p>
        </div>
        <div class="metric warning">
            <h3>${this.results.warnings.length}</h3>
            <p>Total Warnings</p>
        </div>
    </div>

    <div class="tabs">
        <div class="tab active" onclick="showTab('errors')">Console Errors (${this.results.errors.length})</div>
        <div class="tab" onclick="showTab('warnings')">Warnings (${this.results.warnings.length})</div>
        <div class="tab" onclick="showTab('stories')">Story Results (${this.results.storyResults?.length || 0})</div>
        <div class="tab" onclick="showTab('navigation')">Navigation Errors (${this.results.navigationErrors.length})</div>
    </div>

    <div id="errors" class="content active">
        <h2>🚨 Console Errors</h2>
        ${this.results.errors.map(error => `
            <div class="error-item">
                <strong>[${error.type.toUpperCase()}]</strong> ${error.text}
                ${error.url ? `<br><small>URL: ${error.url}</small>` : ''}
                ${error.line ? `<br><small>Line: ${error.line}</small>` : ''}
                <pre>${error.stack || error.text}</pre>
            </div>
        `).join('') || '<p>No console errors found! ✅</p>'}
    </div>

    <div id="warnings" class="content">
        <h2>⚠️ Warnings</h2>
        ${this.results.warnings.map(warning => `
            <div class="warning-item">
                <strong>[${warning.type.toUpperCase()}]</strong> ${warning.text}
                ${warning.url ? `<br><small>URL: ${warning.url}</small>` : ''}
            </div>
        `).join('') || '<p>No warnings found! ✅</p>'}
    </div>

    <div id="stories" class="content">
        <h2>📚 Story Results</h2>
        ${this.results.storyResults?.map(story => `
            <div class="story-item ${story.status === 'error' ? 'error' : ''}">
                <h4>${story.title} - ${story.status.toUpperCase()}</h4>
                <p>Category: ${story.category} | URL: ${story.url}</p>
                <p>Has Content: ${story.hasContent} | Has Code Variations: ${story.hasCodeVariations}</p>
                ${story.renderError ? `<p style="color: red;">Render Error: ${story.renderError}</p>` : ''}
                ${story.error ? `<p style="color: red;">Error: ${story.error}</p>` : ''}
            </div>
        `).join('') || '<p>No story results available.</p>'}
    </div>

    <div id="navigation" class="content">
        <h2>🧭 Navigation Errors</h2>
        ${this.results.navigationErrors.map(error => `
            <div class="error-item">
                <strong>Failed to load:</strong> ${error.url}<br>
                <small>Error: ${error.error}</small>
            </div>
        `).join('') || '<p>No navigation errors found! ✅</p>'}
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

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function runRegressionTests() {
  const tester = new StorybookRegressionTester();

  try {
    console.log('🚀 Starting Storybook Regression Testing Suite...\n');

    const results = await tester.runComprehensiveTest();
    const { reportPath, htmlReportPath } = await tester.generateReport();

    console.log('\n✅ Regression testing completed successfully!');
    console.log(`📊 View the HTML report: file://${htmlReportPath}`);

    // Exit with error code if issues found
    if (results.totalErrors > 0) {
      console.log('\n❌ Regression tests found issues that need to be addressed.');
      process.exit(1);
    } else {
      console.log('\n🎉 All regression tests passed!');
      process.exit(0);
    }

  } catch (error) {
    console.error('💥 Regression testing failed:', error);
    process.exit(1);
  } finally {
    await tester.cleanup();
  }
}

// Run if called directly
if (require.main === module) {
  runRegressionTests();
}

module.exports = { StorybookRegressionTester };