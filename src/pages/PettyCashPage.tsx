import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, CircleDollarSign } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Petty Cash And Business Trips Under Full Policy Control',
    desc: 'EPIX manages business trip advances, petty cash settlement, and expense reconciliation with approval traceability.',
    capabilitiesTitle: 'Petty Cash Capabilities',
    capabilities: [
      'Business trip request and approval lifecycle.',
      'Advance issuance and settlement workflows.',
      'Expense capture with policy compliance checks.',
      'Petty cash replenishment and reconciliation.',
      'Audit-ready tracking of small-cash utilization.',
    ],
    flowTitle: 'Petty Cash Flow',
    flow: ['Create request', 'Approve and issue advance', 'Capture spending evidence', 'Settle and reconcile', 'Report utilization and compliance'],
    galleryTitle: 'Petty Cash Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Lower spending leakage', 'Faster settlement cycles', 'Better visibility of field cash usage'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Petite Caisse Et Missions Sous Controle Politique',
    desc: 'EPIX pilote avances de mission, reglement de depenses et rapprochement de petite caisse avec traط£آ§abilite.',
    capabilitiesTitle: 'Capacites Petite Caisse',
    capabilities: [
      'Cycle demande et approbation de mission.',
      'Emission des avances et suivi de reglement.',
      'Capture des depenses avec controles de conformite.',
      'Reapprovisionnement et rapprochement petite caisse.',
      'Traط£آ§abilite audit des usages cash terrain.',
    ],
    flowTitle: 'Flux Petite Caisse',
    flow: ['Creer demande', 'Approuver et emettre avance', 'Saisir justificatifs', 'Regler et rapprocher', 'Reporter utilisation et conformite'],
    galleryTitle: 'Ecrans Petite Caisse',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Moins de fuite de depenses', 'Reglement plus rapide', 'Visibilite accrue du cash operationnel'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'العهدة النقدية ورحلات العمل تحت تحكم سياساتي كامل',
    desc: 'يدير EPIX سلف رحلات العمل وتسوية العهدة والمصروفات مع تتبع كامل للموافقات.',
    capabilitiesTitle: 'قدرات العهدة النقدية',
    capabilities: [
      'دورة طلب واعتماد رحلات العمل.',
      'إصدار السلف ومتابعة التسوية.',
      'تسجيل المصروفات مع فحوصات الالتزام بالسياسات.',
      'إعادة تغذية العهدة وتنفيذ المطابقة.',
      'تتبع تدقيقي لاستخدام النقد الميداني.',
    ],
    flowTitle: 'تدفق العهدة النقدية',
    flow: ['إنشاء الطلب', 'اعتماد وإصدار السلفة', 'تسجيل مستندات الصرف', 'التسوية والمطابقة', 'تقارير الاستخدام والالتزام'],
    galleryTitle: 'شاشات العهدة النقدية',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['خفض تسرب المصروفات', 'تسويات أسرع', 'رؤية أوضح لاستخدام النقد التشغيلي'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/6-petty-cash.PNG', title: { en: 'Petty Cash Transactions', fr: 'Transactions petite caisse', ar: 'معاملات العهدة النقدية' }, caption: { en: 'Operational control for disbursements and settlement.', fr: 'Controle operationnel des decaissements et reglements.', ar: 'تحكم تشغيلي في الصرف والتسويات.' } },
  { src: '/screenshots/9-cash-manag-statement-upload.PNG', title: { en: 'Cash Proof Integration', fr: 'Integration preuves cash', ar: 'تكامل إثباتات النقد' }, caption: { en: 'Supporting cash evidence and statement alignment.', fr: 'Prise en charge des justificatifs cash et alignement releves.', ar: 'دعم مستندات النقد ومواءمتها مع الكشوف.' } },
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Trip And Cash Workspace', fr: 'Espace mission et cash', ar: 'مساحة رحلات العمل والنقد' }, caption: { en: 'Unified access to request, approve, and settle processes.', fr: 'Acces unifie aux processus demande, validation et reglement.', ar: 'وصول موحد لطلب واعتماد وتسوية العمليات.' } },
]

export function PettyCashPage({ lang = 'en' }: { lang?: Lang }) {
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
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Petty Cash</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/6-petty-cash.PNG" alt="Petty Cash" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">PC</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><CircleDollarSign className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
