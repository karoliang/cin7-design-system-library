import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  TextField,
  Select,
  Grid,
  Banner,
  List,
  Divider,
  Icon,
} from '@shopify/polaris';
import {
  CodeIcon,
  CheckIcon,
  AlertCircleIcon,
  PlayIcon,
  BugIcon,
  ClipboardCheckIcon,
} from '@shopify/polaris-icons';
import React, { useState } from 'react';

const meta = {
  title: 'Cin7 DSL/03 UI Patterns/Testing Examples',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Interactive examples demonstrating testing strategies for the Cin7 DSL framework. Learn how to test React components, TypeScript services, Vanilla JS utilities, and cross-layer integration.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnitTestingReact: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BlockStack gap="400">
        <div>
          <Text variant="heading3xl" as="h1">Unit Testing React Components</Text>
          <Text as="p" tone="subdued">
            Learn how to test Polaris components using Vitest and React Testing Library
          </Text>
        </div>

        <Divider />

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start">
              <Icon source={CodeIcon} size="large" />
              <BlockStack gap="200">
                <Text variant="headingXl" as="h2">Component Under Test</Text>
                <Text tone="subdued">A simple ProductCard component to demonstrate testing</Text>
              </BlockStack>
            </InlineStack>

            <Banner>
              <p>
                This example shows how to test a React component that uses Polaris components.
                We'll test rendering, user interactions, and conditional rendering.
              </p>
            </Banner>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Component Code</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  maxHeight: '500px',
                  marginTop: '8px',
                }}>
{`// ProductCard.tsx
import { Card, Text, Badge, Button, BlockStack } from '@shopify/polaris';

interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card>
      <BlockStack gap="300">
        <InlineStack align="space-between">
          <Text variant="headingMd" as="h3">
            {product.name}
          </Text>
          <Badge tone={product.inStock ? 'success' : 'critical'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </InlineStack>

        <Text fontWeight="semibold">
          \${product.price.toFixed(2)}
        </Text>

        <Button
          variant="primary"
          onClick={() => onAddToCart?.(product)}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
      </BlockStack>
    </Card>
  );
};`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">Test Code</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  maxHeight: '500px',
                  marginTop: '8px',
                  border: '1px solid #86efac',
                }}>
{`// ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Wireless Headphones',
    price: 89.99,
    inStock: true,
  };

  it('renders product information', () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText('Wireless Headphones')
    ).toBeInTheDocument();

    expect(
      screen.getByText('$89.99')
    ).toBeInTheDocument();

    expect(
      screen.getByText('In Stock')
    ).toBeInTheDocument();
  });

  it('calls onAddToCart when clicked', () => {
    const onAddToCart = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={onAddToCart}
      />
    );

    fireEvent.click(
      screen.getByText('Add to Cart')
    );

    expect(onAddToCart).toHaveBeenCalledWith(
      mockProduct
    );
  });

  it('shows out of stock badge', () => {
    const outOfStock = {
      ...mockProduct,
      inStock: false
    };
    render(<ProductCard product={outOfStock} />);

    expect(
      screen.getByText('Out of Stock')
    ).toBeInTheDocument();

    const button = screen.getByText('Add to Cart');
    expect(button).toBeDisabled();
  });
});`}
                </pre>
              </div>
            </Grid>

            <Card background="bg-fill-success-secondary">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">✅ Key Testing Concepts</Text>
                <List type="bullet">
                  <List.Item><strong>render()</strong> - Renders the component in a test environment</List.Item>
                  <List.Item><strong>screen.getByText()</strong> - Finds elements by their text content</List.Item>
                  <List.Item><strong>fireEvent.click()</strong> - Simulates user click interactions</List.Item>
                  <List.Item><strong>vi.fn()</strong> - Creates mock functions to verify calls</List.Item>
                  <List.Item><strong>expect().toBeInTheDocument()</strong> - Verifies element presence</List.Item>
                  <List.Item><strong>expect().toBeDisabled()</strong> - Verifies button state</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h2">Testing Form Components</Text>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Form Test Example</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                }}>
{`// ProductForm.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductForm } from './ProductForm';

describe('ProductForm', () => {
  it('validates required fields', async () => {
    const onSubmit = vi.fn();
    render(<ProductForm onSubmit={onSubmit} />);

    // Click submit without filling fields
    await userEvent.click(
      screen.getByText('Save Product')
    );

    expect(
      await screen.findByText(
        'Product name is required'
      )
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits valid form data', async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<ProductForm onSubmit={onSubmit} />);

    // Fill in form fields
    await user.type(
      screen.getByLabelText('Product Name'),
      'New Product'
    );

    await user.type(
      screen.getByLabelText('Price'),
      '99.99'
    );

    await user.click(
      screen.getByText('Save Product')
    );

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'New Product',
      price: 99.99,
    });
  });
});`}
                </pre>
              </div>

              <div>
                <BlockStack gap="300">
                  <Text fontWeight="semibold">Best Practices</Text>
                  <Card background="bg-fill-info-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">1. Use userEvent over fireEvent</Text>
                      <Text>userEvent simulates real user interactions more accurately</Text>
                    </BlockStack>
                  </Card>
                  <Card background="bg-fill-info-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">2. Query by accessibility roles</Text>
                      <Text>Use getByRole, getByLabelText for better accessibility testing</Text>
                    </BlockStack>
                  </Card>
                  <Card background="bg-fill-info-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">3. Test user flows, not implementation</Text>
                      <Text>Focus on what users see and do, not internal state</Text>
                    </BlockStack>
                  </Card>
                </BlockStack>
              </div>
            </Grid>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const UnitTestingTypeScript: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BlockStack gap="400">
        <div>
          <Text variant="heading3xl" as="h1">Unit Testing TypeScript SDK</Text>
          <Text as="p" tone="subdued">
            Test domain models, services, and business logic with Vitest
          </Text>
        </div>

        <Divider />

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start">
              <Icon source={CodeIcon} size="large" />
              <BlockStack gap="200">
                <Text variant="headingXl" as="h2">Testing Domain Models</Text>
                <Text tone="subdued">Test business logic in pure TypeScript classes</Text>
              </BlockStack>
            </InlineStack>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Domain Model</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                }}>
{`// Product.ts
export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public discountPercent: number = 0,
    public stockQuantity: number = 0
  ) {
    if (price < 0) {
      throw new Error('Price must be positive');
    }
  }

  get discountedPrice(): number {
    return this.price * (1 - this.discountPercent / 100);
  }

  isInStock(): boolean {
    return this.stockQuantity > 0;
  }

  isAvailable(quantity: number): boolean {
    return this.stockQuantity >= quantity;
  }

  reduceStock(quantity: number): void {
    if (quantity > this.stockQuantity) {
      throw new Error('Insufficient stock');
    }
    this.stockQuantity -= quantity;
  }
}`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">Domain Model Tests</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                  border: '1px solid #86efac',
                }}>
{`// Product.test.ts
import { describe, it, expect } from 'vitest';
import { Product } from './Product';

describe('Product', () => {
  it('calculates discounted price', () => {
    const product = new Product(
      '1', 'Test Product', 100, 20
    );

    expect(product.discountedPrice).toBe(80);
  });

  it('validates positive price', () => {
    expect(() => {
      new Product('1', 'Test', -10);
    }).toThrow('Price must be positive');
  });

  it('checks stock availability', () => {
    const product = new Product(
      '1', 'Test', 100, 0, 5
    );

    expect(product.isInStock()).toBe(true);
    expect(product.isAvailable(3)).toBe(true);
    expect(product.isAvailable(10)).toBe(false);
  });

  it('reduces stock correctly', () => {
    const product = new Product(
      '1', 'Test', 100, 0, 10
    );

    product.reduceStock(3);
    expect(product.stockQuantity).toBe(7);
  });

  it('throws on insufficient stock', () => {
    const product = new Product(
      '1', 'Test', 100, 0, 2
    );

    expect(() => {
      product.reduceStock(5);
    }).toThrow('Insufficient stock');
  });
});`}
                </pre>
              </div>
            </Grid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h2">Testing Services with Mocks</Text>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Service Layer</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                }}>
{`// ProductService.ts
export class ProductService {
  constructor(private apiClient: ApiClient) {}

  async getProducts(params: QueryParams) {
    const response = await this.apiClient.get(
      '/products',
      { params }
    );
    return response;
  }

  async createProduct(data: ProductData) {
    const validated = this.validate(data);
    const response = await this.apiClient.post(
      '/products',
      validated
    );
    return response;
  }

  private validate(data: ProductData) {
    if (!data.name || data.name.length < 3) {
      throw new Error('Name too short');
    }
    if (data.price <= 0) {
      throw new Error('Invalid price');
    }
    return data;
  }
}`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">Service Tests</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                  border: '1px solid #86efac',
                }}>
{`// ProductService.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductService } from './ProductService';

vi.mock('@cin7/core');

describe('ProductService', () => {
  let service: ProductService;
  let mockApiClient: any;

  beforeEach(() => {
    mockApiClient = {
      get: vi.fn(),
      post: vi.fn(),
    };
    service = new ProductService(mockApiClient);
  });

  it('fetches products with params', async () => {
    const mockResponse = {
      data: [{ id: '1', name: 'Product 1' }],
      total: 1,
    };

    mockApiClient.get.mockResolvedValue(
      mockResponse
    );

    const result = await service.getProducts({
      page: 1,
      pageSize: 10,
    });

    expect(mockApiClient.get).toHaveBeenCalledWith(
      '/products',
      { params: { page: 1, pageSize: 10 } }
    );
    expect(result.data).toHaveLength(1);
  });

  it('validates product data', async () => {
    const invalidProduct = {
      name: 'AB',
      price: -10,
    };

    await expect(
      service.createProduct(invalidProduct)
    ).rejects.toThrow('Name too short');
  });

  it('handles API errors', async () => {
    mockApiClient.get.mockRejectedValue(
      new Error('Network error')
    );

    await expect(
      service.getProducts()
    ).rejects.toThrow('Network error');
  });
});`}
                </pre>
              </div>
            </Grid>

            <Card background="bg-fill-warning-secondary">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">⚠️ Mocking Best Practices</Text>
                <List type="bullet">
                  <List.Item>Mock external dependencies (API clients, databases)</List.Item>
                  <List.Item>Reset mocks between tests using beforeEach()</List.Item>
                  <List.Item>Verify mock calls with toHaveBeenCalledWith()</List.Item>
                  <List.Item>Test both resolved and rejected promises</List.Item>
                  <List.Item>Keep mocks simple and focused on the test scenario</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const UnitTestingVanillaJS: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BlockStack gap="400">
        <div>
          <Text variant="heading3xl" as="h1">Unit Testing Vanilla JS</Text>
          <Text as="p" tone="subdued">
            Test DOM utilities and vanilla JavaScript functions with JSDOM
          </Text>
        </div>

        <Divider />

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start">
              <Icon source={CodeIcon} size="large" />
              <BlockStack gap="200">
                <Text variant="headingXl" as="h2">Testing DOM Utilities</Text>
                <Text tone="subdued">Test DOM manipulation with virtual DOM</Text>
              </BlockStack>
            </InlineStack>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">DOM Utilities</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                }}>
{`// dom-utils.ts
export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

export function on(
  selector: string,
  event: string,
  handler: EventListener
): void {
  const element = $(selector);
  element?.addEventListener(event, handler);
}

export async function fadeIn(
  selector: string,
  duration: number = 300
): Promise<void> {
  const element = $(selector);
  if (!element) return;

  element.style.opacity = '0';
  element.style.display = 'block';

  return new Promise((resolve) => {
    let start: number;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = Math.min(progress / duration, 1);

      element.style.opacity = String(opacity);

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(animate);
  });
}`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">DOM Utility Tests</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                  border: '1px solid #86efac',
                }}>
{`// dom-utils.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { $, on, fadeIn } from './dom-utils';

describe('DOM Utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = \\\`
      <div id="container">
        <button id="btn">Click</button>
        <div id="panel" style="display: none;">
          Panel
        </div>
      </div>
    \\\`;
  });

  it('selects elements with $', () => {
    const button = $('#btn');
    expect(button).toBeDefined();
    expect(button?.textContent).toBe('Click');
  });

  it('attaches event listeners', () => {
    const handler = vi.fn();
    on('#btn', 'click', handler);

    const button = document.getElementById('btn');
    button?.click();

    expect(handler).toHaveBeenCalled();
  });

  it('fades in hidden elements', async () => {
    const panel = $('#panel');
    expect(panel?.style.display).toBe('none');

    await fadeIn('#panel', 100);

    expect(panel?.style.display).toBe('block');
    expect(panel?.style.opacity).toBe('1');
  });
});`}
                </pre>
              </div>
            </Grid>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h2">Testing Validation Functions</Text>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Validation Utilities</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                }}>
{`// validation.ts
export function validateEmail(email: string): boolean {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

export function validatePrice(
  price: string
): boolean {
  const num = parseFloat(price);
  if (isNaN(num) || num < 0) return false;

  const decimalPlaces = (price.split('.')[1] || '').length;
  return decimalPlaces <= 2;
}

export function validateSKU(sku: string): boolean {
  // SKU format: XXX-NNN (3 letters, dash, 3 numbers)
  const regex = /^[A-Z]{3}-\\d{3}$/;
  return regex.test(sku);
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">Validation Tests</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                  border: '1px solid #86efac',
                }}>
{`// validation.test.ts
import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePrice,
  validateSKU,
  formatCurrency,
} from './validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('accepts valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user+tag@example.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });

  describe('validatePrice', () => {
    it('accepts valid prices', () => {
      expect(validatePrice('99.99')).toBe(true);
      expect(validatePrice('0.01')).toBe(true);
      expect(validatePrice('1000')).toBe(true);
    });

    it('rejects invalid prices', () => {
      expect(validatePrice('-10')).toBe(false);
      expect(validatePrice('abc')).toBe(false);
      expect(validatePrice('99.999')).toBe(false);
    });
  });

  describe('validateSKU', () => {
    it('accepts valid SKU format', () => {
      expect(validateSKU('ABC-123')).toBe(true);
      expect(validateSKU('XYZ-999')).toBe(true);
    });

    it('rejects invalid SKU format', () => {
      expect(validateSKU('AB-123')).toBe(false);
      expect(validateSKU('ABC-12')).toBe(false);
      expect(validateSKU('abc-123')).toBe(false);
    });
  });

  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(99.99)).toBe('$99.99');
      expect(formatCurrency(1000)).toBe('$1,000.00');
    });

    it('supports different currencies', () => {
      expect(formatCurrency(99.99, 'EUR')).toContain('99.99');
    });
  });
});`}
                </pre>
              </div>
            </Grid>

            <Card background="bg-fill-success-secondary">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">✅ Vanilla JS Testing Tips</Text>
                <List type="bullet">
                  <List.Item>Use beforeEach() to reset DOM state between tests</List.Item>
                  <List.Item>Test edge cases and boundary conditions</List.Item>
                  <List.Item>Mock timers for animation testing (vi.useFakeTimers())</List.Item>
                  <List.Item>Test both success and error scenarios</List.Item>
                  <List.Item>Use descriptive test names that explain expected behavior</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const IntegrationTesting: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BlockStack gap="400">
        <div>
          <Text variant="heading3xl" as="h1">Integration Testing</Text>
          <Text as="p" tone="subdued">
            Test cross-layer communication and data flow using EventBus
          </Text>
        </div>

        <Divider />

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start">
              <Icon source={ClipboardCheckIcon} size="large" />
              <BlockStack gap="200">
                <Text variant="headingXl" as="h2">EventBus Communication</Text>
                <Text tone="subdued">Test how different layers communicate</Text>
              </BlockStack>
            </InlineStack>

            <Banner>
              <p>
                Integration tests verify that multiple layers of your application work together correctly.
                The EventBus is key to cross-layer communication in Cin7 DSL.
              </p>
            </Banner>

            <Grid columns={{ sm: 1 }} gap="400">
              <div>
                <Text fontWeight="semibold">Cross-Layer Integration Test</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                }}>
{`// cross-layer.integration.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventBus } from '@cin7/core';
import { ProductService } from '@cin7/typescript-sdk';
import { updateProductUI } from '@cin7/vanilla-js';

describe('Cross-Layer Integration', () => {
  beforeEach(() => {
    // Clear all event listeners before each test
    EventBus.clear();
  });

  it('propagates product updates across layers', async () => {
    const uiUpdateSpy = vi.fn();

    // UI layer subscribes to product updates
    EventBus.on('product:updated', uiUpdateSpy);

    // Business logic layer updates product
    const service = new ProductService();
    await service.updateProduct('1', { name: 'Updated Product' });

    // Verify UI layer received the update
    expect(uiUpdateSpy).toHaveBeenCalledWith({
      id: '1',
      name: 'Updated Product',
    });
  });

  it('handles errors across layers', async () => {
    const errorHandler = vi.fn();
    EventBus.on('product:error', errorHandler);

    const service = new ProductService();

    // Simulate API error
    await service.updateProduct('invalid-id', {});

    // Verify error was propagated
    expect(errorHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.any(String),
      })
    );
  });

  it('coordinates between React and ExtJS', () => {
    const reactHandler = vi.fn();
    const extjsHandler = vi.fn();

    // Both layers listen for data refresh
    EventBus.on('data:refresh', reactHandler);
    EventBus.on('data:refresh', extjsHandler);

    // Trigger refresh from any layer
    EventBus.emit('data:refresh', { timestamp: Date.now() });

    // Verify both layers received the event
    expect(reactHandler).toHaveBeenCalled();
    expect(extjsHandler).toHaveBeenCalled();
  });

  it('maintains event order', () => {
    const events: string[] = [];

    EventBus.on('step:1', () => events.push('1'));
    EventBus.on('step:2', () => events.push('2'));
    EventBus.on('step:3', () => events.push('3'));

    EventBus.emit('step:1');
    EventBus.emit('step:2');
    EventBus.emit('step:3');

    expect(events).toEqual(['1', '2', '3']);
  });
});`}
                </pre>
              </div>

              <div>
                <Text fontWeight="semibold">Service Integration Test</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                }}>
{`// product-workflow.integration.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { ProductService, ProductRepository } from '@cin7/typescript-sdk';
import { EventBus } from '@cin7/core';

describe('Product Workflow Integration', () => {
  it('completes full product creation workflow', async () => {
    const repository = new ProductRepository();
    const service = new ProductService(repository);
    const events: string[] = [];

    // Track workflow events
    EventBus.on('product:creating', () => events.push('creating'));
    EventBus.on('product:validated', () => events.push('validated'));
    EventBus.on('product:created', () => events.push('created'));

    // Execute workflow
    const product = await service.createProduct({
      name: 'New Product',
      price: 99.99,
      sku: 'PRD-001',
    });

    // Verify workflow completed correctly
    expect(product.id).toBeDefined();
    expect(events).toEqual(['creating', 'validated', 'created']);
    expect(repository.findById(product.id)).toBeDefined();
  });

  it('rolls back on validation failure', async () => {
    const repository = new ProductRepository();
    const service = new ProductService(repository);
    const errorHandler = vi.fn();

    EventBus.on('product:error', errorHandler);

    // Try to create invalid product
    await expect(
      service.createProduct({
        name: 'AB', // Too short
        price: -10,  // Invalid
      })
    ).rejects.toThrow();

    // Verify no product was created
    expect(repository.findAll()).toHaveLength(0);
    expect(errorHandler).toHaveBeenCalled();
  });

  it('updates cache on product modification', async () => {
    const repository = new ProductRepository();
    const service = new ProductService(repository);

    // Create product
    const product = await service.createProduct({
      name: 'Test Product',
      price: 99.99,
    });

    // Update product
    await service.updateProduct(product.id, {
      name: 'Updated Product',
    });

    // Verify cache was updated
    const cached = repository.findById(product.id);
    expect(cached?.name).toBe('Updated Product');
  });
});`}
                </pre>
              </div>
            </Grid>

            <Card background="bg-fill-info-secondary">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Integration Testing Checklist</Text>
                <List type="bullet">
                  <List.Item>✅ Test event propagation between layers</List.Item>
                  <List.Item>✅ Verify error handling across boundaries</List.Item>
                  <List.Item>✅ Test complete workflows from start to finish</List.Item>
                  <List.Item>✅ Verify data consistency across layers</List.Item>
                  <List.Item>✅ Test rollback and error recovery</List.Item>
                  <List.Item>✅ Clear event listeners between tests</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const E2ETesting: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BlockStack gap="400">
        <div>
          <Text variant="heading3xl" as="h1">E2E Testing with Playwright</Text>
          <Text as="p" tone="subdued">
            Test complete user flows and interactions across your application
          </Text>
        </div>

        <Divider />

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start">
              <Icon source={PlayIcon} size="large" />
              <BlockStack gap="200">
                <Text variant="headingXl" as="h2">Complete User Flows</Text>
                <Text tone="subdued">Test real user scenarios from start to finish</Text>
              </BlockStack>
            </InlineStack>

            <Banner status="info">
              <p>
                E2E tests simulate real user interactions in a browser environment.
                They test your entire application stack, from UI to backend.
              </p>
            </Banner>

            <div>
              <Text fontWeight="semibold">Playwright Configuration</Text>
              <pre style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '13px',
                overflow: 'auto',
                marginTop: '8px',
              }}>
{`// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`}
              </pre>
            </div>

            <Grid columns={{ sm: 1 }} gap="400">
              <div>
                <Text fontWeight="semibold">Product Management E2E Test</Text>
                <pre style={{
                  background: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  border: '1px solid #86efac',
                }}>
{`// product-management.e2e.test.ts
import { test, expect } from '@playwright/test';

test.describe('Product Management Flow', () => {
  test('creates new product successfully', async ({ page }) => {
    // Navigate to products page
    await page.goto('/products');

    // Click "Add Product" button
    await page.click('text=Add Product');

    // Fill in product form
    await page.fill('input[name="name"]', 'Test Product');
    await page.fill('input[name="price"]', '99.99');
    await page.fill('input[name="sku"]', 'TEST-001');
    await page.selectOption('select[name="category"]', 'electronics');

    // Submit form
    await page.click('button:has-text("Save Product")');

    // Verify success message
    await expect(
      page.locator('text=Product created successfully')
    ).toBeVisible();

    // Verify product appears in list
    await expect(page.locator('text=Test Product')).toBeVisible();
    await expect(page.locator('text=$99.99')).toBeVisible();
  });

  test('validates required fields', async ({ page }) => {
    await page.goto('/products/new');

    // Try to submit empty form
    await page.click('button:has-text("Save Product")');

    // Verify validation errors
    await expect(
      page.locator('text=Product name is required')
    ).toBeVisible();

    await expect(
      page.locator('text=Price is required')
    ).toBeVisible();
  });

  test('edits existing product', async ({ page }) => {
    await page.goto('/products');

    // Click edit on first product
    await page.click(
      '[data-testid="product-row"]:first-child button:has-text("Edit")'
    );

    // Update product name
    await page.fill('input[name="name"]', 'Updated Product Name');
    await page.click('button:has-text("Save Changes")');

    // Verify update
    await expect(
      page.locator('text=Product updated successfully')
    ).toBeVisible();

    await expect(
      page.locator('text=Updated Product Name')
    ).toBeVisible();
  });

  test('deletes product with confirmation', async ({ page }) => {
    await page.goto('/products');

    // Click delete button
    await page.click(
      '[data-testid="product-row"]:first-child button:has-text("Delete")'
    );

    // Confirm deletion in modal
    await expect(
      page.locator('text=Are you sure you want to delete')
    ).toBeVisible();

    await page.click('button:has-text("Delete Product")');

    // Verify deletion
    await expect(
      page.locator('text=Product deleted successfully')
    ).toBeVisible();
  });

  test('searches and filters products', async ({ page }) => {
    await page.goto('/products');

    // Enter search term
    await page.fill('input[placeholder="Search products"]', 'Headphones');

    // Wait for search results
    await page.waitForTimeout(500);

    // Verify filtered results
    await expect(page.locator('text=Wireless Headphones')).toBeVisible();

    // Verify other products are hidden
    const rows = await page.locator('[data-testid="product-row"]').count();
    expect(rows).toBeLessThanOrEqual(5);
  });
});`}
                </pre>
              </div>
            </Grid>

            <Card background="bg-fill-warning-secondary">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">E2E Testing Best Practices</Text>
                <List type="bullet">
                  <List.Item>Test critical user journeys, not every feature</List.Item>
                  <List.Item>Use data-testid attributes for reliable element selection</List.Item>
                  <List.Item>Wait for elements to be visible before interacting</List.Item>
                  <List.Item>Clean up test data after each test</List.Item>
                  <List.Item>Run tests in multiple browsers for compatibility</List.Item>
                  <List.Item>Use screenshots and traces for debugging failures</List.Item>
                </List>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};

export const VisualRegression: Story = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <BlockStack gap="400">
        <div>
          <Text variant="heading3xl" as="h1">Visual Regression Testing</Text>
          <Text as="p" tone="subdued">
            Test component appearance with Storybook and visual testing tools
          </Text>
        </div>

        <Divider />

        <Card>
          <BlockStack gap="400">
            <InlineStack gap="200" align="start">
              <Icon source={CheckIcon} size="large" />
              <BlockStack gap="200">
                <Text variant="headingXl" as="h2">Storybook Visual Testing</Text>
                <Text tone="subdued">Catch visual regressions automatically</Text>
              </BlockStack>
            </InlineStack>

            <Banner>
              <p>
                Visual regression testing ensures your components look correct and
                haven't been accidentally changed during development.
              </p>
            </Banner>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <div>
                <Text fontWeight="semibold">Story with Visual Test</Text>
                <pre style={{
                  background: '#f8f9fa',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  overflow: 'auto',
                  marginTop: '8px',
                }}>
{`// ProductCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProductCard } from './ProductCard';
import { expect, within } from '@storybook/test';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: '1',
      name: 'Wireless Headphones',
      price: 89.99,
      inStock: true,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify visual elements
    await expect(
      canvas.getByText('Wireless Headphones')
    ).toBeVisible();

    await expect(
      canvas.getByText('$89.99')
    ).toBeVisible();

    await expect(
      canvas.getByText('In Stock')
    ).toBeVisible();

    // Check badge color
    const badge = canvas.getByText('In Stock');
    expect(badge).toHaveClass('success');
  },
};

export const OutOfStock: Story = {
  args: {
    product: {
      id: '1',
      name: 'Wireless Headphones',
      price: 89.99,
      inStock: false,
    },
  },
};

export const OnSale: Story = {
  args: {
    product: {
      id: '1',
      name: 'Wireless Headphones',
      price: 89.99,
      originalPrice: 129.99,
      inStock: true,
    },
  },
};`}
                </pre>
              </div>

              <div>
                <BlockStack gap="300">
                  <Text fontWeight="semibold">Visual Testing Workflow</Text>

                  <Card background="bg-fill-success-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">1. Create Stories</Text>
                      <Text>Document all component variations and states</Text>
                    </BlockStack>
                  </Card>

                  <Card background="bg-fill-success-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">2. Add Play Functions</Text>
                      <Text>Test interactions and verify visual elements</Text>
                    </BlockStack>
                  </Card>

                  <Card background="bg-fill-success-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">3. Capture Baseline</Text>
                      <Text>Take snapshots of correct component appearance</Text>
                    </BlockStack>
                  </Card>

                  <Card background="bg-fill-success-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">4. Review Changes</Text>
                      <Text>Compare new snapshots against baseline</Text>
                    </BlockStack>
                  </Card>

                  <Card background="bg-fill-success-secondary">
                    <BlockStack gap="200">
                      <Text fontWeight="bold">5. Accept or Reject</Text>
                      <Text>Approve intentional changes, reject regressions</Text>
                    </BlockStack>
                  </Card>
                </BlockStack>
              </div>
            </Grid>

            <div>
              <Text fontWeight="semibold">Chromatic Configuration</Text>
              <pre style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '13px',
                overflow: 'auto',
                marginTop: '8px',
              }}>
{`// .github/workflows/chromatic.yml
name: Chromatic

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  chromatic:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Install dependencies
        run: pnpm install

      - name: Run Chromatic
        uses: chromaui/action@v1
        with:
          projectToken: \${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          buildScriptName: storybook:build
          exitZeroOnChanges: true`}
              </pre>
            </div>

            <Card background="bg-fill-info-secondary">
              <BlockStack gap="300">
                <Text variant="headingMd" as="h3">Visual Testing Benefits</Text>
                <Grid columns={{ sm: 1, md: 2 }} gap="400">
                  <div>
                    <Text fontWeight="bold">Automatic Detection</Text>
                    <List>
                      <List.Item>Catches unintended visual changes</List.Item>
                      <List.Item>Tests across browsers and viewports</List.Item>
                      <List.Item>Verifies responsive design</List.Item>
                    </List>
                  </div>
                  <div>
                    <Text fontWeight="bold">Confidence & Speed</Text>
                    <List>
                      <List.Item>Faster than manual visual testing</List.Item>
                      <List.Item>Prevents CSS regression bugs</List.Item>
                      <List.Item>Documents component appearance</List.Item>
                    </List>
                  </div>
                </Grid>
              </BlockStack>
            </Card>
          </BlockStack>
        </Card>

        <Card>
          <BlockStack gap="400">
            <Text variant="headingXl" as="h2">Testing Commands</Text>

            <Grid columns={{ sm: 1, md: 2 }} gap="400">
              <Card background="bg-fill-tertiary">
                <BlockStack gap="200">
                  <Text fontWeight="semibold">Unit & Integration Tests</Text>
                  <pre style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}>
{`# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage`}
                  </pre>
                </BlockStack>
              </Card>

              <Card background="bg-fill-tertiary">
                <BlockStack gap="200">
                  <Text fontWeight="semibold">E2E Tests</Text>
                  <pre style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}>
{`# Run E2E tests
pnpm test:e2e

# Interactive UI mode
pnpm test:e2e:ui

# Debug mode
pnpm test:e2e:debug`}
                  </pre>
                </BlockStack>
              </Card>

              <Card background="bg-fill-tertiary">
                <BlockStack gap="200">
                  <Text fontWeight="semibold">Storybook Tests</Text>
                  <pre style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}>
{`# Start Storybook
pnpm storybook

# Build for testing
pnpm storybook:build

# Test stories
pnpm storybook:test`}
                  </pre>
                </BlockStack>
              </Card>

              <Card background="bg-fill-tertiary">
                <BlockStack gap="200">
                  <Text fontWeight="semibold">Visual Regression</Text>
                  <pre style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '4px',
                    fontSize: '13px',
                  }}>
{`# Run Chromatic
pnpm chromatic

# Accept all baselines
pnpm chromatic:accept

# CI mode
pnpm chromatic:ci`}
                  </pre>
                </BlockStack>
              </Card>
            </Grid>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  ),
};
