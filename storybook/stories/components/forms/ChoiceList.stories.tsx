import type { Meta, StoryObj } from '@storybook/react';
import { ChoiceList, BlockStack, InlineStack, Text, Card } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Forms/ChoiceList',
  component: ChoiceList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ChoiceList provides a way to group multiple checkbox or radio button choices. It\'s useful for presenting users with multiple options that they can select from, with support for single or multiple selections, disabled states, and error handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the choice list',
    },
    choices: {
      control: 'object',
      description: 'Array of choice options',
    },
    selected: {
      control: 'object',
      description: 'Currently selected values',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple selections (checkboxes)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all choices',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    name: {
      control: 'text',
      description: 'Form field name',
    },
    onChange: {
      action: 'onChange',
      description: 'Callback when selection changes',
    },
  },
} satisfies Meta<typeof ChoiceList>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicChoices = [
  {label: 'Basic plan', value: 'basic', renderChildren: () => <Text variant="bodySm" tone="subdued">$5/month</Text>},
  {label: 'Professional plan', value: 'professional', renderChildren: () => <Text variant="bodySm" tone="subdued">$15/month</Text>},
  {label: 'Enterprise plan', value: 'enterprise', renderChildren: () => <Text variant="bodySm" tone="subdued">Custom pricing</Text>},
];

const shippingChoices = [
  {label: 'Standard Shipping (5-7 days)', value: 'standard'},
  {label: 'Express Shipping (2-3 days)', value: 'express'},
  {label: 'Overnight Shipping (1 day)', value: 'overnight'},
];

const notificationChoices = [
  {label: 'Email notifications', value: 'email'},
  {label: 'SMS notifications', value: 'sms'},
  {label: 'Push notifications', value: 'push'},
  {label: 'Weekly digest', value: 'weekly'},
];

const productChoices = [
  {label: 'Electronics', value: 'electronics'},
  {label: 'Clothing', value: 'clothing'},
  {label: 'Home & Garden', value: 'home'},
  {label: 'Sports & Outdoors', value: 'sports'},
  {label: 'Books & Media', value: 'books'},
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['basic']);

    return (
      <Card padding="400">
        <ChoiceList
          title="Select your plan"
          choices={basicChoices}
          selected={selected}
          onChange={setSelected}
        />
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('choicelist', 'default'),
  },

};

export const SingleSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>('standard');

    return (
      <Card padding="400">
        <ChoiceList
          title="Choose shipping method"
          choices={shippingChoices}
          selected={selected}
          onChange={setSelected}
        />
      </Card>
    );
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['email', 'push']);

    return (
      <Card padding="400">
        <ChoiceList
          title="Notification preferences"
          choices={notificationChoices}
          selected={selected}
          onChange={setSelected}
          allowMultiple
        />
      </Card>
    );
  },
};

export const WithDescriptions: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['electronics']);

    const choicesWithDescriptions = [
      {
        label: 'Electronics',
        value: 'electronics',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">
            Smartphones, laptops, tablets, and accessories
          </Text>
        ),
      },
      {
        label: 'Clothing',
        value: 'clothing',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">
            Fashion, shoes, accessories for all ages
          </Text>
        ),
      },
      {
        label: 'Home & Garden',
        value: 'home',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">
            Furniture, decor, kitchen, and garden supplies
          </Text>
        ),
      },
    ];

    return (
      <Card padding="400">
        <ChoiceList
          title="Product categories"
          choices={choicesWithDescriptions}
          selected={selected}
          onChange={setSelected}
          allowMultiple
        />
      </Card>
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    return (
      <Card padding="400">
        <ChoiceList
          title="Product categories"
          choices={productChoices.slice(0, 3)}
          selected={selected}
          onChange={setSelected}
          allowMultiple
          error="Please select at least one category"
        />
      </Card>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [selected] = React.useState<string[]>(['professional']);

    return (
      <Card padding="400">
        <ChoiceList
          title="Subscription plan (currently locked)"
          choices={basicChoices}
          selected={selected}
          onChange={() => {}}
          disabled
        />
      </Card>
    );
  },
};

export const PartiallyDisabled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>(['email']);

    const partiallyDisabledChoices = [
      {label: 'Email notifications', value: 'email'},
      {label: 'SMS notifications', value: 'sms', disabled: true},
      {label: 'Push notifications', value: 'push'},
      {label: 'Weekly digest', value: 'weekly', disabled: true},
    ];

    return (
      <Card padding="400">
        <ChoiceList
          title="Notification preferences"
          choices={partiallyDisabledChoices}
          selected={selected}
          onChange={setSelected}
          allowMultiple
        />
      </Card>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string[]>([]);

    const extendedChoices = [
      ...productChoices,
      {label: 'Toys & Games', value: 'toys'},
      {label: 'Health & Beauty', value: 'health'},
      {label: 'Automotive', value: 'automotive'},
      {label: 'Food & Beverages', value: 'food'},
      {label: 'Pet Supplies', value: 'pets'},
    ];

    return (
      <Card padding="400">
        <ChoiceList
          title="Browse all categories"
          choices={extendedChoices}
          selected={selected}
          onChange={setSelected}
          allowMultiple
        />
      </Card>
    );
  },
};

export const ProductFilters: Story = {
  render: () => {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([]);
    const [selectedPriceRange, setSelectedPriceRange] = React.useState<string>('all');

    const featureChoices = [
      {label: 'Free shipping', value: 'free-shipping'},
      {label: 'On sale', value: 'sale'},
      {label: 'New arrivals', value: 'new'},
      {label: 'Best sellers', value: 'bestsellers'},
    ];

    const priceChoices = [
      {label: 'All prices', value: 'all'},
      {label: 'Under $25', value: 'under-25'},
      {label: '$25 - $50', value: '25-50'},
      {label: '$50 - $100', value: '50-100'},
      {label: 'Over $100', value: 'over-100'},
    ];

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <ChoiceList
            title="Categories"
            choices={productChoices}
            selected={selectedCategories}
            onChange={setSelectedCategories}
            allowMultiple
          />

          <ChoiceList
            title="Features"
            choices={featureChoices}
            selected={selectedFeatures}
            onChange={setSelectedFeatures}
            allowMultiple
          />

          <ChoiceList
            title="Price range"
            choices={priceChoices}
            selected={selectedPriceRange}
            onChange={setSelectedPriceRange}
          />

          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Active Filters:</Text>
            <Text as="p">Categories: {selectedCategories.length || 'None'}</Text>
            <Text as="p">Features: {selectedFeatures.length || 'None'}</Text>
            <Text as="p">Price: {priceChoices.find(c => c.value === selectedPriceRange)?.label}</Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};

export const SurveyQuestions: Story = {
  render: () => {
    const [satisfaction, setSatisfaction] = React.useState<string>('');
    const [recommendation, setRecommendation] = React.useState<string>('');
    const [features, setFeatures] = React.useState<string[]>([]);
    const [improvements, setImprovements] = React.useState<string[]>([]);

    const satisfactionChoices = [
      {label: 'Very satisfied', value: 'very-satisfied'},
      {label: 'Satisfied', value: 'satisfied'},
      {label: 'Neutral', value: 'neutral'},
      {label: 'Dissatisfied', value: 'dissatisfied'},
      {label: 'Very dissatisfied', value: 'very-dissatisfied'},
    ];

    const recommendationChoices = [
      {label: 'Definitely would recommend', value: 'definitely'},
      {label: 'Probably would recommend', value: 'probably'},
      {label: 'Not sure', value: 'not-sure'},
      {label: 'Probably would not recommend', value: 'probably-not'},
      {label: 'Definitely would not recommend', value: 'definitely-not'},
    ];

    const featureChoices = [
      {label: 'User interface', value: 'ui'},
      {label: 'Performance', value: 'performance'},
      {label: 'Customer support', value: 'support'},
      {label: 'Documentation', value: 'docs'},
      {label: 'Pricing', value: 'pricing'},
    ];

    const improvementChoices = [
      {label: 'More features', value: 'more-features'},
      {label: 'Better performance', value: 'better-performance'},
      {label: 'Improved documentation', value: 'better-docs'},
      {label: 'Lower pricing', value: 'lower-pricing'},
      {label: 'Better customer support', value: 'better-support'},
    ];

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h2" variant="headingLg">Customer Satisfaction Survey</Text>

          <ChoiceList
            title="How satisfied are you with our product?"
            choices={satisfactionChoices}
            selected={satisfaction}
            onChange={setSatisfaction}
          />

          <ChoiceList
            title="How likely are you to recommend us to a friend or colleague?"
            choices={recommendationChoices}
            selected={recommendation}
            onChange={setRecommendation}
          />

          <ChoiceList
            title="Which features do you value most? (Select all that apply)"
            choices={featureChoices}
            selected={features}
            onChange={setFeatures}
            allowMultiple
          />

          <ChoiceList
            title="What areas need improvement? (Select all that apply)"
            choices={improvementChoices}
            selected={improvements}
            onChange={setImprovements}
            allowMultiple
          />

          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Survey Summary:</Text>
            <Text as="p">Satisfaction: {satisfactionChoices.find(c => c.value === satisfaction)?.label || 'Not answered'}</Text>
            <Text as="p">Would recommend: {recommendationChoices.find(c => c.value === recommendation)?.label || 'Not answered'}</Text>
            <Text as="p">Valued features: {features.length || 'None'}</Text>
            <Text as="p">Improvement areas: {improvements.length || 'None'}</Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};

export const PermissionSettings: Story = {
  render: () => {
    const [adminPermissions, setAdminPermissions] = React.useState<string[]>(['read', 'write']);
    const [userPermissions, setUserPermissions] = React.useState<string[]>(['read']);
    const [guestPermissions, setGuestPermissions] = React.useState<string[]>([]);

    const permissionChoices = [
      {
        label: 'Read',
        value: 'read',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">View content and information</Text>
        ),
      },
      {
        label: 'Write',
        value: 'write',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">Create and edit content</Text>
        ),
      },
      {
        label: 'Delete',
        value: 'delete',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">Remove content permanently</Text>
        ),
      },
      {
        label: 'Manage Users',
        value: 'manage-users',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">Add, remove, and manage user accounts</Text>
        ),
      },
      {
        label: 'System Settings',
        value: 'settings',
        renderChildren: () => (
          <Text variant="bodySm" tone="subdued">Configure system-wide settings</Text>
        ),
      },
    ];

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h2" variant="headingLg">Role Permissions</Text>

          <ChoiceList
            title="Administrator Permissions"
            choices={permissionChoices}
            selected={adminPermissions}
            onChange={setAdminPermissions}
            allowMultiple
          />

          <ChoiceList
            title="User Permissions"
            choices={permissionChoices.slice(0, 3)}
            selected={userPermissions}
            onChange={setUserPermissions}
            allowMultiple
          />

          <ChoiceList
            title="Guest Permissions"
            choices={permissionChoices.slice(0, 1)}
            selected={guestPermissions}
            onChange={setGuestPermissions}
            allowMultiple
          />

          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Permission Summary:</Text>
            <Text as="p">Admin: {adminPermissions.length} permissions</Text>
            <Text as="p">User: {userPermissions.length} permissions</Text>
            <Text as="p">Guest: {guestPermissions.length} permissions</Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};

export const MultipleChoiceLists: Story = {
  render: () => {
    const [dietary, setDietary] = React.useState<string[]>([]);
    const [allergies, setAllergies] = React.useState<string[]>([]);
    const [mealPlan, setMealPlan] = React.useState<string>('standard');

    const dietaryChoices = [
      {label: 'Vegetarian', value: 'vegetarian'},
      {label: 'Vegan', value: 'vegan'},
      {label: 'Gluten-free', value: 'gluten-free'},
      {label: 'Dairy-free', value: 'dairy-free'},
      {label: 'Keto', value: 'keto'},
      {label: 'Paleo', value: 'paleo'},
    ];

    const allergyChoices = [
      {label: 'Nuts', value: 'nuts'},
      {label: 'Shellfish', value: 'shellfish'},
      {label: 'Dairy', value: 'dairy'},
      {label: 'Eggs', value: 'eggs'},
      {label: 'Soy', value: 'soy'},
      {label: 'Wheat', value: 'wheat'},
    ];

    const mealChoices = [
      {label: 'Standard Meal Plan', value: 'standard'},
      {label: 'Premium Meal Plan', value: 'premium'},
      {label: 'Custom Meal Plan', value: 'custom'},
    ];

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h2" variant="headingLg">Meal Preferences</Text>

          <ChoiceList
            title="Dietary preferences (Select all that apply)"
            choices={dietaryChoices}
            selected={dietary}
            onChange={setDietary}
            allowMultiple
          />

          <ChoiceList
            title="Food allergies (Select all that apply)"
            choices={allergyChoices}
            selected={allergies}
            onChange={setAllergies}
            allowMultiple
          />

          <ChoiceList
            title="Choose your meal plan"
            choices={mealChoices}
            selected={mealPlan}
            onChange={setMealPlan}
          />

          <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="h4" variant="headingSm">Your Selections:</Text>
            <Text as="p">Dietary: {dietary.length ? dietary.join(', ') : 'None'}</Text>
            <Text as="p">Allergies: {allergies.length ? allergies.join(', ') : 'None'}</Text>
            <Text as="p">Meal Plan: {mealChoices.find(c => c.value === mealPlan)?.label}</Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
};
