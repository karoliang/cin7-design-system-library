import React, { useState, useEffect } from 'react';
import {
  Page,
  Layout,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Select,
  Badge,
  DataTable,
  ProgressBar,
  Divider,
  Button,
  Banner,
} from '@shopify/polaris';
import { BarChart, TrendingUpIcon, EyeIcon, ClickIcon } from '@shopify/polaris-icons';
import styles from './AnalyticsDashboard.module.scss';

interface AnalyticsData {
  pageViews: { path: string; views: number; timeOnPage: number }[];
  popularComponents: { name: string; usage: number; copyCount: number }[];
  searchQueries: { query: string; count: number; resultsFound: number }[];
  playgroundUsage: { example: string; selections: number; copies: number; resets: number }[];
  userEngagement: {
    avgTimeOnPage: number;
    avgScrollDepth: number;
    bounceRate: number;
    returnVisitors: number;
  };
  topExitPages: { path: string; exitRate: number }[];
}

// Mock data for demonstration
const mockData: AnalyticsData = {
  pageViews: [
    { path: '/', views: 1250, timeOnPage: 145 },
    { path: '/components', views: 980, timeOnPage: 320 },
    { path: '/getting-started', views: 750, timeOnPage: 280 },
    { path: '/playground', views: 620, timeOnPage: 450 },
    { path: '/style-guide', views: 380, timeOnPage: 220 },
  ],
  popularComponents: [
    { name: 'Button', usage: 450, copyCount: 89 },
    { name: 'Card', usage: 320, copyCount: 65 },
    { name: 'TextField', usage: 280, copyCount: 52 },
    { name: 'ExtJS DataGrid', usage: 210, copyCount: 41 },
    { name: 'Badge', usage: 180, copyCount: 28 },
  ],
  searchQueries: [
    { query: 'button', count: 180, resultsFound: 12 },
    { query: 'form validation', count: 95, resultsFound: 8 },
    { query: 'extjs grid', count: 78, resultsFound: 6 },
    { query: 'typescript', count: 65, resultsFound: 15 },
    { query: 'migration', count: 52, resultsFound: 4 },
  ],
  playgroundUsage: [
    { example: 'Button', selections: 210, copies: 45, resets: 12 },
    { example: 'ExtJS DataGrid', selections: 180, copies: 38, resets: 8 },
    { example: 'Form', selections: 145, copies: 28, resets: 6 },
    { example: 'Cin7 DSL Dashboard', selections: 120, copies: 25, resets: 4 },
    { example: 'Zustand State', selections: 98, copies: 18, resets: 3 },
  ],
  userEngagement: {
    avgTimeOnPage: 285,
    avgScrollDepth: 68,
    bounceRate: 32,
    returnVisitors: 45,
  },
  topExitPages: [
    { path: '/getting-started/installation', exitRate: 15 },
    { path: '/components/deprecated', exitRate: 12 },
    { path: '/playground', exitRate: 8 },
    { path: '/migrations', exitRate: 6 },
  ],
};

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>(mockData);
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const pageViewsRows = data.pageViews.map((page) => [
    page.path,
    page.views.toLocaleString(),
    `${Math.round(page.timeOnPage)}s`,
    <ProgressBar
      progress={(page.views / Math.max(...data.pageViews.map(p => p.views))) * 100}
      size="small"
    />,
  ]);

  const componentUsageRows = data.popularComponents.map((component) => [
    component.name,
    component.usage.toLocaleString(),
    component.copyCount.toLocaleString(),
    <Badge tone="success">
      {((component.copyCount / component.usage) * 100).toFixed(1)}%
    </Badge>,
  ]);

  const searchRows = data.searchQueries.map((search) => [
    search.query,
    search.count.toLocaleString(),
    search.resultsFound.toLocaleString(),
    <Badge tone={search.resultsFound > 5 ? 'success' : 'warning'}>
      {search.resultsFound > 5 ? 'Good' : 'Needs work'}
    </Badge>,
  ]);

  const playgroundRows = data.playgroundUsage.map((example) => [
    example.example,
    example.selections.toLocaleString(),
    example.copies.toLocaleString(),
    example.resets.toLocaleString(),
    <Badge tone="info">
      {((example.copies / example.selections) * 100).toFixed(1)}%
    </Badge>,
  ]);

  return (
    <Page
      title="Analytics Dashboard"
      subtitle="Documentation usage insights and user engagement metrics"
      primaryAction={{
        content: 'Export Report',
        onAction: () => console.log('Export report'),
      }}
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <InlineStack align="space-between" blockAlign="center">
                <Text variant="headingMd">Analytics Overview</Text>
                <Select
                  label="Time Range"
                  labelInline
                  options={[
                    { label: 'Last 7 days', value: '7d' },
                    { label: 'Last 30 days', value: '30d' },
                    { label: 'Last 90 days', value: '90d' },
                    { label: 'Last year', value: '1y' },
                  ]}
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                />
              </InlineStack>
            </Card>

            {/* Key Metrics */}
            <div className={styles.MetricsGrid}>
              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingSm">Avg. Time on Page</Text>
                    <EyeIcon />
                  </InlineStack>
                  <Text variant="headingXl" as="p">
                    {data.userEngagement.avgTimeOnPage}s
                  </Text>
                  <Badge tone="success">+12% from last period</Badge>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingSm">Avg. Scroll Depth</Text>
                    <TrendingUpIcon />
                  </InlineStack>
                  <Text variant="headingXl" as="p">
                    {data.userEngagement.avgScrollDepth}%
                  </Text>
                  <Badge tone="info">+5% from last period</Badge>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingSm">Bounce Rate</Text>
                    <ClickIcon />
                  </InlineStack>
                  <Text variant="headingXl" as="p">
                    {data.userEngagement.bounceRate}%
                  </Text>
                  <Badge tone="warning">+2% from last period</Badge>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="headingSm">Return Visitors</Text>
                    <BarChart />
                  </InlineStack>
                  <Text variant="headingXl" as="p">
                    {data.userEngagement.returnVisitors}%
                  </Text>
                  <Badge tone="success">+8% from last period</Badge>
                </BlockStack>
              </Card>
            </div>

            {/* Page Views */}
            <Card title="Most Visited Pages" sectioned>
              <DataTable
                columnContentTypes={['text', 'numeric', 'text', 'numeric']}
                headings={['Page', 'Views', 'Avg. Time', 'Relative Traffic']}
                rows={pageViewsRows}
                showTotalsInFooter={false}
              />
            </Card>

            {/* Component Usage */}
            <Card title="Popular Components" sectioned>
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric', 'text']}
                headings={['Component', 'Page Views', 'Code Copies', 'Copy Rate']}
                rows={componentUsageRows}
                showTotalsInFooter={false}
              />
            </Card>
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="500">
            {/* Search Analytics */}
            <Card title="Search Queries" sectioned>
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric', 'text']}
                headings={['Query', 'Count', 'Results', 'Quality']}
                rows={searchRows}
                showTotalsInFooter={false}
              />
            </Card>

            {/* Playground Usage */}
            <Card title="Playground Activity" sectioned>
              <DataTable
                columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'text']}
                headings={['Example', 'Views', 'Copies', 'Resets', 'Engagement']}
                rows={playgroundRows}
                showTotalsInFooter={false}
              />
            </Card>

            {/* Insights */}
            <Card title="Insights" sectioned>
              <BlockStack gap="300">
                <Banner tone="success">
                  <p>
                    <strong>ExtJS components</strong> are gaining popularity with 
                    25% increase in usage this month.
                  </p>
                </Banner>
                
                <Banner tone="info">
                  <p>
                    <strong>Migration guide</strong> has high exit rate. Consider 
                    adding more examples.
                  </p>
                </Banner>
                
                <Banner tone="warning">
                  <p>
                    <strong>Search for "validation"</strong> returns few results. 
                    Consider adding more validation examples.
                  </p>
                </Banner>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}