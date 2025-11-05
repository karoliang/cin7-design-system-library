import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Button, Text, Badge, Icon } from '@shopify/polaris';
import { ViewMinor, EditMinor, DeleteMinor, ExportMinor, ImportMinor } from '@shopify/polaris-icons';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<VanillaButton | null>(null);

  useEffect(() => {
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

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setLabel(label);
    }
  }, [label]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setVariant(variant);
    }
  }, [variant]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setDisabled(disabled);
    }
  }, [disabled]);

  useEffect(() => {
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
  const [mounted, setMounted] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    // Simulate ExtJS component initialization
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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

const meta = {
  title: 'Polaris/Multi-Language/Button',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive multi-language implementation of Button components showing React, Vanilla JS, ExtJS, and TypeScript patterns. Demonstrates different architectural approaches, event handling, state management, and UI/UX patterns across different layers of the Cin7 DSL framework.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ReactImplementation: Story = {
  render: () => {
    const [clickCount, setClickCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setClickCount(prev => prev + 1);
    };

    const handleAsyncClick = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      setClickCount(prev => prev + 1);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>React (Polaris) Implementation</h3>
        <p>Using Shopify Polaris Button with React state management and hooks</p>

        <div style={{ marginBottom: '24px' }}>
          <Text as="p">Button clicked: <strong>{clickCount}</strong> times</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button onClick={handleClick}>Primary Action</Button>
            <Button variant="secondary" onClick={handleClick}>Secondary</Button>
            <Button variant="critical" onClick={handleClick}>Critical</Button>
            <Button variant="plain" onClick={handleClick}>Plain</Button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button disabled>Disabled</Button>
            <Button loading onClick={handleClick}>Loading State</Button>
            <Button onClick={handleAsyncClick} loading={isLoading}>
              {isLoading ? 'Processing...' : 'Async Action'}
            </Button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button size="small" onClick={handleClick}>Small</Button>
            <Button size="medium" onClick={handleClick}>Medium</Button>
            <Button size="large" onClick={handleClick}>Large</Button>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Button icon={ViewMinor} onClick={handleClick}>With Icon</Button>
            <Button destructive onClick={handleClick}>Destructive</Button>
          </div>
        </div>
      </div>
    );
  },
};

export const VanillaJSImplementation: Story = {
  render: () => {
    const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

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
          <Text as="p">Click counts by variant:</Text>
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

export const ExtJSImplementation: Story = {
  render: () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [actionCounts, setActionCounts] = useState<Record<string, number>>({});

    const handleExtJSAction = (action: string) => {
      setMessages(prev => [`ExtJS ${action} action executed`, ...prev.slice(0, 2)]);
      setActionCounts(prev => ({ ...prev, [action]: (prev[action] || 0) + 1 }));
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3>ExtJS Implementation</h3>
        <p>Enterprise-style button components with ExtJS architecture patterns</p>

        <div style={{ marginBottom: '16px' }}>
          <Text as="p">Action counters:</Text>
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

export const TypeScriptImplementation: Story = {
  render: () => {
    const [events, setEvents] = useState<string[]>([]);

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

export const SideBySideComparison: Story = {
  render: () => {
    const [metrics, setMetrics] = useState({
      react: 0,
      vanilla: 0,
      extjs: 0,
      typescript: 0
    });

    const updateMetric = (framework: keyof typeof metrics) => {
      setMetrics(prev => ({ ...prev, [framework]: prev[framework] + 1 }));
    };

    const totalClicks = Object.values(metrics).reduce((sum, count) => sum + count, 0);

    return (
      <div style={{ maxWidth: '1000px' }}>
        <h3>Side-by-Side Comparison</h3>
        <p>Compare button implementations across all four frameworks simultaneously</p>

        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <Text as="p" variant="headingMd">
            Total Clicks: <Badge status="info">{totalClicks}</Badge>
          </Text>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {/* React */}
          <div style={{
            padding: '20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#006fbb' }}>React</h4>
              <Badge status="success">Clicks: {metrics.react}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Button onClick={() => updateMetric('react')}>React Button</Button>
              <Button variant="secondary" onClick={() => updateMetric('react')}>Secondary</Button>
              <Button size="small" onClick={() => updateMetric('react')}>Small</Button>
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#6b7280' }}>
              ✓ Component-based<br/>
              ✓ Virtual DOM<br/>
              ✓ React hooks
            </div>
          </div>

          {/* Vanilla JS */}
          <div style={{
            padding: '20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#059669' }}>Vanilla JS</h4>
              <Badge status="success">Clicks: {metrics.vanilla}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <VanillaButtonWrapper
                label="Vanilla Button"
                onClick={() => updateMetric('vanilla')}
              />
              <VanillaButtonWrapper
                label="Secondary"
                variant="secondary"
                onClick={() => updateMetric('vanilla')}
              />
              <VanillaButtonWrapper
                label="Critical"
                variant="critical"
                onClick={() => updateMetric('vanilla')}
              />
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#6b7280' }}>
              ✓ No dependencies<br/>
              ✓ Direct DOM<br/>
              ✓ Lightweight
            </div>
          </div>

          {/* ExtJS */}
          <div style={{
            padding: '20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#7c3aed' }}>ExtJS</h4>
              <Badge status="success">Clicks: {metrics.extjs}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <ExtJSButton text="ExtJS Button" handler={() => updateMetric('extjs')} />
              <ExtJSButton text="Primary" handler={() => updateMetric('extjs')} ui="primary" />
              <ExtJSButton text="Danger" handler={() => updateMetric('extjs')} ui="danger" />
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#6b7280' }}>
              ✓ Enterprise-grade<br/>
              ✓ Rich UI components<br/>
              ✓ Data integration
            </div>
          </div>

          {/* TypeScript */}
          <div style={{
            padding: '20px',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>TypeScript</h4>
              <Badge status="success">Clicks: {metrics.typescript}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <TypeSafeButton
                id="ts-main"
                label="TS Button"
                variant="primary"
                onClick={() => updateMetric('typescript')}
              />
              <TypeSafeButton
                id="ts-alt"
                label="Success"
                variant="success"
                onClick={() => updateMetric('typescript')}
                size="small"
              />
              <TypeSafeButton
                id="ts-crit"
                label="Critical"
                variant="critical"
                onClick={() => updateMetric('typescript')}
                confirmationText="Sure?"
              />
            </div>
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#6b7280' }}>
              ✓ Type safety<br/>
              ✓ Compile-time checks<br/>
              ✓ IDE support
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h4>Performance Metrics:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {Object.entries(metrics).map(([framework, count]) => {
              const percentage = totalClicks > 0 ? (count / totalClicks * 100).toFixed(1) : '0';
              return (
                <div key={framework} style={{
                  padding: '8px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontWeight: '600', textTransform: 'capitalize' }}>
                    {framework}
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 'bold', color: '#1d4ed8' }}>
                    {count}
                  </div>
                  <div style={{ fontSize: "12px", color: '#6b7280' }}>
                    {percentage}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
};

export const BusinessScenarioActionPanel: Story = {
  render: () => {
    const [activeLayer, setActiveLayer] = useState<'react' | 'vanilla' | 'extjs' | 'typescript'>('react');
    const [taskStatus, setTaskStatus] = useState({
      saved: false,
      exported: false,
      deleted: false,
      processed: false
    });

    const updateTaskStatus = (task: keyof typeof taskStatus) => {
      setTaskStatus(prev => ({ ...prev, [task]: !prev[task] }));
    };

    const completedTasks = Object.values(taskStatus).filter(Boolean).length;

    const getButtonVariant = (completed: boolean) => completed ? 'success' : 'primary';

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3>Business Scenario: Action Panel</h3>
        <p>A comprehensive action panel demonstrating different button implementations in a real-world context</p>

        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <strong>Implementation Framework:</strong>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
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
          </div>

          <div style={{
            padding: '8px 12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #0ea5e9',
            borderRadius: '6px',
            fontSize: "14px"
          }}>
            <strong>Active Framework: </strong>
            <Badge status="info">{activeLayer.toUpperCase()}</Badge>
            <span style={{ marginLeft: '16px' }}>
              <strong>Tasks Completed: </strong>
              <Badge status={completedTasks > 0 ? 'success' : 'info'}>
                {completedTasks}/4
              </Badge>
            </span>
          </div>
        </div>

        <div style={{
          padding: '24px',
          border: '2px solid #e5e7eb',
          borderRadius: '12px',
          backgroundColor: '#fafafa'
        }}>
          <h4 style={{ margin: '0 0 16px 0' }}>Order Management Actions</h4>

          {activeLayer === 'react' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Button
                icon={ViewMinor}
                onClick={() => updateTaskStatus('saved')}
              >
                {taskStatus.saved ? 'Viewed' : 'View Order'}
              </Button>
              <Button
                icon={EditMinor}
                variant="secondary"
                onClick={() => updateTaskStatus('saved')}
              >
                {taskStatus.saved ? 'Saved' : 'Save Changes'}
              </Button>
              <Button
                icon={ExportMinor}
                onClick={() => updateTaskStatus('exported')}
              >
                {taskStatus.exported ? 'Exported' : 'Export Data'}
              </Button>
              <Button
                icon={DeleteMinor}
                variant="critical"
                onClick={() => updateTaskStatus('deleted')}
              >
                {taskStatus.deleted ? 'Deleted' : 'Delete Order'}
              </Button>
            </div>
          )}

          {activeLayer === 'vanilla' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <VanillaButtonWrapper
                label={taskStatus.saved ? 'Viewed' : 'View Order'}
                onClick={() => updateTaskStatus('saved')}
              />
              <VanillaButtonWrapper
                label={taskStatus.saved ? 'Saved' : 'Save Changes'}
                variant="secondary"
                onClick={() => updateTaskStatus('saved')}
              />
              <VanillaButtonWrapper
                label={taskStatus.exported ? 'Exported' : 'Export Data'}
                onClick={() => updateTaskStatus('exported')}
              />
              <VanillaButtonWrapper
                label={taskStatus.deleted ? 'Deleted' : 'Delete Order'}
                variant="critical"
                onClick={() => updateTaskStatus('deleted')}
              />
            </div>
          )}

          {activeLayer === 'extjs' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <ExtJSButton
                text={taskStatus.saved ? 'Viewed' : 'View Order'}
                iconCls="👁️"
                handler={() => updateTaskStatus('saved')}
              />
              <ExtJSButton
                text={taskStatus.saved ? 'Saved' : 'Save Changes'}
                iconCls="💾"
                handler={() => updateTaskStatus('saved')}
                ui="primary"
              />
              <ExtJSButton
                text={taskStatus.exported ? 'Exported' : 'Export Data'}
                iconCls="📤"
                handler={() => updateTaskStatus('exported')}
                ui="success"
              />
              <ExtJSButton
                text={taskStatus.deleted ? 'Deleted' : 'Delete Order'}
                iconCls="🗑️"
                handler={() => updateTaskStatus('deleted')}
                ui="danger"
              />
            </div>
          )}

          {activeLayer === 'typescript' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <TypeSafeButton
                id="ts-view"
                label={taskStatus.saved ? 'Viewed' : 'View Order'}
                variant={getButtonVariant(taskStatus.saved)}
                onClick={() => updateTaskStatus('saved')}
                ariaLabel="View order details"
              />
              <TypeSafeButton
                id="ts-save"
                label={taskStatus.saved ? 'Saved' : 'Save Changes'}
                variant="secondary"
                onClick={() => updateTaskStatus('saved')}
                confirmationText="Save all changes?"
              />
              <TypeSafeButton
                id="ts-export"
                label={taskStatus.exported ? 'Exported' : 'Export Data'}
                variant={getButtonVariant(taskStatus.exported)}
                onClick={() => updateTaskStatus('exported')}
                ariaLabel="Export order data to file"
              />
              <TypeSafeButton
                id="ts-delete"
                label={taskStatus.deleted ? 'Deleted' : 'Delete Order'}
                variant="critical"
                onClick={() => updateTaskStatus('deleted')}
                confirmationText="Confirm delete action?"
                ariaLabel="Delete this order permanently"
              />
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px' }}>
          <h4>Task Status Summary:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {Object.entries(taskStatus).map(([task, completed]) => (
              <div key={task} style={{
                padding: '12px',
                backgroundColor: completed ? '#ecfdf5' : '#f8fafc',
                border: `1px solid ${completed ? '#10b981' : '#e2e8f0'}`,
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: "12px", textTransform: 'capitalize', marginBottom: '4px' }}>
                  {task}
                </div>
                <Badge status={completed ? 'success' : 'info'}>
                  {completed ? '✓ Done' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};