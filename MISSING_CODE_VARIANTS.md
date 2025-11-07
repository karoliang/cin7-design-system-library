# Missing Code Variants Report

**Generated**: 2025-11-07
**Status**: 606 stories missing code variant parameters

## Summary

A comprehensive audit of all Storybook stories revealed **606 stories** across **81 files** that are missing `codeVariants` parameters. This means these stories won't display multi-language code examples (React, ExtJS, Vanilla JS, TypeScript) in the documentation.

### Impact by Category

| Category | Files | Missing Stories | Priority |
|----------|-------|-----------------|----------|
| Components - Utilities | 17 | 145 | High |
| Components - Forms | 13 | 100 | High |
| Components - Feedback | 10 | 74 | Medium |
| Components - Layout | 10 | 74 | Medium |
| Components - Data Display | 8 | 72 | Medium |
| Components - Media | 5 | 54 | High |
| Components - Navigation | 5 | 27 | Low |
| Components - Actions | 3 | 22 | Low |
| Business Patterns | 3 | 8 | Low |
| Other | 7 | 30 | Low |

---

## Top 30 Files Needing Attention

Files with the most missing code variant parameters:

1. `components/media/MediaCard.stories.tsx` - 14 missing
2. `components/forms/OptionList.stories.tsx` - 13 missing
3. `components/data-display/List.stories.tsx` - 12 missing
4. `components/feedback/Tooltip.stories.tsx` - 12 missing
5. `components/forms/ChoiceList.stories.tsx` - 12 missing
6. `components/utilities/Filters.stories.tsx` - 12 missing
7. `components/actions/ButtonGroup.stories.tsx` - 11 missing
8. `components/data-display/ResourceItem.stories.tsx` - 11 missing
9. `components/feedback/CalloutCard.stories.tsx` - 11 missing
10. `components/forms/DatePicker.stories.tsx` - 11 missing
11. `components/layout/AlphaStack.stories.tsx` - 11 missing
12. `components/layout/Box.stories.tsx` - 11 missing
13. `components/utilities/KeyboardKey.stories.tsx` - 11 missing
14. `components/media/Avatar.stories.tsx` - 10 missing
15. `components/media/Image.stories.tsx` - 10 missing
16. `components/media/Thumbnail.stories.tsx` - 10 missing
17. `components/media/VideoThumbnail.stories.tsx` - 10 missing
18. `components/utilities/DropZone.stories.tsx` - 10 missing
19. `components/utilities/Scrollable.stories.tsx` - 10 missing
20. `components/utilities/Tag.stories.tsx` - 10 missing
21. `components/utilities/Text.stories.tsx` - 10 missing
22. `components/data-display/ExceptionList.stories.tsx` - 9 missing
23. `components/data-display/IndexTable.stories.tsx` - 9 missing
24. `components/data-display/ResourceList.stories.tsx` - 9 missing
25. `components/feedback/Popover.stories.tsx` - 9 missing
26. `components/forms/Autocomplete.stories.tsx` - 9 missing
27. `components/forms/CheckboxGroup.stories.tsx` - 9 missing
28. `components/forms/ColorPicker.stories.tsx` - 9 missing
29. `components/forms/Combobox.stories.tsx` - 9 missing
30. `components/forms/FormLayout.stories.tsx` - 9 missing

---

## How Code Variants Work

### Current Implementation

Stories with code variants show multi-language examples:

```typescript
export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    codeVariants: getCodeVariants('button', 'default'),
  },
};
```

This fetches code examples from `codeVariants.ts`:
- React implementation
- ExtJS implementation
- Vanilla JS implementation
- TypeScript pattern

### Missing Implementation

Stories without code variants show the component but no code examples:

```typescript
export const Sizes: Story = {
  render: () => (
    <div>
      <Button size="micro">Micro</Button>
      <Button size="slim">Slim</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
  // ❌ Missing: parameters: { codeVariants: getCodeVariants('button', 'sizes') }
};
```

---

## Resolution Strategy

### Phase 1: High Priority (Immediate)
**Target**: Top 30 files (345 stories)

1. **Media Components** (54 stories)
   - MediaCard, Avatar, Image, Thumbnail, VideoThumbnail

2. **Forms** (100 stories)
   - OptionList, ChoiceList, DatePicker, Autocomplete, CheckboxGroup, ColorPicker, Combobox, FormLayout

3. **Utilities** (145 stories)
   - Filters, KeyboardKey, DropZone, Scrollable, Tag, Text

**Action Items**:
- Create code variant entries in `codeVariants.ts` for each missing variant
- Add `parameters: { codeVariants: getCodeVariants(...) }` to story definitions
- Test locally before deploying

---

### Phase 2: Medium Priority (Next Sprint)
**Target**: Remaining 261 stories

1. **Feedback Components** (74 stories)
2. **Layout Components** (74 stories)
3. **Data Display** (72 stories)
4. **Other** (41 stories)

---

### Phase 3: Low Priority (Future)
**Target**: Optional enhancements

1. **Navigation Components** (27 stories)
2. **Actions** (22 stories)
3. **Business Patterns** (8 stories)

---

## Automation Opportunities

### Script 1: Generate Missing Variants

Create a script to automatically generate code variant templates:

```typescript
// generate-missing-variants.ts
const MISSING_VARIANTS = [
  { component: 'mediacard', variant: 'with-actions' },
  { component: 'mediacard', variant: 'without-description' },
  // ... 606 more
];

MISSING_VARIANTS.forEach(({ component, variant }) => {
  generateCodeVariant(component, variant);
});
```

### Script 2: Bulk Update Stories

Automatically add `codeVariants` parameters to stories:

```typescript
// update-stories.ts
const STORIES_TO_UPDATE = [
  { file: 'MediaCard.stories.tsx', story: 'WithActions', variant: 'with-actions' },
  // ... 606 more
];

STORIES_TO_UPDATE.forEach(({ file, story, variant }) => {
  addCodeVariantsParameter(file, story, variant);
});
```

---

## Exclusions

The following story types are intentionally excluded from this audit:

1. **Implementation Demos**: VanillaJS, ExtJS, TypeScript stories (show language-specific implementations)
2. **Variant Collections**: Variants, Sizes stories (show multiple variants in one view)
3. **Interactive Demos**: Interactive, AccessibilityDemo stories (focus on behavior, not code)
4. **Example Showcases**: IntegrationExample, FormExample stories (comprehensive examples)

---

## Next Steps

1. **Review this document** and prioritize which components to tackle first
2. **Create code variant templates** for high-priority components
3. **Update story files** with code variant parameters
4. **Test locally** to ensure all code examples display correctly
5. **Deploy incrementally** to avoid breaking changes

---

## Notes

- This audit was performed on 2025-11-07
- Total files analyzed: 91
- Detection method: Stories with `render:` function but no `parameters.codeVariants`
- False positives: ~0 (manual verification performed on top 30 files)

---

## Related Files

- Audit script: `/tmp/audit_missing_variants.py` (generated during analysis)
- Code variants: `storybook/.storybook/blocks/codeVariants.ts`
- Example story: `storybook/stories/components/actions/Button.stories.tsx`
