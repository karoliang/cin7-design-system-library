export interface CodeExampleVariants {
  react: string;
  extjs: string;
  vanilla: string;
  typescript: string;
}

// Button Group Examples
export const buttonGroupExamples = {
  default: {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

function ButtonGroupDefaultExample() {
  return (
    <ButtonGroup>
      <Button>Cancel</Button>
      <Button variant="primary">Save</Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle',
    pack: 'end'
  },
  defaults: {
    margin: '0 0 0 10'
  },
  items: [{
    xtype: 'button',
    text: 'Cancel',
    handler: function() {
      console.log('Cancel clicked');
    }
  }, {
    xtype: 'button',
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `// HTML
<div class="button-group">
  <button class="button">Cancel</button>
  <button class="button button--primary">Save</button>
</div>

// CSS
.button-group {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.button--primary {
  background: #008060;
  color: white;
  border-color: #008060;
}

// JavaScript
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent} clicked\`);
  });
});`,
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

interface ButtonGroupDefaultExampleProps {
  onCancel?: () => void;
  onSave?: () => void;
}

function ButtonGroupDefaultExample({ 
  onCancel, 
  onSave 
}: ButtonGroupDefaultExampleProps): JSX.Element {
  return (
    <ButtonGroup>
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onSave}>
        Save
      </Button>
    </ButtonGroup>
  );
}`
  },
  'with-segmented-buttons': {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

function ButtonGroupWithSegmentedButtonsExample() {
  return (
    <ButtonGroup variant="segmented">
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.button.Segmented', {
  items: [{
    text: 'Bold',
    handler: function(btn) {
      console.log('Bold toggled:', btn.pressed);
    }
  }, {
    text: 'Italic',
    handler: function(btn) {
      console.log('Italic toggled:', btn.pressed);
    }
  }, {
    text: 'Underline',
    handler: function(btn) {
      console.log('Underline toggled:', btn.pressed);
    }
  }]
});`,
    vanilla: `// HTML
<div class="button-group button-group--segmented" role="group">
  <button class="button-segment" aria-pressed="false">Bold</button>
  <button class="button-segment" aria-pressed="false">Italic</button>
  <button class="button-segment" aria-pressed="false">Underline</button>
</div>

// CSS
.button-group--segmented {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.button-segment {
  padding: 8px 16px;
  border: none;
  border-right: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.button-segment:last-child {
  border-right: none;
}

.button-segment[aria-pressed="true"] {
  background: #f0f0f0;
}

// JavaScript
document.querySelectorAll('.button-segment').forEach(button => {
  button.addEventListener('click', () => {
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', !isPressed);
  });
});`,
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import React, {useState} from 'react';

type TextStyle = 'bold' | 'italic' | 'underline';

interface ButtonGroupSegmentedExampleProps {
  onStyleChange?: (styles: TextStyle[]) => void;
}

function ButtonGroupSegmentedExample({ 
  onStyleChange 
}: ButtonGroupSegmentedExampleProps): JSX.Element {
  const [activeStyles, setActiveStyles] = useState<Set<TextStyle>>(new Set());

  const toggleStyle = (style: TextStyle) => {
    const newStyles = new Set(activeStyles);
    if (newStyles.has(style)) {
      newStyles.delete(style);
    } else {
      newStyles.add(style);
    }
    setActiveStyles(newStyles);
    onStyleChange?.(Array.from(newStyles));
  };

  return (
    <ButtonGroup variant="segmented">
      <Button 
        pressed={activeStyles.has('bold')}
        onClick={() => toggleStyle('bold')}
      >
        Bold
      </Button>
      <Button 
        pressed={activeStyles.has('italic')}
        onClick={() => toggleStyle('italic')}
      >
        Italic
      </Button>
      <Button 
        pressed={activeStyles.has('underline')}
        onClick={() => toggleStyle('underline')}
      >
        Underline
      </Button>
    </ButtonGroup>
  );
}`
  },
  'pressed-with-segmented-buttons': {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import React, {useState} from 'react';

function PressedWithSegmentedButtonsExample() {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  return (
    <ButtonGroup variant="segmented">
      <Button
        pressed={activeButtonIndex === 0}
        onClick={() => setActiveButtonIndex(0)}
      >
        Bold
      </Button>
      <Button
        pressed={activeButtonIndex === 1}
        onClick={() => setActiveButtonIndex(1)}
      >
        Italic
      </Button>
      <Button
        pressed={activeButtonIndex === 2}
        onClick={() => setActiveButtonIndex(2)}
      >
        Underline
      </Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.button.Segmented', {
  allowMultiple: false,
  value: 'bold', // default selected
  items: [{
    text: 'Bold',
    value: 'bold'
  }, {
    text: 'Italic', 
    value: 'italic'
  }, {
    text: 'Underline',
    value: 'underline'
  }],
  listeners: {
    change: function(segmented, value) {
      console.log('Active style:', value);
    }
  }
});`,
    vanilla: `// HTML
<div class="button-group button-group--segmented" role="group">
  <button class="button-segment" aria-pressed="true" data-value="bold">Bold</button>
  <button class="button-segment" aria-pressed="false" data-value="italic">Italic</button>
  <button class="button-segment" aria-pressed="false" data-value="underline">Underline</button>
</div>

// CSS
.button-group--segmented {
  display: inline-flex;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
}

.button-segment {
  padding: 8px 16px;
  border: none;
  border-right: 1px solid #ccc;
  background: white;
  cursor: pointer;
}

.button-segment:last-child {
  border-right: none;
}

.button-segment[aria-pressed="true"] {
  background: #e0e0e0;
  font-weight: 600;
}

// JavaScript
const buttons = document.querySelectorAll('.button-segment');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove pressed state from all buttons
    buttons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
    // Set pressed state on clicked button
    button.setAttribute('aria-pressed', 'true');
    
    console.log('Active style:', button.dataset.value);
  });
});`,
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import React, {useState} from 'react';

type TextStyle = 'bold' | 'italic' | 'underline';

interface PressedWithSegmentedButtonsProps {
  defaultStyle?: TextStyle;
  onStyleChange?: (style: TextStyle) => void;
}

function PressedWithSegmentedButtonsExample({ 
  defaultStyle = 'bold',
  onStyleChange 
}: PressedWithSegmentedButtonsProps): JSX.Element {
  const [activeStyle, setActiveStyle] = useState<TextStyle>(defaultStyle);

  const handleStyleChange = (style: TextStyle) => {
    setActiveStyle(style);
    onStyleChange?.(style);
  };

  return (
    <ButtonGroup variant="segmented">
      <Button
        pressed={activeStyle === 'bold'}
        onClick={() => handleStyleChange('bold')}
      >
        Bold
      </Button>
      <Button
        pressed={activeStyle === 'italic'}
        onClick={() => handleStyleChange('italic')}
      >
        Italic
      </Button>
      <Button
        pressed={activeStyle === 'underline'}
        onClick={() => handleStyleChange('underline')}
      >
        Underline
      </Button>
    </ButtonGroup>
  );
}`
  }
};

// Button Examples
export const buttonExamples = {
  primary: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function PrimaryButtonExample() {
  return <Button variant="primary">Save</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Save',
  ui: 'primary',
  handler: function() {
    console.log('Save clicked');
  }
});`,
    vanilla: `// HTML
<button class="button button--primary">Save</button>

// CSS
.button--primary {
  background: #008060;
  color: white;
  border: 1px solid #008060;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button--primary:hover {
  background: #006e52;
}

// JavaScript
document.querySelector('.button--primary').addEventListener('click', () => {
  console.log('Save clicked');
});`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface PrimaryButtonExampleProps {
  onSave: () => void;
  loading?: boolean;
  disabled?: boolean;
}

function PrimaryButtonExample({ 
  onSave, 
  loading = false, 
  disabled = false 
}: PrimaryButtonExampleProps): JSX.Element {
  return (
    <Button 
      variant="primary" 
      onClick={onSave}
      loading={loading}
      disabled={disabled}
    >
      Save
    </Button>
  );
}`
  },
  plain: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function PlainButtonExample() {
  return <Button variant="plain">View details</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'View details',
  ui: 'plain',
  handler: function() {
    console.log('View details clicked');
  }
});`,
    vanilla: `// HTML
<button class="button button--plain">View details</button>

// CSS
.button--plain {
  background: none;
  border: none;
  color: #006fbb;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
}

.button--plain:hover {
  color: #004c8c;
}

// JavaScript
document.querySelector('.button--plain').addEventListener('click', () => {
  console.log('View details clicked');
});`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface PlainButtonExampleProps {
  onViewDetails: () => void;
  accessibilityLabel?: string;
}

function PlainButtonExample({ 
  onViewDetails,
  accessibilityLabel = "View details"
}: PlainButtonExampleProps): JSX.Element {
  return (
    <Button 
      variant="plain" 
      onClick={onViewDetails}
      accessibilityLabel={accessibilityLabel}
    >
      View details
    </Button>
  );
}`
  }
};

// Map of all component examples
const componentExamples: Record<string, any> = {
  'button-group': buttonGroupExamples,
  'button': buttonExamples,
  // TODO: Add more components here as we implement them
  // 'account-connection': accountConnectionExamples,
  // 'page-actions': pageActionsExamples,
  // 'badge': badgeExamples,
  // 'banner': bannerExamples,
  // 'card': cardExamples,
  // etc...
};

// Helper function to generate examples for a component
export function getCodeExamples(componentName: string, exampleName: string): CodeExampleVariants | null {
  const component = componentExamples[componentName];
  if (!component || !component[exampleName]) {
    return null;
  }

  return component[exampleName];
}

// Helper to extract component and example names from filename
export function parseExampleFileName(fileName: string): { component: string, example: string } | null {
  // Remove .tsx extension
  const nameWithoutExt = fileName.replace('.tsx', '');
  
  // List of known component prefixes (ordered by length to match longest first)
  const componentPrefixes = [
    'button-group',
    'account-connection',
    'page-actions',
    'exception-list',
    'progress-bar',
    'skeleton-body-text',
    'skeleton-display-text',
    'skeleton-page',
    'skeleton-tabs',
    'skeleton-thumbnail',
    'video-thumbnail',
    'keyboard-key',
    'block-stack',
    'callout-card',
    'empty-state',
    'form-layout',
    'inline-grid',
    'inline-stack',
    'media-card',
    'action-list',
    'description-list',
    'option-list',
    'resource-item',
    'resource-list',
    'footer-help',
    'fullscreen-bar',
    'choice-list',
    'color-picker',
    'date-picker',
    'drop-zone',
    'index-filters',
    'index-table',
    'inline-error',
    'radio-button',
    'range-slider',
    'text-field',
    'contextual-save-bar',
    'legacy-card',
    'legacy-filters',
    'legacy-stack',
    'legacy-tabs',
    'setting-toggle',
    'text-container',
    'text-style',
    'visually-hidden',
    'top-bar',
    // Single word components
    'button',
    'badge',
    'banner',
    'avatar',
    'icon',
    'thumbnail',
    'bleed',
    'box',
    'card',
    'divider',
    'grid',
    'layout',
    'page',
    'list',
    'listbox',
    'link',
    'pagination',
    'tabs',
    'popover',
    'tooltip',
    'autocomplete',
    'checkbox',
    'combobox',
    'filters',
    'form',
    'select',
    'tag',
    'spinner',
    'caption',
    'heading',
    'loading',
    'modal',
    'navigation',
    'sheet',
    'subheading',
    'toast',
    'frame',
  ];
  
  // Find matching component
  for (const prefix of componentPrefixes) {
    if (nameWithoutExt.startsWith(prefix + '-')) {
      return {
        component: prefix,
        example: nameWithoutExt.substring(prefix.length + 1)
      };
    }
  }
  
  return null;
}