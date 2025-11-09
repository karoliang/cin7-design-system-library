import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, BlockStack, Text, Badge, Button, DataTable, TextField, Select, Pagination, ButtonGroup } from '@shopify/polaris';
import React, { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Mock product data for realistic business scenarios
const mockProducts = [
  { id: 1, sku: 'PROD-001', name: 'Wireless Mouse', category: 'Electronics', price: 29.99, stock: 150, status: 'active' },
  { id: 2, sku: 'PROD-002', name: 'USB Keyboard', category: 'Electronics', price: 49.99, stock: 75, status: 'active' },
  { id: 3, sku: 'PROD-003', name: 'Monitor Stand', category: 'Accessories', price: 39.99, stock: 200, status: 'active' },
  { id: 4, sku: 'PROD-004', name: 'Desk Lamp', category: 'Furniture', price: 24.99, stock: 0, status: 'out_of_stock' },
  { id: 5, sku: 'PROD-005', name: 'Office Chair', category: 'Furniture', price: 199.99, stock: 25, status: 'active' },
  { id: 6, sku: 'PROD-006', name: 'Notebook Set', category: 'Stationery', price: 12.99, stock: 500, status: 'active' },
  { id: 7, sku: 'PROD-007', name: 'Pen Pack', category: 'Stationery', price: 8.99, stock: 1000, status: 'active' },
  { id: 8, sku: 'PROD-008', name: 'External Hard Drive', category: 'Electronics', price: 89.99, stock: 50, status: 'active' },
];

const mockOrders = [
  { id: 'ORD-1001', customer: 'Acme Corp', date: '2024-11-01', total: 1250.00, status: 'completed', items: 5 },
  { id: 'ORD-1002', customer: 'TechStart Inc', date: '2024-11-02', total: 850.50, status: 'processing', items: 3 },
  { id: 'ORD-1003', customer: 'Global Solutions', date: '2024-11-03', total: 2100.00, status: 'shipped', items: 8 },
  { id: 'ORD-1004', customer: 'Small Business LLC', date: '2024-11-04', total: 450.00, status: 'pending', items: 2 },
  { id: 'ORD-1005', customer: 'Enterprise Co', date: '2024-11-05', total: 5500.00, status: 'completed', items: 15 },
];

// Mock ExtJS Data Grid - Basic Implementation
const ExtDataGrid = ({ columns, data, title, features = [] }) => {
  const [gridData, setGridData] = useState(data);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  const hasFeature = (feature) => features.includes(feature);

  const handleSort = (columnIndex) => {
    if (!hasFeature('sorting')) return;

    const newDirection = sortColumn === columnIndex && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(columnIndex);
    setSortDirection(newDirection);

    const sorted = [...gridData].sort((a, b) => {
      const aVal = a[columnIndex];
      const bVal = b[columnIndex];
      if (newDirection === 'asc') {
        return aVal > bVal ? 1 : -1;
      }
      return aVal < bVal ? 1 : -1;
    });
    setGridData(sorted);
  };

  return (
    <Card>
      <BlockStack gap="400">
        {title && (
          <div style={{ padding: '16px 16px 0' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
          </div>
        )}

        <DataTable
          columnContentTypes={columns.map(c => c.type || 'text')}
          headings={columns.map((c, idx) => (
            <span
              onClick={() => handleSort(idx)}
              style={{ cursor: hasFeature('sorting') ? 'pointer' : 'default' }}
            >
              {c.header}
              {hasFeature('sorting') && sortColumn === idx && (sortDirection === 'asc' ? ' ↑' : ' ↓')}
            </span>
          ))}
          rows={gridData}
        />

        <div style={{ padding: '0 16px 16px' }}>
          <BlockStack gap="200">
            <Badge tone="info">ExtJS Data Grid</Badge>
            <Text variant="bodySm" as="p" tone="subdued">
              Features: {features.length > 0 ? features.join(', ') : 'basic display'}
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};

// Mock Editable Grid
const EditableDataGrid = ({ columns, initialData, title, onUpdate }) => {
  const [data, setData] = useState(initialData);
  const [editingCell, setEditingCell] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (rowIndex, colIndex) => {
    if (columns[colIndex].editable) {
      setEditingCell({ row: rowIndex, col: colIndex });
      setEditValue(data[rowIndex][colIndex]);
    }
  };

  const handleSave = () => {
    if (editingCell) {
      const newData = [...data];
      newData[editingCell.row][editingCell.col] = editValue;
      setData(newData);
      onUpdate?.(newData);
      setEditingCell(null);
    }
  };

  const rows = data.map((row, rowIdx) =>
    row.map((cell, colIdx) => {
      const isEditing = editingCell?.row === rowIdx && editingCell?.col === colIdx;
      return isEditing ? (
        <TextField
          value={editValue}
          onChange={setEditValue}
          onBlur={handleSave}
          autoComplete="off"
          label=""
        />
      ) : (
        <span
          onClick={() => handleCellClick(rowIdx, colIdx)}
          style={{ cursor: columns[colIdx].editable ? 'pointer' : 'default' }}
        >
          {cell}
        </span>
      );
    })
  );

  return (
    <Card>
      <BlockStack gap="400">
        {title && (
          <div style={{ padding: '16px 16px 0' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
          </div>
        )}

        <DataTable
          columnContentTypes={columns.map(c => c.type || 'text')}
          headings={columns.map(c => c.header)}
          rows={rows}
        />

        <div style={{ padding: '0 16px 16px' }}>
          <BlockStack gap="200">
            <Badge tone="success">Editable Grid</Badge>
            <Text variant="bodySm" as="p" tone="subdued">
              Click on editable cells to modify values inline
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};

// Mock Grouped Grid
const GroupedDataGrid = ({ data, groupBy, title }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const groupedData = data.reduce((acc, row) => {
    const groupKey = row[groupBy];
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(row);
    return acc;
  }, {});

  const toggleGroup = (groupKey) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupKey)) {
      newExpanded.delete(groupKey);
    } else {
      newExpanded.add(groupKey);
    }
    setExpandedGroups(newExpanded);
  };

  return (
    <Card>
      <BlockStack gap="400">
        {title && (
          <div style={{ padding: '16px 16px 0' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
          </div>
        )}

        <div style={{ padding: '16px' }}>
          {Object.entries(groupedData).map(([groupKey, items]: [string, any[]]) => (
            <div key={groupKey} style={{ marginBottom: '16px' }}>
              <div
                onClick={() => toggleGroup(groupKey)}
                style={{
                  cursor: 'pointer',
                  padding: '8px',
                  backgroundColor: '#f6f6f7',
                  borderRadius: '8px',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                {expandedGroups.has(groupKey) ? '▼' : '▶'} {groupKey} ({items.length} items)
              </div>

              {expandedGroups.has(groupKey) && (
                <div style={{ paddingLeft: '24px' }}>
                  <DataTable
                    columnContentTypes={['text', 'text', 'numeric', 'numeric']}
                    headings={['SKU', 'Name', 'Price', 'Stock']}
                    rows={items.map(item => [item.sku, item.name, `$${item.price}`, item.stock])}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 16px 16px' }}>
          <BlockStack gap="200">
            <Badge tone="attention">Grouped Grid</Badge>
            <Text variant="bodySm" as="p" tone="subdued">
              Click group headers to expand/collapse
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};

// Mock Filtered Grid
const FilteredDataGrid = ({ columns, initialData, title }) => {
  const [data, setData] = useState(initialData);
  const [searchValue, setSearchValue] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(mockProducts.map(p => p.category))];

  React.useEffect(() => {
    let filtered = initialData;

    if (searchValue) {
      filtered = filtered.filter(row =>
        row.some(cell =>
          String(cell).toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(row => row[2] === categoryFilter);
    }

    setData(filtered);
  }, [searchValue, categoryFilter, initialData]);

  return (
    <Card>
      <BlockStack gap="400">
        {title && (
          <div style={{ padding: '16px 16px 0' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
          </div>
        )}

        <div style={{ padding: '0 16px' }}>
          <Layout>
            <Layout.Section variant="oneThird">
              <TextField
                label="Search"
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search products..."
                autoComplete="off"
              />
            </Layout.Section>
            <Layout.Section variant="oneThird">
              <Select
                label="Category"
                options={categories.map(c => ({ label: c, value: c }))}
                value={categoryFilter}
                onChange={setCategoryFilter}
              />
            </Layout.Section>
          </Layout>
        </div>

        <DataTable
          columnContentTypes={columns.map(c => c.type || 'text')}
          headings={columns.map(c => c.header)}
          rows={data}
        />

        <div style={{ padding: '0 16px 16px' }}>
          <BlockStack gap="200">
            <Badge tone="warning">Filtered Grid</Badge>
            <Text variant="bodySm" as="p" tone="subdued">
              Showing {data.length} of {initialData.length} records
            </Text>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};

// Mock Paginated Grid
const PaginatedDataGrid = ({ columns, allData, title, pageSize = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allData.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = allData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Card>
      <BlockStack gap="400">
        {title && (
          <div style={{ padding: '16px 16px 0' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
          </div>
        )}

        <DataTable
          columnContentTypes={columns.map(c => c.type || 'text')}
          headings={columns.map(c => c.header)}
          rows={currentData}
        />

        <div style={{ padding: '0 16px 16px' }}>
          <BlockStack gap="400">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text variant="bodySm" as="p" tone="subdued">
                Showing {startIndex + 1}-{Math.min(endIndex, allData.length)} of {allData.length}
              </Text>

              <Pagination
                hasPrevious={currentPage > 1}
                onPrevious={handlePreviousPage}
                hasNext={currentPage < totalPages}
                onNext={handleNextPage}
              />
            </div>

            <Badge tone="info">Paginated Grid</Badge>
          </BlockStack>
        </div>
      </BlockStack>
    </Card>
  );
};

// Mock Selection Grid
const SelectionDataGrid = ({ columns, data, title }) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const toggleRow = (rowIndex) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowIndex)) {
      newSelected.delete(rowIndex);
    } else {
      newSelected.add(rowIndex);
    }
    setSelectedRows(newSelected);
    setSelectAll(newSelected.size === data.length);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      setSelectedRows(new Set(data.map((_, idx) => idx)));
      setSelectAll(true);
    }
  };

  const handleBulkAction = (action) => {
    alert(`Performing ${action} on ${selectedRows.size} selected items`);
  };

  const rowsWithCheckbox = data.map((row, idx) => [
    <input
      type="checkbox"
      checked={selectedRows.has(idx)}
      onChange={() => toggleRow(idx)}
    />,
    ...row
  ]);

  return (
    <Card>
      <BlockStack gap="400">
        {title && (
          <div style={{ padding: '16px 16px 0' }}>
            <Text variant="headingMd" as="h3">{title}</Text>
          </div>
        )}

        {selectedRows.size > 0 && (
          <div style={{ padding: '0 16px' }}>
            <BlockStack gap="300">
              <Text variant="headingSm" as="h4">
                {selectedRows.size} items selected
              </Text>
              <ButtonGroup>
                <Button onClick={() => handleBulkAction('delete')}>Delete</Button>
                <Button onClick={() => handleBulkAction('export')}>Export</Button>
                <Button onClick={() => handleBulkAction('update')}>Update Status</Button>
              </ButtonGroup>
            </BlockStack>
          </div>
        )}

        <DataTable
          columnContentTypes={['text', ...columns.map(c => c.type || 'text')]}
          headings={[
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />,
            ...columns.map(c => c.header)
          ]}
          rows={rowsWithCheckbox}
        />

        <div style={{ padding: '0 16px 16px' }}>
          <Badge tone="success">Selection Grid</Badge>
        </div>
      </BlockStack>
    </Card>
  );
};

const meta = {
  title: 'Cin7 DSL/Enterprise Components/ExtJS - Data Grid',
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('datatable', 'default'),
    docs: {
      description: {
        component: 'ExtJS Data Grid adapter for enterprise data management. The most critical component for business applications, supporting advanced features like inline editing, grouping, filtering, pagination, and bulk actions. Optimized for handling large datasets (1000+ records) with server-side integration capabilities.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicGrid: Story = {
  name: 'Basic Grid',
  parameters: {
    docs: {
      description: {
        story: 'Simple data grid with basic display functionality. Shows product inventory with sortable columns. This is the foundation for all ExtJS grid implementations.',
      },
    },
  },
  render: () => {
    const columns = [
      { header: 'SKU', type: 'text' },
      { header: 'Product Name', type: 'text' },
      { header: 'Category', type: 'text' },
      { header: 'Price', type: 'numeric' },
      { header: 'Stock', type: 'numeric' },
    ];

    const data = mockProducts.map(p => [
      p.sku,
      p.name,
      p.category,
      `$${p.price.toFixed(2)}`,
      p.stock
    ]);

    return (
      <Page title="Product Inventory - Basic Grid">
        <Layout>
          <Layout.Section>
            <ExtDataGrid
              title="Product Catalog"
              columns={columns}
              data={data}
              features={['sorting']}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Use Cases</Text>
                <Text as="p">
                  • Product catalogs and inventory management<br />
                  • Customer and supplier lists<br />
                  • Transaction histories<br />
                  • Any tabular business data
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const EditableGrid: Story = {
  name: 'Editable Grid',
  parameters: {
    docs: {
      description: {
        story: 'Grid with inline cell editing capabilities. Click on price or stock values to edit them directly. Essential for rapid data entry and updates in enterprise applications.',
      },
    },
  },
  render: () => {
    const columns = [
      { header: 'SKU', type: 'text', editable: false },
      { header: 'Product', type: 'text', editable: false },
      { header: 'Price', type: 'numeric', editable: true },
      { header: 'Stock', type: 'numeric', editable: true },
    ];

    const data = mockProducts.slice(0, 5).map(p => [
      p.sku,
      p.name,
      `$${p.price.toFixed(2)}`,
      p.stock.toString()
    ]);

    return (
      <Page title="Inventory Management - Editable Grid">
        <Layout>
          <Layout.Section>
            <EditableDataGrid
              title="Quick Edit Inventory"
              columns={columns}
              initialData={data}
              onUpdate={(newData) => console.log('Updated data:', newData)}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Features</Text>
                <Text as="p">
                  • Click any editable cell to modify<br />
                  • Automatic validation<br />
                  • Batch update support<br />
                  • Undo/redo capabilities<br />
                  • Server sync on save
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const GroupedGrid: Story = {
  name: 'Grouped Grid',
  parameters: {
    docs: {
      description: {
        story: 'Grid with collapsible grouping by category. Perfect for organizing large datasets into logical groups. Click group headers to expand/collapse sections.',
      },
    },
  },
  render: () => (
    <Page title="Products by Category - Grouped Grid">
      <Layout>
        <Layout.Section>
          <GroupedDataGrid
            title="Products Grouped by Category"
            data={mockProducts}
            groupBy="category"
          />
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text variant="headingMd" as="h3">Grouping Features</Text>
              <Text as="p">
                • Multi-level grouping<br />
                • Aggregate calculations per group<br />
                • Group-level actions<br />
                • Collapse/expand all<br />
                • Custom group renderers
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const FilteredGrid: Story = {
  name: 'Filtered Grid',
  parameters: {
    docs: {
      description: {
        story: 'Grid with real-time filtering and search capabilities. Combines text search with dropdown filters for powerful data discovery. Essential for large datasets.',
      },
    },
  },
  render: () => {
    const columns = [
      { header: 'SKU', type: 'text' },
      { header: 'Product', type: 'text' },
      { header: 'Category', type: 'text' },
      { header: 'Price', type: 'numeric' },
      { header: 'Stock', type: 'numeric' },
    ];

    const data = mockProducts.map(p => [
      p.sku,
      p.name,
      p.category,
      `$${p.price.toFixed(2)}`,
      p.stock
    ]);

    return (
      <Page title="Product Search - Filtered Grid">
        <Layout>
          <Layout.Section>
            <FilteredDataGrid
              title="Search & Filter Products"
              columns={columns}
              initialData={data}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Filter Features</Text>
                <Text as="p">
                  • Full-text search across all columns<br />
                  • Multi-column filtering<br />
                  • Date range filters<br />
                  • Custom filter expressions<br />
                  • Save filter presets
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const PaginatedGrid: Story = {
  name: 'Paginated Grid',
  parameters: {
    docs: {
      description: {
        story: 'Grid with server-side pagination for handling large datasets efficiently. Shows 5 records per page with navigation controls. Critical for performance with 1000+ records.',
      },
    },
  },
  render: () => {
    const columns = [
      { header: 'Order ID', type: 'text' },
      { header: 'Customer', type: 'text' },
      { header: 'Date', type: 'text' },
      { header: 'Total', type: 'numeric' },
      { header: 'Status', type: 'text' },
      { header: 'Items', type: 'numeric' },
    ];

    const data = mockOrders.map(o => [
      o.id,
      o.customer,
      o.date,
      `$${o.total.toFixed(2)}`,
      o.status,
      o.items.toString()
    ]);

    return (
      <Page title="Order History - Paginated Grid">
        <Layout>
          <Layout.Section>
            <PaginatedDataGrid
              title="Recent Orders"
              columns={columns}
              allData={data}
              pageSize={3}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Pagination Features</Text>
                <Text as="p">
                  • Server-side pagination<br />
                  • Configurable page sizes<br />
                  • Virtual scrolling for massive datasets<br />
                  • Page jump controls<br />
                  • Total record count display
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const SelectionGrid: Story = {
  name: 'Selection & Bulk Actions',
  parameters: {
    docs: {
      description: {
        story: 'Grid with row selection and bulk action capabilities. Select multiple rows using checkboxes and perform batch operations. Essential for workflow automation and bulk updates.',
      },
    },
  },
  render: () => {
    const columns = [
      { header: 'SKU', type: 'text' },
      { header: 'Product', type: 'text' },
      { header: 'Price', type: 'numeric' },
      { header: 'Stock', type: 'numeric' },
      { header: 'Status', type: 'text' },
    ];

    const data = mockProducts.slice(0, 6).map(p => [
      p.sku,
      p.name,
      `$${p.price.toFixed(2)}`,
      p.stock,
      p.status
    ]);

    return (
      <Page title="Bulk Operations - Selection Grid">
        <Layout>
          <Layout.Section>
            <SelectionDataGrid
              title="Select Products for Bulk Actions"
              columns={columns}
              data={data}
            />
          </Layout.Section>
          <Layout.Section>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Bulk Action Features</Text>
                <Text as="p">
                  • Single and multi-row selection<br />
                  • Select all/none controls<br />
                  • Bulk delete, update, export<br />
                  • Selection preservation during pagination<br />
                  • Custom bulk action plugins
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
