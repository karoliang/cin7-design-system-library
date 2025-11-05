import type { Meta, StoryObj } from '@storybook/react';
import { FormLayout, TextField, Select, Checkbox, Button, Card, BlockStack, InlineStack, Text } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Forms/FormLayout',
  component: FormLayout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'FormLayout provides a structured way to organize form fields with consistent spacing and responsive behavior. It supports different groupings, helps with form sectioning, and ensures proper alignment of form elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'object',
      description: 'Form fields and elements to layout',
    },
  },
} satisfies Meta<typeof FormLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card padding="400">
      <FormLayout>
        <TextField label="Full name" placeholder="Enter your full name" />
        <TextField label="Email address" type="email" placeholder="john.doe@example.com" />
        <TextField label="Message" multiline={3} placeholder="Enter your message..." />
      </FormLayout>
    </Card>
  ),
};

export const GroupedFields: Story = {
  render: () => (
    <Card padding="400">
      <FormLayout>
        <FormLayout.Group>
          <TextField label="First name" placeholder="John" />
          <TextField label="Last name" placeholder="Doe" />
        </FormLayout.Group>
        <TextField label="Email address" type="email" placeholder="john.doe@example.com" />
        <FormLayout.Group>
          <TextField label="City" placeholder="New York" />
          <Select
            label="State"
            options={[
              {label: 'Select state', value: ''},
              {label: 'California', value: 'ca'},
              {label: 'New York', value: 'ny'},
              {label: 'Texas', value: 'tx'},
            ]}
          />
        </FormLayout.Group>
        <TextField label="Address" placeholder="123 Main St" />
      </FormLayout>
    </Card>
  ),
};

export const ThreeColumnLayout: Story = {
  render: () => (
    <Card padding="400">
      <FormLayout>
        <Text as="h3" variant="headingMd">Contact Information</Text>
        <FormLayout.Group>
          <TextField label="First name" placeholder="John" />
          <TextField label="Middle name" placeholder="William" />
          <TextField label="Last name" placeholder="Doe" />
        </FormLayout.Group>
        <TextField label="Email address" type="email" placeholder="john.doe@example.com" />

        <Text as="h3" variant="headingMd">Location</Text>
        <FormLayout.Group>
          <TextField label="Street address" placeholder="123 Main St" />
          <TextField label="Apartment" placeholder="Apt 4B" />
          <TextField label="ZIP code" placeholder="10001" />
        </FormLayout.Group>
      </FormLayout>
    </Card>
  ),
};

export const ComplexForm: Story = {
  render: () => (
    <Card padding="400">
      <FormLayout>
        <Text as="h2" variant="headingLg">Customer Registration</Text>

        <Text as="h3" variant="headingMd">Personal Information</Text>
        <FormLayout.Group>
          <TextField label="First name" placeholder="John" required />
          <TextField label="Last name" placeholder="Doe" required />
        </FormLayout.Group>
        <TextField label="Email address" type="email" placeholder="john.doe@example.com" required />
        <TextField label="Phone number" type="tel" placeholder="(555) 123-4567" />

        <Text as="h3" variant="headingMd">Account Preferences</Text>
        <Select
          label="Account type"
          options={[
            {label: 'Select account type', value: ''},
            {label: 'Personal', value: 'personal'},
            {label: 'Business', value: 'business'},
            {label: 'Enterprise', value: 'enterprise'},
          ]}
          required
        />
        <Checkbox label="Send me promotional emails" />
        <Checkbox label="Enable two-factor authentication" />

        <Text as="h3" variant="headingMd">Address Information</Text>
        <TextField label="Street address" placeholder="123 Main St" />
        <FormLayout.Group>
          <TextField label="City" placeholder="New York" />
          <Select
            label="State"
            options={[
              {label: 'Select state', value: ''},
              {label: 'California', value: 'ca'},
              {label: 'New York', value: 'ny'},
              {label: 'Texas', value: 'tx'},
            ]}
          />
          <TextField label="ZIP code" placeholder="10001" />
        </FormLayout.Group>
      </FormLayout>
    </Card>
  ),
};

export const ProductForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      title: '',
      price: '',
      category: '',
      description: '',
      sku: '',
      weight: '',
      inventory: '',
      tags: '',
    });

    const handleInputChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Card padding="400">
        <FormLayout>
          <Text as="h2" variant="headingLg">Add New Product</Text>

          <Text as="h3" variant="headingMd">Basic Information</Text>
          <TextField
            label="Product title"
            value={formData.title}
            onChange={(value) => handleInputChange('title', value)}
            placeholder="Enter product name"
            required
          />
          <FormLayout.Group>
            <TextField
              label="Price"
              type="number"
              value={formData.price}
              onChange={(value) => handleInputChange('price', value)}
              placeholder="0.00"
              prefix="$"
              step="0.01"
              required
            />
            <Select
              label="Category"
              options={[
                {label: 'Select category', value: ''},
                {label: 'Electronics', value: 'electronics'},
                {label: 'Clothing', value: 'clothing'},
                {label: 'Home & Garden', value: 'home'},
                {label: 'Sports', value: 'sports'},
              ]}
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />
          </FormLayout.Group>
          <TextField
            label="Description"
            multiline={4}
            value={formData.description}
            onChange={(value) => handleInputChange('description', value)}
            placeholder="Describe your product..."
            helpText="Include key features and benefits"
          />

          <Text as="h3" variant="headingMd">Inventory & Shipping</Text>
          <FormLayout.Group>
            <TextField
              label="SKU"
              value={formData.sku}
              onChange={(value) => handleInputChange('sku', value)}
              placeholder="PROD-001"
              helpText="Stock keeping unit"
            />
            <TextField
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(value) => handleInputChange('weight', value)}
              placeholder="0.0"
              step="0.1"
            />
            <TextField
              label="Inventory count"
              type="number"
              value={formData.inventory}
              onChange={(value) => handleInputChange('inventory', value)}
              placeholder="0"
              min={0}
            />
          </FormLayout.Group>

          <TextField
            label="Tags"
            value={formData.tags}
            onChange={(value) => handleInputChange('tags', value)}
            placeholder="new, trending, sale"
            helpText="Separate tags with commas"
          />

          <div style={{ paddingTop: '16px' }}>
            <Button variant="primary" size="large">Create Product</Button>
          </div>
        </FormLayout>
      </Card>
    );
  },
};

export const SettingsForm: Story = {
  render: () => (
    <Card padding="400">
      <FormLayout>
        <Text as="h2" variant="headingLg">Store Settings</Text>

        <Text as="h3" variant="headingMd">General Settings</Text>
        <TextField label="Store name" placeholder="My Awesome Store" />
        <TextField label="Store email" type="email" placeholder="contact@store.com" />
        <Select
          label="Time zone"
          options={[
            {label: 'Select time zone', value: ''},
            {label: 'Eastern Time (ET)', value: 'et'},
            {label: 'Central Time (CT)', value: 'ct'},
            {label: 'Mountain Time (MT)', value: 'mt'},
            {label: 'Pacific Time (PT)', value: 'pt'},
          ]}
        />

        <Text as="h3" variant="headingMd">Currency Settings</Text>
        <FormLayout.Group>
          <Select
            label="Currency"
            options={[
              {label: 'USD ($)', value: 'usd'},
              {label: 'EUR (€)', value: 'eur'},
              {label: 'GBP (£)', value: 'gbp'},
              {label: 'JPY (¥)', value: 'jpy'},
            ]}
          />
          <TextField label="Format" placeholder="${{amount}}" disabled />
        </FormLayout.Group>

        <Text as="h3" variant="headingMd">Notification Settings</Text>
        <Checkbox label="Email notifications for new orders" />
        <Checkbox label="Email notifications for customer inquiries" />
        <Checkbox label="SMS notifications for urgent issues" />
        <Checkbox label="Weekly sales reports" />

        <Text as="h3" variant="headingMd">Security Settings</Text>
        <FormLayout.Group>
          <Select
            label="Password strength"
            options={[
              {label: 'Medium', value: 'medium'},
              {label: 'Strong', value: 'strong'},
              {label: 'Very Strong', value: 'very-strong'},
            ]}
          />
          <Select
            label="Session timeout"
            options={[
              {label: '30 minutes', value: '30'},
              {label: '1 hour', value: '60'},
              {label: '4 hours', value: '240'},
              {label: '1 day', value: '1440'},
            ]}
          />
        </FormLayout.Group>

        <Checkbox label="Enable two-factor authentication for admin accounts" />

        <div style={{ paddingTop: '16px' }}>
          <InlineStack gap="200">
            <Button variant="primary">Save Settings</Button>
            <Button variant="plain">Cancel</Button>
          </InlineStack>
        </div>
      </FormLayout>
    </Card>
  ),
};

export const SurveyForm: Story = {
  render: () => {
    const [responses, setResponses] = React.useState({
      satisfaction: '',
      likelihood: '',
      features: '',
      improvements: '',
      contact: '',
      email: '',
    });

    const handleInputChange = (field: string, value: string) => {
      setResponses(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Card padding="400">
        <FormLayout>
          <Text as="h2" variant="headingLg">Customer Feedback Survey</Text>
          <Text as="p" tone="subdued">Your feedback helps us improve our service</Text>

          <Text as="h3" variant="headingMd">Overall Experience</Text>
          <Select
            label="How satisfied are you with our service?"
            options={[
              {label: 'Please select', value: ''},
              {label: 'Very Satisfied', value: 'very-satisfied'},
              {label: 'Satisfied', value: 'satisfied'},
              {label: 'Neutral', value: 'neutral'},
              {label: 'Dissatisfied', value: 'dissatisfied'},
              {label: 'Very Dissatisfied', value: 'very-dissatisfied'},
            ]}
            value={responses.satisfaction}
            onChange={(value) => handleInputChange('satisfaction', value)}
            required
          />

          <Select
            label="How likely are you to recommend us?"
            options={[
              {label: 'Please select', value: ''},
              {label: 'Definitely', value: 'definitely'},
              {label: 'Probably', value: 'probably'},
              {label: 'Not sure', value: 'not-sure'},
              {label: 'Probably not', value: 'probably-not'},
              {label: 'Definitely not', value: 'definitely-not'},
            ]}
            value={responses.likelihood}
            onChange={(value) => handleInputChange('likelihood', value)}
            required
          />

          <Text as="h3" variant="headingMd">Feature Feedback</Text>
          <TextField
            label="What features do you use most?"
            multiline={3}
            value={responses.features}
            onChange={(value) => handleInputChange('features', value)}
            placeholder="Tell us about your favorite features..."
          />

          <TextField
            label="What improvements would you like to see?"
            multiline={4}
            value={responses.improvements}
            onChange={(value) => handleInputChange('improvements', value)}
            placeholder="Share your ideas for improvements..."
          />

          <Text as="h3" variant="headingMd">Follow-up</Text>
          <Select
            label="Would you like us to follow up with you?"
            options={[
              {label: 'Please select', value: ''},
              {label: 'Yes, please contact me', value: 'yes'},
              {label: 'No, thank you', value: 'no'},
            ]}
            value={responses.contact}
            onChange={(value) => handleInputChange('contact', value)}
          />

          {responses.contact === 'yes' && (
            <TextField
              label="Email address"
              type="email"
              value={responses.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder="your.email@example.com"
              required
            />
          )}

          <div style={{ paddingTop: '16px' }}>
            <Button variant="primary" size="large">Submit Feedback</Button>
          </div>
        </FormLayout>
      </Card>
    );
  },
};

export const NestedFormLayout: Story = {
  render: () => (
    <Card padding="400">
      <FormLayout>
        <Text as="h2" variant="headingLg">Company Registration</Text>

        <Text as="h3" variant="headingMd">Company Details</Text>
        <FormLayout>
          <TextField label="Company name" placeholder="Acme Corporation" />
          <FormLayout.Group>
            <TextField label="Industry" placeholder="Technology" />
            <TextField label="Company size" placeholder="50-100 employees" />
          </FormLayout.Group>

          <Text as="h4" variant="headingSm">Address</Text>
          <FormLayout>
            <TextField label="Street address" placeholder="123 Business Ave" />
            <FormLayout.Group>
              <TextField label="City" placeholder="San Francisco" />
              <Select
                label="State"
                options={[
                  {label: 'Select state', value: ''},
                  {label: 'California', value: 'ca'},
                  {label: 'New York', value: 'ny'},
                ]}
              />
              <TextField label="ZIP code" placeholder="94105" />
            </FormLayout.Group>
          </FormLayout>
        </FormLayout>

        <Text as="h3" variant="headingMd">Contact Person</Text>
        <FormLayout>
          <FormLayout.Group>
            <TextField label="First name" placeholder="John" />
            <TextField label="Last name" placeholder="Doe" />
          </FormLayout.Group>
          <TextField label="Job title" placeholder="CEO" />
          <TextField label="Email address" type="email" placeholder="john@acme.com" />
          <TextField label="Phone number" type="tel" placeholder="(555) 123-4567" />
        </FormLayout>

        <Text as="h3" variant="headingMd">Billing Information</Text>
        <FormLayout>
          <Select
            label="Billing plan"
            options={[
              {label: 'Select plan', value: ''},
              {label: 'Basic ($29/month)', value: 'basic'},
              {label: 'Professional ($99/month)', value: 'professional'},
              {label: 'Enterprise (Custom)', value: 'enterprise'},
            ]}
          />
          <TextField label="Tax ID" placeholder="12-3456789" />
        </FormLayout>

        <div style={{ paddingTop: '16px' }}>
          <InlineStack gap="200">
            <Button variant="primary">Complete Registration</Button>
            <Button variant="plain">Save Draft</Button>
          </InlineStack>
        </div>
      </FormLayout>
    </Card>
  ),
};

export const ResponsiveLayout: Story = {
  render: () => (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <Card padding="400">
        <FormLayout>
          <Text as="h2" variant="headingLg">Responsive Form Layout</Text>
          <Text as="p" tone="subdued">This form adapts to different screen sizes</Text>

          <FormLayout.Group>
            <TextField label="Field 1" placeholder="First column" />
            <TextField label="Field 2" placeholder="Second column" />
            <TextField label="Field 3" placeholder="Third column" />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Wide field 1" placeholder="Responsive width" />
            <TextField label="Wide field 2" placeholder="Responsive width" />
          </FormLayout.Group>

          <TextField label="Full width field" placeholder="Spans entire width" />

          <FormLayout.Group>
            <Select
              label="Select 1"
              options={[
                {label: 'Option 1', value: '1'},
                {label: 'Option 2', value: '2'},
              ]}
            />
            <Select
              label="Select 2"
              options={[
                {label: 'Option A', value: 'a'},
                {label: 'Option B', value: 'b'},
              ]}
            />
            <Select
              label="Select 3"
              options={[
                {label: 'Choice X', value: 'x'},
                {label: 'Choice Y', value: 'y'},
              ]}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <TextField label="Email" type="email" placeholder="email@example.com" />
            <TextField label="Phone" type="tel" placeholder="(555) 123-4567" />
          </FormLayout.Group>

          <TextField label="Message" multiline={3} placeholder="Full-width message field" />
        </FormLayout>
      </Card>
    </div>
  ),
};