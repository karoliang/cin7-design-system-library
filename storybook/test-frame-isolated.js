import React from 'react';
import { Frame, TopBar, Navigation, Page, Avatar } from '@shopify/polaris';
import { HomeIcon, OrderIcon, ProductIcon } from '@shopify/polaris-icons';

// Simple test to isolate Frame component issues
export default function TestFrame() {
  const [mobileNavigationActive, setMobileNavigationActive] = React.useState(false);

  const toggleMobileNavigation = React.useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const topBarMarkup = React.createElement(TopBar, {
    showNavigationToggle: true,
    onNavigationToggle: toggleMobileNavigation,
    userMenu: {
      name: 'John Doe',
      detail: 'Store owner',
      initials: 'JD',
      avatar: React.createElement(Avatar, { customer: true, size: "small", name: "John Doe" }),
    },
  });

  const navigationMarkup = React.createElement(Navigation, {location: "/"},
    React.createElement(Navigation.Section, {
      items: [
        { label: 'Home', icon: HomeIcon, url: '#' },
        { label: 'Orders', icon: OrderIcon, url: '#' },
        { label: 'Products', icon: ProductIcon, url: '#' },
      ]
    })
  );

  return React.createElement(Frame, {
    topBar: topBarMarkup,
    navigation: navigationMarkup,
    showMobileNavigation: mobileNavigationActive,
    onNavigationDismiss: toggleMobileNavigation,
  },
    React.createElement(Page, {title: "Dashboard"},
      React.createElement('p', null, 'Welcome to your dashboard')
    )
  );
}