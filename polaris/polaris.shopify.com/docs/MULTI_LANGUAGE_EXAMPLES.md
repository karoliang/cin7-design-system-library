# Multi-Language Code Examples Documentation

## Overview

The Cin7 DSL documentation now supports displaying code examples in multiple languages/frameworks:
- **React** - Original Shopify Polaris implementation
- **HTML** - Auto-generated HTML output
- **ExtJS** - Enterprise JavaScript framework implementation
- **Vanilla JS** - Plain HTML/CSS/JavaScript
- **TypeScript** - Type-safe React with interfaces

## Current Status

### ✅ Completed Components (45 examples)
- **Button Group** (3/3 examples) ✅
  - default
  - with-segmented-buttons
  - pressed-with-segmented-buttons
- **Button** (2/18 examples)
  - primary
  - plain
- **Card** (5/20 examples)
  - default
  - with-subdued-background
  - with-section
  - with-footer-actions
  - with-header-actions
- **Badge** (3/10 examples)
  - default
  - critical
  - success
- **Text Field** (4/23 examples)
  - default
  - with-validation-error
  - with-help-text
  - number
- **Banner** (3/9 examples)
  - default
  - critical
  - success
- **Select** (2/6 examples)
  - default
  - with-validation-error
- **Modal** (1/10 examples)
  - default
- **Checkbox** (1/1 examples) ✅
  - default
- **Page** (2/17 examples)
  - default
  - with-subtitle
- **Layout** (1/7 examples)
  - one-column
- **Form Layout** (1/5 examples)
  - default
- **Tabs** (1/6 examples)
  - default
- **List** (1/3 examples)
  - bulleted
- **Icon** (1/4 examples)
  - default
- **Avatar** (3/3 examples) ✅
  - default
  - extra-small
  - initials
- **Bleed** (3/3 examples) ✅
  - horizontal
  - specific-direction
  - vertical
- **Box** (5/5 examples) ✅
  - with-color
  - with-border-radius
  - with-border
  - with-shadow
  - with-padding

### 📋 Components To Do (450 total examples across 96 components)

High Priority Components:
1. **Card** - 20 examples
2. **Text Field** - 23 examples
3. **Index Table** - 21 examples
4. **Resource List** - 17 examples
5. **Page** - 9 examples
6. **Badge** - 10 examples
7. **Banner** - 9 examples
8. **Form** - 8 examples
9. **Modal** - 7 examples
10. **Select** - 6 examples

## Adding New Code Variants

### Method 1: Manual Addition

1. Open `src/utils/codeVariants.ts`
2. Find or create the component's examples object
3. Add the example with all language variants:

```typescript
export const cardExamples = {
  'default': {
    react: `// React code here`,
    extjs: `// ExtJS code here`,
    vanilla: `// Vanilla JS code here`,
    typescript: `// TypeScript code here`
  }
};
```

### Method 2: Using the Generator Script

```bash
node scripts/generate-code-variants.js card default
```

This generates a template that you can fill in.

## Code Variant Guidelines

### React
- Use the exact code from the example file
- Import only what's needed from '@shopify/polaris'
- Follow React best practices

### ExtJS
- Use appropriate ExtJS components (Ext.panel.Panel for Card, etc.)
- Include proper configuration objects
- Add event handlers where applicable
- Use ExtJS patterns for data binding

### Vanilla JS
- Focus on HTML structure and JavaScript behavior only
- Assume Polaris/Cin7 DSL CSS classes exist globally (e.g., `polaris-button`, `polaris-card`)
- Use semantic HTML with proper class names
- Include accessibility attributes (ARIA labels, roles)
- Use modern JavaScript (ES6+)
- No CSS sections - styling is handled by the design system

### TypeScript
- Define proper interfaces for props
- Use explicit return types
- Add JSDoc comments for complex logic
- Export types that might be reused

## Example Patterns

### Form Controls
```typescript
// TypeScript pattern for form controls
interface TextFieldExampleProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}
```

### ExtJS Data Binding
```javascript
// ExtJS pattern for data binding
Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Name',
  bind: '{record.name}',
  listeners: {
    change: function(field, newValue) {
      // Handle change
    }
  }
});
```

### Vanilla JS Event Handling
```javascript
// Vanilla JS pattern for events
document.getElementById('myButton').addEventListener('click', (event) => {
  event.preventDefault();
  // Handle click
});
```

## Component Mapping

The system automatically detects components from filenames using the parsing logic in `parseExampleFileName`. Components are matched from longest to shortest to handle cases like 'button' vs 'button-group'.

## Testing Your Code Variants

1. Run the development server: `pnpm dev`
2. Navigate to a component page
3. Check that all tabs appear for examples with variants
4. Verify each tab shows appropriate code
5. Test that the code syntax highlighting works

## Common Issues and Solutions

### Issue: Tabs not showing for my component
**Solution**: Ensure the component is listed in the `componentPrefixes` array in `parseExampleFileName`

### Issue: Code not formatted properly
**Solution**: Use template literals with proper escaping for special characters

### Issue: ExtJS equivalent unclear
**Solution**: Refer to ExtJS documentation for component mappings:
- Polaris Card → Ext.panel.Panel
- Polaris Button → Ext.button.Button
- Polaris TextField → Ext.form.field.Text
- etc.

## Known Issues / TODO

- **Vanilla JS Refactoring**: Some older vanilla JS examples still include CSS sections. These need to be refactored to follow the new pattern (HTML structure + JavaScript behavior only, assuming global CSS classes).

## Roadmap

1. **Phase 1** (Current): Core components (Button, Card, Form elements)
2. **Phase 2**: Layout components (Grid, Stack, Page)
3. **Phase 3**: Data components (DataTable, ResourceList)
4. **Phase 4**: Overlay components (Modal, Popover)
5. **Phase 5**: Specialized components (DatePicker, ColorPicker)

## Contributing

When adding new examples:
1. Ensure all 4 language variants are provided
2. Test the code for correctness
3. Follow the established patterns
4. Update this documentation if adding new patterns