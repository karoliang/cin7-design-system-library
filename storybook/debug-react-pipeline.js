#!/usr/bin/env node

/**
 * React Component Pipeline Debugger
 * Identifies the exact point where React component initialization fails
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function debugReactPipeline() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    frame: { url: '', errors: [], warnings: [], reactError: null, consoleState: {} },
    breadcrumbs: { url: '', errors: [], warnings: [], reactError: null, consoleState: {} },
    timestamp: new Date().toISOString()
  };

  try {
    const page = await browser.newPage();

    // Capture ALL console activity with detailed categorization
    const consoleMessages = [];
    page.on('console', msg => {
      const details = {
        type: msg.type(),
        text: msg.text(),
        location: msg.location(),
        timestamp: new Date().toISOString()
      };
      consoleMessages.push(details);

      if (msg.type() === 'error') {
        console.error(`🚨 ${msg.text()}`, msg.location());
      } else if (msg.type() === 'warning') {
        console.warn(`⚠️ ${msg.text()}`, msg.location());
      } else {
        console.log(`📝 ${msg.text()}`);
      }
    });

    // Monitor page errors (uncaught exceptions, resource failures)
    page.on('pageerror', error => {
      const errorInfo = {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      };
      consoleMessages.push({
        type: 'pageerror',
        ...errorInfo
      });
      console.error('🔥 Page Error:', errorInfo);
    });

    // Monitor resource loading failures
    page.on('requestfailed', request => {
      const failure = {
        url: request.url(),
        failure: request.failure(),
        timestamp: new Date().toISOString()
      };
      consoleMessages.push({
        type: 'requestfailed',
        ...failure
      });
      console.error('❌ Request Failed:', failure);
    });

    // Enhanced React DevTools detection
    await page.evaluateOnNewDocument(() => {
      // Hook into React rendering pipeline
      if (typeof window !== 'undefined') {
        window.REACT_DEBUG_INFO = {
          renderErrors: [],
          componentErrors: [],
          updateErrors: [],
          mountState: 'initializing'
        };

        // Monitor React errors
        window.addEventListener('error', (event) => {
          if (event.message && event.message.includes('react')) {
            window.REACT_DEBUG_INFO.renderErrors.push({
              message: event.message,
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno,
              timestamp: Date.now()
            });
          }
        });

        // Monitor unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
          window.REACT_DEBUG_INFO.componentErrors.push({
            reason: event.reason,
            timestamp: Date.now()
          });
        });
      }
    });

    // Test Frame component
    console.log('🔍 Testing Frame component...');
    const frameUrl = 'http://localhost:6012/iframe.html?id=components-navigation-frame--default&args=&viewMode=story';

    try {
      const response = await page.goto(frameUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      results.frame.url = frameUrl;
      console.log(`📊 Frame page loaded with status: ${response.status()}`);

      // Wait for React to attempt initialization
      await page.waitForTimeout(5000);

      // Check React debug state
      const frameDebugInfo = await page.evaluate(() => {
        return {
          reactDebugInfo: window.REACT_DEBUG_INFO || null,
          hasReact: typeof window.React !== 'undefined',
          hasReactDOM: typeof window.ReactDOM !== 'undefined',
          hasStorybook: typeof window.__STORYBOOK_CLIENT_API__ !== 'undefined',
          storybookReady: window.__STORYBOOK_CLIENT_API__ ? true : false,
          documentReady: document.readyState,
          storybookRoot: document.getElementById('storybook-root') ? true : false,
          hasErrorDisplay: document.querySelector('.sb-errordisplay') ? true : false,
          hasPreparingStory: document.querySelector('.sb-preparing-story') ? true : false,
          errorElements: document.querySelectorAll('[class*="error"]').length,
          preparingElements: document.querySelectorAll('[class*="preparing"]').length,
          frameElements: document.querySelectorAll('[class*="frame"]').length,
          breadcrumbsElements: document.querySelectorAll('[class*="breadcrumbs"]').length,
          bodyHTML: document.body.innerHTML.substring(0, 1000)
        };
      });

      results.frame.reactState = frameDebugInfo;
      console.log('Frame React Debug Info:', JSON.stringify(frameDebugInfo, null, 2));

      // Capture Frame-specific console messages
      results.frame.errors = consoleMessages.filter(m => m.type === 'error');
      results.frame.warnings = consoleMessages.filter(m => m.type === 'warning');
      results.frame.consoleState = {
        totalMessages: consoleMessages.length,
        errorCount: consoleMessages.filter(m => m.type === 'error').length,
        warningCount: consoleMessages.filter(m => m.type === 'warning').length
      };

    } catch (error) {
      results.frame.errors.push({
        type: 'navigation_error',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      console.error('Frame navigation failed:', error);
    }

    // Clear console for next test
    consoleMessages.length = 0;

    // Test Breadcrumbs component
    console.log('🔍 Testing Breadcrumbs component...');
    const breadcrumbsUrl = 'http://localhost:6012/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story';

    try {
      const response = await page.goto(breadcrumbsUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      results.breadcrumbs.url = breadcrumbsUrl;
      console.log(`📊 Breadcrumbs page loaded with status: ${response.status()}`);

      // Wait for React to attempt initialization
      await page.waitForTimeout(5000);

      // Check React debug state
      const breadcrumbsDebugInfo = await page.evaluate(() => {
        return {
          reactDebugInfo: window.REACT_DEBUG_INFO || null,
          hasReact: typeof window.React !== 'undefined',
          hasReactDOM: typeof window.ReactDOM !== 'undefined',
          hasStorybook: typeof window.__STORYBOOK_CLIENT_API__ !== 'undefined',
          storybookReady: window.__STORYBOOK_CLIENT_API__ ? true : false,
          documentReady: document.readyState,
          storybookRoot: document.getElementById('storybook-root') ? true : false,
          hasErrorDisplay: document.querySelector('.sb-errordisplay') ? true : false,
          hasPreparingStory: document.querySelector('.sb-preparing-story') ? true : false,
          errorElements: document.querySelectorAll('[class*="error"]').length,
          preparingElements: document.querySelectorAll('[class*="preparing"]').length,
          frameElements: document.querySelectorAll('[class*="frame"]').length,
          breadcrumbsElements: document.querySelectorAll('[class*="breadcrumbs"]').length,
          bodyHTML: document.body.innerHTML.substring(0, 1000)
        };
      });

      results.breadcrumbs.reactState = breadcrumbsDebugInfo;
      console.log('Breadcrumbs React Debug Info:', JSON.stringify(breadcrumbsDebugInfo, null, 2));

      // Capture Breadcrumbs-specific console messages
      results.breadcrumbs.errors = consoleMessages.filter(m => m.type === 'error');
      results.breadcrumbs.warnings = consoleMessages.filter(m => m.type === 'warning');
      results.breadcrumbs.consoleState = {
        totalMessages: consoleMessages.length,
        errorCount: consoleMessages.filter(m => m.type === 'error').length,
        warningCount: consoleMessages.filter(m => m.type === 'warning').length
      };

    } catch (error) {
      results.breadcrumbs.errors.push({
        type: 'navigation_error',
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
      console.error('Breadcrumbs navigation failed:', error);
    }

  } catch (error) {
    console.error('Critical debugging error:', error);
  } finally {
    await browser.close();
  }

  // Save comprehensive debug report
  const reportPath = path.join(__dirname, 'test-results', 'react-pipeline-debug-report.json');
  const reportDir = path.dirname(reportPath);

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`📄 Detailed React debug report saved to: ${reportPath}`);

  // Generate summary analysis
  console.log('\n📋 REACT PIPELINE ANALYSIS SUMMARY:');
  console.log('=====================================');

  ['frame', 'breadcrumbs'].forEach(component => {
    const result = results[component];
    console.log(`\n🔍 ${component.toUpperCase()} COMPONENT:`);
    console.log(`  URL: ${result.url}`);
    console.log(`  Console Errors: ${result.errors.length}`);
    console.log(`  Console Warnings: ${result.warnings.length}`);

    if (result.reactState) {
      console.log(`  React Available: ${result.reactState.hasReact}`);
      console.log(`  ReactDOM Available: ${result.reactState.hasReactDOM}`);
      console.log(`  Storybook API Available: ${result.reactState.hasStorybook}`);
      console.log(`  Document Ready: ${result.reactState.documentReady}`);
      console.log(`  Storybook Root Found: ${result.reactState.storybookRoot}`);
      console.log(`  Error Display Present: ${result.reactState.hasErrorDisplay}`);
      console.log(`  Preparing Story Present: ${result.reactState.hasPreparingStory}`);
      console.log(`  Error Elements: ${result.reactState.errorElements}`);
      console.log(`  Preparing Elements: ${result.reactState.preparingElements}`);

      if (result.reactState.frameElements > 0) {
        console.log(`  ✅ Frame Elements Found: ${result.reactState.frameElements}`);
      } else {
        console.log(`  ❌ No Frame Elements Found`);
      }

      if (result.reactState.breadcrumbsElements > 0) {
        console.log(`  ✅ Breadcrumbs Elements Found: ${result.reactState.breadcrumbsElements}`);
      } else {
        console.log(`  ❌ No Breadcrumbs Elements Found`);
      }
    }

    if (result.errors.length > 0) {
      console.log('\n  Key Errors:');
      result.errors.slice(0, 3).forEach(error => {
        console.log(`    - ${error.message || error.text}`);
      });
    }
  });

  return results;
}

// Run the debugger
debugReactPipeline().catch(console.error);