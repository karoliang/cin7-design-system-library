/**
 * Base Component class for all Vanilla JS components
 * Provides common functionality for component lifecycle, events, and state management
 */

export interface ComponentOptions {
  element?: HTMLElement;
  className?: string;
  disabled?: boolean;
}

export interface EventListener<T = any> {
  (value: T): void;
}

export abstract class Component<T = any> {
  protected element: HTMLElement;
  protected listeners: Map<string, Set<EventListener>>;
  protected state: Map<string, any>;
  protected _disabled: boolean = false;

  constructor(options: ComponentOptions = {}) {
    this.listeners = new Map();
    this.state = new Map();
    this._disabled = options.disabled || false;
    
    // Create or use provided element
    this.element = options.element || this.createElement();
    
    // Add base class name
    if (options.className) {
      this.element.classList.add(options.className);
    }
    
    // Initialize component
    this.init();
  }

  /**
   * Create the component's DOM element
   * Must be implemented by subclasses
   */
  protected abstract createElement(): HTMLElement;

  /**
   * Initialize the component
   * Can be overridden by subclasses
   */
  protected init(): void {
    // Override in subclasses if needed
  }

  /**
   * Get the component's value
   */
  abstract get(): T;

  /**
   * Set the component's value
   */
  abstract set(value: T): void;

  /**
   * Subscribe to an event
   */
  on(event: string, listener: EventListener): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event)!.add(listener);
    
    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(event);
      if (listeners) {
        listeners.delete(listener);
      }
    };
  }

  /**
   * Emit an event to all listeners
   */
  protected emit(event: string, value?: any): void {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(value));
    }
  }

  /**
   * Enable/disable the component
   */
  setDisabled(disabled: boolean): void {
    this._disabled = disabled;
    if (disabled) {
      this.element.setAttribute('disabled', 'true');
      this.element.classList.add('disabled');
    } else {
      this.element.removeAttribute('disabled');
      this.element.classList.remove('disabled');
    }
  }

  /**
   * Check if component is disabled
   */
  isDisabled(): boolean {
    return this._disabled;
  }

  /**
   * Get the component's DOM element
   */
  getElement(): HTMLElement {
    return this.element;
  }

  /**
   * Mount the component to a parent element
   */
  mount(parent: HTMLElement | string): void {
    const parentElement = typeof parent === 'string' 
      ? document.querySelector(parent) as HTMLElement
      : parent;
    
    if (parentElement) {
      parentElement.appendChild(this.element);
    }
  }

  /**
   * Unmount the component
   */
  unmount(): void {
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }

  /**
   * Destroy the component and clean up
   */
  destroy(): void {
    this.unmount();
    this.listeners.clear();
    this.state.clear();
  }

  /**
   * Get internal state value
   */
  protected getState(key: string): any {
    return this.state.get(key);
  }

  /**
   * Set internal state value
   */
  protected setState(key: string, value: any): void {
    this.state.set(key, value);
  }
}