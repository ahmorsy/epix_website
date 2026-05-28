import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, CircleDollarSign } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
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
    desc: 'EPIX pilote avances de mission, reglement de depenses et rapprochement de petite caisse avec traأ§abilite.',
    capabilitiesTitle: 'Capacites Petite Caisse',
    capabilities: [
      'Cycle demande et approbation de mission.',
      'Emission des avances et suivi de reglement.',
      'Capture des depenses avec controles de conformite.',
      'Reapprovisionnement et rapprochement petite caisse.',
      'Traأ§abilite audit des usages cash terrain.',
    ],
    flowTitle: 'Flux Petite Caisse',
    flow: ['Creer demande', 'Approuver et emettre avance', 'Saisir justificatifs', 'Regler et rapprocher', 'Reporter utilisation et conformite'],
    galleryTitle: 'Ecrans Petite Caisse',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Moins de fuite de depenses', 'Reglement plus rapide', 'Visibilite accrue du cash operationnel'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط§ظ„ط¹ظ‡ط¯ط© ط§ظ„ظ†ظ‚ط¯ظٹط© ظˆط±ط­ظ„ط§طھ ط§ظ„ط¹ظ…ظ„ طھط­طھ طھط­ظƒظ… ط³ظٹط§ط³ط§طھظٹ ظƒط§ظ…ظ„',
    desc: 'ظٹط¯ظٹط± EPIX ط³ظ„ظپ ط±ط­ظ„ط§طھ ط§ظ„ط¹ظ…ظ„ ظˆطھط³ظˆظٹط© ط§ظ„ط¹ظ‡ط¯ط© ظˆط§ظ„ظ…طµط±ظˆظپط§طھ ظ…ط¹ طھطھط¨ط¹ ظƒط§ظ…ظ„ ظ„ظ„ظ…ظˆط§ظپظ‚ط§طھ.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط§ظ„ط¹ظ‡ط¯ط© ط§ظ„ظ†ظ‚ط¯ظٹط©',
    capabilities: [
      'ط¯ظˆط±ط© ط·ظ„ط¨ ظˆط§ط¹طھظ…ط§ط¯ ط±ط­ظ„ط§طھ ط§ظ„ط¹ظ…ظ„.',
      'ط¥طµط¯ط§ط± ط§ظ„ط³ظ„ظپ ظˆظ…طھط§ط¨ط¹ط© ط§ظ„طھط³ظˆظٹط©.',
      'طھط³ط¬ظٹظ„ ط§ظ„ظ…طµط±ظˆظپط§طھ ظ…ط¹ ظپط­ظˆطµط§طھ ط§ظ„ط§ظ„طھط²ط§ظ… ط¨ط§ظ„ط³ظٹط§ط³ط§طھ.',
      'ط¥ط¹ط§ط¯ط© طھط؛ط°ظٹط© ط§ظ„ط¹ظ‡ط¯ط© ظˆطھظ†ظپظٹط° ط§ظ„ظ…ط·ط§ط¨ظ‚ط©.',
      'طھطھط¨ط¹ طھط¯ظ‚ظٹظ‚ظٹ ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ†ظ‚ط¯ ط§ظ„ظ…ظٹط¯ط§ظ†ظٹ.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ط¹ظ‡ط¯ط© ط§ظ„ظ†ظ‚ط¯ظٹط©',
    flow: ['ط¥ظ†ط´ط§ط، ط§ظ„ط·ظ„ط¨', 'ط§ط¹طھظ…ط§ط¯ ظˆط¥طµط¯ط§ط± ط§ظ„ط³ظ„ظپط©', 'طھط³ط¬ظٹظ„ ظ…ط³طھظ†ط¯ط§طھ ط§ظ„طµط±ظپ', 'ط§ظ„طھط³ظˆظٹط© ظˆط§ظ„ظ…ط·ط§ط¨ظ‚ط©', 'طھظ‚ط§ط±ظٹط± ط§ظ„ط§ط³طھط®ط¯ط§ظ… ظˆط§ظ„ط§ظ„طھط²ط§ظ…'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط§ظ„ط¹ظ‡ط¯ط© ط§ظ„ظ†ظ‚ط¯ظٹط©',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['ط®ظپط¶ طھط³ط±ط¨ ط§ظ„ظ…طµط±ظˆظپط§طھ', 'طھط³ظˆظٹط§طھ ط£ط³ط±ط¹', 'ط±ط¤ظٹط© ط£ظˆط¶ط­ ظ„ط§ط³طھط®ط¯ط§ظ… ط§ظ„ظ†ظ‚ط¯ ط§ظ„طھط´ط؛ظٹظ„ظٹ'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/6-petty-cash.PNG', title: { en: 'Petty Cash Transactions', fr: 'Transactions petite caisse', ar: 'ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ط¹ظ‡ط¯ط© ط§ظ„ظ†ظ‚ط¯ظٹط©' }, caption: { en: 'Operational control for disbursements and settlement.', fr: 'Controle operationnel des decaissements et reglements.', ar: 'طھط­ظƒظ… طھط´ط؛ظٹظ„ظٹ ظپظٹ ط§ظ„طµط±ظپ ظˆط§ظ„طھط³ظˆظٹط§طھ.' } },
  { src: '/screenshots/9-cash-manag-statement-upload.PNG', title: { en: 'Cash Proof Integration', fr: 'Integration preuves cash', ar: 'طھظƒط§ظ…ظ„ ط¥ط«ط¨ط§طھط§طھ ط§ظ„ظ†ظ‚ط¯' }, caption: { en: 'Supporting cash evidence and statement alignment.', fr: 'Prise en charge des justificatifs cash et alignement releves.', ar: 'ط¯ط¹ظ… ظ…ط³طھظ†ط¯ط§طھ ط§ظ„ظ†ظ‚ط¯ ظˆظ…ظˆط§ط،ظ…طھظ‡ط§ ظ…ط¹ ط§ظ„ظƒط´ظˆظپ.' } },
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Trip And Cash Workspace', fr: 'Espace mission et cash', ar: 'ظ…ط³ط§ط­ط© ط±ط­ظ„ط§طھ ط§ظ„ط¹ظ…ظ„ ظˆط§ظ„ظ†ظ‚ط¯' }, caption: { en: 'Unified access to request, approve, and settle processes.', fr: 'Acces unifie aux processus demande, validation et reglement.', ar: 'ظˆطµظˆظ„ ظ…ظˆط­ط¯ ظ„ط·ظ„ط¨ ظˆط§ط¹طھظ…ط§ط¯ ظˆطھط³ظˆظٹط© ط§ظ„ط¹ظ…ظ„ظٹط§طھ.' } },
]

export function PettyCashPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="flex items-center justify-between">
          <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
          <a href={`/?lang=${lang}`}><img src="/EPIX.png" alt="EPIX" className="h-20 w-auto drop-shadow-sm" /></a>
        </div>
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Petty Cash</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/6-petty-cash.PNG" alt="Petty Cash" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">PC</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><CircleDollarSign className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
