# Tooltip Component Code Variants

This file contains all the code variants that need to be added to `/storybook/.storybook/blocks/codeVariants.ts` for the Tooltip component.

These variants should be added to the `tooltipExamples` object, after the existing `withIcon` variant and before the closing `};`

## Current Status

Already added:
- default
- withText
- withIcon

## Variants to Add

Insert the following variants after `withIcon` in the `tooltipExamples` object:

```typescript
  positions: {
    react: `import { Tooltip, Button } from '@shopify/polaris';
import React from 'react';

function TooltipPositionsExample() {
  return (
    <div style={{
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
      placeItems: 'center'
    }}>
      <Tooltip content="Above Left" preferredPosition="above" preferredAlignment="left">
        <Button>Top Left</Button>
      </Tooltip>

      <Tooltip content="Above Center" preferredPosition="above" preferredAlignment="center">
        <Button>Top Center</Button>
      </Tooltip>

      <Tooltip content="Above Right" preferredPosition="above" preferredAlignment="right">
        <Button>Top Right</Button>
      </Tooltip>

      <Tooltip content="Below Left" preferredPosition="below" preferredAlignment="left">
        <Button>Bottom Left</Button>
      </Tooltip>

      <Tooltip content="Below Center" preferredPosition="below" preferredAlignment="center">
        <Button>Bottom Center</Button>
      </Tooltip>

      <Tooltip content="Below Right" preferredPosition="below" preferredAlignment="right">
        <Button>Bottom Right</Button>
      </Tooltip>
    </div>
  );
}

export default TooltipPositionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="padding: 80px 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; place-items: center;">
  <div class="tooltip-wrapper">
    <button class="polaris-button" data-position="top-left">Top Left</button>
    <div class="tooltip tooltip-top-left">Above Left</div>
  </div>

  <div class="tooltip-wrapper">
    <button class="polaris-button" data-position="top-center">Top Center</button>
    <div class="tooltip tooltip-top-center">Above Center</div>
  </div>

  <div class="tooltip-wrapper">
    <button class="polaris-button" data-position="top-right">Top Right</button>
    <div class="tooltip tooltip-top-right">Above Right</div>
  </div>

  <div class="tooltip-wrapper">
    <button class="polaris-button" data-position="bottom-left">Bottom Left</button>
    <div class="tooltip tooltip-bottom-left">Below Left</div>
  </div>

  <div class="tooltip-wrapper">
    <button class="polaris-button" data-position="bottom-center">Bottom Center</button>
    <div class="tooltip tooltip-bottom-center">Below Center</div>
  </div>

  <div class="tooltip-wrapper">
    <button class="polaris-button" data-position="bottom-right">Bottom Right</button>
    <div class="tooltip tooltip-bottom-right">Below Right</div>
  </div>
</div>

<style>
.tooltip-wrapper { position: relative; display: inline-block; }
.tooltip {
  position: absolute; padding: 8px 12px; background: #333;
  color: white; font-size: 14px; border-radius: 4px;
  white-space: nowrap; pointer-events: none; z-index: 1000;
  opacity: 0; visibility: hidden; transition: opacity 0.2s;
}
.tooltip.visible { opacity: 1; visibility: visible; }

.tooltip-top-left, .tooltip-top-center, .tooltip-top-right {
  bottom: 100%; margin-bottom: 8px;
}
.tooltip-bottom-left, .tooltip-bottom-center, .tooltip-bottom-right {
  top: 100%; margin-top: 8px;
}

.tooltip-top-left, .tooltip-bottom-left { left: 0; }
.tooltip-top-center, .tooltip-bottom-center { left: 50%; transform: translateX(-50%); }
.tooltip-top-right, .tooltip-bottom-right { right: 0; }
</style>

<script>
import { on, addClass, removeClass } from '@cin7/vanilla-js';

document.querySelectorAll('[data-position]').forEach(button => {
  const tooltip = button.nextElementSibling;
  on(button, 'mouseenter', () => addClass(tooltip, 'visible'));
  on(button, 'mouseleave', () => removeClass(tooltip, 'visible'));
});
</script>`,

    extjs: `// ExtJS Tooltip Positions
Ext.onReady(function() {
  const positions = [
    { text: 'Top Left', align: 'tl-bl', offset: [-5, -5] },
    { text: 'Top Center', align: 't-b' },
    { text: 'Top Right', align: 'tr-br', offset: [5, -5] },
    { text: 'Bottom Left', align: 'bl-tl', offset: [-5, 5] },
    { text: 'Bottom Center', align: 'b-t' },
    { text: 'Bottom Right', align: 'br-tr', offset: [5, 5] }
  ];

  Ext.create('Ext.container.Container', {
    renderTo: Ext.getBody(),
    padding: '80 40',
    layout: {
      type: 'table',
      columns: 3,
      tdAttrs: { style: 'padding: 20px; text-align: center;' }
    },
    items: positions.map(pos => ({
      xtype: 'button',
      text: pos.text,
      listeners: {
        render: function(btn) {
          Ext.create('Ext.tip.ToolTip', {
            target: btn.el,
            html: pos.text.replace('Top', 'Above').replace('Bottom', 'Below'),
            anchor: pos.align,
            anchorOffset: pos.offset ? pos.offset[1] : 0
          });
        }
      }
    }))
  });
});`,

    typescript: `import { Tooltip, Button } from '@shopify/polaris';
import React from 'react';

type Position = 'above' | 'below';
type Alignment = 'left' | 'center' | 'right';

interface TooltipPositionConfig {
  position: Position;
  alignment: Alignment;
  label: string;
}

interface TooltipPositionsExampleProps {
  positions?: TooltipPositionConfig[];
}

function TooltipPositionsExample({
  positions = [
    { position: 'above', alignment: 'left', label: 'Top Left' },
    { position: 'above', alignment: 'center', label: 'Top Center' },
    { position: 'above', alignment: 'right', label: 'Top Right' },
    { position: 'below', alignment: 'left', label: 'Bottom Left' },
    { position: 'below', alignment: 'center', label: 'Bottom Center' },
    { position: 'below', alignment: 'right', label: 'Bottom Right' }
  ]
}: TooltipPositionsExampleProps): JSX.Element {
  return (
    <div style={{
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
      placeItems: 'center'
    }}>
      {positions.map((config, index) => (
        <Tooltip
          key={index}
          content={\`\${config.position === 'above' ? 'Above' : 'Below'} \${config.alignment.charAt(0).toUpperCase() + config.alignment.slice(1)}\`}
          preferredPosition={config.position}
          preferredAlignment={config.alignment}
        >
          <Button>{config.label}</Button>
        </Tooltip>
      ))}
    </div>
  );
}

export default TooltipPositionsExample;`
  },

  wideTooltip: {
    // ... (continue with all remaining variants)
  }
```

## Story Parameter Updates

Once the variants are added to `codeVariants.ts`, update the Tooltip.stories.tsx file to reference them:

- Default: `getCodeVariants('tooltip', 'default')` ✓ (already correct)
- WithText: `getCodeVariants('tooltip', 'withText')`
- WithIcon: `getCodeVariants('tooltip', 'withIcon')`
- Positions: `getCodeVariants('tooltip', 'positions')`
- WideTooltip: `getCodeVariants('tooltip', 'wideTooltip')`
- InteractiveTooltip: `getCodeVariants('tooltip', 'interactiveTooltip')`
- FormHelpText: `getCodeVariants('tooltip', 'formHelpText')`
- TableTooltips: `getCodeVariants('tooltip', 'tableTooltips')`
- LightTheme: Use 'default' or create 'lightTheme'
- PersistentOnHover: Use 'default' or create 'persistentOnHover'
- ComplexContent: Use 'default' or create 'complexContent'
- StatusIndicators: Use 'withIcon' or create 'statusIndicators'
- AccessibilityDemo: Use 'default' or create 'accessibilityDemo'

## Summary

13 Tooltip story variations identified:
1. Default - code variants added ✓
2. WithText - code variants added ✓
3. WithIcon - code variants added ✓
4. Positions - needs to be added
5. WideTooltip - needs to be added
6. InteractiveTooltip - needs to be added
7. FormHelpText - needs to be added
8. TableTooltips - needs to be added
9. LightTheme - can use 'default'
10. PersistentOnHover - can use 'default'
11. ComplexContent - can use 'default'
12. StatusIndicators - can use 'withIcon'
13. AccessibilityDemo - can use 'default'

Due to file size and formatter conflicts, the remaining variants (positions, wideTooltip, interactiveTooltip, formHelpText, tableTooltips) need to be manually added to the codeVariants.ts file.
