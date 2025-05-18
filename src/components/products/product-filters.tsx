'use client';

import type { Filters } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, X } from 'lucide-react';

interface ProductFiltersProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
  categories: string[];
  availableSizes: string[];
  minPrice: number;
  maxPrice: number;
  onResetFilters: () => void;
}

export function ProductFilters({
  filters,
  onFilterChange,
  categories,
  availableSizes,
  minPrice,
  maxPrice,
  onResetFilters
}: ProductFiltersProps) {
  const handlePriceChange = (value: [number, number]) => {
    onFilterChange({ priceRange: value });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ searchQuery: event.target.value });
  };

  return (
    <Card className="mb-8 shadow-md sticky top-20 z-40">
      <CardHeader>
        <CardTitle className="text-xl">Filter Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Label htmlFor="search" className="sr-only">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            value={filters.searchQuery || ''}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        </div>

        <div>
          <Label htmlFor="category" className="block text-sm font-medium mb-1">Category</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => onFilterChange({ category: value })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="size" className="block text-sm font-medium mb-1">Size</Label>
          <Select
            value={filters.size}
            onValueChange={(value) => onFilterChange({ size: value })}
          >
            <SelectTrigger id="size">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {availableSizes.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="block text-sm font-medium mb-1">Price Range</Label>
          <Slider
            min={minPrice}
            max={maxPrice}
            step={1}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
        <Button onClick={onResetFilters} variant="outline" className="w-full">
          <X className="mr-2 h-4 w-4" /> Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}
