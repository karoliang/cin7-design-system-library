/**
 * Shared store using Zustand
 * Demonstrates TypeScript SDK patterns
 */

import { create } from 'zustand';
import { BaseEntity, BaseRepository } from '@cin7/typescript-sdk';
import { EventBus } from './event-bus';

// Domain models
interface Product extends BaseEntity {
  name: string;
  price: number;
  stock: number;
  category?: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

// App state
interface AppState {
  // Theme
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: Notification['type']) => void;
  removeNotification: (id: string) => void;
  
  // Sync state
  syncEnabled: boolean;
  setSyncEnabled: (enabled: boolean) => void;
}

// Create store
export const useAppStore = create<AppState>((set, get) => ({
  // Theme
  theme: 'light',
  setTheme: (theme) => {
    set({ theme });
    // Apply theme to document
    document.documentElement.setAttribute('data-cin7-theme', theme);
  },
  
  // Products
  products: [
    {
      id: '1',
      name: 'Sample Product 1',
      price: 29.99,
      stock: 100,
      category: 'Electronics',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Sample Product 2',
      price: 49.99,
      stock: 50,
      category: 'Accessories',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  
  addProduct: (productData) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set(state => ({
      products: [...state.products, newProduct],
    }));
    
    // Notify other layers if sync is enabled
    if (get().syncEnabled) {
      EventBus.emit('store:product:added', newProduct);
    }
    
    get().addNotification(`Product "${newProduct.name}" added`, 'success');
  },
  
  updateProduct: (id, updates) => {
    set(state => ({
      products: state.products.map(p =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
      ),
    }));
    
    if (get().syncEnabled) {
      EventBus.emit('store:product:updated', { id, updates });
    }
  },
  
  deleteProduct: (id) => {
    const product = get().products.find(p => p.id === id);
    
    set(state => ({
      products: state.products.filter(p => p.id !== id),
    }));
    
    if (get().syncEnabled) {
      EventBus.emit('store:product:deleted', { id });
    }
    
    if (product) {
      get().addNotification(`Product "${product.name}" deleted`, 'info');
    }
  },
  
  // Notifications
  notifications: [],
  
  addNotification: (message, type = 'info') => {
    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date(),
    };
    
    set(state => ({
      notifications: [...state.notifications, notification],
    }));
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      get().removeNotification(notification.id);
    }, 5000);
  },
  
  removeNotification: (id) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
  
  // Sync
  syncEnabled: true,
  setSyncEnabled: (enabled) => {
    set({ syncEnabled: enabled });
    EventBus.emit('store:sync:changed', { enabled });
  },
}));

// Listen for external events
EventBus.on('external:product:add', (data) => {
  useAppStore.getState().addProduct(data);
});

EventBus.on('external:theme:change', (data) => {
  useAppStore.getState().setTheme(data.theme);
});

// Make store available globally for other layers
(window as any).Cin7Store = useAppStore;