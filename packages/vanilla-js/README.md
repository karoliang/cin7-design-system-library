# @cin7/vanilla-js

Lightweight, reusable UI components and utilities for the Cin7 DSL framework. Pure vanilla JavaScript with no framework dependencies.

## Overview

The Vanilla JS package provides:
- **Component Classes**: Reusable UI components with consistent APIs
- **DOM Utilities**: jQuery-like helpers for DOM manipulation
- **Event System**: Simplified event handling and delegation
- **Animation Helpers**: Smooth transitions and effects
- **TypeScript Support**: Full type definitions included

## Philosophy

This package embraces the Cin7 DSL philosophy of using the right tool for the job. Use vanilla JavaScript when:

- You need lightweight, performant UI interactions
- Framework overhead is unnecessary
- You're building progressively enhanced experiences
- You need fine-grained control over DOM manipulation

## Installation

```bash
pnpm add @cin7/vanilla-js
```

## Component System

### Available Components

- `CheckboxComponent` - Checkbox with label and callbacks
- `RadioButtonComponent` - Radio button for single selection
- `RadioGroupComponent` - Manage multiple radio buttons
- `TextFieldComponent` - Text input with validation
- `SelectComponent` - Dropdown selection
- `ButtonComponent` - Versatile button component
- `ButtonGroupComponent` - Group buttons together

### Basic Usage

```javascript
import { 
  CheckboxComponent, 
  TextFieldComponent, 
  ButtonComponent 
} from '@cin7/vanilla-js';

// Create a checkbox
const termsCheckbox = new CheckboxComponent({
  label: 'I agree to the terms and conditions',
  onChange: (checked) => {
    submitButton.setDisabled(!checked);
  }
});

// Create a text field
const emailField = new TextFieldComponent({
  label: 'Email',
  type: 'email',
  required: true,
  placeholder: 'you@example.com',
  onChange: (value) => validateEmail(value)
});

// Create a button
const submitButton = new ButtonComponent({
  label: 'Submit',
  variant: 'primary',
  disabled: true,
  onClick: async () => {
    submitButton.setLoading(true);
    await handleSubmit();
    submitButton.setLoading(false);
  }
});

// Mount components
termsCheckbox.mount('#terms-container');
emailField.mount('#email-container');
submitButton.mount('#submit-container');
```

### Component API

All components share a consistent API:

```javascript
// Common methods
component.mount(parent);          // Mount to DOM
component.unmount();              // Remove from DOM
component.getElement();           // Get root element
component.setDisabled(disabled);  // Enable/disable
component.isDisabled();           // Check state
component.destroy();              // Cleanup

// Event subscription
const unsubscribe = component.on('change', handler);
unsubscribe(); // Remove listener

// Get/set values
const value = component.get();
component.set(newValue);
```

## DOM Utilities

```javascript
import { $, $$, on, addClass, removeClass } from '@cin7/vanilla-js';

// Query elements
const button = $('#submit-button');
const inputs = $$('input[type="text"]');

// Add event listeners
on('#form', 'submit', (e) => {
  e.preventDefault();
  handleSubmit();
});

// Manipulate classes
addClass('#modal', 'active');
removeClass('#modal', 'active');

// Chain operations
$('#notification')
  .addClass('show')
  .on('click', '.close', () => {
    $('#notification').addClass('hide');
  });
```

## Event Handling

```javascript
import { on, delegate, onKey } from '@cin7/vanilla-js';

// Simple event listener with cleanup
const cleanup = on(button, 'click', (e) => {
  console.log('Button clicked!');
});

// Event delegation
delegate(document.body, '.card', 'click', (event, card) => {
  addClass(card, 'selected');
});

// Keyboard shortcuts
onKey(document, {
  key: 'Enter',
  ctrl: true,
  handler: (e) => console.log('Ctrl+Enter pressed')
});
```

## Animation Utilities

```javascript
import { fadeIn, fadeOut, slideDown, slideUp } from '@cin7/vanilla-js';

// Fade effects
await fadeIn('#modal', 300);
await fadeOut('#modal', 300);

// Slide effects
await slideDown('#dropdown', 200);
await slideUp('#dropdown', 200);

// Custom animations
import { animate } from '@cin7/vanilla-js';

animate('#box', {
  transform: 'translateX(100px)',
  opacity: 0.5
}, {
  duration: 500,
  easing: 'ease-out'
});
```

## Form Building Example

```javascript
import { 
  TextFieldComponent,
  SelectComponent,
  CheckboxComponent,
  ButtonComponent 
} from '@cin7/vanilla-js';

class ContactForm {
  constructor(container) {
    this.container = container;
    this.fields = {};
    this.build();
  }

  build() {
    // Create form fields
    this.fields.name = new TextFieldComponent({
      label: 'Full Name',
      required: true,
      placeholder: 'John Doe'
    });

    this.fields.email = new TextFieldComponent({
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'john@example.com'
    });

    this.fields.subject = new SelectComponent({
      label: 'Subject',
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Support', value: 'support' },
        { label: 'Sales', value: 'sales' }
      ],
      required: true
    });

    this.fields.message = new TextFieldComponent({
      label: 'Message',
      multiline: true,
      rows: 5,
      required: true
    });

    this.fields.newsletter = new CheckboxComponent({
      label: 'Subscribe to newsletter'
    });

    this.submitButton = new ButtonComponent({
      label: 'Send Message',
      variant: 'primary',
      fullWidth: true,
      onClick: () => this.handleSubmit()
    });

    // Mount all components
    Object.values(this.fields).forEach(field => {
      field.mount(this.container);
    });
    this.submitButton.mount(this.container);
  }

  async handleSubmit() {
    // Validate all fields
    const isValid = Object.values(this.fields)
      .filter(field => field.validate) // Only validatable fields
      .every(field => field.validate());

    if (!isValid) {
      return;
    }

    // Get form data
    const data = this.getFormData();

    // Submit
    this.submitButton.setLoading(true);
    try {
      await this.submitForm(data);
      this.showSuccess();
      this.reset();
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.submitButton.setLoading(false);
    }
  }

  getFormData() {
    return Object.entries(this.fields).reduce((data, [key, field]) => {
      data[key] = field.get();
      return data;
    }, {});
  }

  reset() {
    Object.values(this.fields).forEach(field => {
      field.set(field.constructor === CheckboxComponent ? false : '');
      field.clearError?.();
    });
  }
}

// Initialize form
const form = new ContactForm('#contact-form');
```

## Progressive Enhancement

```javascript
import { ready, isInViewport, on } from '@cin7/vanilla-js';

ready(() => {
  // DOM is ready
  const lazyImages = $$('[data-lazy]');
  
  const loadImage = (img) => {
    if (isInViewport(img)) {
      img.src = img.dataset.lazy;
      img.removeAttribute('data-lazy');
    }
  };
  
  // Check on scroll
  on(window, 'scroll', () => {
    lazyImages.forEach(loadImage);
  });
});
```

## TypeScript Support

Full TypeScript support with type definitions:

```typescript
import { 
  CheckboxComponent,
  CheckboxOptions,
  TextFieldComponent,
  TextFieldOptions,
  EventListener 
} from '@cin7/vanilla-js';

const handleChange: EventListener<boolean> = (checked) => {
  console.log('Checked:', checked);
};

const options: CheckboxOptions = {
  label: 'Remember me',
  checked: true,
  onChange: handleChange
};

const checkbox = new CheckboxComponent(options);
```

## Browser Usage

Include the browser build for direct usage without bundlers:

```html
<script src="https://unpkg.com/@cin7/vanilla-js/dist/browser.js"></script>
<script>
  // Global object available as Cin7VanillaJS or C7
  C7.ready(() => {
    const checkbox = new C7.CheckboxComponent({
      label: 'Accept terms',
      onChange: (checked) => console.log(checked)
    });
    checkbox.mount('#checkbox-container');
  });
</script>
```

## API Reference

### Components
- `CheckboxComponent` - Checkbox input with label
- `RadioButtonComponent` - Radio button input
- `RadioGroupComponent` - Group of radio buttons
- `TextFieldComponent` - Text/email/password input
- `SelectComponent` - Dropdown select
- `ButtonComponent` - Button with variants
- `ButtonGroupComponent` - Button group/segmented control

### DOM Query
- `$(selector)` - Query single element
- `$$(selector)` - Query multiple elements
- `$required(selector)` - Query element, throws if not found
- `ready(callback)` - Wait for DOM ready

### DOM Manipulation
- `addClass(element, ...classes)` - Add classes
- `removeClass(element, ...classes)` - Remove classes
- `toggleClass(element, class, force?)` - Toggle class
- `show(element)` - Show element
- `hide(element)` - Hide element

### Events
- `on(element, event, handler)` - Add event listener
- `once(element, event, handler)` - One-time event listener
- `delegate(container, selector, event, handler)` - Event delegation
- `onKey(element, shortcut)` - Keyboard shortcut
- `onClickOutside(element, handler)` - Click outside detection

### Animations
- `fadeIn(element, duration?)` - Fade in animation
- `fadeOut(element, duration?)` - Fade out animation
- `slideDown(element, duration?)` - Slide down animation
- `slideUp(element, duration?)` - Slide up animation
- `animate(element, keyframes, options)` - Custom animation

## When to Use

Use @cin7/vanilla-js components when:
- Building lightweight, reusable UI elements
- Need consistent behavior across your app
- Want type-safe component APIs
- Enhancing server-rendered HTML
- Optimizing performance-critical paths

Use React components when:
- Building complex, stateful UIs
- Managing application state
- Creating data-driven interfaces
- Need advanced component composition

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome)

## Contributing

See the main [Cin7 DSL Contributing Guide](../../CONTRIBUTING.md).

## License

MIT © Cin7