#!/usr/bin/env node

/**
 * Comprehensive Storybook Component Testing Framework
 * Tests Frame and Breadcrumbs component variations with detailed debugging
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Component configurations
const FRAME_VARIATIONS = [
  'default',
  'with-logo',
  'with-notifications',
  'ecommerce-layout',
  'minimal-layout',
  'responsive-behavior'
];

const BREADCRUMBS_VARIATIONS = [
  'default',
  'short-path',
  'long-path',
  'product-navigation',
  'ecommerce-navigation',
  'admin-panel',
  'documentation-site'
  // Note: 'many-items' variation doesn't exist in the current codebase
];

// Test configuration
const BASE_URL = 'http://localhost:6006';
const TIMEOUT = 30000;
const RETRY_ATTEMPTS = 3;

class StorybookTester {
  constructor() {
    this.browser = null;
    this.results = {
      frame: {},
      breadcrumbs: {},
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        errors: [],
        startTime: new Date().toISOString(),
        endTime: null
      }
    };
  }

  async init() {
    console.log('🚀 Starting Storybook Component Testing Framework...');
    console.log(`📊 Base URL: ${BASE_URL}`);
    console.log(`⏱️  Timeout: ${TIMEOUT}ms`);
    console.log(`🔄 Retry attempts: ${RETRY_ATTEMPTS}`);
    console.log('');

    this.browser = await puppeteer.launch({
      headless: false, // Set to false for debugging
      defaultViewport: { width: 1200, height: 800 },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
  }

  async testComponent(componentName, variation) {
    const url = `${BASE_URL}/iframe.html?id=examples-${componentName}--${variation}&args=&viewMode=story`;
    const componentKey = componentName === 'frame' ? 'frame' : 'breadcrumbs';

    console.log(`🧪 Testing ${componentName} - ${variation}`);
    console.log(`   URL: ${url}`);

    const result = {
      variation,
      url,
      status: 'pending',
      httpResponse: null,
      errors: [],
      warnings: [],
      networkErrors: [],
      consoleOutput: [],
      renderStatus: null,
      visualElements: {},
      themeProvided: false,
      errorTypes: {
        theme: [],
        props: [],
        modules: [],
        rendering: [],
        network: []
      },
      retryCount: 0,
      loadTime: null,
      screenshots: {
        initial: null,
        final: null
      }
    };

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
      result.retryCount = attempt;

      try {
        const page = await this.browser.newPage();
        const startTime = Date.now();

        // Capture console output
        const consoleMessages = [];
        page.on('console', msg => {
          const message = {
            type: msg.type(),
            text: msg.text(),
            location: msg.location()
          };
          consoleMessages.push(message);

          if (msg.type() === 'error') {
            result.errors.push(message);
            this.categorizeError(message.text, result.errorTypes);
          } else if (msg.type() === 'warning') {
            result.warnings.push(message);
          }
        });

        // Capture network requests
        const networkErrors = [];
        page.on('requestfailed', request => {
          const failure = request.failure();
          networkErrors.push({
            url: request.url(),
            error: failure ? failure.errorText : 'Unknown error',
            method: request.method()
          });
        });
        result.networkErrors = networkErrors;

        // Set extra HTTP headers
        await page.setExtraHTTPHeaders({
          'Accept-Language': 'en-US,en;q=0.9',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        });

        try {
          // Navigate to the story
          const response = await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: TIMEOUT
          });

          result.httpResponse = {
            status: response.status(),
            statusText: response.statusText(),
            headers: response.headers()
          };

          // Take initial screenshot
          if (attempt === 1) {
            result.screenshots.initial = `screenshot-${componentName}-${variation}-initial.png`;
            await page.screenshot({
              path: path.join(__dirname, 'screenshots', result.screenshots.initial),
              fullPage: true
            });
          }

          // Wait for the component to potentially load
          await page.waitForTimeout(3000);

          // Check for specific error indicators in the page
          const errorChecks = await page.evaluate(() => {
            const checks = {
              hasErrorBoundary: !!document.querySelector('[data-testid="error-boundary"], div[style*="border: 2px solid red"], div[style*="border: 3px solid red"]'),
              hasNoPreview: !!document.querySelector('#storybook-preview-wrapper div:contains("No Preview")'),
              hasThemeError: !!document.querySelector('div:contains("No theme was provided")'),
              hasDestructureError: !!document.querySelector('div:contains("Cannot destructure property")'),
              hasPropTypesError: !!document.querySelector('div:contains("PropTypes")'),
              hasReactError: !!document.querySelector('div[role="alert"], .error-message'),
              frameComponent: !!document.querySelector('[data-testid="frame-component"], div[class*="Frame"]'),
              breadcrumbsComponent: !!document.querySelector('[data-testid="breadcrumbs-component"], nav[aria-label="breadcrumbs"], ol[class*="Breadcrumbs"]'),
              polarisComponents: !!document.querySelector('[class*="Polaris-"]'),
              appProvider: !!document.querySelector('[data-polaris-provider="true"]')
            };

            // Check for text content errors
            const bodyText = document.body.innerText;
            checks.errorTexts = {
              noTheme: bodyText.includes('No theme was provided'),
              cannotDestructure: bodyText.includes('Cannot destructure property'),
              propTypes: bodyText.includes('PropTypes') && bodyText.includes('undefined'),
              noPreview: bodyText.includes('No Preview') || bodyText.includes('Unable to display'),
              renderError: bodyText.includes('render error') || bodyText.includes('failed to render')
            };

            return checks;
          });

          result.visualElements = errorChecks;

          // Check if theme is properly provided
          result.themeProvided = await page.evaluate(() => {
            return window.__POLARIS_THEME__ !== undefined ||
                   document.querySelector('[data-polaris-provider="true"]') !== null ||
                   document.querySelector('[class*="Polaris"]') !== null;
          });

          // Determine render status
          if (errorChecks.hasErrorBoundary ||
              errorChecks.errorTexts.noTheme ||
              errorChecks.errorTexts.cannotDestructure ||
              errorChecks.errorTexts.propTypes ||
              errorChecks.errorTexts.noPreview ||
              errorChecks.errorTexts.renderError) {
            result.renderStatus = 'failed';
          } else if (errorChecks.frameComponent || errorChecks.breadcrumbsComponent) {
            result.renderStatus = 'success';
          } else if (errorChecks.polarisComponents) {
            result.renderStatus = 'partial';
          } else {
            result.renderStatus = 'unknown';
          }

          // Take final screenshot
          result.screenshots.final = `screenshot-${componentName}-${variation}-final.png`;
          await page.screenshot({
            path: path.join(__dirname, 'screenshots', result.screenshots.final),
            fullPage: true
          });

          // Get page content for analysis
          const pageContent = await page.content();
          result.pageContentLength = pageContent.length;

          // Check for specific component elements
          if (componentName === 'frame') {
            const frameChecks = await page.evaluate(() => {
              return {
                hasTopBar: !!document.querySelector('[class*="TopBar"]'),
                hasNavigation: !!document.querySelector('[class*="Navigation"]'),
                hasFrame: !!document.querySelector('[class*="Frame"]'),
                hasLayout: !!document.querySelector('[class*="Layout"]'),
                hasPage: !!document.querySelector('[class*="Page"]')
              };
            });
            result.visualElements = { ...result.visualElements, ...frameChecks };
          } else if (componentName === 'breadcrumbs') {
            const breadcrumbChecks = await page.evaluate(() => {
              return {
                hasBreadcrumbList: !!document.querySelector('ol[aria-label="breadcrumbs"], nav[aria-label="breadcrumbs"]'),
                breadcrumbCount: document.querySelectorAll('ol[aria-label="breadcrumbs"] li, nav[aria-label="breadcrumbs"] li').length,
                hasLinks: !!document.querySelector('a[href]'),
                hasContent: !!document.querySelector('[class*="Breadcrumbs"]')
              };
            });
            result.visualElements = { ...result.visualElements, ...breadcrumbChecks };
          }

        } catch (navigationError) {
          result.errors.push({
            type: 'navigation',
            text: navigationError.message,
            stack: navigationError.stack
          });
          result.renderStatus = 'navigation_failed';
        }

        result.loadTime = Date.now() - startTime;
        result.consoleOutput = consoleMessages;

        await page.close();

        // Determine final status
        if (result.httpResponse && result.httpResponse.status === 200 && result.renderStatus === 'success') {
          result.status = 'passed';
          console.log(`   ✅ PASSED (${result.loadTime}ms)`);
          break;
        } else {
          result.status = 'failed';
          console.log(`   ❌ FAILED (attempt ${attempt}/${RETRY_ATTEMPTS})`);
          if (attempt < RETRY_ATTEMPTS) {
            console.log(`   🔄 Retrying...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }

      } catch (error) {
        result.errors.push({
          type: 'fatal',
          text: error.message,
          stack: error.stack
        });
        result.status = 'failed';
        result.renderStatus = 'crashed';
        console.log(`   💥 CRASHED: ${error.message}`);

        if (attempt < RETRY_ATTEMPTS) {
          console.log(`   🔄 Retrying...`);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    }

    console.log(`   📊 Status: ${result.status}`);
    console.log(`   🎨 Render: ${result.renderStatus}`);
    console.log(`   🌐 Theme: ${result.themeProvided ? '✅' : '❌'}`);
    console.log(`   📝 Errors: ${result.errors.length}`);
    console.log(`   ⚠️  Warnings: ${result.warnings.length}`);
    console.log(`   🌐 Network errors: ${result.networkErrors.length}`);
    console.log('');

    return result;
  }

  categorizeError(errorMessage, errorTypes) {
    const message = errorMessage.toLowerCase();

    if (message.includes('no theme') || message.includes('theme was provided')) {
      errorTypes.theme.push(errorMessage);
    } else if (message.includes('cannot destructure') || message.includes('property') && message.includes('undefined')) {
      errorTypes.props.push(errorMessage);
    } else if (message.includes('prop types') || message.includes('prop-types') || message.includes('module')) {
      errorTypes.modules.push(errorMessage);
    } else if (message.includes('render') || message.includes('element') || message.includes('component')) {
      errorTypes.rendering.push(errorMessage);
    } else if (message.includes('network') || message.includes('fetch') || message.includes('load')) {
      errorTypes.network.push(errorMessage);
    }
  }

  async runTests() {
    await this.init();

    // Create screenshots directory
    if (!fs.existsSync(path.join(__dirname, 'screenshots'))) {
      fs.mkdirSync(path.join(__dirname, 'screenshots'), { recursive: true });
    }

    console.log('🎯 Testing Frame Components...\n');
    for (const variation of FRAME_VARIATIONS) {
      const result = await this.testComponent('frame', variation);
      this.results.frame[variation] = result;
      this.results.summary.total++;
      if (result.status === 'passed') {
        this.results.summary.passed++;
      } else {
        this.results.summary.failed++;
        this.results.summary.errors.push({
          component: 'frame',
          variation,
          errors: result.errors,
          errorTypes: result.errorTypes
        });
      }
    }

    console.log('🍞 Testing Breadcrumbs Components...\n');
    for (const variation of BREADCRUMBS_VARIATIONS) {
      const result = await this.testComponent('breadcrumbs', variation);
      this.results.breadcrumbs[variation] = result;
      this.results.summary.total++;
      if (result.status === 'passed') {
        this.results.summary.passed++;
      } else {
        this.results.summary.failed++;
        this.results.summary.errors.push({
          component: 'breadcrumbs',
          variation,
          errors: result.errors,
          errorTypes: result.errorTypes
        });
      }
    }

    this.results.summary.endTime = new Date().toISOString();
    await this.generateReport();
    await this.cleanup();
  }

  async generateReport() {
    const reportPath = path.join(__dirname, 'storybook-test-report.json');
    const htmlReportPath = path.join(__dirname, 'storybook-test-report.html');

    // Save detailed JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed JSON report saved to: ${reportPath}`);

    // Generate HTML report
    const htmlReport = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlReport);
    console.log(`🌐 HTML report saved to: ${htmlReportPath}`);

    // Print summary
    this.printSummary();
  }

  generateHTMLReport() {
    const { summary, frame, breadcrumbs } = this.results;

    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storybook Component Test Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric { background: #f8f9fa; padding: 20px; border-radius: 6px; text-align: center; border-left: 4px solid #007bff; }
        .metric.passed { border-left-color: #28a745; }
        .metric.failed { border-left-color: #dc3545; }
        .metric h3 { margin: 0 0 10px 0; font-size: 24px; }
        .metric p { margin: 0; color: #666; }
        .content { padding: 30px; }
        .component-section { margin-bottom: 40px; }
        .component-title { font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .test-result { background: #fff; border: 1px solid #ddd; border-radius: 6px; margin-bottom: 15px; overflow: hidden; }
        .test-header { padding: 15px 20px; background: #f8f9fa; border-bottom: 1px solid #ddd; display: flex; justify-content: space-between; align-items: center; }
        .test-status { padding: 4px 12px; border-radius: 20px; color: white; font-size: 12px; font-weight: bold; }
        .test-status.passed { background: #28a745; }
        .test-status.failed { background: #dc3545; }
        .test-details { padding: 20px; }
        .error-list { margin: 10px 0; }
        .error-item { background: #fff5f5; border: 1px solid #fed7d7; border-radius: 4px; padding: 10px; margin-bottom: 8px; font-family: monospace; font-size: 12px; }
        .warning-item { background: #fffbf0; border: 1px solid #fed7aa; border-radius: 4px; padding: 10px; margin-bottom: 8px; font-family: monospace; font-size: 12px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 10px 0; }
        .metric-item { background: #f1f3f4; padding: 10px; border-radius: 4px; text-align: center; }
        .metric-value { font-size: 18px; font-weight: bold; color: #333; }
        .metric-label { font-size: 12px; color: #666; }
        .screenshot-link { display: inline-block; margin: 5px 10px 5px 0; padding: 4px 8px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; font-size: 12px; }
        .error-categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 10px 0; }
        .error-category { background: #f8f9fa; padding: 10px; border-radius: 4px; }
        .error-category h4 { margin: 0 0 5px 0; font-size: 14px; }
        .error-count { background: #dc3545; color: white; padding: 2px 6px; border-radius: 10px; font-size: 11px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Storybook Component Test Report</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
            <p>Testing Frame and Breadcrumbs component variations</p>
        </div>

        <div class="content">
            <div class="summary">
                <div class="metric">
                    <h3>${summary.total}</h3>
                    <p>Total Tests</p>
                </div>
                <div class="metric passed">
                    <h3>${summary.passed}</h3>
                    <p>Passed ✅</p>
                </div>
                <div class="metric failed">
                    <h3>${summary.failed}</h3>
                    <p>Failed ❌</p>
                </div>
                <div class="metric">
                    <h3>${summary.total > 0 ? Math.round((summary.passed / summary.total) * 100) : 0}%</h3>
                    <p>Success Rate</p>
                </div>
            </div>

            <div class="component-section">
                <h2 class="component-title">🖼️ Frame Components</h2>
                ${Object.entries(frame).map(([variation, result]) => `
                    <div class="test-result">
                        <div class="test-header">
                            <div>
                                <strong>Frame - ${variation}</strong>
                                <br>
                                <small>${result.url}</small>
                            </div>
                            <div>
                                <span class="test-status ${result.status}">${result.status.toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="test-details">
                            <div class="metrics-grid">
                                <div class="metric-item">
                                    <div class="metric-value">${result.loadTime || 'N/A'}ms</div>
                                    <div class="metric-label">Load Time</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${result.httpResponse?.status || 'N/A'}</div>
                                    <div class="metric-label">HTTP Status</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${result.themeProvided ? '✅' : '❌'}</div>
                                    <div class="metric-label">Theme Provided</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${result.renderStatus || 'N/A'}</div>
                                    <div class="metric-label">Render Status</div>
                                </div>
                            </div>

                            ${result.screenshots.initial ? `
                                <div>
                                    <strong>Screenshots:</strong>
                                    <a href="screenshots/${result.screenshots.initial}" class="screenshot-link" target="_blank">Initial</a>
                                    <a href="screenshots/${result.screenshots.final}" class="screenshot-link" target="_blank">Final</a>
                                </div>
                            ` : ''}

                            ${result.errors.length > 0 ? `
                                <h4>Errors (${result.errors.length}):</h4>
                                <div class="error-list">
                                    ${result.errors.map(error => `
                                        <div class="error-item">
                                            ${error.text || error.message || JSON.stringify(error)}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}

                            ${result.warnings.length > 0 ? `
                                <h4>Warnings (${result.warnings.length}):</h4>
                                <div class="error-list">
                                    ${result.warnings.slice(0, 5).map(warning => `
                                        <div class="warning-item">
                                            ${warning.text}
                                        </div>
                                    `).join('')}
                                    ${result.warnings.length > 5 ? `<p><em>... and ${result.warnings.length - 5} more warnings</em></p>` : ''}
                                </div>
                            ` : ''}

                            ${Object.values(result.errorTypes).some(arr => arr.length > 0) ? `
                                <h4>Error Categories:</h4>
                                <div class="error-categories">
                                    ${Object.entries(result.errorTypes).map(([type, errors]) => errors.length > 0 ? `
                                        <div class="error-category">
                                            <h4>${type.charAt(0).toUpperCase() + type.slice(1)} <span class="error-count">${errors.length}</span></h4>
                                            <div style="font-size: 11px; max-height: 100px; overflow-y: auto;">
                                                ${errors.slice(0, 3).map(err => `<div>• ${err}</div>`).join('')}
                                                ${errors.length > 3 ? `<div>... and ${errors.length - 3} more</div>` : ''}
                                            </div>
                                        </div>
                                    ` : '').join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="component-section">
                <h2 class="component-title">🍞 Breadcrumbs Components</h2>
                ${Object.entries(breadcrumbs).map(([variation, result]) => `
                    <div class="test-result">
                        <div class="test-header">
                            <div>
                                <strong>Breadcrumbs - ${variation}</strong>
                                <br>
                                <small>${result.url}</small>
                            </div>
                            <div>
                                <span class="test-status ${result.status}">${result.status.toUpperCase()}</span>
                            </div>
                        </div>
                        <div class="test-details">
                            <div class="metrics-grid">
                                <div class="metric-item">
                                    <div class="metric-value">${result.loadTime || 'N/A'}ms</div>
                                    <div class="metric-label">Load Time</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${result.httpResponse?.status || 'N/A'}</div>
                                    <div class="metric-label">HTTP Status</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${result.themeProvided ? '✅' : '❌'}</div>
                                    <div class="metric-label">Theme Provided</div>
                                </div>
                                <div class="metric-item">
                                    <div class="metric-value">${result.renderStatus || 'N/A'}</div>
                                    <div class="metric-label">Render Status</div>
                                </div>
                            </div>

                            ${result.screenshots.initial ? `
                                <div>
                                    <strong>Screenshots:</strong>
                                    <a href="screenshots/${result.screenshots.initial}" class="screenshot-link" target="_blank">Initial</a>
                                    <a href="screenshots/${result.screenshots.final}" class="screenshot-link" target="_blank">Final</a>
                                </div>
                            ` : ''}

                            ${result.errors.length > 0 ? `
                                <h4>Errors (${result.errors.length}):</h4>
                                <div class="error-list">
                                    ${result.errors.map(error => `
                                        <div class="error-item">
                                            ${error.text || error.message || JSON.stringify(error)}
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}

                            ${result.warnings.length > 0 ? `
                                <h4>Warnings (${result.warnings.length}):</h4>
                                <div class="error-list">
                                    ${result.warnings.slice(0, 5).map(warning => `
                                        <div class="warning-item">
                                            ${warning.text}
                                        </div>
                                    `).join('')}
                                    ${result.warnings.length > 5 ? `<p><em>... and ${result.warnings.length - 5} more warnings</em></p>` : ''}
                                </div>
                            ` : ''}

                            ${Object.values(result.errorTypes).some(arr => arr.length > 0) ? `
                                <h4>Error Categories:</h4>
                                <div class="error-categories">
                                    ${Object.entries(result.errorTypes).map(([type, errors]) => errors.length > 0 ? `
                                        <div class="error-category">
                                            <h4>${type.charAt(0).toUpperCase() + type.slice(1)} <span class="error-count">${errors.length}</span></h4>
                                            <div style="font-size: 11px; max-height: 100px; overflow-y: auto;">
                                                ${errors.slice(0, 3).map(err => `<div>• ${err}</div>`).join('')}
                                                ${errors.length > 3 ? `<div>... and ${errors.length - 3} more</div>` : ''}
                                            </div>
                                        </div>
                                    ` : '').join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>
</body>
</html>`;

    return html;
  }

  printSummary() {
    const { summary } = this.results;

    console.log('\n' + '='.repeat(80));
    console.log('📊 TEST EXECUTION SUMMARY');
    console.log('='.repeat(80));
    console.log(`⏱️  Started: ${summary.startTime}`);
    console.log(`⏱️  Completed: ${summary.endTime}`);
    console.log(`📈 Total Tests: ${summary.total}`);
    console.log(`✅ Passed: ${summary.passed}`);
    console.log(`❌ Failed: ${summary.failed}`);
    console.log(`📊 Success Rate: ${summary.total > 0 ? Math.round((summary.passed / summary.total) * 100) : 0}%`);

    if (summary.errors.length > 0) {
      console.log('\n🚨 FAILED COMPONENTS:');
      summary.errors.forEach(error => {
        console.log(`   ❌ ${error.component} - ${error.variation}`);
        error.errors.forEach(err => {
          console.log(`      • ${err.text || err.message}`);
        });
      });
    }

    console.log('\n🔧 RECOMMENDATIONS:');

    // Analyze common error patterns
    const allErrors = summary.errors.flatMap(e => e.errors);
    const hasThemeErrors = allErrors.some(e => (e.text || e.message || '').toLowerCase().includes('theme'));
    const hasDestructureErrors = allErrors.some(e => (e.text || e.message || '').toLowerCase().includes('destructure'));
    const hasPropTypesErrors = allErrors.some(e => (e.text || e.message || '').toLowerCase().includes('prop types'));

    if (hasThemeErrors) {
      console.log('   🎨 Theme Errors Detected:');
      console.log('      • Check that AppProvider is properly configured');
      console.log('      • Verify theme object structure is complete');
      console.log('      • Ensure all required theme colors are provided');
    }

    if (hasDestructureErrors) {
      console.log('   🔧 Props Destructuring Errors:');
      console.log('      • Check component props are correctly defined');
      console.log('      • Verify optional props have default values');
      console.log('      • Ensure props interface matches component usage');
    }

    if (hasPropTypesErrors) {
      console.log('   📦 Module Import Errors:');
      console.log('      • Check PropTypes module imports');
      console.log('      • Verify all dependencies are installed');
      console.log('      • Ensure proper module resolution');
    }

    console.log('\n📄 Detailed reports and screenshots saved to current directory');
    console.log('='.repeat(80));
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Run the tests
if (require.main === module) {
  const tester = new StorybookTester();
  tester.runTests().catch(console.error);
}

module.exports = StorybookTester;