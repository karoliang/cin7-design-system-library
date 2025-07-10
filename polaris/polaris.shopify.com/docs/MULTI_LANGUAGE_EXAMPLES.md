# Multi-Language Code Examples Documentation

## Overview

The Cin7 DSL documentation now supports displaying code examples in multiple languages/frameworks:
- **React** - Original Shopify Polaris implementation
- **HTML** - Auto-generated HTML output
- **ExtJS** - Enterprise JavaScript framework implementation
- **Vanilla JS** - Plain HTML/CSS/JavaScript
- **TypeScript** - Type-safe React with interfaces

## Current Status

### ✅ Completed Components (215 examples)
- **Button Group** (3/3 examples) ✅
  - default
  - with-segmented-buttons
  - pressed-with-segmented-buttons
- **Button** (18/18 examples) ✅
  - primary
  - plain
  - disabled-state
  - full-width
  - icon-only
  - large
  - loading-state
  - plain-critical
  - plain-disclosure
  - pressed
  - primary-critical
  - right-aligned-disclosure
  - select-disclosure
  - split
  - tertiary
  - text-aligned
  - with-icon
  - default
- **Card** (20/20 examples) ✅
  - default
  - with-subdued-background
  - with-section
  - with-footer-actions
  - with-header-actions
  - with-all-elements
  - with-critical-footer-actions
  - with-custom-footer-actions
  - with-custom-react-node-title
  - with-flushed-section
  - with-header-icon-actions
  - with-multiple-footer-actions
  - with-multiple-sections
  - with-multiple-titled-sections
  - with-responsive-border-radius
  - with-sections-and-actions
  - with-sections-and-critical-action
  - with-separate-header
  - with-subdued-section
  - with-subsection
- **Badge** (10/10 examples) ✅
  - default
  - critical
  - success
  - attention
  - complete
  - small
  - incomplete
  - informational
  - warning
  - partially-complete
- **Text Field** (23/23 examples) ✅
  - default
  - with-validation-error
  - with-help-text
  - number
  - disabled
  - email
  - multiline
  - with-auto-size
  - with-auto-size-and-dynamic-suffix
  - with-character-count
  - with-clear-button
  - with-connected-fields
  - with-hidden-label
  - with-inline-suggestion
  - with-label-action
  - with-loading
  - with-monospaced-font
  - with-placeholder-text
  - with-prefix-or-suffix
  - with-right-aligned-text
  - with-separate-validation-error
  - with-value-selected-on-focus
  - with-vertical-content
- **Banner** (9/9 examples) ✅
  - default
  - critical
  - success
  - dismissible
  - informational
  - warning
  - in-a-card
  - with-focus
  - with-footer-call-to-action
- **Select** (6/6 examples) ✅
  - default
  - with-validation-error
  - disabled
  - with-inline-label
  - with-prefix
  - with-separate-validation-error
- **Modal** (1/10 examples)
  - default
- **Checkbox** (1/1 examples) ✅
  - default
- **Page** (17/17 examples) ✅
  - default
  - with-subtitle
  - full-width
  - narrow-width
  - with-action-groups
  - with-content-after-title
  - with-custom-primary-action
  - with-custom-secondary-action
  - with-destructive-secondary-action
  - with-external-link
  - with-tooltip-action
  - without-pagination
  - without-primary-action-in-header
  - actions-default
  - actions-primary-action-only
  - actions-with-custom-primary-action
  - actions-with-custom-secondary-action
- **Layout** (7/7 examples) ✅
  - one-column
  - two-columns-with-equal-width
  - two-columns-with-primary-and-secondary-widths
  - three-columns-with-equal-width
  - annotated
  - annotated-with-sections
  - annotated-with-banner-at-the-top
- **Form Layout** (5/5 examples) ✅
  - default
  - field-group
  - condensed-field-group
  - with-help-text
  - sectioned
- **Tabs** (6/6 examples) ✅
  - default
  - fitted
  - inside-of-a-card
  - with-actions
  - with-badge-content
  - with-custom-disclosure
- **List** (3/3 examples) ✅
  - bulleted
  - extra-tight
  - numbered
- **Icon** (4/4 examples) ✅
  - default
  - colored
  - with-custom-svg
  - with-custom-svg-and-color
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
- **Divider** (1/1 examples) ✅
  - with-border-color
- **Grid** (3/4 examples)
  - two-column
  - three-one-third-column
  - two-thirds-and-one-third-column
- **Spinner** (3/3 examples) ✅
  - default
  - small
  - with-focus-management
- **Text** (5/5 examples) ✅
  - body
  - heading
  - tone
  - weight
  - align
- **BlockStack** (2/2 examples) ✅
  - with-gap
  - with-align
- **InlineStack** (2/2 examples) ✅
  - with-gap
  - with-align
- **LegacyStack** (4/4 examples) ✅
  - default
  - spacing
  - vertical-centering
  - vertical
- **EmptyState** (3/3 examples) ✅
  - default
  - with-full-width-layout
  - with-subdued-footer-context
- **CalloutCard** (3/3 examples) ✅
  - default
  - dismissable
  - with-secondary-action
- **MediaCard** (3/3 examples) ✅
  - default
  - with-small-visual
  - with-secondary-action

### 📋 Components To Do (443 total examples across 96 components)

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