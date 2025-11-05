const { Builder, By, until, Key } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

async function performStorybookSafariTest() {
  console.log('🚀 Starting comprehensive Storybook Safari browser testing...\n');

  let driver;
  try {
    // Initialize Safari WebDriver
    console.log('🌐 Launching Safari browser...');
    driver = await new Builder()
      .forBrowser('safari')
      .build();

    // Maximize window
    await driver.manage().window().maximize();

    // Enable console log capture
    const logs = [];

    // Navigate to Storybook
    console.log('📱 Step 1: Navigating to Storybook homepage...');
    await driver.get('http://localhost:6006/');

    // Wait for initial load
    await driver.sleep(3000);

    // Take initial screenshot
    const screenshot1 = await driver.takeScreenshot();
    fs.writeFileSync('screenshots/01-initial-load-safari.png', screenshot1, 'base64');
    console.log('✅ Screenshot taken: 01-initial-load-safari.png');

    // Get page title
    const title = await driver.getTitle();
    console.log(`📄 Page title: ${title}`);

    // Get current URL
    const currentUrl = await driver.getCurrentUrl();
    console.log(`🔗 Current URL: ${currentUrl}`);

    // Check for JavaScript errors in console
    try {
      const browserLogs = await driver.manage().logs().get('browser');
      console.log(`📝 Browser console messages: ${browserLogs.length}`);

      browserLogs.forEach(log => {
        logs.push({
          level: log.level.name,
          message: log.message,
          timestamp: log.timestamp
        });

        if (log.level.name === 'SEVERE') {
          console.log(`❌ ERROR: ${log.message}`);
        } else if (log.level.name === 'WARNING') {
          console.log(`⚠️ WARNING: ${log.message}`);
        }
      });
    } catch (logError) {
      console.log('⚠️ Could not retrieve browser logs:', logError.message);
    }

    // Wait 5 seconds and take another screenshot
    console.log('⏳ Waiting 5 seconds...');
    await driver.sleep(5000);

    const screenshot2 = await driver.takeScreenshot();
    fs.writeFileSync('screenshots/02-after-5-seconds-safari.png', screenshot2, 'base64');
    console.log('✅ Screenshot taken: 02-after-5-seconds-safari.png');

    // Wait another 5 seconds
    console.log('⏳ Waiting another 5 seconds...');
    await driver.sleep(5000);

    const screenshot3 = await driver.takeScreenshot();
    fs.writeFileSync('screenshots/03-after-10-seconds-safari.png', screenshot3, 'base64');
    console.log('✅ Screenshot taken: 03-after-10-seconds-safari.png');

    // Analyze DOM structure
    console.log('🔍 Analyzing DOM structure...');

    const domAnalysis = await driver.executeScript(() => {
      const body = document.body;
      const root = document.getElementById('root');

      return {
        title: document.title,
        bodyClasses: body.className,
        bodyStyles: {
          display: window.getComputedStyle(body).display,
          visibility: window.getComputedStyle(body).visibility,
          opacity: window.getComputedStyle(body).opacity,
          backgroundColor: window.getComputedStyle(body).backgroundColor,
          color: window.getComputedStyle(body).color
        },
        rootElement: {
          exists: !!root,
          innerHTML: root ? root.innerHTML.substring(0, 1000) : null,
          children: root ? root.children.length : 0
        },
        hasLoadingElements: !!document.querySelector('[data-testid="loading"], .loading, .spinner, [aria-busy="true"]'),
        hasErrorElements: !!document.querySelector('[data-testid="error"], .error, .error-message'),
        hasStorybookElements: !!document.querySelector('#storybook-root, [data-testid="storybook-preview"], .sb-show-main, .sb-main'),
        hasSidebar: !!document.querySelector('.sb-sidebar, [data-testid="sidebar"], .sidebar'),
        allElementsCount: document.querySelectorAll('*').length,
        storybookElements: Array.from(document.querySelectorAll('[id*="storybook"], [class*="sb-"], [data-testid*="storybook"]')).map(el => ({
          tagName: el.tagName,
          id: el.id,
          className: el.className,
          textContent: el.textContent ? el.textContent.substring(0, 100) : ''
        }))
      };
    });

    console.log('📊 DOM Analysis Results:');
    console.log('  - Page title:', domAnalysis.title);
    console.log('  - Body classes:', domAnalysis.bodyClasses);
    console.log('  - Total elements:', domAnalysis.allElementsCount);
    console.log('  - Root element exists:', domAnalysis.rootElement.exists);
    console.log('  - Root element children:', domAnalysis.rootElement.children);
    console.log('  - Has loading elements:', domAnalysis.hasLoadingElements);
    console.log('  - Has error elements:', domAnalysis.hasErrorElements);
    console.log('  - Has Storybook elements:', domAnalysis.hasStorybookElements);
    console.log('  - Has sidebar:', domAnalysis.hasSidebar);
    console.log('  - Body display:', domAnalysis.bodyStyles.display);
    console.log('  - Body visibility:', domAnalysis.bodyStyles.visibility);
    console.log('  - Body opacity:', domAnalysis.bodyStyles.opacity);
    console.log('  - Storybook elements found:', domAnalysis.storybookElements.length);

    if (domAnalysis.rootElement.innerHTML) {
      console.log('  - Root element HTML preview:', domAnalysis.rootElement.innerHTML.substring(0, 200) + '...');
    }

    // Test sidebar interaction if it exists
    console.log('🖱️ Testing sidebar interactivity...');

    try {
      const sidebarExists = await driver.executeScript(() => {
        const sidebar = document.querySelector('.sb-sidebar, [data-testid="sidebar"], .sidebar, a, button, [role="button"]');
        return !!sidebar;
      });

      if (sidebarExists) {
        // Try to find and click the first clickable element
        const firstClickable = await driver.findElement(By.css('.sb-sidebar a, .sb-sidebar button, [role="button"], a, button'));

        if (firstClickable) {
          await driver.executeScript("arguments[0].scrollIntoView()", firstClickable);
          await driver.sleep(1000);

          try {
            await firstClickable.click();
            console.log('✅ Successfully clicked on sidebar element');
            await driver.sleep(2000);

            const screenshot4 = await driver.takeScreenshot();
            fs.writeFileSync('screenshots/04-after-sidebar-click-safari.png', screenshot4, 'base64');
            console.log('✅ Screenshot taken: 04-after-sidebar-click-safari.png');
          } catch (clickError) {
            console.log('⚠️ Could not click sidebar element:', clickError.message);
          }
        }
      } else {
        console.log('❌ No sidebar found for interaction testing');
      }
    } catch (sidebarError) {
      console.log('⚠️ Sidebar interaction test failed:', sidebarError.message);
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
        await driver.get(testUrl);
        await driver.sleep(5000);

        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync(`screenshots/05-story-url-${i + 1}-safari.png`, screenshot, 'base64');
        console.log(`  ✅ Screenshot taken: 05-story-url-${i + 1}-safari.png`);

        // Check if story loaded
        const storyLoaded = await driver.executeScript(() => {
          return !!document.querySelector('#storybook-root, [data-testid="story"], .sb-show-main');
        });

        console.log(`  Story loaded: ${storyLoaded ? '✅ Yes' : '❌ No'}`);

        // Get page title for this URL
        const storyTitle = await driver.getTitle();
        console.log(`  Page title: ${storyTitle}`);

      } catch (error) {
        console.log(`  ❌ Error loading ${testUrl}: ${error.message}`);
      }
    }

    // Check network conditions (basic check)
    console.log('🌐 Checking network status...');
    const networkStatus = await driver.executeScript(() => {
      return {
        online: navigator.onLine,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          rtt: navigator.connection.rtt
        } : null
      };
    });

    console.log('  Network status:', networkStatus);

    // Generate comprehensive report
    const report = {
      timestamp: new Date().toISOString(),
      browser: 'Safari',
      testResults: {
        domAnalysis,
        browserLogs: logs,
        networkStatus,
        sidebarTest: {
          exists: domAnalysis.hasSidebar,
          interactionAttempted: true
        },
        storyUrls: testUrls.map((url, index) => ({
          url,
          tested: true,
          screenshot: `screenshots/05-story-url-${index + 1}-safari.png`
        }))
      },
      screenshots: [
        'screenshots/01-initial-load-safari.png',
        'screenshots/02-after-5-seconds-safari.png',
        'screenshots/03-after-10-seconds-safari.png',
        'screenshots/04-after-sidebar-click-safari.png'
      ]
    };

    // Save comprehensive report
    fs.writeFileSync('safari-browser-test-report.json', JSON.stringify(report, null, 2));
    console.log('\n📋 Comprehensive Safari report saved to: safari-browser-test-report.json');

    console.log('\n🎯 SUMMARY OF ISSUES:');

    const severeErrors = logs.filter(log => log.level === 'SEVERE');
    const warnings = logs.filter(log => log.level === 'WARNING');

    if (severeErrors.length > 0) {
      console.log('❌ JavaScript errors detected - this is likely preventing Storybook from loading');
      severeErrors.forEach(error => {
        console.log(`    ${error.message}`);
      });
    }

    if (warnings.length > 0) {
      console.log('⚠️ JavaScript warnings detected:');
      warnings.forEach(warning => {
        console.log(`    ${warning.message}`);
      });
    }

    if (!domAnalysis.hasStorybookElements && !domAnalysis.rootElement.exists) {
      console.log('❌ No Storybook DOM elements found - React not mounting or component rendering issues');
    }

    if (domAnalysis.bodyStyles.display === 'none') {
      console.log('❌ Body element is hidden - CSS issues');
    }

    if (domAnalysis.bodyStyles.opacity === '0') {
      console.log('❌ Body element is transparent - CSS visibility issues');
    }

    if (!domAnalysis.hasSidebar && domAnalysis.hasStorybookElements) {
      console.log('⚠️ Storybook loaded but sidebar not working - partial loading issue');
    }

    if (severeErrors.length === 0 && domAnalysis.hasStorybookElements) {
      console.log('✅ Storybook appears to be loading correctly - check screenshots for visual issues');
    }

    if (!domAnalysis.rootElement.exists) {
      console.log('🔍 CRITICAL: Root element (#root) not found - this suggests a fundamental loading issue');
    }

  } catch (error) {
    console.error('❌ Safari test failed with error:', error);
  } finally {
    if (driver) {
      await driver.quit();
    }
    console.log('\n🏁 Safari browser automation testing completed');
  }
}

// Run the test
performStorybookSafariTest().catch(console.error);