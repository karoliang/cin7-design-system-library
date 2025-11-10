#!/usr/bin/env node

/**
 * Detailed Frame Component Debugging Script
 * Uses Puppeteer to capture detailed console output and DOM analysis
 */

const puppeteer = require('puppeteer');

const FRAME_URLS = [
  { name: 'Default', url: 'http://localhost:6011/iframe.html?id=examples-frame--default&args=&viewMode=story' },
  { name: 'WithLogo', url: 'http://localhost:6011/iframe.html?id=examples-frame--with-logo&args=&viewMode=story' }
];

async function debugFrameComponent(url, name) {
  console.log(`\n🔍 DEBUGGING: ${name}`);
  console.log(`📍 URL: ${url}`);
  console.log('=' .repeat(80));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    // Capture ALL console output with detailed context
    const consoleMessages = [];
    const errors = [];
    const warnings = [];
    const logs = [];
    const infos = [];

    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();
      const location = msg.location();

      const fullMessage = {
        type,
        text,
        location: location ? `${location.url}:${location.lineNumber}` : 'unknown',
        timestamp: new Date().toISOString()
      };

      consoleMessages.push(fullMessage);

      if (type === 'error') {
        errors.push(fullMessage);
        console.error(`🔴 ERROR [${name}]:`, text);
        if (location) console.error(`   Location: ${location.url}:${location.lineNumber}`);
      } else if (type === 'warning') {
        warnings.push(fullMessage);
        console.warn(`🟡 WARNING [${name}]:`, text);
      } else if (type === 'info') {
        infos.push(fullMessage);
        console.info(`🔵 INFO [${name}]:`, text);
      } else {
        logs.push(fullMessage);
        console.log(`⚪ LOG [${name}]:`, text);
      }
    });

    // Capture page errors
    page.on('pageerror', (error) => {
      const errorInfo = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      errors.push(errorInfo);
      console.error(`💥 PAGE ERROR [${name}]:`, error.message);
      console.error(`   Stack:`, error.stack);
    });

    // Capture request failures
    page.on('requestfailed', (request) => {
      const failure = {
        url: request.url(),
        error: request.failure()?.errorText,
        timestamp: new Date().toISOString()
      };
      console.error(`🌐 NETWORK ERROR [${name}]:`, `${failure.url} - ${failure.error}`);
    });

    // Navigate with extended timeout
    console.log(`🚀 Loading page...`);
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 45000
    });

    if (!response.ok()) {
      throw new Error(`Failed to load page: ${response.status()} ${response.statusText()}`);
    }

    console.log(`✅ Page loaded successfully: ${response.status()}`);

    // Wait for various possible indicators
    console.log(`⏳ Waiting for content to render...`);

    // Wait for either Frame component or error indicators
    await Promise.race([
      page.waitForSelector('[data-polaris-frame="true"], .Polaris-Frame, frame', { timeout: 15000 }),
      page.waitForSelector('#storybook-root', { timeout: 15000 }),
      page.waitForSelector('[data-testid="error-boundary"], h2, .error-boundary', { timeout: 15000 }),
      page.waitForSelector('body[class*="error"], body[class*="failed"]', { timeout: 15000 })
    ]).catch(() => {
      console.warn(`⚠️ No specific elements found within timeout, proceeding with analysis...`);
    });

    // Additional wait for dynamic content
    await page.waitForTimeout(3000);

    // Get page content for analysis
    const pageContent = await page.content();
    const pageTitle = await page.title();

    // Analyze the DOM in detail
    console.log(`🔬 Analyzing DOM structure...`);
    const domAnalysis = await page.evaluate(() => {
      const analysis = {
        title: document.title,
        url: window.location.href,
        bodyClasses: document.body.className,
        bodyText: document.body.textContent?.substring(0, 500) || '',

        // Check for various error indicators
        hasErrorText: document.body.textContent.includes('error') || document.body.textContent.includes('Error'),
        hasNoPreview: document.body.textContent.includes('No Preview'),
        hasReactError: document.body.textContent.includes('React Error') || document.body.textContent.includes('Error rendering component'),
        hasPropTypesError: document.body.textContent.includes('prop-types') || document.body.textContent.includes('PropTypes'),
        hasThemeError: document.body.textContent.includes('No theme was provided'),
        hasDestructuringError: document.body.textContent.includes('Cannot destructure'),

        // Check for success indicators
        hasStorybookRoot: !!document.querySelector('#storybook-root'),
        hasFrameComponent: !!document.querySelector('[data-polaris-frame="true"], .Polaris-Frame, frame'),
        hasTopBar: !!document.querySelector('[data-polaris-topbar="true"], .Polaris-TopBar'),
        hasNavigation: !!document.querySelector('[data-polaris-navigation="true"], .Polaris-Navigation'),
        hasSearchField: !!document.querySelector('[data-polaris-searchfield="true"], .Polaris-TopBar-SearchField'),
        hasPolarisComponents: !!document.querySelector('[class*="Polaris-"], [data-polaris-]'),

        // Check for specific elements
        hasErrorBoundary: !!document.querySelector('[data-testid="error-boundary"], .error-boundary'),
        hasLoadingIndicator: !!document.querySelector('[class*="loading"], [class*="spinner"]'),
        hasEmptyState: !!document.querySelector('[class*="empty"], [class*="placeholder"]'),

        // Get all visible text
        visibleText: document.body.textContent?.substring(0, 1000) || '',

        // Check console messages
        consoleLogs: [],

        // Get React devtools if available
        reactDevTools: !!(window.__REACT_DEVTOOLS_GLOBAL_HOOK__),

        // Check if any scripts failed
        failedScripts: Array.from(document.querySelectorAll('script')).filter(script => {
          return !script.src || script.src.includes('error');
        }).length
      };

      // Try to get any console logs that might be available
      try {
        if (window.console && window.console.logs) {
          analysis.consoleLogs = Array.from(window.console.logs || []);
        }
      } catch (e) {
        // Ignore
      }

      return analysis;
    });

    // Look for specific error patterns in the content
    const errorPatterns = [
      /ReferenceError/g,
      /TypeError/g,
      /Cannot read propert/g,
      /prop-types/g,
      /require is not defined/g,
      /No theme was provided/g,
      /Cannot destructure/g,
      /Error rendering component/g
    ];

    const detectedErrors = [];
    errorPatterns.forEach(pattern => {
      const matches = pageContent.match(pattern);
      if (matches) {
        detectedErrors.push({
          pattern: pattern.source,
          count: matches.length,
          sample: matches[0]
        });
      }
    });

    // Print detailed analysis
    console.log(`\n📊 ANALYSIS RESULTS FOR: ${name}`);
    console.log('-'.repeat(60));
    console.log(`📄 Page Title: ${pageTitle}`);
    console.log(`🔗 URL: ${domAnalysis.url}`);
    console.log(`🎨 Body Classes: ${domAnalysis.bodyClasses}`);

    console.log(`\n🔍 ERROR INDICATORS:`);
    console.log(`   Has Error Text: ${domAnalysis.hasErrorText}`);
    console.log(`   Has No Preview: ${domAnalysis.hasNoPreview}`);
    console.log(`   Has React Error: ${domAnalysis.hasReactError}`);
    console.log(`   Has PropTypes Error: ${domAnalysis.hasPropTypesError}`);
    console.log(`   Has Theme Error: ${domAnalysis.hasThemeError}`);
    console.log(`   Has Destructuring Error: ${domAnalysis.hasDestructuringError}`);

    console.log(`\n✅ SUCCESS INDICATORS:`);
    console.log(`   Has Storybook Root: ${domAnalysis.hasStorybookRoot}`);
    console.log(`   Has Frame Component: ${domAnalysis.hasFrameComponent}`);
    console.log(`   Has TopBar: ${domAnalysis.hasTopBar}`);
    console.log(`   Has Navigation: ${domAnalysis.hasNavigation}`);
    console.log(`   Has SearchField: ${domAnalysis.hasSearchField}`);
    console.log(`   Has Polaris Components: ${domAnalysis.hasPolarisComponents}`);

    console.log(`\n🔧 TECHNICAL INFO:`);
    console.log(`   React DevTools Available: ${domAnalysis.reactDevTools}`);
    console.log(`   Failed Scripts: ${domAnalysis.failedScripts}`);
    console.log(`   Error Boundary Present: ${domAnalysis.hasErrorBoundary}`);

    if (detectedErrors.length > 0) {
      console.log(`\n🚨 DETECTED ERROR PATTERNS:`);
      detectedErrors.forEach(error => {
        console.log(`   ${error.pattern}: ${error.count} occurrences`);
        console.log(`   Sample: ${error.sample}`);
      });
    }

    if (consoleMessages.length > 0) {
      console.log(`\n📝 CONSOLE SUMMARY:`);
      console.log(`   Errors: ${errors.length}`);
      console.log(`   Warnings: ${warnings.length}`);
      console.log(`   Info: ${infos.length}`);
      console.log(`   Logs: ${logs.length}`);
    }

    if (domAnalysis.visibleText) {
      console.log(`\n📄 VISIBLE TEXT (first 1000 chars):`);
      console.log(`   ${domAnalysis.visibleText.substring(0, 500)}...`);
    }

    return {
      name,
      url,
      success: !domAnalysis.hasNoPreview && !domAnalysis.hasErrorText && domAnalysis.hasFrameComponent,
      domAnalysis,
      consoleMessages: {
        total: consoleMessages.length,
        errors: errors.length,
        warnings: warnings.length,
        infos: infos.length,
        logs: logs.length
      },
      detectedErrors,
      pageTitle
    };

  } catch (error) {
    console.error(`💥 FATAL ERROR debugging ${name}:`, error.message);
    console.error(`Stack:`, error.stack);

    return {
      name,
      url,
      success: false,
      error: error.message,
      stack: error.stack
    };
  } finally {
    await browser.close();
  }
}

async function runDetailedDebugging() {
  console.log('🚀 DETAILED FRAME COMPONENT DEBUGGING');
  console.log('=======================================');
  console.log(`📅 Started: ${new Date().toISOString()}`);

  const results = [];

  for (const frame of FRAME_URLS) {
    try {
      const result = await debugFrameComponent(frame.url, frame.name);
      results.push(result);

      // Add delay between tests
      console.log(`\n⏳ Waiting 2 seconds before next test...`);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`💥 Failed to debug ${frame.name}:`, error.message);
      results.push({
        name: frame.name,
        url: frame.url,
        success: false,
        error: error.message
      });
    }
  }

  // Print final summary
  console.log('\n🎯 FINAL DEBUGGING SUMMARY');
  console.log('==========================');

  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;

  console.log(`📈 Results: ${successful}/${results.length} successful, ${failed} failed`);

  if (failed > 0) {
    console.log('\n❌ FAILED COMPONENTS:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   • ${result.name}: ${result.error || 'Unknown error'}`);
    });
  }

  if (successful > 0) {
    console.log('\n✅ SUCCESSFUL COMPONENTS:');
    results.filter(r => r.success).forEach(result => {
      console.log(`   • ${result.name}: Rendered successfully`);
    });
  }

  console.log(`\n🏁 Debugging completed: ${new Date().toISOString()}`);
  return results;
}

// Run the debugging
if (require.main === module) {
  runDetailedDebugging().catch(console.error);
}

module.exports = { debugFrameComponent, runDetailedDebugging };