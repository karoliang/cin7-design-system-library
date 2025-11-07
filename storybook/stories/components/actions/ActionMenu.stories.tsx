import type { Meta, StoryObj } from '@storybook/react';
import { ActionMenu, Button, Popover, Text } from '@shopify/polaris';
import { MenuHorizontalIcon, EditIcon, DeleteIcon, DuplicateIcon, ArchiveIcon, ViewIcon } from '@shopify/polaris-icons';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Actions/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ActionMenu displays a dropdown menu of actions that can be performed on an item. It\'s commonly used in tables, cards, and lists to provide contextual actions without cluttering the interface.',
      },
    },
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    actions: {
      control: 'object',
      description: 'Array of action objects to display in the menu',
    },
    activatorContent: {
      control: 'text',
      description: 'Content of the activator button (overridden by custom activator)',
    },
    rollup: {
      control: 'select',
      options: ['never', 'always', 'grouped'],
      description: 'How to roll up actions into groups',
    },
    groups: {
      control: 'object',
      description: 'Action groups for organizing menu items',
    },
    onOpen: {
      action: 'onOpen',
      description: 'Callback when menu opens',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when menu closes',
    },
  },
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activatorContent: 'Actions',
    actions: [
      {
        content: 'Edit',
        icon: EditIcon,
        onAction: () => console.log('Edit clicked'),
      },
      {
        content: 'Duplicate',
        icon: DuplicateIcon,
        onAction: () => console.log('Duplicate clicked'),
      },
      {
        content: 'Archive',
        icon: ArchiveIcon,
        onAction: () => console.log('Archive clicked'),
      },
      {
        content: 'Delete',
        icon: DeleteIcon,
        destructive: true,
        onAction: () => console.log('Delete clicked'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const WithIconButtonActivator: Story = {
  args: {
    actions: [
      {
        content: 'View details',
        icon: ViewIcon,
        onAction: () => console.log('View clicked'),
      },
      {
        content: 'Edit',
        icon: EditIcon,
        onAction: () => console.log('Edit clicked'),
      },
      {
        content: 'Delete',
        icon: DeleteIcon,
        destructive: true,
        onAction: () => console.log('Delete clicked'),
      },
    ],
    activator: (
      <Button size="slim" icon={MenuHorizontalIcon} />
    ),
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const GroupedActions: Story = {
  args: {
    activatorContent: 'Manage',
    groups: [
      {
        title: 'Primary actions',
        actions: [
          {
            content: 'Edit product',
            icon: EditIcon,
            onAction: () => console.log('Edit product'),
          },
          {
            content: 'Duplicate product',
            icon: DuplicateIcon,
            onAction: () => console.log('Duplicate product'),
          },
        ],
      },
      {
        title: 'Advanced',
        actions: [
          {
            content: 'Archive product',
            icon: ArchiveIcon,
            onAction: () => console.log('Archive product'),
          },
          {
            content: 'Delete product',
            icon: DeleteIcon,
            destructive: true,
            onAction: () => console.log('Delete product'),
          },
        ],
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const RollupVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Text as="p" fontWeight="bold">Never Rollup</Text>
        <div style={{ marginTop: '8px' }}>
          <ActionMenu
            activatorContent="Actions"
            rollup="never"
            actions={[
              { content: 'View', icon: ViewIcon, onAction: () => {} },
              { content: 'Edit', icon: EditIcon, onAction: () => {} },
              { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => {} },
            ]}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Text as="p" fontWeight="bold">Always Rollup</Text>
        <div style={{ marginTop: '8px' }}>
          <ActionMenu
            activatorContent="Actions"
            rollup="always"
            actions={[
              { content: 'View', icon: ViewIcon, onAction: () => {} },
              { content: 'Edit', icon: EditIcon, onAction: () => {} },
              { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => {} },
            ]}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Text as="p" fontWeight="bold">Grouped Rollup</Text>
        <div style={{ marginTop: '8px' }}>
          <ActionMenu
            activatorContent="Actions"
            rollup="grouped"
            groups={[
              {
                title: 'Basic',
                actions: [
                  { content: 'View', icon: ViewIcon, onAction: () => {} },
                  { content: 'Edit', icon: EditIcon, onAction: () => {} },
                ],
              },
              {
                title: 'Advanced',
                actions: [
                  { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => {} },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const DisabledActions: Story = {
  args: {
    activatorContent: 'Actions',
    actions: [
      {
        content: 'View',
        icon: ViewIcon,
        onAction: () => console.log('View clicked'),
      },
      {
        content: 'Edit',
        icon: EditIcon,
        disabled: true,
        onAction: () => console.log('Edit clicked'),
      },
      {
        content: 'Archive',
        icon: ArchiveIcon,
        onAction: () => console.log('Archive clicked'),
      },
      {
        content: 'Delete',
        icon: DeleteIcon,
        disabled: true,
        destructive: true,
        onAction: () => console.log('Delete clicked'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const ActionsWithBadges: Story = {
  args: {
    activatorContent: 'Quick actions',
    actions: [
      {
        content: 'New order',
        badge: {
          status: 'new',
          content: '3',
        },
        onAction: () => console.log('New order'),
      },
      {
        content: 'Pending review',
        badge: {
          status: 'attention',
          content: '12',
        },
        onAction: () => console.log('Pending review'),
      },
      {
        content: 'Urgent',
        badge: {
          status: 'critical',
          content: '!',
        },
        onAction: () => console.log('Urgent'),
      },
      {
        content: 'Completed',
        badge: {
          status: 'success',
          content: '✓',
        },
        onAction: () => console.log('Completed'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const LongActionList: Story = {
  args: {
    activatorContent: 'All actions',
    actions: [
      { content: 'View details', icon: ViewIcon, onAction: () => {} },
      { content: 'Edit', icon: EditIcon, onAction: () => {} },
      { content: 'Duplicate', icon: DuplicateIcon, onAction: () => {} },
      { content: 'Share', onAction: () => {} },
      { content: 'Export', onAction: () => {} },
      { content: 'Print', onAction: () => {} },
      { content: 'Archive', icon: ArchiveIcon, onAction: () => {} },
      { content: 'Delete', icon: DeleteIcon, destructive: true, onAction: () => {} },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const InteractiveMenu: Story = {
  render: () => {
    const [lastAction, setLastAction] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState(false);

    const handleAction = async (action: string) => {
      setLastAction(action);
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };

    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <ActionMenu
          activatorContent="Perform action"
          actions={[
            {
              content: isLoading ? 'Processing...' : 'Quick action',
              onAction: () => handleAction('Quick action'),
              loading: isLoading,
              disabled: isLoading,
            },
            {
              content: 'Save to draft',
              onAction: () => handleAction('Save to draft'),
            },
            {
              content: 'Publish now',
              onAction: () => handleAction('Publish now'),
            },
            {
              content: 'Schedule for later',
              onAction: () => handleAction('Schedule for later'),
            },
          ]}
        />

        {lastAction && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
            <Text>Last action: {lastAction}</Text>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const ContextualUsage: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<number[]>([]);
    const items = [
      { id: 1, name: 'Product A', price: '$29.99', status: 'Active' },
      { id: 2, name: 'Product B', price: '$49.99', status: 'Draft' },
      { id: 3, name: 'Product C', price: '$19.99', status: 'Active' },
    ];

    const toggleSelection = (id: number) => {
      setSelectedItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    };

    return (
      <div style={{ width: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Text as="h2" variant="headingMd">Products</Text>
          <ActionMenu
            activatorContent="Bulk actions"
            actions={[
              {
                content: 'Edit selected',
                icon: EditIcon,
                disabled: selectedItems.length === 0,
                onAction: () => console.log('Edit selected', selectedItems),
              },
              {
                content: 'Duplicate selected',
                icon: DuplicateIcon,
                disabled: selectedItems.length === 0,
                onAction: () => console.log('Duplicate selected', selectedItems),
              },
              {
                content: 'Archive selected',
                icon: ArchiveIcon,
                disabled: selectedItems.length === 0,
                onAction: () => console.log('Archive selected', selectedItems),
              },
              {
                content: 'Delete selected',
                icon: DeleteIcon,
                disabled: selectedItems.length === 0,
                destructive: true,
                onAction: () => console.log('Delete selected', selectedItems),
              },
            ]}
          />
        </div>

        <div style={{ border: '1px solid #e1e3e5', borderRadius: '4px', overflow: 'hidden' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid #e1e3e5',
                backgroundColor: selectedItems.includes(item.id) ? '#f8f9fa' : 'white',
              }}
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
                style={{ marginRight: '12px' }}
              />
              <div style={{ flex: 1 }}>
                <Text fontWeight="bold">{item.name}</Text>
                <Text color="subdued">{item.price}</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text color="subdued">{item.status}</Text>
                <ActionMenu
                  activator={<Button size="slim" icon={MenuHorizontalIcon} />}
                  actions={[
                    {
                      content: 'Edit',
                      icon: EditIcon,
                      onAction: () => console.log('Edit', item.id),
                    },
                    {
                      content: 'Duplicate',
                      icon: DuplicateIcon,
                      onAction: () => console.log('Duplicate', item.id),
                    },
                    {
                      content: 'Delete',
                      icon: DeleteIcon,
                      destructive: true,
                      onAction: () => console.log('Delete', item.id),
                    },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <Text color="subdued">{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</Text>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <Text as="p" variant="bodyMd">
        ActionMenu components are fully accessible with keyboard navigation and screen reader support.
        Use Tab to focus the activator, Enter or Space to open the menu, then arrow keys to navigate.
      </Text>

      <div style={{ marginTop: '20px' }}>
        <ActionMenu
          activatorContent="Accessible menu"
          actions={[
            {
              content: 'Keyboard accessible action',
              onAction: () => console.log('Accessible action'),
            },
            {
              content: 'Another action',
              onAction: () => console.log('Another action'),
            },
            {
              content: 'Destructive action',
              destructive: true,
              onAction: () => console.log('Destructive action'),
            },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};

export const WithinPopover: Story = {
  render: () => {
    const [popoverActive, setPopoverActive] = React.useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <Popover
          active={popoverActive}
          activator={
            <Button onClick={() => setPopoverActive(!popoverActive)}>
              Open popover with ActionMenu
            </Button>
          }
          onClose={() => setPopoverActive(false)}
        >
          <div style={{ padding: '16px' }}>
            <Text as="h3" variant="headingMd" marginBottom="12px">
              Product Options
            </Text>
            <ActionMenu
              activatorContent="More options"
              actions={[
                {
                  content: 'Configure settings',
                  onAction: () => console.log('Configure'),
                },
                {
                  content: 'Set permissions',
                  onAction: () => console.log('Permissions'),
                },
                {
                  content: 'View analytics',
                  onAction: () => console.log('Analytics'),
                },
              ]}
            />
          </div>
        </Popover>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('actionmenu', 'default'),
  },

};