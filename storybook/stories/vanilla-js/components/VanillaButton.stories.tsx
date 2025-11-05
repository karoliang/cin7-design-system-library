import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef } from 'react';
import { ButtonComponent } from '@cin7/vanilla-js';

// React wrapper for vanilla JS Button component
const VanillaButtonWrapper: React.FC<{
  label: string;
  variant?: 'primary' | 'secondary' | 'plain' | 'critical';
  size?: 'slim' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ label, variant = 'primary', size = 'medium', fullWidth = false, loading = false, disabled = false, onClick, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<ButtonComponent | null>(null);

  useEffect(() => {
    if (containerRef.current && !buttonRef.current) {
      // Create vanilla JS button component
      buttonRef.current = new ButtonComponent({
        label,
        variant,
        size,
        fullWidth,
        loading,
        onClick: () => {
          if (onClick && !disabled) {
            onClick();
          }
        }
      });

      // Mount to container
      buttonRef.current.mount(containerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (buttonRef.current) {
        buttonRef.current.destroy();
        buttonRef.current = null;
      }
    };
  }, []); // Only run once on mount

  // Update properties when they change
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
      buttonRef.current.setSize(size);
    }
  }, [size]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setFullWidth(fullWidth);
    }
  }, [fullWidth]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setLoading(loading);
    }
  }, [loading]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.setDisabled(disabled);
    }
  }, [disabled]);

  return <div ref={containerRef} style={{ display: 'inline-block' }} />;
};

const meta = {
  title: 'Components/Vanilla JS/Button',
  component: VanillaButtonWrapper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Vanilla JavaScript Button component wrapped for React. This demonstrates how Cin7 DSL vanilla JS components can be used in React applications through simple wrappers.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button text label',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'plain', 'critical'],
      description: 'Button visual style variant',
    },
    size: {
      control: 'select',
      options: ['slim', 'medium', 'large'],
      description: 'Button size',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state with spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
    onClick: {
      action: 'clicked',
      description: 'Button click handler',
    },
  },
} satisfies Meta<typeof VanillaButtonWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <VanillaButtonWrapper label="Primary" variant="primary" />
      <VanillaButtonWrapper label="Secondary" variant="secondary" />
      <VanillaButtonWrapper label="Plain" variant="plain" />
      <VanillaButtonWrapper label="Critical" variant="critical" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <VanillaButtonWrapper label="Slim" size="slim" />
      <VanillaButtonWrapper label="Medium" size="medium" />
      <VanillaButtonWrapper label="Large" size="large" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <VanillaButtonWrapper label="Normal" />
      <VanillaButtonWrapper label="Loading" loading={true} />
      <VanillaButtonWrapper label="Disabled" disabled={true} />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <VanillaButtonWrapper label="Normal Button" />
      <VanillaButtonWrapper label="Full Width Button" fullWidth={true} />
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
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <div>
          <p>Click count: {clickCount}</p>
          <VanillaButtonWrapper
            label="Click me!"
            onClick={handleClick}
          />
        </div>

        <div>
          <p>Async operation with loading state:</p>
          <VanillaButtonWrapper
            label={isLoading ? "Loading..." : "Start Async Operation"}
            loading={isLoading}
            disabled={isLoading}
            onClick={handleAsyncClick}
          />
        </div>
      </div>
    );
  },
};