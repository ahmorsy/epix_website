import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, CheckCircle2, Wallet } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
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
    backToHome: 'العودة للرئيسية',
    title: 'إدارة نقد للتحكم البنكي وتسريع التسويات',
    desc: 'توحّد إدارة النقد في EPIX الحسابات البنكية ورفع الكشوف والمطابقة والتسويات واحتساب الفوائد ضمن منصة واحدة للخزينة.',
    capabilitiesTitle: 'قدرات إدارة النقد',
    capabilities: [
      'حوكمة البنوك والفروع والحسابات والاتفاقيات البنكية.',
      'رفع كشوف الحساب البنكية ومعالجة بنودها تفصيليا.',
      'مطابقة البنكي مع الدفاتر وسير عمل التسويات.',
      'إعداد مؤشرات الفائدة وتشغيل احتساب الفوائد آليا.',
      'ترحيل نتائج التسوية إلى GL وتقارير أرصدة النقد.',
    ],
    flowTitle: 'تدفق النقد والتسوية',
    flow: ['تهيئة البيانات البنكية', 'تحميل رؤوس الكشوف والبنود', 'مطابقة البنكي مع الدفاتر', 'تنفيذ التسويات واعتمادها', 'ترحيل النتائج إلى GL وإصدار التقارير'],
    galleryTitle: 'شاشات إدارة النقد',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['تسويات أسرع', 'رؤية أعلى للسيولة', 'تقليل الجهد اليدوي في الخزينة'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/9-cash-manag-statement-upload.PNG',
    title: { en: 'Bank Statement Upload', fr: 'Import releve bancaire', ar: 'رفع كشف الحساب البنكي' },
    caption: { en: 'Fast ingestion of statement files for reconciliation.', fr: 'Chargement rapide des releves pour rapprochement.', ar: 'تحميل سريع لكشوف البنك لبدء التسويات.' },
  },
  {
    src: '/screenshots/6-petty-cash.PNG',
    title: { en: 'Cash Operations Control', fr: 'Controle operations cash', ar: 'التحكم في العمليات النقدية' },
    caption: { en: 'Operational oversight for disbursement and cash activity.', fr: 'Pilotage operationnel des decaissements et activites cash.', ar: 'إشراف تشغيلي على الصرف والعمليات النقدية.' },
  },
  {
    src: '/screenshots/7-outstanding-pays.PNG',
    title: { en: 'Liability And Cash Alignment', fr: 'Alignement passifs et cash', ar: 'مواءمة الالتزامات مع النقد' },
    caption: { en: 'Visibility to coordinate payable commitments with cash plans.', fr: 'Visibilite pour aligner engagements fournisseurs et plans cash.', ar: 'رؤية لمواءمة الالتزامات مع خطط السيولة.' },
  },
]

export function CashManagementPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? moduleEsObject(copy.en) : copy[contentLang]
  const text = (value: string) => (lang === 'es' ? moduleEsText(value) : value)

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="flex items-center justify-between">
          <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline"><ArrowRight size={14} className="rotate-180" />{t.backToHome}</a>
          <a href={`/?lang=${lang}`}><img src="/EPIX.png" alt="EPIX" className="h-20 w-auto drop-shadow-sm" /></a>
        </div>

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
            <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">CASH</span></div></button>
            <div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div>
          </motion.article>
        ))}</div></section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><Wallet className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
      </main>

      {selected && (
        <AccessibleImageModal
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={text(selected.title[contentLang])}
          imageSrc={selected.src}
          imageAlt={text(selected.title[contentLang])}
          closeLabel={t.close}
          subtitle={text(selected.caption[contentLang])}
        />
      )}
    </div>
  )
}
