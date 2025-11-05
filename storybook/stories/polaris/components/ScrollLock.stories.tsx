import type { Meta, StoryObj } from '@storybook/react';
import { ScrollLock, Button, Card, Text, Modal, Popover, InlineStack, BlockStack } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Utilities/ScrollLock',
  component: ScrollLock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ScrollLock prevents the body from scrolling when activated. This is essential for modals, drawers, and other overlay components to maintain a good user experience.',
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    lock: {
      control: 'boolean',
      description: 'Whether scrolling is locked',
    },
  },
} satisfies Meta<typeof ScrollLock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isLocked, setIsLocked] = React.useState(false);

    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ marginBottom: '16px' }}>
          <Button onClick={() => setIsLocked(!isLocked)}>
            {isLocked ? 'Unlock' : 'Lock'} Scrolling
          </Button>
        </div>

        <ScrollLock lock={isLocked} />

        <div style={{
          height: '200px',
          overflow: 'auto',
          border: '1px solid #ddd',
          padding: '16px',
          borderRadius: '4px'
        }}>
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">Scrollable Content</Text>
            <Text as="p" variant="bodyMd">
              This area contains scrollable content. When scrolling is locked, the body scroll should be disabled.
            </Text>
            {Array.from({ length: 20 }, (_, i) => (
              <Text as="p" variant="bodySm" key={i}>
                Content block {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            ))}
          </BlockStack>
        </div>

        {isLocked && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '4px'
          }}>
            <Text as="p" variant="bodySm">
              ⚠️ Scrolling is currently locked. Try scrolling the page - it should be disabled.
            </Text>
          </div>
        )}
      </div>
    );
  },
};

export const BasicScrollLock: Story = {
  render: () => {
    const [scrollLocked, setScrollLocked] = React.useState(false);

    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Scroll Lock Demo</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Toggle the lock to prevent body scrolling. Try scrolling the background page when locked.
          </Text>

          <div style={{ margin: '16px 0' }}>
            <Button onClick={() => setScrollLocked(!scrollLocked)}>
              {scrollLocked ? '🔓 Unlock' : '🔒 Lock'} Page Scrolling
            </Button>
          </div>

          <ScrollLock lock={scrollLocked} />
        </Card>

        <div style={{ marginTop: '20px' }}>
          <Card sectioned>
            <Text as="h4" variant="headingSm">Test Scrolling Area</Text>
            <div style={{
              height: '300px',
              overflowY: 'auto',
              border: '1px solid #e1e3e5',
              borderRadius: '4px',
              padding: '16px',
              marginTop: '12px'
            }}>
              <BlockStack gap="300">
                <Text as="p" variant="bodyMd">
                  This is a scrollable container. Notice how the main page scroll is locked when you activate the lock above.
                </Text>
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} style={{
                    padding: '12px',
                    backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#ffffff',
                    borderRadius: '4px',
                    border: '1px solid #e1e3e5'
                  }}>
                    <Text as="h5" variant="headingSm">Section {i + 1}</Text>
                    <Text as="p" variant="bodySm">
                      This is scrollable content section {i + 1}. You can scroll within this container
                      even when the main page scroll is locked.
                    </Text>
                  </div>
                ))}
              </BlockStack>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const ModalWithScrollLock: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const toggleActive = () => setActive(!active);

    return (
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Button onClick={toggleActive}>Open Modal</Button>
        </div>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Modal with Scroll Lock</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            This example shows how ScrollLock works with a modal. When the modal is open, page scrolling is prevented.
          </Text>
        </Card>

        <div style={{ marginTop: '20px' }}>
          <Card>
            <div style={{
              height: '400px',
              overflowY: 'auto',
              padding: '20px'
            }}>
              <BlockStack gap="300">
                <Text as="h4" variant="headingSm">Long Content Area</Text>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '4px'
                  }}>
                    <Text as="p" variant="bodyMd">
                      <strong>Content Item {i + 1}</strong><br />
                      This demonstrates that when the modal is open, you cannot scroll this content.
                      The modal should have its own internal scrolling if needed.
                    </Text>
                  </div>
                ))}
              </BlockStack>
            </div>
          </Card>
        </div>

        {active && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ScrollLock lock={true} />
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <Text as="h2" variant="headingMd">Modal Content</Text>
              <Text as="p" variant="bodyMd" style={{ marginTop: '12px' }}>
                This modal has ScrollLock enabled. Notice that you cannot scroll the background page.
              </Text>
              <div style={{ marginTop: '16px' }}>
                {Array.from({ length: 10 }, (_, i) => (
                  <Text as="p" variant="bodySm" key={i} style={{ marginBottom: '8px' }}>
                    Modal content line {i + 1}: This is content within the modal that can be scrolled.
                  </Text>
                ))}
              </div>
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Button onClick={toggleActive}>Close Modal</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const SidePanelWithScrollLock: Story = {
  render: () => {
    const [panelOpen, setPanelOpen] = React.useState(false);

    return (
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
        <div style={{ padding: '20px' }}>
          <Button onClick={() => setPanelOpen(!panelOpen)}>
            {panelOpen ? 'Close' : 'Open'} Side Panel
          </Button>
        </div>

        <ScrollLock lock={panelOpen} />

        <div style={{
          padding: '20px',
          height: '500px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa'
        }}>
          <BlockStack gap="300">
            <Text as="h3" variant="headingMd">Main Content Area</Text>
            {Array.from({ length: 30 }, (_, i) => (
              <Card key={i}>
                <div style={{ padding: '16px' }}>
                  <Text as="h4" variant="headingSm">Content Card {i + 1}</Text>
                  <Text as="p" variant="bodyMd">
                    This is content card {i + 1}. When the side panel is open, scrolling in this area
                    should be locked. The panel itself should be scrollable if it has overflow content.
                  </Text>
                </div>
              </Card>
            ))}
          </BlockStack>
        </div>

        <div style={{
          position: 'fixed',
          top: 0,
          right: panelOpen ? 0 : '-400px',
          width: '400px',
          height: '100%',
          backgroundColor: 'white',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.15)',
          transition: 'right 0.3s ease-in-out',
          zIndex: 1000
        }}>
          <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <Text as="h3" variant="headingMd">Side Panel</Text>
              <Button onClick={() => setPanelOpen(false)} variant="plain">
                ×
              </Button>
            </div>
            <Text as="p" variant="bodyMd" tone="subdued" style={{ marginBottom: '20px' }}>
              This side panel can be scrolled independently while the main content is locked.
            </Text>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                marginBottom: '12px'
              }}>
                <Text as="h5" variant="headingSm">Panel Item {i + 1}</Text>
                <Text as="p" variant="bodySm">
                  Side panel content item {i + 1}. This area scrolls while the main page is locked.
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const MultipleScrollLocks: Story = {
  render: () => {
    const [globalLock, setGlobalLock] = React.useState(false);
    const [localLock1, setLocalLock1] = React.useState(false);
    const [localLock2, setLocalLock2] = React.useState(false);

    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Multiple Scroll Lock Scenarios</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Test different scroll locking combinations. Page-level locks should override local locks.
          </Text>

          <BlockStack gap="200" style={{ marginTop: '16px' }}>
            <InlineStack gap="200">
              <Button
                onClick={() => setGlobalLock(!globalLock)}
                variant={globalLock ? 'primary' : 'plain'}
              >
                {globalLock ? '🔒' : '🔓'} Global Lock
              </Button>
              <Button
                onClick={() => setLocalLock1(!localLock1)}
                variant={localLock1 ? 'primary' : 'plain'}
              >
                {localLock1 ? '🔒' : '🔓'} Lock Area 1
              </Button>
              <Button
                onClick={() => setLocalLock2(!localLock2)}
                variant={localLock2 ? 'primary' : 'plain'}
              >
                {localLock2 ? '🔒' : '🔓'} Lock Area 2
              </Button>
            </InlineStack>

            <div style={{
              padding: '12px',
              backgroundColor: globalLock ? '#fef3c7' : '#f0fdf4',
              borderRadius: '4px',
              border: `1px solid ${globalLock ? '#f59e0b' : '#22c55e'}`
            }}>
              <Text as="p" variant="bodySm">
                {globalLock ? '⚠️ Global scroll lock is active' : '✅ Page scrolling is enabled'}
              </Text>
            </div>
          </BlockStack>
        </Card>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginTop: '20px'
        }}>
          <Card>
            <div style={{ padding: '16px' }}>
              <Text as="h4" variant="headingSm">Scrollable Area 1</Text>
              <div style={{
                height: '300px',
                overflowY: 'auto',
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                padding: '12px',
                marginTop: '12px',
                position: 'relative'
              }}>
                <ScrollLock lock={localLock1} />
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} style={{
                    padding: '8px',
                    backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#ffffff',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #e1e3e5'
                  }}>
                    <Text as="p" variant="bodySm">
                      Area 1 - Item {i + 1}
                      {localLock1 && <span style={{ color: '#dc2626', marginLeft: '8px' }}>🔒 Locked</span>}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ padding: '16px' }}>
              <Text as="h4" variant="headingSm">Scrollable Area 2</Text>
              <div style={{
                height: '300px',
                overflowY: 'auto',
                border: '1px solid #e1e3e5',
                borderRadius: '4px',
                padding: '12px',
                marginTop: '12px',
                position: 'relative'
              }}>
                <ScrollLock lock={localLock2} />
                {Array.from({ length: 15 }, (_, i) => (
                  <div key={i} style={{
                    padding: '8px',
                    backgroundColor: i % 2 === 0 ? '#f8f9fa' : '#ffffff',
                    borderRadius: '4px',
                    marginBottom: '8px',
                    border: '1px solid #e1e3e5'
                  }}>
                    <Text as="p" variant="bodySm">
                      Area 2 - Item {i + 1}
                      {localLock2 && <span style={{ color: '#dc2626', marginLeft: '8px' }}>🔒 Locked</span>}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        <ScrollLock lock={globalLock} />
      </div>
    );
  },
};

export const ScrollLockWithKeyboard: Story = {
  render: () => {
    const [isLocked, setIsLocked] = React.useState(false);
    const [activeElement, setActiveElement] = React.useState<string | null>(null);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isLocked) {
          setIsLocked(false);
        }
        if (event.target instanceof HTMLElement) {
          setActiveElement(event.target.tagName);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isLocked]);

    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Card sectioned>
          <Text as="h3" variant="headingMd">Scroll Lock with Keyboard Navigation</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Press ESC to unlock scrolling. Tab through elements to test focus behavior.
          </Text>

          <div style={{ margin: '16px 0' }}>
            <Button onClick={() => setIsLocked(!isLocked)}>
              {isLocked ? '🔓 Unlock (ESC)' : '🔒 Lock Scrolling'}
            </Button>
          </div>

          {activeElement && (
            <div style={{
              padding: '8px',
              backgroundColor: '#e0f2fe',
              borderRadius: '4px',
              marginBottom: '16px'
            }}>
              <Text as="p" variant="bodySm">
                Focused element: {activeElement}
              </Text>
            </div>
          )}

          <ScrollLock lock={isLocked} />

          <BlockStack gap="200">
            <Button variant="plain">Button 1</Button>
            <Button variant="plain">Button 2</Button>
            <Button variant="plain">Button 3</Button>

            <div style={{
              height: '200px',
              overflowY: 'auto',
              border: '1px solid #e1e3e5',
              borderRadius: '4px',
              padding: '16px'
            }}>
              <BlockStack gap="200">
                <Text as="h4" variant="headingSm">Interactive Elements</Text>
                {Array.from({ length: 10 }, (_, i) => (
                  <button
                    key={i}
                    style={{
                      padding: '8px 16px',
                      border: '1px solid #e1e3e5',
                      borderRadius: '4px',
                      backgroundColor: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Interactive Button {i + 1}
                  </button>
                ))}
              </BlockStack>
            </div>
          </BlockStack>
        </Card>
      </div>
    );
  },
};

export const MobileScrollLock: Story = {
  render: () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    return (
      <div style={{ width: '100%', maxWidth: '375px' }}>
        {/* Mobile Header */}
        <div style={{
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text as="h3" variant="headingMd" color="white">Mobile App</Text>
          <Button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} variant="plain">
            ☰
          </Button>
        </div>

        <ScrollLock lock={mobileMenuOpen} />

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              height: '100%',
              width: '280px',
              boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
            }}>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <Text as="h4" variant="headingMd">Menu</Text>
                  <Button onClick={() => setMobileMenuOpen(false)} variant="plain">
                    ×
                  </Button>
                </div>
                <BlockStack gap="200">
                  <Button variant="plain" fullWidth textAlign="left">Home</Button>
                  <Button variant="plain" fullWidth textAlign="left">Products</Button>
                  <Button variant="plain" fullWidth textAlign="left">Orders</Button>
                  <Button variant="plain" fullWidth textAlign="left">Customers</Button>
                  <Button variant="plain" fullWidth textAlign="left">Analytics</Button>
                  <Button variant="plain" fullWidth textAlign="left">Settings</Button>
                </BlockStack>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div style={{ padding: '16px' }}>
          <Text as="h3" variant="headingMd">Mobile Content</Text>
          <Text as="p" variant="bodyMd" tone="subdued" style={{ marginBottom: '16px' }}>
            This simulates a mobile experience. Open the menu to see how scroll lock prevents background scrolling.
          </Text>

          {Array.from({ length: 20 }, (_, i) => (
            <Card key={i} style={{ marginBottom: '12px' }}>
              <div style={{ padding: '16px' }}>
                <Text as="h4" variant="headingSm">Mobile Card {i + 1}</Text>
                <Text as="p" variant="bodySm">
                  Mobile-optimized content card {i + 1}. Notice how background scrolling is disabled
                  when the mobile menu is open.
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
};