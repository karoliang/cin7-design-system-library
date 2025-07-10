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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-button-group">
  <button class="polaris-button">Cancel</button>
  <button class="polaris-button polaris-button--primary">Save</button>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent} clicked\`);
  });
});
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-button-group polaris-button-group--segmented" role="group">
  <button class="polaris-button polaris-button--segmented" aria-pressed="false">Bold</button>
  <button class="polaris-button polaris-button--segmented" aria-pressed="false">Italic</button>
  <button class="polaris-button polaris-button--segmented" aria-pressed="false">Underline</button>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-button--segmented').forEach(button => {
  button.addEventListener('click', () => {
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', !isPressed);
    button.classList.toggle('polaris-button--pressed');
  });
});
</script>`,
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
  },
  'with-all-elements': {
    react: `import React, {useState} from 'react';
import {
  ActionList,
  Bleed,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Popover,
  ResourceList,
  Text,
} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

function CardWithAllElements() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [{content: 'Gross Sales'}, {content: 'Net Sales'}];

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      View Sales
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={items} />
    </Popover>
  );

  const salesMarkup = (
    <div>
      <ResourceList
        resourceName={{singular: 'sale', plural: 'sales'}}
        items={[
          {
            sales: 'Orders',
            amount: 'USD$0.00',
            url: '#',
          },
          {
            sales: 'Returns',
            amount: '-USD$250.00',
            url: '#',
          },
        ]}
        renderItem={(item) => {
          const {sales, amount, url} = item;
          return (
            <ResourceList.Item
              id={sales}
              url={url}
              accessibilityLabel={\`View Sales for \${sales}\`}
            >
              <InlineStack align="space-between">
                <div>{sales}</div>
                <div>{amount}</div>
              </InlineStack>
            </ResourceList.Item>
          );
        }}
      />
    </div>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Sales
          </Text>
          <ButtonGroup>
            <Button variant="plain">Total Sales</Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <BlockStack gap="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers'
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Total Sales Breakdown
          </Text>
        </BlockStack>
        {salesMarkup}
        <Bleed marginInline="400">
          <Box
            background="bg-surface-secondary"
            paddingBlock="300"
            paddingInline="400"
          >
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Deactivated reports
              </Text>
              <List>
                <List.Item>Payouts</List.Item>
                <List.Item>Total Sales By Channel</List.Item>
              </List>
            </BlockStack>
          </Box>
        </Bleed>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Note
          </Text>
          <Text as="p" variant="bodyMd">
            The sales reports are available only if your store is on the Shopify
            plan or higher.
          </Text>
          <InlineStack align="end">
            <ButtonGroup>
              <Button onClick={() => {}} accessibilityLabel="Dismiss">
                Dismiss
              </Button>
              <Button
                variant="primary"
                onClick={() => {}}
                icon={ExportIcon}
                accessibilityLabel="Export Report"
              >
                Export Report
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Sales',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  cls: 'polaris-card',
  bodyPadding: 16,
  shadow: true,
  tools: [{
    type: 'gear',
    tooltip: 'Total Sales',
    handler: function() {
      console.log('Total Sales clicked');
    }
  }, {
    type: 'help',
    tooltip: 'View Sales',
    handler: function() {
      console.log('View Sales clicked');
    }
  }],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p>You can use sales reports to see information about your customers\\' orders based on criteria such as sales over time, by channel, or by staff.</p>',
    margin: '0 0 16 0'
  }, {
    xtype: 'component',
    html: '<h3 style="font-weight: 500; margin: 0 0 16 0;">Total Sales Breakdown</h3>'
  }, {
    xtype: 'grid',
    store: {
      fields: ['sales', 'amount'],
      data: [
        { sales: 'Orders', amount: 'USD$0.00' },
        { sales: 'Returns', amount: '-USD$250.00' }
      ]
    },
    columns: [
      { text: 'Type', dataIndex: 'sales', flex: 1 },
      { text: 'Amount', dataIndex: 'amount', width: 120 }
    ],
    height: 150,
    margin: '0 0 16 0'
  }, {
    xtype: 'panel',
    cls: 'polaris-card-section--subdued',
    bodyPadding: 12,
    html: '<h3 style="font-weight: 500; margin: 0 0 8 0;">Deactivated reports</h3><ul><li>Payouts</li><li>Total Sales By Channel</li></ul>',
    margin: '0 0 16 0'
  }, {
    xtype: 'component',
    html: '<h3 style="font-weight: 500; margin: 0 0 8 0;">Note</h3><p>The sales reports are available only if your store is on the Shopify plan or higher.</p>',
    margin: '0 0 16 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      text: 'Dismiss',
      handler: function() {
        console.log('Dismiss clicked');
      }
    }, {
      text: 'Export Report',
      ui: 'primary',
      iconCls: 'export-icon',
      handler: function() {
        console.log('Export Report clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__header">
    <div class="polaris-card__header-title">
      <h2 class="polaris-text--heading-sm">Sales</h2>
    </div>
    <div class="polaris-button-group">
      <button class="polaris-button polaris-button--plain">Total Sales</button>
      <button class="polaris-button polaris-button--plain polaris-button--disclosure" id="view-sales-btn">
        View Sales
      </button>
    </div>
  </div>
  
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-loose">
      <p class="polaris-text--body-md">
        You can use sales reports to see information about your customers' orders 
        based on criteria such as sales over time, by channel, or by staff.
      </p>
      
      <h3 class="polaris-text--heading-sm">Total Sales Breakdown</h3>
      
      <div class="sales-list">
        <div class="sales-item">
          <span>Orders</span>
          <span>USD$0.00</span>
        </div>
        <div class="sales-item">
          <span>Returns</span>
          <span>-USD$250.00</span>
        </div>
      </div>
      
      <div class="polaris-card__section polaris-card__section--subdued">
        <h3 class="polaris-text--heading-sm">Deactivated reports</h3>
        <ul class="polaris-list">
          <li>Payouts</li>
          <li>Total Sales By Channel</li>
        </ul>
      </div>
      
      <div>
        <h3 class="polaris-text--heading-sm">Note</h3>
        <p class="polaris-text--body-md">
          The sales reports are available only if your store is on the Shopify plan or higher.
        </p>
      </div>
    </div>
  </div>
  
  <div class="polaris-card__footer">
    <div class="polaris-button-group">
      <button class="polaris-button" id="dismiss-btn">Dismiss</button>
      <button class="polaris-button polaris-button--primary" id="export-btn">
        <span class="polaris-button__icon">📄</span>
        Export Report
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('view-sales-btn').addEventListener('click', () => {
  console.log('View Sales clicked');
  // Show dropdown menu
});

document.getElementById('dismiss-btn').addEventListener('click', () => {
  console.log('Dismiss clicked');
});

document.getElementById('export-btn').addEventListener('click', () => {
  console.log('Export Report clicked');
});
</script>`,
    typescript: `import React, {useState} from 'react';
import {
  ActionList,
  Bleed,
  BlockStack,
  Box,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  InlineStack,
  List,
  Popover,
  ResourceList,
  Text,
} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

interface SalesItem {
  sales: string;
  amount: string;
  url: string;
}

interface ActionItem {
  content: string;
  onAction?: () => void;
}

interface CardWithAllElementsProps {
  title?: string;
  salesItems?: SalesItem[];
  actionItems?: ActionItem[];
  onDismiss?: () => void;
  onExport?: () => void;
}

function CardWithAllElements({
  title = "Sales",
  salesItems = [
    { sales: 'Orders', amount: 'USD$0.00', url: '#' },
    { sales: 'Returns', amount: '-USD$250.00', url: '#' }
  ],
  actionItems = [
    { content: 'Gross Sales' },
    { content: 'Net Sales' }
  ],
  onDismiss,
  onExport
}: CardWithAllElementsProps): JSX.Element {
  const [actionActive, toggleAction] = useState<boolean>(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Export Report clicked');
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Dismiss clicked');
    }
  };

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      View Sales
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={actionItems} />
    </Popover>
  );

  const salesMarkup = (
    <div>
      <ResourceList
        resourceName={{singular: 'sale', plural: 'sales'}}
        items={salesItems}
        renderItem={(item: SalesItem) => {
          const {sales, amount, url} = item;
          return (
            <ResourceList.Item
              id={sales}
              url={url}
              accessibilityLabel={\`View Sales for \${sales}\`}
            >
              <InlineStack align="space-between">
                <div>{sales}</div>
                <div>{amount}</div>
              </InlineStack>
            </ResourceList.Item>
          );
        }}
      />
    </div>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <ButtonGroup>
            <Button variant="plain">Total Sales</Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <BlockStack gap="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers'
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Total Sales Breakdown
          </Text>
        </BlockStack>
        {salesMarkup}
        <Bleed marginInline="400">
          <Box
            background="bg-surface-secondary"
            paddingBlock="300"
            paddingInline="400"
          >
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Deactivated reports
              </Text>
              <List>
                <List.Item>Payouts</List.Item>
                <List.Item>Total Sales By Channel</List.Item>
              </List>
            </BlockStack>
          </Box>
        </Bleed>
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Note
          </Text>
          <Text as="p" variant="bodyMd">
            The sales reports are available only if your store is on the Shopify
            plan or higher.
          </Text>
          <InlineStack align="end">
            <ButtonGroup>
              <Button onClick={handleDismiss} accessibilityLabel="Dismiss">
                Dismiss
              </Button>
              <Button
                variant="primary"
                onClick={handleExport}
                icon={ExportIcon}
                accessibilityLabel="Export Report"
              >
                Export Report
              </Button>
            </ButtonGroup>
          </InlineStack>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-critical-footer-actions': {
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

function CardWithCriticalFooterActions() {
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
            <Button
              variant="secondary"
              tone="critical"
              onClick={() => {}}
              accessibilityLabel="Cancel shipment"
            >
              Cancel shipment
            </Button>
            <Button
              variant="primary"
              onClick={() => {}}
              accessibilityLabel="Add tracking number"
            >
              Add tracking number
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Shipment 1234',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  cls: 'polaris-card',
  bodyPadding: 16,
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<h3 style="font-weight: 500; margin: 0 0 8 0;">Items</h3>',
    margin: '0 0 8 0'
  }, {
    xtype: 'component',
    html: '<ul><li>1 × Oasis Glass, 4-Pack</li><li>1 × Anubis Cup, 2-Pack</li></ul>',
    margin: '0 0 16 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      text: 'Cancel shipment',
      ui: 'critical',
      handler: function() {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to cancel this shipment?', function(choice) {
          if (choice === 'yes') {
            console.log('Shipment cancelled');
          }
        });
      }
    }, {
      text: 'Add tracking number',
      ui: 'primary',
      handler: function() {
        console.log('Add tracking number clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-tight">
      <h2 class="polaris-text--heading-sm">Shipment 1234</h2>
      
      <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-tight">
        <h3 class="polaris-text--heading-sm">Items</h3>
        <ul class="polaris-list">
          <li>1 × Oasis Glass, 4-Pack</li>
          <li>1 × Anubis Cup, 2-Pack</li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="polaris-card__footer">
    <div class="polaris-button-group">
      <button class="polaris-button polaris-button--secondary polaris-button--critical" id="cancel-btn">
        Cancel shipment
      </button>
      <button class="polaris-button polaris-button--primary" id="tracking-btn">
        Add tracking number
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('cancel-btn').addEventListener('click', () => {
  if (confirm('Are you sure you want to cancel this shipment?')) {
    console.log('Shipment cancelled');
  }
});

document.getElementById('tracking-btn').addEventListener('click', () => {
  console.log('Add tracking number clicked');
});
</script>`,
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

interface ShipmentItem {
  id: string;
  quantity: number;
  name: string;
}

interface CardWithCriticalFooterActionsProps {
  shipmentId?: string;
  items?: ShipmentItem[];
  onCancelShipment?: () => void;
  onAddTracking?: () => void;
}

function CardWithCriticalFooterActions({
  shipmentId = "1234",
  items = [
    { id: '1', quantity: 1, name: 'Oasis Glass, 4-Pack' },
    { id: '2', quantity: 1, name: 'Anubis Cup, 2-Pack' }
  ],
  onCancelShipment,
  onAddTracking
}: CardWithCriticalFooterActionsProps): JSX.Element {
  const handleCancelShipment = () => {
    if (onCancelShipment) {
      onCancelShipment();
    } else {
      console.log('Cancel shipment clicked');
    }
  };

  const handleAddTracking = () => {
    if (onAddTracking) {
      onAddTracking();
    } else {
      console.log('Add tracking number clicked');
    }
  };

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
            <Button
              variant="secondary"
              tone="critical"
              onClick={handleCancelShipment}
              accessibilityLabel="Cancel shipment"
            >
              Cancel shipment
            </Button>
            <Button
              variant="primary"
              onClick={handleAddTracking}
              accessibilityLabel="Add tracking number"
            >
              Add tracking number
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-custom-footer-actions': {
    react: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Text,
} from '@shopify/polaris';

function CardWithCustomFooterActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Secure your account with 2-step authentication
          </Text>
          <Text as="p" variant="bodyMd">
            Two-step authentication adds an extra layer of security when logging
            in to your account. A special code will be required each time you
            log in, ensuring only you can access your account.
          </Text>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button
              onClick={() => {}}
              accessibilityLabel="Enable two-step authentication"
            >
              Enable two-step authentication
            </Button>
            <Button variant="plain">Learn more</Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Secure your account with 2-step authentication',
  headerCfg: {
    style: {
      fontSize: '14px',
      fontWeight: '500'
    }
  },
  cls: 'polaris-card',
  bodyPadding: 16,
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p>Two-step authentication adds an extra layer of security when logging in to your account. A special code will be required each time you log in, ensuring only you can access your account.</p>',
    margin: '0 0 24 0'
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    items: [{
      text: 'Enable two-step authentication',
      handler: function() {
        console.log('Enable two-step authentication clicked');
      }
    }, {
      text: 'Learn more',
      ui: 'plain',
      handler: function() {
        console.log('Learn more clicked');
        window.open('https://help.shopify.com/en/manual/account/account-security/two-step-authentication');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical polaris-stack--spacing-loose">
      <h2 class="polaris-text--heading-sm">
        Secure your account with 2-step authentication
      </h2>
      <p class="polaris-text--body-md">
        Two-step authentication adds an extra layer of security when logging
        in to your account. A special code will be required each time you
        log in, ensuring only you can access your account.
      </p>
    </div>
  </div>
  
  <div class="polaris-card__footer">
    <div class="polaris-button-group">
      <button class="polaris-button" id="enable-2fa-btn">
        Enable two-step authentication
      </button>
      <button class="polaris-button polaris-button--plain" id="learn-more-btn">
        Learn more
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('enable-2fa-btn').addEventListener('click', () => {
  console.log('Enable two-step authentication clicked');
});

document.getElementById('learn-more-btn').addEventListener('click', () => {
  console.log('Learn more clicked');
  window.open('https://help.shopify.com/en/manual/account/account-security/two-step-authentication');
});
</script>`,
    typescript: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  Text,
} from '@shopify/polaris';

interface SecurityAction {
  content: string;
  onAction?: () => void;
  url?: string;
  variant?: 'primary' | 'secondary' | 'plain';
}

interface CardWithCustomFooterActionsProps {
  title?: string;
  description?: string;
  primaryAction?: SecurityAction;
  secondaryAction?: SecurityAction;
}

function CardWithCustomFooterActions({
  title = "Secure your account with 2-step authentication",
  description = "Two-step authentication adds an extra layer of security when logging in to your account. A special code will be required each time you log in, ensuring only you can access your account.",
  primaryAction = {
    content: "Enable two-step authentication",
    onAction: () => console.log('Enable two-step authentication clicked')
  },
  secondaryAction = {
    content: "Learn more",
    variant: "plain",
    url: "https://help.shopify.com/en/manual/account/account-security/two-step-authentication"
  }
}: CardWithCustomFooterActionsProps): JSX.Element {
  const handlePrimaryAction = () => {
    if (primaryAction?.onAction) {
      primaryAction.onAction();
    }
  };

  const handleSecondaryAction = () => {
    if (secondaryAction?.onAction) {
      secondaryAction.onAction();
    } else if (secondaryAction?.url) {
      window.open(secondaryAction.url);
    }
  };

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Text as="p" variant="bodyMd">
            {description}
          </Text>
        </BlockStack>
        <InlineStack align="end">
          <ButtonGroup>
            <Button
              onClick={handlePrimaryAction}
              accessibilityLabel={primaryAction?.content}
              variant={primaryAction?.variant}
            >
              {primaryAction?.content}
            </Button>
            <Button 
              variant={secondaryAction?.variant || "plain"}
              onClick={handleSecondaryAction}
            >
              {secondaryAction?.content}
            </Button>
          </ButtonGroup>
        </InlineStack>
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge">Fulfilled</span>
  </div>
</div>`,
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
  },
  attention: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge tone="attention">Open</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--attention">Open</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--attention">Open</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface AttentionBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

function AttentionBadge({ 
  children, 
  tone = "attention" 
}: AttentionBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{children}</Badge>
    </Card>
  );
}`
  },
  complete: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge progress="complete">Fulfilled</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--complete">Fulfilled</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--complete">Fulfilled</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';

interface CompleteBadgeProps {
  children: React.ReactNode;
  progress?: BadgeProgress;
}

function CompleteBadge({ 
  children, 
  progress = "complete" 
}: CompleteBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge progress={progress}>{children}</Badge>
    </Card>
  );
}`
  },
  small: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge size="small">Fulfilled</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--small">Fulfilled</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--small">Fulfilled</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeSize = 'small' | 'medium';

interface SmallBadgeProps {
  children: React.ReactNode;
  size?: BadgeSize;
}

function SmallBadge({ 
  children, 
  size = "small" 
}: SmallBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge size={size}>{children}</Badge>
    </Card>
  );
}`
  },
  incomplete: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge progress="incomplete" tone="attention">
        Unfulfilled
      </Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--incomplete polaris-badge--attention">Unfulfilled</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--incomplete polaris-badge--attention">Unfulfilled</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';
type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface IncompleteBadgeProps {
  children: React.ReactNode;
  progress?: BadgeProgress;
  tone?: BadgeTone;
}

function IncompleteBadge({ 
  children, 
  progress = "incomplete",
  tone = "attention"
}: IncompleteBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge progress={progress} tone={tone}>
        {children}
      </Badge>
    </Card>
  );
}`
  },
  informational: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge tone="info">Draft</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--info">Draft</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--info">Draft</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface InformationalBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

function InformationalBadge({ 
  children, 
  tone = "info" 
}: InformationalBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{children}</Badge>
    </Card>
  );
}`
  },
  warning: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge tone="warning">On hold</Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--warning">On hold</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--warning">On hold</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface WarningBadgeProps {
  children: React.ReactNode;
  tone?: BadgeTone;
}

function WarningBadge({ 
  children, 
  tone = "warning" 
}: WarningBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge tone={tone}>{children}</Badge>
    </Card>
  );
}`
  },
  'partially-complete': {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return (
    <Card>
      <Badge progress="partiallyComplete" tone="warning">
        Partially fulfilled
      </Badge>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-badge polaris-badge--partially-complete polaris-badge--warning">Partially fulfilled</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <span class="polaris-badge polaris-badge--partially-complete polaris-badge--warning">Partially fulfilled</span>
  </div>
</div>`,
    typescript: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';
type BadgeTone = 'success' | 'critical' | 'warning' | 'attention' | 'new' | 'info';

interface PartiallyCompleteBadgeProps {
  children: React.ReactNode;
  progress?: BadgeProgress;
  tone?: BadgeTone;
}

function PartiallyCompleteBadge({ 
  children, 
  progress = "partiallyComplete",
  tone = "warning"
}: PartiallyCompleteBadgeProps): JSX.Element {
  return (
    <Card>
      <Badge progress={progress} tone={tone}>
        {children}
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
  },
  disabled: {
    react: `import {TextField} from '@shopify/polaris';
import React from 'react';

function TextFieldExample() {
  return <TextField label="Store name" disabled autoComplete="off" />;
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  name: 'storeName',
  disabled: true,
  emptyText: 'Enter store name',
  cls: 'polaris-text-field',
  labelAlign: 'top',
  labelCls: 'polaris-label',
  width: 300
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-layout">
  <div class="polaris-text-field">
    <label class="polaris-label" for="store-name">Store name</label>
    <input 
      id="store-name"
      class="polaris-text-field__input" 
      type="text" 
      autocomplete="off"
      disabled
      aria-describedby="store-name-help"
    />
  </div>
</div>

<script>
// JavaScript behavior (minimal for disabled field)
const input = document.getElementById('store-name');
console.log('Field is disabled:', input.disabled);
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import React from 'react';

interface DisabledTextFieldProps {
  label?: string;
  value?: string;
  placeholder?: string;
  autoComplete?: string;
}

function DisabledTextField({ 
  label = "Store name",
  value = "",
  placeholder,
  autoComplete = "off"
}: DisabledTextFieldProps): JSX.Element {
  return (
    <TextField 
      label={label} 
      value={value}
      disabled 
      autoComplete={autoComplete}
      placeholder={placeholder}
    />
  );
}`
  },
  email: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function EmailFieldExample() {
  const [value, setValue] = useState('bernadette.lapresse@jadedpixel.com');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Email"
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Email',
  name: 'email',
  inputType: 'email',
  value: 'bernadette.lapresse@jadedpixel.com',
  cls: 'polaris-text-field',
  labelAlign: 'top',
  labelCls: 'polaris-label',
  width: 300,
  vtype: 'email',
  listeners: {
    change: function(field, newValue) {
      console.log('Email changed to:', newValue);
    },
    blur: function(field) {
      if (!field.isValid()) {
        Ext.Msg.alert('Validation Error', 'Please enter a valid email address');
      }
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-layout">
  <div class="polaris-text-field">
    <label class="polaris-label" for="email-field">Email</label>
    <input 
      id="email-field"
      class="polaris-text-field__input" 
      type="email" 
      value="bernadette.lapresse@jadedpixel.com"
      autocomplete="email"
      aria-describedby="email-field-help"
    />
  </div>
</div>

<script>
// JavaScript behavior
const emailInput = document.getElementById('email-field');

emailInput.addEventListener('input', (event) => {
  const value = event.target.value;
  console.log('Email changed to:', value);
  
  // Basic email validation
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (value && !emailRegex.test(value)) {
    emailInput.setAttribute('aria-invalid', 'true');
  } else {
    emailInput.removeAttribute('aria-invalid');
  }
});

emailInput.addEventListener('blur', (event) => {
  const value = event.target.value;
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (value && !emailRegex.test(value)) {
    console.warn('Invalid email format');
  }
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface EmailFieldProps {
  label?: string;
  initialValue?: string;
  onEmailChange?: (email: string) => void;
  onValidation?: (isValid: boolean) => void;
  required?: boolean;
}

function EmailFieldExample({ 
  label = "Email",
  initialValue = "bernadette.lapresse@jadedpixel.com",
  onEmailChange,
  onValidation,
  required = false
}: EmailFieldProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>('');

  const validateEmail = useCallback((email: string): boolean => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onEmailChange?.(newValue);

      // Validate email format
      if (newValue && !validateEmail(newValue)) {
        setError('Please enter a valid email address');
        onValidation?.(false);
      } else if (required && !newValue) {
        setError('Email is required');
        onValidation?.(false);
      } else {
        setError('');
        onValidation?.(true);
      }
    },
    [onEmailChange, onValidation, required, validateEmail],
  );

  return (
    <TextField
      label={label}
      type="email"
      value={value}
      onChange={handleChange}
      autoComplete="email"
      error={error}
      required={required}
    />
  );
}`
  },
  multiline: {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function MultilineFieldExample() {
  const [value, setValue] = useState('1776 Barnes Street\\nOrlando, FL 32801');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  return (
    <TextField
      label="Shipping address"
      value={value}
      onChange={handleChange}
      multiline={4}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.TextArea', {
  fieldLabel: 'Shipping address',
  name: 'shippingAddress',
  value: '1776 Barnes Street\\nOrlando, FL 32801',
  cls: 'polaris-text-field',
  labelAlign: 'top',
  labelCls: 'polaris-label',
  width: 300,
  height: 100,
  rows: 4,
  listeners: {
    change: function(field, newValue) {
      console.log('Address changed to:', newValue);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-layout">
  <div class="polaris-text-field">
    <label class="polaris-label" for="address-field">Shipping address</label>
    <textarea 
      id="address-field"
      class="polaris-text-field__input polaris-text-field__input--multiline" 
      rows="4"
      autocomplete="off"
      aria-describedby="address-field-help"
    >1776 Barnes Street
Orlando, FL 32801</textarea>
  </div>
</div>

<script>
// JavaScript behavior
const addressInput = document.getElementById('address-field');

addressInput.addEventListener('input', (event) => {
  const value = event.target.value;
  console.log('Address changed to:', value);
  
  // Auto-resize textarea if needed
  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
});

// Set initial height
addressInput.style.height = 'auto';
addressInput.style.height = addressInput.scrollHeight + 'px';
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface MultilineTextFieldProps {
  label?: string;
  initialValue?: string;
  rows?: number;
  maxLength?: number;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}

function MultilineTextField({ 
  label = "Shipping address",
  initialValue = "1776 Barnes Street\\nOrlando, FL 32801",
  rows = 4,
  maxLength,
  onValueChange,
  placeholder
}: MultilineTextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);
  const [characterCount, setCharacterCount] = useState<number>(initialValue.length);

  const handleChange = useCallback(
    (newValue: string) => {
      if (maxLength && newValue.length > maxLength) {
        return; // Don't update if exceeds max length
      }
      
      setValue(newValue);
      setCharacterCount(newValue.length);
      onValueChange?.(newValue);
    },
    [maxLength, onValueChange],
  );

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      multiline={rows}
      autoComplete="off"
      placeholder={placeholder}
      showCharacterCount={maxLength !== undefined}
      maxLength={maxLength}
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
  },
  dismissible: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner onDismiss={() => {}}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
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
    html: '<div class="banner-icon">ℹ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    html: '<p>Use your finance report to get detailed information about your business. <a href="#" class="banner-link">Let us know what you think</a></p>'
  }, {
    xtype: 'button',
    text: '×',
    ui: 'plain',
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 7v3M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <p>
      Use your finance report to get detailed information about your business. 
      <a href="#" class="polaris-banner__link">Let us know what you think</a>
    </p>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
// JavaScript behavior
document.getElementById('dismiss-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,
    typescript: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

interface DismissibleBannerProps {
  message?: React.ReactNode;
  linkText?: string;
  linkUrl?: string;
  onDismiss?: () => void;
}

function DismissibleBanner({
  message = "Use your finance report to get detailed information about your business.",
  linkText = "Let us know what you think",
  linkUrl = "",
  onDismiss
}: DismissibleBannerProps): JSX.Element {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Banner dismissed');
    }
  };

  return (
    <Banner onDismiss={handleDismiss}>
      <p>
        {message}{' '}
        <Link url={linkUrl}>{linkText}</Link>
      </p>
    </Banner>
  );
}`
  },
  informational: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      tone="info"
      onDismiss={() => {}}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--info',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">ℹ</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">USPS has updated their rates</h3>'
    }, {
      xtype: 'component',
      html: '<p>Make sure you know how these changes affect your store.</p>'
    }, {
      xtype: 'container',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        text: 'Update rates',
        handler: function() {
          console.log('Update rates clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more',
        ui: 'plain',
        handler: function() {
          console.log('Learn more clicked');
        }
      }]
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--info" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 7v3M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">USPS has updated their rates</h3>
    <p>Make sure you know how these changes affect your store.</p>
    <div class="polaris-banner__actions">
      <button class="polaris-button" id="update-rates-btn">Update rates</button>
      <button class="polaris-button polaris-button--plain" id="learn-more-btn">Learn more</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-info-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
// JavaScript behavior
document.getElementById('update-rates-btn').addEventListener('click', () => {
  console.log('Update rates clicked');
});

document.getElementById('learn-more-btn').addEventListener('click', () => {
  console.log('Learn more clicked');
});

document.getElementById('dismiss-info-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,
    typescript: `import {Banner} from '@shopify/polaris';
import React from 'react';

interface BannerAction {
  content: string;
  url?: string;
  onAction?: () => void;
}

interface InformationalBannerProps {
  title?: string;
  message?: string;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  onDismiss?: () => void;
  tone?: 'success' | 'info' | 'warning' | 'critical';
}

function InformationalBanner({
  title = "USPS has updated their rates",
  message = "Make sure you know how these changes affect your store.",
  primaryAction = { content: 'Update rates', url: '' },
  secondaryAction = { content: 'Learn more' },
  onDismiss,
  tone = "info"
}: InformationalBannerProps): JSX.Element {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Banner dismissed');
    }
  };

  return (
    <Banner
      title={title}
      action={primaryAction}
      secondaryAction={secondaryAction}
      tone={tone}
      onDismiss={handleDismiss}
    >
      <p>{message}</p>
    </Banner>
  );
}`
  },
  warning: {
    react: `import {Banner, List} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner
      title="Before you can purchase a shipping label, this change needs to be made:"
      action={{content: 'Edit address'}}
      tone="warning"
    >
      <List>
        <List.Item>
          The name of the city you're shipping to has characters that aren't
          allowed. City name can only include spaces and hyphens.
        </List.Item>
      </List>
    </Banner>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--warning',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">⚠</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Before you can purchase a shipping label, this change needs to be made:</h3>'
    }, {
      xtype: 'component',
      html: '<ul><li>The name of the city you\\'re shipping to has characters that aren\\'t allowed. City name can only include spaces and hyphens.</li></ul>'
    }, {
      xtype: 'button',
      text: 'Edit address',
      handler: function() {
        console.log('Edit address clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--warning" role="alert" aria-live="assertive">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2L2 18h16L10 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 8v4M10 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">Before you can purchase a shipping label, this change needs to be made:</h3>
    <ul class="polaris-list">
      <li>
        The name of the city you're shipping to has characters that aren't
        allowed. City name can only include spaces and hyphens.
      </li>
    </ul>
    <div class="polaris-banner__actions">
      <button class="polaris-button" id="edit-address-btn">Edit address</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('edit-address-btn').addEventListener('click', () => {
  console.log('Edit address clicked');
});
</script>`,
    typescript: `import {Banner, List} from '@shopify/polaris';
import React from 'react';

interface ValidationIssue {
  id: string;
  message: string;
}

interface WarningBannerProps {
  title?: string;
  issues?: ValidationIssue[];
  actionText?: string;
  onAction?: () => void;
}

function WarningBanner({
  title = "Before you can purchase a shipping label, this change needs to be made:",
  issues = [{
    id: '1',
    message: "The name of the city you're shipping to has characters that aren't allowed. City name can only include spaces and hyphens."
  }],
  actionText = "Edit address",
  onAction
}: WarningBannerProps): JSX.Element {
  const handleAction = () => {
    if (onAction) {
      onAction();
    } else {
      console.log('Warning action clicked');
    }
  };

  return (
    <Banner
      title={title}
      action={{ content: actionText, onAction: handleAction }}
      tone="warning"
    >
      <List>
        {issues.map((issue) => (
          <List.Item key={issue.id}>
            {issue.message}
          </List.Item>
        ))}
      </List>
    </Banner>
  );
}`
  },
  'in-a-card': {
    react: `import {LegacyCard, TextContainer, Banner, Link} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <TextContainer>
        <Banner onDismiss={() => {}}>
          <p>
            Use your finance report to get detailed information about your
            business. <Link url="">Let us know what you think</Link>
          </p>
        </Banner>

        <p>View a summary of your online store's performance.</p>
      </TextContainer>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  items: [{
    xtype: 'container',
    html: '<div class="polaris-text-container">',
    items: [{
      xtype: 'panel',
      cls: 'polaris-banner',
      bodyPadding: 12,
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      items: [{
        xtype: 'component',
        html: '<div class="banner-icon">ℹ</div>',
        width: 20
      }, {
        xtype: 'container',
        flex: 1,
        html: '<p>Use your finance report to get detailed information about your business. <a href="#" class="banner-link">Let us know what you think</a></p>'
      }, {
        xtype: 'button',
        text: '×',
        ui: 'plain',
        handler: function() {
          this.up('panel').destroy();
        }
      }]
    }, {
      xtype: 'component',
      html: '<p>View a summary of your online store\\'s performance.</p>',
      margin: '16 0 0 0'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__header">
    <h2 class="polaris-card__title">Online store dashboard</h2>
  </div>
  <div class="polaris-card__section">
    <div class="polaris-text-container">
      <div class="polaris-banner" role="status" aria-live="polite">
        <div class="polaris-banner__icon">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
            <path d="M10 7v3M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="polaris-banner__content">
          <p>
            Use your finance report to get detailed information about your
            business. <a href="#" class="polaris-banner__link">Let us know what you think</a>
          </p>
        </div>
        <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-card-banner">
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
          </svg>
        </button>
      </div>
      
      <p>View a summary of your online store's performance.</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('dismiss-card-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,
    typescript: `import {LegacyCard, TextContainer, Banner, Link} from '@shopify/polaris';
import React from 'react';

interface CardBannerProps {
  cardTitle?: string;
  bannerMessage?: React.ReactNode;
  linkText?: string;
  linkUrl?: string;
  cardContent?: string;
  onBannerDismiss?: () => void;
}

function CardWithBanner({
  cardTitle = "Online store dashboard",
  bannerMessage = "Use your finance report to get detailed information about your business.",
  linkText = "Let us know what you think",
  linkUrl = "",
  cardContent = "View a summary of your online store's performance.",
  onBannerDismiss
}: CardBannerProps): JSX.Element {
  const handleBannerDismiss = () => {
    if (onBannerDismiss) {
      onBannerDismiss();
    } else {
      console.log('Banner dismissed');
    }
  };

  return (
    <LegacyCard title={cardTitle} sectioned>
      <TextContainer>
        <Banner onDismiss={handleBannerDismiss}>
          <p>
            {bannerMessage} <Link url={linkUrl}>{linkText}</Link>
          </p>
        </Banner>

        <p>{cardContent}</p>
      </TextContainer>
    </LegacyCard>
  );
}`
  },
  'with-focus': {
    react: `import {Banner, BannerHandles} from '@shopify/polaris';
import React, {useEffect, useRef} from 'react';

function BannerWithFocusExample() {
  const banner = useRef<BannerHandles>(null);

  useEffect(() => banner.current?.focus(), []);

  return (
    <Banner
      title="High risk of fraud detected"
      onDismiss={() => {}}
      tone="critical"
      ref={banner}
    >
      <p>
        Before fulfilling this order or capturing payment, please review the
        fraud analysis and determine if this order is fraudulent
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
  listeners: {
    afterrender: function() {
      // Focus the banner after render
      this.focus();
    }
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">⚠</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">High risk of fraud detected</h3>'
    }, {
      xtype: 'component',
      html: '<p>Before fulfilling this order or capturing payment, please review the fraud analysis and determine if this order is fraudulent</p>'
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--critical" role="alert" aria-live="assertive" tabindex="0" id="fraud-banner">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2L2 18h16L10 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 8v4M10 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">High risk of fraud detected</h3>
    <p>
      Before fulfilling this order or capturing payment, please review the
      fraud analysis and determine if this order is fraudulent
    </p>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-fraud-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
// JavaScript behavior
document.addEventListener('DOMContentLoaded', () => {
  // Focus the banner when page loads
  const banner = document.getElementById('fraud-banner');
  if (banner) {
    banner.focus();
  }
});

document.getElementById('dismiss-fraud-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,
    typescript: `import {Banner, BannerHandles} from '@shopify/polaris';
import React, {useEffect, useRef} from 'react';

interface FocusableBannerProps {
  title?: string;
  message?: string;
  tone?: 'success' | 'info' | 'warning' | 'critical';
  onDismiss?: () => void;
  autoFocus?: boolean;
}

function FocusableBanner({
  title = "High risk of fraud detected",
  message = "Before fulfilling this order or capturing payment, please review the fraud analysis and determine if this order is fraudulent",
  tone = "critical",
  onDismiss,
  autoFocus = true
}: FocusableBannerProps): JSX.Element {
  const banner = useRef<BannerHandles>(null);

  useEffect(() => {
    if (autoFocus) {
      banner.current?.focus();
    }
  }, [autoFocus]);

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Critical banner dismissed');
    }
  };

  return (
    <Banner
      title={title}
      onDismiss={handleDismiss}
      tone={tone}
      ref={banner}
    >
      <p>{message}</p>
    </Banner>
  );
}`
  },
  'with-footer-call-to-action': {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner
      title="Some of your product variants are missing weights"
      tone="warning"
      action={{content: 'Edit variant weights', url: ''}}
      secondaryAction={{content: 'Learn more', url: ''}}
      onDismiss={() => {}}
    >
      <p>
        Add weights to show accurate rates at checkout and when buying shipping
        labels in Shopify.
      </p>
    </Banner>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-banner polaris-banner--warning',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<div class="banner-icon">⚠</div>',
    width: 20
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<h3 class="banner-title">Some of your product variants are missing weights</h3>'
    }, {
      xtype: 'component',
      html: '<p>Add weights to show accurate rates at checkout and when buying shipping labels in Shopify.</p>'
    }, {
      xtype: 'container',
      layout: 'hbox',
      margin: '8 0 0 0',
      items: [{
        xtype: 'button',
        text: 'Edit variant weights',
        handler: function() {
          console.log('Edit variant weights clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more',
        ui: 'plain',
        margin: '0 0 0 8',
        handler: function() {
          console.log('Learn more clicked');
        }
      }]
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner polaris-banner--warning" role="alert" aria-live="assertive">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2L2 18h16L10 2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 8v4M10 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">Some of your product variants are missing weights</h3>
    <p>
      Add weights to show accurate rates at checkout and when buying shipping
      labels in Shopify.
    </p>
    <div class="polaris-banner__actions">
      <button class="polaris-button" id="edit-weights-btn">Edit variant weights</button>
      <button class="polaris-button polaris-button--plain" id="weights-learn-more-btn">Learn more</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-weights-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
// JavaScript behavior
document.getElementById('edit-weights-btn').addEventListener('click', () => {
  console.log('Edit variant weights clicked');
});

document.getElementById('weights-learn-more-btn').addEventListener('click', () => {
  console.log('Learn more clicked');
});

document.getElementById('dismiss-weights-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,
    typescript: `import {Banner} from '@shopify/polaris';
import React from 'react';

interface BannerAction {
  content: string;
  url?: string;
  onAction?: () => void;
}

interface FooterActionBannerProps {
  title?: string;
  message?: string;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  tone?: 'success' | 'info' | 'warning' | 'critical';
  onDismiss?: () => void;
}

function FooterActionBanner({
  title = "Some of your product variants are missing weights",
  message = "Add weights to show accurate rates at checkout and when buying shipping labels in Shopify.",
  primaryAction = { content: 'Edit variant weights', url: '' },
  secondaryAction = { content: 'Learn more', url: '' },
  tone = "warning",
  onDismiss
}: FooterActionBannerProps): JSX.Element {
  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      console.log('Banner dismissed');
    }
  };

  return (
    <Banner
      title={title}
      tone={tone}
      action={primaryAction}
      secondaryAction={secondaryAction}
      onDismiss={handleDismiss}
    >
      <p>{message}</p>
    </Banner>
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

// Avatar Examples
export const avatarExamples = {
  default: {
    react: `import {Avatar} from '@shopify/polaris';
import React from 'react';

function AvatarExample() {
  return <Avatar customer name="Farrah" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="avatar avatar--customer" title="Farrah"><svg viewBox="0 0 20 20"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z"/></svg></div>',
  cls: 'polaris-avatar',
  listeners: {
    afterrender: function(cmp) {
      cmp.getEl().down('.avatar').set({
        'aria-label': 'Farrah',
        'role': 'img'
      });
    }
  }
});`,
    vanilla: `// HTML
<div class="avatar avatar--customer" aria-label="Farrah" role="img">
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z" fill="currentColor"/>
  </svg>
</div>

// CSS
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--p-color-avatar-background-experimental);
  color: var(--p-color-avatar-text-on-background-experimental);
}

.avatar--customer svg {
  width: 20px;
  height: 20px;
}`,
    typescript: `import {Avatar} from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  name: string;
  customer?: boolean;
  source?: string;
}

function AvatarExample({ 
  name = "Farrah",
  customer = true,
  source
}: AvatarExampleProps): JSX.Element {
  return (
    <Avatar 
      customer={customer} 
      name={name}
      source={source}
    />
  );
}`
  },
  'extra-small': {
    react: `import {Button, Popover, ActionList, Avatar} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ExtraSmallAvatarExample() {
  const [active, setActive] = useState(true);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const activator = (
    <Button onClick={toggleActive} disclosure>
      Manage staff
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList
          items={[
            {
              content: 'Chet Baker',
              prefix: <Avatar customer size="xs" name="Chet Baker" />,
            },
            {
              content: 'Farrah Fawcett',
              prefix: <Avatar customer size="xs" name="Farrah Fawcett" />,
            },
          ]}
        />
      </Popover>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Manage staff',
  iconCls: 'x-fa fa-caret-down',
  iconAlign: 'right',
  menu: {
    items: [{
      text: 'Chet Baker',
      icon: null,
      cls: 'avatar-menu-item',
      html: '<span class="avatar avatar--xs avatar--customer" title="Chet Baker"><svg viewBox="0 0 20 20"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z"/></svg></span> Chet Baker'
    }, {
      text: 'Farrah Fawcett',
      icon: null,
      cls: 'avatar-menu-item',
      html: '<span class="avatar avatar--xs avatar--customer" title="Farrah Fawcett"><svg viewBox="0 0 20 20"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z"/></svg></span> Farrah Fawcett'
    }]
  }
});`,
    vanilla: `// HTML
<div class="dropdown">
  <button class="button button--disclosure" aria-expanded="false" aria-controls="staff-menu">
    Manage staff
    <svg class="icon icon--caret" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>
  </button>
  <div id="staff-menu" class="dropdown-menu" hidden>
    <ul class="action-list" role="list">
      <li class="action-list__item">
        <button class="action-list__button">
          <span class="avatar avatar--xs avatar--customer" aria-label="Chet Baker">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z" fill="currentColor"/>
            </svg>
          </span>
          <span>Chet Baker</span>
        </button>
      </li>
      <li class="action-list__item">
        <button class="action-list__button">
          <span class="avatar avatar--xs avatar--customer" aria-label="Farrah Fawcett">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z" fill="currentColor"/>
            </svg>
          </span>
          <span>Farrah Fawcett</span>
        </button>
      </li>
    </ul>
  </div>
</div>

// CSS
.avatar--xs {
  width: 24px;
  height: 24px;
}

.action-list__button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 16px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

.action-list__button:hover {
  background: var(--p-color-bg-surface-hover);
}

// JavaScript
const button = document.querySelector('.button--disclosure');
const menu = document.getElementById('staff-menu');

button.addEventListener('click', () => {
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isOpen);
  menu.hidden = isOpen;
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    button.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }
});`,
    typescript: `import {Button, Popover, ActionList, Avatar} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StaffMember {
  id: string;
  name: string;
  avatar?: string;
}

interface ExtraSmallAvatarExampleProps {
  staffMembers?: StaffMember[];
  onSelectMember?: (member: StaffMember) => void;
}

function ExtraSmallAvatarExample({
  staffMembers = [
    { id: '1', name: 'Chet Baker' },
    { id: '2', name: 'Farrah Fawcett' }
  ],
  onSelectMember
}: ExtraSmallAvatarExampleProps): JSX.Element {
  const [active, setActive] = useState(false);
  
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  
  const handleSelectMember = useCallback((member: StaffMember) => {
    onSelectMember?.(member);
    setActive(false);
  }, [onSelectMember]);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Manage staff
    </Button>
  );

  const actionListItems = staffMembers.map((member) => ({
    content: member.name,
    prefix: (
      <Avatar 
        customer 
        size="xs" 
        name={member.name}
        source={member.avatar}
      />
    ),
    onAction: () => handleSelectMember(member)
  }));

  return (
    <div style={{height: '250px'}}>
      <Popover active={active} activator={activator} onClose={toggleActive}>
        <ActionList items={actionListItems} />
      </Popover>
    </div>
  );
}`
  },
  initials: {
    react: `import {Avatar} from '@shopify/polaris';
import React from 'react';

function AvatarExample() {
  return <Avatar initials="WW" name="Woluwayemisi Weun-Jung" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="avatar avatar--initials" title="Woluwayemisi Weun-Jung"><span>WW</span></div>',
  cls: 'polaris-avatar',
  listeners: {
    afterrender: function(cmp) {
      cmp.getEl().down('.avatar').set({
        'aria-label': 'Woluwayemisi Weun-Jung',
        'role': 'img'
      });
    }
  }
});`,
    vanilla: `// HTML
<div class="avatar avatar--initials" aria-label="Woluwayemisi Weun-Jung" role="img">
  <span>WW</span>
</div>

// CSS
.avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--p-color-avatar-background-experimental);
  color: var(--p-color-avatar-text-on-background-experimental);
  font-size: 14px;
  font-weight: 500;
}

.avatar--initials span {
  text-transform: uppercase;
  user-select: none;
}`,
    typescript: `import {Avatar} from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  initials: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

function AvatarExample({ 
  initials,
  name,
  size = 'md'
}: AvatarExampleProps): JSX.Element {
  return (
    <Avatar 
      initials={initials} 
      name={name}
      size={size}
    />
  );
}`
  }
};

// Bleed Examples
export const bleedExamples = {
  horizontal: {
    react: `import {Bleed, Box, Card} from '@shopify/polaris';
import React from 'react';

function BleedExample() {
  return (
    <Box width="320px">
      <Card>
        <Bleed marginInline="400">
          <Placeholder label="marginInline" />
        </Bleed>
      </Card>
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: 'var(--p-color-bg-surface)',
        }}
      >
        <Text size="bodyMd" as="p" fontWeight="regular">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  width: 320,
  bodyPadding: 16,
  items: [{
    xtype: 'container',
    margin: '0 -16 0 -16', // negative margins to create bleed effect
    style: {
      background: 'var(--p-color-text-info)',
      padding: 'var(--p-space-200)'
    },
    html: '<div style="color: var(--p-color-bg-surface);">marginInline</div>'
  }]
});`,
    vanilla: `// HTML
<div class="card" style="width: 320px;">
  <div class="bleed bleed--inline">
    <div class="placeholder">
      <span>marginInline</span>
    </div>
  </div>
</div>

// CSS
.card {
  background: white;
  border-radius: var(--p-border-radius-300);
  padding: var(--p-space-400);
  box-shadow: var(--p-shadow-300);
}

.bleed--inline {
  margin-left: calc(var(--p-space-400) * -1);
  margin-right: calc(var(--p-space-400) * -1);
}

.placeholder {
  background: var(--p-color-text-info);
  padding: var(--p-space-200);
  color: var(--p-color-bg-surface);
}`,
    typescript: `import {Bleed, Box, Card, Text} from '@shopify/polaris';
import React from 'react';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto'
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)',
        height,
        width,
      }}
    >
      <div style={{ color: 'var(--p-color-bg-surface)' }}>
        <Text size="bodyMd" as="p" fontWeight="regular">
          {label}
        </Text>
      </div>
    </div>
  );
};

function BleedExample(): JSX.Element {
  return (
    <Box width="320px">
      <Card>
        <Bleed marginInline="400">
          <Placeholder label="marginInline" />
        </Bleed>
      </Card>
    </Box>
  );
}`
  },
  'specific-direction': {
    react: `import {BlockStack, Bleed, Box, Card} from '@shopify/polaris';
import React from 'react';

function SpecificDirectionBleedExample() {
  return (
    <BlockStack gap="400">
      <Box width="320px">
        <Card>
          <Bleed marginInlineStart="800">
            <Placeholder label="marginInlineStart" />
          </Bleed>
        </Card>
      </Box>
      <Box width="320px">
        <Card>
          <Bleed marginInlineEnd="800">
            <Placeholder label="marginInlineEnd" />
          </Bleed>
        </Card>
      </Box>
      <Box width="320px">
        <Card>
          <Bleed marginBlockStart="800">
            <Placeholder label="marginBlockStart" />
          </Bleed>
        </Card>
      </Box>
      <Box width="320px">
        <Card>
          <Bleed marginBlockEnd="800">
            <Placeholder label="marginBlockEnd" />
          </Bleed>
        </Card>
      </Box>
    </BlockStack>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: 'var(--p-color-bg-surface)',
        }}
      >
        <Text size="bodyMd" as="p" fontWeight="regular">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    width: 320,
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'panel',
    bodyPadding: 16,
    items: [{
      xtype: 'container',
      margin: '0 0 0 -32', // bleed left/start
      style: {
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)'
      },
      html: '<div style="color: var(--p-color-bg-surface);">marginInlineStart</div>'
    }]
  }, {
    xtype: 'panel',
    bodyPadding: 16,
    items: [{
      xtype: 'container',
      margin: '0 -32 0 0', // bleed right/end
      style: {
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)'
      },
      html: '<div style="color: var(--p-color-bg-surface);">marginInlineEnd</div>'
    }]
  }, {
    xtype: 'panel',
    bodyPadding: 16,
    items: [{
      xtype: 'container',
      margin: '-32 0 0 0', // bleed top
      style: {
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)'
      },
      html: '<div style="color: var(--p-color-bg-surface);">marginBlockStart</div>'
    }]
  }, {
    xtype: 'panel',
    bodyPadding: 16,
    items: [{
      xtype: 'container',
      margin: '0 0 -32 0', // bleed bottom
      style: {
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)'
      },
      html: '<div style="color: var(--p-color-bg-surface);">marginBlockEnd</div>'
    }]
  }]
});`,
    vanilla: `// HTML
<div class="stack">
  <div class="card" style="width: 320px;">
    <div class="bleed bleed--inline-start">
      <div class="placeholder">
        <span>marginInlineStart</span>
      </div>
    </div>
  </div>
  
  <div class="card" style="width: 320px;">
    <div class="bleed bleed--inline-end">
      <div class="placeholder">
        <span>marginInlineEnd</span>
      </div>
    </div>
  </div>
  
  <div class="card" style="width: 320px;">
    <div class="bleed bleed--block-start">
      <div class="placeholder">
        <span>marginBlockStart</span>
      </div>
    </div>
  </div>
  
  <div class="card" style="width: 320px;">
    <div class="bleed bleed--block-end">
      <div class="placeholder">
        <span>marginBlockEnd</span>
      </div>
    </div>
  </div>
</div>

// CSS
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--p-space-400);
}

.card {
  background: white;
  border-radius: var(--p-border-radius-300);
  padding: var(--p-space-400);
  box-shadow: var(--p-shadow-300);
}

.bleed--inline-start {
  margin-left: calc(var(--p-space-800) * -1);
}

.bleed--inline-end {
  margin-right: calc(var(--p-space-800) * -1);
}

.bleed--block-start {
  margin-top: calc(var(--p-space-800) * -1);
}

.bleed--block-end {
  margin-bottom: calc(var(--p-space-800) * -1);
}

.placeholder {
  background: var(--p-color-text-info);
  padding: var(--p-space-200);
  color: var(--p-color-bg-surface);
}`,
    typescript: `import {BlockStack, Bleed, Box, Card, Text} from '@shopify/polaris';
import React from 'react';

type BleedDirection = 'marginInlineStart' | 'marginInlineEnd' | 'marginBlockStart' | 'marginBlockEnd';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto'
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-200)',
        height,
        width,
      }}
    >
      <div style={{ color: 'var(--p-color-bg-surface)' }}>
        <Text size="bodyMd" as="p" fontWeight="regular">
          {label}
        </Text>
      </div>
    </div>
  );
};

function SpecificDirectionBleedExample(): JSX.Element {
  const directions: BleedDirection[] = [
    'marginInlineStart',
    'marginInlineEnd', 
    'marginBlockStart',
    'marginBlockEnd'
  ];

  return (
    <BlockStack gap="400">
      {directions.map((direction) => (
        <Box width="320px" key={direction}>
          <Card>
            <Bleed {...{[direction]: "800"}}>
              <Placeholder label={direction} />
            </Bleed>
          </Card>
        </Box>
      ))}
    </BlockStack>
  );
}`
  },
  vertical: {
    react: `import {Bleed, Box, Card} from '@shopify/polaris';
import React from 'react';

function VerticalBleedExample() {
  return (
    <Box width="320px">
      <Card>
        <Bleed marginBlock="800">
          <Placeholder label="marginBlock" />
        </Bleed>
      </Card>
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: 'var(--p-space-1000) var(--p-space-200)',
        height: height,
        width: width,
      }}
    >
      <div
        style={{
          color: 'var(--p-color-bg-surface)',
        }}
      >
        <Text size="bodyMd" as="p" fontWeight="regular">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  width: 320,
  bodyPadding: 16,
  items: [{
    xtype: 'container',
    margin: '-32 0 -32 0', // negative vertical margins
    style: {
      background: 'var(--p-color-text-info)',
      padding: 'var(--p-space-1000) var(--p-space-200)'
    },
    html: '<div style="color: var(--p-color-bg-surface);">marginBlock</div>'
  }]
});`,
    vanilla: `// HTML
<div class="card" style="width: 320px;">
  <div class="bleed bleed--block">
    <div class="placeholder placeholder--vertical">
      <span>marginBlock</span>
    </div>
  </div>
</div>

// CSS
.card {
  background: white;
  border-radius: var(--p-border-radius-300);
  padding: var(--p-space-400);
  box-shadow: var(--p-shadow-300);
}

.bleed--block {
  margin-top: calc(var(--p-space-800) * -1);
  margin-bottom: calc(var(--p-space-800) * -1);
}

.placeholder {
  background: var(--p-color-text-info);
  padding: var(--p-space-200);
  color: var(--p-color-bg-surface);
}

.placeholder--vertical {
  padding: var(--p-space-1000) var(--p-space-200);
}`,
    typescript: `import {Bleed, Box, Card, Text} from '@shopify/polaris';
import React from 'react';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
  verticalPadding?: boolean;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto',
  verticalPadding = false
}) => {
  const padding = verticalPadding 
    ? 'var(--p-space-1000) var(--p-space-200)'
    : 'var(--p-space-200)';

  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding,
        height,
        width,
      }}
    >
      <div style={{ color: 'var(--p-color-bg-surface)' }}>
        <Text size="bodyMd" as="p" fontWeight="regular">
          {label}
        </Text>
      </div>
    </div>
  );
};

function VerticalBleedExample(): JSX.Element {
  return (
    <Box width="320px">
      <Card>
        <Bleed marginBlock="800">
          <Placeholder label="marginBlock" verticalPadding />
        </Bleed>
      </Card>
    </Box>
  );
}`
  }
};

// Box Examples
export const boxExamples = {
  'with-color': {
    react: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

function BoxWithColorExample() {
  return (
    <Box background="bg-fill-info">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height: height,
        width: width,
        borderRadius: 'inherit',
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text)',
        }}
      >
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-box-info',
  bodyStyle: {
    background: 'var(--p-color-bg-fill-info)',
    padding: 'var(--p-space-400)'
  },
  html: '<div class="placeholder">Content inside a box</div>',
  listeners: {
    afterrender: function(panel) {
      panel.getEl().down('.placeholder').setStyle({
        background: 'var(--p-color-border-interactive-subdued)',
        color: 'var(--p-color-text)',
        padding: 'var(--p-space-200)',
        borderRadius: 'inherit'
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-box polaris-box--bg-info">
  <div class="polaris-placeholder">
    Content inside a box
  </div>
</div>`,
    typescript: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto'
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height,
        width,
        borderRadius: 'inherit',
      }}
    >
      <div style={{ color: 'var(--p-color-text)' }}>
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

function BoxWithColorExample(): JSX.Element {
  return (
    <Box background="bg-fill-info">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}`
  },
  'with-border-radius': {
    react: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

function BoxWithBorderRadiusExample() {
  return (
    <Box borderRadius="100">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height: height,
        width: width,
        borderRadius: 'inherit',
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text)',
        }}
      >
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-box-rounded',
  bodyStyle: {
    borderRadius: 'var(--p-border-radius-100)',
    overflow: 'hidden'
  },
  html: '<div class="placeholder">Content inside a box</div>',
  listeners: {
    afterrender: function(panel) {
      panel.getEl().setStyle('border-radius', 'var(--p-border-radius-100)');
      panel.getEl().down('.placeholder').setStyle({
        background: 'var(--p-color-border-interactive-subdued)',
        color: 'var(--p-color-text)',
        padding: 'var(--p-space-200)',
        borderRadius: 'inherit'
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-box polaris-box--border-radius-100">
  <div class="polaris-placeholder">
    Content inside a box
  </div>
</div>`,
    typescript: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto'
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height,
        width,
        borderRadius: 'inherit',
      }}
    >
      <div style={{ color: 'var(--p-color-text)' }}>
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

function BoxWithBorderRadiusExample(): JSX.Element {
  return (
    <Box borderRadius="100">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}`
  },
  'with-border': {
    react: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

function BoxWithBorderExample() {
  return (
    <Box borderColor="border" borderWidth="025">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height: height,
        width: width,
        borderRadius: 'inherit',
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text)',
        }}
      >
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-box-bordered',
  bodyStyle: {
    border: 'var(--p-border-width-025) solid var(--p-color-border)',
    padding: 'var(--p-space-400)'
  },
  html: '<div class="placeholder">Content inside a box</div>',
  listeners: {
    afterrender: function(panel) {
      panel.getEl().down('.placeholder').setStyle({
        background: 'var(--p-color-border-interactive-subdued)',
        color: 'var(--p-color-text)',
        padding: 'var(--p-space-200)',
        borderRadius: 'inherit'
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-box polaris-box--border">
  <div class="polaris-placeholder">
    Content inside a box
  </div>
</div>`,
    typescript: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto'
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-border-interactive-subdued)',
        height,
        width,
        borderRadius: 'inherit',
      }}
    >
      <div style={{ color: 'var(--p-color-text)' }}>
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

function BoxWithBorderExample(): JSX.Element {
  return (
    <Box borderColor="border" borderWidth="025">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}`
  },
  'with-shadow': {
    react: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

function BoxWithShadowExample() {
  return (
    <Box shadow="300">
      <Placeholder label="Content inside a box" />
    </Box>
  );
}

const Placeholder = ({label = '', height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        borderRadius: 'inherit',
      }}
    >
      <div
        style={{
          color: 'var(--p-color-text-info-on-bg-fill)',
        }}
      >
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'polaris-box-shadow',
  shadow: true,
  bodyStyle: {
    boxShadow: 'var(--p-shadow-300)',
    padding: 'var(--p-space-400)'
  },
  html: '<div class="placeholder">Content inside a box</div>',
  listeners: {
    afterrender: function(panel) {
      panel.getEl().down('.placeholder').setStyle({
        background: 'var(--p-color-text-info)',
        color: 'var(--p-color-text-info-on-bg-fill)',
        padding: 'var(--p-space-200)',
        borderRadius: 'inherit'
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-box polaris-box--shadow-300">
  <div class="polaris-placeholder polaris-placeholder--info">
    Content inside a box
  </div>
</div>`,
    typescript: `import React from 'react';
import {Box, Text} from '@shopify/polaris';

interface PlaceholderProps {
  label?: string;
  height?: string | number;
  width?: string | number;
  variant?: 'default' | 'info';
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '', 
  height = 'auto', 
  width = 'auto',
  variant = 'default'
}) => {
  const backgroundColor = variant === 'info' 
    ? 'var(--p-color-text-info)'
    : 'var(--p-color-border-interactive-subdued)';
  
  const textColor = variant === 'info'
    ? 'var(--p-color-text-info-on-bg-fill)'
    : 'var(--p-color-text)';

  return (
    <div
      style={{
        background: backgroundColor,
        height,
        width,
        borderRadius: 'inherit',
      }}
    >
      <div style={{ color: textColor }}>
        <Text as="p" variant="bodyMd">
          {label}
        </Text>
      </div>
    </div>
  );
};

function BoxWithShadowExample(): JSX.Element {
  return (
    <Box shadow="300">
      <Placeholder label="Content inside a box" variant="info" />
    </Box>
  );
}`
  },
  'with-padding': {
    react: `import React from 'react';
import {BlockStack, Box, Text, InlineStack} from '@shopify/polaris';

function BoxWithPaddingExample() {
  return (
    <BlockStack gap="400">
      <div style={{ width: '586px' }}>
        <Box padding="400" width="586px" background="bg-fill-info">
          <Placeholder label="padding" childAlign="center" />
        </Box>
      </div>
      <InlineStack gap="400">
        <Box paddingInline="400" width="586px" background="bg-fill-info">
          <Placeholder label="paddingInline" childAlign="center" />
        </Box>
        <Box paddingInlineStart="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingInlineStart" childAlign="start" />
        </Box>
        <Box paddingInlineEnd="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingInlineEnd" childAlign="end" />
        </Box>
      </InlineStack>
      <InlineStack gap="400">
        <Box paddingBlock="400" width="586px" background="bg-fill-info">
          <Placeholder label="paddingBlock" childAlign="center" />
        </Box>
        <Box paddingBlockStart="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingBlockStart" childAlign="center" />
        </Box>
        <Box paddingBlockEnd="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingBlockEnd" childAlign="center" />
        </Box>
      </InlineStack>
    </BlockStack>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
  childAlign,
}: {
  label?: string;
  height?: string;
  width?: string;
  childAlign: 'start' | 'center' | 'end';
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    >
      <InlineStack gap="400" align={childAlign}>
        <div
          style={{
            color: 'var(--p-color-text-info-on-bg-fill)',
          }}
        >
          <Text
            as="h2"
            variant="bodyMd"
            fontWeight="medium"
            tone="text-inverse"
          >
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'panel',
    width: 586,
    bodyStyle: {
      background: 'var(--p-color-bg-fill-info)',
      padding: 'var(--p-space-400)'
    },
    html: '<div class="placeholder center">padding</div>'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: { margin: '0 8 0 0' },
    items: [{
      xtype: 'panel',
      width: 586,
      bodyStyle: {
        background: 'var(--p-color-bg-fill-info)',
        paddingLeft: 'var(--p-space-400)',
        paddingRight: 'var(--p-space-400)'
      },
      html: '<div class="placeholder center">paddingInline</div>'
    }, {
      xtype: 'panel',
      width: 284,
      bodyStyle: {
        background: 'var(--p-color-bg-fill-info)',
        paddingLeft: 'var(--p-space-400)'
      },
      html: '<div class="placeholder start">paddingInlineStart</div>'
    }, {
      xtype: 'panel',
      width: 284,
      bodyStyle: {
        background: 'var(--p-color-bg-fill-info)',
        paddingRight: 'var(--p-space-400)'
      },
      html: '<div class="placeholder end">paddingInlineEnd</div>'
    }]
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: { margin: '0 8 0 0' },
    items: [{
      xtype: 'panel',
      width: 586,
      bodyStyle: {
        background: 'var(--p-color-bg-fill-info)',
        paddingTop: 'var(--p-space-400)',
        paddingBottom: 'var(--p-space-400)'
      },
      html: '<div class="placeholder center">paddingBlock</div>'
    }, {
      xtype: 'panel',
      width: 284,
      bodyStyle: {
        background: 'var(--p-color-bg-fill-info)',
        paddingTop: 'var(--p-space-400)'
      },
      html: '<div class="placeholder center">paddingBlockStart</div>'
    }, {
      xtype: 'panel',
      width: 284,
      bodyStyle: {
        background: 'var(--p-color-bg-fill-info)',
        paddingBottom: 'var(--p-space-400)'
      },
      html: '<div class="placeholder center">paddingBlockEnd</div>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack polaris-stack--vertical">
  <div class="polaris-box polaris-box--bg-info polaris-box--padding-400" style="width: 586px;">
    <div class="polaris-placeholder polaris-placeholder--center">padding</div>
  </div>
  
  <div class="polaris-stack polaris-stack--horizontal">
    <div class="polaris-box polaris-box--bg-info polaris-box--padding-inline-400" style="width: 586px;">
      <div class="polaris-placeholder polaris-placeholder--center">paddingInline</div>
    </div>
    <div class="polaris-box polaris-box--bg-info polaris-box--padding-inline-start-400" style="width: 284px;">
      <div class="polaris-placeholder polaris-placeholder--start">paddingInlineStart</div>
    </div>
    <div class="polaris-box polaris-box--bg-info polaris-box--padding-inline-end-400" style="width: 284px;">
      <div class="polaris-placeholder polaris-placeholder--end">paddingInlineEnd</div>
    </div>
  </div>
  
  <div class="polaris-stack polaris-stack--horizontal">
    <div class="polaris-box polaris-box--bg-info polaris-box--padding-block-400" style="width: 586px;">
      <div class="polaris-placeholder polaris-placeholder--center">paddingBlock</div>
    </div>
    <div class="polaris-box polaris-box--bg-info polaris-box--padding-block-start-400" style="width: 284px;">
      <div class="polaris-placeholder polaris-placeholder--center">paddingBlockStart</div>
    </div>
    <div class="polaris-box polaris-box--bg-info polaris-box--padding-block-end-400" style="width: 284px;">
      <div class="polaris-placeholder polaris-placeholder--center">paddingBlockEnd</div>
    </div>
  </div>
</div>`,
    typescript: `import React from 'react';
import {BlockStack, Box, Text, InlineStack} from '@shopify/polaris';

type PaddingVariant = 'padding' | 'paddingInline' | 'paddingInlineStart' | 'paddingInlineEnd' | 'paddingBlock' | 'paddingBlockStart' | 'paddingBlockEnd';

interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
  childAlign: 'start' | 'center' | 'end';
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '',
  height = 'auto',
  width = 'auto',
  childAlign,
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height,
        width,
      }}
    >
      <InlineStack gap="400" align={childAlign}>
        <div style={{ color: 'var(--p-color-text-info-on-bg-fill)' }}>
          <Text
            as="h2"
            variant="bodyMd"
            fontWeight="medium"
            tone="text-inverse"
          >
            {label}
          </Text>
        </div>
      </InlineStack>
    </div>
  );
};

function BoxWithPaddingExample(): JSX.Element {
  const paddingExamples: Array<{
    variant: PaddingVariant;
    width: string;
    align: 'start' | 'center' | 'end';
  }> = [
    { variant: 'padding', width: '586px', align: 'center' },
    { variant: 'paddingInline', width: '586px', align: 'center' },
    { variant: 'paddingInlineStart', width: '284px', align: 'start' },
    { variant: 'paddingInlineEnd', width: '284px', align: 'end' },
    { variant: 'paddingBlock', width: '586px', align: 'center' },
    { variant: 'paddingBlockStart', width: '284px', align: 'center' },
    { variant: 'paddingBlockEnd', width: '284px', align: 'center' },
  ];

  return (
    <BlockStack gap="400">
      <div style={{ width: '586px' }}>
        <Box padding="400" width="586px" background="bg-fill-info">
          <Placeholder label="padding" childAlign="center" />
        </Box>
      </div>
      <InlineStack gap="400">
        <Box paddingInline="400" width="586px" background="bg-fill-info">
          <Placeholder label="paddingInline" childAlign="center" />
        </Box>
        <Box paddingInlineStart="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingInlineStart" childAlign="start" />
        </Box>
        <Box paddingInlineEnd="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingInlineEnd" childAlign="end" />
        </Box>
      </InlineStack>
      <InlineStack gap="400">
        <Box paddingBlock="400" width="586px" background="bg-fill-info">
          <Placeholder label="paddingBlock" childAlign="center" />
        </Box>
        <Box paddingBlockStart="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingBlockStart" childAlign="center" />
        </Box>
        <Box paddingBlockEnd="400" width="284px" background="bg-fill-info">
          <Placeholder label="paddingBlockEnd" childAlign="center" />
        </Box>
      </InlineStack>
    </BlockStack>
  );
}`
  }
};

// Divider Examples
export const dividerExamples = {
  'with-border-color': {
    react: `import React from 'react';
import {Card, Divider, Text, BlockStack} from '@shopify/polaris';

function DividerWithBorderColorExample() {
  return (
    <Card>
      <BlockStack gap="500">
        <Text as="h1" variant="headingSm">
          Default
        </Text>
        <Divider />
        <Text as="h1" variant="headingSm">
          Border
        </Text>
        <Divider borderColor="border" />
        <Text as="h1" variant="headingSm">
          Border inverse
        </Text>
        <Divider borderColor="border-inverse" />
        <Text as="h1" variant="headingSm">
          Transparent
        </Text>
        <Divider borderColor="transparent" />
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    defaults: {
      margin: '0 0 20 0'
    },
    items: [{
      xtype: 'component',
      html: '<h3>Default</h3>',
      cls: 'polaris-heading-sm'
    }, {
      xtype: 'component',
      html: '<hr class="polaris-divider">',
      cls: 'polaris-divider-container'
    }, {
      xtype: 'component',
      html: '<h3>Border</h3>',
      cls: 'polaris-heading-sm'
    }, {
      xtype: 'component',
      html: '<hr class="polaris-divider polaris-divider--border">',
      cls: 'polaris-divider-container'
    }, {
      xtype: 'component',
      html: '<h3>Border inverse</h3>',
      cls: 'polaris-heading-sm'
    }, {
      xtype: 'component',
      html: '<hr class="polaris-divider polaris-divider--border-inverse">',
      cls: 'polaris-divider-container'
    }, {
      xtype: 'component',
      html: '<h3>Transparent</h3>',
      cls: 'polaris-heading-sm'
    }, {
      xtype: 'component',
      html: '<hr class="polaris-divider polaris-divider--transparent">',
      cls: 'polaris-divider-container'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <div class="polaris-stack polaris-stack--vertical">
      <h3 class="polaris-text polaris-text--heading-sm">Default</h3>
      <hr class="polaris-divider">
      
      <h3 class="polaris-text polaris-text--heading-sm">Border</h3>
      <hr class="polaris-divider polaris-divider--border">
      
      <h3 class="polaris-text polaris-text--heading-sm">Border inverse</h3>
      <hr class="polaris-divider polaris-divider--border-inverse">
      
      <h3 class="polaris-text polaris-text--heading-sm">Transparent</h3>
      <hr class="polaris-divider polaris-divider--transparent">
    </div>
  </div>
</div>`,
    typescript: `import React from 'react';
import {Card, Divider, Text, BlockStack} from '@shopify/polaris';

type DividerBorderColor = 'border' | 'border-inverse' | 'transparent';

interface DividerSectionProps {
  title: string;
  borderColor?: DividerBorderColor;
}

const DividerSection: React.FC<DividerSectionProps> = ({ 
  title, 
  borderColor 
}) => (
  <>
    <Text as="h1" variant="headingSm">
      {title}
    </Text>
    <Divider borderColor={borderColor} />
  </>
);

function DividerWithBorderColorExample(): JSX.Element {
  const dividerVariants: Array<{
    title: string;
    borderColor?: DividerBorderColor;
  }> = [
    { title: 'Default' },
    { title: 'Border', borderColor: 'border' },
    { title: 'Border inverse', borderColor: 'border-inverse' },
    { title: 'Transparent', borderColor: 'transparent' },
  ];

  return (
    <Card>
      <BlockStack gap="500">
        {dividerVariants.map((variant, index) => (
          <DividerSection
            key={index}
            title={variant.title}
            borderColor={variant.borderColor}
          />
        ))}
      </BlockStack>
    </Card>
  );
}`
  }
};

// Grid Examples
export const gridExamples = {
  'two-column': {
    react: `import React from 'react';
import {LegacyCard, Grid} from '@shopify/polaris';

function GridTwoColumnExample() {
  return (
    <Grid>
      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
        <LegacyCard title="Sales" sectioned>
          <p>View a summary of your online store's performance.</p>
        </LegacyCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
        <LegacyCard title="Orders" sectioned>
          <p>View a summary of your online store's orders.</p>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'column'
  },
  defaults: {
    margin: '0 10 10 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Sales',
    columnWidth: 0.5,
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s performance.</p>',
    cls: 'polaris-card'
  }, {
    xtype: 'panel',
    title: 'Orders',
    columnWidth: 0.5,
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s orders.</p>',
    cls: 'polaris-card'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-grid">
  <div class="polaris-grid__cell polaris-grid__cell--6-12 polaris-grid__cell--md-6-12">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h3 class="polaris-card__title">Sales</h3>
      </div>
      <div class="polaris-card__section">
        <p>View a summary of your online store's performance.</p>
      </div>
    </div>
  </div>
  <div class="polaris-grid__cell polaris-grid__cell--6-12 polaris-grid__cell--md-6-12">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h3 class="polaris-card__title">Orders</h3>
      </div>
      <div class="polaris-card__section">
        <p>View a summary of your online store's orders.</p>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import React from 'react';
import {LegacyCard, Grid} from '@shopify/polaris';

interface GridCellData {
  title: string;
  description: string;
  columnSpan: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

function GridTwoColumnExample(): JSX.Element {
  const gridData: GridCellData[] = [
    {
      title: 'Sales',
      description: 'View a summary of your online store\\'s performance.',
      columnSpan: {xs: 6, sm: 3, md: 3, lg: 6, xl: 6}
    },
    {
      title: 'Orders',
      description: 'View a summary of your online store\\'s orders.',
      columnSpan: {xs: 6, sm: 3, md: 3, lg: 6, xl: 6}
    }
  ];

  return (
    <Grid>
      {gridData.map((cell, index) => (
        <Grid.Cell key={index} columnSpan={cell.columnSpan}>
          <LegacyCard title={cell.title} sectioned>
            <p>{cell.description}</p>
          </LegacyCard>
        </Grid.Cell>
      ))}
    </Grid>
  );
}`
  },
  'three-one-third-column': {
    react: `import React from 'react';
import {LegacyCard, Grid} from '@shopify/polaris';

function GridThreeOneThirdColumnExample() {
  return (
    <Grid columns={{sm: 3}}>
      <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
        <LegacyCard title="Sales" sectioned>
          <p>View a summary of your online store's performance.</p>
        </LegacyCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
        <LegacyCard title="Orders" sectioned>
          <p>View a summary of your online store's orders.</p>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'column'
  },
  defaults: {
    margin: '0 10 10 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Sales',
    columnWidth: 0.667, // 2/3
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s performance.</p>',
    cls: 'polaris-card'
  }, {
    xtype: 'panel',
    title: 'Orders',
    columnWidth: 0.333, // 1/3
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s orders.</p>',
    cls: 'polaris-card'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-grid polaris-grid--columns-3">
  <div class="polaris-grid__cell polaris-grid__cell--8-12 polaris-grid__cell--sm-4-6">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h3 class="polaris-card__title">Sales</h3>
      </div>
      <div class="polaris-card__section">
        <p>View a summary of your online store's performance.</p>
      </div>
    </div>
  </div>
  <div class="polaris-grid__cell polaris-grid__cell--4-12 polaris-grid__cell--sm-2-6">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h3 class="polaris-card__title">Orders</h3>
      </div>
      <div class="polaris-card__section">
        <p>View a summary of your online store's orders.</p>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import React from 'react';
import {LegacyCard, Grid} from '@shopify/polaris';

interface GridCellConfig {
  title: string;
  description: string;
  columnSpan: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}

function GridThreeOneThirdColumnExample(): JSX.Element {
  const gridConfig: GridCellConfig[] = [
    {
      title: 'Sales',
      description: 'View a summary of your online store\\'s performance.',
      columnSpan: {xs: 6, sm: 4, md: 4, lg: 8, xl: 8}
    },
    {
      title: 'Orders', 
      description: 'View a summary of your online store\\'s orders.',
      columnSpan: {xs: 6, sm: 2, md: 2, lg: 4, xl: 4}
    }
  ];

  return (
    <Grid columns={{sm: 3}}>
      {gridConfig.map((cell, index) => (
        <Grid.Cell key={index} columnSpan={cell.columnSpan}>
          <LegacyCard title={cell.title} sectioned>
            <p>{cell.description}</p>
          </LegacyCard>
        </Grid.Cell>
      ))}
    </Grid>
  );
}`
  },
  'two-thirds-and-one-third-column': {
    react: `import React from 'react';
import {LegacyCard, Grid} from '@shopify/polaris';

function GridTwoThirdsAndOneThirdColumnExample() {
  return (
    <Grid columns={{sm: 3}}>
      <Grid.Cell columnSpan={{xs: 6, sm: 4, md: 4, lg: 8, xl: 8}}>
        <LegacyCard title="Sales" sectioned>
          <p>View a summary of your online store's performance.</p>
        </LegacyCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 2, md: 2, lg: 4, xl: 4}}>
        <LegacyCard title="Orders" sectioned>
          <p>View a summary of your online store's orders.</p>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'column'
  },
  defaults: {
    margin: '0 10 10 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Sales',
    columnWidth: 0.667, // 2/3
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s performance.</p>',
    cls: 'polaris-card'
  }, {
    xtype: 'panel',
    title: 'Orders',
    columnWidth: 0.333, // 1/3
    bodyPadding: 16,
    html: '<p>View a summary of your online store\\'s orders.</p>',
    cls: 'polaris-card'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-grid polaris-grid--columns-3">
  <div class="polaris-grid__cell polaris-grid__cell--8-12 polaris-grid__cell--sm-4-6">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h3 class="polaris-card__title">Sales</h3>
      </div>
      <div class="polaris-card__section">
        <p>View a summary of your online store's performance.</p>
      </div>
    </div>
  </div>
  <div class="polaris-grid__cell polaris-grid__cell--4-12 polaris-grid__cell--sm-2-6">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h3 class="polaris-card__title">Orders</h3>
      </div>
      <div class="polaris-card__section">
        <p>View a summary of your online store's orders.</p>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import React from 'react';
import {LegacyCard, Grid} from '@shopify/polaris';

interface GridLayoutConfig {
  mainColumn: {
    title: string;
    description: string;
    columnSpan: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
  sidebarColumn: {
    title: string;
    description: string;
    columnSpan: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
}

function GridTwoThirdsAndOneThirdColumnExample(): JSX.Element {
  const layoutConfig: GridLayoutConfig = {
    mainColumn: {
      title: 'Sales',
      description: 'View a summary of your online store\\'s performance.',
      columnSpan: {xs: 6, sm: 4, md: 4, lg: 8, xl: 8}
    },
    sidebarColumn: {
      title: 'Orders',
      description: 'View a summary of your online store\\'s orders.',
      columnSpan: {xs: 6, sm: 2, md: 2, lg: 4, xl: 4}
    }
  };

  return (
    <Grid columns={{sm: 3}}>
      <Grid.Cell columnSpan={layoutConfig.mainColumn.columnSpan}>
        <LegacyCard title={layoutConfig.mainColumn.title} sectioned>
          <p>{layoutConfig.mainColumn.description}</p>
        </LegacyCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={layoutConfig.sidebarColumn.columnSpan}>
        <LegacyCard title={layoutConfig.sidebarColumn.title} sectioned>
          <p>{layoutConfig.sidebarColumn.description}</p>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
  );
}`
  }
};

// Spinner Examples
export const spinnerExamples = {
  default: {
    react: `import React from 'react';
import {Spinner} from '@shopify/polaris';

function SpinnerExample() {
  return <Spinner accessibilityLabel="Spinner example" size="large" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="polaris-spinner polaris-spinner--large" role="status" aria-label="Spinner example">' +
          '<svg viewBox="0 0 20 20" class="polaris-spinner__svg">' +
            '<path d="M10 3V1a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14z" fill="currentColor"/>' +
          '</svg>' +
        '</div>',
  cls: 'polaris-spinner-container',
  listeners: {
    afterrender: function(cmp) {
      // Add rotation animation to the spinner
      const spinner = cmp.getEl().down('.polaris-spinner');
      if (spinner) {
        spinner.addCls('polaris-spinner--animated');
      }
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-spinner polaris-spinner--large" role="status" aria-label="Spinner example">
  <svg viewBox="0 0 20 20" class="polaris-spinner__svg">
    <path d="M10 3V1a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14z" fill="currentColor"/>
  </svg>
</div>`,
    typescript: `import React from 'react';
import {Spinner} from '@shopify/polaris';

interface SpinnerExampleProps {
  accessibilityLabel?: string;
  size?: 'small' | 'large';
}

function SpinnerExample({ 
  accessibilityLabel = "Spinner example",
  size = "large"
}: SpinnerExampleProps): JSX.Element {
  return (
    <Spinner 
      accessibilityLabel={accessibilityLabel} 
      size={size} 
    />
  );
}`
  },
  small: {
    react: `import React from 'react';
import {Spinner} from '@shopify/polaris';

function SpinnerSmallExample() {
  return <Spinner accessibilityLabel="Small spinner example" size="small" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="polaris-spinner polaris-spinner--small" role="status" aria-label="Small spinner example">' +
          '<svg viewBox="0 0 20 20" class="polaris-spinner__svg">' +
            '<path d="M10 3V1a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14z" fill="currentColor"/>' +
          '</svg>' +
        '</div>',
  cls: 'polaris-spinner-container',
  listeners: {
    afterrender: function(cmp) {
      const spinner = cmp.getEl().down('.polaris-spinner');
      if (spinner) {
        spinner.addCls('polaris-spinner--animated');
      }
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-spinner polaris-spinner--small" role="status" aria-label="Small spinner example">
  <svg viewBox="0 0 20 20" class="polaris-spinner__svg">
    <path d="M10 3V1a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14z" fill="currentColor"/>
  </svg>
</div>`,
    typescript: `import React from 'react';
import {Spinner} from '@shopify/polaris';

interface SpinnerSmallExampleProps {
  accessibilityLabel?: string;
}

function SpinnerSmallExample({ 
  accessibilityLabel = "Small spinner example"
}: SpinnerSmallExampleProps): JSX.Element {
  return (
    <Spinner 
      accessibilityLabel={accessibilityLabel} 
      size="small" 
    />
  );
}`
  },
  'with-focus-management': {
    react: `import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  LegacyCard,
  Form,
  FormLayout,
  Spinner,
  LegacyTabs,
  TextField,
} from '@shopify/polaris';

function SpinnerWithFocusManagementExample() {
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [textFieldFocused, setTextFieldFocused] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState('');
  const textFieldRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    if (selected === selectedTabIndex) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSelected(selectedTabIndex);
    }, 1500);
  }, [selected]);

  const tabs = [
    {id: 'all-customers', content: 'All'},
    {id: 'accepts-marketing', content: 'Accepts marketing'},
  ];

  const handleTextFieldFocus = useCallback(() => {
    setTextFieldFocused(true);
  }, []);

  const handleTextFieldBlur = useCallback(() => {
    setTextFieldFocused(false);
  }, []);

  const handleTextFieldChange = useCallback((value: string) => {
    setTextFieldValue(value);
  }, []);

  const spinnerMarkup = loading ? (
    <Spinner accessibilityLabel="Loading form field" hasFocusableParent={false} />
  ) : null;

  const tabMarkup = loading ? null : (
    <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <Form onSubmit={() => {}}>
          <FormLayout>
            <div ref={textFieldRef}>
              <TextField
                label="Customers"
                focused={textFieldFocused}
                onFocus={handleTextFieldFocus}
                onBlur={handleTextFieldBlur}
                value={textFieldValue}
                onChange={handleTextFieldChange}
                autoComplete="off"
              />
            </div>
            <Button variant="primary" submit>
              Submit
            </Button>
          </FormLayout>
        </Form>
      </LegacyCard.Section>
    </LegacyTabs>
  );

  return (
    <LegacyCard>
      {spinnerMarkup}
      {tabMarkup}
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 16,
  layout: 'card',
  items: [{
    // Loading state
    itemId: 'loading',
    html: '<div class="polaris-spinner" role="status" aria-label="Loading form field">' +
            '<svg viewBox="0 0 20 20" class="polaris-spinner__svg">' +
              '<path d="M10 3V1a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14z" fill="currentColor"/>' +
            '</svg>' +
          '</div>',
    cls: 'polaris-spinner-container',
    hidden: true
  }, {
    // Form state
    itemId: 'form',
    xtype: 'tabpanel',
    items: [{
      title: 'All',
      items: [{
        xtype: 'form',
        bodyPadding: 16,
        items: [{
          xtype: 'textfield',
          fieldLabel: 'Customers',
          name: 'customers',
          allowBlank: true
        }, {
          xtype: 'button',
          text: 'Submit',
          formBind: true,
          handler: function() {
            console.log('Form submitted');
          }
        }]
      }]
    }, {
      title: 'Accepts marketing',
      html: '<p>Marketing customers content</p>'
    }],
    listeners: {
      tabchange: function(tabPanel, newCard, oldCard) {
        if (newCard !== oldCard) {
          this.up('panel').showLoading();
        }
      }
    }
  }],
  
  showLoading: function() {
    this.getLayout().setActiveItem('loading');
    this.down('#loading').show();
    this.down('#form').hide();
    
    Ext.defer(function() {
      this.hideLoading();
    }, 1500, this);
  },
  
  hideLoading: function() {
    this.down('#loading').hide();
    this.down('#form').show();
    this.getLayout().setActiveItem('form');
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div id="spinner-container" class="polaris-spinner-container" style="display: none;">
    <div class="polaris-spinner" role="status" aria-label="Loading form field">
      <svg viewBox="0 0 20 20" class="polaris-spinner__svg">
        <path d="M10 3V1a9 9 0 0 1 0 18v-2a7 7 0 0 0 0-14z" fill="currentColor"/>
      </svg>
    </div>
  </div>
  
  <div id="content-container" class="polaris-tabs-container">
    <div class="polaris-tabs">
      <button class="polaris-tab polaris-tab--active" data-tab="0">All</button>
      <button class="polaris-tab" data-tab="1">Accepts marketing</button>
    </div>
    
    <div class="polaris-tab-content polaris-tab-content--active" data-content="0">
      <div class="polaris-card__section">
        <h3 class="polaris-card__title">All</h3>
        <form class="polaris-form">
          <div class="polaris-form-layout">
            <div class="polaris-text-field">
              <label class="polaris-text-field__label">Customers</label>
              <input type="text" class="polaris-text-field__input" />
            </div>
            <button type="submit" class="polaris-button polaris-button--primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="polaris-tab-content" data-content="1">
      <div class="polaris-card__section">
        <h3 class="polaris-card__title">Accepts marketing</h3>
        <p>Marketing customers content</p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
let currentTab = 0;
let isLoading = false;

function showSpinner() {
  if (isLoading) return;
  isLoading = true;
  
  document.getElementById('spinner-container').style.display = 'flex';
  document.getElementById('content-container').style.display = 'none';
  
  setTimeout(() => {
    hideSpinner();
  }, 1500);
}

function hideSpinner() {
  isLoading = false;
  document.getElementById('spinner-container').style.display = 'none';
  document.getElementById('content-container').style.display = 'block';
}

// Tab switching
document.querySelectorAll('.polaris-tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    const newTab = parseInt(e.target.dataset.tab);
    if (newTab !== currentTab && !isLoading) {
      showSpinner();
      
      setTimeout(() => {
        // Update active tab
        document.querySelectorAll('.polaris-tab').forEach(t => t.classList.remove('polaris-tab--active'));
        document.querySelectorAll('.polaris-tab-content').forEach(c => c.classList.remove('polaris-tab-content--active'));
        
        e.target.classList.add('polaris-tab--active');
        document.querySelector(`[data-content="${newTab}"]`).classList.add('polaris-tab-content--active');
        
        currentTab = newTab;
      }, 1500);
    }
  });
});

// Form submission
document.querySelector('.polaris-form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
});
</script>`,
    typescript: `import React, {useCallback, useRef, useState} from 'react';
import {
  Button,
  LegacyCard,
  Form,
  FormLayout,
  Spinner,
  LegacyTabs,
  TextField,
} from '@shopify/polaris';

interface TabData {
  id: string;
  content: string;
}

interface SpinnerWithFocusManagementExampleProps {
  tabs?: TabData[];
  loadingDelay?: number;
}

function SpinnerWithFocusManagementExample({
  tabs = [
    {id: 'all-customers', content: 'All'},
    {id: 'accepts-marketing', content: 'Accepts marketing'},
  ],
  loadingDelay = 1500
}: SpinnerWithFocusManagementExampleProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [textFieldFocused, setTextFieldFocused] = useState<boolean>(false);
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const textFieldRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    if (selected === selectedTabIndex) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSelected(selectedTabIndex);
    }, loadingDelay);
  }, [selected, loadingDelay]);

  const handleTextFieldFocus = useCallback(() => {
    setTextFieldFocused(true);
  }, []);

  const handleTextFieldBlur = useCallback(() => {
    setTextFieldFocused(false);
  }, []);

  const handleTextFieldChange = useCallback((value: string) => {
    setTextFieldValue(value);
  }, []);

  const handleFormSubmit = useCallback(() => {
    console.log('Form submitted with value:', textFieldValue);
  }, [textFieldValue]);

  const spinnerMarkup = loading ? (
    <Spinner 
      accessibilityLabel="Loading form field" 
      hasFocusableParent={false} 
    />
  ) : null;

  const tabMarkup = loading ? null : (
    <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyCard.Section title={tabs[selected].content}>
        <Form onSubmit={handleFormSubmit}>
          <FormLayout>
            <div ref={textFieldRef}>
              <TextField
                label="Customers"
                focused={textFieldFocused}
                onFocus={handleTextFieldFocus}
                onBlur={handleTextFieldBlur}
                value={textFieldValue}
                onChange={handleTextFieldChange}
                autoComplete="off"
              />
            </div>
            <Button variant="primary" submit>
              Submit
            </Button>
          </FormLayout>
        </Form>
      </LegacyCard.Section>
    </LegacyTabs>
  );

  return (
    <LegacyCard>
      {spinnerMarkup}
      {tabMarkup}
    </LegacyCard>
  );
}`
  }
};

// Text Examples
export const textExamples = {
  body: {
    react: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

function TextBodyExample() {
  return (
    <LegacyStack vertical>
      <Text variant="bodyLg" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
      <Text variant="bodyMd" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
      <Text variant="bodySm" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
      <Text variant="bodyXs" as="p">
        Shopify POS is the easiest way to sell your products in person.
        Available for iPad, iPhone, and Android.
      </Text>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--body-lg">Shopify POS is the easiest way to sell your products in person. Available for iPad, iPhone, and Android.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--body-md">Shopify POS is the easiest way to sell your products in person. Available for iPad, iPhone, and Android.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--body-sm">Shopify POS is the easiest way to sell your products in person. Available for iPad, iPhone, and Android.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--body-xs">Shopify POS is the easiest way to sell your products in person. Available for iPad, iPhone, and Android.</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack polaris-stack--vertical">
  <p class="polaris-text polaris-text--body-lg">
    Shopify POS is the easiest way to sell your products in person.
    Available for iPad, iPhone, and Android.
  </p>
  <p class="polaris-text polaris-text--body-md">
    Shopify POS is the easiest way to sell your products in person.
    Available for iPad, iPhone, and Android.
  </p>
  <p class="polaris-text polaris-text--body-sm">
    Shopify POS is the easiest way to sell your products in person.
    Available for iPad, iPhone, and Android.
  </p>
  <p class="polaris-text polaris-text--body-xs">
    Shopify POS is the easiest way to sell your products in person.
    Available for iPad, iPhone, and Android.
  </p>
</div>`,
    typescript: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

type BodyVariant = 'bodyLg' | 'bodyMd' | 'bodySm' | 'bodyXs';

interface TextBodyExampleProps {
  content?: string;
}

function TextBodyExample({ 
  content = "Shopify POS is the easiest way to sell your products in person. Available for iPad, iPhone, and Android."
}: TextBodyExampleProps): JSX.Element {
  const bodyVariants: BodyVariant[] = ['bodyLg', 'bodyMd', 'bodySm', 'bodyXs'];

  return (
    <LegacyStack vertical>
      {bodyVariants.map((variant) => (
        <Text key={variant} variant={variant} as="p">
          {content}
        </Text>
      ))}
    </LegacyStack>
  );
}`
  },
  heading: {
    react: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

function TextHeadingExample() {
  return (
    <LegacyStack vertical>
      <Text variant="heading3xl" as="h2">
        Online store dashboard
      </Text>
      <Text variant="heading2xl" as="h3">
        Online store dashboard
      </Text>
      <Text variant="headingXl" as="h4">
        Online store dashboard
      </Text>
      <Text variant="headingLg" as="h4">
        Online store dashboard
      </Text>
      <Text variant="headingMd" as="h5">
        Online store dashboard
      </Text>
      <Text variant="headingSm" as="h6">
        Online store dashboard
      </Text>
      <Text variant="headingXs" as="h6">
        Online store dashboard
      </Text>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'component',
    html: '<h2 class="polaris-text polaris-text--heading-3xl">Online store dashboard</h2>'
  }, {
    xtype: 'component',
    html: '<h3 class="polaris-text polaris-text--heading-2xl">Online store dashboard</h3>'
  }, {
    xtype: 'component',
    html: '<h4 class="polaris-text polaris-text--heading-xl">Online store dashboard</h4>'
  }, {
    xtype: 'component',
    html: '<h4 class="polaris-text polaris-text--heading-lg">Online store dashboard</h4>'
  }, {
    xtype: 'component',
    html: '<h5 class="polaris-text polaris-text--heading-md">Online store dashboard</h5>'
  }, {
    xtype: 'component',
    html: '<h6 class="polaris-text polaris-text--heading-sm">Online store dashboard</h6>'
  }, {
    xtype: 'component',
    html: '<h6 class="polaris-text polaris-text--heading-xs">Online store dashboard</h6>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack polaris-stack--vertical">
  <h2 class="polaris-text polaris-text--heading-3xl">Online store dashboard</h2>
  <h3 class="polaris-text polaris-text--heading-2xl">Online store dashboard</h3>
  <h4 class="polaris-text polaris-text--heading-xl">Online store dashboard</h4>
  <h4 class="polaris-text polaris-text--heading-lg">Online store dashboard</h4>
  <h5 class="polaris-text polaris-text--heading-md">Online store dashboard</h5>
  <h6 class="polaris-text polaris-text--heading-sm">Online store dashboard</h6>
  <h6 class="polaris-text polaris-text--heading-xs">Online store dashboard</h6>
</div>`,
    typescript: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

type HeadingVariant = 'heading3xl' | 'heading2xl' | 'headingXl' | 'headingLg' | 'headingMd' | 'headingSm' | 'headingXs';
type HeadingElement = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingConfig {
  variant: HeadingVariant;
  element: HeadingElement;
}

interface TextHeadingExampleProps {
  title?: string;
}

function TextHeadingExample({ 
  title = "Online store dashboard"
}: TextHeadingExampleProps): JSX.Element {
  const headingConfigs: HeadingConfig[] = [
    { variant: 'heading3xl', element: 'h2' },
    { variant: 'heading2xl', element: 'h3' },
    { variant: 'headingXl', element: 'h4' },
    { variant: 'headingLg', element: 'h4' },
    { variant: 'headingMd', element: 'h5' },
    { variant: 'headingSm', element: 'h6' },
    { variant: 'headingXs', element: 'h6' },
  ];

  return (
    <LegacyStack vertical>
      {headingConfigs.map(({ variant, element }) => (
        <Text key={variant} variant={variant} as={element}>
          {title}
        </Text>
      ))}
    </LegacyStack>
  );
}`
  },
  tone: {
    react: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

function TextToneExample() {
  return (
    <LegacyStack vertical>
      <Text tone="subdued" as="p">
        Use subdued text to de-emphasize when you need to provide
        supplementary, non-critical information.
      </Text>
      <Text tone="success" as="p">
        Use success text to indicate success states, like when something
        was saved successfully.
      </Text>
      <Text tone="caution" as="p">
        Use caution text to indicate something needs attention, or that
        next steps are required.
      </Text>
      <Text tone="critical" as="p">
        Use critical text to indicate problems that have to be resolved
        immediately.
      </Text>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--subdued">Use subdued text to de-emphasize when you need to provide supplementary, non-critical information.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--success">Use success text to indicate success states, like when something was saved successfully.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--caution">Use caution text to indicate something needs attention, or that next steps are required.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--critical">Use critical text to indicate problems that have to be resolved immediately.</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack polaris-stack--vertical">
  <p class="polaris-text polaris-text--subdued">
    Use subdued text to de-emphasize when you need to provide
    supplementary, non-critical information.
  </p>
  <p class="polaris-text polaris-text--success">
    Use success text to indicate success states, like when something
    was saved successfully.
  </p>
  <p class="polaris-text polaris-text--caution">
    Use caution text to indicate something needs attention, or that
    next steps are required.
  </p>
  <p class="polaris-text polaris-text--critical">
    Use critical text to indicate problems that have to be resolved
    immediately.
  </p>
</div>`,
    typescript: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

type TextTone = 'subdued' | 'success' | 'caution' | 'critical';

interface ToneExample {
  tone: TextTone;
  content: string;
}

interface TextToneExampleProps {
  examples?: ToneExample[];
}

function TextToneExample({ 
  examples = [
    {
      tone: 'subdued',
      content: 'Use subdued text to de-emphasize when you need to provide supplementary, non-critical information.'
    },
    {
      tone: 'success',
      content: 'Use success text to indicate success states, like when something was saved successfully.'
    },
    {
      tone: 'caution',
      content: 'Use caution text to indicate something needs attention, or that next steps are required.'
    },
    {
      tone: 'critical',
      content: 'Use critical text to indicate problems that have to be resolved immediately.'
    }
  ]
}: TextToneExampleProps): JSX.Element {
  return (
    <LegacyStack vertical>
      {examples.map(({ tone, content }) => (
        <Text key={tone} tone={tone} as="p">
          {content}
        </Text>
      ))}
    </LegacyStack>
  );
}`
  },
  weight: {
    react: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

function TextWeightExample() {
  return (
    <LegacyStack vertical>
      <Text fontWeight="bold" as="p">
        Sales this year
      </Text>
      <Text fontWeight="semibold" as="p">
        Sales this year
      </Text>
      <Text fontWeight="medium" as="p">
        Sales this year
      </Text>
      <Text fontWeight="regular" as="p">
        Sales this year
      </Text>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--bold">Sales this year</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--semibold">Sales this year</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--medium">Sales this year</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--regular">Sales this year</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack polaris-stack--vertical">
  <p class="polaris-text polaris-text--bold">Sales this year</p>
  <p class="polaris-text polaris-text--semibold">Sales this year</p>
  <p class="polaris-text polaris-text--medium">Sales this year</p>
  <p class="polaris-text polaris-text--regular">Sales this year</p>
</div>`,
    typescript: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

type FontWeight = 'bold' | 'semibold' | 'medium' | 'regular';

interface TextWeightExampleProps {
  content?: string;
}

function TextWeightExample({ 
  content = "Sales this year"
}: TextWeightExampleProps): JSX.Element {
  const fontWeights: FontWeight[] = ['bold', 'semibold', 'medium', 'regular'];

  return (
    <LegacyStack vertical>
      {fontWeights.map((weight) => (
        <Text key={weight} fontWeight={weight} as="p">
          {content}
        </Text>
      ))}
    </LegacyStack>
  );
}`
  },
  align: {
    react: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

function TextAlignExample() {
  return (
    <LegacyStack vertical>
      <Text variant="bodyLg" as="p" alignment="start">
        You can use sales reports to see information about your customers'
        orders based on criteria such as sales over time, by product, or by
        staff.
      </Text>
      <Text variant="bodyLg" as="p" alignment="center">
        You can use sales reports to see information about your customers'
        orders based on criteria such as sales over time, by product, or by
        staff.
      </Text>
      <Text variant="bodyLg" as="p" alignment="end">
        You can use sales reports to see information about your customers'
        orders based on criteria such as sales over time, by product, or by
        staff.
      </Text>
      <Text variant="bodyLg" as="p" alignment="justify">
        You can use sales reports to see information about your customers'
        orders based on criteria such as sales over time, by product, or by
        staff.
      </Text>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 16 0'
  },
  items: [{
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--align-start">You can use sales reports to see information about your customers\\' orders based on criteria such as sales over time, by product, or by staff.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--align-center">You can use sales reports to see information about your customers\\' orders based on criteria such as sales over time, by product, or by staff.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--align-end">You can use sales reports to see information about your customers\\' orders based on criteria such as sales over time, by product, or by staff.</p>'
  }, {
    xtype: 'component',
    html: '<p class="polaris-text polaris-text--align-justify">You can use sales reports to see information about your customers\\' orders based on criteria such as sales over time, by product, or by staff.</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack polaris-stack--vertical">
  <p class="polaris-text polaris-text--body-lg polaris-text--align-start">
    You can use sales reports to see information about your customers'
    orders based on criteria such as sales over time, by product, or by
    staff.
  </p>
  <p class="polaris-text polaris-text--body-lg polaris-text--align-center">
    You can use sales reports to see information about your customers'
    orders based on criteria such as sales over time, by product, or by
    staff.
  </p>
  <p class="polaris-text polaris-text--body-lg polaris-text--align-end">
    You can use sales reports to see information about your customers'
    orders based on criteria such as sales over time, by product, or by
    staff.
  </p>
  <p class="polaris-text polaris-text--body-lg polaris-text--align-justify">
    You can use sales reports to see information about your customers'
    orders based on criteria such as sales over time, by product, or by
    staff.
  </p>
</div>`,
    typescript: `import React from 'react';
import {LegacyStack, Text} from '@shopify/polaris';

type TextAlignment = 'start' | 'center' | 'end' | 'justify';

interface TextAlignExampleProps {
  content?: string;
}

function TextAlignExample({ 
  content = "You can use sales reports to see information about your customers' orders based on criteria such as sales over time, by product, or by staff."
}: TextAlignExampleProps): JSX.Element {
  const alignments: TextAlignment[] = ['start', 'center', 'end', 'justify'];

  return (
    <LegacyStack vertical>
      {alignments.map((alignment) => (
        <Text 
          key={alignment} 
          variant="bodyLg" 
          as="p" 
          alignment={alignment}
        >
          {content}
        </Text>
      ))}
    </LegacyStack>
  );
}`
  }
};

// Stack Examples (BlockStack and InlineStack)
export const blockStackExamples = {
  'with-gap': {
    react: `import {BlockStack} from '@shopify/polaris';
import React from 'react';

function BlockStackExample() {
  return (
    <BlockStack gap="500">
      <Placeholder height="48px" />
      <Placeholder height="48px" />
      <Placeholder height="48px" />
    </BlockStack>
  );
}

const Placeholder = ({height = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-200)',
        height: height,
      }}
    />
  );
};`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 8px 0'
  },
  items: [{
    xtype: 'component',
    height: 48,
    style: {
      backgroundColor: '#1976d2',
      padding: '14px 8px'
    }
  }, {
    xtype: 'component',
    height: 48,
    style: {
      backgroundColor: '#1976d2',
      padding: '14px 8px'
    }
  }, {
    xtype: 'component',
    height: 48,
    style: {
      backgroundColor: '#1976d2',
      padding: '14px 8px'
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-block-stack polaris-block-stack--gap-500">
  <div class="polaris-block-stack__item">
    <div class="placeholder" style="height: 48px;"></div>
  </div>
  <div class="polaris-block-stack__item">
    <div class="placeholder" style="height: 48px;"></div>
  </div>
  <div class="polaris-block-stack__item">
    <div class="placeholder" style="height: 48px;"></div>
  </div>
</div>`,
    typescript: `import {BlockStack} from '@shopify/polaris';
import React from 'react';

interface PlaceholderProps {
  height?: string;
  content?: string;
}

interface BlockStackExampleProps {
  gap?: string;
  items?: PlaceholderProps[];
}

function BlockStackExample({ 
  gap = "500",
  items = [
    { height: "48px" },
    { height: "48px" },
    { height: "48px" }
  ]
}: BlockStackExampleProps): JSX.Element {
  return (
    <BlockStack gap={gap}>
      {items.map((item, index) => (
        <Placeholder key={index} height={item.height} />
      ))}
    </BlockStack>
  );
}

const Placeholder: React.FC<PlaceholderProps> = ({height = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-200)',
        height: height,
      }}
    />
  );
};`
  },
  'with-align': {
    react: `import {BlockStack, Divider} from '@shopify/polaris';
import React from 'react';

function BlockStackExample() {
  return (
    <>
      <div style={{display: 'flex', height: '200px'}}>
        <BlockStack align="start">
          <Placeholder height="48px" width="320px" label="Start" />
          <Placeholder height="48px" width="320px" />
          <Placeholder height="48px" width="320px" />
        </BlockStack>
      </div>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <BlockStack align="center">
          <Placeholder height="48px" width="320px" label="Center" />
          <Placeholder height="48px" width="320px" />
          <Placeholder height="48px" width="320px" />
        </BlockStack>
      </div>
      <Divider />
      <div style={{display: 'flex', height: '200px'}}>
        <BlockStack align="end">
          <Placeholder height="48px" width="320px" label="End" />
          <Placeholder height="48px" width="320px" />
          <Placeholder height="48px" width="320px" />
        </BlockStack>
      </div>
    </>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-200)',
        height: height,
        width: width,
        color: 'white',
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  );
};`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: [{
    xtype: 'container',
    height: 200,
    layout: {
      type: 'vbox',
      align: 'left'
    },
    items: [{
      xtype: 'component',
      html: 'Start',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '14px 8px'
      }
    }, {
      xtype: 'component',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        padding: '14px 8px'
      }
    }, {
      xtype: 'component',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        padding: '14px 8px'
      }
    }]
  }, {
    xtype: 'splitter'
  }, {
    xtype: 'container',
    height: 200,
    layout: {
      type: 'vbox',
      align: 'center'
    },
    items: [{
      xtype: 'component',
      html: 'Center',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '14px 8px'
      }
    }, {
      xtype: 'component',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        padding: '14px 8px'
      }
    }, {
      xtype: 'component',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        padding: '14px 8px'
      }
    }]
  }, {
    xtype: 'splitter'
  }, {
    xtype: 'container',
    height: 200,
    layout: {
      type: 'vbox',
      align: 'right'
    },
    items: [{
      xtype: 'component',
      html: 'End',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '14px 8px'
      }
    }, {
      xtype: 'component',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        padding: '14px 8px'
      }
    }, {
      xtype: 'component',
      height: 48,
      width: 320,
      style: {
        backgroundColor: '#1976d2',
        padding: '14px 8px'
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="block-stack-examples">
  <div class="example-container" style="display: flex; height: 200px;">
    <div class="polaris-block-stack polaris-block-stack--align-start">
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;">Start</div>
      </div>
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;"></div>
      </div>
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;"></div>
      </div>
    </div>
  </div>
  <hr class="polaris-divider">
  <div class="example-container" style="display: flex; height: 200px;">
    <div class="polaris-block-stack polaris-block-stack--align-center">
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;">Center</div>
      </div>
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;"></div>
      </div>
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;"></div>
      </div>
    </div>
  </div>
  <hr class="polaris-divider">
  <div class="example-container" style="display: flex; height: 200px;">
    <div class="polaris-block-stack polaris-block-stack--align-end">
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;">End</div>
      </div>
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;"></div>
      </div>
      <div class="polaris-block-stack__item">
        <div class="placeholder" style="height: 48px; width: 320px;"></div>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import {BlockStack, Divider} from '@shopify/polaris';
import React from 'react';

type BlockAlign = 'start' | 'center' | 'end';

interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
}

interface AlignmentExample {
  align: BlockAlign;
  label: string;
}

interface BlockStackExampleProps {
  alignmentExamples?: AlignmentExample[];
}

function BlockStackExample({ 
  alignmentExamples = [
    { align: 'start', label: 'Start' },
    { align: 'center', label: 'Center' },
    { align: 'end', label: 'End' }
  ]
}: BlockStackExampleProps): JSX.Element {
  return (
    <>
      {alignmentExamples.map((example, index) => (
        <React.Fragment key={index}>
          <div style={{display: 'flex', height: '200px'}}>
            <BlockStack align={example.align}>
              <Placeholder height="48px" width="320px" label={example.label} />
              <Placeholder height="48px" width="320px" />
              <Placeholder height="48px" width="320px" />
            </BlockStack>
          </div>
          {index < alignmentExamples.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </>
  );
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '',
  height = 'auto',
  width = 'auto',
}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        padding: '14px var(--p-space-200)',
        height: height,
        width: width,
        color: 'white',
        textAlign: 'center',
      }}
    >
      {label}
    </div>
  );
};`
  }
};

export const inlineStackExamples = {
  'with-gap': {
    react: `import {InlineStack, BlockStack} from '@shopify/polaris';
import React from 'react';

function InlineStackExample() {
  return (
    <BlockStack>
      <InlineStack gap="400" wrap={false} blockAlign="center">
        <Placeholder width="106px" height="36px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </InlineStack>
      <InlineStack gap="400" wrap={false} blockAlign="end">
        <Placeholder width="106px" height="20px" />
        <Placeholder width="106px" height="20px" />
      </InlineStack>
    </BlockStack>
  );
}

const Placeholder = ({height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    />
  );
};`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'middle'
    },
    defaults: {
      margin: '0 8px 0 0'
    },
    items: [{
      xtype: 'component',
      width: 106,
      height: 36,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }]
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'bottom'
    },
    defaults: {
      margin: '0 8px 0 0'
    },
    items: [{
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-block-stack">
  <div class="polaris-block-stack__item">
    <div class="polaris-inline-stack polaris-inline-stack--gap-400 polaris-inline-stack--block-align-center polaris-inline-stack--no-wrap">
      <div class="polaris-inline-stack__item">
        <div class="placeholder" style="width: 106px; height: 36px;"></div>
      </div>
      <div class="polaris-inline-stack__item">
        <div class="placeholder" style="width: 106px; height: 20px;"></div>
      </div>
      <div class="polaris-inline-stack__item">
        <div class="placeholder" style="width: 106px; height: 20px;"></div>
      </div>
      <div class="polaris-inline-stack__item">
        <div class="placeholder" style="width: 106px; height: 20px;"></div>
      </div>
    </div>
  </div>
  <div class="polaris-block-stack__item">
    <div class="polaris-inline-stack polaris-inline-stack--gap-400 polaris-inline-stack--block-align-end polaris-inline-stack--no-wrap">
      <div class="polaris-inline-stack__item">
        <div class="placeholder" style="width: 106px; height: 20px;"></div>
      </div>
      <div class="polaris-inline-stack__item">
        <div class="placeholder" style="width: 106px; height: 20px;"></div>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import {InlineStack, BlockStack} from '@shopify/polaris';
import React from 'react';

interface PlaceholderProps {
  height?: string;
  width?: string;
}

interface StackRow {
  gap?: string;
  blockAlign?: 'start' | 'center' | 'end';
  items: PlaceholderProps[];
}

interface InlineStackExampleProps {
  rows?: StackRow[];
}

function InlineStackExample({ 
  rows = [
    {
      gap: "400",
      blockAlign: "center",
      items: [
        { width: "106px", height: "36px" },
        { width: "106px", height: "20px" },
        { width: "106px", height: "20px" },
        { width: "106px", height: "20px" }
      ]
    },
    {
      gap: "400",
      blockAlign: "end",
      items: [
        { width: "106px", height: "20px" },
        { width: "106px", height: "20px" }
      ]
    }
  ]
}: InlineStackExampleProps): JSX.Element {
  return (
    <BlockStack>
      {rows.map((row, rowIndex) => (
        <InlineStack key={rowIndex} gap={row.gap} wrap={false} blockAlign={row.blockAlign}>
          {row.items.map((item, itemIndex) => (
            <Placeholder key={itemIndex} width={item.width} height={item.height} />
          ))}
        </InlineStack>
      ))}
    </BlockStack>
  );
}

const Placeholder: React.FC<PlaceholderProps> = ({height = 'auto', width = 'auto'}) => {
  return (
    <div
      style={{
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
      }}
    />
  );
};`
  },
  'with-align': {
    react: `import {BlockStack, InlineStack, Text, Page, Divider} from '@shopify/polaris';
import React from 'react';

function InlineStackExample() {
  return (
    <Page narrowWidth>
      <BlockStack gap="1600">
        <InlineStack align="start">
          <Placeholder width="106px" label="Start" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </InlineStack>
        <Divider />
        <InlineStack align="center">
          <Placeholder width="106px" label="Center" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </InlineStack>
        <Divider />
        <InlineStack align="end">
          <Placeholder width="106px" label="End" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
          <Placeholder width="106px" height="20px" />
        </InlineStack>
      </BlockStack>
    </Page>
  );
}

const Placeholder = ({
  label = '',
  height = 'auto',
  width = 'auto',
}) => {
  return (
    <div
      style={{
        padding: '6px 0',
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {label && (
        <Text as="span" variant="bodyMd" fontWeight="medium" tone="text-inverse">
          {label}
        </Text>
      )}
    </div>
  );
};`,
    extjs: `Ext.create('Ext.panel.Panel', {
  width: 600,
  layout: 'vbox',
  bodyPadding: 10,
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'start'
    },
    defaults: {
      margin: '0 4px 0 0'
    },
    items: [{
      xtype: 'component',
      html: 'Start',
      width: 106,
      style: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '6px 0'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }]
  }, {
    xtype: 'splitter'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'center'
    },
    defaults: {
      margin: '0 4px 0 0'
    },
    items: [{
      xtype: 'component',
      html: 'Center',
      width: 106,
      style: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '6px 0'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }]
  }, {
    xtype: 'splitter'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'end'
    },
    defaults: {
      margin: '0 4px 0 0'
    },
    items: [{
      xtype: 'component',
      html: 'End',
      width: 106,
      style: {
        backgroundColor: '#1976d2',
        color: 'white',
        textAlign: 'center',
        padding: '6px 0'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }, {
      xtype: 'component',
      width: 106,
      height: 20,
      style: {
        backgroundColor: '#1976d2'
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-page polaris-page--narrow-width">
  <div class="polaris-block-stack polaris-block-stack--gap-1600">
    <div class="polaris-block-stack__item">
      <div class="polaris-inline-stack polaris-inline-stack--align-start">
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px;">Start</div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
      </div>
    </div>
    <div class="polaris-block-stack__item">
      <hr class="polaris-divider">
    </div>
    <div class="polaris-block-stack__item">
      <div class="polaris-inline-stack polaris-inline-stack--align-center">
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px;">Center</div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
      </div>
    </div>
    <div class="polaris-block-stack__item">
      <hr class="polaris-divider">
    </div>
    <div class="polaris-block-stack__item">
      <div class="polaris-inline-stack polaris-inline-stack--align-end">
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px;">End</div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
        <div class="polaris-inline-stack__item">
          <div class="placeholder" style="width: 106px; height: 20px;"></div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import {BlockStack, InlineStack, Text, Page, Divider} from '@shopify/polaris';
import React from 'react';

type InlineAlign = 'start' | 'center' | 'end';

interface PlaceholderProps {
  label?: string;
  height?: string;
  width?: string;
}

interface AlignmentExample {
  align: InlineAlign;
  label: string;
}

interface InlineStackExampleProps {
  alignmentExamples?: AlignmentExample[];
}

function InlineStackExample({ 
  alignmentExamples = [
    { align: 'start', label: 'Start' },
    { align: 'center', label: 'Center' },
    { align: 'end', label: 'End' }
  ]
}: InlineStackExampleProps): JSX.Element {
  return (
    <Page narrowWidth>
      <BlockStack gap="1600">
        {alignmentExamples.map((example, index) => (
          <React.Fragment key={index}>
            <InlineStack align={example.align}>
              <Placeholder width="106px" label={example.label} />
              <Placeholder width="106px" height="20px" />
              <Placeholder width="106px" height="20px" />
              <Placeholder width="106px" height="20px" />
            </InlineStack>
            {index < alignmentExamples.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </BlockStack>
    </Page>
  );
}

const Placeholder: React.FC<PlaceholderProps> = ({
  label = '',
  height = 'auto',
  width = 'auto',
}) => {
  return (
    <div
      style={{
        padding: '6px 0',
        background: 'var(--p-color-text-info)',
        height: height,
        width: width,
        color: 'white',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {label && (
        <Text as="span" variant="bodyMd" fontWeight="medium" tone="text-inverse">
          {label}
        </Text>
      )}
    </div>
  );
};`
  }
};

// LegacyStack Examples
export const legacyStackExamples = {
  'default': {
    react: `import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';

function LegacyStackExample() {
  return (
    <LegacyStack>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
      <Badge>Completed</Badge>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  defaults: {
    margin: '0 4px 0 0'
  },
  items: [{
    xtype: 'component',
    html: '<span class="badge badge-success">Paid</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#00a047',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-warning">Processing</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#f59e0b',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-info">Fulfilled</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-primary">Completed</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#8b5cf6',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-stack">
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--success">Paid</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--warning">Processing</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--info">Fulfilled</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--primary">Completed</span>
  </div>
</div>`,
    typescript: `import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';

interface BadgeInfo {
  label: string;
  status?: 'success' | 'info' | 'attention' | 'warning' | 'critical';
}

interface LegacyStackExampleProps {
  badges?: BadgeInfo[];
  spacing?: 'extraTight' | 'tight' | 'baseTight' | 'loose' | 'extraLoose';
}

function LegacyStackExample({ 
  badges = [
    { label: 'Paid', status: 'success' },
    { label: 'Processing', status: 'warning' },
    { label: 'Fulfilled', status: 'info' },
    { label: 'Completed' }
  ],
  spacing
}: LegacyStackExampleProps): JSX.Element {
  return (
    <LegacyStack spacing={spacing}>
      {badges.map((badge, index) => (
        <Badge key={index} tone={badge.status}>
          {badge.label}
        </Badge>
      ))}
    </LegacyStack>
  );
}`
  },
  'spacing': {
    react: `import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';

function LegacyStackExample() {
  return (
    <LegacyStack spacing="loose">
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  defaults: {
    margin: '0 16px 0 0'
  },
  items: [{
    xtype: 'component',
    html: '<span class="badge badge-success">Paid</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#00a047',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-info">Fulfilled</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-stack polaris-legacy-stack--spacing-loose">
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--success">Paid</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--info">Fulfilled</span>
  </div>
</div>`,
    typescript: `import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';

type StackSpacing = 'extraTight' | 'tight' | 'baseTight' | 'loose' | 'extraLoose';

interface LegacyStackExampleProps {
  spacing?: StackSpacing;
  items?: Array<{
    label: string;
    tone?: 'success' | 'info' | 'attention' | 'warning' | 'critical';
  }>;
}

function LegacyStackExample({ 
  spacing = 'loose',
  items = [
    { label: 'Paid', tone: 'success' },
    { label: 'Fulfilled', tone: 'info' }
  ]
}: LegacyStackExampleProps): JSX.Element {
  return (
    <LegacyStack spacing={spacing}>
      {items.map((item, index) => (
        <Badge key={index} tone={item.tone}>
          {item.label}
        </Badge>
      ))}
    </LegacyStack>
  );
}`
  },
  'vertical-centering': {
    react: `import {LegacyStack, Badge, Text} from '@shopify/polaris';
import React from 'react';

function LegacyStackExample() {
  return (
    <LegacyStack alignment="center">
      <Text variant="headingMd" as="h2">
        Order
        <br />
        #1136
        <br />
        was paid
      </Text>
      <Badge>Paid</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  defaults: {
    margin: '0 8px 0 0'
  },
  items: [{
    xtype: 'component',
    html: '<h2 style="margin: 0; font-size: 16px; font-weight: 600; line-height: 1.4;">Order<br/>#1136<br/>was paid</h2>'
  }, {
    xtype: 'component',
    html: '<span class="badge badge-success">Paid</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#00a047',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-info">Fulfilled</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px'
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-stack polaris-legacy-stack--alignment-center">
  <div class="polaris-legacy-stack__item">
    <h2 class="polaris-text polaris-text--variant-headingMd">
      Order
      <br />
      #1136
      <br />
      was paid
    </h2>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--success">Paid</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--info">Fulfilled</span>
  </div>
</div>`,
    typescript: `import {LegacyStack, Badge, Text} from '@shopify/polaris';
import React from 'react';

type StackAlignment = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

interface OrderInfo {
  orderNumber: string;
  status: string;
  badges: Array<{
    label: string;
    tone?: 'success' | 'info' | 'attention' | 'warning' | 'critical';
  }>;
}

interface LegacyStackExampleProps {
  alignment?: StackAlignment;
  orderInfo?: OrderInfo;
}

function LegacyStackExample({ 
  alignment = 'center',
  orderInfo = {
    orderNumber: '#1136',
    status: 'was paid',
    badges: [
      { label: 'Paid', tone: 'success' },
      { label: 'Fulfilled', tone: 'info' }
    ]
  }
}: LegacyStackExampleProps): JSX.Element {
  return (
    <LegacyStack alignment={alignment}>
      <Text variant="headingMd" as="h2">
        Order
        <br />
        {orderInfo.orderNumber}
        <br />
        {orderInfo.status}
      </Text>
      {orderInfo.badges.map((badge, index) => (
        <Badge key={index} tone={badge.tone}>
          {badge.label}
        </Badge>
      ))}
    </LegacyStack>
  );
}`
  },
  'vertical': {
    react: `import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';

function LegacyStackExample() {
  return (
    <LegacyStack vertical>
      <Badge>Paid</Badge>
      <Badge>Processing</Badge>
      <Badge>Fulfilled</Badge>
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'left'
  },
  defaults: {
    margin: '0 0 4px 0'
  },
  items: [{
    xtype: 'component',
    html: '<span class="badge badge-success">Paid</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#00a047',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      display: 'inline-block'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-warning">Processing</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#f59e0b',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      display: 'inline-block'
    }
  }, {
    xtype: 'component',
    html: '<span class="badge badge-info">Fulfilled</span>',
    style: {
      padding: '4px 8px',
      backgroundColor: '#3b82f6',
      color: 'white',
      borderRadius: '4px',
      fontSize: '12px',
      display: 'inline-block'
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-stack polaris-legacy-stack--vertical">
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--success">Paid</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--warning">Processing</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <span class="polaris-badge polaris-badge--info">Fulfilled</span>
  </div>
</div>`,
    typescript: `import {LegacyStack, Badge} from '@shopify/polaris';
import React from 'react';

interface BadgeConfig {
  label: string;
  tone?: 'success' | 'info' | 'attention' | 'warning' | 'critical';
}

interface LegacyStackExampleProps {
  vertical?: boolean;
  badges?: BadgeConfig[];
  spacing?: 'extraTight' | 'tight' | 'baseTight' | 'loose' | 'extraLoose';
}

function LegacyStackExample({ 
  vertical = true,
  badges = [
    { label: 'Paid', tone: 'success' },
    { label: 'Processing', tone: 'warning' },
    { label: 'Fulfilled', tone: 'info' }
  ],
  spacing
}: LegacyStackExampleProps): JSX.Element {
  return (
    <LegacyStack vertical={vertical} spacing={spacing}>
      {badges.map((badge, index) => (
        <Badge key={index} tone={badge.tone}>
          {badge.label}
        </Badge>
      ))}
    </LegacyStack>
  );
}`
  }
};

// EmptyState Examples
export const emptyStateExamples = {
  'default': {
    react: `import {LegacyCard, EmptyState} from '@shopify/polaris';
import React from 'react';

function EmptyStateExample() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Empty State',
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'center',
    pack: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 120,
    height: 120,
    margin: '0 0 20 0'
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">Manage your inventory transfers</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; margin: 0 0 20px 0; color: #6d7175;">Track and receive your incoming inventory from suppliers.</p>'
  }, {
    xtype: 'container',
    layout: 'hbox',
    items: [{
      xtype: 'button',
      text: 'Add transfer',
      ui: 'primary',
      margin: '0 10 0 0',
      handler: function() {
        console.log('Add transfer clicked');
      }
    }, {
      xtype: 'button',
      text: 'Learn more',
      handler: function() {
        window.open('https://help.shopify.com', '_blank');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-card polaris-legacy-card--sectioned">
  <div class="polaris-empty-state">
    <div class="polaris-empty-state__section">
      <div class="polaris-empty-state__image">
        <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" 
             alt="Empty state illustration" 
             class="polaris-empty-state__illustration">
      </div>
      <div class="polaris-empty-state__content">
        <h2 class="polaris-empty-state__heading">Manage your inventory transfers</h2>
        <div class="polaris-empty-state__text">
          <p>Track and receive your incoming inventory from suppliers.</p>
        </div>
        <div class="polaris-empty-state__actions">
          <button class="polaris-button polaris-button--primary" type="button">
            Add transfer
          </button>
          <a href="https://help.shopify.com" class="polaris-button" target="_blank">
            Learn more
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Add transfer clicked');
});
</script>`,
    typescript: `import {LegacyCard, EmptyState} from '@shopify/polaris';
import React from 'react';

interface EmptyStateAction {
  content: string;
  onAction?: () => void;
  url?: string;
  external?: boolean;
}

interface EmptyStateExampleProps {
  heading?: string;
  image?: string;
  children?: React.ReactNode;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}

function EmptyStateExample({
  heading = "Manage your inventory transfers",
  image = "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
  children = <p>Track and receive your incoming inventory from suppliers.</p>,
  action = {content: 'Add transfer'},
  secondaryAction = {
    content: 'Learn more',
    url: 'https://help.shopify.com',
  }
}: EmptyStateExampleProps): JSX.Element {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading={heading}
        action={action}
        secondaryAction={secondaryAction}
        image={image}
      >
        {children}
      </EmptyState>
    </LegacyCard>
  );
}`
  },
  'with-full-width-layout': {
    react: `import {LegacyCard, EmptyState} from '@shopify/polaris';
import React from 'react';

function EmptyStateExample() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Upload a file to get started"
        action={{content: 'Upload files'}}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        fullWidth
      >
        <p>
          You can use the Files section to upload images, videos, and other
          documents. This example shows the content with a centered layout and
          full width.
        </p>
      </EmptyState>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Upload Files',
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'center',
      pack: 'center'
    },
    items: [{
      xtype: 'image',
      src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
      width: 120,
      height: 120,
      margin: '0 0 20 0'
    }, {
      xtype: 'component',
      html: '<h2 style="text-align: center; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">Upload a file to get started</h2>'
    }, {
      xtype: 'component',
      html: '<p style="text-align: center; margin: 0 0 20px 0; color: #6d7175; max-width: 600px;">You can use the Files section to upload images, videos, and other documents. This example shows the content with a centered layout and full width.</p>'
    }, {
      xtype: 'button',
      text: 'Upload files',
      ui: 'primary',
      handler: function() {
        console.log('Upload files clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-card polaris-legacy-card--sectioned">
  <div class="polaris-empty-state polaris-empty-state--full-width">
    <div class="polaris-empty-state__section">
      <div class="polaris-empty-state__image">
        <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" 
             alt="Empty state illustration" 
             class="polaris-empty-state__illustration">
      </div>
      <div class="polaris-empty-state__content">
        <h2 class="polaris-empty-state__heading">Upload a file to get started</h2>
        <div class="polaris-empty-state__text">
          <p>
            You can use the Files section to upload images, videos, and other
            documents. This example shows the content with a centered layout and
            full width.
          </p>
        </div>
        <div class="polaris-empty-state__actions">
          <button class="polaris-button polaris-button--primary" type="button">
            Upload files
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Upload files clicked');
});
</script>`,
    typescript: `import {LegacyCard, EmptyState} from '@shopify/polaris';
import React from 'react';

interface FullWidthEmptyStateProps {
  heading?: string;
  image?: string;
  children?: React.ReactNode;
  actionContent?: string;
  onAction?: () => void;
  fullWidth?: boolean;
}

function EmptyStateExample({
  heading = "Upload a file to get started",
  image = "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
  children = (
    <p>
      You can use the Files section to upload images, videos, and other
      documents. This example shows the content with a centered layout and
      full width.
    </p>
  ),
  actionContent = 'Upload files',
  onAction,
  fullWidth = true
}: FullWidthEmptyStateProps): JSX.Element {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading={heading}
        action={{content: actionContent, onAction}}
        image={image}
        fullWidth={fullWidth}
      >
        {children}
      </EmptyState>
    </LegacyCard>
  );
}`
  },
  'with-subdued-footer-context': {
    react: `import {LegacyCard, EmptyState, Link} from '@shopify/polaris';
import React from 'react';

function EmptyStateExample() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Manage your inventory transfers"
        action={{content: 'Add transfer'}}
        secondaryAction={{
          content: 'Learn more',
          url: 'https://help.shopify.com',
        }}
        footerContent={
          <p>
            If you don't want to add a transfer, you can import your inventory
            from{' '}
            <Link monochrome url="/settings">
              settings
            </Link>
            .
          </p>
        }
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>Track and receive your incoming inventory from suppliers.</p>
      </EmptyState>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Inventory Transfers',
  bodyPadding: 20,
  layout: {
    type: 'vbox',
    align: 'center',
    pack: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 120,
    height: 120,
    margin: '0 0 20 0'
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 0 0 10px 0; font-size: 20px; font-weight: 600;">Manage your inventory transfers</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; margin: 0 0 20px 0; color: #6d7175;">Track and receive your incoming inventory from suppliers.</p>'
  }, {
    xtype: 'container',
    layout: 'hbox',
    margin: '0 0 20 0',
    items: [{
      xtype: 'button',
      text: 'Add transfer',
      ui: 'primary',
      margin: '0 10 0 0',
      handler: function() {
        console.log('Add transfer clicked');
      }
    }, {
      xtype: 'button',
      text: 'Learn more',
      handler: function() {
        window.open('https://help.shopify.com', '_blank');
      }
    }]
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #8c9196; font-size: 14px;">If you don\\'t want to add a transfer, you can import your inventory from <a href="/settings" style="color: #8c9196; text-decoration: underline;">settings</a>.</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-legacy-card polaris-legacy-card--sectioned">
  <div class="polaris-empty-state">
    <div class="polaris-empty-state__section">
      <div class="polaris-empty-state__image">
        <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png" 
             alt="Empty state illustration" 
             class="polaris-empty-state__illustration">
      </div>
      <div class="polaris-empty-state__content">
        <h2 class="polaris-empty-state__heading">Manage your inventory transfers</h2>
        <div class="polaris-empty-state__text">
          <p>Track and receive your incoming inventory from suppliers.</p>
        </div>
        <div class="polaris-empty-state__actions">
          <button class="polaris-button polaris-button--primary" type="button">
            Add transfer
          </button>
          <a href="https://help.shopify.com" class="polaris-button" target="_blank">
            Learn more
          </a>
        </div>
        <div class="polaris-empty-state__footer">
          <p class="polaris-text--subdued">
            If you don't want to add a transfer, you can import your inventory
            from <a href="/settings" class="polaris-link polaris-link--monochrome">settings</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Add transfer clicked');
});

document.querySelector('.polaris-link').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Settings link clicked');
});
</script>`,
    typescript: `import {LegacyCard, EmptyState, Link} from '@shopify/polaris';
import React from 'react';

interface EmptyStateAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

interface EmptyStateWithFooterProps {
  heading?: string;
  image?: string;
  children?: React.ReactNode;
  action?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  footerContent?: React.ReactNode;
}

function EmptyStateExample({
  heading = "Manage your inventory transfers",
  image = "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png",
  children = <p>Track and receive your incoming inventory from suppliers.</p>,
  action = {content: 'Add transfer'},
  secondaryAction = {
    content: 'Learn more',
    url: 'https://help.shopify.com',
  },
  footerContent = (
    <p>
      If you don't want to add a transfer, you can import your inventory
      from{' '}
      <Link monochrome url="/settings">
        settings
      </Link>
      .
    </p>
  )
}: EmptyStateWithFooterProps): JSX.Element {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading={heading}
        action={action}
        secondaryAction={secondaryAction}
        footerContent={footerContent}
        image={image}
      >
        {children}
      </EmptyState>
    </LegacyCard>
  );
}`
  }
};

// CalloutCard Examples
export const calloutCardExamples = {
  'default': {
    react: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: 'Customize checkout',
        url: '#',
      }}
    >
      <p>Upload your store's logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customize the style of your checkout',
  cls: 'callout-card',
  bodyPadding: 20,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
    width: 120,
    height: 120,
    margin: '0 20 0 0'
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<p style="margin: 0 0 20px 0; color: #5c6b73;">Upload your store\\'s logo, change colors and fonts, and more.</p>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Customize checkout',
      ui: 'primary',
      handler: function() {
        console.log('Customize checkout clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-callout-card">
  <div class="polaris-callout-card__container">
    <div class="polaris-callout-card__illustration">
      <img src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg" 
           alt="Checkout customization illustration" 
           class="polaris-callout-card__image">
    </div>
    <div class="polaris-callout-card__content">
      <div class="polaris-callout-card__header">
        <h2 class="polaris-callout-card__title">Customize the style of your checkout</h2>
      </div>
      <div class="polaris-callout-card__text">
        <p>Upload your store's logo, change colors and fonts, and more.</p>
      </div>
      <div class="polaris-callout-card__actions">
        <a href="#" class="polaris-button polaris-button--primary">
          Customize checkout
        </a>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Customize checkout clicked');
});
</script>`,
    typescript: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

interface CalloutCardAction {
  content: string;
  url?: string;
  onAction?: () => void;
  external?: boolean;
}

interface CalloutCardExampleProps {
  title?: string;
  illustration?: string;
  children?: React.ReactNode;
  primaryAction?: CalloutCardAction;
}

function Example({
  title = "Customize the style of your checkout",
  illustration = "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
  children = <p>Upload your store's logo, change colors and fonts, and more.</p>,
  primaryAction = {
    content: 'Customize checkout',
    url: '#',
  }
}: CalloutCardExampleProps): JSX.Element {
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={primaryAction}
    >
      {children}
    </CalloutCard>
  );
}`
  },
  'dismissable': {
    react: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
      onDismiss={() => {}}
    >
      <p>Upload your store's logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customize the style of your checkout',
  cls: 'callout-card',
  bodyPadding: 20,
  closable: true,
  closeAction: 'hide',
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
    width: 120,
    height: 120,
    margin: '0 20 0 0'
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<p style="margin: 0 0 20px 0; color: #5c6b73;">Upload your store\\'s logo, change colors and fonts, and more.</p>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Customize checkout',
      ui: 'primary',
      handler: function() {
        console.log('Customize checkout clicked');
      }
    }]
  }],
  listeners: {
    close: function() {
      console.log('Callout card dismissed');
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-callout-card polaris-callout-card--dismissable">
  <div class="polaris-callout-card__container">
    <button class="polaris-callout-card__dismiss" type="button" aria-label="Dismiss">
      <span class="polaris-icon polaris-icon--small">×</span>
    </button>
    <div class="polaris-callout-card__illustration">
      <img src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg" 
           alt="Checkout customization illustration" 
           class="polaris-callout-card__image">
    </div>
    <div class="polaris-callout-card__content">
      <div class="polaris-callout-card__header">
        <h2 class="polaris-callout-card__title">Customize the style of your checkout</h2>
      </div>
      <div class="polaris-callout-card__text">
        <p>Upload your store's logo, change colors and fonts, and more.</p>
      </div>
      <div class="polaris-callout-card__actions">
        <button class="polaris-button polaris-button--primary" type="button">
          Customize checkout
        </button>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Customize checkout clicked');
});

document.querySelector('.polaris-callout-card__dismiss').addEventListener('click', () => {
  const card = document.querySelector('.polaris-callout-card');
  card.style.display = 'none';
  console.log('Callout card dismissed');
});
</script>`,
    typescript: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

interface DismissableCalloutCardProps {
  title?: string;
  illustration?: string;
  children?: React.ReactNode;
  primaryAction?: {
    content: string;
    onAction?: () => void;
  };
  onDismiss?: () => void;
}

function Example({
  title = "Customize the style of your checkout",
  illustration = "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
  children = <p>Upload your store's logo, change colors and fonts, and more.</p>,
  primaryAction = {content: 'Customize checkout'},
  onDismiss = () => console.log('Card dismissed')
}: DismissableCalloutCardProps): JSX.Element {
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={primaryAction}
      onDismiss={onDismiss}
    >
      {children}
    </CalloutCard>
  );
}`
  },
  'with-secondary-action': {
    react: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <CalloutCard
      title="Customize the style of your checkout"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{content: 'Customize checkout'}}
      secondaryAction={{content: 'Learn more about customizing checkout'}}
    >
      <p>Upload your store's logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customize the style of your checkout',
  cls: 'callout-card',
  bodyPadding: 20,
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg',
    width: 120,
    height: 120,
    margin: '0 20 0 0'
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<p style="margin: 0 0 20px 0; color: #5c6b73;">Upload your store\\'s logo, change colors and fonts, and more.</p>',
      flex: 1
    }, {
      xtype: 'container',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        text: 'Customize checkout',
        ui: 'primary',
        margin: '0 10 0 0',
        handler: function() {
          console.log('Customize checkout clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more about customizing checkout',
        handler: function() {
          console.log('Learn more clicked');
        }
      }]
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-callout-card">
  <div class="polaris-callout-card__container">
    <div class="polaris-callout-card__illustration">
      <img src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg" 
           alt="Checkout customization illustration" 
           class="polaris-callout-card__image">
    </div>
    <div class="polaris-callout-card__content">
      <div class="polaris-callout-card__header">
        <h2 class="polaris-callout-card__title">Customize the style of your checkout</h2>
      </div>
      <div class="polaris-callout-card__text">
        <p>Upload your store's logo, change colors and fonts, and more.</p>
      </div>
      <div class="polaris-callout-card__actions">
        <button class="polaris-button polaris-button--primary" type="button">
          Customize checkout
        </button>
        <button class="polaris-button" type="button">
          Learn more about customizing checkout
        </button>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Customize checkout clicked');
});

document.querySelectorAll('.polaris-button:not(.polaris-button--primary)').forEach(button => {
  button.addEventListener('click', () => {
    console.log('Learn more clicked');
  });
});
</script>`,
    typescript: `import {CalloutCard} from '@shopify/polaris';
import React from 'react';

interface CalloutCardAction {
  content: string;
  onAction?: () => void;
  url?: string;
}

interface CalloutCardWithSecondaryActionProps {
  title?: string;
  illustration?: string;
  children?: React.ReactNode;
  primaryAction?: CalloutCardAction;
  secondaryAction?: CalloutCardAction;
}

function Example({
  title = "Customize the style of your checkout",
  illustration = "https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg",
  children = <p>Upload your store's logo, change colors and fonts, and more.</p>,
  primaryAction = {content: 'Customize checkout'},
  secondaryAction = {content: 'Learn more about customizing checkout'}
}: CalloutCardWithSecondaryActionProps): JSX.Element {
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    >
      {children}
    </CalloutCard>
  );
}`
  }
};

// MediaCard Examples
export const mediaCardExamples = {
  'default': {
    react: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

function MediaCardExample() {
  return (
    <MediaCard
      title="Getting Started"
      primaryAction={{
        content: 'Learn about getting started',
        onAction: () => {},
      }}
      description="Discover how Shopify can power up your entrepreneurial journey."
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Getting Started',
  cls: 'media-card',
  width: 400,
  bodyPadding: 0,
  layout: 'fit',
  tools: [{
    type: 'gear',
    menu: [{
      text: 'Dismiss',
      handler: function() {
        console.log('Dismiss clicked');
      }
    }]
  }],
  items: [{
    xtype: 'container',
    layout: 'vbox',
    items: [{
      xtype: 'image',
      src: 'https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850',
      height: 200,
      style: {
        objectFit: 'cover',
        objectPosition: 'center'
      }
    }, {
      xtype: 'container',
      padding: 16,
      layout: 'vbox',
      items: [{
        xtype: 'component',
        html: '<p style="margin: 0 0 16px 0; color: #5c6b73;">Discover how Shopify can power up your entrepreneurial journey.</p>'
      }, {
        xtype: 'button',
        text: 'Learn about getting started',
        ui: 'primary',
        handler: function() {
          console.log('Learn about getting started clicked');
        }
      }]
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card">
  <div class="polaris-media-card__media">
    <img src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850" 
         alt="Getting Started" 
         class="polaris-media-card__image">
  </div>
  <div class="polaris-media-card__content">
    <div class="polaris-media-card__header">
      <h2 class="polaris-media-card__title">Getting Started</h2>
      <div class="polaris-media-card__popover">
        <button class="polaris-button polaris-button--icon" type="button" aria-label="More actions">
          <span class="polaris-icon">⋮</span>
        </button>
        <div class="polaris-popover" style="display: none;">
          <button class="polaris-action-list__item" type="button">Dismiss</button>
        </div>
      </div>
    </div>
    <div class="polaris-media-card__description">
      <p>Discover how Shopify can power up your entrepreneurial journey.</p>
    </div>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary" type="button">
        Learn about getting started
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Learn about getting started clicked');
});

// Popover toggle
document.querySelector('.polaris-button--icon').addEventListener('click', () => {
  const popover = document.querySelector('.polaris-popover');
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelector('.polaris-action-list__item').addEventListener('click', () => {
  console.log('Dismiss clicked');
  document.querySelector('.polaris-popover').style.display = 'none';
});
</script>`,
    typescript: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

interface MediaCardAction {
  content: string;
  onAction: () => void;
}

interface MediaCardExampleProps {
  title?: string;
  description?: string;
  primaryAction?: MediaCardAction;
  popoverActions?: MediaCardAction[];
  imageSrc?: string;
  imageAlt?: string;
}

function MediaCardExample({
  title = "Getting Started",
  description = "Discover how Shopify can power up your entrepreneurial journey.",
  primaryAction = {
    content: 'Learn about getting started',
    onAction: () => console.log('Primary action clicked'),
  },
  popoverActions = [{content: 'Dismiss', onAction: () => console.log('Dismissed')}],
  imageSrc = "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  imageAlt = ""
}: MediaCardExampleProps): JSX.Element {
  return (
    <MediaCard
      title={title}
      primaryAction={primaryAction}
      description={description}
      popoverActions={popoverActions}
    >
      <img
        alt={imageAlt}
        width="100%"
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src={imageSrc}
      />
    </MediaCard>
  );
}`
  },
  'with-small-visual': {
    react: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

function MediaCardExample() {
  return (
    <MediaCard
      title="Getting Started"
      primaryAction={{
        content: 'Learn about getting started',
        onAction: () => {},
      }}
      description="Discover how Shopify can power up your entrepreneurial journey."
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
      size="small"
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Getting Started',
  cls: 'media-card media-card-small',
  width: 300,
  height: 150,
  bodyPadding: 0,
  layout: 'hbox',
  tools: [{
    type: 'gear',
    menu: [{
      text: 'Dismiss',
      handler: function() {
        console.log('Dismiss clicked');
      }
    }]
  }],
  items: [{
    xtype: 'image',
    src: 'https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850',
    width: 100,
    style: {
      objectFit: 'cover',
      objectPosition: 'center'
    }
  }, {
    xtype: 'container',
    flex: 1,
    padding: 12,
    layout: 'vbox',
    items: [{
      xtype: 'component',
      html: '<p style="margin: 0 0 12px 0; color: #5c6b73; font-size: 13px;">Discover how Shopify can power up your entrepreneurial journey.</p>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Learn about getting started',
      ui: 'primary',
      scale: 'small',
      handler: function() {
        console.log('Learn about getting started clicked');
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card polaris-media-card--small">
  <div class="polaris-media-card__media polaris-media-card__media--small">
    <img src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850" 
         alt="Getting Started" 
         class="polaris-media-card__image">
  </div>
  <div class="polaris-media-card__content">
    <div class="polaris-media-card__header">
      <h2 class="polaris-media-card__title">Getting Started</h2>
      <div class="polaris-media-card__popover">
        <button class="polaris-button polaris-button--icon" type="button" aria-label="More actions">
          <span class="polaris-icon">⋮</span>
        </button>
        <div class="polaris-popover" style="display: none;">
          <button class="polaris-action-list__item" type="button">Dismiss</button>
        </div>
      </div>
    </div>
    <div class="polaris-media-card__description">
      <p>Discover how Shopify can power up your entrepreneurial journey.</p>
    </div>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary polaris-button--size-slim" type="button">
        Learn about getting started
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Learn about getting started clicked');
});

// Popover toggle
document.querySelector('.polaris-button--icon').addEventListener('click', () => {
  const popover = document.querySelector('.polaris-popover');
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelector('.polaris-action-list__item').addEventListener('click', () => {
  console.log('Dismiss clicked');
  document.querySelector('.polaris-popover').style.display = 'none';
});
</script>`,
    typescript: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

type MediaCardSize = 'small' | 'medium';

interface MediaCardAction {
  content: string;
  onAction: () => void;
}

interface SmallMediaCardProps {
  title?: string;
  description?: string;
  primaryAction?: MediaCardAction;
  popoverActions?: MediaCardAction[];
  size?: MediaCardSize;
  imageSrc?: string;
  imageAlt?: string;
}

function MediaCardExample({
  title = "Getting Started",
  description = "Discover how Shopify can power up your entrepreneurial journey.",
  primaryAction = {
    content: 'Learn about getting started',
    onAction: () => console.log('Primary action clicked'),
  },
  popoverActions = [{content: 'Dismiss', onAction: () => console.log('Dismissed')}],
  size = "small",
  imageSrc = "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  imageAlt = ""
}: SmallMediaCardProps): JSX.Element {
  return (
    <MediaCard
      title={title}
      primaryAction={primaryAction}
      description={description}
      popoverActions={popoverActions}
      size={size}
    >
      <img
        alt={imageAlt}
        width="100%"
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src={imageSrc}
      />
    </MediaCard>
  );
}`
  },
  'with-secondary-action': {
    react: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

function MediaCardExample() {
  return (
    <MediaCard
      title="Get closer to launching your store"
      primaryAction={{
        content: 'Add a product',
        onAction: () => {},
      }}
      secondaryAction={{
        content: 'Learn more',
        onAction: () => {},
      }}
      description="Start your business with eye-catching inventory."
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{objectFit: 'cover', objectPosition: 'center'}}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Get closer to launching your store',
  cls: 'media-card',
  width: 400,
  bodyPadding: 0,
  layout: 'fit',
  tools: [{
    type: 'gear',
    menu: [{
      text: 'Dismiss',
      handler: function() {
        console.log('Dismiss clicked');
      }
    }]
  }],
  items: [{
    xtype: 'container',
    layout: 'vbox',
    items: [{
      xtype: 'image',
      src: 'https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850',
      height: 200,
      style: {
        objectFit: 'cover',
        objectPosition: 'center'
      }
    }, {
      xtype: 'container',
      padding: 16,
      layout: 'vbox',
      items: [{
        xtype: 'component',
        html: '<p style="margin: 0 0 16px 0; color: #5c6b73;">Start your business with eye-catching inventory.</p>'
      }, {
        xtype: 'container',
        layout: 'hbox',
        items: [{
          xtype: 'button',
          text: 'Add a product',
          ui: 'primary',
          margin: '0 8 0 0',
          handler: function() {
            console.log('Add a product clicked');
          }
        }, {
          xtype: 'button',
          text: 'Learn more',
          handler: function() {
            console.log('Learn more clicked');
          }
        }]
      }]
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card">
  <div class="polaris-media-card__media">
    <img src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850" 
         alt="Get closer to launching your store" 
         class="polaris-media-card__image">
  </div>
  <div class="polaris-media-card__content">
    <div class="polaris-media-card__header">
      <h2 class="polaris-media-card__title">Get closer to launching your store</h2>
      <div class="polaris-media-card__popover">
        <button class="polaris-button polaris-button--icon" type="button" aria-label="More actions">
          <span class="polaris-icon">⋮</span>
        </button>
        <div class="polaris-popover" style="display: none;">
          <button class="polaris-action-list__item" type="button">Dismiss</button>
        </div>
      </div>
    </div>
    <div class="polaris-media-card__description">
      <p>Start your business with eye-catching inventory.</p>
    </div>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary" type="button">
        Add a product
      </button>
      <button class="polaris-button" type="button">
        Learn more
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Add a product clicked');
});

document.querySelectorAll('.polaris-button:not(.polaris-button--primary):not(.polaris-button--icon)').forEach(button => {
  button.addEventListener('click', () => {
    console.log('Learn more clicked');
  });
});

// Popover toggle
document.querySelector('.polaris-button--icon').addEventListener('click', () => {
  const popover = document.querySelector('.polaris-popover');
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelector('.polaris-action-list__item').addEventListener('click', () => {
  console.log('Dismiss clicked');
  document.querySelector('.polaris-popover').style.display = 'none';
});
</script>`,
    typescript: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

interface MediaCardAction {
  content: string;
  onAction: () => void;
}

interface MediaCardWithSecondaryActionProps {
  title?: string;
  description?: string;
  primaryAction?: MediaCardAction;
  secondaryAction?: MediaCardAction;
  popoverActions?: MediaCardAction[];
  imageSrc?: string;
  imageAlt?: string;
}

function MediaCardExample({
  title = "Get closer to launching your store",
  description = "Start your business with eye-catching inventory.",
  primaryAction = {
    content: 'Add a product',
    onAction: () => console.log('Add a product clicked'),
  },
  secondaryAction = {
    content: 'Learn more',
    onAction: () => console.log('Learn more clicked'),
  },
  popoverActions = [{content: 'Dismiss', onAction: () => console.log('Dismissed')}],
  imageSrc = "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  imageAlt = ""
}: MediaCardWithSecondaryActionProps): JSX.Element {
  return (
    <MediaCard
      title={title}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      description={description}
      popoverActions={popoverActions}
    >
      <img
        alt={imageAlt}
        width="100%"
        height="100%"
        style={{objectFit: 'cover', objectPosition: 'center'}}
        src={imageSrc}
      />
    </MediaCard>
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
  'avatar': avatarExamples,
  'bleed': bleedExamples,
  'box': boxExamples,
  'divider': dividerExamples,
  'grid': gridExamples,
  'spinner': spinnerExamples,
  'text': textExamples,
  'block-stack': blockStackExamples,
  'inline-stack': inlineStackExamples,
  'legacy-stack': legacyStackExamples,
  'empty-state': emptyStateExamples,
  'callout-card': calloutCardExamples,
  'media-card': mediaCardExamples,
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