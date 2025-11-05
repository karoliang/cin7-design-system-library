import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  DataTable,
  Button,
  Badge,
  Icon,
  TextField,
  Select,
  Checkbox,
  Pagination,
  ButtonGroup,
  Tooltip,
  Popover,
  ActionList,
  Banner,
  ProgressBar,
  Modal,
  TextContainer,
  Text,
  InlineStack,
  BlockStack,
  Grid,
  Divider,
  Scrollable,
  Filters,
  IndexTable,
  useIndexResourceState,
  IndexFilters,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import {
  SearchMinor,
  FilterMajor,
  DownloadMajor,
  UploadMajor,
  ViewMinor,
  EditMinor,
  DeleteMinor,
  DuplicateMinor,
  ExportMinor,
  ImportMinor,
  PlusMinor,
  CheckmarkMinor,
  XMarkMinor,
  AlertMinor,
  InfoMinor,
  ChevronDownMinor,
  ChevronUpMinor,
  RefreshMinor,
  SaveMinor,
  PrintMinor,
  ArchiveMajor,
  UnarchiveMajor,
} from '@shopify/polaris-icons';
import React, { useState, useCallback, useMemo } from 'react';

const meta = {
  title: 'Business Components/Data Management',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced data management components for enterprise applications. Features bulk operations, data import/export, advanced filtering, search functionality, and performance optimization for large datasets.',
      },
    },
  },
  tags: ['autodocs', 'business', 'data', 'management'],
  argTypes: {
    showBulkActions: {
      control: 'boolean',
      description: 'Enable bulk selection and actions',
    },
    enableAdvancedFilters: {
      control: 'boolean',
      description: 'Show advanced filtering options',
    },
    showExportOptions: {
      control: 'boolean',
      description: 'Display data export functionality',
    },
  },
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for demonstrations
const sampleOrders = [
  { id: '#1020', customer: 'John Doe', email: 'john@example.com', total: 452.00, status: 'Fulfilled', date: '2024-07-20', items: 5, priority: 'High', tags: ['VIP', 'Express'] },
  { id: '#1019', customer: 'Jane Smith', email: 'jane@example.com', total: 125.00, status: 'Processing', date: '2024-07-20', items: 2, priority: 'Medium', tags: ['New Customer'] },
  { id: '#1018', customer: 'Bob Johnson', email: 'bob@example.com', total: 789.00, status: 'Unfulfilled', date: '2024-07-19', items: 8, priority: 'High', tags: ['Bulk Order'] },
  { id: '#1017', customer: 'Alice Wilson', email: 'alice@example.com', total: 234.00, status: 'Fulfilled', date: '2024-07-19', items: 3, priority: 'Low', tags: [] },
  { id: '#1016', customer: 'Charlie Brown', email: 'charlie@example.com', total: 567.00, status: 'Processing', date: '2024-07-18', items: 6, priority: 'Medium', tags: ['Return'] },
  { id: '#1015', customer: 'Diana Prince', email: 'diana@example.com', total: 890.00, status: 'Cancelled', date: '2024-07-18', items: 12, priority: 'High', tags: ['VIP', 'International'] },
];

const sampleCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123', orders: 45, totalSpent: 12543.00, status: 'Active', lastOrder: '2024-07-15', tier: 'Gold' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0124', orders: 23, totalSpent: 5678.00, status: 'Active', lastOrder: '2024-07-20', tier: 'Silver' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-0125', orders: 89, totalSpent: 23456.00, status: 'Active', lastOrder: '2024-07-14', tier: 'Platinum' },
  { id: 4, name: 'Alice Wilson', email: 'alice@example.com', phone: '555-0126', orders: 12, totalSpent: 2345.00, status: 'Inactive', lastOrder: '2024-06-30', tier: 'Bronze' },
];

const sampleProducts = [
  { id: 'SKU001', name: 'Premium Wireless Headphones', category: 'Electronics', stock: 45, price: 299.99, status: 'Active', lowStock: false, supplier: 'TechCorp' },
  { id: 'SKU002', name: 'Organic Cotton T-Shirt', category: 'Apparel', stock: 8, price: 29.99, status: 'Active', lowStock: true, supplier: 'EcoWear' },
  { id: 'SKU003', name: 'Smart Fitness Watch', category: 'Wearables', stock: 0, price: 199.99, status: 'Out of Stock', lowStock: true, supplier: 'TechCorp' },
  { id: 'SKU004', name: 'Leather Wallet', category: 'Accessories', stock: 120, price: 75.00, status: 'Active', lowStock: false, supplier: 'LeatherGoods' },
];

// Advanced Data Table with Bulk Operations
const AdvancedDataTable = ({ data, showBulkActions = true, enableAdvancedFilters = true }: {
  data: any[];
  showBulkActions?: boolean;
  enableAdvancedFilters?: boolean;
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortColumn, setSortColumn] = useState(0);
  const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = useMemo(() => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(item => item.status === filterStatus);
    }

    // Sort logic
    const keys = Object.keys(data[0]);
    const sortKey = keys[sortColumn];
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'ascending' ? aValue - bValue : bValue - aValue;
      }

      const comparison = String(aValue).localeCompare(String(bValue));
      return sortDirection === 'ascending' ? comparison : -comparison;
    });

    return filtered;
  }, [data, searchQuery, filterStatus, sortColumn, sortDirection]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (columnIndex: number) => {
    if (sortColumn === columnIndex) {
      setSortDirection(prev => prev === 'ascending' ? 'descending' : 'ascending');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('ascending');
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(paginatedData.map((item, index) => String(index)));
    }
  };

  const handleSelectItem = (index: string) => {
    setSelectedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: 'critical',
      Medium: 'attention',
      Low: 'info',
    } as const;
    return <Badge status={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      Fulfilled: 'success',
      Processing: 'attention',
      Unfulfilled: 'warning',
      Cancelled: 'critical',
      Active: 'success',
      Inactive: 'subdued',
      'Out of Stock': 'critical',
    } as const;
    return <Badge status={colors[status as keyof typeof colors] || 'info'}>{status}</Badge>;
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Text variant="headingLg" as="h2">Data Management</Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button icon={RefreshMinor} onClick={() => {}}>Refresh</Button>
            <Button icon={DownloadMajor} onClick={() => {}}>Export</Button>
            <Button icon={UploadMajor} onClick={() => {}}>Import</Button>
          </div>
        </div>

        {enableAdvancedFilters && (
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
            <TextField
              placeholder="Search..."
              value={searchQuery}
              onChange={setSearchQuery}
              prefix={<Icon source={SearchMinor} />}
              clearButton
              onClearButtonClick={() => setSearchQuery('')}
            />
            <Select
              label="Status"
              value={filterStatus}
              onChange={setFilterStatus}
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Fulfilled', value: 'Fulfilled' },
                { label: 'Processing', value: 'Processing' },
                { label: 'Unfulfilled', value: 'Unfulfilled' },
                { label: 'Cancelled', value: 'Cancelled' },
              ]}
              labelHidden
            />
            <Button icon={FilterMajor}>More Filters</Button>
          </div>
        )}

        {showBulkActions && selectedItems.length > 0 && (
          <Banner status="info" onDismiss={() => setSelectedItems([])}>
            <Text variant="bodySm">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </Text>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button size="small">Bulk Edit</Button>
              <Button size="small" tone="critical">Bulk Delete</Button>
              <Button size="small" variant="plain">Export Selected</Button>
            </div>
          </Banner>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e1e1e1' }}>
                {showBulkActions && (
                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    <Checkbox
                      checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {Object.keys(paginatedData[0] || {}).map((key, index) => (
                  <th
                    key={key}
                    style={{
                      padding: '12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: '#6d7175',
                      fontSize: "var(--font-size-xs)",
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onClick={() => handleSort(index)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {key}
                      {sortColumn === index && (
                        <Icon source={sortDirection === 'ascending' ? ChevronUpMinor : ChevronDownMinor} />
                      )}
                    </div>
                  </th>
                ))}
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e1e1e1' }}>
                  {showBulkActions && (
                    <td style={{ padding: '12px' }}>
                      <Checkbox
                        checked={selectedItems.includes(String(index))}
                        onChange={() => handleSelectItem(String(index))}
                      />
                    </td>
                  )}
                  {Object.entries(item).map(([key, value]) => (
                    <td key={key} style={{ padding: '12px' }}>
                      {key === 'status' ? getStatusBadge(String(value)) :
                       key === 'priority' ? getPriorityBadge(String(value)) :
                       key === 'tags' ? (
                         <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                           {Array.isArray(value) && value.map((tag, i) => (
                             <Badge key={i} tone="subdued">{tag}</Badge>
                           ))}
                         </div>
                       ) :
                       key === 'total' || key === 'totalSpent' ? `$${Number(value).toFixed(2)}` :
                       String(value)}
                    </td>
                  ))}
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <Tooltip content="View">
                        <Button size="small" variant="plain" icon={ViewMinor} />
                      </Tooltip>
                      <Tooltip content="Edit">
                        <Button size="small" variant="plain" icon={EditMinor} />
                      </Tooltip>
                      <Tooltip content="Duplicate">
                        <Button size="small" variant="plain" icon={DuplicateMinor} />
                      </Tooltip>
                      <Tooltip content="Delete">
                        <Button size="small" variant="plain" icon={DeleteMinor} tone="critical" />
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <Text variant="bodySm" tone="subdued">
              Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} items
            </Text>
            <Pagination
              label={currentPage}
              hasPrevious={currentPage > 1}
              onPrevious={() => setCurrentPage(currentPage - 1)}
              hasNext={currentPage < totalPages}
              onNext={() => setCurrentPage(currentPage + 1)}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

// Data Import/Export Component
const DataImportExport = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'export'>('import');
  const [importStep, setImportStep] = useState(0);
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedFields, setSelectedFields] = useState(['id', 'name', 'email', 'status']);

  const importSteps = [
    { title: 'Choose File', description: 'Select a CSV or Excel file to import' },
    { title: 'Map Fields', description: 'Map your file columns to our data fields' },
    { title: 'Preview & Confirm', description: 'Review your data before importing' },
    { title: 'Import Complete', description: 'Your data has been successfully imported' },
  ];

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text variant="headingLg" as="h2">Data Import/Export</Text>

        <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
          <Button
            variant={activeTab === 'import' ? 'primary' : 'plain'}
            onClick={() => setActiveTab('import')}
          >
            Import Data
          </Button>
          <Button
            variant={activeTab === 'export' ? 'primary' : 'plain'}
            onClick={() => setActiveTab('export')}
          >
            Export Data
          </Button>
        </div>

        {activeTab === 'import' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <Text variant="headingMd" as="h3">{importSteps[importStep].title}</Text>
                <Text variant="bodySm" tone="subdued">{importSteps[importStep].description}</Text>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {importSteps.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: index <= importStep ? '#202223' : '#d2d2d2',
                    }}
                  />
                ))}
              </div>
            </div>

            {importStep === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 0', border: '2px dashed #d2d2d2', borderRadius: '8px' }}>
                <Icon source={UploadMinor} size="large" tone="subdued" />
                <div style={{ marginTop: '16px' }}>
                  <Text variant="bodyMd" as="p">Drag and drop your file here, or</Text>
                  <Button style={{ marginTop: '8px' }}>Browse Files</Button>
                </div>
                <Text variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
                  Supported formats: CSV, XLSX (Max 10MB)
                </Text>
              </div>
            )}

            {importStep === 1 && (
              <div>
                <Text variant="bodyMd" fontWeight="semibold" style={{ marginBottom: '16px' }}>
                  Map your file columns to our data fields:
                </Text>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {['Your Column', 'Our Field'].map((header, index) => (
                    <div key={index} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      padding: '12px',
                      backgroundColor: '#f8f8f8',
                      borderRadius: '8px'
                    }}>
                      <Text variant="bodySm" fontWeight="semibold">{header}</Text>
                      <Text variant="bodySm" fontWeight="semibold">{header}</Text>
                      <Select options={[{ label: 'Name', value: 'name' }]} />
                      <Select options={[{ label: 'Full Name', value: 'full_name' }]} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {importStep === 2 && (
              <div>
                <Text variant="bodyMd" fontWeight="semibold" style={{ marginBottom: '16px' }}>
                  Preview of first 5 rows:
                </Text>
                <div style={{ overflowX: 'auto', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8f8f8' }}>
                        <th style={{ padding: '8px', textAlign: 'left', fontSize: "var(--font-size-xs)" }}>ID</th>
                        <th style={{ padding: '8px', textAlign: 'left', fontSize: "var(--font-size-xs)" }}>Name</th>
                        <th style={{ padding: '8px', textAlign: 'left', fontSize: "var(--font-size-xs)" }}>Email</th>
                        <th style={{ padding: '8px', textAlign: 'left', fontSize: "var(--font-size-xs)" }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleCustomers.slice(0, 5).map((customer) => (
                        <tr key={customer.id} style={{ borderTop: '1px solid #e1e1e1' }}>
                          <td style={{ padding: '8px', fontSize: "var(--font-size-xs)" }}>{customer.id}</td>
                          <td style={{ padding: '8px', fontSize: "var(--font-size-xs)" }}>{customer.name}</td>
                          <td style={{ padding: '8px', fontSize: "var(--font-size-xs)" }}>{customer.email}</td>
                          <td style={{ padding: '8px', fontSize: "var(--font-size-xs)" }}>
                            <Badge status="success">{customer.status}</Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Banner status="info" style={{ marginTop: '16px' }}>
                  <Text variant="bodySm">Ready to import 234 records</Text>
                </Banner>
              </div>
            )}

            {importStep === 3 && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Icon source={CheckmarkMinor} size="large" tone="success" />
                <Text variant="headingMd" as="h3" style={{ marginTop: '16px' }}>
                  Import Successful!
                </Text>
                <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
                  234 records have been successfully imported.
                </Text>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
              <Button onClick={() => setImportStep(Math.max(0, importStep - 1))} disabled={importStep === 0}>
                Previous
              </Button>
              <Button
                primary
                onClick={() => setImportStep(Math.min(importSteps.length - 1, importStep + 1))}
                disabled={importStep === importSteps.length - 1}
              >
                {importStep === importSteps.length - 2 ? 'Complete Import' : 'Next'}
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'export' && (
          <div>
            <BlockStack gap="400">
              <div>
                <Text variant="bodyMd" fontWeight="semibold">Export Format</Text>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {['csv', 'xlsx', 'json'].map((format) => (
                    <Button
                      key={format}
                      variant={exportFormat === format ? 'primary' : 'plain'}
                      onClick={() => setExportFormat(format)}
                    >
                      {format.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="bodyMd" fontWeight="semibold">Fields to Export</Text>
                <div style={{ marginTop: '8px' }}>
                  {['id', 'name', 'email', 'status', 'orders', 'totalSpent'].map((field) => (
                    <div key={field} style={{ padding: '8px 0' }}>
                      <Checkbox
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        checked={selectedFields.includes(field)}
                        onChange={(checked) => {
                          if (checked) {
                            setSelectedFields([...selectedFields, field]);
                          } else {
                            setSelectedFields(selectedFields.filter(f => f !== field));
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="bodyMd" fontWeight="semibold">Filters (Optional)</Text>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
                  <Select
                    label="Status"
                    options={[
                      { label: 'All', value: 'all' },
                      { label: 'Active', value: 'active' },
                      { label: 'Inactive', value: 'inactive' },
                    ]}
                  />
                  <TextField label="Date Range" placeholder="e.g., 2024-01-01 to 2024-12-31" />
                </div>
              </div>

              <Banner status="info">
                <Text variant="bodySm">
                  Your export will include 1,234 records matching the selected criteria.
                </Text>
              </Banner>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Button primary icon={DownloadMajor}>
                  Export Now
                </Button>
                <Button variant="plain" icon={RefreshMinor}>
                  Schedule Export
                </Button>
              </div>
            </BlockStack>
          </div>
        )}
      </div>
    </Card>
  );
};

// Advanced Filters Component
const AdvancedFiltersComponent = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(0);

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Text variant="headingLg" as="h2">Advanced Filters</Text>
          <Button
            icon={FilterMajor}
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
            {appliedFilters > 0 && <Badge style={{ marginLeft: '8px' }}>{appliedFilters}</Badge>}
          </Button>
        </div>

        {filtersVisible && (
          <div style={{ backgroundColor: '#f8f8f8', padding: '16px', borderRadius: '8px' }}>
            <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
              <div>
                <Text variant="bodySm" fontWeight="semibold">Date Range</Text>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  <TextField type="date" label="From" labelHidden />
                  <TextField type="date" label="To" labelHidden />
                </div>
              </div>

              <div>
                <Text variant="bodySm" fontWeight="semibold">Status</Text>
                <div style={{ marginTop: '8px' }}>
                  {['Active', 'Inactive', 'Pending', 'Cancelled'].map((status) => (
                    <div key={status} style={{ padding: '4px 0' }}>
                      <Checkbox label={status} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="bodySm" fontWeight="semibold">Value Range</Text>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
                  <TextField type="number" label="Min" labelHidden placeholder="0" />
                  <TextField type="number" label="Max" labelHidden placeholder="9999" />
                </div>
              </div>

              <div>
                <Text variant="bodySm" fontWeight="semibold">Categories</Text>
                <Select
                  options={[
                    { label: 'All Categories', value: '' },
                    { label: 'Electronics', value: 'electronics' },
                    { label: 'Apparel', value: 'apparel' },
                    { label: 'Accessories', value: 'accessories' },
                  ]}
                  style={{ marginTop: '8px' }}
                />
              </div>

              <div>
                <Text variant="bodySm" fontWeight="semibold">Priority</Text>
                <div style={{ marginTop: '8px' }}>
                  {['High', 'Medium', 'Low'].map((priority) => (
                    <div key={priority} style={{ padding: '4px 0' }}>
                      <Checkbox label={priority} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="bodySm" fontWeight="semibold">Tags</Text>
                <TextField
                  placeholder="Enter tags..."
                  style={{ marginTop: '8px' }}
                />
              </div>
            </Grid>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="small" onClick={() => setAppliedFilters(3)}>
                  Apply Filters (3)
                </Button>
                <Button size="small" variant="plain" onClick={() => setAppliedFilters(0)}>
                  Clear All
                </Button>
              </div>
              <Button size="small" variant="plain" icon={SaveMinor}>
                Save Filter Set
              </Button>
            </div>
          </div>
        )}

        {appliedFilters > 0 && (
          <Banner status="info" onDismiss={() => setAppliedFilters(0)} style={{ marginTop: '16px' }}>
            <Text variant="bodySm">
              {appliedFilters} filter{appliedFilters > 1 ? 's' : ''} applied
            </Text>
          </Banner>
        )}
      </div>
    </Card>
  );
};

// Performance Optimization Component
const PerformanceOptimization = () => {
  const [loading, setLoading] = useState(false);
  const [virtualized, setVirtualized] = useState(false);
  const [cached, setCached] = useState(true);

  const simulateLargeDataLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text variant="headingLg" as="h2">Performance Optimization</Text>

        <BlockStack gap="400" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
            <div>
              <Text variant="bodyMd" fontWeight="semibold">Virtual Scrolling</Text>
              <Text variant="bodySm" tone="subdued">
                {virtualized ? 'Enabled for large datasets' : 'Disabled - uses standard rendering'}
              </Text>
            </div>
            <Checkbox
              label="Enable"
              checked={virtualized}
              onChange={setVirtualized}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
            <div>
              <Text variant="bodyMd" fontWeight="semibold">Data Caching</Text>
              <Text variant="bodySm" tone="subdued">
                {cached ? 'Cache enabled for faster loading' : 'No caching - fresh data every time'}
              </Text>
            </div>
            <Checkbox
              label="Enable"
              checked={cached}
              onChange={setCached}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
            <div>
              <Text variant="bodyMd" fontWeight="semibold">Lazy Loading</Text>
              <Text variant="bodySm" tone="subdued">
                Load data as needed for better performance
              </Text>
            </div>
            <Checkbox label="Enable" defaultChecked />
          </div>

          <div>
            <Text variant="bodyMd" fontWeight="semibold">Load Large Dataset</Text>
            <Text variant="bodySm" tone="subdued" style={{ marginBottom: '8px' }}>
              Test performance with 10,000 records
            </Text>
            <Button onClick={simulateLargeDataLoad} loading={loading}>
              {loading ? 'Loading...' : 'Load Dataset'}
            </Button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
              <Text variant="headingLg" as="div" tone="success">2.3s</Text>
              <Text variant="bodySm" tone="subdued">Load Time</Text>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
              <Text variant="headingLg" as="div" tone="success">45ms</Text>
              <Text variant="bodySm" tone="subdued">Sort Time</Text>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
              <Text variant="headingLg" as="div" tone="success">12ms</Text>
              <Text variant="bodySm" tone="subdued">Filter Time</Text>
            </div>
          </div>

          <Banner status="success">
            <Text variant="bodySm">
              Performance optimizations enabled. Dataset loading time reduced by 75%.
            </Text>
          </Banner>
        </BlockStack>
      </div>
    </Card>
  );
};

// Stories
export const AdvancedDataTableStory: Story = {
  render: () => (
    <div style={{ width: '1200px' }}>
      <AdvancedDataTable data={sampleOrders} showBulkActions enableAdvancedFilters />
    </div>
  ),
};

export const CustomerManagement: Story = {
  render: () => (
    <div style={{ width: '1200px' }}>
      <AdvancedDataTable data={sampleCustomers} showBulkActions enableAdvancedFilters />
    </div>
  ),
};

export const ProductInventory: Story = {
  render: () => (
    <div style={{ width: '1200px' }}>
      <AdvancedDataTable data={sampleProducts} showBulkActions enableAdvancedFilters />
    </div>
  ),
};

export const DataImportExportStory: Story = {
  render: () => <DataImportExport />,
};

export const AdvancedFiltering: Story = {
  render: () => <AdvancedFiltersComponent />,
};

export const PerformanceOptimizedTable: Story = {
  render: () => <PerformanceOptimization />,
};

export const BulkOperations: Story = {
  render: () => {
    const [bulkAction, setBulkAction] = useState('');

    const bulkActions = [
      'Export Selected',
      'Delete Selected',
      'Archive Selected',
      'Assign to Category',
      'Update Status',
      'Send Email Campaign',
      'Apply Discount',
      'Print Labels',
    ];

    return (
      <Card>
        <div style={{ padding: '16px' }}>
          <Text variant="headingLg" as="h2">Bulk Operations</Text>

          <div style={{ marginTop: '16px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Select Bulk Action:</Text>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
              {bulkActions.map((action) => (
                <Button
                  key={action}
                  variant={bulkAction === action ? 'primary' : 'plain'}
                  onClick={() => setBulkAction(action)}
                  textAlign="left"
                >
                  {action}
                </Button>
              ))}
            </div>
          </div>

          {bulkAction && (
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
              <Text variant="bodyMd" fontWeight="semibold">Selected Action: {bulkAction}</Text>
              <Text variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
                This action will be applied to all selected items. You can select items using the checkboxes in the data table.
              </Text>
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <Button size="small" primary>Execute Action</Button>
                <Button size="small" variant="plain" onClick={() => setBulkAction('')}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  },
};

export const DataValidation: Story = {
  render: () => {
    const [validating, setValidating] = useState(false);
    const [validationResults, setValidationResults] = useState<any[]>([]);

    const validationRules = [
      { field: 'Email', rule: 'Must be valid email format', status: 'pass' },
      { field: 'Phone', rule: 'Must be 10 digits', status: 'fail' },
      { field: 'Price', rule: 'Must be positive number', status: 'pass' },
      { field: 'SKU', rule: 'Must be unique', status: 'pass' },
      { field: 'Required Fields', rule: 'All required fields filled', status: 'warning' },
    ];

    const runValidation = () => {
      setValidating(true);
      setTimeout(() => {
        setValidationResults(validationRules);
        setValidating(false);
      }, 2000);
    };

    return (
      <Card>
        <div style={{ padding: '16px' }}>
          <Text variant="headingLg" as="h2">Data Validation</Text>

          <div style={{ marginTop: '16px' }}>
            <Button onClick={runValidation} loading={validating}>
              {validating ? 'Validating...' : 'Run Validation'}
            </Button>
          </div>

          {validationResults.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <Text variant="bodyMd" fontWeight="semibold">Validation Results:</Text>
              <div style={{ marginTop: '8px' }}>
                {validationResults.map((result, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8f8f8',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div>
                      <Text variant="bodySm" fontWeight="semibold">{result.field}</Text>
                      <Text variant="bodySm" tone="subdued">{result.rule}</Text>
                    </div>
                    <Badge
                      status={
                        result.status === 'pass' ? 'success' :
                        result.status === 'fail' ? 'critical' : 'warning'
                      }
                    >
                      {result.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>

              <Banner status="attention" style={{ marginTop: '16px' }}>
                <Text variant="bodySm">
                  2 validation issues found. Please fix these issues before proceeding.
                </Text>
              </Banner>
            </div>
          )}
        </div>
      </Card>
    );
  },
};