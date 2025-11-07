import type { Meta, StoryObj } from '@storybook/react';
import { Sheet, Button, Text, FormLayout, TextField, Card, Badge } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Overlays/Sheet',
  component: Sheet,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sheets are slide-out panels that appear from the edge of the screen. They\'re perfect for navigation, secondary actions, or detailed information that doesn\'t require a full modal.',
      },
    },
    codeVariants: getCodeVariants('sheet', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the sheet is open',
    },
    onClose: {
      action: 'onClose',
      description: 'Callback when sheet is closed',
    },
    activator: {
      control: 'text',
      description: 'The element that triggers the sheet',
    },
    children: {
      control: 'text',
      description: 'Sheet content',
    },
    title: {
      control: 'text',
      description: 'Sheet title',
    },
    size: {
      control: 'select',
      options: ['small', 'large', 'full'],
      description: 'Sheet size',
    },
    openFrom: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Direction sheet slides from',
    },
    borderless: {
      control: 'boolean',
      description: 'Remove sheet border',
    },
    hidden: {
      control: 'boolean',
      description: 'Hidden state (deprecated)',
    },
    onScrolledToBottom: {
      action: 'onScrolledToBottom',
      description: 'Callback when scrolled to bottom',
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive} disclosure>
        Open Sheet
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
        >
          <div style={{ padding: '16px' }}>
            <Text variant="headingMd" as="h2">
              Sheet Title
            </Text>
            <Text variant="bodyMd" as="p">
              This is the default sheet that slides in from the right side.
            </Text>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [activeSheet, setActiveSheet] = React.useState<string | null>(null);

    const toggleSheet = (sheetType: string) => {
      setActiveSheet(activeSheet === sheetType ? null : sheetType);
    };

    return (
      <div style={{ height: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button onClick={() => toggleSheet('small')}>Small Sheet</Button>
        <Button onClick={() => toggleSheet('large')}>Large Sheet</Button>
        <Button onClick={() => toggleSheet('full')}>Full Sheet</Button>

        <Sheet
          open={activeSheet === 'small'}
          onClose={() => setActiveSheet(null)}
          size="small"
          title="Small Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">
              A compact sheet perfect for quick actions or simple forms.
            </Text>
          </div>
        </Sheet>

        <Sheet
          open={activeSheet === 'large'}
          onClose={() => setActiveSheet(null)}
          size="large"
          title="Large Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">
              A larger sheet that can accommodate more content and complex interactions.
            </Text>
          </div>
        </Sheet>

        <Sheet
          open={activeSheet === 'full'}
          onClose={() => setActiveSheet(null)}
          size="full"
          title="Full Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">
              A full-width sheet that takes up the entire screen width. Ideal for complex forms or detailed content views.
            </Text>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const OpenFromDirections: Story = {
  render: () => {
    const [activeSheet, setActiveSheet] = React.useState<string | null>(null);

    const toggleSheet = (sheetType: string) => {
      setActiveSheet(activeSheet === sheetType ? null : sheetType);
    };

    return (
      <div style={{ height: '200px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Button onClick={() => toggleSheet('left')}>Open from Left</Button>
        <Button onClick={() => toggleSheet('right')}>Open from Right</Button>
        <Button onClick={() => toggleSheet('top')}>Open from Top</Button>
        <Button onClick={() => toggleSheet('bottom')}>Open from Bottom</Button>

        <Sheet
          open={activeSheet === 'left'}
          onClose={() => setActiveSheet(null)}
          openFrom="left"
          title="Left Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">Slides in from the left side of the screen.</Text>
          </div>
        </Sheet>

        <Sheet
          open={activeSheet === 'right'}
          onClose={() => setActiveSheet(null)}
          openFrom="right"
          title="Right Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">Slides in from the right side of the screen.</Text>
          </div>
        </Sheet>

        <Sheet
          open={activeSheet === 'top'}
          onClose={() => setActiveSheet(null)}
          openFrom="top"
          title="Top Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">Slides in from the top of the screen.</Text>
          </div>
        </Sheet>

        <Sheet
          open={activeSheet === 'bottom'}
          onClose={() => setActiveSheet(null)}
          openFrom="bottom"
          title="Bottom Sheet"
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">Slides in from the bottom of the screen.</Text>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const NavigationSheet: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        Navigation Menu
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Navigation"
          openFrom="left"
        >
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <Text variant="headingSm" as="h3">Main Menu</Text>
                <div style={{ marginTop: '8px' }}>
                  <Button plain fullWidth onClick={toggleActive}>Dashboard</Button>
                  <Button plain fullWidth onClick={toggleActive}>Orders</Button>
                  <Button plain fullWidth onClick={toggleActive}>Products</Button>
                  <Button plain fullWidth onClick={toggleActive}>Customers</Button>
                  <Button plain fullWidth onClick={toggleActive}>Analytics</Button>
                </div>
              </div>

              <div>
                <Text variant="headingSm" as="h3">Settings</Text>
                <div style={{ marginTop: '8px' }}>
                  <Button plain fullWidth onClick={toggleActive}>General</Button>
                  <Button plain fullWidth onClick={toggleActive}>Security</Button>
                  <Button plain fullWidth onClick={toggleActive}>Integrations</Button>
                </div>
              </div>

              <div>
                <Text variant="headingSm" as="h3">Support</Text>
                <div style={{ marginTop: '8px' }}>
                  <Button plain fullWidth onClick={toggleActive}>Help Center</Button>
                  <Button plain fullWidth onClick={toggleActive}>Contact Support</Button>
                  <Button plain fullWidth onClick={toggleActive}>API Documentation</Button>
                </div>
              </div>
            </div>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const FormSheet: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      price: '',
      category: '',
    });

    const toggleActive = () => setActive(!active);

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
      console.log('Form data:', formData);
      toggleActive();
    };

    const activator = (
      <Button primary onClick={toggleActive}>
        Add New Product
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Add New Product"
          size="large"
        >
          <div style={{ padding: '16px' }}>
            <FormLayout>
              <TextField
                label="Product Title"
                value={formData.title}
                onChange={(value) => handleFieldChange('title', value)}
                placeholder="Enter product name"
              />
              <TextField
                label="Description"
                value={formData.description}
                onChange={(value) => handleFieldChange('description', value)}
                placeholder="Describe your product"
                multiline={3}
              />
              <TextField
                label="Price"
                value={formData.price}
                onChange={(value) => handleFieldChange('price', value)}
                placeholder="$0.00"
                prefix="$"
              />
              <TextField
                label="Category"
                value={formData.category}
                onChange={(value) => handleFieldChange('category', value)}
                placeholder="Select category"
              />
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Button primary onClick={handleSave}>
                  Save Product
                </Button>
                <Button onClick={toggleActive}>
                  Cancel
                </Button>
              </div>
            </FormLayout>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const DetailsSheet: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        View Order Details
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Order #1001"
          size="large"
        >
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Card sectioned>
                <Text variant="headingSm" as="h3">Order Information</Text>
                <div style={{ marginTop: '12px' }}>
                  <Text as="p"><strong>Status:</strong> <Badge status="success">Fulfilled</Badge></Text>
                  <Text as="p"><strong>Date:</strong> November 5, 2025</Text>
                  <Text as="p"><strong>Total:</strong> $299.99</Text>
                  <Text as="p"><strong>Payment:</strong> Credit Card</Text>
                </div>
              </Card>

              <Card sectioned>
                <Text variant="headingSm" as="h3">Customer Details</Text>
                <div style={{ marginTop: '12px' }}>
                  <Text as="p"><strong>Name:</strong> John Doe</Text>
                  <Text as="p"><strong>Email:</strong> john.doe@example.com</Text>
                  <Text as="p"><strong>Phone:</strong> (555) 123-4567</Text>
                  <Text as="p"><strong>Address:</strong> 123 Main St, City, State 12345</Text>
                </div>
              </Card>

              <Card sectioned>
                <Text variant="headingSm" as="h3">Order Items</Text>
                <div style={{ marginTop: '12px' }}>
                  <Text as="p">• Premium Widget (x2) - $199.98</Text>
                  <Text as="p">• Standard Widget (x1) - $99.99</Text>
                  <Text as="p"><strong>Subtotal:</strong> $299.97</Text>
                  <Text as="p"><strong>Tax:</strong> $0.02</Text>
                  <Text as="p"><strong>Total:</strong> $299.99</Text>
                </div>
              </Card>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Button primary onClick={toggleActive}>Close</Button>
                <Button onClick={toggleActive}>Print Order</Button>
                <Button onClick={toggleActive}>Send Email</Button>
              </div>
            </div>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const FiltersSheet: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const [filters, setFilters] = React.useState({
      status: 'all',
      dateRange: '30days',
      category: 'all',
      priceRange: 'all',
    });

    const toggleActive = () => setActive(!active);

    const handleFilterChange = (field: string, value: string) => {
      setFilters(prev => ({ ...prev, [field]: value }));
    };

    const applyFilters = () => {
      console.log('Applied filters:', filters);
      toggleActive();
    };

    const clearFilters = () => {
      setFilters({
        status: 'all',
        dateRange: '30days',
        category: 'all',
        priceRange: 'all',
      });
    };

    const activator = (
      <Button onClick={toggleActive}>
        Filters
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Filter Orders"
          size="small"
        >
          <div style={{ padding: '16px' }}>
            <FormLayout>
              <div>
                <Text variant="headingSm" as="h3">Order Status</Text>
                <div style={{ marginTop: '8px' }}>
                  {['All', 'Pending', 'Fulfilled', 'Cancelled'].map((status) => (
                    <Button
                      key={status}
                      plain
                      fullWidth
                      onClick={() => handleFilterChange('status', status.toLowerCase())}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Text variant="headingSm" as="h3">Date Range</Text>
                <div style={{ marginTop: '8px' }}>
                  {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((range) => (
                    <Button
                      key={range}
                      plain
                      fullWidth
                      onClick={() => handleFilterChange('dateRange', range.toLowerCase().replace(' ', ''))}
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <Button primary onClick={applyFilters}>
                  Apply Filters
                </Button>
                <Button onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </FormLayout>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const BorderlessSheet: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>
        Borderless Sheet
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Borderless Sheet"
          borderless
        >
          <div style={{ padding: '16px' }}>
            <Text variant="bodyMd">
              This sheet uses the borderless prop to remove the default border.
              It creates a more seamless integration with the background.
            </Text>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const WithScroll: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const [scrolledToBottom, setScrolledToBottom] = React.useState(false);

    const toggleActive = () => {
      setActive(!active);
      setScrolledToBottom(false);
    };

    const handleScrolledToBottom = () => {
      setScrolledToBottom(true);
    };

    const activator = (
      <Button onClick={toggleActive}>
        Long Content Sheet
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Scrollable Content"
          onScrolledToBottom={handleScrolledToBottom}
        >
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Text variant="headingMd">Scrollable Content Example</Text>

              {Array.from({ length: 20 }, (_, i) => (
                <Card key={i} sectioned>
                  <Text variant="headingSm" as="h3">Section {i + 1}</Text>
                  <Text variant="bodyMd" as="p">
                    This is section {i + 1} of the scrollable content.
                    The sheet will automatically add scrolling when content exceeds the viewport height.
                  </Text>
                </Card>
              ))}

              {scrolledToBottom && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f1f2f4',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}>
                  <Text variant="bodyMd">You've reached the bottom!</Text>
                </div>
              )}
            </div>
          </div>
        </Sheet>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive} ariaLabel="Open accessibility demonstration sheet">
        Accessibility Sheet
      </Button>
    );

    return (
      <div style={{ height: '200px' }}>
        {activator}
        <Sheet
          open={active}
          onClose={toggleActive}
          activator={activator}
          title="Accessibility Features"
          size="large"
        >
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <Text variant="headingSm" as="h3">Screen Reader Support</Text>
                <Text variant="bodyMd" as="p">
                  This sheet includes proper ARIA attributes and announcements for screen readers.
                </Text>
              </div>

              <div>
                <Text variant="headingSm" as="h3">Keyboard Navigation</Text>
                <Text variant="bodyMd" as="p">
                  • Tab/Shift+Tab: Navigate between focusable elements<br />
                  • Enter/Space: Activate buttons and links<br />
                  • Escape: Close the sheet<br />
                  • Focus is properly managed when opening and closing
                </Text>
              </div>

              <div>
                <Text variant="headingSm" as="h3">Focus Management</Text>
                <Text variant="bodyMd" as="p">
                  Focus is automatically trapped within the sheet when open and returned to the trigger element when closed.
                </Text>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Button primary onClick={toggleActive}>Got it</Button>
                <Button onClick={toggleActive}>Learn More</Button>
              </div>
            </div>
          </div>
        </Sheet>
      </div>
    );
  },
};