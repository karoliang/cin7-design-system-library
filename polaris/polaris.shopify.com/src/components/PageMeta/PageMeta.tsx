import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
  title?: string;
  description?: string;
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'documentation';
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

function PageMeta({
  title,
  description,
  noIndex = false,
  keywords = [],
  author = 'Cin7 DSL Team',
  ogImage,
  ogType = 'documentation',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  publishedTime,
  modifiedTime,
}: Props) {
  const router = useRouter();
  const baseUrl = 'https://polaris.shopify.com';
  
  let siteName = 'Cin7 DSL';
  let pageTitle = title || 'Enterprise Design System';

  if (title) {
    siteName = `${title} — ${siteName}`;
  }

  // Default meta description
  const metaDescription = description || 
    'Cin7 DSL: Enterprise design system combining Shopify Polaris with ExtJS for building powerful, accessible applications. Features TypeScript support, Vanilla JS integration, and comprehensive documentation.';

  // Default keywords combined with page-specific ones
  const defaultKeywords = [
    'Cin7 DSL',
    'design system',
    'Shopify Polaris',
    'ExtJS',
    'TypeScript',
    'React components',
    'enterprise UI',
    'accessibility',
    'documentation',
    'component library'
  ];
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])].join(', ');

  // Generate canonical URL
  const canonical = canonicalUrl || `${baseUrl}${router.asPath}`;
  
  // Default OG image
  const ogImageUrl = ogImage || `${baseUrl}/images/cin7-dsl-og.png`;

  // Structured data for documentation
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: pageTitle,
    description: metaDescription,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cin7',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/cin7-logo.png`,
      },
    },
    datePublished: publishedTime || new Date().toISOString(),
    dateModified: modifiedTime || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
  };

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{siteName}</title>
      <meta name="title" content={siteName} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={siteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="Cin7 DSL" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={siteName} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:site" content="@cin7" />
      <meta name="twitter:creator" content="@cin7" />
      
      {/* Additional SEO tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-title" content="Cin7 DSL" />
      <meta name="application-name" content="Cin7 DSL" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://cdn.shopify.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://cdn.shopify.com" />
    </Head>
  );
}

export default PageMeta;
