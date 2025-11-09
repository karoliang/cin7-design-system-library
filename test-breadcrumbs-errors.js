#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing for Breadcrumbs destructuring errors...\n');

// Check the Breadcrumbs component directly
const breadcrumbsPath = path.join(__dirname, 'polaris/polaris-react/src/components/Breadcrumbs/Breadcrumbs.tsx');

if (fs.existsSync(breadcrumbsPath)) {
  const content = fs.readFileSync(breadcrumbsPath, 'utf8');

  console.log('✅ Breadcrumbs component found');

  // Check for defensive programming patterns
  const hasNullCheck = content.includes('if (backAction)');
  const hasDefensiveDestructure = content.includes('const {content} = backAction || {}');
  const hasBreadcrumbFiltering = content.includes('validBreadcrumbs = breadcrumbs.filter');

  console.log(`✅ Has null check for backAction: ${hasNullCheck}`);
  console.log(`✅ Has defensive destructuring: ${hasDefensiveDestructure}`);
  console.log(`✅ Has breadcrumb filtering: ${hasBreadcrumbFiltering}`);

  // Look for any remaining problematic patterns
  const problematicPatterns = [
    /const\s+{\s*content\s*}\s*=\s*backAction(?!\s*\|\|\s*{})/g,
    /backAction\.content(?!\s*\?\?)/g
  ];

  let issuesFound = 0;
  problematicPatterns.forEach((pattern, index) => {
    const matches = content.match(pattern);
    if (matches) {
      console.log(`❌ Issue ${index + 1}: Found ${matches.length} problematic patterns: ${matches[0]}`);
      issuesFound++;
    }
  });

  if (issuesFound === 0) {
    console.log('✅ No problematic destructuring patterns found in Breadcrumbs');
  }

} else {
  console.log('❌ Breadcrumbs component not found');
}

// Check Storybook stories for Breadcrumbs usage
const storiesPath = path.join(__dirname, 'storybook/stories');
if (fs.existsSync(storiesPath)) {
  console.log('\n🔍 Checking Storybook stories for Breadcrumbs usage...');

  const findFiles = (dir, pattern) => {
    const results = [];
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        results.push(...findFiles(filePath, pattern));
      } else if (pattern.test(file)) {
        results.push(filePath);
      }
    });

    return results;
  };

  const storyFiles = findFiles(storiesPath, /\.stories\.tsx?$/);
  let breadcrumbsIssues = 0;

  storyFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');

    // Check for potentially problematic Breadcrumbs usage
    if (content.includes('Breadcrumbs') || content.includes('breadcrumbs')) {
      console.log(`📖 Checking ${path.relative(__dirname, file)}...`);

      // Look for undefined backAction or breadcrumbs props
      const backActionMatches = content.match(/backAction\s*=\s*{[^}]*}/g) || [];
      const breadcrumbsMatches = content.match(/breadcrumbs\s*=\s*{[^}]*}/g) || [];

      backActionMatches.forEach(match => {
        if (match.includes('undefined') || match.includes('backAction:')) {
          console.log(`  ⚠️  Found potentially problematic backAction: ${match}`);
          breadcrumbsIssues++;
        }
      });

      breadcrumbsMatches.forEach(match => {
        if (match.includes('undefined') || match.includes('breadcrumbs:')) {
          console.log(`  ⚠️  Found potentially problematic breadcrumbs: ${match}`);
          breadcrumbsIssues++;
        }
      });

      if (backActionMatches.length === 0 && breadcrumbsMatches.length === 0) {
        console.log(`  ✅ No obvious Breadcrumbs prop issues found`);
      }
    }
  });

  if (breadcrumbsIssues === 0) {
    console.log('✅ No Breadcrumbs prop issues found in stories');
  } else {
    console.log(`❌ Found ${breadcrumbsIssues} potential Breadcrumbs prop issues`);
  }
}

// Check if Storybook build output exists and is recent
const buildPath = path.join(__dirname, 'storybook/storybook-static');
if (fs.existsSync(buildPath)) {
  const stats = fs.statSync(buildPath);
  const buildAge = Date.now() - stats.mtime.getTime();
  const buildAgeMinutes = Math.floor(buildAge / (1000 * 60));

  console.log(`\n📦 Storybook build found (${buildAgeMinutes} minutes old)`);

  if (buildAgeMinutes > 30) {
    console.log('⚠️  Build is more than 30 minutes old - consider rebuilding');
  }
} else {
  console.log('\n📦 No Storybook build found - run "cd storybook && pnpm build" to create one');
}

console.log('\n🎯 Local Storybook is running at: http://localhost:6008');
console.log('🔍 Check the browser console for any remaining errors');