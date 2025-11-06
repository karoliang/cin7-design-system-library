import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Icon,
  Text,
  Card,
  Checkbox,
  InlineStack,
  BlockStack,
  Popover,
  ActionList,
  Badge,
  ButtonGroup,
} from '@shopify/polaris';
import {
  EditIcon,
  DeleteIcon,
  ArchiveIcon,
  DuplicateIcon,
  PlusIcon,
  MoreHorizontalIcon,
} from '@shopify/polaris-icons';
import React from 'react';

// Custom BulkActions component for Polaris v13.9.5 compatibility
const CustomBulkActions: React.FC<{
  promotedActions?: any[];
  pageActions?: any[];
  actionType?: string;
  accessibilityLabel?: string;
}> = ({ promotedActions = [], pageActions = [], actionType, accessibilityLabel }) => {
  const [popoverActive, setPopoverActive] = React.useState(false);

  const togglePopover = () => setPopoverActive(!popoverActive);

  const promotedButtons = promotedActions.map((action, index) => (
    <Button
      key={index}
      onClick={action.onAction}
      icon={action.icon}
      destructive={action.destructive}
      loading={action.loading}
      disabled={action.disabled}
    >
      {action.content}
    </Button>
  ));

  const pageButtons = pageActions.map((action, index) => {
    if (action.actions) {
      return (
        <Popover
          key={index}
          active={popoverActive}
          activator={
            <Button onClick={togglePopover} disclosure>
              {action.content}
            </Button>
          }
          onClose={togglePopover}
        >
          <ActionList
            items={action.actions.map((item: any) => ({
              content: item.content,
              onAction: item.onAction,
              icon: item.icon,
              destructive: item.destructive,
            }))}
          />
        </Popover>
      );
    }
    return (
      <Button
        key={index}
        onClick={action.onAction}
        icon={action.icon}
      >
        {action.content}
      </Button>
    );
  });

  return (
    <InlineStack gap="200">
      {promotedButtons.length > 0 && (
        <ButtonGroup>{promotedButtons}</ButtonGroup>
      )}
      {pageButtons}
    </InlineStack>
  );
};

const meta = {
  title: 'Polaris/Actions/BulkActions',
  component: CustomBulkActions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'BulkActions provides a set of actions that can be performed on multiple selected items. It\'s commonly used in tables and lists to allow users to perform actions on multiple items at once.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    promotedActions: {
      control: 'object',
      description: 'Array of promoted action buttons to display',
    },
    pageActions: {
      control: 'object',
      description: 'Page-level actions to display',
    },
    measurement: {
      control: 'select',
      options: ['dynamic', 'fixed'],
      description: 'How to measure bulk actions visibility',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for the bulk actions',
    },
    actionType: {
      control: 'select',
      options: ['default', 'menu'],
      description: 'Type of bulk actions display',
    },
    selectMode: {
      control: 'boolean',
      description: 'Whether items are in selection mode',
    },
    onAction: {
      action: 'onAction',
      description: 'Callback when an action is performed',
    },
  },
} satisfies Meta<typeof CustomBulkActions>;

export default meta;
type Story = any;

const sampleItems = [
  { id: '1', name: 'Product A', status: 'Active', price: '$29.99' },
  { id: '2', name: 'Product B', status: 'Draft', price: '$49.99' },
  { id: '3', name: 'Product C', status: 'Active', price: '$19.99' },
  { id: '4', name: 'Product D', status: 'Active', price: '$39.99' },
  { id: '5', name: 'Product E', status: 'Archived', price: '$59.99' },
];

export const Default: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [selectAll, setSelectAll] = React.useState(false);

    const handleBulkAction = (action: string) => {
      console.log(`Bulk action "${action}" performed on items:`, selectedItems);
    };

    const promotedActions = [
      {
        content: 'Edit products',
        onAction: () => handleBulkAction('edit'),
        icon: EditIcon,
      },
      {
        content: 'Archive products',
        onAction: () => handleBulkAction('archive'),
        icon: ArchiveIcon,
      },
      {
        content: 'Delete products',
        onAction: () => handleBulkAction('delete'),
        icon: DeleteIcon,
        destructive: true,
      },
    ];

    const moreActions = [
      {
        content: 'Duplicate products',
        onAction: () => handleBulkAction('duplicate'),
        icon: DuplicateIcon,
      },
      {
        content: 'Add to collection',
        onAction: () => handleBulkAction('add-to-collection'),
        icon: PlusIcon,
      },
      {
        content: 'Export data',
        onAction: () => handleBulkAction('export'),
      },
      {
        content: 'Print labels',
        onAction: () => handleBulkAction('print'),
      },
    ];

    const toggleItemSelection = (id: string) => {
      setSelectedItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    };

    const toggleSelectAll = () => {
      if (selectAll) {
        setSelectedItems([]);
        setSelectAll(false);
      } else {
        setSelectedItems(sampleItems.map(item => item.id));
        setSelectAll(true);
      }
    };

    return (
      <div style={{ width: '800px' }}>
        <Card>
          <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <InlineStack gap="16px" align="center">
                <Checkbox
                  label="Select all"
                  labelHidden
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <Text variant="bodySm" color="subdued">
                  {selectedItems.length} of {sampleItems.length} selected
                </Text>
              </InlineStack>

              {selectedItems.length > 0 && (
                <CustomBulkActions
                  promotedActions={promotedActions}
                  pageActions={[
                    {
                      content: 'More actions',
                      actions: moreActions,
                    },
                  ]}
                />
              )}
            </div>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {sampleItems.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: '1px solid #e1e3e5',
                  backgroundColor: selectedItems.includes(item.id) ? '#f8f9fa' : 'white',
                }}
              >
                <Checkbox
                  label={`Select ${item.name}`}
                  labelHidden
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                />
                <div style={{ marginLeft: '16px', flex: 1 }}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text color="subdued">{item.status} • {item.price}</Text>
                </div>
                <Badge status={item.status === 'Active' ? 'success' : 'attention'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  },
};

export const WithPageActions: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const handleBulkAction = (action: string) => {
      console.log(`Bulk action "${action}" performed on items:`, selectedItems);
    };

    const pageActions = [
      {
        content: 'Add products',
        onAction: () => handleBulkAction('add'),
        icon: PlusIcon,
      },
      {
        content: 'Import products',
        onAction: () => handleBulkAction('import'),
      },
    ];

    const promotedActions = [
      {
        content: 'Edit selected',
        onAction: () => handleBulkAction('edit'),
        icon: EditIcon,
      },
      {
        content: 'Delete selected',
        onAction: () => handleBulkAction('delete'),
        icon: DeleteIcon,
        destructive: true,
      },
    ];

    return (
      <div style={{ width: '800px' }}>
        <Card>
          <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="headingMd">Products</Text>
              <CustomBulkActions
                pageActions={pageActions}
                selectMode={selectedItems.length > 0}
              />
            </div>
          </div>

          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <Button onClick={() => setSelectedItems(['1', '2', '3'])}>
                Select 3 items
              </Button>
              <Button onClick={() => setSelectedItems([])}>
                Clear selection
              </Button>
            </div>

            {selectedItems.length > 0 && (
              <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px', marginBottom: '16px' }}>
                <Text>{selectedItems.length} items selected</Text>
                <div style={{ marginTop: '12px' }}>
                  <CustomBulkActions
                    promotedActions={promotedActions}
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
              {sampleItems.map(item => (
                <div
                  key={item.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #e1e3e5',
                    borderRadius: '4px',
                    backgroundColor: selectedItems.includes(item.id) ? '#f8f9fa' : 'white',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setSelectedItems(prev =>
                      prev.includes(item.id)
                        ? prev.filter(id => id !== item.id)
                        : [...prev, item.id]
                    );
                  }}
                >
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text color="subdued">{item.price}</Text>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const MenuActionType: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const handleBulkAction = (action: string) => {
      console.log(`Menu action "${action}" performed on items:`, selectedItems);
    };

    const promotedActions = [
      {
        content: 'Quick edit',
        onAction: () => handleBulkAction('quick-edit'),
        icon: EditIcon,
      },
    ];

    const menuActions = [
      {
        title: 'Product actions',
        actions: [
          {
            content: 'Duplicate',
            onAction: () => handleBulkAction('duplicate'),
            icon: DuplicateIcon,
          },
          {
            content: 'Archive',
            onAction: () => handleBulkAction('archive'),
            icon: ArchiveIcon,
          },
          {
            content: 'Delete',
            onAction: () => handleBulkAction('delete'),
            icon: DeleteIcon,
            destructive: true,
          },
        ],
      },
      {
        title: 'Organization',
        actions: [
          {
            content: 'Add to collection',
            onAction: () => handleBulkAction('add-to-collection'),
          },
          {
            content: 'Move to folder',
            onAction: () => handleBulkAction('move-to-folder'),
          },
        ],
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <Card>
          <div style={{ padding: '24px', textAlign: 'center' }}>
            <BlockStack gap="16px">
              <Button onClick={() => setSelectedItems(['1', '2'])}>
                Select items to see menu actions
              </Button>

              {selectedItems.length > 0 && (
                <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <Text>{selectedItems.length} items selected</Text>
                  <div style={{ marginTop: '12px' }}>
                    <CustomBulkActions
                      actionType="menu"
                      promotedActions={promotedActions}
                      pageActions={[
                        {
                          content: 'More actions',
                          actions: menuActions,
                        },
                      ]}
                    />
                  </div>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithLoadingStates: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>(['1', '2']);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleBulkAction = async (action: string) => {
      setIsLoading(true);
      console.log(`Bulk action "${action}" started on items:`, selectedItems);

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsLoading(false);
      console.log(`Bulk action "${action}" completed`);
    };

    const promotedActions = [
      {
        content: isLoading ? 'Processing...' : 'Archive products',
        onAction: () => handleBulkAction('archive'),
        icon: ArchiveIcon,
        loading: isLoading,
        disabled: isLoading,
      },
      {
        content: 'Edit products',
        onAction: () => handleBulkAction('edit'),
        icon: EditIcon,
        disabled: isLoading,
      },
      {
        content: 'Delete products',
        onAction: () => handleBulkAction('delete'),
        icon: DeleteIcon,
        destructive: true,
        disabled: isLoading,
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Bulk Actions with Loading States</Text>

              <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <Text>{selectedItems.length} items selected</Text>
                <div style={{ marginTop: '12px' }}>
                  <CustomBulkActions
                    promotedActions={promotedActions}
                  />
                </div>
              </div>

              <Button onClick={() => setIsLoading(!isLoading)}>
                {isLoading ? 'Stop loading' : 'Start loading'}
              </Button>

              <Text variant="bodySm" color="subdued">
                Click "Archive products" to see loading state in action
              </Text>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithConditionalActions: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [items, setItems] = React.useState(sampleItems);

    const handleBulkAction = (action: string) => {
      console.log(`Bulk action "${action}" performed on items:`, selectedItems);

      if (action === 'archive') {
        setItems(prev => prev.map(item =>
          selectedItems.includes(item.id)
            ? { ...item, status: 'Archived' }
            : item
        ));
      } else if (action === 'restore') {
        setItems(prev => prev.map(item =>
          selectedItems.includes(item.id)
            ? { ...item, status: 'Active' }
            : item
        ));
      }
    };

    // Get dynamic actions based on selected items
    const getPromotedActions = () => {
      const selectedItemsData = items.filter(item => selectedItems.includes(item.id));
      const hasActiveItems = selectedItemsData.some(item => item.status === 'Active');
      const hasArchivedItems = selectedItemsData.some(item => item.status === 'Archived');

      const actions = [];

      if (hasActiveItems) {
        actions.push({
          content: 'Archive selected',
          onAction: () => handleBulkAction('archive'),
          icon: ArchiveIcon,
        });
      }

      if (hasArchivedItems) {
        actions.push({
          content: 'Restore selected',
          onAction: () => handleBulkAction('restore'),
          icon: EditIcon,
        });
      }

      actions.push({
        content: 'Delete selected',
        onAction: () => handleBulkAction('delete'),
        icon: DeleteIcon,
        destructive: true,
      });

      return actions;
    };

    const toggleItemSelection = (id: string) => {
      setSelectedItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    };

    return (
      <div style={{ width: '800px' }}>
        <Card>
          <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="headingMd">Products with Conditional Actions</Text>
              <Text variant="bodySm" color="subdued">
                {selectedItems.length} of {items.length} selected
              </Text>
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
              <CustomBulkActions
                promotedActions={getPromotedActions()}
              />
            </div>
          )}

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: '1px solid #e1e3e5',
                  backgroundColor: selectedItems.includes(item.id) ? '#f8f9fa' : 'white',
                }}
              >
                <Checkbox
                  label={`Select ${item.name}`}
                  labelHidden
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItemSelection(item.id)}
                />
                <div style={{ marginLeft: '16px', flex: 1 }}>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text color="subdued">{item.price}</Text>
                </div>
                <Badge status={item.status === 'Active' ? 'success' : 'attention'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  },
};

export const WithAccessibility: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);

    const handleBulkAction = (action: string) => {
      console.log(`Bulk action "${action}" performed on items:`, selectedItems);
    };

    const promotedActions = [
      {
        content: 'Edit products',
        onAction: () => handleBulkAction('edit'),
        icon: EditIcon,
      },
      {
        content: 'Delete products',
        onAction: () => handleBulkAction('delete'),
        icon: DeleteIcon,
        destructive: true,
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Accessible Bulk Actions</Text>

              <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <Text as="p" variant="bodySm">
                  BulkActions are fully accessible with keyboard navigation and screen reader support.
                  Use Tab to navigate between actions, Enter or Space to activate them.
                </Text>

                <div style={{ marginTop: '16px' }}>
                  <Button onClick={() => setSelectedItems(['1', '2'])}>
                    Select items to enable actions
                  </Button>
                </div>
              </div>

              {selectedItems.length > 0 && (
                <div style={{ padding: '16px', backgroundColor: 'white', border: '1px solid #e1e3e5', borderRadius: '4px' }}>
                  <Text>{selectedItems.length} items selected</Text>
                  <div style={{ marginTop: '12px' }}>
                    <CustomBulkActions
                      promotedActions={promotedActions}
                      accessibilityLabel={`Actions for ${selectedItems.length} selected items`}
                    />
                  </div>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const IntegrationExample: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [items] = React.useState([
      { id: '1', name: 'Order #1001', customer: 'John Doe', total: '$299.99', status: 'Fulfilled' },
      { id: '2', name: 'Order #1002', customer: 'Jane Smith', total: '$149.99', status: 'Pending' },
      { id: '3', name: 'Order #1003', customer: 'Bob Johnson', total: '$599.99', status: 'Unfulfilled' },
      { id: '4', name: 'Order #1004', customer: 'Alice Brown', total: '$89.99', status: 'Fulfilled' },
    ]);

    const handleBulkAction = (action: string) => {
      console.log(`Bulk action "${action}" performed on orders:`, selectedItems);
    };

    const promotedActions = [
      {
        content: 'Fulfill orders',
        onAction: () => handleBulkAction('fulfill'),
        icon: EditIcon,
      },
      {
        content: 'Archive orders',
        onAction: () => handleBulkAction('archive'),
        icon: ArchiveIcon,
      },
      {
        content: 'Cancel orders',
        onAction: () => handleBulkAction('cancel'),
        icon: DeleteIcon,
        destructive: true,
      },
    ];

    const pageActions = [
      {
        content: 'Create order',
        onAction: () => handleBulkAction('create'),
        icon: PlusIcon,
      },
      {
        content: 'Import orders',
        onAction: () => handleBulkAction('import'),
      },
    ];

    const toggleItemSelection = (id: string) => {
      setSelectedItems(prev =>
        prev.includes(id)
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    };

    const getStatusBadge = (status: string) => {
      const statusConfig = {
        Fulfilled: { status: 'success' as const },
        Pending: { status: 'attention' as const },
        Unfulfilled: { status: 'info' as const },
      };
      return statusConfig[status as keyof typeof statusConfig] || { status: 'default' as const };
    };

    return (
      <div style={{ width: '900px' }}>
        <Card>
          <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text variant="headingMd">Orders</Text>
              <CustomBulkActions
                pageActions={pageActions}
                selectMode={selectedItems.length > 0}
              />
            </div>
          </div>

          {selectedItems.length > 0 && (
            <div style={{ padding: '16px', borderBottom: '1px solid #e1e3e5', backgroundColor: '#f8f9fa' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text>
                  {selectedItems.length} order{selectedItems.length !== 1 ? 's' : ''} selected
                </Text>
                <CustomBulkActions
                  promotedActions={promotedActions}
                />
              </div>
            </div>
          )}

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e1e3e5' }}>
                  <th style={{ padding: '16px', textAlign: 'left', width: '48px' }}>
                    <Checkbox
                      label="Select all"
                      labelHidden
                      checked={selectedItems.length === items.length}
                      onChange={(checked) => {
                        if (checked) {
                          setSelectedItems(items.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                    />
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Order</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Total</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #e1e3e5',
                      backgroundColor: selectedItems.includes(item.id) ? '#f8f9fa' : 'white',
                    }}
                  >
                    <td style={{ padding: '16px' }}>
                      <Checkbox
                        label={`Select ${item.name}`}
                        labelHidden
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleItemSelection(item.id)}
                      />
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Text fontWeight="bold">{item.name}</Text>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Text>{item.customer}</Text>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Text>{item.total}</Text>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <Badge {...getStatusBadge(item.status)}>
                        {item.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  },
};