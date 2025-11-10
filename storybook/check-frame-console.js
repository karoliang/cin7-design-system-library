const puppeteer = require('puppeteer');

async function checkFrameConsole() {
  console.log('🔍 Checking Frame components for console warnings...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();

    const warnings = [];
    const errors = [];
    const propTypesWarnings = [];

    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();

      if (type === 'warning') {
        warnings.push(text);
        if (text.includes('prop') || text.includes('PropTypes')) {
          propTypesWarnings.push(text);
        }
      }
      if (type === 'error') {
        errors.push(text);
      }
    });

    page.on('pageerror', (error) => {
      errors.push(`Page Error: ${error.message}`);
    });

    const FRAME_VARIATIONS = [
      'default',
      'with-logo',
      'with-notifications',
      'ecommerce-layout',
      'minimal-layout',
      'responsive-behavior'
    ];

    for (const variation of FRAME_VARIATIONS) {
      console.log(`🧪 Testing: ${variation}`);

      try {
        const url = `http://localhost:6006/iframe.html?id=examples-frame--${variation}&args=&viewMode=story`;
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
        await page.waitForTimeout(2000);

        console.log(`   ✅ Loaded successfully`);

      } catch (error) {
        console.log(`   ❌ Failed to load: ${error.message}`);
      }
    }

    console.log('\n📊 CONSOLE ANALYSIS RESULTS');
    console.log('===========================');
    console.log(`🚨 Total errors: ${errors.length}`);
    console.log(`⚠️  Total warnings: ${warnings.length}`);
    console.log(`🔧 PropTypes warnings: ${propTypesWarnings.length}`);

    if (propTypesWarnings.length > 0) {
      console.log('\n🔧 PROP-TYPES WARNINGS:');
      propTypesWarnings.forEach((w, i) => {
        console.log(`${i + 1}. ${w}`);
      });
    }

    if (errors.length > 0) {
      console.log('\n🚨 ERRORS:');
      errors.forEach((e, i) => {
        console.log(`${i + 1}. ${e}`);
      });
    }

    if (warnings.length > propTypesWarnings.length) {
      console.log('\n⚠️  OTHER WARNINGS:');
      warnings.filter(w => !propTypesWarnings.includes(w)).forEach((w, i) => {
        console.log(`${i + 1}. ${w}`);
      });
    }

    if (errors.length === 0 && propTypesWarnings.length === 0) {
      console.log('\n🎉 SUCCESS: No errors or PropTypes warnings found!');
      console.log('✅ Frame components are working correctly');
    } else {
      console.log('\n⚠️  Some issues found that may need attention');
    }

  } finally {
    await browser.close();
  }
}

checkFrameConsole().catch(console.error);