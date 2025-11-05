import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';

const meta = {
  title: 'Foundation/Core Utilities',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Cin7 DSL core utilities provide essential DOM manipulation, event handling, validation, and animation utilities. These utilities work consistently across all browser environments and are optimized for performance.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const DOMUtilities: Story = {
  render: () => {
    const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const demonstrateQuery = (selector: string) => {
      setHighlightedElement(selector);
      setTimeout(() => setHighlightedElement(null), 2000);
    };

    return (
      <div style={{ padding: '20px' }}>
        <h2>DOM Utilities</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3>Element Selection</h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => demonstrateQuery('.demo-button')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--color-primary-500)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Select .demo-button
            </button>
            <button
              onClick={() => demonstrateQuery('#demo-text')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--color-primary-500)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Select #demo-text
            </button>
            <button
              onClick={() => demonstrateQuery('[data-demo]')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'var(--color-primary-500)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Select [data-demo]
            </button>
          </div>

          <div ref={containerRef} style={{ padding: '20px', border: '1px solid var(--color-gray-300)', borderRadius: '8px' }}>
            <button
              className={`demo-button ${highlightedElement === '.demo-button' ? 'highlighted' : ''}`}
              data-demo="true"
              style={{
                padding: '10px 20px',
                backgroundColor: highlightedElement === '.demo-button' ? 'var(--color-success-500)' : 'var(--color-gray-100)',
                border: '1px solid var(--color-gray-300)',
                borderRadius: '4px',
                marginRight: '10px',
                transition: 'all 0.3s ease'
              }}
            >
              Demo Button
            </button>

            <span
              id="demo-text"
              className={highlightedElement === '#demo-text' ? 'highlighted' : ''}
              style={{
                padding: '10px',
                backgroundColor: highlightedElement === '#demo-text' ? 'var(--color-warning-500)' : 'var(--color-gray-50)',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
            >
              Demo Text Element
            </span>

            <div
              data-demo="true"
              className={highlightedElement === '[data-demo]' ? 'highlighted' : ''}
              style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: highlightedElement === '[data-demo]' ? 'var(--color-critical-500)' : 'var(--color-gray-50)',
                color: highlightedElement === '[data-demo]' ? 'white' : 'inherit',
                border: '1px solid var(--color-gray-200)',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
            >
              Element with data-demo attribute
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Class Management</h3>
          <ClassManagementDemo />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Attribute Manipulation</h3>
          <AttributeDemo />
        </div>
      </div>
    );
  },
};

export const EventUtilities: Story = {
  render: () => {
    const [eventLog, setEventLog] = useState<string[]>([]);
    const [clickCount, setClickCount] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const addEventLog = (event: string) => {
      setEventLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${event}`]);
    };

    const handleClick = () => {
      const newCount = clickCount + 1;
      setClickCount(newCount);
      addEventLog(`Button clicked (${newCount} times)`);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      addEventLog(`Key pressed: ${e.key}`);
    };

    return (
      <div style={{ padding: '20px' }} onMouseMove={handleMouseMove} onKeyDown={handleKeyPress} tabIndex={0}>
        <h2>Event Utilities</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3>Click Events</h3>
          <button
            onClick={handleClick}
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-primary-500)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Click Me ({clickCount} times)
          </button>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Mouse Events</h3>
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--color-gray-50)',
            border: '1px solid var(--color-gray-300)',
            borderRadius: '8px'
          }}>
            <p>Mouse Position: ({mousePosition.x}, {mousePosition.y})</p>
            <p>Move your mouse over this area to see tracking in action.</p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Keyboard Events</h3>
          <div style={{
            padding: '20px',
            backgroundColor: 'var(--color-gray-50)',
            border: '1px solid var(--color-gray-300)',
            borderRadius: '8px',
            outline: 'none'
          }}>
            <p>Type any key to see keyboard event handling:</p>
            <p style={{ fontStyle: 'italic', color: 'var(--color-gray-600)' }}>
              This div is focusable - click here and start typing
            </p>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Event Log</h3>
          <div style={{
            padding: '15px',
            backgroundColor: 'var(--color-gray-900)',
            color: 'var(--color-green-400)',
            fontFamily: 'monospace',
            fontSize: "var(--font-size-xs)",
            borderRadius: '4px',
            minHeight: '120px',
            maxHeight: '120px',
            overflowY: 'auto'
          }}>
            {eventLog.length > 0 ? (
              eventLog.map((log, index) => (
                <div key={index}>{log}</div>
              ))
            ) : (
              <div style={{ color: 'var(--color-gray-500)' }}>Events will appear here...</div>
            )}
          </div>
        </div>
      </div>
    );
  },
};

export const ValidationUtilities: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      required: '',
      minLength: '',
      pattern: '',
      number: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isValid, setIsValid] = useState(false);

    const validateField = (name: string, value: string): string => {
      switch (name) {
        case 'email':
          if (!value) return 'Email is required';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Please enter a valid email address';
          }
          break;
        case 'required':
          if (!value) return 'This field is required';
          break;
        case 'minLength':
          if (value.length < 5) return 'Must be at least 5 characters';
          break;
        case 'pattern':
          if (!/^[A-Z]/.test(value)) return 'Must start with uppercase letter';
          break;
        case 'number':
          const num = parseFloat(value);
          if (isNaN(num)) return 'Must be a valid number';
          if (num < 0 || num > 100) return 'Must be between 0 and 100';
          break;
      }
      return '';
    };

    const handleInputChange = (name: string, value: string) => {
      setFormData(prev => ({ ...prev, [name]: value }));
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    };

    useEffect(() => {
      const hasErrors = Object.values(errors).some(error => error !== '');
      const hasValues = Object.values(formData).some(value => value !== '');
      setIsValid(!hasErrors && hasValues);
    }, [formData, errors]);

    return (
      <div style={{ padding: '20px' }}>
        <h2>Validation Utilities</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3>Form Validation Examples</h3>
          <div style={{ display: 'grid', gap: '20px', maxWidth: '500px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Email Validation:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.email ? '1px solid var(--color-critical-500)' : '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-sm)"
                }}
              />
              {errors.email && (
                <div style={{ color: 'var(--color-critical-500)', fontSize: "var(--font-size-xs)", marginTop: '4px' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Required Field:
              </label>
              <input
                type="text"
                value={formData.required}
                onChange={(e) => handleInputChange('required', e.target.value)}
                placeholder="This field is required"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.required ? '1px solid var(--color-critical-500)' : '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-sm)"
                }}
              />
              {errors.required && (
                <div style={{ color: 'var(--color-critical-500)', fontSize: "var(--font-size-xs)", marginTop: '4px' }}>
                  {errors.required}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Min Length (5 chars):
              </label>
              <input
                type="text"
                value={formData.minLength}
                onChange={(e) => handleInputChange('minLength', e.target.value)}
                placeholder="At least 5 characters"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.minLength ? '1px solid var(--color-critical-500)' : '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-sm)"
                }}
              />
              {errors.minLength && (
                <div style={{ color: 'var(--color-critical-500)', fontSize: "var(--font-size-xs)", marginTop: '4px' }}>
                  {errors.minLength}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Pattern (Uppercase start):
              </label>
              <input
                type="text"
                value={formData.pattern}
                onChange={(e) => handleInputChange('pattern', e.target.value)}
                placeholder="Start with uppercase"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.pattern ? '1px solid var(--color-critical-500)' : '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-sm)"
                }}
              />
              {errors.pattern && (
                <div style={{ color: 'var(--color-critical-500)', fontSize: "var(--font-size-xs)", marginTop: '4px' }}>
                  {errors.pattern}
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Number (0-100):
              </label>
              <input
                type="number"
                value={formData.number}
                onChange={(e) => handleInputChange('number', e.target.value)}
                placeholder="Enter number 0-100"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: errors.number ? '1px solid var(--color-critical-500)' : '1px solid var(--color-gray-300)',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-sm)"
                }}
              />
              {errors.number && (
                <div style={{ color: 'var(--color-critical-500)', fontSize: "var(--font-size-xs)", marginTop: '4px' }}>
                  {errors.number}
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'var(--color-gray-50)', borderRadius: '6px' }}>
            <h4>Validation Status:</h4>
            <div style={{
              padding: '10px',
              backgroundColor: isValid ? 'var(--color-success-100)' : 'var(--color-warning-100)',
              border: `1px solid ${isValid ? 'var(--color-success-500)' : 'var(--color-warning-500)'}`,
              borderRadius: '4px',
              color: isValid ? 'var(--color-success-700)' : 'var(--color-warning-700)'
            }}>
              {isValid ? '✅ Form is valid' : '⚠️ Form has validation errors or empty fields'}
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Helper components for the demos
function ClassManagementDemo() {
  const [classes, setClasses] = useState<string[]>(['base-class']);
  const [highlightClass, setHighlightClass] = useState<string | null>(null);

  const addClass = (className: string) => {
    if (!classes.includes(className)) {
      setClasses([...classes, className]);
    }
  };

  const removeClass = (className: string) => {
    setClasses(classes.filter(c => c !== className));
  };

  const toggleClass = (className: string) => {
    if (classes.includes(className)) {
      removeClass(className);
    } else {
      addClass(className);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={() => toggleClass('highlight')}
          onMouseEnter={() => setHighlightClass('highlight')}
          onMouseLeave={() => setHighlightClass(null)}
          style={{
            padding: '6px 12px',
            backgroundColor: classes.includes('highlight') ? 'var(--color-success-500)' : 'var(--color-gray-200)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Highlight
        </button>
        <button
          onClick={() => toggleClass('large')}
          onMouseEnter={() => setHighlightClass('large')}
          onMouseLeave={() => setHighlightClass(null)}
          style={{
            padding: '6px 12px',
            backgroundColor: classes.includes('large') ? 'var(--color-success-500)' : 'var(--color-gray-200)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Large
        </button>
        <button
          onClick={() => toggleClass('bordered')}
          onMouseEnter={() => setHighlightClass('bordered')}
          onMouseLeave={() => setHighlightClass(null)}
          style={{
            padding: '6px 12px',
            backgroundColor: classes.includes('bordered') ? 'var(--color-success-500)' : 'var(--color-gray-200)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Toggle Border
        </button>
      </div>

      <div
        className={classes.join(' ')}
        style={{
          padding: '20px',
          backgroundColor: classes.includes('highlight') ? 'var(--color-warning-100)' : 'var(--color-gray-50)',
          border: classes.includes('bordered') ? '2px solid var(--color-primary-500)' : '1px solid var(--color-gray-300)',
          borderRadius: '4px',
          fontSize: classes.includes('large') ? '18px' : '14px',
          transition: 'all 0.3s ease',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div>
          <div>Current classes: <code>{classes.join(' ')}</code></div>
          {highlightClass && (
            <div style={{ fontSize: "var(--font-size-xs)", color: 'var(--color-gray-600)', marginTop: '5px' }}>
              Hovering over: <code>{highlightClass}</code>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AttributeDemo() {
  const [attributes, setAttributes] = useState({
    'data-status': 'active',
    'aria-label': 'Demo element',
    'disabled': false,
    'title': 'Hover for tooltip'
  });

  const updateAttribute = (name: string, value: string | boolean) => {
    setAttributes(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div style={{ display: 'grid', gap: '10px', marginBottom: '15px', maxWidth: '400px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '100px' }}>data-status:</label>
          <select
            value={attributes['data-status'] as string}
            onChange={(e) => updateAttribute('data-status', e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px' }}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '100px' }}>aria-label:</label>
          <input
            type="text"
            value={attributes['aria-label'] as string}
            onChange={(e) => updateAttribute('aria-label', e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px', flex: 1 }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '100px' }}>disabled:</label>
          <input
            type="checkbox"
            checked={attributes.disabled as boolean}
            onChange={(e) => updateAttribute('disabled', e.target.checked)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ minWidth: '100px' }}>title:</label>
          <input
            type="text"
            value={attributes.title as string}
            onChange={(e) => updateAttribute('title', e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '4px', flex: 1 }}
          />
        </div>
      </div>

      <div
        {...(attributes.disabled ? { disabled: true } : {})}
        data-status={attributes['data-status']}
        aria-label={attributes['aria-label']}
        title={attributes.title}
        style={{
          padding: '20px',
          backgroundColor: attributes.disabled ? 'var(--color-gray-100)' : 'var(--color-primary-50)',
          border: '2px solid var(--color-primary-300)',
          borderRadius: '8px',
          opacity: attributes.disabled ? 0.6 : 1,
          cursor: attributes.disabled ? 'not-allowed' : 'pointer',
          textAlign: 'center',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Interactive Element
        </div>
        <div style={{ fontSize: "var(--font-size-xs)", fontFamily: 'monospace', textAlign: 'left' }}>
          {Object.entries(attributes).map(([key, value]) => (
            <div key={key}>
              {key}: {typeof value === 'boolean' ? value.toString() : `"${value}"`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}