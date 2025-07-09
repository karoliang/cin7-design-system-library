const fs = require('fs');
const path = require('path');

// Get all page files
const pagesDir = path.join(__dirname, '../pages');
const contentDir = path.join(__dirname, '../content');

// Pages to exclude from sitemap
const excludedPages = [
  '/_app',
  '/_document',
  '/_error',
  '/404',
  '/api/**',
  '/examples/**',
  '/sandbox/**',
];

// Generate sitemap
function generateSitemap() {
  const baseUrl = 'https://polaris.shopify.com';
  const currentDate = new Date().toISOString();
  
  // Simple static sitemap for key pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/getting-started', priority: '0.9', changefreq: 'monthly' },
    { path: '/getting-started/overview', priority: '0.8', changefreq: 'monthly' },
    { path: '/getting-started/development', priority: '0.8', changefreq: 'monthly' },
    { path: '/getting-started/migration', priority: '0.8', changefreq: 'monthly' },
    { path: '/getting-started/extjs', priority: '0.8', changefreq: 'monthly' },
    { path: '/getting-started/architecture', priority: '0.8', changefreq: 'monthly' },
    { path: '/components', priority: '0.9', changefreq: 'weekly' },
    { path: '/foundations', priority: '0.8', changefreq: 'monthly' },
    { path: '/patterns', priority: '0.8', changefreq: 'monthly' },
    { path: '/tokens', priority: '0.7', changefreq: 'monthly' },
    { path: '/icons', priority: '0.7', changefreq: 'monthly' },
    { path: '/playground', priority: '0.7', changefreq: 'weekly' },
  ];
  
  // Map to URL entries
  const urls = staticPages.map(page => ({
    loc: `${baseUrl}${page.path}`,
    lastmod: currentDate,
    changefreq: page.changefreq,
    priority: page.priority,
  }));
  
  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // Write sitemap
  const publicDir = path.join(__dirname, '../public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  
  // Generate robots.txt
  const robotsTxt = `# Cin7 DSL Documentation
User-agent: *
Allow: /
Disallow: /api/
Disallow: /examples/
Disallow: /sandbox/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1
`;
  
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  
  console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
  console.log('✅ Generated robots.txt');
}

// Run generator
generateSitemap();