import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Button, Text, ActionList, FormLayout, TextField } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Popovers are small overlays that open when users interact with an element. They\'re used to display additional content or actions in context without leaving the current page.',
      },
    },
    codeVariants: getCodeVariants('popover', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    active: {
      control: 'boolean',
      description: 'Whether the popover is open',
    },
    activator: {
      control: 'text',
      description: 'The element that triggers the popover',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when popover is closed',
    },
    preferredAlignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Preferred horizontal alignment',
    },
    preferredPosition: {
      control: 'select',
      options: ['above', 'below', 'mostSpace'],
      description: 'Preferred vertical position',
    },
    fixed: {
      control: 'boolean',
      description: 'Use fixed positioning',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make popover full width',
    },
    hideOnPrint: {
      control: 'boolean',
      description: 'Hide popover when printing',
    },
    sectioned: {
      control: 'boolean',
      description: 'Add sectioning to content',
    },
    fluidContent: {
      control: 'boolean',
      description: 'Make content fluid width',
    },
    autofocusTarget: {
      control: 'select',
      options: ['first-node', 'none', 'container'],
      description: 'Element to focus on open',
    },
    zIndexOverride: {
      control: 'number',
      description: 'Override z-index value',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive} disclosure>
        More actions
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
        >
          <ActionList
            items={[
              { content: 'Import file', icon: 'ImportIcon' },
              { content: 'Export file', icon: 'ExportIcon' },
              { content: 'Download CSV', icon: 'DownloadIcon' },
            ]}
          />
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'buttonActivator'),
  },

};

export const ButtonActivator: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        Open Popover
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
        >
          <Popover.Section>
            <Text as="p">
              This popover is triggered by a button click. It contains simple text content.
            </Text>
          </Popover.Section>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'buttonActivator'),
  },

};

export const TextLinkActivator: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button plain onClick={toggleActive}>
        View details
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
        >
          <Popover.Section>
            <Text as="p">
              This popover is triggered by a text link. It's useful for showing additional context or options without disrupting the flow.
            </Text>
          </Popover.Section>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'textLinkActivator'),
  },

};

export const Positions: Story = {
  render: () => {
    const [activePopover, setActivePopover] = React.useState<string | null>(null);

    const togglePopover = (popoverName: string) => {
      setActivePopover(activePopover === popoverName ? null : popoverName);
    };

    const createActivator = (label: string, popoverName: string) => (
      <Button onClick={() => togglePopover(popoverName)}>
        {label}
      </Button>
    );

    return (
      <div style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Popover
              active={activePopover === 'aboveLeft'}
              activator={createActivator('Above Left', 'aboveLeft')}
              onClose={() => setActivePopover(null)}
              preferredAlignment="left"
              preferredPosition="above"
            >
              <Popover.Section>Appears above, aligned left</Popover.Section>
            </Popover>

            <Popover
              active={activePopover === 'aboveCenter'}
              activator={createActivator('Above Center', 'aboveCenter')}
              onClose={() => setActivePopover(null)}
              preferredAlignment="center"
              preferredPosition="above"
            >
              <Popover.Section>Appears above, centered</Popover.Section>
            </Popover>

            <Popover
              active={activePopover === 'aboveRight'}
              activator={createActivator('Above Right', 'aboveRight')}
              onClose={() => setActivePopover(null)}
              preferredAlignment="right"
              preferredPosition="above"
            >
              <Popover.Section>Appears above, aligned right</Popover.Section>
            </Popover>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '100px' }}>
          <div>
            <Popover
              active={activePopover === 'belowLeft'}
              activator={createActivator('Below Left', 'belowLeft')}
              onClose={() => setActivePopover(null)}
              preferredAlignment="left"
              preferredPosition="below"
            >
              <Popover.Section>Appears below, aligned left</Popover.Section>
            </Popover>

            <Popover
              active={activePopover === 'belowCenter'}
              activator={createActivator('Below Center', 'belowCenter')}
              onClose={() => setActivePopover(null)}
              preferredAlignment="center"
              preferredPosition="below"
            >
              <Popover.Section>Appears below, centered</Popover.Section>
            </Popover>

            <Popover
              active={activePopover === 'belowRight'}
              activator={createActivator('Below Right', 'belowRight')}
              onClose={() => setActivePopover(null)}
              preferredAlignment="right"
              preferredPosition="below"
            >
              <Popover.Section>Appears below, aligned right</Popover.Section>
            </Popover>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'positions'),
  },

};

export const WithActionList: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive} disclosure>
        Actions
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: 'View product details',
                icon: 'ViewIcon',
                onAction: toggleActive,
              },
              {
                content: 'Edit product',
                icon: 'EditIcon',
                onAction: toggleActive,
              },
              {
                content: 'Duplicate product',
                icon: 'DuplicateIcon',
                onAction: toggleActive,
              },
              {
                content: 'Delete product',
                icon: 'DeleteIcon',
                destructive: true,
                onAction: toggleActive,
              },
            ]}
          />
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'withActionList'),
  },

};

export const WithSections: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        Account Settings
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
          sectioned
        >
          <Popover.Section title="Profile">
            <Text as="p">
              Manage your profile information and preferences.
            </Text>
          </Popover.Section>
          <Popover.Section title="Security">
            <Text as="p">
              Configure security settings and two-factor authentication.
            </Text>
          </Popover.Section>
          <Popover.Section title="Notifications">
            <Text as="p">
              Choose how you want to be notified about important events.
            </Text>
          </Popover.Section>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'withSections'),
  },

};

export const WithForm: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
    });

    const toggleActive = () => setActive(!active);

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      toggleActive();
    };

    const activator = (
      <Button onClick={toggleActive}>
        Quick Add Customer
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
          sectioned
        >
          <FormLayout>
            <TextField
              label="Customer Name"
              value={formData.name}
              onChange={(value) => handleFieldChange('name', value)}
              placeholder="Enter name"
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(value) => handleFieldChange('email', value)}
              placeholder="customer@example.com"
              type="email"
            />
            <Button primary onClick={handleSubmit} fullWidth>
              Add Customer
            </Button>
          </FormLayout>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'withForm'),
  },

};

export const Dismissible: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        Dismissible Popover
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
        >
          <Popover.Section>
            <Text as="p">
              This popover can be dismissed by:
            </Text>
            <ul>
              <li>Clicking outside the popover</li>
              <li>Pressing the Escape key</li>
              <li>Clicking the close button</li>
            </ul>
          </Popover.Section>
          <Popover.Section>
            <Button plain onClick={toggleActive}>
              Close
            </Button>
          </Popover.Section>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'dismissible'),
  },

};

export const CustomWidth: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        Wide Popover
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
          fullWidth
          fluidContent
        >
          <Popover.Section>
            <Text as="p">
              This popover uses fullWidth and fluidContent to expand to its natural width.
            </Text>
          </Popover.Section>
          <Popover.Section>
            <FormLayout>
              <Text as="p">
                It's useful for content that needs more space, like forms or detailed information.
              </Text>
              <Button onClick={toggleActive}>Example Button</Button>
            </FormLayout>
          </Popover.Section>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'customWidth'),
  },

};

export const InteractiveExamples: Story = {
  render: () => {
    const [activePopover, setActivePopover] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState('');

    const togglePopover = (popoverName: string) => {
      setActivePopover(activePopover === popoverName ? null : popoverName);
    };

    const handleAction = (action: string) => {
      setMessage(`Action selected: ${action}`);
      setActivePopover(null);
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div style={{ height: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {message && (
          <div style={{
            padding: '12px',
            backgroundColor: '#f1f2f4',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Popover
            active={activePopover === 'share'}
            activator={<Button onClick={() => togglePopover('share')}>Share</Button>}
            onClose={() => setActivePopover(null)}
          >
            <ActionList
              items={[
                { content: 'Copy link', icon: 'LinkIcon', onAction: () => handleAction('Copy link') },
                { content: 'Email', icon: 'EmailIcon', onAction: () => handleAction('Email') },
                { content: 'Facebook', icon: 'FacebookIcon', onAction: () => handleAction('Facebook') },
                { content: 'Twitter', icon: 'TwitterIcon', onAction: () => handleAction('Twitter') },
              ]}
            />
          </Popover>

          <Popover
            active={activePopover === 'filter'}
            activator={<Button onClick={() => togglePopover('filter')}>Filter</Button>}
            onClose={() => setActivePopover(null)}
          >
            <Popover.Section>
              <Text as="p">Filter options:</Text>
              <ActionList
                items={[
                  { content: 'All orders', onAction: () => handleAction('All orders') },
                  { content: 'Pending', onAction: () => handleAction('Pending') },
                  { content: 'Completed', onAction: () => handleAction('Completed') },
                  { content: 'Cancelled', onAction: () => handleAction('Cancelled') },
                ]}
              />
            </Popover.Section>
          </Popover>

          <Popover
            active={activePopover === 'sort'}
            activator={<Button onClick={() => togglePopover('sort')}>Sort</Button>}
            onClose={() => setActivePopover(null)}
          >
            <Popover.Section>
              <Text as="p">Sort by:</Text>
              <ActionList
                items={[
                  { content: 'Date (newest)', onAction: () => handleAction('Date (newest)') },
                  { content: 'Date (oldest)', onAction: () => handleAction('Date (oldest)') },
                  { content: 'Name (A-Z)', onAction: () => handleAction('Name (A-Z)') },
                  { content: 'Name (Z-A)', onAction: () => handleAction('Name (Z-A)') },
                ]}
              />
            </Popover.Section>
          </Popover>

          <Popover
            active={activePopover === 'more'}
            activator={<Button onClick={() => togglePopover('more')} disclosure>More</Button>}
            onClose={() => setActivePopover(null)}
          >
            <ActionList
              items={[
                { content: 'View details', icon: 'ViewIcon', onAction: () => handleAction('View details') },
                { content: 'Edit', icon: 'EditIcon', onAction: () => handleAction('Edit') },
                { content: 'Duplicate', icon: 'DuplicateIcon', onAction: () => handleAction('Duplicate') },
                { content: 'Delete', icon: 'DeleteIcon', destructive: true, onAction: () => handleAction('Delete') },
              ]}
            />
          </Popover>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'interactiveExamples'),
  },

};

export const AccessibilityDemo: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive} ariaLabel="Open accessibility features menu">
        Accessibility Options
      </Button>
    );

    return (
      <div style={{ minHeight: '500px' }}>
        <Popover
          active={active}
          activator={activator}
          onClose={toggleActive}
          preferredPosition="below"
          autofocusTarget="first-node"
        >
          <Popover.Section>
            <Text as="p">
              This popover includes accessibility features:
            </Text>
            <ul>
              <li>Proper ARIA attributes</li>
              <li>Keyboard navigation support</li>
              <li>Focus management</li>
              <li>Screen reader announcements</li>
            </ul>
          </Popover.Section>
          <Popover.Section>
            <Text as="p">
              <strong>Keyboard shortcuts:</strong><br />
              Tab/Shift+Tab: Navigate<br />
              Enter/Space: Select<br />
              Escape: Close popover
            </Text>
          </Popover.Section>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('popover', 'accessibility'),
  },

};