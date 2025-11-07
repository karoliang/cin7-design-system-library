// This file contains all Box component code variants to be added to codeVariants.ts
// These should be added to the boxExamples object

  paddingExamples: {
    react: `import { Box, Text } from '@shopify/polaris';
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

export default PaddingExamples;`,

    vanilla: `<!-- Padding Examples using @cin7/vanilla-js -->
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
</script>`,

    extjs: `// ExtJS Padding Examples using @cin7/extjs-adapters
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
});`,

    typescript: `import { Box, Text, BoxProps } from '@shopify/polaris';
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

export default PaddingExamples;`
  },

  directionalPadding: {
    react: `import { Box, Text } from '@shopify/polaris';
import React from 'react';

function DirectionalPadding() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box paddingInline="400" background="surface" border="base">
        <Text as="p" variant="bodySm">Horizontal padding only (paddingInline)</Text>
      </Box>

      <Box paddingBlock="400" background="surface" border="base">
        <Text as="p" variant="bodySm">Vertical padding only (paddingBlock)</Text>
      </Box>

      <Box paddingStart="800" background="surface" border="base">
        <Text as="p" variant="bodySm">Left padding only (paddingStart)</Text>
      </Box>

      <Box paddingEnd="800" background="surface" border="base">
        <Text as="p" variant="bodySm">Right padding only (paddingEnd)</Text>
      </Box>

      <Box paddingBlock="400" paddingInline="800" background="surface" border="base">
        <Text as="p" variant="bodySm">Different vertical and horizontal padding</Text>
      </Box>
    </div>
  );
}

export default DirectionalPadding;`,

    vanilla: `<!-- Directional Padding using @cin7/vanilla-js -->
<div id="directional-padding-container"></div>

<script>
import { createElement } from '@cin7/vanilla-js';

const examples = [
  {
    style: { paddingLeft: '16px', paddingRight: '16px' },
    text: 'Horizontal padding only (paddingInline)'
  },
  {
    style: { paddingTop: '16px', paddingBottom: '16px' },
    text: 'Vertical padding only (paddingBlock)'
  },
  {
    style: { paddingLeft: '32px' },
    text: 'Left padding only (paddingStart)'
  },
  {
    style: { paddingRight: '32px' },
    text: 'Right padding only (paddingEnd)'
  },
  {
    style: { paddingTop: '16px', paddingBottom: '16px', paddingLeft: '32px', paddingRight: '32px' },
    text: 'Different vertical and horizontal padding'
  }
];

const container = createElement('div', {
  style: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '600px'
  }
});

examples.forEach(({ style, text }) => {
  const box = createElement('div', {
    className: 'polaris-box',
    style: {
      ...style,
      backgroundColor: 'var(--p-surface)',
      border: '1px solid var(--p-border)',
      fontSize: '14px'
    },
    textContent: text
  });
  container.appendChild(box);
});

document.getElementById('directional-padding-container').appendChild(container);
</script>`,

    extjs: `// ExtJS Directional Padding using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 0 24 0',
    maxWidth: 600,
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid #c4cdd5'
    }
  },
  items: [
    {
      xtype: 'component',
      padding: '0 16px',
      html: '<span style="font-size: 14px;">Horizontal padding only (paddingInline)</span>'
    },
    {
      xtype: 'component',
      padding: '16px 0',
      html: '<span style="font-size: 14px;">Vertical padding only (paddingBlock)</span>'
    },
    {
      xtype: 'component',
      padding: '0 0 0 32px',
      html: '<span style="font-size: 14px;">Left padding only (paddingStart)</span>'
    },
    {
      xtype: 'component',
      padding: '0 32px 0 0',
      html: '<span style="font-size: 14px;">Right padding only (paddingEnd)</span>'
    },
    {
      xtype: 'component',
      padding: '16px 32px',
      html: '<span style="font-size: 14px;">Different vertical and horizontal padding</span>'
    }
  ]
});`,

    typescript: `import { Box, Text, BoxProps } from '@shopify/polaris';
import React from 'react';

interface DirectionalPaddingExample {
  paddingInline?: BoxProps['paddingInline'];
  paddingBlock?: BoxProps['paddingBlock'];
  paddingStart?: BoxProps['paddingStart'];
  paddingEnd?: BoxProps['paddingEnd'];
  label: string;
}

function DirectionalPadding(): JSX.Element {
  const examples: DirectionalPaddingExample[] = [
    {
      paddingInline: '400',
      label: 'Horizontal padding only (paddingInline)'
    },
    {
      paddingBlock: '400',
      label: 'Vertical padding only (paddingBlock)'
    },
    {
      paddingStart: '800',
      label: 'Left padding only (paddingStart)'
    },
    {
      paddingEnd: '800',
      label: 'Right padding only (paddingEnd)'
    },
    {
      paddingBlock: '400',
      paddingInline: '800',
      label: 'Different vertical and horizontal padding'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {examples.map((example, index) => (
        <Box
          key={index}
          paddingInline={example.paddingInline}
          paddingBlock={example.paddingBlock}
          paddingStart={example.paddingStart}
          paddingEnd={example.paddingEnd}
          background="surface"
          border="base"
        >
          <Text as="p" variant="bodySm">{example.label}</Text>
        </Box>
      ))}
    </div>
  );
}

export default DirectionalPadding;`
  }
