import type { Meta, StoryObj } from '@storybook/react';
import { Divider, Card, Button, Text, Badge } from '@shopify/polaris';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

import React from 'react';

const meta = {
  title: 'Components/Foundation/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Divider creates a visual separator between content sections. It helps organize content and improve readability by creating clear visual boundaries between related elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    borderColor: {
      control: 'select',
      options: ['border', 'border-inverse', 'border-critical', 'border-warning', 'border-highlight', 'border-success', 'border-fill'],
      description: 'Color of the divider line',
    },
    borderWidth: {
      control: 'select',
      options: ['none', 'base', 'thick'],
      description: 'Thickness of the divider line',
    },
    as: {
      control: 'text',
      description: 'HTML element to render as',
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Section One</Text>
      <Text as="p" variant="bodyMd">
        This is the first section of content with some descriptive text.
      </Text>

      <Divider />

      <Text as="h3" variant="headingMd">Section Two</Text>
      <Text as="p" variant="bodyMd">
        This is the second section, visually separated by a divider.
      </Text>
    </Card>
  ),
};

export const BorderColorVariations: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Border Color Variations</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text as="p" variant="bodySm" tone="subdued">Default border</Text>
          <Divider />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Success border</Text>
          <Divider borderColor="border-success" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Warning border</Text>
          <Divider borderColor="border-warning" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Critical border</Text>
          <Divider borderColor="border-critical" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Highlight border</Text>
          <Divider borderColor="border-highlight" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Inverse border</Text>
          <Divider borderColor="border-inverse" />
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const ThicknessVariations: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Border Thickness Variations</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <Text as="p" variant="bodySm" tone="subdued">No border (for comparison)</Text>
          <div style={{ height: '1px', backgroundColor: 'transparent' }} />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Base thickness (default)</Text>
          <Divider borderWidth="base" />
        </div>

        <div>
          <Text as="p" variant="bodySm" tone="subdued">Thick border</Text>
          <Divider borderWidth="thick" />
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const BetweenButtons: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '16px' }}>Action Groups</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="primary">Save Changes</Button>
          <Button variant="secondary">Save Draft</Button>
        </div>

        <Divider />

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="plain">Preview</Button>
          <Button variant="plain">Export</Button>
        </div>

        <Divider />

        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="critical">Delete</Button>
          <Button variant="plain">Cancel</Button>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const TimelineDividers: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '20px' }}>Order Timeline</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text as="h4" variant="headingSm">Order Placed</Text>
            <Badge>Nov 3, 2025</Badge>
          </div>
          <Text as="p" variant="bodySm" tone="subdued">Customer order has been received.</Text>
        </div>

        <Divider borderColor="border-success" />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text as="h4" variant="headingSm">Processing</Text>
            <Badge status="attention">In Progress</Badge>
          </div>
          <Text as="p" variant="bodySm" tone="subdued">Order is being prepared for shipment.</Text>
        </div>

        <Divider borderColor="border-warning" />

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text as="h4" variant="headingSm">Shipped</Text>
            <Badge status="info">Pending</Badge>
          </div>
          <Text as="p" variant="bodySm" tone="subdued">Waiting for shipment confirmation.</Text>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const ContentSections: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Product Documentation</Text>

      <div>
        <Text as="h4" variant="headingMd">📝 Overview</Text>
        <Text as="p" variant="bodyMd" style={{ marginBottom: '16px' }}>
          Comprehensive product documentation including features, specifications, and usage guidelines.
        </Text>

        <Divider />

        <Text as="h4" variant="headingMd">🚀 Getting Started</Text>
        <Text as="p" variant="bodyMd" style={{ marginBottom: '16px' }}>
          Quick start guide to help you set up and configure the product for optimal performance.
        </Text>

        <Divider borderColor="border-highlight" />

        <Text as="h4" variant="headingMd">⚙️ Configuration</Text>
        <Text as="p" variant="bodyMd" style={{ marginBottom: '16px' }}>
          Detailed configuration options and customizations to tailor the product to your needs.
        </Text>

        <Divider />

        <Text as="h4" variant="headingMd">🔧 Troubleshooting</Text>
        <Text as="p" variant="bodyMd">
          Common issues and solutions to help you resolve problems quickly and efficiently.
        </Text>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const PriceComparison: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px', textAlign: 'center' }}>Pricing Plans</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          padding: '16px',
          border: '1px solid #e1e3e5',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text as="h4" variant="headingSm">Basic Plan</Text>
              <Text as="p" variant="headingMd">$9/month</Text>
            </div>
            <Button>Choose Basic</Button>
          </div>
        </div>

        <Divider borderWidth="thick" borderColor="border-warning" />

        <div style={{
          padding: '16px',
          border: '2px solid #ff9800',
          borderRadius: '8px',
          backgroundColor: '#fff3cd'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <Text as="h4" variant="headingSm">Professional Plan</Text>
                <Badge status="attention">Popular</Badge>
              </div>
              <Text as="p" variant="headingMd">$29/month</Text>
            </div>
            <Button variant="primary">Choose Pro</Button>
          </div>
        </div>

        <Divider borderWidth="thick" borderColor="border-warning" />

        <div style={{
          padding: '16px',
          border: '1px solid #e1e3e5',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text as="h4" variant="headingSm">Enterprise Plan</Text>
              <Text as="p" variant="headingMd">$99/month</Text>
            </div>
            <Button>Choose Enterprise</Button>
          </div>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const StatusDividers: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd" style={{ marginBottom: '20px' }}>System Status</Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#4caf50'
          }} />
          <Text as="p" variant="bodyMd">All systems operational</Text>
        </div>

        <Divider borderColor="border-success" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#ff9800'
          }} />
          <Text as="p" variant="bodyMd">Maintenance scheduled for tonight</Text>
        </div>

        <Divider borderColor="border-warning" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#f44336'
          }} />
          <Text as="p" variant="bodyMd">Payment gateway issue detected</Text>
        </div>

        <Divider borderColor="border-critical" borderWidth="thick" />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#4caf50'
          }} />
          <Text as="p" variant="bodyMd">Email service restored</Text>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const FormSections: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingLg" style={{ marginBottom: '20px' }}>Customer Registration</Text>

      <div>
        <Text as="h4" variant="headingMd" style={{ marginBottom: '12px' }}>Personal Information</Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Full Name Input</Text>
          </div>

          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Email Input</Text>
          </div>

          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Phone Input</Text>
          </div>
        </div>

        <Divider borderColor="border-highlight" />

        <Text as="h4" variant="headingMd" style={{ marginBottom: '12px', marginTop: '20px' }}>Account Preferences</Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Username Input</Text>
          </div>

          <div style={{
            padding: '12px',
            border: '1px dashed #d2d2d7',
            borderRadius: '4px',
            backgroundColor: '#fafafa'
          }}>
            <Text as="p" variant="bodySm">Password Input</Text>
          </div>
        </div>

        <Divider />

        <Text as="h4" variant="headingMd" style={{ marginBottom: '12px', marginTop: '20px' }}>Notification Settings</Text>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            <Text as="p" variant="bodySm">Email notifications</Text>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" defaultChecked />
            <Text as="p" variant="bodySm">SMS notifications</Text>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" />
            <Text as="p" variant="bodySm">Push notifications</Text>
          </label>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <Button variant="primary">Create Account</Button>
          <Button variant="plain">Cancel</Button>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};

export const VerticalSpacing: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Card sectioned>
        <Text as="h3" variant="headingMd" style={{ marginBottom: '8px' }}>Content Above Divider</Text>
        <Text as="p" variant="bodySm" style={{ marginBottom: '0' }}>
          This content is immediately above the divider with minimal spacing.
        </Text>
      </Card>

      <Divider />

      <Card sectioned>
        <Text as="h3" variant="headingMd" style={{ marginBottom: '8px' }}>Content Below Divider</Text>
        <Text as="p" variant="bodySm" style={{ marginBottom: '0' }}>
          This content is immediately below the divider with minimal spacing.
        </Text>
      </Card>

      <Divider borderWidth="thick" borderColor="border-highlight" />

      <Card sectioned>
        <Text as="h3" variant="headingMd" style={{ marginBottom: '8px' }}>After Thick Divider</Text>
        <Text as="p" variant="bodySm" style={{ marginBottom: '0' }}>
          This content follows a thick, highlighted divider for emphasis.
        </Text>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('divider', 'default'),
  },

};