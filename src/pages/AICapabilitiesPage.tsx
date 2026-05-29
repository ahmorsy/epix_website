import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { moduleSpanishText } from './moduleSpanish'
import {
  ArrowRight,
  BarChart3,
  TrendingUp,
  Database,
  Layers,
  DollarSign,
  CheckCircle2,
  ArrowDown,
  LayoutDashboard,
  Eye,
  Shield,
  GitMerge,
} from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'

/* ---------- Three Pillars ---------- */
const pillars = [
  {
    id: 'bi',
    icon: LayoutDashboard,
    color: 'from-[#6d28d9] to-[#4f46e5]',
    bgColor: 'from-[#f5f0ff] to-[#eef2ff]',
    title: { en: 'BI & Executive Dashboards', fr: 'BI & Tableaux De Bord', ar: 'ذكاء الأعمال ولوحات التحكم' },
    subtitle: { en: 'Real-time visibility for every role in your organization', fr: 'Visibilité en temps réel pour chaque rôle', ar: 'رؤية لحظية لكل دور في مؤسستك' },
    desc: {
      en: 'From C-suite strategic overviews to daily operational metrics — EPIX delivers tailored dashboards that give executives the big picture and frontline employees the actionable data they need to perform.',
      fr: "Des vues stratégiques C-suite aux métriques opérationnelles quotidiennes — EPIX livre des tableaux de bord adaptés donnant aux dirigeants la vue d'ensemble et aux employés les données actionnables.",
      ar: 'من النظرة الاستراتيجية للإدارة العليا إلى المقاييس التشغيلية اليومية — EPIX يقدم لوحات تحكم مخصصة تمنح المديرين الصورة الكاملة والموظفين البيانات القابلة للتنفيذ.',
    },
    features: [
      { en: 'Executive KPI dashboards with drill-down', fr: 'Tableaux KPI avec exploration', ar: 'لوحات مؤشرات أداء تنفيذية مع التعمق' },
      { en: 'Role-based views — each user sees what matters to them', fr: 'Vues par rôle — chaque utilisateur voit ce qui compte', ar: 'عروض حسب الدور — كل مستخدم يرى ما يهمه' },
      { en: 'Real-time charts, trends & comparative analysis', fr: 'Graphiques temps réel, tendances et analyses comparatives', ar: 'رسوم بيانية لحظية واتجاهات وتحليل مقارن' },
      { en: 'Custom chart builder — create your own visual reports', fr: 'Constructeur de graphiques personnalisés', ar: 'منشئ رسوم بيانية مخصص — أنشئ تقاريرك المرئية' },
      { en: 'Scheduled reports & automated alerts', fr: 'Rapports planifiés et alertes automatiques', ar: 'تقارير مجدولة وتنبيهات آلية' },
    ],
    screenshots: [
      { src: '/screenshots/93-HR_Dashboard_2026-05-03.png', title: 'Executive HR Dashboard' },
      { src: '/screenshots/5-FA_Dashboard_2026-05-03.png', title: 'Fixed Assets Dashboard' },
      { src: '/screenshots/4-chart-builder.PNG', title: 'Custom Chart Builder' },
      { src: '/screenshots/4-chart-builder2.PNG', title: 'Advanced Analytics' },
    ],
  },
  {
    id: 'data',
    icon: Database,
    color: 'from-[#0ea5a8] to-[#0284c7]',
    bgColor: 'from-[#f0fdfa] to-[#ecfeff]',
    title: { en: 'Cross-Module Data Intelligence', fr: 'Intelligence Données Multi-Modules', ar: 'ذكاء البيانات عبر الوحدات' },
    subtitle: { en: 'Unified data from every module — insights beyond individual silos', fr: 'Données unifiées de chaque module — au-delà des silos', ar: 'بيانات موحدة من كل وحدة — رؤى تتجاوز الصوامع الفردية' },
    desc: {
      en: 'Once EPIX is operational, data flows automatically from GL, AP, AR, Inventory, HR, and all modules into a unified intelligence layer. This gives you a 360° view of your business that goes far beyond what any single module can tell you.',
      fr: "Une fois EPIX opérationnel, les données circulent automatiquement depuis GL, AP, AR, Inventaire, RH vers une couche d'intelligence unifiée. Cela vous donne une vue 360° qui va au-delà de chaque module individuel.",
      ar: 'بمجرد تشغيل EPIX، تتدفق البيانات تلقائياً من دفتر الأستاذ والمدينات والدائنات والمخزون والموارد البشرية إلى طبقة ذكاء موحدة. هذا يمنحك رؤية 360° تتجاوز ما يمكن لأي وحدة فردية إخبارك به.',
    },
    features: [
      { en: 'Automatic data consolidation across all modules', fr: 'Consolidation automatique des données de tous les modules', ar: 'توحيد تلقائي للبيانات عبر جميع الوحدات' },
      { en: 'Cross-functional reporting (Finance × Operations × HR)', fr: 'Reporting transversal (Finance × Opérations × RH)', ar: 'تقارير متعددة الوظائف (مالية × عمليات × موارد بشرية)' },
      { en: 'Customer behavior patterns from transaction history', fr: 'Patterns comportement client depuis l\'historique', ar: 'أنماط سلوك العملاء من تاريخ المعاملات' },
      { en: 'Vendor performance scoring & supply chain insights', fr: 'Scoring performance fournisseurs et chaîne logistique', ar: 'تسجيل أداء الموردين ورؤى سلسلة التوريد' },
      { en: 'Trend analysis with historical data comparison', fr: 'Analyse des tendances avec comparaison historique', ar: 'تحليل الاتجاهات مع مقارنة البيانات التاريخية' },
    ],
    screenshots: [
      { src: '/screenshots/71-payable-volume-summary.PNG', title: 'Payable Volume Analysis' },
      { src: '/screenshots/81-receivable-volume-summary.PNG', title: 'Receivable Insights' },
      { src: '/screenshots/91-inventory-executive-summary-1.PNG', title: 'Inventory Intelligence' },
      { src: '/screenshots/882-eta-top-vendors.PNG', title: 'Vendor Analytics' },
    ],
  },
  {
    id: 'revenue',
    icon: TrendingUp,
    color: 'from-[#16a34a] to-[#059669]',
    bgColor: 'from-[#f0fdf4] to-[#ecfdf5]',
    title: { en: 'Revenue Recognition & Cost Reduction', fr: 'Reconnaissance Revenus & Réduction Coûts', ar: 'الاعتراف بالإيرادات وخفض التكاليف' },
    subtitle: { en: 'Post-implementation consulting to maximize your ROI', fr: 'Consulting post-implémentation pour maximiser votre ROI', ar: 'استشارات ما بعد التنفيذ لتعظيم عائد استثمارك' },
    desc: {
      en: 'After your EPIX system is live and data is flowing, our team works directly with you to identify revenue recognition opportunities, eliminate cost leakages, and optimize financial processes — turning your ERP data into measurable business growth.',
      fr: "Une fois votre système EPIX en production, notre équipe travaille avec vous pour identifier les opportunités de revenus, éliminer les fuites de coûts, et optimiser les processus financiers.",
      ar: 'بعد تشغيل نظام EPIX وتدفق البيانات، يعمل فريقنا معكم مباشرة لتحديد فرص الاعتراف بالإيرادات والقضاء على تسرب التكاليف وتحسين العمليات المالية — تحويل بيانات ERP إلى نمو أعمال قابل للقياس.',
    },
    features: [
      { en: 'Revenue leakage identification & recovery', fr: 'Identification et récupération des fuites de revenus', ar: 'تحديد تسرب الإيرادات واستعادتها' },
      { en: 'Cost center analysis & overhead reduction', fr: 'Analyse centres de coûts et réduction des frais', ar: 'تحليل مراكز التكلفة وخفض النفقات العامة' },
      { en: 'Process optimization based on actual usage data', fr: 'Optimisation processus basée sur données réelles', ar: 'تحسين العمليات بناءً على بيانات الاستخدام الفعلي' },
      { en: 'Compliance-ready revenue recognition (IFRS 15)', fr: 'Reconnaissance revenus conforme (IFRS 15)', ar: 'اعتراف بالإيرادات متوافق مع المعايير (IFRS 15)' },
      { en: 'Ongoing partnership — we grow with your business', fr: 'Partenariat continu — nous grandissons avec vous', ar: 'شراكة مستمرة — ننمو مع أعمالك' },
    ],
    screenshots: [
      { src: '/screenshots/73-payable-aging-summary.PNG', title: 'Aging Analysis' },
      { src: '/screenshots/9-GL-Journals.PNG', title: 'GL Journals' },
      { src: '/screenshots/1-Login.PNG', title: 'Secure Platform' },
    ],
  },
]

/* ---------- How It Works (Journey) ---------- */
const journey = [
  { icon: Shield, label: { en: 'System Implementation', fr: 'Implémentation Système', ar: 'تنفيذ النظام' }, desc: { en: 'Go live with EPIX across all modules', fr: 'Mise en production EPIX sur tous les modules', ar: 'إطلاق EPIX عبر جميع الوحدات' } },
  { icon: Database, label: { en: 'Data Accumulation', fr: 'Accumulation Données', ar: 'تجميع البيانات' }, desc: { en: 'Real operational data flows in automatically', fr: 'Les données réelles affluent automatiquement', ar: 'بيانات تشغيلية حقيقية تتدفق تلقائياً' } },
  { icon: BarChart3, label: { en: 'BI & Dashboards', fr: 'BI & Tableaux', ar: 'ذكاء الأعمال' }, desc: { en: 'Insights surface across every role', fr: 'Insights remontent pour chaque rôle', ar: 'رؤى تظهر عبر كل دور' } },
  { icon: Eye, label: { en: 'Deep Analysis', fr: 'Analyse Profonde', ar: 'تحليل عميق' }, desc: { en: 'Cross-module patterns & opportunities', fr: 'Patterns transversaux et opportunités', ar: 'أنماط وفرص عبر الوحدات' } },
  { icon: DollarSign, label: { en: 'Revenue & Savings', fr: 'Revenus & Économies', ar: 'الإيرادات والتوفير' }, desc: { en: 'Grow revenue, cut waste together', fr: 'Croître les revenus, réduire les coûts', ar: 'زيادة الإيرادات وخفض الهدر معاً' } },
]

/* ---------- Stats ---------- */
const stats = [
  { value: '360°', label: { en: 'Business Visibility', fr: 'Visibilité Business', ar: 'رؤية شاملة للأعمال' } },
  { value: '13+', label: { en: 'Integrated Modules', fr: 'Modules Intégrés', ar: 'وحدة متكاملة' } },
  { value: '100%', label: { en: 'Data Utilization', fr: 'Utilisation Données', ar: 'استخدام البيانات' } },
  { value: '∞', label: { en: 'Custom Reports', fr: 'Rapports Personnalisés', ar: 'تقارير مخصصة' } },
]

/* ---------- Copy ---------- */
const copy = {
  en: {
    backToHome: 'Back To Home',
    heroEyebrow: 'Business Intelligence & Growth',
    heroTitle: 'Your Data.\nYour Insights.\nYour Growth.',
    heroSubtitle: 'From dashboards to revenue — EPIX turns operational data into business results.',
    heroDesc: 'EPIX is more than an ERP. Once implemented, it becomes a platform for business intelligence, cross-module analytics, and a foundation for revenue growth and cost optimization — with our team working alongside yours.',
    heroCta: 'Book A Consultation',
    journeyTitle: 'The EPIX Journey',
    journeySubtitle: 'From implementation to measurable business growth — a clear path forward.',
    ctaTitle: 'Ready To Unlock Your Data\'s Potential?',
    ctaDesc: 'Let\'s discuss how EPIX can deliver dashboards, cross-module intelligence, and a roadmap to revenue recognition and cost reduction for your business.',
    ctaButton: 'Book A Consultation',
    ctaSecondary: 'Contact Our Team',
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    heroEyebrow: 'Intelligence Business & Croissance',
    heroTitle: 'Vos Données.\nVos Insights.\nVotre Croissance.',
    heroSubtitle: 'Des tableaux de bord aux revenus — EPIX transforme les données en résultats.',
    heroDesc: "EPIX est plus qu'un ERP. Une fois implémenté, il devient une plateforme d'intelligence, d'analytique multi-modules, et un fondement pour la croissance — avec notre équipe à vos côtés.",
    heroCta: 'Réserver Une Consultation',
    journeyTitle: 'Le Parcours EPIX',
    journeySubtitle: "De l'implémentation à la croissance mesurable — un chemin clair.",
    ctaTitle: 'Prêt À Libérer Le Potentiel De Vos Données?',
    ctaDesc: "Discutons comment EPIX peut livrer des tableaux de bord, une intelligence multi-modules et une feuille de route vers l'optimisation.",
    ctaButton: 'Réserver Une Consultation',
    ctaSecondary: "Contacter L'Équipe",
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    heroEyebrow: 'ذكاء الأعمال والنمو',
    heroTitle: 'بياناتك.\nرؤاك.\nنموك.',
    heroSubtitle: 'من لوحات التحكم إلى الإيرادات — EPIX يحول البيانات التشغيلية إلى نتائج أعمال.',
    heroDesc: 'EPIX أكثر من نظام ERP. بمجرد تنفيذه، يصبح منصة لذكاء الأعمال والتحليلات عبر الوحدات وأساساً لنمو الإيرادات وتحسين التكاليف — مع فريقنا يعمل جنباً إلى جنب مع فريقك.',
    heroCta: 'احجز استشارة',
    journeyTitle: 'رحلة EPIX',
    journeySubtitle: 'من التنفيذ إلى نمو الأعمال القابل للقياس — مسار واضح للأمام.',
    ctaTitle: 'مستعد لإطلاق إمكانات بياناتك؟',
    ctaDesc: 'لنناقش كيف يمكن لـ EPIX تقديم لوحات التحكم والذكاء عبر الوحدات وخارطة طريق للاعتراف بالإيرادات وخفض التكاليف.',
    ctaButton: 'احجز استشارة',
    ctaSecondary: 'تواصل مع فريقنا',
    close: 'إغلاق',
  },
}

const copyEs: typeof copy.en = {
  backToHome: 'Volver al inicio',
  heroEyebrow: 'Inteligencia de negocio y crecimiento',
  heroTitle: 'Tus Datos.\nTus Insights.\nTu Crecimiento.',
  heroSubtitle: 'De tableros a ingresos: EPIX convierte datos operativos en resultados.',
  heroDesc: 'EPIX es más que un ERP. Tras su implementación, se convierte en una plataforma de inteligencia, analítica entre módulos y base para crecer con control de costos.',
  heroCta: 'Reservar una consultoría',
  journeyTitle: 'El camino EPIX',
  journeySubtitle: 'De la implementación al crecimiento medible.',
  ctaTitle: '¿Listo para desbloquear el potencial de tus datos?',
  ctaDesc: 'Conversemos cómo EPIX puede entregar tableros, inteligencia entre módulos y una hoja de ruta de crecimiento para tu negocio.',
  ctaButton: 'Reservar una consultoría',
  ctaSecondary: 'Contactar al equipo',
  close: 'Cerrar',
}
export function AICapabilitiesPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null)
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? copyEs : copy[contentLang]
  const tr = (value: string) => (lang === 'es' ? moduleSpanishText(value) : value)
  const pick = (value: { en: string; fr: string; ar: string }) => (lang === 'es' ? moduleSpanishText(value.en) : value[contentLang])

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <section className="ai-page-hero relative overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <a href={`/?lang=${lang}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
            <ArrowRight size={14} className="rotate-180" />
            {t.backToHome}
          </a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-5xl"
          >
            <img src="/EPIX.png" alt="EPIX" className="mb-6 h-32 w-auto md:h-36 drop-shadow-md" />
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c5d8ff] bg-gradient-to-r from-[#edf3ff] to-[#f0e8ff] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#6d28d9]">
              <BarChart3 size={12} />
              {t.heroEyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl whitespace-pre-line">
              {t.heroTitle}
            </h1>
            <p className="mt-4 font-display text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#0ea5a8] md:text-2xl">
              {t.heroSubtitle}
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              {t.heroDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`/?lang=${lang}#contact`} className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold">
                {t.heroCta}
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          >
            {stats.map((s) => (
              <div key={s.value} className="ai-stat-card rounded-2xl border border-[#d7e5ff]/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm">
                <div className="font-display text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#1d5df2] md:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{pick(s.label)}</div>
              </div>
            ))}
          </motion.div>

          {/* Hero visual - dashboard screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5"
          >
            <button type="button" onClick={() => setSelected({ src: '/screenshots/93-HR_Dashboard_2026-05-03.png', title: tr('Executive Dashboard') })} className="col-span-2 md:col-span-1 md:row-span-2 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">
              <img src="/screenshots/93-HR_Dashboard_2026-05-03.png" alt={tr('Executive Dashboard')} className="h-full w-full object-cover object-top" loading="eager" />
            </button>
            <button type="button" onClick={() => setSelected({ src: '/screenshots/4-chart-builder.PNG', title: tr('Custom Chart Builder') })} className="overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">
              <img src="/screenshots/4-chart-builder.PNG" alt={tr('Chart Builder')} className="h-full w-full object-cover object-top" loading="eager" />
            </button>
            <button type="button" onClick={() => setSelected({ src: '/screenshots/5-FA_Dashboard_2026-05-03.png', title: tr('Assets Dashboard') })} className="overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">
              <img src="/screenshots/5-FA_Dashboard_2026-05-03.png" alt={tr('Assets Dashboard')} className="h-full w-full object-cover object-top" loading="eager" />
            </button>
            <button type="button" onClick={() => setSelected({ src: '/screenshots/4-chart-builder2.PNG', title: tr('Advanced Analytics') })} className="overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">
              <img src="/screenshots/4-chart-builder2.PNG" alt={tr('Advanced Analytics')} className="h-full w-full object-cover object-top" loading="eager" />
            </button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
              <span>{lang === 'ar' ? 'مرر للاستكشاف' : lang === 'fr' ? 'Défiler pour explorer' : lang === 'es' ? 'Desliza para explorar' : 'Scroll to explore'}</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowDown size={16} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

          {/* SECTION 2: THE THREE PILLARS */}
      {pillars.map((pillar, pIdx) => {
        const Icon = pillar.icon
        const isEven = pIdx % 2 === 0
        return (
          <section
            key={pillar.id}
            className={`relative overflow-hidden py-20 md:py-28 ${isEven ? '' : 'ai-pipeline-section'}`}
          >
            <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl"
              >
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${pillar.color} text-white shadow-lg`}>
                  <Icon size={26} />
                </div>
                <span className="mt-5 block text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {lang === 'ar' ? `الركيزة ${pIdx + 1}` : lang === 'fr' ? `Pilier ${pIdx + 1}` : lang === 'es' ? `Pilar ${pIdx + 1}` : `Pillar ${pIdx + 1}`}
                </span>
                <h2 className="mt-2 font-display text-3xl font-extrabold md:text-5xl">{pick(pillar.title)}</h2>
                <p className="mt-2 font-display text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6d28d9] to-[#0ea5a8]">{pick(pillar.subtitle)}</p>
                <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)] md:text-lg">{pick(pillar.desc)}</p>
              </motion.div>

              {/* Content grid: features + screenshots */}
              <div className="mt-12 grid gap-10 lg:grid-cols-2">
                {/* Features list */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-col justify-center"
                >
                  <ul className="space-y-4">
                    {pillar.features.map((f, fIdx) => (
                      <motion.li
                        key={fIdx}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fIdx * 0.07 + 0.2 }}
                        className="ai-usecase-card flex items-start gap-4 rounded-xl border border-[var(--line)] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#b8a8ff] hover:shadow-md"
                      >
                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${pillar.bgColor}`}>
                          <CheckCircle2 size={16} className="text-[#6d28d9]" />
                        </div>
                        <span className="text-sm font-medium leading-relaxed text-[var(--text)]">{pick(f)}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Screenshots grid */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {pillar.screenshots.map((shot, sIdx) => (
                    <motion.button
                      key={sIdx}
                      type="button"
                      onClick={() => setSelected(shot)}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: sIdx * 0.08 + 0.3 }}
                      className={`ai-capability-card group overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${sIdx === 0 && pillar.screenshots.length > 3 ? 'col-span-2' : ''}`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <img
                          src={shot.src}
                          alt={shot.title}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute bottom-2 left-3 right-3 text-left text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 drop-shadow">
                          {shot.title}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        )
      })}

          {/* SECTION 3: JOURNEY / FLOW */}
      <section className="ai-diff-section relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#f3eeff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#6d28d9]">
              <GitMerge size={12} /> {lang === 'ar' ? 'مسارك القادم' : lang === 'fr' ? 'Votre parcours' : lang === 'es' ? 'Tu camino a seguir' : 'Your Path Forward'}
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{t.journeyTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.journeySubtitle}</p>
          </motion.div>

          {/* Journey flow */}
          <div className="ai-pipeline-flow mt-16 flex flex-col items-center gap-0 md:flex-row md:justify-between">
            {journey.map((step, idx) => {
              const StepIcon = step.icon
              return (
                <div key={step.label.en} className="ai-pipeline-node flex flex-col items-center md:flex-1">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.12 + 0.2, type: 'spring', stiffness: 200 }}
                    className="ai-pipeline-circle relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#6d28d9] to-[#1d5df2] text-white shadow-lg"
                    style={{ width: '4.5rem', height: '4.5rem' }}
                  >
                    <StepIcon size={26} />
                    <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#6d28d9] shadow-sm ring-2 ring-[#e4d7ff]">
                      {idx + 1}
                    </span>
                  </motion.div>
                  <span className="mt-3 text-center text-sm font-bold text-[var(--text)]">{pick(step.label)}</span>
                  <span className="mt-1 max-w-[150px] text-center text-xs text-[var(--text-muted)]">{pick(step.desc)}</span>
                  {idx < journey.length - 1 && (
                    <div className="my-3 h-8 w-0.5 bg-gradient-to-b from-[#6d28d9] to-[#1d5df2] opacity-40 md:hidden" />
                  )}
                </div>
              )
            })}
          </div>

          {/* Journey emphasis cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3"
          >
            <div className="ai-diff-card rounded-2xl border border-[var(--line)] bg-white p-6 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f5f0ff] to-[#eef2ff] text-[#6d28d9]">
                <LayoutDashboard size={22} />
              </div>
              <h4 className="mt-3 font-display text-sm font-bold">{lang === 'ar' ? 'رؤية فورية' : lang === 'fr' ? 'Visibilité Immédiate' : lang === 'es' ? 'Visibilidad inmediata' : 'Immediate Visibility'}</h4>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{lang === 'ar' ? 'لوحات تحكم تعمل من اليوم الأول' : lang === 'fr' ? 'Tableaux de bord dès le jour 1' : lang === 'es' ? 'Tableros operativos desde el primer día' : 'Dashboards working from day one'}</p>
            </div>
            <div className="ai-diff-card rounded-2xl border border-[var(--line)] bg-white p-6 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0fdfa] to-[#ecfeff] text-[#0ea5a8]">
                <Layers size={22} />
              </div>
              <h4 className="mt-3 font-display text-sm font-bold">{lang === 'ar' ? 'بيانات متكاملة' : lang === 'fr' ? 'Données Unifiées' : lang === 'es' ? 'Datos unificados' : 'Unified Data'}</h4>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{lang === 'ar' ? 'تحليلات عبر جميع الوحدات' : lang === 'fr' ? 'Analytics multi-modules' : lang === 'es' ? 'Analítica entre módulos conforme crecen los datos' : 'Cross-module analytics as data grows'}</p>
            </div>
            <div className="ai-diff-card rounded-2xl border border-[var(--line)] bg-white p-6 text-center">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#f0fdf4] to-[#ecfdf5] text-[#16a34a]">
                <TrendingUp size={22} />
              </div>
              <h4 className="mt-3 font-display text-sm font-bold">{lang === 'ar' ? 'نمو مستمر' : lang === 'fr' ? 'Croissance Continue' : lang === 'es' ? 'Crecimiento continuo' : 'Continuous Growth'}</h4>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{lang === 'ar' ? 'شراكتنا تنمو مع أعمالك' : lang === 'fr' ? 'Notre partenariat grandit avec vous' : lang === 'es' ? 'Nuestra alianza escala con tu negocio' : 'Our partnership scales with your business'}</p>
            </div>
          </motion.div>
        </div>
      </section>

          {/* SECTION 4: CTA */}
      <section className="ai-cta-section relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-5 text-center md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-muted)] md:text-base">{t.ctaDesc}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`/?lang=${lang}#contact`} className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold shadow-lg">
                {t.ctaButton}
                <ArrowRight size={16} />
              </a>
              <a href={`/?lang=${lang}#contact`} className="hero-cta-secondary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold">
                {t.ctaSecondary}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'ar' ? 'لوحات تحكم تنفيذية' : lang === 'fr' ? 'Tableaux Exécutifs' : lang === 'es' ? 'Tableros ejecutivos' : 'Executive Dashboards'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'ar' ? 'بيانات عبر الوحدات' : lang === 'fr' ? 'Données Multi-Modules' : lang === 'es' ? 'Datos entre módulos' : 'Cross-Module Data'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'ar' ? 'تحسين الإيرادات' : lang === 'fr' ? 'Optimisation Revenus' : lang === 'es' ? 'Optimización de ingresos' : 'Revenue Optimization'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'ar' ? 'خفض التكاليف' : lang === 'fr' ? 'Réduction Coûts' : lang === 'es' ? 'Reducción de costos' : 'Cost Reduction'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€â”€ Image Modal â”€â”€â”€ */}
      {selected && (
        <AccessibleImageModal
          open={Boolean(selected)}
          onClose={() => setSelected(null)}
          title={selected.title}
          imageSrc={selected.src}
          imageAlt={selected.title}
          closeLabel={t.close}
        />
      )}
    </div>
  )
}
