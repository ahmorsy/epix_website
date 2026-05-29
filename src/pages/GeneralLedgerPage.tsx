import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { SmartImage } from '../components/SmartImage'
import { ArrowRight, CheckCircle2, Landmark } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'General Ledger Built For Fast Close And Strong Financial Control',
    desc: 'EPIX General Ledger gives finance teams a structured, auditable posting model with multi-currency reporting, revaluation controls, and faster period closure.',
    capabilitiesTitle: 'General Ledger Capabilities',
    capabilities: [
      'Chart of accounts and account combinations governance.',
      'Journal batch controls with approval and posting discipline.',
      'Fiscal calendar, period close, and reversal workflows.',
      'Multi-currency trial balance and financial reporting.',
      'Revaluation setup and execution with transparent traceability.',
    ],
    flowTitle: 'Financial Flow In GL',
    flow: ['Configure ledger and fiscal structure', 'Capture and validate journals', 'Approve and post transactions', 'Run trial balances and revaluation', 'Close period with audit trail'],
    galleryTitle: 'General Ledger Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Faster month-end close', 'Higher posting accuracy', 'Audit-ready financial records'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Grand Livre Concu Pour Une Cloture Rapide Et Un Controle Financier Solide',
    desc: 'Le Grand Livre EPIX fournit un modele de comptabilisation structure et auditable avec reporting multidevise, revalorisation et cloture plus rapide.',
    capabilitiesTitle: 'Capacites Du Grand Livre',
    capabilities: [
      'Gouvernance du plan de comptes et des combinaisons comptables.',
      'Controle des lots de journaux avec approbation et discipline de comptabilisation.',
      'Calendrier fiscal, cloture de periode et ecritures de contrepassation.',
      'Balance multidevise et reporting financier detaille.',
      'Configuration de revalorisation avec tracabilite complete.',
    ],
    flowTitle: 'Flux Financier GL',
    flow: ['Configurer le ledger et les periodes', 'Saisir et valider les journaux', 'Approuver et comptabiliser', 'Executer balance et revalorisation', 'Cloturer avec piste d audit'],
    galleryTitle: 'Ecrans Grand Livre',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Cloture mensuelle plus rapide', 'Comptabilisation plus fiable', 'Piste d audit complete'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'دفتر أستاذ عام مصمم لإغلاق أسرع وتحكم مالي أقوى',
    desc: 'يوفر دفتر الأستاذ العام في EPIX نموذج ترحيل محكم وقابل للتدقيق مع تقارير متعددة العملات وضوابط إعادة التقييم وتسريع الإغلاق الدوري.',
    capabilitiesTitle: 'قدرات دفتر الأستاذ العام',
    capabilities: [
      'حوكمة دليل الحسابات وتركيبات الحسابات.',
      'ضبط دفعات القيود مع الموافقات وانضباط الترحيل.',
      'إدارة التقويم المالي والإغلاق والقيود العكسية.',
      'ميزان مراجعة متعدد العملات وتقارير مالية دقيقة.',
      'إعداد وتنفيذ إعادة التقييم مع تتبع واضح.',
    ],
    flowTitle: 'التدفق المالي في GL',
    flow: ['تهيئة الدفتر والفترات المالية', 'إدخال القيود والتحقق منها', 'اعتماد المعاملات وترحيلها', 'تشغيل ميزان المراجعة وإعادة التقييم', 'إغلاق الفترة مع أثر تدقيقي'],
    galleryTitle: 'شاشات دفتر الأستاذ العام',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['إغلاق شهري أسرع', 'دقة أعلى في الترحيل', 'سجلات مالية جاهزة للتدقيق'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/9-GL-Journals.PNG',
    title: { en: 'GL Journals Control', fr: 'Controle des journaux GL', ar: 'التحكم في قيود GL' },
    caption: {
      en: 'Journal posting workspace with disciplined accounting controls.',
      fr: 'Espace de comptabilisation des journaux avec controles rigoureux.',
      ar: 'مساحة ترحيل القيود مع ضوابط محاسبية محكمة.',
    },
  },
  {
    src: '/screenshots/4-chart-builder.PNG',
    title: { en: 'Financial Visualization', fr: 'Visualisation financiere', ar: 'تصور مالي' },
    caption: {
      en: 'Interactive views for trial balance and period performance analytics.',
      fr: 'Vues interactives pour la balance et la performance de periode.',
      ar: 'عروض تفاعلية لميزان المراجعة وأداء الفترات المالية.',
    },
  },
  {
    src: '/screenshots/4-chart-builder2.PNG',
    title: { en: 'Advanced Reporting Layer', fr: 'Couche de reporting avancee', ar: 'طبقة تقارير متقدمة' },
    caption: {
      en: 'Configurable finance dashboards for management and audit teams.',
      fr: 'Tableaux de bord financiers configurables pour gestion et audit.',
      ar: 'لوحات مالية قابلة للتهيئة للإدارة وفرق التدقيق.',
    },
  },
]

export function GeneralLedgerPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? moduleEsObject(copy.en) : copy[contentLang]
  const text = (value: string) => (lang === 'es' ? moduleEsText(value) : value)

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="flex items-center justify-between">
          <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
            <ArrowRight size={14} className="rotate-180" />
            {t.backToHome}
          </a>
          <a href={`/?lang=${lang}`}><img src="/EPIX.png" alt="EPIX" className="h-20 w-auto drop-shadow-sm" /></a>
        </div>

        <section aria-labelledby="gl-hero-heading" className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10">
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">General Ledger</p>
          <h1 id="gl-hero-heading" className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
            <img
              src="/screenshots/9-GL-Journals.PNG"
              alt="GL Journals"
              loading="eager"
              decoding="async"
              className="h-52 w-full object-cover object-top md:h-64"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
        </section>

        <section aria-labelledby="gl-capabilities-heading" className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 id="gl-capabilities-heading" className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.capabilities.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 id="gl-flow-heading" className="font-display text-2xl font-bold">{t.flowTitle}</h2>
            <div className="flow-pipeline mt-5">
              {t.flow.map((step, idx) => (
                <div key={step} className="flow-pipeline-step">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-[var(--text)]">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="gl-gallery-heading" className="mt-8">
          <h2 id="gl-gallery-heading" className="font-display text-2xl font-bold">{t.galleryTitle}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {shots.map((shot, index) => (
              <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]">
                    <SmartImage src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">GL</span>
                  </div>
                </button>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section aria-labelledby="gl-outcomes-heading" className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6">
          <div className="flex items-start gap-3">
            <Landmark className="mt-1 text-[var(--brand)]" />
            <div>
              <h2 id="gl-outcomes-heading" className="font-display text-2xl font-bold">{t.outcomesTitle}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {t.outcomes.map((item) => (
                  <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {selected && (
        <AccessibleImageModal
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={text(selected.title[contentLang])}
          imageSrc={selected.src}
          imageAlt={text(selected.title[contentLang])}
          closeLabel={t.close}
          subtitle={text(selected.caption[contentLang])}
        />
      )}
    </div>
  )
}
