import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button, Text, TextField, FormLayout } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Overlays/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modals are overlay windows that require user interaction before returning to the main interface. Use modals for focused tasks, confirmations, or when you need to capture the user\'s full attention.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when modal is closed',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    src: {
      control: 'text',
      description: 'URL for iframe content',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullScreen'],
      description: 'Modal size',
    },
    limitHeight: {
      control: 'boolean',
      description: 'Limit modal height to viewport',
    },
    instant: {
      control: 'boolean',
      description: 'Remove animation',
    },
    primaryAction: {
      control: 'object',
      description: 'Primary action button configuration',
    },
    secondaryActions: {
      control: 'array',
      description: 'Secondary action buttons',
    },
    footer: {
      control: 'boolean',
      description: 'Show footer content area',
    },
    noScroll: {
      control: 'boolean',
      description: 'Disable body scroll lock',
    },
    iFrameName: {
      control: 'text',
      description: 'Name attribute for iframe',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    large: {
      control: 'boolean',
      description: 'Deprecated: Use size prop instead',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },
  render: () => {
    const [active, setActive] = React.useState(false);

    const handleChange = () => setActive(!active);

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handleChange}>Open Modal</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Basic Modal"
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
            <Text variant="bodyMd">
              This is a basic modal with title, content, and action buttons. Modals are perfect for focused tasks that require user attention.
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [activeModal, setActiveModal] = React.useState<string | null>(null);

    const openModal = (modalType: string) => setActiveModal(modalType);
    const closeModal = () => setActiveModal(null);

    return (
      <div style={{ height: '500px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button onClick={() => openModal('small')}>Small Modal</Button>
        <Button onClick={() => openModal('medium')}>Medium Modal</Button>
        <Button onClick={() => openModal('large')}>Large Modal</Button>
        <Button onClick={() => openModal('fullscreen')}>Fullscreen Modal</Button>

        <Modal
          open={activeModal === 'small'}
          onClose={closeModal}
          title="Small Modal"
          size="small"
          primaryAction={{
            content: 'Close',
            onAction: closeModal,
          }}
        >
          <Modal.Section>
            <Text variant="bodyMd">A compact modal for simple interactions.</Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeModal === 'medium'}
          onClose={closeModal}
          title="Medium Modal"
          size="medium"
          primaryAction={{
            content: 'Close',
            onAction: closeModal,
          }}
        >
          <Modal.Section>
            <Text variant="bodyMd">A medium-sized modal for moderate content.</Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeModal === 'large'}
          onClose={closeModal}
          title="Large Modal"
          size="large"
          primaryAction={{
            content: 'Close',
            onAction: closeModal,
          }}
        >
          <Modal.Section>
            <Text variant="bodyMd">A large modal for complex content and forms.</Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeModal === 'fullscreen'}
          onClose={closeModal}
          title="Fullscreen Modal"
          size="fullScreen"
          primaryAction={{
            content: 'Close',
            onAction: closeModal,
          }}
        >
          <Modal.Section>
            <Text variant="bodyMd">A fullscreen modal for immersive experiences.</Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'sizes'),
  },

};

export const FormModal: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      company: '',
    });

    const handleChange = () => setActive(!active);

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      console.log('Form data:', formData);
      handleChange();
    };

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handleChange}>Create Customer</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Create New Customer"
          primaryAction={{
            content: 'Create Customer',
            onAction: handleSave,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Customer Name"
                value={formData.name}
                onChange={(value) => handleFieldChange('name', value)}
                placeholder="Enter customer name"
              />
              <TextField
                label="Email Address"
                value={formData.email}
                onChange={(value) => handleFieldChange('email', value)}
                placeholder="customer@example.com"
                type="email"
              />
              <TextField
                label="Company"
                value={formData.company}
                onChange={(value) => handleFieldChange('company', value)}
                placeholder="Enter company name"
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },

};

export const ModalWithoutActions: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const handleChange = () => setActive(!active);

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handleChange}>Show Terms</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Terms and Conditions"
          limitHeight
        >
          <Modal.Section>
            <Text variant="bodyMd" as="div">
              <h4>1. Acceptance of Terms</h4>
              <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

              <h4>2. Use License</h4>
              <p>Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.</p>

              <h4>3. Disclaimer</h4>
              <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

              <h4>4. Limitations</h4>
              <p>In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },

};

export const ModalWithFooter: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const handleChange = () => setActive(!active);

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handleChange}>Show Details</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Order Details"
          primaryAction={{
            content: 'Process Order',
            onAction: handleChange,
          }}
          footer
        >
          <Modal.Section>
            <Text variant="bodyMd" as="div">
              <h4>Order Information</h4>
              <p><strong>Order #:</strong> 1001</p>
              <p><strong>Date:</strong> November 5, 2025</p>
              <p><strong>Status:</strong> Pending</p>
              <p><strong>Total:</strong> $299.99</p>
            </Text>
          </Modal.Section>
          <Modal.Section>
            <Text variant="bodyMd" as="div">
              <h4>Customer Information</h4>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Email:</strong> john.doe@example.com</p>
              <p><strong>Phone:</strong> (555) 123-4567</p>
            </Text>
          </Modal.Section>
          <Modal.Section title="Order Items">
            <Text variant="bodyMd" as="div">
              <p>• Premium Widget (x2) - $199.98</p>
              <p>• Standard Widget (x1) - $99.99</p>
              <p><strong>Subtotal:</strong> $299.97</p>
              <p><strong>Tax:</strong> $0.02</p>
              <p><strong>Total:</strong> $299.99</p>
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },

};

export const NestedModals: Story = {
  render: () => {
    const [activePrimary, setActivePrimary] = React.useState(false);
    const [activeSecondary, setActiveSecondary] = React.useState(false);

    const handlePrimary = () => setActivePrimary(!activePrimary);
    const handleSecondary = () => setActiveSecondary(!activeSecondary);

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handlePrimary}>Open Primary Modal</Button>
        <Modal
          open={activePrimary}
          onClose={handlePrimary}
          title="Primary Modal"
          primaryAction={{
            content: 'Open Secondary',
            onAction: handleSecondary,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handlePrimary,
            },
          ]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              This is the primary modal. You can open a secondary modal from here to demonstrate layering.
            </Text>
          </Modal.Section>
        </Modal>

        <Modal
          open={activeSecondary}
          onClose={handleSecondary}
          title="Secondary Modal"
          primaryAction={{
            content: 'Confirm',
            onAction: handleSecondary,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleSecondary,
            },
          ]}
        >
          <Modal.Section>
            <Text variant="bodyMd">
              This is a nested modal that appears on top of the primary modal.
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },

};

export const IframeModal: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleChange = () => {
      setActive(!active);
      if (!active) setLoading(true);
    };

    const handleIframeLoad = () => setLoading(false);

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handleChange}>Open External Content</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="External Content"
          size="large"
          loading={loading}
          src="https://www.shopify.com"
          iFrameName="external-content"
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },

};

export const AccessibilityDemo: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const handleChange = () => setActive(!active);

    return (
      <div style={{ height: '500px' }}>
        <Button onClick={handleChange}>Accessible Modal</Button>
        <Modal
          open={active}
          onClose={handleChange}
          title="Accessibility Features"
          primaryAction={{
            content: 'Got it',
            onAction: handleChange,
          }}
          secondaryActions={[
            {
              content: 'Skip',
              onAction: handleChange,
            },
          ]}
        >
          <Modal.Section>
            <Text variant="bodyMd" as="div">
              <h4>Screen Reader Support</h4>
              <p>This modal is fully accessible with screen readers. It includes:</p>
              <ul>
                <li>Proper ARIA attributes</li>
                <li>Focus management</li>
                <li>Keyboard navigation</li>
                <li>Role announcements</li>
              </ul>

              <h4>Keyboard Navigation</h4>
              <p>• Press <kbd>Tab</kbd> to navigate between focusable elements</p>
              <p>• Press <kbd>Shift + Tab</kbd> to navigate backwards</p>
              <p>• Press <kbd>Escape</kbd> to close the modal</p>
              <p>• Focus is trapped within the modal</p>
            </Text>
          </Modal.Section>
        </Modal>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('modal', 'default'),
  },

};