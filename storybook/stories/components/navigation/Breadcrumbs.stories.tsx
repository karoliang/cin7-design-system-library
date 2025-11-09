import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// CRITICAL FIX: Breadcrumbs-specific error boundary for debugging
class BreadcrumbsErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: React.ErrorInfo }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Breadcrumbs Component Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '30px',
          margin: '20px',
          border: '2px solid orange',
          borderRadius: '8px',
          backgroundColor: '#fff8e1',
          color: '#e65100',
          fontFamily: 'monospace',
          fontSize: '13px'
        }}>
          <h3>🚨 Breadcrumbs Component Failed to Render</h3>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <p><strong>Component:</strong> Breadcrumbs</p>
          <p><strong>Cause:</strong> This may be a props validation or dependency issue</p>
          <details style={{ marginTop: '15px' }}>
            <summary>Technical Details</summary>
            <pre style={{
              fontSize: '11px',
              overflow: 'auto',
              maxHeight: '200px',
              backgroundColor: '#f5f5f5',
              padding: '8px',
              borderRadius: '4px',
              marginTop: '8px'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

const meta = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Breadcrumbs provide secondary navigation to help users understand their location within a website hierarchy. They show the path from the homepage to the current page and allow users to navigate back to previous levels.',
      },
    },
    codeVariants: getCodeVariants('breadcrumbs', 'default'),
  },
  tags: ['autodocs'],
  // RESTORED: Breadcrumbs-specific error boundary decorator for debugging
  decorators: [
    (Story) => (
      <BreadcrumbsErrorBoundary>
        <Story />
      </BreadcrumbsErrorBoundary>
    ),
  ],
  argTypes: {
    breadcrumbs: {
      control: 'object',
      description: 'Array of breadcrumb objects with content and url',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumbs: [
      { content: 'Home', url: '#' },
      { content: 'Products', url: '#' },
      { content: 'Electronics', url: '#' },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'default'),
  },

};

export const ShortPath: Story = {
  args: {
    breadcrumbs: [
      { content: 'Home', url: '#' },
      { content: 'About', url: '#' },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'shortPath'),
  },
};

export const LongPath: Story = {
  args: {
    breadcrumbs: [
      { content: 'Home', url: '#' },
      { content: 'Shop', url: '#' },
      { content: 'Categories', url: '#' },
      { content: 'Electronics', url: '#' },
      { content: 'Audio', url: '#' },
      { content: 'Headphones', url: '#' },
      { content: 'Wireless', url: '#' },
    ],
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'longPath'),
  },
};

export const ProductNavigation: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState('/shop/electronics/audio/wireless-headphones');

    const buildBreadcrumbs = (path: string) => {
      const segments = path.split('/').filter(Boolean);
      const breadcrumbMap: Record<string, string> = {
        shop: 'Shop',
        electronics: 'Electronics',
        audio: 'Audio Equipment',
        'wireless-headphones': 'Wireless Headphones',
        products: 'Products',
        categories: 'Categories',
        'noise-cancelling': 'Noise Cancelling',
        'bluetooth-earbuds': 'Bluetooth Earbuds',
        support: 'Support',
        documentation: 'Documentation',
        troubleshooting: 'Troubleshooting',
      };

      return segments.map((segment, index) => {
        const url = '/' + segments.slice(0, index + 1).join('/');
        const content = breadcrumbMap[segment] || segment;
        return { content, url };
      }).filter(item => item && item.content);
    };

    const handleNavigation = (path: string) => {
      setCurrentPath(path);
    };

    return (
      <div style={{ width: '600px' }}>
        <Breadcrumbs
          breadcrumbs={buildBreadcrumbs(currentPath)}
        />

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 12px 0' }}>Current Path</h3>
          <code style={{ display: 'block', padding: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', fontSize: 'var(--font-size-xs)' }}>
            {currentPath}
          </code>

          <div style={{ marginTop: '16px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Quick Navigation:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                '/shop',
                '/shop/electronics',
                '/shop/electronics/audio',
                '/support',
                '/support/documentation',
                '/support/documentation/troubleshooting',
              ].map((path) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  style={{
                    padding: '4px 8px',
                    fontSize: 'var(--font-size-xs)',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    backgroundColor: currentPath === path ? '#3b82f6' : 'white',
                    color: currentPath === path ? 'white' : '#374151',
                    cursor: 'pointer',
                  }}
                >
                  {path}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'productNavigation'),
  },
};

export const EcommerceNavigation: Story = {
  render: () => {
    const [category, setCategory] = React.useState('electronics');
    const [subcategory, setSubcategory] = React.useState('audio');
    const [product, setProduct] = React.useState('');

    const categories = {
      electronics: {
        name: 'Electronics',
        subcategories: {
          audio: { name: 'Audio Equipment', products: ['Wireless Headphones', 'Speakers', 'Earbuds'] },
          computers: { name: 'Computers', products: ['Laptops', 'Desktops', 'Tablets'] },
          phones: { name: 'Phones', products: ['Smartphones', 'Accessories', 'Cases'] },
        },
      },
      clothing: {
        name: 'Clothing',
        subcategories: {
          mens: { name: "Men's Clothing", products: ['Shirts', 'Pants', 'Jackets'] },
          womens: { name: "Women's Clothing", products: ['Dresses', 'Tops', 'Skirts'] },
          kids: { name: "Kids' Clothing", products: ['Toys', 'Games', 'School Supplies'] },
        },
      },
      home: {
        name: 'Home & Garden',
        subcategories: {
          furniture: { name: 'Furniture', products: ['Sofas', 'Chairs', 'Tables'] },
          decor: { name: 'Decor', products: ['Wall Art', 'Rugs', 'Lighting'] },
          kitchen: { name: 'Kitchen', products: ['Appliances', 'Cookware', 'Storage'] },
        },
      },
    };

    const buildBreadcrumbs = () => {
      const crumbs = [{ content: 'Home', url: '#home' }];

      if (category) {
        crumbs.push({ content: categories[category as keyof typeof categories].name, url: `#${category}` });
      }

      if (category && subcategory) {
        crumbs.push({
          content: categories[category as keyof typeof categories].subcategories[subcategory as keyof typeof categories[typeof category]['subcategories']].name,
          url: `#${category}/${subcategory}`
        });
      }

      if (category && subcategory && product) {
        crumbs.push({ content: product, url: `#${category}/${subcategory}/${product}` });
      }

      return crumbs.filter(item => item && item.content);
    };

    return (
      <div style={{ width: '700px' }}>
        <Breadcrumbs breadcrumbs={buildBreadcrumbs()} />

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>🛍️ Product Navigation</h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
              Category:
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory('');
                setProduct('');
              }}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
            >
              <option value="">Select category</option>
              {Object.entries(categories).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>

          {category && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Subcategory:
              </label>
              <select
                value={subcategory}
                onChange={(e) => {
                  setSubcategory(e.target.value);
                  setProduct('');
                }}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
              >
                <option value="">Select subcategory</option>
                {Object.entries(categories[category as keyof typeof categories].subcategories).map(([key, value]) => (
                  <option key={key} value={key}>{value.name}</option>
                ))}
              </select>
            </div>
          )}

          {category && subcategory && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                Product:
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
              >
                <option value="">Select product</option>
                {categories[category as keyof typeof categories].subcategories[subcategory as keyof typeof categories[typeof category]['subcategories']].products.map((product) => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>
          )}

          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '8px' }}>Navigation Path:</div>
            <code style={{ fontSize: '11px', color: '#374151' }}>
              /{category ? category : ''}{subcategory ? '/' + subcategory : ''}{product ? '/' + product.toLowerCase().replace(/\s+/g, '-') : ''}
            </code>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'ecommerceNavigation'),
  },
};

export const AdminPanel: Story = {
  render: () => {
    const [section, setSection] = React.useState('dashboard');
    const [subsection, setSubsection] = React.useState('');
    const [detail, setDetail] = React.useState('');

    const adminStructure = {
      dashboard: { name: 'Dashboard', subsections: {} },
      products: {
        name: 'Products',
        subsections: {
          manage: { name: 'Manage Products', details: ['Add New', 'Bulk Edit', 'Import/Export'] },
          categories: { name: 'Categories', details: ['Create Category', 'Organize', 'Settings'] },
          inventory: { name: 'Inventory', details: ['Stock Levels', 'Low Stock Alerts', 'Warehouse'] },
        },
      },
      orders: {
        name: 'Orders',
        subsections: {
          manage: { name: 'Manage Orders', details: ['Pending', 'Processing', 'Shipped'] },
          returns: { name: 'Returns', details: ['Return Requests', 'Refunds', 'Exchange'] },
          analytics: { name: 'Order Analytics', details: ['Sales Reports', 'Trends', 'Forecasts'] },
        },
      },
      customers: {
        name: 'Customers',
        subsections: {
          manage: { name: 'Customer Management', details: ['View All', 'Search', 'Segments'] },
          groups: { name: 'Customer Groups', details: ['VIP', 'Wholesale', 'Regular'] },
          support: { name: 'Customer Support', details: ['Tickets', 'Live Chat', 'FAQ'] },
        },
      },
      settings: {
        name: 'Settings',
        subsections: {
          general: { name: 'General', details: ['Store Info', 'Regions', 'Currency'] },
          payment: { name: 'Payment', details: ['Gateways', 'Methods', 'Security'] },
          shipping: { name: 'Shipping', details: ['Zones', 'Rates', 'Carriers'] },
        },
      },
    };

    const buildBreadcrumbs = () => {
      const crumbs = [{ content: 'Admin', url: '#admin' }];

      if (section) {
        crumbs.push({ content: adminStructure[section as keyof typeof adminStructure].name, url: `#${section}` });
      }

      if (section && subsection && adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']]) {
        crumbs.push({
          content: adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].name,
          url: `#${section}/${subsection}`
        });
      }

      if (section && subsection && detail && adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details) {
        const detailName = adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details.find(d => d.toLowerCase().replace(/\s+/g, '-') === detail);
        if (detailName) {
          crumbs.push({ content: detailName, url: `#${section}/${subsection}/${detail}` });
        }
      }

      return crumbs.filter(item => item && item.content);
    };

    return (
      <div style={{ width: '750px' }}>
        <Breadcrumbs breadcrumbs={buildBreadcrumbs()} />

        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#1f2937',
          borderRadius: '6px',
          color: 'white'
        }}>
          <h3 style={{ margin: '0 0 16px 0' }}>🎛️ Admin Control Panel</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {Object.entries(adminStructure).map(([key, value]) => (
              <button
                key={key}
                onClick={() => {
                  setSection(key);
                  setSubsection('');
                  setDetail('');
                }}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: section === key ? '2px solid #3b82f6' : '1px solid #4b5563',
                  backgroundColor: section === key ? '#374151' : '#1f2937',
                  color: 'white',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 'var(--font-size-base)', marginBottom: '4px' }}>
                  {key === 'dashboard' ? '📊' : key === 'products' ? '📦' : key === 'orders' ? '🛒' : key === 'customers' ? '👥' : '⚙️'}
                </div>
                <div style={{ fontSize: 'var(--font-size-xs)' }}>{value.name}</div>
              </button>
            ))}
          </div>

          {section && adminStructure[section as keyof typeof adminStructure].subsections && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', color: '#9ca3af', marginBottom: '8px' }}>Subsections:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {Object.entries(adminStructure[section as keyof typeof adminStructure].subsections).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSubsection(key);
                      setDetail('');
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: subsection === key ? '1px solid #3b82f6' : '1px solid #4b5563',
                      backgroundColor: subsection === key ? '#3b82f6' : '#374151',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-xs)',
                    }}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {section && subsection && adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details && (
            <div>
              <div style={{ fontSize: 'var(--font-size-xs)', color: '#9ca3af', marginBottom: '8px' }}>Actions:</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details.map((detailName) => (
                  <button
                    key={detailName}
                    onClick={() => setDetail(detailName.toLowerCase().replace(/\s+/g, '-'))}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: detail === detailName.toLowerCase().replace(/\s+/g, '-') ? '1px solid #10b981' : '1px solid #4b5563',
                      backgroundColor: detail === detailName.toLowerCase().replace(/\s+/g, '-') ? '#10b981' : '#1f2937',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '11px',
                    }}
                  >
                    {detailName}
                  </button>
                ))}
              </div>
            </div>
          )}

          {detail && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              backgroundColor: '#065f46',
              borderRadius: '4px',
              border: '1px solid #10b981'
            }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>✅ Ready to execute: {detail.replace(/-/g, ' ').toUpperCase()}</div>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'adminPanel'),
  },
};

export const DocumentationSite: Story = {
  render: () => {
    const [path, setPath] = React.useState(['docs', 'getting-started', 'installation']);

    const docsStructure = {
      docs: {
        name: 'Documentation',
        children: {
          'getting-started': {
            name: 'Getting Started',
            children: {
              installation: { name: 'Installation' },
              'quick-start': { name: 'Quick Start' },
              'basic-concepts': { name: 'Basic Concepts' },
            },
          },
          components: {
            name: 'Components',
            children: {
              buttons: { name: 'Buttons' },
              forms: { name: 'Forms' },
              navigation: { name: 'Navigation' },
              layout: { name: 'Layout' },
            },
          },
          guides: {
            name: 'Guides',
            children: {
              styling: { name: 'Styling' },
              theming: { name: 'Theming' },
              accessibility: { name: 'Accessibility' },
              'best-practices': { name: 'Best Practices' },
            },
          },
          api: {
            name: 'API Reference',
            children: {
              'core-api': { name: 'Core API' },
              hooks: { name: 'Hooks' },
              utilities: { name: 'Utilities' },
            },
          },
        },
      },
      tutorials: {
        name: 'Tutorials',
        children: {
          beginner: {
            name: 'Beginner',
            children: {
              'first-app': { name: 'Your First App' },
              'common-patterns': { name: 'Common Patterns' },
            },
          },
          advanced: {
            name: 'Advanced',
            children: {
              performance: { name: 'Performance' },
              'custom-components': { name: 'Custom Components' },
            },
          },
        },
      },
    };

    const buildBreadcrumbs = () => {
      const crumbs: Array<{ content: string; url: string }> = [];

      let current = docsStructure as any;
      let currentUrl = '';

      for (let i = 0; i < path.length; i++) {
        const segment = path[i];
        currentUrl += '/' + segment;

        if (i === 0) {
          crumbs.push({ content: current.name, url: currentUrl });
        } else if (current.children && current.children[segment]) {
          crumbs.push({ content: current.children[segment].name, url: currentUrl });
          current = current.children[segment];
        } else if (current[segment]) {
          crumbs.push({ content: current[segment].name, url: currentUrl });
          current = current[segment];
        }
      }

      return crumbs.filter(item => item && item.content);
    };

    const navigateTo = (newPath: string[]) => {
      setPath(newPath);
    };

    return (
      <div style={{ width: '800px' }}>
        <Breadcrumbs
          breadcrumbs={buildBreadcrumbs()}
        />

        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>📚 Documentation Navigation</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '12px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Navigation Tree</h4>

              {Object.entries(docsStructure).map(([key, section]) => (
                <div key={key} style={{ marginBottom: '8px' }}>
                  <button
                    onClick={() => navigateTo([key])}
                    style={{
                      padding: '4px 8px',
                      width: '100%',
                      textAlign: 'left',
                      border: 'none',
                      backgroundColor: path[0] === key ? '#3b82f6' : 'transparent',
                      color: path[0] === key ? 'white' : '#374151',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                    }}
                  >
                    {section.name}
                  </button>

                  {path[0] === key && section.children && (
                    <div style={{ marginLeft: '12px', marginTop: '4px' }}>
                      {Object.entries(section.children).map(([subKey, subsection]: [string, any]) => (
                        <div key={subKey} style={{ marginBottom: '4px' }}>
                          <button
                            onClick={() => navigateTo([key, subKey])}
                            style={{
                              padding: '2px 6px',
                              width: '100%',
                              textAlign: 'left',
                              border: 'none',
                              backgroundColor: path[1] === subKey ? '#60a5fa' : 'transparent',
                              color: path[1] === subKey ? 'white' : '#6b7280',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '11px',
                            }}
                          >
                            {subsection.name}
                          </button>

                          {path[1] === subKey && subsection.children && (
                            <div style={{ marginLeft: '8px', marginTop: '2px' }}>
                              {Object.entries(subsection.children).map(([detailKey, detail]: [string, any]) => (
                                <button
                                  key={detailKey}
                                  onClick={() => navigateTo([key, subKey, detailKey])}
                                  style={{
                                    padding: '1px 4px',
                                    width: '100%',
                                    textAlign: 'left',
                                    border: 'none',
                                    backgroundColor: path[2] === detailKey ? '#93c5fd' : 'transparent',
                                    color: path[2] === detailKey ? '#1e40af' : '#9ca3af',
                                    borderRadius: '2px',
                                    cursor: 'pointer',
                                    fontSize: '10px',
                                  }}
                                >
                                  {detail.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '16px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                {buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content || 'Documentation'}
              </h4>

              <div style={{ fontSize: 'var(--font-size-sm)', lineHeight: '1.5', color: '#6b7280' }}>
                {path.length === 3 && (
                  <p>
                    This page contains detailed documentation about <strong>{buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content}</strong>.
                    You'll find comprehensive examples, API references, and best practices here.
                  </p>
                )}

                {path.length === 2 && (
                  <p>
                    Welcome to the <strong>{buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content}</strong> section.
                    Choose a topic from the navigation tree to learn more.
                  </p>
                )}

                {path.length === 1 && (
                  <p>
                    This is the main <strong>{buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content}</strong> section.
                    Navigate through the topics on the left to explore different areas.
                  </p>
                )}
              </div>

              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
                <div style={{ fontSize: 'var(--font-size-xs)', color: '#64748b', marginBottom: '4px' }}>Current path:</div>
                <code style={{ fontSize: '11px', color: '#334155' }}>
                  /{path.join('/')}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('breadcrumbs', 'documentationSite'),
  },
};