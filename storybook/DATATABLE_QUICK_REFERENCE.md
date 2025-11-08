# DataTable Code Variants - Quick Reference

## What Was Done

1. ✅ **Created 11 new code variants** for DataTable component (12 total including existing 'default')
2. ✅ **Updated all 12 story parameters** in `DataTable.stories.tsx` to reference correct variant names
3. ⏳ **Prepared variants for integration** into `codeVariants.ts` (pending due to file modifications)

## Example Variant Structure

Here's a sample of 2 complete variants to show the pattern:

### Example 1: productTable

```typescript
  productTable: {
    react: `import { DataTable } from '@shopify/polaris';
import React from 'react';

function ProductTableExample() {
  const rows = [
    ['Vintage T-Shirt', 'Apparel', '$25.00', '150', 'Active'],
    ['Coffee Mug', 'Kitchen', '$12.00', '89', 'Active'],
    // ... more rows
  ];

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
      headings={['Product', 'Category', 'Price', 'Stock', 'Status']}
      rows={rows}
    />
  );
}

export default ProductTableExample;`,

    vanilla: `import { createDataTable, EventBus } from '@cin7/vanilla-js';

const productData = {
  headings: ['Product', 'Category', 'Price', 'Stock', 'Status'],
  rows: [
    ['Vintage T-Shirt', 'Apparel', '$25.00', '150', 'Active'],
    // ... more rows
  ],
  columnTypes: ['text', 'text', 'numeric', 'numeric', 'text']
};

const productTable = createDataTable(productData);
document.getElementById('app').appendChild(productTable);`,

    extjs: `import { PolarisDataTable } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  width: 900,
  title: 'Product Inventory',
  items: [{
    xtype: 'polarisdatatable',
    headings: ['Product', 'Category', 'Price', 'Stock', 'Status'],
    columnContentTypes: ['text', 'text', 'numeric', 'numeric', 'text'],
    rows: [ /* data */ ]
  }]
});`,

    typescript: `import { DataTable } from '@shopify/polaris';
import React from 'react';

interface Product {
  name: string;
  category: string;
  price: string;
  stock: number;
  status: 'Active' | 'Out of Stock';
}

interface ProductTableProps {
  products?: Product[];
}

function ProductTableExample({ products }: ProductTableProps): JSX.Element {
  const defaultProducts: Product[] = [ /* ... */ ];
  const data = products || defaultProducts;

  const rows = data.map(product => [
    product.name,
    product.category,
    product.price,
    product.stock.toString(),
    product.status
  ]);

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
      headings={['Product', 'Category', 'Price', 'Stock', 'Status']}
      rows={rows}
    />
  );
}

export default ProductTableExample;`
  },
```

### Example 2: withBadges

```typescript
  withBadges: {
    react: `import { DataTable, Badge } from '@shopify/polaris';
import React from 'react';

function BadgeTableExample() {
  const rows = [
    ['Vintage T-Shirt', 'Apparel', '$25.00', <Badge status="success">In Stock</Badge>],
    ['Coffee Mug', 'Kitchen', '$12.00', <Badge status="success">In Stock</Badge>],
    ['Wireless Mouse', 'Electronics', '$45.00', <Badge status="critical">Out of Stock</Badge>],
  ];

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'text']}
      headings={['Product', 'Category', 'Price', 'Status']}
      rows={rows}
    />
  );
}

export default BadgeTableExample;`,

    vanilla: `import { createDataTable, createBadge } from '@cin7/vanilla-js';

function createStatusBadge(status) {
  return createBadge({
    text: status,
    status: status === 'Out of Stock' ? 'critical' : 'success'
  });
}

const tableData = {
  headings: ['Product', 'Category', 'Price', 'Status'],
  rows: [
    ['Vintage T-Shirt', 'Apparel', '$25.00', createStatusBadge('In Stock')],
    // ... more rows with badges
  ],
  columnTypes: ['text', 'text', 'numeric', 'text']
};

const dataTable = createDataTable(tableData);
document.getElementById('app').appendChild(dataTable);`,

    extjs: `import { PolarisDataTable } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  items: [{
    xtype: 'grid',
    store: { /* data */ },
    columns: [
      { text: 'Product', dataIndex: 'product', flex: 1 },
      { text: 'Category', dataIndex: 'category', flex: 1 },
      { text: 'Price', dataIndex: 'price', align: 'right' },
      {
        text: 'Status',
        dataIndex: 'status',
        renderer: function(value) {
          const color = value === 'Out of Stock' ? 'red' : 'green';
          return '<span style="padding: 2px 8px; background: ' + color + '; color: white; border-radius: 4px;">' + value + '</span>';
        }
      }
    ]
  }]
});`,

    typescript: `import { DataTable, Badge } from '@shopify/polaris';
import React from 'react';

type StockStatus = 'In Stock' | 'Out of Stock';

interface Product {
  name: string;
  category: string;
  price: string;
  stockStatus: StockStatus;
}

interface BadgeTableProps {
  products?: Product[];
}

function BadgeTableExample({ products }: BadgeTableProps): JSX.Element {
  const defaultProducts: Product[] = [ /* ... */ ];
  const data = products || defaultProducts;

  const getStatusBadge = (status: StockStatus): JSX.Element => (
    <Badge status={status === 'Out of Stock' ? 'critical' : 'success'}>
      {status}
    </Badge>
  );

  const rows = data.map(product => [
    product.name,
    product.category,
    product.price,
    getStatusBadge(product.stockStatus)
  ]);

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'text']}
      headings={['Product', 'Category', 'Price', 'Status']}
      rows={rows}
    />
  );
}

export default BadgeTableExample;`
  },
```

## All 12 Variants

1. **default** - Basic orders table ✅ (already exists)
2. **productTable** - Product inventory ✅
3. **withCustomContent** - Custom React components in cells ✅
4. **withBadges** - Status badges ✅
5. **sortable** - Interactive sorting ✅
6. **withFooter** - Footer content ✅
7. **denseTable** - Compact layout ✅
8. **largeDataset** - 50+ rows with scrolling ✅
9. **financialData** - Financial reporting ✅
10. **userManagement** - User list with roles ✅
11. **inventoryTable** - Inventory with stock levels ✅
12. **interactiveTable** - Search, sort, and filter ✅

## Integration Location

**File**: `/storybook/.storybook/blocks/codeVariants.ts`

**Location**: After line ~16441 (after the `default` variant closing brace)

**Pattern**:
```typescript
export const dataTableExamples: Record<string, CodeVariant> = {
  default: {
    // existing variant
  },
  // ADD NEW VARIANTS HERE, starting with:
  productTable: {
    react: `...`,
    vanilla: `...`,
    extjs: `...`,
    typescript: `...`
  },
  // ... continue with remaining 10 variants
};
```

## Complete Variants Location

All 11 complete variants are ready in:
- `/storybook/DATATABLE_VARIANTS_TO_ADD.md` (full documentation + code)
- `/storybook/DATATABLE_VARIANTS_SUMMARY.md` (implementation summary)

## Story Parameters Updated ✅

All stories in `DataTable.stories.tsx` now reference their specific variants:

```typescript
export const Default: Story = {
  parameters: { codeVariants: getCodeVariants('datatable', 'default') },
};

export const ProductTable: Story = {
  parameters: { codeVariants: getCodeVariants('datatable', 'productTable') },
};

export const WithCustomContent: Story = {
  parameters: { codeVariants: getCodeVariants('datatable', 'withCustomContent') },
};

// ... and so on for all 12 stories
```

## Next Steps

1. **Wait for file stability**: codeVariants.ts is currently being modified
2. **Integrate variants**: Add all 11 variants from DATATABLE_VARIANTS_TO_ADD.md
3. **Test build**: Run `pnpm dev` in storybook directory
4. **Verify**: Check all 12 DataTable stories display code variants correctly

## Architecture Compliance

✅ **React Layer**: Shopify Polaris components
✅ **Vanilla Layer**: @cin7/vanilla-js utilities
✅ **ExtJS Layer**: @cin7/extjs-adapters integration
✅ **TypeScript Layer**: Fully typed business logic

All variants follow Cin7 DSL multi-layer architecture principles.
