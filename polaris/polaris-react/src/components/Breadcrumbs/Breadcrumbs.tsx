import React from 'react';
import {ArrowLeftIcon} from '@shopify/polaris-icons';

import type {CallbackAction, LinkAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import {Button} from '../Button';

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
  // Bulletproof: Ensure props are defined and valid
  if (!backAction && (!breadcrumbs || breadcrumbs.length === 0)) {
    return null;
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
