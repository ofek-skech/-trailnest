export interface SupplierResearchRow {
  id: string;
  product_slug: string;
  manufacturer_name: string | null;
  manufacturer_website: string | null;
  manufacturer_country: string | null;
  supplier_name: string | null;
  supplier_website: string | null;
  supplier_product_url: string | null;
  supplier_country: string | null;
  ships_to_israel: boolean;
  estimated_delivery: string | null;
  moq: number;
  retail_price_usd: number | null;
  cost_price_usd: number | null;
  shipping_cost_usd: number | null;
  status: 'verified' | 'needs_review' | 'not_available';
  research_notes: string | null;
  optimization: 'keep' | 'reprice' | 'replace' | 'remove' | null;
  recommended_price: number | null;
  alternatives: { name: string; url: string; reason: string }[] | null;
  optimization_notes: string | null;
  researched_at: string;
  updated_at: string;
}

export interface EnrichedProduct {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  research: SupplierResearchRow | null;
}

// USD → ILS exchange rate (approximate, June 2026)
export const USD_TO_ILS = 3.65;

export function calcLandedCostIls(row: SupplierResearchRow): number | null {
  if (row.cost_price_usd == null) return null;
  return Math.round(((row.cost_price_usd) + (row.shipping_cost_usd ?? 0)) * USD_TO_ILS);
}

export function calcMargin(sellingPriceIls: number, row: SupplierResearchRow): number | null {
  const cost = calcLandedCostIls(row);
  if (cost == null) return null;
  return Math.round(((sellingPriceIls - cost) / sellingPriceIls) * 100);
}
