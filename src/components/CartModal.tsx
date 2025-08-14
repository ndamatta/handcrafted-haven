'use client';

import React from 'react';
import { useCart } from './CartContext';
import Image from 'next/image';
import { safeSrc } from '@/lib/imageUtils';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-stone-50 dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-300 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Shopping Cart ({getCartCount()} items)
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            aria-label="Close cart"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <svg
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="mx-auto text-slate-400 mb-4"
              >
                <path d="M3 6h18l-2 12H5L3 6z" />
                <circle cx="7" cy="20" r="1.5" />
                <circle cx="17" cy="20" r="1.5" />
              </svg>
              <p className="text-slate-500 dark:text-slate-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-stone-100 dark:bg-slate-700 rounded-lg">
                  <div className="w-16 h-16 bg-stone-200 dark:bg-slate-600 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={safeSrc(item.image, 'product')}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-slate-900 dark:text-white truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      ${Number(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-stone-200 dark:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-stone-300 dark:hover:bg-slate-500"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-slate-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-stone-200 dark:bg-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-stone-300 dark:hover:bg-slate-500"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-slate-300 dark:border-slate-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                Total: ${Number(getCartTotal()).toFixed(2)}
              </span>
              <button
                onClick={clearCart}
                className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('Checkout functionality coming soon!');
                }}
                className="w-full bg-amber-400 dark:bg-amber-300 hover:bg-amber-500 dark:hover:bg-amber-400 text-slate-900 dark:text-slate-900 font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={onClose}
                className="w-full bg-stone-200 dark:bg-slate-600 hover:bg-stone-300 dark:hover:bg-slate-500 text-slate-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
