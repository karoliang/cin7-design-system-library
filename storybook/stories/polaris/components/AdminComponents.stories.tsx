import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  DataTable,
  Button,
  Badge,
  Icon,
  TextField,
  Select,
  Checkbox,
  ButtonGroup,
  Modal,
  ActionList,
  Popover,
  Banner,
  Avatar,
  Text,
  InlineStack,
  BlockStack,
  Grid,
  Divider,
  Tabs,
  Tag,
  ChoiceList,
  FormLayout,
  Pagination,
  Scrollable,
  Tooltip,
  Layout,
  Page,
  Navigation,
  TopBar,
  Frame,
  ContextualSaveBar,
  IndexTable,
  useIndexResourceState,
  useSetIndexFiltersMode,
  IndexFilters,
} from '@shopify/polaris';
import {
  CustomersMajor,
  SettingsMajor,
  LockMajor,
  HistoryMajor,
  ExportMinor,
  ImportMinor,
  PlusMinor,
  EditMinor,
  DeleteMinor,
  ViewMinor,
  SearchMinor,
  FilterMajor,
  ChevronDownMinor,
  CheckmarkMinor,
  XMarkMinor,
  AlertMinor,
  InfoMinor,
  WarningMinor,
  CircleDisabledMajor,
  MobileMajor,
  DesktopMajor,
  StoreMajor,
  NotificationMajor,
  EmailMajor,
  SmsMajor,
  BellMinor,
  QuestionMarkMinor,
  LogOutMinor,
  ProfileMajor,
  CreditCardMajor,
  ShieldMajor,
  MonitorMajor,
  AnalyticsMajor,
  ArchiveMajor,
  UnarchiveMajor,
  DisableMajor,
  EnableMajor,
} from '@shopify/polaris-icons';
import React, { useState, useCallback, useMemo } from 'react';

const meta = {
  title: 'Business Components/Admin Components',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive admin interface components for enterprise applications. Features user management with role-based permissions, system configuration, audit logging, bulk operations, and administrative workflows with proper security controls.',
      },
    },
  },
  tags: ['autodocs', 'business', 'admin', 'management'],
  argTypes: {
    showPermissions: {
      control: 'boolean',
      description: 'Display detailed permission management interface',
    },
    enableAuditLog: {
      control: 'boolean',
      description: 'Show comprehensive audit logging and activity tracking',
    },
    showBulkOperations: {
      control: 'boolean',
      description: 'Enable bulk administrative operations',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// Sample data for admin components
const users = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'Super Admin',
    status: 'Active',
    lastActive: '2 hours ago',
    permissions: ['all'],
    createdAt: '2024-01-15',
    department: 'IT',
    avatar: 'https://picsum.photos/seed/user1/100/100.jpg',
    twoFactorEnabled: true,
    sessionCount: 5,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '1 day ago',
    permissions: ['users', 'products', 'orders'],
    createdAt: '2024-02-20',
    department: 'Operations',
    avatar: 'https://picsum.photos/seed/user2/100/100.jpg',
    twoFactorEnabled: true,
    sessionCount: 3,
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'Manager',
    status: 'Active',
    lastActive: '3 hours ago',
    permissions: ['orders', 'customers'],
    createdAt: '2024-03-10',
    department: 'Sales',
    avatar: 'https://picsum.photos/seed/user3/100/100.jpg',
    twoFactorEnabled: false,
    sessionCount: 8,
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@company.com',
    role: 'Editor',
    status: 'Inactive',
    lastActive: '2 weeks ago',
    permissions: ['products'],
    createdAt: '2024-04-05',
    department: 'Marketing',
    avatar: 'https://picsum.photos/seed/user4/100/100.jpg',
    twoFactorEnabled: false,
    sessionCount: 1,
  },
  {
    id: '5',
    name: 'Robert Wilson',
    email: 'robert.w@company.com',
    role: 'Viewer',
    status: 'Suspended',
    lastActive: '1 month ago',
    permissions: ['view_reports'],
    createdAt: '2024-05-12',
    department: 'Finance',
    avatar: 'https://picsum.photos/seed/user5/100/100.jpg',
    twoFactorEnabled: true,
    sessionCount: 12,
  },
];

const roles = [
  {
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    permissions: ['all'],
    userCount: 2,
    color: 'critical',
    level: 5,
  },
  {
    name: 'Admin',
    description: 'Administrative access to most system features',
    permissions: ['users', 'products', 'orders', 'reports'],
    userCount: 5,
    color: 'warning',
    level: 4,
  },
  {
    name: 'Manager',
    description: 'Departmental management access',
    permissions: ['orders', 'customers', 'inventory'],
    userCount: 12,
    color: 'attention',
    level: 3,
  },
  {
    name: 'Editor',
    description: 'Content and product management access',
    permissions: ['products', 'content'],
    userCount: 8,
    color: 'info',
    level: 2,
  },
  {
    name: 'Viewer',
    description: 'Read-only access to reports and analytics',
    permissions: ['view_reports'],
    userCount: 25,
    color: 'subdued',
    level: 1,
  },
];

const auditLogs = [
  {
    id: '1',
    timestamp: '2024-07-20 14:35:22',
    user: 'John Smith',
    action: 'USER_CREATED',
    target: 'New user: Sarah Johnson',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Chrome)',
    status: 'success',
    details: 'Created new admin user with full permissions',
  },
  {
    id: '2',
    timestamp: '2024-07-20 14:32:15',
    user: 'Sarah Johnson',
    action: 'PERMISSION_MODIFIED',
    target: 'User: Mike Chen',
    ip: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Safari)',
    status: 'success',
    details: 'Updated user role from Editor to Manager',
  },
  {
    id: '3',
    timestamp: '2024-07-20 14:28:43',
    user: 'Mike Chen',
    action: 'BULK_EXPORT',
    target: 'Customer data (500 records)',
    ip: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Chrome)',
    status: 'success',
    details: 'Exported customer list for marketing campaign',
  },
  {
    id: '4',
    timestamp: '2024-07-20 14:15:18',
    user: 'Unknown',
    action: 'LOGIN_FAILED',
    target: 'User: admin@company.com',
    ip: '185.220.101.42',
    userAgent: 'curl/7.68.0',
    status: 'failed',
    details: 'Multiple failed login attempts detected',
  },
  {
    id: '5',
    timestamp: '2024-07-20 13:45:09',
    user: 'System',
    action: 'BACKUP_COMPLETED',
    target: 'System backup',
    ip: '127.0.0.1',
    userAgent: 'System',
    status: 'success',
    details: 'Scheduled daily backup completed successfully',
  },
];

// User Management Component
const UserManagement = ({ showPermissions = false, showBulkOperations = false }: {
  showPermissions?: boolean;
  showBulkOperations?: boolean;
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [searchQuery, filterRole, filterStatus]);

  const handleBulkAction = (action: string) => {
    setSelectedAction(action);
    // Handle bulk action logic
    console.log(`Bulk action: ${action} on users: ${selectedUsers.join(', ')}`);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      Active: 'success',
      Inactive: 'subdued',
      Suspended: 'critical',
    } as const;
    return <Badge status={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      'Super Admin': 'critical',
      'Admin': 'warning',
      'Manager': 'attention',
      'Editor': 'info',
      'Viewer': 'subdued',
    } as const;
    return <Badge status={colors[role as keyof typeof colors]}>{role}</Badge>;
  };

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Text variant="headingXl" as="h1">User Management</Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button icon={ImportMinor}>Import Users</Button>
            <Button icon={ExportMinor}>Export Users</Button>
            <Button primary icon={PlusMinor} onClick={() => setModalOpen(true)}>
              Add User
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
          <TextField
            placeholder="Search users..."
            value={searchQuery}
            onChange={setSearchQuery}
            prefix={<Icon source={SearchMinor} />}
            clearButton
          />
          <Select
            label="Role"
            labelHidden
            value={filterRole}
            onChange={setFilterRole}
            options={[
              { label: 'All Roles', value: 'all' },
              ...roles.map(role => ({ label: role.name, value: role.name }))
            ]}
          />
          <Select
            label="Status"
            labelHidden
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
              { label: 'Suspended', value: 'suspended' },
            ]}
          />
        </div>

        {/* Bulk Operations */}
        {showBulkOperations && selectedUsers.length > 0 && (
          <Banner status="info" onDismiss={() => setSelectedUsers([])}>
            <Text variant="bodySm">
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
            </Text>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button size="small" onClick={() => handleBulkAction('activate')}>Activate</Button>
              <Button size="small" onClick={() => handleBulkAction('deactivate')}>Deactivate</Button>
              <Button size="small" onClick={() => handleBulkAction('suspend')}>Suspend</Button>
              <Button size="small" onClick={() => handleBulkAction('export')}>Export</Button>
              <Button size="small" tone="critical" onClick={() => handleBulkAction('delete')}>Delete</Button>
            </div>
          </Banner>
        )}

        {/* Users Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e1e1e1' }}>
                {showBulkOperations && (
                  <th style={{ padding: '12px', textAlign: 'left' }}>
                    <Checkbox
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={() => {
                        if (selectedUsers.length === filteredUsers.length) {
                          setSelectedUsers([]);
                        } else {
                          setSelectedUsers(filteredUsers.map(user => user.id));
                        }
                      }}
                    />
                  </th>
                )}
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>USER</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>ROLE</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>DEPARTMENT</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>LAST ACTIVE</th>
                {showPermissions && (
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>PERMISSIONS</th>
                )}
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e1e1e1' }}>
                  {showBulkOperations && (
                    <td style={{ padding: '12px' }}>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => {
                          if (selectedUsers.includes(user.id)) {
                            setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                          } else {
                            setSelectedUsers([...selectedUsers, user.id]);
                          }
                        }}
                      />
                    </td>
                  )}
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Avatar size="small" source={user.avatar} name={user.name} />
                      <div>
                        <Text variant="bodyMd" fontWeight="semibold">{user.name}</Text>
                        <Text variant="bodySm" tone="subdued">{user.email}</Text>
                        {user.twoFactorEnabled && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Icon source={ShieldMajor} size="small" tone="success" />
                            <Text variant="bodyXs" tone="success">2FA</Text>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>{getRoleBadge(user.role)}</td>
                  <td style={{ padding: '12px' }}>{getStatusBadge(user.status)}</td>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm">{user.department}</Text>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm">{user.lastActive}</Text>
                    <Text variant="bodyXs" tone="subdued">{user.sessionCount} sessions</Text>
                  </td>
                  {showPermissions && (
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {user.permissions.slice(0, 3).map((permission) => (
                          <Tag key={permission}>{permission}</Tag>
                        ))}
                        {user.permissions.length > 3 && (
                          <Text variant="bodyXs" tone="subdued">+{user.permissions.length - 3} more</Text>
                        )}
                      </div>
                    </td>
                  )}
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <Tooltip content="View User">
                        <Button size="small" variant="plain" icon={ViewMinor} />
                      </Tooltip>
                      <Tooltip content="Edit User">
                        <Button size="small" variant="plain" icon={EditMinor} />
                      </Tooltip>
                      <Tooltip content="User Settings">
                        <Button size="small" variant="plain" icon={SettingsMajor} />
                      </Tooltip>
                      <Tooltip content="Delete User">
                        <Button size="small" variant="plain" icon={DeleteMinor} tone="critical" />
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <Text variant="bodySm" tone="subdued">
            Showing {filteredUsers.length} of {users.length} users
          </Text>
          <Pagination label="1" hasNext hasPrevious />
        </div>
      </div>
    </Card>
  );
};

// Role and Permission Management Component
const RolePermissionManagement = () => {
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [permissions, setPermissions] = useState({
    users: true,
    products: true,
    orders: true,
    customers: false,
    reports: true,
    settings: false,
    analytics: false,
    inventory: false,
  });

  const permissionCategories = [
    {
      name: 'User Management',
      permissions: ['users'],
      description: 'Manage user accounts, roles, and permissions',
    },
    {
      name: 'Product Management',
      permissions: ['products', 'inventory'],
      description: 'Manage products, variants, and inventory levels',
    },
    {
      name: 'Order Management',
      permissions: ['orders'],
      description: 'Process orders, refunds, and returns',
    },
    {
      name: 'Customer Management',
      permissions: ['customers'],
      description: 'Manage customer accounts and relationships',
    },
    {
      name: 'Analytics & Reports',
      permissions: ['reports', 'analytics'],
      description: 'View reports and business analytics',
    },
    {
      name: 'System Settings',
      permissions: ['settings'],
      description: 'Configure system settings and preferences',
    },
  ];

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <Text variant="headingXl" as="h1">Role & Permission Management</Text>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', marginTop: '24px' }}>
          {/* Roles List */}
          <div>
            <Text variant="headingLg" as="h2">Roles</Text>
            <div style={{ marginTop: '16px' }}>
              {roles.map((role) => (
                <div
                  key={role.name}
                  style={{
                    padding: '16px',
                    border: `1px solid ${selectedRole === role.name ? '#202223' : '#e1e1e1'}`,
                    borderRadius: '8px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                    backgroundColor: selectedRole === role.name ? '#f8f8f8' : 'white',
                  }}
                  onClick={() => setSelectedRole(role.name)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <Text variant="bodyMd" fontWeight="semibold">{role.name}</Text>
                      <Text variant="bodySm" tone="subdued">{role.description}</Text>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <Badge status={role.color as any}>Level {role.level}</Badge>
                        <Text variant="bodyXs" tone="subdued">{role.userCount} users</Text>
                      </div>
                    </div>
                    <ChevronRightMinor />
                  </div>
                </div>
              ))}

              <Button icon={PlusMinor} variant="plain" style={{ marginTop: '16px' }}>
                Create New Role
              </Button>
            </div>
          </div>

          {/* Permissions Configuration */}
          <div>
            <Text variant="headingLg" as="h2">Permissions for: {selectedRole}</Text>

            <div style={{ marginTop: '16px' }}>
              {permissionCategories.map((category) => (
                <div key={category.name} style={{
                  padding: '16px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Text variant="bodyMd" fontWeight="semibold">{category.name}</Text>
                    <Text variant="bodySm" tone="subdued">{category.description}</Text>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {category.permissions.map((permission) => (
                      <Checkbox
                        key={permission}
                        label={permission.charAt(0).toUpperCase() + permission.slice(1)}
                        checked={permissions[permission as keyof typeof permissions]}
                        onChange={(checked) => setPermissions(prev => ({
                          ...prev,
                          [permission]: checked
                        }))}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <Button primary>Save Changes</Button>
              <Button variant="plain">Reset</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Audit Log Component
const AuditLog = () => {
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const filteredLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesAction = filterAction === 'all' || log.action === filterAction;
      const matchesUser = filterUser === 'all' || log.user === filterUser;
      const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
      return matchesAction && matchesUser && matchesStatus;
    });
  }, [filterAction, filterUser, filterStatus]);

  const getActionIcon = (action: string) => {
    const iconMap: Record<string, any> = {
      'USER_CREATED': PlusMinor,
      'PERMISSION_MODIFIED': SettingsMajor,
      'BULK_EXPORT': ExportMinor,
      'LOGIN_FAILED': LockMajor,
      'BACKUP_COMPLETED': ArchiveMajor,
    };
    return iconMap[action] || InfoMinor;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      success: 'success',
      failed: 'critical',
      warning: 'warning',
    } as const;
    return <Badge status={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Text variant="headingXl" as="h1">Audit Log</Text>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button icon={ExportMinor}>Export Log</Button>
            <Button icon={ArchiveMinor}>Archive Old Logs</Button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', padding: '16px', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
          <Select
            label="Date Range"
            labelHidden
            value={dateRange}
            onChange={setDateRange}
            options={[
              { label: 'Today', value: 'today' },
              { label: 'Last 7 days', value: '7d' },
              { label: 'Last 30 days', value: '30d' },
              { label: 'Last 90 days', value: '90d' },
              { label: 'Custom range', value: 'custom' },
            ]}
          />
          <Select
            label="Action"
            labelHidden
            value={filterAction}
            onChange={setFilterAction}
            options={[
              { label: 'All Actions', value: 'all' },
              { label: 'User Created', value: 'USER_CREATED' },
              { label: 'Permission Modified', value: 'PERMISSION_MODIFIED' },
              { label: 'Bulk Export', value: 'BULK_EXPORT' },
              { label: 'Login Failed', value: 'LOGIN_FAILED' },
              { label: 'Backup Completed', value: 'BACKUP_COMPLETED' },
            ]}
          />
          <Select
            label="User"
            labelHidden
            value={filterUser}
            onChange={setFilterUser}
            options={[
              { label: 'All Users', value: 'all' },
              ...Array.from(new Set(auditLogs.map(log => log.user))).map(user => ({
                label: user,
                value: user,
              }))
            ]}
          />
          <Select
            label="Status"
            labelHidden
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { label: 'All Status', value: 'all' },
              { label: 'Success', value: 'success' },
              { label: 'Failed', value: 'failed' },
              { label: 'Warning', value: 'warning' },
            ]}
          />
        </div>

        {/* Audit Log Entries */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e1e1e1' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>TIMESTAMP</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>USER</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>ACTION</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>TARGET</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>IP ADDRESS</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6d7175', fontSize: '12px' }}>DETAILS</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid #e1e1e1' }}>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm">{log.timestamp}</Text>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm" fontWeight="semibold">{log.user}</Text>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon source={getActionIcon(log.action)} size="small" />
                      <Text variant="bodySm">{log.action.replace('_', ' ')}</Text>
                    </div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm">{log.target}</Text>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm" tone="subdued">{log.ip}</Text>
                  </td>
                  <td style={{ padding: '12px' }}>
                    {getStatusBadge(log.status)}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Text variant="bodySm" tone="subdued">{log.details}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <Text variant="bodySm" tone="subdued">
            Showing {filteredLogs.length} of {auditLogs.length} log entries
          </Text>
          <Pagination label="1" hasNext hasPrevious />
        </div>
      </div>
    </Card>
  );
};

// System Configuration Component
const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    siteName: 'Company Dashboard',
    maintenanceMode: false,
    debugMode: false,
    emailNotifications: true,
    smsNotifications: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    twoFactorRequired: false,
  });

  const tabs = [
    { id: 'general', content: 'General', panelID: 'general-panel' },
    { id: 'security', content: 'Security', panelID: 'security-panel' },
    { id: 'notifications', content: 'Notifications', panelID: 'notifications-panel' },
    { id: 'integrations', content: 'Integrations', panelID: 'integrations-panel' },
  ];

  return (
    <Card>
      <div style={{ padding: '24px' }}>
        <Text variant="headingXl" as="h1">System Configuration</Text>

        <Tabs tabs={tabs} selected={activeTab} onSelect={setActiveTab}>
          <div style={{ marginTop: '24px' }}>
            {activeTab === 0 && (
              <FormLayout>
                <Text variant="headingLg" as="h2">General Settings</Text>

                <TextField
                  label="Site Name"
                  value={settings.siteName}
                  onChange={(value) => setSettings(prev => ({ ...prev, siteName: value }))}
                />

                <div style={{ display: 'flex', gap: '24px' }}>
                  <Checkbox
                    label="Maintenance Mode"
                    checked={settings.maintenanceMode}
                    onChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                    helpText="Enable to put the site in maintenance mode"
                  />
                  <Checkbox
                    label="Debug Mode"
                    checked={settings.debugMode}
                    onChange={(checked) => setSettings(prev => ({ ...prev, debugMode: checked }))}
                    helpText="Enable debugging features and logging"
                  />
                </div>

                <Banner status="warning">
                  <Text variant="bodySm">
                    <strong>Warning:</strong> Enabling maintenance mode will make your site inaccessible to regular users.
                  </Text>
                </Banner>
              </FormLayout>
            )}

            {activeTab === 1 && (
              <FormLayout>
                <Text variant="headingLg" as="h2">Security Settings</Text>

                <TextField
                  label="Session Timeout (minutes)"
                  type="number"
                  value={settings.sessionTimeout.toString()}
                  onChange={(value) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(value) || 30 }))}
                />

                <TextField
                  label="Max Login Attempts"
                  type="number"
                  value={settings.maxLoginAttempts.toString()}
                  onChange={(value) => setSettings(prev => ({ ...prev, maxLoginAttempts: parseInt(value) || 5 }))}
                />

                <TextField
                  label="Minimum Password Length"
                  type="number"
                  value={settings.passwordMinLength.toString()}
                  onChange={(value) => setSettings(prev => ({ ...prev, passwordMinLength: parseInt(value) || 8 }))}
                />

                <Checkbox
                  label="Require Two-Factor Authentication"
                  checked={settings.twoFactorRequired}
                  onChange={(checked) => setSettings(prev => ({ ...prev, twoFactorRequired: checked }))}
                  helpText="Require all users to enable two-factor authentication"
                />

                <Banner status="info">
                  <Text variant="bodySm">
                    <strong>Security Tip:</strong> Enable two-factor authentication to significantly improve account security.
                  </Text>
                </Banner>
              </FormLayout>
            )}

            {activeTab === 2 && (
              <FormLayout>
                <Text variant="headingLg" as="h2">Notification Settings</Text>

                <div style={{ display: 'flex', gap: '24px' }}>
                  <Checkbox
                    label="Email Notifications"
                    checked={settings.emailNotifications}
                    onChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                    helpText="Send notifications via email"
                  />
                  <Checkbox
                    label="SMS Notifications"
                    checked={settings.smsNotifications}
                    onChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                    helpText="Send notifications via SMS"
                  />
                </div>

                <div>
                  <Text variant="bodyMd" fontWeight="semibold">Notification Events</Text>
                  <div style={{ marginTop: '8px' }}>
                    {[
                      'User Registration',
                      'Password Reset',
                      'Failed Login Attempts',
                      'System Maintenance',
                      'Security Alerts',
                    ].map((event) => (
                      <div key={event} style={{ padding: '4px 0' }}>
                        <Checkbox label={event} defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              </FormLayout>
            )}

            {activeTab === 3 && (
              <FormLayout>
                <Text variant="headingLg" as="h2">Third-Party Integrations</Text>

                <div>
                  <Text variant="bodyMd" fontWeight="semibold">Connected Services</Text>
                  <div style={{ marginTop: '12px' }}>
                    {[
                      { name: 'Google Analytics', status: 'Connected', color: 'success' },
                      { name: 'Stripe Payment', status: 'Connected', color: 'success' },
                      { name: 'SendGrid Email', status: 'Disconnected', color: 'critical' },
                      { name: 'Slack Notifications', status: 'Connected', color: 'success' },
                    ].map((service) => (
                      <div key={service.name} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px',
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}>
                        <Text variant="bodyMd">{service.name}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Badge status={service.color as any}>{service.status}</Badge>
                          <Button size="small">
                            {service.status === 'Connected' ? 'Configure' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FormLayout>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <Button primary>Save Configuration</Button>
              <Button variant="plain">Reset to Defaults</Button>
            </div>
          </div>
        </Tabs>
      </div>
    </Card>
  );
};

// Stories
export const UserManagementStory: Story = {
  render: () => <UserManagement showPermissions showBulkOperations />,
};

export const RoleManagement: Story = {
  render: () => <RolePermissionManagement />,
};

export const AuditLogViewer: Story = {
  render: () => <AuditLog />,
};

export const SystemSettings: Story = {
  render: () => <SystemConfiguration />,
};

export const AdminDashboard: Story = {
  render: () => {
    const [activeSection, setActiveSection] = useState('overview');

    const navigationItems = [
      {
        label: 'Dashboard Overview',
        icon: AnalyticsMajor,
        id: 'overview',
      },
      {
        label: 'User Management',
        icon: CustomersMajor,
        id: 'users',
      },
      {
        label: 'Role & Permissions',
        icon: LockMajor,
        id: 'roles',
      },
      {
        label: 'Audit Log',
        icon: HistoryMajor,
        id: 'audit',
      },
      {
        label: 'System Settings',
        icon: SettingsMajor,
        id: 'settings',
      },
    ];

    const renderContent = () => {
      switch (activeSection) {
        case 'overview':
          return (
            <div>
              <Text variant="headingXl" as="h1">Admin Dashboard</Text>

              <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap="400" style={{ margin: '24px 0' }}>
                <Card>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Text variant="heading2xl" as="div">52</Text>
                    <Text variant="bodyMd" tone="subdued">Total Users</Text>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Text variant="heading2xl" as="div">5</Text>
                    <Text variant="bodyMd" tone="subdued">User Roles</Text>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Text variant="heading2xl" as="div">1,234</Text>
                    <Text variant="bodyMd" tone="subdued">Audit Entries</Text>
                  </div>
                </Card>
                <Card>
                  <div style={{ padding: '16px', textAlign: 'center' }}>
                    <Text variant="heading2xl" as="div">99.9%</Text>
                    <Text variant="bodyMd" tone="subdued">System Uptime</Text>
                  </div>
                </Card>
              </Grid>

              <Grid columns={{ xs: 1, lg: 2 }} gap="400">
                <Card>
                  <div style={{ padding: '16px' }}>
                    <Text variant="headingLg" as="h2">Recent Activity</Text>
                    <div style={{ marginTop: '16px' }}>
                      {auditLogs.slice(0, 5).map((log) => (
                        <div key={log.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 0',
                          borderBottom: '1px solid #e1e1e1'
                        }}>
                          <Text variant="bodySm">{log.action.replace('_', ' ')}</Text>
                          <Text variant="bodySm" tone="subdued">{log.timestamp.split(' ')[1]}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                <Card>
                  <div style={{ padding: '16px' }}>
                    <Text variant="headingLg" as="h2">System Health</Text>
                    <div style={{ marginTop: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <Text variant="bodySm">Database</Text>
                        <Badge status="success">Healthy</Badge>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <Text variant="bodySm">API Services</Text>
                        <Badge status="success">Operational</Badge>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <Text variant="bodySm">Email Service</Text>
                        <Badge status="warning">Degraded</Badge>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text variant="bodySm">Storage</Text>
                        <Badge status="success">78% Available</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid>
            </div>
          );
        case 'users':
          return <UserManagement showPermissions showBulkOperations />;
        case 'roles':
          return <RolePermissionManagement />;
        case 'audit':
          return <AuditLog />;
        case 'settings':
          return <SystemConfiguration />;
        default:
          return <div>Select a section</div>;
      }
    };

    return (
      <div style={{ display: 'flex', height: '80vh' }}>
        {/* Sidebar Navigation */}
        <div style={{ width: '250px', borderRight: '1px solid #e1e1e1', padding: '16px' }}>
          <Text variant="headingLg" as="h2" style={{ marginBottom: '24px' }}>Admin Panel</Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navigationItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: activeSection === item.id ? '#f8f8f8' : 'transparent',
                }}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon source={item.icon} size="small" />
                <Text variant="bodyMd">{item.label}</Text>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    );
  },
};

export const BulkUserOperations: Story = {
  render: () => {
    const [selectedOperation, setSelectedOperation] = useState('');
    const [operationModal, setOperationModal] = useState(false);

    const bulkOperations = [
      { id: 'activate', label: 'Activate Users', description: 'Activate selected user accounts', icon: EnableMajor, color: 'success' },
      { id: 'deactivate', label: 'Deactivate Users', description: 'Temporarily disable selected accounts', icon: DisableMajor, color: 'warning' },
      { id: 'suspend', label: 'Suspend Users', description: 'Suspend selected user accounts', icon: LockMajor, color: 'critical' },
      { id: 'export', label: 'Export Users', description: 'Export selected user data', icon: ExportMinor, color: 'info' },
      { id: 'import', label: 'Import Users', description: 'Import users from CSV file', icon: ImportMinor, color: 'info' },
      { id: 'delete', label: 'Delete Users', description: 'Permanently delete selected accounts', icon: DeleteMinor, color: 'critical' },
    ];

    return (
      <Card>
        <div style={{ padding: '24px' }}>
          <Text variant="headingXl" as="h1">Bulk User Operations</Text>
          <Text variant="bodyMd" tone="subdued" style={{ marginBottom: '24px' }}>
            Perform operations on multiple users at once
          </Text>

          <Grid columns={{ xs: 1, sm: 2, lg: 3 }} gap="400">
            {bulkOperations.map((operation) => (
              <div
                key={operation.id}
                style={{
                  padding: '20px',
                  border: '1px solid #e1e1e1',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => {
                  setSelectedOperation(operation.id);
                  setOperationModal(true);
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#202223';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e1e1e1';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: operation.color === 'success' ? '#e8f8e8' :
                                       operation.color === 'warning' ? '#fff8e8' :
                                       operation.color === 'critical' ? '#ffe8e8' : '#e8f0ff',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon source={operation.icon} size="small" />
                  </div>
                  <Text variant="bodyMd" fontWeight="semibold">{operation.label}</Text>
                </div>
                <Text variant="bodySm" tone="subdued">{operation.description}</Text>
              </div>
            ))}
          </Grid>

          <Banner status="warning" style={{ marginTop: '24px' }}>
            <Text variant="bodySm">
              <strong>Important:</strong> Bulk operations cannot be undone. Please double-check your selections before proceeding.
            </Text>
          </Banner>
        </div>
      </Card>
    );
  },
};