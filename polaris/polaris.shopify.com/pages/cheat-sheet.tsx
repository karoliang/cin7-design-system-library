import React, { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Select,
} from '@shopify/polaris';
import { ExportIcon } from '@shopify/polaris-icons';
import PageMeta from '../src/components/PageMeta';
import { 
  CheatSheet, 
  commonPatternsCheatSheet, 
  typescriptPatternsCheatSheet, 
  hooksPatternsCheatSheet,
  type CheatSheetItem
} from '../src/components/CheatSheet';
import { usePageTracking } from '../src/utils/usePageTracking';
import { trackDownload } from '../src/utils/analytics';

const cheatSheets: Record<string, {
  title: string;
  data: CheatSheetItem[];
  description: string;
}> = {
  'common-patterns': {
    title: 'Common Patterns',
    data: commonPatternsCheatSheet,
    description: 'Essential components and patterns for everyday development'
  },
  'typescript': {
    title: 'TypeScript Patterns',
    data: typescriptPatternsCheatSheet,
    description: 'Type-safe patterns and interfaces for robust applications'
  },
  'hooks': {
    title: 'React Hooks',
    data: hooksPatternsCheatSheet,
    description: 'Common React hook patterns and custom hooks'
  }
};

export default function CheatSheetPage() {
  const [selectedSheet, setSelectedSheet] = useState('common-patterns');
  
  usePageTracking({
    trackTimeOnPage: true,
    trackScrollDepth: true,
  });

  const currentSheet = cheatSheets[selectedSheet];

  const handlePrintSheet = () => {
    trackDownload(`cheat-sheet-${selectedSheet}`, 'PDF');
    window.print();
  };

  return (
    <>
      <PageMeta
        title="Cheat Sheet"
        description="Quick reference for Cin7 DSL components, patterns, and TypeScript types. Copy-paste code snippets for rapid development."
        keywords={['cheat sheet', 'quick reference', 'snippets', 'components', 'patterns', 'typescript']}
      />
      
      <Page
        title="Cheat Sheet"
        subtitle="Quick reference for common patterns and components"
        primaryAction={{
          content: 'Print Sheet',
          icon: ExportIcon,
          onAction: handlePrintSheet,
        }}
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="500">
              <Card>
                <InlineStack align="space-between" blockAlign="center">
                  <BlockStack gap="200">
                    <Text variant="headingMd" as="h2">
                      {currentSheet.title}
                    </Text>
                    <Text variant="bodyMd" as="p" tone="subdued">
                      {currentSheet.description}
                    </Text>
                  </BlockStack>
                  
                  <Select
                    label="Cheat Sheet"
                    labelHidden
                    options={Object.entries(cheatSheets).map(([key, sheet]) => ({
                      label: sheet.title,
                      value: key,
                    }))}
                    value={selectedSheet}
                    onChange={setSelectedSheet}
                  />
                </InlineStack>
              </Card>
              
              <CheatSheet
                title={currentSheet.title}
                items={currentSheet.data}
              />
              
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h3">
                    Using This Cheat Sheet
                  </Text>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div>
                      <Text variant="headingSm" as="h4">
                        Copy Code
                      </Text>
                      <Text variant="bodyMd" as="p">
                        Click the copy button on any code snippet to copy it to your clipboard.
                      </Text>
                    </div>
                    
                    <div>
                      <Text variant="headingSm" as="h4">
                        Print Reference
                      </Text>
                      <Text variant="bodyMd" as="p">
                        Use the print button to create a PDF for offline reference.
                      </Text>
                    </div>
                    
                    <div>
                      <Text variant="headingSm" as="h4">
                        Search & Filter
                      </Text>
                      <Text variant="bodyMd" as="p">
                        Use browser search (Ctrl+F) to quickly find specific components.
                      </Text>
                    </div>
                  </div>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Page>
    </>
  );
}