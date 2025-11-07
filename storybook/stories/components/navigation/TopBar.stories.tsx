import type { Meta, StoryObj } from '@storybook/react';
import { TopBar } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Navigation/TopBar',
  component: TopBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'TopBar provides a consistent header for applications with search functionality, user menu, and navigation controls. It\'s typically used at the top of the page to provide global actions and user account management.',
      },
    },
    codeVariants: getCodeVariants('topbar', 'default'),
  },
  tags: ['autodocs'],
  argTypes: {
    showNavigationToggle: {
      control: 'boolean',
      description: 'Show navigation menu toggle button',
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
      description: 'Search results to display',
    },
    onNavigationToggle: {
      control: 'function',
      description: 'Callback when navigation toggle is clicked',
    },
    onSearchResultsDismiss: {
      control: 'function',
      description: 'Callback when search results are dismissed',
    },
    userMenu: {
      control: 'object',
      description: 'User menu configuration',
    },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search"
      />
    );

    return (
      <div style={{ height: '60px' }}>
        <TopBar
          showNavigationToggle
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'default'),
  },

};

export const WithUserMenu: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const handleToggleUserMenu = React.useCallback(() => {
      setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search products, orders, customers..."
      />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              { content: 'Back to Shopify', icon: 'arrowLeft' },
              { content: 'Community forums' },
            ],
          },
          {
            items: [
              { content: 'Account', icon: 'profile' },
              { content: 'Preferences', icon: 'settings' },
              { content: 'Log out', icon: 'logOut' },
            ],
          },
        ]}
        name="John Doe"
        detail="john.doe@example.com"
        initials="JD"
        open={isUserMenuOpen}
        onToggle={handleToggleUserMenu}
      />
    );

    return (
      <div style={{ height: '60px' }}>
        <TopBar
          showNavigationToggle
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
          userMenu={userMenu}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'withusermenu'),
  },

};

export const EcommerceHeader: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const mockSearchResults = [
      { title: 'Wireless Headphones', url: '#products/123' },
      { title: 'Bluetooth Speaker', url: '#products/456' },
      { title: 'Phone Case Premium', url: '#products/789' },
    ];

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const handleToggleUserMenu = React.useCallback(() => {
      setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    const handleNavigationToggle = React.useCallback(() => {
      setMobileMenuOpen(!mobileMenuOpen);
    }, [mobileMenuOpen]);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search products, orders, or customers..."
      />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              { content: 'Store Dashboard', icon: 'home', url: '#dashboard' },
              { content: 'Products', icon: 'products', url: '#products' },
              { content: 'Orders', icon: 'orders', url: '#orders' },
            ],
          },
          {
            items: [
              { content: 'Account Settings', icon: 'profile' },
              { content: 'Store Settings', icon: 'settings' },
              { content: 'Billing', icon: 'billing' },
            ],
          },
          {
            items: [
              { content: 'Help Center', icon: 'help' },
              { content: 'Community Forums', icon: 'forums' },
              { content: 'Log out', icon: 'logOut', destructive: true },
            ],
          },
        ]}
        name="Sarah Johnson"
        detail="sarah@store.com"
        initials="SJ"
        open={isUserMenuOpen}
        onToggle={handleToggleUserMenu}
      />
    );

    const searchResults = searchResultsVisible && searchValue ? (
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        maxHeight: '300px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
        <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ margin: 0, fontSize: "12px", color: '#6b7280' }}>
            Search results for "{searchValue}"
          </p>
        </div>
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {mockSearchResults.map((result, index) => (
            <a
              key={index}
              href={result.url}
              style={{
                display: 'block',
                padding: '12px',
                textDecoration: 'none',
                color: '#374151',
                borderBottom: index < mockSearchResults.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
              }}
              onClick={handleSearchResultsDismiss}
            >
              <div style={{ fontSize: "14px", fontWeight: '500' }}>{result.title}</div>
              <div style={{ fontSize: "12px", color: '#6b7280', marginTop: '2px' }}>Product</div>
            </a>
          ))}
        </div>
      </div>
    ) : null;

    return (
      <div style={{ position: 'relative' }}>
        <TopBar
          showNavigationToggle
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
          userMenu={userMenu}
          onNavigationToggle={handleNavigationToggle}
        />
        {searchResults}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'ecommerceheader'),
  },

};

export const AdminDashboard: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState(5);

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const handleToggleUserMenu = React.useCallback(() => {
      setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search admin functions, settings, documentation..."
      />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              { content: '📊 Dashboard', url: '#admin/dashboard' },
              { content: '👥 Team Management', url: '#admin/team' },
              { content: '⚙️ System Settings', url: '#admin/settings' },
            ],
          },
          {
            items: [
              { content: '📈 Analytics & Reports', url: '#admin/analytics' },
              { content: '🔒 Security', url: '#admin/security' },
              { content: '💾 Backup & Recovery', url: '#admin/backup' },
            ],
          },
          {
            items: [
              { content: '📚 Documentation', url: '#docs' },
              { content: '💬 Support Center', url: '#support' },
              { content: '🚪 Sign Out', icon: 'logOut', destructive: true },
            ],
          },
        ]}
        name="Admin User"
        detail="admin@company.com"
        initials="AU"
        open={isUserMenuOpen}
        onToggle={handleToggleUserMenu}
      />
    );

    return (
      <div style={{ height: '60px', backgroundColor: '#1f2937' }}>
        <TopBar
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
          userMenu={userMenu}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'admindashboard'),
  },

};

export const ProjectManagement: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [currentProject, setCurrentProject] = React.useState('Website Redesign');

    const projects = ['Website Redesign', 'Mobile App', 'API Integration', 'Marketing Campaign'];
    const mockSearchResults = [
      { title: 'Homepage Mockup', type: 'Design', project: 'Website Redesign' },
      { title: 'User Authentication', type: 'Task', project: 'Mobile App' },
      { title: 'Database Schema', type: 'Documentation', project: 'API Integration' },
    ];

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const handleToggleUserMenu = React.useCallback(() => {
      setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search tasks, projects, team members..."
      />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              {
                content: '🎯 Switch Project',
                actions: projects.map(project => ({
                  content: project,
                  onAction: () => setCurrentProject(project),
                })),
              },
            ],
          },
          {
            items: [
              { content: '👤 My Profile', url: '#profile' },
              { content: '📊 My Tasks', url: '#my-tasks' },
              { content: '⏰ Time Tracking', url: '#time-tracking' },
            ],
          },
          {
            items: [
              { content: '🔔 Notifications', badge: '3' },
              { content: '⚙️ Preferences' },
              { content: '🚪 Sign Out', icon: 'logOut', destructive: true },
            ],
          },
        ]}
        name="Alex Chen"
        detail="alex@team.com"
        initials="AC"
        open={isUserMenuOpen}
        onToggle={handleToggleUserMenu}
      />
    );

    const searchResults = searchResultsVisible && searchValue ? (
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '450px',
        maxHeight: '350px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>
            Found {mockSearchResults.length} results for "{searchValue}"
          </p>
        </div>
        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
          {mockSearchResults.map((result, index) => (
            <a
              key={index}
              href="#"
              style={{
                display: 'block',
                padding: '16px',
                textDecoration: 'none',
                color: '#374151',
                borderBottom: index < mockSearchResults.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onClick={handleSearchResultsDismiss}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: '600', marginBottom: '4px' }}>
                    {result.title}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', fontSize: "12px", color: '#6b7280' }}>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: '#f3f4f6',
                      borderRadius: '3px',
                      fontSize: '11px'
                    }}>
                      {result.type}
                    </span>
                    <span>in {result.project}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    ) : null;

    return (
      <div style={{ position: 'relative', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{
          padding: '8px 16px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <span style={{ fontSize: "12px", color: '#6b7280' }}>
            Current Project: <strong style={{ color: '#1f2937' }}>{currentProject}</strong>
          </span>
        </div>
        <TopBar
          showNavigationToggle
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
          userMenu={userMenu}
        />
        {searchResults}
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'projectmanagement'),
  },

};

export const CustomerSupport: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [activeTickets, setActiveTickets] = React.useState(3);
    const [onlineStatus, setOnlineStatus] = React.useState('online');

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const handleToggleUserMenu = React.useCallback(() => {
      setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search customers, tickets, knowledge base..."
      />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              { content: '🎫 Active Tickets', badge: activeTickets.toString(), url: '#tickets/active' },
              { content: '📋 My Queue', url: '#queue' },
              { content: '📊 Performance Metrics', url: '#metrics' },
            ],
          },
          {
            items: [
              {
                content: '🟢 Online Status',
                actions: [
                  { content: '🟢 Available', onAction: () => setOnlineStatus('online') },
                  { content: '🟡 Away', onAction: () => setOnlineStatus('away') },
                  { content: '🔴 Busy', onAction: () => setOnlineStatus('busy') },
                ],
              },
              { content: '⏰ Break Mode', url: '#break' },
            ],
          },
          {
            items: [
              { content: '📚 Knowledge Base', url: '#knowledge' },
              { content: '👥 Team Chat', url: '#chat' },
              { content: '🚪 Sign Out', icon: 'logOut', destructive: true },
            ],
          },
        ]}
        name="Emma Wilson"
        detail="emma@support.com"
        initials="EW"
        open={isUserMenuOpen}
        onToggle={handleToggleUserMenu}
      />
    );

    return (
      <div style={{ height: '60px' }}>
        <TopBar
          showNavigationToggle
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
          userMenu={userMenu}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'customersupport'),
  },

};

export const EducationalPlatform: Story = {
  render: () => {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchResultsVisible, setSearchResultsVisible] = React.useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
    const [currentCourse, setCurrentCourse] = React.useState('React Fundamentals');
    const [learningProgress, setLearningProgress] = React.useState(75);

    const courses = ['React Fundamentals', 'JavaScript Advanced', 'Node.js Backend', 'UI/UX Design'];

    const handleSearchResultsDismiss = React.useCallback(() => {
      setSearchResultsVisible(false);
    }, []);

    const handleSearchFieldChange = React.useCallback((value: string) => {
      setSearchValue(value);
      setSearchResultsVisible(value.length > 0);
    }, []);

    const handleToggleUserMenu = React.useCallback(() => {
      setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen);
    }, []);

    const searchField = (
      <TopBar.SearchField
        onChange={handleSearchFieldChange}
        value={searchValue}
        placeholder="Search courses, lessons, topics..."
      />
    );

    const userMenu = (
      <TopBar.UserMenu
        actions={[
          {
            items: [
              {
                content: '📚 My Courses',
                badge: `${courses.length}`,
                actions: courses.map(course => ({
                  content: course,
                  onAction: () => setCurrentCourse(course),
                })),
              },
            ],
          },
          {
            items: [
              { content: '🏆 Certificates', url: '#certificates' },
              { content: '📊 Progress Report', url: '#progress' },
              { content: '🎯 Learning Goals', url: '#goals' },
            ],
          },
          {
            items: [
              { content: '👥 Study Groups', url: '#groups' },
              { content: '📝 Assignments', badge: '2', url: '#assignments' },
              { content: '🚪 Sign Out', icon: 'logOut', destructive: true },
            ],
          },
        ]}
        name="Michael Brown"
        detail="michael@learning.com"
        initials="MB"
        open={isUserMenuOpen}
        onToggle={handleToggleUserMenu}
      />
    );

    return (
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{
          padding: '12px 20px',
          background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>Currently Learning</div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>{currentCourse}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: "20px", fontWeight: '700' }}>{learningProgress}%</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Complete</div>
            </div>
          </div>
        </div>
        <TopBar
          searchField={searchField}
          searchResultsVisible={searchResultsVisible}
          onSearchResultsDismiss={handleSearchResultsDismiss}
          userMenu={userMenu}
        />
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('topbar', 'educationalplatform'),
  },

};