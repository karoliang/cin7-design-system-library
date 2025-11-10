#!/usr/bin/env node

/**
 * Simple Frame Test - Just fetch the HTML and see what's there
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

async function testFrameComponent() {
  const url = 'http://localhost:6011/iframe.html?id=examples-frame--default&args=&viewMode=story';

  console.log('🔍 Testing Frame Component HTML Content');
  console.log('=========================================');
  console.log(`📍 URL: ${url}`);

  try {
    const result = await fetchFrameHTML(url);

    if (result.statusCode !== 200) {
      console.error(`❌ HTTP Error: ${result.statusCode}`);
      return;
    }

    console.log(`✅ Response: ${result.statusCode}`);

    // Look for specific indicators in the HTML
    const content = result.content;

    console.log('\n🔍 ANALYZING HTML CONTENT:');
    console.log('-'.repeat(50));

    // Check for error indicators
    const hasNoPreview = content.includes('No Preview');
    const hasErrorText = content.includes('error') || content.includes('Error');
    const hasReactError = content.includes('React Error');
    const hasPropTypesError = content.includes('prop-types');
    const hasThemeError = content.includes('No theme was provided');

    console.log(`Has "No Preview": ${hasNoPreview}`);
    console.log(`Has Error Text: ${hasErrorText}`);
    console.log(`Has React Error: ${hasReactError}`);
    console.log(`Has PropTypes Error: ${hasPropTypesError}`);
    console.log(`Has Theme Error: ${hasThemeError}`);

    // Check for success indicators
    const hasStorybookRoot = content.includes('id="storybook-root"');
    const hasFrameComponent = content.includes('Polaris-Frame') || content.includes('data-polaris-frame');
    const hasTopBar = content.includes('Polaris-TopBar') || content.includes('data-polaris-top-bar');
    const hasNavigation = content.includes('Polaris-Navigation') || content.includes('data-polaris-navigation');

    console.log(`\n✅ SUCCESS INDICATORS:`);
    console.log(`Has Storybook Root: ${hasStorybookRoot}`);
    console.log(`Has Frame Component: ${hasFrameComponent}`);
    console.log(`Has TopBar: ${hasTopBar}`);
    console.log(`Has Navigation: ${hasNavigation}`);

    // Extract key sections
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    if (bodyMatch) {
      const bodyContent = bodyMatch[1];

      // Look for specific error messages
      const errorMatch = bodyContent.match(/<h2[^>]*>([\s\S]*?)<\/h2>/);
      if (errorMatch) {
        console.log(`\n❌ FOUND ERROR MESSAGE: ${errorMatch[1]}`);
      }

      // Look for "No Preview" text
      if (hasNoPreview) {
        const noPreviewMatch = bodyContent.match(/No Preview([\s\S]*?)(?=<|$)/);
        if (noPreviewMatch) {
          console.log(`\n⚠️ NO PREVIEW MESSAGE: ${noPreviewMatch[1].trim()}`);
        }
      }

      console.log(`\n📄 BODY CONTENT (first 1000 chars):`);
      console.log(bodyContent.substring(0, 1000));

      // Look for any script tags that might have errors
      const scriptMatches = bodyContent.match(/<script[^>]*>[\s\S]*?<\/script>/g) || [];
      console.log(`\n📜 FOUND ${scriptMatches.length} SCRIPT TAGS`);

      // Look for any style tags
      const styleMatches = bodyContent.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
      console.log(`🎨 FOUND ${styleMatches.length} STYLE TAGS`);
    }

    // Check content length
    console.log(`\n📊 CONTENT STATISTICS:`);
    console.log(`Total Content Length: ${content.length} characters`);
    console.log(`Body Content Length: ${bodyMatch ? bodyMatch[1].length : 0} characters`);

    // Look for any console.log or error messages in the content
    const consoleLogMatches = content.match(/console\.(log|error|warn|info)\([^)]*\)/g) || [];
    if (consoleLogMatches.length > 0) {
      console.log(`\n📝 FOUND ${consoleLogMatches.length} CONSOLE LOGS:`);
      consoleLogMatches.slice(0, 5).forEach(log => console.log(`   ${log}`));
    }

  } catch (error) {
    console.error(`💥 ERROR:`, error.message);
  }
}

// Run the test
testFrameComponent();