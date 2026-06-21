import type { Product, Category } from '../types';
import { campingProducts }      from './camping';
import { coffeeCookingProducts } from './coffeeCooking';
import { vehicleTravelProducts } from './vehicleTravel';
import { lightingPowerProducts } from './lightingPower';
import { sleepingProducts }      from './sleeping';

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
];

export const products: Product[] = [
  ...coffeeCookingProducts,
  ...campingProducts,
  ...vehicleTravelProducts,
  ...lightingPowerProducts,
  ...sleepingProducts,
];

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
