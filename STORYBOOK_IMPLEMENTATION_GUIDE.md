# Cin7 DSL Storybook Implementation Guide

## Executive Summary

Analyzed **24 story files** containing **106 total stories** in the Cin7 DSL section of Storybook. Identified optimization opportunities for the learning path, discovered file path inconsistencies, and provided specific implementation steps.

---

## Quick Facts

- **Total Files**: 24 story files
- **Total Stories**: 106 interactive stories
- **Current Categories**: 5 (Business Patterns, ExtJS Adapters, Foundation, Guides, TypeScript SDK)
- **Largest Category**: Guides (41 stories, 39%)
- **File Path Issues**: 3 critical mismatches
- **Naming Inconsistencies**: 1 (TreePanel vs Form Panel pattern)

---

## Configuration for Storybook Ordering

### Implementation Option 1: Title-Based Ordering (Recommended)

Storybook automatically sorts stories based on their `/` separated title hierarchy. Use numeric prefixes to control order:

```typescript
// File: guides/GettingStarted.stories.tsx
const meta = {
  title: 'Cin7 DSL/01 Introduction/Getting Started',
  // ... rest of config
}

// File: guides/ComponentSelection.stories.tsx
const meta = {
  title: 'Cin7 DSL/01 Introduction/Component Selection',
  // ... rest of config
}

// File: foundation/components/CoreUtilities.stories.tsx
const meta = {
  title: 'Cin7 DSL/02 Foundations/Core Utilities',
  // ... rest of config
}

// File: business-patterns/typescript-sdk/DomainModels.stories.tsx
const meta = {
  title: 'Cin7 DSL/04 Business Logic/TypeScript SDK - Domain Models',
  // ... rest of config
}

// File: business-patterns/vanilla-js/DOMUtilities.stories.tsx
const meta = {
  title: 'Cin7 DSL/05 UI Interactions/Vanilla JS - DOM Utilities',
  // ... rest of config
}

// File: business-patterns/extjs-adapters/FormPanel.stories.tsx
const meta = {
  title: 'Cin7 DSL/06 Enterprise Components/ExtJS - Form Panel',
  // ... rest of config
}

// File: components/utilities/EcommerceComponents.stories.tsx (after moving)
const meta = {
  title: 'Cin7 DSL/07 Real-World Applications/E-commerce',
  // ... rest of config
}
```

### Implementation Option 2: Custom Storybook Config

Create/update `.storybook/preview.ts`:

```typescript
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Cin7 DSL',
          [
            '01 Introduction',
            '02 Foundations',
            '03 UI Patterns',
            '04 Business Logic',
            '05 UI Interactions',
            '06 Enterprise Components',
            '07 Real-World Applications'
          ],
        ],
      },
    },
  },
};

export default preview;
```

---

## Step-by-Step Implementation Plan

### Phase 1: File Structure Fixes (1-2 hours)

1. **Move E-commerce Stories**
   ```bash
   mkdir -p storybook/stories/business-patterns/e-commerce
   mv storybook/stories/components/utilities/EcommerceComponents.stories.tsx \
      storybook/stories/business-patterns/e-commerce/EcommercePatterns.stories.tsx
   ```

2. **Update Story Title in EcommercePatterns.stories.tsx**
   ```typescript
   // Before:
   title: 'Cin7 DSL/Business Patterns/E-commerce'
   
   // After:
   title: 'Cin7 DSL/07 Real-World Applications/E-commerce'
   ```

### Phase 2: Title Updates (3-4 hours)

Update title in each story file. Use this mapping:

```
01 Introduction/
  - guides/GettingStarted.stories.tsx
  - guides/ComponentSelection.stories.tsx
  - guides/ComponentSelectionTree.stories.tsx

02 Foundations/
  - foundation/components/CoreUtilities.stories.tsx
  - foundation/components/DesignTokens.stories.tsx

03 UI Patterns/
  - guides/UsagePatterns.stories.tsx
  - guides/IntegrationExamples.stories.tsx
  - guides/TestingExamples.stories.tsx

04 Business Logic/
  - business-patterns/typescript-sdk/DomainModels.stories.tsx
  - business-patterns/typescript-sdk/ValueObjects.stories.tsx
  - business-patterns/typescript-sdk/Repository.stories.tsx
  - business-patterns/typescript-sdk/ServiceLayer.stories.tsx
  - business-patterns/typescript-sdk/EventBus.stories.tsx
  - business-patterns/typescript-sdk/UseCase.stories.tsx

05 UI Interactions/
  - business-patterns/vanilla-js/DOMUtilities.stories.tsx
  - business-patterns/vanilla-js/Animations.stories.tsx
  - business-patterns/vanilla-js/EventHandling.stories.tsx
  - business-patterns/vanilla-js/FormUtilities.stories.tsx

06 Enterprise Components/
  - business-patterns/extjs-adapters/FormPanel.stories.tsx
  - business-patterns/extjs-adapters/AdvancedForms.stories.tsx
  - business-patterns/extjs-adapters/DataGrid.stories.tsx
  - business-patterns/extjs-adapters/ChartIntegration.stories.tsx
  - business-patterns/extjs-adapters/TreePanel.stories.tsx

07 Real-World Applications/
  - business-patterns/e-commerce/EcommercePatterns.stories.tsx
```

### Phase 3: Naming Consistency (30 minutes)

1. **Update TreePanel.stories.tsx title from**:
   ```typescript
   title: 'Cin7 DSL/ExtJS Adapters/TreePanel'
   ```
   **to**:
   ```typescript
   title: 'Cin7 DSL/06 Enterprise Components/ExtJS - Tree Panel'
   ```

2. **Verify all titles follow pattern**: `Cin7 DSL/{NUMBER} {Category}/{Subcategory}`

### Phase 4: Testing & Verification (1 hour)

```bash
# 1. Start Storybook in development mode
cd storybook
pnpm dev

# 2. Navigate to each story and verify:
#    - Correct folder location in sidebar
#    - Stories appear in expected order
#    - All story links work
#    - No broken imports

# 3. Check browser console for errors

# 4. Test navigation between related stories
```

### Phase 5: Documentation (30 minutes)

1. Create `.storybook/CIN7_DSL_GUIDE.md` with:
   - Overview of each section
   - Learning path recommendations
   - Links between related stories
   - Troubleshooting guide

2. Update main README with Storybook section

---

## Complete Title Mapping Reference

```javascript
{
  'guides/GettingStarted.stories.tsx': 'Cin7 DSL/01 Introduction/Getting Started',
  'guides/ComponentSelection.stories.tsx': 'Cin7 DSL/01 Introduction/Component Selection',
  'guides/ComponentSelectionTree.stories.tsx': 'Cin7 DSL/01 Introduction/Component Selection Tree',
  'foundation/components/CoreUtilities.stories.tsx': 'Cin7 DSL/02 Foundations/Core Utilities',
  'foundation/components/DesignTokens.stories.tsx': 'Cin7 DSL/02 Foundations/Design Tokens',
  'guides/UsagePatterns.stories.tsx': 'Cin7 DSL/03 UI Patterns/Usage Patterns',
  'guides/IntegrationExamples.stories.tsx': 'Cin7 DSL/03 UI Patterns/Integration Examples',
  'guides/TestingExamples.stories.tsx': 'Cin7 DSL/03 UI Patterns/Testing Examples',
  'business-patterns/typescript-sdk/DomainModels.stories.tsx': 'Cin7 DSL/04 Business Logic/TypeScript SDK - Domain Models',
  'business-patterns/typescript-sdk/ValueObjects.stories.tsx': 'Cin7 DSL/04 Business Logic/TypeScript SDK - Value Objects',
  'business-patterns/typescript-sdk/Repository.stories.tsx': 'Cin7 DSL/04 Business Logic/TypeScript SDK - Repository Pattern',
  'business-patterns/typescript-sdk/ServiceLayer.stories.tsx': 'Cin7 DSL/04 Business Logic/TypeScript SDK - Service Layer',
  'business-patterns/typescript-sdk/EventBus.stories.tsx': 'Cin7 DSL/04 Business Logic/TypeScript SDK - Event Bus',
  'business-patterns/typescript-sdk/UseCase.stories.tsx': 'Cin7 DSL/04 Business Logic/TypeScript SDK - Use Case Pattern',
  'business-patterns/vanilla-js/DOMUtilities.stories.tsx': 'Cin7 DSL/05 UI Interactions/Vanilla JS - DOM Utilities',
  'business-patterns/vanilla-js/Animations.stories.tsx': 'Cin7 DSL/05 UI Interactions/Vanilla JS - Animations',
  'business-patterns/vanilla-js/EventHandling.stories.tsx': 'Cin7 DSL/05 UI Interactions/Vanilla JS - Event Handling',
  'business-patterns/vanilla-js/FormUtilities.stories.tsx': 'Cin7 DSL/05 UI Interactions/Vanilla JS - Form Utilities',
  'business-patterns/extjs-adapters/FormPanel.stories.tsx': 'Cin7 DSL/06 Enterprise Components/ExtJS - Form Panel',
  'business-patterns/extjs-adapters/AdvancedForms.stories.tsx': 'Cin7 DSL/06 Enterprise Components/ExtJS - Advanced Forms',
  'business-patterns/extjs-adapters/DataGrid.stories.tsx': 'Cin7 DSL/06 Enterprise Components/ExtJS - Data Grid',
  'business-patterns/extjs-adapters/ChartIntegration.stories.tsx': 'Cin7 DSL/06 Enterprise Components/ExtJS - Chart Integration',
  'business-patterns/extjs-adapters/TreePanel.stories.tsx': 'Cin7 DSL/06 Enterprise Components/ExtJS - Tree Panel',
  'components/utilities/EcommerceComponents.stories.tsx': 'Cin7 DSL/07 Real-World Applications/E-commerce Patterns'
}
```

---

## Validation Checklist

Before considering this complete, verify:

- [ ] All 24 story files have correct titles with numeric prefixes
- [ ] E-commerce stories moved to `business-patterns/e-commerce/`
- [ ] No file path vs title mismatches
- [ ] "TreePanel" naming consistency verified
- [ ] Storybook builds without errors: `pnpm build`
- [ ] Stories appear in correct order in sidebar
- [ ] All stories render correctly (no broken imports)
- [ ] No console errors when navigating stories
- [ ] Documentation updated with new structure
- [ ] Changes committed to git with clear message

---

## Expected Results After Implementation

### Before
- Alphabetical ordering mixed all learning levels
- E-commerce stories in wrong directory
- File paths didn't match story titles
- Inconsistent naming conventions
- No clear learning progression

### After
- Logical, progressive learning path from basics to advanced
- Foundation → Patterns → Business Logic → UI → Enterprise → Applications
- Clear folder structure matching story titles
- Consistent naming conventions
- New users immediately see optimal learning path
- Related stories grouped together for discovery

---

## Benefits

1. **Better Onboarding**: New developers see "Getting Started" first
2. **Clear Learning Path**: Natural progression from fundamentals to advanced
3. **Improved Discovery**: Related concepts are grouped together
4. **Maintainability**: Folder structure matches story organization
5. **Professional Structure**: Organized appearance in Storybook UI

---

## Files to Modify

Total: 25 files need updates

### Title Only Changes (24 files)
- guides/GettingStarted.stories.tsx
- guides/ComponentSelection.stories.tsx
- guides/ComponentSelectionTree.stories.tsx
- guides/IntegrationExamples.stories.tsx
- guides/TestingExamples.stories.tsx
- guides/UsagePatterns.stories.tsx
- foundation/components/CoreUtilities.stories.tsx
- foundation/components/DesignTokens.stories.tsx
- business-patterns/typescript-sdk/DomainModels.stories.tsx
- business-patterns/typescript-sdk/EventBus.stories.tsx
- business-patterns/typescript-sdk/Repository.stories.tsx
- business-patterns/typescript-sdk/ServiceLayer.stories.tsx
- business-patterns/typescript-sdk/UseCase.stories.tsx
- business-patterns/typescript-sdk/ValueObjects.stories.tsx
- business-patterns/extjs-adapters/AdvancedForms.stories.tsx
- business-patterns/extjs-adapters/ChartIntegration.stories.tsx
- business-patterns/extjs-adapters/DataGrid.stories.tsx
- business-patterns/extjs-adapters/FormPanel.stories.tsx
- business-patterns/extjs-adapters/TreePanel.stories.tsx
- business-patterns/vanilla-js/Animations.stories.tsx
- business-patterns/vanilla-js/DOMUtilities.stories.tsx
- business-patterns/vanilla-js/EventHandling.stories.tsx
- business-patterns/vanilla-js/FormUtilities.stories.tsx

### File Move + Title Change (1 file)
- components/utilities/EcommerceComponents.stories.tsx → business-patterns/e-commerce/EcommercePatterns.stories.tsx

### Optional Config Update (1 file)
- .storybook/preview.ts (add storySort configuration)

---

## Estimated Effort

- **Quick Wins (Phase 1-3)**: 5-6 hours
- **Testing & Validation (Phase 4)**: 1-2 hours
- **Documentation (Phase 5)**: 1-2 hours
- **Total**: 7-10 hours for complete implementation

---

## Git Commit Message

```
feat: reorganize Storybook Cin7 DSL section for optimal learning path

- Add numeric prefixes (01-07) to story titles for consistent ordering
- Move E-commerce stories to business-patterns/e-commerce directory
- Rename EcommerceComponents.stories.tsx to EcommercePatterns.stories.tsx
- Update story titles to follow "Category - Subcategory" pattern
- Organize stories by learning layer: Intro → Foundation → Patterns → Business Logic → UI → Enterprise → Applications
- Fix file path vs story title inconsistencies
- Improve new user onboarding with clear progression

This reorganization provides:
- Clear learning path from basics to advanced
- Better story discovery and grouping
- Consistent folder structure
- Professional navigation hierarchy
```

