import type { Meta, StoryObj } from '@storybook/react';
import {
  AppProvider,
  Card,
  Button,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Page,
  Layout,
  Modal,
  Toast,
  Frame,
  TopBar,
} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Providers/AppProvider',
  component: AppProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'AppProvider provides global context and theme configuration for Polaris applications. It manages i18n translations, theme customization, and global component behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    i18n: {
      control: 'object',
      description: 'Internationalization configuration',
    },
    theme: {
      control: 'object',
      description: 'Theme configuration and customization',
    },
    linkComponent: {
      control: 'object',
      description: 'Custom link component for routing',
    },
    children: {
      control: 'object',
      description: 'Child components that will receive the context',
    },
  },
} satisfies Meta<typeof AppProvider>;

export default meta;
type Story = StoryObj<typeof AppProvider>;

const customI18n = {
  Polaris: {
    Common: {
      checkbox: '同意',
      undo: '撤销',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      add: '添加',
      remove: '移除',
      edit: '编辑',
      close: '关闭',
      search: '搜索',
      loading: '加载中...',
      more: '更多',
      less: '更少',
    },
    Button: {
      disabled: '按钮已禁用',
      undo: '撤销操作',
      save: '保存更改',
    },
    Modal: {
      close: '关闭对话框',
    },
    Toast: {
      success: '成功',
      error: '错误',
      warning: '警告',
      info: '信息',
    },
    TextField: {
      characterCount: '{count}/{limit} 字符',
      clearButton: '清除',
    },
  },
};

const darkTheme = {
  colors: {
    surface: '#1a1a1a',
    onSurface: '#ffffff',
    interactive: '#ffffff',
    decorative: '#4a4a4a',
    subText: '#a0a0a0',
    border: '#333333',
    background: '#000000',
    backgroundHovered: '#2a2a2a',
    backgroundPressed: '#3a3a3a',
    backgroundSelected: '#4a4a4a',
    borderHovered: '#555555',
    borderDisabled: '#2a2a2a',
    shadow: 'rgba(0, 0, 0, 0.3)',
    icon: '#ffffff',
    iconDisabled: '#666666',
    iconOnSurface: '#ffffff',
    text: '#ffffff',
    textDisabled: '#666666',
    textOnSurface: '#ffffff',
    critical: '#ff6b6b',
    warning: '#ffa726',
    highlight: '#42a5f5',
    success: '#66bb6a',
    primary: '#42a5f5',
    secondary: '#7e57c2',
  },
  logo: {
    light: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
    dark: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
  },
};

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    const [toastActive, setToastActive] = useState(false);
    const [count, setCount] = useState(0);

    const toggleModal = useCallback(() => setActive((active) => !active), []);
    const toggleToast = useCallback(() => setToastActive((active) => !active), []);

    const modalActivator = <Button onClick={toggleModal}>Open Modal</Button>;
    const toastActivator = <Button onClick={toggleToast}>Show Toast</Button>;

    return (
      <AppProvider i18n={{}}>
        <div style={{ padding: '24px', width: '600px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd" as="h2">Default AppProvider</Text>
                <Text>
                  This is the default Polaris AppProvider with standard English translations.
                </Text>
                <InlineStack gap="12px">
                  {modalActivator}
                  {toastActivator}
                </InlineStack>
                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <Text variant="bodySm">
                    Counter: {count}
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <Button size="small" onClick={() => setCount(count + 1)}>
                      Increment
                    </Button>
                  </div>
                </div>
              </BlockStack>
            </div>
          </Card>

          <Modal
            activator={modalActivator}
            open={active}
            onClose={toggleModal}
            title="Default Theme Modal"
            primaryAction={{
              content: 'Save',
              onAction: toggleModal,
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: toggleModal,
              },
            ]}
          >
            <Modal.Section>
              <Text>
                This modal uses the default Polaris theme and i18n configuration.
                All text is in English and uses standard colors.
              </Text>
            </Modal.Section>
          </Modal>

          {toastActive && (
            <Toast
              content="This is a default toast notification"
              onDismiss={toggleToast}
            />
          )}
        </div>
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'default'),
  },

};

export const WithCustomI18n: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    const [toastActive, setToastActive] = useState(false);

    const toggleModal = useCallback(() => setActive((active) => !active), []);
    const toggleToast = useCallback(() => setToastActive((active) => !active), []);

    const modalActivator = <Button onClick={toggleModal}>打开对话框</Button>;
    const toastActivator = <Button onClick={toggleToast}>显示提示</Button>;

    return (
      <AppProvider i18n={customI18n}>
        <div style={{ padding: '24px', width: '600px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd" as="h2">自定义中文界面</Text>
                <Text>
                  这是使用自定义中文翻译的 AppProvider。所有按钮和文本都显示为中文。
                </Text>
                <InlineStack gap="12px">
                  {modalActivator}
                  {toastActivator}
                </InlineStack>
                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <Text variant="bodySm">
                    自定义翻译包括：按钮文本、模态框、提示信息等
                  </Text>
                </div>
              </BlockStack>
            </div>
          </Card>

          <Modal
            activator={modalActivator}
            open={active}
            onClose={toggleModal}
            title="中文主题模态框"
            primaryAction={{
              content: '保存',
              onAction: toggleModal,
            }}
            secondaryActions={[
              {
                content: '取消',
                onAction: toggleModal,
              },
            ]}
          >
            <Modal.Section>
              <Text>
                这个模态框使用自定义的中文翻译。所有的按钮和文本都显示为中文。
              </Text>
            </Modal.Section>
          </Modal>

          {toastActive && (
            <Toast
              content="这是一个中文提示通知"
              onDismiss={toggleToast}
            />
          )}
        </div>
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'with-custom-i18n'),
  },

};

export const WithCustomTheme: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    const [toastActive, setToastActive] = useState(false);

    const toggleModal = useCallback(() => setActive((active) => !active), []);
    const toggleToast = useCallback(() => setToastActive((active) => !active), []);

    const modalActivator = <Button onClick={toggleModal}>Dark Theme Modal</Button>;
    const toastActivator = <Button onClick={toggleToast}>Show Toast</Button>;

    return (
      <AppProvider theme={darkTheme}>
        <div style={{ padding: '24px', width: '600px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd" as="h2">Dark Theme Interface</Text>
                <Text>
                  This interface uses a custom dark theme with inverted colors and dark backgrounds.
                </Text>
                <InlineStack gap="12px">
                  {modalActivator}
                  {toastActivator}
                </InlineStack>
                <div style={{ padding: '12px', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
                  <Text variant="bodySm">
                    Dark theme colors are applied throughout the interface.
                  </Text>
                </div>
              </BlockStack>
            </div>
          </Card>

          <Modal
            activator={modalActivator}
            open={active}
            onClose={toggleModal}
            title="Dark Theme Modal"
            primaryAction={{
              content: 'Save',
              onAction: toggleModal,
            }}
            secondaryActions={[
              {
                content: 'Cancel',
                onAction: toggleModal,
              },
            ]}
          >
            <Modal.Section>
              <Text>
                This modal uses the dark theme configuration with custom colors
                for backgrounds, text, and interactive elements.
              </Text>
            </Modal.Section>
          </Modal>

          {toastActive && (
            <Toast
              content="Dark theme toast notification"
              onDismiss={toggleToast}
            />
          )}
        </div>
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'with-custom-theme'),
  },

};

export const WithCustomLinkComponent: Story = {
  render: () => {
    const CustomLink = ({ children, url, ...rest }: any) => {
      const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Custom link clicked:', url);
        alert(`Custom link to: ${url}`);
      };

      return (
        <a
          href={url}
          onClick={handleClick}
          style={{
            color: '#5c6ac4',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          {...rest}
        >
          {children}
        </a>
      );
    };

    return (
      <AppProvider
        i18n={{}}
        linkComponent={CustomLink}
      >
        <div style={{ padding: '24px', width: '600px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd" as="h2">Custom Link Component</Text>
                <Text>
                  This AppProvider uses a custom link component for all internal links.
                  Click the link below to see the custom behavior.
                </Text>
                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <Text>
                    <CustomLink url="/custom-route">
                      This is a custom link component
                    </CustomLink>
                  </Text>
                </div>
                <Text variant="bodySm" color="subdued">
                  The custom link component intercepts all link clicks and provides
                  custom routing behavior instead of default browser navigation.
                </Text>
              </BlockStack>
            </div>
          </Card>
        </div>
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'with-custom-link'),
  },

};

export const NestedProviders: Story = {
  render: () => {
    const [outerTheme, setOuterTheme] = useState('default');
    const [innerTheme, setInnerTheme] = useState('default');

    const toggleOuterTheme = () => {
      setOuterTheme(outerTheme === 'default' ? 'dark' : 'default');
    };

    const toggleInnerTheme = () => {
      setInnerTheme(innerTheme === 'default' ? 'dark' : 'default');
    };

    return (
      <AppProvider theme={outerTheme === 'dark' ? darkTheme : {}}>
        <div style={{ padding: '24px', width: '700px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd" as="h2">Nested AppProviders</Text>
                <Text>
                  This demonstrates nested AppProvider instances with different theme configurations.
                </Text>
                <Button onClick={toggleOuterTheme}>
                  Toggle Outer Theme ({outerTheme})
                </Button>
              </BlockStack>
            </div>
          </Card>

          <div style={{ marginTop: '24px', padding: '24px', border: '2px dashed #e1e3e5', borderRadius: '4px' }}>
            <AppProvider theme={innerTheme === 'dark' ? darkTheme : {}}>
              <Card>
                <div style={{ padding: '24px' }}>
                  <BlockStack gap="16px">
                    <Text variant="headingMd" as="h3">Inner Provider</Text>
                    <Text>
                      This card is inside a nested AppProvider with its own theme.
                    </Text>
                    <Button onClick={toggleInnerTheme}>
                      Toggle Inner Theme ({innerTheme})
                    </Button>
                    <Badge>
                      Outer: {outerTheme} | Inner: {innerTheme}
                    </Badge>
                  </BlockStack>
                </div>
              </Card>
            </AppProvider>
          </div>
        </div>
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'nested-providers'),
  },

};

export const CompleteApplication: Story = {
  render: () => {
    const [modalActive, setModalActive] = useState(false);
    const [toastActive, setToastActive] = useState(false);

    const toggleModal = useCallback(() => setModalActive((active) => !active), []);
    const toggleToast = useCallback(() => setToastActive((active) => !active), []);

    return (
      <AppProvider i18n={{}}>
        <div style={{ padding: '24px', maxWidth: '1200px' }}>
          <Page
              title="Complete Application"
              breadcrumbs={[{ content: 'Home', url: '#' }]}
              primaryAction={{
                content: 'New Item',
                onAction: toggleModal,
              }}
            >
              <Layout>
                <Layout.Section>
                  <Card>
                    <div style={{ padding: '24px' }}>
                      <BlockStack gap="16px">
                        <Text variant="headingMd" as="h2">
                          Complete AppProvider Example
                        </Text>
                        <Text>
                          This is a complete application using AppProvider with Page, Layout,
                          Modal, Toast, and other Polaris components working together.
                        </Text>
                        <InlineStack gap="12px">
                          <Button onClick={toggleModal}>Open Modal</Button>
                          <Button onClick={toggleToast}>Show Toast</Button>
                        </InlineStack>
                      </BlockStack>
                    </div>
                  </Card>
                </Layout.Section>

                <Layout.Section secondary>
                  <Card title="Theme Status">
                    <div style={{ padding: '16px' }}>
                      <Text>✅ Default theme active</Text>
                      <Text>✅ English translations loaded</Text>
                      <Text>✅ Global context available</Text>
                    </div>
                  </Card>
                </Layout.Section>
              </Layout>
            </Page>
          </div>

          <Modal
            open={modalActive}
            onClose={toggleModal}
            title="Application Modal"
            primaryAction={{
              content: 'Save',
              onAction: toggleModal,
            }}
          >
            <Modal.Section>
              <Text>
                This modal is part of a complete application powered by AppProvider.
              </Text>
            </Modal.Section>
          </Modal>

          {toastActive && (
            <Toast
              content="Application notification from AppProvider"
              onDismiss={toggleToast}
            />
          )}
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'complete-app'),
  },

};

export const ErrorBoundary: Story = {
  render: () => {
    const [shouldError, setShouldError] = useState(false);

    if (shouldError) {
      throw new Error('Test error for boundary demonstration');
    }

    return (
      <AppProvider i18n={{}}>
        <div style={{ padding: '24px', width: '600px' }}>
          <Card>
            <div style={{ padding: '24px' }}>
              <BlockStack gap="16px">
                <Text variant="headingMd" as="h2">Error Boundary Testing</Text>
                <Text>
                  AppProvider can work with error boundaries to handle component errors gracefully.
                </Text>
                <Button
                  destructive
                  onClick={() => setShouldError(true)}
                >
                  Trigger Error
                </Button>
                <Text variant="bodySm" color="subdued">
                  Note: This will throw an error to test error boundary behavior.
                  In a real application, this would be caught by an error boundary.
                </Text>
              </BlockStack>
            </div>
          </Card>
        </div>
      </AppProvider>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('appprovider', 'error-boundary'),
  },

};