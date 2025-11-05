const puppeteer = require('puppeteer');
const fs = require('fs');

async function performStorybookRegressionTest() {
    const browser = await puppeteer.launch({
        headless: false, // Set to false to see the browser
        devtools: true
    });

    const page = await browser.newPage();

    // Capture console logs
    const consoleMessages = [];
    page.on('console', msg => {
        consoleMessages.push({
            type: msg.type(),
            text: msg.text(),
            location: msg.location()
        });
    });

    // Capture page errors
    const pageErrors = [];
    page.on('pageerror', error => {
        pageErrors.push({
            message: error.message,
            stack: error.stack
        });
    });

    // Capture network requests
    const networkRequests = [];
    page.on('request', request => {
        networkRequests.push({
            url: request.url(),
            method: request.method(),
            timestamp: Date.now()
        });
    });

    console.log('🚀 Starting Storybook regression test...');

    try {
        // Navigate to Storybook
        await page.goto('http://localhost:6006', { waitUntil: 'networkidle2' });
        console.log('✅ Storybook loaded successfully');

        // Wait for the page to fully load
        await page.waitForTimeout(3000);

        // Try to find all story links
        const storyLinks = await page.evaluate(() => {
            const links = [];
            // Look for story links in the sidebar
            const storyElements = document.querySelectorAll('[data-testid="sidebar-element"]');
            storyElements.forEach(el => {
                const link = el.querySelector('a');
                if (link) {
                    links.push({
                        title: link.textContent.trim(),
                        href: link.href
                    });
                }
            });
            return links;
        });

        console.log(`📚 Found ${storyLinks.length} story links`);

        // Test each story
        const results = [];
        for (let i = 0; i < Math.min(storyLinks.length, 20); i++) { // Limit to first 20 for testing
            const story = storyLinks[i];
            console.log(`\n🔍 Testing story ${i + 1}: ${story.title}`);

            // Clear console messages for this story
            const storyConsoleMessages = [];
            page.removeAllListeners('console');
            page.on('console', msg => {
                storyConsoleMessages.push({
                    type: msg.type(),
                    text: msg.text(),
                    location: msg.location()
                });
            });

            try {
                // Navigate to the story
                await page.goto(story.href, { waitUntil: 'networkidle2' });
                await page.waitForTimeout(2000); // Wait for story to load

                // Take screenshot
                const screenshot = await page.screenshot({
                    encoding: 'base64',
                    fullPage: false
                });

                // Check for errors
                const storyErrors = await page.evaluate(() => {
                    const errorElements = document.querySelectorAll('[data-testid="error-message"]');
                    return Array.from(errorElements).map(el => el.textContent.trim());
                });

                // Check if story rendered successfully
                const hasContent = await page.evaluate(() => {
                    const storyElement = document.querySelector('#storybook-root');
                    return storyElement && storyElement.children.length > 0;
                });

                // Test interactive elements
                const interactiveElements = await page.evaluate(() => {
                    const buttons = document.querySelectorAll('button:not([disabled])');
                    const inputs = document.querySelectorAll('input:not([disabled])');
                    const links = document.querySelectorAll('a[href]');

                    return {
                        buttons: buttons.length,
                        inputs: inputs.length,
                        links: links.length
                    };
                });

                const result = {
                    storyTitle: story.title,
                    url: story.href,
                    success: hasContent && storyErrors.length === 0,
                    errors: storyErrors,
                    consoleMessages: storyConsoleMessages.filter(msg => msg.type === 'error' || msg.type === 'warning'),
                    interactiveElements,
                    screenshot: screenshot.substring(0, 1000) + '...' // Truncated for output
                };

                results.push(result);
                console.log(`${result.success ? '✅' : '❌'} ${story.title} - ${result.success ? 'Success' : 'Failed'}`);

                if (result.consoleMessages.length > 0) {
                    console.log(`  ⚠️  ${result.consoleMessages.length} console warnings/errors`);
                }

            } catch (error) {
                console.log(`❌ Failed to load ${story.title}: ${error.message}`);
                results.push({
                    storyTitle: story.title,
                    url: story.href,
                    success: false,
                    errors: [error.message],
                    consoleMessages: [],
                    interactiveElements: { buttons: 0, inputs: 0, links: 0 }
                });
            }
        }

        // Generate report
        const report = {
            timestamp: new Date().toISOString(),
            totalStories: storyLinks.length,
            testedStories: results.length,
            successfulStories: results.filter(r => r.success).length,
            failedStories: results.filter(r => !r.success).length,
            storiesWithConsoleErrors: results.filter(r => r.consoleMessages.length > 0).length,
            allConsoleMessages: consoleMessages,
            pageErrors: pageErrors,
            results: results
        };

        // Save report
        fs.writeFileSync('storybook-test-report.json', JSON.stringify(report, null, 2));

        // Print summary
        console.log('\n📊 Test Summary:');
        console.log(`Total Stories Found: ${report.totalStories}`);
        console.log(`Stories Tested: ${report.testedStories}`);
        console.log(`✅ Successful: ${report.successfulStories}`);
        console.log(`❌ Failed: ${report.failedStories}`);
        console.log(`⚠️  Stories with Console Issues: ${report.storiesWithConsoleErrors}`);

        if (report.pageErrors.length > 0) {
            console.log(`\n🚨 Page Errors (${report.pageErrors.length}):`);
            report.pageErrors.forEach((error, i) => {
                console.log(`  ${i + 1}. ${error.message}`);
            });
        }

        console.log('\n📄 Detailed report saved to storybook-test-report.json');

    } catch (error) {
        console.error('❌ Test failed:', error);
    } finally {
        await browser.close();
    }
}

// Check if puppeteer is available
try {
    require.resolve('puppeteer');
    performStorybookRegressionTest();
} catch (e) {
    console.log('❌ Puppeteer not found. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install puppeteer', { stdio: 'inherit' });
    performStorybookRegressionTest();
}