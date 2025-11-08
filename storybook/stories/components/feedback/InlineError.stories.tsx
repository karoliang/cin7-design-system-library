import type { Meta, StoryObj } from '@storybook/react';
import { InlineError, TextField, Button, FormLayout, LegacyCard, LegacyStack, Checkbox, Select } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/InlineError',
  component: InlineError,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'InlineError displays validation errors directly below form fields. It provides context-specific error messages that help users understand and fix validation issues. Use InlineError for field-level validation, while Banner is better for form-level or page-level messages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Error message explaining how to resolve the invalid input',
    },
    fieldID: {
      control: 'text',
      description: 'Unique identifier of the invalid form field that the message describes',
    },
  },
} satisfies Meta<typeof InlineError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Store name is required',
    fieldID: 'storeName',
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'default'),
  },
};

export const WithTextField: Story = {
  render: () => {
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const fieldID = 'emailField';

    const validateEmail = () => {
      if (!email) {
        setError('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('Please enter a valid email address');
      } else {
        setError('');
      }
    };

    return (
      <div style={{ width: '400px' }}>
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (error) setError('');
          }}
          onBlur={validateEmail}
          error={error}
          id={fieldID}
          autoComplete="email"
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'with-textfield'),
  },
};

export const MultipleFieldErrors: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});

    const validateField = (field: string, value: string): string => {
      switch (field) {
        case 'firstName':
        case 'lastName':
          if (!value.trim()) return `${field === 'firstName' ? 'First' : 'Last'} name is required`;
          if (value.trim().length < 2) return 'Must be at least 2 characters';
          return '';
        case 'email':
          if (!value) return 'Email is required';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
          return '';
        case 'phone':
          if (value && !/^\+?[\d\s\-\(\)]+$/.test(value)) return 'Please enter a valid phone number';
          return '';
        default:
          return '';
      }
    };

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error when user starts typing
      if (errors[field]) {
        const newError = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: newError }));
      }
    };

    const handleBlur = (field: string) => {
      setTouched(prev => ({ ...prev, [field]: true }));
      const error = validateField(field, formData[field as keyof typeof formData]);
      setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all fields
      const newErrors: Record<string, string> = {};
      Object.keys(formData).forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) newErrors[field] = error;
      });

      setErrors(newErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      });

      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <form onSubmit={handleSubmit}>
            <FormLayout>
              <FormLayout.Group>
                <TextField
                  label="First name"
                  value={formData.firstName}
                  onChange={(value) => handleChange('firstName', value)}
                  onBlur={() => handleBlur('firstName')}
                  error={touched.firstName && errors.firstName}
                  id="firstName"
                  autoComplete="given-name"
                  required
                />
                <TextField
                  label="Last name"
                  value={formData.lastName}
                  onChange={(value) => handleChange('lastName', value)}
                  onBlur={() => handleBlur('lastName')}
                  error={touched.lastName && errors.lastName}
                  id="lastName"
                  autoComplete="family-name"
                  required
                />
              </FormLayout.Group>

              <TextField
                label="Email address"
                type="email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                onBlur={() => handleBlur('email')}
                error={touched.email && errors.email}
                id="email"
                autoComplete="email"
                required
              />

              <TextField
                label="Phone number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
                onBlur={() => handleBlur('phone')}
                error={touched.phone && errors.phone}
                id="phone"
                autoComplete="tel"
                placeholder="(555) 123-4567"
              />

              <Button submit primary>Submit form</Button>
            </FormLayout>
          </form>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'multiple-fields'),
  },
};

export const PasswordValidation: Story = {
  render: () => {
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = React.useState(false);

    const validatePassword = (value: string): string => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])/.test(value)) return 'Password must contain a lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain an uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'Password must contain a number';
      return '';
    };

    const handlePasswordChange = (value: string) => {
      setPassword(value);
      const error = validatePassword(value);
      setErrors(prev => ({ ...prev, password: error }));

      // Revalidate confirm password if it has a value
      if (confirmPassword) {
        const confirmError = value !== confirmPassword ? 'Passwords do not match' : '';
        setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    };

    const handleConfirmChange = (value: string) => {
      setConfirmPassword(value);
      const error = password !== value ? 'Passwords do not match' : '';
      setErrors(prev => ({ ...prev, confirmPassword: error }));
    };

    return (
      <div style={{ width: '400px' }}>
        <LegacyCard sectioned>
          <FormLayout>
            <TextField
              label="New password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              error={errors.password}
              id="password"
              autoComplete="new-password"
              helpText="Must be at least 8 characters with uppercase, lowercase, and number"
              required
            />

            <TextField
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmChange}
              error={errors.confirmPassword}
              id="confirmPassword"
              autoComplete="new-password"
              required
            />

            <Checkbox
              label="Show password"
              checked={showPassword}
              onChange={setShowPassword}
            />

            <Button
              primary
              disabled={!!errors.password || !!errors.confirmPassword || !password || !confirmPassword}
            >
              Update password
            </Button>
          </FormLayout>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'password-validation'),
  },
};

export const FormSubmissionErrors: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      productName: '',
      sku: '',
      quantity: '',
      category: '',
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState('');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setSubmitError('');

      // Clear previous errors
      setErrors({});

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate server-side validation errors
      const serverErrors: Record<string, string> = {};

      if (!formData.productName) {
        serverErrors.productName = 'Product name is required';
      }

      if (!formData.sku) {
        serverErrors.sku = 'SKU is required';
      } else if (formData.sku === 'DUPLICATE') {
        serverErrors.sku = 'This SKU already exists in your inventory';
      }

      if (!formData.quantity) {
        serverErrors.quantity = 'Quantity is required';
      } else if (parseInt(formData.quantity) < 1) {
        serverErrors.quantity = 'Quantity must be at least 1';
      }

      if (!formData.category) {
        serverErrors.category = 'Category is required';
      }

      if (Object.keys(serverErrors).length > 0) {
        setErrors(serverErrors);
        setSubmitError('Please fix the errors below and try again.');
      } else {
        alert('Product created successfully!');
        // Reset form
        setFormData({
          productName: '',
          sku: '',
          quantity: '',
          category: '',
        });
      }

      setIsSubmitting(false);
    };

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="Product name"
                value={formData.productName}
                onChange={(value) => setFormData(prev => ({ ...prev, productName: value }))}
                error={errors.productName}
                id="productName"
                placeholder="Enter product name"
                required
              />

              <TextField
                label="SKU"
                value={formData.sku}
                onChange={(value) => setFormData(prev => ({ ...prev, sku: value }))}
                error={errors.sku}
                id="sku"
                placeholder="Enter SKU (try 'DUPLICATE' to see error)"
                helpText="Stock Keeping Unit - must be unique"
                required
              />

              <TextField
                label="Quantity"
                type="number"
                value={formData.quantity}
                onChange={(value) => setFormData(prev => ({ ...prev, quantity: value }))}
                error={errors.quantity}
                id="quantity"
                placeholder="0"
                min={1}
                required
              />

              <Select
                label="Category"
                options={[
                  { label: 'Select category', value: '' },
                  { label: 'Electronics', value: 'electronics' },
                  { label: 'Clothing', value: 'clothing' },
                  { label: 'Home & Garden', value: 'home-garden' },
                  { label: 'Sports', value: 'sports' },
                ]}
                value={formData.category}
                onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                error={errors.category}
                id="category"
              />

              {submitError && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#FFF4F4',
                  border: '1px solid #E03131',
                  borderRadius: '8px',
                  color: '#C92A2A',
                  fontSize: '14px'
                }}>
                  <strong>Error:</strong> {submitError}
                </div>
              )}

              <Button
                submit
                primary
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating product...' : 'Create product'}
              </Button>
            </FormLayout>
          </form>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'form-submission'),
  },
};

export const RealTimeValidation: Story = {
  render: () => {
    const [username, setUsername] = React.useState('');
    const [error, setError] = React.useState('');
    const [isChecking, setIsChecking] = React.useState(false);
    const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);

    // Debounced validation
    React.useEffect(() => {
      if (!username) {
        setError('');
        setIsAvailable(null);
        return;
      }

      setIsChecking(true);
      const timer = setTimeout(() => {
        // Simulate API call to check username availability
        const checkUsername = async () => {
          await new Promise(resolve => setTimeout(resolve, 500));

          const unavailableUsernames = ['admin', 'user', 'test', 'demo', 'shopify'];
          if (unavailableUsernames.includes(username.toLowerCase())) {
            setError('This username is already taken');
            setIsAvailable(false);
          } else if (username.length < 3) {
            setError('Username must be at least 3 characters');
            setIsAvailable(false);
          } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError('Username can only contain letters, numbers, and underscores');
            setIsAvailable(false);
          } else {
            setError('');
            setIsAvailable(true);
          }
          setIsChecking(false);
        };

        checkUsername();
      }, 600);

      return () => clearTimeout(timer);
    }, [username]);

    return (
      <div style={{ width: '400px' }}>
        <LegacyCard sectioned>
          <FormLayout>
            <TextField
              label="Username"
              value={username}
              onChange={setUsername}
              error={error}
              id="username"
              placeholder="Enter username"
              suffix={isChecking ? '⏳' : isAvailable === true ? '✓' : isAvailable === false ? '✗' : ''}
              helpText="Try 'admin', 'user', or 'test' to see error states"
              autoComplete="off"
            />

            {isAvailable === true && (
              <div style={{
                padding: '12px',
                backgroundColor: '#F3FAF3',
                border: '1px solid #40C057',
                borderRadius: '8px',
                color: '#2F9E44',
                fontSize: '14px'
              }}>
                ✓ Username is available
              </div>
            )}
          </FormLayout>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'realtime-validation'),
  },
};

export const CustomFieldValidation: Story = {
  render: () => {
    const [url, setUrl] = React.useState('');
    const [domain, setDomain] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateUrl = (value: string) => {
      if (!value) {
        setErrors(prev => ({ ...prev, url: 'Website URL is required' }));
        return;
      }

      try {
        const urlObj = new URL(value);
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          setErrors(prev => ({ ...prev, url: 'URL must start with http:// or https://' }));
        } else {
          setErrors(prev => ({ ...prev, url: '' }));
        }
      } catch {
        setErrors(prev => ({ ...prev, url: 'Please enter a valid URL (e.g., https://example.com)' }));
      }
    };

    const validateDomain = (value: string) => {
      if (!value) {
        setErrors(prev => ({ ...prev, domain: 'Domain name is required' }));
        return;
      }

      // Simple domain validation
      const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
      if (!domainRegex.test(value)) {
        setErrors(prev => ({ ...prev, domain: 'Please enter a valid domain (e.g., example.com)' }));
      } else if (value.startsWith('http://') || value.startsWith('https://')) {
        setErrors(prev => ({ ...prev, domain: 'Enter domain only, without http:// or https://' }));
      } else {
        setErrors(prev => ({ ...prev, domain: '' }));
      }
    };

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <FormLayout>
            <TextField
              label="Website URL"
              type="url"
              value={url}
              onChange={(value) => {
                setUrl(value);
                if (errors.url) setErrors(prev => ({ ...prev, url: '' }));
              }}
              onBlur={() => validateUrl(url)}
              error={errors.url}
              id="websiteUrl"
              placeholder="https://example.com"
              helpText="Full URL including protocol"
            />

            <TextField
              label="Custom domain"
              value={domain}
              onChange={(value) => {
                setDomain(value);
                if (errors.domain) setErrors(prev => ({ ...prev, domain: '' }));
              }}
              onBlur={() => validateDomain(domain)}
              error={errors.domain}
              id="customDomain"
              placeholder="shop.example.com"
              helpText="Domain name without http:// or https://"
            />

            <Button
              primary
              disabled={!!errors.url || !!errors.domain || !url || !domain}
            >
              Save settings
            </Button>
          </FormLayout>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'custom-validation'),
  },
};

export const ConditionalValidation: Story = {
  render: () => {
    const [shippingMethod, setShippingMethod] = React.useState('standard');
    const [trackingNumber, setTrackingNumber] = React.useState('');
    const [deliveryDate, setDeliveryDate] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateTracking = () => {
      if (shippingMethod === 'express' && !trackingNumber) {
        setErrors(prev => ({ ...prev, trackingNumber: 'Tracking number is required for express shipping' }));
      } else if (trackingNumber && trackingNumber.length < 10) {
        setErrors(prev => ({ ...prev, trackingNumber: 'Tracking number must be at least 10 characters' }));
      } else {
        setErrors(prev => ({ ...prev, trackingNumber: '' }));
      }
    };

    const validateDeliveryDate = () => {
      if (shippingMethod === 'scheduled' && !deliveryDate) {
        setErrors(prev => ({ ...prev, deliveryDate: 'Delivery date is required for scheduled shipping' }));
      } else {
        setErrors(prev => ({ ...prev, deliveryDate: '' }));
      }
    };

    React.useEffect(() => {
      validateTracking();
      validateDeliveryDate();
    }, [shippingMethod]);

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <FormLayout>
            <Select
              label="Shipping method"
              options={[
                { label: 'Standard (5-7 days)', value: 'standard' },
                { label: 'Express (2-3 days)', value: 'express' },
                { label: 'Scheduled delivery', value: 'scheduled' },
              ]}
              value={shippingMethod}
              onChange={(value) => {
                setShippingMethod(value);
                setErrors({});
              }}
            />

            {shippingMethod === 'express' && (
              <TextField
                label="Tracking number"
                value={trackingNumber}
                onChange={(value) => {
                  setTrackingNumber(value);
                  if (errors.trackingNumber) setErrors(prev => ({ ...prev, trackingNumber: '' }));
                }}
                onBlur={validateTracking}
                error={errors.trackingNumber}
                id="trackingNumber"
                placeholder="Enter tracking number"
                required
              />
            )}

            {shippingMethod === 'scheduled' && (
              <TextField
                label="Preferred delivery date"
                type="date"
                value={deliveryDate}
                onChange={(value) => {
                  setDeliveryDate(value);
                  if (errors.deliveryDate) setErrors(prev => ({ ...prev, deliveryDate: '' }));
                }}
                onBlur={validateDeliveryDate}
                error={errors.deliveryDate}
                id="deliveryDate"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            )}

            <Button primary>Confirm shipping</Button>
          </FormLayout>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('inlineerror', 'conditional-validation'),
  },
};
