import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, Icon, Text, BlockStack, InlineStack } from '@shopify/polaris';
import { SearchIcon, PlusIcon } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Combobox combines a text input with a dropdown list of options, providing autocomplete functionality. It allows users to either type their own input or select from predefined options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activator: {
      control: 'object',
      description: 'Custom activator component',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow selecting multiple options',
    },
    textField: {
      control: 'object',
      description: 'Text field configuration and props',
    },
    listbox: {
      control: 'object',
      description: 'Listbox configuration and props',
    },
    popover: {
      control: 'object',
      description: 'Popover configuration and props',
    },
    preferredPosition: {
      control: 'select',
      options: ['above', 'below', 'mostSpace'],
      description: 'Preferred position for the dropdown',
    },
    onOpen: {
      action: 'onOpen',
      description: 'Callback when combobox opens',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when combobox closes',
    },
    onSelect: {
      action: 'onSelect',
      description: 'Callback when option is selected',
    },
    onLoadMoreResults: {
      action: 'onLoadMoreResults',
      description: 'Callback when loading more results',
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

const options = [
  { value: 'red', label: 'Red' },
  { value: 'orange', label: 'Orange' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'green', label: 'Green' },
  { value: 'blue', label: 'Blue' },
  { value: 'purple', label: 'Purple' },
  { value: 'pink', label: 'Pink' },
  { value: 'black', label: 'Black' },
  { value: 'white', label: 'White' },
  { value: 'gray', label: 'Gray' },
];

const tagOptions = [
  { value: 'new-arrival', label: 'New Arrival' },
  { value: 'bestseller', label: 'Bestseller' },
  { value: 'sale', label: 'Sale' },
  { value: 'limited-edition', label: 'Limited Edition' },
  { value: 'eco-friendly', label: 'Eco-Friendly' },
  { value: 'handmade', label: 'Handmade' },
  { value: 'imported', label: 'Imported' },
  { value: 'vintage', label: 'Vintage' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'cn', label: 'China' },
];

export const Default: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([
      { value: 'red', label: 'Red' },
      { value: 'orange', label: 'Orange' },
      { value: 'yellow', label: 'Yellow' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
    ]);

    const updateText = (value: string) => {
      setInputValue(value);
      if (value === '') {
        setOptions([
          { value: 'red', label: 'Red' },
          { value: 'orange', label: 'Orange' },
          { value: 'yellow', label: 'Yellow' },
          { value: 'green', label: 'Green' },
          { value: 'blue', label: 'Blue' },
        ]);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = options.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    };

    const updateSelection = (selected: string[]) => {
      setSelectedOption(selected[0]);
      setInputValue(selected[0]);
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Select color"
        value={inputValue}
        placeholder="Search colors"
        autoComplete="off"
      />
    );

    return (
      <div style={{ width: '300px' }}>
        <Combobox
          activator={textField}
          options={options}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={updateSelection}
        />
      </div>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState(tagOptions);

    const updateText = (value: string) => {
      setInputValue(value);
      if (value === '') {
        setOptions(tagOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = tagOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    };

    const updateSelection = (selected: string[]) => {
      setSelectedTags(selected);
      setInputValue('');
    };

    const removeTag = (tag: string) => {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Product tags"
        value={inputValue}
        placeholder="Search or add tags"
        autoComplete="off"
      />
    );

    const optionList = options.map((option) => {
      const { label, value } = option;
      return {
        value,
        label,
        selected: selectedTags.includes(value),
      };
    });

    return (
      <div style={{ width: '400px' }}>
        <Combobox
          allowMultiple
          activator={textField}
          options={optionList}
          selected={selectedTags}
          onSelect={updateSelection}
        />
        <div style={{ marginTop: '12px' }}>
          <Text as="p" variant="bodySm" color="subdued">
            Selected tags: {selectedTags.length > 0 ? selectedTags.join(', ') : 'None'}
          </Text>
        </div>
      </div>
    );
  },
};

export const WithCustomActivator: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const handleSelect = (selected: string[]) => {
      setSelectedOption(selected[0]);
      setInputValue(selected[0]);
      setIsOpen(false);
    };

    const activator = (
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '12px 16px',
          border: '1px solid #e1e3e5',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: '250px',
        }}
      >
        <span>{inputValue || 'Select a country'}</span>
        <Icon source={SearchIcon} />
      </div>
    );

    return (
      <div style={{ width: '300px' }}>
        <Combobox
          activator={activator}
          options={countryOptions}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={handleSelect}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
        />
        {selectedOption && (
          <div style={{ marginTop: '12px' }}>
            <Text>Selected: {countryOptions.find(opt => opt.value === selectedOption)?.label}</Text>
          </div>
        )}
      </div>
    );
  },
};

export const LazyLoading: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState(countryOptions.slice(0, 4));
    const [isLoading, setIsLoading] = React.useState(false);

    const updateText = (value: string) => {
      setInputValue(value);
      if (value === '') {
        setOptions(countryOptions.slice(0, 4));
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = countryOptions.filter((option) =>
        option.label.match(filterRegex)
      ).slice(0, 4);
      setOptions(resultOptions);
    };

    const updateSelection = (selected: string[]) => {
      setSelectedOption(selected[0]);
      setInputValue(selected[0]);
    };

    const loadMoreResults = () => {
      setIsLoading(true);
      setTimeout(() => {
        const currentLength = options.length;
        const newOptions = countryOptions.slice(currentLength, currentLength + 2);
        setOptions([...options, ...newOptions]);
        setIsLoading(false);
      }, 1000);
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Search countries"
        value={inputValue}
        placeholder="Type to search..."
        autoComplete="off"
      />
    );

    const optionList = options.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    return (
      <div style={{ width: '300px' }}>
        <Combobox
          activator={textField}
          options={optionList}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={updateSelection}
          onLoadMoreResults={loadMoreResults}
          listbox={{ loading: isLoading }}
        />
        {isLoading && (
          <div style={{ marginTop: '8px' }}>
            <Text color="subdued" variant="bodySm">Loading more results...</Text>
          </div>
        )}
      </div>
    );
  },
};

export const WithSections: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const productOptions = [
      { value: 'electronics', label: 'Electronics', section: 'Categories' },
      { value: 'clothing', label: 'Clothing', section: 'Categories' },
      { value: 'books', label: 'Books', section: 'Categories' },
      { value: 'home-garden', label: 'Home & Garden', section: 'Categories' },
    ];

    const brandOptions = [
      { value: 'apple', label: 'Apple', section: 'Brands' },
      { value: 'samsung', label: 'Samsung', section: 'Brands' },
      { value: 'nike', label: 'Nike', section: 'Brands' },
      { value: 'adidas', label: 'Adidas', section: 'Brands' },
    ];

    const allOptions = [...productOptions, ...brandOptions];

    const updateText = (value: string) => {
      setInputValue(value);
    };

    const updateSelection = (selected: string[]) => {
      setSelectedOption(selected[0]);
      const option = allOptions.find(opt => opt.value === selected[0]);
      setInputValue(option?.label || '');
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Search products or brands"
        value={inputValue}
        placeholder="Type to search..."
        autoComplete="off"
      />
    );

    const optionList = allOptions.map((option) => ({
      value: option.value,
      label: option.label,
      section: option.section,
    }));

    return (
      <div style={{ width: '350px' }}>
        <Combobox
          activator={textField}
          options={optionList}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={updateSelection}
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const productOptions = [
      { value: 'in-stock', label: 'In Stock', disabled: false },
      { value: 'low-stock', label: 'Low Stock', disabled: false },
      { value: 'out-of-stock', label: 'Out of Stock', disabled: true },
      { value: 'discontinued', label: 'Discontinued', disabled: true },
    ];

    const updateText = (value: string) => {
      setInputValue(value);
    };

    const updateSelection = (selected: string[]) => {
      setSelectedOption(selected[0]);
      const option = productOptions.find(opt => opt.value === selected[0]);
      setInputValue(option?.label || '');
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Inventory status"
        value={inputValue}
        placeholder="Select status"
        autoComplete="off"
      />
    );

    const optionList = productOptions.map((option) => ({
      value: option.value,
      label: option.label,
      disabled: option.disabled,
    }));

    return (
      <div style={{ width: '300px' }}>
        <Combobox
          activator={textField}
          options={optionList}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={updateSelection}
        />
        <div style={{ marginTop: '12px' }}>
          <Text as="p" variant="bodySm" color="subdued">
            Out of stock and discontinued options are disabled
          </Text>
        </div>
      </div>
    );
  },
};

export const RealWorldExample: Story = {
  render: () => {
    const [recipientEmail, setRecipientEmail] = React.useState('');
    const [selectedTemplate, setSelectedTemplate] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [templateInput, setTemplateInput] = React.useState('');

    const emailOptions = [
      { value: 'john@example.com', label: 'john@example.com' },
      { value: 'sarah@example.com', label: 'sarah@example.com' },
      { value: 'mike@example.com', label: 'mike@example.com' },
      { value: 'emma@example.com', label: 'emma@example.com' },
    ];

    const templateOptions = [
      { value: 'welcome', label: 'Welcome Email' },
      { value: 'order-confirmation', label: 'Order Confirmation' },
      { value: 'shipping-update', label: 'Shipping Update' },
      { value: 'marketing', label: 'Marketing Campaign' },
      { value: 'support', label: 'Customer Support' },
    ];

    const updateEmailText = (value: string) => {
      setEmailInput(value);
    };

    const updateEmailSelection = (selected: string[]) => {
      setRecipientEmail(selected[0]);
      setEmailInput(selected[0]);
    };

    const updateTemplateText = (value: string) => {
      setTemplateInput(value);
    };

    const updateTemplateSelection = (selected: string[]) => {
      setSelectedTemplate(selected[0]);
      setTemplateInput(selected[0]);
    };

    const emailField = (
      <Combobox.TextField
        onChange={updateEmailText}
        label="Recipient email"
        value={emailInput}
        placeholder="Search or enter email"
        autoComplete="off"
      />
    );

    const templateField = (
      <Combobox.TextField
        onChange={updateTemplateText}
        label="Email template"
        value={templateInput}
        placeholder="Search templates"
        autoComplete="off"
      />
    );

    return (
      <div style={{ width: '400px' }}>
        <BlockStack gap="16px">
          <Combobox
            activator={emailField}
            options={emailOptions}
            selected={recipientEmail ? [recipientEmail] : []}
            onSelect={updateEmailSelection}
          />

          <Combobox
            activator={templateField}
            options={templateOptions}
            selected={selectedTemplate ? [selectedTemplate] : []}
            onSelect={updateTemplateSelection}
          />

          <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <Text as="h4" variant="headingSm">Email Preview</Text>
            <div style={{ marginTop: '8px' }}>
              <Text variant="bodySm">
                To: {recipientEmail || 'No recipient selected'}<br />
                Template: {selectedTemplate ? templateOptions.find(t => t.value === selectedTemplate)?.label : 'No template selected'}
              </Text>
            </div>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
    const [inputValue, setInputValue] = React.useState('');

    const colorOptions = [
      { value: 'crimson', label: 'Crimson', color: '#DC143C' },
      { value: 'coral', label: 'Coral', color: '#FF7F50' },
      { value: 'gold', label: 'Gold', color: '#FFD700' },
      { value: 'emerald', label: 'Emerald', color: '#50C878' },
      { value: 'sky', label: 'Sky Blue', color: '#87CEEB' },
      { value: 'lavender', label: 'Lavender', color: '#E6E6FA' },
    ];

    const updateText = (value: string) => {
      setInputValue(value);
    };

    const updateSelection = (selected: string[]) => {
      setSelectedColors(selected);
      setInputValue('');
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Select colors"
        value={inputValue}
        placeholder="Search colors..."
        autoComplete="off"
      />
    );

    const optionList = colorOptions.map((option) => ({
      value: option.value,
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              backgroundColor: option.color,
              borderRadius: '2px',
              border: '1px solid #e1e3e5',
            }}
          />
          {option.label}
        </div>
      ),
      selected: selectedColors.includes(option.value),
    }));

    return (
      <div style={{ width: '300px' }}>
        <Combobox
          allowMultiple
          activator={textField}
          options={optionList}
          selected={selectedColors}
          onSelect={updateSelection}
        />
        {selectedColors.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <InlineStack gap="4px">
              {selectedColors.map(color => {
                const colorData = colorOptions.find(opt => opt.value === color);
                return (
                  <div
                    key={color}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: colorData?.color,
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: "12px",
                    }}
                  >
                    {colorData?.label}
                  </div>
                );
              })}
            </InlineStack>
          </div>
        )}
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');
    const [error, setError] = React.useState('');
    const [isValidating, setIsValidating] = React.useState(false);

    const validOptions = [
      { value: 'product-123', label: 'Product #123' },
      { value: 'product-456', label: 'Product #456' },
      { value: 'product-789', label: 'Product #789' },
    ];

    const updateText = (value: string) => {
      setInputValue(value);
      setError('');

      if (value.length > 0 && value.length < 3) {
        setError('Product ID must be at least 3 characters');
      }
    };

    const updateSelection = (selected: string[]) => {
      setIsValidating(true);
      setTimeout(() => {
        setSelectedOption(selected[0]);
        setInputValue(selected[0]);
        setError('');
        setIsValidating(false);
      }, 500);
    };

    const textField = (
      <Combobox.TextField
        onChange={updateText}
        label="Product ID"
        value={inputValue}
        placeholder="Enter or select product ID"
        autoComplete="off"
        error={error}
        clearButton
        onClear={() => {
          setInputValue('');
          setSelectedOption('');
          setError('');
        }}
      />
    );

    return (
      <div style={{ width: '350px' }}>
        <Combobox
          activator={textField}
          options={validOptions}
          selected={selectedOption ? [selectedOption] : []}
          onSelect={updateSelection}
          listbox={{ loading: isValidating }}
        />
        <div style={{ marginTop: '12px' }}>
          <Text as="p" variant="bodySm" color="subdued">
            {isValidating ? 'Validating product ID...' : 'Enter a valid product ID or select from the list'}
          </Text>
        </div>
      </div>
    );
  },
};