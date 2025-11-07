import type { Meta, StoryObj } from '@storybook/react';
import { PageActions, Card, BlockStack, InlineStack, Text, Button, Badge } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Layout/PageActions',
  component: PageActions,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('pageactions', 'default'),
    docs: {
      description: {
        component: 'PageActions provides a standardized way to display primary and secondary actions at the bottom of a page or section. Perfect for forms, detail pages, and workflows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    primaryAction: {
      control: { type: 'object' },
      description: 'Primary action button configuration',
    },
    secondaryActions: {
      control: { type: 'array' },
      description: 'Secondary action buttons configuration',
    },
  },
} satisfies Meta<typeof PageActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryAction: {
      content: 'Save',
      onAction: () => console.log('Save clicked'),
    },
    secondaryActions: [
      {
        content: 'Cancel',
        onAction: () => console.log('Cancel clicked'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'default'),
  },

};

export const PrimaryOnly: Story = {
  args: {
    primaryAction: {
      content: 'Create product',
      onAction: () => console.log('Create product clicked'),
    },
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'primaryonly'),
  },

};

export const MultipleSecondary: Story = {
  args: {
    primaryAction: {
      content: 'Publish',
      onAction: () => console.log('Publish clicked'),
    },
    secondaryActions: [
      {
        content: 'Save draft',
        onAction: () => console.log('Save draft clicked'),
      },
      {
        content: 'Preview',
        onAction: () => console.log('Preview clicked'),
      },
      {
        content: 'Delete',
        destructive: true,
        onAction: () => console.log('Delete clicked'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'multiplesecondary'),
  },

};

export const DestructiveActions: Story = {
  args: {
    primaryAction: {
      content: 'Delete product',
      destructive: true,
      onAction: () => console.log('Delete product clicked'),
    },
    secondaryActions: [
      {
        content: 'Cancel',
        onAction: () => console.log('Cancel clicked'),
      },
      {
        content: 'Archive instead',
        onAction: () => console.log('Archive clicked'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'destructiveactions'),
  },

};

export const LoadingState: Story = {
  args: {
    primaryAction: {
      content: 'Saving...',
      loading: true,
      onAction: () => console.log('Save clicked'),
    },
    secondaryActions: [
      {
        content: 'Cancel',
        disabled: true,
        onAction: () => console.log('Cancel clicked'),
      },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'loadingstate'),
  },

};

export const ProductFormActions: Story = {
  render: () => {
    const [isSaving, setIsSaving] = React.useState(false);
    const [isPublished, setIsPublished] = React.useState(false);
    const [hasChanges, setHasChanges] = React.useState(false);

    const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setHasChanges(false);
        console.log('Product saved');
      }, 2000);
    };

    const handlePublish = () => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsPublished(true);
        setHasChanges(false);
        console.log('Product published');
      }, 2000);
    };

    const handleUnpublish = () => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsPublished(false);
        console.log('Product unpublished');
      }, 1500);
    };

    const handlePreview = () => {
      console.log('Preview product');
    };

    const handleDuplicate = () => {
      console.log('Duplicate product');
    };

    const handleDelete = () => {
      if (confirm('Are you sure you want to delete this product?')) {
        console.log('Product deleted');
      }
    };

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Product Information</h3>
              <Text as="p" tone="subdued">Edit your product details here</Text>
              {hasChanges && (
                <div style={{
                  marginTop: '16px',
                  padding: '8px 12px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '4px',
                  border: '1px solid #fcd34d'
                }}>
                  <Text variant="bodySm" as="p">You have unsaved changes</Text>
                </div>
              )}
            </div>
          </div>
        </Card>

        <PageActions
          primaryAction={{
            content: isPublished ? 'Unpublish' : 'Publish',
            onAction: isPublished ? handleUnpublish : handlePublish,
            loading: isSaving,
          }}
          secondaryActions={[
            {
              content: 'Save',
              onAction: handleSave,
              disabled: !hasChanges && isPublished,
            },
            {
              content: 'Preview',
              onAction: handlePreview,
            },
            {
              content: 'Duplicate',
              onAction: handleDuplicate,
            },
            {
              content: 'Delete',
              destructive: true,
              onAction: handleDelete,
            },
          ]}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'productformactions'),
  },

};

export const OrderManagementActions: Story = {
  render: () => {
    const [orderStatus, setOrderStatus] = React.useState<'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('pending');
    const [isLoading, setIsLoading] = React.useState(false);

    const updateOrderStatus = (newStatus: typeof orderStatus) => {
      setIsLoading(true);
      setTimeout(() => {
        setOrderStatus(newStatus);
        setIsLoading(false);
        console.log(`Order status updated to: ${newStatus}`);
      }, 1500);
    };

    const getPrimaryAction = () => {
      switch (orderStatus) {
        case 'pending':
          return {
            content: 'Process order',
            onAction: () => updateOrderStatus('processing'),
          };
        case 'processing':
          return {
            content: 'Mark as shipped',
            onAction: () => updateOrderStatus('shipped'),
          };
        case 'shipped':
          return {
            content: 'Mark as delivered',
            onAction: () => updateOrderStatus('delivered'),
          };
        case 'delivered':
          return {
            content: 'Archive order',
            onAction: () => console.log('Order archived'),
          };
        case 'cancelled':
          return {
            content: 'Reopen order',
            onAction: () => updateOrderStatus('pending'),
          };
        default:
          return {
            content: 'Process order',
            onAction: () => updateOrderStatus('processing'),
          };
      }
    };

    const getSecondaryActions = () => {
      const actions = [];

      if (orderStatus !== 'cancelled' && orderStatus !== 'delivered') {
        actions.push({
          content: 'Cancel order',
          destructive: true,
          onAction: () => updateOrderStatus('cancelled'),
        });
      }

      actions.push(
        {
          content: 'View details',
          onAction: () => console.log('View order details'),
        },
        {
          content: 'Print invoice',
          onAction: () => console.log('Print invoice'),
        },
        {
          content: 'Contact customer',
          onAction: () => console.log('Contact customer'),
        }
      );

      return actions;
    };

    const getStatusBadge = () => {
      const tone = {
        pending: 'attention',
        processing: 'info',
        shipped: 'warning',
        delivered: 'success',
        cancelled: 'critical',
      } as const;

      return {
        content: orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1),
        tone: tone[orderStatus],
      };
    };

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>Order #12345</h3>
                  <Text as="p" tone="subdued">Customer: John Doe - $299.99</Text>
                </div>
                <Badge {...getStatusBadge()} />
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <Text as="p">Order details and items would be displayed here...</Text>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #90caf9'
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">Order Workflow:</Text>
                  <InlineStack gap="200" wrap>
                    <Badge tone={orderStatus === 'pending' ? 'attention' : 'info'}>
                      Pending ✓
                    </Badge>
                    <Badge tone={orderStatus === 'processing' ? 'attention' : orderStatus === 'pending' ? 'subdued' : 'info'}>
                      Processing {['processing', 'shipped', 'delivered'].includes(orderStatus) ? '✓' : ''}
                    </Badge>
                    <Badge tone={orderStatus === 'shipped' ? 'attention' : !['pending', 'processing'].includes(orderStatus) ? 'subdued' : 'info'}>
                      Shipped {orderStatus === 'shipped' || orderStatus === 'delivered' ? '✓' : ''}
                    </Badge>
                    <Badge tone={orderStatus === 'delivered' ? 'attention' : orderStatus !== 'delivered' ? 'subdued' : 'info'}>
                      Delivered {orderStatus === 'delivered' ? '✓' : ''}
                    </Badge>
                  </InlineStack>
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>

        <PageActions
          primaryAction={{
            ...getPrimaryAction(),
            loading: isLoading,
          }}
          secondaryActions={getSecondaryActions()}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'ordermanagementactions'),
  },

};

export const CustomerProfileActions: Story = {
  render: () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [customerTier, setCustomerTier] = React.useState<'bronze' | 'silver' | 'gold' | 'platinum'>('silver');

    const handleEdit = () => {
      setIsEditing(true);
    };

    const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        console.log('Customer profile saved');
      }, 2000);
    };

    const handleCancel = () => {
      setIsEditing(false);
    };

    const handleSendEmail = () => {
      console.log('Send email to customer');
    };

    const handleViewOrders = () => {
      console.log('View customer orders');
    };

    const handleUpgradeTier = () => {
      const tiers: Array<typeof customerTier> = ['bronze', 'silver', 'gold', 'platinum'];
      const currentIndex = tiers.indexOf(customerTier);
      if (currentIndex < tiers.length - 1) {
        setCustomerTier(tiers[currentIndex + 1]);
        console.log(`Customer upgraded to ${tiers[currentIndex + 1]}`);
      }
    };

    const handleCreateOrder = () => {
      console.log('Create new order for customer');
    };

    const handleBlockCustomer = () => {
      if (confirm('Are you sure you want to block this customer?')) {
        console.log('Customer blocked');
      }
    };

    return (
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>Sarah Johnson</h3>
                  <Text as="p" tone="subdued">Customer since 2022 • 23 orders • $4,521 total</Text>
                </div>
                <Badge tone={customerTier === 'platinum' ? 'success' : customerTier === 'gold' ? 'warning' : 'info'}>
                  {customerTier.charAt(0).toUpperCase() + customerTier.slice(1)} Tier
                </Badge>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="bodySm" as="p" tone="subdued">Email</Text>
                  <Text as="p">sarah.johnson@email.com</Text>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="bodySm" as="p" tone="subdued">Phone</Text>
                  <Text as="p">+1 (555) 123-4567</Text>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="bodySm" as="p" tone="subdued">Last Order</Text>
                  <Text as="p">3 days ago</Text>
                </div>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text variant="bodySm" as="p" tone="subdued">Loyalty Points</Text>
                  <Text as="p">1,245</Text>
                </div>
              </div>

              {isEditing && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  border: '1px solid #fcd34d'
                }}>
                  <Text as="p">You are editing customer information. Click save to apply changes.</Text>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>

        <PageActions
          primaryAction={{
            content: isEditing ? 'Save changes' : 'Edit profile',
            onAction: isEditing ? handleSave : handleEdit,
            loading: isSaving,
          }}
          secondaryActions={isEditing ? [
            {
              content: 'Cancel',
              onAction: handleCancel,
            },
          ] : [
            {
              content: 'Send email',
              onAction: handleSendEmail,
            },
            {
              content: 'View orders',
              onAction: handleViewOrders,
            },
            {
              content: 'Create order',
              onAction: handleCreateOrder,
            },
            {
              content: 'Upgrade tier',
              onAction: handleUpgradeTier,
              disabled: customerTier === 'platinum',
            },
            {
              content: 'Block customer',
              destructive: true,
              onAction: handleBlockCustomer,
            },
          ]}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'customerprofileactions'),
  },

};

export const SettingsPageActions: Story = {
  render: () => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    const [settingsTab, setSettingsTab] = React.useState<'general' | 'security' | 'notifications'>('general');

    const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => {
        setIsSaving(false);
        setHasUnsavedChanges(false);
        console.log('Settings saved');
      }, 2000);
    };

    const handleReset = () => {
      if (confirm('Are you sure you want to reset all settings to default?')) {
        console.log('Settings reset to default');
        setHasUnsavedChanges(false);
      }
    };

    const handleExport = () => {
      console.log('Export settings');
    };

    const handleImport = () => {
      console.log('Import settings');
    };

    const simulateChange = () => {
      setHasUnsavedChanges(true);
    };

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Store Settings</h3>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  {['general', 'security', 'notifications'].map((tab) => (
                    <Button
                      key={tab}
                      size="small"
                      variant={settingsTab === tab ? 'primary' : 'plain'}
                      onClick={() => setSettingsTab(tab as any)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              <div style={{
                padding: '40px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5',
                textAlign: 'center'
              }}>
                <BlockStack gap="200">
                  <Text as="p">
                    {settingsTab.charAt(0).toUpperCase() + settingsTab.slice(1)} settings form
                  </Text>
                  <Button variant="plain" onClick={simulateChange}>
                    Simulate setting change
                  </Button>
                </BlockStack>
              </div>

              {hasUnsavedChanges && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  border: '1px solid #fcd34d'
                }}>
                  <BlockStack gap="100">
                    <Text as="p" fontWeight="600">Unsaved Changes</Text>
                    <Text variant="bodySm" as="p">
                      You have made changes to your settings. Remember to save before leaving this page.
                    </Text>
                  </BlockStack>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>

        <PageActions
          primaryAction={{
            content: 'Save settings',
            onAction: handleSave,
            loading: isSaving,
            disabled: !hasUnsavedChanges,
          }}
          secondaryActions={[
            {
              content: 'Reset to defaults',
              destructive: true,
              onAction: handleReset,
            },
            {
              content: 'Export settings',
              onAction: handleExport,
            },
            {
              content: 'Import settings',
              onAction: handleImport,
            },
          ]}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'settingspageactions'),
  },

};

export const BulkActions: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState(5);
    const [isProcessing, setIsProcessing] = React.useState(false);
    const [action, setAction] = React.useState<string>('');

    const handleBulkAction = (actionType: string) => {
      setAction(actionType);
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setAction('');
        console.log(`Bulk ${actionType} completed for ${selectedItems} items`);
      }, 2000);
    };

    const handleClearSelection = () => {
      setSelectedItems(0);
    };

    const handleSelectAll = () => {
      setSelectedItems(25);
    };

    return (
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>Product Management</h3>
                  <Text as="p" tone="subdued">Manage your product inventory</Text>
                </div>
                <Badge tone="attention">{selectedItems} selected</Badge>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <BlockStack gap="300">
                  <Text as="p">Bulk operations available:</Text>
                  <InlineStack gap="200" wrap>
                    <Button size="small" onClick={() => handleBulkAction('publish')}>
                      Publish selected
                    </Button>
                    <Button size="small" onClick={() => handleBulkAction('unpublish')}>
                      Unpublish selected
                    </Button>
                    <Button size="small" onClick={() => handleBulkAction('update')}>
                      Update prices
                    </Button>
                    <Button size="small" onClick={() => handleBulkAction('archive')}>
                      Archive selected
                    </Button>
                    <Button size="small" onClick={() => handleBulkAction('delete')} destructive>
                      Delete selected
                    </Button>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Button size="small" variant="plain" onClick={handleSelectAll}>
                      Select all (25)
                    </Button>
                    <Button size="small" variant="plain" onClick={handleClearSelection}>
                      Clear selection
                    </Button>
                  </InlineStack>
                </BlockStack>
              </div>

              {isProcessing && (
                <div style={{
                  padding: '16px',
                  backgroundColor: '#e3f2fd',
                  borderRadius: '8px',
                  border: '1px solid #90caf9'
                }}>
                  <Text as="p">Processing bulk {action} for {selectedItems} items...</Text>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>

        <PageActions
          primaryAction={{
            content: `Apply bulk ${action || 'action'}`,
            onAction: () => action && handleBulkAction(action),
            loading: isProcessing,
            disabled: selectedItems === 0 || !action,
          }}
          secondaryActions={[
            {
              content: 'Clear selection',
              onAction: handleClearSelection,
              disabled: selectedItems === 0,
            },
            {
              content: 'Export selected',
              onAction: () => console.log('Export selected items'),
              disabled: selectedItems === 0,
            },
          ]}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pageactions', 'bulkactions'),
  },

};