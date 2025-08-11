'use client';

import { useEffect } from 'react';
import { ProductType } from './Product';

interface ProductViewTrackerProps {
  product: ProductType;
}

export default function ProductViewTracker({ product }: ProductViewTrackerProps) {
  useEffect(() => {
    // Add product to recently viewed when component mounts
    const addToRecentlyViewed = () => {
      if (typeof window === 'undefined') return;
      
      try {
        const RECENTLY_VIEWED_KEY = 'handcrafted-haven-recently-viewed';
        const MAX_RECENT_ITEMS = 4;
        
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        let recent = stored ? JSON.parse(stored) : [];
        
        // Remove if already exists
        recent = recent.filter((p: ProductType) => p.id !== product.id);
        
        // Add to beginning
        recent.unshift(product);
        
        // Keep only the most recent items
        recent = recent.slice(0, MAX_RECENT_ITEMS);
        
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recent));
      } catch (error) {
        console.error('Failed to save recently viewed product:', error);
      }
    };

    // Add a small delay to ensure the user is actually viewing the product
    const timer = setTimeout(addToRecentlyViewed, 2000);
    
    return () => clearTimeout(timer);
  }, [product]);

  return null; // This component doesn't render anything
} 