import type { Meta, StoryObj } from '@storybook/react';
import {
  IndexTable,
  Badge,
  Button,
  Checkbox,
  Icon,
  InlineStack,
  Text,
  Tooltip,
  LegacyCard
} from '@shopify/polaris';
import {
  ViewMinor,
  EditMinor,
  DeleteMinor,
  DuplicateMinor,
  ArchiveMinor,
  MobileMajor,
  DesktopMajor,
  CircleTickMinor,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Polaris/Data Display/IndexTable',
  component: IndexTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Index tables display structured data with selection capabilities, bulk actions, and sorting. They are ideal for managing collections of items where users need to select multiple items, perform bulk actions, or view detailed information about each item.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    lastColumnSticky: {
      control: 'boolean',
      description: 'Make last column sticky',
    },
    headings: {
      control: 'object',
      description: 'Table column headings',
    },
    itemCount: {
      control: 'number',
      description: 'Total number of items for pagination',
    },
    hasMoreItems: {
      control: 'boolean',
      description: 'Show pagination controls',
    },
    onSelectionChange: {
      action: 'selection change',
      description: 'Called when selection changes',
    },
  },
} satisfies Meta<typeof IndexTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOrders = [
  { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
  { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
  { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
  { id: '1017', name: 'Leather Wallet', sku: 'LW004', price: 78.00, quantity: 23, status: 'Active' },
];

const resourceName = {
  singular: 'product',
  plural: 'products',
};

const promotedBulkActions = [
  {
    content: 'Edit products',
    onAction: () => console.log('Edit selected'),
    icon: EditMinor,
  },
  {
    content: 'Delete products',
    onAction: () => console.log('Delete selected'),
    icon: DeleteMinor,
    destructive: true,
  },
];

const bulkActions = [
  {
    content: 'Duplicate products',
    onAction: () => console.log('Duplicate selected'),
    icon: DuplicateMinor,
  },
  {
    content: 'Archive products',
    onAction: () => console.log('Archive selected'),
    icon: ArchiveMinor,
  },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={sampleOrders.length}
          headings={[
            { title: 'Product' },
            { title: 'SKU' },
            { title: 'Price', alignment: 'end' },
            { title: 'Stock', alignment: 'end' },
            { title: 'Status', alignment: 'center' },
          ]}
          selectable={false}
        >
          {sampleOrders.map(
            ({ id, name, sku, price, quantity, status }, index) => (
              <IndexTable.Row
                id={id}
                key={id}
                position={index}
              >
                <IndexTable.Cell>{name}</IndexTable.Cell>
                <IndexTable.Cell>{sku}</IndexTable.Cell>
                <IndexTable.Cell numeric>${price.toFixed(2)}</IndexTable.Cell>
                <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
                <IndexTable.Cell>
                  <Badge status={status === 'Active' ? 'success' : 'info'}>
                    {status}
                  </Badge>
                </IndexTable.Cell>
              </IndexTable.Row>
            ),
          )}
        </IndexTable>
      </LegacyCard>
    </div>
  ),
};

export const Selectable: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            itemCount={sampleOrders.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'SKU' },
              { title: 'Price', alignment: 'end' },
              { title: 'Stock', alignment: 'end' },
              { title: 'Status', alignment: 'center' },
            ]}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
          >
            {sampleOrders.map(
              ({ id, name, sku, price, quantity, status }, index) => (
                <IndexTable.Row
                  id={id}
                  key={id}
                  position={index}
                  selected={selectedIds.includes(id)}
                >
                  <IndexTable.Cell>{name}</IndexTable.Cell>
                  <IndexTable.Cell>{sku}</IndexTable.Cell>
                  <IndexTable.Cell numeric>${price.toFixed(2)}</IndexTable.Cell>
                  <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
                  <IndexTable.Cell>
                    <Badge status={status === 'Active' ? 'success' : 'info'}>
                      {status}
                    </Badge>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ),
            )}
          </IndexTable>
        </LegacyCard>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    const rowMarkup = sampleOrders.map(
      ({ id, name, sku, price, quantity, status }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          selected={selectedIds.includes(id)}
        >
          <IndexTable.Cell>{name}</IndexTable.Cell>
          <IndexTable.Cell>{sku}</IndexTable.Cell>
          <IndexTable.Cell numeric>${price.toFixed(2)}</IndexTable.Cell>
          <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
          <IndexTable.Cell>
            <Badge status={status === 'Active' ? 'success' : 'info'}>
              {status}
            </Badge>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack gap="200">
              <Tooltip content="View product">
                <Button size="small" variant="plain" icon={ViewMinor} />
              </Tooltip>
              <Tooltip content="Edit product">
                <Button size="small" variant="plain" icon={EditMinor} />
              </Tooltip>
              <Tooltip content="Delete product">
                <Button size="small" variant="plain" icon={DeleteMinor} tone="critical" />
              </Tooltip>
            </InlineStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );

    return (
      <div style={{ width: '900px' }}>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            itemCount={sampleOrders.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'SKU' },
              { title: 'Price', alignment: 'end' },
              { title: 'Stock', alignment: 'end' },
              { title: 'Status', alignment: 'center' },
              { title: 'Actions', alignment: 'center' },
            ]}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
            lastColumnSticky
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </div>
    );
  },
};

export const LargeDataset: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [page, setPage] = useState(0);

    const largeDataset = Array.from({ length: 50 }, (_, i) => ({
      id: `${1000 - i}`,
      name: `Product ${i + 1}`,
      sku: `SKU${String(i + 1).padStart(3, '0')}`,
      price: Math.floor(Math.random() * 200) + 10,
      quantity: Math.floor(Math.random() * 100),
      status: Math.random() > 0.3 ? 'Active' : 'Archived',
    }));

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    const rowMarkup = largeDataset.map(
      ({ id, name, sku, price, quantity, status }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          selected={selectedIds.includes(id)}
        >
          <IndexTable.Cell>{name}</IndexTable.Cell>
          <IndexTable.Cell>{sku}</IndexTable.Cell>
          <IndexTable.Cell numeric>${price.toFixed(2)}</IndexTable.Cell>
          <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
          <IndexTable.Cell>
            <Badge status={status === 'Active' ? 'success' : 'info'}>
              {status}
            </Badge>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack gap="200">
              <Button size="small" variant="plain" icon={ViewMinor} />
              <Button size="small" variant="plain" icon={EditMinor} />
            </InlineStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );

    return (
      <div style={{ width: '900px', maxHeight: '600px', overflow: 'auto' }}>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            itemCount={largeDataset.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'SKU' },
              { title: 'Price', alignment: 'end' },
              { title: 'Stock', alignment: 'end' },
              { title: 'Status', alignment: 'center' },
              { title: 'Actions', alignment: 'center' },
            ]}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
            lastColumnSticky
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </div>
    );
  },
};

export const CustomerList: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const customers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', orders: 12, spent: 542.00, location: 'New York, USA' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 8, spent: 321.00, location: 'London, UK' },
      { id: '3', name: 'Bob Johnson', email: 'bob@example.com', orders: 23, spent: 1254.00, location: 'Toronto, Canada' },
      { id: '4', name: 'Alice Wilson', email: 'alice@example.com', orders: 5, spent: 189.00, location: 'Sydney, Australia' },
      { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', orders: 15, spent: 767.00, location: 'Austin, USA' },
    ];

    const customerResourceName = {
      singular: 'customer',
      plural: 'customers',
    };

    const customerBulkActions = [
      {
        content: 'Send email',
        onAction: () => console.log('Send email to selected'),
      },
      {
        content: 'Add to segment',
        onAction: () => console.log('Add selected to segment'),
      },
      {
        content: 'Export customers',
        onAction: () => console.log('Export selected customers'),
      },
    ];

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    const rowMarkup = customers.map(
      ({ id, name, email, orders, spent, location }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          selected={selectedIds.includes(id)}
        >
          <IndexTable.Cell>
            <div>
              <Text variant="bodyMd" fontWeight="medium" as="span">
                {name}
              </Text>
              <br />
              <Text variant="bodySm" color="subdued" as="span">
                {email}
              </Text>
            </div>
          </IndexTable.Cell>
          <IndexTable.Cell numeric>{orders}</IndexTable.Cell>
          <IndexTable.Cell numeric>${spent.toFixed(2)}</IndexTable.Cell>
          <IndexTable.Cell>{location}</IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack gap="200">
              <Button size="small" variant="plain">View</Button>
              <Button size="small" variant="plain">Edit</Button>
            </InlineStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );

    return (
      <div style={{ width: '900px' }}>
        <LegacyCard>
          <IndexTable
            resourceName={customerResourceName}
            itemCount={customers.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Customer' },
              { title: 'Orders', alignment: 'end' },
              { title: 'Total Spent', alignment: 'end' },
              { title: 'Location' },
              { title: 'Actions', alignment: 'center' },
            ]}
            bulkActions={customerBulkActions}
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </div>
    );
  },
};

export const OrderManagement: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const orders = [
      {
        id: 'ORD001',
        customer: 'John Doe',
        date: 'Jul 20, 2024',
        total: 125.00,
        status: 'fulfilled',
        payment: 'paid',
        items: 3
      },
      {
        id: 'ORD002',
        customer: 'Jane Smith',
        date: 'Jul 20, 2024',
        total: 89.00,
        status: 'processing',
        payment: 'pending',
        items: 2
      },
      {
        id: 'ORD003',
        customer: 'Bob Johnson',
        date: 'Jul 19, 2024',
        total: 234.00,
        status: 'unfulfilled',
        payment: 'paid',
        items: 5
      },
      {
        id: 'ORD004',
        customer: 'Alice Wilson',
        date: 'Jul 19, 2024',
        total: 67.00,
        status: 'fulfilled',
        payment: 'refunded',
        items: 1
      },
    ];

    const orderResourceName = {
      singular: 'order',
      plural: 'orders',
    };

    const getStatusBadge = (status: string, payment: string) => {
      if (payment === 'refunded') return <Badge status="info">Refunded</Badge>;

      const statusConfig = {
        fulfilled: 'success',
        processing: 'attention',
        unfulfilled: 'warning',
      } as const;

      return <Badge status={statusConfig[status as keyof typeof statusConfig] || 'info'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>;
    };

    const getPaymentBadge = (payment: string) => {
      const config = {
        paid: 'success',
        pending: 'attention',
        refunded: 'info',
      } as const;
      return <Badge status={config[payment as keyof typeof config]}>
        {payment.charAt(0).toUpperCase() + payment.slice(1)}
      </Badge>;
    };

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    const rowMarkup = orders.map(
      ({ id, customer, date, total, status, payment, items }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          selected={selectedIds.includes(id)}
        >
          <IndexTable.Cell>
            <div>
              <Text variant="bodyMd" fontWeight="medium" as="span">
                {id}
              </Text>
              <br />
              <Text variant="bodySm" color="subdued" as="span">
                {customer}
              </Text>
            </div>
          </IndexTable.Cell>
          <IndexTable.Cell>{date}</IndexTable.Cell>
          <IndexTable.Cell numeric>${total.toFixed(2)}</IndexTable.Cell>
          <IndexTable.Cell numeric>{items}</IndexTable.Cell>
          <IndexTable.Cell>{getPaymentBadge(payment)}</IndexTable.Cell>
          <IndexTable.Cell>{getStatusBadge(status, payment)}</IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack gap="200">
              <Button size="small" variant="plain">View</Button>
              <Button size="small" variant="plain">Fulfill</Button>
            </InlineStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );

    return (
      <div style={{ width: '1000px' }}>
        <LegacyCard>
          <IndexTable
            resourceName={orderResourceName}
            itemCount={orders.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Order' },
              { title: 'Date' },
              { title: 'Total', alignment: 'end' },
              { title: 'Items', alignment: 'end' },
              { title: 'Payment', alignment: 'center' },
              { title: 'Status', alignment: 'center' },
              { title: 'Actions', alignment: 'center' },
            ]}
            bulkActions={[
              {
                content: 'Fulfill orders',
                onAction: () => console.log('Fulfill selected'),
              },
              {
                content: 'Archive orders',
                onAction: () => console.log('Archive selected'),
              },
              {
                content: 'Export orders',
                onAction: () => console.log('Export selected'),
              },
            ]}
            lastColumnSticky
          >
            {rowMarkup}
          </IndexTable>
        </LegacyCard>
      </div>
    );
  },
};

export const WithCustomBulkActions: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const customBulkActions = [
      {
        content: 'Apply 10% discount',
        onAction: () => console.log('Apply discount to selected'),
        icon: CircleTickMinor,
      },
      {
        content: 'Set as featured',
        onAction: () => console.log('Set selected as featured'),
        icon: MobileMajor,
      },
      {
        content: 'Add to collection',
        onAction: () => console.log('Add selected to collection'),
        icon: DesktopMajor,
      },
    ];

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    return (
      <div style={{ width: '800px' }}>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            itemCount={sampleOrders.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'SKU' },
              { title: 'Price', alignment: 'end' },
              { title: 'Stock', alignment: 'end' },
              { title: 'Status', alignment: 'center' },
            ]}
            promotedBulkActions={customBulkActions}
            bulkActions={[
              {
                content: 'Duplicate products',
                onAction: () => console.log('Duplicate selected'),
              },
              {
                content: 'Delete products',
                onAction: () => console.log('Delete selected'),
                destructive: true,
              },
            ]}
          >
            {sampleOrders.map(
              ({ id, name, sku, price, quantity, status }, index) => (
                <IndexTable.Row
                  id={id}
                  key={id}
                  position={index}
                  selected={selectedIds.includes(id)}
                >
                  <IndexTable.Cell>{name}</IndexTable.Cell>
                  <IndexTable.Cell>{sku}</IndexTable.Cell>
                  <IndexTable.Cell numeric>${price.toFixed(2)}</IndexTable.Cell>
                  <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
                  <IndexTable.Cell>
                    <Badge status={status === 'Active' ? 'success' : 'info'}>
                      {status}
                    </Badge>
                  </IndexTable.Cell>
                </IndexTable.Row>
              ),
            )}
          </IndexTable>
        </LegacyCard>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={0}
          headings={[
            { title: 'Product' },
            { title: 'SKU' },
            { title: 'Price', alignment: 'end' },
            { title: 'Stock', alignment: 'end' },
            { title: 'Status', alignment: 'center' },
          ]}
          loading
        >
          <IndexTable.Row position={0} id="loading">
            <IndexTable.Cell>Loading products...</IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
            <IndexTable.Cell></IndexTable.Cell>
          </IndexTable.Row>
        </IndexTable>
      </LegacyCard>
    </div>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <LegacyCard>
        <IndexTable
          resourceName={resourceName}
          itemCount={0}
          headings={[
            { title: 'Product' },
            { title: 'SKU' },
            { title: 'Price', alignment: 'end' },
            { title: 'Stock', alignment: 'end' },
            { title: 'Status', alignment: 'center' },
          ]}
          emptyState="No products found"
        />
      </LegacyCard>
    </div>
  ),
};

export const WithPagination: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [hasNext, setHasNext] = useState(true);
    const [hasPrevious, setHasPrevious] = useState(false);

    const paginatedData = Array.from({ length: 25 }, (_, i) => ({
      id: `${2000 - i}`,
      name: `Product ${i + 1}`,
      sku: `PRD${String(i + 1).padStart(3, '0')}`,
      price: Math.floor(Math.random() * 150) + 25,
      quantity: Math.floor(Math.random() * 200),
      status: Math.random() > 0.2 ? 'Active' : 'Archived',
    }));

    const handleSelectionChange = useCallback((newSelectedIds: string[]) => {
      setSelectedIds(newSelectedIds);
    }, []);

    const handleNext = () => {
      setHasPrevious(true);
      setHasNext(false);
    };

    const handlePrevious = () => {
      setHasPrevious(false);
      setHasNext(true);
    };

    const rowMarkup = paginatedData.map(
      ({ id, name, sku, price, quantity, status }, index) => (
        <IndexTable.Row
          id={id}
          key={id}
          position={index}
          selected={selectedIds.includes(id)}
        >
          <IndexTable.Cell>{name}</IndexTable.Cell>
          <IndexTable.Cell>{sku}</IndexTable.Cell>
          <IndexTable.Cell numeric>${price.toFixed(2)}</IndexTable.Cell>
          <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
          <IndexTable.Cell>
            <Badge status={status === 'Active' ? 'success' : 'info'}>
              {status}
            </Badge>
          </IndexTable.Cell>
        </IndexTable.Row>
      ),
    );

    return (
      <div style={{ width: '800px' }}>
        <LegacyCard>
          <IndexTable
            resourceName={resourceName}
            itemCount={paginatedData.length}
            selectedItemsCount={selectedIds.length}
            onSelectionChange={handleSelectionChange}
            headings={[
              { title: 'Product' },
              { title: 'SKU' },
              { title: 'Price', alignment: 'end' },
              { title: 'Stock', alignment: 'end' },
              { title: 'Status', alignment: 'center' },
            ]}
            promotedBulkActions={promotedBulkActions}
            bulkActions={bulkActions}
            hasMoreItems
            onSort={() => console.log('Sort')}
          >
            {rowMarkup}
          </IndexTable>
          <div style={{ padding: '16px', borderTop: '1px solid #e1e1e1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text color="subdued" as="p">
                Showing {paginatedData.length} of 100 products
              </Text>
              <InlineStack gap="200">
                <Button onClick={handlePrevious} disabled={!hasPrevious}>
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!hasNext}>
                  Next
                </Button>
              </InlineStack>
            </div>
          </div>
        </LegacyCard>
      </div>
    );
  },
};