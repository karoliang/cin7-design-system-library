# DatePicker Code Variants - Complete Implementation Guide

## Overview

This document provides comprehensive code variants for all 13 DatePicker story variations across 4 languages (React, Vanilla JS, ExtJS, TypeScript).

## Current Status

**Existing**: Only `default` variant exists in `codeVariants.ts`
**To Add**: 12 additional variants (52 new code examples total)

## File Locations

- **Stories File**: `/storybook/stories/components/forms/DatePicker.stories.tsx`
- **Code Variants File**: `/storybook/.storybook/blocks/codeVariants.ts`
- **Line Numbers**: DatePicker examples start at line ~22438 in codeVariants.ts

## Story Variations Analysis

| # | Story Name | Current Variant | Should Use | Description |
|---|------------|----------------|------------|-------------|
| 1 | Default | `default` ✓ | `default` | Basic single date selection |
| 2 | WithPlaceholder | `default` | `default` | Range with no initial selection |
| 3 | DateRange | `default` ❌ | `dateRange` | Date range with display |
| 4 | MultiMonth | `default` ❌ | `multiMonth` | Shows 2 months side-by-side |
| 5 | WithDateRestrictions | `default` ❌ | `withRestrictions` | Limited to specific date range |
| 6 | PastDatesOnly | `default` ❌ | `pastDatesOnly` | Only historical dates |
| 7 | Disabled | `default` ❌ | `disabled` | Non-interactive state |
| 8 | WeekStartMonday | `default` ❌ | `weekStartMonday` | Europeanweek configuration |
| 9 | HotelBooking | `default` ❌ | `hotelBooking` | Complex validation example |
| 10 | EventScheduling | `default` ❌ | `eventScheduling` | With event type selection |
| 11 | DateRangeComparison | `default` ❌ | `dateComparison` | Dual date range pickers |
| 12 | AccessibilityExamples | `default` ❌ | `accessibility` | A11y features demo |

## Implementation Steps

### Step 1: Update Stories File

In `DatePicker.stories.tsx`, update the `parameters.codeVariants` for each story:

```typescript
// Line 154 - DateRange story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'dateRange'),  // Changed from 'default'
},

// Line 183 - MultiMonth story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'multiMonth'),  // Changed from 'default'
},

// Line 222 - WithDateRestrictions story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'withRestrictions'),  // Changed from 'default'
},

// Line 261 - PastDatesOnly story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'pastDatesOnly'),  // Changed from 'default'
},

// Line 289 - Disabled story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'disabled'),  // Changed from 'default'
},

// Line 322 - WeekStartMonday story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'weekStartMonday'),  // Changed from 'default'
},

// Line 389 - HotelBooking story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'hotelBooking'),  // Changed from 'default'
},

// Line 477 - EventScheduling story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'eventScheduling'),  // Changed from 'default'
},

// Line 556 - DateRangeComparison story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'dateComparison'),  // Changed from 'default'
},

// Line 602 - AccessibilityExamples story
parameters: {
  codeVariants: getCodeVariants('datepicker', 'accessibility'),  // Changed from 'default'
},
```

### Step 2: Add Variants to codeVariants.ts

In `codeVariants.ts` at line ~22509 (after the `default` variant closing brace), add a comma and insert all 12 new variants.

The structure should be:

```typescript
export const datePickerExamples: Record<string, CodeVariant> = {
  default: {
    // ... existing default variant ...
  },  // ← Add comma here
  dateRange: {
    react: `...`,
    vanilla: `...`,
    extjs: `...`,
    typescript: `...`
  },
  multiMonth: {
    react: `...`,
    vanilla: `...`,
    extjs: `...`,
    typescript: `...`
  },
  // ... continue for all 12 new variants ...
};
```

## Complete Code Variants

Due to the large size (approx. 2,500 lines of code), the complete variants are documented in the companion file:
**`DATEPICKER_CODE_VARIANTS_FULL.md`**

That file contains all 52 code examples (12 variants × 4 languages) ready to copy-paste into `codeVariants.ts`.

## Key Features of Each Variant

### dateRange
- React: Full range selection with visual feedback
- Vanilla JS: Two date inputs with synchronized display
- ExtJS: Form panel with dynamic range calculation
- TypeScript: Type-safe interfaces for DateRange

### multiMonth
- React: Side-by-side month display
- Vanilla JS: Two independent date pickers
- ExtJS: Horizontal panel layout with dual pickers
- TypeScript: Configurable initial date

### withRestrictions
- React: Min/max date enforcement with helper text
- Vanilla JS: HTML5 min/max attributes with validation
- ExtJS: minValue/maxValue configuration
- TypeScript: Flexible min/max props

### pastDatesOnly
- React: Historical date selection only
- Vanilla JS: Max date set to today
- ExtJS: maxValue constraint
- TypeScript: Validation in onChange handler

### disabled
- React: Non-interactive display state
- Vanilla JS: Disabled attribute with visual styling
- ExtJS: disabled: true configuration
- TypeScript: Optional selectedDate prop

### weekStartMonday
- React: weekStartsOn={1} prop
- Vanilla JS: Custom data attribute
- ExtJS: startDay: 1 configuration
- TypeScript: Configurable weekStart prop (0-6)

### hotelBooking
- React: Complex validation with minimum nights
- Vanilla JS: Real-time validation with error display
- ExtJS: Form validation with summary display
- TypeScript: Type-safe booking interfaces

### eventScheduling
- React: Event type selection with date picker
- Vanilla JS: Select + date picker with summary
- ExtJS: Combobox + datefield integration
- TypeScript: EventType union types

### dateComparison
- React: Dual range pickers with comparison summary
- Vanilla JS: Four date inputs with calculation logic
- ExtJS: Nested fieldsets with dynamic comparison
- TypeScript: Complex state management with types

### accessibility
- React: ARIA regions and announcements
- Vanilla JS: Full ARIA implementation with screen reader support
- ExtJS: Built-in accessibility features documented
- TypeScript: Configurable ARIA props

## Testing Checklist

After implementation, verify:

- [ ] All 13 stories render without errors
- [ ] Code variant tabs appear for each story
- [ ] All 4 language tabs work correctly
- [ ] Code syntax highlighting displays properly
- [ ] Examples are practical and follow best practices
- [ ] TypeScript examples compile without errors
- [ ] EventBus integration consistent across examples
- [ ] Storybook build completes successfully

## Architecture Notes

### Cross-Layer Integration

All examples demonstrate the Cin7 DSL multi-layer architecture:

1. **React (Shopify Polaris)**: UI Component Layer
2. **Vanilla JS**: UI Interaction Layer
3. **ExtJS**: Enterprise Component Layer
4. **TypeScript**: Business Logic Layer

### EventBus Communication

All variants use `EventBus.emit()` to demonstrate:
- Loose coupling between layers
- Event-driven architecture
- Cross-framework communication patterns

### Type Safety

TypeScript variants include:
- Interface definitions
- Union types for constrained values
- Optional callback props
- Proper JSX.Element return types

## File Size Impact

- **Before**: ~22,500 lines
- **After**: ~25,000 lines (+2,500 lines)
- **Total Examples**: 52 new code examples
- **Coverage**: 100% of DatePicker story variations

## Maintenance Notes

When adding new DatePicker stories in the future:

1. Add story to `DatePicker.stories.tsx`
2. Create corresponding variant in `codeVariants.ts`
3. Ensure all 4 languages are implemented
4. Update this documentation
5. Test in Storybook dev mode
6. Verify in production build

## Related Files

- `/stories/components/forms/DatePicker.stories.tsx` - Storybook stories
- `/.storybook/blocks/codeVariants.ts` - Code variant definitions
- `/.storybook/blocks/CodeVariantBlock.tsx` - Rendering component
- `/DATEPICKER_CODE_VARIANTS.md` - Quick reference
- `/DATEPICKER_CODE_VARIANTS_FULL.md` - Complete code listings

## Next Steps

1. Apply story parameter updates to `DatePicker.stories.tsx`
2. Add all 12 variants to `codeVariants.ts`
3. Test in development: `pnpm dev`
4. Build Storybook: `pnpm build`
5. Deploy to Netlify
6. Verify all variants display correctly in production

---

Generated: 2025-11-08
Component: DatePicker (Forms category)
Total Variants: 13
Total Code Examples: 52 (13 × 4 languages)
