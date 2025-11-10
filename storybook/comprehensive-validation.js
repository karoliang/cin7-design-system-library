const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Component test data
const components = {
  frame: {
    variations: [
      'default',
      'with-logo',
      'with-notifications',
      'ecommerce-layout',
      'minimal-layout',
      'responsive-behavior'
    ],
    storyFile: 'stories/components/navigation/Frame.stories.tsx'
  },
  breadcrumbs: {
    variations: [
      'default',
      'short-path',
      'long-path',
      'product-navigation',
      'ecommerce-navigation',
      'admin-panel',
      'documentation-site',
      'many-items'
    ],
    storyFile: 'stories/components/navigation/Breadcrumbs.stories.tsx'
  }
};

const baseUrl = 'http://localhost:6009';

// Function to check URL accessibility
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
          success: res.statusCode >= 200 && res.statusCode < 400,
          contentLength: data.length,
          hasErrorDisplay: data.includes('sb-errordisplay'),
          hasFrameErrorBoundary: data.includes('🚨 Frame Component Failed to Render'),
          hasBreadcrumbsErrorBoundary: data.includes('🚨 Breadcrumbs Component Failed to Render'),
          hasPropTypesError: data.includes('require is not defined') && data.includes('PropTypes'),
          hasThemeError: data.includes('No theme was provided'),
          hasDestructureError: data.includes('Cannot destructure property'),
          hasReactContent: data.includes('react') || data.includes('React'),
          hasPolarisContent: data.includes('shopify') || data.includes('Polaris'),
          hasErrorBoundaryContent: data.includes('ErrorBoundary') || data.includes('error boundary')
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 0,
        success: false,
        error: err.message,
        contentLength: 0,
        hasErrorDisplay: false,
        hasFrameErrorBoundary: false,
        hasBreadcrumbsErrorBoundary: false,
        hasPropTypesError: false,
        hasThemeError: false,
        hasDestructureError: false,
        hasReactContent: false,
        hasPolarisContent: false,
        hasErrorBoundaryContent: false
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 0,
        success: false,
        error: 'Timeout',
        contentLength: 0,
        hasErrorDisplay: false,
        hasFrameErrorBoundary: false,
        hasBreadcrumbsErrorBoundary: false,
        hasPropTypesError: false,
        hasThemeError: false,
        hasDestructureError: false,
        hasReactContent: false,
        hasPolarisContent: false,
        hasErrorBoundaryContent: false
      });
    });
  });
}

// Function to analyze story file for PropTypes fixes
function analyzeStoryFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    const content = fs.readFileSync(fullPath, 'utf8');

    return {
      fileExists: true,
      hasErrorBoundary: content.includes('ErrorBoundary') || content.includes('error boundary'),
      hasFrameErrorBoundary: content.includes('FrameErrorBoundary'),
      hasBreadcrumbsErrorBoundary: content.includes('BreadcrumbsErrorBoundary'),
      hasAppProvider: content.includes('AppProvider'),
      hasThemeConfiguration: content.includes('theme:') && content.includes('colors:'),
      hasPropTypesValidation: content.includes('PropTypes') || content.includes('propTypes'),
      hasConsoleError: content.includes('console.error'),
      hasComponentDecorators: content.includes('decorators:') && content.includes('AppProvider'),
      hasErrorHandling: content.includes('componentDidCatch') || content.includes('getDerivedStateFromError'),
      fileContent: content.substring(0, 1000) // First 1000 chars for reference
    };
  } catch (error) {
    return {
      fileExists: false,
      error: error.message,
      fileContent: null
    };
  }
}

// Function to test component variations
async function testComponent(componentName, componentData) {
  console.log(`\n🔍 Testing ${componentName.toUpperCase()} Component`);
  console.log('='.repeat(60));

  const results = {
    totalTests: componentData.variations.length,
    urlTests: {
      passed: 0,
      failed: 0,
      details: []
    },
    sourceAnalysis: null,
    summary: {
      propTypesFixed: false,
      themeProviderFixed: false,
      errorBoundariesWorking: false,
      overallSuccess: false
    }
  };

  // Analyze the source file first
  console.log(`\n📄 Analyzing story file: ${componentData.storyFile}`);
  results.sourceAnalysis = analyzeStoryFile(componentData.storyFile);

  if (results.sourceAnalysis.fileExists) {
    console.log(`   ✅ Story file exists`);
    console.log(`   🛡️  Has error boundaries: ${results.sourceAnalysis.hasErrorBoundary}`);
    console.log(`   🎨 Has AppProvider: ${results.sourceAnalysis.hasAppProvider}`);
    console.log(`   🌈 Has theme configuration: ${results.sourceAnalysis.hasThemeConfiguration}`);
    console.log(`   🛠️  Has error handling: ${results.sourceAnalysis.hasErrorHandling}`);
  } else {
    console.log(`   ❌ Story file not found: ${results.sourceAnalysis.error}`);
  }

  // Test each variation
  for (const variation of componentData.variations) {
    const url = `${baseUrl}/iframe.html?id=components-navigation-${componentName.toLowerCase()}--${variation}&args=&viewMode=story`;
    console.log(`\n🧪 Testing: ${variation}`);
    console.log(`   URL: ${url}`);

    const urlResult = await checkUrlStatus(url);

    // Analyze the URL result
    const issues = [];
    if (!urlResult.success) {
      issues.push(`HTTP ${urlResult.status}: ${urlResult.error || 'Failed to load'}`);
    }
    if (urlResult.hasPropTypesError) {
      issues.push('PropTypes require() error detected');
    }
    if (urlResult.hasThemeError) {
      issues.push('Theme provider error detected');
    }
    if (urlResult.hasDestructureError) {
      issues.push('Destructuring error detected');
    }
    if (urlResult.hasErrorDisplay && !urlResult.hasErrorBoundaryContent) {
      issues.push('Generic error display detected');
    }
    if (!urlResult.hasReactContent) {
      issues.push('No React content detected');
    }

    const passed = issues.length === 0 && urlResult.success && !urlResult.hasErrorDisplay;

    if (passed) {
      results.urlTests.passed++;
      console.log(`   ✅ PASSED - Status: ${urlResult.status}, Content: ${urlResult.contentLength} bytes`);
    } else {
      results.urlTests.failed++;
      console.log(`   ❌ FAILED - Issues: ${issues.join(', ')}`);
      if (urlResult.hasErrorDisplay) {
        console.log(`   🚨 Error display present`);
      }
    }

    results.urlTests.details.push({
      variation,
      url,
      passed,
      issues,
      status: urlResult.status,
      contentLength: urlResult.contentLength,
      hasErrorDisplay: urlResult.hasErrorDisplay,
      hasErrorBoundaryContent: urlResult.hasErrorBoundaryContent
    });
  }

  // Determine if the PropTypes fixes are working
  results.summary.propTypesFixed = !results.urlTests.details.some(d => d.issues.some(i => i.includes('PropTypes')));
  results.summary.themeProviderFixed = !results.urlTests.details.some(d => d.issues.some(i => i.includes('Theme provider')));
  results.summary.errorBoundariesWorking = results.sourceAnalysis.hasErrorBoundary &&
    results.urlTests.details.every(d => !d.hasErrorDisplay || d.hasErrorBoundaryContent);
  results.summary.overallSuccess = results.urlTests.failed === 0 &&
    results.summary.propTypesFixed &&
    results.summary.themeProviderFixed &&
    results.summary.errorBoundariesWorking;

  return results;
}

// Main validation function
async function runComprehensiveValidation() {
  console.log('🚀 COMPREHENSIVE PROP TYPES FIX VALIDATION');
  console.log('='.repeat(80));
  console.log(`Testing Storybook at: ${baseUrl}`);
  console.log(`Target Components: Frame and Breadcrumbs`);
  console.log(`Checking for: PropTypes errors, theme provider issues, destructuring errors`);

  // Check if Storybook is accessible
  console.log('\n🔍 Checking Storybook accessibility...');
  const mainPageResult = await checkUrlStatus(baseUrl);

  if (!mainPageResult.success) {
    console.log(`❌ Storybook is not accessible at ${baseUrl}`);
    console.log(`   Status: ${mainPageResult.status}`);
    console.log(`   Error: ${mainPageResult.error || 'Unknown error'}`);
    return null;
  }

  console.log(`✅ Storybook is accessible (Status: ${mainPageResult.status})`);

  const allResults = {};

  // Test Frame component
  allResults.frame = await testComponent('frame', components.frame);

  // Test Breadcrumbs component
  allResults.breadcrumbs = await testComponent('breadcrumbs', components.breadcrumbs);

  // Generate comprehensive report
  console.log('\n\n📊 COMPREHENSIVE VALIDATION REPORT');
  console.log('='.repeat(80));

  for (const [componentName, results] of Object.entries(allResults)) {
    console.log(`\n📦 ${componentName.toUpperCase()} Component:`);
    console.log(`   Total Variations: ${results.totalTests}`);
    console.log(`   ✅ URL Tests Passed: ${results.urlTests.passed}`);
    console.log(`   ❌ URL Tests Failed: ${results.urlTests.failed}`);
    console.log(`   Success Rate: ${((results.urlTests.passed / results.totalTests) * 100).toFixed(1)}%`);

    console.log(`\n   🛡️  PropTypes Fixed: ${results.summary.propTypesFixed ? '✅ YES' : '❌ NO'}`);
    console.log(`   🎨 Theme Provider Fixed: ${results.summary.themeProviderFixed ? '✅ YES' : '❌ NO'}`);
    console.log(`   🚨 Error Boundaries Working: ${results.summary.errorBoundariesWorking ? '✅ YES' : '❌ NO'}`);
    console.log(`   🎯 Overall Success: ${results.summary.overallSuccess ? '✅ YES' : '❌ NO'}`);

    if (results.sourceAnalysis && results.sourceAnalysis.fileExists) {
      console.log(`\n   📄 Source File Analysis:`);
      console.log(`     • Has Error Boundaries: ${results.sourceAnalysis.hasErrorBoundary}`);
      console.log(`     • Has AppProvider: ${results.sourceAnalysis.hasAppProvider}`);
      console.log(`     • Has Theme Configuration: ${results.sourceAnalysis.hasThemeConfiguration}`);
      console.log(`     • Has Error Handling: ${results.sourceAnalysis.hasErrorHandling}`);
    }

    if (results.urlTests.failed > 0) {
      console.log(`\n   ❌ Failed Variations:`);
      results.urlTests.details.filter(d => !d.passed).forEach(detail => {
        console.log(`     • ${detail.variation}: ${detail.issues.join(', ')}`);
      });
    }
  }

  // Overall summary
  const totalVariations = Object.values(allResults).reduce((sum, r) => sum + r.totalTests, 0);
  const totalPassed = Object.values(allResults).reduce((sum, r) => sum + r.urlTests.passed, 0);
  const totalFailed = Object.values(allResults).reduce((sum, r) => sum + r.urlTests.failed, 0);
  const allPropTypesFixed = Object.values(allResults).every(r => r.summary.propTypesFixed);
  const allThemeProvidersFixed = Object.values(allResults).every(r => r.summary.themeProviderFixed);
  const allErrorBoundariesWorking = Object.values(allResults).every(r => r.summary.errorBoundariesWorking);
  const overallSuccess = totalFailed === 0 && allPropTypesFixed && allThemeProvidersFixed && allErrorBoundariesWorking;

  console.log(`\n🎯 OVERALL VALIDATION SUMMARY:`);
  console.log('='.repeat(50));
  console.log(`   Total Component Variations Tested: ${totalVariations}`);
  console.log(`   ✅ Total Passed: ${totalPassed}`);
  console.log(`   ❌ Total Failed: ${totalFailed}`);
  console.log(`   Overall Success Rate: ${((totalPassed / totalVariations) * 100).toFixed(1)}%`);

  console.log(`\n🔧 PROP TYPES FIX VALIDATION:`);
  console.log(`   🛡️  PropTypes Issues Resolved: ${allPropTypesFixed ? '✅ YES' : '❌ NO'}`);
  console.log(`   🎨 Theme Provider Issues Resolved: ${allThemeProvidersFixed ? '✅ YES' : '❌ NO'}`);
  console.log(`   🚨 Error Boundaries Working: ${allErrorBoundariesWorking ? '✅ YES' : '❌ NO'}`);
  console.log(`   🎯 Overall Fix Success: ${overallSuccess ? '✅ YES' : '❌ NO'}`);

  if (overallSuccess) {
    console.log(`\n🎉 VALIDATION SUCCESSFUL!`);
    console.log(`✅ All PropTypes require() errors have been resolved`);
    console.log(`✅ All "No theme was provided" errors have been resolved`);
    console.log(`✅ All "Cannot destructure property" errors have been resolved`);
    console.log(`✅ All components are rendering properly`);
    console.log(`✅ Error boundaries are working correctly`);
  } else {
    console.log(`\n⚠️  VALIDATION IDENTIFIED ISSUES`);
    if (!allPropTypesFixed) {
      console.log(`❌ PropTypes issues still present in some components`);
    }
    if (!allThemeProvidersFixed) {
      console.log(`❌ Theme provider issues still present in some components`);
    }
    if (!allErrorBoundariesWorking) {
      console.log(`❌ Error boundaries not working correctly in some components`);
    }
    if (totalFailed > 0) {
      console.log(`❌ ${totalFailed} component variations still failing`);
    }
  }

  return {
    components: allResults,
    summary: {
      totalVariations,
      totalPassed,
      totalFailed,
      successRate: (totalPassed / totalVariations) * 100,
      propTypesFixed: allPropTypesFixed,
      themeProvidersFixed: allThemeProvidersFixed,
      errorBoundariesWorking: allErrorBoundariesWorking,
      overallSuccess
    }
  };
}

// Run the validation
if (require.main === module) {
  runComprehensiveValidation()
    .then(results => {
      if (results && results.summary.overallSuccess) {
        console.log('\n✅ Comprehensive validation completed successfully');
        process.exit(0);
      } else {
        console.log('\n❌ Comprehensive validation completed with issues');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('\n💥 Validation failed with error:', error.message);
      console.error(error.stack);
      process.exit(1);
    });
}

module.exports = { runComprehensiveValidation, testComponent, analyzeStoryFile };