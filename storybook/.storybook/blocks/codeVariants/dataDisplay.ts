import type { CodeVariant } from './types';

export const badgeExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Badge } from '@shopify/polaris';
import React from 'react';

function BadgeExample() {
  return <Badge>New</Badge>;
}

export default BadgeExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create badge
const badge = createBadge({ text: 'New' });

// Add to page
document.getElementById('app').appendChild(badge);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create badge
Ext.create('Cin7.component.PolarisBadge', {
  text: 'New',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Badge } from '@shopify/polaris';
import React from 'react';

function BadgeExample(): JSX.Element {
  return <Badge>New</Badge>;
}

export default BadgeExample;`,
  },

  tones: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function TonesExample() {
  return (
    <InlineStack gap="400">
      <Badge tone="success">Success</Badge>
      <Badge tone="info">Info</Badge>
      <Badge tone="attention">Attention</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="critical">Critical</Badge>
      <Badge tone="new">New</Badge>
    </InlineStack>
  );
}

export default TonesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';

// Create badges with different tones
const tones = [
  { tone: 'success', text: 'Success' },
  { tone: 'info', text: 'Info' },
  { tone: 'attention', text: 'Attention' },
  { tone: 'warning', text: 'Warning' },
  { tone: 'critical', text: 'Critical' },
  { tone: 'new', text: 'New' }
];

tones.forEach(({ tone, text }) => {
  const badge = createBadge({ text, tone });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container panel
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: 'Success', tone: 'success' },
    { xtype: 'polarisbadge', text: 'Info', tone: 'info' },
    { xtype: 'polarisbadge', text: 'Attention', tone: 'attention' },
    { xtype: 'polarisbadge', text: 'Warning', tone: 'warning' },
    { xtype: 'polarisbadge', text: 'Critical', tone: 'critical' },
    { xtype: 'polarisbadge', text: 'New', tone: 'new' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

function TonesExample(): JSX.Element {
  const tones: { tone: BadgeTone; label: string }[] = [
    { tone: 'success', label: 'Success' },
    { tone: 'info', label: 'Info' },
    { tone: 'attention', label: 'Attention' },
    { tone: 'warning', label: 'Warning' },
    { tone: 'critical', label: 'Critical' },
    { tone: 'new', label: 'New' }
  ];

  return (
    <InlineStack gap="400">
      {tones.map(({ tone, label }) => (
        <Badge key={tone} tone={tone}>
          {label}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default TonesExample;`,
  },

  progress: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function ProgressExample() {
  return (
    <InlineStack gap="400">
      <Badge progress="incomplete">Task 1</Badge>
      <Badge progress="partiallyComplete">Task 2</Badge>
      <Badge progress="complete">Task 3</Badge>
    </InlineStack>
  );
}

export default ProgressExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';

// Create progress badges
const progressStates = [
  { progress: 'incomplete', text: 'Task 1' },
  { progress: 'partiallyComplete', text: 'Task 2' },
  { progress: 'complete', text: 'Task 3' }
];

progressStates.forEach(({ progress, text }) => {
  const badge = createBadge({ text, progress });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container with progress badges
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: 'Task 1', progress: 'incomplete' },
    { xtype: 'polarisbadge', text: 'Task 2', progress: 'partiallyComplete' },
    { xtype: 'polarisbadge', text: 'Task 3', progress: 'complete' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeProgress = 'incomplete' | 'partiallyComplete' | 'complete';

function ProgressExample(): JSX.Element {
  const tasks: { progress: BadgeProgress; label: string }[] = [
    { progress: 'incomplete', label: 'Task 1' },
    { progress: 'partiallyComplete', label: 'Task 2' },
    { progress: 'complete', label: 'Task 3' }
  ];

  return (
    <InlineStack gap="400">
      {tasks.map(({ progress, label }) => (
        <Badge key={label} progress={progress}>
          {label}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default ProgressExample;`,
  },

  sizes: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function SizesExample() {
  return (
    <InlineStack gap="400" align="center">
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </InlineStack>
  );
}

export default SizesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';
container.style.alignItems = 'center';

// Create badges with different sizes
const sizes = [
  { size: 'small', text: 'Small' },
  { size: 'medium', text: 'Medium' },
  { size: 'large', text: 'Large' }
];

sizes.forEach(({ size, text }) => {
  const badge = createBadge({ text, size });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container with different sized badges
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: 'Small', size: 'small' },
    { xtype: 'polarisbadge', text: 'Medium', size: 'medium' },
    { xtype: 'polarisbadge', text: 'Large', size: 'large' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeSize = 'small' | 'medium' | 'large';

function SizesExample(): JSX.Element {
  const sizes: { size: BadgeSize; label: string }[] = [
    { size: 'small', label: 'Small' },
    { size: 'medium', label: 'Medium' },
    { size: 'large', label: 'Large' }
  ];

  return (
    <InlineStack gap="400" align="center">
      {sizes.map(({ size, label }) => (
        <Badge key={size} size={size}>
          {label}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default SizesExample;`,
  },

  withNumbers: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function WithNumbersExample() {
  return (
    <InlineStack gap="400">
      <Badge>1</Badge>
      <Badge tone="attention">12</Badge>
      <Badge tone="warning">99+</Badge>
      <Badge tone="success">1000</Badge>
    </InlineStack>
  );
}

export default WithNumbersExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '16px';

// Create number badges
const badges = [
  { text: '1' },
  { text: '12', tone: 'attention' },
  { text: '99+', tone: 'warning' },
  { text: '1000', tone: 'success' }
];

badges.forEach(({ text, tone }) => {
  const badge = createBadge({ text, tone });
  container.appendChild(badge);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create container with number badges
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 16
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polarisbadge', text: '1' },
    { xtype: 'polarisbadge', text: '12', tone: 'attention' },
    { xtype: 'polarisbadge', text: '99+', tone: 'warning' },
    { xtype: 'polarisbadge', text: '1000', tone: 'success' }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

interface NumberBadge {
  count: string;
  tone?: BadgeTone;
}

function WithNumbersExample(): JSX.Element {
  const badges: NumberBadge[] = [
    { count: '1' },
    { count: '12', tone: 'attention' },
    { count: '99+', tone: 'warning' },
    { count: '1000', tone: 'success' }
  ];

  return (
    <InlineStack gap="400">
      {badges.map((badge, index) => (
        <Badge key={index} tone={badge.tone}>
          {badge.count}
        </Badge>
      ))}
    </InlineStack>
  );
}

export default WithNumbersExample;`,
  },

  statusExamples: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function StatusExamplesExample() {
  return (
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
  );
}

export default StatusExamplesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

// Create main container
const mainContainer = document.createElement('div');
mainContainer.style.display = 'flex';
mainContainer.style.flexDirection = 'column';
mainContainer.style.gap = '16px';

// Order Status Section
const orderSection = document.createElement('div');
const orderLabel = document.createElement('p');
orderLabel.textContent = 'Order Status:';
orderLabel.style.marginBottom = '8px';
orderSection.appendChild(orderLabel);

const orderContainer = document.createElement('div');
orderContainer.style.display = 'flex';
orderContainer.style.gap = '8px';

const orderStatuses = [
  { text: 'Shipped', tone: 'success' },
  { text: 'Processing', tone: 'attention' },
  { text: 'Backordered', tone: 'warning' },
  { text: 'Cancelled', tone: 'critical' }
];

orderStatuses.forEach(({ text, tone }) => {
  const badge = createBadge({ text, tone });
  orderContainer.appendChild(badge);
});

orderSection.appendChild(orderContainer);

// Inventory Status Section
const inventorySection = document.createElement('div');
const inventoryLabel = document.createElement('p');
inventoryLabel.textContent = 'Inventory Status:';
inventoryLabel.style.marginBottom = '8px';
inventorySection.appendChild(inventoryLabel);

const inventoryContainer = document.createElement('div');
inventoryContainer.style.display = 'flex';
inventoryContainer.style.gap = '8px';

const inventoryStatuses = [
  { text: 'In Stock', tone: 'success' },
  { text: 'Low Stock', tone: 'warning' },
  { text: 'Out of Stock', tone: 'critical' },
  { text: 'Discontinued', tone: 'info' }
];

inventoryStatuses.forEach(({ text, tone }) => {
  const badge = createBadge({ text, tone });
  inventoryContainer.appendChild(badge);
});

inventorySection.appendChild(inventoryContainer);

mainContainer.appendChild(orderSection);
mainContainer.appendChild(inventorySection);
document.getElementById('app').appendChild(mainContainer);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Create main container
const mainContainer = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  renderTo: Ext.getBody(),
  items: [
    // Order Status Section
    {
      xtype: 'panel',
      html: '<p style="margin-bottom: 8px;">Order Status:</p>',
      border: false
    },
    {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        gap: 8
      },
      border: false,
      items: [
        { xtype: 'polarisbadge', text: 'Shipped', tone: 'success' },
        { xtype: 'polarisbadge', text: 'Processing', tone: 'attention' },
        { xtype: 'polarisbadge', text: 'Backordered', tone: 'warning' },
        { xtype: 'polarisbadge', text: 'Cancelled', tone: 'critical' }
      ]
    },
    // Inventory Status Section
    {
      xtype: 'panel',
      html: '<p style="margin-bottom: 8px;">Inventory Status:</p>',
      border: false,
      margin: '16 0 0 0'
    },
    {
      xtype: 'panel',
      layout: {
        type: 'hbox',
        gap: 8
      },
      border: false,
      items: [
        { xtype: 'polarisbadge', text: 'In Stock', tone: 'success' },
        { xtype: 'polarisbadge', text: 'Low Stock', tone: 'warning' },
        { xtype: 'polarisbadge', text: 'Out of Stock', tone: 'critical' },
        { xtype: 'polarisbadge', text: 'Discontinued', tone: 'info' }
      ]
    }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

interface StatusBadge {
  label: string;
  tone: BadgeTone;
}

interface StatusCategory {
  title: string;
  statuses: StatusBadge[];
}

function StatusExamplesExample(): JSX.Element {
  const statusCategories: StatusCategory[] = [
    {
      title: 'Order Status:',
      statuses: [
        { label: 'Shipped', tone: 'success' },
        { label: 'Processing', tone: 'attention' },
        { label: 'Backordered', tone: 'warning' },
        { label: 'Cancelled', tone: 'critical' }
      ]
    },
    {
      title: 'Inventory Status:',
      statuses: [
        { label: 'In Stock', tone: 'success' },
        { label: 'Low Stock', tone: 'warning' },
        { label: 'Out of Stock', tone: 'critical' },
        { label: 'Discontinued', tone: 'info' }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {statusCategories.map((category, index) => (
        <div key={index}>
          <p style={{ marginBottom: '8px' }}>{category.title}</p>
          <InlineStack gap="200">
            {category.statuses.map((status) => (
              <Badge key={status.label} tone={status.tone}>
                {status.label}
              </Badge>
            ))}
          </InlineStack>
        </div>
      ))}
    </div>
  );
}

export default StatusExamplesExample;`,
  }
,

  interactiveBadges: {
    react: `import { Badge, Button, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractiveBadgesExample() {
  const [activeBadge, setActiveBadge] = useState('all');
  const [unreadCount, setUnreadCount] = useState(5);
  const [tasks, setTasks] = useState([
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
    </div>
  );
}

export default InteractiveBadgesExample;`,

    vanilla: `import { createBadge, on } from '@cin7/vanilla-js';

let unreadCount = 5;
const tasks = [
  { id: 1, status: 'complete', label: 'Setup account' },
  { id: 2, status: 'complete', label: 'Add payment method' },
  { id: 3, status: 'incomplete', label: 'Verify email' }
];

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '24px';

const filterButtons = document.createElement('div');
const allButton = document.createElement('button');
allButton.textContent = 'All';
allButton.className = 'polaris-button polaris-button--primary';

const unreadButton = document.createElement('button');
unreadButton.textContent = \`Unread \${unreadCount}\`;

filterButtons.appendChild(allButton);
filterButtons.appendChild(unreadButton);

tasks.forEach(task => {
  const badge = createBadge({
    text: task.status === 'complete' ? '✓' : '○',
    tone: task.status === 'complete' ? 'success' : 'attention'
  });
  container.appendChild(badge);
});

container.appendChild(filterButtons);
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge, PolarisButton } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  title: 'Interactive Badges',
  width: 500,
  layout: 'vbox',
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polarisbutton', text: 'All', variant: 'primary' },
        { xtype: 'polarisbutton', text: 'Unread', margin: '0 0 0 8' }
      ]
    },
    {
      xtype: 'panel',
      margin: '24 0 0 0',
      items: [
        { xtype: 'polarisbadge', text: '✓', progress: 'complete', tone: 'success' },
        { xtype: 'polarisbadge', text: '○', progress: 'incomplete', tone: 'attention' }
      ]
    }
  ]
});`,

    typescript: `import { Badge, Button, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

interface Task {
  id: number;
  status: 'complete' | 'incomplete';
  label: string;
}

type FilterType = 'all' | 'unread';

function InteractiveBadgesExample(): JSX.Element {
  const [activeBadge, setActiveBadge] = useState<FilterType>('all');
  const [unreadCount, setUnreadCount] = useState<number>(5);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, status: 'complete', label: 'Setup account' },
    { id: 2, status: 'complete', label: 'Add payment method' },
    { id: 3, status: 'incomplete', label: 'Verify email' },
  ]);

  const handleTaskClick = (taskId: number): void => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' }
        : task
    ));
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
    </div>
  );
}

export default InteractiveBadgesExample;`,
  },

  marketingBadges: {
    react: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

function MarketingBadgesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Promotional Badges</h3>
        <InlineStack gap="300" wrap>
          <Badge tone="success">Free Shipping</Badge>
          <Badge tone="attention">Limited Time</Badge>
          <Badge tone="warning">Low Stock</Badge>
          <Badge tone="new">New Arrival</Badge>
          <Badge tone="info">Best Seller</Badge>
        </InlineStack>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Pricing & Discount Badges</h3>
        <InlineStack gap="300" wrap>
          <Badge tone="success">Save 20%</Badge>
          <Badge tone="attention">50% OFF</Badge>
          <Badge tone="warning">Last Chance</Badge>
          <Badge tone="critical">Sale Ends Soon</Badge>
        </InlineStack>
      </div>
    </div>
  );
}

export default MarketingBadgesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '24px';

const promoSection = document.createElement('div');
const promoTitle = document.createElement('h3');
promoTitle.textContent = 'Promotional Badges';
promoSection.appendChild(promoTitle);

const promoBadges = [
  { text: 'Free Shipping', tone: 'success' },
  { text: 'Limited Time', tone: 'attention' },
  { text: 'Low Stock', tone: 'warning' },
  { text: 'New Arrival', tone: 'new' },
  { text: 'Best Seller', tone: 'info' }
];

promoBadges.forEach(({ text, tone }) => {
  const badge = createBadge({ text, tone });
  promoSection.appendChild(badge);
});

container.appendChild(promoSection);
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  title: 'Marketing Badges',
  width: 600,
  layout: 'vbox',
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polarisbadge', text: 'Free Shipping', tone: 'success' },
        { xtype: 'polarisbadge', text: 'Limited Time', tone: 'attention' },
        { xtype: 'polarisbadge', text: 'Low Stock', tone: 'warning' },
        { xtype: 'polarisbadge', text: 'New Arrival', tone: 'new' },
        { xtype: 'polarisbadge', text: 'Best Seller', tone: 'info' }
      ]
    }
  ]
});`,

    typescript: `import { Badge, InlineStack } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

interface BadgeItem {
  label: string;
  tone: BadgeTone;
}

function MarketingBadgesExample(): JSX.Element {
  const promoBadges: BadgeItem[] = [
    { label: 'Free Shipping', tone: 'success' },
    { label: 'Limited Time', tone: 'attention' },
    { label: 'Low Stock', tone: 'warning' },
    { label: 'New Arrival', tone: 'new' },
    { label: 'Best Seller', tone: 'info' }
  ];

  const pricingBadges: BadgeItem[] = [
    { label: 'Save 20%', tone: 'success' },
    { label: '50% OFF', tone: 'attention' },
    { label: 'Last Chance', tone: 'warning' },
    { label: 'Sale Ends Soon', tone: 'critical' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Promotional Badges</h3>
        <InlineStack gap="300" wrap>
          {promoBadges.map((badge) => (
            <Badge key={badge.label} tone={badge.tone}>
              {badge.label}
            </Badge>
          ))}
        </InlineStack>
      </div>

      <div>
        <h3 style={{ margin: '0 0 12px 0' }}>Pricing & Discount Badges</h3>
        <InlineStack gap="300" wrap>
          {pricingBadges.map((badge) => (
            <Badge key={badge.label} tone={badge.tone}>
              {badge.label}
            </Badge>
          ))}
        </InlineStack>
      </div>
    </div>
  );
}

export default MarketingBadgesExample;`,
  },

  productTags: {
    react: `import { Badge } from '@shopify/polaris';
import React from 'react';

function ProductTagsExample() {
  const products = [
    { name: 'Classic T-Shirt', tags: ['Best Seller', 'Free Shipping'], price: '$29.99' },
    { name: 'Premium Headphones', tags: ['New', 'Limited Time'], price: '$129.99' }
  ];

  const getTone = (tag: string): any => {
    if (tag === 'Best Seller') return 'success';
    if (tag === 'New') return 'new';
    if (tag === 'Limited Time') return 'attention';
    return 'info';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      {products.map((product, index) => (
        <div key={index} style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <h4>{product.name}</h4>
          <p>{product.price}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {product.tags.map((tag, i) => (
              <Badge key={i} tone={getTone(tag)}>{tag}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductTagsExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

const products = [
  { name: 'Classic T-Shirt', tags: ['Best Seller', 'Free Shipping'], price: '$29.99' },
  { name: 'Premium Headphones', tags: ['New', 'Limited Time'], price: '$129.99' }
];

const getTone = (tag) => {
  if (tag === 'Best Seller') return 'success';
  if (tag === 'New') return 'new';
  if (tag === 'Limited Time') return 'attention';
  return 'info';
};

const container = document.createElement('div');
products.forEach(product => {
  const card = document.createElement('div');
  card.style.padding = '16px';
  card.style.border = '1px solid #e1e3e5';

  product.tags.forEach(tag => {
    const badge = createBadge({ text: tag, tone: getTone(tag) });
    card.appendChild(badge);
  });

  container.appendChild(card);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  title: 'Product Tags',
  width: 600,
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polarisbadge', text: 'Best Seller', tone: 'success' },
        { xtype: 'polarisbadge', text: 'Free Shipping', tone: 'info' },
        { xtype: 'polarisbadge', text: 'New', tone: 'new' }
      ]
    }
  ]
});`,

    typescript: `import { Badge } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

interface Product {
  name: string;
  tags: string[];
  price: string;
}

function ProductTagsExample(): JSX.Element {
  const products: Product[] = [
    { name: 'Classic T-Shirt', tags: ['Best Seller', 'Free Shipping'], price: '$29.99' },
    { name: 'Premium Headphones', tags: ['New', 'Limited Time'], price: '$129.99' }
  ];

  const getTone = (tag: string): BadgeTone => {
    if (tag === 'Best Seller') return 'success';
    if (tag === 'New') return 'new';
    if (tag === 'Limited Time') return 'attention';
    return 'info';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      {products.map((product, index) => (
        <div key={index} style={{ padding: '16px', border: '1px solid #e1e3e5' }}>
          <h4>{product.name}</h4>
          <p>{product.price}</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {product.tags.map((tag, i) => (
              <Badge key={i} tone={getTone(tag)}>{tag}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductTagsExample;`,
  },

  campaignBadges: {
    react: `import { Badge } from '@shopify/polaris';
import React, { useState } from 'react';

function CampaignBadgesExample() {
  const [selectedCampaign, setSelectedCampaign] = useState('black-friday');

  const campaigns = [
    { id: 'black-friday', name: 'Black Friday', status: 'active', discount: '50% OFF' },
    { id: 'cyber-monday', name: 'Cyber Monday', status: 'upcoming', discount: '40% OFF' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px' }}>
      {campaigns.map((campaign) => (
        <div key={campaign.id} onClick={() => setSelectedCampaign(campaign.id)}
             style={{ padding: '16px', border: '2px solid #e1e3e5', borderRadius: '8px', cursor: 'pointer' }}>
          <h4>{campaign.name}</h4>
          <Badge tone="success">{campaign.status}</Badge>
          <Badge tone="attention">{campaign.discount}</Badge>
        </div>
      ))}
    </div>
  );
}

export default CampaignBadgesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

const campaigns = [
  { id: 'black-friday', name: 'Black Friday', status: 'active', discount: '50% OFF' },
  { id: 'cyber-monday', name: 'Cyber Monday', status: 'upcoming', discount: '40% OFF' }
];

const container = document.createElement('div');
campaigns.forEach(campaign => {
  const card = document.createElement('div');
  card.style.padding = '16px';

  const statusBadge = createBadge({ text: campaign.status, tone: 'success' });
  const discountBadge = createBadge({ text: campaign.discount, tone: 'attention' });

  card.appendChild(statusBadge);
  card.appendChild(discountBadge);
  container.appendChild(card);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  title: 'Campaign Badges',
  width: 700,
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polarisbadge', text: 'Active', tone: 'success' },
        { xtype: 'polarisbadge', text: '50% OFF', tone: 'attention' }
      ]
    }
  ]
});`,

    typescript: `import { Badge } from '@shopify/polaris';
import React, { useState } from 'react';

type CampaignStatus = 'active' | 'upcoming' | 'scheduled' | 'ending';

interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  discount: string;
}

function CampaignBadgesExample(): JSX.Element {
  const [selectedCampaign, setSelectedCampaign] = useState<string>('black-friday');

  const campaigns: Campaign[] = [
    { id: 'black-friday', name: 'Black Friday', status: 'active', discount: '50% OFF' },
    { id: 'cyber-monday', name: 'Cyber Monday', status: 'upcoming', discount: '40% OFF' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '700px' }}>
      {campaigns.map((campaign) => (
        <div key={campaign.id} onClick={() => setSelectedCampaign(campaign.id)}
             style={{ padding: '16px', border: '2px solid #e1e3e5', borderRadius: '8px', cursor: 'pointer' }}>
          <h4>{campaign.name}</h4>
          <Badge tone="success">{campaign.status}</Badge>
          <Badge tone="attention">{campaign.discount}</Badge>
        </div>
      ))}
    </div>
  );
}

export default CampaignBadgesExample;`,
  },

  loyaltyBadges: {
    react: `import { Badge } from '@shopify/polaris';
import React from 'react';

function LoyaltyBadgesExample() {
  const tiers = [
    { tier: 'Bronze', badges: ['Member', '1 Year', '50 Points'], color: '#CD7F32' },
    { tier: 'Silver', badges: ['VIP', '2 Years', '250 Points'], color: '#C0C0C0' },
    { tier: 'Gold', badges: ['Premium', '5+ Years', '1000+ Points'], color: '#FFD700' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      {tiers.map((tier, index) => (
        <div key={index} style={{ padding: '20px', border: \`2px solid \${tier.color}\`, borderRadius: '8px' }}>
          <h4>{tier.tier} Tier</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            {tier.badges.map((badge, i) => (
              <Badge key={i} tone={index >= 2 ? 'success' : 'info'}>{badge}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoyaltyBadgesExample;`,

    vanilla: `import { createBadge } from '@cin7/vanilla-js';

const tiers = [
  { tier: 'Bronze', badges: ['Member', '1 Year', '50 Points'], color: '#CD7F32' },
  { tier: 'Silver', badges: ['VIP', '2 Years', '250 Points'], color: '#C0C0C0' },
  { tier: 'Gold', badges: ['Premium', '5+ Years', '1000+ Points'], color: '#FFD700' }
];

const container = document.createElement('div');
tiers.forEach((tier, index) => {
  const card = document.createElement('div');
  card.style.padding = '20px';
  card.style.border = \`2px solid \${tier.color}\`;

  tier.badges.forEach(badgeText => {
    const badge = createBadge({
      text: badgeText,
      tone: index >= 2 ? 'success' : 'info'
    });
    card.appendChild(badge);
  });

  container.appendChild(card);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  title: 'Loyalty Badges',
  width: 800,
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polarisbadge', text: 'Member', tone: 'info' },
        { xtype: 'polarisbadge', text: 'VIP', tone: 'attention' },
        { xtype: 'polarisbadge', text: 'Premium', tone: 'success' }
      ]
    }
  ]
});`,

    typescript: `import { Badge } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention';

interface CustomerTier {
  tier: string;
  badges: string[];
  color: string;
}

function LoyaltyBadgesExample(): JSX.Element {
  const tiers: CustomerTier[] = [
    { tier: 'Bronze', badges: ['Member', '1 Year', '50 Points'], color: '#CD7F32' },
    { tier: 'Silver', badges: ['VIP', '2 Years', '250 Points'], color: '#C0C0C0' },
    { tier: 'Gold', badges: ['Premium', '5+ Years', '1000+ Points'], color: '#FFD700' }
  ];

  const getTone = (index: number): BadgeTone => {
    if (index >= 2) return 'success';
    if (index === 1) return 'attention';
    return 'info';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
      {tiers.map((tier, index) => (
        <div key={index} style={{ padding: '20px', border: \`2px solid \${tier.color}\`, borderRadius: '8px' }}>
          <h4>{tier.tier} Tier</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            {tier.badges.map((badge, i) => (
              <Badge key={i} tone={getTone(index)}>{badge}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoyaltyBadgesExample;`,
  }
};

// Utilities - Tag Component Examples

export const tagExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Tag } from '@shopify/polaris';
import React from 'react';

function TagExample() {
  return <Tag>Sample Tag</Tag>;
}

export default TagExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// Create tag
const tag = createTag({ text: 'Sample Tag' });

// Add to page
document.getElementById('app').appendChild(tag);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create tag
Ext.create('Cin7.component.PolarisTag', {
  text: 'Sample Tag',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Tag } from '@shopify/polaris';
import React from 'react';

function TagExample(): JSX.Element {
  return <Tag>Sample Tag</Tag>;
}

export default TagExample;`,
  },

  basictags: {
    react: `import { Tag, InlineStack } from '@shopify/polaris';
import React from 'react';

function BasicTagsExample() {
  return (
    <InlineStack gap="300">
      <Tag>Default</Tag>
      <Tag tone="success">Success</Tag>
      <Tag tone="warning">Warning</Tag>
      <Tag tone="critical">Critical</Tag>
      <Tag tone="info">Info</Tag>
      <Tag tone="highlight">Highlight</Tag>
    </InlineStack>
  );
}

export default BasicTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '12px';
container.style.flexWrap = 'wrap';

// Create tags with different tones
const tags = [
  { text: 'Default' },
  { text: 'Success', tone: 'success' },
  { text: 'Warning', tone: 'warning' },
  { text: 'Critical', tone: 'critical' },
  { text: 'Info', tone: 'info' },
  { text: 'Highlight', tone: 'highlight' }
];

tags.forEach(config => {
  const tag = createTag(config);
  container.appendChild(tag);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create container with tags
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 12
  },
  renderTo: Ext.getBody(),
  items: [
    { xtype: 'polaristag', text: 'Default' },
    { xtype: 'polaristag', text: 'Success', tone: 'success' },
    { xtype: 'polaristag', text: 'Warning', tone: 'warning' },
    { xtype: 'polaristag', text: 'Critical', tone: 'critical' },
    { xtype: 'polaristag', text: 'Info', tone: 'info' },
    { xtype: 'polaristag', text: 'Highlight', tone: 'highlight' }
  ]
});`,

    typescript: `import { Tag, InlineStack } from '@shopify/polaris';
import React from 'react';

type TagTone = 'base' | 'success' | 'warning' | 'critical' | 'info' | 'highlight';

interface TagConfig {
  text: string;
  tone?: TagTone;
}

function BasicTagsExample(): JSX.Element {
  const tags: TagConfig[] = [
    { text: 'Default' },
    { text: 'Success', tone: 'success' },
    { text: 'Warning', tone: 'warning' },
    { text: 'Critical', tone: 'critical' },
    { text: 'Info', tone: 'info' },
    { text: 'Highlight', tone: 'highlight' }
  ];

  return (
    <InlineStack gap="300">
      {tags.map(({ text, tone }) => (
        <Tag key={text} tone={tone}>
          {text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default BasicTagsExample;`,
  },

  removabletags: {
    react: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function RemovableTagsExample() {
  const [tags, setTags] = useState([
    { id: '1', text: 'Electronics' },
    { id: '2', text: 'Books' },
    { id: '3', text: 'Clothing' },
    { id: '4', text: 'Home & Garden' },
  ]);

  const handleRemove = (tagId: string) => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  return (
    <InlineStack gap="200" wrap>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onRemove={() => handleRemove(tag.id)}
          removable
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default RemovableTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// State management
let tags = [
  { id: '1', text: 'Electronics' },
  { id: '2', text: 'Books' },
  { id: '3', text: 'Clothing' },
  { id: '4', text: 'Home & Garden' }
];

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '8px';
container.style.flexWrap = 'wrap';

// Render tags function
function renderTags() {
  container.innerHTML = '';
  tags.forEach(tag => {
    const tagEl = createTag({
      text: tag.text,
      removable: true,
      onRemove: () => {
        tags = tags.filter(t => t.id !== tag.id);
        renderTags();
      }
    });
    container.appendChild(tagEl);
  });
}

renderTags();
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create tag store
const tagStore = Ext.create('Ext.data.Store', {
  fields: ['id', 'text'],
  data: [
    { id: '1', text: 'Electronics' },
    { id: '2', text: 'Books' },
    { id: '3', text: 'Clothing' },
    { id: '4', text: 'Home & Garden' }
  ]
});

// Create container
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 8
  },
  renderTo: Ext.getBody()
});

// Render tags
tagStore.each(function(record) {
  container.add({
    xtype: 'polaristag',
    text: record.get('text'),
    removable: true,
    listeners: {
      remove: function() {
        tagStore.remove(record);
        container.remove(this);
      }
    }
  });
});`,

    typescript: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

interface TagData {
  id: string;
  text: string;
}

function RemovableTagsExample(): JSX.Element {
  const [tags, setTags] = useState<TagData[]>([
    { id: '1', text: 'Electronics' },
    { id: '2', text: 'Books' },
    { id: '3', text: 'Clothing' },
    { id: '4', text: 'Home & Garden' },
  ]);

  const handleRemove = (tagId: string): void => {
    setTags(prev => prev.filter(tag => tag.id !== tagId));
  };

  return (
    <InlineStack gap="200" wrap>
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onRemove={() => handleRemove(tag.id)}
          removable
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default RemovableTagsExample;`,
  },

  clickabletags: {
    react: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function ClickableTagsExample() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = [
    { id: 'all', text: 'All Products' },
    { id: 'active', text: 'Active' },
    { id: 'archived', text: 'Archived' },
    { id: 'draft', text: 'Draft' },
  ];

  return (
    <InlineStack gap="200">
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onClick={() => setSelectedTag(tag.id)}
          clickable
          tone={selectedTag === tag.id ? 'highlight' : 'base'}
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default ClickableTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// State
let selectedTag = null;

// Tags data
const tags = [
  { id: 'all', text: 'All Products' },
  { id: 'active', text: 'Active' },
  { id: 'archived', text: 'Archived' },
  { id: 'draft', text: 'Draft' }
];

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.gap = '8px';

// Render tags
tags.forEach(tag => {
  const tagEl = createTag({
    text: tag.text,
    clickable: true,
    tone: selectedTag === tag.id ? 'highlight' : 'base',
    onClick: () => {
      selectedTag = tag.id;
      console.log('Selected:', tag.text);
      // Re-render to update tones
      container.querySelectorAll('.polaris-tag').forEach(el => {
        el.classList.remove('polaris-tag--highlight');
      });
      tagEl.classList.add('polaris-tag--highlight');
    }
  });
  container.appendChild(tagEl);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// State
let selectedTag = null;

// Tags data
const tags = [
  { id: 'all', text: 'All Products' },
  { id: 'active', text: 'Active' },
  { id: 'archived', text: 'Archived' },
  { id: 'draft', text: 'Draft' }
];

// Create container
const container = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'hbox',
    align: 'middle',
    gap: 8
  },
  renderTo: Ext.getBody()
});

// Create tags
tags.forEach(tagData => {
  const tag = Ext.create('Cin7.component.PolarisTag', {
    text: tagData.text,
    clickable: true,
    tone: 'base',
    tagId: tagData.id,
    listeners: {
      click: function() {
        selectedTag = this.tagId;
        console.log('Selected:', this.text);
        // Update all tags
        container.items.each(function(item) {
          item.setTone(item.tagId === selectedTag ? 'highlight' : 'base');
        });
      }
    }
  });
  container.add(tag);
});`,

    typescript: `import { Tag, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

interface TagData {
  id: string;
  text: string;
}

type TagTone = 'base' | 'highlight';

function ClickableTagsExample(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags: TagData[] = [
    { id: 'all', text: 'All Products' },
    { id: 'active', text: 'Active' },
    { id: 'archived', text: 'Archived' },
    { id: 'draft', text: 'Draft' },
  ];

  const handleTagClick = (tagId: string): void => {
    setSelectedTag(tagId);
  };

  const getTagTone = (tagId: string): TagTone => {
    return selectedTag === tagId ? 'highlight' : 'base';
  };

  return (
    <InlineStack gap="200">
      {tags.map(tag => (
        <Tag
          key={tag.id}
          onClick={() => handleTagClick(tag.id)}
          clickable
          tone={getTagTone(tag.id)}
        >
          {tag.text}
        </Tag>
      ))}
    </InlineStack>
  );
}

export default ClickableTagsExample;`,
  },

  tagsizes: {
    react: `import { Tag, InlineStack, BlockStack } from '@shopify/polaris';
import React from 'react';

function TagSizesExample() {
  const sizes = [
    { size: 'small' as const, label: 'Small' },
    { size: 'medium' as const, label: 'Medium' },
    { size: 'large' as const, label: 'Large' },
  ];

  return (
    <BlockStack gap="400">
      {sizes.map(({ size, label}) => (
        <div key={size}>
          <h4>{label} Tags</h4>
          <InlineStack gap="300">
            <Tag size={size}>Default</Tag>
            <Tag size={size} tone="success">Success</Tag>
            <Tag size={size} tone="warning" removable onRemove={() => console.log('removed')}>
              Warning
            </Tag>
            <Tag size={size} tone="critical" clickable onClick={() => console.log('clicked')}>
              Critical
            </Tag>
          </InlineStack>
        </div>
      ))}
    </BlockStack>
  );
}

export default TagSizesExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

// Create container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '24px';

// Sizes to demonstrate
const sizes = [
  { size: 'small', label: 'Small' },
  { size: 'medium', label: 'Medium' },
  { size: 'large', label: 'Large' }
];

sizes.forEach(({ size, label }) => {
  const section = document.createElement('div');
  const heading = document.createElement('h4');
  heading.textContent = label + ' Tags';
  section.appendChild(heading);

  const tagContainer = document.createElement('div');
  tagContainer.style.display = 'flex';
  tagContainer.style.gap = '12px';
  tagContainer.style.marginTop = '8px';

  // Create tags in different tones
  ['Default', 'Success', 'Warning', 'Critical'].forEach((text, idx) => {
    const tones = ['base', 'success', 'warning', 'critical'];
    const tag = createTag({
      text,
      size,
      tone: tones[idx],
      removable: idx === 2,
      clickable: idx === 3,
      onRemove: idx === 2 ? () => console.log('removed') : undefined,
      onClick: idx === 3 ? () => console.log('clicked') : undefined
    });
    tagContainer.appendChild(tag);
  });

  section.appendChild(tagContainer);
  container.appendChild(section);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

// Create main container
const mainPanel = Ext.create('Ext.panel.Panel', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  renderTo: Ext.getBody()
});

// Sizes to demonstrate
const sizes = ['small', 'medium', 'large'];
const tones = ['base', 'success', 'warning', 'critical'];
const labels = ['Default', 'Success', 'Warning', 'Critical'];

sizes.forEach(size => {
  const sizePanel = Ext.create('Ext.panel.Panel', {
    title: size.charAt(0).toUpperCase() + size.slice(1) + ' Tags',
    layout: {
      type: 'hbox',
      align: 'middle',
      gap: 12
    },
    margin: '0 0 16 0',
    bodyPadding: 10
  });

  labels.forEach((label, idx) => {
    sizePanel.add({
      xtype: 'polaristag',
      text: label,
      size: size,
      tone: tones[idx],
      removable: idx === 2,
      clickable: idx === 3,
      listeners: {
        remove: () => console.log('removed'),
        click: () => console.log('clicked')
      }
    });
  });

  mainPanel.add(sizePanel);
});`,

    typescript: `import { Tag, InlineStack, BlockStack } from '@shopify/polaris';
import React from 'react';

type TagSize = 'small' | 'medium' | 'large';

interface SizeConfig {
  size: TagSize;
  label: string;
}

function TagSizesExample(): JSX.Element {
  const sizes: SizeConfig[] = [
    { size: 'small', label: 'Small' },
    { size: 'medium', label: 'Medium' },
    { size: 'large', label: 'Large' },
  ];

  return (
    <BlockStack gap="400">
      {sizes.map(({ size, label }) => (
        <div key={size}>
          <h4>{label} Tags</h4>
          <InlineStack gap="300">
            <Tag size={size}>Default</Tag>
            <Tag size={size} tone="success">Success</Tag>
            <Tag size={size} tone="warning" removable onRemove={() => console.log('removed')}>
              Warning
            </Tag>
            <Tag size={size} tone="critical" clickable onClick={() => console.log('clicked')}>
              Critical
            </Tag>
          </InlineStack>
        </div>
      ))}
    </BlockStack>
  );
}

export default TagSizesExample;`,
  },

  statustags: {
    react: `import { Tag, BlockStack } from '@shopify/polaris';
import React from 'react';

function StatusTagsExample() {
  const orderStatuses = [
    { status: 'pending', label: 'Pending', tone: 'warning' as const },
    { status: 'processing', label: 'Processing', tone: 'info' as const },
    { status: 'shipped', label: 'Shipped', tone: 'success' as const },
    { status: 'delivered', label: 'Delivered', tone: 'base' as const },
    { status: 'cancelled', label: 'Cancelled', tone: 'critical' as const },
    { status: 'refunded', label: 'Refunded', tone: 'highlight' as const },
  ];

  return (
    <BlockStack gap="200">
      {orderStatuses.map(({ status, label, tone }) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '120px' }}>
            <p>{status}</p>
          </div>
          <Tag tone={tone}>{label}</Tag>
          <Tag tone={tone} removable onRemove={() => console.log(\`Removed \${status}\`)}>
            {label} (removable)
          </Tag>
        </div>
      ))}
    </BlockStack>
  );
}

export default StatusTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

const orderStatuses = [
  { status: 'pending', label: 'Pending', tone: 'warning' },
  { status: 'processing', label: 'Processing', tone: 'info' },
  { status: 'shipped', label: 'Shipped', tone: 'success' },
  { status: 'delivered', label: 'Delivered', tone: 'base' },
  { status: 'cancelled', label: 'Cancelled', tone: 'critical' },
  { status: 'refunded', label: 'Refunded', tone: 'highlight' }
];

const container = document.createElement('div');
container.style.cssText = 'display: flex; flex-direction: column; gap: 8px;';

orderStatuses.forEach(({ status, label, tone }) => {
  const row = document.createElement('div');
  row.style.cssText = 'display: flex; align-items: center; gap: 12px;';

  const statusLabel = document.createElement('div');
  statusLabel.style.width = '120px';
  statusLabel.textContent = status;
  row.appendChild(statusLabel);

  row.appendChild(createTag({ text: label, tone }));
  row.appendChild(createTag({
    text: label + ' (removable)',
    tone,
    removable: true,
    onRemove: () => console.log(\`Removed \${status}\`)
  }));

  container.appendChild(row);
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

const orderStatuses = [
  { status: 'pending', label: 'Pending', tone: 'warning' },
  { status: 'processing', label: 'Processing', tone: 'info' },
  { status: 'shipped', label: 'Shipped', tone: 'success' },
  { status: 'delivered', label: 'Delivered', tone: 'base' },
  { status: 'cancelled', label: 'Cancelled', tone: 'critical' },
  { status: 'refunded', label: 'Refunded', tone: 'highlight' }
];

const container = Ext.create('Ext.panel.Panel', {
  layout: { type: 'vbox', align: 'stretch' },
  bodyPadding: 10,
  renderTo: Ext.getBody()
});

orderStatuses.forEach(({ status, label, tone }) => {
  container.add(Ext.create('Ext.panel.Panel', {
    layout: { type: 'hbox', align: 'middle', gap: 12 },
    border: false,
    items: [
      { xtype: 'component', html: status, width: 120 },
      { xtype: 'polaristag', text: label, tone },
      { xtype: 'polaristag', text: label + ' (removable)', tone, removable: true }
    ]
  }));
});`,

    typescript: `import { Tag, BlockStack } from '@shopify/polaris';
import React from 'react';

type TagTone = 'base' | 'success' | 'warning' | 'critical' | 'info' | 'highlight';

interface OrderStatus {
  status: string;
  label: string;
  tone: TagTone;
}

function StatusTagsExample(): JSX.Element {
  const orderStatuses: OrderStatus[] = [
    { status: 'pending', label: 'Pending', tone: 'warning' },
    { status: 'processing', label: 'Processing', tone: 'info' },
    { status: 'shipped', label: 'Shipped', tone: 'success' },
    { status: 'delivered', label: 'Delivered', tone: 'base' },
    { status: 'cancelled', label: 'Cancelled', tone: 'critical' },
    { status: 'refunded', label: 'Refunded', tone: 'highlight' },
  ];

  return (
    <BlockStack gap="200">
      {orderStatuses.map(({ status, label, tone }) => (
        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '120px' }}>
            <p>{status}</p>
          </div>
          <Tag tone={tone}>{label}</Tag>
          <Tag tone={tone} removable onRemove={() => console.log(\`Removed \${status}\`)}>
            {label} (removable)
          </Tag>
        </div>
      ))}
    </BlockStack>
  );
}

export default StatusTagsExample;`,
  },

  taginputsystem: {
    react: `import { Tag } from '@shopify/polaris';
import React, { useState } from 'react';

function TagInputSystemExample() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  return (
    <div>
      {tags.map(tag => (
        <Tag key={tag} removable tone="info" onRemove={() => setTags(tags.filter(t => t !== tag))}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}

export default TagInputSystemExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

let tags = ['React', 'TypeScript'];
const container = document.createElement('div');

function render() {
  container.innerHTML = '';
  tags.forEach(tag => {
    container.appendChild(createTag({
      text: tag,
      tone: 'info',
      removable: true,
      onRemove: () => {
        tags = tags.filter(t => t !== tag);
        render();
      }
    }));
  });
}

render();
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  layout: 'hbox',
  renderTo: Ext.getBody()
});

['React', 'TypeScript'].forEach(tag => {
  panel.add({
    xtype: 'polaristag',
    text: tag,
    tone: 'info',
    removable: true
  });
});`,

    typescript: `import { Tag } from '@shopify/polaris';
import React, { useState } from 'react';

function TagInputSystemExample(): JSX.Element {
  const [tags, setTags] = useState<string[]>(['React', 'TypeScript']);

  return (
    <div>
      {tags.map(tag => (
        <Tag key={tag} removable tone="info" onRemove={() => setTags(tags.filter(t => t !== tag))}>
          {tag}
        </Tag>
      ))}
    </div>
  );
}

export default TagInputSystemExample;`,
  },

  filtertags: {
    react: `import { Tag } from '@shopify/polaris';
import React, { useState } from 'react';

function FilterTagsExample() {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filters = ['Electronics', 'Clothing', 'Home'];

  return (
    <div>
      {filters.map(filter => (
        <Tag
          key={filter}
          clickable
          tone={activeFilters.includes(filter) ? 'highlight' : 'base'}
          onClick={() => setActiveFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
          )}
        >
          {filter}
        </Tag>
      ))}
    </div>
  );
}

export default FilterTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

let activeFilters = [];
const filters = ['Electronics', 'Clothing', 'Home'];
const container = document.createElement('div');

filters.forEach(filter => {
  container.appendChild(createTag({
    text: filter,
    clickable: true,
    tone: 'base',
    onClick: () => console.log(filter)
  }));
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  layout: 'hbox',
  renderTo: Ext.getBody()
});

['Electronics', 'Clothing', 'Home'].forEach(filter => {
  panel.add({
    xtype: 'polaristag',
    text: filter,
    clickable: true
  });
});`,

    typescript: `import { Tag } from '@shopify/polaris';
import React, { useState } from 'react';

function FilterTagsExample(): JSX.Element {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filters: string[] = ['Electronics', 'Clothing', 'Home'];

  return (
    <div>
      {filters.map(filter => (
        <Tag
          key={filter}
          clickable
          tone={activeFilters.includes(filter) ? 'highlight' : 'base'}
          onClick={() => setActiveFilters(prev =>
            prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
          )}
        >
          {filter}
        </Tag>
      ))}
    </div>
  );
}

export default FilterTagsExample;`,
  },

  interactivetagcloud: {
    react: `import { Tag } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractiveTagCloudExample() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ['Design', 'Development', 'Marketing'];

  return (
    <div>
      {tags.map(tag => (
        <Tag
          key={tag}
          clickable
          tone={selectedTags.includes(tag) ? 'highlight' : 'base'}
          onClick={() => setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
          )}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}

export default InteractiveTagCloudExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

const tags = ['Design', 'Development', 'Marketing'];
const container = document.createElement('div');

tags.forEach(tag => {
  container.appendChild(createTag({
    text: tag,
    clickable: true
  }));
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  layout: 'hbox',
  renderTo: Ext.getBody()
});

['Design', 'Development', 'Marketing'].forEach(tag => {
  panel.add({
    xtype: 'polaristag',
    text: tag,
    clickable: true
  });
});`,

    typescript: `import { Tag } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractiveTagCloudExample(): JSX.Element {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags: string[] = ['Design', 'Development', 'Marketing'];

  return (
    <div>
      {tags.map(tag => (
        <Tag
          key={tag}
          clickable
          tone={selectedTags.includes(tag) ? 'highlight' : 'base'}
          onClick={() => setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
          )}
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}

export default InteractiveTagCloudExample;`,
  },

  taggroups: {
    react: `import { Tag } from '@shopify/polaris';
import React from 'react';

function TagGroupsExample() {
  return (
    <div>
      <h3>Priority</h3>
      <Tag tone="critical">Urgent</Tag>
      <Tag tone="warning">High</Tag>
      <Tag tone="info">Medium</Tag>
    </div>
  );
}

export default TagGroupsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

const container = document.createElement('div');
['Urgent', 'High', 'Medium'].forEach((text, i) => {
  const tones = ['critical', 'warning', 'info'];
  container.appendChild(createTag({ text, tone: tones[i] }));
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  layout: 'hbox',
  renderTo: Ext.getBody()
});

[['Urgent', 'critical'], ['High', 'warning'], ['Medium', 'info']].forEach(([text, tone]) => {
  panel.add({ xtype: 'polaristag', text, tone });
});`,

    typescript: `import { Tag } from '@shopify/polaris';
import React from 'react';

function TagGroupsExample(): JSX.Element {
  return (
    <div>
      <h3>Priority</h3>
      <Tag tone="critical">Urgent</Tag>
      <Tag tone="warning">High</Tag>
      <Tag tone="info">Medium</Tag>
    </div>
  );
}

export default TagGroupsExample;`,
  },

  disabledtags: {
    react: `import { Tag } from '@shopify/polaris';
import React from 'react';

function DisabledTagsExample() {
  return (
    <div>
      <Tag disabled>Disabled Tag</Tag>
      <Tag disabled tone="success">Disabled Success</Tag>
      <Tag disabled clickable>Disabled Clickable</Tag>
    </div>
  );
}

export default DisabledTagsExample;`,

    vanilla: `import { createTag } from '@cin7/vanilla-js';

const container = document.createElement('div');
['Disabled Tag', 'Disabled Success', 'Disabled Clickable'].forEach((text, i) => {
  container.appendChild(createTag({
    text,
    disabled: true,
    tone: i === 1 ? 'success' : 'base',
    clickable: i === 2
  }));
});

document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisTag } from '@cin7/extjs-adapters';

const panel = Ext.create('Ext.panel.Panel', {
  layout: 'hbox',
  renderTo: Ext.getBody()
});

panel.add({ xtype: 'polaristag', text: 'Disabled Tag', disabled: true });
panel.add({ xtype: 'polaristag', text: 'Disabled Success', tone: 'success', disabled: true });`,

    typescript: `import { Tag } from '@shopify/polaris';
import React from 'react';

function DisabledTagsExample(): JSX.Element {
  return (
    <div>
      <Tag disabled>Disabled Tag</Tag>
      <Tag disabled tone="success">Disabled Success</Tag>
      <Tag disabled clickable>Disabled Clickable</Tag>
    </div>
  );
}

export default DisabledTagsExample;`,
  },
};


// Select Component Examples

export const avatarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Avatar } from '@shopify/polaris';
import React from 'react';

function AvatarExample() {
  return <Avatar name="John Doe" size="medium" />;
}

export default AvatarExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-avatar polaris-avatar--medium">
  <span class="polaris-avatar__initials">JD</span>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar } from '@cin7/vanilla-js';

const avatar = createAvatar({
  name: 'John Doe',
  size: 'medium',
  generateInitials: (name) => {
    return name.split(' ').map(n => n[0]).join('');
  }
});

document.getElementById('user-profile').appendChild(avatar);
</script>`,

    extjs: `// ExtJS Avatar using @cin7/extjs-adapters
Ext.create('Ext.Component', {
  cls: 'polaris-avatar',
  html: '<span class="polaris-avatar__initials">JD</span>',
  width: 40,
  height: 40,
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisAvatar } from '@cin7/extjs-adapters';

const avatar = Ext.create('PolarisAvatar', {
  name: 'John Doe',
  size: 'medium',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar } from '@shopify/polaris';
import React from 'react';

interface AvatarExampleProps {
  name: string;
  size?: 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
  source?: string;
  initials?: string;
  customer?: boolean;
}

function AvatarExample({
  name,
  size = 'medium',
  source,
  initials,
  customer = false
}: AvatarExampleProps): JSX.Element {
  return (
    <Avatar
      name={name}
      size={size}
      source={source}
      initials={initials}
      customer={customer}
    />
  );
}

export default AvatarExample;`,
  },

  sizes: {
    react: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

function AvatarSizesExample() {
  const sizes: Array<'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge'> = [
    'extraSmall', 'small', 'medium', 'large', 'extraLarge'
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {sizes.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Avatar size={size} name="John Doe" />
          <Text variant="bodySm" color="subdued">{size}</Text>
        </div>
      ))}
    </div>
  );
}

export default AvatarSizesExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="avatar-sizes-container" style="display: flex; align-items: center; gap: 16px;">
  <div class="avatar-item">
    <div class="polaris-avatar polaris-avatar--extra-small">
      <span class="polaris-avatar__initials">JD</span>
    </div>
    <span class="avatar-label">Extra Small</span>
  </div>
  <div class="avatar-item">
    <div class="polaris-avatar polaris-avatar--small">
      <span class="polaris-avatar__initials">JD</span>
    </div>
    <span class="avatar-label">Small</span>
  </div>
  <div class="avatar-item">
    <div class="polaris-avatar polaris-avatar--medium">
      <span class="polaris-avatar__initials">JD</span>
    </div>
    <span class="avatar-label">Medium</span>
  </div>
  <div class="avatar-item">
    <div class="polaris-avatar polaris-avatar--large">
      <span class="polaris-avatar__initials">JD</span>
    </div>
    <span class="avatar-label">Large</span>
  </div>
  <div class="avatar-item">
    <div class="polaris-avatar polaris-avatar--extra-large">
      <span class="polaris-avatar__initials">JD</span>
    </div>
    <span class="avatar-label">Extra Large</span>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar } from '@cin7/vanilla-js';

const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];
const container = document.getElementById('avatar-sizes');

sizes.forEach(size => {
  const wrapper = document.createElement('div');
  wrapper.className = 'avatar-item';

  const avatar = createAvatar({
    name: 'John Doe',
    size: size
  });

  const label = document.createElement('span');
  label.textContent = size;
  label.className = 'avatar-label';

  wrapper.appendChild(avatar);
  wrapper.appendChild(label);
  container.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS Avatar Sizes using @cin7/extjs-adapters
import { PolarisAvatar } from '@cin7/extjs-adapters';

const sizes = ['extraSmall', 'small', 'medium', 'large', 'extraLarge'];
const avatarItems = [];

sizes.forEach(size => {
  avatarItems.push({
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'center'
    },
    items: [
      Ext.create('PolarisAvatar', {
        name: 'John Doe',
        size: size
      }),
      {
        xtype: 'label',
        text: size,
        style: {
          fontSize: '12px',
          color: '#637381',
          marginTop: '8px'
        }
      }
    ]
  });
});

Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle',
    pack: 'start'
  },
  defaults: {
    margin: '0 16 0 0'
  },
  items: avatarItems,
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

type AvatarSize = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';

interface AvatarSizeItem {
  size: AvatarSize;
  label: string;
}

function AvatarSizesExample(): JSX.Element {
  const sizes: AvatarSizeItem[] = [
    { size: 'extraSmall', label: 'Extra Small' },
    { size: 'small', label: 'Small' },
    { size: 'medium', label: 'Medium' },
    { size: 'large', label: 'Large' },
    { size: 'extraLarge', label: 'Extra Large' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {sizes.map(({ size, label }) => (
        <div
          key={size}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Avatar size={size} name="John Doe" />
          <Text variant="bodySm" color="subdued">{label}</Text>
        </div>
      ))}
    </div>
  );
}

export default AvatarSizesExample;`,
  },

  withImages: {
    react: `import { Avatar, Text, Card } from '@shopify/polaris';
import React from 'react';

function AvatarWithImageExample() {
  return (
    <Card padding="400">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Avatar
          size="large"
          source="https://picsum.photos/seed/user1/100/100.jpg"
          name="John Doe"
        />
        <div>
          <Text variant="headingMd" as="h3">John Doe</Text>
          <Text color="subdued">john.doe@example.com</Text>
        </div>
      </div>
    </Card>
  );
}

export default AvatarWithImageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-card" style="padding: 16px;">
  <div class="user-profile" style="display: flex; align-items: center; gap: 24px;">
    <div class="polaris-avatar polaris-avatar--large">
      <img src="https://picsum.photos/seed/user1/100/100.jpg" alt="John Doe" class="polaris-avatar__image" />
    </div>
    <div class="user-info">
      <h3 class="user-name">John Doe</h3>
      <p class="user-email" style="color: #637381;">john.doe@example.com</p>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar, $ } from '@cin7/vanilla-js';

const userProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://picsum.photos/seed/user1/100/100.jpg'
};

const avatar = createAvatar({
  name: userProfile.name,
  size: 'large',
  source: userProfile.avatar
});

const container = $('.user-profile');
container.appendChild(avatar);

// Add user info
const userInfo = document.createElement('div');
userInfo.className = 'user-info';
userInfo.innerHTML = \`
  <h3>\${userProfile.name}</h3>
  <p style="color: #637381;">\${userProfile.email}</p>
\`;
container.appendChild(userInfo);
</script>`,

    extjs: `// ExtJS Avatar with Image using @cin7/extjs-adapters
import { PolarisAvatar } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  cls: 'polaris-card',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  items: [
    Ext.create('PolarisAvatar', {
      name: 'John Doe',
      size: 'large',
      source: 'https://picsum.photos/seed/user1/100/100.jpg',
      margin: '0 24 0 0'
    }),
    {
      xtype: 'container',
      layout: 'vbox',
      items: [
        {
          xtype: 'label',
          text: 'John Doe',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: '4px'
          }
        },
        {
          xtype: 'label',
          text: 'john.doe@example.com',
          style: {
            fontSize: '14px',
            color: '#637381'
          }
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar, Text, Card } from '@shopify/polaris';
import React from 'react';

interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

interface AvatarWithImageProps {
  user: UserProfile;
}

function AvatarWithImageExample({ user }: AvatarWithImageProps): JSX.Element {
  return (
    <Card padding="400">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Avatar
          size="large"
          source={user.avatarUrl}
          name={user.name}
        />
        <div>
          <Text variant="headingMd" as="h3">{user.name}</Text>
          <Text color="subdued">{user.email}</Text>
        </div>
      </div>
    </Card>
  );
}

// Usage
const defaultUser: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatarUrl: 'https://picsum.photos/seed/user1/100/100.jpg'
};

export default function Example() {
  return <AvatarWithImageExample user={defaultUser} />;
}`
  },

  customerAvatars: {
    react: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

function CustomerAvatarsExample() {
  const customers = [
    { name: 'John Smith', type: 'Premium Customer' },
    { name: 'Jane Johnson', type: 'New Customer' },
    { name: 'Bob Williams', type: 'Regular Customer' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {customers.map((customer) => (
        <div key={customer.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Avatar customer size="medium" name={customer.name} />
          <div>
            <Text variant="bodyMd" fontWeight="medium">{customer.name}</Text>
            <Text color="subdued">{customer.type}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerAvatarsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="customer-list" style="display: flex; flex-direction: column; gap: 24px;">
  <div class="customer-item" style="display: flex; align-items: center; gap: 16px;">
    <div class="polaris-avatar polaris-avatar--customer polaris-avatar--medium">
      <span class="polaris-avatar__initials">JS</span>
    </div>
    <div class="customer-info">
      <div class="customer-name" style="font-weight: 500;">John Smith</div>
      <div class="customer-type" style="color: #637381;">Premium Customer</div>
    </div>
  </div>
  <div class="customer-item" style="display: flex; align-items: center; gap: 16px;">
    <div class="polaris-avatar polaris-avatar--customer polaris-avatar--medium">
      <span class="polaris-avatar__initials">JJ</span>
    </div>
    <div class="customer-info">
      <div class="customer-name" style="font-weight: 500;">Jane Johnson</div>
      <div class="customer-type" style="color: #637381;">New Customer</div>
    </div>
  </div>
  <div class="customer-item" style="display: flex; align-items: center; gap: 16px;">
    <div class="polaris-avatar polaris-avatar--customer polaris-avatar--medium">
      <span class="polaris-avatar__initials">BW</span>
    </div>
    <div class="customer-info">
      <div class="customer-name" style="font-weight: 500;">Bob Williams</div>
      <div class="customer-type" style="color: #637381;">Regular Customer</div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar } from '@cin7/vanilla-js';

const customers = [
  { name: 'John Smith', type: 'Premium Customer' },
  { name: 'Jane Johnson', type: 'New Customer' },
  { name: 'Bob Williams', type: 'Regular Customer' }
];

const container = document.getElementById('customer-list');

customers.forEach(customer => {
  const item = document.createElement('div');
  item.className = 'customer-item';
  item.style.cssText = 'display: flex; align-items: center; gap: 16px;';

  const avatar = createAvatar({
    name: customer.name,
    size: 'medium',
    customer: true
  });

  const info = document.createElement('div');
  info.innerHTML = \`
    <div style="font-weight: 500;">\${customer.name}</div>
    <div style="color: #637381;">\${customer.type}</div>
  \`;

  item.appendChild(avatar);
  item.appendChild(info);
  container.appendChild(item);
});
</script>`,

    extjs: `// ExtJS Customer Avatars using @cin7/extjs-adapters
import { PolarisAvatar } from '@cin7/extjs-adapters';

const customers = [
  { name: 'John Smith', type: 'Premium Customer' },
  { name: 'Jane Johnson', type: 'New Customer' },
  { name: 'Bob Williams', type: 'Regular Customer' }
];

const customerItems = customers.map(customer => ({
  xtype: 'container',
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  margin: '0 0 24 0',
  items: [
    Ext.create('PolarisAvatar', {
      name: customer.name,
      size: 'medium',
      customer: true,
      margin: '0 16 0 0'
    }),
    {
      xtype: 'container',
      layout: 'vbox',
      items: [
        {
          xtype: 'label',
          text: customer.name,
          style: {
            fontWeight: '500',
            marginBottom: '4px'
          }
        },
        {
          xtype: 'label',
          text: customer.type,
          style: {
            color: '#637381'
          }
        }
      ]
    }
  ]
}));

Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: customerItems,
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

interface Customer {
  name: string;
  type: string;
}

interface CustomerAvatarsProps {
  customers: Customer[];
}

function CustomerAvatarsExample({ customers }: CustomerAvatarsProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {customers.map((customer) => (
        <div
          key={customer.name}
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <Avatar customer size="medium" name={customer.name} />
          <div>
            <Text variant="bodyMd" fontWeight="medium">{customer.name}</Text>
            <Text color="subdued">{customer.type}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

// Usage
const defaultCustomers: Customer[] = [
  { name: 'John Smith', type: 'Premium Customer' },
  { name: 'Jane Johnson', type: 'New Customer' },
  { name: 'Bob Williams', type: 'Regular Customer' }
];

export default function Example() {
  return <CustomerAvatarsExample customers={defaultCustomers} />;
}`
  },

  initials: {
    react: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

function AvatarInitialsExample() {
  const names = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Williams',
    'Charlie Brown',
    'Diana Prince',
  ];

  const customInitials = [
    { initials: 'JD', label: 'JD' },
    { initials: 'ABC', label: 'ABC' },
    { initials: '1', label: 'Number 1' },
    { initials: '😊', label: 'Emoji' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="headingMd" as="h3">Initials from Names</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {names.map((name) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="large" name={name} />
            <Text variant="bodySm" as="p">{name}</Text>
          </div>
        ))}
      </div>

      <Text variant="headingMd" as="h3" style={{ marginTop: '24px' }}>Custom Initials</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {customInitials.map((item) => (
          <div key={item.initials} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="large" initials={item.initials} />
            <Text variant="bodySm" as="p">{item.label}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvatarInitialsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="avatar-initials-container">
  <h3>Initials from Names</h3>
  <div class="avatar-grid" style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div class="avatar-item" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="polaris-avatar polaris-avatar--large">
        <span class="polaris-avatar__initials">JD</span>
      </div>
      <span class="avatar-label">John Doe</span>
    </div>
    <div class="avatar-item" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="polaris-avatar polaris-avatar--large">
        <span class="polaris-avatar__initials">JS</span>
      </div>
      <span class="avatar-label">Jane Smith</span>
    </div>
    <div class="avatar-item" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="polaris-avatar polaris-avatar--large">
        <span class="polaris-avatar__initials">AJ</span>
      </div>
      <span class="avatar-label">Alice Johnson</span>
    </div>
  </div>

  <h3 style="margin-top: 24px;">Custom Initials</h3>
  <div class="avatar-grid" style="display: flex; flex-wrap: wrap; gap: 16px;">
    <div class="avatar-item" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="polaris-avatar polaris-avatar--large">
        <span class="polaris-avatar__initials">JD</span>
      </div>
      <span class="avatar-label">JD</span>
    </div>
    <div class="avatar-item" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="polaris-avatar polaris-avatar--large">
        <span class="polaris-avatar__initials">ABC</span>
      </div>
      <span class="avatar-label">ABC</span>
    </div>
    <div class="avatar-item" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <div class="polaris-avatar polaris-avatar--large">
        <span class="polaris-avatar__initials">1</span>
      </div>
      <span class="avatar-label">Number 1</span>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar } from '@cin7/vanilla-js';

// Helper to generate initials from name
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams'];
const customInitials = [
  { initials: 'JD', label: 'JD' },
  { initials: 'ABC', label: 'ABC' },
  { initials: '1', label: 'Number 1' }
];

// Create avatars from names
const namesContainer = document.getElementById('names-grid');
names.forEach(name => {
  const wrapper = document.createElement('div');
  wrapper.className = 'avatar-item';

  const avatar = createAvatar({
    name: name,
    size: 'large'
  });

  const label = document.createElement('span');
  label.textContent = name;

  wrapper.appendChild(avatar);
  wrapper.appendChild(label);
  namesContainer.appendChild(wrapper);
});

// Create avatars with custom initials
const initialsContainer = document.getElementById('initials-grid');
customInitials.forEach(item => {
  const wrapper = document.createElement('div');
  wrapper.className = 'avatar-item';

  const avatar = createAvatar({
    initials: item.initials,
    size: 'large'
  });

  const label = document.createElement('span');
  label.textContent = item.label;

  wrapper.appendChild(avatar);
  wrapper.appendChild(label);
  initialsContainer.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS Avatar Initials using @cin7/extjs-adapters
import { PolarisAvatar } from '@cin7/extjs-adapters';

// Helper to generate initials from name
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams'];
const customInitials = [
  { initials: 'JD', label: 'JD' },
  { initials: 'ABC', label: 'ABC' },
  { initials: '1', label: 'Number 1' }
];

// Create avatar items from names
const nameAvatars = names.map(name => ({
  xtype: 'container',
  layout: {
    type: 'vbox',
    align: 'center'
  },
  margin: '0 16 0 0',
  items: [
    Ext.create('PolarisAvatar', {
      name: name,
      size: 'large'
    }),
    {
      xtype: 'label',
      text: name,
      style: {
        marginTop: '8px',
        fontSize: '12px'
      }
    }
  ]
}));

// Create avatar items with custom initials
const initialsAvatars = customInitials.map(item => ({
  xtype: 'container',
  layout: {
    type: 'vbox',
    align: 'center'
  },
  margin: '0 16 0 0',
  items: [
    Ext.create('PolarisAvatar', {
      initials: item.initials,
      size: 'large'
    }),
    {
      xtype: 'label',
      text: item.label,
      style: {
        marginTop: '8px',
        fontSize: '12px'
      }
    }
  ]
}));

Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: [
    {
      xtype: 'label',
      text: 'Initials from Names',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }
    },
    {
      xtype: 'container',
      layout: 'hbox',
      items: nameAvatars
    },
    {
      xtype: 'label',
      text: 'Custom Initials',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '24px',
        marginBottom: '16px'
      }
    },
    {
      xtype: 'container',
      layout: 'hbox',
      items: initialsAvatars
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

interface AvatarItem {
  id: string;
  name?: string;
  initials?: string;
  label: string;
}

interface AvatarInitialsProps {
  names?: string[];
  customInitials?: Array<{ initials: string; label: string }>;
}

function AvatarInitialsExample({
  names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Williams'],
  customInitials = [
    { initials: 'JD', label: 'JD' },
    { initials: 'ABC', label: 'ABC' },
    { initials: '1', label: 'Number 1' }
  ]
}: AvatarInitialsProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="headingMd" as="h3">Initials from Names</Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {names.map((name) => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Avatar size="large" name={name} />
            <Text variant="bodySm" as="p">{name}</Text>
          </div>
        ))}
      </div>

      <Text variant="headingMd" as="h3" style={{ marginTop: '24px' }}>
        Custom Initials
      </Text>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {customInitials.map((item) => (
          <div
            key={item.initials}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Avatar size="large" initials={item.initials} />
            <Text variant="bodySm" as="p">{item.label}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvatarInitialsExample;`,
  },

  userStatus: {
    react: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

type UserStatus = 'online' | 'away' | 'offline' | 'busy';

interface User {
  name: string;
  status: UserStatus;
  lastSeen: string;
  avatarUrl: string;
}

function UserStatusExample() {
  const users: User[] = [
    { name: 'John Doe', status: 'online', lastSeen: 'Active now', avatarUrl: 'https://picsum.photos/seed/john/100/100.jpg' },
    { name: 'Jane Smith', status: 'away', lastSeen: 'Away from desk', avatarUrl: 'https://picsum.photos/seed/jane/100/100.jpg' },
    { name: 'Bob Johnson', status: 'offline', lastSeen: 'Last seen 2 hours ago', avatarUrl: 'https://picsum.photos/seed/bob/100/100.jpg' },
    { name: 'Alice Wilson', status: 'busy', lastSeen: 'In a meeting', avatarUrl: 'https://picsum.photos/seed/alice/100/100.jpg' },
  ];

  const getStatusColor = (status: UserStatus): string => {
    const colors = {
      online: '#2a6f3a',
      away: '#e4930d',
      offline: '#637381',
      busy: '#d72c0d',
    };
    return colors[status];
  };

  const StatusIndicator = ({ status }: { status: UserStatus }) => (
    <div
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: getStatusColor(status),
        border: '2px solid white',
        position: 'absolute',
        bottom: '0',
        right: '0',
      }}
    />
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="headingMd" as="h3">User Status Indicators</Text>
      {users.map((user) => (
        <div key={user.name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Avatar
              size="large"
              source={user.avatarUrl}
              name={user.name}
            />
            <StatusIndicator status={user.status} />
          </div>
          <div>
            <Text variant="bodyMd" fontWeight="medium">{user.name}</Text>
            <Text color="subdued" variant="bodySm">{user.lastSeen}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserStatusExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="user-status-list">
  <h3>User Status Indicators</h3>

  <div class="user-item" style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
    <div class="avatar-wrapper" style="position: relative;">
      <div class="polaris-avatar polaris-avatar--large">
        <img src="https://picsum.photos/seed/john/100/100.jpg" alt="John Doe" class="polaris-avatar__image" />
      </div>
      <div class="status-indicator status-online" style="
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #2a6f3a;
        border: 2px solid white;
        position: absolute;
        bottom: 0;
        right: 0;
      "></div>
    </div>
    <div class="user-info">
      <div style="font-weight: 500;">John Doe</div>
      <div style="color: #637381; font-size: 12px;">Active now</div>
    </div>
  </div>

  <div class="user-item" style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
    <div class="avatar-wrapper" style="position: relative;">
      <div class="polaris-avatar polaris-avatar--large">
        <img src="https://picsum.photos/seed/jane/100/100.jpg" alt="Jane Smith" class="polaris-avatar__image" />
      </div>
      <div class="status-indicator status-away" style="
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #e4930d;
        border: 2px solid white;
        position: absolute;
        bottom: 0;
        right: 0;
      "></div>
    </div>
    <div class="user-info">
      <div style="font-weight: 500;">Jane Smith</div>
      <div style="color: #637381; font-size: 12px;">Away from desk</div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createAvatar, $ } from '@cin7/vanilla-js';

const statusColors = {
  online: '#2a6f3a',
  away: '#e4930d',
  offline: '#637381',
  busy: '#d72c0d'
};

function createStatusIndicator(status) {
  const indicator = document.createElement('div');
  indicator.className = \`status-indicator status-\${status}\`;
  indicator.style.cssText = \`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: \${statusColors[status]};
    border: 2px solid white;
    position: absolute;
    bottom: 0;
    right: 0;
  \`;
  return indicator;
}

const users = [
  { name: 'John Doe', status: 'online', lastSeen: 'Active now', avatarUrl: 'https://picsum.photos/seed/john/100/100.jpg' },
  { name: 'Jane Smith', status: 'away', lastSeen: 'Away from desk', avatarUrl: 'https://picsum.photos/seed/jane/100/100.jpg' },
  { name: 'Bob Johnson', status: 'offline', lastSeen: 'Last seen 2 hours ago', avatarUrl: 'https://picsum.photos/seed/bob/100/100.jpg' }
];

const container = $('#user-status-list');

users.forEach(user => {
  const item = document.createElement('div');
  item.className = 'user-item';
  item.style.cssText = 'display: flex; align-items: center; gap: 16px; margin-bottom: 16px;';

  const avatarWrapper = document.createElement('div');
  avatarWrapper.style.position = 'relative';

  const avatar = createAvatar({
    name: user.name,
    size: 'large',
    source: user.avatarUrl
  });

  const statusIndicator = createStatusIndicator(user.status);

  avatarWrapper.appendChild(avatar);
  avatarWrapper.appendChild(statusIndicator);

  const userInfo = document.createElement('div');
  userInfo.innerHTML = \`
    <div style="font-weight: 500;">\${user.name}</div>
    <div style="color: #637381; font-size: 12px;">\${user.lastSeen}</div>
  \`;

  item.appendChild(avatarWrapper);
  item.appendChild(userInfo);
  container.appendChild(item);
});
</script>`,

    extjs: `// ExtJS User Status Avatars using @cin7/extjs-adapters
import { PolarisAvatar } from '@cin7/extjs-adapters';

const statusColors = {
  online: '#2a6f3a',
  away: '#e4930d',
  offline: '#637381',
  busy: '#d72c0d'
};

const users = [
  { name: 'John Doe', status: 'online', lastSeen: 'Active now', avatarUrl: 'https://picsum.photos/seed/john/100/100.jpg' },
  { name: 'Jane Smith', status: 'away', lastSeen: 'Away from desk', avatarUrl: 'https://picsum.photos/seed/jane/100/100.jpg' },
  { name: 'Bob Johnson', status: 'offline', lastSeen: 'Last seen 2 hours ago', avatarUrl: 'https://picsum.photos/seed/bob/100/100.jpg' },
  { name: 'Alice Wilson', status: 'busy', lastSeen: 'In a meeting', avatarUrl: 'https://picsum.photos/seed/alice/100/100.jpg' }
];

const userItems = users.map(user => ({
  xtype: 'container',
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  margin: '0 0 16 0',
  items: [
    {
      xtype: 'container',
      width: 60,
      height: 60,
      style: {
        position: 'relative'
      },
      html: \`
        <div class="avatar-container" style="position: relative;">
          <img src="\${user.avatarUrl}" alt="\${user.name}"
               style="width: 50px; height: 50px; border-radius: 50%;" />
          <div style="
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: \${statusColors[user.status]};
            border: 2px solid white;
            position: absolute;
            bottom: 0;
            right: 5px;
          "></div>
        </div>
      \`,
      margin: '0 16 0 0'
    },
    {
      xtype: 'container',
      layout: 'vbox',
      items: [
        {
          xtype: 'label',
          text: user.name,
          style: {
            fontWeight: '500',
            marginBottom: '4px'
          }
        },
        {
          xtype: 'label',
          text: user.lastSeen,
          style: {
            color: '#637381',
            fontSize: '12px'
          }
        }
      ]
    }
  ]
}));

Ext.create('Ext.container.Container', {
  layout: 'vbox',
  items: [
    {
      xtype: 'label',
      text: 'User Status Indicators',
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '16px'
      }
    },
    ...userItems
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Avatar, Text } from '@shopify/polaris';
import React from 'react';

type UserStatus = 'online' | 'away' | 'offline' | 'busy';

interface User {
  name: string;
  status: UserStatus;
  lastSeen: string;
  avatarUrl: string;
}

interface UserStatusProps {
  users: User[];
}

const statusColors: Record<UserStatus, string> = {
  online: '#2a6f3a',
  away: '#e4930d',
  offline: '#637381',
  busy: '#d72c0d',
};

const StatusIndicator: React.FC<{ status: UserStatus }> = ({ status }) => (
  <div
    style={{
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: statusColors[status],
      border: '2px solid white',
      position: 'absolute',
      bottom: '0',
      right: '0',
    }}
    aria-label={\`Status: \\\${status}\`}
  />
);

function UserStatusExample({ users }: UserStatusProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Text variant="headingMd" as="h3">User Status Indicators</Text>
      {users.map((user) => (
        <div
          key={user.name}
          style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
          <div style={{ position: 'relative' }}>
            <Avatar
              size="large"
              source={user.avatarUrl}
              name={user.name}
            />
            <StatusIndicator status={user.status} />
          </div>
          <div>
            <Text variant="bodyMd" fontWeight="medium">{user.name}</Text>
            <Text color="subdued" variant="bodySm">{user.lastSeen}</Text>
          </div>
        </div>
      ))}
    </div>
  );
}

// Usage
const defaultUsers: User[] = [
  { name: 'John Doe', status: 'online', lastSeen: 'Active now', avatarUrl: 'https://picsum.photos/seed/john/100/100.jpg' },
  { name: 'Jane Smith', status: 'away', lastSeen: 'Away from desk', avatarUrl: 'https://picsum.photos/seed/jane/100/100.jpg' },
  { name: 'Bob Johnson', status: 'offline', lastSeen: 'Last seen 2 hours ago', avatarUrl: 'https://picsum.photos/seed/bob/100/100.jpg' },
  { name: 'Alice Wilson', status: 'busy', lastSeen: 'In a meeting', avatarUrl: 'https://picsum.photos/seed/alice/100/100.jpg' }
];

export default function Example() {
  return <UserStatusExample users={defaultUsers} />;
}`
  }
};


// Icon Component Examples

export const iconExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import React from 'react';

function IconExample() {
  return <Icon source={SearchIcon} accessibilityLabel="Search" />;
}

export default IconExample;`,

    vanilla: `<!-- HTML Structure -->
<svg class="polaris-icon" viewBox="0 0 20 20" focusable="false" aria-label="Search">
  <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path>
</svg>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createIcon } from '@cin7/vanilla-js';

const icon = createIcon({
  name: 'search',
  accessibilityLabel: 'Search',
  size: 20
});

document.getElementById('icon-container').appendChild(icon);
</script>`,

    extjs: `// ExtJS Icon using icon fonts or iconCls
Ext.create('Ext.Component', {
  cls: 'polaris-icon',
  html: '<svg viewBox="0 0 20 20" focusable="false" aria-label="Search">' +
        '<path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path>' +
        '</svg>',
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisIcon } from '@cin7/extjs-adapters';

const icon = Ext.create('PolarisIcon', {
  iconName: 'search',
  accessibilityLabel: 'Search'
});`,

    typescript: `import { Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import React from 'react';

interface IconExampleProps {
  source: React.ComponentType;
  accessibilityLabel?: string;
  tone?: 'base' | 'subdued' | 'critical' | 'warning' | 'success' | 'info' | 'primary';
}

function IconExample({
  source,
  accessibilityLabel,
  tone = 'base'
}: IconExampleProps): JSX.Element {
  return (
    <Icon
      source={source}
      tone={tone}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

export default IconExample;`,
  }
};

// MediaCard Component Examples

export const dataTableExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DataTable } from '@shopify/polaris';
import React from 'react';

function DataTableExample() {
  const rows = [
    ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
    ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
    ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
  ];

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
      headings={['Order', 'Date', 'Total', 'Items', 'Status']}
      rows={rows}
    />
  );
}

export default DataTableExample;`,

    vanilla: `import { createDataTable, EventBus } from '@cin7/vanilla-js';

// Define table data
const tableData = {
  headings: ['Order', 'Date', 'Total', 'Items', 'Status'],
  rows: [
    ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
    ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
    ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
  ],
  columnTypes: ['text', 'text', 'numeric', 'text', 'text']
};

// Create and render data table
const dataTable = createDataTable(tableData);
document.getElementById('app').appendChild(dataTable);

// Listen for row click events
EventBus.on('datatable:row:click', (event) => {
  console.log('Row clicked:', event.detail.rowData);
});`,

    extjs: `import { PolarisDataTable } from '@cin7/extjs-adapters';

// Create DataTable using ExtJS adapter
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  items: [{
    xtype: 'polarisdatatable',
    headings: ['Order', 'Date', 'Total', 'Items', 'Status'],
    columnContentTypes: ['text', 'text', 'numeric', 'text', 'text'],
    rows: [
      ['#1020', 'Jul 20 at 3:46pm', '$42.00', '2 items', 'Fulfilled'],
      ['#1019', 'Jul 20 at 2:31pm', '$125.00', '5 items', 'Unfulfilled'],
      ['#1018', 'Jul 20 at 1:22pm', '$89.00', '3 items', 'Fulfilled'],
    ],
    listeners: {
      rowclick: function(table, rowIndex, rowData) {
        console.log('Row clicked:', rowData);
      }
    }
  }]
});`,

    typescript: `import { DataTable } from '@shopify/polaris';
import React from 'react';

interface OrderRow {
  order: string;
  date: string;
  total: string;
  items: string;
  status: string;
}

interface DataTableExampleProps {
  orders?: OrderRow[];
}

function DataTableExample({ orders }: DataTableExampleProps): JSX.Element {
  const defaultOrders: OrderRow[] = [
    { order: '#1020', date: 'Jul 20 at 3:46pm', total: '$42.00', items: '2 items', status: 'Fulfilled' },
    { order: '#1019', date: 'Jul 20 at 2:31pm', total: '$125.00', items: '5 items', status: 'Unfulfilled' },
    { order: '#1018', date: 'Jul 20 at 1:22pm', total: '$89.00', items: '3 items', status: 'Fulfilled' },
  ];

  const data = orders || defaultOrders;

  const rows = data.map(order => [
    order.order,
    order.date,
    order.total,
    order.items,
    order.status
  ]);

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
      headings={['Order', 'Date', 'Total', 'Items', 'Status']}
      rows={rows}
    />
  );
}

export default DataTableExample;`,
  }
};

// DescriptionList Component Examples

export const descriptionListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

function DescriptionListExample() {
  const items = [
    { term: 'Order number', description: '#1001' },
    { term: 'Date', description: 'July 21, 2023' },
    { term: 'Status', description: 'Fulfilled' },
    { term: 'Payment status', description: 'Paid' },
  ];

  return <DescriptionList items={items} />;
}

export default DescriptionListExample;`,

    vanilla: `import { createDescriptionList } from '@cin7/vanilla-js';

// Define description list items
const items = [
  { term: 'Order number', description: '#1001' },
  { term: 'Date', description: 'July 21, 2023' },
  { term: 'Status', description: 'Fulfilled' },
  { term: 'Payment status', description: 'Paid' },
];

// Create and render description list
const descriptionList = createDescriptionList({ items });
document.getElementById('app').appendChild(descriptionList);`,

    extjs: `import { PolarisDescriptionList } from '@cin7/extjs-adapters';

// Create DescriptionList using ExtJS adapter
Ext.create('Cin7.component.PolarisDescriptionList', {
  renderTo: Ext.getBody(),
  items: [
    { term: 'Order number', description: '#1001' },
    { term: 'Date', description: 'July 21, 2023' },
    { term: 'Status', description: 'Fulfilled' },
    { term: 'Payment status', description: 'Paid' },
  ]
});`,

    typescript: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

interface DescriptionItem {
  term: string;
  description: string | React.ReactNode;
}

interface DescriptionListExampleProps {
  items?: DescriptionItem[];
  spacing?: 'tight' | 'loose';
  columns?: 1 | 2 | 3;
}

function DescriptionListExample({
  items,
  spacing = 'base',
  columns
}: DescriptionListExampleProps): JSX.Element {
  const defaultItems: DescriptionItem[] = [
    { term: 'Order number', description: '#1001' },
    { term: 'Date', description: 'July 21, 2023' },
    { term: 'Status', description: 'Fulfilled' },
    { term: 'Payment status', description: 'Paid' },
  ];

  return (
    <DescriptionList
      items={items || defaultItems}
      spacing={spacing}
      columns={columns}
    />
  );
}

export default DescriptionListExample;`,
  }
,

  productDetails: {
    react: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

function ProductDetailsExample() {
  const items = [
    { term: 'SKU', description: 'TSHIRT-BLUE-M' },
    { term: 'Product Type', description: 'Apparel' },
    { term: 'Vendor', description: 'Fashion Brand Co.' },
    { term: 'Collection', description: 'Summer Collection 2023' },
    { term: 'Weight', description: '0.25 kg' },
    { term: 'Dimensions', description: '30cm × 20cm × 2cm' },
  ];

  return <DescriptionList items={items} />;
}

export default ProductDetailsExample;`,

    vanilla: `import { $ } from '@cin7/vanilla-js';

// Create description list element
const dl = document.createElement('dl');
dl.className = 'polaris-description-list';

// Product details data
const items = [
  { term: 'SKU', description: 'TSHIRT-BLUE-M' },
  { term: 'Product Type', description: 'Apparel' },
  { term: 'Vendor', description: 'Fashion Brand Co.' },
  { term: 'Collection', description: 'Summer Collection 2023' },
  { term: 'Weight', description: '0.25 kg' },
  { term: 'Dimensions', description: '30cm × 20cm × 2cm' },
];

// Build DOM structure
items.forEach(item => {
  const dt = document.createElement('dt');
  dt.className = 'polaris-description-list__term';
  dt.textContent = item.term;

  const dd = document.createElement('dd');
  dd.className = 'polaris-description-list__description';
  dd.textContent = item.description;

  dl.appendChild(dt);
  dl.appendChild(dd);
});

$('#app').appendChild(dl);`,

    extjs: `import { PolarisDescriptionList } from '@cin7/extjs-adapters';

// Product details configuration
const productData = {
  sku: 'TSHIRT-BLUE-M',
  type: 'Apparel',
  vendor: 'Fashion Brand Co.',
  collection: 'Summer Collection 2023',
  weight: '0.25 kg',
  dimensions: '30cm × 20cm × 2cm'
};

// Create product details panel
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Product Details',
  width: 400,
  bodyPadding: 10,
  items: [{
    xtype: 'component',
    html: \`
      <dl class="product-details">
        <dt>SKU</dt><dd>\${productData.sku}</dd>
        <dt>Product Type</dt><dd>\${productData.type}</dd>
        <dt>Vendor</dt><dd>\${productData.vendor}</dd>
        <dt>Collection</dt><dd>\${productData.collection}</dd>
        <dt>Weight</dt><dd>\${productData.weight}</dd>
        <dt>Dimensions</dt><dd>\${productData.dimensions}</dd>
      </dl>
    \`
  }]
});`,

    typescript: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

interface ProductDetails {
  sku: string;
  productType: string;
  vendor: string;
  collection: string;
  weight: string;
  dimensions: string;
}

interface ProductDetailsProps {
  product?: ProductDetails;
}

function ProductDetailsExample({ product }: ProductDetailsProps): JSX.Element {
  const defaultProduct: ProductDetails = {
    sku: 'TSHIRT-BLUE-M',
    productType: 'Apparel',
    vendor: 'Fashion Brand Co.',
    collection: 'Summer Collection 2023',
    weight: '0.25 kg',
    dimensions: '30cm × 20cm × 2cm',
  };

  const productData = product || defaultProduct;

  const items = [
    { term: 'SKU', description: productData.sku },
    { term: 'Product Type', description: productData.productType },
    { term: 'Vendor', description: productData.vendor },
    { term: 'Collection', description: productData.collection },
    { term: 'Weight', description: productData.weight },
    { term: 'Dimensions', description: productData.dimensions },
  ];

  return <DescriptionList items={items} />;
}

export default ProductDetailsExample;`,
  },

  customerInformation: {
    react: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

function CustomerInformationExample() {
  const items = [
    { term: 'Customer ID', description: 'CUST-2023-001' },
    { term: 'Email', description: 'john.smith@example.com' },
    { term: 'Phone', description: '+1 (555) 123-4567' },
    { term: 'Location', description: 'New York, NY, USA' },
    { term: 'Total Orders', description: '12' },
    { term: 'Lifetime Value', description: '$2,847.50' },
    { term: 'Customer Since', description: 'January 15, 2022' },
  ];

  return <DescriptionList items={items} />;
}

export default CustomerInformationExample;`,

    vanilla: `import { $, createDescriptionList } from '@cin7/vanilla-js';

// Customer data
const customerData = {
  customerId: 'CUST-2023-001',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY, USA',
  totalOrders: '12',
  lifetimeValue: '$2,847.50',
  customerSince: 'January 15, 2022'
};

// Create description list
const items = [
  { term: 'Customer ID', description: customerData.customerId },
  { term: 'Email', description: customerData.email },
  { term: 'Phone', description: customerData.phone },
  { term: 'Location', description: customerData.location },
  { term: 'Total Orders', description: customerData.totalOrders },
  { term: 'Lifetime Value', description: customerData.lifetimeValue },
  { term: 'Customer Since', description: customerData.customerSince },
];

const descriptionList = createDescriptionList({ items });
$('#app').appendChild(descriptionList);`,

    extjs: `import { PolarisDescriptionList } from '@cin7/extjs-adapters';

// Customer information panel
Ext.define('CustomerInfoPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'customerinfopanel',

  title: 'Customer Information',
  width: 500,
  bodyPadding: 15,

  initComponent: function() {
    this.items = [{
      xtype: 'polaris-descriptionlist',
      items: [
        { term: 'Customer ID', description: 'CUST-2023-001' },
        { term: 'Email', description: 'john.smith@example.com' },
        { term: 'Phone', description: '+1 (555) 123-4567' },
        { term: 'Location', description: 'New York, NY, USA' },
        { term: 'Total Orders', description: '12' },
        { term: 'Lifetime Value', description: '$2,847.50' },
        { term: 'Customer Since', description: 'January 15, 2022' },
      ]
    }];

    this.callParent(arguments);
  }
});

Ext.create('CustomerInfoPanel', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

interface Customer {
  customerId: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  lifetimeValue: number;
  customerSince: Date;
}

interface CustomerInformationProps {
  customer?: Customer;
}

function CustomerInformationExample({
  customer
}: CustomerInformationProps): JSX.Element {
  const defaultCustomer: Customer = {
    customerId: 'CUST-2023-001',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY, USA',
    totalOrders: 12,
    lifetimeValue: 2847.50,
    customerSince: new Date('2022-01-15'),
  };

  const customerData = customer || defaultCustomer;

  const items = [
    { term: 'Customer ID', description: customerData.customerId },
    { term: 'Email', description: customerData.email },
    { term: 'Phone', description: customerData.phone },
    { term: 'Location', description: customerData.location },
    { term: 'Total Orders', description: customerData.totalOrders.toString() },
    {
      term: 'Lifetime Value',
      description: \`$\${customerData.lifetimeValue.toFixed(2)}\`
    },
    {
      term: 'Customer Since',
      description: customerData.customerSince.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
  ];

  return <DescriptionList items={items} />;
}

export default CustomerInformationExample;`,
  },

  withBadges: {
    react: `import { DescriptionList, Badge } from '@shopify/polaris';
import React from 'react';

function WithBadgesExample() {
  const items = [
    {
      term: 'Status',
      description: <Badge tone="success">Active</Badge>,
    },
    {
      term: 'Priority',
      description: <Badge tone="attention">High</Badge>,
    },
    {
      term: 'Verification',
      description: <Badge tone="info">Pending</Badge>,
    },
    {
      term: 'Risk Level',
      description: <Badge tone="critical">Low</Badge>,
    },
  ];

  return <DescriptionList items={items} />;
}

export default WithBadgesExample;`,

    vanilla: `import { $, createBadge } from '@cin7/vanilla-js';

// Create description list with badges
const dl = document.createElement('dl');
dl.className = 'polaris-description-list';

// Status items with badge styling
const statusData = [
  { term: 'Status', status: 'Active', tone: 'success' },
  { term: 'Priority', status: 'High', tone: 'attention' },
  { term: 'Verification', status: 'Pending', tone: 'info' },
  { term: 'Risk Level', status: 'Low', tone: 'critical' },
];

statusData.forEach(item => {
  const dt = document.createElement('dt');
  dt.className = 'polaris-description-list__term';
  dt.textContent = item.term;

  const dd = document.createElement('dd');
  dd.className = 'polaris-description-list__description';

  // Create badge element
  const badge = createBadge({
    text: item.status,
    tone: item.tone
  });

  dd.appendChild(badge);

  dl.appendChild(dt);
  dl.appendChild(dd);
});

$('#app').appendChild(dl);`,

    extjs: `import { PolarisBadge } from '@cin7/extjs-adapters';

// Status display with badges
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Status Information',
  width: 400,
  bodyPadding: 10,
  layout: {
    type: 'table',
    columns: 2
  },
  defaults: {
    padding: 5
  },
  items: [
    { html: '<strong>Status</strong>' },
    {
      xtype: 'polaris-badge',
      text: 'Active',
      tone: 'success'
    },
    { html: '<strong>Priority</strong>' },
    {
      xtype: 'polaris-badge',
      text: 'High',
      tone: 'attention'
    },
    { html: '<strong>Verification</strong>' },
    {
      xtype: 'polaris-badge',
      text: 'Pending',
      tone: 'info'
    },
    { html: '<strong>Risk Level</strong>' },
    {
      xtype: 'polaris-badge',
      text: 'Low',
      tone: 'critical'
    }
  ]
});`,

    typescript: `import { DescriptionList, Badge } from '@shopify/polaris';
import React from 'react';

type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical';

interface StatusItem {
  term: string;
  status: string;
  tone: BadgeTone;
}

interface WithBadgesProps {
  statusItems?: StatusItem[];
}

function WithBadgesExample({ statusItems }: WithBadgesProps): JSX.Element {
  const defaultItems: StatusItem[] = [
    { term: 'Status', status: 'Active', tone: 'success' },
    { term: 'Priority', status: 'High', tone: 'attention' },
    { term: 'Verification', status: 'Pending', tone: 'info' },
    { term: 'Risk Level', status: 'Low', tone: 'critical' },
  ];

  const items = (statusItems || defaultItems).map(item => ({
    term: item.term,
    description: <Badge tone={item.tone}>{item.status}</Badge>,
  }));

  return <DescriptionList items={items} />;
}

export default WithBadgesExample;`,
  },

  withIcons: {
    react: `import { DescriptionList, InlineStack, Icon } from '@shopify/polaris';
import { EmailIcon, PhoneIcon, LocationIcon, ClockIcon } from '@shopify/polaris-icons';
import React from 'react';

function WithIconsExample() {
  const items = [
    {
      term: (
        <InlineStack gap="200">
          <Icon source={EmailIcon} />
          Email
        </InlineStack>
      ),
      description: 'contact@company.com',
    },
    {
      term: (
        <InlineStack gap="200">
          <Icon source={PhoneIcon} />
          Phone
        </InlineStack>
      ),
      description: '+1 (555) 987-6543',
    },
    {
      term: (
        <InlineStack gap="200">
          <Icon source={LocationIcon} />
          Address
        </InlineStack>
      ),
      description: '123 Business St, Suite 100',
    },
    {
      term: (
        <InlineStack gap="200">
          <Icon source={ClockIcon} />
          Business Hours
        </InlineStack>
      ),
      description: 'Mon-Fri: 9AM-6PM EST',
    },
  ];

  return <DescriptionList items={items} />;
}

export default WithIconsExample;`,

    vanilla: `import { $, createIcon } from '@cin7/vanilla-js';

// Create description list with icons
const dl = document.createElement('dl');
dl.className = 'polaris-description-list';

// Contact data with icons
const contactData = [
  { icon: 'email', label: 'Email', value: 'contact@company.com' },
  { icon: 'phone', label: 'Phone', value: '+1 (555) 987-6543' },
  { icon: 'location', label: 'Address', value: '123 Business St, Suite 100' },
  { icon: 'clock', label: 'Business Hours', value: 'Mon-Fri: 9AM-6PM EST' },
];

contactData.forEach(item => {
  const dt = document.createElement('dt');
  dt.className = 'polaris-description-list__term';

  // Create term with icon
  const termWrapper = document.createElement('div');
  termWrapper.style.display = 'flex';
  termWrapper.style.alignItems = 'center';
  termWrapper.style.gap = '8px';

  const icon = createIcon({ name: item.icon });
  termWrapper.appendChild(icon);

  const label = document.createTextNode(item.label);
  termWrapper.appendChild(label);

  dt.appendChild(termWrapper);

  const dd = document.createElement('dd');
  dd.className = 'polaris-description-list__description';
  dd.textContent = item.value;

  dl.appendChild(dt);
  dl.appendChild(dd);
});

$('#app').appendChild(dl);`,

    extjs: `import { PolarisIcon } from '@cin7/extjs-adapters';

// Contact information panel with icons
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Contact Information',
  width: 500,
  bodyPadding: 10,
  layout: {
    type: 'table',
    columns: 2
  },
  defaults: {
    padding: 5
  },
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polaris-icon', iconName: 'EmailIcon', margin: '0 5 0 0' },
        { xtype: 'component', html: '<strong>Email</strong>' }
      ]
    },
    { html: 'contact@company.com' },
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polaris-icon', iconName: 'PhoneIcon', margin: '0 5 0 0' },
        { xtype: 'component', html: '<strong>Phone</strong>' }
      ]
    },
    { html: '+1 (555) 987-6543' },
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polaris-icon', iconName: 'LocationIcon', margin: '0 5 0 0' },
        { xtype: 'component', html: '<strong>Address</strong>' }
      ]
    },
    { html: '123 Business St, Suite 100' },
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polaris-icon', iconName: 'ClockIcon', margin: '0 5 0 0' },
        { xtype: 'component', html: '<strong>Business Hours</strong>' }
      ]
    },
    { html: 'Mon-Fri: 9AM-6PM EST' }
  ]
});`,

    typescript: `import { DescriptionList, InlineStack, Icon } from '@shopify/polaris';
import {
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  ClockIcon
} from '@shopify/polaris-icons';
import React from 'react';

interface ContactItem {
  icon: React.ComponentType;
  label: string;
  value: string;
}

interface WithIconsProps {
  contactItems?: ContactItem[];
}

function WithIconsExample({ contactItems }: WithIconsProps): JSX.Element {
  const defaultItems: ContactItem[] = [
    { icon: EmailIcon, label: 'Email', value: 'contact@company.com' },
    { icon: PhoneIcon, label: 'Phone', value: '+1 (555) 987-6543' },
    { icon: LocationIcon, label: 'Address', value: '123 Business St, Suite 100' },
    { icon: ClockIcon, label: 'Business Hours', value: 'Mon-Fri: 9AM-6PM EST' },
  ];

  const items = (contactItems || defaultItems).map(item => ({
    term: (
      <InlineStack gap="200">
        <Icon source={item.icon} />
        {item.label}
      </InlineStack>
    ),
    description: item.value,
  }));

  return <DescriptionList items={items} />;
}

export default WithIconsExample;`,
  },

  twoColumns: {
    react: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

function TwoColumnsExample() {
  const items = [
    { term: 'Product Name', description: 'Premium Cotton T-Shirt' },
    { term: 'SKU', description: 'TSHIRT-PREMIUM-001' },
    { term: 'Price', description: '$29.99' },
    { term: 'Compare at Price', description: '$39.99' },
    { term: 'Cost per Item', description: '$12.50' },
    { term: 'Profit', description: '$17.49' },
    { term: 'Margin', description: '58.3%' },
    { term: 'Weight', description: '0.2 kg' },
  ];

  return <DescriptionList items={items} columns={2} />;
}

export default TwoColumnsExample;`,

    vanilla: `import { $ } from '@cin7/vanilla-js';

// Create two-column description list
const dl = document.createElement('dl');
dl.className = 'polaris-description-list polaris-description-list--columns-2';
dl.style.display = 'grid';
dl.style.gridTemplateColumns = 'repeat(2, 1fr)';
dl.style.gap = '16px';

const items = [
  { term: 'Product Name', description: 'Premium Cotton T-Shirt' },
  { term: 'SKU', description: 'TSHIRT-PREMIUM-001' },
  { term: 'Price', description: '$29.99' },
  { term: 'Compare at Price', description: '$39.99' },
  { term: 'Cost per Item', description: '$12.50' },
  { term: 'Profit', description: '$17.49' },
  { term: 'Margin', description: '58.3%' },
  { term: 'Weight', description: '0.2 kg' },
];

items.forEach(item => {
  const wrapper = document.createElement('div');

  const dt = document.createElement('dt');
  dt.className = 'polaris-description-list__term';
  dt.textContent = item.term;

  const dd = document.createElement('dd');
  dd.className = 'polaris-description-list__description';
  dd.textContent = item.description;

  wrapper.appendChild(dt);
  wrapper.appendChild(dd);
  dl.appendChild(wrapper);
});

$('#app').appendChild(dl);`,

    extjs: `import { PolarisDescriptionList } from '@cin7/extjs-adapters';

// Two-column product pricing grid
Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  title: 'Product Pricing',
  width: 600,
  height: 300,
  columns: [
    {
      text: 'Attribute',
      dataIndex: 'term',
      flex: 1,
      renderer: function(value) {
        return '<strong>' + value + '</strong>';
      }
    },
    {
      text: 'Value',
      dataIndex: 'description',
      flex: 1
    }
  ],
  store: {
    data: [
      { term: 'Product Name', description: 'Premium Cotton T-Shirt' },
      { term: 'SKU', description: 'TSHIRT-PREMIUM-001' },
      { term: 'Price', description: '$29.99' },
      { term: 'Compare at Price', description: '$39.99' },
      { term: 'Cost per Item', description: '$12.50' },
      { term: 'Profit', description: '$17.49' },
      { term: 'Margin', description: '58.3%' },
      { term: 'Weight', description: '0.2 kg' },
    ]
  }
});`,

    typescript: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

interface PricingInfo {
  productName: string;
  sku: string;
  price: number;
  compareAtPrice: number;
  costPerItem: number;
  weight: string;
}

interface TwoColumnsProps {
  pricingData?: PricingInfo;
  columns?: number;
}

function TwoColumnsExample({
  pricingData,
  columns = 2
}: TwoColumnsProps): JSX.Element {
  const defaultData: PricingInfo = {
    productName: 'Premium Cotton T-Shirt',
    sku: 'TSHIRT-PREMIUM-001',
    price: 29.99,
    compareAtPrice: 39.99,
    costPerItem: 12.50,
    weight: '0.2 kg',
  };

  const data = pricingData || defaultData;
  const profit = data.price - data.costPerItem;
  const margin = ((profit / data.price) * 100).toFixed(1);

  const items = [
    { term: 'Product Name', description: data.productName },
    { term: 'SKU', description: data.sku },
    { term: 'Price', description: \\\`$\\\${data.price.toFixed(2)}\\\` },
    { term: 'Compare at Price', description: \\\`$\\\${data.compareAtPrice.toFixed(2)}\\\` },
    { term: 'Cost per Item', description: \\\`$\\\${data.costPerItem.toFixed(2)}\\\` },
    { term: 'Profit', description: \\\`$\\\${profit.toFixed(2)}\\\` },
    { term: 'Margin', description: \\\`\\\${margin}%\\\` },
    { term: 'Weight', description: data.weight },
  ];

  return <DescriptionList items={items} columns={columns} />;
}

export default TwoColumnsExample;`,
  },

  tightSpacing: {
    react: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

function TightSpacingExample() {
  const items = [
    { term: 'Width', description: '50cm' },
    { term: 'Height', description: '70cm' },
    { term: 'Depth', description: '30cm' },
    { term: 'Weight', description: '1.5kg' },
    { term: 'Material', description: '100% Cotton' },
    { term: 'Care Instructions', description: 'Machine wash cold' },
  ];

  return <DescriptionList items={items} spacing="tight" />;
}

export default TightSpacingExample;`,

    vanilla: `import { $ } from '@cin7/vanilla-js';

// Create description list with tight spacing
const dl = document.createElement('dl');
dl.className = 'polaris-description-list polaris-description-list--spacing-tight';
dl.style.gap = '8px';

const items = [
  { term: 'Width', description: '50cm' },
  { term: 'Height', description: '70cm' },
  { term: 'Depth', description: '30cm' },
  { term: 'Weight', description: '1.5kg' },
  { term: 'Material', description: '100% Cotton' },
  { term: 'Care Instructions', description: 'Machine wash cold' },
];

items.forEach(item => {
  const dt = document.createElement('dt');
  dt.className = 'polaris-description-list__term';
  dt.textContent = item.term;

  const dd = document.createElement('dd');
  dd.className = 'polaris-description-list__description';
  dd.textContent = item.description;

  dl.appendChild(dt);
  dl.appendChild(dd);
});

$('#app').appendChild(dl);`,

    extjs: `import { PolarisDescriptionList } from '@cin7/extjs-adapters';

// Compact product specifications
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  title: 'Product Specifications',
  width: 350,
  bodyPadding: 10,
  items: [{
    xtype: 'polaris-descriptionlist',
    spacing: 'tight',
    items: [
      { term: 'Width', description: '50cm' },
      { term: 'Height', description: '70cm' },
      { term: 'Depth', description: '30cm' },
      { term: 'Weight', description: '1.5kg' },
      { term: 'Material', description: '100% Cotton' },
      { term: 'Care Instructions', description: 'Machine wash cold' },
    ]
  }]
});`,

    typescript: `import { DescriptionList } from '@shopify/polaris';
import React from 'react';

interface ProductSpecs {
  width: string;
  height: string;
  depth: string;
  weight: string;
  material: string;
  careInstructions: string;
}

interface TightSpacingProps {
  specs?: ProductSpecs;
  spacing?: 'tight' | 'loose';
}

function TightSpacingExample({
  specs,
  spacing = 'tight'
}: TightSpacingProps): JSX.Element {
  const defaultSpecs: ProductSpecs = {
    width: '50cm',
    height: '70cm',
    depth: '30cm',
    weight: '1.5kg',
    material: '100% Cotton',
    careInstructions: 'Machine wash cold',
  };

  const specData = specs || defaultSpecs;

  const items = [
    { term: 'Width', description: specData.width },
    { term: 'Height', description: specData.height },
    { term: 'Depth', description: specData.depth },
    { term: 'Weight', description: specData.weight },
    { term: 'Material', description: specData.material },
    { term: 'Care Instructions', description: specData.careInstructions },
  ];

  return <DescriptionList items={items} spacing={spacing} />;
}

export default TightSpacingExample;`,
  }

  };

// ExceptionList Component Examples

export const exceptionListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ExceptionList } from '@shopify/polaris';
import React from 'react';

function ExceptionListExample() {
  const items = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method declined',
      description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Inventory running low',
      description: 'You have 5 items that are running low on stock. Consider restocking soon.',
    },
  ];

  return <ExceptionList items={items} />;
}

export default ExceptionListExample;`,

    vanilla: `import { createExceptionList, EventBus } from '@cin7/vanilla-js';

// Define exception items
const exceptions = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Payment method declined',
    description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Inventory running low',
    description: 'You have 5 items that are running low on stock. Consider restocking soon.',
  },
];

// Create and render exception list
const exceptionList = createExceptionList({ items: exceptions });
document.getElementById('app').appendChild(exceptionList);

// Listen for action clicks
EventBus.on('exceptionlist:action:click', (event) => {
  console.log('Exception action clicked:', event.detail);
});`,

    extjs: `import { PolarisExceptionList } from '@cin7/extjs-adapters';

// Create ExceptionList using ExtJS adapter
Ext.create('Cin7.component.PolarisExceptionList', {
  renderTo: Ext.getBody(),
  items: [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method declined',
      description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Inventory running low',
      description: 'You have 5 items that are running low on stock. Consider restocking soon.',
    },
  ]
});`,

    typescript: `import { ExceptionList } from '@shopify/polaris';
import React from 'react';

interface ExceptionItem {
  status: 'critical' | 'warning' | 'success' | 'info';
  icon?: string;
  title: string;
  description?: string;
  action?: {
    content: string;
    onAction: () => void;
  };
}

interface ExceptionListExampleProps {
  items?: ExceptionItem[];
  onActionClick?: (item: ExceptionItem) => void;
}

function ExceptionListExample({
  items,
  onActionClick
}: ExceptionListExampleProps): JSX.Element {
  const defaultItems: ExceptionItem[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method declined',
      description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Inventory running low',
      description: 'You have 5 items that are running low on stock. Consider restocking soon.',
    },
  ];

  return <ExceptionList items={items || defaultItems} />;
}

export default ExceptionListExample;`,
  },

  errorlist: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function OrderProcessingErrors() {
  const errors = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Invalid shipping address',
      description: 'The address provided is incomplete. Please add apartment/suite number.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method required',
      description: 'Please add a valid payment method to complete this order.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Item out of stock',
      description: 'Premium Widget is currently out of stock and has been removed from your cart.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Order Processing Errors</Text>
        <Text as="p" variant="bodySm">
          The following issues need to be resolved before processing your order:
        </Text>
      </div>
      <ExceptionList items={errors} />
    </Card>
  );
}

export default OrderProcessingErrors;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create card container
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">Order Processing Errors</h3>',
    '<p class="polaris-text--body-sm">The following issues need to be resolved before processing your order:</p>',
    '</div>',
  ]
});

// Define critical errors
const errors = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Invalid shipping address',
    description: 'The address provided is incomplete. Please add apartment/suite number.',
  },
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Payment method required',
    description: 'Please add a valid payment method to complete this order.',
  },
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Item out of stock',
    description: 'Premium Widget is currently out of stock and has been removed from your cart.',
  },
];

// Create exception list and append to card
const exceptionList = createExceptionList({ items: errors });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create card with exception list for order errors
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">Order Processing Errors</h3>' +
            '<p class="polaris-text--body-sm">The following issues need to be resolved before processing your order:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Invalid shipping address',
          description: 'The address provided is incomplete. Please add apartment/suite number.',
        },
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Payment method required',
          description: 'Please add a valid payment method to complete this order.',
        },
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Item out of stock',
          description: 'Premium Widget is currently out of stock and has been removed from your cart.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface OrderError {
  status: 'critical';
  icon: string;
  title: string;
  description: string;
}

interface OrderProcessingErrorsProps {
  errors?: OrderError[];
  onErrorResolved?: (errorTitle: string) => void;
}

function OrderProcessingErrors({
  errors,
  onErrorResolved
}: OrderProcessingErrorsProps): JSX.Element {
  const defaultErrors: OrderError[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Invalid shipping address',
      description: 'The address provided is incomplete. Please add apartment/suite number.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method required',
      description: 'Please add a valid payment method to complete this order.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Item out of stock',
      description: 'Premium Widget is currently out of stock and has been removed from your cart.',
    },
  ];

  const errorItems = errors || defaultErrors;

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Order Processing Errors</Text>
        <Text as="p" variant="bodySm">
          The following issues need to be resolved before processing your order:
        </Text>
      </div>
      <ExceptionList items={errorItems} />
    </Card>
  );
}

export default OrderProcessingErrors;`
  },

  warninglist: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function StoreHealthWarnings() {
  const warnings = [
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Missing product descriptions',
      description: '12 products are missing descriptions. Add them to improve SEO.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Low product images quality',
      description: '8 products have low-quality images that may affect customer trust.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Slow page load times',
      description: 'Your homepage loads in 4.2 seconds. Optimize images and apps to improve speed.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Store Health Warnings</Text>
        <Text as="p" variant="bodySm">
          Consider addressing these issues to improve your store performance:
        </Text>
      </div>
      <ExceptionList items={warnings} />
    </Card>
  );
}

export default StoreHealthWarnings;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create warning card
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">Store Health Warnings</h3>',
    '<p class="polaris-text--body-sm">Consider addressing these issues to improve your store performance:</p>',
    '</div>',
  ]
});

// Define warnings
const warnings = [
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Missing product descriptions',
    description: '12 products are missing descriptions. Add them to improve SEO.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Low product images quality',
    description: '8 products have low-quality images that may affect customer trust.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Slow page load times',
    description: 'Your homepage loads in 4.2 seconds. Optimize images and apps to improve speed.',
  },
];

const exceptionList = createExceptionList({ items: warnings });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create warning panel for store health
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">Store Health Warnings</h3>' +
            '<p class="polaris-text--body-sm">Consider addressing these issues to improve your store performance:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Missing product descriptions',
          description: '12 products are missing descriptions. Add them to improve SEO.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Low product images quality',
          description: '8 products have low-quality images that may affect customer trust.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Slow page load times',
          description: 'Your homepage loads in 4.2 seconds. Optimize images and apps to improve speed.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface StoreWarning {
  status: 'warning';
  icon: string;
  title: string;
  description: string;
}

interface StoreHealthWarningsProps {
  warnings?: StoreWarning[];
  showRecommendations?: boolean;
}

function StoreHealthWarnings({
  warnings,
  showRecommendations = true
}: StoreHealthWarningsProps): JSX.Element {
  const defaultWarnings: StoreWarning[] = [
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Missing product descriptions',
      description: '12 products are missing descriptions. Add them to improve SEO.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Low product images quality',
      description: '8 products have low-quality images that may affect customer trust.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Slow page load times',
      description: 'Your homepage loads in 4.2 seconds. Optimize images and apps to improve speed.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Store Health Warnings</Text>
        <Text as="p" variant="bodySm">
          {showRecommendations
            ? 'Consider addressing these issues to improve your store performance:'
            : 'Current store health issues:'}
        </Text>
      </div>
      <ExceptionList items={warnings || defaultWarnings} />
    </Card>
  );
}

export default StoreHealthWarnings;`
  },

  mixedstatuses: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function DataImportResults() {
  const results = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Duplicate SKUs found',
      description: '3 products have duplicate SKUs. These were not imported.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Missing required fields',
      description: '5 products were missing prices and were set to $0.00 by default.',
    },
    {
      status: 'success',
      icon: 'CheckCircleIcon',
      title: 'Successfully imported',
      description: '245 products were successfully imported to your catalog.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Image processing errors',
      description: '7 product images failed to process and were skipped.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Data Import Results</Text>
        <Text as="p" variant="bodySm">
          Review the following messages from your recent data import:
        </Text>
      </div>
      <ExceptionList items={results} />
    </Card>
  );
}

export default DataImportResults;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create import results card
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">Data Import Results</h3>',
    '<p class="polaris-text--body-sm">Review the following messages from your recent data import:</p>',
    '</div>',
  ]
});

// Define mixed status results
const results = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Duplicate SKUs found',
    description: '3 products have duplicate SKUs. These were not imported.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Missing required fields',
    description: '5 products were missing prices and were set to $0.00 by default.',
  },
  {
    status: 'success',
    icon: 'check-circle',
    title: 'Successfully imported',
    description: '245 products were successfully imported to your catalog.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Image processing errors',
    description: '7 product images failed to process and were skipped.',
  },
];

const exceptionList = createExceptionList({ items: results });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create import results panel with mixed statuses
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">Data Import Results</h3>' +
            '<p class="polaris-text--body-sm">Review the following messages from your recent data import:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Duplicate SKUs found',
          description: '3 products have duplicate SKUs. These were not imported.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Missing required fields',
          description: '5 products were missing prices and were set to $0.00 by default.',
        },
        {
          status: 'success',
          icon: 'CheckCircleIcon',
          title: 'Successfully imported',
          description: '245 products were successfully imported to your catalog.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Image processing errors',
          description: '7 product images failed to process and were skipped.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface ImportResult {
  status: 'critical' | 'warning' | 'success';
  icon: string;
  title: string;
  description: string;
}

interface DataImportResultsProps {
  results?: ImportResult[];
  importTimestamp?: Date;
  totalProcessed?: number;
}

function DataImportResults({
  results,
  importTimestamp,
  totalProcessed
}: DataImportResultsProps): JSX.Element {
  const defaultResults: ImportResult[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Duplicate SKUs found',
      description: '3 products have duplicate SKUs. These were not imported.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Missing required fields',
      description: '5 products were missing prices and were set to $0.00 by default.',
    },
    {
      status: 'success',
      icon: 'CheckCircleIcon',
      title: 'Successfully imported',
      description: '245 products were successfully imported to your catalog.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Image processing errors',
      description: '7 product images failed to process and were skipped.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Data Import Results</Text>
        <Text as="p" variant="bodySm">
          Review the following messages from your recent data import:
        </Text>
      </div>
      <ExceptionList items={results || defaultResults} />
    </Card>
  );
}

export default DataImportResults;`
  },

  validationerrors: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function ProductValidationErrors() {
  const validationErrors = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Title is required',
      description: 'Every product must have a title before it can be published.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Price must be greater than 0',
      description: 'Product price cannot be negative or zero.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'At least one image required',
      description: 'Add at least one product image to help customers visualize your product.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'No product description',
      description: 'Adding a description can help with SEO and customer understanding.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'No product tags',
      description: 'Tags help customers find your products through search and filtering.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Product Validation Errors</Text>
        <Text as="p" variant="bodySm">
          Please fix these issues before publishing your product:
        </Text>
      </div>
      <ExceptionList items={validationErrors} />
    </Card>
  );
}

export default ProductValidationErrors;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create validation errors card
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">Product Validation Errors</h3>',
    '<p class="polaris-text--body-sm">Please fix these issues before publishing your product:</p>',
    '</div>',
  ]
});

// Define validation errors
const validationErrors = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Title is required',
    description: 'Every product must have a title before it can be published.',
  },
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Price must be greater than 0',
    description: 'Product price cannot be negative or zero.',
  },
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'At least one image required',
    description: 'Add at least one product image to help customers visualize your product.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'No product description',
    description: 'Adding a description can help with SEO and customer understanding.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'No product tags',
    description: 'Tags help customers find your products through search and filtering.',
  },
];

const exceptionList = createExceptionList({ items: validationErrors });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create validation errors panel
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">Product Validation Errors</h3>' +
            '<p class="polaris-text--body-sm">Please fix these issues before publishing your product:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Title is required',
          description: 'Every product must have a title before it can be published.',
        },
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Price must be greater than 0',
          description: 'Product price cannot be negative or zero.',
        },
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'At least one image required',
          description: 'Add at least one product image to help customers visualize your product.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'No product description',
          description: 'Adding a description can help with SEO and customer understanding.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'No product tags',
          description: 'Tags help customers find your products through search and filtering.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface ValidationError {
  status: 'critical' | 'warning';
  icon: string;
  title: string;
  description: string;
  field?: string;
}

interface ProductValidationErrorsProps {
  errors?: ValidationError[];
  onFixError?: (field: string) => void;
}

function ProductValidationErrors({
  errors,
  onFixError
}: ProductValidationErrorsProps): JSX.Element {
  const defaultErrors: ValidationError[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Title is required',
      description: 'Every product must have a title before it can be published.',
      field: 'title',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Price must be greater than 0',
      description: 'Product price cannot be negative or zero.',
      field: 'price',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'At least one image required',
      description: 'Add at least one product image to help customers visualize your product.',
      field: 'images',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'No product description',
      description: 'Adding a description can help with SEO and customer understanding.',
      field: 'description',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'No product tags',
      description: 'Tags help customers find your products through search and filtering.',
      field: 'tags',
    },
  ];

  const criticalCount = (errors || defaultErrors).filter(e => e.status === 'critical').length;

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Product Validation Errors</Text>
        <Text as="p" variant="bodySm">
          Please fix these {criticalCount} critical issue(s) before publishing your product:
        </Text>
      </div>
      <ExceptionList items={errors || defaultErrors} />
    </Card>
  );
}

export default ProductValidationErrors;`
  },

  shippingissues: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function ShippingConfigurationIssues() {
  const shippingIssues = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'No shipping zones configured',
      description: 'You must set up at least one shipping zone to sell products.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'High shipping rates',
      description: 'Your shipping rates may be too high for some regions. Consider free shipping thresholds.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'No express shipping available',
      description: 'Customers may prefer faster shipping options for urgent orders.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Shipping Configuration Issues</Text>
        <Text as="p" variant="bodySm">
          The following shipping settings need attention:
        </Text>
      </div>
      <ExceptionList items={shippingIssues} />
    </Card>
  );
}

export default ShippingConfigurationIssues;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create shipping issues card
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">Shipping Configuration Issues</h3>',
    '<p class="polaris-text--body-sm">The following shipping settings need attention:</p>',
    '</div>',
  ]
});

// Define shipping issues
const shippingIssues = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'No shipping zones configured',
    description: 'You must set up at least one shipping zone to sell products.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'High shipping rates',
    description: 'Your shipping rates may be too high for some regions. Consider free shipping thresholds.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'No express shipping available',
    description: 'Customers may prefer faster shipping options for urgent orders.',
  },
];

const exceptionList = createExceptionList({ items: shippingIssues });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create shipping configuration panel
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">Shipping Configuration Issues</h3>' +
            '<p class="polaris-text--body-sm">The following shipping settings need attention:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'No shipping zones configured',
          description: 'You must set up at least one shipping zone to sell products.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'High shipping rates',
          description: 'Your shipping rates may be too high for some regions. Consider free shipping thresholds.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'No express shipping available',
          description: 'Customers may prefer faster shipping options for urgent orders.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface ShippingIssue {
  status: 'critical' | 'warning';
  icon: string;
  title: string;
  description: string;
  zone?: string;
}

interface ShippingConfigurationIssuesProps {
  issues?: ShippingIssue[];
  onConfigureShipping?: () => void;
}

function ShippingConfigurationIssues({
  issues,
  onConfigureShipping
}: ShippingConfigurationIssuesProps): JSX.Element {
  const defaultIssues: ShippingIssue[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'No shipping zones configured',
      description: 'You must set up at least one shipping zone to sell products.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'High shipping rates',
      description: 'Your shipping rates may be too high for some regions. Consider free shipping thresholds.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'No express shipping available',
      description: 'Customers may prefer faster shipping options for urgent orders.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Shipping Configuration Issues</Text>
        <Text as="p" variant="bodySm">
          The following shipping settings need attention:
        </Text>
      </div>
      <ExceptionList items={issues || defaultIssues} />
    </Card>
  );
}

export default ShippingConfigurationIssues;`
  },

  interactive: {
    react: `import { ExceptionList, Card, Text, Button } from '@shopify/polaris';
import React, { useState, useEffect } from 'react';

interface Issue {
  id: number;
  status: 'critical' | 'warning';
  icon: string;
  title: string;
  description: string;
}

function InteractiveExceptionList() {
  const [resolvedIssues, setResolvedIssues] = useState<number[]>([]);
  const [allResolved, setAllResolved] = useState(false);

  const issues: Issue[] = [
    {
      id: 1,
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method expired',
      description: 'Your payment method expires next week. Update your billing information.',
    },
    {
      id: 2,
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Storage almost full',
      description: "You're using 85% of your storage capacity.",
    },
    {
      id: 3,
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'App updates available',
      description: '3 installed apps have updates available.',
    },
  ];

  const handleResolve = (issueId: number) => {
    setResolvedIssues(prev => [...prev, issueId]);
  };

  useEffect(() => {
    if (resolvedIssues.length === issues.length) {
      setAllResolved(true);
    }
  }, [resolvedIssues, issues.length]);

  if (allResolved) {
    return (
      <Card sectioned>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text as="h3" variant="headingMd">✅ All issues resolved!</Text>
          <Text as="p" variant="bodyMd">
            Your store is in good health. Great job!
          </Text>
          <Button onClick={() => {
            setResolvedIssues([]);
            setAllResolved(false);
          }}>
            Reset issues
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Store Issues</Text>
        <Text as="p" variant="bodySm">
          {issues.length - resolvedIssues.length} issue(s) need your attention
        </Text>
      </div>
      <ExceptionList
        items={issues
          .filter(issue => !resolvedIssues.includes(issue.id))
          .map(issue => ({
            ...issue,
            action: {
              content: 'Fix issue',
              onAction: () => handleResolve(issue.id),
            },
          }))}
      />
    </Card>
  );
}

export default InteractiveExceptionList;`,

    vanilla: `import { createCard, createExceptionList, EventBus } from '@cin7/vanilla-js';

// Track resolved issues
let resolvedIssues = [];
const issues = [
  {
    id: 1,
    status: 'critical',
    icon: 'alert-circle',
    title: 'Payment method expired',
    description: 'Your payment method expires next week. Update your billing information.',
  },
  {
    id: 2,
    status: 'warning',
    icon: 'alert-circle',
    title: 'Storage almost full',
    description: "You're using 85% of your storage capacity.",
  },
  {
    id: 3,
    status: 'warning',
    icon: 'alert-circle',
    title: 'App updates available',
    description: '3 installed apps have updates available.',
  },
];

// Create container
const container = document.getElementById('app');

function renderIssues() {
  container.innerHTML = '';

  if (resolvedIssues.length === issues.length) {
    // All resolved
    const successCard = createCard({
      sectioned: true,
      children: [
        '<div style="text-align: center; padding: 20px;">',
        '<h3 class="polaris-text--heading-md">✅ All issues resolved!</h3>',
        '<p class="polaris-text--body-md">Your store is in good health. Great job!</p>',
        '<button class="polaris-button polaris-button--primary" onclick="resetIssues()">Reset issues</button>',
        '</div>',
      ]
    });
    container.appendChild(successCard);
  } else {
    // Show remaining issues
    const card = createCard({
      sectioned: true,
      children: [
        '<div style="margin-bottom: 16px;">',
        \`<h3 class="polaris-text--heading-md">Store Issues</h3>\`,
        \`<p class="polaris-text--body-sm">\${issues.length - resolvedIssues.length} issue(s) need your attention</p>\`,
        '</div>',
      ]
    });

    const activeIssues = issues
      .filter(issue => !resolvedIssues.includes(issue.id))
      .map(issue => ({
        ...issue,
        action: {
          content: 'Fix issue',
          onClick: () => handleResolve(issue.id),
        },
      }));

    const exceptionList = createExceptionList({ items: activeIssues });
    card.appendChild(exceptionList);
    container.appendChild(card);
  }
}

function handleResolve(issueId) {
  resolvedIssues.push(issueId);
  renderIssues();
}

window.resetIssues = function() {
  resolvedIssues = [];
  renderIssues();
};

// Initial render
renderIssues();`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Interactive exception list with state management
Ext.define('Cin7.view.InteractiveExceptionList', {
  extend: 'Ext.panel.Panel',

  initComponent: function() {
    this.resolvedIssues = [];
    this.issues = [
      {
        id: 1,
        status: 'critical',
        icon: 'AlertCircleIcon',
        title: 'Payment method expired',
        description: 'Your payment method expires next week. Update your billing information.',
      },
      {
        id: 2,
        status: 'warning',
        icon: 'AlertCircleIcon',
        title: 'Storage almost full',
        description: "You're using 85% of your storage capacity.",
      },
      {
        id: 3,
        status: 'warning',
        icon: 'AlertCircleIcon',
        title: 'App updates available',
        description: '3 installed apps have updates available.',
      },
    ];

    this.items = this.buildItems();
    this.callParent(arguments);
  },

  buildItems: function() {
    const activeIssues = this.issues
      .filter(issue => !this.resolvedIssues.includes(issue.id));

    if (activeIssues.length === 0) {
      return [
        {
          xtype: 'container',
          html: '<div style="text-align: center; padding: 20px;">' +
                '<h3>✅ All issues resolved!</h3>' +
                '<p>Your store is in good health. Great job!</p>' +
                '</div>',
        },
        {
          xtype: 'button',
          text: 'Reset issues',
          handler: function() {
            this.resolvedIssues = [];
            this.removeAll();
            this.add(this.buildItems());
          },
          scope: this
        }
      ];
    }

    return [
      {
        xtype: 'container',
        html: '<div style="margin-bottom: 16px;">' +
              '<h3>Store Issues</h3>' +
              '<p>' + activeIssues.length + ' issue(s) need your attention</p>' +
              '</div>',
      },
      {
        xtype: 'cin7-exceptionlist',
        items: activeIssues.map(issue => ({
          ...issue,
          action: {
            content: 'Fix issue',
            onAction: () => {
              this.resolvedIssues.push(issue.id);
              this.removeAll();
              this.add(this.buildItems());
            }
          }
        }))
      }
    ];
  }
});

// Create instance
Ext.create('Cin7.view.InteractiveExceptionList', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { ExceptionList, Card, Text, Button } from '@shopify/polaris';
import React, { useState, useEffect, useCallback } from 'react';

interface Issue {
  id: number;
  status: 'critical' | 'warning';
  icon: string;
  title: string;
  description: string;
}

interface InteractiveExceptionListProps {
  initialIssues?: Issue[];
  onAllResolved?: () => void;
}

function InteractiveExceptionList({
  initialIssues,
  onAllResolved
}: InteractiveExceptionListProps): JSX.Element {
  const [resolvedIssues, setResolvedIssues] = useState<number[]>([]);
  const [allResolved, setAllResolved] = useState(false);

  const issues: Issue[] = initialIssues || [
    {
      id: 1,
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Payment method expired',
      description: 'Your payment method expires next week. Update your billing information.',
    },
    {
      id: 2,
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Storage almost full',
      description: "You're using 85% of your storage capacity.",
    },
    {
      id: 3,
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'App updates available',
      description: '3 installed apps have updates available.',
    },
  ];

  const handleResolve = useCallback((issueId: number) => {
    setResolvedIssues(prev => [...prev, issueId]);
  }, []);

  const handleReset = useCallback(() => {
    setResolvedIssues([]);
    setAllResolved(false);
  }, []);

  useEffect(() => {
    if (resolvedIssues.length === issues.length) {
      setAllResolved(true);
      onAllResolved?.();
    }
  }, [resolvedIssues, issues.length, onAllResolved]);

  if (allResolved) {
    return (
      <Card sectioned>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Text as="h3" variant="headingMd">✅ All issues resolved!</Text>
          <Text as="p" variant="bodyMd">
            Your store is in good health. Great job!
          </Text>
          <Button onClick={handleReset}>
            Reset issues
          </Button>
        </div>
      </Card>
    );
  }

  const activeIssues = issues
    .filter(issue => !resolvedIssues.includes(issue.id))
    .map(issue => ({
      ...issue,
      action: {
        content: 'Fix issue',
        onAction: () => handleResolve(issue.id),
      },
    }));

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Store Issues</Text>
        <Text as="p" variant="bodySm">
          {activeIssues.length} issue(s) need your attention
        </Text>
      </div>
      <ExceptionList items={activeIssues} />
    </Card>
  );
}

export default InteractiveExceptionList;`
  },

  systemalerts: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function SystemAlerts() {
  const alerts = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Database connection failed',
      description: 'Unable to connect to the database. Please check your connection settings.',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'SSL certificate expires in 7 days',
      description: 'Your SSL certificate will expire soon. Renew it to maintain secure connections.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'High memory usage',
      description: 'Memory usage is at 78%. Consider optimizing your applications.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Backup failed',
      description: 'Last backup failed 2 hours ago. Check your backup configuration.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">System Alerts</Text>
        <Text as="p" variant="bodySm">
          Monitor these system notifications for optimal performance:
        </Text>
      </div>
      <ExceptionList items={alerts} />
    </Card>
  );
}

export default SystemAlerts;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create system alerts card
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">System Alerts</h3>',
    '<p class="polaris-text--body-sm">Monitor these system notifications for optimal performance:</p>',
    '</div>',
  ]
});

// Define system alerts
const alerts = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Database connection failed',
    description: 'Unable to connect to the database. Please check your connection settings.',
  },
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'SSL certificate expires in 7 days',
    description: 'Your SSL certificate will expire soon. Renew it to maintain secure connections.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'High memory usage',
    description: 'Memory usage is at 78%. Consider optimizing your applications.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Backup failed',
    description: 'Last backup failed 2 hours ago. Check your backup configuration.',
  },
];

const exceptionList = createExceptionList({ items: alerts });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create system alerts monitoring panel
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">System Alerts</h3>' +
            '<p class="polaris-text--body-sm">Monitor these system notifications for optimal performance:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Database connection failed',
          description: 'Unable to connect to the database. Please check your connection settings.',
        },
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'SSL certificate expires in 7 days',
          description: 'Your SSL certificate will expire soon. Renew it to maintain secure connections.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'High memory usage',
          description: 'Memory usage is at 78%. Consider optimizing your applications.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Backup failed',
          description: 'Last backup failed 2 hours ago. Check your backup configuration.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface SystemAlert {
  status: 'critical' | 'warning';
  icon: string;
  title: string;
  description: string;
  severity?: 'high' | 'medium' | 'low';
  timestamp?: Date;
}

interface SystemAlertsProps {
  alerts?: SystemAlert[];
  autoRefresh?: boolean;
  refreshInterval?: number;
}

function SystemAlerts({
  alerts,
  autoRefresh = false,
  refreshInterval = 30000
}: SystemAlertsProps): JSX.Element {
  const defaultAlerts: SystemAlert[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Database connection failed',
      description: 'Unable to connect to the database. Please check your connection settings.',
      severity: 'high',
    },
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'SSL certificate expires in 7 days',
      description: 'Your SSL certificate will expire soon. Renew it to maintain secure connections.',
      severity: 'high',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'High memory usage',
      description: 'Memory usage is at 78%. Consider optimizing your applications.',
      severity: 'medium',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Backup failed',
      description: 'Last backup failed 2 hours ago. Check your backup configuration.',
      severity: 'medium',
    },
  ];

  const systemAlerts = alerts || defaultAlerts;
  const criticalCount = systemAlerts.filter(a => a.status === 'critical').length;

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">System Alerts</Text>
        <Text as="p" variant="bodySm">
          {criticalCount > 0
            ? \`\${criticalCount} critical alert(s) require immediate attention\`
            : 'Monitor these system notifications for optimal performance:'}
        </Text>
      </div>
      <ExceptionList items={systemAlerts} />
    </Card>
  );
}

export default SystemAlerts;`
  },

  customerfeedback: {
    react: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

function CustomerFeedback() {
  const feedback = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Delivery delay reported',
      description: 'Customer #12345 reports order #1001 is 3 days late. Check tracking information.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Wrong item received',
      description: 'Customer #67890 received wrong product. Arrange exchange or refund.',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Product damaged in transit',
      description: 'Customer #54321 reports damaged packaging. File insurance claim.',
    },
    {
      status: 'success',
      icon: 'CheckCircleIcon',
      title: 'Issue resolved',
      description: 'Customer #98765 is satisfied with resolution. Close ticket.',
    },
  ];

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Recent Customer Feedback</Text>
        <Text as="p" variant="bodySm">
          Review and respond to customer issues:
        </Text>
      </div>
      <ExceptionList items={feedback} />
    </Card>
  );
}

export default CustomerFeedback;`,

    vanilla: `import { createCard, createExceptionList } from '@cin7/vanilla-js';

// Create customer feedback card
const card = createCard({
  sectioned: true,
  children: [
    '<div style="margin-bottom: 16px;">',
    '<h3 class="polaris-text--heading-md">Recent Customer Feedback</h3>',
    '<p class="polaris-text--body-sm">Review and respond to customer issues:</p>',
    '</div>',
  ]
});

// Define customer feedback items
const feedback = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Delivery delay reported',
    description: 'Customer #12345 reports order #1001 is 3 days late. Check tracking information.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Wrong item received',
    description: 'Customer #67890 received wrong product. Arrange exchange or refund.',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Product damaged in transit',
    description: 'Customer #54321 reports damaged packaging. File insurance claim.',
  },
  {
    status: 'success',
    icon: 'check-circle',
    title: 'Issue resolved',
    description: 'Customer #98765 is satisfied with resolution. Close ticket.',
  },
];

const exceptionList = createExceptionList({ items: feedback });
card.appendChild(exceptionList);
document.getElementById('app').appendChild(card);`,

    extjs: `import { PolarisCard, PolarisExceptionList } from '@cin7/extjs-adapters';

// Create customer feedback tracking panel
Ext.create('Cin7.component.PolarisCard', {
  renderTo: Ext.getBody(),
  sectioned: true,
  items: [
    {
      xtype: 'container',
      html: '<div style="margin-bottom: 16px;">' +
            '<h3 class="polaris-text--heading-md">Recent Customer Feedback</h3>' +
            '<p class="polaris-text--body-sm">Review and respond to customer issues:</p>' +
            '</div>',
    },
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Delivery delay reported',
          description: 'Customer #12345 reports order #1001 is 3 days late. Check tracking information.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Wrong item received',
          description: 'Customer #67890 received wrong product. Arrange exchange or refund.',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Product damaged in transit',
          description: 'Customer #54321 reports damaged packaging. File insurance claim.',
        },
        {
          status: 'success',
          icon: 'CheckCircleIcon',
          title: 'Issue resolved',
          description: 'Customer #98765 is satisfied with resolution. Close ticket.',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList, Card, Text } from '@shopify/polaris';
import React from 'react';

interface CustomerFeedbackItem {
  status: 'critical' | 'warning' | 'success';
  icon: string;
  title: string;
  description: string;
  customerId?: string;
  orderId?: string;
  timestamp?: Date;
}

interface CustomerFeedbackProps {
  feedback?: CustomerFeedbackItem[];
  onResolve?: (customerId: string) => void;
  showResolved?: boolean;
}

function CustomerFeedback({
  feedback,
  onResolve,
  showResolved = true
}: CustomerFeedbackProps): JSX.Element {
  const defaultFeedback: CustomerFeedbackItem[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Delivery delay reported',
      description: 'Customer #12345 reports order #1001 is 3 days late. Check tracking information.',
      customerId: '12345',
      orderId: '1001',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Wrong item received',
      description: 'Customer #67890 received wrong product. Arrange exchange or refund.',
      customerId: '67890',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Product damaged in transit',
      description: 'Customer #54321 reports damaged packaging. File insurance claim.',
      customerId: '54321',
    },
    {
      status: 'success',
      icon: 'CheckCircleIcon',
      title: 'Issue resolved',
      description: 'Customer #98765 is satisfied with resolution. Close ticket.',
      customerId: '98765',
    },
  ];

  const feedbackItems = feedback || defaultFeedback;
  const filteredFeedback = showResolved
    ? feedbackItems
    : feedbackItems.filter(item => item.status !== 'success');

  const unresolved = filteredFeedback.filter(item => item.status !== 'success').length;

  return (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Recent Customer Feedback</Text>
        <Text as="p" variant="bodySm">
          {unresolved > 0
            ? \`\${unresolved} customer issue(s) need your attention\`
            : 'Review and respond to customer issues:'}
        </Text>
      </div>
      <ExceptionList items={filteredFeedback} />
    </Card>
  );
}

export default CustomerFeedback;`
  },

  minimal: {
    react: `import { ExceptionList } from '@shopify/polaris';
import React from 'react';

function MinimalExceptionList() {
  const items = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Action required',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Review recommended',
    },
  ];

  return (
    <div style={{ maxWidth: '400px' }}>
      <ExceptionList items={items} />
    </div>
  );
}

export default MinimalExceptionList;`,

    vanilla: `import { createExceptionList } from '@cin7/vanilla-js';

// Create minimal exception list without descriptions
const items = [
  {
    status: 'critical',
    icon: 'alert-circle',
    title: 'Action required',
  },
  {
    status: 'warning',
    icon: 'alert-circle',
    title: 'Review recommended',
  },
];

// Create and render minimal list
const container = document.createElement('div');
container.style.maxWidth = '400px';

const exceptionList = createExceptionList({ items });
container.appendChild(exceptionList);
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisExceptionList } from '@cin7/extjs-adapters';

// Create minimal exception list with titles only
Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  width: 400,
  items: [
    {
      xtype: 'cin7-exceptionlist',
      items: [
        {
          status: 'critical',
          icon: 'AlertCircleIcon',
          title: 'Action required',
        },
        {
          status: 'warning',
          icon: 'AlertCircleIcon',
          title: 'Review recommended',
        },
      ]
    }
  ]
});`,

    typescript: `import { ExceptionList } from '@shopify/polaris';
import React from 'react';

interface MinimalExceptionItem {
  status: 'critical' | 'warning' | 'success' | 'info';
  icon: string;
  title: string;
}

interface MinimalExceptionListProps {
  items?: MinimalExceptionItem[];
  maxWidth?: number;
}

function MinimalExceptionList({
  items,
  maxWidth = 400
}: MinimalExceptionListProps): JSX.Element {
  const defaultItems: MinimalExceptionItem[] = [
    {
      status: 'critical',
      icon: 'AlertCircleIcon',
      title: 'Action required',
    },
    {
      status: 'warning',
      icon: 'AlertCircleIcon',
      title: 'Review recommended',
    },
  ];

  return (
    <div style={{ maxWidth: \`\${maxWidth}px\` }}>
      <ExceptionList items={items || defaultItems} />
    </div>
  );
}

export default MinimalExceptionList;`
  }
};

// IndexTable Component Examples

export const indexTableExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { IndexTable, LegacyCard, Badge } from '@shopify/polaris';
import React from 'react';

function IndexTableExample() {
  const orders = [
    { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
    { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
    { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
  ];

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        headings={[
          { title: 'Product' },
          { title: 'SKU' },
          { title: 'Price', alignment: 'end' },
          { title: 'Stock', alignment: 'end' },
          { title: 'Status', alignment: 'center' },
        ]}
        selectable={false}
      >
        {orders.map(({ id, name, sku, price, quantity, status }, index) => (
          <IndexTable.Row id={id} key={id} position={index}>
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{sku}</IndexTable.Cell>
            <IndexTable.Cell numeric>{price.toFixed(2)}</IndexTable.Cell>
            <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
            <IndexTable.Cell>
              <Badge status={status === 'Active' ? 'success' : 'info'}>
                {status}
              </Badge>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </LegacyCard>
  );
}

export default IndexTableExample;`,

    vanilla: `import { createIndexTable, EventBus } from '@cin7/vanilla-js';

// Define table data
const tableData = {
  resourceName: { singular: 'product', plural: 'products' },
  headings: [
    { title: 'Product' },
    { title: 'SKU' },
    { title: 'Price', alignment: 'end' },
    { title: 'Stock', alignment: 'end' },
    { title: 'Status', alignment: 'center' },
  ],
  rows: [
    { id: '1020', cells: ['T-Shirt', 'TS001', '$25.00', '50', 'Active'] },
    { id: '1019', cells: ['Coffee Mug', 'CM002', '$12.00', '89', 'Active'] },
    { id: '1018', cells: ['Wireless Mouse', 'WM003', '$45.00', '0', 'Archived'] },
  ]
};

// Create and render index table
const indexTable = createIndexTable(tableData);
document.getElementById('app').appendChild(indexTable);

// Listen for selection changes
EventBus.on('indextable:selection:change', (event) => {
  console.log('Selection changed:', event.detail.selectedIds);
});`,

    extjs: `import { PolarisIndexTable } from '@cin7/extjs-adapters';

// Create IndexTable using ExtJS Grid adapter
Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  polarisAdapter: true,
  title: 'Products',
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'sku', 'price', 'quantity', 'status'],
    data: [
      { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
      { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
      { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
    ]
  }),
  columns: [
    { text: 'Product', dataIndex: 'name', flex: 1 },
    { text: 'SKU', dataIndex: 'sku', width: 120 },
    { text: 'Price', dataIndex: 'price', width: 100, align: 'right',
      renderer: function(value) { return '$' + value.toFixed(2); }
    },
    { text: 'Stock', dataIndex: 'quantity', width: 100, align: 'right' },
    { text: 'Status', dataIndex: 'status', width: 120, align: 'center' }
  ],
  selModel: {
    mode: 'MULTI'
  }
});`,

    typescript: `import { IndexTable, LegacyCard, Badge, IndexTableProps } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  status: 'Active' | 'Archived';
}

interface IndexTableExampleProps {
  products?: Product[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

function IndexTableExample({
  products,
  onSelectionChange
}: IndexTableExampleProps): JSX.Element {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const defaultProducts: Product[] = [
    { id: '1020', name: 'T-Shirt', sku: 'TS001', price: 25.00, quantity: 50, status: 'Active' },
    { id: '1019', name: 'Coffee Mug', sku: 'CM002', price: 12.00, quantity: 89, status: 'Active' },
    { id: '1018', name: 'Wireless Mouse', sku: 'WM003', price: 45.00, quantity: 0, status: 'Archived' },
  ];

  const data = products || defaultProducts;

  const resourceName = {
    singular: 'product',
    plural: 'products',
  };

  const handleSelectionChange = useCallback((ids: string[]) => {
    setSelectedIds(ids);
    onSelectionChange?.(ids);
  }, [onSelectionChange]);

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={data.length}
        selectedItemsCount={selectedIds.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: 'Product' },
          { title: 'SKU' },
          { title: 'Price', alignment: 'end' },
          { title: 'Stock', alignment: 'end' },
          { title: 'Status', alignment: 'center' },
        ]}
      >
        {data.map(({ id, name, sku, price, quantity, status }, index) => (
          <IndexTable.Row
            id={id}
            key={id}
            position={index}
            selected={selectedIds.includes(id)}
          >
            <IndexTable.Cell>{name}</IndexTable.Cell>
            <IndexTable.Cell>{sku}</IndexTable.Cell>
            <IndexTable.Cell numeric>{price.toFixed(2)}</IndexTable.Cell>
            <IndexTable.Cell numeric>{quantity}</IndexTable.Cell>
            <IndexTable.Cell>
              <Badge status={status === 'Active' ? 'success' : 'info'}>
                {status}
              </Badge>
            </IndexTable.Cell>
          </IndexTable.Row>
        ))}
      </IndexTable>
    </LegacyCard>
  );
}

export default IndexTableExample;`,
  }
};

// List Component Examples

export const listExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { List } from '@shopify/polaris';
import React from 'react';

function DefaultListExample() {
  return (
    <List>
      <List.Item>First item in the list</List.Item>
      <List.Item>Second item in the list</List.Item>
      <List.Item>Third item in the list</List.Item>
    </List>
  );
}

export default DefaultListExample;`,

    vanilla: `import { $ } from '@cin7/vanilla-js';

// Create unordered list element
const list = document.createElement('ul');
list.className = 'polaris-list';

const items = [
  'First item in the list',
  'Second item in the list',
  'Third item in the list'
];

items.forEach(itemText => {
  const li = document.createElement('li');
  li.className = 'polaris-list-item';
  li.textContent = itemText;
  list.appendChild(li);
});

document.getElementById('app').appendChild(list);`,

    extjs: `// ExtJS Panel with HTML list
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  html: \`
    <ul class="polaris-list">
      <li class="polaris-list-item">First item in the list</li>
      <li class="polaris-list-item">Second item in the list</li>
      <li class="polaris-list-item">Third item in the list</li>
    </ul>
  \`
});`,

    typescript: `import { List } from '@shopify/polaris';
import React from 'react';

interface ListItem {
  id: string;
  content: string;
}

function DefaultListExample(): JSX.Element {
  const items: ListItem[] = [
    { id: '1', content: 'First item in the list' },
    { id: '2', content: 'Second item in the list' },
    { id: '3', content: 'Third item in the list' }
  ];

  return (
    <List>
      {items.map((item) => (
        <List.Item key={item.id}>{item.content}</List.Item>
      ))}
    </List>
  );
}

export default DefaultListExample;`,
  },

  bulleted: {
    react: `import { List } from '@shopify/polaris';
import React from 'react';

function BulletedListExample() {
  return (
    <List type="bullet">
      <List.Item>Product information and specifications</List.Item>
      <List.Item>Customer reviews and ratings</List.Item>
      <List.Item>Shipping and delivery details</List.Item>
      <List.Item>Return policy and warranty information</List.Item>
    </List>
  );
}

export default BulletedListExample;`,

    vanilla: `import { $ } from '@cin7/vanilla-js';

// Create bulleted list
const list = document.createElement('ul');
list.className = 'polaris-list polaris-list--type-bullet';

const items = [
  'Product information and specifications',
  'Customer reviews and ratings',
  'Shipping and delivery details',
  'Return policy and warranty information'
];

items.forEach(itemText => {
  const li = document.createElement('li');
  li.className = 'polaris-list-item';
  li.textContent = itemText;
  list.appendChild(li);
});

document.getElementById('app').appendChild(list);`,

    extjs: `// ExtJS Panel with bulleted list
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  html: \`
    <ul class="polaris-list polaris-list--type-bullet">
      <li class="polaris-list-item">Product information and specifications</li>
      <li class="polaris-list-item">Customer reviews and ratings</li>
      <li class="polaris-list-item">Shipping and delivery details</li>
      <li class="polaris-list-item">Return policy and warranty information</li>
    </ul>
  \`
});`,

    typescript: `import { List } from '@shopify/polaris';
import React from 'react';

interface ProductInfo {
  id: string;
  text: string;
}

function BulletedListExample(): JSX.Element {
  const productInfo: ProductInfo[] = [
    { id: '1', text: 'Product information and specifications' },
    { id: '2', text: 'Customer reviews and ratings' },
    { id: '3', text: 'Shipping and delivery details' },
    { id: '4', text: 'Return policy and warranty information' }
  ];

  return (
    <List type="bullet">
      {productInfo.map((info) => (
        <List.Item key={info.id}>{info.text}</List.Item>
      ))}
    </List>
  );
}

export default BulletedListExample;`,
  },

  numbered: {
    react: `import { List } from '@shopify/polaris';
import React from 'react';

function NumberedListExample() {
  return (
    <List type="number">
      <List.Item>Set up your store preferences</List.Item>
      <List.Item>Add your first product</List.Item>
      <List.Item>Configure payment settings</List.Item>
      <List.Item>Launch your store</List.Item>
    </List>
  );
}

export default NumberedListExample;`,

    vanilla: `import { $ } from '@cin7/vanilla-js';

// Create numbered list
const list = document.createElement('ol');
list.className = 'polaris-list polaris-list--type-number';

const steps = [
  'Set up your store preferences',
  'Add your first product',
  'Configure payment settings',
  'Launch your store'
];

steps.forEach(stepText => {
  const li = document.createElement('li');
  li.className = 'polaris-list-item';
  li.textContent = stepText;
  list.appendChild(li);
});

document.getElementById('app').appendChild(list);`,

    extjs: `// ExtJS Panel with numbered list
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  html: \`
    <ol class="polaris-list polaris-list--type-number">
      <li class="polaris-list-item">Set up your store preferences</li>
      <li class="polaris-list-item">Add your first product</li>
      <li class="polaris-list-item">Configure payment settings</li>
      <li class="polaris-list-item">Launch your store</li>
    </ol>
  \`
});`,

    typescript: `import { List } from '@shopify/polaris';
import React from 'react';

interface SetupStep {
  id: string;
  step: string;
  order: number;
}

function NumberedListExample(): JSX.Element {
  const setupSteps: SetupStep[] = [
    { id: '1', step: 'Set up your store preferences', order: 1 },
    { id: '2', step: 'Add your first product', order: 2 },
    { id: '3', step: 'Configure payment settings', order: 3 },
    { id: '4', step: 'Launch your store', order: 4 }
  ];

  return (
    <List type="number">
      {setupSteps.map((stepItem) => (
        <List.Item key={stepItem.id}>{stepItem.step}</List.Item>
      ))}
    </List>
  );
}

export default NumberedListExample;`,
  },

  withIcons: {
    react: `import { List } from '@shopify/polaris';
import {
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  ExternalIcon
} from '@shopify/polaris-icons';
import React from 'react';

function WithIconsListExample() {
  return (
    <List>
      <List.Item icon={CheckCircleIcon}>Task completed successfully</List.Item>
      <List.Item icon={AlertCircleIcon}>Warning: Review this item</List.Item>
      <List.Item icon={InfoIcon}>Additional information available</List.Item>
      <List.Item icon={ExternalIcon}>External link to resource</List.Item>
    </List>
  );
}

export default WithIconsListExample;`,

    vanilla: `import { $, createElement } from '@cin7/vanilla-js';

// Create list with icon elements
const list = document.createElement('ul');
list.className = 'polaris-list';

const items = [
  { icon: '✓', text: 'Task completed successfully', iconColor: '#2a6f3a' },
  { icon: '⚠', text: 'Warning: Review this item', iconColor: '#f59e0b' },
  { icon: 'ℹ', text: 'Additional information available', iconColor: '#3b82f6' },
  { icon: '↗', text: 'External link to resource', iconColor: '#6b7280' }
];

items.forEach(item => {
  const li = document.createElement('li');
  li.className = 'polaris-list-item';

  const iconSpan = document.createElement('span');
  iconSpan.style.color = item.iconColor;
  iconSpan.style.marginRight = '8px';
  iconSpan.textContent = item.icon;

  li.appendChild(iconSpan);
  li.appendChild(document.createTextNode(item.text));
  list.appendChild(li);
});

document.getElementById('app').appendChild(list);`,

    extjs: `// ExtJS Panel with icon list
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  html: \`
    <ul class="polaris-list">
      <li class="polaris-list-item">
        <span class="polaris-icon" style="color: #2a6f3a;">✓</span>
        Task completed successfully
      </li>
      <li class="polaris-list-item">
        <span class="polaris-icon" style="color: #f59e0b;">⚠</span>
        Warning: Review this item
      </li>
      <li class="polaris-list-item">
        <span class="polaris-icon" style="color: #3b82f6;">ℹ</span>
        Additional information available
      </li>
      <li class="polaris-list-item">
        <span class="polaris-icon" style="color: #6b7280;">↗</span>
        External link to resource
      </li>
    </ul>
  \`
});`,

    typescript: `import { List } from '@shopify/polaris';
import {
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
  ExternalIcon
} from '@shopify/polaris-icons';
import React from 'react';

interface IconListItem {
  id: string;
  icon: React.ComponentType;
  text: string;
  status: 'success' | 'warning' | 'info' | 'default';
}

function WithIconsListExample(): JSX.Element {
  const items: IconListItem[] = [
    { id: '1', icon: CheckCircleIcon, text: 'Task completed successfully', status: 'success' },
    { id: '2', icon: AlertCircleIcon, text: 'Warning: Review this item', status: 'warning' },
    { id: '3', icon: InfoIcon, text: 'Additional information available', status: 'info' },
    { id: '4', icon: ExternalIcon, text: 'External link to resource', status: 'default' }
  ];

  return (
    <List>
      {items.map((item) => (
        <List.Item key={item.id} icon={item.icon}>
          {item.text}
        </List.Item>
      ))}
    </List>
  );
}

export default WithIconsListExample;`,
  },

  withBadges: {
    react: `import { List, Badge, InlineStack, Text } from '@shopify/polaris';
import React from 'react';

function WithBadgesListExample() {
  return (
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
  );
}

export default WithBadgesListExample;`,

    vanilla: `import { $, createElement } from '@cin7/vanilla-js';

// Create list with badge elements
const list = document.createElement('ul');
list.className = 'polaris-list';

const orders = [
  { order: '#1020', status: 'Fulfilled', statusClass: 'success' },
  { order: '#1019', status: 'Processing', statusClass: 'attention' },
  { order: '#1018', status: 'Issue detected', statusClass: 'critical' }
];

orders.forEach(item => {
  const li = document.createElement('li');
  li.className = 'polaris-list-item';
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.gap = '12px';

  const text = document.createElement('span');
  text.textContent = \`Order \${item.order}\`;

  const badge = document.createElement('span');
  badge.className = \`polaris-badge polaris-badge--\${item.statusClass}\`;
  badge.textContent = item.status;

  li.appendChild(text);
  li.appendChild(badge);
  list.appendChild(li);
});

document.getElementById('app').appendChild(list);`,

    extjs: `// ExtJS Panel with badge list
Ext.create('Ext.panel.Panel', {
  renderTo: Ext.getBody(),
  bodyPadding: 10,
  html: \`
    <ul class="polaris-list">
      <li class="polaris-list-item" style="display: flex; gap: 12px;">
        <span>Order #1020</span>
        <span class="polaris-badge polaris-badge--success">Fulfilled</span>
      </li>
      <li class="polaris-list-item" style="display: flex; gap: 12px;">
        <span>Order #1019</span>
        <span class="polaris-badge polaris-badge--attention">Processing</span>
      </li>
      <li class="polaris-list-item" style="display: flex; gap: 12px;">
        <span>Order #1018</span>
        <span class="polaris-badge polaris-badge--critical">Issue detected</span>
      </li>
    </ul>
  \`
});`,

    typescript: `import { List, Badge, InlineStack, Text } from '@shopify/polaris';
import React from 'react';

interface OrderItem {
  id: string;
  orderNumber: string;
  status: 'success' | 'attention' | 'critical';
  statusLabel: string;
}

function WithBadgesListExample(): JSX.Element {
  const orders: OrderItem[] = [
    { id: '1', orderNumber: '#1020', status: 'success', statusLabel: 'Fulfilled' },
    { id: '2', orderNumber: '#1019', status: 'attention', statusLabel: 'Processing' },
    { id: '3', orderNumber: '#1018', status: 'critical', statusLabel: 'Issue detected' }
  ];

  return (
    <List>
      {orders.map((order) => (
        <List.Item key={order.id}>
          <InlineStack gap="200">
            <Text as="span">Order {order.orderNumber}</Text>
            <Badge status={order.status}>{order.statusLabel}</Badge>
          </InlineStack>
        </List.Item>
      ))}
    </List>
  );
}

export default WithBadgesListExample;`,
  }
};

// ResourceItem Component Examples

export const resourceItemExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ResourceItem, ResourceList, Card } from '@shopify/polaris';
import React from 'react';

function ResourceItemExample() {
  const product = {
    id: '1',
    name: 'Basic T-Shirt',
    sku: 'TSHIRT-BASIC-001',
    price: '$29.99',
    stock: 50,
  };

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: 'product', plural: 'products' }}
        items={[product]}
        renderItem={(item) => (
          <ResourceItem
            id={item.id}
            name={item.name}
            accessibilityLabel={\`View details for \${item.name}\`}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{item.name}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>SKU: {item.sku}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '500' }}>{item.price}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>{item.stock} in stock</div>
              </div>
            </div>
          </ResourceItem>
        )}
      />
    </Card>
  );
}

export default ResourceItemExample;`,

    vanilla: `import { createResourceItem, EventBus } from '@cin7/vanilla-js';

// Define resource item
const product = {
  id: '1',
  name: 'Basic T-Shirt',
  sku: 'TSHIRT-BASIC-001',
  price: '$29.99',
  stock: 50,
};

// Create resource item
const resourceItem = createResourceItem({
  id: product.id,
  name: product.name,
  content: \`
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-weight: 500; margin-bottom: 4px;">\\\${product.name}</div>
        <div style="color: #6b7280; font-size: 14px;">SKU: \\\${product.sku}</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 500;">\\\${product.price}</div>
        <div style="color: #6b7280; font-size: 14px;">\\\${product.stock} in stock</div>
      </div>
    </div>
  \`,
  accessibilityLabel: \`View details for \\\${product.name}\`
});

document.getElementById('app').appendChild(resourceItem);

// Listen for item click
EventBus.on('resourceitem:click', (event) => {
  console.log('Resource item clicked:', event.detail.id);
});`,

    extjs: `import { PolarisResourceItem } from '@cin7/extjs-adapters';

// Create ResourceItem using ExtJS dataview
Ext.create('Ext.view.View', {
  renderTo: Ext.getBody(),
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'sku', 'price', 'stock'],
    data: [{
      id: '1',
      name: 'Basic T-Shirt',
      sku: 'TSHIRT-BASIC-001',
      price: '$29.99',
      stock: 50
    }]
  }),
  tpl: [
    '<tpl for=".">',
    '<div class="resource-item" data-id="{id}">',
    '  <div style="display: flex; justify-content: space-between; align-items: center;">',
    '    <div>',
    '      <div style="font-weight: 500; margin-bottom: 4px;">{name}</div>',
    '      <div style="color: #6b7280; font-size: 14px;">SKU: {sku}</div>',
    '    </div>',
    '    <div style="text-align: right;">',
    '      <div style="font-weight: 500;">{price}</div>',
    '      <div style="color: #6b7280; font-size: 14px;">{stock} in stock</div>',
    '    </div>',
    '  </div>',
    '</div>',
    '</tpl>'
  ],
  itemSelector: 'div.resource-item',
  listeners: {
    itemclick: function(view, record) {
      console.log('Resource item clicked:', record.getData());
    }
  }
});`,

    typescript: `import { ResourceItem, ResourceList, Card } from '@shopify/polaris';
import React from 'react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: string;
  stock: number;
}

interface ResourceItemExampleProps {
  product?: Product;
  onItemClick?: (id: string) => void;
}

function ResourceItemExample({
  product,
  onItemClick
}: ResourceItemExampleProps): JSX.Element {
  const defaultProduct: Product = {
    id: '1',
    name: 'Basic T-Shirt',
    sku: 'TSHIRT-BASIC-001',
    price: '$29.99',
    stock: 50,
  };

  const item = product || defaultProduct;

  const handleClick = () => {
    onItemClick?.(item.id);
  };

  return (
    <Card>
      <ResourceList
        resourceName={{ singular: 'product', plural: 'products' }}
        items={[item]}
        renderItem={(product) => (
          <ResourceItem
            id={product.id}
            name={product.name}
            accessibilityLabel={\`View details for \\\${product.name}\`}
            onClick={handleClick}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{product.name}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>SKU: {product.sku}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '500' }}>{product.price}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>{product.stock} in stock</div>
              </div>
            </div>
          </ResourceItem>
        )}
      />
    </Card>
  );
}

export default ResourceItemExample;`,
  }
};

// ResourceList Component Examples

export const resourceListExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ResourceList, Card, Thumbnail, Text, Badge } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function ResourceListExample() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const products = [
    {
      id: '1',
      name: 'Basic T-Shirt',
      description: 'Comfortable cotton t-shirt in various colors',
      price: 25.00,
      status: 'Active',
      stock: 150,
      image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
    },
    {
      id: '2',
      name: 'Coffee Mug',
      description: 'Ceramic mug with modern design',
      price: 12.00,
      status: 'Active',
      stock: 89,
      image: 'https://picsum.photos/seed/mug/100/100.jpg',
    },
  ];

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
  }, []);

  return (
    <ResourceList
      resourceName={{ singular: 'product', plural: 'products' }}
      items={products}
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
      renderItem={(item) => {
        const { id, name, description, price, status, stock, image } = item;
        const media = <Thumbnail size="small" alt={name} source={image} />;
        const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

        return (
          <ResourceList.Item
            id={id}
            media={media}
            accessibilityLabel={\`View details for \${name}\`}
          >
            <div style={{ flex: 1 }}>
              <Text variant="bodyMd" fontWeight="semibold" as="h3">
                {name}
              </Text>
              <Text color="subdued" as="p">
                {description}
              </Text>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                <Text variant="bodyMd" fontWeight="medium">
                  {price.toFixed(2)}
                </Text>
                {statusBadge}
                <Text color="subdued" variant="bodySm">
                  {stock} in stock
                </Text>
              </div>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default ResourceListExample;`,

    vanilla: `import { createResourceList, EventBus } from '@cin7/vanilla-js';

// Define resource list data
const products = [
  {
    id: '1',
    name: 'Basic T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 25.00,
    status: 'Active',
    stock: 150,
    image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
  },
  {
    id: '2',
    name: 'Coffee Mug',
    description: 'Ceramic mug with modern design',
    price: 12.00,
    status: 'Active',
    stock: 89,
    image: 'https://picsum.photos/seed/mug/100/100.jpg',
  },
];

// Create resource list
const resourceList = createResourceList({
  resourceName: { singular: 'product', plural: 'products' },
  items: products,
  renderItem: (item) => {
    return \`
      <div class="resource-item" data-id="\${item.id}">
        <img src="\${item.image}" alt="\${item.name}" class="resource-item-image" />
        <div class="resource-item-content">
          <h3 class="resource-item-title">\${item.name}</h3>
          <p class="resource-item-description">\${item.description}</p>
          <div class="resource-item-meta">
            <span class="resource-item-price">$\${item.price.toFixed(2)}</span>
            <span class="resource-item-status badge-\${item.status.toLowerCase()}">\${item.status}</span>
            <span class="resource-item-stock">\${item.stock} in stock</span>
          </div>
        </div>
      </div>
    \`;
  }
});

document.getElementById('app').appendChild(resourceList);

// Listen for selection changes
EventBus.on('resourcelist:selection:change', (event) => {
  console.log('Selection changed:', event.detail.selectedIds);
});`,

    extjs: `import { PolarisResourceList } from '@cin7/extjs-adapters';

// Create ResourceList using ExtJS Grid
Ext.create('Ext.grid.Panel', {
  renderTo: Ext.getBody(),
  width: 800,
  height: 400,
  title: 'Products',
  polarisAdapter: true,
  store: Ext.create('Ext.data.Store', {
    fields: ['id', 'name', 'description', 'price', 'status', 'stock', 'image'],
    data: [
      {
        id: '1',
        name: 'Basic T-Shirt',
        description: 'Comfortable cotton t-shirt in various colors',
        price: 25.00,
        status: 'Active',
        stock: 150,
        image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
      },
      {
        id: '2',
        name: 'Coffee Mug',
        description: 'Ceramic mug with modern design',
        price: 12.00,
        status: 'Active',
        stock: 89,
        image: 'https://picsum.photos/seed/mug/100/100.jpg',
      },
    ]
  }),
  columns: [
    {
      text: 'Product',
      dataIndex: 'name',
      flex: 1,
      renderer: function(value, metaData, record) {
        return \`
          <div style="display: flex; align-items: center; gap: 12px;">
            <img src="\${record.get('image')}" alt="\${value}" style="width: 40px; height: 40px; border-radius: 4px;" />
            <div>
              <div style="font-weight: 500;">\${value}</div>
              <div style="color: #6b7280; font-size: 13px;">\${record.get('description')}</div>
            </div>
          </div>
        \`;
      }
    },
    {
      text: 'Price',
      dataIndex: 'price',
      width: 100,
      align: 'right',
      renderer: function(value) { return '$' + value.toFixed(2); }
    },
    { text: 'Stock', dataIndex: 'stock', width: 100, align: 'right' },
    {
      text: 'Status',
      dataIndex: 'status',
      width: 120,
      renderer: function(value) {
        const color = value === 'Active' ? 'success' : 'info';
        return \`<span class="badge-\${color}">\${value}</span>\`;
      }
    }
  ],
  selModel: {
    mode: 'MULTI',
    checkOnly: true
  },
  listeners: {
    selectionchange: function(selModel, selected) {
      console.log('Selection changed:', selected.map(r => r.getId()));
    }
  }
});`,

    typescript: `import { ResourceList, Card, Thumbnail, Text, Badge } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: 'Active' | 'Archived';
  stock: number;
  image: string;
}

interface ResourceListExampleProps {
  products?: Product[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

function ResourceListExample({
  products,
  onSelectionChange
}: ResourceListExampleProps): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Basic T-Shirt',
      description: 'Comfortable cotton t-shirt in various colors',
      price: 25.00,
      status: 'Active',
      stock: 150,
      image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
    },
    {
      id: '2',
      name: 'Coffee Mug',
      description: 'Ceramic mug with modern design',
      price: 12.00,
      status: 'Active',
      stock: 89,
      image: 'https://picsum.photos/seed/mug/100/100.jpg',
    },
  ];

  const items = products || defaultProducts;

  const handleSelectionChange = useCallback((selectedIds: string[]) => {
    setSelectedItems(selectedIds);
    onSelectionChange?.(selectedIds);
  }, [onSelectionChange]);

  return (
    <ResourceList
      resourceName={{ singular: 'product', plural: 'products' }}
      items={items}
      selectedItems={selectedItems}
      onSelectionChange={handleSelectionChange}
      renderItem={(item) => {
        const { id, name, description, price, status, stock, image } = item;
        const media = <Thumbnail size="small" alt={name} source={image} />;
        const statusBadge = <Badge status={status === 'Active' ? 'success' : 'info'}>{status}</Badge>;

        return (
          <ResourceList.Item
            id={id}
            media={media}
            accessibilityLabel={\`View details for \${name}\`}
          >
            <div style={{ flex: 1 }}>
              <Text variant="bodyMd" fontWeight="semibold" as="h3">
                {name}
              </Text>
              <Text color="subdued" as="p">
                {description}
              </Text>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                <Text variant="bodyMd" fontWeight="medium">
                  {price.toFixed(2)}
                </Text>
                {statusBadge}
                <Text color="subdued" variant="bodySm">
                  {stock} in stock
                </Text>
              </div>
            </div>
          </ResourceList.Item>
        );
      }}
    />
  );
}

export default ResourceListExample;`,
  }
};


// CalloutCard Component Examples

export const imageExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Image } from '@shopify/polaris';
import React from 'react';

function ImageExample() {
  return (
    <Image
      source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
      alt="Mountain landscape with lake"
      width="400px"
      height="300px"
    />
  );
}

export default ImageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="image-container">
  <img
    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
    alt="Mountain landscape with lake"
    class="polaris-image"
    width="400"
    height="300"
    loading="lazy"
  />
</div>

<style>
.image-container {
  display: inline-block;
  position: relative;
}

.polaris-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--border-radius-base);
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js for lazy loading
import { createImage } from '@cin7/vanilla-js';

const image = createImage({
  src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  alt: 'Mountain landscape with lake',
  width: 400,
  height: 300,
  lazy: true,
  onLoad: () => {
    console.log('Image loaded successfully');
  },
  onError: () => {
    console.error('Image failed to load');
  }
});

document.getElementById('app').appendChild(image);
</script>`,

    extjs: `// ExtJS Image Component
Ext.create('Ext.Img', {
  src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  alt: 'Mountain landscape with lake',
  width: 400,
  height: 300,
  renderTo: Ext.getBody(),
  listeners: {
    load: function() {
      console.log('Image loaded successfully');
    },
    error: function() {
      console.error('Image failed to load');
    }
  }
});

// Or using Polaris adapter with responsive srcset
import { PolarisImage } from '@cin7/extjs-adapters';

const image = Ext.create('PolarisImage', {
  src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  alt: 'Mountain landscape with lake',
  width: 400,
  height: 300,
  aspectRatio: '4/3',
  border: 'rounded',
  srcSet: [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop 400w',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop 800w',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&h=900&fit=crop 1200w'
  ].join(', '),
  sizes: '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px'
});`,

    typescript: `import { Image, ImageProps } from '@shopify/polaris';
import React, { useState } from 'react';

interface ImageExampleProps {
  source: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/2' | '2/1';
  border?: 'none' | 'base' | 'rounded' | 'large' | 'full';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

function ImageExample({
  source,
  alt,
  width = '400px',
  height = '300px',
  aspectRatio,
  border = 'rounded',
  loading = 'lazy',
  onLoad,
  onError
}: ImageExampleProps): JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className="image-wrapper">
      <Image
        source={source}
        alt={alt}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        border={border}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
      {hasError && (
        <div className="image-error">Failed to load image</div>
      )}
    </div>
  );
}

export default ImageExample;`,
  }
};

// Breadcrumbs Component Examples
