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

// Card Examples
export const cardExamples = {
  default: {
    react: `import {Card, Text} from '@shopify/polaris';
import React from 'react';

function CardDefault() {
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: null,
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<h2 class="Polaris-Text--bodyMd">Content inside a card</h2>'
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <h2 class="text-body-md">Content inside a card</h2>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.text-body-md {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-regular);
  line-height: var(--p-font-line-height-400);
}`,
    typescript: `import {Card, Text} from '@shopify/polaris';
import React from 'react';

interface CardDefaultProps {
  children?: React.ReactNode;
}

function CardDefault({ children }: CardDefaultProps): JSX.Element {
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        {children || "Content inside a card"}
      </Text>
    </Card>
  );
}`
  },
  'with-subdued-background': {
    react: `import {BlockStack, Card, List, Text} from '@shopify/polaris';
import React from 'react';

function CardWithSubduedBackground() {
  return (
    <Card background="bg-surface-secondary">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" fontWeight="medium">
          Deactivated staff accounts
        </Text>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: null,
  bodyPadding: 16,
  cls: 'polaris-card polaris-card--subdued',
  shadow: true,
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    defaults: {
      margin: '0 0 8 0'
    },
    items: [{
      xtype: 'component',
      html: '<h3 class="Polaris-Text--headingSm">Deactivated staff accounts</h3>'
    }, {
      xtype: 'component',
      html: '<ul class="Polaris-List"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>'
    }]
  }]
});`,
    vanilla: `// HTML
<div class="card card--subdued">
  <div class="stack">
    <h3 class="text-heading-sm">Deactivated staff accounts</h3>
    <ul class="list">
      <li>Felix Crafford</li>
      <li>Ezequiel Manno</li>
    </ul>
  </div>
</div>

// CSS
.card {
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.card--subdued {
  background: var(--p-color-bg-surface-secondary);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-200);
}

.text-heading-sm {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  line-height: var(--p-font-line-height-400);
}

.list {
  list-style: disc;
  padding-left: var(--p-space-500);
}`,
    typescript: `import {BlockStack, Card, List, Text} from '@shopify/polaris';
import React from 'react';

interface StaffAccount {
  name: string;
  id: string;
}

interface CardWithSubduedBackgroundProps {
  title?: string;
  accounts?: StaffAccount[];
}

function CardWithSubduedBackground({ 
  title = "Deactivated staff accounts",
  accounts = [
    { id: '1', name: 'Felix Crafford' },
    { id: '2', name: 'Ezequiel Manno' }
  ]
}: CardWithSubduedBackgroundProps): JSX.Element {
  return (
    <Card background="bg-surface-secondary">
      <BlockStack gap="200">
        <Text as="h3" variant="headingSm" fontWeight="medium">
          {title}
        </Text>
        <List>
          {accounts.map((account) => (
            <List.Item key={account.id}>{account.name}</List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-section': {
    react: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

function CardWithSection() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store's performance.
        </Text>
      </Box>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  bodyPadding: '0 16 16 16',
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<p class="Polaris-Text--bodyMd">View a summary of your online store\\'s performance.</p>'
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <h2 class="card__title">Online store dashboard</h2>
  <div class="card__content">
    <p class="text-body-md">View a summary of your online store's performance.</p>
  </div>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-200);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.card__title {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  line-height: var(--p-font-line-height-400);
  margin: 0;
}

.card__content {
  padding-top: var(--p-space-200);
}

.text-body-md {
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  margin: 0;
}`,
    typescript: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

interface CardWithSectionProps {
  title: string;
  description: string;
  roundedAbove?: 'xs' | 'sm' | 'md' | 'lg';
}

function CardWithSection({ 
  title,
  description,
  roundedAbove = 'sm'
}: CardWithSectionProps): JSX.Element {
  return (
    <Card roundedAbove={roundedAbove}>
      <Text as="h2" variant="headingSm">
        {title}
      </Text>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </Box>
    </Card>
  );
}`
  },
  'with-footer-actions': {
    react: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

function CardWithFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment 1234
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            <List.Item>1 × Oasis Glass, 4-Pack</List.Item>
            <List.Item>1 × Anubis Cup, 2-Pack</List.Item>
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button onClick={() => {}} accessibilityLabel="Fulfill items">
              Fulfill items
            </Button>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={() => {}}
              accessibilityLabel="Create shipping label"
            >
              Create shipping label
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Shipment 1234',
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    html: '<h3 class="Polaris-Text--headingSm">Items</h3>',
    margin: '0 0 8 0'
  }, {
    xtype: 'component',
    html: '<ul class="Polaris-List"><li>1 × Oasis Glass, 4-Pack</li><li>1 × Anubis Cup, 2-Pack</li></ul>',
    margin: '0 0 16 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    ui: 'footer',
    items: ['->', {
      xtype: 'button',
      text: 'Fulfill items',
      handler: function() {
        console.log('Fulfill clicked');
      }
    }, {
      xtype: 'button',
      text: 'Create shipping label',
      iconCls: 'x-fa fa-plus',
      ui: 'primary',
      handler: function() {
        console.log('Create label clicked');
      }
    }]
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <div class="card__content">
    <h2 class="text-heading-sm">Shipment 1234</h2>
    <div class="items-section">
      <h3 class="text-heading-sm text-medium">Items</h3>
      <ul class="list">
        <li>1 × Oasis Glass, 4-Pack</li>
        <li>1 × Anubis Cup, 2-Pack</li>
      </ul>
    </div>
  </div>
  <div class="card__footer">
    <div class="button-group button-group--end">
      <button class="button" aria-label="Fulfill items">
        Fulfill items
      </button>
      <button class="button button--primary" aria-label="Create shipping label">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M10 6v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2z"/>
        </svg>
        Create shipping label
      </button>
    </div>
  </div>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  overflow: hidden;
}

.card__content {
  padding: var(--p-space-400);
}

.card__footer {
  padding: var(--p-space-400);
  border-top: 1px solid var(--p-color-border);
}

.text-heading-sm {
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  margin: 0;
}

.text-medium {
  font-weight: var(--p-font-weight-medium);
}

.items-section {
  margin-top: var(--p-space-200);
}

.list {
  list-style: disc;
  padding-left: var(--p-space-500);
  margin: var(--p-space-200) 0 0 0;
}

.button-group {
  display: flex;
  gap: var(--p-space-200);
}

.button-group--end {
  justify-content: flex-end;
}

.button {
  display: inline-flex;
  align-items: center;
  gap: var(--p-space-100);
  padding: 8px 16px;
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  background: white;
  cursor: pointer;
}

.button--primary {
  background: var(--p-color-bg-fill-brand);
  color: white;
  border-color: var(--p-color-bg-fill-brand);
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

// JavaScript
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const label = button.getAttribute('aria-label');
    console.log(\`\${label} clicked\`);
  });
});`,
    typescript: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

interface ShipmentItem {
  id: string;
  quantity: number;
  name: string;
}

interface CardWithFooterActionsProps {
  shipmentId: string;
  items: ShipmentItem[];
  onFulfill: () => void;
  onCreateLabel: () => void;
}

function CardWithFooterActions({
  shipmentId,
  items,
  onFulfill,
  onCreateLabel
}: CardWithFooterActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Shipment {shipmentId}
        </Text>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Items
          </Text>
          <List>
            {items.map((item) => (
              <List.Item key={item.id}>
                {item.quantity} × {item.name}
              </List.Item>
            ))}
          </List>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button onClick={onFulfill} accessibilityLabel="Fulfill items">
              Fulfill items
            </Button>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={onCreateLabel}
              accessibilityLabel="Create shipping label"
            >
              Create shipping label
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-header-actions': {
    react: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

function CardWithHeaderActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Variants
          </Text>
          <Button
            onClick={() => {}}
            accessibilityLabel="Add variant"
            icon={PlusIcon}
          >
            Add variant
          </Button>
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Add variants if this product comes in multiple versions, like
          different sizes or colors.
        </Text>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  tbar: [{
    xtype: 'component',
    html: '<h2 class="Polaris-Text--headingSm">Variants</h2>',
    flex: 1
  }, {
    xtype: 'button',
    text: 'Add variant',
    iconCls: 'x-fa fa-plus',
    handler: function() {
      console.log('Add variant clicked');
    }
  }],
  items: [{
    xtype: 'component',
    html: '<p class="Polaris-Text--bodyMd">Add variants if this product comes in multiple versions, like different sizes or colors.</p>'
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <div class="card__header">
    <h2 class="text-heading-sm">Variants</h2>
    <button class="button button--icon-text" aria-label="Add variant">
      <svg class="icon" viewBox="0 0 20 20">
        <path d="M10 6v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2z"/>
      </svg>
      Add variant
    </button>
  </div>
  <p class="card__description">
    Add variants if this product comes in multiple versions, like
    different sizes or colors.
  </p>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--p-space-200);
}

.text-heading-sm {
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  margin: 0;
}

.card__description {
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  margin: 0;
  color: var(--p-color-text);
}

.button {
  display: inline-flex;
  align-items: center;
  gap: var(--p-space-100);
  padding: 8px 16px;
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  background: white;
  cursor: pointer;
}

.button--icon-text {
  gap: var(--p-space-100);
}

.icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

// JavaScript
document.querySelector('.button').addEventListener('click', () => {
  console.log('Add variant clicked');
});`,
    typescript: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';

interface CardWithHeaderActionsProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  actionIcon?: React.ComponentType;
}

function CardWithHeaderActions({
  title,
  description,
  actionText,
  onAction,
  actionIcon = PlusIcon
}: CardWithHeaderActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Button
            onClick={onAction}
            accessibilityLabel={\`\${actionText} \${title.toLowerCase()}\`}
            icon={actionIcon}
          >
            {actionText}
          </Button>
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </BlockStack>
    </Card>
  );
}`
  }
};

// Badge Examples
export const badgeExamples = {
  default: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge>Fulfilled</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge">Fulfilled</span>'
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <span class="badge">Fulfilled</span>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0 var(--p-space-200);
  min-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-fill-secondary);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-200);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

interface BadgeExampleProps {
  status?: string;
}

function BadgeExample({ status = "Fulfilled" }: BadgeExampleProps): JSX.Element {
  return (
    <Card>
      <Badge>{status}</Badge>
    </Card>
  );
}`
  },
  critical: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge tone="critical">Action required</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--critical">Action required</span>'
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <span class="badge badge--critical">Action required</span>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0 var(--p-space-200);
  min-height: var(--p-font-line-height-400);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-200);
  font-weight: var(--p-font-weight-medium);
}

.badge--critical {
  background: var(--p-color-bg-fill-critical);
  color: var(--p-color-text-on-color);
}`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'info' | 'success' | 'warning' | 'critical' | 'attention' | undefined;

interface CriticalBadgeProps {
  message?: string;
  tone?: BadgeTone;
}

function CriticalBadge({ 
  message = "Action required",
  tone = "critical" 
}: CriticalBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{message}</Badge>
    </Card>
  );
}`
  },
  success: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge tone="success">Active</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--success">Active</span>'
  }]
});`,
    vanilla: `// HTML
<div class="card">
  <span class="badge badge--success">Active</span>
</div>

// CSS
.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
  padding: var(--p-space-400);
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0 var(--p-space-200);
  min-height: var(--p-font-line-height-400);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-200);
  font-weight: var(--p-font-weight-medium);
}

.badge--success {
  background: var(--p-color-bg-fill-success);
  color: var(--p-color-text-on-color);
}`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

interface SuccessBadgeProps {
  isActive?: boolean;
  activeText?: string;
  inactiveText?: string;
}

function SuccessBadge({ 
  isActive = true,
  activeText = "Active",
  inactiveText = "Inactive"
}: SuccessBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={isActive ? "success" : undefined}>
        {isActive ? activeText : inactiveText}
      </Badge>
    </Card>
  );
}`
  }
};

// TextField Examples
export const textFieldExamples = {
  default: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldExample() {
  const [value, setValue] = useState('Jaded Pixel');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  listeners: {
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    }
  }
});`,
    vanilla: `// HTML
<div class="text-field">
  <label for="store-name" class="text-field__label">Store name</label>
  <div class="text-field__input-wrapper">
    <input 
      type="text" 
      id="store-name" 
      class="text-field__input" 
      value="Jaded Pixel"
      autocomplete="off"
    />
  </div>
</div>

// CSS
.text-field {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.text-field__label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.text-field__input-wrapper {
  position: relative;
}

.text-field__input {
  width: 100%;
  padding: var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-surface);
}

.text-field__input:focus {
  outline: none;
  border-color: var(--p-color-border-emphasis);
  box-shadow: 0 0 0 1px var(--p-color-border-emphasis);
}

// JavaScript
const input = document.getElementById('store-name');
input.addEventListener('input', (event) => {
  console.log('Value changed to:', event.target.value);
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TextFieldExampleProps {
  initialValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

function TextFieldExample({ 
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  onValueChange
}: TextFieldExampleProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}`
  },
  'with-validation-error': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ValidationErrorExample() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      error="Store name is required"
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: '',
  labelWidth: 100,
  width: 320,
  msgTarget: 'under',
  markInvalid: function() {
    this.setActiveError('Store name is required');
  },
  listeners: {
    afterrender: function(field) {
      field.markInvalid();
    },
    change: function(field, newValue) {
      if (newValue) {
        field.clearInvalid();
      } else {
        field.markInvalid();
      }
    }
  }
});`,
    vanilla: `// HTML
<div class="text-field text-field--error">
  <label for="store-name" class="text-field__label">Store name</label>
  <div class="text-field__input-wrapper">
    <input 
      type="text" 
      id="store-name" 
      class="text-field__input text-field__input--error" 
      value=""
      autocomplete="off"
      aria-invalid="true"
      aria-describedby="store-name-error"
    />
  </div>
  <div id="store-name-error" class="text-field__error">
    Store name is required
  </div>
</div>

// CSS
.text-field {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.text-field__label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.text-field__input-wrapper {
  position: relative;
}

.text-field__input {
  width: 100%;
  padding: var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-surface);
}

.text-field__input--error {
  border-color: var(--p-color-border-critical);
}

.text-field__input--error:focus {
  border-color: var(--p-color-border-critical);
  box-shadow: 0 0 0 1px var(--p-color-border-critical);
}

.text-field__error {
  color: var(--p-color-text-critical);
  font-size: var(--p-font-size-200);
  margin-top: var(--p-space-100);
}

// JavaScript
const input = document.getElementById('store-name');
const errorDiv = document.getElementById('store-name-error');

input.addEventListener('input', (event) => {
  if (event.target.value) {
    input.classList.remove('text-field__input--error');
    input.setAttribute('aria-invalid', 'false');
    errorDiv.style.display = 'none';
  } else {
    input.classList.add('text-field__input--error');
    input.setAttribute('aria-invalid', 'true');
    errorDiv.style.display = 'block';
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ValidationErrorExampleProps {
  label?: string;
  errorMessage?: string;
  required?: boolean;
}

function ValidationErrorExample({ 
  label = 'Store name',
  errorMessage = 'Store name is required',
  required = true
}: ValidationErrorExampleProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [error, setError] = useState<string | undefined>(errorMessage);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      if (required && !value) {
        setError(errorMessage);
      } else {
        setError(undefined);
      }
    },
    [required, errorMessage],
  );

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      error={error}
      autoComplete="off"
    />
  );
}`
  },
  'with-help-text': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function HelpTextExample() {
  const [textFieldValue, setTextFieldValue] = useState(
    'bernadette.lapresse@jadedpixel.com',
  );

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Account email"
      type="email"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      helpText="We'll use this address if we need to contact you about your account."
      autoComplete="email"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Account email',
  value: 'bernadette.lapresse@jadedpixel.com',
  vtype: 'email',
  labelWidth: 100,
  width: 400,
  afterLabelTextTpl: '<span class="help-text">We\\'ll use this address if we need to contact you about your account.</span>',
  listeners: {
    change: function(field, newValue) {
      console.log('Email changed to:', newValue);
    }
  }
});`,
    vanilla: `// HTML
<div class="text-field">
  <label for="account-email" class="text-field__label">Account email</label>
  <div class="text-field__input-wrapper">
    <input 
      type="email" 
      id="account-email" 
      class="text-field__input" 
      value="bernadette.lapresse@jadedpixel.com"
      autocomplete="email"
      aria-describedby="account-email-help"
    />
  </div>
  <div id="account-email-help" class="text-field__help-text">
    We'll use this address if we need to contact you about your account.
  </div>
</div>

// CSS
.text-field {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.text-field__label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.text-field__input-wrapper {
  position: relative;
}

.text-field__input {
  width: 100%;
  padding: var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-surface);
}

.text-field__input:focus {
  outline: none;
  border-color: var(--p-color-border-emphasis);
  box-shadow: 0 0 0 1px var(--p-color-border-emphasis);
}

.text-field__help-text {
  color: var(--p-color-text-secondary);
  font-size: var(--p-font-size-200);
  line-height: var(--p-font-line-height-300);
  margin-top: var(--p-space-100);
}

// JavaScript
const emailInput = document.getElementById('account-email');
emailInput.addEventListener('input', (event) => {
  console.log('Email changed to:', event.target.value);
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface HelpTextExampleProps {
  initialEmail?: string;
  helpText?: string;
  onEmailChange?: (email: string) => void;
}

function HelpTextExample({ 
  initialEmail = 'bernadette.lapresse@jadedpixel.com',
  helpText = "We'll use this address if we need to contact you about your account.",
  onEmailChange
}: HelpTextExampleProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialEmail);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onEmailChange?.(value);
    },
    [onEmailChange],
  );

  return (
    <TextField
      label="Account email"
      type="email"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      helpText={helpText}
      autoComplete="email"
    />
  );
}`
  },
  number: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function NumberFieldExample() {
  const [value, setValue] = useState('1');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Quantity"
      type="number"
      value={value}
      onChange={handleChange}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Number', {
  fieldLabel: 'Quantity',
  value: 1,
  minValue: 0,
  labelWidth: 100,
  width: 200,
  listeners: {
    change: function(field, newValue) {
      console.log('Quantity changed to:', newValue);
    }
  }
});`,
    vanilla: `// HTML
<div class="text-field">
  <label for="quantity" class="text-field__label">Quantity</label>
  <div class="text-field__input-wrapper">
    <input 
      type="number" 
      id="quantity" 
      class="text-field__input" 
      value="1"
      min="0"
      autocomplete="off"
    />
  </div>
</div>

// CSS
.text-field {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.text-field__label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.text-field__input-wrapper {
  position: relative;
}

.text-field__input {
  width: 100%;
  padding: var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-surface);
}

.text-field__input[type="number"] {
  -moz-appearance: textfield;
}

.text-field__input[type="number"]::-webkit-inner-spin-button,
.text-field__input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.text-field__input:focus {
  outline: none;
  border-color: var(--p-color-border-emphasis);
  box-shadow: 0 0 0 1px var(--p-color-border-emphasis);
}

// JavaScript
const quantityInput = document.getElementById('quantity');
quantityInput.addEventListener('input', (event) => {
  const value = event.target.value;
  if (value && !isNaN(value) && parseInt(value) >= 0) {
    console.log('Quantity changed to:', value);
  }
});`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface NumberFieldExampleProps {
  label?: string;
  initialValue?: number;
  min?: number;
  max?: number;
  onValueChange?: (value: number) => void;
}

function NumberFieldExample({ 
  label = 'Quantity',
  initialValue = 1,
  min = 0,
  max,
  onValueChange
}: NumberFieldExampleProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue.toString());

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue)) {
        onValueChange?.(numValue);
      }
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      type="number"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      min={min}
      max={max}
    />
  );
}`
  }
};

// Banner Examples
export const bannerExamples = {
  default: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner title="Order archived" onDismiss={() => {}}>
      <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
    </Banner>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">ⓘ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Order archived</h3>'
    }, {
      xtype: 'component',
      html: '<p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>'
    }]
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,
    vanilla: `// HTML
<div class="banner" role="status" aria-live="polite">
  <div class="banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="banner__content">
    <h3 class="banner__title">Order archived</h3>
    <p class="banner__message">This order was archived on March 7, 2017 at 3:12pm EDT.</p>
  </div>
  <button class="banner__dismiss" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

// CSS
.banner {
  display: flex;
  gap: var(--p-space-300);
  padding: var(--p-space-400);
  background: var(--p-color-bg-fill-info);
  border-radius: var(--p-border-radius-300);
  position: relative;
}

.banner__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  color: var(--p-color-icon-info);
}

.banner__content {
  flex: 1;
}

.banner__title {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-semibold);
  margin: 0 0 var(--p-space-100) 0;
}

.banner__message {
  font-size: var(--p-font-size-300);
  margin: 0;
  color: var(--p-color-text);
}

.banner__dismiss {
  position: absolute;
  top: var(--p-space-300);
  right: var(--p-space-300);
  background: none;
  border: none;
  padding: var(--p-space-100);
  cursor: pointer;
  color: var(--p-color-icon);
}

.banner__dismiss svg {
  width: 20px;
  height: 20px;
}

// JavaScript
document.querySelector('.banner__dismiss').addEventListener('click', () => {
  document.querySelector('.banner').remove();
});`,
    typescript: `import {Banner} from '@shopify/polaris';
import React, {useState} from 'react';

interface BannerExampleProps {
  title: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function BannerExample({ 
  title,
  children,
  dismissible = true,
  onDismiss
}: BannerExampleProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <Banner 
      title={title} 
      onDismiss={dismissible ? handleDismiss : undefined}
    >
      {children}
    </Banner>
  );
}`
  },
  critical: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner
      title="High risk of fraud detected"
      action={{content: 'Review risk analysis'}}
      tone="critical"
    >
      <p>
        Before fulfilling this order or capturing payment, please{' '}
        <Link url="">review the Risk Analysis</Link> and determine if this order
        is fraudulent.
      </p>
    </Banner>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--critical',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">⚠️</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">High risk of fraud detected</h3>'
    }, {
      xtype: 'component',
      html: '<p>Before fulfilling this order or capturing payment, please <a href="#">review the Risk Analysis</a> and determine if this order is fraudulent.</p>'
    }, {
      xtype: 'button',
      text: 'Review risk analysis',
      margin: '8 0 0 0',
      handler: function() {
        console.log('Review risk analysis clicked');
      }
    }]
  }]
});`,
    vanilla: `// HTML
<div class="banner banner--critical" role="alert">
  <div class="banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 12a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-7a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/>
    </svg>
  </div>
  <div class="banner__content">
    <h3 class="banner__title">High risk of fraud detected</h3>
    <p class="banner__message">
      Before fulfilling this order or capturing payment, please 
      <a href="#" class="banner__link">review the Risk Analysis</a> 
      and determine if this order is fraudulent.
    </p>
    <button class="banner__action">Review risk analysis</button>
  </div>
</div>

// CSS
.banner {
  display: flex;
  gap: var(--p-space-300);
  padding: var(--p-space-400);
  border-radius: var(--p-border-radius-300);
  position: relative;
}

.banner--critical {
  background: var(--p-color-bg-fill-critical);
}

.banner__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.banner--critical .banner__icon {
  color: var(--p-color-icon-critical);
}

.banner__content {
  flex: 1;
}

.banner__title {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-semibold);
  margin: 0 0 var(--p-space-100) 0;
}

.banner__message {
  font-size: var(--p-font-size-300);
  margin: 0;
  color: var(--p-color-text);
}

.banner__link {
  color: var(--p-color-text-link);
  text-decoration: underline;
}

.banner__action {
  margin-top: var(--p-space-200);
  padding: var(--p-space-200) var(--p-space-400);
  background: var(--p-color-bg-fill-transparent);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  cursor: pointer;
  font-size: var(--p-font-size-300);
}

// JavaScript
document.querySelector('.banner__action').addEventListener('click', () => {
  console.log('Review risk analysis clicked');
  window.location.href = '#risk-analysis';
});`,
    typescript: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

type BannerTone = 'info' | 'success' | 'warning' | 'critical';

interface BannerAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

interface CriticalBannerProps {
  title: string;
  message: React.ReactNode;
  action?: BannerAction;
  tone?: BannerTone;
}

function CriticalBanner({ 
  title,
  message,
  action,
  tone = 'critical'
}: CriticalBannerProps): JSX.Element {
  const handleAction = () => {
    if (action?.onAction) {
      action.onAction();
    } else if (action?.url) {
      window.location.href = action.url;
    }
  };

  return (
    <Banner
      title={title}
      action={action ? {
        content: action.content,
        onAction: handleAction
      } : undefined}
      tone={tone}
    >
      {message}
    </Banner>
  );
}`
  },
  success: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      tone="success"
      action={{content: 'Print label'}}
      onDismiss={() => {}}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--success',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">✓</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'hbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Your shipping label is ready to print.</h3>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Print label',
      handler: function() {
        console.log('Print label clicked');
      }
    }]
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,
    vanilla: `// HTML
<div class="banner banner--success" role="status" aria-live="polite">
  <div class="banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </div>
  <div class="banner__content">
    <div class="banner__header">
      <h3 class="banner__title">Your shipping label is ready to print.</h3>
      <button class="banner__action">Print label</button>
    </div>
  </div>
  <button class="banner__dismiss" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

// CSS
.banner {
  display: flex;
  gap: var(--p-space-300);
  padding: var(--p-space-400);
  border-radius: var(--p-border-radius-300);
  position: relative;
}

.banner--success {
  background: var(--p-color-bg-fill-success);
}

.banner__icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.banner--success .banner__icon {
  color: var(--p-color-icon-success);
}

.banner__content {
  flex: 1;
}

.banner__header {
  display: flex;
  align-items: center;
  gap: var(--p-space-300);
}

.banner__title {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-semibold);
  margin: 0;
  flex: 1;
}

.banner__action {
  padding: var(--p-space-100) var(--p-space-300);
  background: var(--p-color-bg-fill-transparent);
  border: 1px solid var(--p-color-border-strong);
  border-radius: var(--p-border-radius-200);
  cursor: pointer;
  font-size: var(--p-font-size-300);
  white-space: nowrap;
}

.banner__dismiss {
  position: absolute;
  top: var(--p-space-300);
  right: var(--p-space-300);
  background: none;
  border: none;
  padding: var(--p-space-100);
  cursor: pointer;
  color: var(--p-color-icon);
}

.banner__dismiss svg {
  width: 20px;
  height: 20px;
}

// JavaScript
document.querySelector('.banner__action').addEventListener('click', () => {
  console.log('Print label clicked');
  window.print();
});

document.querySelector('.banner__dismiss').addEventListener('click', () => {
  document.querySelector('.banner').remove();
});`,
    typescript: `import {Banner} from '@shopify/polaris';
import React, {useState} from 'react';

interface SuccessBannerProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function SuccessBanner({ 
  title,
  actionText,
  onAction,
  dismissible = true,
  onDismiss
}: SuccessBannerProps): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const handleAction = () => {
    onAction?.();
  };

  if (!isVisible) return null;

  return (
    <Banner
      title={title}
      tone="success"
      action={actionText ? {
        content: actionText,
        onAction: handleAction
      } : undefined}
      onDismiss={dismissible ? handleDismiss : undefined}
    />
  );
}`
  }
};

// Select Examples
export const selectExamples = {
  default: {
    react: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function SelectExample() {
  const [selected, setSelected] = useState('today');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  return (
    <Select
      label="Date range"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Date range',
  value: 'today',
  store: [
    ['today', 'Today'],
    ['yesterday', 'Yesterday'],
    ['lastWeek', 'Last 7 days']
  ],
  queryMode: 'local',
  displayField: 1,
  valueField: 0,
  forceSelection: true,
  editable: false,
  listeners: {
    change: function(combo, newValue) {
      console.log('Selected:', newValue);
    }
  }
});`,
    vanilla: `// HTML
<div class="select-field">
  <label for="date-range" class="select-field__label">Date range</label>
  <div class="select-field__wrapper">
    <select id="date-range" class="select-field__select">
      <option value="today" selected>Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="lastWeek">Last 7 days</option>
    </select>
    <div class="select-field__icon">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</div>

// CSS
.select-field {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.select-field__label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.select-field__wrapper {
  position: relative;
}

.select-field__select {
  width: 100%;
  padding: var(--p-space-200) var(--p-space-800) var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-surface);
  appearance: none;
  cursor: pointer;
}

.select-field__select:focus {
  outline: none;
  border-color: var(--p-color-border-emphasis);
  box-shadow: 0 0 0 1px var(--p-color-border-emphasis);
}

.select-field__icon {
  position: absolute;
  right: var(--p-space-300);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 20px;
  height: 20px;
  color: var(--p-color-icon);
}

// JavaScript
const select = document.getElementById('date-range');
select.addEventListener('change', (event) => {
  console.log('Selected:', event.target.value);
});`,
    typescript: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectExampleProps {
  label?: string;
  options?: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function SelectExample({ 
  label = 'Date range',
  options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ],
  defaultValue = 'today',
  onValueChange
}: SelectExampleProps): JSX.Element {
  const [selected, setSelected] = useState<string>(defaultValue);

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelected(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return (
    <Select
      label={label}
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}`
  },
  'with-validation-error': {
    react: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ValidationErrorExample() {
  const [selected, setSelected] = useState('');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  return (
    <Select
      label="Province"
      options={['Alberta']}
      value={selected}
      onChange={handleSelectChange}
      error="Province is required"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Province',
  value: '',
  store: ['Alberta'],
  queryMode: 'local',
  forceSelection: true,
  editable: false,
  msgTarget: 'under',
  markInvalid: function() {
    this.setActiveError('Province is required');
  },
  listeners: {
    afterrender: function(field) {
      field.markInvalid();
    },
    change: function(combo, newValue) {
      if (newValue) {
        combo.clearInvalid();
      } else {
        combo.markInvalid();
      }
    }
  }
});`,
    vanilla: `// HTML
<div class="select-field select-field--error">
  <label for="province" class="select-field__label">Province</label>
  <div class="select-field__wrapper">
    <select 
      id="province" 
      class="select-field__select select-field__select--error"
      aria-invalid="true"
      aria-describedby="province-error"
    >
      <option value="">Select a province</option>
      <option value="Alberta">Alberta</option>
    </select>
    <div class="select-field__icon">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
  <div id="province-error" class="select-field__error">
    Province is required
  </div>
</div>

// CSS
.select-field {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.select-field__label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.select-field__wrapper {
  position: relative;
}

.select-field__select {
  width: 100%;
  padding: var(--p-space-200) var(--p-space-800) var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  background: var(--p-color-bg-surface);
  appearance: none;
  cursor: pointer;
}

.select-field__select--error {
  border-color: var(--p-color-border-critical);
}

.select-field__select--error:focus {
  border-color: var(--p-color-border-critical);
  box-shadow: 0 0 0 1px var(--p-color-border-critical);
}

.select-field__icon {
  position: absolute;
  right: var(--p-space-300);
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 20px;
  height: 20px;
  color: var(--p-color-icon);
}

.select-field__error {
  color: var(--p-color-text-critical);
  font-size: var(--p-font-size-200);
  margin-top: var(--p-space-100);
}

// JavaScript
const select = document.getElementById('province');
const errorDiv = document.getElementById('province-error');

select.addEventListener('change', (event) => {
  if (event.target.value) {
    select.classList.remove('select-field__select--error');
    select.setAttribute('aria-invalid', 'false');
    errorDiv.style.display = 'none';
  } else {
    select.classList.add('select-field__select--error');
    select.setAttribute('aria-invalid', 'true');
    errorDiv.style.display = 'block';
  }
});`,
    typescript: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ValidationErrorExampleProps {
  label?: string;
  options?: string[];
  errorMessage?: string;
  required?: boolean;
}

function ValidationErrorExample({ 
  label = 'Province',
  options = ['Alberta'],
  errorMessage = 'Province is required',
  required = true
}: ValidationErrorExampleProps): JSX.Element {
  const [selected, setSelected] = useState<string>('');
  const [error, setError] = useState<string | undefined>(errorMessage);

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelected(value);
      if (required && !value) {
        setError(errorMessage);
      } else {
        setError(undefined);
      }
    },
    [required, errorMessage],
  );

  return (
    <Select
      label={label}
      options={options}
      value={selected}
      onChange={handleSelectChange}
      error={error}
    />
  );
}`
  }
};

// Modal Examples
export const modalExamples = {
  default: {
    react: `import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ModalExample() {
  const [active, setActive] = useState(true);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const activator = <Button onClick={handleChange}>Open</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title="Reach more shoppers with Instagram product tags"
          primaryAction={{
            content: 'Add Instagram',
            onAction: handleChange,
          }}
          secondaryActions={[
            {
              content: 'Learn more',
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <p>
                Use Instagram posts to share your products with millions of
                people. Let shoppers buy from your store without leaving
                Instagram.
              </p>
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'Reach more shoppers with Instagram product tags',
  width: 600,
  height: 200,
  modal: true,
  closable: true,
  resizable: false,
  layout: 'fit',
  items: [{
    xtype: 'panel',
    bodyPadding: 20,
    html: '<p>Use Instagram posts to share your products with millions of people. Let shoppers buy from your store without leaving Instagram.</p>'
  }],
  buttons: [{
    text: 'Learn more',
    handler: function() {
      console.log('Learn more clicked');
    }
  }, {
    text: 'Add Instagram',
    ui: 'primary',
    handler: function() {
      this.up('window').close();
    }
  }],
  listeners: {
    show: function() {
      console.log('Modal opened');
    },
    close: function() {
      console.log('Modal closed');
    }
  }
});`,
    vanilla: `// HTML
<div class="modal-backdrop" id="modal-backdrop">
  <div class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <div class="modal__header">
      <h2 id="modal-title" class="modal__title">
        Reach more shoppers with Instagram product tags
      </h2>
      <button class="modal__close" aria-label="Close modal">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div class="modal__body">
      <p>
        Use Instagram posts to share your products with millions of
        people. Let shoppers buy from your store without leaving
        Instagram.
      </p>
    </div>
    <div class="modal__footer">
      <button class="button button--secondary">Learn more</button>
      <button class="button button--primary">Add Instagram</button>
    </div>
  </div>
</div>

<button id="open-modal" class="button">Open</button>

// CSS
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-backdrop.active {
  display: flex;
}

.modal {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-600);
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--p-space-500);
  border-bottom: 1px solid var(--p-color-border);
}

.modal__title {
  font-size: var(--p-font-size-500);
  font-weight: var(--p-font-weight-semibold);
  margin: 0;
}

.modal__close {
  background: none;
  border: none;
  padding: var(--p-space-200);
  cursor: pointer;
  color: var(--p-color-icon);
}

.modal__close svg {
  width: 20px;
  height: 20px;
}

.modal__body {
  padding: var(--p-space-500);
  flex: 1;
  overflow-y: auto;
}

.modal__footer {
  display: flex;
  gap: var(--p-space-300);
  justify-content: flex-end;
  padding: var(--p-space-500);
  border-top: 1px solid var(--p-color-border);
}

.button {
  padding: var(--p-space-200) var(--p-space-400);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  cursor: pointer;
  border: 1px solid var(--p-color-border);
}

.button--primary {
  background: var(--p-color-bg-fill-brand);
  color: white;
  border-color: var(--p-color-bg-fill-brand);
}

.button--secondary {
  background: white;
}

// JavaScript
const modal = document.getElementById('modal-backdrop');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.modal__close');
const primaryBtn = document.querySelector('.button--primary');
const secondaryBtn = document.querySelector('.button--secondary');

function openModal() {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
primaryBtn.addEventListener('click', closeModal);
secondaryBtn.addEventListener('click', () => {
  console.log('Learn more clicked');
});

// Close on backdrop click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});`,
    typescript: `import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ModalAction {
  content: string;
  onAction: () => void;
  destructive?: boolean;
}

interface ModalExampleProps {
  title: string;
  content: React.ReactNode;
  primaryAction?: ModalAction;
  secondaryActions?: ModalAction[];
  activatorText?: string;
  initialOpen?: boolean;
}

function ModalExample({ 
  title,
  content,
  primaryAction,
  secondaryActions = [],
  activatorText = 'Open',
  initialOpen = true
}: ModalExampleProps): JSX.Element {
  const [active, setActive] = useState<boolean>(initialOpen);

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handlePrimaryAction = useCallback(() => {
    primaryAction?.onAction();
    handleChange();
  }, [primaryAction, handleChange]);

  const activator = <Button onClick={handleChange}>{activatorText}</Button>;

  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title={title}
          primaryAction={primaryAction ? {
            ...primaryAction,
            onAction: handlePrimaryAction
          } : undefined}
          secondaryActions={secondaryActions.map(action => ({
            ...action,
            onAction: () => {
              action.onAction();
              handleChange();
            }
          }))}
        >
          <Modal.Section>
            <TextContainer>
              {content}
            </TextContainer>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}`
  }
};

// Checkbox Examples
export const checkboxExamples = {
  default: {
    react: `import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked: boolean) => setChecked(newChecked),
    [],
  );

  return (
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      onChange={handleChange}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Checkbox', {
  boxLabel: 'Basic checkbox',
  checked: false,
  listeners: {
    change: function(checkbox, newValue) {
      console.log('Checkbox changed to:', newValue);
    }
  }
});`,
    vanilla: `// HTML
<div class="checkbox-field">
  <input 
    type="checkbox" 
    id="basic-checkbox" 
    class="checkbox-field__input"
  />
  <label for="basic-checkbox" class="checkbox-field__label">
    <span class="checkbox-field__box">
      <svg class="checkbox-field__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M13.527 3.84a1 1 0 0 1 0 1.414l-6.5 6.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414l1.793 1.793 5.793-5.793a1 1 0 0 1 1.414 0Z" fill="currentColor"/>
      </svg>
    </span>
    <span class="checkbox-field__text">Basic checkbox</span>
  </label>
</div>

// CSS
.checkbox-field {
  display: flex;
  align-items: flex-start;
}

.checkbox-field__input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}

.checkbox-field__label {
  display: flex;
  align-items: center;
  gap: var(--p-space-200);
  cursor: pointer;
  user-select: none;
}

.checkbox-field__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-100);
  background: var(--p-color-bg-surface);
  transition: all 0.1s ease;
}

.checkbox-field__icon {
  width: 12px;
  height: 12px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.1s ease;
}

.checkbox-field__input:checked + .checkbox-field__label .checkbox-field__box {
  background: var(--p-color-bg-fill-brand);
  border-color: var(--p-color-bg-fill-brand);
}

.checkbox-field__input:checked + .checkbox-field__label .checkbox-field__icon {
  opacity: 1;
  transform: scale(1);
  color: white;
}

.checkbox-field__input:focus + .checkbox-field__label .checkbox-field__box {
  box-shadow: 0 0 0 2px var(--p-color-border-emphasis);
}

.checkbox-field__text {
  font-size: var(--p-font-size-300);
  color: var(--p-color-text);
}

// JavaScript
const checkbox = document.getElementById('basic-checkbox');
checkbox.addEventListener('change', (event) => {
  console.log('Checkbox changed to:', event.target.checked);
});`,
    typescript: `import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CheckboxExampleProps {
  label?: string;
  defaultChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function CheckboxExample({ 
  label = 'Basic checkbox',
  defaultChecked = false,
  onCheckChange,
  disabled = false
}: CheckboxExampleProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(defaultChecked);
  
  const handleChange = useCallback(
    (newChecked: boolean) => {
      setChecked(newChecked);
      onCheckChange?.(newChecked);
    },
    [onCheckChange],
  );

  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}`
  }
};

// Page Examples
export const pageExamples = {
  default: {
    react: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

function PageExample() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="3/4 inch Leather pet collar"
      titleMetadata={<Badge tone="success">Paid</Badge>}
      subtitle="Perfect for any pet"
      compactTitle
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Duplicate',
          accessibilityLabel: 'Secondary action label',
          onAction: () => alert('Duplicate action'),
        },
        {
          content: 'View on your store',
          onAction: () => alert('View on your store action'),
        },
      ]}
      actionGroups={[
        {
          title: 'Promote',
          actions: [
            {
              content: 'Share on Facebook',
              accessibilityLabel: 'Individual action label',
              onAction: () => alert('Share on Facebook action'),
            },
          ],
        },
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: '3/4 inch Leather pet collar',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Products',
      handler: function() {
        console.log('Back to products');
      }
    }, '->', {
      xtype: 'label',
      html: '<span style="background:#0a7700;color:white;padding:2px 8px;border-radius:4px;">Paid</span>'
    }]
  }, {
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'label',
      text: 'Perfect for any pet',
      style: 'color:#6d7175;'
    }, '->', {
      text: 'Duplicate',
      handler: function() {
        alert('Duplicate action');
      }
    }, {
      text: 'View on your store',
      handler: function() {
        alert('View on your store action');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      disabled: true
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: '← Previous',
      handler: function() {
        console.log('Previous page');
      }
    }, '->', {
      text: 'Next →',
      handler: function() {
        console.log('Next page');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `// HTML
<div class="page">
  <div class="page__header">
    <div class="page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Products
      </a>
    </div>
    <div class="page__title-wrapper">
      <h1 class="page__title">
        3/4 inch Leather pet collar
        <span class="badge badge--success">Paid</span>
      </h1>
      <p class="page__subtitle">Perfect for any pet</p>
    </div>
    <div class="page__actions">
      <div class="page__secondary-actions">
        <button class="button button--secondary">Duplicate</button>
        <button class="button button--secondary">View on your store</button>
        <div class="dropdown">
          <button class="button button--secondary dropdown-toggle">
            Promote
            <svg class="icon" viewBox="0 0 20 20">
              <path d="M7 8l3 3 3-3" stroke="currentColor" fill="none"/>
            </svg>
          </button>
          <div class="dropdown-menu">
            <button class="dropdown-item">Share on Facebook</button>
          </div>
        </div>
      </div>
      <button class="button button--primary" disabled>Save</button>
    </div>
  </div>
  <div class="page__content">
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Credit card</h2>
      </div>
      <div class="card__body">
        <p>Credit card information</p>
      </div>
    </div>
  </div>
  <div class="page__pagination">
    <button class="pagination__button">
      <svg class="icon" viewBox="0 0 20 20">
        <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
      Previous
    </button>
    <button class="pagination__button">
      Next
      <svg class="icon" viewBox="0 0 20 20">
        <path d="M8 4l6 6-6 6" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
    </button>
  </div>
</div>

// CSS
.page {
  background: var(--p-color-bg);
  min-height: 100vh;
}

.page__header {
  background: var(--p-color-bg-surface);
  border-bottom: 1px solid var(--p-color-border);
  padding: var(--p-space-400) var(--p-space-600);
}

.page__breadcrumb {
  margin-bottom: var(--p-space-200);
}

.breadcrumb-link {
  display: inline-flex;
  align-items: center;
  gap: var(--p-space-100);
  color: var(--p-color-text);
  text-decoration: none;
}

.page__title-wrapper {
  margin-bottom: var(--p-space-400);
}

.page__title {
  font-size: var(--p-font-size-600);
  font-weight: var(--p-font-weight-bold);
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--p-space-200);
}

.badge {
  display: inline-flex;
  padding: 0 var(--p-space-200);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-200);
}

.badge--success {
  background: var(--p-color-bg-fill-success);
  color: white;
}

.page__subtitle {
  color: var(--p-color-text-secondary);
  margin: var(--p-space-100) 0 0 0;
}

.page__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page__secondary-actions {
  display: flex;
  gap: var(--p-space-200);
}

.button {
  padding: var(--p-space-200) var(--p-space-400);
  border-radius: var(--p-border-radius-200);
  border: 1px solid var(--p-color-border);
  background: white;
  cursor: pointer;
}

.button--primary {
  background: var(--p-color-bg-fill-brand);
  color: white;
  border-color: var(--p-color-bg-fill-brand);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page__content {
  padding: var(--p-space-600);
}

.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
}

.card__header {
  padding: var(--p-space-400);
  border-bottom: 1px solid var(--p-color-border);
}

.card__title {
  font-size: var(--p-font-size-400);
  font-weight: var(--p-font-weight-semibold);
  margin: 0;
}

.card__body {
  padding: var(--p-space-400);
}

.page__pagination {
  display: flex;
  justify-content: space-between;
  padding: var(--p-space-400) var(--p-space-600);
  border-top: 1px solid var(--p-color-border);
}

.pagination__button {
  display: flex;
  align-items: center;
  gap: var(--p-space-100);
  padding: var(--p-space-200) var(--p-space-300);
  border: none;
  background: none;
  cursor: pointer;
  color: var(--p-color-text);
}

.icon {
  width: 20px;
  height: 20px;
}

// JavaScript
document.querySelectorAll('.button').forEach(button => {
  if (!button.disabled) {
    button.addEventListener('click', () => {
      console.log(button.textContent + ' clicked');
    });
  }
});`,
    typescript: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface PageAction {
  content: string;
  accessibilityLabel?: string;
  onAction: () => void;
  disabled?: boolean;
}

interface PageExampleProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  primaryAction?: PageAction;
  secondaryActions?: PageAction[];
  children: React.ReactNode;
}

function PageExample({
  title,
  subtitle,
  backUrl = '#',
  primaryAction,
  secondaryActions = [],
  children
}: PageExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Back', url: backUrl}}
      title={title}
      subtitle={subtitle}
      compactTitle
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      {children}
    </Page>
  );
}`
  },
  'with-subtitle': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import {ArrowDownIcon} from '@shopify/polaris-icons';
import React from 'react';

function PageExample() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Invoice"
      subtitle="Statement period: May 3, 2019 to June 2, 2019"
      secondaryActions={[{content: 'Download', icon: ArrowDownIcon}]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Invoice',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Products',
      handler: function() {
        console.log('Back to products');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'label',
      text: 'Statement period: May 3, 2019 to June 2, 2019',
      style: 'color:#6d7175;'
    }, '->', {
      text: 'Download',
      iconCls: 'x-fa fa-download',
      handler: function() {
        console.log('Download invoice');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `// HTML
<div class="page">
  <div class="page__header">
    <div class="page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Products
      </a>
    </div>
    <div class="page__title-wrapper">
      <h1 class="page__title">Invoice</h1>
      <p class="page__subtitle">Statement period: May 3, 2019 to June 2, 2019</p>
    </div>
    <div class="page__actions">
      <button class="button button--secondary">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M10 3v10m0 0l-3-3m3 3l3-3M5 16h10" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Download
      </button>
    </div>
  </div>
  <div class="page__content">
    <div class="card">
      <div class="card__body card__body--section">
        <h2 class="card__title">Credit card</h2>
        <p>Credit card information</p>
      </div>
    </div>
  </div>
</div>

// CSS (same as default example with minor additions)
.button--secondary {
  display: flex;
  align-items: center;
  gap: var(--p-space-100);
}

.card__body--section {
  padding: var(--p-space-400);
}

.card__body--section .card__title {
  margin-bottom: var(--p-space-200);
}`,
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import {ArrowDownIcon} from '@shopify/polaris-icons';
import React from 'react';

interface PageWithSubtitleProps {
  title: string;
  subtitle: string;
  backAction?: {
    content: string;
    url: string;
  };
  onDownload?: () => void;
  children: React.ReactNode;
}

function PageWithSubtitle({
  title,
  subtitle,
  backAction = {content: 'Back', url: '#'},
  onDownload,
  children
}: PageWithSubtitleProps): JSX.Element {
  return (
    <Page
      backAction={backAction}
      title={title}
      subtitle={subtitle}
      secondaryActions={[{
        content: 'Download',
        icon: ArrowDownIcon,
        onAction: onDownload || (() => console.log('Download'))
      }]}
    >
      {children}
    </Page>
  );
}`
  }
};

// Layout Examples
export const layoutExamples = {
  'one-column': {
    react: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

function LayoutExample() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Online store dashboard" sectioned>
            <p>View a summary of your online store's performance.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: 'fit',
  items: [{
    xtype: 'panel',
    title: 'Online store dashboard',
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s performance.</p>'
  }]
});`,
    vanilla: `// HTML
<div class="layout">
  <div class="layout__section">
    <div class="card">
      <div class="card__body card__body--section">
        <h2 class="card__title">Online store dashboard</h2>
        <p>View a summary of your online store's performance.</p>
      </div>
    </div>
  </div>
</div>

// CSS
.layout {
  display: grid;
  gap: var(--p-space-500);
  padding: var(--p-space-500);
}

.layout__section {
  grid-column: 1 / -1;
}

.card {
  background: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-300);
  box-shadow: var(--p-shadow-300);
}

.card__body--section {
  padding: var(--p-space-400);
}

.card__title {
  font-size: var(--p-font-size-400);
  font-weight: var(--p-font-weight-semibold);
  margin: 0 0 var(--p-space-200) 0;
}`,
    typescript: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface LayoutExampleProps {
  fullWidth?: boolean;
  children: React.ReactNode;
}

function LayoutExample({ 
  fullWidth = true,
  children 
}: LayoutExampleProps): JSX.Element {
  return (
    <Page fullWidth={fullWidth}>
      <Layout>
        <Layout.Section>
          {children}
        </Layout.Section>
      </Layout>
    </Page>
  );
}`
  }
};

// FormLayout Examples
export const formLayoutExamples = {
  default: {
    react: `import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <TextField label="Store name" onChange={() => {}} autoComplete="off" />
      <TextField
        type="email"
        label="Account email"
        onChange={() => {}}
        autoComplete="email"
      />
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Store name',
    labelWidth: 100
  }, {
    xtype: 'textfield',
    fieldLabel: 'Account email',
    labelWidth: 100,
    vtype: 'email'
  }]
});`,
    vanilla: `// HTML
<form class="form-layout">
  <div class="form-layout__item">
    <label for="store-name" class="label">Store name</label>
    <input 
      type="text" 
      id="store-name" 
      class="text-field"
      autocomplete="off"
    />
  </div>
  <div class="form-layout__item">
    <label for="account-email" class="label">Account email</label>
    <input 
      type="email" 
      id="account-email" 
      class="text-field"
      autocomplete="email"
    />
  </div>
</form>

// CSS
.form-layout {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-400);
}

.form-layout__item {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-100);
}

.label {
  font-size: var(--p-font-size-300);
  font-weight: var(--p-font-weight-medium);
  color: var(--p-color-text);
}

.text-field {
  padding: var(--p-space-200) var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
}

.text-field:focus {
  outline: none;
  border-color: var(--p-color-border-emphasis);
  box-shadow: 0 0 0 1px var(--p-color-border-emphasis);
}

// JavaScript
const form = document.querySelector('.form-layout');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
});`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface FormData {
  storeName: string;
  accountEmail: string;
}

interface FormLayoutExampleProps {
  onSubmit?: (data: FormData) => void;
}

function FormLayoutExample({ onSubmit }: FormLayoutExampleProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    storeName: '',
    accountEmail: ''
  });

  const handleStoreNameChange = useCallback(
    (value: string) => setFormData(prev => ({...prev, storeName: value})),
    []
  );

  const handleEmailChange = useCallback(
    (value: string) => setFormData(prev => ({...prev, accountEmail: value})),
    []
  );

  return (
    <FormLayout>
      <TextField 
        label="Store name" 
        value={formData.storeName}
        onChange={handleStoreNameChange} 
        autoComplete="off" 
      />
      <TextField
        type="email"
        label="Account email"
        value={formData.accountEmail}
        onChange={handleEmailChange}
        autoComplete="email"
      />
    </FormLayout>
  );
}`
  }
};

// Tabs Examples
export const tabsExamples = {
  default: {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsDefaultExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-1',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-1',
    },
    {
      id: 'accepts-marketing-1',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-1',
    },
    {
      id: 'repeat-customers-1',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-1',
    },
    {
      id: 'prospects-1',
      content: 'Prospects',
      panelID: 'prospects-content-1',
    },
  ];

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </Tabs>
  );
}`,
    extjs: `Ext.create('Ext.tab.Panel', {
  items: [{
    title: 'All',
    html: '<p>Tab 0 selected</p>'
  }, {
    title: 'Accepts marketing',
    html: '<p>Tab 1 selected</p>'
  }, {
    title: 'Repeat customers',
    html: '<p>Tab 2 selected</p>'
  }, {
    title: 'Prospects',
    html: '<p>Tab 3 selected</p>'
  }],
  listeners: {
    tabchange: function(tabPanel, newCard, oldCard) {
      console.log('Tab changed to:', newCard.title);
    }
  }
});`,
    vanilla: `// HTML
<div class="tabs" role="tablist">
  <button 
    role="tab" 
    class="tab tab--selected" 
    aria-selected="true"
    aria-controls="panel-0"
    id="tab-0"
  >
    All
  </button>
  <button 
    role="tab" 
    class="tab" 
    aria-selected="false"
    aria-controls="panel-1"
    id="tab-1"
  >
    Accepts marketing
  </button>
  <button 
    role="tab" 
    class="tab" 
    aria-selected="false"
    aria-controls="panel-2"
    id="tab-2"
  >
    Repeat customers
  </button>
  <button 
    role="tab" 
    class="tab" 
    aria-selected="false"
    aria-controls="panel-3"
    id="tab-3"
  >
    Prospects
  </button>
</div>
<div class="tab-panels">
  <div 
    role="tabpanel" 
    id="panel-0" 
    aria-labelledby="tab-0"
    class="tab-panel tab-panel--active"
  >
    <div class="card-section">
      <h3 class="card-section__title">All</h3>
      <p>Tab 0 selected</p>
    </div>
  </div>
  <div 
    role="tabpanel" 
    id="panel-1" 
    aria-labelledby="tab-1"
    class="tab-panel"
    hidden
  >
    <div class="card-section">
      <h3 class="card-section__title">Accepts marketing</h3>
      <p>Tab 1 selected</p>
    </div>
  </div>
  <div 
    role="tabpanel" 
    id="panel-2" 
    aria-labelledby="tab-2"
    class="tab-panel"
    hidden
  >
    <div class="card-section">
      <h3 class="card-section__title">Repeat customers</h3>
      <p>Tab 2 selected</p>
    </div>
  </div>
  <div 
    role="tabpanel" 
    id="panel-3" 
    aria-labelledby="tab-3"
    class="tab-panel"
    hidden
  >
    <div class="card-section">
      <h3 class="card-section__title">Prospects</h3>
      <p>Tab 3 selected</p>
    </div>
  </div>
</div>

// CSS
.tabs {
  display: flex;
  border-bottom: 1px solid var(--p-color-border);
  background: var(--p-color-bg-surface);
}

.tab {
  padding: var(--p-space-300) var(--p-space-400);
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  font-size: var(--p-font-size-300);
  color: var(--p-color-text);
}

.tab:hover {
  background: var(--p-color-bg-surface-hover);
}

.tab--selected {
  color: var(--p-color-text-emphasis);
}

.tab--selected::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--p-color-border-emphasis);
}

.tab-panel {
  background: var(--p-color-bg-surface);
}

.card-section {
  padding: var(--p-space-400);
}

.card-section__title {
  font-size: var(--p-font-size-400);
  font-weight: var(--p-font-weight-semibold);
  margin: 0 0 var(--p-space-200) 0;
}

// JavaScript
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('tab--selected');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('tab--selected');
    tab.setAttribute('aria-selected', 'true');
    
    // Update panels
    panels.forEach(p => {
      p.classList.remove('tab-panel--active');
      p.setAttribute('hidden', '');
    });
    panels[index].classList.add('tab-panel--active');
    panels[index].removeAttribute('hidden');
    
    console.log('Tab changed to:', index);
  });
});`,
    typescript: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface Tab {
  id: string;
  content: string;
  accessibilityLabel?: string;
  panelID: string;
}

interface TabsExampleProps {
  tabs: Tab[];
  defaultSelected?: number;
  onTabChange?: (index: number) => void;
}

function TabsExample({ 
  tabs,
  defaultSelected = 0,
  onTabChange
}: TabsExampleProps): JSX.Element {
  const [selected, setSelected] = useState<number>(defaultSelected);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      onTabChange?.(selectedTabIndex);
    },
    [onTabChange],
  );

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <p>Tab {selected} selected</p>
      </LegacyCard.Section>
    </Tabs>
  );
}`
  }
};

// List Examples
export const listExamples = {
  bulleted: {
    react: `import {List} from '@shopify/polaris';
import React from 'react';

function ListExample() {
  return (
    <List type="bullet">
      <List.Item>Yellow shirt</List.Item>
      <List.Item>Red shirt</List.Item>
      <List.Item>Green shirt</List.Item>
    </List>
  );
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<ul class="polaris-list polaris-list--bullet">' +
        '<li>Yellow shirt</li>' +
        '<li>Red shirt</li>' +
        '<li>Green shirt</li>' +
        '</ul>'
});`,
    vanilla: `// HTML
<ul class="list list--bullet">
  <li class="list__item">Yellow shirt</li>
  <li class="list__item">Red shirt</li>
  <li class="list__item">Green shirt</li>
</ul>

// CSS
.list {
  margin: 0;
  padding: 0;
}

.list--bullet {
  list-style: disc;
  padding-left: var(--p-space-500);
}

.list__item {
  font-size: var(--p-font-size-300);
  line-height: var(--p-font-line-height-400);
  color: var(--p-color-text);
  margin-bottom: var(--p-space-100);
}

.list__item:last-child {
  margin-bottom: 0;
}`,
    typescript: `import {List} from '@shopify/polaris';
import React from 'react';

interface ListItem {
  id: string;
  content: string;
}

interface ListExampleProps {
  items: ListItem[] | string[];
  type?: 'bullet' | 'number';
}

function ListExample({ 
  items,
  type = 'bullet'
}: ListExampleProps): JSX.Element {
  return (
    <List type={type}>
      {items.map((item, index) => (
        <List.Item key={typeof item === 'string' ? index : item.id}>
          {typeof item === 'string' ? item : item.content}
        </List.Item>
      ))}
    </List>
  );
}`
  }
};

// Icon Examples
export const iconExamples = {
  default: {
    react: `import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';

function IconExample() {
  return <Icon source={PlusCircleIcon} />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<span class="polaris-icon">' +
        '<svg viewBox="0 0 20 20" class="polaris-icon__svg" focusable="false" aria-hidden="true">' +
        '<path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 9h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V8a1 1 0 0 1 2 0v3z" fill="currentColor"/>' +
        '</svg></span>',
  cls: 'polaris-icon-wrapper'
});`,
    vanilla: `// HTML
<span class="icon">
  <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 9h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V8a1 1 0 0 1 2 0v3z" fill="currentColor"/>
  </svg>
</span>

// CSS
.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--p-color-icon);
}

.icon svg {
  width: 100%;
  height: 100%;
}`,
    typescript: `import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';

interface IconExampleProps {
  source: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  tone?: 'base' | 'subdued' | 'primary' | 'success' | 'warning' | 'critical';
  accessibilityLabel?: string;
}

function IconExample({ 
  source,
  tone = 'base',
  accessibilityLabel
}: IconExampleProps): JSX.Element {
  return (
    <Icon 
      source={source} 
      tone={tone}
      accessibilityLabel={accessibilityLabel}
    />
  );
}`
  }
};

// Map of all component examples
const componentExamples: Record<string, any> = {
  'button-group': buttonGroupExamples,
  'button': buttonExamples,
  'card': cardExamples,
  'badge': badgeExamples,
  'text-field': textFieldExamples,
  'banner': bannerExamples,
  'select': selectExamples,
  'modal': modalExamples,
  'checkbox': checkboxExamples,
  'page': pageExamples,
  'layout': layoutExamples,
  'form-layout': formLayoutExamples,
  'tabs': tabsExamples,
  'list': listExamples,
  'icon': iconExamples,
  // TODO: Add more components here as we implement them
  // 'account-connection': accountConnectionExamples,
  // 'page-actions': pageActionsExamples,
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