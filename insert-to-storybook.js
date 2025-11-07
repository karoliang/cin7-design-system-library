#!/usr/bin/env node
/**
 * Insert extracted component examples into Storybook codeVariants.ts
 */
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = '/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library';
const STORYBOOK_CODE_VARIANTS = path.join(PROJECT_ROOT, 'storybook/.storybook/blocks/codeVariants.ts');
const EXTRACTED_JSON = path.join(PROJECT_ROOT, 'extracted-components.json');

// Read extracted components
const extracted = JSON.parse(fs.readFileSync(EXTRACTED_JSON, 'utf-8'));

// Read current storybook codeVariants
let storybookContent = fs.readFileSync(STORYBOOK_CODE_VARIANTS, 'utf-8');

// Components to insert (these have actual examples in docs)
const componentsToInsert = [
  'buttonGroup',
  'tabs',
  'actionList',
  'navigation',
  'link',
  'pagination',
  'contextualSaveBar',
  'fullscreenBar',
  'topBar'
];

// Find the position to insert (before the getCodeVariants function)
const getCodeVariantsPos = storybookContent.indexOf('export function getCodeVariants(');
if (getCodeVariantsPos === -1) {
  console.error('Could not find getCodeVariants function');
  process.exit(1);
}

// Build the new exports
let newExports = '\n// Navigation & Actions Components\n';

componentsToInsert.forEach(componentName => {
  if (extracted[componentName]) {
    // Add TypeScript type annotation
    newExports += `\n// ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} Examples\n`;
    newExports += extracted[componentName] + '\n';
  }
});

// Insert before getCodeVariants
const beforeFunction = storybookContent.substring(0, getCodeVariantsPos);
const functionAndAfter = storybookContent.substring(getCodeVariantsPos);

// Combine
let newContent = beforeFunction + newExports + '\n' + functionAndAfter;

// Update the getCodeVariants function to include new components
const examplesObjectMatch = newContent.match(/const examples: Record<string, Record<string, CodeVariant>> = \{([^}]+)\}/s);
if (examplesObjectMatch) {
  const currentExamples = examplesObjectMatch[1];

  // Add new components to the mapping
  const newMappings = componentsToInsert
    .filter(name => extracted[name])
    .map(name => `    ${name.toLowerCase()}: ${name}Examples`)
    .join(',\n');

  const updatedExamples = currentExamples.trimEnd() + ',\n' + newMappings;

  newContent = newContent.replace(
    /const examples: Record<string, Record<string, CodeVariant>> = \{[^}]+\}/s,
    `const examples: Record<string, Record<string, CodeVariant>> = {${updatedExamples}\n  }`
  );
}

// Write back
fs.writeFileSync(STORYBOOK_CODE_VARIANTS, newContent, 'utf-8');

console.log('✓ Successfully inserted component examples into Storybook codeVariants.ts');
console.log(`  Added ${componentsToInsert.filter(n => extracted[n]).length} components:`,
  componentsToInsert.filter(n => extracted[n]).join(', '));
