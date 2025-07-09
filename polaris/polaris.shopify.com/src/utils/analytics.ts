// Analytics utility functions for tracking documentation usage

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * Track custom events
 */
export function trackEvent({
  action,
  category,
  label,
  value,
  ...customDimensions
}: AnalyticsEvent) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...customDimensions,
    });
  }
}

/**
 * Track page views with custom properties
 */
export function trackPageView(
  url: string,
  additionalProperties?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
      ...additionalProperties,
    });
  }
}

/**
 * Track component usage
 */
export function trackComponentUsage(componentName: string, action: string) {
  trackEvent({
    action: 'component_interaction',
    category: 'Component Usage',
    label: componentName,
    custom_dimension_1: action,
  });
}

/**
 * Track search queries
 */
export function trackSearch(query: string, resultsCount: number) {
  trackEvent({
    action: 'search',
    category: 'Site Search',
    label: query,
    value: resultsCount,
  });
}

/**
 * Track documentation reading time
 */
export function trackReadingTime(
  pagePath: string,
  timeInSeconds: number,
  scrollDepth: number
) {
  trackEvent({
    action: 'reading_time',
    category: 'Content Engagement',
    label: pagePath,
    value: Math.round(timeInSeconds),
    scroll_depth: scrollDepth,
  });
}

/**
 * Track code copy events
 */
export function trackCodeCopy(
  codeType: string,
  componentName?: string,
  language?: string
) {
  trackEvent({
    action: 'code_copy',
    category: 'Code Examples',
    label: codeType,
    component: componentName,
    language: language,
  });
}

/**
 * Track playground interactions
 */
export function trackPlaygroundUsage(
  action: 'run' | 'copy' | 'reset' | 'example_selected',
  exampleName?: string
) {
  trackEvent({
    action: 'playground_interaction',
    category: 'Playground',
    label: action,
    example: exampleName,
  });
}

/**
 * Track external link clicks
 */
export function trackExternalLink(url: string, linkText?: string) {
  trackEvent({
    action: 'external_link_click',
    category: 'Outbound Links',
    label: url,
    link_text: linkText,
  });
}

/**
 * Track downloads
 */
export function trackDownload(fileName: string, fileType: string) {
  trackEvent({
    action: 'download',
    category: 'Downloads',
    label: fileName,
    file_type: fileType,
  });
}

/**
 * Track errors
 */
export function trackError(
  errorMessage: string,
  errorLocation: string,
  errorType?: string
) {
  trackEvent({
    action: 'error',
    category: 'Errors',
    label: errorLocation,
    error_message: errorMessage,
    error_type: errorType,
  });
}

/**
 * Track user preferences
 */
export function trackPreference(
  preferenceName: string,
  preferenceValue: string | boolean
) {
  trackEvent({
    action: 'preference_change',
    category: 'User Preferences',
    label: preferenceName,
    preference_value: String(preferenceValue),
  });
}

/**
 * Track navigation patterns
 */
export function trackNavigation(
  from: string,
  to: string,
  navigationMethod: 'menu' | 'link' | 'search' | 'breadcrumb' | 'other'
) {
  trackEvent({
    action: 'navigation',
    category: 'User Journey',
    label: `${from} -> ${to}`,
    navigation_method: navigationMethod,
  });
}

/**
 * Initialize analytics with user properties
 */
export function initializeAnalytics() {
  if (typeof window !== 'undefined' && window.gtag) {
    // Set user properties
    window.gtag('set', {
      user_properties: {
        documentation_version: process.env.NEXT_PUBLIC_VERSION || 'unknown',
        theme_preference: localStorage.getItem('darkMode') || 'light',
        screen_size: getScreenSize(),
      },
    });
  }
}

/**
 * Get screen size category
 */
function getScreenSize(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1440) return 'desktop';
  return 'desktop-large';
}

/**
 * Enhanced search tracking with custom dimensions
 */
export function trackEnhancedSearch(
  query: string,
  results: any[],
  filters?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Track the search
    window.gtag('event', 'view_search_results', {
      search_term: query,
      number_of_results: results.length,
      filters_applied: filters ? Object.keys(filters).join(',') : 'none',
    });
    
    // Track top results
    results.slice(0, 5).forEach((result, index) => {
      window.gtag('event', 'search_result_impression', {
        search_term: query,
        result_position: index + 1,
        result_title: result.title,
        result_category: result.category,
      });
    });
  }
}