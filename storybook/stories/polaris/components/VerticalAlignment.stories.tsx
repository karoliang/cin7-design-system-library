import type { Meta, StoryObj } from '@storybook/react';
import { VerticalAlignment, Card, Text, InlineStack, Button, Badge } from '@shopify/polaris';
import { CircleInformationMajor, CheckmarkMinor, AlertMinor } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Utilities/VerticalAlignment',
  component: VerticalAlignment,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'VerticalAlignment utilities control the vertical positioning of elements within a container. They help maintain consistent spacing and alignment across different content types and layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Vertical alignment value',
    },
    blockAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Block alignment for flex items',
    },
    inlineAlign: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Inline alignment for flex items',
    },
  },
} satisfies Meta<typeof VerticalAlignment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div style={{ width: '400px', height: '200px', border: '2px dashed #ccc', position: 'relative' }}>
        <VerticalAlignment align="center">
          <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '4px' }}>
            <Text as="p" variant="bodyMd">Vertically centered content</Text>
          </div>
        </VerticalAlignment>
      </div>
    );
  },
};

export const BasicAlignment: Story = {
  render: () => {
    const alignments = [
      { align: 'start' as const, label: 'Start (Top)' },
      { align: 'center' as const, label: 'Center' },
      { align: 'end' as const, label: 'End (Bottom)' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
        {alignments.map(({ align, label }) => (
          <Card key={align}>
            <div style={{
              height: '120px',
              border: '2px dashed #e1e3e5',
              position: 'relative',
              padding: '8px'
            }}>
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                fontSize: "var(--font-size-xs)",
                color: '#666',
                fontWeight: 'bold'
              }}>
                {label}
              </div>
              <VerticalAlignment align={align}>
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #0ea5e9',
                  borderRadius: '4px'
                }}>
                  <Text as="p" variant="bodyMd">Aligned Content</Text>
                </div>
              </VerticalAlignment>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const WithDifferentContentSizes: Story = {
  render: () => {
    const contentTypes = [
      {
        title: 'Small Content',
        content: <Badge>Small</Badge>,
      },
      {
        title: 'Medium Content',
        content: (
          <div style={{ padding: '8px 16px', backgroundColor: '#fef3c7', borderRadius: '4px' }}>
            <Text as="p" variant="bodyMd">Medium Content Block</Text>
          </div>
        ),
      },
      {
        title: 'Large Content',
        content: (
          <div style={{ padding: '16px', backgroundColor: '#dcfce7', borderRadius: '4px' }}>
            <Text as="h4" variant="headingSm">Large Content Block</Text>
            <Text as="p" variant="bodySm">This is a larger content block with multiple lines of text to demonstrate how vertical alignment works with different content sizes.</Text>
          </div>
        ),
      },
      {
        title: 'Button Content',
        content: <Button primary>Click Me</Button>,
      },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Vertical Alignment with Different Content</Text>
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {contentTypes.map((item, index) => (
              <div key={index}>
                <Text as="h4" variant="headingSm" tone="subdued">{item.title}</Text>
                <div style={{
                  height: '100px',
                  border: '2px dashed #e1e3e5',
                  marginTop: '8px',
                  position: 'relative'
                }}>
                  <VerticalAlignment align="center">
                    {item.content}
                  </VerticalAlignment>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  },
};

export const AlignmentVariants: Story = {
  render: () => {
    const variants = [
      { align: 'start' as const, label: 'Start', description: 'Aligns to the top of the container' },
      { align: 'center' as const, label: 'Center', description: 'Aligns to the vertical center' },
      { align: 'end' as const, label: 'End', description: 'Aligns to the bottom of the container' },
      { align: 'stretch' as const, label: 'Stretch', description: 'Stretches to fill container height' },
      { align: 'baseline' as const, label: 'Baseline', description: 'Aligns text baselines' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px' }}>
        {variants.map(({ align, label, description }) => (
          <Card key={align}>
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <Text as="h3" variant="headingMd">{label}</Text>
                  <Text as="p" variant="bodySm" tone="subdued">{description}</Text>
                </div>
                <Badge tone="info">{align}</Badge>
              </div>
              <div style={{
                height: '100px',
                border: '2px dashed #e1e3e5',
                position: 'relative',
                backgroundColor: '#f8f9fa'
              }}>
                <VerticalAlignment align={align}>
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: align === 'baseline' ? 'baseline' : 'center'
                  }}>
                    <div style={{
                      padding: '8px 12px',
                      backgroundColor: '#dbeafe',
                      borderRadius: '4px',
                      fontSize: "var(--font-size-sm)"
                    }}>
                      Content
                    </div>
                    <div style={{
                      padding: '16px 20px',
                      backgroundColor: '#fce7f3',
                      borderRadius: '4px',
                      fontSize: "var(--font-size-lg)"
                    }}>
                      Larger
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: '#f3e8ff',
                      borderRadius: '4px',
                      fontSize: "var(--font-size-xs)"
                    }}>
                      Small
                    </div>
                  </div>
                </VerticalAlignment>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
};

export const CardLayouts: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Card Layout with Vertical Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Different vertical alignment options for card content
        </Text>

        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {/* Start Alignment */}
            <Card>
              <div style={{ height: '200px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                <VerticalAlignment align="start">
                  <div style={{ width: '100%' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#dbeafe',
                      borderRadius: '50%',
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
                </VerticalAlignment>
              </div>
            </Card>

            {/* Center Alignment */}
            <Card>
              <div style={{ height: '200px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                <VerticalAlignment align="center">
                  <div style={{ textAlign: 'center' }}>
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
                </VerticalAlignment>
              </div>
            </Card>

            {/* End Alignment */}
            <Card>
              <div style={{ height: '200px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                <VerticalAlignment align="end">
                  <div style={{ width: '100%', textAlign: 'right' }}>
                    <div style={{ marginTop: '12px' }}>
                      <Button size="small">Get Started</Button>
                    </div>
                    <Text as="p" variant="bodySm" tone="subdued" style={{ marginTop: '8px' }}>
                      Begin your journey with our platform
                    </Text>
                    <Text as="h4" variant="headingMd" style={{ marginTop: '8px' }}>Onboarding</Text>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#fce7f3',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '12px 0 0 auto'
                    }}>
                      <Text as="span" variant="headingMd">🚀</Text>
                    </div>
                  </div>
                </VerticalAlignment>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    );
  },
};

export const FormElements: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Form Elements with Vertical Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Aligning form elements of different heights
        </Text>

        <div style={{ marginTop: '20px' }}>
          <BlockStack gap="300">
            {/* Start Alignment */}
            <div>
              <Text as="h4" variant="headingSm">Start Alignment</Text>
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                <VerticalAlignment align="start">
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: "var(--font-size-sm)", fontWeight: '500' }}>Label</label>
                    <input
                      type="text"
                      placeholder="Single line input"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #e1e3e5',
                        borderRadius: '4px',
                        fontSize: "var(--font-size-sm)",
                        width: '200px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '4px', fontSize: "var(--font-size-sm)", fontWeight: '500' }}>Message</label>
                    <textarea
                      placeholder="Multi-line text area"
                      rows={3}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #e1e3e5',
                        borderRadius: '4px',
                        fontSize: "var(--font-size-sm)",
                        width: '200px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <div style={{ paddingTop: '20px' }}>
                    <Button size="small">Submit</Button>
                  </div>
                </VerticalAlignment>
              </div>
            </div>

            {/* Center Alignment */}
            <div>
              <Text as="h4" variant="HeadingSm">Center Alignment</Text>
              <div style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                padding: '16px',
                backgroundColor: '#f0f9ff',
                borderRadius: '4px',
                marginTop: '8px'
              }}>
                <VerticalAlignment align="center">
                  <div>
                    <input
                      type="text"
                      placeholder="Single line input"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #0ea5e9',
                        borderRadius: '4px',
                        fontSize: "var(--font-size-sm)",
                        width: '200px'
                      }}
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Multi-line text area"
                      rows={3}
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #0ea5e9',
                        borderRadius: '4px',
                        fontSize: "var(--font-size-sm)",
                        width: '200px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <Button size="small" primary>Submit</Button>
                </VerticalAlignment>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const IconAndTextAlignment: Story = {
  render: () => {
    const iconTextCombinations = [
      {
        icon: <div style={{ fontSize: "var(--font-size-2xl)" }}>📊</div>,
        text: 'Analytics Dashboard',
        description: 'View detailed metrics',
        color: '#dbeafe'
      },
      {
        icon: <div style={{ fontSize: "var(--font-size-3xl)" }}>🎯</div>,
        text: 'Goal Tracking',
        description: 'Monitor objectives and key results',
        color: '#dcfce7'
      },
      {
        icon: <div style={{ fontSize: "var(--font-size-xl)" }}>📧</div>,
        text: 'Email',
        description: 'Send notifications',
        color: '#fce7f3'
      },
      {
        icon: <div style={{ fontSize: '28px' }}>⚙️</div>,
        text: 'Settings',
        description: 'Configure preferences',
        color: '#f3e8ff'
      },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Icon and Text Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Different alignment options for icon-text combinations
        </Text>

        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {/* Start Alignment */}
            <div>
              <Text as="h4" variant="headingSm" tone="subdued">Start</Text>
              <div style={{
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '8px',
                minHeight: '120px'
              }}>
                <VerticalAlignment align="start">
                  {iconTextCombinations.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: item.color,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <Text as="h5" variant="headingSm">{item.text}</Text>
                        <Text as="p" variant="bodySm" tone="subdued">{item.description}</Text>
                      </div>
                    </div>
                  ))}
                </VerticalAlignment>
              </div>
            </div>

            {/* Center Alignment */}
            <div>
              <Text as="h4" variant="headingSm" tone="subdued">Center</Text>
              <div style={{
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '8px',
                minHeight: '120px'
              }}>
                <VerticalAlignment align="center">
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    {iconTextCombinations.map((item, index) => (
                      <div key={index} style={{ marginBottom: '12px' }}>
                        <div style={{
                          width: '50px',
                          height: '50px',
                          backgroundColor: item.color,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px'
                        }}>
                          {item.icon}
                        </div>
                        <Text as="h5" variant="headingSm">{item.text}</Text>
                        <Text as="p" variant="bodySm" tone="subdued">{item.description}</Text>
                      </div>
                    ))}
                  </div>
                </VerticalAlignment>
              </div>
            </div>

            {/* End Alignment */}
            <div>
              <Text as="h4" variant="headingSm" tone="subdued">End</Text>
              <div style={{
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '8px',
                minHeight: '120px'
              }}>
                <VerticalAlignment align="end">
                  {iconTextCombinations.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '12px', justifyContent: 'flex-end' }}>
                      <div style={{ textAlign: 'right' }}>
                        <Text as="h5" variant="headingSm">{item.text}</Text>
                        <Text as="p" variant="bodySm" tone="subdued">{item.description}</Text>
                      </div>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: item.color,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {item.icon}
                      </div>
                    </div>
                  ))}
                </VerticalAlignment>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  },
};

export const ResponsiveAlignment: Story = {
  render: () => {
    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Responsive Vertical Alignment</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Alignment that adapts to different container sizes
        </Text>

        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Small Container */}
            <div>
              <Text as="h4" variant="headingSm">Small Container (100px)</Text>
              <div style={{
                height: '100px',
                border: '2px solid #e1e3e5',
                borderRadius: '4px',
                position: 'relative',
                marginTop: '8px',
                backgroundColor: '#f8f9fa'
              }}>
                <VerticalAlignment align="center">
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#dbeafe',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    <Text as="p" variant="bodySm">Compact Content</Text>
                  </div>
                </VerticalAlignment>
              </div>
            </div>

            {/* Large Container */}
            <div>
              <Text as="h4" variant="headingSm">Large Container (200px)</Text>
              <div style={{
                height: '200px',
                border: '2px solid #e1e3e5',
                borderRadius: '4px',
                position: 'relative',
                marginTop: '8px',
                backgroundColor: '#f8f9fa'
              }}>
                <VerticalAlignment align="center">
                  <div style={{
                    padding: '20px',
                    backgroundColor: '#dcfce7',
                    borderRadius: '4px',
                    textAlign: 'center'
                  }}>
                    <Text as="h4" variant="headingMd">Spacious Content</Text>
                    <Text as="p" variant="bodySm">More room to breathe in larger containers</Text>
                  </div>
                </VerticalAlignment>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Text as="h4" variant="headingSm">Flexible Content with Stretch</Text>
          <div style={{
            height: '150px',
            border: '2px solid #e1e3e5',
            borderRadius: '4px',
            position: 'relative',
            marginTop: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <VerticalAlignment align="stretch">
              <div style={{
                display: 'flex',
                gap: '12px',
                height: '100%',
                padding: '12px'
              }}>
                <div style={{
                  flex: 1,
                  backgroundColor: '#dbeafe',
                  borderRadius: '4px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Text as="h5" variant="headingSm">Section 1</Text>
                  <Text as="p" variant="bodySm">Stretches to fill height</Text>
                </div>
                <div style={{
                  flex: 1,
                  backgroundColor: '#fce7f3',
                  borderRadius: '4px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Text as="h5" variant="headingSm">Section 2</Text>
                  <Text as="p" variant="bodySm">Also stretches vertically</Text>
                </div>
                <div style={{
                  flex: 1,
                  backgroundColor: '#f3e8ff',
                  borderRadius: '4px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <Text as="h5" variant="headingSm">Section 3</Text>
                  <Text as="p" variant="bodySm">All sections equal height</Text>
                </div>
              </div>
            </VerticalAlignment>
          </div>
        </div>
      </Card>
    );
  },
};