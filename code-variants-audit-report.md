# Code Variants Audit Report

**Date:** November 7, 2025  
**Issue:** Storybook showing "No code examples found for component: buttongroup" errors

---

## Executive Summary

The investigation revealed **3 missing code variant mappings** in the Storybook codebase:

1. **ButtonGroup** - Story exists, but no code variants defined
2. **ActionList** - Export exists as `actionList` but not registered in `getCodeVariants()`
3. **AppProvider** - Story exists, but no code variants defined

**Total Components Analyzed:** 83 story keys, 80 exports  
**Components Working:** 80/83 (96.4%)  
**Components Broken:** 3/83 (3.6%)

---

## Detailed Findings

### 1. Missing Registration: ButtonGroup ❌

**Story File:** `/storybook/stories/components/actions/ButtonGroup.stories.tsx`

**Issue:** Story calls `getCodeVariants('buttongroup', 'default')` but:
- No `buttonGroupExamples` export exists in `codeVariants.ts`
- Component is not registered in the `getCodeVariants()` function

**Impact:** All 13 ButtonGroup story variations show "No code examples found"

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

**Fix Required:**
1. Create `buttonGroupExamples` object in `codeVariants.ts`
2. Add `buttongroup: buttonGroupExamples` to the `examples` map in `getCodeVariants()`

---

### 2. Missing Registration: ActionList ⚠️

**Story File:** `/storybook/stories/components/actions/ActionList.stories.tsx`

**Issue:** Export EXISTS as `actionList` (line 12487 in codeVariants.ts), but:
- Named inconsistently: `actionList` instead of `actionListExamples`
- IS correctly registered in `getCodeVariants()` as `actionlist: actionList`

**Status:** ✅ **Actually Working** - False positive from naming convention check

**Note:** While the naming convention differs from other components (which use `*Examples` suffix), the registration is correct and functional.

---

### 3. Missing Registration: AppProvider ❌

**Story File:** `/storybook/stories/components/utilities/AppProvider.stories.tsx`

**Issue:** Story calls `getCodeVariants('appprovider', ...)` but:
- No `appProviderExamples` export exists in `codeVariants.ts`
- Component is not registered in the `getCodeVariants()` function

**Impact:** AppProvider story shows "No code examples found"

**Fix Required:**
1. Create `appProviderExamples` object in `codeVariants.ts`
2. Add `appprovider: appProviderExamples` to the `examples` map in `getCodeVariants()`

---

## Current Registration Status

### Registered Components (80 total)

All these components are correctly registered in `getCodeVariants()`:

```
✅ actionmenu         ✅ alphastack        ✅ autocomplete      ✅ avatar
✅ badge              ✅ banner            ✅ barchart          ✅ bleed
✅ blockstack         ✅ box               ✅ breadcrumbs       ✅ bulkactions
✅ button             ✅ calloutcard       ✅ card              ✅ checkbox
✅ checkboxgroup      ✅ choicelist        ✅ collapsible       ✅ colorpicker
✅ combobox           ✅ contextualsavebar ✅ coreutilities     ✅ datatable
✅ datepicker         ✅ descriptionlist   ✅ divider           ✅ dropzone
✅ ecommercecomponents ✅ emptystate       ✅ exceptionlist     ✅ filters
✅ footerhelp         ✅ formlayout        ✅ formpanel         ✅ frame
✅ fullscreenbar      ✅ grid              ✅ image             ✅ indexfilters
✅ indextable         ✅ inlinestack       ✅ keyboardkey       ✅ keypresslistener
✅ layout             ✅ linechart         ✅ link              ✅ list
✅ loading            ✅ mediacard         ✅ modal             ✅ navigation
✅ optionlist         ✅ page              ✅ pageactions       ✅ pagination
✅ piechart           ✅ popover           ✅ progressbar       ✅ radiobutton
✅ rangeslider        ✅ repository        ✅ resourceitem      ✅ resourcelist
✅ scrollable         ✅ select            ✅ sheet             ✅ spinner
✅ tabs               ✅ tag               ✅ text              ✅ textcontainer
✅ textfield          ✅ thumbnail         ✅ toast             ✅ tooltip
✅ topbar             ✅ usecase           ✅ verticalstack     ✅ videothumbnail
```

### Missing Components (3 total)

```
❌ actionlist     - Story uses 'actionlist' but export named inconsistently (works anyway)
❌ appprovider    - No export exists, not registered
❌ buttongroup    - No export exists, not registered
```

---

## Code Analysis

### Current getCodeVariants() Registration Map

Located at: `/storybook/.storybook/blocks/codeVariants.ts:22724-22806`

```typescript
const examples: Record<string, Record<string, CodeVariant>> = {
  button: buttonExamples,
  card: cardExamples,
  textfield: textFieldExamples,
  modal: modalExamples,
  banner: bannerExamples,
  actionlist: actionList,  // ⚠️ Inconsistent naming but works
  bulkactions: bulkActionsExamples,
  tabs: tabsExamples,
  // ... 80 total registrations
  repository: repositoryExamples,
  // ❌ Missing: buttongroup
  // ❌ Missing: appprovider
};
```

### ButtonGroup Story Usage

Located at: `/storybook/stories/components/actions/ButtonGroup.stories.tsx:64`

```typescript
export const Default: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="p">Choose your action:</Text>
        <ButtonGroup>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="plain">Help</Button>
        </ButtonGroup>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'default'),  // ❌ Returns null
  },
};
```

---

## Recommended Actions

### Priority 1: Fix ButtonGroup (High Impact)

ButtonGroup has **13 story variations** all failing. This is the highest priority fix.

**Steps:**
1. Create code variants for ButtonGroup in `codeVariants.ts`
2. Register in `getCodeVariants()` function
3. Test all 13 story variations

**Example structure needed:**
```typescript
export const buttonGroupExamples: Record<string, CodeVariant> = {
  default: {
    react: `...`,
    vanilla: `...`,
    extjs: `...`,
    typescript: `...`
  }
};

// Then in getCodeVariants():
const examples = {
  // ...
  buttongroup: buttonGroupExamples,
  // ...
};
```

### Priority 2: Fix AppProvider (Medium Impact)

AppProvider has fewer variations but is still broken.

**Steps:**
1. Create code variants for AppProvider in `codeVariants.ts`
2. Register in `getCodeVariants()` function
3. Test story variations

### Priority 3: Standardize ActionList Naming (Low Priority)

ActionList works but uses inconsistent naming convention.

**Optional improvement:**
- Rename `actionList` to `actionListExamples` for consistency
- This is cosmetic and can be deferred

---

## Prevention Recommendations

### 1. Add Type Safety

Enhance the `getCodeVariants()` function with TypeScript to catch missing registrations:

```typescript
type ComponentKey = 'button' | 'buttongroup' | 'card' | ... // all valid keys

export function getCodeVariants(
  componentName: ComponentKey,  // Type-safe keys
  exampleName: string
): CodeVariant | null {
  // ...
}
```

### 2. Add Automated Tests

Create a test that validates all story `getCodeVariants()` calls have matching registrations:

```typescript
describe('Code Variants Registration', () => {
  it('should have code variants for all components using getCodeVariants', () => {
    const storyKeys = extractAllStoryKeys();
    const registeredKeys = Object.keys(examples);
    
    const missing = storyKeys.filter(key => !registeredKeys.includes(key));
    expect(missing).toHaveLength(0);
  });
});
```

### 3. Documentation

Add a README section in `.storybook/blocks/` explaining:
- How to add new code variants
- Naming conventions
- Registration requirements
- Testing checklist

---

## Statistics

| Metric | Count | Percentage |
|--------|-------|------------|
| Total story keys | 83 | 100% |
| Registered exports | 80 | 96.4% |
| Missing exports | 3 | 3.6% |
| Working components | 80 | 96.4% |
| Broken components | 2 | 2.4% |
| Inconsistent naming | 1 | 1.2% |

---

## Technical Details

### File Locations

- **Code Variants Definition:** `/storybook/.storybook/blocks/codeVariants.ts` (22,821 lines)
- **Story Files Directory:** `/storybook/stories/`
- **Analysis Script:** `/analyze-code-variants.js`

### Export Pattern

**Standard naming convention:**
```typescript
export const {componentName}Examples: Record<string, CodeVariant> = {
  default: { react, vanilla, extjs, typescript },
  // ... more variations
};
```

**Registration pattern:**
```typescript
const examples: Record<string, Record<string, CodeVariant>> = {
  {lowercasekey}: {componentName}Examples,
  // ...
};
```

### Example Call Pattern

**In story files:**
```typescript
parameters: {
  codeVariants: getCodeVariants('componentkey', 'variationname'),
}
```

---

## Conclusion

The root cause is straightforward: **ButtonGroup and AppProvider code variants were never created or registered**. The fix is mechanical:

1. Create the exports in `codeVariants.ts`
2. Register them in `getCodeVariants()`
3. Verify stories render correctly

**Estimated Fix Time:** 30-60 minutes per component

**Testing Required:** Visual verification of all affected stories in Storybook

---

*Report generated by: `analyze-code-variants.js`*  
*Analysis method: AST parsing + regex matching*  
*Files analyzed: 91 story files, 1 code variants file*
