import type { Meta, StoryObj } from '@storybook/react';
import { ResourceItem, ResourceList, Card, BlockStack, InlineStack, Badge, Button, Icon, Avatar, Thumbnail, Text } from '@shopify/polaris';
import { CustomerMajor, ProductMajor, OrderMajor, NoteMinor, ViewMinor, EditMinor, DeleteMinor } from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Data/ResourceItem',
  component: ResourceItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ResourceItem represents an individual item within a ResourceList. It\'s commonly used for displaying products, orders, customers, files, and any other resource types that need to be presented in a list format with actions and metadata.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the resource item',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    name: {
      control: 'text',
      description: 'Display name of the resource',
    },
    media: {
      control: 'object',
      description: 'Media element (avatar, thumbnail, icon)',
    },
    shortcutActions: {
      control: 'array',
      description: 'Quick action buttons',
    },
    actions: {
      control: 'array',
      description: 'Primary action buttons',
    },
    persistActions: {
      control: 'boolean',
      description: 'Whether actions should always be visible',
    },
    verticalAlignment: {
      control: 'select',
      options: ['center', 'top', 'bottom'],
      description: 'Vertical alignment of content',
    },
    onClick: {
      control: 'function',
      description: 'Click handler for the entire item',
    },
    onToggle: {
      control: 'function',
      description: 'Toggle handler for selection',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the item is selected',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the item is in a loading state',
    },
  },
} satisfies Meta<typeof ResourceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ width: '500px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'product', plural: 'products' }}
            items={[
              {
                id: '1',
                name: 'Basic T-Shirt',
                sku: 'TSHIRT-BASIC-001',
                price: '$29.99',
                stock: 50,
              },
            ]}
            renderItem={(item) => (
              <ResourceItem
                id={item.id}
                name={item.name}
                accessibilityLabel={`View details for ${item.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>SKU: {item.sku}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '500' }}>{item.price}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>{item.stock} in stock</div>
                  </div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const WithMedia: Story = {
  render: () => {
    return (
      <div style={{ width: '500px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'product', plural: 'products' }}
            items={[
              {
                id: '1',
                name: 'Wireless Headphones',
                image: 'https://via.placeholder.com/60x60/007ace/ffffff?text=🎧',
                price: '$149.99',
                category: 'Electronics',
              },
              {
                id: '2',
                name: 'Cotton T-Shirt',
                image: 'https://via.placeholder.com/60x60/dc2626/ffffff?text=T',
                price: '$24.99',
                category: 'Clothing',
              },
            ]}
            renderItem={(item) => (
              <ResourceItem
                id={item.id}
                name={item.name}
                media={<Thumbnail source={item.image} alt={item.name} size="large" />}
                accessibilityLabel={`View details for ${item.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>{item.category}</div>
                  </div>
                  <div style={{ fontWeight: '500' }}>{item.price}</div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    return (
      <div style={{ width: '550px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'product', plural: 'products' }}
            items={[
              {
                id: '1',
                name: 'Premium Laptop Stand',
                price: '$79.99',
                status: 'Active',
              },
            ]}
            renderItem={(item) => (
              <ResourceItem
                id={item.id}
                name={item.name}
                shortcutActions={[
                  {
                    content: 'View',
                    icon: ViewMinor,
                    onAction: () => console.log('View clicked'),
                  },
                ]}
                actions={[
                  {
                    content: 'Edit',
                    icon: EditMinor,
                    onAction: () => console.log('Edit clicked'),
                  },
                  {
                    content: 'Delete',
                    icon: DeleteMinor,
                    destructive: true,
                    onAction: () => console.log('Delete clicked'),
                  },
                ]}
                accessibilityLabel={`View details for ${item.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
                      Status: <Badge status="success">{item.status}</Badge>
                    </div>
                  </div>
                  <div style={{ fontWeight: '500' }}>{item.price}</div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const CustomerResource: Story = {
  render: () => {
    const customers = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@example.com',
        orders: 12,
        totalSpent: '$1,247.50',
        status: 'VIP',
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        orders: 5,
        totalSpent: '$456.30',
        status: 'Regular',
      },
      {
        id: '3',
        name: 'Michael Chen',
        email: 'm.chen@example.com',
        orders: 28,
        totalSpent: '$3,892.15',
        status: 'VIP',
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'customer', plural: 'customers' }}
            items={customers}
            renderItem={(customer) => (
              <ResourceItem
                id={customer.id}
                name={customer.name}
                media={<Avatar customer size="medium" name={customer.name} />}
                shortcutActions={[
                  {
                    content: 'View orders',
                    icon: OrderMajor,
                    onAction: () => console.log(`View orders for ${customer.name}`),
                  },
                ]}
                accessibilityLabel={`View details for ${customer.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{customer.name}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)", marginBottom: '4px' }}>{customer.email}</div>
                    <InlineStack gap="200">
                      <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                        {customer.orders} orders
                      </span>
                      <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                        • {customer.totalSpent} spent
                      </span>
                    </InlineStack>
                  </div>
                  <Badge status={customer.status === 'VIP' ? 'info' : 'default'}>
                    {customer.status}
                  </Badge>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const OrderResource: Story = {
  render: () => {
    const orders = [
      {
        id: '1001',
        customerName: 'John Smith',
        items: 3,
        total: '$156.80',
        status: 'Fulfilled',
        date: '2023-07-21',
      },
      {
        id: '1002',
        customerName: 'Emily Davis',
        items: 1,
        total: '$89.99',
        status: 'Processing',
        date: '2023-07-21',
      },
      {
        id: '1003',
        customerName: 'Robert Wilson',
        items: 5,
        total: '$342.15',
        status: 'Pending',
        date: '2023-07-20',
      },
    ];

    const getStatusBadge = (status: string) => {
      switch (status) {
        case 'Fulfilled':
          return <Badge status="success">{status}</Badge>;
        case 'Processing':
          return <Badge status="attention">{status}</Badge>;
        case 'Pending':
          return <Badge status="info">{status}</Badge>;
        default:
          return <Badge>{status}</Badge>;
      }
    };

    return (
      <div style={{ width: '600px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'order', plural: 'orders' }}
            items={orders}
            renderItem={(order) => (
              <ResourceItem
                id={order.id}
                name={`Order ${order.id}`}
                media={<Icon source={OrderMajor} />}
                shortcutActions={[
                  {
                    content: 'View details',
                    icon: ViewMinor,
                    onAction: () => console.log(`View details for order ${order.id}`),
                  },
                ]}
                accessibilityLabel={`View details for order ${order.id}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                      Order #{order.id}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)", marginBottom: '4px' }}>
                      {order.customerName} • {order.date}
                    </div>
                    <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                      {order.items} item{order.items !== 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{order.total}</div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const SelectableItems: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const products = [
      {
        id: '1',
        name: 'Wireless Mouse',
        price: '$34.99',
        category: 'Electronics',
      },
      {
        id: '2',
        name: 'USB-C Cable',
        price: '$12.99',
        category: 'Accessories',
      },
      {
        id: '3',
        name: 'Desk Lamp',
        price: '$45.00',
        category: 'Office',
      },
    ];

    return (
      <div style={{ width: '550px' }}>
        <Card>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #e1e3e5' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Products</h3>
              <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                {selectedItems.length} selected
              </span>
            </div>
          </div>

          <ResourceList
            resourceName={{ singular: 'product', plural: 'products' }}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
            items={products}
            renderItem={(product) => (
              <ResourceItem
                id={product.id}
                name={product.name}
                selected={selectedItems.includes(product.id)}
                accessibilityLabel={`Select ${product.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>{product.category}</div>
                  </div>
                  <div style={{ fontWeight: '500' }}>{product.price}</div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const FileResource: Story = {
  render: () => {
    const files = [
      {
        id: '1',
        name: 'Product Catalog 2023.pdf',
        type: 'PDF',
        size: '2.4 MB',
        modified: '2 hours ago',
      },
      {
        id: '2',
        name: 'Sales Report Q2.xlsx',
        type: 'Excel',
        size: '856 KB',
        modified: '1 day ago',
      },
      {
        id: '3',
        name: 'Brand Guidelines.zip',
        type: 'ZIP',
        size: '15.7 MB',
        modified: '3 days ago',
      },
    ];

    const getFileIcon = (type: string) => {
      const icons: Record<string, string> = {
        'PDF': '📄',
        'Excel': '📊',
        'ZIP': '📦',
      };
      return icons[type] || '📄';
    };

    return (
      <div style={{ width: '600px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'file', plural: 'files' }}
            items={files}
            renderItem={(file) => (
              <ResourceItem
                id={file.id}
                name={file.name}
                media={
                  <div style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '6px',
                    fontSize: "var(--font-size-xl)"
                  }}>
                    {getFileIcon(file.type)}
                  </div>
                }
                shortcutActions={[
                  {
                    content: 'Download',
                    icon: ViewMinor,
                    onAction: () => console.log(`Download ${file.name}`),
                  },
                ]}
                accessibilityLabel={`View details for ${file.name}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{file.name}</div>
                    <InlineStack gap="200">
                      <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                        {file.type} • {file.size}
                      </span>
                      <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                        Modified {file.modified}
                      </span>
                    </InlineStack>
                  </div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => {
    return (
      <div style={{ width: '500px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'product', plural: 'products' }}
            items={[{ id: '1', name: 'Loading product...' }]}
            renderItem={(item) => (
              <ResourceItem
                id={item.id}
                name={item.name}
                loading
                accessibilityLabel="Loading item"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>Loading details...</div>
                  </div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const ProductGridExample: Story = {
  render: () => {
    const products = [
      {
        id: '1',
        name: 'Classic White T-Shirt',
        price: '$24.99',
        compareAtPrice: '$34.99',
        inventory: 150,
        status: 'Active',
        image: 'https://via.placeholder.com/60x60/f3f4f6/374151?text=T',
      },
      {
        id: '2',
        name: 'Denim Jeans Slim Fit',
        price: '$79.99',
        compareAtPrice: null,
        inventory: 45,
        status: 'Active',
        image: 'https://via.placeholder.com/60x60/1e40af/ffffff?text=J',
      },
      {
        id: '3',
        name: 'Running Shoes Pro',
        price: '$129.99',
        compareAtPrice: '$159.99',
        inventory: 0,
        status: 'Out of Stock',
        image: 'https://via.placeholder.com/60x60/dc2626/ffffff?text=R',
      },
      {
        id: '4',
        name: 'Leather Wallet',
        price: '$49.99',
        compareAtPrice: null,
        inventory: 89,
        status: 'Active',
        image: 'https://via.placeholder.com/60x60/92400e/ffffff?text=W',
      },
    ];

    const getStatusBadge = (status: string) => {
      switch (status) {
        case 'Active':
          return <Badge status="success">{status}</Badge>;
        case 'Out of Stock':
          return <Badge status="critical">{status}</Badge>;
        default:
          return <Badge>{status}</Badge>;
      }
    };

    return (
      <div style={{ width: '700px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: "var(--font-size-lg)" }}>Product Inventory</h3>

            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              items={products}
              renderItem={(product) => (
                <ResourceItem
                  id={product.id}
                  name={product.name}
                  media={<Thumbnail source={product.image} alt={product.name} size="large" />}
                  shortcutActions={[
                    {
                      content: 'Edit',
                      icon: EditMinor,
                      onAction: () => console.log(`Edit ${product.name}`),
                    },
                  ]}
                  accessibilityLabel={`View details for ${product.name}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                      <InlineStack gap="200">
                        <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                          {product.inventory} in stock
                        </span>
                        {product.compareAtPrice && (
                          <span style={{
                            fontSize: "var(--font-size-sm)",
                            color: '#dc2626',
                            textDecoration: 'line-through'
                          }}>
                            {product.compareAtPrice}
                          </span>
                        )}
                      </InlineStack>
                    </div>
                    <div style={{ textAlign: 'right', marginLeft: '16px' }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.price}</div>
                      {getStatusBadge(product.status)}
                    </div>
                  </div>
                </ResourceItem>
              )}
            />
          </div>
        </Card>
      </div>
    );
  },
};

export const TaskResource: Story = {
  render: () => {
    const tasks = [
      {
        id: '1',
        title: 'Update product pricing',
        description: 'Review and update prices for summer collection',
        priority: 'High',
        dueDate: 'Today',
        assignee: 'John Smith',
      },
      {
        id: '2',
        title: 'Order new inventory',
        description: 'Place order for low stock items',
        priority: 'Medium',
        dueDate: 'Tomorrow',
        assignee: 'Sarah Johnson',
      },
      {
        id: '3',
        title: 'Review customer feedback',
        description: 'Analyze last month\'s customer reviews',
        priority: 'Low',
        dueDate: 'This week',
        assignee: 'Unassigned',
      },
    ];

    const getPriorityBadge = (priority: string) => {
      switch (priority) {
        case 'High':
          return <Badge status="critical">{priority}</Badge>;
        case 'Medium':
          return <Badge status="attention">{priority}</Badge>;
        case 'Low':
          return <Badge status="info">{priority}</Badge>;
        default:
          return <Badge>{priority}</Badge>;
      }
    };

    return (
      <div style={{ width: '650px' }}>
        <Card>
          <ResourceList
            resourceName={{ singular: 'task', plural: 'tasks' }}
            items={tasks}
            renderItem={(task) => (
              <ResourceItem
                id={task.id}
                name={task.title}
                media={<Icon source={NoteMinor} />}
                shortcutActions={[
                  {
                    content: 'Complete',
                    onAction: () => console.log(`Complete task: ${task.title}`),
                  },
                ]}
                accessibilityLabel={`View details for task: ${task.title}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500', marginBottom: '4px' }}>{task.title}</div>
                    <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)", marginBottom: '8px' }}>
                      {task.description}
                    </div>
                    <InlineStack gap="300">
                      <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                        Due: {task.dueDate}
                      </span>
                      <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                        Assignee: {task.assignee}
                      </span>
                    </InlineStack>
                  </div>
                  <div style={{ marginLeft: '16px' }}>
                    {getPriorityBadge(task.priority)}
                  </div>
                </div>
              </ResourceItem>
            )}
          />
        </Card>
      </div>
    );
  },
};

export const InteractiveResourceList: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [viewedItems, setViewedItems] = useState<string[]>([]);

    const products = [
      {
        id: '1',
        name: 'Wireless Bluetooth Speaker',
        price: '$89.99',
        rating: 4.5,
        reviews: 234,
        category: 'Electronics',
      },
      {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        price: '$29.99',
        rating: 4.8,
        reviews: 156,
        category: 'Clothing',
      },
      {
        id: '3',
        name: 'Stainless Steel Water Bottle',
        price: '$24.99',
        rating: 4.6,
        reviews: 89,
        category: 'Accessories',
      },
    ];

    const handleViewItem = (productId: string) => {
      setViewedItems(prev => [...new Set([...prev, productId])]);
      console.log(`Viewing product: ${productId}`);
    };

    const renderStars = (rating: number) => {
      return '⭐'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '⭐' : '');
    };

    return (
      <div style={{ width: '700px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: "var(--font-size-lg)" }}>Product Catalog</h3>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                  {selectedItems.length} selected
                </span>
                {selectedItems.length > 0 && (
                  <Button size="slim">Edit Selected</Button>
                )}
              </div>
            </div>

            <ResourceList
              resourceName={{ singular: 'product', plural: 'products' }}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              items={products}
              renderItem={(product) => (
                <ResourceItem
                  id={product.id}
                  name={product.name}
                  selected={selectedItems.includes(product.id)}
                  onClick={() => handleViewItem(product.id)}
                  shortcutActions={[
                    {
                      content: 'Quick view',
                      icon: ViewMinor,
                      onAction: () => handleViewItem(product.id),
                    },
                  ]}
                  actions={[
                    {
                      content: 'Edit',
                      icon: EditMinor,
                      onAction: () => console.log(`Edit ${product.name}`),
                    },
                  ]}
                  accessibilityLabel={`View details for ${product.name}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: '500',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {product.name}
                        {viewedItems.includes(product.id) && (
                          <span style={{
                            padding: '2px 6px',
                            backgroundColor: '#dcfce7',
                            color: '#166534',
                            borderRadius: '10px',
                            fontSize: '11px',
                            fontWeight: '500'
                          }}>
                            Viewed
                          </span>
                        )}
                      </div>
                      <InlineStack gap="300">
                        <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                          {product.category}
                        </span>
                        <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                          {renderStars(product.rating)} ({product.reviews})
                        </span>
                      </InlineStack>
                    </div>
                    <div style={{ textAlign: 'right', marginLeft: '16px' }}>
                      <div style={{ fontWeight: '500', fontSize: '16px' }}>{product.price}</div>
                    </div>
                  </div>
                </ResourceItem>
              )}
            />

            {viewedItems.length > 0 && (
              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f0f9ff',
                borderRadius: '6px',
                border: '1px solid #bfdbfe'
              }}>
                <p style={{ margin: 0, fontSize: "var(--font-size-sm)", color: '#1e40af' }}>
                  You've viewed {viewedItems.length} product{viewedItems.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  },
};

export const VerticalAlignment: Story = {
  render: () => {
    const items = [
      {
        id: '1',
        title: 'Short title',
        description: 'Brief description',
      },
      {
        id: '2',
        title: 'Medium length title that spans multiple lines',
        description: 'This is a longer description that provides more detail about the item and may wrap to multiple lines depending on the available space.',
      },
      {
        id: '3',
        title: 'Very short',
        description: 'Very brief',
      },
    ];

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: '600' }}>
              Vertical Alignment Examples
            </h3>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: "var(--font-size-sm)", fontWeight: '600' }}>
                Center alignment (default)
              </h4>
              <ResourceList
                resourceName={{ singular: 'item', plural: 'items' }}
                items={items}
                renderItem={(item) => (
                  <ResourceItem
                    id={item.id}
                    name={item.title}
                    verticalAlignment="center"
                    accessibilityLabel={`View details for ${item.title}`}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>{item.description}</div>
                    </div>
                    <Button size="slim">Action</Button>
                  </ResourceItem>
                )}
              />
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0', fontSize: "var(--font-size-sm)", fontWeight: '600' }}>
                Top alignment
              </h4>
              <ResourceList
                resourceName={{ singular: 'item', plural: 'items' }}
                items={items}
                renderItem={(item) => (
                  <ResourceItem
                    id={item.id}
                    name={item.title}
                    verticalAlignment="top"
                    accessibilityLabel={`View details for ${item.title}`}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ color: '#6b7280', fontSize: "var(--font-size-sm)" }}>{item.description}</div>
                    </div>
                    <Button size="slim">Action</Button>
                  </ResourceItem>
                )}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  },
};