import type { Meta, StoryObj } from '@storybook/react';
import {
  Text,
  Heading,
  Badge,
  Button,
  ButtonGroup,
  Card,
  Avatar,
  BlockStack,
  InlineStack,
  Grid,
  Layout,
  Page
} from '@shopify/polaris';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Examples/Landing Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive landing page examples demonstrating how to use Polaris marketing components together to create effective landing pages. These examples showcase product launches, marketing campaigns, and business websites.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProductLaunch: Story = {
  render: () => (
    <Page>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center',
        borderRadius: '0 0 40px 40px'
      }}>
        <Heading as="h1" variant="heading4xl">
          Introducing Premium Pro
        </Heading>
        <Text variant="bodyLg" as="p" style={{ marginTop: '16px', opacity: 0.9, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
          The most powerful and intuitive platform for growing your business.
          Launch today and transform the way you work.
        </Text>

        <InlineStack gap="400" style={{ marginTop: '32px', justifyContent: 'center' }}>
          <Button variant="primary" size="large">
            Start Free Trial
          </Button>
          <Button variant="secondary" size="large">
            Watch Demo
          </Button>
        </InlineStack>

        <InlineStack gap="300" style={{ marginTop: '24px', justifyContent: 'center' }}>
          <Badge tone="success">✓ No credit card required</Badge>
          <Badge tone="info">✓ 14-day free trial</Badge>
          <Badge tone="attention">✓ Cancel anytime</Badge>
        </InlineStack>
      </div>

      <Layout>
        <Layout.Section>
          <div style={{ padding: '60px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Heading as="h2" variant="heading2xl">
                Everything You Need to Succeed
              </Heading>
              <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                Powerful features designed to help you grow faster
              </Text>
            </div>

            <Grid columns={{ xs: 1, sm: 2, lg: 3 }} gap="500">
              <Card sectioned>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="icon-3xl" style={{ marginBottom: '12px' }}>🚀</div>
                  <Heading as="h3" variant="headingLg">
                    Fast Performance
                  </Heading>
                </div>
                <Text variant="bodyMd" alignment="center">
                  Lightning-fast loading times and smooth user experience
                  that keeps your customers engaged.
                </Text>
              </Card>

              <Card sectioned>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="icon-3xl" style={{ marginBottom: '12px' }}>🔒</div>
                  <Heading as="h3" variant="headingLg">
                    Enterprise Security
                  </Heading>
                </div>
                <Text variant="bodyMd" alignment="center">
                  Bank-level security with advanced encryption and
                  compliance with international standards.
                </Text>
              </Card>

              <Card sectioned>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="icon-3xl" style={{ marginBottom: '12px' }}>📊</div>
                  <Heading as="h3" variant="headingLg">
                    Advanced Analytics
                  </Heading>
                </div>
                <Text variant="bodyMd" alignment="center">
                  Real-time insights and detailed reports to help you
                  make data-driven decisions.
                </Text>
              </Card>

              <Card sectioned>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="icon-3xl" style={{ marginBottom: '12px' }}>🌍</div>
                  <Heading as="h3" variant="headingLg">
                    Global Reach
                  </Heading>
                </div>
                <Text variant="bodyMd" alignment="center">
                  Multi-language support and localized features to
                    help you expand internationally.
                </Text>
              </Card>

              <Card sectioned>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="icon-3xl" style={{ marginBottom: '12px' }}>🎯</div>
                  <Heading as="h3" variant="headingLg">
                    Smart Marketing
                  </Heading>
                </div>
                <Text variant="bodyMd" alignment="center">
                  Built-in marketing tools to attract, engage, and
                  retain your customers effectively.
                </Text>
              </Card>

              <Card sectioned>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div className="icon-3xl" style={{ marginBottom: '12px' }}>💬</div>
                  <Heading as="h3" variant="headingLg">
                    24/7 Support
                  </Heading>
                </div>
                <Text variant="bodyMd" alignment="center">
                  Expert support team available around the clock to
                  help you succeed.
                </Text>
              </Card>
            </Grid>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '60px 0', margin: '0 -40px' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <Heading as="h2" variant="heading2xl">
                Trusted by Industry Leaders
              </Heading>
              <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                Join thousands of successful companies using our platform
              </Text>
            </div>

            <Grid columns={{ xs: 2, sm: 3, lg: 6 }} gap="400">
              {['TechCorp', 'FashionHub', 'GreenEarth', 'SpeedCo', 'CreativeStudio', 'GlobalTrade'].map((company, index) => (
                <Card key={index} padding="400">
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px'
                    }}>
                      <Text variant="bodySm" fontWeight="medium">{company.substring(0, 2)}</Text>
                    </div>
                    <Text variant="bodySm" tone="subdued">{company}</Text>
                  </div>
                </Card>
              ))}
            </Grid>
          </div>

          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <Heading as="h2" variant="heading2xl">
              Ready to Get Started?
            </Heading>
            <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
              Join thousands of businesses already using our platform
            </Text>

            <div style={{ marginTop: '32px' }}>
              <Button variant="primary" size="large">
                Start Your Free Trial
              </Button>
            </div>

            <InlineStack gap="300" style={{ marginTop: '16px', justifyContent: 'center' }}>
              <Badge tone="success">✓ No setup fee</Badge>
              <Badge tone="info">✓ 14-day trial</Badge>
              <Badge tone="attention">✓ Cancel anytime</Badge>
            </InlineStack>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  ),
};

export const MarketingCampaign: Story = {
  render: () => {
    const [selectedPlan, setSelectedPlan] = useState('professional');

    const plans = [
      {
        id: 'starter',
        name: 'Starter',
        price: '$29',
        period: '/month',
        description: 'Perfect for small businesses',
        features: [
          'Up to 100 products',
          'Basic analytics',
          'Email support',
          'Mobile store',
          'SSL certificate'
        ],
        badge: 'Popular',
        badgeTone: 'info'
      },
      {
        id: 'professional',
        name: 'Professional',
        price: '$79',
        period: '/month',
        description: 'Ideal for growing businesses',
        features: [
          'Unlimited products',
          'Advanced analytics',
          'Priority support',
          'Marketing automation',
          'Custom domains',
          'API access'
        ],
        badge: 'Best Value',
        badgeTone: 'success'
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 'Custom',
        period: '',
        description: 'For large organizations',
        features: [
          'Everything in Professional',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced security',
          'SLA guarantee',
          'White-label options'
        ],
        badge: 'Contact Sales',
        badgeTone: 'attention'
      }
    ];

    const testimonials = [
      {
        name: 'Sarah Chen',
        company: 'TechStart Inc.',
        avatar: 'SC',
        content: 'This platform transformed our business. We saw a 300% increase in sales within six months.',
        rating: 5
      },
      {
        name: 'Michael Rodriguez',
        company: 'Fashion Forward',
        avatar: 'MR',
        content: 'The analytics tools are incredible. We doubled our conversion rates with data-driven decisions.',
        rating: 5
      }
    ];

    return (
      <Page>
        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '80px 40px',
          textAlign: 'center',
          borderRadius: '0 0 40px 40px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Badge tone="attention">Limited Time Offer</Badge>
          </div>
          <Heading as="h1" variant="heading4xl">
            Black Friday Special
          </Heading>
          <Text variant="bodyLg" as="p" style={{ marginTop: '16px', opacity: 0.9, maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
            Get 50% off your first 3 months. This is our biggest sale of the year -
            don't miss out on this opportunity to transform your business.
          </Text>

          <div style={{ marginTop: '32px' }}>
            <Button variant="primary" size="large">
              Claim Your Discount
            </Button>
          </div>

          <Text variant="bodySm" as="p" style={{ marginTop: '16px', opacity: 0.8 }}>
            ⏰ Offer ends in 48 hours
          </Text>
        </div>

        <Layout>
          <Layout.Section>
            <div style={{ padding: '60px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <Heading as="h2" variant="heading2xl">
                  Choose Your Plan
                </Heading>
                <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                  Simple, transparent pricing with no hidden fees
                </Text>
              </div>

              <Grid columns={{ xs: 1, md: 3 }} gap="400">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    style={{
                      border: selectedPlan === plan.id ? '2px solid #007ace' : '1px solid #e1e3e5',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      transform: selectedPlan === plan.id ? 'scale(1.02)' : 'scale(1)'
                    }}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div style={{
                      padding: '24px',
                      backgroundColor: selectedPlan === plan.id ? '#f3f9ff' : '#fff',
                      borderBottom: '1px solid #e1e3e5'
                    }}>
                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <Heading as="h3" variant="headingLg">
                          {plan.name}
                        </Heading>
                        <Badge tone={plan.badgeTone as any} style={{ marginTop: '8px' }}>
                          {plan.badge}
                        </Badge>
                      </div>

                      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <Heading as="div" variant="heading3xl">
                          {plan.price}
                        </Heading>
                        <Text variant="bodySm" tone="subdued">
                          {plan.period}
                        </Text>
                      </div>

                      <Text variant="bodySm" alignment="center" tone="subdued">
                        {plan.description}
                      </Text>
                    </div>

                    <div style={{ padding: '24px' }}>
                      <div style={{ marginBottom: '20px' }}>
                        {plan.features.map((feature, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <span style={{ color: '#10b981' }}>✓</span>
                            <Text variant="bodySm">{feature}</Text>
                          </div>
                        ))}
                      </div>

                      <Button
                        fullWidth
                        variant={selectedPlan === plan.id ? 'primary' : 'secondary'}
                      >
                        {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '60px 0', margin: '0 -40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                <Heading as="h2" variant="heading2xl">
                  Customer Success Stories
                </Heading>
                <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                  See how businesses like yours are achieving remarkable results
                </Text>
              </div>

              <Grid columns={{ xs: 1, md: 2 }} gap="400">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} padding="500">
                    <div style={{ marginBottom: '16px' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} style={{ color: '#fbbf24', fontSize: "var(--font-size-base)" }}>★</span>
                      ))}
                    </div>

                    <Text variant="bodyMd" as="blockquote" style={{
                      fontStyle: 'italic',
                      marginBottom: '20px',
                      lineHeight: '1.6'
                    }}>
                      "{testimonial.content}"
                    </Text>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar size="medium" initials={testimonial.avatar} />
                      <div>
                        <Text variant="bodySm" fontWeight="medium" as="p">
                          {testimonial.name}
                        </Text>
                        <Text variant="bodySm" tone="subdued" as="p">
                          {testimonial.company}
                        </Text>
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>

            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <Badge tone="critical">Limited Time</Badge>
              </div>
              <Heading as="h2" variant="heading2xl">
                Don't Miss Out!
              </Heading>
              <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                This Black Friday offer ends in 48 hours
              </Text>

              <div style={{ marginTop: '32px' }}>
                <Button variant="primary" size="large">
                  Save 50% Now
                </Button>
              </div>

              <InlineStack gap="300" style={{ marginTop: '16px', justifyContent: 'center' }}>
                <Badge tone="success">✓ 50% off first 3 months</Badge>
                <Badge tone="info">✓ No setup fee</Badge>
                <Badge tone="attention">✓ 14-day guarantee</Badge>
              </InlineStack>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const BusinessWebsite: Story = {
  render: () => {
    const teamMembers = [
      { name: 'Sarah Chen', role: 'CEO & Founder', initials: 'SC' },
      { name: 'Michael Rodriguez', role: 'CTO', initials: 'MR' },
      { name: 'Emily Johnson', role: 'Head of Design', initials: 'EJ' },
      { name: 'David Kim', role: 'Lead Engineer', initials: 'DK' },
    ];

    const services = [
      {
        icon: '🚀',
        title: 'Digital Transformation',
        description: 'Comprehensive digital solutions to modernize your business operations and customer experience.',
        features: ['Cloud Migration', 'Process Automation', 'Digital Strategy']
      },
      {
        icon: '📊',
        title: 'Data Analytics',
        description: 'Advanced analytics and business intelligence solutions to unlock valuable insights from your data.',
        features: ['Real-time Dashboards', 'Predictive Analytics', 'Custom Reporting']
      },
      {
        icon: '🛡️',
        title: 'Cybersecurity',
        description: 'Enterprise-grade security solutions to protect your business from digital threats.',
        features: ['Security Audits', 'Compliance Management', 'Threat Detection']
      }
    ];

    const stats = [
      { number: '500+', label: 'Happy Clients' },
      { number: '99.9%', label: 'Uptime' },
      { number: '24/7', label: 'Support' },
      { number: '10+', label: 'Years Experience' }
    ];

    return (
      <Page>
        <div style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: 'white',
          padding: '100px 40px',
          textAlign: 'center',
          borderRadius: '0 0 60px 60px'
        }}>
          <Heading as="h1" variant="heading4xl">
            Innovate. Transform. Succeed.
          </Heading>
          <Text variant="bodyLg" as="p" style={{
            marginTop: '24px',
            opacity: 0.9,
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: '1.6'
          }}>
            We help businesses leverage cutting-edge technology to drive growth,
            efficiency, and competitive advantage in the digital age.
          </Text>

          <ButtonGroup gap="400" style={{ marginTop: '40px', justifyContent: 'center' }}>
            <Button variant="primary" size="large">
              Get Started
            </Button>
            <Button variant="secondary" size="large">
              Learn More
            </Button>
          </ButtonGroup>
        </div>

        <Layout>
          <Layout.Section>
            <div style={{ padding: '80px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <Heading as="h2" variant="heading2xl">
                  Our Services
                </Heading>
                <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                  Comprehensive solutions tailored to your business needs
                </Text>
              </div>

              <Grid columns={{ xs: 1, md: 3 }} gap="500">
                {services.map((service, index) => (
                  <Card key={index} sectioned>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                      <div style={{ className="icon-3xl", marginBottom: '16px' }}>
                        {service.icon}
                      </div>
                      <Heading as="h3" variant="headingLg">
                        {service.title}
                      </Heading>
                    </div>

                    <Text variant="bodyMd" alignment="center" style={{ marginBottom: '24px' }}>
                      {service.description}
                    </Text>

                    <div style={{ borderTop: '1px solid #e1e3e5', paddingTop: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {service.features.map((feature, featureIndex) => (
                          <div key={featureIndex} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Badge tone="success">✓</Badge>
                            <Text variant="bodySm">{feature}</Text>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '80px 0', margin: '0 -40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <Heading as="h2" variant="heading2xl">
                  Why Choose Us
                </Heading>
                <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                  The numbers speak for themselves
                </Text>
              </div>

              <Grid columns={{ xs: 2, sm: 4 }} gap="400">
                {stats.map((stat, index) => (
                  <Card key={index} padding="500">
                    <div style={{ textAlign: 'center' }}>
                      <Heading as="div" variant="heading3xl">
                        {stat.number}
                      </Heading>
                      <Text variant="bodySm" tone="subdued">
                        {stat.label}
                      </Text>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>

            <div style={{ padding: '80px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <Heading as="h2" variant="heading2xl">
                  Meet Our Team
                </Heading>
                <Text variant="bodyLg" as="p" style={{ marginTop: '16px' }}>
                  The experts behind your success
                </Text>
              </div>

              <Grid columns={{ xs: 2, sm: 4 }} gap="400">
                {teamMembers.map((member, index) => (
                  <Card key={index} padding="400">
                    <div style={{ textAlign: 'center' }}>
                      <Avatar size="large" initials={member.initials} style={{ marginBottom: '16px' }} />
                      <Heading as="h3" variant="headingMd">
                        {member.name}
                      </Heading>
                      <Text variant="bodySm" tone="subdued">
                        {member.role}
                      </Text>
                    </div>
                  </Card>
                ))}
              </Grid>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)',
              color: 'white',
              padding: '80px 40px',
              textAlign: 'center',
              borderRadius: '60px 60px 0 0',
              margin: '0 -40px'
            }}>
              <Heading as="h2" variant="heading2xl">
                Ready to Transform Your Business?
              </Heading>
              <Text variant="bodyLg" as="p" style={{ marginTop: '16px', opacity: 0.9 }}>
                Let's discuss how we can help you achieve your goals
              </Text>

              <div style={{ marginTop: '32px' }}>
                <Button variant="primary" size="large">
                  Schedule a Consultation
                </Button>
              </div>

              <InlineStack gap="300" style={{ marginTop: '16px', justifyContent: 'center' }}>
                <Badge>✓ Free consultation</Badge>
                <Badge>✓ No obligation</Badge>
                <Badge>✓ Custom solutions</Badge>
              </InlineStack>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};