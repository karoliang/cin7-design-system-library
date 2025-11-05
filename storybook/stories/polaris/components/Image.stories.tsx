import type { Meta, StoryObj } from '@storybook/react';
import { Image, Card, Text, InlineStack, BlockStack, Button } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Utilities/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Images are used to display visual content. They support responsive sizing, alt text for accessibility, and various aspect ratios for different use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: 'text',
      description: 'Image URL or source',
    },
    alt: {
      control: 'text',
      description: 'Alternative text for accessibility',
    },
    width: {
      control: 'text',
      description: 'Image width (CSS value)',
    },
    height: {
      control: 'text',
      description: 'Image height (CSS value)',
    },
    aspectRatio: {
      control: 'select',
      options: ['1/1', '4/3', '16/9', '3/2', '2/1'],
      description: 'Aspect ratio for the image',
    },
    sourceSet: {
      control: 'text',
      description: 'Responsive image sources for different screen sizes',
    },
    sizes: {
      control: 'text',
      description: 'Media conditions for sourceSet',
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
      description: 'Loading behavior',
    },
    border: {
      control: 'select',
      options: ['none', 'base', 'rounded', 'large', 'full'],
      description: 'Image border radius',
    },
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    alt: 'Mountain landscape with lake',
    width: '400px',
    height: '300px',
  },
};

export const BasicImage: Story = {
  render: () => (
    <Image
      source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
      alt="Mountain landscape with lake"
      width="400px"
      height="300px"
    />
  ),
};

export const AspectRatios: Story = {
  render: () => {
    const aspectRatios = [
      { ratio: '1/1', label: 'Square (1:1)' },
      { ratio: '4/3', label: 'Standard (4:3)' },
      { ratio: '16/9', label: 'Widescreen (16:9)' },
      { ratio: '3/2', label: 'Classic (3:2)' },
      { ratio: '2/1', label: 'Wide (2:1)' },
    ];

    return (
      <BlockStack gap="400">
        {aspectRatios.map(({ ratio, label }) => (
          <div key={ratio}>
            <Text as="p" variant="bodySm" tone="subdued">{label}</Text>
            <div style={{ marginTop: '8px' }}>
              <Image
                source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt={`Example with aspect ratio ${ratio}`}
                width="300px"
                aspectRatio={ratio as any}
                border="rounded"
              />
            </div>
          </div>
        ))}
      </BlockStack>
    );
  },
};

export const ResponsiveImage: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Responsive Product Gallery</Text>
      <div style={{ marginTop: '16px' }}>
        <Image
          source="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop"
          alt="Product showcase with different screen sizes"
          sourceSet="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=267&fit=crop 400w,
                   https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=533&fit=crop 800w,
                   https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop 1200w"
          sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
          width="100%"
          aspectRatio="3/2"
          border="rounded"
          loading="lazy"
        />
      </div>
    </Card>
  ),
};

export const BorderStyles: Story = {
  render: () => {
    const borderStyles = [
      { border: 'none', label: 'No Border' },
      { border: 'base', label: 'Base' },
      { border: 'rounded', label: 'Rounded' },
      { border: 'large', label: 'Large' },
      { border: 'full', label: 'Full (Circle)' },
    ];

    return (
      <InlineStack gap="400" align="center">
        {borderStyles.map(({ border, label }) => (
          <div key={border} style={{ textAlign: 'center' }}>
            <Image
              source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
              alt={`Example with ${label} border`}
              width="150px"
              height="150px"
              aspectRatio="1/1"
              border={border as any}
            />
            <Text as="p" variant="bodySm" tone="subdued">{label}</Text>
          </div>
        ))}
      </InlineStack>
    );
  },
};

export const ProductShowcase: Story = {
  render: () => {
    const products = [
      {
        id: 1,
        name: 'Premium Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
        price: '$299.99'
      },
      {
        id: 2,
        name: 'Smart Watch',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        price: '$399.99'
      },
      {
        id: 3,
        name: 'Laptop Stand',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
        price: '$79.99'
      },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Featured Products</Text>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          {products.map((product) => (
            <div key={product.id} style={{ textAlign: 'center' }}>
              <Image
                source={product.image}
                alt={product.name}
                width="100%"
                aspectRatio="1/1"
                border="rounded"
              />
              <div style={{ marginTop: '8px' }}>
                <Text as="h4" variant="headingSm">{product.name}</Text>
                <Text as="p" variant="bodyMd" tone="subdued">{product.price}</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

export const GalleryLayout: Story = {
  render: () => {
    const [selectedImage, setSelectedImage] = React.useState(0);

    const images = [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Product Gallery</Text>
        <div style={{ marginTop: '16px' }}>
          <Image
            source={images[selectedImage]}
            alt={`Product image ${selectedImage + 1}`}
            width="100%"
            aspectRatio="4/3"
            border="rounded"
          />
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            marginTop: '12px'
          }}>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                style={{
                  padding: '4px',
                  border: selectedImage === index ? '2px solid var(--p-color-interactive)' : '2px solid transparent',
                  borderRadius: '4px',
                  background: 'none',
                  cursor: 'pointer'
                }}
              >
                <Image
                  source={image}
                  alt={`Thumbnail ${index + 1}`}
                  width="100%"
                  aspectRatio="1/1"
                  border="base"
                />
              </button>
            ))}
          </div>
        </div>
      </Card>
    );
  },
};

export const LoadingStates: Story = {
  render: () => {
    const [showImage, setShowImage] = React.useState(false);

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Lazy Loading Example</Text>
        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => setShowImage(!showImage)}>
            {showImage ? 'Hide' : 'Show'} Images
          </Button>

          {showImage && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '16px'
            }}>
              <Image
                source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
                alt="Lazy loaded image 1"
                width="100%"
                aspectRatio="4/3"
                border="rounded"
                loading="lazy"
              />
              <Image
                source="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                alt="Lazy loaded image 2"
                width="100%"
                aspectRatio="4/3"
                border="rounded"
                loading="lazy"
              />
              <Image
                source="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                alt="Lazy loaded image 3"
                width="100%"
                aspectRatio="4/3"
                border="rounded"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Card>
    );
  },
};

export const AvatarImages: Story = {
  render: () => {
    const users = [
      { name: 'Sarah Chen', initials: 'SC', color: '#FF6B6B' },
      { name: 'Mike Johnson', initials: 'MJ', color: '#4ECDC4' },
      { name: 'Emily Davis', initials: 'ED', color: '#45B7D1' },
      { name: 'Alex Wilson', initials: 'AW', color: '#FFA07A' },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Team Members</Text>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '16px'
        }}>
          {users.map((user, index) => (
            <div key={index} style={{ textAlign: 'center', minWidth: '100px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: user.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 auto 8px'
                }}
              >
                {user.initials}
              </div>
              <Text as="p" variant="bodySm">{user.name}</Text>
            </div>
          ))}

          <div style={{ textAlign: 'center', minWidth: '100px' }}>
            <Image
              source="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="Team member photo"
              width="80px"
              height="80px"
              aspectRatio="1/1"
              border="full"
            />
            <Text as="p" variant="bodySm">John Smith</Text>
          </div>
        </div>
      </Card>
    );
  },
};

export const ErrorHandling: Story = {
  render: () => {
    const [showBroken, setShowBroken] = React.useState(false);

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd">Image Error Handling</Text>
        <div style={{ marginTop: '16px' }}>
          <Button onClick={() => setShowBroken(!showBroken)}>
            {showBroken ? 'Hide' : 'Show'} Broken Images
          </Button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '16px'
          }}>
            <div>
              <Text as="p" variant="bodySm" tone="subdued">Working Image</Text>
              <div style={{ marginTop: '8px' }}>
                <Image
                  source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop"
                  alt="Working image"
                  width="100%"
                  aspectRatio="3/2"
                  border="rounded"
                />
              </div>
            </div>

            {showBroken && (
              <div>
                <Text as="p" variant="bodySm" tone="critical">Broken Image</Text>
                <div style={{ marginTop: '8px' }}>
                  <Image
                    source="https://invalid-url-that-does-not-exist.com/image.jpg"
                    alt="Broken image example"
                    width="100%"
                    aspectRatio="3/2"
                    border="rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  },
};

export const BackgroundImages: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
        <Card>
          <div style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '16px'
          }}>
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '12px',
              borderRadius: '4px',
              width: '100%'
            }}>
              <Text as="h3" variant="headingMd" color="white">Hero Section</Text>
              <Text as="p" variant="bodySm" color="white">
                Background image with overlay text
              </Text>
            </div>
          </div>
        </Card>

        <Card sectioned>
          <Text as="h3" variant="headingMd">Card with Image</Text>
          <div style={{ marginTop: '16px' }}>
            <Image
              source="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop"
              alt="Featured product"
              width="100%"
              aspectRatio="3/2"
              border="rounded"
            />
            <div style={{ marginTop: '12px' }}>
              <Text as="h4" variant="headingSm">Premium Audio Equipment</Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                Experience crystal-clear sound with our latest collection of professional audio gear.
              </Text>
            </div>
          </div>
        </Card>
      </div>
    );
  },
};