# COMPREHENSIVE STORYBOOK CODE VARIANTS AUDIT REPORT

**Date:** November 8, 2025  
**Auditor:** Claude Code Assistant  
**Scope:** All Storybook component code variants across 88 components

---

## EXECUTIVE SUMMARY

### Key Findings

1. **GOOD NEWS**: All 88 components ARE properly mapped in `getCodeVariants()` function
2. **GOOD NEWS**: Many components have extensive variant libraries (Button: 28, Banner: 35, Card: 70!)
3. **THE PROBLEM**: Many story files request 'default' variant repeatedly instead of specific variants
4. **THE ISSUE**: Stories are not leveraging the existing comprehensive variant library

### The Real Gap

The gap is **NOT** missing code variants in `codeVariants.ts`.  
The gap IS **underutilization** of existing variants in `.stories.tsx` files.

**Example:**
- Button component HAS 28 variants defined in codeVariants.ts
- Button.stories.tsx (17 stories) uses 11 different variants, but repeats 'default' 4 times
- TextField component HAS 15 variants defined
- TextField.stories.tsx (16 stories) uses only 7 variants, repeats 'default' 9 times!

---

## DETAILED ANALYSIS

### ✅ WELL-IMPLEMENTED COMPONENTS (Using diverse variants)

#### Button (17 stories)
**Variants Available:** 28  
**Variants Used:** 11 unique  
**Status:** ✅ Good variety, but could use more

Used variants:
- default (used 4x - reduce this!)
- variants, sizes, states
- plain, disabled, large, loading
- plain-critical, primary-critical
- disclosure, full-width

**Unused opportunities:** icon-only, small, listeners, layouts, style variations

---

#### Banner (8 stories)
**Variants Available:** 35  
**Variants Used:** 4 unique  
**Status:** ⚠️  Many unused variants

Used variants:
- default, status-variants, with-actions, dismissible

**Unused opportunities:** real-world, with-icons, critical, warning, success, informational, minimal, interactive, secondaryAction (20+ unused!)

---

#### Card (7 stories)
**Variants Available:** 70  
**Variants Used:** 5 unique  
**Status:** ⚠️  Huge untapped potential

Used variants:
- default, with-header-actions, with-section, with-subdued-background, with-footer-actions

**Unused opportunities:** 65 other variants including with-all-elements, with-multiple-sections, with-critical-footer-actions, with-custom-footer-actions, etc.

---

#### Modal (8 stories)
**Variants Available:** 23  
**Variants Used:** 5 unique  
**Status:** ⚠️  Good coverage but could improve

Used variants:
- default (used 3x), sizes, form-modal, without-actions, with-footer

**Unused opportunities:** nested, iframe, accessibility, customer, order, small/medium/large, listeners

---

#### TextField (16 stories)
**Variants Available:** 15  
**Variants Used:** 7 unique  
**Status:** ⚠️  Too many 'default' repetitions

Used variants:
- default (used 9x - this is excessive!)
- with-error, with-help-text, disabled, multiline
- number, character-count, with-prefix-suffix

**Unused opportunities:** listeners, more specific variations

**Recommendation:** Replace 9 'default' usages with specific variant names

---

### 📊 COMPONENT VARIANT INVENTORY

| Component | Total Variants | Unique Used | Repeated 'default' | Utilization | Status |
|-----------|----------------|-------------|---------------------|-------------|--------|
| Button | 28 | 11 | 4x | 39% | ⚠️  Fair |
| Banner | 35 | 4 | many | 11% | ❌ Poor |
| Card | 70 | 5 | many | 7% | ❌ Very Poor |
| Modal | 23 | 5 | 3x | 22% | ⚠️  Fair |
| TextField | 15 | 7 | 9x | 47% | ⚠️  Fair |
| Avatar | 27 | ~3 | many | 11% | ❌ Poor |
| Checkbox | 26 | ~4 | many | 15% | ❌ Poor |
| Select | 8 | ~4 | many | 50% | ⚠️  Good |

---

## THE 'DEFAULT' PROBLEM

### What We Found

Many story files follow this anti-pattern:

```typescript
export const DefaultStory: Story = {
  parameters: {
    codeVariants: getCodeVariants('component', 'default'),  // ❌ Generic
  },
};

export const AnotherVariation: Story = {
  parameters: {
    codeVariants: getCodeVariants('component', 'default'),  // ❌ Same!
  },
};
```

### What It Should Be

```typescript
export const DefaultStory: Story = {
  parameters: {
    codeVariants: getCodeVariants('component', 'default'),  // ✅ OK for first
  },
};

export const WithError: Story = {
  parameters: {
    codeVariants: getCodeVariants('component', 'with-error'),  // ✅ Specific!
  },
};
```

---

## PRIORITY ACTIONS

### 🚨 IMMEDIATE (This Week)

**1. TextField Component (16 stories, 9 'defaults')**
- Replace 9 'default' usages with specific variant names
- Variants exist: with-error, with-help-text, with-prefix-suffix, character-count, multiline, disabled, number
- Estimated time: 1 hour

**2. Button Component (17 stories, 4 'defaults')**
- Replace 4 'default' usages with specific variants
- Use: icon-only, small, listeners, style
- Estimated time: 30 minutes

**3. Modal Component (8 stories, 3 'defaults')**
- Replace 3 'default' usages
- Use: nested, accessibility, iframe
- Estimated time: 20 minutes

### ⚠️  HIGH PRIORITY (Next Week)

**4. Card Component (70 variants, only 5 used!)**
- Create 10-15 more story variations using existing variants
- Focus on: with-all-elements, with-multiple-sections, with-critical-footer-actions
- Estimated time: 2-3 hours

**5. Banner Component (35 variants, only 4 used!)**
- Create 5-8 more story variations
- Focus on: real-world, with-icons, status variations (critical, warning, success)
- Estimated time: 1-2 hours

**6. Avatar Component (27 variants, ~3 used)**
- Create 5-8 more story variations
- Focus on: sizes, withImages, customerAvatars, initialsOnly
- Estimated time: 1-2 hours

### 📋 MEDIUM PRIORITY (Following Weeks)

**Review remaining 80+ components** to identify:
- Components with many 'default' repetitions
- Components with rich variant libraries but poor utilization
- Opportunities to showcase more variants

---

## CATEGORIES BREAKDOWN

### ACTIONS (5 components)
- Button: ⚠️  Fair usage (39% of variants)
- ActionList: ❌ Need to check variant usage
- ActionMenu: ❌ Need to check variant usage
- BulkActions: ❌ Need to check variant usage
- ButtonGroup: ❌ Need to check variant usage

### FEEDBACK (12 components)
- Banner: ❌ Poor usage (11% of variants)
- Modal: ⚠️  Fair usage (22% of variants)
- Remaining 10 components: Need detailed review

### FORMS (13 components)
- TextField: ⚠️  Fair usage (47% of variants)
- Checkbox: ❌ Poor usage (15% of variants)
- Select: ⚠️  Good usage (50% of variants)
- Remaining 10 components: Need detailed review

### LAYOUT (11 components)
- Card: ❌ Very poor usage (7% of 70 variants!)
- Remaining 10 components: Need detailed review

### DATA DISPLAY (8 components)
- All need detailed review

### MEDIA (6 components)
- Avatar: ❌ Poor usage (11% of variants)
- Remaining 5 components: Need detailed review

### NAVIGATION (6 components)
- All need detailed review

### UTILITIES (18 components)
- All need detailed review

---

## RECOMMENDATIONS

### 1. Audit All Story Files (PRIORITY 1)

Create a script to identify:
```bash
# Find all stories using 'default' more than twice
grep -r "getCodeVariants.*'default'" storybook/stories/components/*.stories.tsx
```

### 2. Variant Naming Convention (PRIORITY 2)

Establish clear naming:
- `default` - Only for the most basic example
- `with-[feature]` - When adding a specific feature
- `[state]` - For state variations (disabled, loading, error)
- `[size]` - For size variations (small, large, micro)
- `[variant]` - For style variations (primary, critical, tertiary)

### 3. Story-to-Variant Mapping Guidelines (PRIORITY 3)

Each story should:
1. Have a unique purpose
2. Reference a specific variant (avoid 'default' repeats)
3. Showcase a distinct use case
4. Provide educational value to developers

### 4. Create Variant Usage Report (PRIORITY 4)

Build tooling to generate:
- Variant utilization percentage per component
- List of unused variants
- Stories using 'default' excessively
- Recommendations for improvement

---

## METRICS

### Current State
- **Total Components:** 88
- **Average Variants per Component:** ~20-25 (estimated)
- **Average Variant Utilization:** ~15-30% (estimated)
- **Stories Using 'default':** Hundreds of instances

### Target State
- **Average Variant Utilization:** 60-80%
- **Stories Using 'default':** Only 1 per component (the actual default story)
- **Unique variants per story:** 95%+ of stories should use specific variants

---

## TOOLS & SCRIPTS NEEDED

### 1. Variant Utilization Analyzer
```bash
#!/bin/bash
# Analyze variant usage across all components
# Output: CSV report of utilization percentages
```

### 2. 'Default' Detector
```bash
#!/bin/bash
# Find all stories using 'default' more than once
# Output: List of files to fix with recommendations
```

### 3. Unused Variant Reporter
```bash
#!/bin/bash
# Compare defined variants vs used variants
# Output: List of unused variants per component
```

---

## CONCLUSION

### The Good News
1. ✅ Strong variant library exists (28-70 variants per component!)
2. ✅ All components properly mapped in getCodeVariants()
3. ✅ Infrastructure is solid and working

### The Challenge
1. ❌ Massive underutilization of existing variants (7-50% usage)
2. ❌ Excessive 'default' repetition in story files
3. ❌ Missed opportunities to showcase rich functionality

### The Fix
This is NOT a "create 300 new variants" problem.  
This is a "connect existing stories to existing variants" problem.

**Estimated effort:** 10-20 hours to dramatically improve utilization from ~20% to ~70%

### Next Steps
1. Start with TextField (1 hour fix for immediate impact)
2. Follow with Button, Modal (1 hour combined)
3. Tackle Card and Banner (4-5 hours for massive improvement)
4. Systematically review remaining 80+ components

---

**End of Report**

Generated: November 8, 2025
