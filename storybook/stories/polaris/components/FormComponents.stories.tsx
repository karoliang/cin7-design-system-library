import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  FormLayout,
  TextField,
  Select,
  Checkbox,
  RadioButton,
  Button,
  ButtonGroup,
  Text,
  InlineStack,
  BlockStack,
  Grid,
  Divider,
  Banner,
  Modal,
  Popover,
  ActionList,
  DropZone,
  ProgressBar,
  Tag,
  Badge,
  DatePicker,
  RangeSlider,
  ColorPicker,
  ChoiceList,
  Autocomplete,
  Combobox,
  TextContainer,
  Tooltip,
  Icon,
  InlineError,
  CalloutCard,
} from '@shopify/polaris';
import {
  ChevronDownMinor,
  ChevronUpMinor,
  PlusMinor,
  MinusMinor,
  DeleteMinor,
  UploadMajor,
  AlertMinor,
  InfoMinor,
  CheckmarkMinor,
  XMarkMinor,
  EditMinor,
  ViewMinor,
  SaveMinor,
  QuestionMarkMinor,
  SearchMinor,
  CalendarMajor,
  TickMinor,
} from '@shopify/polaris-icons';
import React, { useState, useCallback, useMemo } from 'react';

const meta = {
  title: 'Business Components/Form Components',
  component: FormLayout,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Advanced form components for enterprise applications. Features multi-step forms with validation, dynamic form fields, conditional logic, file upload with progress tracking, auto-save functionality, and comprehensive accessibility support.',
      },
    },
  },
  tags: ['autodocs', 'business', 'forms', 'validation'],
  argTypes: {
    showValidation: {
      control: 'boolean',
      description: 'Enable real-time validation with error messages',
    },
    enableAutoSave: {
      control: 'boolean',
      description: 'Show auto-save draft functionality',
    },
    showConditionalFields: {
      control: 'boolean',
      description: 'Display conditional field logic based on selections',
    },
  },
} satisfies Meta<typeof FormLayout>;

export default meta;
type Story = StoryObj<typeof FormLayout>;

// Multi-Step Form with Progress Tracking
const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: new Date(),

    // Step 2: Address Information
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',

    // Step 3: Preferences
    newsletter: false,
    notifications: 'email',
    privacy: false,
    terms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const steps = [
    { title: 'Personal Info', description: 'Your basic information' },
    { title: 'Address', description: 'Where you live' },
    { title: 'Preferences', description: 'Communication preferences' },
  ];

  const validateStep = (stepIndex: number) => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    }

    if (stepIndex === 1) {
      if (!formData.street.trim()) newErrors.street = 'Street address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.state.trim()) newErrors.state = 'State is required';
      if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
      if (!formData.country.trim()) newErrors.country = 'Country is required';
    }

    if (stepIndex === 2) {
      if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <Card>
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <Text variant="headingXl" as="h1" alignment="center">Multi-Step Registration</Text>

        {/* Progress Indicator */}
        <div style={{ margin: '32px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            {steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: index <= currentStep ? '#202223' : '#e1e1e1',
                    color: index <= currentStep ? 'white' : '#6d7175',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: "var(--font-size-sm)",
                    fontWeight: '500'
                  }}
                >
                  {index < currentStep ? '✓' : index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <Text variant="bodySm" fontWeight={index === currentStep ? 'semibold' : 'regular'}>
                    {step.title}
                  </Text>
                  <Text variant="bodySm" tone="subdued">{step.description}</Text>
                </div>
                {index < steps.length - 1 && (
                  <div style={{
                    width: '40px',
                    height: '2px',
                    backgroundColor: index < currentStep ? '#202223' : '#e1e1e1',
                    marginLeft: '16px'
                  }} />
                )}
              </div>
            ))}
          </div>
          <ProgressBar progress={((currentStep + 1) / steps.length) * 100} size="small" />
        </div>

        {/* Form Content */}
        <FormLayout>
          {currentStep === 0 && (
            <>
              <Text variant="headingMd" as="h2">Personal Information</Text>
              <FormLayout.Group>
                <TextField
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => handleFieldChange('firstName', value)}
                  error={touched.firstName && errors.firstName}
                  required
                />
                <TextField
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => handleFieldChange('lastName', value)}
                  error={touched.lastName && errors.lastName}
                  required
                />
              </FormLayout.Group>
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleFieldChange('email', value)}
                error={touched.email && errors.email}
                required
                autoComplete="email"
              />
              <TextField
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleFieldChange('phone', value)}
                error={touched.phone && errors.phone}
                required
                autoComplete="tel"
              />
              <DatePicker
                label="Date of Birth"
                selected={formData.dateOfBirth}
                onChange={(date) => handleFieldChange('dateOfBirth', date)}
              />
            </>
          )}

          {currentStep === 1 && (
            <>
              <Text variant="headingMd" as="h2">Address Information</Text>
              <TextField
                label="Street Address"
                value={formData.street}
                onChange={(value) => handleFieldChange('street', value)}
                error={touched.street && errors.street}
                required
                autoComplete="street-address"
              />
              <FormLayout.Group>
                <TextField
                  label="City"
                  value={formData.city}
                  onChange={(value) => handleFieldChange('city', value)}
                  error={touched.city && errors.city}
                  required
                  autoComplete="address-level2"
                />
                <TextField
                  label="State/Province"
                  value={formData.state}
                  onChange={(value) => handleFieldChange('state', value)}
                  error={touched.state && errors.state}
                  required
                  autoComplete="address-level1"
                />
              </FormLayout.Group>
              <FormLayout.Group>
                <TextField
                  label="ZIP/Postal Code"
                  value={formData.zipCode}
                  onChange={(value) => handleFieldChange('zipCode', value)}
                  error={touched.zipCode && errors.zipCode}
                  required
                  autoComplete="postal-code"
                />
                <Select
                  label="Country"
                  value={formData.country}
                  onChange={(value) => handleFieldChange('country', value)}
                  error={touched.country && errors.country}
                  required
                  options={[
                    { label: 'Select country', value: '' },
                    { label: 'United States', value: 'US' },
                    { label: 'Canada', value: 'CA' },
                    { label: 'United Kingdom', value: 'UK' },
                    { label: 'Australia', value: 'AU' },
                  ]}
                />
              </FormLayout.Group>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Text variant="headingMd" as="h2">Communication Preferences</Text>
              <Checkbox
                label="Subscribe to newsletter"
                checked={formData.newsletter}
                onChange={(checked) => handleFieldChange('newsletter', checked)}
              />

              <Text variant="bodyMd" fontWeight="semibold">Notification Preferences</Text>
              <RadioButton
                label="Email notifications"
                checked={formData.notifications === 'email'}
                id="email"
                name="notifications"
                onChange={() => handleFieldChange('notifications', 'email')}
              />
              <RadioButton
                label="SMS notifications"
                checked={formData.notifications === 'sms'}
                id="sms"
                name="notifications"
                onChange={() => handleFieldChange('notifications', 'sms')}
              />
              <RadioButton
                label="No notifications"
                checked={formData.notifications === 'none'}
                id="none"
                name="notifications"
                onChange={() => handleFieldChange('notifications', 'none')}
              />

              <Divider />

              <Checkbox
                label="I agree to the privacy policy"
                checked={formData.privacy}
                onChange={(checked) => handleFieldChange('privacy', checked)}
              />
              <Checkbox
                label="I agree to the terms and conditions"
                checked={formData.terms}
                onChange={(checked) => handleFieldChange('terms', checked)}
                error={touched.terms && errors.terms}
                required
              />
            </>
          )}
        </FormLayout>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <ButtonGroup>
            <Button onClick={() => {
              setCurrentStep(0);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: new Date(),
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
                newsletter: false,
                notifications: 'email',
                privacy: false,
                terms: false,
              });
              setErrors({});
              setTouched({});
            }}>
              Reset Form
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button primary onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button primary onClick={handleSubmit}>
                Submit Application
              </Button>
            )}
          </ButtonGroup>
        </div>
      </div>
    </Card>
  );
};

// Dynamic Form with Conditional Logic
const DynamicForm = () => {
  const [formData, setFormData] = useState({
    accountType: '',
    businessName: '',
    businessSize: '',
    industry: '',
    hasWebsite: null as boolean | null,
    websiteUrl: '',
    ecommercePlatform: '',
    monthlyRevenue: '',
    specialRequirements: '',
    contactMethod: 'email',
    subscribeNewsletter: false,
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const businessSizes = [
    { label: 'Select business size', value: '' },
    { label: '1-10 employees', value: 'small' },
    { label: '11-50 employees', value: 'medium' },
    { label: '51-200 employees', value: 'large' },
    { label: '200+ employees', value: 'enterprise' },
  ];

  const industries = [
    { label: 'Select industry', value: '' },
    { label: 'Retail/E-commerce', value: 'retail' },
    { label: 'Manufacturing', value: 'manufacturing' },
    { label: 'Services', value: 'services' },
    { label: 'Technology', value: 'technology' },
    { label: 'Healthcare', value: 'healthcare' },
    { label: 'Education', value: 'education' },
  ];

  const ecommercePlatforms = [
    { label: 'Select platform', value: '' },
    { label: 'Shopify', value: 'shopify' },
    { label: 'WooCommerce', value: 'woocommerce' },
    { label: 'Magento', value: 'magento' },
    { label: 'BigCommerce', value: 'bigcommerce' },
    { label: 'Custom', value: 'custom' },
  ];

  return (
    <Card>
      <div style={{ padding: '24px', maxWidth: '700px' }}>
        <Text variant="headingXl" as="h1">Business Registration Form</Text>
        <Text variant="bodyMd" tone="subdued" as="p">
          Tell us about your business to get started with our services.
        </Text>

        <FormLayout>
          <Select
            label="Account Type"
            value={formData.accountType}
            onChange={(value) => handleFieldChange('accountType', value)}
            options={[
              { label: 'Select account type', value: '' },
              { label: 'Individual/Sole Proprietor', value: 'individual' },
              { label: 'Partnership', value: 'partnership' },
              { label: 'Corporation', value: 'corporation' },
              { label: 'Non-profit', value: 'nonprofit' },
            ]}
            required
          />

          {formData.accountType !== 'individual' && (
            <TextField
              label="Business Name"
              value={formData.businessName}
              onChange={(value) => handleFieldChange('businessName', value)}
              required
            />
          )}

          {formData.accountType === 'individual' ? (
            <>
              <TextField
                label="Your Name"
                value={formData.businessName}
                onChange={(value) => handleFieldChange('businessName', value)}
                required
              />
              <Select
                label="Industry"
                value={formData.industry}
                onChange={(value) => handleFieldChange('industry', value)}
                options={industries}
                required
              />
            </>
          ) : (
            <FormLayout.Group>
              <Select
                label="Business Size"
                value={formData.businessSize}
                onChange={(value) => handleFieldChange('businessSize', value)}
                options={businessSizes}
                required
              />
              <Select
                label="Industry"
                value={formData.industry}
                onChange={(value) => handleFieldChange('industry', value)}
                options={industries}
                required
              />
            </FormLayout.Group>
          )}

          <div style={{ padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
            <Text variant="bodyMd" fontWeight="semibold">Do you have a website?</Text>
            <RadioButton
              label="Yes, I have a website"
              checked={formData.hasWebsite === true}
              id="has-website-yes"
              name="hasWebsite"
              onChange={() => handleFieldChange('hasWebsite', true)}
            />
            <RadioButton
              label="No, I don't have a website"
              checked={formData.hasWebsite === false}
              id="has-website-no"
              name="hasWebsite"
              onChange={() => handleFieldChange('hasWebsite', false)}
            />
          </div>

          {formData.hasWebsite === true && (
            <>
              <TextField
                label="Website URL"
                type="url"
                value={formData.websiteUrl}
                onChange={(value) => handleFieldChange('websiteUrl', value)}
                placeholder="https://example.com"
                prefix="https://"
                required
              />

              {formData.industry === 'retail' && (
                <Select
                  label="E-commerce Platform"
                  value={formData.ecommercePlatform}
                  onChange={(value) => handleFieldChange('ecommercePlatform', value)}
                  options={ecommercePlatforms}
                />
              )}
            </>
          )}

          {formData.hasWebsite === false && (
            <CalloutCard
              title="No Website? No Problem!"
              illustration="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              primaryAction={{
                content: 'Learn about our website solutions',
                onAction: () => {},
              }}
            >
              <p>We can help you get your business online with our easy-to-use website builder and e-commerce solutions.</p>
            </CalloutCard>
          )}

          {formData.businessSize === 'large' || formData.businessSize === 'enterprise' ? (
            <TextField
              label="Monthly Revenue"
              type="number"
              value={formData.monthlyRevenue}
              onChange={(value) => handleFieldChange('monthlyRevenue', value)}
              prefix="$"
              helpText="This helps us tailor our services to your business needs"
            />
          ) : null}

          <TextField
            label="Special Requirements"
            value={formData.specialRequirements}
            onChange={(value) => handleFieldChange('specialRequirements', value)}
            multiline={4}
            helpText="Tell us about any specific needs or requirements for your business"
          />

          <Text variant="bodyMd" fontWeight="semibold">Preferred Contact Method</Text>
          <ChoiceList
            choices={[
              { label: 'Email', value: 'email' },
              { label: 'Phone', value: 'phone' },
              { label: 'Video Call', value: 'video' },
            ]}
            selected={[formData.contactMethod]}
            onChange={(value) => handleFieldChange('contactMethod', value[0])}
          />

          <Checkbox
            label="Subscribe to our newsletter for business tips and updates"
            checked={formData.subscribeNewsletter}
            onChange={(checked) => handleFieldChange('subscribeNewsletter', checked)}
          />

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <Button primary size="large" fullWidth>
              Submit Application
            </Button>
            <Button size="large" variant="plain" fullWidth>
              Save as Draft
            </Button>
          </div>
        </FormLayout>
      </div>
    </Card>
  );
};

// File Upload with Progress Tracking
const FileUploadForm = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [uploadComplete, setUploadComplete] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDropZoneDrop = useCallback(
    (_droppedFiles: File[], acceptedFiles: File[], rejectedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        size: file.size,
        type: file.type,
        file: file,
      }));

      setFiles(prev => [...prev, ...newFiles]);

      // Simulate upload progress
      newFiles.forEach((file) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setUploadProgress(prev => ({ ...prev, [file.id]: progress }));
        }, 200);
      });
    },
    []
  );

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return '📷';
    if (type.includes('pdf')) return '📄';
    if (type.includes('sheet') || type.includes('excel')) return '📊';
    if (type.includes('document') || type.includes('word')) return '📝';
    return '📎';
  };

  return (
    <Card>
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <Text variant="headingXl" as="h1">Document Upload</Text>
        <Text variant="bodyMd" tone="subdued" as="p">
          Upload your business documents. Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max 10MB per file)
        </Text>

        <DropZone
          onDrop={handleDropZoneDrop}
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
          multiple
          label="Drop files here or click to browse"
          labelHidden
        >
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Icon source={UploadMajor} size="large" tone="subdued" />
            <div style={{ marginTop: '16px' }}>
              <Text variant="bodyMd" as="p">Drop files here or click to browse</Text>
              <Text variant="bodySm" tone="subdued" as="p">
                You can upload multiple files at once
              </Text>
            </div>
          </div>
        </DropZone>

        {files.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <Text variant="headingMd" as="h2">Uploaded Files</Text>
            <div style={{ marginTop: '16px' }}>
              {files.map((file) => (
                <div key={file.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '8px',
                  marginBottom: '8px'
                }}>
                  <div style={{ fontSize: "var(--font-size-2xl)" }}>{getFileIcon(file.type)}</div>
                  <div style={{ flex: 1 }}>
                    <Text variant="bodySm" fontWeight="semibold">{file.name}</Text>
                    <Text variant="bodySm" tone="subdued">{formatFileSize(file.size)}</Text>
                    {uploadProgress[file.id] !== undefined && uploadProgress[file.id] < 100 && (
                      <ProgressBar
                        progress={uploadProgress[file.id]}
                        size="small"
                        tone="primary"
                        style={{ marginTop: '4px' }}
                      />
                    )}
                    {uploadProgress[file.id] === 100 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        <Icon source={CheckmarkMinor} size="small" tone="success" />
                        <Text variant="bodySm" tone="success">Upload complete</Text>
                      </div>
                    )}
                  </div>
                  <Button
                    size="small"
                    icon={DeleteMinor}
                    onClick={() => removeFile(file.id)}
                    tone="critical"
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px' }}>
              <Text variant="bodySm" fontWeight="semibold">Upload Summary:</Text>
              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                <Text variant="bodySm" tone="subdued">
                  {files.length} file{files.length !== 1 ? 's' : ''} selected
                </Text>
                <Text variant="bodySm" tone="subdued">
                  Total size: {formatFileSize(files.reduce((sum, file) => sum + file.size, 0))}
                </Text>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button primary size="large" fullWidth>
                Complete Upload
              </Button>
              <Button size="large" variant="plain" fullWidth>
                Add More Files
              </Button>
            </div>
          </div>
        )}

        <Banner status="info" style={{ marginTop: '24px' }}>
          <Text variant="bodySm">
            <strong>Security Note:</strong> All uploaded files are encrypted and stored securely. We only use your documents for the intended business purposes.
          </Text>
        </Banner>
      </div>
    </Card>
  );
};

// Auto-Save Form Component
const AutoSaveForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    assignee: '',
    dueDate: new Date(),
    tags: [] as string[],
  });

  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error' | 'unsaved'>('saved');
  const [newTag, setNewTag] = useState('');

  // Simulate auto-save functionality
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === 'unsaved') {
        setSaveStatus('saving');
        // Simulate API call
        setTimeout(() => {
          setLastSaved(new Date());
          setSaveStatus('saved');
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData, saveStatus]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaveStatus('unsaved');
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleFieldChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleFieldChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saved':
        return <Icon source={CheckmarkMinor} size="small" tone="success" />;
      case 'saving':
        return <Icon source={InfoMinor} size="small" tone="info" />;
      case 'error':
        return <Icon source={AlertMinor} size="small" tone="critical" />;
      default:
        return null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saved':
        return lastSaved ? `Saved at ${lastSaved.toLocaleTimeString()}` : 'Saved';
      case 'saving':
        return 'Saving...';
      case 'error':
        return 'Error saving';
      case 'unsaved':
        return 'Unsaved changes';
      default:
        return '';
    }
  };

  return (
    <Card>
      <div style={{ padding: '24px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Text variant="headingXl" as="h1">Auto-Save Form</Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {getSaveStatusIcon()}
            <Text variant="bodySm" tone={saveStatus === 'error' ? 'critical' : 'subdued'}>
              {getSaveStatusText()}
            </Text>
          </div>
        </div>

        <Banner status="info" style={{ marginBottom: '24px' }}>
          <Text variant="bodySm">
            This form automatically saves your progress every 2 seconds. Your work is safe even if you close the browser accidentally.
          </Text>
        </Banner>

        <FormLayout>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(value) => handleFieldChange('title', value)}
            placeholder="Enter task title"
          />

          <TextField
            label="Description"
            value={formData.description}
            onChange={(value) => handleFieldChange('description', value)}
            multiline={4}
            placeholder="Describe the task in detail"
          />

          <FormLayout.Group>
            <Select
              label="Category"
              value={formData.category}
              onChange={(value) => handleFieldChange('category', value)}
              options={[
                { label: 'Select category', value: '' },
                { label: 'Development', value: 'development' },
                { label: 'Design', value: 'design' },
                { label: 'Marketing', value: 'marketing' },
                { label: 'Sales', value: 'sales' },
                { label: 'Support', value: 'support' },
              ]}
            />
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(value) => handleFieldChange('priority', value)}
              options={[
                { label: 'Low', value: 'low' },
                { label: 'Medium', value: 'medium' },
                { label: 'High', value: 'high' },
                { label: 'Critical', value: 'critical' },
              ]}
            />
          </FormLayout.Group>

          <TextField
            label="Assignee"
            value={formData.assignee}
            onChange={(value) => handleFieldChange('assignee', value)}
            placeholder="Enter assignee email or name"
          />

          <DatePicker
            label="Due Date"
            selected={formData.dueDate}
            onChange={(date) => handleFieldChange('dueDate', date)}
          />

          <div>
            <Text variant="bodyMd" fontWeight="semibold">Tags</Text>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <TextField
                placeholder="Add a tag"
                value={newTag}
                onChange={setNewTag}
                onSubmit={addTag}
              />
              <Button onClick={addTag}>Add</Button>
            </div>
            {formData.tags.length > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {formData.tags.map((tag) => (
                  <Tag key={tag} onRemove={() => removeTag(tag)}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <Button primary size="large" fullWidth>
              Submit Task
            </Button>
            <Button size="large" variant="plain" fullWidth>
              Save Draft
            </Button>
          </div>
        </FormLayout>
      </div>
    </Card>
  );
};

// Stories
export const MultiStepFormStory: Story = {
  render: () => <MultiStepForm />,
};

export const DynamicConditionalForm: Story = {
  render: () => <DynamicForm />,
};

export const FileUploadWithProgress: Story = {
  render: () => <FileUploadForm />,
};

export const AutoSaveDraftForm: Story = {
  render: () => <AutoSaveForm />,
};

export const FormValidationExamples: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      age: '',
      website: '',
      creditCard: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (field: string, value: string) => {
      let error = '';

      switch (field) {
        case 'email':
          if (!value.trim()) error = 'Email is required';
          else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email';
          break;
        case 'password':
          if (!value) error = 'Password is required';
          else if (value.length < 8) error = 'Password must be at least 8 characters';
          else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            error = 'Password must contain uppercase, lowercase, and numbers';
          }
          break;
        case 'confirmPassword':
          if (!value) error = 'Please confirm your password';
          else if (value !== formData.password) error = 'Passwords do not match';
          break;
        case 'phone':
          if (!value.trim()) error = 'Phone number is required';
          else if (!/^\d{10,}$/.test(value.replace(/\D/g, ''))) error = 'Please enter a valid phone number';
          break;
        case 'age':
          if (!value) error = 'Age is required';
          else if (parseInt(value) < 18) error = 'You must be at least 18 years old';
          else if (parseInt(value) > 120) error = 'Please enter a valid age';
          break;
        case 'website':
          if (value && !/^https?:\/\/.+/.test(value)) error = 'Please enter a valid URL starting with http:// or https://';
          break;
        case 'creditCard':
          if (value && !/^\d{16}$/.test(value.replace(/\D/g, ''))) error = 'Please enter a valid 16-digit card number';
          break;
      }

      setErrors(prev => ({ ...prev, [field]: error }));
    };

    const handleFieldChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      validateField(field, value);
    };

    return (
      <Card>
        <div style={{ padding: '24px', maxWidth: '600px' }}>
          <Text variant="headingXl" as="h1">Form Validation Examples</Text>
          <Text variant="bodyMd" tone="subdued" as="p">
            Real-time validation with helpful error messages
          </Text>

          <FormLayout>
            <TextField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => handleFieldChange('email', value)}
              error={errors.email}
              required
            />

            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => handleFieldChange('password', value)}
              error={errors.password}
              required
              helpText="Must be at least 8 characters with uppercase, lowercase, and numbers"
            />

            <TextField
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(value) => handleFieldChange('confirmPassword', value)}
              error={errors.confirmPassword}
              required
            />

            <TextField
              label="Phone Number"
              type="tel"
              value={formData.phone}
              onChange={(value) => handleFieldChange('phone', value)}
              error={errors.phone}
              required
              placeholder="(555) 123-4567"
            />

            <TextField
              label="Age"
              type="number"
              value={formData.age}
              onChange={(value) => handleFieldChange('age', value)}
              error={errors.age}
              required
              min="18"
              max="120"
            />

            <TextField
              label="Website (Optional)"
              type="url"
              value={formData.website}
              onChange={(value) => handleFieldChange('website', value)}
              error={errors.website}
              placeholder="https://example.com"
            />

            <TextField
              label="Credit Card (Optional)"
              value={formData.creditCard}
              onChange={(value) => handleFieldChange('creditCard', value)}
              error={errors.creditCard}
              placeholder="1234 5678 9012 3456"
              type="text"
              maxLength={19}
            />

            <Banner status="info">
              <Text variant="bodySm">
                <strong>Validation Features:</strong> Real-time validation, custom error messages, field requirements, format validation, and conditional logic.
              </Text>
            </Banner>

            <Button primary size="large" fullWidth>
              Validate and Submit
            </Button>
          </FormLayout>
        </div>
      </Card>
    );
  },
};

export const AccessibleFormExample: Story = {
  render: () => {
    return (
      <Card>
        <div style={{ padding: '24px', maxWidth: '600px' }}>
          <Text variant="headingXl" as="h1">Accessible Form Design</Text>
          <Text variant="bodyMd" tone="subdued" as="p">
            Following WCAG guidelines for form accessibility
          </Text>

          <FormLayout>
            <Text variant="headingMd" as="h2">Contact Information</Text>

            <TextField
              label="Full Name"
              autoComplete="name"
              required
              aria-required="true"
              helpText="Enter your first and last name"
            />

            <TextField
              label="Email Address"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              helpText="We'll use this to contact you about your account"
            />

            <TextField
              label="Phone Number"
              type="tel"
              autoComplete="tel"
              helpText="Including country code for international numbers"
            />

            <Divider />

            <Text variant="headingMd" as="h2">Accessibility Features</Text>

            <div style={{ padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
              <Text variant="bodySm" fontWeight="semibold">This form includes:</Text>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                <li><Text variant="bodySm">Proper label associations for screen readers</Text></li>
                <li><Text variant="bodySm">ARIA attributes for enhanced accessibility</Text></li>
                <li><Text variant="bodySm">Keyboard navigation support</Text></li>
                <li><Text variant="bodySm">High contrast colors for better visibility</Text></li>
                <li><Text variant="bodySm">Descriptive help text for all fields</Text></li>
                <li><Text variant="bodySm">Error announcements for validation failures</Text></li>
                <li><Text variant="bodySm">Focus indicators for keyboard users</Text></li>
              </ul>
            </div>

            <Checkbox
              label="I need accessibility accommodations"
              helpText="Check this if you require any special accommodations"
            />

            <Checkbox
              label="I prefer large text"
              helpText="We'll adjust the text size for better readability"
            />

            <Button primary size="large" fullWidth>
              Submit Form
            </Button>

            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <Text variant="bodySm" tone="subdued">
                Need help with this form? Contact our accessibility support team
              </Text>
            </div>
          </FormLayout>
        </div>
      </Card>
    );
  },
};