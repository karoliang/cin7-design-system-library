import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Simple button component for testing
const TestButton = () => (
  <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
    Click me
  </button>
);

const meta = {
  title: 'Test/Simple Button',
  component: TestButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A simple button component for testing Storybook functionality.',
      },
    },
  },
} satisfies Meta<typeof TestButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <TestButton />,
};