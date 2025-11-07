import type { Meta, StoryObj } from '@storybook/react';
import { List, Button, Badge, Icon, InlineStack, Text } from '@shopify/polaris';
import {
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  ExternalIcon,
  MobileIcon,
  NoteIcon,
  ProductIcon,
  PersonIcon,
  ChartHistogramFullIcon
} from '@shopify/polaris-icons';
import React, { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Data Display/List',
  component: List,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Lists are used to display groups of related items in a vertical format. They can contain text, icons, badges, and interactive elements. Lists are ideal for showing navigation items, task lists, feature lists, and any grouped content that benefits from visual organization.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bullet', 'number'],
      description: 'List style type',
    },
    gap: {
      control: 'select',
      options: ['extraTight', 'tight', 'base', 'loose', 'extraLoose'],
      description: 'Spacing between list items',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <List>
        <List.Item>First item in the list</List.Item>
        <List.Item>Second item in the list</List.Item>
        <List.Item>Third item in the list</List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },
};

export const BulletedList: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <List type="bullet">
        <List.Item>Product information and specifications</List.Item>
        <List.Item>Customer reviews and ratings</List.Item>
        <List.Item>Shipping and delivery details</List.Item>
        <List.Item>Return policy and warranty information</List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },
};

export const NumberedList: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <List type="number">
        <List.Item>Set up your store preferences</List.Item>
        <List.Item>Add your first product</List.Item>
        <List.Item>Configure payment settings</List.Item>
        <List.Item>Launch your store</List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <List>
        <List.Item icon={CheckCircleIcon}>Task completed successfully</List.Item>
        <List.Item icon={AlertCircleIcon}>Warning: Review this item</List.Item>
        <List.Item icon={InfoIcon}>Additional information available</List.Item>
        <List.Item icon={ExternalIcon}>External link to resource</List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ width: '450px' }}>
      <List>
        <List.Item>
          <InlineStack gap="200">
            <Text>Order #1020</Text>
            <Badge status="success">Fulfilled</Badge>
          </InlineStack>
        </List.Item>
        <List.Item>
          <InlineStack gap="200">
            <Text>Order #1019</Text>
            <Badge status="attention">Processing</Badge>
          </InlineStack>
        </List.Item>
        <List.Item>
          <InlineStack gap="200">
            <Text>Order #1018</Text>
            <Badge status="critical">Issue detected</Badge>
          </InlineStack>
        </List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },
};

export const FeatureList: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        Premium Features
      </h3>
      <List gap="loose">
        <List.Item icon={ChartHistogramFullIcon}>Advanced analytics dashboard</List.Item>
        <List.Item icon={ProductIcon}>Unlimited product listings</List.Item>
        <List.Item icon={PersonIcon}>Customer segmentation tools</List.Item>
        <List.Item icon={MobileIcon}>Mobile app integration</List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },
};

export const TaskList: Story = {
  render: () => {
    const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

    const toggleTask = (index: number) => {
      setCompletedTasks(prev => {
        const newSet = new Set(prev);
        if (newSet.has(index)) {
          newSet.delete(index);
        } else {
          newSet.add(index);
        }
        return newSet;
      });
    };

    const tasks = [
      'Review customer feedback',
      'Update product inventory',
      'Respond to support tickets',
      'Generate monthly report',
      'Schedule team meeting',
    ];

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Today's Tasks
        </h3>
        <List gap="base">
          {tasks.map((task, index) => (
            <List.Item key={index}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => toggleTask(index)}
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #d2d2d2',
                    borderRadius: '4px',
                    backgroundColor: completedTasks.has(index) ? '#007ace' : 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {completedTasks.has(index) && (
                    <span style={{ color: 'white', fontSize: "12px", lineHeight: 1 }}>✓</span>
                  )}
                </button>
                <span style={{
                  textDecoration: completedTasks.has(index) ? 'line-through' : 'none',
                  opacity: completedTasks.has(index) ? 0.6 : 1,
                }}>
                  {task}
                </span>
              </div>
            </List.Item>
          ))}
        </List>
        <div style={{ marginTop: '16px', fontSize: "14px", color: '#666' }}>
          Progress: {completedTasks.size} of {tasks.length} completed
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const NavigationList: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('products');

    const navItems = [
      { id: 'products', label: 'Products', icon: ProductIcon, count: 42 },
      { id: 'customers', label: 'Customers', icon: PersonIcon, count: 128 },
      { id: 'analytics', label: 'Analytics', icon: ChartHistogramFullIcon, count: null },
      { id: 'settings', label: 'Settings', icon: NoteIcon, count: null },
    ];

    return (
      <div style={{ width: '300px' }}>
        <List gap="tight">
          {navItems.map((item) => (
            <List.Item key={item.id}>
              <button
                onClick={() => setActiveItem(item.id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  backgroundColor: activeItem === item.id ? '#f3f4f6' : 'transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left',
                }}
              >
                <Icon
                  source={item.icon}
                  color={activeItem === item.id ? 'interactive' : 'subdued'}
                />
                <span style={{
                  flex: 1,
                  color: activeItem === item.id ? '#007ace' : '#212b36',
                  fontWeight: activeItem === item.id ? '600' : '400',
                }}>
                  {item.label}
                </span>
                {item.count && (
                  <Badge status={activeItem === item.id ? 'new' : 'info'}>
                    {item.count}
                  </Badge>
                )}
              </button>
            </List.Item>
          ))}
        </List>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const ChecklistList: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set(['item1']));

    const checklistItems = [
      { id: 'item1', text: 'Enable two-factor authentication', required: true },
      { id: 'item2', text: 'Set up payment methods', required: true },
      { id: 'item3', text: 'Configure shipping zones', required: false },
      { id: 'item4', text: 'Add tax settings', required: false },
      { id: 'item5', text: 'Review store policies', required: true },
    ];

    const toggleItem = (id: string) => {
      setCheckedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    };

    const requiredComplete = checklistItems
      .filter(item => item.required)
      .every(item => checkedItems.has(item.id));

    return (
      <div style={{ width: '450px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
            Store Setup Checklist
          </h3>
          <Text color="subdued" as="p">
            Complete all required items to launch your store
          </Text>
        </div>

        <List gap="base">
          {checklistItems.map((item) => (
            <List.Item key={item.id}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  style={{ marginTop: '2px' }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    {item.text}
                    {item.required && (
                      <Badge status="attention" tone="critical">Required</Badge>
                    )}
                  </span>
                </div>
              </div>
            </List.Item>
          ))}
        </List>

        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
          {requiredComplete ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2a6f3a' }}>
              <Icon source={CheckCircleIcon} color="success" />
              <span>All required setup complete!</span>
            </div>
          ) : (
            <div style={{ color: '#666' }}>
              Complete {checklistItems.filter(item => item.required).length -
                       checklistItems.filter(item => item.required && checkedItems.has(item.id)).length}
              more required items
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const SpacingExamples: Story = {
  render: () => {
    const items = ['List item one', 'List item two', 'List item three'];

    return (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Extra Tight</h4>
          <List gap="extraTight">
            {items.map((item, i) => (
              <List.Item key={i}>{item}</List.Item>
            ))}
          </List>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Base</h4>
          <List gap="base">
            {items.map((item, i) => (
              <List.Item key={i}>{item}</List.Item>
            ))}
          </List>
        </div>

        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", fontWeight: '600' }}>Loose</h4>
          <List gap="loose">
            {items.map((item, i) => (
              <List.Item key={i}>{item}</List.Item>
            ))}
          </List>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const NestedLists: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <List gap="loose">
        <List.Item>
          <strong>Product Management</strong>
          <List style={{ marginLeft: '24px', marginTop: '8px' }} gap="tight">
            <List.Item>Add new products</List.Item>
            <List.Item>Update inventory levels</List.Item>
            <List.Item>Manage product variants</List.Item>
          </List>
        </List.Item>
        <List.Item>
          <strong>Order Processing</strong>
          <List style={{ marginLeft: '24px', marginTop: '8px' }} gap="tight">
            <List.Item>Fulfill pending orders</List.Item>
            <List.Item>Process returns</List.Item>
            <List.Item>Handle customer inquiries</List.Item>
          </List>
        </List.Item>
        <List.Item>
          <strong>Marketing</strong>
          <List style={{ marginLeft: '24px', marginTop: '8px' }} gap="tight">
            <List.Item>Create promotions</List.Item>
            <List.Item>Send email campaigns</List.Item>
          </List>
        </List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const InteractiveList: Story = {
  render: () => {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const items = [
      { id: 'dashboard', label: 'Dashboard', description: 'View your store performance' },
      { id: 'products', label: 'Products', description: 'Manage your product catalog' },
      { id: 'orders', label: 'Orders', description: 'Process and track orders' },
      { id: 'customers', label: 'Customers', description: 'Customer relationship management' },
    ];

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          Navigation Menu
        </h3>
        <List gap="tight">
          {items.map((item) => (
            <List.Item key={item.id}>
              <div
                onClick={() => setSelectedItem(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  backgroundColor: selectedItem === item.id ? '#e3f2fd' :
                                 hoveredItem === item.id ? '#f8f9fa' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: selectedItem === item.id ? '2px solid #007ace' : '2px solid transparent',
                }}
              >
                <div>
                  <div style={{
                    fontWeight: selectedItem === item.id ? '600' : '500',
                    color: selectedItem === item.id ? '#007ace' : '#212b36',
                    marginBottom: '4px',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#666',
                    opacity: hoveredItem === item.id || selectedItem === item.id ? 1 : 0.8,
                  }}>
                    {item.description}
                  </div>
                </div>
              </div>
            </List.Item>
          ))}
        </List>

        {selectedItem && (
          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '6px' }}>
            Selected: <strong>{items.find(i => i.id === selectedItem)?.label}</strong>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const ComparisonList: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
        Plan Comparison
      </h3>
      <List gap="loose">
        <List.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Products</span>
            <div style={{ display: 'flex', gap: '24px', fontSize: "14px" }}>
              <span>25</span>
              <span>Unlimited</span>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Storage</span>
            <div style={{ display: 'flex', gap: '24px', fontSize: "14px" }}>
              <span>1 GB</span>
              <span>Unlimited</span>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Monthly bandwidth</span>
            <div style={{ display: 'flex', gap: '24px', fontSize: "14px" }}>
              <span>100 GB</span>
              <span>Unlimited</span>
            </div>
          </div>
        </List.Item>
        <List.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Support</span>
            <div style={{ display: 'flex', gap: '24px', fontSize: "14px" }}>
              <span>Email</span>
              <span>Priority</span>
            </div>
          </div>
        </List.Item>
      </List>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};

export const StatusList: Story = {
  render: () => {
    const systemStatuses = [
      { service: 'Payment Gateway', status: 'operational', uptime: '99.9%' },
      { service: 'Database', status: 'operational', uptime: '99.8%' },
      { service: 'CDN', status: 'degraded', uptime: '98.5%' },
      { service: 'Email Service', status: 'operational', uptime: '99.7%' },
      { service: 'API Server', status: 'maintenance', uptime: 'N/A' },
    ];

    const getStatusBadge = (status: string) => {
      const statusConfig = {
        operational: { status: 'success' as const, label: 'Operational' },
        degraded: { status: 'attention' as const, label: 'Degraded' },
        maintenance: { status: 'warning' as const, label: 'Maintenance' },
      };
      const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.operational;
      return <Badge status={config.status}>{config.label}</Badge>;
    };

    return (
      <div style={{ width: '400px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
          System Status
        </h3>
        <List gap="base">
          {systemStatuses.map((item, index) => (
            <List.Item key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: '500', marginBottom: '2px' }}>
                    {item.service}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    Uptime: {item.uptime}
                  </div>
                </div>
                {getStatusBadge(item.status)}
              </div>
            </List.Item>
          ))}
        </List>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('list', 'bulleted'),
  },

};