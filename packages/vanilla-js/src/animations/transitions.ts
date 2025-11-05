/**
 * Transition utilities for smooth element animations
 */

export interface TransitionOptions {
  duration?: number;
  easing?: string;
  delay?: number;
}

export interface Transition {
  property: string;
  duration: number;
  easing: string;
  delay: number;
}

/**
 * Pre-defined easing functions
 */
export const Easing = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',

  // Custom cubic-bezier functions
  EASE_OUT_CUBIC: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
  EASE_IN_QUART: 'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
  EASE_OUT_QUART: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
  EASE_IN_OUT_QUART: 'cubic-bezier(0.770, 0.000, 0.175, 1.000)',
  EASE_OUT_QUINT: 'cubic-bezier(0.230, 1.000, 0.320, 1.000)',
  EASE_IN_OUT_QUINT: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)',
} as const;

/**
 * Pre-defined transition durations
 */
export const Duration = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

/**
 * Create a transition string
 */
export function createTransition(
  properties: string | string[],
  duration: number = Duration.NORMAL,
  easing: string = Easing.EASE_OUT,
  delay: number = 0
): string {
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  return `${props} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ''}`;
}

/**
 * Transition utility class
 */
export class TransitionManager {
  private element: HTMLElement;
  private transitions: Map<string, Transition> = new Map();
  private runningAnimations: Map<string, Promise<void>> = new Map();

  constructor(element: HTMLElement) {
    this.element = element;
  }

  /**
   * Add a transition to an element
   */
  add(property: string, options: TransitionOptions = {}): void {
    const transition: Transition = {
      property,
      duration: options.duration || Duration.NORMAL,
      easing: options.easing || Easing.EASE_OUT,
      delay: options.delay || 0,
    };

    this.transitions.set(property, transition);
    this.updateElementStyles();
  }

  /**
   * Remove a transition
   */
  remove(property: string): void {
    this.transitions.delete(property);
    this.updateElementStyles();
  }

  /**
   * Clear all transitions
   */
  clear(): void {
    this.transitions.clear();
    this.updateElementStyles();
  }

  /**
   * Animate to a new state
   */
  async animate(property: string, value: string, options: TransitionOptions = {}): Promise<void> {
    const animationKey = `${property}_${Date.now()}`;

    // If there's already an animation running for this property, wait for it
    const existingAnimation = this.runningAnimations.get(property);
    if (existingAnimation) {
      await existingAnimation;
    }

    // Add or update the transition
    this.add(property, options);

    // Create a promise that resolves when the transition completes
    const animationPromise = new Promise<void>((resolve) => {
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === property) {
          this.element.removeEventListener('transitionend', handleTransitionEnd);
          this.runningAnimations.delete(property);
          resolve();
        }
      };

      this.element.addEventListener('transitionend', handleTransitionEnd);

      // Apply the new value
      this.element.style.setProperty(property, value);

      // Fallback timeout in case transitionend doesn't fire
      const timeout = setTimeout(() => {
        this.element.removeEventListener('transitionend', handleTransitionEnd);
        this.runningAnimations.delete(property);
        resolve();
      }, (options.duration || Duration.NORMAL) + (options.delay || 0) + 100);

      // Clean up timeout if animation completes normally
      const originalResolve = resolve;
      resolve = () => {
        clearTimeout(timeout);
        originalResolve();
      };
    });

    this.runningAnimations.set(property, animationPromise);
    return animationPromise;
  }

  /**
   * Animate multiple properties simultaneously
   */
  async animateMultiple(
    animations: Array<{ property: string; value: string; options?: TransitionOptions }>
  ): Promise<void> {
    const promises = animations.map(({ property, value, options }) =>
      this.animate(property, value, options)
    );

    await Promise.all(promises);
  }

  /**
   * Wait for all running animations to complete
   */
  async waitForAll(): Promise<void> {
    const promises = Array.from(this.runningAnimations.values());
    if (promises.length > 0) {
      await Promise.all(promises);
    }
  }

  /**
   * Update the element's transition style
   */
  private updateElementStyles(): void {
    if (this.transitions.size === 0) {
      this.element.style.transition = '';
      return;
    }

    const transitionStrings = Array.from(this.transitions.values()).map(
      t => `${t.property} ${t.duration}ms ${t.easing}${t.delay > 0 ? ` ${t.delay}ms` : ''}`
    );

    this.element.style.transition = transitionStrings.join(', ');
  }

  /**
   * Check if any animations are currently running
   */
  get isAnimating(): boolean {
    return this.runningAnimations.size > 0;
  }

  /**
   * Get the number of currently running animations
   */
  get activeAnimationsCount(): number {
    return this.runningAnimations.size;
  }
}

/**
 * Common transition presets
 */
export const Presets = {
  /**
   * Fade in transition
   */
  fadeIn: {
    property: 'opacity',
    duration: Duration.NORMAL,
    easing: Easing.EASE_OUT,
  },

  /**
   * Fade out transition
   */
  fadeOut: {
    property: 'opacity',
    duration: Duration.NORMAL,
    easing: Easing.EASE_IN,
  },

  /**
   * Slide up transition
   */
  slideUp: {
    property: 'transform',
    duration: Duration.NORMAL,
    easing: Easing.EASE_OUT_QUART,
  },

  /**
   * Slide down transition
   */
  slideDown: {
    property: 'transform',
    duration: Duration.NORMAL,
    easing: Easing.EASE_OUT_QUART,
  },

  /**
   * Scale in transition
   */
  scaleIn: {
    property: 'transform',
    duration: Duration.NORMAL,
    easing: Easing.EASE_OUT_BACK,
  },

  /**
   * Scale out transition
   */
  scaleOut: {
    property: 'transform',
    duration: Duration.NORMAL,
    easing: Easing.EASE_IN_BACK,
  },
} as const;

/**
 * Convenience functions for common transitions
 */
export const transitions = {
  /**
   * Fade an element in
   */
  fadeIn: (element: HTMLElement, duration?: number): Promise<void> => {
    const manager = new TransitionManager(element);
    return manager.animate('opacity', '1', { duration });
  },

  /**
   * Fade an element out
   */
  fadeOut: (element: HTMLElement, duration?: number): Promise<void> => {
    const manager = new TransitionManager(element);
    return manager.animate('opacity', '0', { duration });
  },

  /**
   * Slide an element up
   */
  slideUp: (element: HTMLElement, distance: string = '-100%', duration?: number): Promise<void> => {
    const manager = new TransitionManager(element);
    return manager.animate('transform', `translateY(${distance})`, { duration });
  },

  /**
   * Slide an element down
   */
  slideDown: (element: HTMLElement, distance: string = '100%', duration?: number): Promise<void> => {
    const manager = new TransitionManager(element);
    return manager.animate('transform', `translateY(${distance})`, { duration });
  },

  /**
   * Scale an element in
   */
  scaleIn: (element: HTMLElement, scale: number = 1, duration?: number): Promise<void> => {
    const manager = new TransitionManager(element);
    return manager.animate('transform', `scale(${scale})`, { duration });
  },

  /**
   * Scale an element out
   */
  scaleOut: (element: HTMLElement, scale: number = 0, duration?: number): Promise<void> => {
    const manager = new TransitionManager(element);
    return manager.animate('transform', `scale(${scale})`, { duration });
  },
};