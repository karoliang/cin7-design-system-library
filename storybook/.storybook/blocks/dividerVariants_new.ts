// This file contains all divider code variants
// To be merged into codeVariants.ts

export interface CodeVariant {
  react: string;
  vanilla: string;
  extjs: string;
  typescript: string;
}

// Divider Component Examples - Complete set with all story variations
export const dividerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Divider, Card, Text } from '@shopify/polaris';

function DividerExample() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Section One</Text>
      <Text as="p" variant="bodyMd">
        This is the first section of content with some descriptive text.
      </Text>

      <Divider />

      <Text as="h3" variant="headingMd">Section Two</Text>
      <Text as="p" variant="bodyMd">
        This is the second section, visually separated by a divider.
      </Text>
    </Card>
  );
}

export default DividerExample;`,

    vanilla: `<!-- Divider Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md">Section One</h3>
    <p>This is the first section of content with some descriptive text.</p>
  </div>

  <hr class="polaris-divider" />

  <div class="polaris-card__section">
    <h3 class="polaris-heading-md">Section Two</h3>
    <p>This is the second section, visually separated by a divider.</p>
  </div>
</div>

<style>
.polaris-divider {
  border: none;
  border-top: 1px solid var(--p-color-border);
  margin: 16px 0;
}
</style>

<script>
import { $, addClass, removeClass } from '@cin7/vanilla-js';

// Optional: Add interaction for dynamic divider styling
const divider = $('.polaris-divider');
divider.style.transition = 'border-color 0.2s ease';
</script>`,

    extjs: `// ExtJS Divider using standard components
Ext.create('Ext.panel.Panel', {
  title: 'Content Sections',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<h3>Section One</h3><p>This is the first section of content with some descriptive text.</p>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid #e1e3e5; margin: 16px 0;" />',
      cls: 'polaris-divider-wrapper'
    },
    {
      xtype: 'component',
      html: '<h3>Section Two</h3><p>This is the second section, visually separated by a divider.</p>',
      margin: '8 0 0 0'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Divider, Card, Text } from '@shopify/polaris';
import React from 'react';

interface DividerExampleProps {
  borderColor?: 'border' | 'border-inverse' | 'border-critical' | 'border-warning' | 'border-highlight' | 'border-success';
  borderWidth?: 'none' | 'base' | 'thick';
  sectionOneTitle?: string;
  sectionTwoTitle?: string;
}

function DividerExample({
  borderColor = 'border',
  borderWidth = 'base',
  sectionOneTitle = 'Section One',
  sectionTwoTitle = 'Section Two'
}: DividerExampleProps): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd">{sectionOneTitle}</Text>
      <Text as="p" variant="bodyMd">
        This is the first section of content with some descriptive text.
      </Text>

      <Divider borderColor={borderColor} borderWidth={borderWidth} />

      <Text as="h3" variant="headingMd">{sectionTwoTitle}</Text>
      <Text as="p" variant="bodyMd">
        This is the second section, visually separated by a divider.
      </Text>
    </Card>
  );
}

export default DividerExample;`
  },

  borderColorVariations: {
    react: `import { Divider, Card, Text } from '@shopify/polaris';

function BorderColorVariations() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Border Color Variations
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text as="p" variant="bodySm" tone="subdued">Default border</Text>
          <Divider />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Success border</Text>
          <Divider borderColor="border-success" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Warning border</Text>
          <Divider borderColor="border-warning" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Critical border</Text>
          <Divider borderColor="border-critical" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Highlight border</Text>
          <Divider borderColor="border-highlight" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Inverse border</Text>
          <Divider borderColor="border-inverse" />
        </div>
      </div>
    </Card>
  );
}

export default BorderColorVariations;`,

    vanilla: `<!-- Border Color Variations -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md" style="margin-bottom: 16px;">Border Color Variations</h3>

    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p class="polaris-text-sm polaris-text-subdued">Default border</p>
        <hr class="polaris-divider" />
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Success border</p>
        <hr class="polaris-divider" style="border-top-color: var(--p-color-border-success);" />
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Warning border</p>
        <hr class="polaris-divider" style="border-top-color: var(--p-color-border-warning);" />
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Critical border</p>
        <hr class="polaris-divider" style="border-top-color: var(--p-color-border-critical);" />
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Highlight border</p>
        <hr class="polaris-divider" style="border-top-color: var(--p-color-border-highlight);" />
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Inverse border</p>
        <hr class="polaris-divider" style="border-top-color: var(--p-color-border-inverse);" />
      </div>
    </div>
  </div>
</div>

<script>
import { $, EventBus } from '@cin7/vanilla-js';

// Create dynamic dividers with different colors
function createColoredDivider(color) {
  const divider = document.createElement('hr');
  divider.className = 'polaris-divider';
  divider.style.borderTopColor = \`var(--p-color-border-\${color})\`;
  return divider;
}
</script>`,

    extjs: `// ExtJS Border Color Variations
Ext.create('Ext.panel.Panel', {
  title: 'Border Color Variations',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">Default border</p>',
      margin: '0 0 4 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid var(--p-color-border); margin: 8px 0;" />'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">Success border</p>',
      margin: '8 0 4 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid #4caf50; margin: 8px 0;" />'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">Warning border</p>',
      margin: '8 0 4 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid #ff9800; margin: 8px 0;" />'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">Critical border</p>',
      margin: '8 0 4 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid #f44336; margin: 8px 0;" />'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Divider, Card, Text } from '@shopify/polaris';
import React from 'react';

type BorderColor = 'border' | 'border-success' | 'border-warning' | 'border-critical' | 'border-highlight' | 'border-inverse';

interface ColorVariation {
  label: string;
  color: BorderColor;
}

const colorVariations: ColorVariation[] = [
  { label: 'Default border', color: 'border' },
  { label: 'Success border', color: 'border-success' },
  { label: 'Warning border', color: 'border-warning' },
  { label: 'Critical border', color: 'border-critical' },
  { label: 'Highlight border', color: 'border-highlight' },
  { label: 'Inverse border', color: 'border-inverse' },
];

function BorderColorVariations(): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Border Color Variations
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {colorVariations.map((variation, index) => (
          <div key={index}>
            <Text as="p" variant="bodySm" tone="subdued">
              {variation.label}
            </Text>
            <Divider borderColor={variation.color} />
          </div>
        ))}
      </div>
    </Card>
  );
}

export default BorderColorVariations;`
  },

  thicknessVariations: {
    react: `import { Divider, Card, Text } from '@shopify/polaris';

function ThicknessVariations() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Border Thickness Variations
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text as="p" variant="bodySm" tone="subdued">No border (for comparison)</Text>
          <div style={{ height: '1px', backgroundColor: 'transparent' }} />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Base thickness (default)</Text>
          <Divider borderWidth="base" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Thick border</Text>
          <Divider borderWidth="thick" />
        </div>
      </div>
    </Card>
  );
}

export default ThicknessVariations;`,

    vanilla: `<!-- Thickness Variations -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md" style="margin-bottom: 16px;">Border Thickness Variations</h3>

    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p class="polaris-text-sm polaris-text-subdued">No border (for comparison)</p>
        <div style="height: 1px; background-color: transparent;"></div>
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Base thickness (default)</p>
        <hr class="polaris-divider" style="border-top-width: 1px;" />
      </div>

      <div>
        <p class="polaris-text-sm polaris-text-subdued">Thick border</p>
        <hr class="polaris-divider polaris-divider--thick" style="border-top-width: 2px;" />
      </div>
    </div>
  </div>
</div>

<style>
.polaris-divider {
  border: none;
  border-top: 1px solid var(--p-color-border);
  margin: 8px 0;
}

.polaris-divider--thick {
  border-top-width: 2px;
}
</style>`,

    extjs: `// ExtJS Thickness Variations
Ext.create('Ext.panel.Panel', {
  title: 'Border Thickness Variations',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">No border (for comparison)</p>',
      margin: '0 0 4 0'
    },
    {
      xtype: 'component',
      html: '<div style="height: 1px; background-color: transparent; margin: 8px 0;"></div>'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">Base thickness (default)</p>',
      margin: '8 0 4 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid var(--p-color-border); margin: 8px 0;" />'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text-sm polaris-text-subdued">Thick border</p>',
      margin: '8 0 4 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 2px solid var(--p-color-border); margin: 8px 0;" />'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Divider, Card, Text } from '@shopify/polaris';
import React from 'react';

type BorderWidth = 'none' | 'base' | 'thick';

interface ThicknessVariation {
  label: string;
  width: BorderWidth | null;
}

const thicknessVariations: ThicknessVariation[] = [
  { label: 'No border (for comparison)', width: null },
  { label: 'Base thickness (default)', width: 'base' },
  { label: 'Thick border', width: 'thick' },
];

function ThicknessVariations(): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Border Thickness Variations
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {thicknessVariations.map((variation, index) => (
          <div key={index}>
            <Text as="p" variant="bodySm" tone="subdued">
              {variation.label}
            </Text>
            {variation.width === null ? (
              <div style={{ height: '1px', backgroundColor: 'transparent' }} />
            ) : (
              <Divider borderWidth={variation.width} />
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ThicknessVariations;`
  },

  betweenButtons: {
    react: `import { Divider, Card, Text, Button } from '@shopify/polaris';

function BetweenButtons() {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Action Groups
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary">Save Changes</Button>
          <Button variant="secondary">Save Draft</Button>
        </div>

        <Divider />

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="plain">Preview</Button>
          <Button variant="plain">Export</Button>
        </div>

        <Divider />

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="critical">Delete</Button>
          <Button variant="plain">Cancel</Button>
        </div>
      </div>
    </Card>
  );
}

export default BetweenButtons;`,

    vanilla: `<!-- Action Groups with Dividers -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <h3 class="polaris-heading-md" style="margin-bottom: 16px;">Action Groups</h3>

    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; gap: 12px;">
        <button class="polaris-button polaris-button--primary">Save Changes</button>
        <button class="polaris-button">Save Draft</button>
      </div>

      <hr class="polaris-divider" />

      <div style="display: flex; gap: 12px;">
        <button class="polaris-button polaris-button--plain">Preview</button>
        <button class="polaris-button polaris-button--plain">Export</button>
      </div>

      <hr class="polaris-divider" />

      <div style="display: flex; gap: 12px;">
        <button class="polaris-button polaris-button--critical">Delete</button>
        <button class="polaris-button polaris-button--plain">Cancel</button>
      </div>
    </div>
  </div>
</div>

<script>
import { on, EventBus } from '@cin7/vanilla-js';

// Handle button clicks for each action group
on('.polaris-button', 'click', (event) => {
  const buttonText = event.target.textContent;
  EventBus.emit('action:clicked', { action: buttonText });
  console.log('Action clicked:', buttonText);
});
</script>`,

    extjs: `// ExtJS Action Groups with Dividers
Ext.create('Ext.panel.Panel', {
  title: 'Action Groups',
  bodyPadding: 16,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        {
          xtype: 'button',
          text: 'Save Changes',
          cls: 'polaris-button-primary',
          margin: '0 8 0 0'
        },
        {
          xtype: 'button',
          text: 'Save Draft',
          cls: 'polaris-button-secondary'
        }
      ],
      margin: '0 0 8 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid var(--p-color-border); margin: 8px 0;" />'
    },
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        {
          xtype: 'button',
          text: 'Preview',
          cls: 'polaris-button-plain',
          margin: '0 8 0 0'
        },
        {
          xtype: 'button',
          text: 'Export',
          cls: 'polaris-button-plain'
        }
      ],
      margin: '8 0 8 0'
    },
    {
      xtype: 'component',
      html: '<hr style="border: none; border-top: 1px solid var(--p-color-border); margin: 8px 0;" />'
    },
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        {
          xtype: 'button',
          text: 'Delete',
          cls: 'polaris-button-critical',
          margin: '0 8 0 0'
        },
        {
          xtype: 'button',
          text: 'Cancel',
          cls: 'polaris-button-plain'
        }
      ],
      margin: '8 0 0 0'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Divider, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

interface ActionGroup {
  buttons: {
    label: string;
    variant: 'primary' | 'secondary' | 'plain' | 'critical';
    onClick: () => void;
  }[];
}

const actionGroups: ActionGroup[] = [
  {
    buttons: [
      { label: 'Save Changes', variant: 'primary', onClick: () => console.log('Save Changes') },
      { label: 'Save Draft', variant: 'secondary', onClick: () => console.log('Save Draft') },
    ],
  },
  {
    buttons: [
      { label: 'Preview', variant: 'plain', onClick: () => console.log('Preview') },
      { label: 'Export', variant: 'plain', onClick: () => console.log('Export') },
    ],
  },
  {
    buttons: [
      { label: 'Delete', variant: 'critical', onClick: () => console.log('Delete') },
      { label: 'Cancel', variant: 'plain', onClick: () => console.log('Cancel') },
    ],
  },
];

function BetweenButtons(): JSX.Element {
  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>
        Action Groups
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {actionGroups.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            <div style={{ display: 'flex', gap: '12px' }}>
              {group.buttons.map((button, buttonIndex) => (
                <Button
                  key={buttonIndex}
                  variant={button.variant}
                  onClick={button.onClick}
                >
                  {button.label}
                </Button>
              ))}
            </div>
            {groupIndex < actionGroups.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
}

export default BetweenButtons;`
  }
};
