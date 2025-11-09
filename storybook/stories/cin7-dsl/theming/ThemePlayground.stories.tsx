import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import {
  Page,
  Card,
  Layout,
  Button,
  Badge,
  TextField,
  Select,
  DataTable,
  BlockStack,
  InlineStack,
  Text,
  Banner,
  Icon,
  Grid,
  Divider,
  Tabs,
  FormLayout,
  Checkbox,
  RadioButton,
  ButtonGroup,
} from '@shopify/polaris';
import {
  EditIcon,
  SunIcon,
  MoonIcon,
  CircleTickIcon,
  RefreshIcon,
  CheckIcon,
  ViewIcon,
} from '@shopify/polaris-icons';
import { themes, ThemeName, Theme, applyTheme } from '../../../.storybook/themes/themeConfig';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/Theming/Theme Playground',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interactive theme playground for the Cin7 Design System. Experiment with different themes, customize colors, and see how changes affect all components in real-time.',
      },
    },
  },
  tags: ['autodocs', 'theming'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component Preview Panel
function ComponentPreview({ theme }: { theme: Theme }) {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'buttons', content: 'Buttons', panelID: 'buttons-panel' },
    { id: 'forms', content: 'Forms', panelID: 'forms-panel' },
    { id: 'data', content: 'Data Display', panelID: 'data-panel' },
    { id: 'feedback', content: 'Feedback', panelID: 'feedback-panel' },
    { id: 'charts', content: 'Charts', panelID: 'charts-panel' },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={setSelected}>
        {/* Buttons Tab */}
        {selected === 0 && (
          <div style={{ padding: '20px' }}>
            <BlockStack gap="400">
              <Text variant="headingMd" as="h3">Button Variants</Text>

              <InlineStack gap="300">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button>Basic</Button>
                <Button variant="plain">Plain</Button>
                <Button variant="primary" tone="success">Success</Button>
                <Button variant="primary" tone="critical">Critical</Button>
              </InlineStack>

              <InlineStack gap="300">
                <Button variant="primary" size="slim">Slim</Button>
                <Button variant="primary" size="medium">Medium</Button>
                <Button variant="primary" size="large">Large</Button>
                <Button variant="primary" fullWidth>Full Width</Button>
              </InlineStack>

              <InlineStack gap="300">
                <Button variant="primary" loading>Loading</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" icon={CheckIcon}>With Icon</Button>
              </InlineStack>

              <Divider />

              <Text variant="headingMd" as="h3">Badges</Text>

              <InlineStack gap="300">
                <Badge>Default</Badge>
                <Badge status="success">Success</Badge>
                <Badge status="info">Info</Badge>
                <Badge status="attention">Attention</Badge>
                <Badge status="warning">Warning</Badge>
                <Badge status="critical">Critical</Badge>
                <Badge status="new">New</Badge>
              </InlineStack>
            </BlockStack>
          </div>
        )}

        {/* Forms Tab */}
        {selected === 1 && (
          <div style={{ padding: '20px' }}>
            <FormLayout>
              <TextField
                label="Text Field"
                value="Sample text"
                onChange={() => {}}
                helpText="This is help text"
                requiredIndicator
              />

              <TextField
                label="Text Field with Error"
                value=""
                onChange={() => {}}
                error="This field is required"
                requiredIndicator
              />

              <Select
                label="Select Field"
                options={[
                  { label: 'Option 1', value: '1' },
                  { label: 'Option 2', value: '2' },
                  { label: 'Option 3', value: '3' },
                ]}
                value="1"
                onChange={() => {}}
              />

              <BlockStack>
                <Checkbox label="Checkbox option 1" checked={true} onChange={() => {}} />
                <Checkbox label="Checkbox option 2" checked={false} onChange={() => {}} />
                <Checkbox label="Checkbox option 3 (disabled)" disabled onChange={() => {}} />
              </BlockStack>

              <BlockStack>
                <RadioButton
                  label="Radio option 1"
                  checked={true}
                  id="radio1"
                  name="radioGroup"
                  onChange={() => {}}
                />
                <RadioButton
                  label="Radio option 2"
                  checked={false}
                  id="radio2"
                  name="radioGroup"
                  onChange={() => {}}
                />
              </BlockStack>
            </FormLayout>
          </div>
        )}

        {/* Data Display Tab */}
        {selected === 2 && (
          <div style={{ padding: '20px' }}>
            <BlockStack gap="400">
              <DataTable
                columnContentTypes={['text', 'text', 'numeric', 'text']}
                headings={['Product', 'Category', 'Price', 'Status']}
                rows={[
                  ['Wireless Headphones', 'Electronics', '$89.99', <Badge status="success">Available</Badge>],
                  ['Cotton T-Shirt', 'Clothing', '$24.99', <Badge status="warning">Low Stock</Badge>],
                  ['Coffee Maker', 'Appliances', '$149.99', <Badge status="critical">Out of Stock</Badge>],
                ]}
              />

              <Grid columns={{ sm: 1, md: 3 }} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">Total Sales</Text>
                    <Text variant="heading2xl" as="h2">$12,345</Text>
                    <Badge status="success">+12%</Badge>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">Orders</Text>
                    <Text variant="heading2xl" as="h2">456</Text>
                    <Badge status="info">Today</Badge>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text as="p" tone="subdued">Customers</Text>
                    <Text variant="heading2xl" as="h2">1,234</Text>
                    <Badge status="attention">Active</Badge>
                  </BlockStack>
                </Card>
              </Grid>
            </BlockStack>
          </div>
        )}

        {/* Feedback Tab */}
        {selected === 3 && (
          <div style={{ padding: '20px' }}>
            <BlockStack gap="400">
              <Banner title="Success banner" status="success">
                <p>Your theme has been successfully applied to all components.</p>
              </Banner>

              <Banner title="Information banner" status="info">
                <p>Theme changes are automatically saved to your browser.</p>
              </Banner>

              <Banner title="Warning banner" status="warning">
                <p>Some components may need a refresh to apply all theme changes.</p>
              </Banner>

              <Banner title="Critical banner" status="critical">
                <p>Invalid color values will be ignored.</p>
              </Banner>
            </BlockStack>
          </div>
        )}

        {/* Charts Tab */}
        {selected === 4 && (
          <div style={{ padding: '20px' }}>
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="300">
                  <Text variant="headingMd" as="h3">Chart Preview</Text>
                  <Text as="p" tone="subdued">
                    Charts would display here with the current theme colors.
                  </Text>

                  <div style={{ padding: '40px', background: 'linear-gradient(135deg, var(--cin7-color-primary) 0%, var(--cin7-color-secondary) 100%)', borderRadius: '8px', textAlign: 'center' }}>
                    <Text variant="headingLg" as="h3" style={{ color: 'white' }}>
                      Sales Trend Visualization
                    </Text>
                    <Text as="p" style={{ color: 'rgba(255,255,255,0.9)', marginTop: '8px' }}>
                      Theme colors applied to chart components
                    </Text>
                  </div>

                  <Grid columns={{ sm: 1, md: 3 }} gap="400">
                    <Card>
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cin7-color-primary)' }}>45%</div>
                        <Text as="p" tone="subdued">Electronics</Text>
                      </div>
                    </Card>
                    <Card>
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cin7-color-secondary)' }}>32%</div>
                        <Text as="p" tone="subdued">Clothing</Text>
                      </div>
                    </Card>
                    <Card>
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--cin7-color-accent)' }}>23%</div>
                        <Text as="p" tone="subdued">Other</Text>
                      </div>
                    </Card>
                  </Grid>
                </BlockStack>
              </Card>
            </BlockStack>
          </div>
        )}
      </Tabs>
    </Card>
  );
}

export const Playground: Story = {
  parameters: {
    codeVariants: getCodeVariants('themeplayground', 'default'),
  },
  render: () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('light');
    const [customPrimary, setCustomPrimary] = useState('#007ace');
    const [customSecondary, setCustomSecondary] = useState('#6b46c1');
    const [customAccent, setCustomAccent] = useState('#f59e0b');
    const [isCustomMode, setIsCustomMode] = useState(false);

    const theme = themes[currentTheme];

    const handleThemeChange = (value: string) => {
      const themeName = value as ThemeName;
      setCurrentTheme(themeName);
      setIsCustomMode(false);
      applyTheme(themes[themeName]);
    };

    const handleCustomColors = () => {
      const customTheme: Theme = {
        ...theme,
        name: 'Custom',
        colors: {
          ...theme.colors,
          primary: customPrimary,
          primaryLight: lightenColor(customPrimary, 0.2),
          primaryDark: darkenColor(customPrimary, 0.2),
          secondary: customSecondary,
          secondaryLight: lightenColor(customSecondary, 0.2),
          secondaryDark: darkenColor(customSecondary, 0.2),
          accent: customAccent,
          interactive: customPrimary,
          interactiveHovered: lightenColor(customPrimary, 0.2),
          interactivePressed: darkenColor(customPrimary, 0.2),
          focused: customPrimary,
        },
      };
      setIsCustomMode(true);
      applyTheme(customTheme);
    };

    const resetToDefault = () => {
      setCurrentTheme('light');
      setIsCustomMode(false);
      setCustomPrimary('#007ace');
      setCustomSecondary('#6b46c1');
      setCustomAccent('#f59e0b');
      applyTheme(themes.light);
    };

    return (
      <Page
        title="Theme Playground"
        subtitle="Experiment with themes and see real-time changes"
        primaryAction={{
          content: 'Apply Custom Theme',
          icon: EditIcon,
          onAction: handleCustomColors,
        }}
        secondaryActions={[
          {
            content: 'Reset to Default',
            icon: RefreshIcon,
            onAction: resetToDefault,
          },
        ]}
      >
        <Layout>
          {/* Theme Controls */}
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingLg" as="h2">Theme Settings</Text>
                  <Badge status={isCustomMode ? 'attention' : 'info'}>
                    {isCustomMode ? 'Custom' : theme.name}
                  </Badge>
                </InlineStack>

                <Select
                  label="Select Theme"
                  options={[
                    { label: '☀️ Light', value: 'light' },
                    { label: '🌙 Dark', value: 'dark' },
                    { label: '🌊 Ocean', value: 'ocean' },
                    { label: '🌲 Forest', value: 'forest' },
                    { label: '🌅 Sunset', value: 'sunset' },
                    { label: '💜 Purple', value: 'purple' },
                    { label: '⚡ High Contrast', value: 'highContrast' },
                  ]}
                  value={currentTheme}
                  onChange={handleThemeChange}
                />

                <Divider />

                <Text variant="headingMd" as="h3">Custom Colors</Text>

                <TextField
                  label="Primary Color"
                  value={customPrimary}
                  onChange={setCustomPrimary}
                  type="color"
                  helpText="Main brand color"
                  prefix={
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: customPrimary,
                        borderRadius: '4px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                  }
                />

                <TextField
                  label="Secondary Color"
                  value={customSecondary}
                  onChange={setCustomSecondary}
                  type="color"
                  helpText="Supporting brand color"
                  prefix={
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: customSecondary,
                        borderRadius: '4px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                  }
                />

                <TextField
                  label="Accent Color"
                  value={customAccent}
                  onChange={setCustomAccent}
                  type="color"
                  helpText="Highlight and emphasis"
                  prefix={
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: customAccent,
                        borderRadius: '4px',
                        border: '1px solid #e5e7eb',
                      }}
                    />
                  }
                />

                <ButtonGroup>
                  <Button variant="primary" onClick={handleCustomColors}>
                    Apply Custom
                  </Button>
                  <Button onClick={resetToDefault}>Reset</Button>
                </ButtonGroup>

                <Divider />

                <Text variant="headingMd" as="h3">Current Theme Colors</Text>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {[
                    ['Primary', isCustomMode ? customPrimary : theme.colors.primary],
                    ['Secondary', isCustomMode ? customSecondary : theme.colors.secondary],
                    ['Accent', isCustomMode ? customAccent : theme.colors.accent],
                    ['Success', theme.colors.success],
                    ['Warning', theme.colors.warning],
                    ['Critical', theme.colors.critical],
                  ].map(([name, color]) => (
                    <div
                      key={name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '8px',
                        backgroundColor: theme.mode === 'dark' ? '#374151' : '#f9fafb',
                        borderRadius: '6px',
                      }}
                    >
                      <div
                        style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: color,
                          borderRadius: '4px',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '12px', fontWeight: 600 }}>{name}</div>
                        <div style={{ fontSize: '11px', color: '#6b7280' }}>{color}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          {/* Component Preview */}
          <Layout.Section>
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text variant="headingLg" as="h2">Component Preview</Text>
                    <InlineStack gap="200">
                      <Icon source={ViewIcon} />
                      <Text as="p" tone="subdued">Live preview with current theme</Text>
                    </InlineStack>
                  </InlineStack>

                  <Banner status="info">
                    <p>All components below are using the {isCustomMode ? 'custom' : theme.name} theme. Changes are applied in real-time.</p>
                  </Banner>
                </BlockStack>
              </Card>

              <ComponentPreview theme={isCustomMode ? { ...theme, colors: { ...theme.colors, primary: customPrimary, secondary: customSecondary, accent: customAccent } } : theme} />
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

// Helper functions
function lightenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.min(255, ((num >> 16) & 255) + Math.round(255 * amount));
  const g = Math.min(255, ((num >> 8) & 255) + Math.round(255 * amount));
  const b = Math.min(255, (num & 255) + Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function darkenColor(color: string, amount: number): string {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const r = Math.max(0, ((num >> 16) & 255) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 255) - Math.round(255 * amount));
  const b = Math.max(0, (num & 255) - Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}