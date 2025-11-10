#!/usr/bin/env node

/**
 * Simple Storybook Component Testing Framework
 * Tests Frame and Breadcrumbs component variations with detailed debugging
 * Uses curl and fetch for more stable testing
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
];

const BASE_URL = 'http://localhost:6006';

class SimpleStorybookTester {
  constructor() {
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

  async testComponentWithCurl(componentName, variation) {
    const url = `${BASE_URL}/iframe.html?id=components-navigation-${componentName}--${variation}&args=&viewMode=story`;

    console.log(`🧪 Testing ${componentName} - ${variation}`);
    console.log(`   URL: ${url}`);

    const result = {
      variation,
      url,
      status: 'pending',
      httpResponse: null,
      errors: [],
      warnings: [],
      renderStatus: null,
      themeProvided: false,
      errorTypes: {
        theme: [],
        props: [],
        modules: [],
        rendering: [],
        network: []
      },
      loadTime: null,
      content: null,
      contentLength: 0,
      detectedElements: {}
    };

    const startTime = Date.now();

    try {
      // Use curl to fetch the page content
      const curlCommand = `curl -s -w "\\nHTTP_STATUS:%{http_code}\\nTOTAL_TIME:%{time_total}\\nSIZE_DOWNLOAD:%{size_download}\\n" "${url}"`;
      const output = execSync(curlCommand, {
        encoding: 'utf8',
        timeout: 30000
      });

      const lines = output.split('\n');
      const httpStatusLine = lines.find(line => line.startsWith('HTTP_STATUS:'));
      const totalTimeLine = lines.find(line => line.startsWith('TOTAL_TIME:'));
      const sizeLine = lines.find(line => line.startsWith('SIZE_DOWNLOAD:'));

      const httpStatus = httpStatusLine ? parseInt(httpStatusLine.split(':')[1]) : 0;
      const totalTime = totalTimeLine ? parseFloat(totalTimeLine.split(':')[1]) * 1000 : 0; // Convert to ms
      const contentSize = sizeLine ? parseInt(sizeLine.split(':')[1]) : 0;

      // Extract content (everything before the metadata lines)
      const metadataStart = lines.findIndex(line => line.startsWith('HTTP_STATUS:'));
      const content = metadataStart > 0 ? lines.slice(0, metadataStart).join('\n') : output;

      result.httpResponse = {
        status: httpStatus,
        statusText: httpStatus === 200 ? 'OK' : 'Error',
        loadTime: Math.round(totalTime),
        contentSize
      };

      result.loadTime = Math.round(totalTime);
      result.content = content;
      result.contentLength = content.length;

      // Analyze content for errors and specific elements
      this.analyzeContent(content, result);

      // Determine final status
      if (httpStatus === 200 && result.renderStatus === 'success') {
        result.status = 'passed';
        console.log(`   ✅ PASSED (${result.loadTime}ms, ${contentSize} bytes)`);
      } else {
        result.status = 'failed';
        console.log(`   ❌ FAILED (${result.loadTime}ms, HTTP ${httpStatus})`);
      }

    } catch (error) {
      result.errors.push({
        type: 'fetch',
        text: error.message,
        code: error.code
      });
      result.status = 'failed';
      result.renderStatus = 'fetch_failed';
      console.log(`   💥 FAILED: ${error.message}`);
    }

    console.log(`   🎨 Render: ${result.renderStatus}`);
    console.log(`   🌐 Theme: ${result.themeProvided ? '✅' : '❌'}`);
    console.log(`   📝 Errors: ${result.errors.length}`);
    console.log(`   📄 Content: ${result.contentLength} chars`);
    console.log('');

    return result;
  }

  analyzeContent(content, result) {
    const contentLower = content.toLowerCase();

    // Check for specific error patterns
    const errorPatterns = [
      { pattern: /no theme was provided/i, type: 'theme', message: 'No theme was provided' },
      { pattern: /cannot destructure property/i, type: 'props', message: 'Cannot destructure property' },
      { pattern: /prop-types? is not defined/i, type: 'modules', message: 'PropTypes is not defined' },
      { pattern: /cannot read propert(y|ies) of undefined/i, type: 'rendering', message: 'Cannot read property of undefined' },
      { pattern: /no preview/i, type: 'rendering', message: 'No Preview error' },
      { pattern: /element\.type is invalid/i, type: 'rendering', message: 'Invalid element type' },
      { pattern: /failed to render/i, type: 'rendering', message: 'Failed to render' },
      { pattern: /referenceerror/i, type: 'rendering', message: 'ReferenceError' },
      { pattern: /typeerror/i, type: 'rendering', message: 'TypeError' }
    ];

    errorPatterns.forEach(({ pattern, type, message }) => {
      if (pattern.test(content)) {
        result.errors.push({
          type,
          text: message,
          details: `Found in page content`
        });
        result.errorTypes[type].push(message);
      }
    });

    // Check for specific success indicators
    const successPatterns = [
      { pattern: /class=".*frame.*/i, name: 'frameComponent' },
      { pattern: /class=".*topbar.*/i, name: 'topBarComponent' },
      { pattern: /class=".*navigation.*/i, name: 'navigationComponent' },
      { pattern: /class=".*breadcrumbs.*/i, name: 'breadcrumbsComponent' },
      { pattern: /aria-label="breadcrumbs"/i, name: 'breadcrumbsAria' },
      { pattern: /data-polaris-provider="true"/i, name: 'polarisProvider' },
      { pattern: /class=".*polaris.*/i, name: 'polarisStyles' }
    ];

    successPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(content)) {
        result.detectedElements[name] = true;
      }
    });

    // Check for theme provider indicators
    const themePatterns = [
      /appprovider/i,
      /polaris-provider/i,
      /data-polaris-provider/i,
      /__polari_theme__/i,
      /colors.*surface/i
    ];

    result.themeProvided = themePatterns.some(pattern => pattern.test(content));

    // Determine render status
    if (result.errors.some(e => e.type === 'theme')) {
      result.renderStatus = 'theme_error';
    } else if (result.errors.some(e => e.type === 'props')) {
      result.renderStatus = 'props_error';
    } else if (result.errors.some(e => e.type === 'modules')) {
      result.renderStatus = 'module_error';
    } else if (result.errors.some(e => e.type === 'rendering')) {
      result.renderStatus = 'rendering_error';
    } else if (result.detectedElements.frameComponent || result.detectedElements.breadcrumbsComponent) {
      result.renderStatus = 'success';
    } else if (result.detectedElements.polarisStyles) {
      result.renderStatus = 'partial';
    } else if (content.includes('<!DOCTYPE html>') && content.includes('<html')) {
      result.renderStatus = 'loaded';
    } else {
      result.renderStatus = 'unknown';
    }

    // Check for error boundary content
    if (content.includes('error-boundary') || content.includes('border: 2px solid red') || content.includes('Component Failed to Render')) {
      result.renderStatus = 'error_boundary';
      result.errors.push({
        type: 'rendering',
        text: 'Component rendered with error boundary',
        details: 'Error boundary was triggered'
      });
    }
  }

  async runTests() {
    console.log('🚀 Starting Simple Storybook Component Testing Framework...');
    console.log(`📊 Base URL: ${BASE_URL}`);
    console.log(`⏱️  Timeout: 30000ms`);
    console.log('');

    this.results.summary.startTime = new Date().toISOString();

    console.log('🖼️ Testing Frame Components...\n');
    for (const variation of FRAME_VARIATIONS) {
      const result = await this.testComponentWithCurl('frame', variation);
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
          errorTypes: result.errorTypes,
          renderStatus: result.renderStatus
        });
      }
    }

    console.log('🍞 Testing Breadcrumbs Components...\n');
    for (const variation of BREADCRUMBS_VARIATIONS) {
      const result = await this.testComponentWithCurl('breadcrumbs', variation);
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
          errorTypes: result.errorTypes,
          renderStatus: result.renderStatus
        });
      }
    }

    this.results.summary.endTime = new Date().toISOString();
    this.generateReport();
    this.printSummary();
  }

  generateReport() {
    const reportPath = path.join(__dirname, 'storybook-test-report-simple.json');
    const htmlReportPath = path.join(__dirname, 'storybook-test-report-simple.html');

    // Save detailed JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
    console.log(`📄 Detailed JSON report saved to: ${reportPath}`);

    // Generate HTML report
    const htmlReport = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlReport);
    console.log(`🌐 HTML report saved to: ${htmlReportPath}`);
  }

  generateHTMLReport() {
    const { summary, frame, breadcrumbs } = this.results;

    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storybook Component Test Report (Simple)</title>
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
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin: 10px 0; }
        .metric-item { background: #f1f3f4; padding: 10px; border-radius: 4px; text-align: center; }
        .metric-value { font-size: 18px; font-weight: bold; color: #333; }
        .metric-label { font-size: 12px; color: #666; }
        .elements-detected { margin: 10px 0; }
        .element-badge { display: inline-block; margin: 2px 4px 2px 0; padding: 2px 6px; background: #e3f2fd; color: #1976d2; border-radius: 12px; font-size: 10px; }
        .element-badge.true { background: #e8f5e8; color: #2e7d32; }
        .error-categories { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin: 10px 0; }
        .error-category { background: #f8f9fa; padding: 10px; border-radius: 4px; }
        .error-category h4 { margin: 0 0 5px 0; font-size: 14px; }
        .error-count { background: #dc3545; color: white; padding: 2px 6px; border-radius: 10px; font-size: 11px; }
        .url-link { color: #007bff; text-decoration: none; font-size: 11px; }
        .url-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Storybook Component Test Report (Simple)</h1>
            <p>Generated on ${new Date().toLocaleString()}</p>
            <p>Testing Frame and Breadcrumbs component variations using curl-based analysis</p>
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
                                <a href="${result.url}" class="url-link" target="_blank">${result.url}</a>
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
                                <div class="metric-item">
                                    <div class="metric-value">${result.contentLength || 0}</div>
                                    <div class="metric-label">Content Size</div>
                                </div>
                            </div>

                            ${Object.keys(result.detectedElements).length > 0 ? `
                                <div class="elements-detected">
                                    <strong>Elements Detected:</strong>
                                    ${Object.entries(result.detectedElements).map(([key, value]) => `
                                        <span class="element-badge ${value ? 'true' : ''}">${key}: ${value ? '✅' : '❌'}</span>
                                    `).join('')}
                                </div>
                            ` : ''}

                            ${result.errors.length > 0 ? `
                                <h4>Errors (${result.errors.length}):</h4>
                                <div class="error-list">
                                    ${result.errors.map(error => `
                                        <div class="error-item">
                                            <strong>${error.type}:</strong> ${error.text}
                                            ${error.details ? `<br><small>${error.details}</small>` : ''}
                                        </div>
                                    `).join('')}
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
                                <a href="${result.url}" class="url-link" target="_blank">${result.url}</a>
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
                                <div class="metric-item">
                                    <div class="metric-value">${result.contentLength || 0}</div>
                                    <div class="metric-label">Content Size</div>
                                </div>
                            </div>

                            ${Object.keys(result.detectedElements).length > 0 ? `
                                <div class="elements-detected">
                                    <strong>Elements Detected:</strong>
                                    ${Object.entries(result.detectedElements).map(([key, value]) => `
                                        <span class="element-badge ${value ? 'true' : ''}">${key}: ${value ? '✅' : '❌'}</span>
                                    `).join('')}
                                </div>
                            ` : ''}

                            ${result.errors.length > 0 ? `
                                <h4>Errors (${result.errors.length}):</h4>
                                <div class="error-list">
                                    ${result.errors.map(error => `
                                        <div class="error-item">
                                            <strong>${error.type}:</strong> ${error.text}
                                            ${error.details ? `<br><small>${error.details}</small>` : ''}
                                        </div>
                                    `).join('')}
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
        console.log(`   ❌ ${error.component} - ${error.variation} (${error.renderStatus})`);
        error.errors.slice(0, 2).forEach(err => {
          console.log(`      • ${err.type}: ${err.text}`);
        });
        if (error.errors.length > 2) {
          console.log(`      ... and ${error.errors.length - 2} more errors`);
        }
      });
    }

    console.log('\n🔧 ERROR ANALYSIS:');

    // Analyze common error patterns
    const allErrors = summary.errors.flatMap(e => e.errors);
    const errorTypes = {};
    allErrors.forEach(error => {
      if (!errorTypes[error.type]) {
        errorTypes[error.type] = 0;
      }
      errorTypes[error.type]++;
    });

    if (Object.keys(errorTypes).length > 0) {
      console.log('   📊 Error Distribution:');
      Object.entries(errorTypes).forEach(([type, count]) => {
        console.log(`      • ${type}: ${count} occurrences`);
      });
    }

    console.log('\n🔧 RECOMMENDATIONS:');

    if (errorTypes.theme > 0) {
      console.log('   🎨 Theme Errors Detected:');
      console.log('      • Check that AppProvider is properly configured');
      console.log('      • Verify theme object structure is complete');
      console.log('      • Ensure all required theme colors are provided');
    }

    if (errorTypes.props > 0) {
      console.log('   🔧 Props Destructuring Errors:');
      console.log('      • Check component props are correctly defined');
      console.log('      • Verify optional props have default values');
      console.log('      • Ensure props interface matches component usage');
    }

    if (errorTypes.modules > 0) {
      console.log('   📦 Module Import Errors:');
      console.log('      • Check PropTypes module imports');
      console.log('      • Verify all dependencies are installed');
      console.log('      • Ensure proper module resolution');
    }

    if (errorTypes.rendering > 0) {
      console.log('   🎨 Rendering Errors:');
      console.log('      • Check component rendering logic');
      console.log('      • Verify proper error boundaries');
      console.log('      • Ensure all required dependencies are loaded');
    }

    if (summary.failed === 0) {
      console.log('   🎉 All components are working correctly!');
      console.log('      • No immediate fixes required');
      console.log('      • Consider adding more comprehensive tests');
    }

    console.log('\n📄 Detailed reports saved to current directory');
    console.log('🌐 Open storybook-test-report-simple.html in your browser for full details');
    console.log('='.repeat(80));
  }
}

// Run the tests
if (require.main === module) {
  const tester = new SimpleStorybookTester();
  tester.runTests().catch(console.error);
}

module.exports = SimpleStorybookTester;