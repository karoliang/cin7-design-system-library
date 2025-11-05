import type { Meta, StoryObj } from '@storybook/react';
import { Autocomplete, TextField, Label, Icon, Popover, Card, InlineStack, BlockStack } from '@shopify/polaris';
import { SearchIcon, CalendarIcon, PersonIcon, ProductIcon, OrderIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

const meta = {
  title: 'Polaris/Forms/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Autocomplete provides users with a list of suggestions as they type. It\'s commonly used for search bars, product selection, customer lookup, and any scenario where users need to select from a large dataset.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of available options',
    },
    selected: {
      control: 'array',
      description: 'Currently selected options',
    },
    textField: {
      control: 'object',
      description: 'TextField component props',
    },
    onSelect: {
      control: 'function',
      description: 'Callback when option is selected',
    },
    onLoadMore: {
      control: 'function',
      description: 'Callback for loading more options',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    willLoadMoreResults: {
      control: 'boolean',
      description: 'Whether more results can be loaded',
    },
    actionBefore: {
      control: 'object',
      description: 'Action to show before the options list',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple selections (deprecated)',
    },
    listTitle: {
      control: 'text',
      description: 'Title for the options list',
    },
    emptyState: {
      control: 'object',
      description: 'Content to show when no options match',
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([
      'Red T-shirt',
      'Blue Jeans',
      'Green Sweater',
      'Black Shoes',
      'White Hat',
      'Yellow Dress',
    ]);

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);
        if (!value) {
          setOptions([
            'Red T-shirt',
            'Blue Jeans',
            'Green Sweater',
            'Black Shoes',
            'White Hat',
            'Yellow Dress',
          ]);
          return;
        }

        const filterRegex = new RegExp(value, 'i');
        const resultOptions = [
          'Red T-shirt',
          'Blue Jeans',
          'Green Sweater',
          'Black Shoes',
          'White Hat',
          'Yellow Dress',
          'Purple Scarf',
          'Orange Shorts',
          'Pink Jacket',
        ].filter((option) => option.match(filterRegex));

        setOptions(resultOptions);
      },
      []
    );

    const removeTag = useCallback(
      (tag: string) => () => {
        const options = [...selectedOptions];
        options.splice(options.indexOf(tag), 1);
        setSelectedOptions(options);
      },
      [selectedOptions]
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Search products"
        value={inputValue}
        placeholder="Search products..."
        autoComplete="off"
      />
    );

    return (
      <div style={{ width: '300px' }}>
        <Autocomplete
          actionBefore={{
            content: 'View all products',
            onAction: () => console.log('View all products clicked'),
          }}
          options={options}
          selected={selectedOptions}
          onSelect={setSelectedOptions}
          multiple
          textField={textField}
        />
      </div>
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);

    const products = [
      'Basic T-Shirt',
      'Classic Jeans',
      'Comfortable Sweater',
      'Running Shoes',
      'Baseball Cap',
      'Summer Dress',
    ];

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);

        if (!value) {
          setOptions(products);
          return;
        }

        const filterRegex = new RegExp(value, 'i');
        const resultOptions = products.filter((option) => option.match(filterRegex));
        setOptions(resultOptions);
      },
      []
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Choose a product"
        value={inputValue}
        placeholder="Type to search..."
        autoComplete="off"
        prefix={<Icon source={SearchIcon} />}
      />
    );

    return (
      <div style={{ width: '300px' }}>
        <Autocomplete
          options={options}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={(selected) => setSelectedOption(selected[0] || '')}
          textField={textField}
        />

        {selectedOption && (
          <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f0f9ff', borderRadius: '4px' }}>
            Selected: <strong>{selectedOption}</strong>
          </div>
        )}
      </div>
    );
  },
};

export const WithAsyncSearch: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);

    // Simulate API call
    const simulateSearch = useCallback(async (query: string) => {
      setLoading(true);

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      if (!query) {
        setOptions([]);
        setLoading(false);
        return;
      }

      // Mock search results
      const allProducts = [
        'Wireless Headphones Pro',
        'Bluetooth Speaker Max',
        'USB-C Cable (2m)',
        'Laptop Stand Adjustable',
        'Wireless Mouse Ergonomic',
        'Mechanical Keyboard RGB',
        'Monitor 27" 4K',
        'Webcam HD 1080p',
        'Tablet 10" WiFi',
        'Smartphone 128GB',
      ];

      const filterRegex = new RegExp(query, 'i');
      const results = allProducts.filter((option) => option.match(filterRegex));

      setOptions(results);
      setLoading(false);

      // Update search history
      if (query && !searchHistory.includes(query)) {
        setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
      }
    }, [searchHistory]);

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);
        simulateSearch(value);
      },
      [simulateSearch]
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Search inventory"
        value={inputValue}
        placeholder="Search products..."
        autoComplete="off"
        loading={loading}
      />
    );

    return (
      <div style={{ width: '400px' }}>
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={setSelectedOptions}
          multiple
          textField={textField}
          loading={loading}
          emptyState={inputValue && !loading ? {
            content: 'No products found',
            helpText: 'Try different keywords or check spelling',
          } : undefined}
        />

        {searchHistory.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>
              Recent Searches:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {searchHistory.map((term, index) => (
                <button
                  key={index}
                  onClick={() => updateText(term)}
                  style={{
                    padding: '6px 8px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: "14px",
                    color: '#374151'
                  }}
                >
                  🕐 {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const WithCategories: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);

    const categorizedItems = {
      Products: [
        'T-Shirt - Basic',
        'Jeans - Classic',
        'Sweater - Wool',
        'Shoes - Running',
      ],
      Categories: [
        'Clothing',
        'Accessories',
        'Footwear',
        'Electronics',
      ],
      Collections: [
        'Summer Collection',
        'Winter Essentials',
        'Sports Gear',
        'Formal Wear',
      ],
    };

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);

        if (!value) {
          setOptions([]);
          return;
        }

        const filterRegex = new RegExp(value, 'i');
        const allOptions = Object.entries(categorizedItems).flatMap(([category, items]) =>
          items.map(item => `${category}: ${item}`)
        );
        const resultOptions = allOptions.filter((option) => option.match(filterRegex));
        setOptions(resultOptions);
      },
      []
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Search across categories"
        value={inputValue}
        placeholder="Type to search products, categories, or collections..."
        autoComplete="off"
      />
    );

    return (
      <div style={{ width: '400px' }}>
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={setSelectedOptions}
          multiple
          textField={textField}
          listTitle="Search Results"
        />

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>
            Available Categories:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {Object.keys(categorizedItems).map(category => (
              <span
                key={category}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#e1e3e5',
                  borderRadius: '4px',
                  fontSize: "12px",
                  color: '#374151'
                }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const CustomerLookup: Story = {
  render: () => {
    const [selectedCustomer, setSelectedCustomer] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [customers, setCustomers] = useState<Array<{name: string; email: string; orders: number}>>([]);

    // Mock customer data
    const mockCustomers = [
      { name: 'John Smith', email: 'john.smith@example.com', orders: 12 },
      { name: 'Sarah Johnson', email: 'sarah.j@example.com', orders: 8 },
      { name: 'Michael Chen', email: 'm.chen@example.com', orders: 15 },
      { name: 'Emily Davis', email: 'emily.d@example.com', orders: 3 },
      { name: 'Robert Wilson', email: 'r.wilson@example.com', orders: 21 },
    ];

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);

        if (!value) {
          setOptions([]);
          setCustomers([]);
          return;
        }

        const filterRegex = new RegExp(value, 'i');
        const matchedCustomers = mockCustomers.filter(customer =>
          customer.name.match(filterRegex) || customer.email.match(filterRegex)
        );

        setCustomers(matchedCustomers);
        setOptions(matchedCustomers.map(customer => customer.name));
      },
      []
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Search customers"
        value={inputValue}
        placeholder="Search by name or email..."
        autoComplete="off"
        prefix={<Icon source={PersonIcon} />}
      />
    );

    return (
      <div style={{ width: '400px' }}>
        <Autocomplete
          options={options}
          selected={selectedCustomer ? [selectedCustomer] : []}
          onSelect={(selected) => setSelectedCustomer(selected[0] || '')}
          textField={textField}
        />

        {customers.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>
              Customer Results:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {customers.map((customer, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedCustomer(customer.name)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{customer.name}</div>
                      <div style={{ fontSize: "14px", color: '#6b7280' }}>{customer.email}</div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: '#f0f9ff',
                      borderRadius: '4px',
                      fontSize: "12px",
                      color: '#1e40af'
                    }}>
                      {customer.orders} orders
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCustomer && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{ margin: 0, fontSize: "14px", color: '#1e40af' }}>
              Selected customer: <strong>{selectedCustomer}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const OrderLookup: Story = {
  render: () => {
    const [selectedOrder, setSelectedOrder] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [orders, setOrders] = useState<Array<{id: string; customer: string; total: string; status: string}>>([]);

    const mockOrders = [
      { id: '#1001', customer: 'John Smith', total: '$89.99', status: 'fulfilled' },
      { id: '#1002', customer: 'Sarah Johnson', total: '$156.50', status: 'processing' },
      { id: '#1003', customer: 'Michael Chen', total: '$234.00', status: 'pending' },
      { id: '#1004', customer: 'Emily Davis', total: '$45.75', status: 'cancelled' },
      { id: '#1005', customer: 'Robert Wilson', total: '$567.89', status: 'fulfilled' },
    ];

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);

        if (!value) {
          setOptions([]);
          setOrders([]);
          return;
        }

        const filterRegex = new RegExp(value, 'i');
        const matchedOrders = mockOrders.filter(order =>
          order.id.match(filterRegex) ||
          order.customer.match(filterRegex)
        );

        setOrders(matchedOrders);
        setOptions(matchedOrders.map(order => order.id));
      },
      []
    );

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'fulfilled': return '#dcfce7';
        case 'processing': return '#fef3c7';
        case 'pending': return '#e0e7ff';
        case 'cancelled': return '#fee2e2';
        default: return '#f3f4f6';
      }
    };

    const getStatusTextColor = (status: string) => {
      switch (status) {
        case 'fulfilled': return '#166534';
        case 'processing': return '#92400e';
        case 'pending': return '#3730a3';
        case 'cancelled': return '#991b1b';
        default: return '#374151';
      }
    };

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Search orders"
        value={inputValue}
        placeholder="Search by order number or customer..."
        autoComplete="off"
        prefix={<Icon source={OrderIcon} />}
      />
    );

    return (
      <div style={{ width: '450px' }}>
        <Autocomplete
          options={options}
          selected={selectedOrder ? [selectedOrder] : []}
          onSelect={(selected) => setSelectedOrder(selected[0] || '')}
          textField={textField}
        />

        {orders.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>
              Order Results:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {orders.map((order, index) => (
                <div
                  key={index}
                  style={{
                    padding: '12px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedOrder(order.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '500' }}>{order.id}</div>
                      <div style={{ fontSize: "14px", color: '#6b7280' }}>{order.customer}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '500' }}>{order.total}</span>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: getStatusColor(order.status),
                        borderRadius: '4px',
                        fontSize: "12px",
                        color: getStatusTextColor(order.status),
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedOrder && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{ margin: 0, fontSize: "14px", color: '#1e40af' }}>
              Selected order: <strong>{selectedOrder}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const WithLoadMore: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    // Generate mock products
    const generateProducts = (pageNum: number, count: number = 20) => {
      return Array.from({ length: count }, (_, i) =>
        `Product ${pageNum * count + i + 1} - ${['T-Shirt', 'Jeans', 'Sweater', 'Shoes', 'Hat'][i % 5]}`
      );
    };

    const loadMore = useCallback(() => {
      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
        const newOptions = generateProducts(page, 20);
        setOptions(prev => [...prev, ...newOptions]);
        setPage(prev => prev + 1);
        setLoading(false);

        // Stop loading after 5 pages for demo
        if (page >= 5) {
          setHasMore(false);
        }
      }, 1000);
    }, [page]);

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);

        if (!value) {
          setOptions([]);
          setPage(1);
          setHasMore(true);
          return;
        }

        // Reset and load first page
        setPage(1);
        setHasMore(true);
        setLoading(true);

        setTimeout(() => {
          const allProducts = generateProducts(0, 100);
          const filterRegex = new RegExp(value, 'i');
          const filteredProducts = allProducts.filter(option => option.match(filterRegex));
          setOptions(filteredProducts.slice(0, 20));
          setLoading(false);
          setHasMore(filteredProducts.length > 20);
        }, 500);
      },
      []
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Search products (with pagination)"
        value={inputValue}
        placeholder="Type to search products..."
        autoComplete="off"
      />
    );

    return (
      <div style={{ width: '400px' }}>
        <Autocomplete
          options={options}
          selected={selectedOptions}
          onSelect={setSelectedOptions}
          multiple
          textField={textField}
          loading={loading}
          willLoadMoreResults={hasMore}
          onLoadMore={loadMore}
          actionBefore={{
            content: 'Load all results',
            onAction: () => console.log('Load all clicked'),
          }}
        />

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
          <p style={{ margin: 0, fontSize: "14px", color: '#374151' }}>
            Showing {options.length} results
            {hasMore && ' (scroll to load more)'}
          </p>
        </div>
      </div>
    );
  },
};

export const DatePickerIntegration: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState<string[]>([]);
    const [popoverActive, setPopoverActive] = useState(false);

    // Generate date options
    const generateDateOptions = () => {
      const today = new Date();
      const dates = [];

      // Add relative dates
      dates.push('Today');
      dates.push('Tomorrow');
      dates.push('Yesterday');
      dates.push('This week');
      dates.push('Next week');
      dates.push('Last week');
      dates.push('This month');
      dates.push('Next month');
      dates.push('Last month');

      // Add specific dates for next 30 days
      for (let i = 1; i <= 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        }));
      }

      return dates;
    };

    const updateText = useCallback(
      (value: string) => {
        setInputValue(value);

        if (!value) {
          setOptions([]);
          return;
        }

        const allDates = generateDateOptions();
        const filterRegex = new RegExp(value, 'i');
        const resultOptions = allDates.filter((option) => option.match(filterRegex));
        setOptions(resultOptions);
      },
      []
    );

    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label="Select date"
        value={inputValue}
        placeholder="Select a date..."
        autoComplete="off"
        prefix={<Icon source={CalendarMajor} />}
        onFocus={() => setPopoverActive(true)}
      />
    );

    return (
      <div style={{ width: '300px' }}>
        <Popover
          active={popoverActive}
          activator={textField}
          onClose={() => setPopoverActive(false)}
        >
          <div style={{ padding: '16px', minWidth: '280px' }}>
            <Autocomplete
              options={options}
              selected={selectedDate ? [selectedDate] : []}
              onSelect={(selected) => {
                setSelectedDate(selected[0] || '');
                setInputValue(selected[0] || '');
                setPopoverActive(false);
              }}
              textField={undefined}
              listTitle="Quick Dates"
            />

            <div style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007ace',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  const today = new Date().toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  });
                  setSelectedDate(today);
                  setInputValue(today);
                  setPopoverActive(false);
                }}
              >
                Select Today
              </button>
            </div>
          </div>
        </Popover>

        {selectedDate && (
          <div style={{
            marginTop: '12px',
            padding: '8px',
            backgroundColor: '#f0f9ff',
            borderRadius: '4px'
          }}>
            Selected: <strong>{selectedDate}</strong>
          </div>
        )}
      </div>
    );
  },
};

export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      product: '',
      category: '',
      tags: [] as string[],
      customer: '',
    });

    const [suggestions, setSuggestions] = useState({
      products: [] as string[],
      categories: [] as string[],
      tags: [] as string[],
      customers: [] as string[],
    });

    const mockData = {
      products: ['T-Shirt Basic', 'Jeans Classic', 'Sweater Premium', 'Shoes Sport', 'Hat Casual'],
      categories: ['Clothing', 'Footwear', 'Accessories', 'Sports', 'Formal'],
      tags: ['new', 'sale', 'popular', 'featured', 'limited'],
      customers: ['John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Davis'],
    };

    const updateField = useCallback((field: keyof typeof suggestions, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      if (!value) {
        setSuggestions(prev => ({ ...prev, [field]: [] }));
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const results = mockData[field].filter(option => option.match(filterRegex));
      setSuggestions(prev => ({ ...prev, [field]: results }));
    }, []);

    const updateTags = useCallback((value: string) => {
      if (!value) {
        setSuggestions(prev => ({ ...prev, tags: [] }));
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const results = mockData.tags.filter(option =>
        option.match(filterRegex) && !formData.tags.includes(option)
      );
      setSuggestions(prev => ({ ...prev, tags: results }));
    }, [formData.tags]);

    return (
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: "18px" }}>Product Form</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <Autocomplete
                  options={suggestions.products}
                  selected={formData.product ? [formData.product] : []}
                  onSelect={(selected) => setFormData(prev => ({ ...prev, product: selected[0] || '' }))}
                  textField={
                    <Autocomplete.TextField
                      onChange={(value) => updateField('products', value)}
                      label="Product Name"
                      value={formData.product}
                      placeholder="Type to search products..."
                      autoComplete="off"
                    />
                  }
                />
              </div>

              <div>
                <Autocomplete
                  options={suggestions.categories}
                  selected={formData.category ? [formData.category] : []}
                  onSelect={(selected) => setFormData(prev => ({ ...prev, category: selected[0] || '' }))}
                  textField={
                    <Autocomplete.TextField
                      onChange={(value) => updateField('categories', value)}
                      label="Category"
                      value={formData.category}
                      placeholder="Select a category..."
                      autoComplete="off"
                    />
                  }
                />
              </div>

              <div>
                <Autocomplete
                  options={suggestions.tags}
                  selected={formData.tags}
                  onSelect={(selected) => setFormData(prev => ({ ...prev, tags: selected }))}
                  multiple
                  textField={
                    <Autocomplete.TextField
                      onChange={updateTags}
                      label="Tags"
                      value=""
                      placeholder="Add tags..."
                      autoComplete="off"
                    />
                  }
                />

                {formData.tags.length > 0 && (
                  <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#e1e3e5',
                          borderRadius: '4px',
                          fontSize: "12px",
                          color: '#374151',
                          cursor: 'pointer'
                        }}
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            tags: prev.tags.filter(t => t !== tag)
                          }));
                        }}
                      >
                        {tag} ×
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Autocomplete
                  options={suggestions.customers}
                  selected={formData.customer ? [formData.customer] : []}
                  onSelect={(selected) => setFormData(prev => ({ ...prev, customer: selected[0] || '' }))}
                  textField={
                    <Autocomplete.TextField
                      onChange={(value) => updateField('customers', value)}
                      label="Customer (Optional)"
                      value={formData.customer}
                      placeholder="Search customers..."
                      autoComplete="off"
                    />
                  }
                />
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div style={{ padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>
              Form Data:
            </h4>
            <pre style={{ fontSize: "12px", margin: 0, whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </Card>
      </div>
    );
  },
};