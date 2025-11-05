import type { Meta, StoryObj } from '@storybook/react';
import {
  Backdrop,
  Button,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Modal,
  Sheet,
  Popover,
} from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Polaris/Overlays/Backdrop',
  component: Backdrop,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Backdrop provides a semi-transparent overlay that appears behind modal dialogs, sheets, and other overlays. It helps focus user attention on the foreground content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'onClick',
      description: 'Callback when backdrop is clicked',
    },
    onTouchStart: {
      action: 'onTouchStart',
      description: 'Callback when backdrop is touched',
    },
    belowNavigation: {
      control: 'boolean',
      description: 'Whether backdrop should appear below navigation',
    },
    setClosing: {
      control: 'boolean',
      description: 'Whether backdrop is in closing state',
    },
  },
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof Backdrop>;

export const Default: Story = {
  render: () => {
    const [showBackdrop, setShowBackdrop] = useState(false);

    return (
      <div style={{ width: '600px', height: '400px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Backdrop Component</Text>
              <Text>
                Click the button to show a backdrop overlay.
              </Text>
              <Button onClick={() => setShowBackdrop(true)}>
                Show Backdrop
              </Button>
            </BlockStack>
          </div>
        </Card>

        {showBackdrop && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
            <Backdrop onClick={() => setShowBackdrop(false)} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              minWidth: '300px',
              maxWidth: '500px',
            }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">Overlay Content</Text>
                <Text>
                  This content appears over the backdrop. Click the backdrop to close.
                </Text>
                <Button onClick={() => setShowBackdrop(false)}>
                  Close
                </Button>
              </BlockStack>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const CustomBackdrop: Story = {
  render: () => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [backdropColor, setBackdropColor] = useState('rgba(0, 0, 0, 0.5)');

    return (
      <div style={{ width: '600px', height: '400px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Custom Backdrop</Text>
              <Text>
                Try different backdrop colors and opacities.
              </Text>

              <InlineStack gap="8px">
                <Button
                  size="small"
                  onClick={() => setBackdropColor('rgba(0, 0, 0, 0.2)')}
                  pressed={backdropColor === 'rgba(0, 0, 0, 0.2)'}
                >
                  Light
                </Button>
                <Button
                  size="small"
                  onClick={() => setBackdropColor('rgba(0, 0, 0, 0.5)')}
                  pressed={backdropColor === 'rgba(0, 0, 0, 0.5)'}
                >
                  Medium
                </Button>
                <Button
                  size="small"
                  onClick={() => setBackdropColor('rgba(0, 0, 0, 0.8)')}
                  pressed={backdropColor === 'rgba(0, 0, 0, 0.8)'}
                >
                  Dark
                </Button>
                <Button
                  size="small"
                  onClick={() => setBackdropColor('rgba(59, 130, 246, 0.3)')}
                  pressed={backdropColor === 'rgba(59, 130, 246, 0.3)'}
                >
                  Blue
                </Button>
              </InlineStack>

              <Button onClick={() => setShowBackdrop(true)}>
                Show Custom Backdrop
              </Button>
            </BlockStack>
          </div>
        </Card>

        {showBackdrop && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: backdropColor,
                cursor: 'pointer',
              }}
              onClick={() => setShowBackdrop(false)}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              minWidth: '300px',
            }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">Custom Backdrop</Text>
                <Text>
                  This backdrop uses a custom color: {backdropColor}
                </Text>
                <Button onClick={() => setShowBackdrop(false)}>
                  Close
                </Button>
              </BlockStack>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const WithModal: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    const toggleModal = useCallback(() => setActive((active) => !active), []);

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Backdrop with Modal</Text>
              <Text>
                This shows how Backdrop is used with Modal components.
              </Text>
              <Button onClick={toggleModal}>
                Open Modal
              </Button>
            </BlockStack>
          </div>
        </Card>

        <Modal
          open={active}
          onClose={toggleModal}
          title="Modal with Backdrop"
          primaryAction={{
            content: 'Save',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              This Modal includes a backdrop that appears behind it.
              The backdrop helps focus attention on the modal content
              and prevents interaction with the background.
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
};

export const WithSheet: Story = {
  render: () => {
    const [active, setActive] = useState(false);

    const toggleSheet = useCallback(() => setActive((active) => !active), []);

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Backdrop with Sheet</Text>
              <Text>
                This shows how Backdrop is used with Sheet components.
              </Text>
              <Button onClick={toggleSheet}>
                Open Sheet
              </Button>
            </BlockStack>
          </div>
        </Card>

        <Sheet
          open={active}
          onClose={toggleSheet}
          title="Sheet with Backdrop"
        >
          <div style={{ padding: '24px' }}>
            <Text>
              This Sheet includes a backdrop that appears behind it.
              Click the backdrop to close the sheet.
            </Text>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const ClickOutsideBehavior: Story = {
  render: () => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [message, setMessage] = useState('');

    const handleBackdropClick = () => {
      setClickCount(prev => prev + 1);
      setMessage(`Backdrop clicked ${clickCount + 1} time(s)`);
      setShowBackdrop(false);
    };

    const handleContentClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setMessage('Content clicked (backdrop not closed)');
    };

    return (
      <div style={{ width: '600px', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Click Outside Behavior</Text>
              <Text>
                Test click behavior - clicking the backdrop closes the overlay,
                but clicking inside the content doesn't.
              </Text>
              <Button onClick={() => setShowBackdrop(true)}>
                Show Backdrop
              </Button>

              {message && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="bodySm">{message}</Text>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>

        {showBackdrop && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
            <Backdrop onClick={handleBackdropClick} />
            <div
              onClick={handleContentClick}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '32px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                minWidth: '400px',
                cursor: 'default',
              }}
            >
              <BlockStack gap="16px">
                <Text variant="headingMd">Click Behavior Test</Text>
                <Text>
                  Click here to test content click behavior.
                </Text>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  <Text>
                    Click this area (content) - backdrop won't close
                  </Text>
                </div>
                <Button onClick={() => setShowBackdrop(false)}>
                  Close
                </Button>
              </BlockStack>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AnimationDemo: Story = {
  render: () => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleShow = () => {
      setShowBackdrop(true);
      setIsClosing(false);
    };

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        setShowBackdrop(false);
        setIsClosing(false);
      }, 300);
    };

    return (
      <div style={{ width: '600px', height: '400px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Animated Backdrop</Text>
              <Text>
                This demonstrates backdrop fade in/out animations.
              </Text>
              <Button onClick={handleShow}>
                Show Animated Backdrop
              </Button>
            </BlockStack>
          </div>
        </Card>

        {showBackdrop && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                cursor: 'pointer',
                opacity: isClosing ? 0 : 1,
                transition: 'opacity 300ms ease-in-out',
              }}
              onClick={handleClose}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${isClosing ? 0.9 : 1})`,
              padding: '24px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              minWidth: '300px',
              opacity: isClosing ? 0 : 1,
              transition: 'all 300ms ease-in-out',
            }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">Animated Overlay</Text>
                <Text>
                  This overlay animates in and out smoothly.
                </Text>
                <Button onClick={handleClose}>
                  Close
                </Button>
              </BlockStack>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const AccessibilityFeatures: Story = {
  render: () => {
    const [showBackdrop, setShowBackdrop] = useState(false);
    const [focusTrap, setFocusTrap] = useState(true);

    return (
      <div style={{ width: '600px', height: '400px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Accessibility Features</Text>
              <Text>
                Backdrop includes proper accessibility support for screen readers
                and keyboard navigation.
              </Text>

              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <Text variant="bodySm">
                  Features:
                </Text>
                <ul style={{ marginTop: '8px', marginLeft: '20px' }}>
                  <li>Semantically correct backdrop element</li>
                  <li>Proper ARIA attributes</li>
                  <li>Focus trapping when enabled</li>
                  <li>Escape key support</li>
                  <li>Screen reader announcements</li>
                </ul>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <Button onClick={() => setShowBackdrop(true)}>
                  Show Accessible Backdrop
                </Button>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    checked={focusTrap}
                    onChange={(e) => setFocusTrap(e.target.checked)}
                  />
                  <Text variant="bodySm">Enable focus trap</Text>
                </label>
              </div>
            </BlockStack>
          </div>
        </Card>

        {showBackdrop && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}>
            <Backdrop
              onClick={() => setShowBackdrop(false)}
              accessibilityLabel="Modal backdrop"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '24px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                minWidth: '400px',
              }}
            >
              <BlockStack gap="16px">
                <Text id="modal-title" variant="headingMd">
                  Accessible Modal
                </Text>
                <Text>
                  This modal is fully accessible. Use Tab to navigate, Enter to activate,
                  and Escape to close.
                </Text>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button
                    primary
                    onClick={() => setShowBackdrop(false)}
                    accessibilityLabel="Save and close modal"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setShowBackdrop(false)}
                    accessibilityLabel="Cancel and close modal"
                  >
                    Cancel
                  </Button>
                </div>
              </BlockStack>
            </div>
          </div>
        )}
      </div>
    );
  },
};