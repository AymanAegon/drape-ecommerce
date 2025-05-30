import type { Product, CartItem } from '@/types';
import { db, auth } from "../components/Auth/firebase";
import { collection, getDocs } from 'firebase/firestore';

const fetchProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const productsSnapshot = await getDocs(productsRef);
    const productsData = productsSnapshot.docs.map(doc => {return {id: doc.id ,...doc.data()}});
    return productsData as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  return [];
};

export const products: Product[] = await fetchProducts();


export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton Tee',
    description: 'A timeless classic, perfect for everyday wear. Made from 100% premium cotton.',
    price: 29.99,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy'],
    category: 'T-Shirts',
    stock: 150,
    images: ['https://placehold.co/600x800.png?text=Tee+Front', 'https://placehold.co/600x800.png?text=Tee+Back'],
    brand: 'Drape Basics'
  },
  {
    id: '2',
    name: 'Slim Fit Denim Jeans',
    description: 'Modern slim fit jeans crafted for comfort and style. Versatile for any occasion.',
    price: 79.99,
    sizes: ['30W/32L', '32W/32L', '34W/32L'],
    colors: ['Indigo Blue', 'Washed Black'],
    category: 'Jeans',
    stock: 80,
    images: ['https://placehold.co/600x800.png?text=Jeans+Front', 'https://placehold.co/600x800.png?text=Jeans+Detail'],
    brand: 'Drape Denim Co.'
  },
  {
    id: '3',
    name: 'Merino Wool Sweater',
    description: 'Luxuriously soft merino wool sweater, ideal for cooler weather. Features a crew neck.',
    price: 99.50,
    sizes: ['M', 'L', 'XL'],
    colors: ['Charcoal Gray', 'Forest Green', 'Burgundy'],
    category: 'Sweaters',
    stock: 60,
    images: ['https://placehold.co/600x800.png?text=Sweater+Front', 'https://placehold.co/600x800.png?text=Sweater+Texture'],
    brand: 'Drape Premium'
  },
  {
    id: '4',
    name: 'Linen Blend Shirt',
    description: 'Lightweight and breathable linen blend shirt, perfect for warm days. Button-down collar.',
    price: 59.00,
    sizes: ['S', 'M', 'L'],
    colors: ['Sky Blue', 'White', 'Sand'],
    category: 'Shirts',
    stock: 100,
    images: ['https://placehold.co/600x800.png?text=Shirt+Front', 'https://placehold.co/600x800.png?text=Shirt+Collar'],
    brand: 'Drape Casuals'
  },
  {
    id: '5',
    name: 'Performance Chinos',
    description: 'Versatile performance chinos with stretch fabric for all-day comfort and mobility.',
    price: 69.99,
    sizes: ['30W', '32W', '34W', '36W'],
    colors: ['Khaki', 'Navy', 'Olive'],
    category: 'Pants',
    stock: 90,
    images: ['https://placehold.co/600x800.png?text=Chinos+Front', 'https://placehold.co/600x800.png?text=Chinos+Pocket'],
    brand: 'Drape Active'
  },
  {
    id: '6',
    name: 'Hooded Parka Jacket',
    description: 'Water-resistant hooded parka, designed to keep you warm and dry in inclement weather.',
    price: 149.99,
    sizes: ['M', 'L', 'XL'],
    colors: ['Black', 'Olive Green'],
    category: 'Jackets',
    stock: 40,
    images: ['https://placehold.co/600x800.png?text=Parka+Front', 'https://placehold.co/600x800.png?text=Parka+Hood'],
    brand: 'Drape Outerwear'
  },
];

export const mockCartItems: CartItem[] = [
  {
    productId: '1',
    name: 'Classic Cotton Tee',
    price: 29.99,
    quantity: 2,
    size: 'M',
    color: 'White',
    image: 'https://placehold.co/100x100.png?text=Tee',
  },
  {
    productId: '2',
    name: 'Slim Fit Denim Jeans',
    price: 79.99,
    quantity: 1,
    size: '32W/32L',
    color: 'Indigo Blue',
    image: 'https://placehold.co/100x100.png?text=Jeans',
  },
];

export const categories = ['All', ...new Set(mockProducts.map(p => p.category))];
export const sizes = ['All', ...new Set(mockProducts.flatMap(p => p.sizes))];
export const minPrice = Math.min(...mockProducts.map(p => p.price));
export const maxPrice = Math.max(...mockProducts.map(p => p.price));
