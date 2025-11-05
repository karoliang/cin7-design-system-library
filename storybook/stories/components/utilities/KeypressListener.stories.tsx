import type { Meta, StoryObj } from '@storybook/react';
import { KeypressListener, Button, Text, Card, Badge, Toast } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Overlays/KeypressListener',
  component: KeypressListener,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'KeypressListener captures keyboard events globally and triggers callbacks. It\'s essential for implementing keyboard shortcuts, accessibility features, and custom keyboard interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    keyCode: {
      control: 'text',
      description: 'Key code to listen for (e.g., "Enter", "Escape", "ArrowUp")',
    },
    handler: {
      action: 'handler',
      description: 'Callback function triggered when key is pressed',
    },
    keyEvent: {
      control: 'select',
      options: ['keydown', 'keyup', 'keypress'],
      description: 'Type of keyboard event to listen for',
    },
    capture: {
      control: 'boolean',
      description: 'Use event capture phase',
    },
    passive: {
      control: 'boolean',
      description: 'Use passive event listener',
    },
    preventDefault: {
      control: 'boolean',
      description: 'Prevent default action',
    },
    stopPropagation: {
      control: 'boolean',
      description: 'Stop event propagation',
    },
  },
} satisfies Meta<typeof KeypressListener>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [message, setMessage] = React.useState('');

    const handleEnter = (event: KeyboardEvent) => {
      setMessage(`Enter key pressed! Event: ${event.type}`);
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div style={{ height: '300px', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <Text variant="headingMd">Basic Keypress Listener</Text>
          <Text variant="bodyMd" as="p">Press the Enter key to trigger the listener.</Text>

          {message && (
            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f1f2f4',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <Text variant="bodyMd">{message}</Text>
            </div>
          )}
        </div>

        <KeypressListener keyCode="Enter" handler={handleEnter} />
      </div>
    );
  },
};

export const EscapeKeyHandler: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = React.useState(false);

    const handleEscape = (event: KeyboardEvent) => {
      if (modalOpen) {
        setModalOpen(false);
      }
    };

    return (
      <div style={{ height: '300px', padding: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <Button onClick={() => setModalOpen(true)}>
            Open Modal (Press Escape to close)
          </Button>

          {modalOpen && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}>
              <Card sectioned>
                <Text variant="headingMd">Modal with Escape Handler</Text>
                <Text variant="bodyMd" as="p">Press Escape key to close this modal.</Text>
                <Button onClick={() => setModalOpen(false)} style={{ marginTop: '16px' }}>
                  Close Modal
                </Button>
              </Card>
            </div>
          )}
        </div>

        <KeypressListener keyCode="Escape" handler={handleEscape} />
      </div>
    );
  },
};

export const MultipleKeys: Story = {
  render: () => {
    const [lastKey, setLastKey] = React.useState('');
    const [keyHistory, setKeyHistory] = React.useState<string[]>([]);

    const handleKey = (keyName: string) => (event: KeyboardEvent) => {
      setLastKey(`${keyName} pressed at ${new Date().toLocaleTimeString()}`);
      setKeyHistory(prev => [`${keyName} - ${new Date().toLocaleTimeString()}`, ...prev.slice(0, 4)]);
    };

    return (
      <div style={{ height: '400px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Multiple Key Listeners</Text>
          <Text variant="bodyMd" as="p">Try pressing different keys:</Text>

          <div style={{ display: 'flex', gap: '20px', margin: '20px 0', flexWrap: 'wrap' }}>
            <div>
              <Badge status="info">↑</Badge>
              <Text variant="bodySm">Arrow Up</Text>
            </div>
            <div>
              <Badge status="info">↓</Badge>
              <Text variant="bodySm">Arrow Down</Text>
            </div>
            <div>
              <Badge status="info">←</Badge>
              <Text variant="bodySm">Arrow Left</Text>
            </div>
            <div>
              <Badge status="info">→</Badge>
              <Text variant="bodySm">Arrow Right</Text>
            </div>
            <div>
              <Badge status="info">Space</Badge>
              <Text variant="bodySm">Spacebar</Text>
            </div>
            <div>
              <Badge status="info">Enter</Badge>
              <Text variant="bodySm">Enter</Text>
            </div>
          </div>

          {lastKey && (
            <div style={{
              marginBottom: '20px',
              padding: '12px',
              backgroundColor: '#f1f2f4',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}>
              <Text variant="bodyMd"><strong>Last key pressed:</strong> {lastKey}</Text>
            </div>
          )}

          {keyHistory.length > 0 && (
            <Card sectioned>
              <Text variant="headingSm">Recent Key History</Text>
              <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                {keyHistory.map((key, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>
                    <Text variant="bodySm">{key}</Text>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <KeypressListener keyCode="ArrowUp" handler={handleKey('Arrow Up')} />
        <KeypressListener keyCode="ArrowDown" handler={handleKey('Arrow Down')} />
        <KeypressListener keyCode="ArrowLeft" handler={handleKey('Arrow Left')} />
        <KeypressListener keyCode="ArrowRight" handler={handleKey('Arrow Right')} />
        <KeypressListener keyCode=" " handler={handleKey('Space')} />
        <KeypressListener keyCode="Enter" handler={handleKey('Enter')} />
      </div>
    );
  },
};

export const KeyboardShortcuts: Story = {
  render: () => {
    const [activeShortcuts, setActiveShortcuts] = React.useState<Set<string>>(new Set());
    const [toastMessage, setToastMessage] = React.useState('');
    const [showToast, setShowToast] = React.useState(false);

    const handleShortcut = (shortcut: string, action: string) => (event: KeyboardEvent) => {
      // Check for modifier keys
      const hasCtrl = event.ctrlKey || event.metaKey;
      const hasShift = event.shiftKey;
      const hasAlt = event.altKey;

      let keyCombination = [];
      if (hasCtrl) keyCombination.push('Ctrl/Cmd');
      if (hasShift) keyCombination.push('Shift');
      if (hasAlt) keyCombination.push('Alt');
      keyCombination.push(event.code);

      const shortcutKey = keyCombination.join(' + ');

      if (shortcut === shortcutKey) {
        event.preventDefault();
        setToastMessage(`Shortcut triggered: ${action}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    };

    const shortcuts = [
      { keys: ['Ctrl', 'KeyS'], action: 'Save Document', description: 'Ctrl/Cmd + S' },
      { keys: ['Ctrl', 'KeyP'], action: 'Print Page', description: 'Ctrl/Cmd + P' },
      { keys: ['Ctrl', 'KeyC'], action: 'Copy Selection', description: 'Ctrl/Cmd + C' },
      { keys: ['Ctrl', 'KeyV'], action: 'Paste Content', description: 'Ctrl/Cmd + V' },
      { keys: ['Ctrl', 'KeyZ'], action: 'Undo Action', description: 'Ctrl/Cmd + Z' },
      { keys: ['Shift', 'Ctrl', 'KeyZ'], action: 'Redo Action', description: 'Shift + Ctrl/Cmd + Z' },
    ];

    return (
      <div style={{ height: '400px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Keyboard Shortcuts Demo</Text>
          <Text variant="bodyMd" as="p">Try these keyboard shortcuts:</Text>

          <div style={{ marginTop: '20px' }}>
            <Card sectioned>
              <Text variant="headingSm">Available Shortcuts</Text>
              <div style={{ marginTop: '12px' }}>
                {shortcuts.map((shortcut, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
                    <Text variant="bodyMd">{shortcut.action}</Text>
                    <Badge status="info">{shortcut.description}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {showToast && (
            <div style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              backgroundColor: '#000',
              color: '#fff',
              padding: '16px',
              borderRadius: '8px',
              zIndex: 2000,
              maxWidth: '300px'
            }}>
              <Text variant="bodyMd">{toastMessage}</Text>
            </div>
          )}
        </div>

        {shortcuts.map((shortcut, index) => (
          <KeypressListener
            key={index}
            keyCode={shortcut.keys.join('+')}
            handler={handleShortcut(shortcut.keys.join(' + '), shortcut.action)}
            preventDefault={true}
          />
        ))}
      </div>
    );
  },
};

export const KeyEventTypes: Story = {
  render: () => {
    const [events, setEvents] = React.useState<Array<{type: string, key: string, time: string}>>([]);

    const addEvent = (eventType: string) => (event: KeyboardEvent) => {
      if (event.key === 'a') {
        setEvents(prev => [{
          type: eventType,
          key: event.key,
          time: new Date().toLocaleTimeString()
        }, ...prev.slice(0, 9)]);
      }
    };

    return (
      <div style={{ height: '400px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Keyboard Event Types</Text>
          <Text variant="bodyMd" as="p">Press and hold the 'A' key to see different event types:</Text>

          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div>
                <Badge>keydown</Badge>
                <Text variant="bodySm">Fires when key is pressed down</Text>
              </div>
              <div>
                <Badge>keypress</Badge>
                <Text variant="bodySm">Fires when key produces a character</Text>
              </div>
              <div>
                <Badge>keyup</Badge>
                <Text variant="bodySm">Fires when key is released</Text>
              </div>
            </div>

            {events.length > 0 && (
              <Card sectioned>
                <Text variant="headingSm">Event Log (Press 'A' key)</Text>
                <div style={{ marginTop: '12px', maxHeight: '200px', overflowY: 'auto' }}>
                  {events.map((event, index) => (
                    <div key={index} style={{
                      padding: '8px',
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                      borderRadius: '4px',
                      marginBottom: '4px'
                    }}>
                      <Text variant="bodySm">
                        <strong>{event.type}</strong> - Key: "{event.key}" - {event.time}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>

        <KeypressListener keyCode="a" handler={addEvent('keydown')} keyEvent="keydown" />
        <KeypressListener keyCode="a" handler={addEvent('keypress')} keyEvent="keypress" />
        <KeypressListener keyCode="a" handler={addEvent('keyup')} keyEvent="keyup" />
      </div>
    );
  },
};

export const ModifierKeys: Story = {
  render: () => {
    const [modifiers, setModifiers] = React.useState({
      ctrl: false,
      shift: false,
      alt: false,
      meta: false
    });

    const handleModifierKey = (modifier: string, isPressed: boolean) => {
      setModifiers(prev => ({ ...prev, [modifier]: isPressed }));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) handleModifierKey('ctrl', true);
      if (event.shiftKey) handleModifierKey('shift', true);
      if (event.altKey) handleModifierKey('alt', true);
      if (event.metaKey) handleModifierKey('meta', true);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.ctrlKey && !event.metaKey) handleModifierKey('ctrl', false);
      if (!event.shiftKey) handleModifierKey('shift', false);
      if (!event.altKey) handleModifierKey('alt', false);
      if (!event.metaKey) handleModifierKey('meta', false);
    };

    return (
      <div style={{ height: '300px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Modifier Keys Detection</Text>
          <Text variant="bodyMd" as="p">Hold down modifier keys to see them detected:</Text>

          <div style={{ marginTop: '20px' }}>
            <Card sectioned>
              <Text variant="headingSm">Active Modifier Keys</Text>
              <div style={{ marginTop: '12px', display: 'flex', gap: '12px' }}>
                <Badge status={modifiers.ctrl ? 'success' : 'default'}>
                  Ctrl/Cmd: {modifiers.ctrl ? 'ON' : 'OFF'}
                </Badge>
                <Badge status={modifiers.shift ? 'success' : 'default'}>
                  Shift: {modifiers.shift ? 'ON' : 'OFF'}
                </Badge>
                <Badge status={modifiers.alt ? 'success' : 'default'}>
                  Alt: {modifiers.alt ? 'ON' : 'OFF'}
                </Badge>
                <Badge status={modifiers.meta ? 'success' : 'default'}>
                  Meta: {modifiers.meta ? 'ON' : 'OFF'}
                </Badge>
              </div>
            </Card>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Text variant="bodySm" as="p">
              Try holding combinations like Ctrl+Shift, Ctrl+Alt, or Ctrl+Shift+Alt
            </Text>
          </div>
        </div>

        <KeypressListener handler={handleKeyDown} keyEvent="keydown" />
        <KeypressListener handler={handleKeyUp} keyEvent="keyup" />
      </div>
    );
  },
};

export const FormValidation: Story = {
  render: () => {
    const [inputValue, setInputValue] = React.useState('');
    const [validation, setValidation] = React.useState({
      isValid: false,
      message: ''
    });

    const validateInput = (value: string) => {
      if (value.length === 0) {
        setValidation({ isValid: false, message: 'Email is required' });
      } else if (!value.includes('@')) {
        setValidation({ isValid: false, message: 'Invalid email format' });
      } else {
        setValidation({ isValid: true, message: 'Email is valid' });
      }
    };

    const handleEnter = (event: KeyboardEvent) => {
      if (inputValue) {
        validateInput(inputValue);
        event.preventDefault();
      }
    };

    const handleChange = (value: string) => {
      setInputValue(value);
      setValidation({ isValid: false, message: '' });
    };

    return (
      <div style={{ height: '300px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Form Validation with Enter Key</Text>
          <Text variant="bodyMd" as="p">Enter an email address and press Enter to validate:</Text>

          <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <input
                type="email"
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Enter email address"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px'
                }}
              />
            </div>

            {validation.message && (
              <div style={{
                padding: '12px',
                backgroundColor: validation.isValid ? '#d4edda' : '#f8d7da',
                border: `1px solid ${validation.isValid ? '#c3e6cb' : '#f5c6cb'}`,
                borderRadius: '4px',
                marginBottom: '16px'
              }}>
                <Text variant="bodySm" style={{ color: validation.isValid ? '#155724' : '#721c24' }}>
                  {validation.message}
                </Text>
              </div>
            )}

            <Text variant="bodySm" as="p">
              💡 Tip: Press Enter while the input field is focused to validate the email
            </Text>
          </div>
        </div>

        <KeypressListener keyCode="Enter" handler={handleEnter} />
      </div>
    );
  },
};

export const PreventDefaultDemo: Story = {
  render: () => {
    const [preventDefault, setPreventDefault] = React.useState(false);
    const [scrollCount, setScrollCount] = React.useState(0);

    const handleArrowDown = (event: KeyboardEvent) => {
      if (preventDefault) {
        event.preventDefault();
        setScrollCount(prev => prev + 1);
      }
    };

    return (
      <div style={{ height: '400px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Prevent Default Behavior</Text>
          <Text variant="bodyMd" as="p">Toggle prevent default and use arrow down key:</Text>

          <div style={{ margin: '20px 0' }}>
            <Button onClick={() => setPreventDefault(!preventDefault)}>
              Prevent Default: {preventDefault ? 'ON' : 'OFF'}
            </Button>
          </div>

          {preventDefault && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              <Text variant="bodySm">
                ⚠️ Page scrolling is now disabled. Arrow down key events are being captured.
                Scroll count: {scrollCount}
              </Text>
            </div>
          )}

          <div style={{
            height: '200px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '16px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}>
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <Text variant="bodyMd">
                  Scrollable content item {i + 1}. Try using arrow down key to scroll this area.
                  {preventDefault && ' (Scrolling disabled)'}
                </Text>
              </div>
            ))}
          </div>
        </div>

        <KeypressListener keyCode="ArrowDown" handler={handleArrowDown} preventDefault={preventDefault} />
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [announcements, setAnnouncements] = React.useState<string[]>([]);
    const [focusedElement, setFocusedElement] = React.useState('');

    const addAnnouncement = (message: string) => {
      const timestamp = new Date().toLocaleTimeString();
      setAnnouncements(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 4)]);
    };

    const handleTab = (event: KeyboardEvent) => {
      addAnnouncement('Tab key pressed - moving to next focusable element');
      setFocusedElement('Next focusable element');
    };

    const handleShiftTab = (event: KeyboardEvent) => {
      if (event.shiftKey) {
        addAnnouncement('Shift+Tab pressed - moving to previous focusable element');
        setFocusedElement('Previous focusable element');
      }
    };

    const handleEnter = (event: KeyboardEvent) => {
      addAnnouncement('Enter key pressed - activating focused element');
    };

    const handleEscape = (event: KeyboardEvent) => {
      addAnnouncement('Escape key pressed - closing modal or canceling action');
    };

    return (
      <div style={{ height: '400px', padding: '40px' }}>
        <div>
          <Text variant="headingMd">Accessibility Keyboard Navigation</Text>
          <Text variant="bodyMd" as="p">These listeners support screen reader users and keyboard navigation:</Text>

          <div style={{ marginTop: '20px' }}>
            <Card sectioned>
              <Text variant="headingSm">Keyboard Navigation Support</Text>
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Badge status="info">Tab</Badge>
                  <Text variant="bodySm">Move to next focusable element</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Badge status="info">Shift+Tab</Badge>
                  <Text variant="bodySm">Move to previous focusable element</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Badge status="info">Enter</Badge>
                  <Text variant="bodySm">Activate focused element</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Badge status="info">Escape</Badge>
                  <Text variant="bodySm">Close modal or cancel action</Text>
                </div>
              </div>
            </Card>
          </div>

          {announcements.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <Card sectioned>
                <Text variant="headingSm">Screen Reader Announcements</Text>
                <div style={{ marginTop: '12px' }}>
                  {announcements.map((announcement, index) => (
                    <div key={index} style={{
                      padding: '8px',
                      backgroundColor: index === 0 ? '#e3f2fd' : '#f5f5f5',
                      borderRadius: '4px',
                      marginBottom: '4px',
                      border: index === 0 ? '1px solid #2196f3' : '1px solid #ddd'
                    }}>
                      <Text variant="bodySm" style={{ fontFamily: 'monospace' }}>
                        {announcement}
                      </Text>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {focusedElement && (
            <div style={{ marginTop: '20px' }}>
              <Text variant="bodySm">
                <strong>Current Focus:</strong> {focusedElement}
              </Text>
            </div>
          )}
        </div>

        <KeypressListener keyCode="Tab" handler={handleTab} />
        <KeypressListener keyCode="Tab" handler={handleShiftTab} />
        <KeypressListener keyCode="Enter" handler={handleEnter} />
        <KeypressListener keyCode="Escape" handler={handleEscape} />
      </div>
    );
  },
};