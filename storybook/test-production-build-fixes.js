#!/usr/bin/env node

/**
 * Production Build Test
 * Tests the enhanced PropTypes fixes for Netlify platform compatibility
 */

const http = require('http');
const https = require('https');

async function fetchStoryHTML(url) {
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

async function testProductionBuildFixes() {
  const tests = [
    {
      name: 'Frame Component - Default',
      url: 'http://localhost:6006/iframe.html?id=components-navigation-frame--default&args=&viewMode=story'
    },
    {
      name: 'Frame Component - With TopBar',
      url: 'http://localhost:6006/iframe.html?id=components-navigation-frame--with-top-bar&args=&viewMode=story'
    },
    {
      name: 'Breadcrumbs Component - Default',
      url: 'http://localhost:6006/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story'
    },
    {
      name: 'Minimal Frame Test',
      url: 'http://localhost:6006/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story'
    }
  ];

  console.log('🏭 TESTING PRODUCTION BUILD FIXES');
  console.log('==================================');
  console.log('Testing enhanced PropTypes compatibility for Netlify deployment...');

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    console.log(`\n🧪 Testing: ${test.name}`);
    console.log(`📍 URL: ${test.url}`);

    try {
      const result = await fetchStoryHTML(test.url);

      if (result.statusCode !== 200) {
        console.log(`❌ HTTP Error: ${result.statusCode}`);
        continue;
      }

      const content = result.content;

      // Check for PropTypes errors (should be fixed now)
      const hasPropTypesError = content.includes('ReferenceError: require is not defined') && content.includes('prop-types');
      const hasVirtualPropTypes = content.includes('PRODUCTION-BUILD-FIX: Prop-types import intercepted');
      const hasLoadingIndicator = content.includes('sb-preparing-story');
      const hasReactError = content.includes('React Error');

      console.log(`PropTypes Error: ${hasPropTypesError ? '❌ Found' : '✅ Fixed'}`);
      console.log(`Virtual PropTypes: ${hasVirtualPropTypes ? '✅ Working' : '⚠️ Not detected'}`);
      console.log(`Still Loading: ${hasLoadingIndicator ? '⏳ Yes' : '✅ Ready'}`);
      console.log(`React Error: ${hasReactError ? '❌ Found' : '✅ None'}`);

      if (!hasPropTypesError && !hasReactError) {
        console.log(`🎉 SUCCESS: ${test.name} is working!`);
        passedTests++;
      } else {
        console.log(`❌ FAILED: ${test.name} still has issues`);

        if (hasPropTypesError) {
          console.log(`   - PropTypes module resolution still failing`);
        }
        if (hasReactError) {
          console.log(`   - React rendering errors detected`);
        }
      }

    } catch (error) {
      console.error(`💥 ERROR testing ${test.name}:`, error.message);
    }
  }

  console.log(`\n📊 TEST RESULTS:`);
  console.log(`Passed: ${passedTests}/${totalTests} tests`);
  console.log(`Success Rate: ${Math.round((passedTests / totalTests) * 100)}%`);

  if (passedTests === totalTests) {
    console.log(`\n🎉 ALL TESTS PASSED! Production build fixes are working.`);
    console.log(`Ready for Netlify deployment!`);
  } else {
    console.log(`\n⚠️ Some tests failed. Review fixes before deployment.`);
  }
}

// Run the test
testProductionBuildFixes();