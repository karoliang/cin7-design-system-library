import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  TextField,
  Select,
  Checkbox,
  RadioButton,
  ChoiceList,
  Card,
  Grid,
  BlockStack,
  InlineStack,
  Layout,
  Page,
  Tabs,
  Modal,
  Popover,
  Tooltip,
  DataTable,
  List,
  Avatar,
  Badge,
  Banner,
  Spinner,
  ProgressBar,
  Text,
  Heading,
  Icon,
  Collapsible,
  Scrollable,
  Divider,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  AlertIcon,
  TickIcon,
  MobileIcon,
  DesktopIcon,
  NotificationIcon,
  SearchIcon,
  FilterIcon,
} from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Cin7 DSL Guides/Component Categories',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive guide to Cin7 DSL component categories, helping developers understand when and how to use different types of components in their applications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: 'select',
      options: ['forms', 'layout', 'navigation', 'data', 'feedback', 'typography', 'utility'],
      description: 'Select a component category to explore',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Heading as="h1" variant="displayMd">
        Cin7 DSL Component Categories
      </Heading>
      <Text as="p" tone="subdued">
        Learn how to effectively use components organized by their purpose and use cases.
      </Text>

      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="400">
        <Card>
          <BlockStack gap="200">
            <Heading>📝 Forms & Input</Heading>
            <Text>Components for user input and form interactions</Text>
            <Badge tone="info">8 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Heading>🏗️ Layout & Structure</Heading>
            <Text>Components for organizing content and page structure</Text>
            <Badge tone="info">6 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Heading>🧭 Navigation & Interaction</Heading>
            <Text>Components for navigation and user interactions</Text>
            <Badge tone="info">5 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Heading>📊 Data Display</Heading>
            <Text>Components for presenting data and information</Text>
            <Badge tone="info">6 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Heading>💬 Feedback & Loading</Heading>
            <Text>Components for system feedback and loading states</Text>
            <Badge tone="info">5 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Heading>📝 Typography & Content</Heading>
            <Text>Components for text and content presentation</Text>
            <Badge tone="info">4 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Heading>🛠️ Utility Components</Heading>
            <Text>Helper components for common UI patterns</Text>
            <Badge tone="info">4 Components</Badge>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const FormsAndInput: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Forms & Input Components</Heading>
      <Text as="p">
        Form components handle user input and data collection. They should be used for any interactive
        elements where users need to enter, select, or manipulate data.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Primary Form Elements</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Button</Text>
              <Text as="p" tone="subdued">
                Trigger actions and form submissions. Use different variants for primary, secondary, and destructive actions.
              </Text>
              <InlineStack gap="200">
                <Button variant="primary" icon={PlusIcon}>Add New</Button>
                <Button variant="secondary" icon={EditIcon}>Edit</Button>
                <Button variant="critical" icon={DeleteIcon}>Delete</Button>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">TextField</Text>
              <Text as="p" tone="subdued">
                For single-line text input. Use labels and placeholder text for clarity.
              </Text>
              <TextField label="Product Name" placeholder="Enter product name" />
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Select</Text>
              <Text as="p" tone="subdued">
                For choosing from predefined options. Good for dropdown selections.
              </Text>
              <Select
                label="Category"
                options={[
                  {label: 'Electronics', value: 'electronics'},
                  {label: 'Clothing', value: 'clothing'},
                  {label: 'Food', value: 'food'},
                ]}
              />
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Selection Controls</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Checkbox</Text>
              <Text as="p" tone="subdued">
                For binary choices or multiple selections from a group.
              </Text>
              <Checkbox label="Enable notifications" />
              <Checkbox label="Send email updates" />
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">RadioButton</Text>
              <Text as="p" tone="subdued">
                For single selection from mutually exclusive options.
              </Text>
              <RadioButton label="Standard shipping" />
              <RadioButton label="Express shipping" />
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">ChoiceList</Text>
              <Text as="p" tone="subdued">
                For more complex selection scenarios with multiple options.
              </Text>
              <ChoiceList
                title="Features"
                choices={[
                  {label: 'Free shipping', value: 'free-shipping'},
                  {label: 'Express delivery', value: 'express-delivery'},
                  {label: 'Gift wrapping', value: 'gift-wrapping'},
                ]}
                selected={[]}
                onChange={() => {}}
              />
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">✅ Best Practices</Heading>
          <List type="number">
            <List.Item>Always provide clear labels and descriptions</List.Item>
            <List.Item>Group related form elements together</List.Item>
            <List.Item>Use appropriate input types for the data being collected</List.Item>
            <List.Item>Provide clear error states and validation messages</List.Item>
            <List.Item>Ensure proper accessibility with ARIA labels</List.Item>
          </List>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const LayoutAndStructure: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Layout & Structure Components</Heading>
      <Text as="p">
        Layout components provide the structural foundation for your application pages.
        They help organize content, create visual hierarchy, and maintain consistent spacing.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Containers & Wrappers</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Card</Text>
              <Text as="p" tone="subdued">
                Flexible container for grouping related content. Use for sections, panels, and content groups.
              </Text>
              <Card sectioned>
                <Text>This is a card containing related content.</Text>
              </Card>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Page</Text>
              <Text as="p" tone="subdued">
                Main page container with title, primary action, and content area.
              </Text>
              <Card sectioned>
                <Text fontWeight="semibold">Page Header</Text>
                <Text as="p" tone="subdued">Primary action button here</Text>
              </Card>
              <Card sectioned>
                <Text>Page content goes here</Text>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Layout Systems</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Grid</Text>
              <Text as="p" tone="subdued">
                Powerful 2D layout system for complex arrangements. Use for dashboard-style layouts.
              </Text>
              <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="200">
                <Card>Grid Item 1</Card>
                <Card>Grid Item 2</Card>
                <Card>Grid Item 3</Card>
              </Grid>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">BlockStack & InlineStack</Text>
              <Text as="p" tone="subdued">
                1D layout components for vertical and horizontal arrangements.
              </Text>
              <InlineStack gap="200">
                <Badge>Item 1</Badge>
                <Badge>Item 2</Badge>
                <Badge>Item 3</Badge>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Layout</Text>
              <Text as="p" tone="subdued">
                Fixed-width layout with responsive sections for admin interfaces.
              </Text>
              <Text as="p" tone="subdued">Annotated layout section example</Text>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">🏗️ Layout Decision Guide</Heading>
          <Grid columns={{ sm: 1, md: 2 }} gap="400">
            <div>
              <Text fontWeight="semibold">Use Grid for:</Text>
              <List>
                <List.Item>Dashboard layouts</List.Item>
                <List.Item>Card-based galleries</List.Item>
                <List.Item>Complex 2D arrangements</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Stack for:</Text>
              <List>
                <List.Item>Simple linear arrangements</List.Item>
                <List.Item>Form layouts</List.Item>
                <List.Item>Component composition</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Layout for:</Text>
              <List>
                <List.Item>Admin interfaces</List.Item>
                <List.Item>Side-by-side content</List.Item>
                <List.Item>Fixed-width layouts</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Page for:</Text>
              <List>
                <List.Item>Top-level pages</List.Item>
                <List.Item>Page headers with actions</List.Item>
                <List.Item>Breadcrumb navigation</List.Item>
              </List>
            </div>
          </Grid>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const NavigationAndInteraction: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Navigation & Interaction Components</Heading>
      <Text as="p">
        Navigation components help users move through your application and interact with content.
        They provide context, orientation, and access to different sections of your application.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Primary Navigation</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Tabs</Text>
              <Text as="p" tone="subdued">
                Switch between related views within the same context. Perfect for organizing content by categories.
              </Text>
              <Tabs
                tabs={[
                  {content: 'Overview', id: 'overview'},
                  {content: 'Settings', id: 'settings'},
                  {content: 'Analytics', id: 'analytics'},
                ]}
                selected={0}
                onSelect={() => {}}
              />
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Navigation</Text>
              <Text as="p" tone="subdued">
                Main navigation component for application-wide menus and submenus.
              </Text>
              <Card sectioned>
                <Text>Navigation menu would appear here</Text>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Overlays & Popups</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Modal</Text>
              <Text as="p" tone="subdued">
                For important actions that require user attention or additional information.
              </Text>
              <Button onClick={() => {}}>Open Modal Example</Button>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Popover</Text>
              <Text as="p" tone="subdued">
                For contextual content that appears on hover or click. Great for tooltips and action menus.
              </Text>
              <Button onClick={() => {}}>Show Popover</Button>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Tooltip</Text>
              <Text as="p" tone="subdued">
                For brief contextual help or information on hover.
              </Text>
              <Tooltip content="This is helpful information">
                <Button plain>Hover me</Button>
              </Tooltip>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">🧭 Navigation Best Practices</Heading>
          <Grid columns={{ sm: 1, md: 2 }} gap="400">
            <div>
              <Text fontWeight="semibold">Use Tabs for:</Text>
              <List>
                <List.Item>Related content sections</List.Item>
                <List.Item>Settings panels</List.Item>
                <List.Item>Data views (list vs grid)</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Modal for:</Text>
              <List>
                <List.Item>Confirmation dialogs</List.Item>
                <List.Item>Form wizards</List.Item>
                <List.Item>Important notifications</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Popover for:</Text>
              <List>
                <List.Item>Quick actions menus</List.Item>
                <List.Item>Form field help</List.Item>
                <List.Item>Contextual information</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Tooltip for:</Text>
              <List>
                <List.Item>Icon explanations</List.Item>
                <List.Item>Abbreviation definitions</List.Item>
                <List.Item>Quick field descriptions</List.Item>
              </List>
            </div>
          </Grid>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const DataDisplay: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Data Display Components</Heading>
      <Text as="p">
        Data display components present information in structured, readable formats.
        They help users understand and interact with data efficiently.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Structured Data</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">DataTable</Text>
              <Text as="p" tone="subdued">
                For complex tabular data with sorting, filtering, and pagination capabilities.
              </Text>
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric']}
                headings={['Product', 'Quantity', 'Price']}
                rows={[
                  ['Laptop', '5', '$999'],
                  ['Mouse', '20', '$29'],
                  ['Keyboard', '15', '$79'],
                ]}
              />
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">List</Text>
              <Text as="p" tone="subdued">
                For ordered or unordered collections of items.
              </Text>
              <List>
                <List.Item>First item in the list</List.Item>
                <List.Item>Second item in the list</List.Item>
                <List.Item>Third item in the list</List.Item>
              </List>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Visual Elements</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Avatar</Text>
              <Text as="p" tone="subdued">
                For representing users or entities visually.
              </Text>
              <InlineStack gap="200">
                <Avatar initials="JD" />
                <Avatar initials="AB" />
                <Avatar initials="XY" />
              </InlineStack>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Badge</Text>
              <Text as="p" tone="subdued">
                For status indicators, counts, or categorical labels.
              </Text>
              <InlineStack gap="200">
                <Badge>Active</Badge>
                <Badge tone="attention">Warning</Badge>
                <Badge tone="critical">Error</Badge>
                <Badge tone="success">Success</Badge>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Icon</Text>
              <Text as="p" tone="subdued">
                For visual representation of actions, concepts, or entities.
              </Text>
              <InlineStack gap="200">
                <Icon source={SearchIcon} />
                <Icon source={FilterIcon} />
                <Icon source={NotificationIcon} />
                <Icon source={DesktopIcon} />
                <Icon source={MobileIcon} />
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">📊 Data Presentation Guidelines</Heading>
          <Grid columns={{ sm: 1, md: 2 }} gap="400">
            <div>
              <Text fontWeight="semibold">Use DataTable for:</Text>
              <List>
                <List.Item>Large datasets (10+ items)</List.Item>
                <List.Item>Sortable/filterable data</List.Item>
                <List.Item>Structured tabular information</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use List for:</Text>
              <List>
                <List.Item>Simple item collections</List.Item>
                <List.Item>Sequential information</List.Item>
                <List.Item>Navigation menus</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Badge for:</Text>
              <List>
                <List.Item>Status indicators</List.Item>
                <List.Item>Category labels</List.Item>
                <List.Item>Count displays</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Avatar for:</Text>
              <List>
                <List.Item>User representations</List.Item>
                <List.Item>Entity branding</List.Item>
                <List.Item>Visual identifiers</List.Item>
              </List>
            </div>
          </Grid>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const FeedbackAndLoading: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Feedback & Loading Components</Heading>
      <Text as="p">
        Feedback components keep users informed about system status, progress, and important events.
        They help manage user expectations and provide clarity during interactions.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">System Feedback</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Banner</Text>
              <Text as="p" tone="subdued">
                For important messages, warnings, or success notifications that require attention.
              </Text>
              <Banner
                title="Product saved successfully"
                status="success"
                onDismiss={() => {}}
              >
                <p>Your changes have been saved and are now live.</p>
              </Banner>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Spinner</Text>
              <Text as="p" tone="subdued">
                For showing that the system is working on a task.
              </Text>
              <InlineStack gap="200" alignment="center">
                <Spinner size="small" />
                <Text>Loading...</Text>
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Progress Indicators</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">ProgressBar</Text>
              <Text as="p" tone="subdued">
                For showing completion status of long-running operations.
              </Text>
              <ProgressBar progress={75} size="small" />
              <Text as="p" tone="subdued">75% complete</Text>
            </BlockStack>

            <BlockStack gap="300">
              <Text fontWeight="semibold">Progress States</Text>
              <BlockStack gap="200">
                <Banner status="info">
                  <p>Processing your request...</p>
                </Banner>
                <Banner status="warning">
                  <p>Please review your input</p>
                </Banner>
                <Banner status="success">
                  <p>Operation completed successfully</p>
                </Banner>
                <Banner status="critical">
                  <p>An error occurred</p>
                </Banner>
              </BlockStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">💬 Feedback Best Practices</Heading>
          <List type="number">
            <List.Item>Use success banners for completed actions</List.Item>
            <List.Item>Use warning banners for user action required</List.Item>
            <List.Item>Use critical banners for errors that block progress</List.Item>
            <List.Item>Use spinners for brief loading states (less than 5 seconds)</List.Item>
            <List.Item>Use progress bars for operations with known duration</List.Item>
            <List.Item>Always provide clear next steps or resolution paths</List.Item>
          </List>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const TypographyAndContent: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Typography & Content Components</Heading>
      <Text as="p">
        Typography components help structure text content with proper hierarchy and readability.
        They ensure consistent formatting and visual communication.
      </Text>

      <Divider />

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">Typography Hierarchy</Heading>

          <BlockStack gap="200">
            <Heading as="h3" variant="headingXl">Display Text - Small</Heading>
            <Heading as="h2" variant="heading2xl">Display Text - Medium</Heading>
            <Heading as="h1" variant="heading3xl">Display Text - Large</Heading>
            <Heading level="1">Heading Level 1</Heading>
            <Heading level="2">Heading Level 2</Heading>
            <Heading level="3">Heading Level 3</Heading>
            <Heading level="4">Heading Level 4</Heading>
            <Text>Body text for regular content</Text>
            <Text as="p" tone="subdued">Subdued text for secondary information</Text>
            <Text as="p" tone="critical">Critical text for warnings</Text>
            <Text as="p" tone="success">Success text for positive feedback</Text>
            <Text as="p" tone="warning">Warning text for cautions</Text>
          </BlockStack>
        </BlockStack>
      </Card>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">📝 Typography Guidelines</Heading>
          <Grid columns={{ sm: 1, md: 2 }} gap="400">
            <div>
              <Text fontWeight="semibold">Use large Heading variants for:</Text>
              <List>
                <List.Item>Page titles</List.Item>
                <List.Item>Major section headers</List.Item>
                <List.Item>Hero content</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Heading for:</Text>
              <List>
                <List.Item>Section titles</List.Item>
                <List.Item>Card headers</List.Item>
                <List.Item>Sub-sections</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Text for:</Text>
              <List>
                <List.Item>Body content</List.Item>
                <List.Item>Descriptions</List.Item>
                <List.Item>Labels and captions</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Tone Variations:</Text>
              <List>
                <List.Item>Subdued: Secondary info</List.Item>
                <List.Item>Success: Positive messages</List.Item>
                <List.Item>Critical: Errors/warnings</List.Item>
              </List>
            </div>
          </Grid>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const UtilityComponents: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Utility Components</Heading>
      <Text as="p">
        Utility components provide common UI patterns and behaviors that can be reused across your application.
        They solve frequent interaction and layout challenges.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Interactive Utilities</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Collapsible</Text>
              <Text as="p" tone="subdued">
                For content that can be expanded or collapsed to save space.
              </Text>
              <Card sectioned>
                <Text>Collapsible content area example</Text>
              </Card>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Scrollable</Text>
              <Text as="p" tone="subdued">
                For content areas that need custom scrolling behavior.
              </Text>
              <Card sectioned>
                <Scrollable shadow style={{height: '100px'}}>
                  <BlockStack gap="200">
                    <Text>Scrollable content item 1</Text>
                    <Text>Scrollable content item 2</Text>
                    <Text>Scrollable content item 3</Text>
                    <Text>Scrollable content item 4</Text>
                    <Text>Scrollable content item 5</Text>
                  </BlockStack>
                </Scrollable>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Visual Utilities</Heading>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Divider</Text>
              <Text as="p" tone="subdued">
                For creating visual separation between content sections.
              </Text>
              <Divider />
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Icon</Text>
              <Text as="p" tone="subdued">
                For visual representation and action indicators.
              </Text>
              <InlineStack gap="200">
                <Icon source={AlertIcon} tone="critical" />
                <Icon source={TickIcon} tone="success" />
                <Icon source={NotificationIcon} tone="info" />
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Heading element="h3">🛠️ Utility Usage Tips</Heading>
          <Grid columns={{ sm: 1, md: 2 }} gap="400">
            <div>
              <Text fontWeight="semibold">Use Collapsible for:</Text>
              <List>
                <List.Item>FAQ sections</List.Item>
                <List.Item>Advanced settings</List.Item>
                <List.Item>Long descriptions</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Scrollable for:</Text>
              <List>
                <List.Item>Long lists</List.Item>
                <List.Item>Log outputs</List.Item>
                <List.Item>Code snippets</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Divider for:</Text>
              <List>
                <List.Item>Section breaks</List.Item>
                <List.Item>Content grouping</List.Item>
                <List.Item>Visual separation</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Use Icon for:</Text>
              <List>
                <List.Item>Action indicators</List.Item>
                <List.Item>Status representation</List.Item>
                <List.Item>Visual hierarchy</List.Item>
              </List>
            </div>
          </Grid>
        </BlockStack>
      </Card>
    </div>
  ),
};