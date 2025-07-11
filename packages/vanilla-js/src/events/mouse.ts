/**
 * Mouse event utilities
 */

/**
 * Track mouse position
 */
export interface MousePosition {
  x: number;
  y: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

/**
 * Get current mouse position from event
 */
export function getMousePosition(event: MouseEvent): MousePosition {
  return {
    x: event.pageX,
    y: event.pageY,
    clientX: event.clientX,
    clientY: event.clientY,
    pageX: event.pageX,
    pageY: event.pageY,
  };
}

/**
 * Track mouse position globally
 */
export function trackMouse(): { position: MousePosition; stop: () => void } {
  let position: MousePosition = {
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
  };
  
  const handler = (event: MouseEvent) => {
    position = getMousePosition(event);
  };
  
  document.addEventListener('mousemove', handler);
  
  return {
    get position() {
      return { ...position };
    },
    stop: () => document.removeEventListener('mousemove', handler),
  };
}

/**
 * Long press detection
 */
export function onLongPress(
  element: EventTarget,
  handler: (event: MouseEvent) => void,
  duration: number = 500
): () => void {
  let timeoutId: NodeJS.Timeout;
  let isLongPress = false;
  
  const start = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;
    
    isLongPress = false;
    timeoutId = setTimeout(() => {
      isLongPress = true;
      handler(event);
    }, duration);
  };
  
  const cancel = () => {
    clearTimeout(timeoutId);
  };
  
  const click = (event: Event) => {
    if (isLongPress) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  
  element.addEventListener('mousedown', start);
  element.addEventListener('mouseup', cancel);
  element.addEventListener('mouseleave', cancel);
  element.addEventListener('click', click, true);
  
  return () => {
    element.removeEventListener('mousedown', start);
    element.removeEventListener('mouseup', cancel);
    element.removeEventListener('mouseleave', cancel);
    element.removeEventListener('click', click, true);
    clearTimeout(timeoutId);
  };
}

/**
 * Click outside detection
 */
export function onClickOutside(
  element: Element,
  handler: (event: MouseEvent) => void
): () => void {
  const listener = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;
    
    if (!element.contains(event.target as Node)) {
      handler(event);
    }
  };
  
  document.addEventListener('click', listener, true);
  return () => document.removeEventListener('click', listener, true);
}

/**
 * Double click with custom timing
 */
export function onDoubleClick(
  element: EventTarget,
  handler: (event: MouseEvent) => void,
  maxDelay: number = 300
): () => void {
  let lastClickTime = 0;
  
  const listener = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;
    
    const currentTime = Date.now();
    if (currentTime - lastClickTime < maxDelay) {
      handler(event);
      lastClickTime = 0;
    } else {
      lastClickTime = currentTime;
    }
  };
  
  element.addEventListener('click', listener);
  return () => element.removeEventListener('click', listener);
}