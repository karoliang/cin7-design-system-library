import type { Meta, StoryObj } from '@storybook/react';
import { FooterHelp, Button, Card, InlineStack, BlockStack, Text, Icon } from '@shopify/polaris';
import { QuestionCircleIcon, InfoIcon, ExternalIcon } from '@shopify/polaris-icons';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Layout/FooterHelp',
  component: FooterHelp,
  parameters: {
    layout: 'centered',
    codeVariants: getCodeVariants('footerhelp', 'default'),
    docs: {
      description: {
        component: 'FooterHelp displays contextual help text at the bottom of a page or section. It\'s useful for providing additional guidance, links to documentation, or support information.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Help text content',
    },
    learnMore: {
      control: { type: 'object' },
      description: 'Learn more link configuration',
    },
  },
} satisfies Meta<typeof FooterHelp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Need help? Our support team is available 24/7 to assist you with any questions.',
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'default'),
  },

};

export const WithLearnMore: Story = {
  args: {
    children: 'Learn more about how to optimize your store performance with our comprehensive guide.',
    learnMore: {
      url: 'https://help.shopify.com',
      content: 'View optimization guide',
    },
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'withLearnMore'),
  },

};

export const ShortText: Story = {
  args: {
    children: 'Press "?" for keyboard shortcuts.',
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'shortText'),
  },

};

export const LongText: Story = {
  args: {
    children: 'This section allows you to configure your store\'s basic settings including name, currency, and timezone. These settings affect how your store displays prices and dates to customers. Make sure to review these settings carefully as they impact your entire store operation.',
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'longText'),
  },

};

export const WithIcon: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Store Settings</h3>
            <Text as="p">Configure your basic store information and preferences.</Text>
          </div>
        </div>
        <FooterHelp>
          <InlineStack gap="200" align="center">
            <Icon source={QuestionCircleIcon} tone="base" />
            <Text as="span">Need help configuring your store? Check our setup guide for step-by-step instructions.</Text>
          </InlineStack>
        </FooterHelp>
      </Card>
    </div>
  ),
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'withIcon'),
  },

};

export const DocumentationLinks: Story = {
  render: () => {
    const helpSections = [
      {
        title: 'Product Management',
        content: 'Learn how to add, edit, and organize your products effectively.',
        learnMore: {
          url: '#',
          content: 'Product documentation',
        }
      },
      {
        title: 'Order Processing',
        content: 'Understand the complete order fulfillment workflow from checkout to delivery.',
        learnMore: {
          url: '#',
          content: 'Order processing guide',
        }
      },
      {
        title: 'Customer Management',
        content: 'Manage customer accounts, groups, and communication preferences.',
        learnMore: {
          url: '#',
          content: 'Customer guide',
        }
      }
    ];

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <BlockStack gap="400">
          {helpSections.map((section, index) => (
            <Card key={index}>
              <div style={{ padding: '24px' }}>
                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: '0 0 16px 0' }}>{section.title}</h3>
                    <Text as="p">Placeholder content for {section.title.toLowerCase()}</Text>
                  </div>
                </div>
                <FooterHelp learnMore={section.learnMore}>
                  {section.content}
                </FooterHelp>
              </div>
            </Card>
          ))}
        </BlockStack>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'documentationLinks'),
  },

};

export const InteractiveHelp: Story = {
  render: () => {
    const [helpTopic, setHelpTopic] = React.useState('general');
    const [showMoreInfo, setShowMoreInfo] = React.useState(false);

    const helpContent = {
      general: {
        text: 'Get help with basic store setup and navigation.',
        link: 'Getting started guide',
        icon: QuestionMarkIcon
      },
      billing: {
        text: 'Questions about your subscription, invoices, or payment methods?',
        link: 'Billing documentation',
        icon: InfoIcon
      },
      technical: {
        text: 'Need technical assistance with API integrations or custom code?',
        link: 'Developer resources',
        icon: ExternalIcon
      }
    };

    const currentHelp = helpContent[helpTopic as keyof typeof helpContent];

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ margin: '0 0 16px 0' }}>Help Center</h3>
              <InlineStack gap="200">
                {Object.keys(helpContent).map((topic) => (
                  <Button
                    key={topic}
                    size="small"
                    variant={helpTopic === topic ? 'primary' : 'plain'}
                    onClick={() => setHelpTopic(topic)}
                  >
                    {topic.charAt(0).toUpperCase() + topic.slice(1)}
                  </Button>
                ))}
              </InlineStack>
            </div>

            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 12px 0' }}>
                  {helpTopic.charAt(0).toUpperCase() + helpTopic.slice(1)} Help
                </h4>
                <Text as="p">
                  Select a help topic to see relevant information and resources.
                </Text>
              </div>
            </div>

            <FooterHelp
              learnMore={{
                url: '#',
                content: currentHelp.link,
                onAction: () => setShowMoreInfo(!showMoreInfo),
              }}
            >
              <InlineStack gap="200" align="center">
                <Icon source={currentHelp.icon} tone="base" />
                <Text as="span">{currentHelp.text}</Text>
              </InlineStack>
            </FooterHelp>

            {showMoreInfo && (
              <div style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e1e3e5'
              }}>
                <Text variant="bodySm" as="p">
                  Additional resources for {helpTopic} help are available in our documentation center.
                </Text>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'interactiveHelp'),
  },

};

export const FormContextHelp: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Tax Configuration</h3>
                <Text as="p">Configure how taxes are calculated and displayed for your store.</Text>
              </div>

              <div style={{ height: '300px', backgroundColor: '#f8f9fa', borderRadius: '6px', padding: '16px' }}>
                <Text as="p" tone="subdued">Form fields would go here...</Text>
              </div>

              <FooterHelp
                learnMore={{
                  url: '#',
                  content: 'Tax configuration guide',
                }}
              >
                <BlockStack gap="100">
                  <Text as="span">
                    Tax rules vary by location and product type. Consult with a tax professional for specific guidance.
                  </Text>
                  <Text as="span" variant="bodySm" tone="subdued">
                    Last updated: November 2024
                  </Text>
                </BlockStack>
              </FooterHelp>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'formContextHelp'),
  },

};

export const SupportCenter: Story = {
  render: () => {
    const [selectedChannel, setSelectedChannel] = React.useState('chat');

    const supportChannels = {
      chat: {
        name: 'Live Chat',
        description: 'Chat with our support team instantly',
        availability: 'Available 24/7',
        responseTime: 'Usually responds in < 2 minutes'
      },
      email: {
        name: 'Email Support',
        description: 'Send us detailed questions about your store',
        availability: 'Response within 24 hours',
        responseTime: 'Usually responds in < 4 hours'
      },
      phone: {
        name: 'Phone Support',
        description: 'Speak directly with our support specialists',
        availability: 'Mon-Fri, 9AM-6PM EST',
        responseTime: 'Wait time: < 5 minutes'
      }
    };

    const currentChannel = supportChannels[selectedChannel as keyof typeof supportChannels];

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Contact Support</h3>
                <Text as="p">Get help from our expert support team through multiple channels.</Text>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: "14px" }}>Choose support channel:</h4>
                <InlineStack gap="200" wrap>
                  {Object.keys(supportChannels).map((channel) => (
                    <Button
                      key={channel}
                      size="small"
                      variant={selectedChannel === channel ? 'primary' : 'secondary'}
                      onClick={() => setSelectedChannel(channel)}
                    >
                      {supportChannels[channel as keyof typeof supportChannels].name}
                    </Button>
                  ))}
                </InlineStack>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <BlockStack gap="200">
                  <h4 style={{ margin: 0 }}>{currentChannel.name}</h4>
                  <Text as="p">{currentChannel.description}</Text>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <Text variant="bodySm" as="span">
                      <strong>Availability:</strong> {currentChannel.availability}
                    </Text>
                    <Text variant="bodySm" as="span">
                      <strong>Response:</strong> {currentChannel.responseTime}
                    </Text>
                  </div>
                </BlockStack>
              </div>

              <FooterHelp
                learnMore={{
                  url: '#',
                  content: 'View all support options',
                }}
              >
                <Text as="span">
                  Can't find what you're looking for? Browse our comprehensive help center for answers to common questions.
                </Text>
              </FooterHelp>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'supportCenter'),
  },

};

export const LearningResources: Story = {
  render: () => {
    const learningPaths = [
      {
        title: 'Getting Started',
        description: 'New to our platform? Start here with the basics.',
        topics: ['Store setup', 'Product management', 'Basic customization'],
        duration: '30 minutes'
      },
      {
        title: 'Marketing & Sales',
        description: 'Learn how to promote your products and increase sales.',
        topics: ['Email marketing', 'Social media', 'SEO basics'],
        duration: '45 minutes'
      },
      {
        title: 'Advanced Features',
        description: 'Master advanced tools and integrations.',
        topics: ['API usage', 'Custom themes', 'Advanced analytics'],
        duration: '60 minutes'
      }
    ];

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <BlockStack gap="400">
          <div>
            <h3 style={{ margin: '0 0 16px 0' }}>Learning Center</h3>
            <Text as="p">Expand your knowledge with our structured learning paths.</Text>
          </div>

          {learningPaths.map((path, index) => (
            <Card key={index}>
              <div style={{ padding: '20px' }}>
                <BlockStack gap="300">
                  <div>
                    <h4 style={{ margin: '0 0 8px 0' }}>{path.title}</h4>
                    <Text as="p">{path.description}</Text>
                  </div>

                  <div>
                    <Text variant="bodySm" as="p" tone="subdued">
                      <strong>Topics:</strong> {path.topics.join(', ')}
                    </Text>
                    <Text variant="bodySm" as="p" tone="subdued">
                      <strong>Duration:</strong> {path.duration}
                    </Text>
                  </div>

                  <FooterHelp
                    learnMore={{
                      url: '#',
                      content: `Start ${path.title.toLowerCase()} learning path`,
                    }}
                  >
                    <Text as="span">
                      Follow this structured path to master {path.title.toLowerCase()} at your own pace.
                    </Text>
                  </FooterHelp>
                </BlockStack>
              </div>
            </Card>
          ))}
        </BlockStack>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'learningResources'),
  },

};

export const ContextualHelp: Story = {
  render: () => {
    const [activeSection, setActiveSection] = React.useState('shipping');

    const contextualHelp = {
      shipping: {
        title: 'Shipping Settings',
        content: 'Configure shipping zones, rates, and delivery options for your customers.',
        help: 'Set up shipping zones based on geographic regions and define rates for each zone.',
        resources: ['Shipping zones guide', 'Rate calculation', 'Carrier integrations']
      },
      payments: {
        title: 'Payment Settings',
        content: 'Manage payment methods and payment gateway configurations.',
        help: 'Enable various payment methods and configure secure payment processing.',
        resources: ['Payment gateway setup', 'Security requirements', 'Currency support']
      },
      taxes: {
        title: 'Tax Configuration',
        content: 'Set up tax rules and rates for different regions and product types.',
        help: 'Configure tax collection based on your business location and customer locations.',
        resources: ['Tax basics', 'Regional requirements', 'Automated tax calculation']
      }
    };

    const currentHelp = contextualHelp[activeSection as keyof typeof contextualHelp];

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Store Configuration</h3>
                <Text as="p">Manage your store settings and preferences.</Text>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: "14px" }}>Configuration area:</h4>
                <InlineStack gap="200" wrap>
                  {Object.keys(contextualHelp).map((section) => (
                    <Button
                      key={section}
                      size="small"
                      variant={activeSection === section ? 'primary' : 'plain'}
                      onClick={() => setActiveSection(section)}
                    >
                      {contextualHelp[section as keyof typeof contextualHelp].title}
                    </Button>
                  ))}
                </InlineStack>
              </div>

              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 12px 0' }}>{currentHelp.title}</h4>
                  <Text as="p">{currentHelp.content}</Text>
                </div>
              </div>

              <FooterHelp
                learnMore={{
                  url: '#',
                  content: 'View configuration guide',
                }}
              >
                <BlockStack gap="200">
                  <Text as="span">{currentHelp.help}</Text>
                  <Text variant="bodySm" as="p" tone="subdued">
                    <strong>Related resources:</strong> {currentHelp.resources.join(', ')}
                  </Text>
                </BlockStack>
              </FooterHelp>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'contextualHelp'),
  },

};

export const MobileOptimized: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <Card>
          <div style={{ padding: '16px' }}>
            <BlockStack gap="300">
              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: "18px" }}>Quick Setup</h3>
                <Text as="p" variant="bodySm">Complete your store setup in minutes.</Text>
              </div>

              <div style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text as="p" variant="bodySm" tone="subdued">Setup form content</Text>
              </div>

              <FooterHelp
                learnMore={{
                  url: '#',
                  content: 'Full setup guide',
                }}
              >
                <Text as="span" variant="bodySm">
                  Need assistance? Our mobile-friendly guides are here to help.
                </Text>
              </FooterHelp>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('footerhelp', 'mobileOptimized'),
  },

};