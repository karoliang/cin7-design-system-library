# Vanilla JS Components

The new Vanilla JS component system provides reusable, class-based components that offer a clean API and consistent behavior across your application.

## Overview

Components are built on a base `Component` class that provides:
- Event subscription/unsubscription pattern
- State management
- Lifecycle methods
- DOM manipulation helpers
- TypeScript support

## CheckboxComponent

The `CheckboxComponent` is the first implementation following this pattern.

### Basic Usage

```javascript
import { CheckboxComponent } from '@cin7/vanilla-js';

// Create a checkbox
const checkbox = new CheckboxComponent({
  label: 'Subscribe to newsletter',
  checked: false,
  onCheck: () => console.log('Checked!'),
  onUncheck: () => console.log('Unchecked!')
});

// Mount to DOM
checkbox.mount('#container');
```

### API Reference

#### Constructor Options

```typescript
interface CheckboxOptions {
  label: string;              // Required: The checkbox label text
  checked?: boolean;          // Optional: Initial checked state (default: false)
  disabled?: boolean;         // Optional: Initial disabled state (default: false)
  onCheck?: (value: boolean) => void;    // Optional: Check event callback
  onUncheck?: (value: boolean) => void;  // Optional: Uncheck event callback
}
```

#### Methods

- `get(): boolean` - Get current checked state
- `set(value: boolean): void` - Set checked state programmatically
- `setDisabled(disabled: boolean): void` - Enable/disable the checkbox
- `isDisabled(): boolean` - Check if checkbox is disabled
- `setLabel(label: string): void` - Update the label text
- `getLabel(): string` - Get current label text
- `focus(): void` - Focus the checkbox input
- `blur(): void` - Remove focus from checkbox

#### Event Subscriptions

```javascript
// Subscribe to check event
const unsubscribeCheck = checkbox.onCheck(() => {
  console.log('Checkbox was checked');
});

// Subscribe to uncheck event  
const unsubscribeUncheck = checkbox.onUncheck(() => {
  console.log('Checkbox was unchecked');
});

// Subscribe to any change
const unsubscribeChange = checkbox.onChange((checked) => {
  console.log('New value:', checked);
});

// Later: unsubscribe
unsubscribeCheck();
unsubscribeUncheck();
unsubscribeChange();
```

### Styling

The component uses BEM-style CSS classes that work with the design tokens:

```css
.checkbox-field {}
.checkbox-field__input {}
.checkbox-field__label {}
.checkbox-field__box {}
.checkbox-field__icon {}
.checkbox-field__text {}
```

### Examples

#### Form with Multiple Checkboxes

```javascript
const preferences = {
  email: new CheckboxComponent({ label: 'Email notifications', checked: true }),
  sms: new CheckboxComponent({ label: 'SMS notifications' }),
  push: new CheckboxComponent({ label: 'Push notifications' })
};

// Mount all
Object.entries(preferences).forEach(([key, checkbox]) => {
  checkbox.mount(`#${key}-container`);
});

// Get all values
function getPreferences() {
  return Object.entries(preferences).reduce((acc, [key, checkbox]) => {
    acc[key] = checkbox.get();
    return acc;
  }, {});
}
```

#### Dynamic State Management

```javascript
const termsCheckbox = new CheckboxComponent({
  label: 'I agree to the terms and conditions',
  onChange: (checked) => {
    submitButton.disabled = !checked;
  }
});

// Disable after 3 failed attempts
let attempts = 0;
form.addEventListener('submit', (e) => {
  if (!isValid()) {
    attempts++;
    if (attempts >= 3) {
      termsCheckbox.setDisabled(true);
      termsCheckbox.setLabel('Too many failed attempts. Please contact support.');
    }
  }
});
```

## Component Base Class

All components extend the base `Component` class:

```typescript
abstract class Component<T = any> {
  // Lifecycle
  protected abstract createElement(): HTMLElement;
  protected init(): void;
  
  // State management
  abstract get(): T;
  abstract set(value: T): void;
  
  // Events
  on(event: string, listener: EventListener): () => void;
  protected emit(event: string, value?: any): void;
  
  // DOM operations
  mount(parent: HTMLElement | string): void;
  unmount(): void;
  getElement(): HTMLElement;
  
  // Common functionality
  setDisabled(disabled: boolean): void;
  isDisabled(): boolean;
  destroy(): void;
}
```

## Available Components

### Form Components

#### RadioButtonComponent & RadioGroupComponent

Single selection from multiple options.

```javascript
// Individual radio button
const radio = new RadioButtonComponent({
  label: 'Option 1',
  value: 'option1',
  name: 'options',
  onChange: (value) => console.log('Selected:', value)
});

// Radio group for easier management
const radioGroup = new RadioGroupComponent({
  name: 'shipping',
  options: [
    { label: 'Standard Shipping', value: 'standard' },
    { label: 'Express Shipping', value: 'express' },
    { label: 'Overnight', value: 'overnight' }
  ],
  defaultValue: 'standard',
  onChange: (value) => console.log('Shipping method:', value)
});
```

#### TextFieldComponent

Text input with validation, error handling, and various input types.

```javascript
const emailField = new TextFieldComponent({
  label: 'Email Address',
  type: 'email',
  placeholder: 'you@example.com',
  required: true,
  helpText: 'We\'ll use this to contact you',
  onChange: (value) => console.log('Email:', value)
});

// Validate on blur
emailField.on('blur', () => {
  if (!emailField.validate()) {
    emailField.setError('Please enter a valid email');
  }
});
```

#### SelectComponent

Dropdown selection with dynamic options.

```javascript
const countrySelect = new SelectComponent({
  label: 'Country',
  placeholder: 'Select a country',
  options: [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'Mexico', value: 'MX' }
  ],
  required: true,
  onChange: (value) => console.log('Country selected:', value)
});

// Add options dynamically
countrySelect.addOption({ label: 'Brazil', value: 'BR' });
```

### Action Components

#### ButtonComponent

Versatile button with variants, sizes, and states.

```javascript
const saveButton = new ButtonComponent({
  label: 'Save Changes',
  variant: 'primary',
  onClick: async () => {
    saveButton.setLoading(true);
    await saveData();
    saveButton.setLoading(false);
  }
});

// Icon-only button
const deleteButton = new ButtonComponent({
  label: '✕',
  iconOnly: true,
  variant: 'critical',
  accessibilityLabel: 'Delete item',
  onClick: () => confirmDelete()
});
```

#### ButtonGroupComponent

Group buttons together, with optional segmented style.

```javascript
// Segmented button group (like toggle buttons)
const textFormatting = new ButtonGroupComponent({
  variant: 'segmented',
  buttons: [
    { label: 'Bold', value: 'bold' },
    { label: 'Italic', value: 'italic' },
    { label: 'Underline', value: 'underline' }
  ],
  allowMultiple: true,
  onChange: (values) => applyFormatting(values)
});

// Regular button group
const formActions = new ButtonGroupComponent({
  buttons: [
    { label: 'Cancel', variant: 'secondary' },
    { label: 'Save', variant: 'primary' }
  ]
});

### Overlay Components

#### ModalComponent

Modal dialogs for confirmations, forms, and content display.

```javascript
const modal = new ModalComponent({
  title: 'Delete Item',
  content: 'Are you sure you want to delete this item? This action cannot be undone.',
  size: 'small',
  primaryAction: {
    label: 'Delete',
    variant: 'critical',
    onClick: async () => {
      await deleteItem();
      modal.close();
      Toast.success('Item deleted');
    }
  },
  secondaryActions: [{
    label: 'Cancel',
    onClick: () => modal.close()
  }],
  closeOnBackdropClick: true,
  closeOnEscape: true
});

// Show modal
modal.mount();
modal.open();

// Helper functions
import { confirm, alert } from '@cin7/vanilla-js';

// Confirmation dialog
const confirmed = await confirm({
  title: 'Confirm Action',
  message: 'Proceed with this action?',
  confirmLabel: 'Yes, proceed',
  cancelLabel: 'Cancel',
  dangerous: true
});

// Alert dialog
await alert({
  title: 'Success',
  message: 'Your changes have been saved.',
  buttonLabel: 'OK'
});
```

#### ToastComponent

Non-intrusive notifications with auto-dismiss and actions.

```javascript
// Individual toast
const toast = new ToastComponent({
  message: 'File uploaded successfully',
  variant: 'success',
  duration: 5000,
  action: {
    label: 'View',
    onClick: () => navigateToFile()
  }
});
toast.mount();
toast.show();

// Using Toast manager
import { Toast } from '@cin7/vanilla-js';

// Success toast
Toast.success('Changes saved');

// Error toast with longer duration
Toast.error('Failed to save changes. Please try again.', {
  duration: 10000
});

// Warning with action
Toast.warning('Your session will expire in 5 minutes', {
  action: {
    label: 'Extend',
    onClick: () => extendSession()
  }
});

// Dismiss all toasts
Toast.dismissAll();
```

## Component Patterns

### Common Methods

All components share these common methods:

- `mount(parent)` - Mount component to DOM
- `unmount()` - Remove from DOM
- `getElement()` - Get the root DOM element
- `setDisabled(disabled)` - Enable/disable component
- `isDisabled()` - Check disabled state
- `on(event, listener)` - Subscribe to events (returns unsubscribe function)
- `destroy()` - Clean up and remove all listeners

### Event Handling

All components use a consistent event pattern:

```javascript
// Subscribe to events
const unsubscribe = component.on('change', (value) => {
  console.log('Value changed:', value);
});

// Unsubscribe later
unsubscribe();

// Multiple subscriptions
const listeners = [
  component.on('focus', () => console.log('Focused')),
  component.on('blur', () => console.log('Blurred')),
  component.on('change', (value) => updateModel(value))
];

// Cleanup all
listeners.forEach(unsub => unsub());
```

### Form Validation

Form components include built-in validation:

```javascript
const form = {
  email: new TextFieldComponent({
    label: 'Email',
    type: 'email',
    required: true
  }),
  country: new SelectComponent({
    label: 'Country',
    required: true,
    placeholder: 'Select country'
  }),
  terms: new CheckboxComponent({
    label: 'I agree to terms',
    onChange: (checked) => {
      submitButton.setDisabled(!checked);
    }
  })
};

// Validate all fields
function validateForm() {
  const isValid = [
    form.email.validate(),
    form.country.validate(),
    form.terms.get() // Must be checked
  ].every(valid => valid);
  
  return isValid;
}
```

### Dynamic Updates

Components support dynamic updates after creation:

```javascript
// Update labels
textField.setLabel('New Label');
checkbox.setLabel('Updated terms');

// Update options
select.setOptions([
  { label: 'New Option 1', value: 'new1' },
  { label: 'New Option 2', value: 'new2' }
]);

// Update states
button.setLoading(true);
button.setVariant('critical');
radioGroup.setDisabled(true);

// Update values
textField.set('new value');
checkbox.set(true);
select.set('option2');
```

## Design Philosophy

1. **Simplicity**: Clean, intuitive API that's easy to learn
2. **Consistency**: All components follow the same patterns
3. **Performance**: Lightweight with no framework overhead
4. **Type Safety**: Full TypeScript support
5. **Flexibility**: Works in any JavaScript environment
6. **Accessibility**: ARIA attributes and keyboard support built-in
7. **No Dependencies**: Pure vanilla JavaScript, works everywhere

## Migration from HTML/CSS

If you're currently using plain HTML/CSS for form controls, migrating to components provides:

- Consistent behavior across your application
- Built-in state management
- Event handling without manual DOM queries
- Reusable instances
- TypeScript intellisense

Before:
```html
<input type="checkbox" id="terms">
<label for="terms">I agree</label>

<script>
document.getElementById('terms').addEventListener('change', (e) => {
  console.log(e.target.checked);
});
</script>
```

After:
```javascript
const terms = new CheckboxComponent({
  label: 'I agree',
  onChange: (checked) => console.log(checked)
});
terms.mount('#container');
```