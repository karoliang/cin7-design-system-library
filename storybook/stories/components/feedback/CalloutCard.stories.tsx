import type { Meta, StoryObj } from '@storybook/react';
import { CalloutCard, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/CalloutCard',
  component: CalloutCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Callout cards highlight important information or features with a prominent visual style. They\'re used to draw attention to key content and encourage user actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Callout card title',
    },
    children: {
      control: 'text',
      description: 'Callout card content',
    },
    illustration: {
      control: 'text',
      description: 'Illustration path or element',
    },
    primaryAction: {
      control: 'object',
      description: 'Primary action button configuration',
    },
    secondaryAction: {
      control: 'object',
      description: 'Secondary action link configuration',
    },
  },
} satisfies Meta<typeof CalloutCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Get more sales with Shopify',
    children: 'Create a online store and start selling to customers right away. Shopify provides everything you need to start, run, and grow your business.',
    primaryAction: {
      content: 'Start selling',
      onAction: () => console.log('Start selling clicked'),
    },
    secondaryAction: {
      content: 'Learn more',
      url: '#',
    },
  },
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'layout'),
  },
};

export const WithIllustration: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Track your sales and growth"
        children="Shopify comes with a powerful dashboard to track your sales, orders, and customer activity. View your most important metrics at a glance."
        illustration="https://cdn.shopify.com/s/assets/admin/checkout/custom-customers-cd8049b5ed4f62a654922285b9a5d6a7.svg"
        primaryAction={{
          content: 'View dashboard',
          onAction: () => console.log('View dashboard'),
        }}
        secondaryAction={{
          content: 'View analytics guide',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const PromotionalContent: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Upgrade to Premium"
        children="Unlock advanced features, priority support, and unlimited storage. Get the most out of your business with our premium plan."
        primaryAction={{
          content: 'Upgrade now',
          onAction: () => console.log('Upgrade clicked'),
        }}
        secondaryAction={{
          content: 'Compare plans',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const FeatureAnnouncement: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="New: Advanced Analytics Dashboard"
        children="Get deeper insights into your business performance with our new analytics dashboard. Track conversion rates, customer behavior, and sales trends."
        primaryAction={{
          content: 'Try new dashboard',
          onAction: () => console.log('Try dashboard'),
        }}
        secondaryAction={{
          content: 'Watch tutorial',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const OnboardingGuidance: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Welcome to Shopify POS"
        children="Sell in person with our point-of-sale system. Shopify POS works with your online store to manage inventory, orders, and customers in one place."
        primaryAction={{
          content: 'Set up POS',
          onAction: () => console.log('Set up POS'),
        }}
        secondaryAction={{
          content: 'Learn more about POS',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const TipsAndBestPractices: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Optimize your product pages"
        children="High-quality photos and detailed descriptions help customers make informed purchasing decisions. Learn how to create compelling product pages that convert."
        primaryAction={{
          content: 'Read the guide',
          onAction: () => console.log('Read guide'),
        }}
        secondaryAction={{
          content: 'View examples',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const InteractiveCallout: Story = {
  render: () => {
    const [dismissed, setDismissed] = useState(false);
    const [actionTaken, setActionTaken] = useState(false);

    const handlePrimaryAction = () => {
      setActionTaken(true);
      setDismissed(true);
      console.log('Primary action taken');
    };

    if (dismissed) {
      return (
        <div style={{ maxWidth: '500px', padding: '20px', textAlign: 'center' }}>
          <Text as="p" variant="bodyMd">
            {actionTaken ? '🎉 Great choice! Check your email for the guide.' : 'Callout dismissed'}
          </Text>
          <Button onClick={() => setDismissed(false)} variant="plain" size="small">
            Show callout again
          </Button>
        </div>
      );
    }

    return (
      <div style={{ maxWidth: '500px' }}>
        <CalloutCard
          title="Get your free marketing guide"
          children="Learn the top 10 marketing strategies that successful entrepreneurs use to grow their business. Download our free 25-page guide today."
          primaryAction={{
            content: 'Download guide',
            onAction: handlePrimaryAction,
          }}
          secondaryAction={{
            content: 'Not interested',
            onAction: () => setDismissed(true),
          }}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const BusinessInsights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      <CalloutCard
        title="Holiday sales are coming"
        children="Prepare your store for the holiday shopping season. Stock up on inventory, optimize your shipping settings, and create holiday promotions."
        primaryAction={{
          content: 'Prepare store',
          onAction: () => console.log('Prepare store'),
        }}
        secondaryAction={{
          content: 'View holiday guide',
          url: '#',
        }}
      />

      <CalloutCard
        title="Improve your checkout experience"
        children="A streamlined checkout process can increase conversion rates by up to 35%. Enable features like guest checkout and saved payment methods."
        primaryAction={{
          content: 'Optimize checkout',
          onAction: () => console.log('Optimize checkout'),
        }}
        secondaryAction={{
          content: 'Learn more',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const EducationalContent: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Learn SEO basics for your store"
        children="Search engine optimization helps customers find your store on Google. Learn how to optimize your product pages, create content, and build backlinks."
        primaryAction={{
          content: 'Start SEO course',
          onAction: () => console.log('Start SEO course'),
        }}
        secondaryAction={{
          content: 'Read SEO tips',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const MultipleCallouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <CalloutCard
        title="Add your first product"
        children="Start building your catalog by adding your first product. Include high-quality photos, detailed descriptions, and competitive pricing."
        primaryAction={{
          content: 'Add product',
          onAction: () => console.log('Add product'),
        }}
        secondaryAction={{
          content: 'Import products',
          url: '#',
        }}
      />

      <CalloutCard
        title="Customize your theme"
        children="Make your store look professional with a custom theme. Choose from hundreds of free and premium themes, or create your own unique design."
        primaryAction={{
          content: 'Browse themes',
          onAction: () => console.log('Browse themes'),
        }}
        secondaryAction={{
          content: 'Customize current theme',
          url: '#',
        }}
      />

      <CalloutCard
        title="Set up shipping rates"
        children="Configure shipping rates that work for your business and customers. Offer free shipping, flat rates, or calculated rates based on weight and location."
        primaryAction={{
          content: 'Configure shipping',
          onAction: () => console.log('Configure shipping'),
        }}
        secondaryAction={{
          content: 'Shipping guide',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const MinimalCallout: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Quick tip"
        children="You can press Ctrl+S (or Cmd+S on Mac) to quickly save changes while editing products or settings."
        primaryAction={{
          content: 'Got it',
          onAction: () => console.log('Got it'),
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};

export const CalloutWithMetrics: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <CalloutCard
        title="Your store is performing well!"
        children={
          <div>
            <Text as="p">
              Your conversion rate has increased by 23% this month. Here are some highlights:
            </Text>
            <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
              <li>156 orders completed</li>
              <li>$12,450 in revenue</li>
              <li>3.2% conversion rate</li>
              <li>89% customer satisfaction</li>
            </ul>
          </div>
        }
        primaryAction={{
          content: 'View full report',
          onAction: () => console.log('View report'),
        }}
        secondaryAction={{
          content: 'Share results',
          url: '#',
        }}
      />
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('calloutcard', 'default'),
  },

};