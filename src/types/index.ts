export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  availableSizes: string[];
  colors: string[];
  category: string;
  stockQuantity: number;
  images: string[]; // URLs to images
  brand?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string; // URL to image
}

export interface Filters {
  category: string;
  priceRange: [number, number];
  size: string;
  searchQuery?: string;
}
