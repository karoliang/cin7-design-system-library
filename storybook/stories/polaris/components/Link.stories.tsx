import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Links are interactive elements that allow users to navigate to different pages or perform actions. They can be used inline within text, as standalone navigation elements, or as part of larger components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Link text or content',
    },
    url: {
      control: 'text',
      description: 'Destination URL',
    },
    external: {
      control: 'boolean',
      description: 'Whether link opens in new tab',
    },
    monochrome: {
      control: 'boolean',
      description: 'Remove default link styling',
    },
    removeUnderline: {
      control: 'boolean',
      description: 'Remove underline from link',
    },
    target: {
      control: 'text',
      description: 'Link target attribute',
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'View all products',
    url: '#products',
  },
};

export const ExternalLink: Story = {
  args: {
    children: 'Visit Shopify documentation',
    url: 'https://polaris.shopify.com',
    external: true,
  },
};

export const Monochrome: Story = {
  args: {
    children: 'Learn more about our features',
    url: '#features',
    monochrome: true,
  },
};

export const NoUnderline: Story = {
  args: {
    children: 'Shop now',
    url: '#shop',
    removeUnderline: true,
  },
};

export const InlineText: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', lineHeight: '1.6' }}>
      <p>
        Our product catalog includes a wide range of electronics. You can{' '}
        <Link url="#browse">browse our collection</Link> to find the perfect items
        for your needs. For more information, please{' '}
        <Link url="#contact">contact our support team</Link>.
      </p>
      <p style={{ marginTop: '16px' }}>
        We offer fast shipping and easy returns. Check out our{' '}
        <Link url="#shipping">shipping policy</Link> and{' '}
        <Link url="#returns">return guidelines</Link> for more details.
      </p>
    </div>
  ),
};

export const NavigationLinks: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '300px' }}>
      <h3 style={{ margin: 0 }}>Quick Navigation</h3>
      <Link url="#dashboard">📊 Dashboard</Link>
      <Link url="#products">📦 Products</Link>
      <Link url="#orders">🛒 Orders</Link>
      <Link url="#customers">👥 Customers</Link>
      <Link url="#analytics">📈 Analytics</Link>
      <Link url="#settings">⚙️ Settings</Link>
    </div>
  ),
};

export const FooterLinks: Story = {
  render: () => (
    <div style={{
      padding: '40px',
      backgroundColor: '#1f2937',
      color: 'white',
      borderRadius: '8px'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Product</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link url="#features" monochrome>Features</Link>
            <Link url="#pricing" monochrome>Pricing</Link>
            <Link url="#integrations" monochrome>Integrations</Link>
            <Link url="#api" monochrome>API</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link url="#about" monochrome>About Us</Link>
            <Link url="#careers" monochrome>Careers</Link>
            <Link url="#blog" monochrome>Blog</Link>
            <Link url="#press" monochrome>Press Kit</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Support</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link url="#help" monochrome>Help Center</Link>
            <Link url="#docs" monochrome>Documentation</Link>
            <Link url="#community" monochrome>Community</Link>
            <Link url="#contact" monochrome>Contact Us</Link>
          </div>
        </div>
        <div>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Legal</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link url="#privacy" monochrome>Privacy Policy</Link>
            <Link url="#terms" monochrome>Terms of Service</Link>
            <Link url="#cookies" monochrome>Cookie Policy</Link>
            <Link url="#gdpr" monochrome>GDPR</Link>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CardActions: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', maxWidth: '600px' }}>
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-lg)" }}>Product Catalog</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
          Manage your products, inventory, and categories all in one place.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link url="#products">View Products</Link>
          <Link url="#add-product" removeUnderline>+ Add New</Link>
        </div>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-lg)" }}>Order Management</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
          Track orders, manage fulfillment, and handle customer service.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link url="#orders">View Orders</Link>
          <Link url="#order-analytics" removeUnderline>Analytics</Link>
        </div>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-lg)" }}>Customer Hub</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
          Build relationships with customers and manage their data.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link url="#customers">View Customers</Link>
          <Link url="#segments" removeUnderline>Segments</Link>
        </div>
      </div>

      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-lg)" }}>Analytics Dashboard</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
          Get insights into your business performance and trends.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link url="#analytics">View Reports</Link>
          <Link url="#export-data" removeUnderline>Export</Link>
        </div>
      </div>
    </div>
  ),
};

export const HelpDocumentation: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ margin: '0 0 16px 0' }}>Getting Started Guide</h2>

      <div style={{
        padding: '20px',
        backgroundColor: '#f0f9ff',
        borderRadius: '8px',
        border: '1px solid #bfdbfe',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#1e40af' }}>🚀 Quick Start</h3>
        <p style={{ margin: '0 0 12px 0', color: '#1e40af' }}>
          New to our platform? Get up and running in minutes with our comprehensive guide.
        </p>
        <Link url="#quick-start">Read Quick Start Guide →</Link>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>Popular Topics</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li style={{ marginBottom: '8px' }}>
            <Link url="#setup">Setting up your first store</Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link url="#products">Adding and managing products</Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link url="#payments">Configuring payment methods</Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link url="#shipping">Setting up shipping zones</Link>
          </li>
          <li style={{ marginBottom: '8px' }}>
            <Link url="#themes">Customizing your store design</Link>
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>External Resources</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>📚 API Documentation</div>
            <p style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
              Complete reference for our REST API and webhooks.
            </p>
            <Link url="https://api.docs.example.com" external>View API Docs →</Link>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>💬 Community Forum</div>
            <p style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
              Connect with other merchants and get help from our community.
            </p>
            <Link url="https://community.example.com" external>Join Community →</Link>
          </div>

          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontWeight: '600', marginBottom: '4px' }}>🎓 Video Tutorials</div>
            <p style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
              Step-by-step video guides for common tasks and features.
            </p>
            <Link url="https://videos.example.com" external>Watch Tutorials →</Link>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BreadcrumbStyle: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>You are here:</h3>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: "var(--font-size-sm)" }}>
        <Link url="#home" monochrome>Home</Link>
        <span style={{ color: '#9ca3af' }}>›</span>
        <Link url="#products" monochrome>Products</Link>
        <span style={{ color: '#9ca3af' }}>›</span>
        <Link url="#electronics" monochrome>Electronics</Link>
        <span style={{ color: '#9ca3af' }}>›</span>
        <span style={{ color: '#6b7280', fontWeight: '600' }}>Audio Equipment</span>
      </nav>

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Alternative breadcrumb style:</h3>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: "var(--font-size-sm)" }}>
          <Link url="#home" removeUnderline>Home</Link>
          <span style={{ color: '#9ca3af' }}>/</span>
          <Link url="#products" removeUnderline>Products</Link>
          <span style={{ color: '#9ca3af' }}>/</span>
          <Link url="#electronics" removeUnderline>Electronics</Link>
          <span style={{ color: '#9ca3af' }}>/</span>
          <span style={{ color: '#6b7280', fontWeight: '600' }}>Audio Equipment</span>
        </nav>
      </div>
    </div>
  ),
};

export const TagCloud: Story = {
  render: () => {
    const tags = [
      { name: 'React', count: 45, url: '#react' },
      { name: 'JavaScript', count: 38, url: '#javascript' },
      { name: 'TypeScript', count: 32, url: '#typescript' },
      { name: 'CSS', count: 28, url: '#css' },
      { name: 'HTML', count: 25, url: '#html' },
      { name: 'Node.js', count: 22, url: '#nodejs' },
      { name: 'Vue.js', count: 18, url: '#vue' },
      { name: 'Angular', count: 15, url: '#angular' },
      { name: 'GraphQL', count: 12, url: '#graphql' },
      { name: 'Docker', count: 10, url: '#docker' },
      { name: 'MongoDB', count: 8, url: '#mongodb' },
      { name: 'PostgreSQL', count: 6, url: '#postgresql' },
    ];

    const getFontSize = (count: number) => {
      const maxCount = Math.max(...tags.map(t => t.count));
      const minSize = 12;
      const maxSize = 20;
      return minSize + (count / maxCount) * (maxSize - minSize);
    };

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>Popular Topics</h3>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '20px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          {tags.map((tag) => (
            <Link
              key={tag.name}
              url={tag.url}
              removeUnderline
              style={{
                fontSize: `${getFontSize(tag.count)}px`,
                color: tag.count > 30 ? '#1e40af' : tag.count > 15 ? '#3b82f6' : '#6b7280',
                fontWeight: tag.count > 30 ? '600' : '400',
              }}
            >
              {tag.name} ({tag.count})
            </Link>
          ))}
        </div>
      </div>
    );
  },
};

export const TableOfContents: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>Table of Contents</h3>
      <div style={{
        padding: '20px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <Link url="#introduction" style={{ fontWeight: '600', fontSize: '16px' }}>
            1. Introduction
          </Link>
          <div style={{ marginLeft: '20px', marginTop: '8px' }}>
            <div style={{ marginBottom: '4px' }}>
              <Link url="#overview" monochrome>1.1 Overview</Link>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <Link url="#getting-started" monochrome>1.2 Getting Started</Link>
            </div>
            <div>
              <Link url="#prerequisites" monochrome>1.3 Prerequisites</Link>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Link url="#installation" style={{ fontWeight: '600', fontSize: '16px' }}>
            2. Installation
          </Link>
          <div style={{ marginLeft: '20px', marginTop: '8px' }}>
            <div style={{ marginBottom: '4px' }}>
              <Link url="#system-requirements" monochrome>2.1 System Requirements</Link>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <Link url="#installation-steps" monochrome>2.2 Installation Steps</Link>
            </div>
            <div>
              <Link url="#troubleshooting" monochrome>2.3 Troubleshooting</Link>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Link url="#configuration" style={{ fontWeight: '600', fontSize: '16px' }}>
            3. Configuration
          </Link>
          <div style={{ marginLeft: '20px', marginTop: '8px' }}>
            <div style={{ marginBottom: '4px' }}>
              <Link url="#basic-config" monochrome>3.1 Basic Configuration</Link>
            </div>
            <div style={{ marginBottom: '4px' }}>
              <Link url="#advanced-settings" monochrome>3.2 Advanced Settings</Link>
            </div>
            <div>
              <Link url="#environment-variables" monochrome>3.3 Environment Variables</Link>
            </div>
          </div>
        </div>

        <div>
          <Link url="#next-steps" style={{ fontWeight: '600', fontSize: '16px' }}>
            4. Next Steps
          </Link>
        </div>
      </div>
    </div>
  ),
};

export const SocialLinks: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 16px 0' }}>Connect With Us</h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link
          url="https://twitter.com/example"
          external
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#1da1f2',
            color: 'white',
            textDecoration: 'none',
            fontSize: "var(--font-size-xl)",
          }}
        >
          𝕏
        </Link>
        <Link
          url="https://facebook.com/example"
          external
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#1877f2',
            color: 'white',
            textDecoration: 'none',
            fontSize: "var(--font-size-xl)",
          }}
        >
          f
        </Link>
        <Link
          url="https://linkedin.com/company/example"
          external
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#0077b5',
            color: 'white',
            textDecoration: 'none',
            fontSize: "var(--font-size-xl)",
          }}
        >
          in
        </Link>
        <Link
          url="https://github.com/example"
          external
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#333',
            color: 'white',
            textDecoration: 'none',
            fontSize: "var(--font-size-xl)",
          }}
        >
          ⚡
        </Link>
        <Link
          url="https://youtube.com/example"
          external
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#ff0000',
            color: 'white',
            textDecoration: 'none',
            fontSize: "var(--font-size-xl)",
          }}
        >
          ▶
        </Link>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Follow our blog</h4>
        <p style={{ margin: '0 0 12px 0', fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
          Stay updated with the latest news and tutorials.
        </p>
        <Link url="#blog-subscription" removeUnderline style={{ fontWeight: '600' }}>
          Subscribe to Newsletter →
        </Link>
      </div>
    </div>
  ),
};