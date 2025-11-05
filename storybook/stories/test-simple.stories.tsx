import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Test/Simple Button',
  component: 'button',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Click me</button>,
};