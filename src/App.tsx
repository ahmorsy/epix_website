import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { InView } from 'react-intersection-observer'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  Cloud,
  Factory,
  Globe2,
  Menu,
  ShieldCheck,
  X,
} from 'lucide-react'
import { AccessibleImageModal } from './components/AccessibleImageModal'
import emailjs from '@emailjs/browser'
import { RouteLoadingState } from './components/RouteLoadingState'
import { moduleCatalog } from './pages/moduleCatalog'
import { moduleSpanishText } from './pages/moduleSpanish'

const AccountsPayablePage = lazy(() => import('./pages/AccountsPayablePage').then((m) => ({ default: m.AccountsPayablePage })))
const AccountsReceivablePage = lazy(() => import('./pages/AccountsReceivablePage').then((m) => ({ default: m.AccountsReceivablePage })))
const BusinessMastersPage = lazy(() => import('./pages/BusinessMastersPage').then((m) => ({ default: m.BusinessMastersPage })))
const CarInspectionPage = lazy(() => import('./pages/CarInspectionPage').then((m) => ({ default: m.CarInspectionPage })))
const CashManagementPage = lazy(() => import('./pages/CashManagementPage').then((m) => ({ default: m.CashManagementPage })))
const DiscreteManufacturingPage = lazy(() => import('./pages/DiscreteManufacturingPage').then((m) => ({ default: m.DiscreteManufacturingPage })))
const FixedAssetsPage = lazy(() => import('./pages/FixedAssetsPage').then((m) => ({ default: m.FixedAssetsPage })))
const GeneralLedgerPage = lazy(() => import('./pages/GeneralLedgerPage').then((m) => ({ default: m.GeneralLedgerPage })))
const HumanResourcesPage = lazy(() => import('./pages/HumanResourcesPage').then((m) => ({ default: m.HumanResourcesPage })))
const InventoryManagementPage = lazy(() => import('./pages/InventoryManagementPage').then((m) => ({ default: m.InventoryManagementPage })))
const PettyCashPage = lazy(() => import('./pages/PettyCashPage').then((m) => ({ default: m.PettyCashPage })))
const ProcureToPayPage = lazy(() => import('./pages/ProcureToPayPage').then((m) => ({ default: m.ProcureToPayPage })))
const ShipmentManagementPage = lazy(() => import('./pages/ShipmentManagementPage').then((m) => ({ default: m.ShipmentManagementPage })))
const ProductTourPage = lazy(() => import('./pages/ProductTourPage').then((m) => ({ default: m.ProductTourPage })))
const AICapabilitiesPage = lazy(() => import('./pages/AICapabilitiesPage').then((m) => ({ default: m.AICapabilitiesPage })))

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type LocalizedText = { en: string; fr: string; ar: string; es?: string }

type NavItem = { id: string; label: LocalizedText }

type IndustryItem = {
  title: LocalizedText
  icon: ComponentType<{ size?: string | number }>
  text: LocalizedText
}

type StatItem = {
  label: LocalizedText
  value: number
  suffix: string
}

type ScreenshotItem = {
  src: string
  title: string
  module: string
  caption: string
}

type SmartFlowStep = {
  id: string
  screenshotSrc: string
  kpi: string
  title: LocalizedText
  detail: LocalizedText
}

type SmartFlow = {
  id: string
  title: LocalizedText
  subtitle: LocalizedText
  headline: LocalizedText
  steps: SmartFlowStep[]
}

const navItems: NavItem[] = [
  { id: 'home', label: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية', es: 'Inicio' } },
  { id: 'about', label: { en: 'About', fr: 'À propos', ar: 'حول النظام', es: 'Acerca de' } },
  { id: 'flows', label: { en: 'Flows', fr: 'Flux', ar: 'تدفقات', es: 'Flujos' } },
  { id: 'ai', label: { en: 'AI', fr: 'IA', ar: 'الذكاء الاصطناعي', es: 'IA' } },
  { id: 'industries', label: { en: 'Industries', fr: 'Secteurs', ar: 'القطاعات', es: 'Sectores' } },
  { id: 'contact', label: { en: 'Contact', fr: 'Contact', ar: 'تواصل معنا', es: 'Contacto' } },
]



const screenshotItems: ScreenshotItem[] = [
  {
    src: '/screenshots/1-Login.PNG',
    title: 'Secure Login Experience',
    module: 'Platform Access',
    caption: 'Entry point designed for secure enterprise authentication and role-based access.',
  },
  {
    src: '/screenshots/2-home-page.PNG',
    title: 'Unified Home Dashboard',
    module: 'Executive Overview',
    caption: 'Cross-module command center with fast navigation and operational visibility.',
  },
  {
    src: '/screenshots/3-grid-data.PNG',
    title: 'Grid Data Workbench',
    module: 'Operations Workspace',
    caption: 'High-density transactional workspace for filtering, reviewing, and acting on business data.',
  },
  {
    src: '/screenshots/4-chart-builder.PNG',
    title: 'Interactive Chart Builder',
    module: 'Analytics',
    caption: 'Decision-ready visual analytics for business leaders and analysts.',
  },
  {
    src: '/screenshots/4-chart-builder2.PNG',
    title: 'Advanced Chart Configuration',
    module: 'Analytics',
    caption: 'Flexible chart design experience for detailed executive and operational reporting.',
  },
  {
    src: '/screenshots/5-FA_Dashboard_2026-05-03.png',
    title: 'Fixed Assets Dashboard',
    module: 'Fixed Assets',
    caption: 'Asset lifecycle metrics and control indicators for finance governance.',
  },
  {
    src: '/screenshots/6-petty-cash.PNG',
    title: 'Petty Cash Operations',
    module: 'Cash Management',
    caption: 'Controlled cash disbursement workflows with approval traceability.',
  },
  {
    src: '/screenshots/7-outstanding-pays.PNG',
    title: 'Outstanding Payables Monitor',
    module: 'Accounts Payable',
    caption: 'Visibility into unpaid liabilities to support supplier planning and cash control.',
  },
  {
    src: '/screenshots/9-cash-manag-statement-upload.PNG',
    title: 'Bank Statement Upload',
    module: 'Cash Management',
    caption: 'Streamlined bank statement ingestion to accelerate reconciliation cycles.',
  },
  {
    src: '/screenshots/9-GL-Journals.PNG',
    title: 'General Ledger Journals',
    module: 'Finance And GL',
    caption: 'Journal control surface with robust posting and financial audit support.',
  },
  {
    src: '/screenshots/71-payable-volume-summary.PNG',
    title: 'Payables Volume Summary',
    module: 'Accounts Payable',
    caption: 'Executive payables throughput visibility for liability planning.',
  },
  {
    src: '/screenshots/72-payable-outstanding-summary.PNG',
    title: 'Payables Outstanding Summary',
    module: 'Accounts Payable',
    caption: 'Outstanding supplier commitments summarized for treasury and finance leadership.',
  },
  {
    src: '/screenshots/73-payable-aging-summary.PNG',
    title: 'Payables Aging Summary',
    module: 'Accounts Payable',
    caption: 'Aging analysis to prioritize settlement and improve supplier relationship control.',
  },
  {
    src: '/screenshots/81-receivable-volume-summary.PNG',
    title: 'Receivable Volume Summary',
    module: 'Accounts Receivable',
    caption: 'Receivables throughput indicators for revenue cycle management.',
  },
  {
    src: '/screenshots/82-receivable-outstanding-summary.PNG',
    title: 'Receivable Outstanding Summary',
    module: 'Accounts Receivable',
    caption: 'Open receivable balances highlighted for focused collection action.',
  },
  {
    src: '/screenshots/83-receivable-aging-summary.PNG',
    title: 'Receivable Aging Summary',
    module: 'Accounts Receivable',
    caption: 'Collection risk segmentation to improve DSO and cash predictability.',
  },
  {
    src: '/screenshots/881-eta-top-customers.PNG',
    title: 'Top Customers Insights',
    module: 'eTax And Sales Intelligence',
    caption: 'Customer concentration visibility for account strategy and growth planning.',
  },
  {
    src: '/screenshots/882-eta-top-vendors.PNG',
    title: 'Top Vendors Insights',
    module: 'eTax And Procurement Intelligence',
    caption: 'Supplier concentration and spending insights for procurement governance.',
  },
  {
    src: '/screenshots/91-inventory-executive-summary-1.PNG',
    title: 'Inventory Executive Summary',
    module: 'Inventory',
    caption: 'Inventory health, stock levels, and movement patterns at a glance.',
  },
  {
    src: '/screenshots/91-inventory-executive-summary-2.PNG',
    title: 'Inventory Executive Summary II',
    module: 'Inventory',
    caption: 'Extended inventory performance and valuation indicators for supply control.',
  },
  {
    src: '/screenshots/92-projects-gantt.PNG',
    title: 'Project Gantt Planner',
    module: 'Projects And Planning',
    caption: 'Timeline-based execution tracking for production and project operations.',
  },
  {
    src: '/screenshots/93-HR_Dashboard_2026-05-03.png',
    title: 'HR Executive Dashboard',
    module: 'HR And Payroll',
    caption: 'People analytics view across workforce activity and payroll outcomes.',
  },
]

const screenshotLocalized: Record<string, { title: LocalizedText; module: LocalizedText; caption: LocalizedText }> = {
  '/screenshots/1-Login.PNG': {
    title: { en: 'Secure Login Experience', fr: 'Expérience de connexion sécurisée', ar: 'تجربة تسجيل دخول آمنة', es: 'Experiencia de inicio de sesión seguro' },
    module: { en: 'Platform Access', fr: 'Accès plateforme', ar: 'الدخول إلى المنصة', es: 'Acceso a la plataforma' },
    caption: {
      en: 'Entry point designed for secure enterprise authentication and role-based access.',
      fr: 'Point d’entrée conçu pour une authentification sécurisée et un accès par rôles.',
      ar: 'نقطة دخول مصممة لمصادقة مؤسسية آمنة وصلاحيات حسب الدور.',
    },
  },
  '/screenshots/2-home-page.PNG': {
    title: { en: 'Unified Home Dashboard', fr: 'Tableau de bord d’accueil unifié', ar: 'لوحة رئيسية موحدة', es: 'Panel principal unificado' },
    module: { en: 'Executive Overview', fr: 'Vue exécutive', ar: 'نظرة تنفيذية', es: 'Visión ejecutiva' },
    caption: {
      en: 'Cross-module command center with fast navigation and operational visibility.',
      fr: 'Centre de pilotage transversal avec navigation rapide et visibilité opérationnelle.',
      ar: 'مركز قيادة عبر الوحدات مع تنقل سريع ورؤية تشغيلية واضحة.',
    },
  },
  '/screenshots/3-grid-data.PNG': {
    title: { en: 'Grid Data Workbench', fr: 'Espace grille de données', ar: 'مساحة عمل لبيانات الجدول', es: 'Área de trabajo de datos en cuadrícula' },
    module: { en: 'Operations Workspace', fr: 'Espace opérations', ar: 'مساحة العمليات', es: 'Espacio operativo' },
    caption: {
      en: 'High-density transactional workspace for filtering, reviewing, and acting on business data.',
      fr: 'Espace transactionnel dense pour filtrer, revoir et traiter les données métier.',
      ar: 'مساحة معاملات كثيفة لتصفية بيانات الأعمال ومراجعتها واتخاذ الإجراءات.',
    },
  },
  '/screenshots/4-chart-builder.PNG': {
    title: { en: 'Interactive Chart Builder', fr: 'Constructeur de graphiques interactif', ar: 'منشئ رسوم بيانية تفاعلي', es: 'Constructor interactivo de gráficos' },
    module: { en: 'Analytics', fr: 'Analytique', ar: 'التحليلات', es: 'Analítica' },
    caption: {
      en: 'Decision-ready visual analytics for business leaders and analysts.',
      fr: 'Analytique visuelle prête à la décision pour dirigeants et analystes.',
      ar: 'تحليلات مرئية جاهزة لاتخاذ القرار للمديرين والمحللين.',
    },
  },
  '/screenshots/4-chart-builder2.PNG': {
    title: { en: 'Advanced Chart Configuration', fr: 'Configuration avancée des graphiques', ar: 'تهيئة متقدمة للرسوم البيانية', es: 'Configuración avanzada de gráficos' },
    module: { en: 'Analytics', fr: 'Analytique', ar: 'التحليلات', es: 'Analítica' },
    caption: {
      en: 'Flexible chart design experience for detailed executive and operational reporting.',
      fr: 'Conception flexible de graphiques pour un reporting exécutif et opérationnel détaillé.',
      ar: 'تجربة مرنة لتصميم الرسوم للتقارير التنفيذية والتشغيلية التفصيلية.',
    },
  },
  '/screenshots/5-FA_Dashboard_2026-05-03.png': {
    title: { en: 'Fixed Assets Dashboard', fr: 'Tableau des immobilisations', ar: 'لوحة الأصول الثابتة', es: 'Panel de activos fijos' },
    module: { en: 'Fixed Assets', fr: 'Immobilisations', ar: 'الأصول الثابتة', es: 'Activos fijos' },
    caption: {
      en: 'Asset lifecycle metrics and control indicators for finance governance.',
      fr: 'Indicateurs de cycle de vie des actifs et de gouvernance financière.',
      ar: 'مؤشرات دورة حياة الأصول وضوابط الحوكمة المالية.',
    },
  },
  '/screenshots/6-petty-cash.PNG': {
    title: { en: 'Petty Cash Operations', fr: 'Opérations de petite caisse', ar: 'عمليات العهدة النقدية', es: 'Operaciones de caja chica' },
    module: { en: 'Cash Management', fr: 'Gestion de trésorerie', ar: 'إدارة النقد', es: 'Gestión de tesorería' },
    caption: {
      en: 'Controlled cash disbursement workflows with approval traceability.',
      fr: 'Workflows contrôlés de décaissement avec traçabilité des validations.',
      ar: 'تدفقات صرف نقدي محكومة مع تتبع كامل للموافقات.',
    },
  },
  '/screenshots/7-outstanding-pays.PNG': {
    title: { en: 'Outstanding Payables Monitor', fr: 'Suivi des dettes fournisseurs', ar: 'متابعة المستحقات الدائنة' },
    module: { en: 'Accounts Payable', fr: 'Comptes fournisseurs', ar: 'الحسابات الدائنة' },
    caption: {
      en: 'Visibility into unpaid liabilities to support supplier planning and cash control.',
      fr: 'Visibilité sur les passifs impayés pour piloter fournisseurs et trésorerie.',
      ar: 'رؤية للالتزامات غير المسددة لدعم تخطيط الموردين والتحكم النقدي.',
    },
  },
  '/screenshots/9-cash-manag-statement-upload.PNG': {
    title: { en: 'Bank Statement Upload', fr: 'Import des relevés bancaires', ar: 'رفع كشف الحساب البنكي', es: 'Carga de extracto bancario' },
    module: { en: 'Cash Management', fr: 'Gestion de trésorerie', ar: 'إدارة النقد', es: 'Gestión de tesorería' },
    caption: {
      en: 'Streamlined bank statement ingestion to accelerate reconciliation cycles.',
      fr: 'Import simplifié des relevés pour accélérer les rapprochements bancaires.',
      ar: 'إدخال مبسط لكشوف البنوك لتسريع دورات التسوية.',
    },
  },
  '/screenshots/9-GL-Journals.PNG': {
    title: { en: 'General Ledger Journals', fr: 'Journaux du grand livre', ar: 'قيود دفتر الأستاذ', es: 'Asientos de libro mayor' },
    module: { en: 'Finance And GL', fr: 'Finance et GL', ar: 'المالية ودفتر الأستاذ', es: 'Finanzas y libro mayor' },
    caption: {
      en: 'Journal control surface with robust posting and financial audit support.',
      fr: 'Pilotage des journaux avec comptabilisation robuste et support d’audit.',
      ar: 'واجهة تحكم بالقيود مع ترحيل قوي ودعم للتدقيق المالي.',
    },
  },
  '/screenshots/71-payable-volume-summary.PNG': {
    title: { en: 'Payables Volume Summary', fr: 'Synthèse volume fournisseurs', ar: 'ملخص حجم الحسابات الدائنة', es: 'Resumen de volumen de cuentas por pagar' },
    module: { en: 'Accounts Payable', fr: 'Comptes fournisseurs', ar: 'الحسابات الدائنة', es: 'Cuentas por pagar' },
    caption: {
      en: 'Executive payables throughput visibility for liability planning.',
      fr: 'Visibilité exécutive des volumes fournisseurs pour planifier les engagements.',
      ar: 'رؤية تنفيذية لتدفقات الدائنين لدعم تخطيط الالتزامات.',
    },
  },
  '/screenshots/72-payable-outstanding-summary.PNG': {
    title: { en: 'Payables Outstanding Summary', fr: 'Synthèse des soldes fournisseurs', ar: 'ملخص الأرصدة الدائنة القائمة', es: 'Resumen de pendientes de cuentas por pagar' },
    module: { en: 'Accounts Payable', fr: 'Comptes fournisseurs', ar: 'الحسابات الدائنة', es: 'Cuentas por pagar' },
    caption: {
      en: 'Outstanding supplier commitments summarized for treasury and finance leadership.',
      fr: 'Engagements fournisseurs résumés pour les équipes finance et trésorerie.',
      ar: 'ملخص التزامات الموردين القائمة لفِرق المالية والخزينة.',
    },
  },
  '/screenshots/73-payable-aging-summary.PNG': {
    title: { en: 'Payables Aging Summary', fr: 'Analyse d’ancienneté fournisseurs', ar: 'تحليل أعمار الحسابات الدائنة', es: 'Resumen de antigüedad de cuentas por pagar' },
    module: { en: 'Accounts Payable', fr: 'Comptes fournisseurs', ar: 'الحسابات الدائنة', es: 'Cuentas por pagar' },
    caption: {
      en: 'Aging analysis to prioritize settlement and improve supplier relationship control.',
      fr: 'Analyse d’ancienneté pour prioriser les paiements et piloter la relation fournisseur.',
      ar: 'تحليل الأعمار لتحديد أولويات السداد وتحسين إدارة علاقات الموردين.',
    },
  },
  '/screenshots/81-receivable-volume-summary.PNG': {
    title: { en: 'Receivable Volume Summary', fr: 'Synthèse volume clients', ar: 'ملخص حجم الحسابات المدينة', es: 'Resumen de volumen de cuentas por cobrar' },
    module: { en: 'Accounts Receivable', fr: 'Comptes clients', ar: 'الحسابات المدينة', es: 'Cuentas por cobrar' },
    caption: {
      en: 'Receivables throughput indicators for revenue cycle management.',
      fr: 'Indicateurs de flux clients pour piloter le cycle de revenus.',
      ar: 'مؤشرات تدفق الذمم المدينة لإدارة دورة الإيرادات.',
    },
  },
  '/screenshots/82-receivable-outstanding-summary.PNG': {
    title: { en: 'Receivable Outstanding Summary', fr: 'Synthèse des soldes clients', ar: 'ملخص الأرصدة المدينة القائمة', es: 'Resumen de pendientes de cuentas por cobrar' },
    module: { en: 'Accounts Receivable', fr: 'Comptes clients', ar: 'الحسابات المدينة', es: 'Cuentas por cobrar' },
    caption: {
      en: 'Open receivable balances highlighted for focused collection action.',
      fr: 'Mise en évidence des soldes ouverts pour un recouvrement ciblé.',
      ar: 'إبراز الأرصدة المدينة المفتوحة لدعم إجراءات تحصيل مركزة.',
    },
  },
  '/screenshots/83-receivable-aging-summary.PNG': {
    title: { en: 'Receivable Aging Summary', fr: 'Analyse d’ancienneté clients', ar: 'تحليل أعمار الحسابات المدينة', es: 'Resumen de antigüedad de cuentas por cobrar' },
    module: { en: 'Accounts Receivable', fr: 'Comptes clients', ar: 'الحسابات المدينة', es: 'Cuentas por cobrar' },
    caption: {
      en: 'Collection risk segmentation to improve DSO and cash predictability.',
      fr: 'Segmentation du risque de recouvrement pour améliorer DSO et prévisibilité cash.',
      ar: 'تصنيف مخاطر التحصيل لتحسين أيام التحصيل وتوقعات النقد.',
    },
  },
  '/screenshots/881-eta-top-customers.PNG': {
    title: { en: 'Top Customers Insights', fr: 'Insights meilleurs clients', ar: 'رؤى أفضل العملاء', es: 'Insights de clientes principales' },
    module: { en: 'eTax And Sales Intelligence', fr: 'eTax et intelligence commerciale', ar: 'الضريبة الإلكترونية وذكاء المبيعات' },
    caption: {
      en: 'Customer concentration visibility for account strategy and growth planning.',
      fr: 'Visibilité de concentration clients pour la stratégie comptes et la croissance.',
      ar: 'رؤية تركز العملاء لدعم استراتيجية الحسابات والتخطيط للنمو.',
    },
  },
  '/screenshots/882-eta-top-vendors.PNG': {
    title: { en: 'Top Vendors Insights', fr: 'Insights meilleurs fournisseurs', ar: 'رؤى أفضل الموردين' },
    module: { en: 'eTax And Procurement Intelligence', fr: 'eTax et intelligence achats', ar: 'الضريبة الإلكترونية وذكاء المشتريات' },
    caption: {
      en: 'Supplier concentration and spending insights for procurement governance.',
      fr: 'Analyse de concentration fournisseurs et dépenses pour la gouvernance achats.',
      ar: 'رؤى تركز الموردين والإنفاق لدعم حوكمة المشتريات.',
    },
  },
  '/screenshots/91-inventory-executive-summary-1.PNG': {
    title: { en: 'Inventory Executive Summary', fr: 'Synthèse exécutive des stocks', ar: 'ملخص تنفيذي للمخزون' },
    module: { en: 'Inventory', fr: 'Stocks', ar: 'المخزون' },
    caption: {
      en: 'Inventory health, stock levels, and movement patterns at a glance.',
      fr: 'Santé des stocks, niveaux et mouvements en un coup d’œil.',
      ar: 'صحة المخزون والمستويات وأنماط الحركة في نظرة واحدة.',
    },
  },
  '/screenshots/91-inventory-executive-summary-2.PNG': {
    title: { en: 'Inventory Executive Summary II', fr: 'Synthèse exécutive des stocks II', ar: 'الملخص التنفيذي للمخزون 2' },
    module: { en: 'Inventory', fr: 'Stocks', ar: 'المخزون' },
    caption: {
      en: 'Extended inventory performance and valuation indicators for supply control.',
      fr: 'Indicateurs étendus de performance et valorisation pour le pilotage supply.',
      ar: 'مؤشرات موسعة لأداء المخزون والتقييم لدعم التحكم بسلسلة الإمداد.',
    },
  },
  '/screenshots/92-projects-gantt.PNG': {
    title: { en: 'Project Gantt Planner', fr: 'Planificateur Gantt projets', ar: 'مخطط جانت للمشاريع' },
    module: { en: 'Projects And Planning', fr: 'Projets et planification', ar: 'المشاريع والتخطيط' },
    caption: {
      en: 'Timeline-based execution tracking for production and project operations.',
      fr: 'Suivi d’exécution basé timeline pour la production et les projets.',
      ar: 'تتبع التنفيذ بخط زمني لعمليات الإنتاج والمشاريع.',
    },
  },
  '/screenshots/93-HR_Dashboard_2026-05-03.png': {
    title: { en: 'HR Executive Dashboard', fr: 'Tableau RH exécutif', ar: 'لوحة تنفيذية للموارد البشرية', es: 'Panel ejecutivo de RR. HH.' },
    module: { en: 'HR And Payroll', fr: 'RH et paie', ar: 'الموارد البشرية والرواتب', es: 'RR. HH. y nómina' },
    caption: {
      en: 'People analytics view across workforce activity and payroll outcomes.',
      fr: 'Vue analytique RH sur l’activité des effectifs et les résultats de paie.',
      ar: 'عرض تحليلي للموارد البشرية يغطي نشاط القوى العاملة ونتائج الرواتب.',
    },
  },
}

const stats: StatItem[] = [
  { label: { en: 'Enterprise Modules', fr: 'Modules ERP', ar: 'وحدات النظام', es: 'Módulos empresariales' }, value: 12, suffix: '+' },
  { label: { en: 'Workflow Automations', fr: 'Automatisations', ar: 'أتمتة العمليات', es: 'Automatizaciones de flujo de trabajo' }, value: 100, suffix: '+' },
  { label: { en: 'Faster Cycle Times', fr: 'Gain de temps', ar: 'تسريع الدورات', es: 'Ciclos más rápidos' }, value: 37, suffix: '%' },
  { label: { en: 'Connected Integrations', fr: 'Intégrations', ar: 'تكاملات متصلة', es: 'Integraciones conectadas' }, value: 40, suffix: '+' },
]

const industries: IndustryItem[] = [
  {
    title: { en: 'Manufacturing', fr: 'Industrie', ar: 'التصنيع', es: 'Manufactura' },
    icon: Factory,
    text: {
      en: 'Control production, quality, and inventory in one execution layer.',
      fr: 'Pilotez production, qualité et stock dans une seule couche opérationnelle.',
      ar: 'تحكم في الإنتاج والجودة والمخزون ضمن طبقة تنفيذ موحدة.',
      es: 'Controle producción, calidad e inventario en una sola capa operativa.',
    },
  },
  {
    title: { en: 'Retail And Distribution', fr: 'Retail Et Distribution', ar: 'التجزئة والتوزيع', es: 'Retail y distribución' },
    icon: Globe2,
    text: {
      en: 'Manage purchasing, pricing, and order fulfillment at scale.',
      fr: 'Gérez achats, tarification et exécution des commandes à grande échelle.',
      ar: 'أدر المشتريات والتسعير وتنفيذ الطلبات على نطاق واسع.',
      es: 'Gestione compras, precios y cumplimiento de pedidos a escala.',
    },
  },
  {
    title: { en: 'Healthcare', fr: 'Santé', ar: 'الرعاية الصحية', es: 'Salud' },
    icon: ShieldCheck,
    text: {
      en: 'Govern sensitive operations with audit-ready controls and approvals.',
      fr: 'Gérez les opérations sensibles avec contrôles et validations auditables.',
      ar: 'أدر العمليات الحساسة بضوابط وموافقات جاهزة للتدقيق.',
      es: 'Gobierne operaciones sensibles con controles y aprobaciones listos para auditoría.',
    },
  },
  {
    title: { en: 'Professional Services', fr: 'Services Professionnels', ar: 'الخدمات المهنية', es: 'Servicios profesionales' },
    icon: Building2,
    text: {
      en: 'Track project costs, billability, and margin performance in real time.',
      fr: 'Suivez en temps réel coûts projets, facturabilité et marges.',
      ar: 'تابع تكاليف المشاريع وقابلية الفوترة وهوامش الربح في الوقت الفعلي.',
      es: 'Siga costos de proyectos, facturabilidad y desempeño de márgenes en tiempo real.',
    },
  },
]

const flowSectionCopy: Record<ContentLang, { eyebrow: string; title: string; subtitle: string; openShot: string }> = {
  en: {
    eyebrow: 'Smart Visual Flows',
    title: 'See Real End-To-End Business Execution',
    subtitle: 'Interactive process flows connect ERP steps with live screenshots so buyers instantly understand business value and control points.',
    openShot: 'Open Related Screenshot',
  },
  fr: {
    eyebrow: 'Flux Visuels Intelligents',
    title: 'Visualisez l execution metier de bout en bout',
    subtitle: 'Des flux interactifs lient chaque etape metier a des captures reelles pour accelerer la comprehension des decideurs.',
    openShot: 'Ouvrir la capture associee',
  },
  ar: {
    eyebrow: 'تدفقات بصرية ذكية',
    title: 'شاهد التنفيذ الكامل لتدفق الأعمال خطوة بخطوة',
    subtitle: 'تربط التدفقات التفاعلية بين مراحل العمل ولقطات النظام الحقيقية لعرض القيمة ونقاط التحكم بشكل فوري.',
    openShot: 'فتح لقطة الشاشة المرتبطة',
  },
}

const flowSectionCopyEs = {
  eyebrow: 'Flujos visuales inteligentes',
  title: 'Visualiza la ejecución real de negocio de punta a punta',
  subtitle: 'Los flujos interactivos conectan cada etapa del ERP con capturas reales para mostrar valor y puntos de control con claridad.',
  openShot: 'Abrir captura relacionada',
}

const smartFlows: SmartFlow[] = [
  {
    id: 'p2p',
    title: { en: 'Procure To Pay', fr: 'Procure To Pay', ar: 'الشراء إلى السداد', es: 'De compra a pago' },
    subtitle: { en: 'Supplier Liability Control', fr: 'Controle des engagements fournisseurs', ar: 'التحكم في التزامات الموردين', es: 'Control de pasivos de proveedores' },
    headline: {
      en: 'From supplier invoices to posting and cash discipline in one governed execution path.',
      fr: 'De la facture fournisseur a la comptabilisation avec une discipline de tresorerie gouvernee.',
      ar: 'من فاتورة المورد حتى الترحيل والانضباط النقدي ضمن مسار تنفيذي محكوم.',
      es: 'Desde facturas de proveedor hasta contabilización y disciplina de caja en un único flujo gobernado.',
    },
    steps: [
      {
        id: 'p2p-1',
        screenshotSrc: '/screenshots/71-payable-volume-summary.PNG',
        kpi: 'AP Volume',
        title: { en: 'Capture Payables Volume', fr: 'Capturer le volume AP', ar: 'التقاط حجم الحسابات الدائنة', es: 'Capturar volumen de cuentas por pagar' },
        detail: {
          en: 'Finance leaders monitor invoice throughput and payment workload.',
          fr: 'Les equipes finance suivent le debit des factures et la charge de paiement.',
          ar: 'تتابع الإدارة المالية تدفق الفواتير وحجم عمليات السداد.',
          es: 'Los equipos financieros monitorean el flujo de facturas y la carga de pagos.',
        },
      },
      {
        id: 'p2p-2',
        screenshotSrc: '/screenshots/72-payable-outstanding-summary.PNG',
        kpi: 'Outstanding',
        title: { en: 'Prioritize Open Liabilities', fr: 'Prioriser les passifs ouverts', ar: 'ترتيب أولويات الالتزامات القائمة', es: 'Priorizar pasivos abiertos' },
        detail: {
          en: 'Outstanding commitments are grouped for treasury and supplier planning.',
          fr: 'Les engagements ouverts sont regroupes pour la tresorerie et les fournisseurs.',
          ar: 'تُجمع الالتزامات المفتوحة لدعم التخطيط النقدي والتعامل مع الموردين.',
          es: 'Los compromisos pendientes se agrupan para la planificación de tesorería y proveedores.',
        },
      },
      {
        id: 'p2p-3',
        screenshotSrc: '/screenshots/73-payable-aging-summary.PNG',
        kpi: 'Aging Risk',
        title: { en: 'Control Aging Exposure', fr: 'Maitriser le risque d anciennete', ar: 'ضبط مخاطر الأعمار', es: 'Controlar exposición por antigüedad' },
        detail: {
          en: 'Aging insights drive due-date discipline and supplier confidence.',
          fr: 'L analyse d anciennete renforce la discipline des echeances fournisseurs.',
          ar: 'تحليلات الأعمار تعزز الالتزام بالمواعيد وثقة الموردين.',
          es: 'La analítica de antigüedad refuerza la disciplina de vencimientos y la confianza de proveedores.',
        },
      },
      {
        id: 'p2p-4',
        screenshotSrc: '/screenshots/9-cash-manag-statement-upload.PNG',
        kpi: 'Cash Match',
        title: { en: 'Match Bank Activity', fr: 'Rapprocher l activite bancaire', ar: 'مطابقة حركة البنوك', es: 'Conciliar actividad bancaria' },
        detail: {
          en: 'Bank statement processing confirms payment execution and reconciliation speed.',
          fr: 'Le traitement des releves confirme l execution des paiements et le rapprochement.',
          ar: 'تؤكد معالجة كشوف البنوك تنفيذ المدفوعات وسرعة التسويات.',
          es: 'El procesamiento de extractos confirma la ejecución de pagos y acelera la conciliación.',
        },
      },
      {
        id: 'p2p-5',
        screenshotSrc: '/screenshots/9-GL-Journals.PNG',
        kpi: 'Audit Trail',
        title: { en: 'Post To General Ledger', fr: 'Comptabiliser au grand livre', ar: 'الترحيل إلى دفتر الأستاذ', es: 'Registrar en libro mayor' },
        detail: {
          en: 'Controlled posting closes the loop with full accounting traceability.',
          fr: 'La comptabilisation gouvernee boucle le cycle avec une tracabilite complete.',
          ar: 'يغلق الترحيل المحكوم الدورة مع أثر محاسبي قابل للتدقيق.',
          es: 'El registro controlado cierra el ciclo con trazabilidad contable completa.',
        },
      },
    ],
  },
  {
    id: 'o2c',
    title: { en: 'Order To Cash', fr: 'Order To Cash', ar: 'الطلب إلى التحصيل', es: 'De pedido a cobro' },
    subtitle: { en: 'Receivable Performance', fr: 'Performance des creances', ar: 'أداء الحسابات المدينة', es: 'Rendimiento de cuentas por cobrar' },
    headline: {
      en: 'Monitor receivable growth, prioritize collections, and reduce cash-cycle friction.',
      fr: 'Piloter la croissance des creances, prioriser le recouvrement et accelerer le cycle cash.',
      ar: 'راقب نمو الذمم المدينة وحدد أولويات التحصيل وخفّض احتكاك دورة النقد.',
      es: 'Monitoree el crecimiento de cuentas por cobrar, priorice cobros y reduzca fricciones del ciclo de caja.',
    },
    steps: [
      {
        id: 'o2c-1',
        screenshotSrc: '/screenshots/81-receivable-volume-summary.PNG',
        kpi: 'AR Volume',
        title: { en: 'Track Receivable Throughput', fr: 'Suivre le debit client', ar: 'متابعة تدفق الحسابات المدينة', es: 'Seguimiento del volumen de cuentas por cobrar' },
        detail: {
          en: 'Executive view of invoicing momentum across customer portfolios.',
          fr: 'Vue executive de la dynamique de facturation sur le portefeuille clients.',
          ar: 'رؤية تنفيذية لزخم الفوترة عبر شرائح العملاء.',
          es: 'Vista ejecutiva del impulso de facturación a través de carteras de clientes.',
        },
      },
      {
        id: 'o2c-2',
        screenshotSrc: '/screenshots/82-receivable-outstanding-summary.PNG',
        kpi: 'Open AR',
        title: { en: 'Focus On Open Balances', fr: 'Cibler les soldes ouverts', ar: 'التركيز على الأرصدة المفتوحة', es: 'Enfocarse en saldos abiertos' },
        detail: {
          en: 'Teams segment open balances and launch focused follow-up actions.',
          fr: 'Les equipes segmentent les soldes ouverts pour des actions ciblees.',
          ar: 'تقوم الفرق بتجزئة الأرصدة المفتوحة لتنفيذ إجراءات متابعة مركزة.',
          es: 'Los equipos segmentan saldos abiertos y ejecutan acciones de seguimiento focalizadas.',
        },
      },
      {
        id: 'o2c-3',
        screenshotSrc: '/screenshots/83-receivable-aging-summary.PNG',
        kpi: 'DSO Risk',
        title: { en: 'Control Aging Buckets', fr: 'Maitriser les tranches d anciennete', ar: 'التحكم في شرائح الأعمار', es: 'Controlar tramos de antigüedad' },
        detail: {
          en: 'Aging buckets reveal collection risk and protect cash predictability.',
          fr: 'Les tranches d anciennete revelent le risque de recouvrement et la prevision cash.',
          ar: 'تُظهر شرائح الأعمار مخاطر التحصيل وتحسّن توقعات التدفق النقدي.',
          es: 'Los tramos de antigüedad revelan riesgo de cobro y mejoran la previsibilidad de caja.',
        },
      },
      {
        id: 'o2c-4',
        screenshotSrc: '/screenshots/881-eta-top-customers.PNG',
        kpi: 'Top Customers',
        title: { en: 'Prioritize Key Accounts', fr: 'Prioriser les comptes cles', ar: 'ترتيب أولويات الحسابات الكبرى', es: 'Priorizar cuentas clave' },
        detail: {
          en: 'Customer concentration insights align collections with account strategy.',
          fr: 'Les insights clients alignent recouvrement et strategie commerciale.',
          ar: 'رؤى تركز العملاء تربط التحصيل باستراتيجية إدارة الحسابات.',
          es: 'La concentración de clientes alinea la cobranza con la estrategia de cuentas.',
        },
      },
    ],
  },
  {
    id: 'h2r',
    title: { en: 'Hire To Retire', fr: 'Hire To Retire', ar: 'التوظيف إلى نهاية الخدمة', es: 'De contratación a retiro' },
    subtitle: { en: 'HR And Payroll Governance', fr: 'Gouvernance RH et paie', ar: 'حوكمة الموارد البشرية والرواتب', es: 'Gobernanza de RR. HH. y nómina' },
    headline: {
      en: 'Connect workforce analytics, payroll execution, and finance posting in one lifecycle.',
      fr: 'Relier analytics RH, execution paie et comptabilisation finance dans un cycle unique.',
      ar: 'ربط تحليلات القوى العاملة وتشغيل الرواتب والترحيل المالي ضمن دورة موحدة.',
      es: 'Conecte analítica de personal, ejecución de nómina y contabilización financiera en un solo ciclo.',
    },
    steps: [
      {
        id: 'h2r-1',
        screenshotSrc: '/screenshots/93-HR_Dashboard_2026-05-03.png',
        kpi: 'Workforce View',
        title: { en: 'Monitor Workforce Health', fr: 'Suivre la sante des effectifs', ar: 'مراقبة صحة القوى العاملة', es: 'Monitorear salud de la plantilla' },
        detail: {
          en: 'Leadership tracks people performance and payroll readiness from one dashboard.',
          fr: 'La direction suit la performance RH et la preparation paie en un seul ecran.',
          ar: 'تتابع الإدارة أداء الموارد البشرية وجاهزية الرواتب من لوحة واحدة.',
          es: 'La dirección monitorea desempeño del personal y preparación de nómina desde un único tablero.',
        },
      },
      {
        id: 'h2r-2',
        screenshotSrc: '/screenshots/6-petty-cash.PNG',
        kpi: 'Employee Claims',
        title: { en: 'Settle Claims And Advances', fr: 'Regler les avances et frais', ar: 'تسوية السلف والمطالبات', es: 'Liquidar reclamaciones y anticipos' },
        detail: {
          en: 'Employee expenses and petty cash flows are settled with policy controls.',
          fr: 'Les frais collaborateurs sont regles avec des controles de politique.',
          ar: 'تُسوّى مصروفات الموظفين والعهد النقدية وفق ضوابط السياسات.',
          es: 'Los gastos de empleados y flujos de caja chica se liquidan con controles de política.',
        },
      },
      {
        id: 'h2r-3',
        screenshotSrc: '/screenshots/9-GL-Journals.PNG',
        kpi: 'Payroll Posting',
        title: { en: 'Post Payroll To GL', fr: 'Comptabiliser la paie', ar: 'ترحيل الرواتب إلى الأستاذ', es: 'Registrar nómina en libro mayor' },
        detail: {
          en: 'Payroll journals are posted with clear traceability for compliance and audit.',
          fr: 'Les journaux de paie sont comptabilises avec une tracabilite claire.',
          ar: 'يتم ترحيل قيود الرواتب بأثر واضح يدعم الالتزام والتدقيق.',
          es: 'Los asientos de nómina se registran con trazabilidad clara para cumplimiento y auditoría.',
        },
      },
    ],
  },
]

const copy = {
  en: {
    headerCta: 'Start Free Consultation',
    heroBadge: 'Enterprise Resource Planning Platform For SMB Growth',
    heroTitle: 'One Professional Platform For Finance, Operations, HR, And Growth.',
    heroDesc:
      'EPIX unifies accounting, inventory, payroll, manufacturing, and business intelligence into a single professional environment built for high-growth enterprises and optimized for small and medium businesses.',
    heroPrimary: 'Book A Live Demo',
    heroSecondary: 'Explore Product Tour',
    heroPills: ['Fast onboarding', 'Multi-company ready', 'Audit compliant'],
    navMenu: 'Toggle menu',
    aboutEyebrow: 'About EPIX',
    aboutTitle: 'A Business System Built For Professional Teams',
    aboutSubtitle:
      'EPIX removes operational chaos by connecting all departments with one secure data model and one shared workflow engine, optimized for small and medium businesses and scalable enterprises.',
    aboutPanelTag: 'Why Teams Choose EPIX',
    aboutPanelTitle: 'Simple enough for quick adoption, strong enough for enterprise control.',
    aboutPanelText:
      'EPIX gives finance, operations, and HR one shared operating model so teams can move faster with less manual coordination and more decision confidence.',
    aboutMetrics: [
      { label: 'Fast Rollout', value: 'Weeks' },
      { label: 'Unified Data', value: 'One Source' },
      { label: 'Process Control', value: 'End-to-End' },
    ],
    aboutCards: [
      { title: 'Process Discipline', text: 'Approvals, permissions, and controls are embedded in every business transaction.' },
      { title: 'Scalable Architecture', text: 'Designed for multi-company structures, rapid expansion, and growing transaction volume.' },
      { title: 'Decision Clarity', text: 'Built-in dashboards and reports keep leaders aligned with live business performance.' },
      { title: 'SMB Optimized', text: 'Clean workflows and guided actions make daily execution easy for small and medium businesses.' },
    ],
    modulesEyebrow: 'Core Modules',
    modulesTitle: 'Everything Your ERP Needs In One Connected Suite',
    modulesSubtitle: 'Executive-level outcomes paired with process-level capabilities across every business function.',
    moduleTag: 'Module',
    keyCapabilities: 'Key Capabilities',
    modulePageCta: 'Open Module Page',
    screensEyebrow: 'Product Screenshots',
    screensTitle: 'Real EPIX Screens Organized By Business Capability',
    screensSubtitle: 'Curated and categorized visuals from live EPIX modules to demonstrate practical depth, usability, and executive insight.',
    screensText:
      'From finance journals and cash statement automation to HR dashboards, inventory summaries, and project gantt planning, these screenshots illustrate how EPIX translates enterprise complexity into clear operational workflows.',
    aiTag: 'AI And Analytics',
    aiTitle: 'Predictive Intelligence Inside Every Daily Workflow',
    aiText: 'EPIX adds practical AI where teams work: anomaly detection, workflow intelligence, and action recommendations with full auditability.',
    aiCta: 'Discover AI Capabilities',
    aiCards: [
      { title: 'Process Intelligence', text: 'Context-aware recommendations based on workflow and transaction patterns.' },
      { title: 'Executive Dashboards', text: 'Live KPI visibility with drill-down to transaction level details.' },
      { title: 'Governed Automation', text: 'Rule-based execution with role-based controls and approvals.' },
    ],
    industriesEyebrow: 'Industry Solutions',
    industriesTitle: 'Configured For Sector-Specific Operations',
    industriesSubtitle: 'EPIX adapts to business models while preserving standard governance and data consistency across entities.',
    previewEyebrow: 'Platform Preview',
    previewTitle: 'Professional Interface Designed For Fast Decisions',
    previewSubtitle: 'A clear information hierarchy with actionable KPIs, timeline workflows, and role-based workspaces.',
    boardTitle: 'Performance Board',
    boardMetrics: ['Revenue', 'COGS', 'EBITDA'],
    timelineTitle: 'Workflow Timeline',
    timelineItems: ['Purchase request approved', 'Inventory allocation completed', 'Payroll batch posted to general ledger'],
    whyEyebrow: 'Why EPIX',
    whyTitle: 'Measurable Business Impact',
    whySubtitle: 'A system designed not only to execute transactions, but to improve enterprise outcomes.',
    contactEyebrow: 'Contact',
    contactTitle: 'Schedule Your EPIX Consultation',
    contactSubtitle: 'Share your priorities and we will provide a tailored walkthrough for your business model.',
    placeholders: {
      fullName: 'Full Name',
      workEmail: 'Work Email',
      phone: 'Phone Number',
      company: 'Company',
      priorities: 'Tell us about your current ERP priorities',
    },
    contactCta: 'Request Consultation',
    close: 'Close',
    footer: 'Enterprise grade platform',
    sending: 'Sending...',
    messageSuccess: 'Message sent successfully! We will be in touch soon.',
    messageError: 'Something went wrong. Please try again or email us directly.',
    rightsReserved: 'All rights reserved.',
  },
  fr: {
    headerCta: 'Démarrer une consultation',
    heroBadge: 'Plateforme ERP pour la croissance des PME',
    heroTitle: 'Une plateforme professionnelle pour la finance, les opérations, les RH et la croissance.',
    heroDesc:
      'EPIX unifie comptabilité, stocks, paie, production et intelligence métier dans un environnement unique, pensé pour les PME et les entreprises en croissance.',
    heroPrimary: 'Réserver une démonstration',
    heroSecondary: 'Découvrir le produit',
    heroPills: ['Déploiement rapide', 'Multi-sociétés', 'Conforme audit'],
    navMenu: 'Ouvrir le menu',
    aboutEyebrow: 'À propos d’EPIX',
    aboutTitle: 'Un système métier conçu pour les équipes professionnelles',
    aboutSubtitle:
      'EPIX réduit la complexité opérationnelle en connectant tous les départements via un modèle de données unifié et un moteur de workflow sécurisé.',
    aboutPanelTag: 'Pourquoi choisir EPIX',
    aboutPanelTitle: 'Assez simple pour une adoption rapide, assez solide pour un contrôle entreprise.',
    aboutPanelText:
      'EPIX donne à la finance, aux opérations et aux RH un modèle de fonctionnement partagé pour accélérer l’exécution et améliorer la qualité décisionnelle.',
    aboutMetrics: [
      { label: 'Mise en place', value: 'Semaines' },
      { label: 'Données unifiées', value: 'Source unique' },
      { label: 'Contrôle process', value: 'De bout en bout' },
    ],
    aboutCards: [
      { title: 'Discipline des processus', text: 'Contrôles, validations et permissions sont intégrés dans chaque transaction.' },
      { title: 'Architecture évolutive', text: 'Conçue pour multi-entités, forte croissance et volume transactionnel élevé.' },
      { title: 'Clarté décisionnelle', text: 'Des tableaux de bord en temps réel pour aligner les équipes dirigeantes.' },
      { title: 'Optimisé PME', text: 'Des workflows clairs qui facilitent l’exécution quotidienne des PME.' },
    ],
    modulesEyebrow: 'Modules clés',
    modulesTitle: 'Tout votre ERP dans une suite intégrée',
    modulesSubtitle: 'Valeur exécutive et capacités opérationnelles, dans chaque fonction métier.',
    moduleTag: 'Module',
    keyCapabilities: 'Capacités clés',
    modulePageCta: 'Ouvrir la page module',
    screensEyebrow: 'Captures produit',
    screensTitle: 'Écrans EPIX classés par capacité métier',
    screensSubtitle: 'Visuels réels et catégorisés pour démontrer profondeur fonctionnelle et lisibilité métier.',
    screensText:
      'Des journaux financiers à la gestion RH, en passant par la trésorerie, les stocks et la planification, les captures montrent une exécution claire des workflows.',
    aiTag: 'IA et analytique',
    aiTitle: 'Intelligence opérationnelle au cœur du quotidien',
    aiText: 'EPIX apporte une IA pratique: détection d’anomalies, intelligence de workflow et recommandations actionnables.',
    aiCta: 'Découvrir les capacités IA',
    aiCards: [
      { title: 'Intelligence de processus', text: 'Recommandations contextuelles basées sur les transactions et les workflows.' },
      { title: 'Tableaux de bord exécutifs', text: 'Vision KPI live avec navigation jusqu’au niveau transactionnel.' },
      { title: 'Automatisation gouvernée', text: 'Exécution pilotée par règles, rôles et circuits d’approbation.' },
    ],
    industriesEyebrow: 'Solutions sectorielles',
    industriesTitle: 'Configuré par secteur',
    industriesSubtitle: 'EPIX s’adapte aux modèles métier tout en préservant gouvernance et cohérence des données.',
    previewEyebrow: 'Aperçu plateforme',
    previewTitle: 'Interface professionnelle pour décisions rapides',
    previewSubtitle: 'Une hiérarchie claire de l’information avec KPI, timelines et espaces par rôle.',
    boardTitle: 'Tableau performance',
    boardMetrics: ['Revenus', 'COGS', 'EBITDA'],
    timelineTitle: 'Chronologie workflow',
    timelineItems: ['Demande d’achat approuvée', 'Allocation de stock terminée', 'Paie comptabilisée au grand livre'],
    whyEyebrow: 'Pourquoi EPIX',
    whyTitle: 'Impact mesurable',
    whySubtitle: 'Un système conçu pour améliorer durablement les résultats métier.',
    contactEyebrow: 'Contact',
    contactTitle: 'Planifiez votre consultation EPIX',
    contactSubtitle: 'Partagez vos priorités pour une démonstration adaptée à votre organisation.',
    placeholders: {
      fullName: 'Nom complet',
      workEmail: 'Email professionnel',
      phone: 'Numéro de téléphone',
      company: 'Entreprise',
      priorities: 'Décrivez vos priorités ERP',
    },
    contactCta: 'Demander une consultation',
    close: 'Fermer',
    footer: 'Plateforme de niveau entreprise',
    sending: 'Envoi en cours...',
    messageSuccess: 'Message envoye avec succes! Nous vous contacterons bientot.',
    messageError: 'Une erreur est survenue. Veuillez reessayer ou nous ecrire directement.',
    rightsReserved: 'Tous droits reserves.',
  },
  ar: {
    headerCta: 'ابدأ استشارة مجانية',
    heroBadge: 'منصة ERP لنمو الشركات الصغيرة والمتوسطة',
    heroTitle: 'منصة احترافية واحدة للمالية والعمليات والموارد البشرية والنمو.',
    heroDesc:
      'يوحّد EPIX المحاسبة والمخزون والرواتب والتصنيع وذكاء الأعمال في بيئة واحدة احترافية، مناسبة للشركات الصغيرة والمتوسطة وقابلة للتوسع للمؤسسات.',
    heroPrimary: 'احجز عرضا مباشرا',
    heroSecondary: 'استكشف جولة المنتج',
    heroPills: ['تشغيل سريع', 'يدعم تعدد الشركات', 'جاهز للتدقيق'],
    navMenu: 'فتح القائمة',
    aboutEyebrow: 'حول EPIX',
    aboutTitle: 'نظام أعمال مصمم للفرق الاحترافية',
    aboutSubtitle:
      'يقلّل EPIX التعقيد التشغيلي عبر ربط جميع الإدارات بنموذج بيانات موحّد ومحرك سير عمل آمن، ومهيأ للشركات الصغيرة والمتوسطة.',
    aboutPanelTag: 'لماذا تختار الفرق EPIX',
    aboutPanelTitle: 'سهل التبني بسرعة، وقوي بما يكفي للتحكم المؤسسي.',
    aboutPanelText:
      'يوفّر EPIX نموذجا تشغيليا موحّدا للمالية والعمليات والموارد البشرية لتسريع التنفيذ ورفع جودة القرار.',
    aboutMetrics: [
      { label: 'سرعة الإطلاق', value: 'أسابيع' },
      { label: 'بيانات موحدة', value: 'مصدر واحد' },
      { label: 'تحكم بالعمليات', value: 'من البداية للنهاية' },
    ],
    aboutCards: [
      { title: 'انضباط العمليات', text: 'الموافقات والصلاحيات والضوابط مدمجة في كل معاملة أعمال.' },
      { title: 'هيكل قابل للتوسع', text: 'مصمم لتعدد الكيانات والنمو السريع وزيادة حجم المعاملات.' },
      { title: 'وضوح القرار', text: 'لوحات معلومات مدمجة تبقي الإدارة على اطلاع لحظي بالأداء.' },
      { title: 'مُحسّن للشركات الصغيرة والمتوسطة', text: 'تدفقات عمل واضحة وإجراءات موجهة تسهّل التنفيذ اليومي.' },
    ],
    modulesEyebrow: 'الوحدات الأساسية',
    modulesTitle: 'كل ما يحتاجه ERP في حزمة مترابطة واحدة',
    modulesSubtitle: 'قيمة تنفيذية وقدرات عملية لكل وظيفة أعمال.',
    moduleTag: 'وحدة',
    keyCapabilities: 'القدرات الرئيسية',
    modulePageCta: 'فتح صفحة الوحدة',
    screensEyebrow: 'لقطات المنتج',
    screensTitle: 'شاشات EPIX الحقيقية مصنفة حسب قدرات الأعمال',
    screensSubtitle: 'لقطات واقعية مصنفة لإظهار عمق الوظائف وسهولة الاستخدام والرؤية التنفيذية.',
    screensText:
      'من قيود المالية ورفع كشوف البنوك إلى لوحات الموارد البشرية وملخصات المخزون وتخطيط المشاريع، توضح هذه اللقطات كيف يحوّل EPIX التعقيد إلى تدفق عمل واضح.',
    aiTag: 'الذكاء الاصطناعي والتحليلات',
    aiTitle: 'ذكاء عملي داخل سير العمل اليومي',
    aiText: 'يوفر EPIX ذكاءً عملياً: كشف الشذوذ، ذكاء العمليات، وتوصيات قابلة للتنفيذ مع حوكمة كاملة.',
    aiCta: 'اكتشف قدرات الذكاء الاصطناعي',
    aiCards: [
      { title: 'ذكاء العمليات', text: 'توصيات سياقية تعتمد على أنماط المعاملات وسير العمل.' },
      { title: 'لوحات تنفيذية', text: 'رؤية فورية لمؤشرات الأداء مع تتبع تفصيلي حتى مستوى المعاملة.' },
      { title: 'أتمتة محكومة', text: 'تنفيذ قائم على القواعد والصلاحيات ومسارات الموافقة.' },
    ],
    industriesEyebrow: 'حلول القطاعات',
    industriesTitle: 'مهيأ لاحتياجات كل قطاع',
    industriesSubtitle: 'يتكيف EPIX مع نماذج العمل مع الحفاظ على الحوكمة واتساق البيانات.',
    previewEyebrow: 'نظرة على المنصة',
    previewTitle: 'واجهة احترافية لقرارات أسرع',
    previewSubtitle: 'هيكل معلومات واضح مع مؤشرات أداء وتدفقات زمنية ومساحات عمل حسب الدور.',
    boardTitle: 'لوحة الأداء',
    boardMetrics: ['الإيرادات', 'تكلفة المبيعات', 'الأرباح التشغيلية'],
    timelineTitle: 'الخط الزمني للعمليات',
    timelineItems: ['اعتماد طلب الشراء', 'إكمال تخصيص المخزون', 'ترحيل دفعة الرواتب إلى دفتر الأستاذ'],
    whyEyebrow: 'لماذا EPIX',
    whyTitle: 'أثر أعمال قابل للقياس',
    whySubtitle: 'نظام لا يكتفي بتنفيذ المعاملات بل يحسن نتائج الأعمال.',
    contactEyebrow: 'تواصل معنا',
    contactTitle: 'احجز استشارتك مع EPIX',
    contactSubtitle: 'شارك أولوياتك لنقدّم عرضا مناسبا لنموذج عملك.',
    placeholders: {
      fullName: 'الاسم الكامل',
      workEmail: 'البريد المهني',
      phone: 'رقم الهاتف',
      company: 'الشركة',
      priorities: 'أخبرنا بأولوياتك الحالية في ERP',
    },
    contactCta: 'اطلب استشارة',
    close: 'إغلاق',
    footer: 'منصة بمعايير مؤسسية',
    sending: 'جاري الإرسال...',
    messageSuccess: 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
    messageError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.',
    rightsReserved: 'جميع الحقوق محفوظة.',
  },
}

const copyEs: typeof copy.en = {
  headerCta: 'Iniciar consulta gratis',
  heroBadge: 'Plataforma ERP para el crecimiento de PYMES',
  heroTitle: 'Una plataforma profesional para finanzas, operaciones, RR. HH. y crecimiento.',
  heroDesc:
    'EPIX unifica contabilidad, inventario, nómina, manufactura e inteligencia de negocio en un solo entorno profesional para empresas en crecimiento.',
  heroPrimary: 'Reservar demo en vivo',
  heroSecondary: 'Explorar recorrido del producto',
  heroPills: ['Implementación rápida', 'Multiempresa', 'Cumplimiento de auditoría'],
  navMenu: 'Abrir menú',
  aboutEyebrow: 'Sobre EPIX',
  aboutTitle: 'Un sistema empresarial para equipos profesionales',
  aboutSubtitle:
    'EPIX conecta todas las áreas con un modelo de datos unificado y un motor de flujos seguro para reducir el caos operativo.',
  aboutPanelTag: 'Por qué elegir EPIX',
  aboutPanelTitle: 'Simple para adoptar rápido, sólido para control empresarial.',
  aboutPanelText:
    'EPIX da a finanzas, operaciones y RR. HH. un modelo compartido para ejecutar con velocidad y claridad.',
  aboutMetrics: [
    { label: 'Despliegue', value: 'Semanas' },
    { label: 'Datos unificados', value: 'Una fuente' },
    { label: 'Control de procesos', value: 'Punta a punta' },
  ],
  aboutCards: [
    { title: 'Disciplina de procesos', text: 'Aprobaciones, permisos y controles en cada transacción.' },
    { title: 'Arquitectura escalable', text: 'Diseñada para multiempresa y alto volumen transaccional.' },
    { title: 'Claridad de decisión', text: 'Tableros integrados para seguimiento del desempeño en tiempo real.' },
    { title: 'Optimizado para PYMES', text: 'Flujos claros que facilitan la ejecución diaria.' },
  ],
  modulesEyebrow: 'Módulos clave',
  modulesTitle: 'Todo su ERP en una suite conectada',
  modulesSubtitle: 'Resultados ejecutivos y capacidades operativas en cada función del negocio.',
  moduleTag: 'Módulo',
  keyCapabilities: 'Capacidades clave',
  modulePageCta: 'Abrir página del módulo',
  screensEyebrow: 'Capturas del producto',
  screensTitle: 'Pantallas reales de EPIX por capacidad de negocio',
  screensSubtitle: 'Visuales reales para mostrar profundidad funcional y claridad operativa.',
  screensText:
    'Desde diarios financieros y tesorería hasta RR. HH., inventario y planificación, las capturas muestran flujos de trabajo claros.',
  aiTag: 'IA y analítica',
  aiTitle: 'Inteligencia práctica en el flujo diario',
  aiText: 'EPIX agrega IA accionable: detección de anomalías, inteligencia de procesos y recomendaciones con auditoría.',
  aiCta: 'Descubrir capacidades de IA',
  aiCards: [
    { title: 'Inteligencia de procesos', text: 'Recomendaciones contextuales basadas en patrones transaccionales.' },
    { title: 'Tableros ejecutivos', text: 'Visibilidad KPI en vivo con detalle hasta la transacción.' },
    { title: 'Automatización gobernada', text: 'Ejecución basada en reglas, roles y aprobaciones.' },
  ],
  industriesEyebrow: 'Soluciones por industria',
  industriesTitle: 'Configurado para operaciones sectoriales',
  industriesSubtitle: 'EPIX se adapta al modelo de negocio manteniendo gobernanza y consistencia de datos.',
  previewEyebrow: 'Vista de plataforma',
  previewTitle: 'Interfaz profesional para decisiones rápidas',
  previewSubtitle: 'Jerarquía clara con KPIs, flujos por tiempo y espacios por rol.',
  boardTitle: 'Panel de rendimiento',
  boardMetrics: ['Ingresos', 'COGS', 'EBITDA'],
  timelineTitle: 'Línea de tiempo de flujo',
  timelineItems: ['Solicitud de compra aprobada', 'Asignación de inventario completada', 'Nómina contabilizada al mayor'],
  whyEyebrow: 'Por qué EPIX',
  whyTitle: 'Impacto de negocio medible',
  whySubtitle: 'Un sistema diseñado para mejorar resultados, no solo ejecutar transacciones.',
  contactEyebrow: 'Contacto',
  contactTitle: 'Programe su consulta EPIX',
  contactSubtitle: 'Comparta sus prioridades y le mostraremos una ruta adaptada a su negocio.',
  placeholders: {
    fullName: 'Nombre completo',
    workEmail: 'Correo corporativo',
    phone: 'Teléfono',
    company: 'Empresa',
    priorities: 'Cuéntenos sus prioridades actuales de ERP',
  },
  contactCta: 'Solicitar consulta',
  close: 'Cerrar',
  footer: 'Plataforma de nivel empresarial',
  sending: 'Enviando...',
  messageSuccess: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.',
  messageError: 'Se produjo un error. Intente nuevamente o escríbanos directamente.',
  rightsReserved: 'Todos los derechos reservados.',
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mb-10 text-center md:mb-14">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-[var(--brand)]">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold leading-tight text-[var(--text)] md:text-5xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{subtitle}</p>
    </div>
  )
}

function resolveInitialLang(): Lang {
  const queryLang = new URLSearchParams(window.location.search).get('lang')
  if (queryLang === 'en' || queryLang === 'fr' || queryLang === 'ar' || queryLang === 'es') {
    return queryLang
  }
  const savedLang = localStorage.getItem('epix-lang')
  if (savedLang === 'en' || savedLang === 'fr' || savedLang === 'ar' || savedLang === 'es') {
    return savedLang
  }
  return 'en'
}



function App() {
  const [lang, setLang] = useState<Lang>(resolveInitialLang)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [selectedShot, setSelectedShot] = useState<(typeof screenshotItems)[number] | null>(null)
  const [activeFlowId, setActiveFlowId] = useState(smartFlows[0].id)
  const [activeShotIndex, setActiveShotIndex] = useState(0)
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? copyEs : copy[contentLang]
  const isRtl = lang === 'ar'
  const flowText =
    lang === 'es' ? flowSectionCopyEs : flowSectionCopy[contentLang]
  const activeFlow = smartFlows.find((flow) => flow.id === activeFlowId) ?? smartFlows[0]
  const localizedShot = (shot: ScreenshotItem) => screenshotLocalized[shot.src]
  const featuredScreens = useMemo(() => screenshotItems.slice(0, 6), [])
  const activeShot = featuredScreens[activeShotIndex % featuredScreens.length]
  const activeShotI18n = localizedShot(activeShot)
  const navLabel = (label: LocalizedText) => (lang === 'es' ? (label.es ?? label.en) : label[contentLang])
  const tr = (value: string) => (lang === 'es' ? moduleSpanishText(value) : value)
  const pick = (value: LocalizedText) => (lang === 'es' ? (value.es ?? moduleSpanishText(value.en)) : value[contentLang])


  const openFlowScreenshot = (screenshotSrc: string) => {
    const match = screenshotItems.find((shot) => shot.src === screenshotSrc)
    if (match) {
      setSelectedShot(match)
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    localStorage.setItem('epix-lang', lang)
  }, [isRtl, lang])

  useEffect(() => {
    const path = window.location.pathname.toLowerCase()
    const moduleSlug = path.startsWith('/modules/') ? path.replace('/modules/', '') : ''
    const normalizedSlug = moduleSlug === 'common-masters' ? 'business-masters' : moduleSlug
    const pageModule = moduleCatalog.find((item) => item.slug === normalizedSlug)
    if (pageModule) {
      document.title = `EPIX ${pageModule.name.en} ERP | Module Overview, Business Flow, and Process Control`
      const description = document.querySelector('meta[name="description"]')
      if (description) {
        description.setAttribute(
          'content',
          `Explore EPIX ${pageModule.name.en}: capabilities, business flow, outcomes, and process controls for SMB and enterprise operations.`,
        )
      }
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) {
        ogTitle.setAttribute('content', `EPIX ${pageModule.name.en} ERP | Operational Control`) 
      }
    }
  }, [])

  useEffect(() => {
    const currentPath = window.location.pathname.toLowerCase()
    if (currentPath !== '/' && currentPath !== '') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) {
          setActiveSection(visible[0].target.id)
        }
      },
      { threshold: [0.15, 0.3, 0.5], rootMargin: '-10% 0px -30% 0px' },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    // Set 'home' as active when scrolled to top
    const onScroll = () => {
      if (window.scrollY < 100) setActiveSection('home')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Handle hash-based scrolling on page load
    const hash = window.location.hash.replace('#', '')
    if (hash && sectionIds.includes(hash)) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } else {
      setActiveSection('home')
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [sectionIds])

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedShot(null)
      }
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const timer = window.setInterval(() => {
      setActiveShotIndex((previous) => (previous + 1) % featuredScreens.length)
    }, 4800)

    return () => window.clearInterval(timer)
  }, [featuredScreens.length])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const isSubPage = window.location.pathname !== '/' && window.location.pathname !== ''
    if (isSubPage) {
      window.location.href = `/?lang=${lang}#${id}`
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const setLanguage = (nextLang: Lang) => {
    setLang(nextLang)
    localStorage.setItem('epix-lang', nextLang)
  }

  const onLangTabsKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Home' && event.key !== 'End') {
      return
    }

    event.preventDefault()
    const order: Lang[] = ['en', 'fr', 'ar', 'es']
    const currentIndex = order.indexOf(lang)

    if (event.key === 'Home') {
      setLanguage(order[0])
      return
    }

    if (event.key === 'End') {
      setLanguage(order[order.length - 1])
      return
    }

    const delta = event.key === 'ArrowRight' ? 1 : -1
    const nextIndex = (currentIndex + delta + order.length) % order.length
    setLanguage(order[nextIndex])
  }

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    setFormStatus('sending')
    emailjs
      .sendForm('service_amacsl7', 'template_xted9nr', formRef.current, { publicKey: 'hFKQWjC4ppQtyi_lQ' })
      .then(() => {
        setFormStatus('success')
        formRef.current?.reset()
        setTimeout(() => setFormStatus('idle'), 5000)
      })
      .catch(() => {
        setFormStatus('error')
        setTimeout(() => setFormStatus('idle'), 5000)
      })
  }

  const path = window.location.pathname.toLowerCase()

  // Determine which sub-page to render (null = homepage)
  let subPageContent: ReactNode | null = null
  if (path === '/tour' || path === '/product-tour') {
    subPageContent = <ProductTourPage lang={lang} />
  } else if (path === '/ai' || path === '/ai-capabilities') {
    subPageContent = <AICapabilitiesPage lang={lang} />
  } else if (path === '/modules/business-masters' || path === '/modules/common-masters') {
    subPageContent = <BusinessMastersPage lang={lang} />
  } else if (path === '/modules/general-ledger') {
    subPageContent = <GeneralLedgerPage lang={lang} />
  } else if (path === '/modules/inventory-management') {
    subPageContent = <InventoryManagementPage lang={lang} />
  } else if (path === '/modules/human-resources') {
    subPageContent = <HumanResourcesPage lang={lang} />
  } else if (path === '/modules/cash-management') {
    subPageContent = <CashManagementPage lang={lang} />
  } else if (path === '/modules/petty-cash') {
    subPageContent = <PettyCashPage lang={lang} />
  } else if (path === '/modules/procure-to-pay') {
    subPageContent = <ProcureToPayPage lang={lang} />
  } else if (path === '/modules/accounts-payable') {
    subPageContent = <AccountsPayablePage lang={lang} />
  } else if (path === '/modules/accounts-receivable') {
    subPageContent = <AccountsReceivablePage lang={lang} />
  } else if (path === '/modules/shipment-management') {
    subPageContent = <ShipmentManagementPage lang={lang} />
  } else if (path === '/modules/discrete-manufacturing') {
    subPageContent = <DiscreteManufacturingPage lang={lang} />
  } else if (path === '/modules/fixed-assets') {
    subPageContent = <FixedAssetsPage lang={lang} />
  } else if (path === '/modules/car-inspection') {
    subPageContent = <CarInspectionPage lang={lang} />
  }

  if (subPageContent) {
    return (
      <div className={`relative overflow-hidden ${isRtl ? 'lang-ar' : ''}`}>
        <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--line)] bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
            <a href={`/?lang=${lang}`} className="flex items-center gap-2" aria-label="EPIX home">
              <img src="/EPIX.png" alt="EPIX" className="h-28 w-auto md:h-32 drop-shadow-md" />
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="relative rounded-lg px-3 py-1.5 text-sm font-semibold text-[var(--text-muted)] transition-all duration-200 hover:bg-[var(--brand)]/5 hover:text-[var(--text)]"
                >
                  {navLabel(item.label)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 rounded-xl border border-[var(--line)] bg-white p-1 md:flex" role="tablist" aria-label="Language" onKeyDown={onLangTabsKeyDown}>
                {(['en', 'fr', 'ar', 'es'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    role="tab"
                    aria-selected={lang === l}
                    tabIndex={lang === l ? 0 : -1}
                    className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase ${lang === l ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button onClick={() => scrollTo('contact')} className="hidden rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm md:block">
                {t.headerCta}
              </button>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="rounded-xl border border-[var(--line)] p-2 lg:hidden"
                aria-label={t.navMenu}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <div className="border-t border-[var(--line)] bg-white px-5 py-3 lg:hidden">
              <div className="mb-3 flex items-center gap-1 rounded-xl border border-[var(--line)] bg-white p-1" role="tablist" aria-label="Language" onKeyDown={onLangTabsKeyDown}>
                {(['en', 'fr', 'ar', 'es'] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    role="tab"
                    aria-selected={lang === l}
                    tabIndex={lang === l ? 0 : -1}
                    className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase ${lang === l ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="rounded-lg border border-[var(--line)] px-3 py-2 text-left text-sm font-medium text-[var(--text-muted)] transition-all hover:border-[var(--brand)] hover:text-[var(--text)]"
                  >
                    {navLabel(item.label)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        <div className="pt-28 md:pt-32">
          <Suspense fallback={<RouteLoadingState />}>{subPageContent}</Suspense>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${isRtl ? 'lang-ar' : ''}`}>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-[var(--line)] bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2" aria-label="EPIX home">
            <img src="/EPIX.png" alt="EPIX" className="h-28 w-auto md:h-32 drop-shadow-md" />
          </button>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[var(--brand)]/10 text-[var(--brand)] shadow-sm ring-1 ring-[var(--brand)]/20'
                    : 'text-[var(--text-muted)] hover:bg-[var(--brand)]/5 hover:text-[var(--text)]'
                }`}
              >
                {navLabel(item.label)}
                {activeSection === item.id && (
                  <span className="absolute -bottom-2.5 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-[var(--brand)]" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-1 rounded-xl border border-[var(--line)] bg-white p-1 md:flex" role="tablist" aria-label="Language" onKeyDown={onLangTabsKeyDown}>
              {(['en', 'fr', 'ar', 'es'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  role="tab"
                  aria-selected={lang === l}
                  tabIndex={lang === l ? 0 : -1}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase ${lang === l ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTo('contact')} className="hidden rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm md:block">
              {t.headerCta}
            </button>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="rounded-xl border border-[var(--line)] p-2 lg:hidden"
              aria-label={t.navMenu}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-[var(--line)] bg-white px-5 py-3 lg:hidden">
            <div className="mb-3 flex items-center gap-1 rounded-xl border border-[var(--line)] bg-white p-1" role="tablist" aria-label="Language" onKeyDown={onLangTabsKeyDown}>
              {(['en', 'fr', 'ar', 'es'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  role="tab"
                  aria-selected={lang === l}
                  tabIndex={lang === l ? 0 : -1}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold uppercase ${lang === l ? 'bg-[var(--brand)] text-white' : 'text-[var(--text-muted)]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--brand)]'
                      : 'border-[var(--line)] text-[var(--text-muted)]'
                  }`}
                >
                  {navLabel(item.label)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto w-full max-w-7xl px-5 pb-20 pt-28 md:px-8 md:pt-32">
        <section id="home" className="relative isolate py-12 md:py-20">
          <div className="hero-mesh" aria-hidden="true">
            <div className="hero-grid-overlay" />
            <span className="hero-orb hero-orb-a" />
            <span className="hero-orb hero-orb-b" />
            <span className="hero-orb hero-orb-c" />
          </div>

          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[rgba(29,93,242,0.18)] bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--brand)] backdrop-blur-md">
                <span className="hero-badge-pulse-dot" />
                {t.heroBadge}
              </p>

              <h1 className="hero-headline font-display text-[40px] font-extrabold leading-[1.05] text-[var(--text)] sm:text-5xl md:text-[68px]">
                <span className="hero-headline-accent">EPIX</span> — {t.heroTitle}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] md:text-lg">{t.heroDesc}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => scrollTo('contact')} className="hero-cta-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold">
                  {t.heroPrimary}
                  <ArrowRight size={16} />
                </button>
                <a href={`/tour?lang=${lang}`} className="hero-cta-secondary inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold">
                  {t.heroSecondary}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-[var(--text)] md:text-sm">
                {t.heroPills.map((pill) => (
                  <span key={pill} className="hero-pill inline-flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[var(--brand)]" />
                    {pill}
                  </span>
                ))}
              </div>

              <div className="hero-trust-strip mt-10 grid grid-cols-3 gap-4 px-5 py-4 text-center">
                <div>
                  <p className="font-display text-2xl font-extrabold text-[var(--text)]">13+</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">{lang === 'ar' ? 'وحدات' : lang === 'fr' ? 'Modules' : lang === 'es' ? 'Módulos' : 'Modules'}</p>
                </div>
                <div className="border-x border-[rgba(29,93,242,0.12)]">
                  <p className="font-display text-2xl font-extrabold text-[var(--text)]">3</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">{lang === 'ar' ? 'لغات' : lang === 'fr' ? 'Langues' : lang === 'es' ? 'Idiomas' : 'Languages'}</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold text-[var(--text)]">99.9%</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">{lang === 'ar' ? 'اتفاقية التوافر' : lang === 'fr' ? 'SLA disponibilité' : lang === 'es' ? 'SLA de disponibilidad' : 'Uptime SLA'}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="relative"
            >
              <div className="hero-showcase p-4 md:p-5">
                <div className="mb-3 flex items-center justify-between rounded-xl border border-[rgba(29,93,242,0.12)] bg-white/70 px-3 py-2 backdrop-blur">
                  <div className="flex items-center gap-1.5">
                    <span className="hero-window-dot" style={{ background: '#f76d57' }} />
                    <span className="hero-window-dot" style={{ background: '#ffbd44' }} />
                    <span className="hero-window-dot" style={{ background: '#59d6b8' }} />
                  </div>
                  <p className="truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4f6ea4]">
                    epix.app / {pick(activeShotI18n.module)}
                  </p>
                  <span className="text-[11px] font-semibold text-[#0a8f6b]">● LIVE</span>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-[#d7e5ff] bg-white">
                  <img
                    key={activeShot.src}
                    src={activeShot.src}
                    alt={`${pick(activeShotI18n.title)} - ${pick(activeShotI18n.module)}`}
                    loading="eager"
                    decoding="async"
                    className="h-[300px] w-full object-cover object-top md:h-[360px]"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f2345]/45 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
                      {pick(activeShotI18n.module)}
                    </p>
                    <p className="mt-0.5 font-display text-base font-bold text-white md:text-lg">
                      {pick(activeShotI18n.title)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {featuredScreens.map((shot, index) => {
                      const shotI18n = localizedShot(shot)
                      return (
                        <button
                          key={shot.src}
                          type="button"
                          onClick={() => setActiveShotIndex(index)}
                          aria-label={lang === 'es' ? `Mostrar ${pick(shotI18n.title)}` : `Show ${pick(shotI18n.title)}`}
                          className={`h-2.5 rounded-full transition-all ${
                            index === activeShotIndex
                              ? 'w-8 bg-gradient-to-r from-[#1d5df2] to-[#0ea5a8]'
                              : 'w-2.5 bg-[#bcd0f2] hover:bg-[#8eafeb]'
                          }`}
                        />
                      )
                    })}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f7cb0]">
                    {activeShotIndex + 1} / {featuredScreens.length}
                  </span>
                </div>
              </div>

              <div className="hero-float pointer-events-none absolute -left-4 top-10 hidden rounded-2xl border border-[rgba(29,93,242,0.18)] bg-white/90 px-4 py-3 shadow-xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#eef4ff] p-2 text-[#1d5df2]">
                    <BarChart3 size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5f7cb0]">{lang === 'ar' ? 'الإيرادات' : lang === 'fr' ? 'Revenus' : lang === 'es' ? 'Ingresos' : 'Revenue'}</p>
                    <p className="font-display text-lg font-extrabold text-[var(--text)]">$8.4M</p>
                  </div>
                  <span className="rounded-full bg-[#dff5ec] px-2 py-0.5 text-[11px] font-bold text-[#0a8f6b]">+18.4%</span>
                </div>
              </div>

              <div className="hero-float hero-float-delay pointer-events-none absolute -right-3 bottom-8 hidden rounded-2xl border border-[rgba(14,165,168,0.25)] bg-white/90 px-4 py-3 shadow-xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#e6fbf7] p-2 text-[#0ea5a8]">
                    <Bot size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#5f7cb0]">{lang === 'ar' ? 'رؤية ذكية' : lang === 'fr' ? 'Insight IA' : lang === 'es' ? 'Insight IA' : 'AI Insight'}</p>
                    <p className="text-sm font-semibold text-[var(--text)]">{lang === 'ar' ? 'تمت معالجة الشذوذ' : lang === 'fr' ? 'Anomalie resolue' : lang === 'es' ? 'Anomalía resuelta' : 'Anomaly cleared'}</p>
                  </div>
                </div>
              </div>

              <div className="hero-float pointer-events-none absolute -top-4 right-6 hidden rounded-full border border-[rgba(29,93,242,0.18)] bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur md:inline-flex">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--text)]">
                  <ShieldCheck size={14} className="text-[#0ea5a8]" />
                  {lang === 'ar' ? 'جاهز للتدقيق' : lang === 'fr' ? 'Pret pour audit' : lang === 'es' ? 'Listo para auditoría' : 'Audit Ready'}
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-16 md:py-24">
          <SectionTitle eyebrow={t.aboutEyebrow} title={t.aboutTitle} subtitle={t.aboutSubtitle} />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="about-visual-panel rounded-3xl border border-[#d5e2ff] bg-gradient-to-br from-[#f7faff] via-white to-[#eef4ff] p-7 md:p-9"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2f62d8]">{t.aboutPanelTag}</p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight text-[var(--text)] md:text-4xl">{t.aboutPanelTitle}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.aboutPanelText}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {t.aboutMetrics.map((item) => (
                  <div key={item.label} className="glass-stat rounded-xl px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{item.label}</p>
                    <p className="mt-1 font-display text-lg font-semibold text-[var(--text)]">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white">
                <img
                  src="/screenshots/2-home-page.PNG"
                  alt={lang === 'es' ? 'Panel principal unificado de EPIX' : 'EPIX Unified Home Dashboard'}
                  loading="lazy"
                  decoding="async"
                  className="h-48 w-full object-cover object-top md:h-56"
                />
              </div>
            </motion.article>

            <div className="grid gap-4 sm:grid-cols-2">
              {t.aboutCards.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-[var(--line)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#c6d7ff] hover:shadow-md"
                >
                  <div className="mb-3 inline-flex rounded-lg bg-gradient-to-br from-[#eef4ff] to-[#e6fbf7] p-2 text-[#2f62d8]">
                    <CheckCircle2 size={15} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-[var(--text)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="flows" className="py-16 md:py-24">
          <SectionTitle eyebrow={flowText.eyebrow} title={flowText.title} subtitle={flowText.subtitle} />
          <div className="flow-stage rounded-3xl border border-[#ceddff] p-5 md:p-7">
            <div className="flex flex-wrap gap-2">
              {smartFlows.map((flow) => (
                <button
                  key={flow.id}
                  type="button"
                  onClick={() => setActiveFlowId(flow.id)}
                  className={`flow-tab rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    activeFlowId === flow.id
                      ? 'border-[#2d63d5] bg-[#2d63d5] text-white shadow-sm'
                      : 'border-[#cfe0ff] bg-white text-[#46689c] hover:border-[#9ebeff]'
                  }`}
                >
                  {pick(flow.title)}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-[#d7e5ff] bg-white/90 p-5 md:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4067a8]">{pick(activeFlow.subtitle)}</p>
              <h3 className="mt-2 font-display text-2xl font-bold text-[var(--text)] md:text-3xl">{pick(activeFlow.title)}</h3>
              <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{pick(activeFlow.headline)}</p>

              <div className="mt-6 mb-8 flow-diagram">
                {activeFlow.steps.map((step, index) => (
                  <div key={step.id} className="contents">
                    <div className="flow-diagram-step">
                      <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">
                        {index + 1}
                      </span>
                      <p className="text-xs font-semibold text-[var(--text)] md:text-sm">{pick(step.title)}</p>
                      <p className="mt-1 hidden text-[10px] text-[var(--text-muted)] md:block">{tr(step.kpi)}</p>
                    </div>
                    {index < activeFlow.steps.length - 1 && (
                      <div className="flow-diagram-connector">
                        <ArrowRight size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {activeFlow.steps.map((step, index) => {
                  const shotI18n = screenshotLocalized[step.screenshotSrc]
                  return (
                    <motion.button
                      key={step.id}
                      type="button"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 }}
                      onClick={() => openFlowScreenshot(step.screenshotSrc)}
                      className="flow-step-card group rounded-2xl border border-[#dbe7ff] bg-white p-4 text-left"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#edf3ff] text-xs font-bold text-[#355da8]">{index + 1}</span>
                        <span className="rounded-full border border-[#d8e6ff] bg-[#f7fbff] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5678b3]">
                          {tr(step.kpi)}
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-semibold text-[var(--text)]">{pick(step.title)}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{pick(step.detail)}</p>
                      <div className="mt-4 overflow-hidden rounded-xl border border-[#dce8ff] bg-[#edf4ff]">
                        <img
                          src={step.screenshotSrc}
                          alt={`${pick(step.title)} - ${pick(shotI18n.title)}`}
                          loading="lazy"
                          decoding="async"
                          className="h-40 w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                        {flowText.openShot}
                        <ArrowRight size={14} />
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="ai" className="py-16 md:py-24">
          <div className="ai-section-glow grid gap-6 rounded-3xl border border-[#d5e2ff] bg-gradient-to-r from-[#f4f8ff] to-[#eef8f8] p-6 md:grid-cols-[1fr_1fr] md:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2f62d8]">{t.aiTag}</p>
              <h3 className="mt-3 font-display text-3xl font-bold text-[var(--text)] md:text-4xl">{t.aiTitle}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.aiText}</p>
              <a href={`/ai?lang=${lang}`} className="hero-cta-primary mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
                {t.aiCta}
                <ArrowRight size={16} />
              </a>
              <div className="mt-6 overflow-hidden rounded-xl border border-[#d7e5ff]">
                <img
                  src="/screenshots/4-chart-builder.PNG"
                  alt={lang === 'es' ? 'Constructor analítico de gráficos de EPIX' : 'EPIX Analytics Chart Builder'}
                  loading="lazy"
                  decoding="async"
                  className="h-44 w-full object-cover object-top"
                />
              </div>
            </div>
            <div className="grid gap-3">
              {[
                { icon: Bot, ...t.aiCards[0] },
                { icon: Cloud, ...t.aiCards[1] },
                { icon: ShieldCheck, ...t.aiCards[2] },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-xl border border-[#d5e2ff] bg-white/80 p-5 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="inline-flex rounded-lg bg-gradient-to-br from-[#eef4ff] to-[#e6fbf7] p-2.5 text-[#2f62d8]">
                    <Icon size={18} />
                  </div>
                  <p className="mt-3 font-display text-lg font-semibold text-[var(--text)]">{title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="py-16 md:py-24">
          <SectionTitle eyebrow={t.industriesEyebrow} title={t.industriesTitle} subtitle={t.industriesSubtitle} />
          <div className="grid gap-4 md:grid-cols-2">
            {industries.map(({ title, text, icon: Icon }, index) => (
              <motion.div
                key={title.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group rounded-2xl border border-[var(--line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#c6d7ff] hover:shadow-lg"
              >
                <div className="inline-flex rounded-xl bg-gradient-to-br from-[#eef4ff] to-[#e6fbf7] p-3 text-[#2f62d8] shadow-sm">
                  <Icon size={22} />
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-[var(--text)]">{pick(title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{pick(text)}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16 md:py-24">
          <SectionTitle eyebrow={t.whyEyebrow} title={t.whyTitle} subtitle={t.whySubtitle} />
          <div className="grid gap-4 md:grid-cols-4">
            {stats.map((item) => (
              <InView key={item.label.en} triggerOnce>
                {({ inView, ref }) => (
                  <div ref={ref} className="glass-stat rounded-2xl p-5 text-center">
                    <p className="font-display text-4xl font-extrabold text-[var(--brand)]">
                      {inView ? <CountUp end={item.value} duration={2.1} /> : 0}
                      {item.suffix}
                    </p>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{pick(item.label)}</p>
                  </div>
                )}
              </InView>
            ))}
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24">
          <div className="ai-section-glow rounded-3xl border border-[#cddcff] bg-gradient-to-r from-[#f4f8ff] to-[#f8fcff] p-7 md:p-10">
            <SectionTitle eyebrow={t.contactEyebrow} title={t.contactTitle} subtitle={t.contactSubtitle} />
            <form ref={formRef} onSubmit={handleContactSubmit} className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
              <input name="from_name" required className="rounded-xl border border-[#ccd9f3] bg-white/80 px-4 py-3 backdrop-blur-sm transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(29,93,242,0.15)]" placeholder={t.placeholders.fullName} />
              <input name="from_email" type="email" required className="rounded-xl border border-[#ccd9f3] bg-white/80 px-4 py-3 backdrop-blur-sm transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(29,93,242,0.15)]" placeholder={t.placeholders.workEmail} />
              <input name="phone" type="tel" required className="rounded-xl border border-[#ccd9f3] bg-white/80 px-4 py-3 backdrop-blur-sm transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(29,93,242,0.15)]" placeholder={t.placeholders.phone} />
              <input name="company" className="rounded-xl border border-[#ccd9f3] bg-white/80 px-4 py-3 backdrop-blur-sm transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(29,93,242,0.15)]" placeholder={t.placeholders.company} />
              <textarea name="message" required className="min-h-32 rounded-xl border border-[#ccd9f3] bg-white/80 px-4 py-3 backdrop-blur-sm transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[rgba(29,93,242,0.15)] md:col-span-2" placeholder={t.placeholders.priorities} />
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="hero-cta-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold disabled:opacity-60 md:col-span-2"
              >
                {formStatus === 'sending' ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                    {t.sending}
                  </span>
                ) : (
                  <>
                    {t.contactCta}
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
              {formStatus === 'success' && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-600 md:col-span-2">
                  <CheckCircle2 size={16} /> {t.messageSuccess}
                </p>
              )}
              {formStatus === 'error' && (
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-red-500 md:col-span-2">
                  {t.messageError}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {selectedShot &&
        (() => {
          const selectedI18n = localizedShot(selectedShot)
          return (
            <AccessibleImageModal
              open={Boolean(selectedShot)}
              onClose={() => setSelectedShot(null)}
              title={pick(selectedI18n.title)}
              subtitle={pick(selectedI18n.module)}
              imageSrc={selectedShot.src}
              imageAlt={pick(selectedI18n.title)}
              closeLabel={t.close}
            />
          )
        })()}

      <footer className="border-t border-[var(--line)] bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-10 md:flex-row md:px-8">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <img src="/EPIX.png" alt="EPIX" className="h-20 w-auto drop-shadow-sm" />
            <p className="text-sm text-[var(--text-muted)]">© {new Date().getFullYear()} EPIX ERP. {t.rightsReserved}</p>
          </div>
          <p className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
            {t.footer}
            <ShieldCheck size={14} className="text-[var(--brand)]" />
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
