/**
 * Event listener utilities
 * Enhanced event handling for vanilla JavaScript
 */

type EventHandler = (event: Event) => void;

/**
 * Add event listener with automatic cleanup
 */
export function on<K extends keyof HTMLElementEventMap>(
  element: EventTarget,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): () => void;
export function on(
  element: EventTarget,
  event: string,
  handler: EventHandler,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options);
  return () => element.removeEventListener(event, handler, options);
}

/**
 * Add one-time event listener
 */
export function once<K extends keyof HTMLElementEventMap>(
  element: EventTarget,
  event: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function once(
  element: EventTarget,
  event: string,
  handler: EventHandler,
  options?: boolean | AddEventListenerOptions
): void {
  const onceHandler = (e: Event) => {
    handler(e);
    element.removeEventListener(event, onceHandler, options);
  };
  element.addEventListener(event, onceHandler, options);
}

/**
 * Event delegation
 */
export function delegate<K extends keyof HTMLElementEventMap>(
  element: EventTarget,
  selector: string,
  event: K,
  handler: (event: HTMLElementEventMap[K], target: Element) => void,
  options?: boolean | AddEventListenerOptions
): () => void;
export function delegate(
  element: EventTarget,
  selector: string,
  event: string,
  handler: (event: Event, target: Element) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  const delegateHandler = (e: Event) => {
    const target = (e.target as Element).closest(selector);
    if (target && element instanceof Element && element.contains(target)) {
      handler(e, target);
    }
  };
  
  element.addEventListener(event, delegateHandler, options);
  return () => element.removeEventListener(event, delegateHandler, options);
}

/**
 * Add multiple event listeners
 */
export function onMultiple(
  element: EventTarget,
  events: string[],
  handler: EventHandler,
  options?: boolean | AddEventListenerOptions
): () => void {
  const cleanups = events.map(event => on(element, event, handler, options));
  return () => cleanups.forEach(cleanup => cleanup());
}

/**
 * Trigger custom event
 */
export function trigger<T = any>(
  element: EventTarget,
  eventName: string,
  detail?: T,
  options?: EventInit
): boolean {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  return element.dispatchEvent(event);
}

/**
 * Wait for event
 */
export function waitForEvent<K extends keyof HTMLElementEventMap>(
  element: EventTarget,
  event: K,
  timeout?: number
): Promise<HTMLElementEventMap[K]>;
export function waitForEvent(
  element: EventTarget,
  event: string,
  timeout?: number
): Promise<Event> {
  return new Promise((resolve, reject) => {
    const cleanup = on(element, event, (e) => {
      cleanup();
      resolve(e);
    });
    
    if (timeout) {
      setTimeout(() => {
        cleanup();
        reject(new Error(`Event ${event} timeout after ${timeout}ms`));
      }, timeout);
    }
  });
}

/**
 * Debounced event handler
 */
export function onDebounced(
  element: EventTarget,
  event: string,
  handler: EventHandler,
  delay: number,
  options?: boolean | AddEventListenerOptions
): () => void {
  let timeoutId: NodeJS.Timeout;
  
  const debouncedHandler = (e: Event) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => handler(e), delay);
  };
  
  return on(element, event, debouncedHandler, options);
}

/**
 * Throttled event handler
 */
export function onThrottled(
  element: EventTarget,
  event: string,
  handler: EventHandler,
  limit: number,
  options?: boolean | AddEventListenerOptions
): () => void {
  let inThrottle = false;
  
  const throttledHandler = (e: Event) => {
    if (!inThrottle) {
      handler(e);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
  
  return on(element, event, throttledHandler, options);
}