import React from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Badge,
  Banner,
  TextField,
  Select,
  Checkbox,
  RadioButton,
  Divider,
  Icon,
  Tooltip,
  Box,
  Grid,
} from '@shopify/polaris';
import {
  PlusIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  SearchIcon,
  FilterIcon,
  ExportIcon,
  ImportIcon,
} from '@shopify/polaris-icons';
import styles from './StyleGuideExamples.module.scss';

export function ColorPalette() {
  const colors = [
    { name: 'Primary', token: '--p-color-bg-fill-brand', hex: '#008060' },
    { name: 'Success', token: '--p-color-bg-fill-success', hex: '#108043' },
    { name: 'Warning', token: '--p-color-bg-fill-warning', hex: '#F2A202' },
    { name: 'Critical', token: '--p-color-bg-fill-critical', hex: '#D82C0D' },
    { name: 'Info', token: '--p-color-bg-fill-info', hex: '#006EFF' },
  ];

  return (
    <Card title="Color Palette">
      <BlockStack gap="300">
        <Text variant="bodyMd" tone="subdued">
          Semantic colors for consistent communication
        </Text>
        <div className={styles.ColorGrid}>
          {colors.map((color) => (
            <div key={color.name} className={styles.ColorSwatch}>
              <div
                className={styles.ColorPreview}
                style={{ backgroundColor: `var(${color.token})` }}
              />
              <BlockStack gap="100">
                <Text variant="bodySm" fontWeight="semibold">
                  {color.name}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  {color.token}
                </Text>
                <Text variant="bodySm" tone="subdued">
                  {color.hex}
                </Text>
              </BlockStack>
            </div>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export function TypographyScale() {
  const textVariants = [
    { variant: 'headingXl', label: 'Heading XL', size: '32px' },
    { variant: 'headingLg', label: 'Heading LG', size: '24px' },
    { variant: 'headingMd', label: 'Heading MD', size: '20px' },
    { variant: 'headingSm', label: 'Heading SM', size: '16px' },
    { variant: 'bodyLg', label: 'Body LG', size: '16px' },
    { variant: 'bodyMd', label: 'Body MD', size: '14px' },
    { variant: 'bodySm', label: 'Body SM', size: '12px' },
  ];

  return (
    <Card title="Typography Scale">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          Consistent text hierarchy for clear communication
        </Text>
        {textVariants.map((item) => (
          <BlockStack key={item.variant} gap="100">
            <InlineStack align="space-between" blockAlign="center">
              <Text variant={item.variant as any} as="p">
                {item.label} - The quick brown fox jumps over the lazy dog
              </Text>
              <Text variant="bodySm" tone="subdued">
                {item.size}
              </Text>
            </InlineStack>
            <Divider />
          </BlockStack>
        ))}
      </BlockStack>
    </Card>
  );
}

export function ButtonVariants() {
  return (
    <Card title="Button Variants">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          Different button styles for various actions
        </Text>
        
        <BlockStack gap="300">
          <div>
            <Text variant="headingSm">Primary Actions</Text>
            <Box paddingBlockStart="200">
              <InlineStack gap="200">
                <Button primary>Save Changes</Button>
                <Button primary icon={PlusIcon}>Add Product</Button>
                <Button primary loading>Processing</Button>
                <Button primary disabled>Disabled</Button>
              </InlineStack>
            </Box>
          </div>

          <div>
            <Text variant="headingSm">Secondary Actions</Text>
            <Box paddingBlockStart="200">
              <InlineStack gap="200">
                <Button>Cancel</Button>
                <Button icon={EditIcon}>Edit</Button>
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </InlineStack>
            </Box>
          </div>

          <div>
            <Text variant="headingSm">Destructive Actions</Text>
            <Box paddingBlockStart="200">
              <InlineStack gap="200">
                <Button destructive>Delete</Button>
                <Button destructive icon={DeleteIcon}>Remove</Button>
                <Button destructive loading>Deleting</Button>
                <Button destructive disabled>Disabled</Button>
              </InlineStack>
            </Box>
          </div>

          <div>
            <Text variant="headingSm">Plain Actions</Text>
            <Box paddingBlockStart="200">
              <InlineStack gap="200">
                <Button plain>Learn more</Button>
                <Button plain icon={ViewIcon}>View details</Button>
                <Button plain destructive>Remove</Button>
              </InlineStack>
            </Box>
          </div>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export function BadgeExamples() {
  return (
    <Card title="Badge States">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          Status indicators and labels
        </Text>
        
        <BlockStack gap="300">
          <div>
            <Text variant="headingSm">Status Badges</Text>
            <Box paddingBlockStart="200">
              <InlineStack gap="200">
                <Badge tone="success">Active</Badge>
                <Badge tone="info">New</Badge>
                <Badge tone="warning">Pending</Badge>
                <Badge tone="critical">Expired</Badge>
                <Badge>Default</Badge>
              </InlineStack>
            </Box>
          </div>

          <div>
            <Text variant="headingSm">With Status</Text>
            <Box paddingBlockStart="200">
              <InlineStack gap="200">
                <Badge tone="success" progress="complete">Published</Badge>
                <Badge tone="warning" progress="partiallyComplete">In Progress</Badge>
                <Badge tone="critical" progress="incomplete">Draft</Badge>
              </InlineStack>
            </Box>
          </div>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export function FormElements() {
  const [textValue, setTextValue] = React.useState('');
  const [selectValue, setSelectValue] = React.useState('option1');
  const [checked, setChecked] = React.useState(false);
  const [radioValue, setRadioValue] = React.useState('option1');

  return (
    <Card title="Form Elements">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          Common form patterns and states
        </Text>
        
        <TextField
          label="Text Field"
          value={textValue}
          onChange={setTextValue}
          helpText="Helper text provides additional context"
          placeholder="Enter text..."
        />

        <TextField
          label="Required Field"
          value=""
          onChange={() => {}}
          requiredIndicator
          error="This field is required"
        />

        <Select
          label="Select Field"
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
          ]}
          value={selectValue}
          onChange={setSelectValue}
        />

        <Checkbox
          label="Checkbox option"
          checked={checked}
          onChange={setChecked}
          helpText="Additional information about this option"
        />

        <BlockStack gap="200">
          <Text variant="headingSm">Radio Options</Text>
          <RadioButton
            label="Option 1"
            id="radio1"
            name="radioGroup"
            checked={radioValue === 'option1'}
            onChange={() => setRadioValue('option1')}
          />
          <RadioButton
            label="Option 2"
            id="radio2"
            name="radioGroup"
            checked={radioValue === 'option2'}
            onChange={() => setRadioValue('option2')}
          />
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export function SpacingExamples() {
  const spacingScale = [
    { token: '0', value: '0px' },
    { token: '100', value: '4px' },
    { token: '200', value: '8px' },
    { token: '300', value: '12px' },
    { token: '400', value: '16px' },
    { token: '500', value: '20px' },
    { token: '600', value: '24px' },
    { token: '800', value: '32px' },
  ];

  return (
    <Card title="Spacing Scale">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          Consistent spacing for layouts
        </Text>
        
        <BlockStack gap="300">
          {spacingScale.map((space) => (
            <InlineStack key={space.token} gap="400" blockAlign="center">
              <Text variant="bodySm" tone="subdued" as="span" fontWeight="medium">
                gap="{space.token}"
              </Text>
              <div
                className={styles.SpacingBar}
                style={{ width: space.value }}
              />
              <Text variant="bodySm" tone="subdued">
                {space.value}
              </Text>
            </InlineStack>
          ))}
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export function IconLibrary() {
  const commonIcons = [
    { icon: PlusIcon, name: 'Plus' },
    { icon: EditIcon, name: 'Edit' },
    { icon: DeleteIcon, name: 'Delete' },
    { icon: ViewIcon, name: 'View' },
    { icon: SearchIcon, name: 'Search' },
    { icon: FilterIcon, name: 'Filter' },
    { icon: ExportIcon, name: 'Export' },
    { icon: ImportIcon, name: 'Import' },
  ];

  return (
    <Card title="Common Icons">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          Frequently used icons in Cin7 DSL
        </Text>
        
        <div className={styles.IconGrid}>
          {commonIcons.map(({ icon, name }) => (
            <Tooltip key={name} content={name}>
              <div className={styles.IconItem}>
                <Icon source={icon} />
                <Text variant="bodySm">{name}</Text>
              </div>
            </Tooltip>
          ))}
        </div>
      </BlockStack>
    </Card>
  );
}

export function FeedbackPatterns() {
  return (
    <Card title="Feedback Patterns">
      <BlockStack gap="400">
        <Text variant="bodyMd" tone="subdued">
          User feedback and messaging patterns
        </Text>
        
        <Banner title="Information" tone="info">
          <p>This is an informational message to guide users.</p>
        </Banner>

        <Banner title="Success" tone="success">
          <p>Your changes have been saved successfully.</p>
        </Banner>

        <Banner title="Warning" tone="warning">
          <p>Please review your settings before continuing.</p>
        </Banner>

        <Banner title="Error" tone="critical">
          <p>An error occurred. Please try again.</p>
        </Banner>
      </BlockStack>
    </Card>
  );
}