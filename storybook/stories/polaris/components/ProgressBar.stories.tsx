import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar, Card, Button, Text } from '@shopify/polaris';
import React, { useState, useEffect } from 'react';

const meta = {
  title: 'Polaris/Feedback/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Progress bars show the completion status of a task or process. They provide visual feedback for operations that take time to complete.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    progress: {
      control: 'number',
      min: 0,
      max: 100,
      description: 'Progress value between 0 and 100',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Progress bar size',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'critical'],
      description: 'Progress bar color theme',
    },
    animated: {
      control: 'boolean',
      description: 'Enable smooth animation',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    progress: 65,
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">Small Progress</Text>
        <ProgressBar progress={75} size="small" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Medium Progress</Text>
        <ProgressBar progress={75} size="medium" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Large Progress</Text>
        <ProgressBar progress={75} size="large" />
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">Primary (Default)</Text>
        <ProgressBar progress={60} color="primary" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Success</Text>
        <ProgressBar progress={60} color="success" />
      </div>

      <div>
        <Text as="p" variant="bodySm">Critical</Text>
        <ProgressBar progress={60} color="critical" />
      </div>
    </div>
  ),
};

export const ProgressValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px' }}>
      <div>
        <Text as="p" variant="bodySm">0% - Not Started</Text>
        <ProgressBar progress={0} />
      </div>

      <div>
        <Text as="p" variant="bodySm">25% - Just Started</Text>
        <ProgressBar progress={25} />
      </div>

      <div>
        <Text as="p" variant="bodySm">50% - Halfway</Text>
        <ProgressBar progress={50} />
      </div>

      <div>
        <Text as="p" variant="bodySm">75% - Almost Done</Text>
        <ProgressBar progress={75} />
      </div>

      <div>
        <Text as="p" variant="bodySm">100% - Complete</Text>
        <ProgressBar progress={100} color="success" />
      </div>
    </div>
  ),
};

export const InteractiveProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const startProgress = () => {
      setProgress(0);
      setIsAnimating(true);
    };

    const resetProgress = () => {
      setProgress(0);
      setIsAnimating(false);
    };

    useEffect(() => {
      if (isAnimating && progress < 100) {
        const timer = setTimeout(() => {
          setProgress(prev => Math.min(prev + 2, 100));
        }, 50);
        return () => clearTimeout(timer);
      } else if (progress >= 100) {
        setIsAnimating(false);
      }
    }, [progress, isAnimating]);

    return (
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <Text as="h3" variant="headingMd">Interactive Progress Demo</Text>
            <Text as="p" variant="bodySm">
              Progress: {progress}% {progress === 100 && '✅ Complete!'}
            </Text>
          </div>

          <ProgressBar
            progress={progress}
            size="large"
            color={progress === 100 ? 'success' : 'primary'}
            animated={isAnimating}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={startProgress}
              disabled={isAnimating}
            >
              {isAnimating ? 'In Progress...' : 'Start Progress'}
            </Button>
            <Button onClick={resetProgress} variant="plain">
              Reset
            </Button>
          </div>
        </div>
      </Card>
    );
  },
};

export const FileUpload: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const simulateUpload = async () => {
      setIsUploading(true);
      setUploadProgress(0);
      setUploadComplete(false);

      for (let i = 0; i <= 100; i += 5) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setUploadProgress(i);
      }

      setIsUploading(false);
      setUploadComplete(true);

      setTimeout(() => {
        setUploadProgress(0);
        setUploadComplete(false);
      }, 3000);
    };

    return (
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <Text as="h3" variant="headingMd">File Upload</Text>
            <Text as="p" variant="bodySm">
              Upload your product images to the server
            </Text>
          </div>

          <ProgressBar
            progress={uploadProgress}
            size="medium"
            color={uploadComplete ? 'success' : isUploading ? 'primary' : 'critical'}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text as="span" variant="bodySm">
              {uploadComplete
                ? '✅ Upload complete!'
                : isUploading
                ? `Uploading... ${uploadProgress}%`
                : 'No file selected'
              }
            </Text>

            <Button
              onClick={simulateUpload}
              disabled={isUploading}
              size="small"
            >
              {isUploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </div>
        </div>
      </Card>
    );
  },
};

export const MultiStepProcess: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      { name: 'Setup', icon: '⚙️' },
      { name: 'Configuration', icon: '🔧' },
      { name: 'Validation', icon: '✅' },
      { name: 'Deployment', icon: '🚀' },
    ];

    const nextStep = () => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    };

    const prevStep = () => {
      if (currentStep > 0) {
        setCurrentStep(prev => prev - 1);
      }
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
          <div>
            <Text as="h3" variant="headingMd">Setup Wizard</Text>
            <Text as="p" variant="bodySm">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].name}
            </Text>
          </div>

          <ProgressBar
            progress={progress}
            size="large"
            color={progress === 100 ? 'success' : 'primary'}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            {steps.map((step, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  opacity: index <= currentStep ? 1 : 0.5
                }}
              >
                <div style={{
                  fontSize: '24px',
                }}>
                  {step.icon}
                </div>
                <Text variant="bodySm" alignment="center">
                  {step.name}
                </Text>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={prevStep} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              variant={currentStep === steps.length - 1 ? 'primary' : 'secondary'}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </Button>
          </div>
        </div>
      </Card>
    );
  },
};

export const DataSync: Story = {
  render: () => {
    const [syncProgress, setSyncProgress] = useState(0);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

    const simulateSync = async () => {
      setIsSyncing(true);
      setSyncStatus('syncing');
      setSyncProgress(0);

      try {
        for (let i = 0; i <= 100; i += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          setSyncProgress(i);
        }
        setSyncStatus('success');
      } catch (error) {
        setSyncStatus('error');
      } finally {
        setIsSyncing(false);
        setTimeout(() => {
          setSyncProgress(0);
          setSyncStatus('idle');
        }, 3000);
      }
    };

    return (
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div>
            <Text as="h3" variant="headingMd">Data Synchronization</Text>
            <Text as="p" variant="bodySm">
              Sync your local data with the cloud server
            </Text>
          </div>

          <ProgressBar
            progress={syncProgress}
            size="medium"
            color={
              syncStatus === 'success' ? 'success' :
              syncStatus === 'error' ? 'critical' : 'primary'
            }
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text as="span" variant="bodySm">
              {syncStatus === 'success' && '✅ Sync completed successfully'}
              {syncStatus === 'error' && '❌ Sync failed'}
              {syncStatus === 'syncing' && `Syncing data... ${syncProgress}%`}
              {syncStatus === 'idle' && 'Ready to sync'}
            </Text>

            <Button
              onClick={simulateSync}
              disabled={isSyncing}
              size="small"
            >
              {isSyncing ? 'Syncing...' : 'Start Sync'}
            </Button>
          </div>
        </div>
      </Card>
    );
  },
};

export const RealWorldScenarios: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
      {/* Order Processing */}
      <Card>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Text as="h4" variant="headingSm">Order Processing</Text>
            <Text as="span" variant="bodySm">75%</Text>
          </div>
          <ProgressBar progress={75} size="small" color="primary" />
          <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
            Processing order #1001 - Payment verified, preparing shipment
          </Text>
        </div>
      </Card>

      {/* Backup Status */}
      <Card>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Text as="h4" variant="headingSm">System Backup</Text>
            <Text as="span" variant="bodySm">100%</Text>
          </div>
          <ProgressBar progress={100} size="small" color="success" />
          <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
            ✅ Backup completed successfully at 2:30 PM
          </Text>
        </div>
      </Card>

      {/* Storage Usage */}
      <Card>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Text as="h4" variant="headingSm">Storage Usage</Text>
            <Text as="span" variant="bodySm">87%</Text>
          </div>
          <ProgressBar progress={87} size="small" color="critical" />
          <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
            ⚠️ 8.7 GB of 10 GB used - Consider upgrading storage plan
          </Text>
        </div>
      </Card>

      {/* Import Progress */}
      <Card>
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <Text as="h4" variant="headingSm">Product Import</Text>
            <Text as="span" variant="bodySm">42%</Text>
          </div>
          <ProgressBar progress={42} size="small" color="primary" />
          <Text as="p" variant="bodySm" style={{ marginTop: '8px' }}>
            Importing 250 products... 105 completed
          </Text>
        </div>
      </Card>
    </div>
  ),
};