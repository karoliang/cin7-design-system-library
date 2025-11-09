// REACT ERRORS FIX CACHE BREAKING - DEPLOYMENT v1.1.3
// This file forces bundle regeneration to break all production caching after React error fixes

export const CACHE_BREAKER = `REACT-FIX-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
export const BUILD_VERSION = `1.1.3-REACT-FIX-${Date.now()}`;
export const FORCE_REBUILD = Math.random().toString(36).substring(2, 20);
export const BUNDLE_HASH = `BUNDLE-${Date.now()}-${Math.random().toString(36).substring(2, 12)}`;

// Additional cache breaking constants
export const EMERGENCY_DEPLOY_1 = `EMERGENCY-1-${Date.now()}`;
export const EMERGENCY_DEPLOY_2 = `EMERGENCY-2-${Date.now()}`;
export const EMERGENCY_DEPLOY_3 = `EMERGENCY-3-${Date.now()}`;
export const PRODUCTION_FIX = `PRODUCTION-FIX-${Date.now()}`;
export const BUNDLE_FORCE_NEW = `FORCE-NEW-${Date.now()}`;

// React Errors specific cache breaking
export const FRAME_PROPS_FIX = `FRAME-PROPS-FIX-${Date.now()}`;
export const BREADCRUMBS_DESTRUCTURING_FIX = `BREADCRUMBS-DESTRUCTURING-FIX-${Date.now()}`;
export const THEME_PROVIDER_FIX = `THEME-PROVIDER-FIX-${Date.now()}`;
export const TOPBAR_STRUCTURE_FIX = `TOPBAR-STRUCTURE-FIX-${Date.now()}`;
export const ERROR_BOUNDARY_FIX = `ERROR-BOUNDARY-FIX-${Date.now()}`;

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
};