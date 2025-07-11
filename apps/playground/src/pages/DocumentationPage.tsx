import React from 'react';
import { 
  Page, 
  Card, 
  Text, 
  Layout, 
  BlockStack,
  Box,
  Divider,
  Link as PolarisLink,
} from '@cin7/polaris-adapter';

export default function DocumentationPage() {
  return (
    <Page title="DSL Documentation">
      <Layout>
        <Layout.Section>
          <BlockStack gap="600">
            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Quick Reference
                </Text>
                
                <Box>
                  <Text as="h3" variant="headingMd">
                    Component Structure
                  </Text>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <pre style={{ margin: 0, fontSize: '14px' }}>
{`component ComponentName {
  // Props with TypeScript types
  props {
    name: string
    count?: number = 0
    onAction?: () => void
  }
  
  // Reactive state
  state {
    isActive: boolean = false
    items: Item[] = []
  }
  
  // Lifecycle hooks
  onMount {
    this.loadData()
  }
  
  // Methods
  methods {
    async loadData() {
      // Implementation
    }
  }
  
  // Render with technology layers
  render {
    @vanilla { }
    @react { }
    @extjs { }
  }
}`}
                    </pre>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Text as="h3" variant="headingMd">
                    Technology Layers
                  </Text>
                  <BlockStack gap="300">
                    <Box>
                      <Text as="p" variant="bodyMd" fontWeight="semibold">
                        @vanilla - Vanilla JavaScript
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Use for lightweight DOM manipulation, event handling, and performance-critical code
                      </Text>
                    </Box>
                    <Box>
                      <Text as="p" variant="bodyMd" fontWeight="semibold">
                        @react - React with Polaris
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Use for modern UI components, complex state management, and interactive interfaces
                      </Text>
                    </Box>
                    <Box>
                      <Text as="p" variant="bodyMd" fontWeight="semibold">
                        @extjs - ExtJS Components
                      </Text>
                      <Text as="p" variant="bodyMd" tone="subdued">
                        Use for enterprise data grids, complex forms, and legacy system integration
                      </Text>
                    </Box>
                  </BlockStack>
                </Box>

                <Divider />

                <Box>
                  <Text as="h3" variant="headingMd">
                    Business Logic Patterns
                  </Text>
                  <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <pre style={{ margin: 0, fontSize: '14px' }}>
{`// Repository Pattern
repository ProductRepository {
  endpoint: '/api/products'
  
  methods {
    async findAll(): Product[] {
      return this.get('/')
    }
  }
}

// Use Case Pattern
usecase UpdateInventory {
  inject {
    productRepo: ProductRepository
  }
  
  async execute(request): Result {
    // Business logic
  }
}`}
                    </pre>
                  </Box>
                </Box>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Key Concepts
                </Text>
                
                <BlockStack gap="300">
                  <Box>
                    <Text as="h3" variant="headingMd">
                      Props and State
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Props are immutable inputs to components. State is reactive and triggers 
                      re-renders when changed. Both support full TypeScript typing.
                    </Text>
                  </Box>

                  <Box>
                    <Text as="h3" variant="headingMd">
                      Event Handling
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Events can be handled in any layer. Use <code>@on</code> for listening 
                      to custom events and <code>@emit</code> for dispatching them.
                    </Text>
                  </Box>

                  <Box>
                    <Text as="h3" variant="headingMd">
                      Performance Optimization
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Use <code>@optimize</code> directives for automatic optimizations like 
                      virtual scrolling, lazy loading, and memoization.
                    </Text>
                  </Box>

                  <Box>
                    <Text as="h3" variant="headingMd">
                      Styling
                    </Text>
                    <Text as="p" variant="bodyMd">
                      Styles are component-scoped and use design tokens. Access Polaris tokens 
                      with CSS variables like <code>var(--p-color-bg)</code>.
                    </Text>
                  </Box>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="400">
                <Text as="h2" variant="headingLg">
                  Learn More
                </Text>
                <BlockStack gap="200">
                  <PolarisLink url="https://cin7dsl.netlify.app/foundations/dsl-syntax" external>
                    Full DSL Syntax Reference
                  </PolarisLink>
                  <PolarisLink url="https://cin7dsl.netlify.app/patterns" external>
                    Design Patterns
                  </PolarisLink>
                  <PolarisLink url="https://cin7dsl.netlify.app/examples" external>
                    Real-world Examples
                  </PolarisLink>
                  <PolarisLink url="https://github.com/cin7dsl" external>
                    GitHub Repository
                  </PolarisLink>
                </BlockStack>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}