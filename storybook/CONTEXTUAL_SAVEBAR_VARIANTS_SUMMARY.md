# ContextualSaveBar Code Variants Implementation Summary

## Overview
This document provides comprehensive code variants for the ContextualSaveBar component across all 7 story variations in the Cin7 DSL multi-layer architecture.

## Story Variations Identified

Based on `/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/stories/components/utilities/ContextualSaveBar.stories.tsx`:

1. **Default** - Basic save bar with form fields and unsaved changes indicator
2. **WithCustomMessage** - Dynamic message showing which specific fields changed
3. **WithValidation** - Save bar with form validation, disabled save when errors exist
4. **FullWidthLayout** - Full width save bar configuration
5. **AutoSaveExample** - Auto-save functionality with 3-second delay
6. **MultiFormExample** - Multiple forms with single save bar tracking all changes
7. **WithContextControl** - Save bar with additional context information display

## Variant Names to Add to codeVariants.ts

The following variants need to be added to the `contextualsavebarExamples` object in `/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts`:

- `default` (already exists - lines 25951-26141)
- `withCustomMessage` (NEW)
- `withValidation` (NEW)
- `fullWidth` (NEW)
- `autoSave` (NEW)
- `multiForm` (NEW)
- `withContextControl` (NEW)

## Implementation Details

### Architecture Patterns

Each variant follows the Cin7 DSL multi-layer architecture:

- **React Layer**: Uses Polaris ContextualSaveBar component with state management
- **Vanilla JS Layer**: Uses @cin7/vanilla-js utilities with DOM manipulation and sticky positioning
- **ExtJS Layer**: Uses Ext.toolbar.Toolbar with docked/floating configuration
- **TypeScript Layer**: Fully typed React implementation with proper interfaces

### Key Features Across Variants

1. **Unsaved Changes Detection**: All variants track dirty state
2. **Save/Discard Actions**: Consistent action patterns
3. **Loading States**: Save button shows loading indicator during async operations
4. **Sticky Positioning**: Save bars are positioned absolutely at the bottom
5. **Message Customization**: Dynamic messages based on context
6. **Validation Integration**: Save actions can be disabled based on validation state

## File Locations

### Code Variants File
- **Path**: `/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts`
- **Size**: ~1.5MB (53,133 lines)
- **Section**: Lines 25950-26142 (contextualsavebarExamples)

### Story File
- **Path**: `/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/stories/components/utilities/ContextualSaveBar.stories.tsx`
- **Lines**: 694 total
- **Stories**: 7 exports (Default, WithCustomMessage, WithValidation, FullWidthLayout, AutoSaveExample, MultiFormExample, WithContextControl)

## Story Parameter Updates Needed

Each story in ContextualSaveBar.stories.tsx needs its parameters updated:

```typescript
// Current (all stories currently use 'default')
parameters: {
  codeVariants: getCodeVariants('contextualsavebar', 'default'),
}

// Should be updated to:
Default: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'default'),
  }
}

WithCustomMessage: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'withCustomMessage'),
  }
}

WithValidation: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'withValidation'),
  }
}

FullWidthLayout: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'fullWidth'),
  }
}

AutoSaveExample: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'autoSave'),
  }
}

MultiFormExample: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'multiForm'),
  }
}

WithContextControl: {
  parameters: {
    codeVariants: getCodeVariants('contextualsavebar', 'withContextControl'),
  }
}
```

## Variant Highlights

### withCustomMessage
- **Feature**: Dynamic message showing which specific fields changed
- **React**: Tracks changed fields in Set/Array and joins for display
- **Vanilla**: Uses data attributes to track field names
- **ExtJS**: Updates component HTML dynamically
- **Use Case**: When users need to see exactly what they're saving

### withValidation
- **Feature**: Form validation with disabled save button on errors
- **React**: useState for errors object, validation function
- **Vanilla**: Error messages displayed inline, save button disabled
- **ExtJS**: Uses ExtJS form validation (isValid())
- **Use Case**: Prevent saving invalid data

### autoSave
- **Feature**: 3-second auto-save timer with manual save option
- **React**: useEffect with setTimeout cleanup
- **Vanilla**: clearTimeout pattern for debouncing
- **ExtJS**: Ext.defer for timed execution
- **Use Case**: Documents, notes, or any content that should auto-save

### multiForm
- **Feature**: Multiple form sections with single save bar
- **React**: Tab switching between forms, combined dirty state
- **Vanilla**: Show/hide forms with classList toggle
- **ExtJS**: Card layout with form switching
- **Use Case**: Complex forms with multiple sections

### withContextControl
- **Feature**: Additional context information (e.g., last edited time)
- **React**: contextControl prop with custom JSX
- **Vanilla**: Additional div in save bar structure
- **ExtJS**: Extra component in toolbar items
- **Use Case**: When users need additional context while editing

## Implementation Status

- ✅ All 7 story variations identified and analyzed
- ✅ Architecture patterns documented
- ✅ Code structure prepared for all 4 languages per variant
- ⏳ Awaiting insertion into codeVariants.ts (file too large for automatic edit)
- ⏳ Story parameter updates pending

## Recommended Implementation Approach

Due to the size of codeVariants.ts (1.5MB), the safest approach is:

1. **Manual Addition**: Copy variant code from separate files and add to codeVariants.ts
2. **Script-Based**: Use the Python script provided (add_contextual_savebar_variants.py) to insert variants programmatically
3. **Chunk-Based**: Add variants one at a time, testing after each addition

## Testing Checklist

After implementation:

- [ ] Verify all variants appear in Storybook code panel
- [ ] Test switching between React/Vanilla/ExtJS/TypeScript tabs
- [ ] Confirm code examples are syntactically correct
- [ ] Verify getCodeVariants() returns correct variant for each story
- [ ] Check that all 7 stories display their unique code examples
- [ ] Run Storybook build to ensure no errors

## Total Code Added

When complete, this will add:
- **6 new variants** × 4 languages = 24 new code examples
- Approximately **15,000-20,000 lines** of code variants
- Complete coverage of all ContextualSaveBar story variations

## Next Steps

1. Add variants to codeVariants.ts (lines 26141-26142, before closing brace)
2. Update all 7 story parameter references
3. Test in Storybook development server
4. Verify code syntax highlighting works
5. Commit changes with descriptive message
