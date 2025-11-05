import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { DataTable, Button, Badge, Icon, Text, Checkbox } from '@shopify/polaris';
import { ViewMinor, EditMinor, DeleteMinor, ExportMinor, ImportMinor } from '@shopify/polaris-icons';

// Vanilla JS Table Component
class VanillaTable {
  private container: HTMLElement;
  private table: HTMLTableElement;
  private thead: HTMLTableSectionElement;
  private tbody: HTMLTableSectionElement;
  private data: any[] = [];
  private sortColumn: number = -1;
  private sortDirection: 'asc' | 'desc' = 'asc';

  constructor(options: {
    columns: Array<{ header: string; field: string; type?: 'text' | 'number' | 'date' }>;
    data: any[];
    sortable?: boolean;
    striped?: boolean;
  }) {
    this.container = document.createElement('div');
    this.setupTableStyles();
    this.createTable(options);
    this.data = options.data;
    this.renderTable();
  }

  private setupTableStyles() {
    this.container.style.cssText = `
      overflow-x: auto;
      margin-bottom: 16px;
    `;
  }

  private createTable(options: any) {
    this.table = document.createElement('table');
    this.table.style.cssText = `
      width: 100%;
      border-collapse: collapse;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    // Create header
    this.thead = document.createElement('thead');
    this.thead.style.cssText = `
      background: #f8fafc;
      border-bottom: 2px solid #e5e7eb;
    `;

    const headerRow = document.createElement('tr');
    options.columns.forEach((col: any, index: number) => {
      const th = document.createElement('th');
      th.textContent = col.header;
      th.style.cssText = `
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 14px;
        color: #374151;
        border-right: 1px solid #e5e7eb;
        cursor: ${options.sortable ? 'pointer' : 'default'};
        user-select: none;
      `;

      if (options.sortable) {
        th.addEventListener('click', () => this.handleSort(index));
        th.addEventListener('mouseenter', () => {
          th.style.backgroundColor = '#f1f5f9';
        });
        th.addEventListener('mouseleave', () => {
          th.style.backgroundColor = '#f8fafc';
        });
      }

      headerRow.appendChild(th);
    });

    this.thead.appendChild(headerRow);
    this.table.appendChild(this.thead);

    // Create body
    this.tbody = document.createElement('tbody');
    this.tbody.style.cssText = `
      font-size: 14px;
    `;

    this.table.appendChild(this.tbody);
    this.container.appendChild(this.table);
  }

  private handleSort(columnIndex: number) {
    if (this.sortColumn === columnIndex) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnIndex;
      this.sortDirection = 'asc';
    }
    this.renderTable();
  }

  private renderTable() {
    // Clear existing rows
    this.tbody.innerHTML = '';

    // Sort data if needed
    const sortedData = this.sortColumn >= 0
      ? [...this.data].sort((a, b) => {
          const aValue = Object.values(a)[this.sortColumn];
          const bValue = Object.values(b)[this.sortColumn];

          const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
          return this.sortDirection === 'asc' ? comparison : -comparison;
        })
      : this.data;

    // Render rows
    sortedData.forEach((row, index) => {
      const tr = document.createElement('tr');
      tr.style.cssText = `
        border-bottom: 1px solid #f3f4f6;
        ${index % 2 === 1 ? 'background: #f9fafb;' : ''}
        transition: background-color 0.2s;
      `;

      tr.addEventListener('mouseenter', () => {
        tr.style.backgroundColor = '#f3f4f6';
      });

      tr.addEventListener('mouseleave', () => {
        tr.style.backgroundColor = index % 2 === 1 ? '#f9fafb' : 'white';
      });

      Object.values(row).forEach((cellValue, cellIndex) => {
        const td = document.createElement('td');
        td.textContent = String(cellValue);
        td.style.cssText = `
          padding: 12px 16px;
          border-right: 1px solid #f3f4f6;
          color: #374151;
        `;
        tr.appendChild(td);
      });

      this.tbody.appendChild(tr);
    });

    // Update sort indicators
    if (this.sortColumn >= 0) {
      const headers = this.thead.querySelectorAll('th');
      headers.forEach((header, index) => {
        if (index === this.sortColumn) {
          header.innerHTML = `${header.textContent} ${this.sortDirection === 'asc' ? '↑' : '↓'}`;
        }
      });
    }
  }

  updateData(newData: any[]) {
    this.data = newData;
    this.renderTable();
  }

  addRow(rowData: any) {
    this.data.push(rowData);
    this.renderTable();
  }

  removeRow(index: number) {
    this.data.splice(index, 1);
    this.renderTable();
  }

  mount(parent: HTMLElement) {
    parent.appendChild(this.container);
  }

  destroy() {
    this.container.remove();
  }
}

// Vanilla JS React Wrapper
const VanillaTableWrapper: React.FC<{
  columns: Array<{ header: string; field: string; type?: 'text' | 'number' | 'date' }>;
  data: any[];
  sortable?: boolean;
  striped?: boolean;
}> = ({ columns, data, sortable = true, striped = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<VanillaTable | null>(null);

  useEffect(() => {
    if (containerRef.current && !tableRef.current) {
      tableRef.current = new VanillaTable({
        columns,
        data,
        sortable,
        striped
      });
      tableRef.current.mount(containerRef.current);
    }

    return () => {
      if (tableRef.current) {
        tableRef.current.destroy();
        tableRef.current = null;
      }
    };
  }, [columns, sortable, striped]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.updateData(data);
    }
  }, [data]);

  return <div ref={containerRef} />;
};

// ExtJS Grid Component
const ExtJSGrid: React.FC<{
  columns: Array<{ text: string; dataIndex: string; xtype?: 'gridcolumn' | 'numbercolumn' | 'datecolumn' }>;
  store: any[];
  features?: string[];
  plugins?: string[];
}> = ({ columns, store, features = [], plugins = [] }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortState, setSortState] = useState<{ field: string; direction: 'ASC' | 'DESC' } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRowClick = (index: number) => {
    setSelectedRows(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleSort = (dataIndex: string) => {
    const newDirection = sortState?.field === dataIndex && sortState?.direction === 'ASC' ? 'DESC' : 'ASC';
    setSortState({ field: dataIndex, direction: newDirection });
  };

  const handleExtJSAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      console.log(`ExtJS action: ${action}`, { selectedRows, sortState });
      setLoading(false);
    }, 1000);
  };

  const getFormattedValue = (value: any, column: any) => {
    if (column.xtype === 'numbercolumn' && typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    if (column.xtype === 'datecolumn' && value) {
      return new Date(value).toLocaleDateString();
    }
    return String(value);
  };

  return (
    <div style={{
      border: '1px solid #d1d5db',
      borderRadius: '4px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#ffffff',
      marginBottom: '16px'
    }}>
      {/* ExtJS Toolbar */}
      <div style={{
        background: 'linear-gradient(to bottom, #f8f9fa, #e9ecef)',
        padding: '8px 12px',
        borderBottom: '1px solid #d1d5db',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#495057' }}>
          Data Grid ({store.length} records)
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {plugins.includes('selection') && (
            <span style={{ fontSize: "var(--font-size-xs)", color: '#6c757d' }}>
              {selectedRows.length} selected
            </span>
          )}
          <button
            onClick={() => handleExtJSAction('refresh')}
            style={{
              padding: '2px 8px',
              fontSize: '11px',
              border: '1px solid #ced4da',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>
        </div>
      </div>

      {/* ExtJS Grid */}
      <div style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #d1d5db' }}>
              {plugins.includes('selection') && (
                <th style={{ padding: '8px', width: '30px', borderRight: '1px solid #d1d5db' }}>
                  <input type="checkbox" style={{ margin: 0 }} />
                </th>
              )}
              {columns.map((col, index) => (
                <th
                  key={index}
                  onClick={() => handleSort(col.dataIndex)}
                  style={{
                    padding: '8px 12px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: "var(--font-size-xs)",
                    color: '#495057',
                    borderRight: '1px solid #d1d5db',
                    cursor: 'pointer',
                    userSelect: 'none'
                  }}
                >
                  {col.text}
                  {sortState?.field === col.dataIndex && (
                    <span style={{ marginLeft: '4px', color: '#007bff' }}>
                      {sortState.direction === 'ASC' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {store.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => plugins.includes('selection') && handleRowClick(rowIndex)}
                style={{
                  backgroundColor: selectedRows.includes(rowIndex) ? '#e3f2fd' :
                                rowIndex % 2 === 0 ? 'white' : '#f8f9fa',
                  cursor: plugins.includes('selection') ? 'pointer' : 'default',
                  borderBottom: '1px solid #f1f3f4'
                }}
              >
                {plugins.includes('selection') && (
                  <td style={{ padding: '8px', borderRight: '1px solid #f1f3f4' }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(rowIndex)}
                      onChange={() => {}}
                      style={{ margin: 0 }}
                    />
                  </td>
                )}
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    style={{
                      padding: '8px 12px',
                      fontSize: "var(--font-size-xs)",
                      color: '#495057',
                      borderRight: '1px solid #f1f3f4'
                    }}
                  >
                    {getFormattedValue(row[col.dataIndex], col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ExtJS Paging Toolbar */}
      {features.includes('paging') && (
        <div style={{
          background: '#f8f9fa',
          padding: '8px 12px',
          borderTop: '1px solid #d1d5db',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: "var(--font-size-xs)"
        }}>
          <span>Showing 1-{store.length} of {store.length}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{ padding: '2px 8px', border: '1px solid #ced4da', background: 'white' }}>
              Previous
            </button>
            <button style={{ padding: '2px 8px', border: '1px solid #ced4da', background: 'white' }}>
              1
            </button>
            <button style={{ padding: '2px 8px', border: '1px solid #ced4da', background: '#007bff', color: 'white' }}>
              Next
            </button>
          </div>
        </div>
      )}

      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: "var(--font-size-xs)",
          color: '#6c757d'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
};

// TypeScript Table Components
interface TableData {
  id: string;
  [key: string]: any;
}

interface TableConfig {
  columns: Array<{
    key: string;
    title: string;
    type: 'text' | 'number' | 'date' | 'boolean' | 'custom';
    sortable?: boolean;
    filterable?: boolean;
    formatter?: (value: any) => string;
    width?: number;
  }>;
  data: TableData[];
  pagination?: {
    pageSize: number;
    currentPage: number;
  };
  selection?: {
    enabled: boolean;
    mode: 'single' | 'multiple';
    selected: string[];
  };
  sorting?: {
    column: string;
    direction: 'asc' | 'desc';
  };
  filtering?: {
    [column: string]: string;
  };
}

const TypeSafeTable: React.FC<{
  config: TableConfig;
  onRowClick?: (row: TableData) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, string>) => void;
}> = ({ config, onRowClick, onSelectionChange, onSort, onFilter }) => {
  const [internalConfig, setInternalConfig] = useState(config);
  const [selectedIds, setSelectedIds] = useState<string[]>(config.selection?.selected || []);

  const processedData = useMemo(() => {
    let filtered = [...internalConfig.data];

    // Apply filters
    if (internalConfig.filtering) {
      Object.entries(internalConfig.filtering).forEach(([column, filterValue]) => {
        if (filterValue) {
          filtered = filtered.filter(row =>
            String(row[column]).toLowerCase().includes(filterValue.toLowerCase())
          );
        }
      });
    }

    // Apply sorting
    if (internalConfig.sorting) {
      const { column, direction } = internalConfig.sorting;
      const colConfig = internalConfig.columns.find(col => col.key === column);

      filtered.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        if (colConfig?.type === 'number') {
          aVal = Number(aVal);
          bVal = Number(bVal);
        } else if (colConfig?.type === 'date') {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else {
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
        }

        const comparison = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
        return direction === 'asc' ? comparison : -comparison;
      });
    }

    // Apply pagination
    if (internalConfig.pagination) {
      const { pageSize, currentPage } = internalConfig.pagination;
      const startIndex = (currentPage - 1) * pageSize;
      return filtered.slice(startIndex, startIndex + pageSize);
    }

    return filtered;
  }, [internalConfig]);

  const handleSort = (column: string) => {
    const colConfig = internalConfig.columns.find(col => col.key === column);
    if (!colConfig?.sortable) return;

    const currentDirection = internalConfig.sorting?.direction;
    const newDirection = !internalConfig.sorting || internalConfig.sorting.column !== column
      ? 'asc'
      : currentDirection === 'asc' ? 'desc' : 'asc';

    const newConfig = {
      ...internalConfig,
      sorting: { column, direction: newDirection }
    };

    setInternalConfig(newConfig);
    onSort?.(column, newDirection);
  };

  const handleSelection = (id: string, selected: boolean) => {
    let newSelectedIds: string[];

    if (internalConfig.selection?.mode === 'single') {
      newSelectedIds = selected ? [id] : [];
    } else {
      newSelectedIds = selected
        ? [...selectedIds, id]
        : selectedIds.filter(selectedId => selectedId !== id);
    }

    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  const handleFilter = (column: string, value: string) => {
    const newConfig = {
      ...internalConfig,
      filtering: {
        ...internalConfig.filtering,
        [column]: value
      }
    };

    setInternalConfig(newConfig);
    onFilter?.(newConfig.filtering);
  };

  const formatValue = (value: any, column: TableConfig['columns'][0]) => {
    if (column.formatter) {
      return column.formatter(value);
    }

    switch (column.type) {
      case 'boolean':
        return value ? '✓ Yes' : '✗ No';
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      default:
        return String(value);
    }
  };

  const getSortIndicator = (column: string) => {
    if (internalConfig.sorting?.column === column) {
      return internalConfig.sorting.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return column && internalConfig.columns.find(col => col.key === column)?.sortable ? ' ↕' : '';
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      {/* Filters */}
      {internalConfig.columns.filter(col => col.filterable).length > 0 && (
        <div style={{
          padding: '12px',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderBottom: 'none',
          borderRadius: '6px 6px 0 0'
        }}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {internalConfig.columns.filter(col => col.filterable).map(column => (
              <input
                key={column.key}
                type="text"
                placeholder={`Filter by ${column.title}`}
                defaultValue={internalConfig.filtering?.[column] || ''}
                onChange={(e) => handleFilter(column.key, e.target.value)}
                style={{
                  padding: '6px 8px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  fontSize: "var(--font-size-xs)",
                  minWidth: '150px'
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: internalConfig.columns.some(col => col.filterable) ? '0 0 6px 6px' : '6px',
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {internalConfig.selection?.enabled && (
                <th style={{
                  padding: '12px',
                  width: '40px',
                  fontWeight: '600',
                  fontSize: "var(--font-size-sm)",
                  color: '#374151',
                  borderRight: '1px solid #e2e8f0'
                }}>
                  <Checkbox
                    checked={selectedIds.length === processedData.length}
                    onChange={(checked) => {
                      if (checked) {
                        const allIds = processedData.map(row => row.id);
                        setSelectedIds(allIds);
                        onSelectionChange?.(allIds);
                      } else {
                        setSelectedIds([]);
                        onSelectionChange?.([]);
                      }
                    }}
                  />
                </th>
              )}
              {internalConfig.columns.map((column, index) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    fontSize: "var(--font-size-sm)",
                    color: '#374151',
                    borderRight: index < internalConfig.columns.length - 1 ? '1px solid #e2e8f0' : 'none',
                    cursor: column.sortable ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: column.width ? `${column.width}px` : 'auto'
                  }}
                >
                  {column.title}
                  <span style={{ color: '#6b7280', fontSize: "var(--font-size-xs)" }}>
                    {getSortIndicator(column.key)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, index) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                style={{
                  backgroundColor: selectedIds.includes(row.id) ? '#eff6ff' :
                                index % 2 === 0 ? 'white' : '#f9fafb',
                  cursor: onRowClick ? 'pointer' : 'default',
                  borderBottom: '1px solid #f3f4f6',
                  transition: 'background-color 0.15s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (!selectedIds.includes(row.id)) {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedIds.includes(row.id)) {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'white' : '#f9fafb';
                  }
                }}
              >
                {internalConfig.selection?.enabled && (
                  <td style={{
                    padding: '12px',
                    borderRight: '1px solid #f3f4f6'
                  }}>
                    <Checkbox
                      checked={selectedIds.includes(row.id)}
                      onChange={(checked) => handleSelection(row.id, checked)}
                    />
                  </td>
                )}
                {internalConfig.columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    style={{
                      padding: '12px 16px',
                      fontSize: "var(--font-size-sm)",
                      color: '#374151',
                      borderRight: colIndex < internalConfig.columns.length - 1 ? '1px solid #f3f4f6' : 'none'
                    }}
                  >
                    {formatValue(row[column.key], column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {processedData.length === 0 && (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            color: '#6b7280',
            fontSize: "var(--font-size-sm)"
          }}>
            No data available
          </div>
        )}

        {/* Pagination Info */}
        {internalConfig.pagination && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: "var(--font-size-sm)"
          }}>
            <span>
              Showing {processedData.length} of {internalConfig.data.length} records
            </span>
            {selectedIds.length > 0 && (
              <span style={{ color: '#1d4ed8', fontWeight: '500' }}>
                {selectedIds.length} row{selectedIds.length !== 1 ? 's' : ''} selected
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const meta = {
  title: 'Polaris/Multi-Language/Table',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive multi-language implementation of Table components showing React, Vanilla JS, ExtJS, and TypeScript patterns. Demonstrates data management, sorting, filtering, pagination, and interactive features across different layers of the Cin7 DSL framework.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const ordersData = [
  { id: 'ORD-001', customer: 'John Doe', amount: 125.50, status: 'Completed', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', amount: 89.99, status: 'Processing', date: '2024-01-16' },
  { id: 'ORD-003', customer: 'Bob Johnson', amount: 234.75, status: 'Pending', date: '2024-01-17' },
  { id: 'ORD-004', customer: 'Alice Brown', amount: 67.25, status: 'Completed', date: '2024-01-18' },
  { id: 'ORD-005', customer: 'Charlie Wilson', amount: 456.80, status: 'Processing', date: '2024-01-19' },
];

const productsData = [
  { id: 'PRD-001', name: 'Premium Widget', category: 'Electronics', price: 89.99, stock: 150, active: true },
  { id: 'PRD-002', name: 'Standard Widget', category: 'Electronics', price: 45.50, stock: 200, active: true },
  { id: 'PRD-003', name: 'Basic Widget', category: 'Electronics', price: 25.00, stock: 0, active: false },
  { id: 'PRD-004', name: 'Deluxe Widget', category: 'Electronics', price: 125.00, stock: 75, active: true },
];

export const ReactImplementation: Story = {
  render: () => {
    const [sortDirection, setSortDirection] = useState<'ascending' | 'descending'>('ascending');
    const [sortedColumnIndex, setSortedColumnIndex] = useState(0);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleSort = (columnIndex: number, direction: 'ascending' | 'descending') => {
      setSortedColumnIndex(columnIndex);
      setSortDirection(direction);
    };

    const handleRowSelection = (orderId: string) => {
      setSelectedRows(prev =>
        prev.includes(orderId)
          ? prev.filter(id => id !== orderId)
          : [...prev, orderId]
      );
    };

    const rows = ordersData.map(order => [
      order.id,
      order.customer,
      `$${order.amount.toFixed(2)}`,
      <Badge
        key={order.id}
        status={order.status === 'Completed' ? 'success' :
                order.status === 'Processing' ? 'attention' : 'info'}
      >
        {order.status}
      </Badge>,
      <div key={order.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          checked={selectedRows.includes(order.id)}
          onChange={handleRowSelection.bind(null, order.id)}
        />
        <Button size="small" variant="plain">View</Button>
      </div>
    ]);

    return (
      <div style={{ maxWidth: '900px' }}>
        <h3>React (Polaris) Implementation</h3>
        <p>Using Shopify Polaris DataTable with React state management</p>

        <div style={{ marginBottom: '16px' }}>
          <Text variant="bodySm" as="p">
            Selected: {selectedRows.length} order{selectedRows.length !== 1 ? 's' : ''}
          </Text>
        </div>

        <div style={{ width: '100%', overflow: 'auto' }}>
          <DataTable
            columnContentTypes={['text', 'text', 'numeric', 'text', 'text']}
            headings={['Order ID', 'Customer', 'Amount', 'Status', 'Actions']}
            rows={rows}
            sortable={[true, true, true, false, false]}
            defaultSortDirection="ascending"
            initialSortColumnIndex={sortedColumnIndex}
            onSort={handleSort}
            hasZebraStriping={true}
            footerContent={`${ordersData.length} orders total`}
          />
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button size="small">Export Selected</Button>
          <Button size="small" variant="plain">Clear Selection</Button>
        </div>
      </div>
    );
  },
};

export const VanillaJSImplementation: Story = {
  render: () => {
    const [data, setData] = useState(ordersData);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
      setLogs(prev => [...prev.slice(-2), `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    const handleAddRow = () => {
      const newOrder = {
        id: `ORD-${String(data.length + 1).padStart(3, '0')}`,
        customer: 'New Customer',
        amount: Math.floor(Math.random() * 500) + 50,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      };
      setData(prev => [...prev, newOrder]);
      addLog(`Added new order: ${newOrder.id}`);
    };

    const handleRemoveRow = () => {
      if (data.length > 0) {
        setData(prev => prev.slice(0, -1));
        addLog('Removed last order');
      }
    };

    const columns = [
      { header: 'Order ID', field: 'id', type: 'text' },
      { header: 'Customer', field: 'customer', type: 'text' },
      { header: 'Amount', field: 'amount', type: 'number' },
      { header: 'Status', field: 'status', type: 'text' },
      { header: 'Date', field: 'date', type: 'date' }
    ];

    return (
      <div style={{ maxWidth: '900px' }}>
        <h3>Vanilla JS Implementation</h3>
        <p>Class-based JavaScript table with direct DOM manipulation</p>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          <button
            onClick={handleAddRow}
            style={{
              padding: '6px 12px',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: "var(--font-size-xs)",
              cursor: 'pointer'
            }}
          >
            Add Row
          </button>
          <button
            onClick={handleRemoveRow}
            style={{
              padding: '6px 12px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: "var(--font-size-xs)",
              cursor: 'pointer'
            }}
          >
            Remove Row
          </button>
        </div>

        <VanillaTableWrapper
          columns={columns}
          data={data}
          sortable={true}
          striped={true}
        />

        {logs.length > 0 && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0fdf4',
            border: '1px solid #10b981',
            borderRadius: '6px'
          }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-xs)" }}>Vanilla JS Logs:</h4>
            {logs.map((log, index) => (
              <div key={index} style={{ fontSize: '11px', color: '#047857', fontFamily: 'monospace' }}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

export const ExtJSImplementation: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    const extColumns = [
      { text: 'Product ID', dataIndex: 'id', xtype: 'gridcolumn' },
      { text: 'Product Name', dataIndex: 'name', xtype: 'gridcolumn' },
      { text: 'Category', dataIndex: 'category', xtype: 'gridcolumn' },
      { text: 'Price', dataIndex: 'price', xtype: 'numbercolumn' },
      { text: 'Stock', dataIndex: 'stock', xtype: 'numbercolumn' },
      { text: 'Active', dataIndex: 'active', xtype: 'gridcolumn' }
    ];

    return (
      <div style={{ maxWidth: '1000px' }}>
        <h3>ExtJS Implementation</h3>
        <p>Enterprise-grade grid with ExtJS features and architecture</p>

        <ExtJSGrid
          columns={extColumns}
          store={productsData}
          features={['paging', 'sorting', 'filtering']}
          plugins={['selection']}
        />

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button size="small">Add Product</Button>
          <Button size="small">Edit Selected</Button>
          <Button size="small" variant="plain">Export Grid</Button>
          <Button size="small" variant="plain">Refresh Data</Button>
        </div>

        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: "var(--font-size-xs)",
          fontFamily: 'Arial, sans-serif'
        }}>
          <strong>ExtJS Features:</strong> Selection models, data stores, column renderers,
          sorting, filtering, paging toolbar, and enterprise-grade performance optimization
        </div>
      </div>
    );
  },
};

export const TypeScriptImplementation: Story = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});

    const tableConfig: TableConfig = {
      columns: [
        {
          key: 'id',
          title: 'Product ID',
          type: 'text',
          sortable: true,
          filterable: true,
          width: 100
        },
        {
          key: 'name',
          title: 'Product Name',
          type: 'text',
          sortable: true,
          filterable: true,
          width: 200
        },
        {
          key: 'category',
          title: 'Category',
          type: 'text',
          sortable: true,
          filterable: true,
          formatter: (value) => `📁 ${value}`
        },
        {
          key: 'price',
          title: 'Price',
          type: 'number',
          sortable: true,
          filterable: true,
          formatter: (value) => `$${typeof value === 'number' ? value.toFixed(2) : value}`
        },
        {
          key: 'stock',
          title: 'Stock Level',
          type: 'number',
          sortable: true,
          filterable: true,
          formatter: (value) => {
            const num = Number(value);
            return `${num} ${num === 0 ? '(Out of Stock)' : num < 20 ? '(Low Stock)' : '(In Stock)'}`;
          }
        },
        {
          key: 'active',
          title: 'Status',
          type: 'boolean',
          sortable: true,
          filterable: false,
          formatter: (value) => value ? '🟢 Active' : '🔴 Inactive'
        }
      ],
      data: productsData,
      selection: {
        enabled: true,
        mode: 'multiple',
        selected: selectedIds
      },
      sorting: sortConfig || undefined,
      filtering: filters
    };

    const handleRowClick = (row: TableData) => {
      console.log('Row clicked:', row);
    };

    const handleSelectionChange = (ids: string[]) => {
      setSelectedIds(ids);
    };

    const handleSort = (column: string, direction: 'asc' | 'desc') => {
      setSortConfig({ column, direction });
    };

    const handleFilter = (newFilters: Record<string, string>) => {
      setFilters(newFilters);
    };

    return (
      <div style={{ maxWidth: '1200px' }}>
        <h3>TypeScript Implementation</h3>
        <p>Type-safe data table with comprehensive features and validation</p>

        <TypeSafeTable
          config={tableConfig}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
          onSort={handleSort}
          onFilter={handleFilter}
        />

        <div style={{ marginTop: '20px' }}>
          <h4>Table State:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-xs)", color: '#374151' }}>Selection</h5>
              <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>
                {selectedIds.length > 0 ? `${selectedIds.length} items selected` : 'No selection'}
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-xs)", color: '#374151' }}>Sorting</h5>
              <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>
                {sortConfig ? `${sortConfig.column} (${sortConfig.direction})` : 'No sorting applied'}
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', fontSize: "var(--font-size-xs)", color: '#374151' }}>Filters</h5>
              <p style={{ margin: 0, fontSize: '11px', color: '#6b7280' }}>
                {Object.keys(filters).filter(key => filters[key]).length > 0
                  ? `${Object.keys(filters).filter(key => filters[key]).length} active`
                  : 'No filters applied'}
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
          <Button size="small" primary disabled={selectedIds.length === 0}>
            Process Selected ({selectedIds.length})
          </Button>
          <Button size="small">Export All</Button>
          <Button size="small" variant="plain">Reset Filters</Button>
          <Button size="small" variant="plain">Clear Selection</Button>
        </div>
      </div>
    );
  },
};

export const ComprehensiveDataManagement: Story = {
  render: () => {
    const [activeLayer, setActiveLayer] = useState<'react' | 'vanilla' | 'extjs' | 'typescript'>('react');
    const [dataView, setDataView] = useState<'orders' | 'products' | 'customers'>('orders');

    const customersData = [
      { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', orders: 23, totalSpent: 4567.89, joinDate: '2023-01-15', vip: true },
      { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', orders: 45, totalSpent: 8901.23, joinDate: '2022-06-20', vip: true },
      { id: 'CUST-003', name: 'Bob Johnson', email: 'bob@example.com', orders: 12, totalSpent: 1234.56, joinDate: '2023-11-01', vip: false },
      { id: 'CUST-004', name: 'Alice Brown', email: 'alice@example.com', orders: 67, totalSpent: 12345.67, joinDate: '2021-03-10', vip: true },
    ];

    const getDataByView = () => {
      switch (dataView) {
        case 'orders': return ordersData;
        case 'products': return productsData;
        case 'customers': return customersData;
        default: return ordersData;
      }
    };

    const getColumnsByView = () => {
      switch (dataView) {
        case 'orders':
          return [
            { header: 'Order ID', field: 'id', type: 'text' },
            { header: 'Customer', field: 'customer', type: 'text' },
            { header: 'Amount', field: 'amount', type: 'number' },
            { header: 'Status', field: 'status', type: 'text' },
            { header: 'Date', field: 'date', type: 'date' }
          ];
        case 'products':
          return [
            { text: 'Product ID', dataIndex: 'id', xtype: 'gridcolumn' },
            { text: 'Name', dataIndex: 'name', xtype: 'gridcolumn' },
            { text: 'Category', dataIndex: 'category', xtype: 'gridcolumn' },
            { text: 'Price', dataIndex: 'price', xtype: 'numbercolumn' },
            { text: 'Stock', dataIndex: 'stock', xtype: 'numbercolumn' },
            { text: 'Active', dataIndex: 'active', xtype: 'gridcolumn' }
          ];
        case 'customers':
          return [
            {
              key: 'id',
              title: 'Customer ID',
              type: 'text',
              sortable: true,
              filterable: true,
              width: 100
            },
            {
              key: 'name',
              title: 'Name',
              type: 'text',
              sortable: true,
              filterable: true,
              width: 150
            },
            {
              key: 'email',
              title: 'Email',
              type: 'text',
              sortable: true,
              filterable: true,
              width: 200
            },
            {
              key: 'orders',
              title: 'Orders',
              type: 'number',
              sortable: true,
              filterable: true,
              width: 80
            },
            {
              key: 'totalSpent',
              title: 'Total Spent',
              type: 'number',
              sortable: true,
              filterable: true,
              formatter: (value: number) => `$${value.toFixed(2)}`
            },
            {
              key: 'joinDate',
              title: 'Join Date',
              type: 'date',
              sortable: true,
              filterable: true,
              width: 100
            },
            {
              key: 'vip',
              title: 'VIP Status',
              type: 'boolean',
              sortable: true,
              filterable: false,
              formatter: (value: boolean) => value ? '⭐ VIP' : 'Regular'
            }
          ];
        default:
          return [];
      }
    };

    return (
      <div style={{ maxWidth: '1400px' }}>
        <h3>Business Scenario: Enterprise Data Management System</h3>
        <p>Complete data management solution showcasing different table implementation approaches</p>

        {/* Controls */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <strong>Data View:</strong>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button
                variant={dataView === 'orders' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setDataView('orders')}
              >
                Orders ({ordersData.length})
              </Button>
              <Button
                variant={dataView === 'products' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setDataView('products')}
              >
                Products ({productsData.length})
              </Button>
              <Button
                variant={dataView === 'customers' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setDataView('customers')}
              >
                Customers ({customersData.length})
              </Button>
            </div>
          </div>

          <div>
            <strong>Implementation:</strong>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <Button
                variant={activeLayer === 'react' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setActiveLayer('react')}
              >
                React
              </Button>
              <Button
                variant={activeLayer === 'vanilla' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setActiveLayer('vanilla')}
              >
                Vanilla JS
              </Button>
              <Button
                variant={activeLayer === 'extjs' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setActiveLayer('extjs')}
              >
                ExtJS
              </Button>
              <Button
                variant={activeLayer === 'typescript' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setActiveLayer('typescript')}
              >
                TypeScript
              </Button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div style={{
          padding: '8px 12px',
          backgroundColor: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '6px',
          fontSize: "var(--font-size-sm)",
          marginBottom: '16px'
        }}>
          <strong>Current View: </strong>
          <Badge status="info">{dataView.toUpperCase()}</Badge>
          <span style={{ marginLeft: '16px' }}>
            <strong>Implementation: </strong>
            <Badge status="success">{activeLayer.toUpperCase()}</Badge>
          </span>
          <span style={{ marginLeft: '16px' }}>
            <strong>Records: </strong>
            {getDataByView().length}
          </span>
        </div>

        {/* Render appropriate table implementation */}
        <div style={{
          padding: '20px',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#fafafa'
        }}>
          {activeLayer === 'react' && dataView === 'orders' && <ReactImplementation />}
          {activeLayer === 'vanilla' && dataView === 'orders' && <VanillaJSImplementation />}
          {activeLayer === 'extjs' && dataView === 'products' && <ExtJSImplementation />}
          {activeLayer === 'typescript' && dataView === 'customers' && <TypeScriptImplementation />}

          {/* Fallback for other combinations */}
          {activeLayer === 'react' && dataView !== 'orders' && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Text as="p">React DataTable implementation with {getDataByView().length} {dataView}</Text>
            </div>
          )}
          {activeLayer === 'vanilla' && dataView !== 'orders' && (
            <VanillaTableWrapper
              columns={getColumnsByView()}
              data={getDataByView()}
              sortable={true}
              striped={true}
            />
          )}
          {activeLayer === 'extjs' && dataView !== 'products' && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Text as="p">ExtJS Grid implementation with {getDataByView().length} {dataView}</Text>
            </div>
          )}
          {activeLayer === 'typescript' && dataView !== 'customers' && (
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Text as="p">TypeScript Table implementation with {getDataByView().length} {dataView}</Text>
            </div>
          )}
        </div>

        {/* Performance and Use Case Comparison */}
        <div style={{ marginTop: '24px' }}>
          <h4>Implementation Characteristics:</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            <div style={{ padding: '12px', backgroundColor: '#eff6ff', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#1d4ed8' }}>React + Polaris</h5>
              <p style={{ margin: 0, fontSize: "var(--font-size-xs)" }}>
                <strong>Best for:</strong> Modern SPAs, rapid development<br/>
                <strong>Features:</strong> Virtual DOM, component ecosystem<br/>
                <strong>Performance:</strong> Good for medium datasets
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#15803d' }}>Vanilla JS</h5>
              <p style={{ margin: 0, fontSize: "var(--font-size-xs)" }}>
                <strong>Best for:</strong> Lightweight apps, performance<br/>
                <strong>Features:</strong> Direct DOM, minimal overhead<br/>
                <strong>Performance:</strong> Excellent for all sizes
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#faf5ff', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#7c3aed' }}>ExtJS Grid</h5>
              <p style={{ margin: 0, fontSize: "var(--font-size-xs)" }}>
                <strong>Best for:</strong> Enterprise applications<br/>
                <strong>Features:</strong> Rich UI, data stores, plugins<br/>
                <strong>Performance:</strong> Optimized for large datasets
              </p>
            </div>
            <div style={{ padding: '12px', backgroundColor: '#fef2f2', borderRadius: '6px' }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#dc2626' }}>TypeScript</h5>
              <p style={{ margin: 0, fontSize: "var(--font-size-xs)" }}>
                <strong>Best for:</strong> Complex business logic<br/>
                <strong>Features:</strong> Type safety, validation, IDE support<br/>
                <strong>Performance:</strong> Excellent with proper optimization
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};