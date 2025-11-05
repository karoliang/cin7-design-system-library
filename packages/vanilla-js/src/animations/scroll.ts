/**
 * Scroll animation utilities for smooth scrolling and scroll-based animations
 */

export interface ScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
  callback?: () => void;
}

export interface ScrollToOptions extends ScrollOptions {
  element?: HTMLElement | Window;
}

/**
 * Easing functions for scroll animations
 */
export const ScrollEasing = {
  LINEAR: (t: number): number => t,

  EASE_IN: (t: number): number => t * t,

  EASE_OUT: (t: number): number => t * (2 - t),

  EASE_IN_OUT: (t: number): number => t < 0.5
    ? 2 * t * t
    : -1 + (4 - 2 * t) * t,

  EASE_OUT_QUART: (t: number): number => 1 - (--t) * t * t * t,

  EASE_IN_QUART: (t: number): number => t * t * t * t,

  EASE_IN_OUT_QUART: (t: number): number => t < 0.5
    ? 8 * t * t * t * t
    : 1 - 8 * (--t) * t * t * t,
} as const;

/**
 * Smooth scroll utility class
 */
export class ScrollAnimator {
  private element: HTMLElement | Window;
  private isScrolling: boolean = false;

  constructor(element: HTMLElement | Window = window) {
    this.element = element;
  }

  /**
   * Smooth scroll to a specific position
   */
  scrollTo(target: number, options: ScrollOptions = {}): Promise<void> {
    if (this.isScrolling) {
      return Promise.resolve();
    }

    this.isScrolling = true;

    const duration = options.duration || 500;
    const easing = options.easing || ScrollEasing.EASE_OUT_QUART;
    const offset = options.offset || 0;
    const finalTarget = target + offset;

    return new Promise((resolve) => {
      const start = this.getCurrentScrollPosition();
      const distance = finalTarget - start;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easing(progress);
        const currentPosition = start + distance * easedProgress;

        this.setScrollPosition(currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          this.isScrolling = false;
          options.callback?.();
          resolve();
        }
      };

      requestAnimationFrame(animateScroll);
    });
  }

  /**
   * Smooth scroll to an element
   */
  scrollToElement(element: HTMLElement, options: ScrollOptions = {}): Promise<void> {
    const targetPosition = this.getElementPosition(element);
    return this.scrollTo(targetPosition, options);
  }

  /**
   * Smooth scroll to top
   */
  scrollToTop(options: ScrollOptions = {}): Promise<void> {
    return this.scrollTo(0, options);
  }

  /**
   * Smooth scroll to bottom
   */
  scrollToBottom(options: ScrollOptions = {}): Promise<void> {
    const targetPosition = this.getMaxScrollPosition();
    return this.scrollTo(targetPosition, options);
  }

  /**
   * Get current scroll position
   */
  private getCurrentScrollPosition(): number {
    if (this.element === window) {
      return window.pageYOffset || document.documentElement.scrollTop;
    } else {
      return (this.element as HTMLElement).scrollTop;
    }
  }

  /**
   * Set scroll position
   */
  private setScrollPosition(position: number): void {
    if (this.element === window) {
      window.scrollTo(0, position);
    } else {
      (this.element as HTMLElement).scrollTop = position;
    }
  }

  /**
   * Get element's position relative to the scroll container
   */
  private getElementPosition(element: HTMLElement): number {
    if (this.element === window) {
      return element.getBoundingClientRect().top + window.pageYOffset;
    } else {
      const container = this.element as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      return elementRect.top - containerRect.top + container.scrollTop;
    }
  }

  /**
   * Get maximum scroll position
   */
  private getMaxScrollPosition(): number {
    if (this.element === window) {
      return Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;
    } else {
      const element = this.element as HTMLElement;
      return element.scrollHeight - element.clientHeight;
    }
  }

  /**
   * Check if currently scrolling
   */
  get isActive(): boolean {
    return this.isScrolling;
  }
}

/**
 * Scroll-triggered animation utility
 */
export class ScrollTrigger {
  private element: HTMLElement;
  private callback: (entry: IntersectionObserverEntry) => void;
  private observer: IntersectionObserver;
  private options: IntersectionObserverInit;

  constructor(
    element: HTMLElement,
    callback: (entry: IntersectionObserverEntry) => void,
    options: IntersectionObserverInit = {}
  ) {
    this.element = element;
    this.callback = callback;

    this.options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options,
    };

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(this.callback);
      },
      this.options
    );

    this.observe();
  }

  /**
   * Start observing the element
   */
  observe(): void {
    this.observer.observe(this.element);
  }

  /**
   * Stop observing the element
   */
  unobserve(): void {
    this.observer.unobserve(this.element);
  }

  /**
   * Disconnect the observer completely
   */
  disconnect(): void {
    this.observer.disconnect();
  }
}

/**
 * Parallax scrolling utility
 */
export class ParallaxScroller {
  private element: HTMLElement;
  private speed: number;
  private direction: 'vertical' | 'horizontal';
  private scrollListener: () => void;
  private ticking: boolean = false;

  constructor(
    element: HTMLElement,
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical'
  ) {
    this.element = element;
    this.speed = speed;
    this.direction = direction;

    this.scrollListener = () => {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updatePosition();
          this.ticking = false;
        });
        this.ticking = true;
      }
    };

    this.init();
  }

  /**
   * Initialize parallax scrolling
   */
  private init(): void {
    window.addEventListener('scroll', this.scrollListener);
    this.updatePosition();
  }

  /**
   * Update element position based on scroll
   */
  private updatePosition(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const movement = scrollPosition * this.speed;

    if (this.direction === 'vertical') {
      this.element.style.transform = `translateY(${movement}px)`;
    } else {
      this.element.style.transform = `translateX(${movement}px)`;
    }
  }

  /**
   * Update parallax speed
   */
  setSpeed(speed: number): void {
    this.speed = speed;
    this.updatePosition();
  }

  /**
   * Update parallax direction
   */
  setDirection(direction: 'vertical' | 'horizontal'): void {
    this.direction = direction;
    this.updatePosition();
  }

  /**
   * Destroy parallax scrolling
   */
  destroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
    this.element.style.transform = '';
  }
}

/**
 * Convenience functions for common scroll operations
 */
export const scroll = {
  /**
   * Smooth scroll to element
   */
  toElement: (element: HTMLElement, options?: ScrollToOptions): Promise<void> => {
    const animator = new ScrollAnimator(options?.element);
    return animator.scrollToElement(element, options);
  },

  /**
   * Smooth scroll to position
   */
  to: (target: number, options?: ScrollToOptions): Promise<void> => {
    const animator = new ScrollAnimator(options?.element);
    return animator.scrollTo(target, options);
  },

  /**
   * Smooth scroll to top
   */
  toTop: (options?: ScrollToOptions): Promise<void> => {
    const animator = new ScrollAnimator(options?.element);
    return animator.scrollToTop(options);
  },

  /**
   * Smooth scroll to bottom
   */
  toBottom: (options?: ScrollToOptions): Promise<void> => {
    const animator = new ScrollAnimator(options?.element);
    return animator.scrollToBottom(options);
  },

  /**
   * Create scroll trigger
   */
  trigger: (
    element: HTMLElement,
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
  ): ScrollTrigger => new ScrollTrigger(element, callback, options),

  /**
   * Create parallax effect
   */
  parallax: (
    element: HTMLElement,
    speed?: number,
    direction?: 'vertical' | 'horizontal'
  ): ParallaxScroller => new ParallaxScroller(element, speed, direction),
};

/**
 * Scroll spy utility for navigation highlighting
 */
export class ScrollSpy {
  private sections: HTMLElement[];
  private navItems: HTMLElement[];
  private activeClass: string;
  private offset: number;
  private scrollListener: () => void;

  constructor(
    sections: HTMLElement[],
    navItems: HTMLElement[],
    activeClass: string = 'active',
    offset: number = 100
  ) {
    this.sections = sections;
    this.navItems = navItems;
    this.activeClass = activeClass;
    this.offset = offset;

    this.scrollListener = () => {
      this.updateActiveSection();
    };

    this.init();
  }

  /**
   * Initialize scroll spy
   */
  private init(): void {
    window.addEventListener('scroll', this.scrollListener);
    this.updateActiveSection();
  }

  /**
   * Update active section based on scroll position
   */
  private updateActiveSection(): void {
    const scrollPosition = window.pageYOffset + this.offset;

    // Remove active class from all nav items
    this.navItems.forEach(item => {
      item.classList.remove(this.activeClass);
    });

    // Find current section
    let currentSection = null;
    for (let i = this.sections.length - 1; i >= 0; i--) {
      const section = this.sections[i];
      const sectionTop = section.offsetTop;

      if (scrollPosition >= sectionTop) {
        currentSection = i;
        break;
      }
    }

    // Add active class to corresponding nav item
    if (currentSection !== null && this.navItems[currentSection]) {
      this.navItems[currentSection].classList.add(this.activeClass);
    }
  }

  /**
   * Destroy scroll spy
   */
  destroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
    this.navItems.forEach(item => {
      item.classList.remove(this.activeClass);
    });
  }
}