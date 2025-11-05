import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Configuration test component
const ConfigurationTest = () => (
  <div style={{
    padding: '20px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }}>
    ✅ Storybook Configuration Fixed!
    <br />
    <br />
    Stories should now load properly.
  </div>
);

const meta = {
  title: 'Test/Configuration Fix',
  component: ConfigurationTest,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Test story to verify Storybook configuration is working correctly.',
      },
    },
  },
} satisfies Meta<typeof ConfigurationTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <ConfigurationTest />,
};