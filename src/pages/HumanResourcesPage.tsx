import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, BarChart3, CheckCircle2 } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
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
    backToHome: 'العودة للرئيسية',
    title: 'الموارد البشرية والرواتب بدقة تشغيلية عالية',
    desc: 'توحّد وحدة الموارد البشرية في EPIX بيانات الموظفين والحضور والإجازات والعمل الإضافي وتشغيل الرواتب ضمن سير عمل محكوم.',
    capabilitiesTitle: 'قدرات الموارد البشرية والرواتب',
    capabilities: [
      'إدارة دورة حياة الموظف من التعيين حتى السجل الوظيفي.',
      'تدفقات الحضور وتوزيع الورديات ومعالجة الاستثناءات.',
      'إجراءات الإجازات والعمل الإضافي والقروض مع موافقات واضحة.',
      'إعداد فترات الرواتب وتشغيلها وإصدار مسيرات الرواتب.',
      'تهيئة الشرائح الضريبية وربط قيود الرواتب للالتزام النظامي.',
    ],
    flowTitle: 'تدفق الموارد البشرية إلى الرواتب',
    flow: ['تهيئة الهيكل التنظيمي والوظائف', 'إدارة ملفات الموظفين والجداول', 'تسجيل الحضور والإجازات والعمل الإضافي', 'تشغيل الرواتب والتحقق من النتائج', 'إصدار المسيرات وترحيل القيود'],
    galleryTitle: 'شاشات الموارد البشرية والرواتب',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['تقليل أخطاء الرواتب', 'رفع الالتزام بسياسات الموارد البشرية', 'رؤية أوضح لمؤشرات القوى العاملة'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/93-HR_Dashboard_2026-05-03.png',
    title: { en: 'HR Executive Dashboard', fr: 'Tableau RH executif', ar: 'لوحة تنفيذية للموارد البشرية' },
    caption: { en: 'Leadership view of workforce and payroll indicators.', fr: 'Vue direction des indicateurs effectifs et paie.', ar: 'رؤية قيادية لمؤشرات القوى العاملة والرواتب.' },
  },
  {
    src: '/screenshots/3-grid-data.PNG',
    title: { en: 'Employee Transaction Grid', fr: 'Grille transactions employes', ar: 'جدول معاملات الموظفين' },
    caption: { en: 'Detailed operational records for HR transactions.', fr: 'Suivi detaille des transactions RH.', ar: 'سجلات تشغيلية تفصيلية لمعاملات الموارد البشرية.' },
  },
  {
    src: '/screenshots/2-home-page.PNG',
    title: { en: 'Unified HR Navigation', fr: 'Navigation RH unifiee', ar: 'تنقل موحد للموارد البشرية' },
    caption: { en: 'Fast access to attendance, leave, and payroll flows.', fr: 'Acces rapide aux flux presence, conges et paie.', ar: 'وصول سريع لتدفقات الحضور والإجازات والرواتب.' },
  },
]

export function HumanResourcesPage({ lang = 'en' }: { lang?: Lang }) {
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
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Human Resources</p>
          <h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
            <img src="/screenshots/93-HR_Dashboard_2026-05-03.png" alt="HR Dashboard" loading="eager" decoding="async" className="h-52 w-full object-cover object-top md:h-64" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2><ul className="mt-4 space-y-3">{t.capabilities.map((line) => <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>)}</ul></div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6"><h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2><div className="flow-pipeline mt-5">{t.flow.map((step, idx) => <div key={step} className="flow-pipeline-step"><div className="flex items-center gap-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">{idx + 1}</span><span className="text-sm font-medium text-[var(--text)]">{step}</span></div></div>)}</div></div>
        </section>

        <section className="mt-8"><h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{shots.map((shot, index) => (
          <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
            <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left"><div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">HR</span></div></button>
            <div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div>
          </motion.article>
        ))}</div></section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6"><div className="flex items-start gap-3"><BarChart3 className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div></section>
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
