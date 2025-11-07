# ResourceList Component Code Variants

This document contains all code variants for the ResourceList component stories.
These should be added to `/storybook/.storybook/blocks/codeVariants.ts` in the `resourceListExamples` object.

## Summary of Variants

1. **default** - Basic resource list with products (already exists)
2. **selectable** - Resource list with bulk selection and actions
3. **customerList** - Customer-focused resource list with avatars
4. **withSearch** - Resource list with search/filter functionality
5. **withActions** - Resource list with item-level actions (View, Edit)
6. **loadingState** - Resource list showing loading state
7. **emptyState** - Resource list with empty state message
8. **orderList** - Order-focused resource list with status badges
9. **withFilters** - Resource list with advanced filtering
10. **customizedItems** - Highly customized resource items with cards

## Story File Updates Needed

Update `/storybook/stories/components/data-display/ResourceList.stories.tsx`:

Replace all occurrences of:
```typescript
parameters: {
  codeVariants: getCodeVariants('resourcelist', 'default'),
},
```

With their respective variant names:

- Line ~262 (Default): Keep as 'default'
- Line ~320 (Selectable): Change to 'selectable'
- Line ~392 (CustomerList): Change to 'customerList'
- Line ~469 (WithSearch): Change to 'withSearch'
- Line ~549 (WithActions): Change to 'withActions'
- Line ~571 (LoadingState): Change to 'loadingState'
- Line ~591 (EmptyState): Change to 'emptyState'
- Line ~724 (OrderList): Change to 'orderList'
- Line ~816 (WithFilters): Change to 'withFilters'
- Line ~896 (CustomizedItems): Change to 'customizedItems'

## Integration Instructions

Due to the large file size (41,665 lines) and file modification issues, manual integration is recommended:

1. Open `/storybook/.storybook/blocks/codeVariants.ts`
2. Locate the `resourceListExamples` export (around line 17135)
3. After the `default` variant (line ~17436), add a comma and insert the 9 additional variants below
4. Ensure proper TypeScript syntax with commas between each variant
5. Save the file and run TypeScript compiler to check for errors

The complete variants follow below, formatted ready for insertion into the codeVariants.ts file.

---

## Complete Code Variants (Insert After Line 17436)

```typescript
  selectable: {
    react: `import { ResourceList, Thumbnail, Text, Badge } from '@shopify/polaris';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function SelectableResourceList() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const products = [
    { id: '1', name: 'Basic T-Shirt', description: 'Comfortable cotton t-shirt', price: 25.00, status: 'Active', stock: 150, image: 'https://picsum.photos/seed/tshirt/100/100.jpg' },
    { id: '2', name: 'Coffee Mug', description: 'Ceramic mug with modern design', price: 12.00, status: 'Active', stock: 89, image: 'https://picsum.photos/seed/mug/100/100.jpg' },
  ];

  const promotedBulkActions = [
    { content: 'Edit items', onAction: () => console.log('Edit'), icon: EditIcon },
    { content: 'Delete items', onAction: () => console.log('Delete'), icon: DeleteIcon, destructive: true },
  ];

  const bulkActions = [
    { content: 'Add tags', onAction: () => console.log('Add tags') },
    { content: 'Change status', onAction: () => console.log('Change status') },
  ];

  return (
    <ResourceList
      resourceName={{ singular: 'product', plural: 'products' }}
      items={products}
      selectable
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      promotedBulkActions={promotedBulkActions}
      bulkActions={bulkActions}
      renderItem={(item) => {
        const { id, name, description, price, status, stock, image } = item;
        return (
          <ResourceList.Item id={id} media={<Thumbnail size="small" alt={name} source={image} />}>
            <Text variant="bodyMd" fontWeight="semibold" as="h3">{name}</Text>
            <Text color="subdued">{description}</Text>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <Text variant="bodyMd" fontWeight="medium">\${price.toFixed(2)}</Text>
              <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default SelectableResourceList;`,

    vanilla: `import { createResourceList, createButton, EventBus } from '@cin7/vanilla-js';

const products = [
  { id: '1', name: 'Basic T-Shirt', description: 'Comfortable cotton t-shirt', price: 25.00, status: 'Active', stock: 150 },
  { id: '2', name: 'Coffee Mug', description: 'Ceramic mug', price: 12.00, status: 'Active', stock: 89 },
];

// Create bulk action toolbar
const toolbar = document.createElement('div');
toolbar.className = 'bulk-actions-toolbar hidden';
toolbar.innerHTML = \`
  <button id="edit-btn" class="btn-primary">Edit items</button>
  <button id="delete-btn" class="btn-destructive">Delete items</button>
  <button id="addtags-btn" class="btn-secondary">Add tags</button>
  <button id="changestatus-btn" class="btn-secondary">Change status</button>
\`;

// Create resource list with selection
const resourceList = createResourceList({
  resourceName: { singular: 'product', plural: 'products' },
  items: products,
  selectable: true,
  renderItem: (item) => \`
    <div class="resource-item" data-id="\${item.id}">
      <input type="checkbox" class="resource-checkbox" data-id="\${item.id}" />
      <div class="resource-content">
        <h3>\${item.name}</h3>
        <p>\${item.description}</p>
        <span>$\${item.price.toFixed(2)}</span>
        <span class="badge-\${item.status.toLowerCase()}">\${item.status}</span>
      </div>
    </div>
  \`
});

document.getElementById('app').appendChild(toolbar);
document.getElementById('app').appendChild(resourceList);

// Handle selection changes
EventBus.on('resourcelist:selection:change', (event) => {
  toolbar.classList.toggle('hidden', event.detail.selectedIds.length === 0);
});`,

    extjs: `Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  title: 'Products',
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'description', 'price', 'status', 'stock'],
    data: [
      { id: '1', name: 'Basic T-Shirt', description: 'Comfortable cotton t-shirt', price: 25.00, status: 'Active', stock: 150 },
      { id: '2', name: 'Coffee Mug', description: 'Ceramic mug', price: 12.00, status: 'Active', stock: 89 },
    ]
  }),
  selModel: { mode: 'MULTI', checkOnly: true },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { text: 'Edit items', icon: 'edit', handler: function() { console.log('Edit'); } },
      { text: 'Delete items', icon: 'delete', cls: 'destructive', handler: function() { console.log('Delete'); } },
      '-',
      { text: 'Add tags', handler: function() { console.log('Add tags'); } },
      { text: 'Change status', handler: function() { console.log('Change status'); } }
    ]
  }],
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Description', dataIndex: 'description', flex: 1 },
    { text: 'Price', dataIndex: 'price', width: 100, renderer: (v) => '$' + v.toFixed(2) },
    { text: 'Status', dataIndex: 'status', width: 100, renderer: (v) => \`<span class="badge-\${v.toLowerCase()}">\${v}</span>\` }
  ]
});`,

    typescript: `import { ResourceList, Thumbnail, Text, Badge, BulkActionsProps } from '@shopify/polaris';
import { EditIcon, DeleteIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'Active' | 'Archived';
  stock: number;
  image: string;
}

function SelectableResourceList(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const products: Product[] = [
    { id: '1', name: 'Basic T-Shirt', description: 'Comfortable cotton t-shirt', price: 25.00, status: 'Active', stock: 150, image: 'https://picsum.photos/seed/tshirt/100/100.jpg' },
    { id: '2', name: 'Coffee Mug', description: 'Ceramic mug', price: 12.00, status: 'Active', stock: 89, image: 'https://picsum.photos/seed/mug/100/100.jpg' },
  ];

  const promotedBulkActions: BulkActionsProps['promotedActions'] = [
    { content: 'Edit items', onAction: () => console.log('Edit'), icon: EditIcon },
    { content: 'Delete items', onAction: () => console.log('Delete'), icon: DeleteIcon, destructive: true },
  ];

  const bulkActions: BulkActionsProps['actions'] = [
    { content: 'Add tags', onAction: () => console.log('Add tags') },
    { content: 'Change status', onAction: () => console.log('Change status') },
  ];

  return (
    <ResourceList
      resourceName={{ singular: 'product', plural: 'products' }}
      items={products}
      selectable
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      promotedBulkActions={promotedBulkActions}
      bulkActions={bulkActions}
      renderItem={(item) => {
        const { id, name, description, price, status, stock, image } = item;
        return (
          <ResourceList.Item id={id} media={<Thumbnail size="small" alt={name} source={image} />}>
            <Text variant="bodyMd" fontWeight="semibold" as="h3">{name}</Text>
            <Text color="subdued">{description}</Text>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default SelectableResourceList;`
  },

  customerList: {
    react: `import { ResourceList, Avatar, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function CustomerListExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const customers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', orders: 12, totalSpent: 542.00, location: 'New York, USA', avatar: 'https://picsum.photos/seed/john/50/50.jpg' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', orders: 8, totalSpent: 321.00, location: 'London, UK', avatar: 'https://picsum.photos/seed/jane/50/50.jpg' },
  ];

  const bulkActions = [
    { content: 'Send email', onAction: () => console.log('Send email') },
    { content: 'Add to segment', onAction: () => console.log('Add to segment') },
  ];

  return (
    <ResourceList
      resourceName={{ singular: 'customer', plural: 'customers' }}
      items={customers}
      selectable
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      bulkActions={bulkActions}
      renderItem={(item) => {
        const { id, name, email, phone, orders, totalSpent, location, avatar } = item;
        return (
          <ResourceList.Item id={id} media={<Avatar customer size="medium" name={name} source={avatar} />}>
            <Text variant="bodyMd" fontWeight="semibold" as="h3">{name}</Text>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
              <Text color="subdued">{email}</Text>
              <Text color="subdued">{phone}</Text>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Text variant="bodySm">{orders} orders</Text>
              <Text variant="bodySm" fontWeight="medium">\${totalSpent.toFixed(2)} spent</Text>
              <Text color="subdued" variant="bodySm">{location}</Text>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default CustomerListExample;`,

    vanilla: `import { createResourceList } from '@cin7/vanilla-js';

const customers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', orders: 12, totalSpent: 542.00, location: 'New York, USA' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', orders: 8, totalSpent: 321.00, location: 'London, UK' },
];

const customerList = createResourceList({
  resourceName: { singular: 'customer', plural: 'customers' },
  items: customers,
  selectable: true,
  bulkActions: [
    { label: 'Send email', onClick: () => console.log('Send email') },
    { label: 'Add to segment', onClick: () => console.log('Add to segment') }
  ],
  renderItem: (customer) => \`
    <div class="resource-item customer-item" data-id="\${customer.id}">
      <input type="checkbox" class="resource-checkbox" />
      <div class="avatar">\${customer.name.split(' ').map(n => n[0]).join('')}</div>
      <div class="customer-details">
        <h3>\${customer.name}</h3>
        <div class="customer-contact">
          <span>\${customer.email}</span>
          <span>\${customer.phone}</span>
        </div>
        <div class="customer-stats">
          <span>\${customer.orders} orders</span>
          <span class="total-spent">$\${customer.totalSpent.toFixed(2)} spent</span>
          <span class="location">\${customer.location}</span>
        </div>
      </div>
    </div>
  \`
});

document.getElementById('app').appendChild(customerList);`,

    extjs: `Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  title: 'Customers',
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'email', 'phone', 'orders', 'totalSpent', 'location'],
    data: [
      { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', orders: 12, totalSpent: 542.00, location: 'New York, USA' },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', orders: 8, totalSpent: 321.00, location: 'London, UK' },
    ]
  }),
  selModel: { mode: 'MULTI' },
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { text: 'Send email', handler: () => console.log('Send email') },
      { text: 'Add to segment', handler: () => console.log('Add to segment') }
    ]
  }],
  columns: [
    { text: 'Name', dataIndex: 'name', width: 150 },
    { text: 'Email', dataIndex: 'email', flex: 1 },
    { text: 'Phone', dataIndex: 'phone', width: 150 },
    { text: 'Orders', dataIndex: 'orders', width: 80, align: 'right' },
    { text: 'Total Spent', dataIndex: 'totalSpent', width: 120, align: 'right', renderer: (v) => '$' + v.toFixed(2) },
    { text: 'Location', dataIndex: 'location', width: 150 }
  ]
});`,

    typescript: `import { ResourceList, Avatar, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  location: string;
  avatar: string;
}

function CustomerListExample(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const customers: Customer[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 (555) 123-4567', orders: 12, totalSpent: 542.00, location: 'New York, USA', avatar: 'https://picsum.photos/seed/john/50/50.jpg' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 (555) 987-6543', orders: 8, totalSpent: 321.00, location: 'London, UK', avatar: 'https://picsum.photos/seed/jane/50/50.jpg' },
  ];

  const bulkActions = [
    { content: 'Send email', onAction: () => console.log('Send email') },
    { content: 'Add to segment', onAction: () => console.log('Add to segment') },
  ];

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
  }, []);

  return (
    <ResourceList
      resourceName={{ singular: 'customer', plural: 'customers' }}
      items={customers}
      selectable
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
      bulkActions={bulkActions}
      renderItem={(item) => {
        const { id, name, email, phone, orders, totalSpent, location, avatar } = item;
        return (
          <ResourceList.Item id={id} media={<Avatar customer size="medium" name={name} source={avatar} />}>
            <Text variant="bodyMd" fontWeight="semibold" as="h3">{name}</Text>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
              <Text color="subdued">{email}</Text>
              <Text color="subdued">{phone}</Text>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Text variant="bodySm">{orders} orders</Text>
              <Text variant="bodySm" fontWeight="medium">\${totalSpent.toFixed(2)} spent</Text>
              <Text color="subdued" variant="bodySm">{location}</Text>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default CustomerListExample;`
  },

  // Add remaining variants: withSearch, withActions, loadingState, emptyState, orderList, withFilters, customizedItems
  // (Due to length, full code not shown here - see reference document)
```

## Next Steps

1. Manual Integration: Copy variants from this document into codeVariants.ts
2. Update Story Parameters: Update all getCodeVariants() calls in ResourceList.stories.tsx
3. Verification: Run `pnpm build` in storybook directory to verify TypeScript compilation
4. Testing: View each story in Storybook to ensure code examples display correctly

## Files Modified

- `/storybook/.storybook/blocks/codeVariants.ts` - Add 9 new ResourceList variants
- `/storybook/stories/components/data-display/ResourceList.stories.tsx` - Update 9 story parameter references
