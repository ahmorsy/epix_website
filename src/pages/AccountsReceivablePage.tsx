import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Accounts Receivable For Faster Collection And Revenue Visibility',
    desc: 'EPIX AR helps teams track receivable volume, outstanding balances, and aging risk with stronger collection execution.',
    capabilitiesTitle: 'Accounts Receivable Capabilities',
    capabilities: [
      'Receivable transaction and receipt lifecycle control.',
      'Outstanding and aging analytics for collection prioritization.',
      'Sales incentive integration with commercial performance.',
      'Discount and pricing policy support across AR operations.',
      'Customer concentration reporting for risk-aware planning.',
    ],
    flowTitle: 'Order To Collection Flow',
    flow: ['Issue receivable documents', 'Track due balances', 'Prioritize overdue segments', 'Record collections and receipts', 'Monitor AR health and KPIs'],
    galleryTitle: 'Accounts Receivable Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Improved collection speed', 'Lower overdue risk', 'Clearer revenue-cycle control'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Comptes Clients Pour Un Recouvrement Plus Rapide',
    desc: 'EPIX AR aide a suivre volume, encours et anciennete clients pour accelerer le recouvrement.',
    capabilitiesTitle: 'Capacites Comptes Clients',
    capabilities: [
      'Controle du cycle transactions clients et encaissements.',
      'Analytique encours et anciennete pour priorisation recouvrement.',
      'Integration incentives commerciaux avec performance.',
      'Support des politiques remises et tarification.',
      'Reporting concentration clients pour gestion du risque.',
    ],
    flowTitle: 'Flux Commande A Encaissement',
    flow: ['Emettre les transactions clients', 'Suivre les soldes dus', 'Prioriser les retards', 'Enregistrer les encaissements', 'Piloter KPI du poste clients'],
    galleryTitle: 'Ecrans Comptes Clients',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Recouvrement accelere', 'Risque d impaye reduit', 'Pilotage clair du cycle revenus'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'الحسابات المدينة لتحصيل أسرع ورؤية أوضح للإيرادات',
    desc: 'تساعد وحدة AR في EPIX على تتبع حجم الذمم والأرصدة القائمة ومخاطر الأعمار مع تنفيذ أقوى لعمليات التحصيل.',
    capabilitiesTitle: 'قدرات الحسابات المدينة',
    capabilities: [
      'التحكم في دورة معاملات العملاء والتحصيلات.',
      'تحليلات الأرصدة والأعمار لتحديد أولويات التحصيل.',
      'تكامل حوافز المبيعات مع الأداء التجاري.',
      'دعم سياسات الخصومات والتسعير في عمليات AR.',
      'تقارير تركز العملاء لدعم إدارة المخاطر.',
    ],
    flowTitle: 'تدفق الطلب إلى التحصيل',
    flow: ['إصدار معاملات العملاء', 'متابعة الأرصدة المستحقة', 'ترتيب أولويات المتأخرات', 'تسجيل التحصيلات والإيصالات', 'مراقبة صحة الذمم ومؤشرات الأداء'],
    galleryTitle: 'شاشات الحسابات المدينة',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['تحصيل أسرع', 'تقليل مخاطر التعثر', 'تحكم أوضح بدورة الإيرادات'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/81-receivable-volume-summary.PNG', title: { en: 'Receivable Volume Summary', fr: 'Synthese volume clients', ar: 'ملخص حجم الذمم المدينة' }, caption: { en: 'Visibility into AR transaction throughput.', fr: 'Visibilite sur le debit du poste clients.', ar: 'رؤية لحجم تدفقات معاملات العملاء.' } },
  { src: '/screenshots/82-receivable-outstanding-summary.PNG', title: { en: 'Outstanding Receivables', fr: 'Encours clients', ar: 'الأرصدة المدينة القائمة' }, caption: { en: 'Outstanding balances segmented for action.', fr: 'Encours segmentes pour action ciblee.', ar: 'تصنيف الأرصدة القائمة لاتخاذ إجراءات التحصيل.' } },
  { src: '/screenshots/83-receivable-aging-summary.PNG', title: { en: 'Receivable Aging Analysis', fr: 'Analyse anciennete clients', ar: 'تحليل أعمار الذمم المدينة' }, caption: { en: 'Aging risk view to improve DSO performance.', fr: 'Vue du risque d anciennete pour ameliorer DSO.', ar: 'رؤية مخاطر الأعمار لتحسين مؤشرات التحصيل.' } },
]

export function AccountsReceivablePage({ lang = 'en' }: { lang?: Lang }) {
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
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Accounts Receivable</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/81-receivable-volume-summary.PNG" alt="Receivable Volume Summary" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">AR</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Globe2 className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
