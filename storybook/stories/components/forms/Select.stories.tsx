import type { Meta, StoryObj } from '@storybook/react';
import { Select, BlockStack, InlineStack, Text } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Select components allow users to choose one option from a dropdown list. They are useful when you have many options to choose from or when screen space is limited. Select components can include groups, disabled options, and placeholder text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Select field label',
    },
    options: {
      control: 'object',
      description: 'Array of select options',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable select interaction',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helpText: {
      control: 'text',
      description: 'Additional help text',
    },
    name: {
      control: 'text',
      description: 'Form field name',
    },
    id: {
      control: 'text',
      description: 'Unique identifier',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  {label: 'Please select', value: ''},
  {label: 'Option 1', value: '1'},
  {label: 'Option 2', value: '2'},
  {label: 'Option 3', value: '3'},
];

const countryOptions = [
  {label: 'Select a country', value: ''},
  {label: 'United States', value: 'us'},
  {label: 'Canada', value: 'ca'},
  {label: 'United Kingdom', value: 'uk'},
  {label: 'Australia', value: 'au'},
  {label: 'Germany', value: 'de'},
  {label: 'France', value: 'fr'},
  {label: 'Japan', value: 'jp'},
];

const groupedOptions = [
  {label: 'Select a product category', value: ''},
  {label: 'Electronics', options: [
    {label: 'Smartphones', value: 'smartphones'},
    {label: 'Laptops', value: 'laptops'},
    {label: 'Tablets', value: 'tablets'},
  ]},
  {label: 'Clothing', options: [
    {label: 'Men\'s Clothing', value: 'mens'},
    {label: 'Women\'s Clothing', value: 'womens'},
    {label: 'Children\'s Clothing', value: 'children'},
  ]},
  {label: 'Home & Garden', options: [
    {label: 'Furniture', value: 'furniture'},
    {label: 'Decor', value: 'decor'},
    {label: 'Garden Supplies', value: 'garden'},
  ]},
];

export const Default: Story = {
  args: {
    label: 'Choose an option',
    options: basicOptions,
    placeholder: 'Select an option',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled select',
    options: basicOptions,
    value: '1',
    disabled: true,
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Product category',
    options: groupedOptions,
    helpText: 'Select the primary category for your product',
  },
};

export const Required: Story = {
  args: {
    label: 'Salutation',
    options: [
      {label: 'Select salutation', value: ''},
      {label: 'Mr.', value: 'mr'},
      {label: 'Mrs.', value: 'mrs'},
      {label: 'Ms.', value: 'ms'},
      {label: 'Dr.', value: 'dr'},
    ],
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Payment method',
    options: [
      {label: 'Select payment method', value: ''},
      {label: 'Credit Card', value: 'credit'},
      {label: 'Debit Card', value: 'debit'},
      {label: 'PayPal', value: 'paypal'},
    ],
    error: 'Payment method is required',
  },
};

export const GroupedOptions: Story = {
  args: {
    label: 'Product category',
    options: groupedOptions,
    placeholder: 'Select a category',
  },
};

export const LanguageSelector: Story = {
  render: () => {
    const [language, setLanguage] = React.useState('en');

    const languages = [
      {label: 'English', value: 'en'},
      {label: 'Spanish', value: 'es'},
      {label: 'French', value: 'fr'},
      {label: 'German', value: 'de'},
      {label: 'Italian', value: 'it'},
      {label: 'Portuguese', value: 'pt'},
      {label: 'Russian', value: 'ru'},
      {label: 'Japanese', value: 'ja'},
      {label: 'Chinese (Simplified)', value: 'zh-cn'},
      {label: 'Chinese (Traditional)', value: 'zh-tw'},
      {label: 'Korean', value: 'ko'},
      {label: 'Arabic', value: 'ar'},
    ];

    return (
      <BlockStack gap="400" maxWidth="400px">
        <Select
          label="Preferred language"
          options={languages}
          value={language}
          onChange={setLanguage}
          helpText="Choose your preferred language for the interface"
        />
        <Text as="p" variant="bodySm" tone="subdued">
          Selected: {languages.find(l => l.value === language)?.label}
        </Text>
      </BlockStack>
    );
  },
};

export const ProductConfiguration: Story = {
  render: () => {
    const [category, setCategory] = React.useState('');
    const [subcategory, setSubcategory] = React.useState('');
    const [brand, setBrand] = React.useState('');

    const categories = [
      {label: 'Select category', value: ''},
      {label: 'Electronics', value: 'electronics'},
      {label: 'Clothing', value: 'clothing'},
      {label: 'Home & Garden', value: 'home'},
      {label: 'Sports', value: 'sports'},
    ];

    const subcategories: Record<string, Array<{label: string; value: string}>> = {
      electronics: [
        {label: 'Select subcategory', value: ''},
        {label: 'Smartphones', value: 'smartphones'},
        {label: 'Laptops', value: 'laptops'},
        {label: 'Tablets', value: 'tablets'},
        {label: 'Accessories', value: 'accessories'},
      ],
      clothing: [
        {label: 'Select subcategory', value: ''},
        {label: 'Men\'s', value: 'mens'},
        {label: 'Women\'s', value: 'womens'},
        {label: 'Children', value: 'children'},
        {label: 'Accessories', value: 'clothing-accessories'},
      ],
      home: [
        {label: 'Select subcategory', value: ''},
        {label: 'Furniture', value: 'furniture'},
        {label: 'Decor', value: 'decor'},
        {label: 'Kitchen', value: 'kitchen'},
        {label: 'Garden', value: 'garden'},
      ],
      sports: [
        {label: 'Select subcategory', value: ''},
        {label: 'Fitness', value: 'fitness'},
        {label: 'Outdoor', value: 'outdoor'},
        {label: 'Team Sports', value: 'team'},
        {label: 'Water Sports', value: 'water'},
      ],
    };

    const brands = [
      {label: 'Select brand', value: ''},
      {label: 'Apple', value: 'apple'},
      {label: 'Samsung', value: 'samsung'},
      {label: 'Nike', value: 'nike'},
      {label: 'Adidas', value: 'adidas'},
      {label: 'Sony', value: 'sony'},
      {label: 'LG', value: 'lg'},
    ];

    const currentSubcategories = subcategories[category] || [{label: 'First select a category', value: ''}];

    return (
      <BlockStack gap="400" maxWidth="500px">
        <Text as="h3" variant="headingMd">Product Configuration</Text>

        <Select
          label="Product Category"
          options={categories}
          value={category}
          onChange={(value) => {
            setCategory(value);
            setSubcategory('');
          }}
          required
        />

        <Select
          label="Product Subcategory"
          options={currentSubcategories}
          value={subcategory}
          onChange={setSubcategory}
          disabled={!category}
          required
        />

        <Select
          label="Brand"
          options={brands}
          value={brand}
          onChange={setBrand}
          helpText="Select the primary brand for this product"
        />

        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <Text as="h4" variant="headingSm">Selection Summary:</Text>
          <Text as="p">Category: {categories.find(c => c.value === category)?.label || 'None'}</Text>
          <Text as="p">Subcategory: {currentSubcategories.find(s => s.value === subcategory)?.label || 'None'}</Text>
          <Text as="p">Brand: {brands.find(b => b.value === brand)?.label || 'None'}</Text>
        </div>
      </BlockStack>
    );
  },
};

export const AddressForm: Story = {
  render: () => {
    const [country, setCountry] = React.useState('');
    const [state, setState] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const countries = [
      {label: 'Select country', value: ''},
      {label: 'United States', value: 'us'},
      {label: 'Canada', value: 'ca'},
      {label: 'United Kingdom', value: 'uk'},
      {label: 'Australia', value: 'au'},
    ];

    const states: Record<string, Array<{label: string; value: string}>> = {
      us: [
        {label: 'Select state', value: ''},
        {label: 'California', value: 'ca'},
        {label: 'Texas', value: 'tx'},
        {label: 'New York', value: 'ny'},
        {label: 'Florida', value: 'fl'},
      ],
      ca: [
        {label: 'Select province', value: ''},
        {label: 'Ontario', value: 'on'},
        {label: 'Quebec', value: 'qc'},
        {label: 'British Columbia', value: 'bc'},
        {label: 'Alberta', value: 'ab'},
      ],
      uk: [
        {label: 'Select region', value: ''},
        {label: 'England', value: 'eng'},
        {label: 'Scotland', value: 'sco'},
        {label: 'Wales', value: 'wal'},
        {label: 'Northern Ireland', value: 'ni'},
      ],
      au: [
        {label: 'Select state', value: ''},
        {label: 'New South Wales', value: 'nsw'},
        {label: 'Victoria', value: 'vic'},
        {label: 'Queensland', value: 'qld'},
        {label: 'Western Australia', value: 'wa'},
      ],
    };

    const validateField = (field: string, value: string) => {
      if (!value) {
        setErrors(prev => ({ ...prev, [field]: 'This field is required' }));
        return false;
      }
      setErrors(prev => ({ ...prev, [field]: '' }));
      return true;
    };

    const handleBlur = (field: string, value: string) => {
      validateField(field, value);
    };

    const currentStates = states[country] || [{label: 'First select a country', value: ''}];

    return (
      <BlockStack gap="400" maxWidth="500px">
        <Text as="h3" variant="headingMd">Address Information</Text>

        <Select
          label="Country"
          options={countries}
          value={country}
          onChange={(value) => {
            setCountry(value);
            setState('');
            if (errors.country) {
              setErrors(prev => ({ ...prev, country: '' }));
            }
          }}
          onBlur={() => handleBlur('country', country)}
          error={errors.country}
          required
        />

        <Select
          label="State/Province/Region"
          options={currentStates}
          value={state}
          onChange={(value) => {
            setState(value);
            if (errors.state) {
              setErrors(prev => ({ ...prev, state: '' }));
            }
          }}
          onBlur={() => handleBlur('state', state)}
          error={errors.state}
          disabled={!country}
          required
        />

        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <Text as="h4" variant="headingSm">Selected Address:</Text>
          <Text as="p">Country: {countries.find(c => c.value === country)?.label || 'None'}</Text>
          <Text as="p">State: {currentStates.find(s => s.value === state)?.label || 'None'}</Text>
        </div>
      </BlockStack>
    );
  },
};

export const AdvancedFiltering: Story = {
  render: () => {
    const [filters, setFilters] = React.useState({
      status: '',
      priority: '',
      assignedTo: '',
      dateRange: '',
    });

    const statusOptions = [
      {label: 'All statuses', value: ''},
      {label: 'Open', value: 'open'},
      {label: 'In Progress', value: 'in-progress'},
      {label: 'Resolved', value: 'resolved'},
      {label: 'Closed', value: 'closed'},
    ];

    const priorityOptions = [
      {label: 'All priorities', value: ''},
      {label: 'Low', value: 'low'},
      {label: 'Medium', value: 'medium'},
      {label: 'High', value: 'high'},
      {label: 'Critical', value: 'critical'},
    ];

    const assigneeOptions = [
      {label: 'Unassigned', value: ''},
      {label: 'John Doe', value: 'john'},
      {label: 'Jane Smith', value: 'jane'},
      {label: 'Bob Johnson', value: 'bob'},
      {label: 'Alice Brown', value: 'alice'},
    ];

    const dateOptions = [
      {label: 'Any time', value: ''},
      {label: 'Today', value: 'today'},
      {label: 'This week', value: 'week'},
      {label: 'This month', value: 'month'},
      {label: 'This quarter', value: 'quarter'},
      {label: 'This year', value: 'year'},
    ];

    const handleFilterChange = (key: string, value: string) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
      setFilters({
        status: '',
        priority: '',
        assignedTo: '',
        dateRange: '',
      });
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
      <BlockStack gap="400" maxWidth="600px">
        <InlineStack align="space-between">
          <Text as="h3" variant="headingMd">Filter Tickets</Text>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              style={{
                padding: '6px 12px',
                backgroundColor: 'transparent',
                color: '#007ace',
                border: '1px solid #007ace',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: "14px",
              }}
            >
              Clear All
            </button>
          )}
        </InlineStack>

        <InlineStack gap="400">
          <div style={{ flex: 1 }}>
            <Select
              label="Status"
              options={statusOptions}
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select
              label="Priority"
              options={priorityOptions}
              value={filters.priority}
              onChange={(value) => handleFilterChange('priority', value)}
            />
          </div>
        </InlineStack>

        <InlineStack gap="400">
          <div style={{ flex: 1 }}>
            <Select
              label="Assigned to"
              options={assigneeOptions}
              value={filters.assignedTo}
              onChange={(value) => handleFilterChange('assignedTo', value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Select
              label="Date range"
              options={dateOptions}
              value={filters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
            />
          </div>
        </InlineStack>

        {hasActiveFilters && (
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Active Filters:</Text>
            <Text as="p">Status: {filters.status || 'Any'}</Text>
            <Text as="p">Priority: {filters.priority || 'Any'}</Text>
            <Text as="p">Assigned: {filters.assignedTo || 'Anyone'}</Text>
            <Text as="p">Date: {filters.dateRange || 'Any time'}</Text>
          </div>
        )}
      </BlockStack>
    );
  },
};