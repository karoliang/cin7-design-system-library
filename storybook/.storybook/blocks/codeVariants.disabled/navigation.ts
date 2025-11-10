import type { CodeVariant } from './types';

export const topbarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function TopBarExample() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  const handleSearchResultsDismiss = useCallback(() => {
    setSearchResultsVisible(false);
  }, []);

  const handleSearchFieldChange = useCallback((value: string) => {
    setSearchValue(value);
    setSearchResultsVisible(value.length > 0);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        searchResultsVisible={searchResultsVisible}
        onSearchResultsDismiss={handleSearchResultsDismiss}
      />
    </div>
  );
}

export default TopBarExample;`,

    vanilla: `import { createTopBar, createSearchField } from '@cin7/vanilla-js';

// Create search field
const searchField = createSearchField({
  placeholder: 'Search',
  onChange: (value) => {
    console.log('Search:', value);
  }
});

// Create top bar
const topBar = createTopBar({
  showNavigationToggle: true,
  searchField: searchField,
  onNavigationToggle: () => {
    console.log('Navigation toggled');
  }
});

// Add to page
document.getElementById('app').appendChild(topBar);`,

    extjs: `import { PolarisTopBar } from '@cin7/extjs-adapters';

// Create top bar with search
Ext.create('Cin7.component.PolarisTopBar', {
  showNavigationToggle: true,
  searchConfig: {
    placeholder: 'Search',
    listeners: {
      change: function(field, value) {
        console.log('Search:', value);
      }
    }
  },
  listeners: {
    navigationtoggle: function() {
      console.log('Navigation toggled');
    }
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function TopBarExample(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResultsVisible, setSearchResultsVisible] = useState<boolean>(false);

  const handleSearchResultsDismiss = useCallback((): void => {
    setSearchResultsVisible(false);
  }, []);

  const handleSearchFieldChange = useCallback((value: string): void => {
    setSearchValue(value);
    setSearchResultsVisible(value.length > 0);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={handleSearchFieldChange}
      value={searchValue}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        searchResultsVisible={searchResultsVisible}
        onSearchResultsDismiss={handleSearchResultsDismiss}
      />
    </div>
  );
}

export default TopBarExample;`,
  },

  withusermenu: {
    react: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function WithUserMenuExample() {
  const [searchValue, setSearchValue] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleToggleUserMenu = useCallback(() => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={setSearchValue}
      value={searchValue}
      placeholder="Search products, orders, customers..."
    />
  );

  const userMenu = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: 'Account', icon: 'profile' },
            { content: 'Preferences', icon: 'settings' },
            { content: 'Log out', icon: 'logOut' },
          ],
        },
      ]}
      name="John Doe"
      detail="john.doe@example.com"
      initials="JD"
      open={isUserMenuOpen}
      onToggle={handleToggleUserMenu}
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        userMenu={userMenu}
      />
    </div>
  );
}

export default WithUserMenuExample;`,

    vanilla: `import { createTopBar, createUserMenu } from '@cin7/vanilla-js';

// Create user menu
const userMenu = createUserMenu({
  name: 'John Doe',
  detail: 'john.doe@example.com',
  initials: 'JD',
  actions: [
    {
      items: [
        { content: 'Account', icon: 'profile' },
        { content: 'Preferences', icon: 'settings' },
        { content: 'Log out', icon: 'logOut' }
      ]
    }
  ]
});

// Create top bar with user menu
const topBar = createTopBar({
  showNavigationToggle: true,
  userMenu: userMenu
});

document.getElementById('app').appendChild(topBar);`,

    extjs: `import { PolarisTopBar } from '@cin7/extjs-adapters';

// Create top bar with user menu
Ext.create('Cin7.component.PolarisTopBar', {
  showNavigationToggle: true,
  userMenuConfig: {
    name: 'John Doe',
    detail: 'john.doe@example.com',
    initials: 'JD',
    actions: [
      {
        items: [
          { content: 'Account', icon: 'profile' },
          { content: 'Preferences', icon: 'settings' },
          { content: 'Log out', icon: 'logOut' }
        ]
      }
    ]
  },
  renderTo: Ext.getBody()
});`,

    typescript: `import { TopBar } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface MenuAction {
  content: string;
  icon?: string;
}

function WithUserMenuExample(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const handleToggleUserMenu = useCallback((): void => {
    setIsUserMenuOpen((prev) => !prev);
  }, []);

  const searchField = (
    <TopBar.SearchField
      onChange={setSearchValue}
      value={searchValue}
      placeholder="Search products, orders, customers..."
    />
  );

  const userMenu = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: 'Account', icon: 'profile' },
            { content: 'Preferences', icon: 'settings' },
            { content: 'Log out', icon: 'logOut' },
          ],
        },
      ]}
      name="John Doe"
      detail="john.doe@example.com"
      initials="JD"
      open={isUserMenuOpen}
      onToggle={handleToggleUserMenu}
    />
  );

  return (
    <div style={{ height: '60px' }}>
      <TopBar
        showNavigationToggle
        searchField={searchField}
        userMenu={userMenu}
      />
    </div>
  );
}

export default WithUserMenuExample;`,
  }
};

// Feedback - Badge Component Examples

export const fullscreenbarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { FullscreenBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function FullscreenBarExample() {
  const [searchValue, setSearchValue] = useState('');

  const handleNavigationDismiss = useCallback(() => {
    console.log('Navigation dismissed');
  }, []);

  return (
    <FullscreenBar
      logo={{
        width: 124,
        contextualSaveBarSource: 'https://cdn.shopify.com/logo.svg',
        url: '#',
      }}
      searchField={{
        placeholder: 'Search',
        onChange: setSearchValue,
        value: searchValue,
      }}
      onNavigationDismiss={handleNavigationDismiss}
    />
  );
}

export default FullscreenBarExample;`,

    vanilla: `<!-- FullscreenBar Structure -->
<div class="polaris-fullscreen-bar">
  <div class="polaris-fullscreen-bar__logo">
    <a href="#">
      <img src="https://cdn.shopify.com/logo.svg" width="124" alt="Logo" />
    </a>
  </div>
  <div class="polaris-fullscreen-bar__search">
    <input
      type="search"
      class="polaris-text-field__input"
      placeholder="Search"
      id="fullscreen-search"
    />
  </div>
</div>

<script>
import { createSearchField, EventBus } from '@cin7/vanilla-js';

const searchField = document.getElementById('fullscreen-search');
searchField.addEventListener('input', (e) => {
  EventBus.emit('search:changed', { value: e.target.value });
});

// Handle navigation dismiss
document.querySelector('.polaris-fullscreen-bar__back')?.addEventListener('click', () => {
  console.log('Navigation dismissed');
});
</script>`,

    extjs: `// ExtJS FullscreenBar using @cin7/extjs-adapters
Ext.create('Ext.toolbar.Toolbar', {
  dock: 'top',
  height: 60,
  cls: 'polaris-fullscreen-bar',
  items: [
    {
      xtype: 'component',
      html: '<a href="#"><img src="https://cdn.shopify.com/logo.svg" width="124" alt="Logo" /></a>',
      width: 150
    },
    {
      xtype: 'textfield',
      fieldLabel: '',
      emptyText: 'Search',
      flex: 1,
      margin: '0 16',
      listeners: {
        change: function(field, newValue) {
          Ext.GlobalEvents.fireEvent('search:changed', { value: newValue });
        }
      }
    },
    {
      xtype: 'button',
      text: 'Menu',
      menu: [
        { text: 'Profile settings' },
        { text: 'Logout' }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { FullscreenBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface FullscreenBarExampleProps {
  logoUrl?: string;
  logoWidth?: number;
  onSearchChange?: (value: string) => void;
}

function FullscreenBarExample({
  logoUrl = 'https://cdn.shopify.com/logo.svg',
  logoWidth = 124,
  onSearchChange
}: FullscreenBarExampleProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = useCallback((value: string): void => {
    setSearchValue(value);
    onSearchChange?.(value);
  }, [onSearchChange]);

  const handleNavigationDismiss = useCallback((): void => {
    console.log('Navigation dismissed');
  }, []);

  return (
    <FullscreenBar
      logo={{
        width: logoWidth,
        contextualSaveBarSource: logoUrl,
        url: '#',
      }}
      searchField={{
        placeholder: 'Search',
        onChange: handleSearchChange,
        value: searchValue,
      }}
      onNavigationDismiss={handleNavigationDismiss}
    />
  );
}

export default FullscreenBarExample;`,
  }
};

// ContextualSaveBar Component Examples

export const contextualsavebarExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { ContextualSaveBar } from '@shopify/polaris';
import { useState } from 'react';

function ContextualSaveBarExample() {
  const [isDirty, setIsDirty] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setIsDirty(false);
  };

  const handleDiscard = () => {
    setIsDirty(false);
  };

  return (
    <>
      {isDirty && (
        <ContextualSaveBar
          message="Unsaved changes"
          saveAction={{
            content: isSaving ? 'Saving...' : 'Save',
            onAction: handleSave,
            loading: isSaving,
          }}
          discardAction={{
            content: 'Discard',
            onAction: handleDiscard,
          }}
        />
      )}
    </>
  );
}

export default ContextualSaveBarExample;`,

    vanilla: `<!-- ContextualSaveBar Structure -->
<div class="polaris-contextual-save-bar" id="save-bar" style="display: none;">
  <div class="polaris-contextual-save-bar__content">
    <span class="polaris-contextual-save-bar__message">Unsaved changes</span>
    <div class="polaris-contextual-save-bar__actions">
      <button class="polaris-button" id="discard-btn">Discard</button>
      <button class="polaris-button polaris-button--primary" id="save-btn">Save</button>
    </div>
  </div>
</div>

<script>
import { EventBus } from '@cin7/vanilla-js';

let isDirty = false;
const saveBar = document.getElementById('save-bar');
const saveBtn = document.getElementById('save-btn');
const discardBtn = document.getElementById('discard-btn');

// Show/hide save bar based on dirty state
EventBus.on('form:changed', () => {
  isDirty = true;
  saveBar.style.display = 'flex';
});

saveBtn.addEventListener('click', async () => {
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  await new Promise(resolve => setTimeout(resolve, 2000));

  isDirty = false;
  saveBar.style.display = 'none';
  saveBtn.disabled = false;
  saveBtn.textContent = 'Save';

  EventBus.emit('form:saved');
});

discardBtn.addEventListener('click', () => {
  isDirty = false;
  saveBar.style.display = 'none';
  EventBus.emit('form:discarded');
});
</script>`,

    extjs: `// ExtJS ContextualSaveBar using @cin7/extjs-adapters
Ext.create('Ext.toolbar.Toolbar', {
  dock: 'bottom',
  cls: 'polaris-contextual-save-bar',
  hidden: true,
  id: 'contextual-save-bar',
  items: [
    {
      xtype: 'component',
      html: '<span class="polaris-contextual-save-bar__message">Unsaved changes</span>',
      flex: 1
    },
    {
      xtype: 'button',
      text: 'Discard',
      handler: function() {
        const saveBar = Ext.getCmp('contextual-save-bar');
        saveBar.hide();
        Ext.GlobalEvents.fireEvent('form:discarded');
      }
    },
    {
      xtype: 'button',
      text: 'Save',
      cls: 'polaris-button--primary',
      handler: async function(btn) {
        btn.setText('Saving...');
        btn.setDisabled(true);

        // Simulate async save
        await new Promise(resolve => setTimeout(resolve, 2000));

        const saveBar = Ext.getCmp('contextual-save-bar');
        saveBar.hide();
        btn.setText('Save');
        btn.setDisabled(false);

        Ext.GlobalEvents.fireEvent('form:saved');
      }
    }
  ]
});

// Show save bar when form is dirty
Ext.GlobalEvents.on('form:changed', function() {
  const saveBar = Ext.getCmp('contextual-save-bar');
  saveBar.show();
});`,

    typescript: `import { ContextualSaveBar } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface ContextualSaveBarExampleProps {
  message?: string;
  onSave?: () => Promise<void>;
  onDiscard?: () => void;
}

function ContextualSaveBarExample({
  message = 'Unsaved changes',
  onSave,
  onDiscard
}: ContextualSaveBarExampleProps): JSX.Element {
  const [isDirty, setIsDirty] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleSave = useCallback(async (): Promise<void> => {
    setIsSaving(true);

    try {
      await onSave?.();
      setIsDirty(false);
    } finally {
      setIsSaving(false);
    }
  }, [onSave]);

  const handleDiscard = useCallback((): void => {
    onDiscard?.();
    setIsDirty(false);
  }, [onDiscard]);

  if (!isDirty) return null;

  return (
    <ContextualSaveBar
      message={message}
      saveAction={{
        content: isSaving ? 'Saving...' : 'Save',
        onAction: handleSave,
        loading: isSaving,
        disabled: isSaving,
      }}
      discardAction={{
        content: 'Discard',
        onAction: handleDiscard,
        disabled: isSaving,
      }}
    />
  );
}

export default ContextualSaveBarExample;`,
  }
};

// Divider Component Examples

export const frameExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function FrameExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      userMenu={{
        name: 'John Doe',
        detail: 'Store owner',
        initials: 'JD',
        avatar: <Avatar customer size="small" name="John Doe" />,
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          { label: 'Home', icon: HomeIcon, url: '#' },
          { label: 'Orders', icon: OrderIcon, url: '#' },
          { label: 'Products', icon: ProductIcon, url: '#' },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Dashboard">
        <p>Welcome to your dashboard</p>
      </Page>
    </Frame>
  );
}

export default FrameExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle">☰</button>
    <div class="polaris-top-bar__user">John Doe</div>
  </div>
  <nav class="polaris-navigation">
    <ul class="polaris-navigation__items">
      <li><a href="#">Home</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
    </div>
  </main>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on, toggleClass } from '@cin7/vanilla-js';

const navToggle = document.querySelector('.polaris-top-bar__navigation-toggle');
const navigation = document.querySelector('.polaris-navigation');

on(navToggle, 'click', () => {
  toggleClass(navigation, 'is-visible');
});
</script>`,
    extjs: `// ExtJS Frame/Viewport using @cin7/extjs-adapters
Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    items: [{
      text: 'Menu',
      iconCls: 'x-fa fa-bars'
    }, '->', {
      text: 'John Doe',
      iconCls: 'x-fa fa-user'
    }]
  }, {
    region: 'west',
    xtype: 'treepanel',
    title: 'Navigation',
    width: 250,
    collapsible: true,
    rootVisible: false,
    store: Ext.create('Ext.data.TreeStore', {
      root: {
        children: [
          { text: 'Home', iconCls: 'x-fa fa-home', leaf: true },
          { text: 'Orders', iconCls: 'x-fa fa-shopping-cart', leaf: true },
          { text: 'Products', iconCls: 'x-fa fa-box', leaf: true }
        ]
      }
    })
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Dashboard',
    html: '<p>Welcome to your dashboard</p>'
  }]
});`,
    typescript: `import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback, ReactNode } from 'react';

interface NavigationItem {
  label: string;
  icon: any;
  url: string;
  badge?: {
    status: string;
    content: string;
  };
}

interface FrameExampleProps {
  userName?: string;
  userDetail?: string;
  navigationItems?: NavigationItem[];
  children: ReactNode;
}

function FrameExample({
  userName = 'John Doe',
  userDetail = 'Store owner',
  navigationItems = [
    { label: 'Home', icon: HomeIcon, url: '#' },
    { label: 'Orders', icon: OrderIcon, url: '#' },
    { label: 'Products', icon: ProductIcon, url: '#' },
  ],
  children
}: FrameExampleProps): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      userMenu={{
        name: userName,
        detail: userDetail,
        initials: userName.split(' ').map(n => n[0]).join(''),
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section items={navigationItems} />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      {children}
    </Frame>
  );
}

export default FrameExample;`,
  },

  withLogo: {
    react: `import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function FrameWithLogoExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const logo = {
    topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
    contextualSaveBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
    url: '#',
    width: 124,
  };

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      searchField={{
        placeholder: 'Search products, orders, customers...',
      }}
      userMenu={{
        name: 'Sarah Chen',
        detail: 'Store owner',
        initials: 'SC',
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        title="Back End"
        items={[
          { label: 'Dashboard', icon: HomeIcon, url: '#' },
          { label: 'Orders', icon: OrderIcon, url: '#' },
          { label: 'Products', icon: ProductIcon, url: '#' },
        ]}
      />
      <Navigation.Section
        title="Sales Channel"
        items={[
          { label: 'Online Store', icon: HomeIcon, url: '#' },
          { label: 'Point of Sale', icon: ProductIcon, url: '#' },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      logo={logo}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Store Management">
        <p>Frame with custom logo and organized navigation sections.</p>
      </Page>
    </Frame>
  );
}

export default FrameWithLogoExample;`,
    vanilla: `<!-- HTML Structure with Logo -->
<div class="polaris-frame">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle">☰</button>
    <div class="polaris-top-bar__logo">
      <img src="https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg" alt="Store Logo" width="124" />
    </div>
    <div class="polaris-top-bar__user">Sarah Chen</div>
  </div>
  <nav class="polaris-navigation">
    <div class="polaris-navigation__section">
      <h3>Back End</h3>
      <ul class="polaris-navigation__items">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Orders</a></li>
        <li><a href="#">Products</a></li>
      </ul>
    </div>
    <div class="polaris-navigation__section">
      <h3>Sales Channel</h3>
      <ul class="polaris-navigation__items">
        <li><a href="#">Online Store</a></li>
        <li><a href="#">Point of Sale</a></li>
      </ul>
    </div>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <h1>Store Management</h1>
      <p>Frame with custom logo and organized navigation sections.</p>
    </div>
  </main>
</div>

<script>
import { on, toggleClass } from '@cin7/vanilla-js';

const navToggle = document.querySelector('.polaris-top-bar__navigation-toggle');
const navigation = document.querySelector('.polaris-navigation');

on(navToggle, 'click', () => {
  toggleClass(navigation, 'is-visible');
});
</script>`,
    extjs: `// ExtJS Frame with Logo Configuration
Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    items: [{
      text: 'Menu',
      iconCls: 'x-fa fa-bars'
    }, {
      xtype: 'image',
      src: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
      width: 124,
      height: 32
    }, '->', {
      text: 'Sarah Chen',
      iconCls: 'x-fa fa-user'
    }]
  }, {
    region: 'west',
    xtype: 'panel',
    title: 'Navigation',
    width: 250,
    items: [{
      xtype: 'treepanel',
      root: {
        expanded: true,
        children: [{
          text: 'Back End',
          expanded: true,
          children: [
            { text: 'Dashboard', iconCls: 'x-fa fa-home', leaf: true },
            { text: 'Orders', iconCls: 'x-fa fa-shopping-cart', leaf: true },
            { text: 'Products', iconCls: 'x-fa fa-box', leaf: true }
          ]
        }, {
          text: 'Sales Channel',
          expanded: true,
          children: [
            { text: 'Online Store', iconCls: 'x-fa fa-store', leaf: true },
            { text: 'Point of Sale', iconCls: 'x-fa fa-cash-register', leaf: true }
          ]
        }]
      }
    }]
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Store Management',
    html: 'Frame with custom logo and organized navigation sections.',
    padding: 20
  }]
});`,
    typescript: `import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

interface LogoConfig {
  topBarSource: string;
  contextualSaveBarSource: string;
  url: string;
  width: number;
}

interface UserMenuConfig {
  name: string;
  detail: string;
  initials: string;
}

function FrameWithLogoExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);

  const toggleMobileNavigation = useCallback((): void => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const logo: LogoConfig = {
    topBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
    contextualSaveBarSource: 'https://cdn.shopify.com/shopifycloud/web/assets/v1/1c29b0e5f7e2a8a9e3c5e1f5a1c8b7e5.svg',
    url: '#',
    width: 124,
  };

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      logo={logo}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Store Management">
        <p>Frame with custom logo and organized navigation sections.</p>
      </Page>
    </Frame>
  );
}

export default FrameWithLogoExample;`
  },

  withNotifications: {
    react: `import { Frame, TopBar, Navigation, Page, Button, Badge } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon, NotificationIcon, QuestionCircleIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function FrameWithNotificationsExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(5);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      searchField={{
        placeholder: 'Search...',
        focused: false,
      }}
      userMenu={{
        name: 'Admin User',
        detail: 'Super Admin',
        initials: 'AU',
      }}
    />
  );

  const globalActions = [
    {
      icon: NotificationIcon,
      badge: { content: notificationCount, status: 'critical' },
      onClick: () => {
        setNotificationCount(0);
        console.log('Notifications clicked');
      },
    },
    {
      icon: QuestionCircleIcon,
      onClick: () => console.log('Help clicked'),
    },
  ];

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          { label: 'Home', icon: HomeIcon, url: '#' },
          { label: 'Orders', icon: OrderIcon, url: '#' },
          { label: 'Products', icon: ProductIcon, url: '#' },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      globalActions={globalActions}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Notifications Center">
        <div style={{ marginBottom: '16px' }}>
          <p>Frame with global notification actions.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => setNotificationCount(notificationCount + 1)}>
            Add notification
          </Button>
          <Button onClick={() => setNotificationCount(0)}>
            Clear notifications
          </Button>
        </div>
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <p>Current notification count: {notificationCount}</p>
        </div>
      </Page>
    </Frame>
  );
}

export default FrameWithNotificationsExample;`,
    vanilla: `<!-- HTML Structure with Notifications -->
<div class="polaris-frame">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle">☰</button>
    <div class="polaris-top-bar__search">
      <input type="text" placeholder="Search..." />
    </div>
    <div class="polaris-top-bar__global-actions">
      <button class="polaris-top-bar__notification" data-count="5">
        <i class="icon-notification"></i>
        <span class="notification-badge">5</span>
      </button>
      <button class="polaris-top-bar__help">
        <i class="icon-help"></i>
      </button>
    </div>
    <div class="polaris-top-bar__user">Admin User</div>
  </div>
  <nav class="polaris-navigation">
    <ul class="polaris-navigation__items">
      <li><a href="#">Home</a></li>
      <li><a href="#">Orders</a></li>
      <li><a href="#">Products</a></li>
    </ul>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <h1>Notifications Center</h1>
      <p>Frame with global notification actions.</p>
      <div style="margin: 16px 0;">
        <button onclick="addNotification()">Add notification</button>
        <button onclick="clearNotifications()">Clear notifications</button>
      </div>
      <div class="notification-status">
        Current notification count: <span id="notification-count">5</span>
      </div>
    </div>
  </main>
</div>

<script>
import { on, toggleClass, select } from '@cin7/vanilla-js';

let notificationCount = 5;

const navToggle = select('.polaris-top-bar__navigation-toggle');
const navigation = select('.polaris-navigation');
const notificationButton = select('.polaris-top-bar__notification');
const notificationBadge = select('.notification-badge');
const countDisplay = select('#notification-count');

on(navToggle, 'click', () => {
  toggleClass(navigation, 'is-visible');
});

function addNotification() {
  notificationCount++;
  updateNotificationDisplay();
}

function clearNotifications() {
  notificationCount = 0;
  updateNotificationDisplay();
}

function updateNotificationDisplay() {
  notificationBadge.textContent = notificationCount;
  countDisplay.textContent = notificationCount;
  notificationButton.setAttribute('data-count', notificationCount);
}

on(notificationButton, 'click', () => {
  notificationCount = 0;
  updateNotificationDisplay();
});
</script>`,
    extjs: `// ExtJS Frame with Global Actions
Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    items: [{
      text: 'Menu',
      iconCls: 'x-fa fa-bars'
    }, {
      xtype: 'textfield',
      emptyText: 'Search...',
      width: 200
    }, {
      xtype: 'button',
      iconCls: 'x-fa fa-bell',
      text: '5',
      badgeText: '5',
      handler: function() {
        this.setText('0');
        this.setBadgeText('');
      }
    }, {
      xtype: 'button',
      iconCls: 'x-fa fa-question-circle',
      handler: function() {
        console.log('Help clicked');
      }
    }, '->', {
      text: 'Admin User',
      iconCls: 'x-fa fa-user'
    }]
  }, {
    region: 'west',
    xtype: 'panel',
    title: 'Navigation',
    width: 250,
    items: [{
      xtype: 'treepanel',
      root: {
        expanded: true,
        children: [
          { text: 'Home', iconCls: 'x-fa fa-home', leaf: true },
          { text: 'Orders', iconCls: 'x-fa fa-shopping-cart', leaf: true },
          { text: 'Products', iconCls: 'x-fa fa-box', leaf: true }
        ]
      }
    }]
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Notifications Center',
    padding: 20,
    items: [{
      xtype: 'displayfield',
      value: 'Frame with global notification actions.'
    }, {
      xtype: 'button',
      text: 'Add notification',
      handler: function() {
        const bellBtn = this.up('panel').down('button[iconCls=x-fa fa-bell]');
        const currentCount = parseInt(bellBtn.getText()) || 0;
        bellBtn.setText(currentCount + 1);
        bellBtn.setBadgeText(currentCount + 1);
      }
    }, {
      xtype: 'button',
      text: 'Clear notifications',
      margin: '0 0 0 10',
      handler: function() {
        const bellBtn = this.up('panel').down('button[iconCls=x-fa fa-bell]');
        bellBtn.setText('0');
        bellBtn.setBadgeText('');
      }
    }]
  }]
});`,
    typescript: `import { Frame, TopBar, Navigation, Page, Button, Badge } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon, NotificationIcon, QuestionCircleIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

interface GlobalAction {
  icon: React.FunctionComponent;
  badge?: { content: string | number; status: string };
  onClick: () => void;
}

function FrameWithNotificationsExample(): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(5);

  const toggleMobileNavigation = useCallback((): void => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const globalActions: GlobalAction[] = [
    {
      icon: NotificationIcon,
      badge: { content: notificationCount, status: 'critical' },
      onClick: (): void => {
        setNotificationCount(0);
        console.log('Notifications clicked');
      },
    },
    {
      icon: QuestionCircleIcon,
      onClick: (): void => console.log('Help clicked'),
    },
  ];

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      globalActions={globalActions}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Notifications Center">
        <div style={{ marginBottom: '16px' }}>
          <p>Frame with global notification actions.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => setNotificationCount(notificationCount + 1)}>
            Add notification
          </Button>
          <Button onClick={() => setNotificationCount(0)}>
            Clear notifications
          </Button>
        </div>
        <div style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <p>Current notification count: {notificationCount}</p>
        </div>
      </Page>
    </Frame>
  );
}

export default FrameWithNotificationsExample;`
  },

  ecommerceLayout: {
    react: `import { Frame, TopBar, Navigation, Page, Card, Layout, Badge } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon, PersonIcon, ChartHistogramFullIcon, SettingsIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function EcommerceFrameExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const ecommerceItems = [
    {
      label: 'Dashboard',
      icon: HomeIcon,
      url: '#',
      badge: { status: 'success', content: '✓' },
    },
    {
      label: 'Orders',
      icon: OrderIcon,
      url: '#',
      badge: { status: 'attention', content: '8' },
      subNavigationItems: [
        { label: 'All orders', url: '#' },
        { label: 'Pending', url: '#', badge: { status: 'attention', content: '8' } },
        { label: 'Fulfilled', url: '#' },
        { label: 'Returns', url: '#' },
      ],
    },
    {
      label: 'Products',
      icon: ProductIcon,
      url: '#',
      subNavigationItems: [
        { label: 'All products', url: '#' },
        { label: 'Add product', url: '#', badge: { status: 'new', content: '+' } },
        { label: 'Collections', url: '#' },
        { label: 'Categories', url: '#' },
      ],
    },
    {
      label: 'Customers',
      icon: PersonIcon,
      url: '#',
      badge: { status: 'new', content: '23' },
    },
    {
      label: 'Analytics',
      icon: ChartHistogramFullIcon,
      url: '#',
    },
  ];

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      searchField={{
        placeholder: 'Search products, orders, customers...',
        value: searchValue,
        onChange: setSearchValue,
      }}
      userMenu={{
        name: 'Store Manager',
        detail: 'Premium Plan',
        initials: 'SM',
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/orders">
      <Navigation.Section
        items={ecommerceItems}
        title="Store Management"
      />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page
        title="Order Management"
        subtitle="Manage and track your orders"
        breadcrumbs={[{ content: 'Home', url: '#' }]}
        primaryAction={{
          content: 'Create order',
          onAction: () => console.log('Create order'),
        }}
      >
        <Layout>
          <Layout.Section oneThird>
            <Card title="Quick Stats">
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span>Pending Orders</span>
                  <Badge status="attention">8</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span>New Customers</span>
                  <Badge status="success">23</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Revenue</span>
                  <Badge>$12,450</Badge>
                </div>
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <div style={{ padding: '24px' }}>
                <h2>Recent Orders</h2>
                <p>Complete e-commerce layout with comprehensive navigation and badges for pending items.</p>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}

export default EcommerceFrameExample;`,
    vanilla: `<!-- E-commerce Layout HTML -->
<div class="polaris-frame ecommerce-layout">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle">☰</button>
    <div class="polaris-top-bar__search">
      <input type="text" placeholder="Search products, orders, customers..." value="" />
    </div>
    <div class="polaris-top-bar__user">Store Manager</div>
  </div>
  <nav class="polaris-navigation">
    <div class="polaris-navigation__section">
      <h3>Store Management</h3>
      <ul class="polaris-navigation__items">
        <li>
          <a href="#">
            <i class="icon-dashboard"></i>
            <span>Dashboard</span>
            <span class="polaris-badge success">✓</span>
          </a>
        </li>
        <li class="has-subnav">
          <a href="#" class="active">
            <i class="icon-orders"></i>
            <span>Orders</span>
            <span class="polaris-badge attention">8</span>
          </a>
          <ul class="sub-nav">
            <li><a href="#">All orders</a></li>
            <li><a href="#" class="active">Pending <span class="polaris-badge attention">8</span></a></li>
            <li><a href="#">Fulfilled</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </li>
        <li class="has-subnav">
          <a href="#">
            <i class="icon-products"></i>
            <span>Products</span>
          </a>
          <ul class="sub-nav">
            <li><a href="#">All products</a></li>
            <li><a href="#">Add product <span class="polaris-badge new">+</span></a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Categories</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="icon-customers"></i>
            <span>Customers</span>
            <span class="polaris-badge new">23</span>
          </a>
        </li>
      </ul>
    </div>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <div class="polaris-breadcrumbs">
        <a href="#">Home</a> / Order Management
      </div>
      <div class="polaris-page-header">
        <h1>Order Management</h1>
        <p>Manage and track your orders</p>
        <button class="polaris-button primary">Create order</button>
      </div>
      <div class="polaris-layout">
        <div class="polaris-layout__section one-third">
          <div class="polaris-card">
            <h3>Quick Stats</h3>
            <div class="stat-item">
              <span>Pending Orders</span>
              <span class="polaris-badge attention">8</span>
            </div>
            <div class="stat-item">
              <span>New Customers</span>
              <span class="polaris-badge success">23</span>
            </div>
            <div class="stat-item">
              <span>Total Revenue</span>
              <span class="polaris-badge">$12,450</span>
            </div>
          </div>
        </div>
        <div class="polaris-layout__section">
          <div class="polaris-card">
            <h2>Recent Orders</h2>
            <p>Complete e-commerce layout with comprehensive navigation and badges.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<script>
import { on, toggleClass } from '@cin7/vanilla-js';

const navToggle = document.querySelector('.polaris-top-bar__navigation-toggle');
const navigation = document.querySelector('.polaris-navigation');

on(navToggle, 'click', () => {
  toggleClass(navigation, 'is-visible');
});
</script>`,
    extjs: `// ExtJS E-commerce Layout
Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    items: [{
      text: 'Menu',
      iconCls: 'x-fa fa-bars'
    }, {
      xtype: 'textfield',
      emptyText: 'Search products, orders, customers...',
      width: 250
    }, '->', {
      text: 'Store Manager',
      iconCls: 'x-fa fa-user-tie'
    }]
  }, {
    region: 'west',
    xtype: 'panel',
    title: 'Store Management',
    width: 280,
    items: [{
      xtype: 'treepanel',
      root: {
        expanded: true,
        children: [{
          text: 'Dashboard',
          iconCls: 'x-fa fa-tachometer-alt',
          leaf: true,
          glyph: '✓'
        }, {
          text: 'Orders',
          iconCls: 'x-fa fa-shopping-cart',
          expanded: true,
          children: [
            { text: 'All orders', iconCls: 'x-fa fa-list', leaf: true },
            {
              text: 'Pending',
              iconCls: 'x-fa fa-clock',
              leaf: true,
              badgeText: '8'
            },
            { text: 'Fulfilled', iconCls: 'x-fa fa-check-circle', leaf: true },
            { text: 'Returns', iconCls: 'x-fa fa-undo', leaf: true }
          ]
        }, {
          text: 'Products',
          iconCls: 'x-fa fa-box',
          expanded: true,
          children: [
            { text: 'All products', iconCls: 'x-fa fa-list', leaf: true },
            {
              text: 'Add product',
              iconCls: 'x-fa fa-plus',
              leaf: true,
              badgeText: '+'
            },
            { text: 'Collections', iconCls: 'x-fa fa-layer-group', leaf: true },
            { text: 'Categories', iconCls: 'x-fa fa-tags', leaf: true }
          ]
        }, {
          text: 'Customers',
          iconCls: 'x-fa fa-users',
          leaf: true,
          badgeText: '23'
        }]
      }
    }]
  }, {
    region: 'center',
    xtype: 'panel',
    layout: 'vbox',
    items: [{
      xtype: 'container',
      padding: '10 20',
      html: '<div class="breadcrumbs"><a href="#">Home</a> / Order Management</div>'
    }, {
      xtype: 'panel',
      title: 'Order Management',
      padding: 20,
      flex: 1,
      layout: 'hbox',
      items: [{
        xtype: 'panel',
        title: 'Quick Stats',
        width: 300,
        margin: '0 20 0 0',
        items: [{
          xtype: 'displayfield',
          fieldLabel: 'Pending Orders',
          value: '<span class="badge attention">8</span>',
          labelWidth: 120
        }, {
          xtype: 'displayfield',
          fieldLabel: 'New Customers',
          value: '<span class="badge success">23</span>',
          labelWidth: 120
        }, {
          xtype: 'displayfield',
          fieldLabel: 'Total Revenue',
          value: '<span class="badge">$12,450</span>',
          labelWidth: 120
        }]
      }, {
        xtype: 'panel',
        title: 'Recent Orders',
        flex: 1,
        html: 'Complete e-commerce layout with comprehensive navigation and badges.',
        padding: 20
      }]
    }]
  }]
});`,
    typescript: `import { Frame, TopBar, Navigation, Page, Card, Layout, Badge } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon, PersonIcon, ChartHistogramFullIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

interface NavigationItem {
  label: string;
  icon: React.FunctionComponent;
  url: string;
  badge?: { status: string; content: string };
  subNavigationItems?: NavigationItem[];
}

interface EcommerceStats {
  pendingOrders: number;
  newCustomers: number;
  totalRevenue: string;
}

function EcommerceFrameExample(): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const toggleMobileNavigation = useCallback((): void => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const ecommerceItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: HomeIcon,
      url: '#',
      badge: { status: 'success', content: '✓' },
    },
    {
      label: 'Orders',
      icon: OrderIcon,
      url: '#',
      badge: { status: 'attention', content: '8' },
      subNavigationItems: [
        { label: 'All orders', url: '#', icon: HomeIcon },
        { label: 'Pending', url: '#', badge: { status: 'attention', content: '8' }, icon: HomeIcon },
        { label: 'Fulfilled', url: '#', icon: HomeIcon },
        { label: 'Returns', url: '#', icon: HomeIcon },
      ],
    },
    // ... more items
  ];

  const stats: EcommerceStats = {
    pendingOrders: 8,
    newCustomers: 23,
    totalRevenue: '$12,450'
  };

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page
        title="Order Management"
        subtitle="Manage and track your orders"
        breadcrumbs={[{ content: 'Home', url: '#' }]}
        primaryAction={{
          content: 'Create order',
          onAction: () => console.log('Create order'),
        }}
      >
        <Layout>
          <Layout.Section oneThird>
            <Card title="Quick Stats">
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span>Pending Orders</span>
                  <Badge status="attention">{stats.pendingOrders}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span>New Customers</span>
                  <Badge status="success">{stats.newCustomers}</Badge>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Total Revenue</span>
                  <Badge>{stats.totalRevenue}</Badge>
                </div>
              </div>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <div style={{ padding: '24px' }}>
                <h2>Recent Orders</h2>
                <p>Complete e-commerce layout with comprehensive navigation and badges.</p>
              </div>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}

export default EcommerceFrameExample;`
  },

  minimalLayout: {
    react: `import { Frame, TopBar, Navigation, Page, Button } from '@shopify/polaris';
import { HomeIcon, SettingsIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

function MinimalFrameExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const minimalItems = [
    { label: 'Home', icon: HomeIcon, url: '#' },
    { label: 'Settings', icon: SettingsIcon, url: '#' },
  ];

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      userMenu={{
        name: 'User',
        initials: 'U',
      }}
    />
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section items={minimalItems} />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Minimal Layout">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Minimal Frame</h2>
          <p>A simplified Frame with minimal navigation and top bar.</p>
          <p>Perfect for focused applications or simple interfaces.</p>
          <div style={{ marginTop: '24px' }}>
            <Button>Get Started</Button>
          </div>
        </div>
      </Page>
    </Frame>
  );
}

export default MinimalFrameExample;`,
    vanilla: `<!-- Minimal Layout HTML -->
<div class="polaris-frame minimal-layout">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle">☰</button>
    <div class="polaris-top-bar__user">User</div>
  </div>
  <nav class="polaris-navigation">
    <ul class="polaris-navigation__items">
      <li><a href="#"><i class="icon-home"></i> Home</a></li>
      <li><a href="#"><i class="icon-settings"></i> Settings</a></li>
    </ul>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <div style="text-align: center; padding: 40px;">
        <h2>Minimal Frame</h2>
        <p>A simplified Frame with minimal navigation and top bar.</p>
        <p>Perfect for focused applications or simple interfaces.</p>
        <div style="margin-top: 24px;">
          <button class="polaris-button">Get Started</button>
        </div>
      </div>
    </div>
  </main>
</div>

<script>
import { on, toggleClass } from '@cin7/vanilla-js';

const navToggle = document.querySelector('.polaris-top-bar__navigation-toggle');
const navigation = document.querySelector('.polaris-navigation');

on(navToggle, 'click', () => {
  toggleClass(navigation, 'is-visible');
});
</script>`,
    extjs: `// ExtJS Minimal Layout
Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    items: [{
      text: 'Menu',
      iconCls: 'x-fa fa-bars'
    }, '->', {
      text: 'User',
      iconCls: 'x-fa fa-user'
    }]
  }, {
    region: 'west',
    xtype: 'panel',
    title: 'Navigation',
    width: 200,
    items: [{
      xtype: 'menu',
      items: [
        { text: 'Home', iconCls: 'x-fa fa-home', handler: function() { console.log('Home clicked'); } },
        { text: 'Settings', iconCls: 'x-fa fa-cog', handler: function() { console.log('Settings clicked'); } }
      ]
    }]
  }, {
    region: 'center',
    xtype: 'panel',
    title: 'Minimal Layout',
    layout: {
      type: 'vbox',
      pack: 'center',
      align: 'center'
    },
    items: [{
      xtype: 'component',
      html: '<h2>Minimal Frame</h2><p>A simplified Frame with minimal navigation and top bar.</p><p>Perfect for focused applications or simple interfaces.</p>',
      style: 'text-align: center; margin-bottom: 24px;'
    }, {
      xtype: 'button',
      text: 'Get Started',
      scale: 'large',
      handler: function() {
        console.log('Get Started clicked');
      }
    }]
  }]
});`,
    typescript: `import { Frame, TopBar, Navigation, Page, Button } from '@shopify/polaris';
import { HomeIcon, SettingsIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback } from 'react';

interface MinimalNavigationItem {
  label: string;
  icon: React.FunctionComponent;
  url: string;
}

function MinimalFrameExample(): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);

  const toggleMobileNavigation = useCallback((): void => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const minimalItems: MinimalNavigationItem[] = [
    { label: 'Home', icon: HomeIcon, url: '#' },
    { label: 'Settings', icon: SettingsIcon, url: '#' },
  ];

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Minimal Layout">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Minimal Frame</h2>
          <p>A simplified Frame with minimal navigation and top bar.</p>
          <p>Perfect for focused applications or simple interfaces.</p>
          <div style={{ marginTop: '24px' }}>
            <Button>Get Started</Button>
          </div>
        </div>
      </Page>
    </Frame>
  );
}

export default MinimalFrameExample;`
  },

  responsiveBehavior: {
    react: `import { Frame, TopBar, Navigation, Page } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon, PersonIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback, useEffect } from 'react';

function ResponsiveFrameExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle={viewportWidth < 768}
      onNavigationToggle={toggleMobileNavigation}
      searchField={{
        placeholder: 'Search...',
      }}
      userMenu={{
        name: 'Responsive User',
        initials: 'RU',
      }}
    />
  );

  const navigationItems = [
    { label: 'Home', icon: HomeIcon, url: '#' },
    { label: 'Orders', icon: OrderIcon, url: '#' },
    { label: 'Products', icon: ProductIcon, url: '#' },
    { label: 'Customers', icon: PersonIcon, url: '#' },
  ];

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section items={navigationItems} />
    </Navigation>
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Responsive Frame">
        <div style={{ padding: '24px' }}>
          <h2>Responsive Design</h2>
          <p>Current viewport width: {viewportWidth}px</p>
          <p>Resize your browser window to see the responsive behavior:</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Desktop (&gt;1024px): Full navigation sidebar</li>
            <li>Tablet (768-1024px): Collapsible navigation</li>
            <li>Mobile (&lt;768px): Hamburger menu with overlay navigation</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <button onClick={toggleMobileNavigation}>
              Toggle Mobile Navigation
            </button>
          </div>
        </div>
      </Page>
    </Frame>
  );
}

export default ResponsiveFrameExample;`,
    vanilla: `<!-- Responsive Layout HTML -->
<div class="polaris-frame responsive-layout">
  <div class="polaris-top-bar">
    <button class="polaris-top-bar__navigation-toggle mobile-only">☰</button>
    <div class="polaris-top-bar__search">
      <input type="text" placeholder="Search..." />
    </div>
    <div class="polaris-top-bar__user">Responsive User</div>
  </div>
  <nav class="polaris-navigation" id="main-navigation">
    <ul class="polaris-navigation__items">
      <li><a href="#"><i class="icon-home"></i> Home</a></li>
      <li><a href="#"><i class="icon-orders"></i> Orders</a></li>
      <li><a href="#"><i class="icon-products"></i> Products</a></li>
      <li><a href="#"><i class="icon-customers"></i> Customers</a></li>
    </ul>
  </nav>
  <main class="polaris-frame__content">
    <div class="polaris-page">
      <div style="padding: 24px;">
        <h2>Responsive Design</h2>
        <p>Current viewport width: <span id="viewport-width">0</span>px</p>
        <p>Resize your browser window to see the responsive behavior:</p>
        <ul style="margin-left: 20px; margin-top: 8px;">
          <li>Desktop (&gt;1024px): Full navigation sidebar</li>
          <li>Tablet (768-1024px): Collapsible navigation</li>
          <li>Mobile (&lt;768px): Hamburger menu with overlay navigation</li>
        </ul>
        <div style="margin-top: 16px;">
          <button onclick="toggleMobileNavigation()">Toggle Mobile Navigation</button>
        </div>
      </div>
    </div>
  </main>
  <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
</div>

<script>
import { on, toggleClass, select } from '@cin7/vanilla-js';

let viewportWidth = window.innerWidth;
const navToggle = select('.polaris-top-bar__navigation-toggle');
const navigation = select('#main-navigation');
const overlay = select('#mobile-nav-overlay');
const widthDisplay = select('#viewport-width');

function updateViewportWidth() {
  viewportWidth = window.innerWidth;
  widthDisplay.textContent = viewportWidth;

  // Show/hide navigation toggle based on viewport
  if (viewportWidth < 768) {
    navToggle.style.display = 'block';
  } else {
    navToggle.style.display = 'none';
    navigation.classList.remove('mobile-visible');
    overlay.classList.remove('visible');
  }
}

function toggleMobileNavigation() {
  toggleClass(navigation, 'mobile-visible');
  toggleClass(overlay, 'visible');
}

on(navToggle, 'click', toggleMobileNavigation);
on(overlay, 'click', toggleMobileNavigation);
on(window, 'resize', updateViewportWidth);

// Initialize
updateViewportWidth();
</script>

<style>
.responsive-layout .polaris-top-bar__navigation-toggle {
  display: none;
}

.mobile-nav-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.mobile-nav-overlay.visible {
  display: block;
}

@media (max-width: 767px) {
  .responsive-layout .polaris-top-bar__navigation-toggle {
    display: block;
  }

  .responsive-layout .polaris-navigation {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100vh;
    background: white;
    z-index: 1001;
    transition: left 0.3s ease;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  .responsive-layout .polaris-navigation.mobile-visible {
    left: 0;
  }
}
</style>`,
    extjs: `// ExtJS Responsive Layout
Ext.define('ResponsiveViewport', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  initComponent: function() {
    this.items = [{
      region: 'north',
      xtype: 'toolbar',
      items: [{
        text: 'Menu',
        iconCls: 'x-fa fa-bars',
        id: 'nav-toggle-btn',
        hidden: window.innerWidth >= 768
      }, {
        xtype: 'textfield',
        emptyText: 'Search...',
        width: 200
      }, '->', {
        text: 'Responsive User',
        iconCls: 'x-fa fa-user'
      }]
    }, {
      region: 'west',
      xtype: 'panel',
      title: 'Navigation',
      width: 250,
      id: 'navigation-panel',
      items: [{
        xtype: 'menu',
        items: [
          { text: 'Home', iconCls: 'x-fa fa-home' },
          { text: 'Orders', iconCls: 'x-fa fa-shopping-cart' },
          { text: 'Products', iconCls: 'x-fa fa-box' },
          { text: 'Customers', iconCls: 'x-fa fa-users' }
        ]
      }]
    }, {
      region: 'center',
      xtype: 'panel',
      title: 'Responsive Frame',
      padding: 20,
      items: [{
        xtype: 'displayfield',
        fieldLabel: 'Viewport Width',
        value: window.innerWidth + 'px',
        id: 'viewport-display'
      }, {
        xtype: 'component',
        html: '<p><strong>Responsive Behavior:</strong></p>' +
              '<ul><li>Desktop (>1024px): Full navigation sidebar</li>' +
              '<li>Tablet (768-1024px): Collapsible navigation</li>' +
              '<li>Mobile (<768px): Hamburger menu with overlay navigation</li></ul>'
      }, {
        xtype: 'button',
        text: 'Toggle Mobile Navigation',
        handler: function() {
          var navPanel = Ext.getCmp('navigation-panel');
          navPanel.setHidden(!navPanel.getHidden());
        }
      }]
    }];

    this.callParent();
  }
});

// Handle responsive behavior
Ext.onReady(function() {
  Ext.EventManager.onWindowResize(function() {
    var width = window.innerWidth;
    var navToggle = Ext.getCmp('nav-toggle-btn');
    var display = Ext.getCmp('viewport-display');

    if (display) {
      display.setValue(width + 'px');
    }

    if (navToggle) {
      navToggle.setHidden(width >= 768);
    }
  });
});

Ext.create('ResponsiveViewport');`,
    typescript: `import { Frame, TopBar, Navigation, Page } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon, PersonIcon } from '@shopify/polaris-icons';
import React, { useState, useCallback, useEffect } from 'react';

interface ViewportInfo {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

interface NavigationItem {
  label: string;
  icon: React.FunctionComponent;
  url: string;
}

function ResponsiveFrameExample(): JSX.Element {
  const [mobileNavigationActive, setMobileNavigationActive] = useState<boolean>(false);
  const [viewportInfo, setViewportInfo] = useState<ViewportInfo>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  useEffect(() => {
    const handleResize = (): void => {
      const width = window.innerWidth;
      setViewportInfo({
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width <= 1024,
        isDesktop: width > 1024
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileNavigation = useCallback((): void => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const navigationItems: NavigationItem[] = [
    { label: 'Home', icon: HomeIcon, url: '#' },
    { label: 'Orders', icon: OrderIcon, url: '#' },
    { label: 'Products', icon: ProductIcon, url: '#' },
    { label: 'Customers', icon: PersonIcon, url: '#' },
  ];

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigation}
    >
      <Page title="Responsive Frame">
        <div style={{ padding: '24px' }}>
          <h2>Responsive Design</h2>
          <p>Current viewport width: {viewportInfo.width}px</p>
          <p>Device type: {
            viewportInfo.isMobile ? 'Mobile' :
            viewportInfo.isTablet ? 'Tablet' : 'Desktop'
          }</p>
          <p>Resize your browser window to see the responsive behavior:</p>
          <ul style={{ marginLeft: '20px', marginTop: '8px' }}>
            <li>Desktop (&gt;1024px): Full navigation sidebar</li>
            <li>Tablet (768-1024px): Collapsible navigation</li>
            <li>Mobile (&lt;768px): Hamburger menu with overlay navigation</li>
          </ul>
          <div style={{ marginTop: '16px' }}>
            <button onClick={toggleMobileNavigation}>
              Toggle Mobile Navigation
            </button>
          </div>
        </div>
      </Page>
    </Frame>
  );
}

export default ResponsiveFrameExample;`
  }
};

// PageActions Component Examples

export const paginationExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Pagination } from '@shopify/polaris';

function PaginationExample() {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={false}
      label="Pagination"
    />
  );
}

export default PaginationExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button" disabled>Previous</button>
  <button class="polaris-pagination__button">Next</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const nextButton = $('.polaris-pagination__button:last-child');
on(nextButton, 'click', () => {
  console.log('Next page');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar for first page
Ext.create('Ext.toolbar.Paging', {
  displayInfo: true,
  displayMsg: 'Displaying items {0} - {1} of {2}',
  emptyMsg: 'No items to display',
  store: myStore,
  renderTo: Ext.getBody(),
  listeners: {
    beforechange: function(toolbar, page) {
      console.log('Navigating to page:', page);
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';

interface PaginationExampleProps {
  onNext?: () => void;
  onPrevious?: () => void;
}

function PaginationExample({
  onNext,
  onPrevious
}: PaginationExampleProps): JSX.Element {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={false}
      label="Pagination"
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
}

export default PaginationExample;`,
  },

  middlePage: {
    react: `import { Pagination } from '@shopify/polaris';

function MiddlePageExample() {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={true}
      label="Pagination"
    />
  );
}

export default MiddlePageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button">Previous</button>
  <button class="polaris-pagination__button">Next</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const prevButton = $('.polaris-pagination__button:first-child');
const nextButton = $('.polaris-pagination__button:last-child');

on(prevButton, 'click', () => {
  console.log('Previous page');
});

on(nextButton, 'click', () => {
  console.log('Next page');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar for middle page
const store = Ext.create('Ext.data.Store', {
  pageSize: 25,
  currentPage: 5
});

Ext.create('Ext.toolbar.Paging', {
  store: store,
  displayInfo: true,
  renderTo: Ext.getBody(),
  items: [
    '-',
    {
      text: 'Custom Action',
      handler: function() {
        console.log('Current page:', store.currentPage);
      }
    }
  ]
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import { useState } from 'react';

interface MiddlePageExampleProps {
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

function MiddlePageExample({
  currentPage = 5,
  onPageChange
}: MiddlePageExampleProps): JSX.Element {
  const [page, setPage] = useState(currentPage);

  const handleNext = () => {
    const newPage = page + 1;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePrevious = () => {
    const newPage = page - 1;
    setPage(newPage);
    onPageChange?.(newPage);
  };

  return (
    <Pagination
      hasNext={true}
      hasPrevious={true}
      label="Pagination"
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}

export default MiddlePageExample;`,
  },

  lastPage: {
    react: `import { Pagination } from '@shopify/polaris';

function LastPageExample() {
  return (
    <Pagination
      hasNext={false}
      hasPrevious={true}
      label="Pagination"
    />
  );
}

export default LastPageExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button class="polaris-pagination__button">Previous</button>
  <button class="polaris-pagination__button" disabled>Next</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const prevButton = $('.polaris-pagination__button:first-child');
on(prevButton, 'click', () => {
  console.log('Previous page');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar for last page
const store = Ext.create('Ext.data.Store', {
  pageSize: 25,
  totalCount: 250,
  currentPage: 10 // Last page (250 / 25 = 10 pages)
});

Ext.create('Ext.toolbar.Paging', {
  store: store,
  displayInfo: true,
  displayMsg: 'Displaying items {0} - {1} of {2}',
  renderTo: Ext.getBody(),
  listeners: {
    change: function(toolbar, pageData) {
      if (pageData.currentPage === pageData.pageCount) {
        console.log('On last page');
      }
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';

interface LastPageExampleProps {
  onPrevious?: () => void;
  totalPages?: number;
}

function LastPageExample({
  onPrevious,
  totalPages = 10
}: LastPageExampleProps): JSX.Element {
  return (
    <Pagination
      hasNext={false}
      hasPrevious={true}
      label="Pagination"
      onPrevious={onPrevious}
    />
  );
}

export default LastPageExample;`,
  },

  customTooltips: {
    react: `import { Pagination } from '@shopify/polaris';

function CustomTooltipsExample() {
  return (
    <Pagination
      hasNext={true}
      hasPrevious={true}
      label="Customer list pagination"
      nextTooltip="Next page of customers"
      previousTooltip="Previous page of customers"
    />
  );
}

export default CustomTooltipsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="polaris-pagination">
  <button
    class="polaris-pagination__button"
    title="Previous page of customers"
    aria-label="Previous page of customers"
  >
    Previous
  </button>
  <button
    class="polaris-pagination__button"
    title="Next page of customers"
    aria-label="Next page of customers"
  >
    Next
  </button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const prevButton = $('.polaris-pagination__button:first-child');
const nextButton = $('.polaris-pagination__button:last-child');

on(prevButton, 'click', () => {
  console.log('Previous page of customers');
});

on(nextButton, 'click', () => {
  console.log('Next page of customers');
});
</script>`,

    extjs: `// ExtJS Paging Toolbar with custom tooltips
Ext.create('Ext.toolbar.Paging', {
  store: customerStore,
  displayInfo: true,
  displayMsg: 'Displaying customers {0} - {1} of {2}',
  renderTo: Ext.getBody(),
  items: [
    {
      itemId: 'first',
      tooltip: 'First page of customers',
      overflowText: 'First'
    },
    {
      itemId: 'prev',
      tooltip: 'Previous page of customers',
      overflowText: 'Previous'
    },
    '-',
    {
      itemId: 'next',
      tooltip: 'Next page of customers',
      overflowText: 'Next'
    },
    {
      itemId: 'last',
      tooltip: 'Last page of customers',
      overflowText: 'Last'
    }
  ],
  listeners: {
    beforechange: function(toolbar, page) {
      console.log('Navigating to page', page, 'of customer list');
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface CustomTooltipsExampleProps {
  customers?: Customer[];
  customersPerPage?: number;
  onPageChange?: (page: number) => void;
}

function CustomTooltipsExample({
  customers = [],
  customersPerPage = 25,
  onPageChange
}: CustomTooltipsExampleProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const handleNext = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const handlePrevious = () => {
    const newPage = currentPage - 1;
    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  return (
    <Pagination
      hasNext={currentPage < totalPages}
      hasPrevious={currentPage > 1}
      label={\`Customer list pagination, page \${currentPage} of \${totalPages}\`}
      nextTooltip="Next page of customers"
      previousTooltip="Previous page of customers"
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );
}

export default CustomTooltipsExample;`,
  },

  productCatalog: {
    react: `import { Pagination } from '@shopify/polaris';
import React, { useState } from 'react';

function ProductCatalogExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalProducts = 247;
  const productsPerPage = 20;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * productsPerPage + 1;
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div>
      <h2>Product Catalog</h2>
      <p>Showing {startIndex}-{endIndex} of {totalProducts} products</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Product catalog pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <input
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={(e) => {
          const page = parseInt(e.target.value);
          if (page >= 1 && page <= totalPages) setCurrentPage(page);
        }}
      />
    </div>
  );
}

export default ProductCatalogExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="product-catalog">
  <h2>Product Catalog</h2>
  <p id="catalog-info">Showing 1-20 of 247 products</p>

  <div class="polaris-pagination">
    <button id="prev-btn" disabled>Previous</button>
    <button id="next-btn">Next</button>
  </div>

  <input type="number" id="page-input" min="1" max="13" value="1" />
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const state = { totalProducts: 247, productsPerPage: 20, currentPage: 1 };

function updateUI() {
  const start = (state.currentPage - 1) * state.productsPerPage + 1;
  const end = Math.min(state.currentPage * state.productsPerPage, state.totalProducts);
  const totalPages = Math.ceil(state.totalProducts / state.productsPerPage);

  $('#catalog-info').textContent = \`Showing \${start}-\${end} of \${state.totalProducts} products\`;
  $('#prev-btn').disabled = state.currentPage === 1;
  $('#next-btn').disabled = state.currentPage === totalPages;
  $('#page-input').value = state.currentPage;
}

on($('#prev-btn'), 'click', () => {
  if (state.currentPage > 1) { state.currentPage--; updateUI(); }
});

on($('#next-btn'), 'click', () => {
  const totalPages = Math.ceil(state.totalProducts / state.productsPerPage);
  if (state.currentPage < totalPages) { state.currentPage++; updateUI(); }
});

on($('#page-input'), 'change', (e) => {
  const page = parseInt(e.target.value);
  const totalPages = Math.ceil(state.totalProducts / state.productsPerPage);
  if (page >= 1 && page <= totalPages) { state.currentPage = page; updateUI(); }
});

updateUI();
</script>`,

    extjs: `// ExtJS Product Catalog with Jump-to-Page
const store = Ext.create('Ext.data.Store', {
  pageSize: 20,
  proxy: {
    type: 'memory',
    data: { data: Array.from({ length: 247 }, (_, i) => ({ id: i + 1, name: \`Product \${i + 1}\` })), total: 247 },
    reader: { type: 'json', rootProperty: 'data', totalProperty: 'total' }
  },
  autoLoad: true
});

Ext.create('Ext.toolbar.Paging', {
  store: store,
  displayInfo: true,
  displayMsg: 'Showing products {0} - {1} of {2}',
  renderTo: Ext.getBody(),
  items: ['-', 'Jump to:', {
    xtype: 'numberfield',
    width: 60,
    minValue: 1,
    maxValue: Math.ceil(247 / 20),
    value: 1,
    listeners: {
      change: function(field, value) {
        if (value >= 1 && value <= Math.ceil(247 / 20)) store.loadPage(value);
      }
    }
  }]
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface ProductCatalogProps {
  totalProducts?: number;
  productsPerPage?: number;
  onPageChange?: (page: number) => void;
}

function ProductCatalogExample({
  totalProducts = 247,
  productsPerPage = 20,
  onPageChange
}: ProductCatalogProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, onPageChange]);

  const handleJumpToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  }, [totalPages, onPageChange]);

  const startIndex = (currentPage - 1) * productsPerPage + 1;
  const endIndex = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div>
      <h2>Product Catalog</h2>
      <p>Showing {startIndex}-{endIndex} of {totalProducts} products</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Product catalog pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <input
        type="number"
        min="1"
        max={totalPages}
        value={currentPage}
        onChange={(e) => handleJumpToPage(parseInt(e.target.value))}
      />
    </div>
  );
}

export default ProductCatalogExample;`,
  },

  dataTable: {
    react: `import { Pagination } from '@shopify/polaris';
import React, { useState } from 'react';

function DataTableExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalOrders = 89;
  const totalPages = Math.ceil(totalOrders / rowsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalOrders);

  return (
    <div>
      <h2>Order Management</h2>
      <p>Total {totalOrders} orders • Page {currentPage} of {totalPages}</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Order table pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
        <option value={10}>10 rows</option>
        <option value={25}>25 rows</option>
        <option value={50}>50 rows</option>
      </select>

      <p>Showing {startIndex}-{endIndex} of {totalOrders} orders</p>
    </div>
  );
}

export default DataTableExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="order-table">
  <h2>Order Management</h2>
  <p id="table-info">Total 89 orders • Page 1 of 9</p>

  <div class="polaris-pagination">
    <button id="prev-btn" disabled>Previous</button>
    <button id="next-btn">Next</button>
  </div>

  <select id="rows-per-page">
    <option value="10">10 rows</option>
    <option value="25">25 rows</option>
    <option value="50">50 rows</option>
  </select>

  <p id="rows-info">Showing 1-10 of 89 orders</p>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const state = { totalOrders: 89, rowsPerPage: 10, currentPage: 1 };

function updateUI() {
  const totalPages = Math.ceil(state.totalOrders / state.rowsPerPage);
  const start = (state.currentPage - 1) * state.rowsPerPage + 1;
  const end = Math.min(state.currentPage * state.rowsPerPage, state.totalOrders);

  $('#table-info').textContent = \`Total \${state.totalOrders} orders • Page \${state.currentPage} of \${totalPages}\`;
  $('#rows-info').textContent = \`Showing \${start}-\${end} of \${state.totalOrders} orders\`;
  $('#prev-btn').disabled = state.currentPage === 1;
  $('#next-btn').disabled = state.currentPage === totalPages;
}

on($('#prev-btn'), 'click', () => {
  if (state.currentPage > 1) { state.currentPage--; updateUI(); }
});

on($('#next-btn'), 'click', () => {
  if (state.currentPage < Math.ceil(state.totalOrders / state.rowsPerPage)) { state.currentPage++; updateUI(); }
});

on($('#rows-per-page'), 'change', (e) => {
  state.rowsPerPage = parseInt(e.target.value);
  state.currentPage = 1;
  updateUI();
});

updateUI();
</script>`,

    extjs: `// ExtJS Grid with Pagination and Rows Per Page
Ext.define('Order', {
  extend: 'Ext.data.Model',
  fields: ['id', 'customer', 'amount', 'status', 'date']
});

const store = Ext.create('Ext.data.Store', {
  model: 'Order',
  pageSize: 10,
  proxy: {
    type: 'memory',
    data: { data: Array.from({ length: 89 }, (_, i) => ({ id: i + 1, customer: \`Customer \${i + 1}\`, amount: (Math.random() * 1000).toFixed(2), status: 'Pending', date: new Date() })), total: 89 },
    reader: { type: 'json', rootProperty: 'data', totalProperty: 'total' }
  },
  autoLoad: true
});

Ext.create('Ext.grid.Panel', {
  store: store,
  columns: [
    { text: 'ID', dataIndex: 'id', width: 80 },
    { text: 'Customer', dataIndex: 'customer', flex: 1 },
    { text: 'Amount', dataIndex: 'amount', width: 120, renderer: v => '$' + v }
  ],
  dockedItems: [{
    xtype: 'pagingtoolbar',
    dock: 'bottom',
    store: store,
    displayInfo: true,
    displayMsg: 'Showing orders {0} - {1} of {2}',
    items: ['-', 'Rows:', {
      xtype: 'combobox',
      width: 100,
      value: 10,
      store: [10, 25, 50],
      listeners: { select: (c, r) => { store.pageSize = r.get('field1'); store.loadPage(1); } }
    }]
  }],
  renderTo: Ext.getBody(),
  width: 700,
  height: 400
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface DataTableProps {
  totalOrders?: number;
  defaultRowsPerPage?: number;
  onPageChange?: (page: number, rowsPerPage: number) => void;
}

function DataTableExample({
  totalOrders = 89,
  defaultRowsPerPage = 10,
  onPageChange
}: DataTableProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(defaultRowsPerPage);

  const totalPages = Math.ceil(totalOrders / rowsPerPage);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage, rowsPerPage);
    }
  }, [currentPage, totalPages, rowsPerPage, onPageChange]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage, rowsPerPage);
    }
  }, [currentPage, rowsPerPage, onPageChange]);

  const handleRowsPerPageChange = useCallback((newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    onPageChange?.(1, newRowsPerPage);
  }, [onPageChange]);

  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalOrders);

  return (
    <div>
      <h2>Order Management</h2>
      <p>Total {totalOrders} orders • Page {currentPage} of {totalPages}</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Order table pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <select value={rowsPerPage} onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}>
        <option value={10}>10 rows</option>
        <option value={25}>25 rows</option>
        <option value={50}>50 rows</option>
      </select>

      <p>Showing {startIndex}-{endIndex} of {totalOrders} orders</p>
    </div>
  );
}

export default DataTableExample;`,
  },

  searchResults: {
    react: `import { Pagination } from '@shopify/polaris';
import React, { useState } from 'react';

function SearchResultsExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalResults = 156;
  const resultsPerPage = 8;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < Math.min(5, totalPages); i++) {
      let pageNum;
      if (totalPages <= 5) pageNum = i + 1;
      else if (currentPage <= 3) pageNum = i + 1;
      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
      else pageNum = currentPage - 2 + i;
      pages.push(pageNum);
    }
    return pages;
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div>
      <h2>Search Results</h2>
      <p>Showing {startResult}-{endResult} of {totalResults} results</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Search results pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <div>
        {renderPageNumbers().map((num) => (
          <button key={num} onClick={() => setCurrentPage(num)}>{num}</button>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="search-results">
  <h2>Search Results</h2>
  <p id="search-info">Showing 1-8 of 156 results</p>

  <div class="polaris-pagination">
    <button id="prev-btn" disabled>Previous</button>
    <button id="next-btn">Next</button>
  </div>

  <div id="page-numbers"></div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const state = { totalResults: 156, resultsPerPage: 8, currentPage: 1 };

function renderPageNumbers() {
  const totalPages = Math.ceil(state.totalResults / state.resultsPerPage);
  const pages = [];

  for (let i = 0; i < Math.min(5, totalPages); i++) {
    let pageNum;
    if (totalPages <= 5) pageNum = i + 1;
    else if (state.currentPage <= 3) pageNum = i + 1;
    else if (state.currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
    else pageNum = state.currentPage - 2 + i;
    pages.push(pageNum);
  }

  $('#page-numbers').innerHTML = pages.map(page =>
    \`<button class="page-btn \${page === state.currentPage ? 'active' : ''}" data-page="\${page}">\${page}</button>\`
  ).join('');

  document.querySelectorAll('.page-btn').forEach(btn => {
    on(btn, 'click', () => {
      state.currentPage = parseInt(btn.getAttribute('data-page'));
      updateUI();
    });
  });
}

function updateUI() {
  const totalPages = Math.ceil(state.totalResults / state.resultsPerPage);
  const start = (state.currentPage - 1) * state.resultsPerPage + 1;
  const end = Math.min(state.currentPage * state.resultsPerPage, state.totalResults);

  $('#search-info').textContent = \`Showing \${start}-\${end} of \${state.totalResults} results\`;
  $('#prev-btn').disabled = state.currentPage === 1;
  $('#next-btn').disabled = state.currentPage === totalPages;

  renderPageNumbers();
}

on($('#prev-btn'), 'click', () => {
  if (state.currentPage > 1) { state.currentPage--; updateUI(); }
});

on($('#next-btn'), 'click', () => {
  const totalPages = Math.ceil(state.totalResults / state.resultsPerPage);
  if (state.currentPage < totalPages) { state.currentPage++; updateUI(); }
});

updateUI();
</script>`,

    extjs: `// ExtJS Search Results with Page Number Buttons
const store = Ext.create('Ext.data.Store', {
  pageSize: 8,
  proxy: {
    type: 'memory',
    data: { data: Array.from({ length: 156 }, (_, i) => ({ id: i + 1, title: \`Result \${i + 1}\` })), total: 156 },
    reader: { type: 'json', rootProperty: 'data', totalProperty: 'total' }
  },
  autoLoad: true
});

Ext.create('Ext.panel.Panel', {
  title: 'Search Results',
  renderTo: Ext.getBody(),
  width: 700,
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'bottom',
    items: [
      { xtype: 'tbtext', itemId: 'resultsCount', text: '1-8 of 156 results' },
      '->',
      { xtype: 'pagingtoolbar', store: store, displayInfo: false },
      '->',
      { xtype: 'container', itemId: 'pageNumbers' }
    ]
  }],
  listeners: {
    afterrender: function() {
      store.on('load', () => {
        const page = store.currentPage;
        const total = store.getTotalCount();
        const pageSize = store.pageSize;
        this.down('[itemId=resultsCount]').setText(\`\${(page - 1) * pageSize + 1}-\${Math.min(page * pageSize, total)} of \${total} results\`);
      });
    }
  }
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface SearchResultsProps {
  totalResults?: number;
  resultsPerPage?: number;
  onPageChange?: (page: number) => void;
}

function SearchResultsExample({
  totalResults = 156,
  resultsPerPage = 8,
  onPageChange
}: SearchResultsProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, onPageChange]);

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  }, [onPageChange]);

  const renderPageNumbers = useCallback((): number[] => {
    const pages: number[] = [];
    for (let i = 0; i < Math.min(5, totalPages); i++) {
      let pageNum: number;
      if (totalPages <= 5) pageNum = i + 1;
      else if (currentPage <= 3) pageNum = i + 1;
      else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
      else pageNum = currentPage - 2 + i;
      pages.push(pageNum);
    }
    return pages;
  }, [currentPage, totalPages]);

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalResults);

  return (
    <div>
      <h2>Search Results</h2>
      <p>Showing {startResult}-{endResult} of {totalResults} results</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Search results pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <div>
        {renderPageNumbers().map((pageNum) => (
          <button key={pageNum} onClick={() => handlePageClick(pageNum)}>{pageNum}</button>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsExample;`,
  },

  photoGallery: {
    react: `import { Pagination } from '@shopify/polaris';
import React, { useState, useEffect } from 'react';

type ViewMode = 'grid' | 'list';

function PhotoGalleryExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedView, setSelectedView] = useState<ViewMode>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const totalPhotos = 84;
  const photosPerPage = selectedView === 'grid' ? 12 : 8;
  const totalPages = Math.ceil(totalPhotos / photosPerPage);

  useEffect(() => {
    setItemsPerPage(photosPerPage);
  }, [photosPerPage]);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleViewChange = (view: ViewMode) => {
    setSelectedView(view);
    setCurrentPage(1);
  };

  const startPhoto = (currentPage - 1) * photosPerPage + 1;
  const endPhoto = Math.min(currentPage * photosPerPage, totalPhotos);

  return (
    <div>
      <h2>Photo Gallery</h2>
      <button onClick={() => handleViewChange('grid')}>Grid View</button>
      <button onClick={() => handleViewChange('list')}>List View</button>

      <p>{startPhoto}-{endPhoto} of {totalPhotos} photos</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Photo gallery pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
        <option value={8}>8</option>
        <option value={12}>12</option>
        <option value={24}>24</option>
      </select>
    </div>
  );
}

export default PhotoGalleryExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="photo-gallery">
  <h2>Photo Gallery</h2>
  <button id="grid-view" class="active">Grid View</button>
  <button id="list-view">List View</button>

  <p id="gallery-info">1-12 of 84 photos</p>

  <div class="polaris-pagination">
    <button id="prev-btn" disabled>Previous</button>
    <button id="next-btn">Next</button>
  </div>

  <select id="items-select">
    <option value="8">8</option>
    <option value="12" selected>12</option>
    <option value="24">24</option>
  </select>
</div>

<script>
import { $, on, addClass, removeClass } from '@cin7/vanilla-js';

const state = { totalPhotos: 84, itemsPerPage: 12, currentPage: 1, viewMode: 'grid' };

function updateUI() {
  const totalPages = Math.ceil(state.totalPhotos / state.itemsPerPage);
  const start = (state.currentPage - 1) * state.itemsPerPage + 1;
  const end = Math.min(state.currentPage * state.itemsPerPage, state.totalPhotos);

  $('#gallery-info').textContent = \`\${start}-\${end} of \${state.totalPhotos} photos\`;
  $('#prev-btn').disabled = state.currentPage === 1;
  $('#next-btn').disabled = state.currentPage === totalPages;
}

on($('#grid-view'), 'click', () => {
  state.viewMode = 'grid';
  state.itemsPerPage = 12;
  state.currentPage = 1;
  addClass($('#grid-view'), 'active');
  removeClass($('#list-view'), 'active');
  $('#items-select').value = '12';
  updateUI();
});

on($('#list-view'), 'click', () => {
  state.viewMode = 'list';
  state.itemsPerPage = 8;
  state.currentPage = 1;
  addClass($('#list-view'), 'active');
  removeClass($('#grid-view'), 'active');
  $('#items-select').value = '8';
  updateUI();
});

on($('#prev-btn'), 'click', () => {
  if (state.currentPage > 1) { state.currentPage--; updateUI(); }
});

on($('#next-btn'), 'click', () => {
  const totalPages = Math.ceil(state.totalPhotos / state.itemsPerPage);
  if (state.currentPage < totalPages) { state.currentPage++; updateUI(); }
});

on($('#items-select'), 'change', (e) => {
  state.itemsPerPage = parseInt(e.target.value);
  state.currentPage = 1;
  updateUI();
});

updateUI();
</script>`,

    extjs: `// ExtJS Photo Gallery with View Switching
const store = Ext.create('Ext.data.Store', {
  fields: ['id', 'title', 'category'],
  pageSize: 12,
  proxy: {
    type: 'memory',
    data: { data: Array.from({ length: 84 }, (_, i) => ({ id: i + 1, title: \`Photo \${i + 1}\`, category: 'Nature' })), total: 84 },
    reader: { type: 'json', rootProperty: 'data', totalProperty: 'total' }
  },
  autoLoad: true
});

const dataView = Ext.create('Ext.view.View', {
  store: store,
  tpl: '<div class="photo-grid"><tpl for="."><div class="photo-card">{title}</div></tpl></div>',
  itemSelector: 'div.photo-card'
});

Ext.create('Ext.panel.Panel', {
  title: 'Photo Gallery',
  items: [dataView],
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      items: [
        { text: 'Grid View', pressed: true, enableToggle: true, toggleGroup: 'view', handler: () => { store.pageSize = 12; store.loadPage(1); } },
        { text: 'List View', enableToggle: true, toggleGroup: 'view', handler: () => { store.pageSize = 8; store.loadPage(1); } }
      ]
    },
    {
      xtype: 'pagingtoolbar',
      dock: 'bottom',
      store: store,
      displayInfo: true,
      items: ['-', 'Items:', {
        xtype: 'combobox',
        width: 80,
        value: 12,
        store: [8, 12, 24],
        listeners: { select: (c, r) => { store.pageSize = r.get('field1'); store.loadPage(1); } }
      }]
    }
  ],
  renderTo: Ext.getBody(),
  width: 700,
  height: 500
});`,

    typescript: `import { Pagination } from '@shopify/polaris';
import React, { useState, useEffect, useCallback } from 'react';

type ViewMode = 'grid' | 'list';

interface PhotoGalleryProps {
  totalPhotos?: number;
  gridItemsPerPage?: number;
  listItemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onViewChange?: (viewMode: ViewMode) => void;
}

function PhotoGalleryExample({
  totalPhotos = 84,
  gridItemsPerPage = 12,
  listItemsPerPage = 8,
  onPageChange,
  onViewChange
}: PhotoGalleryProps): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedView, setSelectedView] = useState<ViewMode>('grid');
  const [itemsPerPage, setItemsPerPage] = useState<number>(gridItemsPerPage);

  const photosPerPage = selectedView === 'grid' ? gridItemsPerPage : listItemsPerPage;
  const totalPages = Math.ceil(totalPhotos / photosPerPage);

  useEffect(() => {
    setItemsPerPage(photosPerPage);
  }, [photosPerPage]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage);
    }
  }, [currentPage, onPageChange]);

  const handleViewChange = useCallback((view: ViewMode) => {
    setSelectedView(view);
    setCurrentPage(1);
    onViewChange?.(view);
    onPageChange?.(1);
  }, [onViewChange, onPageChange]);

  const startPhoto = (currentPage - 1) * photosPerPage + 1;
  const endPhoto = Math.min(currentPage * photosPerPage, totalPhotos);

  return (
    <div>
      <h2>Photo Gallery</h2>
      <button onClick={() => handleViewChange('grid')}>Grid View</button>
      <button onClick={() => handleViewChange('list')}>List View</button>

      <p>{startPhoto}-{endPhoto} of {totalPhotos} photos</p>

      <Pagination
        hasNext={currentPage < totalPages}
        hasPrevious={currentPage > 1}
        label={\`Photo gallery pagination, page \${currentPage} of \${totalPages}\`}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(parseInt(e.target.value)); setCurrentPage(1); }}>
        <option value={8}>8</option>
        <option value={12}>12</option>
        <option value={24}>24</option>
      </select>
    </div>
  );
}

export default PhotoGalleryExample;`,
  }
};

// Link Component Examples

export const navigationExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Navigation } from '@shopify/polaris';
import React from 'react';

function NavigationExample() {
  const [location, setLocation] = React.useState('/home');

  return (
    <Navigation location={location}>
      <Navigation.Section
        items={[
          {
            url: '/home',
            label: 'Home',
            icon: 'home',
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: 'orders',
            badge: '12',
          },
          {
            url: '/products',
            label: 'Products',
            icon: 'products',
          },
        ]}
      />
    </Navigation>
  );
}

export default NavigationExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="polaris-navigation" id="navigation">
  <div class="polaris-navigation__section">
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/home" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏠</span>
          <span class="polaris-navigation__text">Home</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/orders" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📦</span>
          <span class="polaris-navigation__text">Orders</span>
          <span class="polaris-navigation__badge">12</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/products" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🛍️</span>
          <span class="polaris-navigation__text">Products</span>
        </a>
      </li>
    </ul>
  </div>
</nav>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on } from '@cin7/vanilla-js';

const navigation = {
  currentLocation: '/home',

  init() {
    const links = $('.polaris-navigation__link');

    links.forEach(link => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    });

    this.updateActiveState();
  },

  navigate(url) {
    this.currentLocation = url;
    this.updateActiveState();
    // Handle route change
    console.log('Navigated to:', url);
  },

  updateActiveState() {
    const links = $('.polaris-navigation__link');

    links.forEach(link => {
      const url = link.getAttribute('href');
      if (url === this.currentLocation) {
        link.classList.add('polaris-navigation__link--active');
      } else {
        link.classList.remove('polaris-navigation__link--active');
      }
    });
  }
};

navigation.init();
</script>`,

    extjs: `// ExtJS Navigation Panel using @cin7/extjs-adapters
Ext.define('App.view.Navigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-navigation',

  layout: 'fit',
  width: 240,

  items: [{
    xtype: 'treepanel',
    rootVisible: false,
    store: {
      root: {
        expanded: true,
        children: [
          {
            text: 'Home',
            iconCls: 'fa fa-home',
            leaf: true,
            route: '/home'
          },
          {
            text: 'Orders',
            iconCls: 'fa fa-shopping-cart',
            badge: '12',
            leaf: true,
            route: '/orders'
          },
          {
            text: 'Products',
            iconCls: 'fa fa-box',
            leaf: true,
            route: '/products'
          }
        ]
      }
    },

    listeners: {
      itemclick: function(view, record) {
        const route = record.get('route');
        if (route) {
          console.log('Navigate to:', route);
          // Handle navigation
        }
      }
    }
  }]
});

// Create the navigation panel
const navigation = Ext.create('App.view.Navigation', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Navigation } from '@shopify/polaris';
import React, { useState } from 'react';

interface NavigationItem {
  url: string;
  label: string;
  icon?: string;
  badge?: string;
}

interface NavigationExampleProps {
  items?: NavigationItem[];
  initialLocation?: string;
  onNavigate?: (url: string) => void;
}

function NavigationExample({
  items = [
    { url: '/home', label: 'Home', icon: 'home' },
    { url: '/orders', label: 'Orders', icon: 'orders', badge: '12' },
    { url: '/products', label: 'Products', icon: 'products' },
  ],
  initialLocation = '/home',
  onNavigate
}: NavigationExampleProps): JSX.Element {
  const [location, setLocation] = useState<string>(initialLocation);

  const handleNavigate = (url: string) => {
    setLocation(url);
    onNavigate?.(url);
  };

  return (
    <Navigation location={location}>
      <Navigation.Section
        items={items.map(item => ({
          ...item,
          onClick: () => handleNavigate(item.url)
        }))}
      />
    </Navigation>
  );
}

export default NavigationExample;`,
  },

  nestedNavigation: {
    react: `import { Navigation } from '@shopify/polaris';
import React from 'react';

function NestedNavigationExample() {
  const [location, setLocation] = React.useState('/dashboard');

  return (
    <Navigation location={location}>
      <Navigation.Section
        title="Sales"
        items={[
          {
            url: '/dashboard',
            label: 'Dashboard',
            icon: 'home',
            selected: location.startsWith('/dashboard'),
          },
          {
            url: '/orders',
            label: 'Orders',
            icon: 'orders',
            badge: '24',
            selected: location.startsWith('/orders'),
            subNavigationItems: [
              {
                url: '/orders/all',
                label: 'All Orders',
                selected: location === '/orders/all',
              },
              {
                url: '/orders/fulfillments',
                label: 'Fulfillments',
                selected: location === '/orders/fulfillments',
              },
              {
                url: '/orders/returns',
                label: 'Returns',
                selected: location === '/orders/returns',
                badge: '3',
              },
            ],
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: 'customers',
            selected: location.startsWith('/customers'),
            subNavigationItems: [
              {
                url: '/customers/all',
                label: 'All Customers',
                selected: location === '/customers/all',
              },
              {
                url: '/customers/segments',
                label: 'Segments',
                selected: location === '/customers/segments',
              },
              {
                url: '/customers/groups',
                label: 'Groups',
                selected: location === '/customers/groups',
              },
            ],
          },
        ]}
      />
    </Navigation>
  );
}

export default NestedNavigationExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="polaris-navigation" id="navigation">
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Sales</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/dashboard" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏠</span>
          <span class="polaris-navigation__text">Dashboard</span>
        </a>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/orders" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📦</span>
          <span class="polaris-navigation__text">Orders</span>
          <span class="polaris-navigation__badge">24</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li class="polaris-navigation__subitem">
            <a href="/orders/all" class="polaris-navigation__sublink">All Orders</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/orders/fulfillments" class="polaris-navigation__sublink">Fulfillments</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/orders/returns" class="polaris-navigation__sublink">
              Returns
              <span class="polaris-navigation__badge">3</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/customers" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">👥</span>
          <span class="polaris-navigation__text">Customers</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li class="polaris-navigation__subitem">
            <a href="/customers/all" class="polaris-navigation__sublink">All Customers</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/customers/segments" class="polaris-navigation__sublink">Segments</a>
          </li>
          <li class="polaris-navigation__subitem">
            <a href="/customers/groups" class="polaris-navigation__sublink">Groups</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</nav>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, toggle, slideToggle } from '@cin7/vanilla-js';

const nestedNavigation = {
  currentLocation: '/dashboard',

  init() {
    // Handle main navigation clicks
    const links = $('.polaris-navigation__link');
    links.forEach(link => {
      on(link, 'click', (e) => {
        const parent = link.closest('.polaris-navigation__item--expandable');
        if (parent) {
          e.preventDefault();
          this.toggleSubNav(parent);
        } else {
          e.preventDefault();
          const url = link.getAttribute('href');
          this.navigate(url);
        }
      });
    });

    // Handle sub-navigation clicks
    const subLinks = $('.polaris-navigation__sublink');
    subLinks.forEach(link => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    });

    this.updateActiveState();
  },

  toggleSubNav(item) {
    const sublist = item.querySelector('.polaris-navigation__sublist');
    if (sublist) {
      slideToggle(sublist);
      toggle(item, 'polaris-navigation__item--expanded');
    }
  },

  navigate(url) {
    this.currentLocation = url;
    this.updateActiveState();
    console.log('Navigated to:', url);
  },

  updateActiveState() {
    // Update main links
    const links = $('.polaris-navigation__link');
    links.forEach(link => {
      const url = link.getAttribute('href');
      const parent = link.closest('.polaris-navigation__item');

      if (this.currentLocation.startsWith(url)) {
        link.classList.add('polaris-navigation__link--active');
        if (parent && parent.classList.contains('polaris-navigation__item--expandable')) {
          parent.classList.add('polaris-navigation__item--expanded');
          const sublist = parent.querySelector('.polaris-navigation__sublist');
          if (sublist) sublist.style.display = 'block';
        }
      } else {
        link.classList.remove('polaris-navigation__link--active');
      }
    });

    // Update sub-links
    const subLinks = $('.polaris-navigation__sublink');
    subLinks.forEach(link => {
      const url = link.getAttribute('href');
      if (url === this.currentLocation) {
        link.classList.add('polaris-navigation__sublink--active');
      } else {
        link.classList.remove('polaris-navigation__sublink--active');
      }
    });
  }
};

nestedNavigation.init();
</script>`,

    extjs: `// ExtJS Nested Navigation Tree using @cin7/extjs-adapters
Ext.define('App.view.NestedNavigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-nested-navigation',

  layout: 'fit',
  width: 240,

  items: [{
    xtype: 'treepanel',
    rootVisible: false,
    singleExpand: false,

    store: {
      root: {
        expanded: true,
        children: [
          {
            text: 'Sales',
            iconCls: 'fa fa-chart-line',
            expanded: true,
            children: [
              {
                text: 'Dashboard',
                iconCls: 'fa fa-home',
                leaf: true,
                route: '/dashboard'
              },
              {
                text: 'Orders',
                iconCls: 'fa fa-shopping-cart',
                badge: '24',
                expanded: false,
                children: [
                  {
                    text: 'All Orders',
                    leaf: true,
                    route: '/orders/all'
                  },
                  {
                    text: 'Fulfillments',
                    leaf: true,
                    route: '/orders/fulfillments'
                  },
                  {
                    text: 'Returns',
                    badge: '3',
                    leaf: true,
                    route: '/orders/returns'
                  }
                ]
              },
              {
                text: 'Customers',
                iconCls: 'fa fa-users',
                expanded: false,
                children: [
                  {
                    text: 'All Customers',
                    leaf: true,
                    route: '/customers/all'
                  },
                  {
                    text: 'Segments',
                    leaf: true,
                    route: '/customers/segments'
                  },
                  {
                    text: 'Groups',
                    leaf: true,
                    route: '/customers/groups'
                  }
                ]
              }
            ]
          }
        ]
      }
    },

    viewConfig: {
      getRowClass: function(record) {
        return record.get('badge') ? 'has-badge' : '';
      }
    },

    listeners: {
      itemclick: function(view, record) {
        const route = record.get('route');
        if (route) {
          console.log('Navigate to:', route);
          // Handle navigation and update active state
          view.getSelectionModel().select(record);
        }
      }
    }
  }]
});

// Create the navigation panel
const navigation = Ext.create('App.view.NestedNavigation', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { Navigation } from '@shopify/polaris';
import React, { useState } from 'react';

interface SubNavigationItem {
  url: string;
  label: string;
  badge?: string;
}

interface NavigationItem {
  url: string;
  label: string;
  icon?: string;
  badge?: string;
  subNavigationItems?: SubNavigationItem[];
}

interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

interface NestedNavigationExampleProps {
  sections?: NavigationSection[];
  initialLocation?: string;
  onNavigate?: (url: string) => void;
}

function NestedNavigationExample({
  sections = [
    {
      title: 'Sales',
      items: [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'home',
        },
        {
          url: '/orders',
          label: 'Orders',
          icon: 'orders',
          badge: '24',
          subNavigationItems: [
            { url: '/orders/all', label: 'All Orders' },
            { url: '/orders/fulfillments', label: 'Fulfillments' },
            { url: '/orders/returns', label: 'Returns', badge: '3' },
          ],
        },
        {
          url: '/customers',
          label: 'Customers',
          icon: 'customers',
          subNavigationItems: [
            { url: '/customers/all', label: 'All Customers' },
            { url: '/customers/segments', label: 'Segments' },
            { url: '/customers/groups', label: 'Groups' },
          ],
        },
      ],
    },
  ],
  initialLocation = '/dashboard',
  onNavigate
}: NestedNavigationExampleProps): JSX.Element {
  const [location, setLocation] = useState<string>(initialLocation);

  const handleNavigate = (url: string) => {
    setLocation(url);
    onNavigate?.(url);
  };

  return (
    <Navigation location={location}>
      {sections.map((section, index) => (
        <Navigation.Section
          key={index}
          title={section.title}
          items={section.items.map(item => ({
            ...item,
            selected: location.startsWith(item.url),
            onClick: () => handleNavigate(item.url),
            subNavigationItems: item.subNavigationItems?.map(subItem => ({
              ...subItem,
              selected: location === subItem.url,
              onClick: () => handleNavigate(subItem.url),
            })),
          }))}
        />
      ))}
    </Navigation>
  );
}

export default NestedNavigationExample;`,
  },

  ecommerceNavigation: {
    react: `import { Navigation } from '@shopify/polaris';
import React from 'react';

function EcommerceNavigationExample() {
  const [location, setLocation] = React.useState('/dashboard');

  const handleNavigation = (url: string) => {
    setLocation(url);
  };

  return (
    <Navigation location={location}>
      <Navigation.Section
        title="Online Store"
        items={[
          {
            url: '/dashboard',
            label: 'Dashboard',
            icon: 'home',
            onClick: () => handleNavigation('/dashboard'),
          },
          {
            url: '/products',
            label: 'Products',
            icon: 'products',
            badge: '156',
            onClick: () => handleNavigation('/products'),
            subNavigationItems: [
              {
                url: '/products/all',
                label: 'All products',
                onClick: () => handleNavigation('/products/all'),
              },
              {
                url: '/products/collections',
                label: 'Collections',
                onClick: () => handleNavigation('/products/collections'),
              },
              {
                url: '/products/inventory',
                label: 'Inventory',
                onClick: () => handleNavigation('/products/inventory'),
                badge: '23',
              },
              {
                url: '/products/gift-cards',
                label: 'Gift cards',
                onClick: () => handleNavigation('/products/gift-cards'),
              },
            ],
          },
          {
            url: '/customers',
            label: 'Customers',
            icon: 'customers',
            onClick: () => handleNavigation('/customers'),
            subNavigationItems: [
              {
                url: '/customers/all',
                label: 'All customers',
                onClick: () => handleNavigation('/customers/all'),
              },
              {
                url: '/customers/segments',
                label: 'Segments',
                onClick: () => handleNavigation('/customers/segments'),
              },
              {
                url: '/customers/groups',
                label: 'Groups',
                onClick: () => handleNavigation('/customers/groups'),
              },
            ],
          },
          {
            url: '/analytics',
            label: 'Analytics',
            icon: 'analytics',
            onClick: () => handleNavigation('/analytics'),
            subNavigationItems: [
              {
                url: '/analytics/reports',
                label: 'Reports',
                onClick: () => handleNavigation('/analytics/reports'),
              },
              {
                url: '/analytics/live-view',
                label: 'Live view',
                onClick: () => handleNavigation('/analytics/live-view'),
              },
            ],
          },
        ]}
      />
      <Navigation.Section
        title="Apps"
        items={[
          {
            url: '/apps/marketing',
            label: 'Marketing',
            icon: 'marketing',
            onClick: () => handleNavigation('/apps/marketing'),
          },
          {
            url: '/apps/seo',
            label: 'SEO',
            icon: 'seo',
            onClick: () => handleNavigation('/apps/seo'),
          },
          {
            url: '/apps/discounts',
            label: 'Discounts',
            icon: 'discounts',
            onClick: () => handleNavigation('/apps/discounts'),
            badge: '5',
          },
        ]}
      />
      <Navigation.Section
        title="Settings"
        items={[
          {
            url: '/settings/general',
            label: 'General',
            icon: 'settings',
            onClick: () => handleNavigation('/settings/general'),
          },
          {
            url: '/settings/payment',
            label: 'Payment',
            icon: 'payment',
            onClick: () => handleNavigation('/settings/payment'),
          },
          {
            url: '/settings/shipping',
            label: 'Shipping',
            icon: 'shipping',
            onClick: () => handleNavigation('/settings/shipping'),
          },
        ]}
      />
    </Navigation>
  );
}

export default EcommerceNavigationExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="polaris-navigation" id="ecommerce-navigation">
  <!-- Online Store Section -->
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Online Store</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/dashboard" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏠</span>
          <span class="polaris-navigation__text">Dashboard</span>
        </a>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/products" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🛍️</span>
          <span class="polaris-navigation__text">Products</span>
          <span class="polaris-navigation__badge">156</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li><a href="/products/all" class="polaris-navigation__sublink">All products</a></li>
          <li><a href="/products/collections" class="polaris-navigation__sublink">Collections</a></li>
          <li><a href="/products/inventory" class="polaris-navigation__sublink">Inventory <span class="polaris-navigation__badge">23</span></a></li>
          <li><a href="/products/gift-cards" class="polaris-navigation__sublink">Gift cards</a></li>
        </ul>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/customers" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">👥</span>
          <span class="polaris-navigation__text">Customers</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li><a href="/customers/all" class="polaris-navigation__sublink">All customers</a></li>
          <li><a href="/customers/segments" class="polaris-navigation__sublink">Segments</a></li>
          <li><a href="/customers/groups" class="polaris-navigation__sublink">Groups</a></li>
        </ul>
      </li>
      <li class="polaris-navigation__item polaris-navigation__item--expandable">
        <a href="/analytics" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📊</span>
          <span class="polaris-navigation__text">Analytics</span>
          <span class="polaris-navigation__chevron">▼</span>
        </a>
        <ul class="polaris-navigation__sublist">
          <li><a href="/analytics/reports" class="polaris-navigation__sublink">Reports</a></li>
          <li><a href="/analytics/live-view" class="polaris-navigation__sublink">Live view</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <!-- Apps Section -->
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Apps</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/apps/marketing" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">📣</span>
          <span class="polaris-navigation__text">Marketing</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/apps/seo" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🔍</span>
          <span class="polaris-navigation__text">SEO</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/apps/discounts" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🏷️</span>
          <span class="polaris-navigation__text">Discounts</span>
          <span class="polaris-navigation__badge">5</span>
        </a>
      </li>
    </ul>
  </div>

  <!-- Settings Section -->
  <div class="polaris-navigation__section">
    <h3 class="polaris-navigation__section-heading">Settings</h3>
    <ul class="polaris-navigation__list">
      <li class="polaris-navigation__item">
        <a href="/settings/general" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">⚙️</span>
          <span class="polaris-navigation__text">General</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/settings/payment" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">💳</span>
          <span class="polaris-navigation__text">Payment</span>
        </a>
      </li>
      <li class="polaris-navigation__item">
        <a href="/settings/shipping" class="polaris-navigation__link">
          <span class="polaris-navigation__icon">🚚</span>
          <span class="polaris-navigation__text">Shipping</span>
        </a>
      </li>
    </ul>
  </div>
</nav>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { $, on, toggle, slideToggle } from '@cin7/vanilla-js';

const ecommerceNavigation = {
  currentLocation: '/dashboard',

  init() {
    // Handle all navigation links
    this.attachLinkHandlers();
    this.attachExpandHandlers();
    this.updateActiveState();
  },

  attachLinkHandlers() {
    const links = $('.polaris-navigation__link');
    const subLinks = $('.polaris-navigation__sublink');

    links.forEach(link => {
      on(link, 'click', (e) => {
        const parent = link.closest('.polaris-navigation__item--expandable');
        if (!parent) {
          e.preventDefault();
          const url = link.getAttribute('href');
          this.navigate(url);
        }
      });
    });

    subLinks.forEach(link => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      });
    });
  },

  attachExpandHandlers() {
    const expandableItems = $('.polaris-navigation__item--expandable');

    expandableItems.forEach(item => {
      const link = item.querySelector('.polaris-navigation__link');
      on(link, 'click', (e) => {
        e.preventDefault();
        this.toggleSubNav(item);
      });
    });
  },

  toggleSubNav(item) {
    const sublist = item.querySelector('.polaris-navigation__sublist');
    if (sublist) {
      slideToggle(sublist);
      toggle(item, 'polaris-navigation__item--expanded');
    }
  },

  navigate(url) {
    this.currentLocation = url;
    this.updateActiveState();
    console.log('Navigated to:', url);
    // Emit navigation event
    document.dispatchEvent(new CustomEvent('navigate', { detail: { url } }));
  },

  updateActiveState() {
    // Clear all active states
    $('.polaris-navigation__link').forEach(link => {
      link.classList.remove('polaris-navigation__link--active');
    });
    $('.polaris-navigation__sublink').forEach(link => {
      link.classList.remove('polaris-navigation__sublink--active');
    });

    // Set active state for current location
    const allLinks = [
      ...$('.polaris-navigation__link'),
      ...$('.polaris-navigation__sublink')
    ];

    allLinks.forEach(link => {
      const url = link.getAttribute('href');
      if (url === this.currentLocation) {
        link.classList.add(
          link.classList.contains('polaris-navigation__sublink')
            ? 'polaris-navigation__sublink--active'
            : 'polaris-navigation__link--active'
        );

        // Expand parent if this is a sub-link
        const parent = link.closest('.polaris-navigation__item--expandable');
        if (parent) {
          parent.classList.add('polaris-navigation__item--expanded');
          const sublist = parent.querySelector('.polaris-navigation__sublist');
          if (sublist) sublist.style.display = 'block';
        }
      }
    });
  }
};

ecommerceNavigation.init();
</script>`,

    extjs: `// ExtJS Multi-Section Navigation using @cin7/extjs-adapters
Ext.define('App.view.EcommerceNavigation', {
  extend: 'Ext.panel.Panel',
  xtype: 'app-ecommerce-navigation',

  layout: 'fit',
  width: 280,
  scrollable: true,

  items: [{
    xtype: 'treepanel',
    rootVisible: false,
    singleExpand: false,

    store: {
      root: {
        expanded: true,
        children: [
          {
            text: 'Online Store',
            iconCls: 'fa fa-store',
            expanded: true,
            selectable: false,
            children: [
              {
                text: 'Dashboard',
                iconCls: 'fa fa-home',
                leaf: true,
                route: '/dashboard'
              },
              {
                text: 'Products',
                iconCls: 'fa fa-box',
                badge: '156',
                expanded: false,
                children: [
                  { text: 'All products', leaf: true, route: '/products/all' },
                  { text: 'Collections', leaf: true, route: '/products/collections' },
                  { text: 'Inventory', badge: '23', leaf: true, route: '/products/inventory' },
                  { text: 'Gift cards', leaf: true, route: '/products/gift-cards' }
                ]
              },
              {
                text: 'Customers',
                iconCls: 'fa fa-users',
                expanded: false,
                children: [
                  { text: 'All customers', leaf: true, route: '/customers/all' },
                  { text: 'Segments', leaf: true, route: '/customers/segments' },
                  { text: 'Groups', leaf: true, route: '/customers/groups' }
                ]
              },
              {
                text: 'Analytics',
                iconCls: 'fa fa-chart-line',
                expanded: false,
                children: [
                  { text: 'Reports', leaf: true, route: '/analytics/reports' },
                  { text: 'Live view', leaf: true, route: '/analytics/live-view' }
                ]
              }
            ]
          },
          {
            text: 'Apps',
            iconCls: 'fa fa-th',
            expanded: true,
            selectable: false,
            children: [
              {
                text: 'Marketing',
                iconCls: 'fa fa-bullhorn',
                leaf: true,
                route: '/apps/marketing'
              },
              {
                text: 'SEO',
                iconCls: 'fa fa-search',
                leaf: true,
                route: '/apps/seo'
              },
              {
                text: 'Discounts',
                iconCls: 'fa fa-tag',
                badge: '5',
                leaf: true,
                route: '/apps/discounts'
              }
            ]
          },
          {
            text: 'Settings',
            iconCls: 'fa fa-cog',
            expanded: true,
            selectable: false,
            children: [
              {
                text: 'General',
                iconCls: 'fa fa-cog',
                leaf: true,
                route: '/settings/general'
              },
              {
                text: 'Payment',
                iconCls: 'fa fa-credit-card',
                leaf: true,
                route: '/settings/payment'
              },
              {
                text: 'Shipping',
                iconCls: 'fa fa-truck',
                leaf: true,
                route: '/settings/shipping'
              }
            ]
          }
        ]
      }
    },

    viewConfig: {
      getRowClass: function(record) {
        const classes = [];
        if (record.get('badge')) classes.push('has-badge');
        if (!record.get('selectable') && record.get('selectable') !== undefined) {
          classes.push('section-header');
        }
        return classes.join(' ');
      }
    },

    listeners: {
      itemclick: function(view, record) {
        // Don't navigate on section headers
        if (record.get('selectable') === false) {
          return;
        }

        const route = record.get('route');
        if (route) {
          console.log('Navigate to:', route);
          view.getSelectionModel().select(record);
          // Emit navigation event
          Ext.GlobalEvents.fireEvent('navigate', route);
        }
      }
    }
  }],

  // Custom renderer for badges
  initComponent: function() {
    this.callParent(arguments);

    const tree = this.down('treepanel');
    tree.columns = [{
      xtype: 'treecolumn',
      dataIndex: 'text',
      flex: 1,
      renderer: function(value, metaData, record) {
        const badge = record.get('badge');
        if (badge) {
          return value + ' <span class="nav-badge">' + badge + '</span>';
        }
        return value;
      }
    }];
  }
});

// Create the navigation panel
const navigation = Ext.create('App.view.EcommerceNavigation', {
  renderTo: Ext.getBody()
});

// Listen for navigation events
Ext.GlobalEvents.on('navigate', function(route) {
  console.log('Global navigation event:', route);
  // Handle route changes in your application
});`,

    typescript: `import { Navigation } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface SubNavigationItem {
  url: string;
  label: string;
  badge?: string;
}

interface NavigationItem {
  url: string;
  label: string;
  icon?: string;
  badge?: string;
  subNavigationItems?: SubNavigationItem[];
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface EcommerceNavigationExampleProps {
  onNavigate?: (url: string) => void;
  initialLocation?: string;
}

function EcommerceNavigationExample({
  onNavigate,
  initialLocation = '/dashboard'
}: EcommerceNavigationExampleProps): JSX.Element {
  const [location, setLocation] = useState<string>(initialLocation);

  const handleNavigation = useCallback((url: string) => {
    setLocation(url);
    onNavigate?.(url);
  }, [onNavigate]);

  const sections: NavigationSection[] = [
    {
      title: 'Online Store',
      items: [
        {
          url: '/dashboard',
          label: 'Dashboard',
          icon: 'home',
        },
        {
          url: '/products',
          label: 'Products',
          icon: 'products',
          badge: '156',
          subNavigationItems: [
            { url: '/products/all', label: 'All products' },
            { url: '/products/collections', label: 'Collections' },
            { url: '/products/inventory', label: 'Inventory', badge: '23' },
            { url: '/products/gift-cards', label: 'Gift cards' },
          ],
        },
        {
          url: '/customers',
          label: 'Customers',
          icon: 'customers',
          subNavigationItems: [
            { url: '/customers/all', label: 'All customers' },
            { url: '/customers/segments', label: 'Segments' },
            { url: '/customers/groups', label: 'Groups' },
          ],
        },
        {
          url: '/analytics',
          label: 'Analytics',
          icon: 'analytics',
          subNavigationItems: [
            { url: '/analytics/reports', label: 'Reports' },
            { url: '/analytics/live-view', label: 'Live view' },
          ],
        },
      ],
    },
    {
      title: 'Apps',
      items: [
        {
          url: '/apps/marketing',
          label: 'Marketing',
          icon: 'marketing',
        },
        {
          url: '/apps/seo',
          label: 'SEO',
          icon: 'seo',
        },
        {
          url: '/apps/discounts',
          label: 'Discounts',
          icon: 'discounts',
          badge: '5',
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          url: '/settings/general',
          label: 'General',
          icon: 'settings',
        },
        {
          url: '/settings/payment',
          label: 'Payment',
          icon: 'payment',
        },
        {
          url: '/settings/shipping',
          label: 'Shipping',
          icon: 'shipping',
        },
      ],
    },
  ];

  return (
    <Navigation location={location}>
      {sections.map((section, sectionIndex) => (
        <Navigation.Section
          key={sectionIndex}
          title={section.title}
          items={section.items.map(item => ({
            ...item,
            onClick: () => handleNavigation(item.url),
            subNavigationItems: item.subNavigationItems?.map(subItem => ({
              ...subItem,
              onClick: () => handleNavigation(subItem.url),
            })),
          }))}
        />
      ))}
    </Navigation>
  );
}

export default EcommerceNavigationExample;`,
  }
};


export const tabsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function TabsExample() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'all', content: 'All' },
    { id: 'active', content: 'Active' },
    { id: 'archived', content: 'Archived' },
  ];

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

export default TabsExample;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const tabsContainer = $('#tabs-container');
const tabs = [
  { id: 'all', content: 'All' },
  { id: 'active', content: 'Active' },
  { id: 'archived', content: 'Archived' }
];

let selectedIndex = 0;

function renderTabs() {
  tabsContainer.innerHTML = tabs.map((tab, index) =>
    \`<button
      class="tab \${index === selectedIndex ? 'selected' : ''}"
      data-index="\${index}"
    >
      \${tab.content}
    </button>\`
  ).join('');

  on(tabsContainer, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  items: [{
    title: 'All',
    itemId: 'all',
    html: 'All items content'
  }, {
    title: 'Active',
    itemId: 'active',
    html: 'Active items content'
  }, {
    title: 'Archived',
    itemId: 'archived',
    html: 'Archived items content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
}

interface TabsExampleProps {
  onTabChange?: (index: number, tab: Tab) => void;
}

function TabsExample({ onTabChange }: TabsExampleProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const tabs: Tab[] = [
    { id: 'all', content: 'All' },
    { id: 'active', content: 'Active' },
    { id: 'archived', content: 'Archived' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}

export default TabsExample;`,
  },
  withBadges: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function TabsWithBadges() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'all', content: 'All', badge: '24' },
    { id: 'unread', content: 'Unread', badge: '5' },
    { id: 'flagged', content: 'Flagged', badge: '12' },
    { id: 'drafts', content: 'Drafts' },
  ];

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

export default TabsWithBadges;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const tabsContainer = $('#tabs-container');
const tabs = [
  { id: 'all', content: 'All', badge: '24' },
  { id: 'unread', content: 'Unread', badge: '5' },
  { id: 'flagged', content: 'Flagged', badge: '12' },
  { id: 'drafts', content: 'Drafts' }
];

let selectedIndex = 0;

function renderTabs() {
  tabsContainer.innerHTML = tabs.map((tab, index) =>
    \`<button
      class="tab \${index === selectedIndex ? 'selected' : ''}"
      data-index="\${index}"
    >
      \${tab.content}
      \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
    </button>\`
  ).join('');

  on(tabsContainer, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.closest('.tab').dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  items: [{
    title: 'All <span class="badge">24</span>',
    itemId: 'all',
    html: 'All items content'
  }, {
    title: 'Unread <span class="badge">5</span>',
    itemId: 'unread',
    html: 'Unread items content'
  }, {
    title: 'Flagged <span class="badge">12</span>',
    itemId: 'flagged',
    html: 'Flagged items content'
  }, {
    title: 'Drafts',
    itemId: 'drafts',
    html: 'Drafts content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface TabsWithBadgesProps {
  initialTab?: number;
  onTabChange?: (index: number, tab: Tab) => void;
}

function TabsWithBadges({ initialTab = 0, onTabChange }: TabsWithBadgesProps): JSX.Element {
  const [selected, setSelected] = useState<number>(initialTab);

  const tabs: Tab[] = [
    { id: 'all', content: 'All', badge: '24' },
    { id: 'unread', content: 'Unread', badge: '5' },
    { id: 'flagged', content: 'Flagged', badge: '12' },
    { id: 'drafts', content: 'Drafts' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleSelect}
    />
  );
}

export default TabsWithBadges;`
  },
  fitted: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function FittedTabs() {
  const [selected, setSelected] = useState(1);

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={setSelected}
      fitted
    />
  );
}

export default FittedTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const tabsContainer = $('#tabs-container');
const tabs = [
  { id: 'overview', content: 'Overview' },
  { id: 'products', content: 'Products' },
  { id: 'customers', content: 'Customers' },
  { id: 'analytics', content: 'Analytics' }
];

let selectedIndex = 1;

function renderTabs() {
  tabsContainer.innerHTML = \`
    <div class="tabs-fitted">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
        </button>\`
      ).join('')}
    </div>
  \`;

  on(tabsContainer, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

// CSS for fitted tabs
const style = document.createElement('style');
style.textContent = \`
  .tabs-fitted { display: flex; width: 100%; }
  .tabs-fitted .tab { flex: 1; }
\`;
document.head.appendChild(style);

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 1,
  tabBar: {
    flex: 1,
    layout: {
      pack: 'stretch'
    }
  },
  items: [{
    title: 'Overview',
    itemId: 'overview',
    html: 'Overview content'
  }, {
    title: 'Products',
    itemId: 'products',
    html: 'Products content'
  }, {
    title: 'Customers',
    itemId: 'customers',
    html: 'Customers content'
  }, {
    title: 'Analytics',
    itemId: 'analytics',
    html: 'Analytics content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
}

interface FittedTabsProps {
  defaultTab?: number;
  onTabChange?: (index: number, tab: Tab) => void;
}

function FittedTabs({ defaultTab = 1, onTabChange }: FittedTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(defaultTab);

  const tabs: Tab[] = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <Tabs
      tabs={tabs}
      selected={selected}
      onSelect={handleSelect}
      fitted
    />
  );
}

export default FittedTabs;`
  },
  manyTabs: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function ManyTabs() {
  const [selected, setSelected] = useState(0);

  const tabs = [
    { id: 'dashboard', content: 'Dashboard' },
    { id: 'products', content: 'Products', badge: '128' },
    { id: 'orders', content: 'Orders', badge: '45' },
    { id: 'customers', content: 'Customers', badge: '1.2k' },
    { id: 'inventory', content: 'Inventory' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'marketing', content: 'Marketing' },
    { id: 'discounts', content: 'Discounts' },
    { id: 'settings', content: 'Settings' },
  ];

  return (
    <div style={{ width: '800px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        disclosureText="More tabs"
      />
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <p>Selected tab: <strong>{tabs[selected].content}</strong></p>
        <p>Tab ID: <strong>{tabs[selected].id}</strong></p>
      </div>
    </div>
  );
}

export default ManyTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const tabs = [
  { id: 'dashboard', content: 'Dashboard' },
  { id: 'products', content: 'Products', badge: '128' },
  { id: 'orders', content: 'Orders', badge: '45' },
  { id: 'customers', content: 'Customers', badge: '1.2k' },
  { id: 'inventory', content: 'Inventory' },
  { id: 'analytics', content: 'Analytics' },
  { id: 'marketing', content: 'Marketing' },
  { id: 'discounts', content: 'Discounts' },
  { id: 'settings', content: 'Settings' }
];

let selectedIndex = 0;
const visibleCount = 6;

function renderTabs() {
  const visibleTabs = tabs.slice(0, visibleCount);
  const overflowTabs = tabs.slice(visibleCount);

  container.innerHTML = \`
    <div class="tabs-wrapper">
      <div class="tabs-main">
        \${visibleTabs.map((tab, index) =>
          \`<button
            class="tab \${index === selectedIndex ? 'selected' : ''}"
            data-index="\${index}"
          >
            \${tab.content}
            \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
          </button>\`
        ).join('')}
      </div>
      \${overflowTabs.length > 0 ? \`
        <button class="tab-overflow">
          More tabs (\${overflowTabs.length})
        </button>
      \` : ''}
    </div>
    <div class="tab-content">
      <p>Selected tab: <strong>\${tabs[selectedIndex].content}</strong></p>
      <p>Tab ID: <strong>\${tabs[selectedIndex].id}</strong></p>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', { index: selectedIndex, tab: tabs[selectedIndex] });
  });
}

renderTabs();`,
    extjs: `Ext.create('Ext.tab.Panel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 800,
  tabBar: {
    enableOverflow: true,
    overflowHandler: 'menu'
  },
  items: [{
    title: 'Dashboard',
    itemId: 'dashboard',
    html: 'Dashboard content'
  }, {
    title: 'Products <span class="badge">128</span>',
    itemId: 'products',
    html: 'Products content'
  }, {
    title: 'Orders <span class="badge">45</span>',
    itemId: 'orders',
    html: 'Orders content'
  }, {
    title: 'Customers <span class="badge">1.2k</span>',
    itemId: 'customers',
    html: 'Customers content'
  }, {
    title: 'Inventory',
    itemId: 'inventory',
    html: 'Inventory content'
  }, {
    title: 'Analytics',
    itemId: 'analytics',
    html: 'Analytics content'
  }, {
    title: 'Marketing',
    itemId: 'marketing',
    html: 'Marketing content'
  }, {
    title: 'Discounts',
    itemId: 'discounts',
    html: 'Discounts content'
  }, {
    title: 'Settings',
    itemId: 'settings',
    html: 'Settings content'
  }],
  listeners: {
    tabchange: function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        index: tabPanel.items.indexOf(newTab),
        id: newTab.itemId
      });
    }
  }
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface ManyTabsProps {
  width?: number;
  disclosureText?: string;
  onTabChange?: (index: number, tab: Tab) => void;
}

function ManyTabs({ width = 800, disclosureText = 'More tabs', onTabChange }: ManyTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const tabs: Tab[] = [
    { id: 'dashboard', content: 'Dashboard' },
    { id: 'products', content: 'Products', badge: '128' },
    { id: 'orders', content: 'Orders', badge: '45' },
    { id: 'customers', content: 'Customers', badge: '1.2k' },
    { id: 'inventory', content: 'Inventory' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'marketing', content: 'Marketing' },
    { id: 'discounts', content: 'Discounts' },
    { id: 'settings', content: 'Settings' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index]);
  };

  return (
    <div style={{ width: \`\${width}px\` }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
        disclosureText={disclosureText}
      />
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <p>Selected tab: <strong>{tabs[selected].content}</strong></p>
        <p>Tab ID: <strong>{tabs[selected].id}</strong></p>
      </div>
    </div>
  );
}

export default ManyTabs;`
  },
  interactive: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function InteractiveTabs() {
  const [selected, setSelected] = useState(0);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({
    overview: 1,
    products: 3,
    customers: 0,
    analytics: 2,
  });

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  const handleTabSelect = (index: number) => {
    setSelected(index);
    const tabId = tabs[index].id;
    setViewCounts(prev => ({
      ...prev,
      [tabId]: prev[tabId] + 1,
    }));
  };

  return (
    <div style={{ width: '600px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>{tabs[selected].content} View</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          This is the content area for the <strong>{tabs[selected].content}</strong> tab.
        </p>

        <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)' }}>Tab Interaction Stats:</h4>
          {tabs.map((tab) => (
            <div key={tab.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ fontSize: 'var(--font-size-xs)' }}>{tab.content}:</span>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                {viewCounts[tab.id]} view{viewCounts[tab.id] !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const tabs = [
  { id: 'overview', content: 'Overview' },
  { id: 'products', content: 'Products' },
  { id: 'customers', content: 'Customers' },
  { id: 'analytics', content: 'Analytics' }
];

let selectedIndex = 0;
const viewCounts = { overview: 1, products: 3, customers: 0, analytics: 2 };

function renderTabs() {
  container.innerHTML = \`
    <div class="tabs-wrapper">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
        </button>\`
      ).join('')}
    </div>
    <div class="tab-content">
      <h3>\${tabs[selectedIndex].content} View</h3>
      <p>This is the content area for the <strong>\${tabs[selectedIndex].content}</strong> tab.</p>
      <div class="stats">
        <h4>Tab Interaction Stats:</h4>
        \${tabs.map(tab => \`
          <div class="stat-row">
            <span>\${tab.content}:</span>
            <span><strong>\${viewCounts[tab.id]} view\${viewCounts[tab.id] !== 1 ? 's' : ''}</strong></span>
          </div>
        \`).join('')}
      </div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    const tabId = tabs[selectedIndex].id;
    viewCounts[tabId]++;
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex],
      viewCount: viewCounts[tabId]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('InteractiveTabPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.viewCounts = {
      overview: 1,
      products: 3,
      customers: 0,
      analytics: 2
    };

    me.items = [{
      title: 'Overview',
      itemId: 'overview',
      html: me.getTabContent('overview')
    }, {
      title: 'Products',
      itemId: 'products',
      html: me.getTabContent('products')
    }, {
      title: 'Customers',
      itemId: 'customers',
      html: me.getTabContent('customers')
    }, {
      title: 'Analytics',
      itemId: 'analytics',
      html: me.getTabContent('analytics')
    }];

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      var tabId = newTab.itemId;
      me.viewCounts[tabId]++;
      newTab.update(me.getTabContent(tabId));
      EventBus.emit('tab:selected', {
        id: tabId,
        viewCount: me.viewCounts[tabId]
      });
    });
  },

  getTabContent: function(tabId) {
    var stats = '';
    for (var id in this.viewCounts) {
      stats += '<div>' + id + ': ' + this.viewCounts[id] + ' views</div>';
    }
    return '<div class="tab-content"><h3>' + tabId + ' View</h3>' +
           '<div class="stats">' + stats + '</div></div>';
  }
});

Ext.create('InteractiveTabPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 600
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface Tab {
  id: string;
  content: string;
}

interface ViewCounts {
  [key: string]: number;
}

interface InteractiveTabsProps {
  initialCounts?: ViewCounts;
  onTabSelect?: (index: number, tab: Tab, viewCount: number) => void;
}

function InteractiveTabs({ initialCounts, onTabSelect }: InteractiveTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [viewCounts, setViewCounts] = useState<ViewCounts>(initialCounts || {
    overview: 1,
    products: 3,
    customers: 0,
    analytics: 2,
  });

  const tabs: Tab[] = [
    { id: 'overview', content: 'Overview' },
    { id: 'products', content: 'Products' },
    { id: 'customers', content: 'Customers' },
    { id: 'analytics', content: 'Analytics' },
  ];

  const handleTabSelect = (index: number) => {
    setSelected(index);
    const tabId = tabs[index].id;
    const newCount = viewCounts[tabId] + 1;

    setViewCounts(prev => ({
      ...prev,
      [tabId]: newCount,
    }));

    onTabSelect?.(index, tabs[index], newCount);
  };

  return (
    <div style={{ width: '600px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 12px 0' }}>{tabs[selected].content} View</h3>
        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          This is the content area for the <strong>{tabs[selected].content}</strong> tab.
        p>

        <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: 'var(--font-size-sm)' }}>Tab Interaction Stats:</h4>
          {tabs.map((tab) => (
            <div key={tab.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ fontSize: 'var(--font-size-xs)' }}>{tab.content}:</span>
              <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-semibold)' }}>
                {viewCounts[tab.id]} view{viewCounts[tab.id] !== 1 ? 's' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InteractiveTabs;`
  },
  productManagement: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function ProductManagementTabs() {
  const [selected, setSelected] = useState(0);
  const [productData] = useState({
    details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
    inventory: { stock: 150, reserved: 12, available: 138 },
    variants: { total: 5, active: 3 },
    analytics: { views: 1234, orders: 89, conversion: '7.2%' },
  });

  const tabs = [
    { id: 'details', content: 'Details' },
    { id: 'inventory', content: 'Inventory', badge: productData.inventory.available.toString() },
    { id: 'variants', content: 'Variants', badge: productData.variants.total.toString() },
    { id: 'analytics', content: 'Analytics' },
    { id: 'seo', content: 'SEO' },
  ];

  const renderTabContent = () => {
    switch (tabs[selected].id) {
      case 'details':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Product:</strong> {productData.details.name}</div>
            <div><strong>Price:</strong> {productData.details.price}</div>
            <div><strong>SKU:</strong> {productData.details.sku}</div>
          </div>
        );
      case 'inventory':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Stock:</strong> {productData.inventory.stock}</div>
            <div><strong>Reserved:</strong> {productData.inventory.reserved}</div>
            <div><strong>Available:</strong> {productData.inventory.available}</div>
          </div>
        );
      case 'variants':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Variants:</strong> {productData.variants.total}</div>
            <div><strong>Active:</strong> {productData.variants.active}</div>
            <div><strong>Inactive:</strong> {productData.variants.total - productData.variants.active}</div>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Page Views:</strong> {productData.analytics.views.toLocaleString()}</div>
            <div><strong>Orders:</strong> {productData.analytics.orders}</div>
            <div><strong>Conversion Rate:</strong> {productData.analytics.conversion}</div>
          </div>
        );
      case 'seo':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>
            <div><strong>Description:</strong> High-quality wireless headphones with noise cancellation</div>
            <div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width: '700px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>{tabs[selected].content}</h3>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProductManagementTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const tabs = [
  { id: 'details', content: 'Details' },
  { id: 'inventory', content: 'Inventory', badge: '138' },
  { id: 'variants', content: 'Variants', badge: '5' },
  { id: 'analytics', content: 'Analytics' },
  { id: 'seo', content: 'SEO' }
];

const productData = {
  details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
  inventory: { stock: 150, reserved: 12, available: 138 },
  variants: { total: 5, active: 3 },
  analytics: { views: 1234, orders: 89, conversion: '7.2%' },
  seo: {
    title: 'Premium Wireless Headphones - Shop Now',
    description: 'High-quality wireless headphones with noise cancellation',
    keywords: 'headphones, wireless, audio, premium'
  }
};

let selectedIndex = 0;

function renderTabContent() {
  const tabId = tabs[selectedIndex].id;
  const data = productData[tabId];

  if (!data) return '<p>No data available</p>';

  return Object.entries(data)
    .map(([key, value]) => \`<div><strong>\${key}:</strong> \${value}</div>\`)
    .join('');
}

function renderTabs() {
  container.innerHTML = \`
    <div class="tabs-wrapper">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
          \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
        </button>\`
      ).join('')}
    </div>
    <div class="tab-content">
      <h3>\${tabs[selectedIndex].content}</h3>
      <div class="product-data">\${renderTabContent()}</div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('ProductManagementPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.productData = {
      details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
      inventory: { stock: 150, reserved: 12, available: 138 },
      variants: { total: 5, active: 3 },
      analytics: { views: 1234, orders: 89, conversion: '7.2%' }
    };

    me.items = [{
      title: 'Details',
      itemId: 'details',
      html: me.renderDetails()
    }, {
      title: 'Inventory <span class="badge">138</span>',
      itemId: 'inventory',
      html: me.renderInventory()
    }, {
      title: 'Variants <span class="badge">5</span>',
      itemId: 'variants',
      html: me.renderVariants()
    }, {
      title: 'Analytics',
      itemId: 'analytics',
      html: me.renderAnalytics()
    }, {
      title: 'SEO',
      itemId: 'seo',
      html: me.renderSEO()
    }];

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      EventBus.emit('tab:selected', { id: newTab.itemId });
    });
  },

  renderDetails: function() {
    var d = this.productData.details;
    return '<div><strong>Product:</strong> ' + d.name + '</div>' +
           '<div><strong>Price:</strong> ' + d.price + '</div>' +
           '<div><strong>SKU:</strong> ' + d.sku + '</div>';
  },

  renderInventory: function() {
    var i = this.productData.inventory;
    return '<div><strong>Total Stock:</strong> ' + i.stock + '</div>' +
           '<div><strong>Reserved:</strong> ' + i.reserved + '</div>' +
           '<div><strong>Available:</strong> ' + i.available + '</div>';
  },

  renderVariants: function() {
    var v = this.productData.variants;
    return '<div><strong>Total Variants:</strong> ' + v.total + '</div>' +
           '<div><strong>Active:</strong> ' + v.active + '</div>' +
           '<div><strong>Inactive:</strong> ' + (v.total - v.active) + '</div>';
  },

  renderAnalytics: function() {
    var a = this.productData.analytics;
    return '<div><strong>Page Views:</strong> ' + a.views.toLocaleString() + '</div>' +
           '<div><strong>Orders:</strong> ' + a.orders + '</div>' +
           '<div><strong>Conversion Rate:</strong> ' + a.conversion + '</div>';
  },

  renderSEO: function() {
    return '<div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>' +
           '<div><strong>Description:</strong> High-quality wireless headphones</div>' +
           '<div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>';
  }
});

Ext.create('ProductManagementPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 700
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface ProductDetails {
  name: string;
  price: string;
  sku: string;
}

interface Inventory {
  stock: number;
  reserved: number;
  available: number;
}

interface Variants {
  total: number;
  active: number;
}

interface Analytics {
  views: number;
  orders: number;
  conversion: string;
}

interface ProductData {
  details: ProductDetails;
  inventory: Inventory;
  variants: Variants;
  analytics: Analytics;
}

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface ProductManagementTabsProps {
  initialData?: ProductData;
  onTabChange?: (index: number, tabId: string) => void;
}

function ProductManagementTabs({ initialData, onTabChange }: ProductManagementTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [productData] = useState<ProductData>(initialData || {
    details: { name: 'Wireless Headphones', price: '$89.99', sku: 'WH-001' },
    inventory: { stock: 150, reserved: 12, available: 138 },
    variants: { total: 5, active: 3 },
    analytics: { views: 1234, orders: 89, conversion: '7.2%' },
  });

  const tabs: Tab[] = [
    { id: 'details', content: 'Details' },
    { id: 'inventory', content: 'Inventory', badge: productData.inventory.available.toString() },
    { id: 'variants', content: 'Variants', badge: productData.variants.total.toString() },
    { id: 'analytics', content: 'Analytics' },
    { id: 'seo', content: 'SEO' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index].id);
  };

  const renderTabContent = (): JSX.Element => {
    switch (tabs[selected].id) {
      case 'details':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Product:</strong> {productData.details.name}</div>
            <div><strong>Price:</strong> {productData.details.price}</div>
            <div><strong>SKU:</strong> {productData.details.sku}</div>
          </div>
        );
      case 'inventory':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Stock:</strong> {productData.inventory.stock}</div>
            <div><strong>Reserved:</strong> {productData.inventory.reserved}</div>
            <div><strong>Available:</strong> {productData.inventory.available}</div>
          </div>
        );
      case 'variants':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Total Variants:</strong> {productData.variants.total}</div>
            <div><strong>Active:</strong> {productData.variants.active}</div>
            <div><strong>Inactive:</strong> {productData.variants.total - productData.variants.active}</div>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Page Views:</strong> {productData.analytics.views.toLocaleString()}</div>
            <div><strong>Orders:</strong> {productData.analytics.orders}</div>
            <div><strong>Conversion Rate:</strong> {productData.analytics.conversion}</div>
          </div>
        );
      case 'seo':
        return (
          <div style={{ display: 'grid', gap: '12px' }}>
            <div><strong>Title:</strong> Premium Wireless Headphones - Shop Now</div>
            <div><strong>Description:</strong> High-quality wireless headphones with noise cancellation</div>
            <div><strong>Keywords:</strong> headphones, wireless, audio, premium</div>
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <div style={{ width: '700px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3 style={{ margin: '0 0 16px 0' }}>{tabs[selected].content}</h3>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default ProductManagementTabs;`
  },
  orderStatus: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function OrderStatusTabs() {
  const [selected, setSelected] = useState(0);

  const statusCounts = {
    all: 156,
    pending: 12,
    processing: 23,
    shipped: 45,
    delivered: 68,
    cancelled: 8,
  };

  const tabs = [
    { id: 'all', content: 'All Orders', badge: statusCounts.all.toString() },
    { id: 'pending', content: 'Pending', badge: statusCounts.pending.toString() },
    { id: 'processing', content: 'Processing', badge: statusCounts.processing.toString() },
    { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped.toString() },
    { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered.toString() },
    { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled.toString() },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  return (
    <div style={{ width: '800px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>{tabs[selected].content}</h3>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: getStatusColor(tabs[selected].id),
              color: 'white',
              borderRadius: '12px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            {statusCounts[tabs[selected].id as keyof typeof statusCounts]} orders
          </span>
        </div>

        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          Managing {statusCounts[tabs[selected].id as keyof typeof statusCounts]} orders with status: <strong>{tabs[selected].content}</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Total Value</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$12,456</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Average Order</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$89.95</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Processing Time</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>2.3 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const statusCounts = {
  all: 156,
  pending: 12,
  processing: 23,
  shipped: 45,
  delivered: 68,
  cancelled: 8
};

const tabs = [
  { id: 'all', content: 'All Orders', badge: statusCounts.all },
  { id: 'pending', content: 'Pending', badge: statusCounts.pending },
  { id: 'processing', content: 'Processing', badge: statusCounts.processing },
  { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped },
  { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered },
  { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled }
];

let selectedIndex = 0;

const statusColors = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981',
  cancelled: '#ef4444'
};

function renderTabs() {
  const currentTab = tabs[selectedIndex];
  const statusColor = statusColors[currentTab.id] || '#6b7280';

  container.innerHTML = \`
    <div class="tabs-wrapper">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
          <span class="badge">\${tab.badge}</span>
        </button>\`
      ).join('')}
    </div>
    <div class="tab-content">
      <div class="header">
        <h3>\${currentTab.content}</h3>
        <span class="status-badge" style="background: \${statusColor}">
          \${currentTab.badge} orders
        </span>
      </div>
      <p>Managing \${currentTab.badge} orders with status: <strong>\${currentTab.content}</strong></p>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Value</div>
          <div class="stat-value">$12,456</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Average Order</div>
          <div class="stat-value">$89.95</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Processing Time</div>
          <div class="stat-value">2.3 days</div>
        </div>
      </div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.closest('.tab').dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('OrderStatusPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.statusCounts = {
      all: 156,
      pending: 12,
      processing: 23,
      shipped: 45,
      delivered: 68,
      cancelled: 8
    };

    me.statusColors = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444'
    };

    me.items = Object.keys(me.statusCounts).map(function(status) {
      var title = status === 'all' ? 'All Orders' :
                  status.charAt(0).toUpperCase() + status.slice(1);
      var count = me.statusCounts[status];

      return {
        title: title + ' <span class="badge">' + count + '</span>',
        itemId: status,
        html: me.renderStatusContent(status, count)
      };
    });

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      EventBus.emit('tab:selected', {
        id: newTab.itemId,
        count: me.statusCounts[newTab.itemId]
      });
    });
  },

  renderStatusContent: function(status, count) {
    var color = this.statusColors[status] || '#6b7280';
    return '<div class="order-status-content">' +
           '<div class="header">' +
           '<h3>' + status + '</h3>' +
           '<span class="status-badge" style="background:' + color + '">' + count + ' orders</span>' +
           '</div>' +
           '<div class="stats">' +
           '<div class="stat"><span>Total Value:</span> <strong>$12,456</strong></div>' +
           '<div class="stat"><span>Average Order:</span> <strong>$89.95</strong></div>' +
           '<div class="stat"><span>Processing Time:</span> <strong>2.3 days</strong></div>' +
           '</div></div>';
  }
});

Ext.create('OrderStatusPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 800
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface StatusCounts {
  all: number;
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

interface Tab {
  id: keyof StatusCounts;
  content: string;
  badge: string;
}

interface OrderStatusTabsProps {
  statusCounts?: StatusCounts;
  onStatusChange?: (status: string, count: number) => void;
}

function OrderStatusTabs({
  statusCounts: initialCounts,
  onStatusChange
}: OrderStatusTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);

  const statusCounts: StatusCounts = initialCounts || {
    all: 156,
    pending: 12,
    processing: 23,
    shipped: 45,
    delivered: 68,
    cancelled: 8,
  };

  const tabs: Tab[] = [
    { id: 'all', content: 'All Orders', badge: statusCounts.all.toString() },
    { id: 'pending', content: 'Pending', badge: statusCounts.pending.toString() },
    { id: 'processing', content: 'Processing', badge: statusCounts.processing.toString() },
    { id: 'shipped', content: 'Shipped', badge: statusCounts.shipped.toString() },
    { id: 'delivered', content: 'Delivered', badge: statusCounts.delivered.toString() },
    { id: 'cancelled', content: 'Cancelled', badge: statusCounts.cancelled.toString() },
  ];

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: '#f59e0b',
      processing: '#3b82f6',
      shipped: '#8b5cf6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    };
    return colors[status] || '#6b7280';
  };

  const handleSelect = (index: number) => {
    setSelected(index);
    const currentTab = tabs[index];
    onStatusChange?.(currentTab.id, statusCounts[currentTab.id]);
  };

  return (
    <div style={{ width: '800px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>{tabs[selected].content}</h3>
          <span
            style={{
              padding: '4px 12px',
              backgroundColor: getStatusColor(tabs[selected].id),
              color: 'white',
              borderRadius: '12px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)'
            }}
          >
            {statusCounts[tabs[selected].id]} orders
          </span>
        </div>

        <p style={{ margin: '0 0 16px 0', color: '#6b7280' }}>
          Managing {statusCounts[tabs[selected].id]} orders with status: <strong>{tabs[selected].content}</strong>
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Total Value</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$12,456</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Average Order</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>$89.95</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: 'var(--font-size-xs)', color: '#6b7280', marginBottom: '4px' }}>Processing Time</div>
            <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semibold)' }}>2.3 days</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderStatusTabs;`
  },
  campaignTabs: {
    react: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

function CampaignTabs() {
  const [selected, setSelected] = useState(0);
  const [campaignData] = useState({
    overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
    ads: { active: 8, total: 15, ctr: '2.4%' },
    audience: { reached: 12500, engaged: 890, new: 456 },
    analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 },
  });

  const tabs = [
    { id: 'overview', content: 'Overview' },
    { id: 'ads', content: 'Ads', badge: campaignData.ads.active.toString() },
    { id: 'audience', content: 'Audience' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'settings', content: 'Settings' },
  ];

  return (
    <div style={{ width: '750px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        fitted
      />

      <div style={{
        marginTop: '20px',
        padding: '24px',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-xl)' }}>
          {tabs[selected].content}
        </h3>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          padding: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          {tabs[selected].id === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Total Budget</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Spent</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.spent}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>ROI</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.roi}</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'ads' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '8px' }}>
                {campaignData.ads.active} / {campaignData.ads.total}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
                Active ads with {campaignData.ads.ctr} click-through rate
              </div>
            </div>
          )}

          {tabs[selected].id === 'audience' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.reached.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>People Reached</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.engaged.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Engaged</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.new.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>New Customers</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'analytics' && (
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Performance Metrics</h4>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.impressions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Impressions</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.clicks}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Clicks</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.conversions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Conversions</div>
                </div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'settings' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: '12px' }}>Campaign Configuration</div>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Manage campaign settings, targeting, budget allocation, and scheduling options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignTabs;`,
    vanilla: `import { $, on, EventBus } from '@cin7/vanilla-js';

const container = $('#tabs-container');
const campaignData = {
  overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
  ads: { active: 8, total: 15, ctr: '2.4%' },
  audience: { reached: 12500, engaged: 890, new: 456 },
  analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 }
};

const tabs = [
  { id: 'overview', content: 'Overview' },
  { id: 'ads', content: 'Ads', badge: '8' },
  { id: 'audience', content: 'Audience' },
  { id: 'analytics', content: 'Analytics' },
  { id: 'settings', content: 'Settings' }
];

let selectedIndex = 0;

function renderContent() {
  const tabId = tabs[selectedIndex].id;
  const data = campaignData[tabId];

  switch (tabId) {
    case 'overview':
      return \`
        <div class="campaign-grid">
          <div><div class="label">Total Budget</div><div class="value">\${data.budget}</div></div>
          <div><div class="label">Spent</div><div class="value">\${data.spent}</div></div>
          <div><div class="label">ROI</div><div class="value">\${data.roi}</div></div>
        </div>
      \`;
    case 'ads':
      return \`
        <div class="campaign-center">
          <div class="big-value">\${data.active} / \${data.total}</div>
          <div class="label">Active ads with \${data.ctr} click-through rate</div>
        </div>
      \`;
    case 'audience':
      return \`
        <div class="campaign-grid">
          <div><div class="value">\${data.reached.toLocaleString()}</div><div class="label">People Reached</div></div>
          <div><div class="value">\${data.engaged.toLocaleString()}</div><div class="label">Engaged</div></div>
          <div><div class="value">\${data.new.toLocaleString()}</div><div class="label">New Customers</div></div>
        </div>
      \`;
    case 'analytics':
      return \`
        <div class="campaign-flow">
          <div><div class="value">\${data.impressions}</div><div class="label">Impressions</div></div>
          <div class="arrow">→</div>
          <div><div class="value">\${data.clicks}</div><div class="label">Clicks</div></div>
          <div class="arrow">→</div>
          <div><div class="value">\${data.conversions}</div><div class="label">Conversions</div></div>
        </div>
      \`;
    case 'settings':
      return \`
        <div class="campaign-center">
          <div class="label" style="font-size: 1.125rem; margin-bottom: 12px">Campaign Configuration</div>
          <p style="opacity: 0.8">Manage campaign settings, targeting, budget allocation, and scheduling options.</p>
        </div>
      \`;
    default:
      return '';
  }
}

function renderTabs() {
  container.innerHTML = \`
    <div class="tabs-fitted">
      \${tabs.map((tab, index) =>
        \`<button
          class="tab \${index === selectedIndex ? 'selected' : ''}"
          data-index="\${index}"
        >
          \${tab.content}
          \${tab.badge ? \`<span class="badge">\${tab.badge}</span>\` : ''}
        </button>\`
      ).join('')}
    </div>
    <div class="campaign-content">
      <h3>\${tabs[selectedIndex].content}</h3>
      <div class="campaign-panel">
        \${renderContent()}
      </div>
    </div>
  \`;

  on(container, 'click', '.tab', (e) => {
    selectedIndex = parseInt(e.target.dataset.index);
    renderTabs();
    EventBus.emit('tab:selected', {
      index: selectedIndex,
      tab: tabs[selectedIndex]
    });
  });
}

renderTabs();`,
    extjs: `Ext.define('CampaignTabPanel', {
  extend: 'Ext.tab.Panel',

  initComponent: function() {
    var me = this;

    me.campaignData = {
      overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
      ads: { active: 8, total: 15, ctr: '2.4%' },
      audience: { reached: 12500, engaged: 890, new: 456 },
      analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 }
    };

    me.items = [{
      title: 'Overview',
      itemId: 'overview',
      html: me.renderOverview()
    }, {
      title: 'Ads <span class="badge">8</span>',
      itemId: 'ads',
      html: me.renderAds()
    }, {
      title: 'Audience',
      itemId: 'audience',
      html: me.renderAudience()
    }, {
      title: 'Analytics',
      itemId: 'analytics',
      html: me.renderAnalytics()
    }, {
      title: 'Settings',
      itemId: 'settings',
      html: me.renderSettings()
    }];

    me.tabBar = {
      flex: 1,
      layout: { pack: 'stretch' }
    };

    me.callParent(arguments);

    me.on('tabchange', function(tabPanel, newTab) {
      EventBus.emit('tab:selected', { id: newTab.itemId });
    });
  },

  renderOverview: function() {
    var d = this.campaignData.overview;
    return '<div class="campaign-grid">' +
           '<div><strong>Total Budget:</strong> ' + d.budget + '</div>' +
           '<div><strong>Spent:</strong> ' + d.spent + '</div>' +
           '<div><strong>ROI:</strong> ' + d.roi + '</div></div>';
  },

  renderAds: function() {
    var d = this.campaignData.ads;
    return '<div class="campaign-center"><h2>' + d.active + ' / ' + d.total + '</h2>' +
           '<p>Active ads with ' + d.ctr + ' click-through rate</p></div>';
  },

  renderAudience: function() {
    var d = this.campaignData.audience;
    return '<div class="campaign-grid">' +
           '<div><strong>' + d.reached.toLocaleString() + '</strong><br>People Reached</div>' +
           '<div><strong>' + d.engaged.toLocaleString() + '</strong><br>Engaged</div>' +
           '<div><strong>' + d.new.toLocaleString() + '</strong><br>New Customers</div></div>';
  },

  renderAnalytics: function() {
    var d = this.campaignData.analytics;
    return '<div class="campaign-flow">' +
           '<div><strong>' + d.impressions + '</strong><br>Impressions</div>' +
           '<div>→</div>' +
           '<div><strong>' + d.clicks + '</strong><br>Clicks</div>' +
           '<div>→</div>' +
           '<div><strong>' + d.conversions + '</strong><br>Conversions</div></div>';
  },

  renderSettings: function() {
    return '<div class="campaign-center">' +
           '<h3>Campaign Configuration</h3>' +
           '<p>Manage campaign settings, targeting, budget allocation, and scheduling options.</p></div>';
  }
});

Ext.create('CampaignTabPanel', {
  renderTo: Ext.getBody(),
  activeTab: 0,
  width: 750
});`,
    typescript: `import { Tabs } from '@shopify/polaris';
import { useState } from 'react';

interface CampaignOverview {
  budget: string;
  spent: string;
  roi: string;
}

interface CampaignAds {
  active: number;
  total: number;
  ctr: string;
}

interface CampaignAudience {
  reached: number;
  engaged: number;
  new: number;
}

interface CampaignAnalytics {
  impressions: string;
  clicks: string;
  conversions: number;
}

interface CampaignData {
  overview: CampaignOverview;
  ads: CampaignAds;
  audience: CampaignAudience;
  analytics: CampaignAnalytics;
}

interface Tab {
  id: string;
  content: string;
  badge?: string;
}

interface CampaignTabsProps {
  data?: CampaignData;
  onTabChange?: (index: number, tabId: string) => void;
}

function CampaignTabs({ data: initialData, onTabChange }: CampaignTabsProps): JSX.Element {
  const [selected, setSelected] = useState<number>(0);
  const [campaignData] = useState<CampaignData>(initialData || {
    overview: { budget: '$5,000', spent: '$3,245', roi: '124%' },
    ads: { active: 8, total: 15, ctr: '2.4%' },
    audience: { reached: 12500, engaged: 890, new: 456 },
    analytics: { impressions: '45.2k', clicks: '1.1k', conversions: 89 },
  });

  const tabs: Tab[] = [
    { id: 'overview', content: 'Overview' },
    { id: 'ads', content: 'Ads', badge: campaignData.ads.active.toString() },
    { id: 'audience', content: 'Audience' },
    { id: 'analytics', content: 'Analytics' },
    { id: 'settings', content: 'Settings' },
  ];

  const handleSelect = (index: number) => {
    setSelected(index);
    onTabChange?.(index, tabs[index].id);
  };

  return (
    <div style={{ width: '750px' }}>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleSelect}
        fitted
      />

      <div style={{
        marginTop: '20px',
        padding: '24px',
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '8px',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: 'var(--font-size-xl)' }}>
          {tabs[selected].content}
        </h3>

        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '6px',
          padding: '16px',
          backdropFilter: 'blur(10px)'
        }}>
          {tabs[selected].id === 'overview' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Total Budget</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.budget}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>Spent</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.spent}</div>
              </div>
              <div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8, marginBottom: '4px' }}>ROI</div>
                <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.overview.roi}</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'ads' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: '8px' }}>
                {campaignData.ads.active} / {campaignData.ads.total}
              </div>
              <div style={{ fontSize: 'var(--font-size-sm)', opacity: 0.8 }}>
                Active ads with {campaignData.ads.ctr} click-through rate
              </div>
            </div>
          )}

          {tabs[selected].id === 'audience' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.reached.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>People Reached</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.engaged.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Engaged</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.audience.new.toLocaleString()}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>New Customers</div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'analytics' && (
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 12px 0' }}>Performance Metrics</h4>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.impressions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Impressions</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.clicks}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Clicks</div>
                </div>
                <div style={{ fontSize: 'var(--font-size-2xl)', opacity: 0.6 }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>{campaignData.analytics.conversions}</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', opacity: 0.8 }}>Conversions</div>
                </div>
              </div>
            </div>
          )}

          {tabs[selected].id === 'settings' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'var(--font-size-lg)', marginBottom: '12px' }}>Campaign Configuration</div>
              <p style={{ margin: 0, opacity: 0.8 }}>
                Manage campaign settings, targeting, budget allocation, and scheduling options.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignTabs;`
  }
};

// ActionMenu Component Examples

export const breadcrumbsExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';

function BreadcrumbsExample() {
  return (
    <Breadcrumbs
      breadcrumbs={[
        { content: 'Products', url: '/products' },
        { content: 'Inventory', url: '/products/inventory' },
      ]}
    />
  );
}

export default BreadcrumbsExample;`,

    vanilla: `<!-- HTML Structure -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs-list">
    <li class="breadcrumbs-item">
      <a href="/products" class="breadcrumbs-link">Products</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/products/inventory" class="breadcrumbs-link">Inventory</a>
    </li>
  </ol>
</nav>

<style>
.breadcrumbs-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
}

.breadcrumbs-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--font-size-sm);
}

.breadcrumbs-link:hover {
  text-decoration: underline;
}

.breadcrumbs-separator {
  margin: 0 8px;
  color: var(--color-text-subdued);
}
</style>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createBreadcrumbs } from '@cin7/vanilla-js';

const breadcrumbs = createBreadcrumbs({
  items: [
    { text: 'Products', url: '/products' },
    { text: 'Inventory', url: '/products/inventory' }
  ],
  onClick: (item) => {
    console.log('Navigating to:', item.url);
  }
});

document.getElementById('app').appendChild(breadcrumbs);
</script>`,

    extjs: `// ExtJS Breadcrumb using Toolbar
Ext.create('Ext.toolbar.Toolbar', {
  cls: 'breadcrumb-toolbar',
  items: [
    {
      xtype: 'button',
      text: 'Products',
      iconCls: 'icon-chevron-right',
      iconAlign: 'right',
      handler: function() {
        window.location.href = '/products';
      }
    },
    {
      xtype: 'button',
      text: 'Inventory',
      handler: function() {
        window.location.href = '/products/inventory';
      }
    }
  ],
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisBreadcrumbs } from '@cin7/extjs-adapters';

const breadcrumbs = Ext.create('PolarisBreadcrumbs', {
  breadcrumbs: [
    { content: 'Products', url: '/products' },
    { content: 'Inventory', url: '/products/inventory' }
  ],
  onAction: function(url) {
    window.location.href = url;
  }
});`,

    typescript: `import { Breadcrumbs, BreadcrumbsProps } from '@shopify/polaris';
import React from 'react';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  content: string;
  url: string;
  onAction?: () => void;
}

interface BreadcrumbsExampleProps {
  items: BreadcrumbItem[];
  onNavigate?: (url: string) => void;
}

function BreadcrumbsExample({
  items,
  onNavigate
}: BreadcrumbsExampleProps): JSX.Element {
  const router = useRouter();

  const handleBreadcrumbClick = (url: string, customAction?: () => void) => {
    if (customAction) {
      customAction();
    } else if (onNavigate) {
      onNavigate(url);
    } else {
      router.push(url);
    }
  };

  const breadcrumbs = items
    .filter(item => item && item.content) // Filter out undefined items and items without content
    .map(item => ({
      content: item.content,
      url: item.url,
      onAction: item.onAction || (() => handleBreadcrumbClick(item.url, item.onAction))
    }));

  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
}

export default BreadcrumbsExample;`,
  },

  shortPath: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';

function ShortPathExample() {
  return (
    <Breadcrumbs
      breadcrumbs={[
        { content: 'Home', url: '/' },
        { content: 'About', url: '/about' },
      ]}
    />
  );
}

export default ShortPathExample;`,
    vanilla: `<!-- Short Path Breadcrumbs -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs-list">
    <li class="breadcrumbs-item">
      <a href="/" class="breadcrumbs-link">Home</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <span class="breadcrumbs-current">About</span>
    </li>
  </ol>
</nav>

<style>
.breadcrumbs-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
}

.breadcrumbs-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color 0.2s ease;
}

.breadcrumbs-link:hover {
  color: var(--color-text-hover);
}

.breadcrumbs-current {
  color: var(--color-text-subdued);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.breadcrumbs-separator {
  margin: 0 8px;
  color: var(--color-text-subdued);
}
</style>`,
    extjs: `// ExtJS Breadcrumbs Component
Ext.create('Ext.panel.Panel', {
  title: 'Current Page',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'tbtext',
      text: 'Home',
      href: '/',
      hrefTarget: '_self'
    }, {
      xtype: 'tbtext',
      text: '/',
      margin: '0 8px',
      cls: 'separator'
    }, {
      xtype: 'tbtext',
      text: 'About',
      cls: 'current'
    }]
  }],
  items: [{
    xtype: 'displayfield',
    value: 'This is the About page with minimal breadcrumb navigation.'
  }]
});`,
    typescript: `import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';

interface BreadcrumbItem {
  content: string;
  url: string;
}

interface ShortPathProps {
  items?: BreadcrumbItem[];
}

function ShortPathExample({ items }: ShortPathProps): JSX.Element {
  const defaultItems: BreadcrumbItem[] = [
    { content: 'Home', url: '/' },
    { content: 'About', url: '/about' }
  ];

  const breadcrumbItems = items || defaultItems;

  return <Breadcrumbs breadcrumbs={breadcrumbItems} />;
}

export default ShortPathExample;`
  },

  longPath: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';

function LongPathExample() {
  return (
    <Breadcrumbs
      breadcrumbs={[
        { content: 'Home', url: '/' },
        { content: 'Shop', url: '/shop' },
        { content: 'Categories', url: '/shop/categories' },
        { content: 'Electronics', url: '/shop/categories/electronics' },
        { content: 'Audio', url: '/shop/categories/electronics/audio' },
        { content: 'Headphones', url: '/shop/categories/electronics/audio/headphones' },
        { content: 'Wireless', url: '/shop/categories/electronics/audio/headphones/wireless' },
      ]}
    />
  );
}

export default LongPathExample;`,
    vanilla: `<!-- Long Path Breadcrumbs -->
<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol class="breadcrumbs-list">
    <li class="breadcrumbs-item">
      <a href="/" class="breadcrumbs-link">Home</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/shop" class="breadcrumbs-link">Shop</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/shop/categories" class="breadcrumbs-link">Categories</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/shop/categories/electronics" class="breadcrumbs-link">Electronics</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/shop/categories/electronics/audio" class="breadcrumbs-link">Audio</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <a href="/shop/categories/electronics/audio/headphones" class="breadcrumbs-link">Headphones</a>
      <span class="breadcrumbs-separator" aria-hidden="true">/</span>
    </li>
    <li class="breadcrumbs-item">
      <span class="breadcrumbs-current">Wireless</span>
    </li>
  </ol>
</nav>

<style>
.breadcrumbs-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  flex-wrap: wrap;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
}

.breadcrumbs-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: color 0.2s ease;
  white-space: nowrap;
}

.breadcrumbs-link:hover {
  color: var(--color-text-hover);
}

.breadcrumbs-current {
  color: var(--color-text-subdued);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
}

.breadcrumbs-separator {
  margin: 0 8px;
  color: var(--color-text-subdued);
  flex-shrink: 0;
}

/* Responsive truncation for very long paths */
@media (max-width: 768px) {
  .breadcrumbs-item:nth-child(3),
  .breadcrumbs-item:nth-child(4) {
    display: none;
  }
}
</style>`,
    extjs: `// ExtJS Long Path Breadcrumbs
Ext.create('Ext.panel.Panel', {
  title: 'Wireless Headphones',
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [
      { xtype: 'tbtext', text: 'Home', href: '/' },
      { xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' },
      { xtype: 'tbtext', text: 'Shop', href: '/shop' },
      { xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' },
      { xtype: 'tbtext', text: 'Categories', href: '/shop/categories' },
      { xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' },
      { xtype: 'tbtext', text: 'Electronics', href: '/shop/categories/electronics' },
      { xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' },
      { xtype: 'tbtext', text: 'Audio', href: '/shop/categories/electronics/audio' },
      { xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' },
      { xtype: 'tbtext', text: 'Headphones', href: '/shop/categories/electronics/audio/headphones' },
      { xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' },
      { xtype: 'tbtext', text: 'Wireless', cls: 'current' }
    ]
  }],
  items: [{
    xtype: 'displayfield',
    value: 'This page shows wireless headphones with deep navigation hierarchy.'
  }]
});`,
    typescript: `import { Breadcrumbs } from '@shopify/polaris';
import React from 'react';

interface BreadcrumbItem {
  content: string;
  url: string;
}

interface LongPathProps {
  items?: BreadcrumbItem[];
  maxItems?: number;
}

function LongPathExample({ items, maxItems = 7 }: LongPathProps): JSX.Element {
  const defaultItems: BreadcrumbItem[] = [
    { content: 'Home', url: '/' },
    { content: 'Shop', url: '/shop' },
    { content: 'Categories', url: '/shop/categories' },
    { content: 'Electronics', url: '/shop/categories/electronics' },
    { content: 'Audio', url: '/shop/categories/electronics/audio' },
    { content: 'Headphones', url: '/shop/categories/electronics/audio/headphones' },
    { content: 'Wireless', url: '/shop/categories/electronics/audio/headphones/wireless' }
  ];

  const breadcrumbItems = items || defaultItems;

  // Optional: Truncate long paths with ellipsis
  const displayItems = breadcrumbItems.length > maxItems
    ? [
        breadcrumbItems[0],
        { content: '...', url: '#' },
        ...breadcrumbItems.slice(-3)
      ]
    : breadcrumbItems;

  return <Breadcrumbs breadcrumbs={displayItems} />;
}

export default LongPathExample;`
  },

  productNavigation: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState } from 'react';

function ProductNavigationExample() {
  const [currentPath, setCurrentPath] = useState('/shop/electronics/audio/wireless-headphones');

  const buildBreadcrumbs = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    const breadcrumbMap: Record<string, string> = {
      shop: 'Shop',
      electronics: 'Electronics',
      audio: 'Audio Equipment',
      'wireless-headphones': 'Wireless Headphones',
      products: 'Products',
      categories: 'Categories',
      'noise-cancelling': 'Noise Cancelling',
      'bluetooth-earbuds': 'Bluetooth Earbuds',
      support: 'Support',
      documentation: 'Documentation',
      troubleshooting: 'Troubleshooting',
    };

    return segments.map((segment, index) => {
      const url = '/' + segments.slice(0, index + 1).join('/');
      const content = breadcrumbMap[segment] || segment;
      return { content, url };
    }).filter(item => item && item.content);
  };

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div style={{ width: '600px' }}>
      <Breadcrumbs
        breadcrumbs={buildBreadcrumbs(currentPath)}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3>Current Path</h3>
        <code style={{ display: 'block', padding: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
          {currentPath}
        </code>

        <div style={{ marginTop: '16px' }}>
          <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Quick Navigation:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              '/shop',
              '/shop/electronics',
              '/shop/electronics/audio',
              '/support',
              '/support/documentation',
              '/support/documentation/troubleshooting',
            ].map((path) => (
              <button
                key={path}
                onClick={() => handleNavigation(path)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: currentPath === path ? '#3b82f6' : 'white',
                  color: currentPath === path ? 'white' : '#374151',
                  cursor: 'pointer',
                }}
              >
                {path}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductNavigationExample;`,
    vanilla: `<!-- Product Navigation Breadcrumbs -->
<div class="product-navigation-container">
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list" id="breadcrumbs-list">
      <!-- Breadcrumbs will be dynamically generated -->
    </ol>
  </nav>

  <div class="path-control-panel">
    <h3>Current Path</h3>
    <code id="current-path-display"></code>

    <div class="quick-navigation">
      <p>Quick Navigation:</p>
      <div class="nav-buttons">
        <button data-path="/shop">/shop</button>
        <button data-path="/shop/electronics">/shop/electronics</button>
        <button data-path="/shop/electronics/audio">/shop/electronics/audio</button>
        <button data-path="/support">/support</button>
        <button data-path="/support/documentation">/support/documentation</button>
        <button data-path="/support/documentation/troubleshooting">/support/documentation/troubleshooting</button>
      </div>
    </div>
  </div>
</div>

<script>
import { on, select } from '@cin7/vanilla-js';

let currentPath = '/shop/electronics/audio/wireless-headphones';

const breadcrumbMap = {
  shop: 'Shop',
  electronics: 'Electronics',
  audio: 'Audio Equipment',
  'wireless-headphones': 'Wireless Headphones',
  products: 'Products',
  categories: 'Categories',
  'noise-cancelling': 'Noise Cancelling',
  'bluetooth-earbuds': 'Bluetooth Earbuds',
  support: 'Support',
  documentation: 'Documentation',
  troubleshooting: 'Troubleshooting',
};

function buildBreadcrumbs(path) {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbsList = select('#breadcrumbs-list');

  breadcrumbsList.innerHTML = '';

  segments.forEach((segment, index) => {
    const url = '/' + segments.slice(0, index + 1).join('/');
    const content = breadcrumbMap[segment] || segment;

    const listItem = document.createElement('li');
    listItem.className = 'breadcrumbs-item';

    if (index === segments.length - 1) {
      listItem.innerHTML = '<span class="breadcrumbs-current">' + content + '</span>';
    } else {
      listItem.innerHTML =
        '<a href="' + url + '" class="breadcrumbs-link">' + content + '</a>' +
        '<span class="breadcrumbs-separator" aria-hidden="true">/</span>';
    }

    breadcrumbsList.appendChild(listItem);
  });
}

function updatePathDisplay() {
  const pathDisplay = select('#current-path-display');
  pathDisplay.textContent = currentPath;
}

function handleNavigation(path) {
  currentPath = path;
  buildBreadcrumbs(currentPath);
  updatePathDisplay();
}

// Initialize
buildBreadcrumbs(currentPath);
updatePathDisplay();

// Event listeners
on('#breadcrumbs-list', 'click', (e) => {
  if (e.target.classList.contains('breadcrumbs-link')) {
    e.preventDefault();
    handleNavigation(e.target.getAttribute('href'));
  }
});

on('.nav-buttons', 'click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    handleNavigation(e.target.getAttribute('data-path'));
  }
});
</script>

<style>
.product-navigation-container {
  width: 600px;
  margin: 0 auto;
}

.path-control-panel {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 6px;
}

.path-control-panel h3 {
  margin: 0 0 12px 0;
}

.path-control-panel code {
  display: block;
  padding: 8px;
  background-color: #e5e7eb;
  border-radius: 4px;
  font-family: monospace;
}

.quick-navigation {
  margin-top: 16px;
}

.quick-navigation p {
  margin: 0 0 8px 0;
  font-weight: bold;
}

.nav-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.nav-buttons button {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-buttons button:hover {
  background-color: #f3f4f6;
}

.nav-buttons button.active {
  background-color: #3b82f6;
  color: white;
}
</style>`,
    extjs: `// ExtJS Product Navigation with Breadcrumbs
Ext.define('ProductNavigationView', {
  extend: 'Ext.panel.Panel',
  title: 'Product Navigation',
  width: 600,
  bodyPadding: 20,

  initComponent: function() {
    var me = this;
    me.currentPath = '/shop/electronics/audio/wireless-headphones';

    me.breadcrumbMap = {
      shop: 'Shop',
      electronics: 'Electronics',
      audio: 'Audio Equipment',
      'wireless-headphones': 'Wireless Headphones',
      support: 'Support',
      documentation: 'Documentation',
      troubleshooting: 'Troubleshooting'
    };

    me.dockedItems = [{
      xtype: 'toolbar',
      dock: 'top',
      itemId: 'breadcrumbToolbar',
      items: [] // Will be populated dynamically
    }];

    me.items = [{
      xtype: 'panel',
      title: 'Current Path',
      items: [{
        xtype: 'displayfield',
        itemId: 'pathDisplay',
        value: me.currentPath,
        fieldStyle: 'font-family: monospace; background: #e5e7eb; padding: 8px; border-radius: 4px;'
      }, {
        xtype: 'panel',
        title: 'Quick Navigation',
        margin: '16px 0 0 0',
        layout: 'column',
        items: [
          { xtype: 'displayfield', value: 'Navigate to different paths:', margin: '0 0 8px 0' },
          {
            xtype: 'container',
            layout: 'hbox',
            defaults: { margin: '0 8px 8px 0' },
            items: [
              {
                xtype: 'button',
                text: '/shop',
                handler: function() { me.navigateToPath('/shop'); }
              },
              {
                xtype: 'button',
                text: '/shop/electronics',
                handler: function() { me.navigateToPath('/shop/electronics'); }
              },
              {
                xtype: 'button',
                text: '/shop/electronics/audio',
                handler: function() { me.navigateToPath('/shop/electronics/audio'); }
              },
              {
                xtype: 'button',
                text: '/support',
                handler: function() { me.navigateToPath('/support'); }
              }
            ]
          }
        ]
      }]
    }];

    me.callParent();
  },

  initComponent: function() {
    this.callParent();
    this.updateBreadcrumbs();
  },

  updateBreadcrumbs: function() {
    var toolbar = this.down('#breadcrumbToolbar');
    var segments = this.currentPath.split('/').filter(Boolean);
    var items = [];

    segments.forEach(function(segment, index) {
      var url = '/' + segments.slice(0, index + 1).join('/');
      var content = this.breadcrumbMap[segment] || segment;

      if (index === segments.length - 1) {
        items.push({
          xtype: 'tbtext',
          text: content,
          cls: 'current-breadcrumb'
        });
      } else {
        items.push({
          xtype: 'tbtext',
          text: content,
          href: url,
          handler: function(btn) {
            this.navigateToPath(url);
          }.bind(this)
        });

        if (index < segments.length - 1) {
          items.push({
            xtype: 'tbtext',
            text: '/',
            margin: '0 4px',
            cls: 'separator'
          });
        }
      }
    }, this);

    toolbar.removeAll();
    toolbar.add(items);
  },

  navigateToPath: function(path) {
    this.currentPath = path;
    this.down('#pathDisplay').setValue(path);
    this.updateBreadcrumbs();
  }
});

// Create the component
Ext.create('ProductNavigationView');`,
    typescript: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface BreadcrumbMap {
  [key: string]: string;
}

interface NavigationPath {
  path: string;
  label: string;
}

interface ProductNavigationProps {
  initialPath?: string;
  availablePaths?: NavigationPath[];
  onPathChange?: (path: string) => void;
}

function ProductNavigationExample({
  initialPath = '/shop/electronics/audio/wireless-headphones',
  availablePaths = [
    { path: '/shop', label: 'Shop' },
    { path: '/shop/electronics', label: 'Electronics' },
    { path: '/shop/electronics/audio', label: 'Audio Equipment' },
    { path: '/support', label: 'Support' },
    { path: '/support/documentation', label: 'Documentation' },
    { path: '/support/documentation/troubleshooting', label: 'Troubleshooting' }
  ],
  onPathChange
}: ProductNavigationProps): JSX.Element {
  const [currentPath, setCurrentPath] = useState<string>(initialPath);

  const breadcrumbMap: BreadcrumbMap = {
    shop: 'Shop',
    electronics: 'Electronics',
    audio: 'Audio Equipment',
    'wireless-headphones': 'Wireless Headphones',
    products: 'Products',
    categories: 'Categories',
    'noise-cancelling': 'Noise Cancelling',
    'bluetooth-earbuds': 'Bluetooth Earbuds',
    support: 'Support',
    documentation: 'Documentation',
    troubleshooting: 'Troubleshooting',
  };

  const buildBreadcrumbs = useCallback((path: string) => {
    const segments = path.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const url = '/' + segments.slice(0, index + 1).join('/');
      const content = breadcrumbMap[segment] || segment;
      return { content, url };
    }).filter(item => item && item.content);
  }, [breadcrumbMap]);

  const handleNavigation = useCallback((path: string) => {
    setCurrentPath(path);
    if (onPathChange) {
      onPathChange(path);
    }
  }, [onPathChange]);

  return (
    <div style={{ width: '600px' }}>
      <Breadcrumbs
        breadcrumbs={buildBreadcrumbs(currentPath)}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3>Current Path</h3>
        <code style={{ display: 'block', padding: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px' }}>
          {currentPath}
        </code>

        <div style={{ marginTop: '16px' }}>
          <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Quick Navigation:</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {availablePaths.map((navPath) => (
              <button
                key={navPath.path}
                onClick={() => handleNavigation(navPath.path)}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  backgroundColor: currentPath === navPath.path ? '#3b82f6' : 'white',
                  color: currentPath === navPath.path ? 'white' : '#374151',
                  cursor: 'pointer',
                }}
              >
                {navPath.path}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductNavigationExample;`
  },

  ecommerceNavigation: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState } from 'react';

function EcommerceNavigationExample() {
  const [category, setCategory] = useState('electronics');
  const [subcategory, setSubcategory] = useState('audio');
  const [product, setProduct] = useState('');

  const categories = {
    electronics: {
      name: 'Electronics',
      subcategories: {
        audio: { name: 'Audio Equipment', products: ['Wireless Headphones', 'Speakers', 'Earbuds'] },
        computers: { name: 'Computers', products: ['Laptops', 'Desktops', 'Tablets'] },
        phones: { name: 'Phones', products: ['Smartphones', 'Accessories', 'Cases'] },
      },
    },
    clothing: {
      name: 'Clothing',
      subcategories: {
        mens: { name: "Men's Clothing", products: ['Shirts', 'Pants', 'Jackets'] },
        womens: { name: "Women's Clothing", products: ['Dresses', 'Tops', 'Skirts'] },
        kids: { name: "Kids' Clothing", products: ['Toys', 'Games', 'School Supplies'] },
      },
    },
    home: {
      name: 'Home & Garden',
      subcategories: {
        furniture: { name: 'Furniture', products: ['Sofas', 'Chairs', 'Tables'] },
        decor: { name: 'Decor', products: ['Wall Art', 'Rugs', 'Lighting'] },
        kitchen: { name: 'Kitchen', products: ['Appliances', 'Cookware', 'Storage'] },
      },
    },
  };

  const buildBreadcrumbs = () => {
    const crumbs = [{ content: 'Home', url: '#home' }];

    if (category) {
      crumbs.push({ content: categories[category as keyof typeof categories].name, url: \`#\${category}\` });
    }

    if (category && subcategory) {
      crumbs.push({
        content: categories[category as keyof typeof categories].subcategories[subcategory as keyof typeof categories[typeof category]['subcategories']].name,
        url: \`#\${category}/\${subcategory}\`
      });
    }

    if (category && subcategory && product) {
      crumbs.push({ content: product, url: \`#\${category}/\${subcategory}/\${product}\` });
    }

    return crumbs.filter(item => item && item.content);
  };

  return (
    <div style={{ width: '700px' }}>
      <Breadcrumbs breadcrumbs={buildBreadcrumbs()} />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3>🛍️ Product Navigation</h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory('');
              setProduct('');
            }}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
          >
            <option value="">Select category</option>
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>

        {category && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Subcategory:
            </label>
            <select
              value={subcategory}
              onChange={(e) => {
                setSubcategory(e.target.value);
                setProduct('');
              }}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
            >
              <option value="">Select subcategory</option>
              {Object.entries(categories[category as keyof typeof categories].subcategories).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
        )}

        {category && subcategory && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Product:
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
            >
              <option value="">Select product</option>
              {categories[category as keyof typeof categories].subcategories[subcategory as keyof typeof categories[typeof category]['subcategories']].products.map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Navigation Path:</div>
          <code style={{ fontSize: '11px', color: '#374151' }}>
            /{category ? category : ''}{subcategory ? '/' + subcategory : ''}{product ? '/' + product.toLowerCase().replace(/\\s+/g, '-') : ''}
          </code>
        </div>
      </div>
    </div>
  );
}

export default EcommerceNavigationExample;`,
    vanilla: `<!-- E-commerce Navigation Breadcrumbs -->
<div class="ecommerce-navigation-container">
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list" id="ecommerce-breadcrumbs">
      <!-- Breadcrumbs will be dynamically generated -->
    </ol>
  </nav>

  <div class="ecommerce-control-panel">
    <h3>🛍️ Product Navigation</h3>

    <div class="control-group">
      <label>Category:</label>
      <select id="category-select">
        <option value="">Select category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="home">Home & Garden</option>
      </select>
    </div>

    <div class="control-group" id="subcategory-group" style="display: none;">
      <label>Subcategory:</label>
      <select id="subcategory-select">
        <option value="">Select subcategory</option>
      </select>
    </div>

    <div class="control-group" id="product-group" style="display: none;">
      <label>Product:</label>
      <select id="product-select">
        <option value="">Select product</option>
      </select>
    </div>

    <div class="navigation-path-display">
      <div class="path-label">Navigation Path:</div>
      <code id="navigation-path">/</code>
    </div>
  </div>
</div>

<script>
import { on, select } from '@cin7/vanilla-js';

const categories = {
  electronics: {
    name: 'Electronics',
    subcategories: {
      audio: { name: 'Audio Equipment', products: ['Wireless Headphones', 'Speakers', 'Earbuds'] },
      computers: { name: 'Computers', products: ['Laptops', 'Desktops', 'Tablets'] },
      phones: { name: 'Phones', products: ['Smartphones', 'Accessories', 'Cases'] },
    },
  },
  clothing: {
    name: 'Clothing',
    subcategories: {
      mens: { name: "Men's Clothing", products: ['Shirts', 'Pants', 'Jackets'] },
      womens: { name: "Women's Clothing", products: ['Dresses', 'Tops', 'Skirts'] },
      kids: { name: "Kids' Clothing", products: ['Toys', 'Games', 'School Supplies'] },
    },
  },
  home: {
    name: 'Home & Garden',
    subcategories: {
      furniture: { name: 'Furniture', products: ['Sofas', 'Chairs', 'Tables'] },
      decor: { name: 'Decor', products: ['Wall Art', 'Rugs', 'Lighting'] },
      kitchen: { name: 'Kitchen', products: ['Appliances', 'Cookware', 'Storage'] },
    },
  },
};

let currentCategory = '';
let currentSubcategory = '';
let currentProduct = '';

function updateBreadcrumbs() {
  const breadcrumbsList = select('#ecommerce-breadcrumbs');
  breadcrumbsList.innerHTML = '';

  const crumbs = [{ content: 'Home', url: '#home' }];

  if (currentCategory) {
    crumbs.push({ content: categories[currentCategory].name, url: \`#\${currentCategory}\` });
  }

  if (currentCategory && currentSubcategory) {
    crumbs.push({
      content: categories[currentCategory].subcategories[currentSubcategory].name,
      url: \`#\${currentCategory}/\${currentSubcategory}\`
    });
  }

  if (currentCategory && currentSubcategory && currentProduct) {
    crumbs.push({ content: currentProduct, url: \`#\${currentCategory}/\${currentSubcategory}/\${currentProduct}\` });
  }

  crumbs.forEach((crumb, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'breadcrumbs-item';

    if (index === crumbs.length - 1) {
      listItem.innerHTML = '<span class="breadcrumbs-current">' + crumb.content + '</span>';
    } else {
      listItem.innerHTML =
        '<a href="' + crumb.url + '" class="breadcrumbs-link">' + crumb.content + '</a>' +
        '<span class="breadcrumbs-separator" aria-hidden="true">/</span>';
    }

    breadcrumbsList.appendChild(listItem);
  });
}

function updateSubcategoryOptions() {
  const subcategorySelect = select('#subcategory-select');
  const subcategoryGroup = select('#subcategory-group');

  subcategorySelect.innerHTML = '<option value="">Select subcategory</option>';

  if (currentCategory && categories[currentCategory]) {
    Object.entries(categories[currentCategory].subcategories).forEach(([key, value]) => {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = value.name;
      subcategorySelect.appendChild(option);
    });
    subcategoryGroup.style.display = 'block';
  } else {
    subcategoryGroup.style.display = 'none';
  }
}

function updateProductOptions() {
  const productSelect = select('#product-select');
  const productGroup = select('#product-group');

  productSelect.innerHTML = '<option value="">Select product</option>';

  if (currentCategory && currentSubcategory &&
      categories[currentCategory] &&
      categories[currentCategory].subcategories[currentSubcategory]) {
    categories[currentCategory].subcategories[currentSubcategory].products.forEach((product) => {
      const option = document.createElement('option');
      option.value = product;
      option.textContent = product;
      productSelect.appendChild(option);
    });
    productGroup.style.display = 'block';
  } else {
    productGroup.style.display = 'none';
  }
}

function updateNavigationPath() {
  const pathDisplay = select('#navigation-path');
  const path = '/' +
    (currentCategory ? currentCategory : '') +
    (currentSubcategory ? '/' + currentSubcategory : '') +
    (currentProduct ? '/' + currentProduct.toLowerCase().replace(/\\s+/g, '-') : '');
  pathDisplay.textContent = path || '/';
}

// Event listeners
on('#category-select', 'change', (e) => {
  currentCategory = e.target.value;
  currentSubcategory = '';
  currentProduct = '';
  updateSubcategoryOptions();
  updateProductOptions();
  updateBreadcrumbs();
  updateNavigationPath();
});

on('#subcategory-select', 'change', (e) => {
  currentSubcategory = e.target.value;
  currentProduct = '';
  updateProductOptions();
  updateBreadcrumbs();
  updateNavigationPath();
});

on('#product-select', 'change', (e) => {
  currentProduct = e.target.value;
  updateBreadcrumbs();
  updateNavigationPath();
});

// Initialize
updateBreadcrumbs();
updateNavigationPath();
</script>

<style>
.ecommerce-navigation-container {
  width: 700px;
  margin: 0 auto;
}

.ecommerce-control-panel {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 6px;
}

.ecommerce-control-panel h3 {
  margin: 0 0 16px 0;
}

.control-group {
  margin-bottom: 16px;
}

.control-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

.control-group select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  width: 200px;
}

.navigation-path-display {
  padding: 12px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  margin-top: 16px;
}

.path-label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 8px;
}

.navigation-path-display code {
  font-size: 11px;
  color: #374151;
}
</style>`,
    extjs: `// ExtJS E-commerce Navigation
Ext.define('EcommerceNavigationView', {
  extend: 'Ext.panel.Panel',
  title: 'E-commerce Navigation',
  width: 700,
  bodyPadding: 20,

  initComponent: function() {
    var me = this;

    me.categories = {
      electronics: {
        name: 'Electronics',
        subcategories: {
          audio: { name: 'Audio Equipment', products: ['Wireless Headphones', 'Speakers', 'Earbuds'] },
          computers: { name: 'Computers', products: ['Laptops', 'Desktops', 'Tablets'] },
          phones: { name: 'Phones', products: ['Smartphones', 'Accessories', 'Cases'] }
        }
      },
      clothing: {
        name: 'Clothing',
        subcategories: {
          mens: { name: "Men's Clothing", products: ['Shirts', 'Pants', 'Jackets'] },
          womens: { name: "Women's Clothing", products: ['Dresses', 'Tops', 'Skirts'] },
          kids: { name: "Kids' Clothing", products: ['Toys', 'Games', 'School Supplies'] }
        }
      },
      home: {
        name: 'Home & Garden',
        subcategories: {
          furniture: { name: 'Furniture', products: ['Sofas', 'Chairs', 'Tables'] },
          decor: { name: 'Decor', products: ['Wall Art', 'Rugs', 'Lighting'] },
          kitchen: { name: 'Kitchen', products: ['Appliances', 'Cookware', 'Storage'] }
        }
      }
    };

    me.currentCategory = '';
    me.currentSubcategory = '';
    me.currentProduct = '';

    me.dockedItems = [{
      xtype: 'toolbar',
      dock: 'top',
      itemId: 'breadcrumbToolbar',
      items: []
    }];

    me.items = [{
      xtype: 'form',
      title: '🛍️ Product Navigation',
      items: [
        {
          xtype: 'combo',
          fieldLabel: 'Category',
          itemId: 'categoryCombo',
          store: Object.keys(me.categories).map(function(key) {
            return [key, me.categories[key].name];
          }),
          queryMode: 'local',
          displayField: 1,
          valueField: 0,
          editable: false,
          listeners: {
            change: function(combo, newValue) {
              me.currentCategory = newValue;
              me.currentSubcategory = '';
              me.currentProduct = '';
              me.updateSubcategoryCombo();
              me.updateProductCombo();
              me.updateBreadcrumbs();
              me.updateNavigationPath();
            }
          }
        },
        {
          xtype: 'combo',
          fieldLabel: 'Subcategory',
          itemId: 'subcategoryCombo',
          queryMode: 'local',
          displayField: 'name',
          valueField: 'key',
          editable: false,
          hidden: true,
          listeners: {
            change: function(combo, newValue) {
              me.currentSubcategory = newValue;
              me.currentProduct = '';
              me.updateProductCombo();
              me.updateBreadcrumbs();
              me.updateNavigationPath();
            }
          }
        },
        {
          xtype: 'combo',
          fieldLabel: 'Product',
          itemId: 'productCombo',
          queryMode: 'local',
          displayField: 'name',
          valueField: 'key',
          editable: false,
          hidden: true,
          listeners: {
            change: function(combo, newValue) {
              me.currentProduct = newValue;
              me.updateBreadcrumbs();
              me.updateNavigationPath();
            }
          }
        },
        {
          xtype: 'displayfield',
          fieldLabel: 'Navigation Path',
          itemId: 'pathDisplay',
          value: '/',
          fieldStyle: 'font-family: monospace; background: #f9fafb; padding: 8px; border-radius: 4px;'
        }
      ]
    }];

    me.callParent();
  },

  initComponent: function() {
    this.callParent();
    this.updateBreadcrumbs();
  },

  updateSubcategoryCombo: function() {
    var subcategoryCombo = this.down('#subcategoryCombo');

    if (this.currentCategory && this.categories[this.currentCategory]) {
      var subcategories = [];
      Object.keys(this.categories[this.currentCategory].subcategories).forEach(function(key) {
        subcategories.push([key, this.categories[this.currentCategory].subcategories[key].name]);
      }, this);

      subcategoryCombo.getStore().loadData(subcategories);
      subcategoryCombo.setHidden(false);
    } else {
      subcategoryCombo.setHidden(true);
    }
  },

  updateProductCombo: function() {
    var productCombo = this.down('#productCombo');

    if (this.currentCategory && this.currentSubcategory &&
        this.categories[this.currentCategory] &&
        this.categories[this.currentCategory].subcategories[this.currentSubcategory]) {
      var products = [];
      this.categories[this.currentCategory].subcategories[this.currentSubcategory].products.forEach(function(product) {
        products.push([product, product]);
      });

      productCombo.getStore().loadData(products);
      productCombo.setHidden(false);
    } else {
      productCombo.setHidden(true);
    }
  },

  updateBreadcrumbs: function() {
    var toolbar = this.down('#breadcrumbToolbar');
    var items = [];

    items.push({
      xtype: 'tbtext',
      text: 'Home',
      href: '#home'
    });

    if (this.currentCategory) {
      items.push({ xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' });
      items.push({
        xtype: 'tbtext',
        text: this.categories[this.currentCategory].name,
        href: '#' + this.currentCategory
      });
    }

    if (this.currentCategory && this.currentSubcategory) {
      items.push({ xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' });
      items.push({
        xtype: 'tbtext',
        text: this.categories[this.currentCategory].subcategories[this.currentSubcategory].name,
        href: '#' + this.currentCategory + '/' + this.currentSubcategory
      });
    }

    if (this.currentCategory && this.currentSubcategory && this.currentProduct) {
      items.push({ xtype: 'tbtext', text: '/', margin: '0 4px', cls: 'separator' });
      items.push({
        xtype: 'tbtext',
        text: this.currentProduct,
        href: '#' + this.currentCategory + '/' + this.currentSubcategory + '/' + this.currentProduct
      });
    }

    toolbar.removeAll();
    toolbar.add(items);
  },

  updateNavigationPath: function() {
    var pathDisplay = this.down('#pathDisplay');
    var path = '/' +
      (this.currentCategory ? this.currentCategory : '') +
      (this.currentSubcategory ? '/' + this.currentSubcategory : '') +
      (this.currentProduct ? '/' + this.currentProduct.toLowerCase().replace(/\\s+/g, '-') : '');
    pathDisplay.setValue(path || '/');
  }
});

// Create the component
Ext.create('EcommerceNavigationView');`,
    typescript: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';

interface Product {
  name: string;
  value: string;
}

interface Subcategory {
  name: string;
  products: Product[];
}

interface Category {
  name: string;
  subcategories: Record<string, Subcategory>;
}

interface Categories {
  [key: string]: Category;
}

interface BreadcrumbItem {
  content: string;
  url: string;
}

interface EcommerceNavigationProps {
  initialCategory?: string;
  initialSubcategory?: string;
  initialProduct?: string;
  onNavigationChange?: (breadcrumbs: BreadcrumbItem[]) => void;
}

function EcommerceNavigationExample({
  initialCategory = '',
  initialSubcategory = '',
  initialProduct = '',
  onNavigationChange
}: EcommerceNavigationProps): JSX.Element {
  const [category, setCategory] = useState<string>(initialCategory);
  const [subcategory, setSubcategory] = useState<string>(initialSubcategory);
  const [product, setProduct] = useState<string>(initialProduct);

  const categories: Categories = {
    electronics: {
      name: 'Electronics',
      subcategories: {
        audio: { name: 'Audio Equipment', products: ['Wireless Headphones', 'Speakers', 'Earbuds'] },
        computers: { name: 'Computers', products: ['Laptops', 'Desktops', 'Tablets'] },
        phones: { name: 'Phones', products: ['Smartphones', 'Accessories', 'Cases'] },
      },
    },
    clothing: {
      name: 'Clothing',
      subcategories: {
        mens: { name: "Men's Clothing", products: ['Shirts', 'Pants', 'Jackets'] },
        womens: { name: "Women's Clothing", products: ['Dresses', 'Tops', 'Skirts'] },
        kids: { name: "Kids' Clothing", products: ['Toys', 'Games', 'School Supplies'] },
      },
    },
    home: {
      name: 'Home & Garden',
      subcategories: {
        furniture: { name: 'Furniture', products: ['Sofas', 'Chairs', 'Tables'] },
        decor: { name: 'Decor', products: ['Wall Art', 'Rugs', 'Lighting'] },
        kitchen: { name: 'Kitchen', products: ['Appliances', 'Cookware', 'Storage'] },
      },
    },
  };

  const buildBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ content: 'Home', url: '#home' }];

    if (category) {
      crumbs.push({ content: categories[category].name, url: \`#\${category}\` });
    }

    if (category && subcategory) {
      crumbs.push({
        content: categories[category].subcategories[subcategory].name,
        url: \`#\${category}/\${subcategory}\`
      });
    }

    if (category && subcategory && product) {
      crumbs.push({ content: product, url: \`#\${category}/\${subcategory}/\${product}\` });
    }

    return crumbs.filter(item => item && item.content);
  }, [category, subcategory, product, categories]);

  const handleCategoryChange = useCallback((newCategory: string) => {
    setCategory(newCategory);
    setSubcategory('');
    setProduct('');
  }, []);

  const handleSubcategoryChange = useCallback((newSubcategory: string) => {
    setSubcategory(newSubcategory);
    setProduct('');
  }, []);

  useEffect(() => {
    if (onNavigationChange) {
      onNavigationChange(buildBreadcrumbs());
    }
  }, [buildBreadcrumbs, onNavigationChange]);

  const navigationPath = '/' +
    (category ? category : '') +
    (subcategory ? '/' + subcategory : '') +
    (product ? '/' + product.toLowerCase().replace(/\\s+/g, '-') : '');

  return (
    <div style={{ width: '700px' }}>
      <Breadcrumbs breadcrumbs={buildBreadcrumbs()} />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
        <h3>🛍️ Product Navigation</h3>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
          >
            <option value="">Select category</option>
            {Object.entries(categories).map(([key, value]) => (
              <option key={key} value={key}>{value.name}</option>
            ))}
          </select>
        </div>

        {category && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Subcategory:
            </label>
            <select
              value={subcategory}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
            >
              <option value="">Select subcategory</option>
              {Object.entries(categories[category].subcategories).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
        )}

        {category && subcategory && (
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Product:
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #d1d5db', width: '200px' }}
            >
              <option value="">Select product</option>
              {categories[category].subcategories[subcategory].products.map((product) => (
                <option key={product} value={product}>{product}</option>
              ))}
            </select>
          </div>
        )}

        <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>Navigation Path:</div>
          <code style={{ fontSize: '11px', color: '#374151' }}>
            {navigationPath || '/'}
          </code>
        </div>
      </div>
    </div>
  );
}

export default EcommerceNavigationExample;`
  },

  adminPanel: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState } from 'react';

function AdminPanelExample() {
  const [section, setSection] = useState('dashboard');
  const [subsection, setSubsection] = useState('');
  const [detail, setDetail] = useState('');

  const adminStructure = {
    dashboard: { name: 'Dashboard', subsections: {} },
    products: {
      name: 'Products',
      subsections: {
        manage: { name: 'Manage Products', details: ['Add New', 'Bulk Edit', 'Import/Export'] },
        categories: { name: 'Categories', details: ['Create Category', 'Organize', 'Settings'] },
        inventory: { name: 'Inventory', details: ['Stock Levels', 'Low Stock Alerts', 'Warehouse'] },
      },
    },
    orders: {
      name: 'Orders',
      subsections: {
        manage: { name: 'Manage Orders', details: ['Pending', 'Processing', 'Shipped'] },
        returns: { name: 'Returns', details: ['Return Requests', 'Refunds', 'Exchange'] },
        analytics: { name: 'Order Analytics', details: ['Sales Reports', 'Trends', 'Forecasts'] },
      },
    },
    customers: {
      name: 'Customers',
      subsections: {
        manage: { name: 'Customer Management', details: ['View All', 'Search', 'Segments'] },
        groups: { name: 'Customer Groups', details: ['VIP', 'Wholesale', 'Regular'] },
        support: { name: 'Customer Support', details: ['Tickets', 'Live Chat', 'FAQ'] },
      },
    },
    settings: {
      name: 'Settings',
      subsections: {
        general: { name: 'General', details: ['Store Info', 'Regions', 'Currency'] },
        payment: { name: 'Payment', details: ['Gateways', 'Methods', 'Security'] },
        shipping: { name: 'Shipping', details: ['Zones', 'Rates', 'Carriers'] },
      },
    },
  };

  const buildBreadcrumbs = () => {
    const crumbs = [{ content: 'Admin', url: '#admin' }];

    if (section) {
      crumbs.push({ content: adminStructure[section as keyof typeof adminStructure].name, url: \`#\${section}\` });
    }

    if (section && subsection && adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']]) {
      crumbs.push({
        content: adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].name,
        url: \`#\${section}/\${subsection}\`
      });
    }

    if (section && subsection && detail && adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details) {
      const detailName = adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details.find(d => d.toLowerCase().replace(/\\s+/g, '-') === detail);
      if (detailName) {
        crumbs.push({ content: detailName, url: \`#\${section}/\${subsection}/\${detail}\` });
      }
    }

    return crumbs.filter(item => item && item.content);
  };

  return (
    <div style={{ width: '750px' }}>
      <Breadcrumbs breadcrumbs={buildBreadcrumbs()} />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#1f2937',
        borderRadius: '6px',
        color: 'white'
      }}>
        <h3>🎛️ Admin Control Panel</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {Object.entries(adminStructure).map(([key, value]) => (
            <button
              key={key}
              onClick={() => {
                setSection(key);
                setSubsection('');
                setDetail('');
              }}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: section === key ? '2px solid #3b82f6' : '1px solid #4b5563',
                backgroundColor: section === key ? '#374151' : '#1f2937',
                color: 'white',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                {key === 'dashboard' ? '📊' : key === 'products' ? '📦' : key === 'orders' ? '🛒' : key === 'customers' ? '👥' : '⚙️'}
              </div>
              <div style={{ fontSize: '12px' }}>{value.name}</div>
            </button>
          ))}
        </div>

        {section && adminStructure[section as keyof typeof adminStructure].subsections && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Subsections:</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.entries(adminStructure[section as keyof typeof adminStructure].subsections).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSubsection(key);
                    setDetail('');
                  }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: subsection === key ? '1px solid #3b82f6' : '1px solid #4b5563',
                    backgroundColor: subsection === key ? '#3b82f6' : '#374151',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {section && subsection && adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details && (
          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Actions:</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {adminStructure[section as keyof typeof adminStructure].subsections[subsection as keyof typeof adminStructure[typeof section]['subsections']].details.map((detailName) => (
                <button
                  key={detailName}
                  onClick={() => setDetail(detailName.toLowerCase().replace(/\\s+/g, '-'))}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: detail === detailName.toLowerCase().replace(/\\s+/g, '-') ? '1px solid #10b981' : '1px solid #4b5563',
                    backgroundColor: detail === detailName.toLowerCase().replace(/\\s+/g, '-') ? '#10b981' : '#1f2937',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '11px',
                  }}
                >
                  {detailName}
                </button>
              ))}
            </div>
          </div>
        )}

        {detail && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#065f46',
            borderRadius: '4px',
            border: '1px solid #10b981'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>✅ Ready to execute: {detail.replace(/-/g, ' ').toUpperCase()}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanelExample;`,
    vanilla: `<!-- Admin Panel Breadcrumbs -->
<div class="admin-panel-container">
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list" id="admin-breadcrumbs">
      <!-- Breadcrumbs will be dynamically generated -->
    </ol>
  </nav>

  <div class="admin-control-panel">
    <h3>🎛️ Admin Control Panel</h3>

    <div class="main-sections">
      <button data-section="dashboard" class="section-btn">
        <div class="section-icon">📊</div>
        <div class="section-name">Dashboard</div>
      </button>
      <button data-section="products" class="section-btn">
        <div class="section-icon">📦</div>
        <div class="section-name">Products</div>
      </button>
      <button data-section="orders" class="section-btn">
        <div class="section-icon">🛒</div>
        <div class="section-name">Orders</div>
      </button>
      <button data-section="customers" class="section-btn">
        <div class="section-icon">👥</div>
        <div class="section-name">Customers</div>
      </button>
      <button data-section="settings" class="section-btn">
        <div class="section-icon">⚙️</div>
        <div class="section-name">Settings</div>
      </button>
    </div>

    <div class="subsection-controls" id="subsection-controls" style="display: none;">
      <div class="control-label">Subsections:</div>
      <div class="subsection-buttons" id="subsection-buttons">
        <!-- Subsection buttons will be dynamically generated -->
      </div>
    </div>

    <div class="detail-controls" id="detail-controls" style="display: none;">
      <div class="control-label">Actions:</div>
      <div class="detail-buttons" id="detail-buttons">
        <!-- Detail buttons will be dynamically generated -->
      </div>
    </div>

    <div class="execution-status" id="execution-status" style="display: none;">
      <div class="status-text">✅ Ready to execute: <span id="execution-text"></span></div>
    </div>
  </div>
</div>

<script>
import { on, select } from '@cin7/vanilla-js';

const adminStructure = {
  dashboard: { name: 'Dashboard', subsections: {} },
  products: {
    name: 'Products',
    subsections: {
      manage: { name: 'Manage Products', details: ['Add New', 'Bulk Edit', 'Import/Export'] },
      categories: { name: 'Categories', details: ['Create Category', 'Organize', 'Settings'] },
      inventory: { name: 'Inventory', details: ['Stock Levels', 'Low Stock Alerts', 'Warehouse'] },
    },
  },
  orders: {
    name: 'Orders',
    subsections: {
      manage: { name: 'Manage Orders', details: ['Pending', 'Processing', 'Shipped'] },
      returns: { name: 'Returns', details: ['Return Requests', 'Refunds', 'Exchange'] },
      analytics: { name: 'Order Analytics', details: ['Sales Reports', 'Trends', 'Forecasts'] },
    },
  },
  customers: {
    name: 'Customers',
    subsections: {
      manage: { name: 'Customer Management', details: ['View All', 'Search', 'Segments'] },
      groups: { name: 'Customer Groups', details: ['VIP', 'Wholesale', 'Regular'] },
      support: { name: 'Customer Support', details: ['Tickets', 'Live Chat', 'FAQ'] },
    },
  },
  settings: {
    name: 'Settings',
    subsections: {
      general: { name: 'General', details: ['Store Info', 'Regions', 'Currency'] },
      payment: { name: 'Payment', details: ['Gateways', 'Methods', 'Security'] },
      shipping: { name: 'Shipping', details: ['Zones', 'Rates', 'Carriers'] },
    },
  },
};

let currentSection = '';
let currentSubsection = '';
let currentDetail = '';

function updateBreadcrumbs() {
  const breadcrumbsList = select('#admin-breadcrumbs');
  breadcrumbsList.innerHTML = '';

  const crumbs = [{ content: 'Admin', url: '#admin' }];

  if (currentSection) {
    crumbs.push({ content: adminStructure[currentSection].name, url: \`#\${currentSection}\` });
  }

  if (currentSection && currentSubsection && adminStructure[currentSection].subsections[currentSubsection]) {
    crumbs.push({
      content: adminStructure[currentSection].subsections[currentSubsection].name,
      url: \`#\${currentSection}/\${currentSubsection}\`
    });
  }

  if (currentSection && currentSubsection && currentDetail &&
      adminStructure[currentSection].subsections[currentSubsection].details) {
    const detailName = adminStructure[currentSection].subsections[currentSubsection].details
      .find(d => d.toLowerCase().replace(/\\s+/g, '-') === currentDetail);
    if (detailName) {
      crumbs.push({ content: detailName, url: \`#\${currentSection}/\${currentSubsection}/\${currentDetail}\` });
    }
  }

  crumbs.forEach((crumb, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'breadcrumbs-item';

    if (index === crumbs.length - 1) {
      listItem.innerHTML = '<span class="breadcrumbs-current">' + crumb.content + '</span>';
    } else {
      listItem.innerHTML =
        '<a href="' + crumb.url + '" class="breadcrumbs-link">' + crumb.content + '</a>' +
        '<span class="breadcrumbs-separator" aria-hidden="true">/</span>';
    }

    breadcrumbsList.appendChild(listItem);
  });
}

function updateSubsections() {
  const subsectionControls = select('#subsection-controls');
  const subsectionButtons = select('#subsection-buttons');

  subsectionButtons.innerHTML = '';

  if (currentSection && adminStructure[currentSection].subsections) {
    Object.entries(adminStructure[currentSection].subsections).forEach(([key, value]) => {
      const button = document.createElement('button');
      button.className = 'subsection-btn';
      button.textContent = value.name;
      button.onclick = () => {
        currentSubsection = key;
        currentDetail = '';
        updateSubsections();
        updateDetails();
        updateBreadcrumbs();
        updateExecutionStatus();
      };

      if (currentSubsection === key) {
        button.classList.add('active');
      }

      subsectionButtons.appendChild(button);
    });
    subsectionControls.style.display = 'block';
  } else {
    subsectionControls.style.display = 'none';
  }
}

function updateDetails() {
  const detailControls = select('#detail-controls');
  const detailButtons = select('#detail-buttons');

  detailButtons.innerHTML = '';

  if (currentSection && currentSubsection &&
      adminStructure[currentSection].subsections[currentSubsection] &&
      adminStructure[currentSection].subsections[currentSubsection].details) {
    adminStructure[currentSection].subsections[currentSubsection].details.forEach((detailName) => {
      const button = document.createElement('button');
      button.className = 'detail-btn';
      button.textContent = detailName;
      button.onclick = () => {
        currentDetail = detailName.toLowerCase().replace(/\\s+/g, '-');
        updateDetails();
        updateBreadcrumbs();
        updateExecutionStatus();
      };

      if (currentDetail === detailName.toLowerCase().replace(/\\s+/g, '-')) {
        button.classList.add('active');
      }

      detailButtons.appendChild(button);
    });
    detailControls.style.display = 'block';
  } else {
    detailControls.style.display = 'none';
  }
}

function updateExecutionStatus() {
  const executionStatus = select('#execution-status');
  const executionText = select('#execution-text');

  if (currentDetail) {
    executionText.textContent = currentDetail.replace(/-/g, ' ').toUpperCase();
    executionStatus.style.display = 'block';
  } else {
    executionStatus.style.display = 'none';
  }
}

function updateSectionButtons() {
  document.querySelectorAll('.section-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === currentSection);
  });
}

// Event listeners
on('.main-sections', 'click', (e) => {
  const sectionBtn = e.target.closest('.section-btn');
  if (sectionBtn) {
    currentSection = sectionBtn.dataset.section;
    currentSubsection = '';
    currentDetail = '';
    updateSectionButtons();
    updateSubsections();
    updateDetails();
    updateBreadcrumbs();
    updateExecutionStatus();
  }
});

// Initialize
updateBreadcrumbs();
</script>

<style>
.admin-panel-container {
  width: 750px;
  margin: 0 auto;
}

.admin-control-panel {
  margin-top: 20px;
  padding: 20px;
  background-color: #1f2937;
  border-radius: 6px;
  color: white;
}

.admin-control-panel h3 {
  margin: 0 0 20px 0;
}

.main-sections {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}

.section-btn {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #4b5563;
  background-color: #1f2937;
  color: white;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
}

.section-btn:hover {
  background-color: #374151;
}

.section-btn.active {
  border: 2px solid #3b82f6;
  background-color: #374151;
}

.section-icon {
  font-size: 14px;
  margin-bottom: 4px;
}

.section-name {
  font-size: 12px;
}

.control-label {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 8px;
}

.subsection-buttons,
.detail-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.subsection-btn,
.detail-btn {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #4b5563;
  background-color: #374151;
  color: white;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.subsection-btn:hover,
.detail-btn:hover {
  background-color: #4b5563;
}

.subsection-btn.active,
.detail-btn.active {
  border: 1px solid #3b82f6;
  background-color: #3b82f6;
}

.detail-btn.active {
  border: 1px solid #10b981;
  background-color: #10b981;
}

.execution-status {
  margin-top: 16px;
  padding: 12px;
  background-color: #065f46;
  border-radius: 4px;
  border: 1px solid #10b981;
}

.status-text {
  font-size: 12px;
  font-weight: bold;
}
</style>`,
    extjs: `// ExtJS Admin Panel Navigation
Ext.define('AdminPanelView', {
  extend: 'Ext.panel.Panel',
  title: 'Admin Control Panel',
  width: 750,
  bodyPadding: 20,
  bodyStyle: 'background-color: #1f2937; color: white;',

  initComponent: function() {
    var me = this;

    me.adminStructure = {
      dashboard: { name: 'Dashboard', subsections: {} },
      products: {
        name: 'Products',
        subsections: {
          manage: { name: 'Manage Products', details: ['Add New', 'Bulk Edit', 'Import/Export'] },
          categories: { name: 'Categories', details: ['Create Category', 'Organize', 'Settings'] },
          inventory: { name: 'Inventory', details: ['Stock Levels', 'Low Stock Alerts', 'Warehouse'] }
        }
      },
      orders: {
        name: 'Orders',
        subsections: {
          manage: { name: 'Manage Orders', details: ['Pending', 'Processing', 'Shipped'] },
          returns: { name: 'Returns', details: ['Return Requests', 'Refunds', 'Exchange'] },
          analytics: { name: 'Order Analytics', details: ['Sales Reports', 'Trends', 'Forecasts'] }
        }
      },
      customers: {
        name: 'Customers',
        subsections: {
          manage: { name: 'Customer Management', details: ['View All', 'Search', 'Segments'] },
          groups: { name: 'Customer Groups', details: ['VIP', 'Wholesale', 'Regular'] },
          support: { name: 'Customer Support', details: ['Tickets', 'Live Chat', 'FAQ'] }
        }
      },
      settings: {
        name: 'Settings',
        subsections: {
          general: { name: 'General', details: ['Store Info', 'Regions', 'Currency'] },
          payment: { name: 'Payment', details: ['Gateways', 'Methods', 'Security'] },
          shipping: { name: 'Shipping', details: ['Zones', 'Rates', 'Carriers'] }
        }
      }
    };

    me.currentSection = '';
    me.currentSubsection = '';
    me.currentDetail = '';

    me.dockedItems = [{
      xtype: 'toolbar',
      dock: 'top',
      itemId: 'breadcrumbToolbar',
      items: [],
      style: 'background-color: #374151;'
    }];

    me.items = [{
      xtype: 'container',
      layout: 'vbox',
      items: [
        {
          xtype: 'container',
          layout: 'hbox',
          defaults: { margin: '0 6px 12px 0' },
          items: [
            {
              xtype: 'button',
              text: '📊 Dashboard',
              iconCls: 'x-fa fa-tachometer-alt',
              section: 'dashboard',
              handler: function(btn) { me.selectSection(btn.section); }
            },
            {
              xtype: 'button',
              text: '📦 Products',
              iconCls: 'x-fa fa-box',
              section: 'products',
              handler: function(btn) { me.selectSection(btn.section); }
            },
            {
              xtype: 'button',
              text: '🛒 Orders',
              iconCls: 'x-fa fa-shopping-cart',
              section: 'orders',
              handler: function(btn) { me.selectSection(btn.section); }
            },
            {
              xtype: 'button',
              text: '👥 Customers',
              iconCls: 'x-fa fa-users',
              section: 'customers',
              handler: function(btn) { me.selectSection(btn.section); }
            },
            {
              xtype: 'button',
              text: '⚙️ Settings',
              iconCls: 'x-fa fa-cog',
              section: 'settings',
              handler: function(btn) { me.selectSection(btn.section); }
            }
          ]
        },
        {
          xtype: 'container',
          itemId: 'subsectionContainer',
          hidden: true,
          layout: 'vbox',
          items: [
            {
              xtype: 'displayfield',
              value: 'Subsections:',
              fieldStyle: 'color: #9ca3af; font-size: 12px; margin-bottom: 8px;',
              hideLabel: true
            },
            {
              xtype: 'container',
              itemId: 'subsectionButtons',
              layout: 'hbox',
              defaults: { margin: '0 8px 8px 0' }
            }
          ]
        },
        {
          xtype: 'container',
          itemId: 'detailContainer',
          hidden: true,
          layout: 'vbox',
          items: [
            {
              xtype: 'displayfield',
              value: 'Actions:',
              fieldStyle: 'color: #9ca3af; font-size: 12px; margin-bottom: 8px;',
              hideLabel: true
            },
            {
              xtype: 'container',
              itemId: 'detailButtons',
              layout: 'hbox',
              defaults: { margin: '0 8px 8px 0' }
            }
          ]
        },
        {
          xtype: 'container',
          itemId: 'executionContainer',
          hidden: true,
          style: 'margin-top: 16px; padding: 12px; background-color: #065f46; border-radius: 4px; border: 1px solid #10b981;',
          items: [
            {
              xtype: 'displayfield',
              itemId: 'executionStatus',
              value: '✅ Ready to execute: SELECTED ACTION',
              fieldStyle: 'color: white; font-size: 12px; font-weight: bold;',
              hideLabel: true
            }
          ]
        }
      ]
    }];

    me.callParent();
  },

  initComponent: function() {
    this.callParent();
    this.updateBreadcrumbs();
  },

  selectSection: function(section) {
    this.currentSection = section;
    this.currentSubsection = '';
    this.currentDetail = '';
    this.updateSectionButtons();
    this.updateSubsections();
    this.updateDetails();
    this.updateBreadcrumbs();
    this.updateExecutionStatus();
  },

  selectSubsection: function(subsection) {
    this.currentSubsection = subsection;
    this.currentDetail = '';
    this.updateSubsections();
    this.updateDetails();
    this.updateBreadcrumbs();
    this.updateExecutionStatus();
  },

  selectDetail: function(detail) {
    this.currentDetail = detail.toLowerCase().replace(/\\s+/g, '-');
    this.updateDetails();
    this.updateBreadcrumbs();
    this.updateExecutionStatus();
  },

  updateSectionButtons: function() {
    var me = this;
    this.down('container[layout=hbox]').items.each(function(btn) {
      btn.setUI(me.currentSection === btn.section ? 'confirm' : 'default');
    });
  },

  updateSubsections: function() {
    var container = this.down('#subsectionContainer');
    var buttonContainer = this.down('#subsectionButtons');

    buttonContainer.removeAll();

    if (this.currentSection && this.adminStructure[this.currentSection].subsections) {
      var subsections = this.adminStructure[this.currentSection].subsections;
      Object.keys(subsections).forEach(function(key) {
        buttonContainer.add({
          xtype: 'button',
          text: subsections[key].name,
          subsection: key,
          handler: function(btn) { this.selectSubsection(btn.subsection); }.bind(this),
          ui: this.currentSubsection === key ? 'confirm' : 'default'
        });
      }, this);
      container.setHidden(false);
    } else {
      container.setHidden(true);
    }
  },

  updateDetails: function() {
    var container = this.down('#detailContainer');
    var buttonContainer = this.down('#detailButtons');

    buttonContainer.removeAll();

    if (this.currentSection && this.currentSubsection &&
        this.adminStructure[this.currentSection].subsections[this.currentSubsection] &&
        this.adminStructure[this.currentSection].subsections[this.currentSubsection].details) {

      var details = this.adminStructure[this.currentSection].subsections[this.currentSubsection].details;
      details.forEach(function(detailName) {
        var detailKey = detailName.toLowerCase().replace(/\\s+/g, '-');
        buttonContainer.add({
          xtype: 'button',
          text: detailName,
          detail: detailKey,
          handler: function(btn) { this.selectDetail(btn.detail); }.bind(this),
          ui: this.currentDetail === detailKey ? 'success' : 'default'
        });
      }, this);
      container.setHidden(false);
    } else {
      container.setHidden(true);
    }
  },

  updateBreadcrumbs: function() {
    var toolbar = this.down('#breadcrumbToolbar');
    var items = [];

    items.push({
      xtype: 'tbtext',
      text: 'Admin',
      href: '#admin',
      style: 'color: white;'
    });

    if (this.currentSection) {
      items.push({ xtype: 'tbtext', text: '/', margin: '0 4px', style: 'color: #9ca3af;' });
      items.push({
        xtype: 'tbtext',
        text: this.adminStructure[this.currentSection].name,
        href: '#' + this.currentSection,
        style: 'color: white;'
      });
    }

    if (this.currentSection && this.currentSubsection &&
        this.adminStructure[this.currentSection].subsections[this.currentSubsection]) {
      items.push({ xtype: 'tbtext', text: '/', margin: '0 4px', style: 'color: #9ca3af;' });
      items.push({
        xtype: 'tbtext',
        text: this.adminStructure[this.currentSection].subsections[this.currentSubsection].name,
        href: '#' + this.currentSection + '/' + this.currentSubsection,
        style: 'color: white;'
      });
    }

    if (this.currentSection && this.currentSubsection && this.currentDetail &&
        this.adminStructure[this.currentSection].subsections[this.currentSubsection].details) {
      var detailName = this.adminStructure[this.currentSection].subsections[this.currentSubsection].details
        .find(d => d.toLowerCase().replace(/\\s+/g, '-') === this.currentDetail);
      if (detailName) {
        items.push({ xtype: 'tbtext', text: '/', margin: '0 4px', style: 'color: #9ca3af;' });
        items.push({
          xtype: 'tbtext',
          text: detailName,
          href: '#' + this.currentSection + '/' + this.currentSubsection + '/' + this.currentDetail,
          style: 'color: white;'
        });
      }
    }

    toolbar.removeAll();
    toolbar.add(items);
  },

  updateExecutionStatus: function() {
    var container = this.down('#executionContainer');
    var statusField = this.down('#executionStatus');

    if (this.currentDetail) {
      statusField.setValue('✅ Ready to execute: ' + this.currentDetail.replace(/-/g, ' ').toUpperCase());
      container.setHidden(false);
    } else {
      container.setHidden(true);
    }
  }
});

// Create the component
Ext.create('AdminPanelView');`,
    typescript: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';

interface Detail {
  name: string;
  key: string;
}

interface Subsection {
  name: string;
  details: string[];
}

interface Section {
  name: string;
  subsections: Record<string, Subsection>;
}

interface AdminStructure {
  [key: string]: Section;
}

interface BreadcrumbItem {
  content: string;
  url: string;
}

interface AdminPanelProps {
  initialSection?: string;
  initialSubsection?: string;
  initialDetail?: string;
  onNavigationChange?: (breadcrumbs: BreadcrumbItem[]) => void;
}

function AdminPanelExample({
  initialSection = 'dashboard',
  initialSubsection = '',
  initialDetail = '',
  onNavigationChange
}: AdminPanelProps): JSX.Element {
  const [section, setSection] = useState<string>(initialSection);
  const [subsection, setSubsection] = useState<string>(initialSubsection);
  const [detail, setDetail] = useState<string>(initialDetail);

  const adminStructure: AdminStructure = {
    dashboard: { name: 'Dashboard', subsections: {} },
    products: {
      name: 'Products',
      subsections: {
        manage: { name: 'Manage Products', details: ['Add New', 'Bulk Edit', 'Import/Export'] },
        categories: { name: 'Categories', details: ['Create Category', 'Organize', 'Settings'] },
        inventory: { name: 'Inventory', details: ['Stock Levels', 'Low Stock Alerts', 'Warehouse'] },
      },
    },
    orders: {
      name: 'Orders',
      subsections: {
        manage: { name: 'Manage Orders', details: ['Pending', 'Processing', 'Shipped'] },
        returns: { name: 'Returns', details: ['Return Requests', 'Refunds', 'Exchange'] },
        analytics: { name: 'Order Analytics', details: ['Sales Reports', 'Trends', 'Forecasts'] },
      },
    },
    customers: {
      name: 'Customers',
      subsections: {
        manage: { name: 'Customer Management', details: ['View All', 'Search', 'Segments'] },
        groups: { name: 'Customer Groups', details: ['VIP', 'Wholesale', 'Regular'] },
        support: { name: 'Customer Support', details: ['Tickets', 'Live Chat', 'FAQ'] },
      },
    },
    settings: {
      name: 'Settings',
      subsections: {
        general: { name: 'General', details: ['Store Info', 'Regions', 'Currency'] },
        payment: { name: 'Payment', details: ['Gateways', 'Methods', 'Security'] },
        shipping: { name: 'Shipping', details: ['Zones', 'Rates', 'Carriers'] },
      },
    },
  };

  const buildBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [{ content: 'Admin', url: '#admin' }];

    if (section) {
      crumbs.push({ content: adminStructure[section].name, url: \`#\${section}\` });
    }

    if (section && subsection && adminStructure[section].subsections[subsection]) {
      crumbs.push({
        content: adminStructure[section].subsections[subsection].name,
        url: \`#\${section}/\${subsection}\`
      });
    }

    if (section && subsection && detail && adminStructure[section].subsections[subsection].details) {
      const detailName = adminStructure[section].subsections[subsection].details
        .find(d => d.toLowerCase().replace(/\\s+/g, '-') === detail);
      if (detailName) {
        crumbs.push({ content: detailName, url: \`#\${section}/\${subsection}/\${detail}\` });
      }
    }

    return crumbs.filter(item => item && item.content);
  }, [section, subsection, detail, adminStructure]);

  const handleSectionChange = useCallback((newSection: string) => {
    setSection(newSection);
    setSubsection('');
    setDetail('');
  }, []);

  const handleSubsectionChange = useCallback((newSubsection: string) => {
    setSubsection(newSubsection);
    setDetail('');
  }, []);

  const handleDetailChange = useCallback((newDetail: string) => {
    setDetail(newDetail);
  }, []);

  useEffect(() => {
    if (onNavigationChange) {
      onNavigationChange(buildBreadcrumbs());
    }
  }, [buildBreadcrumbs, onNavigationChange]);

  return (
    <div style={{ width: '750px' }}>
      <Breadcrumbs breadcrumbs={buildBreadcrumbs()} />

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#1f2937',
        borderRadius: '6px',
        color: 'white'
      }}>
        <h3>🎛️ Admin Control Panel</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
          {Object.entries(adminStructure).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleSectionChange(key)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: section === key ? '2px solid #3b82f6' : '1px solid #4b5563',
                backgroundColor: section === key ? '#374151' : '#1f2937',
                color: 'white',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                {key === 'dashboard' ? '📊' : key === 'products' ? '📦' : key === 'orders' ? '🛒' : key === 'customers' ? '👥' : '⚙️'}
              </div>
              <div style={{ fontSize: '12px' }}>{value.name}</div>
            </button>
          ))}
        </div>

        {section && adminStructure[section].subsections && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Subsections:</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {Object.entries(adminStructure[section].subsections).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => handleSubsectionChange(key)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    border: subsection === key ? '1px solid #3b82f6' : '1px solid #4b5563',
                    backgroundColor: subsection === key ? '#3b82f6' : '#374151',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {value.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {section && subsection && adminStructure[section].subsections[subsection].details && (
          <div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>Actions:</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {adminStructure[section].subsections[subsection].details.map((detailName) => (
                <button
                  key={detailName}
                  onClick={() => handleDetailChange(detailName.toLowerCase().replace(/\\s+/g, '-'))}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: detail === detailName.toLowerCase().replace(/\\s+/g, '-') ? '1px solid #10b981' : '1px solid #4b5563',
                    backgroundColor: detail === detailName.toLowerCase().replace(/\\s+/g, '-') ? '#10b981' : '#1f2937',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '11px',
                  }}
                >
                  {detailName}
                </button>
              ))}
            </div>
          </div>
        )}

        {detail && (
          <div style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#065f46',
            borderRadius: '4px',
            border: '1px solid #10b981'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
              ✅ Ready to execute: {detail.replace(/-/g, ' ').toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanelExample;`
  },

  documentationSite: {
    react: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState } from 'react';

function DocumentationSiteExample() {
  const [path, setPath] = useState(['docs', 'getting-started', 'installation']);

  const docsStructure = {
    docs: {
      name: 'Documentation',
      children: {
        'getting-started': {
          name: 'Getting Started',
          children: {
            installation: { name: 'Installation' },
            'quick-start': { name: 'Quick Start' },
            'basic-concepts': { name: 'Basic Concepts' },
          },
        },
        components: {
          name: 'Components',
          children: {
            buttons: { name: 'Buttons' },
            forms: { name: 'Forms' },
            navigation: { name: 'Navigation' },
            layout: { name: 'Layout' },
          },
        },
        guides: {
          name: 'Guides',
          children: {
            styling: { name: 'Styling' },
            theming: { name: 'Theming' },
            accessibility: { name: 'Accessibility' },
            'best-practices': { name: 'Best Practices' },
          },
        },
        api: {
          name: 'API Reference',
          children: {
            'core-api': { name: 'Core API' },
            hooks: { name: 'Hooks' },
            utilities: { name: 'Utilities' },
          },
        },
      },
    },
    tutorials: {
      name: 'Tutorials',
      children: {
        beginner: {
          name: 'Beginner',
          children: {
            'first-app': { name: 'Your First App' },
            'common-patterns': { name: 'Common Patterns' },
          },
        },
        advanced: {
          name: 'Advanced',
          children: {
            performance: { name: 'Performance' },
            'custom-components': { name: 'Custom Components' },
          },
        },
      },
    },
  };

  const buildBreadcrumbs = () => {
    const crumbs: Array<{ content: string; url: string }> = [];

    let current = docsStructure as any;
    let currentUrl = '';

    for (let i = 0; i < path.length; i++) {
      const segment = path[i];
      currentUrl += '/' + segment;

      if (i === 0) {
        crumbs.push({ content: current.name, url: currentUrl });
      } else if (current.children && current.children[segment]) {
        crumbs.push({ content: current.children[segment].name, url: currentUrl });
        current = current.children[segment];
      } else if (current[segment]) {
        crumbs.push({ content: current[segment].name, url: currentUrl });
        current = current[segment];
      }
    }

    return crumbs.filter(item => item && item.content);
  };

  const navigateTo = (newPath: string[]) => {
    setPath(newPath);
  };

  return (
    <div style={{ width: '800px' }}>
      <Breadcrumbs
        breadcrumbs={buildBreadcrumbs()}
      />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
        <h3>📚 Documentation Navigation</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '12px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Navigation Tree</h4>

            {Object.entries(docsStructure).map(([key, section]) => (
              <div key={key} style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => navigateTo([key])}
                  style={{
                    padding: '4px 8px',
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: path[0] === key ? '#3b82f6' : 'transparent',
                    color: path[0] === key ? 'white' : '#374151',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {section.name}
                </button>

                {path[0] === key && section.children && (
                  <div style={{ marginLeft: '12px', marginTop: '4px' }}>
                    {Object.entries(section.children).map(([subKey, subsection]: [string, any]) => (
                      <div key={subKey} style={{ marginBottom: '4px' }}>
                        <button
                          onClick={() => navigateTo([key, subKey])}
                          style={{
                            padding: '2px 6px',
                            width: '100%',
                            textAlign: 'left',
                            border: 'none',
                            backgroundColor: path[1] === subKey ? '#60a5fa' : 'transparent',
                            color: path[1] === subKey ? 'white' : '#6b7280',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '11px',
                          }}
                        >
                          {subsection.name}
                        </button>

                        {path[1] === subKey && subsection.children && (
                          <div style={{ marginLeft: '8px', marginTop: '2px' }}>
                            {Object.entries(subsection.children).map(([detailKey, detail]: [string, any]) => (
                              <button
                                key={detailKey}
                                onClick={() => navigateTo([key, subKey, detailKey])}
                                style={{
                                  padding: '1px 4px',
                                  width: '100%',
                                  textAlign: 'left',
                                  border: 'none',
                                  backgroundColor: path[2] === detailKey ? '#93c5fd' : 'transparent',
                                  color: path[2] === detailKey ? '#1e40af' : '#9ca3af',
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                }}
                              >
                                {detail.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>
              {buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content || 'Documentation'}
            </h4>

            <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#6b7280' }}>
              {path.length === 3 && (
                <p>
                  This page contains detailed documentation about <strong>{buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content}</strong>.
                  You'll find comprehensive examples, API references, and best practices here.
                </p>
              )}

              {path.length === 2 && (
                <p>
                  Welcome to the <strong>{buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content}</strong> section.
                  Choose a topic from the navigation tree to learn more.
                </p>
              )}

              {path.length === 1 && (
                <p>
                  This is the main <strong>{buildBreadcrumbs()[buildBreadcrumbs().length - 1]?.content}</strong> section.
                  Navigate through the topics on the left to explore different areas.
                </p>
              )}
            </div>

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current path:</div>
              <code style={{ fontSize: '11px', color: '#334155' }}>
                /{path.join('/')}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentationSiteExample;`,
    vanilla: `<!-- Documentation Site Breadcrumbs -->
<div class="documentation-site-container">
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol class="breadcrumbs-list" id="docs-breadcrumbs">
      <!-- Breadcrumbs will be dynamically generated -->
    </ol>
  </nav>

  <div class="docs-content">
    <h3>📚 Documentation Navigation</h3>

    <div class="docs-layout">
      <div class="navigation-tree">
        <h4>Navigation Tree</h4>
        <div id="nav-tree">
          <!-- Navigation tree will be dynamically generated -->
        </div>
      </div>

      <div class="content-area">
        <h4 id="content-title">Documentation</h4>
        <div id="content-body">
          <p>Welcome to the documentation. Navigate through the topics on the left to explore different areas.</p>
        </div>
        <div class="path-display">
          <div class="path-label">Current path:</div>
          <code id="current-path">/docs</code>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
import { on, select } from '@cin7/vanilla-js';

const docsStructure = {
  docs: {
    name: 'Documentation',
    children: {
      'getting-started': {
        name: 'Getting Started',
        children: {
          installation: { name: 'Installation' },
          'quick-start': { name: 'Quick Start' },
          'basic-concepts': { name: 'Basic Concepts' },
        },
      },
      components: {
        name: 'Components',
        children: {
          buttons: { name: 'Buttons' },
          forms: { name: 'Forms' },
          navigation: { name: 'Navigation' },
          layout: { name: 'Layout' },
        },
      },
      guides: {
        name: 'Guides',
        children: {
          styling: { name: 'Styling' },
          theming: { name: 'Theming' },
          accessibility: { name: 'Accessibility' },
          'best-practices': { name: 'Best Practices' },
        },
      },
      api: {
        name: 'API Reference',
        children: {
          'core-api': { name: 'Core API' },
          hooks: { name: 'Hooks' },
          utilities: { name: 'Utilities' },
        },
      },
    },
  },
  tutorials: {
    name: 'Tutorials',
    children: {
      beginner: {
        name: 'Beginner',
        children: {
          'first-app': { name: 'Your First App' },
          'common-patterns': { name: 'Common Patterns' },
        },
      },
      advanced: {
        name: 'Advanced',
        children: {
          performance: { name: 'Performance' },
          'custom-components': { name: 'Custom Components' },
        },
      },
    },
  },
};

let currentPath = ['docs', 'getting-started', 'installation'];

function buildBreadcrumbs() {
  const breadcrumbsList = select('#docs-breadcrumbs');
  breadcrumbsList.innerHTML = '';

  const crumbs = [];
  let current = docsStructure;
  let currentUrl = '';

  for (let i = 0; i < currentPath.length; i++) {
    const segment = currentPath[i];
    currentUrl += '/' + segment;

    if (i === 0) {
      crumbs.push({ content: current.name, url: currentUrl });
    } else if (current.children && current.children[segment]) {
      crumbs.push({ content: current.children[segment].name, url: currentUrl });
      current = current.children[segment];
    } else if (current[segment]) {
      crumbs.push({ content: current[segment].name, url: currentUrl });
      current = current[segment];
    }
  }

  crumbs.forEach((crumb, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'breadcrumbs-item';

    if (index === crumbs.length - 1) {
      listItem.innerHTML = '<span class="breadcrumbs-current">' + crumb.content + '</span>';
    } else {
      listItem.innerHTML =
        '<a href="' + crumb.url + '" class="breadcrumbs-link">' + crumb.content + '</a>' +
        '<span class="breadcrumbs-separator" aria-hidden="true">/</span>';
    }

    breadcrumbsList.appendChild(listItem);
  });

  return crumbs;
}

function buildNavigationTree() {
  const navTree = select('#nav-tree');
  navTree.innerHTML = '';

  Object.entries(docsStructure).forEach(([key, section]) => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'nav-section';

    const sectionBtn = document.createElement('button');
    sectionBtn.className = 'nav-section-btn';
    sectionBtn.textContent = section.name;
    sectionBtn.onclick = () => navigateTo([key]);

    if (currentPath[0] === key) {
      sectionBtn.classList.add('active');
    }

    sectionDiv.appendChild(sectionBtn);

    if (currentPath[0] === key && section.children) {
      const childrenDiv = document.createElement('div');
      childrenDiv.className = 'nav-children';

      Object.entries(section.children).forEach(([subKey, subsection]) => {
        const subDiv = document.createElement('div');
        subDiv.className = 'nav-subsection';

        const subBtn = document.createElement('button');
        subBtn.className = 'nav-sub-btn';
        subBtn.textContent = subsection.name;
        subBtn.onclick = () => navigateTo([key, subKey]);

        if (currentPath[1] === subKey) {
          subBtn.classList.add('active');
        }

        subDiv.appendChild(subBtn);

        if (currentPath[1] === subKey && subsection.children) {
          const detailsDiv = document.createElement('div');
          detailsDiv.className = 'nav-details';

          Object.entries(subsection.children).forEach(([detailKey, detail]) => {
            const detailBtn = document.createElement('button');
            detailBtn.className = 'nav-detail-btn';
            detailBtn.textContent = detail.name;
            detailBtn.onclick = () => navigateTo([key, subKey, detailKey]);

            if (currentPath[2] === detailKey) {
              detailBtn.classList.add('active');
            }

            detailsDiv.appendChild(detailBtn);
          });

          subDiv.appendChild(detailsDiv);
        }

        childrenDiv.appendChild(subDiv);
      });

      sectionDiv.appendChild(childrenDiv);
    }

    navTree.appendChild(sectionDiv);
  });
}

function updateContent() {
  const contentTitle = select('#content-title');
  const contentBody = select('#content-body');
  const currentPathDisplay = select('#current-path');

  const crumbs = buildBreadcrumbs();
  const lastCrumb = crumbs[crumbs.length - 1];

  contentTitle.textContent = lastCrumb ? lastCrumb.content : 'Documentation';

  if (currentPath.length === 3) {
    contentBody.innerHTML = '<p>This page contains detailed documentation about <strong>' + lastCrumb.content + '</strong>. You\\'ll find comprehensive examples, API references, and best practices here.</p>';
  } else if (currentPath.length === 2) {
    contentBody.innerHTML = '<p>Welcome to the <strong>' + lastCrumb.content + '</strong> section. Choose a topic from the navigation tree to learn more.</p>';
  } else {
    contentBody.innerHTML = '<p>This is the main <strong>' + lastCrumb.content + '</strong> section. Navigate through the topics on the left to explore different areas.</p>';
  }

  currentPathDisplay.textContent = '/' + currentPath.join('/');
}

function navigateTo(newPath) {
  currentPath = newPath;
  buildBreadcrumbs();
  buildNavigationTree();
  updateContent();
}

// Initialize
buildBreadcrumbs();
buildNavigationTree();
updateContent();
</script>

<style>
.documentation-site-container {
  width: 800px;
  margin: 0 auto;
}

.docs-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.docs-content h3 {
  margin: 0 0 20px 0;
}

.docs-layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 20px;
}

.navigation-tree {
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  padding: 12px;
}

.navigation-tree h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
  font-weight: bold;
}

.nav-section {
  margin-bottom: 8px;
}

.nav-section-btn {
  padding: 4px 8px;
  width: 100%;
  text-align: left;
  border: none;
  background-color: transparent;
  color: #374151;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.nav-section-btn:hover {
  background-color: #f3f4f6;
}

.nav-section-btn.active {
  background-color: #3b82f6;
  color: white;
}

.nav-children {
  margin-left: 12px;
  margin-top: 4px;
}

.nav-subsection {
  margin-bottom: 4px;
}

.nav-sub-btn {
  padding: 2px 6px;
  width: 100%;
  text-align: left;
  border: none;
  background-color: transparent;
  color: #6b7280;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s ease;
}

.nav-sub-btn:hover {
  background-color: #f3f4f6;
}

.nav-sub-btn.active {
  background-color: #60a5fa;
  color: white;
}

.nav-details {
  margin-left: 8px;
  margin-top: 2px;
}

.nav-detail-btn {
  padding: 1px 4px;
  width: 100%;
  text-align: left;
  border: none;
  background-color: transparent;
  color: #9ca3af;
  border-radius: 2px;
  cursor: pointer;
  font-size: 10px;
  transition: all 0.2s ease;
}

.nav-detail-btn:hover {
  background-color: #f3f4f6;
}

.nav-detail-btn.active {
  background-color: #93c5fd;
  color: #1e40af;
}

.content-area {
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
  padding: 16px;
}

.content-area h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: bold;
}

.content-area p {
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

.path-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f1f5f9;
  border-radius: 4px;
}

.path-label {
  font-size: 12px;
  color: #64748b;
  margin-bottom: 4px;
}

.path-display code {
  font-size: 11px;
  color: #334155;
}
</style>`,
    extjs: `// ExtJS Documentation Site Navigation
Ext.define('DocumentationSiteView', {
  extend: 'Ext.panel.Panel',
  title: 'Documentation Navigation',
  width: 800,
  bodyPadding: 20,

  initComponent: function() {
    var me = this;

    me.docsStructure = {
      docs: {
        name: 'Documentation',
        children: {
          'getting-started': {
            name: 'Getting Started',
            children: {
              installation: { name: 'Installation' },
              'quick-start': { name: 'Quick Start' },
              'basic-concepts': { name: 'Basic Concepts' }
            }
          },
          components: {
            name: 'Components',
            children: {
              buttons: { name: 'Buttons' },
              forms: { name: 'Forms' },
              navigation: { name: 'Navigation' },
              layout: { name: 'Layout' }
            }
          },
          guides: {
            name: 'Guides',
            children: {
              styling: { name: 'Styling' },
              theming: { name: 'Theming' },
              accessibility: { name: 'Accessibility' },
              'best-practices': { name: 'Best Practices' }
            }
          },
          api: {
            name: 'API Reference',
            children: {
              'core-api': { name: 'Core API' },
              hooks: { name: 'Hooks' },
              utilities: { name: 'Utilities' }
            }
          }
        }
      },
      tutorials: {
        name: 'Tutorials',
        children: {
          beginner: {
            name: 'Beginner',
            children: {
              'first-app': { name: 'Your First App' },
              'common-patterns': { name: 'Common Patterns' }
            }
          },
          advanced: {
            name: 'Advanced',
            children: {
              performance: { name: 'Performance' },
              'custom-components': { name: 'Custom Components' }
            }
          }
        }
      }
    };

    me.currentPath = ['docs', 'getting-started', 'installation'];

    me.dockedItems = [{
      xtype: 'toolbar',
      dock: 'top',
      itemId: 'breadcrumbToolbar',
      items: []
    }];

    me.items = [{
      xtype: 'container',
      layout: 'hbox',
      items: [
        {
          xtype: 'panel',
          title: 'Navigation Tree',
          width: 200,
          margin: '0 20px 0 0',
          items: [{
            xtype: 'treepanel',
            itemId: 'navTree',
            rootVisible: false,
            listeners: {
              itemclick: function(view, record) {
                var path = record.getData().path;
                me.navigateToPath(path);
              }
            }
          }]
        },
        {
          xtype: 'panel',
          title: 'Documentation Content',
          flex: 1,
          items: [
            {
              xtype: 'component',
              itemId: 'contentTitle',
              style: 'font-size: 16px; font-weight: bold; margin-bottom: 12px;',
              tpl: '{title}'
            },
            {
              xtype: 'component',
              itemId: 'contentBody',
              style: 'font-size: 14px; line-height: 1.5; color: #6b7280; margin-bottom: 16px;',
              tpl: '{content}'
            },
            {
              xtype: 'container',
              style: 'padding: 12px; background-color: #f1f5f9; border-radius: 4px;',
              items: [{
                xtype: 'displayfield',
                fieldLabel: 'Current path',
                itemId: 'pathDisplay',
                value: '/docs',
                labelStyle: 'font-size: 12px; color: #64748b;',
                fieldStyle: 'font-family: monospace; font-size: 11px; color: #334155;'
              }]
            }
          ]
        }
      ]
    }];

    me.callParent();
  },

  initComponent: function() {
    this.callParent();
    this.updateNavigationTree();
    this.updateBreadcrumbs();
    this.updateContent();
  },

  buildTreeData: function(structure, basePath = []) {
    var me = this;
    var children = [];

    Object.keys(structure).forEach(function(key) {
      var node = structure[key];
      var path = basePath.concat([key]);
      var treeNode = {
        text: node.name,
        path: path,
        leaf: !node.children,
        expanded: false,
        iconCls: me.currentPath.length >= path.length &&
                  me.currentPath.slice(0, path.length).every(function(val, idx) { return val === path[idx]; })
      };

      if (node.children) {
        treeNode.children = me.buildTreeData(node.children, path);
      }

      children.push(treeNode);
    });

    return children;
  },

  updateNavigationTree: function() {
    var navTree = this.down('#navTree');
    var rootData = this.buildTreeData(this.docsStructure);

    navTree.setRoot({
      expanded: true,
      children: rootData
    });
  },

  updateBreadcrumbs: function() {
    var toolbar = this.down('#breadcrumbToolbar');
    var items = [];
    var current = this.docsStructure;
    var currentUrl = '';

    this.currentPath.forEach(function(segment, index) {
      currentUrl += '/' + segment;

      if (index === 0) {
        items.push({
          xtype: 'tbtext',
          text: current.name,
          href: currentUrl
        });
        current = current[segment];
      } else if (current.children && current.children[segment]) {
        items.push({ xtype: 'tbtext', text: '/', margin: '0 4px' });
        items.push({
          xtype: 'tbtext',
          text: current.children[segment].name,
          href: currentUrl
        });
        current = current.children[segment];
      } else if (current[segment]) {
        items.push({ xtype: 'tbtext', text: '/', margin: '0 4px' });
        items.push({
          xtype: 'tbtext',
          text: current[segment].name,
          href: currentUrl
        });
        current = current[segment];
      }
    });

    toolbar.removeAll();
    toolbar.add(items);
  },

  updateContent: function() {
    var contentTitle = this.down('#contentTitle');
    var contentBody = this.down('#contentBody');
    var pathDisplay = this.down('#pathDisplay');
    var current = this.docsStructure;
    var pageTitle = 'Documentation';
    var pageContent = '';
    var currentUrl = '';

    // Navigate to current path
    this.currentPath.forEach(function(segment, index) {
      currentUrl += '/' + segment;

      if (index === this.currentPath.length - 1) {
        if (current.children && current.children[segment]) {
          pageTitle = current.children[segment].name;
        } else if (current[segment]) {
          pageTitle = current[segment].name;
        }
      }

      if (current.children && current.children[segment]) {
        current = current.children[segment];
      } else if (current[segment]) {
        current = current[segment];
      }
    }, this);

    // Generate content based on path depth
    if (this.currentPath.length === 3) {
      pageContent = 'This page contains detailed documentation about <strong>' + pageTitle + '</strong>. You\\'ll find comprehensive examples, API references, and best practices here.';
    } else if (this.currentPath.length === 2) {
      pageContent = 'Welcome to the <strong>' + pageTitle + '</strong> section. Choose a topic from the navigation tree to learn more.';
    } else {
      pageContent = 'This is the main <strong>' + pageTitle + '</strong> section. Navigate through the topics on the left to explore different areas.';
    }

    contentTitle.update({ title: pageTitle });
    contentBody.update({ content: pageContent });
    pathDisplay.setValue(currentUrl);
  },

  navigateToPath: function(path) {
    this.currentPath = path;
    this.updateNavigationTree();
    this.updateBreadcrumbs();
    this.updateContent();
  }
});

// Create the component
Ext.create('DocumentationSiteView');`,
    typescript: `import { Breadcrumbs } from '@shopify/polaris';
import React, { useState, useCallback, useEffect } from 'react';

interface DocumentationNode {
  name: string;
  children?: Record<string, DocumentationNode>;
}

interface DocumentationStructure {
  [key: string]: DocumentationNode;
}

interface BreadcrumbItem {
  content: string;
  url: string;
}

interface DocumentationSiteProps {
  initialPath?: string[];
  onNavigationChange?: (breadcrumbs: BreadcrumbItem[]) => void;
}

function DocumentationSiteExample({
  initialPath = ['docs', 'getting-started', 'installation'],
  onNavigationChange
}: DocumentationSiteProps): JSX.Element {
  const [path, setPath] = useState<string[]>(initialPath);

  const docsStructure: DocumentationStructure = {
    docs: {
      name: 'Documentation',
      children: {
        'getting-started': {
          name: 'Getting Started',
          children: {
            installation: { name: 'Installation' },
            'quick-start': { name: 'Quick Start' },
            'basic-concepts': { name: 'Basic Concepts' },
          },
        },
        components: {
          name: 'Components',
          children: {
            buttons: { name: 'Buttons' },
            forms: { name: 'Forms' },
            navigation: { name: 'Navigation' },
            layout: { name: 'Layout' },
          },
        },
        guides: {
          name: 'Guides',
          children: {
            styling: { name: 'Styling' },
            theming: { name: 'Theming' },
            accessibility: { name: 'Accessibility' },
            'best-practices': { name: 'Best Practices' },
          },
        },
        api: {
          name: 'API Reference',
          children: {
            'core-api': { name: 'Core API' },
            hooks: { name: 'Hooks' },
            utilities: { name: 'Utilities' },
          },
        },
      },
    },
    tutorials: {
      name: 'Tutorials',
      children: {
        beginner: {
          name: 'Beginner',
          children: {
            'first-app': { name: 'Your First App' },
            'common-patterns': { name: 'Common Patterns' },
          },
        },
        advanced: {
          name: 'Advanced',
          children: {
            performance: { name: 'Performance' },
            'custom-components': { name: 'Custom Components' },
          },
        },
      },
    },
  };

  const buildBreadcrumbs = useCallback((): BreadcrumbItem[] => {
    const crumbs: BreadcrumbItem[] = [];
    let current = docsStructure as any;
    let currentUrl = '';

    for (let i = 0; i < path.length; i++) {
      const segment = path[i];
      currentUrl += '/' + segment;

      if (i === 0) {
        crumbs.push({ content: current.name, url: currentUrl });
      } else if (current.children && current.children[segment]) {
        crumbs.push({ content: current.children[segment].name, url: currentUrl });
        current = current.children[segment];
      } else if (current[segment]) {
        crumbs.push({ content: current[segment].name, url: currentUrl });
        current = current[segment];
      }
    }

    return crumbs.filter(item => item && item.content);
  }, [path, docsStructure]);

  const navigateTo = useCallback((newPath: string[]) => {
    setPath(newPath);
  }, []);

  useEffect(() => {
    if (onNavigationChange) {
      onNavigationChange(buildBreadcrumbs());
    }
  }, [buildBreadcrumbs, onNavigationChange]);

  const currentBreadcrumbs = buildBreadcrumbs();
  const lastBreadcrumb = currentBreadcrumbs[currentBreadcrumbs.length - 1];

  return (
    <div style={{ width: '800px' }}>
      <Breadcrumbs breadcrumbs={currentBreadcrumbs} />

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
        <h3>📚 Documentation Navigation</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '12px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Navigation Tree</h4>

            {Object.entries(docsStructure).map(([key, section]) => (
              <div key={key} style={{ marginBottom: '8px' }}>
                <button
                  onClick={() => navigateTo([key])}
                  style={{
                    padding: '4px 8px',
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                    backgroundColor: path[0] === key ? '#3b82f6' : 'transparent',
                    color: path[0] === key ? 'white' : '#374151',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                >
                  {section.name}
                </button>

                {path[0] === key && section.children && (
                  <div style={{ marginLeft: '12px', marginTop: '4px' }}>
                    {Object.entries(section.children).map(([subKey, subsection]: [string, any]) => (
                      <div key={subKey} style={{ marginBottom: '4px' }}>
                        <button
                          onClick={() => navigateTo([key, subKey])}
                          style={{
                            padding: '2px 6px',
                            width: '100%',
                            textAlign: 'left',
                            border: 'none',
                            backgroundColor: path[1] === subKey ? '#60a5fa' : 'transparent',
                            color: path[1] === subKey ? 'white' : '#6b7280',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '11px',
                          }}
                        >
                          {subsection.name}
                        </button>

                        {path[1] === subKey && subsection.children && (
                          <div style={{ marginLeft: '8px', marginTop: '2px' }}>
                            {Object.entries(subsection.children).map(([detailKey, detail]: [string, any]) => (
                              <button
                                key={detailKey}
                                onClick={() => navigateTo([key, subKey, detailKey])}
                                style={{
                                  padding: '1px 4px',
                                  width: '100%',
                                  textAlign: 'left',
                                  border: 'none',
                                  backgroundColor: path[2] === detailKey ? '#93c5fd' : 'transparent',
                                  color: path[2] === detailKey ? '#1e40af' : '#9ca3af',
                                  borderRadius: '2px',
                                  cursor: 'pointer',
                                  fontSize: '10px',
                                }}
                              >
                                {detail.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '4px', border: '1px solid #e2e8f0', padding: '16px' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: 'bold' }}>
              {lastBreadcrumb?.content || 'Documentation'}
            </h4>

            <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#6b7280' }}>
              {path.length === 3 && (
                <p>
                  This page contains detailed documentation about <strong>{lastBreadcrumb?.content}</strong>.
                  You'll find comprehensive examples, API references, and best practices here.
                </p>
              )}

              {path.length === 2 && (
                <p>
                  Welcome to the <strong>{lastBreadcrumb?.content}</strong> section.
                  Choose a topic from the navigation tree to learn more.
                </p>
              )}

              {path.length === 1 && (
                <p>
                  This is the main <strong>{lastBreadcrumb?.content}</strong> section.
                  Navigate through the topics on the left to explore different areas.
                </p>
              )}
            </div>

            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f1f5f9', borderRadius: '4px' }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current path:</div>
              <code style={{ fontSize: '11px', color: '#334155' }}>
                /{path.join('/')}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentationSiteExample;`
  }
};

// Popover Component Examples
