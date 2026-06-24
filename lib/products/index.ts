import type { Product, Category } from '../types';
import { campingProducts }       from './camping';
import { coffeeCookingProducts } from './coffeeCooking';
import { vehicleTravelProducts } from './vehicleTravel';
import { lightingPowerProducts } from './lightingPower';
import { sleepingProducts }      from './sleeping';
import { waterShowerProducts }    from './waterShowers';
import { sleepingComfortProducts }    from './sleepingComfort';
import { storageOrganizationProducts } from './storageOrganization';
import { safetyEmergencyProducts }     from './safetyEmergency';
import { fishingLeisureProducts }      from './fishingLeisure';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'קפה ובישול שטח',
    slug: 'camp-kitchen',
    description: 'מטבח שטח מושלם. קפה אמיתי, בישול מהיר, ציוד שנכנס לכל תיק.',
    productCount: coffeeCookingProducts.length,
    icon: 'utensils',
    accentColor: '#D6C2A1',
  },
  {
    id: 'cat-2',
    name: 'קמפינג וציוד שטח',
    slug: 'camping',
    description: 'ציוד קמפינג בסיסי ומתקדם. אוהלים, כיסאות, שולחנות, טרפים וכלי שטח.',
    productCount: campingProducts.length,
    icon: 'tent',
    accentColor: '#B8D4C8',
  },
  {
    id: 'cat-3',
    name: 'ציוד לרכבי שטח',
    slug: 'vehicle-gear',
    description: "ציוד לג'ימני, ג'יפ, הילוקס ו-D-Max. לחץ צמיגים, חילוץ, ארגון.",
    productCount: vehicleTravelProducts.length,
    icon: 'truck',
    accentColor: '#C4B8D4',
  },
  {
    id: 'cat-4',
    name: 'תאורה וחשמל',
    slug: 'lighting-power',
    description: 'פנסים, מנורות מחנה, לוחות סולאריים ומטענים ניידים לשטח.',
    productCount: lightingPowerProducts.length,
    icon: 'zap',
    accentColor: '#D4C8A8',
  },
  {
    id: 'cat-5',
    name: 'קמפינג ושינה',
    slug: 'sleeping',
    description: 'שינה ומנוחה בשטח. ערסלים, שקי שינה, ציוד לינה קל ומהיר.',
    productCount: sleepingProducts.length,
    icon: 'moon',
    accentColor: '#D4C8B8',
  },
  {
    id: 'cat-6',
    name: 'מים ומקלחות שטח',
    slug: 'water-showers',
    description: 'מקלחות שטח, פילטרי מים וציוד היגיינה לקמפינג ואוברלנדינג.',
    productCount: waterShowerProducts.length,
    icon: 'droplets',
    accentColor: '#A8C8D4',
  },
  {
    id: 'cat-7',
    name: 'שינה ונוחות',
    slug: 'sleeping-comfort',
    description: 'מזרני קמפינג, שקי שינה וכריות לשנת לילה מושלמת בטבע.',
    productCount: sleepingComfortProducts.length,
    icon: 'star',
    accentColor: '#C8B4D4',
  },
  {
    id: 'cat-8',
    name: 'אחסון וארגון',
    slug: 'storage-organization',
    description: 'שקים אטומים, שקי דחיסה וציוד ארגון לכל שטח ומזג אוויר.',
    productCount: storageOrganizationProducts.length,
    icon: 'package',
    accentColor: '#D4C4A8',
  },
  {
    id: 'cat-9',
    name: 'ביטחון וחירום',
    slug: 'safety-emergency',
    description: 'עזרה ראשונה, משואות חירום וכלי הישרדות לשטח.',
    productCount: safetyEmergencyProducts.length,
    icon: 'shield',
    accentColor: '#D4A8A8',
  },
  {
    id: 'cat-10',
    name: 'דיג ופנאי',
    slug: 'fishing-leisure',
    description: 'חכות, ארגזי דיג, שוו-אווי ומשקפות לשטח ולים.',
    productCount: fishingLeisureProducts.length,
    icon: 'fish',
    accentColor: '#A8C4D4',
  },
];

export const products: Product[] = [
  ...coffeeCookingProducts,
  ...campingProducts,
  ...vehicleTravelProducts,
  ...lightingPowerProducts,
  ...sleepingProducts,
  ...waterShowerProducts,
  ...sleepingComfortProducts,
  ...storageOrganizationProducts,
  ...safetyEmergencyProducts,
  ...fishingLeisureProducts,
];

if (process.env.NODE_ENV === 'development') {
  const seen = new Map<string, string>();
  for (const p of products) {
    const key = p.image.split('?')[0];
    if (seen.has(key)) {
      console.warn(`⚠️ Duplicate primary image: "${p.slug}" and "${seen.get(key)}" share ${key}`);
    } else {
      seen.set(key, p.slug);
    }
  }
}

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter(p => p.categorySlug === slug);
}

export function getBestSellers() {
  return products.filter(p => p.badge === 'bestseller');
}

export function getRelatedProducts(slugs: string[]) {
  return products.filter(p => slugs.includes(p.slug)).slice(0, 4);
}
