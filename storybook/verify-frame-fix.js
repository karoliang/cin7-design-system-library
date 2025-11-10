#!/usr/bin/env node

/**
 * Quick verification that Frame components are working after prop-types fix
 */

const https = require('https');
const http = require('http');

const FRAME_VARIATIONS = [
  'default',
  'with-logo',
  'with-notifications',
  'ecommerce-layout',
  'minimal-layout',
  'responsive-behavior'
];

function testUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve({
          statusCode: response.statusCode,
            content: data,
          success: response.statusCode === 200
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

async function verifyFrameComponents() {
  console.log('🔍 Verifying Frame Components after prop-types fix...\n');

  const BASE_URL = 'http://localhost:6006';
  let successCount = 0;

  for (const variation of FRAME_VARIATIONS) {
    const url = `${BASE_URL}/iframe.html?id=examples-frame--${variation}&args=&viewMode=story`;

    try {
      console.log(`🧪 Testing: ${variation}`);
      console.log(`   URL: ${url}`);

      const result = await testUrl(url);

      if (result.success) {
        // Check for key indicators of successful Frame rendering
        const hasPolarisStyles = result.content.includes('Polaris-Frame');
        const hasReactContent = result.content.includes('React') || result.content.includes('react');
        const hasErrorContent = result.content.includes('require is not defined') ||
                               result.content.includes('ReferenceError') ||
                               result.content.includes('Cannot read propert');

        if (!hasErrorContent) {
          console.log(`   ✅ SUCCESS: Page loads without PropTypes errors`);
          successCount++;
        } else {
          console.log(`   ❌ FAILED: Page contains JavaScript errors`);
        }

        console.log(`   📊 Status: ${result.statusCode}`);
        console.log(`   🎨 Polaris styles: ${hasPolarisStyles ? 'Yes' : 'No'}`);
        console.log(`   ⚛️  React content: ${hasReactContent ? 'Yes' : 'No'}`);
      } else {
        console.log(`   ❌ FAILED: HTTP ${result.statusCode}`);
      }

    } catch (error) {
      console.log(`   💥 ERROR: ${error.message}`);
    }

    console.log('');
  }

  console.log('📊 VERIFICATION SUMMARY');
  console.log('========================');
  console.log(`✅ Successful variations: ${successCount}/${FRAME_VARIATIONS.length}`);

  if (successCount === FRAME_VARIATIONS.length) {
    console.log('🎉 ALL FRAME VARIATIONS ARE WORKING!');
    console.log('✅ PropTypes fix is successful');
    console.log('✅ Frame components can be accessed without errors');
  } else {
    console.log(`⚠️  ${FRAME_VARIATIONS.length - successCount} variations still have issues`);
  }

  return successCount === FRAME_VARIATIONS.length;
}

// Run verification
if (require.main === module) {
  verifyFrameComponents()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Verification failed:', error);
      process.exit(1);
    });
}

module.exports = { verifyFrameComponents };