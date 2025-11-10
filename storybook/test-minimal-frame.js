#!/usr/bin/env node

/**
 * Test Minimal Frame Story
 */

const http = require('http');
const https = require('https');

async function fetchFrameHTML(url) {
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

async function testMinimalFrame() {
  const url = 'http://localhost:6011/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story';

  console.log('🧪 TESTING MINIMAL FRAME STORY');
  console.log('===============================');
  console.log(`📍 URL: ${url}`);

  try {
    const result = await fetchFrameHTML(url);

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
    const hasMinimalTest = content.includes('Minimal Frame Test');
    const hasFrameContent = content.includes('Frame Content');
    const hasFrameComponent = content.includes('Polaris-Frame');

    console.log(`\n✅ SUCCESS INDICATORS:`);
    console.log(`Has "Minimal Frame Test": ${hasMinimalTest}`);
    console.log(`Has "Frame Content": ${hasFrameContent}`);
    console.log(`Has Frame Component: ${hasFrameComponent}`);

    // Extract body content
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
      const bodyContent = bodyMatch[1];

      if (hasLoader) {
        console.log(`\n⏳ STORY IS STILL LOADING...`);
        console.log(`This means the story is stuck in the preparation phase.`);
      } else if (hasMinimalTest) {
        console.log(`\n🎉 SUCCESS! Minimal story is rendering!`);
      } else {
        console.log(`\n❌ STORY IS NOT RENDERING...`);
        console.log(`Body content (first 500 chars):`);
        console.log(bodyContent.substring(0, 500));
      }
    }

  } catch (error) {
    console.error(`💥 ERROR:`, error.message);
  }
}

// Run the test
testMinimalFrame();