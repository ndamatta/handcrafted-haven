"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  sortOrder: string;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  sortOrder,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Helper function to build query string
  const buildQueryString = useCallback((newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    
    // Always start from page 1 when filtering/sorting changes
    if (newParams.page && newParams.page !== "1") {
      params.set("page", newParams.page);
    }
    
    if (newParams.category || selectedCategory) {
      params.set("category", newParams.category || selectedCategory);
    }
    
    if (newParams.sort || sortOrder) {
      params.set("sort", newParams.sort || sortOrder);
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  }, [selectedCategory, sortOrder]);

  const handleCategoryChange = (newCategory: string) => {
    const queryString = buildQueryString({ 
      category: newCategory || undefined,
      sort: sortOrder || undefined,
      page: "1"
    });
    router.push(`/products${queryString}`);
  };

  const handleSortChange = (newSort: string) => {
    const queryString = buildQueryString({ 
      category: selectedCategory || undefined,
      sort: newSort || undefined,
      page: "1"
    });
    router.push(`/products${queryString}`);
  };

  return (
    <div className="bg-stone-50 dark:bg-slate-800 rounded-xl border border-stone-200 dark:border-slate-700 p-6 mb-8 shadow-sm transition-colors duration-200">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-end">
        {/* Category Filter */}
        <div className="flex flex-col min-w-[200px]">
          <label htmlFor="category-filter" className="text-sm font-medium text-slate-900 dark:text-white mb-2">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="px-4 py-3 border border-stone-200 dark:border-slate-600 rounded-lg bg-stone-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400 focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300 focus:border-transparent transition-all duration-200 shadow-sm hover:border-stone-300 dark:hover:border-slate-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Control */}
        <div className="flex flex-col min-w-[200px]">
          <label htmlFor="sort-select" className="text-sm font-medium text-slate-900 dark:text-white mb-2">
            Sort by Price
          </label>
          <select
            id="sort-select"
            value={sortOrder}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-4 py-3 border border-stone-200 dark:border-slate-600 rounded-lg bg-stone-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400 focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-300 focus:border-transparent transition-all duration-200 shadow-sm hover:border-stone-300 dark:hover:border-slate-500"
          >
            <option value="">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}