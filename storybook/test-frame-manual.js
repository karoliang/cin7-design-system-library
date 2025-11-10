#!/usr/bin/env node

/**
 * Manual Frame Component Testing
 * Simple test to check if Frame components load without prop-types errors
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const FRAME_VARIATIONS = [
  'default',
  'with-logo',
  'with-notifications',
  'ecommerce-layout',
  'minimal-layout',
  'responsive-behavior'
];

const BASE_URL = 'http://localhost:6006';
const OUTPUT_DIR = path.join(__dirname, 'test-results', 'manual');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testFrameVariation(variation) {
  const url = `${BASE_URL}/iframe.html?id=examples-frame--${variation}&args=&viewMode=story`;
  console.log(`🧪 Testing Frame variation: ${variation}`);
  console.log(`📍 URL: ${url}`);

  const browser = await puppeteer.launch({
    headless: "new", // Use new headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Capture console output
    const consoleMessages = [];
    const errors = [];
    const warnings = [];
    const propTypesLogs = [];

    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();

      consoleMessages.push({ type, text });

      if (text.includes('Virtual prop-types module')) {
        propTypesLogs.push(text);
        console.log(`✅ [${variation}] Prop-types fix working:`, text);
      } else if (text.includes('require is not defined')) {
        errors.push(text);
        console.error(`❌ [${variation}] Prop-types error:`, text);
      } else if (type === 'error') {
        errors.push(text);
        console.error(`🚨 [${variation}] ERROR:`, text);
      } else if (type === 'warning') {
        warnings.push(text);
        console.warn(`⚠️  [${variation}] WARNING:`, text);
      }
    });

    page.on('pageerror', (error) => {
      const errorText = `Page Error: ${error.message}`;
      if (errorText.includes('require is not defined')) {
        propTypesLogs.push(`❌ Prop-types error: ${error.message}`);
      }
      errors.push(errorText);
      console.error(`💥 [${variation}] PAGE ERROR:`, error.message);
    });

    // Navigate to the page
    console.log(`🚀 Loading page...`);
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded', // Faster than networkidle2
      timeout: 15000
    });

    if (!response.ok()) {
      throw new Error(`Failed to load page: ${response.status()} ${response.statusText()}`);
    }

    // Wait for content to load
    await page.waitForTimeout(3000);

    // Check if page has Frame content
    const hasFrameContent = await page.evaluate(() => {
      return document.body.textContent.includes('Frame') ||
             document.body.textContent.includes('Dashboard') ||
             document.body.textContent.includes('Navigation') ||
             document.querySelector('[data-polaris-frame="true"]') ||
             document.querySelector('.Polaris-Frame') ||
             document.querySelector('frame');
    });

    // Check for React error boundaries
    const hasErrorContent = await page.evaluate(() => {
      const bodyText = document.body.textContent || '';
      return bodyText.includes('Component Error') ||
             bodyText.includes('Failed to render') ||
             bodyText.includes('error') && bodyText.includes('React');
    });

    // Take screenshot
    const screenshotPath = path.join(OUTPUT_DIR, `frame-${variation}-manual.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`📸 Screenshot saved: ${screenshotPath}`);

    // Get page title
    const pageTitle = await page.title();

    const result = {
      component: 'frame',
      variation,
      url,
      timestamp: new Date().toISOString(),
      pageTitle,
      hasFrameContent,
      hasErrorContent,
      propTypesWorking: propTypesLogs.length > 0,
      propTypesError: errors.some(e => e.includes('require is not defined')),
      consoleMessages,
      errors,
      warnings,
      propTypesLogs,
      screenshotPath,
      success: !hasErrorContent && !errors.some(e => e.includes('require is not defined'))
    };

    console.log(`${result.success ? '✅' : '❌'} [${variation}] Test completed`);
    console.log(`   - PropTypes working: ${result.propTypesWorking}`);
    console.log(`   - Has Frame content: ${result.hasFrameContent}`);
    console.log(`   - Has error content: ${result.hasErrorContent}`);
    console.log(`   - PropTypes errors: ${result.propTypesError}`);
    console.log(`   - Total errors: ${errors.length}`);
    console.log(`   - Total warnings: ${warnings.length}`);

    // Save result
    const outputPath = path.join(OUTPUT_DIR, `frame-${variation}-manual.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
    console.log(`📄 Results saved: ${outputPath}`);

    return result;

  } catch (error) {
    const errorResult = {
      component: 'frame',
      variation,
      url,
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      success: false
    };

    console.error(`💥 [${variation}] Fatal test error:`, error.message);

    const errorOutputPath = path.join(OUTPUT_DIR, `frame-${variation}-manual-error.json`);
    fs.writeFileSync(errorOutputPath, JSON.stringify(errorResult, null, 2));

    return errorResult;
  } finally {
    await browser.close();
  }
}

async function runManualTests() {
  console.log('🚀 Starting manual Frame component testing...\n');

  const results = [];
  let successCount = 0;
  let propTypesWorkingCount = 0;

  for (const variation of FRAME_VARIATIONS) {
    try {
      const result = await testFrameVariation(variation);
      results.push(result);

      if (result.success) successCount++;
      if (result.propTypesWorking) propTypesWorkingCount++;

    } catch (error) {
      console.error(`💥 Failed to test ${variation}:`, error.message);
      results.push({
        component: 'frame',
        variation,
        error: error.message,
        success: false
      });
    }

    // Small delay between tests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Generate summary
  console.log('\n📊 MANUAL TEST SUMMARY');
  console.log('=======================');
  console.log(`✅ Successful tests: ${successCount}/${FRAME_VARIATIONS.length}`);
  console.log(`🔧 PropTypes working: ${propTypesWorkingCount}/${FRAME_VARIATIONS.length}`);

  if (propTypesWorkingCount === FRAME_VARIATIONS.length) {
    console.log('🎉 ALL FRAME VARIATIONS: PropTypes fix is working correctly!');
  } else {
    console.log('⚠️  Some Frame variations still have PropTypes issues');
  }

  // Check for any remaining errors
  const totalErrors = results.reduce((sum, r) => sum + (r.errors?.length || 0), 0);
  const totalWarnings = results.reduce((sum, r) => sum + (r.warnings?.length || 0), 0);

  console.log(`🚨 Total errors: ${totalErrors}`);
  console.log(`⚠️  Total warnings: ${totalWarnings}`);

  // Save comprehensive summary
  const summary = {
    timestamp: new Date().toISOString(),
    component: 'frame',
    totalVariations: FRAME_VARIATIONS.length,
    successfulTests: successCount,
    propTypesWorking: propTypesWorkingCount,
    propTypesFixWorking: propTypesWorkingCount === FRAME_VARIATIONS.length,
    totalErrors,
    totalWarnings,
    results
  };

  const summaryPath = path.join(OUTPUT_DIR, 'frame-manual-test-summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`📄 Summary saved: ${summaryPath}`);

  return summary;
}

// Run tests if executed directly
if (require.main === module) {
  runManualTests().catch(console.error);
}

module.exports = { testFrameVariation, runManualTests };