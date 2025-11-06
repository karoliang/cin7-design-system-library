# COMPREHENSIVE DESIGN TOKEN AUDIT - PHASE 1: DISCOVERY

**Date:** 2025-11-06
**Status:** Complete
**Total Files Analyzed:** 85 story files
**Total Violations Found:** 3,903 hardcoded values

---

## EXECUTIVE SUMMARY

A comprehensive audit has identified **3,903 hardcoded values** across 85 Storybook story files that should be using CSS variables from the design token system. The violations span multiple categories including spacing, colors, typography, border radius, and more.

### Key Findings:
- **1,475** spacing violations (margin, padding, gap)
- **821** directional spacing violations (marginTop, paddingLeft, etc.)
- **691** hex color violations
- **538** border radius violations
- **268** font size violations
- **59** font weight violations
- **20** opacity violations
- **11** line height violations
- **11** RGB color violations
- **9** box shadow violations

---

## VIOLATIONS BY CATEGORY

| Category | Count | Percentage |
|----------|-------|------------|
| Spacing (general) | 1,475 | 37.8% |
| Spacing (directional) | 821 | 21.0% |
| Colors (hex) | 691 | 17.7% |
| Border Radius | 538 | 13.8% |
| Font Size | 268 | 6.9% |
| Font Weight | 59 | 1.5% |
| Opacity | 20 | 0.5% |
| Line Height | 11 | 0.3% |
| Colors (RGB) | 11 | 0.3% |
| Box Shadow | 9 | 0.2% |
| **TOTAL** | **3,903** | **100%** |

---

## TOP 30 FILES WITH MOST VIOLATIONS

Priority files for refactoring (highest impact first):

| Rank | Count | File |
|------|-------|------|
| 1 | 152 | `components/layout/VerticalStack.stories.tsx` |
| 2 | 121 | `components/utilities/Pagination.stories.tsx` |
| 3 | 120 | `foundation/components/CoreUtilities.stories.tsx` |
| 4 | 114 | `components/layout/Layout.stories.tsx` |
| 5 | 110 | `components/utilities/TextContainer.stories.tsx` |
| 6 | 104 | `components/utilities/Collapsible.stories.tsx` |
| 7 | 98 | `components/utilities/Scrollable.stories.tsx` |
| 8 | 94 | `components/forms/Autocomplete.stories.tsx` |
| 9 | 94 | `components/utilities/Link.stories.tsx` |
| 10 | 93 | `components/layout/Grid.stories.tsx` |
| 11 | 91 | `components/layout/Page.stories.tsx` |
| 12 | 91 | `components/navigation/Breadcrumbs.stories.tsx` |
| 13 | 87 | `components/layout/Bleed.stories.tsx` |
| 14 | 87 | `components/utilities/Text.stories.tsx` |
| 15 | 79 | `components/forms/OptionList.stories.tsx` |
| 16 | 79 | `components/media/VideoThumbnail.stories.tsx` |
| 17 | 76 | `components/feedback/Loading.stories.tsx` |
| 18 | 73 | `foundation/components/DesignTokens.stories.tsx` |
| 19 | 73 | `components/forms/ColorPicker.stories.tsx` |
| 20 | 72 | `components/utilities/KeypressListener.stories.tsx` |
| 21 | 72 | `components/utilities/EcommerceComponents.stories.tsx` |
| 22 | 72 | `components/media/Thumbnail.stories.tsx` |
| 23 | 70 | `components/utilities/Divider.stories.tsx` |
| 24 | 69 | `components/layout/AlphaStack.stories.tsx` |
| 25 | 69 | `components/navigation/Navigation.stories.tsx` |
| 26 | 69 | `guides/GettingStarted.stories.tsx` |
| 27 | 68 | `components/navigation/Tabs.stories.tsx` |
| 28 | 67 | `components/data-display/List.stories.tsx` |
| 29 | 65 | `components/actions/Button.stories.tsx` |
| 30 | 64 | `components/data-display/ResourceItem.stories.tsx` |

---

## DETAILED BREAKDOWN: TOP 10 FILES

### 1. components/layout/VerticalStack.stories.tsx (152 violations)
- **Colors (hex):** 52
- **Spacing:** 50
- **Border Radius:** 43
- **Spacing (directional):** 4
- **Line Height:** 3

### 2. components/utilities/Pagination.stories.tsx (121 violations)
- **Spacing:** 41
- **Colors (hex):** 31
- **Border Radius:** 25
- **Spacing (directional):** 20
- **Font Size:** 4

### 3. foundation/components/CoreUtilities.stories.tsx (120 violations)
- **Spacing:** 38
- **Spacing (directional):** 26
- **Border Radius:** 26
- **Colors (hex):** 16
- **Font Size:** 14

### 4. components/layout/Layout.stories.tsx (114 violations)
- **Spacing:** 46
- **Spacing (directional):** 42
- **Colors (hex):** 13
- **Border Radius:** 12
- **Font Size:** 1

### 5. components/utilities/TextContainer.stories.tsx (110 violations)
- **Spacing (directional):** 52
- **Colors (hex):** 37
- **Spacing:** 16
- **Border Radius:** 5

### 6. components/utilities/Collapsible.stories.tsx (104 violations)
- **Spacing (directional):** 34
- **Spacing:** 22
- **Border Radius:** 20
- **Font Size:** 14
- **Colors (hex):** 7
- **Font Weight:** 7

### 7. components/utilities/Scrollable.stories.tsx (98 violations)
- **Spacing:** 39
- **Spacing (directional):** 26
- **Border Radius:** 16
- **Colors (hex):** 14
- **Font Size:** 2
- **Line Height:** 1

### 8. components/forms/Autocomplete.stories.tsx (94 violations)
- **Spacing:** 25
- **Colors (hex):** 19
- **Font Size:** 17
- **Border Radius:** 14
- **Spacing (directional):** 11
- **Font Weight:** 8

### 9. components/utilities/Link.stories.tsx (94 violations)
- **Spacing (directional):** 30
- **Colors (hex):** 26
- **Spacing:** 23
- **Border Radius:** 11
- **Box Shadow:** 4

### 10. components/layout/Grid.stories.tsx (93 violations)
- **Spacing (directional):** 36
- **Spacing:** 17
- **Colors (hex):** 14
- **Border Radius:** 14
- **Font Size:** 12

---

## MISSING CSS VARIABLES

### Spacing Values Without CSS Variables (10 values)
- 1px
- 2px
- 5px
- 6px
- 10px
- 14px
- 15px
- 30px
- 80px
- 100px

**Recommendation:** Most of these are edge cases. Consider adding:
- `--spacing-half: 2px` (for 1-2px values)
- `--spacing-1-5: 6px` (for 5-6px values)
- `--spacing-2-5: 10px` (currently missing between 8px and 12px)
- `--spacing-20: 80px`
- `--spacing-25: 100px`

### Border Radius Values Without CSS Variables (2 values)
- 3px
- 10px

**Recommendation:** These are rare. Can likely be mapped to existing values (4px and 8px).

### Colors Without CSS Variables (105 values)
This is the largest gap. Many semantic colors are missing:
- **Brand colors:** #007ace (primary blue variant)
- **Success colors:** #108043, #16a34a, #059669, #10b981 variants
- **Warning colors:** #ed6c02, #e4930d, #ffc453 variants
- **Error colors:** #dc2626, #d72c0d, #de3618 variants
- **Gray scale:** #111827, #1f2937, #374151, #4b5563, #6b7280, #9ca3af, #d1d5db, #e5e7eb, #f3f4f6, #f9fafb
- **Social media:** #1877f2 (Facebook), #1da1f2 (Twitter), #0077b5 (LinkedIn)
- **File type colors:** #d72c0d (PDF), #2a6f3a (Excel), #e4930d (PowerPoint)

**Recommendation:** Add semantic color tokens in preview.tsx:
```css
/* Extended grays */
--color-gray-800: #1f2937
--color-gray-700: #374151
--color-gray-600: #4b5563
--color-gray-400: #9ca3af
--color-gray-50: #f9fafb

/* Success variants */
--color-success-700: #047857
--color-success-600: #059669
--color-success-400: #34d399

/* Warning variants */
--color-warning-700: #b45309
--color-warning-600: #d97706
--color-warning-400: #fbbf24

/* Critical variants */
--color-critical-700: #b91c1c
--color-critical-600: #dc2626
--color-critical-400: #f87171

/* Brand */
--color-brand-primary: #007ace
--color-brand-secondary: #5c6ac4

/* Social */
--color-social-facebook: #1877f2
--color-social-twitter: #1da1f2
--color-social-linkedin: #0077b5
```

---

## AVAILABLE CSS VARIABLES

Currently available in `storybook/.storybook/preview.tsx`:

### Spacing
```css
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-5: 20px
--spacing-6: 24px
--spacing-8: 32px
--spacing-10: 40px
--spacing-12: 48px
--spacing-16: 64px
```

### Colors
```css
--color-primary-500: #006fbb
--color-gray-50: #f9fafb
--color-gray-100: #f3f4f6
--color-gray-200: #e5e7eb
--color-gray-300: #d1d5db
--color-gray-500: #6b7280
--color-gray-900: #111827
--color-success-500: #10b981
--color-warning-500: #f59e0b
--color-critical-500: #ef4444
```

### Border Radius
```css
--border-radius-sm: 2px
--border-radius-base: 4px
--border-radius-md: 6px
--border-radius-lg: 8px
--border-radius-xl: 12px
--border-radius-2xl: 16px
```

### Typography (already comprehensive)
```css
--font-size-xs through --font-size-6xl
--font-weight-light through --font-weight-extrabold
--line-height-tight through --line-height-loose
```

---

## RECOMMENDED REFACTORING ORDER

### Phase 2: High-Impact Files (Top 10)
**Estimated Impact:** ~1,156 violations (29.6% of total)

1. VerticalStack.stories.tsx (152)
2. Pagination.stories.tsx (121)
3. CoreUtilities.stories.tsx (120)
4. Layout.stories.tsx (114)
5. TextContainer.stories.tsx (110)
6. Collapsible.stories.tsx (104)
7. Scrollable.stories.tsx (98)
8. Autocomplete.stories.tsx (94)
9. Link.stories.tsx (94)
10. Grid.stories.tsx (93)

### Phase 3: Medium-Impact Files (Rank 11-30)
**Estimated Impact:** ~1,503 violations (38.5% of total)

Focus on files with 60+ violations

### Phase 4: Low-Impact Files (Rank 31+)
**Estimated Impact:** ~1,244 violations (31.9% of total)

Clean up remaining files with <60 violations

---

## RECOMMENDED ACTIONS

### Immediate Actions (Before Phase 2)
1. **Extend CSS Variables** in `preview.tsx`:
   - Add missing spacing values (--spacing-half, --spacing-2-5)
   - Add extended gray scale (--color-gray-400 through --color-gray-800)
   - Add success/warning/critical color variants
   - Add brand color variants
   - Add semantic colors for file types and social media

2. **Update TypeScript Types** in token utilities to include new variables

3. **Document New Tokens** in DesignTokens.stories.tsx

### Refactoring Strategy
1. **Start with layout components** (VerticalStack, Layout, Grid) - highest violation counts
2. **Move to utility components** (Pagination, TextContainer, Link)
3. **Address form components** (Autocomplete, ColorPicker, OptionList)
4. **Clean up media components** (VideoThumbnail, Thumbnail, MediaCard)
5. **Finish with navigation and feedback components**

### Quality Assurance
- Run visual regression tests after each batch of 5 files
- Verify Storybook builds successfully
- Check for broken styles in component previews
- Ensure design consistency across components

---

## NEXT STEPS

1. **Review and approve** this audit report
2. **Prioritize** which missing CSS variables to add
3. **Update preview.tsx** with new design tokens
4. **Begin Phase 2** refactoring starting with top 10 files
5. **Track progress** using a dedicated tracking document

---

## NOTES

- 10 files have already been refactored with typography tokens (not reflected in counts above)
- Some hardcoded values are intentional (e.g., component-specific colors in data visualizations)
- Chart color palettes may need special handling (PieChart.stories.tsx uses specific brand colors)
- Social media colors and file type colors are domain-specific and may warrant dedicated token sections

---

**Generated by:** Python analysis scripts
**Analysis scripts:**
- `analyze_hardcoded_values.py`
- `analyze_missing_tokens.py`
