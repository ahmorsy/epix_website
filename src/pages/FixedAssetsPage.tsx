import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, BadgeCheck, CheckCircle2 } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Fixed Assets Governance Across The Full Asset Lifecycle',
    desc: 'EPIX Fixed Assets controls acquisition, categorization, depreciation, transfers, retirement, and reconciliation against accounting books.',
    capabilitiesTitle: 'Fixed Assets Capabilities',
    capabilities: [
      'Asset category, location, and method setup.',
      'Depreciation schedule and execution controls.',
      'Acquisition and transaction lifecycle tracking.',
      'Transfer, retirement, and disposal workflows.',
      'Asset-to-account reconciliation and reporting.',
    ],
    flowTitle: 'Asset Lifecycle Flow',
    flow: ['Register and classify asset', 'Assign location and depreciation rules', 'Run periodic depreciation', 'Execute transfer or retirement actions', 'Reconcile with accounting records'],
    galleryTitle: 'Fixed Assets Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Accurate asset valuation', 'Stronger compliance evidence', 'Better capital planning decisions'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Gouvernance Des Immobilisations Sur Tout Le Cycle De Vie',
    desc: 'EPIX Immobilisations pilote acquisition, classification, amortissement, transfert, sortie et rapprochement comptable.',
    capabilitiesTitle: 'Capacites Immobilisations',
    capabilities: [
      'Parametrage categories, emplacements et methodes.',
      'Controle des calendriers et executions d amortissement.',
      'Suivi du cycle transactions et acquisitions.',
      'Workflows de transfert, sortie et cession.',
      'Rapprochement actif-vers-comptabilite et reporting.',
    ],
    flowTitle: 'Flux Cycle Actif',
    flow: ['Enregistrer et classifier actif', 'Affecter emplacement et regles amortissement', 'Executer amortissement periodique', 'Traiter transfert ou sortie', 'Rapprocher avec comptabilite'],
    galleryTitle: 'Ecrans Immobilisations',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Valorisation fiable des actifs', 'Conformite renforcee', 'Meilleure planification du capital'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'حوكمة الأصول الثابتة عبر كامل دورة الحياة',
    desc: 'تتحكم وحدة الأصول الثابتة في EPIX بعمليات الاقتناء والتصنيف والإهلاك والنقل والاستبعاد والمطابقة مع الدفاتر المحاسبية.',
    capabilitiesTitle: 'قدرات الأصول الثابتة',
    capabilities: [
      'تهيئة فئات الأصول والمواقع وطرق الإهلاك.',
      'ضبط جداول الإهلاك وتشغيلها دوريا.',
      'تتبع دورة معاملات الأصل والاقتناء.',
      'تدفقات النقل والاستبعاد والتصرف.',
      'مطابقة سجلات الأصل مع الحسابات والتقارير.',
    ],
    flowTitle: 'تدفق دورة حياة الأصل',
    flow: ['تسجيل الأصل وتصنيفه', 'تحديد الموقع وقواعد الإهلاك', 'تشغيل الإهلاك الدوري', 'تنفيذ النقل أو الاستبعاد', 'مطابقة البيانات مع السجلات المحاسبية'],
    galleryTitle: 'شاشات الأصول الثابتة',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['تقييم أدق للأصول', 'دلائل امتثال أقوى', 'قرارات أفضل للتخطيط الرأسمالي'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/5-FA_Dashboard_2026-05-03.png', title: { en: 'Fixed Assets Dashboard', fr: 'Tableau immobilisations', ar: 'لوحة الأصول الثابتة' }, caption: { en: 'Executive indicators for asset lifecycle governance.', fr: 'Indicateurs executifs de gouvernance du cycle des actifs.', ar: 'مؤشرات تنفيذية لحوكمة دورة حياة الأصول.' } },
  { src: '/screenshots/9-GL-Journals.PNG', title: { en: 'Asset Accounting Linkage', fr: 'Lien comptable des actifs', ar: 'الربط المحاسبي للأصول' }, caption: { en: 'Posting and reconciliation continuity with GL.', fr: 'Continuite comptabilisation et rapprochement avec GL.', ar: 'استمرارية الترحيل والمطابقة مع دفتر الأستاذ.' } },
  { src: '/screenshots/4-chart-builder2.PNG', title: { en: 'Depreciation Analytics', fr: 'Analytique amortissement', ar: 'تحليلات الإهلاك' }, caption: { en: 'Visualization of depreciation and book-value trends.', fr: 'Visualisation des tendances amortissement et valeur nette.', ar: 'تصور اتجاهات الإهلاك والقيمة الدفترية.' } },
]

export function FixedAssetsPage({ lang = 'en' }: { lang?: Lang }) {
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
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">{text('Fixed Assets')}</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/5-FA_Dashboard_2026-05-03.png" alt={text('Fixed Assets Dashboard')} loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">FA</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><BadgeCheck className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
