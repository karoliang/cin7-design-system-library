import type { Meta, StoryObj } from '@storybook/react';
import {
  Form,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  Button,
  Banner,
  InlineStack,
  BlockStack,
  Text,
  LegacyCard,
  Badge,
  ProgressBar
} from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Forms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The Form component wraps form controls and manages form submission. It provides accessibility features, prevents default browser submission, and supports implicit submission (Enter key to submit).

**Key Features:**
- Blocks default form submission behavior
- Supports implicit submission via Enter key
- Provides onSubmit callback for custom handling
- Integrates with FormLayout for structured layouts
- Full accessibility support with proper form semantics

**When to use:**
- Any form that submits data (login, registration, settings)
- Multi-field forms with validation
- Forms with async submission (API calls)
- Multi-step wizards and complex flows

**Best Practices:**
- Always provide form validation feedback
- Show loading states during submission
- Display success/error messages clearly
- Reset form after successful submission
- Use FormLayout for consistent spacing
- Mark required fields clearly`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onSubmit: {
      description: 'Callback when form is submitted',
      action: 'submitted',
    },
    implicitSubmit: {
      control: 'boolean',
      description: 'Enable Enter key submission (default: true)',
    },
    preventDefault: {
      control: 'boolean',
      description: 'Prevent default form submission (default: true)',
    },
    method: {
      control: 'select',
      options: ['post', 'get', 'action'],
      description: 'HTTP method for form submission',
    },
    noValidate: {
      control: 'boolean',
      description: 'Disable browser validation',
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [email, setEmail] = React.useState('');
    const [newsletter, setNewsletter] = React.useState(false);

    const handleSubmit = React.useCallback(() => {
      console.log('Form submitted:', { email, newsletter });
      alert(`Submitted!\nEmail: ${email}\nNewsletter: ${newsletter}`);
    }, [email, newsletter]);

    return (
      <div style={{ width: '400px' }}>
        <LegacyCard sectioned>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="your.email@example.com"
                autoComplete="email"
                required
              />

              <Checkbox
                label="Subscribe to newsletter"
                checked={newsletter}
                onChange={setNewsletter}
              />

              <Button submit>Submit</Button>
            </FormLayout>
          </Form>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic form with email input and checkbox. The form prevents default submission and handles the submit event via the onSubmit callback.',
      },
    },
    codeVariants: getCodeVariants('form', 'default'),
  },
};

export const WithValidation: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});

    const validateField = (field: string, value: any): string => {
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
        case 'password':
          if (!value) return 'Password is required';
          if (value.length < 8) return 'Password must be at least 8 characters';
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain uppercase, lowercase, and number';
          return '';
        case 'confirmPassword':
          if (!value) return 'Please confirm your password';
          if (value !== formData.password) return 'Passwords do not match';
          return '';
        case 'terms':
          if (!value) return 'You must agree to the terms';
          return '';
        default:
          return '';
      }
    };

    const handleChange = (field: string, value: any) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (touched[field]) {
        const error = validateField(field, value);
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    };

    const handleBlur = (field: string) => {
      setTouched(prev => ({ ...prev, [field]: true }));
      const error = validateField(field, formData[field as keyof typeof formData]);
      setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleSubmit = () => {
      // Validate all fields
      const newErrors: Record<string, string> = {};
      const allTouched: Record<string, boolean> = {};

      Object.keys(formData).forEach(field => {
        allTouched[field] = true;
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) newErrors[field] = error;
      });

      setTouched(allTouched);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        alert('Registration successful!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        });
        setTouched({});
      }
    };

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Create Account</Text>

            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <FormLayout.Group>
                  <TextField
                    label="First name"
                    value={formData.firstName}
                    onChange={(value) => handleChange('firstName', value)}
                    onBlur={() => handleBlur('firstName')}
                    error={touched.firstName && errors.firstName}
                    autoComplete="given-name"
                    required
                  />
                  <TextField
                    label="Last name"
                    value={formData.lastName}
                    onChange={(value) => handleChange('lastName', value)}
                    onBlur={() => handleBlur('lastName')}
                    error={touched.lastName && errors.lastName}
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
                  autoComplete="email"
                  required
                />

                <TextField
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(value) => handleChange('password', value)}
                  onBlur={() => handleBlur('password')}
                  error={touched.password && errors.password}
                  helpText="Must be at least 8 characters with uppercase, lowercase, and number"
                  autoComplete="new-password"
                  required
                />

                <TextField
                  label="Confirm password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(value) => handleChange('confirmPassword', value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={touched.confirmPassword && errors.confirmPassword}
                  autoComplete="new-password"
                  required
                />

                <Checkbox
                  label="I agree to the terms and conditions"
                  checked={formData.terms}
                  onChange={(value) => handleChange('terms', value)}
                  error={touched.terms && errors.terms}
                />

                <Button submit primary>Create Account</Button>
              </FormLayout>
            </Form>
          </BlockStack>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with comprehensive client-side validation. Validation occurs on blur and on submit, with inline error messages for each field.',
      },
    },
    codeVariants: getCodeVariants('form', 'with-validation'),
  },
};

export const WithServerValidation: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      username: '',
      email: '',
      bio: '',
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [serverError, setServerError] = React.useState('');
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = async () => {
      setIsSubmitting(true);
      setErrors({});
      setServerError('');
      setSuccess(false);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate server-side validation
      const serverErrors: Record<string, string> = {};

      if (!formData.username) {
        serverErrors.username = 'Username is required';
      } else if (formData.username === 'admin' || formData.username === 'root') {
        serverErrors.username = 'This username is reserved';
      } else if (formData.username.length < 3) {
        serverErrors.username = 'Username must be at least 3 characters';
      }

      if (!formData.email) {
        serverErrors.email = 'Email is required';
      } else if (formData.email === 'taken@example.com') {
        serverErrors.email = 'This email is already registered';
      }

      if (Object.keys(serverErrors).length > 0) {
        setErrors(serverErrors);
        setServerError('Please fix the errors below and try again');
      } else {
        setSuccess(true);
        setTimeout(() => {
          setFormData({ username: '', email: '', bio: '' });
          setSuccess(false);
        }, 3000);
      }

      setIsSubmitting(false);
    };

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Profile Settings</Text>

            {serverError && (
              <Banner tone="critical" onDismiss={() => setServerError('')}>
                {serverError}
              </Banner>
            )}

            {success && (
              <Banner tone="success">
                Profile updated successfully!
              </Banner>
            )}

            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="Username"
                  value={formData.username}
                  onChange={(value) => setFormData(prev => ({ ...prev, username: value }))}
                  error={errors.username}
                  helpText="Try 'admin' or 'root' to see server validation error"
                  autoComplete="username"
                  required
                  disabled={isSubmitting}
                />

                <TextField
                  label="Email address"
                  type="email"
                  value={formData.email}
                  onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                  error={errors.email}
                  helpText="Try 'taken@example.com' to see duplicate email error"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                />

                <TextField
                  label="Bio"
                  multiline={4}
                  value={formData.bio}
                  onChange={(value) => setFormData(prev => ({ ...prev, bio: value }))}
                  placeholder="Tell us about yourself..."
                  maxLength={200}
                  showCharacterCount
                  disabled={isSubmitting}
                />

                <Button submit primary loading={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save Profile'}
                </Button>
              </FormLayout>
            </Form>
          </BlockStack>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with async server-side validation. Demonstrates handling of server errors, loading states, and success feedback.',
      },
    },
    codeVariants: getCodeVariants('form', 'server-validation'),
  },
};

export const ImplicitSubmit: Story = {
  render: () => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [results, setResults] = React.useState<string[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);

    const handleSubmit = async () => {
      setIsSearching(true);
      setResults([]);

      // Simulate search
      await new Promise(resolve => setTimeout(resolve, 1000));

      setResults([
        `Product matching "${searchQuery}"`,
        `Order containing "${searchQuery}"`,
        `Customer with "${searchQuery}"`,
      ]);
      setIsSearching(false);
    };

    return (
      <div style={{ width: '500px' }}>
        <LegacyCard sectioned>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Search</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Press Enter to search or click the search button
            </Text>

            <Form onSubmit={handleSubmit} implicitSubmit>
              <FormLayout>
                <TextField
                  label="Search query"
                  labelHidden
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search products, orders, customers..."
                  type="search"
                  autoComplete="off"
                />

                <InlineStack gap="200">
                  <Button submit primary loading={isSearching}>
                    Search
                  </Button>
                  <Button onClick={() => { setSearchQuery(''); setResults([]); }}>
                    Clear
                  </Button>
                </InlineStack>
              </FormLayout>
            </Form>

            {results.length > 0 && (
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm">Results:</Text>
                {results.map((result, index) => (
                  <div key={index} style={{
                    padding: '12px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '8px'
                  }}>
                    {result}
                  </div>
                ))}
              </BlockStack>
            )}
          </BlockStack>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with implicit submission enabled. Users can press Enter to submit the form without clicking a button.',
      },
    },
    codeVariants: getCodeVariants('form', 'implicit-submit'),
  },
};

export const MultiStepForm: Story = {
  render: () => {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
      // Step 1
      companyName: '',
      industry: '',
      // Step 2
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      // Step 3
      address: '',
      city: '',
      postalCode: '',
      country: '',
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const validateStep = (currentStep: number): boolean => {
      const newErrors: Record<string, string> = {};

      if (currentStep === 1) {
        if (!formData.companyName) newErrors.companyName = 'Company name is required';
        if (!formData.industry) newErrors.industry = 'Please select an industry';
      } else if (currentStep === 2) {
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email';
        }
      } else if (currentStep === 3) {
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.postalCode) newErrors.postalCode = 'Postal code is required';
        if (!formData.country) newErrors.country = 'Please select a country';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
      if (validateStep(step)) {
        setStep(step + 1);
      }
    };

    const handleBack = () => {
      setStep(step - 1);
      setErrors({});
    };

    const handleSubmit = () => {
      if (validateStep(step)) {
        alert('Form submitted successfully!\n\n' + JSON.stringify(formData, null, 2));
        setStep(1);
        setFormData({
          companyName: '', industry: '', firstName: '', lastName: '',
          email: '', phone: '', address: '', city: '', postalCode: '', country: '',
        });
      }
    };

    return (
      <div style={{ width: '600px' }}>
        <LegacyCard sectioned>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Business Registration</Text>

            <ProgressBar progress={(step / 3) * 100} size="small" />

            <InlineStack gap="200" align="center">
              <Badge tone={step >= 1 ? 'success' : undefined}>1. Company</Badge>
              <Badge tone={step >= 2 ? 'success' : undefined}>2. Contact</Badge>
              <Badge tone={step >= 3 ? 'success' : undefined}>3. Address</Badge>
            </InlineStack>

            <Form onSubmit={step === 3 ? handleSubmit : handleNext}>
              <FormLayout>
                {step === 1 && (
                  <>
                    <TextField
                      label="Company name"
                      value={formData.companyName}
                      onChange={(value) => setFormData(prev => ({ ...prev, companyName: value }))}
                      error={errors.companyName}
                      required
                    />
                    <Select
                      label="Industry"
                      options={[
                        { label: 'Select industry', value: '' },
                        { label: 'Technology', value: 'tech' },
                        { label: 'Retail', value: 'retail' },
                        { label: 'Manufacturing', value: 'manufacturing' },
                        { label: 'Healthcare', value: 'healthcare' },
                        { label: 'Other', value: 'other' },
                      ]}
                      value={formData.industry}
                      onChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}
                      error={errors.industry}
                      required
                    />
                  </>
                )}

                {step === 2 && (
                  <>
                    <FormLayout.Group>
                      <TextField
                        label="First name"
                        value={formData.firstName}
                        onChange={(value) => setFormData(prev => ({ ...prev, firstName: value }))}
                        error={errors.firstName}
                        autoComplete="given-name"
                        required
                      />
                      <TextField
                        label="Last name"
                        value={formData.lastName}
                        onChange={(value) => setFormData(prev => ({ ...prev, lastName: value }))}
                        error={errors.lastName}
                        autoComplete="family-name"
                        required
                      />
                    </FormLayout.Group>
                    <TextField
                      label="Email address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                      error={errors.email}
                      autoComplete="email"
                      required
                    />
                    <TextField
                      label="Phone number"
                      type="tel"
                      value={formData.phone}
                      onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                      placeholder="(555) 123-4567"
                      autoComplete="tel"
                    />
                  </>
                )}

                {step === 3 && (
                  <>
                    <TextField
                      label="Street address"
                      value={formData.address}
                      onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                      error={errors.address}
                      autoComplete="street-address"
                      required
                    />
                    <FormLayout.Group>
                      <TextField
                        label="City"
                        value={formData.city}
                        onChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                        error={errors.city}
                        autoComplete="address-level2"
                        required
                      />
                      <TextField
                        label="Postal code"
                        value={formData.postalCode}
                        onChange={(value) => setFormData(prev => ({ ...prev, postalCode: value }))}
                        error={errors.postalCode}
                        autoComplete="postal-code"
                        required
                      />
                    </FormLayout.Group>
                    <Select
                      label="Country"
                      options={[
                        { label: 'Select country', value: '' },
                        { label: 'United States', value: 'us' },
                        { label: 'Canada', value: 'ca' },
                        { label: 'United Kingdom', value: 'uk' },
                        { label: 'Australia', value: 'au' },
                      ]}
                      value={formData.country}
                      onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                      error={errors.country}
                      required
                    />
                  </>
                )}

                <InlineStack gap="200">
                  {step > 1 && (
                    <Button onClick={handleBack}>Back</Button>
                  )}
                  <Button submit primary>
                    {step === 3 ? 'Submit' : 'Next'}
                  </Button>
                </InlineStack>
              </FormLayout>
            </Form>
          </BlockStack>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-step form wizard with step validation. Each step validates before proceeding to the next. Shows progress indicator and step navigation.',
      },
    },
    codeVariants: getCodeVariants('form', 'multi-step'),
  },
};

export const WithFormLayout: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      productName: '',
      sku: '',
      price: '',
      comparePrice: '',
      cost: '',
      taxable: true,
      category: '',
      tags: '',
      description: '',
      weight: '',
      length: '',
      width: '',
      height: '',
    });

    const handleSubmit = () => {
      console.log('Product data:', formData);
      alert('Product saved!');
    };

    return (
      <div style={{ width: '700px' }}>
        <LegacyCard sectioned>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <Text as="h2" variant="headingMd">Product Details</Text>

              <TextField
                label="Product name"
                value={formData.productName}
                onChange={(value) => setFormData(prev => ({ ...prev, productName: value }))}
                placeholder="Enter product name"
                required
              />

              <FormLayout.Group>
                <TextField
                  label="SKU"
                  value={formData.sku}
                  onChange={(value) => setFormData(prev => ({ ...prev, sku: value }))}
                  placeholder="ABC-123"
                />
                <Select
                  label="Category"
                  options={[
                    { label: 'Select category', value: '' },
                    { label: 'Electronics', value: 'electronics' },
                    { label: 'Clothing', value: 'clothing' },
                    { label: 'Home & Garden', value: 'home' },
                  ]}
                  value={formData.category}
                  onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                />
              </FormLayout.Group>

              <Text as="h3" variant="headingSm">Pricing</Text>

              <FormLayout.Group>
                <TextField
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(value) => setFormData(prev => ({ ...prev, price: value }))}
                  prefix="$"
                  placeholder="0.00"
                />
                <TextField
                  label="Compare at price"
                  type="number"
                  value={formData.comparePrice}
                  onChange={(value) => setFormData(prev => ({ ...prev, comparePrice: value }))}
                  prefix="$"
                  placeholder="0.00"
                  helpText="Optional"
                />
              </FormLayout.Group>

              <FormLayout.Group>
                <TextField
                  label="Cost per item"
                  type="number"
                  value={formData.cost}
                  onChange={(value) => setFormData(prev => ({ ...prev, cost: value }))}
                  prefix="$"
                  placeholder="0.00"
                  helpText="Customers won't see this"
                />
              </FormLayout.Group>

              <Checkbox
                label="Charge tax on this product"
                checked={formData.taxable}
                onChange={(value) => setFormData(prev => ({ ...prev, taxable: value }))}
              />

              <Text as="h3" variant="headingSm">Organization</Text>

              <TextField
                label="Tags"
                value={formData.tags}
                onChange={(value) => setFormData(prev => ({ ...prev, tags: value }))}
                placeholder="summer, sale, featured"
                helpText="Separate tags with commas"
              />

              <TextField
                label="Description"
                multiline={4}
                value={formData.description}
                onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                placeholder="Describe this product..."
              />

              <Text as="h3" variant="headingSm">Shipping</Text>

              <TextField
                label="Weight"
                type="number"
                value={formData.weight}
                onChange={(value) => setFormData(prev => ({ ...prev, weight: value }))}
                suffix="kg"
                placeholder="0.0"
              />

              <FormLayout.Group>
                <TextField
                  label="Length"
                  type="number"
                  value={formData.length}
                  onChange={(value) => setFormData(prev => ({ ...prev, length: value }))}
                  suffix="cm"
                />
                <TextField
                  label="Width"
                  type="number"
                  value={formData.width}
                  onChange={(value) => setFormData(prev => ({ ...prev, width: value }))}
                  suffix="cm"
                />
                <TextField
                  label="Height"
                  type="number"
                  value={formData.height}
                  onChange={(value) => setFormData(prev => ({ ...prev, height: value }))}
                  suffix="cm"
                />
              </FormLayout.Group>

              <InlineStack gap="200">
                <Button submit primary>Save Product</Button>
                <Button>Cancel</Button>
              </InlineStack>
            </FormLayout>
          </Form>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex form using FormLayout for organized sections. Demonstrates grouping related fields, section headers, and comprehensive product data entry.',
      },
    },
    codeVariants: getCodeVariants('form', 'with-layout'),
  },
};

export const DisabledForm: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({
      title: '',
      content: '',
      status: 'draft',
    });

    const handleSubmit = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      alert('Published!');
      setIsLoading(false);
    };

    const handleLoadDraft = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData({
        title: 'Sample Post Title',
        content: 'This is a sample post loaded from drafts...',
        status: 'draft',
      });
      setIsLoading(false);
    };

    return (
      <div style={{ width: '600px' }}>
        <LegacyCard sectioned>
          <BlockStack gap="400">
            <InlineStack align="space-between">
              <Text as="h2" variant="headingMd">Create Post</Text>
              <Button onClick={handleLoadDraft} loading={isLoading} disabled={isLoading}>
                Load Draft
              </Button>
            </InlineStack>

            {isLoading && (
              <Banner>
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd">Loading...</Text>
                  <ProgressBar progress={75} size="small" />
                </BlockStack>
              </Banner>
            )}

            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="Title"
                  value={formData.title}
                  onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
                  placeholder="Enter post title"
                  disabled={isLoading}
                  required
                />

                <TextField
                  label="Content"
                  multiline={8}
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Write your post content..."
                  disabled={isLoading}
                  required
                />

                <Select
                  label="Status"
                  options={[
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                    { label: 'Scheduled', value: 'scheduled' },
                  ]}
                  value={formData.status}
                  onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  disabled={isLoading}
                />

                <InlineStack gap="200">
                  <Button submit primary loading={isLoading} disabled={isLoading}>
                    {isLoading ? 'Publishing...' : 'Publish'}
                  </Button>
                  <Button disabled={isLoading}>Save Draft</Button>
                </InlineStack>
              </FormLayout>
            </Form>
          </BlockStack>
        </LegacyCard>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with disabled state during loading. All fields and buttons are disabled while processing to prevent duplicate submissions.',
      },
    },
    codeVariants: getCodeVariants('form', 'disabled'),
  },
};
