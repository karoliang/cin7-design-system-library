import React from 'react';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';
import PageMeta from '../src/components/PageMeta';
import { AnalyticsDashboard } from '../src/components/AnalyticsDashboard';

export default function AnalyticsPage() {
  return (
    <AppProvider i18n={translations}>
      <PageMeta
        title="Analytics Dashboard"
        description="Documentation usage analytics and user engagement metrics for Cin7 DSL"
        keywords={['analytics', 'metrics', 'usage', 'dashboard', 'insights']}
        noIndex={true} // Keep private
      />
      <AnalyticsDashboard />
    </AppProvider>
  );
}