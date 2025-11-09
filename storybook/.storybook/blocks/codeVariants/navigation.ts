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
  }
};

// Popover Component Examples
