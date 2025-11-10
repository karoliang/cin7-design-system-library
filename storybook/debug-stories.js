const fs = require('fs');
const path = require('path');

// Function to check for specific patterns in story files
function debugStoryFiles() {
  const storiesDir = path.join(__dirname, 'stories');

  console.log('🔍 DEBUGGING STORY FILES');
  console.log('='.repeat(50));

  // Check Frame story
  const framePath = path.join(storiesDir, 'components', 'navigation', 'Frame.stories.tsx');
  console.log('\n📦 Frame Story Analysis:');

  if (fs.existsSync(framePath)) {
    const frameContent = fs.readFileSync(framePath, 'utf8');

    console.log(`   ✅ File exists: ${framePath}`);
    console.log(`   📏 File size: ${frameContent.length} characters`);

    // Check for critical patterns
    const checks = [
      { name: 'Frame import', pattern: /import.*Frame.*from/ },
      { name: 'AppProvider import', pattern: /import.*AppProvider.*from/ },
      { name: 'Meta export', pattern: /const meta.*=/ },
      { name: 'Title in meta', pattern: /title.*:/ },
      { name: 'Component in meta', pattern: /component.*:/ },
      { name: 'Decorators in meta', pattern: /decorators.*:/ },
      { name: 'AppProvider in decorators', pattern: /AppProvider/ },
      { name: 'Story export', pattern: /export const.*Story/ },
      { name: 'Default story', pattern: /export const Default/ },
      { name: 'Error boundary', pattern: /ErrorBoundary/ },
      { name: 'Theme configuration', pattern: /theme.*{/ }
    ];

    checks.forEach(check => {
      const found = check.pattern.test(frameContent);
      console.log(`   ${found ? '✅' : '❌'} ${check.name}: ${found ? 'Found' : 'Not found'}`);
    });

    // Look for potential issues
    console.log('\n   🔍 Potential Issues:');
    if (frameContent.includes('require(')) {
      console.log('   ⚠️  Contains require() calls');
    }
    if (frameContent.includes('PropTypes')) {
      console.log('   ⚠️  Contains PropTypes references');
    }
    if (frameContent.includes('console.error')) {
      console.log('   ⚠️  Contains console.error calls');
    }

  } else {
    console.log(`   ❌ File not found: ${framePath}`);
  }

  // Check Breadcrumbs story
  const breadcrumbsPath = path.join(storiesDir, 'components', 'navigation', 'Breadcrumbs.stories.tsx');
  console.log('\n📦 Breadcrumbs Story Analysis:');

  if (fs.existsSync(breadcrumbsPath)) {
    const breadcrumbsContent = fs.readFileSync(breadcrumbsPath, 'utf8');

    console.log(`   ✅ File exists: ${breadcrumbsPath}`);
    console.log(`   📏 File size: ${breadcrumbsContent.length} characters`);

    // Check for critical patterns
    const checks = [
      { name: 'Breadcrumbs import', pattern: /import.*Breadcrumbs.*from/ },
      { name: 'AppProvider import', pattern: /import.*AppProvider.*from/ },
      { name: 'Meta export', pattern: /const meta.*=/ },
      { name: 'Title in meta', pattern: /title.*:/ },
      { name: 'Component in meta', pattern: /component.*:/ },
      { name: 'Decorators in meta', pattern: /decorators.*:/ },
      { name: 'AppProvider in decorators', pattern: /AppProvider/ },
      { name: 'Story export', pattern: /export const.*Story/ },
      { name: 'Default story', pattern: /export const Default/ },
      { name: 'Error boundary', pattern: /ErrorBoundary/ },
      { name: 'Theme configuration', pattern: /theme.*{/ }
    ];

    checks.forEach(check => {
      const found = check.pattern.test(breadcrumbsContent);
      console.log(`   ${found ? '✅' : '❌'} ${check.name}: ${found ? 'Found' : 'Not found'}`);
    });

    // Look for potential issues
    console.log('\n   🔍 Potential Issues:');
    if (breadcrumbsContent.includes('require(')) {
      console.log('   ⚠️  Contains require() calls');
    }
    if (breadcrumbsContent.includes('PropTypes')) {
      console.log('   ⚠️  Contains PropTypes references');
    }
    if (breadcrumbsContent.includes('console.error')) {
      console.log('   ⚠️  Contains console.error calls');
    }

  } else {
    console.log(`   ❌ File not found: ${breadcrumbsPath}`);
  }
}

// Function to check codeVariants dependencies
function debugCodeVariants() {
  console.log('\n🔍 DEBUGGING CODEVARIANTS DEPENDENCIES');
  console.log('='.repeat(50));

  const codeVariantsPath = path.join(__dirname, '.storybook', 'blocks', 'codeVariants.ts');

  if (fs.existsSync(codeVariantsPath)) {
    console.log(`   ✅ codeVariants.ts exists`);

    try {
      // Try to require the index file
      const indexPath = path.join(__dirname, '.storybook', 'blocks', 'codeVariants', 'index.ts');
      if (fs.existsSync(indexPath)) {
        console.log(`   ✅ index.ts exists`);

        // Check navigation module specifically
        const navPath = path.join(__dirname, '.storybook', 'blocks', 'codeVariants', 'navigation.ts');
        if (fs.existsSync(navPath)) {
          console.log(`   ✅ navigation.ts exists`);
          const navContent = fs.readFileSync(navPath, 'utf8');
          const hasFrame = navContent.includes('frame');
          const hasBreadcrumbs = navContent.includes('breadcrumbs');
          console.log(`   📦 Has frame examples: ${hasFrame ? '✅' : '❌'}`);
          console.log(`   📦 Has breadcrumbs examples: ${hasBreadcrumbs ? '✅' : '❌'}`);
        } else {
          console.log(`   ❌ navigation.ts not found`);
        }
      } else {
        console.log(`   ❌ index.ts not found`);
      }
    } catch (error) {
      console.log(`   ❌ Error accessing codeVariants: ${error.message}`);
    }
  } else {
    console.log(`   ❌ codeVariants.ts not found`);
  }
}

// Function to check story structure
function debugStoryStructure() {
  console.log('\n🔍 DEBUGGING STORY STRUCTURE');
  console.log('='.repeat(50));

  const framePath = path.join(__dirname, 'stories', 'components', 'navigation', 'Frame.stories.tsx');

  if (fs.existsSync(framePath)) {
    const content = fs.readFileSync(framePath, 'utf8');

    // Extract story names
    const storyMatches = content.match(/export const (\w+): Story/g);
    if (storyMatches) {
      console.log('\n   📝 Found Frame stories:');
      storyMatches.forEach(match => {
        const storyName = match.match(/export const (\w+): Story/)[1];
        console.log(`     • ${storyName}`);
      });
    }

    // Check if stories use proper parameters
    const hasCodeVariants = content.includes('codeVariants:');
    const hasGetCodeVariants = content.includes('getCodeVariants(');
    console.log(`\n   🔧 Code variants configured: ${hasCodeVariants ? '✅' : '❌'}`);
    console.log(`   🔧 getCodeVariants calls: ${hasGetCodeVariants ? '✅' : '❌'}`);

    // Check for any obvious syntax errors
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    console.log(`   🔢 Brace balance: ${openBraces} open, ${closeBraces} close`);

    if (openBraces !== closeBraces) {
      console.log(`   ⚠️  Unbalanced braces detected`);
    }
  }

  const breadcrumbsPath = path.join(__dirname, 'stories', 'components', 'navigation', 'Breadcrumbs.stories.tsx');

  if (fs.existsSync(breadcrumbsPath)) {
    const content = fs.readFileSync(breadcrumbsPath, 'utf8');

    // Extract story names
    const storyMatches = content.match(/export const (\w+): Story/g);
    if (storyMatches) {
      console.log('\n   📝 Found Breadcrumbs stories:');
      storyMatches.forEach(match => {
        const storyName = match.match(/export const (\w+): Story/)[1];
        console.log(`     • ${storyName}`);
      });
    }

    // Check if stories use proper parameters
    const hasCodeVariants = content.includes('codeVariants:');
    const hasGetCodeVariants = content.includes('getCodeVariants(');
    console.log(`\n   🔧 Code variants configured: ${hasCodeVariants ? '✅' : '❌'}`);
    console.log(`   🔧 getCodeVariants calls: ${hasGetCodeVariants ? '✅' : '❌'}`);

    // Check for any obvious syntax errors
    const openBraces = (content.match(/{/g) || []).length;
    const closeBraces = (content.match(/}/g) || []).length;
    console.log(`   🔢 Brace balance: ${openBraces} open, ${closeBraces} close`);

    if (openBraces !== closeBraces) {
      console.log(`   ⚠️  Unbalanced braces detected`);
    }
  }
}

// Run all debugging functions
function runAllDebugging() {
  debugStoryFiles();
  debugCodeVariants();
  debugStoryStructure();

  console.log('\n🎯 DEBUGGING SUMMARY');
  console.log('='.repeat(50));
  console.log('📝 Next steps:');
  console.log('   1. Check if story files have proper syntax');
  console.log('   2. Verify codeVariants module is working');
  console.log('   3. Check Storybook console for specific errors');
  console.log('   4. Test with simpler story structure');
}

if (require.main === module) {
  runAllDebugging();
}

module.exports = { debugStoryFiles, debugCodeVariants, debugStoryStructure };