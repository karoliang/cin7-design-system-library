import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, Grid, BlockStack, Text, Badge, Button, DataTable } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Mock ExtJS Form Panel implementation
const ExtFormPanel = ({ title, fields, onSubmit }) => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const handleFieldChange = (fieldName, value) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setErrors(prev => ({ ...prev, [fieldName]: null }));
  };

  const handleSubmit = () => {
    const validationErrors = {};

    // Validate required fields
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        validationErrors[field.name] = `${field.label} is required`;
      }
    });

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Card sectioned title={title}>
      <BlockStack gap="400">
        {fields.map(field => (
          <div key={field.name} style={{ marginBottom: '16px' }}>
            <label>{field.label}:</label>
            <input
              type={field.type || 'text'}
              value={formData[field.name] || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: errors[field.name] ? '1px solid red' : '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            {errors[field.name] && (
              <div style={{ color: 'red', fontSize: '12px' }}>
                {errors[field.name]}
              </div>
            )}
          </div>
        ))}

        <Button onClick={handleSubmit}>
          Submit
        </Button>

        <BlockStack gap="200">
          <Badge tone="info">ExtJS Form Panel</Badge>
          <Text variant="bodySm">
            • Enterprise-grade form validation<br />
            • Field grouping and organization<br />
            • Server-side integration ready<br />
            • Compatible with ExtJS data stores
          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  );
};

const meta = {
  title: 'Cin7 DSL/Enterprise Components/ExtJS - Form Panel',
  component: ExtFormPanel,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('formpanel', 'default'),
    docs: {
      description: {
        component: 'ExtJS Form Panel adapter for enterprise forms. Demonstrates integration with ExtJS grid and data store components.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExtFormPanel>;

export default meta;
type Story = StoryObj<typeof ExtFormPanel>;

export const BasicFormPanel: Story = {
  render: () => {
    const fields = [
      { name: 'customerName', label: 'Customer Name', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'address', label: 'Address' },
    ];

    const handleSubmit = (data) => {
      alert('Form submitted: ' + JSON.stringify(data, null, 2));
    };

    return (
      <ExtFormPanel
        title="Customer Information Form"
        fields={fields}
        onSubmit={handleSubmit}
      />
    );
  },
};

export const FormPanelWithDataGrid: Story = {
  render: () => (
    <Page title="ExtJS Form with Data Grid Integration">
      <Layout>
        <Layout.Section>
          <Grid columns={{ xs: 1, md: 2 }}>
            <Card>
              <ExtFormPanel
                title="Product Form"
                fields={[
                  { name: 'name', label: 'Product Name', required: true },
                  { name: 'price', label: 'Price', type: 'number' },
                  { name: 'category', label: 'Category' },
                  { name: 'description', label: 'Description' },
                ]}
                onSubmit={(data) => {
                  console.log('Product created:', data);
                }}
              />
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h2">Products Data Grid</Text>
                <Text as="p">
                  ExtJS Grid component for displaying and managing large datasets.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'text']}
                  headings={['ID', 'Name', 'Price', 'Actions']}
                  rows={[
                    ['1', 'Product 1', '$99.99', 'Edit'],
                    ['2', 'Product 2', '$149.99', 'Edit'],
                    ['3', 'Product 3', '$199.99', 'Edit'],
                  ]}
                />

                <Text as="p" variant="bodySm">
                  <Badge tone="success">ExtJS Grid Features:</Badge><br />
                  • Advanced filtering and sorting<br />
                  • Pagination for large datasets<br />
                  • Cell editing capabilities<br />
                  • Export functionality
                </Text>
              </BlockStack>
            </Card>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const ComplexFormPanel: Story = {
  render: () => {
    const complexFields = [
      { name: 'projectName', label: 'Project Name', required: true },
      { name: 'description', label: 'Description' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'priority', label: 'Priority', type: 'select' },
      { name: 'assignedTo', label: 'Assigned To' },
      { name: 'tags', label: 'Tags' },
      { name: 'estimatedHours', label: 'Estimated Hours', type: 'number' },
    ];

    return (
      <Card sectioned>
        <BlockStack gap="400">
          <Text variant="headingLg" as="h2">Project Management Form</Text>

          <Text as="p">
            Complex form demonstrating ExtJS adapter capabilities for enterprise applications.
          </Text>

          <ExtFormPanel
            title="Create New Project"
            fields={complexFields}
            onSubmit={(data) => {
              console.log('Project created:', data);
            }}
          />

          <BlockStack gap="200">
            <Badge tone="warning">ExtJS Enterprise Features</Badge>
            <Text variant="bodySm">
              • Multi-level form validation<br />
              • Dynamic field rendering<br />
              • Integration with ExtJS stores<br />
              • Support for custom field types
            </Text>
          </BlockStack>
        </BlockStack>
      </Card>
    );
  },
};