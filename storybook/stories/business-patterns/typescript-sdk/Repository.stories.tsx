import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, Grid, BlockStack, Text, Badge, Button, DataTable } from '@shopify/polaris';
import React from 'react';

// Mock implementation for demonstration
const MockRepository = {
  findAll: () => [{ id: 1, name: 'Product 1', price: 99.99 }, { id: 2, name: 'Product 2', price: 149.99 }],
  findById: (id: number) => ({ id, name: `Product ${id}`, price: 99.99 }),
  create: (data: any) => ({ id: 3, ...data }),
  update: (id: number, data: any) => ({ id, ...data }),
  delete: (id: number) => ({ id, deleted: true }),
};

const meta = {
  title: 'Cin7 DSL/TypeScript SDK/Repository Pattern',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Repository pattern implementation for TypeScript SDK. Demonstrates data access layer with CRUD operations and entity management.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicRepository: Story = {
  args: {
    columnContentTypes: ['text', 'text', 'numeric', 'text'],
    headings: ['ID', 'Name', 'Price', 'Actions'],
    rows: MockRepository.findAll().map(product => [
      product.id,
      product.name,
      `$${product.price}`,
      <Button size="small" key={product.id}>View</Button>,
    ]),
  },
};

export const RepositoryWithUseCase: Story = {
  render: () => (
    <Page title="Repository Pattern Example">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h3">Product Repository</Text>
              <Text as="p">
                Demonstrates the Repository pattern with TypeScript SDK.
                The repository provides a clean interface for data access operations.
              </Text>

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text']}
                headings={['ID', 'Name', 'Price', 'Actions']}
                rows={MockRepository.findAll().map(product => [
                  product.id,
                  product.name,
                  `$${product.price}`,
                  <Button size="small" key={product.id}>Edit</Button>,
                ])}
              />

              <BlockStack gap="200">
                <Badge tone="success">Repository Pattern</Badge>
                <Text as="p" variant="bodySm">
                  • Clean separation of data access logic<br />
                  • Type-safe CRUD operations<br />
                  • Easy to mock for testing<br />
                  • Supports multiple data sources
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const AsyncRepository: Story = {
  render: () => {
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      setTimeout(() => {
        setProducts(MockRepository.findAll());
        setLoading(false);
      }, 1000);
    }, []);

    if (loading) {
      return <Card sectioned><Text>Loading products...</Text></Card>;
    }

    return (
      <Page title="Async Repository Example">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Async Product Repository</Text>
                <Text as="p">
                  Demonstrates async data loading with Repository pattern.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'text']}
                  headings={['ID', 'Name', 'Price', 'Actions']}
                  rows={products.map(product => [
                    product.id,
                    product.name,
                    `$${product.price}`,
                    <Button size="small" key={product.id}>View</Button>,
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};