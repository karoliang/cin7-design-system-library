const puppeteer = require('puppeteer');

async function testStorybook() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Enable console logging
  page.on('console', msg => {
    console.log('Console:', msg.type(), msg.text());
  });

  page.on('pageerror', error => {
    console.error('Page error:', error.message);
  });

  // Test URLs to check
  const testUrls = [
    'http://localhost:6007',
    'http://localhost:6007/?path=/docs/cin7-dsl-enterprise-components-extjs-advanced-forms--docs',
    'http://localhost:6007/?path=/story/cin7-dsl-enterprise-components-extjs-advanced-forms--multi-step-wizard',
    'http://localhost:6007/?path=/story/cin7-dsl-charts-linechart--default',
    'http://localhost:6007/?path=/story/cin7-dsl-charts-barchart--default',
    'http://localhost:6007/?path=/story/cin7-dsl-charts-piechart--default'
  ];

  for (const url of testUrls) {
    console.log(`\n=== Testing: ${url} ===`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Check if the page loaded successfully
      const title = await page.title();
      console.log('Page title:', title);

      // Look for error messages
      const errorElements = await page.$$eval('.sb-errordisplay', els =>
        els.map(el => el.textContent)
      );

      if (errorElements.length > 0) {
        console.log('Error elements found:', errorElements);
      }

      // Look for "No Preview" messages
      const noPreview = await page.$eval('.sb-preview', el =>
        el.textContent.includes('No Preview')
      ).catch(() => false);

      if (noPreview) {
        console.log('FOUND "No Preview" message');
      }

      // Check for actual content
      const hasContent = await page.$eval('#storybook-root', el =>
        el.children.length > 0
      ).catch(() => false);

      console.log('Has content:', hasContent);

      // Wait a bit for any dynamic content
      await page.waitForTimeout(2000);

    } catch (error) {
      console.error('Error loading page:', error.message);
    }
  }

  await browser.close();
}

testStorybook().catch(console.error);