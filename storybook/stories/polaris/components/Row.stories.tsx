import type { Meta, StoryObj } from '@storybook/react';
import { Row } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/Row',
  component: Row,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Row is a structural component used within tables to define table rows. It provides semantic structure for organizing data horizontally and can contain multiple Cell components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Row content (typically Cell components)',
    },
  },
} satisfies Meta<typeof Row>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Header Cell 1
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Header Cell 2
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
              Header Cell 3
            </th>
          </tr>
        </thead>
        <tbody>
          <Row>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Cell 1 content
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Cell 2 content
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Cell 3 content
            </td>
          </Row>
        </tbody>
      </table>
    </div>
  ),
};

export const ProductTable: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Inventory Management
      </h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Product
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              SKU
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Category
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Price
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Stock
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="https://via.placeholder.com/40x40/3b82f6/FFFFFF?text=HP"
                  alt="Headphones"
                  style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontWeight: '500' }}>Wireless Headphones</div>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Premium audio quality</div>
                </div>
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              WH-001
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Electronics
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $299.99
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              45
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Active
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="https://via.placeholder.com/40x40/10b981/FFFFFF?text=UC"
                  alt="USB-C Hub"
                  style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontWeight: '500' }}>USB-C Hub</div>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>7-in-1 connectivity</div>
                </div>
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              UCH-002
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Accessories
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $49.99
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              5
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Low Stock
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="https://via.placeholder.com/40x40/f59e0b/FFFFFF?text=LS"
                  alt="Laptop Stand"
                  style={{ width: '40px', height: '40px', borderRadius: '4px' }}
                />
                <div>
                  <div style={{ fontWeight: '500' }}>Laptop Stand</div>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Adjustable aluminum</div>
                </div>
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              LST-003
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              Office
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $79.99
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              0
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#fecaca',
                color: '#991b1b',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Out of Stock
              </span>
            </td>
          </Row>
        </tbody>
      </table>
    </div>
  ),
};

export const OrderTracking: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Order Tracking Table
      </h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Order Info
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Customer
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Date
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Total
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexFlow: 'column', gap: '4px' }}>
                <div style={{ fontWeight: '600' }}>#ORD-2024-001</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>3 items • 2 products</div>
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>John Doe</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>john.doe@email.com</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>Nov 15, 2024</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>2:34 PM</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#059669' }}>
                $399.97
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Processing
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexFlow: 'column', gap: '4px' }}>
                <div style={{ fontWeight: '600' }}>#ORD-2024-002</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>1 item • 1 product</div>
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>Sarah Miller</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>sarah.m@example.com</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>Nov 15, 2024</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>11:22 AM</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#059669' }}>
                $129.99
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#f3e8ff',
                color: '#7c3aed',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Shipped
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexFlow: 'column', gap: '4px' }}>
                <div style={{ fontWeight: '600' }}>#ORD-2024-003</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>5 items • 3 products</div>
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>Mike Johnson</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>mike.j@example.com</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>Nov 14, 2024</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>4:15 PM</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '600', fontSize: '16px', color: '#059669' }}>
                $847.50
              </div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Delivered
              </span>
            </td>
          </Row>
        </tbody>
      </table>
    </div>
  ),
};

export const PerformanceMetrics: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Performance Metrics Table
      </h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Metric
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Current Month
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Previous Month
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Change
            </th>
            <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Trend
            </th>
          </tr>
        </thead>
        <tbody>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>Revenue</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Total sales</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>$45,231</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ color: '#6b7280' }}>$38,456</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +17.6%
              </span>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
              <span style={{ fontSize: '16px', color: '#059669' }}>📈</span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>Orders</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Total orders</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>1,234</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ color: '#6b7280' }}>987</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +25.0%
              </span>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
              <span style={{ fontSize: '16px', color: '#059669' }}>📈</span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>Customers</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>New customers</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>342</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ color: '#6b7280' }}>298</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +14.8%
              </span>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
              <span style={{ fontSize: '16px', color: '#059669' }}>📈</span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ fontWeight: '500' }}>Cart Abandonment</div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Rate</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ fontWeight: '600', fontSize: '16px' }}>68.2%</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div style={{ color: '#6b7280' }}>71.4%</div>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                -4.5%
              </span>
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
              <span style={{ fontSize: '16px', color: '#059669' }}>📉</span>
            </td>
          </Row>
        </tbody>
      </table>
    </div>
  ),
};

export const InteractiveRows: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);
    const [expandedRows, setExpandedRows] = React.useState<number[]>([]);

    const toggleRowSelection = (id: number) => {
      setSelectedRows(prev =>
        prev.includes(id)
          ? prev.filter(rowId => rowId !== id)
          : [...prev, id]
      );
    };

    const toggleRowExpansion = (id: number) => {
      setExpandedRows(prev =>
        prev.includes(id)
          ? prev.filter(rowId => rowId !== id)
          : [...prev, id]
      );
    };

    const transactions = [
      {
        id: 1,
        date: '2024-11-15',
        description: 'Payment received',
        amount: 1299.99,
        status: 'Completed',
        details: 'Customer payment for order #1234 - Wireless Headphones x2, USB-C Hub x1'
      },
      {
        id: 2,
        date: '2024-11-14',
        description: 'Refund processed',
        amount: -49.99,
        status: 'Processed',
        details: 'Refund for returned item - USB-C Hub (defective unit)'
      },
      {
        id: 3,
        date: '2024-11-13',
        description: 'Payment received',
        amount: 299.99,
        status: 'Completed',
        details: 'Customer payment for order #1235 - Laptop Stand'
      },
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
          Transaction History
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(transactions.map(t => t.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === transactions.length}
                  style={{ marginRight: '8px' }}
                />
                Date
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Description
              </th>
              <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Amount
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Status
              </th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <Row
                  style={{
                    backgroundColor: selectedRows.includes(transaction.id) ? '#f0f9ff' :
                                    transaction.id % 2 === 0 ? '#f9fafb' : '#ffffff',
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleRowSelection(transaction.id)}
                >
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(transaction.id)}
                        onChange={() => toggleRowSelection(transaction.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div>
                        <div style={{ fontWeight: '500' }}>{transaction.date}</div>
                        <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: '500' }}>{transaction.description}</div>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '16px',
                      color: transaction.amount > 0 ? '#059669' : '#dc2626'
                    }}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                    <span style={{
                      padding: '4px 8px',
                      backgroundColor: transaction.status === 'Completed' ? '#dcfce7' : '#f3f4f6',
                      color: transaction.status === 'Completed' ? '#166534' : '#374151',
                      borderRadius: '4px',
                      fontSize: "var(--font-size-xs)",
                      fontWeight: '500'
                    }}>
                      {transaction.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRowExpansion(transaction.id);
                      }}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#f3f4f6',
                        border: '1px solid #d2d2d2',
                        borderRadius: '4px',
                        fontSize: "var(--font-size-xs)",
                        cursor: 'pointer'
                      }}
                    >
                      {expandedRows.includes(transaction.id) ? 'Hide' : 'Details'}
                    </button>
                  </td>
                </Row>
                {expandedRows.includes(transaction.id) && (
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <td colSpan={5} style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ fontSize: "var(--font-size-sm)", color: '#374151' }}>
                        <strong>Transaction Details:</strong><br />
                        {transaction.details}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {selectedRows.length > 0 && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: "var(--font-size-sm)", color: '#1e40af' }}>
              {selectedRows.length} transaction{selectedRows.length > 1 ? 's' : ''} selected
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer'
                }}
              >
                Export Selected
              </button>
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d2d2d2',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer'
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const GroupedRows: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Category Summary
      </h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Category
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Products
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Revenue
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Growth
            </th>
          </tr>
        </thead>
        <tbody>
          <Row style={{ backgroundColor: '#f0f9ff' }}>
            <td
              colSpan={4}
              style={{
                padding: '12px',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: '600',
                fontSize: "var(--font-size-sm)",
                color: '#1e40af'
              }}
            >
              Electronics
            </td>
          </Row>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
              Audio Equipment
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              15
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              $12,450
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +8.2%
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#f9fafb' }}>
            <td style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
              Computer Accessories
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              23
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              $8,920
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +12.1%
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
              Mobile Devices
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              8
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              $15,670
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +2.3%
              </span>
            </td>
          </Row>
          <Row style={{ backgroundColor: '#e0f2fe' }}>
            <td
              colSpan={4}
              style={{
                padding: '12px',
                borderBottom: '1px solid #e5e7eb',
                fontWeight: '600',
                fontSize: "var(--font-size-sm)",
                color: '#0369a1'
              }}
            >
              Office Supplies
            </td>
          </Row>
          <Row style={{ backgroundColor: '#ffffff' }}>
            <td style={{ padding: '12px 24px', borderBottom: '1px solid #e5e7eb' }}>
              Desk Accessories
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              12
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              $3,240
            </td>
            <td style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +15.7%
              </span>
            </td>
          </Row>
        </tbody>
      </table>
    </div>
  ),
};