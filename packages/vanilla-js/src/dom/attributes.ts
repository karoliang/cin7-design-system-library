/**
 * Attribute manipulation utilities
 */

/**
 * Get data attribute value
 */
export function getData(element: Element, key: string): string | null {
  return element.getAttribute(`data-${key}`);
}

/**
 * Set data attribute value
 */
export function setData(element: Element, key: string, value: string): void {
  element.setAttribute(`data-${key}`, value);
}

/**
 * Remove data attribute
 */
export function removeData(element: Element, key: string): void {
  element.removeAttribute(`data-${key}`);
}

/**
 * Get all data attributes as object
 */
export function getAllData(element: HTMLElement): Record<string, string> {
  return { ...element.dataset };
}

/**
 * Set multiple attributes
 */
export function setAttributes(element: Element, attrs: Record<string, string | number | boolean>): void {
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === false || value === null || value === undefined) {
      element.removeAttribute(key);
    } else {
      element.setAttribute(key, String(value));
    }
  });
}

/**
 * Toggle attribute
 */
export function toggleAttribute(element: Element, name: string, force?: boolean): boolean {
  if (force === undefined) {
    return element.toggleAttribute(name);
  }
  
  if (force) {
    element.setAttribute(name, '');
    return true;
  } else {
    element.removeAttribute(name);
    return false;
  }
}

/**
 * Copy attributes from one element to another
 */
export function copyAttributes(from: Element, to: Element, exclude: string[] = []): void {
  Array.from(from.attributes).forEach(attr => {
    if (!exclude.includes(attr.name)) {
      to.setAttribute(attr.name, attr.value);
    }
  });
}