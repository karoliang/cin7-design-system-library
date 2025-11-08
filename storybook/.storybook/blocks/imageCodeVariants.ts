import { CodeVariant } from './codeVariants';

// This file contains additional Image component code variants
// These should be merged into the main codeVariants.ts file

export const imageAdditionalVariants: Record<string, CodeVariant> = {
  aspectRatios: {
    react: `import { Image, BlockStack, Text } from '@shopify/polaris';
import React from 'react';

function AspectRatiosExample() {
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
              alt={\`Example with aspect ratio \${ratio}\`}
              width="300px"
              aspectRatio={ratio as any}
              border="rounded"
            />
          </div>
        </div>
      ))}
    </BlockStack>
  );
}

export default AspectRatiosExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="aspect-ratios-container">
  <div class="ratio-example">
    <p class="ratio-label">Square (1:1)</p>
    <div class="image-wrapper ratio-1-1">
      <img
        src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
        alt="Example with aspect ratio 1/1"
        class="polaris-image"
        loading="lazy"
      />
    </div>
  </div>

  <div class="ratio-example">
    <p class="ratio-label">Standard (4:3)</p>
    <div class="image-wrapper ratio-4-3">
      <img
        src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
        alt="Example with aspect ratio 4/3"
        class="polaris-image"
        loading="lazy"
      />
    </div>
  </div>

  <div class="ratio-example">
    <p class="ratio-label">Widescreen (16:9)</p>
    <div class="image-wrapper ratio-16-9">
      <img
        src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
        alt="Example with aspect ratio 16/9"
        class="polaris-image"
        loading="lazy"
      />
    </div>
  </div>
</div>

<style>
.aspect-ratios-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ratio-example {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ratio-label {
  color: var(--p-color-text-subdued);
  font-size: 14px;
  margin: 0;
}

.image-wrapper {
  width: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}

.ratio-1-1 { aspect-ratio: 1 / 1; }
.ratio-4-3 { aspect-ratio: 4 / 3; }
.ratio-16-9 { aspect-ratio: 16 / 9; }
.ratio-3-2 { aspect-ratio: 3 / 2; }
.ratio-2-1 { aspect-ratio: 2 / 1; }

.polaris-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createImage } from '@cin7/vanilla-js';

const ratios = [
  { ratio: '1/1', label: 'Square (1:1)' },
  { ratio: '4/3', label: 'Standard (4:3)' },
  { ratio: '16/9', label: 'Widescreen (16:9)' },
  { ratio: '3/2', label: 'Classic (3:2)' },
  { ratio: '2/1', label: 'Wide (2:1)' }
];

const container = document.getElementById('aspect-ratios');

ratios.forEach(({ ratio, label }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'ratio-example';

  const labelEl = document.createElement('p');
  labelEl.className = 'ratio-label';
  labelEl.textContent = label;

  const imageWrapper = document.createElement('div');
  imageWrapper.className = \`image-wrapper ratio-\${ratio.replace('/', '-')}\`;

  const image = createImage({
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
    alt: \`Example with aspect ratio \${ratio}\`,
    className: 'polaris-image',
    lazy: true
  });

  imageWrapper.appendChild(image);
  wrapper.appendChild(labelEl);
  wrapper.appendChild(imageWrapper);
  container.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS Panel with multiple aspect ratio images
Ext.create('Ext.panel.Panel', {
  title: 'Image Aspect Ratios',
  renderTo: Ext.getBody(),
  width: 350,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<p style="color: #6D7175; font-size: 14px; margin: 8px 0;">Square (1:1)</p>'
    },
    {
      xtype: 'image',
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      alt: 'Example with aspect ratio 1/1',
      width: 300,
      height: 300,
      style: 'border-radius: 8px; object-fit: cover;'
    },
    {
      xtype: 'component',
      html: '<p style="color: #6D7175; font-size: 14px; margin: 8px 0;">Standard (4:3)</p>'
    },
    {
      xtype: 'image',
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      alt: 'Example with aspect ratio 4/3',
      width: 300,
      height: 225,
      style: 'border-radius: 8px; object-fit: cover;'
    },
    {
      xtype: 'component',
      html: '<p style="color: #6D7175; font-size: 14px; margin: 8px 0;">Widescreen (16:9)</p>'
    },
    {
      xtype: 'image',
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',
      alt: 'Example with aspect ratio 16/9',
      width: 300,
      height: 169,
      style: 'border-radius: 8px; object-fit: cover;'
    }
  ]
});`,

    typescript: `import { Image, BlockStack, Text } from '@shopify/polaris';
import React from 'react';

type AspectRatio = '1/1' | '4/3' | '16/9' | '3/2' | '2/1';

interface RatioConfig {
  ratio: AspectRatio;
  label: string;
}

function AspectRatiosExample(): JSX.Element {
  const aspectRatios: RatioConfig[] = [
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
          <Text as="p" variant="bodySm" tone="subdued">
            {label}
          </Text>
          <div style={{ marginTop: '8px' }}>
            <Image
              source="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
              alt={\`Example with aspect ratio \${ratio}\`}
              width="300px"
              aspectRatio={ratio}
              border="rounded"
            />
          </div>
        </div>
      ))}
    </BlockStack>
  );
}

export default AspectRatiosExample;`
  },

  responsiveImage: {
    react: `import { Image, Card, Text } from '@shopify/polaris';
import React from 'react';

function ResponsiveImageExample() {
  return (
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
  );
}

export default ResponsiveImageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="card">
  <div class="card-section">
    <h3 class="heading-md">Responsive Product Gallery</h3>
    <div class="image-container">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop"
        srcset="
          https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=267&fit=crop 400w,
          https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=533&fit=crop 800w,
          https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop 1200w
        "
        sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
        alt="Product showcase with different screen sizes"
        class="responsive-image"
        loading="lazy"
      />
    </div>
  </div>
</div>

<style>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-section {
  padding: 16px;
}

.heading-md {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
}

.image-container {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: 8px;
}

.responsive-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createResponsiveImage } from '@cin7/vanilla-js';

const image = createResponsiveImage({
  src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
  srcSet: [
    { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=267&fit=crop', width: 400 },
    { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=533&fit=crop', width: 800 },
    { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop', width: 1200 }
  ],
  sizes: '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px',
  alt: 'Product showcase with different screen sizes',
  aspectRatio: '3/2',
  lazy: true
});

document.querySelector('.image-container').appendChild(image);
</script>`,

    extjs: `// ExtJS Panel with responsive image using PolarisImage adapter
import { PolarisImage } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  title: 'Responsive Product Gallery',
  renderTo: Ext.getBody(),
  width: 600,
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: '<h3 style="font-size: 16px; font-weight: 600; margin: 0 0 16px;">Responsive Product Gallery</h3>'
    },
    Ext.create('PolarisImage', {
      src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
      alt: 'Product showcase with different screen sizes',
      srcSet: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=267&fit=crop 400w',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=533&fit=crop 800w',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop 1200w'
      ].join(', '),
      sizes: '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px',
      aspectRatio: '3/2',
      border: 'rounded',
      width: '100%'
    })
  ]
});`,

    typescript: `import { Image, Card, Text } from '@shopify/polaris';
import React from 'react';

interface ResponsiveImageConfig {
  source: string;
  sourceSet: string;
  sizes: string;
  alt: string;
  aspectRatio: '3/2';
}

function ResponsiveImageExample(): JSX.Element {
  const imageConfig: ResponsiveImageConfig = {
    source: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
    sourceSet: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=267&fit=crop 400w',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=533&fit=crop 800w',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop 1200w'
    ].join(', '),
    sizes: '(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px',
    alt: 'Product showcase with different screen sizes',
    aspectRatio: '3/2'
  };

  return (
    <Card sectioned>
      <Text as="h3" variant="headingMd">
        Responsive Product Gallery
      </Text>
      <div style={{ marginTop: '16px' }}>
        <Image
          source={imageConfig.source}
          sourceSet={imageConfig.sourceSet}
          sizes={imageConfig.sizes}
          alt={imageConfig.alt}
          width="100%"
          aspectRatio={imageConfig.aspectRatio}
          border="rounded"
          loading="lazy"
        />
      </div>
    </Card>
  );
}

export default ResponsiveImageExample;`
  },

  borderStyles: {
    react: `import { Image, InlineStack, Text } from '@shopify/polaris';
import React from 'react';

function BorderStylesExample() {
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
            alt={\`Example with \${label} border\`}
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
}

export default BorderStylesExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="border-styles-container">
  <div class="border-example">
    <img
      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      alt="Example with No Border"
      class="image border-none"
      loading="lazy"
    />
    <p class="label">No Border</p>
  </div>

  <div class="border-example">
    <img
      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      alt="Example with Base border"
      class="image border-base"
      loading="lazy"
    />
    <p class="label">Base</p>
  </div>

  <div class="border-example">
    <img
      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      alt="Example with Rounded border"
      class="image border-rounded"
      loading="lazy"
    />
    <p class="label">Rounded</p>
  </div>

  <div class="border-example">
    <img
      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      alt="Example with Large border"
      class="image border-large"
      loading="lazy"
    />
    <p class="label">Large</p>
  </div>

  <div class="border-example">
    <img
      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
      alt="Example with Full (Circle) border"
      class="image border-full"
      loading="lazy"
    />
    <p class="label">Full (Circle)</p>
  </div>
</div>

<style>
.border-styles-container {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.border-example {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  display: block;
}

.border-none { border-radius: 0; }
.border-base { border-radius: 4px; }
.border-rounded { border-radius: 8px; }
.border-large { border-radius: 16px; }
.border-full { border-radius: 50%; }

.label {
  color: var(--p-color-text-subdued);
  font-size: 14px;
  margin: 0;
  text-align: center;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createImage } from '@cin7/vanilla-js';

const borderStyles = [
  { border: 'none', label: 'No Border', radius: '0' },
  { border: 'base', label: 'Base', radius: '4px' },
  { border: 'rounded', label: 'Rounded', radius: '8px' },
  { border: 'large', label: 'Large', radius: '16px' },
  { border: 'full', label: 'Full (Circle)', radius: '50%' }
];

const container = document.getElementById('border-styles');

borderStyles.forEach(({ border, label, radius }) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'border-example';

  const image = createImage({
    src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    alt: \`Example with \${label} border\`,
    width: 150,
    height: 150,
    style: { borderRadius: radius, objectFit: 'cover' },
    lazy: true
  });

  const labelEl = document.createElement('p');
  labelEl.className = 'label';
  labelEl.textContent = label;

  wrapper.appendChild(image);
  wrapper.appendChild(labelEl);
  container.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS Panel with different border styles
Ext.create('Ext.panel.Panel', {
  title: 'Image Border Styles',
  renderTo: Ext.getBody(),
  width: 800,
  layout: {
    type: 'hbox',
    align: 'middle',
    pack: 'center'
  },
  bodyPadding: 16,
  items: [
    {
      xtype: 'container',
      layout: 'vbox',
      style: 'text-align: center;',
      margin: '0 8 0 0',
      items: [
        {
          xtype: 'image',
          src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
          alt: 'No Border',
          width: 150,
          height: 150,
          style: 'object-fit: cover;'
        },
        {
          xtype: 'component',
          html: '<p style="color: #6D7175; font-size: 14px;">No Border</p>'
        }
      ]
    },
    {
      xtype: 'container',
      layout: 'vbox',
      style: 'text-align: center;',
      margin: '0 8 0 0',
      items: [
        {
          xtype: 'image',
          src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
          alt: 'Base',
          width: 150,
          height: 150,
          style: 'border-radius: 4px; object-fit: cover;'
        },
        {
          xtype: 'component',
          html: '<p style="color: #6D7175; font-size: 14px;">Base</p>'
        }
      ]
    },
    {
      xtype: 'container',
      layout: 'vbox',
      style: 'text-align: center;',
      margin: '0 8 0 0',
      items: [
        {
          xtype: 'image',
          src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
          alt: 'Rounded',
          width: 150,
          height: 150,
          style: 'border-radius: 8px; object-fit: cover;'
        },
        {
          xtype: 'component',
          html: '<p style="color: #6D7175; font-size: 14px;">Rounded</p>'
        }
      ]
    },
    {
      xtype: 'container',
      layout: 'vbox',
      style: 'text-align: center;',
      margin: '0 8 0 0',
      items: [
        {
          xtype: 'image',
          src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
          alt: 'Full (Circle)',
          width: 150,
          height: 150,
          style: 'border-radius: 50%; object-fit: cover;'
        },
        {
          xtype: 'component',
          html: '<p style="color: #6D7175; font-size: 14px;">Full (Circle)</p>'
        }
      ]
    }
  ]
});`,

    typescript: `import { Image, InlineStack, Text } from '@shopify/polaris';
import React from 'react';

type BorderStyle = 'none' | 'base' | 'rounded' | 'large' | 'full';

interface BorderConfig {
  border: BorderStyle;
  label: string;
}

function BorderStylesExample(): JSX.Element {
  const borderStyles: BorderConfig[] = [
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
            alt={\`Example with \${label} border\`}
            width="150px"
            height="150px"
            aspectRatio="1/1"
            border={border}
          />
          <Text as="p" variant="bodySm" tone="subdued">
            {label}
          </Text>
        </div>
      ))}
    </InlineStack>
  );
}

export default BorderStylesExample;`
  },

  productShowcase: {
    react: `import { Image, Card, Text } from '@shopify/polaris';
import React from 'react';

function ProductShowcaseExample() {
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
}

export default ProductShowcaseExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="card">
  <div class="card-section">
    <h3 class="heading-md">Featured Products</h3>
    <div class="product-grid">
      <div class="product-item">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
          alt="Premium Headphones"
          class="product-image"
          loading="lazy"
        />
        <div class="product-info">
          <h4 class="product-name">Premium Headphones</h4>
          <p class="product-price">$299.99</p>
        </div>
      </div>

      <div class="product-item">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
          alt="Smart Watch"
          class="product-image"
          loading="lazy"
        />
        <div class="product-info">
          <h4 class="product-name">Smart Watch</h4>
          <p class="product-price">$399.99</p>
        </div>
      </div>

      <div class="product-item">
        <img
          src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop"
          alt="Laptop Stand"
          class="product-image"
          loading="lazy"
        />
        <div class="product-info">
          <h4 class="product-name">Laptop Stand</h4>
          <p class="product-price">$79.99</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.card-section {
  padding: 16px;
}

.heading-md {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 16px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.product-item {
  text-align: center;
}

.product-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}

.product-info {
  margin-top: 8px;
}

.product-name {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 4px;
}

.product-price {
  color: var(--p-color-text-subdued);
  font-size: 14px;
  margin: 0;
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createImage } from '@cin7/vanilla-js';

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
  }
];

const grid = document.querySelector('.product-grid');

products.forEach(product => {
  const item = document.createElement('div');
  item.className = 'product-item';

  const image = createImage({
    src: product.image,
    alt: product.name,
    className: 'product-image',
    lazy: true
  });

  const info = document.createElement('div');
  info.className = 'product-info';
  info.innerHTML = \`
    <h4 class="product-name">\${product.name}</h4>
    <p class="product-price">\${product.price}</p>
  \`;

  item.appendChild(image);
  item.appendChild(info);
  grid.appendChild(item);
});
</script>`,

    extjs: `// ExtJS Product Grid using DataView
Ext.create('Ext.panel.Panel', {
  title: 'Featured Products',
  renderTo: Ext.getBody(),
  width: 700,
  height: 400,
  layout: 'fit',
  items: [
    {
      xtype: 'dataview',
      store: Ext.create('Ext.data.Store', {
        fields: ['id', 'name', 'image', 'price'],
        data: [
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
          }
        ]
      }),
      tpl: [
        '<div class="product-grid">',
        '<tpl for=".">',
        '<div class="product-item" style="text-align: center; padding: 12px;">',
        '<img src="{image}" alt="{name}" style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px;" />',
        '<h4 style="margin: 8px 0 4px; font-size: 15px; font-weight: 600;">{name}</h4>',
        '<p style="margin: 0; color: #6D7175;">{price}</p>',
        '</div>',
        '</tpl>',
        '</div>'
      ],
      itemSelector: '.product-item',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        padding: '16px'
      }
    }
  ]
});`,

    typescript: `import { Image, Card, Text } from '@shopify/polaris';
import React from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
}

function ProductShowcaseExample(): JSX.Element {
  const products: Product[] = [
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
      <Text as="h3" variant="headingMd">
        Featured Products
      </Text>
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
              <Text as="h4" variant="headingSm">
                {product.name}
              </Text>
              <Text as="p" variant="bodyMd" tone="subdued">
                {product.price}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProductShowcaseExample;`
  }
};
