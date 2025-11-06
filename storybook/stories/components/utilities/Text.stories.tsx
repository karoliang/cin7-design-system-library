import type { Meta, StoryObj } from '@storybook/react';
import { Text, Card, Badge, Button } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text component is used for rendering text content with various styles and variants. It\'s perfect for body text, descriptions, captions, and any text content that needs consistent typography and spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['bodySm', 'bodyMd', 'bodyLg', 'headingSm', 'headingMd', 'headingLg', 'headingXl', 'heading2xl', 'heading3xl', 'heading4xl'],
      description: 'Text style variant',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'strong', 'em'],
      description: 'HTML element to render as',
    },
    children: {
      control: 'text',
      description: 'Text content',
    },
    alignment: {
      control: 'select',
      options: ['start', 'center', 'end', 'justify'],
      description: 'Text alignment',
    },
    tone: {
      control: 'select',
      options: ['base', 'subdued', 'critical', 'success', 'warning', 'attention', 'info'],
      description: 'Text color/tone',
    },
    fontWeight: {
      control: 'select',
      options: ['regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    breakWord: {
      control: 'boolean',
      description: 'Allow word breaking',
    },
    numeric: {
      control: 'boolean',
      description: 'Use numeric font styling',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
    visuallyHidden: {
      control: 'boolean',
      description: 'Hide text visually but keep accessible',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'bodyMd',
    as: 'p',
    children: 'This is default body text using the Text component.',
  },
  parameters: {
    codeVariants: getCodeVariants('text', 'body'),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div>
        <Text variant="bodySm" as="p">Body Small - Used for captions, metadata, and helper text</Text>
      </div>
      <div>
        <Text variant="bodyMd" as="p">Body Medium - Default text for paragraphs and descriptions</Text>
      </div>
      <div>
        <Text variant="bodyLg" as="p">Body Large - Emphasized body text and short descriptions</Text>
      </div>
      <div>
        <Text variant="headingSm" as="h4">Heading Small - Section headers and card titles</Text>
      </div>
      <div>
        <Text variant="headingMd" as="h3">Heading Medium - Subsection titles and important labels</Text>
      </div>
      <div>
        <Text variant="headingLg" as="h2">Heading Large - Main section titles</Text>
      </div>
      <div>
        <Text variant="headingXl" as="h1">Heading XL - Page titles and major headlines</Text>
      </div>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      <Text variant="bodyMd" tone="base">Base tone - Default text color</Text>
      <Text variant="bodyMd" tone="subdued">Subdued tone - Secondary information</Text>
      <Text variant="bodyMd" tone="success">Success tone - Positive messages</Text>
      <Text variant="bodyMd" tone="warning">Warning tone - Caution messages</Text>
      <Text variant="bodyMd" tone="attention">Attention tone - Important notices</Text>
      <Text variant="bodyMd" tone="critical">Critical tone - Error messages</Text>
      <Text variant="bodyMd" tone="info">Info tone - Informational content</Text>
    </div>
  ),
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      <Text variant="bodyMd" fontWeight="regular">Regular weight - Default text</Text>
      <Text variant="bodyMd" fontWeight="medium">Medium weight - Slightly emphasized</Text>
      <Text variant="bodyMd" fontWeight="semibold">Semibold weight - Moderately emphasized</Text>
      <Text variant="bodyMd" fontWeight="bold">Bold weight - Strongly emphasized</Text>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="start">Left aligned text (start) - Default alignment for most content</Text>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="center">Center aligned text - Perfect for headers and callouts</Text>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="end">Right aligned text (end) - Good for prices and metadata</Text>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="justify">Justified text - Creates clean columns and professional layouts</Text>
      </div>
    </div>
  ),
};

export const MarketingCopy: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
      <div style={{ textAlign: 'center' }}>
        <Text variant="heading2xl" as="h1">
          Transform Your Business Today
        </Text>
        <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
          Join thousands of successful businesses using our platform to streamline operations,
          boost sales, and delight customers worldwide.
        </Text>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="headingMd" as="h3">
            🚀 Scale with Confidence
          </Text>
          <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
            Our enterprise-grade infrastructure handles millions of transactions daily,
            ensuring your business runs smoothly even during peak seasons.
          </Text>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="headingMd" as="h3">
            📊 Data-Driven Insights
          </Text>
          <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
            Make informed decisions with real-time analytics and comprehensive reporting
            tools that give you a 360° view of your business performance.
          </Text>
        </div>

        <div style={{ padding: '16px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="headingMd" as="h3">
            🌍 Global Reach
          </Text>
          <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
            Expand your business internationally with built-in multi-currency support,
            localized payment methods, and automated tax calculations.
          </Text>
        </div>
      </div>
    </div>
  ),
};

export const ProductDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      <div>
        <Text variant="headingLg" as="h2">
          Premium Wireless Headphones
        </Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <Badge tone="success">In Stock</Badge>
          <Text variant="bodySm" tone="subdued">SKU: WH-1000XM4</Text>
          <Badge tone="info">Best Seller</Badge>
        </div>
      </div>

      <Text variant="bodyLg" as="p" tone="subdued">
        $299.99
      </Text>

      <div>
        <Text variant="headingMd" as="h3">
          Description
        </Text>
        <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
          Experience premium sound quality with our industry-leading noise-canceling headphones.
          Featuring adaptive sound control, 30-hour battery life, and exceptional comfort for all-day wear.
        </Text>
      </div>

      <div>
        <Text variant="headingMd" as="h3">
          Key Features
        </Text>
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text variant="bodyMd" as="p">• Industry-leading noise canceling with Dual Noise Sensor technology</Text>
          <Text variant="bodyMd" as="p">• Next-level music with Edge-AI and DSEE Extreme</Text>
          <Text variant="bodyMd" as="p">• Up to 30-hour battery life with quick charging</Text>
          <Text variant="bodyMd" as="p">• Crystal-clear hands-free calling with precise voice pickup</Text>
          <Text variant="bodyMd" as="p">• Multipoint connection for seamless device switching</Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">
          What's in the Box
        </Text>
        <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
          Premium Wireless Headphones, Carrying Case, USB-C Charging Cable,
          3.5mm Audio Cable, Airline Adapter, Quick Start Guide
        </Text>
      </div>
    </div>
  ),
};

export const FeatureLists: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '700px' }}>
      <div>
        <Text variant="headingLg" as="h2" alignment="center">
          Everything You Need to Succeed
        </Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="headingMd" as="h3" style={{ marginBottom: '12px' }}>
            🛍️ E-commerce Features
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant="bodySm" as="p">✓ Unlimited products & variants</Text>
            <Text variant="bodySm" as="p">✓ Advanced inventory management</Text>
            <Text variant="bodySm" as="p">✓ Discount codes & promotions</Text>
            <Text variant="bodySm" as="p">✓ Abandoned cart recovery</Text>
            <Text variant="bodySm" as="p">✓ Product reviews & ratings</Text>
          </div>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="headingMd" as="h3" style={{ marginBottom: '12px' }}>
            💳 Payment Solutions
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant="bodySm" as="p">✓ 100+ payment gateways</Text>
            <Text variant="bodySm" as="p">✓ Buy now, pay later options</Text>
            <Text variant="bodySm" as="p">✓ Subscription billing</Text>
            <Text variant="bodySm" as="p">✓ Multi-currency support</Text>
            <Text variant="bodySm" as="p">✓ Automated tax calculations</Text>
          </div>
        </div>

        <div style={{ padding: '20px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
          <Text variant="headingMd" as="h3" style={{ marginBottom: '12px' }}>
            📈 Marketing Tools
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant="bodySm" as="p">✓ Email marketing automation</Text>
            <Text variant="bodySm" as="p">✓ SEO optimization tools</Text>
            <Text variant="bodySm" as="p">✓ Social media integration</Text>
            <Text variant="bodySm" as="p">✓ Analytics & reporting</Text>
            <Text variant="bodySm" as="p">✓ Customer segmentation</Text>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PricingCopy: Story = {
  render: () => {
    const plans = [
      {
        name: 'Starter',
        price: '$29',
        period: 'per month',
        description: 'Perfect for small businesses just getting started',
        features: [
          'Up to 100 products',
          'Basic analytics',
          'Email support',
          'Mobile-optimized store',
          'SSL certificate included'
        ]
      },
      {
        name: 'Professional',
        price: '$79',
        period: 'per month',
        description: 'Ideal for growing businesses with advanced needs',
        popular: true,
        features: [
          'Unlimited products',
          'Advanced analytics & reporting',
          'Priority support',
          'Abandoned cart recovery',
          'Gift cards & store credit',
          'Professional reporting'
        ]
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'pricing',
        description: 'Tailored solutions for large-scale operations',
        features: [
          'Everything in Professional',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced API access',
          'White-label options',
          '99.99% uptime SLA'
        ]
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
        <div style={{ textAlign: 'center' }}>
          <Text variant="heading2xl" as="h2">
            Simple, Transparent Pricing
          </Text>
          <Text variant="bodyLg" as="p" style={{ marginTop: '12px' }}>
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </Text>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {plans.map((plan, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                border: plan.popular ? '2px solid #007ace' : '1px solid #e1e3e5',
                borderRadius: '8px',
                backgroundColor: plan.popular ? '#f3f9ff' : '#fff',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <Badge tone="attention" style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  Most Popular
                </Badge>
              )}

              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <Text variant="headingLg" as="h3">
                  {plan.name}
                </Text>
                <Text variant="bodyMd" as="p" tone="subdued" style={{ marginTop: '4px' }}>
                  {plan.description}
                </Text>
              </div>

              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Text variant="heading3xl" as="div">
                  {plan.price}
                </Text>
                <Text variant="bodySm" as="p" tone="subdued">
                  {plan.period}
                </Text>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <Text variant="headingSm" as="h4" style={{ marginBottom: '12px' }}>
                  What's included:
                </Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {plan.features.map((feature, featureIndex) => (
                    <Text key={featureIndex} variant="bodySm" as="p">
                      • {feature}
                    </Text>
                  ))}
                </div>
              </div>

              <Button fullWidth variant={plan.popular ? 'primary' : 'secondary'}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const CustomerTestimonials: Story = {
  render: () => {
    const testimonials = [
      {
        name: 'Sarah Chen',
        company: 'TechStart Inc.',
        content: 'This platform transformed our business. We saw a 300% increase in sales within the first six months.',
        rating: 5
      },
      {
        name: 'Michael Rodriguez',
        company: 'Fashion Forward',
        content: 'The analytics tools are incredible. We can now make data-driven decisions that have doubled our conversion rates.',
        rating: 5
      },
      {
        name: 'Emily Johnson',
        company: 'Green Earth Co.',
        content: 'Customer support is outstanding. They helped us migrate seamlessly and were available 24/7 during our launch.',
        rating: 5
      }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        <div style={{ textAlign: 'center' }}>
          <Text variant="heading2xl" as="h2">
            What Our Customers Say
          </Text>
          <Text variant="bodyLg" as="p" style={{ marginTop: '12px' }}>
            Join thousands of successful businesses thriving on our platform
          </Text>
        </div>

        <div style={{ display: 'grid', gap: '20px' }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{ padding: '20px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} style={{ color: '#fbbf24', fontSize: '16px' }}>★</span>
                ))}
              </div>

              <Text variant="bodyMd" as="blockquote" style={{ fontStyle: 'italic', marginBottom: '16px' }}>
                "{testimonial.content}"
              </Text>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Text variant="bodySm" fontWeight="medium">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </div>
                <div>
                  <Text variant="bodySm" fontWeight="medium" as="p">
                    {testimonial.name}
                  </Text>
                  <Text variant="bodySm" tone="subdued" as="p">
                    {testimonial.company}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const InteractiveText: Story = {
  render: () => {
    const [expandedText, setExpandedText] = React.useState(false);
    const [selectedFeature, setSelectedFeature] = React.useState<string | null>(null);

    const longText = "Our comprehensive platform provides everything you need to build, manage, and scale your online business. From powerful inventory management and seamless payment processing to advanced marketing tools and detailed analytics, we've got you covered. With our user-friendly interface and 24/7 support, you'll be up and running in minutes, not months.";

    const features = [
      { id: 'inventory', name: 'Smart Inventory', description: 'Automated stock tracking and reordering' },
      { id: 'analytics', name: 'Advanced Analytics', description: 'Real-time insights and reporting' },
      { id: 'payments', name: 'Secure Payments', description: '100+ payment methods supported' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
        <div>
          <Text variant="headingLg" as="h3">
            Interactive Text Examples
          </Text>
        </div>

        <div>
          <Text variant="headingMd" as="h4">
            Expandable Text
          </Text>
          <Text variant="bodyMd" as="p" style={{ marginTop: '8px' }}>
            {expandedText ? longText : `${longText.substring(0, 150)}...`}
          </Text>
          <Button
            variant="plain"
            onClick={() => setExpandedText(!expandedText)}
            style={{ marginTop: '8px' }}
          >
            {expandedText ? 'Show Less' : 'Read More'}
          </Button>
        </div>

        <div>
          <Text variant="headingMd" as="h4">
            Clickable Features
          </Text>
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id === selectedFeature ? null : feature.id)}
                style={{
                  padding: '12px',
                  border: '1px solid #e1e3e5',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedFeature === feature.id ? '#f3f9ff' : '#fff',
                  transition: 'background-color 0.2s ease'
                }}
              >
                <Text variant="bodyMd" fontWeight="medium" as="p">
                  {feature.name}
                </Text>
                {selectedFeature === feature.id && (
                  <Text variant="bodySm" tone="subdued" as="p" style={{ marginTop: '4px' }}>
                    {feature.description}
                  </Text>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const SpecializedText: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      <div>
        <Text variant="headingMd" as="h3">
          Numeric Text
        </Text>
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text variant="bodyLg" numeric>
            123,456.78
          </Text>
          <Text variant="bodyMd" numeric>
            $1,234.56
          </Text>
          <Text variant="bodySm" numeric>
            99.9%
          </Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">
          Truncated Text
        </Text>
        <div style={{ marginTop: '8px' }}>
          <Text variant="bodyMd" truncate>
            This is a very long text that will be truncated with an ellipsis when it exceeds the container width
          </Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">
          Text with Word Breaking
        </Text>
        <div style={{ marginTop: '8px', width: '200px' }}>
          <Text variant="bodyMd" breakWord>
            Supercalifragilisticexpialidocious
          </Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">
          Semantic HTML Elements
        </Text>
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Text variant="bodyMd" as="p">Paragraph text</Text>
          <Text variant="bodyMd" as="label">Label text</Text>
          <Text variant="bodyMd" as="strong">Strong text</Text>
          <Text variant="bodyMd" as="em">Emphasized text</Text>
          <Text variant="bodyMd" as="span">Span text</Text>
        </div>
      </div>
    </div>
  ),
};