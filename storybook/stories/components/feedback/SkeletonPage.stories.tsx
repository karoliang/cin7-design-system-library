import type { Meta, StoryObj } from '@storybook/react';
import { SkeletonPage, SkeletonBodyText, SkeletonDisplayText, Card, Layout, BlockStack, InlineStack } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/SkeletonPage',
  component: SkeletonPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'SkeletonPage displays a placeholder layout while content is loading. It provides visual feedback and improves perceived performance during async operations.',
      },
    },
    codeVariants: getCodeVariants('skeletonpage', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title, in large type',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Remove the normal max-width on the page',
    },
    narrowWidth: {
      control: 'boolean',
      description: 'Decreases the maximum layout width',
    },
    primaryAction: {
      control: 'boolean',
      description: 'Shows a skeleton over the primary action',
    },
    backAction: {
      control: 'boolean',
      description: 'Shows a skeleton over the back action',
    },
  },
} satisfies Meta<typeof SkeletonPage>;

export default meta;
type Story = StoryObj<typeof SkeletonPage>;

export const Default: Story = {
  args: {
    title: 'Products',
  },
  render: (args) => (
    <SkeletonPage {...args}>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonBodyText />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'default'),
  },
};

export const WithPrimaryAction: Story = {
  render: () => (
    <SkeletonPage
      title="Products"
      primaryAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={3} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'withprimaryaction'),
  },
};

export const WithBackAction: Story = {
  render: () => (
    <SkeletonPage
      title="Product details"
      backAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={5} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'withbackaction'),
  },
};

export const WithAllActions: Story = {
  render: () => (
    <SkeletonPage
      title="Product details"
      primaryAction
      backAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="medium" />
              <SkeletonBodyText lines={4} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'withallactions'),
  },
};

export const FullWidth: Story = {
  render: () => (
    <SkeletonPage
      title="Dashboard"
      fullWidth
      primaryAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'fullwidth'),
  },
};

export const NarrowWidth: Story = {
  render: () => (
    <SkeletonPage
      title="Settings"
      narrowWidth
      primaryAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={3} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'narrowwidth'),
  },
};

export const ComplexLayout: Story = {
  render: () => (
    <SkeletonPage
      title="Product management"
      primaryAction
      backAction
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="medium" />
              <SkeletonBodyText lines={3} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneHalf">
          <Card>
            <BlockStack gap="400">
              <SkeletonDisplayText size="small" />
              <SkeletonBodyText lines={4} />
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <SkeletonBodyText lines={2} />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'complexlayout'),
  },
};

export const WithMultipleCards: Story = {
  render: () => (
    <SkeletonPage
      title="Orders"
      primaryAction
    >
      <Layout>
        {[1, 2, 3, 4].map((item) => (
          <Layout.Section key={item}>
            <Card>
              <BlockStack gap="400">
                <InlineStack gap="400" align="space-between">
                  <SkeletonDisplayText size="small" />
                  <div style={{ width: '60px' }}>
                    <SkeletonBodyText lines={1} />
                  </div>
                </InlineStack>
                <SkeletonBodyText lines={2} />
              </BlockStack>
            </Card>
          </Layout.Section>
        ))}
      </Layout>
    </SkeletonPage>
  ),
  parameters: {
    codeVariants: getCodeVariants('skeletonpage', 'withmultiplecards'),
  },
};
