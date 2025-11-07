import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState, Button, Card, InlineStack, BlockStack, Image } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Empty states are placeholder screens that appear when there\'s no data to display. They provide context and guide users toward next actions.',
      },
    },
    codeVariants: getCodeVariants('emptystate', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    heading: {
      control: 'text',
      description: 'Main heading text for the empty state',
    },
    action: {
      control: { type: 'object' },
      description: 'Primary action button configuration',
    },
    secondaryAction: {
      control: { type: 'object' },
      description: 'Secondary action button configuration',
    },
    image: {
      control: 'text',
      description: 'URL or path to the illustration image',
    },
    children: {
      control: 'text',
      description: 'Additional content or description text',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the empty state should take full width',
    },
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'No products found',
    action: {
      content: 'Add product',
      onAction: () => console.log('Add product clicked'),
    },
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const WithDescription: Story = {
  args: {
    heading: 'Manage your inventory',
    action: {
      content: 'Add products',
      onAction: () => console.log('Add products clicked'),
    },
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'Add products to your store to start selling and tracking inventory.',
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const WithSecondaryAction: Story = {
  args: {
    heading: 'No orders yet',
    action: {
      content: 'Create order',
      onAction: () => console.log('Create order clicked'),
    },
    secondaryAction: {
      content: 'Import orders',
      onAction: () => console.log('Import orders clicked'),
    },
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'Once you start making sales, you\'ll see your order history here.',
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const NoAction: Story = {
  args: {
    heading: 'All caught up!',
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'There are no tasks that need your attention right now.',
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const FullWidth: Story = {
  args: {
    heading: 'No data available',
    action: {
      content: 'Configure settings',
      onAction: () => console.log('Configure clicked'),
    },
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'Set up your preferences to start seeing data here.',
    fullWidth: true,
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const SearchResults: Story = {
  args: {
    heading: 'No results found',
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'Try checking your spelling or using more general terms',
    action: {
      content: 'Clear search',
      onAction: () => console.log('Clear search clicked'),
    },
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const ErrorState: Story = {
  args: {
    heading: 'Something went wrong',
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'There was an error loading your data. Please try again.',
    action: {
      content: 'Try again',
      onAction: () => console.log('Try again clicked'),
    },
    secondaryAction: {
      content: 'Contact support',
      onAction: () => console.log('Contact support clicked'),
    },
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const MaintenanceMode: Story = {
  args: {
    heading: 'Under maintenance',
    image: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png',
    children: 'This section is temporarily unavailable while we make improvements. Check back soon.',
    action: {
      content: 'Get notified',
      onAction: () => console.log('Get notified clicked'),
    },
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const OnboardingWelcome: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [completedSteps, setCompletedSteps] = React.useState<string[]>([]);

    const onboardingSteps = [
      {
        title: 'Welcome to your store',
        description: 'Let\'s get you set up with the essentials to start selling.',
        action: 'Add your first product',
        icon: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
      },
      {
        title: 'Configure payment settings',
        description: 'Set up how you want to receive payments from customers.',
        action: 'Set up payments',
        icon: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
      },
      {
        title: 'Customize your store',
        description: 'Make your store look unique with your branding.',
        action: 'Customize theme',
        icon: 'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png'
      }
    ];

    const handleAction = () => {
      const stepTitle = onboardingSteps[currentStep].title;
      setCompletedSteps([...completedSteps, stepTitle]);

      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(0);
      }
    };

    const currentStepData = onboardingSteps[currentStep];

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '32px' }}>
            <div style={{ marginBottom: '24px' }}>
              <BlockStack gap="400">
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h3 style={{ margin: 0 }}>Setup Progress</h3>
                  <span style={{ color: '#666' }}>
                    {completedSteps.length} of {onboardingSteps.length} completed
                  </span>
                </div>
                <div style={{
                  height: '4px',
                  backgroundColor: '#e1e3e5',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${(completedSteps.length / onboardingSteps.length) * 100}%`,
                    height: '100%',
                    backgroundColor: '#007ace',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </BlockStack>
            </div>

            <EmptyState
              heading={currentStepData.title}
              image={currentStepData.icon}
              action={{
                content: currentStepData.action,
                onAction: handleAction,
              }}
              secondaryAction={
                currentStep < onboardingSteps.length - 1 ? {
                  content: 'Skip this step',
                  onAction: () => setCurrentStep(currentStep + 1),
                } : undefined
              }
            >
              <BlockStack gap="200">
                <p style={{ margin: 0 }}>{currentStepData.description}</p>
                {completedSteps.length > 0 && (
                  <div>
                    <p style={{ margin: '8px 0', fontSize: "14px", color: '#666' }}>
                      Completed: {completedSteps.join(', ')}
                    </p>
                  </div>
                )}
              </BlockStack>
            </EmptyState>

            {completedSteps.length === onboardingSteps.length && (
              <div style={{
                marginTop: '24px',
                padding: '16px',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <p style={{ margin: 0, color: '#1e40af', fontWeight: '500' }}>
                  🎉 Congratulations! You\'ve completed the setup process.
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const DataImportFlow: Story = {
  render: () => {
    const [importStep, setImportStep] = React.useState<'idle' | 'preparing' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
    const [importProgress, setImportProgress] = React.useState(0);

    const simulateImport = () => {
      setImportStep('preparing');

      setTimeout(() => {
        setImportStep('uploading');
        setImportProgress(25);

        setTimeout(() => {
          setImportStep('processing');
          setImportProgress(75);

          setTimeout(() => {
            setImportStep('complete');
            setImportProgress(100);
          }, 2000);
        }, 1500);
      }, 1000);
    };

    const getImportContent = () => {
      switch (importStep) {
        case 'idle':
          return {
            heading: 'Import your products',
            description: 'Upload a CSV file with your product information to get started quickly.',
            action: 'Upload file',
            secondaryAction: 'Download template'
          };
        case 'preparing':
          return {
            heading: 'Preparing import...',
            description: 'We\'re getting your file ready for processing.',
            action: null,
            secondaryAction: null
          };
        case 'uploading':
          return {
            heading: 'Uploading your file...',
            description: `Progress: ${importProgress}%`,
            action: null,
            secondaryAction: 'Cancel upload'
          };
        case 'processing':
          return {
            heading: 'Processing your data...',
            description: `Analyzing and validating ${importProgress}% of your products`,
            action: null,
            secondaryAction: null
          };
        case 'complete':
          return {
            heading: 'Import completed successfully!',
            description: `All ${Math.floor(Math.random() * 100) + 10} products have been imported.`,
            action: 'View products',
            secondaryAction: 'Import more'
          };
        case 'error':
          return {
            heading: 'Import failed',
            description: 'There was an error processing your file. Please check the format and try again.',
            action: 'Try again',
            secondaryAction: 'Get help'
          };
        default:
          return {
            heading: 'Import your products',
            description: '',
            action: 'Upload file',
            secondaryAction: null
          };
      }
    };

    const content = getImportContent();

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <EmptyState
          heading={content.heading}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
          action={content.action ? {
            content: content.action,
            onAction: importStep === 'idle' ? simulateImport : () => setImportStep('idle'),
            disabled: ['preparing', 'uploading', 'processing'].includes(importStep)
          } : undefined}
          secondaryAction={content.secondaryAction ? {
            content: content.secondaryAction,
            onAction: () => {
              if (importStep === 'idle') {
                console.log('Download template clicked');
              } else if (importStep === 'uploading') {
                setImportStep('idle');
                setImportProgress(0);
              } else if (importStep === 'complete') {
                setImportStep('idle');
                setImportProgress(0);
              } else if (importStep === 'error') {
                setImportStep('idle');
                setImportProgress(0);
              }
            },
            destructive: importStep === 'uploading'
          } : undefined}
        >
          <BlockStack gap="300">
            <p style={{ margin: 0 }}>{content.description}</p>

            {['preparing', 'uploading', 'processing'].includes(importStep) && (
              <div style={{
                width: '100%',
                height: '4px',
                backgroundColor: '#e1e3e5',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${importProgress}%`,
                  height: '100%',
                  backgroundColor: '#007ace',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            )}

            {importStep === 'error' && (
              <div style={{
                padding: '12px',
                backgroundColor: '#fef2f2',
                borderRadius: '6px',
                border: '1px solid #fecaca'
              }}>
                <p style={{ margin: 0, color: '#991b1b', fontSize: "14px" }}>
                  <strong>Common issues:</strong><br/>
                  • Invalid file format<br/>
                  • Missing required columns<br/>
                  • Large file size (max 10MB)
                </p>
              </div>
            )}
          </BlockStack>
        </EmptyState>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const CollectionStates: Story = {
  render: () => {
    const emptyStates = [
      {
        title: 'Empty Collections',
        heading: 'No collections yet',
        description: 'Collections help you organize products and make them easier for customers to find.',
        action: 'Create collection',
        useCase: 'product organization'
      },
      {
        title: 'Empty Blog',
        heading: 'Start your blog',
        description: 'Share your story and connect with customers through engaging content.',
        action: 'Create blog post',
        useCase: 'content marketing'
      },
      {
        title: 'Empty Discounts',
        heading: 'No discounts active',
        description: 'Create discount codes to encourage sales and reward loyal customers.',
        action: 'Create discount',
        useCase: 'sales promotions'
      },
      {
        title: 'Empty Gift Cards',
        heading: 'No gift cards created',
        description: 'Sell gift cards to increase revenue and introduce new customers to your store.',
        action: 'Create gift card',
        useCase: 'gift card sales'
      }
    ];

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
        {emptyStates.map((state, index) => (
          <Card key={index}>
            <div style={{ padding: '24px' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>{state.title}</h4>
              <EmptyState
                heading={state.heading}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                action={{
                  content: state.action,
                  onAction: () => console.log(`${state.action} clicked for ${state.useCase}`),
                }}
              >
                <p style={{ margin: 0, fontSize: "14px" }}>{state.description}</p>
              </EmptyState>
            </div>
          </Card>
        ))}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};

export const MobileEmptyStates: Story = {
  render: () => {
    const mobileScenarios = [
      {
        heading: 'No internet connection',
        description: 'Please check your connection and try again.',
        action: 'Retry',
        context: 'offline'
      },
      {
        heading: 'Location access denied',
        description: 'Enable location services to find nearby stores.',
        action: 'Enable location',
        context: 'permissions'
      },
      {
        heading: 'Camera access required',
        description: 'Allow camera access to scan product barcodes.',
        action: 'Enable camera',
        context: 'permissions'
      }
    ];

    return (
      <div style={{ maxWidth: '400px', width: '100%' }}>
        <BlockStack gap="400">
          {mobileScenarios.map((scenario, index) => (
            <Card key={index}>
              <div style={{ padding: '20px' }}>
                <EmptyState
                  heading={scenario.heading}
                  image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                  action={{
                    content: scenario.action,
                    onAction: () => console.log(`${scenario.action} clicked - ${scenario.context}`),
                  }}
                  fullWidth
                >
                  <p style={{ margin: 0, fontSize: "14px", textAlign: 'center' }}>
                    {scenario.description}
                  </p>
                </EmptyState>
              </div>
            </Card>
          ))}
        </BlockStack>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('emptystate', 'default'),
  },

};