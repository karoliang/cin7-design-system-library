import React from 'react';
import {LineChart} from '@cin7/highcharts-adapter/react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function LineChartExample() {
  return (
    <div style={{height: '500px', padding: '20px'}}>
      <LineChart
        title="Quarterly Revenue"
        subtitle="2024-2025"
        series={[
          {
            name: 'Q1',
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
          },
          {
            name: 'Q2',
            data: [45.2, 82.3, 98.7, 115.4, 138.2, 152.8],
          },
        ]}
        xAxis={{
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        }}
        yAxis={{
          title: {text: 'Revenue ($K)'},
        }}
      />
    </div>
  );
}

export default withPolarisExample(LineChartExample);
