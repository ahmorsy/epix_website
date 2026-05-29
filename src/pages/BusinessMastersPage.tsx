import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Layers3 } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Business Masters For Clean Data Across Every Module',
    desc: 'EPIX Business Masters creates a single trusted source for suppliers, customers, banks, currencies, and shared reference data.',
    capabilitiesTitle: 'Business Masters Capabilities',
    capabilities: [
      'Supplier and customer registries shared across all flows.',
      'Bank and branch reference governance for finance and cash.',
      'Currency and exchange-rate setup for multi-currency operations.',
      'Attribute and taxonomy controls for consistent transactions.',
      'Cross-module item and warehouse master foundations.',
    ],
    flowTitle: 'Master Data Flow',
    flow: ['Define reference entities', 'Approve and publish master records', 'Reuse in business transactions', 'Track edits and version history', 'Audit data ownership and quality'],
    galleryTitle: 'Business Masters Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Higher data consistency', 'Fewer downstream transaction errors', 'Faster onboarding of new entities'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Business Masters Pour Une Donnee Propre Dans Tous Les Modules',
    desc: 'Business Masters EPIX fournit une source de reference unique pour fournisseurs, clients, banques, devises et donnees partagees.',
    capabilitiesTitle: 'Capacites Business Masters',
    capabilities: [
      'Referentiels fournisseurs et clients communs.',
      'Gouvernance banques et agences pour finance et tresorerie.',
      'Parametrage devises et taux de change multidevise.',
      'Controle des attributs et taxonomies transactionnelles.',
      'Fondations articles et entrepots pour tous les modules.',
    ],
    flowTitle: 'Flux Donnees De Base',
    flow: ['Definir les entites de reference', 'Valider et publier', 'Reutiliser dans les transactions', 'Suivre les modifications', 'Auditer propriete et qualite des donnees'],
    galleryTitle: 'Ecrans Business Masters',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Donnees plus coherentes', 'Moins d erreurs de transaction', 'Onboarding plus rapide'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'البيانات المرجعية للأعمال لتوحيد البيانات عبر كل الوحدات',
    desc: 'توفر Business Masters في EPIX مصدرا موحدا وموثوقا للموردين والعملاء والبنوك والعملات والبيانات المرجعية المشتركة.',
    capabilitiesTitle: 'قدرات Business Masters',
    capabilities: [
      'سجلات موحدة للموردين والعملاء عبر كل التدفقات.',
      'حوكمة بيانات البنوك والفروع للمالية والخزينة.',
      'إعداد العملات وأسعار الصرف للعمليات متعددة العملات.',
      'ضبط السمات والتصنيفات لثبات المعاملات.',
      'أساسيات موحدة للمواد والمستودعات عبر الوحدات.',
    ],
    flowTitle: 'تدفق البيانات المرجعية',
    flow: ['تعريف الكيانات المرجعية', 'اعتماد ونشر السجلات', 'استخدامها في المعاملات', 'متابعة التعديلات والإصدارات', 'تدقيق ملكية البيانات وجودتها'],
    galleryTitle: 'شاشات Business Masters',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['اتساق أعلى للبيانات', 'أخطاء أقل في المعاملات', 'إدخال أسرع للكيانات الجديدة'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Master Navigation Hub', fr: 'Hub navigation master', ar: 'مركز تنقل البيانات المرجعية' }, caption: { en: 'Fast access to reference maintenance workspaces.', fr: 'Acces rapide aux espaces de maintenance referentielle.', ar: 'وصول سريع لمساحات صيانة البيانات المرجعية.' } },
  { src: '/screenshots/3-grid-data.PNG', title: { en: 'Reference Data Grid', fr: 'Grille donnees de reference', ar: 'جدول البيانات المرجعية' }, caption: { en: 'Bulk maintenance for master records with filtering and controls.', fr: 'Maintenance en masse des referentiels avec filtres et controles.', ar: 'صيانة جماعية لسجلات البيانات المرجعية مع فلاتر وضوابط.' } },
  { src: '/screenshots/92-projects-gantt.PNG', title: { en: 'Master Governance Planning', fr: 'Planification gouvernance masters', ar: 'تخطيط حوكمة البيانات المرجعية' }, caption: { en: 'Planning and follow-up for data standardization programs.', fr: 'Planification et suivi des initiatives de standardisation des donnees.', ar: 'تخطيط ومتابعة مبادرات توحيد البيانات.' } },
]

export function BusinessMastersPage({ lang = 'en' }: { lang?: Lang }) {
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
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Business Masters</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/3-grid-data.PNG" alt="Business Masters Grid" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">BM</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Layers3 className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
