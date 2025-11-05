import type { Meta, StoryObj } from '@storybook/react';
import { Label, Card, TextField, Checkbox, Select, Button, InlineStack, BlockStack, Text, Icon } from '@shopify/polaris';
import { InformationMinor, AlertMinor } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Label provides descriptive text for form controls and other interface elements. It improves accessibility and user experience by clearly identifying what each control does.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Label text content',
    },
    id: {
      control: 'text',
      description: 'HTML id attribute linking label to form control',
    },
    required: {
      control: 'boolean',
      description: 'Whether the associated field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the label should appear disabled',
    },
    hidden: {
      control: 'boolean',
      description: 'Whether the label should be visually hidden but accessible',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Product name',
  },
};

export const Required: Story = {
  args: {
    children: 'Email address',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled field',
    disabled: true,
  },
};

export const WithRequiredIndicator: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="400">
        <div>
          <Label id="required-field" required>
            Full name
          </Label>
          <TextField id="required-field" placeholder="Enter your full name" />
        </div>

        <div>
          <Label id="email-field" required>
            Email address
          </Label>
          <TextField id="email-field" type="email" placeholder="your@email.com" />
        </div>

        <div>
          <Label id="phone-field">
            Phone number (optional)
          </Label>
          <TextField id="phone-field" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
      </BlockStack>
    </div>
  ),
};

export const WithHelpText: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <BlockStack gap="100">
              <Label id="password-field" required>
                Password
              </Label>
              <Text variant="bodySm" as="p" tone="subdued">
                Must be at least 8 characters with numbers and letters
              </Text>
            </BlockStack>
            <TextField id="password-field" type="password" placeholder="Enter password" />
          </div>

          <div>
            <BlockStack gap="100">
              <Label id="discount-field">
                Discount code
              </Label>
              <Text variant="bodySm" as="p" tone="subdued">
                Enter a valid discount code to apply to your order
              </Text>
            </BlockStack>
            <TextField id="discount-field" placeholder="DISCOUNT2024" />
          </div>

          <div>
            <BlockStack gap="100">
              <Label id="url-field" required>
                Store URL
              </Label>
              <Text variant="bodySm" as="p" tone="subdued">
                This will be your store\'s unique address on our platform
              </Text>
            </BlockStack>
            <TextField id="url-field" placeholder="mystore.example.com" />
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const WithErrorState: Story = {
  render: () => {
    const [fieldErrors, setFieldErrors] = React.useState({
      email: true,
      password: false,
      phone: true,
    });

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <BlockStack gap="100">
              <InlineStack gap="200" align="center">
                <Label id="email-error" required>
                  Email address
                </Label>
                {fieldErrors.email && (
                  <InlineStack gap="100" align="center">
                    <Icon source={AlertMinor} tone="critical" size="small" />
                    <Text variant="bodySm" as="span" tone="critical">
                      Invalid email format
                    </Text>
                  </InlineStack>
                )}
              </InlineStack>
            </BlockStack>
            <TextField
              id="email-error"
              type="email"
              placeholder="your@email.com"
              error={fieldErrors.email ? 'Please enter a valid email address' : undefined}
            />
          </div>

          <div>
            <BlockStack gap="100">
              <InlineStack gap="200" align="center">
                <Label id="password-error" required>
                  Password
                </Label>
                {fieldErrors.password && (
                  <InlineStack gap="100" align="center">
                    <Icon source={AlertMinor} tone="critical" size="small" />
                    <Text variant="bodySm" as="span" tone="critical">
                      Password too weak
                    </Text>
                  </InlineStack>
                )}
              </InlineStack>
            </BlockStack>
            <TextField
              id="password-error"
              type="password"
              placeholder="Enter password"
              error={fieldErrors.password ? 'Password must be at least 8 characters' : undefined}
            />
          </div>

          <div>
            <BlockStack gap="100">
              <InlineStack gap="200" align="center">
                <Label id="phone-error">
                  Phone number
                </Label>
                {fieldErrors.phone && (
                  <InlineStack gap="100" align="center">
                    <Icon source={AlertMinor} tone="critical" size="small" />
                    <Text variant="bodySm" as="span" tone="critical">
                      Invalid format
                    </Text>
                  </InlineStack>
                )}
              </InlineStack>
            </BlockStack>
            <TextField
              id="phone-error"
              type="tel"
              placeholder="+1 (555) 123-4567"
              error={fieldErrors.phone ? 'Please enter a valid phone number' : undefined}
            />
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const FormLayoutExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      role: '',
    });

    const handleFieldChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 20px 0' }}>Contact Information</h3>
                <BlockStack gap="400">
                  <div>
                    <InlineStack gap="400" align="start">
                      <div style={{ flex: 1 }}>
                        <BlockStack gap="100">
                          <Label id="first-name" required>
                            First name
                          </Label>
                          <TextField
                            id="first-name"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleFieldChange('firstName')}
                          />
                        </BlockStack>
                      </div>
                      <div style={{ flex: 1 }}>
                        <BlockStack gap="100">
                          <Label id="last-name" required>
                            Last name
                          </Label>
                          <TextField
                            id="last-name"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleFieldChange('lastName')}
                          />
                        </BlockStack>
                      </div>
                    </InlineStack>
                  </div>

                  <div>
                    <BlockStack gap="100">
                      <Label id="email-form" required>
                        Email address
                      </Label>
                      <TextField
                        id="email-form"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleFieldChange('email')}
                      />
                    </BlockStack>
                  </div>

                  <div>
                    <BlockStack gap="100">
                      <Label id="phone-form">
                        Phone number
                      </Label>
                      <TextField
                        id="phone-form"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleFieldChange('phone')}
                      />
                    </BlockStack>
                  </div>

                  <div>
                    <BlockStack gap="100">
                      <Label id="company-form">
                        Company
                      </Label>
                      <TextField
                        id="company-form"
                        placeholder="Acme Corporation"
                        value={formData.company}
                        onChange={handleFieldChange('company')}
                      />
                    </BlockStack>
                  </div>

                  <div>
                    <BlockStack gap="100">
                      <Label id="role-form">
                        Role
                      </Label>
                      <Select
                        id="role-form"
                        placeholder="Select your role"
                        options={[
                          { label: 'Owner', value: 'owner' },
                          { label: 'Administrator', value: 'admin' },
                          { label: 'Manager', value: 'manager' },
                          { label: 'Developer', value: 'developer' },
                          { label: 'Designer', value: 'designer' },
                        ]}
                        value={formData.role}
                        onChange={handleFieldChange('role')}
                      />
                    </BlockStack>
                  </div>
                </BlockStack>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid #e1e3e5' }}>
                <InlineStack gap="200">
                  <Button variant="primary">Save</Button>
                  <Button variant="plain">Cancel</Button>
                </InlineStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithTooltips: Story = {
  render: () => {
    const [showTooltip, setShowTooltip] = React.useState<string | null>(null);

    const fieldTooltips = {
      currency: 'Select the primary currency for your store. This affects pricing display.',
      timezone: 'Choose your local timezone to sync store hours and reporting.',
      language: 'Default language for your store interface and communications.',
      tax: 'Configure tax collection based on your business location.',
    };

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 20px 0' }}>Store Settings</h3>
            <BlockStack gap="400">
              {Object.entries(fieldTooltips).map(([field, tooltip]) => (
                <div key={field}>
                  <BlockStack gap="100">
                    <InlineStack gap="200" align="center">
                      <Label id={field}>
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </Label>
                      <div style={{ position: 'relative' }}>
                        <Button
                          size="micro"
                          variant="plain"
                          icon={InformationMinor}
                          onMouseEnter={() => setShowTooltip(field)}
                          onMouseLeave={() => setShowTooltip(null)}
                        />
                        {showTooltip === field && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: '0',
                            marginTop: '4px',
                            padding: '8px 12px',
                            backgroundColor: '#333',
                            color: '#fff',
                            borderRadius: '4px',
                            fontSize: "var(--font-size-xs)",
                            whiteSpace: 'normal',
                            zIndex: 1000,
                            maxWidth: '200px'
                          }}>
                            {tooltip}
                          </div>
                        )}
                      </div>
                    </InlineStack>
                  </BlockStack>
                  <Select
                    id={field}
                    placeholder={`Select ${field}`}
                    options={[
                      { label: `Option 1 for ${field}`, value: '1' },
                      { label: `Option 2 for ${field}`, value: '2' },
                    ]}
                  />
                </div>
              ))}
            </BlockStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const CheckboxLabels: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = React.useState({
      newsletter: false,
      terms: false,
      marketing: false,
      updates: false,
    });

    const handleCheckChange = (key: string) => (checked: boolean) => {
      setCheckedItems(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 20px 0' }}>Communication Preferences</h3>
            <BlockStack gap="300">
              <div>
                <Checkbox
                  label="Send me product updates and news"
                  checked={checkedItems.newsletter}
                  onChange={handleCheckChange('newsletter')}
                />
              </div>

              <div>
                <Checkbox
                  label={
                    <BlockStack gap="100">
                      <Text as="span">I agree to the terms and conditions</Text>
                      <Text variant="bodySm" as="span" tone="subdued">
                        Required to create an account
                      </Text>
                    </BlockStack>
                  }
                  checked={checkedItems.terms}
                  onChange={handleCheckChange('terms')}
                  required
                />
              </div>

              <div>
                <Checkbox
                  label={
                    <BlockStack gap="100">
                      <Text as="span">Marketing communications</Text>
                      <Text variant="bodySm" as="span" tone="subdued">
                        Receive special offers and promotions
                      </Text>
                    </BlockStack>
                  }
                  checked={checkedItems.marketing}
                  onChange={handleCheckChange('marketing')}
                />
              </div>

              <div>
                <Checkbox
                  label={
                    <BlockStack gap="100">
                      <Text as="span">Security and account updates</Text>
                      <Text variant="bodySm" as="span" tone="subdued">
                        Important notifications about your account
                      </Text>
                    </BlockStack>
                  }
                  checked={checkedItems.updates}
                  onChange={handleCheckChange('updates')}
                />
              </div>
            </BlockStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const DynamicLabels: Story = {
  render: () => {
    const [fieldValue, setFieldValue] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const handleFieldChange = (value: string) => {
      setFieldValue(value);
      setIsValid(validateEmail(value));
    };

    const getLabelState = () => {
      if (isFocused) return 'focused';
      if (fieldValue && !isValid) return 'error';
      if (fieldValue && isValid) return 'success';
      return 'default';
    };

    const getLabelColor = () => {
      switch (getLabelState()) {
        case 'focused': return '#007ace';
        case 'error': return '#d82c0d';
        case 'success': return '#1a7f37';
        default: return '#202223';
      }
    };

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 20px 0' }}>Dynamic Label States</h3>
            <div>
              <BlockStack gap="100">
                <Label id="dynamic-email" required>
                  <Text as="span" style={{ color: getLabelColor() }}>
                    Email address
                  </Text>
                  {fieldValue && (
                    <Text variant="bodySm" as="span" tone={isValid ? 'success' : 'critical'}>
                      {' - '}
                      {isValid ? '✓ Valid' : '✗ Invalid'}
                    </Text>
                  )}
                </Label>
                <TextField
                  id="dynamic-email"
                  type="email"
                  placeholder="your@email.com"
                  value={fieldValue}
                  onChange={handleFieldChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  error={fieldValue && !isValid ? 'Please enter a valid email address' : undefined}
                />
              </BlockStack>
            </div>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <BlockStack gap="200">
              <Text as="p" fontWeight="600">Label State: {getLabelState()}</Text>
              <Text variant="bodySm" as="p">
                Field value: {fieldValue || '(empty)'}
              </Text>
              <Text variant="bodySm" as="p">
                Is valid: {isValid ? 'Yes' : 'No'}
              </Text>
              <Text variant="bodySm" as="p">
                Is focused: {isFocused ? 'Yes' : 'No'}
              </Text>
            </BlockStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
      businessName: '',
      businessType: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      city: '',
      postalCode: '',
    });

    const steps = [
      { id: 1, title: 'Business Information', fields: ['businessName', 'businessType'] },
      { id: 2, title: 'Contact Details', fields: ['contactName', 'contactEmail', 'contactPhone'] },
      { id: 3, title: 'Address Information', fields: ['address', 'city', 'postalCode'] },
    ];

    const currentStepData = steps.find(step => step.id === currentStep);

    const handleFieldChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const isStepComplete = () => {
      if (!currentStepData) return false;
      return currentStepData.fields.every(field => formData[field as keyof typeof formData].trim() !== '');
    };

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Store Registration</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                  {steps.map((step) => (
                    <div key={step.id} style={{
                      flex: 1,
                      height: '4px',
                      backgroundColor: step.id <= currentStep ? '#007ace' : '#e1e3e5',
                      borderRadius: '2px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        top: '-24px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: "var(--font-size-xs)",
                        color: step.id <= currentStep ? '#007ace' : '#666'
                      }}>
                        Step {step.id}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {currentStepData && (
                <div>
                  <h4 style={{ margin: '0 0 20px 0' }}>{currentStepData.title}</h4>
                  <BlockStack gap="400">
                    {currentStepData.fields.map((field) => (
                      <div key={field}>
                        <BlockStack gap="100">
                          <Label id={field} required={field !== 'contactPhone'}>
                            {field.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                          {field === 'businessType' ? (
                            <Select
                              id={field}
                              placeholder="Select business type"
                              options={[
                                { label: 'Retail', value: 'retail' },
                                { label: 'Wholesale', value: 'wholesale' },
                                { label: 'Manufacturing', value: 'manufacturing' },
                                { label: 'Services', value: 'services' },
                                { label: 'Other', value: 'other' },
                              ]}
                              value={formData[field as keyof typeof formData]}
                              onChange={handleFieldChange(field)}
                            />
                          ) : (
                            <TextField
                              id={field}
                              placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                              value={formData[field as keyof typeof formData]}
                              onChange={handleFieldChange(field)}
                              type={field === 'contactEmail' ? 'email' : field === 'contactPhone' ? 'tel' : 'text'}
                            />
                          )}
                        </BlockStack>
                      </div>
                    ))}
                  </BlockStack>
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid #e1e3e5'
              }}>
                <Button
                  variant="plain"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                  disabled={currentStep === steps.length ? false : !isStepComplete()}
                >
                  {currentStep === steps.length ? 'Complete' : 'Next'}
                </Button>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const AccessibilityExample: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Accessibility Best Practices</h3>
            <BlockStack gap="300">
              <div style={{
                padding: '16px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #90caf9'
              }}>
                <h4 style={{ margin: '0 0 8px 0' }}>✅ Good Example</h4>
                <div>
                  <BlockStack gap="100">
                    <Label id="accessible-email" required>
                      Email address
                    </Label>
                    <Text variant="bodySm" as="p" tone="subdued" id="email-help">
                      We\'ll use this to send order confirmations and updates
                    </Text>
                    <TextField
                      id="accessible-email"
                      type="email"
                      placeholder="your@email.com"
                      aria-describedby="email-help"
                      aria-required="true"
                    />
                  </BlockStack>
                </div>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#ffebee',
                borderRadius: '8px',
                border: '1px solid #ffcdd2'
              }}>
                <h4 style={{ margin: '0 0 8px 0' }}>❌ Avoid This</h4>
                <div>
                  <BlockStack gap="100">
                    <Text as="p">Enter your email:</Text>
                    <TextField placeholder="Email" />
                  </BlockStack>
                </div>
                <Text variant="bodySm" as="p" tone="critical">
                  Missing proper label association and accessibility attributes
                </Text>
              </div>
            </BlockStack>
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <h4 style={{ margin: '0 0 12px 0' }}>Accessibility Guidelines:</h4>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Always associate labels with form controls using the `htmlFor` attribute</li>
              <li>Use required indicators consistently</li>
              <li>Provide helpful descriptions and error messages</li>
              <li>Ensure sufficient color contrast between label text and background</li>
              <li>Use semantic HTML elements properly</li>
              <li>Test with screen readers to ensure proper announcement</li>
            </ul>
          </div>
        </BlockStack>
      </div>
    );
  },
};