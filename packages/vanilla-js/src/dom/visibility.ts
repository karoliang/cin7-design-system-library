/**
 * Visibility and display utilities
 */

/**
 * Show element
 */
export function show(element: HTMLElement): void {
  element.style.display = '';
  element.hidden = false;
}

/**
 * Hide element
 */
export function hide(element: HTMLElement): void {
  element.style.display = 'none';
}

/**
 * Toggle visibility
 */
export function toggle(element: HTMLElement, force?: boolean): void {
  if (force === undefined) {
    isVisible(element) ? hide(element) : show(element);
  } else {
    force ? show(element) : hide(element);
  }
}

/**
 * Check if element is visible
 */
export function isVisible(element: HTMLElement): boolean {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Fade in element
 */
export function fadeIn(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    element.style.opacity = '0';
    element.style.display = '';
    element.style.transition = `opacity ${duration}ms`;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.opacity = '1';
    
    setTimeout(() => {
      element.style.transition = '';
      resolve();
    }, duration);
  });
}

/**
 * Fade out element
 */
export function fadeOut(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      element.style.transition = '';
      element.style.opacity = '';
      resolve();
    }, duration);
  });
}

/**
 * Slide down element
 */
export function slideDown(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    element.style.overflow = 'hidden';
    element.style.height = '0';
    element.style.display = '';
    
    const height = element.scrollHeight;
    element.style.transition = `height ${duration}ms`;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.height = `${height}px`;
    
    setTimeout(() => {
      element.style.height = '';
      element.style.transition = '';
      element.style.overflow = '';
      resolve();
    }, duration);
  });
}

/**
 * Slide up element
 */
export function slideUp(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    element.style.overflow = 'hidden';
    element.style.height = `${element.scrollHeight}px`;
    element.style.transition = `height ${duration}ms`;
    
    // Force reflow
    element.offsetHeight;
    
    element.style.height = '0';
    
    setTimeout(() => {
      element.style.display = 'none';
      element.style.height = '';
      element.style.transition = '';
      element.style.overflow = '';
      resolve();
    }, duration);
  });
}