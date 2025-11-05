import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// Performance test component
const PerformanceTest = () => (
  <div style={{ padding: '20px', border: '1px solid #ccc' }}>
    Minimal test story - should load instantly
  </div>
);

const meta = {
  title: 'Test/Performance Check',
  component: PerformanceTest,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Minimal test story to check Storybook performance.',
      },
    },
  },
} satisfies Meta<typeof PerformanceTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MinimalStory: Story = {
  render: () => <PerformanceTest />,
};