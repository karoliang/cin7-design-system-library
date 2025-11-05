import type { Meta, StoryObj } from '@storybook/react';
import { ErrorPage, Button, Card, InlineStack, BlockStack, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Feedback/ErrorPage',
  component: ErrorPage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Error pages are used to display system-level errors and provide users with clear next steps when something goes wrong.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Error title/headline',
    },
    description: {
      control: 'text',
      description: 'Error description text',
    },
    action: {
      control: { type: 'object' },
      description: 'Primary action button configuration',
    },
    secondaryAction: {
      control: { type: 'object' },
      description: 'Secondary action button configuration',
    },
    errorIcon: {
      control: 'select',
      options: ['warning', 'critical', 'attention', 'info'],
      description: 'Type of error icon to display',
    },
    details: {
      control: 'text',
      description: 'Additional error details or technical information',
    },
  },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Something went wrong',
    description: 'We\'re sorry, but something went wrong on our end. Please try again in a few moments.',
    action: {
      content: 'Try again',
      onAction: () => console.log('Try again clicked'),
    },
    secondaryAction: {
      content: 'Go to home',
      onAction: () => console.log('Go to home clicked'),
    },
  },
};

export const NetworkError: Story = {
  args: {
    title: 'Network error',
    description: 'Unable to connect to our servers. Please check your internet connection and try again.',
    action: {
      content: 'Retry connection',
      onAction: () => console.log('Retry connection clicked'),
    },
    secondaryAction: {
      content: 'Check connection',
      onAction: () => console.log('Check connection clicked'),
    },
  },
};

export const NotFoundError: Story = {
  args: {
    title: 'Page not found',
    description: 'The page you\'re looking for doesn\'t exist or has been moved.',
    action: {
      content: 'Go to dashboard',
      onAction: () => console.log('Go to dashboard clicked'),
    },
    secondaryAction: {
      content: 'Search site',
      onAction: () => console.log('Search site clicked'),
    },
  },
};

export const PermissionError: Story = {
  args: {
    title: 'Access denied',
    description: 'You don\'t have permission to view this page. Contact your administrator if you think this is a mistake.',
    action: {
      content: 'Request access',
      onAction: () => console.log('Request access clicked'),
    },
    secondaryAction: {
      content: 'Go back',
      onAction: () => console.log('Go back clicked'),
    },
  },
};

export const MaintenanceError: Story = {
  args: {
    title: 'Under maintenance',
    description: 'This service is temporarily unavailable while we perform essential maintenance.',
    action: {
      content: 'Get notified',
      onAction: () => console.log('Get notified clicked'),
    },
    secondaryAction: {
      content: 'View status',
      onAction: () => console.log('View status clicked'),
    },
  },
};

export const DataError: Story = {
  args: {
    title: 'Data loading error',
    description: 'We couldn\'t load your data. This might be due to a temporary issue or a permissions problem.',
    action: {
      content: 'Reload data',
      onAction: () => console.log('Reload data clicked'),
    },
    secondaryAction: {
      content: 'Clear cache',
      onAction: () => console.log('Clear cache clicked'),
    },
  },
};

export const CriticalError: Story = {
  args: {
    title: 'System error',
    description: 'A critical error has occurred. Our team has been notified and is working to resolve this issue.',
    action: {
      content: 'Contact support',
      onAction: () => console.log('Contact support clicked'),
    },
    secondaryAction: {
      content: 'Report issue',
      onAction: () => console.log('Report issue clicked'),
    },
  },
};

export const InteractiveErrorHandling: Story = {
  render: () => {
    const [errorType, setErrorType] = React.useState<'network' | 'permission' | 'data' | 'critical'>('network');
    const [isRetrying, setIsRetrying] = React.useState(false);
    const [retryCount, setRetryCount] = React.useState(0);
    const [lastErrorTime, setLastErrorTime] = React.useState<Date | null>(null);

    const errorConfig = {
      network: {
        title: 'Network error',
        description: 'Unable to connect to our servers. Please check your internet connection.',
        action: 'Retry connection',
        secondaryAction: 'Check network',
        icon: 'warning'
      },
      permission: {
        title: 'Access denied',
        description: 'You don\'t have permission to access this resource.',
        action: 'Request access',
        secondaryAction: 'Go back',
        icon: 'critical'
      },
      data: {
        title: 'Data loading failed',
        description: 'We couldn\'t load your data due to a server error.',
        action: 'Retry loading',
        secondaryAction: 'Clear cache',
        icon: 'attention'
      },
      critical: {
        title: 'System error occurred',
        description: 'A critical error has occurred. Our team has been notified.',
        action: 'Contact support',
        secondaryAction: 'Report issue',
        icon: 'critical'
      }
    };

    const currentError = errorConfig[errorType];

    const handleRetry = () => {
      setIsRetrying(true);
      setRetryCount(prev => prev + 1);

      setTimeout(() => {
        const isSuccess = Math.random() > 0.7; // 30% success rate
        setIsRetrying(false);

        if (isSuccess) {
          console.log('Error resolved successfully!');
          setRetryCount(0);
        } else {
          setLastErrorTime(new Date());
        }
      }, 2000);
    };

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Error Simulator</h3>
              <InlineStack gap="200" wrap>
                {Object.keys(errorConfig).map((type) => (
                  <Button
                    key={type}
                    size="small"
                    variant={errorType === type ? 'primary' : 'secondary'}
                    onClick={() => {
                      setErrorType(type as any);
                      setRetryCount(0);
                      setLastErrorTime(null);
                    }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} Error
                  </Button>
                ))}
              </InlineStack>
            </div>

            {retryCount > 0 && (
              <div style={{
                marginBottom: '24px',
                padding: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '6px',
                border: '1px solid #fcd34d'
              }}>
                <BlockStack gap="100">
                  <Text variant="bodySm" as="p" tone="critical">
                    <strong>Retry attempts:</strong> {retryCount}
                  </Text>
                  {lastErrorTime && (
                    <Text variant="bodySm" as="p" tone="subdued">
                      Last error: {lastErrorTime.toLocaleTimeString()}
                    </Text>
                  )}
                </BlockStack>
              </div>
            )}

            <ErrorPage
              title={currentError.title}
              description={currentError.description}
              action={{
                content: currentError.action,
                onAction: handleRetry,
                loading: isRetrying,
                disabled: isRetrying
              }}
              secondaryAction={{
                content: currentError.secondaryAction,
                onAction: () => console.log(`${currentError.secondaryAction} clicked`),
              }}
            >
              {retryCount >= 3 && (
                <div style={{
                  marginTop: '20px',
                  padding: '16px',
                  backgroundColor: '#fef2f2',
                  borderRadius: '8px',
                  border: '1px solid #fecaca'
                }}>
                  <BlockStack gap="200">
                    <Text variant="bodySm" as="p" tone="critical">
                      <strong>Multiple retry attempts detected</strong>
                    </Text>
                    <Text variant="bodySm" as="p">
                      If the problem persists, please contact our support team with the following information:
                    </Text>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Badge tone="attention">Error Type: {errorType}</Badge>
                      <Badge>Retries: {retryCount}</Badge>
                      <Badge tone="critical">Timestamp: {new Date().toISOString()}</Badge>
                    </div>
                  </BlockStack>
                </div>
              )}
            </ErrorPage>
          </div>
        </Card>
      </div>
    );
  },
};

export const ErrorBoundaryExample: Story = {
  render: () => {
    const [hasError, setHasError] = React.useState(false);
    const [errorInfo, setErrorInfo] = React.useState<{ message: string; stack?: string } | null>(null);

    const simulateError = (type: 'network' | 'javascript' | 'permission' | 'timeout') => {
      setHasError(true);

      const errors = {
        network: {
          message: 'NetworkError: Failed to fetch',
          stack: 'at fetchProducts (/src/api/products.js:23:11)\nat loadDashboard (/src/pages/Dashboard.js:45:8)'
        },
        javascript: {
          message: 'TypeError: Cannot read property \'map\' of undefined',
          stack: 'at renderProductList (/src/components/ProductList.js:78:14)\nat Dashboard (/src/pages/Dashboard.js:34:22)'
        },
        permission: {
          message: 'PermissionDeniedError: User lacks required permission "admin.products.read"',
          stack: 'at checkPermissions (/src/utils/auth.js:156:12)\nat ProtectedRoute (/src/components/ProtectedRoute.js:23:8)'
        },
        timeout: {
          message: 'TimeoutError: Request timed out after 30 seconds',
          stack: 'at Timeout.request (/src/utils/timeout.js:34:18)\nat async fetchOrders (/src/api/orders.js:67:5)'
        }
      };

      setErrorInfo(errors[type]);
    };

    const resetError = () => {
      setHasError(false);
      setErrorInfo(null);
    };

    if (hasError && errorInfo) {
      return (
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <ErrorPage
            title="Application error occurred"
            description="An unexpected error has occurred in the application. Our team has been automatically notified."
            action={{
              content: 'Reload application',
              onAction: resetError,
            }}
            secondaryAction={{
              content: 'Go to safe page',
              onAction: () => console.log('Navigate to safe page'),
            }}
          >
            <BlockStack gap="400">
              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <BlockStack gap="200">
                  <Text variant="bodySm" as="p">
                    <strong>Error details:</strong>
                  </Text>
                  <code style={{
                    backgroundColor: '#f1f3f4',
                    padding: '8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    display: 'block',
                    overflow: 'auto',
                    maxWidth: '100%'
                  }}>
                    {errorInfo.message}
                  </code>
                  {errorInfo.stack && (
                    <details style={{ marginTop: '8px' }}>
                      <summary style={{ cursor: 'pointer', fontSize: '12px' }}>
                        View technical details
                      </summary>
                      <pre style={{
                        backgroundColor: '#f1f3f4',
                        padding: '8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        marginTop: '8px',
                        overflow: 'auto',
                        maxWidth: '100%'
                      }}>
                        {errorInfo.stack}
                      </pre>
                    </details>
                  )}
                </BlockStack>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Badge tone="attention">Error ID: ERR-{Math.random().toString(36).substr(2, 9).toUpperCase()}</Badge>
                <Badge>Timestamp: {new Date().toISOString()}</Badge>
                <Badge tone="info">Auto-reported to support</Badge>
              </div>
            </BlockStack>
          </ErrorPage>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 12px 0' }}>Error Boundary Simulator</h3>
                <Text variant="bodySm" as="p" tone="subdued">
                  Click the buttons below to simulate different types of application errors.
                </Text>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Simulate Error:</h4>
                <InlineStack gap="200" wrap>
                  <Button size="small" onClick={() => simulateError('network')}>
                    Network Error
                  </Button>
                  <Button size="small" onClick={() => simulateError('javascript')}>
                    JavaScript Error
                  </Button>
                  <Button size="small" onClick={() => simulateError('permission')}>
                    Permission Error
                  </Button>
                  <Button size="small" onClick={() => simulateError('timeout')}>
                    Timeout Error
                  </Button>
                </InlineStack>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <Text variant="bodySm" as="p" tone="info">
                  <strong>Note:</strong> This simulates how error boundaries would display error pages in a real application.
                  The error information shown here would typically be logged to error tracking services automatically.
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const ServiceStatusErrors: Story = {
  render: () => {
    const services = [
      {
        name: 'Payment Gateway',
        status: 'down',
        message: 'Payment processing is temporarily unavailable',
        estimatedResolution: '15 minutes',
        impact: 'Customers cannot complete purchases'
      },
      {
        name: 'Inventory Service',
        status: 'degraded',
        message: 'Inventory updates may be delayed',
        estimatedResolution: '30 minutes',
        impact: 'Stock levels may not be accurate'
      },
      {
        name: 'Email Service',
        status: 'maintenance',
        message: 'Scheduled maintenance in progress',
        estimatedResolution: '2 hours',
        impact: 'Email notifications will be queued'
      },
      {
        name: 'Analytics Service',
        status: 'down',
        message: 'Analytics data collection suspended',
        estimatedResolution: '1 hour',
        impact: 'Real-time analytics unavailable'
      }
    ];

    const getStatusTone = (status: string) => {
      switch (status) {
        case 'down': return 'critical';
        case 'degraded': return 'attention';
        case 'maintenance': return 'warning';
        default: return 'info';
      }
    };

    return (
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 12px 0' }}>Service Status Dashboard</h3>
            <Text variant="bodySm" as="p" tone="subdued">
              Real-time status of all connected services and their impact on store operations.
            </Text>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px' }}>
            {services.map((service, index) => (
              <Card key={index}>
                <div style={{ padding: '20px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '16px' }}>{service.name}</h4>
                      <Badge tone={getStatusTone(service.status)}>
                        {service.status.toUpperCase()}
                      </Badge>
                    </div>
                    <Text variant="bodySm" as="p" tone="subdued">
                      {service.message}
                    </Text>
                  </div>

                  <BlockStack gap="200">
                    <div>
                      <Text variant="bodySm" as="p">
                        <strong>Estimated resolution:</strong> {service.estimatedResolution}
                      </Text>
                      <Text variant="bodySm" as="p">
                        <strong>Impact:</strong> {service.impact}
                      </Text>
                    </div>

                    {service.status === 'down' && (
                      <ErrorPage
                        title={`${service.name} unavailable`}
                        description={service.message}
                        action={{
                          content: 'Get notified',
                          onAction: () => console.log(`Subscribe to ${service.name} updates`),
                        }}
                        secondaryAction={{
                          content: 'View details',
                          onAction: () => console.log(`View ${service.name} details`),
                        }}
                      />
                    )}
                  </BlockStack>
                </div>
              </Card>
            ))}
          </div>

          <div style={{
            padding: '16px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e1e3e5'
          }}>
            <BlockStack gap="200">
              <Text variant="bodySm" as="p">
                <strong>System Status:</strong> Limited functionality due to multiple service issues
              </Text>
              <InlineStack gap="200">
                <Badge tone="critical">2 services down</Badge>
                <Badge tone="attention">1 service degraded</Badge>
                <Badge tone="warning">1 service maintenance</Badge>
              </InlineStack>
            </BlockStack>
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const MobileErrorPages: Story = {
  render: () => {
    const mobileErrors = [
      {
        title: 'No internet connection',
        description: 'Please check your connection and try again.',
        action: 'Retry',
        icon: 'network'
      },
      {
        title: 'Page not found',
        description: 'The page you\'re looking for doesn\'t exist.',
        action: 'Go home',
        icon: '404'
      },
      {
        title: 'Server error',
        description: 'Our servers are experiencing issues. Please try again later.',
        action: 'Try again',
        icon: '500'
      }
    ];

    return (
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <BlockStack gap="300">
          {mobileErrors.map((error, index) => (
            <Card key={index}>
              <div style={{ padding: '20px' }}>
                <ErrorPage
                  title={error.title}
                  description={error.description}
                  action={{
                    content: error.action,
                    onAction: () => console.log(`${error.action} clicked`),
                  }}
                />
              </div>
            </Card>
          ))}
        </BlockStack>
      </div>
    );
  },
};