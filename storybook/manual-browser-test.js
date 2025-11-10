const { spawn } = require('child_process');
const http = require('http');

function checkStorybookStatus() {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:6007', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(5000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function openChromeWithRemoteDebugging() {
  const isRunning = await checkStorybookStatus();

  if (!isRunning) {
    console.log('❌ Storybook is not running on http://localhost:6007');
    console.log('Please start Storybook with: cd storybook && pnpm dev');
    return;
  }

  console.log('✅ Storybook is running');
  console.log('🚀 Opening Chrome with remote debugging...');
  console.log('📝 Instructions:');
  console.log('   1. Chrome will open with remote debugging enabled');
  console.log('   2. Open Developer Tools (F12 or Cmd+Option+I)');
  console.log('   3. Go to Console tab');
  console.log('   4. Navigate to these URLs and capture any console errors:');
  console.log('');
  console.log('   Frame components:');
  console.log('   - http://localhost:6007/?path=/docs/layout-frame--docs');
  console.log('   - http://localhost:6007/?path=/story/layout-frame-with-logo');
  console.log('   - http://localhost:6007/?path=/story/layout-frame-with-notifications');
  console.log('   - http://localhost:6007/?path=/story/layout-frame-ecommerce-layout');
  console.log('   - http://localhost:6007/?path=/story/layout-frame-minimal-layout');
  console.log('   - http://localhost:6007/?path=/story/layout-frame-responsive-behavior');
  console.log('');
  console.log('   Breadcrumbs components:');
  console.log('   - http://localhost:6007/?path=/docs/navigation-breadcrumbs--docs');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-short-path');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-long-path');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-product-navigation');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-ecommerce-navigation');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-admin-panel');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-documentation-site');
  console.log('   - http://localhost:6007/?path=/story/navigation-breadcrumbs-many-items');
  console.log('');
  console.log('   🔍 Look specifically for:');
  console.log('   - "SyntaxError: The requested module ... does not provide an export named \'default\'"');
  console.log('   - "No theme was provided" errors');
  console.log('   - "Cannot destructure property" errors');
  console.log('   - React Error #31 messages');
  console.log('   - Any PropTypes import errors');
  console.log('   - Module resolution failures');
  console.log('');
  console.log('   ⏱️  Wait 10 seconds on each page for async errors to appear');
  console.log('   📸 Take screenshots of any errors you find');

  // Open Chrome with remote debugging
  const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
    '--remote-debugging-port=9222',
    '--user-data-dir=/tmp/chrome-debug-storybook',
    '--disable-web-security',
    '--disable-features=IsolateOrigins,site-per-process',
    'http://localhost:6007'
  ]);

  chrome.on('error', (err) => {
    console.log('❌ Failed to open Chrome:', err.message);
    console.log('💡 Please manually open Chrome and navigate to: http://localhost:6007');
    console.log('   Then follow the instructions above to test the components.');
  });

  chrome.on('close', (code) => {
    console.log(`Chrome process exited with code ${code}`);
  });

  // Wait a bit and then provide additional instructions
  setTimeout(() => {
    console.log('\n🎯 Browser should now be open. Start testing the URLs listed above!');
    console.log('💡 Tip: You can also access Chrome DevTools at: http://localhost:9222');
  }, 3000);
}

// Alternative: Use system open command if Chrome spawn fails
function openWithSystemCommand() {
  const { exec } = require('child_process');

  console.log('🚀 Opening Storybook in default browser...');
  console.log('📝 Instructions:');
  console.log('   1. Open Developer Tools (F12 or Cmd+Option+I)');
  console.log('   2. Go to Console tab');
  console.log('   3. Test the URLs listed in the previous message');
  console.log('   4. Capture any console errors you see');

  exec('open http://localhost:6007', (error) => {
    if (error) {
      console.log('❌ Failed to open browser automatically');
      console.log('💡 Please manually open: http://localhost:6007');
    } else {
      console.log('✅ Browser opened successfully');
    }
  });
}

// Try the Chrome approach first, fall back to system command
openChromeWithRemoteDebugging().catch(() => {
  console.log('⚠️  Chrome launch failed, trying system command...');
  openWithSystemCommand();
});