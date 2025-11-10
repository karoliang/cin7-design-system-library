#!/usr/bin/env node

/**
 * Frame Component Comprehensive Testing Suite
 * Tests all 6 Frame variations for console errors, warnings, and rendering issues
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Frame variations to test
const FRAME_VARIATIONS = [
  'default',
  'with-logo',
  'with-notifications',
  'ecommerce-layout',
  'minimal-layout',
  'responsive-behavior'
];

// Test configuration
const BASE_URL = 'http://localhost:6006';
const OUTPUT_DIR = path.join(__dirname, 'test-results', 'logs');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Captures console output from a Frame variation
 */
async function testFrameVariation(variation) {
  const url = `${BASE_URL}/iframe.html?id=examples-frame--${variation}&args=&viewMode=story`;
  console.log(`🧪 Testing Frame variation: ${variation}`);
  console.log(`📍 URL: ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Capture console output
    const consoleMessages = [];
    const errors = [];
    const warnings = [];

    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();

      consoleMessages.push({
        type,
        text,
        location: msg.location()
      });

      if (type === 'error') {
        errors.push(text);
        console.error(`❌ [${variation}] ERROR:`, text);
      } else if (type === 'warning') {
        warnings.push(text);
        console.warn(`⚠️  [${variation}] WARNING:`, text);
      } else {
        console.log(`ℹ️  [${variation}] ${type.toUpperCase()}:`, text);
      }
    });

    // Capture page errors
    page.on('pageerror', (error) => {
      const errorText = `Page Error: ${error.message}`;
      errors.push(errorText);
      console.error(`💥 [${variation}] PAGE ERROR:`, error.message);
      console.error(`   Stack:`, error.stack);
    });

    // Capture request failures
    page.on('requestfailed', (request) => {
      const failure = `Request failed: ${request.url()} - ${request.failure()?.errorText}`;
      errors.push(failure);
      console.error(`🌐 [${variation}] NETWORK ERROR:`, failure);
    });

    // Navigate to the page
    console.log(`🚀 Loading page...`);
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    if (!response.ok()) {
      throw new Error(`Failed to load page: ${response.status()} ${response.statusText()}`);
    }

    // Wait for Frame component to render
    console.log(`⏳ Waiting for Frame component to render...`);
    await page.waitForSelector('[data-polaris-frame="true"]', { timeout: 10000 })
      .catch(() => {
        console.warn(`⚠️  [${variation}] Could not find Frame component selector, trying generic selectors...`);
        return page.waitForSelector('frame, [role="navigation"], .Polaris-Frame', { timeout: 5000 })
          .catch(() => console.warn(`⚠️  [${variation}] No Frame component found within timeout`));
      });

    // Additional wait for any dynamic content
    await page.waitForTimeout(2000);

    // Check for specific TopBar.SearchField issues
    console.log(`🔍 Checking for TopBar.SearchField issues...`);
    const searchFieldExists = await page.evaluate(() => {
      return !!document.querySelector('[data-polaris-searchfield="true"], input[placeholder*="Search"], .Polaris-TopBar-SearchField');
    });

    if (!searchFieldExists) {
      warnings.push('TopBar.SearchField element not found in DOM');
      console.warn(`⚠️  [${variation}] TopBar.SearchField element not found`);
    }

    // Check for React error boundaries
    console.log(`🚨 Checking for React error boundaries...`);
    const errorBoundaryExists = await page.evaluate(() => {
      return !!document.querySelector('[data-reactroot] h2, .error-boundary, [data-testid="error-boundary"]');
    });

    if (errorBoundaryExists) {
      const errorText = await page.evaluate(() => {
        const errorElement = document.querySelector('h2, .error-boundary, [data-testid="error-boundary"]');
        return errorElement ? errorElement.textContent : 'Unknown error boundary content';
      });
      errors.push(`React Error Boundary triggered: ${errorText}`);
      console.error(`🚨 [${variation}] React Error Boundary found: ${errorText}`);
    }

    // Take screenshot for visual analysis
    const screenshotPath = path.join(OUTPUT_DIR, `frame-${variation}-screenshot.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    // Get page title and any error messages
    const pageTitle = await page.title();
    const hasErrorContent = await page.evaluate(() => {
      const body = document.body.textContent || '';
      return body.includes('error') || body.includes('Error') || body.includes('failed');
    });

    // Analyze the DOM structure
    console.log(`🔬 Analyzing DOM structure...`);
    const domAnalysis = await page.evaluate(() => {
      const frame = document.querySelector('[data-polaris-frame="true"], frame, .Polaris-Frame');
      const topBar = document.querySelector('[data-polaris-topbar="true"], .Polaris-TopBar');
      const navigation = document.querySelector('[data-polaris-navigation="true"], .Polaris-Navigation');
      const searchField = document.querySelector('[data-polaris-searchfield="true"], .Polaris-TopBar-SearchField');

      return {
        hasFrame: !!frame,
        hasTopBar: !!topBar,
        hasNavigation: !!navigation,
        hasSearchField: !!searchField,
        bodyClasses: document.body.className,
        hasErrorClasses: document.body.className.includes('error') || document.body.className.includes('failed')
      };
    });

    const result = {
      component: 'frame',
      variation,
      componentName: `frame-${variation}`,
      url,
      timestamp: new Date().toISOString(),
      pageTitle,
      hasErrorContent,
      consoleMessages,
      errors,
      warnings,
      domAnalysis,
      screenshotPath,
      success: errors.length === 0
    };

    // Save detailed results
    const outputPath = path.join(OUTPUT_DIR, `frame-${variation}-detailed-test.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));

    console.log(`✅ [${variation}] Test completed. Errors: ${errors.length}, Warnings: ${warnings.length}`);
    console.log(`📄 Results saved: ${outputPath}`);

    return result;

  } catch (error) {
    const errorResult = {
      component: 'frame',
      variation,
      componentName: `frame-${variation}`,
      url,
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      success: false
    };

    const errorOutputPath = path.join(OUTPUT_DIR, `frame-${variation}-fatal-error.json`);
    fs.writeFileSync(errorOutputPath, JSON.stringify(errorResult, null, 2));

    console.error(`💥 [${variation}] Fatal test error:`, error.message);
    console.error(`📄 Error report saved: ${errorOutputPath}`);

    return errorResult;
  } finally {
    await browser.close();
  }
}

/**
 * Runs comprehensive testing for all Frame variations
 */
async function runComprehensiveTests() {
  console.log('🚀 Starting comprehensive Frame component testing...\n');

  const results = [];

  for (const variation of FRAME_VARIATIONS) {
    try {
      const result = await testFrameVariation(variation);
      results.push(result);
    } catch (error) {
      console.error(`💥 Failed to test ${variation}:`, error.message);
      results.push({
        component: 'frame',
        variation,
        error: error.message,
        success: false
      });
    }

    // Add delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generate summary report
  console.log('\n📊 GENERATING COMPREHENSIVE TEST REPORT...\n');

  const summary = {
    timestamp: new Date().toISOString(),
    component: 'frame',
    totalVariations: FRAME_VARIATIONS.length,
    successfulTests: results.filter(r => r.success).length,
    failedTests: results.filter(r => !r.success).length,
    totalErrors: results.reduce((sum, r) => sum + (r.errors?.length || 0), 0),
    totalWarnings: results.reduce((sum, r) => sum + (r.warnings?.length || 0), 0),
    results,
    commonErrors: [],
    commonWarnings: [],
    recommendations: []
  };

  // Analyze common issues
  const allErrors = results.flatMap(r => r.errors || []);
  const allWarnings = results.flatMap(r => r.warnings || []);

  // Count frequency of errors
  const errorCounts = {};
  allErrors.forEach(error => {
    errorCounts[error] = (errorCounts[error] || 0) + 1;
  });

  const warningCounts = {};
  allWarnings.forEach(warning => {
    warningCounts[warning] = (warningCounts[warning] || 0) + 1;
  });

  // Get most common issues
  summary.commonErrors = Object.entries(errorCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([error, count]) => ({ error, count }));

  summary.commonWarnings = Object.entries(warningCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([warning, count]) => ({ warning, count }));

  // Generate recommendations
  if (summary.totalErrors > 0) {
    summary.recommendations.push('Critical errors found - immediate attention required');
  }

  if (summary.commonErrors.some(e => e.error.includes('SearchField'))) {
    summary.recommendations.push('Investigate TopBar.SearchField prop validation and implementation');
  }

  if (summary.commonErrors.some(e => e.error.includes('theme'))) {
    summary.recommendations.push('Check theme provider configuration for Frame component');
  }

  if (summary.commonErrors.some(e => e.error.includes('React'))) {
    summary.recommendations.push('Review React component structure and error boundaries');
  }

  // Save comprehensive report
  const reportPath = path.join(OUTPUT_DIR, 'frame-comprehensive-test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));

  // Print summary
  console.log('🎯 COMPREHENSIVE TEST SUMMARY');
  console.log('================================');
  console.log(`✅ Successful tests: ${summary.successfulTests}/${summary.totalVariations}`);
  console.log(`❌ Failed tests: ${summary.failedTests}/${summary.totalVariations}`);
  console.log(`🚨 Total errors: ${summary.totalErrors}`);
  console.log(`⚠️  Total warnings: ${summary.totalWarnings}`);
  console.log(`📄 Full report: ${reportPath}`);

  if (summary.commonErrors.length > 0) {
    console.log('\n🔥 MOST COMMON ERRORS:');
    summary.commonErrors.forEach((e, i) => {
      console.log(`${i + 1}. (${e.count}x) ${e.error}`);
    });
  }

  if (summary.commonWarnings.length > 0) {
    console.log('\n⚠️  MOST COMMON WARNINGS:');
    summary.commonWarnings.forEach((w, i) => {
      console.log(`${i + 1}. (${w.count}x) ${w.warning}`);
    });
  }

  if (summary.recommendations.length > 0) {
    console.log('\n💡 RECOMMENDATIONS:');
    summary.recommendations.forEach((r, i) => {
      console.log(`${i + 1}. ${r}`);
    });
  }

  console.log('\n✅ Comprehensive testing completed!');
  return summary;
}

// Run tests if this file is executed directly
if (require.main === module) {
  runComprehensiveTests().catch(console.error);
}

module.exports = { testFrameVariation, runComprehensiveTests };