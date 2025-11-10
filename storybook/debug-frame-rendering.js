#!/usr/bin/env node

/**
 * Frame Component Rendering Debugger
 * Comprehensive debugging tool for Frame component rendering issues
 */

const http = require('http');
const https = require('https');

async function fetchHTML(url) {
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

async function debugFrameRendering(port) {
  const urls = [
    `http://localhost:${port}/iframe.html?id=components-navigation-frame--default&args=&viewMode=story`,
    `http://localhost:${port}/iframe.html?id=components-navigation-frame--with-top-bar&args=&viewMode=story`,
    `http://localhost:${port}/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story`,
    `http://localhost:${port}/iframe.html?id=examples-frame--default&args=&viewMode=story`
  ];

  console.log(`🔍 DEBUGGING FRAME COMPONENT RENDERING ON PORT ${port}`);
  console.log('='.repeat(60));

  for (const [index, url] of urls.entries()) {
    const componentName = url.match(/id=([^&]+)/)?.[1]?.replace(/--/g, ' ') || `Test ${index + 1}`;
    console.log(`\n🧪 Testing: ${componentName}`);
    console.log(`📍 URL: ${url}`);

    try {
      const result = await fetchHTML(url);

      if (result.statusCode !== 200) {
        console.log(`❌ HTTP Error: ${result.statusCode}`);
        continue;
      }

      const content = result.content;

      // Check for common issues
      const hasErrorBoundary = content.includes('Error Boundary');
      const hasReactError = content.includes('React Error') || content.includes('Minified React error');
      const hasPropTypesError = content.includes('ReferenceError: require is not defined') && content.includes('prop-types');
      const hasTypeError = content.includes('TypeError:');
      const hasLoadingError = content.includes('Error loading story') || content.includes('Story loading error');
      const hasNoPreview = content.includes('No Preview') || content.includes('no-preview');
      const hasStoryContent = content.includes('Polaris-Frame') || content.includes('Frame Content') || content.includes('Minimal Frame Test');

      // Look for specific error patterns
      const errorMatch = content.match(/<pre[^>]*>([\s\S]*?)<\/pre>/)?.[1];
      const consoleErrorMatch = content.match(/console\.error\(([^)]+)\)/);
      const reactErrorMatch = content.match(/"message":"([^"]+)"/);

      console.log(`Status: ${result.statusCode}`);
      console.log(`Error Boundary: ${hasErrorBoundary ? '❌ Found' : '✅ None'}`);
      console.log(`React Error: ${hasReactError ? '❌ Found' : '✅ None'}`);
      console.log(`PropTypes Error: ${hasPropTypesError ? '❌ Found' : '✅ Fixed'}`);
      console.log(`Type Error: ${hasTypeError ? '❌ Found' : '✅ None'}`);
      console.log(`Loading Error: ${hasLoadingError ? '❌ Found' : '✅ None'}`);
      console.log(`No Preview: ${hasNoPreview ? '❌ Found' : '✅ None'}`);
      console.log(`Story Content: ${hasStoryContent ? '✅ Found' : '❌ Missing'}`);

      if (errorMatch) {
        console.log(`\n🚨 ERROR DETECTED:`);
        console.log(errorMatch.trim());
      }

      if (reactErrorMatch) {
        console.log(`\n🚨 REACT ERROR:`);
        console.log(reactErrorMatch[1]);
      }

      if (consoleErrorMatch) {
        console.log(`\n🚨 CONSOLE ERROR:`);
        console.log(consoleErrorMatch[1]);
      }

      // Extract body content for analysis
      const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
      if (bodyMatch) {
        const bodyContent = bodyMatch[1];

        // Look for specific Frame component indicators
        const hasFrameClass = bodyContent.includes('class="Frame') || bodyContent.includes('Polaris-Frame');
        const hasTopBar = bodyContent.includes('Polaris-TopBar') || bodyContent.includes('TopBar');
        const hasNavigation = bodyContent.includes('Polaris-Navigation') || bodyContent.includes('Navigation');

        console.log(`\n📋 COMPONENT ANALYSIS:`);
        console.log(`Frame Component: ${hasFrameClass ? '✅ Found' : '❌ Missing'}`);
        console.log(`TopBar: ${hasTopBar ? '✅ Found' : '❌ Missing'}`);
        console.log(`Navigation: ${hasNavigation ? '✅ Found' : '❌ Missing'}`);

        if (!hasStoryContent && !hasErrorBoundary) {
          console.log(`\n🔍 Body content analysis (first 500 chars):`);
          console.log(bodyContent.substring(0, 500));
        }
      }

      // Summary
      const isWorking = hasStoryContent && !hasReactError && !hasPropTypesError && !hasTypeError;
      console.log(`\n${isWorking ? '✅ WORKING' : '❌ BROKEN'}: ${componentName}`);

    } catch (error) {
      console.error(`💥 NETWORK ERROR:`, error.message);
    }
  }
}

async function testMultiplePorts() {
  const ports = [6006, 6011, 6007, 6008];

  for (const port of ports) {
    console.log(`\n🌐 Testing port ${port}...`);
    try {
      const response = await fetchHTML(`http://localhost:${port}`);
      if (response.statusCode === 200) {
        console.log(`✅ Port ${port} is active - running Frame debugging`);
        await debugFrameRendering(port);
        return;
      }
    } catch (error) {
      console.log(`❌ Port ${port} is not active`);
    }
  }

  console.log(`\n❌ No active Storybook server found on ports ${ports.join(', ')}`);
}

// Run the debugging
testMultiplePorts();