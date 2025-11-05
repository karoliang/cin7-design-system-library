import type { Meta, StoryObj } from '@storybook/react';
import { Layer, Button, Text, Card, Popover, Tooltip, Modal } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Overlays/Layer',
  component: Layer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Layer is a utility component that manages stacking contexts and z-index for overlay components. It ensures proper layering of modals, popovers, and other floating elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Layer content',
    },
    zIndex: {
      control: 'number',
      description: 'Custom z-index value',
    },
    local: {
      control: 'boolean',
      description: 'Create local stacking context',
    },
  },
} satisfies Meta<typeof Layer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ height: '300px', position: 'relative' }}>
      <Layer>
        <div style={{
          padding: '20px',
          backgroundColor: '#f6f6f7',
          borderRadius: '8px',
          border: '2px solid #007ace'
        }}>
          <Text variant="headingMd">Default Layer</Text>
          <Text variant="bodyMd">This content is wrapped in a Layer component with default z-index.</Text>
        </div>
      </Layer>
    </div>
  ),
};

export const MultipleLayers: Story = {
  render: () => {
    const [activeLayer, setActiveLayer] = React.useState<string | null>(null);

    return (
      <div style={{ height: '400px', position: 'relative', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Button onClick={() => setActiveLayer('bottom')}>
            Show Bottom Layer
          </Button>
          <Button onClick={() => setActiveLayer('middle')}>
            Show Middle Layer
          </Button>
          <Button onClick={() => setActiveLayer('top')}>
            Show Top Layer
          </Button>
        </div>

        {/* Bottom Layer */}
        <Layer zIndex={100}>
          {activeLayer === 'bottom' && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(245, 246, 247, 0.9)',
              padding: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #ddd'
            }}>
              <Card sectioned>
                <Text variant="headingMd">Bottom Layer (z-index: 100)</Text>
                <Text variant="bodyMd">This is the lowest layer in the stack.</Text>
                <Button onClick={() => setActiveLayer(null)}>Close</Button>
              </Card>
            </div>
          )}
        </Layer>

        {/* Middle Layer */}
        <Layer zIndex={200}>
          {activeLayer === 'middle' && (
            <div style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              right: '20%',
              bottom: '20%',
              backgroundColor: '#fff',
              padding: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #007ace',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}>
              <Card sectioned>
                <Text variant="headingMd">Middle Layer (z-index: 200)</Text>
                <Text variant="bodyMd">This layer sits above the bottom layer.</Text>
                <Button onClick={() => setActiveLayer(null)}>Close</Button>
              </Card>
            </div>
          )}
        </Layer>

        {/* Top Layer */}
        <Layer zIndex={300}>
          {activeLayer === 'top' && (
            <div style={{
              position: 'absolute',
              top: '30%',
              left: '30%',
              right: '30%',
              bottom: '30%',
              backgroundColor: '#f6f6f7',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px solid #5c5c5c',
              boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
            }}>
              <Card sectioned>
                <Text variant="headingMd">Top Layer (z-index: 300)</Text>
                <Text variant="bodyMd">This is the highest layer in the stack.</Text>
                <Button onClick={() => setActiveLayer(null)}>Close</Button>
              </Card>
            </div>
          )}
        </Layer>
      </div>
    );
  },
};

export const LayerWithPopover: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);
    const toggleActive = () => setActive(!active);

    const activator = (
      <Button onClick={toggleActive}>Open Layered Popover</Button>
    );

    return (
      <div style={{ height: '300px', padding: '40px' }}>
        <Layer>
          <div style={{ marginBottom: '20px' }}>
            <Text variant="headingMd">Layer with Popover</Text>
            <Text variant="bodyMd">The popover will be properly layered above other content.</Text>
          </div>

          <Popover
            active={active}
            activator={activator}
            onClose={toggleActive}
          >
            <div style={{ padding: '16px' }}>
              <Text variant="bodyMd">This popover is wrapped in a Layer component, ensuring proper z-index management.</Text>
            </div>
          </Popover>
        </Layer>
      </div>
    );
  },
};

export const LocalStackingContext: Story = {
  render: () => {
    const [showLocalContent, setShowLocalContent] = React.useState(false);

    return (
      <div style={{ height: '400px', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Text variant="headingMd">Local Stacking Context</Text>
          <Button onClick={() => setShowLocalContent(!showLocalContent)}>
            Toggle Local Layer
          </Button>

          <div style={{
            border: '2px solid #ddd',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            minHeight: '200px',
            position: 'relative'
          }}>
            <Text variant="bodyMd">Parent container with local stacking context:</Text>

            <Layer local>
              {showLocalContent && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  backgroundColor: '#fff',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '2px solid #007ace',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  zIndex: 100
                }}>
                  <Text variant="headingSm">Local Layer</Text>
                  <Text variant="bodySm">This layer only affects stacking within its parent container.</Text>
                </div>
              )}
            </Layer>

            <div style={{ marginTop: '40px' }}>
              <Text variant="bodyMd">This content stays below the local layer.</Text>
              <Button size="small">Button Below</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const LayeredTooltips: Story = {
  render: () => {
    return (
      <div style={{ height: '300px', padding: '40px' }}>
        <Layer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Text variant="headingMd">Layered Tooltips</Text>
            <Text variant="bodyMd">Tooltips within a Layer are properly positioned.</Text>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <Tooltip content="First tooltip in layer">
                <Button>Tooltip 1</Button>
              </Tooltip>

              <Tooltip content="Second tooltip in layer">
                <Button>Tooltip 2</Button>
              </Tooltip>

              <Tooltip content="Third tooltip in layer">
                <Button>Tooltip 3</Button>
              </Tooltip>
            </div>
          </div>
        </Layer>
      </div>
    );
  },
};

export const CustomZIndex: Story = {
  render: () => {
    const [layers, setLayers] = React.useState<Array<{id: string, zIndex: number}>>([]);

    const addLayer = () => {
      const newZIndex = layers.length > 0 ? Math.max(...layers.map(l => l.zIndex)) + 100 : 100;
      setLayers([...layers, { id: `layer-${Date.now()}`, zIndex: newZIndex }]);
    };

    const removeLayer = (id: string) => {
      setLayers(layers.filter(layer => layer.id !== id));
    };

    return (
      <div style={{ height: '400px', padding: '20px', position: 'relative' }}>
        <div style={{ marginBottom: '20px' }}>
          <Button onClick={addLayer}>Add Layer with Custom Z-Index</Button>
        </div>

        {layers.map((layer, index) => (
          <Layer key={layer.id} zIndex={layer.zIndex}>
            <div
              style={{
                position: 'absolute',
                top: `${80 + index * 20}px`,
                left: `${20 + index * 20}px`,
                right: `${20 + index * 20}px`,
                backgroundColor: index % 2 === 0 ? '#fff' : '#f6f6f7',
                padding: '20px',
                borderRadius: '8px',
                border: `2px solid ${index % 2 === 0 ? '#007ace' : '#5c5c5c'}`,
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text variant="headingSm">Layer {index + 1}</Text>
                  <Text variant="bodySm">Z-Index: {layer.zIndex}</Text>
                </div>
                <Button size="small" onClick={() => removeLayer(layer.id)}>
                  Remove
                </Button>
              </div>
            </div>
          </Layer>
        ))}

        {layers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Text variant="bodyMd">Click "Add Layer" to create layers with custom z-index values.</Text>
          </div>
        )}
      </div>
    );
  },
};

export const LayerWithModal: Story = {
  render: () => {
    const [modalActive, setModalActive] = React.useState(false);
    const [layerActive, setLayerActive] = React.useState(false);

    return (
      <div style={{ height: '400px', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={() => setLayerActive(true)}>
              Show Layer Content
            </Button>
            <Button onClick={() => setModalActive(true)}>
              Open Modal
            </Button>
          </div>

          {/* Layer Content */}
          <Layer zIndex={150}>
            {layerActive && (
              <div style={{
                position: 'absolute',
                top: '100px',
                left: '20px',
                right: '20px',
                backgroundColor: '#f6f6f7',
                padding: '20px',
                borderRadius: '8px',
                border: '2px solid #5c5c5c',
                zIndex: 150
              }}>
                <Text variant="headingMd">Layer Content (z-index: 150)</Text>
                <Text variant="bodyMd">This layer sits below the modal but above base content.</Text>
                <Button onClick={() => setLayerActive(false)}>Close Layer</Button>
              </div>
            )}
          </Layer>

          {/* Modal */}
          <Modal
            open={modalActive}
            onClose={() => setModalActive(false)}
            title="Modal with Layering"
            primaryAction={{
              content: 'Close',
              onAction: () => setModalActive(false),
            }}
          >
            <Modal.Section>
              <Text variant="bodyMd">
                This modal appears above all other content, including the layer component.
                The Layer component ensures proper z-index management for all overlay elements.
              </Text>
            </Modal.Section>
          </Modal>
        </div>
      </div>
    );
  },
};

export const NestedLayers: Story = {
  render: () => {
    const [outerActive, setOuterActive] = React.useState(false);
    const [innerActive, setInnerActive] = React.useState(false);

    return (
      <div style={{ height: '400px', padding: '20px' }}>
        <Button onClick={() => setOuterActive(true)}>
          Show Nested Layers
        </Button>

        <Layer zIndex={100}>
          {outerActive && (
            <div style={{
              position: 'absolute',
              top: '50px',
              left: '50px',
              right: '50px',
              backgroundColor: '#f9f9f9',
              padding: '30px',
              borderRadius: '8px',
              border: '3px solid #007ace'
            }}>
              <div style={{ marginBottom: '20px' }}>
                <Text variant="headingMd">Outer Layer</Text>
                <Text variant="bodyMd">This is the outer layer containing another layer.</Text>
                <Button onClick={() => setInnerActive(true)}>Show Inner Layer</Button>
              </div>

              <Layer zIndex={200}>
                {innerActive && (
                  <div style={{
                    position: 'absolute',
                    top: '30px',
                    right: '30px',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '3px solid #5c5c5c',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    zIndex: 200
                  }}>
                    <Text variant="headingSm">Inner Layer</Text>
                    <Text variant="bodySm">Nested layer with higher z-index.</Text>
                    <Button size="small" onClick={() => setInnerActive(false)}>
                      Close Inner
                    </Button>
                  </div>
                )}
              </Layer>

              <Button onClick={() => setOuterActive(false)} style={{ marginTop: '20px' }}>
                Close Outer
              </Button>
            </div>
          )}
        </Layer>
      </div>
    );
  },
};

export const LayerPerformanceDemo: Story = {
  render: () => {
    const [layers, setLayers] = React.useState<Array<{id: string, color: string}>>([]);
    const [performanceMode, setPerformanceMode] = React.useState(false);

    const colors = ['#007ace', '#5c5c5c', '#2e7d32', '#ed6c02', '#d32f2f', '#7b1fa2'];

    const addRandomLayer = () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      setLayers([...layers, { id: `layer-${Date.now()}-${Math.random()}`, color }]);
    };

    const clearLayers = () => {
      setLayers([]);
    };

    const addManyLayers = () => {
      const newLayers = Array.from({ length: 10 }, (_, i) => ({
        id: `layer-${Date.now()}-${i}`,
        color: colors[i % colors.length]
      }));
      setLayers([...layers, ...newLayers]);
    };

    return (
      <div style={{ height: '500px', padding: '20px', position: 'relative' }}>
        <div style={{ marginBottom: '20px' }}>
          <Text variant="headingMd">Layer Performance Demo</Text>
          <Text variant="bodyMd">Test layer management with multiple stacked elements.</Text>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <Button onClick={addRandomLayer}>Add Random Layer</Button>
          <Button onClick={addManyLayers}>Add 10 Layers</Button>
          <Button onClick={clearLayers}>Clear All</Button>
          <Button onClick={() => setPerformanceMode(!performanceMode)}>
            {performanceMode ? 'Disable' : 'Enable'} Performance Mode
          </Button>
        </div>

        <div style={{ position: 'relative', minHeight: '300px' }}>
          {layers.map((layer, index) => (
            <Layer key={layer.id} zIndex={100 + index}>
              <div
                style={{
                  position: 'absolute',
                  top: `${index * 5}px`,
                  left: `${index * 5}px`,
                  right: `${index * 5}px`,
                  bottom: `${index * 5}px`,
                  backgroundColor: layer.color,
                  opacity: performanceMode ? 0.3 : 0.7,
                  padding: '20px',
                  borderRadius: '8px',
                  border: '2px solid #fff',
                  transition: performanceMode ? 'none' : 'all 0.3s ease',
                  pointerEvents: performanceMode ? 'none' : 'auto'
                }}
              >
                <Text variant="bodySm" style={{ color: '#fff', fontWeight: 'bold' }}>
                  Layer {index + 1} - Z-Index: {100 + index}
                </Text>
              </div>
            </Layer>
          ))}

          {layers.length === 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '200px',
              backgroundColor: '#f6f6f7',
              borderRadius: '8px',
              border: '2px dashed #ddd'
            }}>
              <Text variant="bodyMd">No layers added yet. Click the buttons above to add layers.</Text>
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f1f2f4', borderRadius: '4px' }}>
          <Text variant="bodySm">
            <strong>Performance Mode:</strong> {performanceMode ? 'Enabled' : 'Disabled'}<br />
            <strong>Active Layers:</strong> {layers.length}<br />
            <strong>Tip:</strong> Enable performance mode when working with many layers to improve rendering speed.
          </Text>
        </div>
      </div>
    );
  },
};

export const AccessibilityDemo: Story = {
  render: () => {
    const [activeLayer, setActiveLayer] = React.useState<string | null>(null);

    return (
      <div style={{ height: '400px', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Text variant="headingMd">Accessible Layer Management</Text>
          <Text variant="bodyMd">
            Layers maintain proper accessibility with focus management and ARIA attributes.
          </Text>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={() => setActiveLayer('layer1')}>
              Show Accessible Layer 1
            </Button>
            <Button onClick={() => setActiveLayer('layer2')}>
              Show Accessible Layer 2
            </Button>
          </div>

          {/* Layer 1 */}
          <Layer zIndex={100}>
            {activeLayer === 'layer1' && (
              <div
                role="dialog"
                aria-labelledby="layer1-title"
                aria-describedby="layer1-description"
                style={{
                  position: 'absolute',
                  top: '100px',
                  left: '20px',
                  right: '20px',
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '2px solid #007ace',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                <h3 id="layer1-title">Accessible Layer 1</h3>
                <p id="layer1-description">
                  This layer includes proper ARIA attributes for screen readers.
                  It maintains focus management and keyboard navigation.
                </p>
                <Button onClick={() => setActiveLayer(null)}>Close Layer 1</Button>
              </div>
            )}
          </Layer>

          {/* Layer 2 */}
          <Layer zIndex={200}>
            {activeLayer === 'layer2' && (
              <div
                role="dialog"
                aria-labelledby="layer2-title"
                aria-describedby="layer2-description"
                style={{
                  position: 'absolute',
                  top: '120px',
                  left: '40px',
                  right: '40px',
                  backgroundColor: '#f6f6f7',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '2px solid #5c5c5c',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                }}
              >
                <h3 id="layer2-title">Accessible Layer 2</h3>
                <p id="layer2-description">
                  This layer appears above layer 1 and also includes proper accessibility features.
                  Focus is properly managed between layers.
                </p>
                <Button onClick={() => setActiveLayer(null)}>Close Layer 2</Button>
              </div>
            )}
          </Layer>

          <div style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <Text variant="bodySm" as="p">
              <strong>Accessibility Features:</strong><br />
              • Proper ARIA roles and attributes<br />
              • Focus management within layers<br />
              • Keyboard navigation support<br />
              • Screen reader announcements<br />
              • Logical tab order maintained
            </Text>
          </div>
        </div>
      </div>
    );
  },
};