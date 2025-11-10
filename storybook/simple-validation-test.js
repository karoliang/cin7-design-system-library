const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

const baseUrl = 'http://localhost:6009';

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

function checkUrlStatus(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;

    const req = client.get(url, (res) => {
      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 300,
          hasErrorBoundary: data.includes('🚨') && data.includes('Failed to Render'),
          hasPropTypesError: data.includes('require is not defined') || data.includes('PropTypes'),
          hasThemeError: data.includes('No theme was provided'),
          hasDestructureError: data.includes('Cannot destructure property'),
          contentLength: data.length,
          hasReactContent: data.includes('React') || data.includes('react'),
          hasPolarisContent: data.includes('Polaris') || data.includes('shopify'),
          htmlContent: data.substring(0, 2000) // First 2KB for analysis
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: err.message,
        hasErrorBoundary: false,
        hasPropTypesError: false,
        hasThemeError: false,
        hasDestructureError: false,
        contentLength: 0
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        success: false,
        error: 'Timeout',
        hasErrorBoundary: false,
        hasPropTypesError: false,
        hasThemeError: false,
        hasDestructureError: false,
        contentLength: 0
      });
    });
  });
}

async function testComponentVariations(componentName, variations) {
  console.log(`\n🧪 Testing ${componentName} Components:`);
  console.log('='.repeat(50));

  const results = {
    total: variations.length,
    passed: 0,
    failed: 0,
    errors: [],
    details: []
  };

  for (const variation of variations) {
    const url = `${baseUrl}/iframe.html?id=components-navigation-${componentName.toLowerCase()}--${variation}&args=&viewMode=story`;
    console.log(`\n📝 Testing: ${componentName} - ${variation}`);
    console.log(`   URL: ${url}`);

    const result = await checkUrlStatus(url);

    // Analyze the result
    const issues = [];
    if (!result.success) {
      issues.push(`HTTP ${result.status}: ${result.error || 'Unknown error'}`);
    }
    if (result.hasErrorBoundary) {
      issues.push('Error boundary triggered');
    }
    if (result.hasPropTypesError) {
      issues.push('PropTypes error detected');
    }
    if (result.hasThemeError) {
      issues.push('Theme provider error');
    }
    if (result.hasDestructureError) {
      issues.push('Destructuring error');
    }
    if (!result.hasReactContent) {
      issues.push('No React content found');
    }
    if (!result.hasPolarisContent) {
      issues.push('No Polaris content found');
    }

    const passed = issues.length === 0 && result.success;

    if (passed) {
      results.passed++;
      console.log(`   ✅ PASSED - Status: ${result.status}, Content: ${result.contentLength} bytes`);
    } else {
      results.failed++;
      console.log(`   ❌ FAILED - Issues: ${issues.join(', ')}`);

      if (result.htmlContent && result.htmlContent.length > 0) {
        // Look for specific error patterns in the HTML
        const errorMatches = result.htmlContent.match(/error/i);
        const propMatches = result.htmlContent.match(/prop/i);
        const themeMatches = result.htmlContent.match(/theme/i);

        if (errorMatches || propMatches || themeMatches) {
          console.log(`   🔍 Content analysis shows potential issues`);
        }
      }
    }

    results.details.push({
      variation,
      url,
      passed,
      issues,
      status: result.status,
      contentLength: result.contentLength
    });
  }

  return results;
}

async function runComprehensiveValidation() {
  console.log('🚀 Comprehensive Component Validation Test');
  console.log('==========================================');
  console.log(`Testing Storybook at: ${baseUrl}`);

  // First check if Storybook is running
  console.log('\n🔍 Checking Storybook accessibility...');
  const mainPageResult = await checkUrlStatus(baseUrl);

  if (!mainPageResult.success) {
    console.log(`❌ Storybook is not accessible at ${baseUrl}`);
    console.log(`   Status: ${mainPageResult.status}`);
    console.log(`   Error: ${mainPageResult.error || 'Unknown error'}`);
    console.log('\n💡 Please make sure Storybook is running before executing this test.');
    return null;
  }

  console.log(`✅ Storybook is accessible (Status: ${mainPageResult.status})`);

  // Test Frame components
  const frameResults = await testComponentVariations('Frame', frameVariations);

  // Test Breadcrumbs components
  const breadcrumbsResults = await testComponentVariations('Breadcrumbs', breadcrumbsVariations);

  // Generate final report
  console.log('\n📊 FINAL VALIDATION REPORT');
  console.log('='.repeat(50));

  console.log(`\n📦 Frame Components:`);
  console.log(`   Total: ${frameResults.total}`);
  console.log(`   ✅ Passed: ${frameResults.passed}`);
  console.log(`   ❌ Failed: ${frameResults.failed}`);
  console.log(`   Success Rate: ${((frameResults.passed / frameResults.total) * 100).toFixed(1)}%`);

  if (frameResults.failed > 0) {
    console.log(`\n   Failed Frame variations:`);
    frameResults.details.filter(d => !d.passed).forEach(detail => {
      console.log(`     • ${detail.variation}: ${detail.issues.join(', ')}`);
    });
  }

  console.log(`\n📦 Breadcrumbs Components:`);
  console.log(`   Total: ${breadcrumbsResults.total}`);
  console.log(`   ✅ Passed: ${breadcrumbsResults.passed}`);
  console.log(`   ❌ Failed: ${breadcrumbsResults.failed}`);
  console.log(`   Success Rate: ${((breadcrumbsResults.passed / breadcrumbsResults.total) * 100).toFixed(1)}%`);

  if (breadcrumbsResults.failed > 0) {
    console.log(`\n   Failed Breadcrumbs variations:`);
    breadcrumbsResults.details.filter(d => !d.passed).forEach(detail => {
      console.log(`     • ${detail.variation}: ${detail.issues.join(', ')}`);
    });
  }

  const totalTested = frameResults.total + breadcrumbsResults.total;
  const totalPassed = frameResults.passed + breadcrumbsResults.passed;
  const totalFailed = frameResults.failed + breadcrumbsResults.failed;
  const overallSuccessRate = ((totalPassed / totalTested) * 100).toFixed(1);

  console.log(`\n🎯 OVERALL SUMMARY:`);
  console.log(`   Total Components Tested: ${totalTested}`);
  console.log(`   ✅ Total Passed: ${totalPassed}`);
  console.log(`   ❌ Total Failed: ${totalFailed}`);
  console.log(`   Overall Success Rate: ${overallSuccessRate}%`);

  if (totalFailed === 0) {
    console.log(`\n🎉 ALL COMPONENTS PASSED VALIDATION!`);
    console.log(`✅ No PropTypes require() errors detected`);
    console.log(`✅ No "No theme was provided" errors detected`);
    console.log(`✅ No "Cannot destructure property" errors detected`);
    console.log(`✅ All components appear to be rendering correctly`);
  } else {
    console.log(`\n⚠️  ${totalFailed} component(s) failed validation`);
    console.log(`🔧 Review the detailed errors above for troubleshooting`);
  }

  return {
    frame: frameResults,
    breadcrumbs: breadcrumbsResults,
    summary: {
      totalTested,
      totalPassed,
      totalFailed,
      successRate: parseFloat(overallSuccessRate)
    }
  };
}

// Run the validation
if (require.main === module) {
  runComprehensiveValidation()
    .then(results => {
      if (results && results.summary.totalFailed === 0) {
        console.log('\n✅ Validation completed successfully');
        process.exit(0);
      } else {
        console.log('\n❌ Validation completed with failures');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 Validation failed with error:', error.message);
      process.exit(1);
    });
}

module.exports = { runComprehensiveValidation, testComponentVariations };