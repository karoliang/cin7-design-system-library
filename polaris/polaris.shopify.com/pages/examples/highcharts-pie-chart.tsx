import React from 'react';
import {PieChart} from '@cin7/highcharts-adapter/react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function PieChartExample() {
  return (
    <div style={{height: '500px', padding: '20px'}}>
      <PieChart
        title="Market Share by Product"
        subtitle="Q1 2025"
        data={[
          {name: 'Product A', y: 45.0, color: '#5C6AC4'},
          {name: 'Product B', y: 26.8, color: '#006FBB'},
          {name: 'Product C', y: 18.2, color: '#47C1BF'},
          {name: 'Product D', y: 10.0, color: '#955BA5'},
        ]}
        legend={true}
        dataLabels={true}
      />
    </div>
  );
}

export default withPolarisExample(PieChartExample);
