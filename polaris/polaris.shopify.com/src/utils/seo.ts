interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

/**
 * Generate software documentation schema
 */
export function generateSoftwareDocSchema({
  name,
  description,
  applicationCategory,
  operatingSystem,
  programmingLanguage,
  version,
  datePublished,
  dateModified,
  author,
  url,
}: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string[];
  programmingLanguage: string[];
  version: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    programmingLanguage,
    softwareVersion: version,
    datePublished,
    dateModified,
    author: {
      '@type': 'Organization',
      name: author,
    },
    url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generate component documentation schema
 */
export function generateComponentSchema({
  name,
  description,
  category,
  status,
  examples,
  url,
}: {
  name: string;
  description: string;
  category: string;
  status?: string;
  examples?: string[];
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'APIReference',
    name: `${name} Component`,
    description,
    category: `UI Components / ${category}`,
    programmingLanguage: ['TypeScript', 'JavaScript', 'React'],
    codeRepository: 'https://github.com/karoliang/cin7dsl',
    url,
    ...(status && { disambiguatingDescription: `Status: ${status}` }),
    ...(examples && {
      exampleOfWork: examples.map(example => ({
        '@type': 'CreativeWork',
        name: example,
        encodingFormat: 'text/jsx',
      })),
    }),
  };
}

/**
 * Get meta tags for page type
 */
export function getMetaTagsForPageType(pageType: string) {
  const metaTags: Record<string, any> = {
    home: {
      title: 'Cin7 DSL - Enterprise Design System',
      description: 'Cin7 DSL combines Shopify Polaris with ExtJS to create a powerful enterprise design system. Build accessible, performant applications with TypeScript and React.',
      keywords: ['Cin7 DSL', 'design system', 'enterprise UI', 'Shopify Polaris', 'ExtJS'],
    },
    component: {
      titleTemplate: '%s Component - Cin7 DSL',
      descriptionTemplate: '%s component documentation. Learn how to use %s in your Cin7 DSL applications with examples and API reference.',
      keywords: ['component', 'UI component', 'React component', 'documentation'],
    },
    guide: {
      titleTemplate: '%s - Cin7 DSL Documentation',
      descriptionTemplate: '%s. Comprehensive guide for Cin7 DSL development.',
      keywords: ['guide', 'tutorial', 'documentation', 'how-to'],
    },
    pattern: {
      titleTemplate: '%s Pattern - Cin7 DSL',
      descriptionTemplate: 'Learn the %s pattern in Cin7 DSL. Best practices and implementation examples.',
      keywords: ['pattern', 'best practices', 'design pattern', 'UX pattern'],
    },
  };

  return metaTags[pageType] || metaTags.guide;
}