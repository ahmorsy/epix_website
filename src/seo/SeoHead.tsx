import { useEffect } from 'react'
import type { SeoConfig } from './types'
import { buildLangAlternates, getOgLocale, toLocalizedUrl } from './seoUtils'

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let tag = document.head.querySelector<HTMLLinkElement>(selector)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    if (hreflang) tag.setAttribute('hreflang', hreflang)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export function SeoHead({ config }: { config: SeoConfig }) {
  useEffect(() => {
    const canonical = toLocalizedUrl(config.path, config.locale)
    const defaults = buildLangAlternates(config.path)
    const alternates = {
      en: config.alternates?.en ?? defaults.en,
      fr: config.alternates?.fr ?? defaults.fr,
      ar: config.alternates?.ar ?? defaults.ar,
      es: config.alternates?.es ?? defaults.es,
    }

    document.title = config.title
    document.documentElement.lang = config.locale
    document.documentElement.dir = config.locale === 'ar' ? 'rtl' : 'ltr'

    upsertMeta('name', 'description', config.description)
    upsertMeta('name', 'robots', config.robots ?? 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1')
    if (config.keywords?.length) {
      upsertMeta('name', 'keywords', config.keywords.join(', '))
    }

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'EPIX ERP')
    upsertMeta('property', 'og:locale', getOgLocale(config.locale))
    upsertMeta('property', 'og:title', config.title)
    upsertMeta('property', 'og:description', config.description)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', config.image ?? '/epix-mark.svg')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', config.title)
    upsertMeta('name', 'twitter:description', config.description)
    upsertMeta('name', 'twitter:image', config.image ?? '/epix-mark.svg')

    upsertLink('canonical', canonical)
    upsertLink('alternate', alternates.en, 'en')
    upsertLink('alternate', alternates.fr, 'fr')
    upsertLink('alternate', alternates.ar, 'ar')
    upsertLink('alternate', alternates.es, 'es')
    upsertLink('alternate', alternates.en, 'x-default')

    const oldSchemas = document.head.querySelectorAll('script[data-epix-schema="1"]')
    oldSchemas.forEach((node) => node.remove())

    for (const schema of config.schemas ?? []) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.epixSchema = '1'
      script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [config])

  return null
}
