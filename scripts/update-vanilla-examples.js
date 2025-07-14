#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to update all vanilla JS examples to use the new component classes
 * This replaces HTML/CSS snippets with JavaScript component usage
 */

const codeVariantsPath = path.join(__dirname, '../polaris/polaris.shopify.com/src/utils/codeVariants.ts');

// Component mappings for vanilla JS updates
const componentUpdates = {
  // Button examples
  'button': {
    pattern: /vanilla: `[^`]*<button[^`]+`/g,
    replacement: (match, componentName = 'button') => {
      // Extract button properties from HTML
      const isPrimary = match.includes('button--primary');
      const isPlain = match.includes('button--plain');
      const isCritical = match.includes('button--critical');
      const isFullWidth = match.includes('button--full-width');
      const isLarge = match.includes('button--large');
      const isDisabled = match.includes('disabled');
      const isLoading = match.includes('button--loading');
      
      let variant = 'secondary';
      if (isPrimary) variant = 'primary';
      else if (isPlain) variant = 'plain';
      else if (isCritical) variant = 'critical';
      
      // Extract button text
      const textMatch = match.match(/>([^<]+)</);
      const label = textMatch ? textMatch[1].trim() : 'Button';
      
      return `vanilla: \`import { ButtonComponent } from '@cin7/vanilla-js';

// Create button component
const button = new ButtonComponent({
  label: '${label}',${variant !== 'secondary' ? `\n  variant: '${variant}',` : ''}${isFullWidth ? '\n  fullWidth: true,' : ''}${isLarge ? '\n  size: \'large\',' : ''}${isDisabled ? '\n  disabled: true,' : ''}${isLoading ? '\n  loading: true,' : ''}
  onClick: () => console.log('${label} clicked')
});

// Mount to container
button.mount('#app');${isDisabled ? '\n\n// Button is disabled by default' : ''}${isLoading ? '\n\n// Loading state can be toggled\nbutton.setLoading(false); // Stop loading' : ''}\``;
    }
  },

  // Text field examples
  'text-field': {
    pattern: /vanilla: `[^`]*<input[^>]*type="(?:text|email|password|tel|url|number|search)"[^`]+`/g,
    replacement: (match) => {
      // Extract input properties
      const typeMatch = match.match(/type="([^"]+)"/);
      const type = typeMatch ? typeMatch[1] : 'text';
      const placeholderMatch = match.match(/placeholder="([^"]+)"/);
      const placeholder = placeholderMatch ? placeholderMatch[1] : '';
      const labelMatch = match.match(/<label[^>]*>([^<]+)</);
      const label = labelMatch ? labelMatch[1].trim() : 'Field label';
      const isRequired = match.includes('required');
      const helpTextMatch = match.match(/help-text[^>]*>([^<]+)</);
      const helpText = helpTextMatch ? helpTextMatch[1].trim() : '';
      
      return `vanilla: \`import { TextFieldComponent } from '@cin7/vanilla-js';

// Create text field component
const textField = new TextFieldComponent({
  label: '${label}',
  type: '${type}',${placeholder ? `\n  placeholder: '${placeholder}',` : ''}${isRequired ? '\n  required: true,' : ''}${helpText ? `\n  helpText: '${helpText}',` : ''}
  onChange: (value) => console.log('Value changed:', value)
});

// Mount to container
textField.mount('#app');

// Validate on blur
textField.on('blur', () => {
  if (!textField.validate()) {
    console.log('Validation failed');
  }
});\``;
    }
  },

  // Select examples
  'select': {
    pattern: /vanilla: `[^`]*<select[^`]+`/g,
    replacement: (match) => {
      // Extract select options
      const optionMatches = match.matchAll(/<option[^>]*value="([^"]*)"[^>]*>([^<]+)</g);
      const options = Array.from(optionMatches).map(m => ({
        value: m[1],
        label: m[2].trim()
      }));
      
      const labelMatch = match.match(/<label[^>]*>([^<]+)</);
      const label = labelMatch ? labelMatch[1].trim() : 'Select option';
      
      return `vanilla: \`import { SelectComponent } from '@cin7/vanilla-js';

// Create select component
const select = new SelectComponent({
  label: '${label}',
  options: [${options.map(opt => `
    { label: '${opt.label}', value: '${opt.value}' }`).join(',')}
  ],
  onChange: (value) => console.log('Selected:', value)
});

// Mount to container
select.mount('#app');

// Get selected option details
const selected = select.getSelectedOption();
console.log('Current selection:', selected);\``;
    }
  },

  // Radio button examples
  'radio': {
    pattern: /vanilla: `[^`]*<input[^>]*type="radio"[^`]+`/g,
    replacement: (match) => {
      // Extract radio options
      const radioMatches = match.matchAll(/<input[^>]*type="radio"[^>]*value="([^"]*)"[^>]*>[\s\S]*?<label[^>]*>([^<]+)</g);
      const options = Array.from(radioMatches).map(m => ({
        value: m[1],
        label: m[2].trim()
      }));
      
      const nameMatch = match.match(/name="([^"]+)"/);
      const name = nameMatch ? nameMatch[1] : 'options';
      
      return `vanilla: \`import { RadioGroupComponent } from '@cin7/vanilla-js';

// Create radio group component
const radioGroup = new RadioGroupComponent({
  name: '${name}',
  options: [${options.map(opt => `
    { label: '${opt.label}', value: '${opt.value}' }`).join(',')}
  ],
  onChange: (value) => console.log('Selected:', value)
});

// Mount to container
radioGroup.mount('#app');

// Get current selection
console.log('Current value:', radioGroup.get());\``;
    }
  },

  // Button group examples
  'button-group': {
    pattern: /vanilla: `[^`]*class="button-group[^`]+`/g,
    replacement: (match) => {
      const isSegmented = match.includes('button-group--segmented');
      const buttonMatches = match.matchAll(/>([^<]+)</g);
      const buttons = Array.from(buttonMatches)
        .map(m => m[1].trim())
        .filter(text => text && !text.includes('script'));
      
      if (isSegmented) {
        return `vanilla: \`import { ButtonGroupComponent } from '@cin7/vanilla-js';

// Create segmented button group
const buttonGroup = new ButtonGroupComponent({
  variant: 'segmented',
  buttons: [${buttons.map(label => `
    { label: '${label}', value: '${label.toLowerCase()}' }`).join(',')}
  ],
  onChange: (values) => console.log('Selected:', values)
});

// Mount to container
buttonGroup.mount('#app');

// Set initial selection
buttonGroup.set(['${buttons[0]?.toLowerCase() || 'bold'}']);\``;
      } else {
        return `vanilla: \`import { ButtonComponent } from '@cin7/vanilla-js';

// Create button group container
const container = document.createElement('div');
container.className = 'button-group';
${buttons.map((label, i) => `
// ${label} button
const button${i + 1} = new ButtonComponent({
  label: '${label}',${i === buttons.length - 1 ? '\n  variant: \'primary\',' : ''}
  onClick: () => console.log('${label} clicked')
});
button${i + 1}.mount(container);`).join('\n')}

// Mount container
document.querySelector('#app').appendChild(container);\``;
      }
    }
  }
};

// Read the file
let content = fs.readFileSync(codeVariantsPath, 'utf-8');

// Apply all component updates
Object.entries(componentUpdates).forEach(([component, update]) => {
  content = content.replace(update.pattern, update.replacement);
});

// Additional specific replacements for form elements
// Replace any remaining checkbox patterns
content = content.replace(
  /vanilla: `[^`]*<input[^>]*type="checkbox"[^`]+`/g,
  (match) => {
    const labelMatch = match.match(/<label[^>]*>([^<]+)</);
    const label = labelMatch ? labelMatch[1].trim() : 'Checkbox';
    
    return `vanilla: \`import { CheckboxComponent } from '@cin7/vanilla-js';

// Create checkbox component
const checkbox = new CheckboxComponent({
  label: '${label}',
  onChange: (checked) => console.log('Checkbox is now:', checked)
});

// Mount to container
checkbox.mount('#app');\``;
  }
);

// Write back
fs.writeFileSync(codeVariantsPath, content);

console.log('✅ Updated all vanilla JS examples to use component classes');