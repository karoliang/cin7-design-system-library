/**
 * Product store using Zustand
 */

import { create } from 'zustand';
import { Product, ProductRepository, ProductUseCase } from './domain';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  
  // Actions
  loadProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

// Mock repository for demo
const repository = new ProductRepository();
const useCase = new ProductUseCase(repository);

// Initialize with sample data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    price: 29.99,
    stock: 45,
    category: 'Electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    price: 89.99,
    stock: 12,
    category: 'Electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'USB-C Hub',
    price: 49.99,
    stock: 0,
    category: 'Accessories',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Webcam HD',
    price: 79.99,
    stock: 23,
    category: 'Electronics',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useProductStore = create<ProductStore>((set, get) => ({
  products: sampleProducts,
  loading: false,
  error: null,

  loadProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await useCase.getAllProducts();
      set({ products, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addProduct: async (productData) => {
    set({ loading: true });
    try {
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      set(state => ({
        products: [...state.products, newProduct],
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateProduct: async (id, updates) => {
    set({ loading: true });
    try {
      set(state => ({
        products: state.products.map(p =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      set(state => ({
        products: state.products.filter(p => p.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));