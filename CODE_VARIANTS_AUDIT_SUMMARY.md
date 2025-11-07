# Code Variants Audit - Executive Summary

**Date:** November 7, 2025
**Analyzed by:** Automated audit script
**Issue:** Storybook showing "No code examples found for component: buttongroup" errors

---

## Key Findings

### 🔴 Critical Issues (2 components)

1. **ButtonGroup** - 13 story variations affected
2. **AppProvider** - 7 story variations affected

### ✅ Status: ActionList

ActionList is **WORKING CORRECTLY** despite initial concerns. It's registered as `actionlist: actionList` in the `getCodeVariants()` function (line 22730).

---

## Issue #1: ButtonGroup (HIGH PRIORITY)

**File:** `/storybook/stories/components/actions/ButtonGroup.stories.tsx`
**Problem:** All 13 stories call `getCodeVariants('buttongroup', 'default')` but the component is not registered.

**Affected Stories:**
- Default
- SegmentedControl
- VariantGroup
- IconButtons
- FullWidthGroup
- ToggleGroup
- NavigationGroup
- SizeVariations
- ActionGroups
- StateVariations
- ConnectedButtons
- ResponsiveGroup
- (13 total)

**Root Cause:**
- No `buttonGroupExamples` export exists in `codeVariants.ts`
- Not registered in the `getCodeVariants()` function's `examples` map

**Fix Required:**
```typescript
// 1. Add export in codeVariants.ts (before line 22720)
export const buttonGroupExamples: Record<string, CodeVariant> = {
  default: {
    react: `...`,
    vanilla: `...`,
    extjs: `...`,
    typescript: `...`
  }
};

// 2. Register in getCodeVariants() function (around line 22726)
const examples: Record<string, Record<string, CodeVariant>> = {
  button: buttonExamples,
  buttongroup: buttonGroupExamples,  // ← Add this line
  card: cardExamples,
  // ...
};
```

---

## Issue #2: AppProvider (MEDIUM PRIORITY)

**File:** `/storybook/stories/components/utilities/AppProvider.stories.tsx`
**Problem:** 7 stories call `getCodeVariants('appprovider', 'default')` but the component is not registered.

**Affected Stories:**
- 7 story variations all requesting the 'default' example

**Root Cause:**
- No `appProviderExamples` export exists in `codeVariants.ts`
- Not registered in the `getCodeVariants()` function's `examples` map

**Fix Required:**
```typescript
// 1. Add export in codeVariants.ts (before line 22720)
export const appProviderExamples: Record<string, CodeVariant> = {
  default: {
    react: `...`,
    vanilla: `...`,
    extjs: `...`,
    typescript: `...`
  }
};

// 2. Register in getCodeVariants() function (around line 22803)
const examples: Record<string, Record<string, CodeVariant>> = {
  // ...
  appprovider: appProviderExamples,  // ← Add this line
  // ...
};
```

---

## Overall Statistics

| Metric | Count | Status |
|--------|-------|--------|
| Total components with stories | 83 | 100% |
| Properly registered components | 80 | 96.4% ✅ |
| Missing registrations | 2 | 2.4% 🔴 |
| Total broken story variations | 20 | - |

**Components Breakdown:**
- ✅ Working: 80 components (ActionMenu, AlphaStack, Autocomplete, Avatar, Badge, Banner, BarChart, Bleed, BlockStack, Box, Breadcrumbs, BulkActions, Button, CalloutCard, Card, Checkbox, CheckboxGroup, ChoiceList, Collapsible, ColorPicker, Combobox, ContextualSaveBar, CoreUtilities, DataTable, DatePicker, DescriptionList, Divider, DropZone, EcommerceComponents, EmptyState, ExceptionList, Filters, FooterHelp, FormLayout, FormPanel, Frame, FullscreenBar, Grid, Image, IndexFilters, IndexTable, InlineStack, KeyboardKey, KeypressListener, Layout, LineChart, Link, List, Loading, MediaCard, Modal, Navigation, OptionList, Page, PageActions, Pagination, PieChart, Popover, ProgressBar, RadioButton, RangeSlider, Repository, ResourceItem, ResourceList, Scrollable, Select, Sheet, Spinner, Tabs, Tag, Text, TextContainer, TextField, Thumbnail, Toast, Tooltip, TopBar, UseCase, VerticalStack, VideoThumbnail)
- 🔴 Missing: 2 components (ButtonGroup, AppProvider)
- ⚠️ Inconsistent but working: 1 component (ActionList - uses `actionList` export name instead of `actionListExamples`)

---

## Implementation Details

### File Locations

- **Code Variants Definition:** `/storybook/.storybook/blocks/codeVariants.ts` (22,821 lines)
- **getCodeVariants() Function:** Lines 22720-22820
- **ButtonGroup Story:** `/storybook/stories/components/actions/ButtonGroup.stories.tsx`
- **AppProvider Story:** `/storybook/stories/components/utilities/AppProvider.stories.tsx`

### Current Registration Pattern

All working components follow this pattern in `getCodeVariants()`:

```typescript
const examples: Record<string, Record<string, CodeVariant>> = {
  button: buttonExamples,              // ✅ Exported as buttonExamples
  card: cardExamples,                  // ✅ Exported as cardExamples
  modal: modalExamples,                // ✅ Exported as modalExamples
  actionlist: actionList,              // ⚠️ Exported as actionList (inconsistent but works)
  // ... 80 total registrations

  // Missing:
  // buttongroup: buttonGroupExamples,  // ❌ Not registered
  // appprovider: appProviderExamples,  // ❌ Not registered
};
```

---

## Recommended Actions

### Immediate Fix (Required)

1. **Create ButtonGroup code variants** (30-60 minutes)
   - Define all 4 code examples (React, Vanilla JS, ExtJS, TypeScript)
   - Register in `getCodeVariants()` function
   - Test all 13 story variations

2. **Create AppProvider code variants** (30-60 minutes)
   - Define all 4 code examples (React, Vanilla JS, ExtJS, TypeScript)
   - Register in `getCodeVariants()` function
   - Test all 7 story variations

### Long-term Improvements (Optional)

1. **Add type safety** - Create a union type of valid component keys
2. **Add automated tests** - Validate all story keys have matching registrations
3. **Standardize naming** - Consider renaming `actionList` to `actionListExamples` for consistency
4. **Add documentation** - Create a README in `.storybook/blocks/` explaining the registration process

---

## Testing Checklist

After implementing fixes:

- [ ] ButtonGroup Default story shows code variants
- [ ] All 13 ButtonGroup story variations display code tabs
- [ ] AppProvider stories show code variants
- [ ] No console warnings about missing code examples
- [ ] Code tabs switch between React/Vanilla/ExtJS/TypeScript correctly
- [ ] Code syntax highlighting works properly
- [ ] Copy-to-clipboard functionality works

---

## Prevention Strategy

To prevent this issue in the future:

1. **Before creating a new story file** that uses `getCodeVariants()`:
   - First create the code variants export in `codeVariants.ts`
   - Register it in the `examples` map
   - Then create the story file

2. **Add a pre-commit hook** that validates:
   ```bash
   # Check all getCodeVariants() calls have matching registrations
   node scripts/validate-code-variants.js
   ```

3. **Update contributor documentation** to include:
   - How to add new code variants
   - Naming conventions
   - Registration checklist

---

## Estimated Impact

**Current State:**
- 20 story variations are displaying error messages
- Code example tabs show "No code examples found"
- User experience is degraded for ButtonGroup and AppProvider components

**After Fix:**
- All 83 components will have working code examples
- 100% of stories will display correctly
- Consistent user experience across all Storybook components

---

## Contact

For questions about this audit or implementation:
- Review the full detailed report: `code-variants-audit-report.md`
- Check the codebase at: `/storybook/.storybook/blocks/codeVariants.ts`

---

*Generated by automated audit script*
*Analysis date: November 7, 2025*
