/**
 * Production Storybook Debugging Tool
 *
 * This script helps identify JavaScript runtime errors that might be causing
 * "No Preview" issues in the production Storybook deployment.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

class ProductionStorybookDebugger {
  constructor() {
    this.productionUrl = 'https://cin7-dsl.netlify.app/storybook/';
    this.results = {
      timestamp: new Date().toISOString(),
      pages: [],
      consoleErrors: [],
      networkErrors: [],
      renderingIssues: []
    };
  }

  async debugPage(url, pageTitle) {
    console.log(`🔍 Debugging: ${pageTitle}`);
    console.log(`   URL: ${url}`);

    const browser = await puppeteer.launch({
      headless: false, // Set to true for headless mode
      devtools: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();

      // Enhanced console logging
      const pageErrors = [];
      const consoleMessages = [];
      const networkErrors = [];

      page.on('console', (msg) => {
        const type = msg.type();
        const text = msg.text();
        const location = msg.location();

        consoleMessages.push({
          type,
          text,
          url: location?.url,
          line: location?.lineNumber,
          timestamp: new Date().toISOString()
        });

        if (type === 'error') {
          console.log(`❌ CONSOLE ERROR: ${text}`);
          if (location) console.log(`   Location: ${location.url}:${location.lineNumber}`);
        } else if (type === 'warning') {
          console.log(`⚠️  CONSOLE WARNING: ${text}`);
        }
      });

      page.on('pageerror', (error) => {
        console.log(`💥 PAGE ERROR: ${error.message}`);
        pageErrors.push({
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString()
        });
      });

      page.on('requestfailed', (request) => {
        const failure = request.failure();
        console.log(`🌐 NETWORK ERROR: ${request.url()} - ${failure?.errorText}`);
        networkErrors.push({
          url: request.url(),
          error: failure?.errorText,
          timestamp: new Date().toISOString()
        });
      });

      // Navigate to the page
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for content to load
      await page.waitForTimeout(5000);

      // Check for "No Preview" text
      const hasNoPreview = await page.evaluate(() => {
        const body = document.body.textContent || '';
        return body.includes('No Preview') || body.includes('no preview');
      });

      // Check for story content
      const hasStoryContent = await page.evaluate(() => {
        const canvas = document.querySelector('#storybook-root, #storybook-preview-wrapper');
        if (!canvas) return false;

        // Check if canvas has children beyond just error messages
        const hasChildren = canvas.children.length > 0;
        const hasContent = canvas.textContent && canvas.textContent.trim().length > 10;

        return hasChildren && hasContent;
      });

      // Take screenshot for visual verification
      const screenshot = await page.screenshot({
        encoding: 'base64',
        fullPage: false
      });

      const pageResult = {
        url,
        pageTitle,
        status: hasNoPreview ? 'FAILED' : (hasStoryContent ? 'SUCCESS' : 'UNCLEAR'),
        hasNoPreview,
        hasStoryContent,
        consoleErrors: consoleMessages.filter(m => m.type === 'error'),
        consoleWarnings: consoleMessages.filter(m => m.type === 'warning'),
        pageErrors,
        networkErrors,
        screenshot: `data:image/png;base64,${screenshot}`,
        testedAt: new Date().toISOString()
      };

      this.results.pages.push(pageResult);

      console.log(`   Status: ${pageResult.status}`);
      console.log(`   Has Content: ${pageResult.hasStoryContent}`);
      console.log(`   Console Errors: ${pageResult.consoleErrors.length}`);
      console.log(`   Network Errors: ${pageResult.networkErrors.length}`);

      await browser.close();
      return pageResult;

    } catch (error) {
      console.log(`💥 Failed to debug ${pageTitle}: ${error.message}`);
      await browser.close();

      const errorResult = {
        url,
        pageTitle,
        status: 'ERROR',
        error: error.message,
        stack: error.stack,
        testedAt: new Date().toISOString()
      };

      this.results.pages.push(errorResult);
      return errorResult;
    }
  }

  async runDebugSession() {
    console.log('🚀 Starting Production Storybook Debugging Session...\n');

    const pagesToTest = [
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-ui-patterns-usage-patterns--docs`,
        title: 'UI Patterns - Usage Patterns'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-enterprise-components-extjs-advanced-forms--docs`,
        title: 'ExtJS - Advanced Forms'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-enterprise-components-extjs-chart-integration--docs`,
        title: 'ExtJS - Chart Integration'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-enterprise-components-extjs-form-panel--docs`,
        title: 'ExtJS - Form Panel'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-enterprise-components-extjs-tree-panel--docs`,
        title: 'ExtJS - Tree Panel'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-data-visualization-area-chart--docs`,
        title: 'Area Chart Documentation'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-business-patterns-vanilla-js-dom-utilities--docs`,
        title: 'Vanilla JS - DOM Utilities'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-theming-documentation--docs`,
        title: 'Theming Documentation'
      },
      {
        url: `${this.productionUrl}?path=/docs/cin7-dsl-theming-theme-playground--docs`,
        title: 'Theme Playground'
      },
      {
        url: `${this.productionUrl}?path=/story/cin7-dsl-charts-linechart--default`,
        title: 'LineChart - Default (Story)'
      },
      {
        url: `${this.productionUrl}?path=/story/cin7-dsl-navigation-breadcrumbs--default`,
        title: 'Breadcrumbs - Default (Story)'
      }
    ];

    for (const page of pagesToTest) {
      await this.debugPage(page.url, page.title);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    this.results.completedAt = new Date().toISOString();
    await this.generateDebugReport();
  }

  async generateDebugReport() {
    const reportPath = './storybook-debug-report.json';
    const htmlReportPath = './storybook-debug-report.html';

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    // Generate HTML report
    const htmlContent = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlContent);

    console.log('\n📊 Debug reports generated:');
    console.log(`  JSON: ${reportPath}`);
    console.log(`  HTML: ${htmlReportPath}`);

    // Print summary
    const successCount = this.results.pages.filter(p => p.status === 'SUCCESS').length;
    const failedCount = this.results.pages.filter(p => p.status === 'FAILED').length;
    const errorCount = this.results.pages.filter(p => p.status === 'ERROR').length;

    console.log('\n📈 DEBUG SUMMARY:');
    console.log(`  Success: ${successCount}`);
    console.log(`  Failed (No Preview): ${failedCount}`);
    console.log(`  Errors: ${errorCount}`);
    console.log(`  Total Tested: ${this.results.pages.length}`);

    if (failedCount > 0 || errorCount > 0) {
      console.log('\n🚨 ISSUES FOUND:');
      this.results.pages.forEach(page => {
        if (page.status !== 'SUCCESS') {
          console.log(`\n❌ ${page.pageTitle}`);
          console.log(`   Status: ${page.status}`);
          if (page.error) console.log(`   Error: ${page.error}`);
          if (page.consoleErrors.length > 0) {
            console.log(`   Console Errors: ${page.consoleErrors.length}`);
            page.consoleErrors.forEach(err => console.log(`     - ${err.text}`));
          }
          if (page.networkErrors.length > 0) {
            console.log(`   Network Errors: ${page.networkErrors.length}`);
            page.networkErrors.forEach(err => console.log(`     - ${err.url}: ${err.error}`));
          }
        }
      });
    }

    return { reportPath, htmlReportPath };
  }

  generateHTMLReport() {
    const successPages = this.results.pages.filter(p => p.status === 'SUCCESS');
    const failedPages = this.results.pages.filter(p => p.status === 'FAILED');
    const errorPages = this.results.pages.filter(p => p.status === 'ERROR');

    return `
<!DOCTYPE html>
<html>
<head>
    <title>Storybook Production Debug Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { background: #2c3e50; color: white; padding: 30px; border-radius: 12px; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: white; padding: 20px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .metric.success { border-left: 4px solid #27ae60; }
        .metric.failed { border-left: 4px solid #e74c3c; }
        .metric.error { border-left: 4px solid #c0392b; }
        .page-item { background: white; margin: 15px 0; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .page-item.success { border-left: 4px solid #27ae60; }
        .page-item.failed { border-left: 4px solid #e74c3c; }
        .page-item.error { border-left: 4px solid #c0392b; }
        .status { padding: 4px 12px; border-radius: 12px; color: white; font-size: 0.8em; font-weight: bold; }
        .status.success { background: #27ae60; }
        .status.failed { background: #e74c3c; }
        .status.error { background: #c0392b; }
        .error-details { background: #f8d7da; padding: 10px; border-radius: 4px; margin: 10px 0; font-family: monospace; font-size: 0.9em; }
        .tabs { display: flex; margin-bottom: 20px; }
        .tab { padding: 12px 24px; background: white; border: 1px solid #ddd; cursor: pointer; border-radius: 4px 4px 0 0; }
        .tab.active { background: #3498db; color: white; }
        .content { display: none; background: white; padding: 20px; border-radius: 0 8px 8px 8px; }
        .content.active { display: block; }
        pre { background: #2c3e50; color: #ecf0f1; padding: 15px; border-radius: 4px; overflow-x: auto; }
        .screenshot { max-width: 100%; border-radius: 4px; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔍 Storybook Production Debug Report</h1>
            <p>Generated: ${new Date(this.results.timestamp).toLocaleString()}</p>
            <p>Test Duration: ${this.results.completedAt ?
              Math.round((new Date(this.results.completedAt) - new Date(this.results.timestamp)) / 1000) : 'N/A'} seconds</p>
        </div>

        <div class="summary">
            <div class="metric success">
                <h3>${successPages.length}</h3>
                <p>Working Pages</p>
            </div>
            <div class="metric failed">
                <h3>${failedPages.length}</h3>
                <p>No Preview Pages</p>
            </div>
            <div class="metric error">
                <h3>${errorPages.length}</h3>
                <p>Error Pages</p>
            </div>
            <div class="metric">
                <h3>${this.results.pages.length}</h3>
                <p>Total Tested</p>
            </div>
        </div>

        <div class="tabs">
            <div class="tab active" onclick="showTab('overview')">Overview</div>
            <div class="tab" onclick="showTab('working')">Working (${successPages.length})</div>
            <div class="tab" onclick="showTab('failed')">Failed (${failedPages.length})</div>
            <div class="tab" onclick="showTab('errors')">Errors (${errorPages.length})</div>
        </div>

        <div id="overview" class="content active">
            <h2>📊 Debug Overview</h2>
            <p>This report shows the results of debugging the production Storybook deployment to identify why certain pages show "No Preview" errors.</p>

            ${failedPages.length > 0 ? `
                <div style="background: #fff5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #e74c3c; margin: 20px 0;">
                    <h3 style="color: #e74c3c; margin-top: 0;">🚨 Issues Found</h3>
                    <p><strong>${failedPages.length}</strong> pages are showing "No Preview" errors that need to be investigated.</p>
                </div>
            ` : ''}
        </div>

        <div id="working" class="content">
            <h2>✅ Working Pages</h2>
            ${successPages.map(page => `
                <div class="page-item success">
                    <h4>${page.pageTitle} <span class="status success">WORKING</span></h4>
                    <p><strong>URL:</strong> <a href="${page.url}" target="_blank">${page.url}</a></p>
                    <p><strong>Status:</strong> Content is loading and rendering properly</p>
                </div>
            `).join('') || '<p>No working pages found.</p>'}
        </div>

        <div id="failed" class="content">
            <h2>❌ Failed Pages (No Preview)</h2>
            ${failedPages.map(page => `
                <div class="page-item failed">
                    <h4>${page.pageTitle} <span class="status failed">NO PREVIEW</span></h4>
                    <p><strong>URL:</strong> <a href="${page.url}" target="_blank">${page.url}</a></p>
                    ${page.consoleErrors.length > 0 ? `
                        <div class="error-details">
                            <strong>Console Errors:</strong>
                            ${page.consoleErrors.map(err => `<div>${err.text}</div>`).join('')}
                        </div>
                    ` : ''}
                    ${page.networkErrors.length > 0 ? `
                        <div class="error-details">
                            <strong>Network Errors:</strong>
                            ${page.networkErrors.map(err => `<div>${err.url}: ${err.error}</div>`).join('')}
                        </div>
                    ` : ''}
                    ${page.screenshot ? `<img src="${page.screenshot}" class="screenshot" alt="Screenshot">` : ''}
                </div>
            `).join('') || '<p>No failed pages found! 🎉</p>'}
        </div>

        <div id="errors" class="content">
            <h2>💥 Error Pages</h2>
            ${errorPages.map(page => `
                <div class="page-item error">
                    <h4>${page.pageTitle} <span class="status error">ERROR</span></h4>
                    <p><strong>URL:</strong> <a href="${page.url}" target="_blank">${page.url}</a></p>
                    <div class="error-details">
                        <strong>Error:</strong> ${page.error}
                        ${page.stack ? `<pre>${page.stack}</pre>` : ''}
                    </div>
                </div>
            `).join('') || '<p>No error pages found! 🎉</p>'}
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
async function runProductionDebug() {
  const storybookDebugger = new ProductionStorybookDebugger();

  try {
    await storybookDebugger.runDebugSession();
    console.log('\n✅ Production debugging completed!');

    const failedCount = storybookDebugger.results.pages.filter(p => p.status === 'FAILED' || p.status === 'ERROR').length;
    if (failedCount > 0) {
      console.log('\n❌ Issues found. Check the HTML report for detailed analysis.');
      process.exit(1);
    } else {
      console.log('\n🎉 All pages are working correctly!');
      process.exit(0);
    }

  } catch (error) {
    console.error('💥 Production debugging failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runProductionDebug();
}

module.exports = { ProductionStorybookDebugger };