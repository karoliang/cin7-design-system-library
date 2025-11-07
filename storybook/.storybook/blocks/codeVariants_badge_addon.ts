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

// State management
let activeBadge = 'all';
let unreadCount = 5;
const tasks = [
  { id: 1, status: 'complete', label: 'Setup account' },
  { id: 2, status: 'complete', label: 'Add payment method' },
  { id: 3, status: 'incomplete', label: 'Verify email' }
];

// Create main container
const container = document.createElement('div');
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.gap = '24px';
container.style.maxWidth = '500px';

// Filter Messages Section
const filterSection = document.createElement('div');
const filterTitle = document.createElement('h3');
filterTitle.textContent = 'Filter Messages';
filterTitle.style.margin = '0 0 12px 0';
filterSection.appendChild(filterTitle);

const filterButtons = document.createElement('div');
filterButtons.style.display = 'flex';
filterButtons.style.gap = '8px';

const allButton = document.createElement('button');
allButton.textContent = 'All';
allButton.className = 'polaris-button polaris-button--primary';

const unreadButton = document.createElement('button');
unreadButton.textContent = \`Unread \${unreadCount}\`;
unreadButton.className = 'polaris-button';

filterButtons.appendChild(allButton);
filterButtons.appendChild(unreadButton);
filterSection.appendChild(filterButtons);

container.appendChild(filterSection);
document.getElementById('app').appendChild(container);`,

    extjs: `import { PolarisBadge, PolarisButton } from '@cin7/extjs-adapters';

// Create interactive badges panel
const panel = Ext.create('Ext.panel.Panel', {
  title: 'Interactive Badges',
  width: 500,
  layout: 'vbox',
  renderTo: Ext.getBody(),
  items: [
    {
      xtype: 'component',
      html: '<h3>Filter Messages</h3>'
    },
    {
      xtype: 'container',
      layout: 'hbox',
      items: [
        { xtype: 'polarisbutton', text: 'All', variant: 'primary' },
        { xtype: 'polarisbutton', text: 'Unread', margin: '0 0 0 8' }
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

export default InteractiveBadgesExample;`
  }
