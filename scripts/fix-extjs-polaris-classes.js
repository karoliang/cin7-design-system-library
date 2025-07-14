#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to remove 'polaris-' prefix from ExtJS examples in codeVariants.ts
 * This ensures ExtJS examples don't depend on Polaris CSS classes
 */

const codeVariantsPath = path.join(__dirname, '../polaris/polaris.shopify.com/src/utils/codeVariants.ts');

// Read the file
let content = fs.readFileSync(codeVariantsPath, 'utf-8');

// Replace Polaris classes in ExtJS examples
const replacements = [
  // Text classes
  { from: /Polaris-Text--headingSm/g, to: 'text-heading-sm' },
  { from: /Polaris-Text--bodyMd/g, to: 'text-body-md' },
  { from: /Polaris-Text--headingMd/g, to: 'text-heading-md' },
  { from: /Polaris-Text--bodyLg/g, to: 'text-body-lg' },
  
  // Badge classes  
  { from: /polaris-badge--critical/g, to: 'badge--critical' },
  { from: /polaris-badge--success/g, to: 'badge--success' },
  { from: /polaris-badge--warning/g, to: 'badge--warning' },
  { from: /polaris-badge--info/g, to: 'badge--info' },
  { from: /polaris-badge--attention/g, to: 'badge--attention' },
  { from: /polaris-badge--new/g, to: 'badge--new' },
  { from: /polaris-badge--incomplete/g, to: 'badge--incomplete' },
  { from: /polaris-badge--partiallyComplete/g, to: 'badge--partially-complete' },
  { from: /polaris-badge--complete/g, to: 'badge--complete' },
  { from: /polaris-badge/g, to: 'badge' },
  
  // Other common classes
  { from: /polaris-button/g, to: 'button' },
  { from: /polaris-card/g, to: 'card' },
  { from: /polaris-stack/g, to: 'stack' },
  { from: /polaris-inline/g, to: 'inline' },
  { from: /polaris-/g, to: '' } // Catch-all for any remaining
];

// Apply replacements only in ExtJS sections
let lines = content.split('\n');
let inExtJsSection = false;
let updatedLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Check if we're entering or leaving an ExtJS section
  if (line.includes('extjs: `')) {
    inExtJsSection = true;
  } else if (inExtJsSection && line.includes('`,')) {
    inExtJsSection = false;
  }
  
  // Apply replacements only in ExtJS sections
  if (inExtJsSection) {
    replacements.forEach(({ from, to }) => {
      line = line.replace(from, to);
    });
  }
  
  updatedLines.push(line);
}

content = updatedLines.join('\n');

// Write back
fs.writeFileSync(codeVariantsPath, content);

console.log('✅ Removed polaris- prefix from ExtJS examples in codeVariants.ts');