import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  ButtonGroup,
  ButtonFrom,
  Card,
  Grid,
  BlockStack,
  InlineStack,
  Layout,
  Page,
  Text,
  Heading,
  TextField,
  Select,
  DataTable,
  List,
  ResourceList,
  Banner,
  Toast,
  CalloutCard,
  Tabs,
  Navigation,
  Breadcrumbs,
  Modal,
  Popover,
  Tooltip,
  Icon,
  Badge,
  Avatar,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  SearchIcon,
  FilterIcon,
  HomeIcon,
  SettingsIcon,
  ChevronRightIcon,
  InfoIcon,
  HelpIcon,
  ShoppingCartIcon,
  PackageIcon,
  CustomersIcon,
  AnalyticsIcon,
  MobileIcon,
  DesktopIcon,
  CreditCardIcon,
  ExportIcon,
  ImportIcon,
  RefreshIcon,
  TickIcon,
  AlertIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Cin7 DSL Guides/Component Selection',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive guide to help developers choose the right components for different scenarios. Learn when to use similar components and understand their specific use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    componentType: {
      control: 'select',
      options: ['buttons', 'layout', 'display', 'navigation', 'feedback'],
      description: 'Select a component category to compare',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Heading as="h1" variant="heading3xl">
        Component Selection Guide
      </Heading>
      <Text as="p" tone="subdued">
        Learn when to use different components and make informed design decisions.
      </Text>

      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="400">
        <Card>
          <BlockStack gap="200">
            <Icon source={EditIcon} size="large" />
            <Heading>Button Choices</Heading>
            <Text>Button vs ButtonGroup vs ButtonFrom</Text>
            <Badge tone="info">3 Variants</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={Grid} size="large" />
            <Heading>Layout Options</Heading>
            <Text>Stack vs Grid vs Layout</Text>
            <Badge tone="info">3 Options</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={Text} size="large" />
            <Heading>Text Components</Heading>
            <Text>Text vs DisplayText vs Heading</Text>
            <Badge tone="info">3 Types</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={List} size="large" />
            <Heading>Data Display</Heading>
            <Text>Table vs List vs ResourceList</Text>
            <Badge tone="info">3 Components</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={AlertIcon} size="large" />
            <Heading>User Feedback</Heading>
            <Text>Banner vs Toast vs CalloutCard</Text>
            <Badge tone="info">3 Methods</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={Navigation} size="large" />
            <Heading>Navigation</Heading>
            <Text>Tabs vs Navigation vs Breadcrumbs</Text>
            <Badge tone="info">3 Types</Badge>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const ButtonSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Button Component Selection</Heading>
      <Text as="p">
        Choose the right button component for your specific use case.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Button</Heading>
            <Text as="p" tone="subdued">
              The standard button component for most use cases.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Primary actions (Save, Submit, Create)</List.Item>
                <List.Item>Secondary actions (Cancel, Back)</List.Item>
                <List.Item>Destructive actions (Delete, Remove)</List.Item>
                <List.Item>Custom actions with specific styling</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Examples:</Text>
              <InlineStack gap="200">
                <Button variant="primary">Save Product</Button>
                <Button variant="secondary">Cancel</Button>
                <Button variant="critical">Delete</Button>
              </InlineStack>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Most button needs. Provides full control over appearance and behavior.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">ButtonGroup</Heading>
            <Text as="p" tone="subdued">
              Groups related buttons together with proper spacing.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Multiple related actions</List.Item>
                <List.Item>Button toolbars</List.Item>
                <List.Item>Form action groups</List.Item>
                <List.Item>Navigation button sets</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Examples:</Text>
              <ButtonGroup>
                <Button variant="primary">Save</Button>
                <Button variant="secondary">Save and Continue</Button>
                <Button variant="plain">Discard</Button>
              </ButtonGroup>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Grouping 2-4 related buttons that belong together visually.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">ButtonFrom</Heading>
            <Text as="p" tone="subdued">
              Creates buttons from action objects, useful for dynamic interfaces.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Dynamic button generation</List.Item>
                <List.Item>Configuration-driven interfaces</List.Item>
                <List.Item>API-driven actions</List.Item>
                <List.Item>Multi-language applications</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <pre style={{
                background: '#f8f9fa',
                padding: '12px',
                borderRadius: '4px',
                fontSize: "14px",
                overflow: 'auto'
              }}>
{`const actions = [
  {content: 'Edit', onAction: handleEdit},
  {content: 'Delete', onAction: handleDelete}
];

<ButtonFrom actions={actions} />`}
              </pre>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Dynamic applications where buttons are generated from configuration or API data.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Decision Guide</Heading>
            <Text as="p" tone="subdued">
              Quick reference for choosing the right button component.
            </Text>

            <BlockStack gap="300">
              <Card sectioned>
                <Text fontWeight="semibold">Use Button when:</Text>
                <List>
                  <List.Item>You need a single, standalone button</List.Item>
                  <List.Item>You want full control over styling</List.Item>
                  <List.Item>You need specific variants or icons</List.Item>
                </List>
              </Card>

              <Card sectioned>
                <Text fontWeight="semibold">Use ButtonGroup when:</Text>
                <List>
                  <List.Item>You have 2-4 related buttons</List.Item>
                  <List.Item>Buttons belong together visually</List.Item>
                  <List.Item>You want consistent spacing</List.Item>
                </List>
              </Card>

              <Card sectioned>
                <Text fontWeight="semibold">Use ButtonFrom when:</Text>
                <List>
                  <List.Item>Buttons are dynamically generated</List.Item>
                  <List.Item>You're building configuration-driven UI</List.Item>
                  <List.Item>You need to render many similar buttons</List.Item>
                </List>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const LayoutSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Layout Component Selection</Heading>
      <Text as="p">
        Choose the right layout component to structure your content effectively.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">BlockStack & InlineStack</Heading>
            <Text as="p" tone="subdued">
              1D layout components for arranging items in a single direction.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Linear arrangements (forms, lists)</List.Item>
                <List.Item>Simple spacing control</List.Item>
                <List.Item>Responsive stacking behavior</List.Item>
                <List.Item>Component composition</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Examples:</Text>
              <Card sectioned>
                <Text size="small">BlockStack (Vertical)</Text>
                <BlockStack gap="200">
                  <Badge>Item 1</Badge>
                  <Badge>Item 2</Badge>
                  <Badge>Item 3</Badge>
                </BlockStack>
              </Card>

              <Card sectioned>
                <Text size="small">InlineStack (Horizontal)</Text>
                <InlineStack gap="200">
                  <Badge>Item 1</Badge>
                  <Badge>Item 2</Badge>
                  <Badge>Item 3</Badge>
                </InlineStack>
              </Card>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Most layout needs. Simple, predictable, and performant.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Grid</Heading>
            <Text as="p" tone="subdued">
              2D layout component for complex arrangements with rows and columns.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Dashboard layouts</List.Item>
                <List.Item>Card-based galleries</List.Item>
                <List.Item>Complex data presentations</List.Item>
                <List.Item>Responsive grid systems</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <Card sectioned>
                <Grid columns={{ xs: 1, sm: 2, md: 3 }} gap="200">
                  <Card>Grid Item 1</Card>
                  <Card>Grid Item 2</Card>
                  <Card>Grid Item 3</Card>
                  <Card>Grid Item 4</Card>
                </Grid>
              </Card>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Complex 2D layouts that need both row and column control.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Layout</Heading>
            <Text as="p" tone="subdued">
              Fixed-width layout system for admin interfaces with sidebars.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Admin dashboards</List.Item>
                <List.Item>Interfaces with navigation</List.Item>
                <List.Item>Fixed-width sidebars</List.Item>
                <List.Item>Multi-column admin pages</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Structure:</Text>
              <Card sectioned>
                <Text size="small">
                  <strong>Layout.Annotated:</strong> Main content with sidebar annotations<br/>
                  <strong>Layout.Section:</strong> Content sections (primary/secondary)<br/>
                  <strong>Fixed sidebars:</strong> Consistent navigation
                </Text>
              </Card>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Traditional admin interfaces with fixed sidebar navigation.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Layout Decision Matrix</Heading>
            <Text as="p" tone="subdued">
              Choose the right layout based on your requirements.
            </Text>

            <Card sectioned>
              <BlockStack gap="300">
                <Text fontWeight="semibold">Complexity Level</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Simple</Text>
                  <Text>→</Text>
                  <Text>Stack Components</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Moderate</Text>
                  <Text>→</Text>
                  <Text>Grid Component</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Complex</Text>
                  <Text>→</Text>
                  <Text>Layout Component</Text>
                </div>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="300">
                <Text fontWeight="semibold">Responsive Needs</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Mobile-first</Text>
                  <Text>→</Text>
                  <Text>Stack Components</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Tablet+</Text>
                  <Text>→</Text>
                  <Text>Grid Component</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Desktop-focused</Text>
                  <Text>→</Text>
                  <Text>Layout Component</Text>
                </div>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const TextComponentSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Text Component Selection</Heading>
      <Text as="p">
        Choose the right text component for proper hierarchy and readability.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">DisplayText</Heading>
            <Text as="p" tone="subdued">
              Large, prominent text for page titles and hero content.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Page titles</List.Item>
                <List.Item>Hero sections</List.Item>
                <List.Item>Major headings</List.Item>
                <List.Item>Marketing headlines</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Sizes Available:</Text>
              <BlockStack gap="100">
                <Heading as="h3" variant="headingXl">Small Display Text</Heading>
                <Heading as="h2" variant="heading2xl">Medium Display Text</Heading>
                <Heading as="h1" variant="heading3xl">Large Display Text</Heading>
              </BlockStack>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Page-level titles and important section headers.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Heading</Heading>
            <Text as="p" tone="subdued">
              Semantic heading components for content structure.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Section titles</List.Item>
                <List.Item>Card headers</List.Item>
                <List.Item>Sub-sections</List.Item>
                <List.Item>Form section headers</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Heading Levels:</Text>
              <BlockStack gap="100">
                <Heading level="1">Heading Level 1</Heading>
                <Heading level="2">Heading Level 2</Heading>
                <Heading level="3">Heading Level 3</Heading>
                <Heading level="4">Heading Level 4</Heading>
              </BlockStack>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Structured content hierarchy and accessibility.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Text</Heading>
            <Text as="p" tone="subdued">
              General-purpose text component for body content and labels.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Body content</List.Item>
                <List.Item>Descriptions</List.Item>
                <List.Item>Labels and captions</List.Item>
                <List.Item>Helper text</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Text Variations:</Text>
              <BlockStack gap="100">
                <Text>Default text for regular content</Text>
                <Text as="p" tone="subdued">Subdued text for secondary information</Text>
                <Text as="p" tone="success">Success text for positive feedback</Text>
                <Text as="p" tone="critical">Critical text for warnings</Text>
              </BlockStack>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Most text content with various tone variations.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Typography Hierarchy Guide</Heading>
            <Text as="p" tone="subdued">
              Follow this hierarchy for consistent text styling.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Page Structure</Text>
                <List>
                  <List.Item>H1 → DisplayText (large)</List.Item>
                  <List.Item>H2 → DisplayText (medium)</List.Item>
                  <List.Item>H3 → Heading (level 1)</List.Item>
                  <List.Item>H4 → Heading (level 2)</List.Item>
                  <List.Item>Body → Text (default)</List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Component Structure</Text>
                <List>
                  <List.Item>Card Header → Heading (level 1)</List.Item>
                  <List.Item>Section Title → Heading (level 2)</List.Item>
                  <List.Item>Label → Text (semibold)</List.Item>
                  <List.Item>Description → Text (default)</List.Item>
                  <List.Item>Helper Text → Text (subdued)</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const DataDisplaySelection: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Data Display Component Selection</Heading>
      <Text as="p">
        Choose the right component for presenting your data effectively.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">DataTable</Heading>
            <Text as="p" tone="subdued">
              Structured tabular data with sorting and filtering capabilities.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Structured data with multiple columns</List.Item>
                <List.Item>Large datasets (10+ items)</List.Item>
                <List.Item>Sortable/filterable data</List.Item>
                <List.Item>Financial or numerical data</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <DataTable
                columnContentTypes={['text', 'text', 'numeric']}
                headings={['Product', 'SKU', 'Price']}
                rows={[
                  ['Laptop', 'LP-001', '$999'],
                  ['Mouse', 'MS-002', '$29'],
                  ['Keyboard', 'KB-003', '$79'],
                ]}
              />
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Complex tabular data that needs structure and organization.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">List</Heading>
            <Text as="p" tone="subdued">
              Simple ordered or unordered collections of items.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Simple item collections</List.Item>
                <List.Item>Sequential information</List.Item>
                <List.Item>Navigation menus</List.Item>
                <List.Item>Features or benefits</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <List>
                <List.Item>Feature: Advanced filtering</List.Item>
                <List.Item>Feature: Real-time updates</List.Item>
                <List.Item>Feature: Export capabilities</List.Item>
              </List>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Simple lists where items don't need complex structure.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">ResourceList</Heading>
            <Text as="p" tone="subdued">
              Rich list items with media, actions, and complex layouts.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Product catalogs</List.Item>
                <List.Item>User directories</List.Item>
                <List.Item>File managers</List.Item>
                <List.Item>Rich item displays</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <Card sectioned>
                <BlockStack gap="200">
                  <InlineStack gap="200">
                    <Avatar initials="JD" />
                    <BlockStack>
                      <Text fontWeight="semibold">John Doe</Text>
                      <Text tone="subdued">john@example.com</Text>
                    </BlockStack>
                  </InlineStack>
                </BlockStack>
              </Card>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Rich content lists where items need media and complex layout.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Data Display Decision Guide</Heading>
            <Text as="p" tone="subdued">
              Choose based on data complexity and user needs.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Data Complexity</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Simple text items</Text>
                  <Text>→</Text>
                  <Text>List Component</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Rich media items</Text>
                  <Text>→</Text>
                  <Text>ResourceList</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Structured tabular data</Text>
                  <Text>→</Text>
                  <Text>DataTable</Text>
                </div>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">User Actions Needed</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Viewing only</Text>
                  <Text>→</Text>
                  <Text>List Component</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Individual item actions</Text>
                  <Text>→</Text>
                  <Text>ResourceList</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Bulk actions & sorting</Text>
                  <Text>→</Text>
                  <Text>DataTable</Text>
                </div>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const FeedbackSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">User Feedback Component Selection</Heading>
      <Text as="p">
        Choose the right feedback component for your message and context.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Banner</Heading>
            <Text as="p" tone="subdued">
              Prominent messages that require user attention.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Important system messages</List.Item>
                <List.Item>Warnings that block actions</List.Item>
                <List.Item>Success confirmations</List.Item>
                <List.Item>Required user notifications</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Examples:</Text>
              <Banner status="success" title="Product saved">
                <p>Your changes have been saved successfully.</p>
              </Banner>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Important messages that users must see and acknowledge.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Toast</Heading>
            <Text as="p" tone="subdued">
              Temporary notifications that appear briefly and auto-dismiss.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Quick success confirmations</List.Item>
                <List.Item>Minor status updates</List.Item>
                <List.Item>Non-critical information</List.Item>
                <List.Item>Background task completions</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Characteristics:</Text>
              <List>
                <List.Item>Auto-dismisses after 5 seconds</List.Item>
                <List.Item>Less intrusive than banners</List.Item>
                <List.Item>Can be dismissed manually</List.Item>
                <List.Item>Stacks with other toasts</List.Item>
              </List>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Brief, non-critical notifications that don't require immediate attention.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">CalloutCard</Heading>
            <Text as="p" tone="subdued">
              Promotional or informational cards with visual appeal.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Feature announcements</List.Item>
                <List.Item>Promotional content</List.Item>
                <List.Item>Tutorial or guidance</List.Item>
                <List.Item>Marketing messages</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <CalloutCard
                title="New feature available"
                illustration="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/illustration-empty-state.svg"
                primaryAction={{
                  content: 'Learn more',
                  onAction: () => {},
                }}
              >
                <p>Discover our new analytics dashboard with real-time insights.</p>
              </CalloutCard>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Engaging, promotional content that should stand out.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Feedback Decision Guide</Heading>
            <Text as="p" tone="subdued">
              Choose based on urgency, importance, and user action requirements.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Message Urgency</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Critical - User must see</Text>
                  <Text>→</Text>
                  <Text>Banner</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Important but not urgent</Text>
                  <Text>→</Text>
                  <Text>Toast</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Promotional/Informational</Text>
                  <Text>→</Text>
                  <Text>CalloutCard</Text>
                </div>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">User Action Required</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Yes - user must respond</Text>
                  <Text>→</Text>
                  <Text>Banner</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>No - just informing</Text>
                  <Text>→</Text>
                  <Text>Toast</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Optional - user might respond</Text>
                  <Text>→</Text>
                  <Text>CalloutCard</Text>
                </div>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const NavigationSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Heading element="h1">Navigation Component Selection</Heading>
      <Text as="p">
        Choose the right navigation component for your application structure.
      </Text>

      <Divider />

      <Grid columns={{ sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Tabs</Heading>
            <Text as="p" tone="subdued">
              Switch between related views within the same context.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Related content sections</List.Item>
                <List.Item>Settings panels</List.Item>
                <List.Item>Data view options</List.Item>
                <List.Item>Multi-step processes</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
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

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Content that belongs together but needs to be separated for organization.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Navigation</Heading>
            <Text as="p" tone="subdued">
              Main navigation component for application-wide menus.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Main application navigation</List.Item>
                <List.Item>Multi-level menus</List.Item>
                <List.Item>Site-wide navigation</List.Item>
                <List.Item>Complex navigation structures</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Features:</Text>
              <List>
                <List.Item>Supports nested navigation</List.Item>
                <List.Item>Mobile-responsive behavior</List.Item>
                <List.Item>Active state management</List.Item>
                <List.Item>Accessibility built-in</List.Item>
              </List>
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Primary application navigation with complex structure.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Breadcrumbs</Heading>
            <Text as="p" tone="subdued">
              Show user's location and provide easy navigation back.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">When to use:</Text>
              <List>
                <List.Item>Deep navigation hierarchies</List.Item>
                <List.Item>E-commerce product categories</List.Item>
                <List.Item>Multi-level admin interfaces</List.Item>
                <List.Item>Content-heavy sites</List.Item>
              </List>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Example:</Text>
              <Breadcrumbs
                breadcrumbs={[
                  {content: 'Home', url: '/'},
                  {content: 'Products', url: '/products'},
                  {content: 'Electronics', url: '/products/electronics'},
                  {content: 'Laptops', url: '/products/electronics/laptops'},
                ]}
              />
            </BlockStack>

            <Card sectioned tone="info">
              <Text size="small">
                <strong>Best for:</strong> Deep hierarchies where users need orientation and quick back navigation.
              </Text>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Heading element="h3">Navigation Decision Guide</Heading>
            <Text as="p" tone="subdued">
              Choose based on navigation scope and user context.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Navigation Scope</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Within current page/context</Text>
                  <Text>→</Text>
                  <Text>Tabs</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Across different pages/sections</Text>
                  <Text>→</Text>
                  <Text>Navigation</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Deep hierarchy navigation</Text>
                  <Text>→</Text>
                  <Text>Breadcrumbs</Text>
                </div>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">User Context</Text>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Same content, different views</Text>
                  <Text>→</Text>
                  <Text>Tabs</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Different sections of app</Text>
                  <Text>→</Text>
                  <Text>Navigation</Text>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}>
                  <Text>Need orientation/back navigation</Text>
                  <Text>→</Text>
                  <Text>Breadcrumbs</Text>
                </div>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};