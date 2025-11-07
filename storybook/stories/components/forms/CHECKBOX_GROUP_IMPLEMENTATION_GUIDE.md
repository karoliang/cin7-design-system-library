# CheckboxGroup Code Variants - Complete Implementation Guide

## Overview

This document provides comprehensive code variants for all 9 CheckboxGroup story variations across 4 languages:
- **React** (Shopify Polaris components)
- **ExtJS** (Enterprise grid/form framework)
- **Vanilla JavaScript** (Pure DOM manipulation)
- **TypeScript** (Type-safe React implementation)

## File Locations

- **Stories**: `/storybook/stories/components/forms/CheckboxGroup.stories.tsx`
- **Code Variants**: `/storybook/.storybook/blocks/codeVariants.ts` (line ~21029)
- **Documentation**: `/storybook/stories/components/CHECKBOX_GROUP_CODE_VARIANTS.md`

## Story Variations

| # | Story Name | Key | Features |
|---|------------|-----|----------|
| 1 | BasicGroup | `default` | 4 notification preferences |
| 2 | ProductFeatures | `productFeatures` | Dynamic pricing, selected count |
| 3 | AccessControl | `accessControl` | 5 permissions with descriptions |
| 4 | WithValidation | `withValidation` | Form validation, error states |
| 5 | FilterGroup | `filterGroup` | Active filter count |
| 6 | SettingsGroup | `settingsGroup` | Sectioned settings |
| 7 | IndeterminateState | `indeterminateState` | Select all checkbox |
| 8 | NestedGroups | `nestedGroups` | Hierarchical categories |
| 9 | DisabledGroup | `disabledGroup` | Disabled checkboxes |

## Integration Challenge

The `codeVariants.ts` file is **914KB** (too large to edit directly in Claude Code).

### Recommended Approach

1. **Manual Integration**: Copy code from `CHECKBOX_GROUP_CODE_VARIANTS.md`
2. **Or** Use the integration script: `checkboxgroup-integration-script.js`
3. **Or** Update file programmatically with a build script

## Code Pattern Structure

Each variant follows this structure in codeVariants.ts:

```typescript
export const checkboxGroupExamples: Record<string, CodeVariant> = {
  variantKey: {
    react: `// React component code`,
    extjs: `// ExtJS component code`,
    vanilla: `// HTML + Vanilla JS code`,
    typescript: `// TypeScript component code`
  },
  // ... more variants
};
```

## Story File Updates

Update each story's parameters block in `CheckboxGroup.stories.tsx`:

```typescript
export const BasicGroup: Story = {
  render: () => { /* ... */ },
  parameters: {
    codeVariants: getCodeVariants('checkboxgroup', 'default'),
  },
};

export const ProductFeatures: Story = {
  render: () => { /* ... */ },
  parameters: {
    codeVariants: getCodeVariants('checkboxgroup', 'productFeatures'),
  },
};

// ... repeat for all 9 stories
```

## Key Features by Variant

### 1. BasicGroup (default)
- **State**: 4 boolean properties (email, sms, push, mail)
- **Handler**: Type-safe key parameter
- **Help Text**: Descriptive guidance for each option
- **ExtJS**: CheckboxGroup with listeners
- **Vanilla**: Event delegation with querySelectorAll

### 2. ProductFeatures
- **Dynamic Calculation**: selectedCount and estimatedPrice
- **React**: useMemo for performance
- **ExtJS**: updateSummary() method
- **Display**: InlineStack with count and price
- **TypeScript**: FeatureOption interface with price property

### 3. AccessControl
- **Use Case**: Permission management system
- **Options**: read, write, delete, share, export
- **Description**: Subtitle explaining purpose
- **TypeScript**: Permission interface array
- **ExtJS**: Display field for description

### 4. WithValidation
- **Array State**: interests as string[]
- **Validation**: Minimum 1 selection required
- **Touched State**: Only show errors after user interaction
- **Error Display**: Conditional rendering
- **Summary Box**: Show selected interests
- **ExtJS**: allowBlank: false, blankText message

### 5. FilterGroup
- **Active Count**: Display number of active filters
- **Conditional**: Only show count if > 0
- **Simple Labels**: No help text
- **TypeScript**: useMemo for count calculation
- **ExtJS**: updateFilterCount() method

### 6. SettingsGroup
- **Sections**: Display Options, Interaction Effects
- **Visual Hierarchy**: h4 for section titles
- **Gap Management**: 600 between sections, 300 within
- **ExtJS**: Fieldsets for grouping
- **TypeScript**: SettingsSection interface

### 7. IndeterminateState
- **Select All**: Parent checkbox controls all children
- **State Tracking**: allSelected, someSelected
- **Status Display**: "All selected", "Partially selected", "None selected"
- **Vanilla**: indeterminate property support
- **TypeScript**: Set-based state for efficiency

### 8. NestedGroups
- **Hierarchy**: Parent categories with subcategories
- **Conditional Rendering**: Only show subcategories when parent enabled
- **Cascade**: Parent selection sets all children
- **Visual**: marginLeft: 24px for nesting
- **ExtJS**: Container with itemId for visibility
- **TypeScript**: Recursive data structure

### 9. DisabledGroup
- **Disabled State**: All checkboxes disabled
- **Help Text**: Explains why disabled (plan limitations)
- **Empty Handler**: onChange={() => {}}
- **Visual**: opacity: 0.5, cursor: not-allowed
- **TypeScript**: DisabledFeature interface

## TypeScript Enhancements

All TypeScript variants include:

- **Interface Definitions**: Props, state, and data structures
- **Type Safety**: keyof, Record<string, boolean>
- **useCallback**: Memoized handlers with dependency arrays
- **useMemo**: Computed values (counts, prices)
- **JSX.Element**: Explicit return types
- **Optional Props**: Default values with destructuring

## ExtJS Patterns

Common ExtJS patterns used:

- **xtype**: 'checkboxfield', 'checkboxgroup', 'displayfield'
- **Form Methods**: updateSummary(), updateFilterCount()
- **Listeners**: change event with field.checked
- **Query**: this.query('checkbox'), this.down('#itemId')
- **Field Configuration**: boxLabel, name, checked, disabled

## Vanilla JS Patterns

Common Vanilla JS patterns:

- **Event Delegation**: querySelectorAll + forEach
- **Event Listeners**: 'change', 'blur'
- **DOM Manipulation**: textContent, style.display
- **Array Methods**: Array.from(), filter(), map()
- **Template Literals**: Dynamic text generation

## Testing Checklist

- [ ] All 9 story variations have unique keys
- [ ] getCodeVariants() calls match variant keys
- [ ] Code syntax is valid for all 4 languages
- [ ] Examples demonstrate story features accurately
- [ ] TypeScript interfaces are complete
- [ ] ExtJS listeners are properly scoped
- [ ] Vanilla JS IDs are unique
- [ ] Help text is descriptive and accurate

## Build Verification

```bash
# Verify Storybook builds
cd storybook
pnpm build

# Check for TypeScript errors
pnpm tsc --noEmit

# Run Storybook dev server
pnpm dev
# Visit http://localhost:6006
```

## Deployment

After integration:

1. Commit changes to git
2. Push to main branch
3. Netlify auto-deploys to https://cin7-dsl.netlify.app/storybook/
4. Verify code variants display in Storybook docs tabs

## Reference Files

- Full code variants: `CHECKBOX_GROUP_CODE_VARIANTS.md` (368 lines)
- Integration script: `checkboxgroup-integration-script.js`
- This guide: `CHECKBOX_GROUP_IMPLEMENTATION_GUIDE.md`

## Status

- ✅ All 9 story variations analyzed
- ✅ Code variants generated for all 4 languages
- ✅ Documentation created
- ⏳ Manual integration into codeVariants.ts required (file too large for automated edit)
- ⏳ Story file parameter updates pending

## Next Steps

1. Manually update codeVariants.ts with new variants
2. Update all story parameter blocks with correct keys
3. Test in Storybook dev server
4. Verify all code tabs display correctly
5. Build and deploy to production

---

**Generated**: 2025-11-08
**Component**: CheckboxGroup (Forms)
**Stories**: 9 variations
**Languages**: 4 (React, ExtJS, Vanilla JS, TypeScript)
**Total Code Examples**: 36 (9 stories × 4 languages)
