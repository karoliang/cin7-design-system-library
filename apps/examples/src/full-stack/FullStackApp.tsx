/**
 * Full Stack React Application
 * Coordinates between all layers
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Cin7ThemeProvider, 
  Page, 
  Layout, 
  Card, 
  Tabs,
  Button,
  Badge,
  TextContainer 
} from '@cin7/polaris-adapter';
import enTranslations from '@shopify/polaris/locales/en.json';
import { useAppStore } from './store';
import { EventBus } from './event-bus';

export function FullStackApp() {
  const [selectedTab, setSelectedTab] = useState(0);
  const { theme, setTheme, notifications } = useAppStore();

  // Handle theme toggle
  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Emit theme change event for other layers
    EventBus.emit('theme:changed', { theme: newTheme });
  }, [theme, setTheme]);

  // Listen for events from other layers
  useEffect(() => {
    const handleDataUpdate = (data: any) => {
      console.log('Data updated from another layer:', data);
    };

    EventBus.on('data:updated', handleDataUpdate);
    
    return () => {
      EventBus.off('data:updated', handleDataUpdate);
    };
  }, []);

  const tabs = [
    {
      id: 'overview',
      content: 'Overview',
      accessibilityLabel: 'Overview tab',
      panelID: 'overview-panel',
    },
    {
      id: 'vanilla',
      content: 'Vanilla JS Layer',
      panelID: 'vanilla-panel',
    },
    {
      id: 'extjs',
      content: 'ExtJS Layer',
      panelID: 'extjs-panel',
    },
    {
      id: 'integrated',
      content: 'Integrated View',
      panelID: 'integrated-panel',
    },
  ];

  return (
    <Cin7ThemeProvider i18n={enTranslations} mode={theme}>
      <Page
        title="Cin7 DSL Full Stack Integration"
        subtitle="All layers working together in harmony"
        primaryAction={{
          content: 'Toggle Theme',
          onAction: handleThemeToggle,
        }}
        secondaryActions={[
          {
            content: 'View Documentation',
            external: true,
            url: '/getting-started/overview',
          },
        ]}
      >
        <Layout>
          {notifications.length > 0 && (
            <Layout.Section>
              <Card>
                <Card.Section>
                  <TextContainer>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge status="attention">{notifications.length}</Badge>
                      <span>Active notifications from various layers</span>
                    </div>
                  </TextContainer>
                </Card.Section>
              </Card>
            </Layout.Section>
          )}

          <Layout.Section>
            <Card>
              <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
                <Card.Section>
                  {selectedTab === 0 && <OverviewPanel />}
                  {selectedTab === 1 && <VanillaPanel />}
                  {selectedTab === 2 && <ExtJSPanel />}
                  {selectedTab === 3 && <IntegratedPanel />}
                </Card.Section>
              </Tabs>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Cin7ThemeProvider>
  );
}

// Overview Panel
function OverviewPanel() {
  return (
    <TextContainer>
      <h2>Full Stack Integration Example</h2>
      <p>
        This example demonstrates how all layers of Cin7 DSL work together:
      </p>
      <ul>
        <li><strong>Design Tokens</strong>: Consistent styling across all components</li>
        <li><strong>Vanilla JS</strong>: Lightweight interactions and DOM manipulation</li>
        <li><strong>React + Polaris</strong>: Modern component composition</li>
        <li><strong>ExtJS</strong>: Enterprise data grids and complex forms</li>
        <li><strong>TypeScript SDK</strong>: Clean business logic and state management</li>
      </ul>
      <p>
        Use the tabs above to explore each layer individually, or see them all
        working together in the Integrated View.
      </p>
    </TextContainer>
  );
}

// Vanilla JS Panel
function VanillaPanel() {
  useEffect(() => {
    // Mount vanilla JS component
    const container = document.getElementById('vanilla-container');
    if (container) {
      EventBus.emit('vanilla:mount', { container });
    }
    
    return () => {
      EventBus.emit('vanilla:unmount');
    };
  }, []);

  return (
    <div>
      <TextContainer>
        <h3>Vanilla JavaScript Layer</h3>
        <p>Lightweight DOM manipulation and event handling</p>
      </TextContainer>
      <div id="vanilla-container" style={{ marginTop: '20px' }}></div>
    </div>
  );
}

// ExtJS Panel
function ExtJSPanel() {
  useEffect(() => {
    // Mount ExtJS component
    const container = document.getElementById('extjs-container');
    if (container && (window as any).Ext) {
      EventBus.emit('extjs:mount', { container });
    }
    
    return () => {
      EventBus.emit('extjs:unmount');
    };
  }, []);

  return (
    <div>
      <TextContainer>
        <h3>ExtJS Layer</h3>
        <p>Enterprise data grid with advanced features</p>
      </TextContainer>
      <div id="extjs-container" style={{ marginTop: '20px', height: '400px' }}></div>
    </div>
  );
}

// Integrated Panel
function IntegratedPanel() {
  const [syncEnabled, setSyncEnabled] = useState(true);

  const handleSyncToggle = () => {
    setSyncEnabled(!syncEnabled);
    EventBus.emit('sync:toggle', { enabled: !syncEnabled });
  };

  return (
    <div>
      <TextContainer>
        <h3>Integrated View</h3>
        <p>All layers working together with shared state and events</p>
      </TextContainer>
      
      <div style={{ marginTop: '20px' }}>
        <Button onClick={handleSyncToggle}>
          {syncEnabled ? 'Disable' : 'Enable'} Cross-Layer Sync
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h4>React + TypeScript SDK</h4>
          <div id="integrated-react" style={{ border: '1px solid var(--p-color-border)', padding: '16px', borderRadius: '8px' }}>
            <ReactIntegratedView />
          </div>
        </div>
        
        <div>
          <h4>Vanilla JS + ExtJS</h4>
          <div id="integrated-mixed" style={{ border: '1px solid var(--p-color-border)', padding: '16px', borderRadius: '8px', height: '300px' }}></div>
        </div>
      </div>
    </div>
  );
}

// React integrated view component
function ReactIntegratedView() {
  const { products, addProduct } = useAppStore();
  
  const handleAddProduct = () => {
    const newProduct = {
      name: `Product ${Date.now()}`,
      price: Math.random() * 100,
      stock: Math.floor(Math.random() * 100),
    };
    
    addProduct(newProduct);
    
    // Notify other layers
    EventBus.emit('product:added', newProduct);
  };

  return (
    <div>
      <p>Products in store: <strong>{products.length}</strong></p>
      <Button size="slim" onClick={handleAddProduct}>Add Random Product</Button>
      
      <div style={{ marginTop: '12px' }}>
        {products.slice(-3).map((product, index) => (
          <div key={index} style={{ padding: '4px 0' }}>
            {product.name} - ${product.price.toFixed(2)}
          </div>
        ))}
      </div>
    </div>
  );
}