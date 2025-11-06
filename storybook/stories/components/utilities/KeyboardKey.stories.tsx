import type { Meta, StoryObj } from '@storybook/react';
import { KeyboardKey, Card, BlockStack, InlineStack, Text, Button, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Typography/KeyboardKey',
  component: KeyboardKey,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'KeyboardKey displays keyboard keys in a styled format, perfect for showing keyboard shortcuts and key combinations in documentation and tooltips.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'The key or key combination to display',
    },
  },
} satisfies Meta<typeof KeyboardKey>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Enter',
  },
};

export const SingleKeys: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="300" wrap>
        <KeyboardKey>Enter</KeyboardKey>
        <KeyboardKey>Esc</KeyboardKey>
        <KeyboardKey>Space</KeyboardKey>
        <KeyboardKey>Tab</KeyboardKey>
        <KeyboardKey>Shift</KeyboardKey>
        <KeyboardKey>Ctrl</KeyboardKey>
        <KeyboardKey>Alt</KeyboardKey>
        <KeyboardKey>Meta</KeyboardKey>
        <KeyboardKey>Cmd</KeyboardKey>
        <KeyboardKey>Fn</KeyboardKey>
      </InlineStack>
    </div>
  ),
};

export const LetterKeys: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
          <KeyboardKey key={letter}>{letter}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  ),
};

export const NumberKeys: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
          <KeyboardKey key={number}>{number}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  ),
};

export const SymbolKeys: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        <KeyboardKey>!</KeyboardKey>
        <KeyboardKey>@</KeyboardKey>
        <KeyboardKey>#</KeyboardKey>
        <KeyboardKey>$</KeyboardKey>
        <KeyboardKey>%</KeyboardKey>
        <KeyboardKey>^</KeyboardKey>
        <KeyboardKey>&</KeyboardKey>
        <KeyboardKey>*</KeyboardKey>
        <KeyboardKey>(</KeyboardKey>
        <KeyboardKey>)</KeyboardKey>
        <KeyboardKey>-</KeyboardKey>
        <KeyboardKey>+</KeyboardKey>
        <KeyboardKey>=</KeyboardKey>
        <KeyboardKey>[</KeyboardKey>
        <KeyboardKey>]</KeyboardKey>
        <KeyboardKey>;</KeyboardKey>
        <KeyboardKey>'</KeyboardKey>
        <KeyboardKey>,</KeyboardKey>
        <KeyboardKey>.</KeyboardKey>
        <KeyboardKey>/</KeyboardKey>
        <KeyboardKey>\</KeyboardKey>
        <KeyboardKey>`</KeyboardKey>
        <KeyboardKey>~</KeyboardKey>
      </InlineStack>
    </div>
  ),
};

export const ArrowKeys: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="300">
        <Text as="p">Navigation Keys:</Text>
        <InlineStack gap="200">
          <KeyboardKey>↑</KeyboardKey>
          <KeyboardKey>↓</KeyboardKey>
          <KeyboardKey>←</KeyboardKey>
          <KeyboardKey>→</KeyboardKey>
        </InlineStack>

        <Text as="p">Function Keys:</Text>
        <InlineStack gap="200" wrap>
          <KeyboardKey>F1</KeyboardKey>
          <KeyboardKey>F2</KeyboardKey>
          <KeyboardKey>F3</KeyboardKey>
          <KeyboardKey>F4</KeyboardKey>
          <KeyboardKey>F5</KeyboardKey>
          <KeyboardKey>F6</KeyboardKey>
          <KeyboardKey>F7</KeyboardKey>
          <KeyboardKey>F8</KeyboardKey>
          <KeyboardKey>F9</KeyboardKey>
          <KeyboardKey>F10</KeyboardKey>
          <KeyboardKey>F11</KeyboardKey>
          <KeyboardKey>F12</KeyboardKey>
        </InlineStack>
      </BlockStack>
    </div>
  ),
};

export const KeyCombinations: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="400">
        <div>
          <Text as="p">Common Combinations:</Text>
          <InlineStack gap="300" wrap>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>C</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>V</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Z</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>S</KeyboardKey>
            </InlineStack>
          </InlineStack>
        </div>

        <div>
          <Text as="p">Mac Combinations:</Text>
          <InlineStack gap="300" wrap>
            <InlineStack gap="100">
              <KeyboardKey>⌘</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>C</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>⌘</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>V</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>⌘</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>⌥</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Esc</KeyboardKey>
            </InlineStack>
          </InlineStack>
        </div>

        <div>
          <Text as="p">Advanced Combinations:</Text>
          <InlineStack gap="300" wrap>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Shift</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>T</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Alt</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Tab</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Alt</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Delete</KeyboardKey>
            </InlineStack>
          </InlineStack>
        </div>
      </BlockStack>
    </div>
  ),
};

export const ShortcutGuide: Story = {
  render: () => {
    const shortcuts = [
      { category: 'Navigation', keys: ['Ctrl', '+', 'Home'], description: 'Go to beginning' },
      { category: 'Navigation', keys: ['Ctrl', '+', 'End'], description: 'Go to end' },
      { category: 'Editing', keys: ['Ctrl', '+', 'X'], description: 'Cut' },
      { category: 'Editing', keys: ['Ctrl', '+', 'C'], description: 'Copy' },
      { category: 'Editing', keys: ['Ctrl', '+', 'V'], description: 'Paste' },
      { category: 'Editing', keys: ['Ctrl', '+', 'Z'], description: 'Undo' },
      { category: 'Editing', keys: ['Ctrl', '+', 'Y'], description: 'Redo' },
      { category: 'Selection', keys: ['Ctrl', '+', 'A'], description: 'Select all' },
      { category: 'Search', keys: ['Ctrl', '+', 'F'], description: 'Find' },
      { category: 'Search', keys: ['Ctrl', '+', 'H'], description: 'Replace' },
      { category: 'Windows', keys: ['Ctrl', '+', 'W'], description: 'Close tab' },
      { category: 'Windows', keys: ['Ctrl', '+', 'T'], description: 'New tab' },
    ];

    const categories = Array.from(new Set(shortcuts.map(s => s.category)));

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Keyboard Shortcuts</h3>
                <Text as="p">Master these shortcuts to work more efficiently.</Text>
              </div>

              {categories.map((category) => (
                <div key={category}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>{category}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                    {shortcuts
                      .filter(shortcut => shortcut.category === category)
                      .map((shortcut, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '6px'
                        }}>
                          <Text variant="bodySm">{shortcut.description}</Text>
                          <InlineStack gap="50">
                            {shortcut.keys.map((key, keyIndex) => (
                              <React.Fragment key={keyIndex}>
                                {key !== '+' ? <KeyboardKey>{key}</KeyboardKey> : <Text>{key}</Text>}
                              </React.Fragment>
                            ))}
                          </InlineStack>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const InteractiveKeyboard: Story = {
  render: () => {
    const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
    const [keyHistory, setKeyHistory] = React.useState<string[][]>([]);

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const keyMap: { [key: string]: string } = {
          'Control': 'Ctrl',
          'Meta': '⌘',
          'Alt': 'Alt',
          'Shift': 'Shift',
          'Enter': 'Enter',
          'Escape': 'Esc',
          'ArrowUp': '↑',
          'ArrowDown': '↓',
          'ArrowLeft': '←',
          'ArrowRight': '→',
          ' ': 'Space',
        };

        const key = keyMap[e.key] || e.key.toUpperCase();

        setPressedKeys(prev => {
          const newKeys = prev.includes(key) ? prev : [...prev, key];

          if (newKeys.length > 4) {
            setKeyHistory(history => [...history.slice(-4), newKeys]);
            return [];
          }

          return newKeys;
        });
      };

      const handleKeyUp = () => {
        setTimeout(() => {
          if (pressedKeys.length > 0) {
            setKeyHistory(history => [...history.slice(-4), pressedKeys]);
            setPressedKeys([]);
          }
        }, 100);
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, [pressedKeys]);

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Interactive Keyboard Demo</h3>
                <Text as="p">Press any keys to see them displayed below. Try combinations!</Text>
              </div>

              <div style={{
                minHeight: '120px',
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '2px dashed #e1e3e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {pressedKeys.length > 0 ? (
                  <InlineStack gap="200">
                    {pressedKeys.map((key, index) => (
                      <React.Fragment key={index}>
                        <KeyboardKey>{key}</KeyboardKey>
                        {index < pressedKeys.length - 1 && <Text>+</Text>}
                      </React.Fragment>
                    ))}
                  </InlineStack>
                ) : (
                  <Text as="p" tone="subdued">Press keys to see them here...</Text>
                )}
              </div>

              {keyHistory.length > 0 && (
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: "14px" }}>Recent Combinations:</h4>
                  <BlockStack gap="200">
                    {keyHistory.map((combo, index) => (
                      <div key={index} style={{
                        padding: '8px 12px',
                        backgroundColor: '#f1f3f4',
                        borderRadius: '6px'
                      }}>
                        <InlineStack gap="200">
                          {combo.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              <KeyboardKey>{key}</KeyboardKey>
                              {keyIndex < combo.length - 1 && <Text>+</Text>}
                            </React.Fragment>
                          ))}
                        </InlineStack>
                      </div>
                    ))}
                  </BlockStack>
                </div>
              )}

              <div style={{
                padding: '12px',
                backgroundColor: '#e3f2fd',
                borderRadius: '6px',
                border: '1px solid #90caf9'
              }}>
                <Text variant="bodySm" as="p">
                  <strong>Tip:</strong> Try common shortcuts like Ctrl+C, Ctrl+V, or Ctrl+Z.
                  On Mac, use the ⌘ key instead of Ctrl.
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const GamingKeyboard: Story = {
  render: () => {
    const gameControls = [
      { keys: ['W', 'A', 'S', 'D'], description: 'Movement', color: '#4CAF50' },
      { keys: ['Space'], description: 'Jump', color: '#2196F3' },
      { keys: ['Shift'], description: 'Run', color: '#FF9800' },
      { keys: ['E'], description: 'Interact', color: '#9C27B0' },
      { keys: ['Q'], description: 'Ability 1', color: '#F44336' },
      { keys: ['R'], description: 'Reload', color: '#607D8B' },
      { keys: ['Tab'], description: 'Scoreboard', color: '#795548' },
      { keys: ['Esc'], description: 'Menu', color: '#3F51B5' },
    ];

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Game Controls</h3>
                <Text as="p">Common keyboard layouts for gaming controls.</Text>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {gameControls.map((control, index) => (
                  <div key={index} style={{
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: `1px solid ${control.color}20`,
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '4px',
                      height: '100%',
                      backgroundColor: control.color,
                      borderRadius: '8px 0 0 8px'
                    }} />
                    <BlockStack gap="200">
                      <Text as="p" fontWeight="600">{control.description}</Text>
                      <InlineStack gap="100" wrap>
                        {control.keys.map((key, keyIndex) => (
                          <KeyboardKey key={keyIndex}>{key}</KeyboardKey>
                        ))}
                      </InlineStack>
                    </BlockStack>
                  </div>
                ))}
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#fff3e0',
                borderRadius: '8px',
                border: '1px solid #ffcc02'
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">WASD Movement Layout</Text>
                  <Text variant="bodySm" as="p">
                    The WASD keys are the standard movement controls in most PC games,
                    providing easy access to other keys while keeping fingers in a comfortable position.
                  </Text>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gap: '4px' }}>
                      <div />
                      <KeyboardKey style={{ width: '40px', height: '40px' }}>W</KeyboardKey>
                      <div />
                      <KeyboardKey style={{ width: '40px', height: '40px' }}>A</KeyboardKey>
                      <KeyboardKey style={{ width: '40px', height: '40px' }}>S</KeyboardKey>
                      <KeyboardKey style={{ width: '40px', height: '40px' }}>D</KeyboardKey>
                    </div>
                  </div>
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const AccessibilityInfo: Story = {
  render: () => {
    const accessibilityShortcuts = [
      {
        platform: 'Windows',
        shortcuts: [
          { keys: ['Alt', '+', 'Tab'], description: 'Switch between windows' },
          { keys: ['Alt', '+', 'F4'], description: 'Close current window' },
          { keys: ['Ctrl', '+', 'Esc'], description: 'Open Task Manager' },
          { keys: ['Windows', '+', 'D'], description: 'Show desktop' },
          { keys: ['Windows', '+', 'L'], description: 'Lock computer' },
        ]
      },
      {
        platform: 'Mac',
        shortcuts: [
          { keys: ['⌘', '+', 'Tab'], description: 'Switch between apps' },
          { keys: ['⌘', '+', 'Q'], description: 'Quit current app' },
          { keys: ['⌘', '+', '⌥', '+', 'Esc'], description: 'Force Quit' },
          { keys: ['⌘', '+', 'F3'], description: 'Show desktop' },
          { keys: ['⌘', '+', '⌃', '+', 'Q'], description: 'Lock screen' },
        ]
      }
    ];

    return (
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Accessibility Shortcuts</h3>
                <Text as="p">Essential keyboard shortcuts for accessibility and system navigation.</Text>
              </div>

              {accessibilityShortcuts.map((platform) => (
                <div key={platform.platform}>
                  <h4 style={{ margin: '0 0 16px 0', fontSize: "18px" }}>
                    <Badge tone="info">{platform.platform}</Badge>
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
                    {platform.shortcuts.map((shortcut, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e1e3e5'
                      }}>
                        <Text>{shortcut.description}</Text>
                        <InlineStack gap="50">
                          {shortcut.keys.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              {key !== '+' ? <KeyboardKey>{key}</KeyboardKey> : <Text>{key}</Text>}
                            </React.Fragment>
                          ))}
                        </InlineStack>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{
                padding: '16px',
                backgroundColor: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #4CAF50'
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">Accessibility Tips</Text>
                  <Text variant="bodySm" as="p">
                    • Use keyboard navigation when mouse control is difficult<br/>
                    • Learn screen reader shortcuts for better accessibility<br/>
                    • Customize keyboard shortcuts in system settings<br/>
                    • Use sticky keys for one-handed keyboard operation
                  </Text>
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Styled Keyboard Examples</h3>
                <Text as="p">Different ways to style and present keyboard keys.</Text>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0' }}>Standard Style:</h4>
                <InlineStack gap="200">
                  <KeyboardKey>Ctrl</KeyboardKey>
                  <Text>+</Text>
                  <KeyboardKey>S</KeyboardKey>
                </InlineStack>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0' }}>Compact Style:</h4>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {['Ctrl', '+', 'S'].map((item, index) => (
                    <div key={index} style={{
                      padding: item === '+' ? '0 4px' : '2px 8px',
                      backgroundColor: item === '+' ? 'transparent' : '#f1f3f4',
                      border: item === '+' ? 'none' : '1px solid #dadce0',
                      borderRadius: item === '+' ? '0' : '4px',
                      fontSize: "12px",
                      fontFamily: 'monospace'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0' }}>Highlighted Style:</h4>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {['Ctrl', '+', 'S'].map((item, index) => (
                    <div key={index} style={{
                      padding: item === '+' ? '0 4px' : '4px 10px',
                      backgroundColor: item === '+' ? 'transparent' : '#e3f2fd',
                      border: item === '+' ? 'none' : '1px solid #2196F3',
                      borderRadius: item === '+' ? '0' : '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: item === '+' ? '#666' : '#1976D2'
                    }}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ margin: '0 0 12px 0' }}>Minimal Style:</h4>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                  {['Ctrl', '+', 'S'].map((item, index) => (
                    <span key={index} style={{
                      padding: item === '+' ? '0 2px' : '1px 6px',
                      backgroundColor: item === '+' ? 'transparent' : '#fafafa',
                      border: item === '+' ? 'none' : '1px solid #e0e0e0',
                      borderRadius: '2px',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};