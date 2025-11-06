import type { Meta, StoryObj } from '@storybook/react';
import { ColorPicker, Card, InlineStack, BlockStack, Button, TextField, Label, Popover, Icon } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Components/Forms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ColorPicker allows users to select colors from a predefined palette or enter custom hex values. It\'s commonly used for theme customization, brand color selection, product color options, and any scenario where color selection is needed.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'object',
      description: 'Currently selected color',
    },
    onChange: {
      control: 'function',
      description: 'Callback when color is changed',
    },
    allowGradient: {
      control: 'boolean',
      description: 'Allow gradient selection',
    },
    allowAlpha: {
      control: 'boolean',
      description: 'Allow alpha/transparency selection',
    },
    presets: {
      control: 'array',
      description: 'Predefined color presets',
    },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [color, setColor] = useState({
      hue: 300,
      saturation: 1,
      brightness: 1,
      alpha: 1,
    });

    return (
      <div style={{ width: '320px' }}>
        <ColorPicker
          onChange={setColor}
          color={color}
        />
      </div>
    );
  },
};

export const WithHexInput: Story = {
  render: () => {
    const [color, setColor] = useState({
      hue: 120,
      saturation: 0.8,
      brightness: 0.9,
      alpha: 1,
    });

    const hexValue = `#${Math.round(color.hue).toString(16).padStart(2, '0')}${Math.round(color.saturation * 255).toString(16).padStart(2, '0')}${Math.round(color.brightness * 255).toString(16).padStart(2, '0')}`;

    return (
      <div style={{ width: '320px' }}>
        <ColorPicker
          onChange={setColor}
          color={color}
        />
        <div style={{ marginTop: '16px' }}>
          <TextField
            label="Hex value"
            value={hexValue}
            readOnly
            helpText="Current color in hexadecimal format"
          />
        </div>
      </div>
    );
  },
};

export const WithPresets: Story = {
  render: () => {
    const [color, setColor] = useState({
      hue: 200,
      saturation: 0.8,
      brightness: 0.9,
      alpha: 1,
    });

    const presets = [
      { color: { hue: 0, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 30, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 60, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 120, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 180, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 240, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 300, saturation: 1, brightness: 1, alpha: 1 } },
      { color: { hue: 0, saturation: 0, brightness: 0.5, alpha: 1 } },
    ];

    return (
      <div style={{ width: '320px' }}>
        <ColorPicker
          onChange={setColor}
          color={color}
          presets={presets}
        />
      </div>
    );
  },
};

export const WithAlpha: Story = {
  render: () => {
    const [color, setColor] = useState({
      hue: 280,
      saturation: 0.9,
      brightness: 0.8,
      alpha: 0.7,
    });

    return (
      <div style={{ width: '320px' }}>
        <ColorPicker
          onChange={setColor}
          color={color}
          allowAlpha
        />

        <div style={{ marginTop: '16px' }}>
          <div style={{
            width: '100%',
            height: '60px',
            backgroundColor: `hsla(${color.hue}, ${color.saturation * 100}%, ${color.brightness * 100}%, ${color.alpha})`,
            borderRadius: '8px',
            border: '1px solid #e1e3e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color.brightness > 0.5 ? '#000' : '#fff',
            fontSize: 'var(--font-size-sm)'
          }}>
            Alpha: {Math.round(color.alpha * 100)}%
          </div>
        </div>
      </div>
    );
  },
};

export const ProductColorCustomizer: Story = {
  render: () => {
    const [primaryColor, setPrimaryColor] = useState({
      hue: 220,
      saturation: 0.8,
      brightness: 0.9,
      alpha: 1,
    });

    const [secondaryColor, setSecondaryColor] = useState({
      hue: 30,
      saturation: 0.7,
      brightness: 1,
      alpha: 1,
    });

    const [accentColor, setAccentColor] = useState({
      hue: 0,
      saturation: 1,
      brightness: 0.8,
      alpha: 1,
    });

    const productPresets = [
      {
        name: 'Ocean Blue',
        colors: {
          primary: { hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1 },
          secondary: { hue: 180, saturation: 0.5, brightness: 1, alpha: 1 },
          accent: { hue: 25, saturation: 1, brightness: 0.8, alpha: 1 }
        }
      },
      {
        name: 'Forest Green',
        colors: {
          primary: { hue: 140, saturation: 0.7, brightness: 0.5, alpha: 1 },
          secondary: { hue: 120, saturation: 0.4, brightness: 0.9, alpha: 1 },
          accent: { hue: 30, saturation: 1, brightness: 0.7, alpha: 1 }
        }
      },
      {
        name: 'Sunset Orange',
        colors: {
          primary: { hue: 15, saturation: 0.9, brightness: 1, alpha: 1 },
          secondary: { hue: 45, saturation: 0.6, brightness: 1, alpha: 1 },
          accent: { hue: 340, saturation: 0.8, brightness: 0.8, alpha: 1 }
        }
      },
    ];

    const applyPreset = (preset: typeof productPresets[0]) => {
      setPrimaryColor(preset.colors.primary);
      setSecondaryColor(preset.colors.secondary);
      setAccentColor(preset.colors.accent);
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-lg)' }}>Product Color Scheme</h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Presets:
              </h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {productPresets.map((preset, index) => (
                  <Button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    size="slim"
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>

            <BlockStack gap="400">
              <div>
                <Label>Primary Color</Label>
                <ColorPicker
                  onChange={setPrimaryColor}
                  color={primaryColor}
                />
              </div>

              <div>
                <Label>Secondary Color</Label>
                <ColorPicker
                  onChange={setSecondaryColor}
                  color={secondaryColor}
                />
              </div>

              <div>
                <Label>Accent Color</Label>
                <ColorPicker
                  onChange={setAccentColor}
                  color={accentColor}
                />
              </div>
            </BlockStack>

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Preview:
              </h4>
              <div style={{
                padding: '20px',
                borderRadius: '8px',
                background: `linear-gradient(135deg,
                  hsla(${primaryColor.hue}, ${primaryColor.saturation * 100}%, ${primaryColor.brightness * 100}%, 0.1) 0%,
                  hsla(${secondaryColor.hue}, ${secondaryColor.saturation * 100}%, ${secondaryColor.brightness * 100}%, 0.1) 100%)`,
                border: `2px solid hsla(${primaryColor.hue}, ${primaryColor.saturation * 100}%, ${primaryColor.brightness * 100}%, 1)`
              }}>
                <div style={{
                  backgroundColor: `hsla(${primaryColor.hue}, ${primaryColor.saturation * 100}%, ${primaryColor.brightness * 100}%, 1)`,
                  color: 'white',
                  padding: '12px 16px',
                  borderRadius: '4px',
                  marginBottom: '12px',
                  textAlign: 'center',
                  fontWeight: 'var(--font-weight-semibold)'
                }}>
                  Product Title
                </div>
                <div style={{
                  backgroundColor: `hsla(${secondaryColor.hue}, ${secondaryColor.saturation * 100}%, ${secondaryColor.brightness * 100}%, 1)`,
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: 'var(--font-size-sm)'
                }}>
                  $29.99
                </div>
                <div style={{
                  marginTop: '12px',
                  display: 'flex',
                  gap: '8px'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: `hsla(${accentColor.hue}, ${accentColor.saturation * 100}%, ${accentColor.brightness * 100}%, 1)`
                  }} />
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: `hsla(${primaryColor.hue}, ${primaryColor.saturation * 100}%, ${primaryColor.brightness * 100}%, 0.7)`
                  }} />
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: `hsla(${secondaryColor.hue}, ${secondaryColor.saturation * 100}%, ${secondaryColor.brightness * 100}%, 0.7)`
                  }} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const ThemeCustomizer: Story = {
  render: () => {
    const [theme, setTheme] = useState({
      primary: { hue: 220, saturation: 0.8, brightness: 0.9, alpha: 1 },
      secondary: { hue: 210, saturation: 0.5, brightness: 0.95, alpha: 1 },
      background: { hue: 0, saturation: 0, brightness: 1, alpha: 1 },
      text: { hue: 0, saturation: 0, brightness: 0.2, alpha: 1 },
      success: { hue: 120, saturation: 0.7, brightness: 0.9, alpha: 1 },
      warning: { hue: 45, saturation: 1, brightness: 0.9, alpha: 1 },
      error: { hue: 0, saturation: 0.8, brightness: 0.9, alpha: 1 },
    });

    const predefinedThemes = [
      {
        name: 'Light',
        colors: {
          primary: { hue: 220, saturation: 0.8, brightness: 0.9, alpha: 1 },
          secondary: { hue: 210, saturation: 0.5, brightness: 0.95, alpha: 1 },
          background: { hue: 0, saturation: 0, brightness: 1, alpha: 1 },
          text: { hue: 0, saturation: 0, brightness: 0.2, alpha: 1 },
          success: { hue: 120, saturation: 0.7, brightness: 0.9, alpha: 1 },
          warning: { hue: 45, saturation: 1, brightness: 0.9, alpha: 1 },
          error: { hue: 0, saturation: 0.8, brightness: 0.9, alpha: 1 },
        }
      },
      {
        name: 'Dark',
        colors: {
          primary: { hue: 210, saturation: 0.7, brightness: 0.8, alpha: 1 },
          secondary: { hue: 220, saturation: 0.4, brightness: 0.3, alpha: 1 },
          background: { hue: 220, saturation: 0.3, brightness: 0.15, alpha: 1 },
          text: { hue: 0, saturation: 0, brightness: 0.95, alpha: 1 },
          success: { hue: 120, saturation: 0.6, brightness: 0.8, alpha: 1 },
          warning: { hue: 35, saturation: 0.9, brightness: 0.8, alpha: 1 },
          error: { hue: 0, saturation: 0.7, brightness: 0.8, alpha: 1 },
        }
      },
    ];

    const applyTheme = (themeColors: typeof predefinedThemes[0]['colors']) => {
      setTheme(themeColors);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-lg)' }}>Theme Customizer</h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Predefined Themes:
              </h4>
              <InlineStack gap="200">
                {predefinedThemes.map((predefinedTheme, index) => (
                  <Button
                    key={index}
                    onClick={() => applyTheme(predefinedTheme.colors)}
                    size="slim"
                  >
                    {predefinedTheme.name}
                  </Button>
                ))}
              </InlineStack>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <BlockStack gap="300">
                <div>
                  <Label>Primary</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, primary: color }))}
                    color={theme.primary}
                  />
                </div>
                <div>
                  <Label>Secondary</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, secondary: color }))}
                    color={theme.secondary}
                  />
                </div>
                <div>
                  <Label>Background</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, background: color }))}
                    color={theme.background}
                  />
                </div>
                <div>
                  <Label>Text</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, text: color }))}
                    color={theme.text}
                  />
                </div>
              </BlockStack>

              <BlockStack gap="300">
                <div>
                  <Label>Success</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, success: color }))}
                    color={theme.success}
                  />
                </div>
                <div>
                  <Label>Warning</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, warning: color }))}
                    color={theme.warning}
                  />
                </div>
                <div>
                  <Label>Error</Label>
                  <ColorPicker
                    onChange={(color) => setTheme(prev => ({ ...prev, error: color }))}
                    color={theme.error}
                  />
                </div>
              </BlockStack>
            </div>

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Theme Preview:
              </h4>
              <div style={{
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: `hsla(${theme.background.hue}, ${theme.background.saturation * 100}%, ${theme.background.brightness * 100}%, ${theme.background.alpha})`,
                border: `1px solid hsla(${theme.secondary.hue}, ${theme.secondary.saturation * 100}%, ${theme.secondary.brightness * 100}%, 0.5)`
              }}>
                <h4 style={{
                  margin: '0 0 12px 0',
                  color: `hsla(${theme.text.hue}, ${theme.text.saturation * 100}%, ${theme.text.brightness * 100}%, ${theme.text.alpha})`
                }}>
                  Sample UI Elements
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{
                    padding: '8px 12px',
                    backgroundColor: `hsla(${theme.primary.hue}, ${theme.primary.saturation * 100}%, ${theme.primary.brightness * 100}%, 0.1)`,
                    color: `hsla(${theme.primary.hue}, ${theme.primary.saturation * 100}%, ${theme.primary.brightness * 100}%, 1)`,
                    borderRadius: '4px',
                    border: `1px solid hsla(${theme.primary.hue}, ${theme.primary.saturation * 100}%, ${theme.primary.brightness * 100}%, 0.3)`,
                    fontSize: 'var(--font-size-sm)'
                  }}>
                    Primary Action
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: `hsla(${theme.success.hue}, ${theme.success.saturation * 100}%, ${theme.success.brightness * 100}%, 0.2)`,
                      color: `hsla(${theme.success.hue}, ${theme.success.saturation * 100}%, ${theme.success.brightness * 100}%, 1)`,
                      borderRadius: '4px',
                      fontSize: 'var(--font-size-xs)'
                    }}>
                      ✓ Success
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: `hsla(${theme.warning.hue}, ${theme.warning.saturation * 100}%, ${theme.warning.brightness * 100}%, 0.2)`,
                      color: `hsla(${theme.warning.hue}, ${theme.warning.saturation * 100}%, ${theme.warning.brightness * 100}%, 1)`,
                      borderRadius: '4px',
                      fontSize: 'var(--font-size-xs)'
                    }}>
                      ⚠ Warning
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: `hsla(${theme.error.hue}, ${theme.error.saturation * 100}%, ${theme.error.brightness * 100}%, 0.2)`,
                      color: `hsla(${theme.error.hue}, ${theme.error.saturation * 100}%, ${theme.error.brightness * 100}%, 1)`,
                      borderRadius: '4px',
                      fontSize: 'var(--font-size-xs)'
                    }}>
                      ✕ Error
                    </div>
                  </div>

                  <div style={{
                    padding: '12px',
                    backgroundColor: `hsla(${theme.secondary.hue}, ${theme.secondary.saturation * 100}%, ${theme.secondary.brightness * 100}%, 0.3)`,
                    borderRadius: '4px',
                    fontSize: 'var(--font-size-sm)',
                    color: `hsla(${theme.text.hue}, ${theme.text.saturation * 100}%, ${theme.text.brightness * 100}%, ${theme.text.alpha})`
                  }}>
                    Secondary content area with some text that demonstrates the theme colors.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const BrandColorSelector: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState({
      hue: 200,
      saturation: 0.8,
      brightness: 0.9,
      alpha: 1,
    });

    const [savedColors, setSavedColors] = useState<Array<{name: string; color: any}>>([]);

    const brandColors = [
      { name: 'Corporate Blue', color: { hue: 210, saturation: 0.8, brightness: 0.9, alpha: 1 } },
      { name: 'Accent Red', color: { hue: 0, saturation: 0.9, brightness: 0.8, alpha: 1 } },
      { name: 'Nature Green', color: { hue: 140, saturation: 0.7, brightness: 0.6, alpha: 1 } },
      { name: 'Energy Orange', color: { hue: 30, saturation: 1, brightness: 0.9, alpha: 1 } },
      { name: 'Royal Purple', color: { hue: 270, saturation: 0.6, brightness: 0.7, alpha: 1 } },
    ];

    const saveColor = () => {
      const colorName = `Color ${savedColors.length + 1}`;
      setSavedColors(prev => [...prev, { name: colorName, color: selectedColor }]);
    };

    const applyBrandColor = (brandColor: typeof brandColors[0]) => {
      setSelectedColor(brandColor.color);
    };

    const deleteSavedColor = (index: number) => {
      setSavedColors(prev => prev.filter((_, i) => i !== index));
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-lg)' }}>Brand Color Selector</h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Brand Colors:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '8px' }}>
                {brandColors.map((brandColor, index) => (
                  <button
                    key={index}
                    onClick={() => applyBrandColor(brandColor)}
                    style={{
                      padding: '12px 8px',
                      border: '1px solid #e1e3e5',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '4px',
                      backgroundColor: `hsla(${brandColor.color.hue}, ${brandColor.color.saturation * 100}%, ${brandColor.color.brightness * 100}%, ${brandColor.color.alpha})`,
                      margin: '0 auto 8px'
                    }} />
                    <div style={{ fontSize: 'var(--font-size-xs)', color: '#374151' }}>{brandColor.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <ColorPicker
                onChange={setSelectedColor}
                color={selectedColor}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Current Selection:
                </h4>
                <Button size="slim" onClick={saveColor}>
                  Save Color
                </Button>
              </div>
              <div style={{
                padding: '16px',
                border: '1px solid #e1e3e5',
                borderRadius: '6px',
                backgroundColor: 'white'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '6px',
                    backgroundColor: `hsla(${selectedColor.hue}, ${selectedColor.saturation * 100}%, ${selectedColor.brightness * 100}%, ${selectedColor.alpha})`,
                    border: '1px solid #e1e3e5'
                  }} />
                  <div>
                    <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: '4px' }}>
                      HSL({Math.round(selectedColor.hue)}, {Math.round(selectedColor.saturation * 100)}%, {Math.round(selectedColor.brightness * 100)}%)
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280' }}>
                      Alpha: {Math.round(selectedColor.alpha * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {savedColors.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                  Saved Colors:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
                  {savedColors.map((savedColor, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px',
                        border: '1px solid #e1e3e5',
                        borderRadius: '6px',
                        backgroundColor: 'white',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedColor(savedColor.color)}
                    >
                      <div style={{
                        width: '100%',
                        height: '40px',
                        borderRadius: '4px',
                        backgroundColor: `hsla(${savedColor.color.hue}, ${savedColor.color.saturation * 100}%, ${savedColor.color.brightness * 100}%, ${savedColor.color.alpha})`,
                        marginBottom: '8px'
                      }} />
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: '#374151' }}>{savedColor.name}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSavedColor(index);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#991b1b',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-base)',
                            padding: '0',
                            lineHeight: '1'
                          }}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  },
};

export const GradientCreator: Story = {
  render: () => {
    const [startColor, setStartColor] = useState({
      hue: 280,
      saturation: 0.8,
      brightness: 0.9,
      alpha: 1,
    });

    const [endColor, setEndColor] = useState({
      hue: 200,
      saturation: 0.7,
      brightness: 0.8,
      alpha: 1,
    });

    const [angle, setAngle] = useState(45);

    const gradientPresets = [
      { name: 'Sunset', start: { hue: 15, saturation: 1, brightness: 1, alpha: 1 }, end: { hue: 340, saturation: 0.8, brightness: 0.7, alpha: 1 } },
      { name: 'Ocean', start: { hue: 200, saturation: 0.8, brightness: 0.9, alpha: 1 }, end: { hue: 180, saturation: 0.6, brightness: 0.7, alpha: 1 } },
      { name: 'Forest', start: { hue: 120, saturation: 0.7, brightness: 0.8, alpha: 1 }, end: { hue: 60, saturation: 0.8, brightness: 0.6, alpha: 1 } },
      { name: 'Berry', start: { hue: 320, saturation: 0.8, brightness: 0.9, alpha: 1 }, end: { hue: 270, saturation: 0.6, brightness: 0.7, alpha: 1 } },
    ];

    const applyPreset = (preset: typeof gradientPresets[0]) => {
      setStartColor(preset.start);
      setEndColor(preset.end);
    };

    const gradientStyle = {
      background: `linear-gradient(${angle}deg,
        hsla(${startColor.hue}, ${startColor.saturation * 100}%, ${startColor.brightness * 100}%, ${startColor.alpha}) 0%,
        hsla(${endColor.hue}, ${endColor.saturation * 100}%, ${endColor.brightness * 100}%, ${endColor.alpha}) 100%)`
    };

    return (
      <div style={{ maxWidth: '500px' }}>
        <Card>
          <div style={{ padding: '20px' }}>
            <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-lg)' }}>Gradient Creator</h3>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Presets:
              </h4>
              <InlineStack gap="200">
                {gradientPresets.map((preset, index) => (
                  <Button
                    key={index}
                    onClick={() => applyPreset(preset)}
                    size="slim"
                  >
                    {preset.name}
                  </Button>
                ))}
              </InlineStack>
            </div>

            <BlockStack gap="300">
              <div>
                <Label>Start Color</Label>
                <ColorPicker
                  onChange={setStartColor}
                  color={startColor}
                />
              </div>

              <div>
                <Label>End Color</Label>
                <ColorPicker
                  onChange={setEndColor}
                  color={endColor}
                />
              </div>

              <div>
                <TextField
                  label="Angle"
                  type="number"
                  value={angle.toString()}
                  onChange={(value) => setAngle(parseInt(value) || 0)}
                  min={0}
                  max={360}
                  suffix="°"
                  helpText="Gradient direction angle"
                />
              </div>
            </BlockStack>

            <div style={{ marginTop: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Preview:
              </h4>
              <div style={{
                height: '120px',
                borderRadius: '8px',
                border: '1px solid #e1e3e5',
                ...gradientStyle
              }} />

              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '6px' }}>
                <code style={{ fontSize: 'var(--font-size-xs)', wordBreak: 'break-all' }}>
                  background: linear-gradient({angle}deg,
                  hsl({Math.round(startColor.hue)}, {Math.round(startColor.saturation * 100)}%, {Math.round(startColor.brightness * 100)}%) 0%,
                  hsl({Math.round(endColor.hue)}, {Math.round(endColor.saturation * 100)}%, {Math.round(endColor.brightness * 100)}%) 100%);
                </code>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  },
};

export const ColorPickerInPopover: Story = {
  render: () => {
    const [popoverActive, setPopoverActive] = useState(false);
    const [selectedColor, setSelectedColor] = useState({
      hue: 200,
      saturation: 0.8,
      brightness: 0.9,
      alpha: 1,
    });

    const togglePopoverActive = () => {
      setPopoverActive(!popoverActive);
    };

    const activator = (
      <Button onClick={togglePopoverActive} disclosure="down">
        Choose Color
      </Button>
    );

    return (
      <div style={{ width: '300px' }}>
        <Popover
          active={popoverActive}
          activator={activator}
          onClose={togglePopoverActive}
        >
          <div style={{ padding: '16px' }}>
            <ColorPicker
              onChange={setSelectedColor}
              color={selectedColor}
            />
          </div>
        </Popover>

        <div style={{ marginTop: '16px' }}>
          <div style={{
            padding: '12px',
            border: '1px solid #e1e3e5',
            borderRadius: '6px',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              backgroundColor: `hsla(${selectedColor.hue}, ${selectedColor.saturation * 100}%, ${selectedColor.brightness * 100}%, ${selectedColor.alpha})`,
              border: '1px solid #e1e3e5'
            }} />
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Selected Color
              </div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280' }}>
                HSL({Math.round(selectedColor.hue)}, {Math.round(selectedColor.saturation * 100)}%, {Math.round(selectedColor.brightness * 100)}%)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};