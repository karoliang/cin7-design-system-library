const { JSDOM } = require('jsdom');
const fs = require('fs');

async function performDOMAnalysis() {
  console.log('🔍 Starting DOM analysis of Storybook page...\n');

  try {
    // Fetch the Storybook HTML
    console.log('📡 Fetching Storybook HTML...');
    const response = await fetch('http://localhost:6006/');
    const html = await response.text();

    console.log(`✅ Retrieved HTML (${html.length} characters)`);

    // Create a virtual DOM
    const dom = new JSDOM(html, {
      url: 'http://localhost:6006/',
      pretendToBeVisual: true,
      resources: 'usable',
      runScripts: 'dangerously'
    });

    const { document } = dom.window;

    // Wait a bit for scripts to execute
    console.log('⏳ Waiting for scripts to execute...');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Analyze the initial DOM
    console.log('🔍 Analyzing initial DOM structure...');

    const analysis = {
      title: document.title,
      bodyClasses: document.body.className,
      rootElement: {
        exists: !!document.getElementById('root'),
        innerHTML: document.getElementById('root')?.innerHTML || ''
      },
      scriptTags: Array.from(document.scripts).map(script => ({
        src: script.src,
        type: script.type,
        innerHTML: script.innerHTML.substring(0, 200)
      })),
      linkTags: Array.from.document.head.querySelectorAll('link').map(link => ({
        rel: link.rel,
        href: link.href
      })),
      computedStyles: {}
    };

    console.log('📊 Initial DOM Analysis:');
    console.log(`  - Title: ${analysis.title}`);
    console.log(`  - Body classes: ${analysis.bodyClasses}`);
    console.log(`  - Root element exists: ${analysis.rootElement.exists}`);
    console.log(`  - Script tags: ${analysis.scriptTags.length}`);
    console.log(`  - Link tags: ${analysis.linkTags.length}`);

    // Check for console errors in the virtual DOM
    dom.window.addEventListener('error', (event) => {
      console.log('❌ JavaScript error in virtual DOM:', event.error);
    });

    // Try to execute some basic DOM checks
    console.log('🧪 Running DOM checks...');

    const checks = {
      hasRoot: !!document.getElementById('root'),
      hasBody: !!document.body,
      bodyHasChildren: document.body.children.length > 0,
      rootHasChildren: document.getElementById('root')?.children.length > 0,
      hasLoadingElements: !!document.querySelector('[data-testid="loading"], .loading, .spinner'),
      hasErrorElements: !!document.querySelector('[data-testid="error"], .error'),
      windowHasStorybook: !!dom.window.STORYBOOK_RENDERER,
      windowHasFeatures: !!dom.window.FEATURES
    };

    console.log('🔍 DOM Checks Results:');
    Object.entries(checks).forEach(([key, value]) => {
      console.log(`  - ${key}: ${value}`);
    });

    // Try to fetch and analyze some of the JavaScript files
    console.log('📜 Analyzing JavaScript files...');

    const jsFiles = [
      '/sb-manager/runtime.js',
      '/sb-manager/globals-runtime.js'
    ];

    const jsAnalysis = {};

    for (const jsFile of jsFiles) {
      try {
        const jsResponse = await fetch(`http://localhost:6006${jsFile}`);
        const jsContent = await jsResponse.text();

        jsAnalysis[jsFile] = {
          size: jsContent.length,
          hasModule: jsContent.includes('module') || jsContent.includes('export'),
          hasReact: jsContent.includes('react') || jsContent.includes('React'),
          hasStorybook: jsContent.includes('storybook') || jsContent.includes('Storybook'),
          hasError: jsContent.toLowerCase().includes('error')
        };

        console.log(`✅ ${jsFile}: ${jsContent.length} chars`);
      } catch (error) {
        jsAnalysis[jsFile] = {
          error: error.message
        };
        console.log(`❌ ${jsFile}: ${error.message}`);
      }
    }

    // Check the iframe preview
    console.log('🖼️ Analyzing iframe preview...');
    try {
      const iframeResponse = await fetch('http://localhost:6006/iframe.html');
      const iframeHtml = await iframeResponse.text();

      const iframeAnalysis = {
        status: iframeResponse.status,
        length: iframeHtml.length,
        hasRoot: iframeHtml.includes('<div id="root">'),
        hasPreview: iframeHtml.includes('storybook-preview'),
        bodyClasses: iframeHtml.match(/<body[^>]*class="([^"]*)"/)?.[1] || ''
      };

      console.log(`✅ iframe.html: ${iframeAnalysis.length} chars`);
      console.log(`  - Has root: ${iframeAnalysis.hasRoot}`);
      console.log(`  - Has preview: ${iframeAnalysis.hasPreview}`);
      console.log(`  - Body classes: ${iframeAnalysis.bodyClasses}`);

      // Save iframe HTML for inspection
      fs.writeFileSync('iframe-html-content.html', iframeHtml);
      console.log('✅ iframe HTML saved to iframe-html-content.html');

    } catch (error) {
      console.log(`❌ iframe analysis failed: ${error.message}`);
    }

    // Try to simulate what happens when scripts load
    console.log('🎭 Simulating script execution...');

    // Add some basic storybook globals to the window
    dom.window.FEATURES = {
      "argTypeTargetsV7": true,
      "legacyDecoratorFileOrder": false,
      "disallowImplicitActionsInRenderV8": true,
      "storyStoreV7": true,
      "babelModeV7": true,
      "previewMdx2": true
    };

    dom.window.STORYBOOK_RENDERER = "react";
    dom.window.STORYBOOK_BUILDER = "@storybook/builder-vite";
    dom.window.STORYBOOK_FRAMEWORK = "@storybook/react-vite";

    // Wait a bit more to see if anything changes
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Final DOM check
    const finalCheck = {
      rootElement: document.getElementById('root')?.innerHTML || '',
      rootHasChildren: document.getElementById('root')?.children.length > 0,
      bodyHasChildren: document.body.children.length > 0,
      allElements: document.querySelectorAll('*').length
    };

    console.log('🔍 Final DOM State:');
    console.log(`  - Root children: ${finalCheck.rootHasChildren ? document.getElementById('root').children.length : 0}`);
    console.log(`  - Body children: ${finalCheck.bodyHasChildren ? document.body.children.length : 0}`);
    console.log(`  - Total elements: ${finalCheck.allElements}`);

    // Generate diagnosis
    console.log('\n🎯 DOM ANALYSIS DIAGNOSIS:');

    const issues = [];
    const suggestions = [];

    if (!checks.hasRoot) {
      issues.push('Root element not found in HTML');
      suggestions.push('Storybook HTML structure is corrupted');
    }

    if (!finalCheck.rootHasChildren && !finalCheck.bodyHasChildren) {
      issues.push('No DOM elements rendered after script execution');
      suggestions.push('JavaScript modules are not executing or mounting React components');
    }

    if (!checks.windowHasStorybook && !checks.windowHasFeatures) {
      issues.push('Storybook global variables not set');
      suggestions.push('Storybook configuration scripts may not be running');
    }

    if (issues.length === 0) {
      console.log('✅ DOM structure looks correct');
      console.log('🔍 The issue is likely in CSS styling or React component mounting');
      suggestions.push('Check CSS files for visibility issues (display: none, opacity: 0)');
      suggestions.push('Check React component mounting and state');
      suggestions.push('Open in real browser to see console errors and network issues');
    } else {
      console.log('❌ DOM issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    }

    if (suggestions.length > 0) {
      console.log('\n💡 Suggestions:');
      suggestions.forEach(suggestion => console.log(`  - ${suggestion}`));
    }

    // Save comprehensive report
    const report = {
      timestamp: new Date().toISOString(),
      analysis,
      checks,
      jsAnalysis,
      finalCheck,
      diagnosis: {
        issues,
        suggestions,
        summary: issues.length === 0 ? 'DOM structure appears correct' : 'DOM structural issues detected'
      }
    };

    fs.writeFileSync('dom-analysis-report.json', JSON.stringify(report, null, 2));
    console.log('\n📋 DOM analysis report saved to: dom-analysis-report.json');

    return report;

  } catch (error) {
    console.error('❌ DOM analysis failed:', error);
    return { error: error.message };
  }
}

// Check if jsdom is available, install if needed
try {
  require('jsdom');
} catch (error) {
  console.log('📦 Installing jsdom for DOM analysis...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install jsdom', { stdio: 'inherit' });
  } catch (installError) {
    console.log('❌ Could not install jsdom automatically');
    console.log('Please run: npm install jsdom');
    process.exit(1);
  }
}

// Run the analysis
performDOMAnalysis().catch(console.error);