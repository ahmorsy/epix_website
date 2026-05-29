import type { Lang } from '../seo/types'
import { blogPosts } from './blogData'
import { blogPath, estimateReadingTime, pickLocalized } from './blogUtils'

const copy: Record<Lang, { eyebrow: string; title: string; subtitle: string; readMore: string; readingTime: string; backHome: string }> = {
  en: {
    eyebrow: 'EPIX Insights',
    title: 'ERP and AI Knowledge Hub',
    subtitle: 'Practical guidance for enterprise leaders on ERP strategy, implementation, AI, and regional transformation.',
    readMore: 'Read article',
    readingTime: 'min read',
    backHome: 'Back to home',
  },
  fr: {
    eyebrow: 'Insights EPIX',
    title: 'Hub de connaissances ERP et IA',
    subtitle: 'Guides pratiques pour dirigeants sur strategie ERP, implementation, IA et transformation regionale.',
    readMore: 'Lire article',
    readingTime: 'min lecture',
    backHome: 'Retour accueil',
  },
  ar: {
    eyebrow: 'رؤى EPIX',
    title: 'مركز معرفة ERP والذكاء الاصطناعي',
    subtitle: 'ارشادات عملية للقيادات حول استراتيجية ERP والتنفيذ والذكاء الاصطناعي والتحول الاقليمي.',
    readMore: 'اقرا المقال',
    readingTime: 'دقيقة قراءة',
    backHome: 'العودة للرئيسية',
  },
  es: {
    eyebrow: 'Insights EPIX',
    title: 'Hub de conocimiento ERP e IA',
    subtitle: 'Guia practica para lideres empresariales sobre estrategia ERP, implementacion, IA y transformacion regional.',
    readMore: 'Leer articulo',
    readingTime: 'min lectura',
    backHome: 'Volver al inicio',
  },
}

export function BlogIndexPage({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const isRtl = lang === 'ar'

  return (
    <main className={`mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14 ${isRtl ? 'lang-ar' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <a href={lang === 'en' ? '/' : `/?lang=${lang}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
          {t.backHome}
        </a>
        <a href={lang === 'en' ? '/product-tour' : `/product-tour?lang=${lang}`} className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--text)] hover:border-[var(--brand)]">
          Product Tour
        </a>
      </div>

      <section className="mt-6 rounded-3xl border border-[#d7e4ff] bg-gradient-to-r from-[#f7fbff] to-[#f0f7ff] p-6 md:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">{t.eyebrow}</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-[var(--text)] md:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.subtitle}</p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c6d7ff] hover:shadow-md">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5174ac]">{pickLocalized(post.category, lang)}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[var(--text)]">{pickLocalized(post.title, lang)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{pickLocalized(post.description, lang)}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-muted)]">
              <span>{new Date(post.datePublished).toLocaleDateString()}</span>
              <span>
                {estimateReadingTime(post, lang)} {t.readingTime}
              </span>
            </div>
            <a href={blogPath(post.slug, lang)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
              {t.readMore}
            </a>
          </article>
        ))}
      </section>
    </main>
  )
}
