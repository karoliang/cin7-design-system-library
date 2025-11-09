import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, BlockStack, Text, Badge, DataTable, Button, TextField, FormLayout } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Domain entities
class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {}
}

class Order {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly status: 'pending' | 'confirmed' | 'shipped'
  ) {}

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}

class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly price: number,
    public readonly quantity: number
  ) {}
}

// Repository interfaces
interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[]>;
  save(order: Order): Promise<Order>;
}

interface ProductRepository {
  findById(id: string): Promise<{ id: string; name: string; price: number; stock: number } | null>;
  decrementStock(id: string, amount: number): Promise<void>;
}

// Mock repositories
const mockUserRepo: UserRepository = {
  findById: async (id) => new User(id, `user${id}@example.com`, `User ${id}`),
  save: async (user) => user,
};

const mockOrderRepo: OrderRepository = {
  findById: async (id) => null,
  findByUserId: async (userId) => [],
  save: async (order) => order,
};

const mockProductRepo: ProductRepository = {
  findById: async (id) => ({ id, name: `Product ${id}`, price: 99.99, stock: 10 }),
  decrementStock: async (id, amount) => {},
};

// Application Services (Use Case Orchestration)
class CreateOrderService {
  constructor(
    private userRepo: UserRepository,
    private orderRepo: OrderRepository,
    private productRepo: ProductRepository
  ) {}

  async execute(userId: string, items: Array<{ productId: string; quantity: number }>): Promise<Order> {
    // 1. Validate user exists
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // 2. Validate products and build order items
    const orderItems: OrderItem[] = [];
    for (const item of items) {
      const product = await this.productRepo.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
      orderItems.push(new OrderItem(product.id, product.name, product.price, item.quantity));
    }

    // 3. Create and save order
    const order = new Order(
      `ORD-${Date.now()}`,
      userId,
      orderItems,
      'pending'
    );
    await this.orderRepo.save(order);

    // 4. Update inventory
    for (const item of items) {
      await this.productRepo.decrementStock(item.productId, item.quantity);
    }

    return order;
  }
}

// Domain Services (Domain Logic)
class PricingService {
  calculateSubtotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  calculateTax(subtotal: number, taxRate: number = 0.08): number {
    return subtotal * taxRate;
  }

  calculateShipping(subtotal: number): number {
    if (subtotal >= 100) return 0; // Free shipping over $100
    return 9.99;
  }

  calculateTotal(items: OrderItem[]): { subtotal: number; tax: number; shipping: number; total: number } {
    const subtotal = this.calculateSubtotal(items);
    const tax = this.calculateTax(subtotal);
    const shipping = this.calculateShipping(subtotal);
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  }
}

class InventoryService {
  async checkAvailability(productRepo: ProductRepository, productId: string, requestedQty: number): Promise<boolean> {
    const product = await productRepo.findById(productId);
    if (!product) return false;
    return product.stock >= requestedQty;
  }

  async reserveStock(productRepo: ProductRepository, items: Array<{ productId: string; quantity: number }>): Promise<void> {
    for (const item of items) {
      const available = await this.checkAvailability(productRepo, item.productId, item.quantity);
      if (!available) {
        throw new Error(`Cannot reserve stock for product ${item.productId}`);
      }
    }
    // Reserve logic would go here
  }
}

// Service Composition
class OrderProcessingService {
  constructor(
    private createOrderService: CreateOrderService,
    private pricingService: PricingService,
    private inventoryService: InventoryService
  ) {}

  async processOrder(
    userId: string,
    items: Array<{ productId: string; quantity: number }>
  ): Promise<{ order: Order; pricing: any }> {
    // Step 1: Check inventory
    await this.inventoryService.reserveStock(mockProductRepo, items);

    // Step 2: Create order
    const order = await this.createOrderService.execute(userId, items);

    // Step 3: Calculate pricing
    const pricing = this.pricingService.calculateTotal(order.items);

    return { order, pricing };
  }
}

const meta = {
  title: 'Cin7 DSL/Business Logic/TypeScript SDK - Service Layer',
  component: Card,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('servicelayer', 'default'),
    docs: {
      description: {
        component: 'Service layer patterns for TypeScript SDK. Demonstrates application services, domain services, and service composition for complex business workflows.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApplicationServices: Story = {
  render: () => {
    const [result, setResult] = React.useState<{ order?: Order; error?: string } | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleCreateOrder = async () => {
      setLoading(true);
      try {
        const service = new CreateOrderService(mockUserRepo, mockOrderRepo, mockProductRepo);
        const order = await service.execute('USER-123', [
          { productId: 'PROD-1', quantity: 2 },
          { productId: 'PROD-2', quantity: 1 },
        ]);
        setResult({ order });
      } catch (error) {
        setResult({ error: (error as Error).message });
      } finally {
        setLoading(false);
      }
    };

    return (
      <Page title="Application Services">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Use Case Orchestration</Text>
                <Text as="p">
                  Application services orchestrate use cases by coordinating multiple
                  repositories and domain objects. They handle the workflow of a business
                  operation without containing business logic themselves.
                </Text>

                <Button onClick={handleCreateOrder} loading={loading} disabled={loading}>
                  Create Sample Order
                </Button>

                {result && (
                  <Card sectioned>
                    {result.order ? (
                      <BlockStack gap="200">
                        <Text variant="headingMd" as="h4">Order Created Successfully</Text>
                        <Badge tone="success">Order ID: {result.order.id}</Badge>
                        <Text variant="bodySm">User ID: {result.order.userId}</Text>
                        <Text variant="bodySm">Status: {result.order.status}</Text>
                        <Text variant="bodySm">Total: ${result.order.getTotal().toFixed(2)}</Text>

                        <Text variant="headingMd" as="h4">Items</Text>
                        <DataTable
                          columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                          headings={['Product', 'Price', 'Quantity', 'Subtotal']}
                          rows={result.order.items.map(item => [
                            item.name,
                            `$${item.price.toFixed(2)}`,
                            item.quantity,
                            `$${(item.price * item.quantity).toFixed(2)}`,
                          ])}
                        />
                      </BlockStack>
                    ) : (
                      <Badge tone="critical">Error: {result.error}</Badge>
                    )}
                  </Card>
                )}

                <BlockStack gap="200">
                  <Badge tone="info">Application Service Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Coordinates multiple repositories<br />
                    • Orchestrates use case workflow<br />
                    • Handles transaction boundaries<br />
                    • No business logic (delegates to domain)
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

export const DomainServices: Story = {
  render: () => {
    const [items] = React.useState<OrderItem[]>([
      new OrderItem('PROD-1', 'Laptop', 999.99, 1),
      new OrderItem('PROD-2', 'Mouse', 29.99, 2),
      new OrderItem('PROD-3', 'Keyboard', 79.99, 1),
    ]);

    const pricingService = new PricingService();
    const pricing = pricingService.calculateTotal(items);

    return (
      <Page title="Domain Services">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Domain Logic Services</Text>
                <Text as="p">
                  Domain services encapsulate business logic that doesn't naturally fit
                  within a single entity. They operate on domain concepts and enforce
                  business rules across multiple entities.
                </Text>

                <Text variant="headingMd" as="h4">Order Items</Text>
                <DataTable
                  columnContentTypes={['text', 'numeric', 'numeric', 'numeric']}
                  headings={['Product', 'Price', 'Quantity', 'Subtotal']}
                  rows={items.map(item => [
                    item.name,
                    `$${item.price.toFixed(2)}`,
                    item.quantity,
                    `$${(item.price * item.quantity).toFixed(2)}`,
                  ])}
                />

                <Card sectioned>
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h4">Pricing Calculation</Text>
                    <DataTable
                      columnContentTypes={['text', 'numeric']}
                      headings={['Component', 'Amount']}
                      rows={[
                        ['Subtotal', `$${pricing.subtotal.toFixed(2)}`],
                        ['Tax (8%)', `$${pricing.tax.toFixed(2)}`],
                        ['Shipping', pricing.shipping === 0 ? 'FREE' : `$${pricing.shipping.toFixed(2)}`],
                        ['Total', `$${pricing.total.toFixed(2)}`],
                      ]}
                    />
                  </BlockStack>
                </Card>

                <BlockStack gap="200">
                  <Badge tone="info">Domain Service Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Contains pure business logic<br />
                    • Operates on domain objects<br />
                    • Stateless operations<br />
                    • Cross-entity calculations
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

export const ServiceComposition: Story = {
  render: () => {
    const [result, setResult] = React.useState<{ order?: Order; pricing?: any; error?: string } | null>(null);
    const [loading, setLoading] = React.useState(false);

    const handleProcessOrder = async () => {
      setLoading(true);
      try {
        const createOrderService = new CreateOrderService(mockUserRepo, mockOrderRepo, mockProductRepo);
        const pricingService = new PricingService();
        const inventoryService = new InventoryService();
        const orderProcessingService = new OrderProcessingService(
          createOrderService,
          pricingService,
          inventoryService
        );

        const result = await orderProcessingService.processOrder('USER-456', [
          { productId: 'PROD-1', quantity: 1 },
          { productId: 'PROD-2', quantity: 3 },
        ]);

        setResult(result);
      } catch (error) {
        setResult({ error: (error as Error).message });
      } finally {
        setLoading(false);
      }
    };

    return (
      <Page title="Service Composition">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Composing Services</Text>
                <Text as="p">
                  Complex workflows are built by composing multiple services together.
                  Each service has a single responsibility, and they work together to
                  complete complex business operations.
                </Text>

                <Button onClick={handleProcessOrder} loading={loading} disabled={loading} variant="primary">
                  Process Complete Order
                </Button>

                {result && (
                  <Card sectioned>
                    {result.order && result.pricing ? (
                      <BlockStack gap="400">
                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h4">Order Details</Text>
                          <Badge tone="success">Order ID: {result.order.id}</Badge>
                          <Text variant="bodySm">User: {result.order.userId}</Text>
                          <Text variant="bodySm">Status: {result.order.status}</Text>
                        </BlockStack>

                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h4">Items</Text>
                          <DataTable
                            columnContentTypes={['text', 'numeric', 'numeric']}
                            headings={['Product', 'Quantity', 'Price']}
                            rows={result.order.items.map(item => [
                              item.name,
                              item.quantity,
                              `$${(item.price * item.quantity).toFixed(2)}`,
                            ])}
                          />
                        </BlockStack>

                        <BlockStack gap="200">
                          <Text variant="headingMd" as="h4">Pricing Breakdown</Text>
                          <DataTable
                            columnContentTypes={['text', 'numeric']}
                            headings={['Component', 'Amount']}
                            rows={[
                              ['Subtotal', `$${result.pricing.subtotal.toFixed(2)}`],
                              ['Tax', `$${result.pricing.tax.toFixed(2)}`],
                              ['Shipping', result.pricing.shipping === 0 ? 'FREE' : `$${result.pricing.shipping.toFixed(2)}`],
                              ['Total', `$${result.pricing.total.toFixed(2)}`],
                            ]}
                          />
                        </BlockStack>

                        <Badge tone="success">Order processed successfully through 3 services</Badge>
                      </BlockStack>
                    ) : (
                      <Badge tone="critical">Error: {result.error}</Badge>
                    )}
                  </Card>
                )}

                <BlockStack gap="200">
                  <Badge tone="info">Service Composition Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Combines multiple services<br />
                    • Single Responsibility Principle<br />
                    • Reusable service components<br />
                    • Clear separation of concerns
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
