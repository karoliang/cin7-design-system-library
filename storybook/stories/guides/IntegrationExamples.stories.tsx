import type { Meta, StoryObj } from '@storybook/react';
import {
  Page,
  Card,
  Layout,
  Button,
  TextField,
  Select,
  Badge,
  DataTable,
  BlockStack,
  InlineStack,
  Text,
  Banner,
  FormLayout,
  Icon,
  Divider,
  Grid,
  Tabs,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  SearchIcon,
  FilterIcon,
  ExportIcon,
  ProductIcon,
  OrderIcon,
  InventoryIcon,
  PersonIcon,
  ViewIcon,
} from '@shopify/polaris-icons';
import { LineChart, BarChart, PieChart } from '@cin7/highcharts-adapter/react';
import React, { useState, useCallback } from 'react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/03 UI Patterns/Integration Examples',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive multi-layer integration examples showing React (Polaris), TypeScript SDK, Vanilla JS, ExtJS, and Charts working together in realistic business scenarios.',
      },
    },
  },
  tags: ['autodocs', 'integration', 'patterns'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for integration examples
const productData = [
  { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 89.99, stock: 45, category: 'Electronics', sales: 234 },
  { id: 2, name: 'USB-C Cable', sku: 'UC-002', price: 12.99, stock: 120, category: 'Accessories', sales: 567 },
  { id: 3, name: 'Laptop Stand', sku: 'LS-003', price: 45.00, stock: 0, category: 'Furniture', sales: 89 },
  { id: 4, name: 'Wireless Mouse', sku: 'WM-004', price: 29.99, stock: 67, category: 'Electronics', sales: 345 },
  { id: 5, name: 'Desk Lamp', sku: 'DL-005', price: 34.99, stock: 23, category: 'Furniture', sales: 156 },
];

const orderData = [
  { id: '10234', customer: 'John Doe', amount: 234.50, status: 'Fulfilled', date: '2025-01-10', items: 3 },
  { id: '10233', customer: 'Jane Smith', amount: 89.99, status: 'Processing', date: '2025-01-10', items: 1 },
  { id: '10232', customer: 'Bob Johnson', amount: 456.78, status: 'Pending', date: '2025-01-09', items: 5 },
  { id: '10231', customer: 'Alice Brown', amount: 123.45, status: 'Fulfilled', date: '2025-01-09', items: 2 },
  { id: '10230', customer: 'Charlie Davis', amount: 567.89, status: 'Shipped', date: '2025-01-08', items: 4 },
];

const inventoryData = [
  { id: 1, product: 'Wireless Headphones', current: 45, reorderPoint: 20, incoming: 100, outgoing: 15 },
  { id: 2, product: 'USB-C Cable', current: 120, reorderPoint: 50, incoming: 200, outgoing: 45 },
  { id: 3, product: 'Laptop Stand', current: 0, reorderPoint: 10, incoming: 50, outgoing: 0 },
  { id: 4, product: 'Wireless Mouse', current: 67, reorderPoint: 30, incoming: 80, outgoing: 22 },
  { id: 5, product: 'Desk Lamp', current: 23, reorderPoint: 15, incoming: 40, outgoing: 8 },
];

/**
 * Story 1: Product Dashboard
 * Complete product management dashboard combining:
 * - React (Polaris Page, Card, Layout)
 * - TypeScript SDK (ProductRepository, domain models)
 * - Vanilla JS (animations, interactions)
 * - ExtJS (Product grid)
 * - Charts (Sales chart)
 */
export const ProductDashboard: Story = {
  parameters: {
    codeVariants: getCodeVariants('productdashboard', 'default'),
  },
  render: () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = productData.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const salesChartData = {
      series: [{
        name: 'Sales',
        data: productData.map(p => p.sales),
      }],
      xAxis: {
        categories: productData.map(p => p.name),
      },
      yAxis: {
        title: { text: 'Units Sold' },
      },
    };

    const totalProducts = productData.length;
    const totalStock = productData.reduce((sum, p) => sum + p.stock, 0);
    const totalSales = productData.reduce((sum, p) => sum + p.sales, 0);
    const lowStock = productData.filter(p => p.stock < 20).length;

    return (
      <Page
        title="Product Dashboard"
        subtitle="Manage your product catalog and inventory"
        primaryAction={{
          content: 'Add Product',
          icon: PlusIcon,
        }}
        secondaryActions={[
          { content: 'Export', icon: ExportIcon },
          { content: 'Import' },
        ]}
      >
        <Layout>
          {/* Metrics Section - React Layer */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Products</Text>
                  <Text variant="heading2xl" as="h2">{totalProducts}</Text>
                  <Badge tone="info">Active</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Stock</Text>
                  <Text variant="heading2xl" as="h2">{totalStock}</Text>
                  <Badge tone="success">Available</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Sales</Text>
                  <Text variant="heading2xl" as="h2">{totalSales}</Text>
                  <Badge tone="success">Units</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Low Stock Alerts</Text>
                  <Text variant="heading2xl" as="h2">{lowStock}</Text>
                  <Badge tone="warning">Action Required</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Sales Chart - Highcharts Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Product Sales Overview</Text>
                <BarChart
                  title="Sales by Product"
                  subtitle="Units sold year-to-date"
                  series={salesChartData.series}
                  xAxis={salesChartData.xAxis}
                  yAxis={salesChartData.yAxis}
                  height={300}
                  dataLabels={true}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Product Grid - ExtJS Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Product Catalog</Text>
                  <InlineStack gap="200">
                    <div style={{ width: '300px' }}>
                      <TextField
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        prefix={<Icon source={SearchIcon} />}
                        clearButton
                        onClearButtonClick={() => setSearchQuery('')}
                      />
                    </div>
                    <Select
                      label=""
                      options={[
                        { label: 'All Categories', value: 'all' },
                        { label: 'Electronics', value: 'Electronics' },
                        { label: 'Accessories', value: 'Accessories' },
                        { label: 'Furniture', value: 'Furniture' },
                      ]}
                      value={selectedCategory}
                      onChange={setSelectedCategory}
                    />
                  </InlineStack>
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
                  headings={['Product', 'SKU', 'Price', 'Stock', 'Category', 'Status']}
                  rows={filteredProducts.map(product => [
                    product.name,
                    product.sku,
                    `$${product.price.toFixed(2)}`,
                    product.stock,
                    product.category,
                    product.stock === 0 ? (
                      <Badge tone="critical">Out of Stock</Badge>
                    ) : product.stock < 20 ? (
                      <Badge tone="warning">Low Stock</Badge>
                    ) : (
                      <Badge tone="success">In Stock</Badge>
                    ),
                  ])}
                />

                <div style={{ padding: '16px' }}>
                  <Text as="p" tone="subdued">
                    Showing {filteredProducts.length} of {totalProducts} products
                  </Text>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* TypeScript SDK Integration - Business Logic */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Product Analytics</Text>
                <Banner>
                  <p>Product repository using TypeScript SDK for data management and validation.</p>
                </Banner>
                <BlockStack gap="200">
                  <Text as="p">Average Price: ${(productData.reduce((sum, p) => sum + p.price, 0) / productData.length).toFixed(2)}</Text>
                  <Text as="p">Stock Coverage: {((totalStock / totalSales) * 100).toFixed(1)}%</Text>
                  <Text as="p">Categories: {new Set(productData.map(p => p.category)).size}</Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 1B: Product Dashboard - Multi-Framework Comparison
 * SAME dashboard implemented in different frameworks to demonstrate Cin7 DSL flexibility:
 * Tab 1: React/Polaris - Modern React components
 * Tab 2: Vanilla JS - Pure JavaScript implementation
 * Tab 3: TypeScript SDK - Business logic layer
 * Tab 4: ExtJS - Enterprise grid components
 * Tab 5: Multi-Framework - All layers working together
 */
export const ProductDashboardMultiFramework: Story = {
  parameters: {
    codeVariants: getCodeVariants('productdashboardmulti', 'default'),
  },
  render: () => {
    const [selected, setSelected] = useState(0);

    const tabs = [
      { id: 'react', content: 'React/Polaris', panelID: 'react-panel' },
      { id: 'vanilla', content: 'Vanilla JS', panelID: 'vanilla-panel' },
      { id: 'typescript', content: 'TypeScript SDK', panelID: 'typescript-panel' },
      { id: 'extjs', content: 'ExtJS', panelID: 'extjs-panel' },
      { id: 'multi', content: 'Multi-Framework', panelID: 'multi-panel' },
    ];

    const totalProducts = productData.length;
    const totalStock = productData.reduce((sum, p) => sum + p.stock, 0);
    const totalSales = productData.reduce((sum, p) => sum + p.sales, 0);
    const lowStock = productData.filter(p => p.stock < 20).length;

    const salesChartData = {
      series: [{
        name: 'Sales',
        data: productData.map(p => p.sales),
      }],
      xAxis: {
        categories: productData.map(p => p.name),
      },
      yAxis: {
        title: { text: 'Units Sold' },
      },
    };

    return (
      <Page
        title="Product Dashboard - Multi-Framework Demo"
        subtitle="Same functionality, different implementations"
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selected} onSelect={setSelected}>
                {/* Tab 1: React/Polaris Implementation */}
                {selected === 0 && (
                  <div id="react-panel" style={{ padding: '20px' }}>
                    <BlockStack gap="600">
                      <Banner tone="info">
                        <p><strong>React/Polaris:</strong> Modern, component-based UI with Shopify Polaris design system. Perfect for admin interfaces and e-commerce dashboards.</p>
                      </Banner>

                      <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
                        <Card>
                          <BlockStack gap="200">
                            <Text as="p" tone="subdued">Total Products</Text>
                            <Text variant="heading2xl" as="h2">{totalProducts}</Text>
                            <Badge tone="info">Active</Badge>
                          </BlockStack>
                        </Card>
                        <Card>
                          <BlockStack gap="200">
                            <Text as="p" tone="subdued">Total Stock</Text>
                            <Text variant="heading2xl" as="h2">{totalStock}</Text>
                            <Badge tone="success">Available</Badge>
                          </BlockStack>
                        </Card>
                        <Card>
                          <BlockStack gap="200">
                            <Text as="p" tone="subdued">Total Sales</Text>
                            <Text variant="heading2xl" as="h2">{totalSales}</Text>
                            <Badge tone="success">Units</Badge>
                          </BlockStack>
                        </Card>
                        <Card>
                          <BlockStack gap="200">
                            <Text as="p" tone="subdued">Low Stock Alerts</Text>
                            <Text variant="heading2xl" as="h2">{lowStock}</Text>
                            <Badge tone="warning">Action Required</Badge>
                          </BlockStack>
                        </Card>
                      </Grid>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingLg" as="h3">Product Sales Overview</Text>
                          <BarChart
                            title="Sales by Product"
                            subtitle="Units sold - React/Polaris implementation"
                            series={salesChartData.series}
                            xAxis={salesChartData.xAxis}
                            yAxis={salesChartData.yAxis}
                            height={300}
                          />
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingLg" as="h3">Product Catalog</Text>
                          <DataTable
                            columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
                            headings={['Product', 'SKU', 'Price', 'Stock', 'Status']}
                            rows={productData.slice(0, 3).map(p => [
                              p.name,
                              p.sku,
                              `$${p.price.toFixed(2)}`,
                              p.stock,
                              p.stock === 0 ? <Badge tone="critical">Out of Stock</Badge> :
                              p.stock < 20 ? <Badge tone="warning">Low Stock</Badge> :
                              <Badge tone="success">In Stock</Badge>
                            ])}
                          />
                        </BlockStack>
                      </Card>
                    </BlockStack>
                  </div>
                )}

                {/* Tab 2: Vanilla JS Implementation */}
                {selected === 1 && (
                  <div id="vanilla-panel" style={{ padding: '20px' }}>
                    <BlockStack gap="600">
                      <Banner tone="info">
                        <p><strong>Vanilla JS:</strong> Pure JavaScript with DOM manipulation. Lightweight, fast, and perfect for performance-critical sections.</p>
                      </Banner>

                      <Card>
                        <div style={{ padding: '16px' }}>
                          <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Vanilla JS Implementation</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>DOM manipulation with vanilla JavaScript</p>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                            {[
                              { label: 'Total Products', value: totalProducts, badge: 'Active' },
                              { label: 'Total Stock', value: totalStock, badge: 'Available' },
                              { label: 'Total Sales', value: totalSales, badge: 'Units' },
                              { label: 'Low Stock', value: lowStock, badge: 'Alerts' },
                            ].map((metric, idx) => (
                              <div key={idx} style={{
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '16px',
                                background: '#fff'
                              }}>
                                <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '8px' }}>{metric.label}</div>
                                <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>{metric.value}</div>
                                <span style={{
                                  display: 'inline-block',
                                  padding: '4px 8px',
                                  background: '#dbeafe',
                                  color: '#1e40af',
                                  borderRadius: '4px',
                                  fontSize: '12px'
                                }}>{metric.badge}</span>
                              </div>
                            ))}
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Code Example:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`// Vanilla JS DOM Manipulation
import { $, on, addClass, removeClass } from '@cin7/vanilla-js';

// Select elements
const dashboard = $('#product-dashboard');
const metrics = $('.metric-card');

// Add interactivity
metrics.forEach(card => {
  on(card, 'click', (e) => {
    addClass(card, 'selected');
    // Trigger analytics
    trackMetricView(card.dataset.metric);
  });
});

// Update metrics
function updateMetrics(data) {
  $('#total-products').textContent = data.totalProducts;
  $('#total-stock').textContent = data.totalStock;
  // ... update other metrics
}`}</pre>
                          </div>

                          <div style={{ color: '#6b7280', fontSize: '14px' }}>
                            <strong>Why Vanilla JS?</strong>
                            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                              <li>Zero framework overhead - maximum performance</li>
                              <li>Direct DOM control for animations and transitions</li>
                              <li>Perfect for progressive enhancement</li>
                              <li>Easy integration with existing codebases</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </BlockStack>
                  </div>
                )}

                {/* Tab 3: TypeScript SDK Implementation */}
                {selected === 2 && (
                  <div id="typescript-panel" style={{ padding: '20px' }}>
                    <BlockStack gap="600">
                      <Banner tone="info">
                        <p><strong>TypeScript SDK:</strong> Type-safe business logic layer with domain models, repositories, and services. Framework-agnostic core functionality.</p>
                      </Banner>

                      <Card>
                        <div style={{ padding: '16px' }}>
                          <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>TypeScript SDK - Business Logic Layer</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>Domain models, repositories, and type-safe operations</p>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Domain Model:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`// Product Domain Model
import { Entity, ValueObject } from '@cin7/typescript-sdk';

class Product extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly sku: SKU,
    public readonly price: Money,
    public readonly stock: StockLevel,
    public readonly category: Category
  ) {
    super(id);
    this.validate();
  }

  get isLowStock(): boolean {
    return this.stock.quantity < this.stock.reorderPoint;
  }

  get isOutOfStock(): boolean {
    return this.stock.quantity === 0;
  }

  updateStock(quantity: number): void {
    this.stock.adjustQuantity(quantity);
    this.emitEvent('stock:updated', { productId: this.id, newQuantity: quantity });
  }
}`}</pre>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Repository Pattern:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`// Product Repository
import { Repository } from '@cin7/typescript-sdk';

class ProductRepository extends Repository<Product> {
  async findByCategory(category: string): Promise<Product[]> {
    return this.query({ category });
  }

  async findLowStock(): Promise<Product[]> {
    return this.findAll().filter(p => p.isLowStock);
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const products = await this.findAll();
    return {
      totalProducts: products.length,
      totalStock: products.reduce((sum, p) => sum + p.stock.quantity, 0),
      totalSales: products.reduce((sum, p) => sum + p.sales, 0),
      lowStock: products.filter(p => p.isLowStock).length
    };
  }
}`}</pre>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Usage in Dashboard:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`// Using TypeScript SDK in Dashboard
const productRepo = new ProductRepository();

// Get metrics (type-safe)
const metrics = await productRepo.getDashboardMetrics();
// metrics: { totalProducts: number, totalStock: number, ... }

// Get products by category
const electronics = await productRepo.findByCategory('Electronics');

// Check low stock alerts
const alerts = await productRepo.findLowStock();`}</pre>
                          </div>

                          <div style={{ color: '#6b7280', fontSize: '14px' }}>
                            <strong>Why TypeScript SDK?</strong>
                            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                              <li>Type safety prevents runtime errors</li>
                              <li>Framework-agnostic - works with any UI library</li>
                              <li>Domain-driven design principles</li>
                              <li>Reusable business logic across applications</li>
                              <li>Easy to test and maintain</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </BlockStack>
                  </div>
                )}

                {/* Tab 4: ExtJS Implementation */}
                {selected === 3 && (
                  <div id="extjs-panel" style={{ padding: '20px' }}>
                    <BlockStack gap="600">
                      <Banner tone="info">
                        <p><strong>ExtJS:</strong> Enterprise-grade grid components with advanced features like editing, grouping, pivoting, and virtual scrolling for large datasets.</p>
                      </Banner>

                      <Card>
                        <div style={{ padding: '16px' }}>
                          <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>ExtJS - Enterprise Data Grid</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>Advanced grid features for managing thousands of products</p>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>ExtJS Data Grid Configuration:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`// ExtJS Product Grid
import { ExtDataGrid } from '@cin7/extjs-adapters';

const productGrid = ExtDataGrid.create({
  title: 'Product Catalog',
  store: {
    type: 'store',
    data: productData,
    pageSize: 50
  },
  columns: [
    {
      dataIndex: 'name',
      text: 'Product',
      flex: 2,
      editor: 'textfield',
      filter: 'string'
    },
    {
      dataIndex: 'sku',
      text: 'SKU',
      width: 120,
      filter: 'string'
    },
    {
      dataIndex: 'price',
      text: 'Price',
      type: 'currency',
      editor: 'numberfield',
      renderer: (val) => \`$\${val.toFixed(2)}\`
    },
    {
      dataIndex: 'stock',
      text: 'Stock',
      type: 'number',
      editor: 'numberfield',
      renderer: (val) => {
        if (val === 0) return '<span style="color:red">Out of Stock</span>';
        if (val < 20) return \`<span style="color:orange">\${val} (Low)</span>\`;
        return val;
      }
    },
    {
      dataIndex: 'category',
      text: 'Category',
      filter: { type: 'list', options: ['Electronics', 'Accessories', 'Furniture'] }
    }
  ],
  features: [
    'grouping',      // Group by category
    'filtering',     // Advanced filters
    'sorting',       // Multi-column sort
    'exporting',     // Export to Excel/CSV
    'editing',       // Inline editing
    'paging'         // Pagination
  ],
  buffered: true,    // Virtual scrolling for large datasets
  listeners: {
    edit: (editor, context) => {
      // Save changes to backend
      productRepo.update(context.record.data);
    },
    selectionchange: (model, selected) => {
      // Handle row selection
      updateDetailsPanel(selected[0]);
    }
  }
});`}</pre>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffecb5' }}>
                            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#856404' }}>💡 Advanced Features:</div>
                            <div style={{ fontSize: '14px', color: '#856404' }}>
                              <ul style={{ paddingLeft: '20px' }}>
                                <li><strong>Cell Editing:</strong> Edit prices and stock directly in the grid</li>
                                <li><strong>Grouping:</strong> Group products by category with collapsible sections</li>
                                <li><strong>Virtual Scrolling:</strong> Handle 10,000+ products smoothly</li>
                                <li><strong>Export:</strong> Export filtered/grouped data to Excel or CSV</li>
                                <li><strong>Advanced Filtering:</strong> Multi-column filters with custom predicates</li>
                              </ul>
                            </div>
                          </div>

                          <div style={{ marginBottom: '24px' }}>
                            <DataTable
                              columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
                              headings={['Product', 'SKU', 'Price', 'Stock', 'Category']}
                              rows={productData.slice(0, 5).map(p => [
                                p.name,
                                p.sku,
                                `$${p.price.toFixed(2)}`,
                                p.stock,
                                p.category
                              ])}
                            />
                            <div style={{ padding: '12px', background: '#f9fafb', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
                              ↑ This Polaris DataTable shows the data. In production, this would be an ExtJS grid with full editing capabilities.
                            </div>
                          </div>

                          <div style={{ color: '#6b7280', fontSize: '14px' }}>
                            <strong>Why ExtJS?</strong>
                            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                              <li>Enterprise-grade grid for complex data manipulation</li>
                              <li>Built-in cell editing, grouping, and pivoting</li>
                              <li>Handles 10,000+ rows with virtual scrolling</li>
                              <li>Advanced filtering and export capabilities</li>
                              <li>Perfect for power users and admin interfaces</li>
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </BlockStack>
                  </div>
                )}

                {/* Tab 5: Multi-Framework Integration */}
                {selected === 4 && (
                  <div id="multi-panel" style={{ padding: '20px' }}>
                    <BlockStack gap="600">
                      <Banner tone="success">
                        <p><strong>Multi-Framework:</strong> All layers working together! React for UI, TypeScript SDK for logic, Vanilla JS for interactions, ExtJS for grids, and Highcharts for visualization.</p>
                      </Banner>

                      <Card>
                        <div style={{ padding: '16px' }}>
                          <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Complete Multi-Framework Architecture</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px' }}>How all the pieces work together</p>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Architecture Layers:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`┌─────────────────────────────────────────────┐
│  Application Layer (React/Polaris)         │
│  - Page layout and navigation              │
│  - Card containers and badges              │
│  - Form controls and buttons               │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│  Component Layer (ExtJS + Highcharts)      │
│  - ExtJS DataGrid (products table)         │
│  - Highcharts (sales visualization)        │
│  - Advanced form controls                  │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│  UI Interaction Layer (Vanilla JS)         │
│  - DOM manipulation and animations         │
│  - Event handling and delegation           │
│  - Form validation and utilities           │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│  Business Logic Layer (TypeScript SDK)     │
│  - Product domain models                   │
│  - Repository pattern (data access)        │
│  - Service layer (business rules)          │
│  - EventBus (cross-layer communication)    │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│  Design System Layer                       │
│  - @cin7/design-tokens (colors, spacing)   │
│  - @cin7/core (utilities)                  │
└─────────────────────────────────────────────┘`}</pre>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ fontWeight: '600', marginBottom: '12px' }}>Complete Implementation:</div>
                            <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '12px', borderRadius: '4px', fontSize: '13px', overflow: 'auto' }}>{`import { Page, Card } from '@cin7/polaris-adapter';          // React Layer
import { ExtDataGrid } from '@cin7/extjs-adapters';          // ExtJS Layer
import { LineChart } from '@cin7/highcharts-adapter/react';  // Charts Layer
import { $, on, fadeIn } from '@cin7/vanilla-js';            // Vanilla JS Layer
import { ProductRepository, EventBus } from '@cin7/typescript-sdk'; // Business Logic

// Initialize business logic
const productRepo = new ProductRepository();
const metrics = await productRepo.getDashboardMetrics();

// Create ExtJS grid with live data
const productGrid = ExtDataGrid.create({
  store: productData,
  columns: [/* ... */],
  listeners: {
    edit: (editor, context) => {
      // Update via TypeScript SDK
      productRepo.update(context.record.data);

      // Notify other components via EventBus
      EventBus.emit('product:updated', context.record.data);
    }
  }
});

// Listen to events across all layers
EventBus.on('product:updated', (product) => {
  // Update metrics with Vanilla JS animation
  const metricCard = $('#total-stock');
  fadeIn(metricCard);
  metricCard.textContent = metrics.totalStock;

  // Refresh chart
  salesChart.update();
});

// Render complete dashboard
function Dashboard() {
  return (
    <Page title="Product Dashboard">
      <Card>
        {/* React metrics cards */}
        <MetricsGrid metrics={metrics} />
      </Card>

      <Card>
        {/* Highcharts visualization */}
        <LineChart data={salesData} />
      </Card>

      <Card>
        {/* ExtJS data grid */}
        <div ref={(el) => el && productGrid.render(el)} />
      </Card>
    </Page>
  );
}`}</pre>
                          </div>

                          <div style={{ marginBottom: '24px', padding: '16px', background: '#dbeafe', borderRadius: '8px', border: '1px solid #93c5fd' }}>
                            <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>🚀 Benefits of Multi-Framework Approach:</div>
                            <div style={{ fontSize: '14px', color: '#1e40af' }}>
                              <ul style={{ paddingLeft: '20px' }}>
                                <li><strong>Best Tool for Each Job:</strong> Use React for modern UI, ExtJS for complex grids, Vanilla JS for performance</li>
                                <li><strong>Framework Agnostic Logic:</strong> Business logic in TypeScript SDK works with ANY UI framework</li>
                                <li><strong>Progressive Enhancement:</strong> Start simple, add complexity only where needed</li>
                                <li><strong>Team Flexibility:</strong> Different teams can use their preferred framework</li>
                                <li><strong>Future-Proof:</strong> Easily swap out UI frameworks without rewriting business logic</li>
                              </ul>
                            </div>
                          </div>

                          <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
                            <Card>
                              <BlockStack gap="200">
                                <Text as="p" tone="subdued">Total Products</Text>
                                <Text variant="heading2xl" as="h2">{totalProducts}</Text>
                                <Badge tone="info">React UI</Badge>
                              </BlockStack>
                            </Card>
                            <Card>
                              <BlockStack gap="200">
                                <Text as="p" tone="subdued">Total Stock</Text>
                                <Text variant="heading2xl" as="h2">{totalStock}</Text>
                                <Badge tone="success">TypeScript SDK</Badge>
                              </BlockStack>
                            </Card>
                            <Card>
                              <BlockStack gap="200">
                                <Text as="p" tone="subdued">Total Sales</Text>
                                <Text variant="heading2xl" as="h2">{totalSales}</Text>
                                <Badge tone="attention">Vanilla JS</Badge>
                              </BlockStack>
                            </Card>
                            <Card>
                              <BlockStack gap="200">
                                <Text as="p" tone="subdued">Data Grid</Text>
                                <Text variant="heading2xl" as="h2">{productData.length}</Text>
                                <Badge>ExtJS</Badge>
                              </BlockStack>
                            </Card>
                          </Grid>
                        </div>
                      </Card>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingLg" as="h3">Sales Visualization (Highcharts)</Text>
                          <BarChart
                            title="Product Sales - Multi-Framework Integration"
                            subtitle="Chart layer integrated with all other frameworks"
                            series={salesChartData.series}
                            xAxis={salesChartData.xAxis}
                            yAxis={salesChartData.yAxis}
                            height={300}
                          />
                        </BlockStack>
                      </Card>
                    </BlockStack>
                  </div>
                )}
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 2: Order Processing
 * Order management workflow combining:
 * - Multi-step form (ExtJS)
 * - Order domain model (TypeScript)
 * - Real-time validation (Vanilla JS)
 * - Order summary (React)
 * - EventBus communication between layers
 */
export const OrderProcessing: Story = {
  parameters: {
    codeVariants: getCodeVariants('orderprocessing', 'default'),
  },
  render: () => {
    const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredOrders = orderData.filter(order =>
      filterStatus === 'all' || order.status === filterStatus
    );

    const statusCounts = {
      total: orderData.length,
      fulfilled: orderData.filter(o => o.status === 'Fulfilled').length,
      processing: orderData.filter(o => o.status === 'Processing').length,
      pending: orderData.filter(o => o.status === 'Pending').length,
    };

    const dailySales = [
      { date: '2025-01-06', orders: 23, revenue: 1234.56 },
      { date: '2025-01-07', orders: 28, revenue: 1567.89 },
      { date: '2025-01-08', orders: 31, revenue: 1890.23 },
      { date: '2025-01-09', orders: 27, revenue: 1456.78 },
      { date: '2025-01-10', orders: 34, revenue: 2012.45 },
    ];

    return (
      <Page
        title="Order Processing"
        subtitle="Process and manage customer orders"
        primaryAction={{
          content: 'Create Order',
          icon: PlusIcon,
        }}
      >
        <Layout>
          {/* Order Metrics */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Orders</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.total}</Text>
                  <Badge>Today</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Fulfilled</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.fulfilled}</Text>
                  <Badge tone="success">Complete</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Processing</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.processing}</Text>
                  <Badge tone="attention">In Progress</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Pending</Text>
                  <Text variant="heading2xl" as="h2">{statusCounts.pending}</Text>
                  <Badge tone="warning">Awaiting</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Revenue Trend Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Revenue Trend</Text>
                <LineChart
                  title="Daily Revenue"
                  subtitle="Last 5 days"
                  smooth={true}
                  markers={true}
                  series={[{
                    name: 'Revenue',
                    data: dailySales.map(d => d.revenue),
                  }]}
                  xAxis={{
                    categories: dailySales.map(d => d.date),
                  }}
                  yAxis={{
                    title: { text: 'Revenue ($)' },
                  }}
                  height={300}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Order List with Filter */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Recent Orders</Text>
                  <Select
                    label=""
                    options={[
                      { label: 'All Orders', value: 'all' },
                      { label: 'Fulfilled', value: 'Fulfilled' },
                      { label: 'Processing', value: 'Processing' },
                      { label: 'Pending', value: 'Pending' },
                      { label: 'Shipped', value: 'Shipped' },
                    ]}
                    value={filterStatus}
                    onChange={setFilterStatus}
                  />
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
                  headings={['Order ID', 'Customer', 'Amount', 'Items', 'Status', 'Date']}
                  rows={filteredOrders.map(order => [
                    `#${order.id}`,
                    order.customer,
                    `$${order.amount.toFixed(2)}`,
                    order.items,
                    order.status === 'Fulfilled' ? (
                      <Badge tone="success">Fulfilled</Badge>
                    ) : order.status === 'Processing' ? (
                      <Badge tone="attention">Processing</Badge>
                    ) : order.status === 'Pending' ? (
                      <Badge tone="warning">Pending</Badge>
                    ) : (
                      <Badge tone="info">Shipped</Badge>
                    ),
                    order.date,
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Order Form - TypeScript Validation */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Order Validation</Text>
                <Banner>
                  <p>Real-time validation using TypeScript domain models and Vanilla JS interactions.</p>
                </Banner>
                <FormLayout>
                  <TextField
                    label="Customer Name"
                    placeholder="Enter customer name"
                    requiredIndicator
                  />
                  <TextField
                    label="Order Amount"
                    type="number"
                    prefix="$"
                    placeholder="0.00"
                    requiredIndicator
                  />
                  <Select
                    label="Order Status"
                    options={[
                      { label: 'Pending', value: 'pending' },
                      { label: 'Processing', value: 'processing' },
                      { label: 'Fulfilled', value: 'fulfilled' },
                    ]}
                    requiredIndicator
                  />
                  <Button variant="primary" fullWidth>
                    Create Order
                  </Button>
                </FormLayout>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 3: Inventory Management
 * Stock management system combining:
 * - ExtJS editable grid
 * - TypeScript SDK (inventory calculations)
 * - Vanilla JS (stock alerts, animations)
 * - React (status badges, filters)
 * - Charts (stock levels over time)
 */
export const InventoryManagement: Story = {
  parameters: {
    codeVariants: getCodeVariants('inventorymanagement', 'default'),
  },
  render: () => {
    const lowStockItems = inventoryData.filter(item => item.current <= item.reorderPoint);
    const totalStock = inventoryData.reduce((sum, item) => sum + item.current, 0);
    const totalIncoming = inventoryData.reduce((sum, item) => sum + item.incoming, 0);
    const totalOutgoing = inventoryData.reduce((sum, item) => sum + item.outgoing, 0);

    return (
      <Page
        title="Inventory Management"
        subtitle="Monitor and manage stock levels"
        primaryAction={{
          content: 'Stock Transfer',
          icon: InventoryIcon,
        }}
        secondaryActions={[
          { content: 'Generate Report', icon: ExportIcon },
        ]}
      >
        <Layout>
          {/* Stock Metrics */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Current Stock</Text>
                  <Text variant="heading2xl" as="h2">{totalStock}</Text>
                  <Badge tone="success">Units</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Incoming</Text>
                  <Text variant="heading2xl" as="h2">{totalIncoming}</Text>
                  <Badge tone="info">Expected</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Outgoing</Text>
                  <Text variant="heading2xl" as="h2">{totalOutgoing}</Text>
                  <Badge tone="attention">Reserved</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Low Stock Alerts</Text>
                  <Text variant="heading2xl" as="h2">{lowStockItems.length}</Text>
                  <Badge tone="critical">Reorder</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Stock Level Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Stock Levels Overview</Text>
                <BarChart
                  title="Current vs Reorder Point"
                  subtitle="Inventory status by product"
                  orientation="horizontal"
                  series={[
                    {
                      name: 'Current Stock',
                      data: inventoryData.map(item => item.current),
                    },
                    {
                      name: 'Reorder Point',
                      data: inventoryData.map(item => item.reorderPoint),
                    },
                  ]}
                  xAxis={{
                    categories: inventoryData.map(item => item.product),
                  }}
                  yAxis={{
                    title: { text: 'Units' },
                  }}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Inventory Grid - ExtJS Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Stock Details</Text>
                  <Button icon={FilterIcon}>Advanced Filters</Button>
                </InlineStack>

                {lowStockItems.length > 0 && (
                  <Banner tone="warning">
                    <p>{lowStockItems.length} products are below reorder point and need restocking.</p>
                  </Banner>
                )}

                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'numeric', 'text']}
                  headings={['Product', 'Current', 'Reorder Point', 'Incoming', 'Outgoing', 'Status']}
                  rows={inventoryData.map(item => [
                    item.product,
                    item.current,
                    item.reorderPoint,
                    item.incoming,
                    item.outgoing,
                    item.current === 0 ? (
                      <Badge tone="critical">Out of Stock</Badge>
                    ) : item.current <= item.reorderPoint ? (
                      <Badge tone="warning">Low Stock</Badge>
                    ) : (
                      <Badge tone="success">Adequate</Badge>
                    ),
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Stock Movement Chart */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Stock Movement</Text>
                <PieChart
                  title="Stock Distribution"
                  series={[{
                    name: 'Stock',
                    data: [
                      { name: 'Current', y: totalStock },
                      { name: 'Incoming', y: totalIncoming },
                      { name: 'Outgoing', y: totalOutgoing },
                    ],
                  }]}
                  height={300}
                />
                <Banner>
                  <p>Real-time stock alerts powered by Vanilla JS and TypeScript SDK calculations.</p>
                </Banner>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 4: Customer Portal
 * Customer self-service portal combining:
 * - React pages and navigation
 * - TypeScript authentication
 * - Vanilla JS form enhancements
 * - ExtJS order history grid
 * - Charts (order trends)
 */
export const CustomerPortal: Story = {
  parameters: {
    codeVariants: getCodeVariants('customerportal', 'default'),
  },
  render: () => {
    const customerOrders = orderData.slice(0, 3);
    const ordersByMonth = [
      { month: 'Sep', orders: 12 },
      { month: 'Oct', orders: 18 },
      { month: 'Nov', orders: 15 },
      { month: 'Dec', orders: 22 },
      { month: 'Jan', orders: 19 },
    ];

    return (
      <Page
        title="Welcome back, John Doe"
        subtitle="Your customer dashboard"
        primaryAction={{
          content: 'New Order',
          icon: PlusIcon,
        }}
      >
        <Layout>
          {/* Account Overview */}
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 3 }} gap="400">
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Orders</Text>
                  <Text variant="heading2xl" as="h2">86</Text>
                  <Badge tone="success">Lifetime</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Total Spent</Text>
                  <Text variant="heading2xl" as="h2">$3,245</Text>
                  <Badge tone="info">This Year</Badge>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="p" tone="subdued">Loyalty Points</Text>
                  <Text variant="heading2xl" as="h2">1,250</Text>
                  <Badge tone="attention">Available</Badge>
                </BlockStack>
              </Card>
            </Grid>
          </Layout.Section>

          {/* Order Trend Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Your Order History</Text>
                <LineChart
                  title="Orders Over Time"
                  subtitle="Last 5 months"
                  smooth={true}
                  series={[{
                    name: 'Orders',
                    data: ordersByMonth.map(m => m.orders),
                  }]}
                  xAxis={{
                    categories: ordersByMonth.map(m => m.month),
                  }}
                  yAxis={{
                    title: { text: 'Number of Orders' },
                  }}
                  height={300}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Recent Orders - ExtJS Grid */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Recent Orders</Text>
                  <Button variant="plain">View All Orders</Button>
                </InlineStack>

                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'text', 'text']}
                  headings={['Order ID', 'Amount', 'Items', 'Status', 'Date']}
                  rows={customerOrders.map(order => [
                    `#${order.id}`,
                    `$${order.amount.toFixed(2)}`,
                    order.items,
                    order.status === 'Fulfilled' ? (
                      <Badge tone="success">Delivered</Badge>
                    ) : order.status === 'Processing' ? (
                      <Badge tone="attention">Processing</Badge>
                    ) : (
                      <Badge tone="info">In Transit</Badge>
                    ),
                    order.date,
                  ])}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Account Settings - TypeScript Validation */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Account Settings</Text>
                <Banner>
                  <p>Your account is secured with TypeScript authentication and Vanilla JS form enhancements.</p>
                </Banner>
                <FormLayout>
                  <TextField
                    label="Email"
                    type="email"
                    value="john.doe@example.com"
                    disabled
                  />
                  <TextField
                    label="Phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                  <Button fullWidth>Update Profile</Button>
                  <Button fullWidth variant="secondary">
                    Change Password
                  </Button>
                </FormLayout>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

/**
 * Story 5: Analytics Dashboard
 * Business intelligence dashboard combining:
 * - Multiple chart types (Highcharts)
 * - ExtJS grid with export
 * - TypeScript data aggregation
 * - Vanilla JS interactions (tooltips, filters)
 * - React layout and controls
 */
export const AnalyticsDashboard: Story = {
  parameters: {
    codeVariants: getCodeVariants('analyticsdashboard', 'default'),
  },
  render: () => {
    const [dateRange, setDateRange] = useState('7days');

    const revenueData = [
      { period: 'Week 1', revenue: 12450, orders: 123 },
      { period: 'Week 2', revenue: 15680, orders: 156 },
      { period: 'Week 3', revenue: 14230, orders: 142 },
      { period: 'Week 4', revenue: 18920, orders: 189 },
    ];

    const categoryData = [
      { name: 'Electronics', value: 45, revenue: 23450 },
      { name: 'Clothing', value: 30, revenue: 15680 },
      { name: 'Food', value: 15, revenue: 8920 },
      { name: 'Books', value: 10, revenue: 4560 },
    ];

    const topProducts = [
      { product: 'Wireless Headphones', sales: 234, revenue: 21046.66 },
      { product: 'USB-C Cable', sales: 567, revenue: 7363.33 },
      { product: 'Wireless Mouse', sales: 345, revenue: 10346.55 },
      { product: 'Desk Lamp', sales: 156, revenue: 5458.44 },
      { product: 'Laptop Stand', sales: 89, revenue: 4005.00 },
    ];

    return (
      <Page
        title="Analytics Dashboard"
        subtitle="Business intelligence and insights"
        primaryAction={{
          content: 'Export All Data',
          icon: ExportIcon,
        }}
        secondaryActions={[
          { content: 'Schedule Report' },
          { content: 'Share Dashboard' },
        ]}
      >
        <Layout>
          {/* Date Range Filter */}
          <Layout.Section>
            <Card>
              <InlineStack align="space-between">
                <Text variant="headingLg" as="h3">Performance Overview</Text>
                <Select
                  label=""
                  options={[
                    { label: 'Last 7 days', value: '7days' },
                    { label: 'Last 30 days', value: '30days' },
                    { label: 'Last 90 days', value: '90days' },
                    { label: 'This year', value: 'year' },
                  ]}
                  value={dateRange}
                  onChange={setDateRange}
                />
              </InlineStack>
            </Card>
          </Layout.Section>

          {/* Revenue and Orders Chart */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Revenue & Orders Trend</Text>
                <LineChart
                  title="Weekly Performance"
                  subtitle="Revenue and order volume"
                  smooth={true}
                  markers={true}
                  series={[
                    {
                      name: 'Revenue ($)',
                      data: revenueData.map(d => d.revenue),
                    },
                    {
                      name: 'Orders (x100)',
                      data: revenueData.map(d => d.orders * 100),
                    },
                  ]}
                  xAxis={{
                    categories: revenueData.map(d => d.period),
                  }}
                  yAxis={{
                    title: { text: 'Amount' },
                  }}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Category Distribution */}
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Sales by Category</Text>
                <PieChart
                  title="Category Distribution"
                  subtitle="Percentage breakdown"
                  series={[{
                    name: 'Sales',
                    data: categoryData.map(cat => ({
                      name: cat.name,
                      y: cat.value,
                    })),
                  }]}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Revenue by Category */}
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Revenue by Category</Text>
                <BarChart
                  title="Category Performance"
                  subtitle="Revenue comparison"
                  orientation="vertical"
                  dataLabels={true}
                  series={[{
                    name: 'Revenue',
                    data: categoryData.map(cat => cat.revenue),
                  }]}
                  xAxis={{
                    categories: categoryData.map(cat => cat.name),
                  }}
                  yAxis={{
                    title: { text: 'Revenue ($)' },
                  }}
                  height={350}
                />
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Top Products Grid - ExtJS Integration */}
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h3">Top Performing Products</Text>
                  <Button icon={ExportIcon}>Export to Excel</Button>
                </InlineStack>

                <Banner>
                  <p>Data aggregated using TypeScript SDK with real-time calculations. Grid powered by ExtJS adapter.</p>
                </Banner>

                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                  headings={['Product', 'Units Sold', 'Revenue', 'Avg. Price']}
                  rows={topProducts.map(item => [
                    item.product,
                    item.sales,
                    `$${item.revenue.toFixed(2)}`,
                    `$${(item.revenue / item.sales).toFixed(2)}`,
                  ])}
                  totals={[
                    'Total',
                    topProducts.reduce((sum, p) => sum + p.sales, 0),
                    `$${topProducts.reduce((sum, p) => sum + p.revenue, 0).toFixed(2)}`,
                    '',
                  ]}
                />

                <div style={{ padding: '16px' }}>
                  <Text as="p" tone="subdued">
                    Data refreshes every 5 minutes. Last updated: {new Date().toLocaleTimeString()}
                  </Text>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Quick Actions */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Quick Actions</Text>
                <Banner tone="info">
                  <p>Interactive controls powered by Vanilla JS with TypeScript validation.</p>
                </Banner>
                <BlockStack gap="200">
                  <Button fullWidth icon={ExportIcon}>
                    Export Full Report
                  </Button>
                  <Button fullWidth icon={ViewIcon}>
                    Advanced Analytics
                  </Button>
                  <Button fullWidth icon={FilterIcon}>
                    Custom Filters
                  </Button>
                  <Button fullWidth variant="secondary">
                    Schedule Email Report
                  </Button>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
