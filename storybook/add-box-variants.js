const fs = require('fs');
const path = require('path');

const codeVariantsPath = '.storybook/blocks/codeVariants.ts';
const content = fs.readFileSync(codeVariantsPath, 'utf8');

// Find the position right before the closing }; of boxExamples
const boxStart = content.indexOf('export const boxExamples');
const boxEnd = content.indexOf('};', boxStart);

// Find the last variant (should be 'default')
const defaultEnd = content.lastIndexOf('}', boxEnd - 1);

// New variants to add (we'll add them after the default variant, before the final };)
const newVariants = `
,

  paddingExamples: {
    react: \`import { Box, Text } from '@shopify/polaris';
import React from 'react';

function PaddingExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="none" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">No padding</Text>
      </Box>

      <Box padding="extraTight" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Extra tight padding</Text>
      </Box>

      <Box padding="tight" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Tight padding</Text>
      </Box>

      <Box padding="base" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Base padding (default)</Text>
      </Box>

      <Box padding="loose" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Loose padding</Text>
      </Box>

      <Box padding="extraLoose" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Extra loose padding</Text>
      </Box>
    </div>
  );
}

export default PaddingExamples;\`,

    vanilla: \`<!-- Padding Examples using @cin7/vanilla-js -->
<div id="padding-container"></div>

<script>
import { createElement } from '@cin7/vanilla-js';
import { spacing } from '@cin7/design-tokens';

const paddingLevels = [
  { level: 'none', label: 'No padding', value: spacing.none },
  { level: 'extraTight', label: 'Extra tight padding', value: spacing.extraTight },
  { level: 'tight', label: 'Tight padding', value: spacing.tight },
  { level: 'base', label: 'Base padding (default)', value: spacing.base },
  { level: 'loose', label: 'Loose padding', value: spacing.loose },
  { level: 'extraLoose', label: 'Extra loose padding', value: spacing.extraLoose }
];

const container = createElement('div', {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '600px'
  }
});

paddingLevels.forEach(({ label, value }) => {
  const box = createElement('div', {
    className: 'polaris-box',
    style: {
      padding: value,
      backgroundColor: 'var(--p-surface-subdued)',
      border: '1px solid var(--p-border)',
      fontSize: '14px'
    },
    textContent: label
  });
  container.appendChild(box);
});

document.getElementById('padding-container').appendChild(container);
</script>\`,

    extjs: \`// ExtJS Padding Examples using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 24 0',
    maxWidth: 600
  },
  items: [
    {
      xtype: 'component',
      padding: 0,
      style: {
        backgroundColor: '#f6f6f7',
        border: '1px solid #c4cdd5'
      },
      html: '<span style="font-size: 14px;">No padding</span>'
    },
    {
      xtype: 'component',
      padding: '4px',
      style: {
        backgroundColor: '#f6f6f7',
        border: '1px solid #c4cdd5'
      },
      html: '<span style="font-size: 14px;">Extra tight padding</span>'
    },
    {
      xtype: 'component',
      padding: '8px',
      style: {
        backgroundColor: '#f6f6f7',
        border: '1px solid #c4cdd5'
      },
      html: '<span style="font-size: 14px;">Tight padding</span>'
    },
    {
      xtype: 'component',
      padding: '16px',
      style: {
        backgroundColor: '#f6f6f7',
        border: '1px solid #c4cdd5'
      },
      html: '<span style="font-size: 14px;">Base padding (default)</span>'
    },
    {
      xtype: 'component',
      padding: '20px',
      style: {
        backgroundColor: '#f6f6f7',
        border: '1px solid #c4cdd5'
      },
      html: '<span style="font-size: 14px;">Loose padding</span>'
    },
    {
      xtype: 'component',
      padding: '32px',
      style: {
        backgroundColor: '#f6f6f7',
        border: '1px solid #c4cdd5'
      },
      html: '<span style="font-size: 14px;">Extra loose padding</span>'
    }
  ]
});\`,

    typescript: \`import { Box, Text, BoxProps } from '@shopify/polaris';
import React from 'react';

type PaddingLevel = BoxProps['padding'];

interface PaddingExample {
  level: PaddingLevel;
  label: string;
}

function PaddingExamples(): JSX.Element {
  const paddingLevels: PaddingExample[] = [
    { level: 'none', label: 'No padding' },
    { level: 'extraTight', label: 'Extra tight padding' },
    { level: 'tight', label: 'Tight padding' },
    { level: 'base', label: 'Base padding (default)' },
    { level: 'loose', label: 'Loose padding' },
    { level: 'extraLoose', label: 'Extra loose padding' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {paddingLevels.map(({ level, label }) => (
        <Box
          key={level}
          padding={level}
          background="surface subdued"
          border="base"
        >
          <Text as="p" variant="bodySm">{label}</Text>
        </Box>
      ))}
    </div>
  );
}

export default PaddingExamples;\`
  }`;

// Insert the new variants
const before = content.substring(0, defaultEnd + 1);
const after = content.substring(defaultEnd + 1);

const newContent = before + newVariants + after;

// Write the file
fs.writeFileSync(codeVariantsPath, newContent, 'utf8');

console.log('Successfully added paddingExamples variant to boxExamples');
console.log('Original file size:', content.length);
console.log('New file size:', newContent.length);
console.log('Added:', newContent.length - content.length, 'characters');
