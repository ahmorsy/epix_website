import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, FileText } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
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
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط¯ظˆط±ط© ط§ظ„ط´ط±ط§ط، ط¥ظ„ظ‰ ط§ظ„ط³ط¯ط§ط¯ ظ…ط¹ ط§ظ„طھط²ط§ظ… ETA ط§ظ„ظ…ط¯ظ…ط¬',
    desc: 'طھط±ط¨ط· ظˆط­ط¯ط© P2P ظپظٹ EPIX طھط¨ط§ط¯ظ„ ظپظˆط§طھظٹط± ETA ط¨ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط§ظ„ظٹط© ظ„ط¶ظ…ط§ظ† ط±ط¤ظٹط© ط¶ط±ظٹط¨ظٹط© ظˆطھظ†ظپظٹط° ظ…ط­ظƒظˆظ… ظ„ظ„ط¯ظˆط±ط©.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ P2P ظˆ ETA',
    capabilities: [
      'ظ…ط²ط§ظ…ظ†ط© ط§ظ„ظپظˆط§طھظٹط± ط§ظ„ظ…ط³طھظ„ظ…ط© ظˆط§ظ„ظ…ط±ط³ظ„ط© ظ…ط¹ ETA.',
      'ط±ط¤ظٹط© ط­ط§ظ„ط§طھ ط§ظ„ط¶ط±ظٹط¨ط© ظ„ظ„ط§ظ„طھط²ط§ظ… ظˆط§ظ„ظ…طھط§ط¨ط¹ط©.',
      'ظ…ظ„ط®طµط§طھ طھظ†ظپظٹط°ظٹط© ظ…طھط±ط§ط¨ط·ط© ظ„ظ„ط¯ط§ط¦ظ†ظٹظ† ظˆط§ظ„ظ…ط¯ظٹظ†ظٹظ†.',
      'ظ…ط±ط§ظ‚ط¨ط© ط¯ظˆط±ط© ط§ظ„ظپط§طھظˆط±ط© ظ„ظ„ط¬ط§ظ‡ط²ظٹط© ط§ظ„طھط¯ظ‚ظٹظ‚ظٹط©.',
      'ط­ظˆظƒظ…ط© ظ…ط´طھط±ظƒط© ط¨ظٹظ† ط§ظ„ظ…ط§ظ„ظٹط© ظˆط§ظ„ط¶ط±ظٹط¨ط©.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ط§ظ„طھط²ط§ظ… ظپظٹ P2P',
    flow: ['طھط¨ط§ط¯ظ„ ط§ظ„ظپظˆط§طھظٹط± ظ…ط¹ ETA', 'ط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ط§ظ„ط­ط§ظ„ط§طھ ط§ظ„ط¶ط±ظٹط¨ظٹط©', 'ظ…طھط§ط¨ط¹ط© ط£ط«ط±ظ‡ط§ ط¹ظ„ظ‰ AP ظˆAR', 'ظ…ط¹ط§ظ„ط¬ط© ط§ظ„ط§ط³طھط«ظ†ط§ط،ط§طھ', 'ط¥ط؛ظ„ط§ظ‚ ط¯ظˆط±ط© ط§ظ„ط§ظ„طھط²ط§ظ…'],
    galleryTitle: 'ط´ط§ط´ط§طھ P2P ظˆ ETA',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['ط«ظ‚ط© ط£ط¹ظ„ظ‰ ظپظٹ ط§ظ„ط§ظ„طھط²ط§ظ… ط§ظ„ط¶ط±ظٹط¨ظٹ', 'طھط³ط±ظٹط¹ ظ…ط·ط§ط¨ظ‚ط© ط§ظ„ظپظˆط§طھظٹط±', 'طھظ‚ظ„ظٹظ„ ط¹ط¨ط، ط§ظ„ط§ظ„طھط²ط§ظ… ط§ظ„ظٹط¯ظˆظٹ'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/881-eta-top-customers.PNG', title: { en: 'ETA Customer Insights', fr: 'Insights ETA clients', ar: 'ط±ط¤ظ‰ ETA ظ„ظ„ط¹ظ…ظ„ط§ط،' }, caption: { en: 'Customer-side ETA trends for compliance and risk review.', fr: 'Tendances ETA cote clients pour conformite et risque.', ar: 'ط§طھط¬ط§ظ‡ط§طھ ETA ظ…ظ† ط¬ط§ظ†ط¨ ط§ظ„ط¹ظ…ظ„ط§ط، ظ„ظ„ط§ظ„طھط²ط§ظ… ظˆظ…ط±ط§ط¬ط¹ط© ط§ظ„ظ…ط®ط§ط·ط±.' } },
  { src: '/screenshots/882-eta-top-vendors.PNG', title: { en: 'ETA Vendor Insights', fr: 'Insights ETA fournisseurs', ar: 'ط±ط¤ظ‰ ETA ظ„ظ„ظ…ظˆط±ط¯ظٹظ†' }, caption: { en: 'Vendor concentration and submission patterns.', fr: 'Concentration fournisseurs et patterns de soumission.', ar: 'طھط±ظƒظٹط² ط§ظ„ظ…ظˆط±ط¯ظٹظ† ظˆط£ظ†ظ…ط§ط· ط§ظ„ط¥ط±ط³ط§ظ„ ط§ظ„ط¶ط±ظٹط¨ظٹ.' } },
  { src: '/screenshots/71-payable-volume-summary.PNG', title: { en: 'P2P Volume Impact', fr: 'Impact volume P2P', ar: 'ط£ط«ط± ط­ط¬ظ… ظ…ط¹ط§ظ…ظ„ط§طھ P2P' }, caption: { en: 'Connected payable volumes influenced by ETA flows.', fr: 'Volumes fournisseurs connectes influences par flux ETA.', ar: 'ط£ط­ط¬ط§ظ… ط§ظ„ط¯ط§ط¦ظ†ظٹظ† ط§ظ„ظ…ط±طھط¨ط·ط© ظˆط§ظ„ظ…طھط£ط«ط±ط© ط¨طھط¯ظپظ‚ط§طھ ETA.' } },
]

export function ProcureToPayPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
        <section className="mt-6 rounded-3xl border border-[#d7e4ff] bg-gradient-to-br from-[#f6f9ff] via-white to-[#eef7ff] p-7 md:p-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Procure To Pay</p><h1 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><ol className="mt-4 space-y-3">{t.flow.map((step, idx) => <li key={step} className="flex items-start gap-3 text-sm text-[var(--text-muted)]"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold text-[#335fae]">{idx + 1}</span><span>{step}</span></li>)}</ol></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">P2P</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><FileText className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
      </main>
      {selected && (
        <AccessibleImageModal
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={selected.title[lang]}
          imageSrc={selected.src}
          imageAlt={selected.title[lang]}
          closeLabel={t.close}
          subtitle={selected.caption[lang]}
        />
      )}
    </div>
  )
}
