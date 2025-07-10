import React from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Badge,
  Divider,
  Box,
} from '@shopify/polaris';
import { CopyButton } from '../Code/Code';
import styles from './CheatSheet.module.scss';

export interface CheatSheetItem {
  title: string;
  description: string;
  code: string;
  category: string;
  tags?: string[];
}

interface CheatSheetProps {
  title: string;
  items: CheatSheetItem[];
}

export function CheatSheet({ title, items }: CheatSheetProps) {
  const categories = [...new Set(items.map(item => item.category))];

  return (
    <Card>
      <BlockStack gap="500">
        <Box padding="400">
          <Text variant="headingLg" as="h2">
            {title}
          </Text>
        </Box>
        
        <Divider />
        
        {categories.map(category => (
          <Box key={category} padding="400">
            <BlockStack gap="400">
              <Text variant="headingMd" as="h3">
                {category}
              </Text>
              
              <div className={styles.CheatSheetGrid}>
                {items
                  .filter(item => item.category === category)
                  .map((item, index) => (
                    <Card key={index}>
                      <Box padding="400">
                        <BlockStack gap="300">
                          <InlineStack align="space-between" blockAlign="start">
                            <BlockStack gap="100">
                              <Text variant="headingSm" as="h4">{item.title}</Text>
                              <Text variant="bodySm" tone="subdued" as="p">
                                {item.description}
                              </Text>
                            </BlockStack>
                            
                            <CopyButton code={item.code} codeType="cheat-sheet" />
                          </InlineStack>
                          
                          <div className={styles.CodeBlock}>
                            <pre><code>{item.code}</code></pre>
                          </div>
                          
                          {item.tags && (
                            <InlineStack gap="100">
                              {item.tags.map((tag, tagIndex) => (
                                <Badge key={tagIndex}>{tag}</Badge>
                              ))}
                            </InlineStack>
                          )}
                        </BlockStack>
                      </Box>
                    </Card>
                  ))}
              </div>
            </BlockStack>
          </Box>
        ))}
      </BlockStack>
    </Card>
  );
}

// Sample cheat sheet data
export const commonPatternsCheatSheet: CheatSheetItem[] = [
  {
    title: 'Basic Button',
    description: 'Primary action button',
    code: '<Button primary onClick={handleClick}>Save</Button>',
    category: 'Actions',
    tags: ['button', 'primary']
  },
  {
    title: 'Form Field',
    description: 'Text input with validation',
    code: `<TextField
  label="Email"
  value={email}
  onChange={setEmail}
  error={errors.email}
  requiredIndicator
/>`,
    category: 'Forms',
    tags: ['input', 'validation']
  },
  {
    title: 'Data Table',
    description: 'Simple data display',
    code: `<DataTable
  columnContentTypes={['text', 'numeric']}
  headings={['Name', 'Price']}
  rows={[['Product A', '$99.99']]}
/>`,
    category: 'Data Display',
    tags: ['table', 'data']
  },
  {
    title: 'ExtJS Grid',
    description: 'Advanced data grid with features',
    code: `<ExtDataGrid
  data={products}
  columns={[
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Price', dataIndex: 'price', width: 100 }
  ]}
  features={['sorting', 'filtering']}
/>`,
    category: 'ExtJS',
    tags: ['grid', 'advanced', 'sorting']
  },
  {
    title: 'Success Banner',
    description: 'Feedback message',
    code: `<Banner tone="success" title="Success">
  <p>Your changes have been saved.</p>
</Banner>`,
    category: 'Feedback',
    tags: ['banner', 'success']
  },
  {
    title: 'Zustand Store',
    description: 'State management setup',
    code: `const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));`,
    category: 'State',
    tags: ['zustand', 'state']
  }
];

export const typescriptPatternsCheatSheet: CheatSheetItem[] = [
  {
    title: 'Component Props',
    description: 'Type-safe component interface',
    code: `interface ProductCardProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}`,
    category: 'Components',
    tags: ['typescript', 'props']
  },
  {
    title: 'API Response',
    description: 'Type for API data',
    code: `interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}`,
    category: 'API',
    tags: ['typescript', 'api', 'generic']
  },
  {
    title: 'Form State',
    description: 'Form data with validation',
    code: `interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}`,
    category: 'Forms',
    tags: ['typescript', 'forms', 'state']
  }
];

export const hooksPatternsCheatSheet: CheatSheetItem[] = [
  {
    title: 'Data Fetching',
    description: 'React Query pattern',
    code: `const { data, isLoading, error } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
});`,
    category: 'Data',
    tags: ['react-query', 'fetch']
  },
  {
    title: 'Form Handling',
    description: 'Form state management',
    code: `const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const handleSubmit = (e) => {
  e.preventDefault();
  // Handle form submission
};`,
    category: 'Forms',
    tags: ['forms', 'state']
  },
  {
    title: 'Local Storage',
    description: 'Persist data locally',
    code: `const [theme, setTheme] = useState(() => 
  localStorage.getItem('theme') || 'light'
);

useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);`,
    category: 'Storage',
    tags: ['localStorage', 'persistence']
  }
];