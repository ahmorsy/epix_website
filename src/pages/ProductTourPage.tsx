import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import {
  ArrowRight,
  Play,
  Monitor,
  Database,
  Shield,
  Zap,
  BarChart3,
  Users,
  FileText,
  Package,
  DollarSign,
  CheckCircle2,
  Layers,
  Globe2,
  Lock,
  ArrowDown,
} from 'lucide-react'

type Lang = 'en' | 'fr' | 'ar'
type Localized = { en: string; fr: string; ar: string }

/* ---------- Tour Steps ---------- */
const tourSteps = [
  {
    id: 'login',
    icon: Lock,
    title: { en: 'Secure Login And Access', fr: 'Connexion Securisee', ar: 'تسجيل دخول آمن' },
    desc: {
      en: 'Multi-factor authentication, role-based access control, and session governance ensure every user enters a secure, personalized workspace.',
      fr: 'Authentification multi-facteur, controle d\'acces par role et gestion des sessions pour un espace securise.',
      ar: 'مصادقة متعددة العوامل وتحكم بالوصول حسب الدور وإدارة الجلسات لضمان بيئة عمل آمنة.',
    },
    screenshot: '/screenshots/1-Login.PNG',
    badge: 'Step 1',
  },
  {
    id: 'dashboard',
    icon: Monitor,
    title: { en: 'Personalized Dashboard', fr: 'Tableau De Bord Personnalise', ar: 'لوحة تحكم مخصصة' },
    desc: {
      en: 'Role-aware widgets, real-time KPIs, and quick-action shortcuts greet each user with exactly what they need to start their day.',
      fr: 'Widgets adaptes au role, KPIs en temps reel et raccourcis d\'action rapide pour demarrer efficacement.',
      ar: 'أدوات حسب الدور ومؤشرات أداء فورية واختصارات عمل سريعة لبدء يومك بكفاءة.',
    },
    screenshot: '/screenshots/2-home-page.PNG',
    badge: 'Step 2',
  },
  {
    id: 'data',
    icon: Database,
    title: { en: 'Master Data Governance', fr: 'Gouvernance Des Donnees', ar: 'حوكمة البيانات الرئيسية' },
    desc: {
      en: 'Centralized master records with advanced grid editing, bulk operations, inline validation, and full audit trail for every change.',
      fr: 'Enregistrements centralises avec edition avancee, operations groupees, validation et audit complet.',
      ar: 'سجلات رئيسية مركزية مع تحرير شبكي متقدم وعمليات مجمعة ومسار تدقيق كامل.',
    },
    screenshot: '/screenshots/3-grid-data.PNG',
    badge: 'Step 3',
  },
  {
    id: 'transactions',
    icon: FileText,
    title: { en: 'Transaction Processing', fr: 'Traitement Des Transactions', ar: 'معالجة المعاملات' },
    desc: {
      en: 'From journal entries to purchase orders, every transaction flows through approval workflows, automatic validations, and real-time posting.',
      fr: 'Des ecritures comptables aux bons de commande, chaque transaction suit un workflow d\'approbation et de validation.',
      ar: 'من القيود المحاسبية إلى أوامر الشراء، كل معاملة تمر عبر مسارات موافقة وتحقق تلقائي.',
    },
    screenshot: '/screenshots/9-GL-Journals.PNG',
    badge: 'Step 4',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: { en: 'Analytics And Chart Builder', fr: 'Analytique Et Generateur De Graphiques', ar: 'التحليلات ومنشئ الرسوم البيانية' },
    desc: {
      en: 'Drag-and-drop chart builder, customizable dashboards, drill-down capabilities, and exportable reports for data-driven decisions.',
      fr: 'Generateur de graphiques glisser-deposer, tableaux de bord personnalisables et rapports exportables.',
      ar: 'منشئ رسوم بيانية بالسحب والإفلات ولوحات تحكم قابلة للتخصيص وتقارير قابلة للتصدير.',
    },
    screenshot: '/screenshots/4-chart-builder.PNG',
    badge: 'Step 5',
  },
  {
    id: 'reporting',
    icon: BarChart3,
    title: { en: 'Executive Summaries And KPIs', fr: 'Resumes Executifs Et KPIs', ar: 'ملخصات تنفيذية ومؤشرات أداء' },
    desc: {
      en: 'Pre-built executive dashboards for payables, receivables, inventory health, and workforce metrics with aging analysis and trend detection.',
      fr: 'Tableaux de bord executifs pre-construits pour les dettes, creances, stocks et indicateurs RH.',
      ar: 'لوحات تحكم تنفيذية جاهزة للمدفوعات والمقبوضات والمخزون ومقاييس القوى العاملة.',
    },
    screenshot: '/screenshots/71-payable-volume-summary.PNG',
    badge: 'Step 6',
  },
]

/* ---------- E2E Business Flow ---------- */
const e2eFlow = [
  { label: { en: 'Requisition', fr: 'Demande', ar: 'طلب شراء' }, icon: FileText },
  { label: { en: 'Purchase Order', fr: 'Bon Commande', ar: 'أمر شراء' }, icon: Package },
  { label: { en: 'Goods Receipt', fr: 'Reception', ar: 'استلام البضاعة' }, icon: Package },
  { label: { en: 'Invoice Match', fr: 'Rapprochement', ar: 'مطابقة الفاتورة' }, icon: FileText },
  { label: { en: 'Payment', fr: 'Paiement', ar: 'الدفع' }, icon: DollarSign },
  { label: { en: 'GL Posting', fr: 'Comptabilisation', ar: 'ترحيل محاسبي' }, icon: Database },
  { label: { en: 'Reports', fr: 'Rapports', ar: 'التقارير' }, icon: BarChart3 },
]

/* ---------- Differentiators ---------- */
const differentiators = [
  {
    icon: Database,
    title: { en: 'Unified Data Model', fr: 'Modele De Donnees Unifie', ar: 'نموذج بيانات موحد' },
    desc: { en: 'All modules share one database. No data silos, no sync errors, no duplication.', fr: 'Tous les modules partagent une base. Zero silos, zero erreurs de synchro.', ar: 'كل الوحدات تشارك قاعدة بيانات واحدة. لا عزل بيانات ولا أخطاء مزامنة.' },
  },
  {
    icon: Globe2,
    title: { en: 'Multi-Company And Multi-Currency', fr: 'Multi-Societe Et Multi-Devise', ar: 'متعدد الشركات والعملات' },
    desc: { en: 'Switch between companies instantly. Full currency conversion with real-time rates.', fr: 'Basculez entre societes instantanement. Conversion devise en temps reel.', ar: 'انتقل بين الشركات فوراً. تحويل عملات بأسعار لحظية.' },
  },
  {
    icon: Shield,
    title: { en: 'Complete Audit Trail', fr: 'Piste D\'Audit Complète', ar: 'مسار تدقيق كامل' },
    desc: { en: 'Every action timestamped, every change tracked. Full accountability at field level.', fr: 'Chaque action horodatee, chaque modification tracee. Responsabilite totale.', ar: 'كل إجراء مؤرخ وكل تغيير متتبع. مساءلة كاملة على مستوى الحقل.' },
  },
  {
    icon: Users,
    title: { en: 'Role-Based Access Control', fr: 'Controle D\'Acces Par Role', ar: 'تحكم بالوصول حسب الدور' },
    desc: { en: 'Granular permissions down to field level. Users see only what they need.', fr: 'Permissions granulaires au niveau du champ. Acces minimum necessaire.', ar: 'صلاحيات دقيقة حتى مستوى الحقل. المستخدم يرى فقط ما يحتاجه.' },
  },
  {
    icon: Zap,
    title: { en: 'Workflow Engine', fr: 'Moteur De Workflow', ar: 'محرك سير العمل' },
    desc: { en: 'Configurable approval chains, escalation rules, and SLA monitoring built in.', fr: 'Chaines d\'approbation configurables, regles d\'escalade et suivi des SLAs.', ar: 'سلاسل موافقة قابلة للتكوين وقواعد تصعيد ومراقبة اتفاقيات الخدمة.' },
  },
  {
    icon: Layers,
    title: { en: 'Modular Architecture', fr: 'Architecture Modulaire', ar: 'بنية معيارية' },
    desc: { en: 'Activate only what you need. Scale from 3 users to 3,000 without rearchitecting.', fr: 'Activez uniquement ce dont vous avez besoin. Evolutif de 3 a 3000 utilisateurs.', ar: 'فعّل ما تحتاجه فقط. تدرج من 3 مستخدمين إلى 3000 دون إعادة هيكلة.' },
  },
]

/* ---------- Module Highlights for tour ---------- */
const moduleHighlights = [
  { name: { en: 'Accounts Payable', fr: 'Comptes Fournisseurs', ar: 'الذمم الدائنة' }, screenshot: '/screenshots/71-payable-volume-summary.PNG', slug: '/modules/accounts-payable' },
  { name: { en: 'Accounts Receivable', fr: 'Comptes Clients', ar: 'الذمم المدينة' }, screenshot: '/screenshots/81-receivable-volume-summary.PNG', slug: '/modules/accounts-receivable' },
  { name: { en: 'General Ledger', fr: 'Grand Livre', ar: 'دفتر الأستاذ' }, screenshot: '/screenshots/9-GL-Journals.PNG', slug: '/modules/general-ledger' },
  { name: { en: 'Fixed Assets', fr: 'Immobilisations', ar: 'الأصول الثابتة' }, screenshot: '/screenshots/5-FA_Dashboard_2026-05-03.png', slug: '/modules/fixed-assets' },
  { name: { en: 'Human Resources', fr: 'Ressources Humaines', ar: 'الموارد البشرية' }, screenshot: '/screenshots/93-HR_Dashboard_2026-05-03.png', slug: '/modules/human-resources' },
  { name: { en: 'Inventory', fr: 'Gestion Stocks', ar: 'المخزون' }, screenshot: '/screenshots/91-inventory-executive-summary-1.PNG', slug: '/modules/inventory-management' },
]

/* ---------- Copy ---------- */
const copy = {
  en: {
    backToHome: 'Back To Home',
    heroEyebrow: 'Product Tour',
    heroTitle: 'See How EPIX Transforms Your Operations',
    heroDesc: 'Walk through the complete EPIX experience — from login to executive reporting. Discover how each layer of the platform connects to deliver a seamless, professional ERP environment.',
    heroCta: 'Book A Live Demo',
    stepsTitle: 'Your Journey Through EPIX',
    stepsSubtitle: 'Each step reveals how the platform serves your team with precision and clarity.',
    flowTitle: 'End-To-End Business Flow',
    flowSubtitle: 'One transaction flows seamlessly across the entire platform — no exports, no re-entry, no gaps.',
    diffTitle: 'What Makes EPIX Different',
    diffSubtitle: 'Built from the ground up for professional teams who demand reliability, transparency, and speed.',
    modulesTitle: 'Explore The Modules',
    modulesSubtitle: 'Deep-dive into each domain. Click any module to see capabilities, flows, and outcomes.',
    ctaTitle: 'Ready To Experience EPIX?',
    ctaDesc: 'Schedule a personalized demo with our team and see how EPIX fits your business.',
    ctaButton: 'Book A Live Demo',
    ctaSecondary: 'Contact Sales',
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    heroEyebrow: 'Visite Guidee',
    heroTitle: 'Decouvrez Comment EPIX Transforme Vos Operations',
    heroDesc: 'Parcourez l\'experience EPIX complete — de la connexion aux rapports executifs. Chaque couche de la plateforme connectee pour un ERP professionnel.',
    heroCta: 'Reserver Une Demo',
    stepsTitle: 'Votre Parcours Dans EPIX',
    stepsSubtitle: 'Chaque etape revele comment la plateforme sert votre equipe avec precision.',
    flowTitle: 'Flux Metier De Bout En Bout',
    flowSubtitle: 'Une transaction traverse la plateforme sans export, sans re-saisie, sans lacune.',
    diffTitle: 'Ce Qui Rend EPIX Different',
    diffSubtitle: 'Concu pour les equipes qui exigent fiabilite, transparence et rapidite.',
    modulesTitle: 'Explorez Les Modules',
    modulesSubtitle: 'Plongez dans chaque domaine. Cliquez un module pour voir capacites et resultats.',
    ctaTitle: 'Pret A Decouvrir EPIX?',
    ctaDesc: 'Planifiez une demo personnalisee et voyez comment EPIX s\'adapte a votre entreprise.',
    ctaButton: 'Reserver Une Demo',
    ctaSecondary: 'Contacter L\'Equipe',
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    heroEyebrow: 'جولة المنتج',
    heroTitle: 'اكتشف كيف يحوّل EPIX عملياتك',
    heroDesc: 'تجول في تجربة EPIX الكاملة — من تسجيل الدخول إلى التقارير التنفيذية. اكتشف كيف تتصل كل طبقة من المنصة لتقديم بيئة ERP احترافية سلسة.',
    heroCta: 'احجز عرضاً مباشراً',
    stepsTitle: 'رحلتك عبر EPIX',
    stepsSubtitle: 'كل خطوة تكشف كيف تخدم المنصة فريقك بدقة ووضوح.',
    flowTitle: 'تدفق الأعمال من البداية للنهاية',
    flowSubtitle: 'معاملة واحدة تتدفق عبر المنصة بالكامل — بدون تصدير أو إعادة إدخال أو فجوات.',
    diffTitle: 'ما يميز EPIX',
    diffSubtitle: 'مصمم من الأساس للفرق المحترفة التي تتطلب الموثوقية والشفافية والسرعة.',
    modulesTitle: 'استكشف الوحدات',
    modulesSubtitle: 'تعمق في كل مجال. انقر على أي وحدة لرؤية القدرات والتدفقات والنتائج.',
    ctaTitle: 'مستعد لتجربة EPIX؟',
    ctaDesc: 'جدولة عرض مخصص مع فريقنا وشاهد كيف يتناسب EPIX مع عملك.',
    ctaButton: 'احجز عرضاً مباشراً',
    ctaSecondary: 'تواصل مع المبيعات',
    close: 'إغلاق',
  },
}

/* ---------- Component ---------- */
export function ProductTourPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null)
  const t = copy[lang]

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      {/* ─── Tour Hero ─── */}
      <section className="tour-hero relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <a href={`/?lang=${lang}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
            <ArrowRight size={14} className="rotate-180" />
            {t.backToHome}
          </a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-4xl"
          >
            <img src="/EPIX.png" alt="EPIX" className="mb-6 h-16 w-auto md:h-20" />
            <span className="tour-eyebrow inline-flex items-center gap-2 rounded-full border border-[#c5d8ff] bg-gradient-to-r from-[#edf3ff] to-[#e8f8f8] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1d5df2]">
              <Play size={12} fill="currentColor" />
              {t.heroEyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">
              {t.heroDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/?lang=${lang}#contact" className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold">
                {t.heroCta}
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>

          {/* Hero visual - screenshot mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="tour-mosaic mt-12 grid grid-cols-3 gap-3 md:gap-4"
          >
            <div className="col-span-2 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl">
              <img src="/screenshots/2-home-page.PNG" alt="EPIX Dashboard" className="h-full w-full object-cover object-top" loading="eager" />
            </div>
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex-1 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
                <img src="/screenshots/4-chart-builder.PNG" alt="Chart Builder" className="h-full w-full object-cover object-top" loading="eager" />
              </div>
              <div className="flex-1 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
                <img src="/screenshots/93-HR_Dashboard_2026-05-03.png" alt="HR Dashboard" className="h-full w-full object-cover object-top" loading="eager" />
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex flex-col items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
              <span>Scroll to explore</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowDown size={16} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Step-by-Step Tour ─── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t.stepsTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.stepsSubtitle}</p>
        </motion.div>

        <div className="tour-steps-grid mt-14 space-y-8 md:space-y-0">
          {tourSteps.map((step, idx) => {
            const Icon = step.icon
            const isEven = idx % 2 === 0
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`tour-step-card group grid items-center gap-6 md:grid-cols-2 md:gap-10 ${!isEven ? 'md:[direction:rtl]' : ''}`}
              >
                {/* Text side */}
                <div className={`space-y-4 ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-white shadow-md">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-xs font-bold text-[#1d5df2]">{step.badge}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold md:text-3xl">{step.title[lang]}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{step.desc[lang]}</p>
                </div>

                {/* Screenshot side */}
                <div className={`tour-step-screenshot relative overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02] ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setSelected({ src: step.screenshot, title: step.title[lang] })}
                    className="block w-full"
                  >
                    <img
                      src={step.screenshot}
                      alt={step.title[lang]}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-t from-[#0f2345]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── End-to-End Flow Diagram ─── */}
      <section className="tour-flow-section relative overflow-hidden py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t.flowTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.flowSubtitle}</p>
          </motion.div>

          {/* Flow pipeline - horizontal on desktop, vertical on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="tour-e2e-flow mt-12 flex flex-col items-center gap-0 md:flex-row md:justify-between"
          >
            {e2eFlow.map((node, idx) => {
              const Icon = node.icon
              return (
                <div key={node.label.en} className="tour-e2e-node flex flex-col items-center md:flex-1">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, type: 'spring', stiffness: 200 }}
                    className="tour-e2e-circle relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-white shadow-lg md:h-20 md:w-20"
                  >
                    <Icon size={24} />
                    <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[#1d5df2] shadow-sm ring-2 ring-[#d7e5ff]">
                      {idx + 1}
                    </span>
                  </motion.div>
                  <span className="mt-3 text-center text-xs font-semibold text-[var(--text)] md:text-sm">{node.label[lang]}</span>
                  {/* Connector arrow (not on last) */}
                  {idx < e2eFlow.length - 1 && (
                    <div className="tour-e2e-connector my-2 h-6 w-0.5 bg-gradient-to-b from-[#1d5df2] to-[#0ea5a8] md:hidden" />
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* Horizontal connectors for desktop */}
          <div className="tour-e2e-connectors pointer-events-none absolute inset-x-0 top-1/2 hidden md:block" aria-hidden="true">
            <div className="mx-auto h-0.5 max-w-5xl bg-gradient-to-r from-[#1d5df2] via-[#0ea5a8] to-[#1d5df2] opacity-30" />
          </div>

          {/* Supporting screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl"
          >
            <img
              src="/screenshots/72-payable-outstanding-summary.PNG"
              alt="End-to-end flow result"
              loading="lazy"
              decoding="async"
              className="w-full object-cover object-top"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── Differentiators ─── */}
      <section className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t.diffTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.diffSubtitle}</p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon
            return (
              <motion.div
                key={diff.title.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="tour-diff-card group rounded-2xl border border-[var(--line)] bg-white p-6 transition-all duration-300 hover:border-[#a8c4ff] hover:shadow-xl"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#edf3ff] to-[#e8f8f8] text-[#1d5df2] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{diff.title[lang]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{diff.desc[lang]}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ─── Module Highlights ─── */}
      <section className="tour-modules-section py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t.modulesTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.modulesSubtitle}</p>
          </motion.div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {moduleHighlights.map((mod, idx) => (
              <motion.a
                key={mod.slug}
                href={`${mod.slug}?lang=${lang}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="tour-module-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition-all duration-300 hover:border-[#a8c4ff] hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]">
                  <img
                    src={mod.screenshot}
                    alt={mod.name[lang]}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a1e3d]/50 to-transparent" />
                </div>
                <div className="flex items-center justify-between p-5">
                  <h3 className="font-display text-lg font-bold">{mod.name[lang]}</h3>
                  <ArrowRight size={16} className="text-[var(--brand)] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="tour-cta-section relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto w-full max-w-4xl px-5 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">{t.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-[var(--text-muted)] md:text-base">{t.ctaDesc}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/#contact" className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold">
                {t.ctaButton}
                <ArrowRight size={16} />
              </a>
              <a href="/#contact" className="hero-cta-secondary inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold">
                {t.ctaSecondary}
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> SOC 2 Ready</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> 99.9% Uptime</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> Enterprise Grade</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> Multi-Region</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Image Modal ─── */}
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
