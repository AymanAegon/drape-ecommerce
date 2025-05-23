'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Product, Filters } from '@/types';
import { ProductGrid } from '@/components/products/product-grid';
import { ProductFilters } from '@/components/products/product-filters';
import { products, categories as allCategories, sizes as allSizes, minPrice as globalMinPrice, maxPrice as globalMaxPrice } from '@/data/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Header } from '@/components/layout/header';
import { Separator } from '@/components/ui/separator';

const initialFilters: Filters = {
  category: 'All',
  priceRange: [globalMinPrice, globalMaxPrice],
  size: 'All',
  searchQuery: '',
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleFilterChange = useCallback((newFilters: Partial<Filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);
  const filteredProducts = useMemo(() => {

    return products.filter((product) => {
      const { category, priceRange, size, searchQuery } = filters;
      if (category !== 'All' && product.category !== category) return false;
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      if (size !== 'All' && !product.availableSizes.includes(size)) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.description.toLowerCase().includes(searchQuery.toLowerCase()) && (!product.brand || !product.brand.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
      return true;
    });
  }, [filters]);

  return (
    <>
      <Header />
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Our Collection
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore the latest trends and timeless classics.
          </p>
        </header>
        <Separator className="my-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4 xl:w-1/5">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              categories={allCategories}
              availableSizes={allSizes}
              minPrice={globalMinPrice}
              maxPrice={globalMaxPrice}
              onResetFilters={resetFilters}
            />
          </aside>
          <main className="w-full lg:w-3/4 xl:w-4/5">
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </>
  );
}
