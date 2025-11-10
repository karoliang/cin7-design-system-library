#!/usr/bin/env node

/**
 * Test React Exposure in Window Object
 * Checks if React and ReactDOM are properly exposed globally
 */

const http = require('http');

async function testReactExposure() {
  const testUrl = 'http://localhost:6012/iframe.html?id=components-navigation-frame--default&args=&viewMode=story';

  return new Promise((resolve, reject) => {
    const req = http.get(testUrl, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log('🔍 Testing React Window Object Exposure');
        console.log('=====================================');
        console.log(`📊 Response Status: ${res.statusCode}`);
        console.log(`📄 Content Length: ${data.length} bytes`);

        // Check for React exposure indicators in the HTML
        const reactExposureChecks = [
          { pattern: 'window.React = React', name: 'React assignment' },
          { pattern: 'window.ReactDOM = ReactDOM', name: 'ReactDOM assignment' },
          { pattern: 'React Global Exposure', name: 'React exposure comment' },
          { pattern: 'Early React exposure', name: 'Early React exposure' },
          { pattern: 'React and ReactDOM exposed to window object', name: 'React exposure log' }
        ];

        console.log('\n🔧 React Exposure Checks:');
        let exposureFound = false;
        reactExposureChecks.forEach(check => {
          if (data.includes(check.pattern)) {
            console.log(`  ✅ ${check.name}: Found`);
            exposureFound = true;
          } else {
            console.log(`  ❌ ${check.name}: Missing`);
          }
        });

        // Check for React window object usage patterns
        const windowReactChecks = [
          { pattern: 'typeof window.React', name: 'window.React type check' },
          { pattern: 'window.React !== \'undefined\'', name: 'window.React existence check' },
          { pattern: 'typeof window.ReactDOM', name: 'window.ReactDOM type check' },
          { pattern: 'window.ReactDOM !== \'undefined\'', name: 'window.ReactDOM existence check' }
        ];

        console.log('\n🔍 Window React Object Checks:');
        windowReactChecks.forEach(check => {
          if (data.includes(check.pattern)) {
            console.log(`  ✅ ${check.name}: Found`);
          } else {
            console.log(`  ❌ ${check.name}: Missing`);
          }
        });

        // Check for Storybook API patterns
        const storybookChecks = [
          { pattern: '__STORYBOOK_CLIENT_API__', name: 'Storybook client API' },
          { pattern: 'window.__STORYBOOK_CLIENT_API__', name: 'Window Storybook API' },
          { pattern: 'storyStore', name: 'Storybook store' },
          { pattern: 'addDecorator', name: 'Storybook decorator' }
        ];

        console.log('\n📖 Storybook API Checks:');
        storybookChecks.forEach(check => {
          if (data.includes(check.pattern)) {
            console.log(`  ✅ ${check.name}: Found`);
          } else {
            console.log(`  ❌ ${check.name}: Missing`);
          }
        });

        // Check for error indicators
        const errorChecks = [
          { pattern: 'sb-errordisplay', name: 'Error display active' },
          { pattern: 'sb-preparing-story', name: 'Preparing story state' },
          { pattern: 'Cannot read propert', name: 'Cannot read property error' },
          { pattern: 'ReferenceError', name: 'Reference error' },
          { pattern: 'TypeError', name: 'Type error' }
        ];

        console.log('\n⚠️ Error State Checks:');
        errorChecks.forEach(check => {
          if (data.includes(check.pattern)) {
            console.log(`  ❌ ${check.name}: Detected`);
          } else {
            console.log(`  ✅ ${check.name}: Not detected`);
          }
        });

        // Final assessment
        console.log('\n🎯 EXPOSURE ASSESSMENT:');
        console.log('=======================');

        if (exposureFound) {
          console.log('✅ React exposure code is present in the page');
        } else {
          console.log('❌ React exposure code is NOT present in the page');
        }

        if (data.includes('__STORYBOOK_CLIENT_API__')) {
          console.log('✅ Storybook client API references found');
        } else {
          console.log('❌ Storybook client API references missing');
        }

        if (data.includes('sb-errordisplay')) {
          console.log('❌ Error display is still active');
        } else {
          console.log('✅ No error display detected');
        }

        resolve({
          status: res.statusCode,
          contentLength: data.length,
          reactExposureFound: exposureFound,
          hasStorybookAPI: data.includes('__STORYBOOK_CLIENT_API__'),
          hasErrorDisplay: data.includes('sb-errordisplay'),
          hasPreparingState: data.includes('sb-preparing-story')
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Run the test
testReactExposure().then(result => {
  console.log('\n📋 SUMMARY:');
  console.log('===========');
  console.log(`React Exposure: ${result.reactExposureFound ? '✅ Present' : '❌ Missing'}`);
  console.log(`Storybook API: ${result.hasStorybookAPI ? '✅ Found' : '❌ Missing'}`);
  console.log(`Error State: ${result.hasErrorDisplay ? '❌ Active' : '✅ Clear'}`);
  console.log(`Preparing: ${result.hasPreparingState ? '⏳ Active' : '✅ Ready'}`);
}).catch(console.error);