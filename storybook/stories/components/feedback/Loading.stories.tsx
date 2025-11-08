import type { Meta, StoryObj } from '@storybook/react';
import { Loading, Button, Card, Text, BlockStack, InlineStack, Badge } from '@shopify/polaris';
import React, { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading displays a spinning indicator to show that content is being loaded or processed. It provides visual feedback during async operations.',
      },
    },
    codeVariants: getCodeVariants('loading', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the loading spinner',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    hasFocusableElements: {
      control: 'boolean',
      description: 'Whether the loading element contains focusable elements',
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {
    size: 'medium',
    accessibilityLabel: 'Loading content',
  },
  parameters: {
    codeVariants: getCodeVariants('loading', 'default'),
  },

};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="24px">
            <div style={{ textAlign: 'center' }}>
              <Text variant="headingSm" as="h3">Small</Text>
              <div style={{ marginTop: '8px' }}>
                <Loading size="small" accessibilityLabel="Small spinner" />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Text variant="headingSm" as="h3">Medium</Text>
              <div style={{ marginTop: '8px' }}>
                <Loading size="medium" accessibilityLabel="Medium spinner" />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Text variant="headingSm" as="h3">Large</Text>
              <div style={{ marginTop: '8px' }}>
                <Loading size="large" accessibilityLabel="Large spinner" />
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('loading', 'sizeVariants'),
  },

};

export const WithBackgrounds: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="20px">
            <Text variant="headingMd" as="h2">Loading with Different Backgrounds</Text>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{
                padding: '20px',
                backgroundColor: 'white',
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <Text variant="bodySm">White</Text>
                <div style={{ marginTop: '8px' }}>
                  <Loading size="small" accessibilityLabel="Loading on white" />
                </div>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <Text variant="bodySm">Light Gray</Text>
                <div style={{ marginTop: '8px' }}>
                  <Loading size="small" accessibilityLabel="Loading on light gray" />
                </div>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <Text variant="bodySm" style={{ color: 'white' }}>Dark</Text>
                <div style={{ marginTop: '8px' }}>
                  <Loading size="small" accessibilityLabel="Loading on dark" />
                </div>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#5c6ac4',
                borderRadius: '4px',
                textAlign: 'center',
                minWidth: '120px'
              }}>
                <Text variant="bodySm" style={{ color: 'white' }}>Primary</Text>
                <div style={{ marginTop: '8px' }}>
                  <Loading size="small" accessibilityLabel="Loading on primary" />
                </div>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('loading', 'withBackgrounds'),
  },

};

export const InteractiveLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);
    const [loadingSize, setLoadingSize] = useState<'small' | 'medium' | 'large'>('medium');

    const startLoading = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="20px">
              <Text variant="headingMd" as="h2">Interactive Loading Demo</Text>

              <div style={{ textAlign: 'center', padding: '40px' }}>
                {isLoading ? (
                  <div>
                    <Loading
                      size={loadingSize}
                      accessibilityLabel="Processing request"
                    />
                    <div style={{ marginTop: '16px' }}>
                      <Text variant="bodySm" color="subdued">
                        Processing your request...
                      </Text>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Text variant="bodySm" color="subdued">
                      Click the button to see loading state
                    </Text>
                    <div style={{ marginTop: '16px' }}>
                      <Button onClick={startLoading}>
                        Start Loading
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <Text variant="bodySm">Size:</Text>
                <InlineStack gap="8px" style={{ marginTop: '8px' }}>
                  <Button
                    size="small"
                    pressed={loadingSize === 'small'}
                    onClick={() => setLoadingSize('small')}
                  >
                    Small
                  </Button>
                  <Button
                    size="small"
                    pressed={loadingSize === 'medium'}
                    onClick={() => setLoadingSize('medium')}
                  >
                    Medium
                  </Button>
                  <Button
                    size="small"
                    pressed={loadingSize === 'large'}
                    onClick={() => setLoadingSize('large')}
                  >
                    Large
                  </Button>
                </InlineStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('loading', 'interactiveLoading'),
  },

};

export const InlineLoading: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="16px">
            <Text variant="headingMd" as="h2">Inline Loading States</Text>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <Loading size="small" accessibilityLabel="Saving" />
              <Text style={{ marginLeft: '12px' }}>Saving changes...</Text>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: '#f0f9ff',
              borderRadius: '4px'
            }}>
              <Loading size="small" accessibilityLabel="Uploading" />
              <Text style={{ marginLeft: '12px' }}>Uploading file...</Text>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: '#fef3c7',
              borderRadius: '4px'
            }}>
              <Loading size="small" accessibilityLabel="Processing" />
              <Text style={{ marginLeft: '12px' }}>Processing payment...</Text>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: '#f0fdf4',
              borderRadius: '4px'
            }}>
              <Loading size="small" accessibilityLabel="Syncing" />
              <Text style={{ marginLeft: '12px' }}>Syncing data...</Text>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('loading', 'inlineLoading'),
  },

};

export const LoadingInForms: Story = {
  render: () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
      setIsSubmitting(true);
      setTimeout(() => setIsSubmitting(false), 2000);
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Form with Loading State</Text>

              <div style={{
                padding: '16px',
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                backgroundColor: isSubmitting ? '#f8f9fa' : 'white'
              }}>
                <BlockStack gap="16px">
                  <div>
                    <Text variant="bodySm" fontWeight="bold">Product Name</Text>
                    <div style={{
                      marginTop: '4px',
                      padding: '8px 12px',
                      border: '1px solid #e1e3e5',
                      borderRadius: '4px',
                      backgroundColor: 'white'
                    }}>
                      Sample Product
                    </div>
                  </div>

                  <div>
                    <Text variant="bodySm" fontWeight="bold">Description</Text>
                    <div style={{
                      marginTop: '4px',
                      padding: '8px 12px',
                      border: '1px solid #e1e3e5',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      minHeight: '80px'
                    }}>
                      Product description goes here
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    {isSubmitting ? (
                      <div>
                        <Loading size="medium" accessibilityLabel="Submitting form" />
                        <div style={{ marginTop: '12px' }}>
                          <Text variant="bodySm" color="subdued">
                            Submitting form...
                          </Text>
                        </div>
                      </div>
                    ) : (
                      <Button onClick={handleSubmit} primary>
                        Submit Form
                      </Button>
                    )}
                  </div>
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('loading', 'loadingInForms'),
  },

};

export const LoadingSteps: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const steps = [
      'Validating data',
      'Processing payment',
      'Updating inventory',
      'Sending confirmation',
      'Complete!'
    ];

    const startProcess = () => {
      setIsLoading(true);
      setCurrentStep(0);

      steps.forEach((_, index) => {
        setTimeout(() => {
          setCurrentStep(index);
          if (index === steps.length - 1) {
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }
        }, (index + 1) * 1000);
      });
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="20px">
              <Text variant="headingMd" as="h2">Multi-Step Loading Process</Text>

              <div style={{ textAlign: 'center' }}>
                {!isLoading ? (
                  <Button onClick={startProcess} primary>
                    Start Process
                  </Button>
                ) : (
                  <div style={{ padding: '20px' }}>
                    <Loading size="large" accessibilityLabel="Processing order" />
                    <div style={{ marginTop: '16px' }}>
                      <Text variant="bodySm" color="subdued">
                        {steps[currentStep]}
                      </Text>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      backgroundColor: index < currentStep ? '#f0fdf4' :
                                      index === currentStep ? '#eff6ff' : '#f8f9fa',
                      marginBottom: '4px'
                    }}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: index < currentStep ? '#16a34a' :
                                        index === currentStep ? '#2563eb' : '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px'
                    }}>
                      {index < currentStep ? (
                        <span style={{ color: 'white', fontSize: "12px" }}>✓</span>
                      ) : (
                        <span style={{ color: '#6b7280', fontSize: "12px" }}>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <Text variant="bodySm">
                      {step}
                    </Text>
                    {index === currentStep && isLoading && (
                      <Loading size="small" accessibilityLabel="Current step" />
                    )}
                  </div>
                ))}
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('loading', 'loadingSteps'),
  },

};

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="20px">
            <Text variant="headingMd" as="h2">Accessibility Features</Text>

            <div style={{
              padding: '16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            }}>
              <Text variant="bodySm">
                The Loading component includes proper accessibility features:
              </Text>
              <ul style={{ marginTop: '12px', marginLeft: '20px' }}>
                <li>Screen reader announcements via aria-label</li>
                <li>Proper focus management</li>
                <li>High contrast visibility</li>
                <li>Reduced motion support</li>
              </ul>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              textAlign: 'center'
            }}>
              <div>
                <Loading
                  size="small"
                  accessibilityLabel="Loading small items"
                />
                <div style={{ marginTop: '8px' }}>
                  <Text variant="bodySm">With aria-label</Text>
                </div>
              </div>

              <div>
                <Loading
                  size="medium"
                  accessibilityLabel="Processing your request, please wait"
                />
                <div style={{ marginTop: '8px' }}>
                  <Text variant="bodySm">Descriptive label</Text>
                </div>
              </div>

              <div>
                <Loading
                  size="large"
                  accessibilityLabel="System initializing, this may take a moment"
                />
                <div style={{ marginTop: '8px' }}>
                  <Text variant="bodySm">Detailed context</Text>
                </div>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('loading', 'accessibilityDemo'),
  },

};