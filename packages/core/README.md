# @cin7/core

Core utilities and types for the Cin7 DSL framework.

## Installation

```bash
pnpm add @cin7/core
```

## Features

- **TypeScript Types**: Common types and interfaces used across the framework
- **DOM Utilities**: Helper functions for DOM manipulation
- **Event Utilities**: Event handling and event bus implementation
- **Validation**: Form validation utilities and common validation rules
- **Class Names**: Utility for conditional class names

## Usage

### Types

```typescript
import { BaseEntity, ApiResponse, FormState } from '@cin7/core/types';

interface User extends BaseEntity {
  name: string;
  email: string;
}
```

### DOM Utilities

```typescript
import { DOMUtils } from '@cin7/core/utils';

// Add/remove classes
DOMUtils.addClass(element, 'active');
DOMUtils.removeClass(element, 'active');

// Debounce function
const debouncedSearch = DOMUtils.debounce(searchFunction, 300);
```

### Event Utilities

```typescript
import { EventUtils, EventBus } from '@cin7/core/utils';

// Event delegation
const cleanup = EventUtils.delegate(
  container,
  '.button',
  'click',
  (event, target) => {
    console.log('Button clicked:', target);
  }
);

// Event bus
const bus = new EventBus();
bus.on('user:updated', (data) => console.log('User updated:', data));
bus.emit('user:updated', { id: '123', name: 'John' });
```

### Validation

```typescript
import { ValidationUtils, commonValidations } from '@cin7/core/utils';

const schema = {
  email: {
    required: true,
    ...commonValidations.email
  },
  phone: commonValidations.phone
};

const errors = ValidationUtils.validateForm(formData, schema);
```

## License

MIT