import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, BlockStack, InlineStack, Text } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkboxes are used for multiple choice selections. They allow users to select one or more options from a set. Each checkbox operates independently, unlike radio buttons where only one can be selected.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox label text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable checkbox interaction',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    helpText: {
      control: 'text',
      description: 'Additional help text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'ARIA described by attribute',
    },
    name: {
      control: 'text',
      description: 'Form field name',
    },
    value: {
      control: 'text',
      description: 'Checkbox value',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Subscribe to newsletter',
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'default'),
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'checked'),
  },
};

export const Disabled: Story = {
  render: () => (
    <BlockStack gap="400">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled />
    </BlockStack>
  ),
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'disabled'),
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Enable notifications',
    helpText: 'Receive email updates about your account activity',
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'with-help-text'),
  },
};

export const Required: Story = {
  args: {
    label: 'I agree to the privacy policy',
    required: true,
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'default'),
  },

};

export const WithError: Story = {
  args: {
    label: 'Age verification',
    error: 'You must be 18 or older to continue',
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'error'),
  },
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    const [agreed, setAgreed] = React.useState(false);
    const [notifications, setNotifications] = React.useState({
      email: true,
      sms: false,
      push: true,
    });

    return (
      <BlockStack gap="400" maxWidth="400px">
        <div>
          <Checkbox
            label="Single checkbox with state"
            checked={checked}
            onChange={setChecked}
          />
          <Text as="p" variant="bodySm" tone="subdued">
            Status: {checked ? 'Checked' : 'Unchecked'}
          </Text>
        </div>

        <div>
          <Checkbox
            label="I agree to the terms of service"
            checked={agreed}
            onChange={setAgreed}
            required
            helpText="You must agree to continue"
          />
          <Text as="p" variant="bodySm" tone={agreed ? 'success' : 'critical'}>
            {agreed ? '✓ Terms accepted' : '✗ Terms not accepted'}
          </Text>
        </div>

        <BlockStack gap="200">
          <Text as="h3" variant="headingMd">Notification preferences:</Text>
          <Checkbox
            label="Email notifications"
            checked={notifications.email}
            onChange={(value) => setNotifications(prev => ({ ...prev, email: value }))}
            helpText="Receive updates via email"
          />
          <Checkbox
            label="SMS notifications"
            checked={notifications.sms}
            onChange={(value) => setNotifications(prev => ({ ...prev, sms: value }))}
            helpText="Receive text message alerts"
          />
          <Checkbox
            label="Push notifications"
            checked={notifications.push}
            onChange={(value) => setNotifications(prev => ({ ...prev, push: value }))}
            helpText="Receive browser push notifications"
          />
        </BlockStack>
      </BlockStack>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'default'),
  },

};

export const FormValidation: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      terms: false,
      age: false,
      consent: false,
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [touched, setTouched] = React.useState<Record<string, boolean>>({});

    const handleCheckboxChange = (field: string, value: boolean) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      setTouched(prev => ({ ...prev, [field]: true }));

      // Clear error when user checks the box
      if (value && errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (!formData.terms) {
        newErrors.terms = 'You must accept the terms and conditions';
      }
      if (!formData.age) {
        newErrors.age = 'Age verification is required';
      }
      if (!formData.consent) {
        newErrors.consent = 'Data processing consent is required';
      }

      setErrors(newErrors);
      setTouched({ terms: true, age: true, consent: true });

      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
      const isValid = validateForm();
      if (isValid) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <BlockStack gap="400" maxWidth="500px">
        <Text as="h2" variant="headingMd">Registration Form</Text>

        <Checkbox
          label="I accept the terms and conditions"
          checked={formData.terms}
          onChange={(value) => handleCheckboxChange('terms', value)}
          error={touched.terms ? errors.terms : undefined}
          required
        />

        <Checkbox
          label="I confirm I am 18 years of age or older"
          checked={formData.age}
          onChange={(value) => handleCheckboxChange('age', value)}
          error={touched.age ? errors.age : undefined}
          required
        />

        <Checkbox
          label="I consent to data processing as described in the privacy policy"
          checked={formData.consent}
          onChange={(value) => handleCheckboxChange('consent', value)}
          error={touched.consent ? errors.consent : undefined}
          required
          helpText="Your data will be processed in accordance with GDPR regulations"
        />

        <InlineStack gap="200">
          <button onClick={handleSubmit} style={{ padding: '8px 16px', backgroundColor: '#007ace', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Submit Form
          </button>
        </InlineStack>

        {Object.keys(errors).length > 0 && (
          <Text as="p" tone="critical">
            Please complete all required fields
          </Text>
        )}
      </BlockStack>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'default'),
  },

};

export const AccessibilityExamples: Story = {
  render: () => (
    <BlockStack gap="400" maxWidth="500px">
      <Text as="h3" variant="headingMd">Accessibility Best Practices</Text>

      <Checkbox
        label="Option with descriptive aria-describedby"
        helpText="This checkbox provides additional context for screen readers"
        ariaDescribedBy="checkbox-help"
      />

      <Checkbox
        label="Required field with clear indication"
        required
        helpText="This field is required for form submission"
      />

      <Checkbox
        label="Option with error state"
        error="This option must be selected to continue"
      />

      <BlockStack gap="200">
        <Text as="p" variant="bodySm">
          ✓ All checkboxes have associated labels<br/>
          ✓ Required fields are clearly marked<br/>
          ✓ Error states provide descriptive messages<br/>
          ✓ Help text provides additional context
        </Text>
      </BlockStack>
    </BlockStack>
  ),,
  parameters: {
    codeVariants: getCodeVariants('checkbox', 'default'),
  },

};