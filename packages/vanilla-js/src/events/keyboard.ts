/**
 * Keyboard event utilities
 */

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: (event: KeyboardEvent) => void;
}

/**
 * Common key codes
 */
export const Keys = {
  ENTER: 'Enter',
  ESCAPE: 'Escape',
  SPACE: ' ',
  TAB: 'Tab',
  DELETE: 'Delete',
  BACKSPACE: 'Backspace',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

/**
 * Check if key combination matches
 */
export function isKeyCombo(
  event: KeyboardEvent,
  combo: Partial<KeyboardShortcut>
): boolean {
  return (
    event.key === combo.key &&
    !!event.ctrlKey === !!combo.ctrl &&
    !!event.shiftKey === !!combo.shift &&
    !!event.altKey === !!combo.alt &&
    !!event.metaKey === !!combo.meta
  );
}

/**
 * Add keyboard shortcut listener
 */
export function onKey(
  element: EventTarget,
  shortcut: KeyboardShortcut,
  options?: boolean | AddEventListenerOptions
): () => void {
  const handler = (event: Event) => {
    if (event instanceof KeyboardEvent && isKeyCombo(event, shortcut)) {
      event.preventDefault();
      shortcut.handler(event);
    }
  };
  
  element.addEventListener('keydown', handler, options);
  return () => element.removeEventListener('keydown', handler, options);
}

/**
 * Add multiple keyboard shortcuts
 */
export function onKeys(
  element: EventTarget,
  shortcuts: KeyboardShortcut[],
  options?: boolean | AddEventListenerOptions
): () => void {
  const handler = (event: Event) => {
    if (!(event instanceof KeyboardEvent)) return;
    
    for (const shortcut of shortcuts) {
      if (isKeyCombo(event, shortcut)) {
        event.preventDefault();
        shortcut.handler(event);
        break;
      }
    }
  };
  
  element.addEventListener('keydown', handler, options);
  return () => element.removeEventListener('keydown', handler, options);
}

/**
 * Trap focus within element
 */
export function trapFocus(element: HTMLElement): () => void {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'textarea:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(',');
  
  const focusableElements = element.querySelectorAll(focusableSelectors);
  const firstFocusable = focusableElements[0] as HTMLElement;
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handler = (event: Event) => {
    if (!(event instanceof KeyboardEvent) || event.key !== 'Tab') return;
    
    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable?.focus();
    } else if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable?.focus();
    }
  };
  
  element.addEventListener('keydown', handler);
  firstFocusable?.focus();
  
  return () => element.removeEventListener('keydown', handler);
}