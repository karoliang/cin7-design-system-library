import React, { Suspense } from 'react';
import { Spinner, BlockStack, Text } from '@shopify/polaris';
import styles from './LazyLoad.module.scss';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loadingText?: string;
}

export function LazyLoad({ 
  children, 
  fallback,
  loadingText = 'Loading...' 
}: LazyLoadProps) {
  const defaultFallback = (
    <div className={styles.LoadingContainer}>
      <BlockStack gap="400" align="center">
        <Spinner accessibilityLabel={loadingText} />
        <Text variant="bodySm" tone="subdued">{loadingText}</Text>
      </BlockStack>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}