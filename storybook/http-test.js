const https = require('https');
const http = require('http');
const fs = require('fs');

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

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data: data
        });
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function runHttpTest() {
  console.log('🚀 Starting HTTP Testing to detect patterns...');

  const results = {
    timestamp: new Date().toISOString(),
    componentResults: []
  };

  for (let i = 0; i < componentTests.length; i++) {
    const test = componentTests[i];
    console.log(`\n📱 [${i + 1}/${componentTests.length}] Testing: ${test.name}`);
    console.log(`   URL: ${test.url}`);

    try {
      const response = await fetchUrl(test.url);

      console.log(`📄 Response status: ${response.statusCode}`);
      console.log(`   Content length: ${response.data.length} bytes`);

      // Look for error patterns in the HTML response
      const errorPatterns = [
        'prop-types',
        'does not provide an export',
        'No theme was provided',
        'Cannot destructure property',
        'React Error #31',
        'SyntaxError',
        'TypeError',
        'ReferenceError',
        'Module not found',
        'Failed to load resource'
      ];

      const foundPatterns = [];
      for (const pattern of errorPatterns) {
        if (response.data.includes(pattern)) {
          foundPatterns.push(pattern);
        }
      }

      // Look for script tags that might be failing
      const scriptTagMatches = response.data.match(/<script[^>]*src="([^"]*)"[^>]*>/g) || [];
      const propTypeScripts = scriptTagMatches.filter(script =>
        script.includes('prop-types') || script.includes('PropTypes')
      );

      // Look for console.error patterns in the JavaScript
      const consoleErrorMatches = response.data.match(/console\.error\([^)]*\)/g) || [];
      const consoleWarningMatches = response.data.match(/console\.warn\([^)]*\)/g) || [];

      const componentResult = {
        name: test.name,
        url: test.url,
        statusCode: response.statusCode,
        contentLength: response.data.length,
        foundErrorPatterns: foundPatterns,
        propTypeScriptTags: propTypeScripts,
        consoleErrors: consoleErrorMatches,
        consoleWarnings: consoleWarningMatches,
        hasContent: response.data.length > 1000,
        title: response.data.match(/<title>([^<]*)<\/title>/)?.[1] || 'No title found'
      };

      results.componentResults.push(componentResult);

      console.log(`✅ Completed test for ${test.name}`);
      console.log(`   Status: ${response.statusCode}`);
      console.log(`   Content loaded: ${componentResult.hasContent ? 'Yes' : 'No'}`);

      if (foundPatterns.length > 0) {
        console.log(`   🔍 Found error patterns: ${foundPatterns.join(', ')}`);
      }

      if (propTypeScripts.length > 0) {
        console.log(`   📦 Found prop-type script tags: ${propTypeScripts.length}`);
      }

      if (consoleErrorMatches.length > 0) {
        console.log(`   ❌ Found console.error patterns: ${consoleErrorMatches.length}`);
      }

      if (consoleWarningMatches.length > 0) {
        console.log(`   ⚠️  Found console.warn patterns: ${consoleWarningMatches.length}`);
      }

    } catch (error) {
      const componentResult = {
        name: test.name,
        url: test.url,
        error: {
          message: error.message,
          type: error.constructor.name
        },
        hasContent: false
      };

      results.componentResults.push(componentResult);
      console.log(`❌ Request failed for ${test.name}: ${error.message}`);
    }
  }

  // Save results to files
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  // Save full results
  fs.writeFileSync(
    `http-test-results-${timestamp}.json`,
    JSON.stringify(results, null, 2)
  );

  // Create summary
  const summary = {
    timestamp: results.timestamp,
    totalComponents: results.componentResults.length,
    successfulRequests: results.componentResults.filter(r => r.statusCode && r.statusCode < 400).length,
    componentsWithContent: results.componentResults.filter(r => r.hasContent).length,
    componentsWithErrorPatterns: results.componentResults.filter(r =>
      r.foundErrorPatterns && r.foundErrorPatterns.length > 0
    ).length,
    componentsWithPropTypes: results.componentResults.filter(r =>
      r.propTypeScriptTags && r.propTypeScriptTags.length > 0
    ).length,
    componentsWithConsoleErrors: results.componentResults.filter(r =>
      r.consoleErrors && r.consoleErrors.length > 0
    ).length,
    allErrorPatterns: results.componentResults.flatMap(r => r.foundErrorPatterns || []),
    allPropTypesTags: results.componentResults.flatMap(r => r.propTypeScriptTags || []),
    allConsoleErrors: results.componentResults.flatMap(r => r.consoleErrors || [])
  };

  fs.writeFileSync(
    `http-test-summary-${timestamp}.json`,
    JSON.stringify(summary, null, 2)
  );

  console.log('\n🎯 HTTP TEST SUMMARY');
  console.log('=====================================');
  console.log(`Total components tested: ${summary.totalComponents}`);
  console.log(`Successful requests: ${summary.successfulRequests}`);
  console.log(`Components with content: ${summary.componentsWithContent}`);
  console.log(`Components with error patterns: ${summary.componentsWithErrorPatterns}`);
  console.log(`Components with prop-type scripts: ${summary.componentsWithPropTypes}`);
  console.log(`Components with console errors: ${summary.componentsWithConsoleErrors}`);

  console.log('\n📁 Files saved:');
  console.log(`- Full results: http-test-results-${timestamp}.json`);
  console.log(`- Summary: http-test-summary-${timestamp}.json`);

  // Display critical findings
  if (summary.allErrorPatterns.length > 0) {
    console.log('\n🔍 ERROR PATTERNS FOUND:');
    const patternCounts = {};
    summary.allErrorPatterns.forEach(pattern => {
      patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
    });
    Object.entries(patternCounts).forEach(([pattern, count]) => {
      console.log(`   ${pattern}: ${count} occurrences`);
    });
  }

  if (summary.allPropTypesTags.length > 0) {
    console.log('\n📦 PROP-TYPE SCRIPTS FOUND:');
    console.log(`   Total prop-type script tags: ${summary.allPropTypesTags.length}`);
    summary.allPropTypesTags.slice(0, 5).forEach((script, index) => {
      console.log(`   ${index + 1}. ${script.substring(0, 100)}...`);
    });
    if (summary.allPropTypesTags.length > 5) {
      console.log(`   ... and ${summary.allPropTypesTags.length - 5} more`);
    }
  }

  if (summary.allConsoleErrors.length > 0) {
    console.log('\n❌ CONSOLE ERROR PATTERNS FOUND:');
    console.log(`   Total console.error patterns: ${summary.allConsoleErrors.length}`);
    summary.allConsoleErrors.slice(0, 5).forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
    if (summary.allConsoleErrors.length > 5) {
      console.log(`   ... and ${summary.allConsoleErrors.length - 5} more`);
    }
  }

  return results;
}

// Run the test
runHttpTest().catch(console.error);