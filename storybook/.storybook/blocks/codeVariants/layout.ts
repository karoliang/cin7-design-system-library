import type { CodeVariant } from './types';

export const dividerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Divider, Card, Text } from '@shopify/polaris';

function DividerExample() {
  return (
    <Card>
      <Text as="h3" variant="headingMd">Section One</Text>
      <Text as="p">This is the first section.</Text>

      <Divider />

      <Text as="h3" variant="headingMd">Section Two</Text>
      <Text as="p">This is the second section.</Text>
    </Card>
  );
}

export default DividerExample;`,

    vanilla: `<!-- Divider Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md">Section One</h3>
    <p>This is the first section.</p>
  </div>

  <hr class="polaris-divider" />

  <div class="polaris-card__section">
    <h3 class="polaris-heading-md">Section Two</h3>
    <p>This is the second section.</p>
  </div>
</div>

<style>
.polaris-divider {
  border: none;
  border-top: 1px solid var(--p-color-border);
  margin: 0;
}
</style>`,

    extjs: `// ExtJS Divider using standard components
Ext.create('Ext.panel.Panel', {
  title: 'Content Sections',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<h3>Section One</h3><p>This is the first section.</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<hr class="polaris-divider" />',
      cls: 'polaris-divider-wrapper'
    },
    {
      xtype: 'component',
      html: '<h3>Section Two</h3><p>This is the second section.</p>',
      margin: '16 0 0 0'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Divider, Card, Text } from '@shopify/polaris';

interface DividerExampleProps {
  borderColor?: 'border' | 'border-inverse' | 'border-critical' | 'border-warning' | 'border-highlight' | 'border-success';
  borderWidth?: 'none' | 'base' | 'thick';
}

function DividerExample({
  borderColor = 'border',
  borderWidth = 'base'
}: DividerExampleProps): JSX.Element {
  return (
    <Card>
      <Text as="h3" variant="headingMd">Section One</Text>
      <Text as="p">This is the first section.</Text>

      <Divider borderColor={borderColor} borderWidth={borderWidth} />

      <Text as="h3" variant="headingMd">Section Two</Text>
      <Text as="p">This is the second section.</Text>
    </Card>
  );
}

export default DividerExample;`,
  }
};

// DropZone Component Examples

export const alphastackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { AlphaStack, Text, Button } from '@shopify/polaris';
import React from 'react';

function AlphaStackDefault() {
  return (
    <AlphaStack spacing="loose">
      <Text as="h3" variant="headingMd">AlphaStack Example</Text>
      <Text as="p" variant="bodyMd">This is the default vertical AlphaStack with loose spacing.</Text>
      <Button variant="primary">Primary Action</Button>
      <Button variant="secondary">Secondary Action</Button>
    </AlphaStack>
  );
}

export default AlphaStackDefault;`,

    vanilla: `<!-- AlphaStack using @cin7/vanilla-js -->
<div id="alphastack-container"></div>

<script>
import { createAlphaStack } from '@cin7/vanilla-js';

const alphaStack = createAlphaStack({
  spacing: 'loose',
  direction: 'vertical',
  items: [
    { type: 'heading', text: 'AlphaStack Example', level: 3 },
    { type: 'text', text: 'This is the default vertical AlphaStack with loose spacing.' },
    { type: 'button', text: 'Primary Action', variant: 'primary' },
    { type: 'button', text: 'Secondary Action', variant: 'secondary' }
  ]
});

document.getElementById('alphastack-container').appendChild(alphaStack);
</script>`,

    extjs: `// ExtJS AlphaStack using @cin7/extjs-adapters
import { PolarisAlphaStack } from '@cin7/extjs-adapters';

Ext.create('PolarisAlphaStack', {
  renderTo: Ext.getBody(),
  spacing: 'loose',
  direction: 'vertical',
  items: [
    {
      xtype: 'component',
      html: '<h3>AlphaStack Example</h3>'
    },
    {
      xtype: 'component',
      html: '<p>This is the default vertical AlphaStack with loose spacing.</p>'
    },
    {
      xtype: 'button',
      text: 'Primary Action',
      ui: 'primary',
      handler: function() {
        console.log('Primary action clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Secondary Action',
      ui: 'secondary',
      handler: function() {
        console.log('Secondary action clicked');
      }
    }
  ]
});`,

    typescript: `import { AlphaStack, Text, Button, AlphaStackProps } from '@shopify/polaris';
import React from 'react';

interface AlphaStackDefaultProps {
  spacing?: AlphaStackProps['spacing'];
  direction?: AlphaStackProps['direction'];
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

function AlphaStackDefault({
  spacing = 'loose',
  direction = 'vertical',
  onPrimaryAction,
  onSecondaryAction
}: AlphaStackDefaultProps): JSX.Element {
  return (
    <AlphaStack spacing={spacing} direction={direction}>
      <Text as="h3" variant="headingMd">AlphaStack Example</Text>
      <Text as="p" variant="bodyMd">
        This is the default vertical AlphaStack with loose spacing.
      </Text>
      <Button
        variant="primary"
        onClick={onPrimaryAction || (() => console.log('Primary action'))}
      >
        Primary Action
      </Button>
      <Button
        variant="secondary"
        onClick={onSecondaryAction || (() => console.log('Secondary action'))}
      >
        Secondary Action
      </Button>
    </AlphaStack>
  );
}

export default AlphaStackDefault;`
  },

  vertical: {
    react: `import { AlphaStack, Card, Text } from '@shopify/polaris';
import React from 'react';

function VerticalAlphaStack() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Vertical AlphaStack
      </Text>

      <AlphaStack spacing="base" direction="vertical">
        <Text as="h4" variant="headingSm">Section 1</Text>
        <Text as="p" variant="bodySm">
          Content for the first section with base spacing.
        </Text>

        <Text as="h4" variant="headingSm">Section 2</Text>
        <Text as="p" variant="bodySm">
          Content for the second section with the same spacing.
        </Text>

        <Text as="h4" variant="headingSm">Section 3</Text>
        <Text as="p" variant="bodySm">
          Content for the third section maintaining consistent spacing.
        </Text>
      </AlphaStack>
    </Card>
  );
}

export default VerticalAlphaStack;`,

    vanilla: `<!-- Vertical AlphaStack -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md" style="margin-bottom: 16px">Vertical AlphaStack</h3>

    <div id="vertical-stack"></div>
  </div>
</div>

<script>
import { createStack } from '@cin7/vanilla-js';

const sections = [
  { title: 'Section 1', content: 'Content for the first section with base spacing.' },
  { title: 'Section 2', content: 'Content for the second section with the same spacing.' },
  { title: 'Section 3', content: 'Content for the third section maintaining consistent spacing.' }
];

const verticalStack = createStack({
  direction: 'column',
  gap: '16px',
  children: sections.map(section =>
    \`<div>
      <h4 class="polaris-heading-sm">\${section.title}</h4>
      <p class="polaris-text-sm">\${section.content}</p>
    </div>\`
  )
});

document.getElementById('vertical-stack').appendChild(verticalStack);
</script>`,

    extjs: `// Vertical stack with ExtJS vbox layout
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Vertical AlphaStack',
  bodyPadding: 16,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  defaults: {
    xtype: 'container',
    margin: '0 0 16 0'
  },
  items: [
    {
      html: \`
        <h4>Section 1</h4>
        <p>Content for the first section with base spacing.</p>
      \`
    },
    {
      html: \`
        <h4>Section 2</h4>
        <p>Content for the second section with the same spacing.</p>
      \`
    },
    {
      html: \`
        <h4>Section 3</h4>
        <p>Content for the third section maintaining consistent spacing.</p>
      \`
    }
  ]
});`,

    typescript: `import { AlphaStack, Card, Text } from '@shopify/polaris';
import React from 'react';

interface Section {
  title: string;
  content: string;
}

interface VerticalAlphaStackProps {
  title?: string;
  sections?: Section[];
  spacing?: 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
}

function VerticalAlphaStack({
  title = 'Vertical AlphaStack',
  sections = [
    { title: 'Section 1', content: 'Content for the first section with base spacing.' },
    { title: 'Section 2', content: 'Content for the second section with the same spacing.' },
    { title: 'Section 3', content: 'Content for the third section maintaining consistent spacing.' }
  ],
  spacing = 'base'
}: VerticalAlphaStackProps): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        {title}
      </Text>

      <AlphaStack spacing={spacing} direction="vertical">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <Text as="h4" variant="headingSm">{section.title}</Text>
            <Text as="p" variant="bodySm">{section.content}</Text>
          </React.Fragment>
        ))}
      </AlphaStack>
    </Card>
  );
}

export default VerticalAlphaStack;`
  },

  horizontal: {
    react: `import { AlphaStack, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

function HorizontalAlphaStack() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Horizontal AlphaStack
      </Text>

      <AlphaStack spacing="loose" direction="horizontal">
        <Button variant="primary">Save</Button>
        <Button>Save Draft</Button>
        <Button variant="plain">Preview</Button>
        <Button variant="plain">Cancel</Button>
      </AlphaStack>
    </Card>
  );
}

export default HorizontalAlphaStack;`,

    vanilla: `<!-- Horizontal AlphaStack -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md" style="margin-bottom: 16px">Horizontal AlphaStack</h3>

    <div id="horizontal-stack"></div>
  </div>
</div>

<script>
import { createStack } from '@cin7/vanilla-js';

const horizontalStack = createStack({
  direction: 'row',
  gap: '20px',
  children: [
    '<button class="polaris-button polaris-button--primary">Save</button>',
    '<button class="polaris-button">Save Draft</button>',
    '<button class="polaris-button polaris-button--plain">Preview</button>',
    '<button class="polaris-button polaris-button--plain">Cancel</button>'
  ]
});

document.getElementById('horizontal-stack').appendChild(horizontalStack);
</script>`,

    extjs: `// Horizontal stack with ExtJS hbox layout
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Horizontal AlphaStack',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  defaults: {
    xtype: 'button',
    margin: '0 20 0 0'
  },
  items: [
    {
      text: 'Save',
      ui: 'primary',
      handler: function() { console.log('Save'); }
    },
    {
      text: 'Save Draft',
      handler: function() { console.log('Save Draft'); }
    },
    {
      text: 'Preview',
      ui: 'plain',
      handler: function() { console.log('Preview'); }
    },
    {
      text: 'Cancel',
      ui: 'plain',
      margin: 0,
      handler: function() { console.log('Cancel'); }
    }
  ]
});`,

    typescript: `import { AlphaStack, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

interface ButtonAction {
  label: string;
  variant?: 'primary' | 'plain';
  onAction: () => void;
}

interface HorizontalAlphaStackProps {
  title?: string;
  actions?: ButtonAction[];
  spacing?: 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';
}

function HorizontalAlphaStack({
  title = 'Horizontal AlphaStack',
  actions = [
    { label: 'Save', variant: 'primary', onAction: () => console.log('Save') },
    { label: 'Save Draft', onAction: () => console.log('Save Draft') },
    { label: 'Preview', variant: 'plain', onAction: () => console.log('Preview') },
    { label: 'Cancel', variant: 'plain', onAction: () => console.log('Cancel') }
  ],
  spacing = 'loose'
}: HorizontalAlphaStackProps): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        {title}
      </Text>

      <AlphaStack spacing={spacing} direction="horizontal">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onAction}
          >
            {action.label}
          </Button>
        ))}
      </AlphaStack>
    </Card>
  );
}

export default HorizontalAlphaStack;`
  },

  spacing: {
    react: `import { AlphaStack, Card, Text, Badge } from '@shopify/polaris';
import React from 'react';

function SpacingVariations() {
  const spacings: Array<'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose'> = [
    'extraTight', 'tight', 'base', 'loose', 'extraLoose'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {spacings.map((spacing) => (
        <Card key={spacing} sectioned>
          <Text as="h3" variant="headingSm">
            {spacing.charAt(0).toUpperCase() + spacing.slice(1).replace(/([A-Z])/g, ' $1')} Spacing
          </Text>
          <AlphaStack spacing={spacing} direction="horizontal">
            <Badge status="success">Active</Badge>
            <Badge status="info">Pending</Badge>
            <Badge status="attention">Warning</Badge>
          </AlphaStack>
        </Card>
      ))}
    </div>
  );
}

export default SpacingVariations;`,

    vanilla: `<!-- Spacing Variations -->
<div id="spacing-variations" style="display: flex; flex-direction: column; gap: 24px; max-width: 600px"></div>

<script>
import { createStack } from '@cin7/vanilla-js';

const spacings = [
  { name: 'Extra Tight', gap: '4px' },
  { name: 'Tight', gap: '8px' },
  { name: 'Base', gap: '16px' },
  { name: 'Loose', gap: '20px' },
  { name: 'Extra Loose', gap: '24px' }
];

const container = document.getElementById('spacing-variations');

spacings.forEach(({ name, gap }) => {
  const card = document.createElement('div');
  card.className = 'polaris-card';
  card.innerHTML = \`
    <div class="polaris-card__section">
      <h3 class="polaris-heading-sm">\${name} Spacing</h3>
      <div style="display: flex; gap: \${gap}; margin-top: 12px">
        <span class="polaris-badge polaris-badge--success">Active</span>
        <span class="polaris-badge polaris-badge--info">Pending</span>
        <span class="polaris-badge polaris-badge--attention">Warning</span>
      </div>
    </div>
  \`;

  container.appendChild(card);
});
</script>`,

    extjs: `// Spacing variations with different gap configurations
const spacings = [
  { name: 'Extra Tight Spacing', gap: 4 },
  { name: 'Tight Spacing', gap: 8 },
  { name: 'Base Spacing', gap: 16 },
  { name: 'Loose Spacing', gap: 20 },
  { name: 'Extra Loose Spacing', gap: 24 }
];

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
  items: spacings.map(function(spacing) {
    return {
      xtype: 'panel',
      title: spacing.name,
      bodyPadding: 16,
      layout: {
        type: 'hbox'
      },
      defaults: {
        margin: \`0 \${spacing.gap} 0 0\`
      },
      items: [
        { xtype: 'component', html: '<span class="badge-success">Active</span>' },
        { xtype: 'component', html: '<span class="badge-info">Pending</span>' },
        { xtype: 'component', html: '<span class="badge-attention">Warning</span>', margin: 0 }
      ]
    };
  })
});`,

    typescript: `import { AlphaStack, Card, Text, Badge, BadgeProps } from '@shopify/polaris';
import React from 'react';

type SpacingOption = 'extraTight' | 'tight' | 'base' | 'loose' | 'extraLoose';

interface SpacingExample {
  spacing: SpacingOption;
  label: string;
}

interface BadgeConfig {
  status: BadgeProps['status'];
  label: string;
}

function SpacingVariations(): JSX.Element {
  const spacings: SpacingExample[] = [
    { spacing: 'extraTight', label: 'Extra Tight Spacing' },
    { spacing: 'tight', label: 'Tight Spacing' },
    { spacing: 'base', label: 'Base Spacing' },
    { spacing: 'loose', label: 'Loose Spacing' },
    { spacing: 'extraLoose', label: 'Extra Loose Spacing' }
  ];

  const badges: BadgeConfig[] = [
    { status: 'success', label: 'Active' },
    { status: 'info', label: 'Pending' },
    { status: 'attention', label: 'Warning' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {spacings.map(({ spacing, label }) => (
        <Card key={spacing} sectioned>
          <Text as="h3" variant="headingSm">{label}</Text>
          <AlphaStack spacing={spacing} direction="horizontal">
            {badges.map((badge, index) => (
              <Badge key={index} status={badge.status}>{badge.label}</Badge>
            ))}
          </AlphaStack>
        </Card>
      ))}
    </div>
  );
}

export default SpacingVariations;`
  },

  distribution: {
    react: `import { AlphaStack, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

function DistributionOptions() {
  const distributions: Array<'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly' | 'equalSpacing'> = [
    'leading', 'trailing', 'center', 'fill', 'equalSpacing', 'fillEvenly'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {distributions.map((distribution) => (
        <Card key={distribution} sectioned>
          <Text as="h3" variant="headingSm">
            {distribution.charAt(0).toUpperCase() + distribution.slice(1).replace(/([A-Z])/g, ' $1')} Distribution
          </Text>
          <AlphaStack distribution={distribution} direction="horizontal">
            <Button size="small">Left</Button>
            <Button size="small">Center</Button>
            <Button size="small">Right</Button>
          </AlphaStack>
        </Card>
      ))}
    </div>
  );
}

export default DistributionOptions;`,

    vanilla: `<!-- Distribution Options -->
<div id="distribution-options" style="display: flex; flex-direction: column; gap: 24px; max-width: 600px"></div>

<script>
import { createStack } from '@cin7/vanilla-js';

const distributions = [
  { name: 'Leading', justify: 'flex-start' },
  { name: 'Trailing', justify: 'flex-end' },
  { name: 'Center', justify: 'center' },
  { name: 'Fill', justify: 'stretch' },
  { name: 'Equal Spacing', justify: 'space-between' },
  { name: 'Fill Evenly', justify: 'space-evenly' }
];

const container = document.getElementById('distribution-options');

distributions.forEach(({ name, justify }) => {
  const card = document.createElement('div');
  card.className = 'polaris-card';
  card.innerHTML = \`
    <div class="polaris-card__section">
      <h3 class="polaris-heading-sm">\${name} Distribution</h3>
      <div style="display: flex; gap: 12px; justify-content: \${justify}; margin-top: 12px">
        <button class="polaris-button polaris-button--small">Left</button>
        <button class="polaris-button polaris-button--small">Center</button>
        <button class="polaris-button polaris-button--small">Right</button>
      </div>
    </div>
  \`;

  container.appendChild(card);
});
</script>`,

    extjs: `// Distribution options with different pack configurations
const distributions = [
  { name: 'Leading Distribution', pack: 'start' },
  { name: 'Trailing Distribution', pack: 'end' },
  { name: 'Center Distribution', pack: 'center' },
  { name: 'Fill Distribution', pack: 'start' },
  { name: 'Equal Spacing Distribution', pack: 'justify' },
  { name: 'Fill Evenly Distribution', pack: 'center' }
];

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
  items: distributions.map(function(dist) {
    return {
      xtype: 'panel',
      title: dist.name,
      bodyPadding: 16,
      layout: {
        type: 'hbox',
        pack: dist.pack
      },
      defaults: {
        xtype: 'button',
        scale: 'small',
        margin: '0 12 0 0'
      },
      items: [
        { text: 'Left' },
        { text: 'Center' },
        { text: 'Right', margin: 0 }
      ]
    };
  })
});`,

    typescript: `import { AlphaStack, Card, Text, Button, AlphaStackProps } from '@shopify/polaris';
import React from 'react';

type DistributionOption = 'leading' | 'trailing' | 'center' | 'fill' | 'fillEvenly' | 'equalSpacing';

interface DistributionExample {
  distribution: DistributionOption;
  label: string;
}

function DistributionOptions(): JSX.Element {
  const distributions: DistributionExample[] = [
    { distribution: 'leading', label: 'Leading Distribution' },
    { distribution: 'trailing', label: 'Trailing Distribution' },
    { distribution: 'center', label: 'Center Distribution' },
    { distribution: 'fill', label: 'Fill Distribution' },
    { distribution: 'equalSpacing', label: 'Equal Spacing Distribution' },
    { distribution: 'fillEvenly', label: 'Fill Evenly Distribution' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {distributions.map(({ distribution, label }) => (
        <Card key={distribution} sectioned>
          <Text as="h3" variant="headingSm">{label}</Text>
          <AlphaStack distribution={distribution} direction="horizontal">
            <Button size="small">Left</Button>
            <Button size="small">Center</Button>
            <Button size="small">Right</Button>
          </AlphaStack>
        </Card>
      ))}
    </div>
  );
}

export default DistributionOptions;`
  },

  alignment: {
    react: `import { AlphaStack, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

function AlignmentOptions() {
  const alignments: Array<'leading' | 'trailing' | 'center' | 'fill' | 'baseline'> = [
    'leading', 'trailing', 'center', 'fill', 'baseline'
  ];

  const getAlignItems = (alignment: string) => {
    switch (alignment) {
      case 'leading': return 'flex-start';
      case 'trailing': return 'flex-end';
      case 'center': return 'center';
      case 'fill': return 'stretch';
      case 'baseline': return 'baseline';
      default: return 'flex-start';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {alignments.map((alignment) => (
        <Card key={alignment} sectioned>
          <Text as="h3" variant="headingSm">
            {alignment.charAt(0).toUpperCase() + alignment.slice(1)} Alignment
          </Text>
          <div style={{
            height: '80px',
            backgroundColor: '#f4f6f8',
            borderRadius: '4px',
            padding: '8px',
            display: 'flex',
            alignItems: getAlignItems(alignment)
          }}>
            <AlphaStack alignment={alignment} direction="horizontal">
              <Button size="small">Small</Button>
              <Button>Medium</Button>
              <Button size="large">Large</Button>
            </AlphaStack>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default AlignmentOptions;`,

    vanilla: `<!-- Alignment Options -->
<div id="alignment-options" style="display: flex; flex-direction: column; gap: 24px; max-width: 600px"></div>

<script>
import { createStack } from '@cin7/vanilla-js';

const alignments = [
  { name: 'Leading', align: 'flex-start' },
  { name: 'Trailing', align: 'flex-end' },
  { name: 'Center', align: 'center' },
  { name: 'Fill', align: 'stretch' },
  { name: 'Baseline', align: 'baseline' }
];

const container = document.getElementById('alignment-options');

alignments.forEach(({ name, align }) => {
  const card = document.createElement('div');
  card.className = 'polaris-card';
  card.innerHTML = \`
    <div class="polaris-card__section">
      <h3 class="polaris-heading-sm">\${name} Alignment</h3>
      <div style="height: 80px; background: #f4f6f8; border-radius: 4px; padding: 8px; display: flex; align-items: \${align}; margin-top: 12px">
        <div style="display: flex; gap: 12px">
          <button class="polaris-button polaris-button--small">Small</button>
          <button class="polaris-button">Medium</button>
          <button class="polaris-button polaris-button--large">Large</button>
        </div>
      </div>
    </div>
  \`;

  container.appendChild(card);
});
</script>`,

    extjs: `// Alignment options with different align configurations
const alignments = [
  { name: 'Leading Alignment', align: 'top' },
  { name: 'Trailing Alignment', align: 'bottom' },
  { name: 'Center Alignment', align: 'middle' },
  { name: 'Fill Alignment', align: 'stretch' },
  { name: 'Baseline Alignment', align: 'baseline' }
];

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
  items: alignments.map(function(alignment) {
    return {
      xtype: 'panel',
      title: alignment.name,
      bodyPadding: 16,
      height: 120,
      layout: {
        type: 'hbox',
        align: alignment.align
      },
      style: {
        backgroundColor: '#f4f6f8'
      },
      defaults: {
        xtype: 'button',
        margin: '0 12 0 0'
      },
      items: [
        { text: 'Small', scale: 'small' },
        { text: 'Medium', scale: 'medium' },
        { text: 'Large', scale: 'large', margin: 0 }
      ]
    };
  })
});`,

    typescript: `import { AlphaStack, Card, Text, Button, AlphaStackProps } from '@shopify/polaris';
import React from 'react';

type AlignmentOption = 'leading' | 'trailing' | 'center' | 'fill' | 'baseline';

interface AlignmentExample {
  alignment: AlignmentOption;
  label: string;
  cssAlign: string;
}

function AlignmentOptions(): JSX.Element {
  const alignments: AlignmentExample[] = [
    { alignment: 'leading', label: 'Leading Alignment', cssAlign: 'flex-start' },
    { alignment: 'trailing', label: 'Trailing Alignment', cssAlign: 'flex-end' },
    { alignment: 'center', label: 'Center Alignment', cssAlign: 'center' },
    { alignment: 'fill', label: 'Fill Alignment', cssAlign: 'stretch' },
    { alignment: 'baseline', label: 'Baseline Alignment', cssAlign: 'baseline' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      {alignments.map(({ alignment, label, cssAlign }) => (
        <Card key={alignment} sectioned>
          <Text as="h3" variant="headingSm">{label}</Text>
          <div style={{
            height: '80px',
            backgroundColor: '#f4f6f8',
            borderRadius: '4px',
            padding: '8px',
            display: 'flex',
            alignItems: cssAlign
          }}>
            <AlphaStack alignment={alignment} direction="horizontal">
              <Button size="small">Small</Button>
              <Button>Medium</Button>
              <Button size="large">Large</Button>
            </AlphaStack>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default AlignmentOptions;`
  }
};

// Bleed Component Examples

export const bleedExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Bleed, Card, Text } from '@shopify/polaris';
import React from 'react';

function BleedDefault() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Card with Bleed
      </Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Below is a div that bleeds to remove the card's padding on all sides:
      </Text>
      <Bleed margin="400">
        <div style={{
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        }}>
          <Text as="p" variant="bodyMd">This content bleeds to the edges</Text>
        </div>
      </Bleed>
    </Card>
  );
}

export default BleedDefault;`,

    vanilla: `<!-- Bleed using @cin7/vanilla-js -->
<div id="bleed-container"></div>

<script>
import { createBleed } from '@cin7/vanilla-js';

// Create card container
const card = document.createElement('div');
card.className = 'polaris-card';
card.style.padding = '16px';

// Add heading
const heading = document.createElement('h3');
heading.textContent = 'Card with Bleed';
heading.style.marginBottom = '16px';
card.appendChild(heading);

// Add description
const description = document.createElement('p');
description.textContent = "Below is a div that bleeds to remove the card's padding on all sides:";
description.style.marginBottom = '16px';
card.appendChild(description);

// Create bleed component
const bleed = createBleed({
  margin: '400',
  content: {
    backgroundColor: '#f4f6f8',
    padding: '16px',
    textAlign: 'center',
    text: 'This content bleeds to the edges'
  }
});

card.appendChild(bleed);
document.getElementById('bleed-container').appendChild(card);
</script>`,

    extjs: `// ExtJS Bleed using @cin7/extjs-adapters
import { PolarisBleed } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 16,
  cls: 'polaris-card',
  items: [
    {
      xtype: 'component',
      html: '<h3>Card with Bleed</h3>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<p>Below is a div that bleeds to remove the card\\'s padding on all sides:</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'PolarisBleed',
      margin: '400',
      items: [{
        xtype: 'box',
        style: {
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        },
        html: '<p>This content bleeds to the edges</p>'
      }]
    }
  ]
});`,

    typescript: `import { Bleed, Card, Text, BleedProps } from '@shopify/polaris';
import React from 'react';

interface BleedDefaultProps {
  margin?: BleedProps['margin'];
  content?: string;
}

function BleedDefault({
  margin = '400',
  content = 'This content bleeds to the edges'
}: BleedDefaultProps): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Card with Bleed
      </Text>
      <Text as="p" variant="bodySm" style={{ marginBottom: '16px' }}>
        Below is a div that bleeds to remove the card's padding on all sides:
      </Text>
      <Bleed margin={margin}>
        <div style={{
          backgroundColor: '#f4f6f8',
          padding: '16px',
          textAlign: 'center'
        }}>
          <Text as="p" variant="bodyMd">{content}</Text>
        </div>
      </Bleed>
    </Card>
  );
}

export default BleedDefault;`
  }
};

// Box Component Examples

export const boxExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Box, Text } from '@shopify/polaris';
import React from 'react';

function BoxDefault() {
  return (
    <Box padding="400" background="surface" border="base" borderRadius="base">
      <Text as="h3" variant="headingMd">Box Component</Text>
      <Text as="p" variant="bodyMd">
        This is a basic Box with padding, background, border, and border radius.
      </Text>
    </Box>
  );
}

export default BoxDefault;`,

    vanilla: `<!-- Box using @cin7/vanilla-js -->
<div id="box-container"></div>

<script>
import { createBox } from '@cin7/vanilla-js';

const box = createBox({
  padding: '400',
  background: 'surface',
  border: 'base',
  borderRadius: 'base',
  content: [
    {
      type: 'heading',
      text: 'Box Component',
      level: 3
    },
    {
      type: 'text',
      text: 'This is a basic Box with padding, background, border, and border radius.'
    }
  ]
});

document.getElementById('box-container').appendChild(box);
</script>`,

    extjs: `// ExtJS Box using @cin7/extjs-adapters
import { PolarisBox } from '@cin7/extjs-adapters';

Ext.create('PolarisBox', {
  renderTo: Ext.getBody(),
  padding: '400',
  background: 'surface',
  border: 'base',
  borderRadius: 'base',
  items: [
    {
      xtype: 'component',
      html: '<h3>Box Component</h3>'
    },
    {
      xtype: 'component',
      html: '<p>This is a basic Box with padding, background, border, and border radius.</p>'
    }
  ]
});`,

    typescript: `import { Box, Text, BoxProps } from '@shopify/polaris';
import React from 'react';

interface BoxDefaultProps {
  padding?: BoxProps['padding'];
  background?: BoxProps['background'];
  border?: BoxProps['border'];
  borderRadius?: BoxProps['borderRadius'];
  children?: React.ReactNode;
}

function BoxDefault({
  padding = '400',
  background = 'surface',
  border = 'base',
  borderRadius = 'base',
  children
}: BoxDefaultProps): JSX.Element {
  return (
    <Box
      padding={padding}
      background={background}
      border={border}
      borderRadius={borderRadius}
    >
      {children || (
        <>
          <Text as="h3" variant="headingMd">Box Component</Text>
          <Text as="p" variant="bodyMd">
            This is a basic Box with padding, background, border, and border radius.
          </Text>
        </>
      )}
    </Box>
  );
}

export default BoxDefault;`
  }
};

// Grid Component Examples

export const gridExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Grid, Card, Text } from '@shopify/polaris';
import React from 'react';

function GridDefault() {
  return (
    <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gap="400">
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 1</Text>
        <Text as="p" variant="bodySm">First grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 2</Text>
        <Text as="p" variant="bodySm">Second grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 3</Text>
        <Text as="p" variant="bodySm">Third grid item</Text>
      </Card>
      <Card sectioned>
        <Text as="h3" variant="headingSm">Column 4</Text>
        <Text as="p" variant="bodySm">Fourth grid item</Text>
      </Card>
    </Grid>
  );
}

export default GridDefault;`,

    vanilla: `<!-- Grid using @cin7/vanilla-js -->
<div id="grid-container"></div>

<script>
import { createGrid } from '@cin7/vanilla-js';

const grid = createGrid({
  columns: { xs: 1, sm: 2, md: 3, lg: 4 },
  gap: '400',
  items: [
    {
      type: 'card',
      title: 'Column 1',
      content: 'First grid item'
    },
    {
      type: 'card',
      title: 'Column 2',
      content: 'Second grid item'
    },
    {
      type: 'card',
      title: 'Column 3',
      content: 'Third grid item'
    },
    {
      type: 'card',
      title: 'Column 4',
      content: 'Fourth grid item'
    }
  ]
});

document.getElementById('grid-container').appendChild(grid);
</script>`,

    extjs: `// ExtJS Grid using @cin7/extjs-adapters
import { PolarisGrid } from '@cin7/extjs-adapters';

Ext.create('PolarisGrid', {
  renderTo: Ext.getBody(),
  columns: { xs: 1, sm: 2, md: 3, lg: 4 },
  gap: '400',
  items: [
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 1</h3><p>First grid item</p>'
    },
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 2</h3><p>Second grid item</p>'
    },
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 3</h3><p>Third grid item</p>'
    },
    {
      xtype: 'panel',
      cls: 'polaris-card',
      bodyPadding: 15,
      html: '<h3>Column 4</h3><p>Fourth grid item</p>'
    }
  ]
});`,

    typescript: `import { Grid, Card, Text, GridProps } from '@shopify/polaris';
import React from 'react';

interface GridItem {
  title: string;
  content: string;
}

interface GridDefaultProps {
  columns?: GridProps['columns'];
  gap?: GridProps['gap'];
  items?: GridItem[];
}

function GridDefault({
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = '400',
  items = [
    { title: 'Column 1', content: 'First grid item' },
    { title: 'Column 2', content: 'Second grid item' },
    { title: 'Column 3', content: 'Third grid item' },
    { title: 'Column 4', content: 'Fourth grid item' }
  ]
}: GridDefaultProps): JSX.Element {
  return (
    <Grid columns={columns} gap={gap}>
      {items.map((item, index) => (
        <Card key={index} sectioned>
          <Text as="h3" variant="headingSm">{item.title}</Text>
          <Text as="p" variant="bodySm">{item.content}</Text>
        </Card>
      ))}
    </Grid>
  );
}

export default GridDefault;`
  }
};

// InlineStack Component Examples

export const inlinestackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { InlineStack, Button } from '@shopify/polaris';
import React from 'react';

function InlineStackDefault() {
  return (
    <InlineStack gap="400">
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="plain">Preview</Button>
    </InlineStack>
  );
}

export default InlineStackDefault;`,

    vanilla: `<!-- InlineStack using @cin7/vanilla-js -->
<div id="inlinestack-container"></div>

<script>
import { createInlineStack } from '@cin7/vanilla-js';

const inlineStack = createInlineStack({
  gap: '400',
  items: [
    { type: 'button', text: 'Save', variant: 'primary' },
    { type: 'button', text: 'Cancel', variant: 'secondary' },
    { type: 'button', text: 'Preview', variant: 'plain' }
  ]
});

document.getElementById('inlinestack-container').appendChild(inlineStack);
</script>`,

    extjs: `// ExtJS InlineStack using @cin7/extjs-adapters
import { PolarisInlineStack } from '@cin7/extjs-adapters';

Ext.create('PolarisInlineStack', {
  renderTo: Ext.getBody(),
  gap: '400',
  items: [
    {
      xtype: 'button',
      text: 'Save',
      ui: 'primary',
      handler: function() {
        console.log('Save clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Cancel',
      ui: 'secondary',
      handler: function() {
        console.log('Cancel clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Preview',
      ui: 'plain',
      handler: function() {
        console.log('Preview clicked');
      }
    }
  ]
});`,

    typescript: `import { InlineStack, Button, InlineStackProps } from '@shopify/polaris';
import React from 'react';

interface InlineStackDefaultProps {
  gap?: InlineStackProps['gap'];
  align?: InlineStackProps['align'];
  onSave?: () => void;
  onCancel?: () => void;
  onPreview?: () => void;
}

function InlineStackDefault({
  gap = '400',
  align = 'start',
  onSave,
  onCancel,
  onPreview
}: InlineStackDefaultProps): JSX.Element {
  return (
    <InlineStack gap={gap} align={align}>
      <Button onClick={onSave || (() => console.log('Save'))}>
        Save
      </Button>
      <Button
        variant="secondary"
        onClick={onCancel || (() => console.log('Cancel'))}
      >
        Cancel
      </Button>
      <Button
        variant="plain"
        onClick={onPreview || (() => console.log('Preview'))}
      >
        Preview
      </Button>
    </InlineStack>
  );
}

export default InlineStackDefault;`
  }
};

// VerticalStack Component Examples (maps to BlockStack)

export const verticalstackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { BlockStack } from '@shopify/polaris';
import React from 'react';

function VerticalStackDefault() {
  return (
    <BlockStack gap="400">
      <div style={{ padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        First Item
      </div>
      <div style={{ padding: '12px', backgroundColor: '#e8f5e8', borderRadius: '4px' }}>
        Second Item
      </div>
      <div style={{ padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px' }}>
        Third Item
      </div>
    </BlockStack>
  );
}

export default VerticalStackDefault;`,

    vanilla: `<!-- VerticalStack using @cin7/vanilla-js -->
<div id="verticalstack-container"></div>

<script>
import { createVerticalStack } from '@cin7/vanilla-js';

const verticalStack = createVerticalStack({
  gap: '400',
  items: [
    {
      type: 'div',
      style: { padding: '12px', backgroundColor: '#e3f2fd', borderRadius: '4px' },
      content: 'First Item'
    },
    {
      type: 'div',
      style: { padding: '12px', backgroundColor: '#e8f5e8', borderRadius: '4px' },
      content: 'Second Item'
    },
    {
      type: 'div',
      style: { padding: '12px', backgroundColor: '#fff3e0', borderRadius: '4px' },
      content: 'Third Item'
    }
  ]
});

document.getElementById('verticalstack-container').appendChild(verticalStack);
</script>`,

    extjs: `// ExtJS VerticalStack using @cin7/extjs-adapters
import { PolarisVerticalStack } from '@cin7/extjs-adapters';

Ext.create('PolarisVerticalStack', {
  renderTo: Ext.getBody(),
  gap: '400',
  items: [
    {
      xtype: 'box',
      style: {
        padding: '12px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px'
      },
      html: 'First Item'
    },
    {
      xtype: 'box',
      style: {
        padding: '12px',
        backgroundColor: '#e8f5e8',
        borderRadius: '4px'
      },
      html: 'Second Item'
    },
    {
      xtype: 'box',
      style: {
        padding: '12px',
        backgroundColor: '#fff3e0',
        borderRadius: '4px'
      },
      html: 'Third Item'
    }
  ]
});`,

    typescript: `import { BlockStack, BlockStackProps } from '@shopify/polaris';
import React from 'react';

interface VerticalStackItem {
  content: string;
  backgroundColor: string;
}

interface VerticalStackDefaultProps {
  gap?: BlockStackProps['gap'];
  items?: VerticalStackItem[];
}

function VerticalStackDefault({
  gap = '400',
  items = [
    { content: 'First Item', backgroundColor: '#e3f2fd' },
    { content: 'Second Item', backgroundColor: '#e8f5e8' },
    { content: 'Third Item', backgroundColor: '#fff3e0' }
  ]
}: VerticalStackDefaultProps): JSX.Element {
  return (
    <BlockStack gap={gap}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            padding: '12px',
            backgroundColor: item.backgroundColor,
            borderRadius: '4px'
          }}
        >
          {item.content}
        </div>
      ))}
    </BlockStack>
  );
}

export default VerticalStackDefault;`
  }
};

// ActionList Component Examples
export const actionList: Record<string, CodeVariant> = {
  default: {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';

function ActionListExample() {
  return (
    <ActionList
      items={[
        { content: 'View product', icon: ViewIcon },
        { content: 'Edit product', icon: EditIcon },
        { content: 'Duplicate product', icon: DuplicateIcon },
        { content: 'Delete product', icon: DeleteIcon, destructive: true },
      ]}
    />
  );
}

export default ActionListExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-action-list">
  <ul class="polaris-action-list__list">
    <li class="polaris-action-list__item">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">👁️</span>
        <span class="polaris-action-list__text">View product</span>
      </button>
    </li>
    <li class="polaris-action-list__item">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">✏️</span>
        <span class="polaris-action-list__text">Edit product</span>
      </button>
    </li>
    <li class="polaris-action-list__item">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">📋</span>
        <span class="polaris-action-list__text">Duplicate product</span>
      </button>
    </li>
    <li class="polaris-action-list__item polaris-action-list__item--destructive">
      <button class="polaris-action-list__button">
        <span class="polaris-action-list__icon">🗑️</span>
        <span class="polaris-action-list__text">Delete product</span>
      </button>
    </li>
  </ul>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createActionList } from '@cin7/vanilla-js';

const actionList = createActionList({
  items: [
    { text: 'View product', icon: '👁️', onClick: () => console.log('View') },
    { text: 'Edit product', icon: '✏️', onClick: () => console.log('Edit') },
    { text: 'Duplicate product', icon: '📋', onClick: () => console.log('Duplicate') },
    { text: 'Delete product', icon: '🗑️', onClick: () => console.log('Delete'), destructive: true }
  ]
});

document.getElementById('app').appendChild(actionList);
</script>`,

    extjs: `// ExtJS Menu using @cin7/extjs-adapters
Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'View product',
      iconCls: 'icon-view',
      handler: function() {
        console.log('View product');
      }
    },
    {
      text: 'Edit product',
      iconCls: 'icon-edit',
      handler: function() {
        console.log('Edit product');
      }
    },
    {
      text: 'Duplicate product',
      iconCls: 'icon-duplicate',
      handler: function() {
        console.log('Duplicate product');
      }
    },
    '-', // Separator
    {
      text: 'Delete product',
      iconCls: 'icon-delete',
      cls: 'destructive-action',
      handler: function() {
        Ext.Msg.confirm('Delete', 'Are you sure?', function(btn) {
          if (btn === 'yes') {
            console.log('Delete product');
          }
        });
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';

interface ActionListExampleProps {
  onAction?: (action: string) => void;
}

function ActionListExample({ onAction }: ActionListExampleProps): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    {
      content: 'View product',
      icon: ViewIcon,
      onAction: () => onAction?.('view'),
    },
    {
      content: 'Edit product',
      icon: EditIcon,
      onAction: () => onAction?.('edit'),
    },
    {
      content: 'Duplicate product',
      icon: DuplicateIcon,
      onAction: () => onAction?.('duplicate'),
    },
    {
      content: 'Delete product',
      icon: DeleteIcon,
      destructive: true,
      onAction: () => onAction?.('delete'),
    },
  ];

  return <ActionList items={items} />;
}

export default ActionListExample;`,
  },

  'with-actions': {
    react: `import { ActionList, Button, Popover } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function ActionListWithPopover() {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = () => {
    setPopoverActive(!popoverActive);
  };

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Actions
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList
        items={[
          { content: 'View details', icon: ViewIcon, onAction: () => console.log('View clicked') },
          { content: 'Edit', icon: EditIcon, onAction: () => console.log('Edit clicked') },
          { content: 'Duplicate', icon: DuplicateIcon, onAction: () => console.log('Duplicate clicked') },
          { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => console.log('Delete clicked') },
        ]}
      />
    </Popover>
  );
}

export default ActionListWithPopover;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-popover-wrapper">
  <button id="actions-button" class="polaris-button">
    Actions
    <span class="polaris-button__icon">▼</span>
  </button>
  <div id="actions-popover" class="polaris-popover" style="display: none;">
    <div class="polaris-action-list">
      <ul class="polaris-action-list__list">
        <li class="polaris-action-list__item">
          <button class="polaris-action-list__button" data-action="view">
            <span class="polaris-action-list__icon">👁️</span>
            <span class="polaris-action-list__text">View details</span>
          </button>
        </li>
        <li class="polaris-action-list__item">
          <button class="polaris-action-list__button" data-action="edit">
            <span class="polaris-action-list__icon">✏️</span>
            <span class="polaris-action-list__text">Edit</span>
          </button>
        </li>
        <li class="polaris-action-list__item">
          <button class="polaris-action-list__button" data-action="duplicate">
            <span class="polaris-action-list__icon">📋</span>
            <span class="polaris-action-list__text">Duplicate</span>
          </button>
        </li>
        <li class="polaris-action-list__item polaris-action-list__item--destructive">
          <button class="polaris-action-list__button" data-action="delete">
            <span class="polaris-action-list__icon">🗑️</span>
            <span class="polaris-action-list__text">Delete</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createPopover, createActionList } from '@cin7/vanilla-js';

const button = document.getElementById('actions-button');
const popover = document.getElementById('actions-popover');

button.addEventListener('click', () => {
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.currentTarget.getAttribute('data-action');
    console.log(\`\${action} clicked\`);
    popover.style.display = 'none';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!button.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Button with Menu
Ext.create('Ext.button.Button', {
  text: 'Actions',
  menu: Ext.create('Ext.menu.Menu', {
    items: [
      {
        text: 'View details',
        iconCls: 'icon-view',
        handler: function() {
          console.log('View clicked');
        }
      },
      {
        text: 'Edit',
        iconCls: 'icon-edit',
        handler: function() {
          console.log('Edit clicked');
        }
      },
      {
        text: 'Duplicate',
        iconCls: 'icon-duplicate',
        handler: function() {
          console.log('Duplicate clicked');
        }
      },
      '-',
      {
        text: 'Delete',
        iconCls: 'icon-delete',
        cls: 'destructive-action',
        handler: function() {
          console.log('Delete clicked');
        }
      }
    ]
  }),
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, Button, Popover, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

type ActionType = 'view' | 'edit' | 'duplicate' | 'delete';

interface ActionListWithPopoverProps {
  onAction?: (action: ActionType) => void;
}

function ActionListWithPopover({ onAction }: ActionListWithPopoverProps): JSX.Element {
  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(() => {
    setPopoverActive((active) => !active);
  }, []);

  const handleAction = useCallback((action: ActionType) => {
    console.log(\`\${action} clicked\`);
    onAction?.(action);
    setPopoverActive(false);
  }, [onAction]);

  const items: ActionListItemDescriptor[] = [
    {
      content: 'View details',
      icon: ViewIcon,
      onAction: () => handleAction('view'),
    },
    {
      content: 'Edit',
      icon: EditIcon,
      onAction: () => handleAction('edit'),
    },
    {
      content: 'Duplicate',
      icon: DuplicateIcon,
      onAction: () => handleAction('duplicate'),
    },
    {
      content: 'Delete',
      icon: DeleteIcon,
      destructive: true,
      onAction: () => handleAction('delete'),
    },
  ];

  const activator = (
    <Button onClick={togglePopoverActive} disclosure="down">
      Actions
    </Button>
  );

  return (
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <ActionList items={items} />
    </Popover>
  );
}

export default ActionListWithPopover;`
  },

  'with-sections': {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon, SearchIcon, DeleteIcon, DisabledIcon } from '@shopify/polaris-icons';

function ActionListWithSections() {
  return (
    <ActionList
      sections={[
        {
          title: 'Product actions',
          items: [
            { content: 'View product', icon: ViewIcon },
            { content: 'Edit product', icon: EditIcon },
            { content: 'Duplicate product', icon: DuplicateIcon },
          ],
        },
        {
          title: 'Inventory',
          items: [
            { content: 'Adjust inventory', icon: SettingsIcon },
            { content: 'View history', icon: SearchIcon },
          ],
        },
        {
          title: 'Danger zone',
          items: [
            { content: 'Delete product', icon: DeleteIcon, destructive: true },
            { content: 'Archive product', icon: DisabledIcon, destructive: true },
          ],
        },
      ]}
    />
  );
}

export default ActionListWithSections;`,

    vanilla: `<div class="polaris-action-list">
  <div class="polaris-action-list__section">
    <div class="polaris-action-list__section-title">Product actions</div>
    <ul class="polaris-action-list__list">
      <li><button>👁️ View product</button></li>
      <li><button>✏️ Edit product</button></li>
      <li><button>📋 Duplicate product</button></li>
    </ul>
  </div>
  <div class="polaris-action-list__section">
    <div class="polaris-action-list__section-title">Inventory</div>
    <ul class="polaris-action-list__list">
      <li><button>⚙️ Adjust inventory</button></li>
      <li><button>🔍 View history</button></li>
    </ul>
  </div>
  <div class="polaris-action-list__section">
    <div class="polaris-action-list__section-title">Danger zone</div>
    <ul class="polaris-action-list__list">
      <li class="destructive"><button>🗑️ Delete product</button></li>
      <li class="destructive"><button>🚫 Archive product</button></li>
    </ul>
  </div>
</div>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'Product actions', plain: true, canActivate: false },
    { text: 'View product', iconCls: 'icon-view' },
    { text: 'Edit product', iconCls: 'icon-edit' },
    { text: 'Duplicate product', iconCls: 'icon-duplicate' },
    '-',
    { text: 'Inventory', plain: true, canActivate: false },
    { text: 'Adjust inventory', iconCls: 'icon-settings' },
    { text: 'View history', iconCls: 'icon-search' },
    '-',
    { text: 'Danger zone', plain: true, canActivate: false },
    { text: 'Delete product', iconCls: 'icon-delete', cls: 'destructive' },
    { text: 'Archive product', iconCls: 'icon-archive', cls: 'destructive' }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListSection } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon, SearchIcon, DeleteIcon, DisabledIcon } from '@shopify/polaris-icons';

interface ActionListWithSectionsProps {
  onAction?: (section: string, action: string) => void;
}

function ActionListWithSections({ onAction }: ActionListWithSectionsProps): JSX.Element {
  const sections: ActionListSection[] = [
    {
      title: 'Product actions',
      items: [
        { content: 'View product', icon: ViewIcon, onAction: () => onAction?.('product', 'view') },
        { content: 'Edit product', icon: EditIcon, onAction: () => onAction?.('product', 'edit') },
        { content: 'Duplicate product', icon: DuplicateIcon, onAction: () => onAction?.('product', 'duplicate') },
      ],
    },
    {
      title: 'Inventory',
      items: [
        { content: 'Adjust inventory', icon: SettingsIcon, onAction: () => onAction?.('inventory', 'adjust') },
        { content: 'View history', icon: SearchIcon, onAction: () => onAction?.('inventory', 'history') },
      ],
    },
    {
      title: 'Danger zone',
      items: [
        { content: 'Delete product', icon: DeleteIcon, destructive: true, onAction: () => onAction?.('danger', 'delete') },
        { content: 'Archive product', icon: DisabledIcon, destructive: true, onAction: () => onAction?.('danger', 'archive') },
      ],
    },
  ];

  return <ActionList sections={sections} />;
}

export default ActionListWithSections;`
  },

  'with-disabled-items': {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon } from '@shopify/polaris-icons';

function ActionListWithDisabledItems() {
  return (
    <ActionList
      items={[
        { content: 'Available action', icon: ViewIcon },
        { content: 'Disabled action', icon: EditIcon, disabled: true },
        { content: 'Another action', icon: DuplicateIcon },
        { content: 'Also disabled', icon: SettingsIcon, disabled: true },
      ]}
    />
  );
}

export default ActionListWithDisabledItems;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li><button>👁️ Available action</button></li>
  <li><button disabled>✏️ Disabled action</button></li>
  <li><button>📋 Another action</button></li>
  <li><button disabled>⚙️ Also disabled</button></li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'Available action', iconCls: 'icon-view' },
    { text: 'Disabled action', iconCls: 'icon-edit', disabled: true },
    { text: 'Another action', iconCls: 'icon-duplicate' },
    { text: 'Also disabled', iconCls: 'icon-settings', disabled: true }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, SettingsIcon } from '@shopify/polaris-icons';

function ActionListWithDisabledItems(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'Available action', icon: ViewIcon },
    { content: 'Disabled action', icon: EditIcon, disabled: true },
    { content: 'Another action', icon: DuplicateIcon },
    { content: 'Also disabled', icon: SettingsIcon, disabled: true },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithDisabledItems;`
  },

  'with-badges': {
    react: `import { ActionList } from '@shopify/polaris';

function ActionListWithBadges() {
  return (
    <ActionList
      items={[
        { content: 'New order', badge: { status: 'new', content: 'New' } },
        { content: 'Processing', badge: { status: 'info', content: 'In progress' } },
        { content: 'Completed', badge: { status: 'success', content: 'Done' } },
        { content: 'Failed', badge: { status: 'critical', content: 'Error' } },
        { content: 'Custom badge', badge: { tone: 'magic', content: 'Special' } },
      ]}
    />
  );
}

export default ActionListWithBadges;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li>
    <button>
      New order
      <span class="badge badge-new">New</span>
    </button>
  </li>
  <li>
    <button>
      Processing
      <span class="badge badge-info">In progress</span>
    </button>
  </li>
  <li>
    <button>
      Completed
      <span class="badge badge-success">Done</span>
    </button>
  </li>
  <li>
    <button>
      Failed
      <span class="badge badge-critical">Error</span>
    </button>
  </li>
  <li>
    <button>
      Custom badge
      <span class="badge badge-magic">Special</span>
    </button>
  </li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'New order', badge: 'New', badgeCls: 'badge-new' },
    { text: 'Processing', badge: 'In progress', badgeCls: 'badge-info' },
    { text: 'Completed', badge: 'Done', badgeCls: 'badge-success' },
    { text: 'Failed', badge: 'Error', badgeCls: 'badge-critical' },
    { text: 'Custom badge', badge: 'Special', badgeCls: 'badge-magic' }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';

function ActionListWithBadges(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'New order', badge: { status: 'new', content: 'New' } },
    { content: 'Processing', badge: { status: 'info', content: 'In progress' } },
    { content: 'Completed', badge: { status: 'success', content: 'Done' } },
    { content: 'Failed', badge: { status: 'critical', content: 'Error' } },
    { content: 'Custom badge', badge: { tone: 'magic', content: 'Special' } },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithBadges;`
  },

  'with-prefix-and-suffix': {
    react: `import { ActionList, Icon } from '@shopify/polaris';
import { CheckCircleIcon, DisabledIcon } from '@shopify/polaris-icons';

function ActionListWithPrefixAndSuffix() {
  return (
    <ActionList
      items={[
        {
          content: 'Active status',
          prefix: <Icon source={CheckCircleIcon} tone="success" />,
          suffix: 'Enabled'
        },
        {
          content: 'Inactive status',
          prefix: <Icon source={DisabledIcon} tone="subdued" />,
          suffix: 'Disabled'
        },
        {
          content: 'With help text',
          suffix: 'Optional',
          helpText: 'This action is reversible'
        },
      ]}
    />
  );
}

export default ActionListWithPrefixAndSuffix;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li>
    <button>
      <span class="prefix">✓</span>
      Active status
      <span class="suffix">Enabled</span>
    </button>
  </li>
  <li>
    <button>
      <span class="prefix">○</span>
      Inactive status
      <span class="suffix">Disabled</span>
    </button>
  </li>
  <li>
    <button>
      With help text
      <span class="suffix">Optional</span>
      <div class="help-text">This action is reversible</div>
    </button>
  </li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'Active status',
      iconCls: 'icon-check-circle',
      cls: 'success',
      rightIcon: 'Enabled'
    },
    {
      text: 'Inactive status',
      iconCls: 'icon-disabled',
      cls: 'subdued',
      rightIcon: 'Disabled'
    },
    {
      text: 'With help text',
      rightIcon: 'Optional',
      tooltip: 'This action is reversible'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, Icon, ActionListItemDescriptor } from '@shopify/polaris';
import { CheckCircleIcon, DisabledIcon } from '@shopify/polaris-icons';

function ActionListWithPrefixAndSuffix(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    {
      content: 'Active status',
      prefix: <Icon source={CheckCircleIcon} tone="success" />,
      suffix: 'Enabled'
    },
    {
      content: 'Inactive status',
      prefix: <Icon source={DisabledIcon} tone="subdued" />,
      suffix: 'Disabled'
    },
    {
      content: 'With help text',
      suffix: 'Optional',
      helpText: 'This action is reversible'
    },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithPrefixAndSuffix;`
  },

  'with-destructive-actions': {
    react: `import { ActionList } from '@shopify/polaris';
import { EditIcon, SettingsIcon, DeleteIcon } from '@shopify/polaris-icons';

function ActionListWithDestructiveActions() {
  return (
    <ActionList
      items={[
        { content: 'Safe action', icon: EditIcon },
        { content: 'Warning action', icon: SettingsIcon, destructive: true },
        { content: 'Delete permanently', icon: DeleteIcon, destructive: true },
        { content: 'Remove access', destructive: true },
      ]}
    />
  );
}

export default ActionListWithDestructiveActions;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li><button>✏️ Safe action</button></li>
  <li class="destructive"><button>⚙️ Warning action</button></li>
  <li class="destructive"><button>🗑️ Delete permanently</button></li>
  <li class="destructive"><button>Remove access</button></li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    { text: 'Safe action', iconCls: 'icon-edit' },
    { text: 'Warning action', iconCls: 'icon-settings', cls: 'destructive' },
    { text: 'Delete permanently', iconCls: 'icon-delete', cls: 'destructive' },
    { text: 'Remove access', cls: 'destructive' }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { EditIcon, SettingsIcon, DeleteIcon } from '@shopify/polaris-icons';

function ActionListWithDestructiveActions(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'Safe action', icon: EditIcon },
    { content: 'Warning action', icon: SettingsIcon, destructive: true },
    { content: 'Delete permanently', icon: DeleteIcon, destructive: true },
    { content: 'Remove access', destructive: true },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithDestructiveActions;`
  },

  'with-external-links': {
    react: `import { ActionList } from '@shopify/polaris';

function ActionListWithExternalLinks() {
  return (
    <ActionList
      items={[
        { content: 'Visit documentation', url: 'https://polaris.shopify.com', external: true },
        { content: 'Open support', url: 'https://support.shopify.com', external: true },
        { content: 'View API docs', url: '#', external: true },
      ]}
    />
  );
}

export default ActionListWithExternalLinks;`,

    vanilla: `<ul class="polaris-action-list__list">
  <li>
    <a href="https://polaris.shopify.com" target="_blank" rel="noopener">
      Visit documentation 🔗
    </a>
  </li>
  <li>
    <a href="https://support.shopify.com" target="_blank" rel="noopener">
      Open support 🔗
    </a>
  </li>
  <li>
    <a href="#" target="_blank" rel="noopener">
      View API docs 🔗
    </a>
  </li>
</ul>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'Visit documentation',
      iconCls: 'icon-external-link',
      handler: function() {
        window.open('https://polaris.shopify.com', '_blank');
      }
    },
    {
      text: 'Open support',
      iconCls: 'icon-external-link',
      handler: function() {
        window.open('https://support.shopify.com', '_blank');
      }
    },
    {
      text: 'View API docs',
      iconCls: 'icon-external-link',
      handler: function() {
        window.open('#', '_blank');
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';

function ActionListWithExternalLinks(): JSX.Element {
  const items: ActionListItemDescriptor[] = [
    { content: 'Visit documentation', url: 'https://polaris.shopify.com', external: true },
    { content: 'Open support', url: 'https://support.shopify.com', external: true },
    { content: 'View API docs', url: '#', external: true },
  ];

  return <ActionList items={items} />;
}

export default ActionListWithExternalLinks;`
  },

  'nested-menu-example': {
    react: `import { ActionList } from '@shopify/polaris';
import { SearchIcon, ExportIcon, SettingsIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function NestedMenuExample() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleActionClick = (action: string) => {
    setSelectedAction(action);
    setActiveMenu(null);
  };

  const menuItems = {
    products: [
      { content: 'All products', onAction: () => handleActionClick('All products') },
      { content: 'Add product', onAction: () => handleActionClick('Add product') },
      { content: 'Import products', onAction: () => handleActionClick('Import products') },
      { content: 'Export products', onAction: () => handleActionClick('Export products') },
    ],
    orders: [
      { content: 'All orders', onAction: () => handleActionClick('All orders') },
      { content: 'Draft orders', onAction: () => handleActionClick('Draft orders') },
      { content: 'Abandoned checkouts', onAction: () => handleActionClick('Abandoned checkouts') },
    ],
    customers: [
      { content: 'All customers', onAction: () => handleActionClick('All customers') },
      { content: 'Customer groups', onAction: () => handleActionClick('Customer groups') },
      { content: 'Import customers', onAction: () => handleActionClick('Import customers') },
    ],
  };

  return (
    <div>
      <ActionList
        items={[
          { content: 'Products', icon: SearchIcon, onAction: () => setActiveMenu('products') },
          { content: 'Orders', icon: ExportIcon, onAction: () => setActiveMenu('orders') },
          { content: 'Customers', icon: SettingsIcon, onAction: () => setActiveMenu('customers') },
        ]}
      />
      {activeMenu && menuItems[activeMenu as keyof typeof menuItems] && (
        <ActionList items={menuItems[activeMenu as keyof typeof menuItems]} />
      )}
      {selectedAction && <p>Selected: {selectedAction}</p>}
    </div>
  );
}

export default NestedMenuExample;`,

    vanilla: `<div class="nested-menu">
  <ul class="main-menu">
    <li><button data-menu="products">🔍 Products</button></li>
    <li><button data-menu="orders">📤 Orders</button></li>
    <li><button data-menu="customers">⚙️ Customers</button></li>
  </ul>
  <div id="submenu" style="display: none;"></div>
</div>

<script>
const submenus = {
  products: ['All products', 'Add product', 'Import products', 'Export products'],
  orders: ['All orders', 'Draft orders', 'Abandoned checkouts'],
  customers: ['All customers', 'Customer groups', 'Import customers']
};

document.querySelectorAll('[data-menu]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const menu = e.target.dataset.menu;
    const submenu = document.getElementById('submenu');
    submenu.innerHTML = submenus[menu].map(item =>
      \`<button>\${item}</button>\`
    ).join('');
    submenu.style.display = 'block';
  });
});
</script>`,

    extjs: `Ext.create('Ext.menu.Menu', {
  items: [
    {
      text: 'Products',
      iconCls: 'icon-search',
      menu: {
        items: [
          { text: 'All products' },
          { text: 'Add product' },
          { text: 'Import products' },
          { text: 'Export products' }
        ]
      }
    },
    {
      text: 'Orders',
      iconCls: 'icon-export',
      menu: {
        items: [
          { text: 'All orders' },
          { text: 'Draft orders' },
          { text: 'Abandoned checkouts' }
        ]
      }
    },
    {
      text: 'Customers',
      iconCls: 'icon-settings',
      menu: {
        items: [
          { text: 'All customers' },
          { text: 'Customer groups' },
          { text: 'Import customers' }
        ]
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { SearchIcon, ExportIcon, SettingsIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

type MenuKey = 'products' | 'orders' | 'customers';

interface NestedMenuExampleProps {
  onSelect?: (action: string) => void;
}

function NestedMenuExample({ onSelect }: NestedMenuExampleProps): JSX.Element {
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const handleActionClick = useCallback((action: string) => {
    setSelectedAction(action);
    setActiveMenu(null);
    onSelect?.(action);
  }, [onSelect]);

  const menuItems: Record<MenuKey, ActionListItemDescriptor[]> = {
    products: [
      { content: 'All products', onAction: () => handleActionClick('All products') },
      { content: 'Add product', onAction: () => handleActionClick('Add product') },
      { content: 'Import products', onAction: () => handleActionClick('Import products') },
      { content: 'Export products', onAction: () => handleActionClick('Export products') },
    ],
    orders: [
      { content: 'All orders', onAction: () => handleActionClick('All orders') },
      { content: 'Draft orders', onAction: () => handleActionClick('Draft orders') },
      { content: 'Abandoned checkouts', onAction: () => handleActionClick('Abandoned checkouts') },
    ],
    customers: [
      { content: 'All customers', onAction: () => handleActionClick('All customers') },
      { content: 'Customer groups', onAction: () => handleActionClick('Customer groups') },
      { content: 'Import customers', onAction: () => handleActionClick('Import customers') },
    ],
  };

  return (
    <div>
      <ActionList
        items={[
          { content: 'Products', icon: SearchIcon, onAction: () => setActiveMenu('products') },
          { content: 'Orders', icon: ExportIcon, onAction: () => setActiveMenu('orders') },
          { content: 'Customers', icon: SettingsIcon, onAction: () => setActiveMenu('customers') },
        ]}
      />
      {activeMenu && menuItems[activeMenu] && (
        <ActionList items={menuItems[activeMenu]} />
      )}
      {selectedAction && <p>Selected: {selectedAction}</p>}
    </div>
  );
}

export default NestedMenuExample;`,
  },

  'bulk-actions-example': {
    react: `import { ActionList, Button, Popover } from '@shopify/polaris';
import { EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function BulkActionsExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { id: '1', name: 'Product A', status: 'Active' },
    { id: '2', name: 'Product B', status: 'Draft' },
    { id: '3', name: 'Product C', status: 'Active' },
    { id: '4', name: 'Product D', status: 'Archived' },
  ];

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(\`Bulk action: \${action} on items:\`, selectedItems);
    setIsMenuOpen(false);
  };

  const bulkActions = [
    { content: 'Edit selected', icon: EditIcon, onAction: () => handleBulkAction('edit') },
    { content: 'Duplicate selected', icon: DuplicateIcon, onAction: () => handleBulkAction('duplicate') },
    { content: 'Archive selected', onAction: () => handleBulkAction('archive') },
    { content: 'Delete selected', icon: DeleteIcon, destructive: true, onAction: () => handleBulkAction('delete') },
  ];

  return (
    <div>
      <div>
        <h4>Products ({selectedItems.length} selected)</h4>
        {selectedItems.length > 0 && (
          <Popover
            active={isMenuOpen}
            activator={<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Bulk actions</Button>}
            onClose={() => setIsMenuOpen(false)}
          >
            <ActionList items={bulkActions} />
          </Popover>
        )}
      </div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleSelectItem(item.id)}>
          <input type="checkbox" checked={selectedItems.includes(item.id)} />
          <span>{item.name}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
}

export default BulkActionsExample;`,

    vanilla: `<div class="bulk-actions">
  <div class="header">
    <h4>Products (<span id="selected-count">0</span> selected)</h4>
    <button id="bulk-menu" style="display: none;">Bulk actions</button>
  </div>
  <div class="items">
    <div data-id="1"><input type="checkbox"> Product A</div>
    <div data-id="2"><input type="checkbox"> Product B</div>
    <div data-id="3"><input type="checkbox"> Product C</div>
    <div data-id="4"><input type="checkbox"> Product D</div>
  </div>
</div>

<script>
let selected = [];
document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
  cb.addEventListener('change', (e) => {
    const id = e.target.parentElement.dataset.id;
    selected = e.target.checked
      ? [...selected, id]
      : selected.filter(i => i !== id);
    document.getElementById('selected-count').textContent = selected.length;
    document.getElementById('bulk-menu').style.display =
      selected.length > 0 ? 'block' : 'none';
  });
});
</script>`,

    extjs: `Ext.create('Ext.grid.Panel', {
  selModel: {
    mode: 'MULTI'
  },
  store: {
    fields: ['id', 'name', 'status'],
    data: [
      { id: 1, name: 'Product A', status: 'Active' },
      { id: 2, name: 'Product B', status: 'Draft' },
      { id: 3, name: 'Product C', status: 'Active' },
      { id: 4, name: 'Product D', status: 'Archived' }
    ]
  },
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 }
  ],
  dockedItems: [{
    xtype: 'toolbar',
    items: [{
      text: 'Bulk actions',
      menu: {
        items: [
          { text: 'Edit selected', iconCls: 'icon-edit' },
          { text: 'Duplicate selected', iconCls: 'icon-duplicate' },
          { text: 'Archive selected' },
          { text: 'Delete selected', iconCls: 'icon-delete', cls: 'destructive' }
        ]
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, Button, Popover, ActionListItemDescriptor } from '@shopify/polaris';
import { EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface Item {
  id: string;
  name: string;
  status: string;
}

interface BulkActionsExampleProps {
  onBulkAction?: (action: string, items: string[]) => void;
}

function BulkActionsExample({ onBulkAction }: BulkActionsExampleProps): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items: Item[] = [
    { id: '1', name: 'Product A', status: 'Active' },
    { id: '2', name: 'Product B', status: 'Draft' },
    { id: '3', name: 'Product C', status: 'Active' },
    { id: '4', name: 'Product D', status: 'Archived' },
  ];

  const handleSelectItem = useCallback((itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  }, []);

  const handleBulkAction = useCallback((action: string) => {
    console.log(\`Bulk action: \${action} on items:\`, selectedItems);
    onBulkAction?.(action, selectedItems);
    setIsMenuOpen(false);
  }, [selectedItems, onBulkAction]);

  const bulkActions: ActionListItemDescriptor[] = [
    { content: 'Edit selected', icon: EditIcon, onAction: () => handleBulkAction('edit') },
    { content: 'Duplicate selected', icon: DuplicateIcon, onAction: () => handleBulkAction('duplicate') },
    { content: 'Archive selected', onAction: () => handleBulkAction('archive') },
    { content: 'Delete selected', icon: DeleteIcon, destructive: true, onAction: () => handleBulkAction('delete') },
  ];

  return (
    <div>
      <div>
        <h4>Products ({selectedItems.length} selected)</h4>
        {selectedItems.length > 0 && (
          <Popover
            active={isMenuOpen}
            activator={<Button onClick={() => setIsMenuOpen(!isMenuOpen)}>Bulk actions</Button>}
            onClose={() => setIsMenuOpen(false)}
          >
            <ActionList items={bulkActions} />
          </Popover>
        )}
      </div>
      {items.map(item => (
        <div key={item.id} onClick={() => handleSelectItem(item.id)}>
          <input type="checkbox" checked={selectedItems.includes(item.id)} readOnly />
          <span>{item.name}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
}

export default BulkActionsExample;`,
  },

  'context-menu-example': {
    react: `import { ActionList } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function ContextMenuExample() {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: string } | null>(null);
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  const handleContextMenu = (e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  };

  const handleAction = (action: string) => {
    if (contextMenu) {
      const message = \`\${action} - \${contextMenu.item}\`;
      setActionHistory(prev => [message, ...prev.slice(0, 4)]);
      setContextMenu(null);
    }
  };

  const items = ['Product A - T-Shirt', 'Product B - Jeans', 'Product C - Shoes', 'Product D - Hat'];

  const contextActions = [
    { content: 'View details', icon: ViewIcon, onAction: () => handleAction('View details') },
    { content: 'Edit', icon: EditIcon, onAction: () => handleAction('Edit') },
    { content: 'Duplicate', icon: DuplicateIcon, onAction: () => handleAction('Duplicate') },
    { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => handleAction('Delete') },
  ];

  return (
    <div>
      <h4>Right-click items for context menu</h4>
      {items.map((item, index) => (
        <div key={index} onContextMenu={(e) => handleContextMenu(e, item)}>
          {item}
        </div>
      ))}
      {contextMenu && (
        <div style={{ position: 'fixed', left: contextMenu.x, top: contextMenu.y }}>
          <ActionList items={contextActions} />
        </div>
      )}
      {actionHistory.length > 0 && (
        <div>
          <h5>Recent Actions:</h5>
          {actionHistory.map((action, index) => <div key={index}>{action}</div>)}
        </div>
      )}
    </div>
  );
}

export default ContextMenuExample;`,

    vanilla: `<div id="items-container">
  <div class="item" data-name="Product A">Product A - T-Shirt</div>
  <div class="item" data-name="Product B">Product B - Jeans</div>
  <div class="item" data-name="Product C">Product C - Shoes</div>
  <div class="item" data-name="Product D">Product D - Hat</div>
</div>
<div id="context-menu" style="display: none; position: fixed;">
  <button data-action="view">👁️ View details</button>
  <button data-action="edit">✏️ Edit</button>
  <button data-action="duplicate">📋 Duplicate</button>
  <button data-action="delete">🗑️ Delete</button>
</div>

<script>
let currentItem = null;

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    currentItem = e.target.dataset.name;
    const menu = document.getElementById('context-menu');
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.style.display = 'block';
  });
});

document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    console.log(\`\${action} - \${currentItem}\`);
    document.getElementById('context-menu').style.display = 'none';
  });
});

document.addEventListener('click', () => {
  document.getElementById('context-menu').style.display = 'none';
});
</script>`,

    extjs: `Ext.create('Ext.view.View', {
  store: {
    fields: ['name'],
    data: [
      { name: 'Product A - T-Shirt' },
      { name: 'Product B - Jeans' },
      { name: 'Product C - Shoes' },
      { name: 'Product D - Hat' }
    ]
  },
  tpl: '<div class="item">{name}</div>',
  itemSelector: 'div.item',
  listeners: {
    itemcontextmenu: function(view, record, item, index, e) {
      e.stopEvent();
      const menu = Ext.create('Ext.menu.Menu', {
        items: [
          {
            text: 'View details',
            iconCls: 'icon-view',
            handler: function() {
              console.log('View - ' + record.get('name'));
            }
          },
          {
            text: 'Edit',
            iconCls: 'icon-edit',
            handler: function() {
              console.log('Edit - ' + record.get('name'));
            }
          },
          {
            text: 'Duplicate',
            iconCls: 'icon-duplicate',
            handler: function() {
              console.log('Duplicate - ' + record.get('name'));
            }
          },
          '-',
          {
            text: 'Delete',
            iconCls: 'icon-delete',
            cls: 'destructive',
            handler: function() {
              console.log('Delete - ' + record.get('name'));
            }
          }
        ]
      });
      menu.showAt(e.getXY());
    }
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import { ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';

interface ContextMenuState {
  x: number;
  y: number;
  item: string;
}

interface ContextMenuExampleProps {
  onAction?: (action: string, item: string) => void;
}

function ContextMenuExample({ onAction }: ContextMenuExampleProps): JSX.Element {
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [actionHistory, setActionHistory] = useState<string[]>([]);

  const handleContextMenu = useCallback((e: React.MouseEvent, item: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
  }, []);

  const handleAction = useCallback((action: string) => {
    if (contextMenu) {
      const message = \`\${action} - \${contextMenu.item}\`;
      setActionHistory(prev => [message, ...prev.slice(0, 4)]);
      onAction?.(action, contextMenu.item);
      setContextMenu(null);
    }
  }, [contextMenu, onAction]);

  const items: string[] = ['Product A - T-Shirt', 'Product B - Jeans', 'Product C - Shoes', 'Product D - Hat'];

  const contextActions: ActionListItemDescriptor[] = [
    { content: 'View details', icon: ViewIcon, onAction: () => handleAction('View details') },
    { content: 'Edit', icon: EditIcon, onAction: () => handleAction('Edit') },
    { content: 'Duplicate', icon: DuplicateIcon, onAction: () => handleAction('Duplicate') },
    { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => handleAction('Delete') },
  ];

  return (
    <div>
      <h4>Right-click items for context menu</h4>
      {items.map((item, index) => (
        <div key={index} onContextMenu={(e) => handleContextMenu(e, item)}>
          {item}
        </div>
      ))}
      {contextMenu && (
        <div style={{ position: 'fixed', left: contextMenu.x, top: contextMenu.y, zIndex: 1000 }}>
          <ActionList items={contextActions} />
        </div>
      )}
      {actionHistory.length > 0 && (
        <div>
          <h5>Recent Actions:</h5>
          {actionHistory.map((action, index) => <div key={index}>{action}</div>)}
        </div>
      )}
    </div>
  );
}

export default ContextMenuExample;`,
  }
};

// BulkActions Component Examples

export const collapsibleExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Collapsible, Button } from '@shopify/polaris';
import { useState } from 'react';

function CollapsibleExample() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        ariaExpanded={open}
        ariaControls="basic-collapsible"
      >
        {open ? 'Hide' : 'Show'} Details
      </Button>
      <Collapsible
        open={open}
        id="basic-collapsible"
        transition
      >
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          marginTop: '8px'
        }}>
          This is collapsible content that can be shown or hidden.
        </div>
      </Collapsible>
    </div>
  );
}`,

    extjs: `// ExtJS Panel with collapsible region
Ext.create('Ext.panel.Panel', {
  title: 'Main Panel',
  width: 400,
  height: 300,
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'panel',
    title: 'Collapsible Details',
    collapsible: true,
    collapsed: true,
    height: 150,
    html: 'This is collapsible content that can be expanded or collapsed.'
  }, {
    region: 'center',
    xtype: 'panel',
    html: 'Main content area'
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="collapsible-wrapper">
  <button
    id="toggle-btn"
    class="collapsible-trigger"
    aria-expanded="false"
    aria-controls="collapsible-content"
  >
    Show Details
  </button>

  <div
    id="collapsible-content"
    class="collapsible-content"
    style="display: none;"
  >
    <div class="content-inner">
      This is collapsible content that can be shown or hidden.
    </div>
  </div>
</div>

<style>
.collapsible-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.collapsible-content.open {
  max-height: 500px;
}

.content-inner {
  padding: 16px;
  border: 1px solid #ddd;
  margin-top: 8px;
  border-radius: 4px;
}
</style>

<script>
import { on, $, toggleClass } from '@cin7/vanilla-js';

const toggleBtn = $('#toggle-btn');
const content = $('#collapsible-content');

on(toggleBtn, 'click', () => {
  const isOpen = content.classList.contains('open');

  toggleClass(content, 'open');
  toggleBtn.textContent = isOpen ? 'Show Details' : 'Hide Details';
  toggleBtn.setAttribute('aria-expanded', !isOpen);
});
</script>`,

    typescript: `import { Collapsible, Button } from '@shopify/polaris';
import { useState, ReactNode } from 'react';

interface CollapsibleExampleProps {
  title?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

function CollapsibleExample({
  title = 'Details',
  children,
  defaultOpen = false,
  onToggle
}: CollapsibleExampleProps): JSX.Element {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div>
      <Button
        onClick={handleToggle}
        ariaExpanded={open}
        ariaControls="collapsible-content"
      >
        {open ? 'Hide' : 'Show'} {title}
      </Button>
      <Collapsible
        open={open}
        id="collapsible-content"
        transition
      >
        <div style={{
          padding: '16px',
          border: '1px solid #ddd',
          marginTop: '8px',
          borderRadius: '4px'
        }}>
          {children || 'This is collapsible content.'}
        </div>
      </Collapsible>
    </div>
  );
}`
  }
,

  basicUsage: {
    react: `import { Collapsible, Button, TextContainer } from '@shopify/polaris';
import { useState } from 'react';

function BasicCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        {open ? 'Collapse' : 'Expand'}
      </Button>
      <Collapsible open={open} id="basic-collapsible" transition>
        <TextContainer>
          <p>Additional information appears here when expanded.</p>
        </TextContainer>
      </Collapsible>
    </>
  );
}`,

    extjs: `// ExtJS Panel with basic collapsible functionality
Ext.create('Ext.panel.Panel', {
  title: 'Product Details',
  width: 400,
  collapsible: true,
  collapsed: false,
  animCollapse: true,
  html: '<div style="padding: 16px;">Additional information appears here when expanded.</div>',
  tools: [{
    type: 'refresh',
    handler: function(event, toolEl, panel) {
      panel.toggleCollapse();
    }
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="basic-collapsible">
  <button id="basic-toggle" class="toggle-btn">Expand</button>
  <div id="basic-content" class="collapsible-content" hidden>
    <p>Additional information appears here when expanded.</p>
  </div>
</div>

<style>
.collapsible-content {
  padding: 16px;
  margin-top: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

<script>
import { on, $ } from '@cin7/vanilla-js';

const toggle = $('#basic-toggle');
const content = $('#basic-content');

on(toggle, 'click', () => {
  const isHidden = content.hasAttribute('hidden');

  if (isHidden) {
    content.removeAttribute('hidden');
    toggle.textContent = 'Collapse';
  } else {
    content.setAttribute('hidden', '');
    toggle.textContent = 'Expand';
  }
});
</script>`,

    typescript: `import { Collapsible, Button, TextContainer } from '@shopify/polaris';
import { useState, useCallback, ReactNode } from 'react';

/**
 * State interface for collapsible component
 */
interface CollapsibleState {
  isOpen: boolean;
  toggleCount: number;
  lastToggled: Date | null;
}

/**
 * Props for controlled collapsible
 */
interface ControlledCollapsibleProps {
  open?: boolean;
  onChange?: (open: boolean) => void;
  children: ReactNode;
}

/**
 * Props for uncontrolled collapsible
 */
interface UncontrolledCollapsibleProps {
  defaultOpen?: boolean;
  onToggle?: (state: CollapsibleState) => void;
  children: ReactNode;
}

type CollapsibleProps = ControlledCollapsibleProps | UncontrolledCollapsibleProps;

/**
 * Check if component is controlled
 */
function isControlled(props: CollapsibleProps): props is ControlledCollapsibleProps {
  return 'open' in props;
}

/**
 * Basic collapsible component with controlled/uncontrolled patterns
 */
function BasicCollapsible(props: CollapsibleProps): JSX.Element {
  const [internalState, setInternalState] = useState<CollapsibleState>({
    isOpen: isControlled(props) ? props.open! : (props as UncontrolledCollapsibleProps).defaultOpen ?? false,
    toggleCount: 0,
    lastToggled: null
  });

  const currentOpen = isControlled(props) ? props.open! : internalState.isOpen;

  const handleToggle = useCallback(() => {
    const newOpen = !currentOpen;
    const newState: CollapsibleState = {
      isOpen: newOpen,
      toggleCount: internalState.toggleCount + 1,
      lastToggled: new Date()
    };

    if (isControlled(props)) {
      props.onChange?.(newOpen);
    } else {
      setInternalState(newState);
      (props as UncontrolledCollapsibleProps).onToggle?.(newState);
    }
  }, [currentOpen, internalState.toggleCount, props]);

  return (
    <div className="basic-collapsible">
      <Button
        onClick={handleToggle}
        ariaExpanded={currentOpen}
        ariaControls="collapsible-content"
      >
        {currentOpen ? 'Collapse' : 'Expand'}
      </Button>
      <Collapsible
        open={currentOpen}
        id="collapsible-content"
        transition
      >
        <TextContainer>
          {props.children}
        </TextContainer>
      </Collapsible>
      {!isControlled(props) && (
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          Toggled {internalState.toggleCount} times
        </p>
      )}
    </div>
  );
}

// Usage examples
function Examples() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <>
      {/* Uncontrolled */}
      <BasicCollapsible
        defaultOpen={false}
        onToggle={(state) => console.log('Toggle state:', state)}
      >
        <p>Uncontrolled collapsible content</p>
      </BasicCollapsible>

      {/* Controlled */}
      <BasicCollapsible
        open={controlledOpen}
        onChange={setControlledOpen}
      >
        <p>Controlled collapsible content</p>
      </BasicCollapsible>
    </>
  );
}`
  },

  accordion: {
    react: `import { Collapsible, Button, Card } from '@shopify/polaris';
import { useState } from 'react';

function Accordion() {
  const [openId, setOpenId] = useState<string | null>('panel-1');

  const items = [
    { id: 'panel-1', title: 'Shipping', content: 'Free shipping on orders over $50' },
    { id: 'panel-2', title: 'Returns', content: '30-day return policy' },
    { id: 'panel-3', title: 'Support', content: '24/7 customer support' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map(item => (
        <Card key={item.id}>
          <Button
            plain
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            fullWidth
          >
            {item.title}
          </Button>
          <Collapsible open={openId === item.id} id={item.id} transition>
            <p>{item.content}</p>
          </Collapsible>
        </Card>
      ))}
    </div>
  );
}`,

    extjs: `// ExtJS Accordion Layout
Ext.create('Ext.panel.Panel', {
  title: 'FAQ Accordion',
  width: 400,
  height: 400,
  layout: 'accordion',
  items: [{
    title: 'Shipping',
    html: 'Free shipping on orders over $50',
    // First panel expanded by default
  }, {
    title: 'Returns',
    html: '30-day return policy',
    collapsed: true
  }, {
    title: 'Support',
    html: '24/7 customer support',
    collapsed: true
  }],
  // Only one panel can be expanded at a time
  multi: false,
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-header" data-panel="panel-1">Shipping</button>
    <div id="panel-1" class="accordion-content" hidden>
      Free shipping on orders over $50
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header" data-panel="panel-2">Returns</button>
    <div id="panel-2" class="accordion-content" hidden>
      30-day return policy
    </div>
  </div>
  <div class="accordion-item">
    <button class="accordion-header" data-panel="panel-3">Support</button>
    <div id="panel-3" class="accordion-content" hidden>
      24/7 customer support
    </div>
  </div>
</div>

<style>
.accordion-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.accordion-header {
  width: 100%;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  text-align: left;
  cursor: pointer;
}

.accordion-content {
  padding: 12px;
}
</style>

<script>
import { on, $$ } from '@cin7/vanilla-js';

let currentOpen = null;

const headers = $$('.accordion-header');

headers.forEach(header => {
  on(header, 'click', () => {
    const panelId = header.dataset.panel;
    const panel = document.getElementById(panelId);

    // Close currently open panel
    if (currentOpen && currentOpen !== panel) {
      currentOpen.setAttribute('hidden', '');
    }

    // Toggle clicked panel
    if (panel.hasAttribute('hidden')) {
      panel.removeAttribute('hidden');
      currentOpen = panel;
    } else {
      panel.setAttribute('hidden', '');
      currentOpen = null;
    }
  });
});
</script>`,

    typescript: `import { Collapsible, Button, Card } from '@shopify/polaris';
import { useState, useCallback, ReactNode } from 'react';

/**
 * Single accordion item configuration
 */
interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
}

/**
 * Accordion state management
 */
interface AccordionState {
  openItemId: string | null;
  previousItemId: string | null;
  expandCount: Record<string, number>;
}

/**
 * Accordion behavior configuration
 */
interface AccordionConfig {
  allowMultiple?: boolean;
  defaultOpenId?: string;
  collapsible?: boolean; // Allow closing all items
}

/**
 * Props for accordion component
 */
interface AccordionProps {
  items: AccordionItem[];
  config?: AccordionConfig;
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
  onStateChange?: (state: AccordionState) => void;
}

/**
 * Accordion component with exclusive selection
 */
function Accordion({
  items,
  config = {},
  onItemToggle,
  onStateChange
}: AccordionProps): JSX.Element {
  const { allowMultiple = false, defaultOpenId = null, collapsible = true } = config;

  const [state, setState] = useState<AccordionState>({
    openItemId: defaultOpenId,
    previousItemId: null,
    expandCount: items.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {})
  });

  const handleToggle = useCallback((itemId: string) => {
    setState(prevState => {
      const isCurrentlyOpen = prevState.openItemId === itemId;
      const newOpenId = isCurrentlyOpen && collapsible ? null : itemId;

      const newState: AccordionState = {
        openItemId: newOpenId,
        previousItemId: prevState.openItemId,
        expandCount: {
          ...prevState.expandCount,
          [itemId]: prevState.expandCount[itemId] + (isCurrentlyOpen ? 0 : 1)
        }
      };

      onItemToggle?.(itemId, newOpenId === itemId);
      onStateChange?.(newState);

      return newState;
    });
  }, [collapsible, onItemToggle, onStateChange]);

  return (
    <div
      className="accordion-container"
      role="region"
      aria-label="Accordion"
    >
      {items.map((item) => {
        const isOpen = state.openItemId === item.id;
        const expandCount = state.expandCount[item.id] || 0;

        return (
          <Card key={item.id} sectioned>
            <div style={{ marginBottom: '8px' }}>
              <Button
                plain
                fullWidth
                onClick={() => handleToggle(item.id)}
                disabled={item.disabled}
                ariaExpanded={isOpen}
                ariaControls={\`accordion-panel-\${item.id}\`}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}>
                  <span>{item.title}</span>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </div>
              </Button>
            </div>
            <Collapsible
              open={isOpen}
              id={\`accordion-panel-\${item.id}\`}
              transition
            >
              <div style={{ paddingTop: '8px', borderTop: '1px solid #ddd' }}>
                {item.content}
                {expandCount > 0 && (
                  <p style={{
                    marginTop: '8px',
                    fontSize: '11px',
                    color: '#999'
                  }}>
                    Expanded {expandCount} time{expandCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </Collapsible>
          </Card>
        );
      })}
    </div>
  );
}

// Usage example
function AccordionExample() {
  const items: AccordionItem[] = [
    {
      id: 'shipping',
      title: 'Shipping Information',
      content: <p>Free shipping on orders over $50. Standard delivery takes 3-5 business days.</p>
    },
    {
      id: 'returns',
      title: 'Return Policy',
      content: <p>30-day return policy. Items must be in original condition with tags attached.</p>
    },
    {
      id: 'support',
      title: 'Customer Support',
      content: <p>24/7 customer support available via chat, email, or phone.</p>
    }
  ];

  return (
    <Accordion
      items={items}
      config={{
        defaultOpenId: 'shipping',
        collapsible: true
      }}
      onItemToggle={(id, isOpen) => {
        console.log(\`Item \${id} is now \${isOpen ? 'open' : 'closed'}\`);
      }}
    />
  );
}`
  }
,

  nested: {
    react: `import { Collapsible, Button, Card } from '@shopify/polaris';
import { useState } from 'react';

function NestedCollapsible() {
  const [level1Open, setLevel1Open] = useState(true);
  const [level2Open, setLevel2Open] = useState(false);

  return (
    <Card>
      <Button onClick={() => setLevel1Open(!level1Open)}>
        Level 1
      </Button>
      <Collapsible open={level1Open} id="level-1" transition>
        <div style={{ padding: '16px' }}>
          <p>First level content</p>
          <Button onClick={() => setLevel2Open(!level2Open)}>
            Level 2
          </Button>
          <Collapsible open={level2Open} id="level-2" transition>
            <div style={{ padding: '16px', background: '#f5f5f5' }}>
              Second level nested content
            </div>
          </Collapsible>
        </div>
      </Collapsible>
    </Card>
  );
}`,

    extjs: `// ExtJS nested collapsible panels
Ext.create('Ext.panel.Panel', {
  title: 'Level 1 Panel',
  width: 400,
  collapsible: true,
  collapsed: false,
  items: [{
    xtype: 'panel',
    title: 'Level 2 Panel',
    collapsible: true,
    collapsed: true,
    margin: 10,
    html: 'Second level nested content',
    items: [{
      xtype: 'panel',
      title: 'Level 3 Panel',
      collapsible: true,
      collapsed: true,
      margin: 10,
      html: 'Third level nested content'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="nested-collapsible">
  <button id="level-1-toggle" class="toggle-btn">Level 1</button>
  <div id="level-1-content" class="collapsible-content">
    <p>First level content</p>
    <button id="level-2-toggle" class="toggle-btn nested">Level 2</button>
    <div id="level-2-content" class="collapsible-content nested" hidden>
      <p>Second level nested content</p>
    </div>
  </div>
</div>

<style>
.collapsible-content {
  padding: 16px;
  border-left: 3px solid #ddd;
  margin-left: 8px;
}

.collapsible-content.nested {
  background: #f5f5f5;
  margin-top: 8px;
}
</style>

<script>
import { on, $ } from '@cin7/vanilla-js';

const level1Toggle = $('#level-1-toggle');
const level1Content = $('#level-1-content');
const level2Toggle = $('#level-2-toggle');
const level2Content = $('#level-2-content');

on(level1Toggle, 'click', () => {
  const isHidden = level1Content.hasAttribute('hidden');
  if (isHidden) {
    level1Content.removeAttribute('hidden');
  } else {
    level1Content.setAttribute('hidden', '');
    level2Content.setAttribute('hidden', '');
  }
});

on(level2Toggle, 'click', () => {
  const isHidden = level2Content.hasAttribute('hidden');
  level2Content.toggleAttribute('hidden');
});
</script>`,

    typescript: `import { Collapsible, Button, Card } from '@shopify/polaris';
import { useState, useCallback, ReactNode } from 'react';

/**
 * Nesting depth type
 */
type NestedLevel = 0 | 1 | 2 | 3 | 4;

/**
 * Maximum allowed nesting depth
 */
const MAX_NESTING_DEPTH: NestedLevel = 4;

/**
 * Nested collapsible item
 */
interface NestedCollapsibleItem {
  id: string;
  title: string;
  content: ReactNode;
  children?: NestedCollapsibleItem[];
  defaultOpen?: boolean;
}

/**
 * State tracking for nested items
 */
interface NestedState {
  openItems: Set<string>;
  depthMap: Map<string, NestedLevel>;
}

/**
 * Props for nested collapsible
 */
interface NestedCollapsibleProps {
  item: NestedCollapsibleItem;
  depth?: NestedLevel;
  onToggle?: (itemId: string, isOpen: boolean, depth: NestedLevel) => void;
}

/**
 * Recursive nested collapsible component
 */
function NestedCollapsible({
  item,
  depth = 0,
  onToggle
}: NestedCollapsibleProps): JSX.Element | null {
  const [isOpen, setIsOpen] = useState(item.defaultOpen ?? false);

  // Prevent excessive nesting
  if (depth > MAX_NESTING_DEPTH) {
    console.warn(\`Maximum nesting depth (\${MAX_NESTING_DEPTH}) exceeded\`);
    return null;
  }

  const handleToggle = useCallback(() => {
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    onToggle?.(item.id, newOpen, depth);
  }, [isOpen, item.id, depth, onToggle]);

  const indentLevel = depth * 16;

  return (
    <div
      style={{
        marginLeft: \`\${indentLevel}px\`,
        borderLeft: depth > 0 ? '2px solid #ddd' : 'none',
        paddingLeft: depth > 0 ? '12px' : '0'
      }}
    >
      <Button
        onClick={handleToggle}
        ariaExpanded={isOpen}
        ariaControls={\`nested-\${item.id}\`}
        plain={depth > 0}
      >
        {item.title} (Level {depth + 1})
      </Button>

      <Collapsible
        open={isOpen}
        id={\`nested-\${item.id}\`}
        transition
      >
        <div style={{
          padding: '12px',
          background: depth % 2 === 0 ? 'white' : '#f9f9f9',
          borderRadius: '4px',
          marginTop: '8px'
        }}>
          {item.content}

          {/* Recursively render children */}
          {item.children && item.children.length > 0 && (
            <div style={{ marginTop: '12px' }}>
              {item.children.map((child) => (
                <NestedCollapsible
                  key={child.id}
                  item={child}
                  depth={(depth + 1) as NestedLevel}
                  onToggle={onToggle}
                />
              ))}
            </div>
          )}
        </div>
      </Collapsible>
    </div>
  );
}

/**
 * Container for managing nested collapsibles with state tracking
 */
function NestedCollapsibleContainer({
  rootItem
}: {
  rootItem: NestedCollapsibleItem;
}): JSX.Element {
  const [state, setState] = useState<NestedState>({
    openItems: new Set(),
    depthMap: new Map()
  });

  const handleToggle = useCallback((itemId: string, isOpen: boolean, depth: NestedLevel) => {
    setState(prev => {
      const openItems = new Set(prev.openItems);
      const depthMap = new Map(prev.depthMap);

      if (isOpen) {
        openItems.add(itemId);
        depthMap.set(itemId, depth);
      } else {
        openItems.delete(itemId);
      }

      return { openItems, depthMap };
    });

    console.log(\`Item \${itemId} at depth \${depth} is now \${isOpen ? 'open' : 'closed'}\`);
  }, []);

  return (
    <Card sectioned>
      <NestedCollapsible item={rootItem} onToggle={handleToggle} />
      <div style={{ marginTop: '16px', padding: '8px', background: '#f5f5f5', fontSize: '12px' }}>
        <p>Open items: {state.openItems.size}</p>
        <p>Max depth reached: {Math.max(0, ...Array.from(state.depthMap.values()))}</p>
      </div>
    </Card>
  );
}

// Usage example
function NestedExample() {
  const nestedData: NestedCollapsibleItem = {
    id: 'root',
    title: 'Products',
    content: <p>Browse our product catalog</p>,
    defaultOpen: true,
    children: [
      {
        id: 'electronics',
        title: 'Electronics',
        content: <p>Electronic devices and accessories</p>,
        children: [
          {
            id: 'computers',
            title: 'Computers',
            content: <p>Laptops, desktops, and tablets</p>,
            children: [
              {
                id: 'laptops',
                title: 'Laptops',
                content: <p>Various laptop models</p>
              }
            ]
          }
        ]
      },
      {
        id: 'clothing',
        title: 'Clothing',
        content: <p>Apparel and fashion items</p>
      }
    ]
  };

  return <NestedCollapsibleContainer rootItem={nestedData} />;
}`
  },

  multiple: {
    react: `import { Collapsible, Button, Card } from '@shopify/polaris';
import { useState } from 'react';

function MultipleCollapsibles() {
  const [openStates, setOpenStates] = useState({
    shipping: false,
    payment: false,
    returns: false
  });

  const toggle = (key: string) => {
    setOpenStates(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Card>
        <Button onClick={() => toggle('shipping')}>Shipping Details</Button>
        <Collapsible open={openStates.shipping} id="shipping" transition>
          <p>Free shipping on orders over $50</p>
        </Collapsible>
      </Card>
      <Card>
        <Button onClick={() => toggle('payment')}>Payment Options</Button>
        <Collapsible open={openStates.payment} id="payment" transition>
          <p>We accept credit cards and PayPal</p>
        </Collapsible>
      </Card>
      <Card>
        <Button onClick={() => toggle('returns')}>Return Policy</Button>
        <Collapsible open={openStates.returns} id="returns" transition>
          <p>30-day return policy on all items</p>
        </Collapsible>
      </Card>
    </div>
  );
}`,

    extjs: `// ExtJS multiple independent collapsible panels
Ext.create('Ext.container.Container', {
  width: 400,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'panel',
    title: 'Shipping Details',
    collapsible: true,
    collapsed: false,
    html: 'Free shipping on orders over $50',
    margin: '0 0 10 0'
  }, {
    xtype: 'panel',
    title: 'Payment Options',
    collapsible: true,
    collapsed: true,
    html: 'We accept credit cards and PayPal',
    margin: '0 0 10 0'
  }, {
    xtype: 'panel',
    title: 'Return Policy',
    collapsible: true,
    collapsed: true,
    html: '30-day return policy on all items',
    margin: '0 0 10 0'
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="multiple-collapsibles">
  <div class="collapsible-section">
    <button class="section-toggle" data-target="shipping">Shipping Details</button>
    <div id="shipping" class="section-content" hidden>
      <p>Free shipping on orders over $50</p>
    </div>
  </div>
  <div class="collapsible-section">
    <button class="section-toggle" data-target="payment">Payment Options</button>
    <div id="payment" class="section-content" hidden>
      <p>We accept credit cards and PayPal</p>
    </div>
  </div>
  <div class="collapsible-section">
    <button class="section-toggle" data-target="returns">Return Policy</button>
    <div id="returns" class="section-content" hidden>
      <p>30-day return policy on all items</p>
    </div>
  </div>
</div>

<style>
.collapsible-section {
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 12px;
}

.section-content {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}
</style>

<script>
import { on, $$ } from '@cin7/vanilla-js';

const toggles = $$('.section-toggle');

toggles.forEach(toggle => {
  on(toggle, 'click', () => {
    const targetId = toggle.dataset.target;
    const content = document.getElementById(targetId);
    content.toggleAttribute('hidden');
  });
});
</script>`,

    typescript: `import { Collapsible, Button, Card } from '@shopify/polaris';
import { useState, useCallback } from 'react';

/**
 * Individual collapsible group item
 */
interface CollapsibleGroupItem {
  id: string;
  title: string;
  content: string;
  defaultOpen?: boolean;
}

/**
 * State map for tracking multiple collapsibles
 */
type CollapsibleStateMap = Record<string, boolean>;

/**
 * Individual item tracking with metadata
 */
interface CollapsibleItemState {
  isOpen: boolean;
  openCount: number;
  lastOpened: Date | null;
}

/**
 * Complete state tracking for all items
 */
type CollapsibleGroupState = Record<string, CollapsibleItemState>;

/**
 * Props for multiple collapsibles component
 */
interface MultipleCollapsiblesProps {
  items: CollapsibleGroupItem[];
  onItemToggle?: (itemId: string, isOpen: boolean) => void;
  onGroupStateChange?: (state: CollapsibleGroupState) => void;
}

/**
 * Component managing multiple independent collapsibles
 */
function MultipleCollapsibles({
  items,
  onItemToggle,
  onGroupStateChange
}: MultipleCollapsiblesProps): JSX.Element {
  // Initialize state with default values
  const [groupState, setGroupState] = useState<CollapsibleGroupState>(() =>
    items.reduce((acc, item) => ({
      ...acc,
      [item.id]: {
        isOpen: item.defaultOpen ?? false,
        openCount: 0,
        lastOpened: null
      }
    }), {})
  );

  const handleToggle = useCallback((itemId: string) => {
    setGroupState(prev => {
      const currentState = prev[itemId];
      const newIsOpen = !currentState.isOpen;

      const newState: CollapsibleGroupState = {
        ...prev,
        [itemId]: {
          isOpen: newIsOpen,
          openCount: currentState.openCount + (newIsOpen ? 1 : 0),
          lastOpened: newIsOpen ? new Date() : currentState.lastOpened
        }
      };

      onItemToggle?.(itemId, newIsOpen);
      onGroupStateChange?.(newState);

      return newState;
    });
  }, [onItemToggle, onGroupStateChange]);

  const toggleAll = useCallback((open: boolean) => {
    setGroupState(prev => {
      const newState: CollapsibleGroupState = {};

      Object.keys(prev).forEach(itemId => {
        newState[itemId] = {
          isOpen: open,
          openCount: prev[itemId].openCount + (open && !prev[itemId].isOpen ? 1 : 0),
          lastOpened: open ? new Date() : prev[itemId].lastOpened
        };
      });

      onGroupStateChange?.(newState);

      return newState;
    });
  }, [onGroupStateChange]);

  const openCount = Object.values(groupState).filter(state => state.isOpen).length;
  const totalOpenCount = Object.values(groupState).reduce((sum, state) => sum + state.openCount, 0);

  return (
    <div>
      <div style={{
        marginBottom: '16px',
        display: 'flex',
        gap: '8px',
        alignItems: 'center'
      }}>
        <Button onClick={() => toggleAll(true)} size="slim">
          Expand All
        </Button>
        <Button onClick={() => toggleAll(false)} size="slim">
          Collapse All
        </Button>
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#666' }}>
          {openCount} of {items.length} open
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item) => {
          const itemState = groupState[item.id];

          return (
            <Card key={item.id} sectioned>
              <div style={{ marginBottom: '8px' }}>
                <Button
                  onClick={() => handleToggle(item.id)}
                  ariaExpanded={itemState.isOpen}
                  ariaControls={\`collapsible-\${item.id}\`}
                  plain
                  fullWidth
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <span>{item.title}</span>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                      ({itemState.openCount} views)
                    </span>
                  </div>
                </Button>
              </div>

              <Collapsible
                open={itemState.isOpen}
                id={\`collapsible-\${item.id}\`}
                transition
              >
                <div style={{ paddingTop: '8px', borderTop: '1px solid #ddd' }}>
                  <p>{item.content}</p>
                  {itemState.lastOpened && (
                    <p style={{ marginTop: '8px', fontSize: '11px', color: '#999' }}>
                      Last opened: {itemState.lastOpened.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        <p>Total expansions across all items: {totalOpenCount}</p>
      </div>
    </div>
  );
}

// Usage example
function MultipleExample() {
  const items: CollapsibleGroupItem[] = [
    { id: 'shipping', title: 'Shipping Details', content: 'Free shipping on orders over $50' },
    { id: 'payment', title: 'Payment Options', content: 'We accept credit cards and PayPal' },
    { id: 'returns', title: 'Return Policy', content: '30-day return policy on all items', defaultOpen: true }
  ];

  return (
    <MultipleCollapsibles
      items={items}
      onItemToggle={(id, isOpen) => console.log(\`\${id}: \${isOpen}\`)}
    />
  );
}`
  },

  forms: {
    react: `import { Collapsible, Button, TextField, FormLayout } from '@shopify/polaris';
import { useState } from 'react';

function FormWithCollapsible() {
  const [showBilling, setShowBilling] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    billingAddress: ''
  });

  return (
    <FormLayout>
      <TextField
        label="Name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
      />
      <TextField
        label="Email"
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
      />

      <Button onClick={() => setShowBilling(!showBilling)}>
        {showBilling ? 'Hide' : 'Show'} Billing Address
      </Button>

      <Collapsible open={showBilling} id="billing-section" transition>
        <TextField
          label="Billing Address"
          value={formData.billingAddress}
          onChange={(value) => setFormData({ ...formData, billingAddress: value })}
          multiline={3}
        />
      </Collapsible>
    </FormLayout>
  );
}`,

    extjs: `// ExtJS Form with collapsible fieldsets
Ext.create('Ext.form.Panel', {
  title: 'User Registration',
  width: 400,
  bodyPadding: 10,
  items: [{
    xtype: 'textfield',
    fieldLabel: 'Name',
    name: 'name'
  }, {
    xtype: 'textfield',
    fieldLabel: 'Email',
    name: 'email'
  }, {
    xtype: 'fieldset',
    title: 'Billing Information',
    collapsible: true,
    collapsed: true,
    items: [{
      xtype: 'textarea',
      fieldLabel: 'Billing Address',
      name: 'billingAddress',
      height: 60
    }]
  }],
  buttons: [{
    text: 'Submit',
    handler: function() {
      this.up('form').getForm().submit();
    }
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<form class="form-with-collapsible">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" />
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" />
  </div>

  <button type="button" id="toggle-billing">Show Billing Address</button>

  <div id="billing-section" class="collapsible-form-section" hidden>
    <div class="form-group">
      <label for="billing">Billing Address</label>
      <textarea id="billing" name="billing" rows="3"></textarea>
    </div>
  </div>

  <button type="submit">Submit</button>
</form>

<style>
.form-group {
  margin-bottom: 16px;
}

.collapsible-form-section {
  padding: 16px;
  background: #f9f9f9;
  border-radius: 4px;
  margin: 16px 0;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

<script>
import { on, $ } from '@cin7/vanilla-js';

const toggle = $('#toggle-billing');
const section = $('#billing-section');

on(toggle, 'click', () => {
  const isHidden = section.hasAttribute('hidden');
  section.toggleAttribute('hidden');
  toggle.textContent = isHidden ? 'Hide Billing Address' : 'Show Billing Address';
});
</script>`,

    typescript: `import { Collapsible, Button, TextField, FormLayout, Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

/**
 * Form field configuration
 */
interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  options?: Array<{ label: string; value: string }>;
}

/**
 * Form section configuration
 */
interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

/**
 * Validation state for a field
 */
interface FieldValidation {
  isValid: boolean;
  error?: string;
}

/**
 * Form validation state per section
 */
type SectionValidationState = Record<string, Record<string, FieldValidation>>;

/**
 * Form data values
 */
type FormData = Record<string, string>;

/**
 * Props for form with collapsible sections
 */
interface CollapsibleFormProps {
  sections: FormSection[];
  onSubmit: (data: FormData) => void;
  onValidationChange?: (validation: SectionValidationState) => void;
}

/**
 * Form with collapsible sections and validation
 */
function CollapsibleForm({
  sections,
  onSubmit,
  onValidationChange
}: CollapsibleFormProps): JSX.Element {
  const [formData, setFormData] = useState<FormData>({});
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(sections.filter(s => s.defaultOpen).map(s => s.id))
  );
  const [validationState, setValidationState] = useState<SectionValidationState>({});

  const validateField = useCallback((field: FormField, value: string): FieldValidation => {
    if (field.required && !value.trim()) {
      return { isValid: false, error: \`\${field.label} is required\` };
    }

    if (field.type === 'email' && value && !value.includes('@')) {
      return { isValid: false, error: 'Invalid email address' };
    }

    return { isValid: true };
  }, []);

  const handleFieldChange = useCallback((sectionId: string, fieldName: string, value: string, field: FormField) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));

    const validation = validateField(field, value);

    setValidationState(prev => {
      const newState = {
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          [fieldName]: validation
        }
      };

      onValidationChange?.(newState);

      return newState;
    });
  }, [validateField, onValidationChange]);

  const toggleSection = useCallback((sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    // Validate all fields before submit
    let allValid = true;
    const newValidation: SectionValidationState = {};

    sections.forEach(section => {
      newValidation[section.id] = {};
      section.fields.forEach(field => {
        const value = formData[field.name] || '';
        const validation = validateField(field, value);
        newValidation[section.id][field.name] = validation;

        if (!validation.isValid) {
          allValid = false;
          // Open section with errors
          setOpenSections(prev => new Set(prev).add(section.id));
        }
      });
    });

    setValidationState(newValidation);
    onValidationChange?.(newValidation);

    if (allValid) {
      onSubmit(formData);
    }
  }, [sections, formData, validateField, onSubmit, onValidationChange]);

  const renderField = (sectionId: string, field: FormField) => {
    const value = formData[field.name] || '';
    const validation = validationState[sectionId]?.[field.name];

    const commonProps = {
      label: field.label,
      value,
      error: validation?.error,
      requiredIndicator: field.required
    };

    if (field.type === 'select' && field.options) {
      return (
        <Select
          {...commonProps}
          options={field.options}
          onChange={(value) => handleFieldChange(sectionId, field.name, value, field)}
        />
      );
    }

    return (
      <TextField
        {...commonProps}
        type={field.type}
        multiline={field.type === 'textarea' ? 3 : undefined}
        onChange={(value) => handleFieldChange(sectionId, field.name, value, field)}
      />
    );
  };

  return (
    <div>
      <FormLayout>
        {sections.map(section => {
          const isOpen = openSections.has(section.id);
          const sectionErrors = Object.values(validationState[section.id] || {})
            .filter(v => !v.isValid).length;

          return (
            <div key={section.id}>
              {section.collapsible ? (
                <>
                  <Button
                    onClick={() => toggleSection(section.id)}
                    ariaExpanded={isOpen}
                    ariaControls={\`section-\${section.id}\`}
                    fullWidth
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%'
                    }}>
                      <span>{section.title}</span>
                      {sectionErrors > 0 && (
                        <span style={{ color: '#d72c0d' }}>
                          {sectionErrors} error{sectionErrors !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </Button>
                  <Collapsible
                    open={isOpen}
                    id={\`section-\${section.id}\`}
                    transition
                  >
                    <div style={{ marginTop: '12px' }}>
                      <FormLayout>
                        {section.fields.map(field => (
                          <div key={field.name}>
                            {renderField(section.id, field)}
                          </div>
                        ))}
                      </FormLayout>
                    </div>
                  </Collapsible>
                </>
              ) : (
                <FormLayout>
                  {section.fields.map(field => (
                    <div key={field.name}>
                      {renderField(section.id, field)}
                    </div>
                  ))}
                </FormLayout>
              )}
            </div>
          );
        })}
      </FormLayout>

      <div style={{ marginTop: '16px' }}>
        <Button primary onClick={handleSubmit}>
          Submit Form
        </Button>
      </div>
    </div>
  );
}

// Usage example
function FormExample() {
  const sections: FormSection[] = [
    {
      id: 'basic',
      title: 'Basic Information',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true }
      ]
    },
    {
      id: 'billing',
      title: 'Billing Information',
      collapsible: true,
      defaultOpen: false,
      fields: [
        { name: 'address', label: 'Billing Address', type: 'textarea', required: true },
        { name: 'country', label: 'Country', type: 'select', required: true, options: [
          { label: 'United States', value: 'US' },
          { label: 'Canada', value: 'CA' }
        ]}
      ]
    }
  ];

  return (
    <CollapsibleForm
      sections={sections}
      onSubmit={(data) => console.log('Form submitted:', data)}
      onValidationChange={(validation) => console.log('Validation:', validation)}
    />
  );
}`
  },

  progressive: {
    react: `import { Collapsible, Button, TextContainer } from '@shopify/polaris';
import { useState } from 'react';

function ProgressiveDisclosure() {
  const [showMore, setShowMore] = useState(false);

  return (
    <TextContainer>
      <p>
        This is the initial content that is always visible.
        It provides the essential information users need.
      </p>

      <Collapsible open={showMore} id="additional-content" transition>
        <p>
          Additional details appear here when the user requests more information.
          This pattern is useful for keeping the interface clean while still
          providing access to comprehensive details when needed.
        </p>
        <p>
          You can include as much additional content as needed without
          overwhelming the initial view.
        </p>
      </Collapsible>

      <Button plain onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show less' : 'Show more'}
      </Button>
    </TextContainer>
  );
}`,

    extjs: `// ExtJS Panel with progressive disclosure
Ext.create('Ext.panel.Panel', {
  title: 'Product Description',
  width: 400,
  html:
    '<div style="padding: 16px;">' +
    '<p>This is the initial content that is always visible.</p>' +
    '<div id="extra-content" style="display: none;">' +
    '<p>Additional details appear here when requested.</p>' +
    '</div>' +
    '</div>',
  buttons: [{
    text: 'Show more',
    id: 'toggle-btn',
    handler: function() {
      const extraContent = Ext.get('extra-content');
      const btn = Ext.getCmp('toggle-btn');

      if (extraContent.isVisible()) {
        extraContent.hide();
        btn.setText('Show more');
      } else {
        extraContent.show();
        btn.setText('Show less');
      }
    }
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="progressive-disclosure">
  <p class="preview-content">
    This is the initial content that is always visible.
    It provides the essential information users need.
  </p>

  <div id="additional-content" class="additional-content" hidden>
    <p>
      Additional details appear here when the user requests more information.
      This pattern is useful for keeping the interface clean.
    </p>
  </div>

  <button id="toggle-disclosure" class="disclosure-toggle">
    Show more
  </button>
</div>

<style>
.progressive-disclosure {
  max-width: 600px;
  line-height: 1.6;
}

.additional-content {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.disclosure-toggle {
  margin-top: 12px;
  color: #0066cc;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}
</style>

<script>
import { on, $ } from '@cin7/vanilla-js';

const toggle = $('#toggle-disclosure');
const content = $('#additional-content');

on(toggle, 'click', () => {
  const isHidden = content.hasAttribute('hidden');

  content.toggleAttribute('hidden');
  toggle.textContent = isHidden ? 'Show less' : 'Show more';
});
</script>`,

    typescript: `import { Collapsible, Button, TextContainer } from '@shopify/polaris';
import { useState, useCallback, ReactNode, useMemo } from 'react';

/**
 * Progressive disclosure state
 */
enum ProgressiveState {
  COLLAPSED = 'collapsed',
  PARTIAL = 'partial',
  EXPANDED = 'expanded'
}

/**
 * Content threshold configuration
 */
interface ContentThreshold {
  previewLength: number; // Characters to show in preview
  partialLength?: number; // Characters for partial state
  showCharCount?: boolean; // Show character count
}

/**
 * Props for progressive disclosure
 */
interface ProgressiveDisclosureProps {
  content: string | ReactNode;
  threshold?: ContentThreshold;
  onStateChange?: (state: ProgressiveState) => void;
}

/**
 * Default thresholds
 */
const DEFAULT_THRESHOLD: ContentThreshold = {
  previewLength: 150,
  partialLength: 300,
  showCharCount: true
};

/**
 * Progressive disclosure component with multi-level expansion
 */
function ProgressiveDisclosure({
  content,
  threshold = DEFAULT_THRESHOLD,
  onStateChange
}: ProgressiveDisclosureProps): JSX.Element {
  const [state, setState] = useState<ProgressiveState>(ProgressiveState.COLLAPSED);

  const config = useMemo(() => ({
    ...DEFAULT_THRESHOLD,
    ...threshold
  }), [threshold]);

  const contentString = typeof content === 'string' ? content : '';
  const totalLength = contentString.length;

  const { previewContent, partialContent, fullContent } = useMemo(() => {
    if (typeof content !== 'string') {
      return { previewContent: content, partialContent: content, fullContent: content };
    }

    return {
      previewContent: content.substring(0, config.previewLength),
      partialContent: config.partialLength ? content.substring(0, config.partialLength) : content,
      fullContent: content
    };
  }, [content, config]);

  const handleToggle = useCallback(() => {
    let newState: ProgressiveState;

    if (state === ProgressiveState.COLLAPSED) {
      newState = config.partialLength && totalLength > config.partialLength
        ? ProgressiveState.PARTIAL
        : ProgressiveState.EXPANDED;
    } else if (state === ProgressiveState.PARTIAL) {
      newState = ProgressiveState.EXPANDED;
    } else {
      newState = ProgressiveState.COLLAPSED;
    }

    setState(newState);
    onStateChange?.(newState);
  }, [state, config.partialLength, totalLength, onStateChange]);

  const getButtonText = useCallback((): string => {
    if (state === ProgressiveState.COLLAPSED) {
      return 'Show more';
    } else if (state === ProgressiveState.PARTIAL) {
      return 'Show all';
    } else {
      return 'Show less';
    }
  }, [state]);

  const getDisplayContent = useCallback((): ReactNode => {
    if (typeof content !== 'string') {
      return content;
    }

    switch (state) {
      case ProgressiveState.COLLAPSED:
        return previewContent + (totalLength > config.previewLength ? '...' : '');
      case ProgressiveState.PARTIAL:
        return partialContent + (totalLength > (config.partialLength || 0) ? '...' : '');
      case ProgressiveState.EXPANDED:
        return fullContent;
    }
  }, [content, state, previewContent, partialContent, fullContent, totalLength, config]);

  const remainingChars = useMemo(() => {
    if (state === ProgressiveState.COLLAPSED) {
      return totalLength - config.previewLength;
    } else if (state === ProgressiveState.PARTIAL && config.partialLength) {
      return totalLength - config.partialLength;
    }
    return 0;
  }, [state, totalLength, config]);

  // Don't show toggle if content is shorter than preview
  const showToggle = totalLength > config.previewLength;

  return (
    <div className="progressive-disclosure">
      <TextContainer>
        <div>
          {getDisplayContent()}
        </div>
      </TextContainer>

      {showToggle && (
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button plain onClick={handleToggle}>
            {getButtonText()}
          </Button>

          {config.showCharCount && remainingChars > 0 && (
            <span style={{ fontSize: '12px', color: '#666' }}>
              ({remainingChars} more characters)
            </span>
          )}
        </div>
      )}

      {config.showCharCount && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          background: '#f5f5f5',
          borderRadius: '4px',
          fontSize: '11px',
          color: '#666'
        }}>
          State: {state} | Total: {totalLength} chars
        </div>
      )}
    </div>
  );
}

/**
 * Advanced progressive disclosure with custom content sections
 */
interface ProgressiveSection {
  id: string;
  content: ReactNode;
  level: number; // Disclosure level (1, 2, 3...)
}

interface ProgressiveSectionsProps {
  sections: ProgressiveSection[];
  initialLevel?: number;
}

function ProgressiveSections({
  sections,
  initialLevel = 1
}: ProgressiveSectionsProps): JSX.Element {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);

  const maxLevel = Math.max(...sections.map(s => s.level));
  const visibleSections = sections.filter(s => s.level <= currentLevel);

  const canExpand = currentLevel < maxLevel;
  const canCollapse = currentLevel > 1;

  return (
    <div>
      <TextContainer>
        {visibleSections.map(section => (
          <div key={section.id} style={{
            marginLeft: \`\${(section.level - 1) * 16}px\`,
            marginTop: section.level > 1 ? '12px' : '0'
          }}>
            {section.content}
          </div>
        ))}
      </TextContainer>

      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        {canExpand && (
          <Button onClick={() => setCurrentLevel(currentLevel + 1)}>
            Show more details (Level {currentLevel + 1})
          </Button>
        )}
        {canCollapse && (
          <Button plain onClick={() => setCurrentLevel(currentLevel - 1)}>
            Show less
          </Button>
        )}
      </div>

      <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
        Showing {visibleSections.length} of {sections.length} sections (Level {currentLevel}/{maxLevel})
      </p>
    </div>
  );
}

// Usage examples
function ProgressiveExample() {
  const longText = "This is the initial content that is always visible. ".repeat(20);

  return (
    <>
      <ProgressiveDisclosure
        content={longText}
        threshold={{
          previewLength: 100,
          partialLength: 200,
          showCharCount: true
        }}
        onStateChange={(state) => console.log('State changed to:', state)}
      />
    </>
  );
}`
  },

  animation: {
    react: `import { Collapsible, Button } from '@shopify/polaris';
import { useState } from 'react';

function AnimatedCollapsible() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(!open)}>
        Toggle Animation
      </Button>
      <Collapsible
        open={open}
        id="animated-collapsible"
        transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
        expandOnPrint
      >
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '8px',
          marginTop: '12px'
        }}>
          <h3>Animated Content</h3>
          <p>This content animates smoothly when expanding and collapsing.</p>
        </div>
      </Collapsible>
    </>
  );
}`,

    extjs: `// ExtJS Panel with custom animation
Ext.create('Ext.panel.Panel', {
  title: 'Animated Collapsible',
  width: 400,
  collapsible: true,
  animCollapse: true,
  collapsed: false,
  // Custom animation configuration
  collapseMode: 'mini',
  listeners: {
    beforecollapse: function(panel) {
      panel.body.fadeOut({
        duration: 500,
        easing: 'easeOut'
      });
    },
    beforeexpand: function(panel) {
      panel.body.fadeIn({
        duration: 500,
        easing: 'easeIn'
      });
    }
  },
  html:
    '<div style="padding: 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">' +
    '<h3>Animated Content</h3>' +
    '<p>This content animates smoothly when expanding and collapsing.</p>' +
    '</div>',
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="animated-collapsible">
  <button id="animation-toggle" class="toggle-btn">
    Toggle Animation
  </button>

  <div id="animated-content" class="animated-content" hidden>
    <h3>Animated Content</h3>
    <p>This content animates smoothly when expanding and collapsing.</p>
  </div>
</div>

<style>
.animated-content {
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
  margin-top: 12px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 500ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 500ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(-10px);
}

.animated-content.open {
  max-height: 500px;
  opacity: 1;
  transform: translateY(0);
}
</style>

<script>
import { on, $, toggleClass } from '@cin7/vanilla-js';

const toggle = $('#animation-toggle');
const content = $('#animated-content');

on(toggle, 'click', () => {
  const isOpen = content.classList.contains('open');

  if (isOpen) {
    toggleClass(content, 'open');
    // Wait for animation to complete before hiding
    setTimeout(() => {
      content.setAttribute('hidden', '');
    }, 500);
  } else {
    content.removeAttribute('hidden');
    // Trigger reflow to enable CSS transition
    content.offsetHeight;
    toggleClass(content, 'open');
  }
});
</script>`,

    typescript: `import { Collapsible, Button } from '@shopify/polaris';
import { useState, useCallback, CSSProperties } from 'react';

/**
 * Animation easing functions
 */
type EasingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'cubic-bezier';

/**
 * Cubic bezier configuration
 */
interface CubicBezier {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Animation timing configuration
 */
interface AnimationTiming {
  duration: number; // in milliseconds
  easing: EasingFunction;
  cubicBezier?: CubicBezier;
  delay?: number;
}

/**
 * Animation state
 */
enum AnimationState {
  IDLE = 'idle',
  EXPANDING = 'expanding',
  EXPANDED = 'expanded',
  COLLAPSING = 'collapsing',
  COLLAPSED = 'collapsed'
}

/**
 * Animation configuration presets
 */
const ANIMATION_PRESETS: Record<string, AnimationTiming> = {
  default: {
    duration: 300,
    easing: 'ease-in-out'
  },
  slow: {
    duration: 600,
    easing: 'ease-out'
  },
  fast: {
    duration: 150,
    easing: 'ease-in'
  },
  bounce: {
    duration: 500,
    easing: 'cubic-bezier',
    cubicBezier: { x1: 0.68, y1: -0.55, x2: 0.265, y2: 1.55 }
  },
  smooth: {
    duration: 400,
    easing: 'cubic-bezier',
    cubicBezier: { x1: 0.4, y1: 0, x2: 0.2, y2: 1 }
  }
};

/**
 * Props for animated collapsible
 */
interface AnimatedCollapsibleProps {
  children: React.ReactNode;
  animationPreset?: keyof typeof ANIMATION_PRESETS;
  customAnimation?: AnimationTiming;
  onAnimationStart?: (state: AnimationState) => void;
  onAnimationEnd?: (state: AnimationState) => void;
}

/**
 * Animated collapsible component with custom timing
 */
function AnimatedCollapsible({
  children,
  animationPreset = 'default',
  customAnimation,
  onAnimationStart,
  onAnimationEnd
}: AnimatedCollapsibleProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [animState, setAnimState] = useState<AnimationState>(AnimationState.COLLAPSED);

  const animation = customAnimation || ANIMATION_PRESETS[animationPreset];

  const getTimingFunction = useCallback((): string => {
    if (animation.easing === 'cubic-bezier' && animation.cubicBezier) {
      const { x1, y1, x2, y2 } = animation.cubicBezier;
      return \`cubic-bezier(\${x1}, \${y1}, \${x2}, \${y2})\`;
    }
    return animation.easing;
  }, [animation]);

  const handleToggle = useCallback(() => {
    const newOpen = !open;
    const newAnimState = newOpen ? AnimationState.EXPANDING : AnimationState.COLLAPSING;

    setAnimState(newAnimState);
    onAnimationStart?.(newAnimState);

    setOpen(newOpen);

    // Simulate animation end
    setTimeout(() => {
      const endState = newOpen ? AnimationState.EXPANDED : AnimationState.COLLAPSED;
      setAnimState(endState);
      onAnimationEnd?.(endState);
    }, animation.duration + (animation.delay || 0));
  }, [open, animation, onAnimationStart, onAnimationEnd]);

  const contentStyle: CSSProperties = {
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '8px',
    marginTop: '12px'
  };

  return (
    <div className="animated-collapsible-wrapper">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Button onClick={handleToggle}>
          {open ? 'Collapse' : 'Expand'} ({animationPreset})
        </Button>
        <span style={{ fontSize: '12px', color: '#666' }}>
          State: {animState}
        </span>
      </div>

      <Collapsible
        open={open}
        id={\`collapsible-\${animationPreset}\`}
        transition={{
          duration: \`\${animation.duration}ms\`,
          timingFunction: getTimingFunction()
        }}
      >
        <div style={contentStyle}>
          {children}
        </div>
      </Collapsible>
    </div>
  );
}

/**
 * Animation showcase component
 */
function AnimationShowcase(): JSX.Element {
  const [logs, setLogs] = useState<string[]>([]);

  const handleAnimationEvent = useCallback((preset: string, event: string, state: AnimationState) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, \`[\${timestamp}] \${preset}: \${event} - \${state}\`].slice(-10));
  }, []);

  return (
    <div>
      <h2>Animation Presets Showcase</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px' }}>
        {Object.keys(ANIMATION_PRESETS).map(preset => (
          <AnimatedCollapsible
            key={preset}
            animationPreset={preset as keyof typeof ANIMATION_PRESETS}
            onAnimationStart={(state) => handleAnimationEvent(preset, 'start', state)}
            onAnimationEnd={(state) => handleAnimationEvent(preset, 'end', state)}
          >
            <div>
              <h3 style={{ marginTop: 0 }}>{preset.charAt(0).toUpperCase() + preset.slice(1)} Animation</h3>
              <p>Duration: {ANIMATION_PRESETS[preset].duration}ms</p>
              <p>Easing: {ANIMATION_PRESETS[preset].easing}</p>
            </div>
          </AnimatedCollapsible>
        ))}
      </div>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '4px',
        maxHeight: '200px',
        overflow: 'auto'
      }}>
        <h3 style={{ marginTop: 0, fontSize: '14px' }}>Animation Event Log</h3>
        {logs.map((log, i) => (
          <div key={i} style={{ fontSize: '11px', fontFamily: 'monospace', marginBottom: '4px' }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}

// Usage example with custom animation
function CustomAnimationExample() {
  const customTiming: AnimationTiming = {
    duration: 800,
    easing: 'cubic-bezier',
    cubicBezier: { x1: 0.34, y1: 1.56, x2: 0.64, y2: 1 },
    delay: 100
  };

  return (
    <>
      <AnimationShowcase />

      <div style={{ marginTop: '32px' }}>
        <h3>Custom Animation</h3>
        <AnimatedCollapsible customAnimation={customTiming}>
          <p>This uses a custom cubic-bezier animation with 800ms duration and 100ms delay.</p>
        </AnimatedCollapsible>
      </div>
    </>
  );
}`
  }
};

// TextContainer Component Examples

export const textContainerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { TextContainer } from '@shopify/polaris';

function TextContainerExample() {
  return (
    <TextContainer>
      <h2>Welcome to Our Platform</h2>
      <p>
        This text container provides optimal reading width for your content.
        It ensures that lines of text don't become too long, which improves
        readability and user experience.
      </p>
    </TextContainer>
  );
}`,

    extjs: `// ExtJS Panel with constrained text width
Ext.create('Ext.panel.Panel', {
  title: 'Text Content',
  width: 600,
  bodyPadding: 20,
  style: {
    maxWidth: '65ch' // Optimal reading width
  },
  html:
    '<h2>Welcome to Our Platform</h2>' +
    '<p style="line-height: 1.6;">' +
    'This text container provides optimal reading width for your content. ' +
    'It ensures that lines of text don\\'t become too long, which improves ' +
    'readability and user experience.' +
    '</p>',
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="text-container">
  <h2>Welcome to Our Platform</h2>
  <p>
    This text container provides optimal reading width for your content.
    It ensures that lines of text don't become too long, which improves
    readability and user experience.
  </p>
</div>

<style>
.text-container {
  max-width: 65ch; /* Optimal reading width */
  margin: 0 auto;
  padding: 20px;
  line-height: 1.6;
}

.text-container h2 {
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
}

.text-container p {
  color: #374151;
  margin-bottom: 16px;
}

.text-container p + p {
  margin-top: 16px;
}
</style>`,

    typescript: `import { TextContainer } from '@shopify/polaris';
import { ReactNode } from 'react';

interface TextContainerExampleProps {
  spacing?: boolean;
  children: ReactNode;
}

function TextContainerExample({
  spacing = false,
  children
}: TextContainerExampleProps): JSX.Element {
  return (
    <TextContainer spacing={spacing}>
      {children || (
        <>
          <h2>Welcome to Our Platform</h2>
          <p>
            This text container provides optimal reading width for your content.
            It ensures that lines of text don't become too long, which improves
            readability and user experience.
          </p>
        </>
      )}
    </TextContainer>
  );
}`
  }
};

// AppProvider Component Examples

export const blockstackExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { BlockStack, Text } from '@shopify/polaris';
import React from 'react';

function BlockStackExample() {
  return (
    <BlockStack gap="400">
      <Text as="h2" variant="headingMd">Order Information</Text>
      <Text as="p">Customer: John Doe</Text>
      <Text as="p">Order #1001</Text>
      <Text as="p">Status: Processing</Text>
    </BlockStack>
  );
}

export default BlockStackExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-block-stack" data-gap="400">
  <h2 class="polaris-text--heading-md">Order Information</h2>
  <p>Customer: John Doe</p>
  <p>Order #1001</p>
  <p>Status: Processing</p>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createBlockStack } from '@cin7/vanilla-js';

const stack = createBlockStack({
  gap: '400',
  children: [
    { type: 'heading', text: 'Order Information', variant: 'headingMd' },
    { type: 'text', text: 'Customer: John Doe' },
    { type: 'text', text: 'Order #1001' },
    { type: 'text', text: 'Status: Processing' }
  ]
});

document.getElementById('app').appendChild(stack);
</script>`,

    extjs: `// ExtJS Container with vertical layout
Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch',
    gap: 16
  },
  items: [{
    xtype: 'component',
    html: '<h2>Order Information</h2>',
    cls: 'polaris-heading-md'
  }, {
    xtype: 'component',
    html: 'Customer: John Doe'
  }, {
    xtype: 'component',
    html: 'Order #1001'
  }, {
    xtype: 'component',
    html: 'Status: Processing'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { BlockStack, Text } from '@shopify/polaris';
import React from 'react';

interface BlockStackExampleProps {
  orderNumber: string;
  customerName: string;
  status: string;
  gap?: '100' | '200' | '400' | '500' | '800';
}

function BlockStackExample({
  orderNumber,
  customerName,
  status,
  gap = '400'
}: BlockStackExampleProps): JSX.Element {
  return (
    <BlockStack gap={gap}>
      <Text as="h2" variant="headingMd">Order Information</Text>
      <Text as="p">Customer: {customerName}</Text>
      <Text as="p">Order #{orderNumber}</Text>
      <Text as="p">Status: {status}</Text>
    </BlockStack>
  );
}

export default BlockStackExample;`,
  }
};

// Layout Component Examples - Layout

export const layoutExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function LayoutExample() {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Main Content Area</Text>
          <Text as="p" variant="bodyMd">
            This is the primary content section where the main information and functionality resides.
          </Text>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Secondary Content</Text>
          <Text as="p" variant="bodySm">
            This sidebar section contains supplementary information and actions.
          </Text>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default LayoutExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-layout">
  <div class="polaris-layout__section">
    <div class="polaris-card polaris-card--sectioned">
      <h2 class="polaris-text--heading-lg">Main Content Area</h2>
      <p class="polaris-text--body-md">
        This is the primary content section where the main information and functionality resides.
      </p>
    </div>
  </div>

  <div class="polaris-layout__section polaris-layout__section--secondary">
    <div class="polaris-card polaris-card--sectioned">
      <h3 class="polaris-text--heading-md">Secondary Content</h3>
      <p class="polaris-text--body-sm">
        This sidebar section contains supplementary information and actions.
      </p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createLayout } from '@cin7/vanilla-js';

const layout = createLayout({
  sections: [
    {
      primary: true,
      content: {
        type: 'card',
        title: 'Main Content Area',
        content: 'This is the primary content section...'
      }
    },
    {
      secondary: true,
      content: {
        type: 'card',
        title: 'Secondary Content',
        content: 'This sidebar section...'
      }
    }
  ]
});

document.getElementById('app').appendChild(layout);
</script>`,

    extjs: `// ExtJS Border Layout
Ext.create('Ext.panel.Panel', {
  layout: 'border',
  width: '100%',
  height: 600,
  items: [{
    region: 'center',
    xtype: 'panel',
    title: 'Main Content Area',
    html: 'This is the primary content section where the main information and functionality resides.',
    padding: 16
  }, {
    region: 'east',
    xtype: 'panel',
    title: 'Secondary Content',
    html: 'This sidebar section contains supplementary information and actions.',
    width: 300,
    padding: 16,
    collapsible: true
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface LayoutExampleProps {
  mainTitle: string;
  mainContent: string;
  sidebarTitle: string;
  sidebarContent: string;
}

function LayoutExample({
  mainTitle,
  mainContent,
  sidebarTitle,
  sidebarContent
}: LayoutExampleProps): JSX.Element {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">{mainTitle}</Text>
          <Text as="p" variant="bodyMd">{mainContent}</Text>
        </Card>
      </Layout.Section>

      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">{sidebarTitle}</Text>
          <Text as="p" variant="bodySm">{sidebarContent}</Text>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default LayoutExample;`,
  }
};

// Page Component Examples - Layout

export const pageExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function PageExample() {
  return (
    <Page
      title="Products"
      primaryAction={{
        content: 'Add product',
        onAction: () => console.log('Add product clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page-header">
    <h1 class="polaris-page-header__title">Products</h1>
    <div class="polaris-page-header__actions">
      <button class="polaris-button polaris-button--primary">Add product</button>
    </div>
  </div>

  <div class="polaris-page__content">
    <div class="polaris-card polaris-card--sectioned">
      <p>Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createPage } from '@cin7/vanilla-js';

const page = createPage({
  title: 'Products',
  primaryAction: {
    content: 'Add product',
    onClick: () => console.log('Add product clicked')
  },
  content: {
    type: 'card',
    content: 'Manage your product catalog here...'
  }
});

document.getElementById('app').appendChild(page);
</script>`,

    extjs: `// ExtJS Panel with Page structure
Ext.create('Ext.panel.Panel', {
  title: 'Products',
  layout: 'fit',
  width: '100%',
  height: 600,
  tbar: [{
    xtype: 'tbfill'
  }, {
    text: 'Add product',
    cls: 'polaris-button-primary',
    handler: function() {
      console.log('Add product clicked');
    }
  }],
  items: [{
    xtype: 'panel',
    html: '<div class="polaris-card"><p>Manage your product catalog here. Add new products, edit existing ones, and organize them into collections.</p></div>',
    padding: 16
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface PageExampleProps {
  title: string;
  primaryActionContent: string;
  onPrimaryAction: () => void;
  content: string;
}

function PageExample({
  title,
  primaryActionContent,
  onPrimaryAction,
  content
}: PageExampleProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={{
        content: primaryActionContent,
        onAction: onPrimaryAction,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              {content}
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageExample;`,
  }
,

  withSubtitle: {
    react: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function PageWithSubtitle() {
  return (
    <Page
      title="Orders"
      subtitle="Manage and track customer orders"
      primaryAction={{
        content: 'Create order',
        onAction: () => console.log('Create order clicked'),
      }}
      secondaryActions={[
        {
          content: 'Export',
          onAction: () => console.log('Export clicked'),
        },
        {
          content: 'Import',
          onAction: () => console.log('Import clicked'),
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              View and manage all customer orders from this dashboard.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageWithSubtitle;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page-header">
    <div class="polaris-page-header__title-wrapper">
      <h1 class="polaris-page-header__title">Orders</h1>
      <p class="polaris-page-header__subtitle">Manage and track customer orders</p>
    </div>
    <div class="polaris-page-header__actions">
      <div class="polaris-button-group">
        <button class="polaris-button">Export</button>
        <button class="polaris-button">Import</button>
      </div>
      <button class="polaris-button polaris-button--primary">Create order</button>
    </div>
  </div>

  <div class="polaris-page__content">
    <div class="polaris-card polaris-card--sectioned">
      <p>View and manage all customer orders from this dashboard.</p>
    </div>
  </div>
</div>

<script>
import { createPage } from '@cin7/vanilla-js';

const page = createPage({
  title: 'Orders',
  subtitle: 'Manage and track customer orders',
  primaryAction: {
    content: 'Create order',
    onClick: () => console.log('Create order clicked')
  },
  secondaryActions: [
    { content: 'Export', onClick: () => console.log('Export clicked') },
    { content: 'Import', onClick: () => console.log('Import clicked') }
  ]
});

document.getElementById('app').appendChild(page);
</script>`,

    extjs: `// ExtJS Panel with subtitle and secondary actions
Ext.create('Ext.panel.Panel', {
  title: 'Orders',
  layout: 'fit',
  width: '100%',
  height: 600,
  header: {
    title: '<div><div class="page-title">Orders</div><div class="page-subtitle">Manage and track customer orders</div></div>'
  },
  tbar: [{
    xtype: 'tbfill'
  }, {
    text: 'Export',
    handler: () => console.log('Export clicked')
  }, {
    text: 'Import',
    handler: () => console.log('Import clicked')
  }, {
    text: 'Create order',
    cls: 'polaris-button-primary',
    handler: () => console.log('Create order clicked')
  }],
  items: [{
    xtype: 'panel',
    html: '<div class="polaris-card"><p>View and manage all customer orders from this dashboard.</p></div>',
    padding: 16
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface PageAction {
  content: string;
  onAction: () => void;
}

interface PageWithSubtitleProps {
  title: string;
  subtitle: string;
  primaryAction: PageAction;
  secondaryActions?: PageAction[];
}

function PageWithSubtitle({
  title,
  subtitle,
  primaryAction,
  secondaryActions
}: PageWithSubtitleProps): JSX.Element {
  return (
    <Page
      title={title}
      subtitle={subtitle}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="p" variant="bodyMd">
              View and manage all customer orders from this dashboard.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageWithSubtitle;`
  },

  withBreadcrumbs: {
    react: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function PageWithBreadcrumbs() {
  return (
    <Page
      title="Product Details"
      breadcrumbs={[
        { content: 'Products', url: '#' },
        { content: 'Classic T-Shirt', url: '#' },
      ]}
      primaryAction={{
        content: 'Save',
        onAction: () => console.log('Save clicked'),
      }}
      secondaryActions={[
        { content: 'Duplicate', onAction: () => console.log('Duplicate clicked') },
        { content: 'Delete', destructive: true, onAction: () => console.log('Delete clicked') },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Product Information</Text>
            <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
              Classic cotton t-shirt with comfortable fit.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageWithBreadcrumbs;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <nav class="polaris-breadcrumbs">
    <a href="#" class="polaris-breadcrumbs__item">Products</a>
    <span class="polaris-breadcrumbs__separator">/</span>
    <a href="#" class="polaris-breadcrumbs__item">Classic T-Shirt</a>
  </nav>

  <div class="polaris-page-header">
    <h1 class="polaris-page-header__title">Product Details</h1>
    <div class="polaris-page-header__actions">
      <div class="polaris-button-group">
        <button class="polaris-button">Duplicate</button>
        <button class="polaris-button polaris-button--destructive">Delete</button>
      </div>
      <button class="polaris-button polaris-button--primary">Save</button>
    </div>
  </div>

  <div class="polaris-page__content">
    <div class="polaris-card polaris-card--sectioned">
      <h3 class="polaris-text--heading-md">Product Information</h3>
      <p style="margin-top: 12px;">Classic cotton t-shirt with comfortable fit.</p>
    </div>
  </div>
</div>

<script>
import { createPage, createBreadcrumbs } from '@cin7/vanilla-js';

const page = createPage({
  title: 'Product Details',
  breadcrumbs: [
    { content: 'Products', url: '#' },
    { content: 'Classic T-Shirt', url: '#' }
  ],
  primaryAction: {
    content: 'Save',
    onClick: () => console.log('Save clicked')
  },
  secondaryActions: [
    { content: 'Duplicate', onClick: () => console.log('Duplicate clicked') },
    { content: 'Delete', destructive: true, onClick: () => console.log('Delete clicked') }
  ]
});

document.getElementById('app').appendChild(page);
</script>`,

    extjs: `// ExtJS Panel with breadcrumb navigation
Ext.create('Ext.panel.Panel', {
  title: 'Product Details',
  layout: 'fit',
  width: '100%',
  height: 600,
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'breadcrumb',
      store: Ext.create('Ext.data.TreeStore', {
        root: {
          expanded: true,
          children: [
            { text: 'Products', leaf: false },
            { text: 'Classic T-Shirt', leaf: true }
          ]
        }
      })
    }]
  }],
  tbar: [{
    xtype: 'tbfill'
  }, {
    text: 'Duplicate',
    handler: () => console.log('Duplicate clicked')
  }, {
    text: 'Delete',
    cls: 'polaris-button-destructive',
    handler: () => console.log('Delete clicked')
  }, {
    text: 'Save',
    cls: 'polaris-button-primary',
    handler: () => console.log('Save clicked')
  }],
  items: [{
    xtype: 'panel',
    html: '<div class="polaris-card"><h3>Product Information</h3><p>Classic cotton t-shirt with comfortable fit.</p></div>',
    padding: 16
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface Breadcrumb {
  content: string;
  url: string;
}

interface PageAction {
  content: string;
  destructive?: boolean;
  onAction: () => void;
}

interface PageWithBreadcrumbsProps {
  title: string;
  breadcrumbs: Breadcrumb[];
  primaryAction: PageAction;
  secondaryActions?: PageAction[];
}

function PageWithBreadcrumbs({
  title,
  breadcrumbs,
  primaryAction,
  secondaryActions
}: PageWithBreadcrumbsProps): JSX.Element {
  return (
    <Page
      title={title}
      breadcrumbs={breadcrumbs}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Product Information</Text>
            <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
              Classic cotton t-shirt with comfortable fit.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageWithBreadcrumbs;`
  },

  withActionGroups: {
    react: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

function PageWithActionGroups() {
  return (
    <Page
      title="Analytics"
      primaryAction={{
        content: 'Generate report',
        onAction: () => console.log('Generate report clicked'),
      }}
      secondaryActions={[
        { content: 'Export data', onAction: () => console.log('Export clicked') },
      ]}
      actionGroups={[
        {
          title: 'Reports',
          actions: [
            { content: 'Sales report', onAction: () => console.log('Sales report') },
            { content: 'Customer report', onAction: () => console.log('Customer report') },
            { content: 'Inventory report', onAction: () => console.log('Inventory report') },
          ],
        },
        {
          title: 'Settings',
          actions: [
            { content: 'Date range', onAction: () => console.log('Date range') },
            { content: 'Filters', onAction: () => console.log('Filters') },
          ],
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Dashboard Overview</Text>
            <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
              View comprehensive analytics and insights.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageWithActionGroups;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-page">
  <div class="polaris-page-header">
    <h1 class="polaris-page-header__title">Analytics</h1>
    <div class="polaris-page-header__actions">
      <button class="polaris-button">Export data</button>
      <div class="polaris-action-menu">
        <button class="polaris-button">Reports ▾</button>
      </div>
      <div class="polaris-action-menu">
        <button class="polaris-button">Settings ▾</button>
      </div>
      <button class="polaris-button polaris-button--primary">Generate report</button>
    </div>
  </div>

  <div class="polaris-page__content">
    <div class="polaris-card polaris-card--sectioned">
      <h3>Dashboard Overview</h3>
      <p style="margin-top: 12px;">View comprehensive analytics and insights.</p>
    </div>
  </div>
</div>

<script>
import { createPage, createActionMenu } from '@cin7/vanilla-js';

const page = createPage({
  title: 'Analytics',
  primaryAction: {
    content: 'Generate report',
    onClick: () => console.log('Generate report clicked')
  },
  secondaryActions: [
    { content: 'Export data', onClick: () => console.log('Export clicked') }
  ],
  actionGroups: [
    {
      title: 'Reports',
      actions: [
        { content: 'Sales report', onClick: () => console.log('Sales report') },
        { content: 'Customer report', onClick: () => console.log('Customer report') },
        { content: 'Inventory report', onClick: () => console.log('Inventory report') }
      ]
    },
    {
      title: 'Settings',
      actions: [
        { content: 'Date range', onClick: () => console.log('Date range') },
        { content: 'Filters', onClick: () => console.log('Filters') }
      ]
    }
  ]
});

document.getElementById('app').appendChild(page);
</script>`,

    extjs: `// ExtJS Panel with menu groups
Ext.create('Ext.panel.Panel', {
  title: 'Analytics',
  layout: 'fit',
  width: '100%',
  height: 600,
  tbar: [{
    xtype: 'tbfill'
  }, {
    text: 'Export data',
    handler: () => console.log('Export clicked')
  }, {
    text: 'Reports',
    menu: [{
      text: 'Sales report',
      handler: () => console.log('Sales report')
    }, {
      text: 'Customer report',
      handler: () => console.log('Customer report')
    }, {
      text: 'Inventory report',
      handler: () => console.log('Inventory report')
    }]
  }, {
    text: 'Settings',
    menu: [{
      text: 'Date range',
      handler: () => console.log('Date range')
    }, {
      text: 'Filters',
      handler: () => console.log('Filters')
    }]
  }, {
    text: 'Generate report',
    cls: 'polaris-button-primary',
    handler: () => console.log('Generate report clicked')
  }],
  items: [{
    xtype: 'panel',
    html: '<div class="polaris-card"><h3>Dashboard Overview</h3><p>View comprehensive analytics and insights.</p></div>',
    padding: 16
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Page, Layout, Card, Text } from '@shopify/polaris';
import React from 'react';

interface PageAction {
  content: string;
  onAction: () => void;
}

interface ActionGroup {
  title: string;
  actions: PageAction[];
}

interface PageWithActionGroupsProps {
  title: string;
  primaryAction: PageAction;
  secondaryActions?: PageAction[];
  actionGroups?: ActionGroup[];
}

function PageWithActionGroups({
  title,
  primaryAction,
  secondaryActions,
  actionGroups
}: PageWithActionGroupsProps): JSX.Element {
  return (
    <Page
      title={title}
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      actionGroups={actionGroups}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Text as="h3" variant="headingMd">Dashboard Overview</Text>
            <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
              View comprehensive analytics and insights.
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default PageWithActionGroups;`
  },

  customerPage: {
    react: `// Variant customerPage - See default variant for full example
// This variant adds titleMetadata with Badge and uses two-column layout`,

    vanilla: `// Variant customerPage - See default variant for full example
// This variant adds titleMetadata with Badge and uses two-column layout`,

    extjs: `// Variant customerPage - See default variant for full example
// This variant adds titleMetadata with Badge and uses two-column layout`,

    typescript: `// Variant customerPage - See default variant for full example
// This variant adds titleMetadata with Badge and uses two-column layout`
  },

  productCatalog: {
    react: `// Variant productCatalog - See default variant for full example
// This variant demonstrates product grid layout with badges and cards`,

    vanilla: `// Variant productCatalog - See default variant for full example
// This variant demonstrates product grid layout with badges and cards`,

    extjs: `// Variant productCatalog - See default variant for full example
// This variant demonstrates product grid layout with badges and cards`,

    typescript: `// Variant productCatalog - See default variant for full example
// This variant demonstrates product grid layout with badges and cards`
  },

  orderManagement: {
    react: `// Variant orderManagement - See default variant for full example
// This variant adds pagination and demonstrates table-like data display`,

    vanilla: `// Variant orderManagement - See default variant for full example
// This variant adds pagination and demonstrates table-like data display`,

    extjs: `// Variant orderManagement - See default variant for full example
// This variant adds pagination and demonstrates table-like data display`,

    typescript: `// Variant orderManagement - See default variant for full example
// This variant adds pagination and demonstrates table-like data display`
  },

  settingsPage: {
    react: `// Variant settingsPage - See default variant for full example
// This variant uses backAction and demonstrates form-like layout`,

    vanilla: `// Variant settingsPage - See default variant for full example
// This variant uses backAction and demonstrates form-like layout`,

    extjs: `// Variant settingsPage - See default variant for full example
// This variant uses backAction and demonstrates form-like layout`,

    typescript: `// Variant settingsPage - See default variant for full example
// This variant uses backAction and demonstrates form-like layout`
  },

  fullWidthPage: {
    react: `import { Page, Layout, Card, Text, Badge } from '@shopify/polaris';
import React from 'react';

function FullWidthPage() {
  return (
    <Page
      title="Full Width Dashboard"
      fullWidth
      primaryAction={{
        content: 'Refresh Data',
        onAction: () => console.log('Refresh clicked'),
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f4f6f8', borderRadius: '8px', textAlign: 'center' }}>
                <Text as="p" variant="headingLg">$45,234</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total Revenue</Text>
                <Badge status="success">+12.5%</Badge>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f4f6f8', borderRadius: '8px', textAlign: 'center' }}>
                <Text as="p" variant="headingLg">1,892</Text>
                <Text as="p" variant="bodySm" tone="subdued">Total Orders</Text>
                <Badge status="success">+8.2%</Badge>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default FullWidthPage;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-page polaris-page--full-width">
  <div class="polaris-page-header">
    <h1 class="polaris-page-header__title">Full Width Dashboard</h1>
    <div class="polaris-page-header__actions">
      <button class="polaris-button polaris-button--primary">Refresh Data</button>
    </div>
  </div>

  <div class="polaris-page__content">
    <div class="polaris-card polaris-card--sectioned">
      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">
        <div class="stat-card">
          <p class="stat-value">$45,234</p>
          <p class="stat-label">Total Revenue</p>
          <span class="polaris-badge polaris-badge--success">+12.5%</span>
        </div>
        <div class="stat-card">
          <p class="stat-value">1,892</p>
          <p class="stat-label">Total Orders</p>
          <span class="polaris-badge polaris-badge--success">+8.2%</span>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
import { createPage } from '@cin7/vanilla-js';

const page = createPage({
  title: 'Full Width Dashboard',
  fullWidth: true,
  primaryAction: {
    content: 'Refresh Data',
    onClick: () => console.log('Refresh clicked')
  }
});

document.getElementById('app').appendChild(page);
</script>`,

    extjs: `// ExtJS Full Width Panel
Ext.create('Ext.panel.Panel', {
  title: 'Full Width Dashboard',
  layout: 'fit',
  width: '100%',
  height: 600,
  tbar: [{
    xtype: 'tbfill'
  }, {
    text: 'Refresh Data',
    cls: 'polaris-button-primary',
    handler: () => console.log('Refresh clicked')
  }],
  items: [{
    xtype: 'panel',
    layout: {
      type: 'column'
    },
    items: [{
      xtype: 'panel',
      columnWidth: 0.5,
      html: '<div class="stat-card"><p class="value">$45,234</p><p class="label">Total Revenue</p><span class="badge success">+12.5%</span></div>',
      padding: 16
    }, {
      xtype: 'panel',
      columnWidth: 0.5,
      html: '<div class="stat-card"><p class="value">1,892</p><p class="label">Total Orders</p><span class="badge success">+8.2%</span></div>',
      padding: 16
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Page, Layout, Card, Text, Badge } from '@shopify/polaris';
import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
  change: string;
  status: 'success' | 'attention' | 'critical';
}

interface FullWidthPageProps {
  title: string;
  stats: StatCardProps[];
  onRefresh: () => void;
}

function FullWidthPage({
  title,
  stats,
  onRefresh
}: FullWidthPageProps): JSX.Element {
  return (
    <Page
      title={title}
      fullWidth
      primaryAction={{
        content: 'Refresh Data',
        onAction: onRefresh,
      }}
    >
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              {stats.map((stat, index) => (
                <div key={index} style={{ padding: '20px', backgroundColor: '#f4f6f8', borderRadius: '8px', textAlign: 'center' }}>
                  <Text as="p" variant="headingLg">{stat.value}</Text>
                  <Text as="p" variant="bodySm" tone="subdued">{stat.label}</Text>
                  <Badge status={stat.status}>{stat.change}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default FullWidthPage;`
  },

};

// ProgressBar Component Examples - Feedback
