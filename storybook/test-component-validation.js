const puppeteer = require('puppeteer');
const chalk = require('chalk');

// Component configurations
const frameVariations = [
  'default',
  'with-logo',
  'with-notifications',
  'ecommerce-layout',
  'minimal-layout',
  'responsive-behavior'
];

const breadcrumbsVariations = [
  'default',
  'short-path',
  'long-path',
  'product-navigation',
  'ecommerce-navigation',
  'admin-panel',
  'documentation-site',
  'many-items'
];

const baseUrl = 'http://localhost:6009';

async function testComponentUrl(page, componentName, variation) {
  const url = `${baseUrl}/iframe.html?id=components-navigation-${componentName.toLowerCase()}--${variation}&args=&viewMode=story`;

  console.log(chalk.blue(`\n🧪 Testing: ${componentName} - ${variation}`));
  console.log(chalk.gray(`URL: ${url}`));

  const errors = [];
  const warnings = [];

  // Set up console logging
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') {
      errors.push(text);
      console.log(chalk.red(`❌ Error: ${text}`));
    } else if (msg.type() === 'warning') {
      warnings.push(text);
      console.log(chalk.yellow(`⚠️  Warning: ${text}`));
    } else if (text.includes('🔍') || text.includes('🚨')) {
      console.log(chalk.cyan(`📋 Debug: ${text}`));
    }
  });

  // Set up error page handling
  page.on('pageerror', error => {
    errors.push(error.message);
    console.log(chalk.red(`💥 Page Error: ${error.message}`));
  });

  try {
    // Navigate to the URL
    const response = await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
    }

    // Wait for the component to potentially load
    await page.waitForTimeout(3000);

    // Check if the page contains error indicators
    const hasErrorBoundary = await page.$('[data-has-error="true"]');
    const hasFrameError = await page.$('div:contains("🚨 Frame Component Failed to Render")');
    const hasBreadcrumbsError = await page.$('div:contains("🚨 Breadcrumbs Component Failed to Render")');

    if (hasErrorBoundary || hasFrameError || hasBreadcrumbsError) {
      const errorText = await page.evaluate(() => {
        const errorElement = document.querySelector('[data-has-error="true"]') ||
                           document.querySelector('div:contains("🚨 Component Failed to Render")');
        return errorElement ? errorElement.textContent : 'Unknown error boundary triggered';
      });
      errors.push(`Error boundary triggered: ${errorText}`);
      console.log(chalk.red(`🛑 Error boundary detected: ${errorText}`));
    }

    // Check if component rendered successfully (look for Polaris components)
    const componentExists = await page.evaluate(() => {
      // Look for Frame or Breadcrumbs components
      const frameElement = document.querySelector('[class*="Frame"]');
      const breadcrumbsElement = document.querySelector('[class*="Breadcrumbs"]');
      return frameElement || breadcrumbsElement;
    });

    if (componentExists) {
      console.log(chalk.green(`✅ Component rendered successfully`));
    } else {
      warnings.push('Component element not found in DOM');
      console.log(chalk.yellow(`⚠️  Component element not found in DOM`));
    }

    return {
      url,
      success: errors.length === 0,
      errors,
      warnings,
      componentExists: !!componentExists
    };

  } catch (error) {
    errors.push(`Navigation error: ${error.message}`);
    console.log(chalk.red(`🚫 Navigation failed: ${error.message}`));

    return {
      url,
      success: false,
      errors,
      warnings,
      componentExists: false
    };
  }
}

async function runValidation() {
  console.log(chalk.magenta('🚀 Starting Comprehensive Component Validation\n'));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });

  const results = {
    frame: { tested: 0, passed: 0, failed: 0, errors: [] },
    breadcrumbs: { tested: 0, passed: 0, failed: 0, errors: [] }
  };

  // Test Frame components
  console.log(chalk.magenta('📦 Testing Frame Components:'));
  for (const variation of frameVariations) {
    const result = await testComponentUrl(page, 'Frame', variation);
    results.frame.tested++;

    if (result.success && result.componentExists) {
      results.frame.passed++;
      console.log(chalk.green(`✅ Frame - ${variation}: PASSED`));
    } else {
      results.frame.failed++;
      results.frame.errors.push({
        variation,
        errors: result.errors,
        warnings: result.warnings
      });
      console.log(chalk.red(`❌ Frame - ${variation}: FAILED`));
    }
  }

  // Test Breadcrumbs components
  console.log(chalk.magenta('\n📦 Testing Breadcrumbs Components:'));
  for (const variation of breadcrumbsVariations) {
    const result = await testComponentUrl(page, 'Breadcrumbs', variation);
    results.breadcrumbs.tested++;

    if (result.success && result.componentExists) {
      results.breadcrumbs.passed++;
      console.log(chalk.green(`✅ Breadcrumbs - ${variation}: PASSED`));
    } else {
      results.breadcrumbs.failed++;
      results.breadcrumbs.errors.push({
        variation,
        errors: result.errors,
        warnings: result.warnings
      });
      console.log(chalk.red(`❌ Breadcrumbs - ${variation}: FAILED`));
    }
  }

  await browser.close();

  // Generate final report
  console.log(chalk.magenta('\n\n📊 FINAL VALIDATION REPORT'));
  console.log(chalk.magenta('================================'));

  console.log(chalk.blue('\n📦 Frame Component Results:'));
  console.log(`  Total Tested: ${results.frame.tested}`);
  console.log(chalk.green(`  ✅ Passed: ${results.frame.passed}`));
  console.log(chalk.red(`  ❌ Failed: ${results.frame.failed}`));

  if (results.frame.errors.length > 0) {
    console.log(chalk.red('\n  Frame Errors:'));
    results.frame.errors.forEach(error => {
      console.log(chalk.red(`    • ${error.variation}: ${error.errors.join(', ')}`));
    });
  }

  console.log(chalk.blue('\n📦 Breadcrumbs Component Results:'));
  console.log(`  Total Tested: ${results.breadcrumbs.tested}`);
  console.log(chalk.green(`  ✅ Passed: ${results.breadcrumbs.passed}`));
  console.log(chalk.red(`  ❌ Failed: ${results.breadcrumbs.failed}`));

  if (results.breadcrumbs.errors.length > 0) {
    console.log(chalk.red('\n  Breadcrumbs Errors:'));
    results.breadcrumbs.errors.forEach(error => {
      console.log(chalk.red(`    • ${error.variation}: ${error.errors.join(', ')}`));
    });
  }

  const totalTested = results.frame.tested + results.breadcrumbs.tested;
  const totalPassed = results.frame.passed + results.breadcrumbs.passed;
  const totalFailed = results.frame.failed + results.breadcrumbs.failed;
  const successRate = ((totalPassed / totalTested) * 100).toFixed(1);

  console.log(chalk.magenta('\n🎯 OVERALL SUMMARY:'));
  console.log(`  Total Components Tested: ${totalTested}`);
  console.log(chalk.green(`  Total Passed: ${totalPassed}`));
  console.log(chalk.red(`  Total Failed: ${totalFailed}`));
  console.log(chalk.blue(`  Success Rate: ${successRate}%`));

  if (totalFailed === 0) {
    console.log(chalk.green('\n🎉 ALL COMPONENTS PASSED VALIDATION!'));
    console.log(chalk.green('✅ No PropTypes errors detected'));
    console.log(chalk.green('✅ No theme provider errors detected'));
    console.log(chalk.green('✅ All components rendering correctly'));
  } else {
    console.log(chalk.red(`\n⚠️  ${totalFailed} component(s) failed validation`));
    console.log(chalk.yellow('Review the errors above for troubleshooting'));
  }

  return {
    frame: results.frame,
    breadcrumbs: results.breadcrumbs,
    summary: {
      totalTested,
      totalPassed,
      totalFailed,
      successRate: parseFloat(successRate)
    }
  };
}

// Check if Storybook is accessible first
async function checkStorybookAccessible() {
  try {
    const response = await fetch(`${baseUrl}/`);
    return response.ok;
  } catch (error) {
    console.error(chalk.red(`❌ Storybook not accessible at ${baseUrl}`));
    console.error(chalk.red('Make sure Storybook is running before running this script'));
    return false;
  }
}

// Run the validation
if (require.main === module) {
  checkStorybookAccessible().then(accessible => {
    if (accessible) {
      runValidation().then(results => {
        process.exit(results.summary.totalFailed > 0 ? 1 : 0);
      }).catch(error => {
        console.error(chalk.red('Validation failed:'), error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

module.exports = { runValidation, checkStorybookAccessible };