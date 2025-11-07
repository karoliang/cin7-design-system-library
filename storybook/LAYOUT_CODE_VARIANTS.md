# Layout Component Code Variants

This document contains the code variants for the first 5 Layout component stories. These need to be added to `/storybook/.storybook/blocks/codeVariants.ts`.

## Variant Names and Story Mapping

| Story Export Name | Variant Name | Status |
|------------------|--------------|---------|
| Default | `default` | ✅ Already exists |
| TwoColumnLayout | `twoColumn` | ⏳ Needs to be added |
| ProductPage | `productPage` | ⏳ Needs to be added |
| OrderManagement | `orderManagement` | ⏳ Needs to be added |
| SettingsPage | `settingsPage` | ⏳ Needs to be added |
| CustomerProfile | `default` | ✅ Using existing default |

## Story File Updates

✅ **COMPLETED**: Updated `/storybook/stories/components/layout/Layout.stories.tsx` to reference the new variant names:
- `TwoColumnLayout` → `getCodeVariants('layout', 'twoColumn')`
- `ProductPage` → `getCodeVariants('layout', 'productPage')`
- `OrderManagement` → `getCodeVariants('layout', 'orderManagement')`
- `SettingsPage` → `getCodeVariants('layout', 'settingsPage')`

## Code Variants to Add

### Location in codeVariants.ts

Find the `layoutExamples` section (around line 25718) and add these new variants after the `default` variant.

### 1. twoColumn Variant

Add this variant for the dashboard overview with statistics and quick actions:

```typescript
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
  div.innerHTML = \\\`<p style="font-size:24px;font-weight:600">\\\${stat.value}</p><p style="color:#6b7280;font-size:14px">\\\${stat.label}</p>\\\`;
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
  },
```

### 2. productPage Variant

Add this variant for product management pages:

```typescript
  productPage: {
    react: `import { Layout, Card, Text, Badge } from '@shopify/polaris';
import React from 'react';

function ProductPageExample() {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">Classic T-Shirt</Text>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <Badge status="success">In Stock</Badge>
            <Text as="p" variant="bodySm" tone="subdued">SKU: TS-001</Text>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <Text as="h3" variant="headingSm">Product Details</Text>
              <div style={{ padding: '80px 16px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center', marginTop: '12px' }}>
                Product Image
              </div>
            </div>
            <div>
              <Text as="h3" variant="headingSm">Pricing & Inventory</Text>
              <div style={{ marginTop: '12px' }}>
                <Text as="p" variant="bodySm" tone="subdued">Price</Text>
                <Text as="p" variant="headingLg">$29.99</Text>
                <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '12px' }}>Stock</Text>
                <Text as="p" variant="headingMd">150 units</Text>
              </div>
            </div>
          </div>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Product Status</Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <Text as="p" variant="bodySm">Active</Text>
            <Badge status="success">Enabled</Badge>
          </div>
        </Card>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Collections</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <Badge>Summer Collection</Badge>
            <Badge>Bestsellers</Badge>
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default ProductPageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-layout">
  <div class="polaris-layout__section">
    <div class="polaris-card polaris-card--sectioned">
      <h2>Classic T-Shirt</h2>
      <div style="display:flex;gap:16px;align-items:center;margin-bottom:20px">
        <span class="polaris-badge polaris-badge--success">In Stock</span>
        <p style="color:#6b7280;font-size:14px">SKU: TS-001</p>
      </div>
      <div id="product-content"></div>
    </div>
  </div>
  <div class="polaris-layout__section polaris-layout__section--secondary">
    <div class="polaris-card polaris-card--sectioned">
      <h3>Product Status</h3>
      <div id="status"></div>
    </div>
    <div class="polaris-card polaris-card--sectioned">
      <h3>Collections</h3>
      <div id="collections"></div>
    </div>
  </div>
</div>

<script>
import { $, EventBus } from '@cin7/vanilla-js';

const content = $('#product-content');
content.innerHTML = \\\`
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
    <div>
      <h3>Product Details</h3>
      <div style="padding:80px 16px;background:#f3f4f6;border-radius:8px;text-align:center;margin-top:12px">Product Image</div>
    </div>
    <div>
      <h3>Pricing & Inventory</h3>
      <div style="margin-top:12px">
        <p style="color:#6b7280;font-size:14px">Price</p>
        <p style="font-size:24px;font-weight:600">$29.99</p>
        <p style="color:#6b7280;font-size:14px;margin-top:12px">Stock</p>
        <p style="font-size:18px;font-weight:600">150 units</p>
      </div>
    </div>
  </div>
\\\`;

$('#status').innerHTML = '<div style="display:flex;justify-content:space-between;margin-top:12px"><p>Active</p><span class="polaris-badge polaris-badge--success">Enabled</span></div>';

const collections = $('#collections');
['Summer Collection', 'Bestsellers'].forEach(name => {
  const badge = document.createElement('span');
  badge.className = 'polaris-badge';
  badge.textContent = name;
  badge.style.cssText = 'display:block;margin-top:8px';
  collections.appendChild(badge);
});

EventBus.emit('layout:rendered', { type: 'productPage', sku: 'TS-001' });
</script>`,

    extjs: `// ExtJS Product Page Layout
Ext.create('Ext.panel.Panel', {
  layout: 'border',
  items: [{
    region: 'center',
    padding: 16,
    items: [{
      xtype: 'container',
      html: '<h2>Classic T-Shirt</h2><span class="badge-success">In Stock</span> <span style="color:#6b7280">SKU: TS-001</span>'
    }, {
      xtype: 'container',
      layout: 'column',
      items: [{
        columnWidth: 0.5,
        xtype: 'panel',
        title: 'Product Details',
        html: '<div style="padding:80px;background:#f3f4f6;text-align:center">Product Image</div>'
      }, {
        columnWidth: 0.5,
        xtype: 'panel',
        title: 'Pricing & Inventory',
        html: '<p style="color:#6b7280">Price</p><p style="font-size:24px;font-weight:600">$29.99</p><p style="color:#6b7280;margin-top:12px">Stock</p><p style="font-size:18px;font-weight:600">150 units</p>'
      }]
    }]
  }, {
    region: 'east',
    width: 250,
    padding: 16,
    items: [{
      xtype: 'panel',
      title: 'Product Status',
      html: '<div style="display:flex;justify-content:space-between"><p>Active</p><span class="badge-success">Enabled</span></div>'
    }, {
      xtype: 'panel',
      title: 'Collections',
      html: '<span class="badge">Summer Collection</span><span class="badge" style="display:block;margin-top:8px">Bestsellers</span>'
    }]
  }],
  renderTo: Ext.getBody(),
  listeners: {
    afterrender: () => Cin7.EventBus.emit('layout:rendered', { type: 'productPage' })
  }
});`,

    typescript: `import { Layout, Card, Text, Badge } from '@shopify/polaris';
import React from 'react';

interface Product {
  name: string;
  sku: string;
  inStock: boolean;
  price: string;
  stock: number;
}

interface ProductPageProps {
  product?: Product;
  collections?: string[];
}

function ProductPageExample({
  product = { name: 'Classic T-Shirt', sku: 'TS-001', inStock: true, price: '$29.99', stock: 150 },
  collections = ['Summer Collection', 'Bestsellers']
}: ProductPageProps): JSX.Element {
  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Text as="h2" variant="headingLg">{product.name}</Text>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
            <Badge status={product.inStock ? 'success' : 'critical'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Badge>
            <Text as="p" variant="bodySm" tone="subdued">SKU: {product.sku}</Text>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <Text as="h3" variant="headingSm">Product Details</Text>
              <div style={{ padding: '80px 16px', backgroundColor: '#f3f4f6', borderRadius: '8px', textAlign: 'center', marginTop: '12px' }}>
                Product Image
              </div>
            </div>
            <div>
              <Text as="h3" variant="headingSm">Pricing & Inventory</Text>
              <div style={{ marginTop: '12px' }}>
                <Text as="p" variant="bodySm" tone="subdued">Price</Text>
                <Text as="p" variant="headingLg">{product.price}</Text>
                <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '12px' }}>Stock</Text>
                <Text as="p" variant="headingMd">{product.stock} units</Text>
              </div>
            </div>
          </div>
        </Card>
      </Layout.Section>
      <Layout.Section secondary>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Product Status</Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <Text as="p" variant="bodySm">Active</Text>
            <Badge status="success">Enabled</Badge>
          </div>
        </Card>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Collections</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            {collections.map((col, i) => <Badge key={i}>{col}</Badge>)}
          </div>
        </Card>
      </Layout.Section>
    </Layout>
  );
}

export default ProductPageExample;`
  },
```

### 3. orderManagement Variant

*(Due to document length, the orderManagement and settingsPage variants should follow the same structure pattern. See the full implementation in the Python script or by examining the story file.)*

## Integration Steps

1. **Manual addition** to codeVariants.ts:
   - Locate `export const layoutExamples` (around line 25718)
   - Add the 4 new variants after the `default` variant
   - Ensure proper comma separation between variants

2. **Or use the Python script**:
   ```bash
   cd storybook/.storybook/blocks
   python3 add-layout-variants.py
   ```

3. **Verify the changes**:
   ```bash
   cd storybook
   pnpm dev
   ```
   - Navigate to Layout component stories
   - Check that code examples appear in all 4 languages

## Summary

- ✅ Story file updated with correct variant references
- ⏳ Need to add 4 new variants to codeVariants.ts: `twoColumn`, `productPage`, `orderManagement`, `settingsPage`
- Each variant includes all 4 language implementations (React, Vanilla JS, ExtJS, TypeScript)
- EventBus patterns included in Vanilla JS and ExtJS implementations
- Type-safe interfaces provided in TypeScript implementations
