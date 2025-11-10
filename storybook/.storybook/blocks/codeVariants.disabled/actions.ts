import type { CodeVariant } from './types';

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

export default ButtonExample;`,
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
  },

  variants: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function ButtonVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="plain">Plain</Button>
        <Button variant="plainMono">Plain Mono</Button>
        <Button variant="critical">Critical</Button>
      </div>
    </div>
  );
}`,
    extjs: `// ExtJS Button Variants using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'start'
  },
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      defaults: { margin: '0 8 0 0' },
      items: [
        {
          xtype: 'button',
          text: 'Primary',
          ui: 'primary',
          handler: function() {
            console.log('Primary clicked');
          }
        },
        {
          xtype: 'button',
          text: 'Secondary',
          ui: 'secondary',
          handler: function() {
            console.log('Secondary clicked');
          }
        },
        {
          xtype: 'button',
          text: 'Tertiary',
          ui: 'tertiary',
          handler: function() {
            console.log('Tertiary clicked');
          }
        }
      ]
    },
    {
      xtype: 'container',
      layout: 'hbox',
      margin: '12 0 0 0',
      defaults: { margin: '0 8 0 0' },
      items: [
        {
          xtype: 'button',
          text: 'Plain',
          ui: 'plain',
          handler: function() {
            console.log('Plain clicked');
          }
        },
        {
          xtype: 'button',
          text: 'Plain Mono',
          ui: 'plain-mono',
          handler: function() {
            console.log('Plain Mono clicked');
          }
        },
        {
          xtype: 'button',
          text: 'Critical',
          ui: 'danger',
          handler: function() {
            console.log('Critical clicked');
          }
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,
    vanilla: `<!-- Button Variants using @cin7/vanilla-js -->
<div class="button-variants">
  <div class="button-group">
    <button class="polaris-button polaris-button--primary" data-variant="primary">Primary</button>
    <button class="polaris-button polaris-button--secondary" data-variant="secondary">Secondary</button>
    <button class="polaris-button polaris-button--tertiary" data-variant="tertiary">Tertiary</button>
  </div>
  <div class="button-group">
    <button class="polaris-button polaris-button--plain" data-variant="plain">Plain</button>
    <button class="polaris-button polaris-button--plain-mono" data-variant="plain-mono">Plain Mono</button>
    <button class="polaris-button polaris-button--critical" data-variant="critical">Critical</button>
  </div>
</div>

<style>
  .button-variants { display: flex; flex-direction: column; gap: 12px; }
  .button-group { display: flex; gap: 8px; }
  .polaris-button {
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .polaris-button--primary { background: #006fbb; color: white; border: 1px solid #006fbb; }
  .polaris-button--secondary { background: #ffffff; color: #202223; border: 1px solid #c9cccf; }
  .polaris-button--tertiary { background: transparent; color: #202223; border: 1px solid transparent; }
  .polaris-button--plain { background: transparent; color: #005bd3; border: none; }
  .polaris-button--plain-mono { background: transparent; color: #202223; border: none; }
  .polaris-button--critical { background: #d82c0d; color: white; border: 1px solid #d82c0d; }
</style>

<script>
import { on } from '@cin7/vanilla-js';

// Add click handlers to all buttons
document.querySelectorAll('.polaris-button').forEach(button => {
  on(button, 'click', () => {
    const variant = button.getAttribute('data-variant');
    console.log(\`\${variant} button clicked\`);
  });
});
</script>`,
    typescript: `import {Button, ButtonProps} from '@shopify/polaris';
import React from 'react';

interface ButtonVariantsProps {
  onVariantClick?: (variant: ButtonProps['variant']) => void;
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'plain' | 'plainMono' | 'critical';

function ButtonVariants({
  onVariantClick
}: ButtonVariantsProps): JSX.Element {
  const handleClick = (variant: ButtonVariant) => {
    console.log(\`\${variant} button clicked\`);
    onVariantClick?.(variant);
  };

  const primaryVariants: ButtonVariant[] = ['primary', 'secondary', 'tertiary'];
  const secondaryVariants: ButtonVariant[] = ['plain', 'plainMono', 'critical'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        {primaryVariants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            onClick={() => handleClick(variant)}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {secondaryVariants.map((variant) => (
          <Button
            key={variant}
            variant={variant}
            onClick={() => handleClick(variant)}
          >
            {variant === 'plainMono' ? 'Plain Mono' : variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ButtonVariants;`
  },

  sizes: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function ButtonSizes() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button size="micro">Micro</Button>
      <Button size="slim">Slim</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  );
}`,
    extjs: `// ExtJS Button Sizes using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  defaults: { margin: '0 12 0 0' },
  items: [
    {
      xtype: 'button',
      text: 'Micro',
      scale: 'micro',
      height: 24,
      padding: '2 8',
      handler: function() {
        console.log('Micro button clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Slim',
      scale: 'small',
      height: 28,
      padding: '4 12',
      handler: function() {
        console.log('Slim button clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Medium',
      scale: 'medium',
      height: 36,
      padding: '8 16',
      handler: function() {
        console.log('Medium button clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Large',
      scale: 'large',
      height: 48,
      padding: '12 24',
      handler: function() {
        console.log('Large button clicked');
      }
    }
  ],
  renderTo: Ext.getBody()
});`,
    vanilla: `<!-- Button Sizes using @cin7/vanilla-js -->
<div class="button-sizes" style="display: flex; align-items: center; gap: 12px;">
  <button class="polaris-button polaris-button--micro" data-size="micro">Micro</button>
  <button class="polaris-button polaris-button--slim" data-size="slim">Slim</button>
  <button class="polaris-button polaris-button--medium" data-size="medium">Medium</button>
  <button class="polaris-button polaris-button--large" data-size="large">Large</button>
</div>

<style>
  .polaris-button {
    background: #006fbb;
    color: white;
    border: 1px solid #006fbb;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .polaris-button--micro { padding: 2px 8px; font-size: 12px; }
  .polaris-button--slim { padding: 4px 12px; font-size: 13px; }
  .polaris-button--medium { padding: 8px 16px; font-size: 14px; }
  .polaris-button--large { padding: 12px 24px; font-size: 16px; }
  .polaris-button:hover { background: #005094; }
</style>

<script>
import { on } from '@cin7/vanilla-js';

// Add click handlers for each size
document.querySelectorAll('.button-sizes .polaris-button').forEach(button => {
  on(button, 'click', () => {
    const size = button.getAttribute('data-size');
    console.log(\`\${size} button clicked\`);
  });
});
</script>`,
    typescript: `import {Button, ButtonProps} from '@shopify/polaris';
import React from 'react';

interface ButtonSizesProps {
  onSizeClick?: (size: ButtonProps['size']) => void;
  variant?: ButtonProps['variant'];
}

type ButtonSize = 'micro' | 'slim' | 'medium' | 'large';

const buttonSizes: ButtonSize[] = ['micro', 'slim', 'medium', 'large'];

function ButtonSizes({
  onSizeClick,
  variant = 'primary'
}: ButtonSizesProps): JSX.Element {
  const handleClick = (size: ButtonSize) => {
    console.log(\`\${size} button clicked\`);
    onSizeClick?.(size);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {buttonSizes.map((size) => (
        <Button
          key={size}
          size={size}
          variant={variant}
          onClick={() => handleClick(size)}
        >
          {size.charAt(0).toUpperCase() + size.slice(1)}
        </Button>
      ))}
    </div>
  );
}

export default ButtonSizes;`
  },

  states: {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function ButtonStates() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  );
}`,
    extjs: `// ExtJS Button States using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: 'hbox',
  defaults: { margin: '0 12 0 0' },
  items: [
    {
      xtype: 'button',
      text: 'Normal',
      handler: function() {
        console.log('Normal button clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Disabled',
      disabled: true,
      handler: function() {
        // This won't fire when disabled
        console.log('Disabled button clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Saving...',
      iconCls: 'loading-spinner',
      disabled: true,
      listeners: {
        afterrender: function(btn) {
          // Simulate loading state with spinner
          var loadingMask = new Ext.LoadMask({
            target: btn.el,
            msg: 'Loading...'
          });
          loadingMask.show();

          // Simulate async operation
          setTimeout(function() {
            loadingMask.hide();
            btn.setText('Saved!');
            btn.setDisabled(false);
          }, 3000);
        }
      }
    }
  ],
  renderTo: Ext.getBody()
});`,
    vanilla: `<!-- Button States using @cin7/vanilla-js -->
<div class="button-states" style="display: flex; gap: 12px;">
  <button class="polaris-button polaris-button--normal" data-state="normal">Normal</button>
  <button class="polaris-button polaris-button--disabled" data-state="disabled" disabled>Disabled</button>
  <button class="polaris-button polaris-button--loading" data-state="loading" disabled>
    <span class="spinner"></span>
    <span>Loading</span>
  </button>
</div>

<style>
  .polaris-button {
    background: #006fbb;
    color: white;
    border: 1px solid #006fbb;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .polaris-button--normal:hover { background: #005094; }
  .polaris-button--disabled,
  .polaris-button--loading {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .spinner {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>

<script>
import { on } from '@cin7/vanilla-js';

// Normal button click handler
const normalButton = document.querySelector('[data-state="normal"]');
on(normalButton, 'click', () => {
  console.log('Normal button clicked');
});

// Disabled button (no handler needed, won't fire)
// Loading button (no handler needed, disabled during loading)
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface ButtonStatesProps {
  normalLabel?: string;
  disabledLabel?: string;
  loadingLabel?: string;
  onNormalClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

function ButtonStates({
  normalLabel = 'Normal',
  disabledLabel = 'Disabled',
  loadingLabel = 'Loading',
  onNormalClick,
  variant = 'primary'
}: ButtonStatesProps): JSX.Element {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleNormalClick = useCallback(() => {
    console.log('Normal button clicked');
    onNormalClick?.();
  }, [onNormalClick]);

  const handleLoadingDemo = useCallback(() => {
    setIsProcessing(true);
    console.log('Loading state started');

    // Simulate async operation
    setTimeout(() => {
      setIsProcessing(false);
      console.log('Loading state completed');
    }, 2000);
  }, []);

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button
        variant={variant}
        onClick={handleNormalClick}
      >
        {normalLabel}
      </Button>

      <Button
        variant={variant}
        disabled
      >
        {disabledLabel}
      </Button>

      <Button
        variant={variant}
        loading={isProcessing}
        onClick={handleLoadingDemo}
      >
        {isProcessing ? 'Processing...' : loadingLabel}
      </Button>
    </div>
  );
}

export default ButtonStates;`
  }
};

// Modal Component Examples

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
  },

  withPageActions: {
    react: `import { Button, Card, Text, InlineStack, ButtonGroup } from '@shopify/polaris';
import { EditIcon, DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

function BulkActionsWithPageActions() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleBulkAction = (action: string) => {
    console.log(\`Action "\${action}" performed on:\`, selectedItems);
  };

  const pageActions = [
    {
      content: 'Add products',
      onAction: () => handleBulkAction('add'),
      icon: PlusIcon,
    },
    {
      content: 'Import products',
      onAction: () => handleBulkAction('import'),
    },
  ];

  const promotedActions = [
    {
      content: 'Edit selected',
      onAction: () => handleBulkAction('edit'),
      icon: EditIcon,
    },
    {
      content: 'Delete selected',
      onAction: () => handleBulkAction('delete'),
      icon: DeleteIcon,
      destructive: true,
    },
  ];

  return (
    <Card>
      <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
        <InlineStack align="space-between">
          <Text variant="headingMd">Products</Text>
          <InlineStack gap="200">
            {pageActions.map((action, idx) => (
              <Button key={idx} onClick={action.onAction} icon={action.icon}>
                {action.content}
              </Button>
            ))}
          </InlineStack>
        </InlineStack>
      </div>

      {selectedItems.length > 0 && (
        <div style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
          <Text>{selectedItems.length} items selected</Text>
          <div style={{ marginTop: '12px' }}>
            <ButtonGroup>
              {promotedActions.map((action, idx) => (
                <Button
                  key={idx}
                  onClick={action.onAction}
                  icon={action.icon}
                  tone={action.destructive ? 'critical' : undefined}
                >
                  {action.content}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>
      )}
    </Card>
  );
}`,

    vanilla: `<!-- Page-level actions with bulk selection -->
<div class="product-manager">
  <div class="page-header">
    <h2>Products</h2>
    <div class="page-actions">
      <button class="btn-primary" id="add-btn">
        <i class="icon-plus"></i> Add Products
      </button>
      <button class="btn-secondary" id="import-btn">Import Products</button>
    </div>
  </div>

  <div class="bulk-selection-bar" id="bulk-bar" style="display: none;">
    <span id="selection-text">0 items selected</span>
    <div class="bulk-actions">
      <button class="btn-primary" id="bulk-edit-btn">
        <i class="icon-edit"></i> Edit Selected
      </button>
      <button class="btn-destructive" id="bulk-delete-btn">
        <i class="icon-delete"></i> Delete Selected
      </button>
    </div>
  </div>

  <div id="product-grid"></div>
</div>

<script>
import { $, on, show, hide } from '@cin7/vanilla-js';

let selectedItems = [];

function updateBulkBar() {
  const bulkBar = $('#bulk-bar');
  const selectionText = $('#selection-text');

  if (selectedItems.length > 0) {
    show(bulkBar);
    selectionText.textContent = \`\${selectedItems.length} item\${selectedItems.length !== 1 ? 's' : ''} selected\`;
  } else {
    hide(bulkBar);
  }
}

// Page actions
on($('#add-btn'), 'click', () => {
  console.log('Add products');
});

on($('#import-btn'), 'click', () => {
  console.log('Import products');
});

// Bulk actions
on($('#bulk-edit-btn'), 'click', () => {
  console.log('Edit selected:', selectedItems);
});

on($('#bulk-delete-btn'), 'click', () => {
  if (confirm(\`Delete \${selectedItems.length} item(s)?\`)) {
    console.log('Delete selected:', selectedItems);
  }
});

// Simulate selection
function selectItems(ids) {
  selectedItems = ids;
  updateBulkBar();
}
</script>`,

    extjs: `// ExtJS Panel with page actions and bulk selection
Ext.create('Ext.panel.Panel', {
  title: 'Products',
  layout: 'fit',
  tbar: [{
    text: 'Add Products',
    iconCls: 'icon-plus',
    cls: 'polaris-btn-primary',
    handler: function() {
      console.log('Add products');
    }
  }, {
    text: 'Import Products',
    handler: function() {
      console.log('Import products');
    }
  }],
  items: [{
    xtype: 'grid',
    itemId: 'productGrid',
    store: {
      fields: ['id', 'name', 'price'],
      data: [
        { id: 1, name: 'Product A', price: '$29.99' },
        { id: 2, name: 'Product B', price: '$49.99' },
        { id: 3, name: 'Product C', price: '$19.99' }
      ]
    },
    columns: [
      { text: 'Name', dataIndex: 'name', flex: 1 },
      { text: 'Price', dataIndex: 'price', width: 100 }
    ],
    selModel: {
      mode: 'MULTI',
      listeners: {
        selectionchange: function(sm, selected) {
          const panel = this.up('panel');
          let bulkToolbar = panel.down('toolbar[itemId=bulkToolbar]');

          if (selected.length > 0) {
            if (!bulkToolbar) {
              bulkToolbar = Ext.widget('toolbar', {
                itemId: 'bulkToolbar',
                dock: 'top',
                style: {
                  backgroundColor: '#f8f9fa'
                },
                items: [{
                  xtype: 'tbtext',
                  itemId: 'bulkText',
                  text: selected.length + ' item(s) selected'
                }, '->', {
                  text: 'Edit Selected',
                  iconCls: 'icon-edit',
                  handler: function() {
                    const grid = this.up('panel').down('grid');
                    console.log('Edit selected:', grid.getSelection());
                  }
                }, {
                  text: 'Delete Selected',
                  iconCls: 'icon-delete',
                  cls: 'polaris-btn-destructive',
                  handler: function() {
                    const grid = this.up('panel').down('grid');
                    const selected = grid.getSelection();
                    Ext.Msg.confirm('Delete',
                      'Delete ' + selected.length + ' item(s)?',
                      function(btn) {
                        if (btn === 'yes') {
                          console.log('Delete selected:', selected);
                        }
                      }
                    );
                  }
                }]
              });
              panel.addDocked(bulkToolbar);
            } else {
              bulkToolbar.down('#bulkText').setText(selected.length + ' item(s) selected');
              bulkToolbar.show();
            }
          } else if (bulkToolbar) {
            bulkToolbar.hide();
          }
        }
      }
    }
  }],
  height: 400,
  width: 600,
  renderTo: Ext.getBody()
});`,

    typescript: `import { Button, Card, Text, InlineStack } from '@shopify/polaris';
import { EditIcon, DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

interface PageAction {
  content: string;
  onAction: () => void;
  icon?: React.ComponentType;
}

interface BulkAction {
  content: string;
  onAction: () => void;
  icon?: React.ComponentType;
  destructive?: boolean;
}

interface BulkActionsWithPageActionsProps {
  onPageAction?: (action: string) => void;
  onBulkAction?: (action: string, selectedIds: string[]) => void;
}

function BulkActionsWithPageActions({
  onPageAction,
  onBulkAction,
}: BulkActionsWithPageActionsProps): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleBulkAction = (action: string): void => {
    console.log(\`Action "\${action}" performed on:\`, selectedItems);
    onBulkAction?.(action, selectedItems);
  };

  const handlePageAction = (action: string): void => {
    console.log(\`Page action "\${action}"\`);
    onPageAction?.(action);
  };

  const pageActions: PageAction[] = [
    {
      content: 'Add products',
      onAction: () => handlePageAction('add'),
      icon: PlusIcon,
    },
    {
      content: 'Import products',
      onAction: () => handlePageAction('import'),
    },
  ];

  const promotedActions: BulkAction[] = [
    {
      content: 'Edit selected',
      onAction: () => handleBulkAction('edit'),
      icon: EditIcon,
    },
    {
      content: 'Delete selected',
      onAction: () => handleBulkAction('delete'),
      icon: DeleteIcon,
      destructive: true,
    },
  ];

  return (
    <Card>
      <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
        <InlineStack align="space-between">
          <Text variant="headingMd">Products</Text>
          <InlineStack gap="200">
            {pageActions.map((action, idx) => (
              <Button key={idx} onClick={action.onAction} icon={action.icon}>
                {action.content}
              </Button>
            ))}
          </InlineStack>
        </InlineStack>
      </div>

      {selectedItems.length > 0 && (
        <div style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
          <Text>{selectedItems.length} items selected</Text>
          <div style={{ marginTop: '12px' }}>
            <InlineStack gap="200">
              {promotedActions.map((action, idx) => (
                <Button
                  key={idx}
                  onClick={action.onAction}
                  icon={action.icon}
                  tone={action.destructive ? 'critical' : undefined}
                >
                  {action.content}
                </Button>
              ))}
            </InlineStack>
          </div>
        </div>
      )}
    </Card>
  );
}`
  }
};

// Filters Component Examples

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

export default PageActionsExample;`,
  }
};


// LineChart Component Examples

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

export default LinkExample;`,
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

export default ExternalLinkExample;`,
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

export default MonochromeLinkExample;`,
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

export default NoUnderlineLinkExample;`,
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

export default InlineTextLinkExample;`,
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

export default NavigationLinksExample;`,
  },

  footerLinks: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function FooterLinksExample() {
  return (
    <div style={{
      padding: '40px',
      backgroundColor: '#1f2937',
      color: 'white',
      borderRadius: '8px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
        <div>
          <h4 style={{ margin: '0 0 16px 0' }}>Product</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link url="#features" monochrome>Features</Link>
            <Link url="#pricing" monochrome>Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLinksExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="padding: 40px; background-color: #1f2937;">
  <a href="#features" class="polaris-link polaris-link--monochrome">Features</a>
</div>

<script>
import { createLink } from '@cin7/vanilla-js';

const footer = document.createElement('div');
footer.style.backgroundColor = '#1f2937';
const link = createLink({ text: 'Features', url: '#features', monochrome: true });
footer.appendChild(link);
document.getElementById('app').appendChild(footer);
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 40,
  html: '<a href="#features" class="polaris-link polaris-link--monochrome">Features</a>'
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface FooterLinksProps {
  links: Array<{ text: string; url: string }>;
}

function FooterLinksExample({ links }: FooterLinksProps): JSX.Element {
  return (
    <div style={{ padding: '40px', backgroundColor: '#1f2937' }}>
      {links.map((link) => (
        <Link key={link.url} url={link.url} monochrome>{link.text}</Link>
      ))}
    </div>
  );
}

export default FooterLinksExample;`,
  },

  cardActions: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function CardActionsExample() {
  return (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
      <h3>Product Catalog</h3>
      <p>Manage your products and inventory.</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link url="#products">View Products</Link>
        <Link url="#add-product" removeUnderline>+ Add New</Link>
      </div>
    </div>
  );
}

export default CardActionsExample;`,

    vanilla: `<script>
import { createLink } from '@cin7/vanilla-js';

const card = document.createElement('div');
card.style.padding = '20px';

const viewLink = createLink({ text: 'View Products', url: '#products' });
const addLink = createLink({ text: '+ Add New', url: '#add-product', removeUnderline: true });

card.appendChild(viewLink);
card.appendChild(addLink);
document.getElementById('app').appendChild(card);
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Product Catalog',
  html: '<a href="#products" class="polaris-link">View Products</a>'
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface CardActionsProps {
  title: string;
  primaryUrl: string;
  secondaryUrl: string;
}

function CardActionsExample({ title, primaryUrl, secondaryUrl }: CardActionsProps): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      <h3>{title}</h3>
      <Link url={primaryUrl}>View</Link>
      <Link url={secondaryUrl} removeUnderline>Add</Link>
    </div>
  );
}

export default CardActionsExample;`,
  },

  helpDocumentation: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function HelpDocumentationExample() {
  return (
    <div>
      <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Quick Start</h3>
        <Link url="#quick-start">Read Guide →</Link>
      </div>
      <div>
        <Link url="https://api.docs.example.com" external>View API Docs →</Link>
      </div>
    </div>
  );
}

export default HelpDocumentationExample;`,

    vanilla: `<script>
import { createLink } from '@cin7/vanilla-js';

const banner = document.createElement('div');
banner.style.padding = '20px';
const link = createLink({ text: 'Read Guide →', url: '#quick-start' });
banner.appendChild(link);
document.getElementById('app').appendChild(banner);
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  html: '<a href="#quick-start" class="polaris-link">Read Guide →</a>'
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface HelpDocumentationProps {
  quickStartUrl: string;
  apiDocsUrl: string;
}

function HelpDocumentationExample({ quickStartUrl, apiDocsUrl }: HelpDocumentationProps): JSX.Element {
  return (
    <div>
      <Link url={quickStartUrl}>Read Guide →</Link>
      <Link url={apiDocsUrl} external>View API Docs →</Link>
    </div>
  );
}

export default HelpDocumentationExample;`,
  },

  breadcrumbStyle: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function BreadcrumbStyleExample() {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Link url="#home" monochrome>Home</Link>
      <span>›</span>
      <Link url="#products" monochrome>Products</Link>
      <span>›</span>
      <span>Audio Equipment</span>
    </nav>
  );
}

export default BreadcrumbStyleExample;`,

    vanilla: `<nav class="breadcrumb">
  <a href="#home" class="polaris-link polaris-link--monochrome">Home</a>
  <span>›</span>
  <span>Audio Equipment</span>
</nav>

<script>
import { createLink } from '@cin7/vanilla-js';

const nav = document.createElement('nav');
const homeLink = createLink({ text: 'Home', url: '#home', monochrome: true });
nav.appendChild(homeLink);
document.getElementById('app').appendChild(nav);
</script>`,

    extjs: `Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  layout: 'hbox',
  items: [
    { xtype: 'component', html: '<a href="#home" class="polaris-link polaris-link--monochrome">Home</a>' },
    { xtype: 'component', html: '<span>›</span>' }
  ]
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface BreadcrumbItem {
  text: string;
  url?: string;
}

interface BreadcrumbStyleProps {
  items: BreadcrumbItem[];
}

function BreadcrumbStyleExample({ items }: BreadcrumbStyleProps): JSX.Element {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.url ? <Link url={item.url} monochrome>{item.text}</Link> : <span>{item.text}</span>}
          {index < items.length - 1 && <span>›</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default BreadcrumbStyleExample;`,
  },

  tagCloud: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function TagCloudExample() {
  const tags = [
    { name: 'React', count: 45, url: '#react' },
    { name: 'JavaScript', count: 38, url: '#javascript' }
  ];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {tags.map((tag) => (
        <Link key={tag.name} url={tag.url} removeUnderline>
          {tag.name} ({tag.count})
        </Link>
      ))}
    </div>
  );
}

export default TagCloudExample;`,

    vanilla: `<script>
import { createLink } from '@cin7/vanilla-js';

const tags = [
  { name: 'React', count: 45, url: '#react' },
  { name: 'JavaScript', count: 38, url: '#javascript' }
];

const container = document.createElement('div');
tags.forEach(tag => {
  const link = createLink({ text: \`\${tag.name} (\${tag.count})\`, url: tag.url, removeUnderline: true });
  container.appendChild(link);
});
document.getElementById('app').appendChild(container);
</script>`,

    extjs: `Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  html: '<a href="#react" class="polaris-link polaris-link--no-underline">React (45)</a>'
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface Tag {
  name: string;
  count: number;
  url: string;
}

interface TagCloudProps {
  tags: Tag[];
}

function TagCloudExample({ tags }: TagCloudProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {tags.map((tag) => (
        <Link key={tag.name} url={tag.url} removeUnderline>
          {tag.name} ({tag.count})
        </Link>
      ))}
    </div>
  );
}

export default TagCloudExample;`,
  },

  tableOfContents: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function TableOfContentsExample() {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link url="#introduction" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
          1. Introduction
        </Link>
        <div style={{ marginLeft: '20px', marginTop: '8px' }}>
          <Link url="#overview" monochrome>1.1 Overview</Link>
        </div>
      </div>
    </div>
  );
}

export default TableOfContentsExample;`,

    vanilla: `<script>
import { createLink } from '@cin7/vanilla-js';

const toc = document.createElement('div');
const mainLink = createLink({ text: '1. Introduction', url: '#introduction' });
mainLink.style.fontWeight = 'var(--font-weight-semibold)';
toc.appendChild(mainLink);

const sub = document.createElement('div');
sub.style.marginLeft = '20px';
const subLink = createLink({ text: '1.1 Overview', url: '#overview', monochrome: true });
sub.appendChild(subLink);
toc.appendChild(sub);

document.getElementById('app').appendChild(toc);
</script>`,

    extjs: `Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  html: '<a href="#introduction" class="polaris-link" style="font-weight: var(--font-weight-semibold);">1. Introduction</a>'
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface TocSection {
  number: string;
  title: string;
  url: string;
}

interface TableOfContentsProps {
  sections: TocSection[];
}

function TableOfContentsExample({ sections }: TableOfContentsProps): JSX.Element {
  return (
    <div style={{ padding: '20px' }}>
      {sections.map((section) => (
        <div key={section.url}>
          <Link url={section.url} style={{ fontWeight: 'var(--font-weight-semibold)' }}>
            {section.number}. {section.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TableOfContentsExample;`,
  },

  socialLinks: {
    react: `import { Link } from '@shopify/polaris';
import React from 'react';

function SocialLinksExample() {
  return (
    <div>
      <h3>Connect With Us</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link url="https://twitter.com/example" external>𝕏</Link>
        <Link url="https://github.com/example" external>GitHub</Link>
      </div>
    </div>
  );
}

export default SocialLinksExample;`,

    vanilla: `<script>
import { createLink } from '@cin7/vanilla-js';

const container = document.createElement('div');
const twitterLink = createLink({ text: '𝕏', url: 'https://twitter.com/example', external: true });
const githubLink = createLink({ text: 'GitHub', url: 'https://github.com/example', external: true });

container.appendChild(twitterLink);
container.appendChild(githubLink);
document.getElementById('app').appendChild(container);
</script>`,

    extjs: `Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  html: '<a href="https://twitter.com/example" target="_blank">𝕏</a>'
});`,

    typescript: `import { Link } from '@shopify/polaris';
import React from 'react';

interface SocialPlatform {
  name: string;
  url: string;
}

interface SocialLinksProps {
  platforms: SocialPlatform[];
}

function SocialLinksExample({ platforms }: SocialLinksProps): JSX.Element {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      {platforms.map((platform) => (
        <Link key={platform.name} url={platform.url} external>
          {platform.name}
        </Link>
      ))}
    </div>
  );
}

export default SocialLinksExample;`,
  }
};

// BlockStack Component Examples - Layout

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

export default ActionMenuExample;`,
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

export default ButtonGroupExample;`,
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

export default SegmentedButtonGroupExample;`,
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

export default FullWidthButtonGroupExample;`,
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

export default VariantGroupExample;`,
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

export default IconButtonsExample;`,
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

export default SizeVariationsExample;`,
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

export default ActionGroupsExample;`,
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

export default StateVariationsExample;`,
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

export default ConnectedButtonsExample;`,
  }
};

// ActionList Component Examples

export const actionListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import React, { useState } from 'react';
import { ActionList, Button, Popover } from '@shopify/polaris';
import {
  MobileNavigationMajorIcon,
  HomeMajorIcon,
  OrdersMajorIcon,
  ProductsMajorIcon,
  CustomersMajorIcon,
  AnalyticsMajorIcon,
  SettingsMajorIcon,
  LogOutMinorIcon
} from '@shopify/polaris-icons';

export function ActionListExample() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down" icon={MobileNavigationMajorIcon}>
      Navigation menu
    </Button>
  );

  const actions = [
    {
      content: 'Home',
      icon: HomeMajorIcon,
      url: '#',
    },
    {
      content: 'Orders',
      icon: OrdersMajorIcon,
      url: '#',
    },
    {
      content: 'Products',
      icon: ProductsMajorIcon,
      url: '#',
    },
    {
      content: 'Customers',
      icon: CustomersMajorIcon,
      url: '#',
    },
    {
      content: 'Analytics',
      icon: AnalyticsMajorIcon,
      url: '#',
    },
    {
      content: 'Settings',
      icon: SettingsMajorIcon,
      url: '#',
    },
    {
      content: 'Log out',
      icon: LogOutMinorIcon,
      destructive: true,
      onAction: () => console.log('Log out clicked'),
    },
  ];

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList items={actions} />
    </Popover>
  );
}

export default ActionListExample;`,

    vanilla: `<!-- HTML Structure -->
<button id="menu-button" class="polaris-button">
  <span>Navigation menu</span>
  <svg class="polaris-icon" viewBox="0 0 20 20">
    <path d="M6 8l4 4 4-4" stroke="currentColor" fill="none"/>
  </svg>
</button>

<div id="action-menu" class="action-menu" style="display: none;">
  <ul class="action-list">
    <li class="action-item">
      <a href="#" class="action-link">
        <svg class="action-icon" viewBox="0 0 20 20">
          <path d="M10 2v16M2 10h16" stroke="currentColor"/>
        </svg>
        Home
      </a>
    </li>
    <li class="action-item">
      <a href="#" class="action-link">
        <svg class="action-icon" viewBox="0 0 20 20">
          <rect x="3" y="5" width="14" height="10" rx="1" stroke="currentColor" fill="none"/>
        </svg>
        Orders
      </a>
    </li>
    <li class="action-item">
      <a href="#" class="action-link">
        <svg class="action-icon" viewBox="0 0 20 20">
          <path d="M3 7l7-4 7 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke="currentColor" fill="none"/>
        </svg>
        Products
      </a>
    </li>
    <li class="action-item destructive">
      <a href="#" class="action-link">
        <svg class="action-icon" viewBox="0 0 20 20">
          <path d="M3 3l14 14M17 3L3 17" stroke="currentColor"/>
        </svg>
        Log out
      </a>
    </li>
  </ul>
</div>

<script>
// Action menu functionality using @cin7/vanilla-js
import { createToggle } from '@cin7/vanilla-js';

const menuButton = document.getElementById('menu-button');
const actionMenu = document.getElementById('action-menu');

const toggle = createToggle({
  trigger: menuButton,
  target: actionMenu,
  onShow: () => {
    menuButton.setAttribute('aria-expanded', 'true');
    actionMenu.setAttribute('aria-hidden', 'false');
  },
  onHide: () => {
    menuButton.setAttribute('aria-expanded', 'false');
    actionMenu.setAttribute('aria-hidden', 'true');
  }
});

// Handle action item clicks
document.querySelectorAll('.action-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const action = e.currentTarget.textContent.trim();
    console.log(\`Action clicked: \\\${action}\`);

    // Close menu after selection
    toggle.hide();
  });
});
</script>`,

    extjs: `// ExtJS Action Menu using @cin7/extjs-adapters
Ext.define('ActionMenuExample', {
  extend: 'Ext.container.Container',

  initComponent: function() {
    this.items = [{
      xtype: 'button',
      text: 'Navigation menu',
      iconCls: 'x-fa fa-bars',
      menu: {
        xtype: 'menu',
        items: [{
          text: 'Home',
          iconCls: 'x-fa fa-home',
          handler: function() { console.log('Home clicked'); }
        }, {
          text: 'Orders',
          iconCls: 'x-fa fa-shopping-cart',
          handler: function() { console.log('Orders clicked'); }
        }, {
          text: 'Products',
          iconCls: 'x-fa fa-box',
          handler: function() { console.log('Products clicked'); }
        }, {
          text: 'Customers',
          iconCls: 'x-fa fa-users',
          handler: function() { console.log('Customers clicked'); }
        }, {
          text: 'Analytics',
          iconCls: 'x-fa fa-chart-bar',
          handler: function() { console.log('Analytics clicked'); }
        }, '-', {
          text: 'Log out',
          iconCls: 'x-fa fa-sign-out-alt',
          cls: 'destructive-action',
          handler: function() { console.log('Log out clicked'); }
        }]
      }
    }];

    this.callParent();
  }
});

// Or using Polaris adapter
import { PolarisActionList, PolarisPopover } from '@cin7/extjs-adapters';

const actionMenu = Ext.create('PolarisPopover', {
  items: [{
    xtype: 'polaris-actionlist',
    items: [{
      content: 'Home',
      icon: 'HomeMajorIcon',
      url: '#'
    }, {
      content: 'Orders',
      icon: 'OrdersMajorIcon',
      url: '#'
    }, {
      content: 'Products',
      icon: 'ProductsMajorIcon',
      url: '#'
    }, {
      content: 'Log out',
      icon: 'LogOutMinorIcon',
      destructive: true,
      onAction: () => console.log('Log out clicked')
    }]
  }]
});`,

    typescript: `import React, { useState } from 'react';
import { ActionList, Button, Popover, ActionListProps } from '@shopify/polaris';
import { IconProps } from '@shopify/polaris-icons';

interface ActionItem {
  content: string;
  icon?: React.FunctionComponent<IconProps>;
  url?: string;
  onAction?: () => void;
  destructive?: boolean;
  badge?: {
    content: string;
    status?: 'new' | 'success' | 'info' | 'attention' | 'warning' | 'critical';
  };
}

interface ActionListExampleProps {
  actions?: ActionItem[];
  onAction?: (action: ActionItem) => void;
  position?: 'left' | 'center' | 'right';
}

export function ActionListExample({
  actions = defaultActions,
  onAction,
  position = 'left'
}: ActionListExampleProps) {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const handleAction = (action: ActionItem) => {
    if (action.onAction) {
      action.onAction();
    } else if (onAction) {
      onAction(action);
    }

    if (action.url) {
      window.location.href = action.url;
    }

    setPopoverActive(false);
  };

  const activator = (
    <Button
      onClick={togglePopoverActive}
      disclosure="down"
      icon={MobileNavigationMajorIcon}
    >
      Navigation menu
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
      preferredAlignment={position}
    >
      <ActionList
        items={actions.map(action => ({
          ...action,
          onAction: () => handleAction(action)
        }))}
      />
    </Popover>
  );
}

const defaultActions: ActionItem[] = [
  {
    content: 'Home',
    icon: HomeMajorIcon,
    url: '/',
    badge: { content: 'New', status: 'new' }
  },
  {
    content: 'Orders',
    icon: OrdersMajorIcon,
    url: '/orders',
    badge: { content: '3', status: 'attention' }
  },
  {
    content: 'Products',
    icon: ProductsMajorIcon,
    url: '/products'
  },
  {
    content: 'Customers',
    icon: CustomersMajorIcon,
    url: '/customers'
  },
  {
    content: 'Analytics',
    icon: AnalyticsMajorIcon,
    url: '/analytics'
  },
  {
    content: 'Settings',
    icon: SettingsMajorIcon,
    url: '/settings'
  },
  {
    content: 'Log out',
    icon: LogOutMinorIcon,
    destructive: true,
    onAction: () => {
      // Handle logout logic
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
  }
];

export default ActionListExample;`
  },

  segmented: {
    react: `import React, { useState } from 'react';
import { ActionList, Button, Popover, Box } from '@shopify/polaris';
import {
  MobileNavigationMajorIcon,
  ShopMajorIcon,
  ProductsMajorIcon,
  OnlineStoreMajorIcon,
  PointOfSaleMajorIcon
} from '@shopify/polaris-icons';

export function SegmentedActionListExample() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Sales channels
    </Button>
  );

  const sections = [
    {
      title: 'Online sales channels',
      items: [
        {
          content: 'Online Store',
          description: 'Sell on your own website',
          icon: OnlineStoreMajorIcon,
          url: '#',
        },
        {
          content: 'Point of Sale',
          description: 'Sell in person',
          icon: PointOfSaleMajorIcon,
          url: '#',
        },
      ],
    },
    {
      title: 'Marketplaces',
      items: [
        {
          content: 'Shopify Marketplace',
          description: 'Reach new customers',
          icon: ShopMajorIcon,
          url: '#',
        },
        {
          content: 'Other marketplaces',
          description: 'Amazon, eBay, and more',
          icon: ProductsMajorIcon,
          url: '#',
        },
      ],
    },
  ];

  return (
    <Box padding={400}>
      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <ActionList sections={sections} />
      </Popover>
    </Box>
  );
}

export default SegmentedActionListExample;`
  },

  destructive: {
    react: `import React, { useState } from 'react';
import { ActionList, Button, Popover, Banner } from '@shopify/polaris';
import {
  DeleteMajorIcon,
  ArchiveMajorIcon,
  WarningMajorIcon
} from '@shopify/polaris-icons';

export function DestructiveActionListExample() {
  const [popoverActive, setPopoverActive] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down" tone="critical">
      Danger zone
    </Button>
  );

  const actions = [
    {
      content: 'Archive product',
      description: 'Hide from sales channel but keep data',
      icon: ArchiveMajorIcon,
      onAction: () => {
        console.log('Archive clicked');
        setShowWarning(true);
      },
    },
    {
      content: 'Delete product',
      description: 'Permanently remove from store',
      icon: DeleteMajorIcon,
      destructive: true,
      onAction: () => {
        console.log('Delete clicked - confirm required');
        // In real app, show confirmation modal
      },
    },
  ];

  return (
    <div>
      {showWarning && (
        <Banner
          status="warning"
          title="Action completed"
          onDismiss={() => setShowWarning(false)}
        >
          Product has been archived
        </Banner>
      )}

      <Popover
        active={popoverActive}
        activator={activator}
        onClose={togglePopoverActive}
      >
        <ActionList items={actions} />
      </Popover>
    </div>
  );
}

export default DestructiveActionListExample;`
  }
};

// Image Component Examples
