import React, { useState } from 'react';
import {
  AppProvider,
  Page,
  Layout,
  Card,
  Select,
  Button,
  BlockStack,
  InlineStack,
  Divider,
  Text,
  Box,
  Banner,
  Badge,
  TextField,
  Checkbox,
  ButtonGroup,
  Spinner,
  IndexTable,
  Form,
  FormLayout,
  Modal,
  DataTable,
} from '@shopify/polaris';
import * as Polaris from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { themes } from 'prism-react-renderer';
import PageMeta from '../src/components/PageMeta';
import styles from '../src/styles/Playground.module.scss';
import { trackPlaygroundUsage, trackCodeCopy } from '../src/utils/analytics';
import { usePageTracking } from '../src/utils/usePageTracking';


const componentExamples: Record<string, string> = {
  Button: `function Example() {
  const [count, setCount] = useState(0);
  
  return (
    <BlockStack gap="400">
      <Text as="h2" variant="headingMd">Button Counter Example</Text>
      <p>You clicked {count} times</p>
      <InlineStack gap="400">
        <Button primary onClick={() => setCount(count + 1)}>
          Increment
        </Button>
        <Button onClick={() => setCount(0)}>
          Reset
        </Button>
      </InlineStack>
    </BlockStack>
  );
}`,
  'ExtJS DataGrid': `function Example() {
  // Simulating ExtJS DataGrid with Cin7 DSL
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });
  
  const data = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  ];
  
  const handleSort = (field) => {
    const direction = sortConfig.field === field && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ field, direction });
  };
  
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.field) return 0;
    const aVal = a[sortConfig.field];
    const bVal = b[sortConfig.field];
    return sortConfig.direction === 'asc' 
      ? aVal > bVal ? 1 : -1
      : aVal < bVal ? 1 : -1;
  });
  
  return (
    <Card title="ExtJS-Style Data Grid Example">
      <BlockStack gap="400">
        <Banner tone="info">
          <p>This simulates ExtJS DataGrid features integrated with Cin7 DSL</p>
        </Banner>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--p-color-bg-surface-secondary)' }}>
                <th style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === data.length}
                    onChange={(e) => setSelectedRows(e.target.checked ? data.map(d => d.id) : [])}
                  />
                </th>
                {['Name', 'Email', 'Role', 'Status'].map((header, idx) => (
                  <th
                    key={header}
                    style={{ padding: '12px', textAlign: 'left', cursor: 'pointer' }}
                    onClick={() => handleSort(header.toLowerCase())}
                  >
                    {header} {sortConfig.field === header.toLowerCase() && (
                      sortConfig.direction === 'asc' ? '↑' : '↓'
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row) => (
                <tr
                  key={row.id}
                  style={{
                    backgroundColor: selectedRows.includes(row.id) 
                      ? 'var(--p-color-bg-surface-selected)' 
                      : 'transparent',
                    borderBottom: '1px solid var(--p-color-border-subdued)'
                  }}
                >
                  <td style={{ padding: '12px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows([...selectedRows, row.id]);
                        } else {
                          setSelectedRows(selectedRows.filter(id => id !== row.id));
                        }
                      }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>{row.name}</td>
                  <td style={{ padding: '12px' }}>{row.email}</td>
                  <td style={{ padding: '12px' }}>{row.role}</td>
                  <td style={{ padding: '12px' }}>
                    <Badge tone={row.status === 'Active' ? 'success' : 'critical'}>
                      {row.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Text variant="bodySm" tone="subdued">
          Selected rows: {selectedRows.length} | Features: Sorting, Multi-select, Status badges
        </Text>
      </BlockStack>
    </Card>
  );
}`,
  'ExtJS Form': `function Example() {
  // Simulating ExtJS Form with Cin7 DSL validation
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'user',
    startDate: '',
    salary: '',
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const validate = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'fullName':
        if (!value || value.length < 3) {
          newErrors.fullName = 'Name must be at least 3 characters';
        } else {
          delete newErrors.fullName;
        }
        break;
      case 'email':
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!value || !emailRegex.test(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      case 'password':
        if (!value || value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
        } else {
          delete newErrors.password;
        }
        break;
      case 'salary':
        if (value && (isNaN(value) || value < 0)) {
          newErrors.salary = 'Please enter a valid salary';
        } else {
          delete newErrors.salary;
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      validate(field, value);
    }
  };
  
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validate(field, formData[field]);
  };
  
  const handleSubmit = () => {
    const allTouched = {};
    Object.keys(formData).forEach(key => allTouched[key] = true);
    setTouched(allTouched);
    
    let isValid = true;
    Object.keys(formData).forEach(key => {
      if (!validate(key, formData[key])) {
        isValid = false;
      }
    });
    
    if (isValid) {
      alert('Form submitted successfully!');
    }
  };
  
  return (
    <Card title="ExtJS-Style Form with Validation">
      <BlockStack gap="400">
        <TextField
          label="Full Name"
          value={formData.fullName}
          onChange={(value) => handleChange('fullName', value)}
          onBlur={() => handleBlur('fullName')}
          error={touched.fullName && errors.fullName}
          requiredIndicator
        />
        
        <TextField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
          error={touched.email && errors.email}
          requiredIndicator
        />
        
        <TextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
          error={touched.password && errors.password}
          helpText="Must contain uppercase, lowercase, and numbers"
          requiredIndicator
        />
        
        <Select
          label="User Role"
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Manager', value: 'manager' },
            { label: 'User', value: 'user' },
            { label: 'Guest', value: 'guest' },
          ]}
          value={formData.role}
          onChange={(value) => handleChange('role', value)}
        />
        
        <TextField
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(value) => handleChange('startDate', value)}
        />
        
        <TextField
          label="Salary"
          type="number"
          prefix="$"
          value={formData.salary}
          onChange={(value) => handleChange('salary', value)}
          onBlur={() => handleBlur('salary')}
          error={touched.salary && errors.salary}
        />
        
        <InlineStack gap="400">
          <Button
            onClick={() => {
              setFormData({
                fullName: '',
                email: '',
                password: '',
                role: 'user',
                startDate: '',
                salary: '',
              });
              setErrors({});
              setTouched({});
            }}
          >
            Reset
          </Button>
          <Button primary onClick={handleSubmit}>
            Submit
          </Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}`,
  Card: `function Example() {
  return (
    <Card 
      title="Product Information"
      footerActions={[
        { content: 'Cancel' },
        { content: 'Save', primary: true }
      ]}
    >
      <BlockStack gap="400">
        <TextField label="Product Name" value="Wireless Headphones" />
        <TextField label="Price" type="number" value="99.99" prefix="$" />
        <Select
          label="Category"
          options={[
            { label: 'Electronics', value: 'electronics' },
            { label: 'Accessories', value: 'accessories' },
          ]}
          value="electronics"
        />
      </BlockStack>
    </Card>
  );
}`,
  DataTable: `function Example() {
  const rows = [
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    ['Navy Merino Wool Blazer', '$445.00', 124518, 32, '$14,240.00'],
  ];

  return (
    <Card title="Sales by Product">
      <DataTable
        columnContentTypes={[
          'text',
          'numeric',
          'numeric',
          'numeric',
          'numeric',
        ]}
        headings={[
          'Product',
          'Price',
          'SKU Number',
          'Quantity',
          'Net Sales',
        ]}
        rows={rows}
        totals={['', '', '', 255, '$155,830.00']}
        showTotalsInFooter
      />
    </Card>
  );
}`,
  Form: `function Example() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  
  const handleSubmit = () => {
    console.log('Form submitted:', { email, password, newsletter });
  };

  return (
    <Card title="Sign Up">
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            helpText="Must be at least 8 characters"
            required
          />
          <Checkbox
            label="Subscribe to newsletter"
            checked={newsletter}
            onChange={setNewsletter}
          />
          <Button primary submit>
            Create Account
          </Button>
        </FormLayout>
      </Form>
    </Card>
  );
}`,
  Modal: `function Example() {
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState('');

  const handleChange = () => setActive(!active);

  const activator = <Button onClick={handleChange}>Open Modal</Button>;

  return (
    <>
      {activator}
      <Modal
        activator={activator}
        open={active}
        onClose={handleChange}
        title="Subscribe to Newsletter"
        primaryAction={{
          content: 'Subscribe',
          onAction: handleChange,
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleChange,
          },
        ]}
      >
        <Modal.Section>
          <BlockStack gap="400">
            <Text as="p" variant="bodyMd">
              Join our newsletter to stay updated with the latest news and updates.
            </Text>
            <TextField
              label="Email address"
              value={email}
              onChange={setEmail}
              autoComplete="email"
              type="email"
            />
          </BlockStack>
        </Modal.Section>
      </Modal>
    </>
  );
}`,
  'Zustand State': `function Example() {
  // Simulating Zustand state management with Cin7 DSL
  // In real app, this would be imported from a store file
  const useStore = () => {
    const [state, setState] = useState({
      tasks: [
        { id: 1, text: 'Implement ExtJS Grid', completed: true },
        { id: 2, text: 'Add Vanilla JS utils', completed: true },
        { id: 3, text: 'Write TypeScript types', completed: false },
        { id: 4, text: 'Test Cin7 DSL integration', completed: false },
      ],
      filter: 'all', // all, active, completed
    });
    
    const addTask = (text) => {
      setState(prev => ({
        ...prev,
        tasks: [...prev.tasks, { id: Date.now(), text, completed: false }]
      }));
    };
    
    const toggleTask = (id) => {
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.map(task => 
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      }));
    };
    
    const deleteTask = (id) => {
      setState(prev => ({
        ...prev,
        tasks: prev.tasks.filter(task => task.id !== id)
      }));
    };
    
    const setFilter = (filter) => {
      setState(prev => ({ ...prev, filter }));
    };
    
    return { ...state, addTask, toggleTask, deleteTask, setFilter };
  };
  
  const store = useStore();
  const [newTask, setNewTask] = useState('');
  
  const filteredTasks = store.tasks.filter(task => {
    if (store.filter === 'active') return !task.completed;
    if (store.filter === 'completed') return task.completed;
    return true;
  });
  
  const stats = {
    total: store.tasks.length,
    completed: store.tasks.filter(t => t.completed).length,
    active: store.tasks.filter(t => !t.completed).length,
  };
  
  return (
    <Card title="Task Manager with State Management">
      <BlockStack gap="400">
        <Banner tone="info" title="Cin7 DSL State Pattern">
          <p>This demonstrates state management patterns used in Cin7 DSL applications</p>
        </Banner>
        
        <InlineStack gap="400" align="end">
          <TextField
            label="New Task"
            labelHidden
            value={newTask}
            onChange={setNewTask}
            placeholder="Add a new task..."
            connectedRight={
              <Button
                primary
                onClick={() => {
                  if (newTask.trim()) {
                    store.addTask(newTask);
                    setNewTask('');
                  }
                }}
              >
                Add Task
              </Button>
            }
          />
        </InlineStack>
        
        <ButtonGroup segmented>
          <Button
            pressed={store.filter === 'all'}
            onClick={() => store.setFilter('all')}
          >
            All ({stats.total})
          </Button>
          <Button
            pressed={store.filter === 'active'}
            onClick={() => store.setFilter('active')}
          >
            Active ({stats.active})
          </Button>
          <Button
            pressed={store.filter === 'completed'}
            onClick={() => store.setFilter('completed')}
          >
            Completed ({stats.completed})
          </Button>
        </ButtonGroup>
        
        <BlockStack gap="200">
          {filteredTasks.map(task => (
            <InlineStack key={task.id} align="space-between" blockAlign="center">
              <Checkbox
                label={task.text}
                checked={task.completed}
                onChange={() => store.toggleTask(task.id)}
              />
              <Button
                plain
                destructive
                onClick={() => store.deleteTask(task.id)}
              >
                Delete
              </Button>
            </InlineStack>
          ))}
        </BlockStack>
        
        {filteredTasks.length === 0 && (
          <Text tone="subdued" alignment="center">
            No {store.filter !== 'all' ? store.filter : ''} tasks
          </Text>
        )}
      </BlockStack>
    </Card>
  );
}`,
  'React Query': `function Example() {
  // Simulating React Query data fetching with Cin7 DSL
  // In real app, this would use actual React Query hooks
  const useProducts = () => {
    const [state, setState] = useState({
      data: null,
      isLoading: true,
      error: null,
    });
    
    useEffect(() => {
      // Simulate API call
      setTimeout(() => {
        setState({
          data: [
            { id: 1, name: 'Wireless Headphones', price: 99.99, stock: 45, category: 'Electronics' },
            { id: 2, name: 'Smart Watch', price: 249.99, stock: 12, category: 'Electronics' },
            { id: 3, name: 'Coffee Maker', price: 79.99, stock: 23, category: 'Appliances' },
            { id: 4, name: 'Yoga Mat', price: 29.99, stock: 67, category: 'Sports' },
          ],
          isLoading: false,
          error: null,
        });
      }, 1000);
    }, []);
    
    const updateStock = (id, newStock) => {
      setState(prev => ({
        ...prev,
        data: prev.data.map(product => 
          product.id === id ? { ...product, stock: newStock } : product
        )
      }));
    };
    
    return { ...state, updateStock };
  };
  
  const { data: products, isLoading, error, updateStock } = useProducts();
  const [editingId, setEditingId] = useState(null);
  const [tempStock, setTempStock] = useState('');
  
  if (isLoading) {
    return (
      <Card>
        <BlockStack gap="400" align="center">
          <Spinner accessibilityLabel="Loading products" />
          <Text>Loading products...</Text>
        </BlockStack>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Banner tone="critical" title="Error loading products">
        <p>{error}</p>
      </Banner>
    );
  }
  
  return (
    <Card title="Product Inventory (React Query Pattern)">
      <BlockStack gap="400">
        <Text tone="subdued">
          Demonstrating data fetching and caching patterns in Cin7 DSL
        </Text>
        
        <IndexTable
          resourceName={{ singular: 'product', plural: 'products' }}
          itemCount={products.length}
          headings={[
            { title: 'Product' },
            { title: 'Price', alignment: 'end' },
            { title: 'Stock', alignment: 'end' },
            { title: 'Category' },
            { title: 'Actions', alignment: 'center' },
          ]}
          selectable={false}
        >
          {products.map((product) => (
            <IndexTable.Row
              id={product.id}
              key={product.id}
              position={product.id}
            >
              <IndexTable.Cell>
                <Text variant="bodyMd" fontWeight="semibold">
                  {product.name}
                </Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Text alignment="end">${product.price.toFixed(2)}</Text>
              </IndexTable.Cell>
              <IndexTable.Cell>
                {editingId === product.id ? (
                  <TextField
                    label="Stock"
                    labelHidden
                    type="number"
                    value={tempStock}
                    onChange={setTempStock}
                    autoComplete="off"
                  />
                ) : (
                  <Text alignment="end">
                    <Badge
                      tone={product.stock < 20 ? 'warning' : 'success'}
                    >
                      {product.stock} units
                    </Badge>
                  </Text>
                )}
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Badge>{product.category}</Badge>
              </IndexTable.Cell>
              <IndexTable.Cell>
                {editingId === product.id ? (
                  <ButtonGroup>
                    <Button
                      size="slim"
                      onClick={() => {
                        updateStock(product.id, parseInt(tempStock));
                        setEditingId(null);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      size="slim"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                ) : (
                  <Button
                    size="slim"
                    onClick={() => {
                      setEditingId(product.id);
                      setTempStock(product.stock.toString());
                    }}
                  >
                    Update Stock
                  </Button>
                )}
              </IndexTable.Cell>
            </IndexTable.Row>
          ))}
        </IndexTable>
      </BlockStack>
    </Card>
  );
}`,
  'Cin7 DSL Dashboard': `function Example() {
  // Comprehensive dashboard combining Cin7 DSL patterns
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [isLoading, setIsLoading] = useState(false);
  
  const metrics = {
    revenue: { value: '$124,589', change: '+12.3%', positive: true },
    orders: { value: '1,847', change: '+8.1%', positive: true },
    customers: { value: '892', change: '-2.4%', positive: false },
    inventory: { value: '14,203', change: '+5.7%', positive: true },
  };
  
  const currentMetric = metrics[selectedMetric];
  
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };
  
  return (
    <Card>
      <BlockStack gap="500">
        <InlineStack align="space-between" blockAlign="center">
          <Text variant="headingLg" as="h2">Enterprise Dashboard</Text>
          <InlineStack gap="400">
            <Select
              label="Time Range"
              labelInline
              options={[
                { label: 'Last 7 days', value: '7days' },
                { label: 'Last 30 days', value: '30days' },
                { label: 'Last quarter', value: 'quarter' },
                { label: 'Year to date', value: 'ytd' },
              ]}
              value={timeRange}
              onChange={setTimeRange}
            />
            <Button onClick={handleRefresh} loading={isLoading}>
              Refresh
            </Button>
          </InlineStack>
        </InlineStack>
        
        <Divider />
        
        <BlockStack gap="400">
          <Text variant="headingMd">Key Metrics</Text>
          <ButtonGroup segmented>
            {Object.keys(metrics).map(key => (
              <Button
                key={key}
                pressed={selectedMetric === key}
                onClick={() => setSelectedMetric(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </ButtonGroup>
          
          <Card sectioned>
            <BlockStack gap="200">
              <Text variant="headingXl" as="h3">
                {currentMetric.value}
              </Text>
              <Badge tone={currentMetric.positive ? 'success' : 'critical'}>
                {currentMetric.change}
              </Badge>
            </BlockStack>
          </Card>
        </BlockStack>
        
        <Divider />
        
        <BlockStack gap="400">
          <Text variant="headingMd">Recent Activity</Text>
          <Card sectioned>
            <BlockStack gap="300">
              {[
                { action: 'New order #1234', time: '2 minutes ago', icon: '📦' },
                { action: 'Customer registration', time: '15 minutes ago', icon: '👤' },
                { action: 'Inventory update', time: '1 hour ago', icon: '📊' },
                { action: 'System backup completed', time: '3 hours ago', icon: '✅' },
              ].map((activity, index) => (
                <InlineStack key={index} align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    <Text variant="bodyLg">{activity.icon}</Text>
                    <Text>{activity.action}</Text>
                  </InlineStack>
                  <Text variant="bodySm" tone="subdued">
                    {activity.time}
                  </Text>
                </InlineStack>
              ))}
            </BlockStack>
          </Card>
        </BlockStack>
        
        <Banner
          title="Cin7 DSL Features"
          tone="info"
          onDismiss={() => {}}
        >
          <p>This dashboard demonstrates ExtJS grid patterns, Vanilla JS performance, TypeScript type safety, and Zustand state management - all integrated seamlessly with Shopify Polaris components.</p>
        </Banner>
      </BlockStack>
    </Card>
  );
}`,
  'Vanilla JS Integration': `function Example() {
  // Demonstrating Vanilla JS integration in Cin7 DSL
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (!canvasRef.current || !isAnimating) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let hue = 0;
    
    // Vanilla JS animation function
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 50;
      
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + (hue * 0.01);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = \`hsl(\${hue}, 100%, 50%)\`;
        ctx.fill();
      }
      
      hue = (hue + 1) % 360;
      animationId = requestAnimationFrame(animate);
    };
    
    // Initialize canvas
    canvas.width = 300;
    canvas.height = 200;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();
    
    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAnimating]);
  
  // DOM manipulation example
  const handleDOMManipulation = () => {
    const elements = document.querySelectorAll('[data-demo-element]');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.transform = 'scale(1.1)';
        el.style.transition = 'transform 0.3s ease';
        
        setTimeout(() => {
          el.style.transform = 'scale(1)';
        }, 300);
      }, index * 100);
    });
  };
  
  return (
    <Card title="Vanilla JavaScript Integration">
      <BlockStack gap="400">
        <Banner tone="info">
          <p>Cin7 DSL supports seamless Vanilla JS integration for performance-critical operations</p>
        </Banner>
        
        <BlockStack gap="200">
          <Text variant="headingMd">Canvas Animation</Text>
          <div style={{ 
            border: '1px solid var(--p-color-border-subdued)', 
            borderRadius: 'var(--p-border-radius-200)',
            overflow: 'hidden'
          }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%' }} />
          </div>
          <Button onClick={() => setIsAnimating(!isAnimating)}>
            {isAnimating ? 'Stop' : 'Start'} Animation
          </Button>
        </BlockStack>
        
        <Divider />
        
        <BlockStack gap="200">
          <Text variant="headingMd">DOM Manipulation</Text>
          <InlineStack gap="200">
            <Badge data-demo-element>ExtJS</Badge>
            <Badge data-demo-element tone="success">Vanilla JS</Badge>
            <Badge data-demo-element tone="info">TypeScript</Badge>
            <Badge data-demo-element tone="warning">React</Badge>
          </InlineStack>
          <Button onClick={handleDOMManipulation}>
            Animate Elements
          </Button>
        </BlockStack>
        
        <Divider />
        
        <BlockStack gap="200">
          <Text variant="headingMd">Event Handling</Text>
          <TextField
            label="Debounced Input"
            placeholder="Type to see debouncing..."
            onChange={(value) => {
              // In real app, this would use a proper debounce utility
              console.log('Input changed:', value);
            }}
            helpText="Updates are debounced for performance"
          />
        </BlockStack>
      </BlockStack>
    </Card>
  );
}`,
};

const defaultCode = componentExamples.Button;

function PlaygroundPage() {
  const [code, setCode] = useState(defaultCode);
  const [selectedExample, setSelectedExample] = useState('Button');
  const [showCode, setShowCode] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track page engagement
  usePageTracking({
    trackScrollDepth: true,
    trackTimeOnPage: true,
  });

  const scope = {
    ...React,
    ...Polaris,
    useState: React.useState,
    useEffect: React.useEffect,
    useCallback: React.useCallback,
    useMemo: React.useMemo,
    useRef: React.useRef,
  };

  const handleExampleChange = (value: string) => {
    setSelectedExample(value);
    setCode(componentExamples[value] || defaultCode);
    setError(null);
    // Track example selection
    trackPlaygroundUsage('example_selected', value);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    // Track code copy
    trackCodeCopy('playground', selectedExample, 'jsx');
    trackPlaygroundUsage('copy', selectedExample);
  };

  const handleResetCode = () => {
    setCode(componentExamples[selectedExample] || defaultCode);
    setError(null);
    // Track reset action
    trackPlaygroundUsage('reset', selectedExample);
  };

  return (
    <AppProvider i18n={translations}>
      <PageMeta
        title="Component Playground"
        description="Interactive playground for experimenting with Cin7 DSL components. Test React components, ExtJS integration, TypeScript patterns, and Vanilla JavaScript in real-time with live preview."
        keywords={['playground', 'interactive', 'live coding', 'components', 'testing', 'examples', 'ExtJS', 'React', 'TypeScript']}
        ogType="website"
      />
      <Page
        title="Component Playground"
        subtitle="Experiment with Cin7 DSL components in real-time"
        fullWidth
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack>
                    <Select
                      label="Choose Example"
                      labelInline
                      options={Object.keys(componentExamples).map((key) => ({
                        label: key,
                        value: key,
                      }))}
                      value={selectedExample}
                      onChange={handleExampleChange}
                    />
                    <Button variant="plain" onClick={() => setShowCode(!showCode)}>
                      {showCode ? 'Hide Code' : 'Show Code'}
                    </Button>
                  </InlineStack>
                  <InlineStack>
                    <Button variant="plain" onClick={handleCopyCode}>
                      Copy Code
                    </Button>
                    <Button variant="plain" onClick={handleResetCode}>
                      Reset
                    </Button>
                  </InlineStack>
                </InlineStack>

                <Divider />

                <div className={styles.PlaygroundContainer}>
                  <LiveProvider
                    code={code}
                    scope={scope}
                    theme={themes.vsLight}
                  >
                    <div className={styles.EditorSection}>
                      {showCode && (
                        <div className={styles.Editor}>
                          <LiveEditor
                            className={styles.LiveEditor}
                            style={{
                              fontFamily: 'Monaco, monospace',
                              fontSize: 14,
                            }}
                          />
                        </div>
                      )}
                      <LiveError className={styles.Error} />
                    </div>

                    <div className={styles.PreviewSection}>
                      <Text variant="headingMd" as="h3">
                        Preview
                      </Text>
                      <Box
                        background="bg-surface"
                        padding="400"
                        borderRadius="200"
                        borderColor="border"
                        borderWidth="025"
                      >
                        <LivePreview />
                      </Box>
                    </div>
                  </LiveProvider>
                </div>

                {error && (
                  <Banner tone="critical" title="Error">
                    {error}
                  </Banner>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">Available Components</Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  All Polaris components are available in the playground:
                </Text>
                <ul className={styles.ComponentList}>
                  <li>AppProvider</li>
                  <li>Badge</li>
                  <li>Banner</li>
                  <li>Button</li>
                  <li>ButtonGroup</li>
                  <li>Card</li>
                  <li>Checkbox</li>
                  <li>DataTable</li>
                  <li>Form</li>
                  <li>FormLayout</li>
                  <li>Layout</li>
                  <li>Modal</li>
                  <li>Page</li>
                  <li>Select</li>
                  <li>BlockStack</li>
                  <li>InlineStack</li>
                  <li>Text</li>
                  <li>TextField</li>
                  <li>...and many more!</li>
                </ul>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="200">
                <Text as="h3" variant="headingMd">Tips</Text>
                <Text as="p" variant="bodySm">
                  • Use React hooks like useState and useEffect
                </Text>
                <Text as="p" variant="bodySm">
                  • All Polaris components are available
                </Text>
                <Text as="p" variant="bodySm">
                  • Your component must be named &quot;Example&quot;
                </Text>
                <Text as="p" variant="bodySm">
                  • Changes are reflected in real-time
                </Text>
                <Text as="p" variant="bodySm">
                  • Use Cmd/Ctrl + S to format code
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </AppProvider>
  );
}

export default PlaygroundPage;