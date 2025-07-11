import React from 'react';
import { 
  Box,
  Card,
  Text,
  Button,
  Badge,
  BlockStack,
  InlineStack,
  Banner,
} from '@cin7/polaris-adapter';

interface PreviewPanelProps {
  code: string;
  example: any;
}

export default function PreviewPanel({ code, example }: PreviewPanelProps) {
  // This is a simulated preview - in a real implementation,
  // the DSL would be compiled and rendered
  
  return (
    <Box padding="400" minHeight="100%">
      <BlockStack gap="400">
        <Banner
          title="Preview Mode"
          tone="info"
        >
          <p>
            This is a simulated preview. In production, the DSL compiler would 
            generate real components from your code.
          </p>
        </Banner>

        {example.preview ? (
          <example.preview />
        ) : (
          <Card>
            <BlockStack gap="400">
              <InlineStack gap="300" align="space-between">
                <Text as="h2" variant="headingMd">
                  {example.name}
                </Text>
                <Badge tone="success">Preview</Badge>
              </InlineStack>
              
              <Text as="p" variant="bodyMd" tone="subdued">
                {example.description}
              </Text>

              <BlockStack gap="300">
                {/* Simulated component based on example type */}
                {example.type === 'component' && (
                  <Card sectioned subdued>
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingSm">
                        Component Output
                      </Text>
                      <Box padding="400" background="bg-surface" borderRadius="200">
                        <Text>Rendered component would appear here</Text>
                      </Box>
                    </BlockStack>
                  </Card>
                )}

                {example.type === 'page' && (
                  <Card sectioned subdued>
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingSm">
                        Page Layout
                      </Text>
                      <Box minHeight="200px" background="bg-surface" borderRadius="200">
                        <Text>Page structure would be rendered here</Text>
                      </Box>
                    </BlockStack>
                  </Card>
                )}

                {example.type === 'logic' && (
                  <Card sectioned subdued>
                    <BlockStack gap="200">
                      <Text as="h3" variant="headingSm">
                        Business Logic Output
                      </Text>
                      <pre style={{ 
                        margin: 0, 
                        padding: '12px',
                        background: 'var(--p-color-bg-surface-secondary)',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}>
{`// Repository methods:
- findAll()
- findById(id)
- create(data)
- update(id, data)
- delete(id)`}
                      </pre>
                    </BlockStack>
                  </Card>
                )}
              </BlockStack>

              <BlockStack gap="200">
                <Text as="p" variant="bodySm" fontWeight="semibold">
                  Technologies Used:
                </Text>
                <InlineStack gap="200">
                  {example.technologies?.map((tech: string) => (
                    <Badge key={tech} tone="info">
                      {tech}
                    </Badge>
                  ))}
                </InlineStack>
              </BlockStack>

              <Box>
                <Button fullWidth>
                  Interactive Demo (Coming Soon)
                </Button>
              </Box>
            </BlockStack>
          </Card>
        )}
      </BlockStack>
    </Box>
  );
}