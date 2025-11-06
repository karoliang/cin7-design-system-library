import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Buttons are clickable elements used to trigger actions. They\'re an essential part of any user interface and should be used for primary actions, secondary actions, and destructive actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button text content',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'plain', 'plainMono', 'critical'],
      description: 'Button visual style',
    },
    size: {
      control: 'select',
      options: ['micro', 'slim', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    icon: {
      control: 'text',
      description: 'Icon name (if any)',
    },
    submit: {
      control: 'boolean',
      description: 'Render as submit button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="plain">Plain</Button>
        <Button variant="plainMono">Plain Mono</Button>
        <Button variant="critical">Critical</Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Button size="micro">Micro</Button>
      <Button size="slim">Slim</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

// Vanilla JS Button Component
class VanillaButton {
  private container: HTMLElement;
  private button: HTMLButtonElement;
  private onClick?: () => void;

  constructor(options: {
    label: string;
    variant?: 'primary' | 'secondary' | 'critical' | 'plain';
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
  }) {
    this.container = document.createElement('div');
    this.container.style.display = 'inline-block';
    this.createButton(options);
    this.onClick = options.onClick;
  }

  private createButton(options: any) {
    this.button = document.createElement('button');
    this.button.textContent = options.label;
    this.setupStyles(options.variant || 'primary');

    this.button.addEventListener('click', () => {
      if (this.onClick && !options.disabled && !options.loading) {
        this.onClick();
      }
    });

    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = 'translateY(-1px)';
      this.button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
    });

    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = 'translateY(0)';
      this.button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    });

    this.container.appendChild(this.button);
  }

  private setupStyles(variant: string) {
    const styles = {
      primary: {
        background: '#006fbb',
        color: 'white',
        border: '1px solid #006fbb'
      },
      secondary: {
        background: '#ffffff',
        color: '#202223',
        border: '1px solid #d1d5db'
      },
      critical: {
        background: '#d82c0d',
        color: 'white',
        border: '1px solid #d82c0d'
      },
      plain: {
        background: 'transparent',
        color: '#202223',
        border: '1px solid transparent'
      }
    };

    const style = styles[variant as keyof typeof styles];

    this.button.style.cssText = `
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      outline: none;
      font-family: system-ui, -apple-system, sans-serif;
      background: ${style.background};
      color: ${style.color};
      border: ${style.border};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

    this.button.addEventListener('focus', () => {
      this.button.style.boxShadow = `0 0 0 2px ${style.background}40, 0 2px 4px rgba(0, 0, 0, 0.1)`;
    });

    this.button.addEventListener('blur', () => {
      this.button.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    });
  }

  setLabel(label: string) {
    this.button.textContent = label;
  }

  setVariant(variant: string) {
    this.setupStyles(variant);
  }

  setDisabled(disabled: boolean) {
    this.button.disabled = disabled;
    this.button.style.opacity = disabled ? '0.6' : '1';
    this.button.style.cursor = disabled ? 'not-allowed' : 'pointer';
  }

  setLoading(loading: boolean) {
    this.button.disabled = loading;
    this.button.textContent = loading ? 'Loading...' : this.button.textContent.replace('Loading...', '');
    this.button.style.cursor = loading ? 'wait' : 'pointer';
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.container);
  }

  destroy() {
    this.container.remove();
  }
}

// Vanilla JS React Wrapper
const VanillaButtonWrapper: React.FC<{
  label: string;
  variant?: 'primary' | 'secondary' | 'plain' | 'critical';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}> = ({ label, variant = 'primary', onClick, disabled = false, loading = false }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<VanillaButton | null>(null);

  React.useEffect(() => {
    if (containerRef.current && !buttonRef.current) {
      buttonRef.current = new VanillaButton({
        label,
        variant,
        onClick,
        disabled,
        loading
      });
      buttonRef.current.mount(containerRef.current);
    }

    return () => {
      if (buttonRef.current) {
        buttonRef.current.destroy();
        buttonRef.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setLabel(label);
    }
  }, [label]);

  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setVariant(variant);
    }
  }, [variant]);

  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setDisabled(disabled);
    }
  }, [disabled]);

  React.useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setLoading(loading);
    }
  }, [loading]);

  return <div ref={containerRef} />;
};

// ExtJS Button Component
const ExtJSButton: React.FC<{
  text: string;
  iconCls?: string;
  handler?: () => void;
  disabled?: boolean;
  ui?: 'default' | 'primary' | 'danger' | 'success';
}> = ({ text, iconCls, handler, disabled = false, ui = 'default' }) => {
  const [mounted, setMounted] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setPressed(true);
    setTimeout(() => setPressed(false), 150);
    if (handler && !disabled) {
      handler();
    }
  };

  const getUIStyles = () => {
    const uiStyles = {
      default: {
        background: '#f8f9fa',
        border: '1px solid #ced4da',
        color: '#495057'
      },
      primary: {
        background: '#007bff',
        border: '1px solid #0056b3',
        color: 'white'
      },
      danger: {
        background: '#dc3545',
        border: '1px solid #bd2130',
        color: 'white'
      },
      success: {
        background: '#28a745',
        border: '1px solid #1e7e34',
        color: 'white'
      }
    };

    return uiStyles[ui];
  };

  const styles = getUIStyles();

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !mounted}
      style={{
        padding: '6px 12px',
        border: styles.border,
        borderRadius: '3px',
        backgroundColor: styles.background,
        color: styles.color,
        fontFamily: 'Arial, sans-serif',
        fontSize: '13px',
        fontWeight: 'normal',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: (disabled || !mounted) ? 0.6 : 1,
        transform: pressed ? 'translateY(1px)' : 'translateY(0)',
        boxShadow: pressed ? 'inset 0 1px 2px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        transition: 'all 0.1s ease'
      }}
    >
      {iconCls && <span>{iconCls}</span>}
      {!mounted ? 'Loading...' : `ExtJS: ${text}`}
    </button>
  );
};

// TypeScript Pattern Component
interface TypeSafeButtonProps {
  id: string;
  label: string;
  variant: 'primary' | 'secondary' | 'critical' | 'success';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  confirmationText?: string;
}

const TypeSafeButton: React.FC<TypeSafeButtonProps> = ({
  id,
  label,
  variant,
  onClick,
  disabled = false,
  loading = false,
  size = 'medium',
  type = 'button',
  ariaLabel,
  confirmationText
}) => {
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: '1px solid #5a67d8',
        color: 'white',
        hover: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
      },
      secondary: {
        background: '#ffffff',
        border: '2px solid #e2e8f0',
        color: '#4a5568',
        hover: '#f7fafc'
      },
      critical: {
        background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
        border: '1px solid #c53030',
        color: 'white',
        hover: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)'
      },
      success: {
        background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
        border: '1px solid #2f855a',
        color: 'white',
        hover: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)'
      }
    };

    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      small: { padding: '6px 12px', fontSize: "12px" },
      medium: { padding: '10px 20px', fontSize: "14px" },
      large: { padding: '14px 28px', fontSize: '16px' }
    };

    return sizes[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount(prev => prev + 1);

    if (confirmationText && !isConfirmed) {
      setIsConfirmed(true);
      setTimeout(() => setIsConfirmed(false), 3000);
      return;
    }

    onClick(e);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <button
        id={id}
        type={type}
        onClick={handleClick}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={loading ? `${id}-loading` : undefined}
        style={{
          padding: sizeStyles.padding,
          fontSize: sizeStyles.fontSize,
          fontWeight: '600',
          borderRadius: '8px',
          border: variantStyles.border,
          background: loading ? 'linear-gradient(135deg, #cbd5e0 0%, #a0aec0 100%)' : variantStyles.background,
          color: loading ? '#718096' : variantStyles.color,
          cursor: (disabled || loading) ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          outline: 'none',
          position: 'relative',
          overflow: 'hidden',
          transform: 'translateY(0)',
          minWidth: '120px'
        }}
        onMouseEnter={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.background = variantStyles.hover;
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)';
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading) {
            e.currentTarget.style.background = variantStyles.background;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = `0 0 0 3px ${variantStyles.background}40, 0 4px 6px rgba(0, 0, 0, 0.1)`;
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {loading && (
            <span style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
          )}
          <span>{isConfirmed && confirmationText ? confirmationText : `TS: ${label}`}</span>
          {clickCount > 1 && (
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '2px 6px',
              borderRadius: '12px',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              {clickCount}
            </span>
          )}
        </span>
      </button>

      {loading && (
        <div
          id={`${id}-loading`}
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: 0
          }}
          role="alert"
          aria-live="polite"
        >
          Loading, please wait...
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Language Variants
export const VanillaJS: Story = {
  render: () => {
    const [clickCounts, setClickCounts] = React.useState<Record<string, number>>({});
    const [loadingStates, setLoadingStates] = React.useState<Record<string, boolean>>({});

    const handleVanillaClick = (variant: string) => {
      setClickCounts(prev => ({ ...prev, [variant]: (prev[variant] || 0) + 1 }));
    };

    const handleVanillaAsync = (variant: string) => {
      setLoadingStates(prev => ({ ...prev, [variant]: true }));
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [variant]: false }));
        setClickCounts(prev => ({ ...prev, [variant]: (prev[variant] || 0) + 1 }));
      }, 2000);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>Vanilla JS Implementation</h3>
        <p>Class-based JavaScript components with DOM manipulation</p>

        <div style={{ marginBottom: '16px' }}>
          <strong>Click counts by variant:</strong>
          <pre style={{ fontSize: "12px", margin: '8px 0', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(clickCounts, null, 2)}
          </pre>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <VanillaButtonWrapper
              label="Primary"
              variant="primary"
              onClick={() => handleVanillaClick('primary')}
            />
            <VanillaButtonWrapper
              label="Secondary"
              variant="secondary"
              onClick={() => handleVanillaClick('secondary')}
            />
            <VanillaButtonWrapper
              label="Critical"
              variant="critical"
              onClick={() => handleVanillaClick('critical')}
            />
            <VanillaButtonWrapper
              label="Plain"
              variant="plain"
              onClick={() => handleVanillaClick('plain')}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <VanillaButtonWrapper
              label="Disabled"
              variant="primary"
              onClick={() => handleVanillaClick('disabled')}
              disabled
            />
            <VanillaButtonWrapper
              label="Async Action"
              variant="primary"
              onClick={() => handleVanillaAsync('async')}
              loading={loadingStates.async}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const ExtJS: Story = {
  render: () => {
    const [messages, setMessages] = React.useState<string[]>([]);
    const [actionCounts, setActionCounts] = React.useState<Record<string, number>>({});

    const handleExtJSAction = (action: string) => {
      setMessages(prev => [`ExtJS ${action} action executed`, ...prev.slice(0, 2)]);
      setActionCounts(prev => ({ ...prev, [action]: (prev[action] || 0) + 1 }));
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>ExtJS Implementation</h3>
        <p>Enterprise-style button components with ExtJS architecture patterns</p>

        <div style={{ marginBottom: '16px' }}>
          <strong>Action counters:</strong>
          <pre style={{ fontSize: "12px", margin: '8px 0', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {JSON.stringify(actionCounts, null, 2)}
          </pre>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <ExtJSButton text="Save" iconCls="💾" handler={() => handleExtJSAction('save')} />
            <ExtJSButton text="Edit" iconCls="✏️" handler={() => handleExtJSAction('edit')} />
            <ExtJSButton text="Delete" iconCls="🗑️" handler={() => handleExtJSAction('delete')} ui="danger" />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <ExtJSButton text="Submit" handler={() => handleExtJSAction('submit')} ui="primary" />
            <ExtJSButton text="Cancel" handler={() => handleExtJSAction('cancel')} />
            <ExtJSButton text="Export" iconCls="📤" handler={() => handleExtJSAction('export')} ui="success" />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <ExtJSButton text="Disabled" handler={() => handleExtJSAction('disabled')} disabled />
            <ExtJSButton text="Loading" handler={() => handleExtJSAction('loading')} disabled />
          </div>
        </div>

        {messages.length > 0 && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#e3f2fd',
            border: '1px solid #1976d2',
            borderRadius: '4px',
            fontFamily: 'Arial, sans-serif',
            fontSize: "12px"
          }}>
            <strong>ExtJS Action Log:</strong>
            {messages.map((message, index) => (
              <div key={index} style={{ marginTop: '4px', color: '#1565c0' }}>
                {message}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const TypeScript: Story = {
  render: () => {
    const [events, setEvents] = React.useState<string[]>([]);

    const handleTypeSafeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const button = e.currentTarget;
      const buttonId = button.id;
      const timestamp = new Date().toLocaleTimeString();

      setEvents(prev => [
        `${timestamp}: Clicked ${buttonId} (native event: ${e.type})`,
        ...prev.slice(0, 4)
      ]);
    };

    const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleTypeSafeClick(e);
      console.log('Form submitted via TypeScript button');
    };

    const handleDeleteAction = (e: React.MouseEvent<HTMLButtonElement>) => {
      const confirmed = window.confirm('Are you sure you want to delete?');
      if (confirmed) {
        handleTypeSafeClick(e);
        console.log('Delete action confirmed');
      }
    };

    return (
      <div style={{ maxWidth: '700px' }}>
        <h3>TypeScript Implementation</h3>
        <p>Type-safe buttons with comprehensive props, event handling, and accessibility</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <TypeSafeButton
              id="ts-primary"
              label="Primary Action"
              variant="primary"
              onClick={handleTypeSafeClick}
              ariaLabel="Perform primary action"
            />
            <TypeSafeButton
              id="ts-secondary"
              label="Secondary"
              variant="secondary"
              onClick={handleTypeSafeClick}
              size="small"
            />
            <TypeSafeButton
              id="ts-success"
              label="Success"
              variant="success"
              onClick={handleTypeSafeClick}
              size="large"
            />
            <TypeSafeButton
              id="ts-critical"
              label="Delete"
              variant="critical"
              onClick={handleDeleteAction}
              confirmationText="Confirm Delete?"
              type="button"
              ariaLabel="Delete item with confirmation"
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <TypeSafeButton
              id="ts-submit"
              label="Submit Form"
              variant="primary"
              onClick={handleFormSubmit}
              type="submit"
              confirmationText="Submit Form?"
            />
            <TypeSafeButton
              id="ts-disabled"
              label="Disabled Button"
              variant="secondary"
              onClick={handleTypeSafeClick}
              disabled
            />
          </div>
        </div>

        {events.length > 0 && (
          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontFamily: 'monospace'
          }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: "14px", color: '#374151' }}>
              TypeScript Event Log (Type-Safe):
            </h4>
            {events.map((event, index) => (
              <div key={index} style={{
                fontSize: '11px',
                color: '#6b7280',
                marginBottom: '4px',
                padding: '4px 8px',
                backgroundColor: index % 2 === 0 ? '#f1f5f9' : 'transparent',
                borderRadius: '4px'
              }}>
                {event}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <Button>Normal width</Button>
      <Button fullWidth>Full width</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Save</Button>
      <Button variant="plain">Settings</Button>
      <Button variant="critical">Delete</Button>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [clickCount, setClickCount] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleClick = () => {
      setClickCount(prev => prev + 1);
    };

    const handleAsyncClick = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <div>
          <p>Button clicked: {clickCount} times</p>
          <Button onClick={handleClick}>Click me!</Button>
        </div>

        <div>
          <p>Async operation:</p>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={handleAsyncClick}
          >
            {isLoading ? 'Processing...' : 'Start Async Operation'}
          </Button>
        </div>
      </div>
    );
  },
};