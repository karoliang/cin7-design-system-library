import type { Meta, StoryObj } from '@storybook/react';
import { Navigation } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Navigation/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation provides a hierarchical menu structure for complex applications. It supports nested items, icons, badges, and action-based navigation to help users move between different sections of your application.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    location: {
      control: 'text',
      description: 'Current navigation location/path',
    },
    onDismiss: {
      control: 'function',
      description: 'Callback when navigation is dismissed',
    },
    children: {
      control: 'object',
      description: 'Navigation items and sections',
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [location, setLocation] = React.useState('/home');

    return (
      <div style={{ height: '400px', display: 'flex' }}>
        <Navigation location={location}>
          <Navigation.Section
            items={[
              {
                url: '/home',
                label: 'Home',
                icon: 'home',
              },
              {
                url: '/orders',
                label: 'Orders',
                icon: 'orders',
                badge: '12',
              },
              {
                url: '/products',
                label: 'Products',
                icon: 'products',
              },
            ]}
          />
        </Navigation>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
          <h2>Current Location: {location}</h2>
        </div>
      </div>
    );
  },
};

export const NestedNavigation: Story = {
  render: () => {
    const [location, setLocation] = React.useState('/dashboard');

    return (
      <div style={{ height: '500px', display: 'flex' }}>
        <Navigation location={location}>
          <Navigation.Section
            title="Sales"
            items={[
              {
                url: '/dashboard',
                label: 'Dashboard',
                icon: 'home',
                selected: location.startsWith('/dashboard'),
              },
              {
                url: '/orders',
                label: 'Orders',
                icon: 'orders',
                badge: '24',
                selected: location.startsWith('/orders'),
                subNavigationItems: [
                  {
                    url: '/orders/all',
                    label: 'All Orders',
                    selected: location === '/orders/all',
                  },
                  {
                    url: '/orders/fulfillments',
                    label: 'Fulfillments',
                    selected: location === '/orders/fulfillments',
                  },
                  {
                    url: '/orders/returns',
                    label: 'Returns',
                    selected: location === '/orders/returns',
                    badge: '3',
                  },
                ],
              },
              {
                url: '/customers',
                label: 'Customers',
                icon: 'customers',
                selected: location.startsWith('/customers'),
                subNavigationItems: [
                  {
                    url: '/customers/all',
                    label: 'All Customers',
                    selected: location === '/customers/all',
                  },
                  {
                    url: '/customers/segments',
                    label: 'Segments',
                    selected: location === '/customers/segments',
                  },
                  {
                    url: '/customers/groups',
                    label: 'Groups',
                    selected: location === '/customers/groups',
                  },
                ],
              },
            ]}
          />
        </Navigation>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
          <h2>Sales Dashboard</h2>
          <p>Managing sales operations and customer relationships</p>
        </div>
      </div>
    );
  },
};

export const EcommerceNavigation: Story = {
  render: () => {
    const [location, setLocation] = React.useState('/dashboard');

    const handleNavigation = (url: string) => {
      setLocation(url);
    };

    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Navigation location={location}>
          <Navigation.Section
            title="Online Store"
            items={[
              {
                url: '/dashboard',
                label: 'Dashboard',
                icon: 'home',
                onClick: () => handleNavigation('/dashboard'),
              },
              {
                url: '/products',
                label: 'Products',
                icon: 'products',
                badge: '156',
                onClick: () => handleNavigation('/products'),
                subNavigationItems: [
                  {
                    url: '/products/all',
                    label: 'All products',
                    onClick: () => handleNavigation('/products/all'),
                  },
                  {
                    url: '/products/collections',
                    label: 'Collections',
                    onClick: () => handleNavigation('/products/collections'),
                  },
                  {
                    url: '/products/inventory',
                    label: 'Inventory',
                    onClick: () => handleNavigation('/products/inventory'),
                    badge: '23',
                  },
                  {
                    url: '/products/gift-cards',
                    label: 'Gift cards',
                    onClick: () => handleNavigation('/products/gift-cards'),
                  },
                ],
              },
              {
                url: '/customers',
                label: 'Customers',
                icon: 'customers',
                onClick: () => handleNavigation('/customers'),
                subNavigationItems: [
                  {
                    url: '/customers/all',
                    label: 'All customers',
                    onClick: () => handleNavigation('/customers/all'),
                  },
                  {
                    url: '/customers/segments',
                    label: 'Segments',
                    onClick: () => handleNavigation('/customers/segments'),
                  },
                  {
                    url: '/customers/groups',
                    label: 'Groups',
                    onClick: () => handleNavigation('/customers/groups'),
                  },
                ],
              },
              {
                url: '/analytics',
                label: 'Analytics',
                icon: 'analytics',
                onClick: () => handleNavigation('/analytics'),
                subNavigationItems: [
                  {
                    url: '/analytics/reports',
                    label: 'Reports',
                    onClick: () => handleNavigation('/analytics/reports'),
                  },
                  {
                    url: '/analytics/live-view',
                    label: 'Live view',
                    onClick: () => handleNavigation('/analytics/live-view'),
                  },
                ],
              },
            ]}
          />
          <Navigation.Section
            title="Apps"
            items={[
              {
                url: '/apps/marketing',
                label: 'Marketing',
                icon: 'marketing',
                onClick: () => handleNavigation('/apps/marketing'),
              },
              {
                url: '/apps/seo',
                label: 'SEO',
                icon: 'seo',
                onClick: () => handleNavigation('/apps/seo'),
              },
              {
                url: '/apps/discounts',
                label: 'Discounts',
                icon: 'discounts',
                onClick: () => handleNavigation('/apps/discounts'),
                badge: '5',
              },
            ]}
          />
          <Navigation.Section
            title="Settings"
            items={[
              {
                url: '/settings/general',
                label: 'General',
                icon: 'settings',
                onClick: () => handleNavigation('/settings/general'),
              },
              {
                url: '/settings/payment',
                label: 'Payment',
                icon: 'payment',
                onClick: () => handleNavigation('/settings/payment'),
              },
              {
                url: '/settings/shipping',
                label: 'Shipping',
                icon: 'shipping',
                onClick: () => handleNavigation('/settings/shipping'),
              },
            ]}
          />
        </Navigation>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
          <h2>ECommerce Management System</h2>
          <p>Current location: <strong>{location}</strong></p>
          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <p style={{ margin: 0, color: '#6b7280' }}>
              Click on any navigation item to see the location update. The navigation supports nested menus,
              badges for notifications, and organized sections for different areas of your store.
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const ProjectManagement: Story = {
  render: () => {
    const [location, setLocation] = React.useState('/workspace');
    const [activeProject, setActiveProject] = React.useState('website-redesign');

    const projects = [
      { id: 'website-redesign', name: 'Website Redesign', tasks: 23 },
      { id: 'mobile-app', name: 'Mobile App', tasks: 45 },
      { id: 'api-integration', name: 'API Integration', tasks: 12 },
    ];

    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Navigation location={location}>
          <Navigation.Section
            title="Workspace"
            items={[
              {
                url: '/workspace',
                label: 'Overview',
                icon: 'home',
                onClick: () => setLocation('/workspace'),
              },
              {
                url: '/projects',
                label: 'Projects',
                icon: 'folder',
                badge: projects.length.toString(),
                onClick: () => setLocation('/projects'),
                subNavigationItems: projects.map((project) => ({
                  url: `/projects/${project.id}`,
                  label: project.name,
                  badge: project.tasks.toString(),
                  onClick: () => {
                    setLocation(`/projects/${project.id}`);
                    setActiveProject(project.id);
                  },
                })),
              },
              {
                url: '/tasks',
                label: 'Tasks',
                icon: 'list',
                badge: '80',
                onClick: () => setLocation('/tasks'),
                subNavigationItems: [
                  {
                    url: '/tasks/assigned',
                    label: 'Assigned to me',
                    badge: '12',
                    onClick: () => setLocation('/tasks/assigned'),
                  },
                  {
                    url: '/tasks/today',
                    label: 'Due today',
                    badge: '5',
                    onClick: () => setLocation('/tasks/today'),
                  },
                  {
                    url: '/tasks/overdue',
                    label: 'Overdue',
                    badge: '3',
                    onClick: () => setLocation('/tasks/overdue'),
                  },
                ],
              },
              {
                url: '/team',
                label: 'Team',
                icon: 'users',
                onClick: () => setLocation('/team'),
                subNavigationItems: [
                  {
                    url: '/team/members',
                    label: 'Members',
                    onClick: () => setLocation('/team/members'),
                  },
                  {
                    url: '/team/roles',
                    label: 'Roles & Permissions',
                    onClick: () => setLocation('/team/roles'),
                  },
                ],
              },
            ]}
          />
          <Navigation.Section
            title="Tools"
            items={[
              {
                url: '/tools/calendar',
                label: 'Calendar',
                icon: 'calendar',
                onClick: () => setLocation('/tools/calendar'),
              },
              {
                url: '/tools/reports',
                label: 'Reports',
                icon: 'reports',
                onClick: () => setLocation('/tools/reports'),
              },
              {
                url: '/tools/integrations',
                label: 'Integrations',
                icon: 'apps',
                onClick: () => setLocation('/tools/integrations'),
              },
            ]}
          />
        </Navigation>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
          <h2>Project Management Hub</h2>
          <p>Current location: <strong>{location}</strong></p>

          {location.startsWith('/projects/') && (
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: '0 0 12px 0' }}>
                📁 {projects.find(p => p.id === activeProject)?.name}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '4px' }}>Total Tasks</div>
                  <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
                    {projects.find(p => p.id === activeProject)?.tasks}
                  </div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '4px' }}>Progress</div>
                  <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '600' }}>67%</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f3f4f6', borderRadius: '4px' }}>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '4px' }}>Due Date</div>
                  <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '600' }}>Dec 15</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const AdminPanel: Story = {
  render: () => {
    const [location, setLocation] = React.useState('/admin/dashboard');
    const [notifications, setNotifications] = React.useState({
      orders: 8,
      customers: 23,
      support: 5,
      system: 2,
    });

    const handleNavigation = (url: string) => {
      setLocation(url);
      // Clear notifications when visiting that section
      if (url.includes('/orders')) {
        setNotifications(prev => ({ ...prev, orders: 0 }));
      }
      if (url.includes('/customers')) {
        setNotifications(prev => ({ ...prev, customers: 0 }));
      }
      if (url.includes('/support')) {
        setNotifications(prev => ({ ...prev, support: 0 }));
      }
      if (url.includes('/system')) {
        setNotifications(prev => ({ ...prev, system: 0 }));
      }
    };

    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Navigation location={location}>
          <Navigation.Section
            title="Admin Panel"
            items={[
              {
                url: '/admin/dashboard',
                label: 'Dashboard',
                icon: 'home',
                onClick: () => handleNavigation('/admin/dashboard'),
              },
              {
                url: '/admin/orders',
                label: 'Orders',
                icon: 'orders',
                badge: notifications.orders.toString(),
                onClick: () => handleNavigation('/admin/orders'),
                subNavigationItems: [
                  {
                    url: '/admin/orders/pending',
                    label: 'Pending',
                    onClick: () => handleNavigation('/admin/orders/pending'),
                  },
                  {
                    url: '/admin/orders/processing',
                    label: 'Processing',
                    onClick: () => handleNavigation('/admin/orders/processing'),
                  },
                  {
                    url: '/admin/orders/completed',
                    label: 'Completed',
                    onClick: () => handleNavigation('/admin/orders/completed'),
                  },
                  {
                    url: '/admin/orders/returns',
                    label: 'Returns',
                    onClick: () => handleNavigation('/admin/orders/returns'),
                  },
                ],
              },
              {
                url: '/admin/customers',
                label: 'Customers',
                icon: 'customers',
                badge: notifications.customers.toString(),
                onClick: () => handleNavigation('/admin/customers'),
                subNavigationItems: [
                  {
                    url: '/admin/customers/all',
                    label: 'All Customers',
                    onClick: () => handleNavigation('/admin/customers/all'),
                  },
                  {
                    url: '/admin/customers/wholesale',
                    label: 'Wholesale',
                    onClick: () => handleNavigation('/admin/customers/wholesale'),
                  },
                  {
                    url: '/admin/customers/vip',
                    label: 'VIP Customers',
                    onClick: () => handleNavigation('/admin/customers/vip'),
                  },
                ],
              },
              {
                url: '/admin/catalog',
                label: 'Catalog',
                icon: 'products',
                onClick: () => handleNavigation('/admin/catalog'),
                subNavigationItems: [
                  {
                    url: '/admin/catalog/products',
                    label: 'Products',
                    onClick: () => handleNavigation('/admin/catalog/products'),
                  },
                  {
                    url: '/admin/catalog/categories',
                    label: 'Categories',
                    onClick: () => handleNavigation('/admin/catalog/categories'),
                  },
                  {
                    url: '/admin/catalog/attributes',
                    label: 'Attributes',
                    onClick: () => handleNavigation('/admin/catalog/attributes'),
                  },
                ],
              },
              {
                url: '/admin/marketing',
                label: 'Marketing',
                icon: 'marketing',
                onClick: () => handleNavigation('/admin/marketing'),
                subNavigationItems: [
                  {
                    url: '/admin/marketing/campaigns',
                    label: 'Campaigns',
                    onClick: () => handleNavigation('/admin/marketing/campaigns'),
                  },
                  {
                    url: '/admin/marketing/promotions',
                    label: 'Promotions',
                    onClick: () => handleNavigation('/admin/marketing/promotions'),
                  },
                  {
                    url: '/admin/marketing/seo',
                    label: 'SEO',
                    onClick: () => handleNavigation('/admin/marketing/seo'),
                  },
                ],
              },
            ]}
          />
          <Navigation.Section
            title="System"
            items={[
              {
                url: '/admin/support',
                label: 'Support',
                icon: 'support',
                badge: notifications.support.toString(),
                onClick: () => handleNavigation('/admin/support'),
              },
              {
                url: '/admin/system',
                label: 'System Health',
                icon: 'settings',
                badge: notifications.system.toString(),
                onClick: () => handleNavigation('/admin/system'),
                subNavigationItems: [
                  {
                    url: '/admin/system/performance',
                    label: 'Performance',
                    onClick: () => handleNavigation('/admin/system/performance'),
                  },
                  {
                    url: '/admin/system/logs',
                    label: 'Logs',
                    onClick: () => handleNavigation('/admin/system/logs'),
                  },
                  {
                    url: '/admin/system/backup',
                    label: 'Backup',
                    onClick: () => handleNavigation('/admin/system/backup'),
                  },
                ],
              },
            ]}
          />
        </Navigation>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
          <h2>🎛️ Admin Control Panel</h2>
          <p>Current location: <strong>{location}</strong></p>

          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: "var(--font-size-sm)", fontWeight: '600' }}>System Status</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-xs)" }}>Server Status</span>
                  <span style={{ fontSize: "var(--font-size-xs)", color: '#10b981', fontWeight: '600' }}>Online</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-xs)" }}>Database</span>
                  <span style={{ fontSize: "var(--font-size-xs)", color: '#10b981', fontWeight: '600' }}>Healthy</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-xs)" }}>Cache</span>
                  <span style={{ fontSize: "var(--font-size-xs)", color: '#10b981', fontWeight: '600' }}>Active</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: "var(--font-size-sm)", fontWeight: '600' }}>Notifications</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-xs)" }}>Orders</span>
                  <span style={{ fontSize: "var(--font-size-xs)", fontWeight: '600' }}>{notifications.orders}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-xs)" }}>Customers</span>
                  <span style={{ fontSize: "var(--font-size-xs)", fontWeight: '600' }}>{notifications.customers}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-xs)" }}>Support</span>
                  <span style={{ fontSize: "var(--font-size-xs)", fontWeight: '600' }}>{notifications.support}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#1e40af' }}>
              💡 Click on navigation items to explore different sections. Badges show pending items and automatically clear when you visit those sections.
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const LearningPlatform: Story = {
  render: () => {
    const [location, setLocation] = React.useState('/learn/dashboard');
    const [userProgress, setUserProgress] = React.useState({
      courses: 12,
      completed: 8,
      certificates: 3,
      hours: 45,
    });

    const courses = [
      { id: 'javascript-basics', name: 'JavaScript Basics', progress: 100, duration: '4h' },
      { id: 'react-fundamentals', name: 'React Fundamentals', progress: 75, duration: '6h' },
      { id: 'nodejs-backend', name: 'Node.js Backend', progress: 30, duration: '8h' },
      { id: 'database-design', name: 'Database Design', progress: 0, duration: '5h' },
    ];

    return (
      <div style={{ height: '600px', display: 'flex' }}>
        <Navigation location={location}>
          <Navigation.Section
            title="Learning Hub"
            items={[
              {
                url: '/learn/dashboard',
                label: 'Dashboard',
                icon: 'home',
                onClick: () => setLocation('/learn/dashboard'),
              },
              {
                url: '/learn/courses',
                label: 'My Courses',
                icon: 'education',
                badge: courses.filter(c => c.progress > 0 && c.progress < 100).length.toString(),
                onClick: () => setLocation('/learn/courses'),
                subNavigationItems: courses.map((course) => ({
                  url: `/learn/courses/${course.id}`,
                  label: course.name,
                  badge: course.progress === 100 ? '✓' : `${course.progress}%`,
                  onClick: () => setLocation(`/learn/courses/${course.id}`),
                })),
              },
              {
                url: '/learn/pathways',
                label: 'Learning Paths',
                icon: 'circle',
                onClick: () => setLocation('/learn/pathways'),
                subNavigationItems: [
                  {
                    url: '/learn/pathways/frontend',
                    label: 'Frontend Developer',
                    onClick: () => setLocation('/learn/pathways/frontend'),
                  },
                  {
                    url: '/learn/pathways/fullstack',
                    label: 'Full Stack Developer',
                    onClick: () => setLocation('/learn/pathways/fullstack'),
                  },
                  {
                    url: '/learn/pathways/backend',
                    label: 'Backend Developer',
                    onClick: () => setLocation('/learn/pathways/backend'),
                  },
                ],
              },
              {
                url: '/learn/certificates',
                label: 'Certificates',
                icon: 'achievement',
                badge: userProgress.certificates.toString(),
                onClick: () => setLocation('/learn/certificates'),
              },
              {
                url: '/learn/resources',
                label: 'Resources',
                icon: 'folder',
                onClick: () => setLocation('/learn/resources'),
                subNavigationItems: [
                  {
                    url: '/learn/resources/documentation',
                    label: 'Documentation',
                    onClick: () => setLocation('/learn/resources/documentation'),
                  },
                  {
                    url: '/learn/resources/videos',
                    label: 'Video Tutorials',
                    onClick: () => setLocation('/learn/resources/videos'),
                  },
                  {
                    url: '/learn/resources/downloads',
                    label: 'Downloads',
                    onClick: () => setLocation('/learn/resources/downloads'),
                  },
                ],
              },
            ]}
          />
          <Navigation.Section
            title="Community"
            items={[
              {
                url: '/learn/forums',
                label: 'Forums',
                icon: 'conversation',
                onClick: () => setLocation('/learn/forums'),
              },
              {
                url: '/learn/mentorship',
                label: 'Mentorship',
                icon: 'users',
                onClick: () => setLocation('/learn/mentorship'),
              },
              {
                url: '/learn/events',
                label: 'Events',
                icon: 'calendar',
                onClick: () => setLocation('/learn/events'),
              },
            ]}
          />
        </Navigation>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9fafb' }}>
          <h2>📚 Learning Platform</h2>
          <p>Current location: <strong>{location}</strong></p>

          <div style={{
            marginTop: '20px',
            padding: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 16px 0' }}>Your Learning Progress</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{userProgress.courses}</div>
                <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Courses Enrolled</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{userProgress.completed}</div>
                <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Completed</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{userProgress.certificates}</div>
                <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Certificates</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: "var(--font-size-2xl)", fontWeight: '700' }}>{userProgress.hours}h</div>
                <div style={{ fontSize: "var(--font-size-xs)", opacity: 0.8 }}>Learning Time</div>
              </div>
            </div>
          </div>

          {location.startsWith('/learn/courses/') && (
            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: 'white', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>🎯 Course Details</h4>
              {courses.filter(c => location.includes(c.id)).map(course => (
                <div key={course.id}>
                  <p style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-sm)" }}>
                    <strong>{course.name}</strong> - {course.duration} duration
                  </p>
                  <div style={{
                    height: '8px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        height: '100%',
                        backgroundColor: '#10b981',
                        borderRadius: '4px',
                        width: `${course.progress}%`,
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </div>
                  <p style={{ margin: '8px 0 0 0', fontSize: "var(--font-size-xs)", color: '#6b7280' }}>
                    Progress: {course.progress}%
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
};