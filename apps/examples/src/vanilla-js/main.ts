/**
 * Vanilla JavaScript Example
 * Demonstrates lightweight UI interactions using Cin7 DSL
 */

import { $, $$, on, addClass, removeClass, toggleClass } from '@cin7/vanilla-js';
import { applyTheme, toggleTheme } from '@cin7/design-tokens/themes';
import { formatCurrency, formatDate } from '@cin7/core/utils';

// Sample data
const products = [
  { id: 1, name: 'Wireless Mouse', price: 29.99, stock: 45, lastUpdated: new Date() },
  { id: 2, name: 'Mechanical Keyboard', price: 89.99, stock: 12, lastUpdated: new Date() },
  { id: 3, name: 'USB-C Hub', price: 49.99, stock: 0, lastUpdated: new Date() },
  { id: 4, name: 'Webcam HD', price: 79.99, stock: 23, lastUpdated: new Date() },
];

// Initialize app
function initApp() {
  const app = $('#app');
  if (!app) return;

  // Apply theme
  applyTheme('light');

  // Render app structure
  app.innerHTML = `
    <div class="app-container">
      <header class="app-header">
        <h1>Vanilla JavaScript Example</h1>
        <button id="theme-toggle" class="cin7-button cin7-button--secondary">
          <span class="icon">🌙</span>
          <span class="text">Toggle Theme</span>
        </button>
      </header>

      <main class="app-main">
        <section class="controls">
          <input 
            type="text" 
            id="search-input" 
            class="cin7-input" 
            placeholder="Search products..."
          >
          <select id="sort-select" class="cin7-select">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>
        </section>

        <section class="products">
          <h2>Products</h2>
          <div id="product-grid" class="product-grid">
            <!-- Products will be rendered here -->
          </div>
        </section>

        <section class="stats">
          <div class="stat-card">
            <h3>Total Products</h3>
            <p class="stat-value" id="total-products">0</p>
          </div>
          <div class="stat-card">
            <h3>Total Value</h3>
            <p class="stat-value" id="total-value">$0.00</p>
          </div>
          <div class="stat-card">
            <h3>Out of Stock</h3>
            <p class="stat-value" id="out-of-stock">0</p>
          </div>
        </section>
      </main>
    </div>
  `;

  // Set up event handlers
  setupEventHandlers();
  
  // Initial render
  renderProducts(products);
  updateStats(products);
}

// Set up event handlers
function setupEventHandlers() {
  // Theme toggle
  on($('#theme-toggle')!, 'click', () => {
    toggleTheme();
    const button = $('#theme-toggle')!;
    const icon = button.querySelector('.icon')!;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    icon.textContent = isDark ? '☀️' : '🌙';
  });

  // Search
  const searchInput = $('#search-input') as HTMLInputElement;
  on(searchInput, 'input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = products.filter(p => 
      p.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  });

  // Sort
  const sortSelect = $('#sort-select') as HTMLSelectElement;
  on(sortSelect, 'change', () => {
    const sortBy = sortSelect.value as keyof typeof products[0];
    const sorted = [...products].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return (a[sortBy] as number) - (b[sortBy] as number);
    });
    renderProducts(sorted);
  });
}

// Render products
function renderProducts(productList: typeof products) {
  const grid = $('#product-grid')!;
  
  grid.innerHTML = productList.map(product => `
    <div class="product-card ${product.stock === 0 ? 'out-of-stock' : ''}" data-id="${product.id}">
      <h3>${product.name}</h3>
      <p class="price">${formatCurrency(product.price)}</p>
      <p class="stock">
        Stock: <span class="${product.stock > 20 ? 'high' : product.stock > 0 ? 'low' : 'none'}">
          ${product.stock}
        </span>
      </p>
      <p class="updated">Updated: ${formatDate(product.lastUpdated)}</p>
      <div class="actions">
        <button class="cin7-button cin7-button--small edit-btn" data-id="${product.id}">
          Edit
        </button>
        <button class="cin7-button cin7-button--small cin7-button--destructive delete-btn" data-id="${product.id}">
          Delete
        </button>
      </div>
    </div>
  `).join('');

  // Add event handlers to buttons
  $$('.edit-btn').forEach(btn => {
    on(btn, 'click', (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      handleEdit(Number(id));
    });
  });

  $$('.delete-btn').forEach(btn => {
    on(btn, 'click', (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      handleDelete(Number(id));
    });
  });
}

// Update statistics
function updateStats(productList: typeof products) {
  $('#total-products')!.textContent = productList.length.toString();
  
  const totalValue = productList.reduce((sum, p) => sum + (p.price * p.stock), 0);
  $('#total-value')!.textContent = formatCurrency(totalValue);
  
  const outOfStock = productList.filter(p => p.stock === 0).length;
  $('#out-of-stock')!.textContent = outOfStock.toString();
}

// Handle edit
function handleEdit(id: number) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  // Simple edit dialog
  const newName = prompt('Edit product name:', product.name);
  if (newName && newName !== product.name) {
    product.name = newName;
    product.lastUpdated = new Date();
    renderProducts(products);
    
    // Show success message
    showMessage('Product updated successfully!', 'success');
  }
}

// Handle delete
function handleDelete(id: number) {
  if (confirm('Are you sure you want to delete this product?')) {
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products.splice(index, 1);
      renderProducts(products);
      updateStats(products);
      
      // Show success message
      showMessage('Product deleted successfully!', 'success');
    }
  }
}

// Show message
function showMessage(text: string, type: 'success' | 'error' = 'success') {
  const message = document.createElement('div');
  message.className = `message message--${type}`;
  message.textContent = text;
  document.body.appendChild(message);

  // Animate in
  setTimeout(() => addClass(message, 'show'), 10);

  // Remove after 3 seconds
  setTimeout(() => {
    removeClass(message, 'show');
    setTimeout(() => message.remove(), 300);
  }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}