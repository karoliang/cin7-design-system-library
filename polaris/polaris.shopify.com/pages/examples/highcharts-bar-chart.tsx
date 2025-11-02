import React from 'react';
import {BarChart} from '@cin7/highcharts-adapter/react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function BarChartExample() {
  return (
    <div style={{height: '500px', padding: '20px'}}>
      <BarChart
        title="Sales by Product Category"
        orientation="vertical"
        series={[
          {
            name: 'Q1 2025',
            data: [450, 320, 580, 410, 290],
          },
          {
            name: 'Q2 2025',
            data: [510, 380, 620, 450, 340],
          },
        ]}
        xAxis={{
          categories: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'],
        }}
        yAxis={{
          title: {text: 'Sales ($K)'},
        }}
      />
    </div>
  );
}

export default withPolarisExample(BarChartExample);
