import type { Product } from './types';

export interface Supplier {
  id: string;
  name: string;
  website: string | null;
  contact_email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductAdminData {
  id: string;
  product_slug: string;
  name: string | null;
  short_description: string | null;
  description: string | null;
  price: number | null;
  original_price: number | null;
  badge: string | null;
  brand: string | null;
  sku: string | null;
  in_stock: boolean | null;
  delivery_time: string | null;
  images: string[] | null;
  video_url: string | null;
  benefits: string[] | null;
  specs: Array<{ label: string; value: string }> | null;
  supplier_id: string | null;
  supplier_sku: string | null;
  supplier_product_url: string | null;
  supplier_cost_usd: number | null;
  supplier_shipping_usd: number | null;
  supplier_cost_price: number | null;
  supplier_contact_email: string | null;
  supplier_notes: string | null;
  hidden: boolean;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MergedProduct extends Product {
  supplier_id: string | null;
  supplier_name: string | null;
  supplier_website: string | null;
  supplier_contact_email: string | null;
  supplier_sku: string | null;
  supplier_product_url: string | null;
  supplier_cost_usd: number | null;
  supplier_shipping_usd: number | null;
  supplier_cost_price: number | null;
  supplier_notes: string | null;
  hidden: boolean;
  has_admin_data: boolean;
}

export function mergeProduct(
  base: Product,
  db: ProductAdminData | null,
  suppliers: Supplier[]
): MergedProduct {
  const supplier = suppliers.find(s => s.id === db?.supplier_id) ?? null;
  return {
    ...base,
    name:             db?.name             ?? base.name,
    shortDescription: (db?.short_description ?? (base as Product & { shortDescription: string }).shortDescription),
    description:      db?.description      ?? base.description,
    price:            db?.price            ?? base.price,
    originalPrice:    db?.original_price   ?? base.originalPrice,
    badge:            (db?.badge as Product['badge']) ?? base.badge,
    brand:            db?.brand            ?? base.brand,
    sku:              db?.sku              ?? base.sku,
    inStock:          db?.in_stock         ?? base.inStock,
    deliveryTime:     db?.delivery_time    ?? base.deliveryTime,
    image:            (db?.images?.[0])    ?? base.image,
    images:           db?.images           ?? base.images,
    videoUrl:         db?.video_url        !== undefined ? db.video_url : base.videoUrl,
    benefits:         db?.benefits         ?? base.benefits,
    specs:            db?.specs            ?? base.specs,
    // Supplier fields
    supplier_id:              db?.supplier_id              ?? null,
    supplier_name:            supplier?.name               ?? null,
    supplier_website:         supplier?.website            ?? null,
    supplier_contact_email:   db?.supplier_contact_email   ?? supplier?.contact_email ?? null,
    supplier_sku:             db?.supplier_sku             ?? null,
    supplier_product_url:     db?.supplier_product_url     ?? null,
    supplier_cost_usd:        db?.supplier_cost_usd        ?? null,
    supplier_shipping_usd:    db?.supplier_shipping_usd    ?? null,
    supplier_cost_price:      db?.supplier_cost_price      ?? null,
    supplier_notes:           db?.supplier_notes           ?? null,
    has_admin_data:           db !== null,
    hidden:                   db?.hidden ?? false,
  };
}

export function profitMargin(price: number, cost: number | null): number | null {
  if (!cost || cost <= 0) return null;
  return Math.round(((price - cost) / price) * 100);
}
