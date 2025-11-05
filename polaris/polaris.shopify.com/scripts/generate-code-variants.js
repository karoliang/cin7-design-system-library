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
    extjs: \`// ExtJS implementation for ${componentName} - ${exampleName}
import { Ext${pascalCase(componentName)} } from '@cin7/extjs-adapters';

// Component configuration
const config = {
  // TODO: Configure component properties
  cls: ['cin7-${componentName}', 'cin7-${componentName}--${exampleName}'],
  style: {
    // TODO: Add component-specific styles
  },
  listeners: {
    // TODO: Add event handlers
    afterrender: function(cmp) {
      // Component initialization logic
    }
  }
};

// Create component using the Cin7 DSL ExtJS adapter
const ${camelCase(componentName)} = Ext${pascalCase(componentName)}.create(config);

// Export for use in application
export { ${camelCase(componentName)} };\`,
    vanilla: \`// HTML
<div class="${componentName}">
  <div class="${componentName}__container">
    <div class="${componentName}__header">
      <h2 class="${componentName}__title" id="${componentName}-${exampleName}-title">
        ${pascalCase(exampleName)} ${pascalCase(componentName)}
      </h2>
      <div class="${componentName}__actions" role="toolbar" aria-label="${componentName} actions">
        <!-- Action buttons/controls go here -->
      </div>
    </div>

    <div class="${componentName}__content">
      <div class="${componentName}__body">
        <!-- Main content area -->
        <p class="${componentName}__description">
          This is the ${exampleName} variant of the ${componentName} component.
        </p>

        <div class="${componentName}__main" role="main">
          <!-- Primary content elements go here -->
        </div>
      </div>

      <aside class="${componentName}__sidebar" role="complementary">
        <!-- Secondary content/side panel -->
      </aside>
    </div>

    <footer class="${componentName}__footer">
      <div class="${componentName}__status" role="status" aria-live="polite">
        <!-- Status messages go here -->
      </div>
      <div class="${componentName}__meta">
        <!-- Metadata or additional information -->
      </div>
    </footer>
  </div>

  <!-- Loading state (initially hidden) -->
  <div class="${componentName}__loading" aria-hidden="true">
    <div class="${componentName}__spinner" aria-label="Loading"></div>
    <span class="${componentName}__loading-text">Loading...</span>
  </div>

  <!-- Error state (initially hidden) -->
  <div class="${componentName}__error" aria-hidden="true" role="alert">
    <p class="${componentName}__error-message">
      An error occurred. Please try again.
    </p>
    <button class="${componentName}__retry-btn" type="button">
      Retry
    </button>
  </div>
</div>

// CSS
.${componentName} {
  /* TODO: Add styles */
}

// JavaScript
import { $, on, addClass, removeClass, toggleClass } from '@cin7/vanilla-js';

// Initialize component
const init${pascalCase(componentName)} = () => {
  const elements = document.querySelectorAll('.${componentName}');

  elements.forEach(element => {
    // Add event listeners
    on(element, 'click', handleClick);
    on(element, 'mouseenter', handleMouseEnter);
    on(element, 'mouseleave', handleMouseLeave);

    // Initialize component state
    element.dataset.initialized = 'true';
  });
};

// Event handlers
const handleClick = (event) => {
  const element = event.currentTarget;
  toggleClass(element, '${componentName}--active');

  // Emit custom event for cross-layer communication
  element.dispatchEvent(new CustomEvent('${componentName}:click', {
    detail: { element, timestamp: Date.now() }
  }));
};

const handleMouseEnter = (event) => {
  addClass(event.currentTarget, '${componentName}--hover');
};

const handleMouseLeave = (event) => {
  removeClass(event.currentTarget, '${componentName}--hover');
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init${pascalCase(componentName)});
} else {
  init${pascalCase(componentName)}();
}\`,
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