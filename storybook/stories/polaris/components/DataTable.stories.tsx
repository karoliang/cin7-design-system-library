import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, Button, Badge, Icon } from '@shopify/polaris';
import { ChevronDownMinor, ChevronUpMinor, ViewMinor, EditMinor, DeleteMinor } from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Data tables display structured data in rows and columns. They are essential for presenting large datasets that users can scan, sort, filter, and interact with. Data tables support sorting, selection, pagination, and inline actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columnContentTypes: {
      control: {
        type: 'select',
        options: ['text', 'numeric', 'currency', 'date', 'datetime', 'url', 'image', 'custom'],
        multi: true
      },
      description: 'Data type for each column',
    },
    headings: {
      control: 'object',
      description: 'Column headers',
    },
    rows: {
      control: 'object',
      description: 'Table row data',
    },
    footerContent: {
      control: 'text',
      description: 'Footer content or summary',
    },
    increasedTableDensity: {
      control: 'boolean',
      description: 'Make table more compact',
    },
    hasZebraStriping: {
      control: 'boolean',
      description: 'Add alternating row colors',
    },
    hideScrollBars: {
      control: 'boolean',
      description: 'Hide scrollbars for cleaner appearance',
    },
    sortable: {
      control: 'boolean',
      description: 'Enable column sorting',
    },
    defaultSortDirection: {
      control: 'select',
      options: ['ascending', 'descending'],
      description: 'Default sort direction',
    },
    initialSortColumnIndex: {
      control: 'number',
      description: 'Column to sort by initially',
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOrders = [
  ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
  ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
  ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
  ['#1017', 'Jul 19 at 8:12pm', '$234.00', '8 items', 'Unfulfilled'],
  ['#1016', 'Jul 19 at 5:45pm', '$67.00', '2 items', 'Fulfilled'],
];

const sampleProducts = [
  ['Vintage T-Shirt', 'Apparel', '$25.00', '150', 'Active'],
  ['Coffee Mug', 'Kitchen', '$12.00', '89', 'Active'],
  ['Wireless Mouse', 'Electronics', '$45.00', '42', 'Out of Stock'],
  ['Leather Wallet', 'Accessories', '$78.00', '23', 'Active'],
  ['Notebook Set', 'Stationery', '$15.00', '200', 'Active'],
];

const statusColors = {
  Fulfilled: 'success',
  Unfulfilled: 'attention',
  Active: 'success',
  'Out of Stock': 'critical',
} as const;

export const Default: Story = {
  args: {
    columnContentTypes: ['text', 'text', 'numeric', 'text', 'text'],
    headings: ['Order', 'Date', 'Total', 'Items', 'Status'],
    rows: sampleOrders,
  },
};

export const ProductTable: Story = {
  args: {
    columnContentTypes: ['text', 'text', 'numeric', 'numeric', 'text'],
    headings: ['Product', 'Category', 'Price', 'Stock', 'Status'],
    rows: sampleProducts,
  },
};

export const WithCustomContent: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
        headings={['Order', 'Customer', 'Total', 'Status', 'Actions']}
        rows={[
          ['#1020', 'John Doe', '$42.00', 'Fulfilled', (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="small" variant="plain" icon={ViewMinor}>View</Button>
              <Button size="small" variant="plain" icon={EditMinor}>Edit</Button>
            </div>
          )],
          ['#1019', 'Jane Smith', '$125.00', 'Unfulfilled', (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="small" variant="plain" icon={ViewMinor}>View</Button>
              <Button size="small" variant="plain" icon={EditMinor}>Edit</Button>
            </div>
          )],
          ['#1018', 'Bob Johnson', '$89.00', 'Fulfilled', (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button size="small" variant="plain" icon={ViewMinor}>View</Button>
              <Button size="small" variant="plain" icon={EditMinor}>Edit</Button>
            </div>
          )],
        ]}
      />
    </div>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        columnContentTypes={['text', 'text', 'numeric', 'text']}
        headings={['Product', 'Category', 'Price', 'Status']}
        rows={[
          ['Vintage T-Shirt', 'Apparel', '$25.00', <Badge status="success">In Stock</Badge>],
          ['Coffee Mug', 'Kitchen', '$12.00', <Badge status="success">In Stock</Badge>],
          ['Wireless Mouse', 'Electronics', '$45.00', <Badge status="critical">Out of Stock</Badge>],
          ['Leather Wallet', 'Accessories', '$78.00', <Badge status="success">In Stock</Badge>],
        ]}
      />
    </div>
  ),
};

export const Sortable: Story = {
  render: () => {
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
    const [sortedColumnIndex, setSortedColumnIndex] = useState(0);

    const handleSort = (columnIndex: number, direction: 'ascending' | 'descending') => {
      setSortedColumnIndex(columnIndex);
      setSortDirection(direction);
    };

    const getSortIcon = (columnIndex: number) => {
      if (sortedColumnIndex !== columnIndex) {
        return <Icon source={ChevronDownMinor} color="subdued" />;
      }
      return <Icon source={sortDirection === 'ascending' ? ChevronUpMinor : ChevronDownMinor} />;
    };

    const sortableHeadings = [
      <div key="product" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        Product {getSortIcon(0)}
      </div>,
      <div key="category" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        Category {getSortIcon(1)}
      </div>,
      <div key="price" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        Price {getSortIcon(2)}
      </div>,
      <div key="stock" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
        Stock {getSortIcon(3)}
      </div>,
      'Status',
    ];

    return (
      <div style={{ width: '800px' }}>
        <DataTable
          columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
          headings={sortableHeadings}
          rows={sampleProducts}
          sortable={[true, true, true, true, false]}
          defaultSortDirection="ascending"
          initialSortColumnIndex={0}
          onSort={handleSort}
        />
      </div>
    );
  },
};

export const WithFooter: Story = {
  args: {
    columnContentTypes: ['text', 'text', 'numeric', 'text', 'text'],
    headings: ['Order', 'Date', 'Total', 'Items', 'Status'],
    rows: sampleOrders,
    footerContent: `Showing ${sampleOrders.length} orders`,
  },
};

export const DenseTable: Story = {
  args: {
    columnContentTypes: ['text', 'numeric', 'text'],
    headings: ['Product', 'Price', 'Status'],
    rows: [
      ['Basic T-Shirt', '$15.00', 'In Stock'],
      ['Premium T-Shirt', '$25.00', 'In Stock'],
      ['Deluxe T-Shirt', '$35.00', 'Limited'],
      ['Ultra T-Shirt', '$50.00', 'Pre-order'],
    ],
    increasedTableDensity: true,
    hasZebraStriping: true,
  },
};

export const LargeDataset: Story = {
  render: () => {
    const largeDataset = Array.from({ length: 50 }, (_, i) => [
      `#${10000 - i}`,
      `Customer ${i + 1}`,
      `$${Math.floor(Math.random() * 500) + 10}.00`,
      `${Math.floor(Math.random() * 10) + 1} items`,
      Math.random() > 0.3 ? 'Fulfilled' : 'Unfulfilled',
    ]);

    return (
      <div style={{ width: '900px', maxHeight: '500px', overflow: 'auto' }}>
        <DataTable
          columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
          headings={['Order', 'Customer', 'Total', 'Items', 'Status']}
          rows={largeDataset}
          hasZebraStriping={true}
          hideScrollBars={false}
          footerContent={`Showing ${largeDataset.length} orders`}
        />
      </div>
    );
  },
};

export const FinancialData: Story = {
  render: () => {
    const financialData = [
      ['Q1 2024', '$125,000', '$95,000', '$30,000', '24.0%'],
      ['Q2 2024', '$145,000', '$110,000', '$35,000', '24.1%'],
      ['Q3 2024', '$168,000', '$128,000', '$40,000', '23.8%'],
      ['Q4 2024', '$192,000', '$145,000', '$47,000', '24.5%'],
      ['Total', '$630,000', '$478,000', '$152,000', '24.1%'],
    ];

    return (
      <div style={{ width: '800px' }}>
        <DataTable
          columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'text']}
          headings={['Period', 'Revenue', 'Costs', 'Profit', 'Margin']}
          rows={financialData}
          footerContent="Annual Financial Summary"
        />
      </div>
    );
  },
};

export const UserManagement: Story = {
  render: () => {
    const users = [
      ['john.doe@example.com', 'John Doe', 'Admin', 'Last active 2 hours ago'],
      ['jane.smith@example.com', 'Jane Smith', 'Editor', 'Last active 1 day ago'],
      ['bob.johnson@example.com', 'Bob Johnson', 'Viewer', 'Last active 3 days ago'],
      ['alice.wilson@example.com', 'Alice Wilson', 'Admin', 'Last active 5 minutes ago'],
    ];

    const getRoleBadge = (role: string) => {
      const colors = {
        Admin: 'critical',
        Editor: 'attention',
        Viewer: 'info',
      } as const;
      return <Badge status={colors[role as keyof typeof colors]}>{role}</Badge>;
    };

    const rows = users.map(([email, name, role, lastActive]) => [
      email,
      name,
      getRoleBadge(role),
      lastActive,
    ]);

    return (
      <div style={{ width: '800px' }}>
        <DataTable
          columnContentTypes={['text', 'text', 'text', 'text']}
          headings={['Email', 'Name', 'Role', 'Last Active']}
          rows={rows}
          footerContent={`${users.length} users total`}
        />
      </div>
    );
  },
};

export const InventoryTable: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const inventory = [
      ['SKU001', 'Cotton T-Shirt', '25', '50', '$15.00', 'Active'],
      ['SKU002', 'Denim Jeans', '42', '25', '$75.00', 'Active'],
      ['SKU003', 'Leather Belt', '18', '100', '$35.00', 'Low Stock'],
      ['SKU004', 'Wool Sweater', '0', '30', '$65.00', 'Out of Stock'],
    ];

    const getStockBadge = (stock: string) => {
      const numStock = parseInt(stock);
      if (numStock === 0) return <Badge status="critical">Out of Stock</Badge>;
      if (numStock < 20) return <Badge status="attention">Low Stock</Badge>;
      return <Badge status="success">In Stock</Badge>;
    };

    const rows = inventory.map(([sku, name, stock, capacity, price, status]) => [
      sku,
      name,
      stock,
      capacity,
      price,
      getStockBadge(stock),
    ]);

    return (
      <div style={{ width: '900px' }}>
        <DataTable
          columnContentTypes={['text', 'text', 'numeric', 'numeric', 'numeric', 'text']}
          headings={['SKU', 'Product', 'Stock', 'Capacity', 'Price', 'Status']}
          rows={rows}
          hasZebraStriping={true}
          footerContent={`Total products: ${inventory.length}`}
        />
      </div>
    );
  },
};

export const InteractiveTable: Story = {
  render: () => {
    const [filter, setFilter] = useState('');
    const [sortColumn, setSortColumn] = useState(0);
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');

    const orders = [
      { id: '#1020', customer: 'John Doe', total: 42, status: 'Fulfilled', date: '2024-07-20' },
      { id: '#1019', customer: 'Jane Smith', total: 125, status: 'Unfulfilled', date: '2024-07-20' },
      { id: '#1018', customer: 'Bob Johnson', total: 89, status: 'Fulfilled', date: '2024-07-19' },
      { id: '#1017', customer: 'Alice Wilson', total: 234, status: 'Unfulfilled', date: '2024-07-19' },
      { id: '#1016', customer: 'Charlie Brown', total: 67, status: 'Fulfilled', date: '2024-07-18' },
    ];

    const filteredOrders = orders.filter(order =>
      order.customer.toLowerCase().includes(filter.toLowerCase()) ||
      order.id.toLowerCase().includes(filter.toLowerCase()) ||
      order.status.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedOrders = [...filteredOrders].sort((a, b) => {
      const keys = ['id', 'customer', 'total', 'status', 'date'] as const;
      const key = keys[sortColumn];
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === 'ascending' ? comparison : -comparison;
    });

    const rows = sortedOrders.map(order => [
      order.id,
      order.customer,
      `$${order.total}.00`,
      <Badge key={order.id} status={order.status === 'Fulfilled' ? 'success' : 'attention'}>
        {order.status}
      </Badge>,
      order.date,
    ]);

    const handleSort = (columnIndex: number) => {
      if (sortColumn === columnIndex) {
        setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending');
      } else {
        setSortColumn(columnIndex);
        setSortDirection('ascending');
      }
    };

    const sortableHeadings = [
      <div key="id" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleSort(0)}>
        Order {sortColumn === 0 && (sortDirection === 'ascending' ? '↑' : '↓')}
      </div>,
      <div key="customer" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleSort(1)}>
        Customer {sortColumn === 1 && (sortDirection === 'ascending' ? '↑' : '↓')}
      </div>,
      <div key="total" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleSort(2)}>
        Total {sortColumn === 2 && (sortDirection === 'ascending' ? '↑' : '↓')}
      </div>,
      <div key="status" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleSort(3)}>
        Status {sortColumn === 3 && (sortDirection === 'ascending' ? '↑' : '↓')}
      </div>,
      <div key="date" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleSort(4)}>
        Date {sortColumn === 4 && (sortDirection === 'ascending' ? '↑' : '↓')}
      </div>,
    ];

    return (
      <div style={{ width: '900px' }}>
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search orders..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              width: '300px',
              padding: '8px 12px',
              border: '1px solid #d2d2d2',
              borderRadius: '4px',
              fontSize: "var(--font-size-sm)",
            }}
          />
        </div>

        <DataTable
          columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
          headings={sortableHeadings}
          rows={rows}
          hasZebraStriping={true}
          footerContent={`Showing ${sortedOrders.length} of ${orders.length} orders`}
        />
      </div>
    );
  },
};