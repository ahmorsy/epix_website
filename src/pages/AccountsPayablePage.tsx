import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  FileStack,
  Landmark,
  ShieldCheck,
} from 'lucide-react'
import { useModalA11y } from '../components/useModalA11y'

type Lang = 'en' | 'fr' | 'ar'

type Localized = {
  en: string
  fr: string
  ar: string
}

type Shot = {
  src: string
  title: Localized
  caption: Localized
}

const copy = {
  en: {
    breadcrumb: 'Modules / Accounts Payable',
    backToHome: 'Back To Home',
    heroTitle: 'Accounts Payable That Turns Liabilities Into Control',
    heroDesc:
      'EPIX Accounts Payable centralizes invoice intake, approvals, aging control, and payout planning so finance teams move faster with stronger cash discipline.',
    heroPrimary: 'Request AP Demo',
    heroSecondary: 'See AP Flow',
    seoBlockTitle: 'Why This AP Page Matters For ERP Buyers',
    seoBlockText:
      'This page is structured for high-intent searches such as accounts payable ERP software, AP automation for SMB, supplier invoice workflow, and payable aging analytics. It highlights practical process impact and executive control outcomes.',
    stats: [
      { label: 'Invoice Throughput Visibility', value: '100%' },
      { label: 'Aging-Based Prioritization', value: 'Real-Time' },
      { label: 'Approval Traceability', value: 'Full Audit' },
    ],
    flowTitle: 'Business Flow: Procure To Pay (AP Control Layer)',
    flowSteps: [
      'Supplier invoice capture and validation',
      'Policy-driven approval routing',
      'Outstanding and aging analysis',
      'Payment planning and execution',
      'Posting and financial reconciliation',
    ],
    capabilitiesTitle: 'Detailed AP Capabilities',
    capabilities: [
      'Payable volume, outstanding, and aging summaries for leadership decisions.',
      'Supplier liabilities monitoring to reduce overdue risk and dispute cycles.',
      'Tight integration with cash management and general ledger journals.',
      'Role-based approvals with clear accountability and audit evidence.',
    ],
    comparisonTitle: 'EPIX Vs Manual Payables Process',
    comparisonManual: 'Manual Process',
    comparisonEpix: 'EPIX Accounts Payable',
    comparisonRows: [
      { m: 'Emails and spreadsheets', e: 'Central AP workspace and policy workflow' },
      { m: 'Delayed liability visibility', e: 'Live outstanding and aging dashboards' },
      { m: 'Scattered approval trail', e: 'Role-based traceable approval history' },
      { m: 'Reactive payments', e: 'Planned payout cycles with cash alignment' },
    ],
    smbTitle: 'Optimized For SMB Finance Teams',
    smbText:
      'EPIX AP is designed for small and medium businesses that need enterprise-grade governance without heavyweight complexity. Teams can go live fast and scale controls as volume grows.',
    galleryTitle: 'Accounts Payable Screens',
    ctaTitle: 'Next Planned Pages',
    ctaText:
      'After your approval, we will add pages for each module, business flow pages (P2P, O2C, H2R), and comparison pages such as EPIX vs manual process and EPIX for SMB ERP.',
    ctaBtn: 'Approve And Continue',
    close: 'Close',
  },
  fr: {
    breadcrumb: 'Modules / Comptes Fournisseurs',
    backToHome: 'Retour Accueil',
    heroTitle: 'Comptes Fournisseurs: Plus de contrôle, moins de friction',
    heroDesc:
      'EPIX centralise factures, validations, analyse d’ancienneté et planification paiements pour accélérer les équipes finance avec plus de maîtrise cash.',
    heroPrimary: 'Demander une démo AP',
    heroSecondary: 'Voir le flux AP',
    seoBlockTitle: 'Pourquoi cette page AP est importante',
    seoBlockText:
      'Cette page cible des recherches à forte intention: logiciel ERP comptes fournisseurs, automatisation AP PME, workflow factures fournisseurs, analyse d’ancienneté.',
    stats: [
      { label: 'Visibilité du flux factures', value: '100%' },
      { label: 'Priorisation par ancienneté', value: 'Temps réel' },
      { label: 'Traçabilité des validations', value: 'Audit complet' },
    ],
    flowTitle: 'Flux métier: Procure To Pay (Couche AP)',
    flowSteps: [
      'Capture et validation des factures',
      'Routage d’approbation piloté par politiques',
      'Analyse encours et ancienneté',
      'Planification et exécution des paiements',
      'Comptabilisation et rapprochement',
    ],
    capabilitiesTitle: 'Capacités AP détaillées',
    capabilities: [
      'Synthèses volume, encours et ancienneté pour décisions direction.',
      'Suivi passifs fournisseurs pour réduire retards et litiges.',
      'Intégration forte avec trésorerie et journal GL.',
      'Approvals par rôles avec traçabilité complète.',
    ],
    comparisonTitle: 'EPIX Vs Processus manuel',
    comparisonManual: 'Processus manuel',
    comparisonEpix: 'EPIX Comptes Fournisseurs',
    comparisonRows: [
      { m: 'Emails et tableurs', e: 'Espace AP centralisé et workflow gouverné' },
      { m: 'Visibilité retardée', e: 'Dashboards encours et ancienneté en direct' },
      { m: 'Piste d’approbation dispersée', e: 'Historique traçable par rôle' },
      { m: 'Paiements réactifs', e: 'Cycles planifiés alignés sur la trésorerie' },
    ],
    smbTitle: 'Optimisé pour les PME',
    smbText:
      'EPIX AP offre un niveau de contrôle entreprise avec une expérience simple pour les équipes finance PME, puis s’étend avec la croissance.',
    galleryTitle: 'Écrans Comptes Fournisseurs',
    ctaTitle: 'Pages prévues ensuite',
    ctaText:
      'Après validation, nous ajouterons une page par module, des pages de flux métier, et des pages comparatives SEO.',
    ctaBtn: 'Valider et continuer',
    close: 'Fermer',
  },
  ar: {
    breadcrumb: 'الوحدات / الحسابات الدائنة',
    backToHome: 'العودة للرئيسية',
    heroTitle: 'الحسابات الدائنة: تحكم أعلى في الالتزامات النقدية',
    heroDesc:
      'يوحّد EPIX إدارة فواتير الموردين ومسارات الموافقة وتحليل الأعمار وتخطيط المدفوعات لرفع كفاءة فريق المالية مع انضباط نقدي أعلى.',
    heroPrimary: 'اطلب عرضا لوحدة AP',
    heroSecondary: 'استعرض تدفق AP',
    seoBlockTitle: 'لماذا هذه الصفحة مهمة للمشترين',
    seoBlockText:
      'تم تصميم الصفحة لاستهداف كلمات بحث عالية النية مثل: نظام ERP للحسابات الدائنة، أتمتة AP للشركات الصغيرة والمتوسطة، سير فواتير الموردين، وتحليل أعمار الدائنين.',
    stats: [
      { label: 'رؤية تدفق الفواتير', value: '100%' },
      { label: 'تحديد الأولويات حسب الأعمار', value: 'لحظي' },
      { label: 'قابلية تتبع الموافقات', value: 'تدقيق كامل' },
    ],
    flowTitle: 'تدفق الأعمال: من الشراء إلى السداد (طبقة AP)',
    flowSteps: [
      'استقبال فواتير الموردين والتحقق منها',
      'توجيه الموافقات حسب السياسات',
      'تحليل الأرصدة القائمة والأعمار',
      'تخطيط المدفوعات وتنفيذها',
      'الترحيل المحاسبي والتسويات المالية',
    ],
    capabilitiesTitle: 'قدرات تفصيلية في AP',
    capabilities: [
      'ملخصات الحجم والأرصدة القائمة والأعمار لدعم قرارات الإدارة.',
      'متابعة التزامات الموردين لتقليل التأخر والنزاعات.',
      'تكامل قوي مع إدارة النقد وقيود الأستاذ العام.',
      'موافقات حسب الصلاحيات مع أثر تدقيقي واضح.',
    ],
    comparisonTitle: 'EPIX مقابل العملية اليدوية',
    comparisonManual: 'العملية اليدوية',
    comparisonEpix: 'الحسابات الدائنة في EPIX',
    comparisonRows: [
      { m: 'إيميلات وجداول بيانات', e: 'مساحة AP مركزية وسير عمل محكوم' },
      { m: 'تأخر في رؤية الالتزامات', e: 'لوحات فورية للأرصدة والأعمار' },
      { m: 'أثر موافقات متشتت', e: 'تاريخ موافقات واضح حسب الدور' },
      { m: 'مدفوعات رد فعل', e: 'دورات دفع مخططة ومتوافقة مع النقد' },
    ],
    smbTitle: 'مُحسّن للشركات الصغيرة والمتوسطة',
    smbText:
      'تم تصميم وحدة AP في EPIX لتقديم حوكمة مؤسسية بتجربة بسيطة لفرق المالية في الشركات الصغيرة والمتوسطة مع قابلية توسع لاحقة.',
    galleryTitle: 'شاشات الحسابات الدائنة',
    ctaTitle: 'الصفحات التالية المقترحة',
    ctaText:
      'بعد اعتمادك لهذه الصفحة، سنبدأ ببناء صفحة لكل وحدة وصفحات تدفقات الأعمال والمقارنات التسويقية لتحسين الظهور العضوي.',
    ctaBtn: 'اعتمد وواصل',
    close: 'إغلاق',
  },
}

const shots: Shot[] = [
  {
    src: '/screenshots/71-payable-volume-summary.PNG',
    title: {
      en: 'Payables Volume Summary',
      fr: 'Synthèse volume fournisseurs',
      ar: 'ملخص حجم الحسابات الدائنة',
    },
    caption: {
      en: 'Executive view of payable transaction throughput.',
      fr: 'Vue exécutive du débit des opérations fournisseurs.',
      ar: 'رؤية تنفيذية لحجم تدفقات معاملات الدائنين.',
    },
  },
  {
    src: '/screenshots/72-payable-outstanding-summary.PNG',
    title: {
      en: 'Payables Outstanding Summary',
      fr: 'Synthèse des soldes fournisseurs',
      ar: 'ملخص الأرصدة الدائنة القائمة',
    },
    caption: {
      en: 'Outstanding liabilities monitoring for treasury and finance.',
      fr: 'Suivi des passifs ouverts pour la trésorerie et la finance.',
      ar: 'متابعة الالتزامات القائمة لفِرق الخزينة والمالية.',
    },
  },
  {
    src: '/screenshots/73-payable-aging-summary.PNG',
    title: {
      en: 'Payables Aging Summary',
      fr: 'Analyse d’ancienneté fournisseurs',
      ar: 'تحليل أعمار الحسابات الدائنة',
    },
    caption: {
      en: 'Aging prioritization to improve supplier payment planning.',
      fr: 'Priorisation par ancienneté pour améliorer la planification paiements.',
      ar: 'تحديد أولويات السداد حسب الأعمار لتحسين التخطيط للموردين.',
    },
  },
  {
    src: '/screenshots/7-outstanding-pays.PNG',
    title: {
      en: 'Outstanding Payables Monitor',
      fr: 'Suivi des dettes fournisseurs',
      ar: 'متابعة المستحقات الدائنة',
    },
    caption: {
      en: 'Actionable liability insights for AP teams.',
      fr: 'Insights actionnables des engagements pour les équipes AP.',
      ar: 'رؤى قابلة للتنفيذ لالتزامات الموردين لفِرق AP.',
    },
  },
]

export function AccountsPayablePage({ lang = 'en' }: { lang?: Lang }) {
  const [selectedShot, setSelectedShot] = useState<Shot | null>(null)
  const t = copy[lang]
  const dialogRef = useRef<HTMLDivElement | null>(null)
  useModalA11y(Boolean(selectedShot), () => setSelectedShot(null), dialogRef)

  const topStats = useMemo(() => t.stats, [t.stats])

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
          <ArrowRight size={14} className="rotate-180" />
          {t.backToHome}
        </a>

        <section className="mt-6 rounded-3xl border border-[#d7e4ff] bg-gradient-to-br from-[#f6f9ff] via-white to-[#eef7ff] p-7 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">{t.breadcrumb}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.heroTitle}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.heroDesc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-xl bg-[var(--brand)] px-5 py-3 font-semibold text-white">{t.heroPrimary}</button>
            <button className="rounded-xl border border-[#cad9f7] bg-white px-5 py-3 font-semibold">{t.heroSecondary}</button>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {topStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-[var(--line)] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{stat.label}</p>
              <p className="mt-1 font-display text-2xl font-bold text-[var(--brand)]">{stat.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-[#d8e6ff] bg-white p-6">
          <h2 className="font-display text-2xl font-bold">{t.seoBlockTitle}</h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">{t.seoBlockText}</p>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h3 className="font-display text-2xl font-bold">{t.flowTitle}</h3>
            <ol className="mt-4 space-y-3">
              {t.flowSteps.map((step, idx) => (
                <li key={step} className="flex items-start gap-3 text-sm text-[var(--text-muted)]">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eef4ff] text-xs font-bold text-[#335fae]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h3 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.capabilities.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[var(--line)] bg-white p-6">
          <h3 className="font-display text-2xl font-bold">{t.comparisonTitle}</h3>
          <div className="mt-5 overflow-hidden rounded-xl border border-[var(--line)]">
            <div className="grid grid-cols-2 bg-[#f3f7ff] text-sm font-bold">
              <div className="px-4 py-3">{t.comparisonManual}</div>
              <div className="border-l border-[#d8e5ff] px-4 py-3">{t.comparisonEpix}</div>
            </div>
            {t.comparisonRows.map((row) => (
              <div key={row.m} className="grid grid-cols-2 border-t border-[var(--line)] text-sm">
                <div className="px-4 py-3 text-[var(--text-muted)]">{row.m}</div>
                <div className="border-l border-[var(--line)] px-4 py-3 text-[var(--text)]">{row.e}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 text-[var(--brand)]" />
            <div>
              <h3 className="font-display text-2xl font-bold">{t.smbTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{t.smbText}</p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h3 className="font-display text-2xl font-bold">{t.galleryTitle}</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {shots.map((shot, index) => (
              <motion.article
                key={shot.src}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white"
              >
                <button type="button" onClick={() => setSelectedShot(shot)} className="block w-full text-left">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]">
                    <img loading="lazy" decoding="async" src={shot.src} alt={shot.title[lang]} className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">AP</span>
                  </div>
                </button>
                <div className="p-4">
                  <h4 className="font-display text-lg font-semibold">{shot.title[lang]}</h4>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">{shot.caption[lang]}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-white p-6">
          <h3 className="font-display text-2xl font-bold">{t.ctaTitle}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{t.ctaText}</p>
          <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 font-semibold text-white">
            {t.ctaBtn}
            <ArrowRight size={16} />
          </button>
        </section>
      </main>

      {selectedShot && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0b1933]/85 px-4 py-8" onClick={() => setSelectedShot(null)}>
          <div ref={dialogRef} role="dialog" aria-modal="true" tabIndex={-1} className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-[#33538d] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
              <p className="font-display text-lg font-semibold">{selectedShot.title[lang]}</p>
              <button className="rounded-lg border border-[var(--line)] px-3 py-1 text-sm font-semibold text-[var(--text-muted)]" onClick={() => setSelectedShot(null)}>
                {t.close}
              </button>
            </div>
            <div className="max-h-[78vh] overflow-auto bg-[#eef4ff] p-3">
              <img loading="eager" decoding="async" src={selectedShot.src} alt={selectedShot.title[lang]} className="h-auto w-full rounded-xl" />
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-[var(--line)] bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-6 text-sm text-[var(--text-muted)] md:px-8">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={14} className="text-[var(--brand)]" /> EPIX Accounts Payable Page</span>
          <span className="inline-flex items-center gap-2"><Landmark size={14} className="text-[var(--brand)]" /> AP Governance</span>
          <span className="inline-flex items-center gap-2"><FileStack size={14} className="text-[var(--brand)]" /> Supplier Workflows</span>
          <span className="inline-flex items-center gap-2"><CalendarClock size={14} className="text-[var(--brand)]" /> Aging Control</span>
          <span className="inline-flex items-center gap-2"><CircleDollarSign size={14} className="text-[var(--brand)]" /> Cash Discipline</span>
          <span className="inline-flex items-center gap-2"><BadgeCheck size={14} className="text-[var(--brand)]" /> Audit Ready</span>
        </div>
      </footer>
    </div>
  )
}
