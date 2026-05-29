import type { Lang } from '../seo/types'
import type { BlogLocalized, BlogPost } from './blogData'

export function pickLocalized(text: BlogLocalized, lang: Lang): string {
  return text[lang] ?? text.en
}

export function estimateReadingTime(post: BlogPost, lang: Lang): number {
  const words = post.sections
    .flatMap((section) => section.paragraphs)
    .map((paragraph) => pickLocalized(paragraph, lang))
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return Math.max(2, Math.round(words / 220))
}

export function blogPath(slug: string, lang: Lang): string {
  return lang === 'en' ? `/blog/${slug}` : `/blog/${slug}?lang=${lang}`
}
