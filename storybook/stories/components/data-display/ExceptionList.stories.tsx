import type { Meta, StoryObj } from '@storybook/react';
import { ExceptionList, Card, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

const meta = {
  title: 'Polaris/Feedback/ExceptionList',
  component: ExceptionList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Exception lists display errors, warnings, or other important messages in a structured format. They help users identify and resolve issues with their data or actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of exception items to display',
    },
  },
} satisfies Meta<typeof ExceptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        status: 'critical',
        icon: 'AlertCircleIcon',
        title: 'Payment method declined',
        description: 'Your credit card ending in 4242 has expired. Please update your payment information.',
      },
      {
        status: 'warning',
        icon: 'AlertCircleIcon',
        title: 'Inventory running low',
        description: 'You have 5 items that are running low on stock. Consider restocking soon.',
      },
    ],
  },
};

export const ErrorList: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Order Processing Errors</Text>
        <Text as="p" variant="bodySm">
          The following issues need to be resolved before processing your order:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Invalid shipping address',
            description: 'The address provided is incomplete. Please add apartment/suite number.',
          },
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Payment method required',
            description: 'Please add a valid payment method to complete this order.',
          },
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Item out of stock',
            description: 'Premium Widget is currently out of stock and has been removed from your cart.',
          },
        ]}
      />
    </Card>
  ),
};

export const WarningList: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Store Health Warnings</Text>
        <Text as="p" variant="bodySm">
          Consider addressing these issues to improve your store performance:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Missing product descriptions',
            description: '12 products are missing descriptions. Add them to improve SEO.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Low product images quality',
            description: '8 products have low-quality images that may affect customer trust.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Slow page load times',
            description: 'Your homepage loads in 4.2 seconds. Optimize images and apps to improve speed.',
          },
        ]}
      />
    </Card>
  ),
};

export const MixedStatuses: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Data Import Results</Text>
        <Text as="p" variant="bodySm">
          Review the following messages from your recent data import:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Duplicate SKUs found',
            description: '3 products have duplicate SKUs. These were not imported.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Missing required fields',
            description: '5 products were missing prices and were set to $0.00 by default.',
          },
          {
            status: 'success',
            icon: 'CheckCircleIcon',
            title: 'Successfully imported',
            description: '245 products were successfully imported to your catalog.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Image processing errors',
            description: '7 product images failed to process and were skipped.',
          },
        ]}
      />
    </Card>
  ),
};

export const ValidationErrors: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Product Validation Errors</Text>
        <Text as="p" variant="bodySm">
          Please fix these issues before publishing your product:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Title is required',
            description: 'Every product must have a title before it can be published.',
          },
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Price must be greater than 0',
            description: 'Product price cannot be negative or zero.',
          },
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'At least one image required',
            description: 'Add at least one product image to help customers visualize your product.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'No product description',
            description: 'Adding a description can help with SEO and customer understanding.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'No product tags',
            description: 'Tags help customers find your products through search and filtering.',
          },
        ]}
      />
    </Card>
  ),
};

export const ShippingIssues: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Shipping Configuration Issues</Text>
        <Text as="p" variant="bodySm">
          The following shipping settings need attention:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'No shipping zones configured',
            description: 'You must set up at least one shipping zone to sell products.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'High shipping rates',
            description: 'Your shipping rates may be too high for some regions. Consider free shipping thresholds.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'No express shipping available',
            description: 'Customers may prefer faster shipping options for urgent orders.',
          },
        ]}
      />
    </Card>
  ),
};

export const InteractiveExceptionList: Story = {
  render: () => {
    const [resolvedIssues, setResolvedIssues] = useState<number[]>([]);
    const [allResolved, setAllResolved] = useState(false);

    const issues = [
      {
        id: 1,
        status: 'critical' as const,
        icon: 'AlertCircleIcon',
        title: 'Payment method expired',
        description: 'Your payment method expires next week. Update your billing information.',
      },
      {
        id: 2,
        status: 'warning' as const,
        icon: 'AlertCircleIcon',
        title: 'Storage almost full',
        description: 'You\'re using 85% of your storage capacity.',
      },
      {
        id: 3,
        status: 'warning' as const,
        icon: 'AlertCircleIcon',
        title: 'App updates available',
        description: '3 installed apps have updates available.',
      },
    ];

    const handleResolve = (issueId: number) => {
      setResolvedIssues(prev => [...prev, issueId]);
    };

    React.useEffect(() => {
      if (resolvedIssues.length === issues.length) {
        setAllResolved(true);
      }
    }, [resolvedIssues, issues.length]);

    if (allResolved) {
      return (
        <Card sectioned>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Text as="h3" variant="headingMd">✅ All issues resolved!</Text>
            <Text as="p" variant="bodyMd">
              Your store is in good health. Great job!
            </Text>
            <Button onClick={() => {
              setResolvedIssues([]);
              setAllResolved(false);
            }}>
              Reset issues
            </Button>
          </div>
        </Card>
      );
    }

    return (
      <Card sectioned>
        <div style={{ marginBottom: '16px' }}>
          <Text as="h3" variant="headingMd">Store Issues</Text>
          <Text as="p" variant="bodySm">
            {issues.length - resolvedIssues.length} issue(s) need your attention
          </Text>
        </div>
        <ExceptionList
          items={issues
            .filter(issue => !resolvedIssues.includes(issue.id))
            .map(issue => ({
              ...issue,
              action: {
                content: 'Fix issue',
                onAction: () => handleResolve(issue.id),
              },
            }))}
        />
      </Card>
    );
  },
};

export const SystemAlerts: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">System Alerts</Text>
        <Text as="p" variant="bodySm">
          Monitor these system notifications for optimal performance:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Database connection failed',
            description: 'Unable to connect to the database. Please check your connection settings.',
          },
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'SSL certificate expires in 7 days',
            description: 'Your SSL certificate will expire soon. Renew it to maintain secure connections.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'High memory usage',
            description: 'Memory usage is at 78%. Consider optimizing your applications.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Backup failed',
            description: 'Last backup failed 2 hours ago. Check your backup configuration.',
          },
        ]}
      />
    </Card>
  ),
};

export const CustomerFeedback: Story = {
  render: () => (
    <Card sectioned>
      <div style={{ marginBottom: '16px' }}>
        <Text as="h3" variant="headingMd">Recent Customer Feedback</Text>
        <Text as="p" variant="bodySm">
          Review and respond to customer issues:
        </Text>
      </div>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Delivery delay reported',
            description: 'Customer #12345 reports order #1001 is 3 days late. Check tracking information.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Wrong item received',
            description: 'Customer #67890 received wrong product. Arrange exchange or refund.',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Product damaged in transit',
            description: 'Customer #54321 reports damaged packaging. File insurance claim.',
          },
          {
            status: 'success',
            icon: 'CheckCircleIcon',
            title: 'Issue resolved',
            description: 'Customer #98765 is satisfied with resolution. Close ticket.',
          },
        ]}
      />
    </Card>
  ),
};

export const MinimalList: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <ExceptionList
        items={[
          {
            status: 'critical',
            icon: 'AlertCircleIcon',
            title: 'Action required',
          },
          {
            status: 'warning',
            icon: 'AlertCircleIcon',
            title: 'Review recommended',
          },
        ]}
      />
    </div>
  ),
};