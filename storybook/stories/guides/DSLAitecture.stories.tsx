import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  Page,
  Layout,
  Grid,
  BlockStack,
  InlineStack,
  Text,
  Heading,
  Icon,
  Badge,
  Divider,
  List,
  Banner,
  CalloutCard,
  DataTable,
  Tabs,
  Avatar,
  Tooltip,
} from '@shopify/polaris';
import {
  CodeIcon,
  MobileIcon,
  DesktopIcon,
  LightningBoltIcon,
  PackageIcon,
  SettingsIcon,
  DatabaseIcon,
  GlobeIcon,
  SecurityIcon,
  PerformanceIcon,
  IntegrationIcon,
  AccessibilityIcon,
  CheckCircleIcon,
  AlertIcon,
  InfoIcon,
  CircleTickIcon,
  ExternalIcon,
  ImportIcon,
  ExportIcon,
  RefreshIcon,
  EditIcon,
  ViewIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Cin7 DSL Guides/DSL Architecture',
  component: Page,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive guide to the Cin7 DSL 4-layer architecture. Understand when to use each layer, how they communicate, and how to build scalable applications with clear separation of concerns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layer: {
      control: 'select',
      options: ['overview', 'react', 'vanilla', 'extjs', 'typescript'],
      description: 'Select a layer to explore',
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
      { content: 'Architecture Overview', id: 'overview' },
      { content: 'Layer Comparison', id: 'comparison' },
      { content: 'Communication', id: 'communication' },
      { content: 'Migration Paths', id: 'migration' },
    ];

    return (
      <Page
        title="Cin7 DSL Architecture Guide"
        subtitle="Understanding the 4-Layer Enterprise Framework"
        primaryAction={{
          content: 'View Architecture Diagram',
          icon: ViewIcon,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading as="h2" variant="heading2xl">Multi-Layer Architecture Overview</Heading>
                <Text as="p">
                  Cin7 DSL is a production-ready, multi-layered enterprise framework that combines
                  Shopify Polaris, ExtJS, Vanilla JavaScript, and TypeScript to create scalable
                  applications with clear separation of concerns.
                </Text>

                <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                {selectedTab === 0 && (
                  <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
                    <Card>
                      <BlockStack gap="200">
                        <Icon source={DesktopIcon} size="large" tone="info" />
                        <Heading element="h3">React Layer</Heading>
                        <Text>Modern UI components with Shopify Polaris</Text>
                        <Badge tone="info">Presentation</Badge>
                      </BlockStack>
                    </Card>

                    <Card>
                      <BlockStack gap="200">
                        <Icon source={LightningBoltIcon} size="large" tone="success" />
                        <Heading element="h3">Vanilla JS Layer</Heading>
                        <Text>Lightweight DOM manipulation and interactions</Text>
                        <Badge tone="success">Interaction</Badge>
                      </BlockStack>
                    </Card>

                    <Card>
                      <BlockStack gap="200">
                        <Icon source={PackageIcon} size="large" tone="attention" />
                        <Heading element="h3">ExtJS Layer</Heading>
                        <Text>Enterprise-grade data components</Text>
                        <Badge tone="attention">Data</Badge>
                      </BlockStack>
                    </Card>

                    <Card>
                      <BlockStack gap="200">
                        <Icon source={CodeIcon} size="large" tone="critical" />
                        <Heading element="h3">TypeScript Layer</Heading>
                        <Text>Type-safe business logic and domain modeling</Text>
                        <Badge tone="critical">Business</Badge>
                      </BlockStack>
                    </Card>
                  </Grid>
                )}

                {selectedTab === 1 && (
                  <BlockStack gap="400">
                    <Heading element="h3">Layer Characteristics Comparison</Heading>
                    <DataTable
                      columnContentTypes={['text', 'text', 'text', 'text', 'text']}
                      headings={['Layer', 'Performance', 'Maintainability', 'Complexity', 'Best For']}
                      rows={[
                        [
                          'React',
                          'Medium',
                          'High',
                          'Medium',
                          'Modern UI, Component-heavy'
                        ],
                        [
                          'Vanilla JS',
                          'High',
                          'Medium',
                          'Low',
                          'Simple interactions, Performance-critical'
                        ],
                        [
                          'ExtJS',
                          'Low',
                          'Low',
                          'High',
                          'Complex data grids, Enterprise forms'
                        ],
                        [
                          'TypeScript',
                          'N/A',
                          'High',
                          'High',
                          'Business logic, Type safety'
                        ],
                      ]}
                    />
                  </BlockStack>
                )}

                {selectedTab === 2 && (
                  <BlockStack gap="400">
                    <Heading element="h3">Layer Communication Patterns</Heading>
                    <BlockStack gap="300">
                      <Card sectioned>
                        <Text fontWeight="semibold">Event-Driven Architecture</Text>
                        <Text as="p" tone="subdued">
                          Layers communicate through a centralized event system, ensuring loose coupling and clear separation of concerns.
                        </Text>
                        <List>
                          <List.Item>TypeScript layer publishes business events</List.Item>
                          <List.Item>UI layers subscribe to relevant events</List.Item>
                          <List.Item>ExtJS components handle data events</List.Item>
                          <List.Item>Vanilla JS manages DOM events efficiently</List.Item>
                        </List>
                      </Card>

                      <Card sectioned>
                        <Text fontWeight="semibold">Data Flow Direction</Text>
                        <Text as="p" tone="subdued">
                          Data flows from business logic through data components to presentation layers.
                        </Text>
                        <List>
                          <List.Item>TypeScript → Data Models → Business Rules</List.Item>
                          <List.Item>ExtJS → Data Grids → Form Controls</List.Item>
                          <List.Item>Vanilla JS → DOM Events → User Interactions</List.Item>
                          <List.Item>React → UI Components → Visual Updates</List.Item>
                        </List>
                      </Card>
                    </BlockStack>
                  </BlockStack>
                )}

                {selectedTab === 3 && (
                  <BlockStack gap="400">
                    <Heading element="h3">Migration Paths</Heading>
                    <Grid columns={{ sm: 1, md: 2 }} gap="400">
                      <Card>
                        <BlockStack gap="300">
                          <Text fontWeight="semibold">Vanilla JS → React</Text>
                          <Text as="p" tone="subdued">
                            Gradually replace vanilla JS interactions with React components while maintaining functionality.
                          </Text>
                          <List>
                            <List.Item>Start with simple components</List.Item>
                            <List.Item>Maintain existing event handlers</List.Item>
                            <List.Item>Test component isolation</List.Item>
                          </List>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="300">
                          <Text fontWeight="semibold">ExtJS → Modern Alternatives</Text>
                          <Text as="p" tone="subdued">
                            Replace ExtJS data components with modern alternatives while preserving functionality.
                          </Text>
                          <List>
                            <List.Item>Migrate data grids incrementally</List.Item>
                            <List.Item>Preserve data models</List.Item>
                            <List.Item>Maintain API compatibility</List.Item>
                          </List>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="300">
                          <Text fontWeight="semibold">JavaScript → TypeScript</Text>
                          <Text as="p" tone="subdued">
                            Add type safety gradually to existing JavaScript codebases.
                          </Text>
                          <List>
                            <List.Item>Start with type definitions</List.Item>
                            <List.Item>Add interfaces for data models</List.Item>
                            <List.Item>Enable strict mode progressively</List.Item>
                          </List>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="300">
                          <Text fontWeight="semibold">Monolith → Microservices</Text>
                          <Text as="p" tone="subdued">
                            Break down monolithic applications using the layer architecture as a guide.
                          </Text>
                          <List>
                            <List.Item>Identify layer boundaries</List.Item>
                            <List.Item>Extract business logic first</List.Item>
                            <List.Item>Maintain API contracts</List.Item>
                          </List>
                        </BlockStack>
                      </Card>
                    </Grid>
                  </BlockStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Architecture Benefits</Heading>
                <List>
                  <List.Item>Clear separation of concerns</List.Item>
                  <List.Item>Independent layer development</List.Item>
                  <List.Item>Flexible technology choices</List.Item>
                  <List.Item>Improved maintainability</List.Item>
                  <List.Item>Better team collaboration</List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Key Principles</Heading>
                <List>
                  <List.Item>Layer independence</List.Item>
                  <List.Item>Event-driven communication</List.Item>
                  <List.Item>Type safety throughout</List.Item>
                  <List.Item>Performance optimization</List.Item>
                  <List.Item>Framework agnostic</List.Item>
                </List>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const ReactLayer: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Page
        title="React Layer"
        subtitle="Modern UI Components with Shopify Polaris"
        breadcrumbs={[
          { content: 'Architecture', url: '/architecture' },
          { content: 'React Layer', url: '/architecture/react' }
        ]}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading element="h2">When to Use React Components</Heading>
                <Text as="p">
                  React components are ideal for modern, interactive user interfaces that require
                  state management, component composition, and extensive customization.
                </Text>

                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">✅ Use React For:</Heading>
                      <List>
                        <List.Item>Complex UI with state management</List.Item>
                        <List.Item>Component-heavy applications</List.Item>
                        <List.Item>Interactive dashboards</List.Item>
                        <List.Item>Real-time data visualization</List.Item>
                        <List.Item>Form-heavy applications</List.Item>
                        <List.Item>Modern web applications</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">⚠️ Consider Alternatives For:</Heading>
                      <List>
                        <List.Item>Simple static content</List.Item>
                        <List.Item>Performance-critical operations</List.Item>
                        <List.Item>Legacy browser support</List.Item>
                        <List.Item>Minimal JavaScript requirements</List.Item>
                        <List.Item>Server-side rendering only</List.Item>
                      </List>
                    </BlockStack>
                  </Card>
                </Grid>

                <Divider />

                <Heading element="h3">React Component Examples</Heading>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card sectioned>
                    <Text fontWeight="semibold">Interactive Form Component</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  });

  return (
    <Card>
      <FormLayout>
        <TextField
          label="Product Name"
          value={formData.name}
          onChange={(value) =>
            setFormData({...formData, name: value})
          }
        />
        <TextField
          label="Price"
          value={formData.price}
          onChange={(value) =>
            setFormData({...formData, price: value})
          }
        />
        <Select
          label="Category"
          options={categories}
          value={formData.category}
          onChange={(value) =>
            setFormData({...formData, category: value})
          }
        />
      </FormLayout>
    </Card>
  );
};`}
                    </pre>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">State Management Example</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await api.getProducts();
    setProducts(data);
    setLoading(false);
  };

  return (
    <Card>
      {loading ? (
        <Spinner />
      ) : (
        <ResourceList
          items={products}
          renderItem={(item) => (
            <ResourceItem
              onClick={() => setSelectedProduct(item)}
            >
              <Text>{item.name}</Text>
            </ResourceItem>
          )}
        />
      )}
    </Card>
  );
};`}
                    </pre>
                  </Card>
                </Grid>

                <Card sectioned>
                  <BlockStack gap="300">
                    <Heading element="h3">Integration with Other Layers</Heading>
                    <Text as="p" tone="subdued">
                      React components subscribe to events from other layers and emit user interactions back through the event system.
                    </Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto'
                    }}>
{`import { EventBus } from '@cin7/core';

const ProductCard = ({ product }) => {
  const handleEdit = () => {
    EventBus.emit('product:edit', { productId: product.id });
  };

  const handleDelete = () => {
    EventBus.emit('product:delete', { productId: product.id });
  };

  useEffect(() => {
    const handleUpdate = (data) => {
      if (data.productId === product.id) {
        // Refresh product data
      }
    };

    EventBus.on('product:updated', handleUpdate);
    return () => EventBus.off('product:updated', handleUpdate);
  }, [product.id]);

  return (
    <Card>
      <Text>{product.name}</Text>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Card>
  );
};`}
                    </pre>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">React Benefits</Heading>
                <List>
                  <List.Item>Component reusability</List.Item>
                  <List.Item>State management</List.Item>
                  <List.Item>Rich ecosystem</List.Item>
                  <List.Item>Developer tools</List.Item>
                  <List.Item>Community support</List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Performance Tips</Heading>
                <List>
                  <List.Item>Use React.memo for expensive components</List.Item>
                  <List.Item>Implement virtual scrolling for large lists</List.Item>
                  <List.Item>Lazy load components when possible</List.Item>
                  <List.Item>Optimize re-renders with useMemo/useCallback</List.Item>
                </List>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  ),
};

export const VanillaJSLayer: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Page
        title="Vanilla JS Layer"
        subtitle="Lightweight DOM Manipulation and Interactions"
        breadcrumbs={[
          { content: 'Architecture', url: '/architecture' },
          { content: 'Vanilla JS Layer', url: '/architecture/vanilla' }
        ]}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading element="h2">When to Use Vanilla JavaScript</Heading>
                <Text as="p">
                  Vanilla JavaScript provides optimal performance for DOM manipulation,
                  event handling, and lightweight interactions without framework overhead.
                </Text>

                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">✅ Use Vanilla JS For:</Heading>
                      <List>
                        <List.Item>Performance-critical operations</List.Item>
                        <List.Item>Simple DOM manipulations</List.Item>
                        <List.Item>Event handling and listeners</List.Item>
                        <List.Item>Lightweight interactions</List.Item>
                        <List.Item>Mobile-first applications</List.Item>
                        <List.Item>Legacy browser compatibility</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">⚠️ Consider Alternatives For:</Heading>
                      <List>
                        <List.Item>Complex state management</List.Item>
                        <List.Item>Heavy component composition</List.Item>
                        <List.Item>Complex UI interactions</List.Item>
                        <List.Item>Team-based development</List.Item>
                        <List.Item>Rapid prototyping needs</List.Item>
                      </List>
                    </BlockStack>
                  </Card>
                </Grid>

                <Divider />

                <Heading element="h3">Vanilla JS Component Examples</Heading>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card sectioned>
                    <Text fontWeight="semibold">DOM Manipulation</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`// Efficient DOM manipulation
class ProductCard {
  constructor(element, product) {
    this.element = element;
    this.product = product;
    this.render();
    this.bindEvents();
  }

  render() {
    this.element.innerHTML =
      '<div class="product-card">' +
        '<h3>' + this.product.name + '</h3>' +
        '<p>' + this.product.price + '</p>' +
        '<button class="edit-btn">Edit</button>' +
        '<button class="delete-btn">Delete</button>' +
      '</div>';
  }

  bindEvents() {
    const editBtn = this.element.querySelector('.edit-btn');
    const deleteBtn = this.element.querySelector('.delete-btn');

    editBtn.addEventListener('click', () => {
      EventBus.emit('product:edit', {
        productId: this.product.id
      });
    });

    deleteBtn.addEventListener('click', () => {
      EventBus.emit('product:delete', {
        productId: this.product.id
      });
    });
  }
}`}
                    </pre>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">Event Handling</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`// Efficient event delegation
class ProductList {
  constructor(container) {
    this.container = container;
    this.products = [];
    this.bindEvents();
    this.subscribeToEvents();
  }

  bindEvents() {
    // Use event delegation for performance
    this.container.addEventListener('click', (e) => {
      if (e.target.matches('.edit-btn')) {
        const productId = e.target.dataset.productId;
        EventBus.emit('product:edit', { productId });
      }

      if (e.target.matches('.delete-btn')) {
        const productId = e.target.dataset.productId;
        EventBus.emit('product:delete', { productId });
      }
    });
  }

  subscribeToEvents() {
    EventBus.on('products:loaded', (data) => {
      this.products = data.products;
      this.render();
    });
  }

  render() {
    // Efficient DOM updates
    const fragment = document.createDocumentFragment();

    this.products.forEach(product => {
      const card = new ProductCard(
        document.createElement('div'),
        product
      );
      fragment.appendChild(card.element);
    });

    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  }
}`}
                    </pre>
                  </Card>
                </Grid>

                <Card sectioned>
                  <BlockStack gap="300">
                    <Heading element="h3">Performance Optimization</Heading>
                    <Text as="p" tone="subdued">
                      Vanilla JavaScript excels at performance-critical operations with minimal overhead.
                    </Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto'
                    }}>
{`// Performance-optimized utilities
class PerformanceUtils {
  // Debounce for frequent events
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Throttle for scroll/resize events
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Efficient DOM queries
  static cacheElements(selectors) {
    const cache = {};
    Object.keys(selectors).forEach(key => {
      cache[key] = document.querySelector(selectors[key]);
    });
    return cache;
  }
}`}
                    </pre>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Vanilla JS Benefits</Heading>
                <List>
                  <List.Item>Maximum performance</List.Item>
                  <List.Item>No framework overhead</List.Item>
                  <List.Item>Universal browser support</List.Item>
                  <List.Item>Smaller bundle sizes</List.Item>
                  <List.Item>Faster load times</List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Best Practices</Heading>
                <List>
                  <List.Item>Use event delegation</List.Item>
                  <List.Item>Cache DOM queries</List.Item>
                  <List.Item>Implement debouncing/throttling</List.Item>
                  <List.Item>Minimize DOM manipulations</List.Item>
                  <List.Item>Use document fragments</List.Item>
                </List>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  ),
};

export const ExtJSLayer: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Page
        title="ExtJS Layer"
        subtitle="Enterprise-Grade Data Components"
        breadcrumbs={[
          { content: 'Architecture', url: '/architecture' },
          { content: 'ExtJS Layer', url: '/architecture/extjs' }
        ]}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading element="h2">When to Use ExtJS Components</Heading>
                <Text as="p">
                  ExtJS provides powerful, enterprise-grade data components ideal for complex
                  data grids, sophisticated forms, and large-scale enterprise applications.
                </Text>

                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">✅ Use ExtJS For:</Heading>
                      <List>
                        <List.Item>Complex data grids (1000+ rows)</List.Item>
                        <List.Item>Enterprise form controls</List.Item>
                        <List.Item>Data-intensive applications</List.Item>
                        <List.Item>Advanced filtering/sorting</List.Item>
                        <List.Item>Grouping and aggregations</List.Item>
                        <List.Item>Legacy enterprise systems</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">⚠️ Consider Alternatives For:</Heading>
                      <List>
                        <List.Item>Simple data displays</List.Item>
                        <List.Item>Mobile-first applications</List.Item>
                        <List.Item>Modern UI requirements</List.Item>
                        <List.Item>Lightweight applications</List.Item>
                        <List.Item>Small datasets (&lt;100 items)</List.Item>
                      </List>
                    </BlockStack>
                  </Card>
                </Grid>

                <Divider />

                <Heading element="h3">ExtJS Component Examples</Heading>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card sectioned>
                    <Text fontWeight="semibold">Data Grid Component</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`// ExtJS Data Grid with advanced features
const ProductGrid = Ext.create('Ext.grid.Panel', {
  title: 'Products',
  store: ProductStore,
  features: [
    { ftype: 'grouping' },
    { ftype: 'filters', local: true },
    { ftype: 'summary' }
  ],
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Price', dataIndex: 'price',
      renderer: Ext.util.Format.usMoney },
    { text: 'Category', dataIndex: 'category' },
    { text: 'Stock', dataIndex: 'quantity',
      renderer: (value) => {
        return value > 0 ?
          '<span class="stock-available">' + value + '</span>' :
          '<span class="stock-out">Out of Stock</span>';
      }
    }
  ],
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { text: 'Add Product', iconCls: 'x-fa fa-plus' },
      { text: 'Refresh', iconCls: 'x-fa fa-refresh' },
      '->',
      { xtype: 'textfield',
        emptyText: 'Search products...',
        listeners: {
          change: function(field, value) {
            ProductStore.filter('name', value);
          }
        }
      }
    ]
  }],
  listeners: {
    itemdblclick: function(grid, record) {
      EventBus.emit('product:edit', {
        productId: record.get('id')
      });
    }
  }
});`}
                    </pre>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">Advanced Form Component</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`// ExtJS Form with validation
const ProductForm = Ext.create('Ext.form.Panel', {
  title: 'Product Information',
  bodyPadding: 10,
  defaultType: 'textfield',
  defaults: {
    anchor: '100%',
    labelWidth: 100
  },
  items: [
    {
      fieldLabel: 'Product Name',
      name: 'name',
      allowBlank: false,
      maxLength: 100
    },
    {
      fieldLabel: 'Price',
      name: 'price',
      xtype: 'numberfield',
      allowBlank: false,
      minValue: 0,
      decimalPrecision: 2
    },
    {
      fieldLabel: 'Category',
      name: 'category',
      xtype: 'combobox',
      store: CategoryStore,
      displayField: 'name',
      valueField: 'id',
      allowBlank: false
    },
    {
      fieldLabel: 'Description',
      name: 'description',
      xtype: 'textarea',
      height: 100
    }
  ],
  buttons: [
    {
      text: 'Save',
      handler: function() {
        if (this.up('form').isValid()) {
          const formData = this.up('form').getValues();
          EventBus.emit('product:save', formData);
        }
      }
    },
    {
      text: 'Cancel',
      handler: function() {
        this.up('window').close();
      }
    }
  ]
});`}
                    </pre>
                  </Card>
                </Grid>

                <Card sectioned>
                  <BlockStack gap="300">
                    <Heading element="h3">Data Store Integration</Heading>
                    <Text as="p" tone="subdued">
                      ExtJS stores integrate with the event system for seamless data management.
                    </Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto'
                    }}>
{`// ExtJS Store with event integration
const ProductStore = Ext.create('Ext.data.Store', {
  model: 'Product',
  autoLoad: true,
  proxy: {
    type: 'rest',
    url: '/api/products',
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  },
  listeners: {
    load: function(store, records) {
      EventBus.emit('products:loaded', {
        products: records.map(r => r.getData())
      });
    },
    update: function(store, record) {
      EventBus.emit('product:updated', {
        productId: record.get('id'),
        data: record.getData()
      });
    },
    remove: function(store, record) {
      EventBus.emit('product:deleted', {
        productId: record.get('id')
      });
    }
  }
});

// Subscribe to external events
EventBus.on('product:filter', function(filterData) {
  ProductStore.clearFilter();
  if (filterData.category) {
    ProductStore.filter('category', filterData.category);
  }
  if (filterData.search) {
    ProductStore.filter({
      property: 'name',
      value: filterData.search,
      anyMatch: true
    });
  }
});`}
                    </pre>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">ExtJS Benefits</Heading>
                <List>
                  <List.Item>Robust data components</List.Item>
                  <List.Item>Advanced grid features</List.Item>
                  <List.Item>Enterprise-grade forms</List.Item>
                  <List.Item>Built-in data validation</List.Item>
                  <List.Item>Theme system</List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Performance Considerations</Heading>
                <List>
                  <List.Item>Use buffered rendering for large datasets</List.Item>
                  <List.Item>Implement virtual scrolling</List.Item>
                  <List.Item>Cache store data appropriately</List.Item>
                  <List.Item>Use web workers for data processing</List.Item>
                </List>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  ),
};

export const TypeScriptLayer: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Page
        title="TypeScript Layer"
        subtitle="Type-Safe Business Logic and Domain Modeling"
        breadcrumbs={[
          { content: 'Architecture', url: '/architecture' },
          { content: 'TypeScript Layer', url: '/architecture/typescript' }
        ]}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading element="h2">When to Use TypeScript</Heading>
                <Text as="p">
                  TypeScript provides type safety and domain modeling for business logic,
                  ensuring robust, maintainable code with excellent developer experience.
                </Text>

                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">✅ Use TypeScript For:</Heading>
                      <List>
                        <List.Item>Business logic implementation</List.Item>
                        <List.Item>Domain modeling and entities</List.Item>
                        <List.Item>API integration and data contracts</List.Item>
                        <List.Item>Complex state management</List.Item>
                        <List.Item>Team-based development</List.Item>
                        <List.Item>Large-scale applications</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="300">
                      <Heading element="h3">⚠️ Consider Alternatives For:</Heading>
                      <List>
                        <List.Item>Simple scripts and utilities</List.Item>
                        <List.Item>Quick prototypes</List.Item>
                        <List.Item>Learning JavaScript basics</List.Item>
                        <List.Item>Minimal type requirements</List.Item>
                        <List.Item>Very small projects</List.Item>
                      </List>
                    </BlockStack>
                  </Card>
                </Grid>

                <Divider />

                <Heading element="h3">TypeScript Component Examples</Heading>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card sectioned>
                    <Text fontWeight="semibold">Domain Models</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`// Product domain model with type safety
export interface Product {
  readonly id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description?: string;
  inStock: boolean;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FOOD = 'food',
  BOOKS = 'books'
}

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}

// Type-safe repository pattern
export class ProductRepository {
  async findById(id: string): Promise<Product | null> {
    // Implementation with type safety
  }

  async findMany(filters: ProductFilters): Promise<Product[]> {
    // Implementation with typed filters
  }

  async create(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    // Implementation with type validation
  }

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    // Implementation with partial updates
  }
}`}
                    </pre>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">Business Logic Services</Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto',
                      marginTop: '12px'
                    }}>
{`// Type-safe business logic
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private eventBus: EventBus
  ) {}

  async createProduct(productData: CreateProductDto): Promise<Product> {
    // Validate business rules
    this.validateProductData(productData);

    // Check inventory constraints
    await this.checkInventoryConstraints(productData);

    // Create product
    const product = await this.productRepository.create({
      ...productData,
      inStock: productData.quantity > 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Emit domain events
    this.eventBus.emit('product:created', { product });

    return product;
  }

  async updateStock(productId: string, newQuantity: number): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const wasInStock = product.inStock;
    const isInStock = newQuantity > 0;

    await this.productRepository.update(productId, {
      quantity: newQuantity,
      inStock: isInStock,
      updatedAt: new Date()
    });

    // Emit stock change events
    this.eventBus.emit('product:stock:updated', {
      productId,
      previousQuantity: product.quantity,
      newQuantity,
      wasInStock,
      isInStock
    });

    // Emit out-of-stock alert if needed
    if (wasInStock && !isInStock) {
      this.eventBus.emit('product:out_of_stock', { productId });
    }
  }

  private validateProductData(data: CreateProductDto): void {
    if (data.price <= 0) {
      throw new Error('Price must be greater than 0');
    }
    if (data.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
  }
}`}
                    </pre>
                  </Card>
                </Grid>

                <Card sectioned>
                  <BlockStack gap="300">
                    <Heading element="h3">Event System Integration</Heading>
                    <Text as="p" tone="subdued">
                      TypeScript provides type safety for event payloads and handlers.
                    </Text>
                    <pre style={{
                      background: '#f8f9fa',
                      padding: '12px',
                      borderRadius: '4px',
                      fontSize: "14px",
                      overflow: 'auto'
                    }}>
{`// Type-safe event definitions
export interface ProductEvents {
  'product:created': { product: Product };
  'product:updated': { productId: string; changes: Partial<Product> };
  'product:deleted': { productId: string };
  'product:stock:updated': {
    productId: string;
    previousQuantity: number;
    newQuantity: number;
    wasInStock: boolean;
    isInStock: boolean;
  };
  'product:out_of_stock': { productId: string };
  'products:filtered': { filters: ProductFilters; results: Product[] };
}

// Type-safe event bus
export class TypedEventBus {
  private listeners: { [K in keyof ProductEvents]?: Array<(data: ProductEvents[K]) => void> } = {};

  on<K extends keyof ProductEvents>(
    event: K,
    listener: (data: ProductEvents[K]) => void
  ): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(listener);
  }

  off<K extends keyof ProductEvents>(
    event: K,
    listener: (data: ProductEvents[K]) => void
  ): void {
    const index = this.listeners[event]?.indexOf(listener) ?? -1;
    if (index > -1) {
      this.listeners[event]?.splice(index, 1);
    }
  }

  emit<K extends keyof ProductEvents>(event: K, data: ProductEvents[K]): void {
    this.listeners[event]?.forEach(listener => listener(data));
  }
}

// Usage with type safety
const eventBus = new TypedEventBus();

// Type-safe event subscription
eventBus.on('product:created', (data) => {
  console.log('Product created: ' + data.product.name);
  // data.product is fully typed
});

// Type-safe event emission
eventBus.emit('product:created', {
  product: {
    id: '123',
    name: 'Test Product',
    price: 99.99,
    category: ProductCategory.ELECTRONICS,
    inStock: true,
    quantity: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  // All required properties are enforced
});`}
                    </pre>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">TypeScript Benefits</Heading>
                <List>
                  <List.Item>Compile-time type checking</List.Item>
                  <List.Item>Better IDE support</List.Item>
                  <List.Item>Self-documenting code</List.Item>
                  <List.Item>Easier refactoring</List.Item>
                  <List.Item>Domain modeling tools</List.Item>
                </List>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Best Practices</Heading>
                <List>
                  <List.Item>Use strict mode</List.Item>
                  <List.Item>Define interfaces for all data structures</List.Item>
                  <List.Item>Leverage generics for reusable components</List.Item>
                  <List.Item>Use union types for enums</List.Item>
                  <List.Item>Implement proper error handling types</List.Item>
                </List>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  ),
};

export const LayerDecisionGuide: Story = {
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <Page
        title="Layer Decision Guide"
        subtitle="Choose the right layer for your specific use case"
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading element="h2">Decision Matrix</Heading>
                <Text as="p">
                  Use this guide to choose the most appropriate layer for your specific requirements.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'text', 'text', 'text']}
                  headings={['Requirement', 'React', 'Vanilla JS', 'ExtJS', 'TypeScript']}
                  rows={[
                    [
                      'Performance Critical',
                      'Medium',
                      'High ⭐',
                      'Low',
                      'N/A'
                    ],
                    [
                      'Complex UI State',
                      'High ⭐',
                      'Low',
                      'Medium',
                      'High ⭐'
                    ],
                    [
                      'Large Data Sets',
                      'Medium',
                      'Low',
                      'High ⭐',
                      'High ⭐'
                    ],
                    [
                      'Team Development',
                      'High ⭐',
                      'Medium',
                      'Medium',
                      'High ⭐'
                    ],
                    [
                      'Type Safety',
                      'Medium',
                      'Low',
                      'Low',
                      'High ⭐'
                    ],
                    [
                      'Learning Curve',
                      'Medium',
                      'Low ⭐',
                      'High',
                      'Medium'
                    ],
                    [
                      'Bundle Size',
                      'Medium',
                      'Low ⭐',
                      'High',
                      'Low ⭐'
                    ],
                    [
                      'Browser Compatibility',
                      'Medium',
                      'High ⭐',
                      'Medium',
                      'Medium'
                    ]
                  ]}
                />

                <Divider />

                <Heading element="h3">Scenario-Based Recommendations</Heading>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <Card sectioned>
                    <Text fontWeight="semibold">🛒 E-commerce Product Page</Text>
                    <Text as="p" tone="subdued">Interactive product catalog with filters, variants, and cart functionality.</Text>
                    <BlockStack gap="200">
                      <Text><strong>Recommended Stack:</strong></Text>
                      <List>
                        <List.Item>React for UI components and interactivity</List.Item>
                        <List.Item>TypeScript for product models and business logic</List.Item>
                        <List.Item>Vanilla JS for performance-critical animations</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">📊 Admin Dashboard</Text>
                    <Text as="p" tone="subdued">Data-heavy interface with tables, charts, and real-time updates.</Text>
                    <BlockStack gap="200">
                      <Text><strong>Recommended Stack:</strong></Text>
                      <List>
                        <List.Item>ExtJS for complex data grids and filtering</List.Item>
                        <List.Item>TypeScript for data models and validation</List.Item>
                        <List.Item>React for charts and visualizations</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">📱 Mobile-First Application</Text>
                    <Text as="p" tone="subdued">Lightweight mobile application with focus on performance and battery life.</Text>
                    <BlockStack gap="200">
                      <Text><strong>Recommended Stack:</strong></Text>
                      <List>
                        <List.Item>Vanilla JS for optimal performance</List.Item>
                        <List.Item>TypeScript for maintainability</List.Item>
                        <List.Item>Minimal React for complex components only</List.Item>
                      </List>
                    </BlockStack>
                  </Card>

                  <Card sectioned>
                    <Text fontWeight="semibold">🏢 Enterprise Legacy System</Text>
                    <Text as="p" tone="subdued">Large-scale enterprise application with existing ExtJS infrastructure.</Text>
                    <BlockStack gap="200">
                      <Text><strong>Recommended Stack:</strong></Text>
                      <List>
                        <List.Item>ExtJS for existing data components</List.Item>
                        <List.Item>React for new UI components</List.Item>
                        <List.Item>TypeScript for gradual migration</List.Item>
                      </List>
                    </BlockStack>
                  </Card>
                </Grid>

                <Card sectioned>
                  <BlockStack gap="300">
                    <Heading element="h3">🎯 General Guidelines</Heading>
                    <List type="number">
                      <List.Item><strong>Start with TypeScript</strong> - Use TypeScript for all business logic and data models</List.Item>
                      <List.Item><strong>Choose UI layer based on complexity</strong> - React for complex UI, Vanilla JS for simple interactions</List.Item>
                      <List.Item><strong>Use ExtJS for data-heavy features</strong> - When you need advanced grids or enterprise forms</List.Item>
                      <List.Item><strong>Consider your team</strong> - Choose technologies that match your team's skills</List.Item>
                      <List.Item><strong>Think about maintenance</strong> - Balance initial development speed with long-term maintainability</List.Item>
                      <List.Item><strong>Performance matters</strong> - Choose the most performant option for critical features</List.Item>
                    </List>
                  </BlockStack>
                </Card>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Quick Reference</Heading>
                <BlockStack gap="200">
                  <Text fontWeight="semibold">Performance Critical:</Text>
                  <Text>Vanilla JS → React → ExtJS</Text>

                  <Text fontWeight="semibold">Complex UI:</Text>
                  <Text>React → ExtJS → Vanilla JS</Text>

                  <Text fontWeight="semibold">Type Safety:</Text>
                  <Text>TypeScript → React → Others</Text>

                  <Text fontWeight="semibold">Data Heavy:</Text>
                  <Text>ExtJS → React → Others</Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  ),
};