const http = require('http');
const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

async function performComprehensiveAnalysis() {
  console.log('🔍 Starting comprehensive Storybook analysis without browser automation...\n');

  const results = {
    timestamp: new Date().toISOString(),
    tests: {}
  };

  // Test 1: Basic HTTP connectivity
  console.log('📡 Test 1: Basic HTTP connectivity');
  try {
    const response = await fetch('http://localhost:6006/');
    results.tests.httpConnectivity = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      success: response.ok
    };
    console.log(`✅ HTTP Status: ${response.status} ${response.statusText}`);
  } catch (error) {
    results.tests.httpConnectivity = {
      success: false,
      error: error.message
    };
    console.log(`❌ HTTP connectivity failed: ${error.message}`);
  }

  // Test 2: Check JavaScript files are accessible
  console.log('\n📜 Test 2: JavaScript file accessibility');
  const jsFiles = [
    '/sb-manager/runtime.js',
    '/sb-manager/globals-runtime.js',
    '/sb-addons/storybook-core-core-server-presets-0/common-manager-bundle.js'
  ];

  results.tests.jsFiles = {};
  for (const jsFile of jsFiles) {
    try {
      const response = await fetch(`http://localhost:6006${jsFile}`);
      results.tests.jsFiles[jsFile] = {
        status: response.status,
        success: response.ok,
        contentLength: response.headers.get('content-length')
      };
      console.log(`✅ ${jsFile}: ${response.status} (${response.headers.get('content-length')} bytes)`);
    } catch (error) {
      results.tests.jsFiles[jsFile] = {
        success: false,
        error: error.message
      };
      console.log(`❌ ${jsFile}: ${error.message}`);
    }
  }

  // Test 3: Get full HTML content
  console.log('\n📄 Test 3: HTML content analysis');
  try {
    const response = await fetch('http://localhost:6006/');
    const html = await response.text();

    results.tests.htmlContent = {
      length: html.length,
      hasRoot: html.includes('<div id="root">'),
      hasStorybookConfig: html.includes('window[\'FEATURES\']'),
      hasStorybookScripts: html.includes('sb-manager/runtime.js'),
      hasReactRenderer: html.includes('window[\'STORYBOOK_RENDERER\'] = "react"'),
      bodyClasses: html.match(/<body[^>]*class="([^"]*)"/)?.[1] || '',
      scripts: (html.match(/<script[^>]*>.*?<\/script>/gs) || []).length
    };

    console.log(`✅ HTML length: ${html.length} characters`);
    console.log(`✅ Has root div: ${results.tests.htmlContent.hasRoot}`);
    console.log(`✅ Has Storybook config: ${results.tests.htmlContent.hasStorybookConfig}`);
    console.log(`✅ Has Storybook scripts: ${results.tests.htmlContent.hasStorybookScripts}`);
    console.log(`✅ Has React renderer: ${results.tests.htmlContent.hasReactRenderer}`);
    console.log(`✅ Script tags found: ${results.tests.htmlContent.scripts}`);
    console.log(`✅ Body classes: ${results.tests.htmlContent.bodyClasses}`);

    // Save HTML content for inspection
    fs.writeFileSync('storybook-html-content.html', html);
    console.log('✅ HTML content saved to storybook-html-content.html');

  } catch (error) {
    results.tests.htmlContent = {
      success: false,
      error: error.message
    };
    console.log(`❌ HTML content analysis failed: ${error.message}`);
  }

  // Test 4: Check if iframe preview endpoint works
  console.log('\n🖼️ Test 4: iframe preview endpoint');
  try {
    const response = await fetch('http://localhost:6006/iframe.html');
    results.tests.iframeEndpoint = {
      status: response.status,
      success: response.ok,
      contentLength: response.headers.get('content-length')
    };
    console.log(`✅ iframe.html status: ${response.status} (${response.headers.get('content-length')} bytes)`);
  } catch (error) {
    results.tests.iframeEndpoint = {
      success: false,
      error: error.message
    };
    console.log(`❌ iframe endpoint test failed: ${error.message}`);
  }

  // Test 5: Check for specific story endpoints
  console.log('\n📖 Test 5: Story endpoint testing');
  const storyUrls = [
    'http://localhost:6006/?path=/story/polaris-components-button--primary',
    'http://localhost:6006/?path=/story/foundation-components-design-tokens--color-palette'
  ];

  results.tests.storyEndpoints = {};
  for (const storyUrl of storyUrls) {
    try {
      const response = await fetch(storyUrl);
      const html = await response.text();

      results.tests.storyEndpoints[storyUrl] = {
        status: response.status,
        success: response.ok,
        hasRoot: html.includes('<div id="root">'),
        hasStorybookConfig: html.includes('window[\'FEATURES\']'),
        length: html.length
      };

      console.log(`✅ ${storyUrl.split('/').pop()}: ${response.status} (${html.length} chars)`);
    } catch (error) {
      results.tests.storyEndpoints[storyUrl] = {
        success: false,
        error: error.message
      };
      console.log(`❌ ${storyUrl.split('/').pop()}: ${error.message}`);
    }
  }

  // Test 6: Analyze Storybook process and logs
  console.log('\n📋 Test 6: Storybook process analysis');
  try {
    const { stdout, stderr } = execSync('ps aux | grep storybook | grep -v grep', { encoding: 'utf8' });
    results.tests.processAnalysis = {
      running: true,
      processes: stdout.trim().split('\n'),
      processCount: stdout.trim().split('\n').length
    };
    console.log(`✅ Storybook processes running: ${results.tests.processAnalysis.processCount}`);
  } catch (error) {
    results.tests.processAnalysis = {
      running: false,
      error: error.message
    };
    console.log('❌ No Storybook processes found');
  }

  // Test 7: Check for Storybook debug logs
  console.log('\n📝 Test 7: Debug log analysis');
  try {
    if (fs.existsSync('storybook-debug.log')) {
      const logContent = fs.readFileSync('storybook-debug.log', 'utf8');
      const lines = logContent.split('\n').slice(-50); // Last 50 lines

      results.tests.debugLogs = {
        exists: true,
        recentLines: lines,
        hasErrors: logContent.toLowerCase().includes('error'),
        hasWarnings: logContent.toLowerCase().includes('warn'),
        hasSuccess: logContent.toLowerCase().includes('server listening') || logContent.toLowerCase().includes('started')
      };

      console.log(`✅ Debug log exists (${lines.length} recent lines)`);
      console.log(`✅ Has errors: ${results.tests.debugLogs.hasErrors}`);
      console.log(`✅ Has warnings: ${results.tests.debugLogs.hasWarnings}`);
      console.log(`✅ Server started: ${results.tests.debugLogs.hasSuccess}`);
    } else {
      results.tests.debugLogs = {
        exists: false
      };
      console.log('⚠️ No debug log file found');
    }
  } catch (error) {
    results.tests.debugLogs = {
      exists: false,
      error: error.message
    };
    console.log(`❌ Debug log analysis failed: ${error.message}`);
  }

  // Test 8: Network-level testing
  console.log('\n🌐 Test 8: Network-level analysis');
  try {
    // Use netstat to check if port 6006 is listening
    const { stdout } = execSync('netstat -an | grep 6006', { encoding: 'utf8' });
    results.tests.networkAnalysis = {
      port6006Listening: stdout.includes('LISTEN'),
      netstatOutput: stdout.trim()
    };
    console.log(`✅ Port 6006 listening: ${results.tests.networkAnalysis.port6006Listening}`);
  } catch (error) {
    results.tests.networkAnalysis = {
      port6006Listening: false,
      error: error.message
    };
    console.log('❌ Network analysis failed - port may not be listening');
  }

  // Test 9: Check Storybook configuration files
  console.log('\n⚙️ Test 9: Configuration file analysis');
  const configFiles = [
    '.storybook/main.ts',
    '.storybook/preview.ts',
    'package.json'
  ];

  results.tests.configFiles = {};
  for (const configFile of configFiles) {
    try {
      if (fs.existsSync(configFile)) {
        const content = fs.readFileSync(configFile, 'utf8');
        results.tests.configFiles[configFile] = {
          exists: true,
          size: content.length,
          hasReact: content.includes('react') || content.includes('@storybook/react-vite'),
          hasVite: content.includes('vite') || content.includes('@storybook/builder-vite'),
          hasStories: content.includes('stories') || content.includes('*.stories.')
        };
        console.log(`✅ ${configFile}: exists (${content.length} chars)`);
      } else {
        results.tests.configFiles[configFile] = {
          exists: false
        };
        console.log(`❌ ${configFile}: not found`);
      }
    } catch (error) {
      results.tests.configFiles[configFile] = {
        exists: false,
        error: error.message
      };
      console.log(`❌ ${configFile}: ${error.message}`);
    }
  }

  // Generate diagnosis
  console.log('\n🎯 DIAGNOSIS:');

  const issues = [];
  const suggestions = [];

  if (!results.tests.httpConnectivity?.success) {
    issues.push('Storybook server not responding on port 6006');
    suggestions.push('Check if Storybook is running with `pnpm storybook dev`');
  }

  if (results.tests.htmlContent?.hasRoot && !results.tests.htmlContent?.hasStorybookScripts) {
    issues.push('HTML has root element but missing Storybook scripts');
    suggestions.push('Check Storybook build configuration and dependencies');
  }

  if (results.tests.jsFiles && Object.values(results.tests.jsFiles).some(file => !file.success)) {
    issues.push('Some JavaScript files are not accessible');
    suggestions.push('Check Storybook build output and static file serving');
  }

  if (results.tests.debugLogs?.hasErrors) {
    issues.push('Debug logs contain errors');
    suggestions.push('Review storybook-debug.log for specific error details');
  }

  if (!results.tests.networkAnalysis?.port6006Listening) {
    issues.push('Port 6006 is not listening');
    suggestions.push('Restart Storybook server or check for port conflicts');
  }

  if (issues.length === 0) {
    console.log('✅ No obvious server-side issues detected');
    console.log('🔍 The issue is likely client-side (JavaScript execution, CSS, or React mounting)');
    suggestions.push('The problem is likely in browser JavaScript execution - try opening in browser with dev tools');
    suggestions.push('Check for JavaScript errors, CSS loading issues, or React component mounting problems');
  } else {
    console.log('❌ Issues found:');
    issues.forEach(issue => console.log(`  - ${issue}`));
  }

  if (suggestions.length > 0) {
    console.log('\n💡 Suggestions:');
    suggestions.forEach(suggestion => console.log(`  - ${suggestion}`));
  }

  // Save comprehensive report
  results.diagnosis = {
    issues,
    suggestions,
    summary: issues.length === 0 ? 'Server appears healthy - issue is likely client-side' : 'Server-side issues detected'
  };

  fs.writeFileSync('comprehensive-analysis-report.json', JSON.stringify(results, null, 2));
  console.log('\n📋 Comprehensive analysis report saved to: comprehensive-analysis-report.json');

  return results;
}

// Run the analysis
performComprehensiveAnalysis().catch(console.error);