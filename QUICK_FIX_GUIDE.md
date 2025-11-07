# Quick Fix Guide - Code Variants

## Problem
Storybook showing "No code examples found for component: buttongroup" errors.

## Root Cause
2 components are missing their code variant definitions and registrations:
1. ButtonGroup (13 stories affected)
2. AppProvider (7 stories affected)

## Solution

### Step 1: Add ButtonGroup Code Variants

Open `/storybook/.storybook/blocks/codeVariants.ts` and add BEFORE line 22720:

```typescript
// ButtonGroup Component Examples
export const buttonGroupExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ButtonGroup, Button } from '@shopify/polaris';

function ButtonGroupExample() {
  return (
    <ButtonGroup>
      <Button variant="primary">Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="plain">Help</Button>
    </ButtonGroup>
  );
}

export default ButtonGroupExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-button-group">
  <button class="polaris-button polaris-button--primary">Save</button>
  <button class="polaris-button polaris-button--secondary">Cancel</button>
  <button class="polaris-button polaris-button--plain">Help</button>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createButtonGroup, createButton } from '@cin7/vanilla-js';

const buttonGroup = createButtonGroup([
  createButton({ text: 'Save', variant: 'primary' }),
  createButton({ text: 'Cancel', variant: 'secondary' }),
  createButton({ text: 'Help', variant: 'plain' })
]);

document.getElementById('app').appendChild(buttonGroup);
</script>`,

    extjs: `// ExtJS Button Group using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: 'hbox',
  defaults: {
    margin: '0 5 0 0'
  },
  items: [
    {
      xtype: 'button',
      text: 'Save',
      cls: 'polaris-button-primary'
    },
    {
      xtype: 'button',
      text: 'Cancel',
      cls: 'polaris-button-secondary'
    },
    {
      xtype: 'button',
      text: 'Help',
      cls: 'polaris-button-plain'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ButtonGroup, Button } from '@shopify/polaris';
import React from 'react';

interface ButtonGroupExampleProps {
  onSave?: () => void;
  onCancel?: () => void;
  onHelp?: () => void;
}

function ButtonGroupExample({ onSave, onCancel, onHelp }: ButtonGroupExampleProps): JSX.Element {
  return (
    <ButtonGroup>
      <Button variant="primary" onClick={onSave}>Save</Button>
      <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      <Button variant="plain" onClick={onHelp}>Help</Button>
    </ButtonGroup>
  );
}

export default ButtonGroupExample;`
  }
};
```

### Step 2: Register ButtonGroup

In the same file, find the `getCodeVariants` function (around line 22724) and add this line in the `examples` object:

```typescript
const examples: Record<string, Record<string, CodeVariant>> = {
  button: buttonExamples,
  buttongroup: buttonGroupExamples,  // ← ADD THIS LINE
  card: cardExamples,
  // ... rest of the registrations
```

### Step 3: Add AppProvider Code Variants

Add BEFORE line 22720:

```typescript
// AppProvider Component Examples
export const appProviderExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { AppProvider, Page, Button } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

function AppProviderExample() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="My App">
        <Button>Click me</Button>
      </Page>
    </AppProvider>
  );
}

export default AppProviderExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-app-provider">
  <div class="polaris-page">
    <h1 class="polaris-page-title">My App</h1>
    <button class="polaris-button">Click me</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { initializeApp, createPage, createButton } from '@cin7/vanilla-js';

const app = initializeApp({
  locale: 'en',
  features: {}
});

const page = createPage({
  title: 'My App',
  children: [
    createButton({ text: 'Click me' })
  ]
});

app.appendChild(page);
document.getElementById('app').appendChild(app);
</script>`,

    extjs: `// ExtJS App Provider using @cin7/extjs-adapters
Ext.application({
  name: 'MyApp',

  launch: function() {
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        xtype: 'panel',
        title: 'My App',
        items: [{
          xtype: 'button',
          text: 'Click me',
          cls: 'polaris-button'
        }]
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Page, Button } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';

interface AppProviderExampleProps {
  locale?: string;
  children?: React.ReactNode;
}

function AppProviderExample({ locale = 'en', children }: AppProviderExampleProps): JSX.Element {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="My App">
        {children || <Button>Click me</Button>}
      </Page>
    </AppProvider>
  );
}

export default AppProviderExample;`
  }
};
```

### Step 4: Register AppProvider

In the `getCodeVariants` function (around line 22803), add:

```typescript
const examples: Record<string, Record<string, CodeVariant>> = {
  // ... other registrations
  appprovider: appProviderExamples,  // ← ADD THIS LINE
  // ... rest of the registrations
};
```

## Testing

1. Start Storybook: `cd storybook && pnpm dev`
2. Navigate to: `Components/Forms/ButtonGroup` → Default story
3. Verify code tabs appear and show all 4 variants
4. Navigate to: `Components/Utilities/AppProvider`
5. Verify code tabs appear and show all 4 variants
6. Check browser console for any warnings

## Expected Result

✅ All ButtonGroup stories (13 variations) show code examples
✅ All AppProvider stories (7 variations) show code examples
✅ No console warnings about missing code examples
✅ Code tabs switch between React/Vanilla/ExtJS/TypeScript

## Files Modified

- `/storybook/.storybook/blocks/codeVariants.ts`

## Time Required

- 30-60 minutes per component
- Total: 1-2 hours for both components

---

**Quick Reference:**
- ButtonGroup: 13 stories affected
- AppProvider: 7 stories affected
- Total: 20 broken story variations
- Fix location: `/storybook/.storybook/blocks/codeVariants.ts`
