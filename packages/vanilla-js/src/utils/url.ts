/**
 * URL utility functions for parsing, manipulating, and working with URLs
 */

/**
 * Parse URL parameters into an object
 */
export function parseParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const searchParams = new URL(url).searchParams;

  for (const [key, value] of searchParams) {
    params[key] = value;
  }

  return params;
}

/**
 * Convert an object to URL parameters string
 */
export function objectToParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      searchParams.append(key, String(value));
    }
  }

  return searchParams.toString();
}

/**
 * Add or update parameters in a URL
 */
export function updateUrlParams(url: string, params: Record<string, any>): string {
  const urlObj = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      urlObj.searchParams.set(key, String(value));
    } else {
      urlObj.searchParams.delete(key);
    }
  }

  return urlObj.toString();
}

/**
 * Remove parameters from a URL
 */
export function removeUrlParams(url: string, paramNames: string[]): string {
  const urlObj = new URL(url);

  paramNames.forEach(paramName => {
    urlObj.searchParams.delete(paramName);
  });

  return urlObj.toString();
}

/**
 * Check if a URL is absolute
 */
export function isAbsoluteUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the base URL (origin + pathname) from a full URL
 */
export function getBaseUrl(url: string): string {
  const urlObj = new URL(url);
  return `${urlObj.origin}${urlObj.pathname}`;
}

/**
 * Get the domain from a URL
 */
export function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

/**
 * Build a URL from base and path
 */
export function buildUrl(base: string, path: string, params?: Record<string, any>): string {
  const baseUrl = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  let url = baseUrl + cleanPath;

  if (params) {
    const paramString = objectToParams(params);
    if (paramString) {
      url += `?${paramString}`;
    }
  }

  return url;
}

/**
 * URL validation utilities
 */
export const UrlValidator = {
  /**
   * Validate if a string is a valid URL
   */
  isValid: (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Check if URL uses HTTPS
   */
  isHttps: (url: string): boolean => {
    try {
      return new URL(url).protocol === 'https:';
    } catch {
      return false;
    }
  },

  /**
   * Check if URL is from a specific domain
   */
  isFromDomain: (url: string, domain: string): boolean => {
    try {
      return new URL(url).hostname === domain || new URL(url).hostname.endsWith(`.${domain}`);
    } catch {
      return false;
    }
  },

  /**
   * Check if URL has a specific path pattern
   */
  hasPathPattern: (url: string, pattern: RegExp): boolean => {
    try {
      return pattern.test(new URL(url).pathname);
    } catch {
      return false;
    }
  }
};

/**
 * URL manipulation utilities
 */
export const UrlBuilder = {
  /**
   * Create a URL builder instance
   */
  create: (baseUrl: string) => ({
    /**
     * Add path segments
     */
    path: (...segments: string[]) => {
      const cleanSegments = segments.map(segment =>
        segment.replace(/^\/+|\/+$/g, '')
      ).filter(Boolean);

      const basePath = baseUrl.replace(/\/+$/, '');
      const path = cleanSegments.join('/');

      return UrlBuilder.create(`${basePath}/${path}`);
    },

    /**
     * Add query parameters
     */
    query: (params: Record<string, any>) => {
      return updateUrlParams(baseUrl, params);
    },

    /**
     * Add hash fragment
     */
    hash: (fragment: string) => {
      const urlObj = new URL(baseUrl);
      urlObj.hash = fragment.startsWith('#') ? fragment : `#${fragment}`;
      return urlObj.toString();
    },

    /**
     * Get the final URL string
     */
    toString: () => baseUrl
  })
};

/**
 * History management utilities
 */
export class UrlHistory {
  private history: string[] = [];
  private currentIndex: number = -1;

  /**
   * Add a URL to history
   */
  push(url: string): void {
    // Remove any URLs after current index (for back navigation)
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(url);
    this.currentIndex++;
  }

  /**
   * Get current URL
   */
  current(): string | null {
    return this.currentIndex >= 0 ? this.history[this.currentIndex] : null;
  }

  /**
   * Go back in history
   */
  back(): string | null {
    if (this.canGoBack()) {
      this.currentIndex--;
      return this.current();
    }
    return null;
  }

  /**
   * Go forward in history
   */
  forward(): string | null {
    if (this.canGoForward()) {
      this.currentIndex++;
      return this.current();
    }
    return null;
  }

  /**
   * Check if we can go back
   */
  canGoBack(): boolean {
    return this.currentIndex > 0;
  }

  /**
   * Check if we can go forward
   */
  canGoForward(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  /**
   * Clear all history
   */
  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }

  /**
   * Get all history entries
   */
  getAll(): string[] {
    return [...this.history];
  }
}