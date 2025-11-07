import type { Meta, StoryObj } from '@storybook/react';
import { Scrollable, Button, Text, Card, Badge, Avatar } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Overlays/Scrollable',
  component: Scrollable,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('scrollable', 'default'),
    docs: {
      description: {
        component: 'Scrollable is a wrapper component that provides consistent scrolling behavior across browsers and devices. It handles scrollbar styling, scroll shadow effects, and scroll event management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Scrollable content',
    },
    height: {
      control: 'text',
      description: 'Fixed height for scrollable container',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height for scrollable container',
    },
    width: {
      control: 'text',
      description: 'Fixed width for scrollable container',
    },
    minWidth: {
      control: 'text',
      description: 'Minimum width for scrollable container',
    },
    shadow: {
      control: 'boolean',
      description: 'Show scroll shadow effect',
    },
    horizontal: {
      control: 'boolean',
      description: 'Enable horizontal scrolling',
    },
    vertical: {
      control: 'boolean',
      description: 'Enable vertical scrolling',
    },
    onScrolledToBottom: {
      action: 'onScrolledToBottom',
      description: 'Callback when scrolled to bottom',
    },
    hint: {
      control: 'boolean',
      description: 'Show scroll hint indicator',
    },
    focusable: {
      control: 'boolean',
      description: 'Make scrollable container focusable',
    },
  },
} satisfies Meta<typeof Scrollable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
      <div style={{ marginBottom: 'var(--spacing-5)' }}>
        <Text variant="headingMd">Basic Scrollable Container</Text>
        <Text variant="bodyMd">Scroll down to see the shadow effect:</Text>
      </div>

      <Scrollable height="200px" shadow>
        <div style={{ padding: 'var(--spacing-4)' }}>
          {Array.from({ length: 15 }, (_, i) => (
            <Card key={i} sectioned style={{ marginBottom: 'var(--spacing-3)' }}>
              <Text variant="headingSm">Card {i + 1}</Text>
              <Text variant="bodyMd">
                This is card number {i + 1} in the scrollable container.
                The container shows a shadow effect at the top when scrolled down.
              </Text>
            </Card>
          ))}
        </div>
      </Scrollable>
    </div>
  ),
};

export const VerticalScrolling: Story = {
  render: () => {
    const [scrolledToBottom, setScrolledToBottom] = React.useState(false);

    const handleScrolledToBottom = () => {
      setScrolledToBottom(true);
      setTimeout(() => setScrolledToBottom(false), 2000);
    };

    return (
      <div style={{ height: '500px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Vertical Scrolling with Events</Text>
          <Text variant="bodyMd">Scroll to the bottom to trigger the event:</Text>
        </div>

        {scrolledToBottom && (
          <div style={{
            marginBottom: 'var(--spacing-4)',
            padding: 'var(--spacing-3)',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            borderRadius: 'var(--border-radius-base)'
          }}>
            <Text variant="bodyMd" style={{ color: '#155724' }}>
              ✅ You've reached the bottom!
            </Text>
          </div>
        )}

        <Scrollable height="300px" shadow onScrolledToBottom={handleScrolledToBottom}>
          <div style={{ padding: 'var(--spacing-4)' }}>
            {Array.from({ length: 25 }, (_, i) => (
              <div key={i} style={{
                padding: 'var(--spacing-4)',
                backgroundColor: '#f9f9f9',
                borderRadius: 'var(--border-radius-lg)',
                marginBottom: 'var(--spacing-3)',
                border: '1px solid #eee'
              }}>
                <Text variant="headingSm">Section {i + 1}</Text>
                <Text variant="bodyMd">
                  This is section {i + 1} of 25. Keep scrolling to see all sections
                  and trigger the scroll-to-bottom event.
                </Text>
                {i === 24 && (
                  <div style={{ marginTop: '12px' }}>
                    <Badge status="success">You've reached the end!</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Scrollable>
      </div>
    );
  },
};

export const HorizontalScrolling: Story = {
  render: () => (
    <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
      <div style={{ marginBottom: 'var(--spacing-5)' }}>
        <Text variant="headingMd">Horizontal Scrolling</Text>
        <Text variant="bodyMd">Scroll horizontally to see all cards:</Text>
      </div>

      <Scrollable horizontal width="600px" shadow>
        <div style={{ display: 'flex', gap: '16px', padding: 'var(--spacing-4)', minWidth: '1200px' }}>
          {Array.from({ length: 8 }, (_, i) => (
            <Card key={i} style={{ width: '250px', flexShrink: 0 }}>
              <Card.Section>
                <div style={{
                  height: '120px',
                  backgroundColor: `hsl(${i * 45}, 70%, 85%)`,
                  borderRadius: 'var(--border-radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text variant="headingLg">Card {i + 1}</Text>
                </div>
              </Card.Section>
              <Card.Section>
                <Text variant="headingSm">Feature {i + 1}</Text>
                <Text variant="bodySm">
                  This card demonstrates horizontal scrolling functionality.
                </Text>
              </Card.Section>
            </Card>
          ))}
        </div>
      </Scrollable>
    </div>
  ),
};

export const BothDirections: Story = {
  render: () => {
    return (
      <div style={{ height: '500px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Both Horizontal and Vertical Scrolling</Text>
          <Text variant="bodyMd">Scroll in both directions to navigate the content:</Text>
        </div>

        <Scrollable height="300px" width="600px" horizontal vertical shadow>
          <div style={{ minWidth: '1000px', padding: 'var(--spacing-4)' }}>
            {Array.from({ length: 10 }, (_, rowIndex) => (
              <div key={rowIndex} style={{ display: 'flex', gap: '12px', marginBottom: 'var(--spacing-3)' }}>
                {Array.from({ length: 5 }, (_, colIndex) => (
                  <div key={colIndex} style={{
                    width: '200px',
                    height: '80px',
                    backgroundColor: `hsl(${(rowIndex * 5 + colIndex) * 36}, 70%, 85%)`,
                    borderRadius: 'var(--border-radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ddd',
                    flexShrink: 0
                  }}>
                    <Text variant="bodyMd" fontWeight="medium">
                      Cell {rowIndex + 1}-{colIndex + 1}
                    </Text>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Scrollable>
      </div>
    );
  },
};

export const MaxHeightContainer: Story = {
  render: () => {
    return (
      <div style={{ height: '500px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Max Height Container</Text>
          <Text variant="bodyMd">Container grows to max height then scrolls:</Text>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <Text variant="headingSm" as="h3">Content Above</Text>
            <Text variant="bodyMd">
              This content appears above the scrollable container to demonstrate
              how maxHeight works with variable content height.
            </Text>
          </div>

          <div style={{ flex: 1 }}>
            <Scrollable maxHeight="250px" shadow>
              <div style={{ padding: 'var(--spacing-4)' }}>
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} style={{
                    padding: 'var(--spacing-3)',
                    backgroundColor: '#f8f9fa',
                    borderRadius: 'var(--border-radius-md)',
                    marginBottom: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <Text variant="bodySm">
                      <strong>Item {i + 1}:</strong> This content will scroll when
                      it exceeds the maximum height of 250px.
                    </Text>
                  </div>
                ))}
              </div>
            </Scrollable>
          </div>
        </div>
      </div>
    );
  },
};

export const ScrollableTable: Story = {
  render: () => {
    return (
      <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Scrollable Table</Text>
          <Text variant="bodyMd">Table with fixed headers and scrollable body:</Text>
        </div>

        <div>
          {/* Fixed Header */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f6f6f7',
            border: '1px solid #ddd',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '12px 16px',
            fontWeight: 'bold'
          }}>
            <div style={{ flex: 1 }}>Order ID</div>
            <div style={{ flex: 1 }}>Customer</div>
            <div style={{ flex: 1 }}>Status</div>
            <div style={{ flex: 1 }}>Total</div>
            <div style={{ flex: 1 }}>Date</div>
          </div>

          {/* Scrollable Body */}
          <Scrollable height="250px" shadow>
            <div style={{ border: '1px solid #ddd', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} style={{
                  display: 'flex',
                  padding: '12px 16px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: i % 2 === 0 ? '#fff' : '#f9f9f9'
                }}>
                  <div style={{ flex: 1 }}><Text variant="bodySm">#{1000 + i}</Text></div>
                  <div style={{ flex: 1 }}><Text variant="bodySm">Customer {i + 1}</Text></div>
                  <div style={{ flex: 1 }}>
                    <Badge status={i % 3 === 0 ? 'success' : i % 3 === 1 ? 'info' : 'warning'}>
                      {i % 3 === 0 ? 'Fulfilled' : i % 3 === 1 ? 'Processing' : 'Pending'}
                    </Badge>
                  </div>
                  <div style={{ flex: 1 }}><Text variant="bodySm">${(100 + i * 10).toFixed(2)}</Text></div>
                  <div style={{ flex: 1 }}><Text variant="bodySm">Nov {30 - i}, 2025</Text></div>
                </div>
              ))}
            </div>
          </Scrollable>
        </div>
      </div>
    );
  },
};

export const ChatInterface: Story = {
  render: () => {
    const [messages, setMessages] = React.useState([
      { id: 1, sender: 'bot', text: 'Hello! How can I help you today?' },
      { id: 2, sender: 'user', text: 'I need help with my order' },
      { id: 3, sender: 'bot', text: 'I\'d be happy to help with your order. Can you provide your order number?' },
      { id: 4, sender: 'user', text: 'It\'s #1001' },
      { id: 5, sender: 'bot', text: 'Thank you! I can see your order is currently in processing. Is there anything specific about it you need help with?' },
    ]);

    const [inputValue, setInputValue] = React.useState('');

    const addMessage = () => {
      if (inputValue.trim()) {
        setMessages(prev => [...prev, {
          id: prev.length + 1,
          sender: 'user',
          text: inputValue
        }]);
        setInputValue('');
      }
    };

    return (
      <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Chat Interface</Text>
          <Text variant="bodyMd">Auto-scrolling chat message container:</Text>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: 'var(--border-radius-lg)', overflow: 'hidden' }}>
          {/* Chat Messages */}
          <Scrollable height="250px" shadow>
            <div style={{ padding: 'var(--spacing-4)' }}>
              {messages.map((message) => (
                <div key={message.id} style={{
                  marginBottom: 'var(--spacing-4)',
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  <div style={{
                    maxWidth: '70%',
                    padding: 'var(--spacing-3)',
                    borderRadius: '12px',
                    backgroundColor: message.sender === 'user' ? '#007ace' : '#f6f6f7',
                    color: message.sender === 'user' ? '#fff' : '#000'
                  }}>
                    <Text variant="bodySm" style={{ color: 'inherit' }}>
                      {message.text}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </Scrollable>

          {/* Chat Input */}
          <div style={{
            padding: 'var(--spacing-4)',
            borderTop: '1px solid #ddd',
            backgroundColor: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  border: '1px solid #ddd',
                  borderRadius: 'var(--border-radius-base)'
                }}
              />
              <Button onClick={addMessage}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ImageGallery: Story = {
  render: () => {
    return (
      <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Horizontal Image Gallery</Text>
          <Text variant="bodyMd">Scroll horizontally to browse images:</Text>
        </div>

        <Scrollable horizontal width="600px" shadow>
          <div style={{ display: 'flex', gap: '16px', padding: 'var(--spacing-4)' }}>
            {Array.from({ length: 10 }, (_, i) => (
              <Card key={i} style={{ width: '200px', flexShrink: 0 }}>
                <div style={{
                  height: '150px',
                  backgroundColor: `linear-gradient(135deg, hsl(${i * 36}, 70%, 60%), hsl(${i * 36 + 30}, 70%, 80%))`,
                  borderRadius: '8px 8px 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '48px'
                }}>
                  {['🖼️', '🎨', '📷', '🌅', '🏞️', '🌊', '🏔️', '🌲', '🌸', '🦋'][i]}
                </div>
                <Card.Section>
                  <Text variant="headingSm">Image {i + 1}</Text>
                  <Text variant="bodySm">
                    {['Sunset', 'Mountain', 'Ocean', 'Forest', 'Flower', 'Butterfly', 'Landscape', 'Nature', 'Scenery', 'View'][i % 10]}
                  </Text>
                </Card.Section>
              </Card>
            ))}
          </div>
        </Scrollable>
      </div>
    );
  },
};

export const CodeViewer: Story = {
  render: () => {
    const code = `// Example React Component
import React, { useState } from 'react';
import { Button, Card, Text } from '@shopify/polaris';

function ExampleComponent() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <Card sectioned>
      <Text variant="headingMd">Counter: {count}</Text>
      <div style={{ marginTop: '12px' }}>
        <Button onClick={increment}>+</Button>
        <Button onClick={decrement} style={{ marginLeft: '8px' }}>-</Button>
      </div>
    </Card>
  );
}

export default ExampleComponent;`;

    return (
      <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Code Viewer</Text>
          <Text variant="bodyMd">Scrollable code snippet with syntax highlighting style:</Text>
        </div>

        <Scrollable height="250px" shadow>
          <div style={{
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            padding: 'var(--spacing-5)',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            fontSize: "var(--font-size-sm)",
            lineHeight: '1.5',
            borderRadius: 'var(--border-radius-lg)',
            overflow: 'auto'
          }}>
            {code.split('\n').map((line, index) => (
              <div key={index} style={{ display: 'flex' }}>
                <span style={{
                  color: '#858585',
                  marginRight: '20px',
                  userSelect: 'none',
                  minWidth: '30px'
                }}>
                  {index + 1}
                </span>
                <span style={{
                  color: line.includes('//') ? '#6a9955' :
                         line.includes('import') ? '#c586c0' :
                         line.includes('function') || line.includes('const') ? '#569cd6' :
                         line.includes('return') ? '#c586c0' : '#d4d4d4'
                }}>
                  {line}
                </span>
              </div>
            ))}
          </div>
        </Scrollable>
      </div>
    );
  },
};

export const WithScrollHint: Story = {
  render: () => {
    return (
      <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Scrollable with Hints</Text>
          <Text variant="bodyMd">Container shows scroll hints when content is available:</Text>
        </div>

        <Scrollable height="200px" shadow hint>
          <div style={{ padding: 'var(--spacing-4)' }}>
            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: '#e3f2fd',
              borderRadius: 'var(--border-radius-lg)',
              marginBottom: 'var(--spacing-4)',
              border: '1px solid #bbdefb'
            }}>
              <Text variant="headingSm">Start of Content</Text>
              <Text variant="bodyMd">
                This container has scroll hints enabled. Look for subtle indicators
                that show more content is available below.
              </Text>
            </div>

            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} style={{
                padding: 'var(--spacing-4)',
                backgroundColor: '#f9f9f9',
                borderRadius: 'var(--border-radius-lg)',
                marginBottom: 'var(--spacing-3)',
                border: '1px solid #eee'
              }}>
                <Text variant="bodyMd">
                  Content section {i + 1}. Keep scrolling to see more content.
                </Text>
              </div>
            ))}

            <div style={{
              padding: 'var(--spacing-4)',
              backgroundColor: '#e8f5e8',
              borderRadius: 'var(--border-radius-lg)',
              border: '1px solid #c3e6cb'
            }}>
              <Text variant="headingSm">End of Content</Text>
              <Text variant="bodyMd">
                You've reached the bottom of the scrollable container.
              </Text>
            </div>
          </div>
        </Scrollable>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [focusedSection, setFocusedSection] = React.useState<number | null>(null);

    const handleSectionFocus = (section: number) => {
      setFocusedSection(section);
    };

    return (
      <div style={{ height: '400px', padding: 'var(--spacing-10)' }}>
        <div style={{ marginBottom: 'var(--spacing-5)' }}>
          <Text variant="headingMd">Accessible Scrollable Container</Text>
          <Text variant="bodyMd">
            This scrollable container includes proper accessibility features:
          </Text>
        </div>

        <div style={{
          padding: 'var(--spacing-3)',
          backgroundColor: '#f8f9fa',
          borderRadius: 'var(--border-radius-base)',
          marginBottom: 'var(--spacing-5)',
          border: '1px solid #dee2e6'
        }}>
          <Text variant="bodySm" as="p">
            <strong>Accessibility Features:</strong><br />
            • Focusable container with proper keyboard navigation<br />
            • Semantic HTML structure for screen readers<br />
            • Proper scroll announcements<br />
            • High contrast visibility<br />
            • Consistent scroll behavior
          </Text>
        </div>

        <Scrollable
          height="200px"
          shadow
          focusable
          tabIndex={0}
          aria-label="Scrollable content section"
          aria-describedby="scroll-description"
        >
          <div id="scroll-description" style={{ display: 'none' }}>
            Use arrow keys or scroll wheel to navigate through content
          </div>

          <div style={{ padding: 'var(--spacing-4)' }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                style={{
                  padding: 'var(--spacing-4)',
                  backgroundColor: focusedSection === i + 1 ? '#e3f2fd' : '#f9f9f9',
                  borderRadius: 'var(--border-radius-lg)',
                  marginBottom: 'var(--spacing-3)',
                  border: focusedSection === i + 1 ? '2px solid #2196f3' : '1px solid #eee',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleSectionFocus(i + 1)}
                onFocus={() => handleSectionFocus(i + 1)}
                tabIndex={0}
                role="button"
                aria-label={`Content section ${i + 1}`}
              >
                <Text variant="headingSm">Section {i + 1}</Text>
                <Text variant="bodyMd">
                  This is an accessible section that can be focused and activated.
                  {focusedSection === i + 1 && ' (Currently focused)'}
                </Text>
              </div>
            ))}
          </div>
        </Scrollable>

        {focusedSection && (
          <div style={{ marginTop: '16px' }}>
            <Text variant="bodySm">
              <strong>Currently focused:</strong> Section {focusedSection}
            </Text>
          </div>
        )}
      </div>
    );
  },
};