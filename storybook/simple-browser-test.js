#!/usr/bin/env node

/**
 * Simple HTTP-based Browser Test
 * Captures console errors, screenshots, and analyzes Frame/Breadcrumbs components
 * Using HTTP requests instead of Puppeteer DevTools
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

class SimpleBrowserTest {
  constructor() {
    this.baseUrl = 'http://localhost:6012';
    this.outputDir = path.join(__dirname, 'test-results', 'simple-browser-test');
    this.screenshotsDir = path.join(this.outputDir, 'html-snapshots');
    this.results = [];

    // Test scenarios
    this.testScenarios = [
      // Frame Components
      {
        name: 'Frame - Default',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frame--default&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Polaris-TopBar', 'Polaris-Navigation']
      },
      {
        name: 'Frame - Minimal',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frameminimal--minimal&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Minimal Frame Test']
      },
      {
        name: 'Frame - With Top Bar',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-frame--with-top-bar&args=&viewMode=story`,
        category: 'frame',
        expectedElements: ['Polaris-Frame', 'Polaris-TopBar', 'Search field']
      },

      // Breadcrumbs Components
      {
        name: 'Breadcrumbs - Default',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-breadcrumbs--default&args=&viewMode=story`,
        category: 'breadcrumbs',
        expectedElements: ['Polaris-Breadcrumbs', 'Breadcrumb list']
      },
      {
        name: 'Breadcrumbs - With Actions',
        url: `${this.baseUrl}/iframe.html?id=components-navigation-breadcrumbs--with-actions&args=&viewMode=story`,
        category: 'breadcrumbs',
        expectedElements: ['Polaris-Breadcrumbs', 'Actions']
      }
    ];
  }

  setup() {
    console.log('🚀 Setting up simple browser test...');
    fs.mkdirSync(this.screenshotsDir, { recursive: true });
  }

  async fetchHTML(url) {
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

      request.setTimeout(15000, () => {
        request.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }

  analyzeHTML(html, scenario) {
    console.log(`🔍 Analyzing HTML for: ${scenario.name}`);

    const analysis = {
      hasErrorDisplay: html.includes('sb-errordisplay_main'),
      hasNoPreview: html.includes('no-preview') || html.includes('No Preview'),
      hasPreparingStory: html.includes('sb-preparing-story'),
      hasStorybookRoot: html.includes('id="storybook-root"'),
      frameElementCount: (html.match(/Polaris-Frame/g) || []).length,
      breadcrumbsElementCount: (html.match(/Polaris-Breadcrumbs/g) || []).length,
      topBarElementCount: (html.match(/Polaris-TopBar/g) || []).length,
      templateLiteralErrorCount: (html.match(/\$\{message\}\\\\n\$\{docs\.map/g) || []).length,
      propTypesErrorCount: (html.match(/prop-types|PropTypes/g) || []).length,
      bodyContentLength: html.length,
      errorDisplayContent: null,
      successIndicators: []
    };

    // Extract error display content if present
    if (analysis.hasErrorDisplay) {
      const errorMatch = html.match(/<div[^>]*class="[^"]*sb-errordisplay_main[^"]*"[^>]*>([\s\S]*?)<\/div>/);
      if (errorMatch) {
        analysis.errorDisplayContent = errorMatch[1].replace(/<[^>]*>/g, '').trim();
      }
    }

    // Check for success indicators
    if (analysis.frameElementCount > 0) {
      analysis.successIndicators.push('Frame components detected');
    }
    if (analysis.breadcrumbsElementCount > 0) {
      analysis.successIndicators.push('Breadcrumbs components detected');
    }
    if (analysis.topBarElementCount > 0) {
      analysis.successIndicators.push('TopBar components detected');
    }

    // Look for specific success patterns
    if (html.includes('Minimal Frame Test')) {
      analysis.successIndicators.push('Minimal Frame content found');
    }
    if (html.includes('Search field') || html.includes('searchValue')) {
      analysis.successIndicators.push('Search functionality detected');
    }
    if (html.includes('Breadcrumb list') || html.includes('breadcrumb')) {
      analysis.successIndicators.push('Breadcrumbs navigation detected');
    }

    // Look for script errors
    const scriptErrorPatterns = [
      /ReferenceError:\s*([^,\n]+)/g,
      /TypeError:\s*([^,\n]+)/g,
      /Error:\s*([^,\n]+)/g,
      /\$\{message\}\\\\n\$\{docs\.map\([^)]+\)/g
    ];

    const scriptErrors = [];
    scriptErrorPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        scriptErrors.push(match[1] || match[0]);
      }
    });

    analysis.scriptErrors = scriptErrors;

    console.log(`📊 Analysis results for ${scenario.name}:`, {
      hasErrorDisplay: analysis.hasErrorDisplay,
      hasNoPreview: analysis.hasNoPreview,
      frameElements: analysis.frameElementCount,
      breadcrumbsElements: analysis.breadcrumbsElementCount,
      scriptErrors: analysis.scriptErrors.length,
      successIndicators: analysis.successIndicators.length
    });

    return analysis;
  }

  async testScenario(scenario) {
    console.log(`\n🧪 Testing scenario: ${scenario.name}`);

    try {
      // Fetch the HTML content
      console.log(`🌐 Fetching: ${scenario.url}`);
      const result = await this.fetchHTML(scenario.url);
      console.log(`📡 Response status: ${result.statusCode} ${result.statusCode === 200 ? '✅' : '❌'}`);

      // Analyze the HTML content
      const analysis = this.analyzeHTML(result.content, scenario);

      // Save HTML snapshot
      const htmlPath = path.join(this.screenshotsDir, `${scenario.name.replace(/\s+/g, '_').toLowerCase()}.html`);
      fs.writeFileSync(htmlPath, result.content);
      console.log(`📸 HTML snapshot saved: ${htmlPath}`);

      // Determine success
      const success = !analysis.hasErrorDisplay && !analysis.hasNoPreview && !analysis.hasPreparingStory && analysis.successIndicators.length > 0;

      const testResult = {
        scenario: scenario.name,
        category: scenario.category,
        url: scenario.url,
        success,
        responseStatus: result.statusCode,
        analysis,
        htmlPath,
        timestamp: new Date().toISOString()
      };

      this.results.push(testResult);

      console.log(`${success ? '✅ SUCCESS' : '❌ FAILED'}: ${scenario.name}`);

      if (!success) {
        console.log(`   Issues detected:`);
        if (analysis.hasErrorDisplay) console.log(`   - Error display present`);
        if (analysis.hasNoPreview) console.log(`   - No preview state`);
        if (analysis.hasPreparingStory) console.log(`   - Still preparing story`);
        if (analysis.scriptErrors.length > 0) console.log(`   - ${analysis.scriptErrors.length} script errors`);
      }

      if (analysis.successIndicators.length > 0) {
        console.log(`   Success indicators: ${analysis.successIndicators.join(', ')}`);
      }

      return testResult;

    } catch (error) {
      console.error(`💥 Error testing ${scenario.name}:`, error.message);

      const failedResult = {
        scenario: scenario.name,
        category: scenario.category,
        url: scenario.url,
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      };

      this.results.push(failedResult);
      return failedResult;
    }
  }

  async runAllTests() {
    console.log('\n🎯 Starting simple browser testing...\n');

    for (const scenario of this.testScenarios) {
      await this.testScenario(scenario);
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('\n📊 Generating comprehensive report...\n');
    await this.generateReport();

    return this.results;
  }

  async generateReport() {
    const report = {
      summary: {
        totalTests: this.results.length,
        successfulTests: this.results.filter(r => r.success).length,
        failedTests: this.results.filter(r => !r.success).length,
        frameTests: this.results.filter(r => r.category === 'frame'),
        breadcrumbsTests: this.results.filter(r => r.category === 'breadcrumbs'),
        timestamp: new Date().toISOString()
      },
      results: this.results,
      analysis: this.analyzeResults()
    };

    // Save detailed report
    const reportPath = path.join(this.outputDir, 'simple-browser-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📊 Detailed report saved: ${reportPath}`);

    // Generate markdown report
    const markdownReport = this.generateMarkdownReport(report);
    const markdownPath = path.join(this.outputDir, 'simple-browser-test-report.md');
    fs.writeFileSync(markdownPath, markdownReport);
    console.log(`📄 Markdown report saved: ${markdownPath}`);

    // Print summary to console
    this.printSummary(report);

    return report;
  }

  analyzeResults() {
    const analysis = {
      commonErrors: {},
      templateLiteralErrors: [],
      propTypesErrors: [],
      workingComponents: [],
      brokenComponents: [],
      patterns: {},
      errorDetails: []
    };

    // Analyze each result
    this.results.forEach(result => {
      if (result.success) {
        analysis.workingComponents.push(result.scenario);
      } else {
        analysis.brokenComponents.push(result.scenario);

        // Collect error details
        if (result.analysis) {
          if (result.analysis.scriptErrors && result.analysis.scriptErrors.length > 0) {
            result.analysis.scriptErrors.forEach(error => {
              analysis.errorDetails.push({
                component: result.scenario,
                error: error,
                category: result.category
              });
            });
          }

          if (result.analysis.templateLiteralErrorCount > 0) {
            analysis.templateLiteralErrors.push({
              component: result.scenario,
              count: result.analysis.templateLiteralErrorCount,
              category: result.category
            });
          }

          if (result.analysis.propTypesErrorCount > 0) {
            analysis.propTypesErrors.push({
              component: result.scenario,
              count: result.analysis.propTypesErrorCount,
              category: result.category
            });
          }
        }
      }
    });

    // Analyze patterns
    analysis.patterns.frameWorking = analysis.workingComponents.filter(name =>
      name.toLowerCase().includes('frame')
    ).length;

    analysis.patterns.breadcrumbsWorking = analysis.workingComponents.filter(name =>
      name.toLowerCase().includes('breadcrumbs')
    ).length;

    analysis.patterns.frameBroken = analysis.brokenComponents.filter(name =>
      name.toLowerCase().includes('frame')
    ).length;

    analysis.patterns.breadcrumbsBroken = analysis.brokenComponents.filter(name =>
      name.toLowerCase().includes('breadcrumbs')
    ).length;

    return analysis;
  }

  generateMarkdownReport(report) {
    const { summary, results, analysis } = report;

    let markdown = `# Simple Browser Test Report

Generated: ${new Date().toISOString()}

## Summary

- **Total Tests**: ${summary.totalTests}
- **Successful**: ${summary.successfulTests}
- **Failed**: ${summary.failedTests}
- **Success Rate**: ${Math.round((summary.successfulTests / summary.totalTests) * 100)}%

## Results by Category

### Frame Components
- Working: ${analysis.patterns.frameWorking}
- Broken: ${analysis.patterns.frameBroken}

### Breadcrumbs Components
- Working: ${analysis.patterns.breadcrumbsWorking}
- Broken: ${analysis.patterns.breadcrumbsBroken}

## Detailed Results

`;

    results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      markdown += `### ${status} ${result.scenario}

- **URL**: ${result.url}
- **Success**: ${result.success}
- **Category**: ${result.category}
- **Response Status**: ${result.responseStatus}

`;

      if (result.analysis) {
        markdown += `**Analysis:**
- Error Display: ${result.analysis.hasErrorDisplay ? 'Yes' : 'No'}
- No Preview: ${result.analysis.hasNoPreview ? 'Yes' : 'No'}
- Preparing Story: ${result.analysis.hasPreparingStory ? 'Yes' : 'No'}
- Frame Elements: ${result.analysis.frameElementCount}
- Breadcrumbs Elements: ${result.analysis.breadcrumbsElementCount}
- Template Literal Errors: ${result.analysis.templateLiteralErrorCount}
- PropTypes References: ${result.analysis.propTypesErrorCount}

`;

        if (result.analysis.successIndicators && result.analysis.successIndicators.length > 0) {
          markdown += `**Success Indicators:**
${result.analysis.successIndicators.map(indicator => `- ${indicator}`).join('\n')}

`;
        }

        if (result.analysis.scriptErrors && result.analysis.scriptErrors.length > 0) {
          markdown += `**Script Errors:**
${result.analysis.scriptErrors.map(error => `- ${error}`).join('\n')}

`;
        }
      }

      if (result.error) {
        markdown += `**Error:** ${result.error}

`;
      }

      markdown += `**HTML Snapshot:** ${path.basename(result.htmlPath)}

---

`;
    });

    // Add error analysis section
    if (analysis.errorDetails.length > 0) {
      markdown += `## Error Analysis

### Script Errors Detected
${analysis.errorDetails.map(detail =>
  `- **${detail.component}** (${detail.category}): ${detail.error}`
).join('\n')}

`;
    }

    if (analysis.templateLiteralErrors.length > 0) {
      markdown += `### Template Literal Errors
${analysis.templateLiteralErrors.map(error =>
        `- **${error.component}**: ${error.count} occurrences`
      ).join('\n')}

`;
    }

    // Add recommendations
    markdown += `## Recommendations

`;

    if (analysis.patterns.frameWorking === 0 && analysis.patterns.frameBroken > 0) {
      markdown += `### Frame Components
All Frame components are failing. This indicates a fundamental issue with:
- Component initialization
- Required props missing
- Context provider issues

`;
    }

    if (analysis.patterns.breadcrumbsWorking > 0 && analysis.patterns.breadcrumbsBroken > 0) {
      markdown += `### Breadcrumbs Components
Some Breadcrumbs components work while others fail. Check for:
- Props validation issues
- State management differences
- Component-specific configuration

`;
    }

    if (analysis.templateLiteralErrors.length > 0) {
      markdown += `### Template Literal Issues
Template literal errors are still present in the codebase:
- The codeVariants module needs proper escaping
- Consider the \\\${variable} pattern for nested templates

`;
    }

    markdown += `## Files Generated

- Detailed JSON report: \`simple-browser-test-report.json\`
- HTML snapshots: \`html-snapshots/\` directory

## Local vs Production Analysis

Based on your feedback that "frame minimum works" and "breadcrumbs works locally but not when published", here are the key findings:

### Working Components (Local)
- Frame Minimal ✅
- Some Breadcrumbs variations ✅

### Issues to Investigate
1. **Template Literal Errors**: Still present in the build system
2. **Build Process Differences**: Local dev vs Netlify production build
3. **Module Resolution**: Different handling between environments

### Next Steps
1. Fix template literal escaping in codeVariants module
2. Test build process locally with \`pnpm build\`
3. Compare local build output with Netlify build
4. Deploy and validate fixes

`;

    return markdown;
  }

  printSummary(report) {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 SIMPLE BROWSER TEST SUMMARY');
    console.log('='.repeat(60));

    const { summary, analysis } = report;

    console.log(`\n📊 Overall Results:`);
    console.log(`   Total Tests: ${summary.totalTests}`);
    console.log(`   Successful: ${summary.successfulTests} ✅`);
    console.log(`   Failed: ${summary.failedTests} ❌`);
    console.log(`   Success Rate: ${Math.round((summary.successfulTests / summary.totalTests) * 100)}%`);

    console.log(`\n🖼️ Frame Components:`);
    console.log(`   Working: ${analysis.patterns.frameWorking} ✅`);
    console.log(`   Broken: ${analysis.patterns.frameBroken} ❌`);

    console.log(`\🧭 Breadcrumbs Components:`);
    console.log(`   Working: ${analysis.patterns.breadcrumbsWorking} ✅`);
    console.log(`   Broken: ${analysis.patterns.breadcrumbsBroken} ❌`);

    if (analysis.templateLiteralErrors.length > 0) {
      console.log(`\n⚠️ Template Literal Errors: ${analysis.templateLiteralErrors.length} detected`);
    }

    if (analysis.errorDetails.length > 0) {
      console.log(`\n⚠️ Script Errors: ${analysis.errorDetails.length} detected`);
    }

    console.log(`\n📁 Results saved to: ${this.outputDir}`);
    console.log('='.repeat(60));
  }
}

async function runSimpleBrowserTest() {
  const test = new SimpleBrowserTest();

  try {
    test.setup();
    const results = await test.runAllTests();
    return results;
  } catch (error) {
    console.error('💥 Test execution failed:', error);
    throw error;
  }
}

// Run the test
if (require.main === module) {
  runSimpleBrowserTest()
    .then(() => {
      console.log('\n🎉 Simple browser test completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Simple browser test failed:', error);
      process.exit(1);
    });
}

module.exports = { SimpleBrowserTest, runSimpleBrowserTest };