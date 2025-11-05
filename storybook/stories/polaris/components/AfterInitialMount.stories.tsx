import type { Meta, StoryObj } from '@storybook/react';
import {
  AfterInitialMount,
  Card,
  Text,
  Button,
  BlockStack,
  InlineStack,
  Badge,
  Spinner,
} from '@shopify/polaris';
import React, { useState, useEffect } from 'react';

const meta = {
  title: 'Polaris/Utilities/AfterInitialMount',
  component: AfterInitialMount,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AfterInitialMount defers rendering of children until after the component has mounted on the client. This prevents hydration mismatches and improves SSR compatibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'object',
      description: 'Children to render after initial mount',
    },
    fallback: {
      control: 'object',
      description: 'Fallback content to show during SSR/hydration',
    },
  },
} satisfies Meta<typeof AfterInitialMount>;

export default meta;
type Story = StoryObj<typeof AfterInitialMount>;

export const Default: Story = {
  render: () => {
    const [mountedTime, setMountedTime] = useState<string>('');

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">AfterInitialMount Component</Text>
              <Text>
                Content inside AfterInitialMount only renders after the component mounts on the client.
              </Text>

              <AfterInitialMount>
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                  border: '1px solid #e1e3e5'
                }}>
                  <Text>
                    ✅ This content only rendered after initial mount!
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Button
                      size="small"
                      onClick={() => setMountedTime(new Date().toLocaleTimeString())}
                    >
                      Record Mount Time
                    </Button>
                    {mountedTime && (
                      <div style={{ marginTop: '8px' }}>
                        <Text variant="bodySm" color="subdued">
                          Mounted at: {mountedTime}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </AfterInitialMount>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithCustomFallback: Story = {
  render: () => {
    const [showClientContent, setShowClientContent] = useState(false);

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Custom Fallback</Text>
              <Text>
                During SSR, a fallback spinner is shown instead of the client-only content.
              </Text>

              <AfterInitialMount
                fallback={
                  <div style={{ textAlign: 'center', padding: '24px' }}>
                    <Spinner size="small" />
                    <Text variant="bodySm" color="subdued" alignment="center">
                      Loading client content...
                    </Text>
                  </div>
                }
              >
                <div style={{
                  padding: '16px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '4px',
                  border: '1px solid #bae6fd'
                }}>
                  <Text>
                    🎉 Client-side content loaded successfully!
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Button size="small" onClick={() => setShowClientContent(true)}>
                      Show Client Features
                    </Button>
                    {showClientContent && (
                      <div style={{ marginTop: '8px' }}>
                        <Badge status="success">Client-side only</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </AfterInitialMount>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithHeavyComponent: Story = {
  render: () => {
    const HeavyClientComponent = () => {
      const [data, setData] = useState<string[]>([]);

      useEffect(() => {
        // Simulate heavy client-side computation
        const heavyData = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
        setData(heavyData);
      }, []);

      return (
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <Text variant="headingSm" as="h3">Heavy Client Component</Text>
          <Text variant="bodySm" color="subdued">
            Generated {data.length} items on client side
          </Text>
          <div style={{ marginTop: '8px' }}>
            <Text variant="bodySm" color="subdued">
              First 5 items: {data.slice(0, 5).join(', ')}
            </Text>
          </div>
        </div>
      );
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Heavy Client Components</Text>
              <Text>
                Use AfterInitialMount for components that require heavy client-side processing
                or browser-only APIs.
              </Text>

              <AfterInitialMount>
                <HeavyClientComponent />
              </AfterInitialMount>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithBrowserAPIs: Story = {
  render: () => {
    const BrowserFeatures = () => {
      const [features, setFeatures] = useState<Record<string, boolean>>({});

      useEffect(() => {
        setFeatures({
          localStorage: typeof Storage !== 'undefined',
          geolocation: 'geolocation' in navigator,
          camera: 'mediaDevices' in navigator,
          webGL: !!document.createElement('canvas').getContext,
          serviceWorker: 'serviceWorker' in navigator,
        });
      }, []);

      return (
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
        }}>
          <Text variant="headingSm" as="h3">Browser API Support</Text>
          <div style={{ marginTop: '12px' }}>
            {Object.entries(features).map(([feature, supported]) => (
              <div key={feature} style={{ marginBottom: '4px' }}>
                <InlineStack gap="8px" align="center">
                  <Badge status={supported ? 'success' : 'attention'}>
                    {supported ? '✓' : '✗'}
                  </Badge>
                  <Text variant="bodySm">
                    {feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')}
                  </Text>
                </InlineStack>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Browser APIs Detection</Text>
              <Text>
                This component detects browser APIs that are only available on the client side.
              </Text>

              <AfterInitialMount>
                <BrowserFeatures />
              </AfterInitialMount>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const WithAnimation: Story = {
  render: () => {
    const AnimatedComponent = () => {
      const [isVisible, setIsVisible] = React.useState(false);

      React.useEffect(() => {
        // Trigger animation after mount
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
      }, []);

      return (
        <div
          style={{
            padding: '16px',
            backgroundColor: isVisible ? '#f0fdf4' : '#f8f9fa',
            borderRadius: '4px',
            border: `1px solid ${isVisible ? '#86efac' : '#e1e3e5'}`,
            transition: 'all 0.5s ease-in-out',
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            opacity: isVisible ? 1 : 0.7,
          }}
        >
          <Text variant="headingSm" as="h3">
            🎨 Animated After Mount
          </Text>
          <Text variant="bodySm" color="subdued">
            This content animates in after the component mounts
          </Text>
          <div style={{ marginTop: '8px' }}>
            <Badge status={isVisible ? 'success' : 'attention'}>
              {isVisible ? 'Animated' : 'Animating...'}
            </Badge>
          </div>
        </div>
      );
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Client-Side Animations</Text>
              <Text>
                Animations and transitions work best when wrapped in AfterInitialMount
                to prevent SSR hydration mismatches.
              </Text>

              <AfterInitialMount>
                <AnimatedComponent />
              </AfterInitialMount>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const MultipleInstances: Story = {
  render: () => {
    const InstanceComponent = ({ title, color }: { title: string; color: string }) => {
      const [mounted, setMounted] = React.useState(false);

      React.useEffect(() => {
        setMounted(true);
      }, []);

      return (
        <div
          style={{
            padding: '16px',
            backgroundColor: color === 'blue' ? '#eff6ff' : '#fef3c7',
            borderRadius: '4px',
            border: `1px solid ${color === 'blue' ? '#bfdbfe' : '#fde68a'}`,
          }}
        >
          <Text variant="headingSm" as="h3">{title}</Text>
          <Text variant="bodySm" color="subdued">
            Status: {mounted ? 'Mounted' : 'Loading...'}
          </Text>
          <div style={{ marginTop: '8px' }}>
            <Badge status={mounted ? 'success' : 'attention'}>
              {mounted ? '✅ Ready' : '⏳ Loading'}
            </Badge>
          </div>
        </div>
      );
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Multiple AfterInitialMount Instances</Text>
              <Text>
                Each AfterInitialMount instance mounts independently.
              </Text>

              <AfterInitialMount>
                <InstanceComponent title="Instance 1" color="blue" />
              </AfterInitialMount>

              <AfterInitialMount>
                <InstanceComponent title="Instance 2" color="yellow" />
              </AfterInitialMount>

              <AfterInitialMount>
                <InstanceComponent title="Instance 3" color="blue" />
              </AfterInitialMount>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const PerformanceComparison: Story = {
  render: () => {
    const [renderTimes, setRenderTimes] = useState<{ normal: number; delayed: number }>({
      normal: 0,
      delayed: 0,
    });

    const NormalComponent = () => {
      const [renderTime] = React.useState(() => Date.now());

      React.useEffect(() => {
        const now = Date.now();
        setRenderTimes(prev => ({ ...prev, normal: now - renderTime }));
      }, []);

      return (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee2e2',
          borderRadius: '4px',
          border: '1px solid #fecaca',
        }}>
          <Text variant="bodySm">Normal render (no wrapper)</Text>
        </div>
      );
    };

    const DelayedComponent = () => {
      const [renderTime] = React.useState(() => Date.now());

      React.useEffect(() => {
        const now = Date.now();
        setRenderTimes(prev => ({ ...prev, delayed: now - renderTime }));
      }, []);

      return (
        <div style={{
          padding: '12px',
          backgroundColor: '#dcfce7',
          borderRadius: '4px',
          border: '1px solid #bbf7d0',
        }}>
          <Text variant="bodySm">Delayed render (AfterInitialMount)</Text>
        </div>
      );
    };

    return (
      <div style={{ width: '500px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Performance Comparison</Text>
              <Text>
                Compare render times between normal and delayed components.
              </Text>

              <NormalComponent />

              <AfterInitialMount>
                <DelayedComponent />
              </AfterInitialMount>

              {(renderTimes.normal > 0 || renderTimes.delayed > 0) && (
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px',
                }}>
                  <Text variant="bodySm">
                    Normal: {renderTimes.normal}ms |
                    Delayed: {renderTimes.delayed}ms
                  </Text>
                </div>
              )}
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};