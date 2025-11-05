import type { Meta, StoryObj } from '@storybook/react';
import { TextContainer } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/TextContainer',
  component: TextContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'TextContainer provides optimal reading width and spacing for text content. It ensures text remains readable on all screen sizes by limiting line length and providing appropriate padding.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content to wrap',
    },
    spacing: {
      control: 'boolean',
      description: 'Add vertical spacing between text elements',
    },
  },
} satisfies Meta<typeof TextContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a text container that provides optimal reading width for your content. It ensures that lines of text don\'t become too long, which improves readability and user experience.',
  },
};

export const BasicUsage: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          Introduction to Our Platform
        </h2>
        <p style={{ lineHeight: '1.6', color: '#374151' }}>
          Welcome to our comprehensive e-commerce platform designed to help businesses of all sizes
          succeed in the digital marketplace. Our solution provides everything you need to create,
          manage, and grow your online presence with ease and confidence.
        </p>
      </TextContainer>
    </div>
  ),
};

export const LongFormContent: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer spacing>
        <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '16px' }}>
          The Future of E-Commerce
        </h2>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          In today's rapidly evolving digital landscape, e-commerce has transformed from a convenient
          alternative to traditional retail into a fundamental pillar of the global economy.
          Businesses that embrace digital commerce not only expand their reach beyond geographical
          boundaries but also gain valuable insights into customer behavior, preferences, and emerging
          market trends.
        </p>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          The integration of artificial intelligence, machine learning, and advanced analytics has
          revolutionized how online businesses operate. Personalized shopping experiences, predictive
          inventory management, and automated customer service have become standard expectations
          rather than competitive advantages. Companies that leverage these technologies effectively
          can create seamless, engaging experiences that keep customers coming back.
        </p>

        <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', marginTop: '24px' }}>
          Key Trends Shaping the Industry
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          Mobile commerce continues to dominate the landscape, with over 70% of e-commerce traffic
          now originating from mobile devices. This shift has prompted businesses to prioritize
          mobile-first design strategies, ensuring that their online stores provide exceptional
          experiences across all screen sizes and devices.
        </p>

        <p style={{ lineHeight: '1.6', color: '#374151' }}>
          Social commerce integration has blurred the lines between social media platforms and
          online shopping, creating new opportunities for brands to connect with customers where
          they spend their time. This convergence of content and commerce enables businesses to
          build authentic relationships while driving sales through native shopping experiences.
        </p>
      </TextContainer>
    </div>
  ),
};

export const ProductDescription: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          Premium Wireless Headphones
        </h2>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '12px' }}>
          Experience crystal-clear audio with our premium wireless headphones, engineered for
          audiophiles who demand the best in sound quality and comfort. Featuring advanced
          noise-cancellation technology and 40-hour battery life, these headphones deliver
          an unparalleled listening experience.
        </p>

        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          Key Features
        </h3>

        <ul style={{ color: '#374151', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '12px' }}>
          <li>Active noise cancellation with transparency mode</li>
          <li>40-hour battery life with quick charge capability</li>
          <li>Premium memory foam ear cushions</li>
          <li>Multi-device connectivity and seamless switching</li>
          <li>Built-in voice assistant support</li>
        </ul>

        <p style={{ lineHeight: '1.6', color: '#374151' }}>
          Whether you're traveling, working, or relaxing at home, these headphones provide the
          perfect balance of performance, comfort, and style. The ergonomic design ensures all-day
          comfort, while the premium materials guarantee durability for years of use.
        </p>
      </TextContainer>
    </div>
  ),
};

export const HelpArticle: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer spacing>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          How to Set Up Your First Product
        </h2>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          Setting up your first product is an exciting milestone in your e-commerce journey.
          This guide will walk you through the process step by step, ensuring you have all the
          information needed to create compelling product listings that attract customers.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Step 1: Basic Product Information
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          Start by entering the essential details about your product. This includes the product name,
          a clear and concise description, and the appropriate category. Your product title should be
          descriptive yet concise, helping customers quickly understand what you're offering.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Step 2: Product Images
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          High-quality images are crucial for converting browsers into buyers. Upload multiple
          photos showing your product from different angles, in use, and with size references.
          Ensure all images are well-lit, in focus, and accurately represent the product's color
          and features.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Step 3: Pricing and Inventory
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          Set competitive pricing based on market research, your costs, and profit margins.
          Configure inventory settings to track stock levels automatically and set up alerts
          for low inventory. Consider offering different pricing tiers or bundle options to
          maximize your revenue potential.
        </p>

        <div style={{
          marginTop: '24px',
          padding: '16px',
          backgroundColor: '#f0f9ff',
          border: '1px solid #bfdbfe',
          borderRadius: '6px'
        }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>
            💡 Pro Tip
          </h4>
          <p style={{ lineHeight: '1.6', color: '#1e40af', fontSize: '14px' }}>
            Use the "Preview" feature to see how your product listing will appear to customers
            before publishing. This helps you catch any issues and ensure your presentation is perfect.
          </p>
        </div>
      </TextContainer>
    </div>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer spacing>
        <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px' }}>
          5 Strategies to Boost Your E-Commerce Sales This Holiday Season
        </h2>

        <p style={{ lineHeight: '1.6', color: '#6b7280', fontSize: '16px', marginBottom: '24px' }}>
          Published on November 15, 2024 • 5 min read
        </p>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '20px' }}>
          The holiday season presents a massive opportunity for e-commerce businesses to drive
          significant revenue growth. With consumers spending billions online during this period,
          implementing the right strategies can make the difference between a good season and a
          record-breaking one. Here are five proven approaches to maximize your holiday sales.
        </p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          1. Optimize Your Mobile Experience
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '20px' }}>
          With mobile devices accounting for over 70% of holiday shopping traffic, ensuring your
          mobile experience is flawless is non-negotiable. Test your website on various devices,
          streamline the checkout process, and implement mobile-specific features like one-click
          purchasing and mobile wallet integration.
        </p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          2. Create Holiday-Specific Promotions
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '20px' }}>
          Develop compelling holiday-themed promotions that create urgency and excitement. Consider
          limited-time offers, bundle deals, free shipping thresholds, and gift with purchase
          incentives. Use festive imagery and messaging throughout your site to enhance the
          holiday shopping atmosphere.
        </p>

        <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          3. Implement Email Marketing Campaigns
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '20px' }}>
          Email marketing remains one of the most effective channels for driving holiday sales.
          Segment your audience based on past purchase behavior and preferences, then create
          targeted campaigns with personalized recommendations. Send early access notifications
          to loyal customers and use countdown timers to create urgency.
        </p>

        <blockquote style={{
          margin: '24px 0',
          padding: '16px 20px',
          backgroundColor: '#f9fafb',
          borderLeft: '4px solid #3b82f6',
          fontStyle: 'italic'
        }}>
          <p style={{ lineHeight: '1.6', color: '#4b5563', fontSize: '18px' }}>
            "Businesses that start their holiday marketing campaigns by early November see
            30% higher conversion rates compared to those who wait until Black Friday."
          </p>
        </blockquote>

        <p style={{ lineHeight: '1.6', color: '#374151', marginTop: '20px' }}>
          By implementing these strategies and preparing well in advance, you'll be positioned
          to capture maximum holiday sales and build lasting customer relationships that extend
          beyond the season.
        </p>
      </TextContainer>
    </div>
  ),
};

export const ComparisonLayout: Story = {
  render: () => (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px'
    }}>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
          Without TextContainer
        </h3>
        <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
            Standard Layout
          </h4>
          <p style={{ lineHeight: '1.6', color: '#374151', fontSize: '14px' }}>
            This text spans the full width of the container without any line length restrictions.
            On wider screens, this can create very long lines of text that become difficult to read,
            causing eye strain and reducing comprehension. Readers may lose their place when moving
            from one line to the next, especially with lengthy paragraphs or complex information.
          </p>
        </div>
      </div>

      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>
          With TextContainer
        </h3>
        <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <TextContainer>
            <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              Optimized Layout
            </h4>
            <p style={{ lineHeight: '1.6', color: '#374151', fontSize: '14px' }}>
              This text is wrapped in a TextContainer, which automatically limits the line length
              to optimal reading dimensions. The controlled line width makes content easier to read
              and digest, reducing eye strain and improving comprehension. Readers can maintain their
              place more easily when moving between lines.
            </p>
          </TextContainer>
        </div>
      </div>
    </div>
  ),
};

export const NarrowContent: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer>
        <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>
          Privacy Policy Summary
        </h2>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '12px' }}>
          We are committed to protecting your privacy and ensuring the security of your personal information.
          This policy outlines how we collect, use, and safeguard your data when you use our services.
        </p>

        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          Information We Collect
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '12px' }}>
          We collect information necessary to provide our services, including account details,
          transaction history, and usage patterns. We only collect data that is essential for
          improving your experience and maintaining our platform's security.
        </p>

        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          How We Use Your Information
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151' }}>
          Your information is used to deliver and improve our services, communicate with you,
          and ensure platform security. We never sell your personal data to third parties.
        </p>
      </TextContainer>
    </div>
  ),
};

export const TechnicalDocumentation: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <TextContainer spacing>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
          API Integration Guide
        </h2>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          This guide provides comprehensive information about integrating with our REST API.
          Follow these steps to connect your applications and access our platform's powerful features.
        </p>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Authentication
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '12px' }}>
          All API requests require authentication using API keys. Include your API key in the
          Authorization header of each request:
        </p>

        <div style={{
          backgroundColor: '#1e293b',
          color: '#e2e8f0',
          padding: '16px',
          borderRadius: '6px',
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: '16px'
        }}>
          Authorization: Bearer your-api-key-here
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
          Rate Limiting
        </h3>

        <p style={{ lineHeight: '1.6', color: '#374151', marginBottom: '16px' }}>
          API requests are limited to 1000 requests per hour per API key. The rate limit
          information is included in response headers:
        </p>

        <ul style={{ color: '#374151', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '16px' }}>
          <li><code>X-RateLimit-Limit</code>: Maximum requests per hour</li>
          <li><code>X-RateLimit-Remaining</code>: Remaining requests in current window</li>
          <li><code>X-RateLimit-Reset</code>: Time when rate limit resets</li>
        </ul>

        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24',
          borderRadius: '6px'
        }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>
            ⚠️ Important Note
          </h4>
          <p style={{ lineHeight: '1.6', color: '#92400e', fontSize: '14px' }}>
            Always handle rate limit responses gracefully and implement exponential backoff
            for retry logic to ensure reliable integration.
          </p>
        </div>
      </TextContainer>
    </div>
  ),
};