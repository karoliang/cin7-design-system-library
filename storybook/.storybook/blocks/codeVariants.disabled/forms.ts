import type { CodeVariant } from './types';

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

export default SelectExample;`,
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

export default DisabledSelectExample;`,
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

export default SelectWithErrorExample;`,
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

export default SelectWithGroupsExample;`,
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

export default CheckboxExample;`,
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

export default CheckedCheckboxExample;`,
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

export default DisabledCheckboxExample;`,
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

export default CheckboxWithHelpTextExample;`,
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

export default CheckboxWithErrorExample;`,
  },

  required: {
    react: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

function RequiredCheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="I agree to the privacy policy"
      checked={checked}
      onChange={setChecked}
      required
    />
  );
}

export default RequiredCheckboxExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-checkbox-wrapper">
  <label class="polaris-checkbox-label">
    <input type="checkbox" class="polaris-checkbox" id="privacy-checkbox" required />
    <span class="polaris-checkbox-label-text">
      I agree to the privacy policy
      <span class="polaris-required-indicator" aria-hidden="true">*</span>
    </span>
  </label>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const checkbox = $('#privacy-checkbox');

on(checkbox, 'change', (e) => {
  const isChecked = e.target.checked;
  console.log('Privacy policy agreement:', isChecked);

  if (!isChecked) {
    console.warn('Privacy policy agreement is required');
  }

  EventBus.emit('required-checkbox:changed', {
    id: 'privacy',
    checked: isChecked,
    valid: isChecked
  });
});
</script>`,

    extjs: `// ExtJS Required Checkbox
Ext.create('Ext.form.field.Checkbox', {
  boxLabel: 'I agree to the privacy policy <span style="color:red;">*</span>',
  checked: false,
  allowBlank: false,
  renderTo: Ext.getBody(),
  listeners: {
    change: function(checkbox, newValue) {
      console.log('Privacy policy agreement:', newValue);

      if (!newValue) {
        checkbox.markInvalid('This field is required');
      } else {
        checkbox.clearInvalid();
      }

      EventBus.emit('required-checkbox:changed', {
        id: 'privacy',
        checked: newValue,
        valid: newValue
      });
    }
  },
  validator: function(value) {
    return value === true || 'You must agree to the privacy policy';
  }
});`,

    typescript: `import { Checkbox } from '@shopify/polaris';
import { useState } from 'react';

interface RequiredCheckboxProps {
  label?: string;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  onValidationChange?: (isValid: boolean) => void;
}

function RequiredCheckboxExample({
  label = 'I agree to the privacy policy',
  required = true,
  onChange,
  onValidationChange
}: RequiredCheckboxProps): JSX.Element {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (newChecked: boolean): void => {
    setChecked(newChecked);
    onChange?.(newChecked);

    if (required) {
      onValidationChange?.(newChecked);
    }
  };

  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={handleChange}
      required={required}
    />
  );
}

export default RequiredCheckboxExample;`,
  },

  interactive: {
    react: `import { Checkbox, BlockStack, Text } from '@shopify/polaris';
import { useState } from 'react';

function InteractiveCheckboxExample() {
  const [checked, setChecked] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <BlockStack gap="400" maxWidth="400px">
      <div>
        <Checkbox
          label="Single checkbox with state"
          checked={checked}
          onChange={setChecked}
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Status: {checked ? 'Checked' : 'Unchecked'}
        </Text>
      </div>

      <div>
        <Checkbox
          label="I agree to the terms of service"
          checked={agreed}
          onChange={setAgreed}
          required
          helpText="You must agree to continue"
        />
        <Text as="p" variant="bodySm" tone={agreed ? 'success' : 'critical'}>
          {agreed ? '✓ Terms accepted' : '✗ Terms not accepted'}
        </Text>
      </div>

      <BlockStack gap="200">
        <Text as="h3" variant="headingMd">Notification preferences:</Text>
        <Checkbox
          label="Email notifications"
          checked={notifications.email}
          onChange={(value) => setNotifications(prev => ({ ...prev, email: value }))}
          helpText="Receive updates via email"
        />
        <Checkbox
          label="SMS notifications"
          checked={notifications.sms}
          onChange={(value) => setNotifications(prev => ({ ...prev, sms: value }))}
          helpText="Receive text message alerts"
        />
        <Checkbox
          label="Push notifications"
          checked={notifications.push}
          onChange={(value) => setNotifications(prev => ({ ...prev, push: value }))}
          helpText="Receive browser push notifications"
        />
      </BlockStack>
    </BlockStack>
  );
}

export default InteractiveCheckboxExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack" style="max-width: 400px;">
  <div class="polaris-checkbox-section">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="single-checkbox" />
      <span class="polaris-checkbox-label-text">Single checkbox with state</span>
    </label>
    <p class="polaris-text-subdued" id="single-status">Status: Unchecked</p>
  </div>

  <div class="polaris-checkbox-section">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="terms-checkbox" required />
      <span class="polaris-checkbox-label-text">I agree to the terms of service</span>
    </label>
    <div class="polaris-help-text">You must agree to continue</div>
    <p id="terms-status" class="polaris-text-critical">✗ Terms not accepted</p>
  </div>

  <div class="polaris-checkbox-section">
    <h3 class="polaris-heading-md">Notification preferences:</h3>

    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="email-checkbox" checked />
      <span class="polaris-checkbox-label-text">Email notifications</span>
    </label>
    <div class="polaris-help-text">Receive updates via email</div>

    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="sms-checkbox" />
      <span class="polaris-checkbox-label-text">SMS notifications</span>
    </label>
    <div class="polaris-help-text">Receive text message alerts</div>

    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="push-checkbox" checked />
      <span class="polaris-checkbox-label-text">Push notifications</span>
    </label>
    <div class="polaris-help-text">Receive browser push notifications</div>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

// Single checkbox with status
const singleCheckbox = $('#single-checkbox');
const singleStatus = $('#single-status');

on(singleCheckbox, 'change', (e) => {
  const isChecked = e.target.checked;
  singleStatus.textContent = \`Status: \${isChecked ? 'Checked' : 'Unchecked'}\`;
});

// Terms checkbox
const termsCheckbox = $('#terms-checkbox');
const termsStatus = $('#terms-status');

on(termsCheckbox, 'change', (e) => {
  const isChecked = e.target.checked;
  if (isChecked) {
    termsStatus.textContent = '✓ Terms accepted';
    termsStatus.className = 'polaris-text-success';
  } else {
    termsStatus.textContent = '✗ Terms not accepted';
    termsStatus.className = 'polaris-text-critical';
  }
});

// Notification preferences
const notificationPrefs = {
  email: $('#email-checkbox'),
  sms: $('#sms-checkbox'),
  push: $('#push-checkbox')
};

Object.keys(notificationPrefs).forEach(key => {
  on(notificationPrefs[key], 'change', (e) => {
    console.log(\`\${key} notifications:\`, e.target.checked);
    EventBus.emit('notifications:changed', {
      [key]: e.target.checked
    });
  });
});
</script>`,

    extjs: `// ExtJS Interactive Checkbox Group
Ext.create('Ext.container.Container', {
  layout: 'vbox',
  width: 400,
  items: [
    // Single checkbox with status
    {
      xtype: 'container',
      items: [
        {
          xtype: 'checkbox',
          boxLabel: 'Single checkbox with state',
          itemId: 'singleCheckbox',
          listeners: {
            change: function(checkbox, newValue) {
              this.up('container').down('#statusLabel').setText(
                'Status: ' + (newValue ? 'Checked' : 'Unchecked')
              );
            }
          }
        },
        {
          xtype: 'label',
          itemId: 'statusLabel',
          text: 'Status: Unchecked',
          style: 'color: #6b7280;'
        }
      ]
    },

    // Terms checkbox with validation
    {
      xtype: 'container',
      margin: '20 0 0 0',
      items: [
        {
          xtype: 'checkbox',
          boxLabel: 'I agree to the terms of service',
          allowBlank: false,
          listeners: {
            change: function(checkbox, newValue) {
              const statusLabel = this.up('container').down('#termsStatus');
              if (newValue) {
                statusLabel.setText('✓ Terms accepted');
                statusLabel.setStyle('color: #16a34a;');
              } else {
                statusLabel.setText('✗ Terms not accepted');
                statusLabel.setStyle('color: #dc2626;');
              }
            }
          }
        },
        {
          xtype: 'label',
          text: 'You must agree to continue',
          style: 'color: #6b7280; font-size: 0.875rem;'
        },
        {
          xtype: 'label',
          itemId: 'termsStatus',
          text: '✗ Terms not accepted',
          style: 'color: #dc2626;'
        }
      ]
    },

    // Notification preferences
    {
      xtype: 'container',
      margin: '20 0 0 0',
      items: [
        {
          xtype: 'label',
          text: 'Notification preferences:',
          style: 'font-weight: 600; font-size: 1.125rem; margin-bottom: 10px;'
        },
        {
          xtype: 'checkbox',
          boxLabel: 'Email notifications',
          checked: true,
          listeners: {
            change: function(cb, val) {
              EventBus.emit('notifications:changed', { email: val });
            }
          }
        },
        {
          xtype: 'label',
          text: 'Receive updates via email',
          style: 'color: #6b7280; font-size: 0.875rem; margin-left: 20px;'
        },
        {
          xtype: 'checkbox',
          boxLabel: 'SMS notifications',
          checked: false,
          listeners: {
            change: function(cb, val) {
              EventBus.emit('notifications:changed', { sms: val });
            }
          }
        },
        {
          xtype: 'label',
          text: 'Receive text message alerts',
          style: 'color: #6b7280; font-size: 0.875rem; margin-left: 20px;'
        },
        {
          xtype: 'checkbox',
          boxLabel: 'Push notifications',
          checked: true,
          listeners: {
            change: function(cb, val) {
              EventBus.emit('notifications:changed', { push: val });
            }
          }
        },
        {
          xtype: 'label',
          text: 'Receive browser push notifications',
          style: 'color: #6b7280; font-size: 0.875rem; margin-left: 20px;'
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Checkbox, BlockStack, Text } from '@shopify/polaris';
import { useState } from 'react';

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface InteractiveCheckboxProps {
  onPreferencesChange?: (preferences: NotificationPreferences) => void;
}

function InteractiveCheckboxExample({
  onPreferencesChange
}: InteractiveCheckboxProps = {}): JSX.Element {
  const [checked, setChecked] = useState<boolean>(false);
  const [agreed, setAgreed] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    push: true,
  });

  const updateNotifications = (key: keyof NotificationPreferences, value: boolean): void => {
    const newPrefs = { ...notifications, [key]: value };
    setNotifications(newPrefs);
    onPreferencesChange?.(newPrefs);
  };

  return (
    <BlockStack gap="400" maxWidth="400px">
      <div>
        <Checkbox
          label="Single checkbox with state"
          checked={checked}
          onChange={setChecked}
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Status: {checked ? 'Checked' : 'Unchecked'}
        </Text>
      </div>

      <div>
        <Checkbox
          label="I agree to the terms of service"
          checked={agreed}
          onChange={setAgreed}
          required
          helpText="You must agree to continue"
        />
        <Text as="p" variant="bodySm" tone={agreed ? 'success' : 'critical'}>
          {agreed ? '✓ Terms accepted' : '✗ Terms not accepted'}
        </Text>
      </div>

      <BlockStack gap="200">
        <Text as="h3" variant="headingMd">Notification preferences:</Text>
        <Checkbox
          label="Email notifications"
          checked={notifications.email}
          onChange={(value) => updateNotifications('email', value)}
          helpText="Receive updates via email"
        />
        <Checkbox
          label="SMS notifications"
          checked={notifications.sms}
          onChange={(value) => updateNotifications('sms', value)}
          helpText="Receive text message alerts"
        />
        <Checkbox
          label="Push notifications"
          checked={notifications.push}
          onChange={(value) => updateNotifications('push', value)}
          helpText="Receive browser push notifications"
        />
      </BlockStack>
    </BlockStack>
  );
}

export default InteractiveCheckboxExample;`,
  },

  'form-validation': {
    react: `import { Checkbox, BlockStack, Text, InlineStack } from '@shopify/polaris';
import { useState } from 'react';

function FormValidationExample() {
  const [formData, setFormData] = useState({
    terms: false,
    age: false,
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (field: string, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    if (value && errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    if (!formData.age) {
      newErrors.age = 'Age verification is required';
    }
    if (!formData.consent) {
      newErrors.consent = 'Data processing consent is required';
    }

    setErrors(newErrors);
    setTouched({ terms: true, age: true, consent: true });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    const isValid = validateForm();
    if (isValid) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <BlockStack gap="400" maxWidth="500px">
      <Text as="h2" variant="headingMd">Registration Form</Text>

      <Checkbox
        label="I accept the terms and conditions"
        checked={formData.terms}
        onChange={(value) => handleCheckboxChange('terms', value)}
        error={touched.terms ? errors.terms : undefined}
        required
      />

      <Checkbox
        label="I confirm I am 18 years of age or older"
        checked={formData.age}
        onChange={(value) => handleCheckboxChange('age', value)}
        error={touched.age ? errors.age : undefined}
        required
      />

      <Checkbox
        label="I consent to data processing as described in the privacy policy"
        checked={formData.consent}
        onChange={(value) => handleCheckboxChange('consent', value)}
        error={touched.consent ? errors.consent : undefined}
        required
        helpText="Your data will be processed in accordance with GDPR regulations"
      />

      <InlineStack gap="200">
        <button onClick={handleSubmit} style={{ padding: '8px 16px', backgroundColor: '#007ace', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Submit Form
        </button>
      </InlineStack>

      {Object.keys(errors).length > 0 && (
        <Text as="p" tone="critical">
          Please complete all required fields
        </Text>
      )}
    </BlockStack>
  );
}

export default FormValidationExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-form" style="max-width: 500px;">
  <h2 class="polaris-heading-md">Registration Form</h2>

  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="terms-checkbox" required />
      <span class="polaris-checkbox-label-text">I accept the terms and conditions *</span>
    </label>
    <div class="polaris-error" id="terms-error" style="display: none;"></div>
  </div>

  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="age-checkbox" required />
      <span class="polaris-checkbox-label-text">I confirm I am 18 years of age or older *</span>
    </label>
    <div class="polaris-error" id="age-error" style="display: none;"></div>
  </div>

  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label">
      <input type="checkbox" class="polaris-checkbox" id="consent-checkbox" required />
      <span class="polaris-checkbox-label-text">I consent to data processing as described in the privacy policy *</span>
    </label>
    <div class="polaris-help-text">Your data will be processed in accordance with GDPR regulations</div>
    <div class="polaris-error" id="consent-error" style="display: none;"></div>
  </div>

  <button id="submit-btn" class="polaris-button polaris-button--primary">Submit Form</button>
  <p id="form-error" class="polaris-text-critical" style="display: none;">Please complete all required fields</p>
</div>

<script>
import { $, on, addClass, removeClass } from '@cin7/vanilla-js';

const formData = {
  terms: false,
  age: false,
  consent: false
};

const touched = {
  terms: false,
  age: false,
  consent: false
};

const checkboxes = {
  terms: $('#terms-checkbox'),
  age: $('#age-checkbox'),
  consent: $('#consent-checkbox')
};

const errors = {
  terms: $('#terms-error'),
  age: $('#age-error'),
  consent: $('#consent-error')
};

const errorMessages = {
  terms: 'You must accept the terms and conditions',
  age: 'Age verification is required',
  consent: 'Data processing consent is required'
};

// Handle checkbox changes
Object.keys(checkboxes).forEach(field => {
  on(checkboxes[field], 'change', (e) => {
    formData[field] = e.target.checked;
    touched[field] = true;

    if (e.target.checked) {
      errors[field].style.display = 'none';
      removeClass(checkboxes[field], 'polaris-checkbox--error');
    }
  });
});

// Form validation and submission
const submitBtn = $('#submit-btn');
const formError = $('#form-error');

on(submitBtn, 'click', () => {
  let isValid = true;

  Object.keys(formData).forEach(field => {
    touched[field] = true;

    if (!formData[field]) {
      isValid = false;
      errors[field].textContent = errorMessages[field];
      errors[field].style.display = 'block';
      addClass(checkboxes[field], 'polaris-checkbox--error');
    }
  });

  if (isValid) {
    alert('Form submitted successfully!');
    formError.style.display = 'none';
  } else {
    formError.style.display = 'block';
  }
});
</script>`,

    extjs: `// ExtJS Form Validation with Checkboxes
Ext.create('Ext.form.Panel', {
  title: 'Registration Form',
  width: 500,
  bodyPadding: 20,
  renderTo: Ext.getBody(),

  items: [
    {
      xtype: 'checkbox',
      name: 'terms',
      boxLabel: 'I accept the terms and conditions',
      allowBlank: false,
      blankText: 'You must accept the terms and conditions',
      listeners: {
        change: function(checkbox, newValue) {
          if (newValue) {
            checkbox.clearInvalid();
          }
        }
      }
    },
    {
      xtype: 'checkbox',
      name: 'age',
      boxLabel: 'I confirm I am 18 years of age or older',
      allowBlank: false,
      blankText: 'Age verification is required',
      listeners: {
        change: function(checkbox, newValue) {
          if (newValue) {
            checkbox.clearInvalid();
          }
        }
      }
    },
    {
      xtype: 'checkbox',
      name: 'consent',
      boxLabel: 'I consent to data processing as described in the privacy policy',
      allowBlank: false,
      blankText: 'Data processing consent is required',
      afterBoxLabelTextTpl: '<div style="color: #6b7280; font-size: 0.875rem; margin-top: 4px;">Your data will be processed in accordance with GDPR regulations</div>',
      listeners: {
        change: function(checkbox, newValue) {
          if (newValue) {
            checkbox.clearInvalid();
          }
        }
      }
    }
  ],

  buttons: [
    {
      text: 'Submit Form',
      formBind: true,
      handler: function() {
        const form = this.up('form').getForm();

        if (form.isValid()) {
          Ext.Msg.alert('Success', 'Form submitted successfully!');

          // Emit event for cross-layer communication
          EventBus.emit('form:submitted', form.getValues());
        } else {
          Ext.Msg.alert('Validation Error', 'Please complete all required fields');
        }
      }
    }
  ]
});`,

    typescript: `import { Checkbox, BlockStack, Text, InlineStack } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface FormData {
  terms: boolean;
  age: boolean;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface TouchedFields {
  [key: string]: boolean;
}

interface FormValidationProps {
  onSubmit?: (data: FormData) => void;
  onValidationChange?: (isValid: boolean) => void;
}

function FormValidationExample({
  onSubmit,
  onValidationChange
}: FormValidationProps = {}): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    terms: false,
    age: false,
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});

  const handleCheckboxChange = useCallback((field: keyof FormData, value: boolean): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    // Clear error when user checks the box
    if (value && errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    if (!formData.age) {
      newErrors.age = 'Age verification is required';
    }
    if (!formData.consent) {
      newErrors.consent = 'Data processing consent is required';
    }

    setErrors(newErrors);
    setTouched({ terms: true, age: true, consent: true });

    const isValid = Object.keys(newErrors).length === 0;
    onValidationChange?.(isValid);

    return isValid;
  }, [formData, onValidationChange]);

  const handleSubmit = useCallback((): void => {
    const isValid = validateForm();
    if (isValid) {
      onSubmit?.(formData);
      alert('Form submitted successfully!');
    }
  }, [formData, validateForm, onSubmit]);

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <BlockStack gap="400" maxWidth="500px">
      <Text as="h2" variant="headingMd">Registration Form</Text>

      <Checkbox
        label="I accept the terms and conditions"
        checked={formData.terms}
        onChange={(value) => handleCheckboxChange('terms', value)}
        error={touched.terms ? errors.terms : undefined}
        required
      />

      <Checkbox
        label="I confirm I am 18 years of age or older"
        checked={formData.age}
        onChange={(value) => handleCheckboxChange('age', value)}
        error={touched.age ? errors.age : undefined}
        required
      />

      <Checkbox
        label="I consent to data processing as described in the privacy policy"
        checked={formData.consent}
        onChange={(value) => handleCheckboxChange('consent', value)}
        error={touched.consent ? errors.consent : undefined}
        required
        helpText="Your data will be processed in accordance with GDPR regulations"
      />

      <InlineStack gap="200">
        <button
          onClick={handleSubmit}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007ace',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Submit Form
        </button>
      </InlineStack>

      {hasErrors && (
        <Text as="p" tone="critical">
          Please complete all required fields
        </Text>
      )}
    </BlockStack>
  );
}

export default FormValidationExample;`,
  },

  accessibility: {
    react: `import { Checkbox, BlockStack, Text } from '@shopify/polaris';

function AccessibilityExample() {
  return (
    <BlockStack gap="400" maxWidth="500px">
      <Text as="h3" variant="headingMd">Accessibility Best Practices</Text>

      <Checkbox
        label="Option with descriptive aria-describedby"
        helpText="This checkbox provides additional context for screen readers"
        ariaDescribedBy="checkbox-help"
      />

      <Checkbox
        label="Required field with clear indication"
        required
        helpText="This field is required for form submission"
      />

      <Checkbox
        label="Option with error state"
        error="This option must be selected to continue"
      />

      <BlockStack gap="200">
        <Text as="p" variant="bodySm">
          ✓ All checkboxes have associated labels<br/>
          ✓ Required fields are clearly marked<br/>
          ✓ Error states provide descriptive messages<br/>
          ✓ Help text provides additional context
        </Text>
      </BlockStack>
    </BlockStack>
  );
}

export default AccessibilityExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-stack" style="max-width: 500px;">
  <h3 class="polaris-heading-md">Accessibility Best Practices</h3>

  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label" for="aria-checkbox">
      <input
        type="checkbox"
        class="polaris-checkbox"
        id="aria-checkbox"
        aria-describedby="checkbox-help"
      />
      <span class="polaris-checkbox-label-text">Option with descriptive aria-describedby</span>
    </label>
    <div class="polaris-help-text" id="checkbox-help">
      This checkbox provides additional context for screen readers
    </div>
  </div>

  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label" for="required-checkbox">
      <input
        type="checkbox"
        class="polaris-checkbox"
        id="required-checkbox"
        required
        aria-required="true"
      />
      <span class="polaris-checkbox-label-text">
        Required field with clear indication
        <span class="polaris-required-indicator" aria-label="Required">*</span>
      </span>
    </label>
    <div class="polaris-help-text">This field is required for form submission</div>
  </div>

  <div class="polaris-checkbox-wrapper">
    <label class="polaris-checkbox-label" for="error-checkbox">
      <input
        type="checkbox"
        class="polaris-checkbox polaris-checkbox--error"
        id="error-checkbox"
        aria-invalid="true"
        aria-describedby="error-message"
      />
      <span class="polaris-checkbox-label-text">Option with error state</span>
    </label>
    <div class="polaris-error" id="error-message" role="alert">
      This option must be selected to continue
    </div>
  </div>

  <div class="polaris-text-body">
    <p>✓ All checkboxes have associated labels</p>
    <p>✓ Required fields are clearly marked</p>
    <p>✓ Error states provide descriptive messages</p>
    <p>✓ Help text provides additional context</p>
  </div>
</div>

<style>
.polaris-checkbox-wrapper {
  margin-bottom: 1rem;
}

.polaris-required-indicator {
  color: #dc2626;
  margin-left: 0.25rem;
}

.polaris-help-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.polaris-error {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>`,

    extjs: `// ExtJS Accessible Checkboxes
Ext.create('Ext.container.Container', {
  layout: 'vbox',
  width: 500,
  items: [
    {
      xtype: 'label',
      text: 'Accessibility Best Practices',
      style: 'font-weight: 600; font-size: 1.125rem; margin-bottom: 16px;'
    },

    // Checkbox with descriptive ARIA attributes
    {
      xtype: 'container',
      margin: '0 0 16 0',
      items: [
        {
          xtype: 'checkbox',
          boxLabel: 'Option with descriptive aria-describedby',
          inputId: 'aria-checkbox',
          ariaLabel: 'Option with additional context for screen readers',
          ariaDescribedBy: 'checkbox-help'
        },
        {
          xtype: 'label',
          itemId: 'checkbox-help',
          text: 'This checkbox provides additional context for screen readers',
          style: 'color: #6b7280; font-size: 0.875rem; margin-left: 20px;'
        }
      ]
    },

    // Required field with clear indication
    {
      xtype: 'container',
      margin: '0 0 16 0',
      items: [
        {
          xtype: 'checkbox',
          boxLabel: 'Required field with clear indication <span style="color: #dc2626;">*</span>',
          inputId: 'required-checkbox',
          allowBlank: false,
          ariaAttributes: {
            required: true
          }
        },
        {
          xtype: 'label',
          text: 'This field is required for form submission',
          style: 'color: #6b7280; font-size: 0.875rem; margin-left: 20px;'
        }
      ]
    },

    // Checkbox with error state
    {
      xtype: 'container',
      margin: '0 0 16 0',
      items: [
        {
          xtype: 'checkbox',
          boxLabel: 'Option with error state',
          inputId: 'error-checkbox',
          activeError: 'This option must be selected to continue',
          msgTarget: 'under',
          ariaAttributes: {
            invalid: true,
            describedby: 'error-message'
          }
        }
      ]
    },

    // Best practices summary
    {
      xtype: 'container',
      margin: '20 0 0 0',
      html:
        '<p>✓ All checkboxes have associated labels</p>' +
        '<p>✓ Required fields are clearly marked</p>' +
        '<p>✓ Error states provide descriptive messages</p>' +
        '<p>✓ Help text provides additional context</p>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Checkbox, BlockStack, Text } from '@shopify/polaris';
import React from 'react';

interface AccessibilityFeatures {
  hasLabels: boolean;
  hasRequiredMarkers: boolean;
  hasErrorMessages: boolean;
  hasHelpText: boolean;
}

interface AccessibilityExampleProps {
  features?: AccessibilityFeatures;
}

function AccessibilityExample({
  features = {
    hasLabels: true,
    hasRequiredMarkers: true,
    hasErrorMessages: true,
    hasHelpText: true
  }
}: AccessibilityExampleProps): JSX.Element {
  return (
    <BlockStack gap="400" maxWidth="500px">
      <Text as="h3" variant="headingMd">Accessibility Best Practices</Text>

      <Checkbox
        label="Option with descriptive aria-describedby"
        helpText="This checkbox provides additional context for screen readers"
        ariaDescribedBy="checkbox-help"
      />

      <Checkbox
        label="Required field with clear indication"
        required
        helpText="This field is required for form submission"
      />

      <Checkbox
        label="Option with error state"
        error="This option must be selected to continue"
      />

      <BlockStack gap="200">
        <Text as="p" variant="bodySm">
          {features.hasLabels && '✓ All checkboxes have associated labels'}
          <br/>
          {features.hasRequiredMarkers && '✓ Required fields are clearly marked'}
          <br/>
          {features.hasErrorMessages && '✓ Error states provide descriptive messages'}
          <br/>
          {features.hasHelpText && '✓ Help text provides additional context'}
        </Text>
      </BlockStack>
    </BlockStack>
  );
}

export default AccessibilityExample;`,
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

export default RadioButtonExample;`,
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

export default CheckedRadioButtonExample;`,
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

export default DisabledRadioButtonExample;`,
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

export default RadioButtonWithHelpTextExample;`,
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

export default RadioButtonWithErrorExample;`,
  }
};

// Avatar Component Examples

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
  },

  'multiple-selection': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function MultipleSelectionExample() {
  const [selected, setSelected] = useState<string[]>(['electronics', 'clothing']);

  return (
    <OptionList
      title="Select categories"
      allowMultiple
      options={[
        {value: 'electronics', label: 'Electronics'},
        {value: 'clothing', label: 'Clothing & Apparel'},
        {value: 'home', label: 'Home & Garden'},
        {value: 'sports', label: 'Sports & Outdoors'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Select categories',
  vertical: true,
  columns: 1,
  items: [{
    boxLabel: 'Electronics',
    name: 'categories',
    inputValue: 'electronics',
    checked: true
  }, {
    boxLabel: 'Clothing & Apparel',
    name: 'categories',
    inputValue: 'clothing',
    checked: true
  }, {
    boxLabel: 'Home & Garden',
    name: 'categories',
    inputValue: 'home'
  }, {
    boxLabel: 'Sports & Outdoors',
    name: 'categories',
    inputValue: 'sports'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Select categories</h4>
  <div class="option-list__items">
    <label><input type="checkbox" name="categories" value="electronics" checked /> Electronics</label>
    <label><input type="checkbox" name="categories" value="clothing" checked /> Clothing & Apparel</label>
    <label><input type="checkbox" name="categories" value="home" /> Home & Garden</label>
    <label><input type="checkbox" name="categories" value="sports" /> Sports & Outdoors</label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function MultipleSelectionExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['electronics', 'clothing']);

  return (
    <OptionList
      title="Select categories"
      allowMultiple
      options={[
        {value: 'electronics', label: 'Electronics'},
        {value: 'clothing', label: 'Clothing & Apparel'},
        {value: 'home', label: 'Home & Garden'},
        {value: 'sports', label: 'Sports & Outdoors'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'with-icons': {
    react: `import {OptionList, Icon} from '@shopify/polaris';
import {PersonIcon, ProductIcon, OrderIcon} from '@shopify/polaris-icons';
import {useState} from 'react';

function WithIconsExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Navigation options"
      options={[
        {value: 'customers', label: 'Customers', media: <Icon source={PersonIcon} />},
        {value: 'products', label: 'Products', media: <Icon source={ProductIcon} />},
        {value: 'orders', label: 'Orders', media: <Icon source={OrderIcon} />},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Navigation options',
  vertical: true,
  items: [{
    boxLabel: '<i class="fa fa-user"></i> Customers',
    name: 'nav',
    inputValue: 'customers'
  }, {
    boxLabel: '<i class="fa fa-box"></i> Products',
    name: 'nav',
    inputValue: 'products'
  }, {
    boxLabel: '<i class="fa fa-shopping-cart"></i> Orders',
    name: 'nav',
    inputValue: 'orders'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Navigation options</h4>
  <div class="option-list__items">
    <label><input type="radio" name="nav" value="customers" /> 👤 Customers</label>
    <label><input type="radio" name="nav" value="products" /> 📦 Products</label>
    <label><input type="radio" name="nav" value="orders" /> 🛒 Orders</label>
  </div>
</div>`,
    typescript: `import {OptionList, Icon} from '@shopify/polaris';
import {PersonIcon, ProductIcon, OrderIcon} from '@shopify/polaris-icons';
import {useState} from 'react';

function WithIconsExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Navigation options"
      options={[
        {value: 'customers', label: 'Customers', media: <Icon source={PersonIcon} />},
        {value: 'products', label: 'Products', media: <Icon source={ProductIcon} />},
        {value: 'orders', label: 'Orders', media: <Icon source={OrderIcon} />},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'with-descriptions': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function WithDescriptionsExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Shipping methods"
      options={[
        {value: 'standard', label: 'Standard Shipping', description: '5-7 business days'},
        {value: 'express', label: 'Express Shipping', description: '2-3 business days'},
        {value: 'overnight', label: 'Overnight Shipping', description: 'Next business day'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Shipping methods',
  vertical: true,
  items: [{
    boxLabel: 'Standard Shipping<br/><small>5-7 business days</small>',
    name: 'shipping',
    inputValue: 'standard'
  }, {
    boxLabel: 'Express Shipping<br/><small>2-3 business days</small>',
    name: 'shipping',
    inputValue: 'express'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Shipping methods</h4>
  <div class="option-list__items">
    <label>
      <input type="radio" name="shipping" value="standard" />
      <div>
        <strong>Standard Shipping</strong>
        <p>5-7 business days</p>
      </div>
    </label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function WithDescriptionsExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Shipping methods"
      options={[
        {value: 'standard', label: 'Standard Shipping', description: '5-7 business days'},
        {value: 'express', label: 'Express Shipping', description: '2-3 business days'},
        {value: 'overnight', label: 'Overnight Shipping', description: 'Next business day'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'with-badges': {
    react: `import {OptionList, Badge} from '@shopify/polaris';
import {useState} from 'react';

function WithBadgesExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Payment methods"
      options={[
        {value: 'credit', label: 'Credit Card', media: <Badge status="success">Active</Badge>},
        {value: 'paypal', label: 'PayPal', media: <Badge status="success">Active</Badge>},
        {value: 'google', label: 'Google Pay', media: <Badge status="attention">Setup needed</Badge>},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Payment methods',
  vertical: true,
  items: [{
    boxLabel: 'Credit Card <span class="badge-success">Active</span>',
    name: 'payment',
    inputValue: 'credit'
  }, {
    boxLabel: 'PayPal <span class="badge-success">Active</span>',
    name: 'payment',
    inputValue: 'paypal'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Payment methods</h4>
  <div class="option-list__items">
    <label><input type="radio" name="payment" value="credit" /> Credit Card <span class="badge">Active</span></label>
    <label><input type="radio" name="payment" value="paypal" /> PayPal <span class="badge">Active</span></label>
  </div>
</div>`,
    typescript: `import {OptionList, Badge} from '@shopify/polaris';
import {useState} from 'react';

function WithBadgesExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Payment methods"
      options={[
        {value: 'credit', label: 'Credit Card', media: <Badge status="success">Active</Badge>},
        {value: 'paypal', label: 'PayPal', media: <Badge status="success">Active</Badge>},
        {value: 'google', label: 'Google Pay', media: <Badge status="attention">Setup needed</Badge>},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'with-disabled-options': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function WithDisabledOptionsExample() {
  const [selected, setSelected] = useState<string[]>(['standard']);

  return (
    <OptionList
      title="Subscription plans"
      options={[
        {value: 'basic', label: 'Basic Plan', disabled: true},
        {value: 'standard', label: 'Standard Plan'},
        {value: 'premium', label: 'Premium Plan'},
        {value: 'enterprise', label: 'Enterprise Plan', disabled: true},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Subscription plans',
  vertical: true,
  items: [{
    boxLabel: 'Basic Plan',
    name: 'plan',
    inputValue: 'basic',
    disabled: true
  }, {
    boxLabel: 'Standard Plan',
    name: 'plan',
    inputValue: 'standard',
    checked: true
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Subscription plans</h4>
  <div class="option-list__items">
    <label><input type="radio" name="plan" value="basic" disabled /> Basic Plan</label>
    <label><input type="radio" name="plan" value="standard" checked /> Standard Plan</label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function WithDisabledOptionsExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['standard']);

  return (
    <OptionList
      title="Subscription plans"
      options={[
        {value: 'basic', label: 'Basic Plan', disabled: true},
        {value: 'standard', label: 'Standard Plan'},
        {value: 'premium', label: 'Premium Plan'},
        {value: 'enterprise', label: 'Enterprise Plan', disabled: true},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'user-role-selection': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function UserRoleSelectionExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      options={[
        {value: 'viewer', label: 'Viewer', description: 'Can view content but cannot make changes'},
        {value: 'editor', label: 'Editor', description: 'Can create and edit content'},
        {value: 'admin', label: 'Administrator', description: 'Full access to all features'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'User Role',
  vertical: true,
  items: [{
    boxLabel: 'Viewer - Can view content but cannot make changes',
    name: 'role',
    inputValue: 'viewer'
  }, {
    boxLabel: 'Editor - Can create and edit content',
    name: 'role',
    inputValue: 'editor'
  }]
});`,
    vanilla: `<div class="option-list">
  <div class="option-list__items">
    <label><input type="radio" name="role" value="viewer" /> Viewer<br/><small>Can view content but cannot make changes</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function UserRoleSelectionExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      options={[
        {value: 'viewer', label: 'Viewer', description: 'Can view content but cannot make changes'},
        {value: 'editor', label: 'Editor', description: 'Can create and edit content'},
        {value: 'admin', label: 'Administrator', description: 'Full access to all features'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'product-categories': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function ProductCategoriesExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      allowMultiple
      options={[
        {value: 'phones', label: 'Smartphones', description: 'iPhone, Android devices'},
        {value: 'laptops', label: 'Laptops & Computers', description: 'MacBooks, Windows PCs'},
        {value: 'tablets', label: 'Tablets', description: 'iPad, Android tablets'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Product Categories',
  vertical: true,
  items: [{
    boxLabel: 'Smartphones - iPhone, Android devices',
    name: 'categories',
    inputValue: 'phones'
  }, {
    boxLabel: 'Laptops & Computers - MacBooks, Windows PCs',
    name: 'categories',
    inputValue: 'laptops'
  }]
});`,
    vanilla: `<div class="option-list">
  <div class="option-list__items">
    <label><input type="checkbox" name="categories" value="phones" /> Smartphones<br/><small>iPhone, Android devices</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function ProductCategoriesExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      allowMultiple
      options={[
        {value: 'phones', label: 'Smartphones', description: 'iPhone, Android devices'},
        {value: 'laptops', label: 'Laptops & Computers', description: 'MacBooks, Windows PCs'},
        {value: 'tablets', label: 'Tablets', description: 'iPad, Android tablets'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'notification-settings': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function NotificationSettingsExample() {
  const [selected, setSelected] = useState<string[]>(['order-created', 'low-inventory']);

  return (
    <OptionList
      allowMultiple
      title="Order notifications"
      options={[
        {value: 'order-created', label: 'New orders', description: 'When a customer places a new order'},
        {value: 'order-updated', label: 'Order updates', description: 'When order status changes'},
        {value: 'low-inventory', label: 'Low inventory', description: 'When stock levels are low'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Order notifications',
  vertical: true,
  items: [{
    boxLabel: 'New orders - When a customer places a new order',
    name: 'notifications',
    inputValue: 'order-created',
    checked: true
  }, {
    boxLabel: 'Low inventory - When stock levels are low',
    name: 'notifications',
    inputValue: 'low-inventory',
    checked: true
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Order notifications</h4>
  <div class="option-list__items">
    <label><input type="checkbox" name="notifications" value="order-created" checked /> New orders<br/><small>When a customer places a new order</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function NotificationSettingsExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['order-created', 'low-inventory']);

  return (
    <OptionList
      allowMultiple
      title="Order notifications"
      options={[
        {value: 'order-created', label: 'New orders', description: 'When a customer places a new order'},
        {value: 'order-updated', label: 'Order updates', description: 'When order status changes'},
        {value: 'low-inventory', label: 'Low inventory', description: 'When stock levels are low'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'theme-selection': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function ThemeSelectionExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Choose your theme"
      options={[
        {value: 'light', label: 'Light Theme', description: 'Clean and bright interface'},
        {value: 'dark', label: 'Dark Theme', description: 'Easy on the eyes in low light'},
        {value: 'auto', label: 'Auto Theme', description: 'Follows system preferences'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Choose your theme',
  vertical: true,
  items: [{
    boxLabel: 'Light Theme - Clean and bright interface',
    name: 'theme',
    inputValue: 'light'
  }, {
    boxLabel: 'Dark Theme - Easy on the eyes in low light',
    name: 'theme',
    inputValue: 'dark'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Choose your theme</h4>
  <div class="option-list__items">
    <label><input type="radio" name="theme" value="light" /> Light Theme<br/><small>Clean and bright interface</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function ThemeSelectionExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      title="Choose your theme"
      options={[
        {value: 'light', label: 'Light Theme', description: 'Clean and bright interface'},
        {value: 'dark', label: 'Dark Theme', description: 'Easy on the eyes in low light'},
        {value: 'auto', label: 'Auto Theme', description: 'Follows system preferences'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'shipping-options': {
    react: `import {OptionList, Badge} from '@shopify/polaris';
import {useState} from 'react';

function ShippingOptionsExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      options={[
        {value: 'free', label: 'Free Shipping', description: '5-7 business days', media: <Badge status="success">FREE</Badge>},
        {value: 'standard', label: 'Standard Shipping', description: '3-5 business days'},
        {value: 'express', label: 'Express Shipping', description: '2-3 business days'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Shipping Method',
  vertical: true,
  items: [{
    boxLabel: 'Free Shipping - 5-7 business days <span class="badge">FREE</span>',
    name: 'shipping',
    inputValue: 'free'
  }, {
    boxLabel: 'Standard Shipping - 3-5 business days',
    name: 'shipping',
    inputValue: 'standard'
  }]
});`,
    vanilla: `<div class="option-list">
  <div class="option-list__items">
    <label><input type="radio" name="shipping" value="free" /> Free Shipping <span class="badge">FREE</span><br/><small>5-7 business days</small></label>
  </div>
</div>`,
    typescript: `import {OptionList, Badge} from '@shopify/polaris';
import {useState} from 'react';

function ShippingOptionsExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      options={[
        {value: 'free', label: 'Free Shipping', description: '5-7 business days', media: <Badge status="success">FREE</Badge>},
        {value: 'standard', label: 'Standard Shipping', description: '3-5 business days'},
        {value: 'express', label: 'Express Shipping', description: '2-3 business days'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'permission-settings': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function PermissionSettingsExample() {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      allowMultiple
      title="Store Management"
      options={[
        {value: 'view-products', label: 'View products', description: 'Can browse product catalog'},
        {value: 'edit-products', label: 'Edit products', description: 'Can modify product information'},
        {value: 'delete-products', label: 'Delete products', description: 'Can remove products from store'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Store Management',
  vertical: true,
  items: [{
    boxLabel: 'View products - Can browse product catalog',
    name: 'permissions',
    inputValue: 'view-products'
  }, {
    boxLabel: 'Edit products - Can modify product information',
    name: 'permissions',
    inputValue: 'edit-products'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Store Management</h4>
  <div class="option-list__items">
    <label><input type="checkbox" name="permissions" value="view-products" /> View products<br/><small>Can browse product catalog</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function PermissionSettingsExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <OptionList
      allowMultiple
      title="Store Management"
      options={[
        {value: 'view-products', label: 'View products', description: 'Can browse product catalog'},
        {value: 'edit-products', label: 'Edit products', description: 'Can modify product information'},
        {value: 'delete-products', label: 'Delete products', description: 'Can remove products from store'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'language-selection': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function LanguageSelectionExample() {
  const [selected, setSelected] = useState<string[]>(['en']);

  return (
    <OptionList
      title="Select your preferred language"
      options={[
        {value: 'en', label: 'English', description: 'English (United States)'},
        {value: 'es', label: 'Spanish', description: 'Español (México)'},
        {value: 'fr', label: 'French', description: 'Français (France)'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.RadioGroup', {
  fieldLabel: 'Select your preferred language',
  vertical: true,
  items: [{
    boxLabel: 'English - English (United States)',
    name: 'language',
    inputValue: 'en',
    checked: true
  }, {
    boxLabel: 'Spanish - Español (México)',
    name: 'language',
    inputValue: 'es'
  }]
});`,
    vanilla: `<div class="option-list">
  <h4>Select your preferred language</h4>
  <div class="option-list__items">
    <label><input type="radio" name="language" value="en" checked /> English<br/><small>English (United States)</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function LanguageSelectionExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>(['en']);

  return (
    <OptionList
      title="Select your preferred language"
      options={[
        {value: 'en', label: 'English', description: 'English (United States)'},
        {value: 'es', label: 'Spanish', description: 'Español (México)'},
        {value: 'fr', label: 'French', description: 'Français (France)'},
      ]}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  },

  'interactive': {
    react: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function InteractiveExample() {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    {value: 'newsletter', label: 'Newsletter', description: 'Weekly updates and news'},
    {value: 'promotions', label: 'Promotional Offers', description: 'Special deals and discounts'},
    {value: 'new-features', label: 'New Features', description: 'Product updates and announcements'},
  ];

  return (
    <OptionList
      allowMultiple
      options={options}
      selected={selected}
      onChange={setSelected}
    />
  );
}`,
    extjs: `Ext.create('Ext.form.CheckboxGroup', {
  fieldLabel: 'Communication Preferences',
  vertical: true,
  items: [{
    boxLabel: 'Newsletter - Weekly updates and news',
    name: 'prefs',
    inputValue: 'newsletter'
  }, {
    boxLabel: 'Promotional Offers - Special deals and discounts',
    name: 'prefs',
    inputValue: 'promotions'
  }]
});`,
    vanilla: `<div class="option-list">
  <div class="option-list__items">
    <label><input type="checkbox" name="prefs" value="newsletter" /> Newsletter<br/><small>Weekly updates and news</small></label>
  </div>
</div>`,
    typescript: `import {OptionList} from '@shopify/polaris';
import {useState} from 'react';

function InteractiveExample(): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  const options = [
    {value: 'newsletter', label: 'Newsletter', description: 'Weekly updates and news'},
    {value: 'promotions', label: 'Promotional Offers', description: 'Special deals and discounts'},
    {value: 'new-features', label: 'New Features', description: 'Product updates and announcements'},
  ];

  return (
    <OptionList
      allowMultiple
      options={options}
      selected={selected}
      onChange={setSelected}
    />
  );
}`
  }
};

// FooterHelp Component Examples

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

export default AutocompleteExample;`,
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

export default ChoiceListExample;`,
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

export default ColorPickerExample;`,
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

export default ComboboxExample;`,
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

export default DatePickerExample;`,
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

export default FormLayoutExample;`,
  }
};

// Labelled Component Examples - Forms

export const labelledExamples: Record<string, CodeVariant> = {
  basiclabel: {
    react: `import {Labelled, TextField} from '@shopify/polaris';
import {useState} from 'react';

function BasicLabelExample() {
  const [value, setValue] = useState('');

  return (
    <Labelled id="basic-field" label="Store name">
      <TextField
        value={value}
        onChange={setValue}
        autoComplete="off"
      />
    </Labelled>
  );
}

export default BasicLabelExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="basic-field" class="polaris-label">Store name</label>
  <div class="polaris-labelled__field">
    <input
      type="text"
      id="basic-field"
      class="polaris-text-field__input"
      autocomplete="off"
    />
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const input = $('#basic-field');
on(input, 'input', (e) => {
  console.log('Value:', e.target.value);
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  name: 'storeName',
  labelWidth: 100,
  width: 320,
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface BasicLabelExampleProps {
  initialValue?: string;
  label?: string;
  onValueChange?: (value: string) => void;
  maxLength?: number;
}

interface FieldState {
  value: string;
  characterCount: number;
}

type ValueChangeHandler = (value: string, characterCount: number) => void;

function BasicLabelExample({
  initialValue = '',
  label = 'Store name',
  onValueChange,
  maxLength = 100
}: BasicLabelExampleProps): JSX.Element {
  const [state, setState] = useState<FieldState>({
    value: initialValue,
    characterCount: initialValue.length
  });

  const handleChange = useCallback((newValue: string): void => {
    const count = newValue.length;
    setState({
      value: newValue,
      characterCount: count
    });

    if (onValueChange) {
      onValueChange(newValue);
    }
  }, [onValueChange]);

  return (
    <Labelled
      id="basic-field"
      label={label}
      helpText={\`\${state.characterCount}/\${maxLength} characters\`}
    >
      <TextField
        value={state.value}
        onChange={handleChange}
        autoComplete="off"
        maxLength={maxLength}
      />
    </Labelled>
  );
}

export default BasicLabelExample;`
  },

  requiredfield: {
    react: `import {Labelled, TextField} from '@shopify/polaris';
import {useState} from 'react';

function RequiredFieldExample() {
  const [email, setEmail] = useState('');

  return (
    <Labelled
      id="required-field"
      label="Email address"
      requiredIndicator
    >
      <TextField
        type="email"
        value={email}
        onChange={setEmail}
        autoComplete="email"
      />
    </Labelled>
  );
}

export default RequiredFieldExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="required-field" class="polaris-label">
    Email address
    <span class="polaris-label__required" aria-label="required">*</span>
  </label>
  <div class="polaris-labelled__field">
    <input
      type="email"
      id="required-field"
      class="polaris-text-field__input"
      autocomplete="email"
      required
    />
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const input = $('#required-field');
on(input, 'blur', (e) => {
  if (!e.target.value) {
    e.target.classList.add('polaris-text-field__input--error');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Email address',
  name: 'email',
  vtype: 'email',
  allowBlank: false,
  blankText: 'Email address is required',
  labelWidth: 120,
  width: 320,
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface RequiredFieldExampleProps {
  initialValue?: string;
  onValueChange?: (value: string, isValid: boolean) => void;
  customValidator?: EmailValidator;
}

interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface FieldState {
  value: string;
  error: string;
  touched: boolean;
  isValid: boolean;
}

type EmailValidator = (email: string) => ValidationResult;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RequiredFieldExample({
  initialValue = '',
  onValueChange,
  customValidator
}: RequiredFieldExampleProps): JSX.Element {
  const [state, setState] = useState<FieldState>({
    value: initialValue,
    error: '',
    touched: false,
    isValid: false
  });

  const validateEmail: EmailValidator = useCallback((email: string): ValidationResult => {
    if (customValidator) {
      return customValidator(email);
    }

    if (!email) {
      return { isValid: false, errorMessage: 'Email address is required' };
    }

    if (!emailRegex.test(email)) {
      return { isValid: false, errorMessage: 'Please enter a valid email address' };
    }

    return { isValid: true };
  }, [customValidator]);

  const handleChange = useCallback((newValue: string): void => {
    const validationResult = validateEmail(newValue);

    setState({
      value: newValue,
      error: validationResult.errorMessage || '',
      touched: true,
      isValid: validationResult.isValid
    });

    onValueChange?.(newValue, validationResult.isValid);
  }, [validateEmail, onValueChange]);

  const handleBlur = useCallback((): void => {
    if (!state.touched) {
      setState(prev => ({ ...prev, touched: true }));
    }
  }, [state.touched]);

  const displayError = state.touched && state.error;

  return (
    <Labelled
      id="required-field"
      label="Email address"
      requiredIndicator
      error={displayError || undefined}
    >
      <TextField
        type="email"
        value={state.value}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="email"
        error={Boolean(displayError)}
      />
    </Labelled>
  );
}

export default RequiredFieldExample;`
  },

  withhelptext: {
    react: `import {Labelled, TextField} from '@shopify/polaris';
import {useState} from 'react';

function LabelWithHelpText() {
  const [value, setValue] = useState('');

  return (
    <Labelled
      id="help-text-field"
      label="Password"
      helpText="Must be at least 8 characters"
    >
      <TextField
        type="password"
        value={value}
        onChange={setValue}
        autoComplete="new-password"
      />
    </Labelled>
  );
}

export default LabelWithHelpText;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="help-text-field" class="polaris-label">Password</label>
  <div class="polaris-labelled__help-text">
    Must be at least 8 characters
  </div>
  <div class="polaris-labelled__field">
    <input
      type="password"
      id="help-text-field"
      class="polaris-text-field__input"
      autocomplete="new-password"
    />
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const input = $('#help-text-field');
on(input, 'blur', (e) => {
  if (e.target.value.length < 8) {
    console.log('Password too short');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Password',
  name: 'password',
  inputType: 'password',
  minLength: 8,
  minLengthText: 'Must be at least 8 characters',
  labelWidth: 100,
  width: 320,
  afterBodyEl: '<div class="polaris-help-text">Must be at least 8 characters</div>',
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface LabelWithHelpTextProps {
  minLength?: number;
  onPasswordChange?: (value: string, strength: PasswordStrength) => void;
  requireSpecialChar?: boolean;
  requireNumber?: boolean;
}

interface PasswordValidation {
  isValid: boolean;
  strength: PasswordStrength;
  errors: string[];
}

enum PasswordStrength {
  Weak = 'weak',
  Medium = 'medium',
  Strong = 'strong'
}

interface PasswordState {
  value: string;
  strength: PasswordStrength;
  errors: string[];
  touched: boolean;
}

type PasswordValidator = (password: string) => PasswordValidation;

function LabelWithHelpText({
  minLength = 8,
  onPasswordChange,
  requireSpecialChar = false,
  requireNumber = false
}: LabelWithHelpTextProps): JSX.Element {
  const [state, setState] = useState<PasswordState>({
    value: '',
    strength: PasswordStrength.Weak,
    errors: [],
    touched: false
  });

  const validatePassword: PasswordValidator = useCallback((password: string): PasswordValidation => {
    const errors: string[] = [];
    let strength: PasswordStrength = PasswordStrength.Weak;

    if (password.length < minLength) {
      errors.push(\`Must be at least \${minLength} characters\`);
    } else {
      strength = PasswordStrength.Medium;
    }

    if (requireNumber && !/\d/.test(password)) {
      errors.push('Must contain at least one number');
    }

    if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Must contain a special character');
    }

    if (password.length >= minLength && /\d/.test(password) && /[!@#$%^&*]/.test(password)) {
      strength = PasswordStrength.Strong;
    }

    return {
      isValid: errors.length === 0,
      strength,
      errors
    };
  }, [minLength, requireNumber, requireSpecialChar]);

  const handleChange = useCallback((newValue: string): void => {
    const validation = validatePassword(newValue);

    setState({
      value: newValue,
      strength: validation.strength,
      errors: validation.errors,
      touched: true
    });

    onPasswordChange?.(newValue, validation.strength);
  }, [validatePassword, onPasswordChange]);

  const displayError = state.touched && state.errors.length > 0 ? state.errors[0] : undefined;

  return (
    <Labelled
      id="help-text-field"
      label="Password"
      helpText={\`Must be at least \${minLength} characters\${requireNumber ? ' with a number' : ''}\${requireSpecialChar ? ' and special character' : ''}\`}
      error={displayError}
    >
      <TextField
        type="password"
        value={state.value}
        onChange={handleChange}
        autoComplete="new-password"
        error={Boolean(displayError)}
      />
    </Labelled>
  );
}

export default LabelWithHelpText;`
  },

  witherror: {
    react: `import {Labelled, TextField} from '@shopify/polaris';
import {useState} from 'react';

function LabelWithError() {
  const [value, setValue] = useState('invalid@');
  const error = 'Email is not valid';

  return (
    <Labelled
      id="error-field"
      label="Email"
      error={error}
    >
      <TextField
        type="email"
        value={value}
        onChange={setValue}
        error={error}
        autoComplete="email"
      />
    </Labelled>
  );
}

export default LabelWithError;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="error-field" class="polaris-label">Email</label>
  <div class="polaris-labelled__error">
    <span class="polaris-error-text">Email is not valid</span>
  </div>
  <div class="polaris-labelled__field">
    <input
      type="email"
      id="error-field"
      class="polaris-text-field__input polaris-text-field__input--error"
      value="invalid@"
      autocomplete="email"
      aria-invalid="true"
      aria-describedby="error-field-error"
    />
  </div>
  <div id="error-field-error" class="polaris-inline-error">
    Email is not valid
  </div>
</div>

<script>
import { $ } from '@cin7/vanilla-js';

const input = $('#error-field');
// Error state is already displayed
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Email',
  name: 'email',
  vtype: 'email',
  value: 'invalid@',
  allowBlank: false,
  markInvalid: true,
  activeError: 'Email is not valid',
  labelWidth: 100,
  width: 320,
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

interface LabelWithErrorProps {
  initialValue?: string;
  customValidator?: EmailValidatorFunction;
  onErrorStateChange?: (hasError: boolean, errorMessage?: string) => void;
}

interface ErrorState {
  message: string;
  fieldTouched: boolean;
  lastValidValue: string;
}

type EmailValidatorFunction = (email: string) => ValidationError | null;

interface ValidationError {
  code: ErrorCode;
  message: string;
}

enum ErrorCode {
  Required = 'REQUIRED',
  InvalidFormat = 'INVALID_FORMAT',
  Custom = 'CUSTOM'
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LabelWithError({
  initialValue = 'invalid@',
  customValidator,
  onErrorStateChange
}: LabelWithErrorProps): JSX.Element {
  const [value, setValue] = useState<string>(initialValue);
  const [errorState, setErrorState] = useState<ErrorState>({
    message: 'Email is not valid',
    fieldTouched: false,
    lastValidValue: ''
  });

  const validateEmailField: EmailValidatorFunction = useCallback((email: string): ValidationError | null => {
    if (customValidator) {
      return customValidator(email);
    }

    if (!email || email.trim() === '') {
      return { code: ErrorCode.Required, message: 'Email is required' };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { code: ErrorCode.InvalidFormat, message: 'Email is not valid' };
    }

    return null;
  }, [customValidator]);

  const handleChange = useCallback((newValue: string): void => {
    setValue(newValue);
    const validationError = validateEmailField(newValue);

    const newErrorState: ErrorState = {
      message: validationError?.message || '',
      fieldTouched: true,
      lastValidValue: validationError ? errorState.lastValidValue : newValue
    };

    setErrorState(newErrorState);
    onErrorStateChange?.(Boolean(validationError), validationError?.message);
  }, [validateEmailField, errorState.lastValidValue, onErrorStateChange]);

  useEffect(() => {
    const initialError = validateEmailField(initialValue);
    if (initialError) {
      setErrorState({
        message: initialError.message,
        fieldTouched: false,
        lastValidValue: ''
      });
    }
  }, [initialValue, validateEmailField]);

  return (
    <Labelled
      id="error-field"
      label="Email"
      error={errorState.message}
    >
      <TextField
        type="email"
        value={value}
        onChange={handleChange}
        error={errorState.message}
        autoComplete="email"
      />
    </Labelled>
  );
}

export default LabelWithError;`
  },

  withaction: {
    react: `import {Labelled, TextField, Link} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function LabelWithAction() {
  const [value, setValue] = useState('');

  const handleAction = useCallback(() => {
    alert('Action clicked');
  }, []);

  return (
    <Labelled
      id="action-field"
      label="API Key"
      action={{
        content: 'Generate new key',
        onAction: handleAction
      }}
    >
      <TextField
        value={value}
        onChange={setValue}
        autoComplete="off"
      />
    </Labelled>
  );
}

export default LabelWithAction;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <div class="polaris-labelled__label-wrapper">
    <label for="action-field" class="polaris-label">API Key</label>
    <button
      class="polaris-button polaris-button--plain polaris-button--size-slim"
      id="generate-key"
      type="button"
    >
      Generate new key
    </button>
  </div>
  <div class="polaris-labelled__field">
    <input
      type="text"
      id="action-field"
      class="polaris-text-field__input"
      autocomplete="off"
    />
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const generateBtn = $('#generate-key');
const input = $('#action-field');

on(generateBtn, 'click', () => {
  const newKey = 'key_' + Math.random().toString(36).substring(7);
  input.value = newKey;
  alert('New key generated');
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'API Key',
  name: 'apiKey',
  labelWidth: 100,
  width: 320,
  afterLabelTextTpl: [
    '<button class="polaris-button polaris-button--plain" ',
    'onclick="generateNewKey()">Generate new key</button>'
  ],
  renderTo: Ext.getBody()
});

function generateNewKey() {
  const field = Ext.ComponentQuery.query('[name=apiKey]')[0];
  const newKey = 'key_' + Math.random().toString(36).substring(7);
  field.setValue(newKey);
  Ext.Msg.alert('Success', 'New key generated');
}`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface LabelWithActionProps {
  onGenerateKey?: KeyGenerationHandler;
  actionLabel?: string;
  keyPrefix?: string;
  keyLength?: number;
}

interface GeneratedKey {
  value: string;
  timestamp: number;
  expiresAt?: number;
}

interface KeyGenerationOptions {
  prefix: string;
  length: number;
  includeTimestamp: boolean;
}

type KeyGenerationHandler = (key: GeneratedKey) => void;
type KeyGenerator = (options: KeyGenerationOptions) => string;

const generateSecureKey: KeyGenerator = ({ prefix, length, includeTimestamp }): string => {
  const randomPart = Math.random().toString(36).substring(2, 2 + length);
  const timestampPart = includeTimestamp ? Date.now().toString(36) : '';
  return \`\${prefix}_\${timestampPart}\${randomPart}\`;
};

function LabelWithAction({
  onGenerateKey,
  actionLabel = 'Generate new key',
  keyPrefix = 'key',
  keyLength = 7
}: LabelWithActionProps): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [lastGenerated, setLastGenerated] = useState<GeneratedKey | null>(null);

  const handleAction = useCallback((): void => {
    const newKeyValue = generateSecureKey({
      prefix: keyPrefix,
      length: keyLength,
      includeTimestamp: true
    });

    const generatedKey: GeneratedKey = {
      value: newKeyValue,
      timestamp: Date.now(),
      expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
    };

    setValue(newKeyValue);
    setLastGenerated(generatedKey);
    onGenerateKey?.(generatedKey);
  }, [onGenerateKey, keyPrefix, keyLength]);

  return (
    <Labelled
      id="action-field"
      label="API Key"
      action={{
        content: actionLabel,
        onAction: handleAction
      }}
      helpText={lastGenerated ? \`Generated at: \${new Date(lastGenerated.timestamp).toLocaleString()}\` : undefined}
    >
      <TextField
        value={value}
        onChange={setValue}
        autoComplete="off"
        readOnly
      />
    </Labelled>
  );
}

export default LabelWithAction;`
  },

  hiddenlabel: {
    react: `import {Labelled, TextField} from '@shopify/polaris';
import {useState} from 'react';

function HiddenLabelExample() {
  const [value, setValue] = useState('');

  return (
    <Labelled
      id="hidden-label-field"
      label="Search"
      labelHidden
    >
      <TextField
        value={value}
        onChange={setValue}
        placeholder="Search products..."
        autoComplete="off"
      />
    </Labelled>
  );
}

export default HiddenLabelExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="hidden-label-field" class="polaris-label polaris-label--hidden">
    Search
  </label>
  <div class="polaris-labelled__field">
    <input
      type="text"
      id="hidden-label-field"
      class="polaris-text-field__input"
      placeholder="Search products..."
      autocomplete="off"
      aria-label="Search"
    />
  </div>
</div>

<style>
.polaris-label--hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>

<script>
import { $, on } from '@cin7/vanilla-js';

const input = $('#hidden-label-field');
on(input, 'input', (e) => {
  console.log('Search:', e.target.value);
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  hideLabel: true,
  name: 'search',
  emptyText: 'Search products...',
  width: 320,
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback, useMemo} from 'react';

interface HiddenLabelExampleProps {
  placeholder?: string;
  onSearch?: SearchHandler;
  debounceMs?: number;
  minSearchLength?: number;
}

interface SearchState {
  query: string;
  resultCount: number;
  isSearching: boolean;
}

interface SearchResult {
  query: string;
  timestamp: number;
  resultCount?: number;
}

type SearchHandler = (result: SearchResult) => void;

function HiddenLabelExample({
  placeholder = 'Search products...',
  onSearch,
  debounceMs = 300,
  minSearchLength = 2
}: HiddenLabelExampleProps): JSX.Element {
  const [state, setState] = useState<SearchState>({
    query: '',
    resultCount: 0,
    isSearching: false
  });

  const [debounceTimer, setDebounceTimer] = useState<NodeType | null>(null);

  const performSearch = useCallback((query: string): void => {
    const searchResult: SearchResult = {
      query,
      timestamp: Date.now(),
      resultCount: Math.floor(Math.random() * 100) // Mock result count
    };

    setState(prev => ({
      ...prev,
      resultCount: searchResult.resultCount || 0,
      isSearching: false
    }));

    onSearch?.(searchResult);
  }, [onSearch]);

  const handleChange = useCallback((newValue: string): void => {
    setState(prev => ({
      ...prev,
      query: newValue,
      isSearching: newValue.length >= minSearchLength
    }));

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    if (newValue.length >= minSearchLength) {
      const timer = setTimeout(() => {
        performSearch(newValue);
      }, debounceMs);
      setDebounceTimer(timer as any);
    }
  }, [debounceTimer, debounceMs, minSearchLength, performSearch]);

  const helperText = useMemo((): string | undefined => {
    if (state.isSearching) return 'Searching...';
    if (state.query && state.query.length < minSearchLength) {
      return \`Type at least \${minSearchLength} characters to search\`;
    }
    if (state.resultCount > 0) return \`Found \${state.resultCount} results\`;
    return undefined;
  }, [state.isSearching, state.query, state.resultCount, minSearchLength]);

  return (
    <Labelled
      id="hidden-label-field"
      label="Search"
      labelHidden
      helpText={helperText}
    >
      <TextField
        value={state.query}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
      />
    </Labelled>
  );
}

export default HiddenLabelExample;`
  },

  multiplefieldtypes: {
    react: `import {Labelled, TextField, Select} from '@shopify/polaris';
import {useState} from 'react';

function MultipleFieldTypes() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('US');

  const countryOptions = [
    {label: 'United States', value: 'US'},
    {label: 'Canada', value: 'CA'},
    {label: 'United Kingdom', value: 'UK'},
  ];

  return (
    <>
      <Labelled id="name-field" label="Full name">
        <TextField value={name} onChange={setName} autoComplete="name" />
      </Labelled>

      <Labelled id="country-field" label="Country">
        <Select options={countryOptions} value={country} onChange={setCountry} />
      </Labelled>
    </>
  );
}

export default MultipleFieldTypes;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="name-field" class="polaris-label">Full name</label>
  <div class="polaris-labelled__field">
    <input
      type="text"
      id="name-field"
      class="polaris-text-field__input"
      autocomplete="name"
    />
  </div>
</div>

<div class="polaris-labelled">
  <label for="country-field" class="polaris-label">Country</label>
  <div class="polaris-labelled__field">
    <select id="country-field" class="polaris-select__input">
      <option value="US">United States</option>
      <option value="CA">Canada</option>
      <option value="UK">United Kingdom</option>
    </select>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const nameField = $('#name-field');
const countryField = $('#country-field');

on(nameField, 'input', (e) => console.log('Name:', e.target.value));
on(countryField, 'change', (e) => console.log('Country:', e.target.value));
</script>`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  width: 320,
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Full name',
      name: 'name',
      allowBlank: false
    },
    {
      xtype: 'combobox',
      fieldLabel: 'Country',
      name: 'country',
      store: [
        ['US', 'United States'],
        ['CA', 'Canada'],
        ['UK', 'United Kingdom']
      ],
      value: 'US',
      editable: false
    }
  ],
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField, Select} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface MultipleFieldTypesProps {
  onFormChange?: FormChangeHandler;
  validateOnChange?: boolean;
}

interface FormData {
  name: string;
  country: string;
}

interface FormValidation {
  isValid: boolean;
  errors: FormErrors;
}

interface FormErrors {
  name?: string;
  country?: string;
}

interface CountryOption {
  label: string;
  value: string;
  code: string;
}

type FormChangeHandler = (data: FormData, validation: FormValidation) => void;
type FormValidator = (data: FormData) => FormValidation;

const COUNTRY_OPTIONS: readonly CountryOption[] = [
  {label: 'United States', value: 'US', code: '+1'},
  {label: 'Canada', value: 'CA', code: '+1'},
  {label: 'United Kingdom', value: 'UK', code: '+44'},
] as const;

function MultipleFieldTypes({
  onFormChange,
  validateOnChange = true
}: MultipleFieldTypesProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    country: 'US'
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm: FormValidator = useCallback((data: FormData): FormValidation => {
    const formErrors: FormErrors = {};

    if (!data.name || data.name.trim().length < 2) {
      formErrors.name = 'Name must be at least 2 characters';
    }

    if (!data.country) {
      formErrors.country = 'Please select a country';
    }

    return {
      isValid: Object.keys(formErrors).length === 0,
      errors: formErrors
    };
  }, []);

  const handleNameChange = useCallback((newName: string): void => {
    const newFormData: FormData = { ...formData, name: newName };
    setFormData(newFormData);

    if (validateOnChange) {
      const validation = validateForm(newFormData);
      setErrors(validation.errors);
      onFormChange?.(newFormData, validation);
    } else {
      onFormChange?.(newFormData, { isValid: true, errors: {} });
    }
  }, [formData, validateOnChange, validateForm, onFormChange]);

  const handleCountryChange = useCallback((newCountry: string): void => {
    const newFormData: FormData = { ...formData, country: newCountry };
    setFormData(newFormData);

    if (validateOnChange) {
      const validation = validateForm(newFormData);
      setErrors(validation.errors);
      onFormChange?.(newFormData, validation);
    } else {
      onFormChange?.(newFormData, { isValid: true, errors: {} });
    }
  }, [formData, validateOnChange, validateForm, onFormChange]);

  return (
    <>
      <Labelled
        id="name-field"
        label="Full name"
        error={errors.name}
        requiredIndicator
      >
        <TextField
          value={formData.name}
          onChange={handleNameChange}
          autoComplete="name"
          error={Boolean(errors.name)}
        />
      </Labelled>

      <Labelled
        id="country-field"
        label="Country"
        error={errors.country}
      >
        <Select
          options={COUNTRY_OPTIONS}
          value={formData.country}
          onChange={handleCountryChange}
        />
      </Labelled>
    </>
  );
}

export default MultipleFieldTypes;`
  },

  accessibilitydemo: {
    react: `import {Labelled, TextField} from '@shopify/polaris';
import {useState} from 'react';

function AccessibilityDemo() {
  const [value, setValue] = useState('');

  return (
    <Labelled
      id="accessible-field"
      label="Phone number"
      helpText="Include country code"
      requiredIndicator
    >
      <TextField
        type="tel"
        value={value}
        onChange={setValue}
        autoComplete="tel"
        placeholder="+1 (555) 123-4567"
      />
    </Labelled>
  );
}

export default AccessibilityDemo;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-labelled">
  <label for="accessible-field" class="polaris-label">
    Phone number
    <span class="polaris-label__required" aria-label="required">*</span>
  </label>
  <div class="polaris-labelled__help-text" id="accessible-field-help">
    Include country code
  </div>
  <div class="polaris-labelled__field">
    <input
      type="tel"
      id="accessible-field"
      class="polaris-text-field__input"
      autocomplete="tel"
      placeholder="+1 (555) 123-4567"
      aria-describedby="accessible-field-help"
      required
      aria-required="true"
    />
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const input = $('#accessible-field');
on(input, 'blur', (e) => {
  if (!e.target.value) {
    e.target.setAttribute('aria-invalid', 'true');
  } else {
    e.target.setAttribute('aria-invalid', 'false');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Phone number <span style="color:red;">*</span>',
  name: 'phone',
  vtype: 'alpha',
  allowBlank: false,
  emptyText: '+1 (555) 123-4567',
  labelWidth: 120,
  width: 320,
  afterBodyEl: '<div class="polaris-help-text">Include country code</div>',
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface AccessibilityDemoProps {
  onPhoneChange?: PhoneChangeHandler;
  customValidator?: PhoneValidator;
  countryCode?: string;
}

interface PhoneValidation {
  isValid: boolean;
  errorCode?: PhoneErrorCode;
  formattedNumber?: string;
}

interface PhoneState {
  raw: string;
  formatted: string;
  error: string;
  touched: boolean;
}

enum PhoneErrorCode {
  Required = 'REQUIRED',
  InvalidFormat = 'INVALID_FORMAT',
  TooShort = 'TOO_SHORT'
}

type PhoneChangeHandler = (phone: string, validation: PhoneValidation) => void;
type PhoneValidator = (phone: string) => PhoneValidation;
type PhoneFormatter = (phone: string) => string;

const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

const formatPhoneNumber: PhoneFormatter = (phone: string): string => {
  const cleaned = phone.replace(/[\s()-]/g, '');
  if (cleaned.startsWith('+1') && cleaned.length === 12) {
    return \`+1 (\${cleaned.slice(2, 5)}) \${cleaned.slice(5, 8)}-\${cleaned.slice(8)}\`;
  }
  return phone;
};

function AccessibilityDemo({
  onPhoneChange,
  customValidator,
  countryCode = '+1'
}: AccessibilityDemoProps): JSX.Element {
  const [state, setState] = useState<PhoneState>({
    raw: '',
    formatted: '',
    error: '',
    touched: false
  });

  const validatePhone: PhoneValidator = useCallback((phone: string): PhoneValidation => {
    if (customValidator) {
      return customValidator(phone);
    }

    const cleaned = phone.replace(/[\s()-]/g, '');

    if (!cleaned) {
      return { isValid: false, errorCode: PhoneErrorCode.Required };
    }

    if (cleaned.length < 10) {
      return { isValid: false, errorCode: PhoneErrorCode.TooShort };
    }

    if (!PHONE_REGEX.test(cleaned)) {
      return { isValid: false, errorCode: PhoneErrorCode.InvalidFormat };
    }

    return { isValid: true, formattedNumber: formatPhoneNumber(cleaned) };
  }, [customValidator]);

  const getErrorMessage = (errorCode?: PhoneErrorCode): string => {
    switch (errorCode) {
      case PhoneErrorCode.Required:
        return 'Phone number is required';
      case PhoneErrorCode.TooShort:
        return 'Phone number is too short';
      case PhoneErrorCode.InvalidFormat:
        return 'Please enter a valid phone number';
      default:
        return '';
    }
  };

  const handleChange = useCallback((newValue: string): void => {
    const validation = validatePhone(newValue);

    setState({
      raw: newValue,
      formatted: validation.formattedNumber || newValue,
      error: getErrorMessage(validation.errorCode),
      touched: true
    });

    onPhoneChange?.(newValue, validation);
  }, [validatePhone, onPhoneChange]);

  return (
    <Labelled
      id="accessible-field"
      label="Phone number"
      helpText="Include country code"
      requiredIndicator
      error={state.touched ? state.error : undefined}
    >
      <TextField
        type="tel"
        value={state.raw}
        onChange={handleChange}
        autoComplete="tel"
        placeholder="+1 (555) 123-4567"
        error={Boolean(state.touched && state.error)}
      />
    </Labelled>
  );
}

export default AccessibilityDemo;`
  },

  labelbestpractices: {
    react: `import {Labelled, TextField, FormLayout} from '@shopify/polaris';
import {useState} from 'react';

function LabelBestPractices() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <FormLayout>
      <Labelled
        id="email-field"
        label="Email address"
        helpText="We'll never share your email"
        requiredIndicator
      >
        <TextField
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
      </Labelled>

      <Labelled
        id="password-field"
        label="Password"
        helpText="At least 8 characters with numbers and symbols"
        requiredIndicator
      >
        <TextField
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
      </Labelled>
    </FormLayout>
  );
}

export default LabelBestPractices;`,
    vanilla: `<!-- HTML Structure -->
<form class="polaris-form-layout">
  <div class="polaris-labelled">
    <label for="email-field" class="polaris-label">
      Email address
      <span class="polaris-label__required">*</span>
    </label>
    <div class="polaris-labelled__help-text">We'll never share your email</div>
    <div class="polaris-labelled__field">
      <input
        type="email"
        id="email-field"
        class="polaris-text-field__input"
        autocomplete="email"
        required
      />
    </div>
  </div>

  <div class="polaris-labelled">
    <label for="password-field" class="polaris-label">
      Password
      <span class="polaris-label__required">*</span>
    </label>
    <div class="polaris-labelled__help-text">
      At least 8 characters with numbers and symbols
    </div>
    <div class="polaris-labelled__field">
      <input
        type="password"
        id="password-field"
        class="polaris-text-field__input"
        autocomplete="new-password"
        required
      />
    </div>
  </div>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

const emailField = $('#email-field');
const passwordField = $('#password-field');

on(emailField, 'blur', validateEmail);
on(passwordField, 'blur', validatePassword);

function validateEmail(e) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
  e.target.setAttribute('aria-invalid', !isValid);
}

function validatePassword(e) {
  const isValid = e.target.value.length >= 8 &&
                  /\d/.test(e.target.value) &&
                  /[!@#$%^&*]/.test(e.target.value);
  e.target.setAttribute('aria-invalid', !isValid);
}
</script>`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  width: 400,
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Email address <span style="color:red;">*</span>',
      name: 'email',
      vtype: 'email',
      allowBlank: false,
      afterBodyEl: '<div class="help-text">We\\'ll never share your email</div>',
      labelWidth: 120
    },
    {
      xtype: 'textfield',
      fieldLabel: 'Password <span style="color:red;">*</span>',
      name: 'password',
      inputType: 'password',
      allowBlank: false,
      minLength: 8,
      afterBodyEl: '<div class="help-text">At least 8 characters with numbers and symbols</div>',
      labelWidth: 120,
      validator: function(value) {
        if (!/\d/.test(value) || !/[!@#$%^&*]/.test(value)) {
          return 'Password must contain numbers and symbols';
        }
        return true;
      }
    }
  ],
  renderTo: Ext.getBody()
});`,
    typescript: `import {Labelled, TextField, FormLayout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface LabelBestPracticesProps {
  onSubmit?: FormSubmitHandler;
  validateOnChange?: boolean;
  customValidators?: CustomValidators;
}

interface FormData {
  email: string;
  password: string;
}

interface FormState {
  data: FormData;
  errors: ValidationErrors;
  touched: TouchedFields;
  isValid: boolean;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
}

interface FieldValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

interface CustomValidators {
  email?: FieldValidator;
  password?: FieldValidator;
}

type FieldValidator = (value: string) => FieldValidationResult;
type FormSubmitHandler = (data: FormData, isValid: boolean) => void;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LabelBestPractices({
  onSubmit,
  validateOnChange = true,
  customValidators
}: LabelBestPracticesProps): JSX.Element {
  const [state, setState] = useState<FormState>({
    data: { email: '', password: '' },
    errors: {},
    touched: { email: false, password: false },
    isValid: false
  });

  const validateEmail: FieldValidator = useCallback((email: string): FieldValidationResult => {
    if (customValidators?.email) {
      return customValidators.email(email);
    }

    if (!email) {
      return { isValid: false, errorMessage: 'Email is required' };
    }

    if (!EMAIL_REGEX.test(email)) {
      return { isValid: false, errorMessage: 'Please enter a valid email address' };
    }

    return { isValid: true };
  }, [customValidators]);

  const validatePassword: FieldValidator = useCallback((password: string): FieldValidationResult => {
    if (customValidators?.password) {
      return customValidators.password(password);
    }

    if (!password) {
      return { isValid: false, errorMessage: 'Password is required' };
    }

    if (password.length < 8) {
      return { isValid: false, errorMessage: 'Password must be at least 8 characters' };
    }

    if (!/\d/.test(password)) {
      return { isValid: false, errorMessage: 'Password must contain a number' };
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return { isValid: false, errorMessage: 'Password must contain a symbol' };
    }

    return { isValid: true };
  }, [customValidators]);

  const validateForm = useCallback((data: FormData): boolean => {
    const emailValidation = validateEmail(data.email);
    const passwordValidation = validatePassword(data.password);
    return emailValidation.isValid && passwordValidation.isValid;
  }, [validateEmail, validatePassword]);

  const handleEmailChange = useCallback((newEmail: string): void => {
    const emailValidation = validateEmail(newEmail);
    const newData: FormData = { ...state.data, email: newEmail };

    setState(prev => ({
      data: newData,
      errors: validateOnChange
        ? { ...prev.errors, email: emailValidation.errorMessage }
        : prev.errors,
      touched: { ...prev.touched, email: true },
      isValid: validateForm(newData)
    }));
  }, [state.data, validateOnChange, validateEmail, validateForm]);

  const handlePasswordChange = useCallback((newPassword: string): void => {
    const passwordValidation = validatePassword(newPassword);
    const newData: FormData = { ...state.data, password: newPassword };

    setState(prev => ({
      data: newData,
      errors: validateOnChange
        ? { ...prev.errors, password: passwordValidation.errorMessage }
        : prev.errors,
      touched: { ...prev.touched, password: true },
      isValid: validateForm(newData)
    }));

    if (state.isValid && onSubmit) {
      onSubmit(newData, state.isValid);
    }
  }, [state.data, state.isValid, validateOnChange, validatePassword, validateForm, onSubmit]);

  return (
    <FormLayout>
      <Labelled
        id="email-field"
        label="Email address"
        helpText="We'll never share your email"
        requiredIndicator
        error={state.touched.email ? state.errors.email : undefined}
      >
        <TextField
          type="email"
          value={state.data.email}
          onChange={handleEmailChange}
          autoComplete="email"
          error={Boolean(state.touched.email && state.errors.email)}
        />
      </Labelled>

      <Labelled
        id="password-field"
        label="Password"
        helpText="At least 8 characters with numbers and symbols"
        requiredIndicator
        error={state.touched.password ? state.errors.password : undefined}
      >
        <TextField
          type="password"
          value={state.data.password}
          onChange={handlePasswordChange}
          autoComplete="new-password"
          error={Boolean(state.touched.password && state.errors.password)}
        />
      </Labelled>
    </FormLayout>
  );
}

export default LabelBestPractices;`
  }
};


// InlineError Component Examples - Forms

export const inlineErrorExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {InlineError} from '@shopify/polaris';

function InlineErrorExample() {
  return (
    <InlineError
      message="Store name is required"
      fieldID="store-name"
    />
  );
}

export default InlineErrorExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-inline-error" id="store-name-error">
  <svg class="polaris-icon" viewBox="0 0 20 20">
    <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
  </svg>
  <span class="polaris-inline-error__text">Store name is required</span>
</div>

<script>
// Error is displayed inline with the field
const errorElement = document.getElementById('store-name-error');
console.log('Error displayed:', errorElement.textContent);
</script>`,
    extjs: `// ExtJS displays inline errors automatically with field validation
Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Store name',
  name: 'storeName',
  allowBlank: false,
  blankText: 'Store name is required',
  renderTo: Ext.getBody(),
  listeners: {
    validitychange: function(field, isValid) {
      if (!isValid) {
        field.markInvalid('Store name is required');
      }
    }
  }
});`,
    typescript: `import {InlineError} from '@shopify/polaris';
import {ReactElement} from 'react';

// Error severity levels
type ErrorSeverity = 'error' | 'warning' | 'info';

// Error state interface
interface FieldError {
  message: string;
  severity: ErrorSeverity;
  fieldID: string;
  timestamp?: Date;
}

// Error tracking for analytics
interface ErrorMetrics {
  errorCount: number;
  firstOccurred: Date;
  lastOccurred: Date;
  fieldID: string;
}

// Props with comprehensive error configuration
interface InlineErrorExampleProps {
  error: FieldError;
  onErrorDisplay?: (error: FieldError) => void;
  trackMetrics?: boolean;
  ariaLive?: 'polite' | 'assertive';
}

// Error display component with full typing
function InlineErrorExample({
  error,
  onErrorDisplay,
  trackMetrics = false,
  ariaLive = 'polite'
}: InlineErrorExampleProps): ReactElement {
  const metrics: ErrorMetrics = {
    errorCount: 1,
    firstOccurred: error.timestamp || new Date(),
    lastOccurred: error.timestamp || new Date(),
    fieldID: error.fieldID
  };

  // Track error display
  if (trackMetrics && onErrorDisplay) {
    onErrorDisplay(error);
  }

  return (
    <div role="alert" aria-live={ariaLive}>
      <InlineError
        message={error.message}
        fieldID={error.fieldID}
      />
    </div>
  );
}

// Example usage with typed error
const exampleError: FieldError = {
  message: 'Store name is required',
  severity: 'error',
  fieldID: 'store-name',
  timestamp: new Date()
};

export default InlineErrorExample;
export type { FieldError, ErrorSeverity, ErrorMetrics };`
  },

  withtextfield: {
    react: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function InlineErrorWithTextField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
    if (newValue.length === 0) {
      setError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newValue)) {
      setError('Please enter a valid email');
    } else {
      setError('');
    }
  }, []);

  return (
    <>
      <TextField
        label="Email"
        type="email"
        value={value}
        onChange={handleChange}
        error={Boolean(error)}
        id="email-field"
      />
      {error && <InlineError message={error} fieldID="email-field" />}
    </>
  );
}

export default InlineErrorWithTextField;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-text-field-wrapper">
  <label for="email-field" class="polaris-label">Email</label>
  <input
    type="email"
    id="email-field"
    class="polaris-text-field__input"
    aria-describedby="email-field-error"
  />
  <div class="polaris-inline-error" id="email-field-error" style="display: none;">
    <span class="polaris-inline-error__text"></span>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const input = $('#email-field');
const errorElement = $('#email-field-error');
const errorText = errorElement.querySelector('.polaris-inline-error__text');

on(input, 'blur', (e) => {
  const value = e.target.value;
  let error = '';

  if (value.length === 0) {
    error = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error = 'Please enter a valid email';
  }

  if (error) {
    errorText.textContent = error;
    errorElement.style.display = 'block';
    input.setAttribute('aria-invalid', 'true');
    input.classList.add('polaris-text-field__input--error');
  } else {
    errorElement.style.display = 'none';
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('polaris-text-field__input--error');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Email',
  name: 'email',
  vtype: 'email',
  allowBlank: false,
  msgTarget: 'under',
  invalidText: 'Please enter a valid email',
  blankText: 'Email is required',
  renderTo: Ext.getBody(),
  listeners: {
    blur: function(field) {
      field.validate();
    }
  }
});`,
    typescript: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback, ReactElement} from 'react';

// Validation result with detailed feedback
interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  severity: 'error' | 'warning' | 'info';
}

// Generic validator function type
type ValidatorFn<T> = (value: T) => ValidationResult;

// Field state tracking (value, interaction state, validation state)
interface FieldState<T = string> {
  value: T;
  touched: boolean;
  dirty: boolean;
  validating: boolean;
  validationResult?: ValidationResult;
}

// Email validation with comprehensive checks
const validateEmail: ValidatorFn<string> = (email: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!email || email.length === 0) {
    return {
      isValid: false,
      errors: ['Email is required'],
      warnings: [],
      severity: 'error'
    };
  }

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  // Check for common typos
  const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
  const domain = email.split('@')[1]?.toLowerCase();
  if (domain && !commonDomains.includes(domain)) {
    const similar = commonDomains.find(d =>
      d.substring(0, 3) === domain.substring(0, 3)
    );
    if (similar) {
      warnings.push(\`Did you mean @\${similar}?\`);
    }
  }

  // Length validation
  if (email.length > 254) {
    errors.push('Email address is too long (max 254 characters)');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    severity: errors.length > 0 ? 'error' : warnings.length > 0 ? 'warning' : 'info'
  };
};

// Phone number validation
const validatePhone: ValidatorFn<string> = (phone: string): ValidationResult => {
  const errors: string[] = [];
  const cleaned = phone.replace(/[\s()-]/g, '');

  if (!phone) {
    errors.push('Phone number is required');
  } else if (!/^\+?[1-9]\d{1,14}$/.test(cleaned)) {
    errors.push('Invalid phone number format');
  } else if (cleaned.length < 10) {
    errors.push('Phone number must be at least 10 digits');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
    severity: 'error'
  };
};

// URL validation
const validateURL: ValidatorFn<string> = (url: string): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!url) {
    errors.push('URL is required');
  } else {
    try {
      const urlObj = new URL(url);

      if (urlObj.protocol !== 'https:') {
        warnings.push('Consider using HTTPS for security');
      }
    } catch {
      errors.push('Please enter a valid URL');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    severity: errors.length > 0 ? 'error' : 'warning'
  };
};

// Component props with field state management
interface InlineErrorWithTextFieldProps {
  initialValue?: string;
  validator?: ValidatorFn<string>;
  fieldType?: 'email' | 'phone' | 'url' | 'text';
  onValidationChange?: (result: ValidationResult) => void;
  onFieldStateChange?: (state: FieldState) => void;
}

function InlineErrorWithTextField({
  initialValue = '',
  validator,
  fieldType = 'email',
  onValidationChange,
  onFieldStateChange
}: InlineErrorWithTextFieldProps): ReactElement {
  const [fieldState, setFieldState] = useState<FieldState>({
    value: initialValue,
    touched: false,
    dirty: false,
    validating: false,
    validationResult: undefined
  });

  // Select validator based on field type
  const getValidator = useCallback((): ValidatorFn<string> => {
    if (validator) return validator;

    switch (fieldType) {
      case 'email': return validateEmail;
      case 'phone': return validatePhone;
      case 'url': return validateURL;
      default: return (value) => ({
        isValid: value.length > 0,
        errors: value.length === 0 ? ['This field is required'] : [],
        warnings: [],
        severity: 'error'
      });
    }
  }, [validator, fieldType]);

  const handleChange = useCallback((newValue: string) => {
    const validatorFn = getValidator();
    const result = validatorFn(newValue);

    const newState: FieldState = {
      value: newValue,
      touched: true,
      dirty: newValue !== initialValue,
      validating: false,
      validationResult: result
    };

    setFieldState(newState);
    onValidationChange?.(result);
    onFieldStateChange?.(newState);
  }, [getValidator, initialValue, onValidationChange, onFieldStateChange]);

  const handleBlur = useCallback(() => {
    setFieldState(prev => ({
      ...prev,
      touched: true
    }));
  }, []);

  const primaryError = fieldState.validationResult?.errors[0];
  const hasWarning = (fieldState.validationResult?.warnings.length ?? 0) > 0;

  return (
    <>
      <TextField
        label={fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}
        type={fieldType === 'email' ? 'email' : fieldType === 'phone' ? 'tel' : fieldType === 'url' ? 'url' : 'text'}
        value={fieldState.value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={Boolean(fieldState.touched && primaryError)}
        id={\`\${fieldType}-field\`}
        autoComplete={fieldType}
      />
      {fieldState.touched && primaryError && (
        <InlineError message={primaryError} fieldID={\`\${fieldType}-field\`} />
      )}
      {fieldState.touched && hasWarning && !primaryError && fieldState.validationResult && (
        <div style={{ color: '#8A6116', marginTop: '4px', fontSize: '13px' }}>
          ⚠️ {fieldState.validationResult.warnings[0]}
        </div>
      )}
    </>
  );
}

export default InlineErrorWithTextField;
export type { ValidationResult, ValidatorFn, FieldState };`
  },

  multiplefielderrors: {
    react: `import {TextField, InlineError, FormLayout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function MultipleFieldErrors() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateName = useCallback((value: string) => {
    if (!value) {
      setNameError('Name is required');
    } else if (value.length < 2) {
      setNameError('Name must be at least 2 characters');
    } else {
      setNameError('');
    }
  }, []);

  const validateEmail = useCallback((value: string) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  }, []);

  return (
    <FormLayout>
      <div>
        <TextField
          label="Name"
          value={name}
          onChange={(v) => { setName(v); validateName(v); }}
          error={Boolean(nameError)}
          id="name-field"
        />
        {nameError && <InlineError message={nameError} fieldID="name-field" />}
      </div>

      <div>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); validateEmail(v); }}
          error={Boolean(emailError)}
          id="email-field"
        />
        {emailError && <InlineError message={emailError} fieldID="email-field" />}
      </div>
    </FormLayout>
  );
}

export default MultipleFieldErrors;`,
    vanilla: `<!-- HTML Structure -->
<form class="polaris-form-layout">
  <div class="polaris-form-group">
    <label for="name-field" class="polaris-label">Name</label>
    <input type="text" id="name-field" class="polaris-text-field__input" />
    <div class="polaris-inline-error" id="name-error" style="display: none;">
      <span class="polaris-inline-error__text"></span>
    </div>
  </div>

  <div class="polaris-form-group">
    <label for="email-field" class="polaris-label">Email</label>
    <input type="email" id="email-field" class="polaris-text-field__input" />
    <div class="polaris-inline-error" id="email-error" style="display: none;">
      <span class="polaris-inline-error__text"></span>
    </div>
  </div>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

function showError(fieldId, message) {
  const errorDiv = $(\`#\${fieldId}-error\`);
  const errorText = errorDiv.querySelector('.polaris-inline-error__text');
  errorText.textContent = message;
  errorDiv.style.display = 'block';
}

function hideError(fieldId) {
  const errorDiv = $(\`#\${fieldId}-error\`);
  errorDiv.style.display = 'none';
}

const nameField = $('#name-field');
const emailField = $('#email-field');

on(nameField, 'blur', (e) => {
  const value = e.target.value;
  if (!value) {
    showError('name', 'Name is required');
  } else if (value.length < 2) {
    showError('name', 'Name must be at least 2 characters');
  } else {
    hideError('name');
  }
});

on(emailField, 'blur', (e) => {
  const value = e.target.value;
  if (!value) {
    showError('email', 'Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError('email', 'Invalid email format');
  } else {
    hideError('email');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  width: 400,
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Name',
      name: 'name',
      allowBlank: false,
      minLength: 2,
      blankText: 'Name is required',
      minLengthText: 'Name must be at least 2 characters',
      msgTarget: 'under'
    },
    {
      xtype: 'textfield',
      fieldLabel: 'Email',
      name: 'email',
      vtype: 'email',
      allowBlank: false,
      blankText: 'Email is required',
      invalidText: 'Invalid email format',
      msgTarget: 'under'
    }
  ],
  renderTo: Ext.getBody()
});`,
    typescript: `import {TextField, InlineError, FormLayout} from '@shopify/polaris';
import {useState, useCallback, ReactElement} from 'react';

// Union type for all form fields
type FormField = 'email' | 'password' | 'name' | 'phone';

// Error map type for tracking errors by field
type ErrorMap = Record<FormField, string>;

// Form data with all field values
interface FormData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

// Form-level validation state
interface FormValidationState {
  errors: ErrorMap;
  touched: Record<FormField, boolean>;
  isValid: boolean;
  isDirty: boolean;
  fieldCount: number;
  errorCount: number;
}

// Field-specific validation result
interface FieldValidationResult {
  field: FormField;
  isValid: boolean;
  error: string;
}

// Validator function type for a specific field
type FieldValidator = (value: string, formData: FormData) => string;

// Validation rules map
type ValidationRules = Record<FormField, FieldValidator[]>;

// Email validator
const validateEmail: FieldValidator = (email: string): string => {
  if (!email) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address';
  }
  if (email.length > 254) return 'Email is too long';
  return '';
};

// Name validator
const validateName: FieldValidator = (name: string): string => {
  if (!name) return 'Name is required';
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 100) return 'Name is too long';
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return 'Name can only contain letters, spaces, hyphens, and apostrophes';
  }
  return '';
};

// Password validator with cross-field validation
const validatePassword: FieldValidator = (password: string): string => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
  if (!/\d/.test(password)) return 'Password must contain a number';
  return '';
};

// Phone validator
const validatePhone: FieldValidator = (phone: string): string => {
  if (!phone) return 'Phone number is required';
  const cleaned = phone.replace(/[\s()-]/g, '');
  if (!/^\+?[1-9]\d{9,14}$/.test(cleaned)) {
    return 'Please enter a valid phone number';
  }
  return '';
};

// Form-level validation (validates all fields and cross-field rules)
function validateForm(data: FormData): FormValidationState {
  const errors: ErrorMap = {
    email: validateEmail(data.email, data),
    password: validatePassword(data.password, data),
    name: validateName(data.name, data),
    phone: validatePhone(data.phone, data)
  };

  const errorCount = Object.values(errors).filter(e => e !== '').length;
  const fieldCount = Object.keys(errors).length;

  return {
    errors,
    touched: {
      email: false,
      password: false,
      name: false,
      phone: false
    },
    isValid: errorCount === 0,
    isDirty: false,
    fieldCount,
    errorCount
  };
}

interface MultipleFieldErrorsProps {
  initialData?: Partial<FormData>;
  onFormValidate?: (state: FormValidationState) => void;
  onFieldChange?: (field: FormField, value: string) => void;
  validateOnChange?: boolean;
}

function MultipleFieldErrors({
  initialData,
  onFormValidate,
  onFieldChange,
  validateOnChange = true
}: MultipleFieldErrorsProps): ReactElement {
  const [formData, setFormData] = useState<FormData>({
    email: initialData?.email || '',
    password: initialData?.password || '',
    name: initialData?.name || '',
    phone: initialData?.phone || ''
  });

  const [validationState, setValidationState] = useState<FormValidationState>(
    validateForm(formData)
  );

  // Update a single field and re-validate form
  const handleFieldChange = useCallback((field: FormField, value: string) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onFieldChange?.(field, value);

    if (validateOnChange) {
      const newState = validateForm(newFormData);
      newState.touched = { ...validationState.touched, [field]: true };
      newState.isDirty = true;
      setValidationState(newState);
      onFormValidate?.(newState);
    }
  }, [formData, validationState.touched, validateOnChange, onFieldChange, onFormValidate]);

  const handleBlur = useCallback((field: FormField) => {
    setValidationState(prev => ({
      ...prev,
      touched: { ...prev.touched, [field]: true }
    }));
  }, []);

  const shouldShowError = (field: FormField): boolean => {
    return validationState.touched[field] && Boolean(validationState.errors[field]);
  };

  return (
    <FormLayout>
      <div>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(v) => handleFieldChange('name', v)}
          onBlur={() => handleBlur('name')}
          error={shouldShowError('name')}
          id="name-field"
          autoComplete="name"
        />
        {shouldShowError('name') && (
          <InlineError message={validationState.errors.name} fieldID="name-field" />
        )}
      </div>

      <div>
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(v) => handleFieldChange('email', v)}
          onBlur={() => handleBlur('email')}
          error={shouldShowError('email')}
          id="email-field"
          autoComplete="email"
        />
        {shouldShowError('email') && (
          <InlineError message={validationState.errors.email} fieldID="email-field" />
        )}
      </div>

      <div>
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(v) => handleFieldChange('password', v)}
          onBlur={() => handleBlur('password')}
          error={shouldShowError('password')}
          id="password-field"
          autoComplete="new-password"
        />
        {shouldShowError('password') && (
          <InlineError message={validationState.errors.password} fieldID="password-field" />
        )}
      </div>

      <div>
        <TextField
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(v) => handleFieldChange('phone', v)}
          onBlur={() => handleBlur('phone')}
          error={shouldShowError('phone')}
          id="phone-field"
          autoComplete="tel"
        />
        {shouldShowError('phone') && (
          <InlineError message={validationState.errors.phone} fieldID="phone-field" />
        )}
      </div>
    </FormLayout>
  );
}

export default MultipleFieldErrors;
export type { FormField, ErrorMap, FormData, FormValidationState, FieldValidator };`
  },

  passwordvalidation: {
    react: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function PasswordValidation() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validatePassword = useCallback((value: string) => {
    if (value.length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else if (!/\d/.test(value)) {
      setPasswordError('Password must contain a number');
    } else if (!/[A-Z]/.test(value)) {
      setPasswordError('Password must contain an uppercase letter');
    } else {
      setPasswordError('');
    }
  }, []);

  const validateConfirm = useCallback((value: string) => {
    if (value !== password) {
      setConfirmError('Passwords do not match');
    } else {
      setConfirmError('');
    }
  }, [password]);

  return (
    <>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(v) => { setPassword(v); validatePassword(v); }}
          error={Boolean(passwordError)}
          id="password-field"
        />
        {passwordError && <InlineError message={passwordError} fieldID="password-field" />}
      </div>

      <div>
        <TextField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(v) => { setConfirmPassword(v); validateConfirm(v); }}
          error={Boolean(confirmError)}
          id="confirm-field"
        />
        {confirmError && <InlineError message={confirmError} fieldID="confirm-field" />}
      </div>
    </>
  );
}

export default PasswordValidation;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-group">
  <label for="password-field" class="polaris-label">Password</label>
  <input type="password" id="password-field" class="polaris-text-field__input" />
  <div class="polaris-inline-error" id="password-error" style="display: none;">
    <span class="polaris-inline-error__text"></span>
  </div>
</div>

<div class="polaris-form-group">
  <label for="confirm-field" class="polaris-label">Confirm password</label>
  <input type="password" id="confirm-field" class="polaris-text-field__input" />
  <div class="polaris-inline-error" id="confirm-error" style="display: none;">
    <span class="polaris-inline-error__text"></span>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const passwordField = $('#password-field');
const confirmField = $('#confirm-field');

function showError(fieldId, message) {
  const errorDiv = $(\`#\${fieldId}-error\`);
  errorDiv.querySelector('.polaris-inline-error__text').textContent = message;
  errorDiv.style.display = 'block';
}

function hideError(fieldId) {
  $(\`#\${fieldId}-error\`).style.display = 'none';
}

on(passwordField, 'blur', (e) => {
  const value = e.target.value;
  if (value.length < 8) {
    showError('password', 'Password must be at least 8 characters');
  } else if (!/\d/.test(value)) {
    showError('password', 'Password must contain a number');
  } else if (!/[A-Z]/.test(value)) {
    showError('password', 'Password must contain an uppercase letter');
  } else {
    hideError('password');
  }
});

on(confirmField, 'blur', (e) => {
  if (e.target.value !== passwordField.value) {
    showError('confirm', 'Passwords do not match');
  } else {
    hideError('confirm');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  width: 400,
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Password',
      name: 'password',
      inputType: 'password',
      id: 'password-field',
      allowBlank: false,
      minLength: 8,
      msgTarget: 'under',
      validator: function(value) {
        if (!/\d/.test(value)) return 'Password must contain a number';
        if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
        return true;
      }
    },
    {
      xtype: 'textfield',
      fieldLabel: 'Confirm password',
      name: 'confirmPassword',
      inputType: 'password',
      msgTarget: 'under',
      validator: function(value) {
        const password = Ext.getCmp('password-field').getValue();
        if (value !== password) return 'Passwords do not match';
        return true;
      }
    }
  ],
  renderTo: Ext.getBody()
});`,
    typescript: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback, ReactElement} from 'react';

// Password strength levels
enum PasswordStrength {
  VeryWeak = 0,
  Weak = 1,
  Fair = 2,
  Strong = 3,
  VeryStrong = 4
}

// Password validation requirements
interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  maxLength?: number;
  disallowCommon?: boolean;
}

// Password strength analysis result
interface PasswordStrengthAnalysis {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
  meetsRequirements: boolean;
  checks: {
    hasMinLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
    notCommon: boolean;
  };
}

// Common weak passwords to block
const COMMON_PASSWORDS = new Set([
  'password', '123456', '12345678', 'qwerty', 'abc123',
  'password123', 'admin', 'letmein', 'welcome', 'monkey'
]);

// Password strength calculation
function analyzePasswordStrength(
  password: string,
  requirements: PasswordRequirements
): PasswordStrengthAnalysis {
  const checks = {
    hasMinLength: password.length >= requirements.minLength,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    notCommon: requirements.disallowCommon
      ? !COMMON_PASSWORDS.has(password.toLowerCase())
      : true
  };

  const feedback: string[] = [];
  let score = 0;

  // Check each requirement
  if (!checks.hasMinLength) {
    feedback.push(\`Must be at least \${requirements.minLength} characters\`);
  } else {
    score += 1;
  }

  if (requirements.requireUppercase && !checks.hasUppercase) {
    feedback.push('Must contain an uppercase letter');
  } else if (checks.hasUppercase) {
    score += 1;
  }

  if (requirements.requireLowercase && !checks.hasLowercase) {
    feedback.push('Must contain a lowercase letter');
  } else if (checks.hasLowercase) {
    score += 1;
  }

  if (requirements.requireNumber && !checks.hasNumber) {
    feedback.push('Must contain a number');
  } else if (checks.hasNumber) {
    score += 1;
  }

  if (requirements.requireSpecialChar && !checks.hasSpecialChar) {
    feedback.push('Must contain a special character');
  } else if (checks.hasSpecialChar) {
    score += 1;
  }

  if (!checks.notCommon) {
    feedback.push('Password is too common');
    score = 0;
  }

  // Additional length bonus
  if (password.length >= requirements.minLength + 4) score += 1;
  if (password.length >= requirements.minLength + 8) score += 1;

  // Determine strength
  let strength: PasswordStrength;
  if (score === 0) strength = PasswordStrength.VeryWeak;
  else if (score <= 2) strength = PasswordStrength.Weak;
  else if (score <= 4) strength = PasswordStrength.Fair;
  else if (score <= 6) strength = PasswordStrength.Strong;
  else strength = PasswordStrength.VeryStrong;

  const meetsRequirements =
    checks.hasMinLength &&
    (!requirements.requireUppercase || checks.hasUppercase) &&
    (!requirements.requireLowercase || checks.hasLowercase) &&
    (!requirements.requireNumber || checks.hasNumber) &&
    (!requirements.requireSpecialChar || checks.hasSpecialChar) &&
    checks.notCommon;

  return { strength, score, feedback, meetsRequirements, checks };
}

// Password match validation
interface PasswordMatchResult {
  matches: boolean;
  error?: string;
}

function validatePasswordMatch(
  password: string,
  confirmPassword: string
): PasswordMatchResult {
  if (!confirmPassword) {
    return { matches: true };
  }

  if (password !== confirmPassword) {
    return {
      matches: false,
      error: 'Passwords do not match'
    };
  }

  return { matches: true };
}

interface PasswordValidationProps {
  requirements?: Partial<PasswordRequirements>;
  onPasswordChange?: (password: string, analysis: PasswordStrengthAnalysis) => void;
  onValidationComplete?: (isValid: boolean) => void;
  showStrengthIndicator?: boolean;
}

function PasswordValidation({
  requirements: customRequirements,
  onPasswordChange,
  onValidationComplete,
  showStrengthIndicator = true
}: PasswordValidationProps): ReactElement {
  const requirements: PasswordRequirements = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    disallowCommon: true,
    ...customRequirements
  };

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordAnalysis, setPasswordAnalysis] = useState<PasswordStrengthAnalysis | null>(null);
  const [matchResult, setMatchResult] = useState<PasswordMatchResult>({ matches: true });

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    const analysis = analyzePasswordStrength(value, requirements);
    setPasswordAnalysis(analysis);
    onPasswordChange?.(value, analysis);

    // Re-validate match
    if (confirmPassword) {
      const match = validatePasswordMatch(value, confirmPassword);
      setMatchResult(match);
      onValidationComplete?.(analysis.meetsRequirements && match.matches);
    } else {
      onValidationComplete?.(analysis.meetsRequirements);
    }
  }, [confirmPassword, requirements, onPasswordChange, onValidationComplete]);

  const handleConfirmChange = useCallback((value: string) => {
    setConfirmPassword(value);
    const match = validatePasswordMatch(password, value);
    setMatchResult(match);

    if (passwordAnalysis) {
      onValidationComplete?.(passwordAnalysis.meetsRequirements && match.matches);
    }
  }, [password, passwordAnalysis, onValidationComplete]);

  const primaryError = passwordAnalysis?.feedback[0];
  const strengthLabel = passwordAnalysis
    ? ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][passwordAnalysis.strength]
    : '';

  return (
    <>
      <div>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={Boolean(password && primaryError)}
          id="password-field"
          autoComplete="new-password"
          helpText={showStrengthIndicator && password ? \`Strength: \${strengthLabel}\` : undefined}
        />
        {password && primaryError && (
          <InlineError message={primaryError} fieldID="password-field" />
        )}
      </div>

      <div>
        <TextField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmChange}
          error={Boolean(confirmPassword && matchResult.error)}
          id="confirm-field"
          autoComplete="new-password"
        />
        {confirmPassword && matchResult.error && (
          <InlineError message={matchResult.error} fieldID="confirm-field" />
        )}
      </div>
    </>
  );
}

export default PasswordValidation;
export { PasswordStrength };
export type { PasswordRequirements, PasswordStrengthAnalysis, PasswordMatchResult };`
  },

  formsubmissionerrors: {
    react: `import {TextField, InlineError, Button, FormLayout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function FormSubmissionErrors() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({username: '', email: ''});

  const handleSubmit = useCallback(() => {
    const newErrors = {username: '', email: ''};

    if (!username) newErrors.username = 'Username is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.email) {
      alert('Form submitted successfully!');
    }
  }, [username, email]);

  return (
    <FormLayout>
      <div>
        <TextField
          label="Username"
          value={username}
          onChange={setUsername}
          error={Boolean(errors.username)}
          id="username-field"
        />
        {errors.username && <InlineError message={errors.username} fieldID="username-field" />}
      </div>

      <div>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={Boolean(errors.email)}
          id="email-field"
        />
        {errors.email && <InlineError message={errors.email} fieldID="email-field" />}
      </div>

      <Button onClick={handleSubmit} variant="primary">Submit</Button>
    </FormLayout>
  );
}

export default FormSubmissionErrors;`,
    vanilla: `<!-- HTML Structure -->
<form class="polaris-form-layout" id="submit-form">
  <div class="polaris-form-group">
    <label for="username-field" class="polaris-label">Username</label>
    <input type="text" id="username-field" class="polaris-text-field__input" />
    <div class="polaris-inline-error" id="username-error" style="display: none;">
      <span class="polaris-inline-error__text"></span>
    </div>
  </div>

  <div class="polaris-form-group">
    <label for="email-field" class="polaris-label">Email</label>
    <input type="email" id="email-field" class="polaris-text-field__input" />
    <div class="polaris-inline-error" id="email-error" style="display: none;">
      <span class="polaris-inline-error__text"></span>
    </div>
  </div>

  <button type="submit" class="polaris-button polaris-button--primary">Submit</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

const form = $('#submit-form');
const usernameField = $('#username-field');
const emailField = $('#email-field');

function showError(fieldId, message) {
  const errorDiv = $(\`#\${fieldId}-error\`);
  errorDiv.querySelector('.polaris-inline-error__text').textContent = message;
  errorDiv.style.display = 'block';
}

function hideError(fieldId) {
  $(\`#\${fieldId}-error\`).style.display = 'none';
}

on(form, 'submit', (e) => {
  e.preventDefault();

  hideError('username');
  hideError('email');

  let hasError = false;

  if (!usernameField.value) {
    showError('username', 'Username is required');
    hasError = true;
  }

  if (!emailField.value) {
    showError('email', 'Email is required');
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    showError('email', 'Invalid email format');
    hasError = true;
  }

  if (!hasError) {
    alert('Form submitted successfully!');
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  width: 400,
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Username',
      name: 'username',
      allowBlank: false,
      blankText: 'Username is required',
      msgTarget: 'under'
    },
    {
      xtype: 'textfield',
      fieldLabel: 'Email',
      name: 'email',
      vtype: 'email',
      allowBlank: false,
      blankText: 'Email is required',
      invalidText: 'Invalid email format',
      msgTarget: 'under'
    }
  ],
  buttons: [{
    text: 'Submit',
    formBind: true,
    handler: function() {
      const form = this.up('form').getForm();
      if (form.isValid()) {
        Ext.Msg.alert('Success', 'Form submitted successfully!');
      }
    }
  }],
  renderTo: Ext.getBody()
});`,
    typescript: `import {TextField, InlineError, Button, FormLayout} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface FormData {
  username: string;
  email: string;
}

interface FormErrors {
  username: string;
  email: string;
}

interface FormSubmissionErrorsProps {
  onSubmit?: (data: FormData) => Promise<void> | void;
  validateOnSubmit?: boolean;
}

function FormSubmissionErrors({
  onSubmit,
  validateOnSubmit = true
}: FormSubmissionErrorsProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    username: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {username: '', email: ''};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.email;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (validateOnSubmit && !validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateOnSubmit, validateForm, onSubmit]);

  return (
    <FormLayout>
      <div>
        <TextField
          label="Username"
          value={formData.username}
          onChange={(value) => setFormData(prev => ({...prev, username: value}))}
          error={Boolean(errors.username)}
          id="username-field"
          autoComplete="username"
        />
        {errors.username && <InlineError message={errors.username} fieldID="username-field" />}
      </div>

      <div>
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({...prev, email: value}))}
          error={Boolean(errors.email)}
          id="email-field"
          autoComplete="email"
        />
        {errors.email && <InlineError message={errors.email} fieldID="email-field" />}
      </div>

      <Button onClick={handleSubmit} variant="primary" loading={isSubmitting}>
        Submit
      </Button>
    </FormLayout>
  );
}

export default FormSubmissionErrors;`
  },

  realtimevalidation: {
    react: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

function RealtimeValidation() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!username) {
      setError('');
      return;
    }

    setIsChecking(true);
    const timer = setTimeout(() => {
      // Simulate API check
      if (username.length < 3) {
        setError('Username must be at least 3 characters');
      } else if (username === 'admin') {
        setError('Username is already taken');
      } else {
        setError('');
      }
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  return (
    <div>
      <TextField
        label="Username"
        value={username}
        onChange={setUsername}
        error={Boolean(error)}
        id="username-field"
        suffix={isChecking ? 'Checking...' : ''}
      />
      {error && <InlineError message={error} fieldID="username-field" />}
    </div>
  );
}

export default RealtimeValidation;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-group">
  <label for="username-field" class="polaris-label">Username</label>
  <div class="polaris-text-field__wrapper">
    <input type="text" id="username-field" class="polaris-text-field__input" />
    <span class="polaris-text-field__suffix" id="checking-indicator" style="display: none;">
      Checking...
    </span>
  </div>
  <div class="polaris-inline-error" id="username-error" style="display: none;">
    <span class="polaris-inline-error__text"></span>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const usernameField = $('#username-field');
const checkingIndicator = $('#checking-indicator');
const errorDiv = $('#username-error');
let validationTimer;

on(usernameField, 'input', (e) => {
  const value = e.target.value;

  clearTimeout(validationTimer);
  errorDiv.style.display = 'none';

  if (!value) return;

  checkingIndicator.style.display = 'block';

  validationTimer = setTimeout(() => {
    checkingIndicator.style.display = 'none';

    let error = '';
    if (value.length < 3) {
      error = 'Username must be at least 3 characters';
    } else if (value === 'admin') {
      error = 'Username is already taken';
    }

    if (error) {
      errorDiv.querySelector('.polaris-inline-error__text').textContent = error;
      errorDiv.style.display = 'block';
    }
  }, 500);
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Username',
  name: 'username',
  minLength: 3,
  msgTarget: 'under',
  validator: function(value) {
    if (!value) return true;
    if (value.length < 3) return 'Username must be at least 3 characters';
    if (value === 'admin') return 'Username is already taken';
    return true;
  },
  validateOnChange: true,
  validationDelay: 500,
  renderTo: Ext.getBody()
});`,
    typescript: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

interface RealtimeValidationProps {
  checkAvailability?: (username: string) => Promise<boolean>;
  minLength?: number;
  validationDelay?: number;
}

function RealtimeValidation({
  checkAvailability,
  minLength = 3,
  validationDelay = 500
}: RealtimeValidationProps): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const defaultCheckAvailability = useCallback(async (username: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    return username !== 'admin';
  }, []);

  useEffect(() => {
    if (!username) {
      setError('');
      return;
    }

    setIsChecking(true);
    const timer = setTimeout(async () => {
      if (username.length < minLength) {
        setError(\`Username must be at least \${minLength} characters\`);
        setIsChecking(false);
        return;
      }

      const checkFn = checkAvailability || defaultCheckAvailability;
      const isAvailable = await checkFn(username);

      if (!isAvailable) {
        setError('Username is already taken');
      } else {
        setError('');
      }
      setIsChecking(false);
    }, validationDelay);

    return () => {
      clearTimeout(timer);
      setIsChecking(false);
    };
  }, [username, minLength, validationDelay, checkAvailability, defaultCheckAvailability]);

  return (
    <div>
      <TextField
        label="Username"
        value={username}
        onChange={setUsername}
        error={Boolean(error)}
        id="username-field"
        suffix={isChecking ? 'Checking...' : ''}
        autoComplete="off"
      />
      {error && <InlineError message={error} fieldID="username-field" />}
    </div>
  );
}

export default RealtimeValidation;`
  },

  customfieldvalidation: {
    react: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function CustomFieldValidation() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const validatePhoneNumber = useCallback((value: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleaned = value.replace(/[\s()-]/g, '');

    if (!value) {
      setError('Phone number is required');
    } else if (!phoneRegex.test(cleaned)) {
      setError('Please enter a valid phone number');
    } else if (cleaned.length < 10) {
      setError('Phone number must be at least 10 digits');
    } else {
      setError('');
    }
  }, []);

  const handleChange = useCallback((value: string) => {
    setPhoneNumber(value);
    validatePhoneNumber(value);
  }, [validatePhoneNumber]);

  return (
    <div>
      <TextField
        label="Phone number"
        type="tel"
        value={phoneNumber}
        onChange={handleChange}
        error={Boolean(error)}
        id="phone-field"
        placeholder="+1 (555) 123-4567"
      />
      {error && <InlineError message={error} fieldID="phone-field" />}
    </div>
  );
}

export default CustomFieldValidation;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-group">
  <label for="phone-field" class="polaris-label">Phone number</label>
  <input
    type="tel"
    id="phone-field"
    class="polaris-text-field__input"
    placeholder="+1 (555) 123-4567"
  />
  <div class="polaris-inline-error" id="phone-error" style="display: none;">
    <span class="polaris-inline-error__text"></span>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const phoneField = $('#phone-field');
const errorDiv = $('#phone-error');

function validatePhoneNumber(value) {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const cleaned = value.replace(/[\s()-]/g, '');

  if (!value) return 'Phone number is required';
  if (!phoneRegex.test(cleaned)) return 'Please enter a valid phone number';
  if (cleaned.length < 10) return 'Phone number must be at least 10 digits';
  return '';
}

on(phoneField, 'blur', (e) => {
  const error = validatePhoneNumber(e.target.value);

  if (error) {
    errorDiv.querySelector('.polaris-inline-error__text').textContent = error;
    errorDiv.style.display = 'block';
  } else {
    errorDiv.style.display = 'none';
  }
});
</script>`,
    extjs: `Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Phone number',
  name: 'phone',
  allowBlank: false,
  blankText: 'Phone number is required',
  emptyText: '+1 (555) 123-4567',
  msgTarget: 'under',
  validator: function(value) {
    if (!value) return 'Phone number is required';

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleaned = value.replace(/[\s()-]/g, '');

    if (!phoneRegex.test(cleaned)) return 'Please enter a valid phone number';
    if (cleaned.length < 10) return 'Phone number must be at least 10 digits';

    return true;
  },
  renderTo: Ext.getBody()
});`,
    typescript: `import {TextField, InlineError} from '@shopify/polaris';
import {useState, useCallback} from 'react';

interface CustomFieldValidationProps {
  customValidator?: (value: string) => string;
  onValidationChange?: (isValid: boolean, value: string) => void;
}

function CustomFieldValidation({
  customValidator,
  onValidationChange
}: CustomFieldValidationProps): JSX.Element {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');

  const defaultValidator = useCallback((value: string): string => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    const cleaned = value.replace(/[\s()-]/g, '');

    if (!value) return 'Phone number is required';
    if (!phoneRegex.test(cleaned)) return 'Please enter a valid phone number';
    if (cleaned.length < 10) return 'Phone number must be at least 10 digits';
    return '';
  }, []);

  const validatePhoneNumber = useCallback((value: string): string => {
    return customValidator ? customValidator(value) : defaultValidator(value);
  }, [customValidator, defaultValidator]);

  const handleChange = useCallback((value: string) => {
    setPhoneNumber(value);
    const validationError = validatePhoneNumber(value);
    setError(validationError);
    onValidationChange?.(!validationError, value);
  }, [validatePhoneNumber, onValidationChange]);

  return (
    <div>
      <TextField
        label="Phone number"
        type="tel"
        value={phoneNumber}
        onChange={handleChange}
        error={Boolean(error)}
        id="phone-field"
        placeholder="+1 (555) 123-4567"
        autoComplete="tel"
      />
      {error && <InlineError message={error} fieldID="phone-field" />}
    </div>
  );
}

export default CustomFieldValidation;`
  },

  conditionalvalidation: {
    react: `import {TextField, InlineError, Checkbox} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function ConditionalValidation() {
  const [requiresShipping, setRequiresShipping] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('');
  const [error, setError] = useState('');

  const validateShipping = useCallback((value: string) => {
    if (requiresShipping && !value) {
      setError('Shipping address is required');
    } else if (requiresShipping && value.length < 10) {
      setError('Please enter a complete address');
    } else {
      setError('');
    }
  }, [requiresShipping]);

  const handleAddressChange = useCallback((value: string) => {
    setShippingAddress(value);
    validateShipping(value);
  }, [validateShipping]);

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setRequiresShipping(checked);
    if (checked) {
      validateShipping(shippingAddress);
    } else {
      setError('');
    }
  }, [shippingAddress, validateShipping]);

  return (
    <>
      <Checkbox
        label="Requires shipping"
        checked={requiresShipping}
        onChange={handleCheckboxChange}
      />

      {requiresShipping && (
        <div>
          <TextField
            label="Shipping address"
            value={shippingAddress}
            onChange={handleAddressChange}
            error={Boolean(error)}
            id="shipping-field"
            multiline={3}
          />
          {error && <InlineError message={error} fieldID="shipping-field" />}
        </div>
      )}
    </>
  );
}

export default ConditionalValidation;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-form-group">
  <label class="polaris-checkbox">
    <input type="checkbox" id="requires-shipping" />
    <span>Requires shipping</span>
  </label>
</div>

<div class="polaris-form-group" id="shipping-group" style="display: none;">
  <label for="shipping-field" class="polaris-label">Shipping address</label>
  <textarea
    id="shipping-field"
    class="polaris-text-field__input"
    rows="3"
  ></textarea>
  <div class="polaris-inline-error" id="shipping-error" style="display: none;">
    <span class="polaris-inline-error__text"></span>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const checkbox = $('#requires-shipping');
const shippingGroup = $('#shipping-group');
const shippingField = $('#shipping-field');
const errorDiv = $('#shipping-error');

on(checkbox, 'change', (e) => {
  if (e.target.checked) {
    shippingGroup.style.display = 'block';
    validateShipping();
  } else {
    shippingGroup.style.display = 'none';
    errorDiv.style.display = 'none';
  }
});

function validateShipping() {
  const value = shippingField.value;
  let error = '';

  if (checkbox.checked && !value) {
    error = 'Shipping address is required';
  } else if (checkbox.checked && value.length < 10) {
    error = 'Please enter a complete address';
  }

  if (error) {
    errorDiv.querySelector('.polaris-inline-error__text').textContent = error;
    errorDiv.style.display = 'block';
  } else {
    errorDiv.style.display = 'none';
  }
}

on(shippingField, 'blur', validateShipping);
</script>`,
    extjs: `Ext.create('Ext.form.Panel', {
  bodyPadding: 10,
  width: 400,
  items: [
    {
      xtype: 'checkbox',
      boxLabel: 'Requires shipping',
      name: 'requiresShipping',
      listeners: {
        change: function(checkbox, checked) {
          const addressField = checkbox.up('form').down('[name=shippingAddress]');
          addressField.setVisible(checked);
          addressField.setDisabled(!checked);
          if (checked) {
            addressField.validate();
          }
        }
      }
    },
    {
      xtype: 'textareafield',
      fieldLabel: 'Shipping address',
      name: 'shippingAddress',
      hidden: true,
      disabled: true,
      allowBlank: false,
      minLength: 10,
      blankText: 'Shipping address is required',
      minLengthText: 'Please enter a complete address',
      msgTarget: 'under'
    }
  ],
  renderTo: Ext.getBody()
});`,
    typescript: `import {TextField, InlineError, Checkbox} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

interface ConditionalValidationProps {
  initialRequiresShipping?: boolean;
  onValidationChange?: (isValid: boolean, data: {requiresShipping: boolean; shippingAddress: string}) => void;
}

function ConditionalValidation({
  initialRequiresShipping = false,
  onValidationChange
}: ConditionalValidationProps): JSX.Element {
  const [requiresShipping, setRequiresShipping] = useState<boolean>(initialRequiresShipping);
  const [shippingAddress, setShippingAddress] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateShipping = useCallback((value: string, shouldRequire: boolean): string => {
    if (shouldRequire && !value) {
      return 'Shipping address is required';
    }
    if (shouldRequire && value.length < 10) {
      return 'Please enter a complete address';
    }
    return '';
  }, []);

  useEffect(() => {
    const validationError = validateShipping(shippingAddress, requiresShipping);
    setError(validationError);
    const isValid = !requiresShipping || !validationError;
    onValidationChange?.(isValid, {requiresShipping, shippingAddress});
  }, [requiresShipping, shippingAddress, validateShipping, onValidationChange]);

  const handleAddressChange = useCallback((value: string) => {
    setShippingAddress(value);
  }, []);

  const handleCheckboxChange = useCallback((checked: boolean) => {
    setRequiresShipping(checked);
    if (!checked) {
      setShippingAddress('');
    }
  }, []);

  return (
    <>
      <Checkbox
        label="Requires shipping"
        checked={requiresShipping}
        onChange={handleCheckboxChange}
      />

      {requiresShipping && (
        <div>
          <TextField
            label="Shipping address"
            value={shippingAddress}
            onChange={handleAddressChange}
            error={Boolean(error)}
            id="shipping-field"
            multiline={3}
            autoComplete="off"
          />
          {error && <InlineError message={error} fieldID="shipping-field" />}
        </div>
      )}
    </>
  );
}

export default ConditionalValidation;`
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

export default RangeSliderExample;`,
  }
};

// Pagination Component Examples

export const formExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Form, FormLayout, TextField, Checkbox, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function FormExample() {
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', { email, newsletter });
    alert(\`Submitted! Email: \${email}\`);
  }, [email, newsletter]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Checkbox
          label="Subscribe to newsletter"
          checked={newsletter}
          onChange={setNewsletter}
        />
        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}

export default FormExample;`,

    vanilla: `<!-- HTML Form Structure -->
<form id="contact-form" class="polaris-form">
  <div class="form-field">
    <label for="email">Email address</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-field">
    <label>
      <input type="checkbox" id="newsletter" name="newsletter">
      Subscribe to newsletter
    </label>
  </div>

  <button type="submit" class="polaris-button polaris-button--primary">
    Submit
  </button>
</form>

<script>
import { $, on, EventBus } from '@cin7/vanilla-js';

const form = $('#contact-form');

on(form, 'submit', (e) => {
  e.preventDefault();

  const formData = {
    email: $('#email').value,
    newsletter: $('#newsletter').checked
  };

  // Emit form submission event
  EventBus.emit('form:submit', formData);

  console.log('Form submitted:', formData);
  alert(\`Submitted! Email: \${formData.email}\`);
});
</script>`,

    extjs: `// ExtJS Form Panel with validation
Ext.create('Ext.form.Panel', {
  renderTo: Ext.getBody(),
  title: 'Contact Form',
  width: 400,
  bodyPadding: 10,

  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Email address',
      name: 'email',
      vtype: 'email',
      allowBlank: false
    },
    {
      xtype: 'checkboxfield',
      fieldLabel: 'Newsletter',
      name: 'newsletter',
      inputValue: 'yes'
    }
  ],

  buttons: [
    {
      text: 'Submit',
      formBind: true,
      handler: function() {
        const form = this.up('form').getForm();
        if (form.isValid()) {
          const values = form.getValues();
          console.log('Form submitted:', values);
          Ext.Msg.alert('Success', 'Form submitted: ' + values.email);
        }
      }
    }
  ]
});`,

    typescript: `import { Form, FormLayout, TextField, Checkbox, Button, FormProps } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface FormData {
  email: string;
  newsletter: boolean;
}

interface FormExampleProps {
  onSubmit?: (data: FormData) => void;
  initialData?: Partial<FormData>;
}

function FormExample({ onSubmit, initialData = {} }: FormExampleProps): JSX.Element {
  const [email, setEmail] = useState<string>(initialData.email || '');
  const [newsletter, setNewsletter] = useState<boolean>(initialData.newsletter || false);

  const handleSubmit = useCallback<FormProps['onSubmit']>(() => {
    const formData: FormData = { email, newsletter };
    console.log('Form submitted:', formData);
    onSubmit?.(formData);
  }, [email, newsletter, onSubmit]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          required
        />
        <Checkbox
          label="Subscribe to newsletter"
          checked={newsletter}
          onChange={setNewsletter}
        />
        <Button submit>Submit</Button>
      </FormLayout>
    </Form>
  );
}

export default FormExample;`,
  },

  'with-validation': {
    react: `import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function FormWithValidation() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleSubmit = useCallback(() => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    alert('Form validated and submitted!');
    setErrors({});
  }, [email, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          required
        />
        <Button submit primary>Submit</Button>
      </FormLayout>
    </Form>
  );
}`,

    vanilla: `<form id="validated-form">
  <div class="form-field">
    <label for="email">Email</label>
    <input type="email" id="email" required>
    <span class="error" id="email-error"></span>
  </div>

  <div class="form-field">
    <label for="password">Password</label>
    <input type="password" id="password" required>
    <span class="error" id="password-error"></span>
  </div>

  <button type="submit">Submit</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

const form = $('#validated-form');

function validateEmail(value) {
  if (!value) return 'Email is required';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
    return 'Please enter a valid email';
  }
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  return '';
}

on(form, 'submit', (e) => {
  e.preventDefault();

  const email = $('#email').value;
  const password = $('#password').value;

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  $('#email-error').textContent = emailError;
  $('#password-error').textContent = passwordError;

  if (!emailError && !passwordError) {
    alert('Form validated and submitted!');
  }
});
</script>`,

    extjs: `Ext.create('Ext.form.Panel', {
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Email',
      name: 'email',
      vtype: 'email',
      allowBlank: false,
      msgTarget: 'under'
    },
    {
      xtype: 'textfield',
      fieldLabel: 'Password',
      inputType: 'password',
      name: 'password',
      allowBlank: false,
      minLength: 8,
      minLengthText: 'Password must be at least 8 characters',
      msgTarget: 'under'
    }
  ],
  buttons: [{
    text: 'Submit',
    formBind: true,
    handler: function() {
      const form = this.up('form').getForm();
      if (form.isValid()) {
        Ext.Msg.alert('Success', 'Form validated!');
      }
    }
  }]
});`,

    typescript: `import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface ValidationErrors {
  email?: string;
  password?: string;
}

function FormWithValidation(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (value: string): string => {
    if (!value) return 'Email is required';
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
      return 'Please enter a valid email';
    }
    return '';
  };

  const validatePassword = (value: string): string => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    return '';
  };

  const handleSubmit = useCallback(() => {
    const newErrors: ValidationErrors = {};
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert('Form validated and submitted!');
    }
  }, [email, password]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
          required
        />
        <Button submit primary>Submit</Button>
      </FormLayout>
    </Form>
  );
}`,
  },

  'server-validation': {
    react: `import { Form, FormLayout, TextField, Button, Banner } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function ServerValidationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setErrors({});
    setServerError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        setServerError('Please fix the errors and try again');
      } else {
        alert('Registration successful!');
      }
    } catch (error) {
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [username, email]);

  return (
    <>
      {serverError && (
        <Banner tone="critical" onDismiss={() => setServerError('')}>
          {serverError}
        </Banner>
      )}

      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Username"
            value={username}
            onChange={setUsername}
            error={errors.username}
            disabled={isSubmitting}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            disabled={isSubmitting}
          />
          <Button submit primary loading={isSubmitting}>
            Register
          </Button>
        </FormLayout>
      </Form>
    </>
  );
}`,

    vanilla: `<div id="banner-container"></div>
<form id="server-form">
  <input type="text" id="username" placeholder="Username">
  <span id="username-error"></span>

  <input type="email" id="email" placeholder="Email">
  <span id="email-error"></span>

  <button type="submit" id="submit-btn">Register</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

const form = $('#server-form');
const submitBtn = $('#submit-btn');

on(form, 'submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: $('#username').value,
        email: $('#email').value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      $('#username-error').textContent = data.errors?.username || '';
      $('#email-error').textContent = data.errors?.email || '';
    } else {
      alert('Registration successful!');
    }
  } catch (error) {
    alert('An error occurred');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Register';
  }
});
</script>`,

    extjs: `Ext.create('Ext.form.Panel', {
  items: [
    { xtype: 'textfield', fieldLabel: 'Username', name: 'username' },
    { xtype: 'textfield', fieldLabel: 'Email', name: 'email', vtype: 'email' }
  ],
  buttons: [{
    text: 'Register',
    handler: function() {
      const form = this.up('form').getForm();
      if (form.isValid()) {
        form.submit({
          url: '/api/register',
          waitMsg: 'Submitting...',
          success: function() {
            Ext.Msg.alert('Success', 'Registration successful!');
          },
          failure: function(form, action) {
            const errors = action.result?.errors || {};
            form.getFields().each(field => {
              if (errors[field.name]) {
                field.markInvalid(errors[field.name]);
              }
            });
          }
        });
      }
    }
  }]
});`,

    typescript: `import { Form, FormLayout, TextField, Button, Banner } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface ServerErrors {
  [key: string]: string;
}

interface ApiResponse {
  success: boolean;
  errors?: ServerErrors;
}

function ServerValidationForm(): JSX.Element {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errors, setErrors] = useState<ServerErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>('');

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setErrors({});
    setServerError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email })
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        setServerError('Please fix the errors and try again');
      } else {
        alert('Registration successful!');
      }
    } catch (error) {
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [username, email]);

  return (
    <>
      {serverError && (
        <Banner tone="critical" onDismiss={() => setServerError('')}>
          {serverError}
        </Banner>
      )}

      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Username"
            value={username}
            onChange={setUsername}
            error={errors.username}
            disabled={isSubmitting}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            disabled={isSubmitting}
          />
          <Button submit primary loading={isSubmitting}>
            Register
          </Button>
        </FormLayout>
      </Form>
    </>
  );
}`,
  },

  'implicit-submit': {
    react: `import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function ImplicitSubmitForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = useCallback(async () => {
    console.log('Searching for:', searchQuery);
    // Simulate search
    setResults(['Result 1', 'Result 2', 'Result 3']);
  }, [searchQuery]);

  return (
    <Form onSubmit={handleSubmit} implicitSubmit>
      <FormLayout>
        <TextField
          label="Search"
          labelHidden
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Press Enter to search..."
          type="search"
          autoComplete="off"
        />
        <Button submit primary>Search</Button>
      </FormLayout>
    </Form>
  );
}`,

    vanilla: `<form id="search-form">
  <input
    type="search"
    id="search-input"
    placeholder="Press Enter to search..."
    autocomplete="off"
  >
  <button type="submit">Search</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

const form = $('#search-form');

on(form, 'submit', (e) => {
  e.preventDefault();
  const query = $('#search-input').value;
  console.log('Searching for:', query);
  // Perform search
});

// Also trigger on Enter key
on($('#search-input'), 'keypress', (e) => {
  if (e.key === 'Enter') {
    form.dispatchEvent(new Event('submit'));
  }
});
</script>`,

    extjs: `Ext.create('Ext.form.Panel', {
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Search',
    name: 'query',
    emptyText: 'Press Enter to search...',
    enableKeyEvents: true,
    listeners: {
      specialkey: function(field, e) {
        if (e.getKey() === e.ENTER) {
          this.up('form').submit();
        }
      }
    }
  }],
  buttons: [{
    text: 'Search',
    handler: function() {
      this.up('form').submit();
    }
  }],
  listeners: {
    submit: function() {
      console.log('Searching...');
    }
  }
});`,

    typescript: `import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface SearchResult {
  id: string;
  title: string;
}

function ImplicitSubmitForm(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSubmit = useCallback(async () => {
    console.log('Searching for:', searchQuery);
    // Simulate search
    const mockResults: SearchResult[] = [
      { id: '1', title: 'Result 1' },
      { id: '2', title: 'Result 2' },
    ];
    setResults(mockResults);
  }, [searchQuery]);

  return (
    <Form onSubmit={handleSubmit} implicitSubmit>
      <FormLayout>
        <TextField
          label="Search"
          labelHidden
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Press Enter to search..."
          type="search"
          autoComplete="off"
        />
        <Button submit primary>Search</Button>
      </FormLayout>
    </Form>
  );
}`,
  },

  'multi-step': {
    react: `import { Form, FormLayout, TextField, Button, ProgressBar, Badge } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: ''
  });
  const [errors, setErrors] = useState({});

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
    } else if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = useCallback(() => {
    if (validateStep(step)) setStep(step + 1);
  }, [step, formData]);

  const handleSubmit = useCallback(() => {
    if (validateStep(step)) {
      alert('Form completed!');
      setStep(1);
    }
  }, [step, formData]);

  return (
    <>
      <ProgressBar progress={(step / 2) * 100} size="small" />
      <Form onSubmit={step === 2 ? handleSubmit : handleNext}>
        <FormLayout>
          {step === 1 && (
            <>
              <TextField label="Name" value={formData.name}
                onChange={(v) => setFormData({...formData, name: v})}
                error={errors.name} />
              <TextField label="Email" value={formData.email}
                onChange={(v) => setFormData({...formData, email: v})}
                error={errors.email} />
            </>
          )}
          {step === 2 && (
            <>
              <TextField label="Address" value={formData.address}
                onChange={(v) => setFormData({...formData, address: v})}
                error={errors.address} />
              <TextField label="City" value={formData.city}
                onChange={(v) => setFormData({...formData, city: v})} />
            </>
          )}
          <Button submit primary>{step === 2 ? 'Submit' : 'Next'}</Button>
        </FormLayout>
      </Form>
    </>
  );
}`,

    vanilla: `<div id="progress"></div>
<form id="multi-step-form">
  <div id="step-1" class="step">
    <input type="text" id="name" placeholder="Name">
    <input type="email" id="email" placeholder="Email">
  </div>
  <div id="step-2" class="step" style="display: none;">
    <input type="text" id="address" placeholder="Address">
    <input type="text" id="city" placeholder="City">
  </div>
  <button type="button" id="next-btn">Next</button>
  <button type="submit" id="submit-btn" style="display: none;">Submit</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

let currentStep = 1;

on($('#next-btn'), 'click', () => {
  $('#step-1').style.display = 'none';
  $('#step-2').style.display = 'block';
  $('#next-btn').style.display = 'none';
  $('#submit-btn').style.display = 'block';
  currentStep = 2;
});

on($('#multi-step-form'), 'submit', (e) => {
  e.preventDefault();
  alert('Form completed!');
});
</script>`,

    extjs: `Ext.create('Ext.form.Panel', {
  layout: 'card',
  activeItem: 0,
  items: [
    {
      title: 'Step 1',
      items: [
        { xtype: 'textfield', fieldLabel: 'Name', name: 'name' },
        { xtype: 'textfield', fieldLabel: 'Email', name: 'email' }
      ]
    },
    {
      title: 'Step 2',
      items: [
        { xtype: 'textfield', fieldLabel: 'Address', name: 'address' },
        { xtype: 'textfield', fieldLabel: 'City', name: 'city' }
      ]
    }
  ],
  buttons: [
    {
      text: 'Previous',
      handler: function() {
        const layout = this.up('form').getLayout();
        layout.prev();
      }
    },
    {
      text: 'Next',
      handler: function() {
        const panel = this.up('form');
        const layout = panel.getLayout();
        const activeItem = layout.getActiveItem();

        if (activeItem.isLast) {
          panel.submit();
        } else {
          layout.next();
        }
      }
    }
  ]
});`,

    typescript: `import { Form, FormLayout, TextField, Button, ProgressBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface FormData {
  name: string;
  email: string;
  address: string;
  city: string;
}

type StepErrors = Partial<Record<keyof FormData, string>>;

function MultiStepForm(): JSX.Element {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', address: '', city: ''
  });
  const [errors, setErrors] = useState<StepErrors>({});

  const validateStep = (currentStep: number): boolean => {
    const newErrors: StepErrors = {};
    if (currentStep === 1) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
    } else if (currentStep === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = useCallback(() => {
    if (validateStep(step)) setStep(step + 1);
  }, [step, formData]);

  const handleSubmit = useCallback(() => {
    if (validateStep(step)) {
      alert('Form completed!');
      setStep(1);
    }
  }, [step, formData]);

  return (
    <>
      <ProgressBar progress={(step / 2) * 100} size="small" />
      <Form onSubmit={step === 2 ? handleSubmit : handleNext}>
        <FormLayout>
          {step === 1 && (
            <>
              <TextField
                label="Name"
                value={formData.name}
                onChange={(v) => setFormData({...formData, name: v})}
                error={errors.name}
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(v) => setFormData({...formData, email: v})}
                error={errors.email}
              />
            </>
          )}
          {step === 2 && (
            <>
              <TextField
                label="Address"
                value={formData.address}
                onChange={(v) => setFormData({...formData, address: v})}
                error={errors.address}
              />
              <TextField
                label="City"
                value={formData.city}
                onChange={(v) => setFormData({...formData, city: v})}
              />
            </>
          )}
          <Button submit primary>{step === 2 ? 'Submit' : 'Next'}</Button>
        </FormLayout>
      </Form>
    </>
  );
}`,
  },

  'with-layout': {
    react: `import { Form, FormLayout, TextField, Select, Button } from '@shopify/polaris';
import { useState } from 'react';

function FormWithLayout() {
  const [formData, setFormData] = useState({
    name: '', sku: '', price: '', category: '', description: ''
  });

  const handleSubmit = () => {
    console.log('Product saved:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Product name"
          value={formData.name}
          onChange={(v) => setFormData({...formData, name: v})}
        />

        <FormLayout.Group>
          <TextField
            label="SKU"
            value={formData.sku}
            onChange={(v) => setFormData({...formData, sku: v})}
          />
          <Select
            label="Category"
            options={[
              {label: 'Electronics', value: 'electronics'},
              {label: 'Clothing', value: 'clothing'}
            ]}
            value={formData.category}
            onChange={(v) => setFormData({...formData, category: v})}
          />
        </FormLayout.Group>

        <TextField
          label="Price"
          type="number"
          value={formData.price}
          onChange={(v) => setFormData({...formData, price: v})}
          prefix="$"
        />

        <TextField
          label="Description"
          multiline={4}
          value={formData.description}
          onChange={(v) => setFormData({...formData, description: v})}
        />

        <Button submit primary>Save Product</Button>
      </FormLayout>
    </Form>
  );
}`,

    vanilla: `<form id="product-form">
  <input type="text" id="name" placeholder="Product name">

  <div class="form-group">
    <input type="text" id="sku" placeholder="SKU">
    <select id="category">
      <option value="electronics">Electronics</option>
      <option value="clothing">Clothing</option>
    </select>
  </div>

  <input type="number" id="price" placeholder="Price" step="0.01">

  <textarea id="description" rows="4" placeholder="Description"></textarea>

  <button type="submit">Save Product</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

on($('#product-form'), 'submit', (e) => {
  e.preventDefault();
  const formData = {
    name: $('#name').value,
    sku: $('#sku').value,
    category: $('#category').value,
    price: $('#price').value,
    description: $('#description').value
  };
  console.log('Product saved:', formData);
});
</script>`,

    extjs: `Ext.create('Ext.form.Panel', {
  title: 'Product Details',
  bodyPadding: 10,
  items: [
    {
      xtype: 'textfield',
      fieldLabel: 'Product name',
      name: 'name',
      anchor: '100%'
    },
    {
      xtype: 'fieldcontainer',
      layout: 'hbox',
      items: [
        {
          xtype: 'textfield',
          fieldLabel: 'SKU',
          name: 'sku',
          flex: 1
        },
        {
          xtype: 'combo',
          fieldLabel: 'Category',
          name: 'category',
          store: ['Electronics', 'Clothing'],
          flex: 1
        }
      ]
    },
    {
      xtype: 'numberfield',
      fieldLabel: 'Price',
      name: 'price',
      decimalPrecision: 2
    },
    {
      xtype: 'textareafield',
      fieldLabel: 'Description',
      name: 'description',
      rows: 4
    }
  ],
  buttons: [{
    text: 'Save Product',
    handler: function() {
      const values = this.up('form').getValues();
      console.log('Product saved:', values);
    }
  }]
});`,

    typescript: `import { Form, FormLayout, TextField, Select, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface ProductData {
  name: string;
  sku: string;
  price: string;
  category: string;
  description: string;
}

function FormWithLayout(): JSX.Element {
  const [formData, setFormData] = useState<ProductData>({
    name: '', sku: '', price: '', category: '', description: ''
  });

  const handleSubmit = useCallback(() => {
    console.log('Product saved:', formData);
  }, [formData]);

  const updateField = <K extends keyof ProductData>(field: K, value: ProductData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Product name"
          value={formData.name}
          onChange={(v) => updateField('name', v)}
        />

        <FormLayout.Group>
          <TextField
            label="SKU"
            value={formData.sku}
            onChange={(v) => updateField('sku', v)}
          />
          <Select
            label="Category"
            options={[
              {label: 'Electronics', value: 'electronics'},
              {label: 'Clothing', value: 'clothing'}
            ]}
            value={formData.category}
            onChange={(v) => updateField('category', v)}
          />
        </FormLayout.Group>

        <TextField
          label="Price"
          type="number"
          value={formData.price}
          onChange={(v) => updateField('price', v)}
          prefix="$"
        />

        <TextField
          label="Description"
          multiline={4}
          value={formData.description}
          onChange={(v) => updateField('description', v)}
        />

        <Button submit primary>Save Product</Button>
      </FormLayout>
    </Form>
  );
}`,
  },

  'disabled': {
    react: `import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState } from 'react';

function DisabledForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Published!');
    setIsLoading(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          disabled={isLoading}
          required
        />
        <TextField
          label="Content"
          multiline={8}
          value={content}
          onChange={setContent}
          disabled={isLoading}
          required
        />
        <Button submit primary loading={isLoading} disabled={isLoading}>
          {isLoading ? 'Publishing...' : 'Publish'}
        </Button>
      </FormLayout>
    </Form>
  );
}`,

    vanilla: `<form id="publish-form">
  <input type="text" id="title" placeholder="Title" required>
  <textarea id="content" rows="8" placeholder="Content" required></textarea>
  <button type="submit" id="publish-btn">Publish</button>
</form>

<script>
import { $, on } from '@cin7/vanilla-js';

const form = $('#publish-form');
const btn = $('#publish-btn');
const inputs = form.querySelectorAll('input, textarea');

on(form, 'submit', async (e) => {
  e.preventDefault();

  btn.disabled = true;
  btn.textContent = 'Publishing...';
  inputs.forEach(input => input.disabled = true);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));

  alert('Published!');
  btn.disabled = false;
  btn.textContent = 'Publish';
  inputs.forEach(input => input.disabled = false);
});
</script>`,

    extjs: `Ext.create('Ext.form.Panel', {
  items: [
    { xtype: 'textfield', fieldLabel: 'Title', name: 'title' },
    { xtype: 'textareafield', fieldLabel: 'Content', name: 'content', rows: 8 }
  ],
  buttons: [{
    text: 'Publish',
    handler: function() {
      const form = this.up('form');
      const btn = this;

      // Disable form
      form.setLoading('Publishing...');
      btn.disable();

      // Simulate API call
      setTimeout(() => {
        Ext.Msg.alert('Success', 'Published!');
        form.setLoading(false);
        btn.enable();
      }, 2000);
    }
  }]
});`,

    typescript: `import { Form, FormLayout, TextField, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function DisabledForm(): JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Published!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          disabled={isLoading}
          required
        />
        <TextField
          label="Content"
          multiline={8}
          value={content}
          onChange={setContent}
          disabled={isLoading}
          required
        />
        <Button submit primary loading={isLoading} disabled={isLoading}>
          {isLoading ? 'Publishing...' : 'Publish'}
        </Button>
      </FormLayout>
    </Form>
  );
}`,
  },
};

// Integration Examples Code Variants

