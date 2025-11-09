/**
 * URL-based Storybook Regression Testing Suite
 * Uses HTTP requests and systematic URL checking instead of browser automation
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class URLBasedRegressionTester {
  constructor() {
    this.storybookUrl = 'http://localhost:6006';
    this.results = {
      timestamp: new Date().toISOString(),
      testResults: [],
      navigationErrors: [],
      missingVariations: [],
      consoleErrors: [],
      summary: {
        totalStories: 0,
        passedStories: 0,
        failedStories: 0,
        totalErrors: 0,
        totalWarnings: 0
      },
      completedAt: null
    };
  }

  async checkStorybookHealth() {
    console.log('🏥 Checking Storybook health...');

    try {
      const response = await this.makeRequest(this.storybookUrl);
      if (response.statusCode === 200) {
        console.log('✅ Storybook is running and accessible');
        return true;
      } else {
        console.log(`❌ Storybook returned status: ${response.statusCode}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Cannot reach Storybook: ${error.message}`);
      return false;
    }
  }

  makeRequest(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.startsWith('https:') ? https : http;
      const request = protocol.get(url, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => resolve({ statusCode: response.statusCode, data }));
      });

      request.on('error', reject);
      request.setTimeout(10000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  async discoverStories() {
    console.log('🔍 Discovering all stories...');

    try {
      // Use curl to get the main page and extract story URLs
      const { stdout } = await execAsync(`curl -s "${this.storybookUrl}" | grep -o 'href="[^"]*story[^"]*"' | sed 's/href="//;s/"//'`);

      const storyUrls = stdout.split('\n')
        .filter(url => url.includes('/story/'))
        .map(url => url.startsWith('/') ? url : `/${url}`);

      // Also get docs
      const { stdout: docStdout } = await execAsync(`curl -s "${this.storybookUrl}" | grep -o 'href="[^"]*docs[^"]*"' | sed 's/href="//;s/"//'`);

      const docUrls = docStdout.split('\n')
        .filter(url => url.includes('/docs/'))
        .map(url => url.startsWith('/') ? url : `/${url}`);

      const allUrls = [...storyUrls, ...docUrls];

      console.log(`📚 Found ${storyUrls.length} stories and ${docUrls.length} docs (${allUrls.length} total)`);
      this.results.summary.totalStories = allUrls.length;

      return allUrls.map((url, index) => ({
        id: index + 1,
        url: url,
        title: this.extractTitleFromUrl(url),
        category: url.includes('/story/') ? 'stories' : 'docs'
      }));

    } catch (error) {
      console.log('❌ Failed to discover stories:', error.message);

      // Fallback: try known story paths
      const fallbackStories = [
        '/?path=/story/introduction--docs',
        '/?path=/story/cin7-dsl-introduction-component-selection--navigation-selection',
        '/?path=/story/cin7-dsl-charts-linechart--default',
        '/?path=/story/cin7-dsl-charts-barchart--default',
        '/?path=/story/cin7-dsl-charts-piechart--default',
        '/?path=/story/cin7-dsl-navigation-breadcrumbs--default',
        '/?path=/story/cin7-dsl-navigation-breadcrumbs--interactive',
        '/?path=/story/cin7-dsl-navigation-breadcrumbs--with-navigation',
        '/?path=/story/cin7-dsl-navigation-breadcrumbs--admin-panel',
        '/?path=/story/cin7-dsl-navigation-breadcrumbs--page-with-tabs',
        '/?path=/story/cin7-dsl-theming-theme-playground--playground',
        '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--overview',
        '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--form-patterns',
        '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--dashboard-patterns',
        '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--table-patterns',
        '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--modal-patterns',
        '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--loading-patterns',
        '/?path=/story/components-button--primary',
        '/?path=/story/components-card--default',
        '/?path=/story/components-text-field--default',
        '/?path=/story/components-badge--default',
        '/?path=/story/components-data-table--default',
        '/?path=/docs/getting-started--docs',
        '/?path=/docs/theming--docs',
        '/?path=/docs/usage-patterns--docs',
        '/?path=/docs/integration--docs',
        '/?path=/docs/testing--docs'
      ];

      console.log(`📚 Using ${fallbackStories.length} fallback story URLs`);
      this.results.summary.totalStories = fallbackStories.length;

      return fallbackStories.map((url, index) => ({
        id: index + 1,
        url: url,
        title: this.extractTitleFromUrl(url),
        category: url.includes('/story/') ? 'stories' : 'docs'
      }));
    }
  }

  extractTitleFromUrl(url) {
    const match = url.match(/\/story\/([^?]+)/) || url.match(/\/docs\/([^?]+)/);
    if (match) {
      return match[1].replace(/--/g, ' ').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return 'Unknown Story';
  }

  async testStory(story) {
    console.log(`🧪 Testing [${story.id}/${this.results.summary.totalStories}]: ${story.title}`);

    const testResult = {
      ...story,
      status: 'pending',
      responseCode: null,
      loadTime: 0,
      errors: [],
      hasContent: false,
      hasCodeVariants: false,
      testedAt: new Date().toISOString()
    };

    const startTime = Date.now();

    try {
      const testUrl = `${this.storybookUrl}${story.url}`;

      // Make HTTP request to test the story
      const response = await this.makeRequest(testUrl);
      testResult.responseCode = response.statusCode;
      testResult.loadTime = Date.now() - startTime;

      if (response.statusCode === 200) {
        testResult.status = 'passed';
        this.results.summary.passedStories++;

        // Check for known error patterns in the response
        const errorPatterns = [
          /Cannot destructure property 'content' of 'undefined'/,
          /ReferenceError: (\w+) is not defined/,
          /TypeError: (\w+) is not a function/,
          /TypeError: Cannot read propert(y|ies) of (undefined|null)/,
          /Error: Module build failed/,
          /SyntaxError: Unexpected token/,
          /RangeError: Maximum call stack size exceeded/
        ];

        for (const pattern of errorPatterns) {
          if (pattern.test(response.data)) {
            testResult.status = 'failed';
            testResult.errors.push({
              type: 'runtime_error',
              message: `Detected error pattern: ${pattern.source}`,
              severity: 'high'
            });
            this.results.summary.totalErrors++;
            this.results.summary.failedStories++;
            this.results.summary.passedStories--;
            break;
          }
        }

        // Check for code variants
        testResult.hasCodeVariants = response.data.includes('code-variants') ||
                                  response.data.includes('codeVariants') ||
                                  response.data.includes('data-testid="code-variants"');

        // Basic content check
        testResult.hasContent = response.data.includes('id="storybook-root"') ||
                               response.data.includes('id="storybook-preview-wrapper"') ||
                               response.data.includes('class="sb-preview-main"');

        console.log(`✅ Passed: ${story.title} (${testResult.loadTime}ms)${testResult.hasCodeVariants ? ' 📝' : ''}`);
      } else {
        testResult.status = 'failed';
        testResult.errors.push({
          type: 'http_error',
          message: `HTTP ${response.statusCode}`,
          severity: 'high'
        });
        this.results.summary.failedStories++;
        this.results.summary.totalErrors++;
        console.log(`❌ Failed: ${story.title} - HTTP ${response.statusCode}`);
      }

    } catch (error) {
      testResult.status = 'error';
      testResult.errors.push({
        type: 'network_error',
        message: error.message,
        severity: 'high'
      });
      testResult.loadTime = Date.now() - startTime;
      this.results.summary.failedStories++;
      this.results.summary.totalErrors++;
      console.log(`💥 Error: ${story.title} - ${error.message}`);
    }

    this.results.testResults.push(testResult);
    return testResult;
  }

  async runAllTests() {
    try {
      console.log('🎯 Starting URL-based Storybook regression testing...\n');

      // Check if Storybook is running
      const isHealthy = await this.checkStorybookHealth();
      if (!isHealthy) {
        throw new Error('Storybook is not accessible');
      }

      // Discover all stories
      const stories = await this.discoverStories();

      if (stories.length === 0) {
        console.log('⚠️ No stories found to test');
        return this.results;
      }

      console.log(`\n🧪 Testing ${stories.length} stories and documentation pages...\n`);

      // Test each story with a small delay between requests
      for (const story of stories) {
        await this.testStory(story);
        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      this.results.completedAt = new Date().toISOString();

      console.log('\n🏁 All tests completed!');
      console.log(`📊 Summary: ${this.results.summary.passedStories} passed, ${this.results.summary.failedStories} failed`);
      console.log(`⏱️ Total test time: ${this.results.testResults.reduce((sum, test) => sum + test.loadTime, 0)}ms`);

      // Generate reports
      await this.generateReport();

      return this.results;

    } catch (error) {
      console.error('💥 Test suite failed:', error);
      throw error;
    }
  }

  async generateReport() {
    const reportPath = path.join(__dirname, 'url-regression-results.json');
    const htmlReportPath = path.join(__dirname, 'url-regression-results.html');

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    // Generate HTML report
    const htmlContent = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlContent);

    console.log(`\n📊 Reports generated:`);
    console.log(`  JSON: ${reportPath}`);
    console.log(`  HTML: ${htmlReportPath}`);

    // Print critical issues
    const failedTests = this.results.testResults.filter(r => r.status === 'failed' || r.status === 'error');
    if (failedTests.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES FOUND:');
      failedTests.forEach((result, index) => {
        console.log(`\n${index + 1}. ${result.title}`);
        console.log(`   Status: ${result.status.toUpperCase()}`);
        console.log(`   URL: ${result.url}`);
        if (result.errors.length > 0) {
          result.errors.forEach(error => console.log(`   - ${error.type}: ${error.message}`));
        }
        if (result.responseCode) console.log(`   HTTP Status: ${result.responseCode}`);
      });
    }

    // Check for missing code variations
    const storiesWithoutVariations = this.results.testResults.filter(r => r.category === 'stories' && !r.hasCodeVariants);
    if (storiesWithoutVariations.length > 0) {
      console.log('\n📝 STORIES MISSING CODE VARIATIONS:');
      storiesWithoutVariations.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title}`);
      });
    }

    return { reportPath, htmlReportPath };
  }

  generateHTMLReport() {
    const passedTests = this.results.testResults.filter(r => r.status === 'passed');
    const failedTests = this.results.testResults.filter(r => r.status === 'failed' || r.status === 'error');
    const storiesWithoutVariations = this.results.testResults.filter(r => r.category === 'stories' && !r.hasCodeVariants);

    const successRate = this.results.summary.totalStories > 0 ?
      ((this.results.summary.passedStories / this.results.summary.totalStories) * 100).toFixed(1) : 0;

    return `
<!DOCTYPE html>
<html>
<head>
    <title>Storybook URL Regression Report</title>
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
        .metric.info { border-left: 4px solid #17a2b8; }
        .test-item { background: white; margin: 10px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .test-item.passed { border-left: 4px solid #28a745; }
        .test-item.failed { border-left: 4px solid #dc3545; }
        .test-item.error { border-left: 4px solid #dc3545; }
        .status { padding: 4px 12px; border-radius: 12px; color: white; font-size: 0.8em; font-weight: bold; text-transform: uppercase; }
        .status.passed { background: #28a745; }
        .status.failed { background: #dc3545; }
        .status.error { background: #dc3545; }
        .error-details { background: #f8d7da; padding: 10px; border-radius: 4px; margin: 10px 0; border-left: 3px solid #dc3545; }
        .warning-details { background: #fff3cd; padding: 10px; border-radius: 4px; margin: 10px 0; border-left: 3px solid #ffc107; }
        .info-details { background: #d1ecf1; padding: 10px; border-radius: 4px; margin: 10px 0; border-left: 3px solid #17a2b8; }
        .tabs { display: flex; margin-bottom: 20px; }
        .tab { padding: 12px 24px; background: white; border: 1px solid #ddd; cursor: pointer; border-radius: 4px 4px 0 0; margin-right: 4px; }
        .tab.active { background: #007bff; color: white; border-color: #007bff; }
        .content { display: none; background: white; padding: 20px; border-radius: 0 8px 8px 8px; min-height: 400px; }
        .content.active { display: block; }
        pre { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; font-size: 0.9em; }
        .stats { display: flex; justify-content: space-between; align-items: center; margin: 10px 0; flex-wrap: wrap; }
        .timestamp { color: #666; font-size: 0.9em; }
        .badge { background: #007bff; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin-left: 8px; }
        .load-time { color: #28a745; font-weight: bold; }
        .url { color: #6c757d; font-family: monospace; font-size: 0.9em; word-break: break-all; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔗 Storybook URL Regression Test Report</h1>
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
            <div class="metric info">
                <h3>${successRate}%</h3>
                <p>Success Rate</p>
            </div>
        </div>

        <div class="tabs">
            <div class="tab active" onclick="showTab('overview')">Overview</div>
            <div class="tab" onclick="showTab('passed')">Passed (${passedTests.length})</div>
            <div class="tab" onclick="showTab('failed')">Failed (${failedTests.length})</div>
            <div class="tab" onclick="showTab('variations')">Missing Variations (${storiesWithoutVariations.length})</div>
        </div>

        <div id="overview" class="content active">
            <h2>📊 Test Overview</h2>
            <div class="stats">
                <span>Success Rate: <strong>${successRate}%</strong></span>
                <span>Total Test Time: <strong>${this.results.testResults.reduce((sum, test) => sum + test.loadTime, 0)}ms</strong></span>
                <span>Average Load Time: <strong>${this.results.testResults.length > 0 ? Math.round(this.results.testResults.reduce((sum, test) => sum + test.loadTime, 0) / this.results.testResults.length) : 0}ms</strong></span>
            </div>

            <h3>📈 Test Results by Category</h3>
            ${Object.entries(
              this.results.testResults.reduce((acc, test) => {
                acc[test.category] = (acc[test.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([category, count]) => `<p>${category.charAt(0).toUpperCase() + category.slice(1)}: <strong>${count}</strong> items</p>`).join('')}

            ${failedTests.length > 0 ? `
                <h3 style="color: #dc3545;">🚨 Critical Issues Summary</h3>
                <div class="error-details">
                    <strong>${failedTests.length}</strong> tests failed with critical errors that need immediate attention.
                    <br><a href="#failed" onclick="showTab('failed')">View Failed Tests →</a>
                </div>
            ` : ''}

            ${storiesWithoutVariations.length > 0 ? `
                <h3 style="color: #ffc107;">📝 Code Variations Missing</h3>
                <div class="warning-details">
                    <strong>${storiesWithoutVariations.length}</strong> stories are missing code variations.
                    <br><a href="#variations" onclick="showTab('variations')">View Missing Variations →</a>
                </div>
            ` : ''}
        </div>

        <div id="passed" class="content">
            <h2>✅ Passed Tests</h2>
            ${passedTests.map(test => `
                <div class="test-item passed">
                    <h4>${test.title} <span class="status passed">Passed</span> ${test.hasCodeVariants ? '<span class="badge">📝 Has Variations</span>' : ''}</h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>Load Time: <span class="load-time">${test.loadTime}ms</span></span>
                        <span>Has Content: ${test.hasContent ? '✅' : '❌'}</span>
                    </div>
                    <div class="url">URL: ${this.storybookUrl}${test.url}</div>
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
                        <span>HTTP Status: <strong>${test.responseCode || 'N/A'}</strong></span>
                        <span>Load Time: ${test.loadTime}ms</span>
                    </div>
                    <div class="url">URL: ${this.storybookUrl}${test.url}</div>
                    ${test.errors.length > 0 ? `
                        <div class="error-details">
                            <strong>Errors:</strong>
                            <ul>${test.errors.map(err => `<li><strong>${err.type}:</strong> ${err.message}</li>`).join('')}</ul>
                        </div>
                    ` : ''}
                </div>
            `).join('') || '<p>No failed tests found! 🎉</p>'}
        </div>

        <div id="variations" class="content">
            <h2>📝 Stories Missing Code Variations</h2>
            ${storiesWithoutVariations.map(test => `
                <div class="test-item">
                    <h4>${test.title}</h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>Status: <span class="status ${test.status}">${test.status}</span></span>
                    </div>
                    <div class="warning-details">
                        This story doesn't have code variations. Consider adding code examples for different implementation patterns.
                    </div>
                    <div class="url">URL: ${this.storybookUrl}${test.url}</div>
                </div>
            `).join('') || '<p>All stories have code variations! 🎉</p>'}
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
async function runURLRegressionTests() {
  const tester = new URLBasedRegressionTester();

  try {
    console.log('🔗 Starting URL-based Storybook Regression Testing Suite...\n');

    const results = await tester.runAllTests();

    if (results.summary.failedStories > 0) {
      console.log('\n❌ Some tests failed. Check the HTML report for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All tests passed!');
      process.exit(0);
    }

  } catch (error) {
    console.error('💥 URL regression testing failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runURLRegressionTests();
}

module.exports = { URLBasedRegressionTester };