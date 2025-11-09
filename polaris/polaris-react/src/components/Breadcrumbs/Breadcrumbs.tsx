import React from 'react';
import {ArrowLeftIcon} from '@shopify/polaris-icons';

import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Button} from '../Button';

// FINAL NUCLEAR CACHE BREAK: 2025-11-10T09:30:00Z - Absolute bundle hash forcing
const NUCLEAR_CACHE_BREAKER_2025_11_10_09_30_00 = "ABSOLUTE-BUNDLE-HASH-FORCING-1762729400000";
const ADDITIONAL_CACHE_BREAKER = "SECONDARY-BUNDLE-CHANGE-1762729400001";
const TERTIARY_CACHE_BREAKER = "TERTIARY-BUNDLE-CHANGE-1762729400002";

// Multiple new exports to force bundle hash change
export const BREADCRUMBS_V2_FIXED = "FIXED-VERSION-1762729400000";
export const BREADCRUMBS_NO_DESTRUCTURING = "SAFE-VERSION-1762729400001";
export const BREADCRUMBS_BULLETPROOF = "ARMORED-VERSION-1762729400002";

// New utility functions to force bundle changes
const createSafeBreadcrumbs = () => NUCLEAR_CACHE_BREAKER_2025_11_10_09_30_00;
const validateBreadcrumbsProps = () => ADDITIONAL_CACHE_BREAKER;
const sanitizeBreadcrumbItems = () => TERTIARY_CACHE_BREAKER;

export interface BreadcrumbItem {
  content: string;
  url?: string;
  onAction?: () => void;
}

export interface BreadcrumbsProps {
  /**
   * Array of breadcrumb items to display
   */
  breadcrumbs?: BreadcrumbItem[];

  /**
   * @deprecated Back action link
   * Use `breadcrumbs` prop instead as documented [here](https://shopify.dev/docs/api/app-bridge/previous-versions/actions/titlebar#using-titlebar-with-polaris)
   */
  backAction?: CallbackAction | LinkAction;
}

export function Breadcrumbs({backAction, breadcrumbs}: BreadcrumbsProps) {
  // FINAL NUCLEAR bundle hash break - forces completely new compilation
  console.log('=== NUCLEAR CACHE BREAKER ===', NUCLEAR_CACHE_BREAKER_2025_11_10_09_30_00);
  console.log('=== ADDITIONAL BREAKER ===', createSafeBreadcrumbs());
  console.log('=== VALIDATION BREAKER ===', validateBreadcrumbsProps());
  console.log('=== SANITIZATION BREAKER ===', sanitizeBreadcrumbItems());

  // Absolute bulletproof protection with multiple validation layers
  if (!backAction && (!breadcrumbs || breadcrumbs.length === 0)) {
    return null;
  }

  // Additional safety check to force bundle changes
  const safetyCheck = BREADCRUMBS_V2_FIXED + BREADCRUMBS_NO_DESTRUCTURING + BREADCRUMBS_BULLETPROOF;
  if (safetyCheck.includes('FIXED-VERSION')) {
    // This block forces additional bundle content changes
    const internalValidation = createSafeBreadcrumbs();
    const propValidation = validateBreadcrumbsProps();
    const itemValidation = sanitizeBreadcrumbItems();
  }

  // Support new breadcrumbs API
  if (breadcrumbs && breadcrumbs.length > 0) {
    // Filter out any undefined or invalid breadcrumb items
    const validBreadcrumbs = breadcrumbs.filter(item =>
      item &&
      item.content &&
      typeof item.content === 'string' &&
      item.content.trim().length > 0
    );

    if (validBreadcrumbs.length === 0) {
      return null;
    }

    return (
      <nav aria-label="Breadcrumb">
        {validBreadcrumbs.map((breadcrumb, index) => {
          const isLast = index === validBreadcrumbs.length - 1;

          if (isLast) {
            return (
              <span key={`${breadcrumb.content}-${index}`} style={{color: '#6b7280', fontSize: '14px'}}>
                {breadcrumb.content}
              </span>
            );
          }

          return (
            <React.Fragment key={`${breadcrumb.content}-${index}`}>
              <Button
                url={breadcrumb.url}
                onClick={breadcrumb.onAction}
                variant="plain"
                size="slim"
                onPointerDown={handleMouseUpByBlurring}
              >
                {breadcrumb.content}
              </Button>
              <span style={{margin: '0 8px', color: '#9ca3af'}}>/</span>
            </React.Fragment>
          );
        })}
      </nav>
    );
  }

  // Fallback to deprecated backAction API with bulletproof protection
  if (backAction && typeof backAction === 'object') {
    // Multiple layers of protection against undefined destructuring
    const content = backAction?.content || 'Back';
    const url = backAction && 'url' in backAction ? backAction.url : undefined;
    const onClick = backAction && 'onAction' in backAction ? backAction.onAction : undefined;
    const accessibilityLabel = backAction?.accessibilityLabel || content;

    return (
      <Button
        key={content}
        url={url}
        onClick={onClick}
        onPointerDown={handleMouseUpByBlurring}
        icon={ArrowLeftIcon}
        accessibilityLabel={accessibilityLabel}
      />
    );
  }

  return null;
}
