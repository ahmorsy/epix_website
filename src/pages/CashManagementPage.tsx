import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Wallet } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Cash Management For Bank Control And Reconciliation Speed',
    desc: 'EPIX Cash Management centralizes bank accounts, statement import, matching, reconciliation, and interest calculations for treasury discipline.',
    capabilitiesTitle: 'Cash Management Capabilities',
    capabilities: [
      'Bank, branch, account, and agreement master governance.',
      'Bank statement upload and line-level processing.',
      'Bank-to-book matching and reconciliation workflows.',
      'Interest benchmark setup and automated calculation runs.',
      'GL transfer lines and cash balance reporting.',
    ],
    flowTitle: 'Cash And Reconciliation Flow',
    flow: ['Maintain bank setup', 'Load statement headers and lines', 'Match bank and book items', 'Execute reconciliation and approvals', 'Transfer outcomes to GL and report balances'],
    galleryTitle: 'Cash Management Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Faster bank reconciliation', 'Higher liquidity visibility', 'Reduced manual treasury effort'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Gestion De Tresorerie Pour Controle Bancaire Et Rapprochement Rapide',
    desc: 'EPIX Tresorerie centralise comptes bancaires, import des releves, matching, rapprochement et calcul des interets.',
    capabilitiesTitle: 'Capacites Tresorerie',
    capabilities: [
      'Gouvernance des banques, agences, comptes et accords.',
      'Import des releves bancaires et traitement detaille des lignes.',
      'Matching banque-comptabilite et workflows de rapprochement.',
      'Configuration des benchmarks et calcul automatique des interets.',
      'Transfert GL et reporting des soldes de tresorerie.',
    ],
    flowTitle: 'Flux Tresorerie Et Rapprochement',
    flow: ['Maintenir la configuration bancaire', 'Charger releves et lignes', 'Faire le matching banque-livre', 'Executer rapprochement et validation', 'Transferer au GL et publier les soldes'],
    galleryTitle: 'Ecrans Tresorerie',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Rapprochement plus rapide', 'Visibilite liquidite accrue', 'Moins d effort manuel'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط¥ط¯ط§ط±ط© ظ†ظ‚ط¯ ظ„ظ„طھط­ظƒظ… ط§ظ„ط¨ظ†ظƒظٹ ظˆطھط³ط±ظٹط¹ ط§ظ„طھط³ظˆظٹط§طھ',
    desc: 'طھظˆط­ظ‘ط¯ ط¥ط¯ط§ط±ط© ط§ظ„ظ†ظ‚ط¯ ظپظٹ EPIX ط§ظ„ط­ط³ط§ط¨ط§طھ ط§ظ„ط¨ظ†ظƒظٹط© ظˆط±ظپط¹ ط§ظ„ظƒط´ظˆظپ ظˆط§ظ„ظ…ط·ط§ط¨ظ‚ط© ظˆط§ظ„طھط³ظˆظٹط§طھ ظˆط§ط­طھط³ط§ط¨ ط§ظ„ظپظˆط§ط¦ط¯ ط¶ظ…ظ† ظ…ظ†طµط© ظˆط§ط­ط¯ط© ظ„ظ„ط®ط²ظٹظ†ط©.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط¥ط¯ط§ط±ط© ط§ظ„ظ†ظ‚ط¯',
    capabilities: [
      'ط­ظˆظƒظ…ط© ط§ظ„ط¨ظ†ظˆظƒ ظˆط§ظ„ظپط±ظˆط¹ ظˆط§ظ„ط­ط³ط§ط¨ط§طھ ظˆط§ظ„ط§طھظپط§ظ‚ظٹط§طھ ط§ظ„ط¨ظ†ظƒظٹط©.',
      'ط±ظپط¹ ظƒط´ظˆظپ ط§ظ„ط­ط³ط§ط¨ ط§ظ„ط¨ظ†ظƒظٹط© ظˆظ…ط¹ط§ظ„ط¬ط© ط¨ظ†ظˆط¯ظ‡ط§ طھظپطµظٹظ„ظٹط§.',
      'ظ…ط·ط§ط¨ظ‚ط© ط§ظ„ط¨ظ†ظƒظٹ ظ…ط¹ ط§ظ„ط¯ظپط§طھط± ظˆط³ظٹط± ط¹ظ…ظ„ ط§ظ„طھط³ظˆظٹط§طھ.',
      'ط¥ط¹ط¯ط§ط¯ ظ…ط¤ط´ط±ط§طھ ط§ظ„ظپط§ط¦ط¯ط© ظˆطھط´ط؛ظٹظ„ ط§ط­طھط³ط§ط¨ ط§ظ„ظپظˆط§ط¦ط¯ ط¢ظ„ظٹط§.',
      'طھط±ط­ظٹظ„ ظ†طھط§ط¦ط¬ ط§ظ„طھط³ظˆظٹط© ط¥ظ„ظ‰ GL ظˆطھظ‚ط§ط±ظٹط± ط£ط±طµط¯ط© ط§ظ„ظ†ظ‚ط¯.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ظ†ظ‚ط¯ ظˆط§ظ„طھط³ظˆظٹط©',
    flow: ['طھظ‡ظٹط¦ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ط¨ظ†ظƒظٹط©', 'طھط­ظ…ظٹظ„ ط±ط¤ظˆط³ ط§ظ„ظƒط´ظˆظپ ظˆط§ظ„ط¨ظ†ظˆط¯', 'ظ…ط·ط§ط¨ظ‚ط© ط§ظ„ط¨ظ†ظƒظٹ ظ…ط¹ ط§ظ„ط¯ظپط§طھط±', 'طھظ†ظپظٹط° ط§ظ„طھط³ظˆظٹط§طھ ظˆط§ط¹طھظ…ط§ط¯ظ‡ط§', 'طھط±ط­ظٹظ„ ط§ظ„ظ†طھط§ط¦ط¬ ط¥ظ„ظ‰ GL ظˆط¥طµط¯ط§ط± ط§ظ„طھظ‚ط§ط±ظٹط±'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط¥ط¯ط§ط±ط© ط§ظ„ظ†ظ‚ط¯',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['طھط³ظˆظٹط§طھ ط£ط³ط±ط¹', 'ط±ط¤ظٹط© ط£ط¹ظ„ظ‰ ظ„ظ„ط³ظٹظˆظ„ط©', 'طھظ‚ظ„ظٹظ„ ط§ظ„ط¬ظ‡ط¯ ط§ظ„ظٹط¯ظˆظٹ ظپظٹ ط§ظ„ط®ط²ظٹظ†ط©'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/9-cash-manag-statement-upload.PNG',
    title: { en: 'Bank Statement Upload', fr: 'Import releve bancaire', ar: 'ط±ظپط¹ ظƒط´ظپ ط§ظ„ط­ط³ط§ط¨ ط§ظ„ط¨ظ†ظƒظٹ' },
    caption: { en: 'Fast ingestion of statement files for reconciliation.', fr: 'Chargement rapide des releves pour rapprochement.', ar: 'طھط­ظ…ظٹظ„ ط³ط±ظٹط¹ ظ„ظƒط´ظˆظپ ط§ظ„ط¨ظ†ظƒ ظ„ط¨ط¯ط، ط§ظ„طھط³ظˆظٹط§طھ.' },
  },
  {
    src: '/screenshots/6-petty-cash.PNG',
    title: { en: 'Cash Operations Control', fr: 'Controle operations cash', ar: 'ط§ظ„طھط­ظƒظ… ظپظٹ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ†ظ‚ط¯ظٹط©' },
    caption: { en: 'Operational oversight for disbursement and cash activity.', fr: 'Pilotage operationnel des decaissements et activites cash.', ar: 'ط¥ط´ط±ط§ظپ طھط´ط؛ظٹظ„ظٹ ط¹ظ„ظ‰ ط§ظ„طµط±ظپ ظˆط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ†ظ‚ط¯ظٹط©.' },
  },
  {
    src: '/screenshots/7-outstanding-pays.PNG',
    title: { en: 'Liability And Cash Alignment', fr: 'Alignement passifs et cash', ar: 'ظ…ظˆط§ط،ظ…ط© ط§ظ„ط§ظ„طھط²ط§ظ…ط§طھ ظ…ط¹ ط§ظ„ظ†ظ‚ط¯' },
    caption: { en: 'Visibility to coordinate payable commitments with cash plans.', fr: 'Visibilite pour aligner engagements fournisseurs et plans cash.', ar: 'ط±ط¤ظٹط© ظ„ظ…ظˆط§ط،ظ…ط© ط§ظ„ط§ظ„طھط²ط§ظ…ط§طھ ظ…ط¹ ط®ط·ط· ط§ظ„ط³ظٹظˆظ„ط©.' },
  },
]

export function CashManagementPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>

        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10">
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Cash Management</p>
          <h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
            <img src="/screenshots/9-cash-manag-statement-upload.PNG" alt="Cash Management Statement Upload" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div>
        </section>

        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => (
          <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">CASH</span></div></button>
            <div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div>
          </motion.article>
        ))}</div></section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Wallet className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
