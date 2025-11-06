import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, TextField } from '@shopify/polaris';
import React from 'react';

// Basic components showcase - using Button as the primary component
const BasicComponentsShowcase = () => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <Button>Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
  </div>
);

const meta = {
  title: 'Components/Basic Components/Overview',
  component: BasicComponentsShowcase,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Essential Polaris components for basic UI interactions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BasicComponentsShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
    </div>
  ),
};

export const CardExamples: Story = {
  render: () => (
    <Card sectioned>
      <p>This is a basic card with sectioned content.</p>
    </Card>
  ),
};

export const TextFieldExamples: Story = {
  render: () => (
    <TextField
      label="Basic text field"
      placeholder="Enter text here"
      onChange={() => {}}
      value=""
    />
  ),
};