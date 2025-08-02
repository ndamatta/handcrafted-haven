'use client';

import React, { useState } from 'react';
import { useCart } from './CartContext';
import { ProductType } from './Product';

interface AddToCartButtonProps {
  product: ProductType;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <label htmlFor="quantity" className="text-gray-700 dark:text-gray-300 font-medium">
          Quantity:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={handleAddToCart}
        disabled={showSuccess}
        className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
          showSuccess
            ? 'bg-green-500 text-white cursor-not-allowed'
            : 'bg-amber-400 hover:bg-amber-500 text-black hover:shadow-lg'
        }`}
      >
        {showSuccess ? 'Added to Cart!' : 'Add to Cart'}
      </button>
      
      {isInCart(product.id) && (
        <span className="text-green-500 text-sm font-medium">
          ✓ In cart
        </span>
      )}
    </div>
  );
} 