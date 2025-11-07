import type { Meta, StoryObj } from '@storybook/react';
import { Filters, Card, Button, Badge, InlineStack, BlockStack, TextField, Select, Checkbox, DatePicker, Popover, Icon } from '@shopify/polaris';
import { SearchIcon, CalendarIcon, FilterIcon, XSmallIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Navigation/Filters',
  component: Filters,
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('filters', 'default'),
    docs: {
      description: {
        component: 'Filters allow users to refine and narrow down data sets by applying various criteria. They\'re essential for data tables, product listings, order management, and any scenario where users need to find specific items within large datasets.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    queryValue: {
      control: 'text',
      description: 'Current search query',
    },
    filters: {
      control: 'object',
      description: 'Array of filter configurations',
    },
    appliedFilters: {
      control: 'object',
      description: 'Array of currently applied filters',
    },
    onQueryChange: {
      control: 'function',
      description: 'Callback when search query changes',
    },
    onQueryClear: {
      control: 'function',
      description: 'Callback when search query is cleared',
    },
    onQueryBlur: {
      control: 'function',
      description: 'Callback when search field loses focus',
    },
    onFiltersChange: {
      control: 'function',
      description: 'Callback when filters are applied/removed',
    },
    hideQueryField: {
      control: 'boolean',
      description: 'Hide the search query field',
    },
    hideFilters: {
      control: 'boolean',
      description: 'Hide the filter buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all filter interactions',
    },
    disableFilters: {
      control: 'boolean',
      description: 'Disable filter buttons but allow search',
    },
  },
} satisfies Meta<typeof Filters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'status',
        label: 'Status',
        filter: (
          <Select
            label="Status"
            options={[
              { label: 'All', value: '' },
              { label: 'Active', value: 'active' },
              { label: 'Draft', value: 'draft' },
              { label: 'Archived', value: 'archived' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'availability',
        label: 'Availability',
        filter: (
          <Select
            label="Availability"
            options={[
              { label: 'All', value: '' },
              { label: 'In stock', value: 'in-stock' },
              { label: 'Out of stock', value: 'out-of-stock' },
              { label: 'Pre-order', value: 'pre-order' },
            ]}
            onChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const ProductFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'productType',
        label: 'Product type',
        filter: (
          <Select
            label="Product type"
            options={[
              { label: 'All types', value: '' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Home & Garden', value: 'home-garden' },
              { label: 'Sports', value: 'sports' },
              { label: 'Books', value: 'books' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'vendor',
        label: 'Vendor',
        filter: (
          <Select
            label="Vendor"
            options={[
              { label: 'All vendors', value: '' },
              { label: 'Fashion Brand Co.', value: 'fashion-brand' },
              { label: 'Tech Solutions Inc.', value: 'tech-solutions' },
              { label: 'Sports Gear Ltd.', value: 'sports-gear' },
              { label: 'Home Essentials', value: 'home-essentials' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'priceRange',
        label: 'Price range',
        filter: (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <TextField
              label="Min price"
              type="number"
              placeholder="$0"
              prefix="$"
              onChange={() => {}}
            />
            <span>to</span>
            <TextField
              label="Max price"
              type="number"
              placeholder="$999"
              prefix="$"
              onChange={() => {}}
            />
          </div>
        ),
      },
      {
        key: 'inventory',
        label: 'Inventory',
        filter: (
          <Select
            label="Inventory"
            options={[
              { label: 'All', value: '' },
              { label: 'In stock', value: 'in-stock' },
              { label: 'Out of stock', value: 'out-of-stock' },
              { label: 'Low stock (< 10)', value: 'low-stock' },
            ]}
            onChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const OrderFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'orderStatus',
        label: 'Order status',
        filter: (
          <Select
            label="Order status"
            options={[
              { label: 'All statuses', value: '' },
              { label: 'Open', value: 'open' },
              { label: 'Closed', value: 'closed' },
              { label: 'Cancelled', value: 'cancelled' },
              { label: 'Archived', value: 'archived' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'fulfillmentStatus',
        label: 'Fulfillment status',
        filter: (
          <Select
            label="Fulfillment status"
            options={[
              { label: 'All statuses', value: '' },
              { label: 'Unfulfilled', value: 'unfulfilled' },
              { label: 'Partially fulfilled', value: 'partially-fulfilled' },
              { label: 'Fulfilled', value: 'fulfilled' },
              { label: 'Restocked', value: 'restocked' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'paymentStatus',
        label: 'Payment status',
        filter: (
          <Select
            label="Payment status"
            options={[
              { label: 'All statuses', value: '' },
              { label: 'Pending', value: 'pending' },
              { label: 'Paid', value: 'paid' },
              { label: 'Partially paid', value: 'partially-paid' },
              { label: 'Refunded', value: 'refunded' },
              { label: 'Voided', value: 'voided' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'dateRange',
        label: 'Date range',
        filter: (
          <DatePicker
            month={new Date().getMonth()}
            year={new Date().getFullYear()}
            onChange={() => {}}
            onMonthChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ width: '1000px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const CustomerFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'customerType',
        label: 'Customer type',
        filter: (
          <Select
            label="Customer type"
            options={[
              { label: 'All customers', value: '' },
              { label: 'New customers', value: 'new' },
              { label: 'Returning customers', value: 'returning' },
              { label: 'VIP customers', value: 'vip' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'orderCount',
        label: 'Order count',
        filter: (
          <Select
            label="Order count"
            options={[
              { label: 'All', value: '' },
              { label: '0 orders', value: '0' },
              { label: '1-5 orders', value: '1-5' },
              { label: '6-20 orders', value: '6-20' },
              { label: '21+ orders', value: '21+' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'totalSpent',
        label: 'Total spent',
        filter: (
          <Select
            label="Total spent"
            options={[
              { label: 'All amounts', value: '' },
              { label: 'Under $100', value: '0-100' },
              { label: '$100 - $500', value: '100-500' },
              { label: '$500 - $1,000', value: '500-1000' },
              { label: 'Over $1,000', value: '1000+' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'location',
        label: 'Location',
        filter: (
          <Select
            label="Location"
            options={[
              { label: 'All locations', value: '' },
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
              { label: 'United Kingdom', value: 'uk' },
              { label: 'Europe', value: 'eu' },
              { label: 'Asia', value: 'asia' },
            ]}
            onChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const WithAppliedFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('t-shirt');
    const [appliedFilters, setAppliedFilters] = useState([
      {
        key: 'productType',
        label: 'Product type: Clothing',
        onRemove: () => console.log('Remove product type filter'),
      },
      {
        key: 'vendor',
        label: 'Vendor: Fashion Brand Co.',
        onRemove: () => console.log('Remove vendor filter'),
      },
      {
        key: 'priceRange',
        label: 'Price range: $25 - $75',
        onRemove: () => console.log('Remove price filter'),
      },
      {
        key: 'inventory',
        label: 'Inventory: In stock',
        onRemove: () => console.log('Remove inventory filter'),
      },
    ]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'productType',
        label: 'Product type',
        filter: (
          <Select
            label="Product type"
            options={[
              { label: 'All types', value: '' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Electronics', value: 'electronics' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'vendor',
        label: 'Vendor',
        filter: (
          <Select
            label="Vendor"
            options={[
              { label: 'All vendors', value: '' },
              { label: 'Fashion Brand Co.', value: 'fashion-brand' },
              { label: 'Tech Solutions Inc.', value: 'tech-solutions' },
            ]}
            onChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const HideQueryField: Story = {
  render: () => {
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const filters = [
      {
        key: 'category',
        label: 'Category',
        filter: (
          <Select
            label="Category"
            options={[
              { label: 'All categories', value: '' },
              { label: 'Tops', value: 'tops' },
              { label: 'Bottoms', value: 'bottoms' },
              { label: 'Accessories', value: 'accessories' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'size',
        label: 'Size',
        filter: (
          <Select
            label="Size"
            options={[
              { label: 'All sizes', value: '' },
              { label: 'XS', value: 'xs' },
              { label: 'S', value: 's' },
              { label: 'M', value: 'm' },
              { label: 'L', value: 'l' },
              { label: 'XL', value: 'xl' },
            ]}
            onChange={() => {}}
          />
        ),
      },
      {
        key: 'color',
        label: 'Color',
        filter: (
          <Select
            label="Color"
            options={[
              { label: 'All colors', value: '' },
              { label: 'Black', value: 'black' },
              { label: 'White', value: 'white' },
              { label: 'Blue', value: 'blue' },
              { label: 'Red', value: 'red' },
            ]}
            onChange={() => {}}
          />
        ),
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <Filters
          hideQueryField
          filters={filters}
          appliedFilters={appliedFilters}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const HideFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    return (
      <div style={{ width: '600px' }}>
        <Filters
          queryValue={queryValue}
          hideFilters
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          placeholder="Search customers..."
        />
      </div>
    );
  },
};

export const AdvancedProductFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'advancedFilters',
        label: 'Advanced filters',
        shortcut: true,
        filter: (
          <div style={{ minWidth: '300px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
              Advanced Product Filters
            </h4>

            <BlockStack gap="400">
              <div>
                <Select
                  label="Product type"
                  options={[
                    { label: 'All types', value: '' },
                    { label: 'Clothing', value: 'clothing' },
                    { label: 'Electronics', value: 'electronics' },
                    { label: 'Home & Garden', value: 'home-garden' },
                  ]}
                  onChange={() => {}}
                />
              </div>

              <div>
                <Select
                  label="Vendor"
                  options={[
                    { label: 'All vendors', value: '' },
                    { label: 'Fashion Brand Co.', value: 'fashion-brand' },
                    { label: 'Tech Solutions Inc.', value: 'tech-solutions' },
                  ]}
                  onChange={() => {}}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: "14px", fontWeight: '500' }}>
                  Price range
                </label>
                <InlineStack gap="200">
                  <TextField
                    type="number"
                    placeholder="Min"
                    prefix="$"
                    onChange={() => {}}
                  />
                  <span style={{ alignSelf: 'center' }}>to</span>
                  <TextField
                    type="number"
                    placeholder="Max"
                    prefix="$"
                    onChange={() => {}}
                  />
                </InlineStack>
              </div>

              <div>
                <Checkbox
                  label="In stock only"
                  checked={false}
                  onChange={() => {}}
                />
              </div>

              <div>
                <Checkbox
                  label="Include discontinued products"
                  checked={false}
                  onChange={() => {}}
                />
              </div>

              <div style={{ paddingTop: '12px', borderTop: '1px solid #e1e3e5' }}>
                <Button size="slim" fullWidth>
                  Apply filters
                </Button>
              </div>
            </BlockStack>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const TagBasedFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([
      {
        key: 'tag1',
        label: 'new',
        onRemove: () => console.log('Remove tag: new'),
      },
      {
        key: 'tag2',
        label: 'featured',
        onRemove: () => console.log('Remove tag: featured'),
      },
      {
        key: 'tag3',
        label: 'summer-collection',
        onRemove: () => console.log('Remove tag: summer-collection'),
      },
    ]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const availableTags = [
      'new', 'featured', 'sale', 'trending', 'limited-edition',
      'summer-collection', 'winter-collection', 'eco-friendly',
      'handmade', 'vintage', 'custom', 'premium'
    ];

    const filters = [
      {
        key: 'tags',
        label: 'Tags',
        filter: (
          <div style={{ minWidth: '250px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>
              Select tags
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {availableTags.map(tag => (
                <button
                  key={tag}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '16px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    fontSize: "14px",
                    transition: 'all 0.2s'
                  }}
                  onClick={() => {
                    if (!appliedFilters.find(f => f.label === tag)) {
                      setAppliedFilters(prev => [
                        ...prev,
                        {
                          key: `tag-${tag}`,
                          label: tag,
                          onRemove: () => console.log(`Remove tag: ${tag}`),
                        }
                      ]);
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.borderColor = '#007ace';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#e1e3e5';
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const DateRangeFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'dateRange',
        label: 'Date range',
        filter: (
          <div style={{ minWidth: '300px', padding: '16px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
              Filter by date
            </h4>

            <BlockStack gap="400">
              <div>
                <Select
                  label="Predefined ranges"
                  options={[
                    { label: 'Custom range', value: 'custom' },
                    { label: 'Today', value: 'today' },
                    { label: 'Yesterday', value: 'yesterday' },
                    { label: 'Last 7 days', value: '7days' },
                    { label: 'Last 30 days', value: '30days' },
                    { label: 'Last 3 months', value: '3months' },
                    { label: 'Last year', value: '1year' },
                  ]}
                  onChange={() => {}}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: "14px", fontWeight: '500' }}>
                  Custom range
                </label>
                <BlockStack gap="200">
                  <TextField
                    label="Start date"
                    type="date"
                    onChange={() => {}}
                  />
                  <TextField
                    label="End date"
                    type="date"
                    onChange={() => {}}
                  />
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />
      </div>
    );
  },
};

export const DisabledFilters: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const filters = [
      {
        key: 'status',
        label: 'Status',
        filter: (
          <Select
            label="Status"
            options={[
              { label: 'All', value: '' },
              { label: 'Active', value: 'active' },
              { label: 'Draft', value: 'draft' },
            ]}
            onChange={() => {}}
            disabled
          />
        ),
      },
      {
        key: 'category',
        label: 'Category',
        filter: (
          <Select
            label="Category"
            options={[
              { label: 'All', value: '' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
            ]}
            onChange={() => {}}
            disabled
          />
        ),
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
          disabled
        />
      </div>
    );
  },
};

export const InteractiveExample: Story = {
  render: () => {
    const [queryValue, setQueryValue] = useState('');
    const [appliedFilters, setAppliedFilters] = useState<any[]>([]);
    const [selectedValues, setSelectedValues] = useState<Record<string, any>>({});

    const handleQueryChange = useCallback((value: string) => {
      setQueryValue(value);
    }, []);

    const handleQueryClear = useCallback(() => {
      setQueryValue('');
    }, []);

    const handleFilterChange = (key: string, value: any) => {
      const newSelectedValues = { ...selectedValues, [key]: value };
      setSelectedValues(newSelectedValues);

      // Update applied filters
      const newAppliedFilters = Object.entries(newSelectedValues)
        .filter(([_, value]) => value && value !== '')
        .map(([key, value]) => ({
          key,
          label: `${key}: ${value}`,
          onRemove: () => {
            setSelectedValues(prev => {
              const newValues = { ...prev };
              delete newValues[key];
              return newValues;
            });
          },
        }));

      setAppliedFilters(newAppliedFilters);
    };

    const filters = [
      {
        key: 'status',
        label: 'Status',
        filter: (
          <Select
            label="Status"
            options={[
              { label: 'All statuses', value: '' },
              { label: 'Active', value: 'active' },
              { label: 'Draft', value: 'draft' },
              { label: 'Archived', value: 'archived' },
            ]}
            value={selectedValues.status || ''}
            onChange={(value) => handleFilterChange('status', value)}
          />
        ),
      },
      {
        key: 'category',
        label: 'Category',
        filter: (
          <Select
            label="Category"
            options={[
              { label: 'All categories', value: '' },
              { label: 'Electronics', value: 'electronics' },
              { label: 'Clothing', value: 'clothing' },
              { label: 'Home & Garden', value: 'home-garden' },
            ]}
            value={selectedValues.category || ''}
            onChange={(value) => handleFilterChange('category', value)}
          />
        ),
      },
      {
        key: 'priceRange',
        label: 'Price range',
        filter: (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <TextField
              label="Min price"
              type="number"
              placeholder="0"
              prefix="$"
              value={selectedValues.minPrice || ''}
              onChange={(value) => handleFilterChange('minPrice', value)}
            />
            <span>to</span>
            <TextField
              label="Max price"
              type="number"
              placeholder="999"
              prefix="$"
              value={selectedValues.maxPrice || ''}
              onChange={(value) => handleFilterChange('maxPrice', value)}
            />
          </div>
        ),
      },
    ];

    const mockResults = [
      { id: 1, name: 'Wireless Headphones', category: 'Electronics', status: 'Active', price: 99.99 },
      { id: 2, name: 'Cotton T-Shirt', category: 'Clothing', status: 'Draft', price: 24.99 },
      { id: 3, name: 'Garden Tools Set', category: 'Home & Garden', status: 'Active', price: 49.99 },
      { id: 4, name: 'Laptop Stand', category: 'Electronics', status: 'Active', price: 34.99 },
      { id: 5, name: 'Yoga Mat', category: 'Sports', status: 'Active', price: 29.99 },
    ];

    // Filter results based on search and filters
    const filteredResults = mockResults.filter(item => {
      const matchesSearch = !queryValue ||
        item.name.toLowerCase().includes(queryValue.toLowerCase()) ||
        item.category.toLowerCase().includes(queryValue.toLowerCase());

      const matchesStatus = !selectedValues.status || item.status === selectedValues.status;
      const matchesCategory = !selectedValues.category || item.category === selectedValues.category;
      const matchesMinPrice = !selectedValues.minPrice || item.price >= parseFloat(selectedValues.minPrice);
      const matchesMaxPrice = !selectedValues.maxPrice || item.price <= parseFloat(selectedValues.maxPrice);

      return matchesSearch && matchesStatus && matchesCategory && matchesMinPrice && matchesMaxPrice;
    });

    return (
      <div style={{ width: '1000px' }}>
        <Filters
          queryValue={queryValue}
          filters={filters}
          appliedFilters={appliedFilters}
          onQueryChange={handleQueryChange}
          onQueryClear={handleQueryClear}
          onFiltersChange={setAppliedFilters}
        />

        <div style={{ marginTop: '20px' }}>
          <Card>
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
                Search Results ({filteredResults.length} items)
              </h3>

              {filteredResults.length > 0 ? (
                <div style={{ display: 'grid', gap: '12px' }}>
                  {filteredResults.map(item => (
                    <div
                      key={item.id}
                      style={{
                        padding: '16px',
                        border: '1px solid #e1e3e5',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                        <div style={{ color: '#6b7280', fontSize: "14px" }}>{item.category}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Badge status={item.status === 'Active' ? 'success' : 'info'}>
                          {item.status}
                        </Badge>
                        <span style={{ fontWeight: '500' }}>${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: '#6b7280',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px'
                }}>
                  No results found. Try adjusting your filters or search query.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  },
};