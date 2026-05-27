import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Rocket } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
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
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط§ظ„طھطµظ†ظٹط¹ ط§ظ„ظ…طھظ‚ط·ط¹ ظ„طھظ†ظپظٹط° ط¥ظ†طھط§ط¬ظٹ ظ…ط­ظƒظˆظ…',
    desc: 'طھظ†ط³ظ‚ ظˆط­ط¯ط© ط§ظ„طھطµظ†ظٹط¹ ط§ظ„ظ…طھظ‚ط·ط¹ ظپظٹ EPIX طھط®ط·ظٹط· ط§ظ„ط£ظˆط§ظ…ط± ظˆطھطھط¨ط¹ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ظˆط§ظ„ظپط­طµ ظˆظ…طھط§ط¨ط¹ط© ط§ظ„طھط¹ط¨ط¦ط© ظ„طھط³ظ„ظٹظ… ط£ظƒط«ط± ظ…ظˆط«ظˆظ‚ظٹط©.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط§ظ„طھطµظ†ظٹط¹ ط§ظ„ظ…طھظ‚ط·ط¹',
    capabilities: [
      'ط¶ط¨ط· طھط¹ط±ظٹظپ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ظˆط§ظ„ط£ظ‚ط³ط§ظ… ط§ظ„ط¥ظ†طھط§ط¬ظٹط©.',
      'ط±ظپط¹ ط£ظˆط§ظ…ط± ط§ظ„ط¥ظ†طھط§ط¬ ظˆظ…ط±ط§ط¬ط¹طھظ‡ط§ ظˆطھطھط¨ط¹ظ‡ط§.',
      'ظ…طھط§ط¨ط¹ط© ط§ظ„ظپط­طµ ظˆط·ظ„ط¨ط§طھ ط§ظ„ظ…ط¹ط§ظٹظ†ط© ط£ط«ظ†ط§ط، ط§ظ„طھظ†ظپظٹط°.',
      'ط¥ط¹ط¯ط§ط¯ ظ‚ظˆط§ط¦ظ… ط§ظ„طھط¹ط¨ط¦ط© ظˆظ…ط±ط§ظ‚ط¨ط© ط¬ط§ظ‡ط²ظٹط© ط§ظ„ط´ط­ظ†.',
      'طھظ‚ط§ط±ظٹط± ط§ظ„ظƒظ…ظٹط§طھ ط§ظ„ظ…ظ†ط¬ط²ط© ظˆظ…ط¹ط¯ظ„ط§طھ ط§ظ„ط¥ظƒظ…ط§ظ„.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ط¥ظ†طھط§ط¬',
    flow: ['طھط­ط¯ظٹط¯ ظ†ظ…ظˆط°ط¬ ط§ظ„ط¹ظ…ظ„ظٹط§طھ', 'ط¥ظ†ط´ط§ط، ط£ظˆط§ظ…ط± ط§ظ„ط¥ظ†طھط§ط¬ ظˆط¥ط·ظ„ط§ظ‚ظ‡ط§', 'طھظ†ظپظٹط° ظˆظپط­طµ ط§ظ„ط¥ظ†طھط§ط¬', 'ط§ظ„طھط¹ط¨ط¦ط© ظˆط§ظ„طھط­ط¶ظٹط± ظ„ظ„ط´ط­ظ†', 'ظ…طھط§ط¨ط¹ط© ط§ظ„ط¥ظ†ط¬ط§ط² ظˆط§ظ„ط§ظ†ط­ط±ط§ظپط§طھ'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط§ظ„طھطµظ†ظٹط¹',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['ط±ط¤ظٹط© ط£ظپط¶ظ„ ظ„ظ„ط¥ظ†طھط§ط¬', 'ط®ظپط¶ ط§ظ†ط­ط±ط§ظپط§طھ ط§ظ„طھظ†ظپظٹط°', 'ط±ظپط¹ ظ…ظˆط«ظˆظ‚ظٹط© ط§ظ„ط§ظ„طھط²ط§ظ… ط¨ط§ظ„طھط³ظ„ظٹظ…'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/92-projects-gantt.PNG', title: { en: 'Production Gantt Planning', fr: 'Planification gantt production', ar: 'طھط®ط·ظٹط· ط¥ظ†طھط§ط¬ ط¨ظ†ظ…ط· ط¬ط§ظ†طھ' }, caption: { en: 'Timeline control for production orders and milestones.', fr: 'Controle timeline des ordres et jalons production.', ar: 'طھط­ظƒظ… ط²ظ…ظ†ظٹ ط¨ط£ظˆط§ظ…ط± ط§ظ„ط¥ظ†طھط§ط¬ ظˆظ…ط­ط·ط§طھ ط§ظ„طھظ†ظپظٹط°.' } },
  { src: '/screenshots/3-grid-data.PNG', title: { en: 'Order Execution Grid', fr: 'Grille execution ordres', ar: 'ط¬ط¯ظˆظ„ طھظ†ظپظٹط° ط£ظˆط§ظ…ط± ط§ظ„ط¥ظ†طھط§ط¬' }, caption: { en: 'Detailed tracking of order lines and process progress.', fr: 'Suivi detaille des lignes d ordre et progression.', ar: 'ظ…طھط§ط¨ط¹ط© طھظپطµظٹظ„ظٹط© ظ„ط¨ظ†ظˆط¯ ط§ظ„ط£ظˆط§ظ…ط± ظˆطھظ‚ط¯ظ… ط§ظ„ط¹ظ…ظ„ظٹط§طھ.' } },
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Manufacturing Workspace', fr: 'Espace fabrication', ar: 'ظ…ط³ط§ط­ط© ط¹ظ…ظ„ ط§ظ„طھطµظ†ظٹط¹' }, caption: { en: 'Unified operational access for planners and shop-floor teams.', fr: 'Acces operationnel unifie pour planificateurs et atelier.', ar: 'ظˆطµظˆظ„ طھط´ط؛ظٹظ„ظٹ ظ…ظˆط­ط¯ ظ„ظ„ظ…ط®ط·ط·ظٹظ† ظˆظپط±ظ‚ ط§ظ„طھط´ط؛ظٹظ„.' } },
]

export function DiscreteManufacturingPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Discrete Manufacturing</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/92-projects-gantt.PNG" alt="Projects Gantt" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">MFG</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Rocket className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
