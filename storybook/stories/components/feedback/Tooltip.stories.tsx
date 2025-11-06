import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button, Text, Icon, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tooltips provide contextual information when users hover over or focus on an element. They\'re perfect for explaining icons, providing additional context, or showing brief help text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    children: {
      control: 'text',
      description: 'The element that triggers the tooltip',
    },
    preferredPosition: {
      control: 'select',
      options: ['above', 'below', 'mostSpace'],
      description: 'Preferred tooltip position',
    },
    preferredAlignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Preferred horizontal alignment',
    },
    active: {
      control: 'boolean',
      description: 'Whether the tooltip is visible',
    },
    dismissOnMouseOut: {
      control: 'boolean',
      description: 'Hide tooltip when mouse leaves',
    },
    width: {
      control: 'select',
      options: ['default', 'wide'],
      description: 'Tooltip width',
    },
    persistOnHover: {
      control: 'boolean',
      description: 'Keep tooltip open when hovering over content',
    },
    hasUnderline: {
      control: 'boolean',
      description: 'Add underline to tooltip trigger',
    },
    light: {
      control: 'boolean',
      description: 'Use light color scheme',
    },
    zIndexOverride: {
      control: 'number',
      description: 'Override z-index value',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Tooltip content="This is helpful tooltip text">
        <Button>Hover over me</Button>
      </Tooltip>
    </div>
  ),
};

export const WithText: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Tooltip content="Click here to view detailed order information and tracking status">
        <span style={{
          textDecoration: 'underline',
          cursor: 'help',
          color: '#007ace'
        }}>
          Order details
        </span>
      </Tooltip>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="This product is currently out of stock">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>⚠️</span>
        </div>
      </Tooltip>

      <Tooltip content="Information verified and confirmed">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>✅</span>
        </div>
      </Tooltip>

      <Tooltip content="Requires immediate attention">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>🔔</span>
        </div>
      </Tooltip>

      <Tooltip content="Help and documentation">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>❓</span>
        </div>
      </Tooltip>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
      placeItems: 'center'
    }}>
      {/* Top row */}
      <Tooltip
        content="Above Left"
        preferredPosition="above"
        preferredAlignment="left"
      >
        <Button>Top Left</Button>
      </Tooltip>

      <Tooltip
        content="Above Center"
        preferredPosition="above"
        preferredAlignment="center"
      >
        <Button>Top Center</Button>
      </Tooltip>

      <Tooltip
        content="Above Right"
        preferredPosition="above"
        preferredAlignment="right"
      >
        <Button>Top Right</Button>
      </Tooltip>

      {/* Middle row */}
      <Tooltip
        content="Left Side"
        preferredPosition="mostSpace"
        preferredAlignment="left"
      >
        <Button>Left</Button>
      </Tooltip>

      <Tooltip
        content="Center (Auto)"
        preferredPosition="mostSpace"
      >
        <Button>Center</Button>
      </Tooltip>

      <Tooltip
        content="Right Side"
        preferredPosition="mostSpace"
        preferredAlignment="right"
      >
        <Button>Right</Button>
      </Tooltip>

      {/* Bottom row */}
      <Tooltip
        content="Below Left"
        preferredPosition="below"
        preferredAlignment="left"
      >
        <Button>Bottom Left</Button>
      </Tooltip>

      <Tooltip
        content="Below Center"
        preferredPosition="below"
        preferredAlignment="center"
      >
        <Button>Bottom Center</Button>
      </Tooltip>

      <Tooltip
        content="Below Right"
        preferredPosition="below"
        preferredAlignment="right"
      >
        <Button>Bottom Right</Button>
      </Tooltip>
    </div>
  ),
};

export const WideTooltip: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Tooltip
        width="wide"
        content="This is a wide tooltip that can contain more detailed information. It's useful when you need to provide longer explanations or multiple lines of text in a single tooltip."
      >
        <Button>Wide Tooltip Example</Button>
      </Tooltip>
    </div>
  ),
};

export const InteractiveTooltip: Story = {
  render: () => {
    const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);

    const handleTooltipHover = (tooltipName: string) => {
      setActiveTooltip(tooltipName);
    };

    const handleTooltipLeave = () => {
      setActiveTooltip(null);
    };

    return (
      <div style={{ padding: '40px' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Tooltip
            content="Product status: In stock and ready to ship"
            active={activeTooltip === 'product'}
            onMouseEnter={() => handleTooltipHover('product')}
            onMouseLeave={handleTooltipLeave}
          >
            <Badge status="success">Available</Badge>
          </Tooltip>

          <Tooltip
            content="Payment processed successfully"
            active={activeTooltip === 'payment'}
            onMouseEnter={() => handleTooltipHover('payment')}
            onMouseLeave={handleTooltipLeave}
          >
            <Badge status="info">Paid</Badge>
          </Tooltip>

          <Tooltip
            content="Order is being prepared for shipment"
            active={activeTooltip === 'order'}
            onMouseEnter={() => handleTooltipHover('order')}
            onMouseLeave={handleTooltipLeave}
          >
            <Badge status="warning">Processing</Badge>
          </Tooltip>

          <Tooltip
            content="Delivery attempted - customer not available"
            active={activeTooltip === 'delivery'}
            onMouseEnter={() => handleTooltipHover('delivery')}
            onMouseLeave={handleTooltipLeave}
          >
            <Badge status="critical">Failed</Badge>
          </Tooltip>
        </div>

        {activeTooltip && (
          <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f1f2f4', borderRadius: '4px' }}>
            <Text variant="bodySm">Active tooltip: {activeTooltip}</Text>
          </div>
        )}
      </div>
    );
  },
};

export const FormHelpText: Story = {
  render: () => (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text as="label">Password</Text>
        <Tooltip
          content="Password must be at least 8 characters long and include uppercase, lowercase, and numbers"
          hasUnderline
        >
          <span style={{ cursor: 'help' }}>Help</span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text as="label">SKU</Text>
        <Tooltip
          content="Stock Keeping Unit - unique identifier for this product variant"
          hasUnderline
        >
          <span style={{ cursor: 'help' }}>What's this?</span>
        </Tooltip>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text as="label">Tax Rate</Text>
        <Tooltip
          content="Enter tax rate as a decimal (e.g., 0.08 for 8%) or leave blank to use default"
          hasUnderline
        >
          <span style={{ cursor: 'help' }}>Format help</span>
        </Tooltip>
      </div>
    </div>
  ),
};

export const TableTooltips: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f6f6f7' }}>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <Tooltip content="Unique identifier for each order">
                  Order ID
                </Tooltip>
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <Tooltip content="Current status of the order in fulfillment process">
                  Status
                </Tooltip>
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <Tooltip content="Total amount including taxes and shipping">
                  Total
                </Tooltip>
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                <Tooltip content="Date when order was placed">
                  Date
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                <Tooltip content="Click to view order details">
                  <span style={{ color: '#007ace', cursor: 'pointer', textDecoration: 'underline' }}>
                    #1001
                  </span>
                </Tooltip>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                <Tooltip content="Order has been shipped and is in transit">
                  <Badge status="info">Shipped</Badge>
                </Tooltip>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>$299.99</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Nov 5, 2025</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                <Tooltip content="Click to view order details">
                  <span style={{ color: '#007ace', cursor: 'pointer', textDecoration: 'underline' }}>
                    #1002
                  </span>
                </Tooltip>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                <Tooltip content="Payment has been received and confirmed">
                  <Badge status="success">Paid</Badge>
                </Tooltip>
              </td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>$149.99</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>Nov 4, 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  ),
};

export const LightTheme: Story = {
  render: () => (
    <div style={{ padding: '40px', backgroundColor: '#1a1a1a', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Tooltip
          content="Light theme tooltip on dark background"
          light
        >
          <Button>Light Tooltip</Button>
        </Tooltip>

        <Tooltip
          content="Standard tooltip (auto-theme)"
        >
          <Button primary>Standard Tooltip</Button>
        </Tooltip>

        <Tooltip
          content="Another light themed tooltip"
          light
          width="wide"
        >
          <Button variant="plain">Wide Light</Button>
        </Tooltip>
      </div>
    </div>
  ),
};

export const PersistentOnHover: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Tooltip
        content="This tooltip stays visible when you hover over the tooltip content itself. Try moving your mouse from the button to the tooltip."
        persistOnHover
        width="wide"
      >
        <Button>Hover and move to tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Tooltip
        width="wide"
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant="headingSm" as="h3">Shipping Information</Text>
            <Text variant="bodySm" as="p">
              • Standard: 5-7 business days<br />
              • Express: 2-3 business days<br />
              • Overnight: Next business day
            </Text>
            <Text variant="bodySm" as="p">
              Free shipping on orders over $50
            </Text>
          </div>
        }
      >
        <Button>Shipping Details</Button>
      </Tooltip>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#2e7d32',
            borderRadius: '50%'
          }} />
          <Tooltip content="All systems operational">
            <span style={{ cursor: 'help' }}>● Online</span>
          </Tooltip>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#ed6c02',
            borderRadius: '50%'
          }} />
          <Tooltip content="Scheduled maintenance in progress">
            <span style={{ cursor: 'help' }}>● Maintenance</span>
          </Tooltip>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#d32f2f',
            borderRadius: '50%'
          }} />
          <Tooltip content="Service temporarily unavailable">
            <span style={{ cursor: 'help' }}>● Offline</span>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <Text variant="headingMd" as="h2">Accessible Tooltips</Text>
          <Text variant="bodyMd" as="p">
            These tooltips include proper accessibility features:
          </Text>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Tooltip
            content="Focus this button and press Enter or Space to trigger the tooltip"
            active
          >
            <Button>Focusable Button</Button>
          </Tooltip>

          <Tooltip
            content="This link has keyboard navigation support"
            hasUnderline
          >
            <a
              href="#"
              style={{ color: '#007ace', cursor: 'pointer' }}
              onClick={(e) => e.preventDefault()}
            >
              Accessible Link
            </a>
          </Tooltip>
        </div>

        <div style={{
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #dee2e6'
        }}>
          <Text variant="bodySm" as="p">
            <strong>Keyboard Navigation:</strong><br />
            • Tab to focus on tooltip trigger<br />
            • Enter/Space to activate tooltip<br />
            • Screen readers will announce tooltip content<br />
            • Focus is properly managed
          </Text>
        </div>
      </div>
    </div>
  ),
};