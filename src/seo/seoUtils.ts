import type { BreadcrumbItem, FaqItem, Lang } from './types'

export const SITE_URL = 'https://www.e-pix.io'
export const SITE_NAME = 'EPIX ERP'

const localeMap: Record<Lang, string> = {
  en: 'en_US',
  fr: 'fr_FR',
  ar: 'ar_SA',
  es: 'es_ES',
}

export function getOgLocale(lang: Lang): string {
  return localeMap[lang]
}

export function canonicalizePath(path: string): string {
  if (!path || path === '/') return '/'
  const normalized = path.toLowerCase().replace(/\/+$/, '')
  return normalized.startsWith('/') ? normalized : `/${normalized}`
}

export function toLocalizedUrl(path: string, lang: Lang): string {
  const normalizedPath = canonicalizePath(path)
  const isHome = normalizedPath === '/'
  const suffix = lang === 'en' ? '' : `${isHome ? '?' : '?'}lang=${lang}`
  return `${SITE_URL}${normalizedPath}${suffix}`
}

export function buildLangAlternates(path: string): Record<Lang, string> {
  return {
    en: toLocalizedUrl(path, 'en'),
    fr: toLocalizedUrl(path, 'fr'),
    ar: toLocalizedUrl(path, 'ar'),
    es: toLocalizedUrl(path, 'es'),
  }
}

export function createOrganizationSchema(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/epix-mark.svg`,
    sameAs: [SITE_URL],
    areaServed: ['Africa', 'Europe', 'Middle East', 'GCC', 'Global'],
    knowsAbout: ['ERP', 'AI ERP', 'Finance', 'Manufacturing', 'Digital Transformation'],
    inLanguage: lang,
  }
}

export function createWebSiteSchema(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: lang,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?lang=${lang}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function createSoftwareApplicationSchema(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'EPIX ERP Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    inLanguage: lang,
  }
}

export function createProductSchema(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'EPIX ERP',
    brand: 'EPIX',
    category: 'Enterprise Resource Planning Software',
    description: 'Enterprise ERP software for finance, operations, HR, inventory, and manufacturing.',
    url: SITE_URL,
    image: `${SITE_URL}/epix-mark.svg`,
    inLanguage: lang,
  }
}

export function createServiceSchema(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'ERP Implementation and Optimization',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: ['Africa', 'Europe', 'Middle East', 'GCC', 'Global'],
    inLanguage: lang,
  }
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function createFaqSchema(faqItems: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function createArticleSchema(input: {
  headline: string
  description: string
  lang: Lang
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished ?? '2026-05-29',
    dateModified: input.dateModified ?? '2026-05-29',
    inLanguage: input.lang,
    mainEntityOfPage: input.url,
    image: input.image ?? `${SITE_URL}/epix-mark.svg`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/epix-mark.svg`,
      },
    },
  }
}
