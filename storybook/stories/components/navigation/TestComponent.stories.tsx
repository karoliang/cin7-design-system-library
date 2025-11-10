import type { Meta, StoryObj } from '@storybook/react';
import { Button, AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

const meta = {
  title: 'Components/Navigation/Test',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <AppProvider i18n={enTranslations}>
        <Story />
      </AppProvider>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Test Button',
    variant: 'primary',
  },
};