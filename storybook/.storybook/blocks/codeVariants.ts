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

  small: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function SmallButton() {
  return <Button size="slim">Small button</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Small button',
  scale: 'small',
  height: 28,
  padding: '4 12',
  handler: function() {
    console.log('Small button clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--slim">Small button</button>

<script>
const smallButton = document.querySelector('.polaris-button--slim');

smallButton.addEventListener('click', () => {
  console.log('Small button clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface SmallButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  disabled?: boolean;
}

function SmallButton({
  label = 'Small button',
  onClick,
  variant,
  disabled = false
}: SmallButtonProps): JSX.Element {
  return (
    <Button
      size="slim"
      variant={variant}
      disabled={disabled}
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
  },

  critical: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function CriticalButton() {
  return <Button tone="critical">Delete</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Delete',
  ui: 'danger',
  style: {
    backgroundColor: '#d72c0d',
    borderColor: '#d72c0d',
    color: 'white'
  },
  handler: function() {
    console.log('Delete clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--critical">Delete</button>

<script>
const criticalButton = document.querySelector('.polaris-button--critical');

criticalButton.addEventListener('click', () => {
  console.log('Delete clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface CriticalButtonProps {
  label?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  disabled?: boolean;
  loading?: boolean;
}

function CriticalButton({
  label = 'Delete',
  onClick,
  variant,
  disabled = false,
  loading = false
}: CriticalButtonProps): JSX.Element {
  return (
    <Button
      tone="critical"
      variant={variant}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
    >
      {label}
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
  },

  groups: {
    react: `import { Select } from '@shopify/polaris';
import { useState } from 'react';

function SelectWithGroupsExample() {
  const [selected, setSelected] = useState('');

  const groupedOptions = [
    {label: 'Select a product category', value: ''},
    {label: 'Electronics', options: [
      {label: 'Smartphones', value: 'smartphones'},
      {label: 'Laptops', value: 'laptops'},
      {label: 'Tablets', value: 'tablets'},
    ]},
    {label: 'Clothing', options: [
      {label: "Men's Clothing", value: 'mens'},
      {label: "Women's Clothing", value: 'womens'},
      {label: "Children's Clothing", value: 'children'},
    ]},
    {label: 'Home & Garden', options: [
      {label: 'Furniture', value: 'furniture'},
      {label: 'Decor', value: 'decor'},
      {label: 'Garden Supplies', value: 'garden'},
    ]},
  ];

  return (
    <Select
      label="Product category"
      options={groupedOptions}
      value={selected}
      onChange={setSelected}
      placeholder="Select a category"
    />
  );
}

export default SelectWithGroupsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-select-wrapper">
  <label class="polaris-label">Product category</label>
  <select class="polaris-select" id="category-select">
    <option value="">Select a product category</option>
    <optgroup label="Electronics">
      <option value="smartphones">Smartphones</option>
      <option value="laptops">Laptops</option>
      <option value="tablets">Tablets</option>
    </optgroup>
    <optgroup label="Clothing">
      <option value="mens">Men's Clothing</option>
      <option value="womens">Women's Clothing</option>
      <option value="children">Children's Clothing</option>
    </optgroup>
    <optgroup label="Home & Garden">
      <option value="furniture">Furniture</option>
      <option value="decor">Decor</option>
      <option value="garden">Garden Supplies</option>
    </optgroup>
  </select>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const selectEl = $('#category-select');

on(selectEl, 'change', (e) => {
  const selectedValue = e.target.value;
  const selectedText = e.target.options[e.target.selectedIndex].text;
  const groupLabel = e.target.options[e.target.selectedIndex].parentElement.label;

  console.log('Selected:', selectedValue, 'in group:', groupLabel);
  EventBus.emit('category:changed', {
    value: selectedValue,
    text: selectedText,
    group: groupLabel
  });
});
</script>`,

    extjs: `// ExtJS ComboBox with grouped options
Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Product category',
  store: Ext.create('Ext.data.Store', {
    fields: ['value', 'label', 'group'],
    data: [
      {value: '', label: 'Select a product category', group: ''},
      // Electronics
      {value: 'smartphones', label: 'Smartphones', group: 'Electronics'},
      {value: 'laptops', label: 'Laptops', group: 'Electronics'},
      {value: 'tablets', label: 'Tablets', group: 'Electronics'},
      // Clothing
      {value: 'mens', label: "Men's Clothing", group: 'Clothing'},
      {value: 'womens', label: "Women's Clothing", group: 'Clothing'},
      {value: 'children', label: "Children's Clothing", group: 'Clothing'},
      // Home & Garden
      {value: 'furniture', label: 'Furniture', group: 'Home & Garden'},
      {value: 'decor', label: 'Decor', group: 'Home & Garden'},
      {value: 'garden', label: 'Garden Supplies', group: 'Home & Garden'}
    ],
    groupField: 'group'
  }),
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  editable: false,
  emptyText: 'Select a category',
  renderTo: Ext.getBody(),
  listConfig: {
    features: [{
      ftype: 'grouping',
      groupHeaderTpl: '{name}'
    }]
  },
  listeners: {
    change: function(combo, newValue) {
      const record = combo.findRecordByValue(newValue);
      if (record) {
        console.log('Selected:', newValue, 'in group:', record.get('group'));
        EventBus.emit('category:changed', {
          value: newValue,
          text: record.get('label'),
          group: record.get('group')
        });
      }
    }
  }
});`,

    typescript: `import { Select } from '@shopify/polaris';
import { useState } from 'react';

interface OptionGroup {
  label: string;
  value?: string;
  options?: Array<{label: string; value: string}>;
}

interface SelectWithGroupsProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

function SelectWithGroupsExample({
  label = 'Product category',
  placeholder = 'Select a category',
  onChange
}: SelectWithGroupsProps): JSX.Element {
  const [selected, setSelected] = useState<string>('');

  const groupedOptions: OptionGroup[] = [
    {label: 'Select a product category', value: ''},
    {label: 'Electronics', options: [
      {label: 'Smartphones', value: 'smartphones'},
      {label: 'Laptops', value: 'laptops'},
      {label: 'Tablets', value: 'tablets'},
    ]},
    {label: 'Clothing', options: [
      {label: "Men's Clothing", value: 'mens'},
      {label: "Women's Clothing", value: 'womens'},
      {label: "Children's Clothing", value: 'children'},
    ]},
    {label: 'Home & Garden', options: [
      {label: 'Furniture', value: 'furniture'},
      {label: 'Decor', value: 'decor'},
      {label: 'Garden Supplies', value: 'garden'},
    ]},
  ];

  const handleChange = (value: string): void => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <Select
      label={label}
      options={groupedOptions}
      value={selected}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}

export default SelectWithGroupsExample;`
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
  },

  error: {
    react: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

function CheckboxWithErrorExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Age verification"
      checked={checked}
      onChange={setChecked}
      error="You must be 18 or older to continue"
    />
  );
}

export default CheckboxWithErrorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-checkbox-wrapper">
  <label class="polaris-checkbox-label">
    <input type="checkbox" class="polaris-checkbox polaris-checkbox--error" id="age-checkbox" />
    <span class="polaris-checkbox-label-text">Age verification</span>
  </label>
  <div class="polaris-error" id="age-error">You must be 18 or older to continue</div>
</div>

<script>
import { $, on, removeClass } from '@cin7/vanilla-js';

const checkbox = $('#age-checkbox');
const errorEl = $('#age-error');

on(checkbox, 'change', (e) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    removeClass(checkbox, 'polaris-checkbox--error');
    errorEl.style.display = 'none';
  } else {
    errorEl.style.display = 'block';
  }
});
</script>`,

    extjs: `// ExtJS Checkbox with error state
Ext.create('Ext.form.field.Checkbox', {
  boxLabel: 'Age verification',
  checked: false,
  msgTarget: 'under',
  activeError: 'You must be 18 or older to continue',
  renderTo: Ext.getBody(),
  listeners: {
    change: function(checkbox, newValue) {
      if (newValue) {
        checkbox.clearInvalid();
      } else {
        checkbox.markInvalid('You must be 18 or older to continue');
      }
    }
  }
});`,

    typescript: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

interface CheckboxWithErrorProps {
  label?: string;
  error?: string;
  onChange?: (checked: boolean) => void;
}

function CheckboxWithErrorExample({
  label = 'Age verification',
  error = 'You must be 18 or older to continue',
  onChange
}: CheckboxWithErrorProps): JSX.Element {
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
      error={error}
    />
  );
}

export default CheckboxWithErrorExample;`
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
  },

  error: {
    react: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

function RadioButtonWithErrorExample() {
  const [selected, setSelected] = useState('');

  return (
    <RadioButton
      label="Invalid option"
      name="option"
      value="invalid"
      checked={selected === 'invalid'}
      onChange={() => setSelected('invalid')}
      error="This option is not available in your region"
    />
  );
}

export default RadioButtonWithErrorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-radio-wrapper">
  <label class="polaris-radio-label">
    <input
      type="radio"
      class="polaris-radio polaris-radio--error"
      name="option"
      value="invalid"
      id="invalid-radio"
    />
    <span class="polaris-radio-label-text">Invalid option</span>
  </label>
  <div class="polaris-error" id="option-error">This option is not available in your region</div>
</div>

<script>
import { $, on, removeClass } from '@cin7/vanilla-js';

const radio = $('#invalid-radio');
const errorEl = $('#option-error');

on(radio, 'change', (e) => {
  if (e.target.checked) {
    console.log('Invalid option selected');
    // Show error message to user
    errorEl.style.display = 'block';
  }
});
</script>`,

    extjs: `// ExtJS Radio Button with error state
Ext.create('Ext.form.field.Radio', {
  boxLabel: 'Invalid option',
  name: 'option',
  inputValue: 'invalid',
  msgTarget: 'under',
  activeError: 'This option is not available in your region',
  renderTo: Ext.getBody(),
  listeners: {
    change: function(radio, newValue) {
      if (newValue) {
        radio.markInvalid('This option is not available in your region');
      }
    }
  }
});`,

    typescript: `import { RadioButton } from '@shopify/polaris';
import { useState } from 'react';

interface RadioButtonWithErrorProps {
  label?: string;
  name?: string;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
}

function RadioButtonWithErrorExample({
  label = 'Invalid option',
  name = 'option',
  value = 'invalid',
  error = 'This option is not available in your region',
  onChange
}: RadioButtonWithErrorProps): JSX.Element {
  const [selected, setSelected] = useState<string>('');

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
      error={error}
    />
  );
}

export default RadioButtonWithErrorExample;`
  }
};

// Avatar Component Examples
export const avatarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Avatar } from '@shopify/polaris';
import React from 'react';

function AvatarExample() {
  return <Avatar name="John Doe" size="medium" />;
}

export default AvatarExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-avatar polaris-avatar--medium">
  <span class="polaris-avatar__initials">JD</span>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar } from '@cin7/vanilla-js';

const avatar = createAvatar({
  name: 'John Doe',
  size: 'medium',
  generateInitials: (name) => {
    return name.split(' ').map(n => n[0]).join('');
  }
});

document.getElementById('user-profile').appendChild(avatar);
</script>`,

    extjs: `// ExtJS Avatar using @cin7/extjs-adapters
Ext.create('Ext.Component', {
  cls: 'polaris-avatar',
  html: '<span class="polaris-avatar__initials">JD</span>',
  width: 40,
  height: 40,
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisAvatar } from '@cin7/extjs-adapters';

const avatar = Ext.create('PolarisAvatar', {
  name: 'John Doe',
  size: 'medium',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar } from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  name: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  source?: string;
  initials?: string;
  customer?: boolean;
}

function AvatarExample({
  name,
  size = 'medium',
  source,
  initials,
  customer = false
}: AvatarExampleProps): JSX.Element {
  return (
    <Avatar
      name={name}
      size={size}
      source={source}
      initials={initials}
      customer={customer}
    />
  );
}

export default AvatarExample;`
  }
};

// MediaCard Component Examples
export const mediacardExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

function MediaCardExample() {
  return (
    <MediaCard
      title="Modern Office Chair"
      description="Ergonomic office chair with lumbar support and adjustable armrests. Perfect for long working hours."
      portrait
      primaryAction={{
        content: 'View details',
        onAction: () => console.log('View details clicked'),
      }}
    />
  );
}

export default MediaCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card">
  <div class="polaris-media-card__media">
    <img src="placeholder.jpg" alt="Modern Office Chair" />
  </div>
  <div class="polaris-media-card__content">
    <h3 class="polaris-media-card__title">Modern Office Chair</h3>
    <p class="polaris-media-card__description">
      Ergonomic office chair with lumbar support and adjustable armrests.
      Perfect for long working hours.
    </p>
    <button class="polaris-button polaris-button--primary">View details</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createMediaCard } from '@cin7/vanilla-js';

const mediaCard = createMediaCard({
  title: 'Modern Office Chair',
  description: 'Ergonomic office chair with lumbar support and adjustable armrests.',
  portrait: true,
  primaryAction: {
    content: 'View details',
    onClick: () => {
      console.log('View details clicked');
    }
  }
});

document.getElementById('product-section').appendChild(mediaCard);
</script>`,

    extjs: `// ExtJS MediaCard using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-media-card',
  title: 'Modern Office Chair',
  bodyPadding: 16,
  html: 'Ergonomic office chair with lumbar support and adjustable armrests. Perfect for long working hours.',
  buttons: [{
    text: 'View details',
    ui: 'primary',
    handler: function() {
      console.log('View details clicked');
    }
  }],
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisMediaCard } from '@cin7/extjs-adapters';

const mediaCard = Ext.create('PolarisMediaCard', {
  title: 'Modern Office Chair',
  description: 'Ergonomic office chair with lumbar support and adjustable armrests.',
  portrait: true,
  primaryAction: {
    text: 'View details',
    handler: function() {
      console.log('View details clicked');
    }
  }
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

interface MediaCardExampleProps {
  title: string;
  description: string;
  portrait?: boolean;
  primaryAction?: {
    content: string;
    onAction: () => void;
  };
  secondaryAction?: {
    content: string;
    onAction: () => void;
  };
}

function MediaCardExample({
  title,
  description,
  portrait = false,
  primaryAction,
  secondaryAction
}: MediaCardExampleProps): JSX.Element {
  return (
    <MediaCard
      title={title}
      description={description}
      portrait={portrait}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    />
  );
}

export default MediaCardExample;`
  }
};

// Thumbnail Component Examples
export const thumbnailExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Thumbnail } from '@shopify/polaris';
import React from 'react';

function ThumbnailExample() {
  return (
    <Thumbnail
      size="medium"
      source="https://picsum.photos/seed/product1/200/200.jpg"
      alt="Product image"
    />
  );
}

export default ThumbnailExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-thumbnail polaris-thumbnail--medium">
  <img
    src="https://picsum.photos/seed/product1/200/200.jpg"
    alt="Product image"
    class="polaris-thumbnail__image"
  />
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createThumbnail } from '@cin7/vanilla-js';

const thumbnail = createThumbnail({
  size: 'medium',
  source: 'https://picsum.photos/seed/product1/200/200.jpg',
  alt: 'Product image',
  onClick: () => {
    console.log('Thumbnail clicked');
  }
});

document.getElementById('product-gallery').appendChild(thumbnail);
</script>`,

    extjs: `// ExtJS Thumbnail using @cin7/extjs-adapters
Ext.create('Ext.Img', {
  src: 'https://picsum.photos/seed/product1/200/200.jpg',
  alt: 'Product image',
  cls: 'polaris-thumbnail polaris-thumbnail--medium',
  width: 80,
  height: 80,
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisThumbnail } from '@cin7/extjs-adapters';

const thumbnail = Ext.create('PolarisThumbnail', {
  size: 'medium',
  source: 'https://picsum.photos/seed/product1/200/200.jpg',
  alt: 'Product image',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Thumbnail } from '@shopify/polaris';
import React from 'react';

interface ThumbnailExampleProps {
  size?: 'small' | 'medium' | 'large';
  source: string;
  alt: string;
  transparent?: boolean;
}

function ThumbnailExample({
  size = 'medium',
  source,
  alt,
  transparent = false
}: ThumbnailExampleProps): JSX.Element {
  return (
    <Thumbnail
      size={size}
      source={source}
      alt={alt}
      transparent={transparent}
    />
  );
}

export default ThumbnailExample;`
  }
};

// VideoThumbnail Component Examples
export const videothumbnailExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { VideoThumbnail } from '@shopify/polaris';
import React from 'react';

function VideoThumbnailExample() {
  return (
    <VideoThumbnail
      thumbnailUrl="https://picsum.photos/seed/video1/640/360.jpg"
      videoLength={120}
      thumbnailAlt="Video thumbnail preview"
    />
  );
}

export default VideoThumbnailExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-video-thumbnail">
  <img
    src="https://picsum.photos/seed/video1/640/360.jpg"
    alt="Video thumbnail preview"
    class="polaris-video-thumbnail__image"
  />
  <div class="polaris-video-thumbnail__play-button">
    <svg viewBox="0 0 20 20" class="polaris-icon">
      <path d="M6 4l10 6-10 6V4z"/>
    </svg>
  </div>
  <div class="polaris-video-thumbnail__duration">2:00</div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createVideoThumbnail } from '@cin7/vanilla-js';

const videoThumbnail = createVideoThumbnail({
  thumbnailUrl: 'https://picsum.photos/seed/video1/640/360.jpg',
  videoLength: 120,
  alt: 'Video thumbnail preview',
  onPlaybackStart: () => {
    console.log('Video playback started');
  }
});

document.getElementById('video-section').appendChild(videoThumbnail);
</script>`,

    extjs: `// ExtJS VideoThumbnail using @cin7/extjs-adapters
Ext.create('Ext.Container', {
  cls: 'polaris-video-thumbnail',
  layout: 'fit',
  items: [{
    xtype: 'image',
    src: 'https://picsum.photos/seed/video1/640/360.jpg',
    alt: 'Video thumbnail preview'
  }],
  listeners: {
    el: {
      click: function() {
        console.log('Video playback started');
      }
    }
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisVideoThumbnail } from '@cin7/extjs-adapters';

const videoThumbnail = Ext.create('PolarisVideoThumbnail', {
  thumbnailUrl: 'https://picsum.photos/seed/video1/640/360.jpg',
  videoLength: 120,
  alt: 'Video thumbnail preview',
  onPlaybackStart: function() {
    console.log('Video playback started');
  }
});`,

    typescript: `import { VideoThumbnail } from '@shopify/polaris';
import React from 'react';

interface VideoThumbnailExampleProps {
  thumbnailUrl: string;
  videoLength: number;
  thumbnailAlt: string;
  showProgress?: boolean;
  accessibilityLabel?: string;
  onPlaybackStart?: () => void;
}

function VideoThumbnailExample({
  thumbnailUrl,
  videoLength,
  thumbnailAlt,
  showProgress = false,
  accessibilityLabel,
  onPlaybackStart
}: VideoThumbnailExampleProps): JSX.Element {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <VideoThumbnail
      thumbnailUrl={thumbnailUrl}
      videoLength={videoLength}
      thumbnailAlt={thumbnailAlt}
      showProgress={showProgress}
      accessibilityLabel={accessibilityLabel || \`Video duration \${formatTime(videoLength)}\`}
      onPlaybackStart={onPlaybackStart}
    />
  );
}

export default VideoThumbnailExample;`
  }
};

// ==============================================================
// DATA DISPLAY COMPONENT CODE VARIANTS
// ==============================================================
// This file contains multi-language code examples for Data Display components.
// To be integrated into codeVariants.ts before "// Utility function to get code variants"

// DataTable Component Examples
export const dataTableExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DataTable } from '@shopify/polaris';
import React from 'react';

function DataTableExample() {
  const rows = [
    ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
    ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
    ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
  ];

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
      headings={['Order', 'Date', 'Total', 'Items', 'Status']}
      rows={rows}
    />
  );
}

export default DataTableExample;`,

    vanilla: `import { createDataTable, EventBus } from '@cin7/vanilla-js';

// Define table data
const tableData = {
  headings: ['Order', 'Date', 'Total', 'Items', 'Status'],
  rows: [
    ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
    ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
    ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
  ],
  columnTypes: ['text', 'text', 'numeric', 'text', 'text']
};

// Create and render data table
const dataTable = createDataTable(tableData);
document.getElementById('app').appendChild(dataTable);

// Listen for row click events
EventBus.on('datatable:row:click', (event) => {
  console.log('Row clicked:', event.detail.rowData);
});`,

    extjs: `import { PolarisDataTable } from '@cin7/extjs-adapters';

// Create DataTable using ExtJS adapter
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  items: [{
    xtype: 'polarisdatatable',
    headings: ['Order', 'Date', 'Total', 'Items', 'Status'],
    columnContentTypes: ['text', 'text', 'numeric', 'text', 'text'],
    rows: [
      ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
      ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
      ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
    ],
    listeners: {
      rowclick: function(table, rowIndex, rowData) {
        console.log('Row clicked:', rowData);
      }
    }
  }]
});`,

    typescript: `import { DataTable } from '@shopify/polaris';
import React from 'react';

interface OrderRow {
  order: string;
  date: string;
  total: string;
  items: string;
  status: string;
}

interface DataTableExampleProps {
  orders?: OrderRow[];
}

function DataTableExample({ orders }: DataTableExampleProps): JSX.Element {
  const defaultOrders: OrderRow[] = [
    { order: '#1020', date: 'Jul 20 at 3:46pm', total: '$42.00', items: '2 items', status: 'Fulfilled' },
    { order: '#1019', date: 'Jul 20 at 2:31pm', total: '$125.00', items: '5 items', status: 'Unfulfilled' },
    { order: '#1018', date: 'Jul 20 at 1:22pm', total: '$89.00', items: '3 items', status: 'Fulfilled' },
  ];

  const data = orders || defaultOrders;

  const rows = data.map(order => [
    order.order,
    order.date,
    order.total,
    order.items,
    order.status
  ]);

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
      headings={['Order', 'Date', 'Total', 'Items', 'Status']}
      rows={rows}
    />
  );
}

export default DataTableExample;`
  }
};

// DescriptionList Component Examples
export const descriptionListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

function DescriptionListExample() {
  const items = [
    { term: 'Order number', description: '#1001' },
    { term: 'Date', description: 'July 21, 2023' },
    { term: 'Status', description: 'Fulfilled' },
    { term: 'Payment status', description: 'Paid' },
  ];

  return <DescriptionList items={items} />;
}

export default DescriptionListExample;`,

    vanilla: `import { createDescriptionList } from '@cin7/vanilla-js';

// Define description list items
const items = [
  { term: 'Order number', description: '#1001' },
  { term: 'Date', description: 'July 21, 2023' },
  { term: 'Status', description: 'Fulfilled' },
  { term: 'Payment status', description: 'Paid' },
];

// Create and render description list
const descriptionList = createDescriptionList({ items });
document.getElementById('app').appendChild(descriptionList);`,

    extjs: `import { PolarisDescriptionList } from '@cin7/extjs-adapters';

// Create DescriptionList using ExtJS adapter
Ext.create('Cin7.component.PolarisDescriptionList', {
  renderTo: Ext.getBody(),
  items: [
    { term: 'Order number', description: '#1001' },
    { term: 'Date', description: 'July 21, 2023' },
    { term: 'Status', description: 'Fulfilled' },
    { term: 'Payment status', description: 'Paid' },
  ]
});`,

    typescript: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

interface DescriptionItem {
  term: string;
  description: string | React.ReactNode;
}

interface DescriptionListExampleProps {
  items?: DescriptionItem[];
  spacing?: 'tight' | 'loose';
  columns?: 1 | 2 | 3;
}

function DescriptionListExample({
  items,
  spacing = 'base',
  columns
}: DescriptionListExampleProps): JSX.Element {
  const defaultItems: DescriptionItem[] = [
    { term: 'Order number', description: '#1001' },
    { term: 'Date', description: 'July 21, 2023' },
    { term: 'Status', description: 'Fulfilled' },
    { term: 'Payment status', description: 'Paid' },
  ];

  return (
    <DescriptionList
      items={items || defaultItems}
      spacing={spacing}
      columns={columns}
    />
  );
}

export default DescriptionListExample;`
  }
};

// ExceptionList Component Examples
export const exceptionListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ExceptionList } from '@shopify/polaris';
import React from 'react';

function ExceptionListExample() {
  const items = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method declined',
      description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Inventory running low',
      description: 'You have 5 items that are running low on stock. Consider restocking soon.',
    },
  ];

  return <ExceptionList items={items} />;
}

export default ExceptionListExample;`,

    vanilla: `import { createExceptionList, EventBus } from '@cin7/vanilla-js';

// Define exception items
const exceptions = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Payment method declined',
    description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Inventory running low',
    description: 'You have 5 items that are running low on stock. Consider restocking soon.',
  },
];

// Create and render exception list
const exceptionList = createExceptionList({ items: exceptions });
document.getElementById('app').appendChild(exceptionList);

// Listen for action clicks
EventBus.on('exceptionlist:action:click', (event) => {
  console.log('Exception action clicked:', event.detail);
});`,

    extjs: `import { PolarisExceptionList } from '@cin7/extjs-adapters';

// Create ExceptionList using ExtJS adapter
Ext.create('Cin7.component.PolarisExceptionList', {
  renderTo: Ext.getBody(),
  items: [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method declined',
      description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Inventory running low',
      description: 'You have 5 items that are running low on stock. Consider restocking soon.',
    },
  ]
});`,

    typescript: `import { ExceptionList } from '@shopify/polaris';
import React from 'react';

interface ExceptionItem {
  status: 'critical' | 'warning' | 'success' | 'info';
  icon?: string;
  title: string;
  description?: string;
  action?: {
    content: string;
    onAction: () => void;
  };
}

interface ExceptionListExampleProps {
  items?: ExceptionItem[];
  onActionClick?: (item: ExceptionItem) => void;
}

function ExceptionListExample({
  items,
  onActionClick
}: ExceptionListExampleProps): JSX.Element {
  const defaultItems: ExceptionItem[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method declined',
      description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Inventory running low',
      description: 'You have 5 items that are running low on stock. Consider restocking soon.',
    },
  ];

  return <ExceptionList items={items || defaultItems} />;
}

export default ExceptionListExample;`
  }
};

// IndexTable Component Examples
export const indexTableExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { IndexTable, LegacyCard, Badge } from '@shopify/polaris';
import React from 'react';

function IndexTableExample() {
  const orders = [
    { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
    { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
    { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
  ];

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        headings={[
          { title: 'Product' },
          { title: 'SKU' },
          { title: 'Price', alignment: 'end' },
          { title: 'Stock', alignment: 'end' },
          { title: 'Status', alignment: 'center' },
        ]}
        selectable={false}
      >
        {orders.map(({ id, name, sku, price, quantity, status }, index) => (
          <IndexTable.Row id={id} key={id} position={index}>
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{sku}</IndexTable.Cell>
            <IndexTable.Cell numeric>\${price.toFixed(2)}</IndexTable.Cell>
            <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
            <IndexTable.Cell>
              <Badge status={status === 'Active' ? 'success' : 'info'}>
                {status}
              </Badge>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </LegacyCard>
  );
}

export default IndexTableExample;`,

    vanilla: `import { createIndexTable, EventBus } from '@cin7/vanilla-js';

// Define table data
const tableData = {
  resourceName: { singular: 'product', plural: 'products' },
  headings: [
    { title: 'Product' },
    { title: 'SKU' },
    { title: 'Price', alignment: 'end' },
    { title: 'Stock', alignment: 'end' },
    { title: 'Status', alignment: 'center' },
  ],
  rows: [
    { id: '1020', cells: ['T-Shirt', 'TS001', '$25.00', '50', 'Active'] },
    { id: '1019', cells: ['Coffee Mug', 'CM002', '$12.00', '89', 'Active'] },
    { id: '1018', cells: ['Wireless Mouse', 'WM003', '$45.00', '0', 'Archived'] },
  ]
};

// Create and render index table
const indexTable = createIndexTable(tableData);
document.getElementById('app').appendChild(indexTable);

// Listen for selection changes
EventBus.on('indextable:selection:change', (event) => {
  console.log('Selection changed:', event.detail.selectedIds);
});`,

    extjs: `import { PolarisIndexTable } from '@cin7/extjs-adapters';

// Create IndexTable using ExtJS Grid adapter
Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  polarisAdapter: true,
  title: 'Products',
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'sku', 'price', 'quantity', 'status'],
    data: [
      { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
      { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
      { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
    ]
  }),
  columns: [
    { text: 'Product', dataIndex: 'name', flex: 1 },
    { text: 'SKU', dataIndex: 'sku', width: 120 },
    { text: 'Price', dataIndex: 'price', width: 100, align: 'right',
      renderer: function(value) { return '$' + value.toFixed(2); }
    },
    { text: 'Stock', dataIndex: 'quantity', width: 100, align: 'right' },
    { text: 'Status', dataIndex: 'status', width: 120, align: 'center' }
  ],
  selModel: {
    mode: 'MULTI'
  }
});`,

    typescript: `import { IndexTable, LegacyCard, Badge, IndexTableProps } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  status: 'Active' | 'Archived';
}

interface IndexTableExampleProps {
  products?: Product[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

function IndexTableExample({
  products,
  onSelectionChange
}: IndexTableExampleProps): JSX.Element {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const defaultProducts: Product[] = [
    { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
    { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
    { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
  ];

  const data = products || defaultProducts;

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
    onSelectionChange?.(ids);
  }, [onSelectionChange]);

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={selectedIds.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: 'Product' },
          { title: 'SKU' },
          { title: 'Price', alignment: 'end' },
          { title: 'Stock', alignment: 'end' },
          { title: 'Status', alignment: 'center' },
        ]}
      >
        {data.map(({ id, name, sku, price, quantity, status }, index) => (
          <IndexTable.Row
            id={id}
            key={id}
            position={index}
            selected={selectedIds.includes(id)}
          >
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{sku}</IndexTable.Cell>
            <IndexTable.Cell numeric>\${price.toFixed(2)}</IndexTable.Cell>
            <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
            <IndexTable.Cell>
              <Badge status={status === 'Active' ? 'success' : 'info'}>
                {status}
              </Badge>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </LegacyCard>
  );
}

export default IndexTableExample;`
  }
};

// List Component Examples
export const listExamples: Record<string, CodeVariant> = {
  bulleted: {
    react: `import { List } from '@shopify/polaris';
import React from 'react';

function ListExample() {
  return (
    <List>
      <List.Item>First item in the list</List.Item>
      <List.Item>Second item in the list</List.Item>
      <List.Item>Third item in the list</List.Item>
    </List>
  );
}

export default ListExample;`,

    vanilla: `import { createList } from '@cin7/vanilla-js';

// Define list items
const items = [
  'First item in the list',
  'Second item in the list',
  'Third item in the list'
];

// Create and render list
const list = createList({
  items,
  type: 'bullet'
});

document.getElementById('app').appendChild(list);`,

    extjs: `import { PolarisList } from '@cin7/extjs-adapters';

// Create List using ExtJS panel
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  html: \`
    <ul class="polaris-list">
      <li class="polaris-list-item">First item in the list</li>
      <li class="polaris-list-item">Second item in the list</li>
      <li class="polaris-list-item">Third item in the list</li>
    </ul>
  \`
});

// Or using custom component
Ext.create('Cin7.component.PolarisList', {
  renderTo: Ext.getBody(),
  listType: 'bullet',
  items: [
    { text: 'First item in the list' },
    { text: 'Second item in the list' },
    { text: 'Third item in the list' }
  ]
});`,

    typescript: `import { List } from '@shopify/polaris';
import React from 'react';

interface ListItem {
  id?: string;
  content: string | React.ReactNode;
  icon?: React.ComponentType;
}

interface ListExampleProps {
  items?: ListItem[];
  type?: 'bullet' | 'number';
  gap?: 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
}

function ListExample({
  items,
  type = 'bullet',
  gap
}: ListExampleProps): JSX.Element {
  const defaultItems: ListItem[] = [
    { id: '1', content: 'First item in the list' },
    { id: '2', content: 'Second item in the list' },
    { id: '3', content: 'Third item in the list' }
  ];

  const data = items || defaultItems;

  return (
    <List type={type} gap={gap}>
      {data.map((item, index) => (
        <List.Item key={item.id || index} icon={item.icon}>
          {item.content}
        </List.Item>
      ))}
    </List>
  );
}

export default ListExample;`
  }
};

// ResourceItem Component Examples
export const resourceItemExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ResourceItem, ResourceList, Card } from '@shopify/polaris';
import React from 'react';

function ResourceItemExample() {
  const product = {
    id: '1',
    name: 'Basic T-Shirt',
    sku: 'TSHIRT-BASIC-001',
    price: '$29.99',
    stock: 50,
  };

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: 'product', plural: 'products' }}
        items={[product]}
        renderItem={(item) => (
          <ResourceItem
            id={item.id}
            name={item.name}
            accessibilityLabel={\`View details for \${item.name}\`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>SKU: {item.sku}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '500' }}>{item.price}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>{item.stock} in stock</div>
              </div>
            </div>
          </ResourceItem>
        )}
      />
    </Card>
  );
}

export default ResourceItemExample;`,

    vanilla: `import { createResourceItem, EventBus } from '@cin7/vanilla-js';

// Define resource item
const product = {
  id: '1',
  name: 'Basic T-Shirt',
  sku: 'TSHIRT-BASIC-001',
  price: '$29.99',
  stock: 50,
};

// Create resource item
const resourceItem = createResourceItem({
  id: product.id,
  name: product.name,
  content: \`
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 500; margin-bottom: 4px;">\\\${product.name}</div>
        <div style="color: #6b7280; font-size: 14px;">SKU: \\\${product.sku}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 500;">\\\${product.price}</div>
        <div style="color: #6b7280; font-size: 14px;">\\\${product.stock} in stock</div>
      </div>
    </div>
  \`,
  accessibilityLabel: \`View details for \\\${product.name}\`
});

document.getElementById('app').appendChild(resourceItem);

// Listen for item click
EventBus.on('resourceitem:click', (event) => {
  console.log('Resource item clicked:', event.detail.id);
});`,

    extjs: `import { PolarisResourceItem } from '@cin7/extjs-adapters';

// Create ResourceItem using ExtJS dataview
Ext.create('Ext.view.View', {
  renderTo: Ext.getBody(),
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'sku', 'price', 'stock'],
    data: [{
      id: '1',
      name: 'Basic T-Shirt',
      sku: 'TSHIRT-BASIC-001',
      price: '$29.99',
      stock: 50
    }]
  }),
  tpl: [
    '<tpl for=".">',
    '<div class="resource-item" data-id="{id}">',
    '  <div style="display: flex; justify-content: space-between; align-items: center;">',
    '    <div>',
    '      <div style="font-weight: 500; margin-bottom: 4px;">{name}</div>',
    '      <div style="color: #6b7280; font-size: 14px;">SKU: {sku}</div>',
    '    </div>',
    '    <div style="text-align: right;">',
    '      <div style="font-weight: 500;">{price}</div>',
    '      <div style="color: #6b7280; font-size: 14px;">{stock} in stock</div>',
    '    </div>',
    '  </div>',
    '</div>',
    '</tpl>'
  ],
  itemSelector: 'div.resource-item',
  listeners: {
    itemclick: function(view, record) {
      console.log('Resource item clicked:', record.getData());
    }
  }
});`,

    typescript: `import { ResourceItem, ResourceList, Card } from '@shopify/polaris';
import React from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
}

interface ResourceItemExampleProps {
  product?: Product;
  onItemClick?: (id: string) => void;
}

function ResourceItemExample({
  product,
  onItemClick
}: ResourceItemExampleProps): JSX.Element {
  const defaultProduct: Product = {
    id: '1',
    name: 'Basic T-Shirt',
    sku: 'TSHIRT-BASIC-001',
    price: '$29.99',
    stock: 50,
  };

  const item = product || defaultProduct;

  const handleClick = () => {
    onItemClick?.(item.id);
  };

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: 'product', plural: 'products' }}
        items={[item]}
        renderItem={(product) => (
          <ResourceItem
            id={product.id}
            name={product.name}
            accessibilityLabel={\`View details for \\\${product.name}\`}
            onClick={handleClick}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>SKU: {product.sku}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '500' }}>{product.price}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>{product.stock} in stock</div>
              </div>
            </div>
          </ResourceItem>
        )}
      />
    </Card>
  );
}

export default ResourceItemExample;`
  }
};

// ResourceList Component Examples
export const resourceListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ResourceList, Card, Thumbnail, Text, Badge } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function ResourceListExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const products = [
    {
      id: '1',
      name: 'Basic T-Shirt',
      description: 'Comfortable cotton t-shirt in various colors',
      price: 25.00,
      status: 'Active',
      stock: 150,
      image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
    },
    {
      id: '2',
      name: 'Coffee Mug',
      description: 'Ceramic mug with modern design',
      price: 12.00,
      status: 'Active',
      stock: 89,
      image: 'https://picsum.photos/seed/mug/100/100.jpg',
    },
  ];

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
  }, []);

  return (
    <ResourceList
      resourceName={{ singular: 'product', plural: 'products' }}
      items={products}
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
      renderItem={(item) => {
        const { id, name, description, price, status, stock, image } = item;
        const media = <Thumbnail size="small" alt={name} source={image} />;
        const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

        return (
          <ResourceList.Item
            id={id}
            media={media}
            accessibilityLabel={\`View details for \${name}\`}
          >
            <div style={{ flex: 1 }}>
              <Text variant="bodyMd" fontWeight="semibold" as="h3">
                {name}
              </Text>
              <Text color="subdued" as="p">
                {description}
              </Text>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                <Text variant="bodyMd" fontWeight="medium">
                  \${price.toFixed(2)}
                </Text>
                {statusBadge}
                <Text color="subdued" variant="bodySm">
                  {stock} in stock
                </Text>
              </div>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default ResourceListExample;`,

    vanilla: `import { createResourceList, EventBus } from '@cin7/vanilla-js';

// Define resource list data
const products = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 25.00,
    status: 'Active',
    stock: 150,
    image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
  },
  {
    id: '2',
    name: 'Coffee Mug',
    description: 'Ceramic mug with modern design',
    price: 12.00,
    status: 'Active',
    stock: 89,
    image: 'https://picsum.photos/seed/mug/100/100.jpg',
  },
];

// Create resource list
const resourceList = createResourceList({
  resourceName: { singular: 'product', plural: 'products' },
  items: products,
  renderItem: (item) => {
    return \`
      <div class="resource-item" data-id="\${item.id}">
        <img src="\${item.image}" alt="\${item.name}" class="resource-item-image" />
        <div class="resource-item-content">
          <h3 class="resource-item-title">\${item.name}</h3>
          <p class="resource-item-description">\${item.description}</p>
          <div class="resource-item-meta">
            <span class="resource-item-price">$\${item.price.toFixed(2)}</span>
            <span class="resource-item-status badge-\${item.status.toLowerCase()}">\${item.status}</span>
            <span class="resource-item-stock">\${item.stock} in stock</span>
          </div>
        </div>
      </div>
    \`;
  }
});

document.getElementById('app').appendChild(resourceList);

// Listen for selection changes
EventBus.on('resourcelist:selection:change', (event) => {
  console.log('Selection changed:', event.detail.selectedIds);
});`,

    extjs: `import { PolarisResourceList } from '@cin7/extjs-adapters';

// Create ResourceList using ExtJS Grid
Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  title: 'Products',
  polarisAdapter: true,
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'description', 'price', 'status', 'stock', 'image'],
    data: [
      {
        id: '1',
        name: 'Basic T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors',
        price: 25.00,
        status: 'Active',
        stock: 150,
        image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
      },
      {
        id: '2',
        name: 'Coffee Mug',
        description: 'Ceramic mug with modern design',
        price: 12.00,
        status: 'Active',
        stock: 89,
        image: 'https://picsum.photos/seed/mug/100/100.jpg',
      },
    ]
  }),
  columns: [
    {
      text: 'Product',
      dataIndex: 'name',
      flex: 1,
      renderer: function(value, metaData, record) {
        return \`
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="\${record.get('image')}" alt="\${value}" style="width: 40px; height: 40px; border-radius: 4px;" />
            <div>
              <div style="font-weight: 500;">\${value}</div>
              <div style="color: #6b7280; font-size: 13px;">\${record.get('description')}</div>
            </div>
          </div>
        \`;
      }
    },
    {
      text: 'Price',
      dataIndex: 'price',
      width: 100,
      align: 'right',
      renderer: function(value) { return '$' + value.toFixed(2); }
    },
    { text: 'Stock', dataIndex: 'stock', width: 100, align: 'right' },
    {
      text: 'Status',
      dataIndex: 'status',
      width: 120,
      renderer: function(value) {
        const color = value === 'Active' ? 'success' : 'info';
        return \`<span class="badge-\${color}">\${value}</span>\`;
      }
    }
  ],
  selModel: {
    mode: 'MULTI',
    checkOnly: true
  },
  listeners: {
    selectionchange: function(selModel, selected) {
      console.log('Selection changed:', selected.map(r => r.getId()));
    }
  }
});`,

    typescript: `import { ResourceList, Card, Thumbnail, Text, Badge } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'Active' | 'Archived';
  stock: number;
  image: string;
}

interface ResourceListExampleProps {
  products?: Product[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

function ResourceListExample({
  products,
  onSelectionChange
}: ResourceListExampleProps): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Basic T-Shirt',
      description: 'Comfortable cotton t-shirt in various colors',
      price: 25.00,
      status: 'Active',
      stock: 150,
      image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
    },
    {
      id: '2',
      name: 'Coffee Mug',
      description: 'Ceramic mug with modern design',
      price: 12.00,
      status: 'Active',
      stock: 89,
      image: 'https://picsum.photos/seed/mug/100/100.jpg',
    },
  ];

  const items = products || defaultProducts;

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
    onSelectionChange?.(selectedIds);
  }, [onSelectionChange]);

  return (
    <ResourceList
      resourceName={{ singular: 'product', plural: 'products' }}
      items={items}
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
      renderItem={(item) => {
        const { id, name, description, price, status, stock, image } = item;
        const media = <Thumbnail size="small" alt={name} source={image} />;
        const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

        return (
          <ResourceList.Item
            id={id}
            media={media}
            accessibilityLabel={\`View details for \${name}\`}
          >
            <div style={{ flex: 1 }}>
              <Text variant="bodyMd" fontWeight="semibold" as="h3">
                {name}
              </Text>
              <Text color="subdued" as="p">
                {description}
              </Text>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                <Text variant="bodyMd" fontWeight="medium">
                  \${price.toFixed(2)}
                </Text>
                {statusBadge}
                <Text color="subdued" variant="bodySm">
                  {stock} in stock
                </Text>
              </div>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default ResourceListExample;`
  }
};

// CalloutCard Component Examples
export const calloutcardExamples: Record<string, CodeVariant> = {
  layout: {
    react: `import { CalloutCard } from '@shopify/polaris';
import React from 'react';

function CalloutCardExample() {
  return (
    <CalloutCard
      title="Get more sales with Shopify"
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg"
      primaryAction={{
        content: 'Start selling',
        onAction: () => console.log('Start selling clicked'),
      }}
      secondaryAction={{
        content: 'Learn more',
        url: '#',
      }}
    >
      Create a online store and start selling to customers right away.
      Shopify provides everything you need to start, run, and grow your business.
    </CalloutCard>
  );
}

export default CalloutCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-callout-card">
  <div class="polaris-callout-card__illustration">
    <img src="https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg"
         alt="Illustration" />
  </div>
  <div class="polaris-callout-card__content">
    <h2 class="polaris-callout-card__title">Get more sales with Shopify</h2>
    <p class="polaris-callout-card__description">
      Create a online store and start selling to customers right away.
      Shopify provides everything you need to start, run, and grow your business.
    </p>
    <div class="polaris-callout-card__actions">
      <button class="polaris-button polaris-button--primary">Start selling</button>
      <a href="#" class="polaris-link">Learn more</a>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-callout-card__actions .polaris-button', 'click', (event) => {
  event.preventDefault();
  console.log('Start selling clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-callout-card',
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  bodyPadding: 20,
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg',
    width: 200,
    height: 200
  }, {
    xtype: 'container',
    flex: 1,
    layout: 'vbox',
    padding: '0 0 0 20',
    items: [{
      xtype: 'component',
      html: '<h2>Get more sales with Shopify</h2>'
    }, {
      xtype: 'component',
      html: '<p>Create a online store and start selling to customers right away. Shopify provides everything you need to start, run, and grow your business.</p>',
      flex: 1
    }, {
      xtype: 'container',
      layout: 'hbox',
      items: [{
        xtype: 'button',
        text: 'Start selling',
        ui: 'primary',
        handler: function() {
          console.log('Start selling clicked');
        }
      }, {
        xtype: 'button',
        text: 'Learn more',
        ui: 'link',
        margin: '0 0 0 12',
        handler: function() {
          window.location.href = '#';
        }
      }]
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { CalloutCard } from '@shopify/polaris';
import React from 'react';

interface CalloutCardExampleProps {
  title: string;
  description: string;
  illustration?: string;
  primaryActionText: string;
  secondaryActionText?: string;
  onPrimaryAction: () => void;
  secondaryActionUrl?: string;
}

function CalloutCardExample({
  title,
  description,
  illustration,
  primaryActionText,
  secondaryActionText,
  onPrimaryAction,
  secondaryActionUrl
}: CalloutCardExampleProps): JSX.Element {
  return (
    <CalloutCard
      title={title}
      illustration={illustration}
      primaryAction={{
        content: primaryActionText,
        onAction: onPrimaryAction,
      }}
      secondaryAction={
        secondaryActionText && secondaryActionUrl
          ? {
              content: secondaryActionText,
              url: secondaryActionUrl,
            }
          : undefined
      }
    >
      {description}
    </CalloutCard>
  );
}

export default CalloutCardExample;`
  }
};

// EmptyState Component Examples
export const emptystateExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

function EmptyStateExample() {
  return (
    <EmptyState
      heading="No products found"
      action={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      Add products to your store to start selling and tracking inventory.
    </EmptyState>
  );
}

export default EmptyStateExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-empty-state">
  <div class="polaris-empty-state__image">
    <img src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
         alt="Empty state" />
  </div>
  <div class="polaris-empty-state__content">
    <h2 class="polaris-empty-state__heading">No products found</h2>
    <p class="polaris-empty-state__description">
      Add products to your store to start selling and tracking inventory.
    </p>
    <div class="polaris-empty-state__actions">
      <button class="polaris-button polaris-button--primary">Add product</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('.polaris-empty-state__actions .polaris-button', 'click', () => {
  console.log('Add product clicked');
});
</script>`,

    extjs: `// ExtJS Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-empty-state',
  bodyPadding: 40,
  layout: {
    type: 'vbox',
    align: 'center'
  },
  items: [{
    xtype: 'image',
    src: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    width: 300,
    height: 200
  }, {
    xtype: 'component',
    html: '<h2 style="text-align: center; margin: 20px 0 10px;">No products found</h2>'
  }, {
    xtype: 'component',
    html: '<p style="text-align: center; color: #6d7175; max-width: 400px;">Add products to your store to start selling and tracking inventory.</p>',
    margin: '0 0 20 0'
  }, {
    xtype: 'button',
    text: 'Add product',
    ui: 'primary',
    handler: function() {
      console.log('Add product clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { EmptyState } from '@shopify/polaris';
import React from 'react';

interface EmptyStateExampleProps {
  heading: string;
  description?: string;
  image?: string;
  actionText: string;
  secondaryActionText?: string;
  onAction: () => void;
  onSecondaryAction?: () => void;
  fullWidth?: boolean;
}

function EmptyStateExample({
  heading,
  description,
  image,
  actionText,
  secondaryActionText,
  onAction,
  onSecondaryAction,
  fullWidth = false
}: EmptyStateExampleProps): JSX.Element {
  return (
    <EmptyState
      heading={heading}
      image={image}
      action={{
        content: actionText,
        onAction: onAction,
      }}
      secondaryAction={
        secondaryActionText && onSecondaryAction
          ? {
              content: secondaryActionText,
              onAction: onSecondaryAction,
            }
          : undefined
      }
      fullWidth={fullWidth}
    >
      {description}
    </EmptyState>
  );
}

export default EmptyStateExample;`
  }
};

// Loading Component Examples
export const loadingExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Loading } from '@shopify/polaris';
import React from 'react';

function LoadingExample() {
  return (
    <Loading
      size="medium"
      accessibilityLabel="Loading content"
    />
  );
}

export default LoadingExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-spinner polaris-spinner--size-medium" role="status" aria-label="Loading content">
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="10"
      cy="10"
      r="7.5"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-dasharray="47 47"
      class="polaris-spinner__circle"
    />
  </svg>
</div>

<style>
.polaris-spinner {
  display: inline-block;
  animation: polaris-spinner-rotation 1s linear infinite;
}

.polaris-spinner--size-small svg {
  width: 20px;
  height: 20px;
}

.polaris-spinner--size-medium svg {
  width: 40px;
  height: 40px;
}

.polaris-spinner--size-large svg {
  width: 60px;
  height: 60px;
}

@keyframes polaris-spinner-rotation {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createSpinner } from '@cin7/vanilla-js';

const spinner = createSpinner({
  size: 'medium',
  accessibilityLabel: 'Loading content'
});

document.getElementById('app').appendChild(spinner);
</script>`,

    extjs: `// ExtJS Loading Mask using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Loading Example',
  width: 400,
  height: 300,
  bodyPadding: 20,
  html: '<p>Content will load here...</p>',
  renderTo: Ext.getBody(),
  listeners: {
    afterrender: function(panel) {
      // Show loading mask
      panel.setLoading({
        msg: 'Loading content...',
        useMsg: true
      });

      // Simulate async operation
      setTimeout(function() {
        panel.setLoading(false);
        panel.update('<p>Content loaded successfully!</p>');
      }, 2000);
    }
  }
});

// Or standalone spinner
Ext.create('Ext.Component', {
  cls: 'polaris-loading-spinner',
  html: '<div class="spinner-medium" role="status" aria-label="Loading"></div>',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Loading } from '@shopify/polaris';
import React from 'react';

type LoadingSize = 'small' | 'medium' | 'large';

interface LoadingExampleProps {
  size?: LoadingSize;
  accessibilityLabel?: string;
  hasFocusableElements?: boolean;
}

function LoadingExample({
  size = 'medium',
  accessibilityLabel = 'Loading',
  hasFocusableElements = false
}: LoadingExampleProps): JSX.Element {
  return (
    <Loading
      size={size}
      accessibilityLabel={accessibilityLabel}
      hasFocusableElements={hasFocusableElements}
    />
  );
}

export default LoadingExample;`
  }
};

// FullscreenBar Component Examples
export const fullscreenbarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { FullscreenBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function FullscreenBarExample() {
  const [searchValue, setSearchValue] = useState('');

  const handleNavigationDismiss = useCallback(() => {
    console.log('Navigation dismissed');
  }, []);

  return (
    <FullscreenBar
      logo={{
        width: 124,
        contextualSaveBarSource: 'https://cdn.shopify.com/logo.svg',
        url: '#',
      }}
      searchField={{
        placeholder: 'Search',
        onChange: setSearchValue,
        value: searchValue,
      }}
      onNavigationDismiss={handleNavigationDismiss}
    />
  );
}

export default FullscreenBarExample;`,

    vanilla: `<!-- FullscreenBar Structure -->
<div class="polaris-fullscreen-bar">
  <div class="polaris-fullscreen-bar__logo">
    <a href="#">
      <img src="https://cdn.shopify.com/logo.svg" width="124" alt="Logo" />
    </a>
  </div>
  <div class="polaris-fullscreen-bar__search">
    <input
      type="search"
      class="polaris-text-field__input"
      placeholder="Search"
      id="fullscreen-search"
    />
  </div>
</div>

<script>
import { createSearchField, EventBus } from '@cin7/vanilla-js';

const searchField = document.getElementById('fullscreen-search');
searchField.addEventListener('input', (e) => {
  EventBus.emit('search:changed', { value: e.target.value });
});

// Handle navigation dismiss
document.querySelector('.polaris-fullscreen-bar__back')?.addEventListener('click', () => {
  console.log('Navigation dismissed');
});
</script>`,

    extjs: `// ExtJS FullscreenBar using @cin7/extjs-adapters
Ext.create('Ext.toolbar.Toolbar', {
  dock: 'top',
  height: 60,
  cls: 'polaris-fullscreen-bar',
  items: [
    {
      xtype: 'component',
      html: '<a href="#"><img src="https://cdn.shopify.com/logo.svg" width="124" alt="Logo" /></a>',
      width: 150
    },
    {
      xtype: 'textfield',
      fieldLabel: '',
      emptyText: 'Search',
      flex: 1,
      margin: '0 16',
      listeners: {
        change: function(field, newValue) {
          Ext.GlobalEvents.fireEvent('search:changed', { value: newValue });
        }
      }
    },
    {
      xtype: 'button',
      text: 'Menu',
      menu: [
        { text: 'Profile settings' },
        { text: 'Logout' }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { FullscreenBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface FullscreenBarExampleProps {
  logoUrl?: string;
  logoWidth?: number;
  onSearchChange?: (value: string) => void;
}

function FullscreenBarExample({
  logoUrl = 'https://cdn.shopify.com/logo.svg',
  logoWidth = 124,
  onSearchChange
}: FullscreenBarExampleProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = useCallback((value: string): void => {
    setSearchValue(value);
    onSearchChange?.(value);
  }, [onSearchChange]);

  const handleNavigationDismiss = useCallback((): void => {
    console.log('Navigation dismissed');
  }, []);

  return (
    <FullscreenBar
      logo={{
        width: logoWidth,
        contextualSaveBarSource: logoUrl,
        url: '#',
      }}
      searchField={{
        placeholder: 'Search',
        onChange: handleSearchChange,
        value: searchValue,
      }}
      onNavigationDismiss={handleNavigationDismiss}
    />
  );
}

export default FullscreenBarExample;`
  }
};

// ContextualSaveBar Component Examples
export const contextualsavebarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ContextualSaveBar } from '@shopify/polaris';
import { useState } from 'react';

function ContextualSaveBarExample() {
  const [isDirty, setIsDirty] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsDirty(false);
  };

  const handleDiscard = () => {
    setIsDirty(false);
  };

  return (
    <>
      {isDirty && (
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            content: isSaving ? 'Saving...' : 'Save',
            onAction: handleSave,
            loading: isSaving,
          }}
          discardAction={{
            content: 'Discard',
            onAction: handleDiscard,
          }}
        />
      )}
    </>
  );
}

export default ContextualSaveBarExample;`,

    vanilla: `<!-- ContextualSaveBar Structure -->
<div class="polaris-contextual-save-bar" id="save-bar" style="display: none;">
  <div class="polaris-contextual-save-bar__content">
    <span class="polaris-contextual-save-bar__message">Unsaved changes</span>
    <div class="polaris-contextual-save-bar__actions">
      <button class="polaris-button" id="discard-btn">Discard</button>
      <button class="polaris-button polaris-button--primary" id="save-btn">Save</button>
    </div>
  </div>
</div>

<script>
import { EventBus } from '@cin7/vanilla-js';

let isDirty = false;
const saveBar = document.getElementById('save-bar');
const saveBtn = document.getElementById('save-btn');
const discardBtn = document.getElementById('discard-btn');

// Show/hide save bar based on dirty state
EventBus.on('form:changed', () => {
  isDirty = true;
  saveBar.style.display = 'flex';
});

saveBtn.addEventListener('click', async () => {
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  await new Promise(resolve => setTimeout(resolve, 2000));

  isDirty = false;
  saveBar.style.display = 'none';
  saveBtn.disabled = false;
  saveBtn.textContent = 'Save';

  EventBus.emit('form:saved');
});

discardBtn.addEventListener('click', () => {
  isDirty = false;
  saveBar.style.display = 'none';
  EventBus.emit('form:discarded');
});
</script>`,

    extjs: `// ExtJS ContextualSaveBar using @cin7/extjs-adapters
Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  cls: 'polaris-contextual-save-bar',
  hidden: true,
  id: 'contextual-save-bar',
  items: [
    {
      xtype: 'component',
      html: '<span class="polaris-contextual-save-bar__message">Unsaved changes</span>',
      flex: 1
    },
    {
      xtype: 'button',
      text: 'Discard',
      handler: function() {
        const saveBar = Ext.getCmp('contextual-save-bar');
        saveBar.hide();
        Ext.GlobalEvents.fireEvent('form:discarded');
      }
    },
    {
      xtype: 'button',
      text: 'Save',
      cls: 'polaris-button--primary',
      handler: async function(btn) {
        btn.setText('Saving...');
        btn.setDisabled(true);

        // Simulate async save
        await new Promise(resolve => setTimeout(resolve, 2000));

        const saveBar = Ext.getCmp('contextual-save-bar');
        saveBar.hide();
        btn.setText('Save');
        btn.setDisabled(false);

        Ext.GlobalEvents.fireEvent('form:saved');
      }
    }
  ]
});

// Show save bar when form is dirty
Ext.GlobalEvents.on('form:changed', function() {
  const saveBar = Ext.getCmp('contextual-save-bar');
  saveBar.show();
});`,

    typescript: `import { ContextualSaveBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface ContextualSaveBarExampleProps {
  message?: string;
  onSave?: () => Promise<void>;
  onDiscard?: () => void;
}

function ContextualSaveBarExample({
  message = 'Unsaved changes',
  onSave,
  onDiscard
}: ContextualSaveBarExampleProps): JSX.Element {
  const [isDirty, setIsDirty] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = useCallback(async (): Promise<void> => {
    setIsSaving(true);

    try {
      await onSave?.();
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }, [onSave]);

  const handleDiscard = useCallback((): void => {
    onDiscard?.();
    setIsDirty(false);
  }, [onDiscard]);

  if (!isDirty) return null;

  return (
    <ContextualSaveBar
      message={message}
      saveAction={{
        content: isSaving ? 'Saving...' : 'Save',
        onAction: handleSave,
        loading: isSaving,
        disabled: isSaving,
      }}
      discardAction={{
        content: 'Discard',
        onAction: handleDiscard,
        disabled: isSaving,
      }}
    />
  );
}

export default ContextualSaveBarExample;`
  }
};

// Divider Component Examples
export const dividerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Divider, Card, Text } from '@shopify/polaris';

function DividerExample() {
  return (
    <Card>
      <Text as="h3" variant="headingMd">Section One</Text>
      <Text as="p">This is the first section.</Text>

      <Divider />

      <Text as="h3" variant="headingMd">Section Two</Text>
      <Text as="p">This is the second section.</Text>
    </Card>
  );
}

export default DividerExample;`,

    vanilla: `<!-- Divider Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md">Section One</h3>
    <p>This is the first section.</p>
  </div>

  <hr class="polaris-divider" />

  <div class="polaris-card__section">
    <h3 class="polaris-heading-md">Section Two</h3>
    <p>This is the second section.</p>
  </div>
</div>

<style>
.polaris-divider {
  border: none;
  border-top: 1px solid var(--p-color-border);
  margin: 0;
}
</style>`,

    extjs: `// ExtJS Divider using standard components
Ext.create('Ext.panel.Panel', {
  title: 'Content Sections',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<h3>Section One</h3><p>This is the first section.</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<hr class="polaris-divider" />',
      cls: 'polaris-divider-wrapper'
    },
    {
      xtype: 'component',
      html: '<h3>Section Two</h3><p>This is the second section.</p>',
      margin: '16 0 0 0'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Divider, Card, Text } from '@shopify/polaris';

interface DividerExampleProps {
  borderColor?: 'border' | 'border-inverse' | 'border-critical' | 'border-warning' | 'border-highlight' | 'border-success';
  borderWidth?: 'none' | 'base' | 'thick';
}

function DividerExample({
  borderColor = 'border',
  borderWidth = 'base'
}: DividerExampleProps): JSX.Element {
  return (
    <Card>
      <Text as="h3" variant="headingMd">Section One</Text>
      <Text as="p">This is the first section.</Text>

      <Divider borderColor={borderColor} borderWidth={borderWidth} />

      <Text as="h3" variant="headingMd">Section Two</Text>
      <Text as="p">This is the second section.</Text>
    </Card>
  );
}

export default DividerExample;`
  }
};

// DropZone Component Examples
export const dropzoneExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DropZone, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function DropZoneExample() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const fileUpload = !files.length && (
    <DropZone.FileUpload />
  );

  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '20px' }}>
      {files.map((file, index) => (
        <Text key={index} variant="bodySm" as="p">
          {file.name} ({file.size} bytes)
        </Text>
      ))}
    </div>
  );

  return (
    <DropZone onDrop={handleDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

export default DropZoneExample;`,

    vanilla: `<!-- DropZone Structure -->
<div class="polaris-drop-zone" id="drop-zone">
  <input type="file" id="file-input" style="display: none;" multiple />
  <div class="polaris-drop-zone__content">
    <div class="polaris-drop-zone__placeholder" id="placeholder">
      <span>Drop files here or click to upload</span>
    </div>
    <div class="polaris-drop-zone__files" id="file-list"></div>
  </div>
</div>

<script>
import { EventBus } from '@cin7/vanilla-js';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const placeholder = document.getElementById('placeholder');

// Handle click to browse
dropZone.addEventListener('click', () => {
  fileInput.click();
});

// Handle drag and drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('polaris-drop-zone--dragging');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('polaris-drop-zone--dragging');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('polaris-drop-zone--dragging');

  const files = Array.from(e.dataTransfer.files);
  displayFiles(files);
  EventBus.emit('files:uploaded', { files });
});

// Handle file input change
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  displayFiles(files);
  EventBus.emit('files:uploaded', { files });
});

function displayFiles(files) {
  if (files.length > 0) {
    placeholder.style.display = 'none';
    fileList.innerHTML = files.map(file =>
      \`<p>\${file.name} (\${file.size} bytes)</p>\`
    ).join('');
  }
}
</script>`,

    extjs: `// ExtJS DropZone using filefield
Ext.create('Ext.form.Panel', {
  title: 'File Upload',
  bodyPadding: 16,
  items: [
    {
      xtype: 'filefield',
      name: 'files',
      fieldLabel: 'Files',
      labelWidth: 50,
      msgTarget: 'side',
      allowBlank: false,
      buttonText: 'Browse Files...',
      listeners: {
        change: function(field, value) {
          const files = field.fileInputEl.dom.files;
          console.log('Files selected:', files);

          Ext.GlobalEvents.fireEvent('files:uploaded', {
            files: Array.from(files),
            count: files.length
          });
        }
      }
    },
    {
      xtype: 'component',
      id: 'file-preview',
      html: '<div class="file-preview">No files selected</div>',
      margin: '8 0 0 0'
    }
  ],
  buttons: [
    {
      text: 'Upload',
      handler: function() {
        const form = this.up('form').getForm();
        if (form.isValid()) {
          // Handle file upload
          console.log('Uploading files...');
        }
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { DropZone, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface DropZoneExampleProps {
  accept?: string;
  allowMultiple?: boolean;
  onDrop?: (files: File[]) => void;
}

function DropZoneExample({
  accept,
  allowMultiple = true,
  onDrop
}: DropZoneExampleProps): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]): void => {
    setFiles(acceptedFiles);
    onDrop?.(acceptedFiles);
  }, [onDrop]);

  const fileUpload = !files.length && (
    <DropZone.FileUpload />
  );

  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '20px' }}>
      {files.map((file, index) => (
        <Text key={index} variant="bodySm" as="p">
          {file.name} ({file.size} bytes)
        </Text>
      ))}
    </div>
  );

  return (
    <DropZone
      onDrop={handleDrop}
      accept={accept}
      allowMultiple={allowMultiple}
    >
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

export default DropZoneExample;`
  }
};

// KeyboardKey Component Examples
export const keyboardkeyExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { KeyboardKey } from '@shopify/polaris';

function KeyboardKeyExample() {
  return <KeyboardKey>Enter</KeyboardKey>;
}

export default KeyboardKeyExample;`,

    vanilla: `<!-- KeyboardKey Structure -->
<kbd class="polaris-keyboard-key">Enter</kbd>

<style>
.polaris-keyboard-key {
  display: inline-block;
  padding: 2px 6px;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS KeyboardKey representation
Ext.create('Ext.Component', {
  html: '<kbd class="polaris-keyboard-key">Enter</kbd>',
  cls: 'keyboard-key-wrapper',
  renderTo: Ext.getBody()
});

// For keyboard shortcuts display
Ext.create('Ext.panel.Panel', {
  title: 'Keyboard Shortcuts',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: \`
        <div class="shortcut-row">
          <span>Save</span>
          <span>
            <kbd class="polaris-keyboard-key">Ctrl</kbd> +
            <kbd class="polaris-keyboard-key">S</kbd>
          </span>
        </div>
      \`
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, Text } from '@shopify/polaris';

interface KeyboardKeyExampleProps {
  keys: string[];
  description?: string;
}

function KeyboardKeyExample({
  keys = ['Enter'],
  description
}: KeyboardKeyExampleProps): JSX.Element {
  return (
    <InlineStack gap="100" blockAlign="center">
      {description && <Text variant="bodySm">{description}:</Text>}
      {keys.map((key, index) => (
        <span key={index}>
          {index > 0 && <Text>+</Text>}
          <KeyboardKey>{key}</KeyboardKey>
        </span>
      ))}
    </InlineStack>
  );
}

export default KeyboardKeyExample;`
  }
};

// Text Component Examples
export const textExamples: Record<string, CodeVariant> = {
  body: {
    react: `import { Text } from '@shopify/polaris';

function TextExample() {
  return (
    <Text variant="bodyMd" as="p">
      This is default body text using the Text component.
    </Text>
  );
}

export default TextExample;`,

    vanilla: `<!-- Text Structure -->
<p class="polaris-text polaris-text--body-md">
  This is default body text using the Text component.
</p>

<style>
.polaris-text--body-md {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

.polaris-text--heading-md {
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
}
</style>`,

    extjs: `// ExtJS Text representation
Ext.create('Ext.Component', {
  html: '<p class="polaris-text polaris-text--body-md">This is default body text using the Text component.</p>',
  renderTo: Ext.getBody()
});

// For different text variants
Ext.create('Ext.panel.Panel', {
  title: 'Text Variants',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Heading Text</h3>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md">Body text with medium size.</p>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-sm polaris-text--subdued">Small subdued text for captions.</p>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';

interface TextExampleProps {
  variant?: 'bodySm' | 'bodyMd' | 'bodyLg' | 'headingSm' | 'headingMd' | 'headingLg' | 'headingXl';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  tone?: 'base' | 'subdued' | 'critical' | 'success' | 'warning' | 'attention' | 'info';
  children: React.ReactNode;
}

function TextExample({
  variant = 'bodyMd',
  as = 'p',
  tone = 'base',
  children
}: TextExampleProps): JSX.Element {
  return (
    <Text variant={variant} as={as} tone={tone}>
      {children}
    </Text>
  );
}

export default TextExample;`
  }
};

// AlphaStack Component Examples
export const alphastackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { AlphaStack, Text, Button } from '@shopify/polaris';
import React from 'react';

function AlphaStackDefault() {
  return (
    <AlphaStack spacing="loose">
      <Text as="h3" variant="headingMd">AlphaStack Example</Text>
      <Text as="p" variant="bodyMd">This is the default vertical AlphaStack with loose spacing.</Text>
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
    </AlphaStack>
  );
}

export default AlphaStackDefault;`,

    vanilla: `<!-- AlphaStack using @cin7/vanilla-js -->
<div id="alphastack-container"></div>

<script>
import { createAlphaStack } from '@cin7/vanilla-js';

const alphaStack = createAlphaStack({
  spacing: 'loose',
  direction: 'vertical',
  items: [
    { type: 'heading', text: 'AlphaStack Example', level: 3 },
    { type: 'text', text: 'This is the default vertical AlphaStack with loose spacing.' },
    { type: 'button', text: 'Primary Action', variant: 'primary' },
    { type: 'button', text: 'Secondary Action', variant: 'secondary' }
  ]
});

document.getElementById('alphastack-container').appendChild(alphaStack);
</script>`,

    extjs: `// ExtJS AlphaStack using @cin7/extjs-adapters
import { PolarisAlphaStack } from '@cin7/extjs-adapters';

Ext.create('PolarisAlphaStack', {
  renderTo: Ext.getBody(),
  spacing: 'loose',
  direction: 'vertical',
  items: [
    {
      xtype: 'component',
      html: '<h3>AlphaStack Example</h3>'
    },
    {
      xtype: 'component',
      html: '<p>This is the default vertical AlphaStack with loose spacing.</p>'
    },
    {
      xtype: 'button',
      text: 'Primary Action',
      ui: 'primary',
      handler: function() {
        console.log('Primary action clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Secondary Action',
      ui: 'secondary',
      handler: function() {
        console.log('Secondary action clicked');
      }
    }
  ]
});`,

    typescript: `import { AlphaStack, Text, Button, AlphaStackProps } from '@shopify/polaris';
import React from 'react';

interface AlphaStackDefaultProps {
  spacing?: AlphaStackProps['spacing'];
  direction?: AlphaStackProps['direction'];
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

function AlphaStackDefault({
  spacing = 'loose',
  direction = 'vertical',
  onPrimaryAction,
  onSecondaryAction
}: AlphaStackDefaultProps): JSX.Element {
  return (
    <AlphaStack spacing={spacing} direction={direction}>
      <Text as="h3" variant="headingMd">AlphaStack Example</Text>
      <Text as="p" variant="bodyMd">
        This is the default vertical AlphaStack with loose spacing.
      </Text>
      <Button
        variant="primary"
        onClick={onPrimaryAction || (() => console.log('Primary action'))}
      >
        Primary Action
      </Button>
      <Button
        variant="secondary"
        onClick={onSecondaryAction || (() => console.log('Secondary action'))}
      >
        Secondary Action
      </Button>
    </AlphaStack>
  );
}

export default AlphaStackDefault;`
  }
};

// Bleed Component Examples
export const bleedExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Bleed, Card, Text } from '@shopify/polaris';
import React from 'react';

function BleedDefault() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Card with Bleed
      </Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Below is a div that bleeds to remove the card's padding on all sides:
      </Text>
      <Bleed margin="400">
        <div style={{
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        }}>
          <Text as="p" variant="bodyMd">This content bleeds to the edges</Text>
        </div>
      </Bleed>
    </Card>
  );
}

export default BleedDefault;`,

    vanilla: `<!-- Bleed using @cin7/vanilla-js -->
<div id="bleed-container"></div>

<script>
import { createBleed } from '@cin7/vanilla-js';

// Create card container
const card = document.createElement('div');
card.className = 'polaris-card';
card.style.padding = '16px';

// Add heading
const heading = document.createElement('h3');
heading.textContent = 'Card with Bleed';
heading.style.marginBottom = '16px';
card.appendChild(heading);

// Add description
const description = document.createElement('p');
description.textContent = "Below is a div that bleeds to remove the card's padding on all sides:";
description.style.marginBottom = '16px';
card.appendChild(description);

// Create bleed component
const bleed = createBleed({
  margin: '400',
  content: {
    backgroundColor: '#f4f6f8',
    padding: '16px',
    textAlign: 'center',
    text: 'This content bleeds to the edges'
  }
});

card.appendChild(bleed);
document.getElementById('bleed-container').appendChild(card);
</script>`,

    extjs: `// ExtJS Bleed using @cin7/extjs-adapters
import { PolarisBleed } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 16,
  cls: 'polaris-card',
  items: [
    {
      xtype: 'component',
      html: '<h3>Card with Bleed</h3>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<p>Below is a div that bleeds to remove the card\\'s padding on all sides:</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'PolarisBleed',
      margin: '400',
      items: [{
        xtype: 'box',
        style: {
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        },
        html: '<p>This content bleeds to the edges</p>'
      }]
    }
  ]
});`,

    typescript: `import { Bleed, Card, Text, BleedProps } from '@shopify/polaris';
import React from 'react';

interface BleedDefaultProps {
  margin?: BleedProps['margin'];
  content?: string;
}

function BleedDefault({
  margin = '400',
  content = 'This content bleeds to the edges'
}: BleedDefaultProps): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Card with Bleed
      </Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Below is a div that bleeds to remove the card's padding on all sides:
      </Text>
      <Bleed margin={margin}>
        <div style={{
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        }}>
          <Text as="p" variant="bodyMd">{content}</Text>
        </div>
      </Bleed>
    </Card>
  );
}

export default BleedDefault;`
  }
};

// Box Component Examples
export const boxExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Box, Text } from '@shopify/polaris';
import React from 'react';

function BoxDefault() {
  return (
    <Box padding="400" background="surface" border="base" borderRadius="base">
      <Text as="h3" variant="headingMd">Box Component</Text>
      <Text as="p" variant="bodyMd">
        This is a basic Box with padding, background, border, and border radius.
      </Text>
    </Box>
  );
}

export default BoxDefault;`,

    vanilla: `<!-- Box using @cin7/vanilla-js -->
<div id="box-container"></div>

<script>
import { createBox } from '@cin7/vanilla-js';

const box = createBox({
  padding: '400',
  background: 'surface',
  border: 'base',
  borderRadius: 'base',
  content: [
    {
      type: 'heading',
      text: 'Box Component',
      level: 3
    },
    {
      type: 'text',
      text: 'This is a basic Box with padding, background, border, and border radius.'
    }
  ]
});

document.getElementById('box-container').appendChild(box);
</script>`,

    extjs: `// ExtJS Box using @cin7/extjs-adapters
import { PolarisBox } from '@cin7/extjs-adapters';

Ext.create('PolarisBox', {
  renderTo: Ext.getBody(),
  padding: '400',
  background: 'surface',
  border: 'base',
  borderRadius: 'base',
  items: [
    {
      xtype: 'component',
      html: '<h3>Box Component</h3>'
    },
    {
      xtype: 'component',
      html: '<p>This is a basic Box with padding, background, border, and border radius.</p>'
    }
  ]
});`,

    typescript: `import { Box, Text, BoxProps } from '@shopify/polaris';
import React from 'react';

interface BoxDefaultProps {
  padding?: BoxProps['padding'];
  background?: BoxProps['background'];
  border?: BoxProps['border'];
  borderRadius?: BoxProps['borderRadius'];
  children?: React.ReactNode;
}

function BoxDefault({
  padding = '400',
  background = 'surface',
  border = 'base',
  borderRadius = 'base',
  children
}: BoxDefaultProps): JSX.Element {
  return (
    <Box
      padding={padding}
      background={background}
      border={border}
      borderRadius={borderRadius}
    >
      {children || (
        <>
          <Text as="h3" variant="headingMd">Box Component</Text>
          <Text as="p" variant="bodyMd">
            This is a basic Box with padding, background, border, and border radius.
          </Text>
        </>
      )}
    </Box>
  );
}

export default BoxDefault;`
  }
};

// Grid Component Examples
export const gridExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Grid, Card, Text } from '@shopify/polaris';
import React from 'react';

function GridDefault() {
  return (
    <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="400">
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 1</Text>
        <Text as="p" variant="bodySm">First grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 2</Text>
        <Text as="p" variant="bodySm">Second grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 3</Text>
        <Text as="p" variant="bodySm">Third grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 4</Text>
        <Text as="p" variant="bodySm">Fourth grid item</Text>
      </Card>
    </Grid>
  );
}

export default GridDefault;`,

    vanilla: `<!-- Grid using @cin7/vanilla-js -->
<div id="grid-container"></div>

<script>
import { createGrid } from '@cin7/vanilla-js';

const grid = createGrid({
  columns: { xs: 1, sm: 2, md: 3, lg: 4 },
  gap: '400',
  items: [
    {
      type: 'card',
      title: 'Column 1',
      content: 'First grid item'
    },
    {
      type: 'card',
      title: 'Column 2',
      content: 'Second grid item'
    },
    {
      type: 'card',
      title: 'Column 3',
      content: 'Third grid item'
    },
    {
      type: 'card',
      title: 'Column 4',
      content: 'Fourth grid item'
    }
  ]
});

document.getElementById('grid-container').appendChild(grid);
</script>`,

    extjs: `// ExtJS Grid using @cin7/extjs-adapters
import { PolarisGrid } from '@cin7/extjs-adapters';

Ext.create('PolarisGrid', {
  renderTo: Ext.getBody(),
  columns: { xs: 1, sm: 2, md: 3, lg: 4 },
  gap: '400',
  items: [
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 1</h3><p>First grid item</p>'
    },
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 2</h3><p>Second grid item</p>'
    },
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 3</h3><p>Third grid item</p>'
    },
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 4</h3><p>Fourth grid item</p>'
    }
  ]
});`,

    typescript: `import { Grid, Card, Text, GridProps } from '@shopify/polaris';
import React from 'react';

interface GridItem {
  title: string;
  content: string;
}

interface GridDefaultProps {
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  items?: GridItem[];
}

function GridDefault({
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = '400',
  items = [
    { title: 'Column 1', content: 'First grid item' },
    { title: 'Column 2', content: 'Second grid item' },
    { title: 'Column 3', content: 'Third grid item' },
    { title: 'Column 4', content: 'Fourth grid item' }
  ]
}: GridDefaultProps): JSX.Element {
  return (
    <Grid columns={columns} gap={gap}>
      {items.map((item, index) => (
        <Card key={index} sectioned>
          <Text as="h3" variant="headingSm">{item.title}</Text>
          <Text as="p" variant="bodySm">{item.content}</Text>
        </Card>
      ))}
    </Grid>
  );
}

export default GridDefault;`
  }
};

// InlineStack Component Examples
export const inlinestackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { InlineStack, Button } from '@shopify/polaris';
import React from 'react';

function InlineStackDefault() {
  return (
    <InlineStack gap="400">
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="plain">Preview</Button>
    </InlineStack>
  );
}

export default InlineStackDefault;`,

    vanilla: `<!-- InlineStack using @cin7/vanilla-js -->
<div id="inlinestack-container"></div>

<script>
import { createInlineStack } from '@cin7/vanilla-js';

const inlineStack = createInlineStack({
  gap: '400',
  items: [
    { type: 'button', text: 'Save', variant: 'primary' },
    { type: 'button', text: 'Cancel', variant: 'secondary' },
    { type: 'button', text: 'Preview', variant: 'plain' }
  ]
});

document.getElementById('inlinestack-container').appendChild(inlineStack);
</script>`,

    extjs: `// ExtJS InlineStack using @cin7/extjs-adapters
import { PolarisInlineStack } from '@cin7/extjs-adapters';

Ext.create('PolarisInlineStack', {
  renderTo: Ext.getBody(),
  gap: '400',
  items: [
    {
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Cancel',
      ui: 'secondary',
      handler: function() {
        console.log('Cancel clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Preview',
      ui: 'plain',
      handler: function() {
        console.log('Preview clicked');
      }
    }
  ]
});`,

    typescript: `import { InlineStack, Button, InlineStackProps } from '@shopify/polaris';
import React from 'react';

interface InlineStackDefaultProps {
  gap?: InlineStackProps['gap'];
  align?: InlineStackProps['align'];
  onSave?: () => void;
  onCancel?: () => void;
  onPreview?: () => void;
}

function InlineStackDefault({
  gap = '400',
  align = 'start',
  onSave,
  onCancel,
  onPreview
}: InlineStackDefaultProps): JSX.Element {
  return (
    <InlineStack gap={gap} align={align}>
      <Button onClick={onSave || (() => console.log('Save'))}>
        Save
      </Button>
      <Button
        variant="secondary"
        onClick={onCancel || (() => console.log('Cancel'))}
      >
        Cancel
      </Button>
      <Button
        variant="plain"
        onClick={onPreview || (() => console.log('Preview'))}
      >
        Preview
      </Button>
    </InlineStack>
  );
}

export default InlineStackDefault;`
  }
};

// VerticalStack Component Examples (maps to BlockStack)
export const verticalstackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { BlockStack } from '@shopify/polaris';
import React from 'react';

function VerticalStackDefault() {
  return (
    <BlockStack gap="400">
      <div style={{ padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        First Item
      </div>
      <div style={{ padding: '12px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        Second Item
      </div>
      <div style={{ padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
        Third Item
      </div>
    </BlockStack>
  );
}

export default VerticalStackDefault;`,

    vanilla: `<!-- VerticalStack using @cin7/vanilla-js -->
<div id="verticalstack-container"></div>

<script>
import { createVerticalStack } from '@cin7/vanilla-js';

const verticalStack = createVerticalStack({
  gap: '400',
  items: [
    {
      type: 'div',
      style: { padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' },
      content: 'First Item'
    },
    {
      type: 'div',
      style: { padding: '12px', backgroundColor: '#e8f5e8', borderRadius: '4px' },
      content: 'Second Item'
    },
    {
      type: 'div',
      style: { padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px' },
      content: 'Third Item'
    }
  ]
});

document.getElementById('verticalstack-container').appendChild(verticalStack);
</script>`,

    extjs: `// ExtJS VerticalStack using @cin7/extjs-adapters
import { PolarisVerticalStack } from '@cin7/extjs-adapters';

Ext.create('PolarisVerticalStack', {
  renderTo: Ext.getBody(),
  gap: '400',
  items: [
    {
      xtype: 'box',
      style: {
        padding: '12px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px'
      },
      html: 'First Item'
    },
    {
      xtype: 'box',
      style: {
        padding: '12px',
        backgroundColor: '#e8f5e8',
        borderRadius: '4px'
      },
      html: 'Second Item'
    },
    {
      xtype: 'box',
      style: {
        padding: '12px',
        backgroundColor: '#fff3e0',
        borderRadius: '4px'
      },
      html: 'Third Item'
    }
  ]
});`,

    typescript: `import { BlockStack, BlockStackProps } from '@shopify/polaris';
import React from 'react';

interface VerticalStackItem {
  content: string;
  backgroundColor: string;
}

interface VerticalStackDefaultProps {
  gap?: BlockStackProps['gap'];
  items?: VerticalStackItem[];
}

function VerticalStackDefault({
  gap = '400',
  items = [
    { content: 'First Item', backgroundColor: '#e3f2fd' },
    { content: 'Second Item', backgroundColor: '#e8f5e8' },
    { content: 'Third Item', backgroundColor: '#fff3e0' }
  ]
}: VerticalStackDefaultProps): JSX.Element {
  return (
    <BlockStack gap={gap}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            padding: '12px',
            backgroundColor: item.backgroundColor,
            borderRadius: '4px'
          }}
        >
          {item.content}
        </div>
      ))}
    </BlockStack>
  );
}

export default VerticalStackDefault;`
  }
};

// ActionList Component Examples
export const actionList: Record<string, CodeVariant> = {
  default: {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';

function ActionListExample() {
  return (
    <ActionList
      items={[
        { content: 'View product', icon: ViewIcon },
        { content: 'Edit product', icon: EditIcon },
        { content: 'Duplicate product', icon: DuplicateIcon },
        { content: 'Delete product', icon: DeleteIcon, destructive: true },
      ]}
    />
  );
}

export default ActionListExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-action-list">
  <ul class="polaris-action-list__list">
    <li class="polaris-action-list__item">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">👁️</span>
        <span class="polaris-action-list__text">View product</span>
      </button>
    </li>
    <li class="polaris-action-list__item">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">✏️</span>
        <span class="polaris-action-list__text">Edit product</span>
      </button>
    </li>
    <li class="polaris-action-list__item">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">📋</span>
        <span class="polaris-action-list__text">Duplicate product</span>
      </button>
    </li>
    <li class="polaris-action-list__item polaris-action-list__item--destructive">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">🗑️</span>
        <span class="polaris-action-list__text">Delete product</span>
      </button>
    </li>
  </ul>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createActionList } from '@cin7/vanilla-js';

const actionList = createActionList({
  items: [
    { text: 'View product', icon: '👁️', onClick: () => console.log('View') },
    { text: 'Edit product', icon: '✏️', onClick: () => console.log('Edit') },
    { text: 'Duplicate product', icon: '📋', onClick: () => console.log('Duplicate') },
    { text: 'Delete product', icon: '🗑️', onClick: () => console.log('Delete'), destructive: true }
  ]
});

document.getElementById('app').appendChild(actionList);
</script>`,

    extjs: `// ExtJS Menu using @cin7/extjs-adapters
Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'View product',
      iconCls: 'icon-view',
      handler: function() {
        console.log('View product');
      }
    },
    {
      text: 'Edit product',
      iconCls: 'icon-edit',
      handler: function() {
        console.log('Edit product');
      }
    },
    {
      text: 'Duplicate product',
      iconCls: 'icon-duplicate',
      handler: function() {
        console.log('Duplicate product');
      }
    },
    '-', // Separator
    {
      text: 'Delete product',
      iconCls: 'icon-delete',
      cls: 'destructive-action',
      handler: function() {
        Ext.Msg.confirm('Delete', 'Are you sure?', function(btn) {
          if (btn === 'yes') {
            console.log('Delete product');
          }
        });
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';

interface ActionListExampleProps {
  onAction?: (action: string) => void;
}

function ActionListExample({ onAction }: ActionListExampleProps): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    {
      content: 'View product',
      icon: ViewIcon,
      onAction: () => onAction?.('view'),
    },
    {
      content: 'Edit product',
      icon: EditIcon,
      onAction: () => onAction?.('edit'),
    },
    {
      content: 'Duplicate product',
      icon: DuplicateIcon,
      onAction: () => onAction?.('duplicate'),
    },
    {
      content: 'Delete product',
      icon: DeleteIcon,
      destructive: true,
      onAction: () => onAction?.('delete'),
    },
  ];

  return <ActionList items={items} />;
}

export default ActionListExample;`
  },

  'with-actions': {
    react: `import { ActionList, Button, Popover } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function ActionListWithPopover() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Actions
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList
        items={[
          { content: 'View details', icon: ViewIcon, onAction: () => console.log('View clicked') },
          { content: 'Edit', icon: EditIcon, onAction: () => console.log('Edit clicked') },
          { content: 'Duplicate', icon: DuplicateIcon, onAction: () => console.log('Duplicate clicked') },
          { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => console.log('Delete clicked') },
        ]}
      />
    </Popover>
  );
}

export default ActionListWithPopover;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-popover-wrapper">
  <button id="actions-button" class="polaris-button">
    Actions
    <span class="polaris-button__icon">▼</span>
  </button>
  <div id="actions-popover" class="polaris-popover" style="display: none;">
    <div class="polaris-action-list">
      <ul class="polaris-action-list__list">
        <li class="polaris-action-list__item">
          <button class="polaris-action-list__button" data-action="view">
            <span class="polaris-action-list__icon">👁️</span>
            <span class="polaris-action-list__text">View details</span>
          </button>
        </li>
        <li class="polaris-action-list__item">
          <button class="polaris-action-list__button" data-action="edit">
            <span class="polaris-action-list__icon">✏️</span>
            <span class="polaris-action-list__text">Edit</span>
          </button>
        </li>
        <li class="polaris-action-list__item">
          <button class="polaris-action-list__button" data-action="duplicate">
            <span class="polaris-action-list__icon">📋</span>
            <span class="polaris-action-list__text">Duplicate</span>
          </button>
        </li>
        <li class="polaris-action-list__item polaris-action-list__item--destructive">
          <button class="polaris-action-list__button" data-action="delete">
            <span class="polaris-action-list__icon">🗑️</span>
            <span class="polaris-action-list__text">Delete</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createPopover, createActionList } from '@cin7/vanilla-js';

const button = document.getElementById('actions-button');
const popover = document.getElementById('actions-popover');

button.addEventListener('click', () => {
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.currentTarget.getAttribute('data-action');
    console.log(\`\${action} clicked\`);
    popover.style.display = 'none';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!button.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Button with Menu
Ext.create('Ext.button.Button', {
  text: 'Actions',
  menu: Ext.create('Ext.menu.Menu', {
    items: [
      {
        text: 'View details',
        iconCls: 'icon-view',
        handler: function() {
          console.log('View clicked');
        }
      },
      {
        text: 'Edit',
        iconCls: 'icon-edit',
        handler: function() {
          console.log('Edit clicked');
        }
      },
      {
        text: 'Duplicate',
        iconCls: 'icon-duplicate',
        handler: function() {
          console.log('Duplicate clicked');
        }
      },
      '-',
      {
        text: 'Delete',
        iconCls: 'icon-delete',
        cls: 'destructive-action',
        handler: function() {
          console.log('Delete clicked');
        }
      }
    ]
  }),
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, Button, Popover, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

type ActionType = 'view' | 'edit' | 'duplicate' | 'delete';

interface ActionListWithPopoverProps {
  onAction?: (action: ActionType) => void;
}

function ActionListWithPopover({ onAction }: ActionListWithPopoverProps): JSX.Element {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((active) => !active);
  }, []);

  const handleAction = useCallback((action: ActionType) => {
    console.log(\`\${action} clicked\`);
    onAction?.(action);
    setPopoverActive(false);
  }, [onAction]);

  const items: ActionListItemDescriptor[] = [
    {
      content: 'View details',
      icon: ViewIcon,
      onAction: () => handleAction('view'),
    },
    {
      content: 'Edit',
      icon: EditIcon,
      onAction: () => handleAction('edit'),
    },
    {
      content: 'Duplicate',
      icon: DuplicateIcon,
      onAction: () => handleAction('duplicate'),
    },
    {
      content: 'Delete',
      icon: DeleteIcon,
      destructive: true,
      onAction: () => handleAction('delete'),
    },
  ];

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Actions
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList items={items} />
    </Popover>
  );
}

export default ActionListWithPopover;`
  },

  'with-sections': {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon, SearchIcon, DeleteIcon, DisabledIcon } from '@shopify/polaris-icons';

function ActionListWithSections() {
  return (
    <ActionList
      sections={[
        {
          title: 'Product actions',
          items: [
            { content: 'View product', icon: ViewIcon },
            { content: 'Edit product', icon: EditIcon },
            { content: 'Duplicate product', icon: DuplicateIcon },
          ],
        },
        {
          title: 'Inventory',
          items: [
            { content: 'Adjust inventory', icon: SettingsIcon },
            { content: 'View history', icon: SearchIcon },
          ],
        },
        {
          title: 'Danger zone',
          items: [
            { content: 'Delete product', icon: DeleteIcon, destructive: true },
            { content: 'Archive product', icon: DisabledIcon, destructive: true },
          ],
        },
      ]}
    />
  );
}

export default ActionListWithSections;`,

    vanilla: `<div class="polaris-action-list">
  <div class="polaris-action-list__section">
    <div class="polaris-action-list__section-title">Product actions</div>
    <ul class="polaris-action-list__list">
      <li><button>👁️ View product</button></li>
      <li><button>✏️ Edit product</button></li>
      <li><button>📋 Duplicate product</button></li>
    </ul>
  </div>
  <div class="polaris-action-list__section">
    <div class="polaris-action-list__section-title">Inventory</div>
    <ul class="polaris-action-list__list">
      <li><button>⚙️ Adjust inventory</button></li>
      <li><button>🔍 View history</button></li>
    </ul>
  </div>
  <div class="polaris-action-list__section">
    <div class="polaris-action-list__section-title">Danger zone</div>
    <ul class="polaris-action-list__list">
      <li class="destructive"><button>🗑️ Delete product</button></li>
      <li class="destructive"><button>🚫 Archive product</button></li>
    </ul>
  </div>
</div>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'Product actions', plain: true, canActivate: false },
    { text: 'View product', iconCls: 'icon-view' },
    { text: 'Edit product', iconCls: 'icon-edit' },
    { text: 'Duplicate product', iconCls: 'icon-duplicate' },
    '-',
    { text: 'Inventory', plain: true, canActivate: false },
    { text: 'Adjust inventory', iconCls: 'icon-settings' },
    { text: 'View history', iconCls: 'icon-search' },
    '-',
    { text: 'Danger zone', plain: true, canActivate: false },
    { text: 'Delete product', iconCls: 'icon-delete', cls: 'destructive' },
    { text: 'Archive product', iconCls: 'icon-archive', cls: 'destructive' }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListSection } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon, SearchIcon, DeleteIcon, DisabledIcon } from '@shopify/polaris-icons';

interface ActionListWithSectionsProps {
  onAction?: (section: string, action: string) => void;
}

function ActionListWithSections({ onAction }: ActionListWithSectionsProps): JSX.Element {
  const sections: ActionListSection[] = [
    {
      title: 'Product actions',
      items: [
        { content: 'View product', icon: ViewIcon, onAction: () => onAction?.('product', 'view') },
        { content: 'Edit product', icon: EditIcon, onAction: () => onAction?.('product', 'edit') },
        { content: 'Duplicate product', icon: DuplicateIcon, onAction: () => onAction?.('product', 'duplicate') },
      ],
    },
    {
      title: 'Inventory',
      items: [
        { content: 'Adjust inventory', icon: SettingsIcon, onAction: () => onAction?.('inventory', 'adjust') },
        { content: 'View history', icon: SearchIcon, onAction: () => onAction?.('inventory', 'history') },
      ],
    },
    {
      title: 'Danger zone',
      items: [
        { content: 'Delete product', icon: DeleteIcon, destructive: true, onAction: () => onAction?.('danger', 'delete') },
        { content: 'Archive product', icon: DisabledIcon, destructive: true, onAction: () => onAction?.('danger', 'archive') },
      ],
    },
  ];

  return <ActionList sections={sections} />;
}

export default ActionListWithSections;`
  },

  'with-disabled-items': {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon } from '@shopify/polaris-icons';

function ActionListWithDisabledItems() {
  return (
    <ActionList
      items={[
        { content: 'Available action', icon: ViewIcon },
        { content: 'Disabled action', icon: EditIcon, disabled: true },
        { content: 'Another action', icon: DuplicateIcon },
        { content: 'Also disabled', icon: SettingsIcon, disabled: true },
      ]}
    />
  );
}

export default ActionListWithDisabledItems;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li><button>👁️ Available action</button></li>
  <li><button disabled>✏️ Disabled action</button></li>
  <li><button>📋 Another action</button></li>
  <li><button disabled>⚙️ Also disabled</button></li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'Available action', iconCls: 'icon-view' },
    { text: 'Disabled action', iconCls: 'icon-edit', disabled: true },
    { text: 'Another action', iconCls: 'icon-duplicate' },
    { text: 'Also disabled', iconCls: 'icon-settings', disabled: true }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon } from '@shopify/polaris-icons';

function ActionListWithDisabledItems(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'Available action', icon: ViewIcon },
    { content: 'Disabled action', icon: EditIcon, disabled: true },
    { content: 'Another action', icon: DuplicateIcon },
    { content: 'Also disabled', icon: SettingsIcon, disabled: true },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithDisabledItems;`
  },

  'with-badges': {
    react: `import { ActionList } from '@shopify/polaris';

function ActionListWithBadges() {
  return (
    <ActionList
      items={[
        { content: 'New order', badge: { status: 'new', content: 'New' } },
        { content: 'Processing', badge: { status: 'info', content: 'In progress' } },
        { content: 'Completed', badge: { status: 'success', content: 'Done' } },
        { content: 'Failed', badge: { status: 'critical', content: 'Error' } },
        { content: 'Custom badge', badge: { tone: 'magic', content: 'Special' } },
      ]}
    />
  );
}

export default ActionListWithBadges;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li>
    <button>
      New order
      <span class="badge badge-new">New</span>
    </button>
  </li>
  <li>
    <button>
      Processing
      <span class="badge badge-info">In progress</span>
    </button>
  </li>
  <li>
    <button>
      Completed
      <span class="badge badge-success">Done</span>
    </button>
  </li>
  <li>
    <button>
      Failed
      <span class="badge badge-critical">Error</span>
    </button>
  </li>
  <li>
    <button>
      Custom badge
      <span class="badge badge-magic">Special</span>
    </button>
  </li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'New order', badge: 'New', badgeCls: 'badge-new' },
    { text: 'Processing', badge: 'In progress', badgeCls: 'badge-info' },
    { text: 'Completed', badge: 'Done', badgeCls: 'badge-success' },
    { text: 'Failed', badge: 'Error', badgeCls: 'badge-critical' },
    { text: 'Custom badge', badge: 'Special', badgeCls: 'badge-magic' }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';

function ActionListWithBadges(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'New order', badge: { status: 'new', content: 'New' } },
    { content: 'Processing', badge: { status: 'info', content: 'In progress' } },
    { content: 'Completed', badge: { status: 'success', content: 'Done' } },
    { content: 'Failed', badge: { status: 'critical', content: 'Error' } },
    { content: 'Custom badge', badge: { tone: 'magic', content: 'Special' } },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithBadges;`
  },

  'with-prefix-and-suffix': {
    react: `import { ActionList, Icon } from '@shopify/polaris';
import { CheckCircleIcon, DisabledIcon } from '@shopify/polaris-icons';

function ActionListWithPrefixAndSuffix() {
  return (
    <ActionList
      items={[
        {
          content: 'Active status',
          prefix: <Icon source={CheckCircleIcon} tone="success" />,
          suffix: 'Enabled'
        },
        {
          content: 'Inactive status',
          prefix: <Icon source={DisabledIcon} tone="subdued" />,
          suffix: 'Disabled'
        },
        {
          content: 'With help text',
          suffix: 'Optional',
          helpText: 'This action is reversible'
        },
      ]}
    />
  );
}

export default ActionListWithPrefixAndSuffix;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li>
    <button>
      <span class="prefix">✓</span>
      Active status
      <span class="suffix">Enabled</span>
    </button>
  </li>
  <li>
    <button>
      <span class="prefix">○</span>
      Inactive status
      <span class="suffix">Disabled</span>
    </button>
  </li>
  <li>
    <button>
      With help text
      <span class="suffix">Optional</span>
      <div class="help-text">This action is reversible</div>
    </button>
  </li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'Active status',
      iconCls: 'icon-check-circle',
      cls: 'success',
      rightIcon: 'Enabled'
    },
    {
      text: 'Inactive status',
      iconCls: 'icon-disabled',
      cls: 'subdued',
      rightIcon: 'Disabled'
    },
    {
      text: 'With help text',
      rightIcon: 'Optional',
      tooltip: 'This action is reversible'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, Icon, ActionListItemDescriptor } from '@shopify/polaris';
import { CheckCircleIcon, DisabledIcon } from '@shopify/polaris-icons';

function ActionListWithPrefixAndSuffix(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    {
      content: 'Active status',
      prefix: <Icon source={CheckCircleIcon} tone="success" />,
      suffix: 'Enabled'
    },
    {
      content: 'Inactive status',
      prefix: <Icon source={DisabledIcon} tone="subdued" />,
      suffix: 'Disabled'
    },
    {
      content: 'With help text',
      suffix: 'Optional',
      helpText: 'This action is reversible'
    },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithPrefixAndSuffix;`
  },

  'with-destructive-actions': {
    react: `import { ActionList } from '@shopify/polaris';
import { EditIcon, SettingsIcon, DeleteIcon } from '@shopify/polaris-icons';

function ActionListWithDestructiveActions() {
  return (
    <ActionList
      items={[
        { content: 'Safe action', icon: EditIcon },
        { content: 'Warning action', icon: SettingsIcon, destructive: true },
        { content: 'Delete permanently', icon: DeleteIcon, destructive: true },
        { content: 'Remove access', destructive: true },
      ]}
    />
  );
}

export default ActionListWithDestructiveActions;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li><button>✏️ Safe action</button></li>
  <li class="destructive"><button>⚙️ Warning action</button></li>
  <li class="destructive"><button>🗑️ Delete permanently</button></li>
  <li class="destructive"><button>Remove access</button></li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'Safe action', iconCls: 'icon-edit' },
    { text: 'Warning action', iconCls: 'icon-settings', cls: 'destructive' },
    { text: 'Delete permanently', iconCls: 'icon-delete', cls: 'destructive' },
    { text: 'Remove access', cls: 'destructive' }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { EditIcon, SettingsIcon, DeleteIcon } from '@shopify/polaris-icons';

function ActionListWithDestructiveActions(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'Safe action', icon: EditIcon },
    { content: 'Warning action', icon: SettingsIcon, destructive: true },
    { content: 'Delete permanently', icon: DeleteIcon, destructive: true },
    { content: 'Remove access', destructive: true },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithDestructiveActions;`
  },

  'with-external-links': {
    react: `import { ActionList } from '@shopify/polaris';

function ActionListWithExternalLinks() {
  return (
    <ActionList
      items={[
        { content: 'Visit documentation', url: 'https://polaris.shopify.com', external: true },
        { content: 'Open support', url: 'https://support.shopify.com', external: true },
        { content: 'View API docs', url: '#', external: true },
      ]}
    />
  );
}

export default ActionListWithExternalLinks;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li>
    <a href="https://polaris.shopify.com" target="_blank" rel="noopener">
      Visit documentation 🔗
    </a>
  </li>
  <li>
    <a href="https://support.shopify.com" target="_blank" rel="noopener">
      Open support 🔗
    </a>
  </li>
  <li>
    <a href="#" target="_blank" rel="noopener">
      View API docs 🔗
    </a>
  </li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'Visit documentation',
      iconCls: 'icon-external-link',
      handler: function() {
        window.open('https://polaris.shopify.com', '_blank');
      }
    },
    {
      text: 'Open support',
      iconCls: 'icon-external-link',
      handler: function() {
        window.open('https://support.shopify.com', '_blank');
      }
    },
    {
      text: 'View API docs',
      iconCls: 'icon-external-link',
      handler: function() {
        window.open('#', '_blank');
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';

function ActionListWithExternalLinks(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'Visit documentation', url: 'https://polaris.shopify.com', external: true },
    { content: 'Open support', url: 'https://support.shopify.com', external: true },
    { content: 'View API docs', url: '#', external: true },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithExternalLinks;`
  },

  'nested-menu-example': {
    react: `import { ActionList } from '@shopify/polaris';
import { SearchIcon, ExportIcon, SettingsIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function NestedMenuExample() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setActiveMenu(null);
  };

  const menuItems = {
    products: [
      { content: 'All products', onAction: () => handleActionClick('All products') },
      { content: 'Add product', onAction: () => handleActionClick('Add product') },
      { content: 'Import products', onAction: () => handleActionClick('Import products') },
      { content: 'Export products', onAction: () => handleActionClick('Export products') },
    ],
    orders: [
      { content: 'All orders', onAction: () => handleActionClick('All orders') },
      { content: 'Draft orders', onAction: () => handleActionClick('Draft orders') },
      { content: 'Abandoned checkouts', onAction: () => handleActionClick('Abandoned checkouts') },
    ],
    customers: [
      { content: 'All customers', onAction: () => handleActionClick('All customers') },
      { content: 'Customer groups', onAction: () => handleActionClick('Customer groups') },
      { content: 'Import customers', onAction: () => handleActionClick('Import customers') },
    ],
  };

  return (
    <div>
      <ActionList
        items={[
          { content: 'Products', icon: SearchIcon, onAction: () => setActiveMenu('products') },
          { content: 'Orders', icon: ExportIcon, onAction: () => setActiveMenu('orders') },
          { content: 'Customers', icon: SettingsIcon, onAction: () => setActiveMenu('customers') },
        ]}
      />
      {activeMenu && menuItems[activeMenu as keyof typeof menuItems] && (
        <ActionList items={menuItems[activeMenu as keyof typeof menuItems]} />
      )}
      {selectedAction && <p>Selected: {selectedAction}</p>}
    </div>
  );
}

export default NestedMenuExample;`,

    vanilla: `<div class="nested-menu">
  <ul class="main-menu">
    <li><button data-menu="products">🔍 Products</button></li>
    <li><button data-menu="orders">📤 Orders</button></li>
    <li><button data-menu="customers">⚙️ Customers</button></li>
  </ul>
  <div id="submenu" style="display: none;"></div>
</div>

<script>
const submenus = {
  products: ['All products', 'Add product', 'Import products', 'Export products'],
  orders: ['All orders', 'Draft orders', 'Abandoned checkouts'],
  customers: ['All customers', 'Customer groups', 'Import customers']
};

document.querySelectorAll('[data-menu]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const menu = e.target.dataset.menu;
    const submenu = document.getElementById('submenu');
    submenu.innerHTML = submenus[menu].map(item =>
      \`<button>\${item}</button>\`
    ).join('');
    submenu.style.display = 'block';
  });
});
</script>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'Products',
      iconCls: 'icon-search',
      menu: {
        items: [
          { text: 'All products' },
          { text: 'Add product' },
          { text: 'Import products' },
          { text: 'Export products' }
        ]
      }
    },
    {
      text: 'Orders',
      iconCls: 'icon-export',
      menu: {
        items: [
          { text: 'All orders' },
          { text: 'Draft orders' },
          { text: 'Abandoned checkouts' }
        ]
      }
    },
    {
      text: 'Customers',
      iconCls: 'icon-settings',
      menu: {
        items: [
          { text: 'All customers' },
          { text: 'Customer groups' },
          { text: 'Import customers' }
        ]
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { SearchIcon, ExportIcon, SettingsIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

type MenuKey = 'products' | 'orders' | 'customers';

interface NestedMenuExampleProps {
  onSelect?: (action: string) => void;
}

function NestedMenuExample({ onSelect }: NestedMenuExampleProps): JSX.Element {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleActionClick = useCallback((action: string) => {
    setSelectedAction(action);
    setActiveMenu(null);
    onSelect?.(action);
  }, [onSelect]);

  const menuItems: Record<MenuKey, ActionListItemDescriptor[]> = {
    products: [
      { content: 'All products', onAction: () => handleActionClick('All products') },
      { content: 'Add product', onAction: () => handleActionClick('Add product') },
      { content: 'Import products', onAction: () => handleActionClick('Import products') },
      { content: 'Export products', onAction: () => handleActionClick('Export products') },
    ],
    orders: [
      { content: 'All orders', onAction: () => handleActionClick('All orders') },
      { content: 'Draft orders', onAction: () => handleActionClick('Draft orders') },
      { content: 'Abandoned checkouts', onAction: () => handleActionClick('Abandoned checkouts') },
    ],
    customers: [
      { content: 'All customers', onAction: () => handleActionClick('All customers') },
      { content: 'Customer groups', onAction: () => handleActionClick('Customer groups') },
      { content: 'Import customers', onAction: () => handleActionClick('Import customers') },
    ],
  };

  return (
    <div>
      <ActionList
        items={[
          { content: 'Products', icon: SearchIcon, onAction: () => setActiveMenu('products') },
          { content: 'Orders', icon: ExportIcon, onAction: () => setActiveMenu('orders') },
          { content: 'Customers', icon: SettingsIcon, onAction: () => setActiveMenu('customers') },
        ]}
      />
      {activeMenu && menuItems[activeMenu] && (
        <ActionList items={menuItems[activeMenu]} />
      )}
      {selectedAction && <p>Selected: {selectedAction}</p>}
    </div>
  );
}

export default NestedMenuExample;`
  },

  'bulk-actions-example': {
    react: `import { ActionList, Button, Popover } from '@shopify/polaris';
import { EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function BulkActionsExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { id: '1', name: 'Product A', status: 'Active' },
    { id: '2', name: 'Product B', status: 'Draft' },
    { id: '3', name: 'Product C', status: 'Active' },
    { id: '4', name: 'Product D', status: 'Archived' },
  ];

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(\`Bulk action: \${action} on items:\`, selectedItems);
    setIsMenuOpen(false);
  };

  const bulkActions = [
    { content: 'Edit selected', icon: EditIcon, onAction: () => handleBulkAction('edit') },
    { content: 'Duplicate selected', icon: DuplicateIcon, onAction: () => handleBulkAction('duplicate') },
    { content: 'Archive selected', onAction: () => handleBulkAction('archive') },
    { content: 'Delete selected', icon: DeleteIcon, destructive: true, onAction: () => handleBulkAction('delete') },
  ];

  return (
    <div>
      <div>
        <h4>Products ({selectedItems.length} selected)</h4>
        {selectedItems.length > 0 && (
          <Popover
            active={isMenuOpen}
            activator={<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Bulk actions</Button>}
            onClose={() => setIsMenuOpen(false)}
          >
            <ActionList items={bulkActions} />
          </Popover>
        )}
      </div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleSelectItem(item.id)}>
          <input type="checkbox" checked={selectedItems.includes(item.id)} />
          <span>{item.name}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
}

export default BulkActionsExample;`,

    vanilla: `<div class="bulk-actions">
  <div class="header">
    <h4>Products (<span id="selected-count">0</span> selected)</h4>
    <button id="bulk-menu" style="display: none;">Bulk actions</button>
  </div>
  <div class="items">
    <div data-id="1"><input type="checkbox"> Product A</div>
    <div data-id="2"><input type="checkbox"> Product B</div>
    <div data-id="3"><input type="checkbox"> Product C</div>
    <div data-id="4"><input type="checkbox"> Product D</div>
  </div>
</div>

<script>
let selected = [];
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', (e) => {
    const id = e.target.parentElement.dataset.id;
    selected = e.target.checked
      ? [...selected, id]
      : selected.filter(i => i !== id);
    document.getElementById('selected-count').textContent = selected.length;
    document.getElementById('bulk-menu').style.display =
      selected.length > 0 ? 'block' : 'none';
  });
});
</script>`,

    extjs: `Ext.create('Ext.grid.Panel', {
  selModel: {
    mode: 'MULTI'
  },
  store: {
    fields: ['id', 'name', 'status'],
    data: [
      { id: 1, name: 'Product A', status: 'Active' },
      { id: 2, name: 'Product B', status: 'Draft' },
      { id: 3, name: 'Product C', status: 'Active' },
      { id: 4, name: 'Product D', status: 'Archived' }
    ]
  },
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 }
  ],
  dockedItems: [{
    xtype: 'toolbar',
    items: [{
      text: 'Bulk actions',
      menu: {
        items: [
          { text: 'Edit selected', iconCls: 'icon-edit' },
          { text: 'Duplicate selected', iconCls: 'icon-duplicate' },
          { text: 'Archive selected' },
          { text: 'Delete selected', iconCls: 'icon-delete', cls: 'destructive' }
        ]
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, Button, Popover, ActionListItemDescriptor } from '@shopify/polaris';
import { EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface Item {
  id: string;
  name: string;
  status: string;
}

interface BulkActionsExampleProps {
  onBulkAction?: (action: string, items: string[]) => void;
}

function BulkActionsExample({ onBulkAction }: BulkActionsExampleProps): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items: Item[] = [
    { id: '1', name: 'Product A', status: 'Active' },
    { id: '2', name: 'Product B', status: 'Draft' },
    { id: '3', name: 'Product C', status: 'Active' },
    { id: '4', name: 'Product D', status: 'Archived' },
  ];

  const handleSelectItem = useCallback((itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  }, []);

  const handleBulkAction = useCallback((action: string) => {
    console.log(\`Bulk action: \${action} on items:\`, selectedItems);
    onBulkAction?.(action, selectedItems);
    setIsMenuOpen(false);
  }, [selectedItems, onBulkAction]);

  const bulkActions: ActionListItemDescriptor[] = [
    { content: 'Edit selected', icon: EditIcon, onAction: () => handleBulkAction('edit') },
    { content: 'Duplicate selected', icon: DuplicateIcon, onAction: () => handleBulkAction('duplicate') },
    { content: 'Archive selected', onAction: () => handleBulkAction('archive') },
    { content: 'Delete selected', icon: DeleteIcon, destructive: true, onAction: () => handleBulkAction('delete') },
  ];

  return (
    <div>
      <div>
        <h4>Products ({selectedItems.length} selected)</h4>
        {selectedItems.length > 0 && (
          <Popover
            active={isMenuOpen}
            activator={<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Bulk actions</Button>}
            onClose={() => setIsMenuOpen(false)}
          >
            <ActionList items={bulkActions} />
          </Popover>
        )}
      </div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleSelectItem(item.id)}>
          <input type="checkbox" checked={selectedItems.includes(item.id)} readOnly />
          <span>{item.name}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
}

export default BulkActionsExample;`
  },

  'context-menu-example': {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: string } | null>(null);
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  const handleContextMenu = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleAction = (action: string) => {
    if (contextMenu) {
      const message = \`\${action} - \${contextMenu.item}\`;
      setActionHistory(prev => [message, ...prev.slice(0, 4)]);
      setContextMenu(null);
    }
  };

  const items = ['Product A - T-Shirt', 'Product B - Jeans', 'Product C - Shoes', 'Product D - Hat'];

  const contextActions = [
    { content: 'View details', icon: ViewIcon, onAction: () => handleAction('View details') },
    { content: 'Edit', icon: EditIcon, onAction: () => handleAction('Edit') },
    { content: 'Duplicate', icon: DuplicateIcon, onAction: () => handleAction('Duplicate') },
    { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => handleAction('Delete') },
  ];

  return (
    <div>
      <h4>Right-click items for context menu</h4>
      {items.map((item, index) => (
        <div key={index} onContextMenu={(e) => handleContextMenu(e, item)}>
          {item}
        </div>
      ))}
      {contextMenu && (
        <div style={{ position: 'fixed', left: contextMenu.x, top: contextMenu.y }}>
          <ActionList items={contextActions} />
        </div>
      )}
      {actionHistory.length > 0 && (
        <div>
          <h5>Recent Actions:</h5>
          {actionHistory.map((action, index) => <div key={index}>{action}</div>)}
        </div>
      )}
    </div>
  );
}

export default ContextMenuExample;`,

    vanilla: `<div id="items-container">
  <div class="item" data-name="Product A">Product A - T-Shirt</div>
  <div class="item" data-name="Product B">Product B - Jeans</div>
  <div class="item" data-name="Product C">Product C - Shoes</div>
  <div class="item" data-name="Product D">Product D - Hat</div>
</div>
<div id="context-menu" style="display: none; position: fixed;">
  <button data-action="view">👁️ View details</button>
  <button data-action="edit">✏️ Edit</button>
  <button data-action="duplicate">📋 Duplicate</button>
  <button data-action="delete">🗑️ Delete</button>
</div>

<script>
let currentItem = null;

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    currentItem = e.target.dataset.name;
    const menu = document.getElementById('context-menu');
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.style.display = 'block';
  });
});

document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    console.log(\`\${action} - \${currentItem}\`);
    document.getElementById('context-menu').style.display = 'none';
  });
});

document.addEventListener('click', () => {
  document.getElementById('context-menu').style.display = 'none';
});
</script>`,

    extjs: `Ext.create('Ext.view.View', {
  store: {
    fields: ['name'],
    data: [
      { name: 'Product A - T-Shirt' },
      { name: 'Product B - Jeans' },
      { name: 'Product C - Shoes' },
      { name: 'Product D - Hat' }
    ]
  },
  tpl: '<div class="item">{name}</div>',
  itemSelector: 'div.item',
  listeners: {
    itemcontextmenu: function(view, record, item, index, e) {
      e.stopEvent();
      const menu = Ext.create('Ext.menu.Menu', {
        items: [
          {
            text: 'View details',
            iconCls: 'icon-view',
            handler: function() {
              console.log('View - ' + record.get('name'));
            }
          },
          {
            text: 'Edit',
            iconCls: 'icon-edit',
            handler: function() {
              console.log('Edit - ' + record.get('name'));
            }
          },
          {
            text: 'Duplicate',
            iconCls: 'icon-duplicate',
            handler: function() {
              console.log('Duplicate - ' + record.get('name'));
            }
          },
          '-',
          {
            text: 'Delete',
            iconCls: 'icon-delete',
            cls: 'destructive',
            handler: function() {
              console.log('Delete - ' + record.get('name'));
            }
          }
        ]
      });
      menu.showAt(e.getXY());
    }
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface ContextMenuState {
  x: number;
  y: number;
  item: string;
}

interface ContextMenuExampleProps {
  onAction?: (action: string, item: string) => void;
}

function ContextMenuExample({ onAction }: ContextMenuExampleProps): JSX.Element {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  const handleContextMenu = useCallback((e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  }, []);

  const handleAction = useCallback((action: string) => {
    if (contextMenu) {
      const message = \`\${action} - \${contextMenu.item}\`;
      setActionHistory(prev => [message, ...prev.slice(0, 4)]);
      onAction?.(action, contextMenu.item);
      setContextMenu(null);
    }
  }, [contextMenu, onAction]);

  const items: string[] = ['Product A - T-Shirt', 'Product B - Jeans', 'Product C - Shoes', 'Product D - Hat'];

  const contextActions: ActionListItemDescriptor[] = [
    { content: 'View details', icon: ViewIcon, onAction: () => handleAction('View details') },
    { content: 'Edit', icon: EditIcon, onAction: () => handleAction('Edit') },
    { content: 'Duplicate', icon: DuplicateIcon, onAction: () => handleAction('Duplicate') },
    { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => handleAction('Delete') },
  ];

  return (
    <div>
      <h4>Right-click items for context menu</h4>
      {items.map((item, index) => (
        <div key={index} onContextMenu={(e) => handleContextMenu(e, item)}>
          {item}
        </div>
      ))}
      {contextMenu && (
        <div style={{ position: 'fixed', left: contextMenu.x, top: contextMenu.y, zIndex: 1000 }}>
          <ActionList items={contextActions} />
        </div>
      )}
      {actionHistory.length > 0 && (
        <div>
          <h5>Recent Actions:</h5>
          {actionHistory.map((action, index) => <div key={index}>{action}</div>)}
        </div>
      )}
    </div>
  );
}

export default ContextMenuExample;`
  }
};

// BulkActions Component Examples
export const bulkActionsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { IndexTable, Card, useIndexResourceState, BulkActions } from '@shopify/polaris';
import { useState } from 'react';

function BulkActionsExample() {
  const customers = [
    { id: '1', name: 'Mae Jemison', location: 'Decatur, USA' },
    { id: '2', name: 'Ellen Ochoa', location: 'Los Angeles, USA' },
    { id: '3', name: 'Sally Ride', location: 'San Diego, USA' },
  ];

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Edit customers', selectedResources),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Add tags', selectedResources),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Remove tags', selectedResources),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Delete customers', selectedResources),
    },
  ];

  return (
    <Card>
      <IndexTable
        resourceName={{ singular: 'customer', plural: 'customers' }}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        headings={[{ title: 'Name' }, { title: 'Location' }]}
      >
        {customers.map(({ id, name, location }, index) => (
          <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
          >
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{location}</IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </Card>
  );
}`,

    extjs: `// ExtJS Grid with bulk actions toolbar
Ext.create('Ext.grid.Panel', {
  title: 'Customer List',
  store: {
    data: [
      { id: 1, name: 'Mae Jemison', location: 'Decatur, USA' },
      { id: 2, name: 'Ellen Ochoa', location: 'Los Angeles, USA' },
      { id: 3, name: 'Sally Ride', location: 'San Diego, USA' }
    ]
  },
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Location', dataIndex: 'location', flex: 1 }
  ],
  selModel: {
    mode: 'MULTI',
    listeners: {
      selectionchange: function(sm, selected) {
        const toolbar = this.up('grid').down('toolbar');
        const count = selected.length;
        toolbar.setVisible(count > 0);
        toolbar.down('#selectionText').setText(
          count + ' customer' + (count !== 1 ? 's' : '') + ' selected'
        );
      }
    }
  },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    hidden: true,
    items: [{
      xtype: 'tbtext',
      itemId: 'selectionText',
      text: '0 customers selected'
    }, '->', {
      text: 'Edit Customers',
      iconCls: 'icon-edit',
      handler: function() {
        const grid = this.up('grid');
        const selected = grid.getSelection();
        console.log('Edit', selected);
      }
    }, {
      text: 'Add Tags',
      iconCls: 'icon-tag',
      handler: function() {
        const grid = this.up('grid');
        const selected = grid.getSelection();
        console.log('Add tags', selected);
      }
    }, {
      text: 'Delete',
      iconCls: 'icon-delete',
      cls: 'destructive-btn',
      handler: function() {
        const grid = this.up('grid');
        const selected = grid.getSelection();
        Ext.Msg.confirm('Delete',
          'Delete ' + selected.length + ' customer(s)?',
          function(btn) {
            if (btn === 'yes') {
              console.log('Delete', selected);
            }
          }
        );
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="customer-list">
  <div class="bulk-actions-bar" id="bulk-actions" style="display: none;">
    <span id="selection-count">0 customers selected</span>
    <div class="actions">
      <button class="btn-primary" id="edit-btn">Edit Customers</button>
      <button class="btn-secondary" id="tags-btn">Add Tags</button>
      <button class="btn-destructive" id="delete-btn">Delete</button>
    </div>
  </div>

  <table class="data-table">
    <thead>
      <tr>
        <th><input type="checkbox" id="select-all"></th>
        <th>Name</th>
        <th>Location</th>
      </tr>
    </thead>
    <tbody id="customer-tbody">
      <tr data-id="1">
        <td><input type="checkbox" class="row-select" value="1"></td>
        <td>Mae Jemison</td>
        <td>Decatur, USA</td>
      </tr>
      <tr data-id="2">
        <td><input type="checkbox" class="row-select" value="2"></td>
        <td>Ellen Ochoa</td>
        <td>Los Angeles, USA</td>
      </tr>
      <tr data-id="3">
        <td><input type="checkbox" class="row-select" value="3"></td>
        <td>Sally Ride</td>
        <td>San Diego, USA</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
// Bulk actions behavior
const bulkActionsBar = document.getElementById('bulk-actions');
const selectionCount = document.getElementById('selection-count');
const selectAll = document.getElementById('select-all');
const rowCheckboxes = document.querySelectorAll('.row-select');

function updateBulkActions() {
  const selected = Array.from(rowCheckboxes).filter(cb => cb.checked);
  const count = selected.length;

  if (count > 0) {
    bulkActionsBar.style.display = 'flex';
    selectionCount.textContent = count + ' customer' + (count !== 1 ? 's' : '') + ' selected';
  } else {
    bulkActionsBar.style.display = 'none';
  }

  selectAll.checked = count === rowCheckboxes.length;
  selectAll.indeterminate = count > 0 && count < rowCheckboxes.length;
}

selectAll.addEventListener('change', (e) => {
  rowCheckboxes.forEach(cb => cb.checked = e.target.checked);
  updateBulkActions();
});

rowCheckboxes.forEach(cb => {
  cb.addEventListener('change', updateBulkActions);
});

document.getElementById('edit-btn').addEventListener('click', () => {
  const selected = Array.from(rowCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  console.log('Edit customers:', selected);
});

document.getElementById('tags-btn').addEventListener('click', () => {
  const selected = Array.from(rowCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  console.log('Add tags:', selected);
});

document.getElementById('delete-btn').addEventListener('click', () => {
  const selected = Array.from(rowCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);
  if (confirm('Delete ' + selected.length + ' customer(s)?')) {
    console.log('Delete customers:', selected);
  }
});
</script>`,

    typescript: `import { IndexTable, Card, useIndexResourceState, BulkActions } from '@shopify/polaris';
import { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  location: string;
}

interface BulkActionsExampleProps {
  customers?: Customer[];
  onEdit?: (ids: string[]) => void;
  onAddTags?: (ids: string[]) => void;
  onDelete?: (ids: string[]) => void;
}

function BulkActionsExample({
  customers = [
    { id: '1', name: 'Mae Jemison', location: 'Decatur, USA' },
    { id: '2', name: 'Ellen Ochoa', location: 'Los Angeles, USA' },
    { id: '3', name: 'Sally Ride', location: 'San Diego, USA' },
  ],
  onEdit,
  onAddTags,
  onDelete,
}: BulkActionsExampleProps): JSX.Element {
  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => {
        console.log('Edit customers', selectedResources);
        onEdit?.(selectedResources);
      },
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => {
        console.log('Add tags', selectedResources);
        onAddTags?.(selectedResources);
      },
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Remove tags', selectedResources),
    },
    {
      content: 'Delete customers',
      onAction: () => {
        console.log('Delete customers', selectedResources);
        onDelete?.(selectedResources);
      },
    },
  ];

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        headings={[{ title: 'Name' }, { title: 'Location' }]}
      >
        {customers.map(({ id, name, location }, index) => (
          <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
          >
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{location}</IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </Card>
  );
}`
  }
};

// Filters Component Examples
export const filtersExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Filters, Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function FiltersExample() {
  const [queryValue, setQueryValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  const handleQueryChange = useCallback((value: string) => {
    setQueryValue(value);
  }, []);

  const handleQueryClear = useCallback(() => {
    setQueryValue('');
  }, []);

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <Select
          label="Status"
          options={[
            { label: 'All', value: '' },
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          onChange={() => {}}
        />
      ),
    },
  ];

  return (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryChange}
      onQueryClear={handleQueryClear}
      onFiltersChange={setAppliedFilters}
    />
  );
}`,

    extjs: `// ExtJS Grid with filtering toolbar
Ext.create('Ext.grid.Panel', {
  title: 'Product Filters',
  tbar: [{
    xtype: 'textfield',
    fieldLabel: 'Search',
    name: 'search',
    width: 300,
    listeners: {
      change: function(field, newValue) {
        const grid = this.up('grid');
        const store = grid.getStore();
        store.clearFilter();
        if (newValue) {
          store.filter('name', newValue);
        }
      }
    }
  }, {
    xtype: 'combo',
    fieldLabel: 'Status',
    store: ['All', 'Active', 'Draft', 'Archived'],
    value: 'All',
    width: 200,
    listeners: {
      select: function(combo, record) {
        const grid = this.up('grid');
        const store = grid.getStore();
        if (record.get('field1') !== 'All') {
          store.filter('status', record.get('field1'));
        } else {
          store.clearFilter();
        }
      }
    }
  }],
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 }
  ],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="filters-container">
  <div class="search-box">
    <input
      type="text"
      id="search-input"
      placeholder="Search..."
      class="filter-search"
    />
  </div>

  <div class="filter-controls">
    <select id="status-filter" class="filter-select">
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="draft">Draft</option>
      <option value="archived">Archived</option>
    </select>
  </div>

  <div id="applied-filters" class="applied-filters"></div>
</div>

<script>
import { on, $ } from '@cin7/vanilla-js';

const searchInput = $('#search-input');
const statusFilter = $('#status-filter');
const appliedFiltersEl = $('#applied-filters');

on(searchInput, 'input', (e) => {
  const query = e.target.value;
  // Filter data based on query
  filterData({ query, status: statusFilter.value });
});

on(statusFilter, 'change', (e) => {
  const status = e.target.value;
  filterData({ query: searchInput.value, status });
  updateAppliedFilters(status);
});

function filterData(filters) {
  // Apply filters to your data
  console.log('Filtering with:', filters);
}
</script>`,

    typescript: `import { Filters, Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface Filter {
  key: string;
  label: string;
  filter: JSX.Element;
}

interface FiltersExampleProps {
  onFiltersApply?: (filters: any[]) => void;
}

function FiltersExample({
  onFiltersApply
}: FiltersExampleProps): JSX.Element {
  const [queryValue, setQueryValue] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

  const handleQueryChange = useCallback((value: string) => {
    setQueryValue(value);
  }, []);

  const handleQueryClear = useCallback(() => {
    setQueryValue('');
  }, []);

  const handleFiltersChange = useCallback((filters: any[]) => {
    setAppliedFilters(filters);
    onFiltersApply?.(filters);
  }, [onFiltersApply]);

  const filters: Filter[] = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <Select
          label="Status"
          options={[
            { label: 'All', value: '' },
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          onChange={() => {}}
        />
      ),
    },
  ];

  return (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryChange}
      onQueryClear={handleQueryClear}
      onFiltersChange={handleFiltersChange}
    />
  );
}`
  }
};

// Scrollable Component Examples
export const scrollableExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Scrollable, Card, Text } from '@shopify/polaris';

function ScrollableExample() {
  return (
    <Scrollable height="200px" shadow>
      <div style={{ padding: '16px' }}>
        {Array.from({ length: 15 }, (_, i) => (
          <Card key={i} sectioned style={{ marginBottom: '12px' }}>
            <Text variant="headingSm">Card {i + 1}</Text>
            <Text variant="bodyMd">
              This is card number {i + 1} in the scrollable container.
            </Text>
          </Card>
        ))}
      </div>
    </Scrollable>
  );
}`,

    extjs: `// ExtJS Panel with scrollable content
Ext.create('Ext.panel.Panel', {
  title: 'Scrollable Content',
  width: 400,
  height: 300,
  autoScroll: true,
  scrollable: true,
  items: [{
    xtype: 'container',
    html: Array.from({ length: 20 }, (_, i) =>
      '<div style="padding: 16px; margin: 8px; border: 1px solid #ccc;">' +
      '<h4>Item ' + (i + 1) + '</h4>' +
      '<p>This is scrollable content item ' + (i + 1) + '</p>' +
      '</div>'
    ).join('')
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="scrollable-container" style="height: 300px; overflow-y: auto;">
  <div class="scrollable-content">
    <div class="scroll-item">Item 1</div>
    <div class="scroll-item">Item 2</div>
    <div class="scroll-item">Item 3</div>
    <!-- More items... -->
  </div>
</div>

<style>
.scrollable-container {
  position: relative;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.scrollable-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.scroll-item {
  padding: 16px;
  margin: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: white;
}
</style>

<script>
import { on, $ } from '@cin7/vanilla-js';

const scrollContainer = $('.scrollable-container');

// Detect scroll to bottom
on(scrollContainer, 'scroll', (e) => {
  const el = e.target;
  const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
  if (isBottom) {
    console.log('Scrolled to bottom!');
  }
});
</script>`,

    typescript: `import { Scrollable, Card, Text } from '@shopify/polaris';
import { ReactNode } from 'react';

interface ScrollableExampleProps {
  height?: string;
  children?: ReactNode;
  onScrolledToBottom?: () => void;
}

function ScrollableExample({
  height = '200px',
  children,
  onScrolledToBottom
}: ScrollableExampleProps): JSX.Element {
  const items = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: 'Card ' + (i + 1),
    content: 'This is card number ' + (i + 1)
  }));

  return (
    <Scrollable
      height={height}
      shadow
      onScrolledToBottom={onScrolledToBottom}
    >
      <div style={{ padding: '16px' }}>
        {children || items.map((item) => (
          <Card key={item.id} sectioned style={{ marginBottom: '12px' }}>
            <Text variant="headingSm">{item.title}</Text>
            <Text variant="bodyMd">{item.content}</Text>
          </Card>
        ))}
      </div>
    </Scrollable>
  );
}`
  }
};

// Collapsible Component Examples
export const collapsibleExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Collapsible, Button } from '@shopify/polaris';
import { useState } from 'react';

function CollapsibleExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        ariaExpanded={open}
        ariaControls="basic-collapsible"
      >
        {open ? 'Hide' : 'Show'} Details
      </Button>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition
      >
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          marginTop: '8px'
        }}>
          This is collapsible content that can be shown or hidden.
        </div>
      </Collapsible>
    </div>
  );
}`,

    extjs: `// ExtJS Panel with collapsible region
Ext.create('Ext.panel.Panel', {
  title: 'Main Panel',
  width: 400,
  height: 300,
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'panel',
    title: 'Collapsible Details',
    collapsible: true,
    collapsed: true,
    height: 150,
    html: 'This is collapsible content that can be expanded or collapsed.'
  }, {
    region: 'center',
    xtype: 'panel',
    html: 'Main content area'
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="collapsible-wrapper">
  <button
    id="toggle-btn"
    class="collapsible-trigger"
    aria-expanded="false"
    aria-controls="collapsible-content"
  >
    Show Details
  </button>

  <div
    id="collapsible-content"
    class="collapsible-content"
    style="display: none;"
  >
    <div class="content-inner">
      This is collapsible content that can be shown or hidden.
    </div>
  </div>
</div>

<style>
.collapsible-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.collapsible-content.open {
  max-height: 500px;
}

.content-inner {
  padding: 16px;
  border: 1px solid #ddd;
  margin-top: 8px;
  border-radius: 4px;
}
</style>

<script>
import { on, $, toggleClass } from '@cin7/vanilla-js';

const toggleBtn = $('#toggle-btn');
const content = $('#collapsible-content');

on(toggleBtn, 'click', () => {
  const isOpen = content.classList.contains('open');

  toggleClass(content, 'open');
  toggleBtn.textContent = isOpen ? 'Show Details' : 'Hide Details';
  toggleBtn.setAttribute('aria-expanded', !isOpen);
});
</script>`,

    typescript: `import { Collapsible, Button } from '@shopify/polaris';
import { useState, ReactNode } from 'react';

interface CollapsibleExampleProps {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

function CollapsibleExample({
  title = 'Details',
  children,
  defaultOpen = false,
  onToggle
}: CollapsibleExampleProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div>
      <Button
        onClick={handleToggle}
        ariaExpanded={open}
        ariaControls="collapsible-content"
      >
        {open ? 'Hide' : 'Show'} {title}
      </Button>
      <Collapsible
        open={open}
        id="collapsible-content"
        transition
      >
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          marginTop: '8px',
          borderRadius: '4px'
        }}>
          {children || 'This is collapsible content.'}
        </div>
      </Collapsible>
    </div>
  );
}`
  }
};

// TextContainer Component Examples
export const textContainerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { TextContainer } from '@shopify/polaris';

function TextContainerExample() {
  return (
    <TextContainer>
      <h2>Welcome to Our Platform</h2>
      <p>
        This text container provides optimal reading width for your content.
        It ensures that lines of text don't become too long, which improves
        readability and user experience.
      </p>
    </TextContainer>
  );
}`,

    extjs: `// ExtJS Panel with constrained text width
Ext.create('Ext.panel.Panel', {
  title: 'Text Content',
  width: 600,
  bodyPadding: 20,
  style: {
    maxWidth: '65ch' // Optimal reading width
  },
  html:
    '<h2>Welcome to Our Platform</h2>' +
    '<p style="line-height: 1.6;">' +
    'This text container provides optimal reading width for your content. ' +
    'It ensures that lines of text don\\'t become too long, which improves ' +
    'readability and user experience.' +
    '</p>',
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="text-container">
  <h2>Welcome to Our Platform</h2>
  <p>
    This text container provides optimal reading width for your content.
    It ensures that lines of text don't become too long, which improves
    readability and user experience.
  </p>
</div>

<style>
.text-container {
  max-width: 65ch; /* Optimal reading width */
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

.text-container h2 {
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
}

.text-container p {
  color: #374151;
  margin-bottom: 16px;
}

.text-container p + p {
  margin-top: 16px;
}
</style>`,

    typescript: `import { TextContainer } from '@shopify/polaris';
import { ReactNode } from 'react';

interface TextContainerExampleProps {
  spacing?: boolean;
  children: ReactNode;
}

function TextContainerExample({
  spacing = false,
  children
}: TextContainerExampleProps): JSX.Element {
  return (
    <TextContainer spacing={spacing}>
      {children || (
        <>
          <h2>Welcome to Our Platform</h2>
          <p>
            This text container provides optimal reading width for your content.
            It ensures that lines of text don't become too long, which improves
            readability and user experience.
          </p>
        </>
      )}
    </TextContainer>
  );
}`
  }
};

// AppProvider Component Examples
export const appProviderExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { AppProvider, Page, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function AppProviderExample() {
  return (
    <AppProvider i18n={{}}>
      <Page title="My Application">
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Welcome to Cin7 DSL</Text>
            <Text as="p">
              This application is wrapped with AppProvider to provide
              global context, theming, and i18n support.
            </Text>
            <Button variant="primary">Get Started</Button>
          </BlockStack>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default AppProviderExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="app" data-theme="light" data-locale="en">
  <div class="page">
    <div class="page-header">
      <h1>My Application</h1>
    </div>
    <div class="card">
      <h2>Welcome to Cin7 DSL</h2>
      <p>
        This application uses a vanilla JS context provider pattern
        to manage global state, theming, and internationalization.
      </p>
      <button class="polaris-button polaris-button--primary">
        Get Started
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript context provider using @cin7/vanilla-js
import { createContext } from '@cin7/vanilla-js';

const AppContext = createContext({
  theme: 'light',
  locale: 'en',
  i18n: {}
});

// Initialize app with context
const app = document.getElementById('app');
AppContext.provide(app, {
  theme: app.dataset.theme,
  locale: app.dataset.locale,
  i18n: {} // Load translations here
});

// Components can access context
const context = AppContext.use(app);
console.log('App theme:', context.theme);
console.log('App locale:', context.locale);
</script>`,

    extjs: `// ExtJS Application with global configuration
Ext.application({
  name: 'Cin7App',

  // Global app configuration (similar to AppProvider)
  appConfig: {
    theme: 'neptune',
    locale: 'en',
    i18n: {}
  },

  launch: function() {
    // Create viewport with configured theme
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        xtype: 'panel',
        title: 'My Application',
        bodyPadding: 16,
        items: [{
          xtype: 'container',
          html: '<h2>Welcome to Cin7 DSL</h2>' +
                '<p>This application uses ExtJS application ' +
                'configuration to provide global context.</p>'
        }, {
          xtype: 'button',
          text: 'Get Started',
          ui: 'action',
          margin: '16 0 0 0',
          handler: function() {
            console.log('Get started clicked');
          }
        }]
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Page, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

interface AppConfig {
  theme?: 'light' | 'dark';
  locale?: string;
  features?: {
    enableBetaFeatures: boolean;
    enableAnalytics: boolean;
  };
}

interface AppProviderExampleProps {
  config?: AppConfig;
  children?: React.ReactNode;
}

function AppProviderExample({
  config = {
    theme: 'light',
    locale: 'en',
    features: {
      enableBetaFeatures: false,
      enableAnalytics: true
    }
  },
  children
}: AppProviderExampleProps): JSX.Element {
  const i18nConfig = {
    Polaris: {
      Common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete'
      }
    }
  };

  return (
    <AppProvider i18n={i18nConfig}>
      {children || (
        <Page title="My Application">
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Welcome to Cin7 DSL</Text>
              <Text as="p">
                Theme: {config.theme}, Locale: {config.locale}
              </Text>
              <Button variant="primary">Get Started</Button>
            </BlockStack>
          </Card>
        </Page>
      )}
    </AppProvider>
  );
}

export default AppProviderExample;`
  }
};

// IndexFilters Component Examples
export const indexFiltersExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {
  IndexFilters,
  Card,
  Filters,
  ChoiceList,
  useSetIndexFiltersMode
} from '@shopify/polaris';
import { useState } from 'react';

function IndexFiltersExample() {
  const [queryValue, setQueryValue] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortSelected, setSortSelected] = useState(['created_desc']);
  const { mode, setMode } = useSetIndexFiltersMode();

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          selected={[]}
          onChange={() => {}}
          allowMultiple
        />
      ),
    },
  ];

  const sortOptions = [
    { label: 'Created', value: 'created_asc', directionLabel: 'Oldest first' },
    { label: 'Created', value: 'created_desc', directionLabel: 'Newest first' },
  ];

  return (
    <Card padding="0">
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        onSortChange={setSortSelected}
        queryValue={queryValue}
        onQueryChange={setQueryValue}
        onQueryClear={() => setQueryValue('')}
        selected={selected}
        onSelectionChange={setSelected}
        tabs={[
          { content: 'All', id: 'all', panelID: 'all-content' },
          { content: 'Active', id: 'active', panelID: 'active-content' },
        ]}
        mode={mode}
        setMode={setMode}
        filters={
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={[]}
          />
        }
      />
    </Card>
  );
}`,

    extjs: `// ExtJS Grid with comprehensive filtering and sorting
Ext.create('Ext.grid.Panel', {
  title: 'Products',
  width: 800,
  height: 500,
  selModel: {
    mode: 'MULTI',
    checkboxSelect: true
  },
  tbar: [{
    xtype: 'textfield',
    emptyText: 'Search...',
    width: 300,
    listeners: {
      change: function(field, value) {
        const store = this.up('grid').getStore();
        store.clearFilter();
        if (value) {
          store.filter([{
            property: 'name',
            value: value,
            anyMatch: true,
            caseSensitive: false
          }]);
        }
      }
    }
  }, '->', {
    xtype: 'combo',
    fieldLabel: 'Sort by',
    store: [
      ['created_asc', 'Created (Oldest first)'],
      ['created_desc', 'Created (Newest first)'],
      ['name_asc', 'Name (A-Z)'],
      ['name_desc', 'Name (Z-A)']
    ],
    value: 'created_desc',
    listeners: {
      select: function(combo, record) {
        const store = this.up('grid').getStore();
        const [field, direction] = record.get('field1').split('_');
        store.sort(field, direction.toUpperCase());
      }
    }
  }],
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 },
    { text: 'Created', dataIndex: 'created', width: 150 }
  ],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="index-filters">
  <div class="filters-toolbar">
    <input
      type="text"
      id="search-query"
      placeholder="Search..."
      class="search-input"
    />

    <div class="filter-controls">
      <button id="filter-btn" class="filter-button">
        Filters
      </button>

      <select id="sort-select" class="sort-select">
        <option value="created_desc">Newest first</option>
        <option value="created_asc">Oldest first</option>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>
    </div>
  </div>

  <div class="tabs">
    <button class="tab active" data-tab="all">All</button>
    <button class="tab" data-tab="active">Active</button>
    <button class="tab" data-tab="draft">Draft</button>
  </div>

  <div id="results-container" class="results"></div>
</div>

<script>
import { on, $, $$ } from '@cin7/vanilla-js';

const searchInput = $('#search-query');
const sortSelect = $('#sort-select');
const tabs = $$('.tab');

on(searchInput, 'input', (e) => {
  filterResults({ query: e.target.value });
});

on(sortSelect, 'change', (e) => {
  sortResults(e.target.value);
});

tabs.forEach(tab => {
  on(tab, 'click', (e) => {
    tabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    filterResults({ tab: e.target.dataset.tab });
  });
});
</script>`,

    typescript: `import {
  IndexFilters,
  Card,
  Filters,
  ChoiceList,
  useSetIndexFiltersMode,
  IndexFiltersProps
} from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface Filter {
  key: string;
  label: string;
  filter: JSX.Element;
}

interface IndexFiltersExampleProps {
  onFilterChange?: (filters: any) => void;
  onSortChange?: (sort: string[]) => void;
}

function IndexFiltersExample({
  onFilterChange,
  onSortChange
}: IndexFiltersExampleProps): JSX.Element {
  const [queryValue, setQueryValue] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  const [sortSelected, setSortSelected] = useState<string[]>(['created_desc']);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { mode, setMode } = useSetIndexFiltersMode();

  const handleSortChange = useCallback((sort: string[]) => {
    setSortSelected(sort);
    onSortChange?.(sort);
  }, [onSortChange]);

  const filters: Filter[] = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          selected={[]}
          onChange={() => {}}
          allowMultiple
        />
      ),
    },
  ];

  const sortOptions = [
    { label: 'Created', value: 'created_asc', directionLabel: 'Oldest first' },
    { label: 'Created', value: 'created_desc', directionLabel: 'Newest first' },
  ];

  return (
    <Card padding="0">
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        onSortChange={handleSortChange}
        queryValue={queryValue}
        onQueryChange={setQueryValue}
        onQueryClear={() => setQueryValue('')}
        selected={selected}
        onSelectionChange={setSelected}
        tabs={[
          { content: 'All', id: 'all', panelID: 'all-content' },
          { content: 'Active', id: 'active', panelID: 'active-content' },
        ]}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        mode={mode}
        setMode={setMode}
        filters={
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={[]}
          />
        }
      />
    </Card>
  );
}`
  }
};

// CheckboxGroup Component Examples
export const checkboxGroupExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {Checkbox, BlockStack, Text, Card} from '@shopify/polaris';
import React, {useState} from 'react';

function CheckboxGroup() {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleCheckboxChange = (key: keyof typeof preferences) =>
    (checked: boolean) => {
      setPreferences(prev => ({...prev, [key]: checked}));
    };

  return (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">
          Notification Preferences
        </Text>

        <Checkbox
          label="Email notifications"
          checked={preferences.email}
          onChange={handleCheckboxChange('email')}
          helpText="Receive updates via email"
        />

        <Checkbox
          label="SMS notifications"
          checked={preferences.sms}
          onChange={handleCheckboxChange('sms')}
          helpText="Get text alerts"
        />

        <Checkbox
          label="Push notifications"
          checked={preferences.push}
          onChange={handleCheckboxChange('push')}
          helpText="Receive browser notifications"
        />
      </BlockStack>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Notification Preferences',
  bodyPadding: 16,
  width: 400,
  items: [{
    xtype: 'checkboxgroup',
    fieldLabel: 'Select Preferences',
    vertical: true,
    columns: 1,
    items: [{
      boxLabel: 'Email notifications',
      name: 'email',
      checked: true,
      listeners: {
        change: function(field, checked) {
          console.log('Email notifications:', checked);
        }
      }
    }, {
      boxLabel: 'SMS notifications',
      name: 'sms',
      checked: false,
      listeners: {
        change: function(field, checked) {
          console.log('SMS notifications:', checked);
        }
      }
    }, {
      boxLabel: 'Push notifications',
      name: 'push',
      checked: true,
      listeners: {
        change: function(field, checked) {
          console.log('Push notifications:', checked);
        }
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="checkbox-group">
  <h3 class="checkbox-group__title">Notification Preferences</h3>

  <div class="checkbox-field">
    <input type="checkbox" id="email-notif" checked />
    <label for="email-notif">
      <span class="checkbox-label">Email notifications</span>
      <span class="checkbox-help">Receive updates via email</span>
    </label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="sms-notif" />
    <label for="sms-notif">
      <span class="checkbox-label">SMS notifications</span>
      <span class="checkbox-help">Get text alerts</span>
    </label>
  </div>

  <div class="checkbox-field">
    <input type="checkbox" id="push-notif" checked />
    <label for="push-notif">
      <span class="checkbox-label">Push notifications</span>
      <span class="checkbox-help">Receive browser notifications</span>
    </label>
  </div>
</div>

<script>
const checkboxes = document.querySelectorAll('.checkbox-field input');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const label = e.target.nextElementSibling.querySelector('.checkbox-label').textContent;
    console.log(\`\${label}: \${isChecked}\`);
  });
});
</script>`,
    typescript: `import {Checkbox, BlockStack, Text, Card} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface CheckboxGroupProps {
  title?: string;
  defaultValues?: Record<string, boolean>;
  onPreferencesChange?: (preferences: Record<string, boolean>) => void;
}

interface PreferenceItem {
  key: string;
  label: string;
  helpText: string;
}

function CheckboxGroup({
  title = 'Notification Preferences',
  defaultValues = {email: true, sms: false, push: true},
  onPreferencesChange
}: CheckboxGroupProps): JSX.Element {
  const [preferences, setPreferences] = useState<Record<string, boolean>>(
    defaultValues
  );

  const items: PreferenceItem[] = [
    {key: 'email', label: 'Email notifications', helpText: 'Receive updates via email'},
    {key: 'sms', label: 'SMS notifications', helpText: 'Get text alerts'},
    {key: 'push', label: 'Push notifications', helpText: 'Receive browser notifications'}
  ];

  const handleCheckboxChange = useCallback((key: string) =>
    (checked: boolean) => {
      const newPreferences = {...preferences, [key]: checked};
      setPreferences(newPreferences);
      onPreferencesChange?.(newPreferences);
    }, [preferences, onPreferencesChange]
  );

  return (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">{title}</Text>
        {items.map(item => (
          <Checkbox
            key={item.key}
            label={item.label}
            checked={preferences[item.key]}
            onChange={handleCheckboxChange(item.key)}
            helpText={item.helpText}
          />
        ))}
      </BlockStack>
    </Card>
  );
}`
  }
};

// OptionList Component Examples
export const optionListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function OptionListExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Select options"
      options={[
        {value: 'today', label: 'Today'},
        {value: 'yesterday', label: 'Yesterday'},
        {value: 'lastWeek', label: 'Last 7 days'},
        {value: 'lastMonth', label: 'Last 30 days'},
        {value: 'custom', label: 'Custom range'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Select options',
  vertical: true,
  columns: 1,
  items: [{
    boxLabel: 'Today',
    name: 'dateRange',
    inputValue: 'today'
  }, {
    boxLabel: 'Yesterday',
    name: 'dateRange',
    inputValue: 'yesterday'
  }, {
    boxLabel: 'Last 7 days',
    name: 'dateRange',
    inputValue: 'lastWeek'
  }, {
    boxLabel: 'Last 30 days',
    name: 'dateRange',
    inputValue: 'lastMonth'
  }, {
    boxLabel: 'Custom range',
    name: 'dateRange',
    inputValue: 'custom'
  }],
  listeners: {
    change: function(radiogroup, newValue) {
      console.log('Selected:', newValue.dateRange);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="option-list">
  <h4 class="option-list__title">Select options</h4>

  <div class="option-list__items">
    <label class="option-item">
      <input type="radio" name="dateRange" value="today" />
      <span>Today</span>
    </label>

    <label class="option-item">
      <input type="radio" name="dateRange" value="yesterday" />
      <span>Yesterday</span>
    </label>

    <label class="option-item">
      <input type="radio" name="dateRange" value="lastWeek" />
      <span>Last 7 days</span>
    </label>

    <label class="option-item">
      <input type="radio" name="dateRange" value="lastMonth" />
      <span>Last 30 days</span>
    </label>

    <label class="option-item">
      <input type="radio" name="dateRange" value="custom" />
      <span>Custom range</span>
    </label>
  </div>
</div>

<script>
const radioButtons = document.querySelectorAll('input[name="dateRange"]');
radioButtons.forEach(radio => {
  radio.addEventListener('change', (e) => {
    console.log('Selected:', e.target.value);
  });
});
</script>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface OptionItem {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface OptionListProps {
  title?: string;
  options?: OptionItem[];
  allowMultiple?: boolean;
  defaultSelected?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

function OptionListExample({
  title = 'Select options',
  options = [
    {value: 'today', label: 'Today'},
    {value: 'yesterday', label: 'Yesterday'},
    {value: 'lastWeek', label: 'Last 7 days'},
    {value: 'lastMonth', label: 'Last 30 days'},
    {value: 'custom', label: 'Custom range'}
  ],
  allowMultiple = false,
  defaultSelected = [],
  onSelectionChange
}: OptionListProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const handleChange = useCallback((newSelected: string[]) => {
    setSelected(newSelected);
    onSelectionChange?.(newSelected);
  }, [onSelectionChange]);

  return (
    <OptionList
      title={title}
      options={options}
      selected={selected}
      onChange={handleChange}
      allowMultiple={allowMultiple}
    />
  );
}`
  }
};

// FooterHelp Component Examples
export const footerHelpExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { FooterHelp } from '@shopify/polaris';
import React from 'react';

function FooterHelpExample() {
  return (
    <FooterHelp>
      Need help? Our support team is available 24/7 to assist you with any questions.
    </FooterHelp>
  );
}

export default FooterHelpExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-footer-help">
  <div class="polaris-footer-help__content">
    Need help? Our support team is available 24/7 to assist you with any questions.
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createFooterHelp } from '@cin7/vanilla-js';

const footerHelp = createFooterHelp({
  content: 'Need help? Our support team is available 24/7 to assist you with any questions.'
});

document.getElementById('app').appendChild(footerHelp);
</script>`,
    extjs: `// ExtJS Footer Help using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  cls: 'polaris-footer-help',
  html: 'Need help? Our support team is available 24/7 to assist you with any questions.',
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisFooterHelp } from '@cin7/extjs-adapters';

const footerHelp = Ext.create('PolarisFooterHelp', {
  content: 'Need help? Our support team is available 24/7 to assist you with any questions.',
  learnMore: {
    url: 'https://help.shopify.com',
    content: 'View guide'
  }
});`,
    typescript: `import { FooterHelp } from '@shopify/polaris';
import React from 'react';

interface FooterHelpExampleProps {
  children: React.ReactNode;
  learnMore?: {
    url: string;
    content: string;
    onAction?: () => void;
  };
}

function FooterHelpExample({
  children,
  learnMore
}: FooterHelpExampleProps): JSX.Element {
  return (
    <FooterHelp learnMore={learnMore}>
      {children}
    </FooterHelp>
  );
}

export default FooterHelpExample;`
  }
};

// KeypressListener Component Examples
export const keypressListenerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { KeypressListener } from '@shopify/polaris';
import React, { useState } from 'react';

function KeypressListenerExample() {
  const [message, setMessage] = useState('');

  const handleEnter = (event: KeyboardEvent) => {
    setMessage('Enter key pressed!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <p>Press the Enter key to trigger the listener.</p>
      {message && <p>{message}</p>}
      <KeypressListener keyCode="Enter" handler={handleEnter} />
    </div>
  );
}

export default KeypressListenerExample;`,
    vanilla: `<!-- HTML Structure -->
<div id="keypress-demo">
  <p>Press the Enter key to trigger the listener.</p>
  <p id="message"></p>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

const messageEl = document.getElementById('message');

on(document, 'keydown', (event) => {
  if (event.key === 'Enter') {
    messageEl.textContent = 'Enter key pressed!';
    setTimeout(() => {
      messageEl.textContent = '';
    }, 3000);
  }
});
</script>`,
    extjs: `// ExtJS KeyPress Handler using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  html: '<p>Press the Enter key to trigger the listener.</p>',
  listeners: {
    afterrender: function(cmp) {
      Ext.getDoc().on('keydown', function(event) {
        if (event.getKey() === Ext.event.Event.ENTER) {
          Ext.Msg.alert('Keypress', 'Enter key pressed!');
        }
      });
    }
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisKeypressListener } from '@cin7/extjs-adapters';

const listener = Ext.create('PolarisKeypressListener', {
  keyCode: 'Enter',
  handler: function(event) {
    console.log('Enter key pressed!');
  }
});`,
    typescript: `import { KeypressListener } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface KeypressListenerExampleProps {
  keyCode: string;
  onKeyPress?: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}

function KeypressListenerExample({
  keyCode,
  onKeyPress,
  preventDefault = false
}: KeypressListenerExampleProps): JSX.Element {
  const [message, setMessage] = useState<string>('');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    setMessage(\`\${keyCode} key pressed!\`);
    setTimeout(() => setMessage(''), 3000);
    onKeyPress?.(event);
  }, [keyCode, onKeyPress]);

  return (
    <>
      <p>Press the {keyCode} key to trigger the listener.</p>
      {message && <p>{message}</p>}
      <KeypressListener
        keyCode={keyCode}
        handler={handleKeyPress}
        preventDefault={preventDefault}
      />
    </>
  );
}

export default KeypressListenerExample;`
  }
};

// Frame Component Examples
export const frameExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function FrameExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      userMenu={{
        name: 'John Doe',
        detail: 'Store owner',
        initials: 'JD',
        avatar: <Avatar customer size="small" name="John Doe" />,
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          { label: 'Home', icon: HomeIcon, url: '#' },
          { label: 'Orders', icon: OrderIcon, url: '#' },
          { label: 'Products', icon: ProductIcon, url: '#' },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Dashboard">
        <p>Welcome to your dashboard</p>
      </Page>
    </Frame>
  );
}

export default FrameExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle">☰</button>
    <div class="polaris-top-bar__user">John Doe</div>
  </div>
  <nav class="polaris-navigation">
    <ul class="polaris-navigation__items">
      <li><a href="#">Home</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </div>
  </main>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on, toggleClass } from '@cin7/vanilla-js';

const navToggle = document.querySelector('.polaris-top-bar__navigation-toggle');
const navigation = document.querySelector('.polaris-navigation');

on(navToggle, 'click', () => {
  toggleClass(navigation, 'is-visible');
});
</script>`,
    extjs: `// ExtJS Frame/Viewport using @cin7/extjs-adapters
Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    items: [{
      text: 'Menu',
      iconCls: 'x-fa fa-bars'
    }, '->', {
      text: 'John Doe',
      iconCls: 'x-fa fa-user'
    }]
  }, {
    region: 'west',
    xtype: 'treepanel',
    title: 'Navigation',
    width: 250,
    collapsible: true,
    rootVisible: false,
    store: Ext.create('Ext.data.TreeStore', {
      root: {
        children: [
          { text: 'Home', iconCls: 'x-fa fa-home', leaf: true },
          { text: 'Orders', iconCls: 'x-fa fa-shopping-cart', leaf: true },
          { text: 'Products', iconCls: 'x-fa fa-box', leaf: true }
        ]
      }
    })
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Dashboard',
    html: '<p>Welcome to your dashboard</p>'
  }]
});`,
    typescript: `import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback, ReactNode } from 'react';

interface NavigationItem {
  label: string;
  icon: any;
  url: string;
  badge?: {
    status: string;
    content: string;
  };
}

interface FrameExampleProps {
  userName?: string;
  userDetail?: string;
  navigationItems?: NavigationItem[];
  children: ReactNode;
}

function FrameExample({
  userName = 'John Doe',
  userDetail = 'Store owner',
  navigationItems = [
    { label: 'Home', icon: HomeIcon, url: '#' },
    { label: 'Orders', icon: OrderIcon, url: '#' },
    { label: 'Products', icon: ProductIcon, url: '#' },
  ],
  children
}: FrameExampleProps): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      userMenu={{
        name: userName,
        detail: userDetail,
        initials: userName.split(' ').map(n => n[0]).join(''),
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section items={navigationItems} />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      {children}
    </Frame>
  );
}

export default FrameExample;`
  }
};

// PageActions Component Examples
export const pageActionsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { PageActions } from '@shopify/polaris';
import React from 'react';

function PageActionsExample() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: () => console.log('Save clicked'),
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => console.log('Cancel clicked'),
        },
      ]}
    />
  );
}

export default PageActionsExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-page-actions">
  <div class="polaris-page-actions__secondary">
    <button class="polaris-button" id="cancel-btn">Cancel</button>
  </div>
  <div class="polaris-page-actions__primary">
    <button class="polaris-button polaris-button--primary" id="save-btn">Save</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('#save-btn', 'click', () => {
  console.log('Save clicked');
});

on('#cancel-btn', 'click', () => {
  console.log('Cancel clicked');
});
</script>`,
    extjs: `// ExtJS Toolbar with Actions using @cin7/extjs-adapters
Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    text: 'Cancel',
    handler: function() {
      console.log('Cancel clicked');
    }
  }, '->', {
    text: 'Save',
    ui: 'action',
    handler: function() {
      console.log('Save clicked');
    }
  }],
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisPageActions } from '@cin7/extjs-adapters';

const pageActions = Ext.create('PolarisPageActions', {
  primaryAction: {
    text: 'Save',
    handler: function() {
      console.log('Save clicked');
    }
  },
  secondaryActions: [{
    text: 'Cancel',
    handler: function() {
      console.log('Cancel clicked');
    }
  }]
});`,
    typescript: `import { PageActions } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PageAction {
  content: string;
  onAction: () => void;
  loading?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}

interface PageActionsExampleProps {
  onSave?: () => void;
  onCancel?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
}

function PageActionsExample({
  onSave,
  onCancel,
  saveLabel = 'Save',
  cancelLabel = 'Cancel'
}: PageActionsExampleProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = useCallback(() => {
    setLoading(true);
    onSave?.();
    setTimeout(() => setLoading(false), 2000);
  }, [onSave]);

  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  return (
    <PageActions
      primaryAction={{
        content: saveLabel,
        onAction: handleSave,
        loading: loading,
      }}
      secondaryActions={[
        {
          content: cancelLabel,
          onAction: handleCancel,
          disabled: loading,
        },
      ]}
    />
  );
}

export default PageActionsExample;`
  }
};


// LineChart Component Examples
export const lineChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function LineChart() {
  const options = {
    title: { text: 'Sales Trend' },
    series: [{ data: [1, 2, 3, 4, 5] }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: { data: [{month: 'Jan', value: 100}] },
  axes: [{type: 'numeric', position: 'left'}],
  series: [{type: 'line', yField: 'value'}]
});`,
    vanilla: `Highcharts.chart('container', {
  title: { text: 'Sales Trend' },
  series: [{ data: [1, 2, 3, 4, 5] }]
});`,
    typescript: `import Highcharts from 'highcharts';
const options: Highcharts.Options = {
  title: { text: 'Sales Trend' },
  series: [{ type: 'line', data: [1, 2, 3, 4, 5] }]
};
Highcharts.chart('container', options);`
  }
};

// BarChart Component Examples
export const barChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function BarChart() {
  const options = {
    chart: { type: 'column' },
    title: { text: 'Sales by Category' },
    series: [{ data: [10, 20, 30] }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.CartesianChart', {
  store: { data: [{category: 'A', value: 100}] },
  series: [{type: 'bar', yField: 'value'}]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'column' },
  series: [{ data: [10, 20, 30] }]
});`,
    typescript: `import Highcharts from 'highcharts';
const options: Highcharts.Options = {
  chart: { type: 'column' },
  series: [{ type: 'column', data: [10, 20, 30] }]
};
Highcharts.chart('container', options);`
  }
};

// PieChart Component Examples
export const pieChartExamples: Record<string, CodeVariant> = {
  default: {
    react: `import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function PieChart() {
  const options = {
    chart: { type: 'pie' },
    title: { text: 'Market Share' },
    series: [{ data: [['A', 45], ['B', 30], ['C', 25]] }]
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}`,
    extjs: `Ext.create('Ext.chart.PolarChart', {
  store: { data: [{name: 'A', value: 45}] },
  series: [{type: 'pie', angleField: 'value'}]
});`,
    vanilla: `Highcharts.chart('container', {
  chart: { type: 'pie' },
  series: [{ data: [['A', 45], ['B', 30]] }]
});`,
    typescript: `import Highcharts from 'highcharts';
const options: Highcharts.Options = {
  chart: { type: 'pie' },
  series: [{ type: 'pie', data: [['A', 45], ['B', 30]] }]
};
Highcharts.chart('container', options);`
  }
};

// FormPanel Component Examples
export const formPanelExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { TextField, Button, Card } from '@shopify/polaris';
import { useState } from 'react';

function FormPanel() {
  const [name, setName] = useState('');
  return <Card><TextField label="Name" value={name} onChange={setName} /><Button>Submit</Button></Card>;
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  items: [{xtype: 'textfield', fieldLabel: 'Name'}],
  buttons: [{text: 'Submit'}]
});`,
    vanilla: `<form><input type="text" placeholder="Name" /><button>Submit</button></form>`,
    typescript: `import { TextField, Button } from '@shopify/polaris';
function FormPanel({ onSubmit }: { onSubmit: (data: any) => void }) {
  return <form onSubmit={onSubmit}><TextField label="Name" /></form>;
}`
  }
};

// CoreUtilities Component Examples
export const coreUtilitiesExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useCallback } from 'react';
function CoreUtilities() {
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <button onClick={handleClick}>Click me</button>;
}`,
    extjs: `Ext.get('button').on('click', function() { console.log('clicked'); });`,
    vanilla: `document.querySelector('button').addEventListener('click', () => console.log('clicked'));`,
    typescript: `const button = document.querySelector<HTMLButtonElement>('button');
button?.addEventListener('click', () => console.log('clicked'));`
  }
};

// EcommerceComponents Component Examples
export const ecommerceComponentsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Card, Button } from '@shopify/polaris';
function ProductCard({ product }: { product: any }) {
  return <Card><h3>{product.name}</h3><p>\\\${product.price}</p><Button>Add to Cart</Button></Card>;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  html: '<div class="product"><h3>Product</h3><button>Add to Cart</button></div>'
});`,
    vanilla: `<div class="product-card">
  <h3>Product Name</h3>
  <p>$99.99</p>
  <button>Add to Cart</button>
</div>`,
    typescript: `interface Product { name: string; price: number; }
function ProductCard({ product }: { product: Product }) {
  return <div><h3>{product.name}</h3><p>\\\${product.price}</p></div>;
}`
  }
};

// UseCase Component Examples
export const useCaseExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useState } from 'react';
function UseCase() {
  const [data, setData] = useState(null);
  const execute = async () => { const res = await fetch('/api'); setData(await res.json()); };
  return <button onClick={execute}>Execute</button>;
}`,
    extjs: `Ext.define('App.UseCase', {
  execute: function() { Ext.Ajax.request({ url: '/api' }); }
});`,
    vanilla: `async function executeUseCase() {
  const response = await fetch('/api');
  return await response.json();
}`,
    typescript: `interface UseCase<T, R> {
  execute(input: T): Promise<R>;
}
class CreateUser implements UseCase<{name: string}, {id: number}> {
  async execute(input) { return { id: 1 }; }
}`
  }
};

// Repository Component Examples
export const repositoryExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useState, useEffect } from 'react';
function Repository() {
  const [items, setItems] = useState([]);
  useEffect(() => { fetch('/api/items').then(r => r.json()).then(setItems); }, []);
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`,
    extjs: `Ext.create('Ext.data.Store', {
  proxy: { type: 'rest', url: '/api/items' },
  autoLoad: true
});`,
    vanilla: `async function fetchAll() {
  const response = await fetch('/api/items');
  return await response.json();
}`,
    typescript: `interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}
class ProductRepository implements Repository<Product> {
  async findAll() { return []; }
  async findById(id: number) { return null; }
}`
  }
};


// Autocomplete Component Examples - Forms
export const autocompleteExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Autocomplete } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function AutocompleteExample() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>(['Red T-shirt', 'Blue Jeans', 'Green Sweater']);

  const updateText = useCallback((value: string) => {
    setInputValue(value);
    if (!value) {
      setOptions(['Red T-shirt', 'Blue Jeans', 'Green Sweater']);
      return;
    }
    const filterRegex = new RegExp(value, 'i');
    setOptions(['Red T-shirt', 'Blue Jeans', 'Green Sweater'].filter((option) => option.match(filterRegex)));
  }, []);

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={setSelectedOptions}
      multiple
      textField={
        <Autocomplete.TextField
          onChange={updateText}
          label="Search products"
          value={inputValue}
          placeholder="Search products..."
          autoComplete="off"
        />
      }
    />
  );
}

export default AutocompleteExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const input = $('#autocomplete-input');
const allOptions = ['Red T-shirt', 'Blue Jeans', 'Green Sweater'];
let selectedOptions = [];

on(input, 'input', (e) => {
  const value = e.target.value;
  const filterRegex = new RegExp(value, 'i');
  const filtered = allOptions.filter(option => option.match(filterRegex));
  EventBus.emit('autocomplete:filtered', { results: filtered });
});`,
    extjs: `Ext.create('Ext.form.field.Tag', {
  fieldLabel: 'Search products',
  store: Ext.create('Ext.data.Store', {
    fields: ['value'],
    data: [{value: 'Red T-shirt'}, {value: 'Blue Jeans'}, {value: 'Green Sweater'}]
  }),
  displayField: 'value',
  valueField: 'value',
  queryMode: 'local',
  renderTo: Ext.getBody()
});`,
    typescript: `import { Autocomplete } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface AutocompleteExampleProps {
  onSelectionChange?: (selected: string[]) => void;
}

function AutocompleteExample({ onSelectionChange }: AutocompleteExampleProps): JSX.Element {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['Red T-shirt', 'Blue Jeans', 'Green Sweater']);

  const updateText = useCallback((value: string): void => {
    setInputValue(value);
    const filterRegex = new RegExp(value, 'i');
    setOptions(['Red T-shirt', 'Blue Jeans', 'Green Sweater'].filter((option) => option.match(filterRegex)));
  }, []);

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={(selected) => {
        setSelectedOptions(selected);
        onSelectionChange?.(selected);
      }}
      multiple
      textField={
        <Autocomplete.TextField
          onChange={updateText}
          label="Search products"
          value={inputValue}
          autoComplete="off"
        />
      }
    />
  );
}

export default AutocompleteExample;`
  }
};

// ChoiceList Component Examples - Forms
export const choiceListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ChoiceList } from '@shopify/polaris';
import { useState } from 'react';

function ChoiceListExample() {
  const [selected, setSelected] = useState<string[]>(['basic']);

  return (
    <ChoiceList
      title="Select your plan"
      choices={[
        {label: 'Basic plan - $5/month', value: 'basic'},
        {label: 'Professional plan - $15/month', value: 'professional'},
        {label: 'Enterprise plan', value: 'enterprise'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}

export default ChoiceListExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const choices = document.querySelectorAll('input[name="plan"]');
choices.forEach(choice => {
  on(choice, 'change', (e) => {
    EventBus.emit('plan:changed', { plan: e.target.value });
  });
});`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Select your plan',
  vertical: true,
  items: [
    {boxLabel: 'Basic plan - $5/month', name: 'plan', inputValue: 'basic', checked: true},
    {boxLabel: 'Professional plan - $15/month', name: 'plan', inputValue: 'professional'},
    {boxLabel: 'Enterprise plan', name: 'plan', inputValue: 'enterprise'}
  ],
  renderTo: Ext.getBody()
});`,
    typescript: `import { ChoiceList } from '@shopify/polaris';
import { useState } from 'react';

interface ChoiceListExampleProps {
  onPlanChange?: (selected: string[]) => void;
}

function ChoiceListExample({ onPlanChange }: ChoiceListExampleProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['basic']);

  return (
    <ChoiceList
      title="Select your plan"
      choices={[
        {label: 'Basic plan - $5/month', value: 'basic'},
        {label: 'Professional plan - $15/month', value: 'professional'},
        {label: 'Enterprise plan', value: 'enterprise'},
      ]}
      selected={selected}
      onChange={(newSelected) => {
        setSelected(newSelected);
        onPlanChange?.(newSelected);
      }}
    />
  );
}

export default ChoiceListExample;`
  }
};

// ColorPicker Component Examples - Forms
export const colorPickerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ColorPicker } from '@shopify/polaris';
import { useState } from 'react';

function ColorPickerExample() {
  const [color, setColor] = useState({
    hue: 300,
    saturation: 1,
    brightness: 1,
    alpha: 1,
  });

  return <ColorPicker onChange={setColor} color={color} />;
}

export default ColorPickerExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const colorInput = $('#color-input');
on(colorInput, 'input', (e) => {
  EventBus.emit('color:changed', { hex: e.target.value });
});`,
    extjs: `Ext.create('Ext.picker.Color', {
  value: 'FF00FF',
  renderTo: Ext.getBody(),
  listeners: {
    select: function(picker, color) {
      EventBus.emit('color:selected', { hex: '#' + color });
    }
  }
});`,
    typescript: `import { ColorPicker } from '@shopify/polaris';
import { useState } from 'react';

interface ColorPickerExampleProps {
  onColorChange?: (color: {hue: number; saturation: number; brightness: number; alpha: number}) => void;
}

function ColorPickerExample({ onColorChange }: ColorPickerExampleProps): JSX.Element {
  const [color, setColor] = useState({
    hue: 300,
    saturation: 1,
    brightness: 1,
    alpha: 1,
  });

  return (
    <ColorPicker
      onChange={(newColor) => {
        setColor(newColor);
        onColorChange?.(newColor);
      }}
      color={color}
    />
  );
}

export default ColorPickerExample;`
  }
};

// Combobox Component Examples - Forms
export const comboboxExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Combobox, Listbox, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

function ComboboxExample() {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(['Red', 'Orange', 'Yellow', 'Green', 'Blue']);

  const updateText = useCallback((value: string) => {
    setInputValue(value);
    if (value === '') {
      setOptions(['Red', 'Orange', 'Yellow', 'Green', 'Blue']);
      return;
    }
    const filterRegex = new RegExp(value, 'i');
    setOptions(['Red', 'Orange', 'Yellow', 'Green', 'Blue'].filter((option) => option.match(filterRegex)));
  }, []);

  return (
    <Combobox
      activator={
        <Combobox.TextField
          onChange={updateText}
          label="Search colors"
          value={inputValue}
          prefix={<Icon source={SearchIcon} />}
        />
      }
    >
      <Listbox onSelect={setSelectedOption}>
        {options.map((option) => (
          <Listbox.Option key={option} value={option}>
            {option}
          </Listbox.Option>
        ))}
      </Listbox>
    </Combobox>
  );
}

export default ComboboxExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const input = $('#combobox-input');
const listbox = $('#combobox-listbox');
const options = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];

on(input, 'input', (e) => {
  const value = e.target.value;
  const filterRegex = new RegExp(value, 'i');
  const filtered = options.filter(opt => opt.match(filterRegex));
  EventBus.emit('combobox:filtered', { results: filtered });
});`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Search colors',
  store: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  queryMode: 'local',
  typeAhead: true,
  renderTo: Ext.getBody()
});`,
    typescript: `import { Combobox, Listbox, Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface ComboboxExampleProps {
  onSelect?: (value: string) => void;
}

function ComboboxExample({ onSelect }: ComboboxExampleProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<string>();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(['Red', 'Orange', 'Yellow', 'Green', 'Blue']);

  const updateText = useCallback((value: string): void => {
    setInputValue(value);
    const filterRegex = new RegExp(value, 'i');
    setOptions(['Red', 'Orange', 'Yellow', 'Green', 'Blue'].filter((option) => option.match(filterRegex)));
  }, []);

  return (
    <Combobox
      activator={
        <Combobox.TextField
          onChange={updateText}
          label="Search colors"
          value={inputValue}
          prefix={<Icon source={SearchIcon} />}
        />
      }
    >
      <Listbox onSelect={(value) => {
        setSelectedOption(value);
        onSelect?.(value);
      }}>
        {options.map((option) => (
          <Listbox.Option key={option} value={option}>
            {option}
          </Listbox.Option>
        ))}
      </Listbox>
    </Combobox>
  );
}

export default ComboboxExample;`
  }
};

// DatePicker Component Examples - Forms
export const datePickerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DatePicker } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function DatePickerExample() {
  const [selected, setSelected] = useState(new Date());
  const [month, setMonth] = useState(selected.getMonth());
  const [year, setYear] = useState(selected.getFullYear());

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelected}
      onMonthChange={(month, year) => {
        setMonth(month);
        setYear(year);
      }}
      selected={selected}
    />
  );
}

export default DatePickerExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const datePicker = $('#date-picker');
on(datePicker, 'change', (e) => {
  EventBus.emit('date:selected', { date: e.target.value });
});`,
    extjs: `Ext.create('Ext.form.field.Date', {
  fieldLabel: 'Select date',
  value: new Date(),
  renderTo: Ext.getBody(),
  listeners: {
    change: function(field, newValue) {
      EventBus.emit('date:selected', { date: newValue });
    }
  }
});`,
    typescript: `import { DatePicker } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface DatePickerExampleProps {
  onDateChange?: (date: Date) => void;
}

function DatePickerExample({ onDateChange }: DatePickerExampleProps): JSX.Element {
  const [selected, setSelected] = useState(new Date());
  const [month, setMonth] = useState(selected.getMonth());
  const [year, setYear] = useState(selected.getFullYear());

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={(newDate) => {
        setSelected(newDate);
        onDateChange?.(newDate);
      }}
      onMonthChange={(month, year) => {
        setMonth(month);
        setYear(year);
      }}
      selected={selected}
    />
  );
}

export default DatePickerExample;`
  }
};

// FormLayout Component Examples - Forms
export const formLayoutExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { FormLayout, TextField } from '@shopify/polaris';

function FormLayoutExample() {
  return (
    <FormLayout>
      <TextField label="Full name" placeholder="Enter your full name" />
      <TextField label="Email" type="email" placeholder="email@example.com" />
      <TextField label="Message" multiline={3} />
    </FormLayout>
  );
}

export default FormLayoutExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const form = $('#form-layout');
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
  on(input, 'change', (e) => {
    EventBus.emit('form:changed', { field: e.target.name, value: e.target.value });
  });
});`,
    extjs: `Ext.create('Ext.form.Panel', {
  renderTo: Ext.getBody(),
  width: 400,
  bodyPadding: 10,
  items: [
    {xtype: 'textfield', fieldLabel: 'Full name'},
    {xtype: 'textfield', fieldLabel: 'Email', vtype: 'email'},
    {xtype: 'textareafield', fieldLabel: 'Message', height: 80}
  ]
});`,
    typescript: `import { FormLayout, TextField } from '@shopify/polaris';

interface FormLayoutExampleProps {
  onFormChange?: (field: string, value: string) => void;
}

function FormLayoutExample({ onFormChange }: FormLayoutExampleProps): JSX.Element {
  return (
    <FormLayout>
      <TextField
        label="Full name"
        onChange={(value) => onFormChange?.('name', value)}
      />
      <TextField
        label="Email"
        type="email"
        onChange={(value) => onFormChange?.('email', value)}
      />
      <TextField
        label="Message"
        multiline={3}
        onChange={(value) => onFormChange?.('message', value)}
      />
    </FormLayout>
  );
}

export default FormLayoutExample;`
  }
};

// RangeSlider Component Examples - Forms
export const rangeSliderExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { RangeSlider } from '@shopify/polaris';
import { useState } from 'react';

function RangeSliderExample() {
  const [value, setValue] = useState([20, 80]);

  return (
    <RangeSlider
      label="Price range"
      value={value}
      onChange={setValue}
      min={0}
      max={100}
      output
      prefix="$"
    />
  );
}

export default RangeSliderExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const rangeSlider = $('#range-slider');
on(rangeSlider, 'input', (e) => {
  EventBus.emit('range:changed', { value: e.target.value });
});`,
    extjs: `Ext.create('Ext.slider.Multi', {
  fieldLabel: 'Price range',
  values: [20, 80],
  minValue: 0,
  maxValue: 100,
  renderTo: Ext.getBody(),
  listeners: {
    change: function(slider, newValue) {
      EventBus.emit('range:changed', { values: newValue });
    }
  }
});`,
    typescript: `import { RangeSlider } from '@shopify/polaris';
import { useState } from 'react';

interface RangeSliderExampleProps {
  onRangeChange?: (range: [number, number]) => void;
}

function RangeSliderExample({ onRangeChange }: RangeSliderExampleProps): JSX.Element {
  const [value, setValue] = useState<[number, number]>([20, 80]);

  return (
    <RangeSlider
      label="Price range"
      value={value}
      onChange={(newValue) => {
        setValue(newValue as [number, number]);
        onRangeChange?.(newValue as [number, number]);
      }}
      min={0}
      max={100}
      output
      prefix="$"
    />
  );
}

export default RangeSliderExample;`
  }
};

// Pagination Component Examples
export const paginationExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Pagination } from '@shopify/polaris';

function PaginationExample() {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={false}
      label="Pagination"
    />
  );
}

export default PaginationExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button" disabled>Previous</button>
  <button class="polaris-pagination__button">Next</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const nextButton = $('.polaris-pagination__button:last-child');
on(nextButton, 'click', () => {
  console.log('Next page');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar for first page
Ext.create('Ext.toolbar.Paging', {
  displayInfo: true,
  displayMsg: 'Displaying items {0} - {1} of {2}',
  emptyMsg: 'No items to display',
  store: myStore,
  renderTo: Ext.getBody(),
  listeners: {
    beforechange: function(toolbar, page) {
      console.log('Navigating to page:', page);
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';

interface PaginationExampleProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

function PaginationExample({
  onNext,
  onPrevious
}: PaginationExampleProps): JSX.Element {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={false}
      label="Pagination"
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
}

export default PaginationExample;`
  },

  middlePage: {
    react: `import { Pagination } from '@shopify/polaris';

function MiddlePageExample() {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={true}
      label="Pagination"
    />
  );
}

export default MiddlePageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button">Previous</button>
  <button class="polaris-pagination__button">Next</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const prevButton = $('.polaris-pagination__button:first-child');
const nextButton = $('.polaris-pagination__button:last-child');

on(prevButton, 'click', () => {
  console.log('Previous page');
});

on(nextButton, 'click', () => {
  console.log('Next page');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar for middle page
const store = Ext.create('Ext.data.Store', {
  pageSize: 25,
  currentPage: 5
});

Ext.create('Ext.toolbar.Paging', {
  store: store,
  displayInfo: true,
  renderTo: Ext.getBody(),
  items: [
    '-',
    {
      text: 'Custom Action',
      handler: function() {
        console.log('Current page:', store.currentPage);
      }
    }
  ]
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import { useState } from 'react';

interface MiddlePageExampleProps {
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

function MiddlePageExample({
  currentPage = 5,
  onPageChange
}: MiddlePageExampleProps): JSX.Element {
  const [page, setPage] = useState(currentPage);

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePrevious = () => {
    const newPage = page - 1;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  return (
    <Pagination
      hasNext={true}
      hasPrevious={true}
      label="Pagination"
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}

export default MiddlePageExample;`
  },

  lastPage: {
    react: `import { Pagination } from '@shopify/polaris';

function LastPageExample() {
  return (
    <Pagination
      hasNext={false}
      hasPrevious={true}
      label="Pagination"
    />
  );
}

export default LastPageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button">Previous</button>
  <button class="polaris-pagination__button" disabled>Next</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const prevButton = $('.polaris-pagination__button:first-child');
on(prevButton, 'click', () => {
  console.log('Previous page');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar for last page
const store = Ext.create('Ext.data.Store', {
  pageSize: 25,
  totalCount: 250,
  currentPage: 10 // Last page (250 / 25 = 10 pages)
});

Ext.create('Ext.toolbar.Paging', {
  store: store,
  displayInfo: true,
  displayMsg: 'Displaying items {0} - {1} of {2}',
  renderTo: Ext.getBody(),
  listeners: {
    change: function(toolbar, pageData) {
      if (pageData.currentPage === pageData.pageCount) {
        console.log('On last page');
      }
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';

interface LastPageExampleProps {
  onPrevious?: () => void;
  totalPages?: number;
}

function LastPageExample({
  onPrevious,
  totalPages = 10
}: LastPageExampleProps): JSX.Element {
  return (
    <Pagination
      hasNext={false}
      hasPrevious={true}
      label="Pagination"
      onPrevious={onPrevious}
    />
  );
}

export default LastPageExample;`
  },

  customTooltips: {
    react: `import { Pagination } from '@shopify/polaris';

function CustomTooltipsExample() {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={true}
      label="Customer list pagination"
      nextTooltip="Next page of customers"
      previousTooltip="Previous page of customers"
    />
  );
}

export default CustomTooltipsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button
    class="polaris-pagination__button"
    title="Previous page of customers"
    aria-label="Previous page of customers"
  >
    Previous
  </button>
  <button
    class="polaris-pagination__button"
    title="Next page of customers"
    aria-label="Next page of customers"
  >
    Next
  </button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const prevButton = $('.polaris-pagination__button:first-child');
const nextButton = $('.polaris-pagination__button:last-child');

on(prevButton, 'click', () => {
  console.log('Previous page of customers');
});

on(nextButton, 'click', () => {
  console.log('Next page of customers');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar with custom tooltips
Ext.create('Ext.toolbar.Paging', {
  store: customerStore,
  displayInfo: true,
  displayMsg: 'Displaying customers {0} - {1} of {2}',
  renderTo: Ext.getBody(),
  items: [
    {
      itemId: 'first',
      tooltip: 'First page of customers',
      overflowText: 'First'
    },
    {
      itemId: 'prev',
      tooltip: 'Previous page of customers',
      overflowText: 'Previous'
    },
    '-',
    {
      itemId: 'next',
      tooltip: 'Next page of customers',
      overflowText: 'Next'
    },
    {
      itemId: 'last',
      tooltip: 'Last page of customers',
      overflowText: 'Last'
    }
  ],
  listeners: {
    beforechange: function(toolbar, page) {
      console.log('Navigating to page', page, 'of customer list');
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface CustomTooltipsExampleProps {
  customers?: Customer[];
  customersPerPage?: number;
  onPageChange?: (page: number) => void;
}

function CustomTooltipsExample({
  customers = [],
  customersPerPage = 25,
  onPageChange
}: CustomTooltipsExampleProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  return (
    <Pagination
      hasNext={currentPage < totalPages}
      hasPrevious={currentPage > 1}
      label={\`Customer list pagination, page \${currentPage} of \${totalPages}\`}
      nextTooltip="Next page of customers"
      previousTooltip="Previous page of customers"
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}

export default CustomTooltipsExample;`
  }
};

// Link Component Examples
export const linkExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function LinkExample() {
  return (
    <Link url="#products">
      View all products
    </Link>
  );
}

export default LinkExample;`,

    vanilla: `<!-- HTML Structure -->
<a href="#products" class="polaris-link">View all products</a>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLink } from '@cin7/vanilla-js';

const link = createLink({
  text: 'View all products',
  url: '#products',
  onClick: (e) => {
    e.preventDefault();
    console.log('Link clicked!');
    // Navigate programmatically
    window.location.hash = 'products';
  }
});

document.getElementById('app').appendChild(link);
</script>`,

    extjs: `// ExtJS doesn't have a native Link component, use Button with link style
Ext.create('Ext.Component', {
  renderTo: Ext.getBody(),
  html: '<a href="#products" class="polaris-link">View all products</a>',
  listeners: {
    element: 'el',
    delegate: 'a',
    click: function(e) {
      e.preventDefault();
      console.log('Link clicked!');
      window.location.hash = 'products';
    }
  }
});

// Or using custom component
import { PolarisLink } from '@cin7/extjs-adapters';

const link = Ext.create('PolarisLink', {
  text: 'View all products',
  url: '#products',
  handler: function() {
    console.log('Link clicked!');
  }
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface LinkExampleProps {
  text: string;
  url: string;
  onClick?: () => void;
}

function LinkExample({
  text,
  url,
  onClick
}: LinkExampleProps): JSX.Element {
  return (
    <Link url={url} onClick={onClick}>
      {text}
    </Link>
  );
}

export default LinkExample;`
  },

  externalLink: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function ExternalLinkExample() {
  return (
    <Link
      url="https://polaris.shopify.com"
      external
    >
      Visit Shopify documentation
    </Link>
  );
}

export default ExternalLinkExample;`,

    vanilla: `<!-- HTML Structure -->
<a href="https://polaris.shopify.com" class="polaris-link" target="_blank" rel="noopener noreferrer">
  Visit Shopify documentation
  <span aria-label="opens in new tab">↗</span>
</a>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLink } from '@cin7/vanilla-js';

const externalLink = createLink({
  text: 'Visit Shopify documentation',
  url: 'https://polaris.shopify.com',
  external: true,
  onClick: (e) => {
    console.log('External link clicked!');
    // Browser handles external navigation
  }
});

document.getElementById('app').appendChild(externalLink);
</script>`,

    extjs: `// ExtJS external link
Ext.create('Ext.Component', {
  renderTo: Ext.getBody(),
  html: '<a href="https://polaris.shopify.com" class="polaris-link" target="_blank" rel="noopener noreferrer">Visit Shopify documentation ↗</a>',
  listeners: {
    element: 'el',
    delegate: 'a',
    click: function(e) {
      console.log('External link clicked!');
      // Browser handles external navigation
    }
  }
});

// Or using custom component
import { PolarisLink } from '@cin7/extjs-adapters';

const externalLink = Ext.create('PolarisLink', {
  text: 'Visit Shopify documentation',
  url: 'https://polaris.shopify.com',
  external: true
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface ExternalLinkProps {
  url: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

function ExternalLinkExample({
  url,
  children,
  ariaLabel
}: ExternalLinkProps): JSX.Element {
  return (
    <Link
      url={url}
      external
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}

export default ExternalLinkExample;`
  },

  monochrome: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function MonochromeLinkExample() {
  return (
    <Link
      url="#features"
      monochrome
    >
      Learn more about our features
    </Link>
  );
}

export default MonochromeLinkExample;`,

    vanilla: `<!-- HTML Structure -->
<a href="#features" class="polaris-link polaris-link--monochrome">
  Learn more about our features
</a>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLink } from '@cin7/vanilla-js';

const monochromeLink = createLink({
  text: 'Learn more about our features',
  url: '#features',
  monochrome: true,
  onClick: (e) => {
    e.preventDefault();
    console.log('Monochrome link clicked!');
    window.location.hash = 'features';
  }
});

document.getElementById('app').appendChild(monochromeLink);
</script>`,

    extjs: `// ExtJS monochrome link
Ext.create('Ext.Component', {
  renderTo: Ext.getBody(),
  html: '<a href="#features" class="polaris-link polaris-link--monochrome">Learn more about our features</a>',
  listeners: {
    element: 'el',
    delegate: 'a',
    click: function(e) {
      e.preventDefault();
      console.log('Monochrome link clicked!');
      window.location.hash = 'features';
    }
  }
});

// Or using custom component
import { PolarisLink } from '@cin7/extjs-adapters';

const monochromeLink = Ext.create('PolarisLink', {
  text: 'Learn more about our features',
  url: '#features',
  monochrome: true
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface MonochromeLinkProps {
  url: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent) => void;
}

function MonochromeLinkExample({
  url,
  children,
  onClick
}: MonochromeLinkProps): JSX.Element {
  return (
    <Link
      url={url}
      monochrome
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

export default MonochromeLinkExample;`
  },

  noUnderline: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function NoUnderlineLinkExample() {
  return (
    <Link
      url="#shop"
      removeUnderline
    >
      Shop now
    </Link>
  );
}

export default NoUnderlineLinkExample;`,

    vanilla: `<!-- HTML Structure -->
<a href="#shop" class="polaris-link polaris-link--no-underline">
  Shop now
</a>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLink } from '@cin7/vanilla-js';

const noUnderlineLink = createLink({
  text: 'Shop now',
  url: '#shop',
  removeUnderline: true,
  onClick: (e) => {
    e.preventDefault();
    console.log('No underline link clicked!');
    window.location.hash = 'shop';
  }
});

document.getElementById('app').appendChild(noUnderlineLink);
</script>`,

    extjs: `// ExtJS link without underline
Ext.create('Ext.Component', {
  renderTo: Ext.getBody(),
  html: '<a href="#shop" class="polaris-link polaris-link--no-underline">Shop now</a>',
  listeners: {
    element: 'el',
    delegate: 'a',
    click: function(e) {
      e.preventDefault();
      console.log('No underline link clicked!');
      window.location.hash = 'shop';
    }
  }
});

// Or using custom component
import { PolarisLink } from '@cin7/extjs-adapters';

const noUnderlineLink = Ext.create('PolarisLink', {
  text: 'Shop now',
  url: '#shop',
  removeUnderline: true
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface NoUnderlineLinkProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

function NoUnderlineLinkExample({
  url,
  children,
  className
}: NoUnderlineLinkProps): JSX.Element {
  return (
    <Link
      url={url}
      removeUnderline
      className={className}
    >
      {children}
    </Link>
  );
}

export default NoUnderlineLinkExample;`
  },

  inlineText: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function InlineTextLinkExample() {
  return (
    <div style={{ maxWidth: '400px', lineHeight: 'var(--line-height-normal)' }}>
      <p>
        Our product catalog includes a wide range of electronics. You can{' '}
        <Link url="#browse">browse our collection</Link> to find the perfect items
        for your needs. For more information, please{' '}
        <Link url="#contact">contact our support team</Link>.
      </p>
      <p style={{ marginTop: '16px' }}>
        We offer fast shipping and easy returns. Check out our{' '}
        <Link url="#shipping">shipping policy</Link> and{' '}
        <Link url="#returns">return guidelines</Link> for more details.
      </p>
    </div>
  );
}

export default InlineTextLinkExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="max-width: 400px; line-height: var(--line-height-normal);">
  <p>
    Our product catalog includes a wide range of electronics. You can
    <a href="#browse" class="polaris-link">browse our collection</a>
    to find the perfect items for your needs. For more information, please
    <a href="#contact" class="polaris-link">contact our support team</a>.
  </p>
  <p style="margin-top: 16px;">
    We offer fast shipping and easy returns. Check out our
    <a href="#shipping" class="polaris-link">shipping policy</a> and
    <a href="#returns" class="polaris-link">return guidelines</a> for more details.
  </p>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLink } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.maxWidth = '400px';
container.style.lineHeight = 'var(--line-height-normal)';

// Create paragraphs with inline links
const p1 = document.createElement('p');
p1.innerHTML = 'Our product catalog includes a wide range of electronics. You can ';
const browseLink = createLink({ text: 'browse our collection', url: '#browse' });
p1.appendChild(browseLink);
p1.innerHTML += ' to find the perfect items for your needs. For more information, please ';
const contactLink = createLink({ text: 'contact our support team', url: '#contact' });
p1.appendChild(contactLink);
p1.innerHTML += '.';

const p2 = document.createElement('p');
p2.style.marginTop = '16px';
p2.innerHTML = 'We offer fast shipping and easy returns. Check out our ';
const shippingLink = createLink({ text: 'shipping policy', url: '#shipping' });
p2.appendChild(shippingLink);
p2.innerHTML += ' and ';
const returnsLink = createLink({ text: 'return guidelines', url: '#returns' });
p2.appendChild(returnsLink);
p2.innerHTML += ' for more details.';

container.appendChild(p1);
container.appendChild(p2);
document.getElementById('app').appendChild(container);
</script>`,

    extjs: `// ExtJS inline text with links
Ext.create('Ext.Component', {
  renderTo: Ext.getBody(),
  style: {
    maxWidth: '400px',
    lineHeight: 'var(--line-height-normal)'
  },
  html: \`
    <p>
      Our product catalog includes a wide range of electronics. You can
      <a href="#browse" class="polaris-link">browse our collection</a>
      to find the perfect items for your needs. For more information, please
      <a href="#contact" class="polaris-link">contact our support team</a>.
    </p>
    <p style="margin-top: 16px;">
      We offer fast shipping and easy returns. Check out our
      <a href="#shipping" class="polaris-link">shipping policy</a> and
      <a href="#returns" class="polaris-link">return guidelines</a> for more details.
    </p>
  \`,
  listeners: {
    element: 'el',
    delegate: 'a',
    click: function(e) {
      e.preventDefault();
      var href = e.target.getAttribute('href');
      console.log('Inline link clicked:', href);
      window.location.hash = href.substring(1);
    }
  }
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface InlineTextLinkExampleProps {
  maxWidth?: string;
}

function InlineTextLinkExample({
  maxWidth = '400px'
}: InlineTextLinkExampleProps): JSX.Element {
  return (
    <div style={{ maxWidth, lineHeight: 'var(--line-height-normal)' }}>
      <p>
        Our product catalog includes a wide range of electronics. You can{' '}
        <Link url="#browse">browse our collection</Link> to find the perfect items
        for your needs. For more information, please{' '}
        <Link url="#contact">contact our support team</Link>.
      </p>
      <p style={{ marginTop: '16px' }}>
        We offer fast shipping and easy returns. Check out our{' '}
        <Link url="#shipping">shipping policy</Link> and{' '}
        <Link url="#returns">return guidelines</Link> for more details.
      </p>
    </div>
  );
}

export default InlineTextLinkExample;`
  },

  navigationLinks: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function NavigationLinksExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <h3 style={{ margin: 0 }}>Quick Navigation</h3>
      <Link url="#dashboard">📊 Dashboard</Link>
      <Link url="#products">📦 Products</Link>
      <Link url="#orders">🛒 Orders</Link>
      <Link url="#customers">👥 Customers</Link>
      <Link url="#analytics">📈 Analytics</Link>
      <Link url="#settings">⚙️ Settings</Link>
    </div>
  );
}

export default NavigationLinksExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;">
  <h3 style="margin: 0;">Quick Navigation</h3>
  <a href="#dashboard" class="polaris-link">📊 Dashboard</a>
  <a href="#products" class="polaris-link">📦 Products</a>
  <a href="#orders" class="polaris-link">🛒 Orders</a>
  <a href="#customers" class="polaris-link">👥 Customers</a>
  <a href="#analytics" class="polaris-link">📈 Analytics</a>
  <a href="#settings" class="polaris-link">⚙️ Settings</a>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLink } from '@cin7/vanilla-js';

const navItems = [
  { icon: '📊', text: 'Dashboard', url: '#dashboard' },
  { icon: '📦', text: 'Products', url: '#products' },
  { icon: '🛒', text: 'Orders', url: '#orders' },
  { icon: '👥', text: 'Customers', url: '#customers' },
  { icon: '📈', text: 'Analytics', url: '#analytics' },
  { icon: '⚙️', text: 'Settings', url: '#settings' }
];

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '12px';
container.style.maxWidth = '300px';

const heading = document.createElement('h3');
heading.textContent = 'Quick Navigation';
heading.style.margin = '0';
container.appendChild(heading);

navItems.forEach(item => {
  const link = createLink({
    text: \`\${item.icon} \${item.text}\`,
    url: item.url,
    onClick: (e) => {
      e.preventDefault();
      console.log('Navigation:', item.text);
      window.location.hash = item.url.substring(1);
    }
  });
  container.appendChild(link);
});

document.getElementById('app').appendChild(container);
</script>`,

    extjs: `// ExtJS navigation links
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Quick Navigation',
  width: 300,
  bodyPadding: 10,
  items: [
    {
      xtype: 'component',
      html: '<a href="#dashboard" class="polaris-link">📊 Dashboard</a>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<a href="#products" class="polaris-link">📦 Products</a>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<a href="#orders" class="polaris-link">🛒 Orders</a>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<a href="#customers" class="polaris-link">👥 Customers</a>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<a href="#analytics" class="polaris-link">📈 Analytics</a>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<a href="#settings" class="polaris-link">⚙️ Settings</a>'
    }
  ],
  listeners: {
    element: 'el',
    delegate: 'a',
    click: function(e) {
      e.preventDefault();
      var href = e.target.getAttribute('href');
      console.log('Navigation clicked:', href);
      window.location.hash = href.substring(1);
    }
  }
});

// Or using data-driven approach
const navItems = [
  { icon: '📊', text: 'Dashboard', url: '#dashboard' },
  { icon: '📦', text: 'Products', url: '#products' },
  { icon: '🛒', text: 'Orders', url: '#orders' },
  { icon: '👥', text: 'Customers', url: '#customers' },
  { icon: '📈', text: 'Analytics', url: '#analytics' },
  { icon: '⚙️', text: 'Settings', url: '#settings' }
];

import { PolarisNavigationLinks } from '@cin7/extjs-adapters';

const navigation = Ext.create('PolarisNavigationLinks', {
  title: 'Quick Navigation',
  items: navItems,
  onNavigate: function(url) {
    console.log('Navigating to:', url);
  }
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface NavigationItem {
  icon: string;
  text: string;
  url: string;
}

interface NavigationLinksProps {
  title?: string;
  items: NavigationItem[];
  onNavigate?: (url: string) => void;
}

function NavigationLinksExample({
  title = 'Quick Navigation',
  items,
  onNavigate
}: NavigationLinksProps): JSX.Element {
  const handleClick = (url: string) => {
    if (onNavigate) {
      onNavigate(url);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {items.map((item) => (
        <Link
          key={item.url}
          url={item.url}
          onClick={() => handleClick(item.url)}
        >
          {item.icon} {item.text}
        </Link>
      ))}
    </div>
  );
}

export default NavigationLinksExample;`
  }
};

// BlockStack Component Examples - Layout
export const blockstackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { BlockStack, Text } from '@shopify/polaris';
import React from 'react';

function BlockStackExample() {
  return (
    <BlockStack gap="400">
      <Text as="h2" variant="headingMd">Order Information</Text>
      <Text as="p">Customer: John Doe</Text>
      <Text as="p">Order #1001</Text>
      <Text as="p">Status: Processing</Text>
    </BlockStack>
  );
}

export default BlockStackExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-block-stack" data-gap="400">
  <h2 class="polaris-text--heading-md">Order Information</h2>
  <p>Customer: John Doe</p>
  <p>Order #1001</p>
  <p>Status: Processing</p>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createBlockStack } from '@cin7/vanilla-js';

const stack = createBlockStack({
  gap: '400',
  children: [
    { type: 'heading', text: 'Order Information', variant: 'headingMd' },
    { type: 'text', text: 'Customer: John Doe' },
    { type: 'text', text: 'Order #1001' },
    { type: 'text', text: 'Status: Processing' }
  ]
});

document.getElementById('app').appendChild(stack);
</script>`,

    extjs: `// ExtJS Container with vertical layout
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch',
    gap: 16
  },
  items: [{
    xtype: 'component',
    html: '<h2>Order Information</h2>',
    cls: 'polaris-heading-md'
  }, {
    xtype: 'component',
    html: 'Customer: John Doe'
  }, {
    xtype: 'component',
    html: 'Order #1001'
  }, {
    xtype: 'component',
    html: 'Status: Processing'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { BlockStack, Text } from '@shopify/polaris';
import React from 'react';

interface BlockStackExampleProps {
  orderNumber: string;
  customerName: string;
  status: string;
  gap?: '100' | '200' | '400' | '500' | '800';
}

function BlockStackExample({
  orderNumber,
  customerName,
  status,
  gap = '400'
}: BlockStackExampleProps): JSX.Element {
  return (
    <BlockStack gap={gap}>
      <Text as="h2" variant="headingMd">Order Information</Text>
      <Text as="p">Customer: {customerName}</Text>
      <Text as="p">Order #{orderNumber}</Text>
      <Text as="p">Status: {status}</Text>
    </BlockStack>
  );
}

export default BlockStackExample;`
  }
};

// Layout Component Examples - Layout
export const layoutExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function LayoutExample() {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Main Content Area</Text>
          <Text as="p" variant="bodyMd">
            This is the primary content section where the main information and functionality resides.
          </Text>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Secondary Content</Text>
          <Text as="p" variant="bodySm">
            This sidebar section contains supplementary information and actions.
          </Text>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default LayoutExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-layout">
  <div class="polaris-layout__section">
    <div class="polaris-card polaris-card--sectioned">
      <h2 class="polaris-text--heading-lg">Main Content Area</h2>
      <p class="polaris-text--body-md">
        This is the primary content section where the main information and functionality resides.
      </p>
    </div>
  </div>

  <div class="polaris-layout__section polaris-layout__section--secondary">
    <div class="polaris-card polaris-card--sectioned">
      <h3 class="polaris-text--heading-md">Secondary Content</h3>
      <p class="polaris-text--body-sm">
        This sidebar section contains supplementary information and actions.
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLayout } from '@cin7/vanilla-js';

const layout = createLayout({
  sections: [
    {
      primary: true,
      content: {
        type: 'card',
        title: 'Main Content Area',
        content: 'This is the primary content section...'
      }
    },
    {
      secondary: true,
      content: {
        type: 'card',
        title: 'Secondary Content',
        content: 'This sidebar section...'
      }
    }
  ]
});

document.getElementById('app').appendChild(layout);
</script>`,

    extjs: `// ExtJS Border Layout
Ext.create('Ext.panel.Panel', {
  layout: 'border',
  width: '100%',
  height: 600,
  items: [{
    region: 'center',
    xtype: 'panel',
    title: 'Main Content Area',
    html: 'This is the primary content section where the main information and functionality resides.',
    padding: 16
  }, {
    region: 'east',
    xtype: 'panel',
    title: 'Secondary Content',
    html: 'This sidebar section contains supplementary information and actions.',
    width: 300,
    padding: 16,
    collapsible: true
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface LayoutExampleProps {
  mainTitle: string;
  mainContent: string;
  sidebarTitle: string;
  sidebarContent: string;
}

function LayoutExample({
  mainTitle,
  mainContent,
  sidebarTitle,
  sidebarContent
}: LayoutExampleProps): JSX.Element {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">{mainTitle}</Text>
          <Text as="p" variant="bodyMd">{mainContent}</Text>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">{sidebarTitle}</Text>
          <Text as="p" variant="bodySm">{sidebarContent}</Text>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default LayoutExample;`
  }
};

// Page Component Examples - Layout
export const pageExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function PageExample() {
  return (
    <Page
      title="Products"
      primaryAction={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page-header">
    <h1 class="polaris-page-header__title">Products</h1>
    <div class="polaris-page-header__actions">
      <button class="polaris-button polaris-button--primary">Add product</button>
    </div>
  </div>

  <div class="polaris-page__content">
    <div class="polaris-card polaris-card--sectioned">
      <p>Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createPage } from '@cin7/vanilla-js';

const page = createPage({
  title: 'Products',
  primaryAction: {
    content: 'Add product',
    onClick: () => console.log('Add product clicked')
  },
  content: {
    type: 'card',
    content: 'Manage your product catalog here...'
  }
});

document.getElementById('app').appendChild(page);
</script>`,

    extjs: `// ExtJS Panel with Page structure
Ext.create('Ext.panel.Panel', {
  title: 'Products',
  layout: 'fit',
  width: '100%',
  height: 600,
  tbar: [{
    xtype: 'tbfill'
  }, {
    text: 'Add product',
    cls: 'polaris-button-primary',
    handler: function() {
      console.log('Add product clicked');
    }
  }],
  items: [{
    xtype: 'panel',
    html: '<div class="polaris-card"><p>Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.</p></div>',
    padding: 16
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface PageExampleProps {
  title: string;
  primaryActionContent: string;
  onPrimaryAction: () => void;
  content: string;
}

function PageExample({
  title,
  primaryActionContent,
  onPrimaryAction,
  content
}: PageExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={{
        content: primaryActionContent,
        onAction: onPrimaryAction,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              {content}
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageExample;`
  }
};

// ProgressBar Component Examples - Feedback
export const progressbarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ProgressBar } from '@shopify/polaris';
import React from 'react';

function ProgressBarExample() {
  return <ProgressBar progress={65} size="medium" />;
}

export default ProgressBarExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-progress-bar" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
  <div class="polaris-progress-bar__indicator" style="width: 65%;"></div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createProgressBar } from '@cin7/vanilla-js';

const progressBar = createProgressBar({
  progress: 65,
  size: 'medium',
  onChange: (value) => {
    console.log('Progress updated:', value);
  }
});

document.getElementById('app').appendChild(progressBar);
</script>`,

    extjs: `// ExtJS ProgressBar
Ext.create('Ext.ProgressBar', {
  value: 0.65,  // 65% as decimal
  text: '65%',
  width: 400,
  renderTo: Ext.getBody()
});

// Or using custom implementation
Ext.create('Ext.Component', {
  html: '<div class="polaris-progress-bar">' +
        '<div class="polaris-progress-bar__indicator" style="width: 65%;"></div>' +
        '</div>',
  width: 400,
  renderTo: Ext.getBody()
});`,

    typescript: `import { ProgressBar } from '@shopify/polaris';
import React from 'react';

interface ProgressBarExampleProps {
  progress: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'critical';
  animated?: boolean;
}

function ProgressBarExample({
  progress,
  size = 'medium',
  color = 'primary',
  animated = false
}: ProgressBarExampleProps): JSX.Element {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <ProgressBar
      progress={normalizedProgress}
      size={size}
      color={color}
      animated={animated}
    />
  );
}

export default ProgressBarExample;`
  }
};

// Spinner Component Examples - Feedback
export const spinnerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Spinner } from '@shopify/polaris';
import React from 'react';

function SpinnerExample() {
  return <Spinner size="medium" accessibilityLabel="Loading content" />;
}

export default SpinnerExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-spinner" role="status">
  <span class="polaris-spinner__svg">
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="7.5" />
    </svg>
  </span>
  <span class="polaris-visually-hidden">Loading content</span>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createSpinner } from '@cin7/vanilla-js';

const spinner = createSpinner({
  size: 'medium',
  accessibilityLabel: 'Loading content'
});

document.getElementById('app').appendChild(spinner);
</script>`,

    extjs: `// ExtJS LoadMask for loading indicator
const panel = Ext.create('Ext.panel.Panel', {
  width: 400,
  height: 200,
  html: 'Content loading...',
  renderTo: Ext.getBody()
});

// Show loading mask
panel.setLoading({
  msg: 'Loading content...',
  msgCls: 'polaris-spinner-message'
});

// Hide after 3 seconds
setTimeout(() => {
  panel.setLoading(false);
}, 3000);`,

    typescript: `import { Spinner } from '@shopify/polaris';
import React from 'react';

interface SpinnerExampleProps {
  size?: 'small' | 'medium' | 'large';
  accessibilityLabel?: string;
  hasFocusableParent?: boolean;
}

function SpinnerExample({
  size = 'medium',
  accessibilityLabel = 'Loading',
  hasFocusableParent = false
}: SpinnerExampleProps): JSX.Element {
  return (
    <Spinner
      size={size}
      accessibilityLabel={accessibilityLabel}
      hasFocusableParent={hasFocusableParent}
    />
  );
}

export default SpinnerExample;`
  }
};

// Toast Component Examples - Feedback
export const toastExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Toast, Frame } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function ToastExample() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Frame>
      <button onClick={toggleActive}>Show Toast</button>
      {active && (
        <Toast content="Message sent" onDismiss={toggleActive} />
      )}
    </Frame>
  );
}

export default ToastExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="show-toast">Show Toast</button>

<div class="polaris-toast-wrapper" style="display: none;">
  <div class="polaris-toast">
    <div class="polaris-toast__content">Message sent</div>
    <button class="polaris-toast__close">×</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createToast } from '@cin7/vanilla-js';

const button = document.getElementById('show-toast');
let toast;

button.addEventListener('click', () => {
  if (toast) {
    toast.remove();
  }

  toast = createToast({
    content: 'Message sent',
    duration: 5000,
    onDismiss: () => {
      console.log('Toast dismissed');
      toast = null;
    }
  });

  document.body.appendChild(toast);
});
</script>`,

    extjs: `// ExtJS Toast notification
Ext.toast({
  html: 'Message sent',
  title: 'Success',
  width: 300,
  align: 'br',
  autoCloseDelay: 5000
});

// Or using custom implementation
function showToast(message) {
  const toast = Ext.create('Ext.window.Toast', {
    html: message,
    title: 'Notification',
    width: 300,
    align: 'br',
    slideInDuration: 400,
    autoCloseDelay: 5000,
    closable: true
  });

  toast.show();
}

showToast('Message sent');`,

    typescript: `import { Toast, Frame } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface ToastExampleProps {
  defaultMessage?: string;
  duration?: number;
  error?: boolean;
}

function ToastExample({
  defaultMessage = 'Message sent',
  duration = 5000,
  error = false
}: ToastExampleProps): JSX.Element {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  return (
    <Frame>
      <button onClick={toggleActive}>Show Toast</button>
      {active && (
        <Toast
          content={defaultMessage}
          onDismiss={toggleActive}
          duration={duration}
          error={error}
        />
      )}
    </Frame>
  );
}

export default ToastExample;`
  }
};



// Navigation Component Examples
export const navigationExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Navigation } from '@shopify/polaris';
import React from 'react';

function NavigationExample() {
  const [location, setLocation] = React.useState('/home');

  return (
    <Navigation location={location}>
      <Navigation.Section
        items={[
          {
            url: '/home',
            label: 'Home',
            icon: 'home',
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: 'orders',
            badge: '12',
          },
          {
            url: '/products',
            label: 'Products',
            icon: 'products',
          },
        ]}
      />
    </Navigation>
  );
}

export default NavigationExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="polaris-navigation" id="navigation">
  <div class="polaris-navigation__section">
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/home" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏠</span>
          <span class="polaris-navigation__text">Home</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/orders" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📦</span>
          <span class="polaris-navigation__text">Orders</span>
          <span class="polaris-navigation__badge">12</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/products" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🛍️</span>
          <span class="polaris-navigation__text">Products</span>
        </a>
      </li>
    </ul>
  </div>
</nav>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

const navigation = {
  currentLocation: '/home',

  init() {
    const links = $('.polaris-navigation__link');

    links.forEach(link => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    });

    this.updateActiveState();
  },

  navigate(url) {
    this.currentLocation = url;
    this.updateActiveState();
    // Handle route change
    console.log('Navigated to:', url);
  },

  updateActiveState() {
    const links = $('.polaris-navigation__link');

    links.forEach(link => {
      const url = link.getAttribute('href');
      if (url === this.currentLocation) {
        link.classList.add('polaris-navigation__link--active');
      } else {
        link.classList.remove('polaris-navigation__link--active');
      }
    });
  }
};

navigation.init();
</script>`,

    extjs: `// ExtJS Navigation Panel using @cin7/extjs-adapters
Ext.define('App.view.Navigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-navigation',

  layout: 'fit',
  width: 240,

  items: [{
    xtype: 'treepanel',
    rootVisible: false,
    store: {
      root: {
        expanded: true,
        children: [
          {
            text: 'Home',
            iconCls: 'fa fa-home',
            leaf: true,
            route: '/home'
          },
          {
            text: 'Orders',
            iconCls: 'fa fa-shopping-cart',
            badge: '12',
            leaf: true,
            route: '/orders'
          },
          {
            text: 'Products',
            iconCls: 'fa fa-box',
            leaf: true,
            route: '/products'
          }
        ]
      }
    },

    listeners: {
      itemclick: function(view, record) {
        const route = record.get('route');
        if (route) {
          console.log('Navigate to:', route);
          // Handle navigation
        }
      }
    }
  }]
});

// Create the navigation panel
const navigation = Ext.create('App.view.Navigation', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Navigation } from '@shopify/polaris';
import React, { useState } from 'react';

interface NavigationItem {
  url: string;
  label: string;
  icon?: string;
  badge?: string;
}

interface NavigationExampleProps {
  items?: NavigationItem[];
  initialLocation?: string;
  onNavigate?: (url: string) => void;
}

function NavigationExample({
  items = [
    { url: '/home', label: 'Home', icon: 'home' },
    { url: '/orders', label: 'Orders', icon: 'orders', badge: '12' },
    { url: '/products', label: 'Products', icon: 'products' },
  ],
  initialLocation = '/home',
  onNavigate
}: NavigationExampleProps): JSX.Element {
  const [location, setLocation] = useState<string>(initialLocation);

  const handleNavigate = (url: string) => {
    setLocation(url);
    onNavigate?.(url);
  };

  return (
    <Navigation location={location}>
      <Navigation.Section
        items={items.map(item => ({
          ...item,
          onClick: () => handleNavigate(item.url)
        }))}
      />
    </Navigation>
  );
}

export default NavigationExample;`
  },

  nestedNavigation: {
    react: `import { Navigation } from '@shopify/polaris';
import React from 'react';

function NestedNavigationExample() {
  const [location, setLocation] = React.useState('/dashboard');

  return (
    <Navigation location={location}>
      <Navigation.Section
        title="Sales"
        items={[
          {
            url: '/dashboard',
            label: 'Dashboard',
            icon: 'home',
            selected: location.startsWith('/dashboard'),
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: 'orders',
            badge: '24',
            selected: location.startsWith('/orders'),
            subNavigationItems: [
              {
                url: '/orders/all',
                label: 'All Orders',
                selected: location === '/orders/all',
              },
              {
                url: '/orders/fulfillments',
                label: 'Fulfillments',
                selected: location === '/orders/fulfillments',
              },
              {
                url: '/orders/returns',
                label: 'Returns',
                selected: location === '/orders/returns',
                badge: '3',
              },
            ],
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: 'customers',
            selected: location.startsWith('/customers'),
            subNavigationItems: [
              {
                url: '/customers/all',
                label: 'All Customers',
                selected: location === '/customers/all',
              },
              {
                url: '/customers/segments',
                label: 'Segments',
                selected: location === '/customers/segments',
              },
              {
                url: '/customers/groups',
                label: 'Groups',
                selected: location === '/customers/groups',
              },
            ],
          },
        ]}
      />
    </Navigation>
  );
}

export default NestedNavigationExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="polaris-navigation" id="navigation">
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Sales</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/dashboard" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏠</span>
          <span class="polaris-navigation__text">Dashboard</span>
        </a>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/orders" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📦</span>
          <span class="polaris-navigation__text">Orders</span>
          <span class="polaris-navigation__badge">24</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li class="polaris-navigation__subitem">
            <a href="/orders/all" class="polaris-navigation__sublink">All Orders</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/orders/fulfillments" class="polaris-navigation__sublink">Fulfillments</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/orders/returns" class="polaris-navigation__sublink">
              Returns
              <span class="polaris-navigation__badge">3</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/customers" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">👥</span>
          <span class="polaris-navigation__text">Customers</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li class="polaris-navigation__subitem">
            <a href="/customers/all" class="polaris-navigation__sublink">All Customers</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/customers/segments" class="polaris-navigation__sublink">Segments</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/customers/groups" class="polaris-navigation__sublink">Groups</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, toggle, slideToggle } from '@cin7/vanilla-js';

const nestedNavigation = {
  currentLocation: '/dashboard',

  init() {
    // Handle main navigation clicks
    const links = $('.polaris-navigation__link');
    links.forEach(link => {
      on(link, 'click', (e) => {
        const parent = link.closest('.polaris-navigation__item--expandable');
        if (parent) {
          e.preventDefault();
          this.toggleSubNav(parent);
        } else {
          e.preventDefault();
          const url = link.getAttribute('href');
          this.navigate(url);
        }
      });
    });

    // Handle sub-navigation clicks
    const subLinks = $('.polaris-navigation__sublink');
    subLinks.forEach(link => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    });

    this.updateActiveState();
  },

  toggleSubNav(item) {
    const sublist = item.querySelector('.polaris-navigation__sublist');
    if (sublist) {
      slideToggle(sublist);
      toggle(item, 'polaris-navigation__item--expanded');
    }
  },

  navigate(url) {
    this.currentLocation = url;
    this.updateActiveState();
    console.log('Navigated to:', url);
  },

  updateActiveState() {
    // Update main links
    const links = $('.polaris-navigation__link');
    links.forEach(link => {
      const url = link.getAttribute('href');
      const parent = link.closest('.polaris-navigation__item');

      if (this.currentLocation.startsWith(url)) {
        link.classList.add('polaris-navigation__link--active');
        if (parent && parent.classList.contains('polaris-navigation__item--expandable')) {
          parent.classList.add('polaris-navigation__item--expanded');
          const sublist = parent.querySelector('.polaris-navigation__sublist');
          if (sublist) sublist.style.display = 'block';
        }
      } else {
        link.classList.remove('polaris-navigation__link--active');
      }
    });

    // Update sub-links
    const subLinks = $('.polaris-navigation__sublink');
    subLinks.forEach(link => {
      const url = link.getAttribute('href');
      if (url === this.currentLocation) {
        link.classList.add('polaris-navigation__sublink--active');
      } else {
        link.classList.remove('polaris-navigation__sublink--active');
      }
    });
  }
};

nestedNavigation.init();
</script>`,

    extjs: `// ExtJS Nested Navigation Tree using @cin7/extjs-adapters
Ext.define('App.view.NestedNavigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-nested-navigation',

  layout: 'fit',
  width: 240,

  items: [{
    xtype: 'treepanel',
    rootVisible: false,
    singleExpand: false,

    store: {
      root: {
        expanded: true,
        children: [
          {
            text: 'Sales',
            iconCls: 'fa fa-chart-line',
            expanded: true,
            children: [
              {
                text: 'Dashboard',
                iconCls: 'fa fa-home',
                leaf: true,
                route: '/dashboard'
              },
              {
                text: 'Orders',
                iconCls: 'fa fa-shopping-cart',
                badge: '24',
                expanded: false,
                children: [
                  {
                    text: 'All Orders',
                    leaf: true,
                    route: '/orders/all'
                  },
                  {
                    text: 'Fulfillments',
                    leaf: true,
                    route: '/orders/fulfillments'
                  },
                  {
                    text: 'Returns',
                    badge: '3',
                    leaf: true,
                    route: '/orders/returns'
                  }
                ]
              },
              {
                text: 'Customers',
                iconCls: 'fa fa-users',
                expanded: false,
                children: [
                  {
                    text: 'All Customers',
                    leaf: true,
                    route: '/customers/all'
                  },
                  {
                    text: 'Segments',
                    leaf: true,
                    route: '/customers/segments'
                  },
                  {
                    text: 'Groups',
                    leaf: true,
                    route: '/customers/groups'
                  }
                ]
              }
            ]
          }
        ]
      }
    },

    viewConfig: {
      getRowClass: function(record) {
        return record.get('badge') ? 'has-badge' : '';
      }
    },

    listeners: {
      itemclick: function(view, record) {
        const route = record.get('route');
        if (route) {
          console.log('Navigate to:', route);
          // Handle navigation and update active state
          view.getSelectionModel().select(record);
        }
      }
    }
  }]
});

// Create the navigation panel
const navigation = Ext.create('App.view.NestedNavigation', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Navigation } from '@shopify/polaris';
import React, { useState } from 'react';

interface SubNavigationItem {
  url: string;
  label: string;
  badge?: string;
}

interface NavigationItem {
  url: string;
  label: string;
  icon?: string;
  badge?: string;
  subNavigationItems?: SubNavigationItem[];
}

interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

interface NestedNavigationExampleProps {
  sections?: NavigationSection[];
  initialLocation?: string;
  onNavigate?: (url: string) => void;
}

function NestedNavigationExample({
  sections = [
    {
      title: 'Sales',
      items: [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'home',
        },
        {
          url: '/orders',
          label: 'Orders',
          icon: 'orders',
          badge: '24',
          subNavigationItems: [
            { url: '/orders/all', label: 'All Orders' },
            { url: '/orders/fulfillments', label: 'Fulfillments' },
            { url: '/orders/returns', label: 'Returns', badge: '3' },
          ],
        },
        {
          url: '/customers',
          label: 'Customers',
          icon: 'customers',
          subNavigationItems: [
            { url: '/customers/all', label: 'All Customers' },
            { url: '/customers/segments', label: 'Segments' },
            { url: '/customers/groups', label: 'Groups' },
          ],
        },
      ],
    },
  ],
  initialLocation = '/dashboard',
  onNavigate
}: NestedNavigationExampleProps): JSX.Element {
  const [location, setLocation] = useState<string>(initialLocation);

  const handleNavigate = (url: string) => {
    setLocation(url);
    onNavigate?.(url);
  };

  return (
    <Navigation location={location}>
      {sections.map((section, index) => (
        <Navigation.Section
          key={index}
          title={section.title}
          items={section.items.map(item => ({
            ...item,
            selected: location.startsWith(item.url),
            onClick: () => handleNavigate(item.url),
            subNavigationItems: item.subNavigationItems?.map(subItem => ({
              ...subItem,
              selected: location === subItem.url,
              onClick: () => handleNavigate(subItem.url),
            })),
          }))}
        />
      ))}
    </Navigation>
  );
}

export default NestedNavigationExample;`
  },

  ecommerceNavigation: {
    react: `import { Navigation } from '@shopify/polaris';
import React from 'react';

function EcommerceNavigationExample() {
  const [location, setLocation] = React.useState('/dashboard');

  const handleNavigation = (url: string) => {
    setLocation(url);
  };

  return (
    <Navigation location={location}>
      <Navigation.Section
        title="Online Store"
        items={[
          {
            url: '/dashboard',
            label: 'Dashboard',
            icon: 'home',
            onClick: () => handleNavigation('/dashboard'),
          },
          {
            url: '/products',
            label: 'Products',
            icon: 'products',
            badge: '156',
            onClick: () => handleNavigation('/products'),
            subNavigationItems: [
              {
                url: '/products/all',
                label: 'All products',
                onClick: () => handleNavigation('/products/all'),
              },
              {
                url: '/products/collections',
                label: 'Collections',
                onClick: () => handleNavigation('/products/collections'),
              },
              {
                url: '/products/inventory',
                label: 'Inventory',
                onClick: () => handleNavigation('/products/inventory'),
                badge: '23',
              },
              {
                url: '/products/gift-cards',
                label: 'Gift cards',
                onClick: () => handleNavigation('/products/gift-cards'),
              },
            ],
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: 'customers',
            onClick: () => handleNavigation('/customers'),
            subNavigationItems: [
              {
                url: '/customers/all',
                label: 'All customers',
                onClick: () => handleNavigation('/customers/all'),
              },
              {
                url: '/customers/segments',
                label: 'Segments',
                onClick: () => handleNavigation('/customers/segments'),
              },
              {
                url: '/customers/groups',
                label: 'Groups',
                onClick: () => handleNavigation('/customers/groups'),
              },
            ],
          },
          {
            url: '/analytics',
            label: 'Analytics',
            icon: 'analytics',
            onClick: () => handleNavigation('/analytics'),
            subNavigationItems: [
              {
                url: '/analytics/reports',
                label: 'Reports',
                onClick: () => handleNavigation('/analytics/reports'),
              },
              {
                url: '/analytics/live-view',
                label: 'Live view',
                onClick: () => handleNavigation('/analytics/live-view'),
              },
            ],
          },
        ]}
      />
      <Navigation.Section
        title="Apps"
        items={[
          {
            url: '/apps/marketing',
            label: 'Marketing',
            icon: 'marketing',
            onClick: () => handleNavigation('/apps/marketing'),
          },
          {
            url: '/apps/seo',
            label: 'SEO',
            icon: 'seo',
            onClick: () => handleNavigation('/apps/seo'),
          },
          {
            url: '/apps/discounts',
            label: 'Discounts',
            icon: 'discounts',
            onClick: () => handleNavigation('/apps/discounts'),
            badge: '5',
          },
        ]}
      />
      <Navigation.Section
        title="Settings"
        items={[
          {
            url: '/settings/general',
            label: 'General',
            icon: 'settings',
            onClick: () => handleNavigation('/settings/general'),
          },
          {
            url: '/settings/payment',
            label: 'Payment',
            icon: 'payment',
            onClick: () => handleNavigation('/settings/payment'),
          },
          {
            url: '/settings/shipping',
            label: 'Shipping',
            icon: 'shipping',
            onClick: () => handleNavigation('/settings/shipping'),
          },
        ]}
      />
    </Navigation>
  );
}

export default EcommerceNavigationExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="polaris-navigation" id="ecommerce-navigation">
  <!-- Online Store Section -->
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Online Store</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/dashboard" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏠</span>
          <span class="polaris-navigation__text">Dashboard</span>
        </a>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/products" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🛍️</span>
          <span class="polaris-navigation__text">Products</span>
          <span class="polaris-navigation__badge">156</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li><a href="/products/all" class="polaris-navigation__sublink">All products</a></li>
          <li><a href="/products/collections" class="polaris-navigation__sublink">Collections</a></li>
          <li><a href="/products/inventory" class="polaris-navigation__sublink">Inventory <span class="polaris-navigation__badge">23</span></a></li>
          <li><a href="/products/gift-cards" class="polaris-navigation__sublink">Gift cards</a></li>
        </ul>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/customers" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">👥</span>
          <span class="polaris-navigation__text">Customers</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li><a href="/customers/all" class="polaris-navigation__sublink">All customers</a></li>
          <li><a href="/customers/segments" class="polaris-navigation__sublink">Segments</a></li>
          <li><a href="/customers/groups" class="polaris-navigation__sublink">Groups</a></li>
        </ul>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/analytics" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📊</span>
          <span class="polaris-navigation__text">Analytics</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li><a href="/analytics/reports" class="polaris-navigation__sublink">Reports</a></li>
          <li><a href="/analytics/live-view" class="polaris-navigation__sublink">Live view</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <!-- Apps Section -->
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Apps</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/apps/marketing" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📣</span>
          <span class="polaris-navigation__text">Marketing</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/apps/seo" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🔍</span>
          <span class="polaris-navigation__text">SEO</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/apps/discounts" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏷️</span>
          <span class="polaris-navigation__text">Discounts</span>
          <span class="polaris-navigation__badge">5</span>
        </a>
      </li>
    </ul>
  </div>

  <!-- Settings Section -->
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Settings</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/settings/general" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">⚙️</span>
          <span class="polaris-navigation__text">General</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/settings/payment" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">💳</span>
          <span class="polaris-navigation__text">Payment</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/settings/shipping" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🚚</span>
          <span class="polaris-navigation__text">Shipping</span>
        </a>
      </li>
    </ul>
  </div>
</nav>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, toggle, slideToggle } from '@cin7/vanilla-js';

const ecommerceNavigation = {
  currentLocation: '/dashboard',

  init() {
    // Handle all navigation links
    this.attachLinkHandlers();
    this.attachExpandHandlers();
    this.updateActiveState();
  },

  attachLinkHandlers() {
    const links = $('.polaris-navigation__link');
    const subLinks = $('.polaris-navigation__sublink');

    links.forEach(link => {
      on(link, 'click', (e) => {
        const parent = link.closest('.polaris-navigation__item--expandable');
        if (!parent) {
          e.preventDefault();
          const url = link.getAttribute('href');
          this.navigate(url);
        }
      });
    });

    subLinks.forEach(link => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    });
  },

  attachExpandHandlers() {
    const expandableItems = $('.polaris-navigation__item--expandable');

    expandableItems.forEach(item => {
      const link = item.querySelector('.polaris-navigation__link');
      on(link, 'click', (e) => {
        e.preventDefault();
        this.toggleSubNav(item);
      });
    });
  },

  toggleSubNav(item) {
    const sublist = item.querySelector('.polaris-navigation__sublist');
    if (sublist) {
      slideToggle(sublist);
      toggle(item, 'polaris-navigation__item--expanded');
    }
  },

  navigate(url) {
    this.currentLocation = url;
    this.updateActiveState();
    console.log('Navigated to:', url);
    // Emit navigation event
    document.dispatchEvent(new CustomEvent('navigate', { detail: { url } }));
  },

  updateActiveState() {
    // Clear all active states
    $('.polaris-navigation__link').forEach(link => {
      link.classList.remove('polaris-navigation__link--active');
    });
    $('.polaris-navigation__sublink').forEach(link => {
      link.classList.remove('polaris-navigation__sublink--active');
    });

    // Set active state for current location
    const allLinks = [
      ...$('.polaris-navigation__link'),
      ...$('.polaris-navigation__sublink')
    ];

    allLinks.forEach(link => {
      const url = link.getAttribute('href');
      if (url === this.currentLocation) {
        link.classList.add(
          link.classList.contains('polaris-navigation__sublink')
            ? 'polaris-navigation__sublink--active'
            : 'polaris-navigation__link--active'
        );

        // Expand parent if this is a sub-link
        const parent = link.closest('.polaris-navigation__item--expandable');
        if (parent) {
          parent.classList.add('polaris-navigation__item--expanded');
          const sublist = parent.querySelector('.polaris-navigation__sublist');
          if (sublist) sublist.style.display = 'block';
        }
      }
    });
  }
};

ecommerceNavigation.init();
</script>`,

    extjs: `// ExtJS Multi-Section Navigation using @cin7/extjs-adapters
Ext.define('App.view.EcommerceNavigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-ecommerce-navigation',

  layout: 'fit',
  width: 280,
  scrollable: true,

  items: [{
    xtype: 'treepanel',
    rootVisible: false,
    singleExpand: false,

    store: {
      root: {
        expanded: true,
        children: [
          {
            text: 'Online Store',
            iconCls: 'fa fa-store',
            expanded: true,
            selectable: false,
            children: [
              {
                text: 'Dashboard',
                iconCls: 'fa fa-home',
                leaf: true,
                route: '/dashboard'
              },
              {
                text: 'Products',
                iconCls: 'fa fa-box',
                badge: '156',
                expanded: false,
                children: [
                  { text: 'All products', leaf: true, route: '/products/all' },
                  { text: 'Collections', leaf: true, route: '/products/collections' },
                  { text: 'Inventory', badge: '23', leaf: true, route: '/products/inventory' },
                  { text: 'Gift cards', leaf: true, route: '/products/gift-cards' }
                ]
              },
              {
                text: 'Customers',
                iconCls: 'fa fa-users',
                expanded: false,
                children: [
                  { text: 'All customers', leaf: true, route: '/customers/all' },
                  { text: 'Segments', leaf: true, route: '/customers/segments' },
                  { text: 'Groups', leaf: true, route: '/customers/groups' }
                ]
              },
              {
                text: 'Analytics',
                iconCls: 'fa fa-chart-line',
                expanded: false,
                children: [
                  { text: 'Reports', leaf: true, route: '/analytics/reports' },
                  { text: 'Live view', leaf: true, route: '/analytics/live-view' }
                ]
              }
            ]
          },
          {
            text: 'Apps',
            iconCls: 'fa fa-th',
            expanded: true,
            selectable: false,
            children: [
              {
                text: 'Marketing',
                iconCls: 'fa fa-bullhorn',
                leaf: true,
                route: '/apps/marketing'
              },
              {
                text: 'SEO',
                iconCls: 'fa fa-search',
                leaf: true,
                route: '/apps/seo'
              },
              {
                text: 'Discounts',
                iconCls: 'fa fa-tag',
                badge: '5',
                leaf: true,
                route: '/apps/discounts'
              }
            ]
          },
          {
            text: 'Settings',
            iconCls: 'fa fa-cog',
            expanded: true,
            selectable: false,
            children: [
              {
                text: 'General',
                iconCls: 'fa fa-cog',
                leaf: true,
                route: '/settings/general'
              },
              {
                text: 'Payment',
                iconCls: 'fa fa-credit-card',
                leaf: true,
                route: '/settings/payment'
              },
              {
                text: 'Shipping',
                iconCls: 'fa fa-truck',
                leaf: true,
                route: '/settings/shipping'
              }
            ]
          }
        ]
      }
    },

    viewConfig: {
      getRowClass: function(record) {
        const classes = [];
        if (record.get('badge')) classes.push('has-badge');
        if (!record.get('selectable') && record.get('selectable') !== undefined) {
          classes.push('section-header');
        }
        return classes.join(' ');
      }
    },

    listeners: {
      itemclick: function(view, record) {
        // Don't navigate on section headers
        if (record.get('selectable') === false) {
          return;
        }

        const route = record.get('route');
        if (route) {
          console.log('Navigate to:', route);
          view.getSelectionModel().select(record);
          // Emit navigation event
          Ext.GlobalEvents.fireEvent('navigate', route);
        }
      }
    }
  }],

  // Custom renderer for badges
  initComponent: function() {
    this.callParent(arguments);

    const tree = this.down('treepanel');
    tree.columns = [{
      xtype: 'treecolumn',
      dataIndex: 'text',
      flex: 1,
      renderer: function(value, metaData, record) {
        const badge = record.get('badge');
        if (badge) {
          return value + ' <span class="nav-badge">' + badge + '</span>';
        }
        return value;
      }
    }];
  }
});

// Create the navigation panel
const navigation = Ext.create('App.view.EcommerceNavigation', {
  renderTo: Ext.getBody()
});

// Listen for navigation events
Ext.GlobalEvents.on('navigate', function(route) {
  console.log('Global navigation event:', route);
  // Handle route changes in your application
});`,

    typescript: `import { Navigation } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface SubNavigationItem {
  url: string;
  label: string;
  badge?: string;
}

interface NavigationItem {
  url: string;
  label: string;
  icon?: string;
  badge?: string;
  subNavigationItems?: SubNavigationItem[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface EcommerceNavigationExampleProps {
  onNavigate?: (url: string) => void;
  initialLocation?: string;
}

function EcommerceNavigationExample({
  onNavigate,
  initialLocation = '/dashboard'
}: EcommerceNavigationExampleProps): JSX.Element {
  const [location, setLocation] = useState<string>(initialLocation);

  const handleNavigation = useCallback((url: string) => {
    setLocation(url);
    onNavigate?.(url);
  }, [onNavigate]);

  const sections: NavigationSection[] = [
    {
      title: 'Online Store',
      items: [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'home',
        },
        {
          url: '/products',
          label: 'Products',
          icon: 'products',
          badge: '156',
          subNavigationItems: [
            { url: '/products/all', label: 'All products' },
            { url: '/products/collections', label: 'Collections' },
            { url: '/products/inventory', label: 'Inventory', badge: '23' },
            { url: '/products/gift-cards', label: 'Gift cards' },
          ],
        },
        {
          url: '/customers',
          label: 'Customers',
          icon: 'customers',
          subNavigationItems: [
            { url: '/customers/all', label: 'All customers' },
            { url: '/customers/segments', label: 'Segments' },
            { url: '/customers/groups', label: 'Groups' },
          ],
        },
        {
          url: '/analytics',
          label: 'Analytics',
          icon: 'analytics',
          subNavigationItems: [
            { url: '/analytics/reports', label: 'Reports' },
            { url: '/analytics/live-view', label: 'Live view' },
          ],
        },
      ],
    },
    {
      title: 'Apps',
      items: [
        {
          url: '/apps/marketing',
          label: 'Marketing',
          icon: 'marketing',
        },
        {
          url: '/apps/seo',
          label: 'SEO',
          icon: 'seo',
        },
        {
          url: '/apps/discounts',
          label: 'Discounts',
          icon: 'discounts',
          badge: '5',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          url: '/settings/general',
          label: 'General',
          icon: 'settings',
        },
        {
          url: '/settings/payment',
          label: 'Payment',
          icon: 'payment',
        },
        {
          url: '/settings/shipping',
          label: 'Shipping',
          icon: 'shipping',
        },
      ],
    },
  ];

  return (
    <Navigation location={location}>
      {sections.map((section, sectionIndex) => (
        <Navigation.Section
          key={sectionIndex}
          title={section.title}
          items={section.items.map(item => ({
            ...item,
            onClick: () => handleNavigation(item.url),
            subNavigationItems: item.subNavigationItems?.map(subItem => ({
              ...subItem,
              onClick: () => handleNavigation(subItem.url),
            })),
          }))}
        />
      ))}
    </Navigation>
  );
}

export default EcommerceNavigationExample;`
  }
};

export const tabsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function TabsExample() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'all', content: 'All' },
    { id: 'active', content: 'Active' },
    { id: 'archived', content: 'Archived' },
  ];

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

export default TabsExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const tabsContainer = $('#tabs-container');
const tabs = [
  { id: 'all', content: 'All' },
  { id: 'active', content: 'Active' },
  { id: 'archived', content: 'Archived' }
];

let selectedIndex = 0;

function renderTabs() {
  tabsContainer.innerHTML = tabs.map((tab, index) =>
    \`<button
      class="tab \${index === selectedIndex ? 'selected' : ''}"
      data-index="\${index}"
    >
      \${tab.content}
    </button>\`
  ).join('');

  on(tabsContainer, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  items: [{
    title: 'All',
    itemId: 'all',
    html: 'All items content'
  }, {
    title: 'Active',
    itemId: 'active',
    html: 'Active items content'
  }, {
    title: 'Archived',
    itemId: 'archived',
    html: 'Archived items content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
}

interface TabsExampleProps {
  onTabChange?: (index: number, tab: Tab) => void;
}

function TabsExample({ onTabChange }: TabsExampleProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const tabs: Tab[] = [
    { id: 'all', content: 'All' },
    { id: 'active', content: 'Active' },
    { id: 'archived', content: 'Archived' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}

export default TabsExample;`
  },
  withBadges: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function TabsWithBadges() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'all', content: 'All', badge: '24' },
    { id: 'unread', content: 'Unread', badge: '5' },
    { id: 'flagged', content: 'Flagged', badge: '12' },
    { id: 'drafts', content: 'Drafts' },
  ];

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

export default TabsWithBadges;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const tabsContainer = $('#tabs-container');
const tabs = [
  { id: 'all', content: 'All', badge: '24' },
  { id: 'unread', content: 'Unread', badge: '5' },
  { id: 'flagged', content: 'Flagged', badge: '12' },
  { id: 'drafts', content: 'Drafts' }
];

let selectedIndex = 0;

function renderTabs() {
  tabsContainer.innerHTML = tabs.map((tab, index) =>
    \`<button
      class="tab \${index === selectedIndex ? 'selected' : ''}"
      data-index="\${index}"
    >
      \${tab.content}
      \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
    </button>\`
  ).join('');

  on(tabsContainer, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.closest('.tab').dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  items: [{
    title: 'All <span class="badge">24</span>',
    itemId: 'all',
    html: 'All items content'
  }, {
    title: 'Unread <span class="badge">5</span>',
    itemId: 'unread',
    html: 'Unread items content'
  }, {
    title: 'Flagged <span class="badge">12</span>',
    itemId: 'flagged',
    html: 'Flagged items content'
  }, {
    title: 'Drafts',
    itemId: 'drafts',
    html: 'Drafts content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface TabsWithBadgesProps {
  initialTab?: number;
  onTabChange?: (index: number, tab: Tab) => void;
}

function TabsWithBadges({ initialTab = 0, onTabChange }: TabsWithBadgesProps): JSX.Element {
  const [selected, setSelected] = useState<number>(initialTab);

  const tabs: Tab[] = [
    { id: 'all', content: 'All', badge: '24' },
    { id: 'unread', content: 'Unread', badge: '5' },
    { id: 'flagged', content: 'Flagged', badge: '12' },
    { id: 'drafts', content: 'Drafts' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}

export default TabsWithBadges;`
  },
  fitted: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function FittedTabs() {
  const [selected, setSelected] = useState(1);

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
      fitted
    />
  );
}

export default FittedTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const tabsContainer = $('#tabs-container');
const tabs = [
  { id: 'overview', content: 'Overview' },
  { id: 'products', content: 'Products' },
  { id: 'customers', content: 'Customers' },
  { id: 'analytics', content: 'Analytics' }
];

let selectedIndex = 1;

function renderTabs() {
  tabsContainer.innerHTML = \`
    <div class="tabs-fitted">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
        </button>\`
      ).join('')}
    </div>
  \`;

  on(tabsContainer, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

// CSS for fitted tabs
const style = document.createElement('style');
style.textContent = \`
  .tabs-fitted { display: flex; width: 100%; }
  .tabs-fitted .tab { flex: 1; }
\`;
document.head.appendChild(style);

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 1,
  tabBar: {
    flex: 1,
    layout: {
      pack: 'stretch'
    }
  },
  items: [{
    title: 'Overview',
    itemId: 'overview',
    html: 'Overview content'
  }, {
    title: 'Products',
    itemId: 'products',
    html: 'Products content'
  }, {
    title: 'Customers',
    itemId: 'customers',
    html: 'Customers content'
  }, {
    title: 'Analytics',
    itemId: 'analytics',
    html: 'Analytics content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
}

interface FittedTabsProps {
  defaultTab?: number;
  onTabChange?: (index: number, tab: Tab) => void;
}

function FittedTabs({ defaultTab = 1, onTabChange }: FittedTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(defaultTab);

  const tabs: Tab[] = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleSelect}
      fitted
    />
  );
}

export default FittedTabs;`
  },
  manyTabs: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function ManyTabs() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'dashboard', content: 'Dashboard' },
    { id: 'products', content: 'Products', badge: '128' },
    { id: 'orders', content: 'Orders', badge: '45' },
    { id: 'customers', content: 'Customers', badge: '1.2k' },
    { id: 'inventory', content: 'Inventory' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'marketing', content: 'Marketing' },
    { id: 'discounts', content: 'Discounts' },
    { id: 'settings', content: 'Settings' },
  ];

  return (
    <div style={{ width: '800px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        disclosureText="More tabs"
      />
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <p>Selected tab: <strong>{tabs[selected].content}</strong></p>
        <p>Tab ID: <strong>{tabs[selected].id}</strong></p>
      </div>
    </div>
  );
}

export default ManyTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const tabs = [
  { id: 'dashboard', content: 'Dashboard' },
  { id: 'products', content: 'Products', badge: '128' },
  { id: 'orders', content: 'Orders', badge: '45' },
  { id: 'customers', content: 'Customers', badge: '1.2k' },
  { id: 'inventory', content: 'Inventory' },
  { id: 'analytics', content: 'Analytics' },
  { id: 'marketing', content: 'Marketing' },
  { id: 'discounts', content: 'Discounts' },
  { id: 'settings', content: 'Settings' }
];

let selectedIndex = 0;
const visibleCount = 6;

function renderTabs() {
  const visibleTabs = tabs.slice(0, visibleCount);
  const overflowTabs = tabs.slice(visibleCount);

  container.innerHTML = \`
    <div class="tabs-wrapper">
      <div class="tabs-main">
        \${visibleTabs.map((tab, index) =>
          \`<button
            class="tab \${index === selectedIndex ? 'selected' : ''}"
            data-index="\${index}"
          >
            \${tab.content}
            \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
          </button>\`
        ).join('')}
      </div>
      \${overflowTabs.length > 0 ? \`
        <button class="tab-overflow">
          More tabs (\${overflowTabs.length})
        </button>
      \` : ''}
    </div>
    <div class="tab-content">
      <p>Selected tab: <strong>\${tabs[selectedIndex].content}</strong></p>
      <p>Tab ID: <strong>\${tabs[selectedIndex].id}</strong></p>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 800,
  tabBar: {
    enableOverflow: true,
    overflowHandler: 'menu'
  },
  items: [{
    title: 'Dashboard',
    itemId: 'dashboard',
    html: 'Dashboard content'
  }, {
    title: 'Products <span class="badge">128</span>',
    itemId: 'products',
    html: 'Products content'
  }, {
    title: 'Orders <span class="badge">45</span>',
    itemId: 'orders',
    html: 'Orders content'
  }, {
    title: 'Customers <span class="badge">1.2k</span>',
    itemId: 'customers',
    html: 'Customers content'
  }, {
    title: 'Inventory',
    itemId: 'inventory',
    html: 'Inventory content'
  }, {
    title: 'Analytics',
    itemId: 'analytics',
    html: 'Analytics content'
  }, {
    title: 'Marketing',
    itemId: 'marketing',
    html: 'Marketing content'
  }, {
    title: 'Discounts',
    itemId: 'discounts',
    html: 'Discounts content'
  }, {
    title: 'Settings',
    itemId: 'settings',
    html: 'Settings content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface ManyTabsProps {
  width?: number;
  disclosureText?: string;
  onTabChange?: (index: number, tab: Tab) => void;
}

function ManyTabs({ width = 800, disclosureText = 'More tabs', onTabChange }: ManyTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const tabs: Tab[] = [
    { id: 'dashboard', content: 'Dashboard' },
    { id: 'products', content: 'Products', badge: '128' },
    { id: 'orders', content: 'Orders', badge: '45' },
    { id: 'customers', content: 'Customers', badge: '1.2k' },
    { id: 'inventory', content: 'Inventory' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'marketing', content: 'Marketing' },
    { id: 'discounts', content: 'Discounts' },
    { id: 'settings', content: 'Settings' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <div style={{ width: \`\${width}px\` }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
        disclosureText={disclosureText}
      />
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <p>Selected tab: <strong>{tabs[selected].content}</strong></p>
        <p>Tab ID: <strong>{tabs[selected].id}</strong></p>
      </div>
    </div>
  );
}

export default ManyTabs;`
  },
  interactive: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function InteractiveTabs() {
  const [selected, setSelected] = useState(0);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({
    overview: 1,
    products: 3,
    customers: 0,
    analytics: 2,
  });

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  const handleTabSelect = (index: number) => {
    setSelected(index);
    const tabId = tabs[index].id;
    setViewCounts(prev => ({
      ...prev,
      [tabId]: prev[tabId] + 1,
    }));
  };

  return (
    <div style={{ width: '600px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>{tabs[selected].content} View</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          This is the content area for the <strong>{tabs[selected].content}</strong> tab.
        </p>

        <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)' }}>Tab Interaction Stats:</h4>
          {tabs.map((tab) => (
            <div key={tab.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ fontSize: 'var(--font-size-xs)' }}>{tab.content}:</span>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                {viewCounts[tab.id]} view{viewCounts[tab.id] !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const tabs = [
  { id: 'overview', content: 'Overview' },
  { id: 'products', content: 'Products' },
  { id: 'customers', content: 'Customers' },
  { id: 'analytics', content: 'Analytics' }
];

let selectedIndex = 0;
const viewCounts = { overview: 1, products: 3, customers: 0, analytics: 2 };

function renderTabs() {
  container.innerHTML = \`
    <div class="tabs-wrapper">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
        </button>\`
      ).join('')}
    </div>
    <div class="tab-content">
      <h3>\${tabs[selectedIndex].content} View</h3>
      <p>This is the content area for the <strong>\${tabs[selectedIndex].content}</strong> tab.</p>
      <div class="stats">
        <h4>Tab Interaction Stats:</h4>
        \${tabs.map(tab => \`
          <div class="stat-row">
            <span>\${tab.content}:</span>
            <span><strong>\${viewCounts[tab.id]} view\${viewCounts[tab.id] !== 1 ? 's' : ''}</strong></span>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    const tabId = tabs[selectedIndex].id;
    viewCounts[tabId]++;
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex],
      viewCount: viewCounts[tabId]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('InteractiveTabPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.viewCounts = {
      overview: 1,
      products: 3,
      customers: 0,
      analytics: 2
    };

    me.items = [{
      title: 'Overview',
      itemId: 'overview',
      html: me.getTabContent('overview')
    }, {
      title: 'Products',
      itemId: 'products',
      html: me.getTabContent('products')
    }, {
      title: 'Customers',
      itemId: 'customers',
      html: me.getTabContent('customers')
    }, {
      title: 'Analytics',
      itemId: 'analytics',
      html: me.getTabContent('analytics')
    }];

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      var tabId = newTab.itemId;
      me.viewCounts[tabId]++;
      newTab.update(me.getTabContent(tabId));
      EventBus.emit('tab:selected', {
        id: tabId,
        viewCount: me.viewCounts[tabId]
      });
    });
  },

  getTabContent: function(tabId) {
    var stats = '';
    for (var id in this.viewCounts) {
      stats += '<div>' + id + ': ' + this.viewCounts[id] + ' views</div>';
    }
    return '<div class="tab-content"><h3>' + tabId + ' View</h3>' +
           '<div class="stats">' + stats + '</div></div>';
  }
});

Ext.create('InteractiveTabPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 600
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
}

interface ViewCounts {
  [key: string]: number;
}

interface InteractiveTabsProps {
  initialCounts?: ViewCounts;
  onTabSelect?: (index: number, tab: Tab, viewCount: number) => void;
}

function InteractiveTabs({ initialCounts, onTabSelect }: InteractiveTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [viewCounts, setViewCounts] = useState<ViewCounts>(initialCounts || {
    overview: 1,
    products: 3,
    customers: 0,
    analytics: 2,
  });

  const tabs: Tab[] = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  const handleTabSelect = (index: number) => {
    setSelected(index);
    const tabId = tabs[index].id;
    const newCount = viewCounts[tabId] + 1;

    setViewCounts(prev => ({
      ...prev,
      [tabId]: newCount,
    }));

    onTabSelect?.(index, tabs[index], newCount);
  };

  return (
    <div style={{ width: '600px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>{tabs[selected].content} View</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          This is the content area for the <strong>{tabs[selected].content}</strong> tab.
        p>

        <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)' }}>Tab Interaction Stats:</h4>
          {tabs.map((tab) => (
            <div key={tab.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ fontSize: 'var(--font-size-xs)' }}>{tab.content}:</span>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                {viewCounts[tab.id]} view{viewCounts[tab.id] !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveTabs;`
  },
  productManagement: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function ProductManagementTabs() {
  const [selected, setSelected] = useState(0);
  const [productData] = useState({
    details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
    inventory: { stock: 150, reserved: 12, available: 138 },
    variants: { total: 5, active: 3 },
    analytics: { views: 1234, orders: 89, conversion: '7.2%' },
  });

  const tabs = [
    { id: 'details', content: 'Details' },
    { id: 'inventory', content: 'Inventory', badge: productData.inventory.available.toString() },
    { id: 'variants', content: 'Variants', badge: productData.variants.total.toString() },
    { id: 'analytics', content: 'Analytics' },
    { id: 'seo', content: 'SEO' },
  ];

  const renderTabContent = () => {
    switch (tabs[selected].id) {
      case 'details':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Product:</strong> {productData.details.name}</div>
            <div><strong>Price:</strong> {productData.details.price}</div>
            <div><strong>SKU:</strong> {productData.details.sku}</div>
          </div>
        );
      case 'inventory':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Stock:</strong> {productData.inventory.stock}</div>
            <div><strong>Reserved:</strong> {productData.inventory.reserved}</div>
            <div><strong>Available:</strong> {productData.inventory.available}</div>
          </div>
        );
      case 'variants':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Variants:</strong> {productData.variants.total}</div>
            <div><strong>Active:</strong> {productData.variants.active}</div>
            <div><strong>Inactive:</strong> {productData.variants.total - productData.variants.active}</div>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Page Views:</strong> {productData.analytics.views.toLocaleString()}</div>
            <div><strong>Orders:</strong> {productData.analytics.orders}</div>
            <div><strong>Conversion Rate:</strong> {productData.analytics.conversion}</div>
          </div>
        );
      case 'seo':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>
            <div><strong>Description:</strong> High-quality wireless headphones with noise cancellation</div>
            <div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '700px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>{tabs[selected].content}</h3>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProductManagementTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const tabs = [
  { id: 'details', content: 'Details' },
  { id: 'inventory', content: 'Inventory', badge: '138' },
  { id: 'variants', content: 'Variants', badge: '5' },
  { id: 'analytics', content: 'Analytics' },
  { id: 'seo', content: 'SEO' }
];

const productData = {
  details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
  inventory: { stock: 150, reserved: 12, available: 138 },
  variants: { total: 5, active: 3 },
  analytics: { views: 1234, orders: 89, conversion: '7.2%' },
  seo: {
    title: 'Premium Wireless Headphones - Shop Now',
    description: 'High-quality wireless headphones with noise cancellation',
    keywords: 'headphones, wireless, audio, premium'
  }
};

let selectedIndex = 0;

function renderTabContent() {
  const tabId = tabs[selectedIndex].id;
  const data = productData[tabId];

  if (!data) return '<p>No data available</p>';

  return Object.entries(data)
    .map(([key, value]) => \`<div><strong>\${key}:</strong> \${value}</div>\`)
    .join('');
}

function renderTabs() {
  container.innerHTML = \`
    <div class="tabs-wrapper">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
          \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
        </button>\`
      ).join('')}
    </div>
    <div class="tab-content">
      <h3>\${tabs[selectedIndex].content}</h3>
      <div class="product-data">\${renderTabContent()}</div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('ProductManagementPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.productData = {
      details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
      inventory: { stock: 150, reserved: 12, available: 138 },
      variants: { total: 5, active: 3 },
      analytics: { views: 1234, orders: 89, conversion: '7.2%' }
    };

    me.items = [{
      title: 'Details',
      itemId: 'details',
      html: me.renderDetails()
    }, {
      title: 'Inventory <span class="badge">138</span>',
      itemId: 'inventory',
      html: me.renderInventory()
    }, {
      title: 'Variants <span class="badge">5</span>',
      itemId: 'variants',
      html: me.renderVariants()
    }, {
      title: 'Analytics',
      itemId: 'analytics',
      html: me.renderAnalytics()
    }, {
      title: 'SEO',
      itemId: 'seo',
      html: me.renderSEO()
    }];

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      EventBus.emit('tab:selected', { id: newTab.itemId });
    });
  },

  renderDetails: function() {
    var d = this.productData.details;
    return '<div><strong>Product:</strong> ' + d.name + '</div>' +
           '<div><strong>Price:</strong> ' + d.price + '</div>' +
           '<div><strong>SKU:</strong> ' + d.sku + '</div>';
  },

  renderInventory: function() {
    var i = this.productData.inventory;
    return '<div><strong>Total Stock:</strong> ' + i.stock + '</div>' +
           '<div><strong>Reserved:</strong> ' + i.reserved + '</div>' +
           '<div><strong>Available:</strong> ' + i.available + '</div>';
  },

  renderVariants: function() {
    var v = this.productData.variants;
    return '<div><strong>Total Variants:</strong> ' + v.total + '</div>' +
           '<div><strong>Active:</strong> ' + v.active + '</div>' +
           '<div><strong>Inactive:</strong> ' + (v.total - v.active) + '</div>';
  },

  renderAnalytics: function() {
    var a = this.productData.analytics;
    return '<div><strong>Page Views:</strong> ' + a.views.toLocaleString() + '</div>' +
           '<div><strong>Orders:</strong> ' + a.orders + '</div>' +
           '<div><strong>Conversion Rate:</strong> ' + a.conversion + '</div>';
  },

  renderSEO: function() {
    return '<div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>' +
           '<div><strong>Description:</strong> High-quality wireless headphones</div>' +
           '<div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>';
  }
});

Ext.create('ProductManagementPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 700
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface ProductDetails {
  name: string;
  price: string;
  sku: string;
}

interface Inventory {
  stock: number;
  reserved: number;
  available: number;
}

interface Variants {
  total: number;
  active: number;
}

interface Analytics {
  views: number;
  orders: number;
  conversion: string;
}

interface ProductData {
  details: ProductDetails;
  inventory: Inventory;
  variants: Variants;
  analytics: Analytics;
}

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface ProductManagementTabsProps {
  initialData?: ProductData;
  onTabChange?: (index: number, tabId: string) => void;
}

function ProductManagementTabs({ initialData, onTabChange }: ProductManagementTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [productData] = useState<ProductData>(initialData || {
    details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
    inventory: { stock: 150, reserved: 12, available: 138 },
    variants: { total: 5, active: 3 },
    analytics: { views: 1234, orders: 89, conversion: '7.2%' },
  });

  const tabs: Tab[] = [
    { id: 'details', content: 'Details' },
    { id: 'inventory', content: 'Inventory', badge: productData.inventory.available.toString() },
    { id: 'variants', content: 'Variants', badge: productData.variants.total.toString() },
    { id: 'analytics', content: 'Analytics' },
    { id: 'seo', content: 'SEO' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index].id);
  };

  const renderTabContent = (): JSX.Element => {
    switch (tabs[selected].id) {
      case 'details':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Product:</strong> {productData.details.name}</div>
            <div><strong>Price:</strong> {productData.details.price}</div>
            <div><strong>SKU:</strong> {productData.details.sku}</div>
          </div>
        );
      case 'inventory':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Stock:</strong> {productData.inventory.stock}</div>
            <div><strong>Reserved:</strong> {productData.inventory.reserved}</div>
            <div><strong>Available:</strong> {productData.inventory.available}</div>
          </div>
        );
      case 'variants':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Variants:</strong> {productData.variants.total}</div>
            <div><strong>Active:</strong> {productData.variants.active}</div>
            <div><strong>Inactive:</strong> {productData.variants.total - productData.variants.active}</div>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Page Views:</strong> {productData.analytics.views.toLocaleString()}</div>
            <div><strong>Orders:</strong> {productData.analytics.orders}</div>
            <div><strong>Conversion Rate:</strong> {productData.analytics.conversion}</div>
          </div>
        );
      case 'seo':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>
            <div><strong>Description:</strong> High-quality wireless headphones with noise cancellation</div>
            <div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div style={{ width: '700px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>{tabs[selected].content}</h3>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProductManagementTabs;`
  },
  orderStatus: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function OrderStatusTabs() {
  const [selected, setSelected] = useState(0);

  const statusCounts = {
    all: 156,
    pending: 12,
    processing: 23,
    shipped: 45,
    delivered: 68,
    cancelled: 8,
  };

  const tabs = [
    { id: 'all', content: 'All Orders', badge: statusCounts.all.toString() },
    { id: 'pending', content: 'Pending', badge: statusCounts.pending.toString() },
    { id: 'processing', content: 'Processing', badge: statusCounts.processing.toString() },
    { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped.toString() },
    { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered.toString() },
    { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled.toString() },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div style={{ width: '800px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>{tabs[selected].content}</h3>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: getStatusColor(tabs[selected].id),
              color: 'white',
              borderRadius: '12px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            {statusCounts[tabs[selected].id as keyof typeof statusCounts]} orders
          </span>
        </div>

        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          Managing {statusCounts[tabs[selected].id as keyof typeof statusCounts]} orders with status: <strong>{tabs[selected].content}</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Total Value</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$12,456</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Average Order</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$89.95</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Processing Time</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>2.3 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const statusCounts = {
  all: 156,
  pending: 12,
  processing: 23,
  shipped: 45,
  delivered: 68,
  cancelled: 8
};

const tabs = [
  { id: 'all', content: 'All Orders', badge: statusCounts.all },
  { id: 'pending', content: 'Pending', badge: statusCounts.pending },
  { id: 'processing', content: 'Processing', badge: statusCounts.processing },
  { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped },
  { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered },
  { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled }
];

let selectedIndex = 0;

const statusColors = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

function renderTabs() {
  const currentTab = tabs[selectedIndex];
  const statusColor = statusColors[currentTab.id] || '#6b7280';

  container.innerHTML = \`
    <div class="tabs-wrapper">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
          <span class="badge">\${tab.badge}</span>
        </button>\`
      ).join('')}
    </div>
    <div class="tab-content">
      <div class="header">
        <h3>\${currentTab.content}</h3>
        <span class="status-badge" style="background: \${statusColor}">
          \${currentTab.badge} orders
        </span>
      </div>
      <p>Managing \${currentTab.badge} orders with status: <strong>\${currentTab.content}</strong></p>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Value</div>
          <div class="stat-value">$12,456</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Average Order</div>
          <div class="stat-value">$89.95</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Processing Time</div>
          <div class="stat-value">2.3 days</div>
        </div>
      </div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.closest('.tab').dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('OrderStatusPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.statusCounts = {
      all: 156,
      pending: 12,
      processing: 23,
      shipped: 45,
      delivered: 68,
      cancelled: 8
    };

    me.statusColors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };

    me.items = Object.keys(me.statusCounts).map(function(status) {
      var title = status === 'all' ? 'All Orders' :
                  status.charAt(0).toUpperCase() + status.slice(1);
      var count = me.statusCounts[status];

      return {
        title: title + ' <span class="badge">' + count + '</span>',
        itemId: status,
        html: me.renderStatusContent(status, count)
      };
    });

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        id: newTab.itemId,
        count: me.statusCounts[newTab.itemId]
      });
    });
  },

  renderStatusContent: function(status, count) {
    var color = this.statusColors[status] || '#6b7280';
    return '<div class="order-status-content">' +
           '<div class="header">' +
           '<h3>' + status + '</h3>' +
           '<span class="status-badge" style="background:' + color + '">' + count + ' orders</span>' +
           '</div>' +
           '<div class="stats">' +
           '<div class="stat"><span>Total Value:</span> <strong>$12,456</strong></div>' +
           '<div class="stat"><span>Average Order:</span> <strong>$89.95</strong></div>' +
           '<div class="stat"><span>Processing Time:</span> <strong>2.3 days</strong></div>' +
           '</div></div>';
  }
});

Ext.create('OrderStatusPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 800
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface StatusCounts {
  all: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

interface Tab {
  id: keyof StatusCounts;
  content: string;
  badge: string;
}

interface OrderStatusTabsProps {
  statusCounts?: StatusCounts;
  onStatusChange?: (status: string, count: number) => void;
}

function OrderStatusTabs({
  statusCounts: initialCounts,
  onStatusChange
}: OrderStatusTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const statusCounts: StatusCounts = initialCounts || {
    all: 156,
    pending: 12,
    processing: 23,
    shipped: 45,
    delivered: 68,
    cancelled: 8,
  };

  const tabs: Tab[] = [
    { id: 'all', content: 'All Orders', badge: statusCounts.all.toString() },
    { id: 'pending', content: 'Pending', badge: statusCounts.pending.toString() },
    { id: 'processing', content: 'Processing', badge: statusCounts.processing.toString() },
    { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped.toString() },
    { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered.toString() },
    { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled.toString() },
  ];

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const handleSelect = (index: number) => {
    setSelected(index);
    const currentTab = tabs[index];
    onStatusChange?.(currentTab.id, statusCounts[currentTab.id]);
  };

  return (
    <div style={{ width: '800px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>{tabs[selected].content}</h3>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: getStatusColor(tabs[selected].id),
              color: 'white',
              borderRadius: '12px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            {statusCounts[tabs[selected].id]} orders
          </span>
        </div>

        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          Managing {statusCounts[tabs[selected].id]} orders with status: <strong>{tabs[selected].content}</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Total Value</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$12,456</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Average Order</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$89.95</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Processing Time</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>2.3 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusTabs;`
  },
  campaignTabs: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function CampaignTabs() {
  const [selected, setSelected] = useState(0);
  const [campaignData] = useState({
    overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
    ads: { active: 8, total: 15, ctr: '2.4%' },
    audience: { reached: 12500, engaged: 890, new: 456 },
    analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 },
  });

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'ads', content: 'Ads', badge: campaignData.ads.active.toString() },
    { id: 'audience', content: 'Audience' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'settings', content: 'Settings' },
  ];

  return (
    <div style={{ width: '750px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        fitted
      />

      <div style={{
        marginTop: '20px',
        padding: '24px',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-xl)' }}>
          {tabs[selected].content}
        </h3>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          padding: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          {tabs[selected].id === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Total Budget</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Spent</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.spent}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>ROI</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.roi}</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'ads' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '8px' }}>
                {campaignData.ads.active} / {campaignData.ads.total}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
                Active ads with {campaignData.ads.ctr} click-through rate
              </div>
            </div>
          )}

          {tabs[selected].id === 'audience' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.reached.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>People Reached</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.engaged.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Engaged</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.new.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>New Customers</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'analytics' && (
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Performance Metrics</h4>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.impressions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Impressions</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.clicks}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Clicks</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.conversions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Conversions</div>
                </div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'settings' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: '12px' }}>Campaign Configuration</div>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Manage campaign settings, targeting, budget allocation, and scheduling options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const campaignData = {
  overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
  ads: { active: 8, total: 15, ctr: '2.4%' },
  audience: { reached: 12500, engaged: 890, new: 456 },
  analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 }
};

const tabs = [
  { id: 'overview', content: 'Overview' },
  { id: 'ads', content: 'Ads', badge: '8' },
  { id: 'audience', content: 'Audience' },
  { id: 'analytics', content: 'Analytics' },
  { id: 'settings', content: 'Settings' }
];

let selectedIndex = 0;

function renderContent() {
  const tabId = tabs[selectedIndex].id;
  const data = campaignData[tabId];

  switch (tabId) {
    case 'overview':
      return \`
        <div class="campaign-grid">
          <div><div class="label">Total Budget</div><div class="value">\${data.budget}</div></div>
          <div><div class="label">Spent</div><div class="value">\${data.spent}</div></div>
          <div><div class="label">ROI</div><div class="value">\${data.roi}</div></div>
        </div>
      \`;
    case 'ads':
      return \`
        <div class="campaign-center">
          <div class="big-value">\${data.active} / \${data.total}</div>
          <div class="label">Active ads with \${data.ctr} click-through rate</div>
        </div>
      \`;
    case 'audience':
      return \`
        <div class="campaign-grid">
          <div><div class="value">\${data.reached.toLocaleString()}</div><div class="label">People Reached</div></div>
          <div><div class="value">\${data.engaged.toLocaleString()}</div><div class="label">Engaged</div></div>
          <div><div class="value">\${data.new.toLocaleString()}</div><div class="label">New Customers</div></div>
        </div>
      \`;
    case 'analytics':
      return \`
        <div class="campaign-flow">
          <div><div class="value">\${data.impressions}</div><div class="label">Impressions</div></div>
          <div class="arrow">→</div>
          <div><div class="value">\${data.clicks}</div><div class="label">Clicks</div></div>
          <div class="arrow">→</div>
          <div><div class="value">\${data.conversions}</div><div class="label">Conversions</div></div>
        </div>
      \`;
    case 'settings':
      return \`
        <div class="campaign-center">
          <div class="label" style="font-size: 1.125rem; margin-bottom: 12px">Campaign Configuration</div>
          <p style="opacity: 0.8">Manage campaign settings, targeting, budget allocation, and scheduling options.</p>
        </div>
      \`;
    default:
      return '';
  }
}

function renderTabs() {
  container.innerHTML = \`
    <div class="tabs-fitted">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
          \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
        </button>\`
      ).join('')}
    </div>
    <div class="campaign-content">
      <h3>\${tabs[selectedIndex].content}</h3>
      <div class="campaign-panel">
        \${renderContent()}
      </div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('CampaignTabPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.campaignData = {
      overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
      ads: { active: 8, total: 15, ctr: '2.4%' },
      audience: { reached: 12500, engaged: 890, new: 456 },
      analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 }
    };

    me.items = [{
      title: 'Overview',
      itemId: 'overview',
      html: me.renderOverview()
    }, {
      title: 'Ads <span class="badge">8</span>',
      itemId: 'ads',
      html: me.renderAds()
    }, {
      title: 'Audience',
      itemId: 'audience',
      html: me.renderAudience()
    }, {
      title: 'Analytics',
      itemId: 'analytics',
      html: me.renderAnalytics()
    }, {
      title: 'Settings',
      itemId: 'settings',
      html: me.renderSettings()
    }];

    me.tabBar = {
      flex: 1,
      layout: { pack: 'stretch' }
    };

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      EventBus.emit('tab:selected', { id: newTab.itemId });
    });
  },

  renderOverview: function() {
    var d = this.campaignData.overview;
    return '<div class="campaign-grid">' +
           '<div><strong>Total Budget:</strong> ' + d.budget + '</div>' +
           '<div><strong>Spent:</strong> ' + d.spent + '</div>' +
           '<div><strong>ROI:</strong> ' + d.roi + '</div></div>';
  },

  renderAds: function() {
    var d = this.campaignData.ads;
    return '<div class="campaign-center"><h2>' + d.active + ' / ' + d.total + '</h2>' +
           '<p>Active ads with ' + d.ctr + ' click-through rate</p></div>';
  },

  renderAudience: function() {
    var d = this.campaignData.audience;
    return '<div class="campaign-grid">' +
           '<div><strong>' + d.reached.toLocaleString() + '</strong><br>People Reached</div>' +
           '<div><strong>' + d.engaged.toLocaleString() + '</strong><br>Engaged</div>' +
           '<div><strong>' + d.new.toLocaleString() + '</strong><br>New Customers</div></div>';
  },

  renderAnalytics: function() {
    var d = this.campaignData.analytics;
    return '<div class="campaign-flow">' +
           '<div><strong>' + d.impressions + '</strong><br>Impressions</div>' +
           '<div>→</div>' +
           '<div><strong>' + d.clicks + '</strong><br>Clicks</div>' +
           '<div>→</div>' +
           '<div><strong>' + d.conversions + '</strong><br>Conversions</div></div>';
  },

  renderSettings: function() {
    return '<div class="campaign-center">' +
           '<h3>Campaign Configuration</h3>' +
           '<p>Manage campaign settings, targeting, budget allocation, and scheduling options.</p></div>';
  }
});

Ext.create('CampaignTabPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 750
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface CampaignOverview {
  budget: string;
  spent: string;
  roi: string;
}

interface CampaignAds {
  active: number;
  total: number;
  ctr: string;
}

interface CampaignAudience {
  reached: number;
  engaged: number;
  new: number;
}

interface CampaignAnalytics {
  impressions: string;
  clicks: string;
  conversions: number;
}

interface CampaignData {
  overview: CampaignOverview;
  ads: CampaignAds;
  audience: CampaignAudience;
  analytics: CampaignAnalytics;
}

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface CampaignTabsProps {
  data?: CampaignData;
  onTabChange?: (index: number, tabId: string) => void;
}

function CampaignTabs({ data: initialData, onTabChange }: CampaignTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [campaignData] = useState<CampaignData>(initialData || {
    overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
    ads: { active: 8, total: 15, ctr: '2.4%' },
    audience: { reached: 12500, engaged: 890, new: 456 },
    analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 },
  });

  const tabs: Tab[] = [
    { id: 'overview', content: 'Overview' },
    { id: 'ads', content: 'Ads', badge: campaignData.ads.active.toString() },
    { id: 'audience', content: 'Audience' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'settings', content: 'Settings' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index].id);
  };

  return (
    <div style={{ width: '750px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
        fitted
      />

      <div style={{
        marginTop: '20px',
        padding: '24px',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-xl)' }}>
          {tabs[selected].content}
        </h3>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          padding: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          {tabs[selected].id === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Total Budget</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Spent</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.spent}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>ROI</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.roi}</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'ads' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '8px' }}>
                {campaignData.ads.active} / {campaignData.ads.total}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
                Active ads with {campaignData.ads.ctr} click-through rate
              </div>
            </div>
          )}

          {tabs[selected].id === 'audience' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.reached.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>People Reached</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.engaged.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Engaged</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.new.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>New Customers</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'analytics' && (
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Performance Metrics</h4>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.impressions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Impressions</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.clicks}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Clicks</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.conversions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Conversions</div>
                </div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'settings' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: '12px' }}>Campaign Configuration</div>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Manage campaign settings, targeting, budget allocation, and scheduling options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignTabs;`
  }
};

// ActionMenu Component Examples
export const actionMenuExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ActionMenu } from '@shopify/polaris';
import { EditIcon, DeleteIcon, DuplicateIcon, ArchiveIcon } from '@shopify/polaris-icons';
import React from 'react';

function ActionMenuExample() {
  return (
    <ActionMenu
      actions={[
        {
          content: 'Edit',
          icon: EditIcon,
          onAction: () => console.log('Edit clicked'),
        },
        {
          content: 'Duplicate',
          icon: DuplicateIcon,
          onAction: () => console.log('Duplicate clicked'),
        },
        {
          content: 'Archive',
          icon: ArchiveIcon,
          onAction: () => console.log('Archive clicked'),
        },
        {
          content: 'Delete',
          icon: DeleteIcon,
          destructive: true,
          onAction: () => console.log('Delete clicked'),
        },
      ]}
      activatorContent="Actions"
    />
  );
}

export default ActionMenuExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="action-menu-wrapper">
  <button class="action-menu-trigger" id="actionMenuTrigger">
    <span>Actions</span>
    <svg class="icon"><use href="#chevron-down" /></svg>
  </button>
  <ul class="action-menu-list" id="actionMenuList" style="display: none;">
    <li><button class="menu-item" data-action="edit">Edit</button></li>
    <li><button class="menu-item" data-action="duplicate">Duplicate</button></li>
    <li><button class="menu-item" data-action="archive">Archive</button></li>
    <li><button class="menu-item menu-item--destructive" data-action="delete">Delete</button></li>
  </ul>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, toggleClass } from '@cin7/vanilla-js';

const trigger = $('#actionMenuTrigger');
const menu = $('#actionMenuList');

on(trigger, 'click', () => {
  toggleClass(menu, 'visible');
});

// Handle menu item clicks
const items = menu.querySelectorAll('.menu-item');
items.forEach(item => {
  on(item, 'click', (e) => {
    const action = e.target.dataset.action;
    console.log(\`\${action} clicked\`);
    toggleClass(menu, 'visible');
  });
});

// Close menu when clicking outside
on(document, 'click', (e) => {
  if (!trigger.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove('visible');
  }
});
</script>`,

    extjs: `// ExtJS Button with Menu using @cin7/extjs-adapters
Ext.create('Ext.button.Button', {
  text: 'Actions',
  menu: {
    items: [
      {
        text: 'Edit',
        iconCls: 'icon-edit',
        handler: function() {
          console.log('Edit clicked');
        }
      },
      {
        text: 'Duplicate',
        iconCls: 'icon-duplicate',
        handler: function() {
          console.log('Duplicate clicked');
        }
      },
      {
        text: 'Archive',
        iconCls: 'icon-archive',
        handler: function() {
          console.log('Archive clicked');
        }
      },
      '-', // Separator
      {
        text: 'Delete',
        iconCls: 'icon-delete',
        cls: 'destructive-action',
        handler: function() {
          console.log('Delete clicked');
        }
      }
    ]
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisActionMenu } from '@cin7/extjs-adapters';

const actionMenu = Ext.create('PolarisActionMenu', {
  text: 'Actions',
  actions: [
    { text: 'Edit', action: 'edit' },
    { text: 'Duplicate', action: 'duplicate' },
    { text: 'Archive', action: 'archive' },
    { text: 'Delete', action: 'delete', destructive: true }
  ]
});`,

    typescript: `import { ActionMenu, ActionMenuProps } from '@shopify/polaris';
import { EditIcon, DeleteIcon, DuplicateIcon, ArchiveIcon } from '@shopify/polaris-icons';
import React from 'react';

interface ActionMenuExampleProps {
  onEdit?: () => void;
  onDuplicate?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  activatorLabel?: string;
}

type ActionHandler = () => void;

interface MenuAction {
  content: string;
  icon?: React.ComponentType;
  onAction: ActionHandler;
  destructive?: boolean;
}

function ActionMenuExample({
  onEdit = () => console.log('Edit clicked'),
  onDuplicate = () => console.log('Duplicate clicked'),
  onArchive = () => console.log('Archive clicked'),
  onDelete = () => console.log('Delete clicked'),
  activatorLabel = 'Actions'
}: ActionMenuExampleProps): JSX.Element {
  const actions: MenuAction[] = [
    {
      content: 'Edit',
      icon: EditIcon,
      onAction: onEdit,
    },
    {
      content: 'Duplicate',
      icon: DuplicateIcon,
      onAction: onDuplicate,
    },
    {
      content: 'Archive',
      icon: ArchiveIcon,
      onAction: onArchive,
    },
    {
      content: 'Delete',
      icon: DeleteIcon,
      destructive: true,
      onAction: onDelete,
    },
  ];

  return (
    <ActionMenu
      actions={actions}
      activatorContent={activatorLabel}
    />
  );
}

export default ActionMenuExample;`
  }
};

// ButtonGroup Component Examples
export const buttonGroupExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ButtonGroup, Button } from '@shopify/polaris';
import React from 'react';

function ButtonGroupExample() {
  return (
    <ButtonGroup>
      <Button variant="primary">Save</Button>
      <Button>Cancel</Button>
      <Button variant="plain">Help</Button>
    </ButtonGroup>
  );
}

export default ButtonGroupExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="button-group">
  <button class="polaris-button polaris-button--primary">Save</button>
  <button class="polaris-button">Cancel</button>
  <button class="polaris-button polaris-button--plain">Help</button>
</div>

<style>
.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

const buttons = $('.button-group button');
buttons.forEach((btn, index) => {
  on(btn, 'click', () => {
    const actions = ['save', 'cancel', 'help'];
    console.log(\`\${actions[index]} action triggered\`);
  });
});
</script>`,

    extjs: `// ExtJS Button Group using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    pack: 'start'
  },
  defaults: {
    margin: '0 8 0 0'
  },
  items: [
    {
      xtype: 'button',
      text: 'Save',
      ui: 'action',
      handler: function() {
        console.log('Save clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Cancel',
      handler: function() {
        console.log('Cancel clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Help',
      ui: 'plain',
      handler: function() {
        console.log('Help clicked');
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, ButtonProps } from '@shopify/polaris';
import React from 'react';

interface ButtonConfig {
  label: string;
  variant?: ButtonProps['variant'];
  onClick: () => void;
}

interface ButtonGroupExampleProps {
  buttons: ButtonConfig[];
}

function ButtonGroupExample({ buttons }: ButtonGroupExampleProps): JSX.Element {
  return (
    <ButtonGroup>
      {buttons.map((btn, index) => (
        <Button
          key={index}
          variant={btn.variant}
          onClick={btn.onClick}
        >
          {btn.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ButtonGroupExample;`
  },

  segmented: {
    react: `import { ButtonGroup, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function SegmentedButtonGroupExample() {
  const [selected, setSelected] = useState('day');

  return (
    <ButtonGroup segmented>
      <Button
        variant={selected === 'day' ? 'primary' : 'plain'}
        onClick={() => setSelected('day')}
        pressed={selected === 'day'}
      >
        Day
      </Button>
      <Button
        variant={selected === 'week' ? 'primary' : 'plain'}
        onClick={() => setSelected('week')}
        pressed={selected === 'week'}
      >
        Week
      </Button>
      <Button
        variant={selected === 'month' ? 'primary' : 'plain'}
        onClick={() => setSelected('month')}
        pressed={selected === 'month'}
      >
        Month
      </Button>
    </ButtonGroup>
  );
}

export default SegmentedButtonGroupExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="button-group-segmented">
  <button class="segmented-button active" data-value="day">Day</button>
  <button class="segmented-button" data-value="week">Week</button>
  <button class="segmented-button" data-value="month">Month</button>
</div>

<style>
.button-group-segmented {
  display: inline-flex;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}
.segmented-button {
  padding: 8px 16px;
  border: none;
  border-right: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
}
.segmented-button:last-child { border-right: none; }
.segmented-button.active { background: #0066cc; color: white; }
</style>

<script>
import { $$, on } from '@cin7/vanilla-js';

const buttons = $$('.segmented-button');
buttons.forEach(btn => {
  on(btn, 'click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
</script>`,

    extjs: `// ExtJS Segmented Button
Ext.create('Ext.container.Container', {
  layout: 'hbox',
  defaults: {
    xtype: 'button',
    enableToggle: true,
    toggleGroup: 'period',
    allowDepress: false
  },
  items: [{
    text: 'Day',
    pressed: true
  }, {
    text: 'Week'
  }, {
    text: 'Month'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button } from '@shopify/polaris';
import React, { useState } from 'react';

type Period = 'day' | 'week' | 'month';

interface SegmentedProps {
  onChange?: (value: Period) => void;
}

function SegmentedButtonGroupExample({ onChange }: SegmentedProps): JSX.Element {
  const [selected, setSelected] = useState<Period>('day');

  const handleSelect = (value: Period) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <ButtonGroup segmented>
      {(['day', 'week', 'month'] as Period[]).map(period => (
        <Button
          key={period}
          variant={selected === period ? 'primary' : 'plain'}
          onClick={() => handleSelect(period)}
          pressed={selected === period}
        >
          {period.charAt(0).toUpperCase() + period.slice(1)}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default SegmentedButtonGroupExample;`
  },

  fullwidth: {
    react: `import { ButtonGroup, Button } from '@shopify/polaris';
import React from 'react';

function FullWidthButtonGroupExample() {
  return (
    <ButtonGroup fullWidth>
      <Button variant="primary">Continue to Checkout</Button>
      <Button variant="secondary">Save for Later</Button>
    </ButtonGroup>
  );
}

export default FullWidthButtonGroupExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="button-group-fullwidth">
  <button class="button-primary">Continue to Checkout</button>
  <button class="button-secondary">Save for Later</button>
</div>

<style>
.button-group-fullwidth {
  display: flex;
  gap: 8px;
  width: 100%;
}
.button-group-fullwidth button {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}
.button-primary {
  background: #0066cc;
  color: white;
}
.button-secondary {
  background: #f3f4f6;
  color: #1f2937;
}
</style>`,

    extjs: `// ExtJS Full Width Buttons
Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    pack: 'stretch'
  },
  width: '100%',
  defaults: {
    flex: 1,
    margin: '0 4 0 0'
  },
  items: [{
    xtype: 'button',
    text: 'Continue to Checkout',
    ui: 'action'
  }, {
    xtype: 'button',
    text: 'Save for Later',
    margin: 0
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, ButtonProps } from '@shopify/polaris';
import React from 'react';

interface FullWidthAction {
  label: string;
  variant: ButtonProps['variant'];
  onClick: () => void;
}

interface FullWidthProps {
  actions: FullWidthAction[];
}

function FullWidthButtonGroupExample({ actions }: FullWidthProps): JSX.Element {
  return (
    <ButtonGroup fullWidth>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default FullWidthButtonGroupExample;`
  },
  'variant-group': {
    react: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

export function VariantGroupExample() {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Action Variants</Text>

        <div>
          <Text as="p" variant="bodySm">Primary Actions:</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary">Save</Button>
            <Button variant="primary">Submit</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Secondary Actions:</Text>
          <ButtonGroup gap="tight">
            <Button variant="secondary">Edit</Button>
            <Button variant="secondary">Delete</Button>
            <Button variant="secondary">Export</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Tertiary Actions:</Text>
          <ButtonGroup gap="tight">
            <Button variant="tertiary">Preview</Button>
            <Button variant="tertiary">Download</Button>
            <Button variant="tertiary">Share</Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  );
}

export default VariantGroupExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="variant-demo">
  <h3>Action Variants</h3>

  <div class="variant-section">
    <p>Primary Actions:</p>
    <div class="button-group button-group-tight">
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-primary">Submit</button>
    </div>
  </div>

  <div class="variant-section">
    <p>Secondary Actions:</p>
    <div class="button-group button-group-tight">
      <button class="btn btn-secondary">Edit</button>
      <button class="btn btn-secondary">Delete</button>
      <button class="btn btn-secondary">Export</button>
    </div>
  </div>

  <div class="variant-section">
    <p>Tertiary Actions:</p>
    <div class="button-group button-group-tight">
      <button class="btn btn-tertiary">Preview</button>
      <button class="btn btn-tertiary">Download</button>
      <button class="btn btn-tertiary">Share</button>
    </div>
  </div>
</div>

<style>
.variant-demo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.variant-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.button-group {
  display: flex;
  gap: 8px;
}
.button-group-tight {
  gap: 4px;
}
.btn {
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}
.btn-secondary {
  background: white;
  color: #202223;
}
.btn-tertiary {
  background: transparent;
  color: #0066cc;
  border-color: transparent;
}
</style>`,

    extjs: `// ExtJS Button Variant Groups
Ext.create('Ext.panel.Panel', {
  title: 'Action Variants',
  bodyPadding: 16,
  width: 400,
  items: [{
    xtype: 'container',
    html: '<p>Primary Actions:</p>',
    margin: '0 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0',
      ui: 'default-toolbar'
    },
    items: [{
      xtype: 'button',
      text: 'Save',
      cls: 'primary-action'
    }, {
      xtype: 'button',
      text: 'Submit',
      cls: 'primary-action'
    }]
  }, {
    xtype: 'container',
    html: '<p style="margin-top: 16px;">Secondary Actions:</p>',
    margin: '16 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Edit'
    }, {
      xtype: 'button',
      text: 'Delete'
    }, {
      xtype: 'button',
      text: 'Export'
    }]
  }, {
    xtype: 'container',
    html: '<p style="margin-top: 16px;">Tertiary Actions:</p>',
    margin: '16 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0',
      ui: 'default-toolbar'
    },
    items: [{
      xtype: 'button',
      text: 'Preview',
      cls: 'tertiary-action'
    }, {
      xtype: 'button',
      text: 'Download',
      cls: 'tertiary-action'
    }, {
      xtype: 'button',
      text: 'Share',
      cls: 'tertiary-action'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ActionGroup {
  title: string;
  variant: ButtonVariant;
  actions: string[];
}

interface VariantGroupProps {
  groups?: ActionGroup[];
  onAction?: (variant: ButtonVariant, action: string) => void;
}

export function VariantGroupExample({
  groups = [
    { title: 'Primary Actions', variant: 'primary', actions: ['Save', 'Submit'] },
    { title: 'Secondary Actions', variant: 'secondary', actions: ['Edit', 'Delete', 'Export'] },
    { title: 'Tertiary Actions', variant: 'tertiary', actions: ['Preview', 'Download', 'Share'] }
  ],
  onAction
}: VariantGroupProps): JSX.Element {
  const handleAction = (variant: ButtonVariant, action: string) => {
    onAction?.(variant, action);
    console.log(\`\${variant} action: \${action}\`);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Action Variants</Text>

        {groups.map((group, index) => (
          <div key={index}>
            <Text as="p" variant="bodySm">{group.title}:</Text>
            <ButtonGroup gap="tight">
              {group.actions.map((action, actionIndex) => (
                <Button
                  key={actionIndex}
                  variant={group.variant}
                  onClick={() => handleAction(group.variant, action)}
                >
                  {action}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default VariantGroupExample;`
  },
  'icon-buttons': {
    react: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import { EditIcon, DeleteIcon, ExportIcon, DuplicateIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, RefreshIcon, SettingsIcon } from '@shopify/polaris-icons';
import React from 'react';

export function IconButtonsExample() {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Icon Actions</Text>

        <ButtonGroup gap="tight">
          <Button variant="plain" icon={EditIcon}>Edit</Button>
          <Button variant="plain" icon={DeleteIcon}>Delete</Button>
          <Button variant="plain" icon={ExportIcon}>Export</Button>
          <Button variant="plain" icon={DuplicateIcon}>Copy</Button>
        </ButtonGroup>

        <ButtonGroup gap="tight">
          <Button variant="plain" icon={ChevronLeftIcon}>Previous</Button>
          <Button variant="plain" icon={ChevronRightIcon}>Next</Button>
        </ButtonGroup>

        <ButtonGroup gap="tight">
          <Button variant="plain" icon={SearchIcon}>Search</Button>
          <Button variant="plain" icon={RefreshIcon}>Refresh</Button>
          <Button variant="plain" icon={SettingsIcon}>Settings</Button>
        </ButtonGroup>
      </BlockStack>
    </Card>
  );
}

export default IconButtonsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="icon-buttons-demo">
  <h3>Icon Actions</h3>

  <div class="button-group">
    <button class="btn-icon">
      <span class="icon">✏️</span>
      <span>Edit</span>
    </button>
    <button class="btn-icon">
      <span class="icon">🗑️</span>
      <span>Delete</span>
    </button>
    <button class="btn-icon">
      <span class="icon">📤</span>
      <span>Export</span>
    </button>
    <button class="btn-icon">
      <span class="icon">📋</span>
      <span>Copy</span>
    </button>
  </div>

  <div class="button-group">
    <button class="btn-icon">
      <span class="icon">⬅️</span>
      <span>Previous</span>
    </button>
    <button class="btn-icon">
      <span class="icon">➡️</span>
      <span>Next</span>
    </button>
  </div>

  <div class="button-group">
    <button class="btn-icon">
      <span class="icon">🔍</span>
      <span>Search</span>
    </button>
    <button class="btn-icon">
      <span class="icon">🔄</span>
      <span>Refresh</span>
    </button>
    <button class="btn-icon">
      <span class="icon">⚙️</span>
      <span>Settings</span>
    </button>
  </div>
</div>

<style>
.icon-buttons-demo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.button-group {
  display: flex;
  gap: 8px;
}
.btn-icon {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #202223;
}
.btn-icon:hover {
  background: #f3f4f6;
}
.icon {
  font-size: 16px;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $$, on } from '@cin7/vanilla-js';

$$('.btn-icon').forEach(btn => {
  on(btn, 'click', (e) => {
    const text = btn.querySelector('span:last-child').textContent;
    console.log('Icon button clicked:', text);
  });
});
</script>`,

    extjs: `// ExtJS Icon Buttons
Ext.create('Ext.panel.Panel', {
  title: 'Icon Actions',
  bodyPadding: 16,
  width: 500,
  items: [{
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Edit',
      iconCls: 'x-fa fa-edit'
    }, {
      xtype: 'button',
      text: 'Delete',
      iconCls: 'x-fa fa-trash'
    }, {
      xtype: 'button',
      text: 'Export',
      iconCls: 'x-fa fa-download'
    }, {
      xtype: 'button',
      text: 'Copy',
      iconCls: 'x-fa fa-copy'
    }]
  }, {
    xtype: 'container',
    layout: 'hbox',
    margin: '12 0 0 0',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Previous',
      iconCls: 'x-fa fa-chevron-left'
    }, {
      xtype: 'button',
      text: 'Next',
      iconCls: 'x-fa fa-chevron-right'
    }]
  }, {
    xtype: 'container',
    layout: 'hbox',
    margin: '12 0 0 0',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Search',
      iconCls: 'x-fa fa-search'
    }, {
      xtype: 'button',
      text: 'Refresh',
      iconCls: 'x-fa fa-refresh'
    }, {
      xtype: 'button',
      text: 'Settings',
      iconCls: 'x-fa fa-cog'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import type { IconSource } from '@shopify/polaris';
import {
  EditIcon,
  DeleteIcon,
  ExportIcon,
  DuplicateIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
  RefreshIcon,
  SettingsIcon
} from '@shopify/polaris-icons';
import React from 'react';

interface IconAction {
  label: string;
  icon: IconSource;
  onClick: () => void;
}

interface IconButtonGroup {
  actions: IconAction[];
}

interface IconButtonsProps {
  groups?: IconButtonGroup[];
  variant?: 'plain' | 'primary' | 'secondary';
  gap?: 'tight' | 'loose' | 'extraTight';
}

export function IconButtonsExample({
  groups = [
    {
      actions: [
        { label: 'Edit', icon: EditIcon, onClick: () => console.log('Edit') },
        { label: 'Delete', icon: DeleteIcon, onClick: () => console.log('Delete') },
        { label: 'Export', icon: ExportIcon, onClick: () => console.log('Export') },
        { label: 'Copy', icon: DuplicateIcon, onClick: () => console.log('Copy') }
      ]
    },
    {
      actions: [
        { label: 'Previous', icon: ChevronLeftIcon, onClick: () => console.log('Previous') },
        { label: 'Next', icon: ChevronRightIcon, onClick: () => console.log('Next') }
      ]
    },
    {
      actions: [
        { label: 'Search', icon: SearchIcon, onClick: () => console.log('Search') },
        { label: 'Refresh', icon: RefreshIcon, onClick: () => console.log('Refresh') },
        { label: 'Settings', icon: SettingsIcon, onClick: () => console.log('Settings') }
      ]
    }
  ],
  variant = 'plain',
  gap = 'tight'
}: IconButtonsProps): JSX.Element {
  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Icon Actions</Text>

        {groups.map((group, groupIndex) => (
          <ButtonGroup key={groupIndex} gap={gap}>
            {group.actions.map((action, actionIndex) => (
              <Button
                key={actionIndex}
                variant={variant}
                icon={action.icon}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            ))}
          </ButtonGroup>
        ))}
      </BlockStack>
    </Card>
  );
}

export default IconButtonsExample;`
  },
  'size-variations': {
    react: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

export function SizeVariationsExample() {
  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Button Size Variations</Text>

        <div>
          <Text as="p" variant="bodySm">Micro Buttons:</Text>
          <ButtonGroup gap="tight">
            <Button size="micro" variant="primary">Save</Button>
            <Button size="micro" variant="secondary">Cancel</Button>
            <Button size="micro" variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Slim Buttons:</Text>
          <ButtonGroup gap="tight">
            <Button size="slim" variant="primary">Save</Button>
            <Button size="slim" variant="secondary">Cancel</Button>
            <Button size="slim" variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Medium Buttons (Default):</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Large Buttons:</Text>
          <ButtonGroup gap="tight">
            <Button size="large" variant="primary">Save Changes</Button>
            <Button size="large" variant="secondary">Discard</Button>
            <Button size="large" variant="tertiary">Learn More</Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  );
}

export default SizeVariationsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="size-variations-demo">
  <h3>Button Size Variations</h3>

  <div class="size-section">
    <p>Micro Buttons:</p>
    <div class="button-group">
      <button class="btn btn-primary btn-micro">Save</button>
      <button class="btn btn-secondary btn-micro">Cancel</button>
      <button class="btn btn-tertiary btn-micro">Help</button>
    </div>
  </div>

  <div class="size-section">
    <p>Slim Buttons:</p>
    <div class="button-group">
      <button class="btn btn-primary btn-slim">Save</button>
      <button class="btn btn-secondary btn-slim">Cancel</button>
      <button class="btn btn-tertiary btn-slim">Help</button>
    </div>
  </div>

  <div class="size-section">
    <p>Medium Buttons (Default):</p>
    <div class="button-group">
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-tertiary">Help</button>
    </div>
  </div>

  <div class="size-section">
    <p>Large Buttons:</p>
    <div class="button-group">
      <button class="btn btn-primary btn-large">Save Changes</button>
      <button class="btn btn-secondary btn-large">Discard</button>
      <button class="btn btn-tertiary btn-large">Learn More</button>
    </div>
  </div>
</div>

<style>
.size-variations-demo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.size-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.button-group {
  display: flex;
  gap: 8px;
}
.btn {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-micro {
  padding: 4px 8px;
  font-size: 12px;
}
.btn-slim {
  padding: 6px 12px;
  font-size: 14px;
}
.btn-large {
  padding: 14px 20px;
  font-size: 16px;
}
.btn-primary {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}
.btn-secondary {
  background: white;
  color: #202223;
}
.btn-tertiary {
  background: transparent;
  color: #0066cc;
  border-color: transparent;
}
</style>`,

    extjs: `// ExtJS Button Size Variations
Ext.create('Ext.panel.Panel', {
  title: 'Button Size Variations',
  bodyPadding: 16,
  width: 500,
  items: [{
    xtype: 'container',
    html: '<p>Micro Buttons:</p>',
    margin: '0 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0',
      scale: 'small'
    },
    items: [{
      xtype: 'button',
      text: 'Save',
      ui: 'default-small'
    }, {
      xtype: 'button',
      text: 'Cancel'
    }, {
      xtype: 'button',
      text: 'Help'
    }]
  }, {
    xtype: 'container',
    html: '<p style="margin-top: 24px;">Slim Buttons:</p>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Save',
      scale: 'medium'
    }, {
      xtype: 'button',
      text: 'Cancel',
      scale: 'medium'
    }, {
      xtype: 'button',
      text: 'Help',
      scale: 'medium'
    }]
  }, {
    xtype: 'container',
    html: '<p style="margin-top: 24px;">Medium Buttons (Default):</p>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Save'
    }, {
      xtype: 'button',
      text: 'Cancel'
    }, {
      xtype: 'button',
      text: 'Help'
    }]
  }, {
    xtype: 'container',
    html: '<p style="margin-top: 24px;">Large Buttons:</p>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0',
      scale: 'large'
    },
    items: [{
      xtype: 'button',
      text: 'Save Changes'
    }, {
      xtype: 'button',
      text: 'Discard'
    }, {
      xtype: 'button',
      text: 'Learn More'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

type ButtonSize = 'micro' | 'slim' | 'medium' | 'large';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface SizeGroupConfig {
  label: string;
  size: ButtonSize;
  buttons: Array<{
    label: string;
    variant: ButtonVariant;
  }>;
}

interface SizeVariationsProps {
  groups?: SizeGroupConfig[];
  gap?: 'tight' | 'loose' | 'extraTight';
}

export function SizeVariationsExample({
  groups = [
    {
      label: 'Micro Buttons',
      size: 'micro',
      buttons: [
        { label: 'Save', variant: 'primary' },
        { label: 'Cancel', variant: 'secondary' },
        { label: 'Help', variant: 'tertiary' }
      ]
    },
    {
      label: 'Slim Buttons',
      size: 'slim',
      buttons: [
        { label: 'Save', variant: 'primary' },
        { label: 'Cancel', variant: 'secondary' },
        { label: 'Help', variant: 'tertiary' }
      ]
    },
    {
      label: 'Medium Buttons (Default)',
      size: 'medium',
      buttons: [
        { label: 'Save', variant: 'primary' },
        { label: 'Cancel', variant: 'secondary' },
        { label: 'Help', variant: 'tertiary' }
      ]
    },
    {
      label: 'Large Buttons',
      size: 'large',
      buttons: [
        { label: 'Save Changes', variant: 'primary' },
        { label: 'Discard', variant: 'secondary' },
        { label: 'Learn More', variant: 'tertiary' }
      ]
    }
  ],
  gap = 'tight'
}: SizeVariationsProps): JSX.Element {
  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Button Size Variations</Text>

        {groups.map((group, index) => (
          <div key={index}>
            <Text as="p" variant="bodySm">{group.label}:</Text>
            <ButtonGroup gap={gap}>
              {group.buttons.map((button, btnIndex) => (
                <Button
                  key={btnIndex}
                  size={group.size === 'medium' ? undefined : group.size}
                  variant={button.variant}
                >
                  {button.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default SizeVariationsExample;`
  },
  'action-groups': {
    react: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

export function ActionGroupsExample() {
  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Common Action Groups</Text>

        <div>
          <Text as="h4" variant="headingSm">Form Actions</Text>
          <Text as="p" variant="bodySm" tone="subdued">Primary and secondary actions</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary">Submit</Button>
            <Button variant="secondary">Save Draft</Button>
            <Button variant="plain">Cancel</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">CRUD Operations</Text>
          <Text as="p" variant="bodySm" tone="subdued">Create, Read, Update, Delete</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary">Create New</Button>
            <Button variant="secondary">Edit</Button>
            <Button variant="secondary">Duplicate</Button>
            <Button variant="critical">Delete</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Export Options</Text>
          <Text as="p" variant="bodySm" tone="subdued">Different export formats</Text>
          <ButtonGroup gap="tight">
            <Button variant="tertiary">Export PDF</Button>
            <Button variant="tertiary">Export Excel</Button>
            <Button variant="tertiary">Export CSV</Button>
            <Button variant="tertiary">Print</Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  );
}

export default ActionGroupsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="action-groups-demo">
  <h3>Common Action Groups</h3>

  <div class="action-section">
    <h4>Form Actions</h4>
    <p class="description">Primary and secondary actions</p>
    <div class="button-group">
      <button class="btn btn-primary">Submit</button>
      <button class="btn btn-secondary">Save Draft</button>
      <button class="btn btn-plain">Cancel</button>
    </div>
  </div>

  <div class="action-section">
    <h4>CRUD Operations</h4>
    <p class="description">Create, Read, Update, Delete</p>
    <div class="button-group">
      <button class="btn btn-primary">Create New</button>
      <button class="btn btn-secondary">Edit</button>
      <button class="btn btn-secondary">Duplicate</button>
      <button class="btn btn-critical">Delete</button>
    </div>
  </div>

  <div class="action-section">
    <h4>Export Options</h4>
    <p class="description">Different export formats</p>
    <div class="button-group">
      <button class="btn btn-tertiary">Export PDF</button>
      <button class="btn btn-tertiary">Export Excel</button>
      <button class="btn btn-tertiary">Export CSV</button>
      <button class="btn btn-tertiary">Print</button>
    </div>
  </div>
</div>

<style>
.action-groups-demo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.action-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.description {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}
.button-group {
  display: flex;
  gap: 8px;
}
.btn {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}
.btn-secondary {
  background: white;
  color: #202223;
}
.btn-tertiary {
  background: transparent;
  color: #0066cc;
  border-color: transparent;
}
.btn-plain {
  background: transparent;
  color: #202223;
  border-color: transparent;
}
.btn-critical {
  background: #d32f2f;
  color: white;
  border-color: #d32f2f;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $$, on } from '@cin7/vanilla-js';

$$('.btn').forEach(btn => {
  on(btn, 'click', (e) => {
    console.log('Action clicked:', btn.textContent);
  });
});
</script>`,

    extjs: `// ExtJS Common Action Groups
Ext.create('Ext.panel.Panel', {
  title: 'Common Action Groups',
  bodyPadding: 16,
  width: 600,
  items: [{
    xtype: 'container',
    html: '<h4>Form Actions</h4><p style="color: #6b7280; margin: 4px 0 8px 0;">Primary and secondary actions</p>'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Submit',
      ui: 'default-toolbar',
      cls: 'primary-action'
    }, {
      xtype: 'button',
      text: 'Save Draft'
    }, {
      xtype: 'button',
      text: 'Cancel',
      ui: 'default-toolbar'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">CRUD Operations</h4><p style="color: #6b7280; margin: 4px 0 8px 0;">Create, Read, Update, Delete</p>',
    margin: '24 0 0 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Create New',
      ui: 'default-toolbar',
      cls: 'primary-action'
    }, {
      xtype: 'button',
      text: 'Edit'
    }, {
      xtype: 'button',
      text: 'Duplicate'
    }, {
      xtype: 'button',
      text: 'Delete',
      cls: 'critical-action',
      handler: function() {
        Ext.Msg.confirm('Confirm', 'Are you sure you want to delete?', function(btn) {
          if (btn === 'yes') {
            console.log('Delete confirmed');
          }
        });
      }
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Export Options</h4><p style="color: #6b7280; margin: 4px 0 8px 0;">Different export formats</p>',
    margin: '24 0 0 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Export PDF',
      iconCls: 'x-fa fa-file-pdf'
    }, {
      xtype: 'button',
      text: 'Export Excel',
      iconCls: 'x-fa fa-file-excel'
    }, {
      xtype: 'button',
      text: 'Export CSV',
      iconCls: 'x-fa fa-file'
    }, {
      xtype: 'button',
      text: 'Print',
      iconCls: 'x-fa fa-print'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

type ActionVariant = 'primary' | 'secondary' | 'tertiary' | 'plain' | 'critical';

interface ActionButton {
  label: string;
  variant: ActionVariant;
  onAction?: () => void;
}

interface ActionGroup {
  title: string;
  description: string;
  actions: ActionButton[];
}

interface ActionGroupsProps {
  groups?: ActionGroup[];
  gap?: 'tight' | 'loose' | 'extraTight';
}

const defaultGroups: ActionGroup[] = [
  {
    title: 'Form Actions',
    description: 'Primary and secondary actions',
    actions: [
      { label: 'Submit', variant: 'primary', onAction: () => console.log('Submit') },
      { label: 'Save Draft', variant: 'secondary', onAction: () => console.log('Save Draft') },
      { label: 'Cancel', variant: 'plain', onAction: () => console.log('Cancel') }
    ]
  },
  {
    title: 'CRUD Operations',
    description: 'Create, Read, Update, Delete',
    actions: [
      { label: 'Create New', variant: 'primary', onAction: () => console.log('Create') },
      { label: 'Edit', variant: 'secondary', onAction: () => console.log('Edit') },
      { label: 'Duplicate', variant: 'secondary', onAction: () => console.log('Duplicate') },
      { label: 'Delete', variant: 'critical', onAction: () => console.log('Delete') }
    ]
  },
  {
    title: 'Export Options',
    description: 'Different export formats',
    actions: [
      { label: 'Export PDF', variant: 'tertiary', onAction: () => console.log('PDF') },
      { label: 'Export Excel', variant: 'tertiary', onAction: () => console.log('Excel') },
      { label: 'Export CSV', variant: 'tertiary', onAction: () => console.log('CSV') },
      { label: 'Print', variant: 'tertiary', onAction: () => console.log('Print') }
    ]
  }
];

export function ActionGroupsExample({
  groups = defaultGroups,
  gap = 'tight'
}: ActionGroupsProps): JSX.Element {
  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Common Action Groups</Text>

        {groups.map((group, index) => (
          <div key={index}>
            <Text as="h4" variant="headingSm">{group.title}</Text>
            <Text as="p" variant="bodySm" tone="subdued">{group.description}</Text>
            <ButtonGroup gap={gap}>
              {group.actions.map((action, actionIndex) => (
                <Button
                  key={actionIndex}
                  variant={action.variant}
                  onClick={action.onAction}
                >
                  {action.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default ActionGroupsExample;`
  },
  'state-variations': {
    react: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React, { useState } from 'react';

export function StateVariationsExample() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAsyncAction = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Button State Variations</Text>

        <div>
          <Text as="h4" variant="headingSm">Normal State</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="tertiary">Tertiary Action</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Loading State</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary" loading>
              Processing...
            </Button>
            <Button variant="secondary" loading>
              Loading...
            </Button>
            <Button variant="tertiary" loading>
              Please wait...
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Disabled State</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="tertiary" disabled>
              Disabled Tertiary
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Interactive Demo</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary" loading={isLoading} onClick={handleAsyncAction}>
              {isLoading ? 'Processing...' : 'Start Process'}
            </Button>
            <Button variant="secondary" disabled={isDisabled} onClick={() => setIsDisabled(!isDisabled)}>
              {isDisabled ? 'Re-enable' : 'Disable'}
            </Button>
            <Button variant="tertiary" onClick={() => {}}>
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  );
}

export default StateVariationsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="state-variations-demo">
  <h3>Button State Variations</h3>

  <div class="state-section">
    <h4>Normal State</h4>
    <div class="button-group">
      <button class="btn btn-primary">Primary Action</button>
      <button class="btn btn-secondary">Secondary Action</button>
      <button class="btn btn-tertiary">Tertiary Action</button>
    </div>
  </div>

  <div class="state-section">
    <h4>Loading State</h4>
    <div class="button-group">
      <button class="btn btn-primary btn-loading">
        <span class="spinner"></span>
        Processing...
      </button>
      <button class="btn btn-secondary btn-loading">
        <span class="spinner"></span>
        Loading...
      </button>
      <button class="btn btn-tertiary btn-loading">
        <span class="spinner"></span>
        Please wait...
      </button>
    </div>
  </div>

  <div class="state-section">
    <h4>Disabled State</h4>
    <div class="button-group">
      <button class="btn btn-primary" disabled>Disabled Primary</button>
      <button class="btn btn-secondary" disabled>Disabled Secondary</button>
      <button class="btn btn-tertiary" disabled>Disabled Tertiary</button>
    </div>
  </div>

  <div class="state-section">
    <h4>Interactive Demo</h4>
    <div class="button-group">
      <button class="btn btn-primary" id="async-btn">Start Process</button>
      <button class="btn btn-secondary" id="toggle-btn">Disable</button>
      <button class="btn btn-tertiary" id="reset-btn">Reset</button>
    </div>
  </div>
</div>

<style>
.state-variations-demo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.state-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.button-group {
  display: flex;
  gap: 8px;
}
.btn {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}
.btn-secondary {
  background: white;
  color: #202223;
}
.btn-tertiary {
  background: transparent;
  color: #0066cc;
  border-color: transparent;
}
.btn-loading {
  cursor: wait;
  opacity: 0.6;
}
.btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
.spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 6px;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

const asyncBtn = $('#async-btn');
const toggleBtn = $('#toggle-btn');
const resetBtn = $('#reset-btn');

let isDisabled = false;

on(asyncBtn, 'click', () => {
  asyncBtn.classList.add('btn-loading');
  asyncBtn.innerHTML = '<span class="spinner"></span>Processing...';

  setTimeout(() => {
    asyncBtn.classList.remove('btn-loading');
    asyncBtn.textContent = 'Start Process';
  }, 2000);
});

on(toggleBtn, 'click', () => {
  isDisabled = !isDisabled;
  toggleBtn.disabled = isDisabled;
  toggleBtn.textContent = isDisabled ? 'Re-enable' : 'Disable';
});

on(resetBtn, 'click', () => {
  console.log('Reset clicked');
});
</script>`,

    extjs: `// ExtJS Button State Variations
Ext.create('Ext.panel.Panel', {
  title: 'Button State Variations',
  bodyPadding: 16,
  width: 600,
  items: [{
    xtype: 'container',
    html: '<h4>Normal State</h4>',
    margin: '0 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Primary Action',
      ui: 'default-toolbar'
    }, {
      xtype: 'button',
      text: 'Secondary Action'
    }, {
      xtype: 'button',
      text: 'Tertiary Action'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Loading State</h4>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0',
      disabled: true
    },
    items: [{
      xtype: 'button',
      text: 'Processing...',
      iconCls: 'x-fa fa-spinner fa-spin'
    }, {
      xtype: 'button',
      text: 'Loading...',
      iconCls: 'x-fa fa-spinner fa-spin'
    }, {
      xtype: 'button',
      text: 'Please wait...',
      iconCls: 'x-fa fa-spinner fa-spin'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Disabled State</h4>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0',
      disabled: true
    },
    items: [{
      xtype: 'button',
      text: 'Disabled Primary'
    }, {
      xtype: 'button',
      text: 'Disabled Secondary'
    }, {
      xtype: 'button',
      text: 'Disabled Tertiary'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Interactive Demo</h4>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: 'hbox',
    defaults: {
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Start Process',
      itemId: 'asyncBtn',
      handler: function(btn) {
        btn.setText('Processing...');
        btn.setDisabled(true);
        btn.setIconCls('x-fa fa-spinner fa-spin');

        Ext.defer(function() {
          btn.setText('Start Process');
          btn.setDisabled(false);
          btn.setIconCls('');
        }, 2000);
      }
    }, {
      xtype: 'button',
      text: 'Disable',
      itemId: 'toggleBtn',
      handler: function(btn) {
        const isDisabled = btn.disabled;
        btn.setDisabled(!isDisabled);
        btn.setText(isDisabled ? 'Re-enable' : 'Disable');
      }
    }, {
      xtype: 'button',
      text: 'Reset',
      handler: function() {
        console.log('Reset clicked');
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React, { useState } from 'react';

interface ButtonState {
  loading?: boolean;
  disabled?: boolean;
  variant: 'primary' | 'secondary' | 'tertiary';
  label: string;
}

interface StateSection {
  title: string;
  buttons: ButtonState[];
}

interface StateVariationsProps {
  onAsyncAction?: () => Promise<void>;
  asyncDelay?: number;
}

export function StateVariationsExample({
  onAsyncAction,
  asyncDelay = 2000
}: StateVariationsProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);

    try {
      if (onAsyncAction) {
        await onAsyncAction();
      } else {
        await new Promise(resolve => setTimeout(resolve, asyncDelay));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsDisabled(prev => !prev);
  };

  const normalStates: ButtonState[] = [
    { variant: 'primary', label: 'Primary Action' },
    { variant: 'secondary', label: 'Secondary Action' },
    { variant: 'tertiary', label: 'Tertiary Action' }
  ];

  const loadingStates: ButtonState[] = [
    { variant: 'primary', label: 'Processing...', loading: true },
    { variant: 'secondary', label: 'Loading...', loading: true },
    { variant: 'tertiary', label: 'Please wait...', loading: true }
  ];

  const disabledStates: ButtonState[] = [
    { variant: 'primary', label: 'Disabled Primary', disabled: true },
    { variant: 'secondary', label: 'Disabled Secondary', disabled: true },
    { variant: 'tertiary', label: 'Disabled Tertiary', disabled: true }
  ];

  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Button State Variations</Text>

        <div>
          <Text as="h4" variant="headingSm">Normal State</Text>
          <ButtonGroup gap="tight">
            {normalStates.map((state, index) => (
              <Button key={index} variant={state.variant}>
                {state.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Loading State</Text>
          <ButtonGroup gap="tight">
            {loadingStates.map((state, index) => (
              <Button key={index} variant={state.variant} loading={state.loading}>
                {state.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Disabled State</Text>
          <ButtonGroup gap="tight">
            {disabledStates.map((state, index) => (
              <Button key={index} variant={state.variant} disabled={state.disabled}>
                {state.label}
              </Button>
            ))}
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Interactive Demo</Text>
          <ButtonGroup gap="tight">
            <Button variant="primary" loading={isLoading} onClick={handleAsyncAction}>
              {isLoading ? 'Processing...' : 'Start Process'}
            </Button>
            <Button variant="secondary" disabled={isDisabled} onClick={handleToggle}>
              {isDisabled ? 'Re-enable' : 'Disable'}
            </Button>
            <Button variant="tertiary" onClick={() => console.log('Reset')}>
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  );
}

export default StateVariationsExample;`
  },
  'connected-buttons': {
    react: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

export function ConnectedButtonsExample() {
  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Connected Button Groups</Text>

        <div>
          <Text as="h4" variant="headingSm">Top Connected</Text>
          <ButtonGroup connectedTop gap="tight">
            <Button variant="primary">First</Button>
            <Button variant="primary">Second</Button>
            <Button variant="primary">Third</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Connected Segmented</Text>
          <ButtonGroup segmented gap="tight">
            <Button variant="primary">Option A</Button>
            <Button variant="primary">Option B</Button>
            <Button variant="primary">Option C</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Loose Spacing</Text>
          <ButtonGroup gap="loose">
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Extra Tight Spacing</Text>
          <ButtonGroup gap="extraTight">
            <Button variant="primary">A</Button>
            <Button variant="secondary">B</Button>
            <Button variant="tertiary">C</Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  );
}

export default ConnectedButtonsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="connected-buttons-demo">
  <h3>Connected Button Groups</h3>

  <div class="button-section">
    <h4>Top Connected</h4>
    <div class="button-group button-group-connected-top">
      <button class="btn btn-primary">First</button>
      <button class="btn btn-primary">Second</button>
      <button class="btn btn-primary">Third</button>
    </div>
  </div>

  <div class="button-section">
    <h4>Connected Segmented</h4>
    <div class="button-group button-group-segmented">
      <button class="btn btn-primary">Option A</button>
      <button class="btn btn-primary">Option B</button>
      <button class="btn btn-primary">Option C</button>
    </div>
  </div>

  <div class="button-section">
    <h4>Loose Spacing</h4>
    <div class="button-group button-group-loose">
      <button class="btn btn-primary">Save</button>
      <button class="btn btn-secondary">Cancel</button>
      <button class="btn btn-tertiary">Help</button>
    </div>
  </div>

  <div class="button-section">
    <h4>Extra Tight Spacing</h4>
    <div class="button-group button-group-extra-tight">
      <button class="btn btn-primary">A</button>
      <button class="btn btn-secondary">B</button>
      <button class="btn btn-tertiary">C</button>
    </div>
  </div>
</div>

<style>
.connected-buttons-demo {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.button-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.button-group {
  display: flex;
  gap: 8px;
}
.button-group-connected-top {
  border-top: 2px solid #0066cc;
}
.button-group-segmented {
  display: inline-flex;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
}
.button-group-segmented .btn {
  border-radius: 0;
  border-right: 1px solid #d1d5db;
}
.button-group-segmented .btn:last-child {
  border-right: none;
}
.button-group-loose {
  gap: 16px;
}
.button-group-extra-tight {
  gap: 2px;
}
.btn {
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-primary {
  background: #0066cc;
  color: white;
  border-color: #0066cc;
}
.btn-secondary {
  background: white;
  color: #202223;
}
.btn-tertiary {
  background: transparent;
  color: #0066cc;
  border-color: transparent;
}
</style>`,

    extjs: `// ExtJS Connected Button Groups
Ext.create('Ext.panel.Panel', {
  title: 'Connected Button Groups',
  bodyPadding: 16,
  width: 500,
  items: [{
    xtype: 'container',
    html: '<h4>Top Connected</h4>',
    margin: '0 0 8 0'
  }, {
    xtype: 'toolbar',
    border: false,
    style: 'border-top: 2px solid #0066cc;',
    items: [{
      text: 'First'
    }, {
      text: 'Second'
    }, {
      text: 'Third'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Connected Segmented</h4>',
    margin: '24 0 8 0'
  }, {
    xtype: 'segmentedbutton',
    allowMultiple: false,
    items: [{
      text: 'Option A',
      pressed: true
    }, {
      text: 'Option B'
    }, {
      text: 'Option C'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Loose Spacing</h4>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'start'
    },
    defaults: {
      margin: '0 16 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'Save'
    }, {
      xtype: 'button',
      text: 'Cancel'
    }, {
      xtype: 'button',
      text: 'Help'
    }]
  }, {
    xtype: 'container',
    html: '<h4 style="margin-top: 24px;">Extra Tight Spacing</h4>',
    margin: '24 0 8 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      pack: 'start'
    },
    defaults: {
      margin: '0 2 0 0'
    },
    items: [{
      xtype: 'button',
      text: 'A'
    }, {
      xtype: 'button',
      text: 'B'
    }, {
      xtype: 'button',
      text: 'C'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

type GapSize = 'tight' | 'loose' | 'extraTight';
type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonConfig {
  label: string;
  variant: ButtonVariant;
}

interface ButtonGroupConfig {
  title: string;
  connectedTop?: boolean;
  segmented?: boolean;
  gap?: GapSize;
  buttons: ButtonConfig[];
}

interface ConnectedButtonsProps {
  groups?: ButtonGroupConfig[];
}

const defaultGroups: ButtonGroupConfig[] = [
  {
    title: 'Top Connected',
    connectedTop: true,
    gap: 'tight',
    buttons: [
      { label: 'First', variant: 'primary' },
      { label: 'Second', variant: 'primary' },
      { label: 'Third', variant: 'primary' }
    ]
  },
  {
    title: 'Connected Segmented',
    segmented: true,
    gap: 'tight',
    buttons: [
      { label: 'Option A', variant: 'primary' },
      { label: 'Option B', variant: 'primary' },
      { label: 'Option C', variant: 'primary' }
    ]
  },
  {
    title: 'Loose Spacing',
    gap: 'loose',
    buttons: [
      { label: 'Save', variant: 'primary' },
      { label: 'Cancel', variant: 'secondary' },
      { label: 'Help', variant: 'tertiary' }
    ]
  },
  {
    title: 'Extra Tight Spacing',
    gap: 'extraTight',
    buttons: [
      { label: 'A', variant: 'primary' },
      { label: 'B', variant: 'secondary' },
      { label: 'C', variant: 'tertiary' }
    ]
  }
];

export function ConnectedButtonsExample({
  groups = defaultGroups
}: ConnectedButtonsProps): JSX.Element {
  return (
    <Card>
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Connected Button Groups</Text>

        {groups.map((group, index) => (
          <div key={index}>
            <Text as="h4" variant="headingSm">{group.title}</Text>
            <ButtonGroup
              connectedTop={group.connectedTop}
              segmented={group.segmented}
              gap={group.gap}
            >
              {group.buttons.map((button, btnIndex) => (
                <Button key={btnIndex} variant={button.variant}>
                  {button.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default ConnectedButtonsExample;`
  }
};

// Image Component Examples
export const imageExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Image } from '@shopify/polaris';
import React from 'react';

function ImageExample() {
  return (
    <Image
      source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
      alt="Mountain landscape with lake"
      width="400px"
      height="300px"
    />
  );
}

export default ImageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="image-container">
  <img
    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    alt="Mountain landscape with lake"
    class="polaris-image"
    width="400"
    height="300"
    loading="lazy"
  />
</div>

<style>
.image-container {
  display: inline-block;
  position: relative;
}

.polaris-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius-base);
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js for lazy loading
import { createImage } from '@cin7/vanilla-js';

const image = createImage({
  src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  alt: 'Mountain landscape with lake',
  width: 400,
  height: 300,
  lazy: true,
  onLoad: () => {
    console.log('Image loaded successfully');
  },
  onError: () => {
    console.error('Image failed to load');
  }
});

document.getElementById('app').appendChild(image);
</script>`,

    extjs: `// ExtJS Image Component
Ext.create('Ext.Img', {
  src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  alt: 'Mountain landscape with lake',
  width: 400,
  height: 300,
  renderTo: Ext.getBody(),
  listeners: {
    load: function() {
      console.log('Image loaded successfully');
    },
    error: function() {
      console.error('Image failed to load');
    }
  }
});

// Or using Polaris adapter with responsive srcset
import { PolarisImage } from '@cin7/extjs-adapters';

const image = Ext.create('PolarisImage', {
  src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  alt: 'Mountain landscape with lake',
  width: 400,
  height: 300,
  aspectRatio: '4/3',
  border: 'rounded',
  srcSet: [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop 400w',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop 800w',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=900&fit=crop 1200w'
  ].join(', '),
  sizes: '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px'
});`,

    typescript: `import { Image, ImageProps } from '@shopify/polaris';
import React, { useState } from 'react';

interface ImageExampleProps {
  source: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/2' | '2/1';
  border?: 'none' | 'base' | 'rounded' | 'large' | 'full';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

function ImageExample({
  source,
  alt,
  width = '400px',
  height = '300px',
  aspectRatio,
  border = 'rounded',
  loading = 'lazy',
  onLoad,
  onError
}: ImageExampleProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className="image-wrapper">
      <Image
        source={source}
        alt={alt}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        border={border}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
      {hasError && (
        <div className="image-error">Failed to load image</div>
      )}
    </div>
  );
}

export default ImageExample;`
  }
};

// Breadcrumbs Component Examples
export const breadcrumbsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';

function BreadcrumbsExample() {
  return (
    <Breadcrumbs
      breadcrumbs={[
        { content: 'Products', url: '/products' },
        { content: 'Inventory', url: '/products/inventory' },
      ]}
    />
  );
}

export default BreadcrumbsExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs-list">
    <li class="breadcrumbs-item">
      <a href="/products" class="breadcrumbs-link">Products</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/products/inventory" class="breadcrumbs-link">Inventory</a>
    </li>
  </ol>
</nav>

<style>
.breadcrumbs-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
}

.breadcrumbs-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--font-size-sm);
}

.breadcrumbs-link:hover {
  text-decoration: underline;
}

.breadcrumbs-separator {
  margin: 0 8px;
  color: var(--color-text-subdued);
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createBreadcrumbs } from '@cin7/vanilla-js';

const breadcrumbs = createBreadcrumbs({
  items: [
    { text: 'Products', url: '/products' },
    { text: 'Inventory', url: '/products/inventory' }
  ],
  onClick: (item) => {
    console.log('Navigating to:', item.url);
  }
});

document.getElementById('app').appendChild(breadcrumbs);
</script>`,

    extjs: `// ExtJS Breadcrumb using Toolbar
Ext.create('Ext.toolbar.Toolbar', {
  cls: 'breadcrumb-toolbar',
  items: [
    {
      xtype: 'button',
      text: 'Products',
      iconCls: 'icon-chevron-right',
      iconAlign: 'right',
      handler: function() {
        window.location.href = '/products';
      }
    },
    {
      xtype: 'button',
      text: 'Inventory',
      handler: function() {
        window.location.href = '/products/inventory';
      }
    }
  ],
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisBreadcrumbs } from '@cin7/extjs-adapters';

const breadcrumbs = Ext.create('PolarisBreadcrumbs', {
  breadcrumbs: [
    { content: 'Products', url: '/products' },
    { content: 'Inventory', url: '/products/inventory' }
  ],
  onAction: function(url) {
    window.location.href = url;
  }
});`,

    typescript: `import { Breadcrumbs, BreadcrumbsProps } from '@shopify/polaris';
import React from 'react';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  content: string;
  url: string;
  onAction?: () => void;
}

interface BreadcrumbsExampleProps {
  items: BreadcrumbItem[];
  onNavigate?: (url: string) => void;
}

function BreadcrumbsExample({
  items,
  onNavigate
}: BreadcrumbsExampleProps): JSX.Element {
  const router = useRouter();

  const handleBreadcrumbClick = (url: string, customAction?: () => void) => {
    if (customAction) {
      customAction();
    } else if (onNavigate) {
      onNavigate(url);
    } else {
      router.push(url);
    }
  };

  const breadcrumbs = items.map(item => ({
    content: item.content,
    url: item.url,
    onAction: item.onAction || (() => handleBreadcrumbClick(item.url, item.onAction))
  }));

  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
}

export default BreadcrumbsExample;`
  }
};

// Popover Component Examples
export const popoverExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Popover, Button, ActionList } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function PopoverExample() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((active) => !active),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      More actions
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      autofocusTarget="first-node"
      onClose={togglePopoverActive}
    >
      <ActionList
        items={[
          { content: 'Import', onAction: () => console.log('Import') },
          { content: 'Export', onAction: () => console.log('Export') },
        ]}
      />
    </Popover>
  );
}

export default PopoverExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="popover-activator" id="popoverActivator">
    More actions ▼
  </button>
  <div class="popover-content" id="popoverContent" style="display: none;">
    <button class="action-item">Import</button>
    <button class="action-item">Export</button>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 200px; background: white;
  border: 1px solid #ccc; border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 8px;
}
.action-item {
  display: block; width: 100%; padding: 8px 12px;
  border: none; background: transparent; text-align: left;
  cursor: pointer; border-radius: 4px;
}
.action-item:hover { background: #f5f5f5; }
</style>

<script>
const activator = document.getElementById('popoverActivator');
const content = document.getElementById('popoverContent');

activator.addEventListener('click', () => {
  content.style.display = content.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', (e) => {
  if (!activator.contains(e.target) && !content.contains(e.target)) {
    content.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Menu
Ext.create('Ext.button.Button', {
  text: 'More actions',
  menu: {
    items: [
      { text: 'Import', handler: () => console.log('Import') },
      { text: 'Export', handler: () => console.log('Export') }
    ]
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PopoverExampleProps {
  activatorLabel?: string;
  actions?: ActionListItemDescriptor[];
}

function PopoverExample({
  activatorLabel = 'More actions',
  actions = [
    { content: 'Import' },
    { content: 'Export' },
  ]
}: PopoverExampleProps): JSX.Element {
  const [active, setActive] = useState(false);
  const toggle = useCallback(() => setActive((a) => !a), []);

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggle} disclosure>{activatorLabel}</Button>}
      onClose={toggle}
    >
      <ActionList items={actions} />
    </Popover>
  );
}

export default PopoverExample;`
  }
};

// Tooltip Component Examples
export const tooltipExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Tooltip, Button } from '@shopify/polaris';
import React from 'react';

function TooltipExample() {
  return (
    <Tooltip content="This is a helpful tooltip">
      <Button>Hover me</Button>
    </Tooltip>
  );
}

export default TooltipExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="tooltip-wrapper">
  <button id="tooltipTrigger">Hover me</button>
  <div class="tooltip" id="tooltip" style="display: none;">
    This is a helpful tooltip
  </div>
</div>

<style>
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute; bottom: 100%; left: 50%;
  transform: translateX(-50%); margin-bottom: 8px;
  padding: 8px 12px; background: #333; color: white;
  font-size: 14px; border-radius: 4px; white-space: nowrap;
  pointer-events: none; z-index: 1000;
}
.tooltip::after {
  content: ''; position: absolute; top: 100%; left: 50%;
  transform: translateX(-50%); border: 4px solid transparent;
  border-top-color: #333;
}
</style>

<script>
const trigger = document.getElementById('tooltipTrigger');
const tooltip = document.getElementById('tooltip');

trigger.addEventListener('mouseenter', () => {
  tooltip.style.display = 'block';
});

trigger.addEventListener('mouseleave', () => {
  tooltip.style.display = 'none';
});
</script>`,

    extjs: `// ExtJS Tooltip
Ext.create('Ext.button.Button', {
  text: 'Hover me',
  tooltip: 'This is a helpful tooltip',
  renderTo: Ext.getBody()
});

// Custom tooltip
Ext.create('Ext.button.Button', {
  text: 'Hover me',
  renderTo: Ext.getBody(),
  listeners: {
    render: function(btn) {
      Ext.create('Ext.tip.ToolTip', {
        target: btn.el,
        html: 'This is a helpful tooltip'
      });
    }
  }
});`,

    typescript: `import { Tooltip, Button } from '@shopify/polaris';
import React from 'react';

interface TooltipExampleProps {
  content: string;
  children?: React.ReactNode;
  preferredPosition?: 'above' | 'below' | 'mostSpace';
}

function TooltipExample({
  content,
  children = <Button>Hover me</Button>,
  preferredPosition = 'above'
}: TooltipExampleProps): JSX.Element {
  return (
    <Tooltip content={content} preferredPosition={preferredPosition}>
      {children}
    </Tooltip>
  );
}

export default TooltipExample;`
  }
};

// Sheet Component Examples
export const sheetExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Sheet, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function SheetExample() {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  return (
    <>
      <Button onClick={toggle}>Open sheet</Button>
      <Sheet open={open} onClose={toggle} accessibilityLabel="Filter products">
        <div style={{ padding: '20px' }}>
          <Text as="h2" variant="headingMd">Sheet content</Text>
          <Text as="p">Slide-in panel for forms, filters, or other content.</Text>
        </div>
      </Sheet>
    </>
  );
}

export default SheetExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="openSheet">Open sheet</button>
<div class="sheet-backdrop" id="backdrop" style="display: none;"></div>
<div class="sheet" id="sheet" style="display: none;">
  <div class="sheet-header">
    <h2>Sheet content</h2>
    <button id="closeSheet">×</button>
  </div>
  <div class="sheet-body">
    <p>Slide-in panel for forms, filters, or other content.</p>
  </div>
</div>

<style>
.sheet-backdrop {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); z-index: 999;
}
.sheet {
  position: fixed; top: 0; right: 0; bottom: 0; width: 400px;
  background: white; box-shadow: -2px 0 8px rgba(0,0,0,0.2);
  z-index: 1000; animation: slideIn 0.3s;
}
.sheet-header {
  display: flex; justify-content: space-between;
  padding: 16px; border-bottom: 1px solid #ccc;
}
.sheet-body { padding: 20px; overflow-y: auto; }
@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
</style>

<script>
const openBtn = document.getElementById('openSheet');
const closeBtn = document.getElementById('closeSheet');
const sheet = document.getElementById('sheet');
const backdrop = document.getElementById('backdrop');

function open() {
  sheet.style.display = 'block';
  backdrop.style.display = 'block';
}

function close() {
  sheet.style.display = 'none';
  backdrop.style.display = 'none';
}

openBtn.addEventListener('click', open);
closeBtn.addEventListener('click', close);
backdrop.addEventListener('click', close);
</script>`,

    extjs: `// ExtJS Sliding Panel
const sheet = Ext.create('Ext.panel.Panel', {
  title: 'Sheet content',
  floating: true,
  closable: true,
  width: 400,
  height: '100%',
  bodyPadding: 20,
  html: 'Slide-in panel for forms, filters, or other content.',
  x: Ext.Element.getViewportWidth(),
  y: 0,
  listeners: {
    beforeshow: function(panel) {
      panel.animate({
        duration: 300,
        to: { x: Ext.Element.getViewportWidth() - 400 }
      });
    }
  }
});

Ext.create('Ext.button.Button', {
  text: 'Open sheet',
  handler: () => sheet.show(),
  renderTo: Ext.getBody()
});`,

    typescript: `import { Sheet, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface SheetExampleProps {
  title?: string;
  children?: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

function SheetExample({
  title = 'Sheet content',
  children,
  onOpen,
  onClose
}: SheetExampleProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    const newState = !open;
    setOpen(newState);
    if (newState && onOpen) onOpen();
    if (!newState && onClose) onClose();
  }, [open, onOpen, onClose]);

  return (
    <>
      <Button onClick={toggle}>Open sheet</Button>
      <Sheet open={open} onClose={toggle} accessibilityLabel="Sheet panel">
        <div style={{ padding: '20px' }}>
          <Text as="h2" variant="headingMd">{title}</Text>
          {children || <Text as="p">Slide-in panel for forms, filters, or other content.</Text>}
        </div>
      </Sheet>
    </>
  );
}

export default SheetExample;`
  }
};

// Utility function to get code variants
export function getCodeVariants(
  componentName: string,
  exampleName: string
): CodeVariant | null {
  const examples: Record<string, Record<string, CodeVariant>> = {
    button: buttonExamples,
    buttongroup: buttonGroupExamples,
    card: cardExamples,
    textfield: textFieldExamples,
    modal: modalExamples,
    banner: bannerExamples,
    actionlist: actionList,
    bulkactions: bulkActionsExamples,
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
    checkboxgroup: checkboxGroupExamples,
    radiobutton: radioButtonExamples,
    autocomplete: autocompleteExamples,
    choicelist: choiceListExamples,
    colorpicker: colorPickerExamples,
    combobox: comboboxExamples,
    datepicker: datePickerExamples,
    formlayout: formLayoutExamples,
    rangeslider: rangeSliderExamples,
    avatar: avatarExamples,
    mediacard: mediacardExamples,
    thumbnail: thumbnailExamples,
    videothumbnail: videothumbnailExamples,
    calloutcard: calloutcardExamples,
    emptystate: emptystateExamples,
    loading: loadingExamples,
    datatable: dataTableExamples,
    descriptionlist: descriptionListExamples,
    exceptionlist: exceptionListExamples,
    indextable: indexTableExamples,
    list: listExamples,
    resourceitem: resourceItemExamples,
    resourcelist: resourceListExamples,
    alphastack: alphastackExamples,
    bleed: bleedExamples,
    box: boxExamples,
    grid: gridExamples,
    inlinestack: inlinestackExamples,
    verticalstack: verticalstackExamples,
    fullscreenbar: fullscreenbarExamples,
    contextualsavebar: contextualsavebarExamples,
    divider: dividerExamples,
    dropzone: dropzoneExamples,
    keyboardkey: keyboardkeyExamples,
    keypresslistener: keypressListenerExamples,
    text: textExamples,
    actionmenu: actionMenuExamples,
    image: imageExamples,
    breadcrumbs: breadcrumbsExamples,
    popover: popoverExamples,
    tooltip: tooltipExamples,
    sheet: sheetExamples,
    filters: filtersExamples,
    collapsible: collapsibleExamples,
    footerhelp: footerHelpExamples,
    frame: frameExamples,
    scrollable: scrollableExamples,
    textcontainer: textContainerExamples,
    appprovider: appProviderExamples,
    indexfilters: indexFiltersExamples,
    pageactions: pageActionsExamples,
    optionlist: optionListExamples,
    linechart: lineChartExamples,
    barchart: barChartExamples,
    piechart: pieChartExamples,
    formpanel: formPanelExamples,
    coreutilities: coreUtilitiesExamples,
    ecommercecomponents: ecommerceComponentsExamples,
    usecase: useCaseExamples,
    repository: repositoryExamples,
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
