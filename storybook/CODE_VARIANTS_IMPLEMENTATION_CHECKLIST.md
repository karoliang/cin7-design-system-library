# CODE VARIANTS IMPLEMENTATION CHECKLIST

Quick reference for implementing missing variants. Copy the variant names directly from this list.

---

## PHASE 1: HIGH-IMPACT MISSING EXPORTS

### tabs (8 variants) - tabsExamples
```typescript
export const tabsExamples: Record<string, CodeVariant> = {
  'campaignTabs': { /* ... */ },
  'default': { /* ... */ },
  'fitted': { /* ... */ },
  'interactive': { /* ... */ },
  'manyTabs': { /* ... */ },
  'orderStatus': { /* ... */ },
  'productManagement': { /* ... */ },
  'withBadges': { /* ... */ },
}
```

### link (6 variants) - linkExamples
```typescript
export const linkExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
  'externalLink': { /* ... */ },
  'inlineText': { /* ... */ },
  'monochrome': { /* ... */ },
  'navigationLinks': { /* ... */ },
  'noUnderline': { /* ... */ },
}
```

### pagination (4 variants) - paginationExamples
```typescript
export const paginationExamples: Record<string, CodeVariant> = {
  'customTooltips': { /* ... */ },
  'default': { /* ... */ },
  'lastPage': { /* ... */ },
  'middlePage': { /* ... */ },
}
```

### navigation (3 variants) - navigationExamples
```typescript
export const navigationExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
  'ecommerceNavigation': { /* ... */ },
  'nestedNavigation': { /* ... */ },
}
```

---

## PHASE 2: CRITICALLY INCOMPLETE EXPORTS

### actionlist - ADD 9 variants to existing actionList
Currently has: default, react
```typescript
'bulk-actions-example': { /* ... */ },
'context-menu-example': { /* ... */ },
'nested-menu-example': { /* ... */ },
'with-actions': { /* ... */ },
'with-badges': { /* ... */ },
'with-destructive-actions': { /* ... */ },
'with-disabled-items': { /* ... */ },
'with-external-links': { /* ... */ },
'with-prefix-and-suffix': { /* ... */ },
'with-sections': { /* ... */ },
```

### button - ADD 7 variants to existing buttonExamples
Currently has: default, react
```typescript
'disabled': { /* ... */ },
'disclosure': { /* ... */ },
'full-width': { /* ... */ },
'large': { /* ... */ },
'loading': { /* ... */ },
'plain': { /* ... */ },
'plain-critical': { /* ... */ },
'primary-critical': { /* ... */ },
```

### textfield - ADD 6 variants to existing textFieldExamples
Currently has: default, react
```typescript
'character-count': { /* ... */ },
'disabled': { /* ... */ },
'multiline': { /* ... */ },
'number': { /* ... */ },
'with-error': { /* ... */ },
'with-help-text': { /* ... */ },
'with-prefix-suffix': { /* ... */ },
```

### banner - ADD 5 variants to existing bannerExamples
Currently has: default, react
```typescript
'critical': { /* ... */ },
'dismissible': { /* ... */ },
'informational': { /* ... */ },
'success': { /* ... */ },
'warning': { /* ... */ },
'with-actions': { /* ... */ },
```

### card - ADD 5 variants to existing cardExamples
Currently has: default, react
```typescript
'with-all-elements': { /* ... */ },
'with-header-actions': { /* ... */ },
'with-multiple-sections': { /* ... */ },
'with-section': { /* ... */ },
'with-subdued-background': { /* ... */ },
'with-subdued-section': { /* ... */ },
```

---

## PHASE 3: LOW-IMPACT MISSING EXPORTS (Quick Wins)

### blockstack (1 variant) - blockstackExamples
```typescript
export const blockstackExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
}
```

### layout (1 variant) - layoutExamples
```typescript
export const layoutExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
}
```

### page (1 variant) - pageExamples
```typescript
export const pageExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
}
```

### progressbar (1 variant) - progressbarExamples
```typescript
export const progressbarExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
}
```

### spinner (1 variant) - spinnerExamples
```typescript
export const spinnerExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
}
```

### toast (1 variant) - toastExamples
```typescript
export const toastExamples: Record<string, CodeVariant> = {
  'default': { /* ... */ },
}
```

---

## PHASE 4: MODERATELY INCOMPLETE EXPORTS

### checkbox - ADD 2 variants to existing checkboxExamples
Currently has: default, react
```typescript
'checked': { /* ... */ },
'disabled': { /* ... */ },
'with-help-text': { /* ... */ },
```

### radiobutton - ADD 2 variants to existing radioButtonExamples
Currently has: default, react
```typescript
'checked': { /* ... */ },
'disabled': { /* ... */ },
'with-help-text': { /* ... */ },
```

### select - ADD 1 variant to existing selectExamples
Currently has: default, react
```typescript
'disabled': { /* ... */ },
'with-validation-error': { /* ... */ },
```

---

## STORY FILES TO REFERENCE

For each variant, check the corresponding story file for the exact component configuration:

- **Tabs**: `/storybook/stories/components/navigation/Tabs.stories.tsx`
- **Link**: `/storybook/stories/components/utilities/Link.stories.tsx`
- **Pagination**: `/storybook/stories/components/utilities/Pagination.stories.tsx`
- **Navigation**: `/storybook/stories/components/navigation/Navigation.stories.tsx`
- **ActionList**: `/storybook/stories/components/actions/ActionList.stories.tsx`
- **Button**: `/storybook/stories/components/actions/Button.stories.tsx`
- **TextField**: `/storybook/stories/components/forms/TextField.stories.tsx`
- **Banner**: `/storybook/stories/components/feedback/Banner.stories.tsx`
- **Card**: `/storybook/stories/components/layout/Card.stories.tsx`
- **BlockStack**: `/storybook/stories/components/layout/BlockStack.stories.tsx`
- **Layout**: `/storybook/stories/components/layout/Layout.stories.tsx`
- **Page**: `/storybook/stories/components/layout/Page.stories.tsx`
- **ProgressBar**: `/storybook/stories/components/feedback/ProgressBar.stories.tsx`
- **Spinner**: `/storybook/stories/components/feedback/Spinner.stories.tsx`
- **Toast**: `/storybook/stories/components/feedback/Toast.stories.tsx`
- **Checkbox**: `/storybook/stories/components/forms/Checkbox.stories.tsx`
- **RadioButton**: `/storybook/stories/components/forms/RadioButton.stories.tsx`
- **Select**: `/storybook/stories/components/forms/Select.stories.tsx`

---

## DON'T FORGET TO REGISTER IN getCodeVariants()

After creating the exports, ensure they're registered in the getCodeVariants function:

```typescript
const examples: Record<string, Record<string, CodeVariant>> = {
  // ... existing entries ...
  tabs: tabsExamples,        // ADD THIS
  link: linkExamples,        // ADD THIS
  pagination: paginationExamples,  // ADD THIS
  navigation: navigationExamples,  // ADD THIS
  blockstack: blockstackExamples,  // ADD THIS
  layout: layoutExamples,    // ADD THIS
  page: pageExamples,        // ADD THIS
  progressbar: progressbarExamples,  // ADD THIS (fix typo if needed)
  spinner: spinnerExamples,  // ADD THIS
  toast: toastExamples,      // ADD THIS
  // ... rest of entries ...
};
```

