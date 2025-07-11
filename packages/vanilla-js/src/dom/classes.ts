/**
 * Class manipulation utilities
 * Lightweight alternatives to classList API with extra features
 */

/**
 * Add classes to element
 */
export function addClass(element: Element, ...classes: string[]): void {
  classes.forEach(cls => {
    if (cls) element.classList.add(...cls.split(' '));
  });
}

/**
 * Remove classes from element
 */
export function removeClass(element: Element, ...classes: string[]): void {
  classes.forEach(cls => {
    if (cls) element.classList.remove(...cls.split(' '));
  });
}

/**
 * Toggle classes on element
 */
export function toggleClass(element: Element, className: string, force?: boolean): boolean {
  return element.classList.toggle(className, force);
}

/**
 * Check if element has class
 */
export function hasClass(element: Element, className: string): boolean {
  return element.classList.contains(className);
}

/**
 * Replace class on element
 */
export function replaceClass(element: Element, oldClass: string, newClass: string): void {
  removeClass(element, oldClass);
  addClass(element, newClass);
}

/**
 * Add class temporarily
 */
export function addClassTemporary(
  element: Element,
  className: string,
  duration: number
): void {
  addClass(element, className);
  setTimeout(() => removeClass(element, className), duration);
}

/**
 * Toggle class on multiple elements
 */
export function toggleClassOnElements(
  elements: Element[] | NodeListOf<Element>,
  className: string,
  force?: boolean
): void {
  Array.from(elements).forEach(el => toggleClass(el, className, force));
}

/**
 * Conditional class toggle
 */
export function setClass(
  element: Element,
  className: string,
  condition: boolean
): void {
  toggleClass(element, className, condition);
}

/**
 * Class list builder
 */
export function classNames(...args: (string | Record<string, boolean> | undefined)[]): string {
  const classes: string[] = [];
  
  args.forEach(arg => {
    if (!arg) return;
    
    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      Object.entries(arg).forEach(([cls, condition]) => {
        if (condition) classes.push(cls);
      });
    }
  });
  
  return classes.join(' ');
}