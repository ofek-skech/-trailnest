export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'new' | 'sale' | 'bestseller' | 'limited';
  shortDescription: string;
  description: string;
  benefits: string[];
  specs: ProductSpec[];
  faqs: ProductFAQ[];
  seoTitle: string;
  seoDescription: string;
  image: string;
  inStock: boolean;
  sku: string;
  tags?: string[];
  relatedSlugs?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  icon: string;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type CartAction =
  | { type: 'ADD_ITEM';        product: Product; quantity?: number }
  | { type: 'REMOVE_ITEM';     productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' };
