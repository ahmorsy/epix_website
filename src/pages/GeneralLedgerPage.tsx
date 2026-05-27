import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Landmark } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'General Ledger Built For Fast Close And Strong Financial Control',
    desc: 'EPIX General Ledger gives finance teams a structured, auditable posting model with multi-currency reporting, revaluation controls, and faster period closure.',
    capabilitiesTitle: 'General Ledger Capabilities',
    capabilities: [
      'Chart of accounts and account combinations governance.',
      'Journal batch controls with approval and posting discipline.',
      'Fiscal calendar, period close, and reversal workflows.',
      'Multi-currency trial balance and financial reporting.',
      'Revaluation setup and execution with transparent traceability.',
    ],
    flowTitle: 'Financial Flow In GL',
    flow: ['Configure ledger and fiscal structure', 'Capture and validate journals', 'Approve and post transactions', 'Run trial balances and revaluation', 'Close period with audit trail'],
    galleryTitle: 'General Ledger Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Faster month-end close', 'Higher posting accuracy', 'Audit-ready financial records'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Grand Livre Concu Pour Une Cloture Rapide Et Un Controle Financier Solide',
    desc: 'Le Grand Livre EPIX fournit un modele de comptabilisation structure et auditable avec reporting multidevise, revalorisation et cloture plus rapide.',
    capabilitiesTitle: 'Capacites Du Grand Livre',
    capabilities: [
      'Gouvernance du plan de comptes et des combinaisons comptables.',
      'Controle des lots de journaux avec approbation et discipline de comptabilisation.',
      'Calendrier fiscal, cloture de periode et ecritures de contrepassation.',
      'Balance multidevise et reporting financier detaille.',
      'Configuration de revalorisation avec tracabilite complete.',
    ],
    flowTitle: 'Flux Financier GL',
    flow: ['Configurer le ledger et les periodes', 'Saisir et valider les journaux', 'Approuver et comptabiliser', 'Executer balance et revalorisation', 'Cloturer avec piste d audit'],
    galleryTitle: 'Ecrans Grand Livre',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Cloture mensuelle plus rapide', 'Comptabilisation plus fiable', 'Piste d audit complete'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط¯ظپطھط± ط£ط³طھط§ط° ط¹ط§ظ… ظ…طµظ…ظ… ظ„ط¥ط؛ظ„ط§ظ‚ ط£ط³ط±ط¹ ظˆطھط­ظƒظ… ظ…ط§ظ„ظٹ ط£ظ‚ظˆظ‰',
    desc: 'ظٹظˆظپط± ط¯ظپطھط± ط§ظ„ط£ط³طھط§ط° ط§ظ„ط¹ط§ظ… ظپظٹ EPIX ظ†ظ…ظˆط°ط¬ طھط±ط­ظٹظ„ ظ…ط­ظƒظ… ظˆظ‚ط§ط¨ظ„ ظ„ظ„طھط¯ظ‚ظٹظ‚ ظ…ط¹ طھظ‚ط§ط±ظٹط± ظ…طھط¹ط¯ط¯ط© ط§ظ„ط¹ظ…ظ„ط§طھ ظˆط¶ظˆط§ط¨ط· ط¥ط¹ط§ط¯ط© ط§ظ„طھظ‚ظٹظٹظ… ظˆطھط³ط±ظٹط¹ ط§ظ„ط¥ط؛ظ„ط§ظ‚ ط§ظ„ط¯ظˆط±ظٹ.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط¯ظپطھط± ط§ظ„ط£ط³طھط§ط° ط§ظ„ط¹ط§ظ…',
    capabilities: [
      'ط­ظˆظƒظ…ط© ط¯ظ„ظٹظ„ ط§ظ„ط­ط³ط§ط¨ط§طھ ظˆطھط±ظƒظٹط¨ط§طھ ط§ظ„ط­ط³ط§ط¨ط§طھ.',
      'ط¶ط¨ط· ط¯ظپط¹ط§طھ ط§ظ„ظ‚ظٹظˆط¯ ظ…ط¹ ط§ظ„ظ…ظˆط§ظپظ‚ط§طھ ظˆط§ظ†ط¶ط¨ط§ط· ط§ظ„طھط±ط­ظٹظ„.',
      'ط¥ط¯ط§ط±ط© ط§ظ„طھظ‚ظˆظٹظ… ط§ظ„ظ…ط§ظ„ظٹ ظˆط§ظ„ط¥ط؛ظ„ط§ظ‚ ظˆط§ظ„ظ‚ظٹظˆط¯ ط§ظ„ط¹ظƒط³ظٹط©.',
      'ظ…ظٹط²ط§ظ† ظ…ط±ط§ط¬ط¹ط© ظ…طھط¹ط¯ط¯ ط§ظ„ط¹ظ…ظ„ط§طھ ظˆطھظ‚ط§ط±ظٹط± ظ…ط§ظ„ظٹط© ط¯ظ‚ظٹظ‚ط©.',
      'ط¥ط¹ط¯ط§ط¯ ظˆطھظ†ظپظٹط° ط¥ط¹ط§ط¯ط© ط§ظ„طھظ‚ظٹظٹظ… ظ…ط¹ طھطھط¨ط¹ ظˆط§ط¶ط­.',
    ],
    flowTitle: 'ط§ظ„طھط¯ظپظ‚ ط§ظ„ظ…ط§ظ„ظٹ ظپظٹ GL',
    flow: ['طھظ‡ظٹط¦ط© ط§ظ„ط¯ظپطھط± ظˆط§ظ„ظپطھط±ط§طھ ط§ظ„ظ…ط§ظ„ظٹط©', 'ط¥ط¯ط®ط§ظ„ ط§ظ„ظ‚ظٹظˆط¯ ظˆط§ظ„طھط­ظ‚ظ‚ ظ…ظ†ظ‡ط§', 'ط§ط¹طھظ…ط§ط¯ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ ظˆطھط±ط­ظٹظ„ظ‡ط§', 'طھط´ط؛ظٹظ„ ظ…ظٹط²ط§ظ† ط§ظ„ظ…ط±ط§ط¬ط¹ط© ظˆط¥ط¹ط§ط¯ط© ط§ظ„طھظ‚ظٹظٹظ…', 'ط¥ط؛ظ„ط§ظ‚ ط§ظ„ظپطھط±ط© ظ…ط¹ ط£ط«ط± طھط¯ظ‚ظٹظ‚ظٹ'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط¯ظپطھط± ط§ظ„ط£ط³طھط§ط° ط§ظ„ط¹ط§ظ…',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['ط¥ط؛ظ„ط§ظ‚ ط´ظ‡ط±ظٹ ط£ط³ط±ط¹', 'ط¯ظ‚ط© ط£ط¹ظ„ظ‰ ظپظٹ ط§ظ„طھط±ط­ظٹظ„', 'ط³ط¬ظ„ط§طھ ظ…ط§ظ„ظٹط© ط¬ط§ظ‡ط²ط© ظ„ظ„طھط¯ظ‚ظٹظ‚'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/9-GL-Journals.PNG',
    title: { en: 'GL Journals Control', fr: 'Controle des journaux GL', ar: 'ط§ظ„طھط­ظƒظ… ظپظٹ ظ‚ظٹظˆط¯ GL' },
    caption: {
      en: 'Journal posting workspace with disciplined accounting controls.',
      fr: 'Espace de comptabilisation des journaux avec controles rigoureux.',
      ar: 'ظ…ط³ط§ط­ط© طھط±ط­ظٹظ„ ط§ظ„ظ‚ظٹظˆط¯ ظ…ط¹ ط¶ظˆط§ط¨ط· ظ…ط­ط§ط³ط¨ظٹط© ظ…ط­ظƒظ…ط©.',
    },
  },
  {
    src: '/screenshots/4-chart-builder.PNG',
    title: { en: 'Financial Visualization', fr: 'Visualisation financiere', ar: 'طھطµظˆط± ظ…ط§ظ„ظٹ' },
    caption: {
      en: 'Interactive views for trial balance and period performance analytics.',
      fr: 'Vues interactives pour la balance et la performance de periode.',
      ar: 'ط¹ط±ظˆط¶ طھظپط§ط¹ظ„ظٹط© ظ„ظ…ظٹط²ط§ظ† ط§ظ„ظ…ط±ط§ط¬ط¹ط© ظˆط£ط¯ط§ط، ط§ظ„ظپطھط±ط§طھ ط§ظ„ظ…ط§ظ„ظٹط©.',
    },
  },
  {
    src: '/screenshots/4-chart-builder2.PNG',
    title: { en: 'Advanced Reporting Layer', fr: 'Couche de reporting avancee', ar: 'ط·ط¨ظ‚ط© طھظ‚ط§ط±ظٹط± ظ…طھظ‚ط¯ظ…ط©' },
    caption: {
      en: 'Configurable finance dashboards for management and audit teams.',
      fr: 'Tableaux de bord financiers configurables pour gestion et audit.',
      ar: 'ظ„ظˆط­ط§طھ ظ…ط§ظ„ظٹط© ظ‚ط§ط¨ظ„ط© ظ„ظ„طھظ‡ظٹط¦ط© ظ„ظ„ط¥ط¯ط§ط±ط© ظˆظپط±ظ‚ ط§ظ„طھط¯ظ‚ظٹظ‚.',
    },
  },
]

export function GeneralLedgerPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
          <ArrowRight size={14} className="rotate-180" />
          {t.backToHome}
        </a>

        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10">
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">General Ledger</p>
          <h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
            <img
              src="/screenshots/9-GL-Journals.PNG"
              alt="GL Journals"
              loading="eager"
              decoding="async"
              className="h-52 w-full object-cover object-top md:h-64"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.capabilities.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2>
            <div className="flow-pipeline mt-5">
              {t.flow.map((step, idx) => (
                <div key={step} className="flow-pipeline-step">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-[var(--text)]">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {shots.map((shot, index) => (
              <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]">
                    <img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">GL</span>
                  </div>
                </button>
                <div className="p-4">
                  <h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6">
          <div className="flex items-start gap-3">
            <Landmark className="mt-1 text-[var(--brand)]" />
            <div>
              <h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                {t.outcomes.map((item) => (
                  <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
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
