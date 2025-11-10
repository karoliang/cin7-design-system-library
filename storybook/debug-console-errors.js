#!/usr/bin/env node

/**
 * Console Error Debugger for Frame Components
 * Extracts and analyzes JavaScript errors preventing story rendering
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

async function extractConsoleErrors(url) {
  console.log(`🔍 EXTRACTING CONSOLE ERRORS FROM: ${url}`);

  try {
    const result = await fetchHTML(url);

    if (result.statusCode !== 200) {
      console.log(`❌ HTTP Error: ${result.statusCode}`);
      return;
    }

    const content = result.content;

    // Look for error patterns in the HTML
    const errorPatterns = [
      /<script[^>]*>([\s\S]*?)<\/script>/g,  // Script tags
      /console\.error\(([^)]+)\)/g,          // Console errors
      /console\.warn\(([^)]+)\)/g,           // Console warnings
      /throw new Error\("([^"]+)"\)/g,       // Thrown errors
      /Error:\s*([^<\n]+)/gi,                // Error messages
      /<pre[^>]*>([\s\S]*?)<\/pre>/g,        // Error stacks
      /"message":"([^"]+)"/g,                // React error messages
    ];

    console.log('\n🚨 ERROR ANALYSIS:');
    console.log('='.repeat(50));

    let foundErrors = false;

    // Extract script contents
    const scriptMatches = content.match(/<script[^>]*>([\s\S]*?)<\/script>/g) || [];
    console.log(`Found ${scriptMatches.length} script tags`);

    for (let i = 0; i < scriptMatches.length; i++) {
      const script = scriptMatches[i];
      console.log(`\n📜 SCRIPT ${i + 1}:`);

      // Look for template literal errors
      if (script.includes('`${') && script.includes('docs.map')) {
        console.log('❌ FOUND TEMPLATE LITERAL ERROR:');
        console.log('Pattern: `${message}\\n${docs.map((doc...');

        // Extract the problematic section
        const templateMatch = script.match(/(`[^`]*docs\.map[^`]*`)/);
        if (templateMatch) {
          console.log('Problematic template literal:');
          console.log(templateMatch[1]);
          foundErrors = true;
        }
      }

      // Look for other error patterns
      if (script.includes('ReferenceError')) {
        console.log('❌ FOUND REFERENCE ERROR');
        foundErrors = true;
      }

      if (script.includes('TypeError')) {
        console.log('❌ FOUND TYPE ERROR');
        foundErrors = true;
      }

      if (script.includes('prop-types')) {
        console.log('⚠️ FOUND PROP-TYPES REFERENCE');
      }
    }

    // Look for React error boundaries
    const reactErrorMatch = content.match(/<script[^>]*id="error-stack"[^>]*>([\s\S]*?)<\/script>/);
    if (reactErrorMatch) {
      console.log('\n🚨 REACT ERROR BOUNDARY:');
      console.log(reactErrorMatch[1]);
      foundErrors = true;
    }

    // Look for error messages in HTML
    const errorMessageMatch = content.match(/<div[^>]*class="[^"]*error[^"]*"[^>]*>([\s\S]*?)<\/div>/);
    if (errorMessageMatch) {
      console.log('\n🚨 HTML ERROR MESSAGE:');
      console.log(errorMessageMatch[1]);
      foundErrors = true;
    }

    // Look for any console.log statements that might help
    const consoleLogMatches = content.match(/console\.log\(([^)]+)\)/g) || [];
    if (consoleLogMatches.length > 0) {
      console.log(`\n📝 FOUND ${consoleLogMatches.length} CONSOLE LOGS:`);
      consoleLogMatches.slice(0, 5).forEach(log => console.log(`   ${log}`));
    }

    if (!foundErrors) {
      console.log('\n✅ No obvious JavaScript errors found in HTML');
      console.log('The issue might be in the JavaScript execution phase');
    }

    // Check for Storybook-specific issues
    const hasPreparingStory = content.includes('sb-preparing-story');
    const hasStorybookRoot = content.includes('id="storybook-root"');
    const hasNoPreview = content.includes('No Preview');

    console.log('\n📋 STORYBOOK STATUS:');
    console.log(`Preparing Story: ${hasPreparingStory ? '⏳ Yes' : '✅ No'}`);
    console.log(`Storybook Root: ${hasStorybookRoot ? '✅ Found' : '❌ Missing'}`);
    console.log(`No Preview: ${hasNoPreview ? '❌ Yes' : '✅ No'}`);

    if (hasPreparingStory && !hasStorybookRoot) {
      console.log('\n🔍 DIAGNOSIS: Story is stuck in preparation phase');
      console.log('This usually indicates a JavaScript error during story initialization');
    }

  } catch (error) {
    console.error(`💥 ERROR:`, error.message);
  }
}

async function debugFrameErrors() {
  const port = 6006; // Use the active Storybook port
  const urls = [
    `http://localhost:${port}/iframe.html?id=components-navigation-frame--default&args=&viewMode=story`,
    `http://localhost:${port}/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story`
  ];

  for (const url of urls) {
    await extractConsoleErrors(url);
    console.log('\n' + '='.repeat(60) + '\n');
  }
}

// Run the debugging
debugFrameErrors();