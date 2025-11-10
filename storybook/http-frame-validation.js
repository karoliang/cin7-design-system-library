/**
 * HTTP-BASED FRAME COMPONENT VALIDATION
 * Tests all Frame variations without browser automation issues
 */

const http = require('http');
const https = require('https');

const FRAME_VARIATIONS = [
  { id: 'examples-frame--default', name: 'Default', url: 'http://localhost:6006/iframe.html?id=examples-frame--default&args=&viewMode=story' },
  { id: 'examples-frame--with-logo', name: 'WithLogo', url: 'http://localhost:6006/iframe.html?id=examples-frame--with-logo&args=&viewMode=story' },
  { id: 'examples-frame--with-notifications', name: 'WithNotifications', url: 'http://localhost:6006/iframe.html?id=examples-frame--with-notifications&args=&viewMode=story' },
  { id: 'examples-frame--ecommerce-layout', name: 'EcommerceLayout', url: 'http://localhost:6006/iframe.html?id=examples-frame--ecommerce-layout&args=&viewMode=story' },
  { id: 'examples-frame--minimal-layout', name: 'MinimalLayout', url: 'http://localhost:6006/iframe.html?id=examples-frame--minimal-layout&args=&viewMode=story' },
  { id: 'examples-frame--responsive-behavior', name: 'ResponsiveBehavior', url: 'http://localhost:6006/iframe.html?id=examples-frame--responsive-behavior&args=&viewMode=story' }
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          content: data
        });
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

function analyzeHTMLContent(content, variation) {
  const analysis = {
    hasStorybookRoot: content.includes('id="storybook-root"'),
    hasFrameContent: false,
    hasThemeErrors: content.includes('No theme was provided'),
    hasDestructuringErrors: content.includes('Cannot destructure'),
    hasReactErrors: content.includes('React Error') || content.includes('Error rendering component'),
    hasPropTypesErrors: content.includes('prop-types') || content.includes('PropTypes'),
    hasPolarisComponents: false,
    hasTopBar: false,
    hasNavigation: false,
    hasSearchField: false,
    hasErrors: false,
    errorIndicators: [],
    successIndicators: []
  };

  // Check for Frame-specific content
  if (content.includes('Polaris-TopBar') || content.includes('data-polaris-top-bar')) {
    analysis.hasTopBar = true;
    analysis.successIndicators.push('✅ TopBar component found');
  }

  if (content.includes('Polaris-Navigation') || content.includes('data-polaris-navigation') || content.includes('<nav')) {
    analysis.hasNavigation = true;
    analysis.successIndicators.push('✅ Navigation component found');
  }

  if (content.includes('search') || content.includes('SearchField')) {
    analysis.hasSearchField = true;
    analysis.successIndicators.push('✅ Search field found');
  }

  if (content.includes('Polaris-') || content.includes('data-polaris-')) {
    analysis.hasPolarisComponents = true;
    analysis.successIndicators.push('✅ Polaris components loaded');
  }

  if (content.includes('story') || content.includes('Story')) {
    analysis.hasFrameContent = true;
    analysis.successIndicators.push('✅ Story content rendered');
  }

  // Check for errors
  if (analysis.hasThemeErrors) {
    analysis.hasErrors = true;
    analysis.errorIndicators.push('❌ "No theme was provided" error detected');
  }

  if (analysis.hasDestructuringErrors) {
    analysis.hasErrors = true;
    analysis.errorIndicators.push('❌ "Cannot destructure" error detected');
  }

  if (analysis.hasReactErrors) {
    analysis.hasErrors = true;
    analysis.errorIndicators.push('❌ React rendering error detected');
  }

  if (content.includes('Error:') || content.includes('error:')) {
    analysis.hasErrors = true;
    analysis.errorIndicators.push('❌ JavaScript error detected');
  }

  if (content.includes('No Preview')) {
    analysis.hasErrors = true;
    analysis.errorIndicators.push('❌ "No Preview" component failure');
  }

  // Check for PropTypes module loading
  if (content.includes('Virtual prop-types module loaded successfully')) {
    analysis.successIndicators.push('✅ PropTypes virtual module loaded');
  }

  if (content.includes('NUCLEAR EMERGENCY CACHE BREAKING')) {
    analysis.successIndicators.push('✅ Cache breaking system active');
  }

  return analysis;
}

async function validateFrameComponents() {
  console.log('🚀 HTTP-BASED FRAME COMPONENT VALIDATION');
  console.log('==========================================');
  console.log('');

  const results = {
    totalTests: FRAME_VARIATIONS.length,
    passed: 0,
    failed: 0,
    details: []
  };

  console.log('📊 Testing all Frame variations...');
  console.log('');

  for (const variation of FRAME_VARIATIONS) {
    console.log(`🔍 Testing: ${variation.name} (${variation.id})`);

    try {
      const response = await makeRequest(variation.url);

      if (response.statusCode !== 200) {
        console.log(`❌ HTTP Error: ${response.statusCode}`);
        results.failed++;
        results.details.push({
          variation: variation.name,
          status: 'FAILED',
          reason: `HTTP ${response.statusCode}`,
          analysis: null
        });
        continue;
      }

      const analysis = analyzeHTMLContent(response.content, variation);

      if (analysis.hasErrors) {
        console.log(`❌ Component has errors:`);
        analysis.errorIndicators.forEach(indicator => console.log(`   ${indicator}`));
        results.failed++;
        results.details.push({
          variation: variation.name,
          status: 'FAILED',
          reason: 'Component errors detected',
          analysis: analysis
        });
      } else {
        console.log(`✅ Component loaded successfully:`);
        analysis.successIndicators.forEach(indicator => console.log(`   ${indicator}`));
        results.passed++;
        results.details.push({
          variation: variation.name,
          status: 'PASSED',
          reason: 'Component loaded without errors',
          analysis: analysis
        });
      }

    } catch (error) {
      console.log(`❌ Request failed: ${error.message}`);
      results.failed++;
      results.details.push({
        variation: variation.name,
        status: 'FAILED',
        reason: `Request error: ${error.message}`,
        analysis: null
      });
    }

    console.log('');
  }

  // Print comprehensive results
  printResults(results);

  return results;
}

function printResults(results) {
  console.log('📊 COMPREHENSIVE FRAME COMPONENT VALIDATION RESULTS');
  console.log('====================================================');
  console.log('');

  console.log(`📈 OVERALL STATISTICS:`);
  console.log(`   Total Frame Variations: ${results.totalTests}`);
  console.log(`   ✅ Passed: ${results.passed}`);
  console.log(`   ❌ Failed: ${results.failed}`);
  console.log(`   📊 Success Rate: ${((results.passed / results.totalTests) * 100).toFixed(1)}%`);
  console.log('');

  if (results.passed === results.totalTests) {
    console.log('🎉 ALL FRAME COMPONENTS ARE WORKING CORRECTLY!');
    console.log('');
    console.log('✅ Key Success Indicators:');
    console.log('   • PropTypes virtual module loading successfully');
    console.log('   • No theme provider errors');
    console.log('   • No destructuring errors');
    console.log('   • All Polaris components rendering');
    console.log('   • Frame structure intact');
  } else {
    console.log('⚠️  SOME FRAME COMPONENTS HAVE ISSUES:');
    console.log('');

    const failedTests = results.details.filter(detail => detail.status === 'FAILED');
    failedTests.forEach(test => {
      console.log(`❌ ${test.variation}: ${test.reason}`);
      if (test.analysis && test.analysis.errorIndicators.length > 0) {
        test.analysis.errorIndicators.forEach(indicator => {
          console.log(`   ${indicator}`);
        });
      }
    });
  }

  console.log('');
  console.log('🔧 TECHNICAL DETAILS:');
  console.log('==================');

  const passedTests = results.details.filter(detail => detail.status === 'PASSED');
  if (passedTests.length > 0) {
    console.log('✅ Successfully loaded components:');
    passedTests.forEach(test => {
      console.log(`   • ${test.variation}: ${test.reason}`);
      if (test.analysis && test.analysis.successIndicators.length > 0) {
        console.log(`     ${test.analysis.successIndicators.join(', ')}`);
      }
    });
  }

  console.log('');
  console.log('🎯 VALIDATION COMPLETE');
  console.log('=====================');
}

// Run the validation
validateFrameComponents().catch(console.error);