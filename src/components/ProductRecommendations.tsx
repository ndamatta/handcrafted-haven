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
    const otherProducts = allProducts.filter(p => p.id !== currentProduct.id);
    
    // First priority: same artist
    const sameArtist = otherProducts.filter(p => 
      p.artisan_name === currentProduct.artisan_name
    );
    
    // Second priority: similar price range (±20%)
    const priceRange = currentProduct.price * 0.2;
    const similarPrice = otherProducts.filter(p => 
      Math.abs(p.price - currentProduct.price) <= priceRange
    );
    
    // Combine and remove duplicates
    const recommendations = [...sameArtist, ...similarPrice];
    const uniqueRecommendations = recommendations.filter((product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
    );
    
    return uniqueRecommendations.slice(0, maxItems);
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
          <Link key={product.id} href={`/product/${product.slug}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
      
      {recommendations.length >= maxItems && (
        <div className="text-center mt-8">
          <Link
            href="/"
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