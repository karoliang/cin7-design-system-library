/**
 * Type-safe API client for Cin7 DSL applications
 * Provides a clean abstraction over HTTP requests
 */

import type { ApiResponse, PaginatedResponse, QueryParams } from '@cin7/core/types';

export interface ApiClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
  timeout?: number;
  interceptors?: {
    request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
    response?: (response: Response) => Response | Promise<Response>;
    error?: (error: ApiError) => void | Promise<void>;
  };
}

export interface RequestConfig extends RequestInit {
  url: string;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Type-safe API client
 */
export class ApiClient {
  private config: ApiClientConfig;
  private abortControllers = new Map<string, AbortController>();

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, params?: QueryParams): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'GET',
      url: endpoint,
      params,
    });
  }

  /**
   * GET paginated data
   */
  async getPaginated<T>(endpoint: string, params?: QueryParams): Promise<PaginatedResponse<T>> {
    const response = await this.get<PaginatedResponse<T>>(endpoint, params);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T, D = any>(endpoint: string, data?: D): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'POST',
      url: endpoint,
      data,
    });
  }

  /**
   * PUT request
   */
  async put<T, D = any>(endpoint: string, data?: D): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PUT',
      url: endpoint,
      data,
    });
  }

  /**
   * PATCH request
   */
  async patch<T, D = any>(endpoint: string, data?: D): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'PATCH',
      url: endpoint,
      data,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>({
      method: 'DELETE',
      url: endpoint,
    });
  }

  /**
   * Cancel a request by key
   */
  cancel(key: string): void {
    const controller = this.abortControllers.get(key);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(key);
    }
  }

  /**
   * Cancel all requests
   */
  cancelAll(): void {
    this.abortControllers.forEach(controller => controller.abort());
    this.abortControllers.clear();
  }

  /**
   * Base request method
   */
  private async request<T>(config: RequestConfig): Promise<ApiResponse<T>> {
    // Apply request interceptor
    if (this.config.interceptors?.request) {
      config = await this.config.interceptors.request(config);
    }

    // Build URL
    const url = this.buildUrl(config.url, config.params);

    // Create abort controller
    const abortController = new AbortController();
    const requestKey = `${config.method}-${config.url}`;
    this.abortControllers.set(requestKey, abortController);

    // Set up timeout
    const timeout = config.timeout || this.config.timeout;
    let timeoutId: NodeJS.Timeout | undefined;
    
    if (timeout) {
      timeoutId = setTimeout(() => abortController.abort(), timeout);
    }

    try {
      // Build request options
      const options: RequestInit = {
        ...config,
        method: config.method,
        headers: {
          'Content-Type': 'application/json',
          ...this.config.headers,
          ...(config.headers as Record<string, string>),
        },
        signal: abortController.signal,
      };

      // Add body for appropriate methods
      if (config.data && ['POST', 'PUT', 'PATCH'].includes(config.method!)) {
        options.body = JSON.stringify(config.data);
      }

      // Make request
      let response = await fetch(url, options);

      // Apply response interceptor
      if (this.config.interceptors?.response) {
        response = await this.config.interceptors.response(response);
      }

      // Clear timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Handle response
      if (!response.ok) {
        const errorData = await this.parseErrorResponse(response);
        throw new ApiError(
          errorData.message || response.statusText,
          response.status,
          response.statusText,
          errorData
        );
      }

      const data = await response.json();
      return data as ApiResponse<T>;

    } catch (error) {
      // Clear timeout
      if (timeoutId) clearTimeout(timeoutId);

      // Handle abort
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request cancelled', 0, 'Cancelled');
      }

      // Apply error interceptor
      if (this.config.interceptors?.error && error instanceof ApiError) {
        await this.config.interceptors.error(error);
      }

      throw error;
    } finally {
      this.abortControllers.delete(requestKey);
    }
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(endpoint, this.config.baseUrl);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    return url.toString();
  }

  /**
   * Parse error response
   */
  private async parseErrorResponse(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch {
      return { message: response.statusText };
    }
  }
}

/**
 * Create typed API client factory
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}

/**
 * Request retry utility
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    delay?: number;
    backoff?: boolean;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoff = true,
    shouldRetry = (error) => error instanceof ApiError && error.status >= 500,
  } = options;

  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}