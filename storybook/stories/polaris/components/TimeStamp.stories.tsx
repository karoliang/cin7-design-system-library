import type { Meta, StoryObj } from '@storybook/react';
import { TimeStamp, Card, BlockStack, InlineStack, Text, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Typography/TimeStamp',
  component: TimeStamp,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TimeStamp displays time and date information in a user-friendly format. Perfect for showing when events occurred, deadlines, or relative timing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    timestamp: {
      control: 'text',
      description: 'The timestamp to display (ISO string or Date object)',
    },
    prefix: {
      control: 'text',
      description: 'Text to display before the timestamp',
    },
    suffix: {
      control: 'text',
      description: 'Text to display after the timestamp',
    },
    format: {
      control: 'select',
      options: ['relative', 'absolute', 'both'],
      description: 'How to display the timestamp',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'baseline'],
      description: 'Text alignment',
    },
    tone: {
      control: 'select',
      options: ['base', 'subdued', 'critical', 'success', 'attention', 'warning', 'info'],
      description: 'Color tone of the timestamp',
    },
    variant: {
      control: 'select',
      options: ['bodySm', 'bodyMd', 'bodyLg'],
      description: 'Text size variant',
    },
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
  },
} satisfies Meta<typeof TimeStamp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    timestamp: new Date().toISOString(),
  },
};

export const RelativeTime: Story = {
  render: () => {
    const times = [
      new Date(),
      new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    ];

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="300">
          <h3 style={{ margin: 0 }}>Relative Time Examples</h3>
          {times.map((time, index) => (
            <InlineStack gap="200" key={index}>
              <Text variant="bodySm" as="span" style={{ width: '100px' }}>
                {index === 0 ? 'Now' : `${index === 1 ? '5m' : index === 2 ? '2h' : index === 3 ? '1d' : '1w'} ago:`}
              </Text>
              <TimeStamp timestamp={time} format="relative" />
            </InlineStack>
          ))}
        </BlockStack>
      </div>
    );
  },
};

export const AbsoluteTime: Story = {
  render: () => {
    const times = [
      new Date('2024-11-05T10:30:00Z'),
      new Date('2024-11-04T15:45:00Z'),
      new Date('2024-11-01T09:00:00Z'),
      new Date('2024-10-15T14:20:00Z'),
    ];

    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="300">
          <h3 style={{ margin: 0 }}>Absolute Time Examples</h3>
          {times.map((time, index) => (
            <div key={index}>
              <TimeStamp timestamp={time} format="absolute" />
            </div>
          ))}
        </BlockStack>
      </div>
    );
  },
};

export const WithPrefix: Story = {
  render: () => {
    return (
      <div style={{ padding: '24px' }}>
        <BlockStack gap="300">
          <h3 style={{ margin: 0 }}>Timestamps with Prefix</h3>

          <div>
            <TimeStamp prefix="Created:" timestamp={new Date()} />
          </div>

          <div>
            <TimeStamp prefix="Updated:" timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)} />
          </div>

          <div>
            <TimeStamp prefix="Expires:" timestamp={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} />
          </div>

          <div>
            <TimeStamp prefix="Due:" timestamp={new Date(Date.now() + 24 * 60 * 60 * 1000)} />
          </div>
        </BlockStack>
      </div>
    );
  },
};

export const ActivityFeed: Story = {
  render: () => {
    const activities = [
      {
        user: 'Sarah Johnson',
        action: 'created a new product',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: 'create'
      },
      {
        user: 'Mike Chen',
        action: 'updated inventory levels',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: 'update'
      },
      {
        user: 'Emily Davis',
        action: 'processed order #12345',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'order'
      },
      {
        user: 'System',
        action: 'generated monthly report',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        type: 'system'
      },
      {
        user: 'David Wilson',
        action: 'added a new customer',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        type: 'customer'
      },
    ];

    const getTypeColor = (type: string) => {
      switch (type) {
        case 'create': return 'success';
        case 'update': return 'attention';
        case 'order': return 'info';
        case 'system': return 'subdued';
        case 'customer': return 'warning';
        default: return 'base';
      }
    };

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Recent Activity</h3>
                <Text as="p" tone="subdued">Latest actions from your team</Text>
              </div>

              <BlockStack gap="300">
                {activities.map((activity, index) => (
                  <div key={index}>
                    <InlineStack gap="200" align="start">
                      <div style={{ marginTop: '2px' }}>
                        <Badge size="small" tone={getTypeColor(activity.type)}>
                          {activity.type}
                        </Badge>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Text as="p">
                          <strong>{activity.user}</strong> {activity.action}
                        </Text>
                        <TimeStamp
                          timestamp={activity.timestamp}
                          format="relative"
                          variant="bodySm"
                          tone="subdued"
                        />
                      </div>
                    </InlineStack>
                    {index < activities.length - 1 && (
                      <div style={{ marginLeft: '8px', marginTop: '8px' }}>
                        <div style={{ width: '1px', height: '20px', backgroundColor: '#e1e3e5' }} />
                      </div>
                    )}
                  </div>
                ))}
              </BlockStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const OrderTimeline: Story = {
  render: () => {
    const orderEvents = [
      {
        title: 'Order Placed',
        description: 'Customer completed checkout',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'completed'
      },
      {
        title: 'Payment Confirmed',
        description: 'Payment of $89.99 processed successfully',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000),
        status: 'completed'
      },
      {
        title: 'Order Fulfilled',
        description: 'Items picked and packaged',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'completed'
      },
      {
        title: 'Shipped',
        description: 'Package handed to courier (Tracking: #123456789)',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'completed'
      },
      {
        title: 'Out for Delivery',
        description: 'Package is with local delivery agent',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'current'
      },
      {
        title: 'Delivered',
        description: 'Expected delivery by end of day',
        timestamp: new Date(Date.now() + 4 * 60 * 60 * 1000),
        status: 'pending'
      },
    ];

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'completed': return '✅';
        case 'current': return '🚚';
        case 'pending': return '⏳';
        default: return '📦';
      }
    };

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Order #12345 Timeline</h3>
                <Text as="p" tone="subdued">Track your package journey</Text>
              </div>

              <BlockStack gap="400">
                {orderEvents.map((event, index) => (
                  <div key={index}>
                    <BlockStack gap="200">
                      <InlineStack gap="300" align="start">
                        <div style={{ fontSize: "var(--font-size-xl)" }}>
                          {getStatusIcon(event.status)}
                        </div>
                        <div style={{ flex: 1 }}>
                          <InlineStack gap="200" align="baseline">
                            <Text variant="headingSm" as="span">{event.title}</Text>
                            {event.status === 'current' && (
                              <Badge size="small" tone="attention">In Progress</Badge>
                            )}
                          </InlineStack>
                          <Text as="p" tone="subdued" variant="bodySm">
                            {event.description}
                          </Text>
                          <TimeStamp
                            timestamp={event.timestamp}
                            format={event.status === 'pending' ? 'absolute' : 'relative'}
                            variant="bodySm"
                            tone="subdued"
                          />
                        </div>
                      </InlineStack>
                    </BlockStack>
                    {index < orderEvents.length - 1 && (
                      <div style={{ marginLeft: '10px' }}>
                        <div style={{ width: '2px', height: '30px', backgroundColor: '#e1e3e5' }} />
                      </div>
                    )}
                  </div>
                ))}
              </BlockStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const DocumentVersions: Story = {
  render: () => {
    const documentVersions = [
      {
        version: 'v3.2.1',
        author: 'Sarah Johnson',
        changes: 'Fixed typos in executive summary',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        size: '2.4 MB'
      },
      {
        version: 'v3.2.0',
        author: 'Mike Chen',
        changes: 'Updated Q4 financial projections',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        size: '2.3 MB'
      },
      {
        version: 'v3.1.0',
        author: 'Emily Davis',
        changes: 'Added competitive analysis section',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        size: '2.1 MB'
      },
      {
        version: 'v3.0.0',
        author: 'David Wilson',
        changes: 'Major restructuring of document layout',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        size: '1.8 MB'
      },
    ];

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Document History</h3>
                <Text as="p" tone="subdued">Annual Business Plan 2024</Text>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '16px'
              }}>
                {documentVersions.map((version, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e1e3e5'
                  }}>
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Badge tone={index === 0 ? 'attention' : 'info'}>
                          {version.version}
                        </Badge>
                        <Text variant="bodySm" as="span" tone="subdued">
                          {version.size}
                        </Text>
                      </InlineStack>
                      <Text variant="bodySm" as="p" tone="subdued">
                        by {version.author}
                      </Text>
                      <Text as="p">{version.changes}</Text>
                      <TimeStamp
                        timestamp={version.timestamp}
                        format="relative"
                        variant="bodySm"
                        tone="subdued"
                      />
                    </BlockStack>
                  </div>
                ))}
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const DeadlineTracker: Story = {
  render: () => {
    const deadlines = [
      {
        task: 'Submit quarterly report',
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        priority: 'high',
        assignee: 'Sarah Johnson'
      },
      {
        task: 'Complete product launch',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: 'high',
        assignee: 'Mike Chen'
      },
      {
        task: 'Review marketing materials',
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        assignee: 'Emily Davis'
      },
      {
        task: 'Update website content',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        priority: 'low',
        assignee: 'David Wilson'
      },
    ];

    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high': return 'critical';
        case 'medium': return 'attention';
        case 'low': return 'info';
        default: return 'base';
      }
    };

    const isOverdue = (deadline: Date) => {
      return deadline < new Date();
    };

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Upcoming Deadlines</h3>
                <Text as="p" tone="subdued">Team tasks and due dates</Text>
              </div>

              <BlockStack gap="300">
                {deadlines.map((deadline, index) => (
                  <div key={index}>
                    <div style={{
                      padding: '16px',
                      backgroundColor: isOverdue(deadline.deadline) ? '#fef2f2' : '#f8f9fa',
                      borderRadius: '8px',
                      border: `1px solid ${isOverdue(deadline.deadline) ? '#fecaca' : '#e1e3e5'}`
                    }}>
                      <BlockStack gap="200">
                        <InlineStack align="space-between">
                          <Text variant="headingSm" as="span">
                            {deadline.task}
                          </Text>
                          <InlineStack gap="200">
                            <Badge size="small" tone={getPriorityColor(deadline.priority)}>
                              {deadline.priority}
                            </Badge>
                            {isOverdue(deadline.deadline) && (
                              <Badge size="small" tone="critical">Overdue</Badge>
                            )}
                          </InlineStack>
                        </InlineStack>
                        <InlineStack gap="200" align="center">
                          <Text variant="bodySm" as="span" tone="subdued">
                            Assigned to: {deadline.assignee}
                          </Text>
                          <Text>•</Text>
                          <TimeStamp
                            timestamp={deadline.deadline}
                            format="relative"
                            variant="bodySm"
                            tone={isOverdue(deadline.deadline) ? 'critical' : 'base'}
                            prefix="Due:"
                          />
                        </InlineStack>
                      </BlockStack>
                    </div>
                  </div>
                ))}
              </BlockStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const MessageThread: Story = {
  render: () => {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }, []);

    const messages = [
      {
        sender: 'Alex Thompson',
        content: 'Hey team, I\'ve uploaded the latest designs to the shared folder. Please review and let me know if you need any changes.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        isOwn: false
      },
      {
        sender: 'You',
        content: 'Thanks Alex! I\'ll take a look this afternoon. The initial concepts look great from the quick glance I had.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isOwn: true
      },
      {
        sender: 'Maria Rodriguez',
        content: 'I\'ve reviewed the designs. The color scheme works well with our brand guidelines. Can we schedule a call to discuss the layout adjustments?',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        isOwn: false
      },
      {
        sender: 'Alex Thompson',
        content: 'Absolutely! I\'m free tomorrow at 2 PM EST. Does that work for everyone?',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isOwn: false
      },
    ];

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Design Review Discussion</h3>
                <Text as="p" tone="subdued">Last message: <TimeStamp timestamp={messages[messages.length - 1].timestamp} format="relative" /></Text>
              </div>

              <BlockStack gap="300">
                {messages.map((message, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: message.isOwn ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      maxWidth: '70%',
                      padding: '12px 16px',
                      backgroundColor: message.isOwn ? '#007ace' : '#f8f9fa',
                      borderRadius: '12px',
                      color: message.isOwn ? '#fff' : '#000'
                    }}>
                      <BlockStack gap="100">
                        {!message.isOwn && (
                          <Text variant="bodySm" as="span" fontWeight="600">
                            {message.sender}
                          </Text>
                        )}
                        <Text as="p">{message.content}</Text>
                        <TimeStamp
                          timestamp={message.timestamp}
                          format="relative"
                          variant="bodySm"
                          tone={message.isOwn ? 'subdued' : 'base'}
                        />
                      </BlockStack>
                    </div>
                  </div>
                ))}
              </BlockStack>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Text as="p" tone="subdued" variant="bodySm">Type a message...</Text>
                <Text variant="bodySm" as="span" tone="subdued">
                  • <TimeStamp timestamp={currentTime} format="relative" />
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const ServerUptime: Story = {
  render: () => {
    const serverEvents = [
      {
        event: 'Server started',
        status: 'online',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        duration: null
      },
      {
        event: 'Scheduled maintenance',
        status: 'maintenance',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
        duration: '30 minutes'
      },
      {
        event: 'Service restored',
        status: 'online',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 2.5 * 60 * 60 * 1000),
        duration: null
      },
      {
        event: 'High traffic alert',
        status: 'degraded',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        duration: '15 minutes'
      },
      {
        event: 'Performance normalized',
        status: 'online',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000),
        duration: null
      },
    ];

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'online': return 'success';
        case 'maintenance': return 'warning';
        case 'degraded': return 'attention';
        default: return 'critical';
      }
    };

    const calculateUptime = () => {
      const totalPeriod = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
      const downtime = 30 * 60 * 1000 + 15 * 60 * 1000; // 45 minutes total downtime
      const uptime = ((totalPeriod - downtime) / totalPeriod) * 100;
      return uptime.toFixed(2);
    };

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Server Status & Uptime</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Badge tone="success">Currently Online</Badge>
                  <Text as="p" tone="subdued">
                    {calculateUptime()}% uptime over last 7 days
                  </Text>
                </div>
              </div>

              <BlockStack gap="300">
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Recent Events</h4>
                  <BlockStack gap="200">
                    {serverEvents.map((event, index) => (
                      <div key={index}>
                        <InlineStack gap="300" align="center">
                          <Badge size="small" tone={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                          <div style={{ flex: 1 }}>
                            <Text as="p">{event.event}</Text>
                            <InlineStack gap="200" align="center">
                              <TimeStamp
                                timestamp={event.timestamp}
                                format="relative"
                                variant="bodySm"
                                tone="subdued"
                              />
                              {event.duration && (
                                <>
                                  <Text>•</Text>
                                  <Text variant="bodySm" as="span" tone="subdued">
                                    Duration: {event.duration}
                                  </Text>
                                </>
                              )}
                            </InlineStack>
                          </div>
                        </InlineStack>
                      </div>
                    ))}
                  </BlockStack>
                </div>

                <div style={{
                  padding: '16px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  border: '1px solid #bfdbfe'
                }}>
                  <BlockStack gap="200">
                    <Text as="p" fontWeight="600">Service Level Agreement (SLA)</Text>
                    <Text variant="bodySm" as="p">
                      Target: 99.9% uptime | Current: {calculateUptime()}% | Period: Last 7 days
                    </Text>
                    <Text variant="bodySm" as="p" tone="subdued">
                      Next maintenance window: Sunday 2:00 AM - 4:00 AM EST
                    </Text>
                  </BlockStack>
                </div>
              </BlockStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};