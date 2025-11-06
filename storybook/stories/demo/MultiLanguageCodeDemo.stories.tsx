import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Demo/Multi-Language Code',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'This demo showcases the new multi-language code documentation feature. Code examples appear as tabs in the addon panel below (alongside Controls and Actions).',
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
        story: 'A default button with multi-language implementation examples in the addon panels below.',
      },
    },
    codeVariants: getCodeVariants('button', 'default'),
  },
  render: (args) => <Button {...args} />,
};

export const PrimaryButton: Story = {
  args: {
    children: 'Save',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'A primary button variant with implementation examples in the addon panels below.',
      },
    },
    codeVariants: getCodeVariants('button', 'primary'),
  },
  render: (args) => <Button {...args} />,
};

export const MissingExample: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates what happens when code examples are not yet available. The panels will show an empty state message.',
      },
    },
    codeVariants: getCodeVariants('button', 'disabled'), // Will return null - demonstrates empty state
  },
  render: (args) => <Button {...args} />,
};
