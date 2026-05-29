import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const routes = [
  '/',
  '/product-tour',
  '/ai-capabilities',
  '/blog',
  '/blog/what-is-erp',
  '/blog/erp-implementation-guide',
  '/blog/how-ai-is-transforming-erp',
  '/blog/erp-for-manufacturing',
  '/blog/digital-transformation-africa',
  '/blog/digital-transformation-middle-east',
]

const failures = []

function htmlPath(route) {
  if (route === '/') return resolve(process.cwd(), 'dist', 'index.html')
  return resolve(process.cwd(), 'dist', route.replace(/^\//, ''), 'index.html')
}

function extractAll(regex, html) {
  const items = []
  let match = regex.exec(html)
  while (match) {
    items.push(match)
    match = regex.exec(html)
  }
  return items
}

function checkRoute(route) {
  const file = htmlPath(route)
  if (!existsSync(file)) {
    failures.push(`${route}: missing prerendered html at ${file}`)
    return
  }

  const html = readFileSync(file, 'utf8')

  if (!/<title>[^<]{8,}<\/title>/i.test(html)) {
    failures.push(`${route}: missing or too-short <title>`)
  }

  if (!/<meta\s+name="description"\s+content="[^"]{50,}"/i.test(html)) {
    failures.push(`${route}: missing descriptive meta description`)
  }

  if (!/<link\s+rel="canonical"\s+href="https:\/\/www\.e-pix\.io\//i.test(html)) {
    failures.push(`${route}: canonical link missing or not absolute`)
  }

  const h1Count = extractAll(/<h1\b/gi, html).length
  if (h1Count !== 1) {
    failures.push(`${route}: expected exactly one h1, found ${h1Count}`)
  }

  const hreflangs = ['en', 'fr', 'ar', 'es', 'x-default']
  for (const lang of hreflangs) {
    const hreflangRegex = new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${lang}"\\s+href=`, 'i')
    if (!hreflangRegex.test(html)) {
      failures.push(`${route}: missing hreflang ${lang}`)
    }
  }

  const schemas = extractAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi, html)
  if (!schemas.length) {
    failures.push(`${route}: no JSON-LD schema found`)
  }

  for (const schema of schemas) {
    try {
      JSON.parse(schema[1])
    } catch {
      failures.push(`${route}: invalid JSON-LD payload`) 
      break
    }
  }
}

for (const route of routes) {
  checkRoute(route)
}

if (failures.length) {
  console.error('SEO audit failed:')
  for (const issue of failures) {
    console.error(` - ${issue}`)
  }
  process.exit(1)
}

console.log(`SEO audit passed for ${routes.length} critical routes.`)
