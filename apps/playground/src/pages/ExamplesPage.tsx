import React from 'react';
import { 
  Page, 
  Card, 
  Text, 
  Button, 
  Layout, 
  BlockStack,
  InlineStack,
  Badge,
  Icon,
} from '@cin7/polaris-adapter';
import { Link } from 'react-router-dom';
import { examples } from '../examples';

export default function ExamplesPage() {
  const exampleCategories = {
    basic: {
      title: 'Basic Components',
      description: 'Simple components demonstrating core concepts',
      examples: ['product-card', 'user-avatar', 'notification'],
    },
    advanced: {
      title: 'Advanced Patterns',
      description: 'Complex components using multiple layers',
      examples: ['data-grid', 'form-wizard', 'dashboard'],
    },
    business: {
      title: 'Business Logic',
      description: 'Examples showcasing repositories and use cases',
      examples: ['inventory-management', 'order-processing', 'reporting'],
    },
  };

  return (
    <Page title="Cin7 DSL Examples">
      <Layout>
        <Layout.Section>
          <BlockStack gap="600">
            {Object.entries(exampleCategories).map(([key, category]) => (
              <Card key={key}>
                <BlockStack gap="400">
                  <BlockStack gap="200">
                    <Text as="h2" variant="headingLg">
                      {category.title}
                    </Text>
                    <Text as="p" variant="bodyMd" tone="subdued">
                      {category.description}
                    </Text>
                  </BlockStack>

                  <BlockStack gap="300">
                    {category.examples.map(exampleKey => {
                      const example = examples[exampleKey];
                      if (!example) return null;

                      return (
                        <Card key={exampleKey} sectioned subdued>
                          <InlineStack gap="400" align="space-between">
                            <BlockStack gap="200">
                              <InlineStack gap="300" align="center">
                                <Text as="h3" variant="headingMd">
                                  {example.name}
                                </Text>
                                {example.tags?.map(tag => (
                                  <Badge key={tag} tone="info">
                                    {tag}
                                  </Badge>
                                ))}
                              </InlineStack>
                              <Text as="p" variant="bodyMd" tone="subdued">
                                {example.description}
                              </Text>
                              <InlineStack gap="200">
                                {example.technologies?.map(tech => (
                                  <Badge key={tech} tone="success">
                                    {tech}
                                  </Badge>
                                ))}
                              </InlineStack>
                            </BlockStack>
                            <Link 
                              to={`/editor?example=${exampleKey}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Button>
                                Open in Editor
                              </Button>
                            </Link>
                          </InlineStack>
                        </Card>
                      );
                    })}
                  </BlockStack>
                </BlockStack>
              </Card>
            ))}

            <Card>
              <BlockStack gap="400">
                <InlineStack gap="300" align="center">
                  <Icon source="InfoIcon" tone="info" />
                  <Text as="h2" variant="headingMd">
                    Contributing Examples
                  </Text>
                </InlineStack>
                <Text as="p" variant="bodyMd">
                  Have an interesting use case? We welcome contributions! 
                  Examples should demonstrate real-world patterns and showcase 
                  the power of mixing different technologies.
                </Text>
                <Button url="https://github.com/cin7dsl/examples" external>
                  Submit Example
                </Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}