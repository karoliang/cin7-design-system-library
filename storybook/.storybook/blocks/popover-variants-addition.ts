// POPOVER CODE VARIANTS TO ADD TO codeVariants.ts
// Add these variants to the popoverExamples object (after the default variant)

  buttonActivator: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function ButtonActivatorExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Open Popover
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text as="p">
          This popover is triggered by a button click. It contains simple text content.
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default ButtonActivatorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="popoverBtn">Open Popover</button>
  <div class="popover-content" id="popoverContent" style="display: none;">
    <div class="popover-section">
      <p>This popover is triggered by a button click. It contains simple text content.</p>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 300px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section { padding: 16px; }
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('popoverBtn');
const content = document.getElementById('popoverContent');

button.addEventListener('click', () => togglePopover(content));
onClickOutside([button, content], () => content.style.display = 'none');
</script>`,

    extjs: `// ExtJS Button with Popover Panel
const popoverPanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 300,
  bodyPadding: 16,
  html: 'This popover is triggered by a button click. It contains simple text content.',
  border: true,
  shadow: true
});

Ext.create('Ext.button.Button', {
  text: 'Open Popover',
  handler: function(btn) {
    popoverPanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface ButtonActivatorPopoverProps {
  buttonLabel?: string;
  content: string;
  preferredPosition?: PopoverProps['preferredPosition'];
}

function ButtonActivatorPopover({
  buttonLabel = 'Open Popover',
  content,
  preferredPosition = 'below'
}: ButtonActivatorPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{buttonLabel}</Button>}
      onClose={toggleActive}
      preferredPosition={preferredPosition}
    >
      <Popover.Section>
        <Text as="p">{content}</Text>
      </Popover.Section>
    </Popover>
  );
}

export default ButtonActivatorPopover;`
  },

  textLinkActivator: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function TextLinkActivatorExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button plain onClick={toggleActive}>
      View details
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text as="p">
          This popover is triggered by a text link. It's useful for showing
          additional context or options without disrupting the flow.
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default TextLinkActivatorExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <a href="#" class="text-link" id="textLink">View details</a>
  <div class="popover-content" id="linkPopover" style="display: none;">
    <div class="popover-section">
      <p>This popover is triggered by a text link. It's useful for showing
      additional context or options without disrupting the flow.</p>
    </div>
  </div>
</div>

<style>
.text-link { color: #2c6ecb; text-decoration: none; cursor: pointer; }
.text-link:hover { text-decoration: underline; }
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 300px; max-width: 400px;
  background: white; border: 1px solid #e1e3e5;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section { padding: 16px; }
</style>

<script>
import { createPopover } from '@cin7/vanilla-js';

const link = document.getElementById('textLink');
const popover = document.getElementById('linkPopover');

link.addEventListener('click', (e) => {
  e.preventDefault();
  popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('click', (e) => {
  if (!link.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Text Link with Tip
const tip = Ext.create('Ext.tip.ToolTip', {
  width: 300,
  html: 'This popover is triggered by a text link. It\\'s useful for showing additional context.',
  dismissDelay: 0,
  anchor: 'top'
});

Ext.create('Ext.Component', {
  html: '<a href="#" class="text-link">View details</a>',
  renderTo: Ext.getBody(),
  listeners: {
    afterrender: function(cmp) {
      const link = cmp.el.down('a');
      link.on('click', function(e) {
        e.preventDefault();
        tip.showBy(link);
      });
    }
  }
});`,

    typescript: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface TextLinkPopoverProps {
  linkText: string;
  content: string;
  maxWidth?: number;
}

function TextLinkPopover({
  linkText,
  content,
  maxWidth = 400
}: TextLinkPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Popover
      active={active}
      activator={<Button plain onClick={toggleActive}>{linkText}</Button>}
      onClose={toggleActive}
    >
      <Popover.Section>
        <div style={{ maxWidth: \`\${maxWidth}px\` }}>
          <Text as="p">{content}</Text>
        </div>
      </Popover.Section>
    </Popover>
  );
}

export default TextLinkPopover;`
  },

  positions: {
    react: `import { Popover, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function PopoverPositionsExample() {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const togglePopover = (popoverName: string) => {
    setActivePopover(activePopover === popoverName ? null : popoverName);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Popover
          active={activePopover === 'above-left'}
          activator={<Button onClick={() => togglePopover('above-left')}>Above Left</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="left"
          preferredPosition="above"
        >
          <Popover.Section>Appears above, aligned left</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'above-center'}
          activator={<Button onClick={() => togglePopover('above-center')}>Above Center</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="center"
          preferredPosition="above"
        >
          <Popover.Section>Appears above, centered</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'above-right'}
          activator={<Button onClick={() => togglePopover('above-right')}>Above Right</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="right"
          preferredPosition="above"
        >
          <Popover.Section>Appears above, aligned right</Popover.Section>
        </Popover>
      </div>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Popover
          active={activePopover === 'below-left'}
          activator={<Button onClick={() => togglePopover('below-left')}>Below Left</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="left"
          preferredPosition="below"
        >
          <Popover.Section>Appears below, aligned left</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'below-center'}
          activator={<Button onClick={() => togglePopover('below-center')}>Below Center</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="center"
          preferredPosition="below"
        >
          <Popover.Section>Appears below, centered</Popover.Section>
        </Popover>

        <Popover
          active={activePopover === 'below-right'}
          activator={<Button onClick={() => togglePopover('below-right')}>Below Right</Button>}
          onClose={() => setActivePopover(null)}
          preferredAlignment="right"
          preferredPosition="below"
        >
          <Popover.Section>Appears below, aligned right</Popover.Section>
        </Popover>
      </div>
    </div>
  );
}

export default PopoverPositionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="positions-demo">
  <div class="button-row">
    <div class="popover-wrapper" data-position="above-left">
      <button class="polaris-button">Above Left</button>
      <div class="popover-content popover-above align-left" style="display: none;">
        Appears above, aligned left
      </div>
    </div>
    <div class="popover-wrapper" data-position="above-center">
      <button class="polaris-button">Above Center</button>
      <div class="popover-content popover-above align-center" style="display: none;">
        Appears above, centered
      </div>
    </div>
    <div class="popover-wrapper" data-position="above-right">
      <button class="polaris-button">Above Right</button>
      <div class="popover-content popover-above align-right" style="display: none;">
        Appears above, aligned right
      </div>
    </div>
  </div>

  <div class="button-row" style="margin-top: 100px;">
    <div class="popover-wrapper" data-position="below-left">
      <button class="polaris-button">Below Left</button>
      <div class="popover-content popover-below align-left" style="display: none;">
        Appears below, aligned left
      </div>
    </div>
    <div class="popover-wrapper" data-position="below-center">
      <button class="polaris-button">Below Center</button>
      <div class="popover-content popover-below align-center" style="display: none;">
        Appears below, centered
      </div>
    </div>
    <div class="popover-wrapper" data-position="below-right">
      <button class="polaris-button">Below Right</button>
      <div class="popover-content popover-below align-right" style="display: none;">
        Appears below, aligned right
      </div>
    </div>
  </div>
</div>

<style>
.positions-demo { padding: 40px; }
.button-row { display: flex; gap: 20px; justify-content: center; }
.popover-wrapper { position: relative; }
.popover-content {
  position: absolute; z-index: 1000; padding: 12px 16px;
  background: white; border: 1px solid #e1e3e5;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  min-width: 200px; white-space: nowrap;
}
.popover-above { bottom: 100%; margin-bottom: 8px; }
.popover-below { top: 100%; margin-top: 8px; }
.align-left { left: 0; }
.align-center { left: 50%; transform: translateX(-50%); }
.align-right { right: 0; }
</style>

<script>
import { positionPopover, onClickOutside } from '@cin7/vanilla-js';

document.querySelectorAll('.popover-wrapper').forEach(wrapper => {
  const button = wrapper.querySelector('button');
  const popover = wrapper.querySelector('.popover-content');

  button.addEventListener('click', () => {
    document.querySelectorAll('.popover-content').forEach(p => {
      if (p !== popover) p.style.display = 'none';
    });
    popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
  });
});

onClickOutside(document.querySelectorAll('.popover-wrapper'), () => {
  document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
});
</script>`,

    extjs: `// ExtJS Popover with Different Alignments
const positions = [
  { text: 'Above Left', align: 'tl-bl', content: 'Appears above, aligned left' },
  { text: 'Above Center', align: 't-b', content: 'Appears above, centered' },
  { text: 'Above Right', align: 'tr-br', content: 'Appears above, aligned right' },
  { text: 'Below Left', align: 'bl-tl', content: 'Appears below, aligned left' },
  { text: 'Below Center', align: 'b-t', content: 'Appears below, centered' },
  { text: 'Below Right', align: 'br-tr', content: 'Appears below, aligned right' }
];

positions.forEach(pos => {
  const tip = Ext.create('Ext.tip.ToolTip', {
    html: pos.content,
    anchor: pos.align,
    dismissDelay: 0
  });

  Ext.create('Ext.button.Button', {
    text: pos.text,
    margin: '10 10 10 10',
    handler: function(btn) {
      tip.showBy(btn, pos.align);
    },
    renderTo: Ext.getBody()
  });
});`,

    typescript: `import { Popover, Button, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

type PopoverPosition = {
  id: string;
  label: string;
  alignment: PopoverProps['preferredAlignment'];
  position: PopoverProps['preferredPosition'];
  description: string;
};

function PopoverPositionsExample(): JSX.Element {
  const [activePopover, setActivePopover] = useState<string | null>(null);

  const togglePopover = useCallback((popoverId: string) => {
    setActivePopover((current) => current === popoverId ? null : popoverId);
  }, []);

  const positions: PopoverPosition[] = [
    { id: 'above-left', label: 'Above Left', alignment: 'left', position: 'above', description: 'Appears above, aligned left' },
    { id: 'above-center', label: 'Above Center', alignment: 'center', position: 'above', description: 'Appears above, centered' },
    { id: 'above-right', label: 'Above Right', alignment: 'right', position: 'above', description: 'Appears above, aligned right' },
    { id: 'below-left', label: 'Below Left', alignment: 'left', position: 'below', description: 'Appears below, aligned left' },
    { id: 'below-center', label: 'Below Center', alignment: 'center', position: 'below', description: 'Appears below, centered' },
    { id: 'below-right', label: 'Below Right', alignment: 'right', position: 'below', description: 'Appears below, aligned right' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '100px' }}>
      {[positions.slice(0, 3), positions.slice(3, 6)].map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
          {row.map((pos) => (
            <Popover
              key={pos.id}
              active={activePopover === pos.id}
              activator={<Button onClick={() => togglePopover(pos.id)}>{pos.label}</Button>}
              onClose={() => setActivePopover(null)}
              preferredAlignment={pos.alignment}
              preferredPosition={pos.position}
            >
              <Popover.Section>{pos.description}</Popover.Section>
            </Popover>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PopoverPositionsExample;`
  },

  withActionList: {
    react: `import { Popover, Button, ActionList } from '@shopify/polaris';
import React, { useState } from 'react';

function PopoverWithActionListExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Actions
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'View product details',
            icon: 'ViewIcon',
            onAction: toggleActive,
          },
          {
            content: 'Edit product',
            icon: 'EditIcon',
            onAction: toggleActive,
          },
          {
            content: 'Duplicate product',
            icon: 'DuplicateIcon',
            onAction: toggleActive,
          },
          {
            content: 'Delete product',
            icon: 'DeleteIcon',
            destructive: true,
            onAction: toggleActive,
          },
        ]}
      />
    </Popover>
  );
}

export default PopoverWithActionListExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="actionsBtn">Actions ▼</button>
  <div class="popover-content" id="actionsPopover" style="display: none;">
    <div class="action-list">
      <button class="action-item" data-action="view">
        <span class="icon">👁️</span> View product details
      </button>
      <button class="action-item" data-action="edit">
        <span class="icon">✏️</span> Edit product
      </button>
      <button class="action-item" data-action="duplicate">
        <span class="icon">📋</span> Duplicate product
      </button>
      <div class="action-divider"></div>
      <button class="action-item destructive" data-action="delete">
        <span class="icon">🗑️</span> Delete product
      </button>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 220px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.action-list { padding: 8px; }
.action-item {
  display: flex; align-items: center; gap: 8px; width: 100%;
  padding: 10px 12px; border: none; background: transparent;
  text-align: left; cursor: pointer; border-radius: 6px;
  font-size: 14px; transition: background 0.2s;
}
.action-item:hover { background: #f6f6f7; }
.action-item.destructive { color: #d72c0d; }
.action-item.destructive:hover { background: #fef3f2; }
.action-divider {
  height: 1px; background: #e1e3e5; margin: 8px 0;
}
.icon { font-size: 16px; }
</style>

<script>
import { createActionList, togglePopover } from '@cin7/vanilla-js';

const button = document.getElementById('actionsBtn');
const popover = document.getElementById('actionsPopover');

button.addEventListener('click', () => togglePopover(popover));

document.querySelectorAll('.action-item').forEach(item => {
  item.addEventListener('click', (e) => {
    const action = e.currentTarget.dataset.action;
    console.log('Action selected:', action);
    popover.style.display = 'none';
  });
});

document.addEventListener('click', (e) => {
  if (!button.contains(e.target) && !popover.contains(e.target)) {
    popover.style.display = 'none';
  }
});
</script>`,

    extjs: `// ExtJS Button with Action Menu
Ext.create('Ext.button.Button', {
  text: 'Actions',
  iconCls: 'x-fa fa-chevron-down',
  menu: {
    items: [
      {
        text: 'View product details',
        iconCls: 'x-fa fa-eye',
        handler: function() {
          console.log('View product details');
        }
      },
      {
        text: 'Edit product',
        iconCls: 'x-fa fa-edit',
        handler: function() {
          console.log('Edit product');
        }
      },
      {
        text: 'Duplicate product',
        iconCls: 'x-fa fa-copy',
        handler: function() {
          console.log('Duplicate product');
        }
      },
      '-', // Separator
      {
        text: 'Delete product',
        iconCls: 'x-fa fa-trash',
        cls: 'destructive-action',
        handler: function() {
          Ext.Msg.confirm('Delete', 'Are you sure you want to delete this product?', function(btn) {
            if (btn === 'yes') {
              console.log('Product deleted');
            }
          });
        }
      }
    ]
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PopoverWithActionListProps {
  activatorLabel?: string;
  actions?: ActionListItemDescriptor[];
  onActionSelect?: (actionId: string) => void;
}

function PopoverWithActionList({
  activatorLabel = 'Actions',
  actions = [
    { content: 'View product details', icon: 'ViewIcon', id: 'view' },
    { content: 'Edit product', icon: 'EditIcon', id: 'edit' },
    { content: 'Duplicate product', icon: 'DuplicateIcon', id: 'duplicate' },
    { content: 'Delete product', icon: 'DeleteIcon', destructive: true, id: 'delete' },
  ],
  onActionSelect
}: PopoverWithActionListProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  const handleAction = useCallback((actionId: string) => {
    if (onActionSelect) {
      onActionSelect(actionId);
    }
    toggleActive();
  }, [onActionSelect, toggleActive]);

  const itemsWithHandlers = actions.map(action => ({
    ...action,
    onAction: () => handleAction(action.id || action.content)
  }));

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive} disclosure>{activatorLabel}</Button>}
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        items={itemsWithHandlers}
      />
    </Popover>
  );
}

export default PopoverWithActionList;`
  },

  withSections: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function PopoverWithSectionsExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Account Settings
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      sectioned
    >
      <Popover.Section title="Profile">
        <Text as="p">
          Manage your profile information and preferences.
        </Text>
      </Popover.Section>
      <Popover.Section title="Security">
        <Text as="p">
          Configure security settings and two-factor authentication.
        </Text>
      </Popover.Section>
      <Popover.Section title="Notifications">
        <Text as="p">
          Choose how you want to be notified about important events.
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default PopoverWithSectionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="settingsBtn">Account Settings</button>
  <div class="popover-content sectioned" id="settingsPopover" style="display: none;">
    <div class="popover-section">
      <h3 class="section-title">Profile</h3>
      <p>Manage your profile information and preferences.</p>
    </div>
    <div class="popover-section">
      <h3 class="section-title">Security</h3>
      <p>Configure security settings and two-factor authentication.</p>
    </div>
    <div class="popover-section">
      <h3 class="section-title">Notifications</h3>
      <p>Choose how you want to be notified about important events.</p>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content.sectioned {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 320px; max-width: 400px;
  background: white; border: 1px solid #e1e3e5;
  border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.section-title {
  margin: 0 0 8px 0; font-size: 14px;
  font-weight: 600; color: #202223;
}
.popover-section p {
  margin: 0; font-size: 14px;
  color: #6d7175; line-height: 1.5;
}
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('settingsBtn');
const popover = document.getElementById('settingsPopover');

button.addEventListener('click', () => togglePopover(popover));
onClickOutside([button, popover], () => popover.style.display = 'none');
</script>`,

    extjs: `// ExtJS Panel with Sections
const settingsPanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 350,
  title: false,
  bodyPadding: 0,
  border: true,
  shadow: true,
  items: [
    {
      xtype: 'container',
      padding: 16,
      style: 'border-bottom: 1px solid #e1e3e5;',
      html: '<h3 style="margin: 0 0 8px 0; font-weight: 600;">Profile</h3>' +
            '<p style="margin: 0; color: #6d7175;">Manage your profile information and preferences.</p>'
    },
    {
      xtype: 'container',
      padding: 16,
      style: 'border-bottom: 1px solid #e1e3e5;',
      html: '<h3 style="margin: 0 0 8px 0; font-weight: 600;">Security</h3>' +
            '<p style="margin: 0; color: #6d7175;">Configure security settings and two-factor authentication.</p>'
    },
    {
      xtype: 'container',
      padding: 16,
      html: '<h3 style="margin: 0 0 8px 0; font-weight: 600;">Notifications</h3>' +
            '<p style="margin: 0; color: #6d7175;">Choose how you want to be notified about important events.</p>'
    }
  ]
});

Ext.create('Ext.button.Button', {
  text: 'Account Settings',
  handler: function(btn) {
    settingsPanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface PopoverSection {
  title: string;
  content: string;
}

interface PopoverWithSectionsProps {
  activatorLabel?: string;
  sections: PopoverSection[];
  sectioned?: boolean;
}

function PopoverWithSections({
  activatorLabel = 'Account Settings',
  sections,
  sectioned = true
}: PopoverWithSectionsProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={toggleActive}
      sectioned={sectioned}
    >
      {sections.map((section, index) => (
        <Popover.Section key={index} title={section.title}>
          <Text as="p">{section.content}</Text>
        </Popover.Section>
      ))}
    </Popover>
  );
}

// Usage example
const defaultSections: PopoverSection[] = [
  { title: 'Profile', content: 'Manage your profile information and preferences.' },
  { title: 'Security', content: 'Configure security settings and two-factor authentication.' },
  { title: 'Notifications', content: 'Choose how you want to be notified about important events.' }
];

export default PopoverWithSections;`
  },

  withForm: {
    react: `import { Popover, Button, FormLayout, TextField } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function PopoverWithFormExample() {
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const toggleActive = () => setActive(!active);

  const handleFieldChange = useCallback((field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', formData);
    toggleActive();
  }, [formData]);

  const activator = (
    <Button onClick={toggleActive}>
      Quick Add Customer
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      sectioned
    >
      <FormLayout>
        <TextField
          label="Customer Name"
          value={formData.name}
          onChange={(value) => handleFieldChange('name', value)}
          placeholder="Enter name"
          autoComplete="off"
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          placeholder="customer@example.com"
          type="email"
          autoComplete="off"
        />
        <Button primary onClick={handleSubmit} fullWidth>
          Add Customer
        </Button>
      </FormLayout>
    </Popover>
  );
}

export default PopoverWithFormExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="addCustomerBtn">Quick Add Customer</button>
  <div class="popover-content" id="formPopover" style="display: none;">
    <form id="customerForm" class="popover-form">
      <div class="form-field">
        <label for="customerName">Customer Name</label>
        <input type="text" id="customerName" placeholder="Enter name" />
      </div>
      <div class="form-field">
        <label for="customerEmail">Email</label>
        <input type="email" id="customerEmail" placeholder="customer@example.com" />
      </div>
      <button type="submit" class="polaris-button primary full-width">
        Add Customer
      </button>
    </form>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 320px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-form { padding: 16px; }
.form-field { margin-bottom: 16px; }
.form-field label {
  display: block; margin-bottom: 4px;
  font-size: 14px; font-weight: 500; color: #202223;
}
.form-field input {
  width: 100%; padding: 8px 12px; border: 1px solid #c9cccf;
  border-radius: 6px; font-size: 14px;
}
.form-field input:focus {
  outline: none; border-color: #2c6ecb;
  box-shadow: 0 0 0 1px #2c6ecb;
}
.polaris-button.primary.full-width {
  width: 100%; background: #2c6ecb; color: white;
  padding: 10px; border: none; border-radius: 6px;
  cursor: pointer; font-weight: 500;
}
.polaris-button.primary:hover { background: #1f5199; }
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('addCustomerBtn');
const popover = document.getElementById('formPopover');
const form = document.getElementById('customerForm');

button.addEventListener('click', () => togglePopover(popover));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {
    name: document.getElementById('customerName').value,
    email: document.getElementById('customerEmail').value
  };
  console.log('Form submitted:', formData);
  popover.style.display = 'none';
  form.reset();
});

onClickOutside([button, popover], () => popover.style.display = 'none');
</script>`,

    extjs: `// ExtJS Form in Popover Window
const formWindow = Ext.create('Ext.window.Window', {
  title: 'Quick Add Customer',
  width: 350,
  modal: false,
  floating: true,
  closable: true,
  closeAction: 'hide',
  layout: 'fit',
  items: [{
    xtype: 'form',
    bodyPadding: 16,
    defaults: {
      xtype: 'textfield',
      anchor: '100%',
      labelAlign: 'top'
    },
    items: [{
      fieldLabel: 'Customer Name',
      name: 'name',
      emptyText: 'Enter name',
      allowBlank: false
    }, {
      fieldLabel: 'Email',
      name: 'email',
      vtype: 'email',
      emptyText: 'customer@example.com',
      allowBlank: false
    }],
    buttons: [{
      text: 'Add Customer',
      formBind: true,
      ui: 'primary',
      handler: function() {
        const form = this.up('form').getForm();
        if (form.isValid()) {
          const values = form.getValues();
          console.log('Form submitted:', values);
          formWindow.hide();
          form.reset();
        }
      }
    }]
  }]
});

Ext.create('Ext.button.Button', {
  text: 'Quick Add Customer',
  handler: function(btn) {
    formWindow.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, FormLayout, TextField } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface CustomerFormData {
  name: string;
  email: string;
}

interface PopoverWithFormProps {
  activatorLabel?: string;
  onSubmit: (data: CustomerFormData) => void;
  initialValues?: Partial<CustomerFormData>;
}

function PopoverWithForm({
  activatorLabel = 'Quick Add Customer',
  onSubmit,
  initialValues = { name: '', email: '' }
}: PopoverWithFormProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    name: initialValues.name || '',
    email: initialValues.email || '',
  });

  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  const handleFieldChange = useCallback((field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (formData.name && formData.email) {
      onSubmit(formData);
      setFormData({ name: '', email: '' });
      toggleActive();
    }
  }, [formData, onSubmit, toggleActive]);

  const isFormValid = formData.name.length > 0 && formData.email.includes('@');

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={toggleActive}
      sectioned
    >
      <FormLayout>
        <TextField
          label="Customer Name"
          value={formData.name}
          onChange={(value) => handleFieldChange('name', value)}
          placeholder="Enter name"
          autoComplete="off"
        />
        <TextField
          label="Email"
          value={formData.email}
          onChange={(value) => handleFieldChange('email', value)}
          placeholder="customer@example.com"
          type="email"
          autoComplete="off"
        />
        <Button
          primary
          onClick={handleSubmit}
          disabled={!isFormValid}
          fullWidth
        >
          Add Customer
        </Button>
      </FormLayout>
    </Popover>
  );
}

export default PopoverWithForm;`
  },

  dismissible: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function DismissiblePopoverExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Dismissible Popover
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
    >
      <Popover.Section>
        <Text as="p">
          This popover can be dismissed by:
        </Text>
        <ul>
          <li>Clicking outside the popover</li>
          <li>Pressing the Escape key</li>
          <li>Clicking the close button</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Button plain onClick={toggleActive}>
          Close
        </Button>
      </Popover.Section>
    </Popover>
  );
}

export default DismissiblePopoverExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="dismissibleBtn">Dismissible Popover</button>
  <div class="popover-content" id="dismissiblePopover" style="display: none;">
    <div class="popover-section">
      <p>This popover can be dismissed by:</p>
      <ul>
        <li>Clicking outside the popover</li>
        <li>Pressing the Escape key</li>
        <li>Clicking the close button</li>
      </ul>
    </div>
    <div class="popover-section">
      <button class="plain-button" id="closePopover">Close</button>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 320px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.popover-section ul {
  margin: 8px 0 0 0; padding-left: 20px;
}
.popover-section li {
  margin-bottom: 4px; color: #6d7175;
}
.plain-button {
  background: none; border: none; color: #2c6ecb;
  cursor: pointer; font-size: 14px; padding: 0;
}
.plain-button:hover { text-decoration: underline; }
</style>

<script>
import { togglePopover, onClickOutside, onEscape } from '@cin7/vanilla-js';

const button = document.getElementById('dismissibleBtn');
const popover = document.getElementById('dismissiblePopover');
const closeBtn = document.getElementById('closePopover');

function hidePopover() {
  popover.style.display = 'none';
}

button.addEventListener('click', () => togglePopover(popover));
closeBtn.addEventListener('click', hidePopover);

// Click outside to dismiss
onClickOutside([button, popover], hidePopover);

// Escape key to dismiss
onEscape(hidePopover);
</script>`,

    extjs: `// ExtJS Dismissible Popover
const dismissiblePanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 350,
  bodyPadding: 16,
  closable: true,
  closeAction: 'hide',
  border: true,
  shadow: true,
  html: '<p>This popover can be dismissed by:</p>' +
        '<ul>' +
        '<li>Clicking outside the popover</li>' +
        '<li>Pressing the Escape key</li>' +
        '<li>Clicking the close button</li>' +
        '</ul>',
  buttons: [{
    text: 'Close',
    handler: function() {
      dismissiblePanel.hide();
    }
  }],
  listeners: {
    show: function(panel) {
      // Handle Escape key
      Ext.getDoc().on('keydown', function(e) {
        if (e.getKey() === Ext.event.Event.ESC) {
          panel.hide();
        }
      }, null, { single: true });
    }
  }
});

Ext.create('Ext.button.Button', {
  text: 'Dismissible Popover',
  handler: function(btn) {
    dismissiblePanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';

interface DismissiblePopoverProps {
  activatorLabel?: string;
  content?: React.ReactNode;
  onDismiss?: () => void;
}

function DismissiblePopover({
  activatorLabel = 'Dismissible Popover',
  content,
  onDismiss
}: DismissiblePopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setActive(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && active) {
        handleClose();
      }
    };

    if (active) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [active, handleClose]);

  const defaultContent = (
    <>
      <Popover.Section>
        <Text as="p">This popover can be dismissed by:</Text>
        <ul>
          <li>Clicking outside the popover</li>
          <li>Pressing the Escape key</li>
          <li>Clicking the close button</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Button plain onClick={handleClose}>
          Close
        </Button>
      </Popover.Section>
    </>
  );

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={handleClose}
    >
      {content || defaultContent}
    </Popover>
  );
}

export default DismissiblePopover;`
  },

  customWidth: {
    react: `import { Popover, Button, Text, FormLayout } from '@shopify/polaris';
import React, { useState } from 'react';

function CustomWidthPopoverExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive}>
      Wide Popover
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      fullWidth
      fluidContent
    >
      <Popover.Section>
        <Text as="p">
          This popover uses fullWidth and fluidContent to expand to its natural width.
        </Text>
      </Popover.Section>
      <Popover.Section>
        <FormLayout>
          <Text as="p">
            It's useful for content that needs more space, like forms or detailed information.
          </Text>
          <Button onClick={toggleActive}>Example Button</Button>
        </FormLayout>
      </Popover.Section>
    </Popover>
  );
}

export default CustomWidthPopoverExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="popover-wrapper">
  <button class="polaris-button" id="wideBtn">Wide Popover</button>
  <div class="popover-content wide" id="widePopover" style="display: none;">
    <div class="popover-section">
      <p>This popover uses custom width to expand to its natural width.</p>
    </div>
    <div class="popover-section">
      <p>It's useful for content that needs more space, like forms or detailed information.</p>
      <button class="polaris-button">Example Button</button>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-content.wide {
  min-width: 400px; max-width: 600px;
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.popover-section p {
  margin: 0 0 12px 0; color: #202223; line-height: 1.5;
}
.popover-section p:last-child { margin-bottom: 0; }
</style>

<script>
import { togglePopover, onClickOutside } from '@cin7/vanilla-js';

const button = document.getElementById('wideBtn');
const popover = document.getElementById('widePopover');

button.addEventListener('click', () => togglePopover(popover));
onClickOutside([button, popover], () => popover.style.display = 'none');
</script>`,

    extjs: `// ExtJS Wide Popover Panel
const widePanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 500,
  maxWidth: 600,
  bodyPadding: 0,
  border: true,
  shadow: true,
  items: [
    {
      xtype: 'container',
      padding: 16,
      style: 'border-bottom: 1px solid #e1e3e5;',
      html: '<p>This popover uses custom width to expand to its natural width.</p>'
    },
    {
      xtype: 'container',
      padding: 16,
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: [
        {
          xtype: 'component',
          html: '<p>It\\'s useful for content that needs more space, like forms or detailed information.</p>',
          margin: '0 0 12 0'
        },
        {
          xtype: 'button',
          text: 'Example Button'
        }
      ]
    }
  ]
});

Ext.create('Ext.button.Button', {
  text: 'Wide Popover',
  handler: function(btn) {
    widePanel.showBy(btn, 'tl-bl?');
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text, FormLayout, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback, CSSProperties } from 'react';

interface CustomWidthPopoverProps {
  activatorLabel?: string;
  fullWidth?: boolean;
  fluidContent?: boolean;
  minWidth?: number;
  maxWidth?: number;
  children?: React.ReactNode;
}

function CustomWidthPopover({
  activatorLabel = 'Wide Popover',
  fullWidth = true,
  fluidContent = true,
  minWidth = 400,
  maxWidth = 600,
  children
}: CustomWidthPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const toggleActive = useCallback(() => setActive((prev) => !prev), []);

  const contentStyle: CSSProperties = {
    minWidth: \`\${minWidth}px\`,
    maxWidth: \`\${maxWidth}px\`
  };

  const defaultContent = (
    <>
      <Popover.Section>
        <Text as="p">
          This popover uses fullWidth and fluidContent to expand to its natural width.
        </Text>
      </Popover.Section>
      <Popover.Section>
        <FormLayout>
          <Text as="p">
            It's useful for content that needs more space, like forms or detailed information.
          </Text>
          <Button onClick={toggleActive}>Example Button</Button>
        </FormLayout>
      </Popover.Section>
    </>
  );

  return (
    <Popover
      active={active}
      activator={<Button onClick={toggleActive}>{activatorLabel}</Button>}
      onClose={toggleActive}
      fullWidth={fullWidth}
      fluidContent={fluidContent}
    >
      <div style={contentStyle}>
        {children || defaultContent}
      </div>
    </Popover>
  );
}

export default CustomWidthPopover;`
  },
