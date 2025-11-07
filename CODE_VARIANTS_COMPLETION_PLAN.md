# Code Variants Completion Plan

**Goal**: Add complete, variation-specific code examples (React, Vanilla JS, ExtJS, TypeScript) for ALL story variations across ALL 34 affected components.

**Scope**: ~300-350 variations × 4 languages = ~1,200-1,400 code examples

**Status**: Started 2025-11-07

---

## Progress Overview

- **Total Components**: 34
- **Total Variations Needed**: ~340
- **Completed Variations**: 3 (ButtonGroup: default, segmented, fullwidth)
- **Remaining Variations**: ~337
- **Completion**: 0.9%

---

## Component Checklist

### ✅ Completed Components (0/34)

None yet

### 🚧 In Progress (1/34)

#### 1. ButtonGroup (3/12 variations complete)
**File**: `storybook/stories/components/actions/ButtonGroup.stories.tsx`
**Status**: 25% complete

| Variation | Story Name | Status | Languages |
|-----------|------------|--------|-----------|
| ✅ default | Default | Done | React, Vanilla, ExtJS, TS |
| ✅ segmented | SegmentedControl | Done | React, Vanilla, ExtJS, TS |
| ✅ fullwidth | FullWidthGroup | Done | React, Vanilla, ExtJS, TS |
| ⏳ variant-group | VariantGroup | Pending | - |
| ⏳ icon-buttons | IconButtons | Pending | - |
| ⏳ toggle-group | ToggleGroup | Pending | - |
| ⏳ navigation | NavigationGroup | Pending | - |
| ⏳ size-variations | SizeVariations | Pending | - |
| ⏳ action-groups | ActionGroups | Pending | - |
| ⏳ state-variations | StateVariations | Pending | - |
| ⏳ connected | ConnectedButtons | Pending | - |
| ⏳ responsive | ResponsiveGroup | Pending | - |

**Next Steps**:
1. Create 9 remaining variations
2. Update story files to request correct variation names

---

### 📋 Pending Components (33/34)

#### High Priority (Must Have Unique Variations)

##### 2. AppProvider (0/7 variations complete)
**File**: `storybook/stories/components/utilities/AppProvider.stories.tsx`

| Variation | Story Name | Status |
|-----------|------------|--------|
| ✅ default | Default | Done |
| ⏳ with-custom-i18n | WithCustomI18n | Pending |
| ⏳ with-custom-theme | WithCustomTheme | Pending |
| ⏳ with-custom-link | WithCustomLinkComponent | Pending |
| ⏳ nested-providers | NestedProviders | Pending |
| ⏳ complete-app | CompleteApplication | Pending |
| ⏳ error-boundary | ErrorBoundary | Pending |

##### 3. Modal (0/10 variations)
**File**: `storybook/stories/components/feedback/Modal.stories.tsx`
**Variations**: Default, Small, Large, FullScreen, WithPrimaryAction, WithSecondaryActions, WithoutHeader, WithScrollableContent, WithForm, PreventClose

##### 4. DataTable (0/12 variations)
**File**: `storybook/stories/components/data-display/DataTable.stories.tsx`
**Variations**: Default, Sortable, Filterable, WithPagination, WithSelection, Grouped, Expandable, WithCustomCells, WithActions, Loading, Empty, LargeDataset

##### 5. FormLayout (0/9 variations)
**File**: `storybook/stories/components/forms/FormLayout.stories.tsx`
**Variations**: Default, TwoColumns, ThreeColumns, Grouped, Condensed, WithHelp Text, WithErrors, FieldGroup, Responsive

#### Medium Priority (Some Unique Variations)

##### 6. Autocomplete (0/9 variations)
**File**: `storybook/stories/components/forms/Autocomplete.stories.tsx`

##### 7. Avatar (0/13 variations)
**File**: `storybook/stories/components/media/Avatar.stories.tsx`

##### 8. Badge (0/11 variations)
**File**: `storybook/stories/components/utilities/Badge.stories.tsx`

##### 9. ChoiceList (0/12 variations)
**File**: `storybook/stories/components/forms/ChoiceList.stories.tsx`

##### 10. ColorPicker (0/9 variations)
**File**: `storybook/stories/components/forms/ColorPicker.stories.tsx`

##### 11. Combobox (0/9 variations)
**File**: `storybook/stories/components/forms/Combobox.stories.tsx`

##### 12. DatePicker (0/12 variations)
**File**: `storybook/stories/components/forms/DatePicker.stories.tsx`

##### 13. DescriptionList (0/13 variations)
**File**: `storybook/stories/components/data-display/DescriptionList.stories.tsx`

##### 14. DropZone (0/10 variations)
**File**: `storybook/stories/components/utilities/DropZone.stories.tsx`

##### 15. IndexTable (0/10 variations)
**File**: `storybook/stories/components/data-display/IndexTable.stories.tsx`

##### 16. MediaCard (0/15 variations)
**File**: `storybook/stories/components/media/MediaCard.stories.tsx`

##### 17. RangeSlider (0/11 variations)
**File**: `storybook/stories/components/forms/RangeSlider.stories.tsx`

##### 18. ResourceItem (0/12 variations)
**File**: `storybook/stories/components/data-display/ResourceItem.stories.tsx`

##### 19. ResourceList (0/9 variations)
**File**: `storybook/stories/components/data-display/ResourceList.stories.tsx`

##### 20. Tag (0/11 variations)
**File**: `storybook/stories/components/utilities/Tag.stories.tsx`

##### 21. Thumbnail (0/12 variations)
**File**: `storybook/stories/components/media/Thumbnail.stories.tsx`

##### 22. VideoThumbnail (0/11 variations)
**File**: `storybook/stories/components/media/VideoThumbnail.stories.tsx`

#### Lower Priority (Mostly Layout/Spacing Variations)

##### 23. AlphaStack (0/12 variations)
**File**: `storybook/stories/components/layout/AlphaStack.stories.tsx`

##### 24. Bleed (0/9 variations)
**File**: `storybook/stories/components/layout/Bleed.stories.tsx`

##### 25. BlockStack (0/10 variations)
**File**: `storybook/stories/components/layout/BlockStack.stories.tsx`

##### 26. Box (0/12 variations)
**File**: `storybook/stories/components/layout/Box.stories.tsx`

##### 27. Divider (0/9 variations)
**File**: `storybook/stories/components/utilities/Divider.stories.tsx`

##### 28. Grid (0/9 variations)
**File**: `storybook/stories/components/layout/Grid.stories.tsx`

##### 29. InlineStack (0/10 variations)
**File**: `storybook/stories/components/layout/InlineStack.stories.tsx`

##### 30. KeyboardKey (0/12 variations)
**File**: `storybook/stories/components/utilities/KeyboardKey.stories.tsx`

##### 31. Layout (0/10 variations)
**File**: `storybook/stories/components/layout/Layout.stories.tsx`

##### 32. Page (0/10 variations)
**File**: `storybook/stories/components/layout/Page.stories.tsx`

##### 33. VerticalStack (0/10 variations)
**File**: `storybook/stories/components/layout/VerticalStack.stories.tsx`

##### 34. BasicComponents (0/10 variations)
**File**: `storybook/stories/components/utilities/BasicComponents.stories.tsx`

---

## Execution Strategy

### Phase 1: Complete Current Components (Week 1)
- **Day 1**: Complete ButtonGroup (9 remaining variations)
- **Day 2**: Complete AppProvider (6 variations)
- **Day 3**: Complete Modal (10 variations)
- **Day 4**: Complete DataTable (12 variations)
- **Day 5**: Complete FormLayout (9 variations)

**Target**: 5 components, 46 variations, 184 code examples

### Phase 2: Medium Priority Components (Week 2)
- **Days 6-10**: Complete 13 medium-priority components
  - Autocomplete, Avatar, Badge, ChoiceList, ColorPicker, Combobox, DatePicker, DescriptionList, DropZone, IndexTable, MediaCard, RangeSlider, ResourceItem, ResourceList, Tag, Thumbnail, VideoThumbnail

**Target**: 17 components, ~170 variations, ~680 code examples

### Phase 3: Lower Priority Components (Week 3)
- **Days 11-15**: Complete 12 layout/utility components
  - AlphaStack, Bleed, BlockStack, Box, Divider, Grid, InlineStack, KeyboardKey, Layout, Page, VerticalStack, BasicComponents

**Target**: 12 components, ~124 variations, ~496 code examples

---

## Quality Standards

Each code variant must include:

1. **React Example**
   - Full working component
   - Proper imports from @shopify/polaris
   - State management where needed
   - TypeScript types
   - Export statement

2. **Vanilla JS Example**
   - HTML structure
   - CSS styling
   - JavaScript behavior using @cin7/vanilla-js
   - Event handlers
   - DOM manipulation

3. **ExtJS Example**
   - ExtJS component creation
   - Proper config objects
   - Event handlers
   - renderTo target

4. **TypeScript Example**
   - Full type definitions
   - Interface declarations
   - Generic types where appropriate
   - Proper return types
   - Business logic patterns

---

## Automation Tools

1. **Agent-Based Generation**
   - Use Task agents to read story files
   - Extract component props and usage
   - Generate code templates
   - Adapt templates for each language

2. **Batch Processing**
   - Process components in groups of 3-5
   - Commit after each component completion
   - Deploy and verify regularly

3. **Verification**
   - Build Storybook after each batch
   - Spot-check variations manually
   - Verify no console errors

---

## Tracking

- **Start Date**: 2025-11-07
- **Target Completion**: 2025-11-28 (3 weeks)
- **Current Sprint**: Week 1, Day 1
- **Last Updated**: 2025-11-07
- **Completed**: 3/340 variations (0.9%)

---

## Notes

- Prioritize quality over speed
- Each variation should teach something unique
- Avoid copy-paste between variations - make each meaningful
- Test in Storybook frequently
- Commit often with clear messages
