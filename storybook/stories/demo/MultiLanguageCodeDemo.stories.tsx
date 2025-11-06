import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@shopify/polaris';
import React from 'react';
import { MultiLanguageCode } from '../../.storybook/blocks';

const meta = {
  title: 'Demo/Multi-Language Code',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'This demo showcases the new multi-language code documentation feature. It displays code examples in React, Vanilla JS, ExtJS, and TypeScript for each component variation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultButton: Story = {
  args: {
    children: 'Click me',
  },
  parameters: {
    docs: {
      description: {
        story: 'A default button with multi-language implementation examples below.',
      },
    },
  },
  render: (args) => (
    <div>
      <Button {...args} />
      <MultiLanguageCode componentName="button" exampleName="default" />
    </div>
  ),
};

export const PrimaryButton: Story = {
  args: {
    children: 'Save',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'A primary button variant with implementation examples.',
      },
    },
  },
  render: (args) => (
    <div>
      <Button {...args} />
      <MultiLanguageCode componentName="button" exampleName="primary" />
    </div>
  ),
};

export const MissingExample: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates what happens when code examples are not yet available.',
      },
    },
  },
  render: (args) => (
    <div>
      <Button {...args} />
      <MultiLanguageCode componentName="button" exampleName="disabled" />
    </div>
  ),
};
