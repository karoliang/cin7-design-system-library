import type { CodeVariant } from './types';

export const basicComponentsExamples: Record<string, CodeVariant> = {
  buttonExamples: {
    react: `import { Button } from '@shopify/polaris';
import React from 'react';

function ButtonExamples() {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  );
}

export default ButtonExamples;`,

    vanilla: `<!-- HTML Structure -->
<div class="button-examples" style="display: flex; gap: 12px;">
  <button class="polaris-button polaris-button--primary">Primary</button>
  <button class="polaris-button polaris-button--secondary">Secondary</button>
  <button class="polaris-button polaris-button--tertiary">Tertiary</button>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createButton } from '@cin7/vanilla-js';

const container = document.querySelector('.button-examples');

// Create primary button
const primaryBtn = createButton({
  text: 'Primary',
  variant: 'primary',
  onClick: () => console.log('Primary clicked')
});

// Create secondary button
const secondaryBtn = createButton({
  text: 'Secondary',
  variant: 'secondary',
  onClick: () => console.log('Secondary clicked')
});

// Create tertiary button
const tertiaryBtn = createButton({
  text: 'Tertiary',
  variant: 'tertiary',
  onClick: () => console.log('Tertiary clicked')
});

container.append(primaryBtn, secondaryBtn, tertiaryBtn);
</script>`,

    extjs: `// ExtJS Button Group using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 6 0 0'
  },
  items: [
    {
      xtype: 'button',
      text: 'Primary',
      cls: 'polaris-button-primary',
      handler: function() {
        console.log('Primary clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Secondary',
      cls: 'polaris-button-secondary',
      handler: function() {
        console.log('Secondary clicked');
      }
    },
    {
      xtype: 'button',
      text: 'Tertiary',
      cls: 'polaris-button-tertiary',
      handler: function() {
        console.log('Tertiary clicked');
      }
    }
  ],
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisButtonGroup } from '@cin7/extjs-adapters';

const buttonGroup = Ext.create('PolarisButtonGroup', {
  buttons: [
    { text: 'Primary', variant: 'primary' },
    { text: 'Secondary', variant: 'secondary' },
    { text: 'Tertiary', variant: 'tertiary' }
  ]
});`,

    typescript: `import { Button } from '@shopify/polaris';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonConfig {
  label: string;
  variant?: ButtonVariant;
  onClick?: () => void;
}

interface ButtonExamplesProps {
  buttons?: ButtonConfig[];
  gap?: string;
}

function ButtonExamples({
  buttons = [
    { label: 'Primary', variant: 'primary' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Tertiary', variant: 'tertiary' }
  ],
  gap = '12px'
}: ButtonExamplesProps): JSX.Element {
  return (
    <div style={{ display: 'flex', gap }}>
      {buttons.map((button, index) => (
        <Button
          key={index}
          variant={button.variant}
          onClick={button.onClick}
        >
          {button.label}
        </Button>
      ))}
    </div>
  );
}

export default ButtonExamples;`
  },

  cardExamples: {
    react: `import { Card } from '@shopify/polaris';
import React from 'react';

function CardExamples() {
  return (
    <Card sectioned>
      <p>This is a basic card with sectioned content.</p>
    </Card>
  );
}

export default CardExamples;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-card">
  <div class="polaris-card__section">
    <p>This is a basic card with sectioned content.</p>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createCard } from '@cin7/vanilla-js';

const card = createCard({
  sectioned: true,
  content: '<p>This is a basic card with sectioned content.</p>',
  onClick: () => console.log('Card clicked')
});

document.getElementById('app').appendChild(card);
</script>

<style>
/* Basic card styling following Polaris design tokens */
.polaris-card {
  background-color: var(--p-color-bg-surface);
  border-radius: var(--p-border-radius-200);
  box-shadow: var(--p-shadow-200);
  overflow: hidden;
}

.polaris-card__section {
  padding: var(--p-space-400);
}

.polaris-card__section p {
  margin: 0;
  color: var(--p-color-text);
}
</style>`,

    extjs: `// ExtJS Panel (Card equivalent) using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: null,
  bodyPadding: 16,
  cls: 'polaris-card',
  html: '<p>This is a basic card with sectioned content.</p>',
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisCard } from '@cin7/extjs-adapters';

const card = Ext.create('PolarisCard', {
  sectioned: true,
  items: [
    {
      xtype: 'component',
      html: '<p>This is a basic card with sectioned content.</p>'
    }
  ]
});`,

    typescript: `import { Card } from '@shopify/polaris';
import React from 'react';

interface CardExamplesProps {
  content?: string | React.ReactNode;
  sectioned?: boolean;
  title?: string;
  actions?: Array<{ content: string; onAction: () => void }>;
}

function CardExamples({
  content = 'This is a basic card with sectioned content.',
  sectioned = true,
  title,
  actions
}: CardExamplesProps): JSX.Element {
  return (
    <Card sectioned={sectioned} title={title} actions={actions}>
      {typeof content === 'string' ? <p>{content}</p> : content}
    </Card>
  );
}

export default CardExamples;`
  },

  textFieldExamples: {
    react: `import { TextField } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function TextFieldExamples() {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (newValue: string) => setValue(newValue),
    []
  );

  return (
    <TextField
      label="Basic text field"
      placeholder="Enter text here"
      value={value}
      onChange={handleChange}
    />
  );
}

export default TextFieldExamples;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-text-field">
  <label for="basic-field" class="polaris-label">Basic text field</label>
  <input
    id="basic-field"
    type="text"
    class="polaris-input"
    placeholder="Enter text here"
  />
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createTextField, on } from '@cin7/vanilla-js';

const textField = createTextField({
  label: 'Basic text field',
  placeholder: 'Enter text here',
  onChange: (value) => {
    console.log('Input value:', value);
  }
});

document.getElementById('app').appendChild(textField);

// Alternative: Direct DOM manipulation
const input = document.getElementById('basic-field');
on(input, 'input', (e) => {
  console.log('Input value:', e.target.value);
});
</script>

<style>
/* Basic text field styling following Polaris design tokens */
.polaris-text-field {
  margin-bottom: var(--p-space-400);
}

.polaris-label {
  display: block;
  margin-bottom: var(--p-space-200);
  font-weight: var(--p-font-weight-semibold);
  color: var(--p-color-text);
}

.polaris-input {
  width: 100%;
  padding: var(--p-space-300);
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-border-radius-200);
  font-size: var(--p-font-size-325);
  line-height: var(--p-font-line-height-500);
}

.polaris-input:focus {
  outline: none;
  border-color: var(--p-color-border-focus);
  box-shadow: 0 0 0 1px var(--p-color-border-focus);
}
</style>`,

    extjs: `// ExtJS TextField using @cin7/extjs-adapters
Ext.create('Ext.form.field.Text', {
  fieldLabel: 'Basic text field',
  emptyText: 'Enter text here',
  cls: 'polaris-textfield',
  listeners: {
    change: function(field, newValue, oldValue) {
      console.log('Input value:', newValue);
    }
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisTextField } from '@cin7/extjs-adapters';

const textField = Ext.create('PolarisTextField', {
  label: 'Basic text field',
  placeholder: 'Enter text here',
  onChange: function(value) {
    console.log('Input value:', value);
  }
});`,

    typescript: `import { TextField } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface TextFieldExamplesProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'email' | 'number' | 'password';
  disabled?: boolean;
  error?: string;
}

function TextFieldExamples({
  label = 'Basic text field',
  placeholder = 'Enter text here',
  defaultValue = '',
  onChange,
  type = 'text',
  disabled = false,
  error
}: TextFieldExamplesProps): JSX.Element {
  const [value, setValue] = useState<string>(defaultValue);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      type={type}
      disabled={disabled}
      error={error}
    />
  );
}

export default TextFieldExamples;`
  }
};

// Form Component Examples

export const productDashboardExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Page, Card, Layout, Badge, DataTable, Grid, BlockStack, InlineStack, Text, TextField, Select, Icon } from '@shopify/polaris';
import { PlusIcon, ExportIcon, SearchIcon } from '@shopify/polaris-icons';
import { BarChart } from '@cin7/highcharts-adapter/react';
import React, { useState } from 'react';

function ProductDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const productData = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', price: 89.99, stock: 45, category: 'Electronics', sales: 234 },
    { id: 2, name: 'USB-C Cable', sku: 'UC-002', price: 12.99, stock: 120, category: 'Accessories', sales: 567 },
    // ... more products
  ];

  const filteredProducts = productData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalProducts = productData.length;
  const totalStock = productData.reduce((sum, p) => sum + p.stock, 0);
  const lowStock = productData.filter(p => p.stock < 20).length;

  return (
    <Page
      title="Product Dashboard"
      subtitle="Manage your product catalog and inventory"
      primaryAction={{ content: 'Add Product', icon: PlusIcon }}
      secondaryActions={[{ content: 'Export', icon: ExportIcon }]}
    >
      <Layout>
        {/* Metrics */}
        <Layout.Section>
          <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Total Products</Text>
                <Text variant="heading2xl">{totalProducts}</Text>
                <Badge tone="info">Active</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Total Stock</Text>
                <Text variant="heading2xl">{totalStock}</Text>
                <Badge tone="success">Available</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Low Stock Alerts</Text>
                <Text variant="heading2xl">{lowStock}</Text>
                <Badge tone="warning">Action Required</Badge>
              </BlockStack>
            </Card>
          </Grid>
        </Layout.Section>

        {/* Sales Chart */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg">Product Sales Overview</Text>
              <BarChart
                title="Sales by Product"
                series={[{ name: 'Sales', data: productData.map(p => p.sales) }]}
                xAxis={{ categories: productData.map(p => p.name) }}
                height={300}
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* Product Grid */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text variant="headingLg">Product Catalog</Text>
                <InlineStack gap="200">
                  <TextField
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={setSearchQuery}
                    prefix={<Icon source={SearchIcon} />}
                  />
                  <Select
                    options={[
                      { label: 'All Categories', value: 'all' },
                      { label: 'Electronics', value: 'Electronics' },
                      { label: 'Accessories', value: 'Accessories' },
                    ]}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                  />
                </InlineStack>
              </InlineStack>

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
                headings={['Product', 'SKU', 'Price', 'Stock', 'Status']}
                rows={filteredProducts.map(product => [
                  product.name,
                  product.sku,
                  \`$\${product.price.toFixed(2)}\`,
                  product.stock,
                  product.stock === 0 ? <Badge tone="critical">Out of Stock</Badge> :
                  product.stock < 20 ? <Badge tone="warning">Low Stock</Badge> :
                  <Badge tone="success">In Stock</Badge>
                ])}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    typescript: `// TypeScript SDK - Business Logic Layer
import { Repository, Entity, ValueObject } from '@cin7/typescript-sdk';

// Domain Model
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
    this.emitEvent('stock:updated', {
      productId: this.id,
      newQuantity: quantity
    });
  }
}

// Repository Pattern
class ProductRepository extends Repository<Product> {
  async findByCategory(category: string): Promise<Product[]> {
    return this.query({ category });
  }

  async findLowStock(): Promise<Product[]> {
    const products = await this.findAll();
    return products.filter(p => p.isLowStock);
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const products = await this.findAll();
    
    return {
      totalProducts: products.length,
      totalStock: products.reduce((sum, p) => sum + p.stock.quantity, 0),
      totalSales: products.reduce((sum, p) => sum + p.sales, 0),
      lowStock: products.filter(p => p.isLowStock).length,
      outOfStock: products.filter(p => p.isOutOfStock).length,
    };
  }

  async searchProducts(query: string): Promise<Product[]> {
    const products = await this.findAll();
    const lowerQuery = query.toLowerCase();
    
    return products.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) ||
      p.sku.value.toLowerCase().includes(lowerQuery)
    );
  }
}

// Usage in Dashboard
const productRepo = new ProductRepository();

// Get dashboard metrics
const metrics = await productRepo.getDashboardMetrics();

// Search products
const results = await productRepo.searchProducts('wireless');

// Get low stock alerts
const alerts = await productRepo.findLowStock();

// Update product stock
const product = await productRepo.findById('prod-001');
product.updateStock(50); // Emits 'stock:updated' event
await productRepo.save(product);`,
    vanilla: `// Vanilla JS - DOM Manipulation & Interactions
import { $, $$, on, addClass, removeClass, fadeIn, fadeOut } from '@cin7/vanilla-js';

// Initialize dashboard
function initProductDashboard() {
  const dashboard = $('#product-dashboard');
  const metricsCards = $$('.metric-card');
  const searchInput = $('#product-search');
  const categoryFilter = $('#category-filter');
  const productTable = $('#product-table');

  // Add interactivity to metric cards
  metricsCards.forEach(card => {
    on(card, 'mouseenter', () => {
      addClass(card, 'metric-card--hover');
      fadeIn(card.querySelector('.metric-details'));
    });

    on(card, 'mouseleave', () => {
      removeClass(card, 'metric-card--hover');
      fadeOut(card.querySelector('.metric-details'));
    });
  });

  // Real-time search
  on(searchInput, 'input', (e) => {
    const query = e.target.value.toLowerCase();
    filterProducts(query, categoryFilter.value);
  });

  // Category filtering
  on(categoryFilter, 'change', (e) => {
    filterProducts(searchInput.value, e.target.value);
  });

  // Table row interactions
  const rows = $$('.product-row');
  rows.forEach(row => {
    on(row, 'click', () => {
      removeClass($$('.product-row'), 'selected');
      addClass(row, 'selected');
      showProductDetails(row.dataset.productId);
    });
  });
}

// Filter products
function filterProducts(query, category) {
  const rows = $$('.product-row');
  
  rows.forEach(row => {
    const name = row.dataset.productName.toLowerCase();
    const sku = row.dataset.productSku.toLowerCase();
    const cat = row.dataset.productCategory;
    
    const matchesSearch = name.includes(query) || sku.includes(query);
    const matchesCategory = category === 'all' || cat === category;
    
    if (matchesSearch && matchesCategory) {
      fadeIn(row);
    } else {
      fadeOut(row);
    }
  });
  
  updateResultsCount();
}

// Update metrics with animation
function updateMetrics(metrics) {
  const totalProducts = $('#metric-total-products');
  const totalStock = $('#metric-total-stock');
  const lowStock = $('#metric-low-stock');
  
  animateNumber(totalProducts, metrics.totalProducts);
  animateNumber(totalStock, metrics.totalStock);
  animateNumber(lowStock, metrics.lowStock);
}

// Animate number changes
function animateNumber(element, targetValue) {
  const currentValue = parseInt(element.textContent);
  const duration = 500; // ms
  const steps = 30;
  const increment = (targetValue - currentValue) / steps;
  
  let step = 0;
  const interval = setInterval(() => {
    if (step >= steps) {
      element.textContent = targetValue;
      clearInterval(interval);
      return;
    }
    
    element.textContent = Math.round(currentValue + (increment * step));
    step++;
  }, duration / steps);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initProductDashboard);`,
    extjs: `// ExtJS - Enterprise Data Grid
import { ExtDataGrid } from '@cin7/extjs-adapters';

// Product Grid Configuration
const productGrid = ExtDataGrid.create({
  title: 'Product Catalog',
  store: {
    type: 'store',
    proxy: {
      type: 'ajax',
      url: '/api/products',
      reader: {
        type: 'json',
        rootProperty: 'data'
      }
    },
    autoLoad: true,
    pageSize: 50,
    sorters: [{ property: 'name', direction: 'ASC' }]
  },
  
  columns: [
    {
      dataIndex: 'id',
      text: 'ID',
      width: 80,
      hidden: true
    },
    {
      dataIndex: 'name',
      text: 'Product Name',
      flex: 2,
      editor: {
        type: 'textfield',
        allowBlank: false
      },
      filter: {
        type: 'string'
      }
    },
    {
      dataIndex: 'sku',
      text: 'SKU',
      width: 120,
      editor: {
        type: 'textfield'
      },
      filter: {
        type: 'string'
      }
    },
    {
      dataIndex: 'price',
      text: 'Price',
      width: 100,
      align: 'right',
      xtype: 'numbercolumn',
      format: '$0,000.00',
      editor: {
        type: 'numberfield',
        minValue: 0,
        decimalPrecision: 2
      }
    },
    {
      dataIndex: 'stock',
      text: 'Stock',
      width: 100,
      align: 'right',
      editor: {
        type: 'numberfield',
        minValue: 0
      },
      renderer: function(value, metaData, record) {
        if (value === 0) {
          metaData.tdStyle = 'color: red; font-weight: bold;';
          return value + ' (Out)';
        } else if (value < 20) {
          metaData.tdStyle = 'color: orange; font-weight: bold;';
          return value + ' (Low)';
        }
        return value;
      }
    },
    {
      dataIndex: 'category',
      text: 'Category',
      width: 150,
      editor: {
        type: 'combobox',
        store: ['Electronics', 'Accessories', 'Furniture'],
        forceSelection: true
      },
      filter: {
        type: 'list',
        options: ['Electronics', 'Accessories', 'Furniture']
      }
    },
    {
      dataIndex: 'sales',
      text: 'Sales (YTD)',
      width: 100,
      align: 'right',
      xtype: 'numbercolumn',
      format: '0,000'
    },
    {
      xtype: 'actioncolumn',
      text: 'Actions',
      width: 100,
      items: [
        {
          iconCls: 'x-fa fa-edit',
          tooltip: 'Edit',
          handler: function(grid, rowIndex) {
            grid.getSelectionModel().select(rowIndex);
            grid.startEdit(rowIndex, 1);
          }
        },
        {
          iconCls: 'x-fa fa-trash',
          tooltip: 'Delete',
          handler: function(grid, rowIndex, colIndex, item, e, record) {
            Ext.Msg.confirm('Delete', 'Delete product: ' + record.get('name') + '?', function(btn) {
              if (btn === 'yes') {
                grid.getStore().remove(record);
              }
            });
          }
        }
      ]
    }
  ],
  
  // Features
  features: [
    {
      ftype: 'grouping',
      groupHeaderTpl: 'Category: {name} ({rows.length} item{[values.rows.length > 1 ? "s" : ""]})',
      collapsible: true
    },
    {
      ftype: 'filters',
      menuFilterText: 'Filters'
    },
    {
      ftype: 'summary',
      dock: 'bottom'
    }
  ],
  
  // Plugins
  plugins: {
    cellediting: {
      clicksToEdit: 2
    }
  },
  
  // Toolbar
  tbar: [
    {
      text: 'Add Product',
      iconCls: 'x-fa fa-plus',
      handler: function() {
        const store = this.up('grid').getStore();
        store.insert(0, {
          name: 'New Product',
          sku: '',
          price: 0,
          stock: 0,
          category: 'Electronics',
          sales: 0
        });
      }
    },
    '-',
    {
      text: 'Export',
      iconCls: 'x-fa fa-download',
      menu: [
        { text: 'Export to Excel', handler: () => exportGrid('excel') },
        { text: 'Export to CSV', handler: () => exportGrid('csv') }
      ]
    },
    '->',
    {
      xtype: 'textfield',
      emptyText: 'Search products...',
      width: 200,
      listeners: {
        change: function(field, value) {
          const grid = field.up('grid');
          const store = grid.getStore();
          store.clearFilter();
          
          if (value) {
            store.filterBy(function(record) {
              const name = record.get('name').toLowerCase();
              const sku = record.get('sku').toLowerCase();
              const search = value.toLowerCase();
              return name.includes(search) || sku.includes(search);
            });
          }
        }
      }
    }
  ],
  
  // Listeners
  listeners: {
    edit: function(editor, context) {
      // Save changes to backend
      Ext.Ajax.request({
        url: '/api/products/' + context.record.get('id'),
        method: 'PUT',
        jsonData: context.record.getData(),
        success: function() {
          Ext.toast('Product updated successfully');
        }
      });
    },
    selectionchange: function(model, selected) {
      if (selected.length > 0) {
        updateDetailsPanel(selected[0]);
      }
    }
  },
  
  // Pagination
  bbar: {
    xtype: 'pagingtoolbar',
    displayInfo: true,
    displayMsg: 'Products {0} - {1} of {2}',
    emptyMsg: 'No products to display'
  }
});`,
  },
};


export const orderProcessingExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Page, Card, Layout, DataTable, Badge, Grid, BlockStack, InlineStack, Text, Select, Button } from '@shopify/polaris';
import { PlusIcon } from '@shopify/polaris-icons';
import { LineChart } from '@cin7/highcharts-adapter/react';
import React, { useState, useCallback } from 'react';

function OrderProcessing() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const orderData = [
    { id: '10234', customer: 'John Doe', amount: 234.50, status: 'Fulfilled', date: '2025-01-10', items: 3 },
    { id: '10233', customer: 'Jane Smith', amount: 89.99, status: 'Processing', date: '2025-01-10', items: 1 },
    { id: '10232', customer: 'Bob Johnson', amount: 456.78, status: 'Pending', date: '2025-01-09', items: 5 },
    { id: '10231', customer: 'Alice Brown', amount: 123.45, status: 'Fulfilled', date: '2025-01-09', items: 2 },
    { id: '10230', customer: 'Charlie Davis', amount: 567.89, status: 'Shipped', date: '2025-01-08', items: 4 },
  ];

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

  const handleStatusChange = useCallback((value: string) => {
    setFilterStatus(value);
  }, []);

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
                  onChange={handleStatusChange}
                />
              </InlineStack>

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
                headings={['Order ID', 'Customer', 'Amount', 'Items', 'Status', 'Date']}
                rows={filteredOrders.map(order => [
                  \`#\${order.id}\`,
                  order.customer,
                  \`$\${order.amount.toFixed(2)}\`,
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
      </Layout>
    </Page>
  );
}`,
    typescript: `// TypeScript SDK - Order Processing Domain Layer
import { Entity, ValueObject, Repository, EventBus } from '@cin7/typescript-sdk';

// Value Objects
class Money extends ValueObject<number> {
  constructor(value: number, public readonly currency: string = 'USD') {
    super(value);
    this.validate();
  }

  protected validate(): void {
    if (this.value < 0) {
      throw new Error('Money cannot be negative');
    }
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.value + other.value, this.currency);
  }

  multiply(quantity: number): Money {
    return new Money(this.value * quantity, this.currency);
  }

  static zero(currency: string = 'USD'): Money {
    return new Money(0, currency);
  }
}

class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  protected validate(): void {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email address');
    }
  }
}

// Enums
enum OrderStatus {
  Pending = 'Pending',
  Processing = 'Processing',
  Shipped = 'Shipped',
  Fulfilled = 'Fulfilled',
  Cancelled = 'Cancelled',
}

// Entities
class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly unitPrice: Money
  ) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  get total(): Money {
    return this.unitPrice.multiply(this.quantity);
  }
}

class Order extends Entity {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly customerName: string,
    public readonly customerEmail: Email,
    public readonly items: OrderItem[],
    public status: OrderStatus,
    public readonly createdAt: Date,
    public updatedAt: Date = new Date()
  ) {
    super(id);
    this.validate();
  }

  protected validate(): void {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
  }

  get totalAmount(): Money {
    return this.items.reduce(
      (sum, item) => sum.add(item.total),
      Money.zero()
    );
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // State transitions
  startProcessing(): Order {
    if (this.status !== OrderStatus.Pending) {
      throw new Error('Can only start processing pending orders');
    }

    const updated = this.clone({ status: OrderStatus.Processing });
    EventBus.emit('order:processing:started', {
      orderId: this.id,
      customerId: this.customerId,
      timestamp: new Date(),
    });

    return updated;
  }

  fulfill(): Order {
    if (this.status !== OrderStatus.Processing) {
      throw new Error('Can only fulfill processing orders');
    }

    const updated = this.clone({ status: OrderStatus.Fulfilled });
    EventBus.emit('order:fulfilled', {
      orderId: this.id,
      customerId: this.customerId,
      timestamp: new Date(),
    });

    return updated;
  }

  private clone(updates: Partial<{ status: OrderStatus }>): Order {
    return new Order(
      this.id,
      this.customerId,
      this.customerName,
      this.customerEmail,
      this.items,
      updates.status ?? this.status,
      this.createdAt,
      new Date()
    );
  }
}

// Repository
interface OrderMetrics {
  total: number;
  pending: number;
  processing: number;
  fulfilled: number;
  totalRevenue: number;
}

class OrderRepository extends Repository<Order> {
  async findByCustomer(customerId: string): Promise<Order[]> {
    return this.query({ customerId });
  }

  async findByStatus(status: OrderStatus): Promise<Order[]> {
    return this.query({ status });
  }

  async getOrderMetrics(): Promise<OrderMetrics> {
    const orders = await this.findAll();

    const totalRevenue = orders
      .filter(o => o.status !== OrderStatus.Cancelled)
      .reduce((sum, o) => sum + o.totalAmount.value, 0);

    return {
      total: orders.length,
      pending: orders.filter(o => o.status === OrderStatus.Pending).length,
      processing: orders.filter(o => o.status === OrderStatus.Processing).length,
      fulfilled: orders.filter(o => o.status === OrderStatus.Fulfilled).length,
      totalRevenue,
    };
  }

  async getDailyRevenue(days: number = 7): Promise<{ date: string; revenue: number }[]> {
    const orders = await this.findAll();
    const results: { date: string; revenue: number }[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayOrders = orders.filter(o => {
        const orderDate = o.createdAt.toISOString().split('T')[0];
        return orderDate === dateStr && o.status !== OrderStatus.Cancelled;
      });

      const revenue = dayOrders.reduce((sum, o) => sum + o.totalAmount.value, 0);
      results.push({ date: dateStr, revenue });
    }

    return results;
  }
}

// Service Layer
class OrderService {
  constructor(private readonly repository: OrderRepository) {}

  async createOrder(
    customerId: string,
    customerName: string,
    customerEmail: string,
    items: { productId: string; productName: string; quantity: number; price: number }[]
  ): Promise<Order> {
    const email = new Email(customerEmail);
    const orderItems = items.map(
      item => new OrderItem(item.productId, item.productName, item.quantity, new Money(item.price))
    );

    const order = new Order(
      \`ORD-\${Date.now()}\`,
      customerId,
      customerName,
      email,
      orderItems,
      OrderStatus.Pending,
      new Date()
    );

    await this.repository.save(order);
    EventBus.emit('order:created', { orderId: order.id, customerId });

    return order;
  }

  async processOrder(orderId: string): Promise<Order> {
    const order = await this.repository.findById(orderId);
    if (!order) throw new Error(\`Order not found: \${orderId}\`);

    const updated = order.startProcessing();
    await this.repository.save(updated);
    return updated;
  }

  async fulfillOrder(orderId: string): Promise<Order> {
    const order = await this.repository.findById(orderId);
    if (!order) throw new Error(\`Order not found: \${orderId}\`);

    const updated = order.fulfill();
    await this.repository.save(updated);
    return updated;
  }
}`,
    vanilla: `// Vanilla JS - Order Processing UI Interactions
import { $, $$, on, addClass, removeClass, fadeIn, fadeOut, attr, html } from '@cin7/vanilla-js';
import { EventBus } from '@cin7/typescript-sdk';

// Initialize Order Processing Dashboard
function initOrderProcessing() {
  const dashboard = $('#order-dashboard');
  if (!dashboard) return;

  initOrderTable();
  initStatusFilter();
  initMetrics();
  initEventListeners();
}

// Order Table
function initOrderTable() {
  const rows = $$('.order-row');

  rows.forEach(row => {
    on(row, 'mouseenter', () => {
      addClass(row, 'order-row--hover');
    });

    on(row, 'mouseleave', () => {
      removeClass(row, 'order-row--hover');
    });

    on(row, 'click', () => {
      removeClass($$('.order-row'), 'order-row--selected');
      addClass(row, 'selected');
      showOrderDetails(attr(row, 'data-order-id'));
    });
  });
}

// Status Filter
function initStatusFilter() {
  const filterSelect = $('#order-status-filter');
  if (!filterSelect) return;

  on(filterSelect, 'change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    filterOrdersByStatus(target.value);
  });
}

function filterOrdersByStatus(status: string) {
  const rows = $$('.order-row');
  let visibleCount = 0;

  rows.forEach(row => {
    const rowStatus = attr(row, 'data-order-status');
    if (status === 'all' || rowStatus === status) {
      fadeIn(row, 150);
      visibleCount++;
    } else {
      fadeOut(row, 150);
    }
  });

  updateOrderCount(visibleCount);
  EventBus.emit('orders:filtered', { status, count: visibleCount });
}

// Order Details
function showOrderDetails(orderId: string | null) {
  const detailsPanel = $('#order-details-panel');
  if (!detailsPanel || !orderId) return;

  const orderRow = $$(\`.order-row[data-order-id="\${orderId}"]\`)[0];
  if (!orderRow) return;

  html($('#detail-order-id'), orderId);
  html($('#detail-customer'), attr(orderRow, 'data-order-customer') || '');
  html($('#detail-amount'), attr(orderRow, 'data-order-amount') || '');
  html($('#detail-status'), attr(orderRow, 'data-order-status') || '');

  fadeIn(detailsPanel);
}

// Metrics
function initMetrics() {
  const metrics = $$('.metric-value');
  metrics.forEach(metric => {
    animateMetric(metric as HTMLElement);
  });
}

function updateMetrics(data: { total: number; fulfilled: number; processing: number; pending: number }) {
  animateNumber($('#metric-total'), data.total);
  animateNumber($('#metric-fulfilled'), data.fulfilled);
  animateNumber($('#metric-processing'), data.processing);
  animateNumber($('#metric-pending'), data.pending);
}

function animateMetric(element: HTMLElement) {
  const targetValue = parseInt(attr(element, 'data-value') || '0');
  animateNumber(element, targetValue, 1000);
}

function animateNumber(element: HTMLElement | null, targetValue: number, duration: number = 500) {
  if (!element) return;

  const currentValue = parseInt(element.textContent || '0');
  const steps = 30;
  const increment = (targetValue - currentValue) / steps;

  let step = 0;
  const interval = setInterval(() => {
    if (step >= steps) {
      element.textContent = targetValue.toString();
      clearInterval(interval);
      return;
    }

    element.textContent = Math.round(currentValue + increment * step).toString();
    step++;
  }, duration / steps);
}

function updateOrderCount(count: number) {
  const countEl = $('#order-count');
  if (countEl) {
    html(countEl, \`Showing \${count} orders\`);
  }
}

// Event Listeners
function initEventListeners() {
  EventBus.on('order:created', (event: any) => {
    showNotification(\`Order #\${event.orderId} created\`, 'success');
  });

  EventBus.on('order:fulfilled', (event: any) => {
    showNotification(\`Order #\${event.orderId} fulfilled\`, 'success');
    updateOrderRowStatus(event.orderId, 'Fulfilled');
  });

  EventBus.on('metrics:updated', (metrics: any) => {
    updateMetrics(metrics);
  });
}

function updateOrderRowStatus(orderId: string, status: string) {
  const rows = $$('.order-row');
  rows.forEach(row => {
    if (attr(row, 'data-order-id') === orderId) {
      attr(row, 'data-order-status', status);
      const statusBadge = row.querySelector('.status-badge');
      if (statusBadge) {
        html(statusBadge, status);
      }
    }
  });
}

function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
  const notification = document.createElement('div');
  notification.className = \`notification notification--\${type}\`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => addClass(notification, 'notification--visible'), 10);
  setTimeout(() => {
    removeClass(notification, 'notification--visible');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOrderProcessing);
} else {
  initOrderProcessing();
}`,
    extjs: `// ExtJS - Order Processing Grid
import { ExtDataGrid } from '@cin7/extjs-adapters';
import { EventBus } from '@cin7/typescript-sdk';

// Order Store
const orderStore = Ext.create('Ext.data.Store', {
  storeId: 'orderStore',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'customerId', type: 'string' },
    { name: 'customerName', type: 'string' },
    { name: 'amount', type: 'number' },
    { name: 'items', type: 'int' },
    { name: 'status', type: 'string' },
    { name: 'createdAt', type: 'date' },
  ],
  proxy: {
    type: 'ajax',
    url: '/api/orders',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'total',
    },
  },
  autoLoad: true,
  pageSize: 50,
  sorters: [{ property: 'createdAt', direction: 'DESC' }],
});

// Order Grid
const orderGrid = ExtDataGrid.create({
  title: 'Order Management',
  store: orderStore,

  columns: [
    {
      dataIndex: 'id',
      text: 'Order ID',
      width: 120,
      renderer: function(value) {
        return '<strong>#' + value + '</strong>';
      },
    },
    {
      dataIndex: 'customerName',
      text: 'Customer',
      flex: 2,
      filter: { type: 'string' },
    },
    {
      dataIndex: 'amount',
      text: 'Amount',
      width: 120,
      align: 'right',
      xtype: 'numbercolumn',
      format: '$0,000.00',
      summaryType: 'sum',
    },
    {
      dataIndex: 'items',
      text: 'Items',
      width: 80,
      align: 'center',
    },
    {
      dataIndex: 'status',
      text: 'Status',
      width: 120,
      filter: {
        type: 'list',
        options: ['Pending', 'Processing', 'Shipped', 'Fulfilled'],
      },
      renderer: function(value) {
        const colors = {
          'Fulfilled': '#28a745',
          'Processing': '#ffc107',
          'Pending': '#17a2b8',
          'Shipped': '#007bff',
        };
        const color = colors[value] || '#6c757d';
        return '<span style="background:' + color + ';color:white;padding:4px 12px;border-radius:12px;">' + value + '</span>';
      },
    },
    {
      dataIndex: 'createdAt',
      text: 'Created',
      width: 120,
      xtype: 'datecolumn',
      format: 'Y-m-d',
    },
    {
      xtype: 'actioncolumn',
      text: 'Actions',
      width: 100,
      items: [
        {
          iconCls: 'x-fa fa-eye',
          tooltip: 'View Details',
          handler: function(grid, rowIndex, colIndex, item, e, record) {
            showOrderDetails(record.getData());
          },
        },
        {
          iconCls: 'x-fa fa-check',
          tooltip: 'Fulfill Order',
          handler: function(grid, rowIndex, colIndex, item, e, record) {
            if (record.get('status') === 'Processing') {
              record.set('status', 'Fulfilled');
              record.commit();
              EventBus.emit('order:fulfilled', { orderId: record.get('id') });
            }
          },
        },
      ],
    },
  ],

  features: [
    {
      ftype: 'grouping',
      groupHeaderTpl: 'Status: {name} ({rows.length} orders)',
    },
    {
      ftype: 'filters',
    },
    {
      ftype: 'summary',
      dock: 'bottom',
    },
  ],

  tbar: [
    {
      text: 'Create Order',
      iconCls: 'x-fa fa-plus',
      handler: function() {
        showCreateOrderWindow();
      },
    },
    '->',
    {
      xtype: 'combobox',
      fieldLabel: 'Status',
      store: ['All', 'Pending', 'Processing', 'Shipped', 'Fulfilled'],
      value: 'All',
      listeners: {
        select: function(combo, record) {
          const value = record.get('field1');
          const store = combo.up('grid').getStore();
          if (value === 'All') {
            store.clearFilter();
          } else {
            store.filter('status', value);
          }
        },
      },
    },
  ],

  bbar: {
    xtype: 'pagingtoolbar',
    store: orderStore,
    displayInfo: true,
  },
});

function showOrderDetails(order: any) {
  Ext.create('Ext.window.Window', {
    title: 'Order #' + order.id,
    width: 500,
    modal: true,
    html: '<div style="padding:20px;"><strong>Customer:</strong> ' + order.customerName + '<br>' +
          '<strong>Amount:</strong> $' + order.amount.toFixed(2) + '<br>' +
          '<strong>Status:</strong> ' + order.status + '</div>',
  }).show();
}

function showCreateOrderWindow() {
  Ext.create('Ext.window.Window', {
    title: 'Create Order',
    width: 400,
    modal: true,
    items: [{
      xtype: 'form',
      bodyPadding: 15,
      items: [
        { xtype: 'textfield', fieldLabel: 'Customer', name: 'customerName', allowBlank: false },
        { xtype: 'numberfield', fieldLabel: 'Amount', name: 'amount', minValue: 0 },
      ],
      buttons: [{
        text: 'Create',
        handler: function() {
          const form = this.up('form').getForm();
          if (form.isValid()) {
            const values = form.getValues();
            orderStore.insert(0, values);
            this.up('window').close();
          }
        },
      }],
    }],
  }).show();
}`,
  },
};


export const inventoryManagementExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Page, Card, Layout, DataTable, Badge, Grid, BlockStack, InlineStack, Text, Button, Banner } from '@shopify/polaris';
import { PlusIcon, AlertTriangleIcon } from '@shopify/polaris-icons';
import { BarChart, PieChart } from '@cin7/highcharts-adapter/react';
import React, { useState } from 'react';

function InventoryManagement() {
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  const inventoryData = [
    { id: 1, product: 'Wireless Headphones', sku: 'WH-001', current: 45, reorderPoint: 20, incoming: 100, category: 'Electronics' },
    { id: 2, product: 'USB-C Cable', sku: 'UC-002', current: 12, reorderPoint: 50, incoming: 200, category: 'Accessories' },
    { id: 3, product: 'Laptop Stand', sku: 'LS-003', current: 0, reorderPoint: 10, incoming: 50, category: 'Furniture' },
    { id: 4, product: 'Wireless Mouse', sku: 'WM-004', current: 78, reorderPoint: 30, incoming: 0, category: 'Electronics' },
    { id: 5, product: 'Desk Lamp', sku: 'DL-005', current: 8, reorderPoint: 15, incoming: 40, category: 'Furniture' },
  ];

  const filteredData = showLowStockOnly
    ? inventoryData.filter(item => item.current < item.reorderPoint)
    : inventoryData;

  const metrics = {
    totalItems: inventoryData.length,
    totalStock: inventoryData.reduce((sum, i) => sum + i.current, 0),
    lowStock: inventoryData.filter(i => i.current < i.reorderPoint && i.current > 0).length,
    outOfStock: inventoryData.filter(i => i.current === 0).length,
  };

  const categoryDistribution = [
    { name: 'Electronics', value: inventoryData.filter(i => i.category === 'Electronics').length },
    { name: 'Accessories', value: inventoryData.filter(i => i.category === 'Accessories').length },
    { name: 'Furniture', value: inventoryData.filter(i => i.category === 'Furniture').length },
  ];

  return (
    <Page
      title="Inventory Management"
      subtitle="Track stock levels and manage reorders"
      primaryAction={{
        content: 'Add Item',
        icon: PlusIcon,
      }}
    >
      <Layout>
        {metrics.lowStock > 0 && (
          <Layout.Section>
            <Banner
              title="Low Stock Alert"
              status="warning"
              icon={AlertTriangleIcon}
            >
              <p>{metrics.lowStock} items below reorder point. {metrics.outOfStock} items out of stock.</p>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Total Items</Text>
                <Text variant="heading2xl" as="h2">{metrics.totalItems}</Text>
                <Badge>SKUs</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Total Stock</Text>
                <Text variant="heading2xl" as="h2">{metrics.totalStock}</Text>
                <Badge tone="success">Units</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Low Stock</Text>
                <Text variant="heading2xl" as="h2">{metrics.lowStock}</Text>
                <Badge tone="warning">Alert</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Out of Stock</Text>
                <Text variant="heading2xl" as="h2">{metrics.outOfStock}</Text>
                <Badge tone="critical">Critical</Badge>
              </BlockStack>
            </Card>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Grid columns={{ sm: 1, lg: 2 }} gap="400">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Stock Levels by Product</Text>
                <BarChart
                  title="Current vs Reorder Point"
                  series={[
                    { name: 'Current Stock', data: inventoryData.map(i => i.current) },
                    { name: 'Reorder Point', data: inventoryData.map(i => i.reorderPoint) },
                    { name: 'Incoming', data: inventoryData.map(i => i.incoming) },
                  ]}
                  xAxis={{
                    categories: inventoryData.map(i => i.product),
                  }}
                  height={300}
                />
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Inventory by Category</Text>
                <PieChart
                  title="Category Distribution"
                  series={[{
                    name: 'Items',
                    data: categoryDistribution.map(c => ({ name: c.name, y: c.value })),
                  }]}
                  height={300}
                />
              </BlockStack>
            </Card>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text variant="headingLg" as="h3">Inventory Items</Text>
                <Button
                  onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                  pressed={showLowStockOnly}
                >
                  {showLowStockOnly ? 'Show All' : 'Show Low Stock Only'}
                </Button>
              </InlineStack>

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'numeric', 'numeric', 'text']}
                headings={['Product', 'SKU', 'Current', 'Reorder Point', 'Incoming', 'Status']}
                rows={filteredData.map(item => [
                  item.product,
                  item.sku,
                  item.current,
                  item.reorderPoint,
                  item.incoming,
                  item.current === 0 ? (
                    <Badge tone="critical">Out of Stock</Badge>
                  ) : item.current < item.reorderPoint ? (
                    <Badge tone="warning">Low Stock</Badge>
                  ) : (
                    <Badge tone="success">In Stock</Badge>
                  ),
                ])}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    typescript: `// TypeScript SDK - Inventory Management Domain Layer
import { Entity, ValueObject, Repository, EventBus } from '@cin7/typescript-sdk';

// Value Objects
class SKU extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  protected validate(): void {
    if (!/^[A-Z]{2}-\\d{3}$/.test(this.value)) {
      throw new Error('SKU must be in format XX-000');
    }
  }
}

class StockQuantity extends ValueObject<number> {
  constructor(value: number) {
    super(value);
    this.validate();
  }

  protected validate(): void {
    if (this.value < 0) {
      throw new Error('Stock quantity cannot be negative');
    }
  }

  add(quantity: number): StockQuantity {
    return new StockQuantity(this.value + quantity);
  }

  subtract(quantity: number): StockQuantity {
    const newValue = this.value - quantity;
    if (newValue < 0) {
      throw new Error('Cannot subtract more than current stock');
    }
    return new StockQuantity(newValue);
  }
}

// Enums
enum InventoryCategory {
  Electronics = 'Electronics',
  Accessories = 'Accessories',
  Furniture = 'Furniture',
  Office = 'Office',
}

// Entities
class InventoryItem extends Entity {
  constructor(
    public readonly id: string,
    public readonly productId: string,
    public readonly productName: string,
    public readonly sku: SKU,
    public currentStock: StockQuantity,
    public readonly reorderPoint: StockQuantity,
    public incomingStock: StockQuantity,
    public readonly category: InventoryCategory,
    public lastRestocked: Date = new Date()
  ) {
    super(id);
    this.validate();
  }

  protected validate(): void {
    // Additional validation logic
  }

  get isLowStock(): boolean {
    return this.currentStock.value < this.reorderPoint.value && this.currentStock.value > 0;
  }

  get isOutOfStock(): boolean {
    return this.currentStock.value === 0;
  }

  get needsReorder(): boolean {
    return this.currentStock.value < this.reorderPoint.value;
  }

  adjustStock(quantity: number, reason: string): InventoryItem {
    const newStock = quantity > 0
      ? this.currentStock.add(quantity)
      : this.currentStock.subtract(Math.abs(quantity));

    const updated = this.clone({ currentStock: newStock });

    EventBus.emit('inventory:adjusted', {
      itemId: this.id,
      productName: this.productName,
      quantity,
      reason,
      newStock: newStock.value,
      timestamp: new Date(),
    });

    return updated;
  }

  receiveIncoming(quantity: number): InventoryItem {
    const newStock = this.currentStock.add(quantity);
    const newIncoming = this.incomingStock.subtract(quantity);

    const updated = this.clone({
      currentStock: newStock,
      incomingStock: newIncoming,
      lastRestocked: new Date(),
    });

    EventBus.emit('inventory:restocked', {
      itemId: this.id,
      productName: this.productName,
      quantity,
      newStock: newStock.value,
    });

    return updated;
  }

  initiateReorder(quantity: number): void {
    const newIncoming = this.incomingStock.add(quantity);
    this.incomingStock = newIncoming;

    EventBus.emit('inventory:reorder:initiated', {
      itemId: this.id,
      productName: this.productName,
      quantity,
      expectedTotal: newIncoming.value,
    });
  }

  private clone(updates: Partial<{
    currentStock: StockQuantity;
    incomingStock: StockQuantity;
    lastRestocked: Date;
  }>): InventoryItem {
    return new InventoryItem(
      this.id,
      this.productId,
      this.productName,
      this.sku,
      updates.currentStock ?? this.currentStock,
      this.reorderPoint,
      updates.incomingStock ?? this.incomingStock,
      this.category,
      updates.lastRestocked ?? this.lastRestocked
    );
  }
}

// Repository
interface StockMetrics {
  totalItems: number;
  totalStock: number;
  lowStock: number;
  outOfStock: number;
  needsReorder: number;
}

class InventoryRepository extends Repository<InventoryItem> {
  async findByCategory(category: InventoryCategory): Promise<InventoryItem[]> {
    return this.query({ category });
  }

  async findLowStock(): Promise<InventoryItem[]> {
    const items = await this.findAll();
    return items.filter(i => i.isLowStock);
  }

  async findOutOfStock(): Promise<InventoryItem[]> {
    const items = await this.findAll();
    return items.filter(i => i.isOutOfStock);
  }

  async findNeedsReorder(): Promise<InventoryItem[]> {
    const items = await this.findAll();
    return items.filter(i => i.needsReorder);
  }

  async getStockMetrics(): Promise<StockMetrics> {
    const items = await this.findAll();

    return {
      totalItems: items.length,
      totalStock: items.reduce((sum, i) => sum + i.currentStock.value, 0),
      lowStock: items.filter(i => i.isLowStock).length,
      outOfStock: items.filter(i => i.isOutOfStock).length,
      needsReorder: items.filter(i => i.needsReorder).length,
    };
  }

  async getCategoryDistribution(): Promise<{ category: string; count: number }[]> {
    const items = await this.findAll();
    const categories = Object.values(InventoryCategory);

    return categories.map(category => ({
      category,
      count: items.filter(i => i.category === category).length,
    }));
  }
}

// Service Layer
class InventoryService {
  constructor(private readonly repository: InventoryRepository) {}

  async adjustStock(itemId: string, quantity: number, reason: string): Promise<InventoryItem> {
    const item = await this.repository.findById(itemId);
    if (!item) throw new Error(\`Inventory item not found: \${itemId}\`);

    const updated = item.adjustStock(quantity, reason);
    await this.repository.save(updated);

    return updated;
  }

  async receiveIncoming(itemId: string, quantity: number): Promise<InventoryItem> {
    const item = await this.repository.findById(itemId);
    if (!item) throw new Error(\`Inventory item not found: \${itemId}\`);

    const updated = item.receiveIncoming(quantity);
    await this.repository.save(updated);

    return updated;
  }

  async initiateReorder(itemId: string, quantity: number): Promise<void> {
    const item = await this.repository.findById(itemId);
    if (!item) throw new Error(\`Inventory item not found: \${itemId}\`);

    item.initiateReorder(quantity);
    await this.repository.save(item);
  }

  async processLowStockAlerts(): Promise<InventoryItem[]> {
    const lowStockItems = await this.repository.findLowStock();

    lowStockItems.forEach(item => {
      EventBus.emit('inventory:low-stock-alert', {
        itemId: item.id,
        productName: item.productName,
        currentStock: item.currentStock.value,
        reorderPoint: item.reorderPoint.value,
      });
    });

    return lowStockItems;
  }
}`,
    vanilla: `// Vanilla JS - Inventory Management UI Interactions
import { $, $$, on, addClass, removeClass, fadeIn, fadeOut, attr, html } from '@cin7/vanilla-js';
import { EventBus } from '@cin7/typescript-sdk';

// Initialize Inventory Dashboard
function initInventoryManagement() {
  const dashboard = $('#inventory-dashboard');
  if (!dashboard) return;

  initInventoryTable();
  initFilterButtons();
  initReorderButtons();
  initMetrics();
  initEventListeners();
}

// Inventory Table
function initInventoryTable() {
  const rows = $$('.inventory-row');

  rows.forEach(row => {
    const current = parseInt(attr(row, 'data-current-stock') || '0');
    const reorderPoint = parseInt(attr(row, 'data-reorder-point') || '0');

    // Color-code rows based on stock level
    if (current === 0) {
      addClass(row, 'inventory-row--critical');
    } else if (current < reorderPoint) {
      addClass(row, 'inventory-row--warning');
    }

    on(row, 'mouseenter', () => {
      addClass(row, 'inventory-row--hover');
    });

    on(row, 'mouseleave', () => {
      removeClass(row, 'inventory-row--hover');
    });

    on(row, 'click', () => {
      removeClass($$('.inventory-row'), 'inventory-row--selected');
      addClass(row, 'selected');
      showItemDetails(attr(row, 'data-item-id'));
    });
  });
}

// Filter Buttons
function initFilterButtons() {
  const showAllBtn = $('#show-all-btn');
  const showLowStockBtn = $('#show-low-stock-btn');

  if (showAllBtn) {
    on(showAllBtn, 'click', () => {
      filterInventory('all');
      setActiveFilter(showAllBtn);
    });
  }

  if (showLowStockBtn) {
    on(showLowStockBtn, 'click', () => {
      filterInventory('low-stock');
      setActiveFilter(showLowStockBtn);
    });
  }
}

function filterInventory(filter: string) {
  const rows = $$('.inventory-row');

  rows.forEach(row => {
    const current = parseInt(attr(row, 'data-current-stock') || '0');
    const reorderPoint = parseInt(attr(row, 'data-reorder-point') || '0');

    if (filter === 'all') {
      fadeIn(row, 150);
    } else if (filter === 'low-stock') {
      if (current < reorderPoint) {
        fadeIn(row, 150);
      } else {
        fadeOut(row, 150);
      }
    }
  });
}

function setActiveFilter(activeBtn: HTMLElement) {
  $$('.filter-btn').forEach(btn => removeClass(btn, 'active'));
  addClass(activeBtn, 'active');
}

// Reorder Buttons
function initReorderButtons() {
  const reorderButtons = $$('.reorder-btn');

  reorderButtons.forEach(btn => {
    on(btn, 'click', (e: Event) => {
      e.stopPropagation();
      const itemId = attr(btn, 'data-item-id');
      const productName = attr(btn, 'data-product-name');

      initiateReorder(itemId, productName);
    });
  });
}

function initiateReorder(itemId: string | null, productName: string | null) {
  if (!itemId || !productName) return;

  const quantity = prompt(\`Enter reorder quantity for \${productName}:\`, '100');

  if (quantity && parseInt(quantity) > 0) {
    EventBus.emit('inventory:reorder:requested', {
      itemId,
      productName,
      quantity: parseInt(quantity),
    });

    showNotification(\`Reorder initiated for \${productName}\`, 'success');
  }
}

// Item Details
function showItemDetails(itemId: string | null) {
  const detailsPanel = $('#item-details-panel');
  if (!detailsPanel || !itemId) return;

  const itemRow = $$(\`.inventory-row[data-item-id="\${itemId}"]\`)[0];
  if (!itemRow) return;

  html($('#detail-product-name'), attr(itemRow, 'data-product-name') || '');
  html($('#detail-sku'), attr(itemRow, 'data-sku') || '');
  html($('#detail-current-stock'), attr(itemRow, 'data-current-stock') || '0');
  html($('#detail-reorder-point'), attr(itemRow, 'data-reorder-point') || '0');
  html($('#detail-incoming'), attr(itemRow, 'data-incoming') || '0');

  fadeIn(detailsPanel);
}

// Metrics
function initMetrics() {
  const metrics = $$('.metric-value');
  metrics.forEach(metric => {
    animateMetric(metric as HTMLElement);
  });
}

function updateMetrics(data: { totalItems: number; totalStock: number; lowStock: number; outOfStock: number }) {
  animateNumber($('#metric-total-items'), data.totalItems);
  animateNumber($('#metric-total-stock'), data.totalStock);
  animateNumber($('#metric-low-stock'), data.lowStock);
  animateNumber($('#metric-out-of-stock'), data.outOfStock);
}

function animateMetric(element: HTMLElement) {
  const targetValue = parseInt(attr(element, 'data-value') || '0');
  animateNumber(element, targetValue, 1000);
}

function animateNumber(element: HTMLElement | null, targetValue: number, duration: number = 500) {
  if (!element) return;

  const currentValue = parseInt(element.textContent || '0');
  const steps = 30;
  const increment = (targetValue - currentValue) / steps;

  let step = 0;
  const interval = setInterval(() => {
    if (step >= steps) {
      element.textContent = targetValue.toString();
      clearInterval(interval);
      return;
    }

    element.textContent = Math.round(currentValue + increment * step).toString();
    step++;
  }, duration / steps);
}

// Event Listeners
function initEventListeners() {
  EventBus.on('inventory:adjusted', (event: any) => {
    showNotification(\`Stock adjusted for \${event.productName}: \${event.quantity > 0 ? '+' : ''}\${event.quantity}\`, 'info');
    updateStockDisplay(event.itemId, event.newStock);
  });

  EventBus.on('inventory:restocked', (event: any) => {
    showNotification(\`\${event.productName} restocked: +\${event.quantity} units\`, 'success');
    updateStockDisplay(event.itemId, event.newStock);
  });

  EventBus.on('inventory:low-stock-alert', (event: any) => {
    showNotification(\`Low stock alert: \${event.productName} (\${event.currentStock} units)\`, 'warning');
  });
}

function updateStockDisplay(itemId: string, newStock: number) {
  const rows = $$('.inventory-row');
  rows.forEach(row => {
    if (attr(row, 'data-item-id') === itemId) {
      attr(row, 'data-current-stock', newStock.toString());
      const stockCell = row.querySelector('.stock-cell');
      if (stockCell) {
        html(stockCell, newStock.toString());
        addClass(stockCell, 'stock-updated');
        setTimeout(() => removeClass(stockCell, 'stock-updated'), 1000);
      }
    }
  });
}

function showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
  const notification = document.createElement('div');
  notification.className = \`notification notification--\${type}\`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => addClass(notification, 'notification--visible'), 10);
  setTimeout(() => {
    removeClass(notification, 'notification--visible');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initInventoryManagement);
} else {
  initInventoryManagement();
}`,
    extjs: `// ExtJS - Inventory Management Grid
import { ExtDataGrid } from '@cin7/extjs-adapters';
import { EventBus } from '@cin7/typescript-sdk';

// Inventory Store
const inventoryStore = Ext.create('Ext.data.Store', {
  storeId: 'inventoryStore',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'productId', type: 'string' },
    { name: 'productName', type: 'string' },
    { name: 'sku', type: 'string' },
    { name: 'currentStock', type: 'int' },
    { name: 'reorderPoint', type: 'int' },
    { name: 'incomingStock', type: 'int' },
    { name: 'category', type: 'string' },
  ],
  proxy: {
    type: 'ajax',
    url: '/api/inventory',
    reader: {
      type: 'json',
      rootProperty: 'data',
    },
  },
  autoLoad: true,
});

// Inventory Grid
const inventoryGrid = ExtDataGrid.create({
  title: 'Inventory Management',
  store: inventoryStore,

  columns: [
    {
      dataIndex: 'productName',
      text: 'Product',
      flex: 2,
      filter: { type: 'string' },
    },
    {
      dataIndex: 'sku',
      text: 'SKU',
      width: 100,
      filter: { type: 'string' },
    },
    {
      dataIndex: 'currentStock',
      text: 'Current Stock',
      width: 120,
      align: 'right',
      summaryType: 'sum',
      renderer: function(value, metaData, record) {
        const reorderPoint = record.get('reorderPoint');
        if (value === 0) {
          metaData.style = 'background-color: #ffe6e6; color: #c41e3a; font-weight: bold;';
          return value + ' (OUT)';
        } else if (value < reorderPoint) {
          metaData.style = 'background-color: #fff4e6; color: #ff8c00; font-weight: bold;';
          return value + ' (LOW)';
        }
        return value;
      },
    },
    {
      dataIndex: 'reorderPoint',
      text: 'Reorder Point',
      width: 120,
      align: 'right',
    },
    {
      dataIndex: 'incomingStock',
      text: 'Incoming',
      width: 100,
      align: 'right',
      summaryType: 'sum',
    },
    {
      dataIndex: 'category',
      text: 'Category',
      width: 120,
      filter: {
        type: 'list',
        options: ['Electronics', 'Accessories', 'Furniture', 'Office'],
      },
    },
    {
      xtype: 'actioncolumn',
      text: 'Actions',
      width: 100,
      items: [
        {
          iconCls: 'x-fa fa-plus-circle',
          tooltip: 'Adjust Stock',
          handler: function(grid, rowIndex, colIndex, item, e, record) {
            showAdjustStockWindow(record);
          },
        },
        {
          iconCls: 'x-fa fa-shopping-cart',
          tooltip: 'Reorder',
          handler: function(grid, rowIndex, colIndex, item, e, record) {
            showReorderWindow(record);
          },
        },
      ],
    },
  ],

  features: [
    {
      ftype: 'grouping',
      groupHeaderTpl: '{name} ({rows.length} items)',
    },
    {
      ftype: 'filters',
    },
    {
      ftype: 'summary',
      dock: 'bottom',
    },
  ],

  tbar: [
    {
      text: 'Add Item',
      iconCls: 'x-fa fa-plus',
      handler: function() {
        showAddItemWindow();
      },
    },
    '-',
    {
      text: 'Low Stock Only',
      enableToggle: true,
      pressed: false,
      handler: function(btn) {
        const store = btn.up('grid').getStore();
        if (btn.pressed) {
          store.filterBy(function(record) {
            return record.get('currentStock') < record.get('reorderPoint');
          });
        } else {
          store.clearFilter();
        }
      },
    },
    '->',
    {
      xtype: 'textfield',
      emptyText: 'Search products...',
      width: 200,
      listeners: {
        change: function(field, value) {
          const store = field.up('grid').getStore();
          store.clearFilter();

          if (value) {
            store.filterBy(function(record) {
              const name = record.get('productName').toLowerCase();
              const sku = record.get('sku').toLowerCase();
              const search = value.toLowerCase();
              return name.includes(search) || sku.includes(search);
            });
          }
        },
      },
    },
  ],
});

function showAdjustStockWindow(record: any) {
  Ext.create('Ext.window.Window', {
    title: 'Adjust Stock - ' + record.get('productName'),
    width: 400,
    modal: true,
    items: [{
      xtype: 'form',
      bodyPadding: 15,
      items: [
        { xtype: 'displayfield', fieldLabel: 'Current Stock', value: record.get('currentStock') },
        { xtype: 'numberfield', fieldLabel: 'Adjustment', name: 'adjustment', allowBlank: false },
        { xtype: 'textfield', fieldLabel: 'Reason', name: 'reason', allowBlank: false },
      ],
      buttons: [{
        text: 'Apply',
        handler: function() {
          const form = this.up('form').getForm();
          if (form.isValid()) {
            const values = form.getValues();
            const newStock = record.get('currentStock') + parseInt(values.adjustment);
            record.set('currentStock', newStock);
            record.commit();
            EventBus.emit('inventory:adjusted', {
              itemId: record.get('id'),
              productName: record.get('productName'),
              quantity: parseInt(values.adjustment),
              newStock,
            });
            this.up('window').close();
          }
        },
      }],
    }],
  }).show();
}

function showReorderWindow(record: any) {
  Ext.create('Ext.window.Window', {
    title: 'Reorder - ' + record.get('productName'),
    width: 400,
    modal: true,
    items: [{
      xtype: 'form',
      bodyPadding: 15,
      items: [
        { xtype: 'displayfield', fieldLabel: 'Current Stock', value: record.get('currentStock') },
        { xtype: 'displayfield', fieldLabel: 'Reorder Point', value: record.get('reorderPoint') },
        { xtype: 'numberfield', fieldLabel: 'Quantity', name: 'quantity', value: 100, minValue: 1 },
      ],
      buttons: [{
        text: 'Initiate Reorder',
        handler: function() {
          const form = this.up('form').getForm();
          if (form.isValid()) {
            const values = form.getValues();
            const newIncoming = record.get('incomingStock') + parseInt(values.quantity);
            record.set('incomingStock', newIncoming);
            record.commit();
            EventBus.emit('inventory:reorder:initiated', {
              itemId: record.get('id'),
              productName: record.get('productName'),
              quantity: parseInt(values.quantity),
            });
            this.up('window').close();
          }
        },
      }],
    }],
  }).show();
}

function showAddItemWindow() {
  Ext.create('Ext.window.Window', {
    title: 'Add Inventory Item',
    width: 500,
    modal: true,
    items: [{
      xtype: 'form',
      bodyPadding: 15,
      items: [
        { xtype: 'textfield', fieldLabel: 'Product Name', name: 'productName', allowBlank: false },
        { xtype: 'textfield', fieldLabel: 'SKU', name: 'sku', allowBlank: false },
        { xtype: 'numberfield', fieldLabel: 'Current Stock', name: 'currentStock', value: 0 },
        { xtype: 'numberfield', fieldLabel: 'Reorder Point', name: 'reorderPoint', value: 10 },
        {
          xtype: 'combobox',
          fieldLabel: 'Category',
          name: 'category',
          store: ['Electronics', 'Accessories', 'Furniture', 'Office'],
          forceSelection: true,
        },
      ],
      buttons: [{
        text: 'Add',
        handler: function() {
          const form = this.up('form').getForm();
          if (form.isValid()) {
            const values = form.getValues();
            inventoryStore.insert(0, values);
            this.up('window').close();
          }
        },
      }],
    }],
  }).show();
}`,
  },
};


export const customerPortalExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Page, Card, Layout, DataTable, Badge, Grid, BlockStack, InlineStack, Text, TextField, Tabs, Button, Avatar } from '@shopify/polaris';
import { SearchIcon, EmailIcon } from '@shopify/polaris-icons';
import { LineChart } from '@cin7/highcharts-adapter/react';
import React, { useState, useCallback } from 'react';

function CustomerPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);

  const customerData = [
    { id: '1', name: 'John Smith', email: 'john@example.com', status: 'Active', orders: 24, lifetime: 2456.78, lastOrder: '2025-01-09' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', status: 'Active', orders: 18, lifetime: 1890.45, lastOrder: '2025-01-08' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', status: 'Inactive', orders: 3, lifetime: 234.56, lastOrder: '2024-12-15' },
    { id: '4', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', orders: 45, lifetime: 5678.90, lastOrder: '2025-01-10' },
  ];

  const filteredCustomers = customerData.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const metrics = {
    total: customerData.length,
    active: customerData.filter(c => c.status === 'Active').length,
    totalRevenue: customerData.reduce((sum, c) => sum + c.lifetime, 0),
    avgLifetime: customerData.reduce((sum, c) => sum + c.lifetime, 0) / customerData.length,
  };

  const revenueHistory = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2400 },
    { month: 'Apr', revenue: 2100 },
    { month: 'May', revenue: 3200 },
  ];

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const tabs = [
    { id: 'all', content: 'All Customers' },
    { id: 'active', content: 'Active' },
    { id: 'inactive', content: 'Inactive' },
  ];

  return (
    <Page
      title="Customer Portal"
      subtitle="Manage customer accounts and relationships"
    >
      <Layout>
        <Layout.Section>
          <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Total Customers</Text>
                <Text variant="heading2xl" as="h2">{metrics.total}</Text>
                <Badge>All Time</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Active Customers</Text>
                <Text variant="heading2xl" as="h2">{metrics.active}</Text>
                <Badge tone="success">This Month</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Total Revenue</Text>
                <Text variant="heading2xl" as="h2">\${metrics.totalRevenue.toFixed(2)}</Text>
                <Badge tone="info">Lifetime</Badge>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text as="p" tone="subdued">Avg Lifetime Value</Text>
                <Text variant="heading2xl" as="h2">\${metrics.avgLifetime.toFixed(2)}</Text>
                <Badge>Per Customer</Badge>
              </BlockStack>
            </Card>
          </Grid>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text variant="headingLg" as="h3">Revenue Trend</Text>
              <LineChart
                title="Monthly Customer Revenue"
                smooth={true}
                markers={true}
                series={[{
                  name: 'Revenue',
                  data: revenueHistory.map(r => r.revenue),
                }]}
                xAxis={{
                  categories: revenueHistory.map(r => r.month),
                }}
                height={250}
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <InlineStack align="space-between">
                <Text variant="headingLg" as="h3">Customer Directory</Text>
                <TextField
                  label=""
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={handleSearch}
                  prefix={<Icon source={SearchIcon} />}
                  autoComplete="off"
                />
              </InlineStack>

              <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text', 'text']}
                headings={['Customer', 'Email', 'Orders', 'Lifetime Value', 'Status', 'Last Order']}
                rows={filteredCustomers.map(customer => [
                  customer.name,
                  customer.email,
                  customer.orders,
                  \`$\${customer.lifetime.toFixed(2)}\`,
                  customer.status === 'Active' ? (
                    <Badge tone="success">Active</Badge>
                  ) : (
                    <Badge>Inactive</Badge>
                  ),
                  customer.lastOrder,
                ])}
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}`,
    typescript: `// TypeScript SDK - Customer Portal Domain Layer
import { Entity, ValueObject, Repository, EventBus } from '@cin7/typescript-sdk';

// Value Objects
class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
    this.validate();
  }

  protected validate(): void {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(this.value)) {
      throw new Error('Invalid email address');
    }
  }
}

class CustomerName extends ValueObject<{ first: string; last: string }> {
  constructor(first: string, last: string) {
    super({ first, last });
    this.validate();
  }

  protected validate(): void {
    if (!this.value.first || !this.value.last) {
      throw new Error('First and last name required');
    }
  }

  get fullName(): string {
    return \`\${this.value.first} \${this.value.last}\`;
  }
}

// Enums
enum CustomerStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Suspended = 'Suspended',
}

// Entities
class Customer extends Entity {
  constructor(
    public readonly id: string,
    public readonly name: CustomerName,
    public readonly email: Email,
    public status: CustomerStatus,
    public orderCount: number = 0,
    public lifetimeValue: number = 0,
    public readonly createdAt: Date = new Date(),
    public lastOrderDate?: Date
  ) {
    super(id);
    this.validate();
  }

  protected validate(): void {
    if (this.lifetimeValue < 0) {
      throw new Error('Lifetime value cannot be negative');
    }
  }

  get isActive(): boolean {
    return this.status === CustomerStatus.Active;
  }

  get daysSinceLastOrder(): number | null {
    if (!this.lastOrderDate) return null;
    const diff = Date.now() - this.lastOrderDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  addOrder(orderValue: number): Customer {
    const updated = this.clone({
      orderCount: this.orderCount + 1,
      lifetimeValue: this.lifetimeValue + orderValue,
      lastOrderDate: new Date(),
    });

    EventBus.emit('customer:order:added', {
      customerId: this.id,
      customerName: this.name.fullName,
      orderValue,
      newLifetimeValue: updated.lifetimeValue,
    });

    return updated;
  }

  activate(): Customer {
    if (this.status === CustomerStatus.Active) {
      throw new Error('Customer is already active');
    }

    const updated = this.clone({ status: CustomerStatus.Active });

    EventBus.emit('customer:activated', {
      customerId: this.id,
      customerName: this.name.fullName,
    });

    return updated;
  }

  suspend(): Customer {
    const updated = this.clone({ status: CustomerStatus.Suspended });

    EventBus.emit('customer:suspended', {
      customerId: this.id,
      customerName: this.name.fullName,
    });

    return updated;
  }

  private clone(updates: Partial<{
    status: CustomerStatus;
    orderCount: number;
    lifetimeValue: number;
    lastOrderDate: Date;
  }>): Customer {
    return new Customer(
      this.id,
      this.name,
      this.email,
      updates.status ?? this.status,
      updates.orderCount ?? this.orderCount,
      updates.lifetimeValue ?? this.lifetimeValue,
      this.createdAt,
      updates.lastOrderDate ?? this.lastOrderDate
    );
  }
}

// Repository
interface CustomerMetrics {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  totalRevenue: number;
  avgLifetimeValue: number;
}

class CustomerRepository extends Repository<Customer> {
  async findByEmail(email: string): Promise<Customer | null> {
    const customers = await this.query({ email });
    return customers[0] || null;
  }

  async findByStatus(status: CustomerStatus): Promise<Customer[]> {
    return this.query({ status });
  }

  async findActive(): Promise<Customer[]> {
    return this.findByStatus(CustomerStatus.Active);
  }

  async findInactive(): Promise<Customer[]> {
    const customers = await this.findAll();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return customers.filter(c => {
      return c.lastOrderDate && c.lastOrderDate < thirtyDaysAgo;
    });
  }

  async getCustomerMetrics(): Promise<CustomerMetrics> {
    const customers = await this.findAll();

    const totalRevenue = customers.reduce((sum, c) => sum + c.lifetimeValue, 0);

    return {
      total: customers.length,
      active: customers.filter(c => c.status === CustomerStatus.Active).length,
      inactive: customers.filter(c => c.status === CustomerStatus.Inactive).length,
      suspended: customers.filter(c => c.status === CustomerStatus.Suspended).length,
      totalRevenue,
      avgLifetimeValue: customers.length > 0 ? totalRevenue / customers.length : 0,
    };
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    const customers = await this.findAll();
    const lowerQuery = query.toLowerCase();

    return customers.filter(c =>
      c.name.fullName.toLowerCase().includes(lowerQuery) ||
      c.email.value.toLowerCase().includes(lowerQuery)
    );
  }
}

// Service Layer
class CustomerService {
  constructor(private readonly repository: CustomerRepository) {}

  async createCustomer(first: string, last: string, email: string): Promise<Customer> {
    const existingCustomer = await this.repository.findByEmail(email);
    if (existingCustomer) {
      throw new Error(\`Customer with email \${email} already exists\`);
    }

    const customer = new Customer(
      \`CUST-\${Date.now()}\`,
      new CustomerName(first, last),
      new Email(email),
      CustomerStatus.Active
    );

    await this.repository.save(customer);
    EventBus.emit('customer:created', {
      customerId: customer.id,
      customerName: customer.name.fullName,
      email: customer.email.value,
    });

    return customer;
  }

  async recordOrder(customerId: string, orderValue: number): Promise<Customer> {
    const customer = await this.repository.findById(customerId);
    if (!customer) throw new Error(\`Customer not found: \${customerId}\`);

    const updated = customer.addOrder(orderValue);
    await this.repository.save(updated);

    return updated;
  }

  async identifyAtRisk(): Promise<Customer[]> {
    const customers = await this.repository.findAll();
    const atRiskCustomers = customers.filter(c => {
      const daysSince = c.daysSinceLastOrder;
      return daysSince !== null && daysSince > 90 && c.isActive;
    });

    atRiskCustomers.forEach(customer => {
      EventBus.emit('customer:at-risk', {
        customerId: customer.id,
        customerName: customer.name.fullName,
        daysSinceLastOrder: customer.daysSinceLastOrder,
      });
    });

    return atRiskCustomers;
  }
}`,
    vanilla: `// Vanilla JS - Customer Portal UI Interactions
import { $, $$, on, addClass, removeClass, fadeIn, fadeOut, attr, html } from '@cin7/vanilla-js';
import { EventBus } from '@cin7/typescript-sdk';

// Initialize Customer Portal
function initCustomerPortal() {
  const portal = $('#customer-portal');
  if (!portal) return;

  initCustomerTable();
  initSearchBar();
  initTabFilters();
  initMetrics();
  initEventListeners();
}

// Customer Table
function initCustomerTable() {
  const rows = $$('.customer-row');

  rows.forEach(row => {
    on(row, 'mouseenter', () => {
      addClass(row, 'customer-row--hover');
    });

    on(row, 'mouseleave', () => {
      removeClass(row, 'customer-row--hover');
    });

    on(row, 'click', () => {
      removeClass($$('.customer-row'), 'customer-row--selected');
      addClass(row, 'selected');
      showCustomerDetails(attr(row, 'data-customer-id'));
    });
  });
}

// Search Bar
function initSearchBar() {
  const searchInput = $('#customer-search');
  if (!searchInput) return;

  let debounceTimer: NodeJS.Timeout;

  on(searchInput, 'input', (e: Event) => {
    clearTimeout(debounceTimer);
    const target = e.target as HTMLInputElement;

    debounceTimer = setTimeout(() => {
      searchCustomers(target.value);
    }, 300);
  });
}

function searchCustomers(query: string) {
  const rows = $$('.customer-row');
  const lowerQuery = query.toLowerCase();
  let visibleCount = 0;

  rows.forEach(row => {
    const name = (attr(row, 'data-customer-name') || '').toLowerCase();
    const email = (attr(row, 'data-customer-email') || '').toLowerCase();

    if (name.includes(lowerQuery) || email.includes(lowerQuery)) {
      fadeIn(row, 150);
      visibleCount++;
    } else {
      fadeOut(row, 150);
    }
  });

  updateCustomerCount(visibleCount);
}

// Tab Filters
function initTabFilters() {
  const tabs = $$('.tab-button');

  tabs.forEach(tab => {
    on(tab, 'click', () => {
      const filter = attr(tab, 'data-filter');
      setActiveTab(tab);
      filterByStatus(filter || 'all');
    });
  });
}

function setActiveTab(activeTab: HTMLElement) {
  $$('.tab-button').forEach(tab => removeClass(tab, 'active'));
  addClass(activeTab, 'active');
}

function filterByStatus(status: string) {
  const rows = $$('.customer-row');
  let visibleCount = 0;

  rows.forEach(row => {
    const rowStatus = attr(row, 'data-customer-status');

    if (status === 'all' || rowStatus === status) {
      fadeIn(row, 150);
      visibleCount++;
    } else {
      fadeOut(row, 150);
    }
  });

  updateCustomerCount(visibleCount);
}

// Customer Details
function showCustomerDetails(customerId: string | null) {
  const detailsPanel = $('#customer-details-panel');
  if (!detailsPanel || !customerId) return;

  const customerRow = $$(\`.customer-row[data-customer-id="\${customerId}"]\`)[0];
  if (!customerRow) return;

  html($('#detail-customer-name'), attr(customerRow, 'data-customer-name') || '');
  html($('#detail-customer-email'), attr(customerRow, 'data-customer-email') || '');
  html($('#detail-order-count'), attr(customerRow, 'data-order-count') || '0');
  html($('#detail-lifetime-value'), attr(customerRow, 'data-lifetime-value') || '$0.00');
  html($('#detail-status'), attr(customerRow, 'data-customer-status') || 'Unknown');

  fadeIn(detailsPanel);
}

// Metrics
function initMetrics() {
  const metrics = $$('.metric-value');
  metrics.forEach(metric => {
    animateMetric(metric as HTMLElement);
  });
}

function updateMetrics(data: { total: number; active: number; totalRevenue: number; avgLifetime: number }) {
  animateNumber($('#metric-total'), data.total);
  animateNumber($('#metric-active'), data.active);
  animateDecimal($('#metric-revenue'), data.totalRevenue);
  animateDecimal($('#metric-avg-lifetime'), data.avgLifetime);
}

function animateMetric(element: HTMLElement) {
  const targetValue = parseFloat(attr(element, 'data-value') || '0');
  animateNumber(element, targetValue, 1000);
}

function animateNumber(element: HTMLElement | null, targetValue: number, duration: number = 500) {
  if (!element) return;

  const currentValue = parseInt(element.textContent || '0');
  const steps = 30;
  const increment = (targetValue - currentValue) / steps;

  let step = 0;
  const interval = setInterval(() => {
    if (step >= steps) {
      element.textContent = targetValue.toString();
      clearInterval(interval);
      return;
    }

    element.textContent = Math.round(currentValue + increment * step).toString();
    step++;
  }, duration / steps);
}

function animateDecimal(element: HTMLElement | null, targetValue: number, duration: number = 500) {
  if (!element) return;

  const currentValue = parseFloat(element.textContent?.replace('$', '') || '0');
  const steps = 30;
  const increment = (targetValue - currentValue) / steps;

  let step = 0;
  const interval = setInterval(() => {
    if (step >= steps) {
      element.textContent = \`$\${targetValue.toFixed(2)}\`;
      clearInterval(interval);
      return;
    }

    const value = currentValue + increment * step;
    element.textContent = \`$\${value.toFixed(2)}\`;
    step++;
  }, duration / steps);
}

function updateCustomerCount(count: number) {
  const countEl = $('#customer-count');
  if (countEl) {
    html(countEl, \`Showing \${count} customers\`);
  }
}

// Event Listeners
function initEventListeners() {
  EventBus.on('customer:created', (event: any) => {
    showNotification(\`New customer: \${event.customerName}\`, 'success');
  });

  EventBus.on('customer:order:added', (event: any) => {
    showNotification(\`\${event.customerName} placed an order: $\${event.orderValue.toFixed(2)}\`, 'info');
  });

  EventBus.on('customer:at-risk', (event: any) => {
    showNotification(\`At-risk customer: \${event.customerName} (\${event.daysSinceLastOrder} days)\`, 'warning');
  });
}

function showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
  const notification = document.createElement('div');
  notification.className = \`notification notification--\${type}\`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => addClass(notification, 'notification--visible'), 10);
  setTimeout(() => {
    removeClass(notification, 'notification--visible');
    setTimeout(() => document.body.removeChild(notification), 300);
  }, 3000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCustomerPortal);
} else {
  initCustomerPortal();
}`,
    extjs: `// ExtJS - Customer Portal Grid
import { ExtDataGrid } from '@cin7/extjs-adapters';
import { EventBus } from '@cin7/typescript-sdk';

// Customer Store
const customerStore = Ext.create('Ext.data.Store', {
  storeId: 'customerStore',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'firstName', type: 'string' },
    { name: 'lastName', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'orderCount', type: 'int' },
    { name: 'lifetimeValue', type: 'number' },
    { name: 'createdAt', type: 'date' },
    { name: 'lastOrderDate', type: 'date' },
  ],
  proxy: {
    type: 'ajax',
    url: '/api/customers',
    reader: {
      type: 'json',
      rootProperty: 'data',
    },
  },
  autoLoad: true,
});

// Customer Grid
const customerGrid = ExtDataGrid.create({
  title: 'Customer Directory',
  store: customerStore,

  columns: [
    {
      dataIndex: 'firstName',
      text: 'First Name',
      flex: 1,
      filter: { type: 'string' },
    },
    {
      dataIndex: 'lastName',
      text: 'Last Name',
      flex: 1,
      filter: { type: 'string' },
    },
    {
      dataIndex: 'email',
      text: 'Email',
      flex: 2,
      filter: { type: 'string' },
    },
    {
      dataIndex: 'orderCount',
      text: 'Orders',
      width: 80,
      align: 'right',
      summaryType: 'sum',
    },
    {
      dataIndex: 'lifetimeValue',
      text: 'Lifetime Value',
      width: 140,
      align: 'right',
      xtype: 'numbercolumn',
      format: '$0,000.00',
      summaryType: 'sum',
    },
    {
      dataIndex: 'status',
      text: 'Status',
      width: 100,
      filter: {
        type: 'list',
        options: ['Active', 'Inactive', 'Suspended'],
      },
      renderer: function(value) {
        const colors = {
          'Active': '#28a745',
          'Inactive': '#6c757d',
          'Suspended': '#dc3545',
        };
        const color = colors[value] || '#6c757d';
        return '<span style="background:' + color + ';color:white;padding:4px 12px;border-radius:12px;">' + value + '</span>';
      },
    },
    {
      dataIndex: 'lastOrderDate',
      text: 'Last Order',
      width: 120,
      xtype: 'datecolumn',
      format: 'Y-m-d',
    },
  ],

  features: [
    {
      ftype: 'filters',
    },
    {
      ftype: 'summary',
      dock: 'bottom',
    },
  ],

  tbar: [
    {
      text: 'Add Customer',
      iconCls: 'x-fa fa-user-plus',
      handler: function() {
        showAddCustomerWindow();
      },
    },
    '-',
    {
      text: 'Active Only',
      enableToggle: true,
      pressed: false,
      handler: function(btn) {
        const store = btn.up('grid').getStore();
        if (btn.pressed) {
          store.filter('status', 'Active');
        } else {
          store.clearFilter();
        }
      },
    },
    '->',
    {
      xtype: 'textfield',
      emptyText: 'Search customers...',
      width: 250,
      listeners: {
        change: function(field, value) {
          const store = field.up('grid').getStore();
          store.clearFilter();

          if (value) {
            store.filterBy(function(record) {
              const firstName = record.get('firstName').toLowerCase();
              const lastName = record.get('lastName').toLowerCase();
              const email = record.get('email').toLowerCase();
              const search = value.toLowerCase();
              return firstName.includes(search) || lastName.includes(search) || email.includes(search);
            });
          }
        },
      },
    },
  ],
});

function showAddCustomerWindow() {
  Ext.create('Ext.window.Window', {
    title: 'Add Customer',
    width: 500,
    modal: true,
    items: [{
      xtype: 'form',
      bodyPadding: 15,
      items: [
        { xtype: 'textfield', fieldLabel: 'First Name', name: 'firstName', allowBlank: false },
        { xtype: 'textfield', fieldLabel: 'Last Name', name: 'lastName', allowBlank: false },
        { xtype: 'textfield', fieldLabel: 'Email', name: 'email', vtype: 'email', allowBlank: false },
        {
          xtype: 'combobox',
          fieldLabel: 'Status',
          name: 'status',
          store: ['Active', 'Inactive', 'Suspended'],
          value: 'Active',
        },
      ],
      buttons: [{
        text: 'Add',
        handler: function() {
          const form = this.up('form').getForm();
          if (form.isValid()) {
            const values = form.getValues();
            values.orderCount = 0;
            values.lifetimeValue = 0;
            values.createdAt = new Date();
            customerStore.insert(0, values);
            EventBus.emit('customer:created', {
              customerId: 'CUST-' + Date.now(),
              customerName: values.firstName + ' ' + values.lastName,
              email: values.email,
            });
            this.up('window').close();
          }
        },
      }],
    }],
  }).show();
}`,
  },
};
