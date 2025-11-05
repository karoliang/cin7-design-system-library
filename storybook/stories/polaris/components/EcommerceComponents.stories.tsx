import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Button,
  Badge,
  Thumbnail,
  TextField,
  Select,
  Checkbox,
  Text,
  Icon,
  Stack,
  Grid,
  Divider,
  Banner,
  ButtonGroup,
  Image,
  InlineStack,
  BlockStack,
  DropZone,
  ProgressBar,
  Scrollable,
} from '@shopify/polaris';
import {
  HeartMinor,
  StarFilledMinor,
  StarOutlineMinor,
  CartMajor,
  PackageMajor,
  CheckmarkMinor,
  XMarkMinor,
  PlusMinor,
  MinusMinor,
  CreditCardMajor,
  TruckMinor,
  ReturnMajor,
  SecurityMajor,
  ClockMajor,
  AlertMinor,
  InfoMinor,
} from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

const meta = {
  title: 'Business Components/E-commerce',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive e-commerce components for product showcases, shopping cart, checkout flows, customer reviews, and inventory management. These components are optimized for conversion and user experience in business applications.',
      },
    },
  },
  tags: ['autodocs', 'business', 'ecommerce'],
  argTypes: {
    showQuickActions: {
      control: 'boolean',
      description: 'Show quick action buttons for cart and wishlist',
    },
    showReviews: {
      control: 'boolean',
      description: 'Display customer reviews and ratings',
    },
    inventoryStatus: {
      control: 'select',
      options: ['in-stock', 'low-stock', 'out-of-stock', 'pre-order'],
      description: 'Product inventory status',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample product data
const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.5,
    reviewCount: 234,
    image: 'https://picsum.photos/seed/headphones/300/300.jpg',
    inventory: 45,
    status: 'in-stock',
    badge: 'Best Seller',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', '30-hour Battery', 'Premium Sound Quality', 'Comfortable Fit'],
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    category: 'Apparel',
    price: 29.99,
    rating: 4.2,
    reviewCount: 89,
    image: 'https://picsum.photos/seed/tshirt/300/300.jpg',
    inventory: 8,
    status: 'low-stock',
    badge: 'Eco-Friendly',
    description: 'Sustainable organic cotton t-shirt in multiple colors.',
    features: ['100% Organic Cotton', 'Machine Washable', 'Multiple Colors', 'Ethically Made'],
  },
  {
    id: 3,
    name: 'Smart Fitness Watch',
    category: 'Wearables',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 156,
    image: 'https://picsum.photos/seed/watch/300/300.jpg',
    inventory: 0,
    status: 'out-of-stock',
    badge: 'New Arrival',
    description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery'],
  },
];

// Sample cart items
const initialCartItems = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    quantity: 1,
    image: 'https://picsum.photos/seed/headphones/100/100.jpg',
  },
  {
    id: 2,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    quantity: 2,
    image: 'https://picsum.photos/seed/tshirt/100/100.jpg',
  },
];

// Helper component for star ratings
const StarRating = ({ rating, size = 'small' }: { rating: number; size?: 'small' | 'medium' }) => {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const halfFilled = i === Math.floor(rating) && rating % 1 !== 0;

    return (
      <Icon
        key={i}
        source={filled ? StarFilledMinor : StarOutlineMinor}
        tone={filled ? 'text' : 'subdued'}
      />
    );
  });

  return (
    <InlineStack gap="100" align="center">
      <InlineStack gap="025">{stars}</InlineStack>
      <Text variant={size === 'small' ? 'bodySm' : 'bodyMd'} as="span">
        {rating.toFixed(1)}
      </Text>
    </InlineStack>
  );
};

// Product Showcase Component
const ProductShowcase = ({ product, showQuickActions = true, showReviews = true }: {
  product: typeof products[0];
  showQuickActions?: boolean;
  showReviews?: boolean;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('Default');

  const getInventoryBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Badge status="success">In Stock</Badge>;
      case 'low-stock':
        return <Badge status="attention">Only {product.inventory} left</Badge>;
      case 'out-of-stock':
        return <Badge status="critical">Out of Stock</Badge>;
      case 'pre-order':
        return <Badge status="info">Pre-order</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', padding: '16px' }}>
        <div>
          <Thumbnail size="large" source={product.image} alt={product.name} />
          {product.badge && (
            <div style={{ marginTop: '8px' }}>
              <Badge status="info">{product.badge}</Badge>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <Text variant="headingLg" as="h2">{product.name}</Text>
            <Text variant="bodyMd" tone="subdued">{product.category}</Text>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Text variant="headingMd" as="span">${product.price}</Text>
              {product.originalPrice && (
                <Text variant="bodyMd" tone="subdued" decoration="line-through">
                  ${product.originalPrice}
                </Text>
              )}
            </div>
            {getInventoryBadge(product.status)}
          </div>

          {showReviews && (
            <div>
              <StarRating rating={product.rating} />
              <Text variant="bodySm" tone="subdued">
                {product.reviewCount} reviews
              </Text>
            </div>
          )}

          <Text variant="bodyMd">{product.description}</Text>

          <BlockStack gap="400">
            <div>
              <Text variant="headingSm" as="h3">Features:</Text>
              <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <Text variant="bodySm">{feature}</Text>
                  </li>
                ))}
              </ul>
            </div>

            {product.status === 'in-stock' && (
              <div>
                <Text variant="headingSm" as="h3">Quantity:</Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <Button
                    size="small"
                    icon={MinusMinor}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  />
                  <TextField
                    type="number"
                    value={quantity.toString()}
                    onChange={(value) => setQuantity(Math.max(1, parseInt(value) || 1))}
                    min={1}
                    max={product.inventory}
                    align="center"
                    style={{ width: '60px' }}
                  />
                  <Button
                    size="small"
                    icon={PlusMinor}
                    onClick={() => setQuantity(Math.min(product.inventory, quantity + 1))}
                    disabled={quantity >= product.inventory}
                  />
                </div>
              </div>
            )}
          </BlockStack>

          {showQuickActions && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <Button
                primary
                size="large"
                icon={CartMajor}
                disabled={product.status === 'out-of-stock'}
                fullWidth
              >
                {product.status === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button size="large" icon={HeartMinor} variant="plain" />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// Shopping Cart Component
const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text variant="headingLg" as="h2">Shopping Cart ({cartItems.length} items)</Text>

        <div style={{ marginTop: '16px' }}>
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '16px', padding: '16px 0', borderBottom: '1px solid #e1e1e1' }}>
              <Thumbnail size="small" source={item.image} alt={item.name} />

              <div style={{ flex: 1 }}>
                <Text variant="bodyMd" fontWeight="semibold">{item.name}</Text>
                <Text variant="bodyMd">${item.price}</Text>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Button
                  size="small"
                  icon={MinusMinor}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                />
                <Text variant="bodyMd">{item.quantity}</Text>
                <Button
                  size="small"
                  icon={PlusMinor}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                />
                <Button
                  size="small"
                  icon={XMarkMinor}
                  onClick={() => updateQuantity(item.id, 0)}
                  tone="critical"
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <TextField
              placeholder="Enter promo code"
              value={promoCode}
              onChange={setPromoCode}
              autoComplete="off"
            />
            <Button>Apply</Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="bodyMd">Subtotal:</Text>
              <Text variant="bodyMd">${subtotal.toFixed(2)}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="bodyMd">Shipping:</Text>
              <Text variant="bodyMd">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="bodyMd">Tax:</Text>
              <Text variant="bodyMd">${tax.toFixed(2)}</Text>
            </div>
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text variant="headingMd" fontWeight="bold">Total:</Text>
              <Text variant="headingMd" fontWeight="bold">${total.toFixed(2)}</Text>
            </div>
          </div>

          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Button size="large" primary fullWidth>Proceed to Checkout</Button>
            <Button size="large" fullWidth variant="plain">Continue Shopping</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Checkout Flow Component
const CheckoutFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Shipping', 'Payment', 'Review'];

  return (
    <div style={{ width: '600px' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <Text variant="headingLg" as="h1">Checkout</Text>

          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 0' }}>
            {steps.map((step, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: index <= activeStep ? '#202223' : '#e1e1e1',
                    color: index <= activeStep ? 'white' : '#6d7175',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  {index < activeStep ? '✓' : index + 1}
                </div>
                <Text variant="bodyMd" fontWeight={index === activeStep ? 'semibold' : 'regular'}>
                  {step}
                </Text>
                {index < steps.length - 1 && (
                  <div style={{
                    width: '60px',
                    height: '2px',
                    backgroundColor: index < activeStep ? '#202223' : '#e1e1e1',
                    marginLeft: '16px'
                  }} />
                )}
              </div>
            ))}
          </div>

          {activeStep === 0 && (
            <div>
              <Text variant="headingMd" as="h2">Shipping Information</Text>
              <BlockStack gap="400" style={{ marginTop: '16px' }}>
                <TextField label="Email" type="email" autoComplete="email" />
                <TextField label="First Name" autoComplete="given-name" />
                <TextField label="Last Name" autoComplete="family-name" />
                <TextField label="Address" autoComplete="street-address" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <TextField label="City" autoComplete="address-level2" />
                  <TextField label="Postal Code" autoComplete="postal-code" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                  <Button onClick={() => setActiveStep(0)} disabled>Back</Button>
                  <Button primary onClick={() => setActiveStep(1)}>Continue to Payment</Button>
                </div>
              </BlockStack>
            </div>
          )}

          {activeStep === 1 && (
            <div>
              <Text variant="headingMd" as="h2">Payment Information</Text>
              <BlockStack gap="400" style={{ marginTop: '16px' }}>
                <TextField label="Card Number" prefix={<Icon source={CreditCardMajor} />} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <TextField label="Expiry Date" placeholder="MM/YY" />
                  <TextField label="CVV" />
                </div>
                <TextField label="Name on Card" />

                <Banner status="info" icon={SecurityMajor}>
                  <Text variant="bodySm">Your payment information is secure and encrypted</Text>
                </Banner>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                  <Button onClick={() => setActiveStep(0)}>Back</Button>
                  <Button primary onClick={() => setActiveStep(2)}>Review Order</Button>
                </div>
              </BlockStack>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Text variant="headingMd" as="h2">Review Order</Text>

              <div style={{ marginTop: '16px', backgroundColor: '#f8f8f8', padding: '16px', borderRadius: '8px' }}>
                <Text variant="bodyMd" fontWeight="semibold">Order Summary</Text>
                <div style={{ marginTop: '8px' }}>
                  <Text variant="bodySm">Premium Wireless Headphones × 1 - $299.99</Text>
                  <Text variant="bodySm">Organic Cotton T-Shirt × 2 - $59.98</Text>
                </div>
                <Divider />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <Text variant="bodyMd" fontWeight="bold">Total: $359.97</Text>
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <Text variant="bodySm" tone="subdued">
                  <Icon source={TruckMinor} /> Free shipping on orders over $50
                </Text>
                <Text variant="bodySm" tone="subdued">
                  <Icon source={ReturnMajor} /> 30-day return policy
                </Text>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
                <Button onClick={() => setActiveStep(1)}>Back</Button>
                <Button primary>Place Order</Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Customer Reviews Component
const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      date: '2024-11-01',
      verified: true,
      title: 'Absolutely Amazing!',
      content: 'These headphones exceeded my expectations. The sound quality is incredible and the noise cancellation works perfectly.',
      helpful: 24,
    },
    {
      id: 2,
      name: 'Mike Chen',
      rating: 4,
      date: '2024-10-28',
      verified: true,
      title: 'Great value for money',
      content: 'Excellent build quality and comfortable to wear for long periods. Battery life is as advertised.',
      helpful: 18,
    },
    {
      id: 3,
      name: 'Emily Davis',
      rating: 3,
      date: '2024-10-25',
      verified: false,
      title: 'Good but not perfect',
      content: 'Sound quality is good but I wish the padding was a bit softer. Overall satisfied with the purchase.',
      helpful: 12,
    },
  ];

  return (
    <Card>
      <div style={{ padding: '16px' }}>
        <Text variant="headingLg" as="h2">Customer Reviews</Text>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', margin: '16px 0' }}>
          <div>
            <Text variant="heading2xl" as="div">4.5</Text>
            <StarRating rating={4.5} />
            <Text variant="bodySm" tone="subdued">234 reviews</Text>
          </div>

          <div style={{ flex: 1 }}>
            {[5, 4, 3, 2, 1].map((stars) => {
              const percentage = stars === 5 ? 65 : stars === 4 ? 20 : stars === 3 ? 10 : stars === 2 ? 3 : 2;
              return (
                <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Text variant="bodySm">{stars} ★</Text>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e1e1e1', borderRadius: '4px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: '#202223',
                      }}
                    />
                  </div>
                  <Text variant="bodySm">{percentage}%</Text>
                </div>
              );
            })}
          </div>
        </div>

        <Divider />

        <div style={{ marginTop: '16px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ padding: '16px 0', borderBottom: '1px solid #e1e1e1' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Text variant="bodyMd" fontWeight="semibold">{review.name}</Text>
                    {review.verified && (
                      <Badge status="success" tone="subdued">Verified Purchase</Badge>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <StarRating rating={review.rating} size="small" />
                    <Text variant="bodySm" tone="subdued">{review.date}</Text>
                  </div>
                </div>
              </div>

              <Text variant="bodyMd" fontWeight="semibold" style={{ marginTop: '8px' }}>
                {review.title}
              </Text>
              <Text variant="bodySm" style={{ marginTop: '4px' }}>
                {review.content}
              </Text>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                <Text variant="bodySm" tone="subdued">Helpful?</Text>
                <Button size="small" variant="plain">Yes ({review.helpful})</Button>
                <Button size="small" variant="plain">No</Button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button>Load More Reviews</Button>
        </div>
      </div>
    </Card>
  );
};

// Stories
export const ProductShowcaseStory: Story = {
  render: () => (
    <div style={{ maxWidth: '900px' }}>
      <ProductShowcase product={products[0]} showQuickActions showReviews />
    </div>
  ),
};

export const ProductCatalog: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Text variant="headingXl" as="h1">Featured Products</Text>
        <Text variant="bodyLg" tone="subdued">Discover our most popular items</Text>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {products.map((product) => (
          <ProductShowcase
            key={product.id}
            product={product}
            showQuickActions
            showReviews
          />
        ))}
      </div>
    </div>
  ),
};

export const ShoppingCartView: Story = {
  render: () => <ShoppingCart />,
};

export const CheckoutProcess: Story = {
  render: () => <CheckoutFlow />,
};

export const ProductReviews: Story = {
  render: () => <CustomerReviews />,
};

export const InventoryManagement: Story = {
  render: () => {
    const inventoryItems = [
      { sku: 'WH-001', name: 'Premium Wireless Headphones', stock: 45, status: 'normal', reorder: 20 },
      { sku: 'TS-002', name: 'Organic Cotton T-Shirt', stock: 8, status: 'low', reorder: 15 },
      { sku: 'FW-003', name: 'Smart Fitness Watch', stock: 0, status: 'out', reorder: 30 },
      { sku: 'LB-004', name: 'Leather Belt', stock: 120, status: 'normal', reorder: 25 },
    ];

    const getStatusBadge = (status: string) => {
      switch (status) {
        case 'normal':
          return <Badge status="success">In Stock</Badge>;
        case 'low':
          return <Badge status="attention">Low Stock</Badge>;
        case 'out':
          return <Badge status="critical">Out of Stock</Badge>;
        default:
          return null;
      }
    };

    return (
      <Card>
        <div style={{ padding: '16px' }}>
          <Text variant="headingLg" as="h2">Inventory Management</Text>

          <div style={{ marginTop: '16px' }}>
            {inventoryItems.map((item) => (
              <div key={item.sku} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr auto',
                gap: '16px',
                padding: '12px 0',
                borderBottom: '1px solid #e1e1e1',
                alignItems: 'center'
              }}>
                <div>
                  <Text variant="bodySm" tone="subdued">SKU</Text>
                  <Text variant="bodyMd" fontWeight="semibold">{item.sku}</Text>
                </div>
                <div>
                  <Text variant="bodySm" tone="subdued">Product</Text>
                  <Text variant="bodyMd">{item.name}</Text>
                </div>
                <div>
                  <Text variant="bodySm" tone="subdued">Stock Level</Text>
                  <Text variant="bodyMd">{item.stock}</Text>
                </div>
                <div>
                  <Text variant="bodySm" tone="subdued">Status</Text>
                  {getStatusBadge(item.status)}
                </div>
                <div>
                  <Text variant="bodySm" tone="subdued">Reorder At</Text>
                  <Text variant="bodyMd">{item.reorder}</Text>
                </div>
                <div>
                  {item.stock <= item.reorder && (
                    <Button size="small" primary>Reorder</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  },
};

export const ProductComparison: Story = {
  render: () => {
    const comparisonProducts = products.slice(0, 3);
    const features = [
      'Price',
      'Rating',
      'Warranty',
      'Battery Life',
      'Water Resistance',
      'Connectivity',
      'Special Features',
    ];

    return (
      <div style={{ maxWidth: '1200px', overflowX: 'auto' }}>
        <Card>
          <div style={{ padding: '16px' }}>
            <Text variant="headingLg" as="h2">Product Comparison</Text>

            <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '200px repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <Text variant="bodySm" tone="subdued">Feature</Text>
              </div>
              {comparisonProducts.map((product) => (
                <div key={product.id} style={{ textAlign: 'center' }}>
                  <Thumbnail size="small" source={product.image} alt={product.name} />
                  <Text variant="bodySm" fontWeight="semibold">{product.name}</Text>
                </div>
              ))}

              {features.map((feature, index) => (
                <React.Fragment key={feature}>
                  <div style={{ padding: '12px 0', borderTop: '1px solid #e1e1e1' }}>
                    <Text variant="bodySm">{feature}</Text>
                  </div>
                  {comparisonProducts.map((product) => (
                    <div key={`${product.id}-${index}`} style={{
                      padding: '12px 0',
                      borderTop: '1px solid #e1e1e1',
                      textAlign: 'center'
                    }}>
                      <Text variant="bodySm">
                        {index === 0 && `$${product.price}`}
                        {index === 1 && <StarRating rating={product.rating} size="small" />}
                        {index === 2 && product.id === 1 ? '2 Years' : product.id === 2 ? '1 Year' : '18 Months'}
                        {index === 3 && (product.id === 1 ? '30 hours' : product.id === 3 ? '7 days' : 'N/A')}
                        {index === 4 && (product.id === 1 || product.id === 3 ? '✓ Yes' : '✗ No')}
                        {index === 5 && 'Bluetooth 5.0'}
                        {index === 6 && product.features[0]}
                      </Text>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </Card>
      </div>
    );
  },
};