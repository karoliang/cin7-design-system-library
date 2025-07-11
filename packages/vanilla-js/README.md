# @cin7/vanilla-js

Lightweight vanilla JavaScript utilities for the UI Interaction Layer of Cin7 DSL. Zero framework dependencies, optimized for performance.

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

## Usage

### DOM Manipulation

```javascript
import { $, $$, addClass, removeClass, show, hide } from '@cin7/vanilla-js';

// Query elements
const button = $('#submit-button');
const cards = $$('.card');

// Manipulate classes
addClass(button, 'primary', 'large');
removeClass(cards[0], 'hidden');

// Show/hide elements
show(button);
hide($('#loading-spinner'));
```

### Event Handling

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

### Animations

```javascript
import { animate, fadeIn, slideDown, Easing } from '@cin7/vanilla-js';

// Keyframe animation
animate(element, [
  { opacity: 0, transform: 'translateY(-20px)' },
  { opacity: 1, transform: 'translateY(0)' }
], {
  duration: 300,
  easing: Easing.easeOut
});

// Built-in animations
await fadeIn(element, 400);
await slideDown(dropdown, 200);
```

### Progressive Enhancement

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

## Browser Usage

Include the browser build for direct usage without bundlers:

```html
<script src="https://unpkg.com/@cin7/vanilla-js/dist/browser.js"></script>
<script>
  // Global object available as Cin7VanillaJS or C7
  C7.ready(() => {
    const button = C7.$('#my-button');
    C7.on(button, 'click', () => {
      C7.addClass(button, 'clicked');
    });
  });
</script>
```

## API Reference

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
- `fadeIn(element, duration?)` - Fade in animation
- `fadeOut(element, duration?)` - Fade out animation

### Events
- `on(element, event, handler)` - Add event listener
- `once(element, event, handler)` - One-time event listener
- `delegate(container, selector, event, handler)` - Event delegation
- `onKey(element, shortcut)` - Keyboard shortcut
- `onClickOutside(element, handler)` - Click outside detection

### Animations
- `animate(element, keyframes, options)` - Web Animations API wrapper
- `animateSequence(animations)` - Animate in sequence
- `animateParallel(animations)` - Animate in parallel

## When to Use

Use @cin7/vanilla-js when:
- Building lightweight interactions
- Enhancing server-rendered HTML
- Optimizing performance-critical paths
- Creating reusable UI behaviors

Use React components when:
- Building complex, stateful UIs
- Managing application state
- Creating data-driven interfaces
- Need component composition

## License

MIT