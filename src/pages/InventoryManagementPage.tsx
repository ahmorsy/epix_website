import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, Boxes, CheckCircle2 } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Inventory Management For Real-Time Stock And Fulfillment Control',
    desc: 'EPIX Inventory Management coordinates warehouses, receipts, issues, returns, and on-hand visibility in one operational command layer.',
    capabilitiesTitle: 'Inventory Capabilities',
    capabilities: [
      'Warehouse and item master governance across locations.',
      'Purchase receiving, delivery, and return-to-supplier workflows.',
      'Material issue and return processing for internal operations.',
      'Inventory executive summary with movement and valuation insight.',
      'Transaction type controls for consistent stock governance.',
    ],
    flowTitle: 'Inventory Flow',
    flow: ['Plan and create purchase requests', 'Receive and validate stock', 'Allocate and issue materials', 'Process returns and adjustments', 'Track on-hand and executive KPIs'],
    galleryTitle: 'Inventory Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Better stock accuracy', 'Lower stockouts and overstock', 'Stronger warehouse productivity'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Gestion Des Stocks En Temps Reel Pour Le Controle Logistique',
    desc: 'La gestion des stocks EPIX orchestre depots, receptions, sorties, retours et visibilite des quantites dans une seule couche operationnelle.',
    capabilitiesTitle: 'Capacites Inventaire',
    capabilities: [
      'Gouvernance des entrepots et articles multi-sites.',
      'Receptions achats, livraisons et retours fournisseurs.',
      'Traitement des sorties et retours internes de matieres.',
      'Synthese executive avec mouvements et valorisation des stocks.',
      'Controle des types de transactions pour une gouvernance coherente.',
    ],
    flowTitle: 'Flux Inventaire',
    flow: ['Planifier les besoins', 'Recevoir et valider', 'Allouer et sortir', 'Traiter retours et ajustements', 'Suivre les KPI de stock'],
    galleryTitle: 'Ecrans Inventaire',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Stocks plus fiables', 'Moins de ruptures et surstocks', 'Productivite depot amelioree'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط¥ط¯ط§ط±ط© ظ…ط®ط²ظˆظ† ظ„ط­ط¸ظٹط© ظ„ظ„طھط­ظƒظ… ط§ظ„ظƒط§ظ…ظ„ ظپظٹ ط§ظ„ظ…ط®ط§ط²ظ† ظˆط§ظ„طھظˆط±ظٹط¯',
    desc: 'طھظ†ط³ظ‚ ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط®ط²ظˆظ† ظپظٹ EPIX ط§ظ„ظ…ط³طھظˆط¯ط¹ط§طھ ظˆط§ظ„ط§ط³طھظ„ط§ظ…ط§طھ ظˆط§ظ„طµط±ظپ ظˆط§ظ„ظ…ط±طھط¬ط¹ط§طھ ظˆط±ط¤ظٹط© ط§ظ„ظƒظ…ظٹط§طھ ط§ظ„ظ…طھط§ط­ط© ط¶ظ…ظ† ط·ط¨ظ‚ط© طھط´ط؛ظٹظ„ ظ…ظˆط­ط¯ط©.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط®ط²ظˆظ†',
    capabilities: [
      'ط­ظˆظƒظ…ط© ط§ظ„ظ…ط³طھظˆط¯ط¹ط§طھ ظˆط§ظ„ظ…ظˆط§ط¯ ط¹ط¨ط± ط§ظ„ظ…ظˆط§ظ‚ط¹ ط§ظ„ظ…ط®طھظ„ظپط©.',
      'طھط¯ظپظ‚ط§طھ ط§ط³طھظ„ط§ظ… ط§ظ„ظ…ط´طھط±ظٹط§طھ ظˆط§ظ„طھط³ظ„ظٹظ… ظˆط§ظ„ظ…ط±طھط¬ط¹ ظ„ظ„ظ…ظˆط±ط¯.',
      'ظ…ط¹ط§ظ„ط¬ط© طµط±ظپ ط§ظ„ظ…ظˆط§ط¯ ظˆظ…ط±طھط¬ط¹ط§طھ ط§ظ„طھط´ط؛ظٹظ„ ط§ظ„ط¯ط§ط®ظ„ظٹ.',
      'ظ…ظ„ط®طµ طھظ†ظپظٹط°ظٹ ظ„ظ„ظ…ط®ط²ظˆظ† ظ…ط¹ ط±ط¤ظٹط© ط§ظ„ط­ط±ظƒط© ظˆط§ظ„طھظ‚ظٹظٹظ….',
      'ط¶ط¨ط· ط£ظ†ظˆط§ط¹ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ ظ„ط¶ظ…ط§ظ† ط­ظˆظƒظ…ط© ظ…ظˆط­ط¯ط© ظ„ظ„ظ…ط®ط²ظˆظ†.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ظ…ط®ط²ظˆظ†',
    flow: ['طھط®ط·ظٹط· ط§ظ„ط§ط­طھظٹط§ط¬ط§طھ ظˆط·ظ„ط¨ط§طھ ط§ظ„ط´ط±ط§ط،', 'ط§ط³طھظ„ط§ظ… ط§ظ„ظ…ط®ط²ظˆظ† ظˆط§ظ„طھط­ظ‚ظ‚ ظ…ظ†ظ‡', 'طھط®طµظٹطµ ط§ظ„ظ…ظˆط§ط¯ ظˆطµط±ظپظ‡ط§', 'ظ…ط¹ط§ظ„ط¬ط© ط§ظ„ظ…ط±طھط¬ط¹ط§طھ ظˆط§ظ„طھط³ظˆظٹط§طھ', 'ظ…طھط§ط¨ط¹ط© ط§ظ„ط±طµظٹط¯ ظˆظ…ط¤ط´ط±ط§طھ ط§ظ„ط£ط¯ط§ط،'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط§ظ„ظ…ط®ط²ظˆظ†',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['ط¯ظ‚ط© ط£ط¹ظ„ظ‰ ظپظٹ ط§ظ„ظ…ط®ط²ظˆظ†', 'ط®ظپط¶ ط§ظ„ظ†ظˆط§ظ‚طµ ظˆط§ظ„ظپط§ط¦ط¶', 'طھط­ط³ظٹظ† ط¥ظ†طھط§ط¬ظٹط© ط§ظ„ظ…ط³طھظˆط¯ط¹ط§طھ'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/91-inventory-executive-summary-1.PNG',
    title: { en: 'Inventory Executive Summary', fr: 'Synthese executive inventaire', ar: 'ط§ظ„ظ…ظ„ط®طµ ط§ظ„طھظ†ظپظٹط°ظٹ ظ„ظ„ظ…ط®ط²ظˆظ†' },
    caption: { en: 'Operational view of stock health and movement.', fr: 'Vue operationnelle de la sante et des mouvements du stock.', ar: 'ط¹ط±ط¶ طھط´ط؛ظٹظ„ظٹ ظ„طµط­ط© ط§ظ„ظ…ط®ط²ظˆظ† ظˆط­ط±ظƒطھظ‡.' },
  },
  {
    src: '/screenshots/91-inventory-executive-summary-2.PNG',
    title: { en: 'Extended Inventory Summary', fr: 'Synthese inventaire etendue', ar: 'ظ…ظ„ط®طµ ظ…ط®ط²ظˆظ† ظ…ظˆط³ط¹' },
    caption: { en: 'Extended metrics for valuation and supply performance.', fr: 'Mesures etendues pour valorisation et performance supply.', ar: 'ظ…ط¤ط´ط±ط§طھ ظ…ظˆط³ط¹ط© ظ„ظ„طھظ‚ظٹظٹظ… ظˆط£ط¯ط§ط، ط³ظ„ط³ظ„ط© ط§ظ„ط¥ظ…ط¯ط§ط¯.' },
  },
  {
    src: '/screenshots/3-grid-data.PNG',
    title: { en: 'Inventory Transaction Grid', fr: 'Grille transactions inventaire', ar: 'ط¬ط¯ظˆظ„ ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ظ…ط®ط²ظˆظ†' },
    caption: { en: 'Detailed line-level tracking for receipts and issues.', fr: 'Suivi detaille par ligne pour receptions et sorties.', ar: 'ظ…طھط§ط¨ط¹ط© طھظپطµظٹظ„ظٹط© ط¹ظ„ظ‰ ظ…ط³طھظˆظ‰ ط§ظ„ط¨ظ†ظˆط¯ ظ„ظ„ط§ط³طھظ„ط§ظ…ط§طھ ظˆط§ظ„طµط±ظپ.' },
  },
]

export function InventoryManagementPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="flex items-center justify-between">
          <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
            <ArrowRight size={14} className="rotate-180" />
            {t.backToHome}
          </a>
          <a href={`/?lang=${lang}`}><img src="/EPIX.png" alt="EPIX" className="h-12 w-auto" /></a>
        </div>

        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10">
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Inventory Management</p>
          <h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
            <img
              src="/screenshots/91-inventory-executive-summary-1.PNG"
              alt="Inventory Executive Summary"
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
                <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>
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
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">INV</span></div>
                </button>
                <div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6">
          <div className="flex items-start gap-3"><Boxes className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div>
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
