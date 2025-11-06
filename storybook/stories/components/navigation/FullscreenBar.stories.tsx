import type { Meta, StoryObj } from '@storybook/react';
import {
  FullscreenBar,
  Button,
  Icon,
  Text,
  InlineStack,
  Card,
  Badge,
  Avatar,
  ActionList,
  Popover,
} from '@shopify/polaris';
import {
  ArrowLeftIcon,
  SearchIcon,
  MenuIcon,
  ViewIcon,
  EditIcon,
  ShareIcon,
  PrintIcon,
  ExitIcon,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Layout/FullscreenBar',
  component: FullscreenBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'FullscreenBar provides a top navigation bar that spans the full width of the viewport. It\'s commonly used in immersive interfaces like previews, editors, or full-screen applications.',
      },
    },
    codeVariants: getCodeVariants('fullscreenbar', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    logo: {
      control: 'object',
      description: 'Logo or title to display in the bar',
    },
    breadcrumbs: {
      control: 'object',
      description: 'Breadcrumb navigation',
    },
    onAction: {
      action: 'onAction',
      description: 'Callback when action is triggered',
    },
    secondaryMenu: {
      control: 'object',
      description: 'Secondary menu configuration',
    },
    searchResultsVisible: {
      control: 'boolean',
      description: 'Whether search results are visible',
    },
    searchField: {
      control: 'object',
      description: 'Search field configuration',
    },
    searchResults: {
      control: 'object',
      description: 'Search results configuration',
    },
    onNavigationDismiss: {
      action: 'onNavigationDismiss',
      description: 'Callback when navigation is dismissed',
    },
    onSearchResultsDismiss: {
      action: 'onSearchResultsDismiss',
      description: 'Callback when search results are dismissed',
    },
  },
} satisfies Meta<typeof FullscreenBar>;

export default meta;
type Story = StoryObj<typeof FullscreenBar>;

export const Default: Story = {
  render: () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleSearchBlur = useCallback(() => {
      setIsSearchActive(false);
    }, []);

    const handleSearchFocus = useCallback(() => {
      setIsSearchActive(true);
    }, []);

    const handleSearchChange = useCallback((value: string) => {
      setSearchValue(value);
    }, []);

    const handleNavigationDismiss = useCallback(() => {
      console.log('Navigation dismissed');
    }, []);

    const userMenuActions = [
      {
        items: [
          { content: 'Profile settings', icon: EditIcon },
          { content: 'Share', icon: ShareIcon },
          { content: 'Print', icon: PrintIcon },
          { content: 'Logout', icon: ExitIcon },
        ],
      },
    ];

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          logo={{
            width: 124,
            contextualSaveBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
            url: '#',
          }}
          searchField={{
            placeholder: 'Search',
            onChange: handleSearchChange,
            onFocus: handleSearchFocus,
            onBlur: handleSearchBlur,
            value: searchValue,
          }}
          searchResultsVisible={isSearchActive}
          onNavigationDismiss={handleNavigationDismiss}
          secondaryMenu={{
            activationButton: {
              label: 'John Doe',
              badge: { status: 'new', content: '3' },
            },
            actions: userMenuActions,
          }}
        />

        <div style={{ padding: '24px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <Text variant="headingMd" as="h2">Fullscreen Application</Text>
              <div style={{ marginTop: '16px' }}>
                <Text>
                  This is a fullscreen application with a top navigation bar.
                  The bar includes search functionality and user menu.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const WithBreadcrumbs: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');

    const handleNavigationDismiss = useCallback(() => {
      console.log('Navigation dismissed');
    }, []);

    const breadcrumbs = {
      breadcrumbs: [
        { content: 'Home', url: '#' },
        { content: 'Products', url: '#' },
        { content: 'Edit Product' },
      ],
    };

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          {...breadcrumbs}
          searchField={{
            placeholder: 'Search products...',
            onChange: setSearchValue,
            value: searchValue,
          }}
          onNavigationDismiss={handleNavigationDismiss}
        />

        <div style={{ padding: '24px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <Text variant="headingMd" as="h2">Edit Product</Text>
              <div style={{ marginTop: '16px' }}>
                <Text>
                  This page shows breadcrumb navigation in the FullscreenBar.
                  Breadcrumbs help users understand their current location in the application hierarchy.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const PreviewMode: Story = {
  render: () => {
    const [isPreviewMode, setIsPreviewMode] = useState(true);

    const handleExitPreview = useCallback(() => {
      setIsPreviewMode(false);
      console.log('Exited preview mode');
    }, []);

    const previewActions = [
      {
        label: 'Exit preview',
        icon: ArrowLeftIcon,
        onClick: handleExitPreview,
      },
      {
        label: 'Share preview',
        icon: ShareIcon,
        onClick: () => console.log('Share preview'),
      },
    ];

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          logo={{
            width: 124,
            topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
            url: '#',
          }}
          secondaryMenu={{
            activationButton: {
              label: 'Preview Mode',
              badge: { status: 'info', content: 'PREVIEW' },
            },
            actions: [
              {
                items: [
                  {
                    content: 'Exit preview',
                    icon: ArrowLeftIcon,
                    onAction: handleExitPreview,
                  },
                  {
                    content: 'Share preview link',
                    icon: ShareIcon,
                    onAction: () => console.log('Share preview'),
                  },
                ],
              },
            ],
          }}
        />

        <div style={{
          padding: '24px',
          backgroundColor: isPreviewMode ? '#f8f9fa' : 'white',
          minHeight: 'calc(100vh - 60px)',
        }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">Product Preview</Text>
                <Badge status="info">Preview Mode</Badge>
                <Text>
                  You are viewing this page in preview mode. Changes won't be saved until you exit preview.
                </Text>
                <Button onClick={handleExitPreview}>
                  Exit Preview
                </Button>
              </BlockStack>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const EditorInterface: Story = {
  render: () => {
    const [isDirty, setIsDirty] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
      setIsSaving(true);
      console.log('Saving...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSaving(false);
      setIsDirty(false);
      console.log('Saved successfully');
    };

    const handleDiscard = () => {
      setIsDirty(false);
      console.log('Changes discarded');
    };

    const editorActions = [
      {
        label: 'Save',
        onClick: handleSave,
        primary: true,
        loading: isSaving,
        disabled: !isDirty || isSaving,
      },
      {
        label: 'Discard',
        onClick: handleDiscard,
        disabled: isSaving,
      },
    ];

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          logo={{
            width: 124,
            topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
            url: '#',
          }}
          secondaryMenu={{
            activationButton: {
              label: 'Editor Tools',
              badge: isDirty ? { status: 'attention', content: '●' } : undefined,
            },
            actions: [
              {
                items: [
                  {
                    content: 'Preview',
                    icon: ViewIcon,
                    onAction: () => console.log('Preview'),
                  },
                  {
                    content: 'Share',
                    icon: ShareIcon,
                    onAction: () => console.log('Share'),
                  },
                  {
                    content: 'Print',
                    icon: PrintIcon,
                    onAction: () => console.log('Print'),
                  },
                ],
              },
            ],
          }}
        />

        <div style={{ padding: '24px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">Content Editor</Text>
                <Text>
                  This is an editor interface with save controls in the FullscreenBar.
                  Make changes to see the dirty state indicator.
                </Text>
                <Button onClick={() => setIsDirty(true)}>
                  Make changes
                </Button>
                {isDirty && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: '#fef2f2',
                    borderRadius: '4px',
                    border: '1px solid #fecaca'
                  }}>
                    <Text color="critical">
                      You have unsaved changes
                    </Text>
                  </div>
                )}
              </BlockStack>
            </div>
          </Card>
        </div>

        {isDirty && (
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '16px 24px',
            backgroundColor: 'white',
            borderTop: '1px solid #e1e3e5',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
          }}>
            <InlineStack align="space-between">
              <Text>You have unsaved changes</Text>
              <InlineStack gap="8px">
                <Button onClick={handleDiscard} disabled={isSaving}>
                  Discard
                </Button>
                <Button
                  onClick={handleSave}
                  primary
                  loading={isSaving}
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </InlineStack>
            </InlineStack>
          </div>
        )}
      </div>
    );
  },
};

export const SearchFocused: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const sampleData = [
      'Product A - Electronics',
      'Product B - Clothing',
      'Product C - Home & Garden',
      'Product D - Sports',
      'Order #1001',
      'Order #1002',
      'Customer: John Doe',
      'Customer: Jane Smith',
    ];

    const handleSearchChange = useCallback((value: string) => {
      setSearchValue(value);

      if (value.length > 0) {
        const filtered = sampleData.filter(item =>
          item.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(filtered);
        setIsSearchActive(true);
      } else {
        setSearchResults([]);
        setIsSearchActive(false);
      }
    }, []);

    const handleSearchResultsDismiss = useCallback(() => {
      setIsSearchActive(false);
      setSearchValue('');
      setSearchResults([]);
    }, []);

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          logo={{
            width: 124,
            topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
            url: '#',
          }}
          searchField={{
            placeholder: 'Search products, orders, customers...',
            value: searchValue,
            onChange: handleSearchChange,
            focused: isSearchActive,
          }}
          searchResultsVisible={isSearchActive}
          searchResults={{
            results: searchResults.map(result => ({ content: result })),
            onAction: (result) => {
              console.log('Selected:', result);
              handleSearchResultsDismiss();
            },
          }}
          onSearchResultsDismiss={handleSearchResultsDismiss}
        />

        <div style={{ padding: '24px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <Text variant="headingMd" as="h2">Search-First Interface</Text>
              <div style={{ marginTop: '16px' }}>
                <Text>
                  This interface prioritizes search functionality. Start typing in the search bar to see search results.
                </Text>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const MobileOptimized: Story = {
  render: () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    React.useEffect(() => {
      const handleResize = () => setViewportWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = viewportWidth < 768;

    const handleNavigationDismiss = useCallback(() => {
      setIsMobileMenuOpen(false);
    }, []);

    const mobileMenuActions = [
      {
        items: [
          { content: 'Dashboard', icon: ViewIcon },
          { content: 'Products', icon: EditIcon },
          { content: 'Orders', icon: ViewIcon },
          { content: 'Customers', icon: EditIcon },
          { content: 'Settings', icon: ViewIcon },
          { content: 'Logout', icon: ExitIcon },
        ],
      },
    ];

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          logo={{
            width: isMobile ? 80 : 124,
            topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
            url: '#',
          }}
          searchField={{
            placeholder: isMobile ? 'Search...' : 'Search products, orders...',
          }}
          secondaryMenu={{
            activationButton: {
              label: isMobile ? undefined : 'Menu',
              icon: MenuIcon,
            },
            actions: mobileMenuActions,
          }}
          onNavigationDismiss={handleNavigationDismiss}
        />

        <div style={{ padding: isMobile ? '16px' : '24px' }}>
          <Card>
            <div style={{ padding: isMobile ? '16px' : '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">Mobile Optimized Interface</Text>
                <Text>
                  Current viewport: {viewportWidth}px ({isMobile ? 'Mobile' : 'Desktop'})
                </Text>
                <Text>
                  This FullscreenBar adapts to different screen sizes.
                  On mobile devices, it shows a simplified layout with condensed labels and optimized spacing.
                </Text>
                <Button onClick={() => window.resizeTo(480, 800)}>
                  Simulate mobile view
                </Button>
              </BlockStack>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};

export const WithUserAvatar: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [notificationCount, setNotificationCount] = useState(3);

    const userActions = [
      {
        items: [
          { content: 'Account settings' },
          { content: 'Preferences' },
          { content: 'Help center' },
          { content: 'Sign out' },
        ],
      },
    ];

    const handleNotificationClick = () => {
      setNotificationCount(0);
      console.log('Notifications viewed');
    };

    return (
      <div style={{ height: '100vh' }}>
        <FullscreenBar
          logo={{
            width: 124,
            topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
            url: '#',
          }}
          searchField={{
            placeholder: 'Search...',
            value: searchValue,
            onChange: setSearchValue,
          }}
          secondaryMenu={{
            activationButton: {
              label: 'Sarah Chen',
              avatar: <Avatar customer size="small" name="Sarah Chen" />,
              badge: notificationCount > 0 ? {
                status: 'attention',
                content: notificationCount.toString()
              } : undefined,
              initials: 'SC',
            },
            actions: userActions,
          }}
        />

        <div style={{ padding: '24px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd">User-Centric Interface</Text>
                <Text>
                  This interface shows user information with avatar and notification badge in the FullscreenBar.
                  Click the user avatar to see additional actions.
                </Text>
                <Button onClick={() => setNotificationCount(notificationCount + 1)}>
                  Add notification
                </Button>
                <Button onClick={handleNotificationClick}>
                  Clear notifications
                </Button>
              </BlockStack>
            </div>
          </Card>
        </div>
      </div>
    );
  },
};