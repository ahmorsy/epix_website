import type { Lang } from '../seo/types'
import { blogPostBySlug } from './blogData'
import { blogPath, estimateReadingTime, pickLocalized } from './blogUtils'

const copy: Record<Lang, { notFound: string; backToBlog: string; backHome: string; toc: string; related: string; faq: string; author: string; readingTime: string; ctaTitle: string; ctaBody: string; ctaButton: string }> = {
  en: {
    notFound: 'Article not found',
    backToBlog: 'Back to blog',
    backHome: 'Back to home',
    toc: 'Table of contents',
    related: 'Related articles',
    faq: 'FAQ',
    author: 'Author',
    readingTime: 'min read',
    ctaTitle: 'Ready to modernize your ERP program?',
    ctaBody: 'Book a consultation to align your ERP roadmap with enterprise growth, AI adoption, and operational governance.',
    ctaButton: 'Book consultation',
  },
  fr: {
    notFound: 'Article introuvable',
    backToBlog: 'Retour blog',
    backHome: 'Retour accueil',
    toc: 'Table des matieres',
    related: 'Articles lies',
    faq: 'FAQ',
    author: 'Auteur',
    readingTime: 'min lecture',
    ctaTitle: 'Pret a moderniser votre programme ERP ?',
    ctaBody: 'Planifiez une consultation pour aligner votre roadmap ERP avec croissance, IA et gouvernance operationnelle.',
    ctaButton: 'Planifier consultation',
  },
  ar: {
    notFound: 'المقال غير موجود',
    backToBlog: 'العودة للمدونة',
    backHome: 'العودة للرئيسية',
    toc: 'جدول المحتويات',
    related: 'مقالات ذات صلة',
    faq: 'الاسئلة الشائعة',
    author: 'الكاتب',
    readingTime: 'دقيقة قراءة',
    ctaTitle: 'هل انت جاهز لتحديث برنامج ERP؟',
    ctaBody: 'احجز استشارة لمواءمة خارطة ERP مع النمو المؤسسي وتبني الذكاء الاصطناعي والحوكمة التشغيلية.',
    ctaButton: 'احجز استشارة',
  },
  es: {
    notFound: 'Articulo no encontrado',
    backToBlog: 'Volver al blog',
    backHome: 'Volver al inicio',
    toc: 'Tabla de contenido',
    related: 'Articulos relacionados',
    faq: 'Preguntas frecuentes',
    author: 'Autor',
    readingTime: 'min lectura',
    ctaTitle: 'Listo para modernizar tu programa ERP?',
    ctaBody: 'Agenda una consultoria para alinear tu hoja de ruta ERP con crecimiento empresarial, adopcion de IA y gobernanza operativa.',
    ctaButton: 'Agendar consultoria',
  },
}

export function BlogArticlePage({ slug, lang }: { slug: string; lang: Lang }) {
  const t = copy[lang]
  const post = blogPostBySlug[slug]
  const isRtl = lang === 'ar'

  if (!post) {
    return (
      <main className={`mx-auto w-full max-w-4xl px-5 pb-16 pt-16 md:px-8 ${isRtl ? 'lang-ar' : ''}`}>
        <h1 className="font-display text-4xl font-bold text-[var(--text)]">{t.notFound}</h1>
        <a href={lang === 'en' ? '/blog' : `/blog?lang=${lang}`} className="mt-6 inline-flex items-center gap-2 text-[var(--brand)] hover:underline">
          {t.backToBlog}
        </a>
      </main>
    )
  }

  const related = post.relatedSlugs.map((item) => blogPostBySlug[item]).filter(Boolean)

  return (
    <main className={`mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14 ${isRtl ? 'lang-ar' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-sm">
          <a href={lang === 'en' ? '/blog' : `/blog?lang=${lang}`} className="font-semibold text-[var(--brand)] hover:underline">
            {t.backToBlog}
          </a>
          <span className="text-[var(--text-muted)]">/</span>
          <a href={lang === 'en' ? '/' : `/?lang=${lang}`} className="font-semibold text-[var(--text)] hover:underline">
            {t.backHome}
          </a>
        </div>
        <a href={lang === 'en' ? '/product-tour' : `/product-tour?lang=${lang}`} className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--text)] hover:border-[var(--brand)]">
          Product Tour
        </a>
      </div>

      <article className="mt-6 grid gap-6 lg:grid-cols-[0.72fr_0.28fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-white p-6 md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#5678b3]">{pickLocalized(post.category, lang)}</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-[var(--text)] md:text-5xl">{pickLocalized(post.title, lang)}</h1>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{pickLocalized(post.description, lang)}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>
              {t.author}: {post.author}
            </span>
            <span>•</span>
            <span>{new Date(post.datePublished).toLocaleDateString()}</span>
            <span>•</span>
            <span>
              {estimateReadingTime(post, lang)} {t.readingTime}
            </span>
          </div>

          <div className="mt-8 space-y-8">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2 className="font-display text-2xl font-bold text-[var(--text)]">{pickLocalized(section.heading, lang)}</h2>
                <div className="mt-3 space-y-3 text-[15px] leading-7 text-[var(--text-muted)]">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={`${section.id}-${index}`}>{pickLocalized(paragraph, lang)}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-8 rounded-2xl border border-[#d6e4ff] bg-[#f7fbff] p-5">
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">{t.faq}</h2>
            <div className="mt-4 space-y-4">
              {post.faq.map((entry, index) => (
                <article key={`${slug}-faq-${index}`} className="rounded-xl border border-[#dbe7ff] bg-white p-4">
                  <h3 className="text-base font-semibold text-[var(--text)]">{pickLocalized(entry.question, lang)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{pickLocalized(entry.answer, lang)}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f4f8ff] to-[#eef8f8] p-5">
            <h2 className="font-display text-2xl font-bold text-[var(--text)]">{t.ctaTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{t.ctaBody}</p>
            <a href={lang === 'en' ? '/#contact' : `/?lang=${lang}#contact`} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-sm">
              {t.ctaButton}
            </a>
          </section>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <h2 className="font-display text-xl font-bold text-[var(--text)]">{t.toc}</h2>
            <nav className="mt-3 space-y-2">
              {post.sections.map((section) => (
                <a key={section.id} href={`#${section.id}`} className="block text-sm font-semibold text-[var(--brand)] hover:underline">
                  {pickLocalized(section.heading, lang)}
                </a>
              ))}
            </nav>
          </section>

          <section className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <h2 className="font-display text-xl font-bold text-[var(--text)]">{t.related}</h2>
            <div className="mt-3 space-y-3">
              {related.map((entry) => (
                <a key={entry.slug} href={blogPath(entry.slug, lang)} className="block rounded-xl border border-[#dbe7ff] bg-[#f8fbff] p-3 transition hover:border-[#aac6fb]">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#5678b3]">{pickLocalized(entry.category, lang)}</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--text)]">{pickLocalized(entry.title, lang)}</p>
                </a>
              ))}
            </div>
          </section>
        </aside>
      </article>
    </main>
  )
}
