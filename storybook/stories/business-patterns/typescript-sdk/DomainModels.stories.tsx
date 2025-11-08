import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, BlockStack, Text, Badge, DataTable, Button } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Mock domain entities for demonstration
class Product {
  constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number
  ) {}

  updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }

  isInStock(): boolean {
    return this.stock > 0;
  }
}

class Order {
  private items: OrderItem[] = [];
  private status: 'draft' | 'confirmed' | 'shipped' | 'delivered' = 'draft';

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly createdAt: Date
  ) {}

  addItem(product: Product, quantity: number): void {
    if (!product.isInStock()) {
      throw new Error('Product is out of stock');
    }
    const item = new OrderItem(product.id, product.name, product.price, quantity);
    this.items.push(item);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  confirm(): void {
    if (this.items.length === 0) {
      throw new Error('Cannot confirm empty order');
    }
    this.status = 'confirmed';
  }

  getStatus(): string {
    return this.status;
  }

  getItems(): OrderItem[] {
    return [...this.items];
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
}

const meta = {
  title: 'Cin7 DSL/04 Business Logic/TypeScript SDK - Domain Models',
  component: Card,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('domainmodels', 'default'),
    docs: {
      description: {
        component: 'Domain modeling patterns for TypeScript SDK. Demonstrates entity modeling, aggregate roots, and business rule encapsulation using rich domain models.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EntityModeling: Story = {
  render: () => {
    const [products, setProducts] = React.useState<Product[]>([
      new Product('1', 'Laptop', 999.99, 10),
      new Product('2', 'Mouse', 29.99, 50),
      new Product('3', 'Keyboard', 79.99, 25),
    ]);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

    const handleUpdatePrice = (productId: string, newPrice: number) => {
      setProducts(prev =>
        prev.map(p => {
          if (p.id === productId) {
            p.updatePrice(newPrice);
          }
          return p;
        })
      );
    };

    return (
      <Page title="Entity Modeling Pattern">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Product Entity</Text>
                <Text as="p">
                  Domain entities encapsulate both data and behavior. The Product entity
                  enforces business rules like non-negative prices and stock validation.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'numeric', 'numeric', 'text']}
                  headings={['ID', 'Name', 'Price', 'Stock', 'Status']}
                  rows={products.map(product => [
                    product.id,
                    product.name,
                    `$${product.price.toFixed(2)}`,
                    product.stock,
                    <Badge tone={product.isInStock() ? 'success' : 'critical'} key={product.id}>
                      {product.isInStock() ? 'In Stock' : 'Out of Stock'}
                    </Badge>,
                  ])}
                />

                <BlockStack gap="200">
                  <Badge tone="info">Entity Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Identity-based equality (by ID)<br />
                    • Encapsulates business rules<br />
                    • Mutable state with validation<br />
                    • Rich behavioral methods
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const Aggregates: Story = {
  render: () => {
    const [order, setOrder] = React.useState<Order>(() =>
      new Order('ORD-001', 'CUST-123', new Date())
    );
    const [message, setMessage] = React.useState<{ text: string; tone: 'success' | 'critical' } | null>(null);

    const products = [
      new Product('1', 'Laptop', 999.99, 10),
      new Product('2', 'Mouse', 29.99, 50),
      new Product('3', 'Keyboard', 79.99, 25),
    ];

    const handleAddItem = (product: Product) => {
      try {
        order.addItem(product, 1);
        setOrder(new Order(order.id, order.customerId, order.createdAt));
        setMessage({ text: `Added ${product.name} to order`, tone: 'success' });
      } catch (error) {
        setMessage({ text: (error as Error).message, tone: 'critical' });
      }
    };

    const handleConfirmOrder = () => {
      try {
        order.confirm();
        setOrder(new Order(order.id, order.customerId, order.createdAt));
        setMessage({ text: 'Order confirmed successfully', tone: 'success' });
      } catch (error) {
        setMessage({ text: (error as Error).message, tone: 'critical' });
      }
    };

    return (
      <Page title="Aggregate Root Pattern">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Order Aggregate</Text>
                <Text as="p">
                  Aggregates group related entities and enforce consistency boundaries.
                  The Order aggregate root controls access to OrderItems and ensures
                  business invariants are maintained.
                </Text>

                <BlockStack gap="200">
                  <Text variant="headingMd" as="h4">Order Details</Text>
                  <Text variant="bodySm">Order ID: {order.id}</Text>
                  <Text variant="bodySm">Customer ID: {order.customerId}</Text>
                  <Text variant="bodySm">Status: <Badge>{order.getStatus()}</Badge></Text>
                  <Text variant="bodySm">Total: ${order.getTotal().toFixed(2)}</Text>
                </BlockStack>

                {order.getItems().length > 0 && (
                  <DataTable
                    columnContentTypes={['text', 'text', 'numeric', 'numeric']}
                    headings={['Product', 'Price', 'Quantity', 'Subtotal']}
                    rows={order.getItems().map((item, idx) => [
                      item.productName,
                      `$${item.price.toFixed(2)}`,
                      item.quantity,
                      `$${item.getSubtotal().toFixed(2)}`,
                    ])}
                  />
                )}

                <BlockStack gap="200">
                  <Text variant="headingMd" as="h4">Available Products</Text>
                  {products.map(product => (
                    <div key={product.id} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Text variant="bodySm">{product.name} - ${product.price.toFixed(2)}</Text>
                      <Button size="small" onClick={() => handleAddItem(product)}>Add</Button>
                    </div>
                  ))}
                </BlockStack>

                <Button onClick={handleConfirmOrder} variant="primary">
                  Confirm Order
                </Button>

                {message && (
                  <Badge tone={message.tone}>{message.text}</Badge>
                )}

                <BlockStack gap="200">
                  <Badge tone="info">Aggregate Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Single entry point for all operations<br />
                    • Enforces consistency boundaries<br />
                    • Protects invariants across entities<br />
                    • Transactional boundary
                  </Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const EntityValidation: Story = {
  render: () => {
    const [validationResults, setValidationResults] = React.useState<Array<{ rule: string; result: boolean; message: string }>>([]);

    const runValidations = () => {
      const results = [];

      // Test 1: Negative price validation
      try {
        const product = new Product('1', 'Test Product', 100, 10);
        product.updatePrice(-50);
        results.push({ rule: 'Non-negative price', result: false, message: 'Should have thrown error' });
      } catch (error) {
        results.push({ rule: 'Non-negative price', result: true, message: 'Correctly rejected negative price' });
      }

      // Test 2: Stock validation
      try {
        const product = new Product('2', 'Out of Stock Product', 100, 0);
        const order = new Order('ORD-001', 'CUST-123', new Date());
        order.addItem(product, 1);
        results.push({ rule: 'Stock availability', result: false, message: 'Should have thrown error' });
      } catch (error) {
        results.push({ rule: 'Stock availability', result: true, message: 'Correctly rejected out-of-stock product' });
      }

      // Test 3: Empty order validation
      try {
        const order = new Order('ORD-002', 'CUST-456', new Date());
        order.confirm();
        results.push({ rule: 'Non-empty order', result: false, message: 'Should have thrown error' });
      } catch (error) {
        results.push({ rule: 'Non-empty order', result: true, message: 'Correctly rejected empty order' });
      }

      // Test 4: Valid operations
      try {
        const product = new Product('3', 'Valid Product', 100, 10);
        product.updatePrice(150);
        const order = new Order('ORD-003', 'CUST-789', new Date());
        order.addItem(product, 2);
        order.confirm();
        results.push({ rule: 'Valid workflow', result: true, message: 'Valid operations completed successfully' });
      } catch (error) {
        results.push({ rule: 'Valid workflow', result: false, message: `Unexpected error: ${(error as Error).message}` });
      }

      setValidationResults(results);
    };

    React.useEffect(() => {
      runValidations();
    }, []);

    return (
      <Page title="Entity Validation Pattern">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Business Rule Validation</Text>
                <Text as="p">
                  Domain entities enforce business rules through validation. Rules are
                  encapsulated within the entity and enforced at the domain layer,
                  ensuring consistency across the application.
                </Text>

                <DataTable
                  columnContentTypes={['text', 'text', 'text']}
                  headings={['Business Rule', 'Result', 'Message']}
                  rows={validationResults.map((result, idx) => [
                    result.rule,
                    <Badge tone={result.result ? 'success' : 'critical'} key={idx}>
                      {result.result ? 'PASS' : 'FAIL'}
                    </Badge>,
                    result.message,
                  ])}
                />

                <BlockStack gap="200">
                  <Badge tone="info">Validation Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Business rules in domain layer<br />
                    • Fail-fast validation<br />
                    • Descriptive error messages<br />
                    • Type-safe invariants
                  </Text>
                </BlockStack>

                <Button onClick={runValidations}>Re-run Validations</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};
