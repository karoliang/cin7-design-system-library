#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to remove 'polaris-' prefix from CSS classes in codeVariants.ts
 * This makes the CSS cleaner and more framework-agnostic
 */

const codeVariantsPath = path.join(__dirname, '../polaris/polaris.shopify.com/src/utils/codeVariants.ts');

// Read the file
const content = fs.readFileSync(codeVariantsPath, 'utf-8');

// Replace polaris- prefix in class names
let updatedContent = content
  // Replace class="polaris-*" with class="*"
  .replace(/class="polaris-/g, 'class="')
  // Replace .polaris-* selectors with .*
  .replace(/\.polaris-/g, '.')
  // Replace 'polaris-* ' in JavaScript selectors
  .replace(/'polaris-/g, "'")
  .replace(/"polaris-/g, '"');

// Write back
fs.writeFileSync(codeVariantsPath, updatedContent);

console.log('✅ Removed polaris- prefix from CSS classes in codeVariants.ts');