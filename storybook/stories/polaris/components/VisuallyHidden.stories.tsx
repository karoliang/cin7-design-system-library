import type { Meta, StoryObj } from '@storybook/react';
import { VisuallyHidden } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'VisuallyHidden hides content visually while keeping it accessible to screen readers. This is essential for accessibility when you need to provide context that\'s obvious to sighted users but necessary for screen reader users.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to hide visually but keep accessible',
    },
  },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <button style={{
        padding: '12px 24px',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        <VisuallyHidden>Open navigation menu</VisuallyHidden>
        <span aria-hidden="true">☰</span>
      </button>
      <p style={{ marginTop: '12px', fontSize: "14px", color: '#6b7280' }}>
        The text "Open navigation menu" is hidden visually but accessible to screen readers.
      </p>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d2d2d2',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <VisuallyHidden>Search</VisuallyHidden>
          <span aria-hidden="true">🔍</span>
        </button>

        <button style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d2d2d2',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <VisuallyHidden>Notifications</VisuallyHidden>
          <span aria-hidden="true">🔔</span>
        </button>

        <button style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d2d2d2',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <VisuallyHidden>Settings</VisuallyHidden>
          <span aria-hidden="true">⚙️</span>
        </button>

        <button style={{
          width: '40px',
          height: '40px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d2d2d2',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <VisuallyHidden>User profile</VisuallyHidden>
          <span aria-hidden="true">👤</span>
        </button>
      </div>

      <p style={{ fontSize: "14px", color: '#6b7280' }}>
        Icon buttons with descriptive text hidden visually but available to screen readers.
      </p>
    </div>
  ),
};

export const FormLabels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: "14px", fontWeight: '600' }}>
          Search Products
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Enter product name or SKU"
            aria-label="Search products"
            style={{
              padding: '10px 12px 10px 40px',
              border: '1px solid #d2d2d2',
              borderRadius: '6px',
              fontSize: "14px",
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none'
          }}>
            <VisuallyHidden>Search icon</VisuallyHidden>
            <span aria-hidden="true">🔍</span>
          </div>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: "14px", fontWeight: '600' }}>
          Password
        </label>
        <div style={{ position: 'relative' }}>
          <input
            type="password"
            placeholder="Enter password"
            aria-label="Password"
            style={{
              padding: '10px 50px 10px 12px',
              border: '1px solid #d2d2d2',
              borderRadius: '6px',
              fontSize: "14px",
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <button
            style={{
              position: 'absolute',
              right: '8px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px'
            }}
            aria-label="Toggle password visibility"
          >
            <VisuallyHidden>Show password</VisuallyHidden>
            <span aria-hidden="true">👁️</span>
          </button>
        </div>
      </div>

      <p style={{ fontSize: "14px", color: '#6b7280' }}>
        Form inputs with icons and helper text that are accessible to screen readers.
      </p>
    </div>
  ),
};

export const SkipLinks: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <div style={{
        padding: '12px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bfdbfe',
        borderRadius: '6px',
        marginBottom: '20px'
      }}>
        <a
          href="#main-content"
          style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: '500',
            display: 'inline-block'
          }}
        >
          Skip to main content
        </a>
        <p style={{ margin: '8px 0 0 0', fontSize: "12px", color: '#1e40af' }}>
          This link is normally hidden and only visible when focused by keyboard users.
        </p>
      </div>

      <header style={{
        padding: '16px',
        backgroundColor: '#f9fafb',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: "18px", fontWeight: '600' }}>
          Website Header
        </h2>
        <nav>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            border: '1px solid #d2d2d2',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '8px'
          }}>
            <VisuallyHidden>Open navigation menu</VisuallyHidden>
            <span aria-hidden="true">☰ Menu</span>
          </button>
        </nav>
      </header>

      <main id="main-content" style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '6px'
      }}>
        <h2 style={{ margin: '0 0 12px 0', fontSize: "20px", fontWeight: '600' }}>
          Main Content
        </h2>
        <p style={{ margin: 0, lineHeight: '1.6', color: '#374151' }}>
          This is the main content of the page. Screen reader users can use the skip link
          to jump directly to this content, bypassing the navigation header.
        </p>
      </main>
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <div style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: "14px",
            fontWeight: 'bold'
          }}>
            ✓
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '16px' }}>Order Confirmed</div>
            <div style={{ fontSize: "14px", color: '#6b7280' }}>Your order #12345 has been confirmed</div>
          </div>
          <VisuallyHidden>
            Status: Success. Your order has been successfully processed and confirmed.
          </VisuallyHidden>
        </div>
      </div>

      <div style={{
        padding: '16px',
        border: '1px solid #fbbf24',
        borderRadius: '8px',
        backgroundColor: '#fffbeb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: '#f59e0b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: "14px",
            fontWeight: 'bold'
          }}>
            !
          </div>
          <div>
            <div style={{ fontWeight: '600', fontSize: '16px' }}>Payment Pending</div>
            <div style={{ fontSize: "14px", color: '#92400e' }}>Waiting for payment confirmation</div>
          </div>
          <VisuallyHidden>
            Status: Warning. Payment is currently pending confirmation. Your order will be processed once payment is verified.
          </VisuallyHidden>
        </div>
      </div>

      <p style={{ fontSize: "14px", color: '#6b7280' }}>
        Status indicators provide visual context while screen readers get detailed information about the status.
      </p>
    </div>
  ),
};

export const TableAccessibility: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "18px", fontWeight: '600' }}>
        Accessible Data Table
      </h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Product
              <VisuallyHidden>Column showing product names</VisuallyHidden>
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Price
              <VisuallyHidden>Column showing product prices</VisuallyHidden>
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Status
              <VisuallyHidden>Column showing product stock status</VisuallyHidden>
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Actions
              <VisuallyHidden>Column with available actions for each product</VisuallyHidden>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Wireless Headphones
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $299.99
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "12px",
                fontWeight: '500'
              }}>
                In Stock
              </span>
              <VisuallyHidden>Product is currently in stock and available for purchase</VisuallyHidden>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <button style={{
                padding: '4px 8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: "12px",
                cursor: 'pointer'
              }}>
                <VisuallyHidden>Edit product: Wireless Headphones</VisuallyHidden>
                <span aria-hidden="true">Edit</span>
              </button>
            </td>
          </tr>
          <tr>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              USB-C Hub
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $49.99
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '4px',
                fontSize: "12px",
                fontWeight: '500'
              }}>
                Low Stock
              </span>
              <VisuallyHidden>Product has low stock levels, only 5 items remaining</VisuallyHidden>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <button style={{
                padding: '4px 8px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: "12px",
                cursor: 'pointer'
              }}>
                <VisuallyHidden>Edit product: USB-C Hub</VisuallyHidden>
                <span aria-hidden="true">Edit</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <p style={{ marginTop: '16px', fontSize: "14px", color: '#6b7280' }}>
        Table with proper accessibility descriptions for screen reader users.
      </p>
    </div>
  ),
};

export const ErrorValidation: Story = {
  render: () => {
    const [errors, setErrors] = React.useState({
      email: false,
      password: false
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: "14px", fontWeight: '600' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            aria-invalid={errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            style={{
              padding: '10px 12px',
              border: errors.email ? '2px solid #ef4444' : '1px solid #d2d2d2',
              borderRadius: '6px',
              fontSize: "14px",
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && (
            <div id="email-error" style={{ marginTop: '4px', color: '#ef4444', fontSize: "12px" }}>
              <VisuallyHidden>Error: </VisuallyHidden>
              Please enter a valid email address
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: "14px", fontWeight: '600' }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            aria-invalid={errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            style={{
              padding: '10px 12px',
              border: errors.password ? '2px solid #ef4444' : '1px solid #d2d2d2',
              borderRadius: '6px',
              fontSize: "14px",
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          {errors.password && (
            <div id="password-error" style={{ marginTop: '4px', color: '#ef4444', fontSize: "12px" }}>
              <VisuallyHidden>Error: </VisuallyHidden>
              Password must be at least 8 characters long
            </div>
          )}
        </div>

        <button
          onClick={() => setErrors({ email: true, password: true })}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: "14px",
            fontWeight: '500'
          }}
        >
          Validate Form
        </button>

        <p style={{ fontSize: "14px", color: '#6b7280' }}>
          Form validation with proper error announcements for screen readers.
        </p>
      </div>
    );
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <div style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div>
            <div style={{ fontWeight: '500' }}>Processing...</div>
            <div style={{ fontSize: "14px", color: '#6b7280' }}>Please wait while we process your request</div>
          </div>
          <VisuallyHidden>
            Loading: Your request is currently being processed. This may take a few moments.
          </VisuallyHidden>
        </div>
      </div>

      <div style={{
        padding: '16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '2px solid #e5e7eb',
            borderTop: '2px solid #10b981',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <div>
            <div style={{ fontWeight: '500' }}>Uploading file...</div>
            <div style={{ fontSize: "14px", color: '#6b7280' }}>document.pdf (2.3 MB)</div>
          </div>
          <VisuallyHidden>
            Upload in progress: Currently uploading document.pdf with a file size of 2.3 megabytes.
          </VisuallyHidden>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ),
};