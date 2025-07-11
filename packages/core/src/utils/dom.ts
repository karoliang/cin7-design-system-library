/**
 * DOM manipulation utilities for vanilla JavaScript interactions
 */

export class DOMUtils {
  static addClass(element: HTMLElement, className: string): void {
    element.classList.add(className);
  }

  static removeClass(element: HTMLElement, className: string): void {
    element.classList.remove(className);
  }

  static toggleClass(element: HTMLElement, className: string): void {
    element.classList.toggle(className);
  }

  static hasClass(element: HTMLElement, className: string): boolean {
    return element.classList.contains(className);
  }

  static animate(
    element: HTMLElement,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions
  ): Animation {
    return element.animate(keyframes, options);
  }

  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static waitForElement(
    selector: string,
    timeout = 5000
  ): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) {
        return resolve(element);
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }
}