import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, Grid, BlockStack, Text, Badge, Button, DataTable, Icon } from '@shopify/polaris';
import React from 'react';

// Mock system integration components
const SystemConnector = ({ system, status, onConnect }) => {
  return (
    <Card sectioned>
      <Grid columns={{ xs: 1, md: 2 }}>
        <BlockStack gap="200">
          <Text variant="headingMd" as="h3">{system.name}</Text>
          <Text variant="bodySm">{system.description}</Text>
          <Badge tone={status === 'connected' ? 'success' : 'warning'}>
            {status === 'connected' ? 'Connected' : 'Disconnected'}
          </Badge>
        </BlockStack>
        <BlockStack gap="200">
          <Button
            onClick={() => onConnect(system.id)}
            disabled={status === 'connected'}
            loading={status === 'connecting'}
          >
            {status === 'connected' ? 'Connected' : 'Connect'}
          </Button>
          <Text variant="bodySm">
            {status === 'connected' ?
              `Last sync: ${new Date().toLocaleTimeString()}` :
              'Click to establish connection'
            }
          </Text>
        </BlockStack>
      </Grid>
    </Card>
  );
};

const SystemHealth = ({ systems }) => {
  const healthySystems = systems.filter(s => s.status === 'connected').length;
  const totalSystems = systems.length;
  const healthPercentage = (healthySystems / totalSystems) * 100;

  return (
    <Card sectioned>
      <BlockStack gap="400">
        <Text variant="headingXl" as="h1">System Health Dashboard</Text>

        <Grid columns={{ xs: 1, md: 3 }}>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd">Total Systems</Text>
              <Text variant="headingLg">{totalSystems}</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd">Connected</Text>
              <Text variant="headingLg" tone="success">{healthySystems}</Text>
            </BlockStack>
          </Card>
          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd">Health Score</Text>
              <Text variant="headingLg">{healthPercentage.toFixed(0)}%</Text>
            </BlockStack>
          </Card>
        </Grid>

        <DataTable
          columnContentTypes={['text', 'text', 'text', 'text']}
          headings={['System', 'Type', 'Status', 'Last Sync']}
          rows={systems.map(system => [
            system.name,
            system.type,
            <Badge key={system.id} tone={system.status === 'connected' ? 'success' : 'warning'}>
              {system.status === 'connected' ? 'Connected' : 'Disconnected'}
            </Badge>,
            system.status === 'connected' ? new Date().toLocaleTimeString() : 'Never',
          ])}
        />
      </BlockStack>
    </Card>
  );
};

const SystemIntegration = () => {
  const [systems, setSystems] = React.useState([
    {
      id: 'erp',
      name: 'ERP System',
      type: 'Enterprise Resource Planning',
      description: 'Core business management system',
      status: 'connected',
    },
    {
      id: 'crm',
      name: 'CRM Platform',
      type: 'Customer Relationship Management',
      description: 'Customer data and interactions',
      status: 'disconnected',
    },
    {
      id: 'warehouse',
      name: 'Warehouse Management',
      type: 'Inventory Management',
      description: 'Stock and logistics management',
      status: 'connected',
    },
    {
      id: 'accounting',
      name: 'Accounting Software',
      type: 'Financial Management',
      description: 'Financial transactions and reporting',
      status: 'disconnected',
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Platform',
      type: 'Online Sales',
      description: 'Web store and sales channels',
      status: 'connected',
    },
  ]);

  const [integrations, setIntegrations] = React.useState([
    {
      source: 'ERP System',
      target: 'Warehouse Management',
      dataType: 'Inventory Levels',
      frequency: 'Real-time',
      status: 'active',
    },
    {
      source: 'E-commerce Platform',
      target: 'ERP System',
      dataType: 'Sales Orders',
      frequency: 'Every 5 minutes',
      status: 'active',
    },
    {
      source: 'CRM Platform',
      target: 'Accounting Software',
      dataType: 'Customer Invoices',
      frequency: 'Daily',
      status: 'inactive',
    },
  ]);

  const handleConnect = (systemId) => {
    setSystems(prev => prev.map(system =>
      system.id === systemId
        ? { ...system, status: 'connecting' }
        : system
    ));

    // Simulate connection process
    setTimeout(() => {
      setSystems(prev => prev.map(system =>
        system.id === systemId
          ? { ...system, status: 'connected' }
          : system
      ));
    }, 2000);
  };

  const [activeTab, setActiveTab] = React.useState('systems');

  return (
    <Page title="System Integration Dashboard">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="heading2xl" as="h2">Multi-System Integration Platform</Text>
              <Text as="p">
                Comprehensive integration management across enterprise systems with real-time monitoring and control.
              </Text>

              {/* Tab Navigation */}
              <Grid columns={{ xs: 2, md: 3 }}>
                <Button
                  pressed={activeTab === 'systems'}
                  onClick={() => setActiveTab('systems')}
                >
                  Systems
                </Button>
                <Button
                  pressed={activeTab === 'integrations'}
                  onClick={() => setActiveTab('integrations')}
                >
                  Data Flows
                </Button>
                <Button
                  pressed={activeTab === 'monitoring'}
                  onClick={() => setActiveTab('monitoring')}
                >
                  Monitoring
                </Button>
              </Grid>

              {/* Systems Tab */}
              {activeTab === 'systems' && (
                <BlockStack gap="400">
                  <SystemHealth systems={systems} />
                  {systems.map(system => (
                    <SystemConnector
                      key={system.id}
                      system={system}
                      status={system.status}
                      onConnect={handleConnect}
                    />
                  ))}
                </BlockStack>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <Card sectioned>
                  <BlockStack gap="400">
                    <Text variant="headingLg" as="h3">Data Integration Flows</Text>
                    <DataTable
                      columnContentTypes={['text', 'text', 'text', 'text', 'text']}
                      headings={['Source', 'Target', 'Data Type', 'Frequency', 'Status']}
                      rows={integrations.map((integration, index) => [
                        integration.source,
                        integration.target,
                        integration.dataType,
                        integration.frequency,
                        <Badge key={index} tone={integration.status === 'active' ? 'success' : 'attention'}>
                          {integration.status}
                        </Badge>,
                      ])}
                    />

                    <BlockStack gap="200">
                      <Badge tone="info">Integration Features</Badge>
                      <Text variant="bodySm">
                        • Bi-directional data synchronization<br />
                        • Transformation and mapping engine<br />
                        • Error handling and retry logic<br />
                        • Real-time monitoring and alerts
                      </Text>
                    </BlockStack>
                  </BlockStack>
                </Card>
              )}

              {/* Monitoring Tab */}
              {activeTab === 'monitoring' && (
                <Card sectioned>
                  <BlockStack gap="400">
                    <Text variant="headingLg" as="h3">System Monitoring</Text>
                    <Text as="p">
                      Real-time monitoring of all integrated systems with comprehensive metrics and alerts.
                    </Text>

                    <Grid columns={{ xs: 1, md: 2 }}>
                      <Card>
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3">API Calls Today</Text>
                          <Text variant="headingLg">12,847</Text>
                          <Badge tone="success">+15% from yesterday</Badge>
                        </BlockStack>
                      </Card>
                      <Card>
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3">Data Transferred</Text>
                          <Text variant="headingLg">2.4 GB</Text>
                          <Badge tone="success">Within limits</Badge>
                        </BlockStack>
                      </Card>
                      <Card>
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3">Error Rate</Text>
                          <Text variant="headingLg" tone="warning">0.3%</Text>
                          <Badge tone="warning">Above target</Badge>
                        </BlockStack>
                      </Card>
                      <Card>
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h3">Uptime</Text>
                          <Text variant="headingLg" tone="success">99.9%</Text>
                          <Badge tone="success">Excellent</Badge>
                        </BlockStack>
                      </Card>
                    </Grid>
                  </BlockStack>
                </Card>
              )}

              <BlockStack gap="200">
                <Badge tone="success">Cin7 DSL Integration</Badge>
                <Text variant="bodySm">
                  • Enterprise system connectors<br />
                  • Real-time data synchronization<br />
                  • Comprehensive monitoring<br />
                  • Scalable architecture
                </Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

const meta = {
  title: 'Cin7 DSL/Integration Examples/System Integration',
  component: SystemIntegration,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive system integration platform demonstrating multi-system connectivity, data flow management, and real-time monitoring across enterprise applications.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SystemIntegration>;

export default meta;
type Story = StoryObj<typeof SystemIntegration>;

export const BasicSystemIntegration: Story = {
  render: () => <SystemIntegration />,
};

export const MinimalSystemView: Story = {
  render: () => {
    const systems = [
      { name: 'ERP System', type: 'Core Management', status: 'connected' },
      { name: 'Warehouse', type: 'Inventory', status: 'connected' },
      { name: 'E-commerce', type: 'Sales', status: 'connected' },
    ];

    return (
      <Card sectioned>
        <BlockStack gap="400">
          <Text variant="headingLg" as="h3">Connected Systems</Text>
          <DataTable
            columnContentTypes={['text', 'text', 'text']}
            headings={['System', 'Type', 'Status']}
            rows={systems.map(system => [
              system.name,
              system.type,
              <Badge key={system.name} tone="success">Connected</Badge>,
            ])}
          />
        </BlockStack>
      </Card>
    );
  },
};