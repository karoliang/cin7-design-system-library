const puppeteer = require('puppeteer');
const path = require('path');

/**
 * COMPREHENSIVE AUTOMATION TESTING FOR FRAME AND BREADCRUMBS COMPONENTS
 * Tests all problematic components and variations after React fixes
 */

const COMPONENTS_TO_TEST = {
  frame: {
    name: 'Frame',
    variations: [
      { id: 'examples-frame--default', name: 'Default' },
      { id: 'examples-frame--with-logo', name: 'WithLogo' },
      { id: 'examples-frame--with-notifications', name: 'WithNotifications' },
      { id: 'examples-frame--ecommerce-layout', name: 'EcommerceLayout' },
      { id: 'examples-frame--minimal-layout', name: 'MinimalLayout' },
      { id: 'examples-frame--responsive-behavior', name: 'ResponsiveBehavior' }
    ]
  },
  breadcrumbs: {
    name: 'Breadcrumbs',
    variations: [
      { id: 'examples-breadcrumbs--default', name: 'Default' },
      { id: 'examples-breadcrumbs--short-path', name: 'ShortPath' },
      { id: 'examples-breadcrumbs--long-path', name: 'LongPath' },
      { id: 'examples-breadcrumbs--product-navigation', name: 'ProductNavigation' },
      { id: 'examples-breadcrumbs--ecommerce-navigation', name: 'EcommerceNavigation' },
      { id: 'examples-breadcrumbs--admin-panel', name: 'AdminPanel' },
      { id: 'examples-breadcrumbs--documentation-site', name: 'DocumentationSite' },
      { id: 'examples-breadcrumbs--many-items', name: 'ManyItems' }
    ]
  }
};

async function testComponentVariations() {
  console.log('🚀 STARTING COMPREHENSIVE COMPONENT AUTOMATION TESTING');
  console.log('================================================================');

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Enable comprehensive console logging
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();

    if (type === 'error') {
      console.log(`❌ Browser Error: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  Browser Warning: ${text}`);
    } else if (text.includes('No theme was provided')) {
      console.log(`🚨 THEME ERROR: ${text}`);
    } else if (text.includes('Cannot destructure')) {
      console.log(`🚨 DESTRUCTURING ERROR: ${text}`);
    } else if (text.includes('NUCLEAR')) {
      console.log(`🔍 Cache Breaker: ${text}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`🚨 Page Error: ${error.message}`);
  });

  const results = {
    frame: { total: 0, passed: 0, failed: 0, errors: [] },
    breadcrumbs: { total: 0, passed: 0, failed: 0, errors: [] }
  };

  try {
    // Test all Frame variations
    console.log('\n📋 TESTING FRAME COMPONENT VARIATIONS');
    console.log('=====================================');

    for (const variation of COMPONENTS_TO_TEST.frame.variations) {
      results.frame.total++;
      console.log(`\n🔍 Testing Frame: ${variation.name} (${variation.id})`);

      try {
        await testComponentVariation(page, variation, 'frame', results);
        results.frame.passed++;
        console.log(`✅ Frame ${variation.name}: PASSED`);
      } catch (error) {
        results.frame.failed++;
        const errorMsg = `Frame ${variation.name}: ${error.message}`;
        results.frame.errors.push(errorMsg);
        console.log(`❌ Frame ${variation.name}: FAILED - ${error.message}`);
      }
    }

    // Test all Breadcrumbs variations
    console.log('\n📋 TESTING BREADCRUMBS COMPONENT VARIATIONS');
    console.log('=============================================');

    for (const variation of COMPONENTS_TO_TEST.breadcrumbs.variations) {
      results.breadcrumbs.total++;
      console.log(`\n🔍 Testing Breadcrumbs: ${variation.name} (${variation.id})`);

      try {
        await testComponentVariation(page, variation, 'breadcrumbs', results);
        results.breadcrumbs.passed++;
        console.log(`✅ Breadcrumbs ${variation.name}: PASSED`);
      } catch (error) {
        results.breadcrumbs.failed++;
        const errorMsg = `Breadcrumbs ${variation.name}: ${error.message}`;
        results.breadcrumbs.errors.push(errorMsg);
        console.log(`❌ Breadcrumbs ${variation.name}: FAILED - ${error.message}`);
      }
    }

    // Print comprehensive results
    printResults(results);

  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  } finally {
    await browser.close();
  }

  return results;
}

async function testComponentVariation(page, variation, componentType, results) {
  const url = `http://localhost:6006/iframe.html?id=${variation.id}&args=&viewMode=story`;

  // Navigate to component variation
  await page.goto(url, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Wait for component to render
  await page.waitForTimeout(3000);

  // Check for component rendering
  const hasContent = await page.evaluate(() => {
    const root = document.getElementById('storybook-root');
    if (!root) return false;

    return root.children.length > 0 &&
           !root.textContent.includes('No Preview') &&
           !root.textContent.includes('Error rendering component');
  });

  if (!hasContent) {
    throw new Error('Component failed to render or shows "No Preview"');
  }

  // Check for React errors
  const hasReactErrors = await page.evaluate(() => {
    const errorElements = document.querySelectorAll('[data-testid="error-message"]');
    return Array.from(errorElements).some(el =>
      el.textContent.includes('No theme was provided') ||
      el.textContent.includes('Cannot destructure') ||
      el.textContent.includes('React Error')
    );
  });

  if (hasReactErrors) {
    throw new Error('Component has React errors');
  }

  // Component-specific validation
  if (componentType === 'frame') {
    await validateFrameComponent(page);
  } else if (componentType === 'breadcrumbs') {
    await validateBreadcrumbsComponent(page);
  }

  return true;
}

async function validateFrameComponent(page) {
  // Check if Frame component is properly rendered
  const frameValid = await page.evaluate(() => {
    const root = document.getElementById('storybook-root');
    if (!root) return false;

    // Look for Frame-specific elements
    const hasTopBar = root.querySelector('[data-polaris-top-bar]') ||
                      root.querySelector('.Polaris-TopBar') ||
                      root.querySelector('[role="banner"]');

    const hasNavigation = root.querySelector('[data-polaris-navigation]') ||
                         root.querySelector('.Polaris-Navigation') ||
                         root.querySelector('nav');

    const hasSearchField = root.querySelector('input[type="search"]') ||
                          root.querySelector('[data-polaris-search-field]');

    return hasTopBar || hasNavigation || hasSearchField;
  });

  if (!frameValid) {
    throw new Error('Frame component structure validation failed');
  }

  // Check for theme provider errors
  const hasThemeError = await page.evaluate(() => {
    const errorElements = document.querySelectorAll('*');
    return Array.from(errorElements).some(el =>
      el.textContent && el.textContent.includes('No theme was provided')
    );
  });

  if (hasThemeError) {
    throw new Error('Frame component has theme provider errors');
  }
}

async function validateBreadcrumbsComponent(page) {
  // Check if Breadcrumbs component is properly rendered
  const breadcrumbsValid = await page.evaluate(() => {
    const root = document.getElementById('storybook-root');
    if (!root) return false;

    // Look for Breadcrumbs-specific elements
    const hasNav = root.querySelector('nav') ||
                   root.querySelector('[role="navigation"]') ||
                   root.querySelector('.Polaris-Breadcrumbs') ||
                   root.querySelector('[data-polaris-breadcrumbs]');

    const hasButtons = root.querySelectorAll('button, a').length > 0;

    return hasNav && hasButtons;
  });

  if (!breadcrumbsValid) {
    throw new Error('Breadcrumbs component structure validation failed');
  }

  // Check for destructuring errors
  const hasDestructuringError = await page.evaluate(() => {
    const errorElements = document.querySelectorAll('*');
    return Array.from(errorElements).some(el =>
      el.textContent && el.textContent.includes('Cannot destructure')
    );
  });

  if (hasDestructuringError) {
    throw new Error('Breadcrumbs component has destructuring errors');
  }
}

function printResults(results) {
  console.log('\n📊 COMPREHENSIVE TEST RESULTS SUMMARY');
  console.log('====================================');

  console.log('\n🔷 FRAME COMPONENT RESULTS:');
  console.log(`   Total Tests: ${results.frame.total}`);
  console.log(`   ✅ Passed: ${results.frame.passed}`);
  console.log(`   ❌ Failed: ${results.frame.failed}`);
  console.log(`   📈 Success Rate: ${((results.frame.passed / results.frame.total) * 100).toFixed(1)}%`);

  if (results.frame.errors.length > 0) {
    console.log('\n   Frame Errors:');
    results.frame.errors.forEach(error => console.log(`     - ${error}`));
  }

  console.log('\n🔷 BREADCRUMBS COMPONENT RESULTS:');
  console.log(`   Total Tests: ${results.breadcrumbs.total}`);
  console.log(`   ✅ Passed: ${results.breadcrumbs.passed}`);
  console.log(`   ❌ Failed: ${results.breadcrumbs.failed}`);
  console.log(`   📈 Success Rate: ${((results.breadcrumbs.passed / results.breadcrumbs.total) * 100).toFixed(1)}%`);

  if (results.breadcrumbs.errors.length > 0) {
    console.log('\n   Breadcrumbs Errors:');
    results.breadcrumbs.errors.forEach(error => console.log(`     - ${error}`));
  }

  // Overall results
  const totalTests = results.frame.total + results.breadcrumbs.total;
  const totalPassed = results.frame.passed + results.breadcrumbs.passed;
  const totalFailed = results.frame.failed + results.breadcrumbs.failed;

  console.log('\n🎯 OVERALL RESULTS:');
  console.log(`   Total Components Tested: ${Object.keys(COMPONENTS_TO_TEST).length}`);
  console.log(`   Total Variations Tested: ${totalTests}`);
  console.log(`   ✅ Total Passed: ${totalPassed}`);
  console.log(`   ❌ Total Failed: ${totalFailed}`);
  console.log(`   📈 Overall Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);

  if (totalFailed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! Frame and Breadcrumbs components are working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the errors above.');
  }

  console.log('\n🏁 AUTOMATION TESTING COMPLETE');
  console.log('================================');
}

// Run the automation tests
testComponentVariations().catch(console.error);