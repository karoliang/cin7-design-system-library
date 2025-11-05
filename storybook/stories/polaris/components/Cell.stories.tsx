import type { Meta, StoryObj } from '@storybook/react';
import { Cell } from '@shopify/polaris';
import React from 'react';

const meta = {
  title: 'Polaris/Structure/Cell',
  component: Cell,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Cell is a structural component used within tables and grids to define individual cells. It provides semantic structure for tabular data and can be customized with various content types and layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Cell content',
    },
  },
} satisfies Meta<typeof Cell>;

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
              Header Cell
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell>Standard cell content</Cell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const DataTable: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Product Inventory
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
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: '500' }}>Wireless Headphones</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Premium audio quality</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              WH-001
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $299.99
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              45
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                In Stock
              </span>
            </Cell>
          </tr>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: '500' }}>USB-C Hub</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>7-in-1 connectivity</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              UCH-002
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $49.99
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              5
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
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
            </Cell>
          </tr>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: '500' }}>Laptop Stand</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Adjustable aluminum</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              LST-003
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              $79.99
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              0
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
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
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Order Details
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
              Order Information
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Customer
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Items
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontWeight: '600' }}>#ORD-2024-001</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>Nov 15, 2024 2:34 PM</div>
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  fontWeight: '500',
                  display: 'inline-block',
                  marginTop: '4px'
                }}>
                  Processing
                </div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontWeight: '500' }}>John Doe</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>john.doe@email.com</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>+1 (555) 123-4567</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: "var(--font-size-sm)" }}>
                  <span style={{ fontWeight: '500' }}>3 items</span>
                  <span style={{ color: '#6b7280', marginLeft: '8px' }}>2 products</span>
                </div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>
                  • Wireless Headphones × 1<br />
                  • USB-C Hub × 2
                </div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: "var(--font-size-lg)", fontWeight: '700', color: '#059669' }}>
                  $399.97
                </div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>
                  Subtotal: $399.97<br />
                  Shipping: $0.00<br />
                  Tax: $0.00
                </div>
              </div>
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const ActionCells: Story = {
  render: () => (
    <div style={{ maxWidth: '700px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        User Management
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
              User
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Role
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Status
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: "var(--font-size-sm)",
                  fontWeight: '600',
                  color: '#1e40af'
                }}>
                  JD
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>John Doe</div>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>john.doe@example.com</div>
                </div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Administrator
              </span>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
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
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d2d2d2',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#fef2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer'
                }}>
                  Remove
                </button>
              </div>
            </Cell>
          </tr>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#fce7f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: "var(--font-size-sm)",
                  fontWeight: '600',
                  color: '#9f1239'
                }}>
                  SM
                </div>
                <div>
                  <div style={{ fontWeight: '500' }}>Sarah Miller</div>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>sarah.m@example.com</div>
                </div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                Editor
              </span>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
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
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d2d2d2',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
                <button style={{
                  padding: '6px 12px',
                  backgroundColor: '#fef2f2',
                  color: '#991b1b',
                  border: '1px solid #fecaca',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer'
                }}>
                  Remove
                </button>
              </div>
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const NumericData: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Sales Report
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
              Period
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Revenue
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Orders
            </th>
            <th style={{ padding: '12px', textAlign: 'right', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Growth
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              October 2024
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>$45,231</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>USD</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>1,234</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>orders</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +12.5%
              </span>
            </Cell>
          </tr>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              September 2024
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>$38,456</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>USD</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '16px' }}>987</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>orders</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', textAlign: 'right' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dcfce7',
                color: '#166534',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                fontWeight: '500'
              }}>
                +8.3%
              </span>
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};

export const InteractiveCells: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

    const toggleRowSelection = (id: number) => {
      setSelectedRows(prev =>
        prev.includes(id)
          ? prev.filter(rowId => rowId !== id)
          : [...prev, id]
      );
    };

    const tasks = [
      { id: 1, title: 'Complete product review', priority: 'High', dueDate: '2024-11-20', status: 'In Progress' },
      { id: 2, title: 'Update customer documentation', priority: 'Medium', dueDate: '2024-11-25', status: 'Not Started' },
      { id: 3, title: 'Fix checkout bug', priority: 'High', dueDate: '2024-11-18', status: 'In Progress' },
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
          Task Management
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
                      setSelectedRows(tasks.map(t => t.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                  checked={selectedRows.length === tasks.length}
                  style={{ marginRight: '8px' }}
                />
                Task
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Priority
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Due Date
              </th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                style={{
                  backgroundColor: selectedRows.includes(task.id) ? '#f0f9ff' : 'transparent'
                }}
              >
                <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(task.id)}
                      onChange={() => toggleRowSelection(task.id)}
                    />
                    <span style={{ fontWeight: '500' }}>{task.title}</span>
                  </div>
                </Cell>
                <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <span style={{
                    padding: '4px 8px',
                    backgroundColor: task.priority === 'High' ? '#fef2f2' : '#fef3c7',
                    color: task.priority === 'High' ? '#991b1b' : '#92400e',
                    borderRadius: '4px',
                    fontSize: "var(--font-size-xs)",
                    fontWeight: '500'
                  }}>
                    {task.priority}
                  </span>
                </Cell>
                <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  {task.dueDate}
                </Cell>
                <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
                  <select
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #d2d2d2',
                      borderRadius: '4px',
                      fontSize: "var(--font-size-xs)"
                    }}
                    defaultValue={task.status}
                  >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </Cell>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedRows.length > 0 && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bfdbfe',
            borderRadius: '6px'
          }}>
            <span style={{ fontSize: "var(--font-size-sm)", color: '#1e40af' }}>
              {selectedRows.length} task{selectedRows.length > 1 ? 's' : ''} selected
            </span>
            <button
              style={{
                marginLeft: '12px',
                padding: '6px 12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: "var(--font-size-xs)",
                cursor: 'pointer'
              }}
            >
              Bulk Actions
            </button>
          </div>
        )}
      </div>
    );
  },
};

export const MediaCells: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: "var(--font-size-lg)", fontWeight: '600' }}>
        Media Gallery
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
              Preview
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              File Info
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Dimensions
            </th>
            <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e5e7eb', fontWeight: '600' }}>
              Size
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <img
                src="https://via.placeholder.com/60x60/3b82f6/FFFFFF?text=IMG"
                alt="Product image"
                style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
              />
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: '500' }}>product-hero.jpg</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>JPEG Image</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              1200 × 800px
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              2.4 MB
            </Cell>
          </tr>
          <tr>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <img
                src="https://via.placeholder.com/60x60/10b981/FFFFFF?text=IMG"
                alt="Product thumbnail"
                style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
              />
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              <div>
                <div style={{ fontWeight: '500' }}>thumbnail.png</div>
                <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>PNG Image</div>
              </div>
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              300 × 200px
            </Cell>
            <Cell style={{ padding: '12px', borderBottom: '1px solid #e5e7eb' }}>
              124 KB
            </Cell>
          </tr>
        </tbody>
      </table>
    </div>
  ),
};