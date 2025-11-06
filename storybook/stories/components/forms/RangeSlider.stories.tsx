import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider, Card, BlockStack, InlineStack, Text, Badge, Button } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Forms/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'RangeSlider allows users to select a value range along a slider track. Perfect for price ranges, quantity ranges, or any numerical range selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the range slider',
    },
    value: {
      control: { type: 'object' },
      description: 'Current range values [min, max]',
    },
    min: {
      control: 'number',
      description: 'Minimum value of the range',
    },
    max: {
      control: 'number',
      description: 'Maximum value of the range',
    },
    step: {
      control: 'number',
      description: 'Step increment for values',
    },
    output: {
      control: 'boolean',
      description: 'Whether to display output values',
    },
    prefix: {
      control: 'text',
      description: 'Text prefix for output values',
    },
    suffix: {
      control: 'text',
      description: 'Text suffix for output values',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the range slider is disabled',
    },
    helpText: {
      control: 'text',
      description: 'Help text to display below the slider',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
  },
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Price range',
    value: [20, 80],
    min: 0,
    max: 100,
    step: 1,
    output: true,
    prefix: '$',
  },
};

export const WithoutOutput: Story = {
  args: {
    label: 'Experience level',
    value: [2, 7],
    min: 0,
    max: 10,
    step: 1,
    output: false,
  },
};

export const WithStep: Story = {
  args: {
    label: 'Quantity range',
    value: [50, 200],
    min: 0,
    max: 500,
    step: 10,
    output: true,
    suffix: ' items',
  },
};

export const WithHelpText: Story = {
  args: {
    label: 'Budget allocation',
    value: [1000, 5000],
    min: 0,
    max: 10000,
    step: 100,
    output: true,
    prefix: '$',
    helpText: 'Set your monthly advertising budget range',
  },
};

export const WithError: Story = {
  args: {
    label: 'Inventory threshold',
    value: [10, 50],
    min: 0,
    max: 100,
    step: 1,
    output: true,
    suffix: ' units',
    error: 'Minimum stock level must be at least 20 units',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Price range (locked)',
    value: [25, 75],
    min: 0,
    max: 100,
    step: 5,
    output: true,
    prefix: '$',
    disabled: true,
  },
};

export const PriceFilter: Story = {
  render: () => {
    const [priceRange, setPriceRange] = React.useState([20, 80]);
    const [applyCount, setApplyCount] = React.useState(0);

    const handleRangeChange = (value: [number, number]) => {
      setPriceRange(value);
    };

    const handleApply = () => {
      setApplyCount(prev => prev + 1);
      console.log('Applied price range:', priceRange);
    };

    return (
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Price Filter</h3>
                <Text as="p" tone="subdued">Filter products by price range</Text>
              </div>

              <RangeSlider
                label="Price range"
                value={priceRange}
                min={0}
                max={200}
                step={5}
                output
                prefix="$"
                helpText="Drag the handles to set your price range"
                onChange={handleRangeChange}
              />

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <BlockStack gap="200">
                  <Text as="p">Current selection:</Text>
                  <InlineStack gap="200">
                    <Badge tone="info">Min: ${priceRange[0]}</Badge>
                    <Badge tone="success">Max: ${priceRange[1]}</Badge>
                  </InlineStack>
                  <Text variant="bodySm" as="p">
                    Range width: ${priceRange[1] - priceRange[0]}
                  </Text>
                </BlockStack>
              </div>

              <InlineStack gap="200">
                <Button variant="primary" onClick={handleApply}>
                  Apply Filter {applyCount > 0 && `(${applyCount})`}
                </Button>
                <Button variant="plain" onClick={() => setPriceRange([20, 80])}>
                  Reset
                </Button>
              </InlineStack>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const DateRangePicker: Story = {
  render: () => {
    const [dayRange, setDayRange] = React.useState([7, 30]);
    const [selectedPreset, setSelectedPreset] = React.useState('');

    const presets = [
      { label: 'Last 7 days', value: [0, 7] },
      { label: 'Last 30 days', value: [0, 30] },
      { label: 'Last 90 days', value: [0, 90] },
      { label: 'Last 6 months', value: [0, 180] },
      { label: 'Last year', value: [0, 365] },
    ];

    const handleRangeChange = (value: [number, number]) => {
      setDayRange(value);
      setSelectedPreset('');
    };

    const applyPreset = (preset: [number, number], label: string) => {
      setDayRange(preset);
      setSelectedPreset(label);
    };

    const today = new Date();
    const startDate = new Date(today.getTime() - (dayRange[1] * 24 * 60 * 60 * 1000));
    const endDate = new Date(today.getTime() - (dayRange[0] * 24 * 60 * 60 * 1000));

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Date Range Selector</h3>
                <Text as="p" tone="subdued">Select a date range for your report</Text>
              </div>

              <RangeSlider
                label="Days from today"
                value={dayRange}
                min={0}
                max={365}
                step={1}
                output
                suffix=" days ago"
                helpText="Select the range of days to include in the report"
                onChange={handleRangeChange}
              />

              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: "14px" }}>Quick presets:</h4>
                <InlineStack gap="200" wrap>
                  {presets.map((preset) => (
                    <Button
                      key={preset.label}
                      size="small"
                      variant={selectedPreset === preset.label ? 'primary' : 'plain'}
                      onClick={() => applyPreset(preset.value as [number, number], preset.label)}
                    >
                      {preset.label}
                    </Button>
                  ))}
                </InlineStack>
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#e3f2fd',
                borderRadius: '8px',
                border: '1px solid #90caf9'
              }}>
                <BlockStack gap="100">
                  <Text as="p" fontWeight="600">Selected date range:</Text>
                  <Text variant="bodySm" as="p">
                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                  </Text>
                  <Text variant="bodySm" as="p" tone="subdued">
                    Total days: {dayRange[1] - dayRange[0] + 1}
                  </Text>
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const ProductVariants: Story = {
  render: () => {
    const [variants, setVariants] = React.useState([
      { name: 'T-Shirt', min: 1, max: 100, price: 19.99 },
      { name: 'Hoodie', min: 1, max: 50, price: 49.99 },
      { name: 'Jeans', min: 1, max: 30, price: 79.99 },
    ]);

    const updateVariantRange = (index: number, field: 'min' | 'max', value: number) => {
      setVariants(prev => {
        const newVariants = [...prev];
        newVariants[index] = { ...newVariants[index], [field]: value };
        return newVariants;
      });
    };

    const getTotalValue = () => {
      return variants.reduce((total, variant) => {
        const quantity = variant.max - variant.min + 1;
        return total + (quantity * variant.price);
      }, 0);
    };

    return (
      <div style={{ maxWidth: '700px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Product Inventory Planning</h3>
                <Text as="p" tone="subdued">Set the minimum and maximum stock levels for each product variant</Text>
              </div>

              {variants.map((variant, index) => (
                <div key={index} style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e1e3e5'
                }}>
                  <BlockStack gap="300">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ margin: 0 }}>{variant.name}</h4>
                      <Badge tone="info">${variant.price}</Badge>
                    </div>

                    <RangeSlider
                      label={`Stock range for ${variant.name}`}
                      value={[variant.min, variant.max]}
                      min={0}
                      max={200}
                      step={1}
                      output
                      suffix=" units"
                      onChange={(value: [number, number]) => {
                        updateVariantRange(index, 'min', value[0]);
                        updateVariantRange(index, 'max', value[1]);
                      }}
                    />

                    <InlineStack gap="400">
                      <Text variant="bodySm" as="span">
                        Min: {variant.min} units
                      </Text>
                      <Text variant="bodySm" as="span">
                        Max: {variant.max} units
                      </Text>
                      <Text variant="bodySm" as="span">
                        Range: {variant.max - variant.min + 1} units
                      </Text>
                    </InlineStack>
                  </BlockStack>
                </div>
              ))}

              <div style={{
                padding: '16px',
                backgroundColor: '#f0f9ff',
                borderRadius: '8px',
                border: '1px solid #bfdbfe'
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">Summary:</Text>
                  <Text variant="bodySm" as="p">
                    Total inventory value: ${getTotalValue().toFixed(2)}
                  </Text>
                  <Text variant="bodySm" as="p">
                    Total units: {variants.reduce((sum, v) => sum + (v.max - v.min + 1), 0)}
                  </Text>
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const MultiRangeComparison: Story = {
  render: () => {
    const [ranges, setRanges] = React.useState([
      { name: 'Competitor A', color: '#FF6B6B', value: [30, 70] },
      { name: 'Competitor B', color: '#4ECDC4', value: [40, 80] },
      { name: 'Our Product', color: '#45B7D1', value: [20, 90] },
    ]);

    const updateRange = (index: number, value: [number, number]) => {
      setRanges(prev => {
        const newRanges = [...prev];
        newRanges[index] = { ...newRanges[index], value };
        return newRanges;
      });
    };

    const findOverlap = () => {
      const maxMin = Math.max(...ranges.map(r => r.value[0]));
      const minMax = Math.min(...ranges.map(r => r.value[1]));
      return maxMin <= minMax ? [maxMin, minMax] : null;
    };

    const overlap = findOverlap();

    return (
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Market Position Analysis</h3>
                <Text as="p" tone="subdued">Compare market positioning ranges across competitors</Text>
              </div>

              {ranges.map((range, index) => (
                <div key={index} style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: `2px solid ${range.color}20`
                }}>
                  <BlockStack gap="300">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: range.color,
                        borderRadius: '50%'
                      }} />
                      <h4 style={{ margin: 0 }}>{range.name}</h4>
                    </div>

                    <RangeSlider
                      label={`${range.name} positioning`}
                      value={range.value}
                      min={0}
                      max={100}
                      step={1}
                      output
                      suffix="%"
                      onChange={(value: [number, number]) => updateRange(index, value)}
                    />
                  </BlockStack>
                </div>
              ))}

              <div style={{
                padding: '16px',
                backgroundColor: overlap ? '#e8f5e8' : '#ffebee',
                borderRadius: '8px',
                border: `1px solid ${overlap ? '#4CAF50' : '#F44336'}`
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">Market Overlap Analysis:</Text>
                  {overlap ? (
                    <>
                      <Text variant="bodySm" as="p" tone="success">
                        ✓ Market overlap detected: {overlap[0]}% - {overlap[1]}%
                      </Text>
                      <Text variant="bodySm" as="p">
                        All products compete in this price range segment
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text variant="bodySm" as="p" tone="critical">
                        ✗ No market overlap between all competitors
                    </Text>
                      <Text variant="bodySm" as="p">
                        Each product occupies different market segments
                      </Text>
                    </>
                  )}
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};

export const AdvancedControls: Story = {
  render: () => {
    const [settings, setSettings] = React.useState({
      volume: [30, 70],
      brightness: [40, 80],
      contrast: [20, 60],
      saturation: [50, 90],
    });

    const updateSetting = (key: string, value: [number, number]) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    const resetAll = () => {
      setSettings({
        volume: [30, 70],
        brightness: [40, 80],
        contrast: [20, 60],
        saturation: [50, 90],
      });
    };

    const randomize = () => {
      setSettings({
        volume: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50) + 50],
        brightness: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50) + 50],
        contrast: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50) + 50],
        saturation: [Math.floor(Math.random() * 50), Math.floor(Math.random() * 50) + 50],
      });
    };

    return (
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="400">
              <div>
                <h3 style={{ margin: '0 0 16px 0' }}>Advanced Settings</h3>
                <Text as="p" tone="subdued">Fine-tune your experience with these advanced controls</Text>
              </div>

              {Object.entries(settings).map(([key, value]) => (
                <div key={key}>
                  <RangeSlider
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={value}
                    min={0}
                    max={100}
                    step={1}
                    output
                    suffix="%"
                    helpText={`Adjust the ${key} range for optimal experience`}
                    onChange={(newValue: [number, number]) => updateSetting(key, newValue)}
                  />
                </div>
              ))}

              <InlineStack gap="200">
                <Button variant="primary" onClick={randomize}>
                  Randomize
                </Button>
                <Button variant="plain" onClick={resetAll}>
                  Reset to Defaults
                </Button>
              </InlineStack>

              <div style={{
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e1e3e5'
              }}>
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">Current Settings Profile:</Text>
                  {Object.entries(settings).map(([key, value]) => (
                    <InlineStack key={key} gap="200">
                      <Text variant="bodySm" as="span" style={{ width: '80px' }}>
                        {key}:
                      </Text>
                      <Text variant="bodySm" as="span">
                        {value[0]}% - {value[1]}%
                      </Text>
                      <Badge tone="info" size="small">
                        {value[1] - value[0]}% range
                      </Badge>
                    </InlineStack>
                  ))}
                </BlockStack>
              </div>
            </BlockStack>
          </div>
        </Card>
      </div>
    );
  },
};