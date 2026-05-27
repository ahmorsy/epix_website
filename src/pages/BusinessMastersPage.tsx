import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Layers3 } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Business Masters For Clean Data Across Every Module',
    desc: 'EPIX Business Masters creates a single trusted source for suppliers, customers, banks, currencies, and shared reference data.',
    capabilitiesTitle: 'Business Masters Capabilities',
    capabilities: [
      'Supplier and customer registries shared across all flows.',
      'Bank and branch reference governance for finance and cash.',
      'Currency and exchange-rate setup for multi-currency operations.',
      'Attribute and taxonomy controls for consistent transactions.',
      'Cross-module item and warehouse master foundations.',
    ],
    flowTitle: 'Master Data Flow',
    flow: ['Define reference entities', 'Approve and publish master records', 'Reuse in business transactions', 'Track edits and version history', 'Audit data ownership and quality'],
    galleryTitle: 'Business Masters Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Higher data consistency', 'Fewer downstream transaction errors', 'Faster onboarding of new entities'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Business Masters Pour Une Donnee Propre Dans Tous Les Modules',
    desc: 'Business Masters EPIX fournit une source de reference unique pour fournisseurs, clients, banques, devises et donnees partagees.',
    capabilitiesTitle: 'Capacites Business Masters',
    capabilities: [
      'Referentiels fournisseurs et clients communs.',
      'Gouvernance banques et agences pour finance et tresorerie.',
      'Parametrage devises et taux de change multidevise.',
      'Controle des attributs et taxonomies transactionnelles.',
      'Fondations articles et entrepots pour tous les modules.',
    ],
    flowTitle: 'Flux Donnees De Base',
    flow: ['Definir les entites de reference', 'Valider et publier', 'Reutiliser dans les transactions', 'Suivre les modifications', 'Auditer propriete et qualite des donnees'],
    galleryTitle: 'Ecrans Business Masters',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Donnees plus coherentes', 'Moins d erreurs de transaction', 'Onboarding plus rapide'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط© ظ„ظ„ط£ط¹ظ…ط§ظ„ ظ„طھظˆط­ظٹط¯ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط¹ط¨ط± ظƒظ„ ط§ظ„ظˆط­ط¯ط§طھ',
    desc: 'طھظˆظپط± Business Masters ظپظٹ EPIX ظ…طµط¯ط±ط§ ظ…ظˆط­ط¯ط§ ظˆظ…ظˆط«ظˆظ‚ط§ ظ„ظ„ظ…ظˆط±ط¯ظٹظ† ظˆط§ظ„ط¹ظ…ظ„ط§ط، ظˆط§ظ„ط¨ظ†ظˆظƒ ظˆط§ظ„ط¹ظ…ظ„ط§طھ ظˆط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط© ط§ظ„ظ…ط´طھط±ظƒط©.',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ Business Masters',
    capabilities: [
      'ط³ط¬ظ„ط§طھ ظ…ظˆط­ط¯ط© ظ„ظ„ظ…ظˆط±ط¯ظٹظ† ظˆط§ظ„ط¹ظ…ظ„ط§ط، ط¹ط¨ط± ظƒظ„ ط§ظ„طھط¯ظپظ‚ط§طھ.',
      'ط­ظˆظƒظ…ط© ط¨ظٹط§ظ†ط§طھ ط§ظ„ط¨ظ†ظˆظƒ ظˆط§ظ„ظپط±ظˆط¹ ظ„ظ„ظ…ط§ظ„ظٹط© ظˆط§ظ„ط®ط²ظٹظ†ط©.',
      'ط¥ط¹ط¯ط§ط¯ ط§ظ„ط¹ظ…ظ„ط§طھ ظˆط£ط³ط¹ط§ط± ط§ظ„طµط±ظپ ظ„ظ„ط¹ظ…ظ„ظٹط§طھ ظ…طھط¹ط¯ط¯ط© ط§ظ„ط¹ظ…ظ„ط§طھ.',
      'ط¶ط¨ط· ط§ظ„ط³ظ…ط§طھ ظˆط§ظ„طھطµظ†ظٹظپط§طھ ظ„ط«ط¨ط§طھ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ.',
      'ط£ط³ط§ط³ظٹط§طھ ظ…ظˆط­ط¯ط© ظ„ظ„ظ…ظˆط§ط¯ ظˆط§ظ„ظ…ط³طھظˆط¯ط¹ط§طھ ط¹ط¨ط± ط§ظ„ظˆط­ط¯ط§طھ.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط©',
    flow: ['طھط¹ط±ظٹظپ ط§ظ„ظƒظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط©', 'ط§ط¹طھظ…ط§ط¯ ظˆظ†ط´ط± ط§ظ„ط³ط¬ظ„ط§طھ', 'ط§ط³طھط®ط¯ط§ظ…ظ‡ط§ ظپظٹ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ', 'ظ…طھط§ط¨ط¹ط© ط§ظ„طھط¹ط¯ظٹظ„ط§طھ ظˆط§ظ„ط¥طµط¯ط§ط±ط§طھ', 'طھط¯ظ‚ظٹظ‚ ظ…ظ„ظƒظٹط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ظˆط¬ظˆط¯طھظ‡ط§'],
    galleryTitle: 'ط´ط§ط´ط§طھ Business Masters',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['ط§طھط³ط§ظ‚ ط£ط¹ظ„ظ‰ ظ„ظ„ط¨ظٹط§ظ†ط§طھ', 'ط£ط®ط·ط§ط، ط£ظ‚ظ„ ظپظٹ ط§ظ„ظ…ط¹ط§ظ…ظ„ط§طھ', 'ط¥ط¯ط®ط§ظ„ ط£ط³ط±ط¹ ظ„ظ„ظƒظٹط§ظ†ط§طھ ط§ظ„ط¬ط¯ظٹط¯ط©'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Master Navigation Hub', fr: 'Hub navigation master', ar: 'ظ…ط±ظƒط² طھظ†ظ‚ظ„ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط©' }, caption: { en: 'Fast access to reference maintenance workspaces.', fr: 'Acces rapide aux espaces de maintenance referentielle.', ar: 'ظˆطµظˆظ„ ط³ط±ظٹط¹ ظ„ظ…ط³ط§ط­ط§طھ طµظٹط§ظ†ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط©.' } },
  { src: '/screenshots/3-grid-data.PNG', title: { en: 'Reference Data Grid', fr: 'Grille donnees de reference', ar: 'ط¬ط¯ظˆظ„ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط©' }, caption: { en: 'Bulk maintenance for master records with filtering and controls.', fr: 'Maintenance en masse des referentiels avec filtres et controles.', ar: 'طµظٹط§ظ†ط© ط¬ظ…ط§ط¹ظٹط© ظ„ط³ط¬ظ„ط§طھ ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط© ظ…ط¹ ظپظ„ط§طھط± ظˆط¶ظˆط§ط¨ط·.' } },
  { src: '/screenshots/92-projects-gantt.PNG', title: { en: 'Master Governance Planning', fr: 'Planification gouvernance masters', ar: 'طھط®ط·ظٹط· ط­ظˆظƒظ…ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ط±ط¬ط¹ظٹط©' }, caption: { en: 'Planning and follow-up for data standardization programs.', fr: 'Planification et suivi des initiatives de standardisation des donnees.', ar: 'طھط®ط·ظٹط· ظˆظ…طھط§ط¨ط¹ط© ظ…ط¨ط§ط¯ط±ط§طھ طھظˆط­ظٹط¯ ط§ظ„ط¨ظٹط§ظ†ط§طھ.' } },
]

export function BusinessMastersPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10"><p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Business Masters</p><h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1><p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p><div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg"><img src="/screenshots/3-grid-data.PNG" alt="Business Masters Grid" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" /></div></section>
        <section className="mt-8 grid gap-5 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div><div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div></section>
        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">BM</span></div></button><div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div></motion.article>)}</div></section>
        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Layers3 className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
