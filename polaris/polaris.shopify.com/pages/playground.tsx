import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Page,
  Layout,
  Card,
  Select,
  TextField,
  Button,
  Stack,
  Divider,
  Text,
  Box,
  Banner,
} from '@shopify/polaris';
import * as Polaris from '@shopify/polaris';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import PageMeta from '../src/components/PageMeta';
import styles from '../src/styles/Playground.module.scss';

// Monaco Editor for better code editing experience
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then((mod) => mod.default),
  { ssr: false }
);

const componentExamples = {
  Button: `function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <Stack vertical>
      <Text variant="headingMd">Button Counter Example</Text>
      <p>You clicked {count} times</p>
      <Stack>
        <Button primary onClick={() => setCount(count + 1)}>
          Increment
        </Button>
        <Button onClick={() => setCount(0)}>
          Reset
        </Button>
      </Stack>
    </Stack>
  );
}`,
  Card: `function Example() {
  return (
    <Card 
      title="Product Information"
      footerActions={[
        { content: 'Cancel' },
        { content: 'Save', primary: true }
      ]}
    >
      <Stack vertical>
        <TextField label="Product Name" value="Wireless Headphones" />
        <TextField label="Price" type="number" value="99.99" prefix="$" />
        <Select
          label="Category"
          options={[
            { label: 'Electronics', value: 'electronics' },
            { label: 'Accessories', value: 'accessories' },
          ]}
          value="electronics"
        />
      </Stack>
    </Card>
  );
}`,
  DataTable: `function Example() {
  const rows = [
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    ['Navy Merino Wool Blazer', '$445.00', 124518, 32, '$14,240.00'],
  ];

  return (
    <Card title="Sales by Product">
      <DataTable
        columnContentTypes={[
          'text',
          'numeric',
          'numeric',
          'numeric',
          'numeric',
        ]}
        headings={[
          'Product',
          'Price',
          'SKU Number',
          'Quantity',
          'Net Sales',
        ]}
        rows={rows}
        totals={['', '', '', 255, '$155,830.00']}
        showTotalsInFooter
      />
    </Card>
  );
}`,
  Form: `function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  
  const handleSubmit = () => {
    console.log('Form submitted:', { email, password, newsletter });
  };

  return (
    <Card title="Sign Up">
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            helpText="Must be at least 8 characters"
            required
          />
          <Checkbox
            label="Subscribe to newsletter"
            checked={newsletter}
            onChange={setNewsletter}
          />
          <Button primary submit>
            Create Account
          </Button>
        </FormLayout>
      </Form>
    </Card>
  );
}`,
  Modal: `function Example() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');

  const handleChange = () => setActive(!active);

  const activator = <Button onClick={handleChange}>Open Modal</Button>;

  return (
    <>
      {activator}
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Subscribe to Newsletter"
        primaryAction={{
          content: 'Subscribe',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            <Text variant="bodyMd">
              Join our newsletter to stay updated with the latest news and updates.
            </Text>
            <TextField
              label="Email address"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              type="email"
            />
          </Stack>
        </Modal.Section>
      </Modal>
    </>
  );
}`,
};

const defaultCode = componentExamples.Button;

function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode);
  const [selectedExample, setSelectedExample] = useState('Button');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showCode, setShowCode] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const scope = {
    ...React,
    ...Polaris,
    useState: React.useState,
    useEffect: React.useEffect,
    useCallback: React.useCallback,
    useMemo: React.useMemo,
  };

  const handleExampleChange = (value: string) => {
    setSelectedExample(value);
    setCode(componentExamples[value] || defaultCode);
    setError(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleResetCode = () => {
    setCode(componentExamples[selectedExample] || defaultCode);
    setError(null);
  };

  return (
    <>
      <PageMeta
        title="Component Playground"
        description="Interactive playground for experimenting with Cin7 DSL components"
      />
      <Page
        title="Component Playground"
        subtitle="Experiment with Cin7 DSL components in real-time"
        fullWidth
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Stack vertical spacing="loose">
                <Stack distribution="equalSpacing" alignment="center">
                  <Stack>
                    <Select
                      label="Choose Example"
                      labelInline
                      options={Object.keys(componentExamples).map((key) => ({
                        label: key,
                        value: key,
                      }))}
                      value={selectedExample}
                      onChange={handleExampleChange}
                    />
                    <Button plain onClick={() => setShowCode(!showCode)}>
                      {showCode ? 'Hide Code' : 'Show Code'}
                    </Button>
                  </Stack>
                  <Stack>
                    <Button plain onClick={handleCopyCode}>
                      Copy Code
                    </Button>
                    <Button plain onClick={handleResetCode}>
                      Reset
                    </Button>
                  </Stack>
                </Stack>

                <Divider />

                <div className={styles.PlaygroundContainer}>
                  <LiveProvider
                    code={code}
                    scope={scope}
                    theme={theme === 'dark' ? themes.vsDark : themes.vsLight}
                    onError={(err) => setError(err.toString())}
                  >
                    <div className={styles.EditorSection}>
                      {showCode && (
                        <div className={styles.Editor}>
                          <LiveEditor
                            className={styles.LiveEditor}
                            style={{
                              fontFamily: 'Monaco, monospace',
                              fontSize: 14,
                            }}
                          />
                        </div>
                      )}
                      <LiveError className={styles.Error} />
                    </div>

                    <div className={styles.PreviewSection}>
                      <Text variant="headingMd" as="h3">
                        Preview
                      </Text>
                      <Box
                        background="bg-surface"
                        padding="400"
                        borderRadius="200"
                        borderColor="border"
                        borderWidth="025"
                      >
                        <LivePreview />
                      </Box>
                    </div>
                  </LiveProvider>
                </div>

                {error && (
                  <Banner tone="critical" title="Error">
                    {error}
                  </Banner>
                )}
              </Stack>
            </Card>
          </Layout.Section>

          <Layout.Section secondary>
            <Card title="Available Components">
              <Stack vertical spacing="tight">
                <Text variant="bodySm" color="subdued">
                  All Polaris components are available in the playground:
                </Text>
                <ul className={styles.ComponentList}>
                  <li>AppProvider</li>
                  <li>Badge</li>
                  <li>Banner</li>
                  <li>Button</li>
                  <li>ButtonGroup</li>
                  <li>Card</li>
                  <li>Checkbox</li>
                  <li>DataTable</li>
                  <li>Form</li>
                  <li>FormLayout</li>
                  <li>Layout</li>
                  <li>Modal</li>
                  <li>Page</li>
                  <li>Select</li>
                  <li>Stack</li>
                  <li>Text</li>
                  <li>TextField</li>
                  <li>...and many more!</li>
                </ul>
              </Stack>
            </Card>

            <Card title="Tips">
              <Stack vertical spacing="tight">
                <Text variant="bodySm">
                  • Use React hooks like useState and useEffect
                </Text>
                <Text variant="bodySm">
                  • All Polaris components are available
                </Text>
                <Text variant="bodySm">
                  • Your component must be named "Example"
                </Text>
                <Text variant="bodySm">
                  • Changes are reflected in real-time
                </Text>
                <Text variant="bodySm">
                  • Use Cmd/Ctrl + S to format code
                </Text>
              </Stack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}

export default PlaygroundPage;