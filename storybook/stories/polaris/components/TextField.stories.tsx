import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text fields allow users to input and edit text. They are essential for collecting user input in forms, search interfaces, and any place where text input is required.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    value: {
      control: 'text',
      description: 'Field value',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable field',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helpText: {
      control: 'text',
      description: 'Help text',
    },
    multiline: {
      control: 'boolean',
      description: 'Enable multiline input',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum character count',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Customer name',
    placeholder: 'Enter customer name',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    value: 'john.doe@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Phone number',
    type: 'tel',
    placeholder: '(555) 123-4567',
    helpText: 'Include country code for international numbers',
  },
};

export const Required: Story = {
  args: {
    label: 'Company name',
    placeholder: 'Enter company name',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Reference number',
    value: 'REF-2024-001',
    disabled: true,
  },
};

export const Multiline: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a detailed description...',
    multiline: 4,
    maxLength: 500,
  },
};

export const NumberInput: Story = {
  render: () => {
    const [quantity, setQuantity] = React.useState('1');
    const [price, setPrice] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateNumber = (field: string, value: string) => {
      if (field === 'quantity') {
        const num = parseInt(value);
        if (isNaN(num) || num < 1) {
          return 'Quantity must be at least 1';
        }
        if (num > 999) {
          return 'Maximum quantity is 999';
        }
      }
      if (field === 'price') {
        const num = parseFloat(value);
        if (value && (isNaN(num) || num < 0)) {
          return 'Please enter a valid price';
        }
      }
      return '';
    };

    const handleBlur = (field: string, value: string) => {
      const error = validateNumber(field, value);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      } else {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={setQuantity}
          onBlur={() => handleBlur('quantity', quantity)}
          error={errors.quantity}
          min={1}
          max={999}
          required
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={setPrice}
          onBlur={() => handleBlur('price', price)}
          error={errors.price}
          placeholder="0.00"
          step="0.01"
          min={0}
          prefix="$"
          helpText="Enter price in USD"
        />
      </div>
    );
  },
};

export const PasswordField: Story = {
  render: () => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validatePassword = (value: string): string => {
      if (value.length < 8) {
        return 'Password must be at least 8 characters';
      }
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
        return 'Password must contain uppercase, lowercase, and number';
      }
      return '';
    };

    const handlePasswordBlur = () => {
      const error = validatePassword(password);
      setErrors(prev => ({ ...prev, password: error }));
    };

    const handleConfirmBlur = () => {
      if (confirmPassword && confirmPassword !== password) {
        setErrors(prev => ({ ...prev, confirm: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirm: '' }));
      }
    };

    return (
      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          onBlur={handlePasswordBlur}
          error={errors.password}
          placeholder="Enter secure password"
          required
          helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          onBlur={handleConfirmBlur}
          error={errors.confirm}
          placeholder="Confirm your password"
          required
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: "var(--font-size-sm)" }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>
      </div>
    );
  },
};

export const SearchField: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isSearching, setIsSearching] = React.useState(false);
    const [recentSearches, setRecentSearches] = React.useState(['Product A', 'Order #12345', 'Customer email']);

    const handleSearch = () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        // Simulate search
        setTimeout(() => {
          setIsSearching(false);
          if (!recentSearches.includes(searchQuery)) {
            setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
          }
        }, 1000);
      }
    };

    return (
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Search products, orders, or customers"
          type="search"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
          prefix={
            <span style={{ cursor: 'pointer' }} onClick={handleSearch}>
              🔍
            </span>
          }
          helpText="Start typing to see suggestions"
          autoComplete="off"
        />

        {isSearching && (
          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px', textAlign: 'center' }}>
            Searching...
          </div>
        )}

        {recentSearches.length > 0 && (
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)", fontWeight: '600' }}>Recent Searches:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  style={{
                    padding: '8px',
                    border: '1px solid #e1e1e1',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: "var(--font-size-sm)",
                  }}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const UrlInput: Story = {
  args: {
    label: 'Website URL',
    type: 'url',
    placeholder: 'https://example.com',
    helpText: 'Include https:// for valid URLs',
  },
};

export const TelephoneInput: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('');
    const [errors, setErrors] = React.useState('');

    const formatPhone = (value: string) => {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    };

    const handleChange = (value: string) => {
      const formatted = formatPhone(value);
      setPhone(formatted);
      if (errors) setErrors('');
    };

    const validatePhone = () => {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length !== 10) {
        setErrors('Please enter a valid 10-digit phone number');
      }
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <TextField
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={handleChange}
          onBlur={validatePhone}
          error={errors}
          placeholder="(555) 123-4567"
          helpText="US phone numbers only"
        />
      </div>
    );
  },
};

export const CharacterCount: Story = {
  render: () => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const maxLengthTitle = 60;
    const maxLengthDesc = 300;

    return (
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Enter a catchy title"
          maxLength={maxLengthTitle}
          showCharacterCount
          helpText={`Keep it concise - ${maxLengthTitle - title.length} characters remaining`}
        />

        <TextField
          label="Description"
          multiline={4}
          value={description}
          onChange={setDescription}
          placeholder="Describe your product or service..."
          maxLength={maxLengthDesc}
          showCharacterCount
          helpText={`Be detailed but brief - ${maxLengthDesc - description.length} characters remaining`}
        />
      </div>
    );
  },
};

export const PrefixSuffix: Story = {
  render: () => {
    const [price, setPrice] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [discount, setDiscount] = React.useState('');

    return (
      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={setPrice}
          placeholder="0.00"
          prefix="$"
          step="0.01"
        />

        <TextField
          label="Weight"
          type="number"
          value={weight}
          onChange={setWeight}
          placeholder="0.0"
          suffix="kg"
          step="0.1"
        />

        <TextField
          label="Discount"
          type="number"
          value={discount}
          onChange={setDiscount}
          placeholder="0"
          suffix="%"
          min={0}
          max={100}
        />
      </div>
    );
  },
};

export const AutoComplete: Story = {
  render: () => {
    const [email, setEmail] = React.useState('');
    const [suggestions] = React.useState([
      'john.doe@example.com',
      'jane.smith@example.com',
      'admin@company.com',
      'support@service.com',
    ]);

    return (
      <div style={{ maxWidth: '400px' }}>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Enter email..."
          autoComplete="email"
          list="email-suggestions"
          helpText="Start typing for suggestions"
        />
        <datalist id="email-suggestions">
          {suggestions.map((email, index) => (
            <option key={index} value={email} />
          ))}
        </datalist>
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const validateField = (field: string, value: string): string => {
      switch (field) {
        case 'firstName':
        case 'lastName':
          return value.trim().length < 2 ? 'Must be at least 2 characters' : '';
        case 'email':
          return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address' : '';
        case 'phone':
          return value && !/^\+?[\d\s\-\(\)]+$/.test(value) ? 'Please enter a valid phone number' : '';
        default:
          return '';
      }
    };

    const handleBlur = (field: string) => {
      const error = validateField(field, formData[field]);
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    };

    return (
      <div style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <TextField
            label="First name"
            value={formData.firstName}
            onChange={(value) => handleInputChange('firstName', value)}
            onBlur={() => handleBlur('firstName')}
            error={errors.firstName}
            required
          />
          <TextField
            label="Last name"
            value={formData.lastName}
            onChange={(value) => handleInputChange('lastName', value)}
            onBlur={() => handleBlur('lastName')}
            error={errors.lastName}
            required
          />
        </div>

        <TextField
          label="Email address"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange('email', value)}
          onBlur={() => handleBlur('email')}
          error={errors.email}
          placeholder="john.doe@example.com"
          required
        />

        <TextField
          label="Phone number"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleInputChange('phone', value)}
          onBlur={() => handleBlur('phone')}
          error={errors.phone}
          placeholder="(555) 123-4567"
          helpText="Include country code for international numbers"
        />

        <TextField
          label="Company"
          value={formData.company}
          onChange={(value) => handleInputChange('company', value)}
          placeholder="Enter company name"
        />

        <TextField
          label="Message"
          multiline={4}
          value={formData.message}
          onChange={(value) => handleInputChange('message', value)}
          placeholder="Enter your message here..."
          helpText="Maximum 500 characters"
          maxLength={500}
        />

        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)", fontWeight: '600' }}>Form Data:</h4>
          <pre style={{ fontSize: "var(--font-size-xs)", margin: 0, whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};