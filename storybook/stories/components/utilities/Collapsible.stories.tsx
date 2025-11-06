import type { Meta, StoryObj } from '@storybook/react';
import { Collapsible, Button, Card, Text, InlineStack, BlockStack } from '@shopify/polaris';
import { ChevronDownIcon, ChevronUpIcon } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Components/Utilities/Collapsible',
  component: Collapsible,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Collapsible components can expand and collapse content, helping users manage screen real estate by hiding information until it\'s needed. They\'re perfect for progressive disclosure of information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the collapsible is open',
    },
    id: {
      control: 'text',
      description: 'Unique identifier for the collapsible',
    },
    transition: {
      control: 'select',
      options: ['none', 'smooth', 'fast'],
      description: 'Transition animation',
    },
    expandOnPrint: {
      control: 'boolean',
      description: 'Expand content when printing',
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <div style={{ width: '400px' }}>
        <Button
          onClick={() => setOpen(!open)}
          ariaExpanded={open}
          ariaControls="basic-collapsible"
        >
          {open ? 'Hide' : 'Show'} Details
        </Button>
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition
        >
          <div style={{ padding: 'var(--spacing-4)', border: '1px solid var(--color-border-subdued)', marginTop: 'var(--spacing-2)', borderRadius: 'var(--border-radius-base)' }}>
            <Text as="p" variant="bodyMd">
              This is collapsible content that can be shown or hidden by clicking the button above.
            </Text>
          </div>
        </Collapsible>
      </div>
    );
  },
};

export const BasicUsage: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Card sectioned>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          ariaExpanded={isOpen}
          ariaControls="basic-usage"
          disclosure={isOpen ? 'up' : 'down'}
        >
          Product Specifications
        </Button>
        <Collapsible
          open={isOpen}
          id="basic-usage"
          transition={{ duration: '500ms', timingFunction: 'ease-in-out' }}
        >
          <div style={{
            padding: 'var(--spacing-4)',
            marginTop: 'var(--spacing-3)',
            backgroundColor: 'var(--color-bg-surface-secondary)',
            borderRadius: 'var(--border-radius-base)'
          }}>
            <BlockStack gap="200">
              <Text as="h4" variant="headingSm">Technical Details</Text>
              <Text as="p" variant="bodyMd">
                • Material: Premium aluminum alloy<br />
                • Weight: 2.5 lbs<br />
                • Dimensions: 12" x 8" x 3"<br />
                • Warranty: 2 years<br />
                • Color options: Silver, Space Gray, Rose Gold
              </Text>
            </BlockStack>
          </div>
        </Collapsible>
      </Card>
    );
  },
};

export const AccordionStyle: Story = {
  render: () => {
    const [openSection, setOpenSection] = React.useState<string | null>(null);

    const sections = [
      {
        id: 'shipping',
        title: 'Shipping Information',
        content: 'Free shipping on orders over $50. Standard delivery takes 5-7 business days. Express shipping available for $15.'
      },
      {
        id: 'returns',
        title: 'Returns & Exchanges',
        content: '30-day return policy. Items must be unused and in original packaging. Return shipping covered for defective items.'
      },
      {
        id: 'warranty',
        title: 'Warranty Details',
        content: 'All products come with a standard 1-year manufacturer warranty. Extended warranty options available at checkout.'
      }
    ];

    const handleToggle = (sectionId: string) => {
      setOpenSection(openSection === sectionId ? null : sectionId);
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Frequently Asked Questions</Text>
        <div style={{ marginTop: 'var(--spacing-4)' }}>
          {sections.map((section) => (
            <div key={section.id} style={{ marginBottom: 'var(--spacing-2)' }}>
              <Button
                onClick={() => handleToggle(section.id)}
                ariaExpanded={openSection === section.id}
                ariaControls={`section-${section.id}`}
                fullWidth
                textAlign="left"
                disclosure={openSection === section.id ? 'up' : 'down'}
                style={{
                  justifyContent: 'space-between',
                  backgroundColor: openSection === section.id ? 'var(--p-color-bg-surface-selected)' : 'var(--p-color-bg-surface)'
                }}
              >
                {section.title}
              </Button>
              <Collapsible
                open={openSection === section.id}
                id={`section-${section.id}`}
                transition
              >
                <div style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: '#f3f4f6',
                  borderLeft: '3px solid var(--p-color-interactive)',
                  marginLeft: 'var(--spacing-4)'
                }}>
                  <Text as="p" variant="bodyMd">
                    {section.content}
                  </Text>
                </div>
              </Collapsible>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

export const NestedCollapsibles: Story = {
  render: () => {
    const [mainOpen, setMainOpen] = React.useState(false);
    const [nestedOpen, setNestedOpen] = React.useState(false);

    return (
      <Card sectioned>
        <Button
          onClick={() => setMainOpen(!mainOpen)}
          ariaExpanded={mainOpen}
          ariaControls="main-collapsible"
          disclosure={mainOpen ? 'up' : 'down'}
        >
          Advanced Settings
        </Button>
        <Collapsible
          open={mainOpen}
          id="main-collapsible"
          transition
        >
          <div style={{ padding: 'var(--spacing-4)', marginTop: '12px', backgroundColor: '#f3f4f6', borderRadius: 'var(--border-radius-base)' }}>
            <BlockStack gap="300">
              <Text as="h4" variant="headingSm">Configuration Options</Text>

              <div>
                <Text as="p" variant="bodyMd">Basic settings are available here.</Text>
              </div>

              <div>
                <Button
                  onClick={() => setNestedOpen(!nestedOpen)}
                  ariaExpanded={nestedOpen}
                  ariaControls="nested-collapsible"
                  size="small"
                  disclosure={nestedOpen ? 'up' : 'down'}
                >
                  Expert Options
                </Button>
                <Collapsible
                  open={nestedOpen}
                  id="nested-collapsible"
                  transition
                >
                  <div style={{
                    padding: 'var(--spacing-3)',
                    marginTop: 'var(--spacing-2)',
                    backgroundColor: 'var(--p-color-bg-surface)',
                    borderRadius: 'var(--border-radius-base)',
                    border: '1px solid var(--p-color-border)'
                  }}>
                    <Text as="p" variant="bodySm" tone="subdued">
                      ⚠️ These advanced settings should only be modified by experienced users.
                    </Text>
                    <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                      <li>Enable experimental features</li>
                      <li>Override default behaviors</li>
                      <li>Modify core system parameters</li>
                    </ul>
                  </div>
                </Collapsible>
              </div>
            </BlockStack>
          </div>
        </Collapsible>
      </Card>
    );
  },
};

export const MultipleCollapsibles: Story = {
  render: () => {
    const [openStates, setOpenStates] = React.useState({
      overview: false,
      features: false,
      specifications: false,
      reviews: false
    });

    const toggleSection = (section: keyof typeof openStates) => {
      setOpenStates(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Product Information</Text>
        <div style={{ marginTop: 'var(--spacing-4)' }}>
          <BlockStack gap="200">
            {[
              { id: 'overview', title: 'Overview', content: 'Premium quality product designed for professional use. Features advanced technology and superior build quality.' },
              { id: 'features', title: 'Key Features', content: '• Wireless connectivity\n• Battery life: 24 hours\n• Water resistant\n• Voice control enabled\n• Multi-device support' },
              { id: 'specifications', title: 'Technical Specs', content: 'Processor: Latest generation chip\nMemory: 8GB RAM\nStorage: 256GB SSD\nDisplay: 4K resolution\nConnectivity: WiFi 6, Bluetooth 5.0' },
              { id: 'reviews', title: 'Customer Reviews', content: 'Average rating: 4.8/5 stars\nBased on 2,347 reviews\n95% would recommend to a friend' }
            ].map(({ id, title, content }) => (
              <div key={id}>
                <Button
                  onClick={() => toggleSection(id as keyof typeof openStates)}
                  ariaExpanded={openStates[id as keyof typeof openStates]}
                  ariaControls={`${id}-collapsible`}
                  size="small"
                  disclosure={openStates[id as keyof typeof openStates] ? 'up' : 'down'}
                >
                  {title}
                </Button>
                <Collapsible
                  open={openStates[id as keyof typeof openStates]}
                  id={`${id}-collapsible`}
                  transition
                >
                  <div style={{
                    padding: 'var(--spacing-3)',
                    marginTop: 'var(--spacing-2)',
                    backgroundColor: '#f3f4f6',
                    borderRadius: 'var(--border-radius-base)'
                  }}>
                    <Text as="p" variant="bodySm" whiteSpace="pre-line">
                      {content}
                    </Text>
                  </div>
                </Collapsible>
              </div>
            ))}
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const CollapsibleForms: Story = {
  render: () => {
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    const [showBilling, setShowBilling] = React.useState(false);

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Checkout Form</Text>

        <div style={{ marginTop: 'var(--spacing-4)' }}>
          <BlockStack gap="400">
            <div>
              <Text as="h4" variant="headingSm">Basic Information</Text>
              <div style={{ marginTop: '12px' }}>
                <div style={{ marginBottom: 'var(--spacing-3)' }}>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>Email</label>
                  <input
                    type="email"
                    placeholder="customer@example.com"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-2) var(--spacing-3)',
                      border: '1px solid var(--p-color-border)',
                      borderRadius: 'var(--border-radius-base)',
                      fontSize: "var(--font-size-sm)"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-2) var(--spacing-3)',
                      border: '1px solid var(--p-color-border)',
                      borderRadius: 'var(--border-radius-base)',
                      fontSize: "var(--font-size-sm)"
                    }}
                  />
                </div>
              </div>
            </div>

            <div>
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                ariaExpanded={showAdvanced}
                ariaControls="advanced-fields"
                disclosure={showAdvanced ? 'up' : 'down'}
              >
                Advanced Options
              </Button>
              <Collapsible
                open={showAdvanced}
                id="advanced-fields"
                transition
              >
                <div style={{
                  padding: 'var(--spacing-4)',
                  marginTop: '12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: 'var(--border-radius-base)'
                }}>
                  <BlockStack gap="200">
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Corporation"
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          border: '1px solid var(--p-color-border)',
                          borderRadius: 'var(--border-radius-base)',
                          fontSize: "var(--font-size-sm)"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>
                        Tax ID
                      </label>
                      <input
                        type="text"
                        placeholder="123-45-6789"
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          border: '1px solid var(--p-color-border)',
                          borderRadius: 'var(--border-radius-base)',
                          fontSize: "var(--font-size-sm)"
                        }}
                      />
                    </div>
                  </BlockStack>
                </div>
              </Collapsible>
            </div>

            <div>
              <Button
                onClick={() => setShowBilling(!showBilling)}
                ariaExpanded={showBilling}
                ariaControls="billing-fields"
                disclosure={showBilling ? 'up' : 'down'}
              >
                Billing Address
              </Button>
              <Collapsible
                open={showBilling}
                id="billing-fields"
                transition
              >
                <div style={{
                  padding: 'var(--spacing-4)',
                  marginTop: '12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: 'var(--border-radius-base)'
                }}>
                  <BlockStack gap="200">
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>
                        Street Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main St"
                        style={{
                          width: '100%',
                          padding: 'var(--spacing-2) var(--spacing-3)',
                          border: '1px solid var(--p-color-border)',
                          borderRadius: 'var(--border-radius-base)',
                          fontSize: "var(--font-size-sm)"
                        }}
                      />
                    </div>
                    <InlineStack gap="200">
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>
                          City
                        </label>
                        <input
                          type="text"
                          placeholder="New York"
                          style={{
                            width: '100%',
                            padding: 'var(--spacing-2) var(--spacing-3)',
                            border: '1px solid var(--p-color-border)',
                            borderRadius: 'var(--border-radius-base)',
                            fontSize: "var(--font-size-sm)"
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: 'var(--spacing-1)', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-medium)' }}>
                          State
                        </label>
                        <input
                          type="text"
                          placeholder="NY"
                          style={{
                            width: '100%',
                            padding: 'var(--spacing-2) var(--spacing-3)',
                            border: '1px solid var(--p-color-border)',
                            borderRadius: 'var(--border-radius-base)',
                            fontSize: "var(--font-size-sm)"
                          }}
                        />
                      </div>
                    </InlineStack>
                  </BlockStack>
                </div>
              </Collapsible>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const ProgressiveDisclosure: Story = {
  render: () => {
    const [steps, setSteps] = React.useState({
      basic: true,
      intermediate: false,
      advanced: false,
      expert: false
    });

    const nextStep = () => {
      const stepOrder: (keyof typeof steps)[] = ['basic', 'intermediate', 'advanced', 'expert'];
      const currentStepIndex = stepOrder.findIndex(step => steps[step] && !steps[stepOrder[stepOrder.indexOf(step) + 1]]);

      if (currentStepIndex < stepOrder.length - 1) {
        setSteps(prev => ({
          ...prev,
          [stepOrder[currentStepIndex + 1]]: true
        }));
      }
    };

    const resetSteps = () => {
      setSteps({
        basic: true,
        intermediate: false,
        advanced: false,
        expert: false
      });
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Learning Path</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Click "Next Step" to progressively reveal more advanced content.
        </Text>

        <div style={{ marginTop: 'var(--spacing-4)' }}>
          <InlineStack gap="200">
            <Button onClick={nextStep} primary>
              Next Step
            </Button>
            <Button onClick={resetSteps}>
              Reset
            </Button>
          </InlineStack>
        </div>

        <div style={{ marginTop: 'var(--spacing-5)' }}>
          {steps.basic && (
            <Collapsible open={steps.basic} transition>
              <div style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--p-color-bg-success-subdued)',
                borderRadius: 'var(--border-radius-base)',
                marginBottom: 'var(--spacing-3)'
              }}>
                <Text as="h4" variant="headingSm">📚 Basic Concepts</Text>
                <Text as="p" variant="bodyMd" style={{ marginTop: 'var(--spacing-2)' }}>
                  Learn the fundamentals of this topic. This is where everyone starts their journey.
                </Text>
              </div>
            </Collapsible>
          )}

          {steps.intermediate && (
            <Collapsible open={steps.intermediate} transition>
              <div style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--p-color-bg-highlight-subdued)',
                borderRadius: 'var(--border-radius-base)',
                marginBottom: 'var(--spacing-3)'
              }}>
                <Text as="h4" variant="headingSm">🎯 Intermediate Skills</Text>
                <Text as="p" variant="bodyMd" style={{ marginTop: 'var(--spacing-2)' }}>
                  Build upon the basics with more complex techniques and practical applications.
                </Text>
              </div>
            </Collapsible>
          )}

          {steps.advanced && (
            <Collapsible open={steps.advanced} transition>
              <div style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--p-color-bg-warning-subdued)',
                borderRadius: 'var(--border-radius-base)',
                marginBottom: 'var(--spacing-3)'
              }}>
                <Text as="h4" variant="headingSm">🚀 Advanced Techniques</Text>
                <Text as="p" variant="bodyMd" style={{ marginTop: 'var(--spacing-2)' }}>
                  Master advanced concepts and learn professional-level strategies and optimizations.
                </Text>
              </div>
            </Collapsible>
          )}

          {steps.expert && (
            <Collapsible open={steps.expert} transition>
              <div style={{
                padding: 'var(--spacing-4)',
                backgroundColor: 'var(--p-color-bg-critical-subdued)',
                borderRadius: 'var(--border-radius-base)',
                marginBottom: 'var(--spacing-3)'
              }}>
                <Text as="h4" variant="headingSm">🏆 Expert Level</Text>
                <Text as="p" variant="bodyMd" style={{ marginTop: 'var(--spacing-2)' }}>
                  You've reached the highest level! Expert-level insights and cutting-edge techniques await.
                </Text>
              </div>
            </Collapsible>
          )}
        </div>
      </Card>
    );
  },
};

export const CollapsibleWithAnimation: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [animationType, setAnimationType] = React.useState<'smooth' | 'fast' | 'slow'>('smooth');

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Animation Speed Demo</Text>

        <div style={{ margin: '16px 0' }}>
          <Text as="p" variant="bodySm" tone="subdued">Animation Type:</Text>
          <InlineStack gap="200" style={{ marginTop: 'var(--spacing-2)' }}>
            {(['smooth', 'fast', 'slow'] as const).map((type) => (
              <Button
                key={type}
                size="small"
                variant={animationType === type ? 'primary' : 'plain'}
                onClick={() => setAnimationType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Button>
            ))}
          </InlineStack>
        </div>

        <Button
          onClick={() => setOpen(!open)}
          ariaExpanded={open}
          ariaControls="animated-collapsible"
          disclosure={open ? 'up' : 'down'}
        >
          Toggle Animated Content
        </Button>

        <Collapsible
          open={open}
          id="animated-collapsible"
          transition={{
            duration: animationType === 'fast' ? '200ms' : animationType === 'slow' ? '1000ms' : '400ms',
            timingFunction: animationType === 'fast' ? 'ease-out' : animationType === 'slow' ? 'ease-in-out' : 'ease'
          }}
        >
          <div style={{
            padding: 'var(--spacing-4)',
            marginTop: 'var(--spacing-3)',
            backgroundColor: 'var(--color-bg-surface-secondary)',
            borderRadius: 'var(--border-radius-base)'
          }}>
            <BlockStack gap="200">
              <Text as="h4" variant="headingSm">Animated Content</Text>
              <Text as="p" variant="bodyMd">
                This content uses a {animationType} animation ({animationType === 'fast' ? '200ms' : animationType === 'slow' ? '1000ms' : '400ms'} duration).
              </Text>
              <div style={{
                height: '60px',
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
                borderRadius: 'var(--border-radius-base)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                Visual Element
              </div>
            </BlockStack>
          </div>
        </Collapsible>
      </Card>
    );
  },
};