# Cin7 DSL Syntax Design

## Overview

The Cin7 DSL is designed to provide a declarative, expressive syntax for building multi-layer applications. It allows developers to seamlessly mix technologies (Vanilla JS, React/Polaris, ExtJS) while maintaining clean separation of concerns.

## Core Principles

1. **Declarative**: Describe what you want, not how to build it
2. **Technology-agnostic**: Support multiple UI technologies in one file
3. **Type-safe**: Full TypeScript support with inference
4. **Progressive**: Start simple, add complexity as needed
5. **Performance-focused**: Compile to optimized code

## Basic Syntax

### File Extension

```
.cin7 - Cin7 DSL source files
.cin7.ts - TypeScript-enhanced Cin7 DSL files
```

### Structure

```cin7
// Import statements
import { Button } from '@cin7/polaris-adapter'
import { Product } from './models/Product'

// Layer declarations
@layer vanilla {
  // Vanilla JS code
}

@layer react {
  // React/Polaris code
}

@layer extjs {
  // ExtJS code
}

// Shared business logic
@logic {
  // TypeScript SDK patterns
}
```

## Component Definition

### Basic Component

```cin7
component ProductCard {
  // Props definition
  props {
    product: Product
    onSelect?: (product: Product) => void
  }
  
  // State definition
  state {
    isHovered: boolean = false
  }
  
  // Render method with technology mixing
  render {
    // Vanilla JS for lightweight interactions
    @vanilla {
      <div class="product-card" 
           onmouseenter={() => this.isHovered = true}
           onmouseleave={() => this.isHovered = false}>
        @slot content
      </div>
    }
    
    // React for the main content
    @react {
      <Card highlighted={this.isHovered}>
        <Card.Header>
          <Heading>{this.product.name}</Heading>
        </Card.Header>
        <Card.Section>
          <TextContainer>
            <p>{this.product.description}</p>
            <TextStyle variation="strong">
              ${this.product.price}
            </TextStyle>
          </TextContainer>
        </Card.Section>
        <Card.Section>
          <Button onClick={() => this.onSelect?.(this.product)}>
            Select Product
          </Button>
        </Card.Section>
      </Card>
    }
  }
}
```

### Data-Intensive Component

```cin7
component ProductGrid {
  props {
    products: Product[]
    onEdit: (product: Product) => void
    onDelete: (id: string) => void
  }
  
  // Use ExtJS for data grid
  @extjs {
    grid {
      store: this.products
      columns: [
        { text: 'Name', dataIndex: 'name', flex: 1 },
        { text: 'SKU', dataIndex: 'sku', width: 120 },
        { text: 'Price', dataIndex: 'price', width: 100, 
          renderer: (value) => `$${value.toFixed(2)}` },
        { text: 'Stock', dataIndex: 'stock', width: 80 }
      ]
      features: ['filters', 'grouping']
      actions: {
        edit: this.onEdit
        delete: this.onDelete
      }
    }
  }
}
```

## Page Definition

```cin7
page ProductCatalog {
  // Route definition
  route: '/products/:category?'
  
  // Page state
  state {
    products: Product[] = []
    selectedCategory: string | null = null
    isLoading: boolean = true
  }
  
  // Lifecycle hooks
  onMount {
    this.loadProducts()
  }
  
  // Methods
  methods {
    async loadProducts() {
      const repository = new ProductRepository()
      this.products = await repository.findAll({
        category: this.selectedCategory
      })
      this.isLoading = false
    }
  }
  
  // Layout with mixed technologies
  layout {
    @react {
      <Page title="Product Catalog">
        <Layout>
          <Layout.Section secondary>
            @embed CategoryFilter {
              selected: this.selectedCategory
              onChange: (cat) => {
                this.selectedCategory = cat
                this.loadProducts()
              }
            }
          </Layout.Section>
          
          <Layout.Section>
            @if (this.isLoading) {
              <Spinner />
            } @else {
              @embed ProductGrid {
                products: this.products
                onEdit: (p) => navigate(`/products/${p.id}/edit`)
                onDelete: (id) => this.deleteProduct(id)
              }
            }
          </Layout.Section>
        </Layout>
      </Page>
    }
  }
}
```

## Business Logic Layer

```cin7
// Repository pattern
repository ProductRepository {
  endpoint: '/api/products'
  
  methods {
    async findAll(filters?: ProductFilters): Product[] {
      return this.get('/', { params: filters })
    }
    
    async findById(id: string): Product {
      return this.get(`/${id}`)
    }
    
    async create(data: CreateProductDTO): Product {
      return this.post('/', data)
    }
    
    async update(id: string, data: UpdateProductDTO): Product {
      return this.patch(`/${id}`, data)
    }
    
    async delete(id: string): void {
      return this.delete(`/${id}`)
    }
  }
}

// Use case pattern
usecase UpdateProductInventory {
  inject {
    productRepo: ProductRepository
    inventoryService: InventoryService
    eventBus: EventBus
  }
  
  async execute(request: {
    productId: string
    quantity: number
    operation: 'add' | 'remove'
  }): Result<Product> {
    // Validation
    if (request.quantity <= 0) {
      return Result.failure('Quantity must be positive')
    }
    
    // Business logic
    const product = await this.productRepo.findById(request.productId)
    
    if (request.operation === 'remove' && product.stock < request.quantity) {
      return Result.failure('Insufficient stock')
    }
    
    // Update inventory
    const newStock = request.operation === 'add' 
      ? product.stock + request.quantity
      : product.stock - request.quantity
    
    const updated = await this.productRepo.update(product.id, {
      stock: newStock
    })
    
    // Emit event
    this.eventBus.emit('inventory:updated', {
      productId: product.id,
      previousStock: product.stock,
      newStock: updated.stock
    })
    
    return Result.success(updated)
  }
}
```

## State Management

```cin7
// Global store definition
store AppStore {
  // State slices
  slices {
    auth: AuthSlice
    products: ProductSlice
    cart: CartSlice
  }
  
  // Middleware
  middleware: [logger, persist]
}

// Slice definition
slice ProductSlice {
  state {
    items: Product[] = []
    selectedId: string | null = null
    filters: ProductFilters = {}
  }
  
  actions {
    setProducts(products: Product[]) {
      this.items = products
    }
    
    selectProduct(id: string) {
      this.selectedId = id
    }
    
    updateFilters(filters: Partial<ProductFilters>) {
      this.filters = { ...this.filters, ...filters }
    }
  }
  
  selectors {
    selectedProduct() {
      return this.items.find(p => p.id === this.selectedId)
    }
    
    filteredProducts() {
      return this.items.filter(p => {
        if (this.filters.category && p.category !== this.filters.category) {
          return false
        }
        if (this.filters.minPrice && p.price < this.filters.minPrice) {
          return false
        }
        return true
      })
    }
  }
}
```

## Event System

```cin7
// Event definitions
events {
  ProductSelected {
    productId: string
    source: 'grid' | 'card' | 'search'
  }
  
  InventoryLow {
    productId: string
    currentStock: number
    threshold: number
  }
}

// Event handling
component ProductView {
  @on ProductSelected {
    if (event.source === 'grid') {
      this.showQuickView(event.productId)
    } else {
      this.navigateToDetail(event.productId)
    }
  }
  
  @emit {
    selectProduct(id: string) {
      return ProductSelected {
        productId: id
        source: 'card'
      }
    }
  }
}
```

## Performance Optimizations

```cin7
component ProductList {
  props {
    products: Product[]
  }
  
  // Automatic optimization hints
  @optimize {
    virtualScroll: this.products.length > 100
    lazyLoad: true
    memoize: ['renderProduct']
  }
  
  @lazy {
    // Components that should be lazy loaded
    import ProductDetail from './ProductDetail'
    import ProductEditor from './ProductEditor'
  }
  
  render {
    @vanilla {
      // Use vanilla JS for list container and scroll handling
      <div class="product-list" @scroll={this.handleScroll}>
        @for (product of this.visibleProducts) {
          @embed ProductCard {
            product: product
            key: product.id
          }
        }
      </div>
    }
  }
}
```

## Styling

```cin7
component StyledCard {
  // Component-scoped styles using design tokens
  styles {
    .card {
      background: var(--p-color-bg);
      border: 1px solid var(--p-color-border);
      border-radius: var(--p-border-radius-200);
      padding: var(--p-spacing-400);
      
      &:hover {
        box-shadow: var(--p-shadow-200);
      }
    }
    
    .card-header {
      margin-bottom: var(--p-spacing-300);
      color: var(--p-color-text-emphasis);
    }
  }
  
  render {
    @vanilla {
      <div class="card">
        <div class="card-header">
          @slot header
        </div>
        @slot content
      </div>
    }
  }
}
```

## Advanced Features

### Mixins

```cin7
mixin Sortable<T> {
  state {
    sortField: keyof T | null = null
    sortDirection: 'asc' | 'desc' = 'asc'
  }
  
  methods {
    sort(field: keyof T) {
      if (this.sortField === field) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortField = field
        this.sortDirection = 'asc'
      }
    }
    
    getSorted(items: T[]): T[] {
      if (!this.sortField) return items
      
      return [...items].sort((a, b) => {
        const aVal = a[this.sortField]
        const bVal = b[this.sortField]
        const diff = aVal > bVal ? 1 : -1
        return this.sortDirection === 'asc' ? diff : -diff
      })
    }
  }
}
```

### Directives

```cin7
// Custom directive for intersection observer
directive @visible {
  mounted(el: Element, binding: { value: Function }) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        binding.value()
        observer.disconnect()
      }
    })
    observer.observe(el)
  }
}

// Usage
component LazyImage {
  render {
    @vanilla {
      <img @visible={() => this.loadImage()} 
           src={this.placeholder}
           data-src={this.src} />
    }
  }
}
```

### Type Inference

```cin7
// Automatic type inference from props and state
component TypedComponent {
  props {
    items: Product[]
    onSelect: (item: Product) => void
  }
  
  state {
    // Type inferred as Product | null
    selected = this.items[0] || null
  }
  
  methods {
    // Return type inferred as Product[]
    getFiltered() {
      return this.items.filter(item => item.inStock)
    }
  }
}
```

## Compilation Output

The Cin7 DSL compiler would generate optimized code for each layer:

### Input (product-card.cin7):
```cin7
component ProductCard {
  props {
    product: Product
  }
  
  render {
    @vanilla {
      <div class="product-card">
        <h3>{this.product.name}</h3>
        <p>${this.product.price}</p>
      </div>
    }
  }
}
```

### Output (product-card.js):
```javascript
import { createElement } from '@cin7/vanilla-js';

export function ProductCard({ product }) {
  return createElement('div', {
    className: 'product-card',
    innerHTML: `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
    `
  });
}
```

## Future Considerations

1. **Hot Module Replacement**: Support HMR for all layers
2. **DevTools Integration**: Custom browser extension for debugging
3. **Server Components**: Support for server-side rendering
4. **Edge Functions**: Compile business logic to edge functions
5. **Mobile Targets**: Compile to React Native or NativeScript

## Migration Path

```cin7
// Gradual migration from existing code
@migrate from './LegacyComponent.jsx' {
  // Map old props to new
  props {
    title: props.heading
    items: props.data
  }
  
  // Wrap in new architecture
  render {
    @react {
      <LegacyComponent {...mappedProps} />
    }
  }
}
```

This DSL design provides a powerful, flexible syntax for building multi-layer applications while maintaining the core philosophy of using the right tool for the job.