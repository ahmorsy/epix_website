import type { ModuleCatalogItem } from '../pages/moduleCatalog'
import type { Lang, SeoConfig } from './types'
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createOrganizationSchema,
  createProductSchema,
  createServiceSchema,
  createSoftwareApplicationSchema,
  createWebSiteSchema,
  SITE_URL,
  toLocalizedUrl,
} from './seoUtils'

const homeCopy: Record<Lang, { title: string; description: string }> = {
  en: {
    title: 'EPIX ERP | AI-Powered Enterprise ERP Platform',
    description:
      'Enterprise ERP software for finance, operations, HR, inventory, and manufacturing. Built for Africa, Europe, GCC, and global organizations.',
  },
  fr: {
    title: 'EPIX ERP | Plateforme ERP Entreprise IA',
    description:
      'Logiciel ERP entreprise pour finance, operations, RH, inventaire et fabrication. Concu pour Afrique, Europe, GCC et marches globaux.',
  },
  ar: {
    title: 'EPIX ERP | منصة ERP مؤسسية مدعومة بالذكاء الاصطناعي',
    description:
      'برنامج ERP للمؤسسات يغطي المالية والعمليات والموارد البشرية والمخزون والتصنيع للاسواق في افريقيا واوروبا والشرق الاوسط.',
  },
  es: {
    title: 'EPIX ERP | Plataforma ERP Empresarial con IA',
    description:
      'Software ERP empresarial para finanzas, operaciones, RRHH, inventario y manufactura. Diseñado para Africa, Europa, GCC y mercados globales.',
  },
}

const globalFaqByLang: Record<Lang, Array<{ question: string; answer: string }>> = {
  en: [
    {
      question: 'What is ERP software?',
      answer: 'ERP software unifies finance, operations, inventory, HR, and reporting in one connected system.',
    },
    {
      question: 'What is AI-powered ERP?',
      answer: 'AI-powered ERP uses machine learning and business rules to automate workflows, detect risks, and improve decisions.',
    },
    {
      question: 'How does ERP help enterprise companies?',
      answer: 'ERP helps enterprise teams standardize processes, increase visibility, and improve operational control across branches.',
    },
  ],
  fr: [
    {
      question: 'Qu est-ce qu un logiciel ERP ?',
      answer: 'Un ERP unifie finance, operations, inventaire, RH et reporting dans un systeme connecte.',
    },
    {
      question: 'Qu est-ce qu un ERP avec IA ?',
      answer: 'Un ERP avec IA automatise les workflows, detecte les risques et renforce la prise de decision.',
    },
    {
      question: 'Comment un ERP aide une entreprise ?',
      answer: 'Un ERP standardise les processus, augmente la visibilite et ameliore le controle multi-sites.',
    },
  ],
  ar: [
    {
      question: 'ما هو نظام ERP؟',
      answer: 'نظام ERP يوحد المالية والعمليات والمخزون والموارد البشرية والتقارير في منصة واحدة مترابطة.',
    },
    {
      question: 'ما هو ERP المدعوم بالذكاء الاصطناعي؟',
      answer: 'هو نظام ERP يستخدم الذكاء الاصطناعي لاتمتة سير العمل وتحسين القرار وكشف المخاطر بشكل مبكر.',
    },
    {
      question: 'كيف يساعد ERP الشركات الكبرى؟',
      answer: 'يساعد ERP الشركات على توحيد العمليات وزيادة الرؤية وتحسين التحكم بين الفروع.',
    },
  ],
  es: [
    {
      question: 'Que es un software ERP?',
      answer: 'Un ERP unifica finanzas, operaciones, inventario, RRHH y reportes en un sistema conectado.',
    },
    {
      question: 'Que es un ERP con IA?',
      answer: 'Un ERP con IA automatiza flujos, detecta riesgos y mejora la toma de decisiones.',
    },
    {
      question: 'Como ayuda un ERP a empresas grandes?',
      answer: 'Un ERP estandariza procesos, aumenta visibilidad y mejora el control operativo entre sucursales.',
    },
  ],
}

function getBaseSchemas(lang: Lang) {
  return [createOrganizationSchema(lang), createWebSiteSchema(lang), createSoftwareApplicationSchema(lang), createProductSchema(lang), createServiceSchema(lang)]
}

export function getPageSeo(path: string, lang: Lang, pageModule?: ModuleCatalogItem): SeoConfig {
  const normalized = path.toLowerCase()

  if (normalized === '/' || normalized === '') {
    const copy = homeCopy[lang]
    return {
      title: copy.title,
      description: copy.description,
      path: '/',
      locale: lang,
      keywords: [
        'erp software',
        'ai powered erp',
        'enterprise erp platform',
        'erp africa',
        'erp middle east',
        'erp europe',
      ],
      schemas: [...getBaseSchemas(lang), createFaqSchema(globalFaqByLang[lang])],
    }
  }

  if (normalized === '/blog') {
    return {
      title: 'EPIX ERP Blog | ERP Strategy, AI, and Digital Transformation',
      description: 'Educational ERP articles for enterprise leaders on implementation, AI transformation, manufacturing, and regional strategy.',
      path: '/blog',
      locale: lang,
      keywords: ['erp blog', 'erp implementation', 'ai erp', 'digital transformation'],
      schemas: [
        ...getBaseSchemas(lang),
        createBreadcrumbSchema([
          { name: 'Home', url: toLocalizedUrl('/', lang) },
          { name: 'Blog', url: toLocalizedUrl('/blog', lang) },
        ]),
      ],
    }
  }

  if (normalized.startsWith('/modules/') && pageModule) {
    const moduleName = lang === 'ar' ? pageModule.name.ar : lang === 'fr' ? pageModule.name.fr : pageModule.name.en
    return {
      title: `EPIX ${moduleName} | ERP Module`,
      description: `Explore EPIX ${moduleName} module capabilities, process controls, business flows, and measurable outcomes for enterprise operations.`,
      path: normalized,
      locale: lang,
      keywords: ['erp modules', moduleName, 'enterprise workflows', 'operational control'],
      schemas: [
        ...getBaseSchemas(lang),
        createBreadcrumbSchema([
          { name: 'Home', url: toLocalizedUrl('/', lang) },
          { name: 'Modules', url: toLocalizedUrl('/', lang) + '#modules' },
          { name: moduleName, url: `${SITE_URL}${normalized}` },
        ]),
      ],
    }
  }

  if (normalized === '/ai' || normalized === '/ai-capabilities') {
    return {
      title: 'EPIX AI Capabilities | AI ERP for Enterprise Decisions',
      description: 'See how EPIX AI capabilities deliver analytics, workflow automation, and cross-module intelligence for enterprise performance.',
      path: normalized,
      locale: lang,
      keywords: ['ai erp', 'erp analytics', 'workflow automation'],
      schemas: [
        ...getBaseSchemas(lang),
        createFaqSchema(globalFaqByLang[lang]),
      ],
    }
  }

  if (normalized === '/tour' || normalized === '/product-tour') {
    return {
      title: 'EPIX Product Tour | Enterprise ERP Workflow Experience',
      description: 'Take the EPIX ERP product tour and explore how integrated workflows improve finance, operations, and manufacturing execution.',
      path: normalized,
      locale: lang,
      keywords: ['erp product tour', 'enterprise workflow automation', 'erp demo'],
      schemas: getBaseSchemas(lang),
    }
  }

  return {
    title: homeCopy[lang].title,
    description: homeCopy[lang].description,
    path: normalized || '/',
    locale: lang,
    schemas: getBaseSchemas(lang),
  }
}
