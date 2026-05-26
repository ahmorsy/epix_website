export type LocalizedText = {
  en: string
  fr: string
  ar: string
}

export type ModuleCatalogItem = {
  slug: string
  name: LocalizedText
  executive: LocalizedText
  details: [LocalizedText, LocalizedText, LocalizedText]
}

const t = (en: string, fr: string, ar: string): LocalizedText => ({ en, fr, ar })

export const moduleCatalog: ModuleCatalogItem[] = [
  {
    slug: 'business-masters',
    name: t('Business Masters', 'Business Masters', 'البيانات المرجعية للأعمال'),
    executive: t(
      'A clean master-data foundation for suppliers, customers, banks, currencies, and shared enterprise references.',
      'Une base de donnees de reference propre pour fournisseurs, clients, banques, devises et references communes.',
      'أساس بيانات مرجعية موحد ونظيف للموردين والعملاء والبنوك والعملات والمرجعيات المشتركة.',
    ),
    details: [
      t('Shared supplier and customer registries across modules.', 'Referentiels fournisseurs et clients partages.', 'سجلات موحدة للموردين والعملاء عبر الوحدات.'),
      t('Currency, exchange-rate, and bank master governance.', 'Gouvernance devises, taux et banques.', 'حوكمة العملات وأسعار الصرف وبيانات البنوك.'),
      t('Cross-module item and warehouse foundations.', 'Fondations articles et entrepots transverses.', 'أساسيات موحدة للمواد والمستودعات عبر النظام.'),
    ],
  },
  {
    slug: 'petty-cash',
    name: t('Petty Cash And Business Trips', 'Petite Caisse Et Missions', 'العهدة النقدية ورحلات العمل'),
    executive: t(
      'Controlled handling of business trip advances, petty cash settlements, and expense reconciliation.',
      'Gestion controlee des avances de mission, reglements de petite caisse et rapprochements de depenses.',
      'إدارة محكومة لسلف رحلات العمل وتسويات العهدة ومطابقة المصروفات.',
    ),
    details: [
      t('Business trip request and approval workflows.', 'Workflows de demande et approbation des missions.', 'تدفقات طلب واعتماد رحلات العمل.'),
      t('Advance issuance and settlement tracking.', 'Suivi emission avances et reglement.', 'تتبع إصدار السلف وتسويتها.'),
      t('Petty cash reconciliation with policy controls.', 'Rapprochement caisse avec controle politique.', 'مطابقة العهدة النقدية مع ضوابط السياسات.'),
    ],
  },
  {
    slug: 'procure-to-pay',
    name: t('Procure To Pay (ETA Integration)', 'Procure To Pay (Integration ETA)', 'الشراء إلى السداد (تكامل ETA)'),
    executive: t(
      'Tax-compliant invoice exchange with ETA synchronization and cross-finance visibility.',
      'Echange de factures conforme fiscalement avec synchronisation ETA et visibilite finance transversale.',
      'تبادل فواتير متوافق ضريبيا مع مزامنة ETA ورؤية مالية مشتركة.',
    ),
    details: [
      t('ETA received and submitted invoice synchronization.', 'Synchronisation factures recues et soumises ETA.', 'مزامنة الفواتير المستلمة والمرسلة مع ETA.'),
      t('Tax status visibility with exception follow-up.', 'Visibilite statuts fiscaux et suivi exceptions.', 'رؤية الحالات الضريبية ومتابعة الاستثناءات.'),
      t('Connected AP/AR executive compliance summaries.', 'Syntheses executives conformite AP/AR.', 'ملخصات تنفيذية مترابطة للامتثال في AP وAR.'),
    ],
  },
  {
    slug: 'accounts-payable',
    name: t('Accounts Payable', 'Comptes Fournisseurs', 'الحسابات الدائنة'),
    executive: t(
      'Invoice-to-payment control with payable aging, liability visibility, and governed approvals.',
      'Controle facture-a-paiement avec anciennete fournisseurs, visibilite passifs et approvals gouvernes.',
      'تحكم من الفاتورة إلى السداد مع أعمار الدائنين ورؤية الالتزامات وموافقات محكومة.',
    ),
    details: [
      t('Invoice validation and approval routing.', 'Validation facture et routage approbation.', 'التحقق من الفواتير وتوجيه الموافقات.'),
      t('Outstanding and aging analytics for AP.', 'Analytique encours et anciennete fournisseurs.', 'تحليلات الأرصدة والأعمار للحسابات الدائنة.'),
      t('Payment planning aligned with cash discipline.', 'Planification paiements alignee tresorerie.', 'تخطيط المدفوعات بما يتماشى مع الانضباط النقدي.'),
    ],
  },
  {
    slug: 'accounts-receivable',
    name: t('Accounts Receivable', 'Comptes Clients', 'الحسابات المدينة'),
    executive: t(
      'Order-to-collection control for outstanding balances, aging risk, and collection speed.',
      'Controle commande-a-encaissement pour encours, risque anciennete et vitesse de recouvrement.',
      'تحكم دورة الطلب إلى التحصيل للأرصدة القائمة ومخاطر الأعمار وسرعة التحصيل.',
    ),
    details: [
      t('Receivable transaction and receipt lifecycle.', 'Cycle transactions clients et encaissements.', 'دورة معاملات العملاء والتحصيلات.'),
      t('Aging and outstanding collection prioritization.', 'Priorisation recouvrement par anciennete.', 'تحديد أولويات التحصيل حسب الأعمار.'),
      t('Customer risk visibility for revenue planning.', 'Visibilite risque client pour planification revenus.', 'رؤية مخاطر العملاء لدعم تخطيط الإيرادات.'),
    ],
  },
  {
    slug: 'inventory-management',
    name: t('Inventory Management', 'Gestion Des Stocks', 'إدارة المخزون'),
    executive: t(
      'Real-time inventory control across warehouses, receipts, issues, returns, and on-hand visibility.',
      'Controle stock temps reel entre depots, receptions, sorties, retours et visibilite on-hand.',
      'تحكم لحظي بالمخزون عبر المستودعات والاستلامات والصرف والمرتجعات ورؤية الرصيد المتاح.',
    ),
    details: [
      t('Warehouse and item master administration.', 'Administration entrepots et articles.', 'إدارة البيانات الأساسية للمستودعات والمواد.'),
      t('Receiving, delivery, and return workflows.', 'Workflows reception, livraison, retours.', 'تدفقات الاستلام والتسليم والمرتجعات.'),
      t('Executive summaries for stock movement and valuation.', 'Syntheses executives mouvement et valorisation.', 'ملخصات تنفيذية لحركة المخزون والتقييم.'),
    ],
  },
  {
    slug: 'shipment-management',
    name: t('Shipment Management', 'Gestion Des Expeditions', 'إدارة الشحنات'),
    executive: t(
      'Structured shipment planning and follow-up with status visibility across logistics milestones.',
      'Planification et suivi structures des expeditions avec visibilite des statuts logistiques.',
      'تخطيط ومتابعة منظمة للشحنات مع رؤية واضحة للحالات اللوجستية.',
    ),
    details: [
      t('Shipment header and form operations.', 'Operations entete et formulaire expedition.', 'عمليات رؤوس ونماذج الشحنات.'),
      t('Status-based dispatch and delivery tracking.', 'Suivi dispatch et livraison par statut.', 'تتبع الإرسال والتسليم حسب الحالة.'),
      t('Operational reporting for fulfillment teams.', 'Reporting operationnel fulfillment.', 'تقارير تشغيلية لفرق التنفيذ.'),
    ],
  },
  {
    slug: 'discrete-manufacturing',
    name: t('Discrete Manufacturing', 'Fabrication Discrete', 'التصنيع المتقطع'),
    executive: t(
      'Production planning and execution controls for orders, inspections, packing, and progress visibility.',
      'Controle de planification/execution production pour ordres, inspections, emballage et visibilite avancement.',
      'ضوابط تخطيط وتنفيذ الإنتاج للأوامر والفحص والتعبئة مع رؤية تقدم مستمرة.',
    ),
    details: [
      t('Production order and revision management.', 'Gestion ordres de production et revisions.', 'إدارة أوامر الإنتاج ومراجعاتها.'),
      t('Inspection and process follow-up controls.', 'Controle inspection et suivi process.', 'ضبط الفحص ومتابعة العمليات الإنتاجية.'),
      t('Packing list and completion performance tracking.', 'Suivi colisage et performance achevement.', 'متابعة التعبئة ومؤشرات الإكمال.'),
    ],
  },
  {
    slug: 'general-ledger',
    name: t('General Ledger', 'Grand Livre', 'دفتر الأستاذ العام'),
    executive: t(
      'Financial backbone for journal governance, posting discipline, and multi-currency reporting.',
      'Backbone financier pour gouvernance journaux, discipline comptabilisation et reporting multidevise.',
      'عمود مالي أساسي لحوكمة القيود وانضباط الترحيل والتقارير متعددة العملات.',
    ),
    details: [
      t('COA and account-combination governance.', 'Gouvernance plan de comptes et combinaisons.', 'حوكمة دليل الحسابات وتركيبات الحسابات.'),
      t('Journal approvals, posting, and reversals.', 'Approvals journaux, comptabilisation, contrepassation.', 'موافقات القيود والترحيل والقيود العكسية.'),
      t('Trial balance and revaluation controls.', 'Controle balance et revalorisation.', 'ضبط ميزان المراجعة وإعادة التقييم.'),
    ],
  },
  {
    slug: 'fixed-assets',
    name: t('Fixed Assets', 'Immobilisations', 'الأصول الثابتة'),
    executive: t(
      'End-to-end asset lifecycle control from acquisition to depreciation, transfer, and retirement.',
      'Controle complet du cycle des actifs: acquisition, amortissement, transfert et sortie.',
      'تحكم كامل بدورة حياة الأصول من الاقتناء إلى الإهلاك والنقل والاستبعاد.',
    ),
    details: [
      t('Asset category, location, and method setup.', 'Parametrage categories, emplacements, methodes.', 'تهيئة فئات الأصول والمواقع والطرق.'),
      t('Depreciation scheduling and execution.', 'Planification et execution amortissement.', 'جدولة الإهلاك وتشغيله.'),
      t('Asset-to-account reconciliation visibility.', 'Visibilite rapprochement actif-comptes.', 'رؤية واضحة لمطابقة الأصل مع الحسابات.'),
    ],
  },
  {
    slug: 'car-inspection',
    name: t('Car Inspection', 'Inspection Automobile', 'فحص السيارات'),
    executive: t(
      'Inspection operations management with quality standards, pricing controls, and productivity reporting.',
      'Gestion operations inspection avec standards qualite, controle tarifs et reporting productivite.',
      'إدارة عمليات الفحص بمعايير جودة وضبط تسعير وتقارير إنتاجية.',
    ),
    details: [
      t('Inspection type and pricing governance.', 'Gouvernance types inspection et tarification.', 'حوكمة أنواع الفحص والتسعير.'),
      t('Daily boards and transaction follow-up.', 'Tableaux journaliers et suivi transactions.', 'لوحات يومية ومتابعة المعاملات.'),
      t('Quality and productivity KPI reporting.', 'Reporting KPI qualite et productivite.', 'تقارير مؤشرات الجودة والإنتاجية.'),
    ],
  },
  {
    slug: 'human-resources',
    name: t('Human Resources', 'Ressources Humaines', 'الموارد البشرية'),
    executive: t(
      'Unified HR and payroll operations for attendance, leave, payroll runs, and compliance.',
      'Operations RH et paie unifiees pour presence, conges, payroll et conformite.',
      'عمليات موارد بشرية ورواتب موحدة للحضور والإجازات وتشغيل الرواتب والالتزام.',
    ),
    details: [
      t('Employee lifecycle and org-structure management.', 'Gestion cycle employe et structure orga.', 'إدارة دورة الموظف والهيكل التنظيمي.'),
      t('Attendance, leave, and overtime controls.', 'Controle presence, conges et heures supp.', 'ضبط الحضور والإجازات والعمل الإضافي.'),
      t('Payroll execution and statutory readiness.', 'Execution paie et preparation statutaire.', 'تنفيذ الرواتب وجاهزية الالتزام النظامي.'),
    ],
  },
  {
    slug: 'cash-management',
    name: t('Cash Management', 'Gestion De Tresorerie', 'إدارة النقد'),
    executive: t(
      'Banking and liquidity control through statement processing, matching, reconciliation, and transfers.',
      'Controle bancaire et liquidite via traitement releves, matching, rapprochement et transferts.',
      'تحكم مصرفي وسيولة عبر معالجة الكشوف والمطابقة والتسويات والتحويلات.',
    ),
    details: [
      t('Bank account and agreement governance.', 'Gouvernance comptes et accords bancaires.', 'حوكمة الحسابات والاتفاقيات البنكية.'),
      t('Statement upload, matching, and reconciliation.', 'Import releves, matching et rapprochement.', 'رفع الكشوف والمطابقة والتسوية البنكية.'),
      t('Interest runs and GL transfer visibility.', 'Calcul interets et visibilite transferts GL.', 'تشغيل الفوائد ورؤية تحويلات GL.'),
    ],
  },
]
