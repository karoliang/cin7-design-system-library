# Remaining Components - Quick Reference

**Status:** Ready to process after API rate limit reset
**Total Remaining:** 25 component story files
**Estimated Time:** 3-4 additional sessions

---

## Priority 1: Blocked Batch 8 Tasks (6 components)

These were ready to launch but hit the API rate limit. Retry these first:

1. **DescriptionList** - `/storybook/stories/components/data-display/DescriptionList.stories.tsx`
   - Use dl/dt/dd elements
   - Show term/description patterns
   - Multiple spacing and layout variations

2. **List** - `/storybook/stories/components/data-display/List.stories.tsx`
   - Ordered and unordered lists
   - Nested lists
   - Custom bullet styles

3. **KeyboardKey** - `/storybook/stories/components/utilities/KeyboardKey.stories.tsx`
   - Single keys (Ctrl, Alt, Esc)
   - Key combinations (Ctrl+C, Cmd+V)
   - Modifier key displays

4. **Tag** - `/storybook/stories/components/utilities/Tag.stories.tsx`
   - Removable tags with close handlers
   - Disabled tags
   - Tag groups/collections
   - Color variations

5. **VideoThumbnail** - `/storybook/stories/components/media/VideoThumbnail.stories.tsx`
   - Video thumbnails with play overlays
   - Progress indicators
   - Different aspect ratios

6. **FooterHelp** - `/storybook/stories/components/navigation/FooterHelp.stories.tsx`
   - Help text with links
   - Documentation links
   - Contact support patterns

---

## Priority 2: High-Usage Components (5 components)

These are commonly used and should be prioritized:

7. **Button** - `/storybook/stories/components/actions/Button.stories.tsx`
   - Primary, secondary, plain, destructive
   - Sizes (small, medium, large)
   - With icons, loading states
   - Full width, disabled states

8. **Tag** - (Same as Priority 1 #4)

9. **Pagination** - `/storybook/stories/components/utilities/Pagination.stories.tsx`
   - Page navigation
   - Items per page selector
   - Jump to page
   - Total items display

10. **Image** - `/storybook/stories/components/media/Image.stories.tsx`
    - Different sources
    - Alt text patterns
    - Loading states
    - Aspect ratio handling

11. **Text** - `/storybook/stories/components/utilities/Text.stories.tsx`
    - Typography variants
    - Colors and tones
    - Alignment options
    - Truncation patterns

---

## Priority 3: Action Components (2 components)

12. **ActionMenu** - `/storybook/stories/components/actions/ActionMenu.stories.tsx`
    - Dropdown action menus
    - With icons and sections
    - Destructive actions
    - Disabled items

13. **BulkActions** - `/storybook/stories/components/actions/BulkActions.stories.tsx`
    - Multi-select actions
    - Promoted bulk actions
    - Selection indicators
    - Action confirmation

---

## Priority 4: Data Display (3 components)

14. **IndexFilters** - `/storybook/stories/components/data-display/IndexFilters.stories.tsx`
    - Filter configurations
    - Applied filters display
    - Filter removal
    - Search integration

15. **ResourceItem** - `/storybook/stories/components/data-display/ResourceItem.stories.tsx`
    - Individual resource items
    - With media (thumbnails, avatars)
    - Actions and shortcuts
    - Selection states

16. **ExceptionList** - `/storybook/stories/components/data-display/ExceptionList.stories.tsx`
    - Error messages
    - Warning lists
    - Exception details
    - Action buttons

---

## Priority 5: Feedback & Layout (3 components)

17. **Sheet** - `/storybook/stories/components/feedback/Sheet.stories.tsx`
    - Side panel overlays
    - With content and actions
    - Closeable sheets
    - Different sizes

18. **Loading** - `/storybook/stories/components/feedback/Loading.stories.tsx`
    - Full-page loading
    - Inline loading indicators
    - Loading with messages
    - Skeleton states

19. **AlphaStack** - `/storybook/stories/components/layout/AlphaStack.stories.tsx`
    - Vertical stacking (alpha version)
    - Gap variations
    - Alignment options
    - Responsive layouts

---

## Priority 6: Utility Components (6 components)

20. **Collapsible** - `/storybook/stories/components/utilities/Collapsible.stories.tsx`
    - Expand/collapse panels
    - With animations
    - Controlled and uncontrolled
    - Nested collapsibles

21. **ContextualSaveBar** - `/storybook/stories/components/utilities/ContextualSaveBar.stories.tsx`
    - Unsaved changes indicator
    - Save/discard actions
    - With messages
    - Sticky positioning

22. **DropZone** - `/storybook/stories/components/utilities/DropZone.stories.tsx`
    - File upload dropzone
    - Drag and drop handlers
    - File type validation
    - Multiple file upload

23. **TextContainer** - `/storybook/stories/components/utilities/TextContainer.stories.tsx`
    - Content width control
    - Spacing management
    - Typography containers
    - Responsive text blocks

24. **BasicComponents** - `/storybook/stories/components/utilities/BasicComponents.stories.tsx`
    - Core component examples
    - Common patterns
    - Integration examples

25. **EcommerceComponents** - `/storybook/stories/components/utilities/EcommerceComponents.stories.tsx`
    - E-commerce patterns
    - Product displays
    - Cart interactions
    - Checkout flows

---

## Additional Context Components (Not Required)

These are demo/guide components that may not need code variants:

- **KeypressListener** - Event listener utility (guides only)
- **Charts** (3 files) - Already have code variants
- **Business Patterns** (3 files) - Already documented
- **Foundation** (2 files) - Design tokens and utilities
- **Guides** (3 files) - Getting started guides
- **Integration** (2 files) - E2E examples
- **Demo** (1 file) - Multi-language code demo

---

## Batch Processing Strategy

### Session 1 (After rate limit reset)
- Process Priority 1 (6 components)
- Estimated: 2-3 hours

### Session 2
- Process Priority 2 (5 components, Button is complex)
- Estimated: 2-3 hours

### Session 3
- Process Priority 3-4 (5 components)
- Estimated: 2 hours

### Session 4
- Process Priority 5-6 (9 components)
- Estimated: 3-4 hours

---

## Task Launch Template

For each component, use this pattern:

```
Steps:
1. Read `/storybook/stories/components/{category}/{Component}.stories.tsx` to identify all story exports
2. Generate code variants in all 4 languages (react, vanilla, extjs, typescript) for each story variation
3. Add variants to `/storybook/.storybook/blocks/codeVariants.ts` using the Edit tool
4. Update story file parameters to reference the new variant names using getCodeVariants('{component}', 'variantName')

Follow the Cin7 DSL multi-layer architecture:
- React: Use Polaris {Component} component
- Vanilla: Use @cin7/vanilla-js utilities
- ExtJS: Use appropriate Ext.* components
- TypeScript: Fully typed React implementation

Include [specific features for this component].

Return a summary of all variants added and story parameters updated.
```

---

## Known Issues to Watch

1. **File Size** - codeVariants.ts is 41,000+ lines, edits are slow
2. **Token Limits** - Keep agent responses under 32K tokens
3. **File Locking** - Linter/formatter may modify files concurrently
4. **Template Escaping** - Use `\\\`` and `\\\${` for nested templates

---

## Success Criteria

- [ ] All 25 components have code variants added to codeVariants.ts
- [ ] All story parameters updated to reference correct variants
- [ ] Build succeeds: `cd storybook && pnpm build`
- [ ] Dev server works: `pnpm dev`
- [ ] All code tabs display correctly in Storybook
- [ ] No TypeScript errors
- [ ] Documentation cleaned up

---

## Quick Commands

```bash
# Navigate to storybook
cd /Users/karo/Library\ Mobile\ Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook

# Test build
pnpm build

# Run dev server
pnpm dev

# Check file size
ls -lh .storybook/blocks/codeVariants.ts

# Git status
git status --short

# Commit progress
git add .
git commit -m "feat: add code variants for [ComponentName]"
git push
```
