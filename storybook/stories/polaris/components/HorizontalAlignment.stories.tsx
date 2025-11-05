import type { Meta, StoryObj } from '@storybook/react';
import { HorizontalAlignment, Card, Text, InlineStack, BlockStack, Button, Badge } from '@shopify/polaris';
import { CircleInformationMajor, CheckmarkMinor, AlertMinor, SearchMinor } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Utilities/HorizontalAlignment',
  component: HorizontalAlignment,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HorizontalAlignment utilities control the horizontal positioning of elements within a container. They help maintain consistent spacing and alignment across different content types and layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'space-around', 'space-between', 'space-evenly'],
      description: 'Horizontal alignment value',
    },
    blockAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'space-around', 'space-between', 'space-evenly'],
      description: 'Block alignment for flex items',
    },
    inlineAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'space-around', 'space-between', 'space-evenly'],
      description: 'Inline alignment for flex items',
    },
  },
} satisfies Meta<typeof HorizontalAlignment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ width: '500px', height: '100px', border: '2px dashed #ccc', position: 'relative' }}>
        <HorizontalAlignment align="center">
          <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '4px' }}>
            <Text as="p" variant="bodyMd">Horizontally centered content</Text>
          </div>
        </HorizontalAlignment>
      </div>
    );
  },
};

export const BasicAlignment: Story = {
  render: () => {
    const alignments = [
      { align: 'start' as const, label: 'Start (Left)' },
      { align: 'center' as const, label: 'Center' },
      { align: 'end' as const, label: 'End (Right)' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        {alignments.map(({ align, label }) => (
          <Card key={align}>
            <div style={{
              height: '80px',
              border: '2px dashed #e1e3e5',
              position: 'relative',
              padding: '8px'
            }}>
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                fontSize: '12px',
                color: '#666',
                fontWeight: 'bold'
              }}>
                {label}
              </div>
              <HorizontalAlignment align={align}>
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '4px'
                }}>
                  <Text as="p" variant="bodyMd">Aligned Content</Text>
                </div>
              </HorizontalAlignment>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const DistributionAlignment: Story = {
  render: () => {
    const distributions = [
      { align: 'space-around' as const, label: 'Space Around' },
      { align: 'space-between' as const, label: 'Space Between' },
      { align: 'space-evenly' as const, label: 'Space Evenly' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '700px' }}>
        {distributions.map(({ align, label }) => (
          <Card key={align}>
            <div style={{ padding: '16px' }}>
              <Text as="h4" variant="headingSm">{label}</Text>
              <div style={{
                height: '80px',
                border: '2px dashed #e1e3e5',
                marginTop: '12px',
                position: 'relative'
              }}>
                <HorizontalAlignment align={align}>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '4px'
                  }}>
                    <Text as="p" variant="bodySm">Item 1</Text>
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#dcfce7',
                    borderRadius: '4px'
                  }}>
                    <Text as="p" variant="bodySm">Item 2</Text>
                  </div>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: '#fce7f3',
                    borderRadius: '4px'
                  }}>
                    <Text as="p" variant="bodySm">Item 3</Text>
                  </div>
                </HorizontalAlignment>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const NavigationAlignment: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Navigation Alignment Examples</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Different alignment patterns for navigation elements
        </Text>

        <div style={{ marginTop: '20px' }}>
          <BlockStack gap="300">
            {/* Left Aligned Navigation */}
            <div>
              <Text as="h4" variant="headingSm">Left Aligned Navigation</Text>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '12px 16px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <HorizontalAlignment align="start">
                  <InlineStack gap="400">
                    <Button plain>Home</Button>
                    <Button plain>Products</Button>
                    <Button plain>Orders</Button>
                    <Button plain>Customers</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>

            {/* Center Aligned Navigation */}
            <div>
              <Text as="h4" variant="headingSm">Center Aligned Navigation</Text>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '12px 16px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #0ea5e9'
              }}>
                <HorizontalAlignment align="center">
                  <InlineStack gap="400">
                    <Button plain>Dashboard</Button>
                    <Button plain>Analytics</Button>
                    <Button primary>Reports</Button>
                    <Button plain>Settings</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>

            {/* Space Between Navigation */}
            <div>
              <Text as="h4" variant="headingSm">Space Between Navigation</Text>
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '12px 16px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #f59e0b'
              }}>
                <HorizontalAlignment align="space-between">
                  <InlineStack gap="400">
                    <Button plain>Logo</Button>
                    <Button plain>Menu</Button>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Button plain>Profile</Button>
                    <Button plain>Logout</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const FormLayouts: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Form Layouts with Horizontal Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Different alignment patterns for form elements
        </Text>

        <div style={{ marginTop: '20px' }}>
          <BlockStack gap="400">
            {/* Start Aligned Form */}
            <div>
              <Text as="h4" variant="headingSm">Start Aligned Form</Text>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <BlockStack gap="300">
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Name</label>
                    <HorizontalAlignment align="start">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #e1e3e5',
                          borderRadius: '4px',
                          fontSize: '14px',
                          width: '100%'
                        }}
                      />
                    </HorizontalAlignment>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Email</label>
                    <HorizontalAlignment align="start">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #e1e3e5',
                          borderRadius: '4px',
                          fontSize: '14px',
                          width: '100%'
                        }}
                      />
                    </HorizontalAlignment>
                  </div>
                </BlockStack>
              </div>
            </div>

            {/* Space Between Actions */}
            <div>
              <Text as="h4" variant="headingSm">Space Between Actions</Text>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '20px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #0ea5e9'
              }}>
                <div style={{ marginBottom: '16px' }}>
                  <Text as="p" variant="bodyMd">
                    Form content with actions distributed horizontally
                  </Text>
                </div>
                <HorizontalAlignment align="space-between">
                  <Button size="small" plain>Cancel</Button>
                  <InlineStack gap="200">
                    <Button size="small">Save Draft</Button>
                    <Button size="small" primary>Submit</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>

            {/* Center Aligned Actions */}
            <div>
              <Text as="h4" variant="headingSm">Center Aligned Actions</Text>
              <div style={{
                backgroundColor: '#dcfce7',
                padding: '20px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #22c55e'
              }}>
                <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                  <Text as="p" variant="bodyMd">
                    Confirmation dialog with centered actions
                  </Text>
                </div>
                <HorizontalAlignment align="center">
                  <InlineStack gap="200">
                    <Button size="small">No, Cancel</Button>
                    <Button size="small" primary destructive>Yes, Delete</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const CardContentAlignment: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Card Content Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Different horizontal alignment patterns for card content
        </Text>

        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {/* Start Aligned Card */}
            <Card>
              <div style={{ padding: '20px' }}>
                <HorizontalAlignment align="start">
                  <div style={{ width: '100%' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#dbeafe',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}>
                      <Text as="span" variant="headingMd">📊</Text>
                    </div>
                    <Text as="h4" variant="headingMd">Analytics</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Track your performance metrics and insights
                    </Text>
                    <div style={{ marginTop: '12px' }}>
                      <Button size="small">View Dashboard</Button>
                    </div>
                  </div>
                </HorizontalAlignment>
              </div>
            </Card>

            {/* Center Aligned Card */}
            <Card>
              <div style={{ padding: '20px' }}>
                <HorizontalAlignment align="center">
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#dcfce7',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      <Text as="span" variant="headingMd">🎯</Text>
                    </div>
                    <Text as="h4" variant="headingMd">Goals</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Set and achieve your business objectives
                    </Text>
                    <div style={{ marginTop: '12px' }}>
                      <Button size="small">Set Goals</Button>
                    </div>
                  </div>
                </HorizontalAlignment>
              </div>
            </Card>

            {/* Space Between Card */}
            <Card>
              <div style={{ padding: '20px' }}>
                <HorizontalAlignment align="space-between">
                  <div>
                    <Text as="h4" variant="headingMd">Quick Stats</Text>
                    <Text as="p" variant="bodySm" tone="subdued">
                      Current performance metrics
                    </Text>
                  </div>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: '#fce7f3',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Text as="span" variant="headingMd">📈</Text>
                  </div>
                </HorizontalAlignment>
                <div style={{ marginTop: '16px' }}>
                  <HorizontalAlignment align="space-between">
                    <div>
                      <Text as="p" variant="headingLg">2,543</Text>
                      <Text as="p" variant="bodySm" tone="subdued">Total Users</Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <Text as="p" variant="headingLg">+12%</Text>
                      <Text as="p" variant="bodySm" tone="subdued">Growth</Text>
                    </div>
                  </HorizontalAlignment>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    );
  },
};

export const ButtonGroups: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Button Group Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Different alignment patterns for button groups
        </Text>

        <div style={{ marginTop: '20px' }}>
          <BlockStack gap="400">
            {/* Start Aligned Buttons */}
            <div>
              <Text as="h4" variant="headingSm">Start Aligned</Text>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                <HorizontalAlignment align="start">
                  <InlineStack gap="200">
                    <Button size="small">Primary</Button>
                    <Button size="small" outline>Secondary</Button>
                    <Button size="small" plain>Cancel</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>

            {/* Center Aligned Buttons */}
            <div>
              <Text as="h4" variant="headingSm">Center Aligned</Text>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                <HorizontalAlignment align="center">
                  <InlineStack gap="200">
                    <Button size="small">Previous</Button>
                    <Button size="small" primary>Next</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>

            {/* Space Between Buttons */}
            <div>
              <Text as="h4" variant="headingSm">Space Between</Text>
              <div style={{
                backgroundColor: '#fef3c7',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                <HorizontalAlignment align="space-between">
                  <Button size="small" plain>Back to Safety</Button>
                  <InlineStack gap="200">
                    <Button size="small">Save Draft</Button>
                    <Button size="small" primary>Publish</Button>
                  </InlineStack>
                </HorizontalAlignment>
              </div>
            </div>

            {/* Space Evenly Buttons */}
            <div>
              <Text as="h4" variant="headingSm">Space Evenly</Text>
              <div style={{
                backgroundColor: '#dcfce7',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                <HorizontalAlignment align="space-evenly">
                  <Button size="small">Day</Button>
                  <Button size="small" outline>Week</Button>
                  <Button size="small">Month</Button>
                  <Button size="small">Year</Button>
                </HorizontalAlignment>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const StatusAndBadges: Story = {
  render: () => {
    const statusItems = [
      { label: 'Online', status: 'success', badge: 'Active' },
      { label: 'Offline', status: 'critical', badge: 'Inactive' },
      { label: 'Away', status: 'warning', badge: 'Away' },
      { label: 'Busy', status: 'info', badge: 'Busy' },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Status and Badge Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Aligning status indicators and badges
        </Text>

        <div style={{ marginTop: '20px' }}>
          <BlockStack gap="300">
            {/* Start Aligned Status */}
            <div>
              <Text as="h4" variant="headingSm">Start Aligned Status</Text>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                {statusItems.map((item, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <HorizontalAlignment align="start">
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: item.status === 'success' ? '#22c55e' :
                                        item.status === 'critical' ? '#ef4444' :
                                        item.status === 'warning' ? '#f59e0b' : '#3b82f6',
                        marginRight: '12px',
                        flexShrink: 0
                      }} />
                      <Text as="p" variant="bodyMd" style={{ minWidth: '80px' }}>{item.label}</Text>
                      <Badge tone={item.status as any}>{item.badge}</Badge>
                    </HorizontalAlignment>
                  </div>
                ))}
              </div>
            </div>

            {/* Space Between Status */}
            <div>
              <Text as="h4" variant="headingSm">Space Between Status</Text>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                {statusItems.map((item, index) => (
                  <div key={index} style={{ marginBottom: '8px' }}>
                    <HorizontalAlignment align="space-between">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: item.status === 'success' ? '#22c55e' :
                                          item.status === 'critical' ? '#ef4444' :
                                          item.status === 'warning' ? '#f59e0b' : '#3b82f6',
                          flexShrink: 0
                        }} />
                        <Text as="p" variant="bodyMd">{item.label}</Text>
                      </div>
                      <Badge tone={item.status as any}>{item.badge}</Badge>
                    </HorizontalAlignment>
                  </div>
                ))}
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const ResponsiveAlignment: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Responsive Horizontal Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Alignment that adapts to different container sizes
        </Text>

        <div style={{ marginTop: '20px' }}>
          <BlockStack gap="300">
            {/* Narrow Container */}
            <div>
              <Text as="h4" variant="headingSm">Narrow Container</Text>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <div style={{ width: '300px' }}>
                  <HorizontalAlignment align="space-between">
                    <Button size="small" plain>← Back</Button>
                    <Text as="p" variant="bodyMd">Step 1 of 3</Text>
                    <Button size="small" primary>Next →</Button>
                  </HorizontalAlignment>
                </div>
              </div>
            </div>

            {/* Wide Container */}
            <div>
              <Text as="h4" variant="headingSm">Wide Container</Text>
              <div style={{
                backgroundColor: '#f0f9ff',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #0ea5e9'
              }}>
                <div style={{ width: '100%' }}>
                  <HorizontalAlignment align="space-between">
                    <InlineStack gap="400">
                      <Button size="small" plain>← Previous</Button>
                      <Button size="small" plain>Save Draft</Button>
                    </InlineStack>
                    <Text as="p" variant="bodyMd">Step 1 of 3: Basic Information</Text>
                    <InlineStack gap="200">
                      <Button size="small">Cancel</Button>
                      <Button size="small" primary>Next Step →</Button>
                    </InlineStack>
                  </HorizontalAlignment>
                </div>
              </div>
            </div>

            {/* Flexible Content */}
            <div>
              <Text as="h4" variant="headingSm">Flexible Content with Stretch</Text>
              <div style={{
                backgroundColor: '#dcfce7',
                padding: '16px',
                borderRadius: '4px',
                marginTop: '8px',
                border: '1px solid #22c55e'
              }}>
                <div style={{ width: '100%' }}>
                  <HorizontalAlignment align="stretch">
                    <div style={{
                      flex: 1,
                      backgroundColor: 'white',
                      padding: '12px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      border: '1px solid #e1e3e5'
                    }}>
                      <Text as="h5" variant="headingSm">Section 1</Text>
                      <Text as="p" variant="bodySm">Equal width content</Text>
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: 'white',
                      padding: '12px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      border: '1px solid #e1e3e5',
                      marginLeft: '12px'
                    }}>
                      <Text as="h5" variant="headingSm">Section 2</Text>
                      <Text as="p" variant="bodySm">Equal width content</Text>
                    </div>
                    <div style={{
                      flex: 1,
                      backgroundColor: 'white',
                      padding: '12px',
                      borderRadius: '4px',
                      textAlign: 'center',
                      border: '1px solid #e1e3e5',
                      marginLeft: '12px'
                    }}>
                      <Text as="h5" variant="headingSm">Section 3</Text>
                      <Text as="p" variant="bodySm">Equal width content</Text>
                    </div>
                  </HorizontalAlignment>
                </div>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};