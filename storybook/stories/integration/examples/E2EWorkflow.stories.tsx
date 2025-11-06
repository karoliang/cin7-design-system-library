import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, Grid, BlockStack, Text, Badge, Button, FormLayout, TextField, Select, DataTable, ProgressBar } from '@shopify/polaris';
import React from 'react';

// Mock E2E workflow implementation
const E2EWorkflow = () => {
  const [step, setStep] = React.useState(1);
  const [workflowData, setWorkflowData] = React.useState({});
  const [isProcessing, setIsProcessing] = React.useState(false);

  const steps = [
    { id: 1, name: 'Customer Registration', component: 'CustomerForm' },
    { id: 2, name: 'Product Selection', component: 'ProductGrid' },
    { id: 3, name: 'Order Processing', component: 'OrderProcessor' },
    { id: 4, name: 'Payment Integration', component: 'PaymentGateway' },
    { id: 5, name: 'Inventory Update', component: 'InventoryManager' },
  ];

  const handleNextStep = async () => {
    setIsProcessing(true);
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStep(prev => Math.min(prev + 1, steps.length));
    setIsProcessing(false);
  };

  const handlePreviousStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const currentStepData = steps.find(s => s.id === step);

  return (
    <Card sectioned>
      <BlockStack gap="400">
        <Text variant="headingXl" as="h1">End-to-End Business Workflow</Text>
        <Text as="p">
          Demonstrates complete business process flow across multiple system components.
        </Text>

        {/* Progress indicator */}
        <Card sectioned>
          <ProgressBar progress={(step / steps.length) * 100} size="small" />
          <Text as="p" variant="bodySm" alignment="center">
            Step {step} of {steps.length}: {currentStepData?.name}
          </Text>
        </Card>

        {/* Current step component */}
        <Card sectioned>
          <Text variant="heading2xl" as="h2">{currentStepData?.name}</Text>
          {step === 1 && (
            <FormLayout>
              <TextField label="Company Name" placeholder="Enter company name" />
              <TextField label="Contact Email" type="email" placeholder="contact@company.com" />
              <TextField label="Phone Number" placeholder="+1 (555) 123-4567" />
              <Select
                label="Business Type"
                options={[
                  { label: 'Retail', value: 'retail' },
                  { label: 'Wholesale', value: 'wholesale' },
                  { label: 'Manufacturing', value: 'manufacturing' },
                ]}
              />
            </FormLayout>
          )}
          {step === 2 && (
            <DataTable
              columnContentTypes={['text', 'numeric', 'text', 'text']}
              headings={['Product', 'Price', 'Stock', 'Action']}
              rows={[
                ['Product A', '$99.99', '50 units', <Button size="small" key="product-a">Add</Button>],
                ['Product B', '$149.99', '25 units', <Button size="small" key="product-b">Add</Button>],
                ['Product C', '$199.99', '10 units', <Button size="small" key="product-c">Add</Button>],
              ]}
            />
          )}
          {step === 3 && (
            <BlockStack gap="400">
              <Text as="p">Processing order with business rules validation...</Text>
              <Badge tone="info">Order Validation Active</Badge>
              <Badge tone="warning">Tax Calculation</Badge>
              <Badge tone="success">Shipping Configuration</Badge>
            </BlockStack>
          )}
          {step === 4 && (
            <FormLayout>
              <TextField label="Card Number" placeholder="1234 5678 9012 3456" />
              <TextField label="Expiry Date" placeholder="MM/YY" />
              <TextField label="CVV" placeholder="123" />
              <Button loading={isProcessing}>Process Payment</Button>
            </FormLayout>
          )}
          {step === 5 && (
            <BlockStack gap="400">
              <Text as="p">Updating inventory levels across all warehouses...</Text>
              <Badge tone="success">Main Warehouse: Updated</Badge>
              <Badge tone="success">Regional Warehouse: Updated</Badge>
              <Badge tone="info">Supplier Notification: Sent</Badge>
            </BlockStack>
          )}
        </Card>

        {/* Navigation controls */}
        <Grid columns={{ xs: 2, md: 2 }}>
          <Button
            onClick={handlePreviousStep}
            disabled={step === 1}
            accessibilityLabel="Previous step"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextStep}
            disabled={step === steps.length}
            loading={isProcessing}
            variant="primary"
          >
            {step === steps.length ? 'Complete' : 'Next'}
          </Button>
        </Grid>

        <BlockStack gap="200">
          <Badge tone="info">E2E Integration</Badge>
          <Text variant="bodySm">
            • Cross-component communication<br />
            • State management across layers<br />
            • Error handling and recovery<br />
            • Real-time data synchronization
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

const meta = {
  title: 'Cin7 DSL/Integration Examples/E2E Workflow',
  component: E2EWorkflow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'End-to-end workflow demonstration showcasing integration across all framework layers. Shows complete business process from customer registration through inventory updates.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof E2EWorkflow>;

export default meta;
type Story = StoryObj<typeof E2EWorkflow>;

export const BasicE2EWorkflow: Story = {
  render: () => <E2EWorkflow />,
};

export const WithRealTimeUpdates: Story = {
  render: () => (
    <Page title="Real-time E2E Workflow">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h3">Live Workflow Monitoring</Text>
              <Text as="p">
                Demonstrates real-time updates and event-driven communication across all components.
              </Text>

              <E2EWorkflow />

              <BlockStack gap="200">
                <Badge tone="success">Real-time Features</Badge>
                <Text variant="bodySm">
                  • WebSocket connections<br />
                  • Event-driven updates<br />
                  • Live status synchronization<br />
                  • Cross-component state management
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};