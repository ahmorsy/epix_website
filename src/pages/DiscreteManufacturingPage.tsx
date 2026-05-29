import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Rocket } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Discrete Manufacturing For Controlled Production Execution',
    desc: 'EPIX Discrete Manufacturing coordinates order planning, process tracking, inspection, and packing follow-up for predictable delivery.',
    capabilitiesTitle: 'Manufacturing Capabilities',
    capabilities: [
      'Production process and section definition controls.',
      'Production order upload, revision, and tracking.',
      'Inspection and RFI follow-up during execution.',
      'Packing list creation and readiness monitoring.',
      'Processed quantity and completion performance reporting.',
    ],
    flowTitle: 'Production Flow',
    flow: ['Set process model', 'Create and release production orders', 'Execute and inspect', 'Pack and prepare shipment', 'Track completion and variance'],
    galleryTitle: 'Manufacturing Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Better production visibility', 'Lower execution variance', 'More confident delivery commitments'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Fabrication Discrete Pour Une Execution Controlee',
    desc: 'EPIX Fabrication coordonne planification des ordres, suivi process, inspection et emballage pour une livraison previsible.',
    capabilitiesTitle: 'Capacites Fabrication',
    capabilities: [
      'Controle de definition des processus et sections.',
      'Upload, revision et suivi des ordres de production.',
      'Suivi inspection et RFI durant execution.',
      'Generation des listes de colisage et readiness.',
      'Reporting quantites traitees et taux d achevement.',
    ],
    flowTitle: 'Flux Production',
    flow: ['Definir le modele de process', 'Creer et lancer ordres', 'Executer et inspecter', 'Emballer et preparer expedition', 'Suivre achevement et ecarts'],
    galleryTitle: 'Ecrans Fabrication',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Visibilite production renforcee', 'Ecarts d execution reduits', 'Engagements livraison plus fiables'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'التصنيع المتقطع لتنفيذ إنتاجي محكوم',
    desc: 'تنسق وحدة التصنيع المتقطع في EPIX تخطيط الأوامر وتتبع العمليات والفحص ومتابعة التعبئة لتسليم أكثر موثوقية.',
    capabilitiesTitle: 'قدرات التصنيع المتقطع',
    capabilities: [
      'ضبط تعريف العمليات والأقسام الإنتاجية.',
      'رفع أوامر الإنتاج ومراجعتها وتتبعها.',
      'متابعة الفحص وطلبات المعاينة أثناء التنفيذ.',
      'إعداد قوائم التعبئة ومراقبة جاهزية الشحن.',
      'تقارير الكميات المنجزة ومعدلات الإكمال.',
    ],
    flowTitle: 'تدفق الإنتاج',
    flow: ['تحديد نموذج العمليات', 'إنشاء أوامر الإنتاج وإطلاقها', 'تنفيذ وفحص الإنتاج', 'التعبئة والتحضير للشحن', 'متابعة الإنجاز والانحرافات'],
    galleryTitle: 'شاشات التصنيع',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['رؤية أفضل للإنتاج', 'خفض انحرافات التنفيذ', 'رفع موثوقية الالتزام بالتسليم'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/92-projects-gantt.PNG', title: { en: 'Production Gantt Planning', fr: 'Planification gantt production', ar: 'تخطيط إنتاج بنمط جانت' }, caption: { en: 'Timeline control for production orders and milestones.', fr: 'Controle timeline des ordres et jalons production.', ar: 'تحكم زمني بأوامر الإنتاج ومحطات التنفيذ.' } },
  { src: '/screenshots/3-grid-data.PNG', title: { en: 'Order Execution Grid', fr: 'Grille execution ordres', ar: 'جدول تنفيذ أوامر الإنتاج' }, caption: { en: 'Detailed tracking of order lines and process progress.', fr: 'Suivi detaille des lignes d ordre et progression.', ar: 'متابعة تفصيلية لبنود الأوامر وتقدم العمليات.' } },
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Manufacturing Workspace', fr: 'Espace fabrication', ar: 'مساحة عمل التصنيع' }, caption: { en: 'Unified operational access for planners and shop-floor teams.', fr: 'Acces operationnel unifie pour planificateurs et atelier.', ar: 'وصول تشغيلي موحد للمخططين وفرق التشغيل.' } },
]

export function DiscreteManufacturingPage({ lang = 'en' }: { lang?: Lang }) {
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
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Discrete Manufacturing</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/92-projects-gantt.PNG" alt="Projects Gantt" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">MFG</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Rocket className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
