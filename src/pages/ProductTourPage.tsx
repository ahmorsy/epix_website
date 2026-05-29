import { useState } from 'react'
import { motion } from 'framer-motion'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { SmartImage } from '../components/SmartImage'
import { moduleSpanishText } from './moduleSpanish'
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
  Building2,
  Wallet,
  Truck,
  Factory,
  Landmark,
  Car,
  Briefcase,
  Receipt,
  CreditCard,
  PiggyBank,
  Boxes,
  Eye,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'

/* ---------- Tour Steps ---------- */
const tourSteps = [
  {
    id: 'login',
    icon: Lock,
    title: { en: 'Secure Login & Access', fr: 'Connexion Sécurisée', ar: 'تسجيل دخول آمن', es: 'Inicio de sesión y acceso seguros' },
    desc: {
      en: 'Multi-factor authentication, role-based access control, and session governance ensure every user enters a secure, personalized workspace.',
      fr: "Authentification multi-facteur, contrôle d'accès par rôle et gestion des sessions pour un espace sécurisé.",
      ar: 'مصادقة متعددة العوامل وتحكم بالوصول حسب الدور وإدارة الجلسات لضمان بيئة عمل آمنة.',
      es: 'La autenticación multifactor, el control de acceso basado en roles y la gobernanza de sesiones garantizan un espacio de trabajo seguro y personalizado para cada usuario.',
    },
    screenshot: '/screenshots/1-Login.PNG',
    badge: 'Step 1',
  },
  {
    id: 'dashboard',
    icon: Monitor,
    title: { en: 'Personalized Dashboard', fr: 'Tableau De Bord Personnalisé', ar: 'لوحة تحكم مخصصة' },
    desc: {
      en: 'Role-aware widgets, real-time KPIs, and quick-action shortcuts greet each user with exactly what they need to start their day.',
      fr: "Widgets adaptés au rôle, KPIs en temps réel et raccourcis d'action rapide pour démarrer efficacement.",
      ar: 'أدوات حسب الدور ومؤشرات أداء فورية واختصارات عمل سريعة لبدء يومك بكفاءة.',
    },
    screenshot: '/screenshots/2-home-page.PNG',
    badge: 'Step 2',
  },
  {
    id: 'data',
    icon: Database,
    title: { en: 'Master Data Governance', fr: 'Gouvernance Des Données', ar: 'حوكمة البيانات الرئيسية' },
    desc: {
      en: 'Centralized master records with advanced grid editing, bulk operations, inline validation, and full audit trail for every change.',
      fr: 'Enregistrements centralisés avec édition avancée, opérations groupées, validation et audit complet.',
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
      fr: "Des écritures comptables aux bons de commande, chaque transaction suit un workflow d'approbation et de validation.",
      ar: 'من القيود المحاسبية إلى أوامر الشراء، كل معاملة تمر عبر مسارات موافقة وتحقق تلقائي.',
    },
    screenshot: '/screenshots/9-GL-Journals.PNG',
    badge: 'Step 4',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: { en: 'Analytics & Chart Builder', fr: 'Analytique Et Générateur De Graphiques', ar: 'التحليلات ومنشئ الرسوم البيانية' },
    desc: {
      en: 'Drag-and-drop chart builder, customizable dashboards, drill-down capabilities, and exportable reports for data-driven decisions.',
      fr: 'Générateur de graphiques glisser-déposer, tableaux de bord personnalisables et rapports exportables.',
      ar: 'منشئ رسوم بيانية بالسحب والإفلات ولوحات تحكم قابلة للتخصيص وتقارير قابلة للتصدير.',
    },
    screenshot: '/screenshots/4-chart-builder.PNG',
    badge: 'Step 5',
  },
  {
    id: 'reporting',
    icon: TrendingUp,
    title: { en: 'Executive Summaries & KPIs', fr: 'Résumés Exécutifs Et KPIs', ar: 'ملخصات تنفيذية ومؤشرات أداء' },
    desc: {
      en: 'Pre-built executive dashboards for payables, receivables, inventory health, and workforce metrics with aging analysis and trend detection.',
      fr: 'Tableaux de bord exécutifs pré-construits pour les dettes, créances, stocks et indicateurs RH.',
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
  { label: { en: 'Goods Receipt', fr: 'Réception', ar: 'استلام البضاعة' }, icon: Boxes },
  { label: { en: 'Invoice Match', fr: 'Rapprochement', ar: 'مطابقة الفاتورة' }, icon: Receipt },
  { label: { en: 'Payment', fr: 'Paiement', ar: 'الدفع' }, icon: DollarSign },
  { label: { en: 'GL Posting', fr: 'Comptabilisation', ar: 'ترحيل محاسبي' }, icon: Database },
  { label: { en: 'Reports', fr: 'Rapports', ar: 'التقارير' }, icon: BarChart3 },
]

/* ---------- Differentiators ---------- */
const differentiators = [
  {
    icon: Database,
    title: { en: 'Unified Data Model', fr: 'Modèle De Données Unifié', ar: 'نموذج بيانات موحد' },
    desc: { en: 'All modules share one database. No data silos, no sync errors, no duplication.', fr: 'Tous les modules partagent une base. Zéro silos, zéro erreurs de synchro.', ar: 'كل الوحدات تشارك قاعدة بيانات واحدة. لا عزل بيانات ولا أخطاء مزامنة.' },
  },
  {
    icon: Globe2,
    title: { en: 'Multi-Company & Multi-Currency', fr: 'Multi-Société Et Multi-Devise', ar: 'متعدد الشركات والعملات' },
    desc: { en: 'Switch between companies instantly. Full currency conversion with real-time rates.', fr: 'Basculez entre sociétés instantanément. Conversion devise en temps réel.', ar: 'انتقل بين الشركات فوراً. تحويل عملات بأسعار لحظية.' },
  },
  {
    icon: Shield,
    title: { en: 'Complete Audit Trail', fr: "Piste D'Audit Complète", ar: 'مسار تدقيق كامل' },
    desc: { en: 'Every action timestamped, every change tracked. Full accountability at field level.', fr: 'Chaque action horodatée, chaque modification tracée. Responsabilité totale.', ar: 'كل إجراء مؤرخ وكل تغيير متتبع. مساءلة كاملة على مستوى الحقل.' },
  },
  {
    icon: Users,
    title: { en: 'Role-Based Access Control', fr: "Contrôle D'Accès Par Rôle", ar: 'تحكم بالوصول حسب الدور', es: 'Control de acceso basado en roles' },
    desc: {
      en: 'Granular permissions down to field level. Users see only what they need.',
      fr: 'Permissions granulaires au niveau du champ. Accès minimum nécessaire.',
      ar: 'صلاحيات دقيقة حتى مستوى الحقل. المستخدم يرى فقط ما يحتاجه.',
      es: 'Permisos granulares hasta el nivel de campo. Cada usuario ve solo lo que necesita.',
    },
  },
  {
    icon: Zap,
    title: { en: 'Workflow Engine', fr: 'Moteur De Workflow', ar: 'محرك سير العمل' },
    desc: { en: 'Configurable approval chains, escalation rules, and SLA monitoring built in.', fr: "Chaînes d'approbation configurables, règles d'escalade et suivi des SLAs.", ar: 'سلاسل موافقة قابلة للتكوين وقواعد تصعيد ومراقبة اتفاقيات الخدمة.' },
  },
  {
    icon: Layers,
    title: { en: 'Modular Architecture', fr: 'Architecture Modulaire', ar: 'بنية معيارية' },
    desc: { en: 'Activate only what you need. Scale from 3 users to 3,000 without rearchitecting.', fr: 'Activez uniquement ce dont vous avez besoin. Évolutif de 3 à 3000 utilisateurs.', ar: 'فعّل ما تحتاجه فقط. تدرج من 3 مستخدمين إلى 3000 دون إعادة هيكلة.' },
  },
]

/* ---------- Full Module Catalog (13 modules) ---------- */
const fullModules = [
  {
    slug: 'business-masters',
    icon: Building2,
    name: { en: 'Business Masters', fr: 'Business Masters', ar: 'البيانات المرجعية' },
    executive: { en: 'Clean master-data foundation for suppliers, customers, banks, currencies, and shared enterprise references.', fr: 'Base de données de référence propre pour fournisseurs, clients, banques, devises et références communes.', ar: 'أساس بيانات مرجعية موحد للموردين والعملاء والبنوك والعملات.' },
    details: [
      { en: 'Shared supplier & customer registries', fr: 'Référentiels fournisseurs/clients partagés', ar: 'سجلات موحدة للموردين والعملاء' },
      { en: 'Currency & exchange-rate governance', fr: 'Gouvernance devises et taux', ar: 'حوكمة العملات وأسعار الصرف' },
      { en: 'Cross-module item foundations', fr: 'Fondations articles transverses', ar: 'أساسيات موحدة للمواد' },
    ],
    screenshot: '/screenshots/3-grid-data.PNG',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    slug: 'general-ledger',
    icon: Landmark,
    name: { en: 'General Ledger', fr: 'Grand Livre', ar: 'دفتر الأستاذ العام' },
    executive: {
      en: 'Financial backbone for journal governance, posting discipline, and multi-currency reporting.',
      fr: 'Backbone financier pour gouvernance journaux, discipline comptabilisation et reporting multidevise.',
      ar: 'عمود مالي أساسي لحوكمة القيود وانضباط الترحيل والتقارير متعددة العملات.',
      es: 'Columna vertebral financiera para la gobernanza de asientos, disciplina contable e informes multidivisa.',
    },
    details: [
      { en: 'COA & account-combination governance', fr: 'Gouvernance plan de comptes', ar: 'حوكمة دليل الحسابات' },
      { en: 'Journal approvals & reversals', fr: 'Approbations journaux et contrepassation', ar: 'موافقات القيود والقيود العكسية' },
      { en: 'Trial balance & revaluation controls', fr: 'Contrôle balance et revalorisation', ar: 'ضبط ميزان المراجعة' },
    ],
    screenshot: '/screenshots/9-GL-Journals.PNG',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'accounts-payable',
    icon: Receipt,
    name: { en: 'Accounts Payable', fr: 'Comptes Fournisseurs', ar: 'الحسابات الدائنة' },
    executive: { en: 'Invoice-to-payment control with payable aging, liability visibility, and governed approvals.', fr: 'Contrôle facture-à-paiement avec ancienneté fournisseurs et visibilité passifs.', ar: 'تحكم من الفاتورة إلى السداد مع أعمار الدائنين ورؤية الالتزامات.' },
    details: [
      { en: 'Invoice validation & approval routing', fr: 'Validation facture et routage approbation', ar: 'التحقق من الفواتير وتوجيه الموافقات' },
      { en: 'Outstanding & aging analytics', fr: 'Analytique encours et ancienneté', ar: 'تحليلات الأرصدة والأعمار' },
      { en: 'Payment planning aligned with cash', fr: 'Planification paiements alignée trésorerie', ar: 'تخطيط المدفوعات مع الانضباط النقدي' },
    ],
    screenshot: '/screenshots/71-payable-volume-summary.PNG',
    color: 'from-orange-500 to-red-500',
  },
  {
    slug: 'accounts-receivable',
    icon: CreditCard,
    name: { en: 'Accounts Receivable', fr: 'Comptes Clients', ar: 'الحسابات المدينة' },
    executive: { en: 'Order-to-collection control for outstanding balances, aging risk, and collection speed.', fr: 'Contrôle commande-à-encaissement pour encours, risque ancienneté et vitesse de recouvrement.', ar: 'تحكم دورة الطلب إلى التحصيل للأرصدة القائمة ومخاطر الأعمار.' },
    details: [
      { en: 'Receivable transaction lifecycle', fr: 'Cycle transactions clients', ar: 'دورة معاملات العملاء' },
      { en: 'Aging & collection prioritization', fr: 'Priorisation recouvrement par ancienneté', ar: 'تحديد أولويات التحصيل' },
      { en: 'Customer risk visibility', fr: 'Visibilité risque client', ar: 'رؤية مخاطر العملاء' },
    ],
    screenshot: '/screenshots/81-receivable-volume-summary.PNG',
    color: 'from-violet-500 to-purple-600',
  },
  {
    slug: 'cash-management',
    icon: Wallet,
    name: { en: 'Cash Management', fr: 'Gestion De Trésorerie', ar: 'إدارة النقد' },
    executive: { en: 'Banking and liquidity control through statement processing, matching, reconciliation, and transfers.', fr: 'Contrôle bancaire et liquidité via traitement relevés, matching, rapprochement et transferts.', ar: 'تحكم مصرفي وسيولة عبر معالجة الكشوف والمطابقة والتسويات.' },
    details: [
      { en: 'Bank account governance', fr: 'Gouvernance comptes bancaires', ar: 'حوكمة الحسابات البنكية' },
      { en: 'Statement upload & reconciliation', fr: 'Import relevés et rapprochement', ar: 'رفع الكشوف والتسوية البنكية' },
      { en: 'Interest runs & GL transfers', fr: 'Calcul intérêts et transferts GL', ar: 'تشغيل الفوائد وتحويلات GL' },
    ],
    screenshot: '/screenshots/9-cash-manag-statement-upload.PNG',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    slug: 'petty-cash',
    icon: PiggyBank,
    name: { en: 'Petty Cash & Business Trips', fr: 'Petite Caisse Et Missions', ar: 'العهدة النقدية ورحلات العمل' },
    executive: { en: 'Controlled handling of business trip advances, petty cash settlements, and expense reconciliation.', fr: "Gestion contrôlée des avances de mission, règlements de petite caisse et rapprochements de dépenses.", ar: 'إدارة محكومة لسلف رحلات العمل وتسويات العهدة ومطابقة المصروفات.' },
    details: [
      { en: 'Trip request & approval workflows', fr: 'Workflows demande et approbation missions', ar: 'تدفقات طلب واعتماد الرحلات' },
      { en: 'Advance issuance & settlement', fr: 'Émission avances et règlement', ar: 'إصدار السلف وتسويتها' },
      { en: 'Reconciliation with policy controls', fr: 'Rapprochement avec contrôle politique', ar: 'مطابقة مع ضوابط السياسات' },
    ],
    screenshot: '/screenshots/6-petty-cash.PNG',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    slug: 'procure-to-pay',
    icon: DollarSign,
    name: { en: 'Procure To Pay (ETA)', fr: 'Procure To Pay (ETA)', ar: 'الشراء إلى السداد (ETA)' },
    executive: { en: 'Tax-compliant invoice exchange with ETA synchronization and cross-finance visibility.', fr: 'Échange de factures conforme fiscalement avec synchronisation ETA et visibilité finance transversale.', ar: 'تبادل فواتير متوافق ضريبياً مع مزامنة ETA ورؤية مالية مشتركة.' },
    details: [
      { en: 'ETA invoice synchronization', fr: 'Synchronisation factures ETA', ar: 'مزامنة الفواتير مع ETA' },
      { en: 'Tax status & exception follow-up', fr: 'Statuts fiscaux et suivi exceptions', ar: 'الحالات الضريبية ومتابعة الاستثناءات' },
      { en: 'AP/AR compliance summaries', fr: 'Synthèses conformité AP/AR', ar: 'ملخصات الامتثال في AP وAR' },
    ],
    screenshot: '/screenshots/882-eta-top-vendors.PNG',
    color: 'from-rose-500 to-pink-600',
  },
  {
    slug: 'inventory-management',
    icon: Boxes,
    name: { en: 'Inventory Management', fr: 'Gestion Des Stocks', ar: 'إدارة المخزون' },
    executive: { en: 'Real-time inventory control across warehouses, receipts, issues, returns, and on-hand visibility.', fr: 'Contrôle stock temps réel entre dépôts, réceptions, sorties, retours et visibilité on-hand.', ar: 'تحكم لحظي بالمخزون عبر المستودعات والاستلامات والصرف والمرتجعات.' },
    details: [
      { en: 'Warehouse & item administration', fr: 'Administration entrepôts et articles', ar: 'إدارة المستودعات والمواد' },
      { en: 'Receiving, delivery & return workflows', fr: 'Workflows réception, livraison, retours', ar: 'تدفقات الاستلام والتسليم والمرتجعات' },
      { en: 'Stock movement & valuation summaries', fr: 'Synthèses mouvement et valorisation', ar: 'ملخصات حركة المخزون والتقييم' },
    ],
    screenshot: '/screenshots/91-inventory-executive-summary-1.PNG',
    color: 'from-teal-500 to-green-600',
  },
  {
    slug: 'fixed-assets',
    icon: Landmark,
    name: { en: 'Fixed Assets', fr: 'Immobilisations', ar: 'الأصول الثابتة' },
    executive: { en: 'End-to-end asset lifecycle control from acquisition to depreciation, transfer, and retirement.', fr: 'Contrôle complet du cycle des actifs: acquisition, amortissement, transfert et sortie.', ar: 'تحكم كامل بدورة حياة الأصول من الاقتناء إلى الإهلاك والنقل والاستبعاد.' },
    details: [
      { en: 'Asset category & method setup', fr: 'Paramétrage catégories et méthodes', ar: 'تهيئة فئات الأصول والطرق' },
      { en: 'Depreciation scheduling & execution', fr: 'Planification et exécution amortissement', ar: 'جدولة الإهلاك وتشغيله' },
      { en: 'Asset-to-account reconciliation', fr: 'Rapprochement actif-comptes', ar: 'مطابقة الأصل مع الحسابات' },
    ],
    screenshot: '/screenshots/5-FA_Dashboard_2026-05-03.png',
    color: 'from-slate-500 to-gray-700',
  },
  {
    slug: 'human-resources',
    icon: Briefcase,
    name: { en: 'Human Resources & Payroll', fr: 'Ressources Humaines', ar: 'الموارد البشرية والرواتب' },
    executive: { en: 'Unified HR and payroll operations for attendance, leave, payroll runs, and compliance.', fr: 'Opérations RH et paie unifiées pour présence, congés, payroll et conformité.', ar: 'عمليات موارد بشرية ورواتب موحدة للحضور والإجازات وتشغيل الرواتب.' },
    details: [
      { en: 'Employee lifecycle management', fr: 'Gestion cycle employé', ar: 'إدارة دورة الموظف' },
      { en: 'Attendance, leave & overtime controls', fr: 'Contrôle présence, congés et heures supp', ar: 'ضبط الحضور والإجازات والعمل الإضافي' },
      { en: 'Payroll execution & statutory readiness', fr: 'Exécution paie et préparation statutaire', ar: 'تنفيذ الرواتب وجاهزية الالتزام' },
    ],
    screenshot: '/screenshots/93-HR_Dashboard_2026-05-03.png',
    color: 'from-indigo-500 to-blue-700',
  },
  {
    slug: 'shipment-management',
    icon: Truck,
    name: { en: 'Shipment Management', fr: 'Gestion Des Expéditions', ar: 'إدارة الشحنات' },
    executive: { en: 'Structured shipment planning and follow-up with status visibility across logistics milestones.', fr: 'Planification et suivi structurés des expéditions avec visibilité des statuts logistiques.', ar: 'تخطيط ومتابعة منظمة للشحنات مع رؤية واضحة للحالات اللوجستية.' },
    details: [
      { en: 'Shipment header & form operations', fr: 'Opérations entête et formulaire expédition', ar: 'عمليات رؤوس ونماذج الشحنات' },
      { en: 'Status-based dispatch & delivery tracking', fr: 'Suivi dispatch et livraison par statut', ar: 'تتبع الإرسال والتسليم' },
      { en: 'Operational reporting for fulfillment', fr: 'Reporting opérationnel fulfillment', ar: 'تقارير تشغيلية لفرق التنفيذ' },
    ],
    screenshot: '/screenshots/2-home-page.PNG',
    color: 'from-sky-500 to-cyan-600',
  },
  {
    slug: 'discrete-manufacturing',
    icon: Factory,
    name: { en: 'Discrete Manufacturing', fr: 'Fabrication Discrète', ar: 'التصنيع المتقطع' },
    executive: { en: 'Production planning and execution controls for orders, inspections, packing, and progress visibility.', fr: "Contrôle de planification/exécution production pour ordres, inspections, emballage et visibilité avancement.", ar: 'ضوابط تخطيط وتنفيذ الإنتاج للأوامر والفحص والتعبئة مع رؤية تقدم مستمرة.' },
    details: [
      { en: 'Production order & revision management', fr: 'Gestion ordres de production', ar: 'إدارة أوامر الإنتاج' },
      { en: 'Inspection & process follow-up', fr: 'Contrôle inspection et suivi process', ar: 'ضبط الفحص ومتابعة العمليات' },
      { en: 'Packing & completion tracking', fr: 'Suivi colisage et achèvement', ar: 'متابعة التعبئة والإكمال' },
    ],
    screenshot: '/screenshots/92-projects-gantt.PNG',
    color: 'from-orange-600 to-amber-700',
  },
  {
    slug: 'car-inspection',
    icon: Car,
    name: { en: 'Car Inspection', fr: 'Inspection Automobile', ar: 'فحص السيارات' },
    executive: { en: 'Inspection operations management with quality standards, pricing controls, and productivity reporting.', fr: 'Gestion opérations inspection avec standards qualité, contrôle tarifs et reporting productivité.', ar: 'إدارة عمليات الفحص بمعايير جودة وضبط تسعير وتقارير إنتاجية.' },
    details: [
      { en: 'Inspection type & pricing governance', fr: 'Gouvernance types inspection et tarification', ar: 'حوكمة أنواع الفحص والتسعير' },
      { en: 'Daily boards & transaction follow-up', fr: 'Tableaux journaliers et suivi transactions', ar: 'لوحات يومية ومتابعة المعاملات' },
      { en: 'Quality & productivity KPIs', fr: 'KPI qualité et productivité', ar: 'مؤشرات الجودة والإنتاجية' },
    ],
    screenshot: '/screenshots/4-chart-builder2.PNG',
    color: 'from-red-500 to-rose-700',
  },
]

/* ---------- Screenshot Gallery (grouped) ---------- */
const screenshotGallery = [
  { src: '/screenshots/2-home-page.PNG', title: { en: 'Unified Home Dashboard', fr: "Tableau de bord d'accueil", ar: 'لوحة رئيسية موحدة' }, category: { en: 'Platform', fr: 'Plateforme', ar: 'المنصة' } },
  { src: '/screenshots/4-chart-builder.PNG', title: { en: 'Interactive Chart Builder', fr: 'Générateur de graphiques', ar: 'منشئ الرسوم البيانية' }, category: { en: 'Analytics', fr: 'Analytique', ar: 'التحليلات' } },
  { src: '/screenshots/4-chart-builder2.PNG', title: { en: 'Advanced Chart Config', fr: 'Configuration graphiques avancée', ar: 'تهيئة متقدمة للرسوم البيانية' }, category: { en: 'Analytics', fr: 'Analytique', ar: 'التحليلات' } },
  { src: '/screenshots/5-FA_Dashboard_2026-05-03.png', title: { en: 'Fixed Assets Dashboard', fr: 'Tableau de bord immobilisations', ar: 'لوحة الأصول الثابتة' }, category: { en: 'Fixed Assets', fr: 'Immobilisations', ar: 'أصول ثابتة' } },
  { src: '/screenshots/93-HR_Dashboard_2026-05-03.png', title: { en: 'HR Executive Dashboard', fr: 'Tableau de bord RH', ar: 'لوحة الموارد البشرية' }, category: { en: 'HR & Payroll', fr: 'RH et Paie', ar: 'موارد بشرية' } },
  { src: '/screenshots/71-payable-volume-summary.PNG', title: { en: 'Payables Volume Summary', fr: 'Synthèse volume fournisseurs', ar: 'ملخص حجم المدفوعات' }, category: { en: 'Accounts Payable', fr: 'Fournisseurs', ar: 'الدائنون' } },
  { src: '/screenshots/72-payable-outstanding-summary.PNG', title: { en: 'Payables Outstanding', fr: 'Encours fournisseurs', ar: 'أرصدة المدفوعات' }, category: { en: 'Accounts Payable', fr: 'Fournisseurs', ar: 'الدائنون' } },
  { src: '/screenshots/73-payable-aging-summary.PNG', title: { en: 'Payables Aging Analysis', fr: 'Analyse ancienneté fournisseurs', ar: 'تحليل أعمار المدفوعات' }, category: { en: 'Accounts Payable', fr: 'Fournisseurs', ar: 'الدائنون' } },
  { src: '/screenshots/81-receivable-volume-summary.PNG', title: { en: 'Receivables Volume', fr: 'Volume clients', ar: 'حجم المقبوضات' }, category: { en: 'Accounts Receivable', fr: 'Clients', ar: 'المدينون' } },
  { src: '/screenshots/82-receivable-outstanding-summary.PNG', title: { en: 'Receivables Outstanding', fr: 'Encours clients', ar: 'أرصدة المقبوضات' }, category: { en: 'Accounts Receivable', fr: 'Clients', ar: 'المدينون' } },
  { src: '/screenshots/83-receivable-aging-summary.PNG', title: { en: 'Receivables Aging', fr: 'Analyse ancienneté clients', ar: 'أعمار المقبوضات' }, category: { en: 'Accounts Receivable', fr: 'Clients', ar: 'المدينون' } },
  { src: '/screenshots/881-eta-top-customers.PNG', title: { en: 'Top Customers Insights', fr: 'Insights top clients', ar: 'رؤى أهم العملاء' }, category: { en: 'ETA Integration', fr: 'Intégration ETA', ar: 'تكامل ETA' } },
  { src: '/screenshots/882-eta-top-vendors.PNG', title: { en: 'Top Vendors Insights', fr: 'Insights top fournisseurs', ar: 'رؤى أهم الموردين' }, category: { en: 'ETA Integration', fr: 'Intégration ETA', ar: 'تكامل ETA' } },
  { src: '/screenshots/9-cash-manag-statement-upload.PNG', title: { en: 'Bank Statement Upload', fr: 'Import relevé bancaire', ar: 'رفع الكشف البنكي' }, category: { en: 'Cash Management', fr: 'Trésorerie', ar: 'النقد' } },
  { src: '/screenshots/91-inventory-executive-summary-1.PNG', title: { en: 'Inventory Summary I', fr: 'Synthèse stock I', ar: 'ملخص المخزون ١' }, category: { en: 'Inventory', fr: 'Stocks', ar: 'المخزون' } },
  { src: '/screenshots/91-inventory-executive-summary-2.PNG', title: { en: 'Inventory Summary II', fr: 'Synthèse stock II', ar: 'ملخص المخزون ٢' }, category: { en: 'Inventory', fr: 'Stocks', ar: 'المخزون' } },
  { src: '/screenshots/92-projects-gantt.PNG', title: { en: 'Project Gantt Planner', fr: 'Planification Gantt', ar: 'مخطط المشاريع' }, category: { en: 'Manufacturing', fr: 'Fabrication', ar: 'التصنيع' } },
  { src: '/screenshots/6-petty-cash.PNG', title: { en: 'Petty Cash Operations', fr: 'Opérations petite caisse', ar: 'عمليات العهدة النقدية' }, category: { en: 'Petty Cash', fr: 'Petite caisse', ar: 'العهدة' } },
  { src: '/screenshots/7-outstanding-pays.PNG', title: { en: 'Outstanding Payables', fr: 'Fournisseurs en cours', ar: 'مدفوعات مستحقة' }, category: { en: 'Accounts Payable', fr: 'Fournisseurs', ar: 'الدائنون' } },
]

/* ---------- Stats ---------- */
const stats = [
  { value: '13+', label: { en: 'Core Modules', fr: 'Modules', ar: 'وحدة أساسية' } },
  { value: '99.9%', label: { en: 'Uptime SLA', fr: 'SLA Disponibilité', ar: 'وقت التشغيل' } },
  { value: '50+', label: { en: 'Executive Dashboards', fr: 'Tableaux Exécutifs', ar: 'لوحة تنفيذية' } },
  { value: '3x', label: { en: 'Faster Decisions', fr: 'Décisions Plus Rapides', ar: 'أسرع في القرارات' } },
]

/* ---------- Copy ---------- */
const copy = {
  en: {
    backToHome: 'Back To Home',
    heroEyebrow: 'Complete Product Tour',
    heroTitle: 'The Full EPIX Experience',
    heroSubtitle: 'One Platform. Every Module. Total Control.',
    heroDesc: 'Explore the complete EPIX ERP suite — from secure authentication to executive analytics. See how 13+ integrated modules work together to transform your enterprise operations.',
    heroCta: 'Book A Live Demo',
    stepsTitle: 'Your Journey Through EPIX',
    stepsSubtitle: 'Each step reveals how the platform serves your team with precision and clarity.',
    flowTitle: 'End-To-End Business Flow',
    flowSubtitle: 'One transaction flows seamlessly across the entire platform — no exports, no re-entry, no gaps.',
    diffTitle: 'What Makes EPIX Different',
    diffSubtitle: 'Built from the ground up for professional teams who demand reliability, transparency, and speed.',
    modulesTitle: 'Complete Module Suite',
    modulesSubtitle: 'Deep-dive into each domain. 13 integrated modules covering every aspect of enterprise operations.',
    galleryTitle: 'Product Screenshots',
    gallerySubtitle: 'Real screenshots from the live platform. Click any image for a detailed view.',
    ctaTitle: 'Ready To Experience EPIX?',
    ctaDesc: 'Schedule a personalized demo with our team and see how EPIX fits your business.',
    ctaButton: 'Book A Live Demo',
    ctaSecondary: 'Contact Sales',
    viewModule: 'View Module',
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    heroEyebrow: 'Visite Produit Complète',
    heroTitle: "L'Expérience EPIX Complète",
    heroSubtitle: 'Une Plateforme. Tous Les Modules. Contrôle Total.',
    heroDesc: "Explorez la suite ERP EPIX complète — de l'authentification sécurisée aux analyses exécutives. Découvrez comment 13+ modules intégrés transforment vos opérations.",
    heroCta: 'Réserver Une Démo',
    stepsTitle: 'Votre Parcours Dans EPIX',
    stepsSubtitle: 'Chaque étape révèle comment la plateforme sert votre équipe avec précision.',
    flowTitle: 'Flux Métier De Bout En Bout',
    flowSubtitle: 'Une transaction traverse la plateforme sans export, sans re-saisie, sans lacune.',
    diffTitle: 'Ce Qui Rend EPIX Différent',
    diffSubtitle: 'Conçu pour les équipes qui exigent fiabilité, transparence et rapidité.',
    modulesTitle: 'Suite Complète De Modules',
    modulesSubtitle: 'Plongez dans chaque domaine. 13 modules intégrés couvrant toute opération entreprise.',
    galleryTitle: "Captures D'Écran",
    gallerySubtitle: 'Captures réelles de la plateforme. Cliquez pour une vue détaillée.',
    ctaTitle: 'Prêt À Découvrir EPIX?',
    ctaDesc: "Planifiez une démo personnalisée et voyez comment EPIX s'adapte à votre entreprise.",
    ctaButton: 'Réserver Une Démo',
    ctaSecondary: "Contacter L'Équipe",
    viewModule: 'Voir Module',
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    heroEyebrow: 'جولة المنتج الكاملة',
    heroTitle: 'تجربة EPIX الكاملة',
    heroSubtitle: 'منصة واحدة. كل الوحدات. تحكم شامل.',
    heroDesc: 'استكشف مجموعة EPIX ERP الكاملة — من المصادقة الآمنة إلى التحليلات التنفيذية. اكتشف كيف تعمل 13+ وحدة متكاملة معاً لتحويل عملياتك.',
    heroCta: 'احجز عرضاً مباشراً',
    stepsTitle: 'رحلتك عبر EPIX',
    stepsSubtitle: 'كل خطوة تكشف كيف تخدم المنصة فريقك بدقة ووضوح.',
    flowTitle: 'تدفق الأعمال من البداية للنهاية',
    flowSubtitle: 'معاملة واحدة تتدفق عبر المنصة بالكامل — بدون تصدير أو إعادة إدخال أو فجوات.',
    diffTitle: 'ما يميز EPIX',
    diffSubtitle: 'مصمم من الأساس للفرق المحترفة التي تتطلب الموثوقية والشفافية والسرعة.',
    modulesTitle: 'مجموعة الوحدات الكاملة',
    modulesSubtitle: 'تعمق في كل مجال. 13 وحدة متكاملة تغطي جميع جوانب عمليات المؤسسة.',
    galleryTitle: 'لقطات المنتج',
    gallerySubtitle: 'لقطات حقيقية من المنصة. انقر على أي صورة لعرض تفصيلي.',
    ctaTitle: 'مستعد لتجربة EPIX؟',
    ctaDesc: 'جدولة عرض مخصص مع فريقنا وشاهد كيف يتناسب EPIX مع عملك.',
    ctaButton: 'احجز عرضاً مباشراً',
    ctaSecondary: 'تواصل مع المبيعات',
    viewModule: 'عرض الوحدة',
    close: 'إغلاق',
  },
}

const copyEs: typeof copy.en = {
  backToHome: 'Volver al inicio',
  heroEyebrow: 'Recorrido completo del producto',
  heroTitle: 'La experiencia completa EPIX',
  heroSubtitle: 'Una plataforma. Todos los módulos. Control total.',
  heroDesc: 'Explora toda la suite ERP de EPIX, desde autenticación segura hasta analítica ejecutiva en una experiencia integrada.',
  heroCta: 'Reservar demo en vivo',
  stepsTitle: 'Tu recorrido por EPIX',
  stepsSubtitle: 'Cada paso muestra cómo la plataforma sirve a tu equipo con precisión.',
  flowTitle: 'Flujo de negocio de punta a punta',
  flowSubtitle: 'Una transacción recorre toda la plataforma sin exportaciones ni retrabajo.',
  diffTitle: 'Qué hace diferente a EPIX',
  diffSubtitle: 'Diseñado para equipos profesionales que exigen velocidad y transparencia.',
  modulesTitle: 'Suite completa de módulos',
  modulesSubtitle: '13 módulos integrados para cubrir toda la operación empresarial.',
  galleryTitle: 'Capturas del producto',
  gallerySubtitle: 'Capturas reales de la plataforma en vivo.',
  ctaTitle: '¿Listo para vivir EPIX?',
  ctaDesc: 'Agenda una demo personalizada y descubre cómo EPIX se adapta a tu negocio.',
  ctaButton: 'Reservar demo en vivo',
  ctaSecondary: 'Contactar al equipo',
  viewModule: 'Ver módulo',
  close: 'Cerrar',
}
export function ProductTourPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null)
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? copyEs : copy[contentLang]
  const tr = (value: string) => (lang === 'es' ? moduleSpanishText(value) : value)
  const pick = (value: { en: string; fr: string; ar: string; es?: string }) => (lang === 'es' ? value.es ?? moduleSpanishText(value.en) : value[contentLang])

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main aria-label="Product tour content">
      <section aria-labelledby="tour-hero-heading" className="tour-hero relative overflow-hidden pb-20 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          {/* Back link */}
          <a href={`/?lang=${lang}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
            <ArrowRight size={14} className="rotate-180" />
            {t.backToHome}
          </a>

          {/* Hero content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-5xl"
          >
            <img src="/EPIX.png" alt="EPIX" className="mb-6 h-32 w-auto md:h-36 drop-shadow-md" />
            <span className="tour-eyebrow inline-flex items-center gap-2 rounded-full border border-[#c5d8ff] bg-gradient-to-r from-[#edf3ff] to-[#e8f8f8] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1d5df2]">
              <Play size={12} fill="currentColor" />
              {t.heroEyebrow}
            </span>
            <h1 id="tour-hero-heading" className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              {t.heroTitle}
            </h1>
            <p className="mt-3 font-display text-xl font-semibold text-[var(--brand)] md:text-2xl">
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

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
          >
            {stats.map((s) => (
              <div key={s.value} className="tour-stat-card rounded-2xl border border-[#d7e5ff]/60 bg-white/80 p-5 text-center shadow-sm backdrop-blur-sm">
                <div className="font-display text-3xl font-extrabold text-[var(--brand)] md:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">{pick(s.label)}</div>
              </div>
            ))}
          </motion.div>

          {/* Hero visual - screenshot mosaic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="tour-mosaic mt-14 grid grid-cols-3 gap-3 md:gap-5"
          >
            <div className="col-span-2 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-2xl">
              <SmartImage src="/screenshots/2-home-page.PNG" alt={tr('EPIX Dashboard')} className="h-full w-full object-cover object-top" loading="eager" fetchPriority="high" />
            </div>
            <div className="flex flex-col gap-3 md:gap-5">
              <div className="flex-1 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl">
                <SmartImage src="/screenshots/4-chart-builder.PNG" alt={tr('Chart Builder')} className="h-full w-full object-cover object-top" loading="eager" fetchPriority="high" />
              </div>
              <div className="flex-1 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl">
                <SmartImage src="/screenshots/93-HR_Dashboard_2026-05-03.png" alt={tr('HR Dashboard')} className="h-full w-full object-cover object-top" loading="eager" fetchPriority="high" />
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 flex justify-center"
          >
            <div className="flex flex-col items-center gap-2 text-xs font-medium text-[var(--text-muted)]">
              <span>{lang === 'ar' ? 'مرر للاستكشاف' : lang === 'fr' ? 'Défiler pour explorer' : lang === 'es' ? 'Desliza para explorar' : 'Scroll to explore'}</span>
              <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowDown size={16} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

          {/* SECTION 2: STEP-BY-STEP TOUR */}
      <section aria-labelledby="tour-steps-heading" className="tour-section-alt mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
            <span className="tour-section-badge inline-flex items-center gap-2 rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1d5df2]">
              <Eye size={12} /> {lang === 'ar' ? 'جولة داخل المنصة' : lang === 'fr' ? 'Parcours plateforme' : lang === 'es' ? 'Recorrido de la plataforma' : 'Platform Walkthrough'}
          </span>
          <h2 id="tour-steps-heading" className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{t.stepsTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.stepsSubtitle}</p>
        </motion.div>

        <div className="tour-steps-grid mt-16 space-y-10 md:space-y-0">
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
                className={`tour-step-card group grid items-center gap-6 md:grid-cols-2 md:gap-12 ${!isEven ? 'md:[direction:rtl]' : ''}`}
              >
                {/* Text side */}
                <div className={`space-y-4 ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-white shadow-lg">
                      <Icon size={22} />
                    </span>
                    <span className="rounded-full bg-gradient-to-r from-[#1d5df2] to-[#0ea5a8] px-4 py-1 text-xs font-bold text-white shadow-sm">{lang === 'es' ? `Paso ${idx + 1}` : step.badge}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold md:text-3xl">{pick(step.title)}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{pick(step.desc)}</p>
                </div>

                {/* Screenshot side */}
                <div className={`tour-step-screenshot relative overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-500 group-hover:scale-[1.02] ${!isEven ? 'md:[direction:ltr]' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setSelected({ src: step.screenshot, title: pick(step.title) })}
                    aria-label={lang === 'es' ? `Abrir captura ${pick(step.title)}` : `Open screenshot ${pick(step.title)}`}
                    className="block w-full"
                  >
                    <SmartImage
                      src={step.screenshot}
                      alt={pick(step.title)}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover object-top"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-[#0f2345]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

          {/* SECTION 3: END-TO-END FLOW */}
      <section aria-labelledby="tour-flow-heading" className="tour-flow-section relative overflow-hidden py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="tour-section-badge inline-flex items-center gap-2 rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1d5df2]">
              <Zap size={12} /> {lang === 'ar' ? 'تكامل سلس' : lang === 'fr' ? 'Intégration fluide' : lang === 'es' ? 'Integración fluida' : 'Seamless Integration'}
            </span>
            <h2 id="tour-flow-heading" className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{t.flowTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.flowSubtitle}</p>
          </motion.div>

          {/* Flow pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="tour-e2e-flow mt-14 flex flex-col items-center gap-0 md:flex-row md:justify-between"
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
                  <span className="mt-3 text-center text-xs font-semibold text-[var(--text)] md:text-sm">{pick(node.label)}</span>
                  {idx < e2eFlow.length - 1 && (
                    <div className="tour-e2e-connector my-2 h-6 w-0.5 bg-gradient-to-b from-[#1d5df2] to-[#0ea5a8] md:hidden" />
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* Supporting screenshots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-14 grid max-w-6xl gap-4 md:grid-cols-2"
          >
            <button type="button" aria-label={lang === 'es' ? 'Abrir captura de cuentas por pagar pendientes' : 'Open payables outstanding screenshot'} onClick={() => setSelected({ src: '/screenshots/72-payable-outstanding-summary.PNG', title: tr('Payables Outstanding') })} className="overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">
              <SmartImage src="/screenshots/72-payable-outstanding-summary.PNG" alt={tr('Payables flow')} loading="lazy" decoding="async" className="w-full object-cover object-top" />
            </button>
            <button type="button" aria-label={lang === 'es' ? 'Abrir captura de cuentas por cobrar pendientes' : 'Open receivables outstanding screenshot'} onClick={() => setSelected({ src: '/screenshots/82-receivable-outstanding-summary.PNG', title: tr('Receivables Outstanding') })} className="overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-xl transition-transform duration-300 hover:scale-[1.02]">
              <SmartImage src="/screenshots/82-receivable-outstanding-summary.PNG" alt={tr('Receivables flow')} loading="lazy" decoding="async" className="w-full object-cover object-top" />
            </button>
          </motion.div>
        </div>
      </section>

          {/* SECTION 4: COMPLETE MODULE SUITE (13 Modules) */}
      <section aria-labelledby="tour-modules-heading" className="tour-modules-mega-section py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="tour-section-badge inline-flex items-center gap-2 rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1d5df2]">
              <Layers size={12} /> {lang === 'ar' ? 'المجموعة الكاملة' : lang === 'fr' ? 'Suite complète' : lang === 'es' ? 'Suite completa' : 'Full Suite'}
            </span>
            <h2 id="tour-modules-heading" className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{t.modulesTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.modulesSubtitle}</p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {fullModules.map((mod, idx) => {
              const Icon = mod.icon
              return (
                <motion.div
                  key={mod.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: idx * 0.04, duration: 0.5 }}
                  className="tour-module-mega-card group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition-all duration-300 hover:border-[#a8c4ff] hover:shadow-2xl"
                >
                  {/* Screenshot header */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#f0f4ff] to-[#e8f8f8]">
                    <SmartImage
                      src={mod.screenshot}
                      alt={pick(mod.name)}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1e3d]/60 via-[#0a1e3d]/10 to-transparent" />
                    {/* Module icon badge */}
                    <div className={`absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} text-white shadow-lg`}>
                      <Icon size={20} />
                    </div>
                    {/* Click to zoom */}
                    <button
                      type="button"
                      onClick={() => setSelected({ src: mod.screenshot, title: pick(mod.name) })}
                      className="absolute inset-0 z-10"
                      aria-label={lang === 'es' ? `Ver captura de ${pick(mod.name)}` : `View ${mod.name.en} screenshot`}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold">{pick(mod.name)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{pick(mod.executive)}</p>
                    
                    {/* Feature bullets */}
                    <ul className="mt-4 space-y-2">
                      {mod.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                          <span>{pick(d)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* View module link */}
                    <a
                      href={`/modules/${mod.slug}?lang=${lang}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand)] transition-all hover:gap-2.5"
                    >
                      {t.viewModule}
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

          {/* SECTION 5: DIFFERENTIATORS */}
      <section aria-labelledby="tour-diff-heading" className="tour-diff-section py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="tour-section-badge inline-flex items-center gap-2 rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1d5df2]">
              <Star size={12} /> {lang === 'ar' ? 'لماذا EPIX' : lang === 'fr' ? 'Pourquoi EPIX' : lang === 'es' ? 'Por qué EPIX' : 'Why EPIX'}
            </span>
            <h2 id="tour-diff-heading" className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{t.diffTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.diffSubtitle}</p>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#edf3ff] to-[#e8f8f8] text-[#1d5df2] transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">{pick(diff.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{pick(diff.desc)}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

          {/* SECTION 6: SCREENSHOT GALLERY (ALL SCREENSHOTS) */}
      <section aria-labelledby="tour-gallery-heading" className="tour-gallery-section py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="tour-section-badge inline-flex items-center gap-2 rounded-full bg-[#edf3ff] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1d5df2]">
              <Monitor size={12} /> {lang === 'ar' ? 'المنصة الحية' : lang === 'fr' ? 'Plateforme en direct' : lang === 'es' ? 'Plataforma en vivo' : 'Live Platform'}
            </span>
            <h2 id="tour-gallery-heading" className="mt-4 font-display text-3xl font-extrabold md:text-5xl">{t.galleryTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--text-muted)] md:text-base">{t.gallerySubtitle}</p>
          </motion.div>

          <div className="tour-gallery-grid mt-14 columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
            {screenshotGallery.map((shot, idx) => (
              <motion.button
                key={shot.src}
                type="button"
                onClick={() => setSelected({ src: shot.src, title: pick(shot.title) })}
                aria-label={lang === 'es' ? `Abrir captura ${pick(shot.title)}` : `Open screenshot ${pick(shot.title)}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
                className="tour-gallery-item group relative w-full break-inside-avoid overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm transition-all duration-300 hover:border-[#a8c4ff] hover:shadow-xl"
              >
                <img
                  src={shot.src}
                  alt={pick(shot.title)}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1e3d]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="block text-left text-xs font-semibold text-white/80">{pick(shot.category)}</span>
                  <span className="block text-left text-sm font-bold text-white">{pick(shot.title)}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

          {/* SECTION 7: FINAL CTA */}
      <section aria-labelledby="tour-cta-heading" className="tour-cta-section relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-5 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="tour-cta-heading" className="font-display text-3xl font-extrabold md:text-5xl">{t.ctaTitle}</h2>
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

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'es' ? 'Listo para SOC 2' : 'SOC 2 Ready'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'es' ? '99.9% de disponibilidad' : '99.9% Uptime'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'es' ? 'Nivel empresarial' : 'Enterprise Grade'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'es' ? 'Multirregión' : 'Multi-Region'}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-500" /> {lang === 'es' ? 'Trazabilidad de auditoría completa' : 'Full Audit Trail'}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-500" /> {lang === 'es' ? 'Soporte 24/7' : '24/7 Support'}</span>
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
      </main>
    </div>
  )
}
