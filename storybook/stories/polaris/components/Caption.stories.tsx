import type { Meta, StoryObj } from '@storybook/react';
import { Caption } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/Caption',
  component: Caption,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Captions are small text elements used to provide additional context or information about other elements. They are typically used as subheadings or descriptive text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Caption text content',
    },
    id: {
      control: 'text',
      description: 'Element ID for accessibility',
    },
  },
} satisfies Meta<typeof Caption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Optional caption text',
  },
};

export const FormFieldCaption: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
      <label htmlFor="email" style={{ fontWeight: '600', fontSize: "14px" }}>
        Email address
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        style={{
          padding: '8px 12px',
          border: '1px solid #d2d2d2',
          borderRadius: '4px',
          fontSize: "14px",
        }}
      />
      <Caption>We'll never share your email with anyone else.</Caption>
    </div>
  ),
};

export const ImageCaption: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <img
        src="https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Product+Image"
        alt="Product"
        style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }}
      />
      <Caption>Premium wireless headphones with active noise cancellation</Caption>
    </div>
  ),
};

export const StatusCaption: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#52c41a'
        }} />
        <span style={{ fontWeight: '600' }}>In Stock</span>
      </div>
      <Caption>Usually ships within 1-2 business days</Caption>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#faad14'
        }} />
        <span style={{ fontWeight: '600' }}>Low Stock</span>
      </div>
      <Caption>Only 3 items left in stock</Caption>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#ff4d4f'
        }} />
        <span style={{ fontWeight: '600' }}>Out of Stock</span>
      </div>
      <Caption>Expected to be back in stock on December 15</Caption>
    </div>
  ),
};

export const PricingCaption: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <div style={{ fontSize: "24px", fontWeight: '600', marginBottom: '4px' }}>
          $29.99
        </div>
        <Caption>per month, billed annually</Caption>
      </div>

      <div>
        <div style={{ fontSize: "20px", fontWeight: '600', marginBottom: '4px' }}>
          $199.99
        </div>
        <Caption>one-time purchase, lifetime access</Caption>
      </div>

      <div>
        <div style={{ fontSize: "18px", fontWeight: '600', marginBottom: '4px', color: '#52c41a' }}>
          $49.99 <span style={{ textDecoration: 'line-through', color: '#999', fontSize: "14px" }}>$79.99</span>
        </div>
        <Caption>Limited time offer - Save 37%</Caption>
      </div>
    </div>
  ),
};

export const FeatureCaption: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>✓ Free Shipping</h3>
        <Caption>On orders over $50. Usually arrives in 3-5 business days.</Caption>
      </div>

      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>✓ 30-Day Returns</h3>
        <Caption>Not satisfied? Return within 30 days for a full refund.</Caption>
      </div>

      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>✓ 24/7 Support</h3>
        <Caption>Our customer service team is available around the clock.</Caption>
      </div>
    </div>
  ),
};

export const MultiLineCaption: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>Account Requirements</h4>
        <Caption>
          To create an account, you'll need a valid email address and a password that's at least 8 characters long.
          You'll also need to agree to our terms of service and privacy policy.
        </Caption>
      </div>

      <div>
        <h4 style={{ margin: '0 0 8px 0', fontSize: "14px", fontWeight: '600' }}>System Requirements</h4>
        <Caption>
          Compatible with Windows 10 or later, macOS 10.14 or later, and most modern web browsers.
          Mobile app available for iOS 12+ and Android 8+.
        </Caption>
      </div>
    </div>
  ),
};

export const WithAccessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      <div>
        <label htmlFor="password" style={{ fontWeight: '600', fontSize: "14px", display: 'block', marginBottom: '8px' }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter password"
          aria-describedby="password-help"
          style={{
            padding: '8px 12px',
            border: '1px solid #d2d2d2',
            borderRadius: '4px',
            fontSize: "14px",
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <Caption id="password-help">
          Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters.
        </Caption>
      </div>

      <div>
        <label htmlFor="discount-code" style={{ fontWeight: '600', fontSize: "14px", display: 'block', marginBottom: '8px' }}>
          Discount Code
        </label>
        <input
          id="discount-code"
          type="text"
          placeholder="Enter code"
          aria-describedby="discount-help"
          style={{
            padding: '8px 12px',
            border: '1px solid #d2d2d2',
            borderRadius: '4px',
            fontSize: "14px",
            width: '100%',
            boxSizing: 'border-box',
          }}
        />
        <Caption id="discount-help">
          Enter a valid discount code. Only one code can be used per order.
        </Caption>
      </div>
    </div>
  ),
};