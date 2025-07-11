import { AppProvider, Page, Layout, Card, Text } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

function App() {
  return (
    <AppProvider i18n={enTranslations}>
      <Page title="Cin7 DSL Example Dashboard">
        <Layout>
          <Layout.Section>
            <Card>
              <Text variant="headingMd" as="h2">
                Welcome to Cin7 DSL
              </Text>
              <Text as="p">
                This is an example dashboard built with the Cin7 DSL framework,
                combining Shopify Polaris components with ExtJS enterprise features.
              </Text>
            </Card>
          </Layout.Section>
          
          <Layout.Section>
            <Card>
              <Text variant="headingMd" as="h2">
                Framework Status
              </Text>
              <Text as="p">
                The Cin7 DSL framework is currently being built. This example
                will showcase the integration of Polaris and ExtJS components.
              </Text>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default App;