import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Human Resources And Payroll For Workforce Precision',
    desc: 'EPIX HR unifies employee master data, attendance, leave, overtime, payroll runs, and statutory readiness in one governed workflow.',
    capabilitiesTitle: 'HR And Payroll Capabilities',
    capabilities: [
      'Employee lifecycle management from onboarding to history tracking.',
      'Attendance, shift assignment, and exception handling workflows.',
      'Leave, overtime, and loan processes with approvals and traceability.',
      'Payroll periods, payroll run execution, and payslip generation.',
      'Tax bracket and payroll posting setup for compliance readiness.',
    ],
    flowTitle: 'HR To Payroll Flow',
    flow: ['Configure organization and job structures', 'Manage employee records and schedules', 'Capture attendance, leave, and overtime', 'Run payroll and validate output', 'Publish payslips and accounting entries'],
    galleryTitle: 'HR And Payroll Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Lower payroll errors', 'Improved HR compliance', 'Clear workforce analytics for leadership'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Ressources Humaines Et Paie Pour Une Execution Fiable',
    desc: 'EPIX RH unifie donnees employes, presence, conges, heures supplementaires et paie dans un workflow gouverne.',
    capabilitiesTitle: 'Capacites RH Et Paie',
    capabilities: [
      'Gestion du cycle employe de l integration a l historique.',
      'Presence, affectation des shifts et gestion des exceptions.',
      'Conges, heures supplementaires et prets avec approbations tracees.',
      'Periodes de paie, execution du payroll et generation des bulletins.',
      'Configuration fiscale et comptable pour conformite statutaire.',
    ],
    flowTitle: 'Flux RH Vers Paie',
    flow: ['Configurer structure organisationnelle', 'Gerer dossiers employes et planning', 'Capturer presence et conges', 'Executer paie et controler', 'Publier bulletins et ecritures'],
    galleryTitle: 'Ecrans RH Et Paie',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Moins d erreurs de paie', 'Conformite RH renforcee', 'Vision claire des effectifs'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©',
    title: 'ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط© ظˆط§ظ„ط±ظˆط§طھط¨ ط¨ط¯ظ‚ط© طھط´ط؛ظٹظ„ظٹط© ط¹ط§ظ„ظٹط©',
    desc: 'طھظˆط­ظ‘ط¯ ظˆط­ط¯ط© ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط© ظپظٹ EPIX ط¨ظٹط§ظ†ط§طھ ط§ظ„ظ…ظˆط¸ظپظٹظ† ظˆط§ظ„ط­ط¶ظˆط± ظˆط§ظ„ط¥ط¬ط§ط²ط§طھ ظˆط§ظ„ط¹ظ…ظ„ ط§ظ„ط¥ط¶ط§ظپظٹ ظˆطھط´ط؛ظٹظ„ ط§ظ„ط±ظˆط§طھط¨ ط¶ظ…ظ† ط³ظٹط± ط¹ظ…ظ„ ظ…ط­ظƒظˆظ….',
    capabilitiesTitle: 'ظ‚ط¯ط±ط§طھ ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط© ظˆط§ظ„ط±ظˆط§طھط¨',
    capabilities: [
      'ط¥ط¯ط§ط±ط© ط¯ظˆط±ط© ط­ظٹط§ط© ط§ظ„ظ…ظˆط¸ظپ ظ…ظ† ط§ظ„طھط¹ظٹظٹظ† ط­طھظ‰ ط§ظ„ط³ط¬ظ„ ط§ظ„ظˆط¸ظٹظپظٹ.',
      'طھط¯ظپظ‚ط§طھ ط§ظ„ط­ط¶ظˆط± ظˆطھظˆط²ظٹط¹ ط§ظ„ظˆط±ط¯ظٹط§طھ ظˆظ…ط¹ط§ظ„ط¬ط© ط§ظ„ط§ط³طھط«ظ†ط§ط،ط§طھ.',
      'ط¥ط¬ط±ط§ط،ط§طھ ط§ظ„ط¥ط¬ط§ط²ط§طھ ظˆط§ظ„ط¹ظ…ظ„ ط§ظ„ط¥ط¶ط§ظپظٹ ظˆط§ظ„ظ‚ط±ظˆط¶ ظ…ط¹ ظ…ظˆط§ظپظ‚ط§طھ ظˆط§ط¶ط­ط©.',
      'ط¥ط¹ط¯ط§ط¯ ظپطھط±ط§طھ ط§ظ„ط±ظˆط§طھط¨ ظˆطھط´ط؛ظٹظ„ظ‡ط§ ظˆط¥طµط¯ط§ط± ظ…ط³ظٹط±ط§طھ ط§ظ„ط±ظˆط§طھط¨.',
      'طھظ‡ظٹط¦ط© ط§ظ„ط´ط±ط§ط¦ط­ ط§ظ„ط¶ط±ظٹط¨ظٹط© ظˆط±ط¨ط· ظ‚ظٹظˆط¯ ط§ظ„ط±ظˆط§طھط¨ ظ„ظ„ط§ظ„طھط²ط§ظ… ط§ظ„ظ†ط¸ط§ظ…ظٹ.',
    ],
    flowTitle: 'طھط¯ظپظ‚ ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط© ط¥ظ„ظ‰ ط§ظ„ط±ظˆط§طھط¨',
    flow: ['طھظ‡ظٹط¦ط© ط§ظ„ظ‡ظٹظƒظ„ ط§ظ„طھظ†ط¸ظٹظ…ظٹ ظˆط§ظ„ظˆط¸ط§ط¦ظپ', 'ط¥ط¯ط§ط±ط© ظ…ظ„ظپط§طھ ط§ظ„ظ…ظˆط¸ظپظٹظ† ظˆط§ظ„ط¬ط¯ط§ظˆظ„', 'طھط³ط¬ظٹظ„ ط§ظ„ط­ط¶ظˆط± ظˆط§ظ„ط¥ط¬ط§ط²ط§طھ ظˆط§ظ„ط¹ظ…ظ„ ط§ظ„ط¥ط¶ط§ظپظٹ', 'طھط´ط؛ظٹظ„ ط§ظ„ط±ظˆط§طھط¨ ظˆط§ظ„طھط­ظ‚ظ‚ ظ…ظ† ط§ظ„ظ†طھط§ط¦ط¬', 'ط¥طµط¯ط§ط± ط§ظ„ظ…ط³ظٹط±ط§طھ ظˆطھط±ط­ظٹظ„ ط§ظ„ظ‚ظٹظˆط¯'],
    galleryTitle: 'ط´ط§ط´ط§طھ ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط© ظˆط§ظ„ط±ظˆط§طھط¨',
    outcomesTitle: 'ظ†طھط§ط¦ط¬ ط§ظ„ط£ط¹ظ…ط§ظ„',
    outcomes: ['طھظ‚ظ„ظٹظ„ ط£ط®ط·ط§ط، ط§ظ„ط±ظˆط§طھط¨', 'ط±ظپط¹ ط§ظ„ط§ظ„طھط²ط§ظ… ط¨ط³ظٹط§ط³ط§طھ ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط©', 'ط±ط¤ظٹط© ط£ظˆط¶ط­ ظ„ظ…ط¤ط´ط±ط§طھ ط§ظ„ظ‚ظˆظ‰ ط§ظ„ط¹ط§ظ…ظ„ط©'],
    close: 'ط¥ط؛ظ„ط§ظ‚',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/93-HR_Dashboard_2026-05-03.png',
    title: { en: 'HR Executive Dashboard', fr: 'Tableau RH executif', ar: 'ظ„ظˆط­ط© طھظ†ظپظٹط°ظٹط© ظ„ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط©' },
    caption: { en: 'Leadership view of workforce and payroll indicators.', fr: 'Vue direction des indicateurs effectifs et paie.', ar: 'ط±ط¤ظٹط© ظ‚ظٹط§ط¯ظٹط© ظ„ظ…ط¤ط´ط±ط§طھ ط§ظ„ظ‚ظˆظ‰ ط§ظ„ط¹ط§ظ…ظ„ط© ظˆط§ظ„ط±ظˆط§طھط¨.' },
  },
  {
    src: '/screenshots/3-grid-data.PNG',
    title: { en: 'Employee Transaction Grid', fr: 'Grille transactions employes', ar: 'ط¬ط¯ظˆظ„ ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ظ…ظˆط¸ظپظٹظ†' },
    caption: { en: 'Detailed operational records for HR transactions.', fr: 'Suivi detaille des transactions RH.', ar: 'ط³ط¬ظ„ط§طھ طھط´ط؛ظٹظ„ظٹط© طھظپطµظٹظ„ظٹط© ظ„ظ…ط¹ط§ظ…ظ„ط§طھ ط§ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط©.' },
  },
  {
    src: '/screenshots/2-home-page.PNG',
    title: { en: 'Unified HR Navigation', fr: 'Navigation RH unifiee', ar: 'طھظ†ظ‚ظ„ ظ…ظˆط­ط¯ ظ„ظ„ظ…ظˆط§ط±ط¯ ط§ظ„ط¨ط´ط±ظٹط©' },
    caption: { en: 'Fast access to attendance, leave, and payroll flows.', fr: 'Acces rapide aux flux presence, conges et paie.', ar: 'ظˆطµظˆظ„ ط³ط±ظٹط¹ ظ„طھط¯ظپظ‚ط§طھ ط§ظ„ط­ط¶ظˆط± ظˆط§ظ„ط¥ط¬ط§ط²ط§طھ ظˆط§ظ„ط±ظˆط§طھط¨.' },
  },
]

export function HumanResourcesPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>

        <section className="mt-6 rounded-3xl border border-[#d7e4ff] bg-gradient-to-br from-[#f6f9ff] via-white to-[#eef7ff] p-7 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Human Resources</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><ol className="mt-4 space-y-3">{t.flow.map((step, idx) => <li key={step} className="flex items-start gap-3 text-sm text-[var(--text-muted)]"><span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold text-[#335fae]">{idx + 1}</span><span>{step}</span></li>)}</ol></div>
        </section>

        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => (
          <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={shot.title[lang]} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">HR</span></div></button>
            <div className="p-4"><h3 className="font-display text-lg font-semibold">{shot.title[lang]}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p></div>
          </motion.article>
        ))}</div></section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><BarChart3 className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
