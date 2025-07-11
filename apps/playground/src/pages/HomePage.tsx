import React from 'react';
import { 
  Page, 
  Card, 
  Text, 
  Button, 
  Layout, 
  BlockStack,
  InlineStack,
  Box,
  Icon,
  Banner,
} from '@cin7/polaris-adapter';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <Page title="Cin7 DSL Playground">
      <Layout>
        <Layout.Section>
          <Banner
            title="Welcome to the Cin7 DSL Playground"
            status="info"
          >
            <p>
              Explore the multi-layer architecture of Cin7 DSL. Mix Vanilla JS, React/Polaris, 
              and ExtJS to build powerful applications.
            </p>
          </Banner>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap="400">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  What is Cin7 DSL?
                </Text>
                <Text as="p" variant="bodyMd">
                  Cin7 DSL is a domain-specific language that allows you to build applications 
                  using the right tool for each job. It seamlessly integrates multiple technologies:
                </Text>
                <BlockStack gap="200">
                  <InlineStack gap="300" align="start">
                    <Box minWidth="150px">
                      <Text as="span" variant="bodyMd" fontWeight="semibold">
                        Vanilla JS
                      </Text>
                    </Box>
                    <Text as="span" variant="bodyMd" tone="subdued">
                      For lightweight DOM manipulation and performance-critical interactions
                    </Text>
                  </InlineStack>
                  <InlineStack gap="300" align="start">
                    <Box minWidth="150px">
                      <Text as="span" variant="bodyMd" fontWeight="semibold">
                        React/Polaris
                      </Text>
                    </Box>
                    <Text as="span" variant="bodyMd" tone="subdued">
                      For modern UI components and state management
                    </Text>
                  </InlineStack>
                  <InlineStack gap="300" align="start">
                    <Box minWidth="150px">
                      <Text as="span" variant="bodyMd" fontWeight="semibold">
                        ExtJS
                      </Text>
                    </Box>
                    <Text as="span" variant="bodyMd" tone="subdued">
                      For enterprise data grids and complex forms
                    </Text>
                  </InlineStack>
                  <InlineStack gap="300" align="start">
                    <Box minWidth="150px">
                      <Text as="span" variant="bodyMd" fontWeight="semibold">
                        TypeScript SDK
                      </Text>
                    </Box>
                    <Text as="span" variant="bodyMd" tone="subdued">
                      For business logic patterns and type safety
                    </Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            <Layout>
              <Layout.Section oneThird>
                <Card>
                  <BlockStack gap="400">
                    <Icon source="CodeIcon" tone="interactive" />
                    <Text as="h3" variant="headingMd">
                      Try the Editor
                    </Text>
                    <Text as="p" variant="bodyMd" tone="subdued">
                      Write Cin7 DSL code and see it in action with live preview
                    </Text>
                    <Link to="/editor" style={{ textDecoration: 'none' }}>
                      <Button primary fullWidth>
                        Open Editor
                      </Button>
                    </Link>
                  </BlockStack>
                </Card>
              </Layout.Section>

              <Layout.Section oneThird>
                <Card>
                  <BlockStack gap="400">
                    <Icon source="CollectionIcon" tone="interactive" />
                    <Text as="h3" variant="headingMd">
                      Browse Examples
                    </Text>
                    <Text as="p" variant="bodyMd" tone="subdued">
                      Explore real-world examples showcasing different patterns
                    </Text>
                    <Link to="/examples" style={{ textDecoration: 'none' }}>
                      <Button fullWidth>
                        View Examples
                      </Button>
                    </Link>
                  </BlockStack>
                </Card>
              </Layout.Section>

              <Layout.Section oneThird>
                <Card>
                  <BlockStack gap="400">
                    <Icon source="QuestionMarkIcon" tone="interactive" />
                    <Text as="h3" variant="headingMd">
                      Documentation
                    </Text>
                    <Text as="p" variant="bodyMd" tone="subdued">
                      Learn the DSL syntax and best practices
                    </Text>
                    <Link to="/docs" style={{ textDecoration: 'none' }}>
                      <Button fullWidth>
                        Read Docs
                      </Button>
                    </Link>
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>

            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Quick Example
                </Text>
                <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                  <pre style={{ margin: 0, fontSize: '14px' }}>
{`component ProductCard {
  props {
    product: Product
    onSelect?: (product: Product) => void
  }
  
  state {
    isHovered: boolean = false
  }
  
  render {
    @vanilla {
      <div class="product-card" 
           onmouseenter={() => this.isHovered = true}
           onmouseleave={() => this.isHovered = false}>
        @slot content
      </div>
    }
    
    @react {
      <Card highlighted={this.isHovered}>
        <Text>{this.product.name}</Text>
        <Button onClick={() => this.onSelect?.(this.product)}>
          Select
        </Button>
      </Card>
    }
  }
}`}
                  </pre>
                </Box>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}