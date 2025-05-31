
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { products as allProducts } from '@/data/mock-data';
import type { Product, CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/state';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { set } from 'date-fns';
import { getColor } from '@/lib/utils';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const { cartItems, setCartItems } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1); // Default quantity is 1
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleShownImage = (color: string) => {
    if (!product) return;
    const imageIndex = color.split(',')[1];
    if (!imageIndex) return;
    const colorIndex = parseInt(imageIndex);
    if (colorIndex < 0 || colorIndex >= product.images.length) return;
    setCurrentImageIndex(colorIndex);
  }


  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find((p) => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedSize(foundProduct.sizes[0] || '');
        setSelectedColor(foundProduct.colors[0] || '');
      } else {
        // Handle product not found, e.g., redirect or show a message
        toast({ title: "Error", description: "Product not found.", variant: "destructive" });
        router.push('/products');
      }
    }
  }, [id, router, toast]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem: CartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      color: getColor(selectedColor),
      image: product.images[0], // Use the primary image for the cart
    };

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.productId === cartItem.productId &&
          item.size === cartItem.size &&
          getColor(item.color) === cartItem.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += cartItem.quantity;
        return updatedItems;
      } else {
        return [...prevItems, cartItem];
      }
    });

    toast({
      title: 'Added to Cart',
      description: `${product.name} (${selectedColor}, ${selectedSize}) x${quantity} has been added to your cart.`,
    });
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl text-muted-foreground">Loading product details...</p>
        </div>
      </>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>

        <Card className="overflow-hidden shadow-xl">
          <CardContent className="p-0 md:p-6">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Image Gallery */}
              <div className="relative">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - image ${currentImageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-opacity duration-300"
                    priority={currentImageIndex === 0}
                    data-ai-hint={`${product.category} clothing detail`}
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="mt-4 flex justify-center space-x-2">
                    <Button variant="outline" size="sm" onClick={prevImage} disabled={product.images.length <= 1}>Previous</Button>
                    <Button variant="outline" size="sm" onClick={nextImage} disabled={product.images.length <= 1}>Next</Button>
                  </div>
                )}
                 <div className="mt-2 flex space-x-2 overflow-x-auto py-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 w-20 rounded-md overflow-hidden border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'} focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        data-ai-hint="product thumbnail"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="py-6 md:py-0">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{product.name}</h1>
                    {product.brand && <Badge variant="secondary" className="text-sm">{product.brand}</Badge>}
                </div>
                <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
                
                <Separator className="my-4" />

                <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>
                
                <Badge variant="outline" className="mb-4 text-sm">{product.category}</Badge>

                <div className="space-y-6">
                  {/* Size Selector */}
                  {product.sizes.length > 0 && (
                    <div>
                      <label htmlFor="size-select" className="block text-sm font-medium text-foreground mb-1">Size</label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger id="size-select" className="w-full md:w-1/2">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Color Selector */}
                  {product.colors.length > 0 && (
                     <div>
                      <label htmlFor="color-select" className="block text-sm font-medium text-foreground mb-1">Color</label>
                      <Select value={selectedColor} onValueChange={color => {
                        setSelectedColor(color);
                        handleShownImage(color);
                      }}>
                        <SelectTrigger id="color-select" className="w-full md:w-1/2">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          {product.colors.map((color) => (
                            <SelectItem key={color} value={color}>{getColor(color)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Quantity Selector */}
                  <div>
                    <label htmlFor="quantity-input" className="block text-sm font-medium text-foreground mb-1">Quantity</label>
                    <input
                      id="quantity-input"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="w-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <Button 
                  size="lg" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6" 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                {product.stock > 0 && product.stock < 10 && (
                    <p className="text-sm text-destructive mt-2 text-center">Only {product.stock} left in stock!</p>
                )}
                {product.stock > 0 && product.stock >= 10 && (
                    <p className="text-sm mt-2 text-center">{product.stock} left in stock!</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
