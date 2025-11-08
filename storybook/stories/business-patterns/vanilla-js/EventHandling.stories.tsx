import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Text, InlineStack, BlockStack, Button, TextField, Banner } from '@shopify/polaris';

const meta = {
  title: 'Cin7 DSL/Business Patterns/Vanilla JS/Event Handling',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Event handling utilities from @cin7/vanilla-js. Provides simple APIs for attaching event listeners, event delegation, custom events, and cross-layer communication via EventBus.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Events Story
const BasicEventsDemo = () => {
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const input = inputRef.current;
    const form = formRef.current;

    if (!button || !input || !form) return;

    // Click event
    const handleClick = () => {
      setClickCount(prev => prev + 1);
    };

    // Input event
    const handleInput = (e: Event) => {
      setInputValue((e.target as HTMLInputElement).value);
    };

    // Submit event
    const handleSubmit = (e: Event) => {
      e.preventDefault();
      setFormData((e.target as HTMLFormElement).querySelector('input')?.value || '');
    };

    button.addEventListener('click', handleClick);
    input.addEventListener('input', handleInput);
    form.addEventListener('submit', handleSubmit);

    return () => {
      button.removeEventListener('click', handleClick);
      input.removeEventListener('input', handleInput);
      form.removeEventListener('submit', handleSubmit);
    };
  }, []);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Basic Events</Text>
        <Text as="p" tone="subdued">
          Handle common DOM events like click, input, and submit
        </Text>

        <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
          <BlockStack gap="300">
            <div>
              <button
                ref={buttonRef}
                style={{
                  padding: '8px 16px',
                  background: '#008060',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Click Me (Count: {clickCount})
              </button>
            </div>

            <div>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type something..."
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              />
              <Text as="p" variant="bodyMd">Current value: {inputValue}</Text>
            </div>

            <form ref={formRef}>
              <input
                type="text"
                placeholder="Enter text and press Enter"
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  marginBottom: '8px'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 16px',
                  background: '#005ea3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Submit Form
              </button>
              {formData && <Text as="p" variant="bodyMd">Form submitted with: {formData}</Text>}
            </form>
          </BlockStack>
        </div>

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, on, off } from '@cin7/vanilla-js';

const button = $('#myButton');
const input = $('#myInput');
const form = $('#myForm');

// Click event
on(button, 'click', () => {
  console.log('Button clicked!');
});

// Input event (fires on every keystroke)
on(input, 'input', (e) => {
  console.log('Input value:', e.target.value);
});

// Change event (fires when input loses focus)
on(input, 'change', (e) => {
  console.log('Input changed:', e.target.value);
});

// Submit event
on(form, 'submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  console.log('Form submitted:', Object.fromEntries(formData));
});

// Remove event listener
const handler = () => console.log('Clicked');
on(button, 'click', handler);
off(button, 'click', handler);

// Multiple events
on(button, 'mouseenter mouseleave', (e) => {
  console.log('Mouse event:', e.type);
});`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const BasicEvents: Story = {
  render: () => <BasicEventsDemo />,
};

// Event Delegation Story
const EventDelegationDemo = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Event delegation - single listener for all buttons
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('.item-button')) {
        const item = target.closest('.list-item');
        const itemText = item?.querySelector('.item-text')?.textContent;
        setLogs(prev => [...prev, `Clicked: ${itemText}`]);
      }
    };

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, []);

  const addItem = () => {
    if (containerRef.current) {
      const list = containerRef.current.querySelector('.item-list');
      if (list) {
        const newItem = document.createElement('div');
        newItem.className = 'list-item';
        newItem.style.cssText = 'padding: 8px; margin: 4px; background: white; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;';
        newItem.innerHTML = `
          <span class="item-text">Item ${list.children.length + 1}</span>
          <button class="item-button" style="padding: 4px 12px; background: #008060; color: white; border: none; border-radius: 4px; cursor: pointer;">Click</button>
        `;
        list.appendChild(newItem);
      }
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Event Delegation</Text>
        <Text as="p" tone="subdued">
          Efficient event handling for dynamic content using event delegation
        </Text>

        <div ref={containerRef} style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
          <Button onClick={addItem}>Add Item</Button>
          <div className="item-list" style={{ marginTop: '12px' }}>
            <div className="list-item" style={{ padding: '8px', margin: '4px', background: 'white', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="item-text">Item 1</span>
              <button className="item-button" style={{ padding: '4px 12px', background: '#008060', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Click</button>
            </div>
            <div className="list-item" style={{ padding: '8px', margin: '4px', background: 'white', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="item-text">Item 2</span>
              <button className="item-button" style={{ padding: '4px 12px', background: '#008060', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Click</button>
            </div>
          </div>
        </div>

        {logs.length > 0 && (
          <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
            <Text as="h3" variant="headingSm">Event Log:</Text>
            {logs.map((log, index) => (
              <Text key={index} as="p" variant="bodySm">{log}</Text>
            ))}
          </div>
        )}

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, on, delegate } from '@cin7/vanilla-js';

const container = $('#container');

// Event delegation pattern
// Single listener handles all current and future buttons
delegate(container, '.item-button', 'click', (e) => {
  const button = e.target;
  const item = button.closest('.list-item');
  const itemText = item.querySelector('.item-text').textContent;
  console.log('Clicked:', itemText);
});

// Manual delegation
on(container, 'click', (e) => {
  if (e.target.matches('.item-button')) {
    // Handle button click
  }
});

// Delegation with multiple selectors
delegate(container, '.edit-btn, .delete-btn', 'click', (e) => {
  const action = e.target.classList.contains('edit-btn') ? 'edit' : 'delete';
  console.log('Action:', action);
});

// Benefits:
// - Single event listener for many elements
// - Works with dynamically added elements
// - Better memory usage
// - Cleaner code`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const EventDelegation: Story = {
  render: () => <EventDelegationDemo />,
};

// Custom Events Story
const CustomEventsDemo = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Listen for custom event
    const handleProductUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      setNotifications(prev => [
        ...prev,
        `Product updated: ${customEvent.detail.name} - $${customEvent.detail.price}`
      ]);
    };

    container.addEventListener('product:update', handleProductUpdate);

    return () => {
      container.removeEventListener('product:update', handleProductUpdate);
    };
  }, []);

  const dispatchCustomEvent = () => {
    if (containerRef.current) {
      const event = new CustomEvent('product:update', {
        detail: {
          name: 'Widget ' + Math.floor(Math.random() * 100),
          price: Math.floor(Math.random() * 100) + 10,
          timestamp: new Date().toISOString()
        },
        bubbles: true,
        cancelable: true
      });
      containerRef.current.dispatchEvent(event);
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Custom Events</Text>
        <Text as="p" tone="subdued">
          Create and dispatch custom events with data payloads
        </Text>

        <div ref={containerRef} style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
          <Button onClick={dispatchCustomEvent}>Dispatch Product Update Event</Button>
        </div>

        {notifications.length > 0 && (
          <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
            <Text as="h3" variant="headingSm">Custom Event Log:</Text>
            {notifications.map((notification, index) => (
              <Text key={index} as="p" variant="bodySm">• {notification}</Text>
            ))}
          </div>
        )}

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, on, trigger } from '@cin7/vanilla-js';

const container = $('#container');

// Listen for custom event
on(container, 'product:update', (e) => {
  console.log('Product updated:', e.detail);
});

// Dispatch custom event
const event = new CustomEvent('product:update', {
  detail: {
    id: 123,
    name: 'Widget',
    price: 29.99
  },
  bubbles: true,    // Event bubbles up the DOM
  cancelable: true  // Event can be cancelled
});
container.dispatchEvent(event);

// Using trigger helper
trigger(container, 'product:update', {
  id: 123,
  name: 'Widget',
  price: 29.99
});

// Common custom event patterns
trigger(document, 'cart:add', { productId: 123, quantity: 2 });
trigger(document, 'user:login', { userId: 456, email: 'user@example.com' });
trigger(document, 'notification:show', { message: 'Saved!', type: 'success' });

// Check if event was cancelled
if (!container.dispatchEvent(event)) {
  console.log('Event was cancelled');
}`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const CustomEvents: Story = {
  render: () => <CustomEventsDemo />,
};

// EventBus Story
const EventBusDemo = () => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Simulate EventBus
    const eventBus = {
      listeners: new Map<string, Set<Function>>(),
      on(event: string, handler: Function) {
        if (!this.listeners.has(event)) {
          this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(handler);
      },
      off(event: string, handler: Function) {
        this.listeners.get(event)?.delete(handler);
      },
      emit(event: string, data?: any) {
        this.listeners.get(event)?.forEach(handler => handler(data));
      }
    };

    // Subscribe to events
    const handleDataSaved = (data: any) => {
      setMessages(prev => [...prev, `Data saved: ${JSON.stringify(data)}`]);
    };

    const handleUserAction = (data: any) => {
      setMessages(prev => [...prev, `User action: ${data.action}`]);
    };

    eventBus.on('data:saved', handleDataSaved);
    eventBus.on('user:action', handleUserAction);

    // Store eventBus in ref for button handlers
    (window as any).demoEventBus = eventBus;

    return () => {
      eventBus.off('data:saved', handleDataSaved);
      eventBus.off('user:action', handleUserAction);
      delete (window as any).demoEventBus;
    };
  }, []);

  const emitDataSaved = () => {
    (window as any).demoEventBus?.emit('data:saved', { id: 123, status: 'success' });
  };

  const emitUserAction = () => {
    (window as any).demoEventBus?.emit('user:action', { action: 'click', target: 'button' });
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">EventBus</Text>
        <Text as="p" tone="subdued">
          Cross-layer communication using the EventBus pattern
        </Text>

        <Banner>
          <p>EventBus enables communication between different layers of your application without tight coupling.</p>
        </Banner>

        <InlineStack gap="200">
          <Button onClick={emitDataSaved}>Emit Data Saved Event</Button>
          <Button onClick={emitUserAction}>Emit User Action Event</Button>
        </InlineStack>

        {messages.length > 0 && (
          <div style={{ padding: '12px', background: '#f6f6f7', borderRadius: '8px' }}>
            <Text as="h3" variant="headingSm">EventBus Messages:</Text>
            {messages.map((message, index) => (
              <Text key={index} as="p" variant="bodySm">• {message}</Text>
            ))}
          </div>
        )}

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { EventBus } from '@cin7/core';

// Subscribe to events
EventBus.on('product:updated', (product) => {
  console.log('Product updated:', product);
  // Update UI, refresh data, etc.
});

EventBus.on('cart:add', (item) => {
  console.log('Item added to cart:', item);
  // Update cart display, show notification, etc.
});

// Emit events from anywhere in your application
EventBus.emit('product:updated', {
  id: 123,
  name: 'Widget',
  price: 29.99
});

EventBus.emit('cart:add', {
  productId: 123,
  quantity: 2
});

// Unsubscribe from events
const handler = (data) => console.log(data);
EventBus.on('user:login', handler);
EventBus.off('user:login', handler);

// Once handler (auto-unsubscribe after first call)
EventBus.once('app:ready', () => {
  console.log('App is ready!');
});

// Cross-layer communication examples:
// UI Layer -> Business Logic Layer
EventBus.emit('form:submit', formData);

// Business Logic -> UI Layer
EventBus.emit('validation:error', { field: 'email', message: 'Invalid email' });

// ExtJS -> Vanilla JS
EventBus.emit('grid:rowselect', selectedRow);`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const EventBus: Story = {
  render: () => <EventBusDemo />,
};
