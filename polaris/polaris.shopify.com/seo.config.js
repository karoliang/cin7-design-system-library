module.exports = {
  defaultTitle: 'Cin7 DSL - Enterprise Design System',
  titleTemplate: '%s | Cin7 DSL',
  defaultDescription: 'Cin7 DSL combines Shopify Polaris with ExtJS to create a comprehensive enterprise design system. Build powerful, accessible applications with TypeScript, React, and Vanilla JavaScript.',
  siteUrl: 'https://polaris.shopify.com',
  defaultKeywords: [
    'Cin7 DSL',
    'design system',
    'Shopify Polaris',
    'ExtJS',
    'TypeScript',
    'React',
    'component library',
    'enterprise UI',
    'accessibility',
    'web components',
    'UI framework',
    'developer tools',
    'documentation',
    'Vanilla JavaScript',
    'state management',
    'Zustand',
    'React Query',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://polaris.shopify.com',
    site_name: 'Cin7 DSL',
    images: [
      {
        url: 'https://polaris.shopify.com/images/cin7-dsl-og.png',
        width: 1200,
        height: 630,
        alt: 'Cin7 DSL - Enterprise Design System',
      },
    ],
  },
  twitter: {
    handle: '@cin7',
    site: '@cin7',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: 'Cin7 DSL Team',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
  robotsProps: {
    nosnippet: false,
    notranslate: false,
    noimageindex: false,
    noarchive: false,
    maxSnippet: -1,
    maxImagePreview: 'large',
    maxVideoPreview: -1,
  },
};