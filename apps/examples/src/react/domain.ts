/**
 * Domain layer using TypeScript SDK patterns
 */

import { BaseEntity, BaseRepository, BaseUseCase } from '@cin7/typescript-sdk';

// Domain model
export interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
  category: string;
}

// Repository
export class ProductRepository extends BaseRepository<Product, Omit<Product, 'id' | 'createdAt' | 'updatedAt'>, Partial<Product>> {
  private products: Product[] = [];

  async findAll(): Promise<{ data: Product[]; total: number }> {
    return {
      data: this.products,
      total: this.products.length,
    };
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const product: Product = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  async update(id: string, data: Partial<Product>): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    this.products[index] = {
      ...this.products[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.products[index];
  }

  async delete(id: string): Promise<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    this.products.splice(index, 1);
  }

  async count(): Promise<number> {
    return this.products.length;
  }

  async exists(id: string): Promise<boolean> {
    return this.products.some(p => p.id === id);
  }
}

// Use case
export class ProductUseCase extends BaseUseCase {
  constructor(private repository: ProductRepository) {
    super();
  }

  async getAllProducts(): Promise<Product[]> {
    const result = await this.repository.findAll();
    return result.data;
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    // Business validation
    if (data.price < 0) {
      throw new Error('Price cannot be negative');
    }
    if (data.stock < 0) {
      throw new Error('Stock cannot be negative');
    }
    
    return this.repository.create(data);
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const exists = await this.repository.exists(id);
    if (!exists) throw new Error('Product not found');
    
    return this.repository.update(id, updates);
  }

  async deleteProduct(id: string): Promise<void> {
    const exists = await this.repository.exists(id);
    if (!exists) throw new Error('Product not found');
    
    return this.repository.delete(id);
  }

  async getLowStockProducts(threshold: number = 10): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.stock <= threshold && p.stock > 0);
  }

  async getOutOfStockProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(p => p.stock === 0);
  }
}