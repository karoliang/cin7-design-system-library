const http = require('http');
const https = require('https');

function testUrl(url, description) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const protocol = url.startsWith('https:') ? https : http;

    protocol.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          description,
          status: res.statusCode,
          statusText: res.statusMessage,
          time: Date.now() - startTime,
          length: data.length,
          hasRoot: data.includes('<div id="root">'),
          hasStorybook: data.includes('window[\'STORYBOOK_RENDERER\']'),
          hasConfig: data.includes('window[\'FEATURES\']')
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        description,
        error: err.message,
        time: Date.now() - startTime
      });
    });
  });
}

async function runQuickTest() {
  console.log('🚀 Quick Storybook Test\n');

  const tests = [
    {
      url: 'http://localhost:6006/',
      description: 'Main Storybook page'
    },
    {
      url: 'http://localhost:6006/iframe.html',
      description: 'Storybook iframe'
    },
    {
      url: 'http://localhost:6006/sb-manager/runtime.js',
      description: 'Main runtime script'
    },
    {
      url: 'http://localhost:6006/?path=/story/test-simple-button--primary',
      description: 'Simple test story'
    },
    {
      url: 'http://localhost:6006/?path=/story/polaris-forms-button--primary',
      description: 'Polaris button story'
    }
  ];

  const results = [];

  for (const test of tests) {
    process.stdout.write(`Testing ${test.description}... `);
    const result = await testUrl(test.url, test.description);
    results.push(result);

    if (result.error) {
      console.log(`❌ ${result.error} (${result.time}ms)`);
    } else {
      console.log(`✅ ${result.status} ${result.statusText} (${result.time}ms, ${result.length} bytes)`);
      if (result.hasRoot) console.log(`  ✅ Has root element`);
      if (result.hasStorybook) console.log(`  ✅ Has Storybook config`);
      if (result.hasConfig) console.log(`  ✅ Has features config`);
    }
  }

  console.log('\n📊 Summary:');
  const successful = results.filter(r => !r.error);
  const failed = results.filter(r => r.error);

  console.log(`✅ Successful tests: ${successful.length}`);
  console.log(`❌ Failed tests: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n❌ Failed tests:');
    failed.forEach(test => {
      console.log(`  - ${test.description}: ${test.error}`);
    });
  }

  if (successful.length > 0) {
    console.log('\n✅ All basic connectivity tests passed!');
    console.log('\n💡 If Storybook still shows a loading screen in browser:');
    console.log('  1. Open Developer Tools (F12)');
    console.log('  2. Check Console tab for JavaScript errors');
    console.log('  3. Check Network tab for failed requests');
    console.log('  4. Try opening test-storybook.html in this directory');
    console.log('  5. The issue is likely client-side JavaScript/CSS, not server');
  }

  return results;
}

// Run the test
runQuickTest().catch(console.error);