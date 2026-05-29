import { createServer } from 'node:http'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, normalize, resolve } from 'node:path'
import puppeteer from 'puppeteer'

const previewPort = Number(process.env.PRERENDER_PORT ?? 43123)
const baseUrl = `http://127.0.0.1:${previewPort}`
const distDir = resolve(process.cwd(), 'dist')

const routes = [
  '/',
  '/product-tour',
  '/tour',
  '/ai-capabilities',
  '/ai',
  '/blog',
  '/blog/what-is-erp',
  '/blog/erp-implementation-guide',
  '/blog/how-ai-is-transforming-erp',
  '/blog/erp-for-manufacturing',
  '/blog/digital-transformation-africa',
  '/blog/digital-transformation-middle-east',
  '/modules/business-masters',
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

function routeToFile(route) {
  if (route === '/') {
    return resolve(distDir, 'index.html')
  }
  return resolve(distDir, route.replace(/^\//, ''), 'index.html')
}

function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms))
}

const contentTypeByExt = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function startStaticServer() {
  const server = createServer((req, res) => {
    const requestUrl = new URL(req.url ?? '/', baseUrl)
    const pathname = decodeURIComponent(requestUrl.pathname)

    let filePath = normalize(join(distDir, pathname))
    if (!filePath.startsWith(distDir)) {
      res.statusCode = 403
      res.end('Forbidden')
      return
    }

    if (pathname.endsWith('/')) {
      filePath = join(filePath, 'index.html')
    }

    if (!existsSync(filePath) && !extname(filePath)) {
      filePath = join(filePath, 'index.html')
    }

    if (!existsSync(filePath)) {
      filePath = resolve(distDir, 'index.html')
    }

    const ext = extname(filePath).toLowerCase()
    const contentType = contentTypeByExt[ext] ?? 'application/octet-stream'

    try {
      const body = readFileSync(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)
      if (ext !== '.html') {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
      res.end(body)
    } catch (error) {
      res.statusCode = 500
      res.end(String(error))
    }
  })

  return new Promise((resolvePromise, rejectPromise) => {
    server.once('error', rejectPromise)
    server.listen(previewPort, '127.0.0.1', () => resolvePromise(server))
  })
}

async function run() {
  const server = await startStaticServer()

  try {
    await sleep(250)

    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()
    await page.setViewport({ width: 1440, height: 900 })

    for (const route of routes) {
      const url = `${baseUrl}${route}`
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })
      await sleep(1200)

      const html = await page.content()
      const outFile = routeToFile(route)
      mkdirSync(dirname(outFile), { recursive: true })

      writeFileSync(outFile, html, 'utf8')
    }

    await browser.close()
    console.log(`Prerendered ${routes.length} routes.`)
  } finally {
    await new Promise((resolvePromise) => server.close(() => resolvePromise(undefined)))
  }
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
