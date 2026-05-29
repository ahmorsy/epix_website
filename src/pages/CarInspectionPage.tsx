import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Car Inspection Operations With Structured Quality Control',
    desc: 'EPIX Car Inspection manages inspection types, pricing, daily boards, and transaction follow-up for consistent service quality.',
    capabilitiesTitle: 'Inspection Capabilities',
    capabilities: [
      'Inspection type and attributes master setup.',
      'Price list and ready-comment governance.',
      'Inspection transaction recording and tracking.',
      'Daily board and summary board monitoring.',
      'Productivity and quality reporting for supervisors.',
    ],
    flowTitle: 'Inspection Flow',
    flow: ['Configure inspection standards', 'Register inspection transaction', 'Capture outcomes and notes', 'Review daily board performance', 'Publish quality and productivity reports'],
    galleryTitle: 'Inspection Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Standardized inspection quality', 'Faster service handling', 'Improved operational transparency'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Operations Inspection Automobile Avec Controle Qualite Structure',
    desc: 'EPIX Inspection Auto pilote types d inspection, tarification, tableaux quotidiens et suivi des transactions.',
    capabilitiesTitle: 'Capacites Inspection',
    capabilities: [
      'Parametrage types et attributs d inspection.',
      'Gouvernance tarifs et commentaires predefinis.',
      'Enregistrement et suivi des transactions inspection.',
      'Monitoring tableau journalier et resume journalier.',
      'Reporting productivite et qualite pour superviseurs.',
    ],
    flowTitle: 'Flux Inspection',
    flow: ['Configurer standards inspection', 'Enregistrer transaction', 'Capturer resultats et notes', 'Revoir performance journaliere', 'Publier rapports qualite et productivite'],
    galleryTitle: 'Ecrans Inspection',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Qualite inspection standardisee', 'Traitement plus rapide', 'Transparence operationnelle amelioree'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'عمليات فحص السيارات بضبط جودة منظم',
    desc: 'تدير وحدة فحص السيارات في EPIX أنواع الفحص والتسعير واللوحات اليومية ومتابعة المعاملات لضمان جودة خدمة متسقة.',
    capabilitiesTitle: 'قدرات الفحص',
    capabilities: [
      'تهيئة أنواع الفحص وخصائصه المرجعية.',
      'حوكمة قوائم الأسعار والتعليقات الجاهزة.',
      'تسجيل معاملات الفحص ومتابعتها.',
      'مراقبة اللوحة اليومية والملخص اليومي.',
      'تقارير الإنتاجية والجودة للمشرفين.',
    ],
    flowTitle: 'تدفق الفحص',
    flow: ['تهيئة معايير الفحص', 'تسجيل معاملة الفحص', 'توثيق النتائج والملاحظات', 'مراجعة الأداء اليومي', 'نشر تقارير الجودة والإنتاجية'],
    galleryTitle: 'شاشات الفحص',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['توحيد جودة الفحص', 'تسريع دورة المعاملة', 'شفافية تشغيلية أعلى'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/3-grid-data.PNG', title: { en: 'Inspection Transaction Grid', fr: 'Grille transactions inspection', ar: 'جدول معاملات الفحص' }, caption: { en: 'Line-level tracking of inspection transactions.', fr: 'Suivi detaille des transactions inspection.', ar: 'متابعة تفصيلية لمعاملات الفحص.' } },
  { src: '/screenshots/4-chart-builder.PNG', title: { en: 'Inspection KPI Analytics', fr: 'Analytique KPI inspection', ar: 'تحليلات مؤشرات الفحص' }, caption: { en: 'Visualization of quality and productivity metrics.', fr: 'Visualisation des indicateurs qualite et productivite.', ar: 'عرض مرئي لمؤشرات الجودة والإنتاجية.' } },
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Inspection Workspace Access', fr: 'Acces espace inspection', ar: 'الوصول لمساحة الفحص' }, caption: { en: 'Unified navigation for daily inspection operations.', fr: 'Navigation unifiee pour operations quotidiennes inspection.', ar: 'تنقل موحد لعمليات الفحص اليومية.' } },
]

export function CarInspectionPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? moduleEsObject(copy.en) : copy[contentLang]
  const text = (value: string) => (lang === 'es' ? moduleEsText(value) : value)

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="flex items-center justify-between">
          <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
          <a href={`/?lang=${lang}`}><img src="/EPIX.png" alt="EPIX" className="h-20 w-auto drop-shadow-sm" /></a>
        </div>
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Car Inspection</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/4-chart-builder.PNG" alt="Chart Builder" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">INS</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><ShieldCheck className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
