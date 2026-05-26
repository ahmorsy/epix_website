import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Globe2 } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
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
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ظ…ط¯ظٹظ†ط© ظ„طھط­طµظٹظ„ ط£ط³ط±ط¹ ظˆط±ط¤ظٹط© ط£ظˆط¶ط­ ظ„ظ„ط¥ظٹط±ط§ط¯ط§طھ',
    desc: 'طھط³ط§ط¹ط¯ ظˆط­ط¯ط© AR ظپظٹ EPIX ط¹ظ„ظ‰ طھطھط¨ط¹ ط­ط¬ظ… ط§ظ„ط°ظ…ظ… ظˆط§ظ„ط£ط±طµط¯ط© ط§ظ„ظ‚ط§ط¦ظ…ط© ظˆظ…ط®ط§ط·ط± ط§ظ„ط£ط¹ظ…ط§ط± ظ…ط¹ طھظ†ظپظٹط° ط£ظ‚ظˆظ‰ ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„طھط­طµظٹظ„.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ظ…ط¯ظٹظ†ط©',
    capabilities: [
      'ط§ظ„طھط­ظƒظ… ظپظٹ ط¯ظˆط±ط© ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط، ظˆط§ظ„طھط­طµظٹظ„ط§طھ.',
      'طھط­ظ„ظٹظ„ط§طھ ط§ظ„ط£ط±طµط¯ط© ظˆط§ظ„ط£ط¹ظ…ط§ط± ظ„طھط­ط¯ظٹط¯ ط£ظˆظ„ظˆظٹط§طھ ط§ظ„طھط­طµظٹظ„.',
      'طھظƒط§ظ…ظ„ ط­ظˆط§ظپط² ط§ظ„ظ…ط¨ظٹط¹ط§طھ ظ…ط¹ ط§ظ„ط£ط¯ط§ط، ط§ظ„طھط¬ط§ط±ظٹ.',
      'ط¯ط¹ظ… ط³ظٹط§ط³ط§طھ ط§ظ„ط®طµظˆظ…ط§طھ ظˆط§ظ„طھط³ط¹ظٹط± ظپظٹ ط¹ظ…ظ„ظٹط§طھ AR.',
      'طھظ‚ط§ط±ظٹط± طھط±ظƒط² ط§ظ„ط¹ظ…ظ„ط§ط، ظ„ط¯ط¹ظ… ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط®ط§ط·ط±.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ط·ظ„ط¨ ط¥ظ„ظ‰ ط§ظ„طھط­طµظٹظ„',
    flow: ['ط¥طµط¯ط§ط± ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط،', 'ظ…طھط§ط¨ط¹ط© ط§ظ„ط£ط±طµط¯ط© ط§ظ„ظ…ط³طھط­ظ‚ط©', 'طھط±طھظٹط¨ ط£ظˆظ„ظˆظٹط§طھ ط§ظ„ظ…طھط£ط®ط±ط§طھ', 'طھط³ط¬ظٹظ„ ط§ظ„طھط­طµظٹظ„ط§طھ ظˆط§ظ„ط¥ظٹطµط§ظ„ط§طھ', 'ظ…ط±ط§ظ‚ط¨ط© طµط­ط© ط§ظ„ط°ظ…ظ… ظˆظ…ط¤ط´ط±ط§طھ ط§ظ„ط£ط¯ط§ط،'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ظ…ط¯ظٹظ†ط©',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['طھط­طµظٹظ„ ط£ط³ط±ط¹', 'طھظ‚ظ„ظٹظ„ ظ…ط®ط§ط·ط± ط§ظ„طھط¹ط«ط±', 'طھط­ظƒظ… ط£ظˆط¶ط­ ط¨ط¯ظˆط±ط© ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/81-receivable-volume-summary.PNG', title: { en: 'Receivable Volume Summary', fr: 'Synthese volume clients', ar: 'ظ…ظ„ط®طµ ط­ط¬ظ… ط§ظ„ط°ظ…ظ… ط§ظ„ظ…ط¯ظٹظ†ط©' }, caption: { en: 'Visibility into AR transaction throughput.', fr: 'Visibilite sur le debit du poste clients.', ar: 'ط±ط¤ظٹط© ظ„ط­ط¬ظ… طھط¯ظپظ‚ط§طھ ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ط¹ظ…ظ„ط§ط،.' } },
  { src: '/screenshots/82-receivable-outstanding-summary.PNG', title: { en: 'Outstanding Receivables', fr: 'Encours clients', ar: 'ط§ظ„ط£ط±طµط¯ط© ط§ظ„ظ…ط¯ظٹظ†ط© ط§ظ„ظ‚ط§ط¦ظ…ط©' }, caption: { en: 'Outstanding balances segmented for action.', fr: 'Encours segmentes pour action ciblee.', ar: 'طھطµظ†ظٹظپ ط§ظ„ط£ط±طµط¯ط© ط§ظ„ظ‚ط§ط¦ظ…ط© ظ„ط§طھط®ط§ط° ط¥ط¬ط±ط§ط،ط§طھ ط§ظ„طھط­طµظٹظ„.' } },
  { src: '/screenshots/83-receivable-aging-summary.PNG', title: { en: 'Receivable Aging Analysis', fr: 'Analyse anciennete clients', ar: 'طھط­ظ„ظٹظ„ ط£ط¹ظ…ط§ط± ط§ظ„ط°ظ…ظ… ط§ظ„ظ…ط¯ظٹظ†ط©' }, caption: { en: 'Aging risk view to improve DSO performance.', fr: 'Vue du risque d anciennete pour ameliorer DSO.', ar: 'ط±ط¤ظٹط© ظ…ط®ط§ط·ط± ط§ظ„ط£ط¹ظ…ط§ط± ظ„طھط­ط³ظٹظ† ظ…ط¤ط´ط±ط§طھ ط§ظ„طھط­طµظٹظ„.' } },
]

export function AccountsReceivablePage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
        <section className="mt-6 rounded-3xl border border-[#d7e4ff] bg-gradient-to-br from-[#f6f9ff] via-white to-[#eef7ff] p-7 md:p-10"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Accounts Receivable</p><h1 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><ol className="mt-4 space-y-3">{t.flow.map((step, idx) => <li key={step} className="flex items-start gap-3 text-sm text-[var(--text-muted)]"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold text-[#335fae]">{idx + 1}</span><span>{step}</span></li>)}</ol></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">AR</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Globe2 className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
