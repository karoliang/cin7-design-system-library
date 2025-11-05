import type { Meta, StoryObj } from '@storybook/react';
import {
  ResourceList,
  Badge,
  Button,
  Avatar,
  Thumbnail,
  Text,
  InlineStack,
  Card,
  Icon,
  Tooltip,
} from '@shopify/polaris';
import {
  NoteMinor,
  ProductsMajor,
  CustomersMajor,
  OrdersMajor,
  CircleTickMinor,
  AlertMinor,
  ViewMinor,
  EditMinor,
  DeleteMinor,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Polaris/Data Display/ResourceList',
  component: ResourceList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Resource lists are used to display a collection of items with selection, filtering, and bulk actions. They provide a flexible way to manage resources like products, customers, orders, and any other business entities with consistent interaction patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    resourceName: {
      control: 'object',
      description: 'Configuration for resource naming',
    },
    items: {
      control: 'object',
      description: 'Array of resource items',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable item selection',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    emptyState: {
      control: 'text',
      description: 'Message when no items are available',
    },
    promotedBulkActions: {
      control: 'object',
      description: 'Primary bulk actions',
    },
    bulkActions: {
      control: 'object',
      description: 'Secondary bulk actions',
    },
    filterControl: {
      control: 'boolean',
      description: 'Show filter controls',
    },
    searchControl: {
      control: 'boolean',
      description: 'Show search controls',
    },
  },
} satisfies Meta<typeof ResourceList>;

export default meta;
type Story = StoryObj<typeof ResourceList>;

const sampleProducts = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    sku: 'TS001',
    price: 25.00,
    status: 'Active',
    stock: 150,
    vendor: 'Cotton Co',
    type: 'Apparel',
    image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
  },
  {
    id: '2',
    name: 'Coffee Mug',
    description: 'Ceramic mug with modern design',
    sku: 'CM002',
    price: 12.00,
    status: 'Active',
    stock: 89,
    vendor: 'Kitchen Supplies',
    type: 'Kitchen',
    image: 'https://picsum.photos/seed/mug/100/100.jpg',
  },
  {
    id: '3',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with long battery life',
    sku: 'WM003',
    price: 45.00,
    status: 'Active',
    stock: 0,
    vendor: 'Tech Gear',
    type: 'Electronics',
    image: 'https://picsum.photos/seed/mouse/100/100.jpg',
  },
  {
    id: '4',
    name: 'Leather Wallet',
    description: 'Genuine leather bifold wallet',
    sku: 'LW004',
    price: 78.00,
    status: 'Archived',
    stock: 23,
    vendor: 'Leather Goods',
    type: 'Accessories',
    image: 'https://picsum.photos/seed/wallet/100/100.jpg',
  },
];

const sampleCustomers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    orders: 12,
    totalSpent: 542.00,
    location: 'New York, USA',
    lastOrder: '2024-07-15',
    avatar: 'https://picsum.photos/seed/john/50/50.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    orders: 8,
    totalSpent: 321.00,
    location: 'London, UK',
    lastOrder: '2024-07-18',
    avatar: 'https://picsum.photos/seed/jane/50/50.jpg',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 (555) 456-7890',
    orders: 23,
    totalSpent: 1254.00,
    location: 'Toronto, Canada',
    lastOrder: '2024-07-19',
    avatar: 'https://picsum.photos/seed/bob/50/50.jpg',
  },
];

const productResourceName = {
  singular: 'product',
  plural: 'products',
};

const customerResourceName = {
  singular: 'customer',
  plural: 'customers',
};

const promotedBulkActions = [
  {
    content: 'Edit items',
    onAction: () => console.log('Edit selected'),
    icon: EditMinor,
  },
  {
    content: 'Delete items',
    onAction: () => console.log('Delete selected'),
    icon: DeleteMinor,
    destructive: true,
  },
];

const bulkActions = [
  {
    content: 'Add tags',
    onAction: () => console.log('Add tags to selected'),
  },
  {
    content: 'Change status',
    onAction: () => console.log('Change status of selected'),
  },
];

export const Default: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={productResourceName}
          items={sampleProducts}
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          renderItem={(item) => {
            const { id, name, description, price, status, stock, image } = item;
            const media = <Thumbnail size="small" alt={name} source={image} />;
            const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;
            const stockBadge = stock > 0
              ? <Badge status="success">{stock} in stock</Badge>
              : <Badge status="critical">Out of stock</Badge>;

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`View details for ${name}`}
                persistActions
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text variant="bodyMd" fontWeight="semibold" as="h3">
                      {name}
                    </Text>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text color="subdued" as="p">
                      {description}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      ${price.toFixed(2)}
                    </Text>
                    {statusBadge}
                    {stockBadge}
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const Selectable: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={productResourceName}
          items={sampleProducts}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          promotedBulkActions={promotedBulkActions}
          bulkActions={bulkActions}
          renderItem={(item) => {
            const { id, name, description, price, status, stock, image } = item;
            const media = <Thumbnail size="small" alt={name} source={image} />;
            const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`Select ${name}`}
              >
                <div style={{ flex: 1 }}>
                  <Text variant="bodyMd" fontWeight="semibold" as="h3">
                    {name}
                  </Text>
                  <Text color="subdued" as="p">
                    {description}
                  </Text>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      ${price.toFixed(2)}
                    </Text>
                    {statusBadge}
                    <Text color="subdued" variant="bodySm">
                      {stock} in stock
                    </Text>
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const CustomerList: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    const customerBulkActions = [
      {
        content: 'Send email',
        onAction: () => console.log('Send email to selected'),
      },
      {
        content: 'Add to segment',
        onAction: () => console.log('Add selected to segment'),
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={customerResourceName}
          items={sampleCustomers}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          bulkActions={customerBulkActions}
          renderItem={(item) => {
            const { id, name, email, phone, orders, totalSpent, location, lastOrder, avatar } = item;
            const media = <Avatar customer size="medium" name={name} source={avatar} />;

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`View customer ${name}`}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text variant="bodyMd" fontWeight="semibold" as="h3">
                      {name}
                    </Text>
                  </div>
                  <div style={{ marginBottom: '8px', display: 'flex', gap: '16px' }}>
                    <Text color="subdued">{email}</Text>
                    <Text color="subdued">{phone}</Text>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <Text variant="bodySm">
                      {orders} orders
                    </Text>
                    <Text variant="bodySm" fontWeight="medium">
                      ${totalSpent.toFixed(2)} spent
                    </Text>
                    <Text color="subdued" variant="bodySm">
                      {location}
                    </Text>
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const WithSearch: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    const filteredProducts = sampleProducts.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={productResourceName}
          items={filteredProducts}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          promotedBulkActions={promotedBulkActions}
          filterControl
          searchControl={{
            queryValue: searchValue,
            onQueryChange: setSearchValue,
            placeholder: 'Search products...',
          }}
          renderItem={(item) => {
            const { id, name, description, price, status, stock, image, sku } = item;
            const media = <Thumbnail size="small" alt={name} source={image} />;
            const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`Select ${name}`}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '4px' }}>
                    <Text variant="bodyMd" fontWeight="semibold" as="h3">
                      {name}
                    </Text>
                    <Text color="subdued" variant="bodySm">
                      SKU: {sku}
                    </Text>
                  </div>
                  <Text color="subdued" as="p" style={{ marginBottom: '4px' }}>
                    {description}
                  </Text>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      ${price.toFixed(2)}
                    </Text>
                    {statusBadge}
                    <Text color="subdued" variant="bodySm">
                      {stock} in stock
                    </Text>
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={productResourceName}
          items={sampleProducts}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          bulkActions={bulkActions}
          renderItem={(item) => {
            const { id, name, description, price, status, stock, image, sku, vendor, type } = item;
            const media = <Thumbnail size="small" alt={name} source={image} />;
            const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

            const shortcutActions = [
              {
                content: 'View',
                icon: ViewMinor,
                onAction: () => console.log(`View ${name}`),
              },
              {
                content: 'Edit',
                icon: EditMinor,
                onAction: () => console.log(`Edit ${name}`),
              },
            ];

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`View details for ${name}`}
                shortcutActions={shortcutActions}
                persistActions
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text variant="bodyMd" fontWeight="semibold" as="h3">
                      {name}
                    </Text>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <Badge>{vendor}</Badge>
                      <Badge tone="info">{type}</Badge>
                    </div>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text color="subdued" as="p">
                      {description}
                    </Text>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      ${price.toFixed(2)}
                    </Text>
                    {statusBadge}
                    <Text color="subdued" variant="bodySm">
                      {stock} in stock
                    </Text>
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <ResourceList
        resourceName={productResourceName}
        items={[]}
        loading
        renderItem={(item) => (
          <ResourceList.Item id={item.id}>
            Loading...
          </ResourceList.Item>
        )}
      />
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <ResourceList
        resourceName={productResourceName}
        items={[]}
        emptyState="No products found"
        renderItem={(item) => (
          <ResourceList.Item id={item.id}>
            {item.name}
          </ResourceList.Item>
        )}
      />
    </div>
  ),
};

export const OrderList: Story = {
  render: () => {
    const orders = [
      {
        id: 'ORD001',
        orderNumber: '#1020',
        customer: 'John Doe',
        date: 'Jul 20, 2024',
        total: 125.00,
        status: 'fulfilled',
        items: 3,
        payment: 'paid',
      },
      {
        id: 'ORD002',
        orderNumber: '#1019',
        customer: 'Jane Smith',
        date: 'Jul 20, 2024',
        total: 89.00,
        status: 'processing',
        items: 2,
        payment: 'pending',
      },
      {
        id: 'ORD003',
        orderNumber: '#1018',
        customer: 'Bob Johnson',
        date: 'Jul 19, 2024',
        total: 234.00,
        status: 'unfulfilled',
        items: 5,
        payment: 'paid',
      },
    ];

    const orderResourceName = {
      singular: 'order',
      plural: 'orders',
    };

    const getStatusBadge = (status: string) => {
      const config = {
        fulfilled: { status: 'success', label: 'Fulfilled' },
        processing: { status: 'attention', label: 'Processing' },
        unfulfilled: { status: 'warning', label: 'Unfulfilled' },
      } as const;
      const badgeConfig = config[status as keyof typeof config] || config.unfulfilled;
      return <Badge status={badgeConfig.status}>{badgeConfig.label}</Badge>;
    };

    const getPaymentBadge = (payment: string) => {
      const config = {
        paid: { status: 'success', label: 'Paid' },
        pending: { status: 'attention', label: 'Pending' },
        refunded: { status: 'info', label: 'Refunded' },
      } as const;
      const badgeConfig = config[payment as keyof typeof config] || config.pending;
      return <Badge status={badgeConfig.status}>{badgeConfig.label}</Badge>;
    };

    const orderBulkActions = [
      {
        content: 'Fulfill orders',
        onAction: () => console.log('Fulfill selected orders'),
      },
      {
        content: 'Archive orders',
        onAction: () => console.log('Archive selected orders'),
      },
      {
        content: 'Export orders',
        onAction: () => console.log('Export selected orders'),
      },
    ];

    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={orderResourceName}
          items={orders}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          bulkActions={orderBulkActions}
          renderItem={(item) => {
            const { id, orderNumber, customer, date, total, status, items, payment } = item;
            const statusBadge = getStatusBadge(status);
            const paymentBadge = getPaymentBadge(payment);

            return (
              <ResourceList.Item
                id={id}
                accessibilityLabel={`View order ${orderNumber}`}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <Text variant="bodyMd" fontWeight="semibold" as="h3">
                      {orderNumber} - {customer}
                    </Text>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text color="subdued">{date}</Text>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      ${total.toFixed(2)}
                    </Text>
                    <Text color="subdued" variant="bodySm">
                      {items} items
                    </Text>
                    {paymentBadge}
                    {statusBadge}
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const WithFilters: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    const handleFilterChange = (value: any) => {
      setAppliedFilters(prev => [...prev, value]);
    };

    const handleFilterRemove = (filter: any) => {
      setAppliedFilters(prev => prev.filter(f => f !== filter));
    };

    const filters = [
      {
        key: 'status',
        label: 'Status',
        filter: (
          <div style={{ padding: '16px' }}>
            <Text>Status filter content here</Text>
          </div>
        ),
        shortcut: true,
      },
      {
        key: 'type',
        label: 'Type',
        filter: (
          <div style={{ padding: '16px' }}>
            <Text>Type filter content here</Text>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={productResourceName}
          items={sampleProducts}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          filters={filters}
          appliedFilters={appliedFilters}
          onFiltersChange={setAppliedFilters}
          bulkActions={bulkActions}
          renderItem={(item) => {
            const { id, name, description, price, status, stock, image } = item;
            const media = <Thumbnail size="small" alt={name} source={image} />;
            const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`Select ${name}`}
              >
                <div style={{ flex: 1 }}>
                  <Text variant="bodyMd" fontWeight="semibold" as="h3">
                    {name}
                  </Text>
                  <Text color="subdued" as="p">
                    {description}
                  </Text>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      ${price.toFixed(2)}
                    </Text>
                    {statusBadge}
                    <Text color="subdued" variant="bodySm">
                      {stock} in stock
                    </Text>
                  </div>
                </div>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};

export const CustomizedItems: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const handleSelectionChange = useCallback((selectedIds: string[]) => {
      setSelectedItems(selectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <ResourceList
          resourceName={productResourceName}
          items={sampleProducts}
          selectable
          selectedItems={selectedItems}
          onSelectionChange={handleSelectionChange}
          renderItem={(item) => {
            const { id, name, description, price, status, stock, image, vendor, type } = item;
            const media = <Thumbnail size="small" alt={name} source={image} />;
            const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

            return (
              <ResourceList.Item
                id={id}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <Card padding="400">
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: '8px' }}>
                        <Text variant="bodyMd" fontWeight="semibold" as="h3">
                          {name}
                        </Text>
                        <Text color="subdued" variant="bodySm">
                          SKU: {item.sku}
                        </Text>
                      </div>
                      <Text color="subdued" as="p" style={{ marginBottom: '8px' }}>
                        {description}
                      </Text>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                        <Badge>{vendor}</Badge>
                        <Badge tone="info">{type}</Badge>
                        {statusBadge}
                      </div>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <Text variant="bodyMd" fontWeight="medium">
                          ${price.toFixed(2)}
                        </Text>
                        <Text color="subdued" variant="bodySm">
                          Stock: {stock}
                        </Text>
                      </div>
                    </div>
                    <div>
                      <InlineStack gap="200">
                        <Tooltip content="View product">
                          <Button size="small" variant="plain" icon={ViewMinor} />
                        </Tooltip>
                        <Tooltip content="Edit product">
                          <Button size="small" variant="plain" icon={EditMinor} />
                        </Tooltip>
                      </InlineStack>
                    </div>
                  </div>
                </Card>
              </ResourceList.Item>
            );
          }}
        />
      </div>
    );
  },
};