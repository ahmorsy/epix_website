import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE_URL = process.env.SITE_URL || 'https://www.e-pix.io'
const LANGS = ['en', 'fr', 'ar', 'es']

const coreRoutes = [
  '/',
  '/tour',
  '/product-tour',
  '/ai',
  '/ai-capabilities',
  '/blog',
]

const moduleRoutes = [
  '/modules/business-masters',
  '/modules/common-masters',
  '/modules/general-ledger',
  '/modules/inventory-management',
  '/modules/human-resources',
  '/modules/cash-management',
  '/modules/petty-cash',
  '/modules/procure-to-pay',
  '/modules/accounts-payable',
  '/modules/accounts-receivable',
  '/modules/shipment-management',
  '/modules/discrete-manufacturing',
  '/modules/fixed-assets',
  '/modules/car-inspection',
]

const blogRoutes = [
  '/blog/what-is-erp',
  '/blog/erp-implementation-guide',
  '/blog/how-ai-is-transforming-erp',
  '/blog/erp-for-manufacturing',
  '/blog/digital-transformation-africa',
  '/blog/digital-transformation-middle-east',
]

const routes = [...new Set([...coreRoutes, ...moduleRoutes, ...blogRoutes])]

const toAbsolute = (path, lang) => {
  const suffix = lang === 'en' ? '' : `?lang=${lang}`
  return `${SITE_URL}${path}${suffix}`
}

const lastmod = new Date().toISOString().slice(0, 10)

const xmlEntries = routes
  .map((path) => {
    const alternates = LANGS.map(
      (lang) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${toAbsolute(path, lang)}" />`,
    ).join('\n')

    return [
      '  <url>',
      `    <loc>${toAbsolute(path, 'en')}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      '    <changefreq>weekly</changefreq>',
      path === '/' || path.startsWith('/blog') ? '    <priority>0.9</priority>' : '    <priority>0.8</priority>',
      alternates,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${toAbsolute(path, 'en')}" />`,
      '  </url>',
    ].join('\n')
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${xmlEntries}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /
`

const llmsTxt = `# EPIX ERP

EPIX ERP is an enterprise resource planning platform for finance, operations, HR, inventory, and manufacturing.

## Primary audience
- Enterprise executives
- Finance and operations leaders
- Digital transformation teams in Africa, Europe, GCC, and Middle East markets

## Canonical site
${SITE_URL}

## Key URLs
- ${SITE_URL}/
- ${SITE_URL}/product-tour
- ${SITE_URL}/ai-capabilities
- ${SITE_URL}/blog
- ${SITE_URL}/blog/what-is-erp
- ${SITE_URL}/blog/erp-implementation-guide
- ${SITE_URL}/blog/how-ai-is-transforming-erp
- ${SITE_URL}/blog/erp-for-manufacturing
- ${SITE_URL}/blog/digital-transformation-africa
- ${SITE_URL}/blog/digital-transformation-middle-east
`

const publicDir = resolve(process.cwd(), 'public')
mkdirSync(publicDir, { recursive: true })
writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(resolve(publicDir, 'robots.txt'), robots, 'utf8')
writeFileSync(resolve(publicDir, 'llms.txt'), llmsTxt, 'utf8')

console.log('SEO files generated: public/sitemap.xml, public/robots.txt, public/llms.txt')
