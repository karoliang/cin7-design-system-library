import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/Button',
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