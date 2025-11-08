import type { Meta, StoryObj } from '@storybook/react';
import {
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexFilters,
  Card,
  Filters,
  ChoiceList,
  RangeSlider,
  TextField,
  Badge,
  Button,
  Text,
  BlockStack,
  InlineStack,
  ResourceList,
  ResourceItem,
  Avatar,
} from '@shopify/polaris';
import { SearchIcon, FilterIcon, SortAscendingIcon } from '@shopify/polaris-icons';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Tables/IndexFilters',
  component: IndexFilters,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'IndexFilters provides comprehensive filtering, sorting, and search functionality for data tables and resource lists. It combines search, filters, and view controls into a unified interface.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    queryValue: {
      control: 'text',
      description: 'Current search query value',
    },
    queryPlaceholder: {
      control: 'text',
      description: 'Placeholder text for search input',
    },
    onQueryChange: {
      action: 'onQueryChange',
      description: 'Callback when search query changes',
    },
    onQueryClear: {
      action: 'onQueryClear',
      description: 'Callback when search query is cleared',
    },
    selected: {
      control: 'array',
      description: 'Currently selected items',
    },
    onSelectionChange: {
      action: 'onSelectionChange',
      description: 'Callback when selection changes',
    },
    tabs: {
      control: 'object',
      description: 'Tab configuration for different views',
    },
    selectedTab: {
      control: 'number',
      description: 'Currently selected tab index',
    },
    onTabChange: {
      action: 'onTabChange',
      description: 'Callback when tab changes',
    },
    sortOptions: {
      control: 'object',
      description: 'Available sort options',
    },
    sortSelected: {
      control: 'array',
      description: 'Currently selected sort option',
    },
    onSortChange: {
      action: 'onSortChange',
      description: 'Callback when sort option changes',
    },
    filters: {
      control: 'object',
      description: 'Filter configuration',
    },
    appliedFilters: {
      control: 'object',
      description: 'Currently applied filters',
    },
    onFiltersChange: {
      action: 'onFiltersChange',
      description: 'Callback when filters change',
    },
    mode: {
      control: 'select',
      options: ['default', 'filtering', 'selecting'],
      description: 'Current interaction mode',
    },
    setMode: {
      action: 'setMode',
      description: 'Callback to change mode',
    },
    cancelAction: {
      control: 'object',
      description: 'Cancel button configuration',
    },
    primaryAction: {
      control: 'object',
      description: 'Primary action button configuration',
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = any;

const sampleProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: '$99.99',
    status: 'Active',
    inventory: 45,
    type: 'Electronics',
    vendor: 'TechBrand',
    created: '2024-01-15',
  },
  {
    id: '2',
    name: 'Coffee Maker',
    price: '$129.99',
    status: 'Active',
    inventory: 12,
    type: 'Appliances',
    vendor: 'HomeGoods',
    created: '2024-01-20',
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: '$79.99',
    status: 'Draft',
    inventory: 0,
    type: 'Footwear',
    vendor: 'SportCo',
    created: '2024-02-01',
  },
  {
    id: '4',
    name: 'Yoga Mat',
    price: '$29.99',
    status: 'Active',
    inventory: 128,
    type: 'Fitness',
    vendor: 'FitLife',
    created: '2024-02-10',
  },
  {
    id: '5',
    name: 'Laptop Stand',
    price: '$49.99',
    status: 'Archived',
    inventory: 5,
    type: 'Accessories',
    vendor: 'OfficePlus',
    created: '2024-02-15',
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ProductsListWithFilters = () => {
  const [selected, setSelected] = React.useState([]);
  const [queryValue, setQueryValue] = React.useState('');
  const [sortSelected, setSortSelected] = React.useState(['product_created_desc']);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const { mode, setMode } = useSetIndexFiltersMode();
  const [filters, setFilters] = React.useState({
    accountStatus: ['active', 'draft'],
    moneySpent: '5',
    taggedWith: 'new',
    availability: 'available',
    productType: ['electronics', 'appliances'],
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleAccountStatusChange = React.useCallback(
    (value: string[]) => {
      handleFiltersChange({ ...filters, accountStatus: value });
    },
    [filters]
  );

  const handleMoneySpentChange = React.useCallback(
    (value: string) => {
      handleFiltersChange({ ...filters, moneySpent: value });
    },
    [filters]
  );

  const handleTaggedWithChange = React.useCallback(
    (value: string) => {
      handleFiltersChange({ ...filters, taggedWith: value });
    },
    [filters]
  );

  const handleAvailabilityChange = React.useCallback(
    (value: string[]) => {
      handleFiltersChange({ ...filters, availability: value[0] });
    },
    [filters]
  );

  const handleProductTypeChange = React.useCallback(
    (value: string[]) => {
      handleFiltersChange({ ...filters, productType: value });
    },
    [filters]
  );

  const handleFiltersClearAll = React.useCallback(() => {
    handleFiltersChange({
      accountStatus: [],
      moneySpent: undefined,
      taggedWith: undefined,
      availability: undefined,
      productType: [],
    });
  }, [handleFiltersChange]);

  const filtersControl = (
    <Filters
      queryValue={queryValue}
      queryPlaceholder="Search products"
      filters={[
        {
          key: 'accountStatus',
          label: 'Status',
          filter: (
            <ChoiceList
              title="Status"
              titleHidden
              choices={[
                { label: 'Active', value: 'active' },
                { label: 'Draft', value: 'draft' },
                { label: 'Archived', value: 'archived' },
              ]}
              selected={filters.accountStatus || []}
              onChange={handleAccountStatusChange}
              allowMultiple
            />
          ),
          shortcut: true,
        },
        {
          key: 'productType',
          label: 'Product type',
          filter: (
            <ChoiceList
              title="Product type"
              titleHidden
              choices={[
                { label: 'Electronics', value: 'electronics' },
                { label: 'Appliances', value: 'appliances' },
                { label: 'Footwear', value: 'footwear' },
                { label: 'Fitness', value: 'fitness' },
                { label: 'Accessories', value: 'accessories' },
              ]}
              selected={filters.productType || []}
              onChange={handleProductTypeChange}
              allowMultiple
            />
          ),
        },
        {
          key: 'availability',
          label: 'Availability',
          filter: (
            <ChoiceList
              title="Availability"
              titleHidden
              choices={[
                { label: 'Available', value: 'available' },
                { label: 'Out of stock', value: 'out-of-stock' },
              ]}
              selected={filters.availability ? [filters.availability] : []}
              onChange={handleAvailabilityChange}
            />
          ),
        },
        {
          key: 'taggedWith',
          label: 'Tagged with',
          filter: (
            <TextField
              label="Tagged with"
              value={filters.taggedWith || ''}
              onChange={handleTaggedWithChange}
              autoComplete="off"
              labelHidden
            />
          ),
        },
      ]}
      appliedFilters={[]}
      onClearAll={handleFiltersClearAll}
    />
  );

  const sortOptions = [
    { label: 'Product', value: 'product_name_asc', directionLabel: 'A-Z' },
    { label: 'Product', value: 'product_name_desc', directionLabel: 'Z-A' },
    { label: 'Price', value: 'price_asc', directionLabel: 'Lowest first' },
    { label: 'Price', value: 'price_desc', directionLabel: 'Highest first' },
    { label: 'Created', value: 'product_created_asc', directionLabel: 'Oldest first' },
    { label: 'Product created', value: 'product_created_desc', directionLabel: 'Newest first' },
    { label: 'Updated', value: 'product_updated_asc', directionLabel: 'Oldest first' },
    { label: 'Updated', value: 'product_updated_desc', directionLabel: 'Newest first' },
  ];

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const productItem = (item: any) => {
    const { id, name, price, status, inventory, type, vendor } = item;
    const media = <Avatar customer size="medium" name={name} />;
    const statusBadge = {
      Active: <Badge status="success">Active</Badge>,
      Draft: <Badge status="attention">Draft</Badge>,
      Archived: <Badge>Archived</Badge>,
    };

    return (
      <ResourceItem
        id={id}
        url={`/products/${id}`}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <BlockStack gap="200">
          <InlineStack align="space-between">
            <Text as="h3" variant="bodyMd" fontWeight="bold">
              {name}
            </Text>
            {statusBadge[status as keyof typeof statusBadge]}
          </InlineStack>
          <Text as="p" variant="bodySm" color="subdued">
            {type} • {vendor}
          </Text>
          <Text as="p" variant="bodySm" color="subdued">
            {price} • {inventory} in stock
          </Text>
        </BlockStack>
      </ResourceItem>
    );
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesQuery = !queryValue ||
      product.name.toLowerCase().includes(queryValue.toLowerCase()) ||
      product.type.toLowerCase().includes(queryValue.toLowerCase()) ||
      product.vendor.toLowerCase().includes(queryValue.toLowerCase());

    const matchesStatus = filters.accountStatus.length === 0 ||
      filters.accountStatus.includes(product.status.toLowerCase());

    const matchesType = filters.productType.length === 0 ||
      filters.productType.includes(product.type.toLowerCase());

    const matchesAvailability = !filters.availability ||
      (filters.availability === 'available' && product.inventory > 0) ||
      (filters.availability === 'out-of-stock' && product.inventory === 0);

    return matchesQuery && matchesStatus && matchesType && matchesAvailability;
  });

  return (
    <Card padding="0">
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        onSortChange={setSortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={setQueryValue}
        onQueryClear={() => setQueryValue('')}
        selected={selected}
        onSelectionChange={setSelected}
        tabs={[
          { content: 'All', id: 'all', panelID: 'all-content' },
          { content: 'Active', id: 'active', panelID: 'active-content' },
          { content: 'Draft', id: 'draft', panelID: 'draft-content' },
        ]}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        mode={mode}
        setMode={setMode}
        filters={filtersControl}
        primaryAction={
          mode === 'selecting' ? {
            type: 'bulk',
            content: 'Add to campaign',
            onAction: () => console.log('Bulk action', selected),
          } : undefined
        }
        cancelAction={{
          label: 'Cancel',
          onAction: () => setMode('default'),
        }}
      />
      <ResourceList
        resourceName={resourceName}
        items={filteredProducts}
        renderItem={productItem}
        selectedItems={selected}
        onSelectionChange={setSelected}
        bulkActions={mode === 'selecting'}
        promotedBulkActions={[
          {
            content: 'Edit products',
            onAction: () => console.log('Edit', selected),
          },
          {
            content: 'Delete products',
            onAction: () => console.log('Delete', selected),
            destructive: true,
          },
        ]}
      />
    </Card>
  );
};

export const Default: Story = {
  render: () => <ProductsListWithFilters />,
};

export const WithSearchAndFilters: Story = {
  render: () => {
    const [selected, setSelected] = React.useState([]);
    const [queryValue, setQueryValue] = React.useState('');
    const [filters, setFilters] = React.useState({
      status: [],
      category: [],
      priceRange: [0, 500],
    });

    const items = [
      { id: '1', name: 'Product A', category: 'Electronics', price: 199, status: 'Active' },
      { id: '2', name: 'Product B', category: 'Clothing', price: 49, status: 'Draft' },
      { id: '3', name: 'Product C', category: 'Electronics', price: 299, status: 'Active' },
      { id: '4', name: 'Product D', category: 'Home', price: 89, status: 'Active' },
    ];

    const filterControl = (
      <Filters
        queryValue={queryValue}
        queryPlaceholder="Search products"
        filters={[
          {
            key: 'status',
            label: 'Status',
            filter: (
              <ChoiceList
                title="Status"
                titleHidden
                choices={[
                  { label: 'Active', value: 'active' },
                  { label: 'Draft', value: 'draft' },
                ]}
                selected={filters.status}
                onChange={(status) => setFilters({ ...filters, status })}
                allowMultiple
              />
            ),
          },
          {
            key: 'category',
            label: 'Category',
            filter: (
              <ChoiceList
                title="Category"
                titleHidden
                choices={[
                  { label: 'Electronics', value: 'electronics' },
                  { label: 'Clothing', value: 'clothing' },
                  { label: 'Home', value: 'home' },
                ]}
                selected={filters.category}
                onChange={(category) => setFilters({ ...filters, category })}
                allowMultiple
              />
            ),
          },
        ]}
        appliedFilters={[]}
      />
    );

    return (
      <Card padding="0">
        <IndexFilters
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          filters={filterControl}
          selected={selected}
          onSelectionChange={setSelected}
          mode="default"
          setMode={() => {}}
        />
        <div style={{ padding: '16px' }}>
          <Text>Found {items.length} products</Text>
        </div>
      </Card>
    );
  },
};

export const WithTabs: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [queryValue, setQueryValue] = React.useState('');

    const tabs = [
      { content: 'All products', id: 'all', panelID: 'all-products' },
      { content: 'Active', id: 'active', panelID: 'active-products' },
      { content: 'Draft', id: 'draft', panelID: 'draft-products' },
      { content: 'Archived', id: 'archived', panelID: 'archived-products' },
    ];

    return (
      <Card padding="0">
        <IndexFilters
          tabs={tabs}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          selected={[]}
          onSelectionChange={() => {}}
          mode="default"
          setMode={() => {}}
        />
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Text variant="headingMd">
            Viewing: {tabs[selectedTab].content}
          </Text>
          <div style={{ marginTop: '16px' }}>
            <Text color="subdued">
              Switch between tabs to see different product views
            </Text>
          </div>
        </div>
      </Card>
    );
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sortSelected, setSortSelected] = React.useState(['name_asc']);
    const [queryValue, setQueryValue] = React.useState('');

    const sortOptions = [
      { label: 'Name', value: 'name_asc', directionLabel: 'A-Z' },
      { label: 'Name', value: 'name_desc', directionLabel: 'Z-A' },
      { label: 'Price', value: 'price_asc', directionLabel: 'Low to high' },
      { label: 'Price', value: 'price_desc', directionLabel: 'High to low' },
      { label: 'Created', value: 'created_asc', directionLabel: 'Oldest first' },
      { label: 'Created', value: 'created_desc', directionLabel: 'Newest first' },
    ];

    return (
      <Card padding="0">
        <IndexFilters
          sortOptions={sortOptions}
          sortSelected={sortSelected}
          onSortChange={setSortSelected}
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          selected={[]}
          onSelectionChange={() => {}}
          mode="default"
          setMode={() => {}}
        />
        <div style={{ padding: '24px' }}>
          <Text>
            Sorted by: {sortOptions.find(opt => opt.value === sortSelected[0])?.label}
            ({sortOptions.find(opt => opt.value === sortSelected[0])?.directionLabel})
          </Text>
        </div>
      </Card>
    );
  },
};

export const WithSelectionMode: Story = {
  render: () => {
    const [selected, setSelected] = React.useState([]);
    const [mode, setMode] = React.useState<'default' | 'selecting'>('default');
    const [queryValue, setQueryValue] = React.useState('');

    const items = Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Product ${i + 1}`,
      price: (i + 1) * 10,
    }));

    return (
      <Card padding="0">
        <IndexFilters
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          selected={selected}
          onSelectionChange={setSelected}
          mode={mode}
          setMode={setMode}
          primaryAction={
            mode === 'selecting' ? {
              type: 'bulk',
              content: 'Update selected',
              onAction: () => {
                console.log('Updating', selected);
                setMode('default');
                setSelected([]);
              },
            } : undefined
          }
          cancelAction={{
            label: 'Cancel',
            onAction: () => {
              setMode('default');
              setSelected([]);
            },
          }}
        />
        <div style={{ padding: '24px' }}>
          <BlockStack gap="16px">
            <Text>
              {mode === 'selecting'
                ? `${selected.length} item${selected.length !== 1 ? 's' : ''} selected`
                : 'Click the checkbox to enter selection mode'
              }
            </Text>
            {mode === 'default' && (
              <Button onClick={() => setMode('selecting')}>
                Select items
              </Button>
            )}
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const ComplexFiltersExample: Story = {
  render: () => {
    const [selected, setSelected] = React.useState([]);
    const [queryValue, setQueryValue] = React.useState('');
    const [filters, setFilters] = React.useState({
      priceRange: [0, 500],
      rating: 0,
      inStock: true,
      categories: [],
    });

    const handleFiltersChange = (newFilters: any) => {
      setFilters(newFilters);
    };

    const complexFilterControl = (
      <Filters
        queryValue={queryValue}
        queryPlaceholder="Search products..."
        filters={[
          {
            key: 'priceRange',
            label: 'Price range',
            filter: (
              <div style={{ padding: '16px' }}>
                <RangeSlider
                  label="Price range"
                  value={filters.priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onChange={(value) => handleFiltersChange({ ...filters, priceRange: value })}
                  output
                />
                <div style={{ marginTop: '8px', textAlign: 'center' }}>
                  <Text variant="bodySm" color="subdued">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Text>
                </div>
              </div>
            ),
          },
          {
            key: 'categories',
            label: 'Categories',
            filter: (
              <ChoiceList
                title="Categories"
                titleHidden
                choices={[
                  { label: 'Electronics', value: 'electronics' },
                  { label: 'Clothing', value: 'clothing' },
                  { label: 'Home & Garden', value: 'home' },
                  { label: 'Sports', value: 'sports' },
                  { label: 'Books', value: 'books' },
                ]}
                selected={filters.categories}
                onChange={(categories) => handleFiltersChange({ ...filters, categories })}
                allowMultiple
              />
            ),
          },
          {
            key: 'rating',
            label: 'Minimum rating',
            filter: (
              <div style={{ padding: '16px' }}>
                <RangeSlider
                  label="Rating"
                  value={filters.rating}
                  min={0}
                  max={5}
                  step={0.5}
                  onChange={(rating) => handleFiltersChange({ ...filters, rating })}
                  output
                />
              </div>
            ),
          },
        ]}
        appliedFilters={[]}
        onClearAll={() => handleFiltersChange({
          priceRange: [0, 500],
          rating: 0,
          inStock: true,
          categories: [],
        })}
      />
    );

    return (
      <Card padding="0">
        <IndexFilters
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          selected={selected}
          onSelectionChange={setSelected}
          mode="default"
          setMode={() => {}}
          filters={complexFilterControl}
        />
        <div style={{ padding: '24px' }}>
          <BlockStack gap="16px">
            <Text variant="headingSm">Filter Summary</Text>
            <Text variant="bodySm">Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Text>
            <Text variant="bodySm">Rating: {filters.rating}+ stars</Text>
            <Text variant="bodySm">Categories: {filters.categories.length > 0 ? filters.categories.join(', ') : 'All'}</Text>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const WithAppliedFilters: Story = {
  render: () => {
    const [selected, setSelected] = React.useState([]);
    const [queryValue, setQueryValue] = React.useState('');
    const [appliedFilters, setAppliedFilters] = React.useState([
      {
        key: 'status',
        label: 'Status: Active',
        onRemove: () => console.log('Remove status filter'),
      },
      {
        key: 'category',
        label: 'Category: Electronics',
        onRemove: () => console.log('Remove category filter'),
      },
      {
        key: 'price',
        label: 'Price: $100 - $500',
        onRemove: () => console.log('Remove price filter'),
      },
    ]);

    const filterControl = (
      <Filters
        queryValue={queryValue}
        queryPlaceholder="Search products"
        appliedFilters={appliedFilters}
        onClearAll={() => setAppliedFilters([])}
      />
    );

    return (
      <Card padding="0">
        <IndexFilters
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          selected={selected}
          onSelectionChange={setSelected}
          mode="default"
          setMode={() => {}}
          filters={filterControl}
        />
        <div style={{ padding: '24px' }}>
          <BlockStack gap="16px">
            <Text variant="headingSm">Active Filters</Text>
            {appliedFilters.length > 0 ? (
              <InlineStack gap="8px">
                {appliedFilters.map((filter, index) => (
                  <Badge key={index} onRemove={filter.onRemove}>
                    {filter.label}
                  </Badge>
                ))}
              </InlineStack>
            ) : (
              <Text color="subdued">No filters applied</Text>
            )}
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const WithBulkActions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState([]);
    const [mode, setMode] = React.useState<'default' | 'selecting'>('default');
    const [queryValue, setQueryValue] = React.useState('');

    const bulkActions = [
      {
        content: 'Edit products',
        onAction: () => console.log('Edit selected', selected),
      },
      {
        content: 'Add to collection',
        onAction: () => console.log('Add to collection', selected),
      },
      {
        content: 'Archive products',
        onAction: () => console.log('Archive selected', selected),
      },
      {
        content: 'Delete products',
        onAction: () => console.log('Delete selected', selected),
        destructive: true,
      },
    ];

    return (
      <Card padding="0">
        <IndexFilters
          queryValue={queryValue}
          onQueryChange={setQueryValue}
          onQueryClear={() => setQueryValue('')}
          selected={selected}
          onSelectionChange={setSelected}
          mode={mode}
          setMode={setMode}
          primaryAction={
            mode === 'selecting' ? {
              type: 'bulk',
              content: 'Apply bulk action',
              onAction: () => {
                console.log('Bulk action applied to', selected);
              },
            } : undefined
          }
          cancelAction={{
            label: 'Cancel selection',
            onAction: () => {
              setMode('default');
              setSelected([]);
            },
          }}
        />
        <div style={{ padding: '24px' }}>
          <BlockStack gap="16px">
            {mode === 'selecting' && selected.length > 0 && (
              <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <Text variant="headingSm">Bulk Actions Available</Text>
                <div style={{ marginTop: '12px' }}>
                  <InlineStack gap="8px">
                    {bulkActions.map((action, index) => (
                      <Button
                        key={index}
                        onClick={action.onAction}
                        destructive={action.destructive}
                      >
                        {action.content}
                      </Button>
                    ))}
                  </InlineStack>
                </div>
              </div>
            )}

            {mode === 'default' && (
              <Button onClick={() => setMode('selecting')}>
                Select items for bulk actions
              </Button>
            )}

            <Text variant="bodySm" color="subdued">
              {selected.length > 0 && `${selected.length} item${selected.length !== 1 ? 's' : ''} selected`}
            </Text>
          </BlockStack>
        </div>
      </Card>
    );
  },
};