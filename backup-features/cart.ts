import { ProductType } from '@/components/Product';

export interface CartItem extends ProductType {
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

const CART_STORAGE_KEY = 'handcrafted-haven-cart';

export const cartUtils = {
  // Get cart from localStorage
  getCart(): Cart {
    if (typeof window === 'undefined') {
      return { items: [], total: 0 };
    }
    
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : { items: [], total: 0 };
    } catch {
      return { items: [], total: 0 };
    }
  },

  // Save cart to localStorage
  saveCart(cart: Cart): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  },

  // Add item to cart
  addToCart(product: ProductType, quantity: number = 1): Cart {
    const cart = this.getCart();
    const existingItemIndex = cart.items.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ ...product, quantity });
    }
    
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  },

  // Remove item from cart
  removeFromCart(productId: number): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== productId);
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  },

  // Update item quantity
  updateQuantity(productId: number, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.id === productId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }
    
    cart.total = this.calculateTotal(cart.items);
    this.saveCart(cart);
    return cart;
  },

  // Clear cart
  clearCart(): Cart {
    const emptyCart = { items: [], total: 0 };
    this.saveCart(emptyCart);
    return emptyCart;
  },

  // Calculate total
  calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  // Get cart item count
  getItemCount(): number {
    const cart = this.getCart();
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }
}; 