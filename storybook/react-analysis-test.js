#!/usr/bin/env node

/**
 * React Component Pipeline Analysis - HTTP Based
 * Tests React component initialization without Puppeteer complexity
 */

const http = require('http');
const https = require('https');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

async function fetchPageContent(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          content: data
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

function analyzeReactState(htmlContent, componentType) {
  const analysis = {
    hasReact: false,
    hasReactDOM: false,
    hasStorybookAPI: false,
    hasStorybookRoot: false,
    hasErrorDisplay: false,
    hasPreparingStory: false,
    hasViteApp: false,
    hasReactRefresh: false,
    componentElements: 0,
    errorElements: 0,
    preparingElements: 0,
    scriptTags: 0,
    inlineScripts: 0,
    errorMessages: [],
    warnings: [],
    reactInitialization: 'unknown'
  };

  // Check for React/Storybook indicators
  if (htmlContent.includes('window.React')) analysis.hasReact = true;
  if (htmlContent.includes('window.ReactDOM')) analysis.hasReactDOM = true;
  if (htmlContent.includes('__STORYBOOK_CLIENT_API__')) analysis.hasStorybookAPI = true;
  if (htmlContent.includes('id="storybook-root"')) analysis.hasStorybookRoot = true;
  if (htmlContent.includes('sb-errordisplay')) analysis.hasErrorDisplay = true;
  if (htmlContent.includes('sb-preparing-story')) analysis.hasPreparingStory = true;
  if (htmlContent.includes('vite-app.js')) analysis.hasViteApp = true;
  if (htmlContent.includes('@react-refresh')) analysis.hasReactRefresh = true;

  // Count elements
  analysis.scriptTags = (htmlContent.match(/<script/gi) || []).length;
  analysis.inlineScripts = (htmlContent.match(/<script[^>]*>/gi) || []).length;
  analysis.errorElements = (htmlContent.match(/error/gi) || []).length;
  analysis.preparingElements = (htmlContent.match(/preparing/gi) || []).length;

  // Component-specific element detection
  if (componentType === 'frame') {
    analysis.componentElements = (htmlContent.match(/frame/gi) || []).length;
  } else if (componentType === 'breadcrumbs') {
    analysis.componentElements = (htmlContent.match(/breadcrumbs/gi) || []).length;
  }

  // Analyze React initialization state
  if (analysis.hasViteApp && analysis.hasReactRefresh) {
    if (analysis.hasPreparingStory && !analysis.hasErrorDisplay) {
      analysis.reactInitialization = 'stuck_in_preparing';
    } else if (analysis.hasErrorDisplay) {
      analysis.reactInitialization = 'error_during_init';
    } else if (analysis.hasStorybookRoot && !analysis.hasPreparingStory) {
      analysis.reactInitialization = 'successful';
    } else {
      analysis.reactInitialization = 'unknown_state';
    }
  } else {
    analysis.reactInitialization = 'modules_not_loaded';
  }

  // Extract potential error messages
  const errorMatches = htmlContent.match(/class="[^"]*error[^"]*"[^>]*>([^<]*)/gi);
  if (errorMatches) {
    analysis.errorMessages = errorMatches.map(match =>
      match.replace(/[^>]*>/, '').trim()
    ).filter(msg => msg.length > 0);
  }

  // Look for console error patterns
  const consoleErrorPatterns = [
    /Cannot read propert(y|ies) of null/gi,
    /ReferenceError:/gi,
    /TypeError:/gi,
    /undefined is not/gi,
    /require is not defined/gi
  ];

  consoleErrorPatterns.forEach(pattern => {
    const matches = htmlContent.match(pattern);
    if (matches) {
      analysis.errorMessages.push(...matches);
    }
  });

  return analysis;
}

async function testReactPipeline() {
  const results = {
    timestamp: new Date().toISOString(),
    components: {
      frame: { url: '', status: 0, analysis: null },
      breadcrumbs: { url: '', status: 0, analysis: null }
    },
    summary: {
      totalTests: 2,
      successful: 0,
      failed: 0,
      reactIssues: 0,
      networkIssues: 0
    }
  };

  console.log('🔍 Starting React Pipeline Analysis...');
  console.log('=====================================');

  // Test Frame component
  const frameUrl = 'http://localhost:6012/iframe.html?id=components-navigation-frame--default&args=&viewMode=story';
  console.log(`\n🔍 Testing Frame component: ${frameUrl}`);

  try {
    const frameResponse = await fetchPageContent(frameUrl);
    results.components.frame.url = frameUrl;
    results.components.frame.status = frameResponse.status;
    results.components.frame.analysis = analyzeReactState(frameResponse.content, 'frame');

    console.log(`📊 Frame Status: ${frameResponse.status}`);
    console.log(`📄 Content Length: ${frameResponse.content.length} bytes`);

    const frameAnalysis = results.components.frame.analysis;
    console.log(`🔧 React State: ${frameAnalysis.reactInitialization}`);
    console.log(`📦 Vite App Loaded: ${frameAnalysis.hasViteApp}`);
    console.log(`🔄 React Refresh: ${frameAnalysis.hasReactRefresh}`);
    console.log(`📖 Storybook API: ${frameAnalysis.hasStorybookAPI}`);
    console.log(`🎯 Storybook Root: ${frameAnalysis.hasStorybookRoot}`);
    console.log(`⚠️ Error Display: ${frameAnalysis.hasErrorDisplay}`);
    console.log(`⏳ Preparing State: ${frameAnalysis.hasPreparingStory}`);
    console.log(`🏗️ Frame Elements: ${frameAnalysis.componentElements}`);

    if (frameAnalysis.errorMessages.length > 0) {
      console.log(`❌ Error Messages: ${frameAnalysis.errorMessages.slice(0, 3).join(', ')}`);
    }

    if (frameResponse.status === 200) {
      results.summary.successful++;
    } else {
      results.summary.failed++;
      results.summary.networkIssues++;
    }

    if (frameAnalysis.reactInitialization !== 'successful') {
      results.summary.reactIssues++;
    }

  } catch (error) {
    console.error(`❌ Frame test failed:`, error.message);
    results.components.frame.status = 0;
    results.components.frame.analysis = { error: error.message, reactInitialization: 'network_error' };
    results.summary.failed++;
    results.summary.networkIssues++;
  }

  // Test Breadcrumbs component
  const breadcrumbsUrl = 'http://localhost:6012/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story';
  console.log(`\n🔍 Testing Breadcrumbs component: ${breadcrumbsUrl}`);

  try {
    const breadcrumbsResponse = await fetchPageContent(breadcrumbsUrl);
    results.components.breadcrumbs.url = breadcrumbsUrl;
    results.components.breadcrumbs.status = breadcrumbsResponse.status;
    results.components.breadcrumbs.analysis = analyzeReactState(breadcrumbsResponse.content, 'breadcrumbs');

    console.log(`📊 Breadcrumbs Status: ${breadcrumbsResponse.status}`);
    console.log(`📄 Content Length: ${breadcrumbsResponse.content.length} bytes`);

    const breadcrumbsAnalysis = results.components.breadcrumbs.analysis;
    console.log(`🔧 React State: ${breadcrumbsAnalysis.reactInitialization}`);
    console.log(`📦 Vite App Loaded: ${breadcrumbsAnalysis.hasViteApp}`);
    console.log(`🔄 React Refresh: ${breadcrumbsAnalysis.hasReactRefresh}`);
    console.log(`📖 Storybook API: ${breadcrumbsAnalysis.hasStorybookAPI}`);
    console.log(`🎯 Storybook Root: ${breadcrumbsAnalysis.hasStorybookRoot}`);
    console.log(`⚠️ Error Display: ${breadcrumbsAnalysis.hasErrorDisplay}`);
    console.log(`⏳ Preparing State: ${breadcrumbsAnalysis.hasPreparingStory}`);
    console.log(`🏗️ Breadcrumbs Elements: ${breadcrumbsAnalysis.componentElements}`);

    if (breadcrumbsAnalysis.errorMessages.length > 0) {
      console.log(`❌ Error Messages: ${breadcrumbsAnalysis.errorMessages.slice(0, 3).join(', ')}`);
    }

    if (breadcrumbsResponse.status === 200) {
      results.summary.successful++;
    } else {
      results.summary.failed++;
      results.summary.networkIssues++;
    }

    if (breadcrumbsAnalysis.reactInitialization !== 'successful') {
      results.summary.reactIssues++;
    }

  } catch (error) {
    console.error(`❌ Breadcrumbs test failed:`, error.message);
    results.components.breadcrumbs.status = 0;
    results.components.breadcrumbs.analysis = { error: error.message, reactInitialization: 'network_error' };
    results.summary.failed++;
    results.summary.networkIssues++;
  }

  // Save detailed report
  const reportPath = path.join(__dirname, 'test-results', 'react-analysis-report.json');
  const reportDir = path.dirname(reportPath);

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detailed report saved to: ${reportPath}`);

  // Generate final summary
  console.log('\n📋 REACT PIPELINE ANALYSIS SUMMARY:');
  console.log('=====================================');
  console.log(`✅ Successful Tests: ${results.summary.successful}/${results.summary.totalTests}`);
  console.log(`❌ Failed Tests: ${results.summary.failed}`);
  console.log(`🔧 React Issues: ${results.summary.reactIssues}`);
  console.log(`🌐 Network Issues: ${results.summary.networkIssues}`);

  // Detailed component analysis
  ['frame', 'breadcrumbs'].forEach(componentName => {
    const component = results.components[componentName];
    console.log(`\n🔍 ${componentName.toUpperCase()} COMPONENT:`);
    console.log(`  URL: ${component.url}`);
    console.log(`  HTTP Status: ${component.status}`);

    if (component.analysis) {
      console.log(`  React Initialization: ${component.analysis.reactInitialization}`);
      console.log(`  Vite App Module: ${component.analysis.hasViteApp ? '✅ Loaded' : '❌ Missing'}`);
      console.log(`  React Refresh: ${component.analysis.hasReactRefresh ? '✅ Active' : '❌ Inactive'}`);
      console.log(`  Storybook API: ${component.analysis.hasStorybookAPI ? '✅ Available' : '❌ Missing'}`);
      console.log(`  Component Elements: ${component.analysis.componentElements}`);

      if (component.analysis.errorMessages.length > 0) {
        console.log(`  Errors Found: ${component.analysis.errorMessages.length}`);
        component.analysis.errorMessages.slice(0, 2).forEach(error => {
          console.log(`    - ${error}`);
        });
      }
    }
  });

  // Root cause analysis
  console.log('\n🎯 ROOT CAUSE ANALYSIS:');
  console.log('======================');

  const frameAnalysis = results.components.frame.analysis;
  const breadcrumbsAnalysis = results.components.breadcrumbs.analysis;

  if (frameAnalysis?.hasViteApp && breadcrumbsAnalysis?.hasViteApp) {
    console.log('✅ Vite modules are loading correctly');

    if (frameAnalysis?.reactInitialization === 'stuck_in_preparing' ||
        breadcrumbsAnalysis?.reactInitialization === 'stuck_in_preparing') {
      console.log('🔍 ISSUE: React components are stuck in "preparing story" state');
      console.log('   - This indicates module loading succeeded but component initialization failed');
      console.log('   - Likely causes: missing props, context providers, or component-level errors');
    }

    if (frameAnalysis?.hasErrorDisplay || breadcrumbsAnalysis?.hasErrorDisplay) {
      console.log('🔍 ISSUE: Error display is active - React initialization failed');
      console.log('   - Check browser console for specific error messages');
    }
  } else {
    console.log('❌ ISSUE: Vite modules are not loading properly');
    console.log('   - Check PropTypes virtual module configuration');
    console.log('   - Verify Vite configuration and dependencies');
  }

  return results;
}

// Run the analysis
testReactPipeline().catch(console.error);