#!/usr/bin/env node

/**
 * Script to help generate code variant templates for components
 * Usage: node scripts/generate-code-variants.js <component-name> <example-name>
 */

const fs = require('fs');
const path = require('path');

function generateTemplate(componentName, exampleName) {
  const template = `
// ${componentName} - ${exampleName}
export const ${camelCase(componentName)}Examples = {
  '${exampleName}': {
    react: \`import {/* components */} from '@shopify/polaris';
import React from 'react';

function ${pascalCase(componentName)}${pascalCase(exampleName)}Example() {
  return (
    // TODO: Add React implementation
    <div>Implement ${componentName} ${exampleName}</div>
  );
}\`,
    extjs: \`Ext.create('Ext.container.Container', {
  // TODO: Add ExtJS implementation
  html: 'Implement ${componentName} ${exampleName}'
});\`,
    vanilla: \`// HTML
<div class="${componentName}">
  <!-- TODO: Add HTML structure -->
  Implement ${componentName} ${exampleName}
</div>

// CSS
.${componentName} {
  /* TODO: Add styles */
}

// JavaScript
// TODO: Add JavaScript behavior\`,
    typescript: \`import {/* components */} from '@shopify/polaris';
import React from 'react';

interface ${pascalCase(componentName)}${pascalCase(exampleName)}Props {
  // TODO: Add props interface
}

function ${pascalCase(componentName)}${pascalCase(exampleName)}Example(
  props: ${pascalCase(componentName)}${pascalCase(exampleName)}Props
): JSX.Element {
  return (
    // TODO: Add TypeScript implementation
    <div>Implement ${componentName} ${exampleName}</div>
  );
}\`
  }
};
`;
  
  return template;
}

function camelCase(str) {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function pascalCase(str) {
  const camel = camelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
}

// Main execution
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node generate-code-variants.js <component-name> <example-name>');
  console.log('Example: node generate-code-variants.js button primary');
  process.exit(1);
}

const [componentName, exampleName] = args;
const template = generateTemplate(componentName, exampleName);

console.log(template);
console.log('\n// Add this to src/utils/codeVariants.ts in the appropriate section');