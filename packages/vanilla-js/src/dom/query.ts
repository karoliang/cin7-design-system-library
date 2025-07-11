/**
 * Lightweight DOM query utilities
 * No dependencies, pure vanilla JavaScript
 */

/**
 * Query single element with type safety
 */
export function $(selector: string): HTMLElement | null;
export function $<T extends HTMLElement>(selector: string): T | null;
export function $(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

/**
 * Query multiple elements with type safety
 */
export function $$(selector: string): NodeListOf<HTMLElement>;
export function $$<T extends HTMLElement>(selector: string): NodeListOf<T>;
export function $$(selector: string): NodeListOf<HTMLElement> {
  return document.querySelectorAll(selector);
}

/**
 * Query single element, throws if not found
 */
export function $required(selector: string, context?: string): HTMLElement;
export function $required<T extends HTMLElement>(selector: string, context?: string): T;
export function $required(selector: string, context?: string): HTMLElement {
  const element = $(selector);
  if (!element) {
    throw new Error(`Required element not found: ${selector}${context ? ` (${context})` : ''}`);
  }
  return element;
}

/**
 * Create element with attributes and children
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, any>,
  ...children: (string | Node)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  
  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key.startsWith('data-')) {
        element.setAttribute(key, value);
      } else if (key in element) {
        (element as any)[key] = value;
      }
    });
  }
  
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  
  return element;
}

/**
 * Wait for DOM ready
 */
export function ready(fn: () => void): void {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

/**
 * Insert element after another element
 */
export function insertAfter(newElement: Element, referenceElement: Element): void {
  referenceElement.parentNode?.insertBefore(newElement, referenceElement.nextSibling);
}

/**
 * Wrap element with another element
 */
export function wrap(element: Element, wrapper: Element): void {
  element.parentNode?.insertBefore(wrapper, element);
  wrapper.appendChild(element);
}

/**
 * Remove all children from element
 */
export function empty(element: Element): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}