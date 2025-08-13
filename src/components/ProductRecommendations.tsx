'use client';

import React from 'react';
import { ProductType } from './Product';
import Product from './Product';
import Link from 'next/link';

interface ProductRecommendationsProps {
  currentProduct: ProductType;
  allProducts: ProductType[];
  maxItems?: number;
}

export default function ProductRecommendations({ 
  currentProduct, 
  allProducts, 
  maxItems = 4 
}: ProductRecommendationsProps) {
  // Get recommendations based on same artist and similar products
  const getRecommendations = () => {
    // 1. Filter out the current product
    const otherProducts = allProducts.filter((p) => p.id !== currentProduct.id);

    // 2. Find products in the same category
    const sameCategory = otherProducts.filter(
      (p) => p.category === currentProduct.category
    );

    // 3. Find products by the same artisan
    const sameArtisan = otherProducts.filter(
      (p) => p.artisan_name === currentProduct.artisan_name
    );

    // 4. Combine, prioritize, and remove duplicates
    const combined = [...sameCategory, ...sameArtisan];
    const recommendationIds = new Set<number>();
    const uniqueRecommendations: ProductType[] = [];

    for (const product of combined) {
      if (!recommendationIds.has(product.id)) {
        recommendationIds.add(product.id);
        uniqueRecommendations.push(product);
      }
    }

    // 5. Fill with other products if we don't have enough
    if (uniqueRecommendations.length < maxItems) {
      const remainingProducts = otherProducts.filter(p => !recommendationIds.has(p.id));
      const shuffledRemaining = remainingProducts.sort(() => 0.5 - Math.random());
      uniqueRecommendations.push(...shuffledRemaining.slice(0, maxItems - uniqueRecommendations.length));
    }

    return uniqueRecommendations.slice(0, maxItems)
  };

  const recommendations = getRecommendations();

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          You might also like
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover more handcrafted treasures
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
      
      {recommendations.length >= maxItems && (
        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-lg transition-colors"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
} 