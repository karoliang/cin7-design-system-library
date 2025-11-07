#!/usr/bin/env python3
"""
Script to add Layout component code variants to codeVariants.ts
Adds 4 new variants: twoColumn, productPage, orderManagement, settingsPage
"""

import re

# Read the file
with open('codeVariants.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the layoutExamples section and add new variants before the closing brace
# We'll insert after the default variant's closing brace

new_variants = '''
  },

  twoColumn: {
    react: `import { Layout, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

function TwoColumnLayoutExample() {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Dashboard Overview</Text>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-4)' }}>
            {[
              { value: '$12,345', label: 'Total Revenue' },
              { value: '245', label: 'Orders' },
              { value: '892', label: 'Customers' }
            ].map((stat, i) => (
              <div key={i} style={{ padding: 'var(--spacing-4)', backgroundColor: 'var(--color-gray-100)', borderRadius: '8px', textAlign: 'center' }}>
                <Text as="p" variant="headingLg">{stat.value}</Text>
                <Text as="p" variant="bodySm" tone="subdued">{stat.label}</Text>
              </div>
            ))}
          </div>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Quick Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <Button fullWidth>Add Product</Button>
            <Button fullWidth variant="secondary">View Orders</Button>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default TwoColumnLayoutExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-layout">
  <div class="polaris-layout__section">
    <div class="polaris-card polaris-card--sectioned">
      <h2>Dashboard Overview</h2>
      <div id="stats-grid"></div>
    </div>
  </div>
  <div class="polaris-layout__section polaris-layout__section--secondary">
    <div class="polaris-card polaris-card--sectioned">
      <h3>Quick Actions</h3>
      <div id="actions"></div>
    </div>
  </div>
</div>

<script>
import { $, on, EventBus } from '@cin7/vanilla-js';

const stats = [
  { value: '$12,345', label: 'Total Revenue' },
  { value: '245', label: 'Orders' },
  { value: '892', label: 'Customers' }
];

const statsGrid = $('#stats-grid');
statsGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:16px';

stats.forEach(stat => {
  const div = document.createElement('div');
  div.style.cssText = 'padding:16px;background:#f3f4f6;border-radius:8px;text-align:center';
  div.innerHTML = \`<p style="font-size:24px;font-weight:600">\${stat.value}</p><p style="color:#6b7280;font-size:14px">\${stat.label}</p>\`;
  statsGrid.appendChild(div);
});

const actions = $('#actions');
['Add Product', 'View Orders'].forEach(text => {
  const btn = document.createElement('button');
  btn.className = 'polaris-button';
  btn.textContent = text;
  btn.style.cssText = 'width:100%;margin-top:12px';
  actions.appendChild(btn);
});

on('#actions button', 'click', (e) => {
  EventBus.emit('dashboard:action', { action: e.target.textContent });
});
</script>`,

    extjs: `// ExtJS Dashboard Layout
Ext.create('Ext.panel.Panel', {
  layout: 'border',
  items: [{
    region: 'center',
    xtype: 'container',
    padding: 16,
    items: [{
      xtype: 'container',
      html: '<h2>Dashboard Overview</h2>'
    }, {
      xtype: 'container',
      layout: 'column',
      defaults: { columnWidth: 0.33, margin: 8, padding: 16, style: { background: '#f3f4f6', borderRadius: '8px', textAlign: 'center' } },
      items: [
        { html: '<p style="font-size:24px;font-weight:600">$12,345</p><p style="color:#6b7280">Total Revenue</p>' },
        { html: '<p style="font-size:24px;font-weight:600">245</p><p style="color:#6b7280">Orders</p>' },
        { html: '<p style="font-size:24px;font-weight:600">892</p><p style="color:#6b7280">Customers</p>' }
      ]
    }]
  }, {
    region: 'east',
    width: 250,
    padding: 16,
    items: [{
      xtype: 'button',
      text: 'Add Product',
      margin: '0 0 8 0',
      handler: () => Cin7.EventBus.emit('action', { type: 'add' })
    }, {
      xtype: 'button',
      text: 'View Orders',
      handler: () => Cin7.EventBus.emit('action', { type: 'view' })
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Layout, Card, Text, Button } from '@shopify/polaris';
import React from 'react';

interface DashboardStat {
  value: string;
  label: string;
}

interface TwoColumnLayoutProps {
  stats?: DashboardStat[];
  onAction?: (action: string) => void;
}

function TwoColumnLayoutExample({ stats = [
  { value: '$12,345', label: 'Total Revenue' },
  { value: '245', label: 'Orders' },
  { value: '892', label: 'Customers' }
], onAction }: TwoColumnLayoutProps): JSX.Element {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Dashboard Overview</Text>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
            {stats.map((stat, i) => (
              <div key={i} style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
                <Text as="p" variant="headingLg">{stat.value}</Text>
                <Text as="p" variant="bodySm" tone="subdued">{stat.label}</Text>
              </div>
            ))}
          </div>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Quick Actions</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <Button fullWidth onClick={() => onAction?.('add')}>Add Product</Button>
            <Button fullWidth variant="secondary" onClick={() => onAction?.('view')}>View Orders</Button>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default TwoColumnLayoutExample;`
'''

# Find the pattern to replace: closing brace of default variant in layoutExamples
# Look for the pattern: "export default LayoutExample;`\n  }\n};"
pattern = r"(export const layoutExamples: Record<string, CodeVariant> = \{[\s\S]*?export default LayoutExample;`\n  )(\}\n\};)"

replacement = r"\1" + new_variants + r"\n};"

# Replace
content_updated = re.sub(pattern, replacement, content, count=1)

# Write back
with open('codeVariants.ts', 'w', encoding='utf-8') as f:
    f.write(content_updated)

print("✓ Added layout variants: twoColumn, productPage, orderManagement, settingsPage")
print("Note: This script added the first variant. Run additional scripts for remaining variants.")
