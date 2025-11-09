import type { CodeVariant } from './types';

export const ecommerceComponentsExamples: Record<string, CodeVariant> = {
  default: {
    react: `// E-commerce Product Showcase - React + Polaris
import { Card, Button, Badge, Thumbnail, Text } from '@shopify/polaris';
import { CartIcon } from '@shopify/polaris-icons';

function ProductShowcase({ product }) {
  return (
    <Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', padding: '16px' }}>
        <Thumbnail size="large" source={product.image} alt={product.name} />
        <div>
          <Text variant="headingLg">{product.name}</Text>
          <Text variant="headingMd">{product.price}</Text>
          <Button primary icon={CartIcon}>Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
}`,
    vanilla: `// E-commerce Product Showcase - Vanilla JS + @cin7/vanilla-js
import { $, on, EventBus, createCard } from '@cin7/vanilla-js';

const product = { name: 'Product', price: 299.99, image: 'image.jpg' };
const card = createCard({ title: product.name });
card.innerHTML = \`<img src="\${product.image}" /><h2>\${product.name}</h2><p>\\$\${product.price}</p><button id="add-to-cart">Add to Cart</button>\`;
on($('#add-to-cart'), 'click', () => EventBus.emit('cart:add', { product }));`,
    extjs: `// E-commerce Product Showcase - ExtJS
Ext.create('Ext.panel.Panel', {
  layout: 'hbox',
  items: [{
    xtype: 'image',
    src: 'product.jpg',
    width: 300
  }, {
    xtype: 'container',
    flex: 1,
    items: [{
      html: '<h2>Product Name</h2><p>$299.99</p>'
    }, {
      xtype: 'button',
      text: 'Add to Cart',
      iconCls: 'x-fa fa-shopping-cart'
    }]
  }]
});`,
    typescript: `// E-commerce Product Showcase - TypeScript
import { Card, Button, Thumbnail, Text } from '@shopify/polaris';
import { CartIcon } from '@shopify/polaris-icons';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductShowcaseProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ product, onAddToCart }) => {
  return (
    <Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', padding: '16px' }}>
        <Thumbnail size="large" source={product.image} alt={product.name} />
        <div>
          <Text variant="headingLg">{product.name}</Text>
          <Text variant="headingMd">{product.price.toFixed(2)}</Text>
          <Button primary icon={CartIcon} onClick={() => onAddToCart?.(product)}>Add to Cart</Button>
        </div>
      </div>
    </Card>
  );
};`
  },

  productcatalog: {
    react: `// Product Catalog Grid - React
import { Card, Button, Thumbnail, Text } from '@shopify/polaris';
import { CartIcon } from '@shopify/polaris-icons';

function ProductCatalog({ products }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {products.map(p => (
        <Card key={p.id}>
          <Thumbnail source={p.image} alt={p.name} />
          <Text variant="headingMd">{p.name}</Text>
          <Text>{p.price}</Text>
          <Button primary fullWidth icon={CartIcon}>Add to Cart</Button>
        </Card>
      ))}
    </div>
  );
}`,
    vanilla: `// Product Catalog Grid - Vanilla JS
import { $, createCard } from '@cin7/vanilla-js';

const products = [{ id: 1, name: 'Product', price: 299.99 }];
const grid = document.createElement('div');
grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;';
products.forEach(p => {
  const card = createCard({ sectioned: true });
  card.innerHTML = \`<h3>\${p.name}</h3><p>\\$\${p.price}</p><button>Add to Cart</button>\`;
  grid.appendChild(card);
});
$('#app').appendChild(grid);`,
    extjs: `// Product Catalog Grid - ExtJS
Ext.create('Ext.view.View', {
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'price'],
    data: [{ id: 1, name: 'Product', price: 299.99 }]
  }),
  tpl: '<div class="product-grid"><tpl for="."><div class="card"><h3>{name}</h3><p>\${price}</p></div></tpl></div>'
});`,
    typescript: `// Product Catalog Grid - TypeScript
import { Card, Button, Thumbnail, Text } from '@shopify/polaris';
import { CartIcon } from '@shopify/polaris-icons';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCatalog: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
      {products.map(p => (
        <Card key={p.id}>
          <Thumbnail source={p.image} alt={p.name} />
          <Text variant="headingMd">{p.name}</Text>
          <Text>{p.price.toFixed(2)}</Text>
          <Button primary fullWidth icon={CartIcon}>Add to Cart</Button>
        </Card>
      ))}
    </div>
  );
};`
  },

  shoppingcartview: {
    react: `// Shopping Cart - React
import { Card, Button, Text } from '@shopify/polaris';
import { MinusIcon, PlusIcon } from '@shopify/polaris-icons';
import { useState } from 'react';

function ShoppingCart() {
  const [items, setItems] = useState([{ id: 1, name: 'Product', price: 299.99, qty: 1 }]);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Card>
      <Text variant="headingLg">Shopping Cart</Text>
      {items.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
          <Text>{item.name}</Text>
          <Button size="small" icon={MinusIcon} />
          <Text>{item.qty}</Text>
          <Button size="small" icon={PlusIcon} />
        </div>
      ))}
      <Text variant="headingMd">{\`Total: $\${total.toFixed(2)}\`}</Text>
      <Button primary fullWidth>Checkout</Button>
    </Card>
  );
}`,
    vanilla: `// Shopping Cart - Vanilla JS
import { $, createCard } from '@cin7/vanilla-js';

let items = [{ id: 1, name: 'Product', price: 299.99, qty: 1 }];
function renderCart() {
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const card = createCard({ title: 'Shopping Cart' });
  card.innerHTML = \`<div>\${items.map(i => \`<div>\${i.name} - Qty: \${i.qty}</div>\`).join('')}<h3>Total: \\$\${total.toFixed(2)}</h3><button>Checkout</button></div>\`;
  $('#app').innerHTML = '';
  $('#app').appendChild(card);
}
renderCart();`,
    extjs: `// Shopping Cart - ExtJS
Ext.create('Ext.panel.Panel', {
  title: 'Shopping Cart',
  items: [{
    xtype: 'grid',
    store: Ext.create('Ext.data.Store', {
      fields: ['name', 'price', 'qty'],
      data: [{ name: 'Product', price: 299.99, qty: 1 }]
    }),
    columns: [{ text: 'Name', dataIndex: 'name' }, { text: 'Price', dataIndex: 'price' }, { text: 'Qty', dataIndex: 'qty' }]
  }, {
    xtype: 'button',
    text: 'Checkout'
  }]
});`,
    typescript: `// Shopping Cart - TypeScript
import { Card, Button, Text } from '@shopify/polaris';
import { MinusIcon, PlusIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([{ id: 1, name: 'Product', price: 299.99, qty: 1 }]);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Card>
      <Text variant="headingLg">Shopping Cart</Text>
      {items.map(item => (
        <div key={item.id}><Text>{item.name}</Text><Text>{item.qty}</Text></div>
      ))}
      <Text variant="headingMd">{\`Total: $\${total.toFixed(2)}\`}</Text>
      <Button primary fullWidth>Checkout</Button>
    </Card>
  );
};`
  },

  checkoutprocess: {
    react: `// Checkout Flow - React
import { Card, Button, Text, TextField, BlockStack } from '@shopify/polaris';
import { useState } from 'react';

function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const steps = ['Shipping', 'Payment', 'Review'];

  return (
    <Card>
      <Text variant="headingLg">Checkout - {steps[step]}</Text>
      {step === 0 && <BlockStack gap="400"><TextField label="Email" /><Button primary onClick={() => setStep(1)}>Continue</Button></BlockStack>}
      {step === 1 && <BlockStack gap="400"><TextField label="Card Number" /><Button primary onClick={() => setStep(2)}>Review</Button></BlockStack>}
      {step === 2 && <BlockStack gap="400"><Text>Total: \$359.97</Text><Button primary>Place Order</Button></BlockStack>}
    </Card>
  );
}`,
    vanilla: `// Checkout Flow - Vanilla JS
import { $, on, createCard } from '@cin7/vanilla-js';

let step = 0;
function renderCheckout() {
  const card = createCard({ title: \`Checkout Step \${step + 1}\` });
  if (step === 0) card.innerHTML = '<input placeholder="Email" /><button id="next">Continue</button>';
  else if (step === 1) card.innerHTML = '<input placeholder="Card" /><button id="next">Review</button>';
  else card.innerHTML = '<p>Total: \\$359.97</p><button>Place Order</button>';
  $('#app').innerHTML = '';
  $('#app').appendChild(card);
  if ($('#next')) on($('#next'), 'click', () => { step++; renderCheckout(); });
}
renderCheckout();`,
    extjs: `// Checkout Flow - ExtJS
Ext.create('Ext.panel.Panel', {
  title: 'Checkout',
  layout: 'card',
  items: [{
    title: 'Shipping',
    items: [{ xtype: 'textfield', fieldLabel: 'Email' }, { xtype: 'button', text: 'Continue' }]
  }, {
    title: 'Payment',
    items: [{ xtype: 'textfield', fieldLabel: 'Card' }, { xtype: 'button', text: 'Review' }]
  }, {
    title: 'Review',
    items: [{ html: '<p>Total: $359.97</p>' }, { xtype: 'button', text: 'Place Order' }]
  }]
});`,
    typescript: `// Checkout Flow - TypeScript
import { Card, Button, Text, TextField, BlockStack } from '@shopify/polaris';
import React, { useState } from 'react';

const CheckoutFlow: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const steps = ['Shipping', 'Payment', 'Review'];

  return (
    <Card>
      <Text variant="headingLg">Checkout - {steps[step]}</Text>
      {step === 0 && <BlockStack gap="400"><TextField label="Email" /><Button primary onClick={() => setStep(1)}>Continue</Button></BlockStack>}
      {step === 1 && <BlockStack gap="400"><TextField label="Card Number" /><Button primary onClick={() => setStep(2)}>Review</Button></BlockStack>}
      {step === 2 && <BlockStack gap="400"><Text>Total: \$359.97</Text><Button primary>Place Order</Button></BlockStack>}
    </Card>
  );
};`
  },

  productreviews: {
    react: `// Customer Reviews - React
import { Card, Text, Badge, Icon, InlineStack } from '@shopify/polaris';
import { StarFilledIcon } from '@shopify/polaris-icons';

function CustomerReviews({ reviews }) {
  return (
    <Card>
      <Text variant="headingLg">Customer Reviews</Text>
      <Text variant="heading2xl">4.5</Text>
      {reviews.map(r => (
        <div key={r.id} style={{ padding: '16px 0', borderTop: '1px solid #e1e1e1' }}>
          <InlineStack gap="200">
            <Text fontWeight="semibold">{r.name}</Text>
            {r.verified && <Badge status="success">Verified</Badge>}
          </InlineStack>
          <InlineStack gap="025">
            {Array.from({ length: 5 }, (_, i) => <Icon key={i} source={StarFilledIcon} />)}
          </InlineStack>
          <Text>{r.content}</Text>
        </div>
      ))}
    </Card>
  );
}`,
    vanilla: `// Customer Reviews - Vanilla JS
import { $, createCard } from '@cin7/vanilla-js';

const reviews = [{ id: 1, name: 'Sarah', rating: 5, verified: true, content: 'Amazing!' }];
const card = createCard({ title: 'Customer Reviews' });
let html = '<h2>4.5 Stars</h2>';
reviews.forEach(r => {
  html += \`<div><strong>\${r.name}</strong> \${r.verified ? '✓' : ''}<div class="stars">★★★★★</div><p>\${r.content}</p></div>\`;
});
card.innerHTML = html;
$('#app').appendChild(card);`,
    extjs: `// Customer Reviews - ExtJS
Ext.create('Ext.panel.Panel', {
  title: 'Customer Reviews',
  items: [{
    html: '<h2>4.5 Stars</h2>'
  }, {
    xtype: 'dataview',
    store: Ext.create('Ext.data.Store', {
      fields: ['name', 'content'],
      data: [{ name: 'Sarah', content: 'Amazing!' }]
    }),
    tpl: '<tpl for="."><div><strong>{name}</strong><p>{content}</p></div></tpl>'
  }]
});`,
    typescript: `// Customer Reviews - TypeScript
import { Card, Text, Badge, Icon, InlineStack } from '@shopify/polaris';
import { StarFilledIcon } from '@shopify/polaris-icons';
import React from 'react';

interface Review {
  id: number;
  name: string;
  rating: number;
  verified: boolean;
  content: string;
}

const CustomerReviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  return (
    <Card>
      <Text variant="headingLg">Customer Reviews</Text>
      <Text variant="heading2xl">4.5</Text>
      {reviews.map(r => (
        <div key={r.id} style={{ padding: '16px 0', borderTop: '1px solid #e1e1e1' }}>
          <InlineStack gap="200">
            <Text fontWeight="semibold">{r.name}</Text>
            {r.verified && <Badge status="success">Verified</Badge>}
          </InlineStack>
          <Text>{r.content}</Text>
        </div>
      ))}
    </Card>
  );
};`
  },

  inventorymanagement: {
    react: `// Inventory Management - React
import { Card, Text, Badge, Button } from '@shopify/polaris';

function InventoryManagement({ items }) {
  const getStatusBadge = (status) => {
    if (status === 'normal') return <Badge status="success">In Stock</Badge>;
    if (status === 'low') return <Badge status="attention">Low Stock</Badge>;
    return <Badge status="critical">Out of Stock</Badge>;
  };

  return (
    <Card>
      <Text variant="headingLg">Inventory</Text>
      {items.map(item => (
        <div key={item.sku} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '16px', padding: '12px 0' }}>
          <Text fontWeight="semibold">{item.sku}</Text>
          <Text>{item.name}</Text>
          <Text>{item.stock}</Text>
          {getStatusBadge(item.status)}
          {item.stock <= item.reorder && <Button size="small" primary>Reorder</Button>}
        </div>
      ))}
    </Card>
  );
}`,
    vanilla: `// Inventory Management - Vanilla JS
import { $, createCard } from '@cin7/vanilla-js';

const items = [{ sku: 'WH-001', name: 'Headphones', stock: 45, status: 'normal', reorder: 20 }];
const card = createCard({ title: 'Inventory' });
let html = '<div>';
items.forEach(i => {
  const badge = i.status === 'normal' ? 'In Stock' : 'Low Stock';
  html += \`<div><strong>\${i.sku}</strong> \${i.name} - \${i.stock} <span>\${badge}</span></div>\`;
});
html += '</div>';
card.innerHTML = html;
$('#app').appendChild(card);`,
    extjs: `// Inventory Management - ExtJS
Ext.create('Ext.grid.Panel', {
  title: 'Inventory',
  store: Ext.create('Ext.data.Store', {
    fields: ['sku', 'name', 'stock', 'status'],
    data: [{ sku: 'WH-001', name: 'Headphones', stock: 45, status: 'normal' }]
  }),
  columns: [
    { text: 'SKU', dataIndex: 'sku' },
    { text: 'Product', dataIndex: 'name', flex: 1 },
    { text: 'Stock', dataIndex: 'stock' },
    { text: 'Status', dataIndex: 'status' }
  ]
});`,
    typescript: `// Inventory Management - TypeScript
import { Card, Text, Badge, Button } from '@shopify/polaris';
import React from 'react';

interface InventoryItem {
  sku: string;
  name: string;
  stock: number;
  status: 'normal' | 'low' | 'out';
  reorder: number;
}

const InventoryManagement: React.FC<{ items: InventoryItem[] }> = ({ items }) => {
  const getStatusBadge = (status: InventoryItem['status']) => {
    if (status === 'normal') return <Badge status="success">In Stock</Badge>;
    if (status === 'low') return <Badge status="attention">Low Stock</Badge>;
    return <Badge status="critical">Out of Stock</Badge>;
  };

  return (
    <Card>
      <Text variant="headingLg">Inventory</Text>
      {items.map(item => (
        <div key={item.sku}>
          <Text fontWeight="semibold">{item.sku}</Text>
          <Text>{item.name} - {item.stock}</Text>
          {getStatusBadge(item.status)}
        </div>
      ))}
    </Card>
  );
};`
  },

  productcomparison: {
    react: `// Product Comparison - React
import { Card, Text, Thumbnail } from '@shopify/polaris';

function ProductComparison({ products, features }) {
  return (
    <Card>
      <Text variant="headingLg">Product Comparison</Text>
      <div style={{ display: 'grid', gridTemplateColumns: '200px repeat(3, 1fr)', gap: '16px' }}>
        <div />
        {products.map(p => (
          <div key={p.id} style={{ textAlign: 'center' }}>
            <Thumbnail size="small" source={p.image} alt={p.name} />
            <Text variant="bodySm" fontWeight="semibold">{p.name}</Text>
          </div>
        ))}
        {features.map(f => (
          <>
            <Text key={f} variant="bodySm">{f}</Text>
            {products.map(p => <Text key={p.id} variant="bodySm">{p[f.toLowerCase()]}</Text>)}
          </>
        ))}
      </div>
    </Card>
  );
}`,
    vanilla: `// Product Comparison - Vanilla JS
import { $, createCard } from '@cin7/vanilla-js';

const products = [{ id: 1, name: 'Product A', price: 299.99 }, { id: 2, name: 'Product B', price: 199.99 }];
const features = ['Price', 'Warranty'];
const card = createCard({ title: 'Comparison' });
let html = '<table><tr><th>Feature</th>';
products.forEach(p => html += \`<th>\${p.name}</th>\`);
html += '</tr>';
features.forEach(f => {
  html += \`<tr><td>\${f}</td>\`;
  products.forEach(p => html += \`<td>\${p[f.toLowerCase()]}</td>\`);
  html += '</tr>';
});
html += '</table>';
card.innerHTML = html;
$('#app').appendChild(card);`,
    extjs: `// Product Comparison - ExtJS
Ext.create('Ext.grid.Panel', {
  title: 'Product Comparison',
  store: Ext.create('Ext.data.Store', {
    fields: ['feature', 'product1', 'product2'],
    data: [
      { feature: 'Price', product1: '$299.99', product2: '$199.99' },
      { feature: 'Warranty', product1: '2 Years', product2: '1 Year' }
    ]
  }),
  columns: [
    { text: 'Feature', dataIndex: 'feature', flex: 1 },
    { text: 'Product A', dataIndex: 'product1' },
    { text: 'Product B', dataIndex: 'product2' }
  ]
});`,
    typescript: `// Product Comparison - TypeScript
import { Card, Text, Thumbnail } from '@shopify/polaris';
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  warranty: string;
  image: string;
}

const ProductComparison: React.FC<{ products: Product[]; features: string[] }> = ({ products, features }) => {
  return (
    <Card>
      <Text variant="headingLg">Product Comparison</Text>
      <div style={{ display: 'grid', gridTemplateColumns: '200px repeat(3, 1fr)', gap: '16px' }}>
        <div />
        {products.map(p => (
          <div key={p.id} style={{ textAlign: 'center' }}>
            <Thumbnail size="small" source={p.image} alt={p.name} />
            <Text variant="bodySm" fontWeight="semibold">{p.name}</Text>
          </div>
        ))}
      </div>
    </Card>
  );
};`
  }
};

export const useCaseExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useState } from 'react';
function UseCase() {
  const [data, setData] = useState(null);
  const execute = async () => { const res = await fetch('/api'); setData(await res.json()); };
  return <button onClick={execute}>Execute</button>;
}`,
    extjs: `Ext.define('App.UseCase', {
  execute: function() { Ext.Ajax.request({ url: '/api' }); }
});`,
    vanilla: `async function executeUseCase() {
  const response = await fetch('/api');
  return await response.json();
}`,
    typescript: `interface UseCase<T, R> {
  execute(input: T): Promise<R>;
}
class CreateUser implements UseCase<{name: string}, {id: number}> {
  async execute(input) { return { id: 1 }; }
}`
  }
};

// Repository Component Examples

export const repositoryExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useState, useEffect } from 'react';
function Repository() {
  const [items, setItems] = useState([]);
  useEffect(() => { fetch('/api/items').then(r => r.json()).then(setItems); }, []);
  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}`,
    extjs: `Ext.create('Ext.data.Store', {
  proxy: { type: 'rest', url: '/api/items' },
  autoLoad: true
});`,
    vanilla: `async function fetchAll() {
  const response = await fetch('/api/items');
  return await response.json();
}`,
    typescript: `interface Repository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}
class ProductRepository implements Repository<Product> {
  async findAll() { return []; }
  async findById(id: number) { return null; }
}`
  }
};

// Domain Models Examples

export const domainModelsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useState } from 'react';

class Product {
  constructor(public id: string, public name: string, public price: number) {}

  updatePrice(newPrice: number) {
    if (newPrice < 0) throw new Error('Price cannot be negative');
    this.price = newPrice;
  }
}

function ProductEntity() {
  const [product] = useState(new Product('1', 'Laptop', 999.99));
  return <div>{product.name}: \${product.price}</div>;
}`,
    extjs: `Ext.define('App.model.Product', {
  extend: 'Ext.data.Model',
  fields: ['id', 'name', 'price'],

  validators: {
    price: function(value) {
      return value >= 0 || 'Price cannot be negative';
    }
  },

  updatePrice: function(newPrice) {
    if (newPrice >= 0) {
      this.set('price', newPrice);
    }
  }
});`,
    vanilla: `class Product {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  updatePrice(newPrice) {
    if (newPrice < 0) throw new Error('Price cannot be negative');
    this.price = newPrice;
    document.dispatchEvent(new CustomEvent('product:updated', { detail: this }));
  }
}

const product = new Product('1', 'Laptop', 999.99);`,
    typescript: `interface Entity {
  readonly id: string;
}

class Product implements Entity {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number
  ) {
    this.validatePrice(price);
  }

  private validatePrice(price: number): void {
    if (price < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  updatePrice(newPrice: number): void {
    this.validatePrice(newPrice);
    this.price = newPrice;
  }

  isInStock(): boolean {
    return this.stock > 0;
  }
}

// Aggregate Root Pattern
class Order implements Entity {
  private items: OrderItem[] = [];
  private status: 'draft' | 'confirmed' | 'shipped' = 'draft';

  constructor(
    public readonly id: string,
    public readonly customerId: string
  ) {}

  addItem(product: Product, quantity: number): void {
    if (!product.isInStock()) {
      throw new Error('Product out of stock');
    }
    this.items.push(new OrderItem(product.id, product.name, product.price, quantity));
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    this.status = 'confirmed';
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }
}

class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly price: number,
    public readonly quantity: number
  ) {}

  getSubtotal(): number {
    return this.price * this.quantity;
  }
}`
  }
};

// Value Objects Examples

export const valueObjectsExamples: Record<string, CodeVariant> = {
  default: {
    react: `class Money {
  constructor(private amount: number, private currency: string) {}

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

function PriceCalculator() {
  const price1 = new Money(100, 'USD');
  const price2 = new Money(50, 'USD');
  const total = price1.add(price2);
  return <div>Total: {total.toString()}</div>;
}`,
    extjs: `Ext.define('App.valueobject.Money', {
  config: {
    amount: 0,
    currency: 'USD'
  },

  constructor: function(config) {
    this.initConfig(config);
  },

  add: function(other) {
    if (this.getCurrency() !== other.getCurrency()) {
      throw new Error('Currency mismatch');
    }
    return new App.valueobject.Money({
      amount: this.getAmount() + other.getAmount(),
      currency: this.getCurrency()
    });
  },

  equals: function(other) {
    return this.getAmount() === other.getAmount() &&
           this.getCurrency() === other.getCurrency();
  }
});`,
    vanilla: `class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error('Invalid amount');
    this.amount = amount;
    this.currency = currency;
    Object.freeze(this); // Immutable
  }

  add(other) {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  toString() {
    return \`\${this.currency} \${this.amount.toFixed(2)}\`;
  }
}

const price = new Money(99.99, 'USD');`,
    typescript: `class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {
    if (amount < 0) {
      throw new Error('Amount cannot be negative');
    }
  }

  static create(amount: number, currency: string = 'USD'): Money {
    return new Money(amount, currency);
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  toString(): string {
    return \`\${this.currency} \${this.amount.toFixed(2)}\`;
  }
}

class Email {
  private constructor(public readonly value: string) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email');
    }
  }

  static create(email: string): Email {
    return new Email(email.toLowerCase().trim());
  }

  private isValid(email: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }

  getDomain(): string {
    return this.value.split('@')[1];
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

class Address {
  private constructor(
    public readonly street: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zipCode: string,
    public readonly country: string
  ) {}

  static create(street: string, city: string, state: string, zipCode: string, country: string = 'USA'): Address {
    return new Address(street, city, state, zipCode, country);
  }

  equals(other: Address): boolean {
    return this.street === other.street &&
           this.city === other.city &&
           this.state === other.state &&
           this.zipCode === other.zipCode &&
           this.country === other.country;
  }

  toString(): string {
    return \`\${this.street}, \${this.city}, \${this.state} \${this.zipCode}, \${this.country}\`;
  }
}`
  }
};

// Service Layer Examples

export const serviceLayerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useState } from 'react';

// Application Service - orchestrates use cases
class CreateOrderService {
  async execute(userId: string, items: any[]) {
    // Coordinate repositories and domain objects
    const user = await userRepo.findById(userId);
    const order = new Order(userId, items);
    await orderRepo.save(order);
    return order;
  }
}

function OrderCreator() {
  const [loading, setLoading] = useState(false);
  const service = new CreateOrderService();

  const handleCreate = async () => {
    setLoading(true);
    const order = await service.execute('user-1', []);
    setLoading(false);
  };

  return <button onClick={handleCreate}>Create Order</button>;
}`,
    extjs: `Ext.define('App.service.OrderService', {
  singleton: true,

  createOrder: function(userId, items) {
    return new Ext.Promise(function(resolve, reject) {
      // Coordinate ExtJS stores and models
      var order = Ext.create('App.model.Order', {
        userId: userId,
        items: items
      });

      order.save({
        success: function(record) {
          resolve(record);
        },
        failure: function(record, operation) {
          reject(operation.getError());
        }
      });
    });
  }
});`,
    vanilla: `// Domain Service - contains business logic
class PricingService {
  calculateTotal(items) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal >= 100 ? 0 : 9.99;
    return { subtotal, tax, shipping, total: subtotal + tax + shipping };
  }
}

// Application Service - orchestrates workflow
class OrderService {
  constructor(orderRepo, productRepo) {
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
    this.pricingService = new PricingService();
  }

  async createOrder(userId, items) {
    // Validate products
    for (const item of items) {
      const product = await this.productRepo.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        throw new Error('Insufficient stock');
      }
    }

    // Create order
    const order = { userId, items, ...this.pricingService.calculateTotal(items) };
    return await this.orderRepo.save(order);
  }
}`,
    typescript: `// Domain Service - pure business logic
class PricingService {
  calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  calculateTax(subtotal: number, rate: number = 0.08): number {
    return subtotal * rate;
  }

  calculateShipping(subtotal: number): number {
    return subtotal >= 100 ? 0 : 9.99;
  }

  calculateTotal(items: OrderItem[]): OrderPricing {
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal);
    const shipping = this.calculateShipping(subtotal);
    return { subtotal, tax, shipping, total: subtotal + tax + shipping };
  }
}

// Application Service - orchestrates use case
class CreateOrderService {
  constructor(
    private userRepo: UserRepository,
    private orderRepo: OrderRepository,
    private productRepo: ProductRepository
  ) {}

  async execute(userId: string, items: Array<{productId: string; quantity: number}>): Promise<Order> {
    // 1. Validate user
    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    // 2. Validate and build order items
    const orderItems: OrderItem[] = [];
    for (const item of items) {
      const product = await this.productRepo.findById(item.productId);
      if (!product) throw new Error(\`Product \${item.productId} not found\`);
      if (product.stock < item.quantity) throw new Error('Insufficient stock');
      orderItems.push(new OrderItem(product.id, product.name, product.price, item.quantity));
    }

    // 3. Create and save order
    const order = new Order(generateId(), userId, orderItems, 'pending');
    await this.orderRepo.save(order);

    // 4. Update inventory
    for (const item of items) {
      await this.productRepo.decrementStock(item.productId, item.quantity);
    }

    return order;
  }
}

// Service Composition
class OrderProcessingService {
  constructor(
    private createOrderService: CreateOrderService,
    private pricingService: PricingService,
    private inventoryService: InventoryService
  ) {}

  async processOrder(userId: string, items: any[]): Promise<{order: Order; pricing: OrderPricing}> {
    await this.inventoryService.reserveStock(items);
    const order = await this.createOrderService.execute(userId, items);
    const pricing = this.pricingService.calculateTotal(order.items);
    return { order, pricing };
  }
}`
  }
};

// EventBus Examples

export const eventBusExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useEffect, useState } from 'react';
import { EventBus } from '@cin7/core';

function OrderListener() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      setOrders(prev => [...prev, event.payload]);
    };

    EventBus.on('ORDER_CREATED', handler);
    return () => EventBus.off('ORDER_CREATED', handler);
  }, []);

  return <div>{orders.length} orders created</div>;
}`,
    extjs: `Ext.define('App.util.EventBus', {
  singleton: true,
  mixins: ['Ext.mixin.Observable'],

  constructor: function() {
    this.mixins.observable.constructor.call(this);
  }
});

// Publishing events
App.util.EventBus.fireEvent('ORDER_CREATED', {
  orderId: 'ORD-123',
  total: 299.99
});

// Subscribing to events
App.util.EventBus.on('ORDER_CREATED', function(event) {
  console.log('Order created:', event.orderId);
});`,
    vanilla: `import { EventBus } from '@cin7/vanilla-js';

// Subscribe to events
EventBus.on('product:updated', (event) => {
  const element = document.getElementById(\`product-\${event.productId}\`);
  if (element) {
    element.querySelector('.price').textContent = event.newPrice;
  }
});

// Publish events
EventBus.emit('product:updated', {
  productId: 'PROD-123',
  field: 'price',
  newPrice: 89.99
});

// Cross-layer communication
EventBus.on('order:created', (event) => {
  // Update UI
  document.querySelector('.order-count').textContent = event.orderCount;

  // Trigger notification
  showNotification(\`Order \${event.orderId} created\`);
});`,
    typescript: `import { EventBus } from '@cin7/core';

// Define typed events
interface DomainEvent {
  type: string;
  timestamp: number;
  payload: any;
}

interface OrderCreatedEvent extends DomainEvent {
  type: 'ORDER_CREATED';
  payload: {
    orderId: string;
    userId: string;
    total: number;
  };
}

interface ProductUpdatedEvent extends DomainEvent {
  type: 'PRODUCT_UPDATED';
  payload: {
    productId: string;
    field: string;
    oldValue: any;
    newValue: any;
  };
}

// Type-safe EventBus
class TypedEventBus {
  private listeners = new Map<string, Array<(event: DomainEvent) => void>>();

  on(eventType: string, handler: (event: DomainEvent) => void): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)?.push(handler);
  }

  off(eventType: string, handler: (event: DomainEvent) => void): void {
    const handlers = this.listeners.get(eventType);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) handlers.splice(index, 1);
    }
  }

  emit(event: DomainEvent): void {
    const handlers = this.listeners.get(event.type);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }
}

// Usage with type safety
const eventBus = new TypedEventBus();

eventBus.on('ORDER_CREATED', (event: DomainEvent) => {
  const orderEvent = event as OrderCreatedEvent;
  console.log('Order created:', orderEvent.payload.orderId);
});

// Publishing typed events
const orderCreatedEvent: OrderCreatedEvent = {
  type: 'ORDER_CREATED',
  timestamp: Date.now(),
  payload: {
    orderId: 'ORD-123',
    userId: 'USER-456',
    total: 299.99
  }
};

eventBus.emit(orderCreatedEvent);

// Cross-layer event flow
// TypeScript → Vanilla JS → ExtJS
eventBus.on('INVENTORY_CHANGED', (event) => {
  // TypeScript layer processes event
  const inventoryEvent = event as InventoryChangedEvent;

  // Trigger Vanilla JS UI update
  document.dispatchEvent(new CustomEvent('update-stock', {
    detail: inventoryEvent.payload
  }));

  // Trigger ExtJS grid refresh
  Ext.ComponentQuery.query('inventorygrid')[0]?.getStore().reload();
});`
  }
};


// Autocomplete Component Examples - Forms
