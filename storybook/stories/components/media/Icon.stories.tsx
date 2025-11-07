import type { Meta, StoryObj } from '@storybook/react';
import { Icon, Text, InlineStack, BlockStack, Card, Badge } from '@shopify/polaris';
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XCircleIcon,
  SearchIcon,
  PlusCircleIcon,
  EditIcon,
  DeleteIcon,
  SettingsIcon,
  HomeIcon,
  ProductIcon,
  OrderIcon,
  CustomerIcon,
  AnalyticsIcon,
  DiscountIcon,
  CalendarIcon,
  EmailIcon,
  PhoneIcon,
  StarIcon,
  HeartIcon,
} from '@shopify/polaris-icons';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Media/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icons are visual symbols that represent actions, objects, or concepts. They help users quickly understand functionality and navigate interfaces. Polaris icons come with built-in accessibility and support various colors and sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: false,
      description: 'The icon source from @shopify/polaris-icons',
    },
    tone: {
      control: 'select',
      options: ['base', 'subdued', 'critical', 'warning', 'success', 'info', 'primary', 'emphasis', 'magic', 'textCaution', 'textWarning', 'textInfo', 'textSuccess', 'textPrimary', 'textMagic'],
      description: 'Visual tone of the icon',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: SearchIcon,
    accessibilityLabel: 'Search',
  },
  parameters: {
    codeVariants: getCodeVariants('icon', 'default'),
  },
};

export const Tones: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="400">
        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Base</Text>
          </div>
          <Icon source={SearchIcon} tone="base" />
          <Text variant="bodySm" color="subdued">Default icon color</Text>
        </InlineStack>

        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Subdued</Text>
          </div>
          <Icon source={InfoIcon} tone="subdued" />
          <Text variant="bodySm" color="subdued">Less prominent</Text>
        </InlineStack>

        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Success</Text>
          </div>
          <Icon source={CheckCircleIcon} tone="success" />
          <Text variant="bodySm" color="subdued">Positive actions</Text>
        </InlineStack>

        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Warning</Text>
          </div>
          <Icon source={AlertTriangleIcon} tone="warning" />
          <Text variant="bodySm" color="subdued">Caution states</Text>
        </InlineStack>

        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Critical</Text>
          </div>
          <Icon source={XCircleIcon} tone="critical" />
          <Text variant="bodySm" color="subdued">Error states</Text>
        </InlineStack>

        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Info</Text>
          </div>
          <Icon source={InfoIcon} tone="info" />
          <Text variant="bodySm" color="subdued">Informational</Text>
        </InlineStack>

        <InlineStack gap="400" blockAlign="center">
          <div style={{ width: '120px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Primary</Text>
          </div>
          <Icon source={StarIcon} tone="primary" />
          <Text variant="bodySm" color="subdued">Brand emphasis</Text>
        </InlineStack>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'tones'),
  },
};

export const CommonIcons: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="400">
        <Text variant="headingMd">Action Icons</Text>
        <InlineStack gap="400" wrap={false}>
          <div style={{ textAlign: 'center' }}>
            <Icon source={PlusCircleIcon} />
            <Text variant="bodySm" alignment="center">Add</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={EditIcon} />
            <Text variant="bodySm" alignment="center">Edit</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={DeleteIcon} />
            <Text variant="bodySm" alignment="center">Delete</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={SearchIcon} />
            <Text variant="bodySm" alignment="center">Search</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={SettingsIcon} />
            <Text variant="bodySm" alignment="center">Settings</Text>
          </div>
        </InlineStack>

        <Text variant="headingMd">Status Icons</Text>
        <InlineStack gap="400" wrap={false}>
          <div style={{ textAlign: 'center' }}>
            <Icon source={CheckCircleIcon} tone="success" />
            <Text variant="bodySm" alignment="center">Success</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={AlertTriangleIcon} tone="warning" />
            <Text variant="bodySm" alignment="center">Warning</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={XCircleIcon} tone="critical" />
            <Text variant="bodySm" alignment="center">Error</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={InfoIcon} tone="info" />
            <Text variant="bodySm" alignment="center">Info</Text>
          </div>
        </InlineStack>

        <Text variant="headingMd">Navigation Icons</Text>
        <InlineStack gap="400" wrap={false}>
          <div style={{ textAlign: 'center' }}>
            <Icon source={HomeIcon} />
            <Text variant="bodySm" alignment="center">Home</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={ProductIcon} />
            <Text variant="bodySm" alignment="center">Products</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={OrderIcon} />
            <Text variant="bodySm" alignment="center">Orders</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={CustomerIcon} />
            <Text variant="bodySm" alignment="center">Customers</Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Icon source={AnalyticsIcon} />
            <Text variant="bodySm" alignment="center">Analytics</Text>
          </div>
        </InlineStack>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'commonIcons'),
  },
};

export const WithText: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="300">
        <InlineStack gap="200" blockAlign="center">
          <Icon source={CheckCircleIcon} tone="success" />
          <Text variant="bodyMd">Order completed successfully</Text>
        </InlineStack>

        <InlineStack gap="200" blockAlign="center">
          <Icon source={AlertTriangleIcon} tone="warning" />
          <Text variant="bodyMd">Low inventory warning</Text>
        </InlineStack>

        <InlineStack gap="200" blockAlign="center">
          <Icon source={XCircleIcon} tone="critical" />
          <Text variant="bodyMd">Payment failed</Text>
        </InlineStack>

        <InlineStack gap="200" blockAlign="center">
          <Icon source={InfoIcon} tone="info" />
          <Text variant="bodyMd">New features available</Text>
        </InlineStack>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'withText'),
  },
};

export const InButtons: Story = {
  render: () => (
    <InlineStack gap="300">
      <Badge tone="success">
        <InlineStack gap="100" blockAlign="center">
          <Icon source={CheckCircleIcon} />
          <span>Active</span>
        </InlineStack>
      </Badge>

      <Badge tone="warning">
        <InlineStack gap="100" blockAlign="center">
          <Icon source={AlertTriangleIcon} />
          <span>Pending</span>
        </InlineStack>
      </Badge>

      <Badge tone="critical">
        <InlineStack gap="100" blockAlign="center">
          <Icon source={XCircleIcon} />
          <span>Failed</span>
        </InlineStack>
      </Badge>

      <Badge tone="info">
        <InlineStack gap="100" blockAlign="center">
          <Icon source={InfoIcon} />
          <span>Info</span>
        </InlineStack>
      </Badge>
    </InlineStack>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'inButtons'),
  },
};

export const ContactIcons: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="300">
        <InlineStack gap="200" blockAlign="center">
          <Icon source={EmailIcon} />
          <Text variant="bodyMd">support@example.com</Text>
        </InlineStack>

        <InlineStack gap="200" blockAlign="center">
          <Icon source={PhoneIcon} />
          <Text variant="bodyMd">+1 (555) 123-4567</Text>
        </InlineStack>

        <InlineStack gap="200" blockAlign="center">
          <Icon source={CalendarIcon} />
          <Text variant="bodyMd">Mon-Fri, 9am-5pm EST</Text>
        </InlineStack>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'contactIcons'),
  },
};

export const InteractiveIcons: Story = {
  render: () => (
    <InlineStack gap="400">
      <div
        style={{
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '4px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f6f6f7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Icon source={HeartIcon} />
      </div>

      <div
        style={{
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '4px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f6f6f7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Icon source={StarIcon} />
      </div>

      <div
        style={{
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '4px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f6f6f7';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Icon source={DiscountIcon} />
      </div>
    </InlineStack>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'interactiveIcons'),
  },
};

export const AccessibilityExample: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="300">
        <Text variant="headingMd">Icons with Accessibility Labels</Text>
        <InlineStack gap="300">
          <button
            aria-label="Search products"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <Icon source={SearchIcon} accessibilityLabel="Search products" />
          </button>

          <button
            aria-label="Edit item"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <Icon source={EditIcon} accessibilityLabel="Edit item" />
          </button>

          <button
            aria-label="Delete item"
            style={{
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            <Icon source={DeleteIcon} accessibilityLabel="Delete item" />
          </button>
        </InlineStack>
        <Text variant="bodySm" color="subdued">
          Hover over icons to see accessibility labels
        </Text>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('icon', 'accessibilityExample'),
  },
};
