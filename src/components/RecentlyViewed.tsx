'use client';

import React, { useEffect, useState } from 'react';
import { ProductType } from './Product';
import Product from './Product';
import Link from 'next/link';

const RECENTLY_VIEWED_KEY = 'handcrafted-haven-recently-viewed';
const MAX_RECENT_ITEMS = 4;

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    // Load recently viewed products from localStorage
    const loadRecentlyViewed = () => {
      if (typeof window === 'undefined') return;
      
      try {
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        if (stored) {
          const products = JSON.parse(stored);
          setRecentProducts(products.slice(0, MAX_RECENT_ITEMS));
        }
      } catch (error) {
        console.error('Failed to load recently viewed products:', error);
      }
    };

    loadRecentlyViewed();
  }, []);

  // Function to add a product to recently viewed (called from product pages)
  const addToRecentlyViewed = (product: ProductType) => {
    if (typeof window === 'undefined') return;
    
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      let recent = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists
      recent = recent.filter((p: ProductType) => p.id !== product.id);
      
      // Add to beginning
      recent.unshift(product);
      
      // Keep only the most recent items
      recent = recent.slice(0, MAX_RECENT_ITEMS);
      
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent));
      setRecentProducts(recent);
    } catch (error) {
      console.error('Failed to save recently viewed product:', error);
    }
  };

  // Expose the function globally so it can be called from product pages
  if (typeof window !== 'undefined') {
    (window as any).addToRecentlyViewed = addToRecentlyViewed;
  }

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Recently Viewed
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Continue exploring these handcrafted treasures
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`}>
              <Product product={product} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Container component for consistent layout
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
} 