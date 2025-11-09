import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  TextField,
  Select,
  Card as PolarisCard,
  Page,
  Layout,
  BlockStack,
  InlineStack,
  Tabs,
  Modal,
  DataTable,
  Badge,
  Banner,
  Text,
  Icon,
  FormLayout,
  Grid,
  Divider,
  List,
  Link,
  Avatar,
  Checkbox,
  RadioButton,
  Popover,
  ActionList,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  SearchIcon,
  FilterIcon,
  AlertCircleIcon,
  CheckIcon,
  InfoIcon,
  ExternalIcon,
  CodeIcon,
  PlayIcon,
  MobileIcon,
  DesktopIcon,
  EyeglassesIcon,
  MagicIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Cin7 DSL/Introduction/Getting Started',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive guide to getting started with Cin7 DSL. Learn the basics, understand component composition, and follow best practices for building effective user interfaces.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    topic: {
      control: 'select',
      options: ['basics', 'composition', 'styling', 'accessibility', 'performance', 'mistakes'],
      description: 'Select a topic to learn about',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">
        Getting Started with Cin7 DSL
      </Text>
      <Text as="p" tone="subdued">
        Learn how to build beautiful, accessible, and performant user interfaces with the Cin7 Design System Library.
      </Text>

      <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} gap="400">
        <Card>
          <BlockStack gap="200">
            <Icon source={CodeIcon} size="large" />
            <Text variant="headingMd" as="h3">Basic Component Usage</Text>
            <Text>Learn the fundamentals of using Cin7 DSL components</Text>
            <Badge tone="info">Essential</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={PlusIcon} size="large" />
            <Text variant="headingMd" as="h3">Component Composition</Text>
            <Text>Combine components to build complex interfaces</Text>
            <Badge tone="info">Important</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={EditIcon} size="large" />
            <Text variant="headingMd" as="h3">Styling and Theming</Text>
            <Text>Customize components to match your brand</Text>
            <Badge tone="info">Advanced</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={EyeglassesIcon} size="large" />
            <Text variant="headingMd" as="h3">Accessibility Guidelines</Text>
            <Text>Build inclusive interfaces for all users</Text>
            <Badge tone="success">Critical</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={MagicIcon} size="large" />
            <Text variant="headingMd" as="h3">Performance Tips</Text>
            <Text>Optimize your applications for speed</Text>
            <Badge tone="attention">Recommended</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={AlertCircleIcon} size="large" />
            <Text variant="headingMd" as="h3">Common Mistakes</Text>
            <Text>What to avoid when using the DSL</Text>
            <Badge tone="warning">Helpful</Badge>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const BasicComponentUsage: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">Basic Component Usage</Text>
      <Text as="p">
        Learn the fundamentals of using Cin7 DSL components with simple, practical examples.
      </Text>

      <Divider />

      <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">1. Importing Components</Text>
            <Text as="p" tone="subdued">
              Start by importing the components you need from the Polaris package.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Basic Import</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`import { Button, Card, Text } from '@shopify/polaris';`}
                </pre>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Multiple Imports</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`import {
  Button,
  TextField,
  Card,
  Layout,
  BlockStack,
} from '@shopify/polaris';`}
                </pre>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">2. Basic Button Usage</Text>
            <Text as="p" tone="subdued">
              Buttons are the most common interactive element.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Simple Button</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`<Button>Click me</Button>`}
                </pre>
                <Button>Click me</Button>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Button with Variant</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="critical">Delete</Button>`}
                </pre>
                <InlineStack gap="200">
                  <Button variant="primary">Save</Button>
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="critical">Delete</Button>
                </InlineStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">3. Text Input Components</Text>
            <Text as="p" tone="subdued">
              Collect user input with text fields and select components.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">TextField Example</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`<TextField
  label="Product Name"
  value={name}
  onChange={setName}
  placeholder="Enter product name"
/>`}
                </pre>
                <TextField
                  label="Product Name"
                  placeholder="Enter product name"
                />
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Select Example</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`<Select
  label="Category"
  options={[
    {label: 'Electronics', value: 'electronics'},
    {label: 'Clothing', value: 'clothing'}
  ]}
  value={category}
  onChange={setCategory}
/>`}
                </pre>
                <Select
                  label="Category"
                  options={[
                    {label: 'Select category', value: ''},
                    {label: 'Electronics', value: 'electronics'},
                    {label: 'Clothing', value: 'clothing'}
                  ]}
                />
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">4. Layout Components</Text>
            <Text as="p" tone="subdued">
              Structure your content with layout components.
            </Text>

            <Card sectioned>
              <BlockStack gap="200">
                <Text fontWeight="semibold">Card Container</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`<Card>
  <BlockStack gap="200">
    <Text variant="headingMd" as="h3">Card Title</Text>
    <Text>Card content goes here</Text>
    <Button>Action</Button>
  </BlockStack>
</Card>`}
                </pre>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="headingLg" as="h4">Card Title</Text>
                    <Text>Card content goes here</Text>
                    <Button>Action</Button>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const ComponentComposition: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">Component Composition</Text>
      <Text as="p">
        Learn how to combine components to build complex, reusable interfaces.
      </Text>

      <Divider />

      <BlockStack gap="400">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Building a Product Card</Text>
            <Text as="p" tone="subdued">
              Combine multiple components to create a reusable product card.
            </Text>

            <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Code Example</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto',
                  marginTop: '12px'
                }}>
{`const ProductCard = ({ product }) => (
  <Card>
    <BlockStack gap="300">
      <InlineStack align="space-between">
        <Text variant="headingMd" as="h3">{product.name}</Text>
        <Badge tone="success">In Stock</Badge>
      </InlineStack>

      <Text>{product.description}</Text>
      <Text fontWeight="semibold">{product.price}</Text>

      <InlineStack gap="200">
        <Button variant="primary">Add to Cart</Button>
        <Button variant="plain">View Details</Button>
      </InlineStack>
    </BlockStack>
  </Card>
);`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">Result</Text>
                <div style={{marginTop: '12px'}}>
                  <Card>
                    <BlockStack gap="300">
                      <InlineStack align="space-between">
                        <Text variant="headingLg" as="h4">Wireless Headphones</Text>
                        <Badge tone="success">In Stock</Badge>
                      </InlineStack>

                      <Text>Premium noise-canceling wireless headphones with 30-hour battery life.</Text>
                      <Text fontWeight="semibold">$89.99</Text>

                      <InlineStack gap="200">
                        <Button variant="primary">Add to Cart</Button>
                        <Button variant="plain">View Details</Button>
                      </InlineStack>
                    </BlockStack>
                  </Card>
                </div>
              </div>
            </Grid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Building a Form Section</Text>
            <Text as="p" tone="subdued">
              Combine form components with proper layout structure.
            </Text>

            <pre style={{
              background: '#f8f9fa',
              padding: '12px',
              borderRadius: '4px',
              fontSize: "14px",
              overflow: 'auto',
              maxHeight: '300px'
            }}>
{`const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    inStock: false
  });

  return (
    <Card>
      <BlockStack gap="400">
        <Text variant="headingMd" as="h3">Product Information</Text>

        <FormLayout>
          <TextField
            label="Product Name"
            value={formData.name}
            onChange={(value) => setFormData({...formData, name: value})}
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(value) => setFormData({...formData, category: value})}
          />

          <TextField
            label="Price"
            type="number"
            prefix="$"
            value={formData.price}
            onChange={(value) => setFormData({...formData, price: value})}
          />

          <Checkbox
            label="In Stock"
            checked={formData.inStock}
            onChange={(value) => setFormData({...formData, inStock: value})}
          />
        </FormLayout>

        <InlineStack gap="200">
          <Button variant="primary">Save Product</Button>
          <Button variant="secondary">Cancel</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};`}
            </pre>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Building a Data Table</Text>
            <Text as="p" tone="subdued">
              Combine DataTable with pagination and actions.
            </Text>

            <Card sectioned>
              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text']}
                headings={['Product', 'SKU', 'Price', 'Status']}
                rows={[
                  ['Wireless Headphones', 'WH-001', '$89.99', 'In Stock'],
                  ['USB-C Cable', 'UC-002', '$12.99', 'In Stock'],
                  ['Laptop Stand', 'LS-003', '$45.00', 'Out of Stock'],
                ]}
              />
            </Card>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const StylingAndTheming: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">Styling and Theming</Text>
      <Text as="p">
        Learn how to customize components and apply consistent styling across your application.
      </Text>

      <Divider />

      <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Component Sizing</Text>
            <Text as="p" tone="subdued">
              Control component sizes using built-in props.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Button Sizes</Text>
              <InlineStack gap="200">
                <Button size="micro">Micro</Button>
                <Button size="slim">Slim</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Icon Sizes</Text>
              <InlineStack gap="200" alignment="center">
                <Icon source={SearchIcon} size="small" />
                <Icon source={SearchIcon} size="medium" />
                <Icon source={SearchIcon} size="large" />
              </InlineStack>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Color and Tone</Text>
            <Text as="p" tone="subdued">
              Use tone variations for semantic meaning.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Badge Tones</Text>
              <InlineStack gap="200">
                <Badge>Default</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="attention">Warning</Badge>
                <Badge tone="critical">Critical</Badge>
                <Badge tone="info">Info</Badge>
                <Badge tone="new">New</Badge>
              </InlineStack>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Text Tones</Text>
              <BlockStack gap="100">
                <Text>Default text</Text>
                <Text tone="subdued">Subdued text</Text>
                <Text tone="success">Success message</Text>
                <Text tone="warning">Warning message</Text>
                <Text tone="critical">Error message</Text>
              </BlockStack>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Layout Spacing</Text>
            <Text as="p" tone="subdued">
              Use consistent spacing with Stack components.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">BlockStack Gaps</Text>
              <Card sectioned>
                <BlockStack gap="100">
                  <Text>Tight spacing (100)</Text>
                  <Text>Tight spacing (100)</Text>
                </BlockStack>
              </Card>
              <Card sectioned>
                <BlockStack gap="400">
                  <Text>Loose spacing (400)</Text>
                  <Text>Loose spacing (400)</Text>
                </BlockStack>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Custom Styling</Text>
            <Text as="p" tone="subdued">
              Apply custom styles using the style prop.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Custom Card Styling</Text>
              <Card sectioned style={{
                border: '2px solid #007ace',
                borderRadius: '8px',
                background: 'linear-gradient(45deg, #f0f9ff, #e0f2fe)'
              }}>
                <Text>This card has custom styling applied via the style prop.</Text>
              </Card>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Custom Button Styling</Text>
              <Button style={{
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                color: 'white',
                fontWeight: 'bold'
              }}>
                Custom Styled Button
              </Button>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Text variant="headingXl" as="h3">🎨 Best Practices</Text>
          <List type="number">
            <List.Item>Use built-in spacing tokens instead of arbitrary values</List.Item>
            <List.Item>Leverage tone variations for semantic meaning</List.Item>
            <List.Item>Keep custom styling minimal and consistent</List.Item>
            <List.Item>Use semantic color names rather than hex codes</List.Item>
            <List.Item>Test your customizations with different themes</List.Item>
          </List>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const AccessibilityGuidelines: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">Accessibility Guidelines</Text>
      <Text as="p">
        Build inclusive interfaces that work for all users, including those with disabilities.
      </Text>

      <Divider />

      <BlockStack gap="400">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Semantic HTML</Text>
            <Text as="p" tone="subdued">
              Use proper HTML elements and headings for screen readers.
            </Text>

            <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">✅ Good Practice</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto',
                  border: '1px solid #86efac',
                  marginTop: '8px'
                }}>
{`<Text variant="heading3xl" as="h1">
  Page Title
</Text>

<Text variant="heading2xl" as="h2">
  Section Title
</Text>

<Text>
  Regular paragraph content
</Text>`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">❌ Avoid This</Text>
                <pre style={{
                  background: '#fef2f2',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto',
                  border: '1px solid #fca5a5',
                  marginTop: '8px'
                }}>
{`<Text size="large">
  Using large text instead of proper heading
</Text>

<div>
  Content without semantic structure
</div>`}
                </pre>
              </div>
            </Grid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Form Accessibility</Text>
            <Text as="p" tone="subdued">
              Ensure forms are accessible with proper labels and descriptions.
            </Text>

            <FormLayout>
              <TextField
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                requiredIndicator
                helpText="We'll never share your email with anyone else."
              />

              <Select
                label="Country"
                options={[
                  {label: 'Select your country', value: ''},
                  {label: 'United States', value: 'us'},
                  {label: 'Canada', value: 'ca'},
                ]}
                requiredIndicator
              />

              <Checkbox
                label="I agree to the terms and conditions"
                helpText="Please read our terms before proceeding."
              />
            </FormLayout>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Button Accessibility</Text>
            <Text as="p" tone="subdued">
              Provide clear button labels and sufficient click targets.
            </Text>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Accessible Buttons</Text>
              <InlineStack gap="200">
                <Button icon={EditIcon}>Edit Profile</Button>
                <Button icon={DeleteIcon} tone="critical">Delete Account</Button>
                <Button icon={ViewIcon}>View Details</Button>
              </InlineStack>
              <Text as="p" tone="subdued">
                Each button has both an icon and descriptive text for clarity.
              </Text>
            </BlockStack>

            <BlockStack gap="200">
              <Text fontWeight="semibold">Icon-Only Buttons</Text>
              <InlineStack gap="200">
                <Tooltip content="Edit item">
                  <Button icon={EditIcon} />
                </Tooltip>
                <Tooltip content="Delete item">
                  <Button icon={DeleteIcon} tone="critical" />
                </Tooltip>
                <Tooltip content="View item">
                  <Button icon={ViewIcon} />
                </Tooltip>
              </InlineStack>
              <Text as="p" tone="subdued">
                Icon-only buttons should always have tooltips for screen readers.
              </Text>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">🎯 Key Accessibility Requirements</Text>
            <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Keyboard Navigation</Text>
                <List>
                  <List.Item>All interactive elements must be keyboard accessible</List.Item>
                  <List.Item>Visible focus indicators for keyboard users</List.Item>
                  <List.Item>Logical tab order</List.Item>
                </List>
              </div>

              <div>
                <Text fontWeight="semibold">Screen Reader Support</Text>
                <List>
                  <List.Item>ARIA labels and descriptions</List.Item>
                  <List.Item>Announce important state changes</List.Item>
                  <List.Item>Semantic HTML structure</List.Item>
                </List>
              </div>

              <div>
                <Text fontWeight="semibold">Visual Accessibility</Text>
                <List>
                  <List.Item>Sufficient color contrast (4.5:1 minimum)</List.Item>
                  <List.Item>Don't rely on color alone</List.Item>
                  <List.Item>Resizable text up to 200%</List.Item>
                </List>
              </div>

              <div>
                <Text fontWeight="semibold">Motion and Animation</Text>
                <List>
                  <List.Item>Respect prefers-reduced-motion</List.Item>
                  <List.Item>Provide controls for auto-playing content</List.Item>
                  <List.Item>Avoid flashing content</List.Item>
                </List>
              </div>
            </Grid>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const PerformanceTips: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">Performance Tips</Text>
      <Text as="p">
        Optimize your Cin7 DSL applications for better performance and user experience.
      </Text>

      <Divider />

      <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Efficient Rendering</Text>
            <Text as="p" tone="subdued">
              Minimize unnecessary re-renders and optimize component updates.
            </Text>

            <BlockStack gap="300">
              <Banner status="info" title="Lazy Loading">
                <p>Load heavy components only when needed using dynamic imports.</p>
              </Banner>

              <Card sectioned>
                <Text fontWeight="semibold">Example: Lazy Component Loading</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`// Instead of importing normally
import HeavyComponent from './HeavyComponent';

// Use dynamic import for better performance
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Use with Suspense boundary
<Suspense fallback={<Spinner />}>
  <HeavyComponent />
</Suspense>`}
                </pre>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Data Management</Text>
            <Text as="p" tone="subdued">
              Optimize data fetching and state management patterns.
            </Text>

            <BlockStack gap="300">
              <Text fontWeight="semibold">Pagination for Large Datasets</Text>
              <Text as="p" tone="subdued">
                Use pagination instead of loading thousands of items at once.
              </Text>

              <div style={{padding: '16px', background: '#f8f9fa', borderRadius: '4px'}}>
                <Text fontWeight="semibold">✅ Recommended:</Text>
                <List>
                  <List.Item>Paginate tables with more than 100 items</List.Item>
                  <List.Item>Use virtual scrolling for long lists</List.Item>
                  <List.Item>Implement search and filtering</List.Item>
                </List>
              </div>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Component Optimization</Text>
            <Text as="p" tone="subdued">
              Write efficient components that minimize render cycles.
            </Text>

            <BlockStack gap="300">
              <Text fontWeight="semibold">Memoization</Text>
              <pre style={{
                background: '#f8f9fa',
                padding: '12px',
                borderRadius: '4px',
                fontSize: "14px",
                overflow: 'auto'
              }}>
{`// Use React.memo for expensive components
const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic here
});

// Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return expensiveCalculation(rawData);
}, [rawData]);

// Use useCallback for stable function references
const handleClick = useCallback(() => {
  // Handle click logic
}, [dependency]);`}
              </pre>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Bundle Size Optimization</Text>
            <Text as="p" tone="subdued">
              Reduce bundle size for faster load times.
            </Text>

            <BlockStack gap="300">
              <Banner status="warning" title="Tree Shaking">
                <p>Import only the components you actually use to reduce bundle size.</p>
              </Banner>

              <Card sectioned>
                <Text fontWeight="semibold">Efficient Imports</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto'
                }}>
{`// ✅ Good: Import specific components
import { Button, Card, TextField } from '@shopify/polaris';

// ❌ Avoid: Import entire library
import * as Polaris from '@shopify/polaris';`}
                </pre>
              </Card>
            </BlockStack>
          </BlockStack>
        </Card>
      </Grid>

      <Card>
        <BlockStack gap="400">
          <Text variant="headingXl" as="h3">⚡ Performance Checklist</Text>
          <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
            <div>
              <Text fontWeight="semibold">Loading Performance</Text>
              <List>
                <List.Item>✅ Implement lazy loading</List.Item>
                <List.Item>✅ Use code splitting</List.Item>
                <List.Item>✅ Optimize bundle size</List.Item>
                <List.Item>✅ Use skeleton states</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Runtime Performance</Text>
              <List>
                <List.Item>✅ Minimize re-renders</List.Item>
                <List.Item>✅ Use memoization</List.Item>
                <List.Item>✅ Implement pagination</List.Item>
                <List.Item>✅ Optimize data fetching</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">User Experience</Text>
              <List>
                <List.Item>✅ Provide loading states</List.Item>
                <List.Item>✅ Show progress indicators</List.Item>
                <List.Item>✅ Handle errors gracefully</List.Item>
                <List.Item>✅ Optimize for mobile</List.Item>
              </List>
            </div>
            <div>
              <Text fontWeight="semibold">Monitoring</Text>
              <List>
                <List.Item>✅ Track Core Web Vitals</List.Item>
                <List.Item>✅ Monitor bundle size</List.Item>
                <List.Item>✅ Profile performance</List.Item>
                <List.Item>✅ Test on real devices</List.Item>
              </List>
            </div>
          </Grid>
        </BlockStack>
      </Card>
    </div>
  ),
};

export const CommonMistakes: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Text variant="heading3xl" as="h1">Common Mistakes to Avoid</Text>
      <Text as="p">
        Learn from common pitfalls and avoid these mistakes when using Cin7 DSL.
      </Text>

      <Divider />

      <BlockStack gap="400">
        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Layout Mistakes</Text>
            <Text as="p" tone="subdued">
              Avoid these common layout and spacing errors.
            </Text>

            <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">❌ Inconsistent Spacing</Text>
                <div style={{
                  background: '#fef2f2',
                  padding: '16px',
                  borderRadius: '4px',
                  border: '1px solid #fca5a5'
                }}>
                  <div style={{marginBottom: '8px'}}>
                    <Text>Item 1</Text>
                  </div>
                  <div style={{marginBottom: '12px'}}>
                    <Text>Item 2</Text>
                  </div>
                  <div style={{marginBottom: '5px'}}>
                    <Text>Item 3</Text>
                  </div>
                </div>
                <Text as="p" tone="subdued" size="small">
                  Using arbitrary margin values leads to inconsistency.
                </Text>
              </div>

              <div>
                <Text fontWeight="semibold">✅ Consistent Spacing</Text>
                <div style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '4px',
                  border: '1px solid #86efac'
                }}>
                  <BlockStack gap="200">
                    <Text>Item 1</Text>
                    <Text>Item 2</Text>
                    <Text>Item 3</Text>
                  </BlockStack>
                </div>
                <Text as="p" tone="subdued" size="small">
                  Use Stack components with consistent gap tokens.
                </Text>
              </div>
            </Grid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Component Usage Mistakes</Text>
            <Text as="p" tone="subdued">
              Avoid improper component usage and anti-patterns.
            </Text>

            <BlockStack gap="300">
              <Banner status="warning" title="Overusing Cards">
                <p>Don't wrap every element in a Card. Cards should group related content, not be used for simple layout.</p>
              </Banner>

              <Banner status="warning" title="Missing Labels">
                <p>Always provide labels for form inputs and buttons. Never rely on placeholder text as the only label.</p>
              </Banner>

              <Banner status="warning" title="Hard-coded Text">
                <p>Avoid hard-coding text that should be translatable. Use proper i18n patterns for user-facing text.</p>
              </Banner>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Performance Mistakes</Text>
            <Text as="p" tone="subdued">
              Avoid these performance anti-patterns.
            </Text>

            <Grid columns={{ xs: 1, sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">❌ Rendering Large Lists</Text>
                <pre style={{
                  background: '#fef2f2',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto',
                  border: '1px solid #fca5a5'
                }}>
{`// Bad: Rendering thousands of items
{largeArray.map(item => (
  <Card key={item.id}>
    <Text>{item.name}</Text>
  </Card>
))}`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">✅ Using Pagination</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '12px',
                  borderRadius: '4px',
                  fontSize: "14px",
                  overflow: 'auto',
                  border: '1px solid #86efac'
                }}>
{`// Good: Paginate large datasets
<DataTable
  rows={paginatedData}
  pagination={{
    hasNext,
    hasPrevious,
    onNext,
    onPrevious,
  }}
/>`}
                </pre>
              </div>
            </Grid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">Accessibility Mistakes</Text>
            <Text as="p" tone="subdued">
              Common accessibility issues to avoid.
            </Text>

            <BlockStack gap="300">
              <Banner status="critical" title="Missing Alt Text">
                <p>Always provide meaningful alt text for images and icons. Don't use decorative icons without context.</p>
              </Banner>

              <Banner status="critical" title="Poor Color Contrast">
                <p>Don't rely on color alone to convey information. Ensure text has sufficient contrast (4.5:1 minimum).</p>
              </Banner>

              <Banner status="critical" title="Keyboard Traps">
                <p>Ensure users can navigate to and from all interactive elements using keyboard only.</p>
              </Banner>
            </BlockStack>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h3">🚫 What to Avoid Summary</Text>
            <List type="number">
              <List.Item><strong>Don't</strong> use arbitrary spacing values - use Stack components</List.Item>
              <List.Item><strong>Don't</strong> overuse Cards - they should group related content</List.Item>
              <List.Item><strong>Don't</strong> skip labels on form inputs - always provide clear labels</List.Item>
              <List.Item><strong>Don't</strong> render thousands of items - use pagination or virtual scrolling</List.Item>
              <List.Item><strong>Don't</strong> rely on color alone - use text, icons, and patterns</List.Item>
              <List.Item><strong>Don't</strong> forget accessibility - test with keyboard and screen readers</List.Item>
              <List.Item><strong>Don't</strong> hard-code user-facing text - use i18n patterns</List.Item>
              <List.Item><strong>Don't</strong> ignore mobile users - test on different screen sizes</List.Item>
            </List>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};