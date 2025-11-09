import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Page,
  Card,
  Layout,
  BlockStack,
  InlineStack,
  Text,
  Badge,
  Banner,
  Code,
  Divider,
} from '@shopify/polaris';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Cin7 DSL/Theming/Documentation',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete documentation for the Cin7 Design System theming capabilities. Learn how to implement, customize, and manage themes across your application.',
      },
    },
  },
  tags: ['autodocs', 'theming'],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  parameters: {
    codeVariants: getCodeVariants('themedocumentation', 'overview'),
  },
  render: () => {
    return (
      <Page title="Theming System Documentation" subtitle="Complete guide to Cin7 DSL theming">
        <Layout>
          <Layout.Section>
            <BlockStack gap="600">
              {/* Introduction */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Introduction</Text>
                  <Text as="p">
                    The Cin7 Design System includes a powerful theming system that allows you to customize
                    the entire look and feel of your application. Themes control colors, typography,
                    spacing, shadows, and more across all components.
                  </Text>
                  <Banner status="info">
                    <p>Theming is applied globally - changing a theme instantly updates all components throughout your application.</p>
                  </Banner>
                </BlockStack>
              </Card>

              {/* Features */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Key Features</Text>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <InlineStack gap="300">
                        <Badge status="success">Built-in</Badge>
                        <Text variant="headingMd" as="h3">7 Pre-built Themes</Text>
                      </InlineStack>
                      <Text as="p" tone="subdued">
                        Light, Dark, Ocean, Forest, Sunset, Purple, and High Contrast themes ready to use
                      </Text>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <InlineStack gap="300">
                        <Badge status="attention">Custom</Badge>
                        <Text variant="headingMd" as="h3">Customizable Colors</Text>
                      </InlineStack>
                      <Text as="p" tone="subdued">
                        Override primary, secondary, and accent colors to match your brand
                      </Text>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <InlineStack gap="300">
                        <Badge status="info">Automatic</Badge>
                        <Text variant="headingMd" as="h3">CSS Variables</Text>
                      </InlineStack>
                      <Text as="p" tone="subdued">
                        Themes automatically apply CSS custom properties for easy styling
                      </Text>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <InlineStack gap="300">
                        <Badge status="warning">Persistent</Badge>
                        <Text variant="headingMd" as="h3">LocalStorage</Text>
                      </InlineStack>
                      <Text as="p" tone="subdued">
                        User theme preferences are saved and restored automatically
                      </Text>
                    </div>
                  </div>
                </BlockStack>
              </Card>

              {/* Design Tokens */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Design Tokens</Text>
                  <Text as="p">
                    Each theme defines a complete set of design tokens that control the visual appearance:
                  </Text>

                  <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', color: '#f9fafb' }}>
                    <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
{`interface Theme {
  // Color System
  colors: {
    primary, primaryLight, primaryDark
    secondary, secondaryLight, secondaryDark
    accent, success, warning, critical, info
    background, surface, surfaceSubdued
    text, textSubdued
    border, borderSubdued
    interactive, interactiveHovered, interactivePressed
  }

  // Spacing Scale
  spacing: { xs, sm, md, lg, xl, xxl }

  // Typography
  typography: {
    fontFamily, fontFamilyMonospace
    fontSize: { xs, sm, base, lg, xl, xxl, xxxl }
    fontWeight: { regular, medium, semibold, bold }
    lineHeight: { tight, base, relaxed }
  }

  // Shadows
  shadows: { sm, base, md, lg, xl }

  // Border Radius
  radius: { sm, base, md, lg, full }
}`}</pre>
                  </div>
                </BlockStack>
              </Card>

              {/* Implementation */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Implementation Guide</Text>

                  <BlockStack gap="300">
                    <div>
                      <Text variant="headingMd" as="h3">1. Install Theme Provider</Text>
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '6px', marginTop: '8px' }}>
                        <code style={{ fontSize: '13px' }}>
                          {`import { ThemeProvider } from '@cin7/design-tokens';`}
                        </code>
                      </div>
                    </div>

                    <div>
                      <Text variant="headingMd" as="h3">2. Wrap Your Application</Text>
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '6px', marginTop: '8px' }}>
                        <pre style={{ margin: 0, fontSize: '13px' }}>
{`function App() {
  return (
    <ThemeProvider initialTheme="light">
      <YourApplication />
    </ThemeProvider>
  );
}`}</pre>
                      </div>
                    </div>

                    <div>
                      <Text variant="headingMd" as="h3">3. Use Theme Hook</Text>
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '6px', marginTop: '8px' }}>
                        <pre style={{ margin: 0, fontSize: '13px' }}>
{`function ThemeSwitcher() {
  const { theme, setTheme, customColors } = useTheme();

  return (
    <Select
      value={theme.name}
      onChange={(value) => setTheme(value)}
      options={[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
      ]}
    />
  );
}`}</pre>
                      </div>
                    </div>

                    <div>
                      <Text variant="headingMd" as="h3">4. Use CSS Variables</Text>
                      <div style={{ backgroundColor: '#f3f4f6', padding: '16px', borderRadius: '6px', marginTop: '8px' }}>
                        <pre style={{ margin: 0, fontSize: '13px' }}>
{`.custom-component {
  background: var(--cin7-color-surface);
  color: var(--cin7-color-text);
  border: 1px solid var(--cin7-color-border);
  padding: var(--cin7-spacing-md);
  border-radius: var(--cin7-radius-lg);
  box-shadow: var(--cin7-shadow-base);
}`}</pre>
                      </div>
                    </div>
                  </BlockStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const CustomThemes: Story = {
  parameters: {
    codeVariants: getCodeVariants('themedocumentation', 'customthemes'),
  },
  render: () => {
    return (
      <Page title="Creating Custom Themes" subtitle="Build your own theme configurations">
        <Layout>
          <Layout.Section>
            <BlockStack gap="600">
              {/* Custom Theme Creation */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Creating a Custom Theme</Text>

                  <Text as="p">
                    You can create completely custom themes by defining your own theme configuration:
                  </Text>

                  <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', color: '#f9fafb' }}>
                    <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
{`import { Theme, applyTheme } from '@cin7/design-tokens';

// Create your custom theme
const myBrandTheme: Theme = {
  name: 'My Brand',
  mode: 'light',
  colors: {
    primary: '#FF6B35',
    primaryLight: '#FF8F65',
    primaryDark: '#E55A2B',
    secondary: '#004E89',
    secondaryLight: '#2979A3',
    secondaryDark: '#003A6B',
    accent: '#F71735',
    success: '#06D6A0',
    warning: '#FFD166',
    critical: '#EF476F',
    info: '#118AB2',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceSubdued: '#F7F9FC',
    text: '#073B4C',
    textSubdued: '#5C7080',
    border: '#D3DAE6',
    borderSubdued: '#E8ECF0',
    interactive: '#FF6B35',
    interactiveHovered: '#FF8F65',
    interactivePressed: '#E55A2B',
    interactiveDisabled: '#B8BCC8',
    focused: '#FF6B35',
  },
  // ... spacing, typography, shadows, radius
};

// Apply the theme
applyTheme(myBrandTheme);`}</pre>
                  </div>
                </BlockStack>
              </Card>

              {/* Dynamic Theme Switching */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Dynamic Theme Switching</Text>

                  <Text as="p">
                    Implement dynamic theme switching with user preferences:
                  </Text>

                  <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', color: '#f9fafb' }}>
                    <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
{`function ThemeManager() {
  const { theme, setTheme, customColors, setCustomColors } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Handle theme change
  const handleThemeChange = (themeName: ThemeName) => {
    setTheme(themeName);
    // Save to localStorage
    localStorage.setItem('preferred-theme', themeName);
    // Emit event for other components
    window.dispatchEvent(new CustomEvent('theme-changed', {
      detail: { theme: themeName }
    }));
  };

  // Handle custom color change
  const handleColorChange = (colorType: string, color: string) => {
    setCustomColors({
      ...customColors,
      [colorType]: color,
    });
  };

  // Auto-detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.matches && !localStorage.getItem('preferred-theme')) {
      setTheme('dark');
    }
  }, []);

  return (
    <Card>
      <BlockStack gap="400">
        <Select
          label="Theme"
          value={theme.name}
          onChange={handleThemeChange}
          options={themeOptions}
        />

        {showColorPicker && (
          <ColorPicker
            color={customColors.primary}
            onChange={(color) => handleColorChange('primary', color)}
          />
        )}
      </BlockStack>
    </Card>
  );
}`}</pre>
                  </div>
                </BlockStack>
              </Card>

              {/* Theme Context Integration */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Component Integration</Text>

                  <Text as="p">
                    Components automatically receive theme updates through context:
                  </Text>

                  <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', color: '#f9fafb' }}>
                    <pre style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>
{`// Custom component using theme
function ThemedCard({ children }) {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.md,
        boxShadow: theme.shadows.base,
        border: \`1px solid \${theme.colors.border}\`,
      }}
    >
      {children}
    </div>
  );
}

// Using CSS variables instead
function ThemedButton({ variant = 'primary', children }) {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      style={{
        backgroundColor: \`var(--cin7-color-\${variant})\`,
        color: 'var(--cin7-color-text-on-primary)',
        padding: 'var(--cin7-spacing-sm) var(--cin7-spacing-md)',
        borderRadius: 'var(--cin7-radius-base)',
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}`}</pre>
                  </div>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const BestPractices: Story = {
  parameters: {
    codeVariants: getCodeVariants('themedocumentation', 'bestpractices'),
  },
  render: () => {
    return (
      <Page title="Theming Best Practices" subtitle="Guidelines for effective theme implementation">
        <Layout>
          <Layout.Section>
            <BlockStack gap="600">
              {/* Do's and Don'ts */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Do's and Don'ts</Text>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px', border: '1px solid #86efac' }}>
                      <InlineStack gap="200">
                        <Badge status="success">DO</Badge>
                        <Text variant="headingMd" as="h3">Best Practices</Text>
                      </InlineStack>
                      <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                        <li>Use semantic color names (primary, secondary)</li>
                        <li>Provide light and dark variants</li>
                        <li>Test with high contrast mode</li>
                        <li>Use CSS variables for flexibility</li>
                        <li>Cache theme preferences</li>
                        <li>Provide theme preview</li>
                        <li>Follow WCAG accessibility guidelines</li>
                      </ul>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '1px solid #fca5a5' }}>
                      <InlineStack gap="200">
                        <Badge status="critical">DON'T</Badge>
                        <Text variant="headingMd" as="h3">Common Mistakes</Text>
                      </InlineStack>
                      <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                        <li>Hard-code color values</li>
                        <li>Ignore system preferences</li>
                        <li>Forget hover/active states</li>
                        <li>Use too many custom colors</li>
                        <li>Skip accessibility testing</li>
                        <li>Apply themes partially</li>
                        <li>Mix theme systems</li>
                      </ul>
                    </div>
                  </div>
                </BlockStack>
              </Card>

              {/* Performance Tips */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Performance Optimization</Text>

                  <Banner status="warning">
                    <p>Theme changes trigger a full re-render. Optimize for performance:</p>
                  </Banner>

                  <BlockStack gap="300">
                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <Text variant="headingMd" as="h3">1. Memoize Theme Values</Text>
                      <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fff', borderRadius: '4px' }}>
                        <code style={{ fontSize: '12px' }}>
                          {`const memoizedTheme = useMemo(() => computeTheme(colors), [colors]);`}
                        </code>
                      </div>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <Text variant="headingMd" as="h3">2. Use CSS Variables</Text>
                      <Text as="p" tone="subdued">
                        CSS variables update without React re-renders, improving performance significantly.
                      </Text>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <Text variant="headingMd" as="h3">3. Lazy Load Themes</Text>
                      <div style={{ marginTop: '8px', padding: '12px', backgroundColor: '#fff', borderRadius: '4px' }}>
                        <code style={{ fontSize: '12px' }}>
                          {`const theme = await import(\`./themes/\${themeName}.js\`);`}
                        </code>
                      </div>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <Text variant="headingMd" as="h3">4. Debounce Color Pickers</Text>
                      <Text as="p" tone="subdued">
                        When using color pickers, debounce the onChange handler to avoid excessive updates.
                      </Text>
                    </div>
                  </BlockStack>
                </BlockStack>
              </Card>

              {/* Accessibility */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">Accessibility Considerations</Text>

                  <BlockStack gap="300">
                    <Banner status="info">
                      <p>Always ensure your themes meet WCAG 2.1 AA standards for color contrast.</p>
                    </Banner>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <Text variant="headingMd" as="h3">Contrast Ratios</Text>
                      <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                        <li>Normal text: 4.5:1 minimum</li>
                        <li>Large text: 3:1 minimum</li>
                        <li>UI components: 3:1 minimum</li>
                        <li>Focus indicators: 3:1 minimum</li>
                      </ul>
                    </div>

                    <div style={{ padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                      <Text variant="headingMd" as="h3">Testing Tools</Text>
                      <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                        <li>Chrome DevTools Lighthouse</li>
                        <li>WAVE browser extension</li>
                        <li>Axe accessibility checker</li>
                        <li>Contrast ratio calculators</li>
                      </ul>
                    </div>
                  </BlockStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};