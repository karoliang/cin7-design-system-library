import React from 'react';
import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Badge,
  Icon,
  List,
} from '@shopify/polaris';
import {
  FileIcon,
  ExportIcon,
  CodeIcon,
  BookIcon,
  NoteIcon,
  DesktopIcon,
} from '@shopify/polaris-icons';
import PageMeta from '../src/components/PageMeta';
import {
  generateQuickReferenceContent,
  generateMigrationGuideContent,
  generateComponentGuideContent,
  downloadPDF,
  downloadHTML,
} from '../src/utils/generatePDF';
import { trackDownload } from '../src/utils/analytics';
import { usePageTracking } from '../src/utils/usePageTracking';
import styles from '../src/styles/Downloads.module.scss';

interface DownloadItem {
  title: string;
  description: string;
  icon: React.ComponentType;
  size: string;
  format: string;
  badge?: string;
  onDownload: () => void;
}

export default function DownloadsPage() {
  usePageTracking({
    trackTimeOnPage: true,
    trackScrollDepth: true,
  });

  const handleDownload = (title: string, format: string, generator: () => any) => {
    const content = generator();
    const filename = title.toLowerCase().replace(/\s+/g, '-');
    
    if (format === 'PDF') {
      downloadPDF(content, filename);
    } else if (format === 'HTML') {
      downloadHTML(content, filename);
    }
    
    // Track download
    trackDownload(filename, format);
  };

  const downloadItems: DownloadItem[] = [
    {
      title: 'Quick Reference Card',
      description: 'Essential components, patterns, and code snippets at a glance',
      icon: BookIcon,
      size: '2.1 MB',
      format: 'PDF',
      badge: 'Popular',
      onDownload: () => handleDownload('Quick Reference Card', 'PDF', generateQuickReferenceContent),
    },
    {
      title: 'Migration Guide',
      description: 'Step-by-step guide to migrate from other frameworks to Cin7 DSL',
      icon: ExportIcon,
      size: '1.8 MB',
      format: 'PDF',
      onDownload: () => handleDownload('Migration Guide', 'PDF', generateMigrationGuideContent),
    },
    {
      title: 'Component Guide',
      description: 'Comprehensive component documentation with examples',
      icon: CodeIcon,
      size: '3.2 MB',
      format: 'PDF',
      badge: 'New',
      onDownload: () => handleDownload('Component Guide', 'PDF', generateComponentGuideContent),
    },
    {
      title: 'Style Guide',
      description: 'Design principles, patterns, and best practices',
      icon: NoteIcon,
      size: '1.5 MB',
      format: 'HTML',
      onDownload: () => window.open('/style-guide', '_blank'),
    },
  ];

  const templateItems = [
    {
      title: 'React TypeScript Starter',
      description: 'Complete project template with Cin7 DSL, TypeScript, and best practices',
      technologies: ['React', 'TypeScript', 'Zustand', 'React Query'],
      onDownload: () => {
        trackDownload('react-typescript-starter', 'ZIP');
        window.open('https://github.com/cin7/dsl-starter-react-typescript', '_blank');
      },
    },
    {
      title: 'ExtJS Integration Template',
      description: 'Template showing ExtJS components integrated with Polaris',
      technologies: ['React', 'ExtJS', 'TypeScript'],
      onDownload: () => {
        trackDownload('extjs-integration-template', 'ZIP');
        window.open('https://github.com/cin7/dsl-extjs-template', '_blank');
      },
    },
    {
      title: 'Dashboard Template',
      description: 'Pre-built dashboard with charts, tables, and forms',
      technologies: ['React', 'TypeScript', 'Charts', 'Forms'],
      onDownload: () => {
        trackDownload('dashboard-template', 'ZIP');
        window.open('https://github.com/cin7/dsl-dashboard-template', '_blank');
      },
    },
  ];

  const toolsItems = [
    {
      title: 'Figma Design Kit',
      description: 'Complete Figma library with all Cin7 DSL components',
      format: 'Figma',
      onDownload: () => {
        trackDownload('figma-design-kit', 'Figma');
        window.open('https://figma.com/cin7-dsl-design-kit', '_blank');
      },
    },
    {
      title: 'Sketch Templates',
      description: 'Sketch symbols and templates for rapid prototyping',
      format: 'Sketch',
      onDownload: () => {
        trackDownload('sketch-templates', 'Sketch');
        window.open('/downloads/cin7-dsl-sketch-templates.sketch', '_blank');
      },
    },
    {
      title: 'VS Code Extension',
      description: 'IntelliSense, snippets, and component validation',
      format: 'Extension',
      onDownload: () => {
        trackDownload('vscode-extension', 'Extension');
        window.open('https://marketplace.visualstudio.com/items?itemName=cin7.dsl-tools', '_blank');
      },
    },
  ];

  return (
    <>
      <PageMeta
        title="Downloads"
        description="Download guides, templates, and resources for Cin7 DSL development. Get PDFs, project templates, design kits, and developer tools."
        keywords={['downloads', 'resources', 'templates', 'guides', 'tools', 'PDFs']}
      />
      
      <Page
        title="Downloads"
        subtitle="Guides, templates, and resources for Cin7 DSL development"
      >
        <Layout>
          <Layout.Section>
            <BlockStack gap="800">
              {/* Documentation Downloads */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text variant="headingLg" as="h2">
                      Documentation
                    </Text>
                    <Badge tone="info">
                      {downloadItems.length} items
                    </Badge>
                  </InlineStack>
                  
                  <Text variant="bodyMd" tone="subdued">
                    Comprehensive guides and references for offline reading and printing
                  </Text>
                  
                  <div className={styles.DownloadGrid}>
                    {downloadItems.map((item, index) => (
                      <Card key={index} sectioned>
                        <BlockStack gap="300">
                          <InlineStack align="space-between">
                            <InlineStack gap="200" blockAlign="center">
                              <Icon source={item.icon} />
                              <Text variant="headingMd">{item.title}</Text>
                            </InlineStack>
                            {item.badge && (
                              <Badge tone={item.badge === 'Popular' ? 'success' : 'info'}>
                                {item.badge}
                              </Badge>
                            )}
                          </InlineStack>
                          
                          <Text variant="bodyMd">{item.description}</Text>
                          
                          <InlineStack align="space-between" blockAlign="center">
                            <InlineStack gap="400">
                              <Text variant="bodySm" tone="subdued">
                                {item.format}
                              </Text>
                              <Text variant="bodySm" tone="subdued">
                                {item.size}
                              </Text>
                            </InlineStack>
                            
                            <Button
                              onClick={item.onDownload}
                              icon={ExportIcon}
                            >
                              Download
                            </Button>
                          </InlineStack>
                        </BlockStack>
                      </Card>
                    ))}
                  </div>
                </BlockStack>
              </Card>

              {/* Project Templates */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text variant="headingLg" as="h2">
                      Project Templates
                    </Text>
                    <Badge tone="info">
                      {templateItems.length} templates
                    </Badge>
                  </InlineStack>
                  
                  <Text variant="bodyMd" tone="subdued">
                    Pre-configured project templates to get started quickly
                  </Text>
                  
                  <div className={styles.TemplateGrid}>
                    {templateItems.map((template, index) => (
                      <Card key={index} sectioned>
                        <BlockStack gap="300">
                          <InlineStack align="space-between">
                            <InlineStack gap="200" blockAlign="center">
                              <Icon source={FileIcon} />
                              <Text variant="headingMd">{template.title}</Text>
                            </InlineStack>
                          </InlineStack>
                          
                          <Text variant="bodyMd">{template.description}</Text>
                          
                          <InlineStack gap="100" wrap={false}>
                            {template.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex}>{tech}</Badge>
                            ))}
                          </InlineStack>
                          
                          <Button
                            onClick={template.onDownload}
                            icon={ExportIcon}
                            fullWidth
                          >
                            Download Template
                          </Button>
                        </BlockStack>
                      </Card>
                    ))}
                  </div>
                </BlockStack>
              </Card>

              {/* Design & Development Tools */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between" blockAlign="center">
                    <Text variant="headingLg" as="h2">
                      Design & Development Tools
                    </Text>
                    <Badge tone="info">
                      {toolsItems.length} tools
                    </Badge>
                  </InlineStack>
                  
                  <Text variant="bodyMd" tone="subdued">
                    Design assets and development tools for streamlined workflow
                  </Text>
                  
                  <div className={styles.ToolsGrid}>
                    {toolsItems.map((tool, index) => (
                      <Card key={index} sectioned>
                        <BlockStack gap="300">
                          <InlineStack align="space-between">
                            <InlineStack gap="200" blockAlign="center">
                              <Icon source={DesktopIcon} />
                              <Text variant="headingMd">{tool.title}</Text>
                            </InlineStack>
                            <Badge>{tool.format}</Badge>
                          </InlineStack>
                          
                          <Text variant="bodyMd">{tool.description}</Text>
                          
                          <Button
                            onClick={tool.onDownload}
                            icon={ExportIcon}
                            fullWidth
                          >
                            Get Tool
                          </Button>
                        </BlockStack>
                      </Card>
                    ))}
                  </div>
                </BlockStack>
              </Card>

              {/* Usage Instructions */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingLg" as="h2">
                    Using Downloaded Resources
                  </Text>
                  
                  <Text variant="bodyMd">
                    Here's how to make the most of your downloaded resources:
                  </Text>
                  
                  <div className={styles.InstructionsGrid}>
                    <div>
                      <Text variant="headingMd" as="h3">
                        Documentation
                      </Text>
                      <List type="bullet">
                        <List.Item>PDFs can be printed for offline reference</List.Item>
                        <List.Item>Use browser search (Ctrl+F) to find specific topics</List.Item>
                        <List.Item>Share with team members for consistent implementation</List.Item>
                      </List>
                    </div>
                    
                    <div>
                      <Text variant="headingMd" as="h3">
                        Templates
                      </Text>
                      <List type="bullet">
                        <List.Item>Extract ZIP files to your projects directory</List.Item>
                        <List.Item>Run `npm install` to install dependencies</List.Item>
                        <List.Item>Follow README instructions for setup</List.Item>
                      </List>
                    </div>
                    
                    <div>
                      <Text variant="headingMd" as="h3">
                        Design Tools
                      </Text>
                      <List type="bullet">
                        <List.Item>Import Figma kit to your design workspace</List.Item>
                        <List.Item>Use components library for consistent designs</List.Item>
                        <List.Item>Check for updates monthly</List.Item>
                      </List>
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