import type { Meta, StoryObj } from '@storybook/react';
import { Truncate, Text, Card, InlineStack, DataTable, List, Tooltip, Badge } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Foundation/Truncate',
  component: Truncate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Truncate is used to shorten text content that exceeds its container width. It displays an ellipsis (...) to indicate truncated content. Perfect for maintaining clean layouts when displaying long text in constrained spaces like tables, lists, and cards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content to truncate',
    },
  },
} satisfies Meta<typeof Truncate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <Truncate>
        This is a very long text that will be truncated when it exceeds the container width. The ellipsis will appear at the end.
      </Truncate>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('truncate', 'default'),
  },
};

export const InTableCell: Story = {
  render: () => {
    const rows = [
      [
        <Truncate key="1">Premium Wireless Noise-Canceling Over-Ear Headphones with Bluetooth 5.0</Truncate>,
        'Electronics',
        '$299.99',
        <Badge key="badge1" status="success">In Stock</Badge>,
      ],
      [
        <Truncate key="2">Organic Fair Trade Single-Origin Colombian Coffee Beans (Dark Roast)</Truncate>,
        'Food & Beverage',
        '$24.99',
        <Badge key="badge2" status="success">In Stock</Badge>,
      ],
      [
        <Truncate key="3">Professional Stainless Steel Chef's Knife Set with Ergonomic Handles</Truncate>,
        'Kitchen',
        '$149.99',
        <Badge key="badge3" status="attention">Low Stock</Badge>,
      ],
      [
        <Truncate key="4">Ultra-Lightweight Carbon Fiber Mountain Bike with 21-Speed Shimano Gears</Truncate>,
        'Sports',
        '$899.99',
        <Badge key="badge4" status="critical">Out of Stock</Badge>,
      ],
    ];

    return (
      <div style={{ width: '900px' }}>
        <DataTable
          columnContentTypes={['text', 'text', 'numeric', 'text']}
          headings={['Product Name', 'Category', 'Price', 'Status']}
          rows={rows}
          hasZebraStriping
        />
      </div>
    );
  },
};

export const InListItem: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card>
        <Text variant="headingMd" as="h2">Recent Notifications</Text>
        <div style={{ marginTop: '16px' }}>
          <List>
            <List.Item>
              <Truncate>
                Order #12345 has been shipped and is expected to arrive at 123 Main Street, Apartment 4B, Springfield by Thursday, November 14th
              </Truncate>
            </List.Item>
            <List.Item>
              <Truncate>
                Your subscription to Premium Business Analytics Dashboard will renew automatically on December 1st for $299/month
              </Truncate>
            </List.Item>
            <List.Item>
              <Truncate>
                New message from customer support regarding your inquiry about product compatibility with existing systems
              </Truncate>
            </List.Item>
            <List.Item>
              <Truncate>
                System maintenance scheduled for Sunday, November 10th from 2:00 AM to 6:00 AM EST - some features may be unavailable
              </Truncate>
            </List.Item>
          </List>
        </div>
      </Card>
    </div>
  ),
};

export const WithTooltip: Story = {
  render: () => {
    const longTexts = [
      'Premium Wireless Noise-Canceling Over-Ear Headphones with Bluetooth 5.0 and 30-Hour Battery Life',
      'Organic Fair Trade Single-Origin Colombian Coffee Beans (Dark Roast, 2lb Bag)',
      'Professional Stainless Steel Chef\'s Knife Set with Ergonomic Handles and Storage Block',
      'Ultra-Lightweight Carbon Fiber Mountain Bike with 21-Speed Shimano Gears and Hydraulic Disc Brakes',
    ];

    return (
      <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Text variant="headingMd" as="h3">Product Names (Hover to see full text)</Text>
        {longTexts.map((text, index) => (
          <div key={index} style={{ padding: '12px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
            <Tooltip content={text} preferredPosition="above">
              <div>
                <Truncate>{text}</Truncate>
              </div>
            </Tooltip>
          </div>
        ))}
      </div>
    );
  },
};

export const MultilineTruncation: Story = {
  render: () => {
    const products = [
      {
        title: 'Premium Wireless Headphones',
        description: 'Experience exceptional sound quality with our premium wireless headphones featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for travel, work, or relaxation. Compatible with all Bluetooth devices.',
      },
      {
        title: 'Smart Fitness Watch',
        description: 'Track your health and fitness goals with this advanced smartwatch. Features include heart rate monitoring, GPS tracking, sleep analysis, and waterproof design. Sync with your smartphone for notifications and calls. Battery lasts up to 7 days.',
      },
      {
        title: 'Portable Bluetooth Speaker',
        description: 'Take your music anywhere with this compact and powerful Bluetooth speaker. Features 360-degree sound, 12-hour battery life, and waterproof construction. Pairs easily with any device and includes built-in microphone for hands-free calls.',
      },
    ];

    return (
      <div style={{ width: '800px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Text variant="headingMd" as="h3">Product Cards with Multi-line Truncation</Text>
        {products.map((product, index) => (
          <Card key={index}>
            <div style={{ padding: '16px' }}>
              <Text variant="headingMd" as="h4">{product.title}</Text>
              <div style={{
                marginTop: '8px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.5',
              }}>
                <Text variant="bodyMd" as="p" tone="subdued">
                  {product.description}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const ResponsiveTruncation: Story = {
  render: () => {
    const longText = 'This text will truncate differently depending on the screen size. Try resizing your browser window to see how the truncation adapts to different viewport widths.';

    return (
      <div style={{ width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Responsive Truncation Breakpoints</Text>

        <div style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">Mobile (320px)</Text>
          <div style={{ width: '320px', marginTop: '8px' }}>
            <Truncate>{longText}</Truncate>
          </div>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">Tablet (768px)</Text>
          <div style={{ width: '768px', marginTop: '8px' }}>
            <Truncate>{longText}</Truncate>
          </div>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">Desktop (1024px)</Text>
          <div style={{ width: '1024px', marginTop: '8px' }}>
            <Truncate>{longText}</Truncate>
          </div>
        </div>
      </div>
    );
  },
};

export const ProductCardTruncation: Story = {
  render: () => {
    const products = [
      {
        id: 1,
        name: 'Premium Wireless Noise-Canceling Bluetooth Over-Ear Headphones with Extended Battery',
        price: '$299.99',
        category: 'Electronics',
        sku: 'WH-1000XM4-BLK-NA',
      },
      {
        id: 2,
        name: 'Organic Fair Trade Single-Origin Colombian Dark Roast Coffee Beans',
        price: '$24.99',
        category: 'Food & Beverage',
        sku: 'COFFEE-COL-DR-2LB',
      },
      {
        id: 3,
        name: 'Professional 8-Piece Stainless Steel Chef\'s Knife Set with Wooden Block',
        price: '$149.99',
        category: 'Kitchen & Dining',
        sku: 'KNIFE-PRO-8PC-SS',
      },
    ];

    return (
      <div style={{ width: '900px' }}>
        <InlineStack gap="400" wrap>
          {products.map((product) => (
            <div key={product.id} style={{ width: 'calc(33.333% - 12px)' }}>
              <Card>
                <div style={{ padding: '16px' }}>
                  <Tooltip content={product.name}>
                    <div style={{ marginBottom: '8px' }}>
                      <Text variant="headingSm" as="h3">
                        <Truncate>{product.name}</Truncate>
                      </Text>
                    </div>
                  </Tooltip>

                  <div style={{ marginBottom: '8px' }}>
                    <Text variant="bodyLg" as="p" fontWeight="bold">{product.price}</Text>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Text variant="bodySm" as="p" tone="subdued">
                      <Truncate>{product.category}</Truncate>
                    </Text>
                  </div>

                  <div>
                    <Text variant="bodySm" as="p" tone="subdued">
                      SKU: <Truncate>{product.sku}</Truncate>
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </InlineStack>
      </div>
    );
  },
};

export const VariableWidthContainers: Story = {
  render: () => {
    const text = 'This is a demonstration of how text truncation behaves in containers of different widths. The same text will truncate at different points.';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
        <Text variant="headingMd" as="h3">Variable Width Containers</Text>

        <div style={{ padding: '12px', border: '2px solid #007ace', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">150px width</Text>
          <div style={{ width: '150px', marginTop: '8px' }}>
            <Truncate>{text}</Truncate>
          </div>
        </div>

        <div style={{ padding: '12px', border: '2px solid #007ace', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">300px width</Text>
          <div style={{ width: '300px', marginTop: '8px' }}>
            <Truncate>{text}</Truncate>
          </div>
        </div>

        <div style={{ padding: '12px', border: '2px solid #007ace', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">500px width</Text>
          <div style={{ width: '500px', marginTop: '8px' }}>
            <Truncate>{text}</Truncate>
          </div>
        </div>

        <div style={{ padding: '12px', border: '2px solid #007ace', borderRadius: '8px' }}>
          <Text variant="bodySm" as="p" tone="subdued">800px width</Text>
          <div style={{ width: '800px', marginTop: '8px' }}>
            <Truncate>{text}</Truncate>
          </div>
        </div>
      </div>
    );
  },
};

export const AccessibilityExample: Story = {
  render: () => {
    const items = [
      {
        title: 'Screen Reader Accessibility Test',
        description: 'This truncated text is fully accessible to screen readers. Screen readers will read the entire text content even though it is visually truncated. The full text is: "Premium Wireless Noise-Canceling Over-Ear Headphones with Bluetooth 5.0 and 30-Hour Battery Life"',
        fullText: 'Premium Wireless Noise-Canceling Over-Ear Headphones with Bluetooth 5.0 and 30-Hour Battery Life',
      },
      {
        title: 'Tooltip Enhancement',
        description: 'For sighted users, hover to see the complete text in a tooltip. This provides a visual way to access the full content without changing the layout.',
        fullText: 'Professional Stainless Steel Chef\'s Knife Set with Ergonomic Handles and Premium Storage Block',
      },
    ];

    return (
      <div style={{ width: '700px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <Text variant="headingMd" as="h3">Accessibility Best Practices</Text>
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #dee2e6'
          }}>
            <Text variant="bodySm" as="p">
              <strong>Accessibility Features:</strong><br />
              • Screen readers access full text content<br />
              • Tooltips provide visual access to complete text<br />
              • No information loss for assistive technology users<br />
              • Keyboard navigation supported
            </Text>
          </div>
        </div>

        {items.map((item, index) => (
          <Card key={index}>
            <div style={{ padding: '16px' }}>
              <Text variant="headingSm" as="h4">{item.title}</Text>
              <div style={{ marginTop: '8px', marginBottom: '12px' }}>
                <Text variant="bodySm" as="p" tone="subdued">
                  {item.description}
                </Text>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                border: '1px solid #e1e3e5'
              }}>
                <Tooltip content={item.fullText} preferredPosition="above">
                  <div>
                    <Text variant="bodyMd" as="p">
                      <Truncate>{item.fullText}</Truncate>
                    </Text>
                  </div>
                </Tooltip>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const DataTableExample: Story = {
  render: () => {
    const rows = [
      [
        '#ORD-2024-001234',
        <Tooltip key="customer1" content="John Smith - Premium Account Member Since 2020">
          <div><Truncate>John Smith - Premium Account Member Since 2020</Truncate></div>
        </Tooltip>,
        <Tooltip key="email1" content="john.smith.customer@example-company-domain.com">
          <div><Truncate>john.smith.customer@example-company-domain.com</Truncate></div>
        </Tooltip>,
        <Tooltip key="product1" content="Premium Wireless Noise-Canceling Over-Ear Headphones with Bluetooth 5.0">
          <div><Truncate>Premium Wireless Noise-Canceling Over-Ear Headphones with Bluetooth 5.0</Truncate></div>
        </Tooltip>,
        '$299.99',
      ],
      [
        '#ORD-2024-001235',
        <Tooltip key="customer2" content="Sarah Johnson - Business Account Manager">
          <div><Truncate>Sarah Johnson - Business Account Manager</Truncate></div>
        </Tooltip>,
        <Tooltip key="email2" content="sarah.johnson.business@corporate-enterprise-solutions.com">
          <div><Truncate>sarah.johnson.business@corporate-enterprise-solutions.com</Truncate></div>
        </Tooltip>,
        <Tooltip key="product2" content="Ultra-Lightweight Carbon Fiber Mountain Bike with 21-Speed Shimano Gears">
          <div><Truncate>Ultra-Lightweight Carbon Fiber Mountain Bike with 21-Speed Shimano Gears</Truncate></div>
        </Tooltip>,
        '$899.99',
      ],
      [
        '#ORD-2024-001236',
        <Tooltip key="customer3" content="Michael Chen - Enterprise VIP Customer">
          <div><Truncate>Michael Chen - Enterprise VIP Customer</Truncate></div>
        </Tooltip>,
        <Tooltip key="email3" content="michael.chen.procurement@global-tech-innovations.co.uk">
          <div><Truncate>michael.chen.procurement@global-tech-innovations.co.uk</Truncate></div>
        </Tooltip>,
        <Tooltip key="product3" content="Professional Stainless Steel Chef's Knife Set with Ergonomic Handles">
          <div><Truncate>Professional Stainless Steel Chef's Knife Set with Ergonomic Handles</Truncate></div>
        </Tooltip>,
        '$149.99',
      ],
    ];

    return (
      <div style={{ width: '1100px' }}>
        <Text variant="headingMd" as="h3" style={{ marginBottom: '16px' }}>
          Order Management (Hover cells for full content)
        </Text>
        <DataTable
          columnContentTypes={['text', 'text', 'text', 'text', 'numeric']}
          headings={['Order ID', 'Customer', 'Email', 'Product', 'Total']}
          rows={rows}
          hasZebraStriping
          increasedTableDensity
        />
      </div>
    );
  },
};

export const EmailSubjects: Story = {
  render: () => {
    const emails = [
      {
        from: 'Sarah Johnson',
        subject: 'RE: Q4 Budget Review Meeting - Final Presentation Deck and Updated Financial Projections',
        time: '2 hours ago',
        unread: true,
      },
      {
        from: 'Marketing Team',
        subject: 'New Campaign Launch: Black Friday Sale 2024 - Promotional Materials and Timeline',
        time: '4 hours ago',
        unread: true,
      },
      {
        from: 'IT Support',
        subject: 'System Maintenance Notification: Scheduled Downtime This Weekend for Server Upgrades',
        time: '1 day ago',
        unread: false,
      },
      {
        from: 'HR Department',
        subject: 'Important: Annual Performance Review Process - Guidelines and Submission Deadlines',
        time: '2 days ago',
        unread: false,
      },
    ];

    return (
      <div style={{ width: '700px' }}>
        <Card>
          <div style={{ padding: '16px' }}>
            <Text variant="headingMd" as="h3">Inbox</Text>
          </div>
          <div>
            {emails.map((email, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  borderTop: '1px solid #e1e3e5',
                  backgroundColor: email.unread ? '#f3f9ff' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <Text variant="bodyMd" as="p" fontWeight={email.unread ? 'semibold' : 'regular'}>
                    {email.from}
                  </Text>
                  <Text variant="bodySm" as="p" tone="subdued">
                    {email.time}
                  </Text>
                </div>
                <Tooltip content={email.subject} preferredPosition="above">
                  <div>
                    <Text variant="bodySm" as="p" tone="subdued">
                      <Truncate>{email.subject}</Truncate>
                    </Text>
                  </div>
                </Tooltip>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  },
};
