# Popover Component Code Variants Integration Guide

## Overview
This guide provides comprehensive code variants for all 12 Popover story variations in the Cin7 DSL Storybook.

## Variants to Add

### Story Mapping
The following variants need to be added to the `popoverExamples` object in `codeVariants.ts`:

1. **default** - ✅ Already exists (update with icons)
2. **buttonActivator** - Simple button-triggered popover with text content
3. **textLinkActivator** - Text link/plain button as activator
4. **positions** - Demonstrates 6 different position combinations (above/below × left/center/right)
5. **withActionList** - Popover containing an ActionList with CRUD actions
6. **withSections** - Multiple titled sections within popover
7. **withForm** - Form inputs inside popover (Quick Add Customer)
8. **dismissible** - Demonstrates multiple dismissal methods
9. **customWidth** - Wide popover with fullWidth and fluidContent props
10. **interactiveExamples** - Four interactive popovers (Share, Filter, Sort, More)
11. **accessibility** - Demonstrates accessibility features and keyboard navigation

## Integration Steps

### Step 1: Locate the popoverExamples Object
In `/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts`:

Find line ~36036 where `export const popoverExamples: Record<string, CodeVariant> = {` begins.

### Step 2: Add New Variants
After the existing `default` variant (ends around line ~36159), add all the variants from:
- `popover-variants-addition.ts` (8 variants: buttonActivator through customWidth)
- `popover-variants-addition-part2.ts` (2 variants: interactiveExamples and accessibility)

Make sure to maintain proper TypeScript syntax with commas between variants.

### Step 3: Update Story Parameters
Update `/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/stories/components/feedback/Popover.stories.tsx`:

Replace all `getCodeVariants('popover', 'default')` calls with the appropriate variant names:

```typescript
// Line 107 - Default story
parameters: {
  codeVariants: getCodeVariants('popover', 'default'),
},

// Line 139 - ButtonActivator story
parameters: {
  codeVariants: getCodeVariants('popover', 'buttonActivator'),
},

// Line 172 - TextLinkActivator story
parameters: {
  codeVariants: getCodeVariants('popover', 'textLinkActivator'),
},

// Line 264 - Positions story
parameters: {
  codeVariants: getCodeVariants('popover', 'positions'),
},

// Line 318 - WithActionList story
parameters: {
  codeVariants: getCodeVariants('popover', 'withActionList'),
},

// Line 362 - WithSections story
parameters: {
  codeVariants: getCodeVariants('popover', 'withSections'),
},

// Line 423 - WithForm story
parameters: {
  codeVariants: getCodeVariants('popover', 'withForm'),
},

// Line 467 - Dismissible story
parameters: {
  codeVariants: getCodeVariants('popover', 'dismissible'),
},

// Line 509 - CustomWidth story
parameters: {
  codeVariants: getCodeVariants('popover', 'customWidth'),
},

// Line 613 - InteractiveExamples story
parameters: {
  codeVariants: getCodeVariants('popover', 'interactiveExamples'),
},

// Line 663 - AccessibilityDemo story
parameters: {
  codeVariants: getCodeVariants('popover', 'accessibility'),
},
```

## Variant Details

### Architecture Compliance
All variants follow the Cin7 DSL multi-layer architecture:

- **React**: Uses Shopify Polaris Popover component with full prop support
- **Vanilla JS**: Uses @cin7/vanilla-js utilities for DOM manipulation and positioning
- **ExtJS**: Uses Ext.tip.ToolTip, Ext.panel.Panel, and Ext.button.Button with menus
- **TypeScript**: Fully typed React implementations with proper interfaces

### Key Features Demonstrated

1. **Different Activators**: Buttons (regular, disclosure, plain)
2. **Positioning**: 6 position combinations with preferredAlignment and preferredPosition props
3. **Content Types**: Text, ActionLists, Forms, Multiple Sections
4. **Interactivity**: Action handlers, form submissions, multi-popover management
5. **Dismissal**: Click outside, Escape key, explicit close buttons
6. **Sizing**: fullWidth, fluidContent, custom min/max widths
7. **Accessibility**: ARIA attributes, keyboard navigation, focus management

## Testing
After integration:

1. Run Storybook: `cd storybook && pnpm dev`
2. Navigate to Components → Overlays → Popover
3. Verify each story shows code examples in all 4 languages
4. Test code switcher tabs work properly
5. Verify code examples match the rendered component behavior

## Files Modified
- ✅ `popover-variants-addition.ts` - Created (8 variants)
- ✅ `popover-variants-addition-part2.ts` - Created (2 variants)
- ⏳ `.storybook/blocks/codeVariants.ts` - To be updated (add variants to popoverExamples)
- ⏳ `stories/components/feedback/Popover.stories.tsx` - To be updated (update getCodeVariants calls)

## Cleanup
After successful integration and testing:
- Delete `popover-variants-addition.ts`
- Delete `popover-variants-addition-part2.ts`
- Delete this file (`POPOVER_VARIANTS_INTEGRATION.md`)
