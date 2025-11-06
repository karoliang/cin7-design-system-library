# Multi-Language Code Documentation

This directory contains the multi-language code documentation system for Storybook.

## Overview

The multi-language code system allows component stories to display implementation examples in multiple frameworks:

- **React** - Using `@shopify/polaris`
- **Vanilla JS** - Using `@cin7/vanilla-js`
- **ExtJS** - Using `@cin7/extjs-adapters`
- **TypeScript** - Type-safe implementations with full typing

## Components

### 1. `Code.tsx`

A React component that displays code with syntax highlighting and tabbed interface.

**Features:**
- Tabbed interface for multiple code examples
- Syntax highlighting via `react-syntax-highlighter`
- Copy-to-clipboard button
- Responsive design using design tokens

**Usage:**
```tsx
import { Code } from './.storybook/blocks';

<Code code={[
  { title: 'React', code: reactCode, language: 'jsx' },
  { title: 'TypeScript', code: tsCode, language: 'typescript' }
]} />
```

### 2. `codeVariants.ts`

Central registry of code examples for all components.

**Structure:**
```typescript
export const buttonExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Button } from '@shopify/polaris';...`,
    vanilla: `import { createButton } from '@cin7/vanilla-js';...`,
    extjs: `Ext.create('Ext.button.Button', {...});`,
    typescript: `import { Button, ButtonProps } from '@shopify/polaris';...`
  }
};
```

**Adding New Examples:**
1. Create a new export like `buttonExamples`, `cardExamples`, etc.
2. Add each variation (default, primary, disabled, etc.) as a key
3. Provide code for all 4 frameworks
4. Update the `examples` object in `getCodeVariants()` to include your new component

### 3. `MultiLanguageCode.tsx`

High-level wrapper component for easy use in stories.

**Usage in Stories:**
```tsx
import { MultiLanguageCode } from '../../.storybook/blocks';

export const Default: Story = {
  render: (args) => (
    <div>
      <Button {...args} />
      <MultiLanguageCode
        componentName="button"
        exampleName="default"
      />
    </div>
  ),
};
```

## Quick Start

### Step 1: Add Code Examples

Edit `.storybook/blocks/codeVariants.ts`:

```typescript
export const myComponentExamples: Record<string, CodeVariant> = {
  default: {
    react: `// React implementation`,
    vanilla: `// Vanilla JS implementation`,
    extjs: `// ExtJS implementation`,
    typescript: `// TypeScript implementation`
  }
};

// Update getCodeVariants()
const examples: Record<string, Record<string, CodeVariant>> = {
  button: buttonExamples,
  mycomponent: myComponentExamples, // Add your component here
};
```

### Step 2: Use in Story

```tsx
import { MultiLanguageCode } from '../../.storybook/blocks';

export const MyStory: Story = {
  render: (args) => (
    <div>
      <MyComponent {...args} />
      <MultiLanguageCode
        componentName="mycomponent"
        exampleName="default"
      />
    </div>
  ),
};
```

### Step 3: View in Storybook

1. Open http://localhost:6006/
2. Navigate to your story
3. See tabbed code examples below the component

## Demo

See `/stories/demo/MultiLanguageCodeDemo.stories.tsx` for a working example.

## Design Tokens

The Code component uses Cin7 DSL design tokens:

- `--color-gray-*` for borders and backgrounds
- `--color-primary-*` for active tab states
- `--font-family-sans` for typography
- `--font-size-sm/base` for text sizing
- `--border-radius-base/lg` for rounded corners
- `--spacing-*` for padding and margins

## Dependencies

- `@headlessui/react` - Tab component
- `react-syntax-highlighter` - Code highlighting

## Future Enhancements

- [ ] Import code examples directly from documentation site's `codeVariants.ts` (215+ examples)
- [ ] Add copy analytics tracking
- [ ] Support for inline code snippets (not just full examples)
- [ ] Add "Open in CodeSandbox" button
- [ ] Custom syntax theme matching Cin7 DSL branding
- [ ] Export code variants to JSON for external tools

## Migration from Documentation Site

To reuse existing code examples from `polaris.shopify.com/src/utils/codeVariants.ts`:

1. Copy the component examples you need
2. Adapt import statements to Storybook context
3. Update the `examples` mapping in `getCodeVariants()`

The structure is already compatible - just copy and paste!

## Troubleshooting

**"Code examples not found" message appears:**
- Check that your component name is lowercase in `getCodeVariants()`
- Verify the example name matches exactly
- Ensure you've added the component to the `examples` object

**Tabs not displaying:**
- Check browser console for errors
- Verify `@headlessui/react` is installed
- Clear Storybook cache: `rm -rf node_modules/.cache`

**Syntax highlighting not working:**
- Check the `language` prop matches a valid Prism language
- Verify `react-syntax-highlighter` is installed
- Try specifying language explicitly in the code object

## Support

For questions or issues, check:
- Demo story: `stories/demo/MultiLanguageCodeDemo.stories.tsx`
- Storybook docs: https://storybook.js.org/docs
- HeadlessUI docs: https://headlessui.com

## License

Part of Cin7 Design System Library
