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
  /* Layout & Positioning */
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 100%;
  min-height: 200px;

  /* Spacing */
  padding: var(--p-space-5, 20px);
  margin: var(--p-space-3, 12px);
  gap: var(--p-space-4, 16px);

  /* Typography */
  font-family: var(--p-font-family-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
  font-size: var(--p-font-size-md, 14px);
  font-weight: var(--p-font-weight-regular, 400);
  line-height: var(--p-line-height-md, 1.5);
  color: var(--p-color-text, #212b36);

  /* Visual */
  background-color: var(--p-color-surface, #ffffff);
  border: 1px solid var(--p-color-border, #dfe3e8);
  border-radius: var(--p-border-radius-base, 4px);
  box-shadow: var(--p-shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));

  /* Transitions */
  transition: all var(--p-duration-150, 150ms) var(--p-ease-in-out, ease-in-out);

  /* Sub-components */
  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: var(--p-space-4, 16px);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: var(--p-space-3, 12px);
    border-bottom: 1px solid var(--p-color-border-subdued, #e1e3e5);
  }

  &__title {
    margin: 0;
    font-size: var(--p-font-size-lg, 16px);
    font-weight: var(--p-font-weight-semibold, 600);
    color: var(--p-color-text, #212b36);
  }

  &__actions {
    display: flex;
    gap: var(--p-space-2, 8px);
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: var(--p-space-5, 20px);
    flex: 1;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--p-space-4, 16px);
  }

  &__description {
    margin: 0;
    color: var(--p-color-text-subdued, #637381);
    font-size: var(--p-font-size-sm, 12px);
    line-height: var(--p-line-height-md, 1.5);
  }

  &__sidebar {
    background-color: var(--p-color-surface-subdued, #f9fafb);
    border-radius: var(--p-border-radius-base, 4px);
    padding: var(--p-space-4, 16px);
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--p-space-3, 12px);
    border-top: 1px solid var(--p-color-border-subdued, #e1e3e5);
    font-size: var(--p-font-size-sm, 12px);
  }

  &__status {
    color: var(--p-color-text-subdued, #637381);
  }

  /* States */
  &:hover {
    border-color: var(--p-color-border-hovered, #c4cdd5);
    box-shadow: var(--p-shadow-md, 0 4px 6px rgba(0, 0, 0, 0.05));
  }

  &:focus-within {
    outline: 2px solid var(--p-color-focused, #5c6ac4);
    outline-offset: 2px;
  }

  /* State modifiers */
  &--active {
    border-color: var(--p-color-primary, #5c6ac4);
    box-shadow: 0 0 0 1px var(--p-color-primary, #5c6ac4);
  }

  &--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Loading state */
  &__loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 10;
  }

  &__loading[aria-hidden="true"] {
    display: none;
  }

  &__spinner {
    width: 24px;
    height: 24px;
    border: 2px solid var(--p-color-border-subdued, #e1e3e5);
    border-top: 2px solid var(--p-color-primary, #5c6ac4);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  &__loading-text {
    margin-top: var(--p-space-2, 8px);
    font-size: var(--p-font-size-sm, 12px);
    color: var(--p-color-text-subdued, #637381);
  }

  /* Error state */
  &__error {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--p-color-surface-critical, #fff4f4);
    z-index: 10;
  }

  &__error[aria-hidden="true"] {
    display: none;
  }

  &__error-message {
    color: var(--p-color-text-critical, #d82c0d);
    margin: 0 0 var(--p-space-3, 12px) 0;
    text-align: center;
  }

  &__retry-btn {
    padding: var(--p-space-2, 8px) var(--p-space-3, 12px);
    background-color: var(--p-color-surface, #ffffff);
    border: 1px solid var(--p-color-border, #dfe3e8);
    border-radius: var(--p-border-radius-base, 4px);
    color: var(--p-color-text, #212b36);
    cursor: pointer;
    transition: all var(--p-duration-150, 150ms) var(--p-ease-in-out, ease-in-out);

    &:hover {
      background-color: var(--p-color-surface-hovered, #f4f6f8);
    }
  }

  /* Responsive design */
  @media (max-width: 768px) {
    padding: var(--p-space-4, 16px);

    &__content {
      grid-template-columns: 1fr;
    }

    &__sidebar {
      order: -1;
    }

    &__footer {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--p-space-2, 8px);
    }
  }

  /* Animation */
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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