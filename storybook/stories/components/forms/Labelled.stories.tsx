import type { Meta, StoryObj } from '@storybook/react';
import { TextField, Select, Checkbox, BlockStack, InlineStack, Text } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

/**
 * Note: The Labelled component is primarily used internally by Polaris form components.
 * This story demonstrates labelling patterns and accessibility best practices.
 * Most developers will use form components (TextField, Select, etc.) which include
 * built-in labelling via their `label`, `helpText`, `error`, and `requiredIndicator` props.
 */

const meta = {
  title: 'Components/Forms/Labelled',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The Labelled component is a wrapper that adds a label, optional action button, help text, and error messaging to form controls.

**Key Features:**
- Associates labels with form controls for accessibility
- Supports required field indicators
- Provides help text and error states
- Includes optional action buttons (e.g., "Learn more")
- Used internally by all Polaris form components

**Accessibility:**
- Proper label-input association via \`htmlFor\` and \`id\`
- Support for hidden labels (still accessible to screen readers)
- Error messages announced to screen readers
- Help text linked via \`aria-describedby\`
- Required field indication for assistive technologies

**When to use:**
- Built into TextField, Select, Checkbox, and other form components
- Custom form controls that need consistent labelling
- When you need label actions (help links, tooltips)

**Best Practices:**
- Always provide meaningful label text
- Use help text for additional context
- Mark required fields clearly
- Provide specific error messages
- Don't hide labels unless necessary for UX`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicLabel: Story = {
  render: () => (
    <div style={{ minWidth: '300px' }}>
      <TextField
        label="Email address"
        type="email"
        placeholder="john.doe@example.com"
        autoComplete="email"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The simplest form of labelling. Every form field should have a visible label that describes its purpose.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'default'),
  },
};

export const RequiredField: Story = {
  render: () => (
    <BlockStack gap="400" maxWidth="400px">
      <TextField
        label="Company name"
        placeholder="Enter your company name"
        required
        helpText="This field is required to create your account"
      />

      <TextField
        label="Business email"
        type="email"
        placeholder="admin@company.com"
        required
      />

      <Select
        label="Industry"
        options={[
          { label: 'Select an industry', value: '' },
          { label: 'Technology', value: 'tech' },
          { label: 'Retail', value: 'retail' },
          { label: 'Manufacturing', value: 'manufacturing' },
          { label: 'Healthcare', value: 'healthcare' },
        ]}
        required
      />
    </BlockStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Required fields are marked with a visual indicator (asterisk). The `required` prop adds both visual and semantic indication for assistive technologies.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'default'),
  },
};

export const WithHelpText: Story = {
  render: () => (
    <BlockStack gap="400" maxWidth="400px">
      <TextField
        label="Store URL"
        type="url"
        placeholder="https://yourstore.com"
        helpText="This is the public URL where customers will access your store"
        prefix="https://"
      />

      <TextField
        label="Phone number"
        type="tel"
        placeholder="(555) 123-4567"
        helpText="Include country code for international numbers"
      />

      <TextField
        label="Tax ID"
        placeholder="12-3456789"
        helpText="Your federal tax identification number (EIN)"
      />
    </BlockStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Help text provides additional context and instructions. It appears below the input field and is linked via `aria-describedby` for screen readers.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'with-help-text'),
  },
};

export const WithError: Story = {
  render: () => {
    const [email, setEmail] = React.useState('invalid-email');
    const [password, setPassword] = React.useState('123');
    const [agreed, setAgreed] = React.useState(false);

    const [errors, setErrors] = React.useState({
      email: 'Please enter a valid email address',
      password: 'Password must be at least 8 characters',
      agreed: 'You must agree to the terms to continue',
    });

    return (
      <BlockStack gap="400" maxWidth="400px">
        <TextField
          label="Email address"
          type="email"
          value={email}
          onChange={(value) => {
            setEmail(value);
            if (errors.email && value.includes('@')) {
              setErrors(prev => ({ ...prev, email: '' }));
            }
          }}
          error={errors.email}
          required
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(value) => {
            setPassword(value);
            if (errors.password && value.length >= 8) {
              setErrors(prev => ({ ...prev, password: '' }));
            }
          }}
          error={errors.password}
          required
          helpText="Must be at least 8 characters"
        />

        <Checkbox
          label="I agree to the terms and conditions"
          checked={agreed}
          onChange={(value) => {
            setAgreed(value);
            if (value) {
              setErrors(prev => ({ ...prev, agreed: '' }));
            }
          }}
          error={errors.agreed}
          required
        />

        <Text as="p" variant="bodySm" tone="subdued">
          Start typing to clear errors
        </Text>
      </BlockStack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Error states provide specific feedback about validation issues. Errors are announced to screen readers and associated with the field via `aria-describedby`.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'with-error'),
  },
};

export const WithAction: Story = {
  render: () => {
    const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

    return (
      <BlockStack gap="400" maxWidth="400px">
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label htmlFor="api-key" style={{ fontWeight: 600, fontSize: '14px' }}>
              API Key
            </label>
            <button
              type="button"
              onClick={() => setShowTooltip(showTooltip === 'api' ? null : 'api')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2c6ecb',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline',
              }}
            >
              What's this?
            </button>
          </div>
          <input
            id="api-key"
            type="text"
            placeholder="Enter your API key"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #c4cdd5',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
          {showTooltip === 'api' && (
            <Text as="p" variant="bodySm" tone="subdued">
              Your API key can be found in your account settings under "Developers"
            </Text>
          )}
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <label htmlFor="webhook-url" style={{ fontWeight: 600, fontSize: '14px' }}>
              Webhook URL
            </label>
            <button
              type="button"
              onClick={() => window.open('https://docs.example.com/webhooks', '_blank')}
              style={{
                background: 'none',
                border: 'none',
                color: '#2c6ecb',
                cursor: 'pointer',
                fontSize: '14px',
                textDecoration: 'underline',
              }}
            >
              Learn more
            </button>
          </div>
          <input
            id="webhook-url"
            type="url"
            placeholder="https://yourapp.com/webhook"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #c4cdd5',
              borderRadius: '4px',
              fontSize: '14px',
            }}
          />
        </div>

        <TextField
          label="Custom domain"
          type="url"
          placeholder="shop.example.com"
          helpText="Configure your custom domain in DNS settings"
        />
      </BlockStack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Label actions provide additional help or links to documentation. Common patterns include "What\'s this?", "Learn more", and "Reset".',
      },
    },
    codeVariants: getCodeVariants('textfield', 'with-help-text'),
  },
};

export const HiddenLabel: Story = {
  render: () => (
    <BlockStack gap="400" maxWidth="400px">
      <Text as="h3" variant="headingMd">Search our products</Text>

      <TextField
        label="Search"
        labelHidden
        type="search"
        placeholder="Search products, orders, customers..."
        autoComplete="off"
      />

      <Text as="p" variant="bodySm" tone="subdued">
        The label is visually hidden but still accessible to screen readers, providing context for assistive technologies while maintaining a clean visual design.
      </Text>
    </BlockStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Hidden labels are visually hidden but remain accessible to screen readers. Use when the field\'s purpose is obvious from context, but still need semantic labelling for accessibility.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'default'),
  },
};

export const MultipleFieldTypes: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      role: '',
      notifications: false,
      terms: false,
    });

    return (
      <BlockStack gap="400" maxWidth="400px">
        <Text as="h3" variant="headingMd">User Registration</Text>

        <TextField
          label="Full name"
          value={formData.name}
          onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
          placeholder="John Doe"
          required
          autoComplete="name"
        />

        <TextField
          label="Email address"
          type="email"
          value={formData.email}
          onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
          placeholder="john.doe@example.com"
          required
          autoComplete="email"
          helpText="We'll send a confirmation email to this address"
        />

        <Select
          label="Role"
          options={[
            { label: 'Select a role', value: '' },
            { label: 'Administrator', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'User', value: 'user' },
          ]}
          value={formData.role}
          onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
          required
        />

        <Checkbox
          label="Send me email notifications"
          checked={formData.notifications}
          onChange={(value) => setFormData(prev => ({ ...prev, notifications: value }))}
          helpText="You can change this later in settings"
        />

        <Checkbox
          label="I agree to the terms and conditions"
          checked={formData.terms}
          onChange={(value) => setFormData(prev => ({ ...prev, terms: value }))}
          required
        />
      </BlockStack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Proper labelling across different form field types ensures consistency and accessibility throughout your forms.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'multiline'),
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      username: '',
      password: '',
      rememberMe: false,
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});

    const validateUsername = (value: string) => {
      if (!value) return 'Username is required';
      if (value.length < 3) return 'Username must be at least 3 characters';
      if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
      return '';
    };

    const validatePassword = (value: string) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      return '';
    };

    const handleBlur = (field: string, value: string) => {
      setTouched(prev => ({ ...prev, [field]: true }));

      let error = '';
      if (field === 'username') error = validateUsername(value);
      if (field === 'password') error = validatePassword(value);

      setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const usernameError = validateUsername(formData.username);
      const passwordError = validatePassword(formData.password);

      if (usernameError || passwordError) {
        setErrors({
          username: usernameError,
          password: passwordError,
        });
        setTouched({ username: true, password: true });
      } else {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <BlockStack gap="400" maxWidth="400px">
          <Text as="h3" variant="headingMd">
            Accessibility Features Demo
          </Text>

          <TextField
            label="Username"
            value={formData.username}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, username: value }));
              if (touched.username) {
                const error = validateUsername(value);
                setErrors(prev => ({ ...prev, username: error }));
              }
            }}
            onBlur={() => handleBlur('username', formData.username)}
            error={touched.username ? errors.username : undefined}
            placeholder="Enter username"
            required
            helpText="3+ characters, letters, numbers, and underscores only"
            autoComplete="username"
          />

          <TextField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, password: value }));
              if (touched.password) {
                const error = validatePassword(value);
                setErrors(prev => ({ ...prev, password: error }));
              }
            }}
            onBlur={() => handleBlur('password', formData.password)}
            error={touched.password ? errors.password : undefined}
            placeholder="Enter password"
            required
            helpText="Minimum 8 characters required"
            autoComplete="current-password"
          />

          <Checkbox
            label="Remember me for 30 days"
            checked={formData.rememberMe}
            onChange={(value) => setFormData(prev => ({ ...prev, rememberMe: value }))}
            helpText="Keep me signed in on this device"
          />

          <InlineStack gap="200">
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#008060',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Sign In
            </button>
          </InlineStack>

          <BlockStack gap="200">
            <Text as="p" variant="headingSm">Accessibility Features:</Text>
            <Text as="ul" variant="bodySm">
              <li>✓ Proper label-input association via htmlFor/id</li>
              <li>✓ Required fields clearly indicated</li>
              <li>✓ Error messages linked via aria-describedby</li>
              <li>✓ Help text provides additional context</li>
              <li>✓ Validation feedback on blur and submit</li>
              <li>✓ Keyboard navigation fully supported</li>
              <li>✓ Screen reader announcements for state changes</li>
            </Text>
          </BlockStack>
        </BlockStack>
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `Complete accessibility demonstration showing:

- **Label Association**: Every input has a properly associated label
- **Required Indicators**: Visual and semantic markers for required fields
- **Error Messaging**: Clear, specific error messages linked to inputs
- **Help Text**: Contextual information via aria-describedby
- **Keyboard Support**: Full keyboard navigation and interaction
- **Screen Reader Support**: Proper ARIA attributes and announcements
- **Validation States**: Real-time feedback with error recovery`,
      },
    },
    codeVariants: getCodeVariants('textfield', 'with-error'),
  },
};

export const LabelBestPractices: Story = {
  render: () => (
    <BlockStack gap="600" maxWidth="600px">
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd" tone="success">
          ✓ Good Examples
        </Text>

        <TextField
          label="Email address"
          type="email"
          placeholder="john.doe@example.com"
          helpText="We'll never share your email with third parties"
          required
        />

        <TextField
          label="Phone number"
          type="tel"
          placeholder="(555) 123-4567"
          helpText="Include area code"
        />

        <Select
          label="Country"
          options={[
            { label: 'Select your country', value: '' },
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
          ]}
          required
        />
      </BlockStack>

      <BlockStack gap="400">
        <Text as="h3" variant="headingMd" tone="critical">
          ✗ Avoid These Patterns
        </Text>

        <div>
          <input
            type="text"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #c4cdd5',
              borderRadius: '4px',
            }}
          />
          <Text as="p" variant="bodySm" tone="critical">
            No label - inaccessible to screen readers
          </Text>
        </div>

        <div>
          <label htmlFor="bad-example-2" style={{ fontSize: '12px', color: '#999' }}>
            email
          </label>
          <input
            id="bad-example-2"
            type="email"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #c4cdd5',
              borderRadius: '4px',
            }}
          />
          <Text as="p" variant="bodySm" tone="critical">
            Vague label, no capitalization, no help text for required field
          </Text>
        </div>

        <div>
          <label htmlFor="bad-example-3">Enter the email address that you want to use for receiving notifications from our system</label>
          <input
            id="bad-example-3"
            type="email"
            style={{
              width: '100%',
              padding: '8px 12px',
              border: '1px solid #c4cdd5',
              borderRadius: '4px',
            }}
          />
          <Text as="p" variant="bodySm" tone="critical">
            Label is too verbose - use help text for additional context
          </Text>
        </div>
      </BlockStack>

      <BlockStack gap="200">
        <Text as="h4" variant="headingSm">Best Practices Summary:</Text>
        <Text as="ul" variant="bodySm">
          <li>Always provide clear, concise labels</li>
          <li>Use help text for additional context, not labels</li>
          <li>Mark required fields consistently</li>
          <li>Provide specific error messages</li>
          <li>Ensure labels are associated with inputs</li>
          <li>Don't rely solely on placeholders</li>
          <li>Use consistent capitalization</li>
          <li>Consider internationalization</li>
        </Text>
      </BlockStack>
    </BlockStack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of good and bad labelling practices. Follow these guidelines to create accessible, user-friendly forms.',
      },
    },
    codeVariants: getCodeVariants('textfield', 'default'),
  },
};
