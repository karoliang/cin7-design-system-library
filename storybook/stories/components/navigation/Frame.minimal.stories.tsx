import type { Meta, StoryObj } from '@storybook/react';
import { Frame } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Navigation/FrameMinimal',
  component: Frame,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Frame>;

export default meta;
type Story = StoryObj<typeof Frame>;

export const Minimal: Story = {
  render: () => {
    console.log('🧪 Rendering minimal Frame story');
    return (
      <div style={{ padding: '20px', background: 'lightblue' }}>
        <h1>Minimal Frame Test</h1>
        <p>This is a minimal test to see if the Frame component renders at all.</p>
        <Frame>
          <div style={{ padding: '20px' }}>
            <h2>Frame Content</h2>
            <p>If you can see this, the Frame component is working!</p>
          </div>
        </Frame>
      </div>
    );
  },
};