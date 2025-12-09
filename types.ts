export interface PricePoint {
  date: string;
  price: number;
}

export interface StoreOffer {
  storeName: string;
  storeLogo: string; // URL or placeholder text
  price: number;
  currency: string;
  buyUrl: string;
  condition: 'New' | 'Refurbished' | 'Used';
  shipping: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  offers: StoreOffer[];
  priceHistory: PricePoint[]; // For the chart
  specs: Record<string, string>;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  brands: string[];
  stores: string[];
}

export type ViewState = 'HOME' | 'SEARCH' | 'PRODUCT_DETAIL';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}