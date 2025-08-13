"use client";

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
          <path d="M3 6h18l-2 12H5L3 6z" /> 
          <circle cx="7" cy="20" r="1.5" />   
          <circle cx="17" cy="20" r="1.5" />   
        </svg>

        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[0.65rem] rounded-full h-5 min-w-[20px] px-[2px] flex items-center justify-center font-bold">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </button>

      <CartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
