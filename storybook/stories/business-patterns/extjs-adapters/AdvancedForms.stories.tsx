import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  TextField,
  Select,
  Checkbox,
  Banner,
  ProgressBar,
} from '@shopify/polaris';
import { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Multi-Step Form Component
const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    startDate: '',
    salary: '',
    benefits: [] as string[],
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Position Details' },
    { number: 3, title: 'Compensation' },
    { number: 4, title: 'Review' },
  ];

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Employee Onboarding Form
          </Text>
          <Badge tone="info">ExtJS FormPanel</Badge>
        </InlineStack>

        {/* Progress Bar */}
        <BlockStack gap="200">
          <Text as="p" variant="bodyMd">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
          </Text>
          <ProgressBar progress={progress} size="small" />
        </BlockStack>

        {/* Step Indicators */}
        <InlineStack gap="200">
          {steps.map((step) => (
            <Badge
              key={step.number}
              tone={currentStep === step.number ? 'success' : currentStep > step.number ? 'info' : undefined}
            >
              {step.number}. {step.title}
            </Badge>
          ))}
        </InlineStack>

        {/* Step Content */}
        <BlockStack gap="400">
          {currentStep === 1 && (
            <BlockStack gap="300">
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={(value) => setFormData({ ...formData, firstName: value })}
                autoComplete="off"
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={(value) => setFormData({ ...formData, lastName: value })}
                autoComplete="off"
              />
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => setFormData({ ...formData, email: value })}
                autoComplete="off"
              />
            </BlockStack>
          )}

          {currentStep === 2 && (
            <BlockStack gap="300">
              <Select
                label="Department"
                options={[
                  { label: 'Select department...', value: '' },
                  { label: 'Engineering', value: 'engineering' },
                  { label: 'Sales', value: 'sales' },
                  { label: 'Marketing', value: 'marketing' },
                  { label: 'Operations', value: 'operations' },
                ]}
                value={formData.department}
                onChange={(value) => setFormData({ ...formData, department: value })}
              />
              <TextField
                label="Role/Position"
                value={formData.role}
                onChange={(value) => setFormData({ ...formData, role: value })}
                autoComplete="off"
              />
              <TextField
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(value) => setFormData({ ...formData, startDate: value })}
                autoComplete="off"
              />
            </BlockStack>
          )}

          {currentStep === 3 && (
            <BlockStack gap="300">
              <TextField
                label="Annual Salary"
                type="number"
                prefix="$"
                value={formData.salary}
                onChange={(value) => setFormData({ ...formData, salary: value })}
                autoComplete="off"
              />
              <BlockStack gap="200">
                <Text as="p" variant="bodyMd" fontWeight="semibold">
                  Benefits Package
                </Text>
                <Checkbox
                  label="Health Insurance"
                  checked={formData.benefits.includes('health')}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      benefits: checked
                        ? [...formData.benefits, 'health']
                        : formData.benefits.filter((b) => b !== 'health'),
                    })
                  }
                />
                <Checkbox
                  label="401(k) Matching"
                  checked={formData.benefits.includes('401k')}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      benefits: checked
                        ? [...formData.benefits, '401k']
                        : formData.benefits.filter((b) => b !== '401k'),
                    })
                  }
                />
                <Checkbox
                  label="Stock Options"
                  checked={formData.benefits.includes('stock')}
                  onChange={(checked) =>
                    setFormData({
                      ...formData,
                      benefits: checked
                        ? [...formData.benefits, 'stock']
                        : formData.benefits.filter((b) => b !== 'stock'),
                    })
                  }
                />
              </BlockStack>
            </BlockStack>
          )}

          {currentStep === 4 && (
            <BlockStack gap="300">
              <Banner tone="info">
                <p>Please review the information below before submitting.</p>
              </Banner>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" variant="bodyMd">
                    <strong>Name:</strong> {formData.firstName} {formData.lastName}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    <strong>Email:</strong> {formData.email}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    <strong>Department:</strong> {formData.department}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    <strong>Role:</strong> {formData.role}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    <strong>Start Date:</strong> {formData.startDate}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    <strong>Salary:</strong> ${formData.salary}
                  </Text>
                  <Text as="p" variant="bodyMd">
                    <strong>Benefits:</strong> {formData.benefits.join(', ') || 'None'}
                  </Text>
                </BlockStack>
              </Card>
            </BlockStack>
          )}
        </BlockStack>

        {/* Navigation Buttons */}
        <InlineStack align="end" gap="200">
          {currentStep > 1 && (
            <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>
          )}
          {currentStep < totalSteps && (
            <Button variant="primary" onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </Button>
          )}
          {currentStep === totalSteps && (
            <Button variant="primary" onClick={() => alert('Form submitted!')}>
              Submit
            </Button>
          )}
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

// Conditional Fields Form Component
const ConditionalFieldsForm: React.FC = () => {
  const [productType, setProductType] = useState('');
  const [hasSerialNumber, setHasSerialNumber] = useState(false);
  const [trackInventory, setTrackInventory] = useState(false);

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Product Configuration
          </Text>
          <Badge tone="attention">Conditional Fields</Badge>
        </InlineStack>

        <BlockStack gap="300">
          <Select
            label="Product Type"
            options={[
              { label: 'Select type...', value: '' },
              { label: 'Physical Product', value: 'physical' },
              { label: 'Digital Product', value: 'digital' },
              { label: 'Service', value: 'service' },
            ]}
            value={productType}
            onChange={setProductType}
          />

          {productType === 'physical' && (
            <BlockStack gap="300">
              <Banner tone="info">
                <p>Physical product fields are now available.</p>
              </Banner>
              <TextField label="Weight (kg)" type="number" autoComplete="off" />
              <TextField label="Dimensions (L × W × H)" autoComplete="off" />
              <Checkbox
                label="Track inventory levels"
                checked={trackInventory}
                onChange={setTrackInventory}
              />
              {trackInventory && (
                <BlockStack gap="200">
                  <TextField label="SKU" autoComplete="off" />
                  <TextField label="Quantity in Stock" type="number" autoComplete="off" />
                  <TextField label="Reorder Point" type="number" autoComplete="off" />
                </BlockStack>
              )}
              <Checkbox
                label="Uses serial numbers"
                checked={hasSerialNumber}
                onChange={setHasSerialNumber}
              />
              {hasSerialNumber && (
                <TextField label="Serial Number Format" placeholder="e.g., SN-{YYYY}-{0000}" autoComplete="off" />
              )}
            </BlockStack>
          )}

          {productType === 'digital' && (
            <BlockStack gap="300">
              <Banner tone="success">
                <p>Digital product fields are now available.</p>
              </Banner>
              <TextField label="Download URL" type="url" autoComplete="off" />
              <TextField label="File Size (MB)" type="number" autoComplete="off" />
              <Select
                label="License Type"
                options={[
                  { label: 'Single User', value: 'single' },
                  { label: 'Multi User', value: 'multi' },
                  { label: 'Enterprise', value: 'enterprise' },
                ]}
                value=""
                onChange={() => {}}
              />
            </BlockStack>
          )}

          {productType === 'service' && (
            <BlockStack gap="300">
              <Banner tone="warning">
                <p>Service fields are now available.</p>
              </Banner>
              <TextField label="Duration (hours)" type="number" autoComplete="off" />
              <Select
                label="Billing Type"
                options={[
                  { label: 'Hourly', value: 'hourly' },
                  { label: 'Fixed Price', value: 'fixed' },
                  { label: 'Recurring', value: 'recurring' },
                ]}
                value=""
                onChange={() => {}}
              />
            </BlockStack>
          )}
        </BlockStack>

        <InlineStack align="end">
          <Button variant="primary">Save Product</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

// Nested FieldSets Form Component
const NestedFieldSetsForm: React.FC = () => {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Customer Profile
          </Text>
          <Badge>Nested FieldSets</Badge>
        </InlineStack>

        <Card background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">
              Personal Information
            </Text>
            <TextField label="Full Name" autoComplete="off" />
            <TextField label="Email" type="email" autoComplete="off" />
            <TextField label="Phone" type="tel" autoComplete="off" />
          </BlockStack>
        </Card>

        <Card background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">
              Billing Address
            </Text>
            <TextField label="Street Address" autoComplete="off" />
            <InlineStack gap="200">
              <div style={{ flex: 2 }}>
                <TextField label="City" autoComplete="off" />
              </div>
              <div style={{ flex: 1 }}>
                <TextField label="State" autoComplete="off" />
              </div>
              <div style={{ flex: 1 }}>
                <TextField label="ZIP" autoComplete="off" />
              </div>
            </InlineStack>
            <Select
              label="Country"
              options={[
                { label: 'United States', value: 'US' },
                { label: 'Canada', value: 'CA' },
                { label: 'United Kingdom', value: 'UK' },
              ]}
              value="US"
              onChange={() => {}}
            />
          </BlockStack>
        </Card>

        <Card background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">
              Shipping Address
            </Text>
            <Checkbox label="Same as billing address" />
            <TextField label="Street Address" autoComplete="off" />
            <InlineStack gap="200">
              <div style={{ flex: 2 }}>
                <TextField label="City" autoComplete="off" />
              </div>
              <div style={{ flex: 1 }}>
                <TextField label="State" autoComplete="off" />
              </div>
              <div style={{ flex: 1 }}>
                <TextField label="ZIP" autoComplete="off" />
              </div>
            </InlineStack>
          </BlockStack>
        </Card>

        <Card background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">
              Preferences
            </Text>
            <Checkbox label="Email notifications" />
            <Checkbox label="SMS notifications" />
            <Checkbox label="Newsletter subscription" />
            <Select
              label="Preferred Language"
              options={[
                { label: 'English', value: 'en' },
                { label: 'Spanish', value: 'es' },
                { label: 'French', value: 'fr' },
              ]}
              value="en"
              onChange={() => {}}
            />
          </BlockStack>
        </Card>

        <InlineStack align="end" gap="200">
          <Button>Cancel</Button>
          <Button variant="primary">Save Customer</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

// Validation Patterns Form Component
const ValidationPatternsForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateUsername = async (value: string) => {
    setIsValidating(true);
    // Simulate async validation
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsValidating(false);

    if (value.length < 3) {
      setErrors((prev) => ({ ...prev, username: 'Username must be at least 3 characters' }));
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, username: 'Username can only contain letters, numbers, and underscores' }));
    } else {
      setErrors((prev) => {
        const { username, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
    } else {
      setErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters' }));
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        password: 'Password must contain uppercase, lowercase, and number',
      }));
    } else {
      setErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }

    // Cross-field validation
    if (confirmPassword && value !== confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            User Registration
          </Text>
          <InlineStack gap="200">
            <Badge tone="warning">Complex Validation</Badge>
            {isValidating && <Badge tone="info">Validating...</Badge>}
          </InlineStack>
        </InlineStack>

        <BlockStack gap="300">
          <TextField
            label="Username"
            value={username}
            onChange={(value) => {
              setUsername(value);
              validateUsername(value);
            }}
            error={errors.username}
            autoComplete="off"
            helpText="3+ characters, letters, numbers, and underscores only"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(value) => {
              setEmail(value);
            }}
            onBlur={() => validateEmail(email)}
            error={errors.email}
            autoComplete="off"
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              validatePassword(value);
            }}
            error={errors.password}
            autoComplete="off"
            helpText="8+ characters with uppercase, lowercase, and number"
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(value) => {
              setConfirmPassword(value);
              validateConfirmPassword(value);
            }}
            error={errors.confirmPassword}
            autoComplete="off"
          />

          {Object.keys(errors).length === 0 && username && email && password && confirmPassword && (
            <Banner tone="success">
              <p>All validations passed! Ready to submit.</p>
            </Banner>
          )}

          {Object.keys(errors).length > 0 && (
            <Banner tone="critical">
              <p>Please fix the errors above before submitting.</p>
            </Banner>
          )}
        </BlockStack>

        <InlineStack align="end">
          <Button variant="primary" disabled={Object.keys(errors).length > 0 || isValidating}>
            Create Account
          </Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

const meta = {
  title: 'Cin7 DSL/Enterprise Components/ExtJS - Advanced Forms',
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('advancedforms', 'default'),
    docs: {
      description: {
        component:
          'ExtJS provides powerful form capabilities including multi-step wizards, conditional fields, nested fieldsets, and complex validation patterns. These patterns are essential for enterprise applications with sophisticated data entry requirements.',
      },
    },
  },
  tags: ['autodocs', 'extjs', 'enterprise', 'forms'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiStepWizard: Story = {
  parameters: {
    codeVariants: getCodeVariants('advancedforms', 'multistep'),
  },
  render: () => <MultiStepForm />,
};

export const ConditionalFields: Story = {
  parameters: {
    codeVariants: getCodeVariants('advancedforms', 'conditional'),
  },
  render: () => <ConditionalFieldsForm />,
};

export const NestedFieldSets: Story = {
  parameters: {
    codeVariants: getCodeVariants('advancedforms', 'nested'),
  },
  render: () => <NestedFieldSetsForm />,
};

export const ValidationPatterns: Story = {
  parameters: {
    codeVariants: getCodeVariants('advancedforms', 'validation'),
  },
  render: () => <ValidationPatternsForm />,
};
