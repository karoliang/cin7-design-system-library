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
  // Support new breadcrumbs API
  if (breadcrumbs && breadcrumbs.length > 0) {
    return (
      <nav aria-label="Breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          if (isLast) {
            return (
              <span key={breadcrumb.content} style={{color: '#6b7280', fontSize: '14px'}}>
                {breadcrumb.content}
              </span>
            );
          }

          return (
            <React.Fragment key={breadcrumb.content}>
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

  // Fallback to deprecated backAction API
  if (backAction) {
    const {content} = backAction;

    return (
      <Button
        key={content}
        url={'url' in backAction ? backAction.url : undefined}
        onClick={'onAction' in backAction ? backAction.onAction : undefined}
        onPointerDown={handleMouseUpByBlurring}
        icon={ArrowLeftIcon}
        accessibilityLabel={backAction.accessibilityLabel ?? content}
      />
    );
  }

  return null;
}
