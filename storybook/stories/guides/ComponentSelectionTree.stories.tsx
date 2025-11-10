import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Badge,
  Icon,
  List,
  Divider,
} from '@shopify/polaris';
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  InfoIcon,
  AlertCircleIcon,
  ChartVerticalIcon,
  MenuVerticalIcon,
  EditIcon,
  ViewIcon,
  ArrowRightIcon,
  ChatIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Cin7 DSL/Introduction/Component Selection Tree',
  component: Card,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive decision tree to help you choose the right components for your use case. Answer questions to get personalized recommendations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

interface DecisionNode {
  id: string;
  question: string;
  description?: string;
  icon?: any;
  options: DecisionOption[];
  recommendation?: ComponentRecommendation;
}

interface DecisionOption {
  label: string;
  description: string;
  next: string | ComponentRecommendation;
}

interface ComponentRecommendation {
  type: 'recommendation';
  primary: string;
  secondary?: string[];
  reason: string;
  example: string;
  codeExample?: string;
  storybook?: string;
}

const decisionTree: Record<string, DecisionNode> = {
  start: {
    id: 'start',
    question: 'What are you trying to build?',
    description: 'Select the primary purpose of your component',
    icon: InfoIcon,
    options: [
      {
        label: 'Display Data',
        description: 'Show information to users (tables, lists, charts)',
        next: 'data-display'
      },
      {
        label: 'Collect Input',
        description: 'Forms, fields, user input',
        next: 'input-collection'
      },
      {
        label: 'Navigation',
        description: 'Help users move through the app',
        next: 'navigation'
      },
      {
        label: 'Layout/Structure',
        description: 'Organize content and components',
        next: 'layout'
      },
      {
        label: 'User Feedback',
        description: 'Notifications, messages, alerts',
        next: 'feedback'
      },
      {
        label: 'Data Visualization',
        description: 'Charts, graphs, analytics',
        next: 'charts'
      }
    ]
  },

  'data-display': {
    id: 'data-display',
    question: 'What type of data are you displaying?',
    icon: MenuVerticalIcon,
    options: [
      {
        label: 'Structured Tabular Data',
        description: 'Rows and columns with multiple fields',
        next: 'table-size'
      },
      {
        label: 'Simple List',
        description: 'Basic collection of items',
        next: {
          type: 'recommendation',
          primary: 'List Component',
          secondary: ['ResourceItem (for rich items)'],
          reason: 'Lists are perfect for simple collections with basic structure',
          example: 'Feature lists, menu items, simple collections',
          codeExample: `<List>
  <List.Item>Feature: Advanced filtering</List.Item>
  <List.Item>Feature: Real-time updates</List.Item>
  <List.Item>Feature: Export capabilities</List.Item>
</List>`,
          storybook: '/storybook/?path=/story/polaris-lists-list'
        }
      },
      {
        label: 'Rich Media Items',
        description: 'Items with images, avatars, or complex layouts',
        next: {
          type: 'recommendation',
          primary: 'ResourceList',
          secondary: ['Card for individual items'],
          reason: 'ResourceList handles rich media items with actions and selection',
          example: 'Product catalogs, user directories, file managers',
          codeExample: `<ResourceList
  items={products}
  renderItem={(product) => (
    <ResourceItem
      id={product.id}
      media={<Avatar source={product.image} />}
    >
      <Text variant="headingMd">{product.name}</Text>
      <Text>{product.description}</Text>
    </ResourceItem>
  )}
/>`,
          storybook: '/storybook/?path=/story/polaris-lists-resourcelist'
        }
      }
    ]
  },

  'table-size': {
    id: 'table-size',
    question: 'How many rows will your table have?',
    icon: ChartVerticalIcon,
    options: [
      {
        label: 'Small (<100 rows)',
        description: 'Simple datasets, quick reference',
        next: {
          type: 'recommendation',
          primary: 'DataTable (Polaris)',
          reason: 'Polaris DataTable is perfect for small-to-medium datasets with clean design',
          example: 'Order summaries, recent activity, small reports',
          codeExample: `<DataTable
  columnContentTypes={['text', 'numeric', 'text']}
  headings={['Product', 'Price', 'Status']}
  rows={[
    ['Laptop', '$999', 'In Stock'],
    ['Mouse', '$29', 'In Stock']
  ]}
/>`,
          storybook: '/storybook/?path=/story/polaris-tables-datatable'
        }
      },
      {
        label: 'Medium (100-1000 rows)',
        description: 'Need sorting, filtering, basic pagination',
        next: {
          type: 'recommendation',
          primary: 'DataTable with Pagination',
          secondary: ['Consider ExtJS for advanced features'],
          reason: 'DataTable with pagination handles medium datasets efficiently',
          example: 'Product lists, customer records, transaction history',
          codeExample: `<DataTable
  columnContentTypes={['text', 'numeric', 'text']}
  headings={['Product', 'Price', 'Status']}
  rows={currentPageRows}
  pagination={{
    hasNext: page < totalPages,
    hasPrevious: page > 1,
    onNext: () => setPage(p => p + 1),
    onPrevious: () => setPage(p => p - 1)
  }}
/>`,
          storybook: '/storybook/?path=/story/polaris-tables-datatable'
        }
      },
      {
        label: 'Large (>1000 rows)',
        description: 'Enterprise data, complex operations',
        next: 'table-features'
      }
    ]
  },

  'table-features': {
    id: 'table-features',
    question: 'What features do you need?',
    icon: AlertCircleIcon,
    options: [
      {
        label: 'Cell Editing',
        description: 'Users can edit data directly in the table',
        next: {
          type: 'recommendation',
          primary: 'ExtJS DataGrid',
          reason: 'ExtJS provides built-in cell editing, grouping, and virtual scrolling for large datasets',
          example: 'Inventory management, bulk data entry, spreadsheet-like editing',
          codeExample: `import { ExtDataGrid } from '@cin7/extjs-adapters';

const grid = ExtDataGrid.create({
  store: productStore,
  columns: [
    { dataIndex: 'name', text: 'Product', editor: 'textfield' },
    { dataIndex: 'price', text: 'Price', type: 'currency', editor: 'numberfield' },
    { dataIndex: 'stock', text: 'Stock', type: 'number', editor: 'numberfield' }
  ],
  features: ['grouping', 'sorting', 'filtering', 'export'],
  buffered: true,
  pageSize: 100
});`,
          storybook: '/storybook/?path=/story/cin7-dsl-extjs-integration'
        }
      },
      {
        label: 'Grouping/Pivoting',
        description: 'Complex data organization and analysis',
        next: {
          type: 'recommendation',
          primary: 'ExtJS DataGrid',
          reason: 'ExtJS excels at complex data operations like grouping, pivoting, and aggregation',
          example: 'Sales reports, analytics dashboards, financial data',
          codeExample: `import { ExtDataGrid } from '@cin7/extjs-adapters';

const grid = ExtDataGrid.create({
  store: salesStore,
  features: ['grouping', 'groupingsummary'],
  columns: [
    { dataIndex: 'region', text: 'Region' },
    { dataIndex: 'product', text: 'Product' },
    { dataIndex: 'sales', text: 'Sales', summaryType: 'sum' }
  ]
});`,
          storybook: '/storybook/?path=/story/cin7-dsl-extjs-integration'
        }
      },
      {
        label: 'Virtual Scrolling',
        description: 'Smooth scrolling through thousands of rows',
        next: {
          type: 'recommendation',
          primary: 'ExtJS DataGrid (buffered)',
          reason: 'ExtJS buffered rendering provides smooth virtual scrolling for very large datasets',
          example: 'Large catalogs, log viewers, data exploration',
          codeExample: `import { ExtDataGrid } from '@cin7/extjs-adapters';

const grid = ExtDataGrid.create({
  store: largeDataStore,
  buffered: true,
  pageSize: 100,
  leadingBufferZone: 50,
  trailingBufferZone: 50
});`,
          storybook: '/storybook/?path=/story/cin7-dsl-extjs-integration'
        }
      }
    ]
  },

  'input-collection': {
    id: 'input-collection',
    question: 'What type of input do you need?',
    icon: EditIcon,
    options: [
      {
        label: 'Simple Form (1-5 fields)',
        description: 'Basic user input with validation',
        next: {
          type: 'recommendation',
          primary: 'Polaris Form Components',
          secondary: ['TextField', 'Select', 'Checkbox', 'RadioButton'],
          reason: 'Polaris provides excellent form components with built-in accessibility and validation',
          example: 'Login forms, search filters, quick settings',
          codeExample: `<FormLayout>
  <TextField
    label="Email"
    type="email"
    value={email}
    onChange={setEmail}
    requiredIndicator
  />
  <Select
    label="Country"
    options={countries}
    value={country}
    onChange={setCountry}
  />
  <Checkbox
    label="Subscribe to newsletter"
    checked={subscribe}
    onChange={setSubscribe}
  />
</FormLayout>`,
          storybook: '/storybook/?path=/story/polaris-forms-form'
        }
      },
      {
        label: 'Complex Form (6+ fields)',
        description: 'Multi-section forms with validation',
        next: {
          type: 'recommendation',
          primary: 'Polaris FormLayout',
          secondary: ['Card for sections', 'Tabs for multi-step'],
          reason: 'FormLayout with Cards provides excellent organization for complex forms',
          example: 'User profiles, product creation, settings panels',
          codeExample: `<Form onSubmit={handleSubmit}>
  <Card title="Basic Information">
    <FormLayout>
      <TextField label="Name" value={name} onChange={setName} />
      <TextField label="Email" type="email" value={email} onChange={setEmail} />
    </FormLayout>
  </Card>

  <Card title="Address">
    <FormLayout>
      <TextField label="Street" value={street} onChange={setStreet} />
      <TextField label="City" value={city} onChange={setCity} />
    </FormLayout>
  </Card>

  <Button submit variant="primary">Save</Button>
</Form>`,
          storybook: '/storybook/?path=/story/polaris-forms-form'
        }
      },
      {
        label: 'Dynamic Form Fields',
        description: 'Fields that change based on user input or API',
        next: {
          type: 'recommendation',
          primary: 'ExtJS Form Panel',
          secondary: ['Polaris for simpler cases'],
          reason: 'ExtJS excels at dynamic form generation with complex field dependencies',
          example: 'Configuration wizards, dynamic pricing forms, conditional fields',
          codeExample: `import { ExtFormPanel } from '@cin7/extjs-adapters';

const form = ExtFormPanel.create({
  items: [
    { xtype: 'textfield', fieldLabel: 'Product Type', name: 'type',
      listeners: {
        change: function(field, value) {
          // Dynamically show/hide fields based on selection
          form.down('[name=sku]').setVisible(value === 'physical');
          form.down('[name=license]').setVisible(value === 'digital');
        }
      }
    },
    { xtype: 'textfield', fieldLabel: 'SKU', name: 'sku' },
    { xtype: 'textfield', fieldLabel: 'License Key', name: 'license', hidden: true }
  ]
});`,
          storybook: '/storybook/?path=/story/cin7-dsl-extjs-integration'
        }
      }
    ]
  },

  'navigation': {
    id: 'navigation',
    question: 'What navigation scope do you need?',
    icon: ArrowRightIcon,
    options: [
      {
        label: 'Within Current Page',
        description: 'Switch between views in same context',
        next: {
          type: 'recommendation',
          primary: 'Tabs',
          reason: 'Tabs are perfect for related content that stays within the same page context',
          example: 'Settings panels, product details, data views',
          codeExample: `const [selected, setSelected] = useState(0);

<Tabs
  tabs={[
    {content: 'Overview', id: 'overview'},
    {content: 'Settings', id: 'settings'},
    {content: 'Analytics', id: 'analytics'}
  ]}
  selected={selected}
  onSelect={setSelected}
>
  {selected === 0 && <OverviewPanel />}
  {selected === 1 && <SettingsPanel />}
  {selected === 2 && <AnalyticsPanel />}
</Tabs>`,
          storybook: '/storybook/?path=/story/polaris-navigation-tabs'
        }
      },
      {
        label: 'Across Different Pages',
        description: 'Main app navigation, different sections',
        next: {
          type: 'recommendation',
          primary: 'Navigation',
          secondary: ['TopBar for actions'],
          reason: 'Navigation component provides app-wide menu with nested sections',
          example: 'Admin dashboards, multi-section apps',
          codeExample: `<Navigation location="/">
  <Navigation.Section
    items={[
      {label: 'Home', icon: HomeIcon, url: '/'},
      {label: 'Products', icon: ProductsIcon, url: '/products'},
      {label: 'Orders', icon: OrdersIcon, url: '/orders'}
    ]}
  />
  <Navigation.Section
    title="Settings"
    items={[
      {label: 'Account', url: '/settings/account'},
      {label: 'Billing', url: '/settings/billing'}
    ]}
  />
</Navigation>`,
          storybook: '/storybook/?path=/story/polaris-navigation-navigation'
        }
      },
      {
        label: 'Deep Hierarchy',
        description: 'Show user location, enable back navigation',
        next: {
          type: 'recommendation',
          primary: 'Breadcrumbs',
          reason: 'Breadcrumbs show user location and provide quick navigation up the hierarchy',
          example: 'E-commerce categories, file browsers, nested content',
          codeExample: `<Breadcrumbs
  breadcrumbs={[
    {content: 'Home', url: '/'},
    {content: 'Products', url: '/products'},
    {content: 'Electronics', url: '/products/electronics'},
    {content: 'Laptops', url: '/products/electronics/laptops'}
  ]}
/>`,
          storybook: '/storybook/?path=/story/polaris-navigation-breadcrumbs'
        }
      }
    ]
  },

  'layout': {
    id: 'layout',
    question: 'What layout complexity do you need?',
    icon: ViewIcon,
    options: [
      {
        label: 'Simple Linear (Vertical/Horizontal)',
        description: 'Stack items in one direction',
        next: {
          type: 'recommendation',
          primary: 'BlockStack / InlineStack',
          reason: 'Stack components provide simple, predictable layouts with consistent spacing',
          example: 'Form layouts, button groups, simple content',
          codeExample: `// Vertical stacking
<BlockStack gap="400">
  <Text variant="headingMd">Title</Text>
  <Text>Description goes here</Text>
  <Button>Action</Button>
</BlockStack>

// Horizontal stacking
<InlineStack gap="200">
  <Button variant="primary">Save</Button>
  <Button>Cancel</Button>
</InlineStack>`,
          storybook: '/storybook/?path=/story/polaris-layout-blockstack'
        }
      },
      {
        label: 'Grid Layout (Rows & Columns)',
        description: '2D layout with responsive breakpoints',
        next: {
          type: 'recommendation',
          primary: 'Grid',
          reason: 'Grid provides flexible 2D layouts with responsive column configuration',
          example: 'Dashboards, card galleries, product grids',
          codeExample: `<Grid columns={{xs: 1, sm: 2, md: 3, lg: 4}} gap="400">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</Grid>`,
          storybook: '/storybook/?path=/story/polaris-layout-grid'
        }
      },
      {
        label: 'Complex Admin Layout',
        description: 'Fixed sidebars, multi-column',
        next: {
          type: 'recommendation',
          primary: 'Layout',
          secondary: ['Page', 'Frame'],
          reason: 'Layout component provides traditional admin interface structure',
          example: 'Admin dashboards, settings pages',
          codeExample: `<Frame>
  <Page title="Dashboard">
    <Layout>
      <Layout.Section>
        <Card>Main Content</Card>
      </Layout.Section>
      <Layout.Section variant="oneThird">
        <Card>Sidebar</Card>
      </Layout.Section>
    </Layout>
  </Page>
</Frame>`,
          storybook: '/storybook/?path=/story/polaris-layout-layout'
        }
      }
    ]
  },

  'feedback': {
    id: 'feedback',
    question: 'How urgent is the message?',
    icon: ChatIcon,
    options: [
      {
        label: 'Critical - User Must See',
        description: 'Blocks user action, requires attention',
        next: {
          type: 'recommendation',
          primary: 'Banner',
          secondary: ['Modal for destructive actions'],
          reason: 'Banners are prominent and ensure users see critical information',
          example: 'Error messages, warnings, important notifications',
          codeExample: `<Banner
  status="critical"
  title="Payment failed"
  action={{content: 'Update payment method', onAction: handleUpdate}}
>
  <p>Your credit card was declined. Please update your payment method.</p>
</Banner>`,
          storybook: '/storybook/?path=/story/polaris-feedback-banner'
        }
      },
      {
        label: 'Important but Not Urgent',
        description: 'Inform user, no immediate action needed',
        next: {
          type: 'recommendation',
          primary: 'Toast',
          reason: 'Toasts provide brief, non-intrusive notifications that auto-dismiss',
          example: 'Success confirmations, minor updates, background tasks',
          codeExample: `const toggleActive = useCallback(() => {
  setActive((active) => !active);
}, []);

const toastMarkup = active ? (
  <Toast content="Product saved" onDismiss={toggleActive} />
) : null;

return (
  <Frame>
    {toastMarkup}
    <Button onClick={handleSave}>Save Product</Button>
  </Frame>
);`,
          storybook: '/storybook/?path=/story/polaris-feedback-toast'
        }
      },
      {
        label: 'Promotional/Informational',
        description: 'Feature announcements, tips, marketing',
        next: {
          type: 'recommendation',
          primary: 'CalloutCard',
          reason: 'CalloutCard provides engaging, visually appealing promotional content',
          example: 'Feature announcements, tutorials, upgrade prompts',
          codeExample: `<CalloutCard
  title="New analytics dashboard available"
  illustration="https://cdn.shopify.com/..."
  primaryAction={{
    content: 'Learn more',
    onAction: () => navigate('/analytics')
  }}
>
  <p>Get deeper insights with our new real-time analytics dashboard.</p>
</CalloutCard>`,
          storybook: '/storybook/?path=/story/polaris-feedback-calloutcard'
        }
      }
    ]
  },

  'charts': {
    id: 'charts',
    question: 'What type of data are you visualizing?',
    icon: ChartVerticalIcon,
    options: [
      {
        label: 'Trends Over Time',
        description: 'Time-series data, growth, changes',
        next: {
          type: 'recommendation',
          primary: 'LineChart',
          reason: 'Line charts excel at showing trends and changes over time',
          example: 'Sales trends, user growth, temperature changes',
          codeExample: `import { LineChart } from '@cin7/ag-charts-adapter';

<LineChart
  title="Monthly Sales"
  data={[
    {
      name: 'Revenue',
      data: [100, 150, 200, 250, 300, 350]
    },
    {
      name: 'Profit',
      data: [50, 75, 100, 125, 150, 175]
    }
  ]}
  categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
  yAxisTitle="Amount ($)"
/>`,
          storybook: '/storybook/?path=/story/cin7-dsl-charts-linechart'
        }
      },
      {
        label: 'Comparing Categories',
        description: 'Product comparisons, rankings, distributions',
        next: {
          type: 'recommendation',
          primary: 'BarChart',
          reason: 'Bar charts are ideal for comparing values across categories',
          example: 'Sales by product, regional comparison, survey results',
          codeExample: `import { BarChart } from '@cin7/ag-charts-adapter';

<BarChart
  title="Sales by Product"
  data={[
    {
      name: 'Q1 Sales',
      data: [45, 67, 89, 56, 78]
    }
  ]}
  categories={['Product A', 'Product B', 'Product C', 'Product D', 'Product E']}
  yAxisTitle="Sales ($1000s)"
/>`,
          storybook: '/storybook/?path=/story/cin7-dsl-charts-barchart'
        }
      },
      {
        label: 'Part-to-Whole (Proportions)',
        description: 'Market share, percentages, budget allocation',
        next: {
          type: 'recommendation',
          primary: 'PieChart',
          secondary: ['Use BarChart if >7 categories'],
          reason: 'Pie charts show proportions and percentages clearly (best for 3-7 slices)',
          example: 'Market share, budget breakdown, demographic distribution',
          codeExample: `import { PieChart } from '@cin7/ag-charts-adapter';

<PieChart
  title="Market Share"
  data={[
    { name: 'Product A', y: 45 },
    { name: 'Product B', y: 30 },
    { name: 'Product C', y: 15 },
    { name: 'Others', y: 10 }
  ]}
  showDataLabels={true}
/>`,
          storybook: '/storybook/?path=/story/cin7-dsl-charts-piechart'
        }
      }
    ]
  }
};

function DecisionTreeFlow() {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [path, setPath] = useState<string[]>(['start']);
  const [recommendation, setRecommendation] = useState<ComponentRecommendation | null>(null);

  const currentNode = decisionTree[currentNodeId];

  const handleOptionClick = (next: string | ComponentRecommendation) => {
    if (typeof next === 'string') {
      setCurrentNodeId(next);
      setPath([...path, next]);
      setRecommendation(null);
    } else {
      setRecommendation(next);
    }
  };

  const handleBack = () => {
    if (path.length > 1) {
      const newPath = [...path];
      newPath.pop();
      setCurrentNodeId(newPath[newPath.length - 1]);
      setPath(newPath);
      setRecommendation(null);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
    setPath(['start']);
    setRecommendation(null);
  };

  if (recommendation) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <BlockStack gap="600">
          <InlineStack align="space-between">
            <BlockStack gap="200">
              <InlineStack gap="200" alignment="center">
                <Icon source={CheckCircleIcon} tone="success" />
                <Text variant="heading2xl" as="h1">Recommendation</Text>
              </InlineStack>
              <Text tone="subdued">Based on your requirements</Text>
            </BlockStack>
            <InlineStack gap="200">
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleReset}>Start Over</Button>
            </InlineStack>
          </InlineStack>

          <Card>
            <BlockStack gap="400">
              <BlockStack gap="200">
                <InlineStack gap="200" alignment="center">
                  <Badge tone="success" size="large">Recommended</Badge>
                  <Text variant="headingXl" as="h2">{recommendation.primary}</Text>
                </InlineStack>
                {recommendation.secondary && recommendation.secondary.length > 0 && (
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">Also consider:</Text>
                    {recommendation.secondary.map((alt, i) => (
                      <Badge key={i} tone="info">{alt}</Badge>
                    ))}
                  </InlineStack>
                )}
              </BlockStack>

              <Divider />

              <BlockStack gap="200">
                <Text variant="headingMd" as="h3">Why this component?</Text>
                <Text>{recommendation.reason}</Text>
              </BlockStack>

              <BlockStack gap="200">
                <Text variant="headingMd" as="h3">Use cases</Text>
                <Text>{recommendation.example}</Text>
              </BlockStack>

              {recommendation.codeExample && (
                <BlockStack gap="200">
                  <Text variant="headingMd" as="h3">Code example</Text>
                  <div style={{
                    background: '#f6f6f7',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: 'auto'
                  }}>
                    <pre style={{
                      margin: 0,
                      fontFamily: 'Monaco, Courier, monospace',
                      fontSize: '13px',
                      lineHeight: '1.5'
                    }}>
                      {recommendation.codeExample}
                    </pre>
                  </div>
                </BlockStack>
              )}

              {recommendation.storybook && (
                <InlineStack gap="200">
                  <Button
                    variant="primary"
                    onClick={() => window.open(recommendation.storybook, '_blank')}
                  >
                    View Interactive Example
                  </Button>
                  <Button onClick={handleReset}>Choose Another Component</Button>
                </InlineStack>
              )}
            </BlockStack>
          </Card>
        </BlockStack>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <BlockStack gap="600">
        <InlineStack align="space-between">
          <BlockStack gap="200">
            <Text variant="heading2xl" as="h1">Component Selection Guide</Text>
            <Text tone="subdued">Answer questions to find the right component</Text>
          </BlockStack>
          {path.length > 1 && (
            <InlineStack gap="200">
              <Button onClick={handleBack}>Back</Button>
              <Button onClick={handleReset} variant="plain">Start Over</Button>
            </InlineStack>
          )}
        </InlineStack>

        {/* Breadcrumb trail */}
        <Card>
          <InlineStack gap="200" alignment="center">
            <Text fontWeight="semibold">Progress:</Text>
            {path.map((nodeId, index) => (
              <React.Fragment key={nodeId}>
                {index > 0 && <Icon source={ChevronRightIcon} />}
                <Badge tone={index === path.length - 1 ? 'info' : undefined}>
                  {decisionTree[nodeId]?.question.split('?')[0] || 'Start'}
                </Badge>
              </React.Fragment>
            ))}
          </InlineStack>
        </Card>

        {/* Current question */}
        <Card>
          <BlockStack gap="500">
            <BlockStack gap="200">
              {currentNode.icon && (
                <Icon source={currentNode.icon} tone="base" />
              )}
              <Text variant="headingXl" as="h2">{currentNode.question}</Text>
              {currentNode.description && (
                <Text tone="subdued">{currentNode.description}</Text>
              )}
            </BlockStack>

            <BlockStack gap="300">
              {currentNode.options.map((option, index) => (
                <Card key={index} background="bg-surface-secondary">
                  <InlineStack align="space-between" blockAlign="center">
                    <BlockStack gap="100">
                      <Text variant="headingMd" as="h3">{option.label}</Text>
                      <Text tone="subdued">{option.description}</Text>
                    </BlockStack>
                    <Button
                      onClick={() => handleOptionClick(option.next)}
                      icon={ChevronRightIcon}
                    >
                      Select
                    </Button>
                  </InlineStack>
                </Card>
              ))}
            </BlockStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  );
}

export const InteractiveDecisionTree: Story = {
  render: () => <DecisionTreeFlow />
};

export const QuickReference: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <BlockStack gap="600">
        <BlockStack gap="200">
          <Text variant="heading2xl" as="h1">Component Selection Quick Reference</Text>
          <Text tone="subdued">Jump to common scenarios</Text>
        </BlockStack>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <Card>
            <BlockStack gap="300">
              <Icon source={MenuVerticalIcon} />
              <Text variant="headingMd" as="h3">Data Display</Text>
              <List>
                <List.Item>Less than 100 rows → DataTable</List.Item>
                <List.Item>More than 1000 rows → ExtJS Grid</List.Item>
                <List.Item>Simple list → List component</List.Item>
                <List.Item>Rich media items → ResourceList</List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Icon source={EditIcon} />
              <Text variant="headingMd" as="h3">Forms & Input</Text>
              <List>
                <List.Item>Simple forms → Polaris FormLayout</List.Item>
                <List.Item>Complex forms → ExtJS Form Panel</List.Item>
                <List.Item>Dynamic fields → ExtJS</List.Item>
                <List.Item>Validation → Polaris (built-in)</List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Icon source={ChartVerticalIcon} />
              <Text variant="headingMd" as="h3">Charts</Text>
              <List>
                <List.Item>Trends over time → LineChart</List.Item>
                <List.Item>Category comparison → BarChart</List.Item>
                <List.Item>Proportions (3-7 items) → PieChart</List.Item>
                <List.Item>Proportions (7+ items) → BarChart</List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Icon source={ArrowRightIcon} />
              <Text variant="headingMd" as="h3">Navigation</Text>
              <List>
                <List.Item>Same page views → Tabs</List.Item>
                <List.Item>Different pages → Navigation</List.Item>
                <List.Item>Deep hierarchy → Breadcrumbs</List.Item>
                <List.Item>Modal actions → Modal</List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Icon source={ViewIcon} />
              <Text variant="headingMd" as="h3">Layout</Text>
              <List>
                <List.Item>Single direction → BlockStack/InlineStack</List.Item>
                <List.Item>2D grid → Grid component</List.Item>
                <List.Item>Admin interface → Layout</List.Item>
                <List.Item>Page wrapper → Page component</List.Item>
              </List>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="300">
              <Icon source={ChatIcon} />
              <Text variant="headingMd" as="h3">User Feedback</Text>
              <List>
                <List.Item>Critical messages → Banner</List.Item>
                <List.Item>Quick confirmations → Toast</List.Item>
                <List.Item>Promotional content → CalloutCard</List.Item>
                <List.Item>Destructive actions → Modal</List.Item>
              </List>
            </BlockStack>
          </Card>
        </div>
      </BlockStack>
    </div>
  )
};
