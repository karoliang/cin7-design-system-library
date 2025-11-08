import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  Text,
  BlockStack,
  InlineStack,
  Badge,
  Button,
  Select,
  DataTable,
} from '@shopify/polaris';
import { useState } from 'react';
import { LineChart } from '@cin7/highcharts-adapter/react';
import { BarChart } from '@cin7/highcharts-adapter/react';
import { PieChart } from '@cin7/highcharts-adapter/react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

// ExtJS Panel with Highcharts Integration
const ExtJSChartPanel: React.FC<{
  title: string;
  chartType: 'line' | 'bar' | 'pie';
  data: any;
}> = ({ title, chartType, data }) => {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            {title}
          </Text>
          <InlineStack gap="200">
            <Badge tone="info">ExtJS Panel</Badge>
            <Badge tone="success">Highcharts</Badge>
          </InlineStack>
        </InlineStack>

        {chartType === 'line' && (
          <LineChart
            title={data.title}
            series={data.series}
            xAxis={data.xAxis}
            yAxis={data.yAxis}
            height={400}
          />
        )}

        {chartType === 'bar' && (
          <BarChart
            title={data.title}
            series={data.series}
            xAxis={data.xAxis}
            yAxis={data.yAxis}
            height={400}
          />
        )}

        {chartType === 'pie' && (
          <PieChart
            title={data.title}
            series={data.series}
            height={400}
          />
        )}
      </BlockStack>
    </Card>
  );
};

// Dashboard Layout with Multiple Charts
const DashboardLayout: React.FC = () => {
  const [period, setPeriod] = useState('month');

  const salesData = {
    title: 'Sales Trend',
    series: [
      {
        name: 'Revenue',
        data: period === 'week'
          ? [45, 52, 48, 55, 60, 58, 62]
          : [120, 150, 180, 200, 195, 210, 225, 240, 230, 250, 265, 280],
      },
    ],
    xAxis: {
      categories: period === 'week'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yAxis: {
      title: { text: 'Revenue ($K)' },
    },
  };

  const inventoryData = {
    title: 'Inventory by Category',
    series: [
      {
        name: 'Items',
        data: [
          { name: 'Electronics', y: 450 },
          { name: 'Clothing', y: 320 },
          { name: 'Home & Garden', y: 280 },
          { name: 'Sports', y: 190 },
          { name: 'Other', y: 160 },
        ],
      },
    ],
  };

  const performanceData = {
    title: 'Team Performance',
    series: [
      { name: 'Sales Team', data: [85, 88, 92, 87] },
      { name: 'Support Team', data: [78, 82, 85, 89] },
      { name: 'Marketing Team', data: [72, 75, 80, 83] },
    ],
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yAxis: {
      title: { text: 'Performance Score' },
    },
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Business Dashboard
          </Text>
          <InlineStack gap="200">
            <Select
              label=""
              options={[
                { label: 'This Week', value: 'week' },
                { label: 'This Month', value: 'month' },
                { label: 'This Year', value: 'year' },
              ]}
              value={period}
              onChange={setPeriod}
            />
            <Badge tone="info">ExtJS Dashboard</Badge>
          </InlineStack>
        </InlineStack>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
          <Card background="bg-surface-secondary">
            <LineChart
              title={salesData.title}
              series={salesData.series}
              xAxis={salesData.xAxis}
              yAxis={salesData.yAxis}
              height={300}
              smooth
            />
          </Card>

          <Card background="bg-surface-secondary">
            <PieChart
              title={inventoryData.title}
              series={inventoryData.series}
              height={300}
            />
          </Card>
        </div>

        <Card background="bg-surface-secondary">
          <BarChart
            title={performanceData.title}
            series={performanceData.series}
            xAxis={performanceData.xAxis}
            yAxis={performanceData.yAxis}
            height={300}
          />
        </Card>

        <Card background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">
              Recent Activity
            </Text>
            <DataTable
              columnContentTypes={['text', 'numeric', 'text', 'text']}
              headings={['Product', 'Sales', 'Trend', 'Status']}
              rows={[
                ['Premium Widget', '$12,450', '↑ 15%', 'In Stock'],
                ['Standard Widget', '$8,920', '↓ 3%', 'Low Stock'],
                ['Deluxe Widget', '$15,300', '↑ 28%', 'In Stock'],
                ['Basic Widget', '$5,680', '→ 0%', 'Out of Stock'],
              ]}
            />
          </BlockStack>
        </Card>

        <InlineStack align="end" gap="200">
          <Button>Export Report</Button>
          <Button variant="primary">Refresh Data</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

// Interactive Charts with Drill-Down
const InteractiveCharts: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const regionalData = {
    title: 'Sales by Region',
    series: [
      {
        name: 'Revenue',
        data: [
          { name: 'North America', y: 450, drilldown: 'na' },
          { name: 'Europe', y: 320, drilldown: 'eu' },
          { name: 'Asia Pacific', y: 380, drilldown: 'ap' },
          { name: 'Latin America', y: 180, drilldown: 'la' },
        ],
      },
    ],
  };

  const drilldownData: Record<string, any> = {
    na: {
      title: 'North America Sales by Country',
      series: [
        {
          name: 'Sales',
          data: [
            { name: 'USA', y: 320 },
            { name: 'Canada', y: 95 },
            { name: 'Mexico', y: 35 },
          ],
        },
      ],
    },
    eu: {
      title: 'Europe Sales by Country',
      series: [
        {
          name: 'Sales',
          data: [
            { name: 'UK', y: 120 },
            { name: 'Germany', y: 95 },
            { name: 'France', y: 70 },
            { name: 'Other', y: 35 },
          ],
        },
      ],
    },
    ap: {
      title: 'Asia Pacific Sales by Country',
      series: [
        {
          name: 'Sales',
          data: [
            { name: 'China', y: 180 },
            { name: 'Japan', y: 100 },
            { name: 'Australia', y: 65 },
            { name: 'Other', y: 35 },
          ],
        },
      ],
    },
    la: {
      title: 'Latin America Sales by Country',
      series: [
        {
          name: 'Sales',
          data: [
            { name: 'Brazil', y: 90 },
            { name: 'Argentina', y: 45 },
            { name: 'Chile', y: 28 },
            { name: 'Other', y: 17 },
          ],
        },
      ],
    },
  };

  const productCategoryData = {
    title: 'Product Performance',
    series: [
      { name: 'Electronics', data: [450, 520, 480, 550] },
      { name: 'Clothing', data: [320, 380, 350, 410] },
      { name: 'Home & Garden', data: [280, 310, 295, 330] },
    ],
    xAxis: {
      categories: ['Q1', 'Q2', 'Q3', 'Q4'],
    },
    yAxis: {
      title: { text: 'Sales ($K)' },
    },
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingMd">
            Interactive Sales Analysis
          </Text>
          <InlineStack gap="200">
            <Badge tone="attention">Drill-Down</Badge>
            <Badge tone="info">Interactive Filtering</Badge>
          </InlineStack>
        </InlineStack>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Card background="bg-surface-secondary">
            <BlockStack gap="300">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">
                  {selectedRegion && drilldownData[selectedRegion]
                    ? drilldownData[selectedRegion].title
                    : regionalData.title}
                </Text>
                {selectedRegion && (
                  <Button size="slim" onClick={() => setSelectedRegion(null)}>
                    ← Back to Regions
                  </Button>
                )}
              </InlineStack>
              <div onClick={() => !selectedRegion && setSelectedRegion('na')}>
                <PieChart
                  title=""
                  series={
                    selectedRegion && drilldownData[selectedRegion]
                      ? drilldownData[selectedRegion].series
                      : regionalData.series
                  }
                  height={300}
                />
              </div>
              {!selectedRegion && (
                <Text as="p" variant="bodySm" tone="subdued">
                  Click a region to drill down into country details
                </Text>
              )}
            </BlockStack>
          </Card>

          <Card background="bg-surface-secondary">
            <BlockStack gap="300">
              <InlineStack align="space-between">
                <Text as="h3" variant="headingSm">
                  Product Performance
                </Text>
                <Select
                  label=""
                  options={[
                    { label: 'All Categories', value: '' },
                    { label: 'Electronics', value: 'electronics' },
                    { label: 'Clothing', value: 'clothing' },
                    { label: 'Home & Garden', value: 'home' },
                  ]}
                  value={selectedCategory || ''}
                  onChange={setSelectedCategory}
                />
              </InlineStack>
              <BarChart
                title=""
                series={
                  selectedCategory
                    ? [productCategoryData.series.find((s) => s.name.toLowerCase().includes(selectedCategory))!]
                    : productCategoryData.series
                }
                xAxis={productCategoryData.xAxis}
                yAxis={productCategoryData.yAxis}
                height={300}
              />
            </BlockStack>
          </Card>
        </div>

        <Card background="bg-surface-secondary">
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">
              Detailed Metrics
            </Text>
            <DataTable
              columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'text']}
              headings={['Region/Country', 'Revenue', 'Growth', 'Market Share', 'Trend']}
              rows={[
                ['North America', '$450K', '+12%', '35%', '↑ Strong'],
                ['Europe', '$320K', '+8%', '25%', '↑ Moderate'],
                ['Asia Pacific', '$380K', '+15%', '30%', '↑ Strong'],
                ['Latin America', '$180K', '+5%', '14%', '→ Stable'],
              ]}
            />
          </BlockStack>
        </Card>

        <InlineStack align="end" gap="200">
          <Button>Configure Alerts</Button>
          <Button>Schedule Report</Button>
          <Button variant="primary">Export Dashboard</Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
};

const meta = {
  title: 'Cin7 DSL/06 Enterprise Components/ExtJS - Chart Integration',
  parameters: {
    layout: 'padded',
    codeVariants: getCodeVariants('chartintegration', 'default'),
    docs: {
      description: {
        component:
          'ExtJS panels seamlessly integrate with Highcharts to create powerful data visualization experiences. These patterns demonstrate embedding charts in ExtJS layouts, creating dashboards, and implementing interactive drill-down functionality.',
      },
    },
  },
  tags: ['autodocs', 'extjs', 'enterprise', 'charts', 'highcharts'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExtJSWithHighcharts: Story = {
  parameters: {
    codeVariants: getCodeVariants('chartintegration', 'basic'),
  },
  render: () => (
    <BlockStack gap="400">
      <ExtJSChartPanel
        title="Monthly Revenue Trend"
        chartType="line"
        data={{
          title: 'Revenue Analysis',
          series: [
            {
              name: 'Revenue',
              data: [120, 150, 180, 200, 195, 210, 225, 240, 230, 250, 265, 280],
            },
          ],
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
          yAxis: {
            title: { text: 'Revenue ($K)' },
          },
        }}
      />
    </BlockStack>
  ),
};

export const Dashboard: Story = {
  parameters: {
    codeVariants: getCodeVariants('chartintegration', 'dashboard'),
  },
  render: () => <DashboardLayout />,
};

export const Interactive: Story = {
  parameters: {
    codeVariants: getCodeVariants('chartintegration', 'interactive'),
  },
  render: () => <InteractiveCharts />,
};
