#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to convert all remaining HTML snippets to component classes
 * in vanilla JS examples across the documentation
 */

const codeVariantsPath = path.join(__dirname, '../polaris/polaris.shopify.com/src/utils/codeVariants.ts');

// Read the file
let content = fs.readFileSync(codeVariantsPath, 'utf-8');

// Component mappings for common HTML patterns
const conversions = [
  // Modal examples
  {
    pattern: /vanilla: `[^`]*<div[^>]*class="modal[^`]+`/g,
    replacement: () => `vanilla: \`import { ModalComponent } from '@cin7/vanilla-js';

// Create modal component
const modal = new ModalComponent({
  title: 'Modal Title',
  content: 'Modal content goes here...',
  primaryAction: {
    label: 'Confirm',
    onClick: () => {
      console.log('Confirmed');
      modal.close();
    }
  },
  secondaryActions: [{
    label: 'Cancel',
    onClick: () => modal.close()
  }]
});

// Mount and show modal
modal.mount();
modal.open();\``
  },

  // Toast/notification examples
  {
    pattern: /vanilla: `[^`]*<div[^>]*class="(toast|notification)[^`]+`/g,
    replacement: () => `vanilla: \`import { Toast } from '@cin7/vanilla-js';

// Show success toast
Toast.success('Action completed successfully');

// Show error toast
Toast.error('Something went wrong');

// Custom toast with action
const toast = Toast.show({
  message: 'Custom message',
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked')
  }
});\``
  },

  // Card examples
  {
    pattern: /vanilla: `[^`]*<div[^>]*class="card[^`]+`/g,
    replacement: () => `vanilla: \`import { CardComponent } from '@cin7/vanilla-js';

// Create card component
const card = new CardComponent({
  title: 'Card Title',
  content: 'Card content goes here...',
  actions: [{
    label: 'Action',
    onClick: () => console.log('Card action clicked')
  }]
});

// Mount card
card.mount('#app');\``
  },

  // Badge examples
  {
    pattern: /vanilla: `[^`]*<span[^>]*class="badge[^`]+`/g,
    replacement: () => `vanilla: \`import { BadgeComponent } from '@cin7/vanilla-js';

// Create badge component
const badge = new BadgeComponent({
  text: 'Badge Text',
  variant: 'success'
});

// Mount badge
badge.mount('#app');\``
  },

  // List examples
  {
    pattern: /vanilla: `[^`]*<ul[^>]*class="(list|resource-list)[^`]+`/g,
    replacement: () => `vanilla: \`import { ListComponent } from '@cin7/vanilla-js';

// Create list component
const list = new ListComponent({
  items: [
    { id: '1', label: 'Item 1', onClick: () => console.log('Item 1 clicked') },
    { id: '2', label: 'Item 2', onClick: () => console.log('Item 2 clicked') },
    { id: '3', label: 'Item 3', onClick: () => console.log('Item 3 clicked') }
  ]
});

// Mount list
list.mount('#app');\``
  },

  // Navigation examples
  {
    pattern: /vanilla: `[^`]*<nav[^>]*class="navigation[^`]+`/g,
    replacement: () => `vanilla: \`import { NavigationComponent } from '@cin7/vanilla-js';

// Create navigation component
const navigation = new NavigationComponent({
  items: [
    { label: 'Home', href: '/', active: true },
    { label: 'Products', href: '/products' },
    { label: 'Settings', href: '/settings' }
  ]
});

// Mount navigation
navigation.mount('#app');\``
  },

  // Tab examples
  {
    pattern: /vanilla: `[^`]*<div[^>]*class="tabs[^`]+`/g,
    replacement: () => `vanilla: \`import { TabsComponent } from '@cin7/vanilla-js';

// Create tabs component
const tabs = new TabsComponent({
  tabs: [
    { label: 'Tab 1', content: 'Content for tab 1' },
    { label: 'Tab 2', content: 'Content for tab 2' },
    { label: 'Tab 3', content: 'Content for tab 3' }
  ],
  defaultTab: 0
});

// Mount tabs
tabs.mount('#app');\``
  },

  // Generic div containers with event handlers
  {
    pattern: /vanilla: `[^`]*<div[^>]*class="[^"]*"[^>]*>[^<]*<\/div>\s*<script>[^`]+`/g,
    replacement: () => `vanilla: \`import { Component } from '@cin7/vanilla-js';

// Create custom component
const component = new Component({
  template: '<div>Component content</div>',
  onClick: () => console.log('Component clicked')
});

// Mount component
component.mount('#app');\``
  }
];

// Apply conversions
conversions.forEach(({ pattern, replacement }) => {
  content = content.replace(pattern, replacement);
});

// Additional specific replacements for complex patterns
content = content.replace(
  /vanilla: `<!-- HTML Structure -->\s*<div[^`]*`/g,
  `vanilla: \`import { Component } from '@cin7/vanilla-js';

// Create component using vanilla JS class pattern
const component = new Component({
  onClick: () => console.log('Component interaction')
});

// Mount component
component.mount('#app');\``
);

// Write back
fs.writeFileSync(codeVariantsPath, content);

console.log('✅ Converted remaining HTML snippets to component classes');