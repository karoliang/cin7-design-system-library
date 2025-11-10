const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Component URLs to test (updated to port 6007)
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

async function runPuppeteerTest() {
  console.log('🚀 Starting Puppeteer browser testing...');

  const browser = await puppeteer.launch({
    headless: 'new', // Use new headless mode for better stability
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--disable-gpu',
      '--no-zygote',
      '--single-process'
    ]
  });

  const results = {
    timestamp: new Date().toISOString(),
    browserErrors: [],
    componentResults: []
  };

  try {
    for (const test of componentTests) {
      console.log(`\n📱 Testing: ${test.name}`);
      console.log(`   URL: ${test.url}`);

      const page = await browser.newPage();

      // Capture console output
      const consoleMessages = [];
      const errors = [];
      const warnings = [];
      const networkErrors = [];

      // Console message handlers
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
          console.log(`❌ ERROR: ${msg.text()}`);
        } else if (msg.type() === 'warning') {
          warnings.push(message);
          console.log(`⚠️  WARNING: ${msg.text()}`);
        } else if (msg.type() === 'info' || msg.type() === 'log') {
          console.log(`ℹ️  ${msg.text()}`);
        }
      });

      // Page error handler
      page.on('pageerror', error => {
        const errorInfo = {
          message: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString()
        };
        errors.push(errorInfo);
        console.log(`💥 PAGE ERROR: ${error.message}`);
      });

      // Network error handler
      page.on('requestfailed', request => {
        const errorInfo = {
          url: request.url(),
          failure: request.failure(),
          timestamp: new Date().toISOString()
        };
        networkErrors.push(errorInfo);
        console.log(`🌐 NETWORK ERROR: ${request.url()} - ${request.failure()?.errorText}`);
      });

      // Response error handler
      page.on('response', response => {
        if (response.status() >= 400) {
          const errorInfo = {
            url: response.url(),
            status: response.status(),
            statusText: response.statusText(),
            timestamp: new Date().toISOString()
          };
          networkErrors.push(errorInfo);
          console.log(`🌐 HTTP ERROR: ${response.status()} ${response.statusText} - ${response.url()}`);
        }
      });

      try {
        // Navigate to the page with extended timeout
        console.log(`   Navigating to ${test.url}...`);
        const response = await page.goto(test.url, {
          waitUntil: 'networkidle2',
          timeout: 60000
        });

        console.log(`📄 Page loaded with status: ${response?.status()}`);

        // Wait for the page to fully render
        await page.waitForTimeout(2000);

        // Try to wait for specific Storybook elements
        try {
          await page.waitForSelector('#storybook-root', { timeout: 5000 });
          console.log('✅ Storybook root element found');
        } catch (e) {
          console.log('⚠️  Storybook root element not found, continuing...');
        }

        // Try to wait for iframe (where components often render)
        try {
          await page.waitForSelector('iframe', { timeout: 5000 });
          console.log('✅ Storybook iframe found');
        } catch (e) {
          console.log('⚠️  Storybook iframe not found, checking for direct rendering...');
        }

        // Wait for any remaining async operations
        await page.waitForTimeout(8000);

        // Take screenshot
        const screenshot = await page.screenshot({
          fullPage: true,
          path: `screenshots/${test.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`
        });

        console.log(`📸 Screenshot saved`);

        // Get page title and URL
        const title = await page.title();
        const finalUrl = page.url();

        // Store results for this component
        const componentResult = {
          name: test.name,
          url: test.url,
          finalUrl,
          title,
          timestamp: new Date().toISOString(),
          errors: errors,
          warnings: warnings,
          networkErrors: networkErrors,
          consoleMessages: consoleMessages,
          screenshot: `screenshots/${test.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`
        };

        results.componentResults.push(componentResult);

        console.log(`✅ Completed test for ${test.name}`);
        console.log(`   Errors found: ${errors.length}`);
        console.log(`   Warnings found: ${warnings.length}`);
        console.log(`   Network errors: ${networkErrors.length}`);

      } catch (navError) {
        const errorInfo = {
          type: 'navigation_error',
          message: navError.message,
          stack: navError.stack,
          timestamp: new Date().toISOString()
        };

        results.componentResults.push({
          name: test.name,
          url: test.url,
          navigationError: errorInfo,
          errors: errors,
          warnings: warnings,
          networkErrors: networkErrors,
          consoleMessages: consoleMessages
        });

        console.log(`❌ Navigation failed for ${test.name}: ${navError.message}`);
      }

      await page.close();
    }

  } catch (browserError) {
    console.log('💥 Browser error:', browserError.message);
    results.browserErrors.push({
      message: browserError.message,
      stack: browserError.stack,
      timestamp: new Date().toISOString()
    });
  } finally {
    await browser.close();
  }

  // Save results to files
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  // Save full results
  fs.writeFileSync(
    `puppeteer-test-results-${timestamp}.json`,
    JSON.stringify(results, null, 2)
  );

  // Save errors-only summary
  const errorsSummary = {
    timestamp: results.timestamp,
    totalComponents: results.componentResults.length,
    componentsWithErrors: results.componentResults.filter(r =>
      r.errors && r.errors.length > 0
    ).length,
    componentsWithWarnings: results.componentResults.filter(r =>
      r.warnings && r.warnings.length > 0
    ).length,
    componentsWithNetworkErrors: results.componentResults.filter(r =>
      r.networkErrors && r.networkErrors.length > 0
    ).length,
    allErrors: results.componentResults.flatMap(r => r.errors || []),
    allWarnings: results.componentResults.flatMap(r => r.warnings || []),
    allNetworkErrors: results.componentResults.flatMap(r => r.networkErrors || [])
  };

  fs.writeFileSync(
    `puppeteer-errors-summary-${timestamp}.json`,
    JSON.stringify(errorsSummary, null, 2)
  );

  // Create screenshots directory if it doesn't exist
  if (!fs.existsSync('screenshots')) {
    fs.mkdirSync('screenshots');
  }

  console.log('\n🎯 PUPPETEER TEST SUMMARY');
  console.log('=====================================');
  console.log(`Total components tested: ${results.componentResults.length}`);
  console.log(`Components with errors: ${errorsSummary.componentsWithErrors}`);
  console.log(`Components with warnings: ${errorsSummary.componentsWithWarnings}`);
  console.log(`Components with network errors: ${errorsSummary.componentsWithNetworkErrors}`);
  console.log(`Total errors captured: ${errorsSummary.allErrors.length}`);
  console.log(`Total warnings captured: ${errorsSummary.allWarnings.length}`);
  console.log(`Total network errors: ${errorsSummary.allNetworkErrors.length}`);

  console.log('\n📁 Files saved:');
  console.log(`- Full results: puppeteer-test-results-${timestamp}.json`);
  console.log(`- Errors summary: puppeteer-errors-summary-${timestamp}.json`);
  console.log(`- Screenshots: screenshots/ directory`);

  // Display critical errors
  if (errorsSummary.allErrors.length > 0) {
    console.log('\n🚨 CRITICAL ERRORS FOUND:');
    errorsSummary.allErrors.forEach((error, index) => {
      console.log(`\n${index + 1}. ${error.type || 'ERROR'}: ${error.message || error.text}`);
      if (error.stack) {
        console.log(`   Stack: ${error.stack.split('\n')[0]}`);
      }
      if (error.location) {
        console.log(`   Location: ${error.location.url}:${error.location.lineNumber}`);
      }
    });
  }

  return results;
}

// Run the test
runPuppeteerTest().catch(console.error);