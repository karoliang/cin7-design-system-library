import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, Grid, BlockStack, Text, Badge, Button, FormLayout, TextField, Select } from '@shopify/polaris';
import React from 'react';

// Mock implementation for demonstration
const MockUseCase = {
  execute: async (data: any) => {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true, id: Date.now(), ...data };
  },
  validate: (data: any) => {
    return data.name && data.email;
  },
};

const meta = {
  title: 'Cin7 DSL/TypeScript SDK/Use Case Pattern',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Use Case pattern implementation for TypeScript SDK. Demonstrates business logic encapsulation and application workflow management.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicUseCase: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({ name: '', email: '' });
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async () => {
      if (MockUseCase.validate(formData)) {
        setLoading(true);
        try {
          const response = await MockUseCase.execute(formData);
          setResult(response);
        } catch (error) {
          setResult({ success: false, error: error.message });
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <Card sectioned>
        <BlockStack gap="400">
          <Text variant="headingLg" as="h3">Create User Use Case</Text>
          <Text as="p">
            Demonstrates the Use Case pattern for business logic encapsulation.
          </Text>

          <FormLayout>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="Enter user name"
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="Enter email address"
              type="email"
            />
            <Button
              onClick={handleSubmit}
              disabled={loading}
              loading={loading}
            >
              Create User
            </Button>
          </FormLayout>

          {result && (
            <Card sectioned>
              <BlockStack gap="200">
                <Text variant="headingMd" as="h4">Result</Text>
                <Badge tone={result.success ? 'success' : 'critical'}>
                  {result.success ? 'Success' : 'Error'}
                </Badge>
                <Text>{JSON.stringify(result, null, 2)}</Text>
              </BlockStack>
            </Card>
          )}
        </BlockStack>
      </Card>
    );
  },
};

export const ComplexUseCase: Story = {
  render: () => (
    <Page title="Complex Use Case Example">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h3">Order Processing Use Case</Text>
              <Text as="p">
                Demonstrates complex business logic with the Use Case pattern.
              </Text>

              <FormLayout>
                <TextField
                  label="Product"
                  placeholder="Enter product name"
                />
                <Select
                  label="Quantity"
                  options={[
                    { label: '1', value: '1' },
                    { label: '5', value: '5' },
                    { label: '10', value: '10' },
                    { label: '25', value: '25' },
                  ]}
                />
                <TextField
                  label="Customer ID"
                  placeholder="Enter customer ID"
                />
                <Button>Process Order</Button>
              </FormLayout>

              <BlockStack gap="200">
                <Badge tone="info">Use Case Pattern</Badge>
                <Text as="p" variant="bodySm">
                  • Encapsulates business rules<br />
                  • Validates input data<br />
                  • Coordinates multiple repositories<br />
                  • Handles complex workflows
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const UseCaseWithEventBus: Story = {
  render: () => {
    const [events, setEvents] = React.useState([]);
    const [processing, setProcessing] = React.useState(false);

    const handleProcessOrder = async () => {
      setProcessing(true);

      // Mock event emission
      const mockEvents = [
        { type: 'ORDER_STARTED', timestamp: Date.now() },
        { type: 'INVENTORY_CHECKED', timestamp: Date.now() + 100 },
        { type: 'PAYMENT_PROCESSED', timestamp: Date.now() + 200 },
        { type: 'ORDER_COMPLETED', timestamp: Date.now() + 300 },
      ];

      for (const event of mockEvents) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setEvents(prev => [...prev, event]);
      }

      setProcessing(false);
    };

    return (
      <Card sectioned>
        <BlockStack gap="400">
          <Text variant="headingLg" as="h3">Event-Driven Use Case</Text>
          <Text as="p">
            Demonstrates Use Case with EventBus integration for cross-layer communication.
          </Text>

          <Button onClick={handleProcessOrder} disabled={processing} loading={processing}>
            Process Order with Events
          </Button>

          {events.length > 0 && (
            <Card sectioned>
              <Text variant="headingMd" as="h4">Event Log</Text>
              {events.map((event, index) => (
                <div key={index} style={{
                  padding: '8px',
                  backgroundColor: '#f4f6f8',
                  marginBottom: '8px',
                  borderRadius: '4px'
                }}>
                  <Text variant="bodySm">
                    <Badge>{event.type}</Badge> - {new Date(event.timestamp).toLocaleTimeString()}
                  </Text>
                </div>
              ))}
            </Card>
          )}
        </BlockStack>
      </Card>
    );
  },
};