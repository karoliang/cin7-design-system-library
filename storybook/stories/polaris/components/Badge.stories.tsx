import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Button, InlineStack } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badges are small status indicators that provide context and information about elements. They\'re perfect for showing counts, status, and categorization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Badge content',
    },
    tone: {
      control: 'select',
      options: ['success', 'info', 'attention', 'warning', 'critical', 'new'],
      description: 'Badge color/tone',
    },
    progress: {
      control: 'select',
      options: ['incomplete', 'partiallyComplete', 'complete'],
      description: 'Progress indicator for tasks',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Badge size',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'New',
  },
};

export const Tones: Story = {
  render: () => (
    <InlineStack gap="400">
      <Badge tone="success">Success</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="attention">Attention</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="critical">Critical</Badge>
      <Badge tone="new">New</Badge>
    </InlineStack>
  ),
};

export const Progress: Story = {
  render: () => (
    <InlineStack gap="400">
      <Badge progress="incomplete">Task 1</Badge>
      <Badge progress="partiallyComplete">Task 2</Badge>
      <Badge progress="complete">Task 3</Badge>
    </InlineStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <InlineStack gap="400" align="center">
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </InlineStack>
  ),
};

export const WithNumbers: Story = {
  render: () => (
    <InlineStack gap="400">
      <Badge>1</Badge>
      <Badge tone="attention">12</Badge>
      <Badge tone="warning">99+</Badge>
      <Badge tone="success">1000</Badge>
    </InlineStack>
  ),
};

export const StatusExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <p style={{ marginBottom: '8px' }}>Order Status:</p>
        <InlineStack gap="200">
          <Badge tone="success">Shipped</Badge>
          <Badge tone="attention">Processing</Badge>
          <Badge tone="warning">Backordered</Badge>
          <Badge tone="critical">Cancelled</Badge>
        </InlineStack>
      </div>

      <div>
        <p style={{ marginBottom: '8px' }}>Inventory Status:</p>
        <InlineStack gap="200">
          <Badge tone="success">In Stock</Badge>
          <Badge tone="warning">Low Stock</Badge>
          <Badge tone="critical">Out of Stock</Badge>
          <Badge tone="info">Discontinued</Badge>
        </InlineStack>
      </div>
    </div>
  ),
};

export const InteractiveBadges: Story = {
  render: () => {
    const [activeBadge, setActiveBadge] = React.useState('all');
    const [unreadCount, setUnreadCount] = React.useState(5);
    const [tasks, setTasks] = React.useState([
      { id: 1, status: 'complete', label: 'Setup account' },
      { id: 2, status: 'complete', label: 'Add payment method' },
      { id: 3, status: 'incomplete', label: 'Verify email' },
    ]);

    const handleTaskClick = (taskId: number) => {
      setTasks(prev => prev.map(task =>
        task.id === taskId
          ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' }
          : task
      ));
    };

    const handleMarkAllRead = () => {
      setUnreadCount(0);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '500px' }}>
        <div>
          <h3 style={{ margin: '0 0 12px 0' }}>Filter Messages</h3>
          <InlineStack gap="200">
            <Button
              size="small"
              variant={activeBadge === 'all' ? 'primary' : 'plain'}
              onClick={() => setActiveBadge('all')}
            >
              All
            </Button>
            <Button
              size="small"
              variant={activeBadge === 'unread' ? 'primary' : 'plain'}
              onClick={() => setActiveBadge('unread')}
            >
              Unread {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
            </Button>
          </InlineStack>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px 0' }}>Onboarding Tasks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map(task => (
              <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Badge
                  progress={task.status === 'complete' ? 'complete' : 'incomplete'}
                  tone={task.status === 'complete' ? 'success' : 'attention'}
                >
                  {task.status === 'complete' ? '✓' : '○'}
                </Badge>
                <span style={{
                  textDecoration: task.status === 'complete' ? 'line-through' : 'none',
                  opacity: task.status === 'complete' ? 0.6 : 1
                }}>
                  {task.label}
                </span>
                <Button
                  size="micro"
                  variant="plain"
                  onClick={() => handleTaskClick(task.id)}
                >
                  {task.status === 'complete' ? 'Undo' : 'Complete'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Button onClick={handleMarkAllRead}>
            Mark all as read {unreadCount > 0 && <Badge>{unreadCount}</Badge>}
          </Button>
        </div>
      </div>
    );
  },
};