import type { Meta, StoryObj } from '@storybook/react';
import { Icon, InlineStack, Card, Button, Text } from '@shopify/polaris';
import {
  AlertMajor,
  ArrowDownMinor,
  ArrowLeftMinor,
  ArrowRightMinor,
  ArrowUpMinor,
  BellMajor,
  CalendarMinor,
  CancelSmallMinor,
  CheckmarkMinor,
  ChevronDownMinor,
  ChevronLeftMinor,
  ChevronRightMinor,
  ChevronUpMinor,
  CircleInformationMajor,
  ClockMajor,
  CreditCardMajor,
  CustomersMajor,
  DeleteMinor,
  DisputeMajor,
  DraftOrderMajor,
  EditMinor,
  EmailMajor,
  ExportMinor,
  ExternalSmallMinor,
  FaxMajor,
  FraudProtectMajor,
  GearMajor,
  GlobeMajor,
  HomeMajor,
  HorizontalDotsMinor,
  ImportMinor,
  InventoryMajor,
  LocationMajor,
  LockMajor,
  LogOutMinor,
  MailMajor,
  MobileMajor,
  MobileMajorTwotone,
  MoneyMajor,
  NoteMinor,
  OrdersMajor,
  PackageMajor,
  PaymentMajor,
  PhoneMajor,
  PlusMinor,
  PrintMajor,
  ProductsMajor,
  QuestionMarkMajor,
  RefreshMinor,
  RevertMinor,
  RiskMajor,
  SearchMinor,
  SecurityMajor,
  SettingsMajor,
  ShippingMajor,
  ShopMajor,
  StarFilledMinor,
  StarOutlineMinor,
  StatisticsMajor,
  TaxesMajor,
  TickSmallMinor,
  TransferMajor,
  TrashMajor,
  TrendingDownMajor,
  TrendingUpMajor,
  TriggerMinor,
  ViewMajor,
  WarningMinor,
  XSmallMinor,
} from '@shopify/polaris-icons';
import React from 'react';

const meta = {
  title: 'Polaris/Utilities/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Icons are symbolic images used to represent an action, object, or concept. They provide visual context and help users quickly understand the purpose of interface elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    source: {
      control: 'select',
      options: [
        'AlertMajor', 'ArrowDownMinor', 'ArrowLeftMinor', 'ArrowRightMinor', 'ArrowUpMinor',
        'BellMajor', 'CalendarMinor', 'CancelSmallMinor', 'CheckmarkMinor', 'ChevronDownMinor',
        'ChevronLeftMinor', 'ChevronRightMinor', 'ChevronUpMinor', 'CircleInformationMajor', 'ClockMajor',
        'CreditCardMajor', 'CustomersMajor', 'DeleteMinor', 'DisputeMajor', 'DraftOrderMajor',
        'EditMinor', 'EmailMajor', 'ExportMinor', 'ExternalSmallMinor', 'FaxMajor',
        'FraudProtectMajor', 'GearMajor', 'GlobeMajor', 'HomeMajor', 'HorizontalDotsMinor',
        'ImportMinor', 'InventoryMajor', 'LocationMajor', 'LockMajor', 'LogOutMinor',
        'MailMajor', 'MobileMajor', 'MobileMajorTwotone', 'MoneyMajor', 'NoteMinor',
        'OrdersMajor', 'PackageMajor', 'PaymentMajor', 'PhoneMajor', 'PlusMinor',
        'PrintMajor', 'ProductsMajor', 'QuestionMarkMajor', 'RefreshMinor', 'RevertMinor',
        'RiskMajor', 'SearchMinor', 'SecurityMajor', 'SettingsMajor', 'ShippingMajor',
        'ShopMajor', 'StarFilledMinor', 'StarOutlineMinor', 'StatisticsMajor', 'TaxesMajor',
        'TickSmallMinor', 'TransferMajor', 'TrashMajor', 'TrendingDownMajor', 'TrendingUpMajor',
        'TriggerMinor', 'ViewMajor', 'WarningMinor', 'XSmallMinor'
      ],
      description: 'Icon source',
    },
    color: {
      control: 'select',
      options: ['base', 'critical', 'highlight', 'success', 'warning', 'subdued', 'interactive'],
      description: 'Icon color',
    },
    backdrop: {
      control: 'boolean',
      description: 'Add background circle',
    },
    tone: {
      control: 'select',
      options: ['base', 'critical', 'highlight', 'success', 'warning', 'subdued'],
      description: 'Icon tone for backdrops',
    },
    accessibilityLabel: {
      control: 'text',
      description: 'Accessibility label for screen readers',
    },
  },
} satisfies Meta<typeof Icon>;

const iconMap = {
  AlertMajor, ArrowDownMinor, ArrowLeftMinor, ArrowRightMinor, ArrowUpMinor,
  BellMajor, CalendarMinor, CancelSmallMinor, CheckmarkMinor, ChevronDownMinor,
  ChevronLeftMinor, ChevronRightMinor, ChevronUpMinor, CircleInformationMajor, ClockMajor,
  CreditCardMajor, CustomersMajor, DeleteMinor, DisputeMajor, DraftOrderMajor,
  EditMinor, EmailMajor, ExportMinor, ExternalSmallMinor, FaxMajor,
  FraudProtectMajor, GearMajor, GlobeMajor, HomeMajor, HorizontalDotsMinor,
  ImportMinor, InventoryMajor, LocationMajor, LockMajor, LogOutMinor,
  MailMajor, MobileMajor, MobileMajorTwotone, MoneyMajor, NoteMinor,
  OrdersMajor, PackageMajor, PaymentMajor, PhoneMajor, PlusMinor,
  PrintMajor, ProductsMajor, QuestionMarkMajor, RefreshMinor, RevertMinor,
  RiskMajor, SearchMinor, SecurityMajor, SettingsMajor, ShippingMajor,
  ShopMajor, StarFilledMinor, StarOutlineMinor, StatisticsMajor, TaxesMajor,
  TickSmallMinor, TransferMajor, TrashMajor, TrendingDownMajor, TrendingUpMajor,
  TriggerMinor, ViewMajor, WarningMinor, XSmallMinor
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    source: HomeMajor,
  },
};

export const BasicIcons: Story = {
  render: () => (
    <InlineStack gap="400" wrap={false}>
      <Icon source={HomeMajor} />
      <Icon source={SettingsMajor} />
      <Icon source={OrdersMajor} />
      <Icon source={CustomersMajor} />
      <Icon source={ProductsMajor} />
    </InlineStack>
  ),
};

export const IconSizes: Story = {
  render: () => {
    const sizes = [
      { name: 'Extra Small', scale: 0.5 },
      { name: 'Small', scale: 0.75 },
      { name: 'Medium', scale: 1 },
      { name: 'Large', scale: 1.5 },
      { name: 'Extra Large', scale: 2 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {sizes.map(({ name, scale }) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '120px', fontSize: "var(--font-size-sm)" }}>{name}</div>
            <InlineStack gap="200">
              <Icon source={HomeMajor} style={{ transform: `scale(${scale})` }} />
              <Icon source={SettingsMajor} style={{ transform: `scale(${scale})` }} />
              <Icon source={OrdersMajor} style={{ transform: `scale(${scale})` }} />
            </InlineStack>
          </div>
        ))}
      </div>
    );
  },
};

export const ColoredIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text as="h4" variant="headingSm">Color Variants</Text>
        <InlineStack gap="400">
          <Icon source={CheckmarkMinor} color="success" />
          <Icon source={WarningMinor} color="warning" />
          <Icon source={CancelSmallMinor} color="critical" />
          <Icon source={AlertMajor} color="highlight" />
          <Icon source={InfoIcon} color="base" />
          <Icon source={ClockMajor} color="subdued" />
          <Icon source={EditMinor} color="interactive" />
        </InlineStack>
      </div>
    </div>
  ),
};

export const WithBackdrops: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text as="h4" variant="headingSm">Icon Backdrops</Text>
        <InlineStack gap="400">
          <Icon source={CheckmarkMinor} backdrop color="success" />
          <Icon source={WarningMinor} backdrop tone="warning" />
          <Icon source={CancelSmallMinor} backdrop tone="critical" />
          <Icon source={InfoIcon} backdrop tone="info" />
          <Icon source={StarFilledMinor} backdrop tone="highlight" />
        </InlineStack>
      </div>
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text as="h4" variant="headingSm">Directional Icons</Text>
        <InlineStack gap="200">
          <Icon source={ChevronLeftMinor} />
          <Icon source={ChevronUpMinor} />
          <Icon source={ChevronRightMinor} />
          <Icon source={ChevronDownMinor} />
        </InlineStack>
      </div>
      <div>
        <Text as="h4" variant="headingSm">Arrow Icons</Text>
        <InlineStack gap="200">
          <Icon source={ArrowLeftMinor} />
          <Icon source={ArrowUpMinor} />
          <Icon source={ArrowRightMinor} />
          <Icon source={ArrowDownMinor} />
        </InlineStack>
      </div>
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text as="h4" variant="headingSm">Common Actions</Text>
        <InlineStack gap="400">
          <Icon source={EditMinor} color="interactive" />
          <Icon source={DeleteMinor} color="critical" />
          <Icon source={PlusMinor} />
          <Icon source={SearchMinor} />
          <Icon source={RefreshMinor} />
          <Icon source={ExternalSmallMinor} />
        </InlineStack>
      </div>
      <div>
        <Text as="h4" variant="headingSm">Status Actions</Text>
        <InlineStack gap="400">
          <Icon source={CheckmarkMinor} color="success" />
          <Icon source={CancelSmallMinor} color="critical" />
          <Icon source={WarningMinor} color="warning" />
          <Icon source={QuestionMarkMajor} />
        </InlineStack>
      </div>
    </div>
  ),
};

export const BusinessIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <Text as="h4" variant="headingSm">Commerce</Text>
        <InlineStack gap="400">
          <Icon source={ShopMajor} />
          <Icon source={OrdersMajor} />
          <Icon source={ProductsMajor} />
          <Icon source={CustomersMajor} />
          <Icon source={InventoryMajor} />
        </InlineStack>
      </div>
      <div>
        <Text as="h4" variant="headingSm">Financial</Text>
        <InlineStack gap="400">
          <Icon source={PaymentMajor} />
          <Icon source={CreditCardMajor} />
          <Icon source={MoneyMajor} />
          <Icon source={TaxesMajor} />
          <Icon source={StatisticsMajor} />
        </InlineStack>
      </div>
      <div>
        <Text as="h4" variant="headingSm">Operations</Text>
        <InlineStack gap="400">
          <Icon source={ShippingMajor} />
          <Icon source={PackageMajor} />
          <Icon source={LocationMajor} />
          <Icon source={PrintMajor} />
        </InlineStack>
      </div>
    </div>
  ),
};

export const InteractiveIcons: Story = {
  render: () => {
    const [isStarred, setIsStarred] = React.useState(false);
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
      <Card sectioned>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <Text as="h3" variant="headingMd">Interactive Icon Examples</Text>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsStarred(!isStarred)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--p-color-bg-surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Icon
                source={isStarred ? StarFilledMinor : StarOutlineMinor}
                color={isStarred ? 'highlight' : 'subdued'}
              />
              <Text>{isStarred ? 'Starred' : 'Star'}</Text>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--p-color-bg-surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Icon
                source={isExpanded ? ChevronUpMinor : ChevronDownMinor}
              />
              <Text>{isExpanded ? 'Collapse' : 'Expand'}</Text>
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => setIsLoading(false), 2000);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--p-color-bg-surface-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Icon
                source={isLoading ? HorizontalDotsMinor : RefreshMinor}
                style={{ animation: isLoading ? 'spin 1s linear infinite' : 'none' }}
              />
              <Text>{isLoading ? 'Loading...' : 'Refresh'}</Text>
            </button>
          </div>

          {isExpanded && (
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--p-color-bg-surface-subdued)',
              borderRadius: '4px',
              marginTop: '8px'
            }}>
              <Text as="p" variant="bodyMd">
                This content is now visible because the expand icon was clicked.
                Icons can be used to toggle visibility of content.
              </Text>
            </div>
          )}
        </div>
      </Card>
    );
  },
};

export const StatusIndicators: Story = {
  render: () => {
    const statuses = [
      { icon: CheckmarkMinor, color: 'success', label: 'Completed', tone: 'success' },
      { icon: ClockMajor, color: 'warning', label: 'In Progress', tone: 'warning' },
      { icon: AlertMajor, color: 'critical', label: 'Attention Required', tone: 'critical' },
      { icon: CircleInformationMajor, color: 'base', label: 'Information', tone: 'base' },
    ];

    return (
      <Card sectioned>
        <Text as="h3" variant="headingMd" tone="base">Status Indicators</Text>
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {statuses.map(({ icon, color, label, tone }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Icon source={icon} color={color} backdrop tone={tone} />
              <Text>{label}</Text>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

export const IconAccessibility: Story = {
  render: () => (
    <Card sectioned>
      <Text as="h3" variant="headingMd">Accessible Icons</Text>
      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon source={AlertMajor} color="critical" accessibilityLabel="Critical alert" />
          <Text as="p" variant="bodyMd">Alert with accessibility label</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon source={SettingsMajor} accessibilityLabel="Settings menu" />
          <Text as="p" variant="bodyMd">Settings with descriptive label</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon source={ExternalSmallMinor} accessibilityLabel="Opens in new window" />
          <Text as="p" variant="bodyMd">External link indicator</Text>
        </div>
      </div>
    </Card>
  ),
};

export const IconGrid: Story = {
  render: () => {
    const iconCategories = [
      { name: 'Navigation', icons: [HomeMajor, ArrowLeftMinor, ArrowRightMinor, ChevronUpMinor, ChevronDownMinor] },
      { name: 'Actions', icons: [EditMinor, DeleteMinor, PlusMinor, SearchMinor, RefreshMinor] },
      { name: 'Status', icons: [CheckmarkMinor, WarningMinor, CancelSmallMinor, AlertMajor, ClockMajor] },
      { name: 'Business', icons: [ShopMajor, OrdersMajor, ProductsMajor, CustomersMajor, PaymentMajor] },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px' }}>
        {iconCategories.map(({ name, icons }) => (
          <div key={name}>
            <Text as="h4" variant="headingSm">{name}</Text>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
              gap: '12px',
              marginTop: '8px'
            }}>
              {icons.map((icon, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px',
                    border: '1px solid var(--p-color-border)',
                    borderRadius: '4px'
                  }}
                >
                  <Icon source={icon} />
                  <Text as="span" variant="bodySm" tone="subdued">
                    {icon.name.replace(/Major|Minor|Twotone/, '')}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// Helper icon for examples
const InfoIcon = CircleInformationMajor;