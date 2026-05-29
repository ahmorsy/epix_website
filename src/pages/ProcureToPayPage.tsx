import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Procure To Pay With ETA Compliance Built In',
    desc: 'EPIX P2P integrates ETA invoice exchange with finance operations to ensure tax visibility and controlled procure-to-pay execution.',
    capabilitiesTitle: 'P2P And ETA Capabilities',
    capabilities: [
      'ETA received and submitted invoice synchronization.',
      'Tax status visibility for compliance and follow-up.',
      'Connected AP/AR executive summaries.',
      'Invoice lifecycle monitoring for audit readiness.',
      'Cross-functional finance and tax governance.',
    ],
    flowTitle: 'P2P Compliance Flow',
    flow: ['Exchange invoices with ETA', 'Validate tax statuses', 'Track AP and AR implications', 'Resolve exceptions', 'Close compliance cycle'],
    galleryTitle: 'P2P And ETA Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Higher tax compliance confidence', 'Faster invoice reconciliation', 'Reduced manual compliance overhead'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Procure To Pay Avec Conformite ETA Integree',
    desc: 'EPIX P2P connecte echange de factures ETA et operations finance pour une conformite fiscale continue.',
    capabilitiesTitle: 'Capacites P2P Et ETA',
    capabilities: [
      'Synchronisation factures recues et soumises ETA.',
      'Visibilite des statuts fiscaux et suivi des anomalies.',
      'Syntheses executives reliees AP/AR.',
      'Suivi du cycle facture pour preparation audit.',
      'Gouvernance transverse finance et fiscalite.',
    ],
    flowTitle: 'Flux Conformite P2P',
    flow: ['Echanger factures avec ETA', 'Valider statuts fiscaux', 'Suivre impacts AP et AR', 'Resoudre exceptions', 'Clore le cycle conformite'],
    galleryTitle: 'Ecrans P2P Et ETA',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Confiance conformite accrue', 'Rapprochement factures plus rapide', 'Moins de travail manuel fiscal'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'دورة الشراء إلى السداد مع التزام ETA المدمج',
    desc: 'تربط وحدة P2P في EPIX تبادل فواتير ETA بالعمليات المالية لضمان رؤية ضريبية وتنفيذ محكوم للدورة.',
    capabilitiesTitle: 'قدرات P2P و ETA',
    capabilities: [
      'مزامنة الفواتير المستلمة والمرسلة مع ETA.',
      'رؤية حالات الضريبة للالتزام والمتابعة.',
      'ملخصات تنفيذية مترابطة للدائنين والمدينين.',
      'مراقبة دورة الفاتورة للجاهزية التدقيقية.',
      'حوكمة مشتركة بين المالية والضريبة.',
    ],
    flowTitle: 'تدفق الالتزام في P2P',
    flow: ['تبادل الفواتير مع ETA', 'التحقق من الحالات الضريبية', 'متابعة أثرها على AP وAR', 'معالجة الاستثناءات', 'إغلاق دورة الالتزام'],
    galleryTitle: 'شاشات P2P و ETA',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['ثقة أعلى في الالتزام الضريبي', 'تسريع مطابقة الفواتير', 'تقليل عبء الالتزام اليدوي'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/881-eta-top-customers.PNG', title: { en: 'ETA Customer Insights', fr: 'Insights ETA clients', ar: 'رؤى ETA للعملاء' }, caption: { en: 'Customer-side ETA trends for compliance and risk review.', fr: 'Tendances ETA cote clients pour conformite et risque.', ar: 'اتجاهات ETA من جانب العملاء للالتزام ومراجعة المخاطر.' } },
  { src: '/screenshots/882-eta-top-vendors.PNG', title: { en: 'ETA Vendor Insights', fr: 'Insights ETA fournisseurs', ar: 'رؤى ETA للموردين' }, caption: { en: 'Vendor concentration and submission patterns.', fr: 'Concentration fournisseurs et patterns de soumission.', ar: 'تركيز الموردين وأنماط الإرسال الضريبي.' } },
  { src: '/screenshots/71-payable-volume-summary.PNG', title: { en: 'P2P Volume Impact', fr: 'Impact volume P2P', ar: 'أثر حجم معاملات P2P' }, caption: { en: 'Connected payable volumes influenced by ETA flows.', fr: 'Volumes fournisseurs connectes influences par flux ETA.', ar: 'أحجام الدائنين المرتبطة والمتأثرة بتدفقات ETA.' } },
]

export function ProcureToPayPage({ lang = 'en' }: { lang?: Lang }) {
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
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Procure To Pay</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/882-eta-top-vendors.PNG" alt="Top Vendors" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">P2P</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><FileText className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
