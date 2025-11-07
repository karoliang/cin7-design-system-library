// POPOVER CODE VARIANTS PART 2 - Continue adding these to codeVariants.ts popoverExamples

  interactiveExamples: {
    react: `import { Popover, Button, ActionList } from '@shopify/polaris';
import React, { useState } from 'react';

function InteractivePopoverExamples() {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const togglePopover = (popoverName: string) => {
    setActivePopover(activePopover === popoverName ? null : popoverName);
  };

  const handleAction = (action: string) => {
    setMessage(\`Action selected: \${action}\`);
    setActivePopover(null);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f1f2f4',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Popover
          active={activePopover === 'share'}
          activator={<Button onClick={() => togglePopover('share')}>Share</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'Copy link', icon: 'LinkIcon', onAction: () => handleAction('Copy link') },
              { content: 'Email', icon: 'EmailIcon', onAction: () => handleAction('Email') },
              { content: 'Facebook', icon: 'FacebookIcon', onAction: () => handleAction('Facebook') },
              { content: 'Twitter', icon: 'TwitterIcon', onAction: () => handleAction('Twitter') },
            ]}
          />
        </Popover>

        <Popover
          active={activePopover === 'filter'}
          activator={<Button onClick={() => togglePopover('filter')}>Filter</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'All orders', onAction: () => handleAction('All orders') },
              { content: 'Pending', onAction: () => handleAction('Pending') },
              { content: 'Completed', onAction: () => handleAction('Completed') },
              { content: 'Cancelled', onAction: () => handleAction('Cancelled') },
            ]}
          />
        </Popover>

        <Popover
          active={activePopover === 'sort'}
          activator={<Button onClick={() => togglePopover('sort')}>Sort</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'Date (newest)', onAction: () => handleAction('Date (newest)') },
              { content: 'Date (oldest)', onAction: () => handleAction('Date (oldest)') },
              { content: 'Name (A-Z)', onAction: () => handleAction('Name (A-Z)') },
              { content: 'Name (Z-A)', onAction: () => handleAction('Name (Z-A)') },
            ]}
          />
        </Popover>

        <Popover
          active={activePopover === 'more'}
          activator={<Button onClick={() => togglePopover('more')} disclosure>More</Button>}
          onClose={() => setActivePopover(null)}
        >
          <ActionList
            items={[
              { content: 'View details', icon: 'ViewIcon', onAction: () => handleAction('View details') },
              { content: 'Edit', icon: 'EditIcon', onAction: () => handleAction('Edit') },
              { content: 'Duplicate', icon: 'DuplicateIcon', onAction: () => handleAction('Duplicate') },
              { content: 'Delete', icon: 'DeleteIcon', destructive: true, onAction: () => handleAction('Delete') },
            ]}
          />
        </Popover>
      </div>
    </div>
  );
}

export default InteractivePopoverExamples;`,

    vanilla: `<!-- HTML Structure -->
<div class="interactive-demo">
  <div id="messageBox" class="message-box" style="display: none;"></div>

  <div class="popover-group">
    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="share">Share</button>
      <div class="popover-content" id="sharePopover" style="display: none;">
        <button class="action-item" data-action="Copy link">🔗 Copy link</button>
        <button class="action-item" data-action="Email">📧 Email</button>
        <button class="action-item" data-action="Facebook">👥 Facebook</button>
        <button class="action-item" data-action="Twitter">🐦 Twitter</button>
      </div>
    </div>

    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="filter">Filter</button>
      <div class="popover-content" id="filterPopover" style="display: none;">
        <button class="action-item" data-action="All orders">All orders</button>
        <button class="action-item" data-action="Pending">Pending</button>
        <button class="action-item" data-action="Completed">Completed</button>
        <button class="action-item" data-action="Cancelled">Cancelled</button>
      </div>
    </div>

    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="sort">Sort</button>
      <div class="popover-content" id="sortPopover" style="display: none;">
        <button class="action-item" data-action="Date (newest)">Date (newest)</button>
        <button class="action-item" data-action="Date (oldest)">Date (oldest)</button>
        <button class="action-item" data-action="Name (A-Z)">Name (A-Z)</button>
        <button class="action-item" data-action="Name (Z-A)">Name (Z-A)</button>
      </div>
    </div>

    <div class="popover-wrapper">
      <button class="polaris-button" data-popover="more">More ▼</button>
      <div class="popover-content" id="morePopover" style="display: none;">
        <button class="action-item" data-action="View details">👁️ View details</button>
        <button class="action-item" data-action="Edit">✏️ Edit</button>
        <button class="action-item" data-action="Duplicate">📋 Duplicate</button>
        <button class="action-item destructive" data-action="Delete">🗑️ Delete</button>
      </div>
    </div>
  </div>
</div>

<style>
.interactive-demo { display: flex; flex-direction: column; gap: 20px; }
.message-box {
  padding: 12px; background: #f1f2f4; border-radius: 4px;
  text-align: center; font-size: 14px;
}
.popover-group { display: flex; gap: 12px; flex-wrap: wrap; }
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 200px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 8px;
}
.action-item {
  display: block; width: 100%; padding: 10px 12px;
  border: none; background: transparent; text-align: left;
  cursor: pointer; border-radius: 6px; font-size: 14px;
}
.action-item:hover { background: #f6f6f7; }
.action-item.destructive { color: #d72c0d; }
.action-item.destructive:hover { background: #fef3f2; }
</style>

<script>
import { managePopovers } from '@cin7/vanilla-js';

const messageBox = document.getElementById('messageBox');

function showMessage(text) {
  messageBox.textContent = \`Action selected: \${text}\`;
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 3000);
}

// Setup popover toggles
document.querySelectorAll('[data-popover]').forEach(button => {
  const popoverId = button.dataset.popover + 'Popover';
  const popover = document.getElementById(popoverId);

  button.addEventListener('click', () => {
    // Close all other popovers
    document.querySelectorAll('.popover-content').forEach(p => {
      if (p !== popover) p.style.display = 'none';
    });
    popover.style.display = popover.style.display === 'none' ? 'block' : 'none';
  });
});

// Setup action handlers
document.querySelectorAll('.action-item').forEach(item => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    showMessage(action);
    document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
  });
});

// Click outside to close
document.addEventListener('click', (e) => {
  if (!e.target.closest('.popover-wrapper')) {
    document.querySelectorAll('.popover-content').forEach(p => p.style.display = 'none');
  }
});
</script>`,

    extjs: `// ExtJS Interactive Popovers Example
Ext.create('Ext.container.Container', {
  renderTo: Ext.getBody(),
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      itemId: 'messageBox',
      hidden: true,
      padding: 12,
      style: 'background: #f1f2f4; border-radius: 4px; text-align: center;',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      layout: 'hbox',
      defaults: { margin: '0 12 0 0' },
      items: [
        {
          xtype: 'button',
          text: 'Share',
          menu: {
            items: [
              { text: 'Copy link', iconCls: 'x-fa fa-link', handler: function() { showMessage('Copy link'); } },
              { text: 'Email', iconCls: 'x-fa fa-envelope', handler: function() { showMessage('Email'); } },
              { text: 'Facebook', iconCls: 'x-fa fa-facebook', handler: function() { showMessage('Facebook'); } },
              { text: 'Twitter', iconCls: 'x-fa fa-twitter', handler: function() { showMessage('Twitter'); } }
            ]
          }
        },
        {
          xtype: 'button',
          text: 'Filter',
          menu: {
            items: [
              { text: 'All orders', handler: function() { showMessage('All orders'); } },
              { text: 'Pending', handler: function() { showMessage('Pending'); } },
              { text: 'Completed', handler: function() { showMessage('Completed'); } },
              { text: 'Cancelled', handler: function() { showMessage('Cancelled'); } }
            ]
          }
        },
        {
          xtype: 'button',
          text: 'Sort',
          menu: {
            items: [
              { text: 'Date (newest)', handler: function() { showMessage('Date (newest)'); } },
              { text: 'Date (oldest)', handler: function() { showMessage('Date (oldest)'); } },
              { text: 'Name (A-Z)', handler: function() { showMessage('Name (A-Z)'); } },
              { text: 'Name (Z-A)', handler: function() { showMessage('Name (Z-A)'); } }
            ]
          }
        },
        {
          xtype: 'button',
          text: 'More',
          iconCls: 'x-fa fa-chevron-down',
          menu: {
            items: [
              { text: 'View details', iconCls: 'x-fa fa-eye', handler: function() { showMessage('View details'); } },
              { text: 'Edit', iconCls: 'x-fa fa-edit', handler: function() { showMessage('Edit'); } },
              { text: 'Duplicate', iconCls: 'x-fa fa-copy', handler: function() { showMessage('Duplicate'); } },
              '-',
              { text: 'Delete', iconCls: 'x-fa fa-trash', cls: 'destructive', handler: function() { showMessage('Delete'); } }
            ]
          }
        }
      ]
    }
  ]
});

function showMessage(action) {
  const msgBox = Ext.ComponentQuery.query('#messageBox')[0];
  msgBox.setHtml('Action selected: ' + action);
  msgBox.show();
  Ext.defer(function() {
    msgBox.hide();
  }, 3000);
}`,

    typescript: `import { Popover, Button, ActionList, ActionListItemDescriptor } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

type PopoverConfig = {
  id: string;
  label: string;
  items: ActionListItemDescriptor[];
  disclosure?: boolean;
};

function InteractivePopoverExamples(): JSX.Element {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');

  const togglePopover = useCallback((popoverId: string) => {
    setActivePopover((current) => current === popoverId ? null : popoverId);
  }, []);

  const handleAction = useCallback((action: string) => {
    setMessage(\`Action selected: \${action}\`);
    setActivePopover(null);
    const timer = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timer);
  }, []);

  const popovers: PopoverConfig[] = [
    {
      id: 'share',
      label: 'Share',
      items: [
        { content: 'Copy link', icon: 'LinkIcon', onAction: () => handleAction('Copy link') },
        { content: 'Email', icon: 'EmailIcon', onAction: () => handleAction('Email') },
        { content: 'Facebook', icon: 'FacebookIcon', onAction: () => handleAction('Facebook') },
        { content: 'Twitter', icon: 'TwitterIcon', onAction: () => handleAction('Twitter') },
      ]
    },
    {
      id: 'filter',
      label: 'Filter',
      items: [
        { content: 'All orders', onAction: () => handleAction('All orders') },
        { content: 'Pending', onAction: () => handleAction('Pending') },
        { content: 'Completed', onAction: () => handleAction('Completed') },
        { content: 'Cancelled', onAction: () => handleAction('Cancelled') },
      ]
    },
    {
      id: 'sort',
      label: 'Sort',
      items: [
        { content: 'Date (newest)', onAction: () => handleAction('Date (newest)') },
        { content: 'Date (oldest)', onAction: () => handleAction('Date (oldest)') },
        { content: 'Name (A-Z)', onAction: () => handleAction('Name (A-Z)') },
        { content: 'Name (Z-A)', onAction: () => handleAction('Name (Z-A)') },
      ]
    },
    {
      id: 'more',
      label: 'More',
      disclosure: true,
      items: [
        { content: 'View details', icon: 'ViewIcon', onAction: () => handleAction('View details') },
        { content: 'Edit', icon: 'EditIcon', onAction: () => handleAction('Edit') },
        { content: 'Duplicate', icon: 'DuplicateIcon', onAction: () => handleAction('Duplicate') },
        { content: 'Delete', icon: 'DeleteIcon', destructive: true, onAction: () => handleAction('Delete') },
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {message && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f1f2f4',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {popovers.map((popover) => (
          <Popover
            key={popover.id}
            active={activePopover === popover.id}
            activator={
              <Button
                onClick={() => togglePopover(popover.id)}
                disclosure={popover.disclosure}
              >
                {popover.label}
              </Button>
            }
            onClose={() => setActivePopover(null)}
          >
            <ActionList items={popover.items} />
          </Popover>
        ))}
      </div>
    </div>
  );
}

export default InteractivePopoverExamples;`
  },

  accessibility: {
    react: `import { Popover, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function AccessibilityPopoverExample() {
  const [active, setActive] = useState(false);
  const toggleActive = () => setActive(!active);

  const activator = (
    <Button onClick={toggleActive} ariaLabel="Open accessibility features menu">
      Accessibility Options
    </Button>
  );

  return (
    <Popover
      active={active}
      activator={activator}
      onClose={toggleActive}
      preferredPosition="below"
      autofocusTarget="first-node"
    >
      <Popover.Section>
        <Text as="p">
          This popover includes accessibility features:
        </Text>
        <ul>
          <li>Proper ARIA attributes</li>
          <li>Keyboard navigation support</li>
          <li>Focus management</li>
          <li>Screen reader announcements</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Text as="p">
          <strong>Keyboard shortcuts:</strong><br />
          Tab/Shift+Tab: Navigate<br />
          Enter/Space: Select<br />
          Escape: Close popover
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default AccessibilityPopoverExample;`,

    vanilla: `<!-- HTML Structure with Accessibility -->
<div class="popover-wrapper">
  <button
    class="polaris-button"
    id="a11yBtn"
    aria-label="Open accessibility features menu"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Accessibility Options
  </button>
  <div
    class="popover-content"
    id="a11yPopover"
    role="dialog"
    aria-label="Accessibility options"
    style="display: none;"
  >
    <div class="popover-section">
      <p>This popover includes accessibility features:</p>
      <ul>
        <li>Proper ARIA attributes</li>
        <li>Keyboard navigation support</li>
        <li>Focus management</li>
        <li>Screen reader announcements</li>
      </ul>
    </div>
    <div class="popover-section">
      <p><strong>Keyboard shortcuts:</strong></p>
      <p>Tab/Shift+Tab: Navigate<br />
      Enter/Space: Select<br />
      Escape: Close popover</p>
    </div>
  </div>
</div>

<style>
.popover-wrapper { position: relative; display: inline-block; }
.popover-content {
  position: absolute; top: 100%; left: 0; z-index: 1000;
  margin-top: 8px; min-width: 350px; background: white;
  border: 1px solid #e1e3e5; border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.popover-section {
  padding: 16px; border-bottom: 1px solid #e1e3e5;
}
.popover-section:last-child { border-bottom: none; }
.popover-section ul { margin: 8px 0 0 0; padding-left: 20px; }
.popover-section li { margin-bottom: 4px; }
</style>

<script>
import {
  togglePopover,
  onClickOutside,
  manageFocus,
  announceToScreenReader
} from '@cin7/vanilla-js';

const button = document.getElementById('a11yBtn');
const popover = document.getElementById('a11yPopover');

let isOpen = false;

function openPopover() {
  popover.style.display = 'block';
  button.setAttribute('aria-expanded', 'true');
  manageFocus(popover); // Focus first focusable element
  announceToScreenReader('Accessibility options menu opened');
  isOpen = true;
}

function closePopover() {
  popover.style.display = 'none';
  button.setAttribute('aria-expanded', 'false');
  button.focus(); // Return focus to activator
  announceToScreenReader('Accessibility options menu closed');
  isOpen = false;
}

button.addEventListener('click', () => {
  if (isOpen) {
    closePopover();
  } else {
    openPopover();
  }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!isOpen) return;

  if (e.key === 'Escape') {
    closePopover();
  } else if (e.key === 'Tab') {
    // Trap focus within popover
    const focusable = popover.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});

onClickOutside([button, popover], closePopover);
</script>`,

    extjs: `// ExtJS Accessible Popover
const accessiblePanel = Ext.create('Ext.panel.Panel', {
  floating: true,
  hidden: true,
  width: 380,
  bodyPadding: 16,
  border: true,
  shadow: true,
  focusOnToFront: true,
  ariaLabel: 'Accessibility options',
  html: '<p>This popover includes accessibility features:</p>' +
        '<ul>' +
        '<li>Proper ARIA attributes</li>' +
        '<li>Keyboard navigation support</li>' +
        '<li>Focus management</li>' +
        '<li>Screen reader announcements</li>' +
        '</ul>' +
        '<hr style="margin: 16px 0; border: none; border-top: 1px solid #e1e3e5;" />' +
        '<p><strong>Keyboard shortcuts:</strong></p>' +
        '<p>Tab/Shift+Tab: Navigate<br />' +
        'Enter/Space: Select<br />' +
        'Escape: Close popover</p>',
  listeners: {
    show: function(panel) {
      // Focus management
      panel.focus();

      // Keyboard handler
      panel.getEl().on('keydown', function(e) {
        if (e.getKey() === Ext.event.Event.ESC) {
          panel.hide();
        }
      });
    },
    hide: function() {
      // Return focus to activator
      Ext.getCmp('a11yButton').focus();
    }
  }
});

Ext.create('Ext.button.Button', {
  id: 'a11yButton',
  text: 'Accessibility Options',
  ariaLabel: 'Open accessibility features menu',
  handler: function(btn) {
    if (accessiblePanel.isVisible()) {
      accessiblePanel.hide();
    } else {
      accessiblePanel.showBy(btn, 'tl-bl?');
    }
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { Popover, Button, Text, PopoverProps } from '@shopify/polaris';
import React, { useState, useCallback, useRef, useEffect } from 'react';

interface AccessibilityPopoverProps {
  activatorLabel?: string;
  ariaLabel?: string;
  preferredPosition?: PopoverProps['preferredPosition'];
  autofocusTarget?: PopoverProps['autofocusTarget'];
}

function AccessibilityPopover({
  activatorLabel = 'Accessibility Options',
  ariaLabel = 'Open accessibility features menu',
  preferredPosition = 'below',
  autofocusTarget = 'first-node'
}: AccessibilityPopoverProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const activatorRef = useRef<HTMLButtonElement>(null);

  const toggleActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  // Announce to screen readers
  useEffect(() => {
    if (active) {
      announceToScreenReader('Accessibility options menu opened');
    } else if (activatorRef.current && !active) {
      // Return focus to activator when closed
      activatorRef.current.focus();
      announceToScreenReader('Accessibility options menu closed');
    }
  }, [active]);

  // Screen reader announcement helper
  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <Popover
      active={active}
      activator={
        <Button
          ref={activatorRef}
          onClick={toggleActive}
          ariaLabel={ariaLabel}
        >
          {activatorLabel}
        </Button>
      }
      onClose={toggleActive}
      preferredPosition={preferredPosition}
      autofocusTarget={autofocusTarget}
    >
      <Popover.Section>
        <Text as="p">This popover includes accessibility features:</Text>
        <ul>
          <li>Proper ARIA attributes</li>
          <li>Keyboard navigation support</li>
          <li>Focus management</li>
          <li>Screen reader announcements</li>
        </ul>
      </Popover.Section>
      <Popover.Section>
        <Text as="p">
          <strong>Keyboard shortcuts:</strong><br />
          Tab/Shift+Tab: Navigate<br />
          Enter/Space: Select<br />
          Escape: Close popover
        </Text>
      </Popover.Section>
    </Popover>
  );
}

export default AccessibilityPopover;`
  },
