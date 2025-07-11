/**
 * DOM traversal utilities
 */

/**
 * Get parent element that matches selector
 */
export function closest<T extends Element = Element>(
  element: Element,
  selector: string
): T | null {
  return element.closest(selector) as T | null;
}

/**
 * Get all parent elements up to (but not including) match
 */
export function parents(element: Element, selector?: string): Element[] {
  const parents: Element[] = [];
  let parent = element.parentElement;
  
  while (parent) {
    if (!selector || parent.matches(selector)) {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  
  return parents;
}

/**
 * Get all sibling elements
 */
export function siblings(element: Element): Element[] {
  return Array.from(element.parentElement?.children || [])
    .filter(child => child !== element);
}

/**
 * Get next sibling that matches selector
 */
export function nextSibling(element: Element, selector?: string): Element | null {
  let sibling = element.nextElementSibling;
  
  while (sibling) {
    if (!selector || sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.nextElementSibling;
  }
  
  return null;
}

/**
 * Get previous sibling that matches selector
 */
export function previousSibling(element: Element, selector?: string): Element | null {
  let sibling = element.previousElementSibling;
  
  while (sibling) {
    if (!selector || sibling.matches(selector)) {
      return sibling;
    }
    sibling = sibling.previousElementSibling;
  }
  
  return null;
}

/**
 * Get index of element among siblings
 */
export function index(element: Element): number {
  if (!element.parentElement) return -1;
  return Array.from(element.parentElement.children).indexOf(element);
}

/**
 * Find all descendant elements matching selector
 */
export function find<T extends Element = Element>(
  element: Element,
  selector: string
): T[] {
  return Array.from(element.querySelectorAll(selector));
}

/**
 * Find first descendant element matching selector
 */
export function findOne<T extends Element = Element>(
  element: Element,
  selector: string
): T | null {
  return element.querySelector(selector);
}