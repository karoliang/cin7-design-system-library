import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextField, Button, Badge, Text } from '@shopify/polaris';

// Vanilla JS Component Class
class VanillaTextField {
  private container: HTMLElement;
  private input: HTMLInputElement;
  private label: HTMLLabelElement;
  private errorDiv: HTMLDivElement;
  private value = '';
  private error = '';
  private onChange?: (value: string) => void;

  constructor(options: {
    label: string;
    placeholder?: string;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
  }) {
    this.container = document.createElement('div');
    this.container.style.cssText = 'margin-bottom: 16px;';

    this.label = document.createElement('label');
    this.label.textContent = options.label;
    this.label.style.cssText = 'display: block; margin-bottom: 4px; font-weight: 600; font-size: 14px;';

    this.input = document.createElement('input');
    this.input.type = options.type || 'text';
    this.input.placeholder = options.placeholder || '';
    this.input.value = options.value || '';
    this.input.style.cssText = `
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      font-size: 14px;
      transition: border-color 0.2s;
    `;

    this.errorDiv = document.createElement('div');
    this.errorDiv.style.cssText = 'color: #dc2626; font-size: 12px; margin-top: 4px; min-height: 16px;';

    this.onChange = options.onChange;
    this.value = options.value || '';

    this.input.addEventListener('input', (e) => {
      this.value = (e.target as HTMLInputElement).value;
      if (this.onChange) this.onChange(this.value);
    });

    this.input.addEventListener('focus', () => {
      this.input.style.borderColor = '#006fbb';
    });

    this.input.addEventListener('blur', () => {
      this.input.style.borderColor = '#d1d5db';
      this.validate();
    });

    this.container.appendChild(this.label);
    this.container.appendChild(this.input);
    this.container.appendChild(this.errorDiv);
  }

  private validate() {
    if (this.input.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (this.value && !emailRegex.test(this.value)) {
        this.setError('Please enter a valid email address');
        return false;
      }
    }
    if (this.input.type === 'tel') {
      const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
      if (this.value && !phoneRegex.test(this.value)) {
        this.setError('Please enter a valid phone number');
        return false;
      }
    }
    this.clearError();
    return true;
  }

  setError(message: string) {
    this.error = message;
    this.errorDiv.textContent = message;
    this.input.style.borderColor = '#dc2626';
  }

  clearError() {
    this.error = '';
    this.errorDiv.textContent = '';
    this.input.style.borderColor = '#d1d5db';
  }

  setValue(value: string) {
    this.value = value;
    this.input.value = value;
  }

  getValue() {
    return this.value;
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.container);
  }

  destroy() {
    this.container.remove();
  }
}

// Vanilla JS React Wrapper
const VanillaTextFieldWrapper: React.FC<{
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
}> = ({ label, type = 'text', placeholder, value = '', onChange, error }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textFieldRef = useRef<VanillaTextField | null>(null);

  useEffect(() => {
    if (containerRef.current && !textFieldRef.current) {
      textFieldRef.current = new VanillaTextField({
        label,
        type,
        placeholder,
        value,
        onChange,
      });
      textFieldRef.current.mount(containerRef.current);
    }

    return () => {
      if (textFieldRef.current) {
        textFieldRef.current.destroy();
        textFieldRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (textFieldRef.current && value !== textFieldRef.current.getValue()) {
      textFieldRef.current.setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (textFieldRef.current) {
      if (error) {
        textFieldRef.current.setError(error);
      } else {
        textFieldRef.current.clearError();
      }
    }
  }, [error]);

  return <div ref={containerRef} />;
};

// ExtJS Mock Component
const ExtJSTextField: React.FC<{
  fieldLabel: string;
  name: string;
  allowBlank?: boolean;
  vtype?: 'email' | 'url' | 'alpha';
  value?: string;
  onChange?: (value: string) => void;
}> = ({ fieldLabel, name, allowBlank = true, vtype, value = '', onChange }) => {
  const [mounted, setMounted] = useState(false);
  const [fieldValue, setFieldValue] = useState(value);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Simulate ExtJS component initialization
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFieldValue(value);
  }, [value]);

  const validateExtJS = useCallback((val: string) => {
    const newErrors: string[] = [];

    if (!allowBlank && !val.trim()) {
      newErrors.push('This field is required');
    }

    if (vtype === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        newErrors.push('Must be a valid email address');
      }
    }

    if (vtype === 'alpha' && val) {
      const alphaRegex = /^[a-zA-Z\s]+$/;
      if (!alphaRegex.test(val)) {
        newErrors.push('Only letters and spaces allowed');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [allowBlank, vtype]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setFieldValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div style={{
      marginBottom: '16px',
      opacity: mounted ? 1 : 0.7,
      transition: 'opacity 0.3s'
    }}>
      <label style={{
        display: 'block',
        marginBottom: '4px',
        fontWeight: 'bold',
        fontSize: '13px',
        fontFamily: 'Arial, sans-serif'
      }}>
        {fieldLabel} {!allowBlank && <span style={{ color: 'red' }}>*</span>}
      </label>
      <input
        type="text"
        name={name}
        value={fieldValue}
        onChange={handleChange}
        onBlur={() => validateExtJS(fieldValue)}
        placeholder={`Enter ${fieldLabel.toLowerCase()}`}
        style={{
          width: '100%',
          padding: '6px 8px',
          border: errors.length > 0 ? '1px solid #dc2626' : '1px solid #b4b4b4',
          borderRadius: '3px',
          fontSize: '13px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: mounted ? 'white' : '#f5f5f5',
          boxSizing: 'border-box'
        }}
        disabled={!mounted}
      />
      {errors.length > 0 && (
        <div style={{
          color: '#dc2626',
          fontSize: '11px',
          marginTop: '2px',
          fontFamily: 'Arial, sans-serif'
        }}>
          {errors.join(', ')}
        </div>
      )}
      {!mounted && (
        <div style={{ fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
          Loading ExtJS field...
        </div>
      )}
    </div>
  );
};

// TypeScript Pattern Component
interface TypeSafeTextFieldProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  validator?: (value: string) => string | null;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

interface ValidationRule {
  pattern: RegExp;
  message: string;
}

const fieldValidators: Record<string, ValidationRule> = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Invalid email format'
  },
  phone: {
    pattern: /^\+?[\d\s\-\(\)]+$/,
    message: 'Invalid phone number format'
  },
  url: {
    pattern: /^https?:\/\/.+/,
    message: 'URL must start with http:// or https://'
  }
};

const TypeSafeTextField: React.FC<TypeSafeTextFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  validator,
  required = false,
  placeholder,
  disabled = false
}) => {
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback((val: string): string | null => {
    if (required && !val.trim()) {
      return `${label} is required`;
    }

    if (val && fieldValidators[type]) {
      const rule = fieldValidators[type];
      if (!rule.pattern.test(val)) {
        return rule.message;
      }
    }

    if (validator) {
      return validator(val);
    }

    return null;
  }, [label, type, required, validator]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    if (touched) {
      const validationError = validate(newValue);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validate(value);
    setError(validationError);
  };

  const isValid = touched && !error;

  return (
    <div style={{ marginBottom: '16px' }}>
      <label
        htmlFor={id}
        style={{
          display: 'block',
          marginBottom: '4px',
          fontWeight: '600',
          fontSize: '14px',
          color: error ? '#dc2626' : '#202223'
        }}
      >
        {label}
        {required && <span style={{ color: '#dc2626', marginLeft: '2px' }}>*</span>}
        {isValid && <span style={{ color: '#059669', marginLeft: '4px' }}>✓</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: `2px solid ${error ? '#dc2626' : isValid ? '#059669' : '#d1d5db'}`,
          borderRadius: '6px',
          fontSize: '14px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: disabled ? '#f9fafb' : 'white',
          outline: 'none',
          transition: 'border-color 0.2s',
          boxSizing: 'border-box'
        }}
      />
      {error && (
        <div style={{
          color: '#dc2626',
          fontSize: '12px',
          marginTop: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>⚠</span> {error}
        </div>
      )}
      {isValid && (
        <div style={{
          color: '#059669',
          fontSize: '12px',
          marginTop: '4px'
        }}>
          ✓ Valid {label.toLowerCase()}
        </div>
      )}
    </div>
  );
};

const meta = {
  title: 'Polaris/Multi-Language/TextField',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive multi-language implementation of TextField components showing React, Vanilla JS, ExtJS, and TypeScript patterns. Demonstrates form validation, state management, and business logic integration across different layers of the Cin7 DSL framework.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactImplementation: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      customerName: '',
      email: '',
      phone: '',
      orderNotes: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));

      // Clear error on change
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const validateReact = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.customerName.trim()) {
        newErrors.customerName = 'Customer name is required';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }

      if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
        newErrors.phone = 'Invalid phone format';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>React (Polaris) Implementation</h3>
        <p>Using Shopify Polaris TextField with React state management</p>

        <TextField
          label="Customer Name"
          value={formData.customerName}
          onChange={(value) => handleChange('customerName', value)}
          placeholder="Enter customer name"
          error={errors.customerName}
          required
        />

        <TextField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          placeholder="customer@example.com"
          error={errors.email}
          required
        />

        <TextField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleChange('phone', value)}
          placeholder="(555) 123-4567"
          error={errors.phone}
        />

        <TextField
          label="Order Notes"
          multiline={3}
          value={formData.orderNotes}
          onChange={(value) => handleChange('orderNotes', value)}
          placeholder="Any special instructions..."
        />

        <div style={{ marginTop: '16px' }}>
          <Button onClick={validateReact}>Validate Form</Button>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
          <Text variant="bodySm" as="h4">Form Data:</Text>
          <pre style={{ fontSize: '12px', margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const VanillaJSImplementation: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      phone: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleVanillaChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const validateVanilla = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.username.trim()) {
        newErrors.username = 'Username cannot be empty';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>Vanilla JS Implementation</h3>
        <p>Pure JavaScript class-based component with DOM manipulation</p>

        <VanillaTextFieldWrapper
          label="Username"
          value={formData.username}
          onChange={(value) => handleVanillaChange('username', value)}
          placeholder="Enter username"
          error={errors.username}
        />

        <VanillaTextFieldWrapper
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleVanillaChange('email', value)}
          placeholder="user@example.com"
          error={errors.email}
        />

        <VanillaTextFieldWrapper
          label="Phone"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleVanillaChange('phone', value)}
          placeholder="(555) 123-4567"
          error={errors.phone}
        />

        <div style={{ marginTop: '16px' }}>
          <button
            onClick={validateVanilla}
            style={{
              padding: '8px 16px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Validate Vanilla JS Form
          </button>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '6px' }}>
          <Text variant="bodySm" as="h4">Vanilla JS State:</Text>
          <pre style={{ fontSize: '12px', margin: '8px 0 0 0', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const ExtJSImplementation: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      customerName: '',
      email: '',
      phone: '',
      company: ''
    });

    const handleExtJSChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>ExtJS Implementation</h3>
        <p>Enterprise-grade form fields with built-in validation</p>

        <ExtJSTextField
          fieldLabel="Customer Name"
          name="customerName"
          allowBlank={false}
          vtype="alpha"
          value={formData.customerName}
          onChange={(value) => handleExtJSChange('customerName', value)}
        />

        <ExtJSTextField
          fieldLabel="Email Address"
          name="email"
          allowBlank={false}
          vtype="email"
          value={formData.email}
          onChange={(value) => handleExtJSChange('email', value)}
        />

        <ExtJSTextField
          fieldLabel="Phone Number"
          name="phone"
          allowBlank={true}
          value={formData.phone}
          onChange={(value) => handleExtJSChange('phone', value)}
        />

        <ExtJSTextField
          fieldLabel="Company"
          name="company"
          allowBlank={true}
          value={formData.company}
          onChange={(value) => handleExtJSChange('company', value)}
        />

        <div style={{ marginTop: '16px' }}>
          <Button
            onClick={() => console.log('ExtJS form submitted:', formData)}
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            Submit ExtJS Form
          </Button>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <Text variant="bodySm" as="h4">ExtJS Form State:</Text>
          <pre style={{ fontSize: '12px', margin: '8px 0 0 0', whiteSpace: 'pre-wrap', fontFamily: 'Arial, sans-serif' }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

export const TypeScriptImplementation: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      website: ''
    });

    const [submitAttempted, setSubmitAttempted] = useState(false);

    const validateFullName = (name: string): string | null => {
      if (!name.trim()) return 'Full name is required';
      if (name.length < 2) return 'Name must be at least 2 characters';
      if (!/^[a-zA-Z\s\-']+$/.test(name)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      return null;
    };

    const validateEmail = (email: string): string | null => {
      if (!email.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
      if (email.length > 254) return 'Email address is too long';
      return null;
    };

    const handleTypeSafeChange = (field: keyof typeof formData, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTypeSafeSubmit = () => {
      setSubmitAttempted(true);

      // Validation happens automatically in the TypeSafeTextField components
      const hasErrors =
        validateFullName(formData.fullName) ||
        validateEmail(formData.email) ||
        (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) ||
        (formData.website && !/^https?:\/\/.+/.test(formData.website));

      if (!hasErrors) {
        alert('TypeScript form submitted successfully!');
        console.log('TypeScript form data:', formData);
      }
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <h3>TypeScript Implementation</h3>
        <p>Type-safe form with comprehensive validation and business rules</p>

        <TypeSafeTextField
          id="ts-fullname"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={(value) => handleTypeSafeChange('fullName', value)}
          validator={validateFullName}
          required
          placeholder="John Doe"
        />

        <TypeSafeTextField
          id="ts-email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleTypeSafeChange('email', value)}
          validator={validateEmail}
          required
          placeholder="john.doe@example.com"
        />

        <TypeSafeTextField
          id="ts-phone"
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => handleTypeSafeChange('phone', value)}
          placeholder="+1 (555) 123-4567"
        />

        <TypeSafeTextField
          id="ts-website"
          label="Website"
          type="url"
          value={formData.website}
          onChange={(value) => handleTypeSafeChange('website', value)}
          placeholder="https://example.com"
        />

        <div style={{ marginTop: '20px' }}>
          <Button primary onClick={handleTypeSafeSubmit}>
            Submit Type-Safe Form
          </Button>
        </div>

        {submitAttempted && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '6px'
          }}>
            <Text variant="bodySm" as="h4">TypeScript Validation Status:</Text>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '16px', fontSize: '12px' }}>
              <li style={{ color: validateFullName(formData.fullName) ? '#dc2626' : '#059669' }}>
                Full Name: {validateFullName(formData.fullName) || '✓ Valid'}
              </li>
              <li style={{ color: validateEmail(formData.email) ? '#dc2626' : '#059669' }}>
                Email: {validateEmail(formData.email) || '✓ Valid'}
              </li>
              <li style={{ color: formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone) ? '#dc2626' : '#059669' }}>
                Phone: {formData.phone ? (/^\+?[\d\s\-\(\)]+$/.test(formData.phone) ? '✓ Valid' : 'Invalid format') : 'Optional'}
              </li>
              <li style={{ color: formData.website && !/^https?:\/\/.+/.test(formData.website) ? '#dc2626' : '#059669' }}>
                Website: {formData.website ? (/^https?:\/\/.+/.test(formData.website) ? '✓ Valid' : 'Must start with http:// or https://') : 'Optional'}
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  },
};

export const BusinessScenarioCustomerForm: Story = {
  render: () => {
    const [activeLayer, setActiveLayer] = useState<'react' | 'vanilla' | 'extjs' | 'typescript'>('react');

    const [customerData, setCustomerData] = useState({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Corporation',
      address: '123 Business St, Suite 100'
    });

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3>Business Scenario: Customer Registration Form</h3>
        <p>A complete customer registration form demonstrating different implementation approaches</p>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button
              variant={activeLayer === 'react' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('react')}
            >
              React
            </Button>
            <Button
              variant={activeLayer === 'vanilla' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('vanilla')}
            >
              Vanilla JS
            </Button>
            <Button
              variant={activeLayer === 'extjs' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('extjs')}
            >
              ExtJS
            </Button>
            <Button
              variant={activeLayer === 'typescript' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('typescript')}
            >
              TypeScript
            </Button>
          </div>

          <div style={{
            padding: '8px 12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            <strong>Active Layer: </strong>
            <Badge status={activeLayer === 'react' ? 'success' : 'info'}>
              {activeLayer.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div style={{
          padding: '20px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          {activeLayer === 'react' && <ReactImplementation />}
          {activeLayer === 'vanilla' && <VanillaJSImplementation />}
          {activeLayer === 'extjs' && <ExtJSImplementation />}
          {activeLayer === 'typescript' && <TypeScriptImplementation />}
        </div>

        <div style={{ marginTop: '24px' }}>
          <h4>Use Case Recommendations:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#1d4ed8' }}>React</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Best for modern SPAs, component libraries, and rapid development
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#15803d' }}>Vanilla JS</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Lightweight, no dependencies, ideal for simple forms and performance
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#faf5ff', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#7c3aed' }}>ExtJS</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Enterprise applications, complex forms, data-rich interfaces
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>TypeScript</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Type safety, business logic, validation, maintainable codebases
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};