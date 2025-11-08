import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@shopify/polaris';
import React from 'react';
import { getCodeVariants } from '../../../.storybook/blocks/codeVariants';

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Pagination allows users to navigate through large sets of data across multiple pages. It provides controls for moving between pages and shows the current position within the dataset.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hasNext: {
      control: 'boolean',
      description: 'Whether there is a next page available',
    },
    hasPrevious: {
      control: 'boolean',
      description: 'Whether there is a previous page available',
    },
    label: {
      control: 'text',
      description: 'Accessibility label for the pagination component',
    },
    nextTooltip: {
      control: 'text',
      description: 'Tooltip text for next button',
    },
    previousTooltip: {
      control: 'text',
      description: 'Tooltip text for previous button',
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasNext: true,
    hasPrevious: false,
    label: 'Pagination',
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'default'),
  },
};

export const MiddlePage: Story = {
  args: {
    hasNext: true,
    hasPrevious: true,
    label: 'Pagination',
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'middlePage'),
  },
};

export const LastPage: Story = {
  args: {
    hasNext: false,
    hasPrevious: true,
    label: 'Pagination',
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'lastPage'),
  },
};

export const CustomTooltips: Story = {
  args: {
    hasNext: true,
    hasPrevious: true,
    label: 'Customer list pagination',
    nextTooltip: 'Next page of customers',
    previousTooltip: 'Previous page of customers',
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'customTooltips'),
  },
};

export const ProductCatalog: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalProducts = 247;
    const productsPerPage = 20;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const handleNext = () => {
      if (hasNext) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
      if (hasPrevious) setCurrentPage(currentPage - 1);
    };

    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, totalProducts);

    // Mock product data
    const mockProducts = Array.from({ length: productsPerPage }, (_, i) => ({
      id: startIndex + i,
      name: `Product ${startIndex + i}`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      category: ['Electronics', 'Clothing', 'Books', 'Home'][Math.floor(Math.random() * 4)],
    }));

    return (
      <div style={{ width: '800px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 8px 0' }}>Product Catalog</h2>
          <p style={{ margin: 0, color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
            Showing {startIndex}-{endIndex} of {totalProducts} products
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '20px',
          minHeight: '300px'
        }}>
          {mockProducts.map((product) => (
            <div
              key={product.id}
              style={{
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                textAlign: 'center',
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                margin: '0 auto 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: "var(--font-size-2xl)",
              }}>
                📦
              </div>
              <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                {product.name}
              </div>
              <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '8px' }}>
                {product.category}
              </div>
              <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-bold)', color: '#059669' }}>
                {product.price}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
            Page {currentPage} of {totalPages}
          </div>

          <Pagination
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            label={`Product catalog pagination, page ${currentPage} of ${totalPages}`}
            nextTooltip="Next page"
            previousTooltip="Previous page"
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>Go to page:</span>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
              }}
              style={{
                width: '60px',
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: "var(--font-size-sm)",
                textAlign: 'center',
              }}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'productCatalog'),
  },

};

export const DataTable: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortColumn, setSortColumn] = React.useState('id');
    const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

    const totalOrders = 89;
    const rowsPerPage = 10;
    const totalPages = Math.ceil(totalOrders / rowsPerPage);

    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    // Mock order data
    const generateOrders = () => {
      return Array.from({ length: rowsPerPage }, (_, i) => {
        const id = (currentPage - 1) * rowsPerPage + i + 1;
        return {
          id,
          customer: `Customer ${id}`,
          amount: `$${(Math.random() * 1000 + 50).toFixed(2)}`,
          status: ['Pending', 'Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 4)],
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        };
      });
    };

    const [orders, setOrders] = React.useState(generateOrders());

    const handleSort = (column: string) => {
      const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
      setSortColumn(column);
      setSortDirection(newDirection);

      const sorted = [...orders].sort((a, b) => {
        const aValue = a[column as keyof typeof orders[0]];
        const bValue = b[column as keyof typeof orders[0]];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return newDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return newDirection === 'asc'
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      });

      setOrders(sorted);
    };

    const handleNext = () => {
      if (hasNext) {
        setCurrentPage(currentPage + 1);
        setOrders(generateOrders());
      }
    };

    const handlePrevious = () => {
      if (hasPrevious) {
        setCurrentPage(currentPage - 1);
        setOrders(generateOrders());
      }
    };

    const getStatusColor = (status: string) => {
      const colors: Record<string, string> = {
        'Pending': '#f59e0b',
        'Processing': '#3b82f6',
        'Shipped': '#8b5cf6',
        'Delivered': '#10b981',
      };
      return colors[status] || '#6b7280';
    };

    return (
      <div style={{ width: '900px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 8px 0' }}>Order Management</h2>
          <p style={{ margin: 0, color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
            Total {totalOrders} orders • Page {currentPage} of {totalPages}
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                {['ID', 'Customer', 'Amount', 'Status', 'Date'].map((column) => (
                  <th
                    key={column}
                    onClick={() => handleSort(column.toLowerCase())}
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      fontSize: "var(--font-size-sm)",
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#374151',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {column}
                      {sortColumn === column.toLowerCase() && (
                        <span style={{ fontSize: "var(--font-size-xs)", color: '#3b82f6' }}>
                          {sortDirection === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px 16px', fontSize: "var(--font-size-sm)" }}>#{order.id}</td>
                  <td style={{ padding: '12px 16px', fontSize: "var(--font-size-sm)" }}>{order.customer}</td>
                  <td style={{ padding: '12px 16px', fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-semibold)' }}>
                    {order.amount}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: "var(--font-size-xs)",
                        fontWeight: 'var(--font-weight-semibold)',
                        backgroundColor: getStatusColor(order.status),
                        color: 'white',
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
                    {order.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
            Showing {((currentPage - 1) * rowsPerPage) + 1}-{Math.min(currentPage * rowsPerPage, totalOrders)} of {totalOrders} orders
          </div>

          <Pagination
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            label={`Order table pagination, page ${currentPage} of ${totalPages}`}
            nextTooltip="Next page of orders"
            previousTooltip="Previous page of orders"
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                // In a real app, this would update the rows per page
                console.log('Rows per page changed to:', e.target.value);
              }}
              style={{
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: "var(--font-size-sm)",
              }}
            >
              <option value={10}>10 rows</option>
              <option value={25}>25 rows</option>
              <option value={50}>50 rows</option>
              <option value={100}>100 rows</option>
            </select>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'dataTable'),
  },

};

export const SearchResults: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchQuery, setSearchQuery] = React.useState('wireless headphones');
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>(['Electronics', 'Under $100']);

    const totalResults = 156;
    const resultsPerPage = 8;
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const handleNext = () => {
      if (hasNext) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
      if (hasPrevious) setCurrentPage(currentPage - 1);
    };

    // Mock search results
    const generateResults = () => {
      return Array.from({ length: resultsPerPage }, (_, i) => {
        const id = (currentPage - 1) * resultsPerPage + i + 1;
        const rating = (Math.random() * 2 + 3).toFixed(1);
        const reviews = Math.floor(Math.random() * 500 + 10);
        const price = (Math.random() * 200 + 20).toFixed(2);

        return {
          id,
          title: `Wireless Headphones Model ${id}`,
          brand: ['AudioTech', 'SoundMax', 'BassPro', 'ClearSound'][Math.floor(Math.random() * 4)],
          price: `$${price}`,
          rating,
          reviews,
          inStock: Math.random() > 0.2,
        };
      });
    };

    const [results, setResults] = React.useState(generateResults());

    const filters = [
      'Electronics', 'Under $100', 'Over $100', '4+ Stars', 'In Stock', 'Free Shipping', 'Prime'
    ];

    const toggleFilter = (filter: string) => {
      setSelectedFilters(prev =>
        prev.includes(filter)
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      );
    };

    const startResult = (currentPage - 1) * resultsPerPage + 1;
    const endResult = Math.min(currentPage * resultsPerPage, totalResults);

    return (
      <div style={{ width: '900px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 8px 0' }}>Search Results</h2>
          <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
            Showing {startResult}-{endResult} of {totalResults} results for "{searchQuery}"
          </p>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: selectedFilters.includes(filter) ? '1px solid #3b82f6' : '1px solid #d1d5db',
                  backgroundColor: selectedFilters.includes(filter) ? '#3b82f6' : 'white',
                  color: selectedFilters.includes(filter) ? 'white' : '#374151',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}>
          {results.map((result) => (
            <div
              key={result.id}
              style={{
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                display: 'flex',
                gap: '16px',
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: "30px",
                flexShrink: 0,
              }}>
                🎧
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280', marginBottom: '4px' }}>
                  {result.brand}
                </div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                  {result.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#f59e0b', fontSize: "var(--font-size-sm)" }}>⭐</span>
                  <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-semibold)' }}>{result.rating}</span>
                  <span style={{ fontSize: "var(--font-size-xs)", color: '#6b7280' }}>
                    ({result.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: "var(--font-size-lg)", fontWeight: 'var(--font-weight-bold)', color: '#059669' }}>
                    {result.price}
                  </span>
                  <span
                    style={{
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: 'var(--font-weight-semibold)',
                      backgroundColor: result.inStock ? '#10b981' : '#ef4444',
                      color: 'white',
                    }}
                  >
                    {result.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
            {startResult}-{endResult} of {totalResults} results
          </div>

          <Pagination
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            label={`Search results pagination, page ${currentPage} of ${totalPages}`}
            nextTooltip="Next page of results"
            previousTooltip="Previous page of results"
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>Page:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      backgroundColor: pageNum === currentPage ? '#3b82f6' : 'white',
                      color: pageNum === currentPage ? 'white' : '#374151',
                      fontSize: "var(--font-size-xs)",
                      cursor: 'pointer',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'searchResults'),
  },

};

export const PhotoGallery: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [selectedView, setSelectedView] = React.useState<'grid' | 'list'>('grid');

    const totalPhotos = 84;
    const photosPerPage = selectedView === 'grid' ? 12 : 8;
    const totalPages = Math.ceil(totalPhotos / photosPerPage);

    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const handleNext = () => {
      if (hasNext) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
      if (hasPrevious) setCurrentPage(currentPage - 1);
    };

    // Mock photo data
    const generatePhotos = () => {
      return Array.from({ length: photosPerPage }, (_, i) => {
        const id = (currentPage - 1) * photosPerPage + i + 1;
        const categories = ['Nature', 'Architecture', 'People', 'Animals', 'Food', 'Travel'];
        const category = categories[Math.floor(Math.random() * categories.length)];

        return {
          id,
          title: `Photo ${id}`,
          category,
          likes: Math.floor(Math.random() * 1000),
          date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        };
      });
    };

    const [photos, setPhotos] = React.useState(generatePhotos());

    const startPhoto = (currentPage - 1) * photosPerPage + 1;
    const endPhoto = Math.min(currentPage * photosPerPage, totalPhotos);

    return (
      <div style={{ width: '900px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ margin: 0 }}>Photo Gallery</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setSelectedView('grid')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: selectedView === 'grid' ? '1px solid #3b82f6' : '1px solid #d1d5db',
                  backgroundColor: selectedView === 'grid' ? '#3b82f6' : 'white',
                  color: selectedView === 'grid' ? 'white' : '#374151',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer',
                }}
              >
                Grid View
              </button>
              <button
                onClick={() => setSelectedView('list')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  border: selectedView === 'list' ? '1px solid #3b82f6' : '1px solid #d1d5db',
                  backgroundColor: selectedView === 'list' ? '#3b82f6' : 'white',
                  color: selectedView === 'list' ? 'white' : '#374151',
                  fontSize: "var(--font-size-xs)",
                  cursor: 'pointer',
                }}
              >
                List View
              </button>
            </div>
          </div>
          <p style={{ margin: 0, color: '#6b7280', fontSize: "var(--font-size-sm)" }}>
            {startPhoto}-{endPhoto} of {totalPhotos} photos
          </p>
        </div>

        {selectedView === 'grid' ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '20px',
          }}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '150px',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                }}>
                  📷
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: "var(--font-size-sm)", fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                    {photo.title}
                  </div>
                  <div style={{ fontSize: "var(--font-size-xs)", color: '#6b7280', marginBottom: '8px' }}>
                    {photo.category}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: "var(--font-size-xs)" }}>
                    <span>❤️ {photo.likes}</span>
                    <span>{photo.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginBottom: '20px' }}>
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px',
                  backgroundColor: 'white',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  marginBottom: '12px',
                }}
              >
                <div style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: "30px",
                  flexShrink: 0,
                }}>
                  📷
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-semibold)', marginBottom: '4px' }}>
                    {photo.title}
                  </div>
                  <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280', marginBottom: '8px' }}>
                    {photo.category} • {photo.date}
                  </div>
                  <div style={{ fontSize: "var(--font-size-sm)" }}>
                    ❤️ {photo.likes} likes
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          backgroundColor: 'white',
          borderRadius: '6px',
          border: '1px solid #e5e7eb',
        }}>
          <div style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>
            {startPhoto}-{endPhoto} of {totalPhotos} photos
          </div>

          <Pagination
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            label={`Photo gallery pagination, page ${currentPage} of ${totalPages}`}
            nextTooltip="Next page of photos"
            previousTooltip="Previous page of photos"
            onNext={handleNext}
            onPrevious={handlePrevious}
          />

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: "var(--font-size-sm)", color: '#6b7280' }}>Items per page:</span>
            <select
              value={photosPerPage}
              onChange={(e) => {
                // In a real app, this would update the items per page
                console.log('Items per page changed to:', e.target.value);
              }}
              style={{
                padding: '4px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: "var(--font-size-sm)",
              }}
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    codeVariants: getCodeVariants('pagination', 'photoGallery'),
  },

};