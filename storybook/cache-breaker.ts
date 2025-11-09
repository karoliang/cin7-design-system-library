// NUCLEAR CACHE BREAKING CONSTANTS - EMERGENCY DEPLOYMENT v1.1.2
// This file forces bundle regeneration to break all production caching

export const CACHE_BREAKER = `NUCLEAR-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
export const BUILD_VERSION = `1.1.2-EMERGENCY-${Date.now()}`;
export const FORCE_REBUILD = Math.random().toString(36).substring(2, 20);
export const BUNDLE_HASH = `BUNDLE-${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;

// Additional cache breaking constants
export const EMERGENCY_DEPLOY_1 = `EMERGENCY-1-${Date.now()}`;
export const EMERGENCY_DEPLOY_2 = `EMERGENCY-2-${Date.now()}`;
export const EMERGENCY_DEPLOY_3 = `EMERGENCY-3-${Date.now()}`;
export const PRODUCTION_FIX = `PRODUCTION-FIX-${Date.now()}`;
export const BUNDLE_FORCE_NEW = `FORCE-NEW-${Date.now()}`;

// Frame and Breadcrumbs specific cache breaking
export const FRAME_COMPONENT_FIX = `FRAME-FIX-${Date.now()}`;
export const BREADCRUMBS_COMPONENT_FIX = `BREADCRUMBS-FIX-${Date.now()}`;
export const TEMPLATE_LITERAL_FIX = `TEMPLATE-FIX-${Date.now()}`;

// Export all constants to ensure they're included in bundles
export default {
  CACHE_BREAKER,
  BUILD_VERSION,
  FORCE_REBUILD,
  BUNDLE_HASH,
  EMERGENCY_DEPLOY_1,
  EMERGENCY_DEPLOY_2,
  EMERGENCY_DEPLOY_3,
  PRODUCTION_FIX,
  BUNDLE_FORCE_NEW,
  FRAME_COMPONENT_FIX,
  BREADCRUMBS_COMPONENT_FIX,
  TEMPLATE_LITERAL_FIX,
};