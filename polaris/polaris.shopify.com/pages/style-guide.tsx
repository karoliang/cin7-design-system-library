import React from 'react';
import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  Button,
  InlineStack,
} from '@shopify/polaris';
import PageMeta from '../src/components/PageMeta';
import {
  ColorPalette,
  TypographyScale,
  ButtonVariants,
  BadgeExamples,
  FormElements,
  SpacingExamples,
  IconLibrary,
  FeedbackPatterns,
} from '../src/components/StyleGuideExamples';
import styles from '../src/styles/StyleGuide.module.scss';

export default function StyleGuidePage() {
  return (
    <>
      <PageMeta
        title="Visual Style Guide"
        description="Interactive visual style guide for Cin7 DSL components. Explore color palettes, typography, spacing, and component patterns with live examples."
        keywords={['style guide', 'visual design', 'components', 'patterns', 'colors', 'typography']}
        ogType="article"
      />
      
      <Page
        title="Visual Style Guide"
        subtitle="Interactive examples of Cin7 DSL design patterns"
        primaryAction={{
          content: 'View Documentation',
          url: '/design/style-guide',
        }}
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="800">
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">
                    Foundation Elements
                  </Text>
                  <Text variant="bodyMd" tone="subdued" as="p">
                    Core design elements that form the foundation of Cin7 DSL applications
                  </Text>
                </BlockStack>
              </Card>

              <div className={styles.Section}>
                <ColorPalette />
              </div>

              <div className={styles.Section}>
                <TypographyScale />
              </div>

              <div className={styles.Section}>
                <SpacingExamples />
              </div>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">
                    Component Patterns
                  </Text>
                  <Text variant="bodyMd" tone="subdued" as="p">
                    Common UI patterns and component variations
                  </Text>
                </BlockStack>
              </Card>

              <div className={styles.Section}>
                <ButtonVariants />
              </div>

              <div className={styles.Section}>
                <BadgeExamples />
              </div>

              <div className={styles.Section}>
                <FormElements />
              </div>

              <div className={styles.Section}>
                <IconLibrary />
              </div>

              <div className={styles.Section}>
                <FeedbackPatterns />
              </div>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">
                    Implementation Guidelines
                  </Text>
                  <Text variant="bodyMd" as="p">
                    These visual examples demonstrate the proper implementation of Cin7 DSL
                    components. For detailed usage instructions and code examples, refer to
                    the comprehensive style guide documentation.
                  </Text>
                  <InlineStack gap="400">
                    <Button url="/design/style-guide">
                      Read Full Documentation
                    </Button>
                    <Button plain url="/playground">
                      Try in Playground
                    </Button>
                  </InlineStack>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}