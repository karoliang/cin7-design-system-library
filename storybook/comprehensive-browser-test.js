#!/usr/bin/env node

/**
 * Comprehensive Browser Automation Test
 * Captures console errors, screenshots, and analyzes Frame/Breadcrumbs components
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class ComprehensiveBrowserTest {
  constructor() {
    this.baseUrl = 'http://localhost:6012';
    this.outputDir = path.join(__dirname, 'test-results', 'comprehensive-browser-test');
    this.screenshotsDir = path.join(this.outputDir, 'screenshots');
    this.consoleLogsDir = path.join(this.outputDir, 'console-logs');
    this.results = [];

    // Test scenarios
    this.testScenarios = [
      // Frame Components
      {
        name: 'Frame - Default',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frame--default&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Polaris-TopBar', 'Polaris-Navigation']
      },
      {
        name: 'Frame - Minimal',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Minimal Frame Test']
      },
      {
        name: 'Frame - With Top Bar',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frame--with-top-bar&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Polaris-TopBar', 'Search field']
      },
      {
        name: 'Frame - With Notifications',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frame--with-notifications&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Notifications', 'Indicator']
      },

      // Breadcrumbs Components
      {
        name: 'Breadcrumbs - Default',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story`,
        category: 'breadcrumbs',
        expectedElements: ['Polaris-Breadcrumbs', 'Breadcrumb list']
      },
      {
        name: 'Breadcrumbs - With Actions',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-breadcrumbs--with-actions&args=&viewMode=story`,
        category: 'breadcrumbs',
        expectedElements: ['Polaris-Breadcrumbs', 'Actions']
      }
    ];
  }

  async setup() {
    console.log('🚀 Setting up comprehensive browser test...');

    // Create output directories
    fs.mkdirSync(this.screenshotsDir, { recursive: true });
    fs.mkdirSync(this.consoleLogsDir, { recursive: true });

    this.browser = await puppeteer.launch({
      headless: false, // Show browser for debugging
      devtools: true,
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

  async captureConsole(page, scenario) {
    const consoleLogs = {
      errors: [],
      warnings: [],
      logs: [],
      infos: [],
      propTypes: [],
      templateLiterals: []
    };

    // Capture all console output
    page.on('console', (msg) => {
      const logEntry = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString()
      };

      // Categorize logs
      if (msg.type() === 'error') {
        consoleLogs.errors.push(logEntry);
      } else if (msg.type() === 'warning') {
        consoleLogs.warnings.push(logEntry);
      } else if (msg.type() === 'info') {
        consoleLogs.infos.push(logEntry);
      } else {
        consoleLogs.logs.push(logEntry);
      }

      // Special detection for PropTypes issues
      if (msg.text().includes('prop-types') || msg.text().includes('PropTypes')) {
        consoleLogs.propTypes.push(logEntry);
      }

      // Special detection for template literal errors
      if (msg.text().includes('${message}\\n${docs.map')) {
        consoleLogs.templateLiterals.push(logEntry);
      }

      console.log(`📝 [${scenario.name}] ${msg.type().toUpperCase()}: ${msg.text()}`);
    });

    // Capture page errors
    page.on('pageerror', (error) => {
      const errorEntry = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      consoleLogs.errors.push(errorEntry);
      console.log(`💥 [${scenario.name}] PAGE ERROR: ${error.message}`);
    });

    // Capture request failures
    page.on('requestfailed', (request) => {
      const failure = {
        url: request.url(),
        failure: request.failure(),
        timestamp: new Date().toISOString()
      };
      consoleLogs.errors.push(failure);
      console.log(`🌐 [${scenario.name}] REQUEST FAILED: ${request.url()} - ${request.failure()}`);
    });

    return consoleLogs;
  }

  async waitForStoryLoad(page, scenario, timeout = 10000) {
    console.log(`⏳ Waiting for story to load: ${scenario.name}`);

    try {
      // Wait for either success or error state
      await Promise.race([
        // Success: Look for expected elements
        Promise.any(scenario.expectedElements.map(selector =>
          page.waitForSelector(`.${selector}`, { timeout })
        )),

        // Error: Look for error display
        page.waitForSelector('.sb-errordisplay_main', { timeout }),

        // Error: Look for no preview
        page.waitForSelector('.no-preview', { timeout }),

        // Error: Look for preparing story indicator to disappear
        page.waitForFunction(() => !document.querySelector('.sb-preparing-story'), { timeout })
      ]);

      console.log(`✅ Story loaded: ${scenario.name}`);
      return true;
    } catch (error) {
      console.log(`⚠️ Story load timeout: ${scenario.name} - ${error.message}`);
      return false;
    }
  }

  async analyzePageContent(page, scenario) {
    console.log(`🔍 Analyzing page content for: ${scenario.name}`);

    const analysis = await page.evaluate(() => {
      const body = document.body;

      // Check for error states
      const errorDisplay = document.querySelector('.sb-errordisplay_main');
      const noPreview = document.querySelector('.no-preview');
      const preparingStory = document.querySelector('.sb-preparing-story');
      const storybookRoot = document.getElementById('storybook-root');

      // Check for expected content
      const frameElements = document.querySelectorAll('[class*="Frame"], [class*="Polaris-Frame"]');
      const breadcrumbsElements = document.querySelectorAll('[class*="Breadcrumbs"], [class*="Polaris-Breadcrumbs"]');
      const topBarElements = document.querySelectorAll('[class*="TopBar"], [class*="Polaris-TopBar"]');

      // Get body content for analysis
      const bodyText = body.innerText || '';
      const bodyHTML = body.innerHTML || '';

      // Check for template literal errors in script tags
      const scripts = Array.from(document.querySelectorAll('script'));
      const templateLiteralErrors = scripts.filter(script =>
        script.textContent && script.textContent.includes('${message}\\n${docs.map')
      );

      return {
        hasErrorDisplay: !!errorDisplay,
        hasNoPreview: !!noPreview,
        hasPreparingStory: !!preparingStory,
        hasStorybookRoot: !!storybookRoot,
        frameElementCount: frameElements.length,
        breadcrumbsElementCount: breadcrumbsElements.length,
        topBarElementCount: topBarElements.length,
        bodyTextLength: bodyText.length,
        bodyHTMLLength: bodyHTML.length,
        templateLiteralErrorCount: templateLiteralErrors.length,
        bodyContentPreview: bodyText.substring(0, 500),
        errorDisplayContent: errorDisplay ? errorDisplay.innerText : null,
        noPreviewContent: noPreview ? noPreview.innerText : null
      };
    });

    console.log(`📊 Analysis results for ${scenario.name}:`, analysis);
    return analysis;
  }

  async testScenario(scenario) {
    console.log(`\n🧪 Testing scenario: ${scenario.name}`);

    const page = await this.browser.newPage();

    try {
      // Set up console capture
      const consoleLogs = await this.captureConsole(page, scenario);

      // Navigate to the scenario
      console.log(`🌐 Navigating to: ${scenario.url}`);
      const response = await page.goto(scenario.url, {
        waitUntil: 'networkidle2',
        timeout: 15000
      });

      console.log(`📡 Response status: ${response.status()} ${response.statusText()}`);

      // Wait for story to load
      const storyLoaded = await this.waitForStoryLoad(page, scenario);

      // Wait a bit more for any delayed content
      await page.waitForTimeout(2000);

      // Analyze page content
      const pageAnalysis = await this.analyzePageContent(page, scenario);

      // Take screenshot
      const screenshotPath = path.join(this.screenshotsDir, `${scenario.name.replace(/\s+/g, '_').toLowerCase()}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`📸 Screenshot saved: ${screenshotPath}`);

      // Save console logs
      const consoleLogPath = path.join(this.consoleLogsDir, `${scenario.name.replace(/\s+/g, '_').toLowerCase()}.json`);
      fs.writeFileSync(consoleLogPath, JSON.stringify(consoleLogs, null, 2));
      console.log(`📝 Console logs saved: ${consoleLogPath}`);

      // Determine result
      const result = {
        scenario: scenario.name,
        category: scenario.category,
        url: scenario.url,
        success: storyLoaded && !pageAnalysis.hasErrorDisplay && !pageAnalysis.hasNoPreview,
        responseStatus: response.status(),
        pageAnalysis,
        consoleLogs,
        screenshotPath,
        consoleLogPath,
        timestamp: new Date().toISOString()
      };

      this.results.push(result);

      console.log(`${result.success ? '✅ SUCCESS' : '❌ FAILED'}: ${scenario.name}`);

      if (!result.success) {
        console.log(`   Issues detected:`);
        if (pageAnalysis.hasErrorDisplay) console.log(`   - Error display present`);
        if (pageAnalysis.hasNoPreview) console.log(`   - No preview state`);
        if (pageAnalysis.hasPreparingStory) console.log(`   - Still preparing story`);
        if (consoleLogs.errors.length > 0) console.log(`   - ${consoleLogs.errors.length} console errors`);
        if (consoleLogs.templateLiterals.length > 0) console.log(`   - Template literal errors detected`);
      }

      return result;

    } catch (error) {
      console.error(`💥 Error testing ${scenario.name}:`, error.message);

      const failedResult = {
        scenario: scenario.name,
        category: scenario.category,
        url: scenario.url,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };

      this.results.push(failedResult);
      return failedResult;

    } finally {
      await page.close();
    }
  }

  async runAllTests() {
    console.log('\n🎯 Starting comprehensive browser testing...\n');

    for (const scenario of this.testScenarios) {
      await this.testScenario(scenario);

      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n📊 Generating comprehensive report...\n');
    await this.generateReport();

    return this.results;
  }

  async generateReport() {
    const report = {
      summary: {
        totalTests: this.results.length,
        successfulTests: this.results.filter(r => r.success).length,
        failedTests: this.results.filter(r => !r.success).length,
        frameTests: this.results.filter(r => r.category === 'frame'),
        breadcrumbsTests: this.results.filter(r => r.category === 'breadcrumbs'),
        timestamp: new Date().toISOString()
      },
      results: this.results,
      analysis: this.analyzeResults()
    };

    // Save detailed report
    const reportPath = path.join(this.outputDir, 'comprehensive-browser-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Detailed report saved: ${reportPath}`);

    // Generate markdown report
    const markdownReport = this.generateMarkdownReport(report);
    const markdownPath = path.join(this.outputDir, 'comprehensive-browser-test-report.md');
    fs.writeFileSync(markdownPath, markdownReport);
    console.log(`📄 Markdown report saved: ${markdownPath}`);

    // Print summary to console
    this.printSummary(report);

    return report;
  }

  analyzeResults() {
    const analysis = {
      commonErrors: {},
      templateLiteralErrors: [],
      propTypesErrors: [],
      workingComponents: [],
      brokenComponents: [],
      patterns: {}
    };

    // Analyze common errors
    this.results.forEach(result => {
      if (result.consoleLogs) {
        result.consoleLogs.errors.forEach(error => {
          const key = error.message || error.text || 'Unknown error';
          analysis.commonErrors[key] = (analysis.commonErrors[key] || 0) + 1;
        });

        analysis.templateLiteralErrors.push(...result.consoleLogs.templateLiterals);
        analysis.propTypesErrors.push(...result.consoleLogs.propTypes);
      }

      if (result.success) {
        analysis.workingComponents.push(result.scenario);
      } else {
        analysis.brokenComponents.push(result.scenario);
      }
    });

    // Analyze patterns
    analysis.patterns.frameWorking = analysis.workingComponents.filter(name =>
      name.toLowerCase().includes('frame')
    ).length;

    analysis.patterns.breadcrumbsWorking = analysis.workingComponents.filter(name =>
      name.toLowerCase().includes('breadcrumbs')
    ).length;

    analysis.patterns.frameBroken = analysis.brokenComponents.filter(name =>
      name.toLowerCase().includes('frame')
    ).length;

    analysis.patterns.breadcrumbsBroken = analysis.brokenComponents.filter(name =>
      name.toLowerCase().includes('breadcrumbs')
    ).length;

    return analysis;
  }

  generateMarkdownReport(report) {
    const { summary, results, analysis } = report;

    let markdown = `# Comprehensive Browser Test Report

Generated: ${new Date().toISOString()}

## Summary

- **Total Tests**: ${summary.totalTests}
- **Successful**: ${summary.successfulTests}
- **Failed**: ${summary.failedTests}
- **Success Rate**: ${Math.round((summary.successfulTests / summary.totalTests) * 100)}%

## Results by Category

### Frame Components
- Working: ${analysis.patterns.frameWorking}
- Broken: ${analysis.patterns.frameBroken}

### Breadcrumbs Components
- Working: ${analysis.patterns.breadcrumbsWorking}
- Broken: ${analysis.patterns.breadcrumbsBroken}

## Detailed Results

`;

    results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      markdown += `### ${status} ${result.scenario}

- **URL**: ${result.url}
- **Success**: ${result.success}
- **Category**: ${result.category}

`;

      if (result.pageAnalysis) {
        markdown += `**Page Analysis:**
- Error Display: ${result.pageAnalysis.hasErrorDisplay ? 'Yes' : 'No'}
- No Preview: ${result.pageAnalysis.hasNoPreview ? 'Yes' : 'No'}
- Frame Elements: ${result.pageAnalysis.frameElementCount}
- Breadcrumbs Elements: ${result.pageAnalysis.breadcrumbsElementCount}
- Template Literal Errors: ${result.pageAnalysis.templateLiteralErrorCount}

`;
      }

      if (result.consoleLogs) {
        const totalIssues = result.consoleLogs.errors.length + result.consoleLogs.warnings.length;
        if (totalIssues > 0) {
          markdown += `**Console Issues:**
- Errors: ${result.consoleLogs.errors.length}
- Warnings: ${result.consoleLogs.warnings.length}
- PropTypes Issues: ${result.consoleLogs.propTypes.length}
- Template Literal Issues: ${result.consoleLogs.templateLiterals.length}

`;
        }
      }

      if (result.error) {
        markdown += `**Error:** ${result.error}

`;
      }

      markdown += `**Screenshot:** ${path.basename(result.screenshotPath)}
**Console Logs:** ${path.basename(result.consoleLogPath)}

---

`;
    });

    // Add analysis section
    if (analysis.templateLiteralErrors.length > 0) {
      markdown += `## Template Literal Errors Detected

${analysis.templateLiteralErrors.length} template literal errors found across components. This indicates the codeVariants module issue is still present.

`;
    }

    if (analysis.propTypesErrors.length > 0) {
      markdown += `## PropTypes Issues

${analysis.propTypesErrors.length} PropTypes-related issues detected. The virtual PropTypes module may need adjustment.

`;
    }

    markdown += `## Recommendations

1. **For Template Literal Errors**: The codeVariants module needs proper template literal escaping
2. **For PropTypes Issues**: Ensure virtual module is correctly handling all PropTypes imports
3. **For Component Issues**: Check component-specific prop requirements and state management

## Files Generated

- Detailed JSON report: \`comprehensive-browser-test-report.json\`
- Screenshots: \`screenshots/\` directory
- Console logs: \`console-logs/\` directory

`;

    return markdown;
  }

  printSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 COMPREHENSIVE BROWSER TEST SUMMARY');
    console.log('='.repeat(60));

    const { summary, analysis } = report;

    console.log(`\n📊 Overall Results:`);
    console.log(`   Total Tests: ${summary.totalTests}`);
    console.log(`   Successful: ${summary.successfulTests} ✅`);
    console.log(`   Failed: ${summary.failedTests} ❌`);
    console.log(`   Success Rate: ${Math.round((summary.successfulTests / summary.totalTests) * 100)}%`);

    console.log(`\n🖼️ Frame Components:`);
    console.log(`   Working: ${analysis.patterns.frameWorking} ✅`);
    console.log(`   Broken: ${analysis.patterns.frameBroken} ❌`);

    console.log(`\�� Breadcrumbs Components:`);
    console.log(`   Working: ${analysis.patterns.breadcrumbsWorking} ✅`);
    console.log(`   Broken: ${analysis.patterns.breadcrumbsBroken} ❌`);

    if (analysis.templateLiteralErrors.length > 0) {
      console.log(`\n⚠️ Template Literal Errors: ${analysis.templateLiteralErrors.length} detected`);
    }

    if (analysis.propTypesErrors.length > 0) {
      console.log(`\n⚠️ PropTypes Issues: ${analysis.propTypesErrors.length} detected`);
    }

    console.log(`\n📁 Results saved to: ${this.outputDir}`);
    console.log('='.repeat(60));
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up...');
    if (this.browser) {
      await this.browser.close();
    }
  }
}

async function runComprehensiveBrowserTest() {
  const test = new ComprehensiveBrowserTest();

  try {
    await test.setup();
    const results = await test.runAllTests();
    return results;
  } catch (error) {
    console.error('💥 Test execution failed:', error);
    throw error;
  } finally {
    await test.cleanup();
  }
}

// Run the test
if (require.main === module) {
  runComprehensiveBrowserTest()
    .then(() => {
      console.log('\n🎉 Comprehensive browser test completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Comprehensive browser test failed:', error);
      process.exit(1);
    });
}

module.exports = { ComprehensiveBrowserTest, runComprehensiveBrowserTest };