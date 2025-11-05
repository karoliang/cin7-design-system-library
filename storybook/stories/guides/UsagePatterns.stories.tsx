import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  TextField,
  Select,
  Checkbox,
  Page,
  Layout,
  Grid,
  BlockStack,
  InlineStack,
  Tabs,
  Modal,
  DataTable,
  Pagination,
  Badge,
  Banner,
  Spinner,
  SkeletonPage,
  SkeletonBodyText,
  FormLayout,
  Text,
  Heading,
  DisplayText,
  Icon,
  Form,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  AlertIcon,
  TickIcon,
  SearchIcon,
  FilterIcon,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Cin7 DSL Guides/Usage Patterns',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Common usage patterns and best practices for building user interfaces with Cin7 DSL components.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <DisplayText size="large" element="h1">
        Common Usage Patterns
      </DisplayText>
      <Text as="p" tone="subdued">
        Learn how to combine Cin7 DSL components to build effective user interfaces.
      </Text>

      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="400">
        <Card>
          <BlockStack gap="200">
            <Icon source={EditIcon} size="large" />
            <Heading>Form Patterns</Heading>
            <Text>Complete form layouts with validation</Text>
            <Badge tone="info">6 Patterns</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={ViewIcon} size="large" />
            <Heading>Dashboard Patterns</Heading>
            <Text>Data visualization and metrics</Text>
            <Badge tone="info">4 Patterns</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={FilterIcon} size="large" />
            <Heading>Table Patterns</Heading>
            <Text>Data tables with sorting, filtering</Text>
            <Badge tone="info">5 Patterns</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={AlertIcon} size="large" />
            <Heading>Modal Patterns</Heading>
            <Text>Dialogs, confirmations, wizards</Text>
            <Badge tone="info">4 Patterns</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={SearchIcon} size="large" />
            <Heading>Navigation Patterns</Heading>
            <Text>Tabs, breadcrumbs, menus</Text>
            <Badge tone="info">3 Patterns</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={Spinner} size="large" />
            <Heading>Loading Patterns</Heading>
            <Text>Skeleton states and progress</Text>
            <Badge tone="info">3 Patterns</Badge>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const FormPatterns: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      category: '',
      notifications: false,
    });

    const [errors, setErrors] = useState<{[key: string]: string}>({});

    const validateForm = useCallback(() => {
      const newErrors: {[key: string]: string} = {};
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.category) newErrors.category = 'Category is required';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [formData]);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Page
          title="Create New Product"
          primaryAction={{
            content: 'Save Product',
            onAction: validateForm,
          }}
          breadcrumbs={[{content: 'Products', url: '#'}]}
        >
          <Layout>
            <Layout.Section>
              <Card>
                <BlockStack gap="400">
                  <Heading element="h2">Product Information</Heading>

                  <FormLayout>
                    <TextField
                      label="Product Name"
                      value={formData.name}
                      onChange={(value) => setFormData(prev => ({...prev, name: value}))}
                      placeholder="Enter product name"
                      error={errors.name}
                      requiredIndicator
                    />

                    <TextField
                      label="Email Contact"
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData(prev => ({...prev, email: value}))}
                      placeholder="contact@example.com"
                      error={errors.email}
                      requiredIndicator
                    />

                    <Select
                      label="Category"
                      options={[
                        {label: 'Select a category', value: ''},
                        {label: 'Electronics', value: 'electronics'},
                        {label: 'Clothing', value: 'clothing'},
                        {label: 'Food', value: 'food'},
                      ]}
                      value={formData.category}
                      onChange={(value) => setFormData(prev => ({...prev, category: value}))}
                      error={errors.category}
                      requiredIndicator
                    />

                    <Checkbox
                      label="Email notifications"
                      checked={formData.notifications}
                      onChange={(value) => setFormData(prev => ({...prev, notifications: value}))}
                      helpText="Receive order updates via email"
                    />
                  </FormLayout>

                  <InlineStack gap="200">
                    <Button>Save Product</Button>
                    <Button variant="secondary">Cancel</Button>
                  </InlineStack>
                </BlockStack>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              <Card sectioned>
                <BlockStack gap="400">
                  <Heading element="h3">Form Guidelines</Heading>
                  <Text as="p">
                    Complete all required fields marked with an asterisk (*).
                  </Text>
                  <Banner status="info">
                    <p>Product information will be available to customers immediately after saving.</p>
                  </Banner>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>
        </Page>
      </div>
    );
  },
};

export const DashboardPatterns: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Page
        title="Dashboard"
        subtitle="Business overview and key metrics"
        primaryAction={{
          content: 'Export Report',
          icon: ExportIcon,
        }}
      >
        <Layout>
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Revenue</Text>
                  <DisplayText size="medium">$45,231</DisplayText>
                  <Text tone="success">↑ 12% from last month</Text>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Orders</Text>
                  <DisplayText size="medium">1,248</DisplayText>
                  <Text tone="success">↑ 8% from last month</Text>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Active Products</Text>
                  <DisplayText size="medium">523</DisplayText>
                  <Text tone="subdued">→ No change</Text>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Conversion Rate</Text>
                  <DisplayText size="medium">3.2%</DisplayText>
                  <Text tone="critical">↓ 2% from last month</Text>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Heading element="h2">Recent Orders</Heading>
                  <Button variant="plain">View all</Button>
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
                  headings={['Order', 'Customer', 'Amount', 'Status', 'Date']}
                  rows={[
                    ['#10234', 'John Doe', '$234.50', 'Fulfilled', '2025-01-10'],
                    ['#10233', 'Jane Smith', '$89.99', 'Processing', '2025-01-10'],
                    ['#10232', 'Bob Johnson', '$456.78', 'Pending', '2025-01-09'],
                    ['#10231', 'Alice Brown', '$123.45', 'Fulfilled', '2025-01-09'],
                  ]}
                />

                <Pagination
                  label="Page 1 of 10"
                  hasPrevious={false}
                  hasNext
                  onPrevious={() => {}}
                  onNext={() => {}}
                />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  ),
};

export const TablePatterns: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const rows = [
      {
        id: '1',
        name: 'Wireless Headphones',
        sku: 'WH-001',
        price: '$89.99',
        stock: 45,
        status: <Badge tone="success">In Stock</Badge>,
      },
      {
        id: '2',
        name: 'USB-C Cable',
        sku: 'UC-002',
        price: '$12.99',
        stock: 120,
        status: <Badge tone="success">In Stock</Badge>,
      },
      {
        id: '3',
        name: 'Laptop Stand',
        sku: 'LS-003',
        price: '$45.00',
        stock: 0,
        status: <Badge tone="critical">Out of Stock</Badge>,
      },
    ];

    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <Page
          title="Products"
          primaryAction={{
            content: 'Add Product',
            icon: PlusIcon,
          }}
        >
          <Card>
            <BlockStack gap="400">
              <div style={{padding: '16px'}}>
                <InlineStack gap="200" align="space-between">
                  <div style={{flex: 1}}>
                    <TextField
                      placeholder="Search products..."
                      prefix={<Icon source={SearchIcon} />}
                      clearButton
                    />
                  </div>
                  <InlineStack gap="200">
                    <Button icon={FilterIcon}>Filters</Button>
                    <Button icon={ExportIcon}>Export</Button>
                  </InlineStack>
                </InlineStack>
              </div>

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
                headings={['Product Name', 'SKU', 'Price', 'Stock', 'Status']}
                rows={rows.map(row => [
                  row.name,
                  row.sku,
                  row.price,
                  row.stock,
                  row.status
                ])}
              />

              <div style={{padding: '16px'}}>
                <InlineStack align="space-between">
                  <Text as="p" tone="subdued">
                    {rows.length} products
                  </Text>
                  <Pagination
                    label="Page 1 of 50"
                    hasPrevious={false}
                    hasNext
                    onPrevious={() => {}}
                    onNext={() => {}}
                  />
                </InlineStack>
              </div>
            </BlockStack>
          </Card>
        </Page>
      </div>
    );
  },
};

export const ModalPatterns: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <Page title="Modal Pattern Examples">
          <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="400">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Confirmation Modal</Heading>
                <Text as="p">
                  For critical actions that require user confirmation.
                </Text>
                <Button
                  variant="critical"
                  onClick={() => setShowModal(true)}
                >
                  Show Confirmation
                </Button>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Form Modal</Heading>
                <Text as="p">
                  For quick data entry without navigation.
                </Text>
                <Button onClick={() => setShowModal(true)}>
                  Show Form Modal
                </Button>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Wizard Modal</Heading>
                <Text as="p">
                  For multi-step processes.
                </Text>
                <Button onClick={() => setShowModal(true)}>
                  Start Wizard
                </Button>
              </BlockStack>
            </Card>
          </Grid>

          <Modal
            open={showModal}
            onClose={() => setShowModal(false)}
            title="Example Modal"
            primaryAction={{
              content: 'Confirm',
              onAction: () => setShowModal(false),
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: () => setShowModal(false),
              },
            ]}
          >
            <Modal.Section>
              <Text as="p">
                This is an example modal showing different modal patterns for user interactions.
              </Text>
            </Modal.Section>
          </Modal>
        </Page>
      </div>
    );
  },
};

export const LoadingPatterns: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Page title="Loading State Patterns">
        <Grid columns={{ sm: 1, md: 2 }} gap="400">
          <Card sectioned>
            <BlockStack gap="400">
              <Heading element="h3">Page Loading</Heading>
              <Text as="p">
                Skeleton pages provide structure while data loads.
              </Text>
              <Button>Show Skeleton Page</Button>
            </BlockStack>
          </Card>

          <Card sectioned>
            <BlockStack gap="400">
              <Heading element="h3">Progress Loading</Heading>
              <Text as="p">
                Progress bars for operations with known duration.
              </Text>
              <Button>Start Progress</Button>
            </BlockStack>
          </Card>

          <Card sectioned>
            <BlockStack gap="400">
              <Heading element="h3">Inline Loading</Heading>
              <Text as="p">
                Spinners for quick operations.
              </Text>
              <InlineStack gap="200" alignment="center">
                <Spinner size="small" />
                <Text>Loading data...</Text>
              </InlineStack>
            </BlockStack>
          </Card>

          <Card sectioned>
            <BlockStack gap="400">
              <Heading element="h3">Button Loading</Heading>
              <Text as="p">
                Loading states on buttons prevent duplicate actions.
              </Text>
              <InlineStack gap="200">
                <Button loading>Loading Action</Button>
                <Button loading variant="secondary">Secondary Loading</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Grid>
      </Page>
    </div>
  ),
};