import type { Meta, StoryObj } from '@storybook/react';
import { Card, Page, Layout, BlockStack, Text, Badge, DataTable, Button } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// Event types
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

interface InventoryChangedEvent extends DomainEvent {
  type: 'INVENTORY_CHANGED';
  payload: {
    productId: string;
    previousStock: number;
    newStock: number;
  };
}

// EventBus implementation
class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Array<(event: DomainEvent) => void>> = new Map();
  private eventLog: DomainEvent[] = [];

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

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
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  emit(event: DomainEvent): void {
    this.eventLog.push(event);
    const handlers = this.listeners.get(event.type);
    if (handlers) {
      handlers.forEach(handler => handler(event));
    }
  }

  getEventLog(): DomainEvent[] {
    return [...this.eventLog];
  }

  clearLog(): void {
    this.eventLog = [];
  }

  reset(): void {
    this.listeners.clear();
    this.eventLog = [];
  }
}

// Example services using EventBus
class OrderService {
  private eventBus = EventBus.getInstance();

  createOrder(userId: string, total: number): string {
    const orderId = `ORD-${Date.now()}`;

    // Emit domain event
    this.eventBus.emit({
      type: 'ORDER_CREATED',
      timestamp: Date.now(),
      payload: { orderId, userId, total },
    });

    return orderId;
  }
}

class ProductService {
  private eventBus = EventBus.getInstance();

  updatePrice(productId: string, oldPrice: number, newPrice: number): void {
    this.eventBus.emit({
      type: 'PRODUCT_UPDATED',
      timestamp: Date.now(),
      payload: {
        productId,
        field: 'price',
        oldValue: oldPrice,
        newValue: newPrice,
      },
    });
  }

  updateStock(productId: string, previousStock: number, newStock: number): void {
    this.eventBus.emit({
      type: 'INVENTORY_CHANGED',
      timestamp: Date.now(),
      payload: {
        productId,
        previousStock,
        newStock,
      },
    });
  }
}

const meta = {
  title: 'Cin7 DSL/TypeScript SDK/Event Bus',
  component: Card,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('eventbus', 'default'),
    docs: {
      description: {
        component: 'EventBus pattern for TypeScript SDK. Demonstrates publish-subscribe communication, cross-layer events, and typed event payloads for decoupled architecture.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PublishSubscribe: Story = {
  render: () => {
    const [events, setEvents] = React.useState<DomainEvent[]>([]);
    const [subscribers, setSubscribers] = React.useState<string[]>([]);

    React.useEffect(() => {
      const eventBus = EventBus.getInstance();
      eventBus.reset();

      // Subscribe to events
      const orderHandler = (event: DomainEvent) => {
        setEvents(prev => [...prev, event]);
      };

      const productHandler = (event: DomainEvent) => {
        setEvents(prev => [...prev, event]);
      };

      eventBus.on('ORDER_CREATED', orderHandler);
      eventBus.on('PRODUCT_UPDATED', productHandler);

      setSubscribers(['OrderHandler', 'ProductHandler']);

      return () => {
        eventBus.off('ORDER_CREATED', orderHandler);
        eventBus.off('PRODUCT_UPDATED', productHandler);
      };
    }, []);

    const handleCreateOrder = () => {
      const orderService = new OrderService();
      orderService.createOrder('USER-123', 299.99);
    };

    const handleUpdateProduct = () => {
      const productService = new ProductService();
      productService.updatePrice('PROD-456', 99.99, 89.99);
    };

    const handleClearEvents = () => {
      EventBus.getInstance().clearLog();
      setEvents([]);
    };

    return (
      <Page title="Publish-Subscribe Pattern">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Event Publishing and Subscription</Text>
                <Text as="p">
                  The EventBus enables loose coupling through publish-subscribe messaging.
                  Services publish domain events without knowing who will handle them,
                  and subscribers react to events they're interested in.
                </Text>

                <BlockStack gap="200">
                  <Text variant="headingMd" as="h4">Active Subscribers</Text>
                  {subscribers.map(sub => (
                    <Badge key={sub}>{sub}</Badge>
                  ))}
                </BlockStack>

                <BlockStack gap="200">
                  <Button onClick={handleCreateOrder}>Create Order (Publish Event)</Button>
                  <Button onClick={handleUpdateProduct}>Update Product (Publish Event)</Button>
                  <Button onClick={handleClearEvents}>Clear Events</Button>
                </BlockStack>

                {events.length > 0 && (
                  <Card sectioned>
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h4">Event Log ({events.length} events)</Text>
                      <DataTable
                        columnContentTypes={['text', 'text', 'text']}
                        headings={['Event Type', 'Timestamp', 'Payload']}
                        rows={events.map((event, idx) => [
                          <Badge key={idx}>{event.type}</Badge>,
                          new Date(event.timestamp).toLocaleTimeString(),
                          JSON.stringify(event.payload, null, 2),
                        ])}
                      />
                    </BlockStack>
                  </Card>
                )}

                <BlockStack gap="200">
                  <Badge tone="info">Publish-Subscribe Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Decouples publishers from subscribers<br />
                    • Multiple subscribers per event<br />
                    • Type-safe event contracts<br />
                    • Asynchronous communication
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

export const CrossLayerEvents: Story = {
  render: () => {
    const [layerEvents, setLayerEvents] = React.useState<Array<{ layer: string; action: string; timestamp: number }>>([]);

    React.useEffect(() => {
      const eventBus = EventBus.getInstance();
      eventBus.reset();

      // TypeScript layer listens for domain events
      eventBus.on('ORDER_CREATED', (event) => {
        setLayerEvents(prev => [
          ...prev,
          { layer: 'TypeScript SDK', action: `Order ${event.payload.orderId} created`, timestamp: Date.now() }
        ]);

        // TypeScript triggers UI update
        setTimeout(() => {
          setLayerEvents(prev => [
            ...prev,
            { layer: 'Vanilla JS', action: 'Updated order count in UI', timestamp: Date.now() }
          ]);
        }, 100);

        // TypeScript triggers ExtJS grid refresh
        setTimeout(() => {
          setLayerEvents(prev => [
            ...prev,
            { layer: 'ExtJS', action: 'Refreshed order grid', timestamp: Date.now() }
          ]);
        }, 200);
      });

      eventBus.on('PRODUCT_UPDATED', (event) => {
        setLayerEvents(prev => [
          ...prev,
          { layer: 'TypeScript SDK', action: `Product ${event.payload.productId} price changed`, timestamp: Date.now() }
        ]);

        // TypeScript triggers cache invalidation
        setTimeout(() => {
          setLayerEvents(prev => [
            ...prev,
            { layer: 'Vanilla JS', action: 'Invalidated product cache', timestamp: Date.now() }
          ]);
        }, 100);

        // TypeScript triggers ExtJS form update
        setTimeout(() => {
          setLayerEvents(prev => [
            ...prev,
            { layer: 'ExtJS', action: 'Updated product form', timestamp: Date.now() }
          ]);
        }, 200);
      });

      eventBus.on('INVENTORY_CHANGED', (event) => {
        setLayerEvents(prev => [
          ...prev,
          { layer: 'TypeScript SDK', action: `Stock changed for ${event.payload.productId}`, timestamp: Date.now() }
        ]);

        // TypeScript triggers stock indicator update
        setTimeout(() => {
          setLayerEvents(prev => [
            ...prev,
            { layer: 'Vanilla JS', action: 'Updated stock indicators', timestamp: Date.now() }
          ]);
        }, 100);
      });
    }, []);

    const handleCreateOrder = () => {
      const orderService = new OrderService();
      orderService.createOrder('USER-789', 499.99);
    };

    const handleUpdateProduct = () => {
      const productService = new ProductService();
      productService.updatePrice('PROD-101', 149.99, 129.99);
    };

    const handleUpdateStock = () => {
      const productService = new ProductService();
      productService.updateStock('PROD-202', 25, 18);
    };

    const handleClearLog = () => {
      setLayerEvents([]);
    };

    return (
      <Page title="Cross-Layer Event Communication">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">ExtJS ↔ TypeScript ↔ Vanilla JS</Text>
                <Text as="p">
                  The EventBus enables seamless communication across all framework layers.
                  Domain events in TypeScript automatically trigger updates in ExtJS grids,
                  Vanilla JS UI elements, and React components.
                </Text>

                <BlockStack gap="200">
                  <Button onClick={handleCreateOrder} variant="primary">Create Order</Button>
                  <Button onClick={handleUpdateProduct}>Update Product Price</Button>
                  <Button onClick={handleUpdateStock}>Update Inventory</Button>
                  <Button onClick={handleClearLog}>Clear Log</Button>
                </BlockStack>

                {layerEvents.length > 0 && (
                  <Card sectioned>
                    <BlockStack gap="200">
                      <Text variant="headingMd" as="h4">Cross-Layer Event Flow</Text>
                      <DataTable
                        columnContentTypes={['text', 'text', 'text']}
                        headings={['Layer', 'Action', 'Time']}
                        rows={layerEvents.map((event, idx) => [
                          <Badge
                            key={idx}
                            tone={
                              event.layer === 'TypeScript SDK' ? 'info' :
                              event.layer === 'Vanilla JS' ? 'success' :
                              'attention'
                            }
                          >
                            {event.layer}
                          </Badge>,
                          event.action,
                          new Date(event.timestamp).toLocaleTimeString(),
                        ])}
                      />
                    </BlockStack>
                  </Card>
                )}

                <BlockStack gap="200">
                  <Badge tone="info">Cross-Layer Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • Single source of truth (EventBus)<br />
                    • All layers react to same events<br />
                    • No tight coupling between layers<br />
                    • Consistent state across frameworks
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

export const EventPayloads: Story = {
  render: () => {
    const [typedEvents, setTypedEvents] = React.useState<DomainEvent[]>([]);

    React.useEffect(() => {
      const eventBus = EventBus.getInstance();
      eventBus.reset();

      // Strongly-typed event handlers
      const handleOrderCreated = (event: DomainEvent) => {
        const orderEvent = event as OrderCreatedEvent;
        console.log('Order created:', orderEvent.payload.orderId);
        setTypedEvents(prev => [...prev, event]);
      };

      const handleProductUpdated = (event: DomainEvent) => {
        const productEvent = event as ProductUpdatedEvent;
        console.log('Product updated:', productEvent.payload.productId);
        setTypedEvents(prev => [...prev, event]);
      };

      const handleInventoryChanged = (event: DomainEvent) => {
        const inventoryEvent = event as InventoryChangedEvent;
        console.log('Inventory changed:', inventoryEvent.payload.productId);
        setTypedEvents(prev => [...prev, event]);
      };

      eventBus.on('ORDER_CREATED', handleOrderCreated);
      eventBus.on('PRODUCT_UPDATED', handleProductUpdated);
      eventBus.on('INVENTORY_CHANGED', handleInventoryChanged);

      return () => {
        eventBus.off('ORDER_CREATED', handleOrderCreated);
        eventBus.off('PRODUCT_UPDATED', handleProductUpdated);
        eventBus.off('INVENTORY_CHANGED', handleInventoryChanged);
      };
    }, []);

    const handlePublishOrder = () => {
      const event: OrderCreatedEvent = {
        type: 'ORDER_CREATED',
        timestamp: Date.now(),
        payload: {
          orderId: `ORD-${Date.now()}`,
          userId: 'USER-999',
          total: 599.99,
        },
      };
      EventBus.getInstance().emit(event);
    };

    const handlePublishProduct = () => {
      const event: ProductUpdatedEvent = {
        type: 'PRODUCT_UPDATED',
        timestamp: Date.now(),
        payload: {
          productId: 'PROD-888',
          field: 'description',
          oldValue: 'Old description',
          newValue: 'New improved description',
        },
      };
      EventBus.getInstance().emit(event);
    };

    const handlePublishInventory = () => {
      const event: InventoryChangedEvent = {
        type: 'INVENTORY_CHANGED',
        timestamp: Date.now(),
        payload: {
          productId: 'PROD-777',
          previousStock: 50,
          newStock: 35,
        },
      };
      EventBus.getInstance().emit(event);
    };

    return (
      <Page title="Typed Event Payloads">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingLg" as="h3">Type-Safe Event Data</Text>
                <Text as="p">
                  Event payloads are strongly typed using TypeScript interfaces. This ensures
                  compile-time safety and provides autocomplete for event data. Each event
                  type has a specific payload structure that's validated at build time.
                </Text>

                <BlockStack gap="200">
                  <Button onClick={handlePublishOrder}>Publish OrderCreatedEvent</Button>
                  <Button onClick={handlePublishProduct}>Publish ProductUpdatedEvent</Button>
                  <Button onClick={handlePublishInventory}>Publish InventoryChangedEvent</Button>
                </BlockStack>

                {typedEvents.length > 0 && (
                  <Card sectioned>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h4">Received Events</Text>
                      {typedEvents.map((event, idx) => (
                        <Card key={idx} sectioned>
                          <BlockStack gap="200">
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <Badge tone="info">{event.type}</Badge>
                              <Text variant="bodySm">{new Date(event.timestamp).toLocaleTimeString()}</Text>
                            </div>
                            <div style={{
                              backgroundColor: '#f6f6f7',
                              padding: '12px',
                              borderRadius: '4px',
                              fontFamily: 'monospace',
                              fontSize: '12px',
                            }}>
                              <pre style={{ margin: 0 }}>
                                {JSON.stringify(event.payload, null, 2)}
                              </pre>
                            </div>
                          </BlockStack>
                        </Card>
                      ))}
                    </BlockStack>
                  </Card>
                )}

                <BlockStack gap="200">
                  <Badge tone="info">Event Payload Pattern</Badge>
                  <Text as="p" variant="bodySm">
                    • TypeScript interfaces for payloads<br />
                    • Compile-time type checking<br />
                    • Autocomplete for event data<br />
                    • Consistent event structure
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
