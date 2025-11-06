import type { Meta, StoryObj } from '@storybook/react';
import { Box, Card, Button, Text, Badge } from '@shopify/polaris';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

import React from 'react';

const meta = {
  title: 'Components/Layout/Box',
  component: Box,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Box is a flexible container component that provides spacing, padding, borders, and other styling properties. It\'s the most fundamental layout primitive for creating custom layouts and styling components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Padding inside the box',
    },
    paddingInline: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Horizontal padding inside the box',
    },
    paddingBlock: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Vertical padding inside the box',
    },
    paddingStart: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Left padding inside the box',
    },
    paddingEnd: {
      control: 'select',
      options: ['none', 'extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Right padding inside the box',
    },
    background: {
      control: 'select',
      options: ['surface', 'surface subdued', 'bg', 'bg subdued', 'bg inverse', 'bg fill', 'bg fill subdued'],
      description: 'Background color of the box',
    },
    border: {
      control: 'select',
      options: ['base', 'block-start', 'inline-end', 'block-end', 'inline-start', 'none'],
      description: 'Border style of the box',
    },
    borderColor: {
      control: 'select',
      options: ['border', 'border-inverse', 'border-critical', 'border-warning', 'border-highlight', 'border-success', 'border-fill'],
      description: 'Border color of the box',
    },
    borderWidth: {
      control: 'select',
      options: ['none', 'base', 'thick'],
      description: 'Border width of the box',
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'base', 'full', 'large'],
      description: 'Border radius of the box',
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width of the box',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the box',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the box',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the box',
    },
    width: {
      control: 'text',
      description: 'Width of the box',
    },
    height: {
      control: 'text',
      description: 'Height of the box',
    },
    shadow: {
      control: 'select',
      options: ['none', 'base', 'md', 'lg', 'xl', '2xl'],
      description: 'Box shadow',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    codeVariants: getCodeVariants('box', 'default'),
  },
  render: () => (
    <Box padding="400" background="surface" border="base" borderRadius="base">
      <Text as="h3" variant="headingMd">Box Component</Text>
      <Text as="p" variant="bodyMd">This is a basic Box with padding, background, border, and border radius.</Text>
    </Box>
  ),
};

export const PaddingExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="none" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">No padding</Text>
      </Box>

      <Box padding="extraTight" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Extra tight padding</Text>
      </Box>

      <Box padding="tight" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Tight padding</Text>
      </Box>

      <Box padding="base" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Base padding (default)</Text>
      </Box>

      <Box padding="loose" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Loose padding</Text>
      </Box>

      <Box padding="extraLoose" background="surface subdued" border="base">
        <Text as="p" variant="bodySm">Extra loose padding</Text>
      </Box>
    </div>
  ),
};

export const DirectionalPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box paddingInline="400" background="surface" border="base">
        <Text as="p" variant="bodySm">Horizontal padding only (paddingInline)</Text>
      </Box>

      <Box paddingBlock="400" background="surface" border="base">
        <Text as="p" variant="bodySm">Vertical padding only (paddingBlock)</Text>
      </Box>

      <Box paddingStart="800" background="surface" border="base">
        <Text as="p" variant="bodySm">Left padding only (paddingStart)</Text>
      </Box>

      <Box paddingEnd="800" background="surface" border="base">
        <Text as="p" variant="bodySm">Right padding only (paddingEnd)</Text>
      </Box>

      <Box paddingBlock="400" paddingInline="800" background="surface" border="base">
        <Text as="p" variant="bodySm">Different vertical and horizontal padding</Text>
      </Box>
    </div>
  ),
};

export const BackgroundColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="400" background="surface" border="base">
        <Text as="h3" variant="headingSm">Surface</Text>
        <Text as="p" variant="bodySm">Standard surface background</Text>
      </Box>

      <Box padding="400" background="surface subdued" border="base">
        <Text as="h3" variant="headingSm">Surface Subdued</Text>
        <Text as="p" variant="bodySm">Muted surface background</Text>
      </Box>

      <Box padding="400" background="bg" border="base">
        <Text as="h3" variant="headingSm">Background</Text>
        <Text as="p" variant="bodySm">Default background color</Text>
      </Box>

      <Box padding="400" background="bg subdued" border="base">
        <Text as="h3" variant="headingSm">Background Subdued</Text>
        <Text as="p" variant="bodySm">Muted background color</Text>
      </Box>

      <Box padding="400" background="bg inverse" border="base">
        <Text as="h3" variant="headingSm">Background Inverse</Text>
        <Text as="p" variant="bodySm">Inverted background color</Text>
      </Box>
    </div>
  ),
};

export const BorderStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="400" background="surface" border="base">
        <Text as="p" variant="bodySm">Full border</Text>
      </Box>

      <Box padding="400" background="surface" border="block-start">
        <Text as="p" variant="bodySm">Top border only</Text>
      </Box>

      <Box padding="400" background="surface" border="inline-end">
        <Text as="p" variant="bodySm">Right border only</Text>
      </Box>

      <Box padding="400" background="surface" border="block-end">
        <Text as="p" variant="bodySm">Bottom border only</Text>
      </Box>

      <Box padding="400" background="surface" border="inline-start">
        <Text as="p" variant="bodySm">Left border only</Text>
      </Box>

      <Box padding="400" background="surface" border="none">
        <Text as="p" variant="bodySm">No border</Text>
      </Box>
    </div>
  ),
};

export const BorderColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="400" background="surface" border="base" borderColor="border">
        <Text as="p" variant="bodySm">Default border color</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderColor="border-critical">
        <Text as="p" variant="bodySm">Critical border color</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderColor="border-warning">
        <Text as="p" variant="bodySm">Warning border color</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderColor="border-highlight">
        <Text as="p" variant="bodySm">Highlight border color</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderColor="border-success">
        <Text as="p" variant="bodySm">Success border color</Text>
      </Box>
    </div>
  ),
};

export const BorderRadiusExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="400" background="surface" border="base" borderRadius="none">
        <Text as="p" variant="bodySm">No border radius</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderRadius="base">
        <Text as="p" variant="bodySm">Base border radius</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderRadius="large">
        <Text as="p" variant="bodySm">Large border radius</Text>
      </Box>

      <Box padding="400" background="surface" border="base" borderRadius="full">
        <Text as="p" variant="bodySm">Full border radius (pill shape)</Text>
      </Box>
    </div>
  ),
};

export const ShadowEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <Box padding="400" background="surface" shadow="none">
        <Text as="h3" variant="headingSm">No Shadow</Text>
        <Text as="p" variant="bodySm">Flat appearance</Text>
      </Box>

      <Box padding="400" background="surface" shadow="base">
        <Text as="h3" variant="headingSm">Base Shadow</Text>
        <Text as="p" variant="bodySm">Subtle elevation</Text>
      </Box>

      <Box padding="400" background="surface" shadow="md">
        <Text as="h3" variant="headingSm">Medium Shadow</Text>
        <Text as="p" variant="bodySm">Moderate elevation</Text>
      </Box>

      <Box padding="400" background="surface" shadow="lg">
        <Text as="h3" variant="headingSm">Large Shadow</Text>
        <Text as="p" variant="bodySm">High elevation</Text>
      </Box>

      <Box padding="400" background="surface" shadow="xl">
        <Text as="h3" variant="headingSm">Extra Large Shadow</Text>
        <Text as="p" variant="bodySm">Very high elevation</Text>
      </Box>
    </div>
  ),
};

export const SizingExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box
        width="100%"
        height="60px"
        background="surface"
        border="base"
        padding="200"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="p" variant="bodySm">Full width, 60px height</Text>
      </Box>

      <Box
        width="300px"
        height="80px"
        background="surface subdued"
        border="base"
        padding="200"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="p" variant="bodySm">300px width, 80px height</Text>
      </Box>

      <Box
        width="200px"
        minHeight="100px"
        background="bg fill"
        border="base"
        padding="200"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="p" variant="bodySm">200px width, min 100px height</Text>
      </Box>

      <Box
        maxWidth="400px"
        height="60px"
        background="bg fill subdued"
        border="base"
        padding="200"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text as="p" variant="bodySm">Max 400px width, 60px height</Text>
      </Box>
    </div>
  ),
};

export const StatusIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <Box
        padding="400"
        background="surface"
        border="base"
        borderColor="border-success"
        borderRadius="base"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#4caf50'
          }} />
          <Text as="h3" variant="headingSm">Payment Successful</Text>
        </div>
        <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
          Your payment has been processed successfully.
        </Text>
      </Box>

      <Box
        padding="400"
        background="surface subdued"
        border="base"
        borderColor="border-warning"
        borderRadius="base"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff9800'
          }} />
          <Text as="h3" variant="headingSm">Processing Order</Text>
        </div>
        <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
          Your order is currently being processed.
        </Text>
      </Box>

      <Box
        padding="400"
        background="bg"
        border="base"
        borderColor="border-critical"
        borderRadius="base"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#f44336'
          }} />
          <Text as="h3" variant="headingSm">Action Required</Text>
        </div>
        <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
          Please complete the required action.
        </Text>
      </Box>
    </div>
  ),
};

export const CardAlternative: Story = {
  render: () => {
    const [selectedCard, setSelectedCard] = React.useState<number | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
        {[
          { title: 'Starter Plan', price: '$9/mo', features: ['Basic features', 'Email support', '1 user'] },
          { title: 'Professional Plan', price: '$29/mo', features: ['Advanced features', 'Priority support', '5 users', 'Analytics'] },
          { title: 'Enterprise Plan', price: '$99/mo', features: ['All features', '24/7 support', 'Unlimited users', 'Custom integrations'] }
        ].map((plan, index) => (
          <Box
            key={index}
            padding="500"
            background={selectedCard === index ? "surface" : "surface subdued"}
            border={selectedCard === index ? "base" : "block-start"}
            borderColor={selectedCard === index ? "border-highlight" : "border"}
            borderRadius="base"
            shadow={selectedCard === index ? "md" : "none"}
            onClick={() => setSelectedCard(index)}
            style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
              <Text as="h3" variant="headingMd">{plan.title}</Text>
              <Badge status={index === 1 ? "attention" : selectedCard === index ? "success" : "info"}>
                {index === 1 ? "Popular" : selectedCard === index ? "Selected" : "Available"}
              </Badge>
            </div>

            <Text as="p" variant="headingLg" style={{ marginBottom: '16px' }}>{plan.price}</Text>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {plan.features.map((feature, featureIndex) => (
                <div key={featureIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: selectedCard === index ? '#4caf50' : '#6c7278',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>✓</div>
                  <Text as="p" variant="bodySm">{feature}</Text>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px' }}>
              <Button
                variant={selectedCard === index ? "primary" : "secondary"}
                fullWidth
              >
                {selectedCard === index ? "Selected Plan" : "Select Plan"}
              </Button>
            </div>
          </Box>
        ))}
      </div>
    );
  },
};

export const HighlightedContent: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Box
        padding="600"
        background="bg inverse"
        border="base"
        borderColor="border-highlight"
        borderWidth="thick"
        borderRadius="large"
        shadow="lg"
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>🎉</div>
          <Text as="h2" variant="headingLg">Limited Time Offer!</Text>
          <Text as="p" variant="bodyMd" style={{ marginTop: '12px', marginBottom: '24px' }}>
            Get 50% off on all premium features for the first 3 months.
          </Text>
          <Button variant="primary" size="large">
            Claim Your Discount
          </Button>
          <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '16px' }}>
            Offer expires in 48 hours. No credit card required.
          </Text>
        </div>
      </Box>

      <Box
        padding="400"
        background="surface subdued"
        border="block-start"
        borderColor="border-success"
        borderRadius="base"
        marginTop="400"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#e8f5e8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "20px"
          }}>✓</div>
          <div>
            <Text as="h3" variant="headingSm">Money-back Guarantee</Text>
            <Text as="p" variant="bodySm" tone="subdued">
              Try risk-free for 30 days. Full refund if you're not satisfied.
            </Text>
          </div>
        </div>
      </Box>
    </div>
  ),
};