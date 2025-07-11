/**
 * Event handling utilities for vanilla JavaScript interactions
 */

export class EventUtils {
  static on<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions
  ): () => void {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  }

  static once<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void
  ): void {
    const onceHandler = (e: HTMLElementEventMap[K]) => {
      handler(e);
      element.removeEventListener(event, onceHandler);
    };
    element.addEventListener(event, onceHandler);
  }

  static delegate<K extends keyof HTMLElementEventMap>(
    container: HTMLElement,
    selector: string,
    event: K,
    handler: (event: HTMLElementEventMap[K], target: HTMLElement) => void
  ): () => void {
    const delegateHandler = (e: HTMLElementEventMap[K]) => {
      const target = (e.target as HTMLElement).closest(selector);
      if (target && container.contains(target)) {
        handler(e, target as HTMLElement);
      }
    };

    container.addEventListener(event, delegateHandler);
    return () => container.removeEventListener(event, delegateHandler);
  }

  static emit<T = any>(eventName: string, detail?: T): boolean {
    return document.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        cancelable: true,
      })
    );
  }

  static listen<T = any>(
    eventName: string,
    handler: (event: CustomEvent<T>) => void
  ): () => void {
    const listener = (e: Event) => handler(e as CustomEvent<T>);
    document.addEventListener(eventName, listener);
    return () => document.removeEventListener(eventName, listener);
  }
}

/**
 * Simple event bus for component communication
 */
export class EventBus {
  private events: Map<string, Set<Function>> = new Map();

  on(event: string, handler: Function): () => void {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event)!.add(handler);

    // Return unsubscribe function
    return () => this.off(event, handler);
  }

  off(event: string, handler: Function): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.events.delete(event);
      }
    }
  }

  emit(event: string, data?: any): void {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(data));
    }
  }

  clear(): void {
    this.events.clear();
  }
}