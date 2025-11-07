# CalloutCard Component - Code Variants Status

## Overview
The CalloutCard component has 12 story variations in the Storybook. This document tracks the progress of adding comprehensive code variants for each story.

## Completed Variants (2/12)

### 1. ✅ layout
- **Location**: Line 17498 in `/storybook/.storybook/blocks/codeVariants.ts`
- **Story**: `WithIllustration`
- **Features**: Includes illustration, primary action, secondary action
- **Languages**: React, Vanilla JS, ExtJS, TypeScript

### 2. ✅ default
- **Location**: Line 17649 in `/storybook/.storybook/blocks/codeVariants.ts`
- **Story**: `Default`
- **Features**: Basic callout card without illustration
- **Languages**: React, Vanilla JS, ExtJS, TypeScript

## Remaining Variants to Add (10/12)

### 3. ⏳ promotional
- **Story**: `PromotionalContent`
- **Content**: "Upgrade to Premium" promotional message
- **Features**: Upgrade call-to-action, plan comparison link
- **Needs**: All 4 languages (react, vanilla, extjs, typescript)

### 4. ⏳ featureAnnouncement
- **Story**: `FeatureAnnouncement`
- **Content**: "New: Advanced Analytics Dashboard"
- **Features**: Feature announcement, tutorial link
- **Needs**: All 4 languages

### 5. ⏳ onboarding
- **Story**: `OnboardingGuidance`
- **Content**: "Welcome to Shopify POS"
- **Features**: Setup action, informational link
- **Needs**: All 4 languages

### 6. ⏳ tips
- **Story**: `TipsAndBestPractices`
- **Content**: "Optimize your product pages"
- **Features**: Educational content, guide and examples links
- **Needs**: All 4 languages

### 7. ⏳ interactive
- **Story**: `InteractiveCallout`
- **Content**: "Get your free marketing guide"
- **Features**: **Stateful/dismissible**, download action, not interested button
- **Special**: Includes useState, show/hide logic, feedback messages
- **Needs**: All 4 languages with state management

### 8. ⏳ businessInsights
- **Story**: `BusinessInsights`
- **Content**: Multiple callouts (Holiday sales, Checkout optimization)
- **Features**: **Multiple cards** in a container
- **Special**: Array of callout cards
- **Needs**: All 4 languages with array mapping

### 9. ⏳ educational
- **Story**: `EducationalContent`
- **Content**: "Learn SEO basics for your store"
- **Features**: Course/education focused
- **Needs**: All 4 languages

### 10. ⏳ multiple
- **Story**: `MultipleCallouts`
- **Content**: Three callouts (Add product, Customize theme, Set up shipping)
- **Features**: **Three cards** in vertical stack
- **Special**: Onboarding workflow pattern
- **Needs**: All 4 languages with array of 3 items

### 11. ⏳ minimal
- **Story**: `MinimalCallout`
- **Content**: "Quick tip" with keyboard shortcut
- **Features**: **Single action only** (no secondary action)
- **Special**: Simplest variant
- **Needs**: All 4 languages

### 12. ⏳ withMetrics
- **Story**: `CalloutCardWithMetrics`
- **Content**: "Your store is performing well!"
- **Features**: **Rich content** with bullet list of metrics
- **Special**: HTML content in children (ul/li elements)
- **Needs**: All 4 languages with HTML children

## Implementation Pattern

Each variant should follow this structure in `codeVariants.ts`:

```typescript
variantName: {
  react: `// React Polaris component implementation`,
  vanilla: `<!-- HTML Structure -->
<script>
// @cin7/vanilla-js implementation
</script>`,
  extjs: `// ExtJS Panel implementation using @cin7/extjs-adapters`,
  typescript: `// Fully typed React implementation with interfaces`
}
```

## Story File Updates Needed

After adding variants to `codeVariants.ts`, update the corresponding stories in:
`/storybook/stories/components/feedback/CalloutCard.stories.tsx`

Change:
```typescript
parameters: {
  codeVariants: getCodeVariants('calloutcard', 'default'),
}
```

To the appropriate variant name.

## Current Status Summary

- **Total Variants**: 12
- **Completed**: 2 (16.7%)
- **Remaining**: 10 (83.3%)
- **Estimated Lines of Code**: ~4,000 lines for remaining 10 variants

## Next Steps

1. Add remaining 10 variants to `/storybook/.storybook/blocks/codeVariants.ts`
2. Update story parameters in `CalloutCard.stories.tsx` to reference correct variants
3. Test all code variants in Storybook to ensure they render correctly
4. Verify TypeScript compilation passes
5. Commit changes with message: "feat: add comprehensive CalloutCard code variants (12 variants across 4 languages)"

## Architecture Notes

- **React**: Use Polaris CalloutCard component directly
- **Vanilla JS**: Use @cin7/vanilla-js utilities (on, $, hide, show, etc.)
- **ExtJS**: Use Ext.panel.Panel with @cin7/extjs-adapters patterns
- **TypeScript**: Fully typed interfaces with proper JSX.Element return types

## Special Considerations

- **Interactive variant**: Requires useState hooks and state management across all languages
- **Multiple/BusinessInsights variants**: Require array mapping and container layouts
- **WithMetrics variant**: HTML content as children (Text component + ul/li)
- **Minimal variant**: No secondary action (optional secondary action handling)
