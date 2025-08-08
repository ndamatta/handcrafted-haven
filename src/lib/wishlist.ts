import { ProductType } from '@/components/Product';

const WISHLIST_STORAGE_KEY = 'handcrafted-haven-wishlist';

export const wishlistUtils = {
  // Get wishlist from localStorage
  getWishlist(): ProductType[] {
    if (typeof window === 'undefined') {
      return [];
    }
    
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  // Save wishlist to localStorage
  saveWishlist(wishlist: ProductType[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (error) {
      console.error('Failed to save wishlist:', error);
    }
  },

  // Add item to wishlist
  addToWishlist(product: ProductType): ProductType[] {
    const wishlist = this.getWishlist();
    const existingItem = wishlist.find(item => item.id === product.id);
    
    if (!existingItem) {
      wishlist.push(product);
      this.saveWishlist(wishlist);
    }
    
    return wishlist;
  },

  // Remove item from wishlist
  removeFromWishlist(productId: number): ProductType[] {
    const wishlist = this.getWishlist();
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    this.saveWishlist(updatedWishlist);
    return updatedWishlist;
  },

  // Check if item is in wishlist
  isInWishlist(productId: number): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.id === productId);
  },

  // Get wishlist count
  getWishlistCount(): number {
    const wishlist = this.getWishlist();
    return wishlist.length;
  },

  // Clear wishlist
  clearWishlist(): ProductType[] {
    const emptyWishlist: ProductType[] = [];
    this.saveWishlist(emptyWishlist);
    return emptyWishlist;
  }
}; 