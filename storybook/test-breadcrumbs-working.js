#!/usr/bin/env node

/**
 * Test if Breadcrumbs are working as mentioned by the user
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

async function testBreadcrumbs() {
  const url = 'http://localhost:6011/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story';

  console.log('🧪 TESTING BREADCRUMBS COMPONENT');
  console.log('==================================');
  console.log(`📍 URL: ${url}`);

  try {
    const result = await fetchHTML(url);

    if (result.statusCode !== 200) {
      console.error(`❌ HTTP Error: ${result.statusCode}`);
      return;
    }

    console.log(`✅ Response: ${result.statusCode}`);

    const content = result.content;

    console.log('\n🔍 ANALYZING CONTENT:');
    console.log('-'.repeat(50));

    // Check for loading indicators
    const hasLoader = content.includes('sb-preparing-story');
    const hasLoadingText = content.includes('Preparing story');

    console.log(`Has Loading Indicator: ${hasLoader}`);
    console.log(`Has Loading Text: ${hasLoadingText}`);

    // Check for success indicators
    const hasBreadcrumbContent = content.includes('breadcrumb') || content.includes('Breadcrumb');
    const hasNavigation = content.includes('navigation') || content.includes('Navigation');
    const hasPolaris = content.includes('Polaris-');

    console.log(`\n✅ SUCCESS INDICATORS:`);
    console.log(`Has Breadcrumb Content: ${hasBreadcrumbContent}`);
    console.log(`Has Navigation: ${hasNavigation}`);
    console.log(`Has Polaris Components: ${hasPolaris}`);

    // Extract body content
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
      const bodyContent = bodyMatch[1];

      if (hasLoader) {
        console.log(`\n⏳ BREADCRUMBS ARE STILL LOADING...`);
        console.log(`This means the story is stuck in the preparation phase.`);
      } else {
        console.log(`\n🎉 BREADCRUMBS ARE RENDERING!`);
        console.log(`Body content (first 500 chars):`);
        console.log(bodyContent.substring(0, 500));
      }
    }

  } catch (error) {
    console.error(`💥 ERROR:`, error.message);
  }
}

// Run the test
testBreadcrumbs();