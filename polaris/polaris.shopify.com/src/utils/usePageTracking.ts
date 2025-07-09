import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { trackPageView, trackReadingTime, trackNavigation, trackEvent } from './analytics';

interface PageTrackingOptions {
  trackScrollDepth?: boolean;
  trackTimeOnPage?: boolean;
  trackExitIntent?: boolean;
}

export function usePageTracking(options: PageTrackingOptions = {}) {
  const router = useRouter();
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollDepthRef = useRef<number>(0);
  const previousPageRef = useRef<string>('');
  const [isTracking, setIsTracking] = useState(false);

  // Track page views and navigation
  useEffect(() => {
    const currentPath = router.asPath;
    
    // Track page view
    trackPageView(currentPath, {
      page_title: document.title,
      page_category: getPageCategory(currentPath),
    });
    
    // Track navigation pattern
    if (previousPageRef.current && previousPageRef.current !== currentPath) {
      trackNavigation(
        previousPageRef.current,
        currentPath,
        determineNavigationMethod()
      );
    }
    
    previousPageRef.current = currentPath;
    startTimeRef.current = Date.now();
    maxScrollDepthRef.current = 0;
    setIsTracking(true);
    
    return () => {
      setIsTracking(false);
    };
  }, [router.asPath]);

  // Track scroll depth
  useEffect(() => {
    if (!options.trackScrollDepth || !isTracking) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollDepth = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      
      maxScrollDepthRef.current = Math.max(maxScrollDepthRef.current, scrollDepth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [options.trackScrollDepth, isTracking]);

  // Track time on page
  useEffect(() => {
    if (!options.trackTimeOnPage || !isTracking) return;

    const handleBeforeUnload = () => {
      const timeOnPage = (Date.now() - startTimeRef.current) / 1000;
      const scrollDepth = Math.round(maxScrollDepthRef.current);
      
      trackReadingTime(router.asPath, timeOnPage, scrollDepth);
    };

    // Track when leaving the page
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Also track when navigating away
    const handleRouteChange = () => {
      handleBeforeUnload();
    };
    
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [options.trackTimeOnPage, router.asPath, router.events, isTracking]);

  // Track exit intent
  useEffect(() => {
    if (!options.trackExitIntent || !isTracking) return;

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        const timeOnPage = (Date.now() - startTimeRef.current) / 1000;
        
        trackEvent({
          action: 'exit_intent',
          category: 'User Engagement',
          label: router.asPath,
          time_on_page: Math.round(timeOnPage),
          scroll_depth: Math.round(maxScrollDepthRef.current),
        });
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [options.trackExitIntent, router.asPath, isTracking]);
}

/**
 * Determine page category from path
 */
function getPageCategory(path: string): string {
  if (path === '/') return 'home';
  if (path.startsWith('/getting-started')) return 'getting-started';
  if (path.startsWith('/components')) return 'components';
  if (path.startsWith('/foundations')) return 'foundations';
  if (path.startsWith('/patterns')) return 'patterns';
  if (path.startsWith('/tokens')) return 'tokens';
  if (path.startsWith('/playground')) return 'playground';
  if (path.startsWith('/style-guide')) return 'style-guide';
  return 'other';
}

/**
 * Determine how user navigated
 */
function determineNavigationMethod(): 'menu' | 'link' | 'search' | 'breadcrumb' | 'other' {
  // This is simplified - in a real implementation, you'd track click sources
  const referrer = document.referrer;
  const currentUrl = window.location.href;
  
  if (referrer.includes('/search') || currentUrl.includes('?q=')) {
    return 'search';
  }
  
  // Default to link for now
  return 'link';
}

// Export trackEvent for direct use
export { trackEvent } from './analytics';