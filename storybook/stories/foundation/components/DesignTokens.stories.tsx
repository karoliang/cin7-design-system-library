import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Foundation/Design Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Cin7 DSL design tokens provide a comprehensive design system with consistent spacing, colors, typography, and animation values. These tokens are automatically applied across all components and can be customized for different themes.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorTokens: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Color System</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Primary Colors</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-primary-500)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)"
          }}>
            Primary 500
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-primary-600)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Primary 600
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-primary-700)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Primary 700
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Neutral Colors</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-gray-50)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)"
          }}>
            Gray 50
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-gray-100)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)"
          }}>
            Gray 100
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-gray-500)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Gray 500
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-gray-900)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Gray 900
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Semantic Colors</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-success-500)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Success
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-warning-500)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Warning
          </div>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--color-critical-500)',
            border: '1px solid #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: "var(--font-size-xs)",
            color: 'white'
          }}>
            Critical
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SpacingTokens: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Spacing System</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Base Spacing Units</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 'var(--spacing-1)',
              height: '40px',
              backgroundColor: 'var(--color-primary-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px'
            }}>
              1
            </div>
            <span>var(--spacing-1) - 4px</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 'var(--spacing-2)',
              height: '40px',
              backgroundColor: 'var(--color-primary-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px'
            }}>
              2
            </div>
            <span>var(--spacing-2) - 8px</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 'var(--spacing-4)',
              height: '40px',
              backgroundColor: 'var(--color-primary-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px'
            }}>
              4
            </div>
            <span>var(--spacing-4) - 16px</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 'var(--spacing-6)',
              height: '40px',
              backgroundColor: 'var(--color-primary-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px'
            }}>
              6
            </div>
            <span>var(--spacing-6) - 24px</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 'var(--spacing-8)',
              height: '40px',
              backgroundColor: 'var(--color-primary-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '10px'
            }}>
              8
            </div>
            <span>var(--spacing-8) - 32px</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Layout Spacing</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--spacing-6)',
          padding: 'var(--spacing-4)',
          border: '1px solid var(--color-gray-200)',
          borderRadius: 'var(--border-radius-4)'
        }}>
          <div style={{
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-gray-50)',
            borderRadius: 'var(--border-radius-2)'
          }}>
            Card with consistent spacing
          </div>
          <div style={{
            padding: 'var(--spacing-4)',
            backgroundColor: 'var(--color-gray-50)',
            borderRadius: 'var(--border-radius-2)'
          }}>
            Another card with same spacing
          </div>
        </div>
      </div>
    </div>
  ),
};

export const TypographyTokens: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Typography System</h2>

      <div style={{ marginBottom: '30px' }}>
        <h3>Font Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ fontSize: 'var(--font-size-1)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-1) - 12px: Small text
          </div>
          <div style={{ fontSize: 'var(--font-size-2)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-2) - 14px: Body text
          </div>
          <div style={{ fontSize: 'var(--font-size-3)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-3) - 16px: Default text
          </div>
          <div style={{ fontSize: 'var(--font-size-4)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-4) - 18px: Large body
          </div>
          <div style={{ fontSize: 'var(--font-size-5)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-5) - 20px: Subheading
          </div>
          <div style={{ fontSize: 'var(--font-size-6)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-6) - 24px: Heading 3
          </div>
          <div style={{ fontSize: 'var(--font-size-7)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-7) - 32px: Heading 2
          </div>
          <div style={{ fontSize: 'var(--font-size-8)', fontFamily: 'var(--font-family-sans)' }}>
            var(--font-size-8) - 40px: Heading 1
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Font Weights</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontWeight: 'var(--font-weight-regular)' }}>
            var(--font-weight-regular) - 400: Regular weight
          </div>
          <div style={{ fontWeight: 'var(--font-weight-medium)' }}>
            var(--font-weight-medium) - 500: Medium weight
          </div>
          <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>
            var(--font-weight-semibold) - 600: Semibold weight
          </div>
          <div style={{ fontWeight: 'var(--font-weight-bold)' }}>
            var(--font-weight-bold) - 700: Bold weight
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3>Line Heights</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ lineHeight: 'var(--line-height-1)', fontSize: 'var(--font-size-2)' }}>
            var(--line-height-1) - Tight line height for compact layouts
          </div>
          <div style={{ lineHeight: 'var(--line-height-2)', fontSize: 'var(--font-size-2)' }}>
            var(--line-height-2) - Normal line height for body text
          </div>
          <div style={{ lineHeight: 'var(--line-height-3)', fontSize: 'var(--font-size-2)' }}>
            var(--line-height-3) - Relaxed line height for readability
          </div>
          <div style={{ lineHeight: 'var(--line-height-4)', fontSize: 'var(--font-size-2)' }}>
            var(--line-height-4) - Loose line height for spacious layouts
          </div>
        </div>
      </div>
    </div>
  ),
};