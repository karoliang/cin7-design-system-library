export interface CodeVariant {
  react: string;
  vanilla: string;
  extjs: string;
  typescript: string;
}

// Button Component Examples
export const buttonExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Button } from '@shopify/polaris';
import React from 'react';

function ButtonExample() {
  return <Button>Click me</Button>;
}

export default ButtonExample;`,

    vanilla: `<!-- HTML Structure -->
<button class="polaris-button">Click me</button>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createButton } from '@cin7/vanilla-js';

const button = createButton({
  text: 'Click me',
  onClick: () => {
    console.log('Button clicked!');
  }
});

document.getElementById('app').appendChild(button);
</script>`,

    extjs: `// ExtJS Button using @cin7/extjs-adapters
Ext.create('Ext.button.Button', {
  text: 'Click me',
  handler: function() {
    console.log('Button clicked!');
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisButton } from '@cin7/extjs-adapters';

const button = Ext.create('PolarisButton', {
  text: 'Click me',
  handler: function() {
    console.log('Button clicked!');
  }
});`,

    typescript: `import { Button, ButtonProps } from '@shopify/polaris';
import React from 'react';

interface ButtonExampleProps {
  label?: string;
  onClick?: () => void;
  variant?: ButtonProps['variant'];
}

function ButtonExample({
  label = 'Click me',
  onClick,
  variant = 'primary'
}: ButtonExampleProps): JSX.Element {
  return (
    <Button
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}

export default ButtonExample;`
  },

  primary: {
    react: `import { Button } from '@shopify/polaris';
import React from 'react';

function PrimaryButtonExample() {
  return (
    <Button variant="primary">
      Save
    </Button>
  );
}

export default PrimaryButtonExample;`,

    vanilla: `<!-- Primary Button -->
<button class="polaris-button polaris-button--primary">Save</button>

<script>
import { createButton } from '@cin7/vanilla-js';

const primaryButton = createButton({
  text: 'Save',
  variant: 'primary',
  onClick: () => {
    console.log('Save clicked!');
  }
});
</script>`,

    extjs: `Ext.create('Ext.button.Button', {
  text: 'Save',
  ui: 'primary',
  scale: 'medium',
  handler: function() {
    console.log('Save clicked!');
  }
});`,

    typescript: `import { Button } from '@shopify/polaris';
import React from 'react';

interface PrimaryButtonProps {
  onSave: () => void;
  loading?: boolean;
}

function PrimaryButton({
  onSave,
  loading = false
}: PrimaryButtonProps): JSX.Element {
  return (
    <Button
      variant="primary"
      onClick={onSave}
      loading={loading}
    >
      Save
    </Button>
  );
}`
  },

  plain: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function PlainButton() {
  return <Button variant="plain">View details</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'View details',
  ui: 'plain',
  handler: function() {
    console.log('View details clicked');
  }
});`,
    vanilla: `<!-- HTML Structure -->
<button class="polaris-button polaris-button--plain">View details</button>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--plain').addEventListener('click', () => {
  console.log('View details clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface PlainButtonExampleProps {
  onViewDetails: () => void;
  accessibilityLabel?: string;
}

function PlainButton({
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
  },

  disabled: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function DisabledButton() {
  return <Button disabled>Buy shipping label</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Buy shipping label',
  disabled: true,
  handler: function() {
    console.log('This should not fire');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--default" disabled>Buy shipping label</button>

<script>
// Disabled buttons don't need event handlers
const button = document.querySelector('.polaris-button[disabled]');
button.addEventListener('click', (event) => {
  // This won't fire due to disabled state
  console.log('Disabled button clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface DisabledButtonProps {
  label: string;
  variant?: 'primary' | 'plain';
  tone?: 'critical';
}

function DisabledButton({
  label,
  variant,
  tone
}: DisabledButtonProps): JSX.Element {
  return (
    <Button
      variant={variant}
      tone={tone}
      disabled
    >
      {label}
    </Button>
  );
}`
  },

  'full-width': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function FullWidthButton() {
  return <Button fullWidth onClick={() => console.log('[Action] Add customer clicked')}>Add customer</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Add customer',
  width: '100%',
  handler: function() {
    console.log('Add customer clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--full-width">Add customer</button>

<script>
const fullWidthButton = document.querySelector('.polaris-button--full-width');

fullWidthButton.addEventListener('click', () => {
  console.log('Add customer clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface FullWidthButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  disabled?: boolean;
}

function FullWidthButton({
  label = 'Add customer',
  onClick,
  variant,
  disabled = false
}: FullWidthButtonProps): JSX.Element {
  return (
    <Button
      fullWidth
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}`
  },

  'icon-only': {
    react: `import {Button} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

function IconOnlyButton() {
  return <Button icon={PlusIcon} accessibilityLabel="Add theme" />;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  iconCls: 'plus-icon',
  tooltip: 'Add theme',
  handler: function() {
    console.log('Add theme clicked');
  },
  listeners: {
    afterrender: function(btn) {
      // Add custom icon styling
      btn.el.down('.plus-icon').setHtml('➕');
    }
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--icon-only" aria-label="Add theme">
  <svg class="polaris-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
  </svg>
</button>

<script>
const iconButton = document.querySelector('.polaris-button--icon-only');

iconButton.addEventListener('click', () => {
  console.log('Add theme clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

interface IconOnlyButtonProps {
  icon?: React.ComponentType;
  accessibilityLabel: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  tone?: 'critical' | 'success';
  disabled?: boolean;
  size?: 'micro' | 'slim' | 'medium' | 'large';
}

function IconOnlyButton({
  icon: IconComponent = PlusIcon,
  accessibilityLabel,
  onClick,
  variant,
  tone,
  disabled = false,
  size = 'medium'
}: IconOnlyButtonProps): JSX.Element {
  return (
    <Button
      icon={IconComponent}
      accessibilityLabel={accessibilityLabel}
      onClick={onClick}
      variant={variant}
      tone={tone}
      disabled={disabled}
      size={size}
    />
  );
}`
  },

  large: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function LargeButton() {
  return <Button size="large">Create store</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Create store',
  scale: 'large',
  height: 48,
  padding: '12 24',
  handler: function() {
    console.log('Create store clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--large">Create store</button>

<script>
const largeButton = document.querySelector('.polaris-button--large');

largeButton.addEventListener('click', () => {
  console.log('Create store clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface LargeButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ComponentType;
}

function LargeButton({
  label = 'Create store',
  onClick,
  variant,
  disabled = false,
  loading = false,
  icon
}: LargeButtonProps): JSX.Element {
  return (
    <Button
      size="large"
      variant={variant}
      disabled={disabled}
      loading={loading}
      icon={icon}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}`
  },

  loading: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function LoadingButton() {
  return <Button loading>Save product</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Save product',
  iconCls: 'loading-icon',
  disabled: true,
  handler: function() {
    console.log('Save product clicked');
  },
  listeners: {
    afterrender: function(btn) {
      // Simulate loading state
      btn.setText('Saving...');
      btn.setIconCls('spinner-icon');
    }
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--loading">
  <span class="polaris-button__spinner">
    <svg class="polaris-spinner" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 3v3c0 .55-.45 1-1 1s-1-.45-1-1V3c0-.55.45-1 1-1s1 .45 1 1z"/>
    </svg>
  </span>
  <span class="polaris-button__text">Save product</span>
</button>

<script>
const loadingButton = document.querySelector('.polaris-button--loading');

// Simulate loading completion
setTimeout(() => {
  loadingButton.classList.remove('polaris-button--loading');
  loadingButton.querySelector('.polaris-button__spinner').style.display = 'none';
  loadingButton.querySelector('.polaris-button__text').textContent = 'Saved!';
}, 3000);
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface LoadingButtonProps {
  label?: string;
  isLoading?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  disabled?: boolean;
}

function LoadingButton({
  label = 'Save product',
  isLoading = true,
  onClick,
  variant,
  disabled = false
}: LoadingButtonProps): JSX.Element {
  return (
    <Button
      loading={isLoading}
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}`
  },

  'plain-critical': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function PlainCriticalButton() {
  return (
    <Button variant="plain" tone="critical">
      Remove
    </Button>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Remove',
  ui: 'plain-critical',
  style: {
    color: '#d72c0d'
  },
  handler: function() {
    console.log('Remove clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--plain polaris-button--critical">Remove</button>

<script>
const criticalButton = document.querySelector('.polaris-button--critical');

criticalButton.addEventListener('click', () => {
  console.log('Remove clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface PlainCriticalButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

function PlainCriticalButton({
  label = 'Remove',
  onClick,
  disabled = false,
  accessibilityLabel
}: PlainCriticalButtonProps): JSX.Element {
  return (
    <Button
      variant="plain"
      tone="critical"
      disabled={disabled}
      onClick={onClick}
      accessibilityLabel={accessibilityLabel}
    >
      {label}
    </Button>
  );
}`
  },

  'primary-critical': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function PrimaryCriticalButton() {
  return (
    <Button variant="primary" tone="critical">
      Delete product
    </Button>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Delete product',
  ui: 'primary-critical',
  style: {
    backgroundColor: '#d72c0d',
    borderColor: '#d72c0d',
    color: 'white'
  },
  handler: function() {
    console.log('Delete product clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--primary polaris-button--critical">Delete product</button>

<script>
const primaryCriticalButton = document.querySelector('.polaris-button--primary.polaris-button--critical');

primaryCriticalButton.addEventListener('click', () => {
  console.log('Delete product clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface PrimaryCriticalButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

function PrimaryCriticalButton({
  label = 'Delete product',
  onClick,
  disabled = false,
  loading = false
}: PrimaryCriticalButtonProps): JSX.Element {
  return (
    <Button
      variant="primary"
      tone="critical"
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}`
  },

  disclosure: {
    react: `import {Button} from '@shopify/polaris';
import {useState} from 'react';

function DisclosureButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Button
      variant="plain"
      disclosure={expanded ? 'up' : 'down'}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      {expanded ? 'Show less' : 'Show more'}
    </Button>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Show more',
  ui: 'plain',
  iconCls: 'arrow-down',
  iconAlign: 'right',
  toggleGroup: 'disclosure',
  enableToggle: true,
  handler: function(btn) {
    const isExpanded = btn.pressed;
    btn.setText(isExpanded ? 'Show less' : 'Show more');
    btn.setIconCls(isExpanded ? 'arrow-up' : 'arrow-down');
    console.log(isExpanded ? 'Expanded' : 'Collapsed');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--plain polaris-button--disclosure" id="disclosure-btn">
  <span class="polaris-button__text">Show more</span>
  <svg class="polaris-button__icon polaris-button__icon--down" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 14l-4-4h8l-4 4z"/>
  </svg>
</button>

<script>
const disclosureBtn = document.getElementById('disclosure-btn');
const btnText = disclosureBtn.querySelector('.polaris-button__text');
const btnIcon = disclosureBtn.querySelector('.polaris-button__icon');
let expanded = false;

disclosureBtn.addEventListener('click', () => {
  expanded = !expanded;

  if (expanded) {
    btnText.textContent = 'Show less';
    btnIcon.classList.remove('polaris-button__icon--down');
    btnIcon.classList.add('polaris-button__icon--up');
    btnIcon.innerHTML = '<path d="M10 6l4 4H6l4-4z"/>';
  } else {
    btnText.textContent = 'Show more';
    btnIcon.classList.remove('polaris-button__icon--up');
    btnIcon.classList.add('polaris-button__icon--down');
    btnIcon.innerHTML = '<path d="M10 14l-4-4h8l-4 4z"/>';
  }

  console.log(expanded ? 'Expanded' : 'Collapsed');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface DisclosureButtonProps {
  initialExpanded?: boolean;
  expandedText?: string;
  collapsedText?: string;
  onToggle?: (expanded: boolean) => void;
}

function DisclosureButton({
  initialExpanded = false,
  expandedText = 'Show less',
  collapsedText = 'Show more',
  onToggle
}: DisclosureButtonProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(initialExpanded);

  const handleToggle = useCallback(() => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);
  }, [expanded, onToggle]);

  return (
    <Button
      variant="plain"
      disclosure={expanded ? 'up' : 'down'}
      onClick={handleToggle}
    >
      {expanded ? expandedText : collapsedText}
    </Button>
  );
}`
  }
};

// Modal Component Examples
export const modalExamples: Record<string, CodeVariant> = {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-modal-backdrop" id="modal-backdrop">
  <div class="polaris-modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
    <div class="polaris-modal__header">
      <h2 id="modal-title" class="polaris-modal__title">
        Reach more shoppers with Instagram product tags
      </h2>
      <button class="polaris-modal__close" aria-label="Close modal">
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <div class="polaris-modal__body">
      <p>
        Use Instagram posts to share your products with millions of
        people. Let shoppers buy from your store without leaving
        Instagram.
      </p>
    </div>
    <div class="polaris-modal__footer">
      <button class="button button--secondary">Learn more</button>
      <button class="button button--primary">Add Instagram</button>
    </div>
  </div>
</div>

<button id="open-modal" class="button">Open</button>


<script>
const modal = document.getElementById('modal-backdrop');
const openBtn = document.getElementById('open-modal');
const closeBtn = document.querySelector('.polaris-modal__close');
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
});
</script>`,
    typescript: `import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ModalAction {
  content: string;
  onAction: () => void;
  destructive?: boolean;
}

interface ModalProps {
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
}: ModalProps): JSX.Element {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <h2 class="polaris-text-body-md">Content inside a card</h2>
</div>
`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card card--subdued">
  <div class="polaris-stack">
    <h3 class="polaris-text-heading-sm">Deactivated staff accounts</h3>
    <ul class="polaris-list">
      <li>Felix Crafford</li>
      <li>Ezequiel Manno</li>
    </ul>
  </div>
</div>
`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <h2 class="polaris-card__title">Online store dashboard</h2>
  <div class="polaris-card__content">
    <p class="polaris-text-body-md">View a summary of your online store's performance.</p>
  </div>
</div>
`,
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
            <Button onClick={() => console.log('[Action] Button clicked')} accessibilityLabel="Fulfill items">
              Fulfill items
            </Button>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={() => console.log('[Action] Button clicked')}
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__content">
    <h2 class="polaris-text-heading-sm">Shipment 1234</h2>
    <div class="items-section">
      <h3 class="polaris-text-heading-sm text-medium">Items</h3>
      <ul class="polaris-list">
        <li>1 × Oasis Glass, 4-Pack</li>
        <li>1 × Anubis Cup, 2-Pack</li>
      </ul>
    </div>
  </div>
  <div class="polaris-card__footer">
    <div class="polaris-button-group button-group--end">
      <button class="polaris-button" aria-label="Fulfill items">
        Fulfill items
      </button>
      <button class="polaris-button button--primary" aria-label="Create shipping label">
        <svg class="polaris-icon" viewBox="0 0 20 20">
          <path d="M10 6v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2z"/>
        </svg>
        Create shipping label
      </button>
    </div>
  </div>
</div>


<script>
document.querySelectorAll('.polaris-button').forEach(button => {
  button.addEventListener('click', () => {
    const label = button.getAttribute('aria-label');
    console.log(label + ' clicked');
  });
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
            onClick={() => console.log('[Action] Button clicked')}
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__header">
    <h2 class="polaris-text-heading-sm">Variants</h2>
    <button class="button button--icon-text" aria-label="Add variant">
      <svg class="polaris-icon" viewBox="0 0 20 20">
        <path d="M10 6v4h4v2h-4v4h-2v-4h-4v-2h4v-4h2z"/>
      </svg>
      Add variant
    </button>
  </div>
  <p class="polaris-card__description">
    Add variants if this product comes in multiple versions, like
    different sizes or colors.
  </p>
</div>


<script>
document.querySelector('.button').addEventListener('click', () => {
  console.log('Add variant clicked');
});
</script>`,
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
            accessibilityLabel={actionText + ' ' + title.toLowerCase()}
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
              accessibilityLabel={'View Sales for ' + sales}
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
              <Button onClick={() => console.log('[Action] Button clicked')} accessibilityLabel="Dismiss">
                Dismiss
              </Button>
              <Button
                variant="primary"
                onClick={() => console.log('[Action] Button clicked')}
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
              accessibilityLabel={'View Sales for ' + sales}
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
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Cancel shipment"
            >
              Cancel shipment
            </Button>
            <Button
              variant="primary"
              onClick={() => console.log('[Action] Button clicked')}
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
              onClick={() => console.log('[Action] Button clicked')}
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
  },
  'with-custom-react-node-title': {
    react: `import React from 'react';
import {
  BlockStack,
  Card,
  Icon,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {ProductIcon} from '@shopify/polaris-icons';

function CardWithCustomReactNodeTitle() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Products
        </Text>
        <BlockStack inlineAlign="start">
          <InlineStack gap="400">
            <Icon source={ProductIcon} />
            <Text as="h3" variant="headingSm">
              New Products
            </Text>
          </InlineStack>
        </BlockStack>
        <List>
          <List.Item>Socks</List.Item>
          <List.Item>Super Shoes</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Products',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'middle'
    },
    items: [{
      xtype: 'component',
      html: '<span class="icon">📦</span>',
      margin: '0 10 0 0'
    }, {
      xtype: 'component',
      html: '<h3 style="margin: 0; font-weight: 600;">New Products</h3>'
    }],
    margin: '0 0 15 0'
  }, {
    xtype: 'component',
    html: '<ul style="margin: 0; padding-left: 20px;"><li>Socks</li><li>Super Shoes</li></ul>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <h2 class="polaris-text polaris-text--variant-heading-sm">Products</h2>
      <div class="polaris-block-stack polaris-block-stack--inline-align-start">
        <div class="polaris-inline-stack polaris-inline-stack--gap-400">
          <span class="polaris-icon">📦</span>
          <h3 class="polaris-text polaris-text--variant-heading-sm">New Products</h3>
        </div>
      </div>
      <ul class="polaris-list">
        <li class="polaris-list__item">Socks</li>
        <li class="polaris-list__item">Super Shoes</li>
      </ul>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-list__item').forEach(item => {
  item.addEventListener('click', (e) => {
    console.log('Product selected: ' + e.target.textContent);
  });
});
</script>`,
    typescript: `import React from 'react';
import {
  BlockStack,
  Card,
  Icon,
  InlineStack,
  List,
  Text,
} from '@shopify/polaris';
import {ProductIcon} from '@shopify/polaris-icons';

interface Product {
  id: string;
  name: string;
}

interface CardWithCustomReactNodeTitleProps {
  title?: string;
  subtitle?: string;
  products?: Product[];
  onProductClick?: (product: Product) => void;
}

function CardWithCustomReactNodeTitle({
  title = "Products",
  subtitle = "New Products",
  products = [
    { id: '1', name: 'Socks' },
    { id: '2', name: 'Super Shoes' }
  ],
  onProductClick
}: CardWithCustomReactNodeTitleProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {title}
        </Text>
        <BlockStack inlineAlign="start">
          <InlineStack gap="400">
            <Icon source={ProductIcon} />
            <Text as="h3" variant="headingSm">
              {subtitle}
            </Text>
          </InlineStack>
        </BlockStack>
        <List>
          {products.map((product) => (
            <List.Item 
              key={product.id}
              onClick={() => onProductClick?.(product)}
            >
              {product.name}
            </List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-flushed-section': {
    react: `import React from 'react';
import {Bleed, Box, Card, Image, Text} from '@shopify/polaris';

function CardWithFlushedSection() {
  return (
    <Card roundedAbove="sm">
      <Bleed marginInline="400" marginBlock="400">
        <Image
          source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
          alt="a sheet with purple and orange stripes"
        />
        <Box background="bg-surface-secondary" padding="400">
          <Text as="p" variant="bodyMd">
            You can use sales reports to see information about your customers'
            orders based on criteria such as sales over time, by channel, or by
            staff.
          </Text>
        </Box>
      </Bleed>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: false,
  bodyPadding: 0,
  layout: 'fit',
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'image',
      src: 'https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg',
      alt: 'a sheet with purple and orange stripes',
      height: 200,
      style: 'object-fit: cover;'
    }, {
      xtype: 'container',
      style: {
        backgroundColor: '#f6f6f7',
        padding: '20px'
      },
      html: '<p style="margin: 0; line-height: 1.5;">You can use sales reports to see information about your customers\' orders based on criteria such as sales over time, by channel, or by staff.</p>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__bleed">
    <img 
      src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" 
      alt="a sheet with purple and orange stripes"
      class="polaris-image polaris-image--full-width"
    />
    <div class="polaris-box polaris-box--bg-surface-secondary polaris-box--padding-400">
      <p class="polaris-text polaris-text--variant-body-md">
        You can use sales reports to see information about your customers'
        orders based on criteria such as sales over time, by channel, or by
        staff.
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelector('.polaris-image').addEventListener('load', (e) => {
  console.log('Image loaded successfully');
});
</script>`,
    typescript: `import React from 'react';
import {Bleed, Box, Card, Image, Text} from '@shopify/polaris';

interface ImageData {
  source: string;
  alt: string;
}

interface CardWithFlushedSectionProps {
  image?: ImageData;
  content?: string;
  onImageLoad?: () => void;
}

function CardWithFlushedSection({
  image = {
    source: "https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg",
    alt: "a sheet with purple and orange stripes"
  },
  content = "You can use sales reports to see information about your customers' orders based on criteria such as sales over time, by channel, or by staff.",
  onImageLoad
}: CardWithFlushedSectionProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <Bleed marginInline="400" marginBlock="400">
        <Image
          source={image.source}
          alt={image.alt}
          onLoad={onImageLoad}
        />
        <Box background="bg-surface-secondary" padding="400">
          <Text as="p" variant="bodyMd">
            {content}
          </Text>
        </Box>
      </Bleed>
    </Card>
  );
}`
  },
  'with-header-icon-actions': {
    react: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

function CardWithHeaderIconActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Variants
          </Text>
          <Button
            onClick={() => console.log('[Action] Button clicked')}
            accessibilityLabel="Export variants"
            icon={ExportIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          Export variants
        </Text>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Variants',
  padding: 20,
  tools: [{
    type: 'save',
    tooltip: 'Export variants',
    handler: function() {
      console.log('Export variants clicked');
    }
  }],
  html: '<p style="margin: 0; line-height: 1.5;">Export variants</p>'
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Variants</h2>
        <button 
          class="polaris-button polaris-button--icon-only" 
          aria-label="Export variants"
          id="export-button"
        >
          <span class="polaris-icon">📤</span>
        </button>
      </div>
      <p class="polaris-text polaris-text--variant-body-md">
        Export variants
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('export-button').addEventListener('click', (e) => {
  console.log('Export variants clicked');
  // Add export functionality here
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {ExportIcon} from '@shopify/polaris-icons';

interface CardWithHeaderIconActionsProps {
  title?: string;
  description?: string;
  exportLabel?: string;
  onExport?: () => void;
  exportIcon?: React.ComponentType;
}

function CardWithHeaderIconActions({
  title = "Variants",
  description = "Export variants",
  exportLabel = "Export variants",
  onExport = () => console.log('Export clicked'),
  exportIcon = ExportIcon
}: CardWithHeaderIconActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <Button
            onClick={onExport}
            accessibilityLabel={exportLabel}
            icon={exportIcon}
          />
        </InlineGrid>
        <Text as="p" variant="bodyMd">
          {description}
        </Text>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-multiple-footer-actions': {
    react: `import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Popover,
  Text,
} from '@shopify/polaris';

function CardWithMultipleFooterActions() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [
    {content: 'Cancel shipment', destructive: true},
    {content: 'Add another shipment', disabled: true},
  ];

  const disclosureButtonActivator = (
    <Button disclosure accessibilityLabel="More" onClick={handleToggleAction}>
      More
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
            {disclosureButton}
            <Button
              variant="primary"
              onClick={() => console.log('[Action] Button clicked')}
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
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Items</h3><ul style="margin: 0; padding-left: 20px;"><li>1 × Oasis Glass, 4-Pack</li><li>1 × Anubis Cup, 2-Pack</li></ul>',
    flex: 1
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    layout: {
      pack: 'end'
    },
    items: [{
      text: 'More',
      menu: [{
        text: 'Cancel shipment',
        iconCls: 'delete',
        handler: function() {
          console.log('Cancel shipment clicked');
        }
      }, {
        text: 'Add another shipment',
        disabled: true
      }]
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
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <h2 class="polaris-text polaris-text--variant-heading-sm">Shipment 1234</h2>
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">Items</h3>
        <ul class="polaris-list">
          <li class="polaris-list__item">1 × Oasis Glass, 4-Pack</li>
          <li class="polaris-list__item">1 × Anubis Cup, 2-Pack</li>
        </ul>
      </div>
      <div class="polaris-inline-stack polaris-inline-stack--align-end">
        <div class="polaris-button-group">
          <div class="polaris-popover-wrapper">
            <button class="polaris-button polaris-button--disclosure" id="more-button">
              More
            </button>
            <div class="polaris-popover polaris-popover--hidden" id="more-popover">
              <ul class="polaris-action-list">
                <li class="polaris-action-list__item polaris-action-list__item--destructive">
                  <button class="polaris-action-list__button">Cancel shipment</button>
                </li>
                <li class="polaris-action-list__item polaris-action-list__item--disabled">
                  <button class="polaris-action-list__button" disabled>Add another shipment</button>
                </li>
              </ul>
            </div>
          </div>
          <button class="polaris-button polaris-button--primary" id="tracking-button">
            Add tracking number
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const moreButton = document.getElementById('more-button');
const morePopover = document.getElementById('more-popover');
const trackingButton = document.getElementById('tracking-button');

moreButton.addEventListener('click', (e) => {
  morePopover.classList.toggle('polaris-popover--hidden');
});

trackingButton.addEventListener('click', (e) => {
  console.log('Add tracking number clicked');
});

document.querySelectorAll('.polaris-action-list__button').forEach(button => {
  button.addEventListener('click', (e) => {
    if (!e.target.disabled) {
      console.log('Action clicked: ' + e.target.textContent);
      morePopover.classList.add('polaris-popover--hidden');
    }
  });
});
</script>`,
    typescript: `import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineStack,
  List,
  Popover,
  Text,
} from '@shopify/polaris';

interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
}

interface ActionItem {
  content: string;
  destructive?: boolean;
  disabled?: boolean;
  onAction?: () => void;
}

interface CardWithMultipleFooterActionsProps {
  shipmentId?: string;
  items?: ShipmentItem[];
  actions?: ActionItem[];
  onPrimaryAction?: () => void;
  primaryActionText?: string;
}

function CardWithMultipleFooterActions({
  shipmentId = "1234",
  items = [
    { id: '1', name: 'Oasis Glass, 4-Pack', quantity: 1 },
    { id: '2', name: 'Anubis Cup, 2-Pack', quantity: 1 }
  ],
  actions = [
    { content: 'Cancel shipment', destructive: true },
    { content: 'Add another shipment', disabled: true }
  ],
  onPrimaryAction = () => console.log('Add tracking number clicked'),
  primaryActionText = "Add tracking number"
}: CardWithMultipleFooterActionsProps): JSX.Element {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const disclosureButtonActivator = (
    <Button disclosure accessibilityLabel="More actions" onClick={handleToggleAction}>
      More
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList items={actions} />
    </Popover>
  );

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
            {disclosureButton}
            <Button
              variant="primary"
              onClick={onPrimaryAction}
              accessibilityLabel={primaryActionText}
            >
              {primaryActionText}
            </Button>
          </ButtonGroup>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-multiple-sections': {
    react: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

function CardWithMultipleSections() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlock="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store's performance.
        </Text>
      </Box>
      <Box paddingBlockStart="200">
        <Text as="p" variant="bodyMd">
          View a summary of your online store's performance, including sales,
          visitors, top products, and referrals.
        </Text>
      </Box>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; padding: 10px 0; line-height: 1.5;">View a summary of your online store\\'s performance.</p>',
    style: {
      borderBottom: '1px solid #e1e1e1'
    }
  }, {
    xtype: 'component',
    html: '<p style="margin: 0; padding: 10px 0; line-height: 1.5;">View a summary of your online store\\'s performance, including sales, visitors, top products, and referrals.</p>',
    margin: '10 0 0 0'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <h2 class="polaris-text polaris-text--variant-heading-sm">
      Online store dashboard
    </h2>
    <div class="polaris-box polaris-box--padding-block-200">
      <p class="polaris-text polaris-text--variant-body-md">
        View a summary of your online store's performance.
      </p>
    </div>
    <div class="polaris-box polaris-box--padding-block-start-200">
      <p class="polaris-text polaris-text--variant-body-md">
        View a summary of your online store's performance, including sales,
        visitors, top products, and referrals.
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-box').forEach(section => {
  section.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = '#f6f6f7';
  });
  section.addEventListener('mouseleave', (e) => {
    e.target.style.backgroundColor = '';
  });
});
</script>`,
    typescript: `import React from 'react';
import {Box, Card, Text} from '@shopify/polaris';

interface Section {
  id: string;
  content: string;
}

interface CardWithMultipleSectionsProps {
  title?: string;
  sections?: Section[];
  onSectionClick?: (section: Section) => void;
}

function CardWithMultipleSections({
  title = "Online store dashboard",
  sections = [
    { id: '1', content: "View a summary of your online store's performance." },
    { id: '2', content: "View a summary of your online store's performance, including sales, visitors, top products, and referrals." }
  ],
  onSectionClick
}: CardWithMultipleSectionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        {title}
      </Text>
      {sections.map((section, index) => (
        <Box 
          key={section.id}
          paddingBlock={index === 0 ? "200" : undefined}
          paddingBlockStart={index > 0 ? "200" : undefined}
          onClick={() => onSectionClick?.(section)}
        >
          <Text as="p" variant="bodyMd">
            {section.content}
          </Text>
        </Box>
      ))}
    </Card>
  );
}`
  },
  'with-multiple-titled-sections': {
    react: `import React from 'react';
import {BlockStack, Box, Card, Text} from '@shopify/polaris';

function CardWithMultipleTitledSections() {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        Online store dashboard
      </Text>
      <Box paddingBlock="200">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Reports
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store's performance.
          </Text>
        </BlockStack>
      </Box>
      <Box paddingBlockStart="200">
        <BlockStack gap="200">
          <Text as="h3" variant="headingSm" fontWeight="medium">
            Summary
          </Text>
          <Text as="p" variant="bodyMd">
            View a summary of your online store's performance, including sales,
            visitors, top products, and referrals.
          </Text>
        </BlockStack>
      </Box>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    padding: '10 0',
    style: {
      borderBottom: '1px solid #e1e1e1'
    },
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Reports</h3>'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; line-height: 1.5;">View a summary of your online store\\'s performance.</p>'
    }]
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    padding: '10 0 0 0',
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Summary</h3>'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; line-height: 1.5;">View a summary of your online store\\'s performance, including sales, visitors, top products, and referrals.</p>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <h2 class="polaris-text polaris-text--variant-heading-sm">
      Online store dashboard
    </h2>
    <div class="polaris-box polaris-box--padding-block-200">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
          Reports
        </h3>
        <p class="polaris-text polaris-text--variant-body-md">
          View a summary of your online store's performance.
        </p>
      </div>
    </div>
    <div class="polaris-box polaris-box--padding-block-start-200">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
          Summary
        </h3>
        <p class="polaris-text polaris-text--variant-body-md">
          View a summary of your online store's performance, including sales,
          visitors, top products, and referrals.
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-block-stack').forEach(section => {
  section.addEventListener('click', (e) => {
    const title = section.querySelector('h3').textContent;
    console.log('Section clicked: ' + title);
  });
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Box, Card, Text} from '@shopify/polaris';

interface TitledSection {
  id: string;
  title: string;
  content: string;
}

interface CardWithMultipleTitledSectionsProps {
  title?: string;
  sections?: TitledSection[];
  onSectionClick?: (section: TitledSection) => void;
}

function CardWithMultipleTitledSections({
  title = "Online store dashboard",
  sections = [
    { 
      id: '1', 
      title: "Reports", 
      content: "View a summary of your online store's performance." 
    },
    { 
      id: '2', 
      title: "Summary", 
      content: "View a summary of your online store's performance, including sales, visitors, top products, and referrals." 
    }
  ],
  onSectionClick
}: CardWithMultipleTitledSectionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <Text as="h2" variant="headingSm">
        {title}
      </Text>
      {sections.map((section, index) => (
        <Box 
          key={section.id}
          paddingBlock={index === 0 ? "200" : undefined}
          paddingBlockStart={index > 0 ? "200" : undefined}
          onClick={() => onSectionClick?.(section)}
        >
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              {section.title}
            </Text>
            <Text as="p" variant="bodyMd">
              {section.content}
            </Text>
          </BlockStack>
        </Box>
      ))}
    </Card>
  );
}`
  },
  'with-responsive-border-radius': {
    react: `import {Card, Text} from '@shopify/polaris';
import React from 'react';

function CardWithResponsiveBorderRadius() {
  return (
    <Card roundedAbove="md" background="bg-surface-secondary">
      <Text as="h2" variant="bodyMd">
        Content inside a card
      </Text>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  cls: 'card-responsive-radius',
  style: {
    backgroundColor: '#f6f6f7',
    borderRadius: '8px'
  },
  bodyStyle: {
    backgroundColor: 'transparent'
  },
  border: false,
  padding: 20,
  html: '<h2 style="margin: 0; font-size: 14px; font-weight: normal;">Content inside a card</h2>',
  listeners: {
    afterrender: function(panel) {
      // Responsive border radius based on viewport
      const updateRadius = () => {
        const radius = window.innerWidth >= 768 ? '8px' : '4px';
        panel.getEl().setStyle('border-radius', radius);
      };
      updateRadius();
      window.addEventListener('resize', updateRadius);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded-above-md polaris-card--bg-surface-secondary">
  <div class="polaris-card__content">
    <h2 class="polaris-text polaris-text--variant-body-md">
      Content inside a card
    </h2>
  </div>
</div>

<script>
// JavaScript behavior for responsive border radius
function updateCardRadius() {
  const cards = document.querySelectorAll('.polaris-card--rounded-above-md');
  cards.forEach(card => {
    if (window.innerWidth >= 768) {
      card.style.borderRadius = '8px';
    } else {
      card.style.borderRadius = '4px';
    }
  });
}

// Apply on load and resize
updateCardRadius();
window.addEventListener('resize', updateCardRadius);
</script>`,
    typescript: `import {Card, Text} from '@shopify/polaris';
import React from 'react';

type ResponsiveSize = 'sm' | 'md' | 'lg' | 'xl';
type BackgroundVariant = 'bg-surface' | 'bg-surface-secondary' | 'bg-surface-tertiary';

interface CardWithResponsiveBorderRadiusProps {
  roundedAbove?: ResponsiveSize;
  background?: BackgroundVariant;
  content?: string;
  variant?: 'bodyMd' | 'headingSm' | 'headingMd';
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

function CardWithResponsiveBorderRadius({
  roundedAbove = "md",
  background = "bg-surface-secondary",
  content = "Content inside a card",
  variant = "bodyMd",
  as = "h2"
}: CardWithResponsiveBorderRadiusProps): JSX.Element {
  return (
    <Card roundedAbove={roundedAbove} background={background}>
      <Text as={as} variant={variant}>
        {content}
      </Text>
    </Card>
  );
}`
  },
  'with-sections-and-actions': {
    react: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';

function CardWithSectionsAndActions() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Contact Information
            </Text>
            <Button
              icon={EditIcon}
              variant="tertiary"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Edit"
            />
          </InlineGrid>
          <Text as="p" variant="bodyMd">
            john.smith@example.com
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customer',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">John Smith</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox',
        pack: 'justify',
        align: 'middle'
      },
      items: [{
        xtype: 'component',
        html: '<h3 style="margin: 0; font-weight: 600; font-size: 14px;">Contact Information</h3>'
      }, {
        xtype: 'button',
        text: 'Edit',
        iconCls: 'edit',
        ui: 'tertiary',
        handler: function() {
          console.log('Edit contact information');
        }
      }],
      margin: '0 0 10 0'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">john.smith@example.com</p>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-400">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Customer</h2>
        <p class="polaris-text polaris-text--variant-body-md">John Smith</p>
      </div>
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Contact Information
          </h3>
          <button 
            class="polaris-button polaris-button--tertiary polaris-button--icon-only" 
            aria-label="Edit"
            id="edit-contact-button"
          >
            <span class="polaris-icon">✏️</span>
          </button>
        </div>
        <p class="polaris-text polaris-text--variant-body-md">
          john.smith@example.com
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('edit-contact-button').addEventListener('click', (e) => {
  console.log('Edit contact information clicked');
  // Add edit functionality here
});

// Make email clickable
document.querySelectorAll('.polaris-text').forEach(text => {
  if (text.textContent.includes('@')) {
    text.style.cursor = 'pointer';
    text.addEventListener('click', (e) => {
      window.location.href = 'mailto:' + e.target.textContent;
    });
  }
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Button, Card, InlineGrid, Text} from '@shopify/polaris';
import {EditIcon} from '@shopify/polaris-icons';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  editable?: boolean;
}

interface CardWithSectionsAndActionsProps {
  customer?: Customer;
  sections?: Section[];
  onEdit?: (sectionId: string) => void;
  onCustomerClick?: (customer: Customer) => void;
}

function CardWithSectionsAndActions({
  customer = { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  sections = [
    { id: 'contact', title: 'Contact Information', content: 'john.smith@example.com', editable: true }
  ],
  onEdit,
  onCustomerClick
}: CardWithSectionsAndActionsProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text 
            as="p" 
            variant="bodyMd"
            onClick={() => onCustomerClick?.(customer)}
          >
            {customer.name}
          </Text>
        </BlockStack>
        {sections.map((section) => (
          <BlockStack key={section.id} gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {section.title}
              </Text>
              {section.editable && (
                <Button
                  icon={EditIcon}
                  variant="tertiary"
                  onClick={() => onEdit?.(section.id)}
                  accessibilityLabel={'Edit ' + section.title}
                />
              )}
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              {section.content}
            </Text>
          </BlockStack>
        ))}
      </BlockStack>
    </Card>
  );
}`
  },
  'with-sections-and-critical-action': {
    react: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
} from '@shopify/polaris';
import {DeleteIcon, EditIcon} from '@shopify/polaris-icons';

function CardWithSectionsAndCriticalAction() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <InlineGrid columns="1fr auto">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Contact Information
            </Text>
            <ButtonGroup>
              <Button
                icon={DeleteIcon}
                variant="tertiary"
                tone="critical"
                onClick={() => console.log('[Action] Button clicked')}
                accessibilityLabel="Delete"
              />
              <Button
                icon={EditIcon}
                variant="tertiary"
                onClick={() => console.log('[Action] Button clicked')}
                accessibilityLabel="Edit"
              />
            </ButtonGroup>
          </InlineGrid>
          <Text as="p" variant="bodyMd">
            john.smith@example.com
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customer',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">John Smith</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox',
        pack: 'justify',
        align: 'middle'
      },
      items: [{
        xtype: 'component',
        html: '<h3 style="margin: 0; font-weight: 600; font-size: 14px;">Contact Information</h3>'
      }, {
        xtype: 'container',
        layout: {
          type: 'hbox'
        },
        items: [{
          xtype: 'button',
          text: 'Delete',
          iconCls: 'delete',
          ui: 'critical',
          handler: function() {
            console.log('Delete contact information');
          }
        }, {
          xtype: 'button',
          text: 'Edit',
          iconCls: 'edit',
          ui: 'tertiary',
          handler: function() {
            console.log('Edit contact information');
          }
        }]
      }],
      margin: '0 0 10 0'
    }, {
      xtype: 'component',
      html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">john.smith@example.com</p>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-400">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Customer</h2>
        <p class="polaris-text polaris-text--variant-body-md">John Smith</p>
      </div>
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Contact Information
          </h3>
          <div class="polaris-button-group">
            <button 
              class="polaris-button polaris-button--tertiary polaris-button--critical polaris-button--icon-only" 
              aria-label="Delete"
              id="delete-contact-button"
            >
              <span class="polaris-icon">🗑️</span>
            </button>
            <button 
              class="polaris-button polaris-button--tertiary polaris-button--icon-only" 
              aria-label="Edit"
              id="edit-contact-button"
            >
              <span class="polaris-icon">✏️</span>
            </button>
          </div>
        </div>
        <p class="polaris-text polaris-text--variant-body-md">
          john.smith@example.com
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.getElementById('delete-contact-button').addEventListener('click', (e) => {
  if (confirm('Are you sure you want to delete this contact information?')) {
    console.log('Delete contact information confirmed');
    // Add delete functionality here
  }
});

document.getElementById('edit-contact-button').addEventListener('click', (e) => {
  console.log('Edit contact information clicked');
  // Add edit functionality here
});

// Make email clickable
document.querySelectorAll('.polaris-text').forEach(text => {
  if (text.textContent.includes('@')) {
    text.style.cursor = 'pointer';
    text.addEventListener('click', (e) => {
      window.location.href = 'mailto:' + e.target.textContent;
    });
  }
});
</script>`,
    typescript: `import React from 'react';
import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  Text,
} from '@shopify/polaris';
import {DeleteIcon, EditIcon} from '@shopify/polaris-icons';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Section {
  id: string;
  title: string;
  content: string;
  editable?: boolean;
  deletable?: boolean;
}

interface CardWithSectionsAndCriticalActionProps {
  customer?: Customer;
  sections?: Section[];
  onEdit?: (sectionId: string) => void;
  onDelete?: (sectionId: string) => void;
  onCustomerClick?: (customer: Customer) => void;
}

function CardWithSectionsAndCriticalAction({
  customer = { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  sections = [
    { 
      id: 'contact', 
      title: 'Contact Information', 
      content: 'john.smith@example.com', 
      editable: true,
      deletable: true 
    }
  ],
  onEdit,
  onDelete,
  onCustomerClick
}: CardWithSectionsAndCriticalActionProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text 
            as="p" 
            variant="bodyMd"
            onClick={() => onCustomerClick?.(customer)}
          >
            {customer.name}
          </Text>
        </BlockStack>
        {sections.map((section) => (
          <BlockStack key={section.id} gap="200">
            <InlineGrid columns="1fr auto">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {section.title}
              </Text>
              <ButtonGroup>
                {section.deletable && (
                  <Button
                    icon={DeleteIcon}
                    variant="tertiary"
                    tone="critical"
                    onClick={() => onDelete?.(section.id)}
                    accessibilityLabel={'Delete ' + section.title}
                  />
                )}
                {section.editable && (
                  <Button
                    icon={EditIcon}
                    variant="tertiary"
                    onClick={() => onEdit?.(section.id)}
                    accessibilityLabel={'Edit ' + section.title}
                  />
                )}
              </ButtonGroup>
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              {section.content}
            </Text>
          </BlockStack>
        ))}
      </BlockStack>
    </Card>
  );
}`
  },
  'with-separate-header': {
    react: `import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  List,
  Popover,
  Text,
} from '@shopify/polaris';

function CardWithSeparateHeader() {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const items = [{content: 'Member'}, {content: 'Admin'}];

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      Add account
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

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            Staff accounts
          </Text>
          <ButtonGroup>
            <Button
              variant="plain"
              onClick={() => console.log('[Action] Button clicked')}
              accessibilityLabel="Preview"
            >
              Preview
            </Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <List>
          <List.Item>Felix Crafford</List.Item>
          <List.Item>Ezequiel Manno</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Staff accounts',
  padding: 20,
  tools: [{
    type: 'gear',
    tooltip: 'Preview',
    handler: function() {
      console.log('Preview clicked');
    }
  }],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    layout: {
      pack: 'end'
    },
    items: [{
      text: 'Preview',
      ui: 'plain',
      handler: function() {
        console.log('Preview clicked');
      }
    }, {
      text: 'Add account',
      ui: 'plain',
      menu: [{
        text: 'Member',
        handler: function() {
          console.log('Add Member clicked');
        }
      }, {
        text: 'Admin',
        handler: function() {
          console.log('Add Admin clicked');
        }
      }]
    }]
  }],
  items: [{
    xtype: 'component',
    html: '<ul style="margin: 0; padding-left: 20px; list-style: disc;"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <div class="polaris-inline-grid polaris-inline-grid--columns-1fr-auto">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Staff accounts</h2>
        <div class="polaris-button-group">
          <button class="polaris-button polaris-button--plain" id="preview-button">
            Preview
          </button>
          <div class="polaris-popover-wrapper">
            <button class="polaris-button polaris-button--plain polaris-button--disclosure" id="add-account-button">
              Add account
            </button>
            <div class="polaris-popover polaris-popover--hidden" id="add-account-popover">
              <ul class="polaris-action-list">
                <li class="polaris-action-list__item">
                  <button class="polaris-action-list__button" data-role="Member">Member</button>
                </li>
                <li class="polaris-action-list__item">
                  <button class="polaris-action-list__button" data-role="Admin">Admin</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul class="polaris-list">
        <li class="polaris-list__item">Felix Crafford</li>
        <li class="polaris-list__item">Ezequiel Manno</li>
      </ul>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const previewButton = document.getElementById('preview-button');
const addAccountButton = document.getElementById('add-account-button');
const addAccountPopover = document.getElementById('add-account-popover');

previewButton.addEventListener('click', (e) => {
  console.log('Preview clicked');
});

addAccountButton.addEventListener('click', (e) => {
  addAccountPopover.classList.toggle('polaris-popover--hidden');
});

document.querySelectorAll('.polaris-action-list__button').forEach(button => {
  button.addEventListener('click', (e) => {
    const role = e.target.dataset.role;
    console.log('Add ' + role + ' clicked');
    addAccountPopover.classList.add('polaris-popover--hidden');
  });
});

// Close popover when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.polaris-popover-wrapper')) {
    addAccountPopover.classList.add('polaris-popover--hidden');
  }
});
</script>`,
    typescript: `import React, {useState} from 'react';
import {
  ActionList,
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  InlineGrid,
  List,
  Popover,
  Text,
} from '@shopify/polaris';

interface StaffMember {
  id: string;
  name: string;
  role: 'Member' | 'Admin';
}

interface ActionItem {
  content: string;
  onAction?: () => void;
}

interface CardWithSeparateHeaderProps {
  title?: string;
  staffMembers?: StaffMember[];
  actions?: ActionItem[];
  onPreview?: () => void;
  onAddAccount?: (role: 'Member' | 'Admin') => void;
  onStaffClick?: (staff: StaffMember) => void;
}

function CardWithSeparateHeader({
  title = "Staff accounts",
  staffMembers = [
    { id: '1', name: 'Felix Crafford', role: 'Admin' },
    { id: '2', name: 'Ezequiel Manno', role: 'Member' }
  ],
  actions = [
    { content: 'Member' },
    { content: 'Admin' }
  ],
  onPreview = () => console.log('Preview clicked'),
  onAddAccount = (role) => console.log('Add ' + role + ' clicked'),
  onStaffClick
}: CardWithSeparateHeaderProps): JSX.Element {
  const [actionActive, toggleAction] = useState(false);

  const handleToggleAction = () => {
    toggleAction(!actionActive);
  };

  const handleActionSelect = (item: ActionItem) => {
    onAddAccount?.(item.content as 'Member' | 'Admin');
    item.onAction?.();
  };

  const disclosureButtonActivator = (
    <Button variant="plain" disclosure onClick={handleToggleAction}>
      Add account
    </Button>
  );

  const disclosureButton = (
    <Popover
      active={actionActive}
      activator={disclosureButtonActivator}
      onClose={handleToggleAction}
    >
      <ActionList 
        items={actions.map(item => ({
          ...item,
          onAction: () => handleActionSelect(item)
        }))} 
      />
    </Popover>
  );

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <InlineGrid columns="1fr auto">
          <Text as="h2" variant="headingSm">
            {title}
          </Text>
          <ButtonGroup>
            <Button
              variant="plain"
              onClick={onPreview}
              accessibilityLabel="Preview staff accounts"
            >
              Preview
            </Button>
            {disclosureButton}
          </ButtonGroup>
        </InlineGrid>
        <List>
          {staffMembers.map((staff) => (
            <List.Item 
              key={staff.id}
              onClick={() => onStaffClick?.(staff)}
            >
              {staff.name}
            </List.Item>
          ))}
        </List>
      </BlockStack>
    </Card>
  );
}`
  },
  'with-subdued-section': {
    react: `import React from 'react';
import {Bleed, BlockStack, Box, Card, List, Text} from '@shopify/polaris';

function CardWithSubduedSection() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Staff accounts
        </Text>
        <Box paddingBlockEnd="200">
          <List>
            <List.Item>Felix Crafford</List.Item>
            <List.Item>Ezequiel Manno</List.Item>
          </List>
        </Box>
      </BlockStack>
      <Bleed marginBlockEnd="400" marginInline="400">
        <Box background="bg-surface-secondary" padding="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Deactivated staff accounts
            </Text>
            <List>
              <List.Item>Felix Crafford</List.Item>
              <List.Item>Ezequiel Manno</List.Item>
            </List>
          </BlockStack>
        </Box>
      </Bleed>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Staff accounts',
  padding: '20 20 0 20',
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<ul style="margin: 0; padding-left: 20px; list-style: disc;"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    style: {
      backgroundColor: '#f6f6f7',
      margin: '0 -20px -20px -20px',
      padding: '20px'
    },
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Deactivated staff accounts</h3>'
    }, {
      xtype: 'component',
      html: '<ul style="margin: 0; padding-left: 20px; list-style: disc;"><li>Felix Crafford</li><li>Ezequiel Manno</li></ul>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-200">
      <h2 class="polaris-text polaris-text--variant-heading-sm">Staff accounts</h2>
      <div class="polaris-box polaris-box--padding-block-end-200">
        <ul class="polaris-list">
          <li class="polaris-list__item">Felix Crafford</li>
          <li class="polaris-list__item">Ezequiel Manno</li>
        </ul>
      </div>
    </div>
    <div class="polaris-bleed polaris-bleed--margin-block-end-400 polaris-bleed--margin-inline-400">
      <div class="polaris-box polaris-box--bg-surface-secondary polaris-box--padding-400">
        <div class="polaris-block-stack polaris-block-stack--gap-200">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Deactivated staff accounts
          </h3>
          <ul class="polaris-list">
            <li class="polaris-list__item">Felix Crafford</li>
            <li class="polaris-list__item">Ezequiel Manno</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-list__item').forEach(item => {
  item.addEventListener('click', (e) => {
    const isDeactivated = e.target.closest('.polaris-box--bg-surface-secondary') !== null;
    const status = isDeactivated ? 'deactivated' : 'active';
    console.log(status + ' staff member clicked: ' + e.target.textContent);
  });
});
</script>`,
    typescript: `import React from 'react';
import {Bleed, BlockStack, Box, Card, List, Text} from '@shopify/polaris';

interface StaffMember {
  id: string;
  name: string;
  active: boolean;
}

interface CardWithSubduedSectionProps {
  title?: string;
  staffMembers?: StaffMember[];
  deactivatedTitle?: string;
  onStaffClick?: (staff: StaffMember) => void;
}

function CardWithSubduedSection({
  title = "Staff accounts",
  staffMembers = [
    { id: '1', name: 'Felix Crafford', active: true },
    { id: '2', name: 'Ezequiel Manno', active: true },
    { id: '3', name: 'Felix Crafford', active: false },
    { id: '4', name: 'Ezequiel Manno', active: false }
  ],
  deactivatedTitle = "Deactivated staff accounts",
  onStaffClick
}: CardWithSubduedSectionProps): JSX.Element {
  const activeStaff = staffMembers.filter(staff => staff.active);
  const deactivatedStaff = staffMembers.filter(staff => !staff.active);

  return (
    <Card roundedAbove="sm">
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          {title}
        </Text>
        <Box paddingBlockEnd="200">
          <List>
            {activeStaff.map((staff) => (
              <List.Item 
                key={staff.id}
                onClick={() => onStaffClick?.(staff)}
              >
                {staff.name}
              </List.Item>
            ))}
          </List>
        </Box>
      </BlockStack>
      {deactivatedStaff.length > 0 && (
        <Bleed marginBlockEnd="400" marginInline="400">
          <Box background="bg-surface-secondary" padding="400">
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                {deactivatedTitle}
              </Text>
              <List>
                {deactivatedStaff.map((staff) => (
                  <List.Item 
                    key={staff.id}
                    onClick={() => onStaffClick?.(staff)}
                  >
                    {staff.name}
                  </List.Item>
                ))}
              </List>
            </BlockStack>
          </Box>
        </Bleed>
      )}
    </Card>
  );
}`
  },
  'with-subsection': {
    react: `import React from 'react';
import {BlockStack, Card, Text} from '@shopify/polaris';

function CardWithSubsection() {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text as="p" variant="bodyMd">
            John Smith
          </Text>
        </BlockStack>
        <div>
          <BlockStack gap="200">
            <Text as="h3" variant="headingSm" fontWeight="medium">
              Addresses
            </Text>
            <div>
              <Text as="p" variant="bodyMd">
                123 First St
              </Text>
              <Text as="p" variant="bodyMd">
                Somewhere
              </Text>
              <Text as="p" variant="bodyMd">
                The Universe
              </Text>
            </div>
            <div>
              <Text as="p" variant="bodyMd">
                123 Second St
              </Text>
              <Text as="p" variant="bodyMd">
                Somewhere
              </Text>
              <Text as="p" variant="bodyMd">
                The Universe
              </Text>
            </div>
          </BlockStack>
        </div>
        <div>
          <Text as="p" variant="bodyMd">
            A single subsection without a sibling has no visual appearance
          </Text>
        </div>
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Customer',
  padding: 20,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: '<p style="margin: 0; font-size: 14px; line-height: 1.5;">John Smith</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'component',
      html: '<h3 style="margin: 0 0 10px 0; font-weight: 600;">Addresses</h3>'
    }, {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      style: {
        borderBottom: '1px solid #e1e1e1',
        paddingBottom: '10px',
        marginBottom: '10px'
      },
      items: [{
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">123 First St</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">Somewhere</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">The Universe</p>'
      }]
    }, {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [{
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">123 Second St</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">Somewhere</p>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0; line-height: 1.5;">The Universe</p>'
      }]
    }],
    margin: '0 0 20 0'
  }, {
    xtype: 'component',
    html: '<p style="margin: 0; line-height: 1.5; font-style: italic;">A single subsection without a sibling has no visual appearance</p>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card polaris-card--rounded">
  <div class="polaris-card__content">
    <div class="polaris-block-stack polaris-block-stack--gap-400">
      <div class="polaris-block-stack polaris-block-stack--gap-200">
        <h2 class="polaris-text polaris-text--variant-heading-sm">Customer</h2>
        <p class="polaris-text polaris-text--variant-body-md">John Smith</p>
      </div>
      <div class="polaris-subsection">
        <div class="polaris-block-stack polaris-block-stack--gap-200">
          <h3 class="polaris-text polaris-text--variant-heading-sm polaris-text--font-weight-medium">
            Addresses
          </h3>
          <div class="polaris-address-block">
            <p class="polaris-text polaris-text--variant-body-md">123 First St</p>
            <p class="polaris-text polaris-text--variant-body-md">Somewhere</p>
            <p class="polaris-text polaris-text--variant-body-md">The Universe</p>
          </div>
          <div class="polaris-address-block">
            <p class="polaris-text polaris-text--variant-body-md">123 Second St</p>
            <p class="polaris-text polaris-text--variant-body-md">Somewhere</p>
            <p class="polaris-text polaris-text--variant-body-md">The Universe</p>
          </div>
        </div>
      </div>
      <div class="polaris-single-subsection">
        <p class="polaris-text polaris-text--variant-body-md">
          A single subsection without a sibling has no visual appearance
        </p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-address-block').forEach((block, index) => {
  block.addEventListener('click', (e) => {
    console.log('Address ' + (index + 1) + ' clicked');
  });
  
  // Add visual feedback
  block.style.cursor = 'pointer';
  block.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = '#f6f6f7';
  });
  block.addEventListener('mouseleave', (e) => {
    e.target.style.backgroundColor = '';
  });
});
</script>`,
    typescript: `import React from 'react';
import {BlockStack, Card, Text} from '@shopify/polaris';

interface Address {
  id: string;
  street: string;
  city: string;
  country: string;
}

interface Customer {
  id: string;
  name: string;
}

interface CardWithSubsectionProps {
  customer?: Customer;
  addresses?: Address[];
  note?: string;
  onCustomerClick?: (customer: Customer) => void;
  onAddressClick?: (address: Address) => void;
}

function CardWithSubsection({
  customer = { id: '1', name: 'John Smith' },
  addresses = [
    { id: '1', street: '123 First St', city: 'Somewhere', country: 'The Universe' },
    { id: '2', street: '123 Second St', city: 'Somewhere', country: 'The Universe' }
  ],
  note = "A single subsection without a sibling has no visual appearance",
  onCustomerClick,
  onAddressClick
}: CardWithSubsectionProps): JSX.Element {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="400">
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Customer
          </Text>
          <Text 
            as="p" 
            variant="bodyMd"
            onClick={() => onCustomerClick?.(customer)}
          >
            {customer.name}
          </Text>
        </BlockStack>
        {addresses.length > 0 && (
          <div>
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm" fontWeight="medium">
                Addresses
              </Text>
              {addresses.map((address) => (
                <div 
                  key={address.id}
                  onClick={() => onAddressClick?.(address)}
                  style={{ cursor: 'pointer' }}
                >
                  <Text as="p" variant="bodyMd">
                    {address.street}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {address.city}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    {address.country}
                  </Text>
                </div>
              ))}
            </BlockStack>
          </div>
        )}
        <div>
          <Text as="p" variant="bodyMd">
            {note}
          </Text>
        </div>
      </BlockStack>
    </Card>
  );
}`
  }
};

// Placeholder for other components (to be added)
// Banner Component Examples
export const bannerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerExample() {
  return (
    <Banner title="Order archived" onDismiss={() => console.log('[Dismiss] Component dismissed')}>
      <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
    </Banner>
  );
}

export default BannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M10 6v4M10 14h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">Order archived</h3>
    <p class="polaris-banner__message">This order was archived on March 7, 2017 at 3:12pm EDT.</p>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>


<script>
document.querySelector('.polaris-banner__dismiss').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

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

    typescript: `import {Banner} from '@shopify/polaris';
import React, {useState} from 'react';

interface BannerProps {
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
}: BannerProps): JSX.Element | null {
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
}

export default BannerExample;`
  },

  critical: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function CriticalBannerExample() {
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
}

export default CriticalBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner banner--critical" role="alert">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 12a1 1 0 102 0v-4a1 1 0 10-2 0v4zm1-7a1 1 0 110 2 1 1 0 010-2z" fill="currentColor"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <h3 class="polaris-banner__title">High risk of fraud detected</h3>
    <p class="polaris-banner__message">
      Before fulfilling this order or capturing payment, please
      <a href="#" class="polaris-banner__link">review the Risk Analysis</a>
      and determine if this order is fraudulent.
    </p>
    <button class="polaris-banner__action">Review risk analysis</button>
  </div>
</div>


<script>
document.querySelector('.polaris-banner__action').addEventListener('click', () => {
  console.log('Review risk analysis clicked');
  window.location.href = '#risk-analysis';
});
</script>`,

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
}

export default CriticalBanner;`
  },

  success: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function SuccessBannerExample() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      tone="success"
      action={{content: 'Print label'}}
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    />
  );
}

export default SuccessBannerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-banner banner--success" role="status" aria-live="polite">
  <div class="polaris-banner__icon">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
    </svg>
  </div>
  <div class="polaris-banner__content">
    <div class="polaris-banner__header">
      <h3 class="polaris-banner__title">Your shipping label is ready to print.</h3>
      <button class="polaris-banner__action">Print label</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>


<script>
document.querySelector('.polaris-banner__action').addEventListener('click', () => {
  console.log('Print label clicked');
  window.print();
});

document.querySelector('.polaris-banner__dismiss').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

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
}

export default SuccessBanner;`
  },

  warning: {
    react: `import {Banner, List} from '@shopify/polaris';
import React from 'react';

function WarningBannerExample() {
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
}

export default WarningBannerExample;`,

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
}

export default WarningBanner;`
  },

  informational: {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function InformationalBannerExample() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      tone="info"
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}

export default InformationalBannerExample;`,

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
}

export default InformationalBanner;`
  },

  dismissible: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function DismissibleBannerExample() {
  return (
    <Banner onDismiss={() => console.log('[Dismiss] Component dismissed')}>
      <p>
        Use your finance report to get detailed information about your business.{' '}
        <Link url="">Let us know what you think</Link>
      </p>
    </Banner>
  );
}

export default DismissibleBannerExample;`,

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
}

export default DismissibleBanner;`
  },

  'with-actions': {
    react: `import {Banner} from '@shopify/polaris';
import React from 'react';

function BannerWithActionsExample() {
  return (
    <Banner
      title="USPS has updated their rates"
      action={{content: 'Update rates', url: ''}}
      secondaryAction={{content: 'Learn more'}}
      tone="info"
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
    >
      <p>Make sure you know how these changes affect your store.</p>
    </Banner>
  );
}

export default BannerWithActionsExample;`,

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
      <button class="polaris-button" id="update-rates-action">Update rates</button>
      <button class="polaris-button polaris-button--plain" id="learn-more-action">Learn more</button>
    </div>
  </div>
  <button class="polaris-banner__dismiss" aria-label="Dismiss banner" id="dismiss-action-banner">
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M14.348 5.652a.5.5 0 010 .707L10.707 10l3.641 3.641a.5.5 0 11-.707.707L10 10.707l-3.641 3.641a.5.5 0 01-.707-.707L9.293 10 5.652 6.359a.5.5 0 01.707-.707L10 9.293l3.641-3.641a.5.5 0 01.707 0z" fill="currentColor"/>
    </svg>
  </button>
</div>

<script>
document.getElementById('update-rates-action').addEventListener('click', () => {
  console.log('Update rates clicked');
});

document.getElementById('learn-more-action').addEventListener('click', () => {
  console.log('Learn more clicked');
});

document.getElementById('dismiss-action-banner').addEventListener('click', () => {
  document.querySelector('.polaris-banner').remove();
});
</script>`,

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

    typescript: `import {Banner} from '@shopify/polaris';
import React from 'react';

interface BannerAction {
  content: string;
  url?: string;
  onAction?: () => void;
}

interface BannerWithActionsProps {
  title?: string;
  message?: string;
  primaryAction?: BannerAction;
  secondaryAction?: BannerAction;
  tone?: 'success' | 'info' | 'warning' | 'critical';
  onDismiss?: () => void;
}

function BannerWithActions({
  title = "USPS has updated their rates",
  message = "Make sure you know how these changes affect your store.",
  primaryAction = { content: 'Update rates', url: '' },
  secondaryAction = { content: 'Learn more' },
  tone = "info",
  onDismiss
}: BannerWithActionsProps): JSX.Element {
  return (
    <Banner
      title={title}
      action={primaryAction}
      secondaryAction={secondaryAction}
      tone={tone}
      onDismiss={onDismiss}
    >
      <p>{message}</p>
    </Banner>
  );
}

export default BannerWithActions;`
  }
};
export const textFieldExamples: Record<string, CodeVariant> = {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-text-field">
  <label for="store-name" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input
      type="text"
      id="store-name"
      class="polaris-text-field__input"
      value="Jaded Pixel"
      autocomplete="off"
    />
  </div>
</div>

<script>
const input = document.getElementById('store-name');
input.addEventListener('input', (event) => {
  console.log('Value changed to:', event.target.value);
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TextFieldProps {
  initialValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

function TextFieldExample({
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  onValueChange
}: TextFieldProps): JSX.Element {
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
  'with-error': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ValidationError() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-text-field text-field--error">
  <label for="store-name" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input
      type="text"
      id="store-name"
      class="polaris-text-field__input text-field__input--error"
      value=""
      autocomplete="off"
      aria-invalid="true"
      aria-describedby="store-name-error"
    />
  </div>
  <div id="store-name-error" class="polaris-text-field__error">
    Store name is required
  </div>
</div>

<script>
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
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ValidationErrorExampleProps {
  label?: string;
  errorMessage?: string;
  required?: boolean;
}

function ValidationError({
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-text-field">
  <label for="account-email" class="polaris-text-field__label">Account email</label>
  <div class="polaris-text-field__input-wrapper">
    <input
      type="email"
      id="account-email"
      class="polaris-text-field__input"
      value="bernadette.lapresse@jadedpixel.com"
      autocomplete="email"
      aria-describedby="account-email-help"
    />
  </div>
  <div id="account-email-help" class="polaris-text-field__help-text">
    We'll use this address if we need to contact you about your account.
  </div>
</div>

<script>
const emailInput = document.getElementById('account-email');
emailInput.addEventListener('input', (event) => {
  console.log('Email changed to:', event.target.value);
});
</script>`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-text-field">
  <label for="quantity" class="polaris-text-field__label">Quantity</label>
  <div class="polaris-text-field__input-wrapper">
    <input
      type="number"
      id="quantity"
      class="polaris-text-field__input"
      value="1"
      min="0"
      autocomplete="off"
    />
  </div>
</div>

<script>
const quantityInput = document.getElementById('quantity');
quantityInput.addEventListener('input', (event) => {
  const value = event.target.value;
  if (value && !isNaN(value) && parseInt(value) >= 0) {
    console.log('Quantity changed to:', value);
  }
});
</script>`,
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

function DisabledTextField() {
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
const addressInput = document.getElementById('address-field');

addressInput.addEventListener('input', (event) => {
  const value = event.target.value;
  console.log('Address changed to:', value);

  const textarea = event.target;
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
});

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

  const handleChange = useCallback(
    (newValue: string) => {
      if (maxLength && newValue.length > maxLength) {
        return;
      }

      setValue(newValue);
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
  },
  'with-prefix-suffix': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function PrefixSuffixExample() {
  const [textFieldValue, setTextFieldValue] = useState('2.00');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Price"
      type="number"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      prefix="$"
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Number', {
  fieldLabel: 'Price',
  value: 2.00,
  labelWidth: 100,
  width: 200,
  decimalPrecision: 2,
  listeners: {
    change: function(field, newValue) {
      console.log('Price changed to:', newValue);
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="price-input" class="polaris-text-field__label">Price</label>
  <div class="polaris-text-field__input-wrapper">
    <span class="polaris-text-field__prefix">$</span>
    <input
      type="number"
      id="price-input"
      class="polaris-text-field__input polaris-text-field__input--with-prefix"
      value="2.00"
      autocomplete="off"
    />
  </div>
</div>

<script>
const priceInput = document.getElementById('price-input');

priceInput.addEventListener('input', (event) => {
  const value = parseFloat(event.target.value);
  console.log('Price changed to:', value);
});

priceInput.addEventListener('blur', (event) => {
  const value = parseFloat(event.target.value);
  if (!isNaN(value)) {
    event.target.value = value.toFixed(2);
  }
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface PrefixSuffixTextFieldProps {
  initialValue?: string;
  label?: string;
  prefix?: string;
  suffix?: string;
  type?: 'text' | 'number' | 'email' | 'url';
  onValueChange?: (value: string) => void;
}

function PrefixSuffixExample({
  initialValue = '2.00',
  label = 'Price',
  prefix = '$',
  suffix,
  type = 'number',
  onValueChange
}: PrefixSuffixTextFieldProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      type={type}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      prefix={prefix}
      suffix={suffix}
      autoComplete="off"
    />
  );
}`
  },
  'character-count': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CharacterCountExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      maxLength={20}
      autoComplete="off"
      showCharacterCount
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  maxLength: 20,
  enforceMaxLength: true,
  listeners: {
    change: function(field, newValue) {
      const count = newValue.length;
      const maxLength = field.maxLength;

      if (!field.characterCountEl) {
        field.characterCountEl = Ext.DomHelper.append(field.bodyEl, {
          tag: 'div',
          cls: 'character-count',
          html: count + '/' + maxLength
        });
      } else {
        field.characterCountEl.innerHTML = count + '/' + maxLength;
      }
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="store-name-count" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input
      type="text"
      id="store-name-count"
      class="polaris-text-field__input"
      value="Jaded Pixel"
      autocomplete="off"
      maxlength="20"
    />
  </div>
  <div class="polaris-text-field__character-count">
    <span id="char-count">11</span>/<span id="max-length">20</span>
  </div>
</div>

<script>
const countInput = document.getElementById('store-name-count');
const charCountEl = document.getElementById('char-count');
const maxLengthEl = document.getElementById('max-length');

function updateCharacterCount() {
  const currentLength = countInput.value.length;
  const maxLength = parseInt(countInput.getAttribute('maxlength'));

  charCountEl.textContent = currentLength;
  maxLengthEl.textContent = maxLength;

  const countContainer = charCountEl.parentElement;
  if (currentLength >= maxLength * 0.8) {
    countContainer.style.color = '#d72c0d';
  } else {
    countContainer.style.color = '#6d7175';
  }
}

countInput.addEventListener('input', updateCharacterCount);
updateCharacterCount();
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CharacterCountTextFieldProps {
  initialValue?: string;
  label?: string;
  maxLength?: number;
  onValueChange?: (value: string) => void;
}

function CharacterCountExample({
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  maxLength = 20,
  onValueChange
}: CharacterCountTextFieldProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      maxLength={maxLength}
      autoComplete="off"
      showCharacterCount
    />
  );
}`
  }
};

// Navigation - TopBar Component Examples
export const topbarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function TopBarExample() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchResultsVisible(false);
  }, []);

  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchValue(value);
    setSearchResultsVisible(value.length > 0);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        searchResultsVisible={searchResultsVisible}
        onSearchResultsDismiss={handleSearchResultsDismiss}
      />
    </div>
  );
}

export default TopBarExample;`,

    vanilla: `import { createTopBar, createSearchField } from '@cin7/vanilla-js';

// Create search field
const searchField = createSearchField({
  placeholder: 'Search',
  onChange: (value) => {
    console.log('Search:', value);
  }
});

// Create top bar
const topBar = createTopBar({
  showNavigationToggle: true,
  searchField: searchField,
  onNavigationToggle: () => {
    console.log('Navigation toggled');
  }
});

// Add to page
document.getElementById('app').appendChild(topBar);`,

    extjs: `import { PolarisTopBar } from '@cin7/extjs-adapters';

// Create top bar with search
Ext.create('Cin7.component.PolarisTopBar', {
  showNavigationToggle: true,
  searchConfig: {
    placeholder: 'Search',
    listeners: {
      change: function(field, value) {
        console.log('Search:', value);
      }
    }
  },
  listeners: {
    navigationtoggle: function() {
      console.log('Navigation toggled');
    }
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function TopBarExample(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);

  const handleSearchResultsDismiss = useCallback((): void => {
    setSearchResultsVisible(false);
  }, []);

  const handleSearchFieldChange = useCallback((value: string): void => {
    setSearchValue(value);
    setSearchResultsVisible(value.length > 0);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        searchResultsVisible={searchResultsVisible}
        onSearchResultsDismiss={handleSearchResultsDismiss}
      />
    </div>
  );
}

export default TopBarExample;`
  },

  withusermenu: {
    react: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function WithUserMenuExample() {
  const [searchValue, setSearchValue] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleToggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={setSearchValue}
      value={searchValue}
      placeholder="Search products, orders, customers..."
    />
  );

  const userMenu = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: 'Account', icon: 'profile' },
            { content: 'Preferences', icon: 'settings' },
            { content: 'Log out', icon: 'logOut' },
          ],
        },
      ]}
      name="John Doe"
      detail="john.doe@example.com"
      initials="JD"
      open={isUserMenuOpen}
      onToggle={handleToggleUserMenu}
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        userMenu={userMenu}
      />
    </div>
  );
}

export default WithUserMenuExample;`,

    vanilla: `import { createTopBar, createUserMenu } from '@cin7/vanilla-js';

// Create user menu
const userMenu = createUserMenu({
  name: 'John Doe',
  detail: 'john.doe@example.com',
  initials: 'JD',
  actions: [
    {
      items: [
        { content: 'Account', icon: 'profile' },
        { content: 'Preferences', icon: 'settings' },
        { content: 'Log out', icon: 'logOut' }
      ]
    }
  ]
});

// Create top bar with user menu
const topBar = createTopBar({
  showNavigationToggle: true,
  userMenu: userMenu
});

document.getElementById('app').appendChild(topBar);`,

    extjs: `import { PolarisTopBar } from '@cin7/extjs-adapters';

// Create top bar with user menu
Ext.create('Cin7.component.PolarisTopBar', {
  showNavigationToggle: true,
  userMenuConfig: {
    name: 'John Doe',
    detail: 'john.doe@example.com',
    initials: 'JD',
    actions: [
      {
        items: [
          { content: 'Account', icon: 'profile' },
          { content: 'Preferences', icon: 'settings' },
          { content: 'Log out', icon: 'logOut' }
        ]
      }
    ]
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface MenuAction {
  content: string;
  icon?: string;
}

function WithUserMenuExample(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const handleToggleUserMenu = useCallback((): void => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={setSearchValue}
      value={searchValue}
      placeholder="Search products, orders, customers..."
    />
  );

  const userMenu = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: 'Account', icon: 'profile' },
            { content: 'Preferences', icon: 'settings' },
            { content: 'Log out', icon: 'logOut' },
          ],
        },
      ]}
      name="John Doe"
      detail="john.doe@example.com"
      initials="JD"
      open={isUserMenuOpen}
      onToggle={handleToggleUserMenu}
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        userMenu={userMenu}
      />
    </div>
  );
}

export default WithUserMenuExample;`
  }
};

// Feedback - Badge Component Examples
export const badgeExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Badge } from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return <Badge>New</Badge>;
}

export default BadgeExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create badge
const badge = createBadge({ text: 'New' });

// Add to page
document.getElementById('app').appendChild(badge);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create badge
Ext.create('Cin7.component.PolarisBadge', {
  text: 'New',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Badge } from '@shopify/polaris';
import React from 'react';

function BadgeExample(): JSX.Element {
  return <Badge>New</Badge>;
}

export default BadgeExample;`
  },

  tones: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function TonesExample() {
  return (
    <InlineStack gap="400">
      <Badge tone="success">Success</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="attention">Attention</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="critical">Critical</Badge>
      <Badge tone="new">New</Badge>
    </InlineStack>
  );
}

export default TonesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';

// Create badges with different tones
const tones = [
  { tone: 'success', text: 'Success' },
  { tone: 'info', text: 'Info' },
  { tone: 'attention', text: 'Attention' },
  { tone: 'warning', text: 'Warning' },
  { tone: 'critical', text: 'Critical' },
  { tone: 'new', text: 'New' }
];

tones.forEach(({ tone, text }) => {
  const badge = createBadge({ text, tone });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container panel
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: 'Success', tone: 'success' },
    { xtype: 'polarisbadge', text: 'Info', tone: 'info' },
    { xtype: 'polarisbadge', text: 'Attention', tone: 'attention' },
    { xtype: 'polarisbadge', text: 'Warning', tone: 'warning' },
    { xtype: 'polarisbadge', text: 'Critical', tone: 'critical' },
    { xtype: 'polarisbadge', text: 'New', tone: 'new' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

function TonesExample(): JSX.Element {
  const tones: { tone: BadgeTone; label: string }[] = [
    { tone: 'success', label: 'Success' },
    { tone: 'info', label: 'Info' },
    { tone: 'attention', label: 'Attention' },
    { tone: 'warning', label: 'Warning' },
    { tone: 'critical', label: 'Critical' },
    { tone: 'new', label: 'New' }
  ];

  return (
    <InlineStack gap="400">
      {tones.map(({ tone, label }) => (
        <Badge key={tone} tone={tone}>
          {label}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default TonesExample;`
  },

  progress: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function ProgressExample() {
  return (
    <InlineStack gap="400">
      <Badge progress="incomplete">Task 1</Badge>
      <Badge progress="partiallyComplete">Task 2</Badge>
      <Badge progress="complete">Task 3</Badge>
    </InlineStack>
  );
}

export default ProgressExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';

// Create progress badges
const progressStates = [
  { progress: 'incomplete', text: 'Task 1' },
  { progress: 'partiallyComplete', text: 'Task 2' },
  { progress: 'complete', text: 'Task 3' }
];

progressStates.forEach(({ progress, text }) => {
  const badge = createBadge({ text, progress });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container with progress badges
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: 'Task 1', progress: 'incomplete' },
    { xtype: 'polarisbadge', text: 'Task 2', progress: 'partiallyComplete' },
    { xtype: 'polarisbadge', text: 'Task 3', progress: 'complete' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';

function ProgressExample(): JSX.Element {
  const tasks: { progress: BadgeProgress; label: string }[] = [
    { progress: 'incomplete', label: 'Task 1' },
    { progress: 'partiallyComplete', label: 'Task 2' },
    { progress: 'complete', label: 'Task 3' }
  ];

  return (
    <InlineStack gap="400">
      {tasks.map(({ progress, label }) => (
        <Badge key={label} progress={progress}>
          {label}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default ProgressExample;`
  },

  sizes: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function SizesExample() {
  return (
    <InlineStack gap="400" align="center">
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </InlineStack>
  );
}

export default SizesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';
container.style.alignItems = 'center';

// Create badges with different sizes
const sizes = [
  { size: 'small', text: 'Small' },
  { size: 'medium', text: 'Medium' },
  { size: 'large', text: 'Large' }
];

sizes.forEach(({ size, text }) => {
  const badge = createBadge({ text, size });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container with different sized badges
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: 'Small', size: 'small' },
    { xtype: 'polarisbadge', text: 'Medium', size: 'medium' },
    { xtype: 'polarisbadge', text: 'Large', size: 'large' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeSize = 'small' | 'medium' | 'large';

function SizesExample(): JSX.Element {
  const sizes: { size: BadgeSize; label: string }[] = [
    { size: 'small', label: 'Small' },
    { size: 'medium', label: 'Medium' },
    { size: 'large', label: 'Large' }
  ];

  return (
    <InlineStack gap="400" align="center">
      {sizes.map(({ size, label }) => (
        <Badge key={size} size={size}>
          {label}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default SizesExample;`
  }
};

// Utilities - Tag Component Examples
export const tagExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Tag } from '@shopify/polaris';
import React from 'react';

function TagExample() {
  return <Tag>Sample Tag</Tag>;
}

export default TagExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// Create tag
const tag = createTag({ text: 'Sample Tag' });

// Add to page
document.getElementById('app').appendChild(tag);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create tag
Ext.create('Cin7.component.PolarisTag', {
  text: 'Sample Tag',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Tag } from '@shopify/polaris';
import React from 'react';

function TagExample(): JSX.Element {
  return <Tag>Sample Tag</Tag>;
}

export default TagExample;`
  },

  basictags: {
    react: `import { Tag, InlineStack } from '@shopify/polaris';
import React from 'react';

function BasicTagsExample() {
  return (
    <InlineStack gap="300">
      <Tag>Default</Tag>
      <Tag tone="success">Success</Tag>
      <Tag tone="warning">Warning</Tag>
      <Tag tone="critical">Critical</Tag>
      <Tag tone="info">Info</Tag>
      <Tag tone="highlight">Highlight</Tag>
    </InlineStack>
  );
}

export default BasicTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '12px';
container.style.flexWrap = 'wrap';

// Create tags with different tones
const tags = [
  { text: 'Default' },
  { text: 'Success', tone: 'success' },
  { text: 'Warning', tone: 'warning' },
  { text: 'Critical', tone: 'critical' },
  { text: 'Info', tone: 'info' },
  { text: 'Highlight', tone: 'highlight' }
];

tags.forEach(config => {
  const tag = createTag(config);
  container.appendChild(tag);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create container with tags
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 12
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polaristag', text: 'Default' },
    { xtype: 'polaristag', text: 'Success', tone: 'success' },
    { xtype: 'polaristag', text: 'Warning', tone: 'warning' },
    { xtype: 'polaristag', text: 'Critical', tone: 'critical' },
    { xtype: 'polaristag', text: 'Info', tone: 'info' },
    { xtype: 'polaristag', text: 'Highlight', tone: 'highlight' }
  ]
});`,

    typescript: `import { Tag, InlineStack } from '@shopify/polaris';
import React from 'react';

type TagTone = 'base' | 'success' | 'warning' | 'critical' | 'info' | 'highlight';

interface TagConfig {
  text: string;
  tone?: TagTone;
}

function BasicTagsExample(): JSX.Element {
  const tags: TagConfig[] = [
    { text: 'Default' },
    { text: 'Success', tone: 'success' },
    { text: 'Warning', tone: 'warning' },
    { text: 'Critical', tone: 'critical' },
    { text: 'Info', tone: 'info' },
    { text: 'Highlight', tone: 'highlight' }
  ];

  return (
    <InlineStack gap="300">
      {tags.map(({ text, tone }) => (
        <Tag key={text} tone={tone}>
          {text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default BasicTagsExample;`
  },

  removabletags: {
    react: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function RemovableTagsExample() {
  const [tags, setTags] = useState([
    { id: '1', text: 'Electronics' },
    { id: '2', text: 'Books' },
    { id: '3', text: 'Clothing' },
    { id: '4', text: 'Home & Garden' },
  ]);

  const handleRemove = (tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  return (
    <InlineStack gap="200" wrap>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onRemove={() => handleRemove(tag.id)}
          removable
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default RemovableTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// State management
let tags = [
  { id: '1', text: 'Electronics' },
  { id: '2', text: 'Books' },
  { id: '3', text: 'Clothing' },
  { id: '4', text: 'Home & Garden' }
];

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '8px';
container.style.flexWrap = 'wrap';

// Render tags function
function renderTags() {
  container.innerHTML = '';
  tags.forEach(tag => {
    const tagEl = createTag({
      text: tag.text,
      removable: true,
      onRemove: () => {
        tags = tags.filter(t => t.id !== tag.id);
        renderTags();
      }
    });
    container.appendChild(tagEl);
  });
}

renderTags();
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create tag store
const tagStore = Ext.create('Ext.data.Store', {
  fields: ['id', 'text'],
  data: [
    { id: '1', text: 'Electronics' },
    { id: '2', text: 'Books' },
    { id: '3', text: 'Clothing' },
    { id: '4', text: 'Home & Garden' }
  ]
});

// Create container
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 8
  },
  renderTo: Ext.getBody()
});

// Render tags
tagStore.each(function(record) {
  container.add({
    xtype: 'polaristag',
    text: record.get('text'),
    removable: true,
    listeners: {
      remove: function() {
        tagStore.remove(record);
        container.remove(this);
      }
    }
  });
});`,

    typescript: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

interface TagData {
  id: string;
  text: string;
}

function RemovableTagsExample(): JSX.Element {
  const [tags, setTags] = useState<TagData[]>([
    { id: '1', text: 'Electronics' },
    { id: '2', text: 'Books' },
    { id: '3', text: 'Clothing' },
    { id: '4', text: 'Home & Garden' },
  ]);

  const handleRemove = (tagId: string): void => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  return (
    <InlineStack gap="200" wrap>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onRemove={() => handleRemove(tag.id)}
          removable
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default RemovableTagsExample;`
  },

  clickabletags: {
    react: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function ClickableTagsExample() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = [
    { id: 'all', text: 'All Products' },
    { id: 'active', text: 'Active' },
    { id: 'archived', text: 'Archived' },
    { id: 'draft', text: 'Draft' },
  ];

  return (
    <InlineStack gap="200">
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onClick={() => setSelectedTag(tag.id)}
          clickable
          tone={selectedTag === tag.id ? 'highlight' : 'base'}
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default ClickableTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// State
let selectedTag = null;

// Tags data
const tags = [
  { id: 'all', text: 'All Products' },
  { id: 'active', text: 'Active' },
  { id: 'archived', text: 'Archived' },
  { id: 'draft', text: 'Draft' }
];

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '8px';

// Render tags
tags.forEach(tag => {
  const tagEl = createTag({
    text: tag.text,
    clickable: true,
    tone: selectedTag === tag.id ? 'highlight' : 'base',
    onClick: () => {
      selectedTag = tag.id;
      console.log('Selected:', tag.text);
      // Re-render to update tones
      container.querySelectorAll('.polaris-tag').forEach(el => {
        el.classList.remove('polaris-tag--highlight');
      });
      tagEl.classList.add('polaris-tag--highlight');
    }
  });
  container.appendChild(tagEl);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// State
let selectedTag = null;

// Tags data
const tags = [
  { id: 'all', text: 'All Products' },
  { id: 'active', text: 'Active' },
  { id: 'archived', text: 'Archived' },
  { id: 'draft', text: 'Draft' }
];

// Create container
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 8
  },
  renderTo: Ext.getBody()
});

// Create tags
tags.forEach(tagData => {
  const tag = Ext.create('Cin7.component.PolarisTag', {
    text: tagData.text,
    clickable: true,
    tone: 'base',
    tagId: tagData.id,
    listeners: {
      click: function() {
        selectedTag = this.tagId;
        console.log('Selected:', this.text);
        // Update all tags
        container.items.each(function(item) {
          item.setTone(item.tagId === selectedTag ? 'highlight' : 'base');
        });
      }
    }
  });
  container.add(tag);
});`,

    typescript: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

interface TagData {
  id: string;
  text: string;
}

type TagTone = 'base' | 'highlight';

function ClickableTagsExample(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags: TagData[] = [
    { id: 'all', text: 'All Products' },
    { id: 'active', text: 'Active' },
    { id: 'archived', text: 'Archived' },
    { id: 'draft', text: 'Draft' },
  ];

  const handleTagClick = (tagId: string): void => {
    setSelectedTag(tagId);
  };

  const getTagTone = (tagId: string): TagTone => {
    return selectedTag === tagId ? 'highlight' : 'base';
  };

  return (
    <InlineStack gap="200">
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onClick={() => handleTagClick(tag.id)}
          clickable
          tone={getTagTone(tag.id)}
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default ClickableTagsExample;`
  }
};


// Select Component Examples
export const selectExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Select } from '@shopify/polaris';
import { useState } from 'react';

function SelectExample() {
  const [selected, setSelected] = useState('');

  const options = [
    {label: 'Please select', value: ''},
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  return (
    <Select
      label="Choose an option"
      options={options}
      value={selected}
      onChange={setSelected}
      placeholder="Select an option"
    />
  );
}

export default SelectExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-select-wrapper">
  <label class="polaris-label">Choose an option</label>
  <select class="polaris-select" id="select-demo">
    <option value="">Select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

const selectEl = $('#select-demo');

on(selectEl, 'change', (e) => {
  const selectedValue = e.target.value;
  console.log('Selected:', selectedValue);

  // Trigger custom event for cross-component communication
  EventBus.emit('select:changed', { value: selectedValue });
});
</script>`,

    extjs: `// ExtJS ComboBox using @cin7/extjs-adapters
Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Choose an option',
  store: Ext.create('Ext.data.Store', {
    fields: ['value', 'label'],
    data: [
      {value: '', label: 'Please select'},
      {value: '1', label: 'Option 1'},
      {value: '2', label: 'Option 2'},
      {value: '3', label: 'Option 3'}
    ]
  }),
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  editable: false,
  emptyText: 'Select an option',
  renderTo: Ext.getBody(),
  listeners: {
    change: function(combo, newValue) {
      console.log('Selected:', newValue);
      EventBus.emit('select:changed', { value: newValue });
    }
  }
});`,

    typescript: `import { Select } from '@shopify/polaris';
import { useState } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectExampleProps {
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}

function SelectExample({
  label = 'Choose an option',
  options = [
    {label: 'Please select', value: ''},
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ],
  placeholder = 'Select an option',
  onChange
}: SelectExampleProps): JSX.Element {
  const [selected, setSelected] = useState<string>('');

  const handleChange = (value: string): void => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <Select
      label={label}
      options={options}
      value={selected}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

export default SelectExample;`
  },

  disabled: {
    react: `import { Select } from '@shopify/polaris';

function DisabledSelectExample() {
  const options = [
    {label: 'Please select', value: ''},
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  return (
    <Select
      label="Disabled select"
      options={options}
      value="1"
      disabled
      onChange={() => {}}
    />
  );
}

export default DisabledSelectExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-select-wrapper">
  <label class="polaris-label">Disabled select</label>
  <select class="polaris-select" id="disabled-select" disabled>
    <option value="">Please select</option>
    <option value="1" selected>Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>`,

    extjs: `// ExtJS ComboBox - Disabled
Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Disabled select',
  store: Ext.create('Ext.data.Store', {
    fields: ['value', 'label'],
    data: [
      {value: '', label: 'Please select'},
      {value: '1', label: 'Option 1'},
      {value: '2', label: 'Option 2'},
      {value: '3', label: 'Option 3'}
    ]
  }),
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  editable: false,
  value: '1',
  disabled: true,
  renderTo: Ext.getBody()
});`,

    typescript: `import { Select } from '@shopify/polaris';

interface DisabledSelectExampleProps {
  label?: string;
  value?: string;
}

function DisabledSelectExample({
  label = 'Disabled select',
  value = '1'
}: DisabledSelectExampleProps): JSX.Element {
  const options = [
    {label: 'Please select', value: ''},
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  return (
    <Select
      label={label}
      options={options}
      value={value}
      disabled
      onChange={() => {}}
    />
  );
}

export default DisabledSelectExample;`
  },

  'with-validation-error': {
    react: `import { Select } from '@shopify/polaris';
import { useState } from 'react';

function SelectWithErrorExample() {
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('Payment method is required');

  const options = [
    {label: 'Select payment method', value: ''},
    {label: 'Credit Card', value: 'credit'},
    {label: 'Debit Card', value: 'debit'},
    {label: 'PayPal', value: 'paypal'},
  ];

  const handleChange = (value: string) => {
    setSelected(value);
    if (value) {
      setError('');
    }
  };

  return (
    <Select
      label="Payment method"
      options={options}
      value={selected}
      onChange={handleChange}
      error={error}
    />
  );
}

export default SelectWithErrorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-select-wrapper">
  <label class="polaris-label">Payment method</label>
  <select class="polaris-select polaris-select--error" id="payment-select">
    <option value="">Select payment method</option>
    <option value="credit">Credit Card</option>
    <option value="debit">Debit Card</option>
    <option value="paypal">PayPal</option>
  </select>
  <div class="polaris-error" id="payment-error">Payment method is required</div>
</div>

<script>
import { $, on, addClass, removeClass } from '@cin7/vanilla-js';

const selectEl = $('#payment-select');
const errorEl = $('#payment-error');

on(selectEl, 'change', (e) => {
  const value = e.target.value;
  if (value) {
    removeClass(selectEl, 'polaris-select--error');
    errorEl.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS ComboBox with validation
Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Payment method',
  store: Ext.create('Ext.data.Store', {
    fields: ['value', 'label'],
    data: [
      {value: '', label: 'Select payment method'},
      {value: 'credit', label: 'Credit Card'},
      {value: 'debit', label: 'Debit Card'},
      {value: 'paypal', label: 'PayPal'}
    ]
  }),
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  editable: false,
  allowBlank: false,
  blankText: 'Payment method is required',
  renderTo: Ext.getBody(),
  listeners: {
    change: function(combo, newValue) {
      if (newValue) {
        combo.clearInvalid();
      } else {
        combo.markInvalid('Payment method is required');
      }
    }
  }
});`,

    typescript: `import { Select } from '@shopify/polaris';
import { useState } from 'react';

interface PaymentOption {
  label: string;
  value: string;
}

function SelectWithErrorExample(): JSX.Element {
  const [selected, setSelected] = useState<string>('');
  const [error, setError] = useState<string>('Payment method is required');

  const options: PaymentOption[] = [
    {label: 'Select payment method', value: ''},
    {label: 'Credit Card', value: 'credit'},
    {label: 'Debit Card', value: 'debit'},
    {label: 'PayPal', value: 'paypal'},
  ];

  const handleChange = (value: string): void => {
    setSelected(value);
    if (value) {
      setError('');
    } else {
      setError('Payment method is required');
    }
  };

  return (
    <Select
      label="Payment method"
      options={options}
      value={selected}
      onChange={handleChange}
      error={error || undefined}
    />
  );
}

export default SelectWithErrorExample;`
  }
};

// Checkbox Component Examples
export const checkboxExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Subscribe to newsletter"
      checked={checked}
      onChange={setChecked}
    />
  );
}

export default CheckboxExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-checkbox-wrapper">
  <label class="polaris-checkbox-label">
    <input type="checkbox" class="polaris-checkbox" id="newsletter-checkbox" />
    <span class="polaris-checkbox-label-text">Subscribe to newsletter</span>
  </label>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const checkbox = $('#newsletter-checkbox');

on(checkbox, 'change', (e) => {
  const isChecked = e.target.checked;
  console.log('Checkbox state:', isChecked);
  EventBus.emit('checkbox:changed', {
    id: 'newsletter',
    checked: isChecked
  });
});
</script>`,

    extjs: `// ExtJS Checkbox using @cin7/extjs-adapters
Ext.create('Ext.form.field.Checkbox', {
  boxLabel: 'Subscribe to newsletter',
  checked: false,
  renderTo: Ext.getBody(),
  listeners: {
    change: function(checkbox, newValue) {
      console.log('Checkbox state:', newValue);
      EventBus.emit('checkbox:changed', {
        id: 'newsletter',
        checked: newValue
      });
    }
  }
});`,

    typescript: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

interface CheckboxExampleProps {
  label?: string;
  initialChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

function CheckboxExample({
  label = 'Subscribe to newsletter',
  initialChecked = false,
  onChange
}: CheckboxExampleProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(initialChecked);

  const handleChange = (newChecked: boolean): void => {
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default CheckboxExample;`
  },

  checked: {
    react: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

function CheckedCheckboxExample() {
  const [checked, setChecked] = useState(true);

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={setChecked}
    />
  );
}

export default CheckedCheckboxExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-checkbox-wrapper">
  <label class="polaris-checkbox-label">
    <input type="checkbox" class="polaris-checkbox" id="terms-checkbox" checked />
    <span class="polaris-checkbox-label-text">Accept terms and conditions</span>
  </label>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const checkbox = $('#terms-checkbox');

on(checkbox, 'change', (e) => {
  const isChecked = e.target.checked;
  console.log('Terms accepted:', isChecked);
  if (!isChecked) {
    alert('You must accept the terms to continue');
  }
});
</script>`,

    extjs: `// ExtJS Checkbox - Pre-checked
Ext.create('Ext.form.field.Checkbox', {
  boxLabel: 'Accept terms and conditions',
  checked: true,
  renderTo: Ext.getBody(),
  listeners: {
    change: function(checkbox, newValue) {
      if (!newValue) {
        Ext.Msg.alert('Required', 'You must accept the terms to continue');
      }
    }
  }
});`,

    typescript: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

function CheckedCheckboxExample(): JSX.Element {
  const [checked, setChecked] = useState<boolean>(true);

  const handleChange = (newChecked: boolean): void => {
    setChecked(newChecked);
    if (!newChecked) {
      console.warn('Terms must be accepted');
    }
  };

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={handleChange}
    />
  );
}

export default CheckedCheckboxExample;`
  },

  disabled: {
    react: `import { Checkbox, BlockStack } from '@shopify/polaris';

function DisabledCheckboxExample() {
  return (
    <BlockStack gap="400">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled />
    </BlockStack>
  );
}

export default DisabledCheckboxExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack">
  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" disabled />
      <span class="polaris-checkbox-label-text">Disabled unchecked</span>
    </label>
  </div>
  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" checked disabled />
      <span class="polaris-checkbox-label-text">Disabled checked</span>
    </label>
  </div>
</div>`,

    extjs: `// ExtJS Checkboxes - Disabled states
Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: [
    {
      xtype: 'checkbox',
      boxLabel: 'Disabled unchecked',
      disabled: true
    },
    {
      xtype: 'checkbox',
      boxLabel: 'Disabled checked',
      checked: true,
      disabled: true
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Checkbox, BlockStack } from '@shopify/polaris';

function DisabledCheckboxExample(): JSX.Element {
  return (
    <BlockStack gap="400">
      <Checkbox
        label="Disabled unchecked"
        disabled
        onChange={() => {}}
      />
      <Checkbox
        label="Disabled checked"
        checked
        disabled
        onChange={() => {}}
      />
    </BlockStack>
  );
}

export default DisabledCheckboxExample;`
  },

  'with-help-text': {
    react: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

function CheckboxWithHelpTextExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Enable notifications"
      checked={checked}
      onChange={setChecked}
      helpText="Receive email updates about your account activity"
    />
  );
}

export default CheckboxWithHelpTextExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-checkbox-wrapper">
  <label class="polaris-checkbox-label">
    <input type="checkbox" class="polaris-checkbox" id="notifications-checkbox" />
    <span class="polaris-checkbox-label-text">Enable notifications</span>
  </label>
  <div class="polaris-help-text">
    Receive email updates about your account activity
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const checkbox = $('#notifications-checkbox');

on(checkbox, 'change', (e) => {
  const isChecked = e.target.checked;
  console.log('Notifications enabled:', isChecked);
  EventBus.emit('preferences:changed', {
    notifications: isChecked
  });
});
</script>`,

    extjs: `// ExtJS Checkbox with help text
Ext.create('Ext.form.FieldContainer', {
  items: [
    {
      xtype: 'checkbox',
      boxLabel: 'Enable notifications',
      listeners: {
        change: function(checkbox, newValue) {
          console.log('Notifications enabled:', newValue);
          EventBus.emit('preferences:changed', {
            notifications: newValue
          });
        }
      }
    }
  ],
  afterBodyEl: '<div class="polaris-help-text">Receive email updates about your account activity</div>',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

interface CheckboxWithHelpTextProps {
  label?: string;
  helpText?: string;
  onChange?: (checked: boolean) => void;
}

function CheckboxWithHelpTextExample({
  label = 'Enable notifications',
  helpText = 'Receive email updates about your account activity',
  onChange
}: CheckboxWithHelpTextProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (newChecked: boolean): void => {
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={handleChange}
      helpText={helpText}
    />
  );
}

export default CheckboxWithHelpTextExample;`
  }
};

// RadioButton Component Examples
export const radioButtonExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

function RadioButtonExample() {
  const [selected, setSelected] = useState('standard');

  return (
    <RadioButton
      label="Standard shipping"
      name="shipping"
      value="standard"
      checked={selected === 'standard'}
      onChange={() => setSelected('standard')}
    />
  );
}

export default RadioButtonExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-radio-wrapper">
  <label class="polaris-radio-label">
    <input
      type="radio"
      class="polaris-radio"
      name="shipping"
      value="standard"
      id="standard-radio"
      checked
    />
    <span class="polaris-radio-label-text">Standard shipping</span>
  </label>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const radio = $('#standard-radio');

on(radio, 'change', (e) => {
  if (e.target.checked) {
    console.log('Selected:', e.target.value);
    EventBus.emit('radio:changed', {
      name: 'shipping',
      value: e.target.value
    });
  }
});
</script>`,

    extjs: `// ExtJS Radio Button using @cin7/extjs-adapters
Ext.create('Ext.form.field.Radio', {
  boxLabel: 'Standard shipping',
  name: 'shipping',
  inputValue: 'standard',
  checked: true,
  renderTo: Ext.getBody(),
  listeners: {
    change: function(radio, newValue) {
      if (newValue) {
        console.log('Selected:', radio.inputValue);
        EventBus.emit('radio:changed', {
          name: 'shipping',
          value: radio.inputValue
        });
      }
    }
  }
});

// Or using RadioGroup for multiple options
Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Shipping Method',
  columns: 1,
  vertical: true,
  items: [
    {boxLabel: 'Standard shipping', name: 'shipping', inputValue: 'standard', checked: true},
    {boxLabel: 'Express shipping', name: 'shipping', inputValue: 'express'},
    {boxLabel: 'Overnight shipping', name: 'shipping', inputValue: 'overnight'}
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

interface RadioButtonExampleProps {
  label?: string;
  name?: string;
  value?: string;
  initialSelected?: string;
  onChange?: (value: string) => void;
}

function RadioButtonExample({
  label = 'Standard shipping',
  name = 'shipping',
  value = 'standard',
  initialSelected = 'standard',
  onChange
}: RadioButtonExampleProps): JSX.Element {
  const [selected, setSelected] = useState<string>(initialSelected);

  const handleChange = (): void => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <RadioButton
      label={label}
      name={name}
      value={value}
      checked={selected === value}
      onChange={handleChange}
    />
  );
}

export default RadioButtonExample;`
  },

  checked: {
    react: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

function CheckedRadioButtonExample() {
  const [selected, setSelected] = useState('express');

  return (
    <RadioButton
      label="Express shipping"
      name="shipping"
      value="express"
      checked={selected === 'express'}
      onChange={() => setSelected('express')}
    />
  );
}

export default CheckedRadioButtonExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-radio-wrapper">
  <label class="polaris-radio-label">
    <input
      type="radio"
      class="polaris-radio"
      name="shipping"
      value="express"
      id="express-radio"
      checked
    />
    <span class="polaris-radio-label-text">Express shipping</span>
  </label>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const radio = $('#express-radio');

on(radio, 'change', (e) => {
  if (e.target.checked) {
    console.log('Selected shipping:', e.target.value);
  }
});
</script>`,

    extjs: `// ExtJS Radio Button - Pre-selected
Ext.create('Ext.form.field.Radio', {
  boxLabel: 'Express shipping',
  name: 'shipping',
  inputValue: 'express',
  checked: true,
  renderTo: Ext.getBody(),
  listeners: {
    change: function(radio, newValue) {
      if (newValue) {
        console.log('Selected shipping:', radio.inputValue);
      }
    }
  }
});`,

    typescript: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

function CheckedRadioButtonExample(): JSX.Element {
  const [selected, setSelected] = useState<string>('express');

  const handleChange = (): void => {
    setSelected('express');
  };

  return (
    <RadioButton
      label="Express shipping"
      name="shipping"
      value="express"
      checked={selected === 'express'}
      onChange={handleChange}
    />
  );
}

export default CheckedRadioButtonExample;`
  },

  disabled: {
    react: `import { RadioButton, BlockStack } from '@shopify/polaris';

function DisabledRadioButtonExample() {
  return (
    <BlockStack gap="400">
      <RadioButton
        label="Disabled unchecked"
        disabled
        name="disabled"
        value="no"
      />
      <RadioButton
        label="Disabled checked"
        checked
        disabled
        name="disabled"
        value="yes"
      />
    </BlockStack>
  );
}

export default DisabledRadioButtonExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack">
  <div class="polaris-radio-wrapper">
    <label class="polaris-radio-label">
      <input type="radio" class="polaris-radio" name="disabled" value="no" disabled />
      <span class="polaris-radio-label-text">Disabled unchecked</span>
    </label>
  </div>
  <div class="polaris-radio-wrapper">
    <label class="polaris-radio-label">
      <input type="radio" class="polaris-radio" name="disabled" value="yes" checked disabled />
      <span class="polaris-radio-label-text">Disabled checked</span>
    </label>
  </div>
</div>`,

    extjs: `// ExtJS Radio Buttons - Disabled states
Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: [
    {
      xtype: 'radio',
      boxLabel: 'Disabled unchecked',
      name: 'disabled',
      inputValue: 'no',
      disabled: true
    },
    {
      xtype: 'radio',
      boxLabel: 'Disabled checked',
      name: 'disabled',
      inputValue: 'yes',
      checked: true,
      disabled: true
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { RadioButton, BlockStack } from '@shopify/polaris';

function DisabledRadioButtonExample(): JSX.Element {
  return (
    <BlockStack gap="400">
      <RadioButton
        label="Disabled unchecked"
        disabled
        name="disabled"
        value="no"
        onChange={() => {}}
      />
      <RadioButton
        label="Disabled checked"
        checked
        disabled
        name="disabled"
        value="yes"
        onChange={() => {}}
      />
    </BlockStack>
  );
}

export default DisabledRadioButtonExample;`
  },

  'with-help-text': {
    react: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

function RadioButtonWithHelpTextExample() {
  const [selected, setSelected] = useState('premium');

  return (
    <RadioButton
      label="Premium shipping"
      name="shipping"
      value="premium"
      checked={selected === 'premium'}
      onChange={() => setSelected('premium')}
      helpText="Delivered within 1-2 business days with tracking"
    />
  );
}

export default RadioButtonWithHelpTextExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-radio-wrapper">
  <label class="polaris-radio-label">
    <input
      type="radio"
      class="polaris-radio"
      name="shipping"
      value="premium"
      id="premium-radio"
      checked
    />
    <span class="polaris-radio-label-text">Premium shipping</span>
  </label>
  <div class="polaris-help-text">
    Delivered within 1-2 business days with tracking
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const radio = $('#premium-radio');

on(radio, 'change', (e) => {
  if (e.target.checked) {
    console.log('Premium shipping selected');
    EventBus.emit('shipping:changed', {
      method: 'premium',
      delivery: '1-2 business days'
    });
  }
});
</script>`,

    extjs: `// ExtJS Radio Button with help text
Ext.create('Ext.form.FieldContainer', {
  items: [
    {
      xtype: 'radio',
      boxLabel: 'Premium shipping',
      name: 'shipping',
      inputValue: 'premium',
      checked: true,
      listeners: {
        change: function(radio, newValue) {
          if (newValue) {
            console.log('Premium shipping selected');
            EventBus.emit('shipping:changed', {
              method: 'premium',
              delivery: '1-2 business days'
            });
          }
        }
      }
    }
  ],
  afterBodyEl: '<div class="polaris-help-text">Delivered within 1-2 business days with tracking</div>',
  renderTo: Ext.getBody()
});`,

    typescript: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

interface RadioButtonWithHelpTextProps {
  label?: string;
  helpText?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function RadioButtonWithHelpTextExample({
  label = 'Premium shipping',
  helpText = 'Delivered within 1-2 business days with tracking',
  name = 'shipping',
  value = 'premium',
  onChange
}: RadioButtonWithHelpTextProps): JSX.Element {
  const [selected, setSelected] = useState<string>(value);

  const handleChange = (): void => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <RadioButton
      label={label}
      name={name}
      value={value}
      checked={selected === value}
      onChange={handleChange}
      helpText={helpText}
    />
  );
}

export default RadioButtonWithHelpTextExample;`
  }
};
// Utility function to get code variants
export function getCodeVariants(
  componentName: string,
  exampleName: string
): CodeVariant | null {
  const examples: Record<string, Record<string, CodeVariant>> = {
    button: buttonExamples,
    card: cardExamples,
    textfield: textFieldExamples,
    modal: modalExamples,
    banner: bannerExamples,
    actionlist: actionList,
    tabs: tabsExamples,
    pagination: paginationExamples,
    link: linkExamples,
    navigation: navigationExamples,
    toast: toastExamples,
    spinner: spinnerExamples,
    progressbar: progressbarExamples,
    page: pageExamples,
    layout: layoutExamples,
    blockstack: blockstackExamples,
    topbar: topbarExamples,
    badge: badgeExamples,
    tag: tagExamples,
    select: selectExamples,
    checkbox: checkboxExamples,
    radiobutton: radioButtonExamples,
  };

  const componentExamples = examples[componentName.toLowerCase()];
  if (!componentExamples) {
    console.warn(`No code examples found for component: ${componentName}`);
    return null;
  }

  const example = componentExamples[exampleName];
  if (!example) {
    console.warn(`No example "${exampleName}" found for component: ${componentName}`);
    return null;
  }

  return example;
}
