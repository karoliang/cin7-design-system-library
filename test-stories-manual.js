const http = require('http');
const { execSync } = require('child_process');

function checkStorybookHealth() {
    return new Promise((resolve, reject) => {
        const req = http.get('http://localhost:6006', (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', reject);
        req.setTimeout(5000, () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

async function performManualTesting() {
    console.log('🔍 Starting comprehensive Storybook testing...\n');

    // Check if Storybook is running
    try {
        const isHealthy = await checkStorybookHealth();
        if (!isHealthy) {
            throw new Error('Storybook is not responding correctly');
        }
        console.log('✅ Storybook is running and healthy');
    } catch (error) {
        console.error('❌ Storybook health check failed:', error.message);
        return;
    }

    // Get list of all story files
    const storyFiles = [];
    try {
        const output = execSync('find stories -name "*.stories.tsx" -not -path "./node_modules/*" | sort', {
            encoding: 'utf8',
            cwd: process.cwd()
        });
        storyFiles.push(...output.trim().split('\n').filter(Boolean));
    } catch (error) {
        console.error('❌ Failed to get story files:', error.message);
        return;
    }

    console.log(`📚 Found ${storyFiles.length} story files\n`);

    // Group stories by category
    const categories = {};
    storyFiles.forEach(file => {
        const parts = file.split('/');
        if (parts.length >= 3) {
            const category = parts[1]; // stories/[category]/...
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(file);
        }
    });

    console.log('📂 Story Categories:');
    Object.keys(categories).forEach(category => {
        console.log(`  ${category}: ${categories[category].length} stories`);
    });

    // Create manual testing checklist
    const checklist = {
        timestamp: new Date().toISOString(),
        totalStories: storyFiles.length,
        categories: categories,
        testingInstructions: [
            '1. Open http://localhost:6006 in Chrome with DevTools open',
            '2. Navigate to each story category systematically',
            '3. For each story:',
            '   - Check Console tab for errors/warnings',
            '   - Test all interactive elements (buttons, forms, dropdowns)',
            '   - Verify story renders without crashes',
            '   - Check Network tab for failed requests',
            '   - Note any performance issues or slow loading',
            '4. Take screenshots of any issues found',
            '5. Document all findings in the report below'
        ],
        testResults: {}
    };

    // Initialize test results structure
    Object.keys(categories).forEach(category => {
        checklist.testResults[category] = {
            stories: {},
            status: 'pending',
            issues: []
        };
        categories[category].forEach(storyFile => {
            const storyName = storyFile.split('/').pop().replace('.stories.tsx', '');
            checklist.testResults[category].stories[storyName] = {
                file: storyFile,
                loaded: false,
                consoleErrors: [],
                consoleWarnings: [],
                interactiveElements: { buttons: 0, forms: 0, links: 0 },
                performance: { loadTime: 0, issues: [] },
                visualIssues: [],
                notes: ''
            };
        });
    });

    // Save the testing checklist
    const fs = require('fs');
    fs.writeFileSync('storybook-testing-checklist.json', JSON.stringify(checklist, null, 2));

    console.log('\n📋 Testing checklist created: storybook-testing-checklist.json');
    console.log('\n🎯 CRITICAL AREAS TO TEST:');

    // Highlight critical categories
    const criticalCategories = ['polaris', 'foundation', 'guides'];
    criticalCategories.forEach(category => {
        if (categories[category]) {
            console.log(`\n🔴 ${category.toUpperCase()} (${categories[category].length} stories):`);
            categories[category].forEach(story => {
                const storyName = story.split('/').pop();
                console.log(`   - ${storyName}`);
            });
        }
    });

    console.log('\n⚠️  PAY SPECIAL ATTENTION TO:');
    console.log('   - Form components (Button, TextField, Checkbox, etc.)');
    console.log('   - Layout components (Card, Grid, Stack components)');
    console.log('   - Navigation components (Navigation, Tabs, Breadcrumbs)');
    console.log('   - Interactive components (Modal, Popover, Dropdown)');
    console.log('   - Data display components (DataTable, ResourceList)');
    console.log('   - Foundation components and guides');

    console.log('\n📊 EXPECTED ISSUES TO LOOK FOR:');
    console.log('   - React errors in console');
    console.log('   - Missing dependencies or imports');
    console.log('   - Broken component rendering');
    console.log('   - Failed network requests');
    console.log('   - Slow loading or performance issues');
    console.log('   - Accessibility warnings');
    console.log('   - TypeScript errors');

    console.log('\n🚀 START MANUAL TESTING NOW:');
    console.log('   Open: http://localhost:6006');
    console.log('   Use the checklist file to track progress');
}

// Run the manual testing preparation
performManualTesting().catch(console.error);