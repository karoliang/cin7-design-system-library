import type { Meta, StoryObj } from '@storybook/react';
import { ActionList, Button, Popover, Icon } from '@shopify/polaris';
import { SearchMinor, SettingsMinor, ExportMinor, DuplicateMinor, DeleteMinor, EditMinor, ViewMajor, CircleTickMinor, CircleDisabledMinor } from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Navigation/ActionList',
  component: ActionList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Action lists are used to present a list of actions or commands that can be performed. They\'re commonly used in dropdown menus, context menus, and as action panels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of action items to display',
    },
    sections: {
      control: 'object',
      description: 'Array of sections to group actions',
    },
    onActionAnyItem: {
      control: 'function',
      description: 'Callback when any action is triggered',
    },
    actionRole: {
      control: 'select',
      options: ['menuitem', 'button'],
      description: 'ARIA role for actions',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items to be active',
    },
  },
} satisfies Meta<typeof ActionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { content: 'View product', icon: ViewMajor },
      { content: 'Edit product', icon: EditMinor },
      { content: 'Duplicate product', icon: DuplicateMinor },
      { content: 'Delete product', icon: DeleteMinor, destructive: true },
    ],
  },
};

export const WithActions: Story = {
  render: () => {
    const [popoverActive, setPopoverActive] = useState(false);

    const togglePopoverActive = () => {
      setPopoverActive(!popoverActive);
    };

    const activator = (
      <Button onClick={togglePopoverActive} disclosure="down">
        Actions
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
        >
          <ActionList
            items={[
              { content: 'View details', icon: ViewMajor, onAction: () => console.log('View clicked') },
              { content: 'Edit', icon: EditMinor, onAction: () => console.log('Edit clicked') },
              { content: 'Duplicate', icon: DuplicateMinor, onAction: () => console.log('Duplicate clicked') },
              { content: 'Delete', icon: DeleteMinor, destructive: true, onAction: () => console.log('Delete clicked') },
            ]}
          />
        </Popover>
      </div>
    );
  },
};

export const WithSections: Story = {
  args: {
    sections: [
      {
        title: 'Product actions',
        items: [
          { content: 'View product', icon: ViewMajor },
          { content: 'Edit product', icon: EditMinor },
          { content: 'Duplicate product', icon: DuplicateMinor },
        ],
      },
      {
        title: 'Inventory',
        items: [
          { content: 'Adjust inventory', icon: SettingsMinor },
          { content: 'View history', icon: SearchMinor },
        ],
      },
      {
        title: 'Danger zone',
        items: [
          { content: 'Delete product', icon: DeleteMinor, destructive: true },
          { content: 'Archive product', icon: CircleDisabledMinor, destructive: true },
        ],
      },
    ],
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { content: 'Available action', icon: ViewMajor },
      { content: 'Disabled action', icon: EditMinor, disabled: true },
      { content: 'Another action', icon: DuplicateMinor },
      { content: 'Also disabled', icon: SettingsMinor, disabled: true },
    ],
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { content: 'New order', badge: { status: 'new', content: 'New' } },
      { content: 'Processing', badge: { status: 'info', content: 'In progress' } },
      { content: 'Completed', badge: { status: 'success', content: 'Done' } },
      { content: 'Failed', badge: { status: 'critical', content: 'Error' } },
      { content: 'Custom badge', badge: { tone: 'magic', content: 'Special' } },
    ],
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    items: [
      {
        content: 'Active status',
        prefix: <Icon source={CircleTickMinor} color="success" />,
        suffix: 'Enabled'
      },
      {
        content: 'Inactive status',
        prefix: <Icon source={CircleDisabledMinor} color="subdued" />,
        suffix: 'Disabled'
      },
      {
        content: 'With help text',
        suffix: 'Optional',
        helpText: 'This action is reversible'
      },
    ],
  },
};

export const WithDestructiveActions: Story = {
  args: {
    items: [
      { content: 'Safe action', icon: EditMinor },
      { content: 'Warning action', icon: SettingsMinor, destructive: true },
      { content: 'Delete permanently', icon: DeleteMinor, destructive: true },
      { content: 'Remove access', destructive: true },
    ],
  },
};

export const WithExternalLinks: Story = {
  args: {
    items: [
      { content: 'Visit documentation', url: 'https://polaris.shopify.com', external: true },
      { content: 'Open support', url: 'https://support.shopify.com', external: true },
      { content: 'View API docs', url: '#', external: true },
    ],
  },
};

export const NestedMenuExample: Story = {
  render: () => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedAction, setSelectedAction] = useState<string>('');

    const handleActionClick = (action: string) => {
      setSelectedAction(action);
      setActiveMenu(null);
    };

    const menuItems = {
      products: [
        { content: 'All products', onAction: () => handleActionClick('All products') },
        { content: 'Add product', onAction: () => handleActionClick('Add product') },
        { content: 'Import products', onAction: () => handleActionClick('Import products') },
        { content: 'Export products', onAction: () => handleActionClick('Export products') },
      ],
      orders: [
        { content: 'All orders', onAction: () => handleActionClick('All orders') },
        { content: 'Draft orders', onAction: () => handleActionClick('Draft orders') },
        { content: 'Abandoned checkouts', onAction: () => handleActionClick('Abandoned checkouts') },
      ],
      customers: [
        { content: 'All customers', onAction: () => handleActionClick('All customers') },
        { content: 'Customer groups', onAction: () => handleActionClick('Customer groups') },
        { content: 'Import customers', onAction: () => handleActionClick('Import customers') },
      ],
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Navigation Menu</h4>
          <ActionList
            items={[
              {
                content: 'Products',
                icon: SearchMinor,
                onAction: () => setActiveMenu(activeMenu === 'products' ? null : 'products'),
              },
              {
                content: 'Orders',
                icon: ExportMinor,
                onAction: () => setActiveMenu(activeMenu === 'orders' ? null : 'orders'),
              },
              {
                content: 'Customers',
                icon: SettingsMinor,
                onAction: () => setActiveMenu(activeMenu === 'customers' ? null : 'customers'),
              },
            ]}
          />
        </div>

        {activeMenu && menuItems[activeMenu as keyof typeof menuItems] && (
          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600', textTransform: 'capitalize' }}>
              {activeMenu}
            </h4>
            <ActionList items={menuItems[activeMenu as keyof typeof menuItems]} />
          </div>
        )}

        {selectedAction && (
          <div style={{
            padding: '12px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{ margin: 0, fontSize: "14px", color: '#1e40af' }}>
              Selected action: <strong>{selectedAction}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
};

export const BulkActionsExample: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const items = [
      { id: '1', name: 'Product A', status: 'Active' },
      { id: '2', name: 'Product B', status: 'Draft' },
      { id: '3', name: 'Product C', status: 'Active' },
      { id: '4', name: 'Product D', status: 'Archived' },
    ];

    const handleSelectItem = (itemId: string) => {
      setSelectedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    };

    const handleBulkAction = (action: string) => {
      console.log(`Bulk action: ${action} on items:`, selectedItems);
      setIsMenuOpen(false);
    };

    const bulkActions = [
      { content: 'Edit selected', icon: EditMinor, onAction: () => handleBulkAction('edit') },
      { content: 'Duplicate selected', icon: DuplicateMinor, onAction: () => handleBulkAction('duplicate') },
      { content: 'Archive selected', onAction: () => handleBulkAction('archive') },
      { content: 'Delete selected', icon: DeleteMinor, destructive: true, onAction: () => handleBulkAction('delete') },
    ];

    return (
      <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0 }}>Products ({selectedItems.length} selected)</h4>
          {selectedItems.length > 0 && (
            <Popover
              active={isMenuOpen}
              activator={
                <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  Bulk actions
                </Button>
              }
              onClose={() => setIsMenuOpen(false)}
            >
              <ActionList items={bulkActions} />
            </Popover>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => (
            <div
              key={item.id}
              style={{
                padding: '12px',
                border: `1px solid ${selectedItems.includes(item.id) ? '#007ace' : '#e1e3e5'}`,
                borderRadius: '6px',
                backgroundColor: selectedItems.includes(item.id) ? '#f0f9ff' : 'white',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onClick={() => handleSelectItem(item.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => {}}
                  onClick={(e) => e.stopPropagation()}
                />
                <span>{item.name}</span>
              </div>
              <span style={{
                padding: '4px 8px',
                backgroundColor: item.status === 'Active' ? '#dcfce7' : '#f3f4f6',
                color: item.status === 'Active' ? '#166534' : '#374151',
                borderRadius: '4px',
                fontSize: "12px"
              }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {selectedItems.length > 0 && (
          <div style={{
            padding: '12px',
            backgroundColor: '#f0f9ff',
            borderRadius: '6px',
            border: '1px solid #bfdbfe',
            fontSize: "14px"
          }}>
            {selectedItems.length} items selected for bulk actions
          </div>
        )}
      </div>
    );
  },
};

export const ContextMenuExample: Story = {
  render: () => {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: string } | null>(null);
    const [actionHistory, setActionHistory] = useState<string[]>([]);

    const handleContextMenu = (e: React.MouseEvent, item: string) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY, item });
    };

    const handleAction = (action: string) => {
      if (contextMenu) {
        const message = `${action} - ${contextMenu.item}`;
        setActionHistory(prev => [message, ...prev.slice(0, 4)]);
        setContextMenu(null);
      }
    };

    const items = [
      'Product A - T-Shirt',
      'Product B - Jeans',
      'Product C - Shoes',
      'Product D - Hat',
    ];

    const contextActions = [
      { content: 'View details', icon: ViewMajor, onAction: () => handleAction('View details') },
      { content: 'Edit', icon: EditMinor, onAction: () => handleAction('Edit') },
      { content: 'Duplicate', icon: DuplicateMinor, onAction: () => handleAction('Duplicate') },
      { content: 'Delete', icon: DeleteMinor, destructive: true, onAction: () => handleAction('Delete') },
    ];

    return (
      <div style={{ maxWidth: '400px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>
          Right-click items for context menu
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '12px',
                border: '1px solid #e1e3e5',
                borderRadius: '6px',
                backgroundColor: 'white',
                cursor: 'context-menu',
                userSelect: 'none'
              }}
              onContextMenu={(e) => handleContextMenu(e, item)}
            >
              {item}
            </div>
          ))}
        </div>

        {contextMenu && (
          <div
            style={{
              position: 'fixed',
              left: contextMenu.x,
              top: contextMenu.y,
              zIndex: 1000,
            }}
            onClick={() => setContextMenu(null)}
          >
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e1e3e5',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ActionList items={contextActions} />
            </div>
          </div>
        )}

        {actionHistory.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <h5 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>
              Recent Actions:
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {actionHistory.map((action, index) => (
                <div key={index} style={{
                  padding: '6px 8px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  fontSize: "12px",
                  color: '#374151'
                }}>
                  {action}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};