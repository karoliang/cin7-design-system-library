import type { Meta, StoryObj } from '@storybook/react';
import {
  ContextualSaveBar,
  Button,
  Card,
  TextField,
  FormLayout,
  Text,
  BlockStack,
  InlineStack,
  Badge,
} from '@shopify/polaris';
import { SaveIcon, CancelSmallIcon } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/ContextualSaveBar',
  component: ContextualSaveBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ContextualSaveBar provides a fixed save bar that appears when users make changes to a form. It displays save/discard actions and provides visual feedback for unsaved changes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Message to display in the save bar',
    },
    saveAction: {
      control: 'object',
      description: 'Save button configuration',
    },
    discardAction: {
      control: 'object',
      description: 'Discard button configuration',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the save bar should take full width',
    },
    contextControl: {
      control: 'object',
      description: 'Context control for the save bar',
    },
    alignContentFlush: {
      control: 'boolean',
      description: 'Whether to align content flush with edges',
    },
    notifyChange: {
      control: 'boolean',
      description: 'Whether to notify about changes',
    },
  },
} satisfies Meta<typeof ContextualSaveBar>;

export default meta;
type Story = StoryObj<typeof ContextualSaveBar>;

export const Default: Story = {
  render: () => {
    const [isDirty, setIsDirty] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);

    const handleSave = async () => {
      setIsSaving(true);
      console.log('Saving changes...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSaving(false);
      setIsDirty(false);
      console.log('Changes saved successfully');
    };

    const handleDiscard = () => {
      console.log('Discarding changes');
      setIsDirty(false);
    };

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Product Information</Text>

              <FormLayout>
                <TextField
                  label="Product title"
                  placeholder="Enter product title"
                  onChange={() => setIsDirty(true)}
                />
                <TextField
                  label="Description"
                  multiline={3}
                  placeholder="Enter product description"
                  onChange={() => setIsDirty(true)}
                />
                <TextField
                  label="Price"
                  placeholder="0.00"
                  prefix="$"
                  type="number"
                  onChange={() => setIsDirty(true)}
                />
              </FormLayout>

              <div style={{ marginTop: '24px' }}>
                <Button onClick={() => setIsDirty(true)}>
                  Make changes to see save bar
                </Button>
              </div>
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message="Unsaved changes"
              saveAction={{
                content: isSaving ? 'Saving...' : 'Save',
                onAction: handleSave,
                loading: isSaving,
                disabled: isSaving,
              }}
              discardAction={{
                content: 'Discard',
                onAction: handleDiscard,
                disabled: isSaving,
              }}
            />
          </div>
        )}
      </div>
    );
  },
};

export const WithCustomMessage: Story = {
  render: () => {
    const [fieldValues, setFieldValues] = React.useState({
      title: '',
      price: '',
      inventory: '',
    });
    const [isDirty, setIsDirty] = React.useState(false);

    const hasUnsavedChanges = Object.values(fieldValues).some(value => value !== '');

    const handleSave = () => {
      console.log('Saving:', fieldValues);
      setIsDirty(false);
    };

    const handleDiscard = () => {
      setFieldValues({ title: '', price: '', inventory: '' });
      setIsDirty(false);
    };

    const changedFields = Object.entries(fieldValues)
      .filter(([_, value]) => value !== '')
      .map(([key]) => key)
      .join(', ');

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Edit Product</Text>

              <FormLayout>
                <TextField
                  label="Title"
                  value={fieldValues.title}
                  onChange={(value) => {
                    setFieldValues({ ...fieldValues, title: value });
                    setIsDirty(true);
                  }}
                />
                <TextField
                  label="Price"
                  value={fieldValues.price}
                  onChange={(value) => {
                    setFieldValues({ ...fieldValues, price: value });
                    setIsDirty(true);
                  }}
                  prefix="$"
                />
                <TextField
                  label="Inventory"
                  value={fieldValues.inventory}
                  onChange={(value) => {
                    setFieldValues({ ...fieldValues, inventory: value });
                    setIsDirty(true);
                  }}
                  type="number"
                />
              </FormLayout>
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message={`Changes to ${changedFields || 'fields'}`}
              saveAction={{
                content: 'Save product',
                onAction: handleSave,
              }}
              discardAction={{
                content: 'Cancel',
                onAction: handleDiscard,
              }}
            />
          </div>
        )}
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      email: '',
      phone: '',
      address: '',
    });
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isDirty, setIsDirty] = React.useState(false);

    const validateForm = () => {
      const newErrors: Record<string, string> = {};

      if (formData.email && !formData.email.includes('@')) {
        newErrors.email = 'Please enter a valid email address';
      }

      if (formData.phone && formData.phone.length < 10) {
        newErrors.phone = 'Phone number must be at least 10 digits';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
      if (validateForm()) {
        console.log('Form saved:', formData);
        setIsDirty(false);
      }
    };

    const handleDiscard = () => {
      setFormData({ email: '', phone: '', address: '' });
      setErrors({});
      setIsDirty(false);
    };

    const hasErrors = Object.keys(errors).length > 0;

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Contact Information</Text>

              <FormLayout>
                <TextField
                  label="Email"
                  value={formData.email}
                  onChange={(value) => {
                    setFormData({ ...formData, email: value });
                    setIsDirty(true);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  error={errors.email}
                  type="email"
                />
                <TextField
                  label="Phone"
                  value={formData.phone}
                  onChange={(value) => {
                    setFormData({ ...formData, phone: value });
                    setIsDirty(true);
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  error={errors.phone}
                  type="tel"
                />
                <TextField
                  label="Address"
                  value={formData.address}
                  onChange={(value) => {
                    setFormData({ ...formData, address: value });
                    setIsDirty(true);
                  }}
                  multiline={2}
                />
              </FormLayout>

              {hasErrors && (
                <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef2f2', borderRadius: '4px' }}>
                  <Text color="critical" variant="bodySm">
                    Please fix the errors before saving
                  </Text>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message={hasErrors ? 'Please fix errors' : 'Unsaved changes'}
              saveAction={{
                content: 'Save contact',
                onAction: handleSave,
                disabled: hasErrors,
              }}
              discardAction={{
                content: 'Discard',
                onAction: handleDiscard,
              }}
            />
          </div>
        )}
      </div>
    );
  },
};

export const FullWidthLayout: Story = {
  render: () => {
    const [isDirty, setIsDirty] = React.useState(false);

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Full Width Save Bar</Text>
              <Text>
                This save bar takes the full width of the container
              </Text>

              <TextField
                label="Full width field"
                onChange={() => setIsDirty(true)}
              />
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message="Full width save bar"
              saveAction={{
                content: 'Save changes',
                onAction: () => {
                  console.log('Saved');
                  setIsDirty(false);
                },
              }}
              discardAction={{
                content: 'Discard',
                onAction: () => setIsDirty(false),
              }}
              fullWidth
            />
          </div>
        )}
      </div>
    );
  },
};

export const AutoSaveExample: Story = {
  render: () => {
    const [content, setContent] = React.useState('');
    const [isDirty, setIsDirty] = React.useState(false);
    const [lastSaved, setLastSaved] = React.useState<Date | null>(null);
    const [isAutoSaving, setIsAutoSaving] = React.useState(false);

    React.useEffect(() => {
      if (isDirty && content.length > 0) {
        const timer = setTimeout(() => {
          handleAutoSave();
        }, 3000); // Auto-save after 3 seconds

        return () => clearTimeout(timer);
      }
    }, [content, isDirty]);

    const handleAutoSave = async () => {
      setIsAutoSaving(true);
      console.log('Auto-saving...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      setIsDirty(false);
      setIsAutoSaving(false);
      console.log('Auto-saved');
    };

    const handleManualSave = async () => {
      setIsAutoSaving(true);
      console.log('Manual save...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastSaved(new Date());
      setIsDirty(false);
      setIsAutoSaving(false);
      console.log('Manual save completed');
    };

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <InlineStack align="space-between">
                <Text variant="headingMd">Auto-save Document</Text>
                {lastSaved && (
                  <Badge status="success">
                    Last saved: {lastSaved.toLocaleTimeString()}
                  </Badge>
                )}
              </InlineStack>

              <TextField
                label="Document content"
                value={content}
                onChange={(value) => {
                  setContent(value);
                  setIsDirty(true);
                }}
                multiline={8}
                placeholder="Start typing to see auto-save in action..."
              />

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {isAutoSaving && (
                  <Text color="subdued" variant="bodySm">
                    Auto-saving...
                  </Text>
                )}
                {!isAutoSaving && isDirty && (
                  <Text color="subdued" variant="bodySm">
                    Will auto-save in 3 seconds
                  </Text>
                )}
              </div>
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message={isAutoSaving ? 'Auto-saving...' : 'Unsaved changes'}
              saveAction={{
                content: isAutoSaving ? 'Saving...' : 'Save now',
                onAction: handleManualSave,
                loading: isAutoSaving,
                disabled: isAutoSaving,
              }}
              discardAction={{
                content: 'Discard',
                onAction: () => {
                  setContent('');
                  setIsDirty(false);
                },
                disabled: isAutoSaving,
              }}
            />
          </div>
        )}
      </div>
    );
  },
};

export const MultiFormExample: Story = {
  render: () => {
    const [activeForm, setActiveForm] = React.useState<'basic' | 'advanced'>('basic');
    const [basicData, setBasicData] = React.useState({ title: '', description: '' });
    const [advancedData, setAdvancedData] = React.useState({ seo: '', tags: '' });
    const [isDirty, setIsDirty] = React.useState(false);

    const isBasicDirty = Object.values(basicData).some(value => value !== '');
    const isAdvancedDirty = Object.values(advancedData).some(value => value !== '');

    React.useEffect(() => {
      setIsDirty(isBasicDirty || isAdvancedDirty);
    }, [isBasicDirty, isAdvancedDirty]);

    const handleSave = () => {
      console.log('Saving all forms:', { basicData, advancedData });
      setIsDirty(false);
    };

    const handleDiscard = () => {
      setBasicData({ title: '', description: '' });
      setAdvancedData({ seo: '', tags: '' });
      setIsDirty(false);
    };

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Multi-Form Configuration</Text>

              <InlineStack gap="8px">
                <Button
                  pressed={activeForm === 'basic'}
                  onClick={() => setActiveForm('basic')}
                >
                  Basic Info
                </Button>
                <Button
                  pressed={activeForm === 'advanced'}
                  onClick={() => setActiveForm('advanced')}
                >
                  Advanced
                </Button>
              </InlineStack>

              {activeForm === 'basic' ? (
                <FormLayout>
                  <TextField
                    label="Title"
                    value={basicData.title}
                    onChange={(value) => setBasicData({ ...basicData, title: value })}
                  />
                  <TextField
                    label="Description"
                    multiline={3}
                    value={basicData.description}
                    onChange={(value) => setBasicData({ ...basicData, description: value })}
                  />
                </FormLayout>
              ) : (
                <FormLayout>
                  <TextField
                    label="SEO Title"
                    value={advancedData.seo}
                    onChange={(value) => setAdvancedData({ ...advancedData, seo: value })}
                  />
                  <TextField
                    label="Tags"
                    value={advancedData.tags}
                    onChange={(value) => setAdvancedData({ ...advancedData, tags: value })}
                    placeholder="Separate with commas"
                  />
                </FormLayout>
              )}

              <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <Text variant="bodySm">
                  {isBasicDirty && <span>Basic info changed. </span>}
                  {isAdvancedDirty && <span>Advanced settings changed. </span>}
                  {!isBasicDirty && !isAdvancedDirty && <span>No changes made.</span>}
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message="Configuration changes"
              saveAction={{
                content: 'Save all changes',
                onAction: handleSave,
              }}
              discardAction={{
                content: 'Reset all',
                onAction: handleDiscard,
              }}
            />
          </div>
        )}
      </div>
    );
  },
};

export const WithContextControl: Story = {
  render: () => {
    const [isDirty, setIsDirty] = React.useState(false);
    const [contextInfo, setContextInfo] = React.useState({
      productName: 'Untitled Product',
      lastEdited: new Date(),
    });

    return (
      <div style={{ width: '100%', height: '500px', position: 'relative' }}>
        <Card>
          <div style={{ padding: '24px', height: '400px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd">Product Editor</Text>

              <TextField
                label="Product Name"
                value={contextInfo.productName}
                onChange={(value) => {
                  setContextInfo({ ...contextInfo, productName: value });
                  setIsDirty(true);
                }}
              />

              <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <Text variant="bodySm">
                  Current product: {contextInfo.productName}
                </Text>
              </div>

              <Button onClick={() => setIsDirty(true)}>
                Simulate change
              </Button>
            </BlockStack>
          </div>
        </Card>

        {isDirty && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <ContextualSaveBar
              message={`Editing: ${contextInfo.productName}`}
              saveAction={{
                content: 'Save product',
                onAction: () => {
                  console.log('Saved product:', contextInfo.productName);
                  setContextInfo({ ...contextInfo, lastEdited: new Date() });
                  setIsDirty(false);
                },
              }}
              discardAction={{
                content: 'Cancel',
                onAction: () => setIsDirty(false),
              }}
              contextControl={
                <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                  <Text variant="bodySm" color="subdued">
                    Last edited: {contextInfo.lastEdited.toLocaleTimeString()}
                  </Text>
                </div>
              }
            />
          </div>
        )}
      </div>
    );
  },
};