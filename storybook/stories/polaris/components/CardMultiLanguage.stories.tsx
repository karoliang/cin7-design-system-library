import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { Card, Button, Badge, Text, Icon } from '@shopify/polaris';
import { ViewMinor, EditMinor, DeleteMinor, ExportMinor } from '@shopify/polaris-icons';

// Vanilla JS Card Component
class VanillaCard {
  private container: HTMLElement;
  private header: HTMLElement;
  private content: HTMLElement;
  private actions: HTMLElement;
  private expanded = true;

  constructor(options: {
    title: string;
    content: string;
    actions?: Array<{ label: string; onClick?: () => void }>;
    background?: 'none' | 'surface' | 'surface-subdued';
  }) {
    this.container = document.createElement('div');
    this.setupStyles(options.background);
    this.createCardStructure(options);
  }

  private setupStyles(background?: string) {
    const backgrounds = {
      'none': 'transparent',
      'surface': '#ffffff',
      'surface-subdued': '#f9fafb'
    };

    this.container.style.cssText = `
      background: ${backgrounds[background as keyof typeof backgrounds] || backgrounds.surface};
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    `;

    this.container.addEventListener('mouseenter', () => {
      this.container.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });

    this.container.addEventListener('mouseleave', () => {
      this.container.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    });
  }

  private createCardStructure(options: any) {
    // Header
    this.header = document.createElement('div');
    this.header.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f3f4f6;
    `;

    const title = document.createElement('h3');
    title.textContent = options.title;
    title.style.cssText = `
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #202223;
    `;

    this.header.appendChild(title);

    // Content
    this.content = document.createElement('div');
    this.content.style.cssText = `
      font-size: 14px;
      line-height: 1.5;
      color: #4b5563;
    `;
    this.content.textContent = options.content;

    // Actions
    this.actions = document.createElement('div');
    this.actions.style.cssText = `
      display: flex;
      gap: 8px;
      margin-top: 12px;
    `;

    if (options.actions) {
      options.actions.forEach((action: any) => {
        const button = document.createElement('button');
        button.textContent = action.label;
        button.style.cssText = `
          padding: 6px 12px;
          font-size: 12px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        `;

        button.addEventListener('click', () => {
          if (action.onClick) action.onClick();
        });

        button.addEventListener('mouseenter', () => {
          button.style.backgroundColor = '#f3f4f6';
        });

        button.addEventListener('mouseleave', () => {
          button.style.backgroundColor = 'white';
        });

        this.actions.appendChild(button);
      });
    }

    this.container.appendChild(this.header);
    this.container.appendChild(this.content);
    this.container.appendChild(this.actions);
  }

  setTitle(title: string) {
    const titleElement = this.header.querySelector('h3');
    if (titleElement) titleElement.textContent = title;
  }

  setContent(content: string) {
    this.content.textContent = content;
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.content.style.display = this.expanded ? 'block' : 'none';
    this.actions.style.display = this.expanded ? 'flex' : 'none';
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.container);
  }

  destroy() {
    this.container.remove();
  }
}

// Vanilla JS React Wrapper
const VanillaCardWrapper: React.FC<{
  title: string;
  content: string;
  actions?: Array<{ label: string; onClick?: () => void }>;
  background?: 'none' | 'surface' | 'surface-subdued';
}> = ({ title, content, actions, background }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<VanillaCard | null>(null);

  useEffect(() => {
    if (containerRef.current && !cardRef.current) {
      cardRef.current = new VanillaCard({
        title,
        content,
        actions,
        background
      });
      cardRef.current.mount(containerRef.current);
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.destroy();
        cardRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.setTitle(title);
      cardRef.current.setContent(content);
    }
  }, [title, content]);

  return <div ref={containerRef} />;
};

// ExtJS Panel Component
const ExtJSCard: React.FC<{
  title: string;
  iconCls?: string;
  tools?: Array<{ type: string; handler?: () => void }>;
  html?: string;
  buttons?: Array<{ text: string; handler?: () => void }>;
}> = ({ title, iconCls, tools, html, buttons }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToolAction = (type: string) => {
    switch (type) {
      case 'collapse':
        setCollapsed(!collapsed);
        break;
      case 'refresh':
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
        break;
      case 'close':
        console.log('ExtJS card closed');
        break;
      default:
        console.log(`ExtJS tool ${type} clicked`);
    }
  };

  return (
    <div style={{
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      marginBottom: '16px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      {/* ExtJS-style header */}
      <div style={{
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        padding: '8px 12px',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        borderBottom: '1px solid #d1d5db',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {iconCls && <span style={{ fontSize: '14px' }}>{iconCls}</span>}
          <strong style={{ fontSize: '13px', color: '#495057' }}>{title}</strong>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {tools?.map((tool, index) => (
            <button
              key={index}
              onClick={() => handleToolAction(tool.type)}
              style={{
                width: '16px',
                height: '16px',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '12px',
                color: '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={tool.type}
            >
              {tool.type === 'collapse' ? (collapsed ? '▼' : '▲') :
               tool.type === 'refresh' ? (loading ? '⟳' : '↻') :
               tool.type === 'close' ? '×' : '⚙'}
            </button>
          ))}
        </div>
      </div>

      {/* ExtJS-style body */}
      {!collapsed && (
        <div style={{
          padding: '12px',
          fontSize: '12px',
          color: '#495057',
          minHeight: '60px'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#6c757d' }}>Loading...</div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: html || '' }} />
          )}

          {/* ExtJS-style buttons */}
          {buttons && buttons.length > 0 && (
            <div style={{
              marginTop: '12px',
              paddingTop: '8px',
              borderTop: '1px solid #e9ecef',
              display: 'flex',
              gap: '8px',
              justifyContent: 'flex-end'
            }}>
              {buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={button.handler}
                  style={{
                    padding: '4px 12px',
                    fontSize: '11px',
                    border: '1px solid #ced4da',
                    background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif'
                  }}
                >
                  {button.text}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// TypeScript Card Component
interface CardData {
  id: string;
  title: string;
  content: string;
  status: 'active' | 'inactive' | 'pending' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

interface CardActions {
  onView: (card: CardData) => void;
  onEdit: (card: CardData) => void;
  onDelete: (card: CardData) => void;
  onExport: (card: CardData) => void;
  onStatusChange: (card: CardData, newStatus: CardData['status']) => void;
}

const statusColors = {
  active: { bg: '#dcfce7', text: '#15803d' },
  inactive: { bg: '#f1f5f9', text: '#475569' },
  pending: { bg: '#fef3c7', text: '#d97706' },
  archived: { bg: '#f3f4f6', text: '#6b7280' }
} as const;

const priorityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#dc2626'
} as const;

const TypeSafeCard: React.FC<{
  data: CardData;
  actions: CardActions;
  variant?: 'default' | 'compact' | 'detailed';
}> = ({ data, actions, variant = 'default' }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (actionType: keyof CardActions) => {
    setIsLoading(true);
    try {
      await actions[actionType](data);
    } catch (error) {
      console.error(`Error in ${actionType} action:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColor = statusColors[data.status];
  const priorityColor = priorityColors[data.priority];

  const renderCompact = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      marginBottom: '8px'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <strong style={{ fontSize: '14px', color: '#202223' }}>{data.title}</strong>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: priorityColor
          }} />
        </div>
        <Text variant="bodySm" as="p">{data.content}</Text>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          padding: '2px 8px',
          backgroundColor: statusColor.bg,
          color: statusColor.text,
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '500'
        }}>
          {data.status}
        </div>
        <Button size="small" variant="plain" onClick={() => handleAction('onView')}>
          <Icon source={ViewMinor} />
        </Button>
      </div>
    </div>
  );

  const renderDetailed = () => (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', color: '#202223' }}>{data.title}</h3>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: priorityColor
            }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <div style={{
              padding: '4px 12px',
              backgroundColor: statusColor.bg,
              color: statusColor.text,
              borderRadius: '16px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {data.status}
            </div>
            <Badge status={data.priority === 'critical' ? 'critical' : data.priority === 'high' ? 'warning' : 'info'}>
              Priority: {data.priority}
            </Badge>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button size="small" variant="plain" onClick={() => handleAction('onView')}>
            <Icon source={ViewMinor} />
          </Button>
          <Button size="small" variant="plain" onClick={() => handleAction('onEdit')}>
            <Icon source={EditMinor} />
          </Button>
          <Button size="small" variant="plain" onClick={() => handleAction('onDelete')}>
            <Icon source={DeleteMinor} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div style={{ marginBottom: '16px' }}>
        <Text variant="bodyMd" as="p" color="subdued">{data.content}</Text>
      </div>

      {/* Metadata */}
      <div style={{
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '6px',
        fontSize: '12px',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
          <div>
            <strong>ID:</strong> {data.id}
          </div>
          <div>
            <strong>Created:</strong> {data.createdAt.toLocaleDateString()}
          </div>
          <div>
            <strong>Updated:</strong> {data.updatedAt.toLocaleDateString()}
          </div>
        </div>
        {Object.keys(data.metadata).length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <strong>Metadata:</strong>
            <pre style={{ fontSize: '10px', margin: '4px 0 0 0', whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(data.metadata, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button size="small" onClick={() => handleAction('onExport')}>
          <Icon source={ExportMinor} />
          Export
        </Button>
        <Button size="small" primary onClick={() => handleAction('onEdit')}>
          Edit Card
        </Button>
      </div>

      {isLoading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px'
        }}>
          Processing...
        </div>
      )}
    </div>
  );

  const renderDefault = () => (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <h3 style={{ margin: 0, fontSize: '16px', color: '#202223' }}>{data.title}</h3>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: priorityColor
        }} />
      </div>
      <Text variant="bodyMd" as="p" color="subdued">{data.content}</Text>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '12px'
      }}>
        <div style={{
          padding: '2px 8px',
          backgroundColor: statusColor.bg,
          color: statusColor.text,
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '500'
        }}>
          {data.status}
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button size="small" variant="plain" onClick={() => handleAction('onView')}>
            View
          </Button>
          <Button size="small" variant="plain" onClick={() => handleAction('onEdit')}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'compact': return renderCompact();
    case 'detailed': return renderDetailed();
    default: return renderDefault();
  }
};

const meta = {
  title: 'Polaris/Multi-Language/Card',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive multi-language implementation of Card components showing React, Vanilla JS, ExtJS, and TypeScript patterns. Demonstrates layout patterns, state management, and interactive features across different layers of the Cin7 DSL framework.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactImplementation: Story = {
  render: () => {
    const [expandedCard, setExpandedCard] = useState<string | null>('card1');

    const handleAction = (action: string, cardId: string) => {
      console.log(`${action} action on ${cardId}`);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>React (Polaris) Implementation</h3>
        <p>Using Shopify Polaris Card components with React state management</p>

        <Card
          title="Order #1001"
          sectioned
          actions={[
            { content: 'View Details', onAction: () => handleAction('view', 'card1') },
            { content: 'Edit Order', onAction: () => handleAction('edit', 'card1') }
          ]}
        >
          <Text as="p">
            Customer: John Doe<br />
            Total: $125.50<br />
            Status: <Badge status="success">Fulfilled</Badge>
          </Text>
        </Card>

        <Card
          title="Customer Information"
          sectioned
          actions={[
            {
              content: expandedCard === 'card2' ? 'Show Less' : 'Show More',
              onAction: () => setExpandedCard(expandedCard === 'card2' ? null : 'card2')
            }
          ]}
        >
          <Text as="p">Jane Smith - Premium Customer</Text>
          {expandedCard === 'card2' && (
            <div style={{ marginTop: '12px' }}>
              <Text as="p" variant="bodySm">
                Email: jane.smith@example.com<br />
                Phone: (555) 123-4567<br />
                Since: 2022<br />
                Total Orders: 47
              </Text>
            </div>
          )}
        </Card>

        <Card background="surface" sectioned>
          <Text as="h4" variant="headingMd">Quick Stats</Text>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
            <div>
              <Text as="p" variant="bodySm">Today's Sales</Text>
              <Text as="p" variant="headingMd">$2,456</Text>
            </div>
            <div>
              <Text as="p" variant="bodySm">Orders</Text>
              <Text as="p" variant="headingMd">23</Text>
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const VanillaJSImplementation: Story = {
  render: () => {
    const [message, setMessage] = useState('');

    const handleVanillaAction = (action: string) => {
      setMessage(`Vanilla JS action: ${action}`);
      setTimeout(() => setMessage(''), 2000);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>Vanilla JS Implementation</h3>
        <p>Class-based JavaScript components with DOM manipulation</p>

        <VanillaCardWrapper
          title="Product Inventory"
          content="Current stock levels across all warehouses"
          actions={[
            { label: 'View Stock', onClick: () => handleVanillaAction('view stock') },
            { label: 'Update', onClick: () => handleVanillaAction('update inventory') }
          ]}
        />

        <VanillaCardWrapper
          title="Customer Alert"
          content="High-priority customer requires immediate attention"
          background="surface-subdued"
          actions={[
            { label: 'Contact', onClick: () => handleVanillaAction('contact customer') },
            { label: 'Escalate', onClick: () => handleVanillaAction('escalate issue') }
          ]}
        />

        {message && (
          <div style={{
            padding: '12px',
            backgroundColor: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            {message}
          </div>
        )}
      </div>
    );
  },
};

export const ExtJSImplementation: Story = {
  render: () => {
    const [message, setMessage] = useState('');

    const handleExtJSAction = (action: string) => {
      setMessage(`ExtJS ${action} completed`);
      setTimeout(() => setMessage(''), 2000);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>ExtJS Implementation</h3>
        <p>Enterprise panel components with ExtJS-style architecture</p>

        <ExtJSCard
          title="Customer Data Panel"
          iconCls="👤"
          html="Customer information and order history displayed in an enterprise-grade panel interface."
          tools={[
            { type: 'collapse', handler: () => console.log('Toggle collapse') },
            { type: 'refresh', handler: () => handleExtJSAction('data refresh') },
            { type: 'close', handler: () => handleExtJSAction('panel close') }
          ]}
          buttons={[
            { text: 'Save', handler: () => handleExtJSAction('save data') },
            { text: 'Cancel', handler: () => handleExtJSAction('cancel edit') }
          ]}
        />

        <ExtJSCard
          title="Analytics Dashboard"
          iconCls="📊"
          html="Real-time business intelligence and performance metrics visualization."
          tools={[
            { type: 'refresh', handler: () => handleExtJSAction('analytics refresh') }
          ]}
          buttons={[
            { text: 'Export Report', handler: () => handleExtJSAction('export analytics') },
            { text: 'Configure', handler: () => handleExtJSAction('configure dashboard') }
          ]}
        />

        {message && (
          <div style={{
            padding: '8px 12px',
            backgroundColor: '#e7f3ff',
            border: '1px solid #0066cc',
            borderRadius: '3px',
            fontSize: '12px',
            fontFamily: 'Arial, sans-serif'
          }}>
            {message}
          </div>
        )}
      </div>
    );
  },
};

export const TypeScriptImplementation: Story = {
  render: () => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLogs(prev => [...prev.slice(-2), `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const cardData: CardData[] = [
      {
        id: 'card-001',
        title: 'Premium Customer Order',
        content: 'High-value order requiring special handling and priority processing',
        status: 'active',
        priority: 'high',
        metadata: { orderId: 'ORD-2024-001', value: 12500, customerId: 'CUST-001' },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
      },
      {
        id: 'card-002',
        title: 'Inventory Alert',
        content: 'Critical stock levels detected in main warehouse - immediate action required',
        status: 'pending',
        priority: 'critical',
        metadata: { warehouseId: 'WH-001', sku: 'SKU-12345', currentStock: 5 },
        createdAt: new Date('2024-01-19'),
        updatedAt: new Date('2024-01-19')
      },
      {
        id: 'card-003',
        title: 'System Maintenance',
        content: 'Scheduled system update and database optimization planned for this weekend',
        status: 'active',
        priority: 'medium',
        metadata: { scheduledDate: '2024-01-25', duration: '4 hours', systems: ['DB', 'API'] },
        createdAt: new Date('2024-01-18'),
        updatedAt: new Date('2024-01-18')
      }
    ];

    const cardActions: CardActions = {
      onView: (card) => {
        setSelectedCard(card.id);
        addLog(`Viewed card: ${card.title}`);
      },
      onEdit: (card) => {
        addLog(`Edited card: ${card.title}`);
      },
      onDelete: (card) => {
        addLog(`Deleted card: ${card.title}`);
      },
      onExport: (card) => {
        addLog(`Exported card data: ${card.id}`);
      },
      onStatusChange: (card, newStatus) => {
        addLog(`Status changed for ${card.title}: ${card.status} → ${newStatus}`);
      }
    };

    return (
      <div style={{ maxWidth: '700px' }}>
        <h3>TypeScript Implementation</h3>
        <p>Type-safe card components with comprehensive data management</p>

        <div style={{ marginBottom: '16px' }}>
          <strong>View Mode:</strong>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <Button size="small" onClick={() => setSelectedCard(null)}>
              Default
            </Button>
            <Button size="small" onClick={() => setSelectedCard('compact')}>
              Compact
            </Button>
            <Button size="small" onClick={() => setSelectedCard('detailed')}>
              Detailed
            </Button>
          </div>
        </div>

        {cardData.map(card => (
          <TypeSafeCard
            key={card.id}
            data={card}
            actions={cardActions}
            variant={
              selectedCard === 'compact' ? 'compact' :
              selectedCard === 'detailed' ? 'detailed' :
              'default'
            }
          />
        ))}

        {logs.length > 0 && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Activity Log</h4>
            {logs.map((log, index) => (
              <div key={index} style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const DashboardLayout: Story = {
  render: () => {
    const [activeLayer, setActiveLayer] = useState<'react' | 'vanilla' | 'extjs' | 'typescript'>('react');

    const dashboardData = [
      {
        title: 'Sales Overview',
        content: 'Monthly revenue tracking and performance metrics',
        value: '$45,678',
        change: '+12.5%',
        status: 'positive'
      },
      {
        title: 'New Customers',
        content: 'Customer acquisition and retention analysis',
        value: '234',
        change: '+8.2%',
        status: 'positive'
      },
      {
        title: 'Pending Orders',
        content: 'Orders awaiting processing and fulfillment',
        value: '18',
        change: '-5.3%',
        status: 'negative'
      },
      {
        title: 'Support Tickets',
        content: 'Customer support queue and response times',
        value: '7',
        change: '0%',
        status: 'neutral'
      }
    ];

    return (
      <div style={{ maxWidth: '1200px' }}>
        <h3>Business Scenario: Executive Dashboard</h3>
        <p>A complete business dashboard with different card implementation approaches</p>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <Button
              variant={activeLayer === 'react' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('react')}
            >
              React
            </Button>
            <Button
              variant={activeLayer === 'vanilla' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('vanilla')}
            >
              Vanilla JS
            </Button>
            <Button
              variant={activeLayer === 'extjs' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('extjs')}
            >
              ExtJS
            </Button>
            <Button
              variant={activeLayer === 'typescript' ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setActiveLayer('typescript')}
            >
              TypeScript
            </Button>
          </div>

          <div style={{
            padding: '8px 12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '6px',
            fontSize: '14px'
          }}>
            <strong>Dashboard Implementation: </strong>
            <Badge status="info">{activeLayer.toUpperCase()}</Badge>
          </div>
        </div>

        {activeLayer === 'react' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {dashboardData.map((item, index) => (
              <Card key={index} sectioned background="surface">
                <Text as="h4" variant="headingMd">{item.title}</Text>
                <Text as="p" variant="bodySm" color="subdued">{item.content}</Text>
                <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text as="p" variant="headingLg">{item.value}</Text>
                  <Badge status={item.status === 'positive' ? 'success' : item.status === 'negative' ? 'critical' : 'info'}>
                    {item.change}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeLayer === 'vanilla' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {dashboardData.map((item, index) => (
              <VanillaCardWrapper
                key={index}
                title={item.title}
                content={`${item.content} (${item.value})`}
                actions={[
                  { label: `View ${item.change}`, onClick: () => console.log('Vanilla view clicked') }
                ]}
              />
            ))}
          </div>
        )}

        {activeLayer === 'extjs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {dashboardData.map((item, index) => (
              <ExtJSCard
                key={index}
                title={item.title}
                html={`${item.content}<br/><strong>Value: ${item.value}</strong><br/><strong>Change: ${item.change}</strong>`}
                tools={[{ type: 'refresh' }]}
                buttons={[{ text: 'View Details' }]}
              />
            ))}
          </div>
        )}

        {activeLayer === 'typescript' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {dashboardData.map((item, index) => (
              <TypeSafeCard
                key={index}
                data={{
                  id: `metric-${index}`,
                  title: item.title,
                  content: item.content,
                  status: item.status === 'positive' ? 'active' : 'pending',
                  priority: 'medium',
                  metadata: { value: item.value, change: item.change },
                  createdAt: new Date(),
                  updatedAt: new Date()
                }}
                actions={{
                  onView: () => console.log('TypeScript view clicked'),
                  onEdit: () => console.log('TypeScript edit clicked'),
                  onDelete: () => console.log('TypeScript delete clicked'),
                  onExport: () => console.log('TypeScript export clicked'),
                  onStatusChange: () => console.log('TypeScript status changed')
                }}
                variant="compact"
              />
            ))}
          </div>
        )}

        <div style={{ marginTop: '24px' }}>
          <h4>Performance Characteristics:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#1d4ed8' }}>React</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Component-based, virtual DOM, optimal for dynamic content
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#15803d' }}>Vanilla JS</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Fast, lightweight, direct DOM manipulation
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#faf5ff', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#7c3aed' }}>ExtJS</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Feature-rich, enterprise-ready, built-in data handling
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>TypeScript</h5>
              <p style={{ margin: 0, fontSize: '12px' }}>
                Type-safe, maintainable, IDE-friendly development
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};