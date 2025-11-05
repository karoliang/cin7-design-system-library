import type { Meta, StoryObj } from '@storybook/react';
import { ButtonFrom, Card, Text, InlineStack, BlockStack } from '@shopify/polaris';
import {
  SearchMinor,
  ExportMinor,
  ImportMinor,
  DeleteMinor,
  EditMinor,
  PlusMinor,
  RefreshMinor
} from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Utilities/ButtonFrom',
  component: ButtonFrom,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ButtonFrom creates buttons dynamically from configuration objects. This is useful for generating buttons from data, API responses, or configuration files.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    action: {
      control: 'object',
      description: 'Button action configuration object',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
    disclosure: {
      control: 'boolean',
      description: 'Show disclosure indicator',
    },
    external: {
      control: 'boolean',
      description: 'Open link in new tab',
    },
    icon: {
      control: 'boolean',
      description: 'Show icon before content',
    },
    id: {
      control: 'text',
      description: 'Button ID',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    outline: {
      control: 'boolean',
      description: 'Show outline style',
    },
    plain: {
      control: 'boolean',
      description: 'Show plain style',
    },
    primary: {
      control: 'boolean',
      description: 'Show primary style',
    },
    pressed: {
      control: 'boolean',
      description: 'Show pressed state',
    },
    submit: {
      control: 'boolean',
      description: 'Button acts as submit input',
    },
    size: {
      control: 'select',
      options: ['micro', 'small', 'medium', 'large'],
      description: 'Button size',
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    removeUnderline: {
      control: 'boolean',
      description: 'Remove underline from plain buttons',
    },
    monochrome: {
      control: 'boolean',
      description: 'Remove color from button',
    },
  },
} satisfies Meta<typeof ButtonFrom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: {
      content: 'Click me',
      onAction: () => console.log('Button clicked'),
    },
  },
};

export const BasicAction: Story = {
  render: () => {
    const action = {
      content: 'Basic Button',
      onAction: () => alert('Basic button clicked!'),
    };

    return <ButtonFrom action={action} />;
  },
};

export const ButtonVariants: Story = {
  render: () => {
    const actions = [
      { content: 'Primary', primary: true },
      { content: 'Secondary', outline: true },
      { content: 'Plain', plain: true },
      { content: 'Destructive', destructive: true },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Button Variants</Text>
        <div style={{ marginTop: '16px' }}>
          <InlineStack gap="400">
            {actions.map((action, index) => (
              <ButtonFrom
                key={index}
                action={{
                  ...action,
                  onAction: () => console.log(`${action.content} button clicked`),
                }}
              />
            ))}
          </InlineStack>
        </div>
      </Card>
    );
  },
};

export const ButtonSizes: Story = {
  render: () => {
    const actions = [
      { content: 'Micro', size: 'micro' as const },
      { content: 'Small', size: 'small' as const },
      { content: 'Medium', size: 'medium' as const },
      { content: 'Large', size: 'large' as const },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Button Sizes</Text>
        <div style={{ marginTop: '16px' }}>
          <BlockStack gap="400" align="start">
            {actions.map((action, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Text as="span" variant="bodySm" tone="subdued" style={{ width: '80px' }}>
                  {action.size}
                </Text>
                <ButtonFrom
                  action={{
                    ...action,
                    onAction: () => console.log(`${action.size} button clicked`),
                  }}
                />
              </div>
            ))}
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const iconActions = [
      { content: 'Search', icon: SearchMinor },
      { content: 'Export', icon: ExportMinor },
      { content: 'Import', icon: ImportMinor },
      { content: 'Delete', icon: DeleteMinor, destructive: true },
      { content: 'Edit', icon: EditMinor },
      { content: 'Add', icon: PlusMinor, primary: true },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Buttons with Icons</Text>
        <div style={{ marginTop: '16px' }}>
          <InlineStack gap="400" wrap>
            {iconActions.map((action, index) => (
              <ButtonFrom
                key={index}
                action={{
                  ...action,
                  onAction: () => console.log(`${action.content} button clicked`),
                }}
              />
            ))}
          </InlineStack>
        </div>
      </Card>
    );
  },
};

export const FromAPIResponse: Story = {
  render: () => {
    // Simulate API response for available actions
    const apiResponse = {
      actions: [
        {
          id: 'save',
          content: 'Save Changes',
          primary: true,
          onAction: () => console.log('Saving changes...'),
        },
        {
          id: 'preview',
          content: 'Preview',
          outline: true,
          onAction: () => console.log('Opening preview...'),
        },
        {
          id: 'cancel',
          content: 'Cancel',
          plain: true,
          onAction: () => console.log('Cancelled'),
        },
      ],
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Actions from API Response</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Buttons generated from a simulated API response.
        </Text>
        <div style={{ marginTop: '16px' }}>
          <InlineStack gap="200">
            {apiResponse.actions.map((action) => (
              <ButtonFrom key={action.id} action={action} />
            ))}
          </InlineStack>
        </div>
      </Card>
    );
  },
};

export const DynamicButtonGeneration: Story = {
  render: () => {
    const [userRole, setUserRole] = React.useState<'guest' | 'user' | 'admin'>('guest');
    const [loading, setLoading] = React.useState(false);

    // Define button configurations based on user role
    const buttonConfigs = {
      guest: [
        { content: 'Login', primary: true, onAction: () => setUserRole('user') },
        { content: 'Sign Up', outline: true, onAction: () => console.log('Sign up') },
      ],
      user: [
        { content: 'View Profile', onAction: () => console.log('View profile') },
        { content: 'Settings', outline: true, onAction: () => console.log('Open settings') },
        { content: 'Logout', plain: true, onAction: () => setUserRole('guest') },
      ],
      admin: [
        { content: 'Dashboard', primary: true, onAction: () => console.log('Open dashboard') },
        { content: 'Users', onAction: () => console.log('Manage users') },
        { content: 'Settings', outline: true, onAction: () => console.log('Admin settings') },
        { content: 'Logout', plain: true, onAction: () => setUserRole('guest') },
      ],
    };

    const handleRefresh = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log('Refreshed');
      }, 2000);
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Dynamic Button Generation</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Buttons change based on user role: <strong>{userRole}</strong>
        </Text>

        <div style={{ margin: '16px 0' }}>
          <InlineStack gap="200">
            <ButtonFrom
              action={{
                content: 'Refresh',
                icon: RefreshMinor,
                loading,
                onAction: handleRefresh,
              }}
            />
            <ButtonFrom
              action={{
                content: 'Switch to Guest',
                size: 'small',
                plain: true,
                onAction: () => setUserRole('guest'),
              }}
            />
            <ButtonFrom
              action={{
                content: 'Switch to User',
                size: 'small',
                plain: true,
                onAction: () => setUserRole('user'),
              }}
            />
            <ButtonFrom
              action={{
                content: 'Switch to Admin',
                size: 'small',
                plain: true,
                onAction: () => setUserRole('admin'),
              }}
            />
          </InlineStack>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: 'var(--p-color-bg-surface-subdued)',
          borderRadius: '4px'
        }}>
          <Text as="h4" variant="headingSm">Available Actions:</Text>
          <div style={{ marginTop: '12px' }}>
            <InlineStack gap="200" wrap>
              {buttonConfigs[userRole].map((action, index) => (
                <ButtonFrom
                  key={index}
                  action={action}
                />
              ))}
            </InlineStack>
          </div>
        </div>
      </Card>
    );
  },
};

export const ConditionalButtons: Story = {
  render: () => {
    const [permissions, setPermissions] = React.useState({
      canEdit: false,
      canDelete: false,
      canExport: true,
      canImport: false,
    });

    const togglePermission = (permission: keyof typeof permissions) => {
      setPermissions(prev => ({
        ...prev,
        [permission]: !prev[permission]
      }));
    };

    // Define all possible actions
    const allActions = [
      {
        content: 'Edit',
        icon: EditMinor,
        onAction: () => console.log('Edit action'),
        condition: permissions.canEdit,
      },
      {
        content: 'Delete',
        icon: DeleteMinor,
        destructive: true,
        onAction: () => console.log('Delete action'),
        condition: permissions.canDelete,
      },
      {
        content: 'Export',
        icon: ExportMinor,
        onAction: () => console.log('Export action'),
        condition: permissions.canExport,
      },
      {
        content: 'Import',
        icon: ImportMinor,
        onAction: () => console.log('Import action'),
        condition: permissions.canImport,
      },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Conditional Buttons</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Buttons appear/disappear based on permissions
        </Text>

        <div style={{ margin: '16px 0' }}>
          <Text as="h4" variant="headingSm">Toggle Permissions:</Text>
          <div style={{ marginTop: '8px' }}>
            <InlineStack gap="200" wrap>
              {Object.entries(permissions).map(([key, value]) => (
                <ButtonFrom
                  key={key}
                  action={{
                    content: `${key}: ${value ? '✓' : '✗'}`,
                    plain: true,
                    size: 'small',
                    onAction: () => togglePermission(key as keyof typeof permissions),
                  }}
                />
              ))}
            </InlineStack>
          </div>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: 'var(--p-color-bg-surface-subdued)',
          borderRadius: '4px'
        }}>
          <Text as="h4" variant="headingSm">Available Actions:</Text>
          <div style={{ marginTop: '12px' }}>
            <InlineStack gap="200" wrap>
              {allActions
                .filter(action => action.condition)
                .map((action, index) => (
                  <ButtonFrom
                    key={index}
                    action={{
                      content: action.content,
                      icon: action.icon,
                      destructive: action.destructive,
                      onAction: action.onAction,
                    }}
                  />
                ))}
            </InlineStack>
            {allActions.filter(action => action.condition).length === 0 && (
              <Text as="p" variant="bodySm" tone="subdued">
                No actions available with current permissions
              </Text>
            )}
          </div>
        </div>
      </Card>
    );
  },
};

export const FormActions: Story = {
  render: () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isDirty, setIsDirty] = React.useState(false);

    const formActions = {
      pristine: [
        {
          content: 'Save',
          primary: true,
          disabled: !isDirty,
          onAction: () => {
            setIsSubmitting(true);
            setTimeout(() => {
              setIsSubmitting(false);
              setIsDirty(false);
              console.log('Form saved');
            }, 2000);
          },
        },
        {
          content: 'Cancel',
          plain: true,
          onAction: () => console.log('Form cancelled'),
        },
      ],
      submitting: [
        {
          content: 'Saving...',
          primary: true,
          loading: true,
          disabled: true,
        },
        {
          content: 'Cancel',
          plain: true,
          onAction: () => console.log('Form cancelled'),
        },
      ],
    };

    const currentActions = isSubmitting ? formActions.submitting : formActions.pristine;

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Form Actions</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Form actions that change based on state
        </Text>

        <div style={{ margin: '16px 0' }}>
          <BlockStack gap="300">
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: "var(--font-size-sm)", fontWeight: '500' }}>
                Form Field
              </label>
              <input
                type="text"
                placeholder="Type something to mark form as dirty..."
                onChange={(e) => setIsDirty(e.target.value.length > 0)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid var(--p-color-border)',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-sm)"
                }}
              />
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: 'var(--p-color-bg-surface-subdued)',
              borderRadius: '4px'
            }}>
              <Text as="h4" variant="headingSm">Form Status:</Text>
              <div style={{ marginTop: '8px' }}>
                <Text as="p" variant="bodySm">
                  Dirty: {isDirty ? '✓' : '✗'} | Submitting: {isSubmitting ? '✓' : '✗'}
                </Text>
              </div>
              <div style={{ marginTop: '12px' }}>
                <InlineStack gap="200">
                  {currentActions.map((action, index) => (
                    <ButtonFrom
                      key={index}
                      action={action}
                    />
                  ))}
                </InlineStack>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};

export const BulkActions: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
    const [loadingAction, setLoadingAction] = React.useState<string | null>(null);

    const items = [
      { id: '1', name: 'Product A' },
      { id: '2', name: 'Product B' },
      { id: '3', name: 'Product C' },
      { id: '4', name: 'Product D' },
    ];

    const toggleItem = (itemId: string) => {
      setSelectedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    };

    const bulkActions = [
      {
        content: 'Export',
        icon: ExportMinor,
        onAction: async () => {
          setLoadingAction('export');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setLoadingAction(null);
          console.log('Exported items:', selectedItems);
        },
        loading: loadingAction === 'export',
      },
      {
        content: 'Delete',
        icon: DeleteMinor,
        destructive: true,
        onAction: async () => {
          setLoadingAction('delete');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setLoadingAction(null);
          console.log('Deleted items:', selectedItems);
          setSelectedItems([]);
        },
        loading: loadingAction === 'delete',
      },
      {
        content: 'Select All',
        onAction: () => {
          if (selectedItems.length === items.length) {
            setSelectedItems([]);
          } else {
            setSelectedItems(items.map(item => item.id));
          }
        },
      },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Bulk Actions</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Select items to see bulk action buttons
        </Text>

        <div style={{ margin: '16px 0' }}>
          <BlockStack gap="200">
            {items.map(item => (
              <div
                key={item.id}
                style={{
                  padding: '12px',
                  border: `1px solid ${selectedItems.includes(item.id) ? 'var(--p-color-interactive)' : 'var(--p-color-border)'}`,
                  borderRadius: '4px',
                  backgroundColor: selectedItems.includes(item.id) ? 'var(--p-color-bg-surface-selected)' : 'var(--p-color-bg-surface)',
                  cursor: 'pointer'
                }}
                onClick={() => toggleItem(item.id)}
              >
                <Text as="p" variant="bodyMd">
                  {selectedItems.includes(item.id) ? '✓ ' : ''}{item.name}
                </Text>
              </div>
            ))}
          </BlockStack>
        </div>

        {selectedItems.length > 0 && (
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--p-color-bg-surface-subdued)',
            borderRadius: '4px'
          }}>
            <Text as="h4" variant="headingSm">
              {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
            </Text>
            <div style={{ marginTop: '12px' }}>
              <InlineStack gap="200" wrap>
                {bulkActions.map((action, index) => (
                  <ButtonFrom
                    key={index}
                    action={action}
                  />
                ))}
              </InlineStack>
            </div>
          </div>
        )}
      </Card>
    );
  },
};

export const ButtonFromJSON: Story = {
  render: () => {
    // This could come from a configuration file, API, or CMS
    const buttonConfigurations = {
      header: {
        primary: {
          content: 'Get Started',
          primary: true,
          size: 'large' as const,
          onAction: () => console.log('Get started clicked'),
        },
        secondary: {
          content: 'Learn More',
          outline: true,
          size: 'large' as const,
          onAction: () => console.log('Learn more clicked'),
        },
      },
      marketing: [
        {
          content: 'Watch Demo',
          primary: true,
          onAction: () => console.log('Watch demo clicked'),
        },
        {
          content: 'Download PDF',
          icon: ExportMinor,
          onAction: () => console.log('Download PDF clicked'),
        },
      ],
      footer: [
        {
          content: 'Contact Support',
          plain: true,
          onAction: () => console.log('Contact support clicked'),
        },
        {
          content: 'Documentation',
          plain: true,
          external: true,
          onAction: () => console.log('Documentation clicked'),
        },
      ],
    };

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Buttons from Configuration</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Buttons generated from JSON configuration objects
        </Text>

        <div style={{ marginTop: '24px' }}>
          <BlockStack gap="300">
            <div>
              <Text as="h4" variant="headingSm">Header Section</Text>
              <div style={{ marginTop: '12px' }}>
                <InlineStack gap="400">
                  <ButtonFrom action={buttonConfigurations.header.primary} />
                  <ButtonFrom action={buttonConfigurations.header.secondary} />
                </InlineStack>
              </div>
            </div>

            <div>
              <Text as="h4" variant="headingSm">Marketing Section</Text>
              <div style={{ marginTop: '12px' }}>
                <InlineStack gap="400">
                  {buttonConfigurations.marketing.map((action, index) => (
                    <ButtonFrom key={index} action={action} />
                  ))}
                </InlineStack>
              </div>
            </div>

            <div>
              <Text as="h4" variant="headingSm">Footer Section</Text>
              <div style={{ marginTop: '12px' }}>
                <InlineStack gap="400">
                  {buttonConfigurations.footer.map((action, index) => (
                    <ButtonFrom key={index} action={action} />
                  ))}
                </InlineStack>
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    );
  },
};