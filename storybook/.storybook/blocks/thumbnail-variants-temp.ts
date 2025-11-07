// Temporary file with Thumbnail variants - to be integrated into codeVariants.ts

export const thumbnailVariantsToAdd = {
  sizes: {
    react: `import { Thumbnail, Text } from '@shopify/polaris';
import React from 'react';

function ThumbnailSizesExample() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Thumbnail
          size="small"
          source="https://picsum.photos/seed/small/100/100.jpg"
          alt="Small thumbnail"
        />
        <Text variant="bodySm" as="span" tone="subdued">Small</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Thumbnail
          size="medium"
          source="https://picsum.photos/seed/medium/150/150.jpg"
          alt="Medium thumbnail"
        />
        <Text variant="bodySm" as="span" tone="subdued">Medium</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Thumbnail
          size="large"
          source="https://picsum.photos/seed/large/200/200.jpg"
          alt="Large thumbnail"
        />
        <Text variant="bodySm" as="span" tone="subdued">Large</Text>
      </div>
    </div>
  );
}

export default ThumbnailSizesExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; align-items: center; gap: 24px;">
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div class="polaris-thumbnail polaris-thumbnail--small">
      <img src="https://picsum.photos/seed/small/100/100.jpg" alt="Small thumbnail" class="polaris-thumbnail__image" />
    </div>
    <span class="polaris-text--subdued">Small</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div class="polaris-thumbnail polaris-thumbnail--medium">
      <img src="https://picsum.photos/seed/medium/150/150.jpg" alt="Medium thumbnail" class="polaris-thumbnail__image" />
    </div>
    <span class="polaris-text--subdued">Medium</span>
  </div>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
    <div class="polaris-thumbnail polaris-thumbnail--large">
      <img src="https://picsum.photos/seed/large/200/200.jpg" alt="Large thumbnail" class="polaris-thumbnail__image" />
    </div>
    <span class="polaris-text--subdued">Large</span>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, createElement } from '@cin7/vanilla-js';

const sizes = ['small', 'medium', 'large'];
const container = createElement('div', { style: 'display: flex; gap: 24px;' });

sizes.forEach(size => {
  const wrapper = createElement('div', {
    style: 'display: flex; flex-direction: column; align-items: center; gap: 8px;'
  });

  const thumbnail = createElement('div', {
    className: \`polaris-thumbnail polaris-thumbnail--\${size}\`
  });
  const img = createElement('img', {
    src: \`https://picsum.photos/seed/\${size}/150/150.jpg\`,
    alt: \`\${size} thumbnail\`,
    className: 'polaris-thumbnail__image'
  });
  thumbnail.appendChild(img);

  const label = createElement('span', {
    className: 'polaris-text--subdued',
    textContent: size.charAt(0).toUpperCase() + size.slice(1)
  });

  wrapper.appendChild(thumbnail);
  wrapper.appendChild(label);
  container.appendChild(wrapper);
});

document.getElementById('app').appendChild(container);
</script>`,

    extjs: `// ExtJS Thumbnail Sizes using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'middle'
  },
  items: [{
    xtype: 'container',
    layout: {
      type: 'vbox',
      align: 'center'
    },
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/small/100/100.jpg',
      alt: 'Small thumbnail',
      cls: 'polaris-thumbnail polaris-thumbnail--small',
      width: 40,
      height: 40
    }, {
      xtype: 'component',
      html: '<span class="polaris-text--subdued">Small</span>'
    }]
  }, {
    xtype: 'container',
    margin: '0 0 0 24',
    layout: {
      type: 'vbox',
      align: 'center'
    },
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/medium/150/150.jpg',
      alt: 'Medium thumbnail',
      cls: 'polaris-thumbnail polaris-thumbnail--medium',
      width: 80,
      height: 80
    }, {
      xtype: 'component',
      html: '<span class="polaris-text--subdued">Medium</span>'
    }]
  }, {
    xtype: 'container',
    margin: '0 0 0 24',
    layout: {
      type: 'vbox',
      align: 'center'
    },
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/large/200/200.jpg',
      alt: 'Large thumbnail',
      cls: 'polaris-thumbnail polaris-thumbnail--large',
      width: 120,
      height: 120
    }, {
      xtype: 'component',
      html: '<span class="polaris-text--subdued">Large</span>'
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Thumbnail, Text } from '@shopify/polaris';
import React from 'react';

type ThumbnailSize = 'small' | 'medium' | 'large';

interface SizeConfig {
  size: ThumbnailSize;
  source: string;
  label: string;
}

function ThumbnailSizesExample(): JSX.Element {
  const sizes: SizeConfig[] = [
    { size: 'small', source: 'https://picsum.photos/seed/small/100/100.jpg', label: 'Small' },
    { size: 'medium', source: 'https://picsum.photos/seed/medium/150/150.jpg', label: 'Medium' },
    { size: 'large', source: 'https://picsum.photos/seed/large/200/200.jpg', label: 'Large' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      {sizes.map(({ size, source, label }) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <Thumbnail
            size={size}
            source={source}
            alt={\`\${label} thumbnail\`}
          />
          <Text variant="bodySm" as="span" tone="subdued">{label}</Text>
        </div>
      ))}
    </div>
  );
}

export default ThumbnailSizesExample;`
  },

  productGallery: {
    react: `import { Thumbnail } from '@shopify/polaris';
import React, { useState } from 'react';

function ProductGalleryExample() {
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
              alt={\`Product view \${index + 1}\`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGalleryExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; gap: 24px;">
  <div id="main-thumbnail"></div>
  <div id="thumbnail-list"></div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, createElement } from '@cin7/vanilla-js';

const productImages = [
  'https://picsum.photos/seed/product1/400/400.jpg',
  'https://picsum.photos/seed/product2/400/400.jpg',
  'https://picsum.photos/seed/product3/400/400.jpg',
  'https://picsum.photos/seed/product4/400/400.jpg',
];

let selectedIndex = 0;

// Create main thumbnail
const mainContainer = $('#main-thumbnail');
const mainThumb = createElement('div', {
  className: 'polaris-thumbnail polaris-thumbnail--large'
});
const mainImg = createElement('img', {
  id: 'main-image',
  src: productImages[0],
  alt: 'Selected product view',
  className: 'polaris-thumbnail__image'
});
mainThumb.appendChild(mainImg);
mainContainer.appendChild(mainThumb);

// Create thumbnail list
const listContainer = $('#thumbnail-list');
listContainer.style.display = 'flex';
listContainer.style.flexDirection = 'column';
listContainer.style.gap = '8px';

productImages.forEach((image, index) => {
  const wrapper = createElement('div', {
    className: 'thumbnail-wrapper',
    style: 'border: 2px solid transparent; border-radius: 4px; cursor: pointer;'
  });

  const thumb = createElement('div', {
    className: 'polaris-thumbnail polaris-thumbnail--small'
  });
  const img = createElement('img', {
    src: image,
    alt: \`Product view \${index + 1}\`,
    className: 'polaris-thumbnail__image'
  });
  thumb.appendChild(img);
  wrapper.appendChild(thumb);

  on(wrapper, 'click', () => {
    selectedIndex = index;
    $('#main-image').src = image;

    // Update borders
    document.querySelectorAll('.thumbnail-wrapper').forEach((el, i) => {
      el.style.border = i === index ? '2px solid #007ace' : '2px solid transparent';
    });
  });

  listContainer.appendChild(wrapper);
});

// Set initial selection
listContainer.children[0].style.border = '2px solid #007ace';
</script>`,

    extjs: `// ExtJS Product Gallery using @cin7/extjs-adapters
Ext.define('ProductGallery', {
  extend: 'Ext.container.Container',
  layout: 'hbox',

  initComponent: function() {
    this.productImages = [
      'https://picsum.photos/seed/product1/400/400.jpg',
      'https://picsum.photos/seed/product2/400/400.jpg',
      'https://picsum.photos/seed/product3/400/400.jpg',
      'https://picsum.photos/seed/product4/400/400.jpg'
    ];

    this.selectedIndex = 0;

    this.items = [{
      xtype: 'image',
      itemId: 'mainImage',
      src: this.productImages[0],
      alt: 'Selected product view',
      cls: 'polaris-thumbnail polaris-thumbnail--large',
      width: 120,
      height: 120
    }, {
      xtype: 'container',
      margin: '0 0 0 24',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      items: this.productImages.map((image, index) => ({
        xtype: 'container',
        cls: 'thumbnail-wrapper',
        style: index === 0 ? 'border: 2px solid #007ace; border-radius: 4px; cursor: pointer;'
                           : 'border: 2px solid transparent; border-radius: 4px; cursor: pointer;',
        margin: index > 0 ? '8 0 0 0' : '0',
        items: [{
          xtype: 'image',
          src: image,
          alt: \`Product view \${index + 1}\`,
          cls: 'polaris-thumbnail polaris-thumbnail--small',
          width: 40,
          height: 40
        }],
        listeners: {
          el: {
            click: () => this.selectImage(index)
          }
        }
      }))
    }];

    this.callParent(arguments);
  },

  selectImage: function(index) {
    this.selectedIndex = index;
    this.down('#mainImage').setSrc(this.productImages[index]);

    // Update borders
    this.query('container[cls~=thumbnail-wrapper]').forEach((wrapper, i) => {
      wrapper.setStyle(
        i === index ? 'border: 2px solid #007ace; border-radius: 4px; cursor: pointer;'
                   : 'border: 2px solid transparent; border-radius: 4px; cursor: pointer;'
      );
    });
  }
});

Ext.create('ProductGallery', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Thumbnail } from '@shopify/polaris';
import React, { useState } from 'react';

interface ProductGalleryExampleProps {
  images?: string[];
  defaultSelectedIndex?: number;
}

function ProductGalleryExample({
  images = [
    'https://picsum.photos/seed/product1/400/400.jpg',
    'https://picsum.photos/seed/product2/400/400.jpg',
    'https://picsum.photos/seed/product3/400/400.jpg',
    'https://picsum.photos/seed/product4/400/400.jpg',
  ],
  defaultSelectedIndex = 0
}: ProductGalleryExampleProps): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<number>(defaultSelectedIndex);

  const handleThumbnailClick = (index: number): void => {
    setSelectedImage(index);
  };

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div>
        <Thumbnail
          size="large"
          source={images[selectedImage]}
          alt="Selected product view"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleThumbnailClick(index)}
            style={{
              border: selectedImage === index ? '2px solid #007ace' : '2px solid transparent',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Thumbnail
              size="small"
              source={image}
              alt={\`Product view \${index + 1}\`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGalleryExample;`
  },

  withOverlays: {
    react: `import { Thumbnail, Badge } from '@shopify/polaris';
import React from 'react';

function ThumbnailOverlaysExample() {
  return (
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
          <Badge tone="attention">-20% OFF</Badge>
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
          <Badge>NEW</Badge>
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
          <Badge tone="warning">Only 2 left</Badge>
        </div>
      </div>
    </div>
  );
}

export default ThumbnailOverlaysExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; gap: 24px;">
  <div style="position: relative;">
    <div class="polaris-thumbnail polaris-thumbnail--large">
      <img src="https://picsum.photos/seed/overlay1/200/200.jpg" alt="Product with sale badge" class="polaris-thumbnail__image" />
    </div>
    <div style="position: absolute; top: 8px; right: 8px;">
      <span class="polaris-badge polaris-badge--attention">-20% OFF</span>
    </div>
  </div>

  <div style="position: relative;">
    <div class="polaris-thumbnail polaris-thumbnail--large">
      <img src="https://picsum.photos/seed/overlay2/200/200.jpg" alt="New product" class="polaris-thumbnail__image" />
    </div>
    <div style="position: absolute; top: 8px; left: 8px;">
      <span class="polaris-badge">NEW</span>
    </div>
  </div>

  <div style="position: relative;">
    <div class="polaris-thumbnail polaris-thumbnail--large">
      <img src="https://picsum.photos/seed/overlay3/200/200.jpg" alt="Limited stock" class="polaris-thumbnail__image" />
    </div>
    <div style="position: absolute; bottom: 8px; right: 8px;">
      <span class="polaris-badge polaris-badge--warning">Only 2 left</span>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createElement } from '@cin7/vanilla-js';

const overlays = [
  {
    image: 'https://picsum.photos/seed/overlay1/200/200.jpg',
    alt: 'Product with sale badge',
    badge: { text: '-20% OFF', tone: 'attention', position: { top: '8px', right: '8px' } }
  },
  {
    image: 'https://picsum.photos/seed/overlay2/200/200.jpg',
    alt: 'New product',
    badge: { text: 'NEW', tone: '', position: { top: '8px', left: '8px' } }
  },
  {
    image: 'https://picsum.photos/seed/overlay3/200/200.jpg',
    alt: 'Limited stock',
    badge: { text: 'Only 2 left', tone: 'warning', position: { bottom: '8px', right: '8px' } }
  }
];

const container = createElement('div', { style: 'display: flex; gap: 24px;' });

overlays.forEach(({ image, alt, badge }) => {
  const wrapper = createElement('div', { style: 'position: relative;' });

  const thumbnail = createElement('div', {
    className: 'polaris-thumbnail polaris-thumbnail--large'
  });
  const img = createElement('img', {
    src: image,
    alt: alt,
    className: 'polaris-thumbnail__image'
  });
  thumbnail.appendChild(img);

  const badgeWrapper = createElement('div', {
    style: Object.entries(badge.position).map(([k, v]) => \`\${k}: \${v}\`).join('; ') + '; position: absolute;'
  });
  const badgeEl = createElement('span', {
    className: \`polaris-badge\${badge.tone ? ' polaris-badge--' + badge.tone : ''}\`,
    textContent: badge.text
  });
  badgeWrapper.appendChild(badgeEl);

  wrapper.appendChild(thumbnail);
  wrapper.appendChild(badgeWrapper);
  container.appendChild(wrapper);
});

document.getElementById('app').appendChild(container);
</script>`,

    extjs: `// ExtJS Thumbnails with Overlays using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  defaults: {
    margin: '0 24 0 0'
  },
  items: [{
    xtype: 'container',
    layout: 'absolute',
    width: 120,
    height: 120,
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/overlay1/200/200.jpg',
      alt: 'Product with sale badge',
      cls: 'polaris-thumbnail polaris-thumbnail--large',
      width: 120,
      height: 120,
      x: 0,
      y: 0
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge polaris-badge--attention">-20% OFF</span>',
      x: 8,
      y: 8
    }]
  }, {
    xtype: 'container',
    layout: 'absolute',
    width: 120,
    height: 120,
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/overlay2/200/200.jpg',
      alt: 'New product',
      cls: 'polaris-thumbnail polaris-thumbnail--large',
      width: 120,
      height: 120,
      x: 0,
      y: 0
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge">NEW</span>',
      x: 8,
      y: 8
    }]
  }, {
    xtype: 'container',
    layout: 'absolute',
    width: 120,
    height: 120,
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/overlay3/200/200.jpg',
      alt: 'Limited stock',
      cls: 'polaris-thumbnail polaris-thumbnail--large',
      width: 120,
      height: 120,
      x: 0,
      y: 0
    }, {
      xtype: 'component',
      html: '<span class="polaris-badge polaris-badge--warning">Only 2 left</span>',
      x: 8,
      y: 104
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Thumbnail, Badge, BadgeProps } from '@shopify/polaris';
import React from 'react';

interface BadgeOverlay {
  text: string;
  tone?: BadgeProps['tone'];
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

interface ThumbnailWithOverlay {
  source: string;
  alt: string;
  badge: BadgeOverlay;
}

function ThumbnailOverlaysExample(): JSX.Element {
  const thumbnails: ThumbnailWithOverlay[] = [
    {
      source: 'https://picsum.photos/seed/overlay1/200/200.jpg',
      alt: 'Product with sale badge',
      badge: {
        text: '-20% OFF',
        tone: 'attention',
        position: { top: '8px', right: '8px' }
      }
    },
    {
      source: 'https://picsum.photos/seed/overlay2/200/200.jpg',
      alt: 'New product',
      badge: {
        text: 'NEW',
        position: { top: '8px', left: '8px' }
      }
    },
    {
      source: 'https://picsum.photos/seed/overlay3/200/200.jpg',
      alt: 'Limited stock',
      badge: {
        text: 'Only 2 left',
        tone: 'warning',
        position: { bottom: '8px', right: '8px' }
      }
    }
  ];

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {thumbnails.map((thumbnail, index) => (
        <div key={index} style={{ position: 'relative' }}>
          <Thumbnail
            size="large"
            source={thumbnail.source}
            alt={thumbnail.alt}
          />
          <div style={{ position: 'absolute', ...thumbnail.badge.position }}>
            <Badge tone={thumbnail.badge.tone}>{thumbnail.badge.text}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ThumbnailOverlaysExample;`
  },

  filePreviews: {
    react: `import { Card, Text } from '@shopify/polaris';
import React from 'react';

function FilePreviewsExample() {
  const files = [
    { name: 'document.pdf', type: 'PDF', color: '#d72c0d' },
    { name: 'spreadsheet.xlsx', type: 'XLSX', color: '#2a6f3a' },
    { name: 'presentation.pptx', type: 'PPTX', color: '#e4930d' },
    { name: 'image.jpg', type: 'JPG', color: '#6f42c1' },
  ];

  return (
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
              <Text variant="bodyMd" as="p" fontWeight="medium">{file.name}</Text>
              <Text variant="bodySm" as="p" tone="subdued">File preview</Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default FilePreviewsExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="file-previews" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;"></div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, createElement } from '@cin7/vanilla-js';

const files = [
  { name: 'document.pdf', type: 'PDF', color: '#d72c0d' },
  { name: 'spreadsheet.xlsx', type: 'XLSX', color: '#2a6f3a' },
  { name: 'presentation.pptx', type: 'PPTX', color: '#e4930d' },
  { name: 'image.jpg', type: 'JPG', color: '#6f42c1' },
];

const container = $('#file-previews');

files.forEach(file => {
  const card = createElement('div', { className: 'polaris-card' });

  const content = createElement('div', {
    style: 'display: flex; align-items: center; gap: 12px; padding: 16px;'
  });

  const icon = createElement('div', {
    style: \`width: 48px; height: 48px; border-radius: 4px; background-color: \${file.color}20;
            display: flex; align-items: center; justify-content: center; font-weight: 600;
            color: \${file.color};\`,
    textContent: file.type
  });

  const info = createElement('div');
  const name = createElement('p', {
    className: 'polaris-text--medium',
    textContent: file.name
  });
  const label = createElement('p', {
    className: 'polaris-text--subdued',
    textContent: 'File preview'
  });

  info.appendChild(name);
  info.appendChild(label);
  content.appendChild(icon);
  content.appendChild(info);
  card.appendChild(content);
  container.appendChild(card);
});
</script>`,

    extjs: `// ExtJS File Previews using @cin7/extjs-adapters
Ext.define('FilePreviewCard', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.filepreviewcard',

  layout: {
    type: 'hbox',
    align: 'middle'
  },
  bodyPadding: 16,
  cls: 'polaris-card',

  config: {
    fileName: '',
    fileType: '',
    fileColor: ''
  },

  initComponent: function() {
    this.items = [{
      xtype: 'component',
      width: 48,
      height: 48,
      style: {
        borderRadius: '4px',
        backgroundColor: this.fileColor + '20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        color: this.fileColor
      },
      html: this.fileType
    }, {
      xtype: 'container',
      margin: '0 0 0 12',
      items: [{
        xtype: 'component',
        cls: 'polaris-text--medium',
        html: this.fileName
      }, {
        xtype: 'component',
        cls: 'polaris-text--subdued',
        html: 'File preview'
      }]
    }];

    this.callParent(arguments);
  }
});

Ext.create('Ext.container.Container', {
  layout: {
    type: 'table',
    columns: 2
  },
  defaults: {
    margin: 8
  },
  items: [{
    xtype: 'filepreviewcard',
    fileName: 'document.pdf',
    fileType: 'PDF',
    fileColor: '#d72c0d'
  }, {
    xtype: 'filepreviewcard',
    fileName: 'spreadsheet.xlsx',
    fileType: 'XLSX',
    fileColor: '#2a6f3a'
  }, {
    xtype: 'filepreviewcard',
    fileName: 'presentation.pptx',
    fileType: 'PPTX',
    fileColor: '#e4930d'
  }, {
    xtype: 'filepreviewcard',
    fileName: 'image.jpg',
    fileType: 'JPG',
    fileColor: '#6f42c1'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Card, Text } from '@shopify/polaris';
import React from 'react';

interface FilePreview {
  name: string;
  type: string;
  color: string;
}

interface FilePreviewsExampleProps {
  files?: FilePreview[];
}

function FilePreviewsExample({
  files = [
    { name: 'document.pdf', type: 'PDF', color: '#d72c0d' },
    { name: 'spreadsheet.xlsx', type: 'XLSX', color: '#2a6f3a' },
    { name: 'presentation.pptx', type: 'PPTX', color: '#e4930d' },
    { name: 'image.jpg', type: 'JPG', color: '#6f42c1' },
  ]
}: FilePreviewsExampleProps): JSX.Element {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      {files.map((file, index) => (
        <Card key={index} padding="300">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '4px',
                backgroundColor: \`\${file.color}20\`,
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
              <Text variant="bodyMd" as="p" fontWeight="medium">{file.name}</Text>
              <Text variant="bodySm" as="p" tone="subdued">File preview</Text>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default FilePreviewsExample;`
  },

  withActions: {
    react: `import { Thumbnail, Button } from '@shopify/polaris';
import {
  ViewIcon,
  EditIcon,
  ArrowDownIcon,
  DeleteIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

function ThumbnailActionsExample() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    'https://picsum.photos/seed/action1/200/200.jpg',
    'https://picsum.photos/seed/action2/200/200.jpg',
    'https://picsum.photos/seed/action3/200/200.jpg',
  ];

  return (
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
            alt={\`Image \${index + 1}\`}
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
              <Button size="slim" variant="plain" icon={ViewIcon} />
              <Button size="slim" variant="plain" icon={EditIcon} />
              <Button size="slim" variant="plain" icon={ArrowDownIcon} />
              <Button size="slim" variant="plain" icon={DeleteIcon} tone="critical" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ThumbnailActionsExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="interactive-thumbnails" style="display: flex; gap: 24px;"></div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, off, createElement } from '@cin7/vanilla-js';

const images = [
  'https://picsum.photos/seed/action1/200/200.jpg',
  'https://picsum.photos/seed/action2/200/200.jpg',
  'https://picsum.photos/seed/action3/200/200.jpg',
];

const container = $('#interactive-thumbnails');

images.forEach((image, index) => {
  const wrapper = createElement('div', {
    style: 'position: relative;'
  });

  const thumbnail = createElement('div', {
    className: 'polaris-thumbnail polaris-thumbnail--large'
  });
  const img = createElement('img', {
    src: image,
    alt: \`Image \${index + 1}\`,
    className: 'polaris-thumbnail__image'
  });
  thumbnail.appendChild(img);

  const overlay = createElement('div', {
    className: 'thumbnail-overlay',
    style: \`position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background-color: rgba(0, 0, 0, 0.6); border-radius: 4px;
            display: none; align-items: center; justify-content: center; gap: 8px;\`
  });

  const actions = [
    { icon: 'view', label: 'View' },
    { icon: 'edit', label: 'Edit' },
    { icon: 'download', label: 'Download' },
    { icon: 'delete', label: 'Delete', tone: 'critical' }
  ];

  actions.forEach(action => {
    const button = createElement('button', {
      className: \`polaris-button polaris-button--plain polaris-button--size-slim\${action.tone ? ' polaris-button--tone-' + action.tone : ''}\`,
      'aria-label': action.label
    });
    overlay.appendChild(button);
  });

  on(wrapper, 'mouseenter', () => {
    overlay.style.display = 'flex';
  });

  on(wrapper, 'mouseleave', () => {
    overlay.style.display = 'none';
  });

  wrapper.appendChild(thumbnail);
  wrapper.appendChild(overlay);
  container.appendChild(wrapper);
});
</script>`,

    extjs: `// ExtJS Interactive Thumbnails using @cin7/extjs-adapters
Ext.define('InteractiveThumbnail', {
  extend: 'Ext.container.Container',
  alias: 'widget.interactivethumbnail',

  layout: 'absolute',
  width: 120,
  height: 120,

  config: {
    imageSource: '',
    imageAlt: ''
  },

  initComponent: function() {
    this.items = [{
      xtype: 'image',
      src: this.imageSource,
      alt: this.imageAlt,
      cls: 'polaris-thumbnail polaris-thumbnail--large',
      width: 120,
      height: 120,
      x: 0,
      y: 0
    }, {
      xtype: 'container',
      itemId: 'overlay',
      hidden: true,
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '4px'
      },
      layout: {
        type: 'hbox',
        pack: 'center',
        align: 'middle'
      },
      width: 120,
      height: 120,
      x: 0,
      y: 0,
      items: [{
        xtype: 'button',
        iconCls: 'view-icon',
        cls: 'polaris-button polaris-button--plain polaris-button--size-slim',
        tooltip: 'View'
      }, {
        xtype: 'button',
        iconCls: 'edit-icon',
        cls: 'polaris-button polaris-button--plain polaris-button--size-slim',
        tooltip: 'Edit',
        margin: '0 0 0 8'
      }, {
        xtype: 'button',
        iconCls: 'download-icon',
        cls: 'polaris-button polaris-button--plain polaris-button--size-slim',
        tooltip: 'Download',
        margin: '0 0 0 8'
      }, {
        xtype: 'button',
        iconCls: 'delete-icon',
        cls: 'polaris-button polaris-button--plain polaris-button--size-slim polaris-button--tone-critical',
        tooltip: 'Delete',
        margin: '0 0 0 8'
      }]
    }];

    this.callParent(arguments);

    this.on('afterrender', function() {
      this.el.on('mouseenter', function() {
        this.down('#overlay').show();
      }, this);

      this.el.on('mouseleave', function() {
        this.down('#overlay').hide();
      }, this);
    }, this);
  }
});

Ext.create('Ext.container.Container', {
  layout: {
    type: 'hbox',
    align: 'stretch'
  },
  items: [{
    xtype: 'interactivethumbnail',
    imageSource: 'https://picsum.photos/seed/action1/200/200.jpg',
    imageAlt: 'Image 1'
  }, {
    xtype: 'interactivethumbnail',
    imageSource: 'https://picsum.photos/seed/action2/200/200.jpg',
    imageAlt: 'Image 2',
    margin: '0 0 0 24'
  }, {
    xtype: 'interactivethumbnail',
    imageSource: 'https://picsum.photos/seed/action3/200/200.jpg',
    imageAlt: 'Image 3',
    margin: '0 0 0 24'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Thumbnail, Button } from '@shopify/polaris';
import {
  ViewIcon,
  EditIcon,
  ArrowDownIcon,
  DeleteIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

interface ThumbnailAction {
  icon: React.ComponentType;
  label: string;
  tone?: 'critical';
  onClick: () => void;
}

interface InteractiveThumbnail {
  source: string;
  alt: string;
}

interface ThumbnailActionsExampleProps {
  images?: InteractiveThumbnail[];
  onView?: (index: number) => void;
  onEdit?: (index: number) => void;
  onDownload?: (index: number) => void;
  onDelete?: (index: number) => void;
}

function ThumbnailActionsExample({
  images = [
    { source: 'https://picsum.photos/seed/action1/200/200.jpg', alt: 'Image 1' },
    { source: 'https://picsum.photos/seed/action2/200/200.jpg', alt: 'Image 2' },
    { source: 'https://picsum.photos/seed/action3/200/200.jpg', alt: 'Image 3' },
  ],
  onView = (index) => console.log(\`View image \${index}\`),
  onEdit = (index) => console.log(\`Edit image \${index}\`),
  onDownload = (index) => console.log(\`Download image \${index}\`),
  onDelete = (index) => console.log(\`Delete image \${index}\`)
}: ThumbnailActionsExampleProps): JSX.Element {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getActions = (index: number): ThumbnailAction[] => [
    { icon: ViewIcon, label: 'View', onClick: () => onView(index) },
    { icon: EditIcon, label: 'Edit', onClick: () => onEdit(index) },
    { icon: ArrowDownIcon, label: 'Download', onClick: () => onDownload(index) },
    { icon: DeleteIcon, label: 'Delete', tone: 'critical', onClick: () => onDelete(index) },
  ];

  return (
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
            source={image.source}
            alt={image.alt}
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
              {getActions(index).map((action, actionIndex) => (
                <Button
                  key={actionIndex}
                  size="slim"
                  variant="plain"
                  icon={action.icon}
                  tone={action.tone}
                  onClick={action.onClick}
                  accessibilityLabel={action.label}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ThumbnailActionsExample;`
  }
};
