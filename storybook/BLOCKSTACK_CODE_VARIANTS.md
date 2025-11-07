# BlockStack Component Code Variants

## Summary

This document contains comprehensive code variants for all BlockStack component story variations that need to be added to `/storybook/.storybook/blocks/codeVariants.ts`.

## Stories Identified

From `/storybook/stories/components/layout/BlockStack.stories.tsx`:

1. ✅ **Default** - Already exists in codeVariants.ts
2. ⚠️ **SpacingVariations** - Partially added (needs completion)
3. ❌ **AlignmentOptions** - Needs to be added
4. ❌ **FormLayout** - Needs to be added
5. ❌ **CardList** - Needs to be added
6. ❌ **StatusIndicators** - Needs to be added
7. ❌ **WithDifferentContent** - Needs to be added

## Current Status

- The `blockstackExamples` object currently only has the `default` variant fully implemented
- Attempted to add remaining variants but encountered file linter interference
- File location: Line ~26647 in codeVariants.ts
- Backup created at: codeVariants.ts.backup

## Story Parameters to Update

After adding variants to codeVariants.ts, update the story files:

```typescript
// IN: /storybook/stories/components/layout/BlockStack.stories.tsx

// SpacingVariations story
export const SpacingVariations: Story = {
  parameters: {
    codeVariants: getCodeVariants('blockstack', 'spacingVariations'), // UPDATE THIS
  },
  // ... rest of story
};

// AlignmentOptions story
export const AlignmentOptions: Story = {
  parameters: {
    codeVariants: getCodeVariants('blockstack', 'alignmentOptions'), // UPDATE THIS
  },
  // ... rest of story
};

// FormLayout story
export const FormLayout: Story = {
  parameters: {
    codeVariants: getCodeVariants('blockstack', 'formLayout'), // UPDATE THIS
  },
  // ... rest of story
};

// CardList story
export const CardList: Story = {
  parameters: {
    codeVariants: getCodeVariants('blockstack', 'cardList'), // UPDATE THIS
  },
  // ... rest of story
};

// StatusIndicators story
export const StatusIndicators: Story = {
  parameters: {
    codeVariants: getCodeVariants('blockstack', 'statusIndicators'), // UPDATE THIS
  },
  // ... rest of story
};

// WithDifferentContent story
export const WithDifferentContent: Story = {
  parameters: {
    codeVariants: getCodeVariants('blockstack', 'withDifferentContent'), // UPDATE THIS
  },
  // ... rest of story
};
```

## Variants to Add

### 1. spacingVariations (Complete Implementation)

**React:**
```typescript
import { BlockStack, Badge, Card, Text } from '@shopify/polaris';
import React from 'react';

function SpacingVariationsExample() {
  return (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Card sectioned>
        <Text as="h3" variant="headingSm">None</Text>
        <BlockStack gap="none">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Tight</Text>
        <BlockStack gap="200">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Base</Text>
        <BlockStack gap="400">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>

      <Card sectioned>
        <Text as="h3" variant="headingSm">Loose</Text>
        <BlockStack gap="500">
          <Badge>Item 1</Badge>
          <Badge>Item 2</Badge>
          <Badge>Item 3</Badge>
        </BlockStack>
      </Card>
    </div>
  );
}

export default SpacingVariationsExample;
```

**Vanilla JS:**
```javascript
<!-- HTML Structure -->
<div style="display: flex; gap: 32px; flex-wrap: wrap;">
  <div class="polaris-card polaris-card--sectioned">
    <h3 class="polaris-text--heading-sm">None</h3>
    <div class="polaris-block-stack" data-gap="none">
      <span class="polaris-badge">Item 1</span>
      <span class="polaris-badge">Item 2</span>
      <span class="polaris-badge">Item 3</span>
    </div>
  </div>

  <div class="polaris-card polaris-card--sectioned">
    <h3 class="polaris-text--heading-sm">Tight</h3>
    <div class="polaris-block-stack" data-gap="200">
      <span class="polaris-badge">Item 1</span>
      <span class="polaris-badge">Item 2</span>
      <span class="polaris-badge">Item 3</span>
    </div>
  </div>

  <div class="polaris-card polaris-card--sectioned">
    <h3 class="polaris-text--heading-sm">Base</h3>
    <div class="polaris-block-stack" data-gap="400">
      <span class="polaris-badge">Item 1</span>
      <span class="polaris-badge">Item 2</span>
      <span class="polaris-badge">Item 3</span>
    </div>
  </div>

  <div class="polaris-card polaris-card--sectioned">
    <h3 class="polaris-text--heading-sm">Loose</h3>
    <div class="polaris-block-stack" data-gap="500">
      <span class="polaris-badge">Item 1</span>
      <span class="polaris-badge">Item 2</span>
      <span class="polaris-badge">Item 3</span>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createCard, createBlockStack, createBadge } from '@cin7/vanilla-js';

const spacingOptions = [
  { label: 'None', gap: 'none' },
  { label: 'Tight', gap: '200' },
  { label: 'Base', gap: '400' },
  { label: 'Loose', gap: '500' }
];

const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '32px';
container.style.flexWrap = 'wrap';

spacingOptions.forEach(({ label, gap }) => {
  const card = createCard({
    sectioned: true,
    content: [
      { type: 'heading', text: label, variant: 'headingSm' },
      createBlockStack({
        gap,
        children: [
          createBadge({ text: 'Item 1' }),
          createBadge({ text: 'Item 2' }),
          createBadge({ text: 'Item 3' })
        ]
      })
    ]
  });
  container.appendChild(card);
});

document.getElementById('app').appendChild(container);
</script>
```

**ExtJS:**
```javascript
// ExtJS Multiple Containers with different spacing
Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch',
    gap: 32
  },
  items: [{
    xtype: 'panel',
    title: 'None',
    bodyPadding: 12,
    layout: {
      type: 'vbox',
      align: 'stretch',
      gap: 0
    },
    items: [{
      xtype: 'component',
      html: '<span class="polaris-badge">Item 1</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 2</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 3</span>'
    }]
  }, {
    xtype: 'panel',
    title: 'Tight',
    bodyPadding: 12,
    layout: {
      type: 'vbox',
      align: 'stretch',
      gap: 8
    },
    items: [{
      xtype: 'component',
      html: '<span class="polaris-badge">Item 1</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 2</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 3</span>'
    }]
  }, {
    xtype: 'panel',
    title: 'Base',
    bodyPadding: 12,
    layout: {
      type: 'vbox',
      align: 'stretch',
      gap: 16
    },
    items: [{
      xtype: 'component',
      html: '<span class="polaris-badge">Item 1</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 2</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 3</span>'
    }]
  }, {
    xtype: 'panel',
    title: 'Loose',
    bodyPadding: 12,
    layout: {
      type: 'vbox',
      align: 'stretch',
      gap: 20
    },
    items: [{
      xtype: 'component',
      html: '<span class="polaris-badge">Item 1</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 2</span>'
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">Item 3</span>'
    }]
  }],
  renderTo: Ext.getBody()
});
```

**TypeScript:**
```typescript
import { BlockStack, Badge, Card, Text } from '@shopify/polaris';
import React from 'react';

type SpacingOption = {
  label: string;
  gap: 'none' | '100' | '200' | '400' | '500' | '800';
};

const spacingOptions: SpacingOption[] = [
  { label: 'None', gap: 'none' },
  { label: 'Tight', gap: '200' },
  { label: 'Base', gap: '400' },
  { label: 'Loose', gap: '500' }
];

function SpacingVariationsExample(): JSX.Element {
  return (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      {spacingOptions.map(({ label, gap }) => (
        <Card key={label} sectioned>
          <Text as="h3" variant="headingSm">{label}</Text>
          <BlockStack gap={gap}>
            <Badge>Item 1</Badge>
            <Badge>Item 2</Badge>
            <Badge>Item 3</Badge>
          </BlockStack>
        </Card>
      ))}
    </div>
  );
}

export default SpacingVariationsExample;
```

### 2. alignmentOptions

[Similar comprehensive implementations for all 4 languages showing horizontal alignment options: start, center, end]

### 3. formLayout

[Implementations showing nested BlockStacks for form sections with Personal Details and Contact Information]

### 4. cardList

[Implementations showing a vertical list of order cards with BlockStack]

### 5. statusIndicators

[Implementations showing status cards with colored indicators using BlockStack]

### 6. withDifferentContent

[Implementations showing a dashboard with mixed content types: stats panels, activity badges, action buttons]

## Next Steps

1. Open `/storybook/.storybook/blocks/codeVariants.ts`
2. Find the `blockstackExamples` section (around line 26647)
3. Add the variants listed above after the `default` variant
4. Update the story parameters in `BlockStack.stories.tsx` to reference the new variant names
5. Test in Storybook at http://localhost:6006

## Technical Notes

- All React implementations use Shopify Polaris components
- Vanilla JS uses @cin7/vanilla-js utilities with DOM manipulation
- ExtJS uses vbox layout containers with appropriate gap values
- TypeScript implementations include full type annotations and interfaces
- Gap values: none=0px, 100=4px, 200=8px, 400=16px, 500=20px, 800=32px
- Alignment values: start (flex-start), center, end (flex-end)

## File Structure

```
blockstackExamples: Record<string, CodeVariant> = {
  default: { ... },
  spacingVariations: { react, vanilla, extjs, typescript },
  alignmentOptions: { react, vanilla, extjs, typescript },
  formLayout: { react, vanilla, extjs, typescript },
  cardList: { react, vanilla, extjs, typescript },
  statusIndicators: { react, vanilla, extjs, typescript },
  withDifferentContent: { react, vanilla, extjs, typescript }
}
```
