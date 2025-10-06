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

function ButtonGroupDefault() {
  return (
    <ButtonGroup>
      <Button onClick={() => console.log('[Action] Cancel clicked')}>Cancel</Button>
      <Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>
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

function ButtonGroupDefault({ 
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

function ButtonGroupWithSegmentedButtons() {
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

function ButtonGroupSegmented({ 
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

function PressedWithSegmentedButtons() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-button-group button-group--segmented" role="group">
  <button class="polaris-button-segment" aria-pressed="true" data-value="bold">Bold</button>
  <button class="polaris-button-segment" aria-pressed="false" data-value="italic">Italic</button>
  <button class="polaris-button-segment" aria-pressed="false" data-value="underline">Underline</button>
</div>


<script>
const buttons = document.querySelectorAll('.polaris-button-segment');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove pressed state from all buttons
    buttons.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
    // Set pressed state on clicked button
    button.setAttribute('aria-pressed', 'true');
    
    console.log('Active style:', button.dataset.value);
  });
});
</script>`,
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import React, {useState} from 'react';

type TextStyle = 'bold' | 'italic' | 'underline';

interface PressedWithSegmentedButtonsProps {
  defaultStyle?: TextStyle;
  onStyleChange?: (style: TextStyle) => void;
}

function PressedWithSegmentedButtons({ 
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

function PrimaryButton() {
  return <Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Save',
  ui: 'primary',
  handler: function() {
    console.log('Save clicked');
  }
});`,
    vanilla: `<!-- HTML Structure -->
<button class="polaris-button polaris-button--primary">Save</button>

<script>
// JavaScript behavior
document.querySelector('.polaris-button--primary').addEventListener('click', () => {
  console.log('Save clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface PrimaryButtonExampleProps {
  onSave: () => void;
  loading?: boolean;
  disabled?: boolean;
}

function PrimaryButton({ 
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
  'disabled-state': {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return (
    <ButtonGroup>
      <Button disabled>Buy shipping label</Button>
      <Button variant="primary" disabled>
        Buy shipping label
      </Button>
      <Button tone="critical" disabled>
        Buy shipping label
      </Button>
      <span style={{color: '#bf0711'}}>
        <Button variant="monochromePlain" disabled>
          Buy shipping label
        </Button>
      </span>
      <Button variant="plain" disabled>
        Buy shipping label
      </Button>
      <Button variant="plain" tone="critical" disabled>
        Buy shipping label
      </Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'button',
    text: 'Buy shipping label',
    disabled: true,
    margin: '0 5 0 0'
  }, {
    xtype: 'button',
    text: 'Buy shipping label',
    ui: 'primary',
    disabled: true,
    margin: '0 5 0 0'
  }, {
    xtype: 'button',
    text: 'Buy shipping label',
    ui: 'critical',
    disabled: true,
    margin: '0 5 0 0'
  }, {
    xtype: 'button',
    text: 'Buy shipping label',
    ui: 'monochrome-plain',
    disabled: true,
    margin: '0 5 0 0'
  }, {
    xtype: 'button',
    text: 'Buy shipping label',
    ui: 'plain',
    disabled: true,
    margin: '0 5 0 0'
  }, {
    xtype: 'button',
    text: 'Buy shipping label',
    ui: 'plain-critical',
    disabled: true
  }]
});`,
    vanilla: `<div class="polaris-button-group">
  <button class="polaris-button polaris-button--default" disabled>Buy shipping label</button>
  <button class="polaris-button polaris-button--primary" disabled>Buy shipping label</button>
  <button class="polaris-button polaris-button--critical" disabled>Buy shipping label</button>
  <button class="polaris-button polaris-button--monochrome-plain" disabled style="color: #bf0711;">Buy shipping label</button>
  <button class="polaris-button polaris-button--plain" disabled>Buy shipping label</button>
  <button class="polaris-button polaris-button--plain polaris-button--critical" disabled>Buy shipping label</button>
</div>

<script>
// Disabled buttons don't need event handlers, but we can demonstrate state management
const buttons = document.querySelectorAll('.polaris-button[disabled]');
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    // This won't fire due to disabled state, but shows structure
    console.log('Disabled button clicked (this should not happen)');
  });
});
</script>`,
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import React from 'react';

interface DisabledButtonState {
  label: string;
  variant?: 'primary' | 'plain' | 'monochromePlain';
  tone?: 'critical';
  style?: React.CSSProperties;
}

interface DisabledButtonExampleProps {
  buttons?: DisabledButtonState[];
  onButtonClick?: (buttonIndex: number) => void;
}

function Button({
  buttons = [
    { label: 'Buy shipping label' },
    { label: 'Buy shipping label', variant: 'primary' },
    { label: 'Buy shipping label', tone: 'critical' },
    { label: 'Buy shipping label', variant: 'monochromePlain', style: { color: '#bf0711' } },
    { label: 'Buy shipping label', variant: 'plain' },
    { label: 'Buy shipping label', variant: 'plain', tone: 'critical' }
  ],
  onButtonClick
}: DisabledButtonExampleProps): JSX.Element {
  return (
    <ButtonGroup>
      {buttons.map((button, index) => (
        <span key={index} style={button.style}>
          <Button 
            variant={button.variant}
            tone={button.tone}
            disabled
            onClick={() => onButtonClick?.(index)}
          >
            {button.label}
          </Button>
        </span>
      ))}
    </ButtonGroup>
  );
}`
  },
  'full-width': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return <Button fullWidth onClick={() => console.log('[Action] Add customer clicked')}>Add customer</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Add customer',
      handler: function() {
        console.log('[Action] Add customer clicked');
      },
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

function Button({
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

function Button() {
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

function Button({
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
  'large': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
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

function Button({
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
  'loading-state': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
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

function Button({
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

function Button() {
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

function Button({
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
  'plain-disclosure': {
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
  'pressed': {
    react: `import {ButtonGroup, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function PressedButton() {
  const [isFirstButtonActive, setIsFirstButtonActive] = useState(true);

  const handleFirstButtonClick = useCallback(() => {
    if (isFirstButtonActive) return;
    setIsFirstButtonActive(true);
  }, [isFirstButtonActive]);

  const handleSecondButtonClick = useCallback(() => {
    if (!isFirstButtonActive) return;
    setIsFirstButtonActive(false);
  }, [isFirstButtonActive]);

  return (
    <ButtonGroup variant="segmented">
      <Button pressed={isFirstButtonActive} onClick={handleFirstButtonClick}>
        First button
      </Button>
      <Button pressed={!isFirstButtonActive} onClick={handleSecondButtonClick}>
        Second button
      </Button>
    </ButtonGroup>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'button',
    text: 'First button',
    toggleGroup: 'pressed-group',
    pressed: true,
    enableToggle: true,
    allowDepress: false,
    flex: 1,
    margin: '0 1 0 0',
    handler: function(btn) {
      console.log('First button clicked, pressed:', btn.pressed);
    }
  }, {
    xtype: 'button',
    text: 'Second button',
    toggleGroup: 'pressed-group',
    pressed: false,
    enableToggle: true,
    allowDepress: false,
    flex: 1,
    margin: '0 0 0 1',
    handler: function(btn) {
      console.log('Second button clicked, pressed:', btn.pressed);
    }
  }]
});`,
    vanilla: `<div class="polaris-button-group polaris-button-group--segmented">
  <button class="polaris-button polaris-button--pressed" id="first-btn">First button</button>
  <button class="polaris-button" id="second-btn">Second button</button>
</div>

<script>
const firstBtn = document.getElementById('first-btn');
const secondBtn = document.getElementById('second-btn');
let isFirstButtonActive = true;

function updateButtonStates() {
  if (isFirstButtonActive) {
    firstBtn.classList.add('polaris-button--pressed');
    secondBtn.classList.remove('polaris-button--pressed');
  } else {
    firstBtn.classList.remove('polaris-button--pressed');
    secondBtn.classList.add('polaris-button--pressed');
  }
}

firstBtn.addEventListener('click', () => {
  if (isFirstButtonActive) return;
  isFirstButtonActive = true;
  updateButtonStates();
  console.log('First button clicked, pressed:', isFirstButtonActive);
});

secondBtn.addEventListener('click', () => {
  if (!isFirstButtonActive) return;
  isFirstButtonActive = false;
  updateButtonStates();
  console.log('Second button clicked, pressed:', !isFirstButtonActive);
});
</script>`,
    typescript: `import {ButtonGroup, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ButtonOption {
  id: string;
  label: string;
}

interface PressedButtonProps {
  options?: ButtonOption[];
  initialActiveId?: string;
  onSelectionChange?: (activeId: string) => void;
}

function PressedButton({
  options = [
    { id: 'first', label: 'First button' },
    { id: 'second', label: 'Second button' }
  ],
  initialActiveId = 'first',
  onSelectionChange
}: PressedButtonProps): JSX.Element {
  const [activeButtonId, setActiveButtonId] = useState<string>(initialActiveId);

  const handleButtonClick = useCallback((buttonId: string) => {
    if (activeButtonId === buttonId) return;
    setActiveButtonId(buttonId);
    onSelectionChange?.(buttonId);
  }, [activeButtonId, onSelectionChange]);

  return (
    <ButtonGroup variant="segmented">
      {options.map((option) => (
        <Button 
          key={option.id}
          pressed={activeButtonId === option.id} 
          onClick={() => handleButtonClick(option.id)}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}`
  },
  'primary-critical': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return (
    <Button variant="primary" tone="critical">
      View shipping settings
    </Button>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'View shipping settings',
  ui: 'primary-critical',
  style: {
    backgroundColor: '#d72c0d',
    borderColor: '#d72c0d',
    color: 'white'
  },
  handler: function() {
    console.log('View shipping settings clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--primary polaris-button--critical">View shipping settings</button>

<script>
const primaryCriticalButton = document.querySelector('.polaris-button--primary.polaris-button--critical');

primaryCriticalButton.addEventListener('click', () => {
  console.log('View shipping settings clicked');
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

function Button({
  label = 'View shipping settings',
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
  'right-aligned-disclosure': {
    react: `import {Button} from '@shopify/polaris';
import {useState} from 'react';

function RightAlignedDisclosureButton() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{width: '200px'}}>
      <Button
        fullWidth
        textAlign="left"
        disclosure={expanded ? 'up' : 'down'}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show less' : 'Show more'}
      </Button>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  width: 200,
  items: [{
    xtype: 'button',
    text: 'Show more',
    width: '100%',
    textAlign: 'left',
    iconCls: 'arrow-down',
    iconAlign: 'right',
    enableToggle: true,
    handler: function(btn) {
      const isExpanded = btn.pressed;
      btn.setText(isExpanded ? 'Show less' : 'Show more');
      btn.setIconCls(isExpanded ? 'arrow-up' : 'arrow-down');
      console.log(isExpanded ? 'Expanded' : 'Collapsed');
    }
  }]
});`,
    vanilla: `<div style="width: 200px;">
  <button class="polaris-button polaris-button--full-width polaris-button--text-left polaris-button--disclosure" id="right-aligned-disclosure">
    <span class="polaris-button__text">Show more</span>
    <svg class="polaris-button__icon polaris-button__icon--right polaris-button__icon--down" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 14l-4-4h8l-4 4z"/>
    </svg>
  </button>
</div>

<script>
const rightAlignedBtn = document.getElementById('right-aligned-disclosure');
const btnText = rightAlignedBtn.querySelector('.polaris-button__text');
const btnIcon = rightAlignedBtn.querySelector('.polaris-button__icon');
let expanded = false;

rightAlignedBtn.addEventListener('click', () => {
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

interface RightAlignedDisclosureProps {
  width?: string | number;
  expandedText?: string;
  collapsedText?: string;
  onToggle?: (expanded: boolean) => void;
}

function RightAlignedDisclosureButton({
  width = '200px',
  expandedText = 'Show less',
  collapsedText = 'Show more',
  onToggle
}: RightAlignedDisclosureProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);
  }, [expanded, onToggle]);

  return (
    <div style={{width}}>
      <Button
        fullWidth
        textAlign="left"
        disclosure={expanded ? 'up' : 'down'}
        onClick={handleClick}
      >
        {expanded ? expandedText : collapsedText}
      </Button>
    </div>
  );
}`
  },
  'select-disclosure': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return (
    <div style={{height: '100px'}}>
      <Button disclosure="select" onClick={() => console.log('Open Popover')}>
        Select options
      </Button>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Select options',
  iconCls: 'select-arrow',
  iconAlign: 'right',
  arrowCls: 'select-disclosure',
  handler: function() {
    console.log('Open Popover');
    // Simulate popover opening
    Ext.Msg.show({
      title: 'Options Menu',
      msg: 'Select an option...',
      buttons: Ext.Msg.OK
    });
  }
});`,
    vanilla: `<div style="height: 100px;">
  <button class="polaris-button polaris-button--select-disclosure" id="select-disclosure-btn">
    <span class="polaris-button__text">Select options</span>
    <svg class="polaris-button__icon polaris-button__icon--select" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10l3 3 3-3H7z"/>
    </svg>
  </button>
</div>

<script>
const selectDisclosureBtn = document.getElementById('select-disclosure-btn');

selectDisclosureBtn.addEventListener('click', () => {
  console.log('Open Popover');
  // Simulate popover opening
  alert('Options menu would open here');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface SelectDisclosureButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'plain';
}

function Button({
  label = 'Select options',
  onClick,
  disabled = false,
  variant
}: SelectDisclosureButtonProps): JSX.Element {
  const handleClick = () => {
    console.log('Open Popover');
    onClick?.();
  };

  return (
    <div style={{height: '100px'}}>
      <Button 
        disclosure="select" 
        onClick={handleClick}
        disabled={disabled}
        variant={variant}
      >
        {label}
      </Button>
    </div>
  );
}`
  },
  'split': {
    react: `import {
  ActionList,
  InlineStack,
  Button,
  ButtonGroup,
  Popover,
} from '@shopify/polaris';
import React from 'react';
import {ChevronDownIcon} from '@shopify/polaris-icons';

function Button() {
  const [active, setActive] = React.useState<string | null>(null);

  const toggleActive = (id: string) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };
  return (
    <div style={{height: '100px'}}>
      <InlineStack gap="500">
        <ButtonGroup variant="segmented">
          <Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>

          <Popover
            active={active === 'popover1'}
            preferredAlignment="right"
            activator={
              <Button
                variant="primary"
                onClick={toggleActive('popover1')}
                icon={ChevronDownIcon}
                accessibilityLabel="Other save actions"
              />
            }
            autofocusTarget="first-node"
            onClose={toggleActive('popover1')}
          >
            <ActionList
              actionRole="menuitem"
              items={[{content: 'Save as draft'}]}
            />
          </Popover>
        </ButtonGroup>

        <ButtonGroup variant="segmented">
          <Button>Save</Button>

          <Popover
            active={active === 'popover2'}
            preferredAlignment="right"
            activator={
              <Button
                onClick={toggleActive('popover2')}
                icon={ChevronDownIcon}
                accessibilityLabel="Other save actions"
              />
            }
            autofocusTarget="first-node"
            onClose={toggleActive('popover2')}
          >
            <ActionList
              actionRole="menuitem"
              items={[{content: 'Save as draft'}]}
            />
          </Popover>
        </ButtonGroup>
      </InlineStack>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      margin: '0 0 0 0',
      handler: function() {
        console.log('Save clicked');
      }
    }, {
      xtype: 'button',
      iconCls: 'chevron-down',
      ui: 'primary',
      width: 30,
      menu: [{
        text: 'Save as draft',
        handler: function() {
          console.log('Save as draft clicked');
        }
      }]
    }],
    margin: '0 20 0 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'button',
      text: 'Save',
      margin: '0 0 0 0',
      handler: function() {
        console.log('Save clicked');
      }
    }, {
      xtype: 'button',
      iconCls: 'chevron-down',
      width: 30,
      menu: [{
        text: 'Save as draft',
        handler: function() {
          console.log('Save as draft clicked');
        }
      }]
    }]
  }]
});`,
    vanilla: `<div style="height: 100px;">
  <div class="polaris-inline-stack polaris-inline-stack--gap-500">
    <div class="polaris-button-group polaris-button-group--segmented">
      <button class="polaris-button polaris-button--primary" id="save-primary">Save</button>
      <button class="polaris-button polaris-button--primary polaris-button--split" id="dropdown-primary" aria-label="Other save actions">
        <svg class="polaris-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 14l-4-4h8l-4 4z"/>
        </svg>
      </button>
    </div>
    
    <div class="polaris-button-group polaris-button-group--segmented">
      <button class="polaris-button" id="save-secondary">Save</button>
      <button class="polaris-button polaris-button--split" id="dropdown-secondary" aria-label="Other save actions">
        <svg class="polaris-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 14l-4-4h8l-4 4z"/>
        </svg>
      </button>
    </div>
  </div>
</div>

<script>
const savePrimary = document.getElementById('save-primary');
const saveSecondary = document.getElementById('save-secondary');
const dropdownPrimary = document.getElementById('dropdown-primary');
const dropdownSecondary = document.getElementById('dropdown-secondary');

savePrimary.addEventListener('click', () => {
  console.log('Primary Save clicked');
});

saveSecondary.addEventListener('click', () => {
  console.log('Secondary Save clicked');
});

dropdownPrimary.addEventListener('click', () => {
  console.log('Primary dropdown clicked');
  alert('Primary menu: Save as draft');
});

dropdownSecondary.addEventListener('click', () => {
  console.log('Secondary dropdown clicked');
  alert('Secondary menu: Save as draft');
});
</script>`,
    typescript: `import {
  ActionList,
  InlineStack,
  Button,
  ButtonGroup,
  Popover,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';
import {ChevronDownIcon} from '@shopify/polaris-icons';

interface SplitButtonAction {
  content: string;
  onAction?: () => void;
}

interface SplitButtonProps {
  primaryAction?: string;
  actions?: SplitButtonAction[];
  variant?: 'primary' | 'secondary';
  onPrimaryAction?: () => void;
}

function Button({
  primaryAction = 'Save',
  actions = [{content: 'Save as draft'}],
  variant,
  onPrimaryAction
}: SplitButtonProps = {}): JSX.Element {
  const [active, setActive] = useState<string | null>(null);

  const toggleActive = useCallback((id: string) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  }, []);

  const handlePrimaryAction = useCallback(() => {
    onPrimaryAction?.();
  }, [onPrimaryAction]);

  return (
    <div style={{height: '100px'}}>
      <InlineStack gap="500">
        <ButtonGroup variant="segmented">
          <Button variant="primary" onClick={handlePrimaryAction}>
            {primaryAction}
          </Button>

          <Popover
            active={active === 'popover1'}
            preferredAlignment="right"
            activator={
              <Button
                variant="primary"
                onClick={toggleActive('popover1')}
                icon={ChevronDownIcon}
                accessibilityLabel="Other save actions"
              />
            }
            autofocusTarget="first-node"
            onClose={toggleActive('popover1')}
          >
            <ActionList
              actionRole="menuitem"
              items={actions}
            />
          </Popover>
        </ButtonGroup>

        <ButtonGroup variant="segmented">
          <Button onClick={handlePrimaryAction}>{primaryAction}</Button>

          <Popover
            active={active === 'popover2'}
            preferredAlignment="right"
            activator={
              <Button
                onClick={toggleActive('popover2')}
                icon={ChevronDownIcon}
                accessibilityLabel="Other save actions"
              />
            }
            autofocusTarget="first-node"
            onClose={toggleActive('popover2')}
          >
            <ActionList
              actionRole="menuitem"
              items={actions}
            />
          </Popover>
        </ButtonGroup>
      </InlineStack>
    </div>
  );
}`
  },
  'tertiary': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return <Button variant="tertiary">View shipping settings</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'View shipping settings',
  ui: 'tertiary',
  handler: function() {
    console.log('View shipping settings clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--tertiary">View shipping settings</button>

<script>
const tertiaryButton = document.querySelector('.polaris-button--tertiary');

tertiaryButton.addEventListener('click', () => {
  console.log('View shipping settings clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface TertiaryButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ComponentType;
}

function Button({
  label = 'View shipping settings',
  onClick,
  disabled = false,
  icon
}: TertiaryButtonProps): JSX.Element {
  return (
    <Button 
      variant="tertiary"
      onClick={onClick}
      disabled={disabled}
      icon={icon}
    >
      {label}
    </Button>
  );
}`
  },
  'text-aligned': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return (
    <Button variant="plain" textAlign="left">
      This is a really long string of text that overflows onto the next line we
      need to put in a lot of words now you can see the alignment. It is very
      long but a customer could potentially name something this long.
    </Button>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'This is a really long string of text that overflows onto the next line we need to put in a lot of words now you can see the alignment. It is very long but a customer could potentially name something this long.',
  ui: 'plain',
  textAlign: 'left',
  width: 300,
  height: 80,
  handler: function() {
    console.log('Text aligned button clicked');
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--plain polaris-button--text-left" style="width: 300px; height: auto; white-space: normal;">
  This is a really long string of text that overflows onto the next line we
  need to put in a lot of words now you can see the alignment. It is very
  long but a customer could potentially name something this long.
</button>

<script>
const textAlignedButton = document.querySelector('.polaris-button--text-left');

textAlignedButton.addEventListener('click', () => {
  console.log('Text aligned button clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface TextAlignedButtonProps {
  children: React.ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  variant?: 'primary' | 'secondary' | 'plain';
  onClick?: () => void;
  maxWidth?: string | number;
}

function Button({
  children = 'This is a really long string of text that overflows onto the next line we need to put in a lot of words now you can see the alignment. It is very long but a customer could potentially name something this long.',
  textAlign = 'left',
  variant = 'plain',
  onClick,
  maxWidth = '300px'
}: TextAlignedButtonProps): JSX.Element {
  return (
    <div style={{maxWidth}}>
      <Button 
        variant={variant} 
        textAlign={textAlign}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
}`
  },
  'with-icon': {
    react: `import {Button} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

function Button() {
  return <Button icon={PlusIcon}>Add theme</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Add theme',
  iconCls: 'plus-icon',
  iconAlign: 'left',
  handler: function() {
    console.log('Add theme clicked');
  },
  listeners: {
    afterrender: function(btn) {
      // Add custom icon styling
      const iconEl = btn.el.down('.plus-icon');
      if (iconEl) {
        iconEl.setHtml('➕');
      }
    }
  }
});`,
    vanilla: `<button class="polaris-button polaris-button--with-icon">
  <svg class="polaris-button__icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
  </svg>
  <span class="polaris-button__text">Add theme</span>
</button>

<script>
const iconButton = document.querySelector('.polaris-button--with-icon');

iconButton.addEventListener('click', () => {
  console.log('Add theme clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import {PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

interface ButtonWithIconProps {
  icon?: React.ComponentType;
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'plain';
  disabled?: boolean;
  size?: 'micro' | 'slim' | 'medium' | 'large';
}

function Button({
  icon: IconComponent = PlusIcon,
  children = 'Add theme',
  onClick,
  variant,
  disabled = false,
  size = 'medium'
}: ButtonWithIconProps): JSX.Element {
  return (
    <Button 
      icon={IconComponent}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      size={size}
    >
      {children}
    </Button>
  );
}`
  },
  'default': {
    react: `import {Button} from '@shopify/polaris';
import React from 'react';

function Button() {
  return <Button>Add product</Button>;
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Add product',
  handler: function() {
    console.log('Add product clicked');
  }
});`,
    vanilla: `<button class="polaris-button">Add product</button>

<script>
const defaultButton = document.querySelector('.polaris-button');

defaultButton.addEventListener('click', () => {
  console.log('Add product clicked');
});
</script>`,
    typescript: `import {Button} from '@shopify/polaris';
import React from 'react';

interface DefaultButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

function Button({
  children = 'Add product',
  onClick,
  disabled = false,
  loading = false
}: DefaultButtonProps): JSX.Element {
  return (
    <Button 
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {children}
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
    console.log(\`\${label} clicked\`);
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
    console.log(\`Product selected: \${e.target.textContent}\`);
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
      console.log(\`Action clicked: \${e.target.textContent}\`);
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
    console.log(\`Section clicked: \${title}\`);
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
      window.location.href = \`mailto:\${e.target.textContent}\`;
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
                  accessibilityLabel={\`Edit \${section.title}\`}
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
      window.location.href = \`mailto:\${e.target.textContent}\`;
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
                    accessibilityLabel={\`Delete \${section.title}\`}
                  />
                )}
                {section.editable && (
                  <Button
                    icon={EditIcon}
                    variant="tertiary"
                    onClick={() => onEdit?.(section.id)}
                    accessibilityLabel={\`Edit \${section.title}\`}
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
    console.log(\`Add \${role} clicked\`);
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
  onAddAccount = (role) => console.log(\`Add \${role} clicked\`),
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
    console.log(\`\${status} staff member clicked: \${e.target.textContent}\`);
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
    console.log(\`Address \${index + 1} clicked\`);
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

// Badge Examples
export const badgeExamples = {
  default: {
    react: `import {Badge, Card} from '@shopify/polaris';
import React from 'react';

function Badge() {
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

function Badge({ status = "Fulfilled" }: BadgeExampleProps): JSX.Element {
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

function Badge() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <span class="polaris-badge badge--critical">Action required</span>
</div>
`,
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

function Badge() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <span class="polaris-badge badge--success">Active</span>
</div>
`,
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

function Badge() {
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

function Badge() {
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

function Badge() {
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

function Badge() {
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

function Badge() {
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

function Badge() {
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

function Badge() {
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

function TextField() {
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

function TextField({ 
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
  'with-validation-error': {
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

function TextField() {
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
  },
  'with-auto-size': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AutoSize() {
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
      autoSize
      suffix="in: Your stores"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  autoSize: true,
  suffix: 'in: Your stores',
  listeners: {
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="store-name-auto" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="store-name-auto" 
      class="polaris-text-field__input polaris-text-field__input--auto-size" 
      value="Jaded Pixel"
      autocomplete="off"
    />
    <span class="polaris-text-field__suffix">in: Your stores</span>
  </div>
</div>

<script>
const autoSizeInput = document.getElementById('store-name-auto');
autoSizeInput.addEventListener('input', (event) => {
  const value = event.target.value;
  // Auto-resize logic
  event.target.style.width = Math.max(150, value.length * 8 + 40) + 'px';
  console.log('Value changed to:', value);
});

// Initialize auto-size
autoSizeInput.style.width = Math.max(150, autoSizeInput.value.length * 8 + 40) + 'px';
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface AutoSizeTextFieldProps {
  initialValue?: string;
  label?: string;
  suffix?: string;
  onValueChange?: (value: string) => void;
}

function AutoSize({ 
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  suffix = 'in: Your stores',
  onValueChange
}: AutoSizeTextFieldProps): JSX.Element {
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
      autoSize
      suffix={suffix}
    />
  );
}`
  },
  'with-auto-size-and-dynamic-suffix': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AutoSize() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const suffix = value ? 'in: Unfulfilled orders' : null;

  return (
    <TextField
      label="Search view"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      placeholder="Searching in Unfulfilled orders"
      suffix={suffix}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Search view',
  value: '',
  labelWidth: 100,
  autoSize: true,
  emptyText: 'Searching in Unfulfilled orders',
  listeners: {
    change: function(field, newValue) {
      const suffix = newValue ? 'in: Unfulfilled orders' : null;
      if (suffix) {
        field.setFieldStyle('padding-right: 140px;');
        if (!field.suffixEl) {
          field.suffixEl = Ext.DomHelper.append(field.inputWrap, {
            tag: 'span',
            cls: 'field-suffix',
            html: suffix
          });
        } else {
          field.suffixEl.innerHTML = suffix;
        }
      } else if (field.suffixEl) {
        Ext.removeNode(field.suffixEl);
        field.suffixEl = null;
        field.setFieldStyle('');
      }
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="search-view" class="polaris-text-field__label">Search view</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="search-view" 
      class="polaris-text-field__input polaris-text-field__input--auto-size" 
      value=""
      autocomplete="off"
      placeholder="Searching in Unfulfilled orders"
    />
    <span id="search-suffix" class="polaris-text-field__suffix" style="display: none;">in: Unfulfilled orders</span>
  </div>
</div>

<script>
const searchInput = document.getElementById('search-view');
const suffixEl = document.getElementById('search-suffix');

searchInput.addEventListener('input', (event) => {
  const value = event.target.value;
  
  // Show/hide suffix based on value
  if (value) {
    suffixEl.style.display = 'inline';
  } else {
    suffixEl.style.display = 'none';
  }
  
  // Auto-resize logic
  event.target.style.width = Math.max(150, value.length * 8 + 40) + 'px';
  console.log('Value changed to:', value);
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface DynamicSuffixTextFieldProps {
  label?: string;
  placeholder?: string;
  suffixText?: string;
  onValueChange?: (value: string) => void;
}

function AutoSize({ 
  label = 'Search view',
  placeholder = 'Searching in Unfulfilled orders',
  suffixText = 'in: Unfulfilled orders',
  onValueChange
}: DynamicSuffixTextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  const suffix: string | null = value ? suffixText : null;

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      autoSize
      placeholder={placeholder}
      suffix={suffix}
    />
  );
}`
  },
  'with-character-count': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithCharacterCountExample() {
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
    },
    afterrender: function(field) {
      // Initialize character count
      field.fireEvent('change', field, field.getValue());
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
  
  // Visual feedback when approaching limit
  const countContainer = charCountEl.parentElement;
  if (currentLength >= maxLength * 0.8) {
    countContainer.style.color = '#d72c0d';
  } else {
    countContainer.style.color = '#6d7175';
  }
}

countInput.addEventListener('input', updateCharacterCount);
// Initialize count
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

function TextFieldWithCharacterCountExample({ 
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
  },
  'with-clear-button': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithClearButtonExample() {
  const [textFieldValue, setTextFieldValue] = useState('Jaded Pixel');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleClearButtonClick = useCallback(() => setTextFieldValue(''), []);

  return (
    <TextField
      label="Store name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      clearButton
      onClearButtonClick={handleClearButtonClick}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  triggers: {
    clear: {
      cls: 'clear-trigger',
      handler: function() {
        this.setValue('');
        this.focus();
      },
      hidden: false
    }
  },
  listeners: {
    change: function(field, newValue) {
      // Show/hide clear button based on value
      const clearTrigger = field.getTrigger('clear');
      if (newValue) {
        clearTrigger.show();
      } else {
        clearTrigger.hide();
      }
    },
    afterrender: function(field) {
      // Initialize clear button visibility
      field.fireEvent('change', field, field.getValue());
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="store-name-clear" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="store-name-clear" 
      class="polaris-text-field__input polaris-text-field__input--with-clear" 
      value="Jaded Pixel"
      autocomplete="off"
    />
    <button 
      type="button" 
      id="clear-button" 
      class="polaris-text-field__clear-button"
      aria-label="Clear field"
    >
      ×
    </button>
  </div>
</div>

<script>
const clearInput = document.getElementById('store-name-clear');
const clearButton = document.getElementById('clear-button');

function updateClearButtonVisibility() {
  if (clearInput.value) {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
}

clearButton.addEventListener('click', () => {
  clearInput.value = '';
  clearInput.focus();
  updateClearButtonVisibility();
  console.log('Field cleared');
});

clearInput.addEventListener('input', updateClearButtonVisibility);

// Initialize clear button visibility
updateClearButtonVisibility();
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ClearableTextFieldProps {
  initialValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

function TextFieldWithClearButtonExample({ 
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  onValueChange,
  onClear
}: ClearableTextFieldProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  const handleClearButtonClick = useCallback(() => {
    setTextFieldValue('');
    onClear?.();
  }, [onClear]);

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      clearButton
      onClearButtonClick={handleClearButtonClick}
      autoComplete="off"
    />
  );
}`
  },
  'with-connected-fields': {
    react: `import {TextField, Select, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ConnectedFieldsExample() {
  const [textFieldValue, setTextFieldValue] = useState('10.6');
  const [selectValue, setSelectValue] = useState('kg');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleSelectChange = useCallback(
    (value: string) => setSelectValue(value),
    [],
  );

  return (
    <TextField
      label="Weight"
      type="number"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      autoComplete="off"
      connectedLeft={
        <Select
          value={selectValue}
          label="Weight unit"
          onChange={handleSelectChange}
          labelHidden
          options={['kg', 'lb']}
        />
      }
      connectedRight={<Button>Submit</Button>}
    />
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'combobox',
    store: ['kg', 'lb'],
    value: 'kg',
    width: 80,
    editable: false,
    listeners: {
      change: function(combo, newValue) {
        console.log('Weight unit changed to:', newValue);
      }
    }
  }, {
    xtype: 'numberfield',
    fieldLabel: 'Weight',
    value: 10.6,
    width: 200,
    flex: 1,
    listeners: {
      change: function(field, newValue) {
        console.log('Weight changed to:', newValue);
      }
    }
  }, {
    xtype: 'button',
    text: 'Submit',
    width: 80,
    handler: function() {
      console.log('Submit clicked');
    }
  }]
});`,
    vanilla: `<div class="polaris-connected-fields">
  <label for="weight-field" class="polaris-text-field__label">Weight</label>
  <div class="polaris-connected-fields__wrapper">
    <select id="weight-unit" class="polaris-select__input polaris-connected-fields__left">
      <option value="kg" selected>kg</option>
      <option value="lb">lb</option>
    </select>
    <input 
      type="number" 
      id="weight-field" 
      class="polaris-text-field__input polaris-connected-fields__center" 
      value="10.6"
      autocomplete="off"
    />
    <button 
      type="button" 
      id="submit-button" 
      class="polaris-button polaris-connected-fields__right"
    >
      Submit
    </button>
  </div>
</div>

<script>
const weightField = document.getElementById('weight-field');
const unitSelect = document.getElementById('weight-unit');
const submitButton = document.getElementById('submit-button');

weightField.addEventListener('input', (event) => {
  console.log('Weight changed to:', event.target.value);
});

unitSelect.addEventListener('change', (event) => {
  console.log('Weight unit changed to:', event.target.value);
});

submitButton.addEventListener('click', () => {
  const weight = weightField.value;
  const unit = unitSelect.value;
  console.log(\`Submit clicked with weight: \${weight} \${unit}\`);
});
</script>`,
    typescript: `import {TextField, Select, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ConnectedFieldsProps {
  initialWeight?: string;
  initialUnit?: string;
  weightUnits?: string[];
  onSubmit?: (weight: string, unit: string) => void;
}

function ConnectedFieldsExample({
  initialWeight = '10.6',
  initialUnit = 'kg',
  weightUnits = ['kg', 'lb'],
  onSubmit
}: ConnectedFieldsProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialWeight);
  const [selectValue, setSelectValue] = useState<string>(initialUnit);

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleSelectChange = useCallback(
    (value: string) => setSelectValue(value),
    [],
  );

  const handleSubmit = useCallback(() => {
    onSubmit?.(textFieldValue, selectValue);
  }, [textFieldValue, selectValue, onSubmit]);

  return (
    <TextField
      label="Weight"
      type="number"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      autoComplete="off"
      connectedLeft={
        <Select
          value={selectValue}
          label="Weight unit"
          onChange={handleSelectChange}
          labelHidden
          options={weightUnits}
        />
      }
      connectedRight={<Button onClick={handleSubmit}>Submit</Button>}
    />
  );
}`
  },
  'with-hidden-label': {
    react: `import {FormLayout, ChoiceList, TextField, Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function HiddenLabelExample() {
  const [value, setValue] = useState('12');
  const [selected, setSelected] = useState('yes');

  const handleTextChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleChoiceChange = useCallback(
    (selections: string[]) => setSelected(selections[0]),
    [],
  );

  return (
    <FormLayout>
      <ChoiceList
        title="Gift card auto-expiration"
        choices={[
          {label: 'Gift cards never expire', value: 'no'},
          {label: 'Gift cards expire', value: 'yes'},
        ]}
        selected={[selected]}
        onChange={handleChoiceChange}
      />
      <TextField
        label="Gift cards expire after"
        type="number"
        labelHidden
        value={value}
        disabled={selected === 'no'}
        onChange={handleTextChange}
        autoComplete="off"
        connectedRight={
          <Select
            label="Unit of time"
            labelHidden
            options={['months after purchase']}
          />
        }
      />
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'radiogroup',
    fieldLabel: 'Gift card auto-expiration',
    columns: 1,
    items: [{
      boxLabel: 'Gift cards never expire',
      name: 'expiration',
      inputValue: 'no'
    }, {
      boxLabel: 'Gift cards expire',
      name: 'expiration',
      inputValue: 'yes',
      checked: true
    }],
    listeners: {
      change: function(group, newValue) {
        const numberField = this.up('form').down('numberfield');
        const comboField = this.up('form').down('combobox');
        const isExpiring = newValue.expiration === 'yes';
        
        numberField.setDisabled(!isExpiring);
        comboField.setDisabled(!isExpiring);
      }
    }
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'numberfield',
      value: 12,
      width: 100,
      hideTrigger: true,
      listeners: {
        change: function(field, newValue) {
          console.log('Expiration period changed to:', newValue);
        }
      }
    }, {
      xtype: 'combobox',
      store: ['months after purchase'],
      value: 'months after purchase',
      editable: false,
      flex: 1
    }]
  }]
});`,
    vanilla: `<div class="polaris-form-layout">
  <fieldset class="polaris-choice-list">
    <legend class="polaris-choice-list__title">Gift card auto-expiration</legend>
    <div class="polaris-choice-list__choices">
      <label class="polaris-choice">
        <input type="radio" name="expiration" value="no" class="polaris-choice__input">
        <span class="polaris-choice__label">Gift cards never expire</span>
      </label>
      <label class="polaris-choice">
        <input type="radio" name="expiration" value="yes" class="polaris-choice__input" checked>
        <span class="polaris-choice__label">Gift cards expire</span>
      </label>
    </div>
  </fieldset>
  
  <div class="polaris-connected-fields">
    <div class="polaris-connected-fields__wrapper">
      <input 
        type="number" 
        id="expiration-number" 
        class="polaris-text-field__input polaris-connected-fields__center" 
        value="12"
        autocomplete="off"
        aria-label="Gift cards expire after"
      />
      <select id="expiration-unit" class="polaris-select__input polaris-connected-fields__right">
        <option value="months after purchase">months after purchase</option>
      </select>
    </div>
  </div>
</div>

<script>
const expirationRadios = document.querySelectorAll('input[name="expiration"]');
const numberInput = document.getElementById('expiration-number');
const unitSelect = document.getElementById('expiration-unit');

function updateFieldsState(isExpiring) {
  numberInput.disabled = !isExpiring;
  unitSelect.disabled = !isExpiring;
  
  if (!isExpiring) {
    numberInput.style.opacity = '0.5';
    unitSelect.style.opacity = '0.5';
  } else {
    numberInput.style.opacity = '1';
    unitSelect.style.opacity = '1';
  }
}

expirationRadios.forEach(radio => {
  radio.addEventListener('change', (event) => {
    updateFieldsState(event.target.value === 'yes');
  });
});

numberInput.addEventListener('input', (event) => {
  console.log('Expiration period changed to:', event.target.value);
});

// Initialize state
updateFieldsState(true);
</script>`,
    typescript: `import {FormLayout, ChoiceList, TextField, Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface HiddenLabelProps {
  initialPeriod?: string;
  initialExpires?: boolean;
  timeUnits?: string[];
  onExpirationChange?: (expires: boolean, period?: string) => void;
}

function HiddenLabelExample({
  initialPeriod = '12',
  initialExpires = true,
  timeUnits = ['months after purchase'],
  onExpirationChange
}: HiddenLabelProps): JSX.Element {
  const [value, setValue] = useState<string>(initialPeriod);
  const [selected, setSelected] = useState<string>(initialExpires ? 'yes' : 'no');

  const handleTextChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onExpirationChange?.(selected === 'yes', newValue);
    },
    [selected, onExpirationChange],
  );

  const handleChoiceChange = useCallback(
    (selections: string[]) => {
      const newSelection = selections[0];
      setSelected(newSelection);
      onExpirationChange?.(newSelection === 'yes', value);
    },
    [value, onExpirationChange],
  );

  return (
    <FormLayout>
      <ChoiceList
        title="Gift card auto-expiration"
        choices={[
          {label: 'Gift cards never expire', value: 'no'},
          {label: 'Gift cards expire', value: 'yes'},
        ]}
        selected={[selected]}
        onChange={handleChoiceChange}
      />
      <TextField
        label="Gift cards expire after"
        type="number"
        labelHidden
        value={value}
        disabled={selected === 'no'}
        onChange={handleTextChange}
        autoComplete="off"
        connectedRight={
          <Select
            label="Unit of time"
            labelHidden
            options={timeUnits}
          />
        }
      />
    </FormLayout>
  );
}`
  },
  'with-inline-suggestion': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback, useMemo} from 'react';

function TextFieldWithSuggestionExample() {
  const suggestions = useMemo(
    () => [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Icon Outlying Islands',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'U.S. Virgin Islands',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming',
    ],
    [],
  );

  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState<string | undefined>();

  const handleChange = useCallback(
    (value: string) => {
      const suggestion =
        value &&
        suggestions.find((suggestion) =>
          suggestion.toLowerCase().startsWith(value.toLowerCase()),
        );

      setValue(value);
      setSuggestion(suggestion);
    },
    [suggestions],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Tab') {
        setValue(suggestion || value);
        setSuggestion('');
      } else if (event.key === 'Backspace') {
        setValue(value);
        setSuggestion('');
      }
    },
    [value, suggestion],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <TextField
        type="text"
        label="State"
        value={value}
        onChange={handleChange}
        suggestion={suggestion}
        autoComplete="off"
      />
    </div>
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'State',
  store: [
    'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas',
    'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
    'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
    'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Icon Outlying Islands',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Northern Mariana Islands',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
    'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],
  typeAhead: true,
  typeAheadDelay: 100,
  forceSelection: false,
  selectOnFocus: true,
  width: 300,
  listeners: {
    change: function(combo, newValue) {
      console.log('State changed to:', newValue);
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="state-input" class="polaris-text-field__label">State</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="state-input" 
      class="polaris-text-field__input" 
      value=""
      autocomplete="off"
      list="state-suggestions"
    />
    <datalist id="state-suggestions">
      <option value="Alabama">
      <option value="Alaska">
      <option value="American Samoa">
      <option value="Arizona">
      <option value="Arkansas">
      <option value="California">
      <option value="Colorado">
      <option value="Connecticut">
      <option value="Delaware">
      <option value="District of Columbia">
      <option value="Florida">
      <option value="Georgia">
      <option value="Guam">
      <option value="Hawaii">
      <option value="Idaho">
      <option value="Illinois">
      <option value="Indiana">
      <option value="Iowa">
      <option value="Kansas">
      <option value="Kentucky">
      <option value="Louisiana">
      <option value="Maine">
      <option value="Maryland">
      <option value="Massachusetts">
      <option value="Michigan">
      <option value="Minnesota">
      <option value="Mississippi">
      <option value="Missouri">
      <option value="Montana">
      <option value="Nebraska">
      <option value="Nevada">
      <option value="New Hampshire">
      <option value="New Jersey">
      <option value="New Mexico">
      <option value="New York">
      <option value="North Carolina">
      <option value="North Dakota">
      <option value="Ohio">
      <option value="Oklahoma">
      <option value="Oregon">
      <option value="Pennsylvania">
      <option value="Puerto Rico">
      <option value="Rhode Island">
      <option value="South Carolina">
      <option value="South Dakota">
      <option value="Tennessee">
      <option value="Texas">
      <option value="Utah">
      <option value="Vermont">
      <option value="Virginia">
      <option value="Washington">
      <option value="West Virginia">
      <option value="Wisconsin">
      <option value="Wyoming">
    </datalist>
    <div id="suggestion-preview" class="polaris-text-field__suggestion"></div>
  </div>
</div>

<script>
const stateInput = document.getElementById('state-input');
const suggestionPreview = document.getElementById('suggestion-preview');

const states = [
  'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas',
  'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
  'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
  'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
  'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

let currentSuggestion = '';

stateInput.addEventListener('input', (event) => {
  const value = event.target.value;
  
  if (value) {
    const suggestion = states.find(state => 
      state.toLowerCase().startsWith(value.toLowerCase())
    );
    
    if (suggestion) {
      currentSuggestion = suggestion;
      suggestionPreview.textContent = suggestion.substring(value.length);
      suggestionPreview.style.display = 'inline';
    } else {
      currentSuggestion = '';
      suggestionPreview.style.display = 'none';
    }
  } else {
    currentSuggestion = '';
    suggestionPreview.style.display = 'none';
  }
});

stateInput.addEventListener('keydown', (event) => {
  if ((event.key === 'Tab' || event.key === 'Enter') && currentSuggestion) {
    event.preventDefault();
    stateInput.value = currentSuggestion;
    suggestionPreview.style.display = 'none';
    currentSuggestion = '';
  }
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback, useMemo} from 'react';

interface SuggestionTextFieldProps {
  suggestions?: string[];
  label?: string;
  onValueChange?: (value: string) => void;
  onSuggestionAccepted?: (suggestion: string) => void;
}

function TextFieldWithSuggestionExample({
  suggestions: providedSuggestions,
  label = 'State',
  onValueChange,
  onSuggestionAccepted
}: SuggestionTextFieldProps): JSX.Element {
  const suggestions = useMemo(
    () => providedSuggestions || [
      'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas',
      'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia',
      'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
      'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Icon Outlying Islands',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
      'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
      'North Carolina', 'North Dakota', 'Northern Mariana Islands',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico',
      'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
      'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia',
      'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ],
    [providedSuggestions],
  );

  const [value, setValue] = useState<string>('');
  const [suggestion, setSuggestion] = useState<string | undefined>();

  const handleChange = useCallback(
    (value: string) => {
      const suggestion =
        value &&
        suggestions.find((suggestion) =>
          suggestion.toLowerCase().startsWith(value.toLowerCase()),
        );

      setValue(value);
      setSuggestion(suggestion);
      onValueChange?.(value);
    },
    [suggestions, onValueChange],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Tab') {
        if (suggestion) {
          setValue(suggestion);
          setSuggestion('');
          onSuggestionAccepted?.(suggestion);
        }
      } else if (event.key === 'Backspace') {
        setValue(value);
        setSuggestion('');
      }
    },
    [value, suggestion, onSuggestionAccepted],
  );

  return (
    <div onKeyDown={handleKeyDown}>
      <TextField
        type="text"
        label={label}
        value={value}
        onChange={handleChange}
        suggestion={suggestion}
        autoComplete="off"
      />
    </div>
  );
}`
  },
  'with-label-action': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function LabelActionExample() {
  const [textFieldValue, setTextFieldValue] = useState('6201.11.0000');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Tariff code"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      labelAction={{content: 'Look up codes'}}
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Tariff code',
  value: '6201.11.0000',
  labelWidth: 100,
  width: 320,
  afterLabelTpl: '<a href="#" class="label-action" onclick="alert(\\'Looking up codes...\\'); return false;">Look up codes</a>',
  listeners: {
    change: function(field, newValue) {
      console.log('Tariff code changed to:', newValue);
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <div class="polaris-text-field__label-wrapper">
    <label for="tariff-code" class="polaris-text-field__label">Tariff code</label>
    <button 
      type="button" 
      id="lookup-action" 
      class="polaris-text-field__label-action"
    >
      Look up codes
    </button>
  </div>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="tariff-code" 
      class="polaris-text-field__input" 
      value="6201.11.0000"
      autocomplete="off"
    />
  </div>
</div>

<script>
const tariffInput = document.getElementById('tariff-code');
const lookupAction = document.getElementById('lookup-action');

tariffInput.addEventListener('input', (event) => {
  console.log('Tariff code changed to:', event.target.value);
});

lookupAction.addEventListener('click', () => {
  // Simulate lookup functionality
  alert('Looking up tariff codes...');
  console.log('Lookup codes action triggered');
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface LabelActionProps {
  initialValue?: string;
  label?: string;
  actionContent?: string;
  onValueChange?: (value: string) => void;
  onLabelAction?: () => void;
}

function LabelActionExample({
  initialValue = '6201.11.0000',
  label = 'Tariff code',
  actionContent = 'Look up codes',
  onValueChange,
  onLabelAction
}: LabelActionProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  const handleLabelAction = useCallback(() => {
    onLabelAction?.();
  }, [onLabelAction]);

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      labelAction={{
        content: actionContent,
        onAction: handleLabelAction
      }}
      autoComplete="off"
    />
  );
}`
  },
  'with-loading': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function LoadingExample() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    [],
  );

  const handleClearButtonClick = useCallback(() => setValue(''), []);

  return (
    <TextField
      label="Store name"
      value={value}
      onChange={handleChange}
      autoComplete="off"
      clearButton
      onClearButtonClick={handleClearButtonClick}
      loading
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: '',
  labelWidth: 100,
  width: 320,
  triggers: {
    clear: {
      cls: 'clear-trigger',
      handler: function() {
        this.setValue('');
        this.focus();
      }
    }
  },
  plugins: [{
    ptype: 'loadmask',
    msg: 'Loading...'
  }],
  listeners: {
    afterrender: function(field) {
      // Show loading state
      field.setLoading(true);
      
      // Simulate async operation
      setTimeout(() => {
        field.setLoading(false);
      }, 2000);
    },
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="store-name-loading" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper polaris-text-field__input-wrapper--loading">
    <input 
      type="text" 
      id="store-name-loading" 
      class="polaris-text-field__input" 
      value=""
      autocomplete="off"
    />
    <button 
      type="button" 
      id="clear-loading" 
      class="polaris-text-field__clear-button"
      aria-label="Clear field"
      style="display: none;"
    >
      ×
    </button>
    <div class="polaris-text-field__spinner">
      <div class="polaris-spinner polaris-spinner--size-small">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3v3c0 .55-.45 1-1 1s-1-.45-1-1V3c0-.55.45-1 1-1s1 .45 1 1z"/>
        </svg>
      </div>
    </div>
  </div>
</div>

<script>
const loadingInput = document.getElementById('store-name-loading');
const clearLoadingButton = document.getElementById('clear-loading');
const inputWrapper = loadingInput.parentElement;

function updateClearButtonVisibility() {
  if (loadingInput.value) {
    clearLoadingButton.style.display = 'block';
  } else {
    clearLoadingButton.style.display = 'none';
  }
}

clearLoadingButton.addEventListener('click', () => {
  loadingInput.value = '';
  loadingInput.focus();
  updateClearButtonVisibility();
});

loadingInput.addEventListener('input', updateClearButtonVisibility);

// Simulate loading state
setTimeout(() => {
  inputWrapper.classList.remove('polaris-text-field__input-wrapper--loading');
}, 2000);
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface LoadingTextFieldProps {
  label?: string;
  isLoading?: boolean;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
}

function LoadingExample({
  label = 'Store name',
  isLoading = true,
  onValueChange,
  onClear
}: LoadingTextFieldProps): JSX.Element {
  const [value, setValue] = useState<string>('');

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onValueChange?.(newValue);
    },
    [onValueChange],
  );

  const handleClearButtonClick = useCallback(() => {
    setValue('');
    onClear?.();
  }, [onClear]);

  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      autoComplete="off"
      clearButton
      onClearButtonClick={handleClearButtonClick}
      loading={isLoading}
    />
  );
}`
  },
  'with-monospaced-font': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithMonospacedFontExample() {
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
      monospaced
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  fieldStyle: 'font-family: Monaco, "Courier New", monospace; font-size: 13px;',
  listeners: {
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="store-name-mono" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="store-name-mono" 
      class="polaris-text-field__input polaris-text-field__input--monospaced" 
      value="Jaded Pixel"
      autocomplete="off"
      style="font-family: Monaco, 'Courier New', monospace; font-size: 13px;"
    />
  </div>
</div>

<script>
const monoInput = document.getElementById('store-name-mono');

monoInput.addEventListener('input', (event) => {
  console.log('Value changed to:', event.target.value);
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface MonospacedTextFieldProps {
  initialValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
}

function TextFieldWithMonospacedFontExample({
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  onValueChange
}: MonospacedTextFieldProps): JSX.Element {
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
      monospaced
      autoComplete="off"
    />
  );
}`
  },
  'with-placeholder-text': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithPlaceholderExample() {
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <TextField
      label="Shipping zone name"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Enter shipping zone name"
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Shipping zone name',
  value: '',
  labelWidth: 150,
  width: 400,
  emptyText: 'Enter shipping zone name',
  listeners: {
    change: function(field, newValue) {
      // Handle shipping zone name change
      if (newValue && newValue.length > 0) {
        field.setFieldStyle('border-color: #008060;');
      } else {
        field.setFieldStyle('border-color: #c4c4c4;');
      }
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="shipping-zone" class="polaris-text-field__label">Shipping zone name</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="shipping-zone" 
      class="polaris-text-field__input" 
      value=""
      autocomplete="off"
      placeholder="Enter shipping zone name"
    />
  </div>
</div>

<script>
const shippingInput = document.getElementById('shipping-zone');

shippingInput.addEventListener('input', (event) => {
  console.log('Value changed to:', event.target.value);
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TextFieldWithPlaceholderProps {
  label?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

function TextFieldWithPlaceholder({
  label = 'Shipping zone name',
  placeholder = 'Enter regions (e.g., North America, Europe)',
  onValueChange
}: TextFieldWithPlaceholderProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>('');

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
      placeholder={placeholder}
      autoComplete="off"
    />
  );
}`
  },
  'with-prefix-or-suffix': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function Prefix() {
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
  prefix: '$',
  decimalPrecision: 2,
  listeners: {
    change: function(field, newValue) {
      console.log('Price changed to:', newValue);
    },
    afterrender: function(field) {
      // Add prefix styling
      const prefix = Ext.DomHelper.insertBefore(field.inputEl, {
        tag: 'span',
        cls: 'field-prefix',
        html: '$'
      });
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

// Format number input to 2 decimal places on blur
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

function Prefix({
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
  'with-right-aligned-text': {
    react: `import {LegacyStack, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function RightAlignExample() {
  const [textFieldValue, setTextFieldValue] = useState('1');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  return (
    <LegacyStack>
      <LegacyStack.Item fill>Price</LegacyStack.Item>
      <TextField
        label="Price"
        labelHidden
        value={textFieldValue}
        onChange={handleTextFieldChange}
        autoComplete="off"
        align="right"
      />
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'component',
    html: 'Price',
    flex: 1,
    style: {
      padding: '6px 0',
      lineHeight: '20px'
    }
  }, {
    xtype: 'numberfield',
    value: 1,
    width: 100,
    fieldStyle: 'text-align: right;',
    hideTrigger: true,
    listeners: {
      change: function(field, newValue) {
        console.log('Price changed to:', newValue);
      }
    }
  }]
});`,
    vanilla: `<div class="polaris-legacy-stack">
  <div class="polaris-legacy-stack__item polaris-legacy-stack__item--fill">
    <span class="polaris-text-field__companion-text">Price</span>
  </div>
  <div class="polaris-legacy-stack__item">
    <div class="polaris-text-field">
      <div class="polaris-text-field__input-wrapper">
        <input 
          type="text" 
          id="price-right-align" 
          class="polaris-text-field__input polaris-text-field__input--right-aligned" 
          value="1"
          autocomplete="off"
          style="text-align: right;"
          aria-label="Price"
        />
      </div>
    </div>
  </div>
</div>

<script>
const rightAlignInput = document.getElementById('price-right-align');

rightAlignInput.addEventListener('input', (event) => {
  console.log('Price changed to:', event.target.value);
});
</script>`,
    typescript: `import {LegacyStack, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface RightAlignedTextFieldProps {
  initialValue?: string;
  label?: string;
  companionText?: string;
  onValueChange?: (value: string) => void;
}

function RightAlignExample({
  initialValue = '1',
  label = 'Price',
  companionText = 'Price',
  onValueChange
}: RightAlignedTextFieldProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  return (
    <LegacyStack>
      <LegacyStack.Item fill>{companionText}</LegacyStack.Item>
      <TextField
        label={label}
        labelHidden
        value={textFieldValue}
        onChange={handleTextFieldChange}
        autoComplete="off"
        align="right"
      />
    </LegacyStack>
  );
}`
  },
  'with-separate-validation-error': {
    react: `import {
  LegacyStack,
  FormLayout,
  Select,
  TextField,
  InlineError,
  Button,
  LegacyCard,
} from '@shopify/polaris';
import {DeleteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function SeparateValidationError() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [selectTypeValue, setSelectTypeValue] = useState('Product type');
  const [selectConditionValue, setSelectConditionValue] =
    useState('is equal to');

  const handleTextFieldValueChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const handleSelectTypeChange = useCallback(
    (value: string) => setSelectTypeValue(value),
    [],
  );

  const handleSelectConditionChange = useCallback(
    (value: string) => setSelectConditionValue(value),
    [],
  );

  const textFieldID = 'ruleContent';
  const isInvalid = isValueInvalid(textFieldValue);
  const errorMessage = isInvalid
    ? 'Enter 3 or more characters for product type is equal to'
    : '';

  const formGroupMarkup = (
    <LegacyStack wrap={false} alignment="leading" spacing="loose">
      <LegacyStack.Item fill>
        <FormLayout>
          <FormLayout.Group condensed>
            <Select
              labelHidden
              label="Collection rule type"
              options={['Product type']}
              value={selectTypeValue}
              onChange={handleSelectTypeChange}
            />
            <Select
              labelHidden
              label="Collection rule condition"
              options={['is equal to']}
              value={selectConditionValue}
              onChange={handleSelectConditionChange}
            />
            <TextField
              labelHidden
              label="Collection rule content"
              error={isInvalid}
              id={textFieldID}
              value={textFieldValue}
              onChange={handleTextFieldValueChange}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>
        <div style={{marginTop: '4px'}}>
          <InlineError message={errorMessage} fieldID={textFieldID} />
        </div>
      </LegacyStack.Item>
      <Button icon={DeleteIcon} accessibilityLabel="Remove item" />
    </LegacyStack>
  );

  return (
    <LegacyCard sectioned>
      <FormLayout>{formGroupMarkup}</FormLayout>
    </LegacyCard>
  );

  function isValueInvalid(content: string) {
    if (!content) {
      return true;
    }

    return content.length < 3;
  }
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  bodyPadding: 10,
  items: [{
    xtype: 'container',
    flex: 1,
    layout: {
      type: 'vbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      items: [{
        xtype: 'combobox',
        store: ['Product type'],
        value: 'Product type',
        editable: false,
        width: 120,
        margin: '0 5 0 0'
      }, {
        xtype: 'combobox',
        store: ['is equal to'],
        value: 'is equal to',
        editable: false,
        width: 120,
        margin: '0 5 0 0'
      }, {
        xtype: 'textfield',
        flex: 1,
        allowBlank: false,
        minLength: 3,
        msgTarget: 'none',
        listeners: {
          change: function(field, newValue) {
            const isValid = newValue && newValue.length >= 3;
            const errorEl = field.up('container').down('component[itemId=errorMsg]');
            
            if (isValid) {
              field.removeCls('field-error');
              errorEl.hide();
            } else {
              field.addCls('field-error');
              errorEl.show();
              errorEl.update('Enter 3 or more characters for product type is equal to');
            }
          }
        }
      }]
    }, {
      xtype: 'component',
      itemId: 'errorMsg',
      cls: 'error-message',
      html: 'Enter 3 or more characters for product type is equal to',
      style: {
        color: '#d72c0d',
        fontSize: '12px',
        marginTop: '4px'
      }
    }]
  }, {
    xtype: 'button',
    text: '×',
    width: 30,
    handler: function() {
      this.up('panel').destroy();
    }
  }]
});`,
    vanilla: `<div class="polaris-legacy-card polaris-legacy-card--sectioned">
  <div class="polaris-form-layout">
    <div class="polaris-legacy-stack polaris-legacy-stack--spacing-loose">
      <div class="polaris-legacy-stack__item polaris-legacy-stack__item--fill">
        <div class="polaris-form-layout__group polaris-form-layout__group--condensed">
          <div class="polaris-form-layout__item">
            <select id="rule-type" class="polaris-select__input" aria-label="Collection rule type">
              <option value="Product type">Product type</option>
            </select>
          </div>
          <div class="polaris-form-layout__item">
            <select id="rule-condition" class="polaris-select__input" aria-label="Collection rule condition">
              <option value="is equal to">is equal to</option>
            </select>
          </div>
          <div class="polaris-form-layout__item">
            <input 
              type="text" 
              id="rule-content" 
              class="polaris-text-field__input" 
              value=""
              autocomplete="off"
              aria-label="Collection rule content"
              aria-describedby="rule-content-error"
            />
          </div>
        </div>
        <div id="rule-content-error" class="polaris-inline-error" style="margin-top: 4px; display: none;">
          <span class="polaris-inline-error__text">Enter 3 or more characters for product type is equal to</span>
        </div>
      </div>
      <div class="polaris-legacy-stack__item">
        <button 
          type="button" 
          id="remove-rule" 
          class="polaris-button polaris-button--plain"
          aria-label="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  </div>
</div>

<script>
const ruleContentInput = document.getElementById('rule-content');
const errorElement = document.getElementById('rule-content-error');
const removeButton = document.getElementById('remove-rule');

function validateInput(value) {
  const isValid = value && value.length >= 3;
  
  if (isValid) {
    ruleContentInput.classList.remove('polaris-text-field__input--error');
    errorElement.style.display = 'none';
  } else {
    ruleContentInput.classList.add('polaris-text-field__input--error');
    errorElement.style.display = 'block';
  }
  
  return isValid;
}

ruleContentInput.addEventListener('input', (event) => {
  validateInput(event.target.value);
});

removeButton.addEventListener('click', () => {
  const card = document.querySelector('.polaris-legacy-card');
  card.style.opacity = '0.5';
  console.log('Remove rule clicked');
});

// Initialize validation
validateInput(ruleContentInput.value);
</script>`,
    typescript: `import {
  LegacyStack,
  FormLayout,
  Select,
  TextField,
  InlineError,
  Button,
  LegacyCard,
} from '@shopify/polaris';
import {DeleteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

interface ValidationRule {
  type: string;
  condition: string;
  content: string;
}

interface SeparateValidationErrorProps {
  initialRule?: ValidationRule;
  ruleTypes?: string[];
  ruleConditions?: string[];
  onRuleChange?: (rule: ValidationRule) => void;
  onRemove?: () => void;
}

function SeparateValidationError({
  initialRule = {
    type: 'Product type',
    condition: 'is equal to',
    content: ''
  },
  ruleTypes = ['Product type'],
  ruleConditions = ['is equal to'],
  onRuleChange,
  onRemove
}: SeparateValidationErrorProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialRule.content);
  const [selectTypeValue, setSelectTypeValue] = useState<string>(initialRule.type);
  const [selectConditionValue, setSelectConditionValue] = useState<string>(initialRule.condition);

  const handleTextFieldValueChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onRuleChange?.({
        type: selectTypeValue,
        condition: selectConditionValue,
        content: value
      });
    },
    [selectTypeValue, selectConditionValue, onRuleChange],
  );

  const handleSelectTypeChange = useCallback(
    (value: string) => {
      setSelectTypeValue(value);
      onRuleChange?.({
        type: value,
        condition: selectConditionValue,
        content: textFieldValue
      });
    },
    [selectConditionValue, textFieldValue, onRuleChange],
  );

  const handleSelectConditionChange = useCallback(
    (value: string) => {
      setSelectConditionValue(value);
      onRuleChange?.({
        type: selectTypeValue,
        condition: value,
        content: textFieldValue
      });
    },
    [selectTypeValue, textFieldValue, onRuleChange],
  );

  const textFieldID = 'ruleContent';
  const isInvalid = isValueInvalid(textFieldValue);
  const errorMessage = isInvalid
    ? \`Enter 3 or more characters for \${selectTypeValue.toLowerCase()} \${selectConditionValue}\`
    : '';

  const formGroupMarkup = (
    <LegacyStack wrap={false} alignment="leading" spacing="loose">
      <LegacyStack.Item fill>
        <FormLayout>
          <FormLayout.Group condensed>
            <Select
              labelHidden
              label="Collection rule type"
              options={ruleTypes}
              value={selectTypeValue}
              onChange={handleSelectTypeChange}
            />
            <Select
              labelHidden
              label="Collection rule condition"
              options={ruleConditions}
              value={selectConditionValue}
              onChange={handleSelectConditionChange}
            />
            <TextField
              labelHidden
              label="Collection rule content"
              error={isInvalid}
              id={textFieldID}
              value={textFieldValue}
              onChange={handleTextFieldValueChange}
              autoComplete="off"
            />
          </FormLayout.Group>
        </FormLayout>
        <div style={{marginTop: '4px'}}>
          <InlineError message={errorMessage} fieldID={textFieldID} />
        </div>
      </LegacyStack.Item>
      <Button 
        icon={DeleteIcon} 
        accessibilityLabel="Remove item"
        onClick={onRemove}
      />
    </LegacyStack>
  );

  return (
    <LegacyCard sectioned>
      <FormLayout>{formGroupMarkup}</FormLayout>
    </LegacyCard>
  );

  function isValueInvalid(content: string): boolean {
    if (!content) {
      return true;
    }
    return content.length < 3;
  }
}`
  },
  'with-value-selected-on-focus': {
    react: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TextFieldWithSelectTextOnFocusExample() {
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
      selectTextOnFocus
      autoComplete="off"
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  value: 'Jaded Pixel',
  labelWidth: 100,
  width: 320,
  selectOnFocus: true,
  listeners: {
    change: function(field, newValue) {
      console.log('Value changed to:', newValue);
    },
    focus: function(field) {
      // Text will be automatically selected due to selectOnFocus: true
      console.log('Field focused, text selected');
    }
  }
});`,
    vanilla: `<div class="polaris-text-field">
  <label for="store-name-select" class="polaris-text-field__label">Store name</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="store-name-select" 
      class="polaris-text-field__input" 
      value="Jaded Pixel"
      autocomplete="off"
    />
  </div>
</div>

<script>
const selectOnFocusInput = document.getElementById('store-name-select');

selectOnFocusInput.addEventListener('focus', (event) => {
  // Select all text when field receives focus
  event.target.select();
  console.log('Field focused, text selected');
});

selectOnFocusInput.addEventListener('input', (event) => {
  console.log('Value changed to:', event.target.value);
});
</script>`,
    typescript: `import {TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface SelectTextOnFocusProps {
  initialValue?: string;
  label?: string;
  selectOnFocus?: boolean;
  onValueChange?: (value: string) => void;
  onFocus?: () => void;
}

function TextFieldWithSelectTextOnFocusExample({
  initialValue = 'Jaded Pixel',
  label = 'Store name',
  selectOnFocus = true,
  onValueChange,
  onFocus
}: SelectTextOnFocusProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>(initialValue);

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  const handleFocus = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      selectTextOnFocus={selectOnFocus}
      onFocus={handleFocus}
      autoComplete="off"
    />
  );
}`
  },
  'with-vertical-content': {
    react: `import {LegacyStack, Tag, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function VerticalContent() {
  const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleTextFieldChange = useCallback(
    (value: string) => setTextFieldValue(value),
    [],
  );

  const verticalContentMarkup =
    tags.length > 0 ? (
      <LegacyStack spacing="extraTight" alignment="center">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </LegacyStack>
    ) : null;

  return (
    <TextField
      label="Tags"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Search tags"
      autoComplete="off"
      verticalContent={verticalContentMarkup}
    />
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Tags',
    value: '',
    emptyText: 'Search tags',
    labelWidth: 100,
    listeners: {
      change: function(field, newValue) {
        console.log('Tags search changed to:', newValue);
      }
    }
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'middle'
    },
    margin: '10 0 0 0',
    items: [{
      xtype: 'component',
      html: '<span class="tag">Rustic</span>',
      margin: '0 5 0 0'
    }, {
      xtype: 'component',
      html: '<span class="tag">Antique</span>',
      margin: '0 5 0 0'
    }, {
      xtype: 'component',
      html: '<span class="tag">Vinyl</span>',
      margin: '0 5 0 0'
    }, {
      xtype: 'component',
      html: '<span class="tag">Refurbished</span>'
    }]
  }]
});`,
    vanilla: `<div class="polaris-text-field polaris-text-field--with-vertical-content">
  <label for="tags-input" class="polaris-text-field__label">Tags</label>
  <div class="polaris-text-field__input-wrapper">
    <input 
      type="text" 
      id="tags-input" 
      class="polaris-text-field__input" 
      value=""
      autocomplete="off"
      placeholder="Search tags"
    />
  </div>
  <div class="polaris-text-field__vertical-content">
    <div class="polaris-legacy-stack polaris-legacy-stack--spacing-extra-tight polaris-legacy-stack--alignment-center">
      <div class="polaris-legacy-stack__item">
        <span class="polaris-tag">Rustic</span>
      </div>
      <div class="polaris-legacy-stack__item">
        <span class="polaris-tag">Antique</span>
      </div>
      <div class="polaris-legacy-stack__item">
        <span class="polaris-tag">Vinyl</span>
      </div>
      <div class="polaris-legacy-stack__item">
        <span class="polaris-tag">Refurbished</span>
      </div>
    </div>
  </div>
</div>

<script>
const tagsInput = document.getElementById('tags-input');
const tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'];

tagsInput.addEventListener('input', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  console.log('Tags search changed to:', searchTerm);
  
  // Filter and highlight matching tags
  const tagElements = document.querySelectorAll('.polaris-tag');
  tagElements.forEach((tagEl, index) => {
    const tagText = tags[index].toLowerCase();
    if (tagText.includes(searchTerm) || searchTerm === '') {
      tagEl.style.display = 'inline-block';
      tagEl.style.backgroundColor = tagText.includes(searchTerm) && searchTerm ? '#e1f5fe' : '';
    } else {
      tagEl.style.display = 'none';
    }
  });
});
</script>`,
    typescript: `import {LegacyStack, Tag, TextField} from '@shopify/polaris';
import {useState, useCallback, ReactNode} from 'react';

interface VerticalContentTextFieldProps {
  label?: string;
  placeholder?: string;
  tags?: string[];
  onValueChange?: (value: string) => void;
  onTagClick?: (tag: string) => void;
  renderVerticalContent?: (searchValue: string) => ReactNode;
}

function VerticalContent({
  label = 'Tags',
  placeholder = 'Search tags',
  tags = ['Rustic', 'Antique', 'Vinyl', 'Refurbished'],
  onValueChange,
  onTagClick,
  renderVerticalContent
}: VerticalContentTextFieldProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>('');

  const handleTextFieldChange = useCallback(
    (value: string) => {
      setTextFieldValue(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  const handleTagClick = useCallback(
    (tag: string) => {
      onTagClick?.(tag);
    },
    [onTagClick],
  );

  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(textFieldValue.toLowerCase())
  );

  const verticalContentMarkup = renderVerticalContent 
    ? renderVerticalContent(textFieldValue)
    : filteredTags.length > 0 ? (
        <LegacyStack spacing="extraTight" alignment="center">
          {filteredTags.map((tag) => (
            <Tag key={tag} onClick={() => handleTagClick(tag)}>
              {tag}
            </Tag>
          ))}
        </LegacyStack>
      ) : null;

  return (
    <TextField
      label={label}
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder={placeholder}
      autoComplete="off"
      verticalContent={verticalContentMarkup}
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

function Banner() {
  return (
    <Banner title="Order archived" onDismiss={() => console.log('[Dismiss] Component dismissed')}>
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
    typescript: `import {Banner} from '@shopify/polaris';
import React, {useState} from 'react';

interface BannerProps {
  title: string;
  children: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

function Banner({ 
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
}`
  },
  critical: {
    react: `import {Banner, Link} from '@shopify/polaris';
import React from 'react';

function Banner() {
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

function Banner() {
  return (
    <Banner
      title="Your shipping label is ready to print."
      tone="success"
      action={{content: 'Print label'}}
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
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

function Banner() {
  return (
    <Banner onDismiss={() => console.log('[Dismiss] Component dismissed')}>
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

function Banner() {
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

function Banner() {
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

function Banner() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <TextContainer>
        <Banner onDismiss={() => console.log('[Dismiss] Component dismissed')}>
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
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
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

function Banner() {
  return (
    <Banner
      title="Some of your product variants are missing weights"
      tone="warning"
      action={{content: 'Edit variant weights', url: ''}}
      secondaryAction={{content: 'Learn more', url: ''}}
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
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

function Select() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-select-field">
  <label for="date-range" class="polaris-select-field__label">Date range</label>
  <div class="polaris-select-field__wrapper">
    <select id="date-range" class="polaris-select-field__select">
      <option value="today" selected>Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="lastWeek">Last 7 days</option>
    </select>
    <div class="polaris-select-field__icon">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</div>


<script>
const select = document.getElementById('date-range');
select.addEventListener('change', (event) => {
  console.log('Selected:', event.target.value);
});
</script>`,
    typescript: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  options?: SelectOption[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function Select({ 
  label = 'Date range',
  options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ],
  defaultValue = 'today',
  onValueChange
}: SelectProps): JSX.Element {
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

function ValidationError() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-select-field select-field--error">
  <label for="province" class="polaris-select-field__label">Province</label>
  <div class="polaris-select-field__wrapper">
    <select 
      id="province" 
      class="polaris-select-field__select select-field__select--error"
      aria-invalid="true"
      aria-describedby="province-error"
    >
      <option value="">Select a province</option>
      <option value="Alberta">Alberta</option>
    </select>
    <div class="polaris-select-field__icon">
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
  <div id="province-error" class="polaris-select-field__error">
    Province is required
  </div>
</div>


<script>
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
});
</script>`,
    typescript: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ValidationErrorExampleProps {
  label?: string;
  options?: string[];
  errorMessage?: string;
  required?: boolean;
}

function ValidationError({ 
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
  },
  disabled: {
    react: `import {Select} from '@shopify/polaris';
import React from 'react';

function Select() {
  return (
    <Select
      label="Date range"
      disabled
      options={[
        {label: 'Today', value: 'today'},
        {label: 'Yesterday', value: 'yesterday'},
        {label: 'Last 7 days', value: 'lastWeek'},
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Date range',
  disabled: true,
  store: {
    fields: ['label', 'value'],
    data: [
      { label: 'Today', value: 'today' },
      { label: 'Yesterday', value: 'yesterday' },
      { label: 'Last 7 days', value: 'lastWeek' }
    ]
  },
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  cls: 'polaris-select',
  labelAlign: 'top',
  labelCls: 'polaris-label',
  width: 300
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-layout">
  <div class="polaris-select">
    <label class="polaris-label" for="date-range-select">Date range</label>
    <select 
      id="date-range-select"
      class="polaris-select__input" 
      disabled
      aria-describedby="date-range-help"
    >
      <option value="">Select date range</option>
      <option value="today">Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="lastWeek">Last 7 days</option>
    </select>
  </div>
</div>

<script>
// JavaScript behavior (minimal for disabled select)
const select = document.getElementById('date-range-select');
console.log('Select is disabled:', select.disabled);
</script>`,
    typescript: `import {Select} from '@shopify/polaris';
import React from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface DisabledSelectProps {
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
}

function DisabledSelect({ 
  label = "Date range",
  options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ],
  placeholder = "Select date range"
}: DisabledSelectProps): JSX.Element {
  return (
    <Select
      label={label}
      disabled
      options={options}
      placeholder={placeholder}
    />
  );
}`
  },
  'with-inline-label': {
    react: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function InlineLabelExample() {
  const [selected, setSelected] = useState('newestUpdate');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    {label: 'Newest update', value: 'newestUpdate'},
    {label: 'Oldest update', value: 'oldestUpdate'},
    {label: 'Most spent', value: 'mostSpent'},
    {label: 'Most orders', value: 'mostOrders'},
    {label: 'Last name A–Z', value: 'lastNameAlpha'},
    {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
  ];

  return (
    <Select
      label="Sort by"
      labelInline
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Sort by',
  labelAlign: 'left',
  labelWidth: 60,
  value: 'newestUpdate',
  store: {
    fields: ['label', 'value'],
    data: [
      { label: 'Newest update', value: 'newestUpdate' },
      { label: 'Oldest update', value: 'oldestUpdate' },
      { label: 'Most spent', value: 'mostSpent' },
      { label: 'Most orders', value: 'mostOrders' },
      { label: 'Last name A–Z', value: 'lastNameAlpha' },
      { label: 'Last name Z–A', value: 'lastNameReverseAlpha' }
    ]
  },
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  cls: 'polaris-select polaris-select--inline-label',
  width: 300,
  listeners: {
    change: function(field, newValue) {
      console.log('Sort order changed to:', newValue);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-layout">
  <div class="polaris-select polaris-select--inline-label">
    <label class="polaris-label polaris-label--inline" for="sort-select">Sort by</label>
    <select 
      id="sort-select"
      class="polaris-select__input" 
      aria-describedby="sort-select-help"
    >
      <option value="newestUpdate" selected>Newest update</option>
      <option value="oldestUpdate">Oldest update</option>
      <option value="mostSpent">Most spent</option>
      <option value="mostOrders">Most orders</option>
      <option value="lastNameAlpha">Last name A–Z</option>
      <option value="lastNameReverseAlpha">Last name Z–A</option>
    </select>
  </div>
</div>

<script>
// JavaScript behavior
const sortSelect = document.getElementById('sort-select');

sortSelect.addEventListener('change', (event) => {
  const value = event.target.value;
  console.log('Sort order changed to:', value);
});
</script>`,
    typescript: `import {Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface SortOption {
  label: string;
  value: string;
}

interface InlineLabelSelectProps {
  label?: string;
  initialValue?: string;
  options?: SortOption[];
  onSelectionChange?: (value: string) => void;
}

function InlineLabelSelect({
  label = "Sort by",
  initialValue = "newestUpdate",
  options = [
    {label: 'Newest update', value: 'newestUpdate'},
    {label: 'Oldest update', value: 'oldestUpdate'},
    {label: 'Most spent', value: 'mostSpent'},
    {label: 'Most orders', value: 'mostOrders'},
    {label: 'Last name A–Z', value: 'lastNameAlpha'},
    {label: 'Last name Z–A', value: 'lastNameReverseAlpha'},
  ],
  onSelectionChange
}: InlineLabelSelectProps): JSX.Element {
  const [selected, setSelected] = useState<string>(initialValue);

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelected(value);
      onSelectionChange?.(value);
    },
    [onSelectionChange],
  );

  return (
    <Select
      label={label}
      labelInline
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}`
  },
  'with-prefix': {
    react: `import {Icon, Select} from '@shopify/polaris';
import {CaretUpIcon, CaretDownIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function Prefix() {
  const [selected, setSelected] = useState('enabled');

  const handleSelectChange = useCallback(
    (value: string) => setSelected(value),
    [],
  );

  const options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={CaretUpIcon} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={CaretDownIcon} />,
    },
  ];

  return (
    <Select
      label="Permission"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Permission',
  value: 'enabled',
  store: {
    fields: ['label', 'value', 'icon'],
    data: [
      { label: 'Increase', value: 'Increase', icon: '↑' },
      { label: 'Decrease', value: 'Decrease', icon: '↓' }
    ]
  },
  displayField: 'label',
  valueField: 'value',
  queryMode: 'local',
  cls: 'polaris-select polaris-select--with-prefix',
  labelAlign: 'top',
  labelCls: 'polaris-label',
  width: 300,
  listConfig: {
    itemTpl: '<div class="option-with-icon"><span class="option-icon">{icon}</span> {label}</div>'
  },
  listeners: {
    change: function(field, newValue) {
      console.log('Permission changed to:', newValue);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-layout">
  <div class="polaris-select">
    <label class="polaris-label" for="permission-select">Permission</label>
    <select 
      id="permission-select"
      class="polaris-select__input polaris-select__input--with-prefix" 
      aria-describedby="permission-select-help"
    >
      <option value="">Select permission</option>
      <option value="Increase" data-prefix="↑">Increase</option>
      <option value="Decrease" data-prefix="↓">Decrease</option>
    </select>
  </div>
</div>

<script>
// JavaScript behavior
const permissionSelect = document.getElementById('permission-select');

permissionSelect.addEventListener('change', (event) => {
  const value = event.target.value;
  const selectedOption = event.target.options[event.target.selectedIndex];
  const prefix = selectedOption.getAttribute('data-prefix');
  
  console.log('Permission changed to:', value);
  console.log('With prefix:', prefix);
});

// Set initial value
permissionSelect.value = 'enabled';
</script>`,
    typescript: `import {Icon, Select} from '@shopify/polaris';
import {CaretUpIcon, CaretDownIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

interface PrefixOption {
  label: string;
  value: string;
  prefix?: React.ReactNode;
}

interface PrefixSelectProps {
  label?: string;
  initialValue?: string;
  options?: PrefixOption[];
  onSelectionChange?: (value: string) => void;
}

function PrefixSelect({
  label = "Permission",
  initialValue = "enabled",
  options = [
    {
      label: 'Increase',
      value: 'Increase',
      prefix: <Icon source={CaretUpIcon} />,
    },
    {
      label: 'Decrease',
      value: 'Decrease',
      prefix: <Icon source={CaretDownIcon} />,
    },
  ],
  onSelectionChange
}: PrefixSelectProps): JSX.Element {
  const [selected, setSelected] = useState<string>(initialValue);

  const handleSelectChange = useCallback(
    (value: string) => {
      setSelected(value);
      onSelectionChange?.(value);
    },
    [onSelectionChange],
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
  'with-separate-validation-error': {
    react: `import {
  LegacyStack,
  FormLayout,
  TextField,
  Select,
  InlineError,
  LegacyCard,
  Link,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function SeparateValidationError() {
  const [weight, setWeight] = useState('12');
  const [unit, setUnit] = useState('');

  const handleWeightChange = useCallback(
    (value: string) => setWeight(value),
    [],
  );
  const handleUnitChange = useCallback((value: string) => setUnit(value), []);

  const unitSelectID = 'unit';
  const errorMessage = generateErrorMessage();
  const formGroupMarkup = (
    <LegacyStack vertical spacing="extraTight">
      <FormLayout>
        <FormLayout.Group condensed>
          <TextField
            label="Product weight"
            type="number"
            value={weight}
            onChange={handleWeightChange}
            error={Boolean(!weight && unit)}
            autoComplete="off"
          />
          <Select
            id={unitSelectID}
            label="Unit of measure"
            placeholder="Select"
            options={['oz', 'g', 'kg', 'lb']}
            value={unit}
            onChange={handleUnitChange}
            error={Boolean(!unit && weight)}
          />
        </FormLayout.Group>
      </FormLayout>
      <InlineError message={errorMessage} fieldID={unitSelectID} />
    </LegacyStack>
  );

  return <LegacyCard sectioned>{formGroupMarkup}</LegacyCard>;

  function generateErrorMessage() {
    const weightError =
      !weight && unit ? 'The numeric weight of the product ' : '';
    const unitError =
      !unit && weight ? 'The unit of measure for the product weight' : '';

    if (!weightError && !unitError) {
      return '';
    }

    return (
      <span>
        <Text tone="critical" as="span">
          <p>
            {\`\${weightError}\${unitError} is required when weight based shipping rates are enabled. \`}
            <Link>Manage shipping</Link>
          </p>
        </Text>
      </span>
    );
  }
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product Weight',
  bodyPadding: 16,
  cls: 'polaris-card',
  shadow: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    defaults: {
      margin: '0 8 0 0'
    },
    items: [{
      xtype: 'numberfield',
      fieldLabel: 'Product weight',
      name: 'weight',
      value: 12,
      flex: 1,
      labelAlign: 'top',
      labelCls: 'polaris-label',
      cls: 'polaris-text-field',
      listeners: {
        change: function(field, newValue) {
          var unitField = field.up('panel').down('[name=unit]');
          var errorField = field.up('panel').down('[name=errorMessage]');
          
          if (!newValue && unitField.getValue()) {
            field.markInvalid('Weight is required when unit is selected');
            errorField.update('The numeric weight of the product is required when weight based shipping rates are enabled.');
          } else {
            field.clearInvalid();
            errorField.update('');
          }
        }
      }
    }, {
      xtype: 'combobox',
      fieldLabel: 'Unit of measure',
      name: 'unit',
      emptyText: 'Select',
      store: ['oz', 'g', 'kg', 'lb'],
      flex: 1,
      labelAlign: 'top',
      labelCls: 'polaris-label',
      cls: 'polaris-select',
      listeners: {
        change: function(field, newValue) {
          var weightField = field.up('panel').down('[name=weight]');
          var errorField = field.up('panel').down('[name=errorMessage]');
          
          if (!weightField.getValue() && newValue) {
            field.markInvalid('Unit requires weight');
            errorField.update('The numeric weight of the product is required when weight based shipping rates are enabled.');
          } else if (weightField.getValue() && !newValue) {
            field.markInvalid('Weight requires unit');
            errorField.update('The unit of measure for the product weight is required when weight based shipping rates are enabled.');
          } else {
            field.clearInvalid();
            errorField.update('');
          }
        }
      }
    }]
  }, {
    xtype: 'component',
    name: 'errorMessage',
    cls: 'polaris-inline-error',
    html: ''
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <div class="polaris-form-layout">
      <div class="polaris-form-layout__group polaris-form-layout__group--condensed">
        <div class="polaris-text-field">
          <label class="polaris-label" for="product-weight">Product weight</label>
          <input 
            id="product-weight"
            class="polaris-text-field__input" 
            type="number" 
            value="12"
            aria-describedby="weight-error"
          />
        </div>
        
        <div class="polaris-select">
          <label class="polaris-label" for="unit-select">Unit of measure</label>
          <select 
            id="unit-select"
            class="polaris-select__input"
            aria-describedby="unit-error"
          >
            <option value="">Select</option>
            <option value="oz">oz</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
      </div>
      
      <div class="polaris-inline-error" id="validation-error" style="display: none;">
        <span class="polaris-text--critical">
          <p id="error-message">
            <a href="#" class="polaris-link">Manage shipping</a>
          </p>
        </span>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const weightInput = document.getElementById('product-weight');
const unitSelect = document.getElementById('unit-select');
const errorDiv = document.getElementById('validation-error');
const errorMessage = document.getElementById('error-message');

function validateFields() {
  const weight = weightInput.value;
  const unit = unitSelect.value;
  
  let error = '';
  
  if (!weight && unit) {
    error = 'The numeric weight of the product is required when weight based shipping rates are enabled. ';
  } else if (!unit && weight) {
    error = 'The unit of measure for the product weight is required when weight based shipping rates are enabled. ';
  }
  
  if (error) {
    errorMessage.innerHTML = error + '<a href="#" class="polaris-link">Manage shipping</a>';
    errorDiv.style.display = 'block';
  } else {
    errorDiv.style.display = 'none';
  }
}

weightInput.addEventListener('input', validateFields);
unitSelect.addEventListener('change', validateFields);
</script>`,
    typescript: `import {
  LegacyStack,
  FormLayout,
  TextField,
  Select,
  InlineError,
  LegacyCard,
  Link,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ValidationError {
  weightError: string;
  unitError: string;
}

interface SeparateValidationProps {
  initialWeight?: string;
  initialUnit?: string;
  onWeightChange?: (weight: string) => void;
  onUnitChange?: (unit: string) => void;
}

function SeparateValidationError({
  initialWeight = '12',
  initialUnit = '',
  onWeightChange,
  onUnitChange
}: SeparateValidationProps): JSX.Element {
  const [weight, setWeight] = useState<string>(initialWeight);
  const [unit, setUnit] = useState<string>(initialUnit);

  const handleWeightChange = useCallback(
    (value: string) => {
      setWeight(value);
      onWeightChange?.(value);
    },
    [onWeightChange],
  );

  const handleUnitChange = useCallback(
    (value: string) => {
      setUnit(value);
      onUnitChange?.(value);
    }, 
    [onUnitChange]
  );

  const unitSelectID = 'unit';
  
  const generateErrorMessage = (): React.ReactNode => {
    const weightError =
      !weight && unit ? 'The numeric weight of the product ' : '';
    const unitError =
      !unit && weight ? 'The unit of measure for the product weight' : '';

    if (!weightError && !unitError) {
      return '';
    }

    return (
      <span>
        <Text tone="critical" as="span">
          <p>
            {\`\${weightError}\${unitError} is required when weight based shipping rates are enabled. \`}
            <Link>Manage shipping</Link>
          </p>
        </Text>
      </span>
    );
  };

  const errorMessage = generateErrorMessage();
  
  const formGroupMarkup = (
    <LegacyStack vertical spacing="extraTight">
      <FormLayout>
        <FormLayout.Group condensed>
          <TextField
            label="Product weight"
            type="number"
            value={weight}
            onChange={handleWeightChange}
            error={Boolean(!weight && unit)}
            autoComplete="off"
          />
          <Select
            id={unitSelectID}
            label="Unit of measure"
            placeholder="Select"
            options={['oz', 'g', 'kg', 'lb']}
            value={unit}
            onChange={handleUnitChange}
            error={Boolean(!unit && weight)}
          />
        </FormLayout.Group>
      </FormLayout>
      <InlineError message={errorMessage} fieldID={unitSelectID} />
    </LegacyStack>
  );

  return <LegacyCard sectioned>{formGroupMarkup}</LegacyCard>;
}`
  }
};

// Modal Examples
export const modalExamples = {
  default: {
    react: `import {Button, Frame, Modal, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function Modal() {
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

function Modal({ 
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

// Checkbox Examples
export const checkboxExamples = {
  default: {
    react: `import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function Checkbox() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-checkbox-field">
  <input 
    type="checkbox" 
    id="basic-checkbox" 
    class="polaris-checkbox-field__input"
  />
  <label for="basic-checkbox" class="polaris-checkbox-field__label">
    <span class="polaris-checkbox-field__box">
      <svg class="polaris-checkbox-field__icon" viewBox="0 0 16 16" aria-hidden="true">
        <path d="M13.527 3.84a1 1 0 0 1 0 1.414l-6.5 6.5a1 1 0 0 1-1.414 0l-2.5-2.5a1 1 0 1 1 1.414-1.414l1.793 1.793 5.793-5.793a1 1 0 0 1 1.414 0Z" fill="currentColor"/>
      </svg>
    </span>
    <span class="polaris-checkbox-field__text">Basic checkbox</span>
  </label>
</div>


<script>
const checkbox = document.getElementById('basic-checkbox');
checkbox.addEventListener('change', (event) => {
  console.log('Checkbox changed to:', event.target.checked);
});
</script>`,
    typescript: `import {Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({ 
  label = 'Basic checkbox',
  defaultChecked = false,
  onCheckChange,
  disabled = false
}: CheckboxProps): JSX.Element {
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

function Page() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page__header">
    <div class="polaris-page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="polaris-icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Products
      </a>
    </div>
    <div class="polaris-page__title-wrapper">
      <h1 class="polaris-page__title">
        3/4 inch Leather pet collar
        <span class="polaris-badge badge--success">Paid</span>
      </h1>
      <p class="polaris-page__subtitle">Perfect for any pet</p>
    </div>
    <div class="polaris-page__actions">
      <div class="polaris-page__secondary-actions">
        <button class="button button--secondary">Duplicate</button>
        <button class="button button--secondary">View on your store</button>
        <div class="dropdown">
          <button class="button button--secondary dropdown-toggle">
            Promote
            <svg class="polaris-icon" viewBox="0 0 20 20">
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
  <div class="polaris-page__content">
    <div class="polaris-card">
      <div class="polaris-card__header">
        <h2 class="polaris-card__title">Credit card</h2>
      </div>
      <div class="polaris-card__body">
        <p>Credit card information</p>
      </div>
    </div>
  </div>
  <div class="polaris-page__pagination">
    <button class="pagination__button">
      <svg class="polaris-icon" viewBox="0 0 20 20">
        <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
      Previous
    </button>
    <button class="pagination__button">
      Next
      <svg class="polaris-icon" viewBox="0 0 20 20">
        <path d="M8 4l6 6-6 6" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
    </button>
  </div>
</div>


<script>
document.querySelectorAll('.button').forEach(button => {
  if (!button.disabled) {
    button.addEventListener('click', () => {
      console.log(button.textContent + ' clicked');
    });
  }
});
</script>`,
    typescript: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface PageAction {
  content: string;
  accessibilityLabel?: string;
  onAction: () => void;
  disabled?: boolean;
}

interface PageProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  primaryAction?: PageAction;
  secondaryActions?: PageAction[];
  children: React.ReactNode;
}

function Page({
  title,
  subtitle,
  backUrl = '#',
  primaryAction,
  secondaryActions = [],
  children
}: PageProps): JSX.Element {
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

function Page() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page__header">
    <div class="polaris-page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="polaris-icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Products
      </a>
    </div>
    <div class="polaris-page__title-wrapper">
      <h1 class="polaris-page__title">Invoice</h1>
      <p class="polaris-page__subtitle">Statement period: May 3, 2019 to June 2, 2019</p>
    </div>
    <div class="polaris-page__actions">
      <button class="button button--secondary">
        <svg class="polaris-icon" viewBox="0 0 20 20">
          <path d="M10 3v10m0 0l-3-3m3 3l3-3M5 16h10" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Download
      </button>
    </div>
  </div>
  <div class="polaris-page__content">
    <div class="polaris-card">
      <div class="polaris-card__body card__body--section">
        <h2 class="polaris-card__title">Credit card</h2>
        <p>Credit card information</p>
      </div>
    </div>
  </div>
</div>`,
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
  },
  'full-width': {
    react: `import {Page, Card, Text, BlockStack} from '@shopify/polaris';
import {ExportIcon, PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

function Page() {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{
        content: 'Create order',
        icon: PlusIcon,
        accessibilityLabel: 'Create order',
      }}
      secondaryActions={[
        {accessibilityLabel: 'Export orders', icon: ExportIcon},
      ]}
      pagination={{
        hasNext: true,
      }}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Orders',
  layout: 'fit',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Export orders',
      iconCls: 'x-fa fa-download',
      handler: function() {
        console.log('Export orders');
      }
    }, {
      text: 'Create order',
      iconCls: 'x-fa fa-plus',
      ui: 'primary',
      handler: function() {
        console.log('Create order');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: ['->', {
      text: 'Next',
      iconCls: 'x-fa fa-arrow-right',
      iconAlign: 'right',
      handler: function() {
        console.log('Next page');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<h3>Credit card</h3><p>Credit card information</p>'
  }]
});`,
    vanilla: `<div class="page page--full-width">
  <div class="page__header">
    <div class="page__title-wrapper">
      <h1 class="page__title">Orders</h1>
    </div>
    <div class="page__actions">
      <button class="button button--secondary">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M10 15V3m-6 6l6-6 6 6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Export orders
      </button>
      <button class="button button--primary">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M10 5v10m-5-5h10" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Create order
      </button>
    </div>
  </div>
  <div class="page__content">
    <div class="card">
      <div class="card__body">
        <h2 class="card__title">Credit card</h2>
        <p>Credit card information</p>
      </div>
    </div>
  </div>
  <div class="page__pagination">
    <button class="pagination__button">
      Next
      <svg class="icon" viewBox="0 0 20 20">
        <path d="M8 4l6 6-6 6" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
    </button>
  </div>
</div>

<script>
document.querySelectorAll('.button, .pagination__button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, Card, Text, BlockStack} from '@shopify/polaris';
import {ExportIcon, PlusIcon} from '@shopify/polaris-icons';
import React from 'react';

interface PageFullWidthExampleProps {
  onCreateOrder?: () => void;
  onExportOrders?: () => void;
  onNext?: () => void;
}

function PageFullWidthExample({
  onCreateOrder,
  onExportOrders,
  onNext
}: PageFullWidthExampleProps): JSX.Element {
  return (
    <Page
      fullWidth
      title="Orders"
      primaryAction={{
        content: 'Create order',
        icon: PlusIcon,
        accessibilityLabel: 'Create order',
        onAction: onCreateOrder
      }}
      secondaryActions={[
        {
          accessibilityLabel: 'Export orders',
          icon: ExportIcon,
          onAction: onExportOrders
        },
      ]}
      pagination={{
        hasNext: true,
        onNext
      }}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
    </Page>
  );
}`
  },
  'narrow-width': {
    react: `import {Page, PageActions, Card, Text, BlockStack} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

function Page() {
  return (
    <Page
      narrowWidth
      backAction={{content: 'Orders', url: '#'}}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: true}}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
      <PageActions
        primaryAction={{content: 'Save', disabled: true}}
        secondaryActions={[{content: 'Delete', icon: DeleteIcon}]}
      />
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Add payment method',
  width: 600,
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Orders',
      handler: function() {
        console.log('Back to orders');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: 'Delete',
      iconCls: 'x-fa fa-trash',
      handler: function() {
        console.log('Delete payment method');
      }
    }, '->', {
      text: 'Save',
      ui: 'primary',
      disabled: true,
      handler: function() {
        console.log('Save payment method');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<h3>Credit card</h3><p>Credit card information</p>'
  }]
});`,
    vanilla: `<div class="page page--narrow-width">
  <div class="page__header">
    <div class="page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Orders
      </a>
    </div>
    <div class="page__title-wrapper">
      <h1 class="page__title">Add payment method</h1>
    </div>
  </div>
  <div class="page__content">
    <div class="card">
      <div class="card__body">
        <h2 class="card__title">Credit card</h2>
        <p>Credit card information</p>
      </div>
    </div>
  </div>
  <div class="page__actions">
    <button class="button button--secondary">
      <svg class="icon" viewBox="0 0 20 20">
        <path d="M3 7v10a2 2 0 002 2h9a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" stroke="currentColor" fill="none" stroke-width="2"/>
      </svg>
      Delete
    </button>
    <button class="button button--primary" disabled>Save</button>
  </div>
</div>

<script>
document.querySelectorAll('.button:not([disabled])').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, PageActions, Card, Text, BlockStack} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

interface PageNarrowWidthExampleProps {
  onBack?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  isValid?: boolean;
}

function PageNarrowWidthExample({
  onBack,
  onSave,
  onDelete,
  isValid = false
}: PageNarrowWidthExampleProps): JSX.Element {
  return (
    <Page
      narrowWidth
      backAction={{content: 'Orders', onAction: onBack}}
      title="Add payment method"
      primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
    >
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingSm">
            Credit card
          </Text>
          <Text as="p" variant="bodyMd">
            Credit card information
          </Text>
        </BlockStack>
      </Card>
      <PageActions
        primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
        secondaryActions={[{content: 'Delete', icon: DeleteIcon, onAction: onDelete}]}
      />
    </Page>
  );
}`
  },
  'with-action-groups': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      title="Products"
      actionGroups={[
        {
          title: 'Copy',
          onClick: (openActions) => {
            alert('Copy action');
            openActions();
          },
          actions: [{content: 'Copy to clipboard'}],
        },
        {
          title: 'Promote',
          disabled: true,
          actions: [{content: 'Share on Facebook'}],
        },
        {
          title: 'More actions',
          actions: [
            {content: 'Duplicate'},
            {content: 'Print'},
            {content: 'Unarchive'},
            {content: 'Cancel order'},
          ],
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Products',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Copy',
      menu: [{
        text: 'Copy to clipboard',
        handler: function() {
          console.log('Copy to clipboard');
        }
      }]
    }, {
      text: 'Promote',
      disabled: true,
      menu: [{
        text: 'Share on Facebook',
        handler: function() {
          console.log('Share on Facebook');
        }
      }]
    }, {
      text: 'More actions',
      menu: [{
        text: 'Duplicate',
        handler: function() {
          console.log('Duplicate');
        }
      }, {
        text: 'Print',
        handler: function() {
          console.log('Print');
        }
      }, {
        text: 'Unarchive',
        handler: function() {
          console.log('Unarchive');
        }
      }, {
        text: 'Cancel order',
        handler: function() {
          console.log('Cancel order');
        }
      }]
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Credit card',
    bodyPadding: 16,
    html: '<p>Credit card information</p>'
  }]
});`,
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__title-wrapper">
      <h1 class="page__title">Products</h1>
    </div>
    <div class="page__action-groups">
      <div class="action-group">
        <button class="button button--secondary action-group__button">
          Copy
          <svg class="icon" viewBox="0 0 20 20">
            <path d="M6 10l3 3 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
          </svg>
        </button>
        <div class="action-group__menu">
          <button class="menu-item">Copy to clipboard</button>
        </div>
      </div>
      <div class="action-group">
        <button class="button button--secondary action-group__button" disabled>
          Promote
          <svg class="icon" viewBox="0 0 20 20">
            <path d="M6 10l3 3 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
          </svg>
        </button>
        <div class="action-group__menu">
          <button class="menu-item">Share on Facebook</button>
        </div>
      </div>
      <div class="action-group">
        <button class="button button--secondary action-group__button">
          More actions
          <svg class="icon" viewBox="0 0 20 20">
            <path d="M6 10l3 3 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
          </svg>
        </button>
        <div class="action-group__menu">
          <button class="menu-item">Duplicate</button>
          <button class="menu-item">Print</button>
          <button class="menu-item">Unarchive</button>
          <button class="menu-item">Cancel order</button>
        </div>
      </div>
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

<script>
document.querySelectorAll('.action-group__button').forEach(button => {
  button.addEventListener('click', (e) => {
    const menu = e.currentTarget.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
});

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent} clicked\`);
    e.target.closest('.action-group__menu').style.display = 'none';
  });
});
</script>`,
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface ActionGroup {
  title: string;
  disabled?: boolean;
  onClick?: (openActions: () => void) => void;
  actions: Array<{
    content: string;
    onAction?: () => void;
  }>;
}

interface PageWithActionGroupsExampleProps {
  actionGroups?: ActionGroup[];
  onActionClick?: (action: string) => void;
}

function PageWithActionGroupsExample({
  actionGroups = [
    {
      title: 'Copy',
      onClick: (openActions) => {
        alert('Copy action');
        openActions();
      },
      actions: [{content: 'Copy to clipboard'}],
    },
    {
      title: 'Promote',
      disabled: true,
      actions: [{content: 'Share on Facebook'}],
    },
    {
      title: 'More actions',
      actions: [
        {content: 'Duplicate'},
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ],
    },
  ],
  onActionClick
}: PageWithActionGroupsExampleProps): JSX.Element {
  const enhancedActionGroups = actionGroups.map(group => ({
    ...group,
    actions: group.actions.map(action => ({
      ...action,
      onAction: action.onAction || (() => onActionClick?.(action.content))
    }))
  }));

  return (
    <Page
      title="Products"
      actionGroups={enhancedActionGroups}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-content-after-title': {
    react: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Products', url: '#'}}
      title="Jar With Lock-Lid"
      titleMetadata={<Badge tone="attention">Verified</Badge>}
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {content: 'Duplicate'},
        {content: 'View on your store'},
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
  title: 'Jar With Lock-Lid',
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
      text: 'Verified',
      style: 'background: #FEF3C7; color: #92400E; padding: 2px 8px; border-radius: 4px; font-size: 12px;'
    }, '->', {
      text: 'Duplicate',
      handler: function() {
        console.log('Duplicate product');
      }
    }, {
      text: 'View on your store',
      handler: function() {
        console.log('View on store');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      disabled: true,
      handler: function() {
        console.log('Save product');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: 'Previous',
      iconCls: 'x-fa fa-arrow-left',
      handler: function() {
        console.log('Previous page');
      }
    }, '->', {
      text: 'Next',
      iconCls: 'x-fa fa-arrow-right',
      iconAlign: 'right',
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
    vanilla: `<div class="page">
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
        Jar With Lock-Lid
        <span class="badge badge--attention">Verified</span>
      </h1>
    </div>
    <div class="page__actions">
      <button class="button button--secondary">Duplicate</button>
      <button class="button button--secondary">View on your store</button>
      <button class="button button--primary" disabled>Save</button>
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

<script>
document.querySelectorAll('.button:not([disabled]), .pagination__button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, Badge, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface PageWithContentAfterTitleExampleProps {
  title?: string;
  metadataText?: string;
  metadataTone?: 'attention' | 'success' | 'warning' | 'critical';
  onBack?: () => void;
  onSave?: () => void;
  onDuplicate?: () => void;
  onViewOnStore?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isValid?: boolean;
}

function PageWithContentAfterTitleExample({
  title = "Jar With Lock-Lid",
  metadataText = "Verified",
  metadataTone = "attention",
  onBack,
  onSave,
  onDuplicate,
  onViewOnStore,
  onPrevious,
  onNext,
  isValid = false
}: PageWithContentAfterTitleExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Products', onAction: onBack}}
      title={title}
      titleMetadata={<Badge tone={metadataTone}>{metadataText}</Badge>}
      primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
      secondaryActions={[
        {content: 'Duplicate', onAction: onDuplicate},
        {content: 'View on your store', onAction: onViewOnStore},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
        onPrevious,
        onNext
      }}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-custom-primary-action': {
    react: `import {Page, Button, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Settings', url: '#'}}
      title="General"
      primaryAction={<Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Settings',
      handler: function() {
        console.log('Back to settings');
      }
    }, '->', {
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
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
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Settings
      </a>
    </div>
    <div class="page__title-wrapper">
      <h1 class="page__title">General</h1>
    </div>
    <div class="page__actions">
      <button class="button button--primary">Save</button>
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

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, Button, LegacyCard} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageWithCustomPrimaryActionExampleProps {
  title?: string;
  onBack?: () => void;
  onSave?: () => void;
  customPrimaryAction?: ReactElement;
}

function PageWithCustomPrimaryActionExample({
  title = "General",
  onBack,
  onSave,
  customPrimaryAction
}: PageWithCustomPrimaryActionExampleProps): JSX.Element {
  const primaryAction = customPrimaryAction || (
    <Button variant="primary" onClick={onSave}>
      Save
    </Button>
  );

  return (
    <Page
      backAction={{content: 'Settings', onAction: onBack}}
      title={title}
      primaryAction={primaryAction}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-custom-secondary-action': {
    react: `import {Page, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page title="General" secondaryActions={<Button>Save</Button>}>
      <p>Page content</p>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      xtype: 'button',
      text: 'Save',
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }],
  bodyPadding: 16,
  html: '<p>Page content</p>'
});`,
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__title-wrapper">
      <h1 class="page__title">General</h1>
    </div>
    <div class="page__actions">
      <button class="button button--secondary">Save</button>
    </div>
  </div>
  <div class="page__content">
    <p>Page content</p>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, Button} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageWithCustomSecondaryActionExampleProps {
  title?: string;
  onSave?: () => void;
  customSecondaryAction?: ReactElement;
  children?: React.ReactNode;
}

function PageWithCustomSecondaryActionExample({
  title = "General",
  onSave,
  customSecondaryAction,
  children = <p>Page content</p>
}: PageWithCustomSecondaryActionExampleProps): JSX.Element {
  const secondaryAction = customSecondaryAction || (
    <Button onClick={onSave}>Save</Button>
  );

  return (
    <Page title={title} secondaryActions={secondaryAction}>
      {children}
    </Page>
  );
}`
  },
  'with-destructive-secondary-action': {
    react: `import {Page} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

function Page() {
  return (
    <Page
      title="General"
      secondaryActions={[
        {content: 'Delete', destructive: true, icon: DeleteIcon},
      ]}
    >
      <p>Page content</p>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Delete',
      iconCls: 'x-fa fa-trash',
      ui: 'destructive',
      handler: function() {
        console.log('Delete clicked');
      }
    }]
  }],
  bodyPadding: 16,
  html: '<p>Page content</p>'
});`,
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__title-wrapper">
      <h1 class="page__title">General</h1>
    </div>
    <div class="page__actions">
      <button class="button button--destructive">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M3 7v10a2 2 0 002 2h9a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Delete
      </button>
    </div>
  </div>
  <div class="page__content">
    <p>Page content</p>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page} from '@shopify/polaris';
import React from 'react';
import {DeleteIcon} from '@shopify/polaris-icons';

interface PageWithDestructiveSecondaryActionExampleProps {
  title?: string;
  onDelete?: () => void;
  children?: React.ReactNode;
}

function PageWithDestructiveSecondaryActionExample({
  title = "General",
  onDelete,
  children = <p>Page content</p>
}: PageWithDestructiveSecondaryActionExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          icon: DeleteIcon,
          onAction: onDelete
        },
      ]}
    >
      {children}
    </Page>
  );
}`
  },
  'with-external-link': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import {ExternalIcon} from '@shopify/polaris-icons';
import React from 'react';

function Page() {
  return (
    <Page
      title="Jar With Lock-Lid"
      primaryAction={{content: 'Save', disabled: true}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalIcon,
          url: 'https://www.facebook.com/business/learn/facebook-page-build-audience',
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Jar With Lock-Lid',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Promote',
      iconCls: 'x-fa fa-external-link',
      handler: function() {
        window.open('https://www.facebook.com/business/learn/facebook-page-build-audience', '_blank');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      disabled: true,
      handler: function() {
        console.log('Save clicked');
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
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__title-wrapper">
      <h1 class="page__title">Jar With Lock-Lid</h1>
    </div>
    <div class="page__actions">
      <a href="https://www.facebook.com/business/learn/facebook-page-build-audience" 
         target="_blank" 
         rel="noopener noreferrer"
         class="button button--secondary">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Promote
      </a>
      <button class="button button--primary" disabled>Save</button>
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

<script>
document.querySelectorAll('.button:not([disabled])').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import {ExternalIcon} from '@shopify/polaris-icons';
import React from 'react';

interface PageWithExternalLinkExampleProps {
  title?: string;
  onSave?: () => void;
  externalUrl?: string;
  isValid?: boolean;
}

function PageWithExternalLinkExample({
  title = "Jar With Lock-Lid",
  onSave,
  externalUrl = "https://www.facebook.com/business/learn/facebook-page-build-audience",
  isValid = false
}: PageWithExternalLinkExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={{content: 'Save', disabled: !isValid, onAction: onSave}}
      secondaryActions={[
        {
          content: 'Promote',
          external: true,
          icon: ExternalIcon,
          url: externalUrl,
        },
      ]}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'with-tooltip-action': {
    react: `import {Page} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      title="Product"
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Import',
          disabled: true,
          helpText: 'You need permission to import products.',
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Product',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: ['->', {
      text: 'Import',
      disabled: true,
      tooltip: 'You need permission to import products.',
      handler: function() {
        console.log('Import clicked');
      }
    }, {
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
      }
    }]
  }]
});`,
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__title-wrapper">
      <h1 class="page__title">Product</h1>
    </div>
    <div class="page__actions">
      <button class="button button--secondary" 
              disabled 
              title="You need permission to import products.">
        Import
      </button>
      <button class="button button--primary">Save</button>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.button:not([disabled])').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page} from '@shopify/polaris';
import React from 'react';

interface PageWithTooltipActionExampleProps {
  title?: string;
  onSave?: () => void;
  onImport?: () => void;
  canImport?: boolean;
  importHelpText?: string;
}

function PageWithTooltipActionExample({
  title = "Product",
  onSave,
  onImport,
  canImport = false,
  importHelpText = "You need permission to import products."
}: PageWithTooltipActionExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={{
        content: 'Save',
        onAction: onSave
      }}
      secondaryActions={[
        {
          content: 'Import',
          disabled: !canImport,
          helpText: importHelpText,
          onAction: onImport
        },
      ]}
    />
  );
}`
  },
  'without-pagination': {
    react: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Settings', url: '#'}}
      title="General"
      primaryAction={{content: 'Save'}}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'General',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Settings',
      handler: function() {
        console.log('Back to settings');
      }
    }, '->', {
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
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
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Settings
      </a>
    </div>
    <div class="page__title-wrapper">
      <h1 class="page__title">General</h1>
    </div>
    <div class="page__actions">
      <button class="button button--primary">Save</button>
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

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface PageWithoutPaginationExampleProps {
  title?: string;
  onBack?: () => void;
  onSave?: () => void;
}

function PageWithoutPaginationExample({
  title = "General",
  onBack,
  onSave
}: PageWithoutPaginationExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Settings', onAction: onBack}}
      title={title}
      primaryAction={{content: 'Save', onAction: onSave}}
    >
      <LegacyCard title="Credit card" sectioned>
        <p>Credit card information</p>
      </LegacyCard>
    </Page>
  );
}`
  },
  'without-primary-action-in-header': {
    react: `import {Page, LegacyCard, LegacyStack, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <Page
      backAction={{content: 'Orders', url: '#'}}
      title="#1085"
      secondaryActions={[
        {content: 'Print'},
        {content: 'Unarchive'},
        {content: 'Cancel order'},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button variant="primary">Continue</Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: '#1085',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      text: '← Orders',
      handler: function() {
        console.log('Back to orders');
      }
    }, '->', {
      text: 'Print',
      handler: function() {
        console.log('Print');
      }
    }, {
      text: 'Unarchive',
      handler: function() {
        console.log('Unarchive');
      }
    }, {
      text: 'Cancel order',
      handler: function() {
        console.log('Cancel order');
      }
    }]
  }, {
    xtype: 'toolbar',
    dock: 'bottom',
    items: [{
      text: 'Previous',
      iconCls: 'x-fa fa-arrow-left',
      handler: function() {
        console.log('Previous');
      }
    }, '->', {
      text: 'Next',
      iconCls: 'x-fa fa-arrow-right',
      iconAlign: 'right',
      handler: function() {
        console.log('Next');
      }
    }]
  }],
  items: [{
    xtype: 'panel',
    title: 'Fulfill order',
    bodyPadding: 16,
    items: [{
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'middle'
      },
      items: [{
        xtype: 'component',
        flex: 1,
        html: '<p>Buy postage and ship remaining 2 items</p>'
      }, {
        xtype: 'button',
        text: 'Continue',
        ui: 'primary',
        handler: function() {
          console.log('Continue clicked');
        }
      }]
    }]
  }]
});`,
    vanilla: `<div class="page">
  <div class="page__header">
    <div class="page__breadcrumb">
      <a href="#" class="breadcrumb-link">
        <svg class="icon" viewBox="0 0 20 20">
          <path d="M12 16l-6-6 6-6" stroke="currentColor" fill="none" stroke-width="2"/>
        </svg>
        Orders
      </a>
    </div>
    <div class="page__title-wrapper">
      <h1 class="page__title">#1085</h1>
    </div>
    <div class="page__actions">
      <button class="button button--secondary">Print</button>
      <button class="button button--secondary">Unarchive</button>
      <button class="button button--secondary">Cancel order</button>
    </div>
  </div>
  <div class="page__content">
    <div class="card">
      <div class="card__body card__body--section">
        <h2 class="card__title">Fulfill order</h2>
        <div class="stack stack--horizontal stack--center">
          <div class="stack__item stack__item--fill">
            <p>Buy postage and ship remaining 2 items</p>
          </div>
          <div class="stack__item">
            <button class="button button--primary">Continue</button>
          </div>
        </div>
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

<script>
document.querySelectorAll('.button, .pagination__button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {Page, LegacyCard, LegacyStack, Button} from '@shopify/polaris';
import React from 'react';

interface PageWithoutPrimaryActionInHeaderExampleProps {
  orderNumber?: string;
  onBack?: () => void;
  onPrint?: () => void;
  onUnarchive?: () => void;
  onCancel?: () => void;
  onContinue?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

function PageWithoutPrimaryActionInHeaderExample({
  orderNumber = "#1085",
  onBack,
  onPrint,
  onUnarchive,
  onCancel,
  onContinue,
  onPrevious,
  onNext
}: PageWithoutPrimaryActionInHeaderExampleProps): JSX.Element {
  return (
    <Page
      backAction={{content: 'Orders', onAction: onBack}}
      title={orderNumber}
      secondaryActions={[
        {content: 'Print', onAction: onPrint},
        {content: 'Unarchive', onAction: onUnarchive},
        {content: 'Cancel order', onAction: onCancel},
      ]}
      pagination={{
        hasPrevious: true,
        hasNext: true,
        onPrevious,
        onNext
      }}
    >
      <LegacyCard sectioned title="Fulfill order">
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <p>Buy postage and ship remaining 2 items</p>
          </LegacyStack.Item>
          <Button variant="primary" onClick={onContinue}>
            Continue
          </Button>
        </LegacyStack>
      </LegacyCard>
    </Page>
  );
}`
  },
  'actions-default': {
    react: `import {PageActions} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    text: 'Delete',
    ui: 'destructive',
    handler: function() {
      console.log('Delete clicked');
    }
  }, '->', {
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `<div class="page-actions">
  <div class="page-actions__secondary">
    <button class="button button--destructive">Delete</button>
  </div>
  <div class="page-actions__primary">
    <button class="button button--primary">Save</button>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {PageActions} from '@shopify/polaris';
import React from 'react';

interface PageActionsDefaultExampleProps {
  onSave?: () => void;
  onDelete?: () => void;
}

function PageActionsDefaultExample({
  onSave,
  onDelete
}: PageActionsDefaultExampleProps): JSX.Element {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: onSave
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          onAction: onDelete
        },
      ]}
    />
  );
}`
  },
  'actions-primary-action-only': {
    react: `import {PageActions} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: ['->', {
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `<div class="page-actions">
  <div class="page-actions__primary">
    <button class="button button--primary">Save</button>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {PageActions} from '@shopify/polaris';
import React from 'react';

interface PageActionsPrimaryActionOnlyExampleProps {
  onSave?: () => void;
}

function PageActionsPrimaryActionOnlyExample({
  onSave
}: PageActionsPrimaryActionOnlyExampleProps): JSX.Element {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: onSave
      }}
    />
  );
}`
  },
  'actions-with-custom-primary-action': {
    react: `import {PageActions, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={<Button variant="primary" onClick={() => console.log('[Action] Save clicked')}>Save</Button>}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    text: 'Delete',
    ui: 'destructive',
    handler: function() {
      console.log('Delete clicked');
    }
  }, '->', {
    xtype: 'button',
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Save clicked');
    }
  }]
});`,
    vanilla: `<div class="page-actions">
  <div class="page-actions__secondary">
    <button class="button button--destructive">Delete</button>
  </div>
  <div class="page-actions__primary">
    <button class="button button--primary">Save</button>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {PageActions, Button} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageActionsWithCustomPrimaryActionExampleProps {
  onSave?: () => void;
  onDelete?: () => void;
  customPrimaryAction?: ReactElement;
}

function PageActionsWithCustomPrimaryActionExample({
  onSave,
  onDelete,
  customPrimaryAction
}: PageActionsWithCustomPrimaryActionExampleProps): JSX.Element {
  const primaryAction = customPrimaryAction || (
    <Button variant="primary" onClick={onSave}>Save</Button>
  );

  return (
    <PageActions
      primaryAction={primaryAction}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          onAction: onDelete
        },
      ]}
    />
  );
}`
  },
  'actions-with-custom-secondary-action': {
    react: `import {PageActions, Button} from '@shopify/polaris';
import React from 'react';

function Page() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={<Button>Save</Button>}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: [{
    xtype: 'button',
    text: 'Save',
    handler: function() {
      console.log('Secondary save clicked');
    }
  }, '->', {
    text: 'Save',
    ui: 'primary',
    handler: function() {
      console.log('Primary save clicked');
    }
  }]
});`,
    vanilla: `<div class="page-actions">
  <div class="page-actions__secondary">
    <button class="button button--secondary">Save</button>
  </div>
  <div class="page-actions__primary">
    <button class="button button--primary">Save</button>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    const isPrimary = e.target.classList.contains('button--primary');
    console.log(\`\${isPrimary ? 'Primary' : 'Secondary'} \${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {PageActions, Button} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface PageActionsWithCustomSecondaryActionExampleProps {
  onPrimarySave?: () => void;
  onSecondarySave?: () => void;
  customSecondaryAction?: ReactElement;
}

function PageActionsWithCustomSecondaryActionExample({
  onPrimarySave,
  onSecondarySave,
  customSecondaryAction
}: PageActionsWithCustomSecondaryActionExampleProps): JSX.Element {
  const secondaryAction = customSecondaryAction || (
    <Button onClick={onSecondarySave}>Save</Button>
  );

  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        onAction: onPrimarySave
      }}
      secondaryActions={secondaryAction}
    />
  );
}`
  }
};

// Layout Examples
export const layoutExamples = {
  'one-column': {
    react: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Layout() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-layout">
  <div class="polaris-layout__section">
    <div class="polaris-card">
      <div class="polaris-card__body card__body--section">
        <h2 class="polaris-card__title">Online store dashboard</h2>
        <p>View a summary of your online store's performance.</p>
      </div>
    </div>
  </div>
</div>
`,
    typescript: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface LayoutExampleProps {
  fullWidth?: boolean;
  children: React.ReactNode;
}

function Layout({ 
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
  },
  'two-columns-with-equal-width': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneHalf">
          <LegacyCard title="Florida" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                455 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '341',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '254',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '256',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <LegacyCard title="Nevada" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                301 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '342',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '100',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '257',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    flex: 1,
    margin: '0 8 0 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Florida',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Florida');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">455 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '341', name: 'Black & orange scarf', sku: '9234194023', quantity: '254'},
          {id: '256', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }, {
    xtype: 'panel',
    title: 'Nevada',
    margin: '0 0 0 0',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Nevada');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">301 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '342', name: 'Black & orange scarf', sku: '9234194023', quantity: '100'},
          {id: '257', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }]
});`,
    vanilla: `<div class="layout layout--two-columns">
  <div class="layout__section layout__section--one-half">
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Florida</h2>
        <button class="button button--plain">Manage</button>
      </div>
      <div class="card__section">
        <span class="text-subdued">455 units available</span>
      </div>
      <div class="card__section">
        <h3 class="card__section-title">Items</h3>
        <div class="resource-list">
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" alt="Black orange scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Black & orange scarf</h4>
              <div>SKU: 9234194023</div>
              <div>254 available</div>
            </div>
          </div>
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg" alt="Tucan scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Tucan scarf</h4>
              <div>SKU: 9234194010</div>
              <div>201 available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="layout__section layout__section--one-half">
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Nevada</h2>
        <button class="button button--plain">Manage</button>
      </div>
      <div class="card__section">
        <span class="text-subdued">301 units available</span>
      </div>
      <div class="card__section">
        <h3 class="card__section-title">Items</h3>
        <div class="resource-list">
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" alt="Black orange scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Black & orange scarf</h4>
              <div>SKU: 9234194023</div>
              <div>100 available</div>
            </div>
          </div>
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg" alt="Tucan scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Tucan scarf</h4>
              <div>SKU: 9234194010</div>
              <div>201 available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

interface Product {
  id: string;
  url: string;
  name: string;
  sku: string;
  quantity: string;
  media: React.ReactNode;
}

interface LocationData {
  name: string;
  totalUnits: number;
  products: Product[];
}

interface LayoutTwoColumnsExampleProps {
  locations?: LocationData[];
  onManage?: (location: string) => void;
}

function LayoutTwoColumnsExample({
  locations = [
    {
      name: 'Florida',
      totalUnits: 455,
      products: [
        {
          id: '341',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '254',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '256',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    },
    {
      name: 'Nevada',
      totalUnits: 301,
      products: [
        {
          id: '342',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '100',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '257',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    }
  ],
  onManage
}: LayoutTwoColumnsExampleProps): JSX.Element {
  return (
    <Page fullWidth>
      <Layout>
        {locations.map((location, index) => (
          <Layout.Section key={location.name} variant="oneHalf">
            <LegacyCard 
              title={location.name} 
              actions={[{
                content: 'Manage',
                onAction: () => onManage?.(location.name)
              }]}
            >
              <LegacyCard.Section>
                <Text tone="subdued" as="span">
                  {location.totalUnits} units available
                </Text>
              </LegacyCard.Section>
              <LegacyCard.Section title="Items">
                <ResourceList
                  resourceName={{singular: 'product', plural: 'products'}}
                  items={location.products}
                  renderItem={(item) => {
                    const {id, url, name, sku, media, quantity} = item;

                    return (
                      <ResourceList.Item
                        id={id}
                        url={url}
                        media={media}
                        accessibilityLabel={\`View details for \${name}\`}
                      >
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {name}
                        </Text>
                        <div>SKU: {sku}</div>
                        <div>{quantity} available</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}`
  },
  'two-columns-with-primary-and-secondary-widths': {
    react: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Order details" sectioned>
            <p>
              Use to follow a normal section with a secondary section to create
              a 2/3 + 1/3 layout on detail pages (such as individual product or
              order pages). Can also be used on any page that needs to structure
              a lot of content. This layout stacks the columns on small screens.
            </p>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Tags" sectioned>
            <p>Add tags to your order.</p>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    title: 'Order details',
    flex: 2,
    margin: '0 8 0 0',
    bodyPadding: 16,
    html: '<p>Use to follow a normal section with a secondary section to create a 2/3 + 1/3 layout on detail pages (such as individual product or order pages). Can also be used on any page that needs to structure a lot of content. This layout stacks the columns on small screens.</p>'
  }, {
    xtype: 'panel',
    title: 'Tags',
    flex: 1,
    bodyPadding: 16,
    html: '<p>Add tags to your order.</p>'
  }]
});`,
    vanilla: `<div class="layout layout--two-columns">
  <div class="layout__section layout__section--primary">
    <div class="card">
      <div class="card__body card__body--section">
        <h2 class="card__title">Order details</h2>
        <p>
          Use to follow a normal section with a secondary section to create
          a 2/3 + 1/3 layout on detail pages (such as individual product or
          order pages). Can also be used on any page that needs to structure
          a lot of content. This layout stacks the columns on small screens.
        </p>
      </div>
    </div>
  </div>
  <div class="layout__section layout__section--one-third">
    <div class="card">
      <div class="card__body card__body--section">
        <h2 class="card__title">Tags</h2>
        <p>Add tags to your order.</p>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import {Page, Layout, LegacyCard} from '@shopify/polaris';
import React from 'react';

interface LayoutPrimarySecondaryExampleProps {
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
}

function LayoutPrimarySecondaryExample({
  primaryContent = (
    <p>
      Use to follow a normal section with a secondary section to create
      a 2/3 + 1/3 layout on detail pages (such as individual product or
      order pages). Can also be used on any page that needs to structure
      a lot of content. This layout stacks the columns on small screens.
    </p>
  ),
  secondaryContent = <p>Add tags to your order.</p>
}: LayoutPrimarySecondaryExampleProps): JSX.Element {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Order details" sectioned>
            {primaryContent}
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Tags" sectioned>
            {secondaryContent}
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`
  },
  'three-columns-with-equal-width': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Florida" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                455 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '343',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '254',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '258',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Nevada" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                301 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '344',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '100',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '259',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '201',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Minneapolis" actions={[{content: 'Manage'}]}>
            <LegacyCard.Section>
              <Text tone="subdued" as="span">
                1931 units available
              </Text>
            </LegacyCard.Section>
            <LegacyCard.Section title="Items">
              <ResourceList
                resourceName={{singular: 'product', plural: 'products'}}
                items={[
                  {
                    id: '345',
                    url: '#',
                    name: 'Black & orange scarf',
                    sku: '9234194023',
                    quantity: '1230',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
                        alt="Black orange scarf"
                      />
                    ),
                  },
                  {
                    id: '260',
                    url: '#',
                    name: 'Tucan scarf',
                    sku: '9234194010',
                    quantity: '701',
                    media: (
                      <Thumbnail
                        source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
                        alt="Tucan scarf"
                      />
                    ),
                  },
                ]}
                renderItem={(item) => {
                  const {id, url, name, sku, media, quantity} = item;

                  return (
                    <ResourceList.Item
                      id={id}
                      url={url}
                      media={media}
                      accessibilityLabel={\`View details for \${name}\`}
                    >
                      <Text variant="bodyMd" fontWeight="bold" as="h3">
                        {name}
                      </Text>
                      <div>SKU: {sku}</div>
                      <div>{quantity} available</div>
                    </ResourceList.Item>
                  );
                }}
              />
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    flex: 1,
    margin: '0 8 0 0'
  },
  items: [{
    xtype: 'panel',
    title: 'Florida',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Florida');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">455 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '343', name: 'Black & orange scarf', sku: '9234194023', quantity: '254'},
          {id: '258', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }, {
    xtype: 'panel',
    title: 'Nevada',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Nevada');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">301 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '344', name: 'Black & orange scarf', sku: '9234194023', quantity: '100'},
          {id: '259', name: 'Tucan scarf', sku: '9234194010', quantity: '201'}
        ]
      }
    }]
  }, {
    xtype: 'panel',
    title: 'Minneapolis',
    margin: '0 0 0 0',
    tools: [{
      type: 'gear',
      tooltip: 'Manage',
      handler: function() {
        console.log('Manage Minneapolis');
      }
    }],
    items: [{
      xtype: 'panel',
      bodyPadding: 16,
      html: '<span style="color:#6d7175;">1931 units available</span>'
    }, {
      xtype: 'grid',
      title: 'Items',
      columns: [{
        text: 'Product',
        dataIndex: 'name',
        flex: 1,
        renderer: function(value, meta, record) {
          return '<strong>' + value + '</strong><br>SKU: ' + record.get('sku') + '<br>' + record.get('quantity') + ' available';
        }
      }],
      store: {
        fields: ['id', 'name', 'sku', 'quantity'],
        data: [
          {id: '345', name: 'Black & orange scarf', sku: '9234194023', quantity: '1230'},
          {id: '260', name: 'Tucan scarf', sku: '9234194010', quantity: '701'}
        ]
      }
    }]
  }]
});`,
    vanilla: `<div class="layout layout--three-columns">
  <div class="layout__section layout__section--one-third">
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Florida</h2>
        <button class="button button--plain">Manage</button>
      </div>
      <div class="card__section">
        <span class="text-subdued">455 units available</span>
      </div>
      <div class="card__section">
        <h3 class="card__section-title">Items</h3>
        <div class="resource-list">
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" alt="Black orange scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Black & orange scarf</h4>
              <div>SKU: 9234194023</div>
              <div>254 available</div>
            </div>
          </div>
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg" alt="Tucan scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Tucan scarf</h4>
              <div>SKU: 9234194010</div>
              <div>201 available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="layout__section layout__section--one-third">
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Nevada</h2>
        <button class="button button--plain">Manage</button>
      </div>
      <div class="card__section">
        <span class="text-subdued">301 units available</span>
      </div>
      <div class="card__section">
        <h3 class="card__section-title">Items</h3>
        <div class="resource-list">
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" alt="Black orange scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Black & orange scarf</h4>
              <div>SKU: 9234194023</div>
              <div>100 available</div>
            </div>
          </div>
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg" alt="Tucan scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Tucan scarf</h4>
              <div>SKU: 9234194010</div>
              <div>201 available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="layout__section layout__section--one-third">
    <div class="card">
      <div class="card__header">
        <h2 class="card__title">Minneapolis</h2>
        <button class="button button--plain">Manage</button>
      </div>
      <div class="card__section">
        <span class="text-subdued">1931 units available</span>
      </div>
      <div class="card__section">
        <h3 class="card__section-title">Items</h3>
        <div class="resource-list">
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg" alt="Black orange scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Black & orange scarf</h4>
              <div>SKU: 9234194023</div>
              <div>1230 available</div>
            </div>
          </div>
          <div class="resource-list__item">
            <div class="resource-list__item-media">
              <img src="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg" alt="Tucan scarf" class="thumbnail">
            </div>
            <div class="resource-list__item-content">
              <h4 class="text-strong">Tucan scarf</h4>
              <div>SKU: 9234194010</div>
              <div>701 available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(\`\${e.target.textContent.trim()} clicked\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Thumbnail,
  Text,
} from '@shopify/polaris';
import React from 'react';

interface Product {
  id: string;
  url: string;
  name: string;
  sku: string;
  quantity: string;
  media: React.ReactNode;
}

interface LocationData {
  name: string;
  totalUnits: number;
  products: Product[];
}

interface LayoutThreeColumnsExampleProps {
  locations?: LocationData[];
  onManage?: (location: string) => void;
}

function LayoutThreeColumnsExample({
  locations = [
    {
      name: 'Florida',
      totalUnits: 455,
      products: [
        {
          id: '343',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '254',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '258',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    },
    {
      name: 'Nevada',
      totalUnits: 301,
      products: [
        {
          id: '344',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '100',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '259',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '201',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    },
    {
      name: 'Minneapolis',
      totalUnits: 1931,
      products: [
        {
          id: '345',
          url: '#',
          name: 'Black & orange scarf',
          sku: '9234194023',
          quantity: '1230',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/black-orange-stripes_373x@2x.jpg"
              alt="Black orange scarf"
            />
          ),
        },
        {
          id: '260',
          url: '#',
          name: 'Tucan scarf',
          sku: '9234194010',
          quantity: '701',
          media: (
            <Thumbnail
              source="https://burst.shopifycdn.com/photos/tucan-scarf_373x@2x.jpg"
              alt="Tucan scarf"
            />
          ),
        },
      ]
    }
  ],
  onManage
}: LayoutThreeColumnsExampleProps): JSX.Element {
  return (
    <Page fullWidth>
      <Layout>
        {locations.map((location) => (
          <Layout.Section key={location.name} variant="oneThird">
            <LegacyCard 
              title={location.name} 
              actions={[{
                content: 'Manage',
                onAction: () => onManage?.(location.name)
              }]}
            >
              <LegacyCard.Section>
                <Text tone="subdued" as="span">
                  {location.totalUnits} units available
                </Text>
              </LegacyCard.Section>
              <LegacyCard.Section title="Items">
                <ResourceList
                  resourceName={{singular: 'product', plural: 'products'}}
                  items={location.products}
                  renderItem={(item) => {
                    const {id, url, name, sku, media, quantity} = item;

                    return (
                      <ResourceList.Item
                        id={id}
                        url={url}
                        media={media}
                        accessibilityLabel={\`View details for \${name}\`}
                      >
                        <Text variant="bodyMd" fontWeight="bold" as="h3">
                          {name}
                        </Text>
                        <div>SKU: {sku}</div>
                        <div>{quantity} available</div>
                      </ResourceList.Item>
                    );
                  }}
                />
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        ))}
      </Layout>
    </Page>
  );
}`
  },
  'annotated': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    flex: 1,
    border: false,
    bodyPadding: 20,
    html: '<h2 id="storeDetails">Store details</h2><p style="color:#6d7175;">Shopify and your customers will use this information to contact you.</p>'
  }, {
    xtype: 'panel',
    flex: 2,
    margin: '0 0 0 16',
    items: [{
      xtype: 'form',
      bodyPadding: 16,
      defaults: {
        anchor: '100%',
        labelWidth: 100,
        margin: '0 0 16 0'
      },
      items: [{
        xtype: 'textfield',
        fieldLabel: 'Store name'
      }, {
        xtype: 'textfield',
        fieldLabel: 'Account email',
        vtype: 'email'
      }]
    }]
  }]
});`,
    vanilla: `<div class="layout layout--annotated">
  <div class="layout__annotation">
    <h2 id="storeDetails" class="layout__annotation-title">Store details</h2>
    <p class="layout__annotation-description">
      Shopify and your customers will use this information to contact you.
    </p>
  </div>
  <div class="layout__section">
    <div class="card">
      <div class="card__body card__body--section">
        <form class="form-layout">
          <div class="form-layout__item">
            <label for="store-name" class="form-label">Store name</label>
            <input type="text" id="store-name" class="text-field" autocomplete="off">
          </div>
          <div class="form-layout__item">
            <label for="account-email" class="form-label">Account email</label>
            <input type="email" id="account-email" class="text-field" autocomplete="email">
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.text-field').forEach(field => {
  field.addEventListener('change', (e) => {
    console.log(\`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
}

interface LayoutAnnotatedExampleProps {
  initialStoreDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
}

function LayoutAnnotatedExample({
  initialStoreDetails = {
    storeName: '',
    accountEmail: ''
  },
  onDetailsChange
}: LayoutAnnotatedExampleProps): JSX.Element {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>(initialStoreDetails);

  const handleStoreNameChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, storeName: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleAccountEmailChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, accountEmail: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                value={storeDetails.storeName}
                onChange={handleStoreNameChange}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                value={storeDetails.accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`
  },
  'annotated-with-sections': {
    react: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  TextContainer,
  Text,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <div style={{marginTop: 'var(--p-space-500)'}}>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h2">
                Store details
              </Text>
              <Text tone="subdued" as="p">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    flex: 1,
    border: false,
    bodyPadding: '20 20 20 0',
    html: '<div style="margin-top:20px;"><h2 id="storeDetails">Store details</h2><p style="color:#6d7175;">Shopify and your customers will use this information to contact you.</p></div>'
  }, {
    xtype: 'panel',
    flex: 2,
    items: [{
      xtype: 'form',
      bodyPadding: 16,
      defaults: {
        anchor: '100%',
        labelWidth: 100,
        margin: '0 0 16 0'
      },
      items: [{
        xtype: 'textfield',
        fieldLabel: 'Store name'
      }, {
        xtype: 'textfield',
        fieldLabel: 'Account email',
        vtype: 'email'
      }]
    }]
  }]
});`,
    vanilla: `<div class="layout">
  <div class="layout__section layout__section--one-third">
    <div class="text-container" style="margin-top: var(--p-space-500);">
      <h2 id="storeDetails" class="text-heading-md">Store details</h2>
      <p class="text-subdued">
        Shopify and your customers will use this information to contact
        you.
      </p>
    </div>
  </div>
  <div class="layout__section">
    <div class="card">
      <div class="card__body card__body--section">
        <form class="form-layout">
          <div class="form-layout__item">
            <label for="store-name" class="form-label">Store name</label>
            <input type="text" id="store-name" class="text-field" autocomplete="off">
          </div>
          <div class="form-layout__item">
            <label for="account-email" class="form-label">Account email</label>
            <input type="email" id="account-email" class="text-field" autocomplete="email">
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
document.querySelectorAll('.text-field').forEach(field => {
  field.addEventListener('change', (e) => {
    console.log(\`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  LegacyCard,
  FormLayout,
  TextField,
  TextContainer,
  Text,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
}

interface LayoutAnnotatedWithSectionsExampleProps {
  initialStoreDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
}

function LayoutAnnotatedWithSectionsExample({
  initialStoreDetails = {
    storeName: '',
    accountEmail: ''
  },
  onDetailsChange
}: LayoutAnnotatedWithSectionsExampleProps): JSX.Element {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>(initialStoreDetails);

  const handleStoreNameChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, storeName: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleAccountEmailChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, accountEmail: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section variant="oneThird">
          <div style={{marginTop: 'var(--p-space-500)'}}>
            <TextContainer>
              <Text id="storeDetails" variant="headingMd" as="h2">
                Store details
              </Text>
              <Text tone="subdued" as="p">
                Shopify and your customers will use this information to contact
                you.
              </Text>
            </TextContainer>
          </div>
        </Layout.Section>
        <Layout.Section>
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                value={storeDetails.storeName}
                onChange={handleStoreNameChange}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                value={storeDetails.accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`
  },
  'annotated-with-banner-at-the-top': {
    react: `import {
  Page,
  Layout,
  Banner,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React from 'react';

function Layout() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Banner title="Order archived" onDismiss={() => console.log('[Dismiss] Component dismissed')}>
            <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
          </Banner>
        </Layout.Section>
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                onChange={(value) => console.log('[Change] Value:', value)}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    ui: 'warning',
    bodyPadding: 16,
    closable: true,
    title: 'Order archived',
    html: '<p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>',
    margin: '0 0 16 0'
  }, {
    xtype: 'container',
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    flex: 1,
    items: [{
      xtype: 'panel',
      flex: 1,
      border: false,
      bodyPadding: 20,
      html: '<h2 id="storeDetails">Store details</h2><p style="color:#6d7175;">Shopify and your customers will use this information to contact you.</p>'
    }, {
      xtype: 'panel',
      flex: 2,
      margin: '0 0 0 16',
      items: [{
        xtype: 'form',
        bodyPadding: 16,
        defaults: {
          anchor: '100%',
          labelWidth: 100,
          margin: '0 0 16 0'
        },
        items: [{
          xtype: 'textfield',
          fieldLabel: 'Store name'
        }, {
          xtype: 'textfield',
          fieldLabel: 'Account email',
          vtype: 'email'
        }]
      }]
    }]
  }]
});`,
    vanilla: `<div class="layout">
  <div class="layout__section">
    <div class="banner banner--dismissible">
      <div class="banner__content">
        <h2 class="banner__title">Order archived</h2>
        <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
      </div>
      <button class="banner__dismiss" aria-label="Dismiss banner">
        <svg viewBox="0 0 20 20" class="icon">
          <path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293a1 1 0 001.414-1.414L11.414 10z"/>
        </svg>
      </button>
    </div>
  </div>
  <div class="layout__annotated-section">
    <div class="layout__annotation">
      <h2 id="storeDetails" class="layout__annotation-title">Store details</h2>
      <p class="layout__annotation-description">
        Shopify and your customers will use this information to contact you.
      </p>
    </div>
    <div class="layout__section">
      <div class="card">
        <div class="card__body card__body--section">
          <form class="form-layout">
            <div class="form-layout__item">
              <label for="store-name" class="form-label">Store name</label>
              <input type="text" id="store-name" class="text-field" autocomplete="off">
            </div>
            <div class="form-layout__item">
              <label for="account-email" class="form-label">Account email</label>
              <input type="email" id="account-email" class="text-field" autocomplete="email">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
document.querySelector('.banner__dismiss').addEventListener('click', (e) => {
  e.target.closest('.banner').remove();
  console.log('Banner dismissed');
});

document.querySelectorAll('.text-field').forEach(field => {
  field.addEventListener('change', (e) => {
    console.log(\`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {
  Page,
  Layout,
  Banner,
  LegacyCard,
  FormLayout,
  TextField,
} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
}

interface LayoutWithBannerProps {
  initialStoreDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
  bannerDismissed?: boolean;
  onBannerDismiss?: () => void;
}

function LayoutWithBanner({
  initialStoreDetails = {
    storeName: '',
    accountEmail: ''
  },
  onDetailsChange,
  bannerDismissed = false,
  onBannerDismiss
}: LayoutWithBannerProps): JSX.Element {
  const [storeDetails, setStoreDetails] = useState<StoreDetails>(initialStoreDetails);
  const [showBanner, setShowBanner] = useState(!bannerDismissed);

  const handleStoreNameChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, storeName: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleAccountEmailChange = useCallback((value: string) => {
    const newDetails = {...storeDetails, accountEmail: value};
    setStoreDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [storeDetails, onDetailsChange]);

  const handleBannerDismiss = useCallback(() => {
    setShowBanner(false);
    onBannerDismiss?.();
  }, [onBannerDismiss]);

  return (
    <Page fullWidth>
      <Layout>
        {showBanner && (
          <Layout.Section>
            <Banner title="Order archived" onDismiss={handleBannerDismiss}>
              <p>This order was archived on March 7, 2017 at 3:12pm EDT.</p>
            </Banner>
          </Layout.Section>
        )}
        <Layout.AnnotatedSection
          id="storeDetails"
          title="Store details"
          description="Shopify and your customers will use this information to contact you."
        >
          <LegacyCard sectioned>
            <FormLayout>
              <TextField
                label="Store name"
                value={storeDetails.storeName}
                onChange={handleStoreNameChange}
                autoComplete="off"
              />
              <TextField
                type="email"
                label="Account email"
                value={storeDetails.accountEmail}
                onChange={handleAccountEmailChange}
                autoComplete="email"
              />
            </FormLayout>
          </LegacyCard>
        </Layout.AnnotatedSection>
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
      <TextField label="Store name" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
      <TextField
        type="email"
        label="Account email"
        onChange={(value) => console.log('[Change] Value:', value)}
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
    vanilla: `<!-- HTML Structure -->
<form class="polaris-form-layout">
  <div class="polaris-form-layout__item">
    <label for="store-name" class="label">Store name</label>
    <input 
      type="text" 
      id="store-name" 
      class="polaris-text-field"
      autocomplete="off"
    />
  </div>
  <div class="polaris-form-layout__item">
    <label for="account-email" class="label">Account email</label>
    <input 
      type="email" 
      id="account-email" 
      class="polaris-text-field"
      autocomplete="email"
    />
  </div>
</form>


<script>
const form = document.querySelector('.polaris-form-layout');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form submitted');
});
</script>`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface FormData {
  storeName: string;
  accountEmail: string;
}

interface FormLayoutProps {
  onSubmit?: (data: FormData) => void;
}

function FormLayout({ onSubmit }: FormLayoutProps): JSX.Element {
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
  },
  'field-group': {
    react: `import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          type="number"
          label="Minimum order"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Maximum order"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="off"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'fieldcontainer',
    layout: 'hbox',
    defaults: {
      flex: 1,
      margin: '0 8 0 0'
    },
    items: [{
      xtype: 'numberfield',
      fieldLabel: 'Minimum order',
      labelWidth: 100
    }, {
      xtype: 'numberfield',
      fieldLabel: 'Maximum order',
      labelWidth: 100,
      margin: '0 0 0 0'
    }]
  }]
});`,
    vanilla: `<form class="form-layout">
  <div class="form-layout__group">
    <div class="form-layout__item">
      <label for="minimum-order" class="label">Minimum order</label>
      <input 
        type="number" 
        id="minimum-order" 
        class="text-field"
        autocomplete="off"
      />
    </div>
    <div class="form-layout__item">
      <label for="maximum-order" class="label">Maximum order</label>
      <input 
        type="number" 
        id="maximum-order" 
        class="text-field"
        autocomplete="off"
      />
    </div>
  </div>
</form>

<script>
document.querySelectorAll('.text-field').forEach(input => {
  input.addEventListener('change', (e) => {
    console.log(\`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface OrderLimits {
  minimum: string;
  maximum: string;
}

interface FormLayoutFieldGroupExampleProps {
  initialLimits?: OrderLimits;
  onLimitsChange?: (limits: OrderLimits) => void;
}

function FormLayoutFieldGroupExample({
  initialLimits = { minimum: '', maximum: '' },
  onLimitsChange
}: FormLayoutFieldGroupExampleProps): JSX.Element {
  const [limits, setLimits] = useState<OrderLimits>(initialLimits);

  const handleMinimumChange = useCallback((value: string) => {
    const newLimits = {...limits, minimum: value};
    setLimits(newLimits);
    onLimitsChange?.(newLimits);
  }, [limits, onLimitsChange]);

  const handleMaximumChange = useCallback((value: string) => {
    const newLimits = {...limits, maximum: value};
    setLimits(newLimits);
    onLimitsChange?.(newLimits);
  }, [limits, onLimitsChange]);

  return (
    <FormLayout>
      <FormLayout.Group>
        <TextField
          type="number"
          label="Minimum order"
          value={limits.minimum}
          onChange={handleMinimumChange}
          autoComplete="off"
        />
        <TextField
          type="number"
          label="Maximum order"
          value={limits.maximum}
          onChange={handleMaximumChange}
          autoComplete="off"
        />
      </FormLayout.Group>
    </FormLayout>
  );
}`
  },
  'condensed-field-group': {
    react: `import {FormLayout, TextField} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <TextField label="Length" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
        <TextField label="Width" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
        <TextField label="Height" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
        <TextField label="Unit" onChange={(value) => console.log('[Change] Value:', value)} autoComplete="off" />
      </FormLayout.Group>
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'fieldcontainer',
    layout: {
      type: 'hbox',
      pack: 'start'
    },
    defaults: {
      flex: 1,
      margin: '0 4 0 0'
    },
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Length',
      labelWidth: 50
    }, {
      xtype: 'textfield',
      fieldLabel: 'Width',
      labelWidth: 50
    }, {
      xtype: 'textfield',
      fieldLabel: 'Height',
      labelWidth: 50
    }, {
      xtype: 'textfield',
      fieldLabel: 'Unit',
      labelWidth: 40,
      margin: '0 0 0 0'
    }]
  }]
});`,
    vanilla: `<form class="form-layout">
  <div class="form-layout__group form-layout__group--condensed">
    <div class="form-layout__item">
      <label for="length" class="label">Length</label>
      <input 
        type="text" 
        id="length" 
        class="text-field"
        autocomplete="off"
      />
    </div>
    <div class="form-layout__item">
      <label for="width" class="label">Width</label>
      <input 
        type="text" 
        id="width" 
        class="text-field"
        autocomplete="off"
      />
    </div>
    <div class="form-layout__item">
      <label for="height" class="label">Height</label>
      <input 
        type="text" 
        id="height" 
        class="text-field"
        autocomplete="off"
      />
    </div>
    <div class="form-layout__item">
      <label for="unit" class="label">Unit</label>
      <input 
        type="text" 
        id="unit" 
        class="text-field"
        autocomplete="off"
      />
    </div>
  </div>
</form>

<script>
document.querySelectorAll('.text-field').forEach(input => {
  input.addEventListener('change', (e) => {
    console.log(\`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface Dimensions {
  length: string;
  width: string;
  height: string;
  unit: string;
}

interface FormLayoutCondensedExampleProps {
  initialDimensions?: Dimensions;
  onDimensionsChange?: (dimensions: Dimensions) => void;
}

function FormLayoutCondensedExample({
  initialDimensions = { length: '', width: '', height: '', unit: 'cm' },
  onDimensionsChange
}: FormLayoutCondensedExampleProps): JSX.Element {
  const [dimensions, setDimensions] = useState<Dimensions>(initialDimensions);

  const handleChange = useCallback((field: keyof Dimensions) => (value: string) => {
    const newDimensions = {...dimensions, [field]: value};
    setDimensions(newDimensions);
    onDimensionsChange?.(newDimensions);
  }, [dimensions, onDimensionsChange]);

  return (
    <FormLayout>
      <FormLayout.Group condensed>
        <TextField 
          label="Length" 
          value={dimensions.length}
          onChange={handleChange('length')} 
          autoComplete="off" 
        />
        <TextField 
          label="Width" 
          value={dimensions.width}
          onChange={handleChange('width')} 
          autoComplete="off" 
        />
        <TextField 
          label="Height" 
          value={dimensions.height}
          onChange={handleChange('height')} 
          autoComplete="off" 
        />
        <TextField 
          label="Unit" 
          value={dimensions.unit}
          onChange={handleChange('unit')} 
          autoComplete="off" 
        />
      </FormLayout.Group>
    </FormLayout>
  );
}`
  },
  'with-help-text': {
    react: `import {FormLayout, TextField, Select} from '@shopify/polaris';
import React from 'react';

function Example() {
  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  return (
    <FormLayout>
      <TextField
        label="Store name"
        onChange={(value) => console.log('[Change] Value:', value)}
        autoComplete="off"
        helpText="This will be displayed on your storefront."
      />
      <TextField
        type="email"
        label="Account email"
        onChange={(value) => console.log('[Change] Value:', value)}
        autoComplete="email"
        helpText="We'll use this email address to inform you on future changes to Polaris."
      />
      <Select
        label="Shipping options"
        options={options}
        onChange={(value) => console.log('[Change] Value:', value)}
        helpText="Select when orders should be fulfilled."
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
    margin: '0 0 16 0',
    labelWidth: 120
  },
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Store name',
    afterLabelTextTpl: '<div class="help-text">This will be displayed on your storefront.</div>'
  }, {
    xtype: 'textfield',
    fieldLabel: 'Account email',
    vtype: 'email',
    afterLabelTextTpl: '<div class="help-text">We\\'ll use this email address to inform you on future changes to Polaris.</div>'
  }, {
    xtype: 'combobox',
    fieldLabel: 'Shipping options',
    store: [
      ['today', 'Today'],
      ['yesterday', 'Yesterday'],
      ['lastWeek', 'Last 7 days']
    ],
    queryMode: 'local',
    afterLabelTextTpl: '<div class="help-text">Select when orders should be fulfilled.</div>'
  }]
});`,
    vanilla: `<form class="form-layout">
  <div class="form-layout__item">
    <label for="store-name" class="label">Store name</label>
    <input 
      type="text" 
      id="store-name" 
      class="text-field"
      autocomplete="off"
    />
    <div class="help-text">This will be displayed on your storefront.</div>
  </div>
  <div class="form-layout__item">
    <label for="account-email" class="label">Account email</label>
    <input 
      type="email" 
      id="account-email" 
      class="text-field"
      autocomplete="email"
    />
    <div class="help-text">We'll use this email address to inform you on future changes to Polaris.</div>
  </div>
  <div class="form-layout__item">
    <label for="shipping-options" class="label">Shipping options</label>
    <select id="shipping-options" class="select-field">
      <option value="today">Today</option>
      <option value="yesterday">Yesterday</option>
      <option value="lastWeek">Last 7 days</option>
    </select>
    <div class="help-text">Select when orders should be fulfilled.</div>
  </div>
</form>

<script>
document.querySelectorAll('.text-field, .select-field').forEach(input => {
  input.addEventListener('change', (e) => {
    console.log(\`\${e.target.id} changed: \${e.target.value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField, Select} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface FormData {
  storeName: string;
  accountEmail: string;
  shippingOption: string;
}

interface FormLayoutWithHelpTextExampleProps {
  initialData?: FormData;
  onDataChange?: (data: FormData) => void;
}

function FormLayoutWithHelpTextExample({
  initialData = { storeName: '', accountEmail: '', shippingOption: 'today' },
  onDataChange
}: FormLayoutWithHelpTextExampleProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>(initialData);

  const options = [
    {label: 'Today', value: 'today'},
    {label: 'Yesterday', value: 'yesterday'},
    {label: 'Last 7 days', value: 'lastWeek'},
  ];

  const handleChange = useCallback((field: keyof FormData) => (value: string) => {
    const newData = {...formData, [field]: value};
    setFormData(newData);
    onDataChange?.(newData);
  }, [formData, onDataChange]);

  return (
    <FormLayout>
      <TextField
        label="Store name"
        value={formData.storeName}
        onChange={handleChange('storeName')}
        autoComplete="off"
        helpText="This will be displayed on your storefront."
      />
      <TextField
        type="email"
        label="Account email"
        value={formData.accountEmail}
        onChange={handleChange('accountEmail')}
        autoComplete="email"
        helpText="We'll use this email address to inform you on future changes to Polaris."
      />
      <Select
        label="Shipping options"
        options={options}
        value={formData.shippingOption}
        onChange={handleChange('shippingOption')}
        helpText="Select when orders should be fulfilled."
      />
    </FormLayout>
  );
}`
  },
  'sectioned': {
    react: `import {FormLayout, TextField, Select, Checkbox} from '@shopify/polaris';
import React from 'react';

function Example() {
  return (
    <FormLayout>
      <FormLayout.Group title="Store details">
        <TextField
          label="Store name"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="off"
        />
        <TextField
          type="email"
          label="Account email"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="email"
        />
      </FormLayout.Group>
      <FormLayout.Group title="Store address">
        <TextField
          label="Address"
          onChange={(value) => console.log('[Change] Value:', value)}
          autoComplete="address-line1"
        />
        <FormLayout.Group condensed>
          <TextField
            label="City"
            onChange={(value) => console.log('[Change] Value:', value)}
            autoComplete="address-level2"
          />
          <TextField
            label="Postal code"
            onChange={(value) => console.log('[Change] Value:', value)}
            autoComplete="postal-code"
          />
        </FormLayout.Group>
      </FormLayout.Group>
      <Checkbox
        label="Save this address"
        checked={false}
        onChange={(value) => console.log('[Change] Value:', value)}
      />
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'fieldset',
    title: 'Store details',
    layout: 'anchor',
    defaults: {
      anchor: '100%',
      margin: '0 0 16 0'
    },
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Store name'
    }, {
      xtype: 'textfield',
      fieldLabel: 'Account email',
      vtype: 'email'
    }]
  }, {
    xtype: 'fieldset',
    title: 'Store address',
    layout: 'anchor',
    margin: '16 0 0 0',
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Address',
      anchor: '100%',
      margin: '0 0 16 0'
    }, {
      xtype: 'fieldcontainer',
      layout: 'hbox',
      defaults: {
        flex: 1,
        margin: '0 8 0 0'
      },
      items: [{
        xtype: 'textfield',
        fieldLabel: 'City'
      }, {
        xtype: 'textfield',
        fieldLabel: 'Postal code',
        margin: '0 0 0 0'
      }]
    }]
  }, {
    xtype: 'checkbox',
    boxLabel: 'Save this address',
    margin: '16 0 0 0'
  }]
});`,
    vanilla: `<form class="form-layout">
  <fieldset class="form-layout__group">
    <legend class="form-layout__group-title">Store details</legend>
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
  </fieldset>
  
  <fieldset class="form-layout__group">
    <legend class="form-layout__group-title">Store address</legend>
    <div class="form-layout__item">
      <label for="address" class="label">Address</label>
      <input 
        type="text" 
        id="address" 
        class="text-field"
        autocomplete="address-line1"
      />
    </div>
    <div class="form-layout__group form-layout__group--condensed">
      <div class="form-layout__item">
        <label for="city" class="label">City</label>
        <input 
          type="text" 
          id="city" 
          class="text-field"
          autocomplete="address-level2"
        />
      </div>
      <div class="form-layout__item">
        <label for="postal-code" class="label">Postal code</label>
        <input 
          type="text" 
          id="postal-code" 
          class="text-field"
          autocomplete="postal-code"
        />
      </div>
    </div>
  </fieldset>
  
  <div class="form-layout__item">
    <label class="checkbox-label">
      <input type="checkbox" class="checkbox" />
      <span>Save this address</span>
    </label>
  </div>
</form>

<script>
document.querySelectorAll('.text-field, .checkbox').forEach(input => {
  input.addEventListener('change', (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(\`\${e.target.id || 'checkbox'} changed: \${value}\`);
  });
});
</script>`,
    typescript: `import {FormLayout, TextField, Select, Checkbox} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface StoreDetails {
  storeName: string;
  accountEmail: string;
  address: string;
  city: string;
  postalCode: string;
  saveAddress: boolean;
}

interface FormLayoutSectionedExampleProps {
  initialDetails?: StoreDetails;
  onDetailsChange?: (details: StoreDetails) => void;
}

function FormLayoutSectionedExample({
  initialDetails = {
    storeName: '',
    accountEmail: '',
    address: '',
    city: '',
    postalCode: '',
    saveAddress: false
  },
  onDetailsChange
}: FormLayoutSectionedExampleProps): JSX.Element {
  const [details, setDetails] = useState<StoreDetails>(initialDetails);

  const handleChange = useCallback((field: keyof StoreDetails) => (value: string | boolean) => {
    const newDetails = {...details, [field]: value};
    setDetails(newDetails);
    onDetailsChange?.(newDetails);
  }, [details, onDetailsChange]);

  return (
    <FormLayout>
      <FormLayout.Group title="Store details">
        <TextField
          label="Store name"
          value={details.storeName}
          onChange={handleChange('storeName')}
          autoComplete="off"
        />
        <TextField
          type="email"
          label="Account email"
          value={details.accountEmail}
          onChange={handleChange('accountEmail')}
          autoComplete="email"
        />
      </FormLayout.Group>
      <FormLayout.Group title="Store address">
        <TextField
          label="Address"
          value={details.address}
          onChange={handleChange('address')}
          autoComplete="address-line1"
        />
        <FormLayout.Group condensed>
          <TextField
            label="City"
            value={details.city}
            onChange={handleChange('city')}
            autoComplete="address-level2"
          />
          <TextField
            label="Postal code"
            value={details.postalCode}
            onChange={handleChange('postalCode')}
            autoComplete="postal-code"
          />
        </FormLayout.Group>
      </FormLayout.Group>
      <Checkbox
        label="Save this address"
        checked={details.saveAddress}
        onChange={handleChange('saveAddress')}
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-tabs" role="tablist">
  <button 
    role="tab" 
    class="polaris-tab polaris-tab--selected" 
    aria-selected="true"
    aria-controls="panel-0"
    id="tab-0"
  >
    All
  </button>
  <button 
    role="tab" 
    class="polaris-tab" 
    aria-selected="false"
    aria-controls="panel-1"
    id="tab-1"
  >
    Accepts marketing
  </button>
  <button 
    role="tab" 
    class="polaris-tab" 
    aria-selected="false"
    aria-controls="panel-2"
    id="tab-2"
  >
    Repeat customers
  </button>
  <button 
    role="tab" 
    class="polaris-tab" 
    aria-selected="false"
    aria-controls="panel-3"
    id="tab-3"
  >
    Prospects
  </button>
</div>
<div class="polaris-tab-panels">
  <div 
    role="tabpanel" 
    id="panel-0" 
    aria-labelledby="tab-0"
    class="polaris-tab-panel polaris-tab-panel--active"
  >
    <div class="polaris-card-section">
      <h3 class="polaris-card-section__title">All</h3>
      <p>Tab 0 selected</p>
    </div>
  </div>
  <div 
    role="tabpanel" 
    id="panel-1" 
    aria-labelledby="tab-1"
    class="polaris-tab-panel"
    hidden
  >
    <div class="polaris-card-section">
      <h3 class="polaris-card-section__title">Accepts marketing</h3>
      <p>Tab 1 selected</p>
    </div>
  </div>
  <div 
    role="tabpanel" 
    id="panel-2" 
    aria-labelledby="tab-2"
    class="polaris-tab-panel"
    hidden
  >
    <div class="polaris-card-section">
      <h3 class="polaris-card-section__title">Repeat customers</h3>
      <p>Tab 2 selected</p>
    </div>
  </div>
  <div 
    role="tabpanel" 
    id="panel-3" 
    aria-labelledby="tab-3"
    class="polaris-tab-panel"
    hidden
  >
    <div class="polaris-card-section">
      <h3 class="polaris-card-section__title">Prospects</h3>
      <p>Tab 3 selected</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const tabs = document.querySelectorAll('.polaris-tab');
const panels = document.querySelectorAll('.polaris-tab-panel');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Update tabs
    tabs.forEach(t => {
      t.classList.remove('polaris-tab--selected');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('polaris-tab--selected');
    tab.setAttribute('aria-selected', 'true');
    
    // Update panels
    panels.forEach(p => {
      p.classList.remove('polaris-tab-panel--active');
      p.setAttribute('hidden', '');
    });
    panels[index].classList.add('polaris-tab-panel--active');
    panels[index].removeAttribute('hidden');
    
    console.log('Tab changed to:', index);
  });
});
</script>`,
    typescript: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface Tab {
  id: string;
  content: string;
  accessibilityLabel?: string;
  panelID: string;
}

interface TabsProps {
  tabs: Tab[];
  defaultSelected?: number;
  onTabChange?: (index: number) => void;
}

function Tabs({ 
  tabs,
  defaultSelected = 0,
  onTabChange
}: TabsProps): JSX.Element {
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
  },
  'fitted': {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsFittedExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-fitted-2',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-2',
    },
    {
      id: 'accepts-marketing-fitted-2',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-Ccontent-2',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'tabpanel',
    tabBarPosition: 'top',
    defaults: {
      padding: 20
    },
    items: [{
      title: 'All',
      html: '<h3>All</h3><p>Tab 0 selected</p>'
    }, {
      title: 'Accepts marketing',
      html: '<h3>Accepts marketing</h3><p>Tab 1 selected</p>'
    }],
    tabBar: {
      layout: {
        pack: 'stretch'
      }
    },
    listeners: {
      tabchange: function(tabPanel, newCard, oldCard) {
        console.log('Tab changed to:', newCard.title);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-tabs polaris-tabs--fitted" role="tablist">
    <button 
      role="tab" 
      class="polaris-tab polaris-tab--selected" 
      aria-selected="true"
      aria-controls="panel-0"
      id="tab-0"
    >
      All
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-1"
      id="tab-1"
    >
      Accepts marketing
    </button>
  </div>
  <div class="polaris-card__section">
    <div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
      <h3>All</h3>
      <p>Tab 0 selected</p>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
      <h3>Accepts marketing</h3>
      <p>Tab 1 selected</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const tabs = document.querySelectorAll('.polaris-tab');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Update tab states
    tabs.forEach(t => {
      t.classList.remove('polaris-tab--selected');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('polaris-tab--selected');
    tab.setAttribute('aria-selected', 'true');
    
    // Update panel visibility
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.hidden = false;
        panel.querySelector('p').textContent = \`Tab \${index} selected\`;
      } else {
        panel.hidden = true;
      }
    });
  });
});
</script>`,
    typescript: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TabsFittedExampleProps {
  onTabChange?: (index: number) => void;
}

function TabsFittedExample({ onTabChange }: TabsFittedExampleProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      onTabChange?.(selectedTabIndex);
    },
    [onTabChange],
  );

  const tabs: TabProps[] = [
    {
      id: 'all-customers-fitted-2',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-2',
    },
    {
      id: 'accepts-marketing-fitted-2',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-fitted-Ccontent-2',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`
  },
  'inside-of-a-card': {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsInsideOfACard() {
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
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: true,
  items: [{
    xtype: 'tabpanel',
    border: false,
    items: [{
      title: 'All',
      padding: 20,
      html: '<h3>All</h3><p>Tab 0 selected</p>'
    }, {
      title: 'Accepts marketing',
      padding: 20,
      html: '<h3>Accepts marketing</h3><p>Tab 1 selected</p>'
    }, {
      title: 'Repeat customers',
      padding: 20,
      html: '<h3>Repeat customers</h3><p>Tab 2 selected</p>'
    }, {
      title: 'Prospects',
      padding: 20,
      html: '<h3>Prospects</h3><p>Tab 3 selected</p>'
    }],
    listeners: {
      tabchange: function(tabPanel, newCard, oldCard) {
        console.log('Tab changed to:', newCard.title);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-tabs" role="tablist">
    <button 
      role="tab" 
      class="polaris-tab polaris-tab--selected" 
      aria-selected="true"
      aria-controls="panel-0"
      id="tab-0"
    >
      All
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-1"
      id="tab-1"
    >
      Accepts marketing
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
    >
      Repeat customers
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-3"
      id="tab-3"
    >
      Prospects
    </button>
  </div>
  <div class="polaris-card__section">
    <div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
      <h3>All</h3>
      <p>Tab 0 selected</p>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
      <h3>Accepts marketing</h3>
      <p>Tab 1 selected</p>
    </div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
      <h3>Repeat customers</h3>
      <p>Tab 2 selected</p>
    </div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
      <h3>Prospects</h3>
      <p>Tab 3 selected</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const tabs = document.querySelectorAll('.polaris-tab');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Update tab states
    tabs.forEach(t => {
      t.classList.remove('polaris-tab--selected');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('polaris-tab--selected');
    tab.setAttribute('aria-selected', 'true');
    
    // Update panel visibility
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.hidden = false;
        panel.querySelector('p').textContent = \`Tab \${index} selected\`;
      } else {
        panel.hidden = true;
      }
    });
  });
});
</script>`,
    typescript: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TabsInsideCardProps {
  initialSelected?: number;
  onTabChange?: (index: number) => void;
}

function TabsInsideOfACard({ 
  initialSelected = 0,
  onTabChange 
}: TabsInsideCardProps): JSX.Element {
  const [selected, setSelected] = useState<number>(initialSelected);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      onTabChange?.(selectedTabIndex);
    },
    [onTabChange],
  );

  const tabs: TabProps[] = [
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
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`
  },
  'with-actions': {
    react: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState} from 'react';

function TabsWithActionsExample() {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ]);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: \`\${item}-\${index}\`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string) => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (name) => {
                await sleep(1);
                duplicateView(name);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };

  return (
    <LegacyCard>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView
        onCreateNewView={onCreateNewView}
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: true,
  items: [{
    xtype: 'tabpanel',
    border: false,
    tabBar: {
      items: [{
        xtype: 'button',
        text: '+',
        ui: 'plain',
        handler: function() {
          Ext.Msg.prompt('New View', 'Enter view name:', function(btn, text) {
            if (btn === 'ok' && text) {
              var tabPanel = this.up('tabpanel');
              var newTab = tabPanel.add({
                title: text,
                closable: true,
                padding: 20,
                html: '<h3>' + text + '</h3><p>New tab created</p>'
              });
              tabPanel.setActiveTab(newTab);
            }
          }, this);
        }
      }]
    },
    items: [{
      title: 'All',
      closable: false,
      padding: 20,
      html: '<h3>All</h3><p>Tab 0 selected</p>'
    }, {
      title: 'Unpaid',
      closable: true,
      padding: 20,
      html: '<h3>Unpaid</h3><p>Tab 1 selected</p>',
      tabConfig: {
        xtype: 'tab',
        menu: [{
          text: 'Rename',
          handler: function() {
            var tab = this.up('tab');
            Ext.Msg.prompt('Rename', 'Enter new name:', function(btn, text) {
              if (btn === 'ok' && text) {
                tab.setText(text);
              }
            });
          }
        }, {
          text: 'Duplicate',
          handler: function() {
            var tab = this.up('tab');
            var tabPanel = tab.up('tabpanel');
            var newTab = tabPanel.add({
              title: tab.getText() + ' (copy)',
              closable: true,
              padding: 20,
              html: '<h3>' + tab.getText() + ' (copy)</h3><p>Duplicated tab</p>'
            });
            tabPanel.setActiveTab(newTab);
          }
        }, '-', {
          text: 'Delete',
          handler: function() {
            var tab = this.up('tab');
            tab.card.close();
          }
        }]
      }
    }, {
      title: 'Open',
      closable: true,
      padding: 20,
      html: '<h3>Open</h3><p>Tab 2 selected</p>'
    }, {
      title: 'Closed',
      closable: true,
      padding: 20,
      html: '<h3>Closed</h3><p>Tab 3 selected</p>'
    }],
    listeners: {
      tabchange: function(tabPanel, newCard) {
        console.log('Tab changed to:', newCard.title);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-tabs polaris-tabs--with-actions" role="tablist">
    <button 
      role="tab" 
      class="polaris-tab polaris-tab--selected" 
      aria-selected="true"
      aria-controls="panel-0"
      id="tab-0"
      data-locked="true"
    >
      All
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-1"
      id="tab-1"
    >
      Unpaid
      <button class="polaris-tab__action" aria-label="Actions for Unpaid tab">⋮</button>
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
    >
      Open
      <button class="polaris-tab__action" aria-label="Actions for Open tab">⋮</button>
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-3"
      id="tab-3"
    >
      Closed
      <button class="polaris-tab__action" aria-label="Actions for Closed tab">⋮</button>
    </button>
    <button class="polaris-tab__add-button" aria-label="Add new view">+</button>
  </div>
  <div class="polaris-card__section">
    <div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
      <h3>All</h3>
      <p>Tab 0 selected</p>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
      <h3>Unpaid</h3>
      <p>Tab 1 selected</p>
    </div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
      <h3>Open</h3>
      <p>Tab 2 selected</p>
    </div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
      <h3>Closed</h3>
      <p>Tab 3 selected</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const tabsContainer = document.querySelector('.polaris-tabs');
const tabs = document.querySelectorAll('.polaris-tab');
const panels = document.querySelectorAll('[role="tabpanel"]');
const addButton = document.querySelector('.polaris-tab__add-button');
let tabCount = tabs.length;

// Tab switching
tabs.forEach((tab, index) => {
  tab.addEventListener('click', (e) => {
    if (e.target.classList.contains('polaris-tab__action')) {
      showTabActions(tab, index);
      return;
    }
    
    selectTab(index);
  });
});

function selectTab(index) {
  tabs.forEach((t, i) => {
    t.classList.toggle('polaris-tab--selected', i === index);
    t.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
  
  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
    if (i === index) {
      panel.querySelector('p').textContent = \`Tab \${index} selected\`;
    }
  });
}

// Add new tab
addButton.addEventListener('click', () => {
  const name = prompt('Enter view name:');
  if (name) {
    addNewTab(name);
  }
});

function addNewTab(name) {
  const newIndex = tabCount++;
  
  // Create new tab
  const newTab = document.createElement('button');
  newTab.role = 'tab';
  newTab.className = 'polaris-tab';
  newTab.setAttribute('aria-selected', 'false');
  newTab.setAttribute('aria-controls', \`panel-\${newIndex}\`);
  newTab.id = \`tab-\${newIndex}\`;
  newTab.innerHTML = \`\${name} <button class="polaris-tab__action" aria-label="Actions for \${name} tab">⋮</button>\`;
  
  // Insert before add button
  tabsContainer.insertBefore(newTab, addButton);
  
  // Create new panel
  const newPanel = document.createElement('div');
  newPanel.role = 'tabpanel';
  newPanel.id = \`panel-\${newIndex}\`;
  newPanel.setAttribute('aria-labelledby', \`tab-\${newIndex}\`);
  newPanel.hidden = true;
  newPanel.innerHTML = \`<h3>\${name}</h3><p>Tab \${newIndex} selected</p>\`;
  
  document.querySelector('.polaris-card__section').appendChild(newPanel);
  
  // Add event listener
  newTab.addEventListener('click', (e) => {
    if (e.target.classList.contains('polaris-tab__action')) {
      showTabActions(newTab, newIndex);
      return;
    }
    selectTab(newIndex);
  });
  
  // Select the new tab
  selectTab(newIndex);
}

function showTabActions(tab, index) {
  if (tab.dataset.locked === 'true') return;
  
  const actions = ['Rename', 'Duplicate', 'Delete'];
  const action = prompt(\`Choose action:\\n\${actions.join('\\n')}\`);
  
  switch(action?.toLowerCase()) {
    case 'rename':
      const newName = prompt('Enter new name:');
      if (newName) {
        tab.childNodes[0].textContent = newName + ' ';
      }
      break;
    case 'duplicate':
      const tabText = tab.childNodes[0].textContent.trim();
      addNewTab(tabText + ' (copy)');
      break;
    case 'delete':
      if (confirm('Delete this tab?')) {
        tab.remove();
        panels[index].remove();
        selectTab(0);
      }
      break;
  }
}
</script>`,
    typescript: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TabAction {
  type: 'rename' | 'duplicate' | 'edit' | 'delete';
  onAction?: () => void;
  onPrimaryAction?: (value: string) => Promise<boolean>;
}

interface TabsWithActionsProps {
  initialTabs?: string[];
  canCreateNewView?: boolean;
}

function TabsWithActionsExample({ 
  initialTabs = ['All', 'Unpaid', 'Open', 'Closed', 'Local delivery', 'Local pickup'],
  canCreateNewView = true
}: TabsWithActionsProps): JSX.Element {
  const [itemStrings, setItemStrings] = useState<string[]>(initialTabs);
  const [selected, setSelected] = useState<number>(0);

  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const deleteView = useCallback((index: number): void => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  }, [itemStrings]);

  const duplicateView = useCallback(async (name: string): Promise<boolean> => {
    setItemStrings(prev => [...prev, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  }, [itemStrings.length]);

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: \`\${item}-\${index}\`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string) => {
                const newItemsStrings = itemStrings.map((tabItem, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return tabItem;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (name: string) => {
                await sleep(1);
                duplicateView(name);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));

  const onCreateNewView = useCallback(async (value: string): Promise<boolean> => {
    await sleep(500);
    setItemStrings(prev => [...prev, value]);
    setSelected(itemStrings.length);
    return true;
  }, [itemStrings.length]);

  return (
    <LegacyCard>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView={canCreateNewView}
        onCreateNewView={onCreateNewView}
      >
        <LegacyCard.Section title={tabs[selected]?.content || ''}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`
  },
  'with-badge-content': {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsWithBadgeExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-fitted-3',
      content: 'All',
      badge: '10+',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      content: 'Accepts marketing',
      badge: '4',
      panelID: 'accepts-marketing-fitted-content-3',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: true,
  items: [{
    xtype: 'tabpanel',
    tabBarPosition: 'top',
    defaults: {
      padding: 20
    },
    items: [{
      title: 'All',
      tabConfig: {
        title: 'All <span class="badge">10+</span>'
      },
      html: '<h3>All</h3><p>Tab 0 selected</p>'
    }, {
      title: 'Accepts marketing',
      tabConfig: {
        title: 'Accepts marketing <span class="badge">4</span>'
      },
      html: '<h3>Accepts marketing</h3><p>Tab 1 selected</p>'
    }],
    tabBar: {
      layout: {
        pack: 'stretch'
      }
    },
    listeners: {
      tabchange: function(tabPanel, newCard, oldCard) {
        console.log('Tab changed to:', newCard.title);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-tabs polaris-tabs--fitted" role="tablist">
    <button 
      role="tab" 
      class="polaris-tab polaris-tab--selected" 
      aria-selected="true"
      aria-controls="panel-0"
      id="tab-0"
    >
      All
      <span class="polaris-tab__badge">10+</span>
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-1"
      id="tab-1"
    >
      Accepts marketing
      <span class="polaris-tab__badge">4</span>
    </button>
  </div>
  <div class="polaris-card__section">
    <div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
      <h3>All</h3>
      <p>Tab 0 selected</p>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
      <h3>Accepts marketing</h3>
      <p>Tab 1 selected</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const tabs = document.querySelectorAll('.polaris-tab');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // Update tab states
    tabs.forEach(t => {
      t.classList.remove('polaris-tab--selected');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('polaris-tab--selected');
    tab.setAttribute('aria-selected', 'true');
    
    // Update panel visibility
    panels.forEach((panel, i) => {
      if (i === index) {
        panel.hidden = false;
        panel.querySelector('p').textContent = \`Tab \${index} selected\`;
      } else {
        panel.hidden = true;
      }
    });
  });
});
</script>`,
    typescript: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface BadgeTab extends TabProps {
  badge?: string;
}

interface TabsWithBadgeProps {
  onTabChange?: (index: number) => void;
}

function TabsWithBadgeExample({ onTabChange }: TabsWithBadgeProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      onTabChange?.(selectedTabIndex);
    },
    [onTabChange],
  );

  const tabs: BadgeTab[] = [
    {
      id: 'all-customers-fitted-3',
      content: 'All',
      badge: '10+',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-fitted-content-3',
    },
    {
      id: 'accepts-marketing-fitted-3',
      content: 'Accepts marketing',
      badge: '4',
      panelID: 'accepts-marketing-fitted-content-3',
    },
  ];

  return (
    <LegacyCard>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange} fitted>
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`
  },
  'with-custom-disclosure': {
    react: `import {LegacyCard, Tabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function TabsWithCustomDisclosureExample() {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'all-customers-4',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-4',
    },
    {
      id: 'accepts-marketing-4',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-4',
    },
    {
      id: 'repeat-customers-4',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-4',
    },
    {
      id: 'prospects-4',
      content: 'Prospects',
      panelID: 'prospects-content-4',
    },
  ];

  return (
    <LegacyCard>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="More views"
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  border: true,
  items: [{
    xtype: 'tabpanel',
    border: false,
    tabBar: {
      items: [{
        xtype: 'tbfill'
      }, {
        xtype: 'button',
        text: 'More views',
        ui: 'plain',
        menu: [{
          text: 'Repeat customers',
          handler: function() {
            console.log('Show Repeat customers');
          }
        }, {
          text: 'Prospects',
          handler: function() {
            console.log('Show Prospects');
          }
        }]
      }]
    },
    items: [{
      title: 'All',
      padding: 20,
      html: '<h3>All</h3><p>Tab 0 selected</p>'
    }, {
      title: 'Accepts marketing',
      padding: 20,
      html: '<h3>Accepts marketing</h3><p>Tab 1 selected</p>'
    }, {
      title: 'Repeat customers',
      padding: 20,
      hidden: true,
      html: '<h3>Repeat customers</h3><p>Tab 2 selected</p>'
    }, {
      title: 'Prospects',
      padding: 20,
      hidden: true,
      html: '<h3>Prospects</h3><p>Tab 3 selected</p>'
    }],
    listeners: {
      tabchange: function(tabPanel, newCard, oldCard) {
        console.log('Tab changed to:', newCard.title);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-tabs" role="tablist">
    <button 
      role="tab" 
      class="polaris-tab polaris-tab--selected" 
      aria-selected="true"
      aria-controls="panel-0"
      id="tab-0"
    >
      All
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-1"
      id="tab-1"
    >
      Accepts marketing
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
    >
      Repeat customers
    </button>
    <button 
      role="tab" 
      class="polaris-tab" 
      aria-selected="false"
      aria-controls="panel-3"
      id="tab-3"
    >
      Prospects
    </button>
    <button class="polaris-tabs__disclosure" aria-label="More tabs">
      More views
      <span class="polaris-icon">▼</span>
    </button>
  </div>
  <div class="polaris-card__section">
    <div role="tabpanel" id="panel-0" aria-labelledby="tab-0">
      <h3>All</h3>
      <p>Tab 0 selected</p>
    </div>
    <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" hidden>
      <h3>Accepts marketing</h3>
      <p>Tab 1 selected</p>
    </div>
    <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>
      <h3>Repeat customers</h3>
      <p>Tab 2 selected</p>
    </div>
    <div role="tabpanel" id="panel-3" aria-labelledby="tab-3" hidden>
      <h3>Prospects</h3>
      <p>Tab 3 selected</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const tabs = document.querySelectorAll('.polaris-tab');
const panels = document.querySelectorAll('[role="tabpanel"]');
const disclosureButton = document.querySelector('.polaris-tabs__disclosure');

// Tab switching
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    selectTab(index);
  });
});

function selectTab(index) {
  tabs.forEach((t, i) => {
    t.classList.toggle('polaris-tab--selected', i === index);
    t.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
  
  panels.forEach((panel, i) => {
    panel.hidden = i !== index;
    if (i === index) {
      panel.querySelector('p').textContent = \`Tab \${index} selected\`;
    }
  });
}

// Disclosure menu
disclosureButton.addEventListener('click', (e) => {
  e.stopPropagation();
  
  // Create and show dropdown menu
  const menu = document.createElement('div');
  menu.className = 'polaris-tabs__menu';
  menu.innerHTML = \`
    <button class="polaris-tabs__menu-item" data-tab="2">Repeat customers</button>
    <button class="polaris-tabs__menu-item" data-tab="3">Prospects</button>
  \`;
  
  // Position menu
  const rect = disclosureButton.getBoundingClientRect();
  menu.style.position = 'absolute';
  menu.style.top = rect.bottom + 'px';
  menu.style.right = (window.innerWidth - rect.right) + 'px';
  
  document.body.appendChild(menu);
  
  // Handle menu item clicks
  menu.querySelectorAll('.polaris-tabs__menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const tabIndex = parseInt(item.dataset.tab);
      selectTab(tabIndex);
      menu.remove();
    });
  });
  
  // Close menu on outside click
  document.addEventListener('click', function closeMenu() {
    menu.remove();
    document.removeEventListener('click', closeMenu);
  });
});
</script>`,
    typescript: `import {LegacyCard, Tabs, TabProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface TabsWithDisclosureProps {
  disclosureText?: string;
  onTabChange?: (index: number) => void;
}

function TabsWithCustomDisclosureExample({ 
  disclosureText = "More views",
  onTabChange 
}: TabsWithDisclosureProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => {
      setSelected(selectedTabIndex);
      onTabChange?.(selectedTabIndex);
    },
    [onTabChange],
  );

  const tabs: TabProps[] = [
    {
      id: 'all-customers-4',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-content-4',
    },
    {
      id: 'accepts-marketing-4',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-content-4',
    },
    {
      id: 'repeat-customers-4',
      content: 'Repeat customers',
      panelID: 'repeat-customers-content-4',
    },
    {
      id: 'prospects-4',
      content: 'Prospects',
      panelID: 'prospects-content-4',
    },
  ];

  return (
    <LegacyCard>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText={disclosureText}
      >
        <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section>
      </Tabs>
    </LegacyCard>
  );
}`
  }
};

// List Examples
export const listExamples = {
  bulleted: {
    react: `import {List} from '@shopify/polaris';
import React from 'react';

function List() {
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
    vanilla: `<!-- HTML Structure -->
<ul class="polaris-list list--bullet">
  <li class="polaris-list__item">Yellow shirt</li>
  <li class="polaris-list__item">Red shirt</li>
  <li class="polaris-list__item">Green shirt</li>
</ul>
`,
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

function List({ 
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
  },
  'extra-tight': {
    react: `import {List} from '@shopify/polaris';
import React from 'react';

function ListExtraTightExample() {
  return (
    <List gap="extraTight">
      <List.Item>Yellow shirt</List.Item>
      <List.Item>Red shirt</List.Item>
      <List.Item>Green shirt</List.Item>
    </List>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  cls: 'polaris-list polaris-list--extra-tight',
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 2 0'
  },
  items: [{
    xtype: 'component',
    html: '<li class="polaris-list__item">• Yellow shirt</li>'
  }, {
    xtype: 'component',
    html: '<li class="polaris-list__item">• Red shirt</li>'
  }, {
    xtype: 'component',
    html: '<li class="polaris-list__item">• Green shirt</li>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<ul class="polaris-list polaris-list--extra-tight">
  <li class="polaris-list__item">Yellow shirt</li>
  <li class="polaris-list__item">Red shirt</li>
  <li class="polaris-list__item">Green shirt</li>
</ul>`,
    typescript: `import {List} from '@shopify/polaris';
import React from 'react';

type ListGap = 'none' | 'extraTight' | 'tight' | 'loose';

interface ExtraTightListProps {
  items?: string[];
  gap?: ListGap;
}

function ExtraTightList({
  items = ['Yellow shirt', 'Red shirt', 'Green shirt'],
  gap = "extraTight"
}: ExtraTightListProps): JSX.Element {
  return (
    <List gap={gap}>
      {items.map((item, index) => (
        <List.Item key={index}>{item}</List.Item>
      ))}
    </List>
  );
}`
  },
  numbered: {
    react: `import {List} from '@shopify/polaris';
import React from 'react';

function List() {
  return (
    <List type="number">
      <List.Item>First item</List.Item>
      <List.Item>Second item</List.Item>
      <List.Item>Third Item</List.Item>
    </List>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  cls: 'polaris-list polaris-list--numbered',
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 8 0'
  },
  items: [{
    xtype: 'component',
    html: '<li class="polaris-list__item">1. First item</li>'
  }, {
    xtype: 'component',
    html: '<li class="polaris-list__item">2. Second item</li>'
  }, {
    xtype: 'component',
    html: '<li class="polaris-list__item">3. Third Item</li>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<ol class="polaris-list polaris-list--numbered">
  <li class="polaris-list__item">First item</li>
  <li class="polaris-list__item">Second item</li>
  <li class="polaris-list__item">Third Item</li>
</ol>`,
    typescript: `import {List} from '@shopify/polaris';
import React from 'react';

type ListType = 'bullet' | 'number';

interface NumberedListProps {
  items?: string[];
  type?: ListType;
}

function NumberedList({
  items = ['First item', 'Second item', 'Third Item'],
  type = "number"
}: NumberedListProps): JSX.Element {
  return (
    <List type={type}>
      {items.map((item, index) => (
        <List.Item key={index}>{item}</List.Item>
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
    vanilla: `<!-- HTML Structure -->
<span class="polaris-icon">
  <svg viewBox="0 0 20 20" focusable="false" aria-hidden="true">
    <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 9h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V8a1 1 0 0 1 2 0v3z" fill="currentColor"/>
  </svg>
</span>
`,
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
  },
  colored: {
    react: `import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';

function IconColoredExample() {
  return (
    <div>
      <Icon source={PlusCircleIcon} tone="base" />
      <Icon source={PlusCircleIcon} tone="subdued" />
      <Icon source={PlusCircleIcon} tone="primary" />
      <Icon source={PlusCircleIcon} tone="info" />
      <Icon source={PlusCircleIcon} tone="success" />
      <Icon source={PlusCircleIcon} tone="caution" />
      <Icon source={PlusCircleIcon} tone="warning" />
      <Icon source={PlusCircleIcon} tone="critical" />
    </div>
  );
}`,
    extjs: `Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  defaults: {
    margin: '0 10 0 0'
  },
  items: [{
    xtype: 'component',
    html: '<span class="icon icon--base">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--subdued">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--primary">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--info">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--success">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--caution">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--warning">⊕</span>'
  }, {
    xtype: 'component',
    html: '<span class="icon icon--critical">⊕</span>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-icon-container">
  <span class="polaris-icon polaris-icon--tone-base">⊕</span>
  <span class="polaris-icon polaris-icon--tone-subdued">⊕</span>
  <span class="polaris-icon polaris-icon--tone-primary">⊕</span>
  <span class="polaris-icon polaris-icon--tone-info">⊕</span>
  <span class="polaris-icon polaris-icon--tone-success">⊕</span>
  <span class="polaris-icon polaris-icon--tone-caution">⊕</span>
  <span class="polaris-icon polaris-icon--tone-warning">⊕</span>
  <span class="polaris-icon polaris-icon--tone-critical">⊕</span>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-icon').forEach(icon => {
  icon.addEventListener('click', (e) => {
    console.log(\`Icon with tone \${e.target.className.match(/tone-(\\w+)/)?.[1] || 'default'} clicked\`);
  });
});
</script>`,
    typescript: `import {Icon} from '@shopify/polaris';
import {PlusCircleIcon} from '@shopify/polaris-icons';
import React from 'react';

type IconTone = 'base' | 'subdued' | 'primary' | 'info' | 'success' | 'caution' | 'warning' | 'critical';

interface IconColoredExampleProps {
  onIconClick?: (tone: IconTone) => void;
}

function IconColoredExample({ onIconClick }: IconColoredExampleProps): JSX.Element {
  const tones: IconTone[] = ['base', 'subdued', 'primary', 'info', 'success', 'caution', 'warning', 'critical'];

  return (
    <div>
      {tones.map((tone) => (
        <Icon 
          key={tone}
          source={PlusCircleIcon} 
          tone={tone}
          onClick={() => onIconClick?.(tone)}
        />
      ))}
    </div>
  );
}`
  },
  'with-custom-svg': {
    react: `import {Icon} from '@shopify/polaris';
import React from 'react';

function IconWithCustomSvgExample() {
  return (
    <Icon source="<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>" />
  );
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<span class="icon icon--custom"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0" /></svg></span>',
  listeners: {
    render: function(component) {
      component.getEl().on('click', function() {
        console.log('Custom SVG icon clicked');
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<span class="polaris-icon polaris-icon--custom">
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0" />
  </svg>
</span>

<script>
// JavaScript behavior
document.querySelector('.polaris-icon--custom').addEventListener('click', (e) => {
  console.log('Custom SVG icon clicked');
});
</script>`,
    typescript: `import {Icon} from '@shopify/polaris';
import React from 'react';

interface IconWithCustomSvgExampleProps {
  onIconClick?: () => void;
  accessibilityLabel?: string;
}

function IconWithCustomSvgExample({ 
  onIconClick,
  accessibilityLabel = 'Download arrow'
}: IconWithCustomSvgExampleProps): JSX.Element {
  const customSvg = "<svg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M10.707 17.707l5-5a.999.999 0 1 0-1.414-1.414L11 14.586V3a1 1 0 1 0-2 0v11.586l-3.293-3.293a.999.999 0 1 0-1.414 1.414l5 5a.999.999 0 0 0 1.414 0' /></svg>";

  return (
    <Icon 
      source={customSvg}
      accessibilityLabel={accessibilityLabel}
      onClick={onIconClick}
    />
  );
}`
  },
  'with-custom-svg-and-color': {
    react: `import {Icon} from '@shopify/polaris';
import React from 'react';

function IconWithCustomSvgAndColorExample() {
  const iconContent = () => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return <Icon source={iconContent} tone="warning" />;
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<span class="icon icon--warning"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="rebeccapurple" /><circle cx="10" cy="10" r="6" fill="currentColor" /><circle cx="10" cy="10" r="3" /></svg></span>',
  listeners: {
    render: function(component) {
      component.getEl().on('click', function() {
        console.log('Custom colored icon clicked');
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<span class="polaris-icon polaris-icon--tone-warning">
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
    <circle cx="10" cy="10" r="6" fill="currentColor" />
    <circle cx="10" cy="10" r="3" />
  </svg>
</span>

<script>
// JavaScript behavior
document.querySelector('.polaris-icon--tone-warning').addEventListener('click', (e) => {
  console.log('Custom colored icon clicked');
});
</script>`,
    typescript: `import {Icon} from '@shopify/polaris';
import React, {ReactElement} from 'react';

interface IconWithCustomSvgAndColorExampleProps {
  tone?: 'base' | 'subdued' | 'primary' | 'info' | 'success' | 'caution' | 'warning' | 'critical';
  onIconClick?: () => void;
}

function IconWithCustomSvgAndColorExample({ 
  tone = 'warning',
  onIconClick 
}: IconWithCustomSvgAndColorExampleProps): JSX.Element {
  const iconContent = (): ReactElement => {
    return (
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="rebeccapurple" />
        <circle cx="10" cy="10" r="6" fill="currentColor" />
        <circle cx="10" cy="10" r="3" />
      </svg>
    );
  };

  return (
    <Icon 
      source={iconContent} 
      tone={tone}
      onClick={onIconClick}
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

function Avatar() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-avatar avatar--customer" aria-label="Farrah" role="img">
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z" fill="currentColor"/>
  </svg>
</div>
`,
    typescript: `import {Avatar} from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  name: string;
  customer?: boolean;
  source?: string;
}

function Avatar({ 
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-dropdown">
  <button class="polaris-button polaris-button--disclosure" aria-expanded="false" aria-controls="staff-menu">
    Manage staff
    <svg class="polaris-icon polaris-icon--caret" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7 8l3 3 3-3" stroke="currentColor" stroke-width="1.5" fill="none"/>
    </svg>
  </button>
  <div id="staff-menu" class="polaris-dropdown-menu" hidden>
    <ul class="polaris-action-list" role="list">
      <li class="polaris-action-list__item">
        <button class="polaris-action-list__button">
          <span class="polaris-avatar polaris-avatar--xs polaris-avatar--customer" aria-label="Chet Baker">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4.991 5c-.145 0-.218 0-.253-.003a.75.75 0 0 1-.497-1.246c.19-.214.52-.429.835-.628a10.28 10.28 0 0 1 2.368-1.082c1.264-.387 2.733-.584 4.538-.584 1.805 0 3.274.197 4.537.584a10.278 10.278 0 0 1 2.369 1.082c.315.2.644.414.835.628a.75.75 0 0 1-.497 1.246c-.036.003-.109.003-.253.003h-13.982z" fill="currentColor"/>
            </svg>
          </span>
          <span>Chet Baker</span>
        </button>
      </li>
      <li class="polaris-action-list__item">
        <button class="polaris-action-list__button">
          <span class="polaris-avatar polaris-avatar--xs polaris-avatar--customer" aria-label="Farrah Fawcett">
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

<script>
// JavaScript behavior
const button = document.querySelector('.polaris-button--disclosure');
const menu = document.getElementById('staff-menu');

button.addEventListener('click', () => {
  const isOpen = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !isOpen);
  menu.hidden = isOpen;
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.polaris-dropdown')) {
    button.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
  }
});
</script>`,
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

function Avatar() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-avatar avatar--initials" aria-label="Woluwayemisi Weun-Jung" role="img">
  <span>WW</span>
</div>
`,
    typescript: `import {Avatar} from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  initials: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

function Avatar({ 
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card" style="width: 320px;">
  <div class="polaris-bleed bleed--inline">
    <div class="polaris-placeholder">
      <span>marginInline</span>
    </div>
  </div>
</div>
`,
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack">
  <div class="polaris-card" style="width: 320px;">
    <div class="polaris-bleed bleed--inline-start">
      <div class="polaris-placeholder">
        <span>marginInlineStart</span>
      </div>
    </div>
  </div>
  
  <div class="polaris-card" style="width: 320px;">
    <div class="polaris-bleed bleed--inline-end">
      <div class="polaris-placeholder">
        <span>marginInlineEnd</span>
      </div>
    </div>
  </div>
  
  <div class="polaris-card" style="width: 320px;">
    <div class="polaris-bleed bleed--block-start">
      <div class="polaris-placeholder">
        <span>marginBlockStart</span>
      </div>
    </div>
  </div>
  
  <div class="polaris-card" style="width: 320px;">
    <div class="polaris-bleed bleed--block-end">
      <div class="polaris-placeholder">
        <span>marginBlockEnd</span>
      </div>
    </div>
  </div>
</div>
`,
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

function VerticalBleed() {
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
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card" style="width: 320px;">
  <div class="bleed bleed--block">
    <div class="placeholder placeholder--vertical">
      <span>marginBlock</span>
    </div>
  </div>
</div>
`,
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

function VerticalBleed(): JSX.Element {
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
  }
};

// Spinner Examples with focus management
export const spinnerFocusExamples = {
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
        <Form onSubmit={(formData) => console.log('[Form] Submitted:', formData)}>
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
        document.querySelector('[data-content="' + newTab + '"]').classList.add('polaris-tab-content--active');
        
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

function TextBody() {
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

function TextBody({ 
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

function TextHeading() {
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

function TextHeading({ 
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

function TextTone() {
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

function TextTone({ 
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

function TextWeight() {
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

function TextWeight({ 
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

function TextAlign() {
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

function TextAlign({ 
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

function BlockStack() {
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

function BlockStack({ 
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

function BlockStack() {
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

function BlockStack({ 
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

function InlineStack() {
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

function InlineStack({ 
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

function InlineStack() {
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

function InlineStack({ 
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

function LegacyStack() {
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

function LegacyStack({ 
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

function LegacyStack() {
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

function LegacyStack({ 
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

function LegacyStack() {
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

function LegacyStack({ 
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

function LegacyStack() {
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

function LegacyStack({ 
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

function EmptyState() {
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

function EmptyState({
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

function EmptyState() {
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

function EmptyState({
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

function EmptyState() {
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

function EmptyState({
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
export const calloutCards = {
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

interface CalloutCardProps {
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
}: CalloutCardProps): JSX.Element {
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
      onDismiss={() => console.log('[Dismiss] Component dismissed')}
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
export const mediaCards = {
  'default': {
    react: `import {MediaCard} from '@shopify/polaris';
import React from 'react';

function MediaCard() {
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

interface MediaCardProps {
  title?: string;
  description?: string;
  primaryAction?: MediaCardAction;
  popoverActions?: MediaCardAction[];
  imageSrc?: string;
  imageAlt?: string;
}

function MediaCard({
  title = "Getting Started",
  description = "Discover how Shopify can power up your entrepreneurial journey.",
  primaryAction = {
    content: 'Learn about getting started',
    onAction: () => console.log('Primary action clicked'),
  },
  popoverActions = [{content: 'Dismiss', onAction: () => console.log('Dismissed')}],
  imageSrc = "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850",
  imageAlt = ""
}: MediaCardProps): JSX.Element {
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

function MediaCard() {
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

function MediaCard({
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

function MediaCard() {
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

function MediaCard({
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
// Action List Examples
export const actionListExamples = {
  'with-destructive-item': {
    react: `import {Button, Popover, ActionList} from '@shopify/polaris';
import {ImportIcon, ExportIcon, DeleteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function ActionListWithDestructiveItem() {
  const [active, setActive] = useState(true);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              title: 'File options',
              items: [
                {
                  active: true,
                  content: 'Import file',
                  icon: ImportIcon,
                },
                {content: 'Export file', icon: ExportIcon},
                {
                  destructive: true,
                  content: 'Delete file',
                  icon: DeleteIcon,
                },
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'More actions',
  menu: {
    items: [{
      text: 'Import file',
      iconCls: 'x-fa fa-upload',
      handler: function() {
        console.log('Import file clicked');
      }
    }, {
      text: 'Export file', 
      iconCls: 'x-fa fa-download',
      handler: function() {
        console.log('Export file clicked');
      }
    }, '-', {
      text: 'Delete file',
      iconCls: 'x-fa fa-trash',
      cls: 'destructive-item',
      handler: function() {
        console.log('Delete file clicked');
      }
    }]
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-action-list-container">
  <button class="polaris-button polaris-button--disclosure" id="action-trigger">More actions</button>
  <div class="polaris-popover" id="action-popover" style="display: none;">
    <div class="polaris-action-list">
      <div class="polaris-action-list__section">
        <h3 class="polaris-action-list__section-title">File options</h3>
        <ul class="polaris-action-list__items">
          <li class="polaris-action-list__item polaris-action-list__item--active">
            <button class="polaris-action-list__button">
              <span class="polaris-icon">📥</span>
              Import file
            </button>
          </li>
          <li class="polaris-action-list__item">
            <button class="polaris-action-list__button">
              <span class="polaris-icon">📤</span>
              Export file
            </button>
          </li>
          <li class="polaris-action-list__item polaris-action-list__item--destructive">
            <button class="polaris-action-list__button">
              <span class="polaris-icon">🗑️</span>
              Delete file
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const trigger = document.getElementById('action-trigger');
const popover = document.getElementById('action-popover');

trigger.addEventListener('click', () => {
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('.polaris-action-list__button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(e.target.textContent.trim() + ' clicked');
    popover.style.display = 'none';
  });
});
</script>`,
    typescript: `import {Button, Popover, ActionList} from '@shopify/polaris';
import {ImportIcon, ExportIcon, DeleteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

interface ActionListWithDestructiveItemProps {
  onImport?: () => void;
  onExport?: () => void;
  onDelete?: () => void;
}

function ActionListWithDestructiveItem({
  onImport,
  onExport,
  onDelete
}: ActionListWithDestructiveItemProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      More actions
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={active}
        activator={activator}
        autofocusTarget="first-node"
        onClose={toggleActive}
      >
        <ActionList
          actionRole="menuitem"
          sections={[
            {
              title: 'File options',
              items: [
                {
                  active: true,
                  content: 'Import file',
                  icon: ImportIcon,
                  onAction: onImport,
                },
                {
                  content: 'Export file', 
                  icon: ExportIcon,
                  onAction: onExport,
                },
                {
                  destructive: true,
                  content: 'Delete file',
                  icon: DeleteIcon,
                  onAction: onDelete,
                },
              ],
            },
          ]}
        />
      </Popover>
    </div>
  );
}`
  }
};

// Popover Examples
export const popoverExamples = {
  'with-content-and-actions': {
    react: `import {Button, Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function PopoverWithContentAndActions() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Sales channels
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <Popover.Pane fixed>
          <Popover.Section>
            <p>Available sales channels</p>
          </Popover.Section>
        </Popover.Pane>
        <Popover.Pane>
          <ActionList
            actionRole="menuitem"
            items={[
              {content: 'Online store'},
              {content: 'Facebook'},
              {content: 'Shopify POS'},
            ]}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Sales channels',
  menu: {
    items: [{
      text: 'Available sales channels',
      disabled: true,
      ui: 'header'
    }, '-', {
      text: 'Online store',
      handler: function() {
        console.log('Online store selected');
      }
    }, {
      text: 'Facebook',
      handler: function() {
        console.log('Facebook selected');
      }
    }, {
      text: 'Shopify POS',
      handler: function() {
        console.log('Shopify POS selected');
      }
    }]
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-popover-container">
  <button class="polaris-button polaris-button--disclosure" id="popover-trigger">Sales channels</button>
  <div class="polaris-popover" id="sales-popover" style="display: none;">
    <div class="polaris-popover__content">
      <div class="polaris-popover__section">
        <p>Available sales channels</p>
      </div>
      <div class="polaris-action-list">
        <ul class="polaris-action-list__items">
          <li class="polaris-action-list__item">
            <button class="polaris-action-list__button">Online store</button>
          </li>
          <li class="polaris-action-list__item">
            <button class="polaris-action-list__button">Facebook</button>
          </li>
          <li class="polaris-action-list__item">
            <button class="polaris-action-list__button">Shopify POS</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const trigger = document.getElementById('popover-trigger');
const popover = document.getElementById('sales-popover');

trigger.addEventListener('click', () => {
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('.polaris-action-list__button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log(e.target.textContent + ' selected');
    popover.style.display = 'none';
  });
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!trigger.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,
    typescript: `import {Button, Popover, ActionList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface PopoverWithContentAndActionsProps {
  onChannelSelect?: (channel: string) => void;
}

function PopoverWithContentAndActions({
  onChannelSelect
}: PopoverWithContentAndActionsProps): JSX.Element {
  const [popoverActive, setPopoverActive] = useState<boolean>(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive((popoverActive) => !popoverActive),
    [],
  );

  const handleChannelSelect = useCallback((channel: string) => {
    onChannelSelect?.(channel);
    togglePopoverActive();
  }, [onChannelSelect, togglePopoverActive]);

  const activator = (
    <Button onClick={togglePopoverActive} disclosure>
      Sales channels
    </Button>
  );

  return (
    <div style={{height: '250px'}}>
      <Popover
        active={popoverActive}
        activator={activator}
        autofocusTarget="first-node"
        onClose={togglePopoverActive}
      >
        <Popover.Pane fixed>
          <Popover.Section>
            <p>Available sales channels</p>
          </Popover.Section>
        </Popover.Pane>
        <Popover.Pane>
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: 'Online store',
                onAction: () => handleChannelSelect('Online store')
              },
              {
                content: 'Facebook',
                onAction: () => handleChannelSelect('Facebook')
              },
              {
                content: 'Shopify POS',
                onAction: () => handleChannelSelect('Shopify POS')
              },
            ]}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}`
  }
};

// Tooltip Examples  
export const tooltipExamples = {
  default: {
    react: `import {Tooltip, Text} from '@shopify/polaris';
import React from 'react';

function TooltipDefault() {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip active content="This order has shipping labels.">
        <Text fontWeight="bold" as="span">
          Order #1001
        </Text>
      </Tooltip>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 20,
  items: [{
    xtype: 'label',
    text: 'Order #1001',
    style: 'font-weight: bold; cursor: pointer;',
    listeners: {
      render: function(label) {
        Ext.tip.QuickTipManager.init();
        label.getEl().set({
          'data-qtip': 'This order has shipping labels.'
        });
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-tooltip-container" style="padding: 75px 0;">
  <span class="polaris-text polaris-text--bold" 
        id="tooltip-trigger" 
        onmouseenter="showTooltip()" 
        onmouseleave="hideTooltip()">
    Order #1001
  </span>
  <div class="polaris-tooltip" id="tooltip" style="display: none;">
    This order has shipping labels.
  </div>
</div>

<script>
// JavaScript behavior
function showTooltip() {
  document.getElementById('tooltip').style.display = 'block';
}

function hideTooltip() {
  document.getElementById('tooltip').style.display = 'none';
}

// Position tooltip near trigger
const trigger = document.getElementById('tooltip-trigger');
const tooltip = document.getElementById('tooltip');

trigger.addEventListener('mouseenter', (e) => {
  const rect = e.target.getBoundingClientRect();
  tooltip.style.position = 'absolute';
  tooltip.style.top = (rect.bottom + 5) + 'px';
  tooltip.style.left = rect.left + 'px';
});
</script>`,
    typescript: `import {Tooltip, Text} from '@shopify/polaris';
import React from 'react';

interface TooltipDefaultProps {
  content?: string;
  children?: React.ReactNode;
  active?: boolean;
}

function TooltipDefault({ 
  content = "This order has shipping labels.",
  children,
  active = true 
}: TooltipDefaultProps): JSX.Element {
  return (
    <div style={{padding: '75px 0'}}>
      <Tooltip active={active} content={content}>
        {children || (
          <Text fontWeight="bold" as="span">
            Order #1001
          </Text>
        )}
      </Tooltip>
    </div>
  );
}`
  }
};

// Navigation Examples
export const navigationExamples = {
  default: {
    react: `import {Frame, Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, ProductIcon} from '@shopify/polaris-icons';
import React from 'react';

function NavigationDefault() {
  return (
    <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              label: 'Home',
              icon: HomeIcon,
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Orders',
              icon: OrderIcon,
              badge: '15',
            },
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Products',
              icon: ProductIcon,
            },
          ]}
        />
      </Navigation>
    </Frame>
  );
}`,
    extjs: `Ext.create('Ext.tree.Panel', {
  title: 'Navigation',
  width: 250,
  height: 400,
  rootVisible: false,
  store: Ext.create('Ext.data.TreeStore', {
    root: {
      expanded: true,
      children: [{
        text: 'Home',
        iconCls: 'x-fa fa-home',
        leaf: true,
        href: '#'
      }, {
        text: 'Orders',
        iconCls: 'x-fa fa-shopping-cart',
        leaf: true,
        href: '#',
        qtip: '15 orders'
      }, {
        text: 'Products',
        iconCls: 'x-fa fa-cube',
        leaf: true,
        href: '#'
      }]
    }
  }),
  listeners: {
    itemclick: function(view, record) {
      if (record.get('href')) {
        console.log('Navigate to:', record.get('text'));
      }
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame">
  <nav class="polaris-navigation">
    <ul class="polaris-navigation__section">
      <li class="polaris-navigation__item polaris-navigation__item--active">
        <a href="#" class="polaris-navigation__link">
          <span class="polaris-icon">🏠</span>
          <span class="polaris-navigation__text">Home</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="#" class="polaris-navigation__link">
          <span class="polaris-icon">📦</span>
          <span class="polaris-navigation__text">Orders</span>
          <span class="polaris-badge">15</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="#" class="polaris-navigation__link">
          <span class="polaris-icon">📋</span>
          <span class="polaris-navigation__text">Products</span>
        </a>
      </li>
    </ul>
  </nav>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-navigation__link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active class from all items
    document.querySelectorAll('.polaris-navigation__item').forEach(item => {
      item.classList.remove('polaris-navigation__item--active');
    });
    
    // Add active class to clicked item
    e.currentTarget.parentElement.classList.add('polaris-navigation__item--active');
    
    const text = e.currentTarget.querySelector('.polaris-navigation__text').textContent;
    console.log('Navigate to:', text);
  });
});
</script>`,
    typescript: `import {Frame, Navigation} from '@shopify/polaris';
import {HomeIcon, OrderIcon, ProductIcon} from '@shopify/polaris-icons';
import React from 'react';

interface NavigationItem {
  url: string;
  label: string;
  icon: React.ComponentType;
  badge?: string;
  excludePaths?: string[];
}

interface NavigationDefaultProps {
  location?: string;
  onItemClick?: (item: NavigationItem) => void;
}

function NavigationDefault({ 
  location = "/",
  onItemClick 
}: NavigationDefaultProps): JSX.Element {
  const items: NavigationItem[] = [
    {
      url: '#',
      label: 'Home',
      icon: HomeIcon,
    },
    {
      url: '#',
      excludePaths: ['#'],
      label: 'Orders',
      icon: OrderIcon,
      badge: '15',
    },
    {
      url: '#',
      excludePaths: ['#'],
      label: 'Products',
      icon: ProductIcon,
    },
  ];

  return (
    <Frame>
      <Navigation location={location}>
        <Navigation.Section
          items={items.map(item => ({
            ...item,
            onAction: () => onItemClick?.(item)
          }))}
        />
      </Navigation>
    </Frame>
  );
}`
  }
};

// Form Examples
export const formExamples = {
  'custom-on-submit': {
    react: `import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function FormCustomOnSubmit() {
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', { email, newsletter });
    setEmail('');
    setNewsletter(false);
  }, [email, newsletter]);

  const handleNewsLetterChange = useCallback(
    (value: boolean) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value: string) => setEmail(value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
          helpText={
            <span>
              We'll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Newsletter Signup',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'checkboxfield',
    fieldLabel: 'Newsletter',
    boxLabel: 'Sign up for the Polaris newsletter',
    name: 'newsletter',
    inputValue: true
  }, {
    xtype: 'textfield',
    fieldLabel: 'Email',
    name: 'email',
    vtype: 'email',
    allowBlank: false,
    emptyText: 'Enter your email address',
    helpText: 'We\\'ll use this email address to inform you on future changes to Polaris.'
  }],
  buttons: [{
    text: 'Submit',
    formBind: true,
    handler: function() {
      var form = this.up('form').getForm();
      if (form.isValid()) {
        var values = form.getValues();
        console.log('Form submitted:', values);
        form.reset();
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<form class="polaris-form" id="newsletter-form">
  <div class="polaris-form-layout">
    <div class="polaris-form-layout__item">
      <label class="polaris-checkbox">
        <input type="checkbox" class="polaris-checkbox__input" id="newsletter">
        <span class="polaris-checkbox__label">Sign up for the Polaris newsletter</span>
      </label>
    </div>
    
    <div class="polaris-form-layout__item">
      <div class="polaris-text-field">
        <label class="polaris-text-field__label" for="email">Email</label>
        <input 
          type="email" 
          id="email" 
          class="polaris-text-field__input" 
          autocomplete="email"
          required>
        <div class="polaris-text-field__help">
          We'll use this email address to inform you on future changes to Polaris.
        </div>
      </div>
    </div>
    
    <div class="polaris-form-layout__item">
      <button type="submit" class="polaris-button polaris-button--primary">Submit</button>
    </div>
  </div>
</form>

<script>
// JavaScript behavior
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const email = document.getElementById('email').value;
  const newsletter = document.getElementById('newsletter').checked;
  
  console.log('Form submitted:', { email, newsletter });
  
  // Reset form
  e.target.reset();
});
</script>`,
    typescript: `import {Form, FormLayout, Checkbox, TextField, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface FormData {
  email: string;
  newsletter: boolean;
}

interface FormCustomOnSubmitProps {
  onSubmit?: (data: FormData) => void;
  initialEmail?: string;
  initialNewsletter?: boolean;
}

function FormCustomOnSubmit({
  onSubmit,
  initialEmail = '',
  initialNewsletter = false
}: FormCustomOnSubmitProps): JSX.Element {
  const [newsletter, setNewsletter] = useState<boolean>(initialNewsletter);
  const [email, setEmail] = useState<string>(initialEmail);

  const handleSubmit = useCallback(() => {
    const formData: FormData = { email, newsletter };
    onSubmit?.(formData);
    setEmail('');
    setNewsletter(false);
  }, [email, newsletter, onSubmit]);

  const handleNewsLetterChange = useCallback(
    (value: boolean) => setNewsletter(value),
    [],
  );

  const handleEmailChange = useCallback((value: string) => setEmail(value), []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <Checkbox
          label="Sign up for the Polaris newsletter"
          checked={newsletter}
          onChange={handleNewsLetterChange}
        />

        <TextField
          value={email}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          autoComplete="email"
          helpText={
            <span>
              We'll use this email address to inform you on future changes to
              Polaris.
            </span>
          }
        />

        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}`
  }
};

// Autocomplete Examples
export const autocompleteExamples = {
  default: {
    react: `import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';

function AutocompleteDefault() {
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || '');
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <div style={{height: '225px'}}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Tags',
  store: Ext.create('Ext.data.Store', {
    fields: ['value', 'label'],
    data: [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'}
    ]
  }),
  displayField: 'label',
  valueField: 'value',
  typeAhead: true,
  queryMode: 'local',
  forceSelection: false,
  emptyText: 'Search tags...',
  width: 300,
  listeners: {
    select: function(combo, record) {
      console.log('Selected:', record.get('label'));
    },
    change: function(field, newValue) {
      console.log('Input changed:', newValue);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-autocomplete" style="height: 225px;">
  <div class="polaris-text-field">
    <label class="polaris-text-field__label" for="autocomplete-input">Tags</label>
    <div class="polaris-text-field__input-wrapper">
      <span class="polaris-text-field__prefix">🔍</span>
      <input 
        type="text" 
        id="autocomplete-input" 
        class="polaris-text-field__input" 
        placeholder="Search"
        autocomplete="off">
    </div>
  </div>
  
  <div class="polaris-autocomplete__results" id="autocomplete-results" style="display: none;">
    <ul class="polaris-option-list">
      <!-- Options will be populated by JavaScript -->
    </ul>
  </div>
</div>

<script>
// JavaScript behavior
const options = [
  {value: 'rustic', label: 'Rustic'},
  {value: 'antique', label: 'Antique'},
  {value: 'vinyl', label: 'Vinyl'},
  {value: 'vintage', label: 'Vintage'},
  {value: 'refurbished', label: 'Refurbished'}
];

const input = document.getElementById('autocomplete-input');
const results = document.getElementById('autocomplete-results');
const optionsList = results.querySelector('.polaris-option-list');

input.addEventListener('input', (e) => {
  const value = e.target.value.toLowerCase();
  
  if (value === '') {
    results.style.display = 'none';
    return;
  }
  
  const filtered = options.filter(option => 
    option.label.toLowerCase().includes(value)
  );
  
  optionsList.innerHTML = filtered.map(option => 
    '<li class="polaris-option-list__item" data-value="' + option.value + '">' + option.label + '</li>'
  ).join('');
  
  results.style.display = filtered.length ? 'block' : 'none';
});

// Handle option selection
optionsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('polaris-option-list__item')) {
    input.value = e.target.textContent;
    results.style.display = 'none';
    console.log('Selected:', e.target.textContent);
  }
});
</script>`,
    typescript: `import {Autocomplete, Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';

interface Option {
  value: string;
  label: string;
}

interface AutocompleteDefaultProps {
  options?: Option[];
  onSelect?: (selected: string[]) => void;
  placeholder?: string;
  label?: string;
}

function AutocompleteDefault({
  options: providedOptions,
  onSelect,
  placeholder = "Search",
  label = "Tags"
}: AutocompleteDefaultProps): JSX.Element {
  const deselectedOptions = useMemo(
    () => providedOptions || [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [providedOptions],
  );
  
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Option[]>(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || '');
      onSelect?.(selected);
    },
    [options, onSelect],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={label}
      value={inputValue}
      prefix={<Icon source={SearchIcon} tone="base" />}
      placeholder={placeholder}
      autoComplete="off"
    />
  );

  return (
    <div style={{height: '225px'}}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
      />
    </div>
  );
}`
  }
};

// Loading Examples
export const loadingExamples = {
  default: {
    react: `import {Frame, Loading} from '@shopify/polaris';
import React from 'react';

function LoadingDefault() {
  return (
    <div style={{height: '100px'}}>
      <Frame>
        <Loading />
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Loading Example',
  width: 300,
  height: 100,
  html: '<div style="text-align: center; padding: 20px;">Loading...</div>',
  listeners: {
    afterrender: function(panel) {
      panel.setLoading(true);
      setTimeout(function() {
        panel.setLoading(false);
      }, 3000);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame" style="height: 100px;">
  <div class="polaris-loading">
    <div class="polaris-loading__spinner"></div>
  </div>
</div>

<script>
// JavaScript behavior
console.log('Loading component displayed');
</script>`,
    typescript: `import {Frame, Loading} from '@shopify/polaris';
import React from 'react';

interface LoadingDefaultProps {
  height?: string;
}

function LoadingDefault({ height = '100px' }: LoadingDefaultProps): JSX.Element {
  return (
    <div style={{height}}>
      <Frame>
        <Loading />
      </Frame>
    </div>
  );
}`
  }
};

// Link Examples
export const linkExamples = {
  default: {
    react: `import {Link} from '@shopify/polaris';
import React from 'react';

function LinkDefault() {
  return <Link url="https://help.shopify.com/manual">fulfilling orders</Link>;
}`,
    extjs: `Ext.create('Ext.container.Container', {
  html: '<a href="https://help.shopify.com/manual" target="_blank" class="polaris-link">fulfilling orders</a>',
  listeners: {
    afterrender: function(container) {
      container.getEl().down('a').on('click', function(e, target) {
        console.log('Link clicked:', target.href);
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<a href="https://help.shopify.com/manual" class="polaris-link" target="_blank">fulfilling orders</a>

<script>
// JavaScript behavior
document.querySelector('.polaris-link').addEventListener('click', (e) => {
  console.log('Link clicked:', e.target.href);
});
</script>`,
    typescript: `import {Link} from '@shopify/polaris';
import React from 'react';

interface LinkDefaultProps {
  url?: string;
  children?: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

function LinkDefault({ 
  url = "https://help.shopify.com/manual",
  children = "fulfilling orders",
  external = false,
  onClick
}: LinkDefaultProps): JSX.Element {
  return (
    <Link 
      url={url} 
      external={external}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}`
  }
};

// Tag Examples  
export const tagExamples = {
  default: {
    react: `import {Tag} from '@shopify/polaris';
import {useState} from 'react';

function TagDefault() {
  const [tagActive, setTagActive] = useState(true);

  return tagActive ? (
    <Tag onRemove={() => setTagActive(false)}>
      VIP Customer
    </Tag>
  ) : null;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 10,
  items: [{
    xtype: 'component',
    html: '<span class="polaris-tag">VIP Customer <button class="polaris-tag__remove">×</button></span>',
    listeners: {
      afterrender: function(cmp) {
        cmp.getEl().down('.polaris-tag__remove').on('click', function() {
          cmp.getEl().down('.polaris-tag').setDisplayed(false);
          console.log('Tag removed');
        });
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<span class="polaris-tag" id="vip-tag">
  VIP Customer
  <button class="polaris-tag__remove" onclick="removeTag()">×</button>
</span>

<script>
// JavaScript behavior
function removeTag() {
  document.getElementById('vip-tag').style.display = 'none';
  console.log('Tag removed');
}
</script>`,
    typescript: `import {Tag} from '@shopify/polaris';
import {useState} from 'react';

interface TagDefaultProps {
  children?: React.ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
}

function TagDefault({ 
  children = "VIP Customer",
  onRemove,
  disabled = false 
}: TagDefaultProps): JSX.Element {
  const [tagActive, setTagActive] = useState<boolean>(true);

  const handleRemove = () => {
    setTagActive(false);
    onRemove?.();
  };

  return tagActive ? (
    <Tag onRemove={handleRemove} disabled={disabled}>
      {children}
    </Tag>
  ) : null;
}`
  }
};

// Pagination Examples
export const paginationExamples = {
  default: {
    react: `import {Pagination} from '@shopify/polaris';
import React from 'react';

function PaginationDefault() {
  return (
    <Pagination
      hasPrevious
      onPrevious={() => {
        console.log('Previous page');
      }}
      hasNext
      onNext={() => {
        console.log('Next page');
      }}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Paging', {
  store: Ext.create('Ext.data.Store', {
    fields: ['name'],
    data: new Array(100).fill(0).map((_, i) => ({name: 'Item ' + (i + 1)})),
    pageSize: 10
  }),
  displayInfo: true,
  displayMsg: 'Displaying items {0} - {1} of {2}',
  emptyMsg: 'No items to display',
  listeners: {
    beforechange: function(paging, page) {
      console.log('Navigating to page:', page);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button" id="prev-button">
    <span aria-hidden="true">‹</span>
    Previous
  </button>
  <button class="polaris-pagination__button" id="next-button">
    Next
    <span aria-hidden="true">›</span>
  </button>
</div>

<script>
// JavaScript behavior
document.getElementById('prev-button').addEventListener('click', () => {
  console.log('Previous page');
});

document.getElementById('next-button').addEventListener('click', () => {
  console.log('Next page');
});
</script>`,
    typescript: `import {Pagination} from '@shopify/polaris';
import React from 'react';

interface PaginationDefaultProps {
  hasPrevious?: boolean;
  hasNext?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

function PaginationDefault({
  hasPrevious = true,
  hasNext = true,
  onPrevious,
  onNext
}: PaginationDefaultProps): JSX.Element {
  const handlePrevious = () => {
    console.log('Previous page');
    onPrevious?.();
  };

  const handleNext = () => {
    console.log('Next page');  
    onNext?.();
  };

  return (
    <Pagination
      hasPrevious={hasPrevious}
      onPrevious={handlePrevious}
      hasNext={hasNext}
      onNext={handleNext}
    />
  );
}`
  }
};

// Toast Examples
export const toastExamples = {
  default: {
    react: `import {Toast, Frame, Page, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ToastDefault() {
  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const toastMarkup = active ? (
    <Toast content="Message sent" onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={toggleActive}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Toast Example',
  bodyPadding: 20,
  items: [{
    xtype: 'button',
    text: 'Show Toast',
    handler: function() {
      Ext.toast({
        html: 'Message sent',
        title: 'Success',
        align: 't',
        slideInDuration: 400,
        hideDuration: 1000,
        autoCloseDelay: 3000
      });
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div style="height: 250px;">
  <div class="polaris-page">
    <h1 class="polaris-page__title">Toast example</h1>
    <button class="polaris-button polaris-button--primary" id="show-toast">Show Toast</button>
  </div>
  
  <div class="polaris-toast" id="toast" style="display: none;">
    <div class="polaris-toast__content">
      <span>Message sent</span>
      <button class="polaris-toast__dismiss" id="dismiss-toast">×</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const showButton = document.getElementById('show-toast');
const toast = document.getElementById('toast');
const dismissButton = document.getElementById('dismiss-toast');

showButton.addEventListener('click', () => {
  toast.style.display = 'block';
  
  // Auto dismiss after 3 seconds
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
});

dismissButton.addEventListener('click', () => {
  toast.style.display = 'none';
});
</script>`,
    typescript: `import {Toast, Frame, Page, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface ToastDefaultProps {
  content?: string;
  duration?: number;
  onDismiss?: () => void;
}

function ToastDefault({
  content = "Message sent",
  duration = 3000,
  onDismiss
}: ToastDefaultProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => {
    setActive((active) => !active);
    onDismiss?.();
  }, [onDismiss]);

  const showToast = useCallback(() => {
    setActive(true);
    
    // Auto dismiss after duration
    setTimeout(() => {
      setActive(false);
      onDismiss?.();
    }, duration);
  }, [duration, onDismiss]);

  const toastMarkup = active ? (
    <Toast content={content} onDismiss={toggleActive} />
  ) : null;

  return (
    <div style={{height: '250px'}}>
      <Frame>
        <Page title="Toast example">
          <Button onClick={showToast}>Show Toast</Button>
          {toastMarkup}
        </Page>
      </Frame>
    </div>
  );
}`
  }
};

// Sheet Examples
export const sheetExamples = {
  default: {
    react: `import {
  List,
  Button,
  Page,
  LegacyCard,
  Sheet,
  Scrollable,
  ChoiceList,
  Text,
} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function SheetDefault() {
  const [sheetActive, setSheetActive] = useState(false);
  const [salesChannels] = useState([
    {value: 'onlineStore', label: 'Online Store'},
    {value: 'facebook', label: 'Facebook'},
    {value: 'googleShopping', label: 'Google shopping'},
    {value: 'facebookMarketing', label: 'Facebook Marketing'},
  ]);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    [],
  );
  
  const handleSelectedChange = useCallback(
    (value: string[]) => setSelected(value),
    [],
  );

  const selectedSalesChannels = selected.map(selection => 
    salesChannels.find(channel => channel.value === selection)
  ).filter(Boolean);

  const hasSelectedSalesChannels = selectedSalesChannels.length > 0;

  const salesChannelsCardMarkup = hasSelectedSalesChannels ? (
    <List>
      {selectedSalesChannels.map((channel, index) => (
        <List.Item key={index}>{channel!.label}</List.Item>
      ))}
    </List>
  ) : (
    <div style={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <p>No sales channels selected</p>
      <Button onClick={toggleSheetActive}>Manage sales channels</Button>
    </div>
  );

  return (
    <Page narrowWidth>
      <LegacyCard
        sectioned
        subdued
        title="Product availability"
        actions={hasSelectedSalesChannels ? [{
          onAction: toggleSheetActive,
          content: 'Manage sales channels',
        }] : undefined}
      >
        {salesChannelsCardMarkup}
      </LegacyCard>
      <Sheet
        open={sheetActive}
        onClose={toggleSheetActive}
        accessibilityLabel="Manage sales channels"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          <div style={{
            alignItems: 'center',
            borderBottom: '1px solid #DFE3E8',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            width: '100%',
          }}>
            <Text variant="headingMd" as="h2">
              Manage sales channels
            </Text>
            <Button
              accessibilityLabel="Cancel"
              icon={XIcon}
              onClick={toggleSheetActive}
              variant="plain"
            />
          </div>
          <Scrollable style={{padding: '1rem', height: '100%'}}>
            <ChoiceList
              title="Select a sales channel"
              name="salesChannelsList"
              choices={salesChannels}
              selected={selected}
              titleHidden
              allowMultiple
              onChange={handleSelectedChange}
            />
          </Scrollable>
          <div style={{
            alignItems: 'center',
            borderTop: '1px solid #DFE3E8',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            width: '100%',
          }}>
            <Button onClick={toggleSheetActive}>Cancel</Button>
            <Button variant="primary" onClick={toggleSheetActive}>
              Done
            </Button>
          </div>
        </div>
      </Sheet>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.window.Window', {
  title: 'Manage Sales Channels',
  modal: true,
  width: 400,
  height: 500,
  layout: 'border',
  items: [{
    region: 'center',
    xtype: 'form',
    bodyPadding: 20,
    items: [{
      xtype: 'checkboxgroup',
      fieldLabel: 'Sales Channels',
      columns: 1,
      items: [{
        boxLabel: 'Online Store',
        name: 'channels',
        inputValue: 'onlineStore'
      }, {
        boxLabel: 'Facebook',
        name: 'channels',
        inputValue: 'facebook'
      }, {
        boxLabel: 'Google Shopping',
        name: 'channels',
        inputValue: 'googleShopping'
      }, {
        boxLabel: 'Facebook Marketing',
        name: 'channels',
        inputValue: 'facebookMarketing'
      }]
    }]
  }],
  buttons: [{
    text: 'Cancel',
    handler: function() {
      this.up('window').close();
    }
  }, {
    text: 'Done',
    handler: function() {
      var form = this.up('window').down('form');
      var values = form.getValues();
      console.log('Selected channels:', values.channels);
      this.up('window').close();
    }
  }]
}).show();`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-card">
    <div class="polaris-card__header">
      <h3>Product availability</h3>
      <button class="polaris-button" id="manage-channels">Manage sales channels</button>
    </div>
    <div class="polaris-card__content" id="selected-channels">
      <p>No sales channels selected</p>
    </div>
  </div>
</div>

<!-- Sheet Overlay -->
<div class="polaris-sheet" id="sheet-overlay" style="display: none;">
  <div class="polaris-sheet__content">
    <div class="polaris-sheet__header">
      <h2>Manage sales channels</h2>
      <button class="polaris-button polaris-button--plain" id="close-sheet">×</button>
    </div>
    <div class="polaris-sheet__body">
      <div class="polaris-choice-list">
        <label class="polaris-choice">
          <input type="checkbox" value="onlineStore"> Online Store
        </label>
        <label class="polaris-choice">
          <input type="checkbox" value="facebook"> Facebook
        </label>
        <label class="polaris-choice">
          <input type="checkbox" value="googleShopping"> Google Shopping
        </label>
        <label class="polaris-choice">
          <input type="checkbox" value="facebookMarketing"> Facebook Marketing
        </label>
      </div>
    </div>
    <div class="polaris-sheet__footer">
      <button class="polaris-button" id="cancel-sheet">Cancel</button>
      <button class="polaris-button polaris-button--primary" id="done-sheet">Done</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const manageButton = document.getElementById('manage-channels');
const sheet = document.getElementById('sheet-overlay');
const closeButton = document.getElementById('close-sheet');
const cancelButton = document.getElementById('cancel-sheet');
const doneButton = document.getElementById('done-sheet');
const selectedChannelsDiv = document.getElementById('selected-channels');

manageButton.addEventListener('click', () => {
  sheet.style.display = 'block';
});

[closeButton, cancelButton].forEach(button => {
  button.addEventListener('click', () => {
    sheet.style.display = 'none';
  });
});

doneButton.addEventListener('click', () => {
  const selected = Array.from(document.querySelectorAll('.polaris-choice input:checked'))
    .map(input => input.nextSibling.textContent.trim());
  
  if (selected.length > 0) {
    selectedChannelsDiv.innerHTML = '<ul>' + selected.map(channel => '<li>' + channel + '</li>').join('') + '</ul>';
  } else {
    selectedChannelsDiv.innerHTML = '<p>No sales channels selected</p>';
  }
  
  sheet.style.display = 'none';
});
</script>`,
    typescript: `import {
  List,
  Button,
  Page,
  LegacyCard,
  Sheet,
  Scrollable,
  ChoiceList,
  Text,
} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

interface SalesChannel {
  value: string;
  label: string;
}

interface SheetDefaultProps {
  channels?: SalesChannel[];
  onSelectionChange?: (selected: string[]) => void;
}

function SheetDefault({
  channels = [
    {value: 'onlineStore', label: 'Online Store'},
    {value: 'facebook', label: 'Facebook'},
    {value: 'googleShopping', label: 'Google shopping'},
    {value: 'facebookMarketing', label: 'Facebook Marketing'},
  ],
  onSelectionChange
}: SheetDefaultProps): JSX.Element {
  const [sheetActive, setSheetActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSheetActive = useCallback(
    () => setSheetActive((sheetActive) => !sheetActive),
    [],
  );
  
  const handleSelectedChange = useCallback(
    (value: string[]) => {
      setSelected(value);
      onSelectionChange?.(value);
    },
    [onSelectionChange],
  );

  const selectedSalesChannels = selected.map(selection => 
    channels.find(channel => channel.value === selection)
  ).filter((channel): channel is SalesChannel => channel !== undefined);

  const hasSelectedSalesChannels = selectedSalesChannels.length > 0;

  return (
    <Page narrowWidth>
      <LegacyCard
        sectioned
        subdued
        title="Product availability"
        actions={hasSelectedSalesChannels ? [{
          onAction: toggleSheetActive,
          content: 'Manage sales channels',
        }] : undefined}
      >
        {hasSelectedSalesChannels ? (
          <List>
            {selectedSalesChannels.map((channel, index) => (
              <List.Item key={index}>{channel.label}</List.Item>
            ))}
          </List>
        ) : (
          <div style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <p>No sales channels selected</p>
            <Button onClick={toggleSheetActive}>Manage sales channels</Button>
          </div>
        )}
      </LegacyCard>
      <Sheet
        open={sheetActive}
        onClose={toggleSheetActive}
        accessibilityLabel="Manage sales channels"
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          <div style={{
            alignItems: 'center',
            borderBottom: '1px solid #DFE3E8',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            width: '100%',
          }}>
            <Text variant="headingMd" as="h2">
              Manage sales channels
            </Text>
            <Button
              accessibilityLabel="Cancel"
              icon={XIcon}
              onClick={toggleSheetActive}
              variant="plain"
            />
          </div>
          <Scrollable style={{padding: '1rem', height: '100%'}}>
            <ChoiceList
              title="Select a sales channel"
              name="salesChannelsList"
              choices={channels}
              selected={selected}
              titleHidden
              allowMultiple
              onChange={handleSelectedChange}
            />
          </Scrollable>
          <div style={{
            alignItems: 'center',
            borderTop: '1px solid #DFE3E8',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            width: '100%',
          }}>
            <Button onClick={toggleSheetActive}>Cancel</Button>
            <Button variant="primary" onClick={toggleSheetActive}>
              Done
            </Button>
          </div>
        </div>
      </Sheet>
    </Page>
  );
}`
  }
};

// Choice List Examples
export const choiceListExamples = {
  'with-multi-choice': {
    react: `import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ChoiceListWithMultiChoice() {
  const [selected, setSelected] = useState<string[]>(['shipping']);

  const handleChange = useCallback((value: string[]) => setSelected(value), []);

  return (
    <ChoiceList
      allowMultiple
      title="While the customer is checking out"
      choices={[
        {
          label: 'Use the shipping address as the billing address by default',
          value: 'shipping',
          helpText:
            'Reduces the number of fields required to check out. The billing address can still be edited.',
        },
        {
          label: 'Require a confirmation step',
          value: 'confirmation',
          helpText:
            'Customers must review their order details before purchasing.',
        },
      ]}
      selected={selected}
      onChange={handleChange}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'While the customer is checking out',
  bodyPadding: 20,
  width: 500,
  items: [{
    xtype: 'checkboxgroup',
    fieldLabel: 'Checkout Options',
    columns: 1,
    items: [{
      boxLabel: 'Use the shipping address as the billing address by default',
      name: 'options',
      inputValue: 'shipping',
      checked: true
    }, {
      boxLabel: 'Require a confirmation step',  
      name: 'options',
      inputValue: 'confirmation'
    }],
    listeners: {
      change: function(checkboxgroup, value) {
        console.log('Selected options:', value.options);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-choice-list">
  <fieldset class="polaris-choice-list__fieldset">
    <legend class="polaris-choice-list__title">While the customer is checking out</legend>
    
    <div class="polaris-choice-list__choices">
      <label class="polaris-choice polaris-choice--checkbox">
        <input 
          type="checkbox" 
          class="polaris-choice__input" 
          name="checkout-options" 
          value="shipping"
          checked>
        <span class="polaris-choice__control"></span>
        <span class="polaris-choice__label">
          Use the shipping address as the billing address by default
          <div class="polaris-choice__help-text">
            Reduces the number of fields required to check out. The billing address can still be edited.
          </div>
        </span>
      </label>
      
      <label class="polaris-choice polaris-choice--checkbox">
        <input 
          type="checkbox" 
          class="polaris-choice__input" 
          name="checkout-options" 
          value="confirmation">
        <span class="polaris-choice__control"></span>
        <span class="polaris-choice__label">
          Require a confirmation step
          <div class="polaris-choice__help-text">
            Customers must review their order details before purchasing.
          </div>
        </span>
      </label>
    </div>
  </fieldset>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('input[name="checkout-options"]').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selected = Array.from(document.querySelectorAll('input[name="checkout-options"]:checked'))
      .map(input => input.value);
    console.log('Selected options:', selected);
  });
});
</script>`,
    typescript: `import {ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface Choice {
  label: string;
  value: string;
  helpText?: string;
}

interface ChoiceListWithMultiChoiceProps {
  title?: string;
  choices?: Choice[];
  initialSelected?: string[];
  onChange?: (selected: string[]) => void;
}

function ChoiceListWithMultiChoice({
  title = "While the customer is checking out",
  choices = [
    {
      label: 'Use the shipping address as the billing address by default',
      value: 'shipping',
      helpText:
        'Reduces the number of fields required to check out. The billing address can still be edited.',
    },
    {
      label: 'Require a confirmation step',
      value: 'confirmation',
      helpText:
        'Customers must review their order details before purchasing.',
    },
  ],
  initialSelected = ['shipping'],
  onChange
}: ChoiceListWithMultiChoiceProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  const handleChange = useCallback((value: string[]) => {
    setSelected(value);
    onChange?.(value);
  }, [onChange]);

  return (
    <ChoiceList
      allowMultiple
      title={title}
      choices={choices}
      selected={selected}
      onChange={handleChange}
    />
  );
}`
  }
};

// Filters Examples
export const filtersExamples = {
  'with-resource-list': {
    react: `import {
  ChoiceList,
  TextField,
  RangeSlider,
  LegacyCard,
  ResourceList,
  Filters,
  Avatar,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function FiltersWithResourceList() {
  const [accountStatus, setAccountStatus] = useState<string[]>([]);
  const [taggedWith, setTaggedWith] = useState<string>('');
  const [queryValue, setQueryValue] = useState<string>('');

  const handleAccountStatusChange = useCallback(
    (value: string[]) => setAccountStatus(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value: string) => setTaggedWith(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );
  const handleFiltersClearAll = useCallback(() => {
    setAccountStatus([]);
    setTaggedWith('');
    setQueryValue('');
  }, []);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            {label: 'Enabled', value: 'enabled'},
            {label: 'Not invited', value: 'not invited'},
            {label: 'Invited', value: 'invited'},
            {label: 'Declined', value: 'declined'},
          ]}
          selected={accountStatus}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (accountStatus.length > 0) {
    appliedFilters.push({
      key: 'accountStatus',
      label: 'Account Status: ' + accountStatus.join(', '),
      onRemove: () => setAccountStatus([]),
    });
  }
  if (taggedWith) {
    appliedFilters.push({
      key: 'taggedWith',
      label: 'Tagged with: ' + taggedWith,
      onRemove: () => setTaggedWith(''),
    });
  }

  return (
    <div style={{height: '568px'}}>
      <LegacyCard>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={() => setQueryValue('')}
              onClearAll={handleFiltersClearAll}
            />
          }
          flushFilters
          items={[
            {
              id: '341',
              url: '#',
              name: 'Mae Jemison',
              location: 'Decatur, USA',
            },
            {
              id: '256',
              url: '#',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA',
            },
          ]}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = <Avatar customer size="md" name={name} />;

            return (
              <ResourceList.Item
                id={id}
                url={url}
                media={media}
                accessibilityLabel={'View details for ' + name}
              >
                <Text as="h3" variant="bodyMd" fontWeight="bold">
                  {name}
                </Text>
                <div>{location}</div>
              </ResourceList.Item>
            );
          }}
        />
      </LegacyCard>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.grid.Panel', {
  title: 'Customer List with Filters',
  width: 600,
  height: 400,
  tbar: [{
    xtype: 'textfield',
    fieldLabel: 'Search',
    name: 'query',
    listeners: {
      change: function(field, newValue) {
        var store = this.up('grid').getStore();
        store.clearFilter();
        if (newValue) {
          store.filter('name', newValue);
        }
      }
    }
  }, {
    xtype: 'combo',
    fieldLabel: 'Status',
    store: ['All', 'Enabled', 'Invited', 'Declined'],
    value: 'All',
    listeners: {
      select: function(combo, record) {
        var store = this.up('grid').getStore();
        store.clearFilter();
        if (record.get('field1') !== 'All') {
          store.filter('status', record.get('field1'));
        }
      }
    }
  }],
  store: Ext.create('Ext.data.Store', {
    fields: ['name', 'location', 'status'],
    data: [
      {name: 'Mae Jemison', location: 'Decatur, USA', status: 'Enabled'},
      {name: 'Ellen Ochoa', location: 'Los Angeles, USA', status: 'Invited'}
    ]
  }),
  columns: [{
    text: 'Name',
    dataIndex: 'name',
    flex: 1
  }, {
    text: 'Location',
    dataIndex: 'location',
    flex: 1
  }, {
    text: 'Status',
    dataIndex: 'status',
    width: 100
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-filters-container">
  <div class="polaris-filters">
    <div class="polaris-filters__search">
      <input type="text" id="search-input" placeholder="Search customers..." class="polaris-text-field__input">
    </div>
    <div class="polaris-filters__controls">
      <select id="status-filter" class="polaris-select__input">
        <option value="">All statuses</option>
        <option value="enabled">Enabled</option>
        <option value="invited">Invited</option>
        <option value="declined">Declined</option>
      </select>
      <button id="clear-filters" class="polaris-button">Clear all</button>
    </div>
  </div>
  
  <div class="polaris-resource-list" id="customer-list">
    <div class="polaris-resource-list__item" data-name="mae jemison" data-status="enabled">
      <div class="polaris-avatar">MJ</div>
      <div class="polaris-resource-list__content">
        <h3>Mae Jemison</h3>
        <p>Decatur, USA</p>
      </div>
    </div>
    <div class="polaris-resource-list__item" data-name="ellen ochoa" data-status="invited">
      <div class="polaris-avatar">EO</div>
      <div class="polaris-resource-list__content">
        <h3>Ellen Ochoa</h3>
        <p>Los Angeles, USA</p>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const searchInput = document.getElementById('search-input');
const statusFilter = document.getElementById('status-filter');
const clearButton = document.getElementById('clear-filters');
const customerItems = document.querySelectorAll('.polaris-resource-list__item');

function filterCustomers() {
  const searchTerm = searchInput.value.toLowerCase();
  const statusFilter = document.getElementById('status-filter').value;
  
  customerItems.forEach(item => {
    const name = item.dataset.name;
    const status = item.dataset.status;
    
    const matchesSearch = !searchTerm || name.includes(searchTerm);
    const matchesStatus = !statusFilter || status === statusFilter;
    
    item.style.display = matchesSearch && matchesStatus ? 'flex' : 'none';
  });
}

searchInput.addEventListener('input', filterCustomers);
statusFilter.addEventListener('change', filterCustomers);
clearButton.addEventListener('click', () => {
  searchInput.value = '';
  statusFilter.value = '';
  filterCustomers();
});
</script>`,
    typescript: `import {
  ChoiceList,
  TextField,
  LegacyCard,
  ResourceList,
  Filters,
  Avatar,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface Customer {
  id: string;
  url: string;
  name: string;
  location: string;
}

interface FiltersWithResourceListProps {
  customers?: Customer[];
  onFilter?: (filters: any) => void;
}

function FiltersWithResourceList({
  customers = [
    {
      id: '341',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: '256',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ],
  onFilter
}: FiltersWithResourceListProps): JSX.Element {
  const [accountStatus, setAccountStatus] = useState<string[]>([]);
  const [taggedWith, setTaggedWith] = useState<string>('');
  const [queryValue, setQueryValue] = useState<string>('');

  const handleAccountStatusChange = useCallback(
    (value: string[]) => {
      setAccountStatus(value);
      onFilter?.({ accountStatus: value, taggedWith, query: queryValue });
    },
    [taggedWith, queryValue, onFilter],
  );

  const handleTaggedWithChange = useCallback(
    (value: string) => {
      setTaggedWith(value);
      onFilter?.({ accountStatus, taggedWith: value, query: queryValue });
    },
    [accountStatus, queryValue, onFilter],
  );

  const handleFiltersQueryChange = useCallback(
    (value: string) => {
      setQueryValue(value);
      onFilter?.({ accountStatus, taggedWith, query: value });
    },
    [accountStatus, taggedWith, onFilter],
  );

  const handleFiltersClearAll = useCallback(() => {
    setAccountStatus([]);
    setTaggedWith('');
    setQueryValue('');
    onFilter?.({ accountStatus: [], taggedWith: '', query: '' });
  }, [onFilter]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            {label: 'Enabled', value: 'enabled'},
            {label: 'Not invited', value: 'not invited'},
            {label: 'Invited', value: 'invited'},
            {label: 'Declined', value: 'declined'},
          ]}
          selected={accountStatus}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters = [];
  if (accountStatus.length > 0) {
    appliedFilters.push({
      key: 'accountStatus',
      label: 'Account Status: ' + accountStatus.join(', '),
      onRemove: () => handleAccountStatusChange([]),
    });
  }
  if (taggedWith) {
    appliedFilters.push({
      key: 'taggedWith',
      label: 'Tagged with: ' + taggedWith,
      onRemove: () => handleTaggedWithChange(''),
    });
  }

  return (
    <div style={{height: '568px'}}>
      <LegacyCard>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={() => handleFiltersQueryChange('')}
              onClearAll={handleFiltersClearAll}
            />
          }
          flushFilters
          items={customers}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = <Avatar customer size="md" name={name} />;

            return (
              <ResourceList.Item
                id={id}
                url={url}
                media={media}
                accessibilityLabel={'View details for ' + name}
              >
                <Text as="h3" variant="bodyMd" fontWeight="bold">
                  {name}
                </Text>
                <div>{location}</div>
              </ResourceList.Item>
            );
          }}
        />
      </LegacyCard>
    </div>
  );
}`
  }
};

// Collapsible Examples
export const collapsibleExamples = {
  default: {
    react: `import {
  LegacyCard,
  LegacyStack,
  Button,
  Collapsible,
  TextContainer,
  Link,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CollapsibleDefault() {
  const [open, setOpen] = useState(true);

  const handleToggle = useCallback(() => setOpen((open) => !open), []);

  return (
    <div style={{height: '200px'}}>
      <LegacyCard sectioned>
        <LegacyStack vertical>
          <Button
            onClick={handleToggle}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
          >
            Toggle
          </Button>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
            expandOnPrint
          >
            <TextContainer>
              <p>
                Your mailing list lets you contact customers or visitors who
                have shown an interest in your store. Reach out to them with
                exclusive offers or updates about your products.
              </p>
              <Link url="#">Test link</Link>
            </TextContainer>
          </Collapsible>
        </LegacyStack>
      </LegacyCard>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Collapsible Content',
  width: 400,
  height: 300,
  bodyPadding: 20,
  items: [{
    xtype: 'button',
    text: 'Toggle',
    handler: function() {
      var panel = this.up('panel').down('#collapsiblePanel');
      if (panel.isVisible()) {
        panel.collapse();
      } else {
        panel.expand();
      }
    }
  }, {
    xtype: 'panel',
    itemId: 'collapsiblePanel',
    title: 'Mailing List Information',
    collapsible: true,
    collapsed: false,
    bodyPadding: 10,
    html: '<p>Your mailing list lets you contact customers or visitors who have shown an interest in your store. Reach out to them with exclusive offers or updates about your products.</p><a href="#">Test link</a>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card" style="height: 200px;">
  <div class="polaris-card__content">
    <button class="polaris-button" id="toggle-button" aria-expanded="true" aria-controls="collapsible-content">
      Toggle
    </button>
    
    <div class="polaris-collapsible" id="collapsible-content" style="transition: all 500ms ease-in-out;">
      <div class="polaris-text-container">
        <p>
          Your mailing list lets you contact customers or visitors who
          have shown an interest in your store. Reach out to them with
          exclusive offers or updates about your products.
        </p>
        <a href="#" class="polaris-link">Test link</a>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const toggleButton = document.getElementById('toggle-button');
const collapsibleContent = document.getElementById('collapsible-content');
let isOpen = true;

toggleButton.addEventListener('click', () => {
  isOpen = !isOpen;
  
  if (isOpen) {
    collapsibleContent.style.display = 'block';
    collapsibleContent.style.height = 'auto';
    toggleButton.setAttribute('aria-expanded', 'true');
  } else {
    collapsibleContent.style.display = 'none';
    collapsibleContent.style.height = '0';
    toggleButton.setAttribute('aria-expanded', 'false');
  }
});
</script>`,
    typescript: `import {
  LegacyCard,
  LegacyStack,
  Button,
  Collapsible,
  TextContainer,
  Link,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CollapsibleDefaultProps {
  initialOpen?: boolean;
  onToggle?: (open: boolean) => void;
  children?: React.ReactNode;
}

function CollapsibleDefault({
  initialOpen = true,
  onToggle,
  children
}: CollapsibleDefaultProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(initialOpen);

  const handleToggle = useCallback(() => {
    const newState = !open;
    setOpen(newState);
    onToggle?.(newState);
  }, [open, onToggle]);

  return (
    <div style={{height: '200px'}}>
      <LegacyCard sectioned>
        <LegacyStack vertical>
          <Button
            onClick={handleToggle}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
          >
            Toggle
          </Button>
          <Collapsible
            open={open}
            id="basic-collapsible"
            transition={{duration: '500ms', timingFunction: 'ease-in-out'}}
            expandOnPrint
          >
            {children || (
              <TextContainer>
                <p>
                  Your mailing list lets you contact customers or visitors who
                  have shown an interest in your store. Reach out to them with
                  exclusive offers or updates about your products.
                </p>
                <Link url="#">Test link</Link>
              </TextContainer>
            )}
          </Collapsible>
        </LegacyStack>
      </LegacyCard>
    </div>
  );
}`
  }
};

// Combobox Examples
export const comboboxExamples = {
  default: {
    react: `import {Listbox, Combobox, Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';

function ComboboxDefault() {
  const deselectedOptions = useMemo(
    () => [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [],
  );

  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || '');
    },
    [options],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={value}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div style={{height: '225px'}}>
      <Combobox
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchIcon} />}
            onChange={updateText}
            label="Search tags"
            labelHidden
            value={inputValue}
            placeholder="Search tags"
            autoComplete="off"
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Search tags',
  store: Ext.create('Ext.data.Store', {
    fields: ['value', 'label'],
    data: [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'}
    ]
  }),
  displayField: 'label',
  valueField: 'value',
  typeAhead: true,
  queryMode: 'local',
  forceSelection: false,
  emptyText: 'Search tags...',
  triggerAction: 'all',
  width: 300,
  listConfig: {
    loadingText: 'Searching...',
    emptyText: 'No matching tags found.',
    getInnerTpl: function() {
      return '<div class="search-item">{label}</div>';
    }
  },
  listeners: {
    select: function(combo, record) {
      console.log('Selected:', record.get('label'));
    },
    change: function(field, newValue) {
      console.log('Input changed:', newValue);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-combobox" style="height: 225px;">
  <div class="polaris-combobox__activator">
    <div class="polaris-text-field">
      <div class="polaris-text-field__input-wrapper">
        <span class="polaris-text-field__prefix">🔍</span>
        <input 
          type="text" 
          id="combobox-input" 
          class="polaris-text-field__input" 
          placeholder="Search tags"
          autocomplete="off">
      </div>
    </div>
  </div>
  
  <div class="polaris-listbox" id="combobox-listbox" style="display: none;">
    <ul class="polaris-listbox__options" id="options-list">
      <!-- Options will be populated by JavaScript -->
    </ul>
  </div>
</div>

<script>
// JavaScript behavior
const options = [
  {value: 'rustic', label: 'Rustic'},
  {value: 'antique', label: 'Antique'},
  {value: 'vinyl', label: 'Vinyl'},
  {value: 'vintage', label: 'Vintage'},
  {value: 'refurbished', label: 'Refurbished'}
];

const input = document.getElementById('combobox-input');
const listbox = document.getElementById('combobox-listbox');
const optionsList = document.getElementById('options-list');

function updateOptions(searchValue) {
  const filtered = options.filter(option => 
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  optionsList.innerHTML = filtered.map(option => 
    '<li class="polaris-listbox__option" data-value="' + option.value + '">' + option.label + '</li>'
  ).join('');
  
  listbox.style.display = filtered.length && searchValue ? 'block' : 'none';
}

input.addEventListener('input', (e) => {
  updateOptions(e.target.value);
});

input.addEventListener('focus', () => {
  if (input.value) updateOptions(input.value);
});

optionsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('polaris-listbox__option')) {
    input.value = e.target.textContent;
    listbox.style.display = 'none';
    console.log('Selected:', e.target.textContent);
  }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.polaris-combobox')) {
    listbox.style.display = 'none';
  }
});
</script>`,
    typescript: `import {Listbox, Combobox, Icon} from '@shopify/polaris';
import {SearchIcon} from '@shopify/polaris-icons';
import {useState, useCallback, useMemo} from 'react';

interface Option {
  value: string;
  label: string;
}

interface ComboboxDefaultProps {
  options?: Option[];
  placeholder?: string;
  label?: string;
  onSelect?: (selected: string) => void;
}

function ComboboxDefault({
  options: providedOptions,
  placeholder = "Search tags",
  label = "Search tags",
  onSelect
}: ComboboxDefaultProps): JSX.Element {
  const deselectedOptions = useMemo(
    () => providedOptions || [
      {value: 'rustic', label: 'Rustic'},
      {value: 'antique', label: 'Antique'},
      {value: 'vinyl', label: 'Vinyl'},
      {value: 'vintage', label: 'Vintage'},
      {value: 'refurbished', label: 'Refurbished'},
    ],
    [providedOptions],
  );

  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState<string>('');
  const [options, setOptions] = useState<Option[]>(deselectedOptions);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const updateSelection = useCallback(
    (selected: string) => {
      const matchedOption = options.find((option) => {
        return option.value.match(selected);
      });

      setSelectedOption(selected);
      setInputValue((matchedOption && matchedOption.label) || '');
      onSelect?.(selected);
    },
    [options, onSelect],
  );

  const optionsMarkup =
    options.length > 0
      ? options.map((option) => {
          const {label, value} = option;

          return (
            <Listbox.Option
              key={value}
              value={value}
              selected={selectedOption === value}
              accessibilityLabel={label}
            >
              {label}
            </Listbox.Option>
          );
        })
      : null;

  return (
    <div style={{height: '225px'}}>
      <Combobox
        activator={
          <Combobox.TextField
            prefix={<Icon source={SearchIcon} />}
            onChange={updateText}
            label={label}
            labelHidden
            value={inputValue}
            placeholder={placeholder}
            autoComplete="off"
          />
        }
      >
        {options.length > 0 ? (
          <Listbox onSelect={updateSelection}>{optionsMarkup}</Listbox>
        ) : null}
      </Combobox>
    </div>
  );
}`
  }
};

// Range Slider Examples
export const rangeSliderExamples = {
  default: {
    react: `import {LegacyCard, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function RangeSliderDefault() {
  const [rangeValue, setRangeValue] = useState(32);

  const handleRangeSliderChange = useCallback(
    (value: number) => setRangeValue(value),
    [],
  );

  return (
    <LegacyCard sectioned title="Background color">
      <RangeSlider
        label="Opacity percentage"
        value={rangeValue}
        onChange={handleRangeSliderChange}
        output
      />
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Background color',
  bodyPadding: 10,
  items: [{
    xtype: 'slider',
    fieldLabel: 'Opacity percentage',
    width: 300,
    value: 32,
    minValue: 0,
    maxValue: 100,
    increment: 1,
    useTips: true,
    tipText: function(thumb) {
      return String(thumb.value) + '%';
    },
    listeners: {
      change: function(slider, newValue) {
        console.log('Range value changed:', newValue);
      },
      changecomplete: function(slider, newValue) {
        console.log('Range change complete:', newValue);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__header">
    <h3 class="polaris-card__title">Background color</h3>
  </div>
  <div class="polaris-card__section">
    <div class="polaris-range-slider">
      <label for="opacity-slider" class="polaris-label">Opacity percentage</label>
      <div class="polaris-range-slider__wrapper">
        <input 
          type="range" 
          id="opacity-slider" 
          class="polaris-range-slider__input" 
          min="0" 
          max="100" 
          value="32" 
          step="1">
        <output class="polaris-range-slider__output" for="opacity-slider">32%</output>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const slider = document.getElementById('opacity-slider');
const output = document.querySelector('.polaris-range-slider__output');

slider.addEventListener('input', (e) => {
  const value = e.target.value;
  output.textContent = value + '%';
  console.log('Range value changed:', value);
});

slider.addEventListener('change', (e) => {
  console.log('Range change complete:', e.target.value);
});
</script>`,
    typescript: `import {LegacyCard, RangeSlider} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface RangeSliderDefaultProps {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  title?: string;
  showOutput?: boolean;
  onChange?: (value: number) => void;
}

function RangeSliderDefault({
  initialValue = 32,
  min = 0,
  max = 100,
  step = 1,
  label = "Opacity percentage",
  title = "Background color",
  showOutput = true,
  onChange
}: RangeSliderDefaultProps): JSX.Element {
  const [rangeValue, setRangeValue] = useState<number>(initialValue);

  const handleRangeSliderChange = useCallback(
    (value: number) => {
      setRangeValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <LegacyCard sectioned title={title}>
      <RangeSlider
        label={label}
        value={rangeValue}
        min={min}
        max={max}
        step={step}
        onChange={handleRangeSliderChange}
        output={showOutput}
      />
    </LegacyCard>
  );
}`
  }
};

// App Provider Examples
export const appProviderExamples = {
  default: {
    react: `import {
  AppProvider,
  Page,
  LegacyCard,
  ResourceList,
  Avatar,
  Text,
} from '@shopify/polaris';
import React from 'react';

function AppProviderDefault() {
  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: 'Sort by',
            defaultItemSingular: 'item',
            defaultItemPlural: 'items',
            showing: 'Showing {itemsCount} {resource}',
            Item: {
              viewItem: 'View details for {itemName}',
            },
          },
          Common: {
            checkbox: 'checkbox',
          },
        },
      }}
    >
      <Page>
        <LegacyCard>
          <ResourceList
            showHeader
            items={[
              {
                id: '341',
                url: '#',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
              },
              {
                id: '256',
                url: '#',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
              },
            ]}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="md" name={name} />;

              return (
                <ResourceList.Item id={id} url={url} media={media}>
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}`,
    extjs: `Ext.create('Ext.app.Application', {
  name: 'PolarisApp',
  
  // App configuration equivalent to AppProvider
  appConfig: {
    locale: 'en-US',
    i18n: {
      sortingLabel: 'Sort by',
      defaultItemSingular: 'item',
      defaultItemPlural: 'items',
      showing: 'Showing {0} {1}',
      viewItem: 'View details for {0}',
      checkbox: 'checkbox'
    }
  },
  
  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        xtype: 'panel',
        title: 'Resource List Demo',
        bodyPadding: 20,
        items: [{
          xtype: 'grid',
          title: 'Customer List',
          height: 400,
          columns: [{
            text: 'Avatar',
            width: 80,
            renderer: function(value, meta, record) {
              return '<div class="customer-avatar">' + 
                     record.get('name').charAt(0) + '</div>';
            }
          }, {
            text: 'Name',
            dataIndex: 'name',
            flex: 1,
            renderer: function(value) {
              return '<strong>' + value + '</strong>';
            }
          }, {
            text: 'Location',
            dataIndex: 'location',
            flex: 1
          }],
          store: Ext.create('Ext.data.Store', {
            fields: ['id', 'name', 'location'],
            data: [
              {id: '341', name: 'Mae Jemison', location: 'Decatur, USA'},
              {id: '256', name: 'Ellen Ochoa', location: 'Los Angeles, USA'}
            ]
          }),
          listeners: {
            itemclick: function(view, record) {
              console.log('Selected customer:', record.get('name'));
            }
          }
        }]
      }]
    });
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-app-provider">
  <div class="polaris-page">
    <div class="polaris-card">
      <div class="polaris-resource-list">
        <div class="polaris-resource-list__header">
          <h3>Customer List</h3>
          <span class="polaris-resource-list__count">Showing 2 items</span>
        </div>
        
        <div class="polaris-resource-list__item" data-id="341">
          <div class="polaris-resource-list__media">
            <div class="polaris-avatar polaris-avatar--customer">MJ</div>
          </div>
          <div class="polaris-resource-list__content">
            <h4 class="polaris-resource-list__name">Mae Jemison</h4>
            <div class="polaris-resource-list__location">Decatur, USA</div>
          </div>
        </div>
        
        <div class="polaris-resource-list__item" data-id="256">
          <div class="polaris-resource-list__media">
            <div class="polaris-avatar polaris-avatar--customer">EO</div>
          </div>
          <div class="polaris-resource-list__content">
            <h4 class="polaris-resource-list__name">Ellen Ochoa</h4>
            <div class="polaris-resource-list__location">Los Angeles, USA</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
const appConfig = {
  locale: 'en-US',
  i18n: {
    sortingLabel: 'Sort by',
    defaultItemSingular: 'item',
    defaultItemPlural: 'items',
    showing: 'Showing {0} {1}',
    viewItem: 'View details for {0}',
    checkbox: 'checkbox'
  }
};

// Initialize resource list
const resourceListItems = document.querySelectorAll('.polaris-resource-list__item');

resourceListItems.forEach(item => {
  item.addEventListener('click', (e) => {
    const id = item.getAttribute('data-id');
    const name = item.querySelector('.polaris-resource-list__name').textContent;
    console.log('View details for', name);
  });
  
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
  
  // Make items focusable
  item.setAttribute('tabindex', '0');
});

// Update count display
const count = resourceListItems.length;
const countDisplay = document.querySelector('.polaris-resource-list__count');
const itemWord = count === 1 ? appConfig.i18n.defaultItemSingular : appConfig.i18n.defaultItemPlural;
countDisplay.textContent = appConfig.i18n.showing.replace('{0}', count).replace('{1}', itemWord);
</script>`,
    typescript: `import {
  AppProvider,
  Page,
  LegacyCard,
  ResourceList,
  Avatar,
  Text,
} from '@shopify/polaris';
import React from 'react';

interface CustomerItem {
  id: string;
  url: string;
  name: string;
  location: string;
}

interface AppProviderDefaultProps {
  customers?: CustomerItem[];
  locale?: string;
  onItemSelect?: (item: CustomerItem) => void;
}

function AppProviderDefault({
  customers = [
    {
      id: '341',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: '256',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ],
  locale = 'en-US',
  onItemSelect
}: AppProviderDefaultProps): JSX.Element {
  const handleItemClick = (item: CustomerItem) => {
    onItemSelect?.(item);
  };

  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: 'Sort by',
            defaultItemSingular: 'item',
            defaultItemPlural: 'items',
            showing: 'Showing {itemsCount} {resource}',
            Item: {
              viewItem: 'View details for {itemName}',
            },
          },
          Common: {
            checkbox: 'checkbox',
          },
        },
      }}
    >
      <Page>
        <LegacyCard>
          <ResourceList
            showHeader
            items={customers}
            renderItem={(item: CustomerItem) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="md" name={name} />;

              return (
                <ResourceList.Item 
                  id={id} 
                  url={url} 
                  media={media}
                  onClick={() => handleItemClick(item)}
                >
                  <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {name}
                  </Text>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </LegacyCard>
      </Page>
    </AppProvider>
  );
}`
  }
};

// Contextual Save Bar Examples
export const contextualSaveBarExamples = {
  default: {
    react: `import {Frame, ContextualSaveBar} from '@shopify/polaris';
import React from 'react';

function ContextualSaveBarDefault() {
  return (
    <div style={{height: '250px'}}>
      <Frame
        logo={{
          width: 86,
          contextualSaveBarSource:
            'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
        }}
      >
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            onAction: () => console.log('add form submit logic'),
            loading: false,
            disabled: false,
          }}
          discardAction={{
            onAction: () => console.log('add clear form logic'),
          }}
        />
      </Frame>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  height: 250,
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    cls: 'contextual-save-bar',
    height: 60,
    items: [{
      xtype: 'image',
      src: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
      width: 86,
      height: 30
    }, {
      xtype: 'tbfill'
    }, {
      xtype: 'displayfield',
      value: 'Unsaved changes',
      cls: 'save-bar-message',
      margin: '0 20 0 0'
    }, {
      xtype: 'button',
      text: 'Discard',
      margin: '0 10 0 0',
      handler: function() {
        console.log('add clear form logic');
      }
    }, {
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('add form submit logic');
      }
    }]
  }, {
    region: 'center',
    html: '<div style="padding: 20px;">Page content goes here...</div>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame" style="height: 250px;">
  <div class="polaris-contextual-save-bar">
    <div class="polaris-contextual-save-bar__logo">
      <img src="https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png" 
           alt="Logo" 
           width="86" 
           height="30">
    </div>
    
    <div class="polaris-contextual-save-bar__content">
      <span class="polaris-contextual-save-bar__message">Unsaved changes</span>
      
      <div class="polaris-contextual-save-bar__actions">
        <button class="polaris-button" id="discard-button">Discard</button>
        <button class="polaris-button polaris-button--primary" id="save-button">Save</button>
      </div>
    </div>
  </div>
  
  <div class="polaris-frame__content">
    <div style="padding: 20px;">Page content goes here...</div>
  </div>
</div>

<script>
// JavaScript behavior
const saveButton = document.getElementById('save-button');
const discardButton = document.getElementById('discard-button');

saveButton.addEventListener('click', () => {
  console.log('add form submit logic');
  // Add loading state
  saveButton.textContent = 'Saving...';
  saveButton.disabled = true;
  
  // Simulate save operation
  setTimeout(() => {
    saveButton.textContent = 'Save';
    saveButton.disabled = false;
    console.log('Changes saved');
  }, 1000);
});

discardButton.addEventListener('click', () => {
  console.log('add clear form logic');
  
  // Confirm discard action
  if (confirm('Are you sure you want to discard your changes?')) {
    console.log('Changes discarded');
    // Hide the contextual save bar
    document.querySelector('.polaris-contextual-save-bar').style.display = 'none';
  }
});

// Show contextual save bar when there are unsaved changes
function showUnsavedChanges() {
  document.querySelector('.polaris-contextual-save-bar').style.display = 'flex';
}

// Hide contextual save bar when changes are saved
function hideUnsavedChanges() {
  document.querySelector('.polaris-contextual-save-bar').style.display = 'none';
}
</script>`,
    typescript: `import {Frame, ContextualSaveBar} from '@shopify/polaris';
import React, {useState, useCallback} from 'react';

interface ContextualSaveBarDefaultProps {
  message?: string;
  onSave?: () => void | Promise<void>;
  onDiscard?: () => void;
  logoSrc?: string;
  logoWidth?: number;
  saveLoading?: boolean;
  saveDisabled?: boolean;
  height?: number | string;
}

function ContextualSaveBarDefault({
  message = "Unsaved changes",
  onSave,
  onDiscard,
  logoSrc = 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
  logoWidth = 86,
  saveLoading: initialSaveLoading = false,
  saveDisabled = false,
  height = '250px'
}: ContextualSaveBarDefaultProps): JSX.Element {
  const [saveLoading, setSaveLoading] = useState<boolean>(initialSaveLoading);

  const handleSaveAction = useCallback(async () => {
    setSaveLoading(true);
    try {
      await onSave?.();
      console.log('Changes saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaveLoading(false);
    }
  }, [onSave]);

  const handleDiscardAction = useCallback(() => {
    onDiscard?.();
    console.log('Changes discarded');
  }, [onDiscard]);

  return (
    <div style={{height}}>
      <Frame
        logo={{
          width: logoWidth,
          contextualSaveBarSource: logoSrc,
        }}
      >
        <ContextualSaveBar
          message={message}
          saveAction={{
            onAction: handleSaveAction,
            loading: saveLoading,
            disabled: saveDisabled || saveLoading,
          }}
          discardAction={{
            onAction: handleDiscardAction,
          }}
        />
      </Frame>
    </div>
  );
}`
  }
};

// Data Table Examples
export const dataTableExamples = {
  default: {
    react: `import {Page, LegacyCard, DataTable} from '@shopify/polaris';
import React from 'react';

function DataTableDefault() {
  const rows = [
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$445.00',
      124518,
      32,
      '$14,240.00',
    ],
  ];

  return (
    <Page title="Sales by product">
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
          ]}
          rows={rows}
          totals={['', '', '', 255, '$155,830.00']}
        />
      </LegacyCard>
    </Page>
  );
}`,
    extjs: `Ext.create('Ext.grid.Panel', {
  title: 'Sales by product',
  height: 400,
  width: 800,
  frame: true,
  columns: [{
    text: 'Product',
    dataIndex: 'product',
    flex: 2,
    sortable: true
  }, {
    text: 'Price',
    dataIndex: 'price',
    width: 100,
    align: 'right',
    xtype: 'numbercolumn',
    format: '$0.00'
  }, {
    text: 'SKU Number',
    dataIndex: 'sku',
    width: 120,
    align: 'right'
  }, {
    text: 'Net quantity',
    dataIndex: 'quantity',
    width: 120,
    align: 'right',
    xtype: 'numbercolumn',
    format: '0'
  }, {
    text: 'Net sales',
    dataIndex: 'sales',
    width: 130,
    align: 'right',
    xtype: 'numbercolumn',
    format: '$0,000.00'
  }],
  
  store: Ext.create('Ext.data.Store', {
    fields: ['product', 'price', 'sku', 'quantity', 'sales'],
    data: [
      {
        product: 'Emerald Silk Gown',
        price: 875.00,
        sku: 124689,
        quantity: 140,
        sales: 122500.00
      },
      {
        product: 'Mauve Cashmere Scarf',
        price: 230.00,
        sku: 124533,
        quantity: 83,
        sales: 19090.00
      },
      {
        product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
        price: 445.00,
        sku: 124518,
        quantity: 32,
        sales: 14240.00
      }
    ]
  }),
  
  features: [{
    ftype: 'summary',
    dock: 'bottom'
  }],
  
  listeners: {
    afterrender: function(grid) {
      // Add totals row
      const store = grid.getStore();
      const totalQuantity = store.sum('quantity');
      const totalSales = store.sum('sales');
      
      console.log('Total Quantity:', totalQuantity);
      console.log('Total Sales:', Ext.util.Format.currency(totalSales));
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page__header">
    <h1 class="polaris-page__title">Sales by product</h1>
  </div>
  
  <div class="polaris-card">
    <div class="polaris-data-table-wrapper">
      <table class="polaris-data-table">
        <thead class="polaris-data-table__header">
          <tr class="polaris-data-table__header-row">
            <th class="polaris-data-table__cell polaris-data-table__cell--header">Product</th>
            <th class="polaris-data-table__cell polaris-data-table__cell--header polaris-data-table__cell--numeric">Price</th>
            <th class="polaris-data-table__cell polaris-data-table__cell--header polaris-data-table__cell--numeric">SKU Number</th>
            <th class="polaris-data-table__cell polaris-data-table__cell--header polaris-data-table__cell--numeric">Net quantity</th>
            <th class="polaris-data-table__cell polaris-data-table__cell--header polaris-data-table__cell--numeric">Net sales</th>
          </tr>
        </thead>
        
        <tbody class="polaris-data-table__body">
          <tr class="polaris-data-table__row">
            <td class="polaris-data-table__cell">Emerald Silk Gown</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">$875.00</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">124689</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">140</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">$122,500.00</td>
          </tr>
          
          <tr class="polaris-data-table__row">
            <td class="polaris-data-table__cell">Mauve Cashmere Scarf</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">$230.00</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">124533</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">83</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">$19,090.00</td>
          </tr>
          
          <tr class="polaris-data-table__row">
            <td class="polaris-data-table__cell">Navy Merino Wool Blazer with khaki chinos and yellow belt</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">$445.00</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">124518</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">32</td>
            <td class="polaris-data-table__cell polaris-data-table__cell--numeric">$14,240.00</td>
          </tr>
        </tbody>
        
        <tfoot class="polaris-data-table__footer">
          <tr class="polaris-data-table__totals-row">
            <td class="polaris-data-table__cell polaris-data-table__totals-cell"></td>
            <td class="polaris-data-table__cell polaris-data-table__totals-cell"></td>
            <td class="polaris-data-table__cell polaris-data-table__totals-cell"></td>
            <td class="polaris-data-table__cell polaris-data-table__totals-cell polaris-data-table__cell--numeric">255</td>
            <td class="polaris-data-table__cell polaris-data-table__totals-cell polaris-data-table__cell--numeric">$155,830.00</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.addEventListener('DOMContentLoaded', function() {
  const dataTable = document.querySelector('.polaris-data-table');
  const rows = dataTable.querySelectorAll('.polaris-data-table__row');
  
  // Add row hover effects
  rows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.classList.add('polaris-data-table__row--hovered');
    });
    
    row.addEventListener('mouseleave', () => {
      row.classList.remove('polaris-data-table__row--hovered');
    });
    
    // Add click handler for row selection
    row.addEventListener('click', () => {
      // Remove selection from other rows
      rows.forEach(r => r.classList.remove('polaris-data-table__row--selected'));
      
      // Add selection to clicked row
      row.classList.add('polaris-data-table__row--selected');
      
      // Get product name from first cell
      const productName = row.querySelector('.polaris-data-table__cell').textContent;
      console.log('Selected product:', productName);
    });
  });
  
  // Calculate and display totals
  function calculateTotals() {
    let totalQuantity = 0;
    let totalSales = 0;
    
    rows.forEach(row => {
      const cells = row.querySelectorAll('.polaris-data-table__cell');
      const quantity = parseInt(cells[3].textContent) || 0;
      const sales = parseFloat(cells[4].textContent.replace(/[$,]/g, '')) || 0;
      
      totalQuantity += quantity;
      totalSales += sales;
    });
    
    console.log('Calculated totals - Quantity:', totalQuantity, 'Sales:', totalSales);
  }
  
  calculateTotals();
});
</script>`,
    typescript: `import {Page, LegacyCard, DataTable} from '@shopify/polaris';
import React, {useMemo} from 'react';

interface ProductData {
  product: string;
  price: string;
  sku: number;
  quantity: number;
  sales: string;
}

interface DataTableDefaultProps {
  title?: string;
  data?: ProductData[];
  showTotals?: boolean;
  sortable?: boolean;
  onRowClick?: (rowData: ProductData, index: number) => void;
}

function DataTableDefault({
  title = "Sales by product",
  data,
  showTotals = true,
  sortable = false,
  onRowClick
}: DataTableDefaultProps): JSX.Element {
  const defaultData: ProductData[] = [
    {
      product: 'Emerald Silk Gown',
      price: '$875.00',
      sku: 124689,
      quantity: 140,
      sales: '$122,500.00'
    },
    {
      product: 'Mauve Cashmere Scarf',
      price: '$230.00',
      sku: 124533,
      quantity: 83,
      sales: '$19,090.00'
    },
    {
      product: 'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      price: '$445.00',
      sku: 124518,
      quantity: 32,
      sales: '$14,240.00'
    }
  ];

  const tableData = data || defaultData;

  const rows = useMemo(() => 
    tableData.map((item, index) => {
      const row = [item.product, item.price, item.sku, item.quantity, item.sales];
      return onRowClick ? {
        ...row,
        onClick: () => onRowClick(item, index)
      } : row;
    }), [tableData, onRowClick]);

  const totals = useMemo(() => {
    if (!showTotals) return undefined;
    
    const totalQuantity = tableData.reduce((sum, item) => sum + item.quantity, 0);
    const totalSales = tableData.reduce((sum, item) => {
      const salesValue = parseFloat(item.sales.replace(/[$,]/g, ''));
      return sum + salesValue;
    }, 0);
    
    return ['', '', '', totalQuantity, \`$\${totalSales.toLocaleString()}.00\`];
  }, [tableData, showTotals]);

  return (
    <Page title={title}>
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
          ]}
          rows={rows}
          totals={totals}
          sortable={sortable}
        />
      </LegacyCard>
    </Page>
  );
}`
  }
};

// Footer Help Examples
export const footerHelpExamples = {
  default: {
    react: `import {FooterHelp, Link} from '@shopify/polaris';
import React from 'react';

function FooterHelpDefault() {
  return (
    <FooterHelp>
      Learn more about{' '}
      <Link url="https://help.shopify.com/manual/orders/fulfill-orders">
        fulfilling orders
      </Link>
    </FooterHelp>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 10,
  items: [{
    xtype: 'component',
    cls: 'footer-help',
    html: 'Learn more about <a href="https://help.shopify.com/manual/orders/fulfill-orders" target="_blank">fulfilling orders</a>',
    style: {
      color: '#6D7175',
      fontSize: '14px',
      textAlign: 'center',
      padding: '12px 0',
      borderTop: '1px solid #E1E3E5'
    },
    listeners: {
      afterrender: function(component) {
        // Add click tracking to links
        const links = component.getEl().query('a');
        links.forEach(link => {
          link.addEventListener('click', function(e) {
            console.log('Footer help link clicked:', e.target.href);
          });
        });
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-footer-help">
  <div class="polaris-footer-help__content">
    Learn more about 
    <a href="https://help.shopify.com/manual/orders/fulfill-orders" 
       class="polaris-link" 
       target="_blank" 
       rel="noopener noreferrer">
      fulfilling orders
    </a>
  </div>
</div>

<script>
// JavaScript behavior
document.addEventListener('DOMContentLoaded', function() {
  const footerHelp = document.querySelector('.polaris-footer-help');
  const links = footerHelp.querySelectorAll('.polaris-link');
  
  // Add click tracking to all links
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Footer help link clicked:', e.target.href);
      
      // Optional: Add analytics tracking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
          event_category: 'footer_help',
          event_label: e.target.href
        });
      }
    });
    
    // Add keyboard navigation support
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.target.click();
      }
    });
  });
  
  // Add hover effects
  footerHelp.addEventListener('mouseenter', () => {
    footerHelp.classList.add('polaris-footer-help--hovered');
  });
  
  footerHelp.addEventListener('mouseleave', () => {
    footerHelp.classList.remove('polaris-footer-help--hovered');
  });
});
</script>`,
    typescript: `import {FooterHelp, Link} from '@shopify/polaris';
import React from 'react';

interface FooterHelpDefaultProps {
  children?: React.ReactNode;
  helpUrl?: string;
  helpText?: string;
  linkText?: string;
  onLinkClick?: (url: string) => void;
}

function FooterHelpDefault({
  children,
  helpUrl = "https://help.shopify.com/manual/orders/fulfill-orders",
  helpText = "Learn more about",
  linkText = "fulfilling orders",
  onLinkClick
}: FooterHelpDefaultProps): JSX.Element {
  const handleLinkClick = (url: string) => {
    onLinkClick?.(url);
    console.log('Footer help link clicked:', url);
  };

  if (children) {
    return <FooterHelp>{children}</FooterHelp>;
  }

  return (
    <FooterHelp>
      {helpText}{' '}
      <Link 
        url={helpUrl} 
        onClick={() => handleLinkClick(helpUrl)}
        external
      >
        {linkText}
      </Link>
    </FooterHelp>
  );
}`
  }
};

// Frame Examples
export const frameExamples = {
  default: {
    react: `import {
  Frame,
  TopBar,
  Navigation,
  Page,
  LegacyCard,
  AppProvider
} from '@shopify/polaris';
import {HomeIcon, OrderIcon} from '@shopify/polaris-icons';
import React, {useState, useCallback} from 'react';

function FrameDefault() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((active) => !active),
    [],
  );

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((active) => !active),
    [],
  );

  const logo = {
    width: 86,
    topBarSource: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    accessibilityLabel: 'Shopify',
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      name="John Doe"
      detail="My Store"
      initials="JD"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      actions={[{items: [{content: 'Settings'}, {content: 'Logout'}]}]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Main Navigation"
        items={[
          {
            label: 'Dashboard',
            icon: HomeIcon,
            url: '/dashboard',
          },
          {
            label: 'Orders',
            icon: OrderIcon,
            url: '/orders',
          },
        ]}
      />
    </Navigation>
  );

  return (
    <div style={{height: '500px'}}>
      <AppProvider i18n={{}}>
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          <Page title="Dashboard">
            <LegacyCard title="Welcome" sectioned>
              <p>This is your admin dashboard.</p>
            </LegacyCard>
          </Page>
        </Frame>
      </AppProvider>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    height: 50,
    cls: 'app-topbar',
    items: [{
      xtype: 'image',
      src: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
      width: 86,
      height: 30
    }, {
      xtype: 'tbfill'
    }, {
      xtype: 'button',
      text: 'JD',
      iconCls: 'user-icon',
      menu: [{
        text: 'Settings',
        handler: function() {
          console.log('Settings clicked');
        }
      }, {
        text: 'Logout',
        handler: function() {
          console.log('Logout clicked');
        }
      }]
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
        expanded: true,
        children: [{
          text: 'Dashboard',
          iconCls: 'home-icon',
          leaf: true,
          url: '/dashboard'
        }, {
          text: 'Orders',
          iconCls: 'order-icon',
          leaf: true,
          url: '/orders'
        }]
      }
    }),
    listeners: {
      itemclick: function(view, record) {
        if (record.isLeaf()) {
          console.log('Navigate to:', record.get('url'));
        }
      }
    }
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Dashboard',
    bodyPadding: 20,
    items: [{
      xtype: 'panel',
      title: 'Welcome',
      bodyPadding: 10,
      html: '<p>This is your admin dashboard.</p>'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame" style="height: 500px;">
  <!-- Top Bar -->
  <div class="polaris-top-bar">
    <div class="polaris-top-bar__left">
      <button class="polaris-top-bar__navigation-toggle" id="nav-toggle">☰</button>
      <div class="polaris-top-bar__logo">
        <img src="https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png" 
             alt="Shopify" 
             width="86" 
             height="30">
      </div>
    </div>
    
    <div class="polaris-top-bar__right">
      <div class="polaris-top-bar__user-menu">
        <button class="polaris-top-bar__user-button" id="user-menu-button">JD</button>
        <div class="polaris-top-bar__user-menu-dropdown" id="user-menu">
          <a href="#" class="polaris-top-bar__user-menu-item">Settings</a>
          <a href="#" class="polaris-top-bar__user-menu-item">Logout</a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Navigation -->
  <div class="polaris-navigation" id="navigation">
    <div class="polaris-navigation__section">
      <h3 class="polaris-navigation__section-title">Main Navigation</h3>
      <ul class="polaris-navigation__list">
        <li class="polaris-navigation__item">
          <a href="/dashboard" class="polaris-navigation__link">
            <span class="polaris-navigation__icon">🏠</span>
            Dashboard
          </a>
        </li>
        <li class="polaris-navigation__item">
          <a href="/orders" class="polaris-navigation__link">
            <span class="polaris-navigation__icon">📦</span>
            Orders
          </a>
        </li>
      </ul>
    </div>
  </div>
  
  <!-- Main Content -->
  <div class="polaris-frame__content">
    <div class="polaris-page">
      <div class="polaris-page__header">
        <h1 class="polaris-page__title">Dashboard</h1>
      </div>
      <div class="polaris-card">
        <div class="polaris-card__header">
          <h3 class="polaris-card__title">Welcome</h3>
        </div>
        <div class="polaris-card__section">
          <p>This is your admin dashboard.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('nav-toggle');
  const navigation = document.getElementById('navigation');
  const userMenuButton = document.getElementById('user-menu-button');
  const userMenu = document.getElementById('user-menu');
  
  // Mobile navigation toggle
  navToggle.addEventListener('click', () => {
    navigation.classList.toggle('polaris-navigation--open');
  });
  
  // User menu toggle
  userMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.classList.toggle('polaris-top-bar__user-menu-dropdown--open');
  });
  
  // Close user menu when clicking outside
  document.addEventListener('click', () => {
    userMenu.classList.remove('polaris-top-bar__user-menu-dropdown--open');
  });
  
  // Navigation link clicks
  document.querySelectorAll('.polaris-navigation__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      document.querySelectorAll('.polaris-navigation__link').forEach(l => {
        l.classList.remove('polaris-navigation__link--active');
      });
      
      // Add active class to clicked link
      link.classList.add('polaris-navigation__link--active');
      
      console.log('Navigate to:', link.getAttribute('href'));
    });
  });
  
  // User menu item clicks
  document.querySelectorAll('.polaris-top-bar__user-menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('User menu action:', item.textContent);
      userMenu.classList.remove('polaris-top-bar__user-menu-dropdown--open');
    });
  });
});
</script>`,
    typescript: `import {
  Frame,
  TopBar,
  Navigation,
  Page,
  LegacyCard,
  AppProvider
} from '@shopify/polaris';
import {HomeIcon, OrderIcon} from '@shopify/polaris-icons';
import React, {useState, useCallback} from 'react';

interface FrameDefaultProps {
  logoSrc?: string;
  logoWidth?: number;
  userName?: string;
  userInitials?: string;
  storeName?: string;
  onNavigate?: (url: string) => void;
  onUserAction?: (action: string) => void;
}

interface NavigationItem {
  label: string;
  icon?: React.ComponentType;
  url: string;
}

function FrameDefault({
  logoSrc = 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
  logoWidth = 86,
  userName = 'John Doe',
  userInitials = 'JD',
  storeName = 'My Store',
  onNavigate,
  onUserAction
}: FrameDefaultProps): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);
  const [userMenuActive, setUserMenuActive] = useState<boolean>(false);

  const toggleMobileNavigationActive = useCallback(
    () => setMobileNavigationActive((active) => !active),
    [],
  );

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((active) => !active),
    [],
  );

  const handleUserAction = useCallback((action: string) => {
    onUserAction?.(action);
    console.log('User action:', action);
  }, [onUserAction]);

  const handleNavigation = useCallback((url: string) => {
    onNavigate?.(url);
    console.log('Navigate to:', url);
  }, [onNavigate]);

  const logo = {
    width: logoWidth,
    topBarSource: logoSrc,
    accessibilityLabel: 'Logo',
  };

  const userMenuMarkup = (
    <TopBar.UserMenu
      name={userName}
      detail={storeName}
      initials={userInitials}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
      actions={[{
        items: [
          {content: 'Settings', onAction: () => handleUserAction('settings')},
          {content: 'Logout', onAction: () => handleUserAction('logout')}
        ]
      }]}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: HomeIcon,
      url: '/dashboard',
    },
    {
      label: 'Orders',
      icon: OrderIcon,
      url: '/orders',
    },
  ];

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Main Navigation"
        items={navigationItems.map(item => ({
          ...item,
          onClick: () => handleNavigation(item.url)
        }))}
      />
    </Navigation>
  );

  return (
    <div style={{height: '500px'}}>
      <AppProvider i18n={{}}>
        <Frame
          logo={logo}
          topBar={topBarMarkup}
          navigation={navigationMarkup}
          showMobileNavigation={mobileNavigationActive}
          onNavigationDismiss={toggleMobileNavigationActive}
        >
          <Page title="Dashboard">
            <LegacyCard title="Welcome" sectioned>
              <p>This is your admin dashboard.</p>
            </LegacyCard>
          </Page>
        </Frame>
      </AppProvider>
    </div>
  );
}`
  }
};

// Fullscreen Bar Examples
export const fullscreenBarExamples = {
  default: {
    react: `import {Badge, ButtonGroup, FullscreenBar, Button, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function FullscreenBarDefault() {
  const [isFullscreen, setFullscreen] = useState(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
  }, []);

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}>
        <Badge tone="info">Draft</Badge>
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <Text variant="headingLg" as="p">Page title</Text>
        </div>
        <ButtonGroup>
          <Button onClick={() => {}}>Secondary Action</Button>
          <Button variant="primary" onClick={() => {}}>Primary Action</Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );

  return (
    <div style={{height: '250px', width: '100%'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <Text variant="headingLg" as="p">Page content</Text>
      </div>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  height: 250,
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    height: 60,
    cls: 'fullscreen-bar',
    items: [{
      xtype: 'component',
      html: '<span class="badge-info">Draft</span>',
      margin: '0 10 0 0'
    }, {
      xtype: 'component',
      html: '<h2>Page title</h2>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Secondary Action',
      margin: '0 5 0 0'
    }, {
      xtype: 'button',
      text: 'Primary Action',
      ui: 'primary',
      margin: '0 5 0 0'
    }, {
      xtype: 'button',
      text: '✕',
      handler: function() {
        this.up('panel').down('toolbar').hide();
      }
    }]
  }, {
    region: 'center',
    html: '<div style="padding: 1rem;"><h2>Page content</h2></div>'
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="fullscreen-demo" style="height: 250px; width: 100%;">
  <div class="polaris-fullscreen-bar" id="fullscreen-bar">
    <div class="polaris-fullscreen-bar__content">
      <span class="polaris-badge polaris-badge--info">Draft</span>
      <div class="polaris-fullscreen-bar__title">
        <h2>Page title</h2>
      </div>
      <div class="polaris-button-group">
        <button class="polaris-button">Secondary Action</button>
        <button class="polaris-button polaris-button--primary">Primary Action</button>
      </div>
      <button class="polaris-fullscreen-bar__back" id="exit-fullscreen">✕</button>
    </div>
  </div>
  
  <div class="polaris-page-content" style="padding: 1rem;">
    <button class="polaris-button" id="go-fullscreen" style="display: none;">Go Fullscreen</button>
    <h2>Page content</h2>
  </div>
</div>

<script>
const fullscreenBar = document.getElementById('fullscreen-bar');
const exitButton = document.getElementById('exit-fullscreen');
const goFullscreenButton = document.getElementById('go-fullscreen');

exitButton.addEventListener('click', () => {
  fullscreenBar.style.display = 'none';
  goFullscreenButton.style.display = 'inline-block';
});

goFullscreenButton.addEventListener('click', () => {
  fullscreenBar.style.display = 'block';
  goFullscreenButton.style.display = 'none';
});
</script>`,
    typescript: `import {Badge, ButtonGroup, FullscreenBar, Button, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface FullscreenBarDefaultProps {
  title?: string;
  badge?: string;
  badgeTone?: 'info' | 'success' | 'warning' | 'critical';
  primaryAction?: string;
  secondaryAction?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  onExit?: () => void;
}

function FullscreenBarDefault({
  title = "Page title",
  badge = "Draft",
  badgeTone = "info",
  primaryAction = "Primary Action",
  secondaryAction = "Secondary Action",
  onPrimaryAction,
  onSecondaryAction,
  onExit
}: FullscreenBarDefaultProps): JSX.Element {
  const [isFullscreen, setFullscreen] = useState<boolean>(true);

  const handleActionClick = useCallback(() => {
    setFullscreen(false);
    onExit?.();
  }, [onExit]);

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={handleActionClick}>
      <div style={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}>
        <Badge tone={badgeTone}>{badge}</Badge>
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <Text variant="headingLg" as="p">{title}</Text>
        </div>
        <ButtonGroup>
          <Button onClick={onSecondaryAction}>{secondaryAction}</Button>
          <Button variant="primary" onClick={onPrimaryAction}>{primaryAction}</Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  );

  return (
    <div style={{height: '250px', width: '100%'}}>
      {isFullscreen && fullscreenBarMarkup}
      <div style={{padding: '1rem'}}>
        {!isFullscreen && (
          <Button onClick={() => setFullscreen(true)}>Go Fullscreen</Button>
        )}
        <Text variant="headingLg" as="p">Page content</Text>
      </div>
    </div>
  );
}`
  }
};

// Index Filter Examples
export const indexFilterExamples = {
  default: {
    react: `import {IndexFilters, useSetIndexFiltersMode, Text, LegacyCard} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function IndexFilterDefault() {
  const {mode, setMode} = useSetIndexFiltersMode();
  const [queryValue, setQueryValue] = useState('');

  const handleQueryValueChange = useCallback(
    (value: string) => setQueryValue(value),
    [],
  );

  const handleClearAll = useCallback(() => {
    setQueryValue('');
  }, []);

  return (
    <LegacyCard>
      <IndexFilters
        queryValue={queryValue}
        queryPlaceholder="Search orders"
        onQueryChange={handleQueryValueChange}
        onQueryClear={() => setQueryValue('')}
        onClearAll={handleClearAll}
        filters={[]}
        appliedFilters={[]}
        onFiltersChange={() => {}}
        mode={mode}
        setMode={setMode}
        tabs={[]}
      />
      <div style={{padding: '1rem'}}>
        <Text as="p">Content filtered by: "{queryValue}"</Text>
      </div>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Index Filters',
  items: [{
    xtype: 'toolbar',
    items: [{
      xtype: 'textfield',
      fieldLabel: 'Search',
      emptyText: 'Search orders...',
      width: 300,
      listeners: {
        change: function(field, newValue) {
          console.log('Search query:', newValue);
        }
      }
    }, {
      xtype: 'button',
      text: 'Clear',
      handler: function() {
        this.prev().setValue('');
      }
    }]
  }, {
    html: '<div style="padding: 1rem;"><p>Filtered content goes here...</p></div>'
  }]
});`,
    vanilla: `<div class="polaris-index-filters">
  <div class="polaris-index-filters__search">
    <input type="text" placeholder="Search orders" id="search-input">
    <button id="clear-search">Clear</button>
  </div>
  <div class="polaris-index-filters__content">
    <p>Content filtered by: <span id="query-display"></span></p>
  </div>
</div>

<script>
const searchInput = document.getElementById('search-input');
const clearButton = document.getElementById('clear-search');
const queryDisplay = document.getElementById('query-display');

searchInput.addEventListener('input', (e) => {
  queryDisplay.textContent = e.target.value;
});

clearButton.addEventListener('click', () => {
  searchInput.value = '';
  queryDisplay.textContent = '';
});
</script>`,
    typescript: `import {IndexFilters, useSetIndexFiltersMode, Text, LegacyCard} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface IndexFilterDefaultProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

function IndexFilterDefault({
  placeholder = "Search orders",
  onSearch
}: IndexFilterDefaultProps): JSX.Element {
  const {mode, setMode} = useSetIndexFiltersMode();
  const [queryValue, setQueryValue] = useState<string>('');

  const handleQueryValueChange = useCallback(
    (value: string) => {
      setQueryValue(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  const handleClearAll = useCallback(() => {
    setQueryValue('');
    onSearch?.('');
  }, [onSearch]);

  return (
    <LegacyCard>
      <IndexFilters
        queryValue={queryValue}
        queryPlaceholder={placeholder}
        onQueryChange={handleQueryValueChange}
        onQueryClear={() => setQueryValue('')}
        onClearAll={handleClearAll}
        filters={[]}
        appliedFilters={[]}
        onFiltersChange={() => {}}
        mode={mode}
        setMode={setMode}
        tabs={[]}
      />
      <div style={{padding: '1rem'}}>
        <Text as="p">Content filtered by: "{queryValue}"</Text>
      </div>
    </LegacyCard>
  );
}`
  }
};

// Inline Error Examples
export const inlineErrorExamples = {
  default: {
    react: `import {FormLayout, TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function InlineErrorDefault() {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [error, setError] = useState('');

  const handleTextFieldChange = useCallback((value: string) => {
    setTextFieldValue(value);
    if (value.length < 3) {
      setError('Email must be at least 3 characters');
    } else {
      setError('');
    }
  }, []);

  return (
    <FormLayout>
      <TextField
        label="Email"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        error={Boolean(error)}
      />
      {error && <InlineError message={error} fieldID="email" />}
    </FormLayout>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Email',
    name: 'email',
    allowBlank: false,
    minLength: 3,
    msgTarget: 'under',
    listeners: {
      change: function(field, newValue) {
        if (newValue.length < 3) {
          field.markInvalid('Email must be at least 3 characters');
        } else {
          field.clearInvalid();
        }
      }
    }
  }]
});`,
    vanilla: `<div class="polaris-form-layout">
  <div class="polaris-text-field-wrapper">
    <label for="email-field">Email</label>
    <input type="text" id="email-field" class="polaris-text-field">
    <div class="polaris-inline-error" id="email-error" style="display: none;">
      Email must be at least 3 characters
    </div>
  </div>
</div>

<script>
const emailField = document.getElementById('email-field');
const emailError = document.getElementById('email-error');

emailField.addEventListener('input', (e) => {
  const value = e.target.value;
  if (value.length < 3 && value.length > 0) {
    emailError.style.display = 'block';
    emailField.classList.add('polaris-text-field--error');
  } else {
    emailError.style.display = 'none';
    emailField.classList.remove('polaris-text-field--error');
  }
});
</script>`,
    typescript: `import {FormLayout, TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface InlineErrorDefaultProps {
  label?: string;
  placeholder?: string;
  minLength?: number;
  errorMessage?: string;
  onValueChange?: (value: string, hasError: boolean) => void;
}

function InlineErrorDefault({
  label = "Email",
  placeholder = "Enter your email",
  minLength = 3,
  errorMessage = "Email must be at least 3 characters",
  onValueChange
}: InlineErrorDefaultProps): JSX.Element {
  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleTextFieldChange = useCallback((value: string) => {
    setTextFieldValue(value);
    const hasError = value.length > 0 && value.length < minLength;
    const errorMsg = hasError ? errorMessage : '';
    
    setError(errorMsg);
    onValueChange?.(value, hasError);
  }, [minLength, errorMessage, onValueChange]);

  const fieldID = 'email-field';

  return (
    <FormLayout>
      <TextField
        id={fieldID}
        label={label}
        value={textFieldValue}
        placeholder={placeholder}
        onChange={handleTextFieldChange}
        error={Boolean(error)}
      />
      {error && <InlineError message={error} fieldID={fieldID} />}
    </FormLayout>
  );
}`
  }
};

// Index Table Examples
export const indexTableExamples = {
  default: {
    react: `import {IndexTable, Text, Badge} from '@shopify/polaris';
import React from 'react';

function IndexTableDefault() {
  const customers = [
    {id: '1', name: 'John Smith', email: 'john@example.com', orders: 25},
    {id: '2', name: 'Jane Doe', email: 'jane@example.com', orders: 35},
    {id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 15},
  ];

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const rowMarkup = customers.map(({id, name, email, orders}, index) => (
    <IndexTable.Row
      id={id}
      key={id}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{email}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone="success">{orders} orders</Badge>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={customers.length}
      headings={[
        {title: 'Name'},
        {title: 'Email'},
        {title: 'Total orders'},
      ]}
      selectable={false}
    >
      {rowMarkup}
    </IndexTable>
  );
}`,
    extjs: `Ext.create('Ext.grid.Panel', {
  title: 'Customer Index',
  columns: [
    {text: 'Name', dataIndex: 'name', flex: 1},
    {text: 'Email', dataIndex: 'email', flex: 1},
    {
      text: 'Total orders',
      dataIndex: 'orders',
      renderer: function(value) {
        return '<span class="badge-success">' + value + ' orders</span>';
      }
    }
  ],
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'email', 'orders'],
    data: [
      {id: '1', name: 'John Smith', email: 'john@example.com', orders: 25},
      {id: '2', name: 'Jane Doe', email: 'jane@example.com', orders: 35},
      {id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 15}
    ]
  })
});`,
    vanilla: `<div class="polaris-index-table">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Total orders</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>John Smith</strong></td>
        <td>john@example.com</td>
        <td><span class="polaris-badge polaris-badge--success">25 orders</span></td>
      </tr>
      <tr>
        <td><strong>Jane Doe</strong></td>
        <td>jane@example.com</td>
        <td><span class="polaris-badge polaris-badge--success">35 orders</span></td>
      </tr>
      <tr>
        <td><strong>Bob Johnson</strong></td>
        <td>bob@example.com</td>
        <td><span class="polaris-badge polaris-badge--success">15 orders</span></td>
      </tr>
    </tbody>
  </table>
</div>`,
    typescript: `import {IndexTable, Text, Badge} from '@shopify/polaris';
import React from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
}

interface IndexTableDefaultProps {
  customers?: Customer[];
  onRowClick?: (customer: Customer) => void;
}

function IndexTableDefault({
  customers = [
    {id: '1', name: 'John Smith', email: 'john@example.com', orders: 25},
    {id: '2', name: 'Jane Doe', email: 'jane@example.com', orders: 35},
    {id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 15},
  ],
  onRowClick
}: IndexTableDefaultProps): JSX.Element {
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const rowMarkup = customers.map((customer, index) => (
    <IndexTable.Row
      id={customer.id}
      key={customer.id}
      position={index}
      onClick={() => onRowClick?.(customer)}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {customer.name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{customer.email}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone="success">{customer.orders} orders</Badge>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={customers.length}
      headings={[
        {title: 'Name'},
        {title: 'Email'},
        {title: 'Total orders'},
      ]}
      selectable={false}
    >
      {rowMarkup}
    </IndexTable>
  );
}`
  }
};

// Inline Grid Examples
export const inlineGridExamples = {
  default: {
    react: `import {InlineGrid, Text} from '@shopify/polaris';
import React from 'react';

function InlineGridDefault() {
  return (
    <InlineGrid columns={{xs: 1, sm: 2, md: 3, lg: 4}} gap="400">
      <div style={{background: '#E0E5CC', padding: '20px'}}>
        <Text as="p">Grid item 1</Text>
      </div>
      <div style={{background: '#B8B89F', padding: '20px'}}>
        <Text as="p">Grid item 2</Text>
      </div>
      <div style={{background: '#9B9B7A', padding: '20px'}}>
        <Text as="p">Grid item 3</Text>
      </div>
      <div style={{background: '#797D62', padding: '20px'}}>
        <Text as="p">Grid item 4</Text>
      </div>
    </InlineGrid>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'column'
  },
  defaults: {
    columnWidth: 0.25,
    padding: 10
  },
  items: [{
    html: '<div style="background: #E0E5CC; padding: 20px;">Grid item 1</div>'
  }, {
    html: '<div style="background: #B8B89F; padding: 20px;">Grid item 2</div>'
  }, {
    html: '<div style="background: #9B9B7A; padding: 20px;">Grid item 3</div>'
  }, {
    html: '<div style="background: #797D62; padding: 20px;">Grid item 4</div>'
  }]
});`,
    vanilla: `<div class="polaris-inline-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
  <div style="background: #E0E5CC; padding: 20px;">
    <p>Grid item 1</p>
  </div>
  <div style="background: #B8B89F; padding: 20px;">
    <p>Grid item 2</p>
  </div>
  <div style="background: #9B9B7A; padding: 20px;">
    <p>Grid item 3</p>
  </div>
  <div style="background: #797D62; padding: 20px;">
    <p>Grid item 4</p>
  </div>
</div>`,
    typescript: `import {InlineGrid, Text} from '@shopify/polaris';
import React from 'react';

interface InlineGridDefaultProps {
  columns?: {xs: number; sm: number; md: number; lg: number};
  gap?: string;
  children?: React.ReactNode;
}

function InlineGridDefault({
  columns = {xs: 1, sm: 2, md: 3, lg: 4},
  gap = "400",
  children
}: InlineGridDefaultProps): JSX.Element {
  const defaultChildren = (
    <>
      <div style={{background: '#E0E5CC', padding: '20px'}}>
        <Text as="p">Grid item 1</Text>
      </div>
      <div style={{background: '#B8B89F', padding: '20px'}}>
        <Text as="p">Grid item 2</Text>
      </div>
      <div style={{background: '#9B9B7A', padding: '20px'}}>
        <Text as="p">Grid item 3</Text>
      </div>
      <div style={{background: '#797D62', padding: '20px'}}>
        <Text as="p">Grid item 4</Text>
      </div>
    </>
  );

  return (
    <InlineGrid columns={columns} gap={gap}>
      {children || defaultChildren}
    </InlineGrid>
  );
}`
  }
};

// Keyboard Key Examples
export const keyboardKeyExamples = {
  default: {
    react: `import {KeyboardKey} from '@shopify/polaris';
import React from 'react';

function KeyboardKeyDefault() {
  return (
    <div>
      <p>
        Press <KeyboardKey>Cmd</KeyboardKey> + <KeyboardKey>S</KeyboardKey> to save
      </p>
    </div>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  html: '<p>Press <kbd>Cmd</kbd> + <kbd>S</kbd> to save</p>',
  bodyPadding: 10
});`,
    vanilla: `<div>
  <p>
    Press <kbd class="polaris-keyboard-key">Cmd</kbd> + 
    <kbd class="polaris-keyboard-key">S</kbd> to save
  </p>
</div>`,
    typescript: `import {KeyboardKey} from '@shopify/polaris';
import React from 'react';

interface KeyboardKeyDefaultProps {
  shortcut?: string[];
  description?: string;
}

function KeyboardKeyDefault({
  shortcut = ['Cmd', 'S'],
  description = 'to save'
}: KeyboardKeyDefaultProps): JSX.Element {
  return (
    <div>
      <p>
        Press {shortcut.map((key, index) => (
          <React.Fragment key={key}>
            <KeyboardKey>{key}</KeyboardKey>
            {index < shortcut.length - 1 && ' + '}
          </React.Fragment>
        ))} {description}
      </p>
    </div>
  );
}`
  }
};

// Legacy Card Examples
export const legacyCardExamples = {
  default: {
    react: `import {LegacyCard} from '@shopify/polaris';
import React from 'react';

function LegacyCardDefault() {
  return (
    <LegacyCard title="Online store dashboard" sectioned>
      <p>View a summary of your online store's performance.</p>
    </LegacyCard>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Online store dashboard',
  bodyPadding: 20,
  html: '<p>View a summary of your online store\\'s performance.</p>'
});`,
    vanilla: `<div class="polaris-legacy-card">
  <div class="polaris-legacy-card__header">
    <h2 class="polaris-legacy-card__title">Online store dashboard</h2>
  </div>
  <div class="polaris-legacy-card__section">
    <p>View a summary of your online store's performance.</p>
  </div>
</div>`,
    typescript: `import {LegacyCard} from '@shopify/polaris';
import React from 'react';

interface LegacyCardDefaultProps {
  title?: string;
  sectioned?: boolean;
  children?: React.ReactNode;
  primaryFooterAction?: {
    content: string;
    onAction: () => void;
  };
}

function LegacyCardDefault({
  title = "Online store dashboard",
  sectioned = true,
  children = <p>View a summary of your online store's performance.</p>,
  primaryFooterAction
}: LegacyCardDefaultProps): JSX.Element {
  return (
    <LegacyCard 
      title={title} 
      sectioned={sectioned}
      primaryFooterAction={primaryFooterAction}
    >
      {children}
    </LegacyCard>
  );
}`
  }
};

// Resource Item Examples
export const resourceItemExamples = {
  default: {
    react: `import {ResourceItem, Avatar, Text} from '@shopify/polaris';
import React from 'react';

function ResourceItemDefault() {
  return (
    <ResourceItem
      id="345"
      url="/products/345"
      media={<Avatar customer size="md" name="John Smith" />}
      accessibilityLabel="View details for John Smith"
    >
      <Text variant="bodyMd" fontWeight="bold" as="h3">
        John Smith
      </Text>
      <div>john@example.com</div>
    </ResourceItem>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'container',
    layout: 'hbox',
    cls: 'resource-item',
    items: [{
      xtype: 'component',
      html: '<div class="avatar">JS</div>',
      width: 40
    }, {
      xtype: 'container',
      flex: 1,
      html: '<h3>John Smith</h3><div>john@example.com</div>'
    }],
    listeners: {
      render: function(c) {
        c.getEl().on('click', function() {
          window.location.href = '/products/345';
        });
      }
    }
  }]
});`,
    vanilla: `<div class="polaris-resource-item" onclick="window.location.href='/products/345'">
  <div class="polaris-resource-item__media">
    <div class="polaris-avatar">JS</div>
  </div>
  <div class="polaris-resource-item__content">
    <h3>John Smith</h3>
    <div>john@example.com</div>
  </div>
</div>`,
    typescript: `import {ResourceItem, Avatar, Text} from '@shopify/polaris';
import React from 'react';

interface ResourceItemDefaultProps {
  id?: string;
  url?: string;
  name?: string;
  email?: string;
  onClick?: () => void;
}

function ResourceItemDefault({
  id = "345",
  url = "/products/345",
  name = "John Smith",
  email = "john@example.com",
  onClick
}: ResourceItemDefaultProps): JSX.Element {
  return (
    <ResourceItem
      id={id}
      url={url}
      media={<Avatar customer size="md" name={name} />}
      accessibilityLabel={\`View details for \${name}\`}
      onClick={onClick}
    >
      <Text variant="bodyMd" fontWeight="bold" as="h3">
        {name}
      </Text>
      <div>{email}</div>
    </ResourceItem>
  );
}`
  }
};

// Resource List Examples  
export const resourceListExamples = {
  default: {
    react: `import {ResourceList, ResourceItem, Avatar, Text} from '@shopify/polaris';
import React from 'react';

function ResourceListDefault() {
  const items = [
    {id: '341', name: 'Mae Jemison', location: 'Decatur, USA'},
    {id: '256', name: 'Ellen Ochoa', location: 'Los Angeles, USA'},
  ];

  return (
    <ResourceList
      resourceName={{singular: 'customer', plural: 'customers'}}
      items={items}
      renderItem={(item) => {
        const {id, name, location} = item;
        const media = <Avatar customer size="md" name={name} />;

        return (
          <ResourceItem
            id={id}
            media={media}
            accessibilityLabel={\`View details for \${name}\`}
          >
            <Text variant="bodyMd" fontWeight="bold" as="h3">
              {name}
            </Text>
            <div>{location}</div>
          </ResourceItem>
        );
      }}
    />
  );
}`,
    extjs: `Ext.create('Ext.view.View', {
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'location'],
    data: [
      {id: '341', name: 'Mae Jemison', location: 'Decatur, USA'},
      {id: '256', name: 'Ellen Ochoa', location: 'Los Angeles, USA'}
    ]
  }),
  tpl: [
    '<tpl for=".">',
    '<div class="resource-item">',
    '<div class="avatar">{[values.name.substr(0,2)]}</div>',
    '<div class="content">',
    '<h3>{name}</h3>',
    '<div>{location}</div>',
    '</div>',
    '</div>',
    '</tpl>'
  ],
  itemSelector: 'div.resource-item'
});`,
    vanilla: `<div class="polaris-resource-list">
  <div class="polaris-resource-item">
    <div class="polaris-avatar">MJ</div>
    <div class="polaris-resource-item__content">
      <h3>Mae Jemison</h3>
      <div>Decatur, USA</div>
    </div>
  </div>
  <div class="polaris-resource-item">
    <div class="polaris-avatar">EO</div>
    <div class="polaris-resource-item__content">
      <h3>Ellen Ochoa</h3>
      <div>Los Angeles, USA</div>
    </div>
  </div>
</div>`,
    typescript: `import {ResourceList, ResourceItem, Avatar, Text} from '@shopify/polaris';
import React from 'react';

interface Customer {
  id: string;
  name: string;
  location: string;
}

interface ResourceListDefaultProps {
  items?: Customer[];
  onItemClick?: (item: Customer) => void;
}

function ResourceListDefault({
  items = [
    {id: '341', name: 'Mae Jemison', location: 'Decatur, USA'},
    {id: '256', name: 'Ellen Ochoa', location: 'Los Angeles, USA'},
  ],
  onItemClick
}: ResourceListDefaultProps): JSX.Element {
  return (
    <ResourceList
      resourceName={{singular: 'customer', plural: 'customers'}}
      items={items}
      renderItem={(item: Customer) => {
        const {id, name, location} = item;
        const media = <Avatar customer size="md" name={name} />;

        return (
          <ResourceItem
            id={id}
            media={media}
            accessibilityLabel={\`View details for \${name}\`}
            onClick={() => onItemClick?.(item)}
          >
            <Text variant="bodyMd" fontWeight="bold" as="h3">
              {name}
            </Text>
            <div>{location}</div>
          </ResourceItem>
        );
      }}
    />
  );
}`
  }
};

// Scrollable Examples
export const scrollableExamples = {
  default: {
    react: `import {Scrollable, Text} from '@shopify/polaris';
import React from 'react';

function ScrollableDefault() {
  return (
    <Scrollable shadow style={{height: '200px'}}>
      {Array.from({length: 20}).map((_, i) => (
        <Text key={i} as="p" variant="bodyMd">
          Item {i + 1} - Scroll to see more content
        </Text>
      ))}
    </Scrollable>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  height: 200,
  autoScroll: true,
  items: Array.from({length: 20}).map((_, i) => ({
    xtype: 'component',
    html: '<p>Item ' + (i + 1) + ' - Scroll to see more content</p>'
  }))
});`,
    vanilla: `<div class="polaris-scrollable" style="height: 200px; overflow-y: auto;">
  ${Array.from({length: 20}).map((_, i) => 
    '<p>Item ' + (i + 1) + ' - Scroll to see more content</p>'
  ).join('')}
</div>`,
    typescript: `import {Scrollable, Text} from '@shopify/polaris';
import React from 'react';

interface ScrollableDefaultProps {
  height?: string;
  shadow?: boolean;
  itemCount?: number;
}

function ScrollableDefault({
  height = '200px',
  shadow = true,
  itemCount = 20
}: ScrollableDefaultProps): JSX.Element {
  return (
    <Scrollable shadow={shadow} style={{height}}>
      {Array.from({length: itemCount}).map((_, i) => (
        <Text key={i} as="p" variant="bodyMd">
          Item {i + 1} - Scroll to see more content
        </Text>
      ))}
    </Scrollable>
  );
}`
  }
};

// Skeleton Body Text Examples
export const skeletonBodyTextExamples = {
  default: {
    react: `import {SkeletonBodyText} from '@shopify/polaris';
import React from 'react';

function SkeletonBodyTextDefault() {
  return <SkeletonBodyText lines={3} />;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'component',
    html: [
      '<div class="skeleton-line" style="width: 100%; height: 16px; background: #ddd; margin-bottom: 8px;"></div>',
      '<div class="skeleton-line" style="width: 80%; height: 16px; background: #ddd; margin-bottom: 8px;"></div>',
      '<div class="skeleton-line" style="width: 90%; height: 16px; background: #ddd;"></div>'
    ].join('')
  }]
});`,
    vanilla: `<div class="polaris-skeleton-body-text">
  <div class="polaris-skeleton-line"></div>
  <div class="polaris-skeleton-line" style="width: 80%;"></div>
  <div class="polaris-skeleton-line" style="width: 90%;"></div>
</div>`,
    typescript: `import {SkeletonBodyText} from '@shopify/polaris';
import React from 'react';

interface SkeletonBodyTextDefaultProps {
  lines?: number;
}

function SkeletonBodyTextDefault({
  lines = 3
}: SkeletonBodyTextDefaultProps): JSX.Element {
  return <SkeletonBodyText lines={lines} />;
}`
  }
};

// Text Container Examples
export const textContainerExamples = {
  default: {
    react: `import {TextContainer, Text} from '@shopify/polaris';
import React from 'react';

function TextContainerDefault() {
  return (
    <TextContainer>
      <Text variant="headingMd" as="h2">Heading</Text>
      <p>This is a paragraph of text within a text container. It provides proper spacing between text elements.</p>
      <p>Here's another paragraph with consistent spacing.</p>
    </TextContainer>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  bodyPadding: 10,
  items: [{
    xtype: 'container',
    html: [
      '<h2>Heading</h2>',
      '<p>This is a paragraph of text within a text container. It provides proper spacing between text elements.</p>',
      '<p>Here\\'s another paragraph with consistent spacing.</p>'
    ].join('')
  }]
});`,
    vanilla: `<div class="polaris-text-container">
  <h2>Heading</h2>
  <p>This is a paragraph of text within a text container. It provides proper spacing between text elements.</p>
  <p>Here's another paragraph with consistent spacing.</p>
</div>`,
    typescript: `import {TextContainer, Text} from '@shopify/polaris';
import React from 'react';

interface TextContainerDefaultProps {
  heading?: string;
  paragraphs?: string[];
}

function TextContainerDefault({
  heading = "Heading",
  paragraphs = [
    "This is a paragraph of text within a text container. It provides proper spacing between text elements.",
    "Here's another paragraph with consistent spacing."
  ]
}: TextContainerDefaultProps): JSX.Element {
  return (
    <TextContainer>
      <Text variant="headingMd" as="h2">{heading}</Text>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </TextContainer>
  );
}`
  }
};

// Top Bar Examples
export const topBarExamples = {
  default: {
    react: `import {TopBar, Icon} from '@shopify/polaris';
import {QuestionCircleIcon} from '@shopify/polaris-icons';
import React, {useState, useCallback} from 'react';

function TopBarDefault() {
  const [userMenuActive, setUserMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
  }, []);

  const userMenuMarkup = (
    <TopBar.UserMenu
      name="John Smith"
      detail="Acme Stores"
      initials="JS"
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchField={searchFieldMarkup}
      searchResultsVisible={searchActive}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  items: [{
    xtype: 'button',
    icon: 'menu-icon',
    handler: function() {
      console.log('Toggle navigation');
    }
  }, {
    xtype: 'tbfill'
  }, {
    xtype: 'textfield',
    emptyText: 'Search',
    width: 200
  }, {
    xtype: 'button',
    text: 'JS',
    menu: [{
      text: 'John Smith',
      disabled: true
    }, {
      text: 'Acme Stores',
      disabled: true
    }, '-', {
      text: 'Settings'
    }, {
      text: 'Logout'
    }]
  }]
});`,
    vanilla: `<div class="polaris-top-bar">
  <button class="polaris-top-bar__navigation-toggle">☰</button>
  
  <div class="polaris-top-bar__search">
    <input type="text" placeholder="Search" class="polaris-top-bar__search-field">
  </div>
  
  <div class="polaris-top-bar__user-menu">
    <button class="polaris-top-bar__user-button">JS</button>
    <div class="polaris-top-bar__user-dropdown" style="display: none;">
      <div class="polaris-top-bar__user-info">
        <div>John Smith</div>
        <div>Acme Stores</div>
      </div>
      <div class="polaris-top-bar__user-actions">
        <a href="#">Settings</a>
        <a href="#">Logout</a>
      </div>
    </div>
  </div>
</div>

<script>
const userButton = document.querySelector('.polaris-top-bar__user-button');
const userDropdown = document.querySelector('.polaris-top-bar__user-dropdown');

userButton.addEventListener('click', () => {
  userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
});
</script>`,
    typescript: `import {TopBar, Icon} from '@shopify/polaris';
import {QuestionCircleIcon} from '@shopify/polaris-icons';
import React, {useState, useCallback} from 'react';

interface TopBarDefaultProps {
  userName?: string;
  storeName?: string;
  userInitials?: string;
  onNavigationToggle?: () => void;
  onSearch?: (value: string) => void;
}

function TopBarDefault({
  userName = "John Smith",
  storeName = "Acme Stores",
  userInitials = "JS",
  onNavigationToggle,
  onSearch
}: TopBarDefaultProps): JSX.Element {
  const [userMenuActive, setUserMenuActive] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const toggleUserMenuActive = useCallback(
    () => setUserMenuActive((userMenuActive) => !userMenuActive),
    [],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setSearchActive(value.length > 0);
    onSearch?.(value);
  }, [onSearch]);

  const userMenuMarkup = (
    <TopBar.UserMenu
      name={userName}
      detail={storeName}
      initials={userInitials}
      open={userMenuActive}
      onToggle={toggleUserMenuActive}
    />
  );

  const searchFieldMarkup = (
    <TopBar.SearchField
      onChange={handleSearchChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  return (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      searchField={searchFieldMarkup}
      searchResultsVisible={searchActive}
      onNavigationToggle={onNavigationToggle}
    />
  );
}`
  }
};

// Skeleton Display Text Examples
export const skeletonDisplayTextExamples = {
  default: {
    react: `import {SkeletonDisplayText} from '@shopify/polaris';
import React from 'react';

function SkeletonDisplayTextDefault() {
  return <SkeletonDisplayText size="medium" />;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'component',
    html: '<div class="skeleton-display-text" style="width: 120px; height: 32px; background: #ddd;"></div>'
  }]
});`,
    vanilla: `<div class="polaris-skeleton-display-text polaris-skeleton-display-text--medium"></div>`,
    typescript: `import {SkeletonDisplayText} from '@shopify/polaris';
import React from 'react';

interface SkeletonDisplayTextDefaultProps {
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
}

function SkeletonDisplayTextDefault({
  size = 'medium'
}: SkeletonDisplayTextDefaultProps): JSX.Element {
  return <SkeletonDisplayText size={size} />;
}`
  }
};

// Skeleton Page Examples
export const skeletonPageExamples = {
  default: {
    react: `import {SkeletonPage, Layout, LegacyCard, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';

function SkeletonPageDefault() {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <SkeletonBodyText />
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'container',
    html: '<div class="skeleton-page-header" style="height: 60px; background: #f5f5f5;"></div>'
  }, {
    xtype: 'panel',
    bodyPadding: 20,
    items: [{
      xtype: 'component',
      html: '<div class="skeleton-lines"></div>'
    }]
  }]
});`,
    vanilla: `<div class="polaris-skeleton-page">
  <div class="polaris-skeleton-page__header">
    <div class="polaris-skeleton-page__title"></div>
    <div class="polaris-skeleton-page__primary-action"></div>
  </div>
  <div class="polaris-skeleton-page__content">
    <div class="polaris-card">
      <div class="polaris-skeleton-body-text">
        <div class="polaris-skeleton-line"></div>
        <div class="polaris-skeleton-line"></div>
        <div class="polaris-skeleton-line"></div>
      </div>
    </div>
  </div>
</div>`,
    typescript: `import {SkeletonPage, Layout, LegacyCard, SkeletonBodyText} from '@shopify/polaris';
import React from 'react';

interface SkeletonPageDefaultProps {
  primaryAction?: boolean;
  title?: boolean;
  breadcrumbs?: boolean;
}

function SkeletonPageDefault({
  primaryAction = true,
  title = true,
  breadcrumbs = false
}: SkeletonPageDefaultProps): JSX.Element {
  return (
    <SkeletonPage 
      primaryAction={primaryAction}
      title={title}
      breadcrumbs={breadcrumbs}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard sectioned>
            <SkeletonBodyText />
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}`
  }
};

// Listbox Examples
export const listboxExamples = {
  default: {
    react: `import {Listbox} from '@shopify/polaris';
import React from 'react';

function ListboxDefault() {
  return (
    <Listbox accessibilityLabel="Basic listbox">
      <Listbox.Option value="draft">Draft</Listbox.Option>
      <Listbox.Option value="active">Active</Listbox.Option>
      <Listbox.Option value="archived">Archived</Listbox.Option>
    </Listbox>
  );
}`,
    extjs: `Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Status',
  store: ['Draft', 'Active', 'Archived'],
  queryMode: 'local',
  editable: false
});`,
    vanilla: `<div class="polaris-listbox" role="listbox" aria-label="Basic listbox">
  <button class="polaris-listbox-option" role="option" value="draft">Draft</button>
  <button class="polaris-listbox-option" role="option" value="active">Active</button>
  <button class="polaris-listbox-option" role="option" value="archived">Archived</button>
</div>

<script>
document.querySelectorAll('.polaris-listbox-option').forEach(option => {
  option.addEventListener('click', (e) => {
    // Remove selected state from all options
    document.querySelectorAll('.polaris-listbox-option').forEach(opt => {
      opt.classList.remove('selected');
    });
    // Add selected state to clicked option
    e.target.classList.add('selected');
    console.log('Selected:', e.target.value);
  });
});
</script>`,
    typescript: `import {Listbox} from '@shopify/polaris';
import React, {useState} from 'react';

interface ListboxDefaultProps {
  options?: Array<{value: string; label: string}>;
  onSelect?: (value: string) => void;
}

function ListboxDefault({
  options = [
    {value: 'draft', label: 'Draft'},
    {value: 'active', label: 'Active'},
    {value: 'archived', label: 'Archived'}
  ],
  onSelect
}: ListboxDefaultProps): JSX.Element {
  const [selected, setSelected] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect?.(value);
  };

  return (
    <Listbox 
      accessibilityLabel="Basic listbox"
      onSelect={handleSelect}
    >
      {options.map(option => (
        <Listbox.Option 
          key={option.value}
          value={option.value}
          selected={selected === option.value}
        >
          {option.label}
        </Listbox.Option>
      ))}
    </Listbox>
  );
}`
  }
};

// Description List Examples
export const descriptionListExamples = {
  default: {
    react: `import {DescriptionList} from '@shopify/polaris';
import React from 'react';

function DescriptionListDefault() {
  return (
    <DescriptionList
      items={[
        {
          term: 'Order number',
          description: '1234',
        },
        {
          term: 'Date',
          description: 'November 12, 2023',
        },
        {
          term: 'Payment status',
          description: 'Paid',
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'displayfield',
    fieldLabel: 'Order number',
    value: '1234'
  }, {
    xtype: 'displayfield',
    fieldLabel: 'Date',
    value: 'November 12, 2023'
  }, {
    xtype: 'displayfield',
    fieldLabel: 'Payment status',
    value: 'Paid'
  }]
});`,
    vanilla: `<dl class="polaris-description-list">
  <dt>Order number</dt>
  <dd>1234</dd>
  <dt>Date</dt>
  <dd>November 12, 2023</dd>
  <dt>Payment status</dt>
  <dd>Paid</dd>
</dl>`,
    typescript: `import {DescriptionList} from '@shopify/polaris';
import React from 'react';

interface DescriptionItem {
  term: string;
  description: string | React.ReactNode;
}

interface DescriptionListDefaultProps {
  items?: DescriptionItem[];
}

function DescriptionListDefault({
  items = [
    {
      term: 'Order number',
      description: '1234',
    },
    {
      term: 'Date',
      description: 'November 12, 2023',
    },
    {
      term: 'Payment status',
      description: 'Paid',
    },
  ]
}: DescriptionListDefaultProps): JSX.Element {
  return <DescriptionList items={items} />;
}`
  }
};

// Index Filters Examples (note: different from index-filter)
export const indexFiltersExamples = {
  default: {
    react: `import {IndexFilters, useSetIndexFiltersMode} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function IndexFiltersDefault() {
  const {mode, setMode} = useSetIndexFiltersMode();
  const [queryValue, setQueryValue] = useState('');

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            {label: 'Active', value: 'active'},
            {label: 'Draft', value: 'draft'},
          ]}
          selected={[]}
          onChange={() => {}}
        />
      ),
    },
  ];

  return (
    <IndexFilters
      filters={filters}
      appliedFilters={[]}
      onClearAll={() => {}}
      onQueryChange={setQueryValue}
      onQueryClear={() => setQueryValue('')}
      mode={mode}
      setMode={setMode}
      queryValue={queryValue}
      tabs={[]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  items: [{
    xtype: 'textfield',
    emptyText: 'Search...',
    width: 200
  }, {
    xtype: 'button',
    text: 'Filters',
    menu: [{
      text: 'Status',
      menu: [{
        text: 'Active',
        checkHandler: function(item, checked) {
          console.log('Active:', checked);
        }
      }, {
        text: 'Draft',
        checkHandler: function(item, checked) {
          console.log('Draft:', checked);
        }
      }]
    }]
  }, {
    xtype: 'button',
    text: 'Clear all'
  }]
});`,
    vanilla: `<div class="polaris-index-filters">
  <input type="text" placeholder="Search..." class="polaris-search">
  <button class="polaris-filter-button">Filters</button>
  <button class="polaris-clear-button">Clear all</button>
  
  <div class="polaris-filter-menu" style="display: none;">
    <div class="polaris-filter-group">
      <h3>Status</h3>
      <label><input type="checkbox" value="active"> Active</label>
      <label><input type="checkbox" value="draft"> Draft</label>
    </div>
  </div>
</div>

<script>
const filterButton = document.querySelector('.polaris-filter-button');
const filterMenu = document.querySelector('.polaris-filter-menu');

filterButton.addEventListener('click', () => {
  filterMenu.style.display = filterMenu.style.display === 'none' ? 'block' : 'none';
});
</script>`,
    typescript: `import {IndexFilters, useSetIndexFiltersMode, ChoiceList} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface IndexFiltersDefaultProps {
  onQueryChange?: (value: string) => void;
  onFiltersChange?: (filters: any[]) => void;
}

function IndexFiltersDefault({
  onQueryChange,
  onFiltersChange
}: IndexFiltersDefaultProps): JSX.Element {
  const {mode, setMode} = useSetIndexFiltersMode();
  const [queryValue, setQueryValue] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            {label: 'Active', value: 'active'},
            {label: 'Draft', value: 'draft'},
          ]}
          selected={statusFilter}
          onChange={setStatusFilter}
        />
      ),
    },
  ];

  const handleQueryChange = useCallback((value: string) => {
    setQueryValue(value);
    onQueryChange?.(value);
  }, [onQueryChange]);

  return (
    <IndexFilters
      filters={filters}
      appliedFilters={[]}
      onClearAll={() => {
        setQueryValue('');
        setStatusFilter([]);
      }}
      onQueryChange={handleQueryChange}
      onQueryClear={() => setQueryValue('')}
      mode={mode}
      setMode={setMode}
      queryValue={queryValue}
      tabs={[]}
    />
  );
}`
  }
};

// Legacy Filters Examples
export const legacyFiltersExamples = {
  default: {
    react: `import {LegacyFilters} from '@shopify/polaris';
import {useState} from 'react';

function LegacyFiltersDefault() {
  const [queryValue, setQueryValue] = useState('');

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <select>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      ),
    },
  ];

  return (
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      onQueryChange={setQueryValue}
      onQueryClear={() => setQueryValue('')}
      onClearAll={() => {}}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  layout: 'hbox',
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Search',
    emptyText: 'Filter items...'
  }, {
    xtype: 'combobox',
    fieldLabel: 'Status',
    store: ['All', 'Active', 'Draft'],
    value: 'All'
  }, {
    xtype: 'button',
    text: 'Clear',
    handler: function() {
      this.up('form').reset();
    }
  }]
});`,
    vanilla: `<div class="polaris-legacy-filters">
  <input type="text" placeholder="Filter items..." class="polaris-filter-search">
  <select class="polaris-filter-select">
    <option value="">All</option>
    <option value="active">Active</option>
    <option value="draft">Draft</option>
  </select>
  <button class="polaris-filter-clear">Clear</button>
</div>`,
    typescript: `import {LegacyFilters} from '@shopify/polaris';
import {useState} from 'react';

interface LegacyFiltersDefaultProps {
  onQueryChange?: (value: string) => void;
  onStatusChange?: (status: string) => void;
}

function LegacyFiltersDefault({
  onQueryChange,
  onStatusChange
}: LegacyFiltersDefaultProps): JSX.Element {
  const [queryValue, setQueryValue] = useState<string>('');

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <select onChange={(e) => onStatusChange?.(e.target.value)}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
        </select>
      ),
    },
  ];

  return (
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      onQueryChange={(value) => {
        setQueryValue(value);
        onQueryChange?.(value);
      }}
      onQueryClear={() => setQueryValue('')}
      onClearAll={() => {}}
    />
  );
}`
  }
};

// Legacy Tabs Examples
export const legacyTabsExamples = {
  default: {
    react: `import {LegacyTabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function LegacyTabsDefault() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    {
      id: 'all-customers',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-panel',
    },
    {
      id: 'accepts-marketing',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-panel',
    },
  ];

  return (
    <LegacyTabs tabs={tabs} selected={selected} onSelect={setSelected}>
      <LegacyTabs.Panel id="all-customers-panel">
        All customers content
      </LegacyTabs.Panel>
      <LegacyTabs.Panel id="accepts-marketing-panel">
        Accepts marketing content
      </LegacyTabs.Panel>
    </LegacyTabs>
  );
}`,
    extjs: `Ext.create('Ext.tab.Panel', {
  items: [{
    title: 'All',
    html: 'All customers content'
  }, {
    title: 'Accepts marketing',
    html: 'Accepts marketing content'
  }]
});`,
    vanilla: `<div class="polaris-legacy-tabs">
  <ul class="polaris-legacy-tabs__list">
    <li class="polaris-legacy-tabs__item polaris-legacy-tabs__item--selected" data-panel="all">
      All
    </li>
    <li class="polaris-legacy-tabs__item" data-panel="marketing">
      Accepts marketing
    </li>
  </ul>
  
  <div class="polaris-legacy-tabs__panel" id="all-panel">
    All customers content
  </div>
  <div class="polaris-legacy-tabs__panel" id="marketing-panel" style="display: none;">
    Accepts marketing content
  </div>
</div>

<script>
document.querySelectorAll('.polaris-legacy-tabs__item').forEach(tab => {
  tab.addEventListener('click', () => {
    // Hide all panels and remove selected class
    document.querySelectorAll('.polaris-legacy-tabs__panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.polaris-legacy-tabs__item').forEach(t => t.classList.remove('polaris-legacy-tabs__item--selected'));
    
    // Show selected panel and add selected class
    tab.classList.add('polaris-legacy-tabs__item--selected');
    document.getElementById(tab.dataset.panel + '-panel').style.display = 'block';
  });
});
</script>`,
    typescript: `import {LegacyTabs} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface Tab {
  id: string;
  content: string;
  accessibilityLabel?: string;
  panelID: string;
}

interface LegacyTabsDefaultProps {
  tabs?: Tab[];
  initialSelected?: number;
  onTabChange?: (index: number) => void;
}

function LegacyTabsDefault({
  tabs = [
    {
      id: 'all-customers',
      content: 'All',
      accessibilityLabel: 'All customers',
      panelID: 'all-customers-panel',
    },
    {
      id: 'accepts-marketing',
      content: 'Accepts marketing',
      panelID: 'accepts-marketing-panel',
    },
  ],
  initialSelected = 0,
  onTabChange
}: LegacyTabsDefaultProps): JSX.Element {
  const [selected, setSelected] = useState<number>(initialSelected);

  const handleTabChange = useCallback((index: number) => {
    setSelected(index);
    onTabChange?.(index);
  }, [onTabChange]);

  return (
    <LegacyTabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      <LegacyTabs.Panel id="all-customers-panel">
        All customers content
      </LegacyTabs.Panel>
      <LegacyTabs.Panel id="accepts-marketing-panel">
        Accepts marketing content
      </LegacyTabs.Panel>
    </LegacyTabs>
  );
}`
  }
};

// Page Actions Examples
export const pageActionsExamples = {
  default: {
    react: `import {PageActions} from '@shopify/polaris';
import React from 'react';

function PageActionsDefault() {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        disabled: false,
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  items: ['->', {
    xtype: 'button',
    text: 'Delete',
    ui: 'destructive'
  }, {
    xtype: 'button',
    text: 'Save',
    ui: 'primary'
  }]
});`,
    vanilla: `<div class="polaris-page-actions">
  <button class="polaris-button polaris-button--destructive">Delete</button>
  <button class="polaris-button polaris-button--primary">Save</button>
</div>`,
    typescript: `import {PageActions} from '@shopify/polaris';
import React from 'react';

interface PageActionsDefaultProps {
  onSave?: () => void;
  onDelete?: () => void;
  saveDisabled?: boolean;
}

function PageActionsDefault({
  onSave,
  onDelete,
  saveDisabled = false
}: PageActionsDefaultProps): JSX.Element {
  return (
    <PageActions
      primaryAction={{
        content: 'Save',
        disabled: saveDisabled,
        onAction: onSave,
      }}
      secondaryActions={[
        {
          content: 'Delete',
          destructive: true,
          onAction: onDelete,
        },
      ]}
    />
  );
}`
  }
};

// Skeleton Tabs Examples
export const skeletonTabsExamples = {
  default: {
    react: `import {SkeletonTabs} from '@shopify/polaris';
import React from 'react';

function SkeletonTabsDefault() {
  return <SkeletonTabs count={2} />;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  html: '<div class="skeleton-tabs"><div class="skeleton-tab"></div><div class="skeleton-tab"></div></div>'
});`,
    vanilla: `<div class="polaris-skeleton-tabs">
  <div class="polaris-skeleton-tab"></div>
  <div class="polaris-skeleton-tab"></div>
</div>`,
    typescript: `import {SkeletonTabs} from '@shopify/polaris';
import React from 'react';

interface SkeletonTabsDefaultProps {
  count?: number;
}

function SkeletonTabsDefault({
  count = 2
}: SkeletonTabsDefaultProps): JSX.Element {
  return <SkeletonTabs count={count} />;
}`
  }
};

// Skeleton Thumbnail Examples
export const skeletonThumbnailExamples = {
  default: {
    react: `import {SkeletonThumbnail} from '@shopify/polaris';
import React from 'react';

function SkeletonThumbnailDefault() {
  return <SkeletonThumbnail size="medium" />;
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  html: '<div class="skeleton-thumbnail" style="width: 60px; height: 60px; background: #ddd;"></div>'
});`,
    vanilla: `<div class="polaris-skeleton-thumbnail polaris-skeleton-thumbnail--medium"></div>`,
    typescript: `import {SkeletonThumbnail} from '@shopify/polaris';
import React from 'react';

interface SkeletonThumbnailDefaultProps {
  size?: 'small' | 'medium' | 'large';
}

function SkeletonThumbnailDefault({
  size = 'medium'
}: SkeletonThumbnailDefaultProps): JSX.Element {
  return <SkeletonThumbnail size={size} />;
}`
  }
};

// Exception List Examples
export const exceptionListExamples = {
  default: {
    react: `import {ExceptionList} from '@shopify/polaris';
import React from 'react';

function ExceptionListDefault() {
  return (
    <ExceptionList
      items={[
        {
          icon: 'CircleAlertIcon',
          description: 'This customer has a suspended account',
        },
        {
          icon: 'CircleInformationIcon',
          description: 'This customer is tax-exempt',
        },
      ]}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  items: [{
    xtype: 'container',
    html: '<div class="exception-item"><span>⚠️</span> This customer has a suspended account</div>'
  }, {
    xtype: 'container',
    html: '<div class="exception-item"><span>ℹ️</span> This customer is tax-exempt</div>'
  }]
});`,
    vanilla: `<ul class="polaris-exception-list">
  <li class="polaris-exception-list__item">
    <span class="polaris-exception-list__icon">⚠️</span>
    <span>This customer has a suspended account</span>
  </li>
  <li class="polaris-exception-list__item">
    <span class="polaris-exception-list__icon">ℹ️</span>
    <span>This customer is tax-exempt</span>
  </li>
</ul>`,
    typescript: `import {ExceptionList} from '@shopify/polaris';
import React from 'react';

interface ExceptionItem {
  icon: string;
  description: string;
}

interface ExceptionListDefaultProps {
  items?: ExceptionItem[];
}

function ExceptionListDefault({
  items = [
    {
      icon: 'CircleAlertIcon',
      description: 'This customer has a suspended account',
    },
    {
      icon: 'CircleInformationIcon',
      description: 'This customer is tax-exempt',
    },
  ]
}: ExceptionListDefaultProps): JSX.Element {
  return <ExceptionList items={items} />;
}`
  }
};

// Deprecated Card Examples
export const deprecatedCardExamples = {
  default: {
    react: `import {Card} from '@shopify/polaris';
import React from 'react';

function DeprecatedCardDefault() {
  return (
    <Card title="Deprecated Card" sectioned>
      <p>This is a deprecated card component. Use LegacyCard instead.</p>
    </Card>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Deprecated Card',
  bodyPadding: 20,
  html: '<p>This is a deprecated card component. Use LegacyCard instead.</p>'
});`,
    vanilla: `<div class="polaris-card polaris-card--deprecated">
  <div class="polaris-card__header">
    <h2 class="polaris-card__title">Deprecated Card</h2>
  </div>
  <div class="polaris-card__section">
    <p>This is a deprecated card component. Use LegacyCard instead.</p>
  </div>
</div>`,
    typescript: `import {Card} from '@shopify/polaris';
import React from 'react';

interface DeprecatedCardDefaultProps {
  title?: string;
  children?: React.ReactNode;
}

function DeprecatedCardDefault({
  title = "Deprecated Card",
  children = <p>This is a deprecated card component. Use LegacyCard instead.</p>
}: DeprecatedCardDefaultProps): JSX.Element {
  return (
    <Card title={title} sectioned>
      {children}
    </Card>
  );
}`
  }
};

// Radio Button Examples
export const radioButtonExamples = {
  default: {
    react: `import {LegacyStack, RadioButton} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function RadioButtonDefault() {
  const [value, setValue] = useState('disabled');

  const handleChange = useCallback(
    (_: boolean, newValue: string) => setValue(newValue),
    [],
  );

  return (
    <LegacyStack vertical>
      <RadioButton
        label="Accounts are disabled"
        helpText="Customers will only be able to check out as guests."
        checked={value === 'disabled'}
        id="disabled"
        name="accounts"
        onChange={handleChange}
      />
      <RadioButton
        label="Accounts are optional"
        helpText="Customers will be able to check out with a customer account or as a guest."
        id="optional"
        name="accounts"
        checked={value === 'optional'}
        onChange={handleChange}
      />
    </LegacyStack>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Account Settings',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'radiogroup',
    fieldLabel: 'Customer Accounts',
    columns: 1,
    items: [{
      boxLabel: 'Accounts are disabled',
      name: 'accounts',
      inputValue: 'disabled',
      checked: true
    }, {
      boxLabel: 'Accounts are optional',
      name: 'accounts',
      inputValue: 'optional'
    }],
    listeners: {
      change: function(radiogroup, newValue) {
        console.log('Selected account type:', newValue.accounts);
        var helpText = newValue.accounts === 'disabled' 
          ? 'Customers will only be able to check out as guests.'
          : 'Customers will be able to check out with a customer account or as a guest.';
        console.log('Help text:', helpText);
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-radio-group">
  <fieldset class="polaris-radio-group__fieldset">
    <legend class="polaris-radio-group__legend">Customer Accounts</legend>
    
    <div class="polaris-radio-group__choices">
      <label class="polaris-radio">
        <input 
          type="radio" 
          class="polaris-radio__input" 
          name="accounts" 
          value="disabled"
          checked>
        <span class="polaris-radio__control"></span>
        <span class="polaris-radio__label">
          Accounts are disabled
          <div class="polaris-radio__help-text">
            Customers will only be able to check out as guests.
          </div>
        </span>
      </label>
      
      <label class="polaris-radio">
        <input 
          type="radio" 
          class="polaris-radio__input" 
          name="accounts" 
          value="optional">
        <span class="polaris-radio__control"></span>
        <span class="polaris-radio__label">
          Accounts are optional
          <div class="polaris-radio__help-text">
            Customers will be able to check out with a customer account or as a guest.
          </div>
        </span>
      </label>
    </div>
  </fieldset>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('input[name="accounts"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    console.log('Selected account type:', e.target.value);
  });
});
</script>`,
    typescript: `import {LegacyStack, RadioButton} from '@shopify/polaris';
import {useState, useCallback} from 'react';

type AccountType = 'disabled' | 'optional';

interface RadioButtonOption {
  value: AccountType;
  label: string;
  helpText: string;
}

interface RadioButtonDefaultProps {
  initialValue?: AccountType;
  options?: RadioButtonOption[];
  onChange?: (value: AccountType) => void;
}

function RadioButtonDefault({
  initialValue = 'disabled',
  options = [
    {
      value: 'disabled',
      label: 'Accounts are disabled',
      helpText: 'Customers will only be able to check out as guests.'
    },
    {
      value: 'optional',
      label: 'Accounts are optional',
      helpText: 'Customers will be able to check out with a customer account or as a guest.'
    }
  ],
  onChange
}: RadioButtonDefaultProps): JSX.Element {
  const [value, setValue] = useState<AccountType>(initialValue);

  const handleChange = useCallback(
    (_: boolean, newValue: string) => {
      const accountType = newValue as AccountType;
      setValue(accountType);
      onChange?.(accountType);
    },
    [onChange],
  );

  return (
    <LegacyStack vertical>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          helpText={option.helpText}
          checked={value === option.value}
          id={option.value}
          name="accounts"
          onChange={handleChange}
        />
      ))}
    </LegacyStack>
  );
}`
  }
};


// Progress Bar Examples
export const progressBarExamples = {
  default: {
    react: `import {ProgressBar} from '@shopify/polaris';
import React from 'react';

function ProgressBarDefault() {
  return <ProgressBar progress={75} />;
}`,
    extjs: `Ext.create('Ext.ProgressBar', {
  value: 0.75,
  text: '75% completed',
  width: 300,
  renderTo: Ext.getBody()
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-progress-bar">
  <div class="polaris-progress-bar__track">
    <div class="polaris-progress-bar__fill" style="width: 75%"></div>
  </div>
</div>

<script>
// JavaScript behavior for updating progress
function updateProgress(percentage) {
  const fill = document.querySelector('.polaris-progress-bar__fill');
  fill.style.width = percentage + '%';
  console.log('Progress updated to:', percentage + '%');
}

// Example usage
updateProgress(75);
</script>`,
    typescript: `import {ProgressBar} from '@shopify/polaris';
import React from 'react';

interface ProgressBarDefaultProps {
  progress?: number;
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning' | 'critical';
}

function ProgressBarDefault({
  progress = 75,
  size = 'medium',
  color = 'primary'
}: ProgressBarDefaultProps): JSX.Element {
  return (
    <ProgressBar 
      progress={progress} 
      size={size}
      color={color}
    />
  );
}`
  }
};

// Option List Examples
export const optionListExamples = {
  default: {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function OptionListDefault() {
  const [selected, setSelected] = useState([]);

  const options = [
    {value: 'byward_market', label: 'Byward Market'},
    {value: 'centretown', label: 'Centretown'},
    {value: 'hintonburg', label: 'Hintonburg'},
    {value: 'westboro', label: 'Westboro'},
    {value: 'downtown', label: 'Downtown'},
  ];

  return (
    <OptionList
      title="Inventory Location"
      onChange={setSelected}
      options={options}
      selected={selected}
      allowMultiple
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Inventory Location',
  columns: 1,
  items: [{
    boxLabel: 'Byward Market',
    name: 'location',
    inputValue: 'byward_market'
  }, {
    boxLabel: 'Centretown',
    name: 'location',
    inputValue: 'centretown'
  }, {
    boxLabel: 'Hintonburg',
    name: 'location',
    inputValue: 'hintonburg'
  }, {
    boxLabel: 'Westboro',
    name: 'location',
    inputValue: 'westboro'
  }, {
    boxLabel: 'Downtown',
    name: 'location',
    inputValue: 'downtown'
  }],
  listeners: {
    change: function(checkboxgroup, newValue) {
      console.log('Selected locations:', newValue.location);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-option-list">
  <h3 class="polaris-option-list__title">Inventory Location</h3>
  <ul class="polaris-option-list__options">
    <li class="polaris-option-list__option">
      <label class="polaris-option-list__label">
        <input type="checkbox" class="polaris-option-list__checkbox" value="byward_market">
        <span class="polaris-option-list__text">Byward Market</span>
      </label>
    </li>
    <li class="polaris-option-list__option">
      <label class="polaris-option-list__label">
        <input type="checkbox" class="polaris-option-list__checkbox" value="centretown">
        <span class="polaris-option-list__text">Centretown</span>
      </label>
    </li>
    <li class="polaris-option-list__option">
      <label class="polaris-option-list__label">
        <input type="checkbox" class="polaris-option-list__checkbox" value="hintonburg">
        <span class="polaris-option-list__text">Hintonburg</span>
      </label>
    </li>
    <li class="polaris-option-list__option">
      <label class="polaris-option-list__label">
        <input type="checkbox" class="polaris-option-list__checkbox" value="westboro">
        <span class="polaris-option-list__text">Westboro</span>
      </label>
    </li>
    <li class="polaris-option-list__option">
      <label class="polaris-option-list__label">
        <input type="checkbox" class="polaris-option-list__checkbox" value="downtown">
        <span class="polaris-option-list__text">Downtown</span>
      </label>
    </li>
  </ul>
</div>

<script>
// JavaScript behavior
document.querySelectorAll('.polaris-option-list__checkbox').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const selected = Array.from(document.querySelectorAll('.polaris-option-list__checkbox:checked'))
      .map(input => input.value);
    console.log('Selected locations:', selected);
  });
});
</script>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

interface Option {
  value: string;
  label: string;
}

interface OptionListDefaultProps {
  title?: string;
  options?: Option[];
  allowMultiple?: boolean;
  onChange?: (selected: string[]) => void;
}

function OptionListDefault({
  title = "Inventory Location",
  options = [
    {value: 'byward_market', label: 'Byward Market'},
    {value: 'centretown', label: 'Centretown'},
    {value: 'hintonburg', label: 'Hintonburg'},
    {value: 'westboro', label: 'Westboro'},
    {value: 'downtown', label: 'Downtown'},
  ],
  allowMultiple = true,
  onChange
}: OptionListDefaultProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (newSelected: string[]) => {
    setSelected(newSelected);
    onChange?.(newSelected);
  };

  return (
    <OptionList
      title={title}
      onChange={handleChange}
      options={options}
      selected={selected}
      allowMultiple={allowMultiple}
    />
  );
}`
  }
};

// Color Picker Examples
export const colorPickerExamples = {
  default: {
    react: `import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';

function ColorPickerDefault() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 1,
    saturation: 1,
  });

  return (
    <ColorPicker onChange={setColor} color={color} />
  );
}`,
    extjs: `Ext.create('Ext.picker.Color', {
  value: '008000',
  listeners: {
    select: function(picker, selColor) {
      console.log('Color selected:', '#' + selColor);
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-color-picker">
  <input type="color" id="color-input" class="polaris-color-picker__input" value="#008000">
  <div class="polaris-color-picker__display">
    <div class="polaris-color-picker__swatch" id="color-swatch"></div>
    <span class="polaris-color-picker__value" id="color-value">#008000</span>
  </div>
</div>

<script>
// JavaScript behavior
const colorInput = document.getElementById('color-input');
const colorSwatch = document.getElementById('color-swatch');
const colorValue = document.getElementById('color-value');

function updateColor(hex) {
  colorSwatch.style.backgroundColor = hex;
  colorValue.textContent = hex;
}

colorInput.addEventListener('input', (e) => {
  updateColor(e.target.value);
  console.log('Color changed to:', e.target.value);
});

// Initialize
updateColor('#008000');
</script>`,
    typescript: `import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';

interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
}

interface ColorPickerDefaultProps {
  initialColor?: HSBColor;
  onChange?: (color: HSBColor) => void;
}

function ColorPickerDefault({
  initialColor = {
    hue: 120,
    brightness: 1,
    saturation: 1,
  },
  onChange
}: ColorPickerDefaultProps): JSX.Element {
  const [color, setColor] = useState<HSBColor>(initialColor);

  const handleChange = (newColor: HSBColor) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <ColorPicker onChange={handleChange} color={color} />
  );
}`
  }
};

// Date Picker Examples
export const datePickerExamples = {
  default: {
    react: `import {DatePicker} from '@shopify/polaris';
import {useState} from 'react';

function DatePickerDefault() {
  const [{month, year}, setDate] = useState({month: 1, year: 2018});
  const [selectedDates, setSelectedDates] = useState({
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)'),
  });

  const handleMonthChange = (month, year) => setDate({month, year});

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.field.Date', {
  fieldLabel: 'Select Date',
  value: new Date(),
  format: 'Y-m-d',
  listeners: {
    select: function(datefield, date) {
      console.log('Date selected:', Ext.Date.format(date, 'Y-m-d'));
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-date-picker">
  <input type="date" id="date-input" class="polaris-date-picker__input" value="2018-02-07">
  <div class="polaris-date-picker__display" id="selected-date">
    Selected: February 7, 2018
  </div>
</div>

<script>
// JavaScript behavior
const dateInput = document.getElementById('date-input');
const dateDisplay = document.getElementById('selected-date');

dateInput.addEventListener('change', (e) => {
  const date = new Date(e.target.value);
  const formatted = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  dateDisplay.textContent = 'Selected: ' + formatted;
  console.log('Date selected:', e.target.value);
});
</script>`,
    typescript: `import {DatePicker} from '@shopify/polaris';
import {useState} from 'react';

interface DateRange {
  start: Date;
  end: Date;
}

interface DatePickerDefaultProps {
  initialMonth?: number;
  initialYear?: number;
  initialSelected?: DateRange;
  onChange?: (selected: DateRange) => void;
}

function DatePickerDefault({
  initialMonth = 1,
  initialYear = 2018,
  initialSelected = {
    start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
    end: new Date('Mon Feb 12 2018 00:00:00 GMT-0500 (EST)'),
  },
  onChange
}: DatePickerDefaultProps): JSX.Element {
  const [{month, year}, setDate] = useState({month: initialMonth, year: initialYear});
  const [selectedDates, setSelectedDates] = useState<DateRange>(initialSelected);

  const handleMonthChange = (month: number, year: number) => setDate({month, year});
  
  const handleChange = (selected: DateRange) => {
    setSelectedDates(selected);
    onChange?.(selected);
  };

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={handleChange}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
    />
  );
}`
  }
};

// Drop Zone Examples
export const dropZoneExamples = {
  default: {
    react: `import {DropZone, LegacyStack, Thumbnail, Text} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

function DropZoneDefault() {
  const [files, setFiles] = useState([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles, acceptedFiles, _rejectedFiles) =>
      setFiles((files) => [...files, ...acceptedFiles]),
    [],
  );

  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}`,
    extjs: `Ext.create('Ext.form.Panel', {
  title: 'File Upload',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'filefield',
    name: 'uploadFile',
    fieldLabel: 'Upload File',
    labelWidth: 100,
    msgTarget: 'side',
    allowBlank: false,
    anchor: '100%',
    buttonText: 'Select File...'
  }],
  buttons: [{
    text: 'Upload',
    handler: function() {
      var form = this.up('form').getForm();
      if(form.isValid()){
        form.submit({
          url: '/upload',
          waitMsg: 'Uploading your file...',
          success: function(fp, o) {
            console.log('File uploaded successfully');
          }
        });
      }
    }
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-drop-zone" id="drop-zone">
  <div class="polaris-drop-zone__content">
    <input type="file" id="file-input" multiple style="display: none;">
    <div class="polaris-drop-zone__text">
      <p>Drop files here or <button type="button" id="browse-button">browse</button></p>
    </div>
  </div>
  <div class="polaris-drop-zone__files" id="file-list"></div>
</div>

<script>
// JavaScript behavior
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const browseButton = document.getElementById('browse-button');
const fileList = document.getElementById('file-list');

browseButton.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('polaris-drop-zone--hovered');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('polaris-drop-zone--hovered');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('polaris-drop-zone--hovered');
  handleFiles(e.dataTransfer.files);
});

function handleFiles(files) {
  Array.from(files).forEach(file => {
    const fileItem = document.createElement('div');
    fileItem.className = 'polaris-file-item';
    fileItem.innerHTML = file.name + ' (' + file.size + ' bytes)';
    fileList.appendChild(fileItem);
  });
  console.log('Files uploaded:', files.length);
}
</script>`,
    typescript: `import {DropZone, LegacyStack, Thumbnail, Text} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';
import {useState, useCallback} from 'react';

interface DropZoneDefaultProps {
  onFilesUploaded?: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
}

function DropZoneDefault({
  onFilesUploaded,
  acceptedFileTypes = ['image/gif', 'image/jpeg', 'image/png'],
  maxFiles = 10
}: DropZoneDefaultProps): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);

  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onFilesUploaded?.(newFiles);
    },
    [files, maxFiles, onFilesUploaded],
  );

  const validImageTypes = acceptedFileTypes;

  const fileUpload = !files.length && <DropZone.FileUpload />;
  const uploadedFiles = files.length > 0 && (
    <LegacyStack vertical>
      {files.map((file, index) => (
        <LegacyStack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={
              validImageTypes.includes(file.type)
                ? window.URL.createObjectURL(file)
                : NoteIcon
            }
          />
          <div>
            {file.name}{' '}
            <Text variant="bodySm" as="p">
              {file.size} bytes
            </Text>
          </div>
        </LegacyStack>
      ))}
    </LegacyStack>
  );

  return (
    <DropZone onDrop={handleDropZoneDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}`
  }
};

// Setting Toggle Examples
export const settingToggleExamples = {
  default: {
    react: `import {SettingToggle, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function SettingToggleDefault() {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = useCallback(() => setEnabled((enabled) => !enabled), []);

  const contentStatus = enabled ? 'Disable' : 'Enable';
  const textStatus = enabled ? 'enabled' : 'disabled';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={enabled}
    >
      This setting is{' '}
      <Text as="span" fontWeight="bold">
        {textStatus}
      </Text>
    </SettingToggle>
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Setting Toggle',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [{
      xtype: 'component',
      html: 'This setting is <strong>disabled</strong>',
      flex: 1
    }, {
      xtype: 'button',
      text: 'Enable',
      handler: function() {
        var button = this;
        var label = button.prev();
        if (button.getText() === 'Enable') {
          button.setText('Disable');
          label.update('This setting is <strong>enabled</strong>');
        } else {
          button.setText('Enable');
          label.update('This setting is <strong>disabled</strong>');
        }
      }
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-setting-toggle">
  <div class="polaris-setting-toggle__content">
    <span id="setting-status">This setting is <strong>disabled</strong></span>
  </div>
  <div class="polaris-setting-toggle__action">
    <button class="polaris-button" id="toggle-button">Enable</button>
  </div>
</div>

<script>
// JavaScript behavior
const toggleButton = document.getElementById('toggle-button');
const statusText = document.getElementById('setting-status');
let isEnabled = false;

toggleButton.addEventListener('click', () => {
  isEnabled = !isEnabled;
  
  if (isEnabled) {
    toggleButton.textContent = 'Disable';
    statusText.innerHTML = 'This setting is <strong>enabled</strong>';
  } else {
    toggleButton.textContent = 'Enable';
    statusText.innerHTML = 'This setting is <strong>disabled</strong>';
  }
  
  console.log('Setting toggled:', isEnabled ? 'enabled' : 'disabled');
});
</script>`,
    typescript: `import {SettingToggle, Text} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface SettingToggleDefaultProps {
  initialEnabled?: boolean;
  onToggle?: (enabled: boolean) => void;
  children?: React.ReactNode;
}

function SettingToggleDefault({
  initialEnabled = false,
  onToggle,
  children
}: SettingToggleDefaultProps): JSX.Element {
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);

  const handleToggle = useCallback(() => {
    const newState = !enabled;
    setEnabled(newState);
    onToggle?.(newState);
  }, [enabled, onToggle]);

  const contentStatus = enabled ? 'Disable' : 'Enable';
  const textStatus = enabled ? 'enabled' : 'disabled';

  return (
    <SettingToggle
      action={{
        content: contentStatus,
        onAction: handleToggle,
      }}
      enabled={enabled}
    >
      {children || (
        <>
          This setting is{' '}
          <Text as="span" fontWeight="bold">
            {textStatus}
          </Text>
        </>
      )}
    </SettingToggle>
  );
}`
  }
};

// Thumbnail Examples
export const thumbnailExamples = {
  default: {
    react: `import {Thumbnail} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';

function ThumbnailDefault() {
  return (
    <Thumbnail
      source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
      alt="Black leather choker necklace"
    />
  );
}`,
    extjs: `Ext.create('Ext.Img', {
  src: 'https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg',
  alt: 'Black leather choker necklace',
  width: 50,
  height: 50,
  style: {
    borderRadius: '4px'
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-thumbnail">
  <img 
    class="polaris-thumbnail__image" 
    src="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg" 
    alt="Black leather choker necklace">
</div>

<script>
// JavaScript behavior for error handling
document.querySelector('.polaris-thumbnail__image').addEventListener('error', (e) => {
  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjZGNkY3Ii8+CjxwYXRoIGQ9Ik0xMiAxNkwyMCAyNEwyOCAxNiIgc3Ryb2tlPSIjOUM5Q0E2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
  console.log('Thumbnail failed to load, using fallback');
});
</script>`,
    typescript: `import {Thumbnail} from '@shopify/polaris';
import {NoteIcon} from '@shopify/polaris-icons';

interface ThumbnailDefaultProps {
  source?: string;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
}

function ThumbnailDefault({
  source = "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg",
  alt = "Black leather choker necklace",
  size = "medium"
}: ThumbnailDefaultProps): JSX.Element {
  return (
    <Thumbnail
      source={source}
      alt={alt}
      size={size}
    />
  );
}`
  }
};

// Video Thumbnail Examples
export const videoThumbnailExamples = {
  default: {
    react: `import {VideoThumbnail} from '@shopify/polaris';

function VideoThumbnailDefault() {
  return (
    <VideoThumbnail
      videoLength={80}
      thumbnailUrl="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg"
      onClick={() => console.log('Video clicked')}
    />
  );
}`,
    extjs: `Ext.create('Ext.Component', {
  html: '<div class="video-thumbnail" style="position: relative; display: inline-block;"><img src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg" style="width: 160px; height: 90px; border-radius: 4px;"><div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); color: white; padding: 2px 6px; border-radius: 2px; font-size: 12px;">1:20</div><div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(0,0,0,0.6); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: white; cursor: pointer;">▶</div></div>',
  listeners: {
    afterrender: function(cmp) {
      cmp.getEl().on('click', function() {
        console.log('Video clicked');
      });
    }
  }
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-video-thumbnail" onclick="playVideo()">
  <img 
    class="polaris-video-thumbnail__image" 
    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg" 
    alt="Video thumbnail">
  <div class="polaris-video-thumbnail__play-button">▶</div>
  <div class="polaris-video-thumbnail__duration">1:20</div>
</div>

<script>
// JavaScript behavior
function playVideo() {
  console.log('Video clicked - would play video');
  // In a real implementation, this would trigger video playback
}

// Format video duration
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}

// Example: Update duration display
document.querySelector('.polaris-video-thumbnail__duration').textContent = formatDuration(80);
</script>`,
    typescript: `import {VideoThumbnail} from '@shopify/polaris';

interface VideoThumbnailDefaultProps {
  videoLength?: number;
  thumbnailUrl?: string;
  onClick?: () => void;
}

function VideoThumbnailDefault({
  videoLength = 80,
  thumbnailUrl = "https://burst.shopifycdn.com/photos/business-woman-smiling-in-office_373x@2x.jpg",
  onClick
}: VideoThumbnailDefaultProps): JSX.Element {
  const handleClick = () => {
    console.log('Video clicked');
    onClick?.();
  };

  return (
    <VideoThumbnail
      videoLength={videoLength}
      thumbnailUrl={thumbnailUrl}
      onClick={handleClick}
    />
  );
}`
  }
};

// Account Connection Examples
export const accountConnectionExamples = {
  default: {
    react: `import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function AccountConnectionDefault() {
  const [connected, setConnected] = useState(false);
  const accountName = connected ? 'john.smith@merchantstore.com' : '';

  const handleAction = useCallback(() => {
    setConnected((connected) => !connected);
  }, []);

  const buttonText = connected ? 'Disconnect' : 'Connect';
  const details = connected ? 'Account connected' : 'No account connected';
  const terms = connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Merchant Hub's{' '}
      <Link url="https://merchanthub.com/terms">terms and conditions</Link>. You'll pay a
      commission rate of 2.9% on sales made through Merchant Hub.
    </p>
  );

  return (
    <AccountConnection
      accountName={accountName}
      connected={connected}
      title="Merchant Hub"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
  );
}`,
    extjs: `Ext.create('Ext.panel.Panel', {
  title: 'Account Connection',
  bodyPadding: 20,
  width: 400,
  items: [{
    xtype: 'container',
    layout: 'vbox',
    items: [{
      xtype: 'label',
      text: 'Merchant Hub',
      style: 'font-weight: bold; font-size: 16px; margin-bottom: 10px;'
    }, {
      xtype: 'label',
      itemId: 'statusLabel',
      text: 'No account connected',
      style: 'color: #666; margin-bottom: 15px;'
    }, {
      xtype: 'button',
      itemId: 'actionButton',
      text: 'Connect',
      ui: 'primary',
      handler: function() {
        var panel = this.up('panel');
        var statusLabel = panel.down('#statusLabel');
        var isConnected = this.getText() === 'Disconnect';
        
        if (isConnected) {
          this.setText('Connect');
          statusLabel.setText('No account connected');
        } else {
          this.setText('Disconnect');
          statusLabel.setText('Account connected (john.smith@merchantstore.com)');
        }
      }
    }, {
      xtype: 'label',
      itemId: 'termsLabel',
      text: 'By clicking Connect, you agree to accept Merchant Hub\\'s terms and conditions. You\\'ll pay a commission rate of 2.9% on sales made through Merchant Hub.',
      style: 'color: #666; font-size: 12px; margin-top: 15px; line-height: 1.4;'
    }]
  }]
});`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-account-connection">
  <div class="polaris-account-connection__content">
    <h3 class="polaris-account-connection__title">Merchant Hub</h3>
    <p class="polaris-account-connection__details" id="connection-status">No account connected</p>
  </div>
  <div class="polaris-account-connection__actions">
    <button class="polaris-button polaris-button--primary" id="connection-button">Connect</button>
  </div>
  <div class="polaris-account-connection__terms" id="terms-section">
    <p>By clicking <strong>Connect</strong>, you agree to accept Merchant Hub's 
    <a href="https://merchanthub.com/terms">terms and conditions</a>. 
    You'll pay a commission rate of 2.9% on sales made through Merchant Hub.</p>
  </div>
</div>

<script>
// JavaScript behavior
let isConnected = false;
const button = document.getElementById('connection-button');
const status = document.getElementById('connection-status');
const terms = document.getElementById('terms-section');

button.addEventListener('click', () => {
  isConnected = !isConnected;
  
  if (isConnected) {
    button.textContent = 'Disconnect';
    status.textContent = 'Account connected';
    terms.style.display = 'none';
  } else {
    button.textContent = 'Connect';
    status.textContent = 'No account connected';
    terms.style.display = 'block';
  }
});
</script>`,
    typescript: `import {Link, AccountConnection} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface AccountConnectionDefaultProps {
  onConnect?: (connected: boolean) => void;
  initialConnected?: boolean;
}

interface ConnectionState {
  connected: boolean;
  accountName: string;
}

function AccountConnectionDefault({ 
  onConnect,
  initialConnected = false 
}: AccountConnectionDefaultProps): JSX.Element {
  const [state, setState] = useState<ConnectionState>({
    connected: initialConnected,
    accountName: initialConnected ? 'john.smith@merchantstore.com' : ''
  });

  const handleAction = useCallback(() => {
    setState(prevState => {
      const newConnected = !prevState.connected;
      const newState = {
        connected: newConnected,
        accountName: newConnected ? 'john.smith@merchantstore.com' : ''
      };
      
      onConnect?.(newConnected);
      return newState;
    });
  }, [onConnect]);

  const buttonText: string = state.connected ? 'Disconnect' : 'Connect';
  const details: string = state.connected ? 'Account connected' : 'No account connected';
  const terms: JSX.Element | null = state.connected ? null : (
    <p>
      By clicking <strong>Connect</strong>, you agree to accept Merchant Hub's{' '}
      <Link url="https://merchanthub.com/terms">terms and conditions</Link>. You'll pay a
      commission rate of 2.9% on sales made through Merchant Hub.
    </p>
  );

  return (
    <AccountConnection
      accountName={state.accountName}
      connected={state.connected}
      title="Merchant Hub"
      action={{
        content: buttonText,
        onAction: handleAction,
      }}
      details={details}
      termsOfService={terms}
    />
  );
}`
  }
};

const componentExamples: Record<string, any> = {
  'account-connection': accountConnectionExamples,
  'action-list': actionListExamples,
  'app-provider': appProviderExamples,
  'autocomplete': autocompleteExamples,
  'choice-list': choiceListExamples,
  'collapsible': collapsibleExamples,
  'color-picker': colorPickerExamples,
  'combobox': comboboxExamples,
  'contextual-save-bar': contextualSaveBarExamples,
  'data-table': dataTableExamples,
  'date-picker': datePickerExamples,
  'deprecated-card': deprecatedCardExamples,
  'description-list': descriptionListExamples,
  'drop-zone': dropZoneExamples,
  'exception-list': exceptionListExamples,
  'filters': filtersExamples,
  'footer-help': footerHelpExamples,
  'form': formExamples,
  'frame': frameExamples,
  'fullscreen-bar': fullscreenBarExamples,
  'index-filter': indexFilterExamples,
  'index-filters': indexFiltersExamples,
  'index-table': indexTableExamples,
  'inline-error': inlineErrorExamples,
  'inline-grid': inlineGridExamples,
  'keyboard-key': keyboardKeyExamples,
  'legacy-card': legacyCardExamples,
  'legacy-filters': legacyFiltersExamples,
  'legacy-tabs': legacyTabsExamples,
  'link': linkExamples,
  'listbox': listboxExamples,
  'loading': loadingExamples,
  'navigation': navigationExamples,
  'option-list': optionListExamples,
  'page-actions': pageActionsExamples,
  'pagination': paginationExamples,
  'popover': popoverExamples,
  'progress-bar': progressBarExamples,
  'radio-button': radioButtonExamples,
  'range-slider': rangeSliderExamples,
  'resource-item': resourceItemExamples,
  'resource-list': resourceListExamples,
  'scrollable': scrollableExamples,
  'setting-toggle': settingToggleExamples,
  'sheet': sheetExamples,
  'skeleton-body-text': skeletonBodyTextExamples,
  'skeleton-display-text': skeletonDisplayTextExamples,
  'skeleton-page': skeletonPageExamples,
  'skeleton-tabs': skeletonTabsExamples,
  'skeleton-thumbnail': skeletonThumbnailExamples,
  'tag': tagExamples,
  'text-container': textContainerExamples,
  'thumbnail': thumbnailExamples,
  'toast': toastExamples,
  'tooltip': tooltipExamples,
  'top-bar': topBarExamples,
  'video-thumbnail': videoThumbnailExamples,
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
  'callout-card': calloutCards,
  'media-card': mediaCards,
  // All 56 missing components have been implemented
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
// Include System Examples
export const includeSystemExamples = {
  'mixed-framework-page': {
    react: `// Traditional React imports
import {Card, Button, Badge, Page} from '@shopify/polaris';
import {ExtDataGrid} from '@cin7/extjs-adapters';
import {BadgeComponent} from '@cin7/vanilla-js';
import React from 'react';

function MixedFrameworkPage() {
  return (
    <Page title="Mixed Framework Demo">
      <Card sectioned>
        <React.Fragment>
          <Badge status="new">New Feature</Badge>
          <Card>React Card Content</Card>
          <Button variant="primary">React Button</Button>
        </React.Fragment>
      </Card>
    </Page>
  );
}`,
    extjs: `// Traditional ExtJS imports
Ext.require(['Ext.grid.Panel', 'Ext.form.field.ComboBox']);

Ext.define('MyApp.view.MixedPage', {
  extend: 'Ext.container.Container',
  layout: 'vbox',
  items: [{
    xtype: 'panel',
    title: 'Mixed Framework Demo',
    items: [{
      xtype: 'grid',
      store: Ext.create('Ext.data.Store', {
        data: [{name: 'Item 1'}, {name: 'Item 2'}]
      }),
      columns: [{text: 'Name', dataIndex: 'name'}]
    }]
  }]
});`,
    vanilla: `// Traditional Vanilla JS imports
import {CardComponent, ButtonComponent, BadgeComponent} from '@cin7/vanilla-js';

// Traditional approach
const card = new CardComponent({
  title: 'Vanilla JS Card',
  content: 'Card content'
});

const button = new ButtonComponent({
  label: 'Vanilla Button',
  onClick: () => console.log('Clicked')
});`,
    typescript: `// Traditional TypeScript imports
import {Repository, UseCase, EventBus} from '@cin7/typescript-sdk';

interface Product {
  id: string;
  name: string;
  price: number;
}

class ProductRepository extends Repository<Product> {
  async findAll(): Promise<Product[]> {
    return this.apiClient.get('/products');
  }
}

class CreateProductUseCase extends UseCase<any, any> {
  constructor(private repo: ProductRepository) {
    super();
  }
}`
  },

  'include-system-declaration': {
    react: `// Include System - Framework agnostic declarations
include "react" "Page" "full-width"
include "react" "Card" "header"
include "vanilla" "Badge" "new-feature"
include "extjs" "DataGrid" "enterprise"
include "typescript" "Repository" "standard"
include "vanilla" "Button" "primary"

// Generated imports (automatically added)
import {Page, Card} from '@shopify/polaris';
import {Repository} from '@cin7/typescript-sdk';
import {BadgeComponent, ButtonComponent} from '@cin7/vanilla-js';
import {ExtDataGrid} from '@cin7/extjs-adapters';

function MixedFrameworkPage() {
  return (
    <Page fullWidth title="Include System Demo">
      <Card sectioned>
        <BadgeComponent status="new">New Feature</Badge>
        <Card>React Card Content</Card>
        <ButtonComponent variant="primary">Vanilla Button</Button>
        <ExtDataGrid
          data={[]}
          features={['sorting', 'filtering', 'export']}
        />
      </Card>
    </Page>
  );
}`,
    extjs: `// Include System - Framework agnostic declarations
include "react" "Page" "full-width"
include "extjs" "DataGrid" "enterprise"
include "vanilla" "Badge" "success"
include "typescript" "Repository" "standard"

// Generated code (automatically added)
import {Page} from '@shopify/polaris';
import {Repository} from '@cin7/typescript-sdk';
import {BadgeComponent} from '@cin7/vanilla-js';

Ext.define('MyApp.view.IncludeSystemPage', {
  extend: 'Ext.container.Container',
  layout: 'vbox',
  items: [{
    xtype: 'panel',
    title: 'Include System Demo',
    items: [{
      xtype: 'grid',
      features: ['grouping', 'sorting', 'export'],
      store: Ext.create('Ext.data.Store', {
        model: 'Product'
      })
    }]
  }]
});`,
    vanilla: `// Include System - Framework agnostic declarations
include "vanilla" "Card" "default"
include "vanilla" "Button" "primary"
include "vanilla" "Badge" "success"
include "typescript" "EventBus" "typed"

// Generated code (automatically added)
import {CardComponent, ButtonComponent, BadgeComponent} from '@cin7/vanilla-js';
import {EventBus} from '@cin7/typescript-sdk';

// Component instantiation
const card = new CardComponent({
  title: 'Include System Card',
  content: 'Card content with badge',
  badge: { status: 'success', text: 'Active' }
});

const button = new ButtonComponent({
  label: 'Include Button',
  onClick: () => {
    eventBus.emit('button.clicked', { source: 'include-system' });
  }
});

const eventBus = new EventBus();
eventBus.on('button.clicked', (data) => {
  console.log('Button clicked:', data);
});`,
    typescript: `// Include System - Framework agnostic declarations
include "typescript" "Repository" "standard"
include "typescript" "UseCase" "crud"
include "typescript" "EventBus" "typed"
include "react" "Card" "default"

// Generated code (automatically added)
import {Repository, UseCase, EventBus} from '@cin7/typescript-sdk';
import {Card} from '@shopify/polaris';

// Entity interface
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// Repository implementation
class ProductRepository extends Repository<Product> {
  async findAll(): Promise<Product[]> {
    return this.apiClient.get('/products');
  }
}

// Use case implementation
class ProductUseCase extends UseCase<any, any> {
  constructor(
    private repository: ProductRepository,
    private eventBus: EventBus
  ) {
    super();
  }
}

// Event bus integration
const eventBus = new EventBus();
eventBus.on('product.created', (product: Product) => {
  console.log('Product created:', product.name);
});`
  },

  'component-variations': {
    react: `// Include System - Component Variations
include "react" "Card" "default"
include "react" "Card" "header"
include "react" "Card" "metric-card"
include "react" "Button" "primary"
include "react" "Button" "destructive"
include "react" "Badge" "success"
include "react" "Badge" "warning"
include "react" "MediaCard" "video-card"

// Generated imports
import {Card, Button, Badge, MediaCard} from '@shopify/polaris';

function VariationDemo() {
  return (
    <div>
      {/* Different Card variations */}
      <Card>Default Card</Card>
      <Card sectioned>Header Card</Card>
      <Card title="Metrics">Metric Card</Card>

      {/* Different Button variations */}
      <Button>Default Button</Button>
      <Button variant="primary">Primary Button</Button>
      <Button variant="destructive">Destructive Button</Button>

      {/* Different Badge variations */}
      <Badge status="success">Success</Badge>
      <Badge status="warning">Warning</Badge>

      {/* Media Card variation */}
      <MediaCard
        title="Video Tutorial"
        description="Learn how to use the include system"
        size="small"
      >
        <video controls width="100%">
          <source src="tutorial.mp4" type="video/mp4" />
        </video>
      </MediaCard>
    </div>
  );
}`,
    vanilla: `// Include System - Component Variations
include "vanilla" "Card" "default"
include "vanilla" "Card" "simple"
include "vanilla" "Button" "primary"
include "vanilla" "Button" "link"
include "vanilla" "Badge" "success"
include "vanilla" "Badge" "trend-up"

// Generated imports
import {CardComponent, ButtonComponent, BadgeComponent} from '@cin7/vanilla-js';

// Component variations
const defaultCard = new CardComponent({
  title: 'Default Card',
  variant: 'default'
});

const simpleCard = new CardComponent({
  title: 'Simple Card',
  variant: 'simple'
});

const primaryButton = new ButtonComponent({
  label: 'Primary Action',
  variant: 'primary'
});

const linkButton = new ButtonComponent({
  label: 'Link Button',
  variant: 'link'
});

const successBadge = new BadgeComponent({
  text: 'Success',
  status: 'success'
});

const trendBadge = new BadgeComponent({
  text: '↑ 12%',
  status: 'trend-up'
});`,
    extjs: `// Include System - Component Variations
include "extjs" "DataGrid" "default"
include "extjs" "DataGrid" "enterprise"
include "extjs" "DataGrid" "compact"
include "extjs" "ComboBox" "default"
include "extjs" "ComboBox" "abc"
include "extjs" "FormPanel" "settings"

// Generated code
const defaultGrid = Ext.create('Ext.grid.Panel', {
  title: 'Default Grid',
  columns: [{ text: 'Name', dataIndex: 'name' }],
  store: Ext.create('Ext.data.Store', { data: [] })
});

const enterpriseGrid = Ext.create('Ext.grid.Panel', {
  title: 'Enterprise Grid',
  features: ['grouping', 'filters', 'summary'],
  columns: [{ text: 'Name', dataIndex: 'name' }],
  store: Ext.create('Ext.data.Store', { data: [] })
});

const compactGrid = Ext.create('Ext.grid.Panel', {
  title: 'Compact Grid',
  height: 200,
  columns: [{ text: 'Name', dataIndex: 'name', flex: 1 }],
  store: Ext.create('Ext.data.Store', { data: [] })
});

const defaultCombo = Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'Select Option',
  store: ['Option 1', 'Option 2', 'Option 3']
});

const abcCombo = Ext.create('Ext.form.field.ComboBox', {
  fieldLabel: 'ABC Config',
  store: ['A', 'B', 'C'],
  value: 'A'
});`,
    typescript: `// Include System - Component Variations
include "typescript" "Repository" "standard"
include "typescript" "UseCase" "crud"
include "typescript" "EventBus" "typed"

// Generated imports
import {Repository, UseCase, EventBus} from '@cin7/typescript-sdk';

// Standard Repository
interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | null> {
    const users = await this.findAll();
    return users.find(user => user.email === email) || null;
  }
}

// CRUD Use Case
class UserUseCase extends UseCase<any, any> {
  constructor(
    private repository: UserRepository,
    private eventBus: EventBus
  ) {
    super();
  }

  async createUser(userData: any): Promise<User> {
    const user = await this.repository.create(userData);
    this.eventBus.emit('user.created', user);
    return user;
  }

  async updateUser(id: string, changes: any): Promise<User> {
    const user = await this.repository.update(id, changes);
    this.eventBus.emit('user.updated', user);
    return user;
  }
}

// Typed Event Bus
interface UserEvents {
  'user.created': User;
  'user.updated': User;
  'user.deleted': { id: string };
}

const typedEventBus = new EventBus<UserEvents>();
typedEventBus.on('user.created', (user) => {
  console.log('User created:', user.name);
});`
  }
};

// Include System Utility Functions
export function getIncludeExample(name: string, framework: keyof CodeExampleVariants): string {
  const example = includeSystemExamples[name as keyof typeof includeSystemExamples];
  if (!example) {
    return \`// Example "\${name}" not found\`;
  }
  const frameworkExample = example[framework];
  if (frameworkExample) {
    return frameworkExample;
  }
  return \`// Framework "\${framework}" not supported for example "\${name}"\`;
}

export function listIncludeExamples(): string[] {
  return Object.keys(includeSystemExamples);
}
