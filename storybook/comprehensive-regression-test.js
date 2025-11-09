/**
 * Comprehensive Storybook Regression Testing Suite
 * Tests all known Storybook URLs and monitors for console errors using multiple approaches
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

class ComprehensiveRegressionTester {
  constructor() {
    this.storybookUrl = 'http://localhost:6006';
    this.results = {
      timestamp: new Date().toISOString(),
      testResults: [],
      consoleErrors: [],
      criticalErrors: [],
      missingVariations: [],
      performanceIssues: [],
      summary: {
        totalStories: 0,
        passedStories: 0,
        failedStories: 0,
        storiesWithVariations: 0,
        totalErrors: 0,
        totalWarnings: 0,
        avgLoadTime: 0
      },
      completedAt: null
    };

    // Known Storybook stories based on the codebase
    this.knownStories = [
      // Introduction and Getting Started
      { url: '/?path=/docs/introduction--docs', title: 'Introduction', category: 'docs', hasVariations: false },
      { url: '/?path=/docs/getting-started--docs', title: 'Getting Started', category: 'docs', hasVariations: false },
      { url: '/?path=/story/stories-guides-getting-started--overview', title: 'Getting Started Overview', category: 'stories', hasVariations: true },

      // Component Selection
      { url: '/?path=/story/cin7-dsl-introduction-component-selection--navigation-selection', title: 'Navigation Selection', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-component-selection--overview', title: 'Component Selection Overview', category: 'stories', hasVariations: true },

      // Charts
      { url: '/?path=/story/cin7-dsl-charts-linechart--default', title: 'LineChart - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-linechart--multi-series', title: 'LineChart - Multi Series', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-linechart--with-zoom', title: 'LineChart - With Zoom', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-linechart--real-time', title: 'LineChart - Real Time', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-linechart--styled', title: 'LineChart - Styled', category: 'stories', hasVariations: true },

      { url: '/?path=/story/cin7-dsl-charts-barchart--default', title: 'BarChart - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-barchart--stacked', title: 'BarChart - Stacked', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-barchart--grouped', title: 'BarChart - Grouped', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-barchart--horizontal', title: 'BarChart - Horizontal', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-barchart--with-labels', title: 'BarChart - With Labels', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-barchart--custom-colors', title: 'BarChart - Custom Colors', category: 'stories', hasVariations: true },

      { url: '/?path=/story/cin7-dsl-charts-piechart--default', title: 'PieChart - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--with-legend', title: 'PieChart - With Legend', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--donut', title: 'PieChart - Donut', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--3d', title: 'PieChart - 3D', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--exploded', title: 'PieChart - Exploded', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--custom-labels', title: 'PieChart - Custom Labels', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--gradient-fill', title: 'PieChart - Gradient Fill', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-charts-piechart--interactive', title: 'PieChart - Interactive', category: 'stories', hasVariations: true },

      // Navigation Components
      { url: '/?path=/story/cin7-dsl-navigation-breadcrumbs--default', title: 'Breadcrumbs - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-navigation-breadcrumbs--interactive', title: 'Breadcrumbs - Interactive', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-navigation-breadcrumbs--with-navigation', title: 'Breadcrumbs - With Navigation', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-navigation-breadcrumbs--admin-panel', title: 'Breadcrumbs - Admin Panel', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-navigation-breadcrumbs--page-with-tabs', title: 'Breadcrumbs - Page With Tabs', category: 'stories', hasVariations: true },

      // Theming
      { url: '/?path=/story/cin7-dsl-theming-theme-playground--playground', title: 'Theme Playground', category: 'stories', hasVariations: true },
      { url: '/?path=/docs/theming--docs', title: 'Theming Documentation', category: 'docs', hasVariations: false },

      // UI Patterns and Usage
      { url: '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--overview', title: 'Usage Patterns - Overview', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--form-patterns', title: 'Usage Patterns - Form Patterns', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--dashboard-patterns', title: 'Usage Patterns - Dashboard Patterns', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--table-patterns', title: 'Usage Patterns - Table Patterns', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--modal-patterns', title: 'Usage Patterns - Modal Patterns', category: 'stories', hasVariations: true },
      { url: '/?path=/story/cin7-dsl-ui-patterns-usage-patterns--loading-patterns', title: 'Usage Patterns - Loading Patterns', category: 'stories', hasVariations: true },
      { url: '/?path=/docs/usage-patterns--docs', title: 'Usage Patterns Documentation', category: 'docs', hasVariations: false },

      // Integration Examples
      { url: '/?path=/story/stories-guides-integration-examples--overview', title: 'Integration Examples - Overview', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-integration-examples--react-integration', title: 'Integration Examples - React', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-integration-examples--extjs-integration', title: 'Integration Examples - ExtJS', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-integration-examples--vanilla-js-integration', title: 'Integration Examples - Vanilla JS', category: 'stories', hasVariations: true },
      { url: '/?path=/docs/integration--docs', title: 'Integration Documentation', category: 'docs', hasVariations: false },

      // Testing Examples
      { url: '/?path=/story/stories-guides-testing-examples--overview', title: 'Testing Examples - Overview', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-testing-examples--unit-tests', title: 'Testing Examples - Unit Tests', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-testing-examples--integration-tests', title: 'Testing Examples - Integration Tests', category: 'stories', hasVariations: true },
      { url: '/?path=/story/stories-guides-testing-examples--e2e-tests', title: 'Testing Examples - E2E Tests', category: 'stories', hasVariations: true },
      { url: '/?path=/docs/testing--docs', title: 'Testing Documentation', category: 'docs', hasVariations: false },

      // Basic Components
      { url: '/?path=/story/components-button--primary', title: 'Button - Primary', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-button--secondary', title: 'Button - Secondary', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-card--default', title: 'Card - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-text-field--default', title: 'Text Field - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-badge--default', title: 'Badge - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-data-table--default', title: 'Data Table - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-grid--responsive', title: 'Grid - Responsive', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-tabs--default', title: 'Tabs - Default', category: 'stories', hasVariations: true },
      { url: '/?path=/story/components-modal--default', title: 'Modal - Default', category: 'stories', hasVariations: true }
    ];

    this.results.summary.totalStories = this.knownStories.length;
  }

  async checkStorybookHealth() {
    console.log('🏥 Checking Storybook health...');

    try {
      const { stdout } = await execAsync(`curl -s -o /dev/null -w "%{http_code}" "${this.storybookUrl}"`);
      const statusCode = parseInt(stdout.trim());

      if (statusCode === 200) {
        console.log('✅ Storybook is running and accessible');
        return true;
      } else {
        console.log(`❌ Storybook returned status: ${statusCode}`);
        return false;
      }
    } catch (error) {
      console.log(`❌ Cannot reach Storybook: ${error.message}`);
      return false;
    }
  }

  async testStoryWithCurl(story, index) {
    console.log(`🧪 [${index + 1}/${this.knownStories.length}] Testing: ${story.title}`);

    const testResult = {
      ...story,
      id: index + 1,
      status: 'pending',
      httpStatus: null,
      loadTime: 0,
      errors: [],
      warnings: [],
      hasContent: false,
      hasCodeVariations: false,
      responseSize: 0,
      testedAt: new Date().toISOString()
    };

    const startTime = Date.now();

    try {
      const testUrl = `${this.storybookUrl}${story.url}`;

      // Use curl to get the page content and status
      const { stdout, stderr } = await execAsync(
        `curl -s -w "\\nHTTP_CODE:%{http_code}\\nSIZE:%{size_download}\\nTIME:%{time_total}" "${testUrl}"`
      );

      const lines = stdout.split('\n');
      const httpCodeLine = lines.find(line => line.startsWith('HTTP_CODE:'));
      const sizeLine = lines.find(line => line.startsWith('SIZE:'));
      const timeLine = lines.find(line => line.startsWith('TIME:'));

      testResult.httpStatus = httpCodeLine ? parseInt(httpCodeLine.split(':')[1]) : null;
      testResult.responseSize = sizeLine ? parseInt(sizeLine.split(':')[1]) : 0;
      testResult.loadTime = Math.round((timeLine ? parseFloat(timeLine.split(':')[1]) : 0) * 1000);

      // Remove the curl metadata lines to get the HTML content
      const htmlContent = lines.filter(line =>
        !line.startsWith('HTTP_CODE:') &&
        !line.startsWith('SIZE:') &&
        !line.startsWith('TIME:')
      ).join('\n');

      if (testResult.httpStatus === 200) {
        testResult.status = 'passed';
        this.results.summary.passedStories++;

        // Check for known error patterns in the HTML content
        const errorPatterns = [
          { pattern: /Cannot destructure property 'content' of 'undefined'/, type: 'breadcrumbs_error' },
          { pattern: /ReferenceError: (\w+) is not defined/, type: 'reference_error' },
          { pattern: /TypeError: Cannot read propert(y|ies) of (undefined|null)/, type: 'type_error' },
          { pattern: /TypeError: (\w+) is not a function/, type: 'function_error' },
          { pattern: /Error: Module build failed/, type: 'build_error' },
          { pattern: /SyntaxError: Unexpected token/, type: 'syntax_error' },
          { pattern: /RangeError: Maximum call stack size exceeded/, type: 'stack_overflow' },
          { pattern: /CircleTickIcon is not defined/, type: 'icon_error' },
          { pattern: /Tooltip is not defined/, type: 'tooltip_error' }
        ];

        for (const { pattern, type } of errorPatterns) {
          if (pattern.test(htmlContent)) {
            testResult.status = 'failed';
            testResult.errors.push({
              type: type,
              message: `Detected error pattern: ${pattern.source}`,
              severity: 'high',
              pattern: pattern.toString()
            });
            this.results.summary.totalErrors++;
            this.results.summary.failedStories++;
            this.results.summary.passedStories--;
            console.log(`❌ Failed: ${story.title} - ${type} detected`);
            break;
          }
        }

        // Check for warning patterns
        const warningPatterns = [
          { pattern: /Warning: /, type: 'react_warning' },
          { pattern: /Deprecated:/, type: 'deprecation_warning' },
          { pattern: /Failed prop type:/, type: 'prop_type_warning' }
        ];

        for (const { pattern, type } of warningPatterns) {
          if (pattern.test(htmlContent)) {
            testResult.warnings.push({
              type: type,
              message: `Warning pattern detected: ${pattern.source}`,
              severity: 'medium'
            });
            this.results.summary.totalWarnings++;
          }
        }

        // Check for code variations
        testResult.hasCodeVariations = htmlContent.includes('code-variants') ||
                                     htmlContent.includes('codeVariants') ||
                                     htmlContent.includes('data-testid="code-variants"') ||
                                     htmlContent.includes('class="code-variants"') ||
                                     htmlContent.includes('storybook-addon-code-variants');

        // Check for content indicators
        testResult.hasContent = htmlContent.includes('id="storybook-root"') ||
                               htmlContent.includes('id="storybook-preview-wrapper"') ||
                               htmlContent.includes('class="sb-preview-main"') ||
                               htmlContent.includes('class="sb-show-main"');

        // Check for specific components that should be present
        if (testResult.hasCodeVariations) {
          this.results.summary.storiesWithVariations++;
        }

        if (testResult.status === 'passed') {
          console.log(`✅ Passed: ${story.title} (${testResult.loadTime}ms)${testResult.hasCodeVariations ? ' 📝' : ''}`);
        }

      } else {
        testResult.status = 'failed';
        testResult.errors.push({
          type: 'http_error',
          message: `HTTP ${testResult.httpStatus}`,
          severity: 'high'
        });
        this.results.summary.failedStories++;
        this.results.summary.totalErrors++;
        console.log(`❌ Failed: ${story.title} - HTTP ${testResult.httpStatus}`);
      }

    } catch (error) {
      testResult.status = 'error';
      testResult.errors.push({
        type: 'network_error',
        message: error.message,
        severity: 'high'
      });
      testResult.loadTime = Date.now() - startTime;
      this.results.summary.failedStories++;
      this.results.summary.totalErrors++;
      console.log(`💥 Error: ${story.title} - ${error.message}`);
    }

    this.results.testResults.push(testResult);
    return testResult;
  }

  async runAllTests() {
    try {
      console.log('🎯 Starting Comprehensive Storybook Regression Testing...\n');

      // Check if Storybook is running
      const isHealthy = await this.checkStorybookHealth();
      if (!isHealthy) {
        throw new Error('Storybook is not accessible');
      }

      console.log(`\n🧪 Testing ${this.knownStories.length} known stories and documentation pages...\n`);

      // Test each story
      for (let i = 0; i < this.knownStories.length; i++) {
        const story = this.knownStories[i];
        await this.testStoryWithCurl(story, i);

        // Small delay between requests to avoid overwhelming the server
        if (i < this.knownStories.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }

      // Calculate statistics
      this.results.summary.avgLoadTime = this.results.testResults.length > 0 ?
        Math.round(this.results.testResults.reduce((sum, test) => sum + test.loadTime, 0) / this.results.testResults.length) : 0;

      this.results.completedAt = new Date().toISOString();

      console.log('\n🏁 All tests completed!');
      console.log(`📊 Summary:`);
      console.log(`  Total: ${this.results.summary.totalStories} stories`);
      console.log(`  Passed: ${this.results.summary.passedStories} (${((this.results.summary.passedStories / this.results.summary.totalStories) * 100).toFixed(1)}%)`);
      console.log(`  Failed: ${this.results.summary.failedStories} (${((this.results.summary.failedStories / this.results.summary.totalStories) * 100).toFixed(1)}%)`);
      console.log(`  With Code Variations: ${this.results.summary.storiesWithVariations}`);
      console.log(`  Total Errors: ${this.results.summary.totalErrors}`);
      console.log(`  Total Warnings: ${this.results.summary.totalWarnings}`);
      console.log(`  Average Load Time: ${this.results.summary.avgLoadTime}ms`);

      // Generate reports
      await this.generateReport();

      return this.results;

    } catch (error) {
      console.error('💥 Test suite failed:', error);
      throw error;
    }
  }

  async generateReport() {
    const reportPath = path.join(__dirname, 'comprehensive-regression-results.json');
    const htmlReportPath = path.join(__dirname, 'comprehensive-regression-results.html');

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));

    // Generate HTML report
    const htmlContent = this.generateHTMLReport();
    fs.writeFileSync(htmlReportPath, htmlContent);

    console.log(`\n📊 Reports generated:`);
    console.log(`  JSON: ${reportPath}`);
    console.log(`  HTML: ${htmlReportPath}`);

    // Analyze and report critical issues
    await this.analyzeCriticalIssues();

    return { reportPath, htmlReportPath };
  }

  async analyzeCriticalIssues() {
    const failedTests = this.results.testResults.filter(r => r.status === 'failed' || r.status === 'error');
    const storiesWithoutVariations = this.results.testResults.filter(r =>
      r.category === 'stories' && !r.hasCodeVariations && r.status === 'passed'
    );
    const slowTests = this.results.testResults.filter(r => r.loadTime > 5000);
    const largeResponses = this.results.testResults.filter(r => r.responseSize > 1000000); // > 1MB

    console.log('\n🔍 CRITICAL ISSUES ANALYSIS:');

    if (failedTests.length > 0) {
      console.log(`\n🚨 CRITICAL ERRORS (${failedTests.length}):`);
      failedTests.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.title}`);
        test.errors.forEach(error => {
          console.log(`     - ${error.type}: ${error.message}`);
        });
      });
    }

    if (storiesWithoutVariations.length > 0) {
      console.log(`\n📝 STORIES MISSING CODE VARIATIONS (${storiesWithoutVariations.length}):`);
      storiesWithoutVariations.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.title} (${test.url})`);
      });
    }

    if (slowTests.length > 0) {
      console.log(`\n⏱️ SLOW LOAD TIMES (${slowTests.length} > 5s):`);
      slowTests.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.title}: ${test.loadTime}ms`);
      });
    }

    if (largeResponses.length > 0) {
      console.log(`\n📦 LARGE RESPONSES (${largeResponses.length} > 1MB):`);
      largeResponses.forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.title}: ${(test.responseSize / 1024 / 1024).toFixed(2)}MB`);
      });
    }

    // Check for specific error patterns that need immediate fixes
    const iconErrors = this.results.testResults.filter(r =>
      r.errors.some(e => e.type === 'icon_error')
    );
    const tooltipErrors = this.results.testResults.filter(r =>
      r.errors.some(e => e.type === 'tooltip_error')
    );
    const breadcrumbErrors = this.results.testResults.filter(r =>
      r.errors.some(e => e.type === 'breadcrumbs_error')
    );

    if (iconErrors.length > 0) {
      console.log(`\n🔧 IMMEDIATE FIXES NEEDED - Icon Errors: ${iconErrors.length}`);
      console.log('   These are likely missing icon imports that need to be addressed.');
    }

    if (tooltipErrors.length > 0) {
      console.log(`\n🔧 IMMEDIATE FIXES NEEDED - Tooltip Errors: ${tooltipErrors.length}`);
      console.log('   These are missing Tooltip component imports.');
    }

    if (breadcrumbErrors.length > 0) {
      console.log(`\n🔧 IMMEDIATE FIXES NEEDED - Breadcrumb Errors: ${breadcrumbErrors.length}`);
      console.log('   These are the destructuring errors we\'ve been working on.');
    }

    return {
      failedTests,
      storiesWithoutVariations,
      slowTests,
      largeResponses,
      iconErrors,
      tooltipErrors,
      breadcrumbErrors
    };
  }

  generateHTMLReport() {
    const passedTests = this.results.testResults.filter(r => r.status === 'passed');
    const failedTests = this.results.testResults.filter(r => r.status === 'failed' || r.status === 'error');
    const storiesWithoutVariations = this.results.testResults.filter(r =>
      r.category === 'stories' && !r.hasCodeVariations && r.status === 'passed'
    );

    const successRate = this.results.summary.totalStories > 0 ?
      ((this.results.summary.passedStories / this.results.summary.totalStories) * 100).toFixed(1) : 0;

    return `
<!DOCTYPE html>
<html>
<head>
    <title>Comprehensive Storybook Regression Report</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .header h1 { margin: 0 0 10px 0; font-size: 2.5em; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .metric { background: white; padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .metric:hover { transform: translateY(-2px); }
        .metric h3 { margin: 0; font-size: 2.5em; font-weight: 300; }
        .metric p { margin: 10px 0 0 0; color: #666; font-weight: 500; }
        .metric.success { border-left: 5px solid #28a745; }
        .metric.error { border-left: 5px solid #dc3545; }
        .metric.warning { border-left: 5px solid #ffc107; }
        .metric.info { border-left: 5px solid #17a2b8; }
        .test-item { background: white; margin: 15px 0; padding: 25px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); transition: all 0.2s; }
        .test-item:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        .test-item.passed { border-left: 5px solid #28a745; }
        .test-item.failed { border-left: 5px solid #dc3545; }
        .test-item.error { border-left: 5px solid #dc3545; }
        .status { padding: 6px 16px; border-radius: 20px; color: white; font-size: 0.75em; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; }
        .status.passed { background: #28a745; }
        .status.failed { background: #dc3545; }
        .status.error { background: #dc3545; }
        .error-details { background: #f8d7da; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #dc3545; }
        .warning-details { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ffc107; }
        .info-details { background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #17a2b8; }
        .tabs { display: flex; margin-bottom: 0; background: white; border-radius: 12px 12px 0 0; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .tab { padding: 16px 28px; background: #f8f9fa; cursor: pointer; transition: all 0.2s; border: none; font-size: 14px; font-weight: 500; }
        .tab:hover { background: #e9ecef; }
        .tab.active { background: #007bff; color: white; }
        .content { display: none; background: white; padding: 30px; border-radius: 0 0 12px 12px; min-height: 500px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .content.active { display: block; }
        pre { background: #2d3748; color: #e2e8f0; padding: 20px; border-radius: 8px; overflow-x: auto; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 0.9em; line-height: 1.5; }
        .stats { display: flex; justify-content: space-between; align-items: center; margin: 15px 0; flex-wrap: wrap; gap: 15px; }
        .timestamp { color: #666; font-size: 0.9em; }
        .badge { background: #007bff; color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.75em; margin-left: 8px; font-weight: 500; }
        .load-time { color: #28a745; font-weight: bold; }
        .url { color: #6c757d; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 0.85em; word-break: break-all; background: #f8f9fa; padding: 8px 12px; border-radius: 6px; margin: 10px 0; }
        .error-pattern { background: #721c24; color: #f8d7da; padding: 2px 8px; border-radius: 12px; font-size: 0.8em; margin: 2px; display: inline-block; }
        .performance-metric { display: inline-block; margin: 5px 10px 5px 0; padding: 4px 12px; background: #e9ecef; border-radius: 15px; font-size: 0.8em; }
        .critical-section { border: 2px solid #dc3545; border-radius: 12px; padding: 20px; margin: 20px 0; background: #fff5f5; }
        h1, h2, h3, h4 { margin-top: 0; }
        h2 { color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
        .scroll-to-top { position: fixed; bottom: 20px; right: 20px; background: #007bff; color: white; padding: 10px 20px; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,123,255,0.3); transition: all 0.2s; }
        .scroll-to-top:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,123,255,0.4); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧪 Comprehensive Storybook Regression Report</h1>
            <p>Generated: ${new Date(this.results.timestamp).toLocaleString()}</p>
            <p class="timestamp">Test Duration: ${this.results.completedAt ?
              Math.round((new Date(this.results.completedAt) - new Date(this.results.timestamp)) / 1000) : 'N/A'} seconds</p>
        </div>

        <div class="summary">
            <div class="metric">
                <h3>${this.results.summary.totalStories}</h3>
                <p>Total Items Tested</p>
            </div>
            <div class="metric success">
                <h3>${this.results.summary.passedStories}</h3>
                <p>Passed Tests</p>
            </div>
            <div class="metric error">
                <h3>${this.results.summary.failedStories}</h3>
                <p>Failed Tests</p>
            </div>
            <div class="metric info">
                <h3>${successRate}%</h3>
                <p>Success Rate</p>
            </div>
            <div class="metric success">
                <h3>${this.results.summary.storiesWithVariations}</h3>
                <p>With Code Variations</p>
            </div>
            <div class="metric warning">
                <h3>${this.results.summary.totalErrors}</h3>
                <p>Total Errors</p>
            </div>
            <div class="metric info">
                <h3>${this.results.summary.avgLoadTime}ms</h3>
                <p>Average Load Time</p>
            </div>
        </div>

        <div class="tabs">
            <div class="tab active" onclick="showTab('overview')">Overview</div>
            <div class="tab" onclick="showTab('passed')">Passed (${passedTests.length})</div>
            <div class="tab" onclick="showTab('failed')">Failed (${failedTests.length})</div>
            <div class="tab" onclick="showTab('variations')">Missing Variations (${storiesWithoutVariations.length})</div>
            <div class="tab" onclick="showTab('performance')">Performance</div>
        </div>

        <div id="overview" class="content active">
            <h2>📊 Test Overview</h2>
            <div class="stats">
                <span>Success Rate: <strong>${successRate}%</strong></span>
                <span>Total Test Time: <strong>${this.results.testResults.reduce((sum, test) => sum + test.loadTime, 0)}ms</strong></span>
                <span>Average Load Time: <strong>${this.results.summary.avgLoadTime}ms</strong></span>
                <span>Stories with Code Variations: <strong>${this.results.summary.storiesWithVariations}/${this.results.summary.totalStories}</strong></span>
            </div>

            ${failedTests.length > 0 ? `
                <div class="critical-section">
                    <h3 style="color: #dc3545; margin-top: 0;">🚨 Critical Issues Summary</h3>
                    <p><strong>${failedTests.length}</strong> tests failed with critical errors that need immediate attention.</p>
                    <div class="stats">
                        <span>Errors: <strong style="color: #dc3545;">${this.results.summary.totalErrors}</strong></span>
                        <span>Warnings: <strong style="color: #ffc107;">${this.results.summary.totalWarnings}</strong></span>
                    </div>
                    <p><a href="#failed" onclick="showTab('failed')" style="color: #007bff; text-decoration: none; font-weight: bold;">View Failed Tests →</a></p>
                </div>
            ` : ''}

            ${storiesWithoutVariations.length > 0 ? `
                <div class="warning-details">
                    <h3 style="margin-top: 0;">📝 Code Variations Missing</h3>
                    <p><strong>${storiesWithoutVariations.length}</strong> stories are missing code variations, which reduces the educational value of the documentation.</p>
                    <p><a href="#variations" onclick="showTab('variations')" style="color: #007bff; text-decoration: none; font-weight: bold;">View Missing Variations →</a></p>
                </div>
            ` : ''}

            <h3>📈 Test Results by Category</h3>
            ${Object.entries(
              this.results.testResults.reduce((acc, test) => {
                acc[test.category] = (acc[test.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([category, count]) => `<div class="performance-metric">${category.charAt(0).toUpperCase() + category.slice(1)}: <strong>${count}</strong> items</div>`).join('')}

            <h3>🎯 Key Metrics</h3>
            <div class="stats">
                <div class="performance-metric">Total Response Size: <strong>${(this.results.testResults.reduce((sum, test) => sum + test.responseSize, 0) / 1024 / 1024).toFixed(2)}MB</strong></div>
                <div class="performance-metric">Average Response Size: <strong>${(this.results.testResults.reduce((sum, test) => sum + test.responseSize, 0) / this.results.testResults.length / 1024).toFixed(1)}KB</strong></div>
                <div class="performance-metric">Fastest Load: <strong>${Math.min(...this.results.testResults.map(t => t.loadTime))}ms</strong></div>
                <div class="performance-metric">Slowest Load: <strong>${Math.max(...this.results.testResults.map(t => t.loadTime))}ms</strong></div>
            </div>
        </div>

        <div id="passed" class="content">
            <h2>✅ Passed Tests</h2>
            ${passedTests.map(test => `
                <div class="test-item passed">
                    <h4>${test.title} <span class="status passed">Passed</span> ${test.hasCodeVariations ? '<span class="badge">📝 Has Variations</span>' : ''}</h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>Load Time: <span class="load-time">${test.loadTime}ms</span></span>
                        <span>Response Size: ${(test.responseSize / 1024).toFixed(1)}KB</span>
                        <span>Has Content: ${test.hasContent ? '✅' : '❌'}</span>
                    </div>
                    <div class="url">URL: ${this.storybookUrl}${test.url}</div>
                    ${test.warnings.length > 0 ? `
                        <div class="warning-details">
                            <strong>Warnings (${test.warnings.length}):</strong>
                            ${test.warnings.map(warning => `<div class="error-pattern">${warning.type}</div>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('') || '<p>No passed tests found.</p>'}
        </div>

        <div id="failed" class="content">
            <h2>❌ Failed Tests</h2>
            ${failedTests.map(test => `
                <div class="test-item ${test.status}">
                    <h4>${test.title} <span class="status ${test.status}">${test.status.toUpperCase()}</span></h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>HTTP Status: <strong>${test.httpStatus || 'N/A'}</strong></span>
                        <span>Load Time: ${test.loadTime}ms</span>
                        <span>Response Size: ${(test.responseSize / 1024).toFixed(1)}KB</span>
                    </div>
                    <div class="url">URL: ${this.storybookUrl}${test.url}</div>
                    ${test.errors.length > 0 ? `
                        <div class="error-details">
                            <strong>Errors (${test.errors.length}):</strong>
                            ${test.errors.map(err => `
                                <div style="margin: 10px 0;">
                                    <strong>${err.type}:</strong> ${err.message}
                                    ${err.pattern ? `<div class="error-pattern">${err.pattern}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${test.warnings.length > 0 ? `
                        <div class="warning-details">
                            <strong>Warnings (${test.warnings.length}):</strong>
                            ${test.warnings.map(warning => `<div class="error-pattern">${warning.type}</div>`).join('')}
                        </div>
                    ` : ''}
                </div>
            `).join('') || '<p>No failed tests found! 🎉</p>'}
        </div>

        <div id="variations" class="content">
            <h2>📝 Stories Missing Code Variations</h2>
            ${storiesWithoutVariations.map(test => `
                <div class="test-item">
                    <h4>${test.title}</h4>
                    <div class="stats">
                        <span>Category: ${test.category}</span>
                        <span>Status: <span class="status ${test.status}">${test.status}</span></span>
                        <span>Load Time: ${test.loadTime}ms</span>
                    </div>
                    <div class="info-details">
                        <strong>Recommendation:</strong> This story doesn't have code variations. Consider adding code examples for different implementation patterns to improve developer experience and documentation quality.
                    </div>
                    <div class="url">URL: ${this.storybookUrl}${test.url}</div>
                </div>
            `).join('') || '<p>All stories have code variations! 🎉</p>'}
        </div>

        <div id="performance" class="content">
            <h2>⚡ Performance Analysis</h2>

            <h3>🏆 Fastest Loading Stories</h3>
            ${this.results.testResults
              .filter(t => t.status === 'passed')
              .sort((a, b) => a.loadTime - b.loadTime)
              .slice(0, 10)
              .map(test => `
                <div class="test-item passed">
                    <h4>${test.title} <span class="status passed">${test.loadTime}ms</span></h4>
                    <div class="stats">
                        <span>Response Size: ${(test.responseSize / 1024).toFixed(1)}KB</span>
                        <span>Has Variations: ${test.hasCodeVariations ? '✅' : '❌'}</span>
                    </div>
                </div>
            `).join('') || '<p>No performance data available.</p>'}

            <h3>🐌 Slowest Loading Stories</h3>
            ${this.results.testResults
              .filter(t => t.status === 'passed')
              .sort((a, b) => b.loadTime - a.loadTime)
              .slice(0, 10)
              .map(test => `
                <div class="test-item passed">
                    <h4>${test.title} <span class="status ${test.loadTime > 5000 ? 'failed' : 'passed'}">${test.loadTime}ms</span></h4>
                    <div class="stats">
                        <span>Response Size: ${(test.responseSize / 1024).toFixed(1)}KB</span>
                        <span>Has Variations: ${test.hasCodeVariations ? '✅' : '❌'}</span>
                    </div>
                    ${test.loadTime > 5000 ? '<div class="warning-details"><strong>Performance Issue:</strong> Load time exceeds 5 seconds</div>' : ''}
                </div>
            `).join('') || '<p>No performance data available.</p>'}

            <h3>📦 Largest Responses</h3>
            ${this.results.testResults
              .filter(t => t.status === 'passed')
              .sort((a, b) => b.responseSize - a.responseSize)
              .slice(0, 10)
              .map(test => `
                <div class="test-item passed">
                    <h4>${test.title} <span class="status info">${(test.responseSize / 1024).toFixed(1)}KB</span></h4>
                    <div class="stats">
                        <span>Load Time: ${test.loadTime}ms</span>
                        <span>Has Variations: ${test.hasCodeVariations ? '✅' : '❌'}</span>
                    </div>
                </div>
            `).join('') || '<p>No performance data available.</p>'}
        </div>
    </div>

    <div class="scroll-to-top" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">↑ Top</div>

    <script>
        function showTab(tabName) {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.content').forEach(content => content.classList.remove('active'));
            event.target.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        }

        // Show/hide scroll to top button
        window.addEventListener('scroll', function() {
            const scrollButton = document.querySelector('.scroll-to-top');
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });
    </script>
</body>
</html>`;
  }
}

// Main execution
async function runComprehensiveRegressionTests() {
  const tester = new ComprehensiveRegressionTester();

  try {
    console.log('🧪 Starting Comprehensive Storybook Regression Testing Suite...\n');

    const results = await tester.runAllTests();

    if (results.summary.failedStories > 0) {
      console.log('\n❌ Some tests failed. Check the HTML report for details.');
      process.exit(1);
    } else {
      console.log('\n🎉 All tests passed!');
      process.exit(0);
    }

  } catch (error) {
    console.error('💥 Comprehensive regression testing failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  runComprehensiveRegressionTests();
}

module.exports = { ComprehensiveRegressionTester };