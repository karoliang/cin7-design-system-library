import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup, Button, BlockStack, InlineStack, Text, Card } from '@shopify/polaris';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';
import React from 'react';

const meta = {
  title: 'Components/Actions/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ButtonGroup is used to group related buttons together. It provides visual cohesion and proper spacing for button actions that are closely related in functionality, such as primary/secondary actions or toggle groups.',
      },
    },
    codeVariants: {
      component: 'buttonGroup',
      variations: ['default', 'with-segmented-buttons', 'pressed-with-segmented-buttons']
    },
  },
  tags: ['autodocs'],
  argTypes: {
    segmented: {
      control: 'boolean',
      description: 'Display buttons as a segmented control',
    },
    connectedTop: {
      control: 'boolean',
      description: 'Connect buttons at the top',
    },
    gap: {
      control: 'select',
      options: ['extraTight', 'tight', 'loose'],
      description: 'Spacing between buttons',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make buttons span full width',
    },
    children: {
      control: 'object',
      description: 'Button elements to group',
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="p">Choose your action:</Text>
        <ButtonGroup>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="plain">Help</Button>
        </ButtonGroup>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'default'),
  },

};

export const SegmentedControl: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('day');

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">View Period</Text>
          <ButtonGroup segmented>
            <Button
              variant={selected === 'day' ? 'primary' : 'plain'}
              onClick={() => setSelected('day')}
              pressed={selected === 'day'}
            >
              Day
            </Button>
            <Button
              variant={selected === 'week' ? 'primary' : 'plain'}
              onClick={() => setSelected('week')}
              pressed={selected === 'week'}
            >
              Week
            </Button>
            <Button
              variant={selected === 'month' ? 'primary' : 'plain'}
              onClick={() => setSelected('month')}
              pressed={selected === 'month'}
            >
              Month
            </Button>
            <Button
              variant={selected === 'year' ? 'primary' : 'plain'}
              onClick={() => setSelected('year')}
              pressed={selected === 'year'}
            >
              Year
            </Button>
          </ButtonGroup>
          <Text as="p" variant="bodySm" tone="subdued">
            Selected: {selected}
          </Text>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'segmented'),
  },

};

export const VariantGroup: Story = {
  render: () => {
    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Action Variants</Text>

          <div>
            <Text as="p" variant="bodySm">Primary Actions:</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary">Save</Button>
              <Button variant="primary">Submit</Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="p" variant="bodySm">Secondary Actions:</Text>
            <ButtonGroup gap="tight">
              <Button variant="secondary">Edit</Button>
              <Button variant="secondary">Delete</Button>
              <Button variant="secondary">Export</Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="p" variant="bodySm">Tertiary Actions:</Text>
            <ButtonGroup gap="tight">
              <Button variant="tertiary">Preview</Button>
              <Button variant="tertiary">Download</Button>
              <Button variant="tertiary">Share</Button>
            </ButtonGroup>
          </div>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'variant-group'),
  },

};

export const IconButtons: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="400">
        <Text as="h3" variant="headingMd">Icon Actions</Text>

        <ButtonGroup gap="tight">
          <Button variant="plain" icon="📝">Edit</Button>
          <Button variant="plain" icon="🗑️">Delete</Button>
          <Button variant="plain" icon="📤">Export</Button>
          <Button variant="plain" icon="📋">Copy</Button>
        </ButtonGroup>

        <ButtonGroup gap="tight">
          <Button variant="plain" icon="⬅️">Previous</Button>
          <Button variant="plain" icon="➡️">Next</Button>
        </ButtonGroup>

        <ButtonGroup gap="tight">
          <Button variant="plain" icon="🔍">Search</Button>
          <Button variant="plain" icon="🔄">Refresh</Button>
          <Button variant="plain" icon="⚙️">Settings</Button>
        </ButtonGroup>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'icon-buttons'),
  },

};

export const FullWidthGroup: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Full Width Actions</Text>
          <ButtonGroup fullWidth>
            <Button variant="primary">Continue to Checkout</Button>
            <Button variant="secondary">Save for Later</Button>
          </ButtonGroup>

          <ButtonGroup fullWidth>
            <Button variant="tertiary">Back to Cart</Button>
            <Button variant="tertiary">Continue Shopping</Button>
          </ButtonGroup>
        </BlockStack>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'fullwidth'),
  },

};

export const ToggleGroup: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = React.useState<string[]>(['all']);

    const handleToggle = (filter: string) => {
      setActiveFilters(prev => {
        if (filter === 'all') {
          return ['all'];
        }
        const withoutAll = prev.filter(f => f !== 'all');
        if (withoutAll.includes(filter)) {
          return withoutAll.filter(f => f !== filter);
        }
        return [...withoutAll, filter];
      });
    };

    const filters = [
      { key: 'all', label: 'All Items' },
      { key: 'active', label: 'Active' },
      { key: 'draft', label: 'Draft' },
      { key: 'archived', label: 'Archived' },
    ];

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Filter Status</Text>
          <ButtonGroup segmented>
            {filters.map((filter) => (
              <Button
                key={filter.key}
                variant={activeFilters.includes(filter.key) ? 'primary' : 'plain'}
                onClick={() => handleToggle(filter.key)}
                pressed={activeFilters.includes(filter.key)}
              >
                {filter.label}
              </Button>
            ))}
          </ButtonGroup>
          <Text as="p" variant="bodySm" tone="subdued">
            Active filters: {activeFilters.join(', ')}
          </Text>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'segmented'),
  },

};

export const NavigationGroup: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState('overview');

    const navigationItems = [
      { key: 'overview', label: 'Overview' },
      { key: 'settings', label: 'Settings' },
      { key: 'analytics', label: 'Analytics' },
      { key: 'reports', label: 'Reports' },
    ];

    return (
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Page Navigation</Text>
          <ButtonGroup segmented>
            {navigationItems.map((item) => (
              <Button
                key={item.key}
                variant={currentPage === item.key ? 'primary' : 'plain'}
                onClick={() => setCurrentPage(item.key)}
                pressed={currentPage === item.key}
              >
                {item.label}
              </Button>
            ))}
          </ButtonGroup>
          <div style={{ padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            <Text as="p">Current page: {navigationItems.find(item => item.key === currentPage)?.label}</Text>
          </div>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'segmented'),
  },

};

export const SizeVariations: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Button Size Variations</Text>

        <div>
          <Text as="p" variant="bodySm">Small Buttons:</Text>
          <ButtonGroup gap="tight">
            <Button size="micro" variant="primary">Save</Button>
            <Button size="micro" variant="secondary">Cancel</Button>
            <Button size="micro" variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Medium Buttons:</Text>
          <ButtonGroup gap="tight">
            <Button size="slim" variant="primary">Save</Button>
            <Button size="slim" variant="secondary">Cancel</Button>
            <Button size="slim" variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="p" variant="bodySm">Large Buttons:</Text>
          <ButtonGroup gap="tight">
            <Button size="large" variant="primary">Save Changes</Button>
            <Button size="large" variant="secondary">Discard</Button>
            <Button size="large" variant="tertiary">Learn More</Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'size-variations'),
  },

};

export const ActionGroups: Story = {
  render: () => {
    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h3" variant="headingMd">Common Action Groups</Text>

          <div>
            <Text as="h4" variant="headingSm">Form Actions</Text>
            <Text as="p" variant="bodySm" tone="subdued">Primary and secondary actions</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary">Submit</Button>
              <Button variant="secondary">Save Draft</Button>
              <Button variant="plain">Cancel</Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="h4" variant="headingSm">CRUD Operations</Text>
            <Text as="p" variant="bodySm" tone="subdued">Create, Read, Update, Delete</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary">Create New</Button>
              <Button variant="secondary">Edit</Button>
              <Button variant="secondary">Duplicate</Button>
              <Button variant="critical">Delete</Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="h4" variant="headingSm">Export Options</Text>
            <Text as="p" variant="bodySm" tone="subdued">Different export formats</Text>
            <ButtonGroup gap="tight">
              <Button variant="tertiary">Export PDF</Button>
              <Button variant="tertiary">Export Excel</Button>
              <Button variant="tertiary">Export CSV</Button>
              <Button variant="tertiary">Print</Button>
            </ButtonGroup>
          </div>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'action-groups'),
  },

};

export const StateVariations: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const handleAsyncAction = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <Card padding="400">
        <BlockStack gap="600">
          <Text as="h3" variant="headingMd">Button State Variations</Text>

          <div>
            <Text as="h4" variant="headingSm">Normal State</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="tertiary">Tertiary Action</Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="h4" variant="headingSm">Loading State</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary" loading>
                Processing...
              </Button>
              <Button variant="secondary" loading>
                Loading...
              </Button>
              <Button variant="tertiary" loading>
                Please wait...
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="h4" variant="headingSm">Disabled State</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary" disabled>
                Disabled Primary
              </Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
              <Button variant="tertiary" disabled>
                Disabled Tertiary
              </Button>
            </ButtonGroup>
          </div>

          <div>
            <Text as="h4" variant="headingSm">Interactive Demo</Text>
            <ButtonGroup gap="tight">
              <Button variant="primary" loading={isLoading} onClick={handleAsyncAction}>
                {isLoading ? 'Processing...' : 'Start Process'}
              </Button>
              <Button variant="secondary" disabled={isDisabled} onClick={() => setIsDisabled(!isDisabled)}>
                {isDisabled ? 'Re-enable' : 'Disable'}
              </Button>
              <Button variant="tertiary" onClick={() => {}}>
                Reset
              </Button>
            </ButtonGroup>
          </div>
        </BlockStack>
      </Card>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'state-variations'),
  },

};

export const ConnectedButtons: Story = {
  render: () => (
    <Card padding="400">
      <BlockStack gap="600">
        <Text as="h3" variant="headingMd">Connected Button Groups</Text>

        <div>
          <Text as="h4" variant="headingSm">Top Connected</Text>
          <ButtonGroup connectedTop gap="tight">
            <Button variant="primary">First</Button>
            <Button variant="primary">Second</Button>
            <Button variant="primary">Third</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Connected Segmented</Text>
          <ButtonGroup segmented gap="tight">
            <Button variant="primary">Option A</Button>
            <Button variant="primary">Option B</Button>
            <Button variant="primary">Option C</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Loose Spacing</Text>
          <ButtonGroup gap="loose">
            <Button variant="primary">Save</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="tertiary">Help</Button>
          </ButtonGroup>
        </div>

        <div>
          <Text as="h4" variant="headingSm">Extra Tight Spacing</Text>
          <ButtonGroup gap="extraTight">
            <Button variant="primary">A</Button>
            <Button variant="secondary">B</Button>
            <Button variant="tertiary">C</Button>
          </ButtonGroup>
        </div>
      </BlockStack>
    </Card>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'connected-buttons'),
  },

};

export const ResponsiveGroup: Story = {
  render: () => (
    <div style={{ width: '100%', maxWidth: '500px' }}>
      <Card padding="400">
        <BlockStack gap="400">
          <Text as="h3" variant="headingMd">Responsive Button Group</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Adjust window width to see responsive behavior
          </Text>

          <div style={{ width: '100%' }}>
            <ButtonGroup fullWidth gap="tight">
              <Button variant="primary">Continue</Button>
              <Button variant="secondary">Back</Button>
              <Button variant="plain">Skip</Button>
            </ButtonGroup>
          </div>

          <Text as="p" variant="bodySm">
            On smaller screens, buttons will stack vertically and take full width.
          </Text>
        </BlockStack>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('buttongroup', 'fullwidth'),
  },

};