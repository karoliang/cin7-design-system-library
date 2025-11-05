import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Card,
  TextField,
  Select,
  Checkbox,
  RadioButton,
  ChoiceList,
  Page,
  Layout,
  Grid,
  BlockStack,
  InlineStack,
  Tabs,
  Modal,
  DataTable,
  Pagination,
  Badge,
  Banner,
  Spinner,
  FormLayout,
  Text,
  Heading,
  DisplayText,
  Icon,
  Avatar,
  ProgressBar,
  ResourceList,
  IndexTable,
  Filters,
  IndexFilters,
  Popover,
  ActionList,
  Tooltip,
  Thumbnail,
  MediaCard,
  Divider,
  List,
  CalloutCard,
  Breadcrumbs,
  PageActions,
  Image,
  Subheading,
  Caption,
  Tag,
} from '@shopify/polaris';
import {
  SearchIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  PlusIcon,
  SaveIcon,
  CancelIcon,
  AlertIcon,
  TickIcon,
  CreditCardIcon,
  PackageIcon,
  ShippingIcon,
  ReturnIcon,
  DiscountIcon,
  NotificationIcon,
  ExportIcon,
  ImportIcon,
  SettingsIcon,
  HelpIcon,
  MobileIcon,
  DesktopIcon,
  ChevronRightIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EmailIcon,
  CustomerIcon,
  OrdersIcon,
  ProductsIcon,
  AnalyticsIcon,
  HomeIcon,
  HeartIcon,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Cin7 DSL Guides/Real World Examples',
  component: Page,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Complete, production-ready examples of common application interfaces. See how Cin7 DSL components work together to create real-world user experiences.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    example: {
      control: 'select',
      options: ['ecommerce', 'dashboard', 'customers', 'orders', 'settings'],
      description: 'Select a real-world example to explore',
    },
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <DisplayText size="large" element="h1">
        Real-World Application Examples
      </DisplayText>
      <Text as="p" tone="subdued">
        Complete, production-ready examples showing how Cin7 DSL components work together in real applications.
      </Text>

      <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="400">
        <Card>
          <BlockStack gap="200">
            <Icon source={PackageIcon} size="large" />
            <Heading>E-commerce Product Page</Heading>
            <Text>Complete product detail page with variants, reviews, and purchasing options</Text>
            <Badge tone="success">Complete</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={AnalyticsIcon} size="large" />
            <Heading>Admin Dashboard</Heading>
            <Text>Full admin interface with metrics, charts, and quick actions</Text>
            <Badge tone="success">Complete</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={CustomerIcon} size="large" />
            <Heading>Customer Management</Heading>
            <Text>Customer CRUD operations with search, filtering, and detailed views</Text>
            <Badge tone="success">Complete</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={OrdersIcon} size="large" />
            <Heading>Order Processing</Heading>
            <Text>Complete order workflow from creation to fulfillment</Text>
            <Badge tone="success">Complete</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={SettingsIcon} size="large" />
            <Heading>Settings Page</Heading>
            <Text>Application settings with forms, validation, and preferences</Text>
            <Badge tone="success">Complete</Badge>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="200">
            <Icon source={ShippingIcon} size="large" />
            <Heading>Inventory Management</Heading>
            <Text>Stock tracking, alerts, and supplier management</Text>
            <Badge tone="info">Coming Soon</Badge>
          </BlockStack>
        </Card>
      </Grid>
    </div>
  ),
};

export const EcommerceProductPage: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const product = {
      name: 'Premium Wireless Headphones',
      price: '$89.99',
      originalPrice: '$129.99',
      rating: 4.5,
      reviews: 234,
      description: 'Experience premium sound quality with our flagship wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort padding.',
      images: [
        'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/headphones-main.jpg',
        'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/headphones-side.jpg',
        'https://cdn.shopify.com/s/files/1/0262/4071/2726/files/headphones-detail.jpg',
      ],
      variants: [
        { id: 1, name: 'Black', sku: 'WH-BLK-001', price: '$89.99', inStock: true },
        { id: 2, name: 'Silver', sku: 'WH-SLV-002', price: '$89.99', inStock: true },
        { id: 3, name: 'Blue', sku: 'WH-BLU-003', price: '$89.99', inStock: false },
      ],
      features: [
        'Active Noise Cancellation',
        '30-Hour Battery Life',
        'Premium Comfort Padding',
        'Bluetooth 5.0',
        'Quick Charge Technology',
        'Built-in Microphone'
      ]
    };

    const handleAddToCart = async () => {
      setIsAddingToCart(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsAddingToCart(false);
    };

    return (
      <Page
        title={product.name}
        breadcrumbs={[
          { content: 'Home', url: '/' },
          { content: 'Electronics', url: '/electronics' },
          { content: 'Audio', url: '/electronics/audio' }
        ]}
        primaryAction={{
          content: 'Share Product',
          icon: ExportIcon,
        }}
      >
        <Layout>
          <Layout.Section>
            <Grid columns={{ sm: 1, md: 2 }} gap="600">
              <div>
                <Card>
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <Image
                      source={product.images[0]}
                      alt={product.name}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <Text fontWeight="semibold">Product Images</Text>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      {product.images.map((image, index) => (
                        <Thumbnail
                          key={index}
                          source={image}
                          alt={`Product image ${index + 1}`}
                          size="small"
                        />
                      ))}
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card>
                  <BlockStack gap="400">
                    <div>
                      <InlineStack align="space-between" wrap={false}>
                        <Heading element="h1">{product.name}</Heading>
                        <Badge tone="success">In Stock</Badge>
                      </InlineStack>
                      <InlineStack gap="200" align="center">
                        <DisplayText size="large">{product.price}</DisplayText>
                        <Text tone="subdued" textDecoration="line-through">{product.originalPrice}</Text>
                        <Badge tone="attention">30% OFF</Badge>
                      </InlineStack>
                    </div>

                    <Divider />

                    <BlockStack gap="300">
                      <Text fontWeight="semibold">Product Description</Text>
                      <Text>{product.description}</Text>
                    </BlockStack>

                    <Divider />

                    <BlockStack gap="300">
                      <Text fontWeight="semibold">Color</Text>
                      <ChoiceList
                        title="Select Color"
                        choices={product.variants.map(variant => ({
                          label: `${variant.name} (${variant.inStock ? 'In Stock' : 'Out of Stock'})`,
                          value: variant.id.toString(),
                          disabled: !variant.inStock
                        }))}
                        selected={[product.variants[selectedVariant].id.toString()]}
                        onChange={(selected) => {
                          const index = product.variants.findIndex(v => v.id.toString() === selected[0]);
                          if (index !== -1) setSelectedVariant(index);
                        }}
                      />
                    </BlockStack>

                    <BlockStack gap="300">
                      <Text fontWeight="semibold">Quantity</Text>
                      <Select
                        label="Quantity"
                        options={[
                          {label: '1', value: '1'},
                          {label: '2', value: '2'},
                          {label: '3', value: '3'},
                          {label: '4', value: '4'},
                          {label: '5', value: '5'},
                        ]}
                        value={quantity.toString()}
                        onChange={(value) => setQuantity(parseInt(value))}
                      />
                    </BlockStack>

                    <InlineStack gap="200">
                      <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        onClick={handleAddToCart}
                        loading={isAddingToCart}
                        disabled={isAddingToCart}
                      >
                        {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                      </Button>
                      <Button variant="secondary" size="large">
                        <Icon source={HeartIcon} />
                      </Button>
                    </InlineStack>

                    <BlockStack gap="200">
                      <InlineStack gap="400">
                        <InlineStack gap="200">
                          <Icon source={ShippingIcon} />
                          <Text>Free Shipping</Text>
                        </InlineStack>
                        <InlineStack gap="200">
                          <Icon source={ReturnIcon} />
                          <Text>30-Day Returns</Text>
                        </InlineStack>
                      </InlineStack>
                      <InlineStack gap="400">
                        <InlineStack gap="200">
                          <Icon source={TickIcon} />
                          <Text>In Stock</Text>
                        </InlineStack>
                        <InlineStack gap="200">
                          <Icon source={CreditCardIcon} />
                          <Text>Secure Payment</Text>
                        </InlineStack>
                      </InlineStack>
                    </BlockStack>
                  </BlockStack>
                </Card>
              </div>
            </Grid>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Heading element="h2">Product Features</Heading>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  {product.features.map((feature, index) => (
                    <InlineStack key={index} gap="200">
                      <Icon source={TickIcon} tone="success" />
                      <Text>{feature}</Text>
                    </InlineStack>
                  ))}
                </Grid>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Heading element="h2">Customer Reviews</Heading>
                  <Button variant="plain" onClick={() => setShowReviewModal(true)}>
                    Write a Review
                  </Button>
                </InlineStack>

                <InlineStack gap="200">
                  <Text fontWeight="semibold">4.5 out of 5</Text>
                  <Text tone="subdued">(234 reviews)</Text>
                </InlineStack>

                <Divider />

                <BlockStack gap="300">
                  <div style={{ padding: '20px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
                    <InlineStack gap="200" align="start">
                      <Avatar initials="JD" size="medium" />
                      <BlockStack gap="100">
                        <Text fontWeight="semibold">John Doe</Text>
                        <Text size="small" tone="subdued">Verified Purchase</Text>
                      </BlockStack>
                    </InlineStack>
                    <div style={{ marginTop: '12px' }}>
                      <Text>Amazing sound quality! The noise cancellation works perfectly, and the battery life is incredible. Highly recommend!</Text>
                    </div>
                  </div>

                  <div style={{ padding: '20px', border: '1px solid #e1e3e5', borderRadius: '8px' }}>
                    <InlineStack gap="200" align="start">
                      <Avatar initials="SM" size="medium" />
                      <BlockStack gap="100">
                        <Text fontWeight="semibold">Sarah Miller</Text>
                        <Text size="small" tone="subdued">Verified Purchase</Text>
                      </BlockStack>
                    </InlineStack>
                    <div style={{ marginTop: '12px' }}>
                      <Text>Great headphones for the price. Comfortable for long wear, and the sound quality is excellent. My only complaint is that they're a bit heavy.</Text>
                    </div>
                  </div>
                </BlockStack>

                <div style={{ textAlign: 'center' }}>
                  <Button variant="plain">Load More Reviews</Button>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Why Choose Us?</Heading>
                <BlockStack gap="200">
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>Premium Quality Products</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>30-Day Money Back Guarantee</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>24/7 Customer Support</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>Secure Shopping Experience</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Product Specifications</Heading>
                <BlockStack gap="200">
                  <InlineStack>
                    <Text fontWeight="semibold" minWidth="100px">Brand:</Text>
                    <Text>Premium Audio Co.</Text>
                  </InlineStack>
                  <InlineStack>
                    <Text fontWeight="semibold" minWidth="100px">Model:</Text>
                    <Text>WH-2024</Text>
                  </InlineStack>
                  <InlineStack>
                    <Text fontWeight="semibold" minWidth="100px">Weight:</Text>
                    <Text>280g</Text>
                  </InlineStack>
                  <InlineStack>
                    <Text fontWeight="semibold" minWidth="100px">Battery:</Text>
                    <Text>30 hours</Text>
                  </InlineStack>
                  <InlineStack>
                    <Text fontWeight="semibold" minWidth="100px">Connection:</Text>
                    <Text>Bluetooth 5.0</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        <Modal
          open={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          title="Write a Review"
          primaryAction={{
            content: 'Submit Review',
            onAction: () => setShowReviewModal(false),
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: () => setShowReviewModal(false),
            },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <Select
                label="Rating"
                options={[
                  {label: '5 stars', value: '5'},
                  {label: '4 stars', value: '4'},
                  {label: '3 stars', value: '3'},
                  {label: '2 stars', value: '2'},
                  {label: '1 star', value: '1'},
                ]}
              />
              <TextField
                label="Review Title"
                placeholder="Summarize your experience"
              />
              <TextField
                label="Your Review"
                multiline={5}
                placeholder="Tell us about your experience with this product"
              />
              <Checkbox label="I recommend this product" />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Page>
    );
  },
};

export const AdminDashboard: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [dateRange, setDateRange] = useState('7d');

    const tabs = [
      {content: 'Overview', id: 'overview'},
      {content: 'Sales', id: 'sales'},
      {content: 'Products', id: 'products'},
      {content: 'Customers', id: 'customers'},
    ];

    const metrics = {
      revenue: { value: '$45,231', change: '+12%', trend: 'up' },
      orders: { value: '1,248', change: '+8%', trend: 'up' },
      customers: { value: '523', change: '+15%', trend: 'up' },
      conversion: { value: '3.2%', change: '-2%', trend: 'down' },
    };

    const recentOrders = [
      { id: '#10234', customer: 'John Doe', amount: '$234.50', status: 'Fulfilled', date: '2025-01-10' },
      { id: '#10233', customer: 'Jane Smith', amount: '$89.99', status: 'Processing', date: '2025-01-10' },
      { id: '#10232', customer: 'Bob Johnson', amount: '$456.78', status: 'Pending', date: '2025-01-09' },
      { id: '#10231', customer: 'Alice Brown', amount: '$123.45', status: 'Fulfilled', date: '2025-01-09' },
    ];

    const topProducts = [
      { name: 'Wireless Headphones', sales: 145, revenue: '$13,005' },
      { name: 'USB-C Cable', sales: 89, revenue: '$1,156' },
      { name: 'Laptop Stand', sales: 67, revenue: '$3,015' },
      { name: 'Mouse Pad', sales: 54, revenue: '$270' },
    ];

    return (
      <Page
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your store today."
        primaryAction={{
          content: 'Export Report',
          icon: ExportIcon,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Heading element="h2">Date Range</Heading>
                  <Select
                    options={[
                      {label: 'Last 7 days', value: '7d'},
                      {label: 'Last 30 days', value: '30d'},
                      {label: 'Last 90 days', value: '90d'},
                      {label: 'Last year', value: '1y'},
                    ]}
                    value={dateRange}
                    onChange={setDateRange}
                  />
                </InlineStack>

                <Grid columns={{ sm: 1, md: 2, lg: 4 }} gap="400">
                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" tone="subdued">Total Revenue</Text>
                      <DisplayText size="medium">{metrics.revenue.value}</DisplayText>
                      <InlineStack gap="200">
                        <Icon source={ChevronRightIcon} tone={metrics.revenue.trend === 'up' ? 'success' : 'critical'} />
                        <Text tone={metrics.revenue.trend === 'up' ? 'success' : 'critical'}>
                          {metrics.revenue.change} from last period
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" tone="subdued">Total Orders</Text>
                      <DisplayText size="medium">{metrics.orders.value}</DisplayText>
                      <InlineStack gap="200">
                        <Icon source={ChevronRightIcon} tone={metrics.orders.trend === 'up' ? 'success' : 'critical'} />
                        <Text tone={metrics.orders.trend === 'up' ? 'success' : 'critical'}>
                          {metrics.orders.change} from last period
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" tone="subdued">Active Customers</Text>
                      <DisplayText size="medium">{metrics.customers.value}</DisplayText>
                      <InlineStack gap="200">
                        <Icon source={ChevronRightIcon} tone={metrics.customers.trend === 'up' ? 'success' : 'critical'} />
                        <Text tone={metrics.customers.trend === 'up' ? 'success' : 'critical'}>
                          {metrics.customers.change} from last period
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </Card>

                  <Card>
                    <BlockStack gap="200">
                      <Text as="p" tone="subdued">Conversion Rate</Text>
                      <DisplayText size="medium">{metrics.conversion.value}</DisplayText>
                      <InlineStack gap="200">
                        <Icon source={ChevronRightIcon} tone={metrics.conversion.trend === 'up' ? 'success' : 'critical'} />
                        <Text tone={metrics.conversion.trend === 'up' ? 'success' : 'critical'}>
                          {metrics.conversion.change} from last period
                        </Text>
                      </InlineStack>
                    </BlockStack>
                  </Card>
                </Grid>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Heading element="h2">Recent Orders</Heading>
                    <Button variant="plain">View all</Button>
                  </InlineStack>

                  <DataTable
                    columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
                    headings={['Order', 'Customer', 'Amount', 'Status', 'Date']}
                    rows={recentOrders.map(order => [
                      order.id,
                      order.customer,
                      order.amount,
                      order.status === 'Fulfilled' ?
                        <Badge tone="success">{order.status}</Badge> :
                        order.status === 'Processing' ?
                        <Badge tone="attention">{order.status}</Badge> :
                        <Badge tone="warning">{order.status}</Badge>,
                      order.date
                    ])}
                  />
                </BlockStack>
              </Card>
            </Tabs>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Quick Actions</Heading>
                <BlockStack gap="200">
                  <Button fullWidth icon={PlusIcon}>Add New Product</Button>
                  <Button fullWidth variant="secondary" icon={ImportIcon}>Import Products</Button>
                  <Button fullWidth variant="secondary" icon={ExportIcon}>Export Orders</Button>
                  <Button fullWidth variant="secondary" icon={SettingsIcon}>Store Settings</Button>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Top Products</Heading>
                <BlockStack gap="200">
                  {topProducts.map((product, index) => (
                    <InlineStack key={index} align="space-between">
                      <BlockStack gap="50">
                        <Text fontWeight="semibold">{product.name}</Text>
                        <Text size="small" tone="subdued">{product.sales} sold</Text>
                      </BlockStack>
                      <Text fontWeight="semibold">{product.revenue}</Text>
                    </InlineStack>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">System Status</Heading>
                <BlockStack gap="200">
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>Payment Gateway</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>Shipping Service</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Icon source={AlertIcon} tone="warning" />
                    <Text>Email Service</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Icon source={TickIcon} tone="success" />
                    <Text>Database</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const CustomerManagement: Story = {
  render: () => {
    const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
    const [queryValue, setQueryValue] = useState('');
    const [selectedView, setSelectedView] = useState('grid');

    const customers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 234-567-8900',
        totalOrders: 15,
        totalSpent: '$2,345.67',
        status: 'Active',
        lastOrder: '2025-01-10',
        avatar: 'JD'
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 234-567-8901',
        totalOrders: 8,
        totalSpent: '$892.45',
        status: 'Active',
        lastOrder: '2025-01-09',
        avatar: 'JS'
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        phone: '+1 234-567-8902',
        totalOrders: 23,
        totalSpent: '$4,567.89',
        status: 'VIP',
        lastOrder: '2025-01-08',
        avatar: 'BJ'
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice.brown@example.com',
        phone: '+1 234-567-8903',
        totalOrders: 3,
        totalSpent: '$156.78',
        status: 'Inactive',
        lastOrder: '2024-12-15',
        avatar: 'AB'
      },
    ];

    const filteredCustomers = customers.filter(customer =>
      customer.name.toLowerCase().includes(queryValue.toLowerCase()) ||
      customer.email.toLowerCase().includes(queryValue.toLowerCase())
    );

    return (
      <Page
        title="Customers"
        subtitle={`Manage ${customers.length} customers`}
        primaryAction={{
          content: 'Add Customer',
          icon: PlusIcon,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <div style={{ padding: '16px' }}>
                  <InlineStack gap="200" align="space-between">
                    <div style={{ flex: 1 }}>
                      <TextField
                        placeholder="Search customers..."
                        value={queryValue}
                        onChange={setQueryValue}
                        prefix={<Icon source={SearchIcon} />}
                        clearButton
                        onClearButtonClick={() => setQueryValue('')}
                      />
                    </div>
                    <InlineStack gap="200">
                      <Button icon={FilterIcon}>Filters</Button>
                      <Button icon={ExportIcon}>Export</Button>
                    </InlineStack>
                  </InlineStack>
                </div>

                <div style={{ padding: '0 16px' }}>
                  <InlineStack gap="400">
                    <Text as="p" tone="subdued">
                      {selectedCustomers.length > 0
                        ? `${selectedCustomers.length} customers selected`
                        : `${filteredCustomers.length} customers found`
                      }
                    </Text>
                    {selectedCustomers.length > 0 && (
                      <InlineStack gap="200">
                        <Button size="small">Export Selected</Button>
                        <Button size="small" variant="plain">Clear Selection</Button>
                      </InlineStack>
                    )}
                  </InlineStack>
                </div>

                {selectedView === 'grid' ? (
                  <div style={{ padding: '16px' }}>
                    <Grid columns={{ sm: 1, md: 2, lg: 3 }} gap="400">
                      {filteredCustomers.map(customer => (
                        <Card key={customer.id}>
                          <BlockStack gap="300">
                            <div style={{ padding: '16px' }}>
                              <InlineStack gap="200" align="start">
                                <Avatar initials={customer.avatar} size="medium" />
                                <BlockStack gap="50">
                                  <Text fontWeight="semibold">{customer.name}</Text>
                                  <Text size="small" tone="subdued">{customer.email}</Text>
                                </BlockStack>
                              </InlineStack>
                            </div>

                            <div style={{ padding: '16px', borderTop: '1px solid #e1e3e5' }}>
                              <BlockStack gap="200">
                                <InlineStack gap="200">
                                  <Icon source={OrdersIcon} />
                                  <Text size="small">{customer.totalOrders} orders</Text>
                                </InlineStack>
                                <InlineStack gap="200">
                                  <Icon source={CreditCardIcon} />
                                  <Text size="small">{customer.totalSpent} total</Text>
                                </InlineStack>
                                <InlineStack gap="200">
                                  <Icon source={ClockIcon} />
                                  <Text size="small">Last: {customer.lastOrder}</Text>
                                </InlineStack>
                              </BlockStack>
                            </div>

                            <div style={{ padding: '16px', borderTop: '1px solid #e1e3e5' }}>
                              <InlineStack gap="200">
                                <Badge tone={customer.status === 'VIP' ? 'info' : customer.status === 'Active' ? 'success' : 'warning'}>
                                  {customer.status}
                                </Badge>
                                <div style={{ marginLeft: 'auto' }}>
                                  <Popover
                                    active={false}
                                    activator={<Button icon={MenuHorizontalIcon} variant="plain" />}
                                    onClose={() => {}}
                                  >
                                    <ActionList
                                      items={[
                                        {content: 'View Details', icon: ViewIcon},
                                        {content: 'Edit', icon: EditIcon},
                                        {content: 'Send Email', icon: EmailIcon},
                                      ]}
                                    />
                                  </Popover>
                                </div>
                              </InlineStack>
                            </div>
                          </BlockStack>
                        </Card>
                      ))}
                    </Grid>
                  </div>
                ) : (
                  <IndexTable
                    resourceName={{ singular: 'customer', plural: 'customers' }}
                    itemCount={filteredCustomers.length}
                    selectedItemsCount={selectedCustomers.length}
                    onSelectionChange={setSelectedCustomers}
                    headings={[
                      { title: 'Customer' },
                      { title: 'Email' },
                      { title: 'Orders' },
                      { title: 'Total Spent' },
                      { title: 'Status' },
                      { title: 'Last Order' },
                    ]}
                  >
                    {filteredCustomers.map((customer, index) => (
                      <IndexTable.Row
                        id={customer.id}
                        key={customer.id}
                        selected={selectedCustomers.includes(customer.id)}
                        position={index}
                      >
                        <IndexTable.Cell>
                          <InlineStack gap="200">
                            <Avatar initials={customer.avatar} size="small" />
                            <Text fontWeight="semibold">{customer.name}</Text>
                          </InlineStack>
                        </IndexTable.Cell>
                        <IndexTable.Cell>{customer.email}</IndexTable.Cell>
                        <IndexTable.Cell>{customer.totalOrders}</IndexTable.Cell>
                        <IndexTable.Cell>{customer.totalSpent}</IndexTable.Cell>
                        <IndexTable.Cell>
                          <Badge tone={customer.status === 'VIP' ? 'info' : customer.status === 'Active' ? 'success' : 'warning'}>
                            {customer.status}
                          </Badge>
                        </IndexTable.Cell>
                        <IndexTable.Cell>{customer.lastOrder}</IndexTable.Cell>
                      </IndexTable.Row>
                    ))}
                  </IndexTable>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Customer Summary</Heading>
                <BlockStack gap="200">
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">Total Customers:</Text>
                    <Text>{customers.length}</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">Active Customers:</Text>
                    <Text>{customers.filter(c => c.status === 'Active').length}</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">VIP Customers:</Text>
                    <Text>{customers.filter(c => c.status === 'VIP').length}</Text>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">New This Month:</Text>
                    <Text>12</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Quick Stats</Heading>
                <BlockStack gap="200">
                  <Text fontWeight="semibold">Average Order Value:</Text>
                  <Text>$156.45</Text>

                  <Text fontWeight="semibold">Customer Lifetime Value:</Text>
                  <Text>$2,456.78</Text>

                  <Text fontWeight="semibold">Repeat Purchase Rate:</Text>
                  <Text>67%</Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const OrderProcessing: Story = {
  render: () => {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [currentTab, setCurrentTab] = useState(0);

    const tabs = [
      { content: 'New Orders', id: 'new' },
      { content: 'Processing', id: 'processing' },
      { content: 'Fulfilled', id: 'fulfilled' },
      { content: 'Returns', id: 'returns' },
    ];

    const orders = {
      new: [
        {
          id: '#10235',
          customer: 'Mike Wilson',
          date: '2025-01-11',
          amount: '$234.56',
          items: 3,
          payment: 'Paid',
          priority: 'Normal'
        },
        {
          id: '#10236',
          customer: 'Emma Davis',
          date: '2025-01-11',
          amount: '$567.89',
          items: 5,
          payment: 'Pending',
          priority: 'High'
        },
      ],
      processing: [
        {
          id: '#10234',
          customer: 'John Doe',
          date: '2025-01-10',
          amount: '$234.50',
          items: 2,
          status: 'Processing',
          estimatedDelivery: '2025-01-15'
        },
      ],
      fulfilled: [
        {
          id: '#10231',
          customer: 'Alice Brown',
          date: '2025-01-09',
          amount: '$123.45',
          items: 1,
          tracking: 'TRK123456789',
          delivered: '2025-01-10'
        },
      ],
      returns: [
        {
          id: '#10225',
          customer: 'Tom Harris',
          date: '2025-01-08',
          amount: '$89.99',
          reason: 'Wrong Size',
          status: 'Pending Approval'
        },
      ]
    };

    const currentOrders = orders[tabs[currentTab].id as keyof typeof orders] || [];

    return (
      <Page
        title="Order Management"
        subtitle="Process and track customer orders"
        primaryAction={{
          content: 'Create Order',
          icon: PlusIcon,
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Tabs tabs={tabs} selected={currentTab} onSelect={setCurrentTab} />

                <div style={{ padding: '16px' }}>
                  <InlineStack align="space-between">
                    <Text as="p" tone="subdued">
                      {selectedOrders.length > 0
                        ? `${selectedOrders.length} orders selected`
                        : `${currentOrders.length} orders`
                      }
                    </Text>
                    {selectedOrders.length > 0 && (
                      <InlineStack gap="200">
                        <Button size="small">Bulk Update</Button>
                        <Button size="small">Export Selected</Button>
                        <Button size="small" variant="plain">Clear Selection</Button>
                      </InlineStack>
                    )}
                  </InlineStack>
                </div>

                <IndexTable
                  resourceName={{ singular: 'order', plural: 'orders' }}
                  itemCount={currentOrders.length}
                  selectedItemsCount={selectedOrders.length}
                  onSelectionChange={setSelectedOrders}
                  headings={[
                    { title: 'Order' },
                    { title: 'Customer' },
                    { title: 'Date' },
                    { title: 'Amount' },
                    { title: 'Items' },
                    { title: 'Status' },
                    { title: 'Actions' },
                  ]}
                >
                  {currentOrders.map((order, index) => (
                    <IndexTable.Row
                      id={order.id}
                      key={order.id}
                      selected={selectedOrders.includes(order.id)}
                      position={index}
                    >
                      <IndexTable.Cell>
                        <Text fontWeight="semibold">{order.id}</Text>
                      </IndexTable.Cell>
                      <IndexTable.Cell>{order.customer}</IndexTable.Cell>
                      <IndexTable.Cell>{order.date}</IndexTable.Cell>
                      <IndexTable.Cell>{order.amount}</IndexTable.Cell>
                      <IndexTable.Cell>{order.items}</IndexTable.Cell>
                      <IndexTable.Cell>
                        {currentTab === 0 && (
                          <Badge tone={order.priority === 'High' ? 'critical' : 'info'}>
                            {order.priority}
                          </Badge>
                        )}
                        {currentTab === 1 && (
                          <Badge tone="attention">{order.status}</Badge>
                        )}
                        {currentTab === 2 && (
                          <Badge tone="success">Delivered</Badge>
                        )}
                        {currentTab === 3 && (
                          <Badge tone="warning">{order.status}</Badge>
                        )}
                      </IndexTable.Cell>
                      <IndexTable.Cell>
                        <InlineStack gap="200">
                          <Tooltip content="View Order">
                            <Button icon={ViewIcon} variant="plain" size="small" />
                          </Tooltip>
                          <Tooltip content="Edit Order">
                            <Button icon={EditIcon} variant="plain" size="small" />
                          </Tooltip>
                        </InlineStack>
                      </IndexTable.Cell>
                    </IndexTable.Row>
                  ))}
                </IndexTable>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Order Summary</Heading>
                <BlockStack gap="200">
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">New Orders:</Text>
                    <Badge tone="info">{orders.new.length}</Badge>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">Processing:</Text>
                    <Badge tone="attention">{orders.processing.length}</Badge>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">Fulfilled:</Text>
                    <Badge tone="success">156</Badge>
                  </InlineStack>
                  <InlineStack gap="200">
                    <Text fontWeight="semibold">Returns:</Text>
                    <Badge tone="warning">{orders.returns.length}</Badge>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Quick Actions</Heading>
                <BlockStack gap="200">
                  <Button fullWidth icon={PackageIcon}>Process Orders</Button>
                  <Button fullWidth variant="secondary" icon={ShippingIcon}>Create Shipping Labels</Button>
                  <Button fullWidth variant="secondary" icon={EmailIcon}>Send Notifications</Button>
                  <Button fullWidth variant="secondary" icon={ExportIcon}>Export Orders</Button>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Today's Stats</Heading>
                <BlockStack gap="200">
                  <Text fontWeight="semibold">Orders Received:</Text>
                  <Text>23</Text>

                  <Text fontWeight="semibold">Revenue:</Text>
                  <Text>$4,567.89</Text>

                  <Text fontWeight="semibold">Items Shipped:</Text>
                  <Text>45</Text>

                  <Text fontWeight="semibold">Pending Fulfillment:</Text>
                  <Text>8</Text>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};

export const SettingsPage: Story = {
  render: () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [settings, setSettings] = useState({
      storeName: 'My Store',
      email: 'admin@store.com',
      currency: 'USD',
      timezone: 'America/New_York',
      notifications: {
        email: true,
        sms: false,
        push: true,
        orderUpdates: true,
        lowStock: true,
        customerMessages: false,
      },
      shipping: {
        freeShippingThreshold: '50',
        defaultRate: '9.99',
        internationalRate: '19.99',
      },
      payment: {
        stripeEnabled: true,
        paypalEnabled: true,
        codEnabled: false,
      },
    });

    const tabs = [
      { content: 'General', id: 'general' },
      { content: 'Shipping', id: 'shipping' },
      { content: 'Payment', id: 'payment' },
      { content: 'Notifications', id: 'notifications' },
    ];

    return (
      <Page
        title="Settings"
        subtitle="Configure your store preferences"
        breadcrumbs={[
          { content: 'Home', url: '/' },
          { content: 'Admin', url: '/admin' },
        ]}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />

                {selectedTab === 0 && (
                  <div style={{ padding: '20px' }}>
                    <FormLayout>
                      <Heading element="h3">Store Information</Heading>

                      <TextField
                        label="Store Name"
                        value={settings.storeName}
                        onChange={(value) => setSettings({...settings, storeName: value})}
                        placeholder="Enter your store name"
                      />

                      <TextField
                        label="Store Email"
                        type="email"
                        value={settings.email}
                        onChange={(value) => setSettings({...settings, email: value})}
                        placeholder="admin@store.com"
                      />

                      <Select
                        label="Default Currency"
                        options={[
                          {label: 'USD - US Dollar', value: 'USD'},
                          {label: 'EUR - Euro', value: 'EUR'},
                          {label: 'GBP - British Pound', value: 'GBP'},
                          {label: 'CAD - Canadian Dollar', value: 'CAD'},
                        ]}
                        value={settings.currency}
                        onChange={(value) => setSettings({...settings, currency: value})}
                      />

                      <Select
                        label="Timezone"
                        options={[
                          {label: 'America/New_York', value: 'America/New_York'},
                          {label: 'America/Los_Angeles', value: 'America/Los_Angeles'},
                          {label: 'Europe/London', value: 'Europe/London'},
                          {label: 'Asia/Tokyo', value: 'Asia/Tokyo'},
                        ]}
                        value={settings.timezone}
                        onChange={(value) => setSettings({...settings, timezone: value})}
                      />
                    </FormLayout>
                  </div>
                )}

                {selectedTab === 1 && (
                  <div style={{ padding: '20px' }}>
                    <FormLayout>
                      <Heading element="h3">Shipping Settings</Heading>

                      <TextField
                        label="Free Shipping Threshold"
                        type="number"
                        prefix="$"
                        value={settings.shipping.freeShippingThreshold}
                        onChange={(value) => setSettings({
                          ...settings,
                          shipping: {...settings.shipping, freeShippingThreshold: value}
                        })}
                        helpText="Customers get free shipping when order total exceeds this amount"
                      />

                      <TextField
                        label="Default Shipping Rate"
                        type="number"
                        prefix="$"
                        value={settings.shipping.defaultRate}
                        onChange={(value) => setSettings({
                          ...settings,
                          shipping: {...settings.shipping, defaultRate: value}
                        })}
                      />

                      <TextField
                        label="International Shipping Rate"
                        type="number"
                        prefix="$"
                        value={settings.shipping.internationalRate}
                        onChange={(value) => setSettings({
                          ...settings,
                          shipping: {...settings.shipping, internationalRate: value}
                        })}
                      />
                    </FormLayout>
                  </div>
                )}

                {selectedTab === 2 && (
                  <div style={{ padding: '20px' }}>
                    <FormLayout>
                      <Heading element="h3">Payment Methods</Heading>

                      <Checkbox
                        label="Enable Stripe"
                        checked={settings.payment.stripeEnabled}
                        onChange={(value) => setSettings({
                          ...settings,
                          payment: {...settings.payment, stripeEnabled: value}
                        })}
                        helpText="Accept credit card payments via Stripe"
                      />

                      <Checkbox
                        label="Enable PayPal"
                        checked={settings.payment.paypalEnabled}
                        onChange={(value) => setSettings({
                          ...settings,
                          payment: {...settings.payment, paypalEnabled: value}
                        })}
                        helpText="Accept PayPal payments"
                      />

                      <Checkbox
                        label="Enable Cash on Delivery"
                        checked={settings.payment.codEnabled}
                        onChange={(value) => setSettings({
                          ...settings,
                          payment: {...settings.payment, codEnabled: value}
                        })}
                        helpText="Allow customers to pay on delivery"
                      />
                    </FormLayout>
                  </div>
                )}

                {selectedTab === 3 && (
                  <div style={{ padding: '20px' }}>
                    <FormLayout>
                      <Heading element="h3">Notification Preferences</Heading>

                      <BlockStack gap="300">
                        <Text fontWeight="semibold">Email Notifications</Text>
                        <Checkbox
                          label="Order confirmations"
                          checked={settings.notifications.orderUpdates}
                          onChange={(value) => setSettings({
                            ...settings,
                            notifications: {...settings.notifications, orderUpdates: value}
                          })}
                        />
                        <Checkbox
                          label="Low stock alerts"
                          checked={settings.notifications.lowStock}
                          onChange={(value) => setSettings({
                            ...settings,
                            notifications: {...settings.notifications, lowStock: value}
                          })}
                        />
                        <Checkbox
                          label="Customer messages"
                          checked={settings.notifications.customerMessages}
                          onChange={(value) => setSettings({
                            ...settings,
                            notifications: {...settings.notifications, customerMessages: value}
                          })}
                        />
                      </BlockStack>

                      <BlockStack gap="300">
                        <Text fontWeight="semibold">Other Notifications</Text>
                        <Checkbox
                          label="Push notifications"
                          checked={settings.notifications.push}
                          onChange={(value) => setSettings({
                            ...settings,
                            notifications: {...settings.notifications, push: value}
                          })}
                        />
                        <Checkbox
                          label="SMS notifications"
                          checked={settings.notifications.sms}
                          onChange={(value) => setSettings({
                            ...settings,
                            notifications: {...settings.notifications, sms: value}
                          })}
                        />
                      </BlockStack>
                    </FormLayout>
                  </div>
                )}

                <div style={{ padding: '20px', borderTop: '1px solid #e1e3e5' }}>
                  <InlineStack gap="200">
                    <Button variant="primary">Save Settings</Button>
                    <Button variant="secondary">Cancel</Button>
                  </InlineStack>
                </div>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Settings Tips</Heading>
                <BlockStack gap="200">
                  <Banner status="info">
                    <p>Regularly review your settings to ensure they match your current business needs.</p>
                  </Banner>
                  <List>
                    <List.Item>Keep your store information up to date</List.Item>
                    <List.Item>Set competitive shipping rates</List.Item>
                    <List.Item>Enable multiple payment methods</List.Item>
                    <List.Item>Configure important notifications</List.Item>
                  </List>
                </BlockStack>
              </BlockStack>
            </Card>

            <Card sectioned>
              <BlockStack gap="400">
                <Heading element="h3">Help & Support</Heading>
                <BlockStack gap="200">
                  <Button fullWidth icon={HelpIcon}>View Documentation</Button>
                  <Button fullWidth variant="secondary">Contact Support</Button>
                  <Button fullWidth variant="secondary">Video Tutorials</Button>
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  },
};