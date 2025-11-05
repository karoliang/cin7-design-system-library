import type { Meta, StoryObj } from '@storybook/react';
import { DisplayText, Card, Text } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Feedback/DisplayText',
  component: DisplayText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Display text components are used for headings and prominent text throughout your application. They provide hierarchy and visual structure to your content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extraLarge'],
      description: 'Text size variant',
    },
    element: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'],
      description: 'HTML element to render',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
  },
} satisfies Meta<typeof DisplayText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'medium',
    element: 'h2',
    children: 'Welcome to your dashboard',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      <div>
        <DisplayText size="extraLarge" element="h1">
          Extra Large Heading
        </DisplayText>
        <Text variant="bodySm" as="p">Used for main page titles and hero sections</Text>
      </div>

      <div>
        <DisplayText size="large" element="h2">
          Large Heading
        </DisplayText>
        <Text variant="bodySm" as="p">Used for section headers and major titles</Text>
      </div>

      <div>
        <DisplayText size="medium" element="h3">
          Medium Heading
        </DisplayText>
        <Text variant="bodySm" as="p">Used for subsection titles and card headers</Text>
      </div>

      <div>
        <DisplayText size="small" element="h4">
          Small Heading
        </DisplayText>
        <Text variant="bodySm" as="p">Used for minor headings and labels</Text>
      </div>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <DisplayText size="extraLarge" element="h1">
        Page Title (H1)
      </DisplayText>

      <DisplayText size="large" element="h2">
        Section Title (H2)
      </DisplayText>

      <DisplayText size="medium" element="h3">
        Subsection Title (H3)
      </DisplayText>

      <DisplayText size="small" element="h4">
        Component Title (H4)
      </DisplayText>

      <DisplayText size="small" element="h5">
        Label Title (H5)
      </DisplayText>

      <DisplayText size="small" element="h6">
        Micro Title (H6)
      </DisplayText>
    </div>
  ),
};

export const InCards: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', maxWidth: '900px' }}>
      <Card sectioned>
        <DisplayText size="medium" element="h3">
          Sales Dashboard
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Track your sales performance and revenue metrics in real-time.
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="medium" element="h3">
          Customer Analytics
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Understand customer behavior and preferences with detailed analytics.
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="medium" element="h3">
          Inventory Management
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Monitor stock levels and manage product availability across locations.
        </Text>
      </Card>
    </div>
  ),
};

export const MarketingHeadlines: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '700px', textAlign: 'center' }}>
      <div>
        <DisplayText size="extraLarge" element="h1">
          Grow Your Business with Shopify
        </DisplayText>
        <Text as="p" variant="bodyLg">
          Everything you need to sell online, manage your business, and grow your brand.
        </Text>
      </div>

      <div>
        <DisplayText size="large" element="h2">
          Start Selling in Minutes
        </DisplayText>
        <Text as="p" variant="bodyMd">
          No technical skills required. Our intuitive platform makes it easy to set up your store and start selling.
        </Text>
      </div>

      <div>
        <DisplayText size="medium" element="h3">
          Trusted by Millions
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Join over 1.7 million businesses that trust Shopify to power their commerce.
        </Text>
      </div>
    </div>
  ),
};

export const DashboardMetrics: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '800px' }}>
      <Card sectioned>
        <DisplayText size="small" element="h4">
          Total Revenue
        </DisplayText>
        <DisplayText size="large" element="p">
          $45,678
        </DisplayText>
        <Text as="p" variant="bodySm" tone="success">
          ↑ 12% from last month
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="small" element="h4">
          Orders
        </DisplayText>
        <DisplayText size="large" element="p">
          1,234
        </DisplayText>
        <Text as="p" variant="bodySm" tone="success">
          ↑ 8% from last month
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="small" element="h4">
          Conversion Rate
        </DisplayText>
        <DisplayText size="large" element="p">
          3.2%
        </DisplayText>
        <Text as="p" variant="bodySm" tone="warning">
          ↓ 0.5% from last month
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="small" element="h4">
          Average Order Value
        </DisplayText>
        <DisplayText size="large" element="p">
          $87.50
        </DisplayText>
        <Text as="p" variant="bodySm" tone="success">
          ↑ $5.25 from last month
        </Text>
      </Card>
    </div>
  ),
};

export const ProductTitles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div>
        <DisplayText size="large" element="h1">
          Premium Wireless Headphones
        </DisplayText>
        <Text as="p" variant="bodyLg">
          Experience crystal-clear audio with our latest noise-canceling technology.
        </Text>
      </div>

      <div>
        <DisplayText size="medium" element="h2">
          Features & Benefits
        </DisplayText>
        <Text as="p" variant="bodyMd">
          40-hour battery life, active noise cancellation, premium comfort padding.
        </Text>
      </div>

      <div>
        <DisplayText size="small" element="h3">
          Technical Specifications
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Bluetooth 5.0, 20Hz-20kHz frequency response, 32mm drivers.
        </Text>
      </div>
    </div>
  ),
};

export const StatusMessages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
      <Card sectioned>
        <DisplayText size="medium" element="h3">
          ✅ Order Completed
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Your order #1001 has been successfully processed and will be shipped within 2 business days.
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="medium" element="h3">
          ⏳ Processing Payment
        </DisplayText>
        <Text as="p" variant="bodyMd">
          We're currently verifying your payment method. This usually takes a few seconds.
        </Text>
      </Card>

      <Card sectioned>
        <DisplayText size="medium" element="h3">
          ⚠️ Action Required
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Please update your shipping address to complete your order.
        </Text>
      </Card>
    </div>
  ),
};

export const PricingPage: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center' }}>
        <DisplayText size="extraLarge" element="h1">
          Choose Your Plan
        </DisplayText>
        <Text as="p" variant="bodyLg">
          Select the perfect plan for your business needs
        </Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <Card sectioned>
          <DisplayText size="medium" element="h3">
            Basic
          </DisplayText>
          <DisplayText size="extraLarge" element="p">
            $29
          </DisplayText>
          <Text as="p" variant="bodySm">per month</Text>
        </Card>

        <Card sectioned>
          <DisplayText size="medium" element="h3">
            Professional
          </DisplayText>
          <DisplayText size="extraLarge" element="p">
            $79
          </DisplayText>
          <Text as="p" variant="bodySm">per month</Text>
        </Card>

        <Card sectioned>
          <DisplayText size="medium" element="h3">
            Enterprise
          </DisplayText>
          <DisplayText size="extraLarge" element="p">
            Custom
          </DisplayText>
          <Text as="p" variant="bodySm">contact us</Text>
        </Card>
      </div>
    </div>
  ),
};

export const WelcomeMessages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
      <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <DisplayText size="large" element="h2">
          Welcome to Your Dashboard!
        </DisplayText>
        <Text as="p" variant="bodyLg">
          Let's get your store set up for success
        </Text>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <DisplayText size="medium" element="h3">
          Quick Start Guide
        </DisplayText>
        <Text as="p" variant="bodyMd">
          Follow these steps to get your store online in minutes
        </Text>
      </div>
    </div>
  ),
};

export const ErrorPages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px', textAlign: 'center' }}>
      <DisplayText size="extraLarge" element="h1">
        404
      </DisplayText>
      <DisplayText size="large" element="h2">
        Page Not Found
      </DisplayText>
      <Text as="p" variant="bodyLg">
        The page you're looking for doesn't exist or has been moved.
      </Text>
      <DisplayText size="medium" element="h3">
        What can you do?
      </DisplayText>
      <Text as="p" variant="bodyMd">
        Check the URL, return to the homepage, or search for what you need.
      </Text>
    </div>
  ),
};