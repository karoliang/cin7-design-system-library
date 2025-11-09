import type { CodeVariant } from './types';

export const mediacardExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

function MediaCardExample() {
  return (
    <MediaCard
      title="Modern Office Chair"
      description="Ergonomic office chair with lumbar support and adjustable armrests. Perfect for long working hours."
      portrait
      primaryAction={{
        content: 'View details',
        onAction: () => console.log('View details clicked'),
      }}
    />
  );
}

export default MediaCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card polaris-media-card--portrait">
  <div class="polaris-media-card__media">
    <img src="placeholder.jpg" alt="Modern Office Chair" />
  </div>
  <div class="polaris-media-card__content">
    <h3 class="polaris-media-card__title">Modern Office Chair</h3>
    <p class="polaris-media-card__description">
      Ergonomic office chair with lumbar support and adjustable armrests.
      Perfect for long working hours.
    </p>
    <button class="polaris-button polaris-button--primary">View details</button>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

on('.polaris-button--primary', 'click', () => {
  console.log('View details clicked');
});
</script>`,

    extjs: `// ExtJS MediaCard using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-media-card polaris-media-card--portrait',
  title: 'Modern Office Chair',
  bodyPadding: 16,
  html: '<p>Ergonomic office chair with lumbar support and adjustable armrests. Perfect for long working hours.</p>',
  buttons: [{
    text: 'View details',
    ui: 'primary',
    handler: function() {
      console.log('View details clicked');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

interface MediaCardExampleProps {
  title: string;
  description: string;
  portrait?: boolean;
  primaryAction?: {
    content: string;
    onAction: () => void;
  };
}

const MediaCardExample: React.FC<MediaCardExampleProps> = ({
  title,
  description,
  portrait = false,
  primaryAction
}) => {
  return (
    <MediaCard
      title={title}
      description={description}
      portrait={portrait}
      primaryAction={primaryAction}
    />
  );
};

export default MediaCardExample;`,
  },

  product: {
    react: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

function ProductCardExample() {
  return (
    <MediaCard
      title="Premium Leather Bag"
      description="Handcrafted genuine leather briefcase with multiple compartments and vintage design. Ideal for professionals who value quality and style."
      portrait
      primaryAction={{
        content: 'Add to cart',
        onAction: () => console.log('Add to cart'),
      }}
      secondaryAction={{
        content: 'Save for later',
        onAction: () => console.log('Save for later'),
      }}
    />
  );
}

export default ProductCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card polaris-media-card--portrait">
  <div class="polaris-media-card__media">
    <img src="leather-bag.jpg" alt="Premium Leather Bag" />
  </div>
  <div class="polaris-media-card__content">
    <h3 class="polaris-media-card__title">Premium Leather Bag</h3>
    <p class="polaris-media-card__description">
      Handcrafted genuine leather briefcase with multiple compartments and vintage design.
      Ideal for professionals who value quality and style.
    </p>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary" data-action="add-cart">Add to cart</button>
      <button class="polaris-button" data-action="save">Save for later</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

on('[data-action="add-cart"]', 'click', () => {
  console.log('Add to cart');
});

on('[data-action="save"]', 'click', () => {
  console.log('Save for later');
});
</script>`,

    extjs: `// ExtJS Product Card using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-media-card polaris-media-card--portrait',
  title: 'Premium Leather Bag',
  bodyPadding: 16,
  html: '<p>Handcrafted genuine leather briefcase with multiple compartments and vintage design. Ideal for professionals who value quality and style.</p>',
  buttons: [{
    text: 'Add to cart',
    ui: 'primary',
    handler: function() {
      console.log('Add to cart');
    }
  }, {
    text: 'Save for later',
    handler: function() {
      console.log('Save for later');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

interface ProductCardProps {
  title: string;
  description: string;
  onAddToCart: () => void;
  onSaveForLater: () => void;
}

const ProductCardExample: React.FC<ProductCardProps> = ({
  title,
  description,
  onAddToCart,
  onSaveForLater
}) => {
  return (
    <MediaCard
      title={title}
      description={description}
      portrait
      primaryAction={{
        content: 'Add to cart',
        onAction: onAddToCart,
      }}
      secondaryAction={{
        content: 'Save for later',
        onAction: onSaveForLater,
      }}
    />
  );
};

export default ProductCardExample;`,
  },

  video: {
    react: `import { MediaCard } from '@shopify/polaris';
import { PlayIcon } from '@shopify/polaris-icons';
import React from 'react';

function VideoCardExample() {
  return (
    <MediaCard
      title="Product Demo Video"
      description="Watch our comprehensive product demonstration showing all features and benefits. Learn how to maximize your productivity with this innovative solution."
      primaryAction={{
        content: 'Watch now',
        onAction: () => console.log('Watch video'),
        icon: PlayIcon,
      }}
      secondaryAction={{
        content: 'More videos',
        onAction: () => console.log('More videos'),
      }}
    />
  );
}

export default VideoCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card">
  <div class="polaris-media-card__media polaris-media-card__media--video">
    <video poster="video-thumbnail.jpg" controls>
      <source src="demo-video.mp4" type="video/mp4" />
    </video>
    <div class="polaris-media-card__play-overlay">
      <svg class="polaris-icon" viewBox="0 0 20 20">
        <path d="M6 4l10 6-10 6V4z" />
      </svg>
    </div>
  </div>
  <div class="polaris-media-card__content">
    <h3 class="polaris-media-card__title">Product Demo Video</h3>
    <p class="polaris-media-card__description">
      Watch our comprehensive product demonstration showing all features and benefits.
    </p>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary" data-action="watch">
        <span class="polaris-icon">▶</span>
        Watch now
      </button>
      <button class="polaris-button" data-action="more">More videos</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

on('[data-action="watch"]', 'click', () => {
  const video = $('video');
  video.play();
  console.log('Watch video');
});

on('[data-action="more"]', 'click', () => {
  console.log('More videos');
});
</script>`,

    extjs: `// ExtJS Video Card using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-media-card',
  title: 'Product Demo Video',
  bodyPadding: 16,
  html: '<p>Watch our comprehensive product demonstration showing all features and benefits. Learn how to maximize your productivity with this innovative solution.</p>',
  items: [{
    xtype: 'component',
    html: '<video poster="video-thumbnail.jpg" controls><source src="demo-video.mp4" type="video/mp4" /></video>'
  }],
  buttons: [{
    text: 'Watch now',
    iconCls: 'x-fa fa-play',
    ui: 'primary',
    handler: function() {
      console.log('Watch video');
    }
  }, {
    text: 'More videos',
    handler: function() {
      console.log('More videos');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import { PlayIcon } from '@shopify/polaris-icons';
import React from 'react';

interface VideoCardProps {
  title: string;
  description: string;
  onWatch: () => void;
  onMoreVideos: () => void;
}

const VideoCardExample: React.FC<VideoCardProps> = ({
  title,
  description,
  onWatch,
  onMoreVideos
}) => {
  return (
    <MediaCard
      title={title}
      description={description}
      primaryAction={{
        content: 'Watch now',
        onAction: onWatch,
        icon: PlayIcon,
      }}
      secondaryAction={{
        content: 'More videos',
        onAction: onMoreVideos,
      }}
    />
  );
};

export default VideoCardExample;`,
  },

  article: {
    react: `import { MediaCard } from '@shopify/polaris';
import { ExternalIcon, PinFilledIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

function ArticleCardExample() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <MediaCard
      title="10 Tips for Better Time Management"
      description="Discover proven strategies to boost your productivity and make the most of your workday. Learn from industry experts and transform how you manage your time effectively."
      primaryAction={{
        content: 'Read article',
        onAction: () => console.log('Read article'),
        icon: ExternalIcon,
      }}
      secondaryAction={{
        content: isBookmarked ? 'Bookmarked' : 'Bookmark',
        onAction: () => setIsBookmarked(!isBookmarked),
        icon: PinFilledIcon,
        tone: isBookmarked ? 'success' : undefined,
      }}
    />
  );
}

export default ArticleCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card">
  <div class="polaris-media-card__media">
    <img src="article-image.jpg" alt="Time Management" />
  </div>
  <div class="polaris-media-card__content">
    <h3 class="polaris-media-card__title">10 Tips for Better Time Management</h3>
    <p class="polaris-media-card__description">
      Discover proven strategies to boost your productivity and make the most of your workday.
    </p>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary" data-action="read">
        <span class="polaris-icon">↗</span>
        Read article
      </button>
      <button class="polaris-button" data-action="bookmark">
        <span class="polaris-icon">📌</span>
        <span class="bookmark-text">Bookmark</span>
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, toggleClass } from '@cin7/vanilla-js';

let isBookmarked = false;

on('[data-action="read"]', 'click', () => {
  console.log('Read article');
});

on('[data-action="bookmark"]', 'click', (e) => {
  isBookmarked = !isBookmarked;
  const button = e.target.closest('button');
  const text = button.querySelector('.bookmark-text');
  text.textContent = isBookmarked ? 'Bookmarked' : 'Bookmark';
  toggleClass(button, 'polaris-button--success', isBookmarked);
  console.log('Bookmark toggled');
});
</script>`,

    extjs: `// ExtJS Article Card using @cin7/extjs-adapters
Ext.define('ArticleCard', {
  extend: 'Ext.panel.Panel',
  cls: 'polaris-media-card',
  title: '10 Tips for Better Time Management',
  bodyPadding: 16,
  html: '<p>Discover proven strategies to boost your productivity and make the most of your workday.</p>',

  initComponent: function() {
    this.isBookmarked = false;

    this.buttons = [{
      text: 'Read article',
      iconCls: 'x-fa fa-external-link',
      ui: 'primary',
      handler: function() {
        console.log('Read article');
      }
    }, {
      text: 'Bookmark',
      iconCls: 'x-fa fa-bookmark',
      itemId: 'bookmarkBtn',
      scope: this,
      handler: function(btn) {
        this.isBookmarked = !this.isBookmarked;
        btn.setText(this.isBookmarked ? 'Bookmarked' : 'Bookmark');
        btn.setUi(this.isBookmarked ? 'success' : 'default');
      }
    }];

    this.callParent(arguments);
  }
});

Ext.create('ArticleCard', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import { ExternalIcon, PinFilledIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
}

const ArticleCardExample: React.FC<ArticleCardProps> = ({
  title,
  description
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const handleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    console.log('Bookmark toggled');
  };

  return (
    <MediaCard
      title={title}
      description={description}
      primaryAction={{
        content: 'Read article',
        onAction: () => console.log('Read article'),
        icon: ExternalIcon,
      }}
      secondaryAction={{
        content: isBookmarked ? 'Bookmarked' : 'Bookmark',
        onAction: handleBookmark,
        icon: PinFilledIcon,
        tone: isBookmarked ? 'success' : undefined,
      }}
    />
  );
};

export default ArticleCardExample;`,
  },

  testimonial: {
    react: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

function TestimonialCardExample() {
  return (
    <MediaCard
      title="Sarah Johnson - CEO at TechCorp"
      description="This solution transformed our workflow completely. We've seen a 40% increase in productivity and our team loves using it. The support team has been exceptional throughout our journey."
      primaryAction={{
        content: 'Read full story',
        onAction: () => console.log('Read full story'),
      }}
      secondaryAction={{
        content: 'More testimonials',
        onAction: () => console.log('More testimonials'),
      }}
    />
  );
}

export default TestimonialCardExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-media-card">
  <div class="polaris-media-card__media">
    <img src="sarah-johnson.jpg" alt="Sarah Johnson" />
  </div>
  <div class="polaris-media-card__content">
    <h3 class="polaris-media-card__title">Sarah Johnson - CEO at TechCorp</h3>
    <p class="polaris-media-card__description">
      "This solution transformed our workflow completely. We've seen a 40% increase in productivity
      and our team loves using it. The support team has been exceptional throughout our journey."
    </p>
    <div class="polaris-media-card__actions">
      <button class="polaris-button polaris-button--primary" data-action="read">Read full story</button>
      <button class="polaris-button" data-action="more">More testimonials</button>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

on('[data-action="read"]', 'click', () => {
  console.log('Read full story');
});

on('[data-action="more"]', 'click', () => {
  console.log('More testimonials');
});
</script>`,

    extjs: `// ExtJS Testimonial Card using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  cls: 'polaris-media-card',
  title: 'Sarah Johnson - CEO at TechCorp',
  bodyPadding: 16,
  html: '<p>"This solution transformed our workflow completely. We\'ve seen a 40% increase in productivity and our team loves using it. The support team has been exceptional throughout our journey."</p>',
  buttons: [{
    text: 'Read full story',
    ui: 'primary',
    handler: function() {
      console.log('Read full story');
    }
  }, {
    text: 'More testimonials',
    handler: function() {
      console.log('More testimonials');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard } from '@shopify/polaris';
import React from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  testimonial: string;
  onReadMore: () => void;
  onMoreTestimonials: () => void;
}

const TestimonialCardExample: React.FC<TestimonialCardProps> = ({
  name,
  title: jobTitle,
  testimonial,
  onReadMore,
  onMoreTestimonials
}) => {
  return (
    <MediaCard
      title={\`\${name} - \${jobTitle}\`}
      description={testimonial}
      primaryAction={{
        content: 'Read full story',
        onAction: onReadMore,
      }}
      secondaryAction={{
        content: 'More testimonials',
        onAction: onMoreTestimonials,
      }}
    />
  );
};

export default TestimonialCardExample;`,
  },

  sizeVariations: {
    react: `import { MediaCard, Text } from '@shopify/polaris';
import React from 'react';

function SizeVariationsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Media Card Sizes</Text>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <MediaCard
          size="small"
          title="Compact Product"
          description="Brief description of the product feature and benefits."
          primaryAction={{
            content: 'View',
            onAction: () => console.log('View small'),
          }}
        />

        <MediaCard
          size="medium"
          title="Standard Product"
          description="Medium length description that provides more detail about the product features and benefits for customers."
          primaryAction={{
            content: 'View details',
            onAction: () => console.log('View medium'),
          }}
          secondaryAction={{
            content: 'Save',
            onAction: () => console.log('Save medium'),
          }}
        />

        <MediaCard
          size="large"
          title="Premium Product with Extended Features"
          description="This comprehensive product description provides detailed information about all the features, benefits, and use cases."
          primaryAction={{
            content: 'Learn more',
            onAction: () => console.log('View large'),
          }}
          secondaryAction={{
            content: 'Add to favorites',
            onAction: () => console.log('Add to favorites'),
          }}
        />
      </div>
    </div>
  );
}

export default SizeVariationsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="size-variations-container">
  <h3 class="polaris-heading-md">Media Card Sizes</h3>

  <div class="size-variations-grid">
    <!-- Small -->
    <div class="polaris-media-card polaris-media-card--small">
      <div class="polaris-media-card__content">
        <h3 class="polaris-media-card__title">Compact Product</h3>
        <p class="polaris-media-card__description">Brief description of the product feature and benefits.</p>
        <button class="polaris-button polaris-button--primary">View</button>
      </div>
    </div>

    <!-- Medium -->
    <div class="polaris-media-card polaris-media-card--medium">
      <div class="polaris-media-card__content">
        <h3 class="polaris-media-card__title">Standard Product</h3>
        <p class="polaris-media-card__description">
          Medium length description that provides more detail about the product features.
        </p>
        <div class="polaris-media-card__actions">
          <button class="polaris-button polaris-button--primary">View details</button>
          <button class="polaris-button">Save</button>
        </div>
      </div>
    </div>

    <!-- Large -->
    <div class="polaris-media-card polaris-media-card--large">
      <div class="polaris-media-card__content">
        <h3 class="polaris-media-card__title">Premium Product with Extended Features</h3>
        <p class="polaris-media-card__description">
          This comprehensive product description provides detailed information about all features.
        </p>
        <div class="polaris-media-card__actions">
          <button class="polaris-button polaris-button--primary">Learn more</button>
          <button class="polaris-button">Add to favorites</button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.size-variations-grid {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}
</style>`,

    extjs: `// ExtJS Size Variations using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  layout: 'hbox',
  defaults: {
    margin: '0 12 0 0'
  },
  items: [{
    xtype: 'panel',
    cls: 'polaris-media-card polaris-media-card--small',
    title: 'Compact Product',
    width: 280,
    bodyPadding: 12,
    html: 'Brief description of the product feature and benefits.',
    buttons: [{
      text: 'View',
      ui: 'primary',
      handler: function() {
        console.log('View small');
      }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-media-card polaris-media-card--medium',
    title: 'Standard Product',
    width: 400,
    bodyPadding: 16,
    html: 'Medium length description that provides more detail about the product features and benefits.',
    buttons: [{
      text: 'View details',
      ui: 'primary',
      handler: function() {
        console.log('View medium');
      }
    }, {
      text: 'Save',
      handler: function() {
        console.log('Save medium');
      }
    }]
  }, {
    xtype: 'panel',
    cls: 'polaris-media-card polaris-media-card--large',
    title: 'Premium Product with Extended Features',
    width: 480,
    bodyPadding: 20,
    html: 'This comprehensive product description provides detailed information about all features.',
    buttons: [{
      text: 'Learn more',
      ui: 'primary',
      handler: function() {
        console.log('View large');
      }
    }, {
      text: 'Add to favorites',
      handler: function() {
        console.log('Add to favorites');
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { MediaCard, Text } from '@shopify/polaris';
import React from 'react';

type MediaCardSize = 'small' | 'medium' | 'large';

interface CardConfig {
  size: MediaCardSize;
  title: string;
  description: string;
  primaryAction: {
    content: string;
    onAction: () => void;
  };
  secondaryAction?: {
    content: string;
    onAction: () => void;
  };
}

const SizeVariationsExample: React.FC = () => {
  const cards: CardConfig[] = [
    {
      size: 'small',
      title: 'Compact Product',
      description: 'Brief description of the product feature and benefits.',
      primaryAction: {
        content: 'View',
        onAction: () => console.log('View small'),
      },
    },
    {
      size: 'medium',
      title: 'Standard Product',
      description: 'Medium length description that provides more detail about the product features.',
      primaryAction: {
        content: 'View details',
        onAction: () => console.log('View medium'),
      },
      secondaryAction: {
        content: 'Save',
        onAction: () => console.log('Save medium'),
      },
    },
    {
      size: 'large',
      title: 'Premium Product with Extended Features',
      description: 'This comprehensive product description provides detailed information.',
      primaryAction: {
        content: 'Learn more',
        onAction: () => console.log('View large'),
      },
      secondaryAction: {
        content: 'Add to favorites',
        onAction: () => console.log('Add to favorites'),
      },
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Media Card Sizes</Text>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {cards.map((card, index) => (
          <MediaCard
            key={index}
            size={card.size}
            title={card.title}
            description={card.description}
            primaryAction={card.primaryAction}
            secondaryAction={card.secondaryAction}
          />
        ))}
      </div>
    </div>
  );
};

export default SizeVariationsExample;`,
  }
};

// Thumbnail Component Examples

export const thumbnailExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Thumbnail } from '@shopify/polaris';
import React from 'react';

function ThumbnailExample() {
  return (
    <Thumbnail
      size="medium"
      source="https://picsum.photos/seed/product1/200/200.jpg"
      alt="Product image"
    />
  );
}

export default ThumbnailExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-thumbnail polaris-thumbnail--medium">
  <img
    src="https://picsum.photos/seed/product1/200/200.jpg"
    alt="Product image"
    class="polaris-thumbnail__image"
  />
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createThumbnail } from '@cin7/vanilla-js';

const thumbnail = createThumbnail({
  size: 'medium',
  source: 'https://picsum.photos/seed/product1/200/200.jpg',
  alt: 'Product image',
  onClick: () => {
    console.log('Thumbnail clicked');
  }
});

document.getElementById('product-gallery').appendChild(thumbnail);
</script>`,

    extjs: `// ExtJS Thumbnail using @cin7/extjs-adapters
Ext.create('Ext.Img', {
  src: 'https://picsum.photos/seed/product1/200/200.jpg',
  alt: 'Product image',
  cls: 'polaris-thumbnail polaris-thumbnail--medium',
  width: 80,
  height: 80,
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisThumbnail } from '@cin7/extjs-adapters';

const thumbnail = Ext.create('PolarisThumbnail', {
  size: 'medium',
  source: 'https://picsum.photos/seed/product1/200/200.jpg',
  alt: 'Product image',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Thumbnail } from '@shopify/polaris';
import React from 'react';

interface ThumbnailExampleProps {
  size?: 'small' | 'medium' | 'large';
  source: string;
  alt: string;
  transparent?: boolean;
}

function ThumbnailExample({
  size = 'medium',
  source,
  alt,
  transparent = false
}: ThumbnailExampleProps): JSX.Element {
  return (
    <Thumbnail
      size={size}
      source={source}
      alt={alt}
      transparent={transparent}
    />
  );
}

export default ThumbnailExample;`,
  }
};

// VideoThumbnail Component Examples

export const videothumbnailExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { VideoThumbnail } from '@shopify/polaris';
import React from 'react';

function VideoThumbnailExample() {
  return (
    <VideoThumbnail
      thumbnailUrl="https://picsum.photos/seed/video1/640/360.jpg"
      videoLength={120}
      thumbnailAlt="Video thumbnail preview"
    />
  );
}

export default VideoThumbnailExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-video-thumbnail">
  <img
    src="https://picsum.photos/seed/video1/640/360.jpg"
    alt="Video thumbnail preview"
    class="polaris-video-thumbnail__image"
  />
  <div class="polaris-video-thumbnail__play-button">
    <svg viewBox="0 0 20 20" class="polaris-icon">
      <path d="M6 4l10 6-10 6V4z"/>
    </svg>
  </div>
  <div class="polaris-video-thumbnail__duration">2:00</div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createVideoThumbnail } from '@cin7/vanilla-js';

const videoThumbnail = createVideoThumbnail({
  thumbnailUrl: 'https://picsum.photos/seed/video1/640/360.jpg',
  videoLength: 120,
  alt: 'Video thumbnail preview',
  onPlaybackStart: () => {
    console.log('Video playback started');
  }
});

document.getElementById('video-section').appendChild(videoThumbnail);
</script>`,

    extjs: `// ExtJS VideoThumbnail using @cin7/extjs-adapters
Ext.create('Ext.Container', {
  cls: 'polaris-video-thumbnail',
  layout: 'fit',
  items: [{
    xtype: 'image',
    src: 'https://picsum.photos/seed/video1/640/360.jpg',
    alt: 'Video thumbnail preview'
  }],
  listeners: {
    el: {
      click: function() {
        console.log('Video playback started');
      }
    }
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisVideoThumbnail } from '@cin7/extjs-adapters';

const videoThumbnail = Ext.create('PolarisVideoThumbnail', {
  thumbnailUrl: 'https://picsum.photos/seed/video1/640/360.jpg',
  videoLength: 120,
  alt: 'Video thumbnail preview',
  onPlaybackStart: function() {
    console.log('Video playback started');
  }
});`,

    typescript: `import { VideoThumbnail } from '@shopify/polaris';
import React from 'react';

interface VideoThumbnailExampleProps {
  thumbnailUrl: string;
  videoLength: number;
  thumbnailAlt: string;
  showProgress?: boolean;
  accessibilityLabel?: string;
  onPlaybackStart?: () => void;
}

function VideoThumbnailExample({
  thumbnailUrl,
  videoLength,
  thumbnailAlt,
  showProgress = false,
  accessibilityLabel,
  onPlaybackStart
}: VideoThumbnailExampleProps): JSX.Element {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <VideoThumbnail
      thumbnailUrl={thumbnailUrl}
      videoLength={videoLength}
      thumbnailAlt={thumbnailAlt}
      showProgress={showProgress}
      accessibilityLabel={accessibilityLabel || \`Video duration \${formatTime(videoLength)}\`}
      onPlaybackStart={onPlaybackStart}
    />
  );
}

export default VideoThumbnailExample;`,
  },

  withplaybutton: {
    react: `import { VideoThumbnail } from '@shopify/polaris';
import React from 'react';

function WithPlayButtonExample() {
  return (
    <div style={{ width: '400px' }}>
      <VideoThumbnail
        thumbnailUrl="https://picsum.photos/seed/playbutton/640/360.jpg"
        videoLength={180}
        thumbnailAlt="Product demonstration video"
        onPlaybackStart={() => console.log('Video playback started')}
      />
    </div>
  );
}

export default WithPlayButtonExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="video-container" style="width: 400px;">
  <div class="polaris-video-thumbnail">
    <img
      src="https://picsum.photos/seed/playbutton/640/360.jpg"
      alt="Product demonstration video"
      class="polaris-video-thumbnail__image"
    />
    <div class="polaris-video-thumbnail__play-button">
      <svg viewBox="0 0 20 20" class="polaris-icon">
        <path d="M6 4l10 6-10 6V4z" fill="currentColor"/>
      </svg>
    </div>
    <div class="polaris-video-thumbnail__duration">3:00</div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

const videoThumbnail = $('.polaris-video-thumbnail');
on(videoThumbnail, 'click', () => {
  console.log('Video playback started');
  // Trigger video playback
});
</script>`,

    extjs: `// ExtJS VideoThumbnail with play button
import { PolarisVideoThumbnail } from '@cin7/extjs-adapters';

Ext.create('Ext.container.Container', {
  width: 400,
  items: [{
    xtype: 'polaris-video-thumbnail',
    thumbnailUrl: 'https://picsum.photos/seed/playbutton/640/360.jpg',
    videoLength: 180,
    alt: 'Product demonstration video',
    showPlayButton: true,
    listeners: {
      playbackstart: function() {
        console.log('Video playback started');
      }
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail } from '@shopify/polaris';
import React, { useCallback } from 'react';

interface VideoWithPlayButtonProps {
  thumbnailUrl?: string;
  videoLength?: number;
  onPlaybackStart?: () => void;
}

const WithPlayButtonExample: React.FC<VideoWithPlayButtonProps> = ({
  thumbnailUrl = 'https://picsum.photos/seed/playbutton/640/360.jpg',
  videoLength = 180,
  onPlaybackStart
}) => {
  const handlePlaybackStart = useCallback(() => {
    console.log('Video playback started');
    onPlaybackStart?.();
  }, [onPlaybackStart]);

  return (
    <div style={{ width: '400px' }}>
      <VideoThumbnail
        thumbnailUrl={thumbnailUrl}
        videoLength={videoLength}
        thumbnailAlt="Product demonstration video"
        onPlaybackStart={handlePlaybackStart}
      />
    </div>
  );
};

export default WithPlayButtonExample;`,
  },

  videolengthdisplay: {
    react: `import { VideoThumbnail, Text, Card } from '@shopify/polaris';
import React from 'react';

function VideoLengthDisplayExample() {
  const videos = [
    { length: 30, title: 'Quick Tip' },
    { length: 120, title: 'Tutorial' },
    { length: 450, title: 'Full Course' },
    { length: 1800, title: 'Webinar Recording' },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return \`\${hours}:\${minutes.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
    }
    return \`\${minutes}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Video Length Variations</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {videos.map((video, index) => (
          <Card key={index} padding="300">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <VideoThumbnail
                thumbnailUrl={\`https://picsum.photos/seed/video\${index}/320/180.jpg\`}
                videoLength={video.length}
                thumbnailAlt={\`\${video.title} video thumbnail\`}
              />
              <div>
                <Text variant="bodyMd" fontWeight="medium">{video.title}</Text>
                <Text color="subdued" variant="bodySm">
                  Duration: {formatTime(video.length)}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default VideoLengthDisplayExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="video-length-display">
  <h3>Video Length Variations</h3>
  <div class="video-grid">
    <div class="video-card">
      <div class="polaris-video-thumbnail">
        <img src="https://picsum.photos/seed/video0/320/180.jpg" alt="Quick Tip">
        <div class="polaris-video-thumbnail__duration">0:30</div>
      </div>
      <div class="video-info">
        <strong>Quick Tip</strong>
        <span class="subdued">Duration: 0:30</span>
      </div>
    </div>
    <div class="video-card">
      <div class="polaris-video-thumbnail">
        <img src="https://picsum.photos/seed/video1/320/180.jpg" alt="Tutorial">
        <div class="polaris-video-thumbnail__duration">2:00</div>
      </div>
      <div class="video-info">
        <strong>Tutorial</strong>
        <span class="subdued">Duration: 2:00</span>
      </div>
    </div>
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { formatDuration } from '@cin7/vanilla-js';

const videos = [
  { length: 30, title: 'Quick Tip' },
  { length: 120, title: 'Tutorial' },
  { length: 450, title: 'Full Course' },
  { length: 1800, title: 'Webinar Recording' }
];

videos.forEach((video, index) => {
  const formattedTime = formatDuration(video.length);
  console.log(\`\${video.title}: \${formattedTime}\`);
});
</script>`,

    extjs: `// ExtJS Video Length Display Grid
Ext.create('Ext.panel.Panel', {
  title: 'Video Length Variations',
  layout: {
    type: 'grid',
    columns: 2
  },
  items: [
    { length: 30, title: 'Quick Tip' },
    { length: 120, title: 'Tutorial' },
    { length: 450, title: 'Full Course' },
    { length: 1800, title: 'Webinar Recording' }
  ].map(function(video, index) {
    return {
      xtype: 'panel',
      padding: 10,
      items: [{
        xtype: 'image',
        src: 'https://picsum.photos/seed/video' + index + '/320/180.jpg',
        alt: video.title
      }, {
        xtype: 'container',
        html: '<strong>' + video.title + '</strong><br>' +
              '<span style="color: #637381">Duration: ' +
              formatTime(video.length) + '</span>'
      }]
    };
  }),
  renderTo: Ext.getBody()
});

function formatTime(seconds) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var secs = seconds % 60;
  if (hours > 0) {
    return hours + ':' + pad(minutes) + ':' + pad(secs);
  }
  return minutes + ':' + pad(secs);
}

function pad(num) {
  return num.toString().padStart(2, '0');
}`,

    typescript: `import { VideoThumbnail, Text, Card } from '@shopify/polaris';
import React from 'react';

interface Video {
  length: number;
  title: string;
}

const VideoLengthDisplayExample: React.FC = () => {
  const videos: Video[] = [
    { length: 30, title: 'Quick Tip' },
    { length: 120, title: 'Tutorial' },
    { length: 450, title: 'Full Course' },
    { length: 1800, title: 'Webinar Recording' },
  ];

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return \`\${hours}:\${minutes.toString().padStart(2, '0')}:\${secs.toString().padStart(2, '0')}\`;
    }
    return \`\${minutes}:\${secs.toString().padStart(2, '0')}\`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Video Length Variations</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {videos.map((video, index) => (
          <Card key={index} padding="300">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <VideoThumbnail
                thumbnailUrl={\`https://picsum.photos/seed/video\${index}/320/180.jpg\`}
                videoLength={video.length}
                thumbnailAlt={\`\${video.title} video thumbnail\`}
              />
              <div>
                <Text variant="bodyMd" fontWeight="medium">{video.title}</Text>
                <Text color="subdued" variant="bodySm">
                  Duration: {formatTime(video.length)}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoLengthDisplayExample;`,
  },

  videogallery: {
    react: `import { VideoThumbnail, Text, InlineStack, Icon } from '@shopify/polaris';
import { ViewIcon } from '@shopify/polaris-icons';
import React, { useState } from 'react';

function VideoGalleryExample() {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videos = [
    { title: 'Product Introduction', length: 90, views: 1250 },
    { title: 'Features Overview', length: 180, views: 890 },
    { title: 'How to Use', length: 240, views: 2100 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Video Gallery</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {videos.map((video, index) => (
          <div key={index} onClick={() => setSelectedVideo(index)}>
            <VideoThumbnail
              thumbnailUrl={\`https://picsum.photos/seed/gallery\${index}/320/180.jpg\`}
              videoLength={video.length}
              thumbnailAlt={\`\${video.title} video thumbnail\`}
            />
            <Text variant="bodySm" fontWeight="medium">{video.title}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGalleryExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="video-gallery">
  <h3>Video Gallery</h3>
  <div class="video-grid"></div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const videos = [
  { title: 'Product Introduction', length: 90, views: 1250 },
  { title: 'Features Overview', length: 180, views: 890 }
];

const grid = $('.video-grid');
videos.forEach((video, index) => {
  const item = document.createElement('div');
  item.innerHTML = \`<img src="https://picsum.photos/seed/gallery\${index}/320/180.jpg"><p>\${video.title}</p>\`;
  on(item, 'click', () => console.log('Selected:', video.title));
  grid.appendChild(item);
});
</script>`,

    extjs: `// ExtJS Video Gallery
Ext.create('Ext.dataview.DataView', {
  store: Ext.create('Ext.data.Store', {
    fields: ['title', 'length', 'views'],
    data: [
      { title: 'Product Introduction', length: 90, views: 1250 },
      { title: 'Features Overview', length: 180, views: 890 }
    ]
  }),
  tpl: '<tpl for="."><div class="video-item"><img src="https://picsum.photos/seed/gallery{#}/320/180.jpg"><p>{title}</p></div></tpl>',
  itemSelector: 'div.video-item',
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Text } from '@shopify/polaris';
import React, { useState } from 'react';

interface Video { title: string; length: number; views: number; }

const VideoGalleryExample: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videos: Video[] = [
    { title: 'Product Introduction', length: 90, views: 1250 },
    { title: 'Features Overview', length: 180, views: 890 }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
      {videos.map((video, index) => (
        <div key={index} onClick={() => setSelectedVideo(index)}>
          <VideoThumbnail
            thumbnailUrl={\`https://picsum.photos/seed/gallery\${index}/320/180.jpg\`}
            videoLength={video.length}
            thumbnailAlt={video.title}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGalleryExample;`,
  },

  coursecontent: {
    react: `import { VideoThumbnail, Text, Button } from '@shopify/polaris';
import React, { useState } from 'react';

function CourseContentExample() {
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set([0, 1]));
  const courseVideos = [
    { title: 'Chapter 1: Introduction', length: 480 },
    { title: 'Chapter 2: Getting Started', length: 600 },
    { title: 'Chapter 3: Basic Concepts', length: 720 },
  ];

  const toggleWatched = (index: number) => {
    setWatchedVideos(prev => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  };

  return (
    <div style={{ width: '600px' }}>
      {courseVideos.map((video, index) => (
        <div key={index} style={{ display: 'flex', gap: '16px', padding: '16px' }}>
          <VideoThumbnail
            thumbnailUrl={\`https://picsum.photos/seed/course\${index}/160/90.jpg\`}
            videoLength={video.length}
            thumbnailAlt={video.title}
          />
          <div>
            <Text variant="bodyMd" fontWeight="medium">{video.title}</Text>
            <Button size="small" onClick={() => toggleWatched(index)}>
              {watchedVideos.has(index) ? 'Watched' : 'Mark as watched'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CourseContentExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="course-content"></div>

<script>
import { $, on } from '@cin7/vanilla-js';

const watched = new Set([0, 1]);
const courses = [
  { title: 'Chapter 1: Introduction', length: 480 },
  { title: 'Chapter 2: Getting Started', length: 600 }
];

const container = $('.course-content');
courses.forEach((course, i) => {
  const item = document.createElement('div');
  item.innerHTML = \`<img src="https://picsum.photos/seed/course\${i}/160/90.jpg"><p>\${course.title}</p><button>Mark as watched</button>\`;
  on(item.querySelector('button'), 'click', () => watched.has(i) ? watched.delete(i) : watched.add(i));
  container.appendChild(item);
});
</script>`,

    extjs: `// ExtJS Course Content
Ext.create('Ext.panel.Panel', {
  title: 'Course Content',
  items: [{
    xtype: 'dataview',
    store: Ext.create('Ext.data.Store', {
      fields: ['title', 'length'],
      data: [
        { title: 'Chapter 1: Introduction', length: 480 },
        { title: 'Chapter 2: Getting Started', length: 600 }
      ]
    }),
    tpl: '<tpl for="."><div><img src="https://picsum.photos/seed/course{#}/160/90.jpg"><p>{title}</p></div></tpl>',
    itemSelector: 'div'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Text, Button } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface CourseVideo { title: string; length: number; }

const CourseContentExample: React.FC = () => {
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set([0, 1]));
  const courseVideos: CourseVideo[] = [
    { title: 'Chapter 1: Introduction', length: 480 },
    { title: 'Chapter 2: Getting Started', length: 600 }
  ];

  const toggleWatched = useCallback((index: number) => {
    setWatchedVideos(prev => {
      const newSet = new Set(prev);
      newSet.has(index) ? newSet.delete(index) : newSet.add(index);
      return newSet;
    });
  }, []);

  return (
    <div>
      {courseVideos.map((video, index) => (
        <div key={index}>
          <VideoThumbnail
            thumbnailUrl={\`https://picsum.photos/seed/course\${index}/160/90.jpg\`}
            videoLength={video.length}
            thumbnailAlt={video.title}
          />
          <Button onClick={() => toggleWatched(index)}>
            {watchedVideos.has(index) ? 'Watched' : 'Mark as watched'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CourseContentExample;`,
  },

  interactivepreview: {
    react: `import { VideoThumbnail, Card, Text, Icon } from '@shopify/polaris';
import { PlayIcon, PauseCircleIcon, ClockIcon } from '@shopify/polaris-icons';
import React, { useState, useEffect } from 'react';

function InteractivePreviewExample() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => setProgress(prev => Math.min(prev + 1, 100)), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  return (
    <Card padding="0">
      <VideoThumbnail
        thumbnailUrl="https://picsum.photos/seed/interactive/500/281.jpg"
        videoLength={120}
        thumbnailAlt="Interactive video preview"
        showProgress={isPlaying}
      />
      <div style={{ padding: '16px' }}>
        <Text variant="headingMd">Interactive Product Demo</Text>
        <button onClick={() => setIsPlaying(!isPlaying)}>
          <Icon source={isPlaying ? PauseCircleIcon : PlayIcon} />
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </Card>
  );
}

export default InteractivePreviewExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="interactive-video">
  <img src="https://picsum.photos/seed/interactive/500/281.jpg">
  <button id="playBtn">Play</button>
  <div class="progress-bar" style="width: 0%;"></div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

let isPlaying = false;
let progress = 0;

on($('#playBtn'), 'click', () => {
  isPlaying = !isPlaying;
  $('#playBtn').textContent = isPlaying ? 'Pause' : 'Play';
  if (isPlaying) {
    setInterval(() => {
      progress = Math.min(progress + 1, 100);
      $('.progress-bar').style.width = \`\${progress}%\`;
    }, 1000);
  }
});
</script>`,

    extjs: `// ExtJS Interactive Video Preview
Ext.create('Ext.panel.Panel', {
  title: 'Interactive Product Demo',
  items: [{
    xtype: 'image',
    src: 'https://picsum.photos/seed/interactive/500/281.jpg'
  }],
  buttons: [{
    text: 'Play',
    handler: function(btn) {
      btn.setText(btn.getText() === 'Play' ? 'Pause' : 'Play');
    }
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Card, Text, Icon } from '@shopify/polaris';
import { PlayIcon, PauseCircleIcon } from '@shopify/polaris-icons';
import React, { useState, useEffect, useCallback } from 'react';

const InteractivePreviewExample: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => setProgress(prev => Math.min(prev + 1, 100)), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const togglePlayback = useCallback(() => setIsPlaying(prev => !prev), []);

  return (
    <Card padding="0">
      <VideoThumbnail
        thumbnailUrl="https://picsum.photos/seed/interactive/500/281.jpg"
        videoLength={120}
        thumbnailAlt="Interactive video preview"
        showProgress={isPlaying}
      />
      <div style={{ padding: '16px' }}>
        <button onClick={togglePlayback}>
          <Icon source={isPlaying ? PauseCircleIcon : PlayIcon} />
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </Card>
  );
};

export default InteractivePreviewExample;`,
  },

  withmetadata: {
    react: `import { VideoThumbnail, Text, Card, Badge, Icon } from '@shopify/polaris';
import { ClockIcon, ViewIcon } from '@shopify/polaris-icons';
import React from 'react';

function WithMetadataExample() {
  const videos = [
    { title: 'Product Launch Event', description: 'Live recording of our annual product launch.', length: 3600, views: 15420, category: 'Events' },
    { title: 'Customer Success Story', description: 'How Company X transformed their business.', length: 900, views: 8930, category: 'Testimonials' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
      {videos.map((video, index) => (
        <Card key={index} padding="400">
          <VideoThumbnail
            thumbnailUrl={\`https://picsum.photos/seed/metadata\${index}/400/225.jpg\`}
            videoLength={video.length}
            thumbnailAlt={video.title}
          />
          <Text variant="headingMd">{video.title}</Text>
          <Text color="subdued">{video.description}</Text>
          <Badge>{video.category}</Badge>
          <Icon source={ViewIcon} />
          <Text variant="bodySm">{video.views.toLocaleString()} views</Text>
        </Card>
      ))}
    </div>
  );
}

export default WithMetadataExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="video-metadata-grid"></div>

<script>
import { $ } from '@cin7/vanilla-js';

const videos = [
  { title: 'Product Launch Event', length: 3600, views: 15420, category: 'Events' },
  { title: 'Customer Success Story', length: 900, views: 8930, category: 'Testimonials' }
];

const grid = $('.video-metadata-grid');
videos.forEach((video, i) => {
  const card = document.createElement('div');
  card.innerHTML = \`<img src="https://picsum.photos/seed/metadata\${i}/400/225.jpg"><h3>\${video.title}</h3><span class="badge">\${video.category}</span><p>\${video.views} views</p>\`;
  grid.appendChild(card);
});
</script>`,

    extjs: `// ExtJS Video with Metadata
Ext.create('Ext.dataview.DataView', {
  store: Ext.create('Ext.data.Store', {
    fields: ['title', 'description', 'length', 'views', 'category'],
    data: [
      { title: 'Product Launch Event', description: 'Live recording', length: 3600, views: 15420, category: 'Events' }
    ]
  }),
  tpl: '<tpl for="."><div><img src="https://picsum.photos/seed/metadata{#}/400/225.jpg"><h3>{title}</h3><p>{description}</p><span>{views} views</span></div></tpl>',
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Text, Card, Badge } from '@shopify/polaris';
import React from 'react';

interface VideoMetadata { title: string; description: string; length: number; views: number; category: string; }

const WithMetadataExample: React.FC = () => {
  const videos: VideoMetadata[] = [
    { title: 'Product Launch Event', description: 'Live recording of annual launch', length: 3600, views: 15420, category: 'Events' }
  ];

  return (
    <div>
      {videos.map((video, index) => (
        <Card key={index} padding="400">
          <VideoThumbnail
            thumbnailUrl={\`https://picsum.photos/seed/metadata\${index}/400/225.jpg\`}
            videoLength={video.length}
            thumbnailAlt={video.title}
          />
          <Text variant="headingMd">{video.title}</Text>
          <Badge>{video.category}</Badge>
        </Card>
      ))}
    </div>
  );
};

export default WithMetadataExample;`,
  },

  loadingstate: {
    react: `import { Text } from '@shopify/polaris';
import React from 'react';

function LoadingStateExample() {
  return (
    <div style={{ width: '400px', border: '1px solid #e1e1e1', borderRadius: '8px' }}>
      <div style={{ backgroundColor: '#f3f4f6', height: '225px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #e1e1e1', borderTop: '4px solid #007ace', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          <Text color="subdued">Loading video...</Text>
        </div>
      </div>
    </div>
  );
}

export default LoadingStateExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="video-loading">
  <div class="loading-spinner"></div>
  <p>Loading video...</p>
</div>

<style>
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e1e1e1;
  border-top: 4px solid #007ace;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>`,

    extjs: `// ExtJS Loading State
Ext.create('Ext.container.Container', {
  html: '<div class="loading-container"><div class="spinner"></div><p>Loading video...</p></div>',
  cls: 'video-loading-state',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

const LoadingStateExample: React.FC = () => {
  return (
    <div style={{ width: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ backgroundColor: '#f3f4f6', height: '225px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '4px solid #e1e1e1', borderTop: '4px solid #007ace', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
          <Text color="subdued">Loading video...</Text>
        </div>
      </div>
    </div>
  );
};

export default LoadingStateExample;`,
  },

  accessibility: {
    react: `import { VideoThumbnail, Text, Card } from '@shopify/polaris';
import React from 'react';

function AccessibilityExample() {
  return (
    <Card padding="400">
      <Text variant="bodyMd" fontWeight="medium">Screen Reader Friendly Video Thumbnails</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/a11y1/300/169.jpg"
          videoLength={180}
          thumbnailAlt="Product demonstration video showing main features and benefits"
          accessibilityLabel="Play product demonstration video, 3 minutes long"
        />
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/a11y2/300/169.jpg"
          videoLength={300}
          thumbnailAlt="Tutorial video with step-by-step instructions"
          accessibilityLabel="Play tutorial video, 5 minutes long, includes closed captions"
        />
      </div>
    </Card>
  );
}

export default AccessibilityExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="accessible-videos">
  <h3>Screen Reader Friendly Videos</h3>
  <div class="video-thumbnails">
    <div class="polaris-video-thumbnail" role="button" aria-label="Play product demonstration video, 3 minutes long" tabindex="0">
      <img src="https://picsum.photos/seed/a11y1/300/169.jpg" alt="Product demonstration video showing main features">
    </div>
    <div class="polaris-video-thumbnail" role="button" aria-label="Play tutorial video, 5 minutes long, includes closed captions" tabindex="0">
      <img src="https://picsum.photos/seed/a11y2/300/169.jpg" alt="Tutorial video with step-by-step instructions">
    </div>
  </div>
</div>`,

    extjs: `// ExtJS Accessible Video Thumbnails
Ext.create('Ext.panel.Panel', {
  title: 'Accessibility Features',
  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [{
      xtype: 'image',
      src: 'https://picsum.photos/seed/a11y1/300/169.jpg',
      alt: 'Product demonstration video showing main features',
      listeners: {
        render: function(img) {
          img.getEl().set({ 'aria-label': 'Play product demonstration video, 3 minutes long', tabindex: 0 });
        }
      }
    }]
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Text, Card } from '@shopify/polaris';
import React from 'react';

const AccessibilityExample: React.FC = () => {
  return (
    <Card padding="400">
      <Text variant="bodyMd" fontWeight="medium">Screen Reader Friendly Video Thumbnails</Text>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/a11y1/300/169.jpg"
          videoLength={180}
          thumbnailAlt="Product demonstration video showing main features and benefits"
          accessibilityLabel="Play product demonstration video, 3 minutes long"
        />
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/a11y2/300/169.jpg"
          videoLength={300}
          thumbnailAlt="Tutorial video with step-by-step instructions"
          accessibilityLabel="Play tutorial video, 5 minutes long, includes closed captions"
        />
      </div>
    </Card>
  );
};

export default AccessibilityExample;`,
  },

  responsivedesign: {
    react: `import { VideoThumbnail, Text, Button, InlineStack } from '@shopify/polaris';
import React, { useState } from 'react';

function ResponsiveDesignExample() {
  const [containerSize, setContainerSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <Text variant="headingMd">Responsive Video Thumbnails</Text>
        <InlineStack gap="200">
          <Button size="small" variant={containerSize === 'small' ? 'primary' : 'plain'} onClick={() => setContainerSize('small')}>Small</Button>
          <Button size="small" variant={containerSize === 'medium' ? 'primary' : 'plain'} onClick={() => setContainerSize('medium')}>Medium</Button>
          <Button size="small" variant={containerSize === 'large' ? 'primary' : 'plain'} onClick={() => setContainerSize('large')}>Large</Button>
        </InlineStack>
      </div>
      <div style={{ width: containerSize === 'small' ? '300px' : containerSize === 'medium' ? '500px' : '700px' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/responsive/700/394.jpg"
          videoLength={180}
          thumbnailAlt="Responsive video thumbnail"
        />
      </div>
    </div>
  );
}

export default ResponsiveDesignExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="responsive-video-container">
  <div class="size-controls">
    <button data-size="small">Small</button>
    <button data-size="medium">Medium</button>
    <button data-size="large">Large</button>
  </div>
  <div class="video-wrapper" style="width: 500px;">
    <img src="https://picsum.photos/seed/responsive/700/394.jpg" alt="Responsive video">
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

on('[data-size]', 'click', (e) => {
  const size = e.target.dataset.size;
  const widths = { small: '300px', medium: '500px', large: '700px' };
  $('.video-wrapper').style.width = widths[size];
});
</script>`,

    extjs: `// ExtJS Responsive Video
Ext.create('Ext.panel.Panel', {
  title: 'Responsive Design',
  tbar: [{
    text: 'Small',
    handler: function() { this.up('panel').setWidth(300); }
  }, {
    text: 'Medium',
    handler: function() { this.up('panel').setWidth(500); }
  }, {
    text: 'Large',
    handler: function() { this.up('panel').setWidth(700); }
  }],
  items: [{
    xtype: 'image',
    src: 'https://picsum.photos/seed/responsive/700/394.jpg'
  }],
  width: 500,
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Text, Button, InlineStack } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

type ContainerSize = 'small' | 'medium' | 'large';

const ResponsiveDesignExample: React.FC = () => {
  const [containerSize, setContainerSize] = useState<ContainerSize>('medium');

  const handleSizeChange = useCallback((size: ContainerSize) => {
    setContainerSize(size);
  }, []);

  const getWidth = (): string => {
    const sizes = { small: '300px', medium: '500px', large: '700px' };
    return sizes[containerSize];
  };

  return (
    <div>
      <InlineStack gap="200">
        <Button size="small" variant={containerSize === 'small' ? 'primary' : 'plain'} onClick={() => handleSizeChange('small')}>Small</Button>
        <Button size="small" variant={containerSize === 'medium' ? 'primary' : 'plain'} onClick={() => handleSizeChange('medium')}>Medium</Button>
        <Button size="small" variant={containerSize === 'large' ? 'primary' : 'plain'} onClick={() => handleSizeChange('large')}>Large</Button>
      </InlineStack>
      <div style={{ width: getWidth() }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/responsive/700/394.jpg"
          videoLength={180}
          thumbnailAlt="Responsive video thumbnail"
        />
      </div>
    </div>
  );
};

export default ResponsiveDesignExample;`,
  },

  customstyling: {
    react: `import { VideoThumbnail, Badge } from '@shopify/polaris';
import React from 'react';

function CustomStylingExample() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
      <div style={{ position: 'relative' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/custom1/400/225.jpg"
          videoLength={120}
          thumbnailAlt="Styled video thumbnail with badge"
        />
        <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
          <Badge status="new">NEW</Badge>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/custom2/400/225.jpg"
          videoLength={240}
          thumbnailAlt="Styled video thumbnail with live indicator"
        />
        <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#d72c0d', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
          LIVE
        </div>
      </div>
    </div>
  );
}

export default CustomStylingExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="custom-styled-videos">
  <div class="video-item">
    <img src="https://picsum.photos/seed/custom1/400/225.jpg" alt="Video with badge">
    <span class="badge-new">NEW</span>
  </div>
  <div class="video-item">
    <img src="https://picsum.photos/seed/custom2/400/225.jpg" alt="Live video">
    <span class="badge-live">LIVE</span>
  </div>
</div>

<style>
.badge-new { position: absolute; top: 8px; left: 8px; background: #007ace; color: white; padding: 4px 8px; border-radius: 4px; }
.badge-live { position: absolute; top: 8px; right: 8px; background: #d72c0d; color: white; padding: 4px 8px; border-radius: 4px; }
</style>`,

    extjs: `// ExtJS Custom Styled Video Thumbnails
Ext.create('Ext.container.Container', {
  layout: 'hbox',
  items: [{
    xtype: 'container',
    html: '<div style="position:relative"><img src="https://picsum.photos/seed/custom1/400/225.jpg"><span style="position:absolute;top:8px;left:8px;background:#007ace;color:white;padding:4px 8px;border-radius:4px">NEW</span></div>'
  }, {
    xtype: 'container',
    html: '<div style="position:relative"><img src="https://picsum.photos/seed/custom2/400/225.jpg"><span style="position:absolute;top:8px;right:8px;background:#d72c0d;color:white;padding:4px 8px;border-radius:4px">LIVE</span></div>'
  }],
  renderTo: Ext.getBody()
});`,

    typescript: `import { VideoThumbnail, Badge } from '@shopify/polaris';
import React from 'react';

const CustomStylingExample: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
      <div style={{ position: 'relative' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/custom1/400/225.jpg"
          videoLength={120}
          thumbnailAlt="Styled video thumbnail with badge"
        />
        <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
          <Badge status="new">NEW</Badge>
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <VideoThumbnail
          thumbnailUrl="https://picsum.photos/seed/custom2/400/225.jpg"
          videoLength={240}
          thumbnailAlt="Styled video thumbnail with live indicator"
        />
        <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#d72c0d', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
          LIVE
        </div>
      </div>
    </div>
  );
};

export default CustomStylingExample;`,
  }
};

// ==============================================================
// DATA DISPLAY COMPONENT CODE VARIANTS
// ==============================================================
// This file contains multi-language code examples for Data Display components.
// To be integrated into codeVariants.ts before "// Utility function to get code variants"

// DataTable Component Examples
