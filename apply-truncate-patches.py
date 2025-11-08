#!/usr/bin/env python3
"""
Apply TypeScript patches to Truncate component variants
"""

import re

# Read the file
file_path = "storybook/.storybook/blocks/codeVariants.ts"
with open(file_path, 'r') as f:
    content = f.read()

# Define replacements for remaining 7 variants

# 5. multilinetruncation
multiline_old = r"multilinetruncation: \{[^}]*?typescript: `import \{ Text, BlockStack \} from '@shopify/polaris';\nimport React from 'react';\nimport type \{ CSSProperties \} from 'react';\n\ninterface MultiLineTruncationProps \{[^`]*?export default MultiLineTruncation;`"

multiline_new = r"""multilinetruncation: {
    react: `import { Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function MultiLineTruncation() {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Multi-line Truncation</Text>
      <div style={{
        maxWidth: '300px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        <Text variant="bodyMd">
          This is a longer text that will be truncated after three lines.
          The text continues beyond the visible area. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </div>
    </BlockStack>
  );
}

export default MultiLineTruncation;`,

    vanilla: `<!-- Multi-line Truncation using @cin7/vanilla-js -->
<div id="multiline-truncate-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#multiline-truncate-container');

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Multi-line Truncation'
});

const textContainer = createElement('div', {
  style: 'max-width: 300px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;'
});

const text = createElement('p', {
  className: 'polaris-text polaris-text--body-md',
  textContent: 'This is a longer text that will be truncated after three lines. The text continues beyond the visible area. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
});

textContainer.appendChild(text);
container.appendChild(heading);
container.appendChild(textContainer);
</script>

<style>
.multiline-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>`,

    extjs: `// ExtJS Multi-line Truncation using @cin7/extjs-adapters
import { PolarisText } from '@cin7/extjs-adapters';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Multi-line Truncation</h3>'
    },
    {
      xtype: 'component',
      width: 300,
      html: '<div style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">' +
        '<p class="polaris-text polaris-text--body-md">' +
        'This is a longer text that will be truncated after three lines. The text continues beyond the visible area. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
        '</p>' +
        '</div>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, BlockStack, Button, InlineStack } from '@shopify/polaris';
import React, { useState, useMemo, useCallback } from 'react';
import type { CSSProperties } from 'react';

interface LineClampConfig {
  readonly min: number;
  readonly max: number;
  readonly default: number;
}

interface MultiLineState {
  readonly currentLineClamp: number;
  readonly isExpanded: boolean;
  readonly textLength: number;
}

interface MultiLineTruncationProps {
  text?: string;
  maxWidth?: string | number;
  lineClamp?: number;
  clampConfig?: Partial<LineClampConfig>;
  showControls?: boolean;
  onExpansionChange?: (isExpanded: boolean) => void;
}

const isValidLineClamp = (value: number, config: LineClampConfig): boolean => {
  return value >= config.min && value <= config.max && Number.isInteger(value);
};

const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '300px';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

const createLineClampStyles = (lineClamp: number, maxWidth: string): CSSProperties => ({
  maxWidth,
  display: '-webkit-box',
  WebkitLineClamp: lineClamp,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: 'max-height 0.3s ease-in-out'
});

const MultiLineTruncation: React.FC<MultiLineTruncationProps> = ({
  text = 'This is a longer text that will be truncated after three lines. The text continues beyond the visible area. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  maxWidth = '300px',
  lineClamp = 3,
  clampConfig,
  showControls = true,
  onExpansionChange
}): JSX.Element => {
  const mergedConfig = useMemo<LineClampConfig>(() => ({
    min: clampConfig?.min ?? 1,
    max: clampConfig?.max ?? 10,
    default: clampConfig?.default ?? 3
  }), [clampConfig]);

  const validatedLineClamp = useMemo<number>(() => {
    return isValidLineClamp(lineClamp, mergedConfig) ? lineClamp : mergedConfig.default;
  }, [lineClamp, mergedConfig]);

  const [state, setState] = useState<MultiLineState>({
    currentLineClamp: validatedLineClamp,
    isExpanded: false,
    textLength: text.length
  });

  const normalizedWidth = useMemo<string>(() => normalizeWidth(maxWidth), [maxWidth]);

  const truncateStyle = useMemo<CSSProperties>(() => {
    if (state.isExpanded) {
      return { maxWidth: normalizedWidth };
    }
    return createLineClampStyles(state.currentLineClamp, normalizedWidth);
  }, [state.isExpanded, state.currentLineClamp, normalizedWidth]);

  const handleToggleExpansion = useCallback(() => {
    setState(prev => {
      const newExpanded = !prev.isExpanded;
      if (onExpansionChange) {
        onExpansionChange(newExpanded);
      }
      return { ...prev, isExpanded: newExpanded };
    });
  }, [onExpansionChange]);

  const handleAdjustLineClamp = useCallback((delta: number) => {
    setState(prev => {
      const newClamp = Math.max(mergedConfig.min, Math.min(mergedConfig.max, prev.currentLineClamp + delta));
      return { ...prev, currentLineClamp: newClamp };
    });
  }, [mergedConfig]);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Multi-line Truncation</Text>
      <div style={truncateStyle}>
        <Text variant="bodyMd">{text}</Text>
      </div>
      {showControls && (
        <InlineStack gap="200">
          <Button size="slim" onClick={handleToggleExpansion}>
            {state.isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          <Button size="slim" onClick={() => handleAdjustLineClamp(-1)} disabled={state.currentLineClamp <= mergedConfig.min}>
            - Line
          </Button>
          <Button size="slim" onClick={() => handleAdjustLineClamp(1)} disabled={state.currentLineClamp >= mergedConfig.max}>
            + Line
          </Button>
          <Text variant="bodySm" tone="subdued">
            Lines: {state.currentLineClamp}
          </Text>
        </InlineStack>
      )}
    </BlockStack>
  );
};

export default MultiLineTruncation;`"""

print("Regex approach is too complex for this file. Using simple string replacement approach...")
print("File too large to patch efficiently with Python")
print("Please use manual Edit tool instead")
