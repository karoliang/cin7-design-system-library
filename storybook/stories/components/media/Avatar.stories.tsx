import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Text, InlineStack, Card, Badge } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatars are used to represent a person, object, or entity in a compact visual form. They can display images, initials, or icons and come in various sizes. Avatars are commonly used for user profiles, customer lists, and any interface that needs to represent entities visually.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['extraSmall', 'small', 'medium', 'large', 'extraLarge'],
      description: 'Avatar size',
    },
    name: {
      control: 'text',
      description: 'Name for accessibility and initials',
    },
    source: {
      control: 'text',
      description: 'Image URL or icon source',
    },
    initials: {
      control: 'text',
      description: 'Custom initials text',
    },
    customer: {
      control: 'boolean',
      description: 'Use customer avatar styling',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Custom accessibility label',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'medium',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar size="extraSmall" name="John Doe" />
        <Text variant="bodySm" color="subdued">Extra Small</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar size="small" name="John Doe" />
        <Text variant="bodySm" color="subdued">Small</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar size="medium" name="John Doe" />
        <Text variant="bodySm" color="subdued">Medium</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar size="large" name="John Doe" />
        <Text variant="bodySm" color="subdued">Large</Text>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <Avatar size="extraLarge" name="John Doe" />
        <Text variant="bodySm" color="subdued">Extra Large</Text>
      </div>
    </div>
  ),
};

export const WithImages: Story = {
  render: () => (
    <Card padding="400">
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Avatar
          size="large"
          source="https://picsum.photos/seed/user1/100/100.jpg"
          name="John Doe"
        />
        <div>
          <Text variant="headingMd" as="h3">John Doe</Text>
          <Text color="subdued">john.doe@example.com</Text>
        </div>
      </div>
    </Card>
  ),
};

export const CustomerAvatars: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar customer size="medium" name="John Smith" />
        <div>
          <Text variant="bodyMd" fontWeight="medium">John Smith</Text>
          <Text color="subdued">Premium Customer</Text>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar customer size="medium" name="Jane Johnson" />
        <div>
          <Text variant="bodyMd" fontWeight="medium">Jane Johnson</Text>
          <Text color="subdued">New Customer</Text>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Avatar customer size="medium" name="Bob Williams" />
        <div>
          <Text variant="bodyMd" fontWeight="medium">Bob Williams</Text>
          <Text color="subdued">Regular Customer</Text>
        </div>
      </div>
    </div>
  ),
};

export const Initials: Story = {
  render: () => {
    const names = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Bob Williams',
      'Charlie Brown',
      'Diana Prince',
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Text variant="headingMd" as="h3">Initials from Names</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {names.map((name, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <Avatar size="large" name={name} />
              <Text variant="bodySm" as="p">{name}</Text>
            </div>
          ))}
        </div>

        <Text variant="headingMd" as="h3" style={{ marginTop: '24px' }}>Custom Initials</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="large" initials="JD" />
            <Text variant="bodySm" as="p">JD</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="large" initials="ABC" />
            <Text variant="bodySm" as="p">ABC</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="large" initials="1" />
            <Text variant="bodySm" as="p">Number 1</Text>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <Avatar size="large" initials="😊" />
            <Text variant="bodySm" as="p">Emoji</Text>
          </div>
        </div>
      </div>
    );
  },
};

export const UserStatus: Story = {
  render: () => {
    const users = [
      { name: 'John Doe', status: 'online', lastSeen: 'Active now' },
      { name: 'Jane Smith', status: 'away', lastSeen: 'Away from desk' },
      { name: 'Bob Johnson', status: 'offline', lastSeen: 'Last seen 2 hours ago' },
      { name: 'Alice Wilson', status: 'busy', lastSeen: 'In a meeting' },
    ];

    const getStatusIndicator = (status: string) => {
      const colors = {
        online: '#2a6f3a',
        away: '#e4930d',
        offline: '#637381',
        busy: '#d72c0d',
      };

      return (
        <div
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: colors[status as keyof typeof colors],
            border: '2px solid white',
            position: 'absolute',
            bottom: '0',
            right: '0',
          }}
        />
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Text variant="headingMd" as="h3">User Status Indicators</Text>
        {users.map((user, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <Avatar
                size="large"
                source={`https://picsum.photos/seed/${user.name}/100/100.jpg`}
                name={user.name}
              />
              {getStatusIndicator(user.status)}
            </div>
            <div>
              <Text variant="bodyMd" fontWeight="medium">{user.name}</Text>
              <Text color="subdued" variant="bodySm">{user.lastSeen}</Text>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const TeamAvatars: Story = {
  render: () => {
    const teamMembers = [
      { name: 'Sarah Chen', role: 'Product Manager', avatar: 'https://picsum.photos/seed/sarah/50/50.jpg' },
      { name: 'Mike Rodriguez', role: 'Developer', avatar: 'https://picsum.photos/seed/mike/50/50.jpg' },
      { name: 'Emma Wilson', role: 'Designer', avatar: 'https://picsum.photos/seed/emma/50/50.jpg' },
      { name: 'Alex Kumar', role: 'Marketing', avatar: 'https://picsum.photos/seed/alex/50/50.jpg' },
    ];

    return (
      <Card padding="400">
        <Text variant="headingMd" as="h3" style={{ marginBottom: '16px' }}>Team Members</Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {teamMembers.map((member, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Avatar size="medium" source={member.avatar} name={member.name} />
              <div>
                <Text variant="bodyMd" fontWeight="medium">{member.name}</Text>
                <Text color="subdued" variant="bodySm">{member.role}</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

export const AvatarGroup: Story = {
  render: () => {
    const users = [
      { name: 'John Doe', initials: 'JD', color: '#637381' },
      { name: 'Jane Smith', initials: 'JS', color: '#2a6f3a' },
      { name: 'Bob Johnson', initials: 'BJ', color: '#d72c0d' },
      { name: 'Alice Wilson', initials: 'AW', color: '#e4930d' },
      { name: 'Charlie Brown', initials: 'CB', color: '#6f42c1' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Avatar Groups</Text>

        <div>
          <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>Compact Group</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {users.map((user, index) => (
              <div
                key={index}
                style={{
                  marginLeft: index > 0 ? '-8px' : '0',
                  border: '2px solid white',
                  borderRadius: '50%',
                }}
              >
                <Avatar
                  size="small"
                  name={user.name}
                  initials={user.initials}
                  style={{ backgroundColor: user.color }}
                />
              </div>
            ))}
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: '2px solid white',
                marginLeft: '-8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text variant="bodySm" fontWeight="medium">+3</Text>
            </div>
          </div>
        </div>

        <div>
          <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>Large Group</Text>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {users.map((user, index) => (
              <div
                key={index}
                style={{
                  marginLeft: index > 0 ? '-12px' : '0',
                  border: '3px solid white',
                  borderRadius: '50%',
                }}
              >
                <Avatar
                  size="medium"
                  name={user.name}
                  initials={user.initials}
                />
              </div>
            ))}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: '3px solid white',
                marginLeft: '-12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text variant="bodyMd" fontWeight="medium">+8</Text>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const BrandAvatars: Story = {
  render: () => {
    const brands = [
      { name: 'Cin7', color: '#007ace' },
      { name: 'Shopify', color: '#95bf47' },
      { name: 'Amazon', color: '#ff9900' },
      { name: 'Etsy', color: '#f1641e' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Brand/Company Avatars</Text>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {brands.map((brand, index) => (
            <Card key={index} padding="400">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Avatar
                  size="large"
                  name={brand.name}
                  initials={brand.name.substring(0, 2)}
                  style={{ backgroundColor: brand.color }}
                />
                <div>
                  <Text variant="bodyMd" fontWeight="medium">{brand.name}</Text>
                  <Badge status="info">Partner</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => {
    const users = [
      { name: 'John Doe', role: 'Admin', badge: 'success', initials: 'JD' },
      { name: 'Jane Smith', role: 'Editor', badge: 'attention', initials: 'JS' },
      { name: 'Bob Johnson', role: 'Viewer', badge: 'info', initials: 'BJ' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Text variant="headingMd" as="h3">Users with Role Badges</Text>
        {users.map((user, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Avatar size="large" name={user.name} initials={user.initials} />
            <div>
              <Text variant="bodyMd" fontWeight="medium">{user.name}</Text>
              <Badge status={user.badge as any}>{user.role}</Badge>
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [selectedUser, setSelectedUser] = React.useState<string | null>(null);

    const users = [
      { name: 'John Doe', email: 'john@example.com', initials: 'JD' },
      { name: 'Jane Smith', email: 'jane@example.com', initials: 'JS' },
      { name: 'Bob Johnson', email: 'bob@example.com', initials: 'BJ' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Text variant="headingMd" as="h3">Select a User</Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {users.map((user) => (
            <div
              key={user.name}
              onClick={() => setSelectedUser(user.name)}
              style={{
                padding: '16px',
                border: `2px solid ${selectedUser === user.name ? '#007ace' : '#e1e1e1'}`,
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: selectedUser === user.name ? '#f3f9ff' : 'white',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Avatar size="medium" name={user.name} initials={user.initials} />
                <div>
                  <Text variant="bodyMd" fontWeight="medium">{user.name}</Text>
                  <Text color="subdued" variant="bodySm">{user.email}</Text>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedUser && (
          <Card padding="400" style={{ backgroundColor: '#f3f9ff', border: '2px solid #007ace' }}>
            <Text variant="bodyMd" fontWeight="medium">
              Selected: {selectedUser}
            </Text>
          </Card>
        )}
      </div>
    );
  },
};

export const Accessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Accessibility Examples</Text>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>
          With Custom Accessibility Labels
        </Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar
            size="large"
            name="John Doe"
            accessibilityLabel="User John Doe, Administrator"
          />
          <Avatar
            size="large"
            name="Jane Smith"
            source="https://picsum.photos/seed/jane/100/100.jpg"
            accessibilityLabel="User Jane Smith, Editor, Profile photo"
          />
          <Avatar
            size="large"
            initials="CS"
            accessibilityLabel="Customer Support representative"
          />
        </div>
      </Card>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>
          Screen Reader Friendly Descriptions
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar
              size="medium"
              name="Sarah Chen"
              accessibilityLabel="Sarah Chen, Product Manager, Currently online"
            />
            <Text variant="bodySm">Sarah Chen - Product Manager</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Avatar
              size="medium"
              name="Mike Rodriguez"
              accessibilityLabel="Mike Rodriguez, Developer, Away from desk"
            />
            <Text variant="bodySm">Mike Rodriguez - Developer</Text>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const ErrorAndLoading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Text variant="headingMd" as="h3">Edge Cases</Text>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>
          Broken Image Fallback
        </Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar
            size="large"
            name="John Doe"
            source="https://invalid-url.com/image.jpg"
          />
          <div>
            <Text variant="bodyMd" fontWeight="medium">John Doe</Text>
            <Text color="subdued" variant="bodySm">Falls back to initials</Text>
          </div>
        </div>
      </Card>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>
          Special Characters
        </Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar size="large" name="José María" />
          <Avatar size="large" name="张三" />
          <Avatar size="large" name="Олег Петров" />
          <Avatar size="large" name="Muhammad Ali" />
        </div>
      </Card>

      <Card padding="400">
        <Text variant="bodyMd" fontWeight="medium" style={{ marginBottom: '12px' }}>
          Very Long Names
        </Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Avatar size="medium" name="VeryLongFirstName VeryLongLastName" />
          <div>
            <Text variant="bodySm">Handles long names gracefully</Text>
          </div>
        </div>
      </Card>
    </div>
  ),
};