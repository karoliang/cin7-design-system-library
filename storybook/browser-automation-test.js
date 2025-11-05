const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function performStorybookRegressionTest() {
  console.log('🚀 Starting comprehensive Storybook browser automation testing...\n');

  const browser = await puppeteer.launch({
    headless: false, // Set to false for visual debugging
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Enable console logging from the browser
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
    console.log(`BROWSER ${msg.type().toUpperCase()}: ${msg.text()}`);
  });

  // Enable network monitoring
  const networkRequests = [];
  page.on('request', request => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      timestamp: Date.now()
    });
  });

  page.on('response', response => {
    const request = networkRequests.find(req => req.url === response.url());
    if (request) {
      request.status = response.status();
      request.statusText = response.statusText();
      request.headers = response.headers();
    }
  });

  // Enable error handling
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  try {
    console.log('📱 Step 1: Navigating to Storybook homepage...');
    await page.goto('http://localhost:6006/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Take initial screenshot
    await page.screenshot({
      path: 'screenshots/01-initial-load.png',
      fullPage: true
    });
    console.log('✅ Screenshot taken: 01-initial-load.png');

    // Wait 5 seconds and take another screenshot
    console.log('⏳ Waiting 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({
      path: 'screenshots/02-after-5-seconds.png',
      fullPage: true
    });
    console.log('✅ Screenshot taken: 02-after-5-seconds.png');

    // Wait another 5 seconds and take final screenshot
    console.log('⏳ Waiting another 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({
      path: 'screenshots/03-after-10-seconds.png',
      fullPage: true
    });
    console.log('✅ Screenshot taken: 03-after-10-seconds.png');

    // Check DOM structure
    console.log('🔍 Analyzing DOM structure...');
    const domAnalysis = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;

      return {
        title: document.title,
        bodyHTML: body.innerHTML.substring(0, 1000) + '...',
        bodyClasses: body.className,
        bodyStyles: window.getComputedStyle(body).cssText,
        hasLoadingElements: !!body.querySelector('[data-testid="loading"], .loading, .spinner, [aria-busy="true"]'),
        hasErrorElements: !!body.querySelector('[data-testid="error"], .error, .error-message'),
        hasStorybookElements: !!body.querySelector('#storybook-root, [data-testid="storybook-preview"], .sb-show-main, .sb-main'),
        hasSidebar: !!body.querySelector('.sb-sidebar, [data-testid="sidebar"], .sidebar'),
        computedBodyStyles: {
          display: window.getComputedStyle(body).display,
          visibility: window.getComputedStyle(body).visibility,
          opacity: window.getComputedStyle(body).opacity,
          backgroundColor: window.getComputedStyle(body).backgroundColor
        },
        allElementsCount: document.querySelectorAll('*').length,
        storybookElements: Array.from(document.querySelectorAll('[id*="storybook"], [class*="sb-"], [data-testid*="storybook"]')).map(el => ({
          tagName: el.tagName,
          id: el.id,
          className: el.className,
          innerHTML: el.innerHTML.substring(0, 200)
        }))
      };
    });

    console.log('📊 DOM Analysis Results:');
    console.log('  - Page title:', domAnalysis.title);
    console.log('  - Body classes:', domAnalysis.bodyClasses);
    console.log('  - Total elements:', domAnalysis.allElementsCount);
    console.log('  - Has loading elements:', domAnalysis.hasLoadingElements);
    console.log('  - Has error elements:', domAnalysis.hasErrorElements);
    console.log('  - Has Storybook elements:', domAnalysis.hasStorybookElements);
    console.log('  - Has sidebar:', domAnalysis.hasSidebar);
    console.log('  - Body display:', domAnalysis.computedBodyStyles.display);
    console.log('  - Body visibility:', domAnalysis.computedBodyStyles.visibility);
    console.log('  - Body opacity:', domAnalysis.computedBodyStyles.opacity);
    console.log('  - Body background color:', domAnalysis.computedBodyStyles.backgroundColor);
    console.log('  - Storybook elements found:', domAnalysis.storybookElements.length);

    // Test network requests
    console.log('🌐 Analyzing network requests...');
    const failedRequests = networkRequests.filter(req => req.status && req.status >= 400);
    const slowRequests = networkRequests.filter(req => req.statusText && req.statusText.includes('timeout'));

    console.log(`  - Total requests: ${networkRequests.length}`);
    console.log(`  - Failed requests: ${failedRequests.length}`);
    console.log(`  - Slow/timeout requests: ${slowRequests.length}`);

    if (failedRequests.length > 0) {
      console.log('❌ Failed requests:');
      failedRequests.forEach(req => {
        console.log(`    ${req.status} ${req.method} ${req.url}`);
      });
    }

    if (slowRequests.length > 0) {
      console.log('⏱️ Slow requests:');
      slowRequests.forEach(req => {
        console.log(`    ${req.method} ${req.url}`);
      });
    }

    // Test console messages
    console.log('📝 Analyzing console messages...');
    const errors = consoleMessages.filter(msg => msg.type === 'error');
    const warnings = consoleMessages.filter(msg => msg.type === 'warning');

    console.log(`  - Total console messages: ${consoleMessages.length}`);
    console.log(`  - Errors: ${errors.length}`);
    console.log(`  - Warnings: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('❌ JavaScript errors:');
      errors.forEach(error => {
        console.log(`    ${error.text}`);
        if (error.location) {
          console.log(`    Location: ${error.location.url}:${error.location.lineNumber}`);
        }
      });
    }

    if (warnings.length > 0) {
      console.log('⚠️ JavaScript warnings:');
      warnings.forEach(warning => {
        console.log(`    ${warning.text}`);
      });
    }

    // Try to interact with sidebar if it exists
    console.log('🖱️ Testing sidebar interactivity...');
    const sidebarExists = await page.evaluate(() => {
      const sidebar = document.querySelector('.sb-sidebar, [data-testid="sidebar"], .sidebar');
      if (sidebar) {
        const firstItem = sidebar.querySelector('a, button, [role="button"]');
        if (firstItem) {
          firstItem.click();
          return true;
        }
      }
      return false;
    });

    if (sidebarExists) {
      console.log('✅ Sidebar interaction successful');
      await new Promise(resolve => setTimeout(resolve, 2000));
      await page.screenshot({
        path: 'screenshots/04-after-sidebar-click.png',
        fullPage: true
      });
      console.log('✅ Screenshot taken: 04-after-sidebar-click.png');
    } else {
      console.log('❌ No sidebar found for interaction testing');
    }

    // Test specific story URLs
    console.log('🔗 Testing specific story URLs...');
    const testUrls = [
      'http://localhost:6006/?path=/story/polaris-components-button--primary',
      'http://localhost:6006/?path=/story/foundation-components-design-tokens--color-palette',
      'http://localhost:6006/?path=/story/charts-line-chart--default'
    ];

    for (let i = 0; i < testUrls.length; i++) {
      const testUrl = testUrls[i];
      console.log(`  Testing: ${testUrl}`);

      try {
        await page.goto(testUrl, {
          waitUntil: 'networkidle2',
          timeout: 15000
        });

        await new Promise(resolve => setTimeout(resolve, 3000));

        await page.screenshot({
          path: `screenshots/05-story-url-${i + 1}.png`,
          fullPage: true
        });
        console.log(`  ✅ Screenshot taken: 05-story-url-${i + 1}.png`);

        // Check if story loaded
        const storyLoaded = await page.evaluate(() => {
          return !!document.querySelector('#storybook-root, [data-testid="story"], .sb-show-main');
        });

        console.log(`  Story loaded: ${storyLoaded ? '✅ Yes' : '❌ No'}`);

      } catch (error) {
        console.log(`  ❌ Error loading ${testUrl}: ${error.message}`);
      }
    }

    // Generate comprehensive report
    const report = {
      timestamp: new Date().toISOString(),
      testResults: {
        domAnalysis,
        networkRequests: {
          total: networkRequests.length,
          failed: failedRequests.length,
          slow: slowRequests.length,
          details: failedRequests
        },
        consoleMessages: {
          total: consoleMessages.length,
          errors: errors.length,
          warnings: warnings.length,
          details: errors
        },
        sidebarTest: {
          exists: sidebarExists,
          interactionSuccessful: sidebarExists
        },
        storyUrls: testUrls.map((url, index) => ({
          url,
          tested: true,
          screenshot: `screenshots/05-story-url-${index + 1}.png`
        }))
      },
      screenshots: [
        'screenshots/01-initial-load.png',
        'screenshots/02-after-5-seconds.png',
        'screenshots/03-after-10-seconds.png',
        'screenshots/04-after-sidebar-click.png'
      ]
    };

    // Save comprehensive report
    fs.writeFileSync('browser-automation-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📋 Comprehensive report saved to: browser-automation-test-report.json');

    console.log('\n🎯 SUMMARY OF ISSUES:');

    if (errors.length > 0) {
      console.log('❌ JavaScript errors detected - this is likely preventing Storybook from loading');
    }

    if (failedRequests.length > 0) {
      console.log('❌ Network requests failing - missing assets or API issues');
    }

    if (!domAnalysis.hasStorybookElements) {
      console.log('❌ No Storybook DOM elements found - React not mounting or component rendering issues');
    }

    if (domAnalysis.computedBodyStyles.display === 'none') {
      console.log('❌ Body element is hidden - CSS issues');
    }

    if (domAnalysis.computedBodyStyles.opacity === '0') {
      console.log('❌ Body element is transparent - CSS visibility issues');
    }

    if (!sidebarExists && domAnalysis.hasStorybookElements) {
      console.log('⚠️ Storybook loaded but sidebar not working - partial loading issue');
    }

    if (errors.length === 0 && failedRequests.length === 0 && domAnalysis.hasStorybookElements) {
      console.log('✅ Storybook appears to be loading correctly - check screenshots for visual issues');
    }

  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    await browser.close();
    console.log('\n🏁 Browser automation testing completed');
  }
}

// Create screenshots directory
if (!fs.existsSync('screenshots')) {
  fs.mkdirSync('screenshots');
}

// Run the test
performStorybookRegressionTest().catch(console.error);