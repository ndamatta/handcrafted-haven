'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { wishlistUtils } from '@/lib/wishlist';
import { ProductType } from './Product';

interface WishlistContextType {
  wishlist: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = wishlistUtils.getWishlist();
    setWishlist(savedWishlist);
    setWishlistCount(wishlistUtils.getWishlistCount());
  }, []);

  const addToWishlist = (product: ProductType) => {
    const updatedWishlist = wishlistUtils.addToWishlist(product);
    setWishlist(updatedWishlist);
    setWishlistCount(wishlistUtils.getWishlistCount());
  };

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlistUtils.removeFromWishlist(productId);
    setWishlist(updatedWishlist);
    setWishlistCount(wishlistUtils.getWishlistCount());
  };

  const isInWishlist = (productId: number) => {
    return wishlistUtils.isInWishlist(productId);
  };

  const clearWishlist = () => {
    const updatedWishlist = wishlistUtils.clearWishlist();
    setWishlist(updatedWishlist);
    setWishlistCount(0);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 