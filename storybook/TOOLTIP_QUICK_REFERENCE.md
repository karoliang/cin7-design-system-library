# Tooltip Code Variants - Quick Reference

## Current Status: ✅ Partial Implementation Complete

### Variants Added to codeVariants.ts

| Variant Name | Story Usage | Status |
|--------------|-------------|--------|
| `default` | Default, Positions, WideTooltip, InteractiveTooltip, FormHelpText, TableTooltips, LightTheme, PersistentOnHover, ComplexContent, AccessibilityDemo | ✅ Added |
| `withText` | WithText | ✅ Added |
| `withIcon` | WithIcon, StatusIndicators | ✅ Added |

### Generated But Not Yet Added

| Variant Name | Description | Priority |
|--------------|-------------|----------|
| `positions` | 6 position/alignment combinations in grid | High |
| `wideTooltip` | Wide tooltip for longer content | Medium |
| `interactiveTooltip` | State-managed controlled tooltips | Medium |
| `formHelpText` | Form field help pattern | High |
| `tableTooltips` | Table headers and cell tooltips | High |

## Using the Code Variants

### In Storybook Stories

```typescript
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

export const MyStory: Story = {
  render: () => <YourComponent />,
  parameters: {
    codeVariants: getCodeVariants('tooltip', 'default'), // or 'withText', 'withIcon'
  },
};
```

### Available Implementations

Each variant includes 4 complete implementations:

1. **React** - Using @shopify/polaris Tooltip component
2. **Vanilla** - Using @cin7/vanilla-js utilities
3. **ExtJS** - Using Ext.tip.ToolTip component
4. **TypeScript** - Fully typed React implementation

## Example: Default Tooltip

### React
```typescript
import { Tooltip, Button } from '@shopify/polaris';

<Tooltip content="This is helpful tooltip text">
  <Button>Hover over me</Button>
</Tooltip>
```

### Vanilla JS
```javascript
import { on, addClass, removeClass } from '@cin7/vanilla-js';

on(trigger, 'mouseenter', () => addClass(tooltip, 'visible'));
on(trigger, 'mouseleave', () => removeClass(tooltip, 'visible'));
```

### ExtJS
```javascript
Ext.create('Ext.button.Button', {
  text: 'Hover over me',
  tooltip: 'This is helpful tooltip text'
});
```

## Key Features

- ✅ Hover activation with smooth transitions
- ✅ Keyboard accessibility (focus/blur)
- ✅ Positioning options (above, below, left, right)
- ✅ Wide content support
- ✅ Multiple trigger types (button, text, icon)
- ✅ Interactive state management
- ✅ Form field integration
- ✅ Table integration

## Architecture

All variants follow Cin7 DSL principles:
- Layer independence
- Type safety
- Framework agnostic business logic
- Clear boundaries between layers

## Related Files

- **Main Implementation**: `/storybook/.storybook/blocks/codeVariants.ts`
- **Stories**: `/storybook/stories/components/feedback/Tooltip.stories.tsx`
- **Full Documentation**: `/storybook/TOOLTIP_CODE_VARIANTS_SUMMARY.md`
- **Variants to Add**: `/storybook/TOOLTIP_VARIANTS_TO_ADD.md`

## Quick Commands

```bash
# View current variants
grep "tooltipExamples" storybook/.storybook/blocks/codeVariants.ts

# Run Storybook
cd storybook && pnpm dev

# Build Storybook
cd storybook && pnpm build
```

## Next Actions

If you want to add the remaining variants:

1. Open `/storybook/.storybook/blocks/codeVariants.ts`
2. Find the `tooltipExamples` object (around line 36457)
3. Add variants from `/storybook/TOOLTIP_VARIANTS_TO_ADD.md`
4. Update story parameters to reference new variant names
5. Test in Storybook

---

*Quick Reference - November 8, 2025*
