/**
 * Storage utility functions for localStorage and sessionStorage
 */

export interface StorageOptions {
  prefix?: string;
  serialize?: boolean;
  ttl?: number; // Time to live in milliseconds
}

export interface StorageItem<T = any> {
  value: T;
  timestamp: number;
  ttl?: number;
}

/**
 * Storage utility class for managing localStorage and sessionStorage with optional TTL and prefixing
 */
export class StorageUtil {
  private prefix: string;

  constructor(prefix: string = 'cin7_dsl') {
    this.prefix = prefix;
  }

  /**
   * Generate a prefixed key
   */
  private getKey(key: string): string {
    return `${this.prefix}_${key}`;
  }

  /**
   * Check if storage is available
   */
  private isStorageAvailable(storage: Storage): boolean {
    try {
      const test = '__storage_test__';
      storage.setItem(test, test);
      storage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Set an item in localStorage with optional TTL
   */
  setLocal<T>(key: string, value: T, options?: StorageOptions): boolean {
    if (!this.isStorageAvailable(localStorage)) {
      return false;
    }

    const finalKey = options?.prefix ? `${options.prefix}_${key}` : this.getKey(key);
    const item: StorageItem<T> = {
      value: options?.serialize ? JSON.stringify(value) : value,
      timestamp: Date.now(),
      ttl: options?.ttl,
    };

    try {
      localStorage.setItem(finalKey, JSON.stringify(item));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get an item from localStorage, checking TTL if set
   */
  getLocal<T>(key: string, options?: StorageOptions): T | null {
    if (!this.isStorageAvailable(localStorage)) {
      return null;
    }

    const finalKey = options?.prefix ? `${options.prefix}_${key}` : this.getKey(key);

    try {
      const item = localStorage.getItem(finalKey);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      // Check TTL if set
      if (parsedItem.ttl && Date.now() - parsedItem.timestamp > parsedItem.ttl) {
        localStorage.removeItem(finalKey);
        return null;
      }

      return parsedItem.value;
    } catch {
      return null;
    }
  }

  /**
   * Remove an item from localStorage
   */
  removeLocal(key: string, options?: StorageOptions): boolean {
    if (!this.isStorageAvailable(localStorage)) {
      return false;
    }

    const finalKey = options?.prefix ? `${options.prefix}_${key}` : this.getKey(key);
    localStorage.removeItem(finalKey);
    return true;
  }

  /**
   * Clear all items with the current prefix from localStorage
   */
  clearLocal(): boolean {
    if (!this.isStorageAvailable(localStorage)) {
      return false;
    }

    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
    return true;
  }

  /**
   * Set an item in sessionStorage
   */
  setSession<T>(key: string, value: T, options?: StorageOptions): boolean {
    if (!this.isStorageAvailable(sessionStorage)) {
      return false;
    }

    const finalKey = options?.prefix ? `${options.prefix}_${key}` : this.getKey(key);
    const item: StorageItem<T> = {
      value: options?.serialize ? JSON.stringify(value) : value,
      timestamp: Date.now(),
      ttl: options?.ttl,
    };

    try {
      sessionStorage.setItem(finalKey, JSON.stringify(item));
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get an item from sessionStorage
   */
  getSession<T>(key: string, options?: StorageOptions): T | null {
    if (!this.isStorageAvailable(sessionStorage)) {
      return null;
    }

    const finalKey = options?.prefix ? `${options.prefix}_${key}` : this.getKey(key);

    try {
      const item = sessionStorage.getItem(finalKey);
      if (!item) return null;

      const parsedItem: StorageItem<T> = JSON.parse(item);

      // Check TTL if set
      if (parsedItem.ttl && Date.now() - parsedItem.timestamp > parsedItem.ttl) {
        sessionStorage.removeItem(finalKey);
        return null;
      }

      return parsedItem.value;
    } catch {
      return null;
    }
  }

  /**
   * Remove an item from sessionStorage
   */
  removeSession(key: string, options?: StorageOptions): boolean {
    if (!this.isStorageAvailable(sessionStorage)) {
      return false;
    }

    const finalKey = options?.prefix ? `${options.prefix}_${key}` : this.getKey(key);
    sessionStorage.removeItem(finalKey);
    return true;
  }

  /**
   * Clear all items with the current prefix from sessionStorage
   */
  clearSession(): boolean {
    if (!this.isStorageAvailable(sessionStorage)) {
      return false;
    }

    const keysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach(key => sessionStorage.removeItem(key));
    return true;
  }
}

// Default storage instance
const defaultStorage = new StorageUtil();

/**
 * Convenience functions using the default storage instance
 */
export const setLocal = <T>(key: string, value: T, options?: StorageOptions): boolean =>
  defaultStorage.setLocal(key, value, options);

export const getLocal = <T>(key: string, options?: StorageOptions): T | null =>
  defaultStorage.getLocal<T>(key, options);

export const removeLocal = (key: string, options?: StorageOptions): boolean =>
  defaultStorage.removeLocal(key, options);

export const clearLocal = (): boolean =>
  defaultStorage.clearLocal();

export const setSession = <T>(key: string, value: T, options?: StorageOptions): boolean =>
  defaultStorage.setSession(key, value, options);

export const getSession = <T>(key: string, options?: StorageOptions): T | null =>
  defaultStorage.getSession<T>(key, options);

export const removeSession = (key: string, options?: StorageOptions): boolean =>
  defaultStorage.removeSession(key, options);

export const clearSession = (): boolean =>
  defaultStorage.clearSession();

/**
 * Storage utility for managing user preferences with automatic serialization
 */
export class PreferenceStorage {
  private storage: StorageUtil;

  constructor(prefix: string = 'preferences') {
    this.storage = new StorageUtil(prefix);
  }

  set<T>(key: string, value: T): boolean {
    return this.storage.setLocal(key, value, { serialize: true });
  }

  get<T>(key: string, defaultValue?: T): T | null {
    const value = this.storage.getLocal<T>(key);
    return value !== null ? value : (defaultValue || null);
  }

  remove(key: string): boolean {
    return this.storage.removeLocal(key);
  }

  clear(): boolean {
    return this.storage.clearLocal();
  }
}

// Default preference storage instance
export const preferences = new PreferenceStorage();

/**
 * Cache utility with automatic TTL management
 */
export class CacheStorage {
  private storage: StorageUtil;
  private defaultTTL: number;

  constructor(defaultTTL: number = 3600000, prefix: string = 'cache') { // 1 hour default TTL
    this.storage = new StorageUtil(prefix);
    this.defaultTTL = defaultTTL;
  }

  set<T>(key: string, value: T, ttl?: number): boolean {
    return this.storage.setLocal(key, value, {
      ttl: ttl || this.defaultTTL,
      serialize: true
    });
  }

  get<T>(key: string): T | null {
    return this.storage.getLocal<T>(key);
  }

  remove(key: string): boolean {
    return this.storage.removeLocal(key);
  }

  clear(): boolean {
    return this.storage.clearLocal();
  }

  /**
   * Clean up expired items
   */
  cleanup(): number {
    if (!this.storage.isStorageAvailable(localStorage)) {
      return 0;
    }

    let cleaned = 0;
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('cin7_dsl_cache_')) {
        try {
          const item = localStorage.getItem(key);
          if (item) {
            const parsedItem: StorageItem = JSON.parse(item);
            if (parsedItem.ttl && Date.now() - parsedItem.timestamp > parsedItem.ttl) {
              keysToRemove.push(key);
            }
          }
        } catch {
          keysToRemove.push(key);
        }
      }
    }

    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      cleaned++;
    });

    return cleaned;
  }
}

// Default cache instance
export const cache = new CacheStorage();