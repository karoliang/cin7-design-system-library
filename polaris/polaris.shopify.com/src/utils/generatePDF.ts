// PDF generation utilities for downloadable resources

interface PDFContent {
  title: string;
  sections: {
    title: string;
    content: string;
    examples?: { title: string; code: string; language: string }[];
  }[];
}

/**
 * Generate Quick Reference Card content
 */
export function generateQuickReferenceContent(): PDFContent {
  return {
    title: 'Cin7 DSL Quick Reference',
    sections: [
      {
        title: 'Core Components',
        content: 'Essential UI components for building Cin7 DSL applications',
        examples: [
          {
            title: 'Button',
            code: `<Button primary onClick={handleClick}>
  Save Changes
</Button>`,
            language: 'jsx'
          },
          {
            title: 'Card',
            code: `<Card title="Product Info">
  <Text>Card content here</Text>
</Card>`,
            language: 'jsx'
          },
          {
            title: 'TextField',
            code: `<TextField
  label="Email"
  value={email}
  onChange={setEmail}
  type="email"
  requiredIndicator
/>`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'ExtJS Integration',
        content: 'Enterprise-grade components for complex data operations',
        examples: [
          {
            title: 'DataGrid',
            code: `<ExtDataGrid
  data={products}
  columns={[
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Price', dataIndex: 'price', width: 100 }
  ]}
  features={['sorting', 'filtering']}
/>`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'State Management',
        content: 'Zustand for predictable state updates',
        examples: [
          {
            title: 'Store Setup',
            code: `const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));`,
            language: 'typescript'
          },
          {
            title: 'Using Store',
            code: `const { count, increment, decrement } = useStore();`,
            language: 'typescript'
          }
        ]
      },
      {
        title: 'Form Patterns',
        content: 'Common form implementations with validation',
        examples: [
          {
            title: 'Form with Validation',
            code: `<Form onSubmit={handleSubmit}>
  <FormLayout>
    <TextField
      label="Email"
      value={email}
      onChange={setEmail}
      error={errors.email}
      requiredIndicator
    />
    <Button submit primary>Submit</Button>
  </FormLayout>
</Form>`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'TypeScript Types',
        content: 'Common type definitions for type safety',
        examples: [
          {
            title: 'Component Props',
            code: `interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}`,
            language: 'typescript'
          }
        ]
      }
    ]
  };
}

/**
 * Generate Migration Guide content
 */
export function generateMigrationGuideContent(): PDFContent {
  return {
    title: 'Cin7 DSL Migration Guide',
    sections: [
      {
        title: 'Installation',
        content: 'Steps to install and configure Cin7 DSL in your project',
        examples: [
          {
            title: 'Package Installation',
            code: `npm install @cin7/dsl-core @cin7/dsl-components @cin7/dsl-extjs-adapters`,
            language: 'bash'
          },
          {
            title: 'App Setup',
            code: `import { Cin7DslProvider } from '@cin7/dsl-core';
import { PolarisProvider } from '@shopify/polaris';

function App() {
  return (
    <Cin7DslProvider config={{ extjsSupport: true }}>
      <PolarisProvider>
        {/* Your app */}
      </PolarisProvider>
    </Cin7DslProvider>
  );
}`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'Component Migration',
        content: 'How to migrate existing components to Cin7 DSL',
        examples: [
          {
            title: 'Before (Material-UI)',
            code: `import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Save
</Button>`,
            language: 'jsx'
          },
          {
            title: 'After (Cin7 DSL)',
            code: `import { Button } from '@shopify/polaris';

<Button primary>
  Save
</Button>`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'Best Practices',
        content: 'Recommended patterns and practices for Cin7 DSL development',
        examples: [
          {
            title: 'Error Handling',
            code: `const { data, error, isLoading } = useQuery('products', fetchProducts);

if (isLoading) return <Spinner />;
if (error) return <Banner tone="critical">{error.message}</Banner>;

return <ProductList products={data} />;`,
            language: 'jsx'
          }
        ]
      }
    ]
  };
}

/**
 * Generate Component Guide content
 */
export function generateComponentGuideContent(): PDFContent {
  return {
    title: 'Cin7 DSL Component Guide',
    sections: [
      {
        title: 'Layout Components',
        content: 'Components for structuring your application layout',
        examples: [
          {
            title: 'Page Structure',
            code: `<Page title="Products" primaryAction={{ content: 'Add product' }}>
  <Layout>
    <Layout.Section>
      <Card>Main content</Card>
    </Layout.Section>
    <Layout.Section variant="oneThird">
      <Card>Sidebar</Card>
    </Layout.Section>
  </Layout>
</Page>`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'Data Display',
        content: 'Components for displaying data and information',
        examples: [
          {
            title: 'Data Table',
            code: `<DataTable
  columnContentTypes={['text', 'numeric', 'text']}
  headings={['Product', 'Price', 'Status']}
  rows={[
    ['Headphones', '$99.99', 'Active'],
    ['Laptop', '$1299.99', 'Active']
  ]}
/>`,
            language: 'jsx'
          }
        ]
      },
      {
        title: 'Feedback Components',
        content: 'Components for user feedback and notifications',
        examples: [
          {
            title: 'Banner',
            code: `<Banner tone="success" title="Changes saved">
  <p>Your product has been updated successfully.</p>
</Banner>`,
            language: 'jsx'
          }
        ]
      }
    ]
  };
}

/**
 * Generate HTML content for PDF
 */
export function generatePDFHTML(content: PDFContent): string {
  const sectionsHTML = content.sections.map(section => {
    const examplesHTML = section.examples?.map(example => `
      <div class="example">
        <h4>${example.title}</h4>
        <pre><code class="language-${example.language}">${escapeHtml(example.code)}</code></pre>
      </div>
    `).join('') || '';

    return `
      <div class="section">
        <h2>${section.title}</h2>
        <p>${section.content}</p>
        ${examplesHTML}
      </div>
    `;
  }).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>${content.title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        h1 {
          color: #008060;
          text-align: center;
          margin-bottom: 30px;
          font-size: 2.5em;
        }
        
        h2 {
          color: #2c3e50;
          margin-top: 40px;
          margin-bottom: 20px;
          font-size: 1.8em;
          border-bottom: 2px solid #008060;
          padding-bottom: 10px;
        }
        
        h3 {
          color: #34495e;
          margin-top: 30px;
          margin-bottom: 15px;
          font-size: 1.4em;
        }
        
        h4 {
          color: #34495e;
          margin-top: 20px;
          margin-bottom: 10px;
          font-size: 1.2em;
        }
        
        .section {
          margin-bottom: 40px;
          page-break-inside: avoid;
        }
        
        .example {
          margin: 20px 0;
          padding: 15px;
          background: #f8f9fa;
          border-left: 4px solid #008060;
          border-radius: 4px;
        }
        
        pre {
          background: #2d3748;
          color: #e2e8f0;
          padding: 15px;
          border-radius: 6px;
          overflow-x: auto;
          font-size: 14px;
          line-height: 1.4;
        }
        
        code {
          font-family: 'Fira Code', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          padding: 20px;
          background: linear-gradient(135deg, #008060 0%, #00a878 100%);
          color: white;
          border-radius: 8px;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding: 20px;
          background: #f8f9fa;
          color: #666;
          border-radius: 8px;
          font-size: 14px;
        }
        
        @media print {
          body { font-size: 12px; }
          .section { page-break-inside: avoid; }
          pre { font-size: 11px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${content.title}</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      ${sectionsHTML}
      
      <div class="footer">
        <p>
          For the latest updates and documentation, visit 
          <strong>https://polaris.shopify.com</strong>
        </p>
        <p>© ${new Date().getFullYear()} Cin7 DSL - Enterprise Design System</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Escape HTML characters
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Generate and download PDF
 */
export function downloadPDF(content: PDFContent, filename: string) {
  const htmlContent = generatePDFHTML(content);
  
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}

/**
 * Generate and download HTML file
 */
export function downloadHTML(content: PDFContent, filename: string) {
  const htmlContent = generatePDFHTML(content);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}