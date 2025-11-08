import type { Meta, StoryObj } from '@storybook/react';
import { Backdrop, Button, Card, Text, BlockStack, InlineStack, Modal, Spinner } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Utilities/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Backdrop creates an overlay layer that dims the background content. It\'s commonly used with modals, popovers, and other overlays to focus user attention and provide visual separation. The backdrop also helps with accessibility by preventing interaction with background elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: 'Callback when backdrop is clicked (typically used to dismiss overlay)',
      action: 'clicked',
    },
    transparent: {
      control: 'boolean',
      description: 'Make backdrop transparent',
    },
    belowNavigation: {
      control: 'boolean',
      description: 'Position backdrop below navigation (lower z-index)',
    },
    onTouchStart: {
      description: 'Callback for touch events on mobile',
      action: 'touched',
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [showBackdrop, setShowBackdrop] = React.useState(false);

    return (
      <div style={{ width: '400px' }}>
        <Button onClick={() => setShowBackdrop(true)}>Show Backdrop</Button>
        {showBackdrop && (
          <Backdrop onClick={() => setShowBackdrop(false)} />
        )}
        {showBackdrop && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 'var(--p-z-index-11)',
            backgroundColor: 'white',
            padding: 'var(--spacing-5)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-2xl)',
          }}>
            <Text as="p" variant="headingMd">Click backdrop to dismiss</Text>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'default'),
  },
};

export const WithClickHandler: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [clickCount, setClickCount] = React.useState(0);

    const handleBackdropClick = () => {
      setClickCount(prev => prev + 1);
      setIsOpen(false);
    };

    return (
      <div style={{ width: '500px' }}>
        <BlockStack gap="4">
          <Button onClick={() => setIsOpen(true)}>Open Overlay</Button>
          <Text as="p" variant="bodyMd">
            Backdrop clicked: {clickCount} times
          </Text>
        </BlockStack>

        {isOpen && (
          <>
            <Backdrop onClick={handleBackdropClick} />
            <Card>
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 'var(--p-z-index-11)',
                maxWidth: '400px',
              }}>
                <BlockStack gap="4">
                  <Text as="h2" variant="headingMd">Dismissible Overlay</Text>
                  <Text as="p" variant="bodyMd">
                    Click anywhere on the backdrop to dismiss this overlay. The click count will increment.
                  </Text>
                  <InlineStack align="end">
                    <Button onClick={handleBackdropClick}>Close</Button>
                  </InlineStack>
                </BlockStack>
              </div>
            </Card>
          </>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'with-onclick'),
  },
};

export const TransparentBackdrop: Story = {
  render: () => {
    const [showOpaque, setShowOpaque] = React.useState(false);
    const [showTransparent, setShowTransparent] = React.useState(false);

    return (
      <div style={{ width: '500px' }}>
        <InlineStack gap="4">
          <Button onClick={() => setShowOpaque(true)}>Opaque Backdrop</Button>
          <Button onClick={() => setShowTransparent(true)}>Transparent Backdrop</Button>
        </InlineStack>

        {showOpaque && (
          <>
            <Backdrop onClick={() => setShowOpaque(false)} />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'var(--p-z-index-11)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Opaque Backdrop</Text>
                <Text as="p" variant="bodyMd">
                  Default backdrop with 50% black opacity
                </Text>
                <Button onClick={() => setShowOpaque(false)}>Close</Button>
              </BlockStack>
            </div>
          </>
        )}

        {showTransparent && (
          <>
            <Backdrop transparent onClick={() => setShowTransparent(false)} />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'var(--p-z-index-11)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
              border: '2px solid var(--color-border)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Transparent Backdrop</Text>
                <Text as="p" variant="bodyMd">
                  Background is fully visible, but still blocks interactions
                </Text>
                <Button onClick={() => setShowTransparent(false)}>Close</Button>
              </BlockStack>
            </div>
          </>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'transparent'),
  },
};

export const BelowNavigation: Story = {
  render: () => {
    const [showRegular, setShowRegular] = React.useState(false);
    const [showBelow, setShowBelow] = React.useState(false);

    return (
      <div style={{ width: '500px' }}>
        <BlockStack gap="4">
          <div style={{
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-bg-surface-secondary)',
            borderRadius: 'var(--border-radius-base)',
          }}>
            <Text as="p" variant="bodyMd">
              The <code>belowNavigation</code> prop positions the backdrop at z-index 7 instead of 10,
              allowing navigation elements to remain visible above it.
            </Text>
          </div>

          <InlineStack gap="4">
            <Button onClick={() => setShowRegular(true)}>
              Regular Backdrop (z-index: 10)
            </Button>
            <Button onClick={() => setShowBelow(true)}>
              Below Navigation (z-index: 7)
            </Button>
          </InlineStack>
        </BlockStack>

        {showRegular && (
          <>
            <Backdrop onClick={() => setShowRegular(false)} />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'var(--p-z-index-11)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Regular Backdrop</Text>
                <Text as="p" variant="bodyMd">
                  z-index: 10 (covers navigation)
                </Text>
                <Button onClick={() => setShowRegular(false)}>Close</Button>
              </BlockStack>
            </div>
          </>
        )}

        {showBelow && (
          <>
            <Backdrop belowNavigation onClick={() => setShowBelow(false)} />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'var(--p-z-index-8)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Below Navigation</Text>
                <Text as="p" variant="bodyMd">
                  z-index: 7 (navigation stays visible)
                </Text>
                <Button onClick={() => setShowBelow(false)}>Close</Button>
              </BlockStack>
            </div>
          </>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'below-navigation'),
  },
};

export const WithLoadingSpinner: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleStartLoading = () => {
      setIsLoading(true);
      // Simulate async operation
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    };

    return (
      <div style={{ width: '400px' }}>
        <BlockStack gap="4">
          <Button onClick={handleStartLoading} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Start Operation'}
          </Button>

          <Text as="p" variant="bodyMd" tone="subdued">
            Backdrop with loading spinner prevents user interaction during async operations
          </Text>
        </BlockStack>

        {isLoading && (
          <>
            <Backdrop />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'var(--p-z-index-11)',
              backgroundColor: 'white',
              padding: 'var(--spacing-6)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="4" align="center">
                <Spinner size="large" />
                <Text as="p" variant="headingMd">
                  Processing your request...
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  Please wait
                </Text>
              </BlockStack>
            </div>
          </>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'with-loading'),
  },
};

export const ModalIntegration: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const handleChange = () => setActive(!active);

    return (
      <div style={{ width: '400px' }}>
        <BlockStack gap="4">
          <Button onClick={handleChange}>Open Modal</Button>

          <div style={{
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-bg-surface-secondary)',
            borderRadius: 'var(--border-radius-base)',
          }}>
            <Text as="p" variant="bodyMd">
              This example shows how Modal component uses Backdrop internally.
              The backdrop is automatically managed by Modal.
            </Text>
          </div>
        </BlockStack>

        <Modal
          open={active}
          onClose={handleChange}
          title="Backdrop in Modal"
          primaryAction={{
            content: 'Save',
            onAction: handleChange,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <BlockStack gap="4">
              <Text as="p" variant="bodyMd">
                The Modal component automatically includes a Backdrop to:
              </Text>
              <ul style={{ paddingLeft: 'var(--spacing-5)', margin: 0 }}>
                <li>Dim background content</li>
                <li>Prevent interaction with page elements</li>
                <li>Provide visual focus</li>
                <li>Enable click-to-dismiss behavior</li>
                <li>Lock scrolling on the main page</li>
              </ul>
              <Text as="p" variant="bodyMd">
                Click outside this modal or on the backdrop to close it.
              </Text>
            </BlockStack>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'modal-integration'),
  },
};

export const MultiLayerBackdrops: Story = {
  render: () => {
    const [layer1, setLayer1] = React.useState(false);
    const [layer2, setLayer2] = React.useState(false);
    const [layer3, setLayer3] = React.useState(false);

    return (
      <div style={{ width: '500px' }}>
        <Button onClick={() => setLayer1(true)}>Open Layer 1</Button>

        {layer1 && (
          <>
            <Backdrop onClick={() => setLayer1(false)} />
            <div style={{
              position: 'fixed',
              top: '30%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              zIndex: 'var(--p-z-index-11)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Layer 1</Text>
                <Text as="p" variant="bodyMd">
                  This demonstrates stacking multiple backdrops
                </Text>
                <InlineStack gap="3">
                  <Button onClick={() => setLayer2(true)}>Open Layer 2</Button>
                  <Button onClick={() => setLayer1(false)}>Close</Button>
                </InlineStack>
              </BlockStack>
            </div>
          </>
        )}

        {layer2 && (
          <>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 'calc(var(--p-z-index-11) + 1)',
            }} onClick={() => setLayer2(false)} />
            <div style={{
              position: 'fixed',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, 0)',
              zIndex: 'calc(var(--p-z-index-11) + 2)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Layer 2</Text>
                <Text as="p" variant="bodyMd">
                  Multiple overlays with independent backdrops
                </Text>
                <InlineStack gap="3">
                  <Button onClick={() => setLayer3(true)}>Open Layer 3</Button>
                  <Button onClick={() => setLayer2(false)}>Close</Button>
                </InlineStack>
              </BlockStack>
            </div>
          </>
        )}

        {layer3 && (
          <>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              zIndex: 'calc(var(--p-z-index-11) + 3)',
            }} onClick={() => setLayer3(false)} />
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'calc(var(--p-z-index-11) + 4)',
              backgroundColor: 'white',
              padding: 'var(--spacing-5)',
              borderRadius: 'var(--border-radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
            }}>
              <BlockStack gap="3">
                <Text as="h2" variant="headingMd">Layer 3</Text>
                <Text as="p" variant="bodyMd">
                  Top-most layer in the stack
                </Text>
                <Button onClick={() => setLayer3(false)}>Close</Button>
              </BlockStack>
            </div>
          </>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'multi-layer'),
  },
};

export const AccessibilityFocus: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const contentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (isOpen && contentRef.current) {
        // Focus the first focusable element when overlay opens
        const focusable = contentRef.current.querySelector('button, input, textarea, select, a[href]') as HTMLElement;
        focusable?.focus();
      }
    }, [isOpen]);

    return (
      <div style={{ width: '500px' }}>
        <BlockStack gap="4">
          <Button onClick={() => setIsOpen(true)}>Open Accessible Overlay</Button>

          <div style={{
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-bg-surface-secondary)',
            borderRadius: 'var(--border-radius-base)',
          }}>
            <Text as="p" variant="bodyMd">
              Backdrop works with ScrollLock to prevent background scrolling and help maintain
              focus within the overlay content. Press Tab to cycle through focusable elements.
            </Text>
          </div>
        </BlockStack>

        {isOpen && (
          <>
            <Backdrop onClick={() => setIsOpen(false)} />
            <div
              ref={contentRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="overlay-title"
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 'var(--p-z-index-11)',
                backgroundColor: 'white',
                padding: 'var(--spacing-5)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: 'var(--shadow-2xl)',
                maxWidth: '500px',
              }}
            >
              <BlockStack gap="4">
                <Text as="h2" variant="headingMd" id="overlay-title">
                  Accessibility Features
                </Text>
                <Text as="p" variant="bodyMd">
                  The Backdrop component includes:
                </Text>
                <ul style={{ paddingLeft: 'var(--spacing-5)', margin: 0 }}>
                  <li>Automatic scroll locking via ScrollLock component</li>
                  <li>Focus management (focus moves to overlay when opened)</li>
                  <li>Click/touch handlers for dismissal</li>
                  <li>Proper z-index layering</li>
                  <li>ARIA attributes on overlay content</li>
                </ul>
                <InlineStack gap="3">
                  <Button onClick={() => setIsOpen(false)}>Close</Button>
                  <Button variant="plain">Secondary Action</Button>
                </InlineStack>
              </BlockStack>
            </div>
          </>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('backdrop', 'accessibility'),
  },
};
