/**
 * Vanilla JavaScript components for full-stack example
 */

import { $, $$, on, addClass, removeClass, create } from '@cin7/vanilla-js';
import { formatCurrency } from '@cin7/core/utils';
import { EventBus } from './event-bus';

let vanillaContainer: HTMLElement | null = null;
let vanillaProducts: any[] = [];

export function initializeVanillaComponents() {
  // Listen for mount event
  EventBus.on('vanilla:mount', ({ container }) => {
    vanillaContainer = container;
    renderVanillaUI();
  });

  // Listen for unmount event
  EventBus.on('vanilla:unmount', () => {
    if (vanillaContainer) {
      vanillaContainer.innerHTML = '';
      vanillaContainer = null;
    }
  });

  // Listen for product updates
  EventBus.on('store:product:added', (product) => {
    vanillaProducts.push(product);
    if (vanillaContainer) {
      updateProductList();
    }
  });

  // Listen for theme changes
  EventBus.on('theme:changed', ({ theme }) => {
    // Update any vanilla-specific theme elements
    const elements = $$('.vanilla-themed');
    elements.forEach(el => {
      el.setAttribute('data-theme', theme);
    });
  });

  // Mount integrated view components
  EventBus.on('integrated:mount', () => {
    const container = $('#integrated-mixed');
    if (container) {
      renderIntegratedView(container);
    }
  });
}

function renderVanillaUI() {
  if (!vanillaContainer) return;

  vanillaContainer.innerHTML = `
    <div class="vanilla-component vanilla-themed" data-theme="light">
      <div class="vanilla-header">
        <h4>Product Quick Add</h4>
        <button id="vanilla-refresh" class="cin7-button cin7-button--small">
          Refresh
        </button>
      </div>
      
      <div class="vanilla-form">
        <input 
          type="text" 
          id="product-name" 
          class="cin7-input" 
          placeholder="Product name"
        >
        <input 
          type="number" 
          id="product-price" 
          class="cin7-input" 
          placeholder="Price"
          step="0.01"
          min="0"
        >
        <input 
          type="number" 
          id="product-stock" 
          class="cin7-input" 
          placeholder="Stock"
          min="0"
        >
        <button id="add-product" class="cin7-button cin7-button--primary">
          Add Product
        </button>
      </div>
      
      <div id="vanilla-product-list" class="vanilla-list">
        <!-- Products will be rendered here -->
      </div>
    </div>
  `;

  // Set up event handlers
  setupVanillaHandlers();
  
  // Initial render
  updateProductList();
}

function setupVanillaHandlers() {
  // Add product handler
  on($('#add-product')!, 'click', () => {
    const nameInput = $('#product-name') as HTMLInputElement;
    const priceInput = $('#product-price') as HTMLInputElement;
    const stockInput = $('#product-stock') as HTMLInputElement;

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);
    const stock = parseInt(stockInput.value);

    if (name && !isNaN(price) && !isNaN(stock)) {
      // Emit event to add product through store
      EventBus.emit('external:product:add', {
        name,
        price,
        stock,
        category: 'Vanilla Added',
      });

      // Clear inputs
      nameInput.value = '';
      priceInput.value = '';
      stockInput.value = '';
      
      // Show success feedback
      addClass(nameInput, 'success');
      setTimeout(() => removeClass(nameInput, 'success'), 1000);
    }
  });

  // Refresh handler
  on($('#vanilla-refresh')!, 'click', () => {
    // Get latest products from store if available
    if ((window as any).Cin7Store) {
      const state = (window as any).Cin7Store.getState();
      vanillaProducts = [...state.products];
      updateProductList();
    }
  });

  // Enter key support
  $$('.cin7-input').forEach(input => {
    on(input, 'keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        $('#add-product')?.click();
      }
    });
  });
}

function updateProductList() {
  const listContainer = $('#vanilla-product-list');
  if (!listContainer) return;

  if (vanillaProducts.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">No products yet. Add one above!</p>';
    return;
  }

  listContainer.innerHTML = vanillaProducts.slice(-5).reverse().map(product => `
    <div class="vanilla-product-item">
      <div class="product-info">
        <strong>${product.name}</strong>
        <span class="product-meta">
          ${formatCurrency(product.price)} • ${product.stock} units
        </span>
      </div>
      <button 
        class="cin7-button cin7-button--small cin7-button--destructive" 
        onclick="window.deleteVanillaProduct('${product.id}')"
      >
        ×
      </button>
    </div>
  `).join('');
}

// Global function for delete (since it's called from innerHTML)
(window as any).deleteVanillaProduct = (id: string) => {
  vanillaProducts = vanillaProducts.filter(p => p.id !== id);
  updateProductList();
  
  // Emit event to sync with store
  EventBus.emit('external:product:delete', { id });
};

// Integrated view render
function renderIntegratedView(container: HTMLElement) {
  container.innerHTML = `
    <div class="integrated-vanilla-view">
      <div class="stats-grid">
        <div class="stat-card vanilla-themed">
          <h5>Total Products</h5>
          <p id="total-count">0</p>
        </div>
        <div class="stat-card vanilla-themed">
          <h5>Total Value</h5>
          <p id="total-value">$0.00</p>
        </div>
        <div class="stat-card vanilla-themed">
          <h5>Avg Price</h5>
          <p id="avg-price">$0.00</p>
        </div>
      </div>
      <div id="mini-extjs-grid" style="height: 200px; margin-top: 16px;"></div>
    </div>
  `;

  // Update stats
  updateIntegratedStats();
  
  // Create mini ExtJS grid if available
  if ((window as any).Ext) {
    createMiniGrid();
  }
}

function updateIntegratedStats() {
  if ((window as any).Cin7Store) {
    const products = (window as any).Cin7Store.getState().products;
    
    const totalCount = $('#total-count');
    const totalValue = $('#total-value');
    const avgPrice = $('#avg-price');
    
    if (totalCount) totalCount.textContent = products.length.toString();
    
    if (totalValue) {
      const total = products.reduce((sum: number, p: any) => sum + (p.price * p.stock), 0);
      totalValue.textContent = formatCurrency(total);
    }
    
    if (avgPrice) {
      const avg = products.length > 0 
        ? products.reduce((sum: number, p: any) => sum + p.price, 0) / products.length
        : 0;
      avgPrice.textContent = formatCurrency(avg);
    }
  }
}

function createMiniGrid() {
  const Ext = (window as any).Ext;
  
  Ext.create('Ext.grid.Panel', {
    renderTo: 'mini-extjs-grid',
    store: {
      fields: ['name', 'price', 'stock'],
      data: vanillaProducts,
    },
    columns: [
      { text: 'Product', dataIndex: 'name', flex: 1 },
      { text: 'Price', dataIndex: 'price', width: 80, renderer: (v: number) => formatCurrency(v) },
      { text: 'Stock', dataIndex: 'stock', width: 60 },
    ],
    height: 200,
    cls: 'cin7-mini-grid',
  });
}

// Listen for sync updates
EventBus.on('sync:toggle', ({ enabled }) => {
  const syncIndicator = create('div', {
    className: 'sync-indicator',
    textContent: `Sync ${enabled ? 'enabled' : 'disabled'}`,
  });
  
  document.body.appendChild(syncIndicator);
  setTimeout(() => syncIndicator.remove(), 2000);
});