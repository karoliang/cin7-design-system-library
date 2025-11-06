import type { Meta, StoryObj } from '@storybook/react';
import { MediaCard, Badge, Button, Text, InlineStack, Icon, Avatar } from '@shopify/polaris';
import {
  PlayIcon,
  ExternalIcon,
  HeartIcon,
  PinFilledIcon,
  ShareIcon,
  ClockIcon,
  ViewIcon,
  ArrowDownIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Data Display/MediaCard',
  component: MediaCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Media cards are used to display rich media content with accompanying text and actions. They are perfect for featuring products, videos, articles, blog posts, and any content that combines visual media with descriptive information. Media cards support images, videos, and various interactive elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description text',
    },
    primaryAction: {
      control: 'object',
      description: 'Primary action button configuration',
    },
    secondaryAction: {
      control: 'object',
      description: 'Secondary action configuration',
    },
    portrait: {
      control: 'boolean',
      description: 'Use portrait orientation',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Card size',
    },
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof MediaCard>;

export const Default: Story = {
  args: {
    title: 'Modern Office Chair',
    description: 'Ergonomic office chair with lumbar support and adjustable armrests. Perfect for long working hours.',
    portrait: true,
    primaryAction: {
      content: 'View details',
      onAction: () => console.log('View details clicked'),
    },
  },
  parameters: {
    codeVariants: getCodeVariants('mediacard', 'default'),
  },
};

export const ProductCard: Story = {
  render: () => (
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
  ),
};

export const VideoCard: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
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
    </div>
  ),
};

export const ArticleCard: Story = {
  render: () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
      <div style={{ width: '400px' }}>
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
      </div>
    );
  },
};

export const CustomerTestimonial: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
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
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Media Card Sizes</Text>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <div style={{ width: '280px' }}>
          <Text variant="bodySm" fontWeight="medium" style={{ marginBottom: '8px' }}>Small</Text>
          <MediaCard
            size="small"
            title="Compact Product"
            description="Brief description of the product feature and benefits."
            primaryAction={{
              content: 'View',
              onAction: () => console.log('View small'),
            }}
          />
        </div>

        <div style={{ width: '400px' }}>
          <Text variant="bodySm" fontWeight="medium" style={{ marginBottom: '8px' }}>Medium</Text>
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
        </div>

        <div style={{ width: '480px' }}>
          <Text variant="bodySm" fontWeight="medium" style={{ marginBottom: '8px' }}>Large</Text>
          <MediaCard
            size="large"
            title="Premium Product with Extended Features"
            description="This comprehensive product description provides detailed information about all the features, benefits, and use cases. Perfect for showcasing premium offerings with rich media content and detailed specifications."
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
    </div>
  ),
};

export const LandscapeMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Landscape Media Cards</Text>

      <div style={{ display: 'flex', gap: '24px' }}>
        <MediaCard
          title="Landscape Photography"
          description="Stunning natural landscapes from around the world, captured in high resolution with professional equipment."
          primaryAction={{
            content: 'View gallery',
            onAction: () => console.log('View gallery'),
          }}
          secondaryAction={{
            content: 'Download',
            onAction: () => console.log('Download'),
            icon: ArrowDownIcon,
          }}
        />

        <MediaCard
          title="Architectural Design"
          description="Modern architectural projects showcasing innovative design principles and sustainable building practices."
          primaryAction={{
            content: 'Explore',
            onAction: () => console.log('Explore'),
          }}
          secondaryAction={{
            content: 'Share',
            onAction: () => console.log('Share'),
            icon: ShareIcon,
          }}
        />
      </div>
    </div>
  ),
};

export const WithMetadata: Story = {
  render: () => {
    return (
      <div style={{ width: '400px' }}>
        <MediaCard
          title="Advanced Analytics Dashboard"
          description="Comprehensive analytics solution with real-time data visualization, custom reporting, and predictive insights. Perfect for data-driven decision making."
          primaryAction={{
            content: 'Start free trial',
            onAction: () => console.log('Start trial'),
          }}
          secondaryAction={{
            content: 'View demo',
            onAction: () => console.log('View demo'),
          }}
        >
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e1e1e1' }}>
            <InlineStack gap="200" wrap={false}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon source={ClockIcon} color="subdued" />
                <Text variant="bodySm" color="subdued">5 min read</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Icon source={ViewIcon} color="subdued" />
                <Text variant="bodySm" color="subdued">12.5k views</Text>
              </div>
              <Badge status="success">Updated</Badge>
            </InlineStack>
          </div>
        </MediaCard>
      </div>
    );
  },
};

export const ProductCollection: Story = {
  render: () => {
    const products = [
      {
        title: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones with 30-hour battery life and superior sound quality.',
        badge: 'Bestseller',
        badgeTone: 'success' as const,
      },
      {
        title: 'Smart Watch',
        description: 'Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.',
        badge: 'New',
        badgeTone: 'info' as const,
      },
      {
        title: 'Portable Speaker',
        description: 'Waterproof Bluetooth speaker with 360° sound and 24-hour playtime.',
        badge: 'Limited',
        badgeTone: 'attention' as const,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Featured Products</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {products.map((product, index) => (
            <MediaCard
              key={index}
              title={product.title}
              description={product.description}
              portrait
              primaryAction={{
                content: 'View details',
                onAction: () => console.log(`View ${product.title}`),
              }}
              secondaryAction={{
                content: 'Add to cart',
                onAction: () => console.log(`Add ${product.title} to cart`),
              }}
            >
              <div style={{ marginTop: '12px' }}>
                <Badge status={product.badgeTone}>{product.badge}</Badge>
              </div>
            </MediaCard>
          ))}
        </div>
      </div>
    );
  },
};

export const InteractiveCard: Story = {
  render: () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(42);

    const handleLike = () => {
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    };

    return (
      <div style={{ width: '400px' }}>
        <MediaCard
          title="Innovative Design Solution"
          description="Revolutionary approach to modern design challenges, combining aesthetics with functionality to create exceptional user experiences."
          primaryAction={{
            content: 'Explore project',
            onAction: () => console.log('Explore project'),
          }}
          secondaryAction={{
            content: 'View portfolio',
            onAction: () => console.log('View portfolio'),
          }}
        >
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e1e1e1' }}>
            <InlineStack gap="200">
              <button
                onClick={handleLike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  color: isLiked ? '#d72c0d' : '#637381',
                }}
              >
                <Icon source={HeartIcon} color={isLiked ? 'critical' : 'subdued'} />
                <Text variant="bodySm">{likeCount}</Text>
              </button>
              <button
                onClick={() => console.log('Share')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Icon source={ShareIcon} color="subdued" />
                <Text variant="bodySm">Share</Text>
              </button>
              <button
                onClick={() => console.log('Bookmark')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
              >
                <Icon source={PinFilledIcon} color="subdued" />
                <Text variant="bodySm">Save</Text>
              </button>
            </InlineStack>
          </div>
        </MediaCard>
      </div>
    );
  },
};

export const EducationalContent: Story = {
  render: () => {
    const courses = [
      {
        title: 'Introduction to React',
        description: 'Learn the fundamentals of React including components, state, and props. Build your first interactive web application.',
        duration: '3.5 hours',
        level: 'Beginner',
        enrolled: 1250,
      },
      {
        title: 'Advanced TypeScript',
        description: 'Master TypeScript with advanced patterns, generics, decorators, and type-safe development practices.',
        duration: '5 hours',
        level: 'Advanced',
        enrolled: 890,
      },
      {
        title: 'UI/UX Design Principles',
        description: 'Understanding user-centered design, wireframing, prototyping, and creating intuitive user interfaces.',
        duration: '4 hours',
        level: 'Intermediate',
        enrolled: 2100,
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Featured Courses</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {courses.map((course, index) => (
            <MediaCard
              key={index}
              title={course.title}
              description={course.description}
              portrait
              primaryAction={{
                content: 'Enroll now',
                onAction: () => console.log(`Enroll in ${course.title}`),
              }}
              secondaryAction={{
                content: 'Preview',
                onAction: () => console.log(`Preview ${course.title}`),
              }}
            >
              <div style={{ marginTop: '12px' }}>
                <InlineStack gap="200">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Icon source={ClockIcon} color="subdued" />
                    <Text variant="bodySm" color="subdued">{course.duration}</Text>
                  </div>
                  <Badge tone="info">{course.level}</Badge>
                </InlineStack>
                <div style={{ marginTop: '8px' }}>
                  <Text variant="bodySm" color="subdued">
                    {course.enrolled.toLocaleString()} students enrolled
                  </Text>
                </div>
              </div>
            </MediaCard>
          ))}
        </div>
      </div>
    );
  },
};

export const WithAvatar: Story = {
  render: () => {
    const blogPosts = [
      {
        title: 'Building Scalable Applications',
        description: 'Learn best practices for creating applications that can handle growth and maintain performance under load.',
        author: 'Alex Chen',
        avatar: 'https://picsum.photos/seed/alex/50/50.jpg',
        readTime: '8 min',
        date: '2024-07-15',
      },
      {
        title: 'The Future of Remote Work',
        description: 'Exploring how remote work is reshaping company culture and productivity in the modern workplace.',
        author: 'Maria Garcia',
        avatar: 'https://picsum.photos/seed/maria/50/50.jpg',
        readTime: '6 min',
        date: '2024-07-14',
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Latest Blog Posts</Text>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {blogPosts.map((post, index) => (
            <MediaCard
              key={index}
              title={post.title}
              description={post.description}
              portrait
              primaryAction={{
                content: 'Read more',
                onAction: () => console.log(`Read ${post.title}`),
              }}
              secondaryAction={{
                content: 'Share',
                onAction: () => console.log(`Share ${post.title}`),
              }}
            >
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Avatar size="small" source={post.avatar} name={post.author} />
                  <Text variant="bodySm" fontWeight="medium">{post.author}</Text>
                </div>
                <InlineStack gap="200">
                  <Text variant="bodySm" color="subdued">{post.readTime} read</Text>
                  <Text variant="bodySm" color="subdued">{post.date}</Text>
                </InlineStack>
              </div>
            </MediaCard>
          ))}
        </div>
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ backgroundColor: '#f3f4f6', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e1e1e1',
                borderTop: '4px solid #007ace',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 12px',
              }}
            />
            <Text color="subdued">Loading content...</Text>
          </div>
        </div>
        <div style={{ padding: '16px' }}>
          <div style={{ backgroundColor: '#f3f4f6', height: '20px', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ backgroundColor: '#f3f4f6', height: '16px', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ backgroundColor: '#f3f4f6', height: '16px', borderRadius: '4px', width: '80%' }} />
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <MediaCard
        title="Content Unavailable"
        description="We're having trouble loading this content. Please try again later or contact support if the problem persists."
        primaryAction={{
          content: 'Try again',
          onAction: () => console.log('Retry loading'),
        }}
        secondaryAction={{
          content: 'Contact support',
          onAction: () => console.log('Contact support'),
        }}
      />
    </div>
  ),
};

export const CustomActions: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <MediaCard
        title="Premium Content Access"
        description="Unlock exclusive content, advanced features, and priority support with our premium subscription. Join thousands of satisfied users today."
        primaryAction={{
          content: 'Start free trial',
          onAction: () => console.log('Start trial'),
          tone: 'success',
        }}
        secondaryAction={{
          content: 'Compare plans',
          onAction: () => console.log('Compare plans'),
        }}
      />
    </div>
  ),
};