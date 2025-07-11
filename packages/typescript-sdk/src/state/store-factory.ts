/**
 * State management patterns for Cin7 DSL
 * Framework-agnostic patterns that work with Zustand or any state manager
 */

import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Base store interface
 */
export interface BaseStore {
  reset: () => void;
}

/**
 * Store configuration
 */
export interface StoreConfig<T> {
  name: string;
  persist?: boolean;
  devtools?: boolean;
  initialState: T;
}

/**
 * Create a typed store with middleware
 */
export function createStore<T extends BaseStore>(
  config: StoreConfig<Omit<T, 'reset'>>,
  stateCreator: StateCreator<
    T,
    [['zustand/devtools', never], ['zustand/persist', unknown], ['zustand/immer', never]],
    [],
    T
  >
) {
  const { name, persist: enablePersist, devtools: enableDevtools, initialState } = config;

  // Build middleware stack
  let store = immer(stateCreator);

  if (enablePersist) {
    store = persist(store, {
      name: `${name}-storage`,
      partialize: (state) => {
        const { reset, ...persistableState } = state as T;
        return persistableState;
      },
    }) as any;
  }

  if (enableDevtools && process.env.NODE_ENV === 'development') {
    store = devtools(store, { name }) as any;
  }

  return create<T>()(store);
}

/**
 * Async actions helper
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function createAsyncState<T>(initialData: T | null = null): AsyncState<T> {
  return {
    data: initialData,
    loading: false,
    error: null,
  };
}

/**
 * Async actions creator
 */
export interface AsyncActions<T> {
  setLoading: (loading: boolean) => void;
  setData: (data: T) => void;
  setError: (error: string) => void;
  reset: () => void;
}

export function createAsyncActions<T>(
  set: (fn: (state: any) => void) => void,
  statePath: string
): AsyncActions<T> {
  return {
    setLoading: (loading) => set((state) => {
      state[statePath].loading = loading;
      if (loading) {
        state[statePath].error = null;
      }
    }),
    setData: (data) => set((state) => {
      state[statePath].data = data;
      state[statePath].loading = false;
      state[statePath].error = null;
    }),
    setError: (error) => set((state) => {
      state[statePath].error = error;
      state[statePath].loading = false;
    }),
    reset: () => set((state) => {
      state[statePath] = createAsyncState<T>();
    }),
  };
}

/**
 * Selection helper
 */
export function createSelectors<T extends object>(store: T) {
  const selectors: Record<string, (state: T) => any> = {};
  
  Object.keys(store).forEach((key) => {
    selectors[key] = (state: T) => state[key as keyof T];
  });
  
  return selectors as {
    [K in keyof T]: (state: T) => T[K];
  };
}

/**
 * Computed values helper
 */
export interface ComputedValue<T, R> {
  selector: (state: T) => R;
  dependencies: Array<keyof T>;
}

export function createComputed<T, R>(
  selector: (state: T) => R,
  dependencies: Array<keyof T>
): ComputedValue<T, R> {
  return { selector, dependencies };
}

/**
 * Store slice pattern
 */
export interface StoreSlice<T> {
  getState: () => T;
  setState: (state: Partial<T>) => void;
  subscribe: (listener: (state: T) => void) => () => void;
  destroy: () => void;
}

export function createStoreSlice<T>(
  initialState: T,
  name?: string
): StoreSlice<T> {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,
    setState: (newState) => {
      state = { ...state, ...newState };
      listeners.forEach(listener => listener(state));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    destroy: () => {
      listeners.clear();
    },
  };
}

/**
 * Store composition helper
 */
export function composeStores<T extends Record<string, any>>(
  stores: T
): {
  getState: () => { [K in keyof T]: ReturnType<T[K]['getState']> };
  subscribe: (listener: (state: any) => void) => () => void;
} {
  const getState = () => {
    const state: any = {};
    Object.entries(stores).forEach(([key, store]) => {
      state[key] = store.getState();
    });
    return state;
  };

  const subscribe = (listener: (state: any) => void) => {
    const unsubscribes = Object.values(stores).map(store =>
      store.subscribe(() => listener(getState()))
    );
    
    return () => unsubscribes.forEach(unsub => unsub());
  };

  return { getState, subscribe };
}