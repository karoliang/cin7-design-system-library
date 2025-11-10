#!/usr/bin/env node

/**
 * Advanced Console Error Testing with Puppeteer
 *
 * This script captures JavaScript console errors, warnings, and network issues
 * from all Frame and Breadcrumbs component variations in Storybook.
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const STORYBOOK_URL = 'http://localhost:6006';
const OUTPUT_DIR = path.join(__dirname, 'test-results');
const SCREENSHOTS_DIR = path.join(OUTPUT_DIR, 'screenshots');
const LOGS_DIR = path.join(OUTPUT_DIR, 'logs');

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
  [OUTPUT_DIR, SCREENSHOTS_DIR, LOGS_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

// Generate URL for component variation
function generateUrl(component, variation) {
  return `${STORYBOOK_URL}/iframe.html?id=examples-${component}--${variation}&args=&viewMode=story`;
}

// Initialize console logging on page
async function setupConsoleLogging(page, componentName, variation) {
  const consoleMessages = [];
  const errors = [];
  const warnings = [];
  const networkErrors = [];

  // Capture console messages
  page.on('console', msg => {
    const message = {
      type: msg.type(),
      text: msg.text(),
      location: msg.location(),
      timestamp: new Date().toISOString()
    };

    consoleMessages.push(message);

    if (msg.type() === 'error') {
      errors.push(message);
      console.error(`❌ [${componentName}-${variation}] ERROR:`, msg.text());
      if (msg.location()) {
        console.error(`   Location: ${msg.location().url}:${msg.location().lineNumber}`);
      }
    } else if (msg.type() === 'warning') {
      warnings.push(message);
      console.warn(`⚠️  [${componentName}-${variation}] WARNING:`, msg.text());
    } else {
      console.log(`📝 [${componentName}-${variation}] LOG:`, msg.text());
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };
    errors.push(errorInfo);
    console.error(`💥 [${componentName}-${variation}] PAGE ERROR:`, error.message);
    if (error.stack) {
      console.error(`   Stack:`, error.stack);
    }
  });

  // Capture request failures
  page.on('requestfailed', request => {
    const failure = {
      url: request.url(),
      method: request.method(),
      failure: request.failure(),
      timestamp: new Date().toISOString()
    };
    networkErrors.push(failure);
    console.error(`🌐 [${componentName}-${variation}] NETWORK ERROR:`, request.url(), failure.failure?.errorText);
  });

  // Capture response errors
  page.on('response', response => {
    if (response.status() >= 400) {
      const responseError = {
        url: response.url(),
        status: response.status(),
        statusText: response.statusText(),
        timestamp: new Date().toISOString()
      };
      networkErrors.push(responseError);
      console.error(`🌐 [${componentName}-${variation}] HTTP ERROR:`, response.status(), response.url());
    }
  });

  return {
    consoleMessages,
    errors,
    warnings,
    networkErrors
  };
}

// Test a single component variation
async function testComponentVariation(browser, component, variation) {
  const url = generateUrl(component, variation);
  const componentName = `${component}-${variation}`;
  console.log(`\n🚀 Testing: ${componentName}`);
  console.log(`   URL: ${url}`);

  let page = null;
  let logs = {
    consoleMessages: [],
    errors: [],
    warnings: [],
    networkErrors: []
  };

  try {
    page = await browser.newPage();

    // Set viewport for consistent screenshots
    await page.setViewport({ width: 1200, height: 800 });

    // Setup console logging
    logs = await setupConsoleLogging(page, component, variation);

    // Navigate to the component
    console.log(`   Navigating to component...`);
    let response;
    try {
      response = await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
    } catch (navError) {
      console.error(`   ❌ Navigation failed:`, navError.message);
      logs.errors.push({
        type: 'navigation-error',
        message: navError.message,
        timestamp: new Date().toISOString()
      });
      throw navError;
    }

    if (!response.ok()) {
      console.error(`   ❌ Failed to load page: ${response.status()} ${response.statusText()}`);
      logs.networkErrors.push({
        url,
        status: response.status(),
        statusText: response.statusText(),
        timestamp: new Date().toISOString()
      });
    }

    // Wait for the component to render
    console.log(`   Waiting for component to render...`);
    try {
      await page.waitForSelector('#root', { timeout: 10000 });
    } catch (error) {
      console.warn(`   ⚠️  Could not find root element:`, error.message);
      // Don't throw here, continue with testing
    }

    // Wait additional time for async errors
    console.log(`   Waiting 5 seconds for async errors...`);
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Take screenshot if page is still available
    let screenshotPath = null;
    try {
      console.log(`   Taking screenshot...`);
      screenshotPath = path.join(SCREENSHOTS_DIR, `${componentName}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });
      console.log(`   ✅ Screenshot saved: ${screenshotPath}`);
    } catch (screenshotError) {
      console.warn(`   ⚠️  Screenshot failed:`, screenshotError.message);
    }

    // Get page title and check for error indicators
    let pageTitle = 'Unknown';
    let hasErrorIndicator = false;
    let storybookError = [];

    try {
      pageTitle = await page.title();

      hasErrorIndicator = await page.evaluate(() => {
        // Look for common error indicators
        const errorSelectors = [
          '[data-testid="error"]',
          '.error',
          '[role="alert"]',
          '[data-error]',
          '.ReactErrorInfo'
        ];

        return errorSelectors.some(selector =>
          document.querySelector(selector) !== null
        );
      });

      // Check if Storybook is showing an error state
      storybookError = await page.evaluate(() => {
        const errorElements = document.querySelectorAll('[class*="error"], [class*="Error"]');
        return Array.from(errorElements).map(el => ({
          tag: el.tagName,
          className: el.className,
          textContent: el.textContent?.substring(0, 200)
        }));
      });
    } catch (evalError) {
      console.warn(`   ⚠️  Could not evaluate page state:`, evalError.message);
    }

    const result = {
      component,
      variation,
      componentName,
      url,
      pageTitle,
      loadStatus: response?.status() || 'unknown',
      hasErrorIndicator,
      storybookError,
      timestamp: new Date().toISOString(),
      screenshot: screenshotPath,
      ...logs
    };

    // Save individual component log
    const logPath = path.join(LOGS_DIR, `${componentName}.json`);
    fs.writeFileSync(logPath, JSON.stringify(result, null, 2));
    console.log(`   ✅ Log saved: ${logPath}`);

    return result;

  } catch (error) {
    console.error(`   ❌ Failed to test ${componentName}:`, error.message);

    const errorResult = {
      component,
      variation,
      componentName,
      url,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
      screenshot: null,
      pageTitle: 'Failed to load',
      loadStatus: 'error',
      hasErrorIndicator: false,
      storybookError: [],
      ...logs
    };

    // Save error log
    const logPath = path.join(LOGS_DIR, `${componentName}-error.json`);
    fs.writeFileSync(logPath, JSON.stringify(errorResult, null, 2));
    console.log(`   ✅ Error log saved: ${logPath}`);

    return errorResult;

  } finally {
    // Safely close page if it exists
    if (page && !page.isClosed()) {
      try {
        await page.close();
      } catch (closeError) {
        console.warn(`   ⚠️  Could not close page:`, closeError.message);
      }
    }
  }
}

// Generate summary report
function generateSummaryReport(results) {
  console.log('\n📊 Generating summary report...');

  const summary = {
    testRun: {
      timestamp: new Date().toISOString(),
      totalComponents: Object.values(COMPONENTS).flat().length,
      testedSuccessfully: results.filter(r => !r.error).length,
      withErrors: results.filter(r => r.errors && r.errors.length > 0).length,
      withWarnings: results.filter(r => r.warnings && r.warnings.length > 0).length,
      withNetworkErrors: results.filter(r => r.networkErrors && r.networkErrors.length > 0).length
    },
    errorCategories: {},
    warnings: [],
    networkErrors: [],
    componentsWithIssues: [],
    recommendations: []
  };

  // Analyze all results
  results.forEach(result => {
    if (result.error) {
      summary.componentsWithIssues.push({
        component: result.componentName,
        type: 'load-error',
        message: result.error
      });
    }

    // Categorize errors
    if (result.errors && result.errors.length > 0) {
      result.errors.forEach(error => {
        const text = error.text || error.message;

        // Common error patterns
        if (text.includes('does not provide an export named')) {
          const category = 'module-export-error';
          if (!summary.errorCategories[category]) {
            summary.errorCategories[category] = [];
          }
          summary.errorCategories[category].push({
            component: result.componentName,
            message: text,
            location: error.location
          });
        } else if (text.includes('No theme was provided')) {
          const category = 'theme-error';
          if (!summary.errorCategories[category]) {
            summary.errorCategories[category] = [];
          }
          summary.errorCategories[category].push({
            component: result.componentName,
            message: text
          });
        } else if (text.includes('Cannot destructure property')) {
          const category = 'destructuring-error';
          if (!summary.errorCategories[category]) {
            summary.errorCategories[category] = [];
          }
          summary.errorCategories[category].push({
            component: result.componentName,
            message: text
          });
        } else if (text.includes('React Error #31')) {
          const category = 'react-error-31';
          if (!summary.errorCategories[category]) {
            summary.errorCategories[category] = [];
          }
          summary.errorCategories[category].push({
            component: result.componentName,
            message: text
          });
        } else {
          const category = 'other-error';
          if (!summary.errorCategories[category]) {
            summary.errorCategories[category] = [];
          }
          summary.errorCategories[category].push({
            component: result.componentName,
            message: text,
            location: error.location
          });
        }
      });

      summary.componentsWithIssues.push({
        component: result.componentName,
        type: 'console-error',
        count: result.errors.length
      });
    }

    // Collect warnings
    if (result.warnings && result.warnings.length > 0) {
      result.warnings.forEach(warning => {
        summary.warnings.push({
          component: result.componentName,
          message: warning.text,
          location: warning.location
        });
      });
    }

    // Collect network errors
    if (result.networkErrors && result.networkErrors.length > 0) {
      result.networkErrors.forEach(networkError => {
        summary.networkErrors.push({
          component: result.componentName,
          ...networkError
        });
      });
    }
  });

  // Generate recommendations
  if (summary.errorCategories['module-export-error']) {
    summary.recommendations.push({
      type: 'module-export',
      priority: 'high',
      description: 'Fix module export errors in PropTypes and other dependencies',
      affectedComponents: summary.errorCategories['module-export-error'].map(e => e.component)
    });
  }

  if (summary.errorCategories['theme-error']) {
    summary.recommendations.push({
      type: 'theme-provider',
      priority: 'high',
      description: 'Ensure ThemeProvider wraps all components',
      affectedComponents: summary.errorCategories['theme-error'].map(e => e.component)
    });
  }

  if (summary.errorCategories['destructuring-error']) {
    summary.recommendations.push({
      type: 'component-props',
      priority: 'medium',
      description: 'Fix component prop destructuring issues',
      affectedComponents: summary.errorCategories['destructuring-error'].map(e => e.component)
    });
  }

  // Save summary report
  const summaryPath = path.join(OUTPUT_DIR, 'console-error-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));

  // Create readable text report
  const textReport = generateTextReport(summary);
  const textReportPath = path.join(OUTPUT_DIR, 'console-error-report.txt');
  fs.writeFileSync(textReportPath, textReport);

  console.log(`   ✅ Summary report saved: ${summaryPath}`);
  console.log(`   ✅ Text report saved: ${textReportPath}`);

  return summary;
}

// Generate human-readable text report
function generateTextReport(summary) {
  let report = '='.repeat(80) + '\n';
  report += 'CONSOLE ERROR TESTING REPORT\n';
  report += '='.repeat(80) + '\n\n';

  report += `Test Run: ${new Date(summary.testRun.timestamp).toLocaleString()}\n`;
  report += `Total Components: ${summary.testRun.totalComponents}\n`;
  report += `Tested Successfully: ${summary.testRun.testedSuccessfully}\n`;
  report += `With Errors: ${summary.testRun.withErrors}\n`;
  report += `With Warnings: ${summary.testRun.withWarnings}\n`;
  report += `With Network Errors: ${summary.testRun.withNetworkErrors}\n\n`;

  if (Object.keys(summary.errorCategories).length > 0) {
    report += 'ERROR CATEGORIES:\n';
    report += '-'.repeat(40) + '\n';

    Object.entries(summary.errorCategories).forEach(([category, errors]) => {
      report += `\n${category.toUpperCase()} (${errors.length} occurrences):\n`;
      errors.forEach(error => {
        report += `  ❌ ${error.component}: ${error.message}\n`;
        if (error.location) {
          report += `     Location: ${error.location.url}:${error.location.lineNumber}\n`;
        }
      });
    });
  }

  if (summary.warnings.length > 0) {
    report += '\nWARNINGS:\n';
    report += '-'.repeat(40) + '\n';
    summary.warnings.forEach(warning => {
      report += `  ⚠️  ${warning.component}: ${warning.message}\n`;
    });
  }

  if (summary.networkErrors.length > 0) {
    report += '\nNETWORK ERRORS:\n';
    report += '-'.repeat(40) + '\n';
    summary.networkErrors.forEach(error => {
      report += `  🌐 ${error.component}: ${error.status || 'FAIL'} ${error.url}\n`;
      if (error.failure) {
        report += `     ${error.failure.errorText}\n`;
      }
    });
  }

  if (summary.recommendations.length > 0) {
    report += '\nRECOMMENDATIONS:\n';
    report += '-'.repeat(40) + '\n';
    summary.recommendations.forEach(rec => {
      report += `\n${rec.priority.toUpperCase()}: ${rec.description}\n`;
      report += `   Affected: ${rec.affectedComponents.join(', ')}\n`;
    });
  }

  return report;
}

// Main test execution
async function runTests() {
  console.log('🎯 Starting Advanced Console Error Testing\n');

  ensureDirectories();

  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor'
    ]
  });

  try {
    const results = [];

    // Test all Frame variations
    console.log('\n📦 Testing Frame Components...');
    for (const variation of COMPONENTS.frame) {
      const result = await testComponentVariation(browser, 'frame', variation);
      results.push(result);
    }

    // Test all Breadcrumbs variations
    console.log('\n📦 Testing Breadcrumbs Components...');
    for (const variation of COMPONENTS.breadcrumbs) {
      const result = await testComponentVariation(browser, 'breadcrumbs', variation);
      results.push(result);
    }

    // Generate summary report
    const summary = generateSummaryReport(results);

    // Print final summary
    console.log('\n' + '='.repeat(80));
    console.log('TESTING COMPLETE');
    console.log('='.repeat(80));
    console.log(`✅ Total Components Tested: ${summary.testRun.totalComponents}`);
    console.log(`✅ Successful: ${summary.testRun.testedSuccessfully}`);
    console.log(`❌ With Errors: ${summary.testRun.withErrors}`);
    console.log(`⚠️  With Warnings: ${summary.testRun.withWarnings}`);
    console.log(`🌐 With Network Issues: ${summary.testRun.withNetworkErrors}`);

    if (summary.recommendations.length > 0) {
      console.log(`\n🎯 ${summary.recommendations.length} recommendations generated`);
    }

    console.log(`\n📁 Results saved to: ${OUTPUT_DIR}`);

  } finally {
    await browser.close();
  }
}

// Check if Storybook is running
async function checkStorybookRunning() {
  try {
    const response = await fetch(`${STORYBOOK_URL}`);
    return response.ok;
  } catch (error) {
    console.error('❌ Storybook is not running at', STORYBOOK_URL);
    console.error('Please start Storybook with: cd storybook && pnpm dev');
    return false;
  }
}

// Run if called directly
if (require.main === module) {
  (async () => {
    const isRunning = await checkStorybookRunning();
    if (!isRunning) {
      process.exit(1);
    }

    await runTests().catch(error => {
      console.error('❌ Testing failed:', error);
      process.exit(1);
    });
  })();
}

module.exports = { runTests, testComponentVariation, generateSummaryReport };