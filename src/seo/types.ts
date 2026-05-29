export type ContentLang = 'en' | 'fr' | 'ar'
export type Lang = ContentLang | 'es'

export type LocalizedText = {
  en: string
  fr: string
  ar: string
  es?: string
}

export type BreadcrumbItem = {
  name: string
  url: string
}

export type FaqItem = {
  question: string
  answer: string
}

export type SeoConfig = {
  title: string
  description: string
  path: string
  locale: Lang
  image?: string
  robots?: string
  keywords?: string[]
  alternates?: Partial<Record<Lang, string>>
  schemas?: Array<Record<string, unknown>>
}
