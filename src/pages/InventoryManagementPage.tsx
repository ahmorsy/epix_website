import { useState } from 'react'
import { motion } from 'framer-motion'
import { moduleEsObject, moduleEsText } from './moduleEs'
import { AccessibleImageModal } from '../components/AccessibleImageModal'
import { ArrowRight, Boxes, CheckCircle2 } from 'lucide-react'

type ContentLang = 'en' | 'fr' | 'ar'
type Lang = ContentLang | 'es'
type Localized = { en: string; fr: string; ar: string }
type Shot = { src: string; title: Localized; caption: Localized }

const copy = {
  en: {
    backToHome: 'Back To Home',
    title: 'Inventory Management For Real-Time Stock And Fulfillment Control',
    desc: 'EPIX Inventory Management coordinates warehouses, receipts, issues, returns, and on-hand visibility in one operational command layer.',
    capabilitiesTitle: 'Inventory Capabilities',
    capabilities: [
      'Warehouse and item master governance across locations.',
      'Purchase receiving, delivery, and return-to-supplier workflows.',
      'Material issue and return processing for internal operations.',
      'Inventory executive summary with movement and valuation insight.',
      'Transaction type controls for consistent stock governance.',
    ],
    flowTitle: 'Inventory Flow',
    flow: ['Plan and create purchase requests', 'Receive and validate stock', 'Allocate and issue materials', 'Process returns and adjustments', 'Track on-hand and executive KPIs'],
    galleryTitle: 'Inventory Screens',
    outcomesTitle: 'Business Outcomes',
    outcomes: ['Better stock accuracy', 'Lower stockouts and overstock', 'Stronger warehouse productivity'],
    close: 'Close',
  },
  fr: {
    backToHome: 'Retour Accueil',
    title: 'Gestion Des Stocks En Temps Reel Pour Le Controle Logistique',
    desc: 'La gestion des stocks EPIX orchestre depots, receptions, sorties, retours et visibilite des quantites dans une seule couche operationnelle.',
    capabilitiesTitle: 'Capacites Inventaire',
    capabilities: [
      'Gouvernance des entrepots et articles multi-sites.',
      'Receptions achats, livraisons et retours fournisseurs.',
      'Traitement des sorties et retours internes de matieres.',
      'Synthese executive avec mouvements et valorisation des stocks.',
      'Controle des types de transactions pour une gouvernance coherente.',
    ],
    flowTitle: 'Flux Inventaire',
    flow: ['Planifier les besoins', 'Recevoir et valider', 'Allouer et sortir', 'Traiter retours et ajustements', 'Suivre les KPI de stock'],
    galleryTitle: 'Ecrans Inventaire',
    outcomesTitle: 'Resultats Metier',
    outcomes: ['Stocks plus fiables', 'Moins de ruptures et surstocks', 'Productivite depot amelioree'],
    close: 'Fermer',
  },
  ar: {
    backToHome: 'العودة للرئيسية',
    title: 'إدارة مخزون لحظية للتحكم الكامل في المخازن والتوريد',
    desc: 'تنسق إدارة المخزون في EPIX المستودعات والاستلامات والصرف والمرتجعات ورؤية الكميات المتاحة ضمن طبقة تشغيل موحدة.',
    capabilitiesTitle: 'قدرات إدارة المخزون',
    capabilities: [
      'حوكمة المستودعات والمواد عبر المواقع المختلفة.',
      'تدفقات استلام المشتريات والتسليم والمرتجع للمورد.',
      'معالجة صرف المواد ومرتجعات التشغيل الداخلي.',
      'ملخص تنفيذي للمخزون مع رؤية الحركة والتقييم.',
      'ضبط أنواع المعاملات لضمان حوكمة موحدة للمخزون.',
    ],
    flowTitle: 'تدفق المخزون',
    flow: ['تخطيط الاحتياجات وطلبات الشراء', 'استلام المخزون والتحقق منه', 'تخصيص المواد وصرفها', 'معالجة المرتجعات والتسويات', 'متابعة الرصيد ومؤشرات الأداء'],
    galleryTitle: 'شاشات المخزون',
    outcomesTitle: 'نتائج الأعمال',
    outcomes: ['دقة أعلى في المخزون', 'خفض النواقص والفائض', 'تحسين إنتاجية المستودعات'],
    close: 'إغلاق',
  },
} as const

const shots: Shot[] = [
  {
    src: '/screenshots/91-inventory-executive-summary-1.PNG',
    title: { en: 'Inventory Executive Summary', fr: 'Synthese executive inventaire', ar: 'الملخص التنفيذي للمخزون' },
    caption: { en: 'Operational view of stock health and movement.', fr: 'Vue operationnelle de la sante et des mouvements du stock.', ar: 'عرض تشغيلي لصحة المخزون وحركته.' },
  },
  {
    src: '/screenshots/91-inventory-executive-summary-2.PNG',
    title: { en: 'Extended Inventory Summary', fr: 'Synthese inventaire etendue', ar: 'ملخص مخزون موسع' },
    caption: { en: 'Extended metrics for valuation and supply performance.', fr: 'Mesures etendues pour valorisation et performance supply.', ar: 'مؤشرات موسعة للتقييم وأداء سلسلة الإمداد.' },
  },
  {
    src: '/screenshots/3-grid-data.PNG',
    title: { en: 'Inventory Transaction Grid', fr: 'Grille transactions inventaire', ar: 'جدول معاملات المخزون' },
    caption: { en: 'Detailed line-level tracking for receipts and issues.', fr: 'Suivi detaille par ligne pour receptions et sorties.', ar: 'متابعة تفصيلية على مستوى البنود للاستلامات والصرف.' },
  },
]

export function InventoryManagementPage({ lang = 'en' }: { lang?: Lang }) {
  const [selected, setSelected] = useState<Shot | null>(null)
  const contentLang: ContentLang = lang === 'es' ? 'en' : lang
  const t = lang === 'es' ? moduleEsObject(copy.en) : copy[contentLang]
  const text = (value: string) => (lang === 'es' ? moduleEsText(value) : value)

  return (
    <div className={`min-h-screen bg-[var(--bg)] text-[var(--text)] ${lang === 'ar' ? 'lang-ar' : ''}`}>
      <main className="mx-auto w-full max-w-7xl px-5 pb-16 pt-10 md:px-8 md:pt-14">
        <div className="flex items-center justify-between">
          <a href={`/?lang=${lang}#modules`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:underline">
            <ArrowRight size={14} className="rotate-180" />
            {t.backToHome}
          </a>
          <a href={`/?lang=${lang}`}><img src="/EPIX.png" alt="EPIX" className="h-20 w-auto drop-shadow-sm" /></a>
        </div>

        <section className="module-hero mt-6 rounded-3xl border border-[#d7e4ff] p-7 md:p-10">
          <p className="relative text-xs font-bold uppercase tracking-[0.22em] text-[#3c67b7]">Inventory Management</p>
          <h1 className="relative mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">{t.title}</h1>
          <p className="relative mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)] md:text-base">{t.desc}</p>
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#d7e5ff] bg-white shadow-lg">
            <img
              src="/screenshots/91-inventory-executive-summary-1.PNG"
              alt="Inventory Executive Summary"
              loading="eager"
              decoding="async"
              className="h-52 w-full object-cover object-top md:h-64"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent" />
          </div>
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-2xl font-bold">{t.capabilitiesTitle}</h2>
            <ul className="mt-4 space-y-3">
              {t.capabilities.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-[var(--text-muted)]"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[var(--brand)]" /><span>{line}</span></li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="font-display text-2xl font-bold">{t.flowTitle}</h2>
            <div className="flow-pipeline mt-5">
              {t.flow.map((step, idx) => (
                <div key={step} className="flow-pipeline-step">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1d5df2] to-[#0ea5a8] text-xs font-bold text-white shadow-sm">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-medium text-[var(--text)]">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">{t.galleryTitle}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {shots.map((shot, index) => (
              <motion.article key={shot.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="screenshot-card group overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
                <button type="button" onClick={() => setSelected(shot)} className="block w-full text-left">
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#edf4ff]"><img src={shot.src} alt={text(shot.title[contentLang])} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]" /><div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f2345]/60 to-transparent" /><span className="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[#21457d]">INV</span></div>
                </button>
                <div className="p-4"><h3 className="font-display text-lg font-semibold">{text(shot.title[contentLang])}</h3><p className="mt-2 text-sm text-[var(--text-muted)]">{text(shot.caption[contentLang])}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d5e2ff] bg-gradient-to-r from-[#f7fbff] to-[#eef6ff] p-6">
          <div className="flex items-start gap-3"><Boxes className="mt-1 text-[var(--brand)]" /><div><h2 className="font-display text-2xl font-bold">{t.outcomesTitle}</h2><div className="mt-3 grid gap-3 md:grid-cols-3">{t.outcomes.map((item) => <div key={item} className="rounded-xl border border-[#dbe7ff] bg-white px-4 py-3 text-sm text-[var(--text-muted)]">{item}</div>)}</div></div></div>
        </section>
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
