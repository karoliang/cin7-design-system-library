import type { Meta, StoryObj } from '@storybook/react';
import { RadioButton, BlockStack, InlineStack, Text } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Forms/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio buttons are used for single choice selections. When users need to select one option from a set of mutually exclusive options, radio buttons provide a clear and accessible interface. Only one radio button in a group can be selected at a time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Radio button label text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether radio button is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable radio button interaction',
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
      description: 'Form field name (for grouping)',
    },
    value: {
      control: 'text',
      description: 'Radio button value',
    },
    id: {
      control: 'text',
      description: 'Unique identifier',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Standard shipping',
    name: 'shipping',
    value: 'standard',
  },
  parameters: {
    codeVariants: getCodeVariants('radiobutton', 'default'),
  },
};

export const Checked: Story = {
  args: {
    label: 'Express shipping',
    name: 'shipping',
    value: 'express',
    checked: true,
  },
  parameters: {
    codeVariants: getCodeVariants('radiobutton', 'checked'),
  },
};

export const Disabled: Story = {
  render: () => (
    <BlockStack gap="400">
      <RadioButton label="Disabled unchecked" disabled name="disabled" value="no" />
      <RadioButton label="Disabled checked" checked disabled name="disabled" value="yes" />
    </BlockStack>
  ),
  parameters: {
    codeVariants: getCodeVariants('radiobutton', 'disabled'),
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Premium shipping',
    name: 'shipping',
    value: 'premium',
    helpText: 'Delivered within 1-2 business days with tracking',
  },
  parameters: {
    codeVariants: getCodeVariants('radiobutton', 'with-help-text'),
  },
};

export const Required: Story = {
  args: {
    label: 'Payment method required',
    name: 'payment',
    value: 'credit',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Invalid option',
    name: 'option',
    value: 'invalid',
    error: 'This option is not available in your region',
  },
};

export const ShippingOptions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('standard');

    const options = [
      {
        value: 'standard',
        label: 'Standard Shipping',
        helpText: '5-7 business days - Free',
      },
      {
        value: 'express',
        label: 'Express Shipping',
        helpText: '2-3 business days - $12.99',
      },
      {
        value: 'overnight',
        label: 'Overnight Shipping',
        helpText: '1 business day - $24.99',
      },
    ];

    return (
      <BlockStack gap="400" maxWidth="400px">
        <Text as="h3" variant="headingMd">Choose shipping method</Text>

        {options.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            name="shipping"
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
            helpText={option.helpText}
          />
        ))}

        <Text as="p" variant="bodySm" tone="subdued">
          Selected: {options.find(o => o.value === selected)?.label}
        </Text>
      </BlockStack>
    );
  },
};

export const PaymentMethods: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = React.useState('credit');
    const [errors, setErrors] = React.useState('');

    const validatePayment = () => {
      if (!paymentMethod) {
        setErrors('Please select a payment method');
        return false;
      }
      setErrors('');
      return true;
    };

    const paymentOptions = [
      {
        value: 'credit',
        label: 'Credit Card',
        helpText: 'Visa, Mastercard, American Express',
      },
      {
        value: 'debit',
        label: 'Debit Card',
        helpText: 'Direct bank withdrawal',
      },
      {
        value: 'paypal',
        label: 'PayPal',
        helpText: 'Fast and secure online payment',
      },
      {
        value: 'apple',
        label: 'Apple Pay',
        helpText: 'Pay with Touch ID or Face ID',
      },
    ];

    return (
      <BlockStack gap="400" maxWidth="450px">
        <Text as="h3" variant="headingMd">Select payment method</Text>

        {paymentOptions.map((option) => (
          <RadioButton
            key={option.value}
            label={option.label}
            name="payment"
            value={option.value}
            checked={paymentMethod === option.value}
            onChange={() => {
              setPaymentMethod(option.value);
              setErrors('');
            }}
            helpText={option.helpText}
            error={errors && !paymentMethod ? errors : undefined}
          />
        ))}

        <InlineStack gap="200">
          <button
            onClick={validatePayment}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007ace',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Continue to Payment
          </button>
        </InlineStack>

        {errors && (
          <Text as="p" tone="critical">
            {errors}
          </Text>
        )}
      </BlockStack>
    );
  },
};

export const ProductVariants: Story = {
  render: () => {
    const [size, setSize] = React.useState('medium');
    const [color, setColor] = React.useState('blue');

    const sizes = [
      { value: 'small', label: 'Small (S)' },
      { value: 'medium', label: 'Medium (M)' },
      { value: 'large', label: 'Large (L)' },
      { value: 'xlarge', label: 'Extra Large (XL)' },
    ];

    const colors = [
      { value: 'red', label: 'Red', helpText: 'Vibrant red color' },
      { value: 'blue', label: 'Blue', helpText: 'Classic navy blue' },
      { value: 'green', label: 'Green', helpText: 'Forest green' },
      { value: 'black', label: 'Black', helpText: 'Classic black' },
    ];

    return (
      <BlockStack gap="600" maxWidth="500px">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Select Size</Text>
          {sizes.map((sizeOption) => (
            <RadioButton
              key={sizeOption.value}
              label={sizeOption.label}
              name="size"
              value={sizeOption.value}
              checked={size === sizeOption.value}
              onChange={() => setSize(sizeOption.value)}
            />
          ))}
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Select Color</Text>
          {colors.map((colorOption) => (
            <RadioButton
              key={colorOption.value}
              label={colorOption.label}
              name="color"
              value={colorOption.value}
              checked={color === colorOption.value}
              onChange={() => setColor(colorOption.value)}
              helpText={colorOption.helpText}
            />
          ))}
        </BlockStack>

        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <Text as="h4" variant="headingSm">Selected: {sizes.find(s => s.value === size)?.label} - {colors.find(c => c.value === color)?.label}</Text>
        </div>
      </BlockStack>
    );
  },
};

export const SurveyQuestions: Story = {
  render: () => {
    const [satisfaction, setSatisfaction] = React.useState('');
    const [recommendation, setRecommendation] = React.useState('');
    const [errors, setErrors] = React.useState<Record<string, string>>({});

    const satisfactionLevels = [
      { value: 'very-satisfied', label: 'Very Satisfied' },
      { value: 'satisfied', label: 'Satisfied' },
      { value: 'neutral', label: 'Neutral' },
      { value: 'dissatisfied', label: 'Dissatisfied' },
      { value: 'very-dissatisfied', label: 'Very Dissatisfied' },
    ];

    const recommendationLevels = [
      { value: 'definitely', label: 'Definitely' },
      { value: 'probably', label: 'Probably' },
      { value: 'not-sure', label: 'Not Sure' },
      { value: 'probably-not', label: 'Probably Not' },
      { value: 'definitely-not', label: 'Definitely Not' },
    ];

    const validateField = (field: string, value: string) => {
      if (!value) {
        setErrors(prev => ({ ...prev, [field]: 'Please select an option' }));
        return false;
      }
      setErrors(prev => ({ ...prev, [field]: '' }));
      return true;
    };

    const handleBlur = (field: string, value: string) => {
      validateField(field, value);
    };

    return (
      <BlockStack gap="600" maxWidth="600px">
        <Text as="h2" variant="headingLg">Customer Satisfaction Survey</Text>

        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">How satisfied are you with our service?</Text>
          {satisfactionLevels.map((level) => (
            <RadioButton
              key={level.value}
              label={level.label}
              name="satisfaction"
              value={level.value}
              checked={satisfaction === level.value}
              onChange={(value) => {
                setSatisfaction(value);
                if (errors.satisfaction) {
                  setErrors(prev => ({ ...prev, satisfaction: '' }));
                }
              }}
              onBlur={() => handleBlur('satisfaction', satisfaction)}
              error={errors.satisfaction}
            />
          ))}
        </BlockStack>

        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">How likely are you to recommend us to a friend?</Text>
          {recommendationLevels.map((level) => (
            <RadioButton
              key={level.value}
              label={level.label}
              name="recommendation"
              value={level.value}
              checked={recommendation === level.value}
              onChange={(value) => {
                setRecommendation(value);
                if (errors.recommendation) {
                  setErrors(prev => ({ ...prev, recommendation: '' }));
                }
              }}
              onBlur={() => handleBlur('recommendation', recommendation)}
              error={errors.recommendation}
            />
          ))}
        </BlockStack>

        <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          <Text as="h4" variant="headingSm">Survey Responses:</Text>
          <Text as="p">Satisfaction: {satisfaction || 'Not answered'}</Text>
          <Text as="p">Recommendation: {recommendation || 'Not answered'}</Text>
        </div>
      </BlockStack>
    );
  },
};

export const AccessibilityExamples: Story = {
  render: () => (
    <BlockStack gap="400" maxWidth="500px">
      <Text as="h3" variant="headingMd">Accessibility Best Practices</Text>

      <RadioButton
        label="Option with descriptive help text"
        name="a11y"
        value="help"
        helpText="This provides additional context for screen reader users"
      />

      <RadioButton
        label="Required option"
        name="a11y"
        value="required"
        required
      />

      <RadioButton
        label="Option with error state"
        name="a11y"
        value="error"
        error="This option has validation errors"
      />

      <BlockStack gap="200">
        <Text as="p" variant="bodySm">
          ✓ Radio buttons are properly grouped with the same name attribute<br/>
          ✓ Each option has a clear, descriptive label<br/>
          ✓ Required fields are clearly indicated<br/>
          ✓ Error states provide helpful feedback<br/>
          ✓ Help text provides additional context when needed
        </Text>
      </BlockStack>
    </BlockStack>
  ),
};