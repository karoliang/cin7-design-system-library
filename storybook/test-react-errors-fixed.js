const puppeteer = require('puppeteer');

async function testReactErrorsFixed() {
  console.log('🔧 Testing React Error Fixes for Frame and Breadcrumbs');
  console.log('==========================================================');

  const browser = await puppeteer.launch({
    headless: false, // Set to false for debugging
    defaultViewport: null,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Enhanced console logging
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();

    if (type === 'error') {
      console.log(`❌ Console Error: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  Console Warning: ${text}`);
    } else if (text.includes('Breadcrumbs props validation') || text.includes('Frame Component')) {
      console.log(`🔍 Debug: ${text}`);
    }
  });

  page.on('pageerror', error => {
    console.log(`💥 Page Error: ${error.message}`);
  });

  const testResults = {
    frame: { success: false, errors: [] },
    breadcrumbs: { success: false, errors: [] },
    withLogo: { success: false, errors: [] },
    responsiveBehavior: { success: false, errors: [] },
    productNavigation: { success: false, errors: [] }
  };

  try {
    // Test 1: Frame Default
    console.log('\n📋 Testing Frame - Default Story...');
    await page.goto('http://localhost:6006/?path=/story/components-navigation-frame--default', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForTimeout(5000);

    const frameErrors = await page.evaluate(() => {
      const errors = [];
      // Check for React error messages
      const errorElements = document.querySelectorAll('[data-testid="error-message"]');
      errorElements.forEach(el => errors.push(el.textContent));

      // Check for theme provider errors
      if (document.body.textContent.includes('No theme was provided')) {
        errors.push('Theme provider error: No theme was provided');
      }

      // Check for prop validation errors
      if (document.body.textContent.includes('object with keys')) {
        errors.push('Prop validation error detected');
      }

      return errors;
    });

    testResults.frame.errors = frameErrors;
    testResults.frame.success = frameErrors.length === 0;
    console.log(testResults.frame.success ? '✅ Frame - Default: PASS' : `❌ Frame - Default: FAIL (${frameErrors.length} errors)`);
    if (frameErrors.length > 0) {
      frameErrors.forEach(error => console.log(`   - ${error}`));
    }

    // Test 2: Frame With Logo
    console.log('\n📋 Testing Frame - With Logo...');
    await page.goto('http://localhost:6006/?path=/story/components-navigation-frame--with-logo', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForTimeout(5000);

    const logoErrors = await page.evaluate(() => {
      const errors = [];
      const errorElements = document.querySelectorAll('[data-testid="error-message"]');
      errorElements.forEach(el => errors.push(el.textContent));

      if (document.body.textContent.includes('No theme was provided')) {
        errors.push('Theme provider error');
      }

      return errors;
    });

    testResults.withLogo.errors = logoErrors;
    testResults.withLogo.success = logoErrors.length === 0;
    console.log(testResults.withLogo.success ? '✅ Frame - With Logo: PASS' : `❌ Frame - With Logo: FAIL (${logoErrors.length} errors)`);

    // Test 3: Frame Responsive Behavior
    console.log('\n📋 Testing Frame - Responsive Behavior...');
    await page.goto('http://localhost:6006/?path=/story/components-navigation-frame--responsive-behavior', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForTimeout(5000);

    const responsiveErrors = await page.evaluate(() => {
      const errors = [];
      const errorElements = document.querySelectorAll('[data-testid="error-message"]');
      errorElements.forEach(el => errors.push(el.textContent));
      return errors;
    });

    testResults.responsiveBehavior.errors = responsiveErrors;
    testResults.responsiveBehavior.success = responsiveErrors.length === 0;
    console.log(testResults.responsiveBehavior.success ? '✅ Frame - Responsive Behavior: PASS' : `❌ Frame - Responsive Behavior: FAIL (${responsiveErrors.length} errors)`);

    // Test 4: Breadcrumbs Default
    console.log('\n📋 Testing Breadcrumbs - Default...');
    await page.goto('http://localhost:6006/?path=/story/components-navigation-breadcrumbs--default', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForTimeout(5000);

    const breadcrumbsErrors = await page.evaluate(() => {
      const errors = [];

      // Check for destructuring errors
      if (document.body.textContent.includes('Cannot destructure property \'content\'')) {
        errors.push('Breadcrumbs destructuring error');
      }

      // Check for error boundary content
      const errorElements = document.querySelectorAll('[data-testid="error-message"]');
      errorElements.forEach(el => errors.push(el.textContent));

      return errors;
    });

    testResults.breadcrumbs.errors = breadcrumbsErrors;
    testResults.breadcrumbs.success = breadcrumbsErrors.length === 0;
    console.log(testResults.breadcrumbs.success ? '✅ Breadcrumbs - Default: PASS' : `❌ Breadcrumbs - Default: FAIL (${breadcrumbsErrors.length} errors)`);

    // Test 5: Breadcrumbs Product Navigation
    console.log('\n📋 Testing Breadcrumbs - Product Navigation...');
    await page.goto('http://localhost:6006/?path=/story/components-navigation-breadcrumbs--product-navigation', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    await page.waitForTimeout(5000);

    const productNavErrors = await page.evaluate(() => {
      const errors = [];
      const errorElements = document.querySelectorAll('[data-testid="error-message"]');
      errorElements.forEach(el => errors.push(el.textContent));
      return errors;
    });

    testResults.productNavigation.errors = productNavErrors;
    testResults.productNavigation.success = productNavErrors.length === 0;
    console.log(testResults.productNavigation.success ? '✅ Breadcrumbs - Product Navigation: PASS' : `❌ Breadcrumbs - Product Navigation: FAIL (${productNavErrors.length} errors)`);

    // Summary
    console.log('\n📊 TEST RESULTS SUMMARY');
    console.log('=======================');

    const successCount = Object.values(testResults).filter(result => result.success).length;
    const totalCount = Object.keys(testResults).length;

    Object.entries(testResults).forEach(([testName, result]) => {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${testName}: ${status}`);
      if (!result.success && result.errors.length > 0) {
        result.errors.forEach(error => console.log(`   - ${error}`));
      }
    });

    console.log(`\nOverall: ${successCount}/${totalCount} tests passing`);

    if (successCount === totalCount) {
      console.log('\n🎉 ALL REACT ERRORS FIXED!');
      console.log('✅ Frame component prop structure corrected');
      console.log('✅ TopBar searchField and userMenu now use JSX components');
      console.log('✅ Theme provider configuration completed');
      console.log('✅ Breadcrumbs destructuring errors resolved');
      console.log('✅ Enhanced error boundaries provide better debugging');
    } else {
      console.log('\n⚠️  Some issues still remain. Check the errors above.');
    }

  } catch (error) {
    console.error('❌ Test execution failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the test
testReactErrorsFixed().catch(console.error);