const CDP = require('chrome-remote-interface');
const fs = require('fs');

// Component URLs to test
const componentTests = [
  // Frame components
  { name: 'Frame - Default', url: 'http://localhost:6007/?path=/docs/layout-frame--docs' },
  { name: 'Frame - With Logo', url: 'http://localhost:6007/?path=/story/layout-frame-with-logo' },
  { name: 'Frame - With Notifications', url: 'http://localhost:6007/?path=/story/layout-frame-with-notifications' },
  { name: 'Frame - Ecommerce Layout', url: 'http://localhost:6007/?path=/story/layout-frame-ecommerce-layout' },
  { name: 'Frame - Minimal Layout', url: 'http://localhost:6007/?path=/story/layout-frame-minimal-layout' },
  { name: 'Frame - Responsive Behavior', url: 'http://localhost:6007/?path=/story/layout-frame-responsive-behavior' },

  // Breadcrumbs components
  { name: 'Breadcrumbs - Default', url: 'http://localhost:6007/?path=/docs/navigation-breadcrumbs--docs' },
  { name: 'Breadcrumbs - Short Path', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-short-path' },
  { name: 'Breadcrumbs - Long Path', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-long-path' },
  { name: 'Breadcrumbs - Product Navigation', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-product-navigation' },
  { name: 'Breadcrumbs - Ecommerce Navigation', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-ecommerce-navigation' },
  { name: 'Breadcrumbs - Admin Panel', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-admin-panel' },
  { name: 'Breadcrumbs - Documentation Site', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-documentation-site' },
  { name: 'Breadcrumbs - Many Items', url: 'http://localhost:6007/?path=/story/navigation-breadcrumbs-many-items' }
];

async function runCDPTest() {
  console.log('🚀 Starting Chrome DevTools Protocol Testing...');

  // Check if CDP is available
  let client;
  try {
    client = await CDP({ port: 9222 });
    console.log('✅ Connected to Chrome DevTools Protocol');
  } catch (error) {
    console.log('❌ Cannot connect to Chrome DevTools Protocol');
    console.log('💡 Make sure Chrome is running with remote debugging: --remote-debugging-port=9222');
    console.log('💡 Or use the manual browser test script instead');
    return;
  }

  const { Runtime, Console, Page, Network } = client;

  try {
    // Enable domains
    await Runtime.enable();
    await Console.enable();
    await Page.enable();
    await Network.enable();

    console.log('✅ DevTools domains enabled');

    const results = {
      timestamp: new Date().toISOString(),
      componentResults: []
    };

    // Test each component
    for (let i = 0; i < componentTests.length; i++) {
      const test = componentTests[i];
      console.log(`\n📱 [${i + 1}/${componentTests.length}] Testing: ${test.name}`);
      console.log(`   URL: ${test.url}`);

      const consoleMessages = [];
      const errors = [];
      const warnings = [];

      // Set up console message collection
      Console.messageAdded(({ message }) => {
        const msg = {
          type: message.type,
          text: message.text,
          timestamp: new Date().toISOString(),
          source: message.source,
          url: message.url,
          line: message.line,
          column: message.column
        };

        consoleMessages.push(msg);

        if (message.type === 'error') {
          errors.push(msg);
          console.log(`❌ ERROR: ${message.text}`);
        } else if (message.type === 'warning') {
          warnings.push(msg);
          console.log(`⚠️  WARNING: ${message.text}`);
        }
      });

      // Set up runtime error collection
      Runtime.exceptionThrown(({ exceptionDetails }) => {
        const error = {
          type: 'runtime_exception',
          text: exceptionDetails.exception?.description || exceptionDetails.text,
          timestamp: new Date().toISOString(),
          url: exceptionDetails.url,
          line: exceptionDetails.lineNumber,
          column: exceptionDetails.columnNumber,
          stack: exceptionDetails.stackTrace?.callFrames?.map(frame =>
            `${frame.functionName || 'anonymous'} (${frame.url}:${frame.lineNumber}:${frame.columnNumber})`
          ).join('\n')
        };

        errors.push(error);
        console.log(`💥 RUNTIME EXCEPTION: ${error.text}`);
      });

      try {
        // Navigate to the page
        await Page.navigate({ url: test.url });

        // Wait for page to load
        await new Promise(resolve => {
          const timeout = setTimeout(resolve, 15000); // 15 second timeout

          Page.loadEventFired(() => {
            clearTimeout(timeout);
            // Additional wait for async operations
            setTimeout(resolve, 5000);
          });
        });

        console.log(`📄 Page loaded successfully`);

        // Execute script to check for any React errors
        try {
          const reactCheckResult = await Runtime.evaluate({
            expression: `
              (function() {
                // Check for React errors in DOM
                const reactErrors = [];

                // Look for error boundaries
                const errorElements = document.querySelectorAll('[data-react-error-boundary], [data-error-boundary]');
                errorElements.forEach(el => {
                  reactErrors.push({
                    type: 'react_error_boundary',
                    element: el.tagName,
                    message: el.textContent || el.innerText
                  });
                });

                // Check for console errors that might have been logged earlier
                if (window.__REACT_ERROR_OVERLAY_GLOBAL_HOOK__) {
                  reactErrors.push({
                    type: 'react_devtools_error',
                    message: 'React DevTools error overlay detected'
                  });
                }

                // Check if React is loaded properly
                if (typeof window.React === 'undefined') {
                  reactErrors.push({
                    type: 'react_not_loaded',
                    message: 'React is not loaded'
                  });
                }

                // Check for PropTypes
                if (typeof window.PropTypes !== 'undefined') {
                  reactErrors.push({
                    type: 'prop_types_loaded',
                    message: 'PropTypes is available globally'
                  });
                }

                return {
                  reactErrors,
                  hasReact: typeof window.React !== 'undefined',
                  hasReactDOM: typeof window.ReactDOM !== 'undefined',
                  pageTitle: document.title,
                  pageReady: document.readyState === 'complete'
                };
              })()
            `
          });

          if (reactCheckResult.result.value.reactErrors.length > 0) {
            console.log(`⚛️  React issues detected: ${reactCheckResult.result.value.reactErrors.length}`);
            reactCheckResult.result.value.reactErrors.forEach(error => {
              console.log(`   ${error.type}: ${error.message}`);
            });
          }

        } catch (scriptError) {
          console.log(`❌ Script evaluation failed: ${scriptError.message}`);
        }

        // Store component results
        const componentResult = {
          name: test.name,
          url: test.url,
          timestamp: new Date().toISOString(),
          errors: errors,
          warnings: warnings,
          consoleMessages: consoleMessages,
          totalErrors: errors.length,
          totalWarnings: warnings.length,
          totalConsoleMessages: consoleMessages.length
        };

        results.componentResults.push(componentResult);

        console.log(`✅ Completed test for ${test.name}`);
        console.log(`   Errors: ${errors.length}, Warnings: ${warnings.length}, Total messages: ${consoleMessages.length}`);

      } catch (navError) {
        console.log(`❌ Navigation failed for ${test.name}: ${navError.message}`);

        results.componentResults.push({
          name: test.name,
          url: test.url,
          navigationError: {
            message: navError.message,
            type: navError.constructor.name
          },
          errors: errors,
          warnings: warnings,
          consoleMessages: consoleMessages
        });
      }
    }

    // Save results
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    fs.writeFileSync(
      `cdp-test-results-${timestamp}.json`,
      JSON.stringify(results, null, 2)
    );

    // Create summary
    const summary = {
      timestamp: results.timestamp,
      totalComponents: results.componentResults.length,
      componentsWithErrors: results.componentResults.filter(r => r.totalErrors > 0).length,
      componentsWithWarnings: results.componentResults.filter(r => r.totalWarnings > 0).length,
      totalErrors: results.componentResults.reduce((sum, r) => sum + (r.totalErrors || 0), 0),
      totalWarnings: results.componentResults.reduce((sum, r) => sum + (r.totalWarnings || 0), 0),
      allErrors: results.componentResults.flatMap(r => r.errors || []),
      allWarnings: results.componentResults.flatMap(r => r.warnings || [])
    };

    fs.writeFileSync(
      `cdp-test-summary-${timestamp}.json`,
      JSON.stringify(summary, null, 2)
    );

    console.log('\n🎯 CDP TEST SUMMARY');
    console.log('=====================================');
    console.log(`Total components tested: ${summary.totalComponents}`);
    console.log(`Components with errors: ${summary.componentsWithErrors}`);
    console.log(`Components with warnings: ${summary.componentsWithWarnings}`);
    console.log(`Total errors captured: ${summary.totalErrors}`);
    console.log(`Total warnings captured: ${summary.totalWarnings}`);

    console.log('\n📁 Files saved:');
    console.log(`- Full results: cdp-test-results-${timestamp}.json`);
    console.log(`- Summary: cdp-test-summary-${timestamp}.json`);

    // Display specific error patterns we're looking for
    const propTypeErrors = summary.allErrors.filter(e =>
      (e.text || '').includes('prop-types') &&
      (e.text || '').includes('does not provide an export')
    );

    const themeErrors = summary.allErrors.filter(e =>
      (e.text || '').includes('No theme') ||
      (e.text || '').includes('theme')
    );

    const reactErrors = summary.allErrors.filter(e =>
      (e.text || '').includes('React') ||
      (e.text || '').includes('Error #31')
    );

    const moduleErrors = summary.allErrors.filter(e =>
      (e.text || '').includes('SyntaxError') ||
      (e.text || '').includes('Module') ||
      (e.text || '').includes('cannot provide')
    );

    if (propTypeErrors.length > 0) {
      console.log('\n🔍 PROP-TYPE MODULE ERRORS FOUND:');
      propTypeErrors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.text}`);
      });
    }

    if (themeErrors.length > 0) {
      console.log('\n🎨 THEME ERRORS FOUND:');
      themeErrors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.text}`);
      });
    }

    if (reactErrors.length > 0) {
      console.log('\n⚛️  REACT ERRORS FOUND:');
      reactErrors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.text}`);
      });
    }

    if (moduleErrors.length > 0) {
      console.log('\n📦 MODULE ERRORS FOUND:');
      moduleErrors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error.text}`);
      });
    }

    if (summary.allErrors.length === 0) {
      console.log('\n✅ No errors detected in any components!');
    }

  } catch (error) {
    console.log('💥 CDP Test failed:', error.message);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 CDP connection closed');
    }
  }
}

// Check if we can install chrome-remote-interface
try {
  require('chrome-remote-interface');
  runCDPTest().catch(console.error);
} catch (error) {
  console.log('❌ chrome-remote-interface not installed');
  console.log('💡 Install it with: npm install chrome-remote-interface');
  console.log('💡 Or use the manual browser testing script instead');
}