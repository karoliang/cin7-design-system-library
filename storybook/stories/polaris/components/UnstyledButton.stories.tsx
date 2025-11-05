import type { Meta, StoryObj } from '@storybook/react';
import { UnstyledButton, Card, BlockStack, InlineStack, Text, Icon } from '@shopify/polaris';
import { ViewMajor, EditMajor, DeleteMajor, CircleTickMinor, MobileMajor } from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Actions/UnstyledButton',
  component: UnstyledButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'UnstyledButton provides button functionality without default styling. Perfect for custom-styled buttons, icon buttons, or when you need complete control over the appearance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
    size: {
      control: 'select',
      options: ['micro', 'small', 'medium', 'large'],
      description: 'Button size',
    },
    textAlign: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Text alignment',
    },
  },
} satisfies Meta<typeof UnstyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const WithCustomStyling: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Custom Styled Buttons</h3>
            <InlineStack gap="300">
              <UnstyledButton
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007ace',
                  color: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#005a9e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#007ace';
                }}
              >
                Primary Action
              </UnstyledButton>

              <UnstyledButton
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#fff',
                  color: '#007ace',
                  borderRadius: '8px',
                  border: '2px solid #007ace',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fff';
                }}
              >
                Secondary Action
              </UnstyledButton>

              <UnstyledButton
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#fef2f2',
                  color: '#d82c0d',
                  borderRadius: '8px',
                  border: '1px solid #d82c0d',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                }}
              >
                Destructive Action
              </UnstyledButton>
            </InlineStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const IconButtonVariants: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Icon Buttons</h3>
            <InlineStack gap="300">
              <UnstyledButton
                accessibilityLabel="View details"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #e1e3e5',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f1f3f4';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                }}
              >
                <Icon source={ViewMajor} tone="base" />
              </UnstyledButton>

              <UnstyledButton
                accessibilityLabel="Edit item"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#e3f2fd',
                  border: '1px solid #90caf9',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#bbdefb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e3f2fd';
                }}
              >
                <Icon source={EditMajor} tone="base" />
              </UnstyledButton>

              <UnstyledButton
                accessibilityLabel="Delete item"
                style={{
                  padding: '8px',
                  borderRadius: '6px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fee2e2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fef2f2';
                }}
              >
                <Icon source={DeleteMajor} tone="critical" />
              </UnstyledButton>

              <UnstyledButton
                accessibilityLabel="Complete task"
                style={{
                  padding: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#e8f5e8',
                  border: '1px solid #4CAF50',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#c8e6c9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#e8f5e8';
                }}
              >
                <Icon source={CircleTickMinor} tone="success" />
              </UnstyledButton>
            </InlineStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const TextLinkButtons: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Link-style Buttons</h3>
            <BlockStack gap="200">
              <UnstyledButton
                style={{
                  padding: '0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#007ace',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#005a9e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#007ace';
                }}
              >
                Learn more about our features
              </UnstyledButton>

              <UnstyledButton
                style={{
                  padding: '0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#637381',
                  textDecoration: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                  e.currentTarget.style.color = '#007ace';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                  e.currentTarget.style.color = '#637381';
                }}
              >
                Forgot your password?
              </UnstyledButton>

              <UnstyledButton
                style={{
                  padding: '0',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#d82c0d',
                  textDecoration: 'none',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Cancel subscription
              </UnstyledButton>
            </BlockStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const CardActions: Story = {
  render: () => {
    const [likedItems, setLikedItems] = React.useState<number[]>([]);
    const [savedItems, setSavedItems] = React.useState<number[]>([]);

    const handleLike = (id: number) => {
      setLikedItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    };

    const handleSave = (id: number) => {
      setSavedItems(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      );
    };

    const products = [
      { id: 1, name: 'Premium Widget', price: '$29.99', image: '📦' },
      { id: 2, name: 'Super Gadget', price: '$49.99', image: '🔧' },
      { id: 3, name: 'Mega Device', price: '$79.99', image: '⚡' },
    ];

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Product Cards with Actions</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {products.map((product) => (
              <Card key={product.id}>
                <div style={{ padding: '16px' }}>
                  <BlockStack gap="300">
                    <div style={{ textAlign: 'center', fontSize: '48px' }}>
                      {product.image}
                    </div>

                    <div>
                      <h4 style={{ margin: '0 0 4px 0' }}>{product.name}</h4>
                      <Text as="p" tone="subdued">{product.price}</Text>
                    </div>

                    <InlineStack gap="200">
                      <UnstyledButton
                        accessibilityLabel={`Like ${product.name}`}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '6px',
                          backgroundColor: likedItems.includes(product.id) ? '#fee2e2' : '#f8f9fa',
                          border: likedItems.includes(product.id) ? '1px solid #fecaca' : '1px solid #e1e3e5',
                          cursor: 'pointer',
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontSize: '14px',
                          color: likedItems.includes(product.id) ? '#d82c0d' : '#637381',
                        }}
                        onClick={() => handleLike(product.id)}
                      >
                        {likedItems.includes(product.id) ? '❤️' : '🤍'} Like
                      </UnstyledButton>

                      <UnstyledButton
                        accessibilityLabel={`Save ${product.name}`}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '6px',
                          backgroundColor: savedItems.includes(product.id) ? '#e3f2fd' : '#f8f9fa',
                          border: savedItems.includes(product.id) ? '1px solid #90caf9' : '1px solid #e1e3e5',
                          cursor: 'pointer',
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontSize: '14px',
                          color: savedItems.includes(product.id) ? '#007ace' : '#637381',
                        }}
                        onClick={() => handleSave(product.id)}
                      >
                        {savedItems.includes(product.id) ? '🔖' : '📁'} Save
                      </UnstyledButton>
                    </InlineStack>
                  </BlockStack>
                </div>
              </Card>
            ))}
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <Text variant="bodySm" as="p">
              Liked: {likedItems.length} items | Saved: {savedItems.length} items
            </Text>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const TagButtons: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

    const tags = [
      'Technology', 'Design', 'Marketing', 'Sales', 'Support',
      'Development', 'Analytics', 'Security', 'Mobile', 'Cloud'
    ];

    const toggleTag = (tag: string) => {
      setSelectedTags(prev =>
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    };

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Tag Selection</h3>
            <Text as="p" tone="subdued">Click tags to select/deselect them</Text>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag) => (
              <UnstyledButton
                key={tag}
                accessibilityLabel={`Toggle ${tag} tag`}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  backgroundColor: selectedTags.includes(tag) ? '#007ace' : '#f8f9fa',
                  border: selectedTags.includes(tag) ? '1px solid #007ace' : '1px solid #e1e3e5',
                  color: selectedTags.includes(tag) ? '#fff' : '#637381',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.backgroundColor = '#f1f3f4';
                    e.currentTarget.style.borderColor = '#c4c7c5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedTags.includes(tag)) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                    e.currentTarget.style.borderColor = '#e1e3e5';
                  }
                }}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </UnstyledButton>
            ))}
          </div>

          {selectedTags.length > 0 && (
            <div style={{
              padding: '12px',
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              border: '1px solid #90caf9'
            }}>
              <Text variant="bodySm" as="p">
                Selected tags: {selectedTags.join(', ')}
              </Text>
            </div>
          )}
        </BlockStack>
      </div>
    );
  },
};

export const ColorSwatches: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = React.useState('#007ace');

    const colors = [
      '#007ace', '#d82c0d', '#1a7f37', '#bf6700', '#8b5cf6',
      '#ec4899', '#06b6d4', '#f59e0b', '#10b981', '#6366f1'
    ];

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Color Picker</h3>
            <Text as="p" tone="subdued">Select a color from the swatches</Text>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <UnstyledButton
                key={color}
                accessibilityLabel={`Select color ${color}`}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: color,
                  border: selectedColor === color ? '3px solid #000' : '3px solid transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <span style={{ color: '#fff', fontSize: '20px' }}>✓</span>
                )}
              </UnstyledButton>
            ))}
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: selectedColor + '20',
            borderRadius: '8px',
            border: `2px solid ${selectedColor}`
          }}>
            <Text as="p">Selected color: <strong>{selectedColor}</strong></Text>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const RatingButtons: Story = {
  render: () => {
    const [rating, setRating] = React.useState(0);
    const [hoveredRating, setHoveredRating] = React.useState(0);

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Rating Component</h3>
            <Text as="p" tone="subdued">Rate your experience (1-5 stars)</Text>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <UnstyledButton
                key={star}
                accessibilityLabel={`Rate ${star} stars`}
                style={{
                  fontSize: '32px',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '0',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  setHoveredRating(star);
                  e.currentTarget.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  setHoveredRating(0);
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => setRating(star)}
              >
                <span style={{
                  color: (hoveredRating >= star || rating >= star) ? '#fbbf24' : '#d1d5db'
                }}>
                  {star <= (hoveredRating || rating) ? '⭐' : '☆'}
                </span>
              </UnstyledButton>
            ))}
          </div>

          {rating > 0 && (
            <div style={{
              padding: '16px',
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #fcd34d'
            }}>
              <Text as="p">Thank you for rating us {rating} star{rating !== 1 ? 's' : ''}!</Text>
            </div>
          )}
        </BlockStack>
      </div>
    );
  },
};

export const ToggleSwitches: Story = {
  render: () => {
    const [toggles, setToggles] = React.useState({
      notifications: true,
      marketing: false,
      analytics: true,
      updates: false,
    });

    const handleToggle = (key: keyof typeof toggles) => {
      setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Custom Toggle Switches</h3>
            <Text as="p" tone="subdued">Toggle settings on and off</Text>
          </div>

          <BlockStack gap="300">
            {Object.entries(toggles).map(([key, value]) => (
              <div key={key}>
                <InlineStack gap="200" align="center">
                  <UnstyledButton
                    accessibilityLabel={`Toggle ${key}`}
                    style={{
                      width: '48px',
                      height: '24px',
                      borderRadius: '12px',
                      backgroundColor: value ? '#007ace' : '#d1d5db',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background-color 0.3s ease',
                    }}
                    onClick={() => handleToggle(key as keyof typeof toggles)}
                  >
                    <span style={{
                      position: 'absolute',
                      top: '2px',
                      left: value ? '26px' : '2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      transition: 'left 0.3s ease',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }} />
                  </UnstyledButton>

                  <Text as="span">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </InlineStack>
              </div>
            ))}
          </BlockStack>

          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <Text variant="bodySm" as="p">
              Active settings: {Object.entries(toggles).filter(([_, value]) => value).map(([key]) => key).join(', ')}
            </Text>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const ResponsiveActions: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px', maxWidth: '600px', width: '100%' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Responsive Action Buttons</h3>
            <Text as="p" tone="subdued">Buttons that adapt to different screen sizes</Text>
          </div>

          <Card>
            <div style={{ padding: '20px' }}>
              <BlockStack gap="300">
                <div>
                  <h4 style={{ margin: '0 0 12px 0' }}>Mobile-First Actions</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <UnstyledButton
                      style={{
                        padding: '12px 20px',
                        backgroundColor: '#007ace',
                        color: '#fff',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        flex: 1,
                        minWidth: '120px',
                      }}
                    >
                      📱 Mobile Action
                    </UnstyledButton>

                    <UnstyledButton
                      style={{
                        padding: '12px 20px',
                        backgroundColor: '#f8f9fa',
                        color: '#637381',
                        borderRadius: '8px',
                        border: '1px solid #e1e3e5',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        flex: 1,
                        minWidth: '120px',
                      }}
                    >
                      📧 Email
                    </UnstyledButton>

                    <UnstyledButton
                      accessibilityLabel="Call us"
                      style={{
                        padding: '12px',
                        backgroundColor: '#e8f5e8',
                        borderRadius: '8px',
                        border: '1px solid #4CAF50',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '48px',
                        height: '48px',
                      }}
                    >
                      <Icon source={MobileMajor} tone="success" />
                    </UnstyledButton>
                  </div>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 12px 0' }}>Contextual Actions</h4>
                  <BlockStack gap="200">
                    <UnstyledButton
                      style={{
                        padding: '16px',
                        backgroundColor: '#fff',
                        border: '1px solid #e1e3e5',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.borderColor = '#c4c7c5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = '#e1e3e5';
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#e3f2fd',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}>
                        📊
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text as="p" variant="headingSm">View Analytics</Text>
                        <Text variant="bodySm" as="p" tone="subdued">Track performance metrics</Text>
                      </div>
                      <span>→</span>
                    </UnstyledButton>

                    <UnstyledButton
                      style={{
                        padding: '16px',
                        backgroundColor: '#fff',
                        border: '1px solid #e1e3e5',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.borderColor = '#c4c7c5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#fff';
                        e.currentTarget.style.borderColor = '#e1e3e5';
                      }}
                    >
                      <div style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#fef3c7',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                      }}>
                        ⚙️
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text as="p" variant="headingSm">Settings</Text>
                        <Text variant="bodySm" as="p" tone="subdued">Configure preferences</Text>
                      </div>
                      <span>→</span>
                    </UnstyledButton>
                  </BlockStack>
                </div>
              </BlockStack>
            </div>
          </Card>
        </BlockStack>
      </div>
    );
  },
};