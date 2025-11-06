# DESIGN TOKEN REFACTORING PLAN - PHASE 2

**Date:** 2025-11-06
**Based on:** Phase 1 Discovery Audit
**Target:** 3,903 violations across 85 files

---

## RECOMMENDED APPROACH: SYSTEMATIC BATCH REFACTORING

### Step 1: Extend CSS Variables (Week 1)

**File:** `storybook/.storybook/preview.tsx`

Add the following CSS variables to close the gaps identified in Phase 1:

```css
/* Extended Spacing Tokens */
--spacing-half: 2px;      /* For 1-2px values */
--spacing-1-5: 6px;       /* For 5-6px values */
--spacing-2-5: 10px;      /* Between --spacing-2 and --spacing-3 */
--spacing-20: 80px;       /* For large spacing */
--spacing-25: 100px;      /* For extra large spacing */

/* Extended Border Radius */
--border-radius-xs: 3px;  /* Between sm and base */
--border-radius-3xl: 10px; /* Between xl and 2xl */

/* Extended Gray Scale */
--color-gray-800: #1f2937;
--color-gray-700: #374151;
--color-gray-600: #4b5563;
--color-gray-400: #9ca3af;

/* Success Variants */
--color-success-700: #047857;
--color-success-600: #059669;
--color-success-500: #10b981;
--color-success-400: #34d399;
--color-success-50: #f0fdf4;

/* Warning Variants */
--color-warning-700: #b45309;
--color-warning-600: #d97706;
--color-warning-500: #f59e0b;
--color-warning-400: #fbbf24;
--color-warning-50: #fff3e0;

/* Critical Variants */
--color-critical-700: #b91c1c;
--color-critical-600: #dc2626;
--color-critical-500: #ef4444;
--color-critical-400: #f87171;
--color-critical-50: #fef2f2;

/* Brand Colors */
--color-brand-primary: #007ace;
--color-brand-secondary: #5c6ac4;
--color-brand-tertiary: #47c1bf;
--color-brand-accent: #955ba5;

/* Semantic Colors */
--color-info-500: #3b82f6;
--color-info-100: #dbeafe;
--color-info-50: #eff6ff;

/* Social Media Colors */
--color-social-facebook: #1877f2;
--color-social-twitter: #1da1f2;
--color-social-linkedin: #0077b5;

/* File Type Colors */
--color-file-pdf: #d72c0d;
--color-file-excel: #2a6f3a;
--color-file-powerpoint: #e4930d;
--color-file-image: #6f42c1;

/* Neutral Colors */
--color-white: #ffffff;
--color-black: #000000;

/* Opacity Tokens (for rgba usage) */
--opacity-full: 1;
--opacity-high: 0.9;
--opacity-medium: 0.8;
--opacity-low: 0.6;
--opacity-very-low: 0.3;
--opacity-disabled: 0.5;

/* Box Shadow Tokens */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
--shadow-base: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-md: 0 10px 25px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
```

**Estimated Time:** 2-3 hours

---

### Step 2: Update Documentation (Week 1)

**File:** `storybook/stories/foundation/components/DesignTokens.stories.tsx`

Add new stories showcasing:
1. Extended spacing tokens
2. Extended color palettes
3. Opacity tokens
4. Box shadow tokens
5. Usage examples for semantic colors

**Estimated Time:** 2-3 hours

---

### Step 3: Batch Refactoring (Weeks 2-6)

#### Batch 1: Layout Components (Week 2)
**Target:** 578 violations (14.8%)

Files:
1. ✅ VerticalStack.stories.tsx (152)
2. ✅ Layout.stories.tsx (114)
3. ✅ Grid.stories.tsx (93)
4. ✅ Page.stories.tsx (91)
5. ✅ Bleed.stories.tsx (87)
6. ✅ AlphaStack.stories.tsx (69)
7. ✅ Box.stories.tsx (estimated 40)
8. ✅ InlineStack.stories.tsx (estimated 32)

**Refactoring Pattern:**
```typescript
// BEFORE
<div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>

// AFTER
<div style={{
  padding: 'var(--spacing-3)',
  backgroundColor: 'var(--color-gray-100)',
  borderRadius: 'var(--border-radius-base)'
}}>
```

**QA Checklist:**
- [ ] Visual regression test passed
- [ ] Storybook builds successfully
- [ ] No broken component previews
- [ ] Design consistency maintained

**Estimated Time:** 8-10 hours

---

#### Batch 2: Utility Components (Week 3)
**Target:** 746 violations (19.1%)

Files:
1. ✅ Pagination.stories.tsx (121)
2. ✅ TextContainer.stories.tsx (110)
3. ✅ Collapsible.stories.tsx (104)
4. ✅ Scrollable.stories.tsx (98)
5. ✅ Link.stories.tsx (94)
6. ✅ Text.stories.tsx (87)
7. ✅ KeypressListener.stories.tsx (72)
8. ✅ EcommerceComponents.stories.tsx (72)
9. ✅ Divider.stories.tsx (70)
10. ✅ Badge.stories.tsx (estimated 40)
11. ✅ Tag.stories.tsx (estimated 38)

**Focus Areas:**
- Directional spacing (marginTop, paddingLeft, etc.)
- Text colors and backgrounds
- Border styling

**Estimated Time:** 10-12 hours

---

#### Batch 3: Form Components (Week 4)
**Target:** 340 violations (8.7%)

Files:
1. ✅ Autocomplete.stories.tsx (94)
2. ✅ ColorPicker.stories.tsx (73)
3. ✅ OptionList.stories.tsx (79)
4. ✅ Combobox.stories.tsx (estimated 50)
5. ✅ TextField.stories.tsx (estimated 30)
6. ✅ DatePicker.stories.tsx (estimated 20)

**Focus Areas:**
- Input field spacing
- Form validation colors
- Focus states

**Estimated Time:** 6-8 hours

---

#### Batch 4: Media Components (Week 5)
**Target:** 223 violations (5.7%)

Files:
1. ✅ VideoThumbnail.stories.tsx (79)
2. ✅ Thumbnail.stories.tsx (72)
3. ✅ MediaCard.stories.tsx (estimated 50)
4. ✅ Image.stories.tsx (estimated 22)

**Focus Areas:**
- Overlay colors (rgba)
- Thumbnail borders and spacing
- File type indicators

**Estimated Time:** 4-6 hours

---

#### Batch 5: Navigation & Feedback (Week 6)
**Target:** 460 violations (11.8%)

Navigation:
1. ✅ Breadcrumbs.stories.tsx (91)
2. ✅ Navigation.stories.tsx (69)
3. ✅ Tabs.stories.tsx (68)
4. ✅ TopBar.stories.tsx (estimated 60)
5. ✅ FullscreenBar.stories.tsx (estimated 30)

Feedback:
6. ✅ Loading.stories.tsx (76)
7. ✅ EmptyState.stories.tsx (estimated 40)
8. ✅ CalloutCard.stories.tsx (estimated 30)
9. ✅ ProgressBar.stories.tsx (estimated 28)
10. ✅ Tooltip.stories.tsx (estimated 20)

**Estimated Time:** 10-12 hours

---

#### Batch 6: Remaining Files (Week 6-7)
**Target:** ~1,556 violations (39.9%)

All other files with <60 violations each

**Estimated Time:** 12-15 hours

---

## REFACTORING WORKFLOW

### Per File Process (20-40 minutes each)

1. **Read** the file
2. **Identify** all hardcoded values
3. **Map** to appropriate CSS variables
4. **Replace** using Edit tool
5. **Test** in Storybook dev mode
6. **Visual check** all stories in the file
7. **Commit** with descriptive message

### Commit Message Template
```
refactor(storybook): replace hardcoded values with design tokens in [Component]

- Replace spacing values with --spacing-* variables
- Replace colors with --color-* variables
- Replace border-radius with --border-radius-* variables
- Replace typography with --font-* variables

Impact: [X] violations fixed
Part of: Design Token Migration Phase 2
```

---

## AUTOMATION OPPORTUNITIES

### Consider Building Script (Optional)
A Python/Node script could automate ~70% of simple replacements:

```python
REPLACEMENTS = {
    # Spacing
    "'4px'": "var(--spacing-1)",
    "'8px'": "var(--spacing-2)",
    "'12px'": "var(--spacing-3)",
    "'16px'": "var(--spacing-4)",
    "'20px'": "var(--spacing-5)",
    "'24px'": "var(--spacing-6)",

    # Colors
    "'#f3f4f6'": "var(--color-gray-100)",
    "'#6b7280'": "var(--color-gray-500)",
    "'#007ace'": "var(--color-brand-primary)",

    # Border Radius
    "'4px'": "var(--border-radius-base)",
    "'8px'": "var(--border-radius-lg)",
}
```

**Pros:**
- Fast batch processing
- Consistent replacements
- Reduced human error

**Cons:**
- May miss context-specific colors
- Could break intentional hardcoded values
- Still requires manual review

**Recommendation:** Start manual, automate if patterns emerge

---

## QUALITY ASSURANCE CHECKLIST

### Per Batch
- [ ] All files build without errors
- [ ] Visual regression tests pass
- [ ] No console errors in Storybook
- [ ] Component functionality unchanged
- [ ] Design consistency maintained
- [ ] Git commits are descriptive

### Final Review
- [ ] All 3,903 violations addressed
- [ ] Documentation updated
- [ ] Design token guide complete
- [ ] Team training session conducted
- [ ] Migration guide written

---

## ROLLBACK PLAN

If issues arise during refactoring:

1. **Per-file rollback:** `git revert <commit-hash>`
2. **Batch rollback:** `git revert <batch-start>..<batch-end>`
3. **Full rollback:** `git revert <phase2-start>..<phase2-end>`

---

## SUCCESS METRICS

- **100%** of hardcoded values replaced with CSS variables
- **0** visual regressions introduced
- **<5%** performance impact
- **90%+** team satisfaction with new token system

---

## NEXT STEPS

1. **Review** this plan with team
2. **Approve** new CSS variables to add
3. **Schedule** batch refactoring sprints
4. **Assign** team members to batches
5. **Begin** Week 1 (extend CSS variables)

---

## ESTIMATED TOTAL EFFORT

- Week 1 (Setup): 4-6 hours
- Week 2-7 (Refactoring): 50-63 hours
- **Total:** 54-69 hours (~7-9 developer days)

With 2-3 developers working in parallel: **3-4 weeks**

---

**Document Status:** Ready for Review
**Next Review Date:** 2025-11-13
