import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Truck } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Shipment Management For Execution Clarity And Delivery Confidence',
    desc: 'EPIX Shipment Management tracks shipment headers, forms, status transitions, and logistics follow-up in one control layer.',
    capabilitiesTitle: 'Shipment Capabilities',
    capabilities: [
      'Shipment header setup and transaction control.',
      'Operational shipment form maintenance.',
      'Status tracking across logistics milestones.',
      'Follow-up reporting for dispatch performance.',
      'Coordinated visibility for fulfillment teams.',
    ],
    flowTitle: 'Shipment Flow',
    flow: ['Create shipment plan', 'Capture shipment details', 'Track logistics statuses', 'Resolve delivery exceptions', 'Analyze dispatch performance'],
    galleryTitle: 'Shipment Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Improved dispatch visibility', 'Faster shipment follow-up', 'Higher delivery reliability'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Gestion Des Expeditions Pour Une Livraison Fiable',
    desc: 'EPIX Shipment Management suit les entetes d expedition, les statuts logistiques et le suivi operationnel.',
    capabilitiesTitle: 'Capacites Expedition',
    capabilities: [
      'Parametrage des entetes et controle des expeditions.',
      'Maintenance des formulaires operationnels.',
      'Suivi des statuts sur les jalons logistiques.',
      'Reporting de suivi des performances de dispatch.',
      'Visibilite coordonnee pour les equipes fulfillment.',
    ],
    flowTitle: 'Flux Expedition',
    flow: ['Creer plan expedition', 'Saisir details', 'Suivre statuts logistiques', 'Resoudre exceptions', 'Analyser performance de dispatch'],
    galleryTitle: 'Ecrans Expedition',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Visibilite dispatch amelioree', 'Suivi plus rapide', 'Livraison plus fiable'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط¥ط¯ط§ط±ط© ط§ظ„ط´ط­ظ†ط§طھ ظ„ظˆط¶ظˆط­ ط§ظ„طھظ†ظپظٹط° ظˆط«ظ‚ط© ط§ظ„طھط³ظ„ظٹظ…',
    desc: 'طھطھط§ط¨ط¹ ظˆط­ط¯ط© ط¥ط¯ط§ط±ط© ط§ظ„ط´ط­ظ†ط§طھ ظپظٹ EPIX ط±ط¤ظˆط³ ط§ظ„ط´ط­ظ†ط§طھ ظˆظ†ظ…ط§ط°ط¬ظ‡ط§ ظˆطھط­ظˆظ„ط§طھ ط§ظ„ط­ط§ظ„ط© ظˆط§ظ„ظ…طھط§ط¨ط¹ط© ط§ظ„ظ„ظˆط¬ط³طھظٹط© ط¶ظ…ظ† ط·ط¨ظ‚ط© طھط­ظƒظ… ظˆط§ط­ط¯ط©.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط¥ط¯ط§ط±ط© ط§ظ„ط´ط­ظ†ط§طھ',
    capabilities: [
      'طھظ‡ظٹط¦ط© ط±ط¤ظˆط³ ط§ظ„ط´ط­ظ†ط§طھ ظˆط§ظ„طھط­ظƒظ… ظپظٹ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ.',
      'طµظٹط§ظ†ط© ظ†ظ…ط§ط°ط¬ ط§ظ„ط´ط­ظ† ط§ظ„طھط´ط؛ظٹظ„ظٹط©.',
      'طھطھط¨ط¹ ط§ظ„ط­ط§ظ„ط§طھ ط¹ط¨ط± ظ…ط­ط·ط§طھ ط§ظ„ظ„ظˆط¬ط³طھظٹط§طھ.',
      'طھظ‚ط§ط±ظٹط± ظ…طھط§ط¨ط¹ط© ط£ط¯ط§ط، ط§ظ„ط¥ط±ط³ط§ظ„ ظˆط§ظ„طھط³ظ„ظٹظ….',
      'ط±ط¤ظٹط© ظ…ظ†ط³ظ‚ط© ظ„ظپط±ظ‚ ط§ظ„طھظ†ظپظٹط° ط§ظ„ظ„ظˆط¬ط³طھظٹ.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ط´ط­ظ†ط§طھ',
    flow: ['ط¥ظ†ط´ط§ط، ط®ط·ط© ط§ظ„ط´ط­ظ†ط©', 'ط¥ط¯ط®ط§ظ„ طھظپط§طµظٹظ„ ط§ظ„ط´ط­ظ†ط©', 'ظ…طھط§ط¨ط¹ط© ط§ظ„ط­ط§ظ„ط§طھ ط§ظ„ظ„ظˆط¬ط³طھظٹط©', 'ط­ظ„ ط§ظ„ط§ط³طھط«ظ†ط§ط،ط§طھ', 'طھط­ظ„ظٹظ„ ط£ط¯ط§ط، ط§ظ„ط¥ط±ط³ط§ظ„'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط¥ط¯ط§ط±ط© ط§ظ„ط´ط­ظ†ط§طھ',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['طھط­ط³ظٹظ† ط±ط¤ظٹط© ط§ظ„ط´ط­ظ†', 'ظ…طھط§ط¨ط¹ط© ط£ط³ط±ط¹ ظ„ظ„ط´ط­ظ†ط§طھ', 'ط±ظپط¹ ظ…ظˆط«ظˆظ‚ظٹط© ط§ظ„طھط³ظ„ظٹظ…'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/3-grid-data.PNG', title: { en: 'Shipment Line Tracking', fr: 'Suivi lignes expedition', ar: 'ظ…طھط§ط¨ط¹ط© ط¨ظ†ظˆط¯ ط§ظ„ط´ط­ظ†ط©' }, caption: { en: 'Detailed transaction-level visibility for shipment processing.', fr: 'Visibilite detaillee des transactions d expedition.', ar: 'ط±ط¤ظٹط© طھظپطµظٹظ„ظٹط© ظ„ظ…ط¹ط§ظ…ظ„ط§طھ ظ…ط¹ط§ظ„ط¬ط© ط§ظ„ط´ط­ظ†ط§طھ.' } },
  { src: '/screenshots/92-projects-gantt.PNG', title: { en: 'Shipment Timeline', fr: 'Timeline expedition', ar: 'ط§ظ„ط®ط· ط§ظ„ط²ظ…ظ†ظٹ ظ„ظ„ط´ط­ظ†ط§طھ' }, caption: { en: 'Timeline planning for dispatch checkpoints.', fr: 'Planification chronologique des etapes de dispatch.', ar: 'طھط®ط·ظٹط· ط²ظ…ظ†ظٹ ظ„ظ†ظ‚ط§ط· ظ…طھط§ط¨ط¹ط© ط§ظ„ط¥ط±ط³ط§ظ„.' } },
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Fulfillment Command View', fr: 'Vue commande fulfillment', ar: 'ظ„ظˆط­ط© ظ‚ظٹط§ط¯ط© ط§ظ„طھظ†ظپظٹط°' }, caption: { en: 'Fast access to shipment and logistics workspaces.', fr: 'Acces rapide aux espaces expedition et logistique.', ar: 'ظˆطµظˆظ„ ط³ط±ظٹط¹ ظ„ظ…ط³ط§ط­ط§طھ ط§ظ„ط´ط­ظ† ظˆط§ظ„ظ„ظˆط¬ط³طھظٹط§طھ.' } },
]

export function ShipmentManagementPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Shipment Management</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/2-home-page.PNG" alt="Shipment Management" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">SHM</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Truck className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
