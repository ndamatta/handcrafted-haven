'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import CartModal from './CartModal';

export default function CartIcon() {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="relative ml-2 rounded-full bg-slate-600 hover:bg-slate-500 p-2 flex items-center justify-center transition-colors"
        aria-label="Shopping cart"
      >
        <svg 
          width="24" 
          height="24" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="white" 
          strokeWidth="2"
        >
          <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>
      
      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
} 