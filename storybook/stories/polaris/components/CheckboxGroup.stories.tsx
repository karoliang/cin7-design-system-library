import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, BlockStack, InlineStack, Text, Card, Divider } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/CheckboxGroup',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Checkbox groups are collections of related checkboxes that allow users to select multiple options from a set. They are useful for presenting related choices, filtering options, or settings that can be enabled independently.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox label text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable checkbox interaction',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required field',
    },
    helpText: {
      control: 'text',
      description: 'Additional help text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicGroup: Story = {
  render: () => {
    const [preferences, setPreferences] = React.useState({
      email: true,
      sms: false,
      push: true,
      mail: false,
    });

    const handleCheckboxChange = (key: keyof typeof preferences) => (checked: boolean) => {
      setPreferences(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Notification Preferences</Text>

          <Checkbox
            label="Email notifications"
            checked={preferences.email}
            onChange={handleCheckboxChange('email')}
            helpText="Receive updates and announcements via email"
          />

          <Checkbox
            label="SMS notifications"
            checked={preferences.sms}
            onChange={handleCheckboxChange('sms')}
            helpText="Get text alerts for urgent updates"
          />

          <Checkbox
            label="Push notifications"
            checked={preferences.push}
            onChange={handleCheckboxChange('push')}
            helpText="Receive browser push notifications"
          />

          <Checkbox
            label="Mail notifications"
            checked={preferences.mail}
            onChange={handleCheckboxChange('mail')}
            helpText="Receive physical mail for important documents"
          />
        </BlockStack>
      </Card>
    );
  },
};

export const ProductFeatures: Story = {
  render: () => {
    const [features, setFeatures] = React.useState({
      warranty: true,
      support: false,
      installation: true,
      training: false,
      updates: true,
    });

    const handleCheckboxChange = (key: keyof typeof features) => (checked: boolean) => {
      setFeatures(prev => ({ ...prev, [key]: checked }));
    };

    const selectedCount = Object.values(features).filter(Boolean).length;
    const estimatedPrice = selectedCount * 50;

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text as="h3" variant="headingMd">Additional Features</Text>
            <Text as="p" variant="bodySm" tone="subdued">
              {selectedCount} selected • ${estimatedPrice}/month
            </Text>
          </InlineStack>

          <Checkbox
            label="Extended Warranty (2 years)"
            checked={features.warranty}
            onChange={handleCheckboxChange('warranty')}
            helpText="Comprehensive coverage for hardware and software"
          />

          <Checkbox
            label="24/7 Premium Support"
            checked={features.support}
            onChange={handleCheckboxChange('support')}
            helpText="Priority support with dedicated account manager"
          />

          <Checkbox
            label="Professional Installation"
            checked={features.installation}
            onChange={handleCheckboxChange('installation')}
            helpText="On-site setup and configuration by certified technicians"
          />

          <Checkbox
            label="Team Training Sessions"
            checked={features.training}
            onChange={handleCheckboxChange('training')}
            helpText="Comprehensive training for your team members"
          />

          <Checkbox
            label="Automatic Updates & Upgrades"
            checked={features.updates}
            onChange={handleCheckboxChange('updates')}
            helpText="Stay current with the latest features and security updates"
          />
        </BlockStack>
      </Card>
    );
  },
};

export const AccessControl: Story = {
  render: () => {
    const [permissions, setPermissions] = React.useState({
      read: true,
      write: true,
      delete: false,
      share: true,
      export: false,
    });

    const handleCheckboxChange = (key: keyof typeof permissions) => (checked: boolean) => {
      setPermissions(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">User Permissions</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Configure what this user can do with the system
          </Text>

          <Checkbox
            label="Read content"
            checked={permissions.read}
            onChange={handleCheckboxChange('read')}
            helpText="View documents, reports, and other content"
          />

          <Checkbox
            label="Create and edit content"
            checked={permissions.write}
            onChange={handleCheckboxChange('write')}
            helpText="Add new content and modify existing items"
          />

          <Checkbox
            label="Delete content"
            checked={permissions.delete}
            onChange={handleCheckboxChange('delete')}
            helpText="Permanently remove content from the system"
          />

          <Checkbox
            label="Share with others"
            checked={permissions.share}
            onChange={handleCheckboxChange('share')}
            helpText="Share content with team members and external users"
          />

          <Checkbox
            label="Export data"
            checked={permissions.export}
            onChange={handleCheckboxChange('export')}
            helpText="Download reports and data in various formats"
          />
        </BlockStack>
      </Card>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [interests, setInterests] = React.useState<string[]>([]);
    const [errors, setErrors] = React.useState<string>('');
    const [touched, setTouched] = React.useState(false);

    const interestOptions = [
      { key: 'technology', label: 'Technology & Innovation' },
      { key: 'business', label: 'Business & Finance' },
      { key: 'design', label: 'Design & Creative' },
      { key: 'marketing', label: 'Marketing & Sales' },
      { key: 'health', label: 'Health & Wellness' },
    ];

    const handleCheckboxChange = (key: string) => (checked: boolean) => {
      const newInterests = checked
        ? [...interests, key]
        : interests.filter(i => i !== key);

      setInterests(newInterests);

      // Clear error if user selects at least one option
      if (newInterests.length > 0) {
        setErrors('');
      }
    };

    const handleBlur = () => {
      setTouched(true);
      if (interests.length === 0) {
        setErrors('Please select at least one interest');
      }
    };

    return (
      <Card padding="400">
        <BlockStack gap="400" onBlur={handleBlur}>
          <Text as="h3" variant="headingMd">Select Your Interests</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Choose topics you'd like to hear about
          </Text>

          {interestOptions.map((option) => (
            <Checkbox
              key={option.key}
              label={option.label}
              checked={interests.includes(option.key)}
              onChange={handleCheckboxChange(option.key)}
            />
          ))}

          {touched && errors && (
            <Text as="p" tone="critical">{errors}</Text>
          )}

          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="p" variant="bodySm">
              Selected interests: {interests.length > 0 ? interests.join(', ') : 'None'}
            </Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};

export const FilterGroup: Story = {
  render: () => {
    const [filters, setFilters] = React.useState({
      inStock: true,
      onSale: false,
      new: true,
      featured: false,
      freeShipping: true,
    });

    const handleCheckboxChange = (key: keyof typeof filters) => (checked: boolean) => {
      setFilters(prev => ({ ...prev, [key]: checked }));
    };

    const activeFiltersCount = Object.values(filters).filter(Boolean).length;

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <InlineStack align="space-between">
            <Text as="h3" variant="headingMd">Product Filters</Text>
            {activeFiltersCount > 0 && (
              <Text as="p" variant="bodySm" tone="subdued">
                {activeFiltersCount} active
              </Text>
            )}
          </InlineStack>

          <Checkbox
            label="In Stock"
            checked={filters.inStock}
            onChange={handleCheckboxChange('inStock')}
          />

          <Checkbox
            label="On Sale"
            checked={filters.onSale}
            onChange={handleCheckboxChange('onSale')}
          />

          <Checkbox
            label="New Arrivals"
            checked={filters.new}
            onChange={handleCheckboxChange('new')}
          />

          <Checkbox
            label="Featured Products"
            checked={filters.featured}
            onChange={handleCheckboxChange('featured')}
          />

          <Checkbox
            label="Free Shipping"
            checked={filters.freeShipping}
            onChange={handleCheckboxChange('freeShipping')}
          />
        </BlockStack>
      </Card>
    );
  },
};

export const SettingsGroup: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      darkMode: false,
      compactView: false,
      highContrast: false,
      animations: true,
      soundEffects: false,
    });

    const handleCheckboxChange = (key: keyof typeof settings) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h3" variant="headingMd">Appearance Settings</Text>

          <BlockStack gap="300">
            <Text as="h4" variant="headingSm">Display Options</Text>
            <Checkbox
              label="Dark mode"
              checked={settings.darkMode}
              onChange={handleCheckboxChange('darkMode')}
              helpText="Use dark theme across the interface"
            />
            <Checkbox
              label="Compact view"
              checked={settings.compactView}
              onChange={handleCheckboxChange('compactView')}
              helpText="Show more content with reduced spacing"
            />
            <Checkbox
              label="High contrast"
              checked={settings.highContrast}
              onChange={handleCheckboxChange('highContrast')}
              helpText="Increase contrast for better visibility"
            />
          </BlockStack>

          <BlockStack gap="300">
            <Text as="h4" variant="headingSm">Interaction Effects</Text>
            <Checkbox
              label="Enable animations"
              checked={settings.animations}
              onChange={handleCheckboxChange('animations')}
              helpText="Show smooth transitions and micro-interactions"
            />
            <Checkbox
              label="Sound effects"
              checked={settings.soundEffects}
              onChange={handleCheckboxChange('soundEffects')}
              helpText="Play sounds for actions and notifications"
            />
          </BlockStack>
        </BlockStack>
      </Card>
    );
  },
};

export const IndeterminateState: Story = {
  render: () => {
    const [allSelected, setAllSelected] = React.useState(false);
    const [options, setOptions] = React.useState({
      option1: true,
      option2: true,
      option3: false,
      option4: false,
    });

    const handleSelectAll = () => {
      const newValue = !allSelected;
      setAllSelected(newValue);
      setOptions({
        option1: newValue,
        option2: newValue,
        option3: newValue,
        option4: newValue,
      });
    };

    const handleOptionChange = (key: keyof typeof options) => (checked: boolean) => {
      const newOptions = { ...options, [key]: checked };
      setOptions(newOptions);

      const allChecked = Object.values(newOptions).every(Boolean);
      const someChecked = Object.values(newOptions).some(Boolean);

      setAllSelected(allChecked);
    };

    // Indeterminate state: some but not all selected
    const someSelected = Object.values(options).some(Boolean) && !Object.values(options).every(Boolean);

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Checkbox
            label="Select all options"
            checked={allSelected}
            onChange={handleSelectAll}
          />

          <Divider />

          <BlockStack gap="300">
            {Object.entries(options).map(([key, value]) => (
              <Checkbox
                key={key}
                label={`Option ${key.slice(-1)}`}
                checked={value}
                onChange={handleOptionChange(key as keyof typeof options)}
              />
            ))}
          </BlockStack>

          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="p" variant="bodySm">
              Status: {someSelected ? 'Partially selected' : allSelected ? 'All selected' : 'None selected'}
            </Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};

export const NestedGroups: Story = {
  render: () => {
    const [categories, setCategories] = React.useState({
      electronics: {
        enabled: true,
        subcategories: {
          phones: true,
          laptops: false,
          tablets: true,
        },
      },
      clothing: {
        enabled: false,
        subcategories: {
          mens: false,
          womens: false,
          kids: false,
        },
      },
    });

    const handleCategoryChange = (category: keyof typeof categories) => (enabled: boolean) => {
      setCategories(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          enabled,
          subcategories: Object.fromEntries(
            Object.entries(prev[category].subcategories).map(([key]) => [key, enabled])
          ),
        },
      }));
    };

    const handleSubcategoryChange = (
      category: keyof typeof categories,
      subcategory: keyof typeof categories.electronics.subcategories
    ) => (enabled: boolean) => {
      setCategories(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          subcategories: {
            ...prev[category].subcategories,
            [subcategory]: enabled,
          },
        },
      }));
    };

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h3" variant="headingMd">Product Categories</Text>

          {Object.entries(categories).map(([categoryKey, categoryData]) => (
            <BlockStack key={categoryKey} gap="300">
              <Checkbox
                label={categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                checked={categoryData.enabled}
                onChange={handleCategoryChange(categoryKey as keyof typeof categories)}
              />

              {categoryData.enabled && (
                <div style={{ marginLeft: '24px' }}>
                  <BlockStack gap="200">
                    {Object.entries(categoryData.subcategories).map(([subKey, subValue]) => (
                      <Checkbox
                        key={subKey}
                        label={subKey.charAt(0).toUpperCase() + subKey.slice(1)}
                        checked={subValue}
                        onChange={handleSubcategoryChange(
                          categoryKey as keyof typeof categories,
                          subKey as keyof typeof categories.electronics.subcategories
                        )}
                      />
                    ))}
                  </BlockStack>
                </div>
              )}
            </BlockStack>
          ))}
        </BlockStack>
      </Card>
    );
  },
};

export const DisabledGroup: Story = {
  render: () => {
    const [features, setFeatures] = React.useState({
      feature1: true,
      feature2: false,
      feature3: true,
    });

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Unavailable Features</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            These features are currently disabled for your plan
          </Text>

          <Checkbox
            label="Advanced Analytics"
            checked={features.feature1}
            onChange={() => {}}
            disabled
            helpText="Available in Premium plan"
          />

          <Checkbox
            label="Custom Integrations"
            checked={features.feature2}
            onChange={() => {}}
            disabled
            helpText="Available in Enterprise plan"
          />

          <Checkbox
            label="Priority Support"
            checked={features.feature3}
            onChange={() => {}}
            disabled
            helpText="Available in Business plan"
          />
        </BlockStack>
      </Card>
    );
  },
};