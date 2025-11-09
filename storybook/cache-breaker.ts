// NUCLEAR EMERGENCY CACHE BREAKING - DEPLOYMENT v1.2.0 - CRITICAL PRODUCTION FIX
// This file forces complete cache invalidation to override aggressive CDN caching

export const CACHE_BREAKER = `NUCLEAR-EMERGENCY-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
export const BUILD_VERSION = `1.2.0-NUCLEAR-EMERGENCY-${Date.now()}`;
export const FORCE_REBUILD = Math.random().toString(36).substring(2, 20);
export const BUNDLE_HASH = `NUCLEAR-BUNDLE-${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;

// Additional cache breaking constants
export const EMERGENCY_DEPLOY_1 = `EMERGENCY-1-${Date.now()}`;
export const EMERGENCY_DEPLOY_2 = `EMERGENCY-2-${Date.now()}`;
export const EMERGENCY_DEPLOY_3 = `EMERGENCY-3-${Date.now()}`;
export const PRODUCTION_FIX = `PRODUCTION-FIX-${Date.now()}`;
export const BUNDLE_FORCE_NEW = `FORCE-NEW-${Date.now()}`;

// NUCLEAR EMERGENCY - All production cache breaking constants
export const FRAME_PROPS_FIX = `NUCLEAR-FRAME-PROPS-${Date.now()}`;
export const BREADCRUMBS_DESTRUCTURING_FIX = `NUCLEAR-BREADCRUMBS-${Date.now()}`;
export const THEME_PROVIDER_FIX = `NUCLEAR-THEME-${Date.now()}`;
export const TOPBAR_STRUCTURE_FIX = `NUCLEAR-TOPBAR-${Date.now()}`;
export const ERROR_BOUNDARY_FIX = `NUCLEAR-ERROR-BOUNDARY-${Date.now()}`;
export const PRODUCTION_CACHE_OVERRIDE = `NUCLEAR-OVERRIDE-${Date.now()}`;
export const CDN_CACHE_BYPASS = `NUCLEAR-CDN-BYPASS-${Date.now()}`;
export const BROWSER_CACHE_INVALIDATION = `NUCLEAR-BROWSER-CACHE-${Date.now()}`;
export const IMMEDIATE_DEPLOYMENT = `NUCLEAR-IMMEDIATE-${Date.now()}`;

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
  FRAME_PROPS_FIX,
  BREADCRUMBS_DESTRUCTURING_FIX,
  THEME_PROVIDER_FIX,
  TOPBAR_STRUCTURE_FIX,
  ERROR_BOUNDARY_FIX,
  PRODUCTION_CACHE_OVERRIDE,
  CDN_CACHE_BYPASS,
  BROWSER_CACHE_INVALIDATION,
  IMMEDIATE_DEPLOYMENT,
};