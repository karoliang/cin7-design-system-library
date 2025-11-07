import type { Meta, StoryObj } from '@storybook/react';
import { Thumbnail, Badge, Button, Text, Card, InlineStack, Icon } from '@shopify/polaris';
import {
  ViewIcon,
  EditIcon,
  ArrowDownIcon,
  DeleteIcon,
  CheckCircleIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Data Display/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Thumbnails are used to display small preview images or icons. They are ideal for product images, file previews, user avatars, and any visual content that needs to be shown in a compact format. Thumbnails can include overlays, badges, and interactive elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Thumbnail size',
    },
    source: {
      control: 'text',
      description: 'Image URL or icon source',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    transparent: {
      control: 'boolean',
      description: 'Make background transparent',
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof Thumbnail>;

export const Default: Story = {
  args: {
    size: 'medium',
    source: 'https://picsum.photos/seed/product1/200/200.jpg',
    alt: 'Product image',
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Thumbnail
          size="small"
          source="https://picsum.photos/seed/small/100/100.jpg"
          alt="Small thumbnail"
        />
        <Text variant="bodySm" color="subdued">Small</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Thumbnail
          size="medium"
          source="https://picsum.photos/seed/medium/150/150.jpg"
          alt="Medium thumbnail"
        />
        <Text variant="bodySm" color="subdued">Medium</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Thumbnail
          size="large"
          source="https://picsum.photos/seed/large/200/200.jpg"
          alt="Large thumbnail"
        />
        <Text variant="bodySm" color="subdued">Large</Text>
      </div>
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const ProductGallery: Story = {
  render: () => {
    const [selectedImage, setSelectedImage] = useState(0);

    const productImages = [
      'https://picsum.photos/seed/product1/400/400.jpg',
      'https://picsum.photos/seed/product2/400/400.jpg',
      'https://picsum.photos/seed/product3/400/400.jpg',
      'https://picsum.photos/seed/product4/400/400.jpg',
    ];

    return (
      <div style={{ display: 'flex', gap: '24px' }}>
        <div>
          <Thumbnail
            size="large"
            source={productImages[selectedImage]}
            alt="Selected product view"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text variant="bodySm" fontWeight="medium">More views</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {productImages.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  border: selectedImage === index ? '2px solid #007ace' : '2px solid transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                <Thumbnail
                  size="small"
                  source={image}
                  alt={`Product view ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const WithOverlays: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Thumbnail Overlays</Text>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ position: 'relative' }}>
          <Thumbnail
            size="large"
            source="https://picsum.photos/seed/overlay1/200/200.jpg"
            alt="Product with sale badge"
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
            }}
          >
            <Badge status="attention">-20% OFF</Badge>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <Thumbnail
            size="large"
            source="https://picsum.photos/seed/overlay2/200/200.jpg"
            alt="New product"
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
            }}
          >
            <Badge status="new">NEW</Badge>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <Thumbnail
            size="large"
            source="https://picsum.photos/seed/overlay3/200/200.jpg"
            alt="Limited stock"
          />
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
            }}
          >
            <Badge status="warning">Only 2 left</Badge>
          </div>
        </div>
      </div>
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const FilePreviews: Story = {
  render: () => {
    const files = [
      { name: 'document.pdf', type: 'PDF', color: '#d72c0d' },
      { name: 'spreadsheet.xlsx', type: 'XLSX', color: '#2a6f3a' },
      { name: 'presentation.pptx', type: 'PPTX', color: '#e4930d' },
      { name: 'image.jpg', type: 'JPG', color: '#6f42c1' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">File Type Previews</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {files.map((file, index) => (
            <Card key={index} padding="300">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '4px',
                    backgroundColor: file.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    color: file.color,
                  }}
                >
                  {file.type}
                </div>
                <div>
                  <Text variant="bodyMd" fontWeight="medium">{file.name}</Text>
                  <Text color="subdued" variant="bodySm">File preview</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const WithActions: Story = {
  render: () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const images = [
      'https://picsum.photos/seed/action1/200/200.jpg',
      'https://picsum.photos/seed/action2/200/200.jpg',
      'https://picsum.photos/seed/action3/200/200.jpg',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Interactive Thumbnails</Text>

        <div style={{ display: 'flex', gap: '24px' }}>
          {images.map((image, index) => (
            <div
              key={index}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Thumbnail
                size="large"
                source={image}
                alt={`Image ${index + 1}`}
              />
              {hoveredIndex === index && (
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    bottom: '0',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Button size="small" variant="plain" icon={ViewIcon} />
                  <Button size="small" variant="plain" icon={EditIcon} />
                  <Button size="small" variant="plain" icon={ArrowDownIcon} />
                  <Button size="small" variant="plain" icon={DeleteIcon} tone="critical" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const UserGeneratedContent: Story = {
  render: () => {
    const content = [
      {
        type: 'image',
        source: 'https://picsum.photos/seed/ugc1/200/200.jpg',
        title: 'Customer photo',
        user: 'John D.',
        verified: true,
      },
      {
        type: 'image',
        source: 'https://picsum.photos/seed/ugc2/200/200.jpg',
        title: 'Product in use',
        user: 'Sarah M.',
        verified: false,
      },
      {
        type: 'video',
        source: 'https://picsum.photos/seed/ugc3/200/200.jpg',
        title: 'Video review',
        user: 'Mike R.',
        verified: true,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">User Generated Content</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {content.map((item, index) => (
            <Card key={index} padding="300">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ position: 'relative' }}>
                  <Thumbnail
                    size="medium"
                    source={item.source}
                    alt={item.title}
                  />
                  {item.type === 'video' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: "12px",
                      }}
                    >
                      ▶
                    </div>
                  )}
                  {item.verified && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                      }}
                    >
                      <Icon source={CheckCircleIcon} color="success" />
                    </div>
                  )}
                </div>
                <div>
                  <Text variant="bodySm" fontWeight="medium">{item.title}</Text>
                  <Text color="subdued" variant="bodySm">by {item.user}</Text>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const LoadingAndError: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Loading and Error States</Text>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '4px',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                border: '3px solid #e1e1e1',
                borderTop: '3px solid #007ace',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
          </div>
          <Text variant="bodySm" color="subdued">Loading...</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '4px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#dc2626',
              fontSize: "24px",
            }}
          >
            ⚠
          </div>
          <Text variant="bodySm" color="subdued">Failed to load</Text>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '4px',
              backgroundColor: '#f9fafb',
              border: '1px dashed #d1d5db',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af',
              fontSize: "24px",
            }}
          >
            +
          </div>
          <Text variant="bodySm" color="subdued">No image</Text>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const Selection: Story = {
  render: () => {
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    const images = [
      'https://picsum.photos/seed/select1/200/200.jpg',
      'https://picsum.photos/seed/select2/200/200.jpg',
      'https://picsum.photos/seed/select3/200/200.jpg',
      'https://picsum.photos/seed/select4/200/200.jpg',
      'https://picsum.photos/seed/select5/200/200.jpg',
      'https://picsum.photos/seed/select6/200/200.jpg',
    ];

    const toggleSelection = (index: number) => {
      setSelectedImages(prev =>
        prev.includes(index)
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text variant="headingMd" as="h3">Select Images</Text>
          <Text color="subdued" variant="bodySm">
            {selectedImages.length} of {images.length} selected
          </Text>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => toggleSelection(index)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                border: selectedImages.includes(index) ? '2px solid #007ace' : '2px solid transparent',
                borderRadius: '4px',
                padding: selectedImages.includes(index) ? '2px' : '0',
              }}
            >
              <Thumbnail
                size="medium"
                source={image}
                alt={`Image ${index + 1}`}
              />
              {selectedImages.includes(index) && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#007ace',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: "12px",
                    fontWeight: 'bold',
                  }}
                >
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedImages.length > 0 && (
          <Card padding="300">
            <InlineStack gap="200">
              <Button onClick={() => setSelectedImages([])}>
                Clear selection
              </Button>
              <Button variant="primary">
                Use selected images ({selectedImages.length})
              </Button>
            </InlineStack>
          </Card>
        )}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const TransparentBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Transparent Background</Text>

      <div style={{ display: 'flex', gap: '24px', padding: '16px', backgroundColor: '#f3f4f6' }}>
        <Thumbnail
          size="large"
          source="https://picsum.photos/seed/transparent1/200/200.jpg"
          alt="Default background"
        />
        <Thumbnail
          size="large"
          source="https://picsum.photos/seed/transparent2/200/200.jpg"
          alt="Transparent background"
          transparent
        />
      </div>
      <Text variant="bodySm" color="subdued">
        The second thumbnail has a transparent background, which works well for logos or images with transparent areas.
      </Text>
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const ProductVariants: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState(0);

    const variants = [
      { name: 'Red', color: '#dc2626', image: 'https://picsum.photos/seed/red/100/100.jpg' },
      { name: 'Blue', color: '#2563eb', image: 'https://picsum.photos/seed/blue/100/100.jpg' },
      { name: 'Green', color: '#16a34a', image: 'https://picsum.photos/seed/green/100/100.jpg' },
      { name: 'Black', color: '#000000', image: 'https://picsum.photos/seed/black/100/100.jpg' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Product Color Variants</Text>

        <div style={{ display: 'flex', gap: '24px' }}>
          <Thumbnail
            size="large"
            source={variants[selectedVariant].image}
            alt={`${variants[selectedVariant].name} product variant`}
          />
          <div>
            <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '16px' }}>
              Select Color:
            </Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {variants.map((variant, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedVariant(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    backgroundColor: selectedVariant === index ? '#f3f9ff' : 'transparent',
                    border: selectedVariant === index ? '1px solid #007ace' : '1px solid transparent',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: variant.color,
                    }}
                  />
                  <Text variant="bodySm">{variant.name}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Accessibility Examples</Text>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '16px' }}>
          With Descriptive Alt Text
        </Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Thumbnail
            size="medium"
            source="https://picsum.photos/seed/access1/150/150.jpg"
            alt="Red cotton t-shirt with round neck, front view showing the product on a white background"
          />
          <Thumbnail
            size="medium"
            source="https://picsum.photos/seed/access2/150/150.jpg"
            alt="Blue denim jeans with straight cut, showing front view with pockets and zipper detail"
          />
          <Thumbnail
            size="medium"
            source="https://picsum.photos/seed/access3/150/150.jpg"
            alt="Brown leather wallet with bifold design, showing multiple card slots and bill compartment"
          />
        </div>
        <Text color="subdued" variant="bodySm" style={{ marginTop: '8px' }}>
          Each thumbnail has descriptive alt text for screen readers.
        </Text>
      </Card>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '16px' }}>
          With Interactive Labels
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Thumbnail
              size="small"
              source="https://picsum.photos/seed/interactive1/60/60.jpg"
              alt="Product thumbnail - click to view details"
            />
            <Text variant="bodySm">Click thumbnail to view product details</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Thumbnail
              size="small"
              source="https://picsum.photos/seed/interactive2/60/60.jpg"
              alt="Customer photo - hover to see actions"
            />
            <Text variant="bodySm">Hover over thumbnail for additional actions</Text>
          </div>
        </div>
      </Card>
    </div>
  ),,
  parameters: {
    codeVariants: getCodeVariants('thumbnail', 'default'),
  },

};