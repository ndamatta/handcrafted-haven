'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProductType } from './Product';
import Link from 'next/link';
import Image from 'next/image';
import { safeSrc } from '@/lib/imageUtils';

interface SearchBarProps {
  products: ProductType[];
  onSearch?: (query: string) => void;
}

export default function SearchBar({ products, onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredProducts([]);
      setIsOpen(false);
      return;
    }
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.artisan_name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setFilteredProducts(filtered);
    setIsOpen(filtered.length > 0);
  }, [query, products]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
    setIsOpen(false);
  };

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, artists..."
          className="w-full px-4 py-2 pl-10 pr-12 bg-stone-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
        />

        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </form>

      {isOpen && filteredProducts.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-stone-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              onClick={handleProductClick}
              className="flex items-center space-x-3 p-3 hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="w-12 h-12 bg-stone-100 dark:bg-slate-700 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={safeSrc(product.image, 'product')}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 dark:text-white truncate">
                  {product.name}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                  By {product.artisan_name}
                </p>
                <p className="text-sm font-semibold text-amber-400 dark:text-amber-300">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </Link>
          ))}

          {filteredProducts.length > 0 && (
            <div className="border-t border-slate-300 dark:border-slate-700 p-2">
              <button
                type="submit"
                onClick={handleSearch}
                className="w-full text-left text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors"
              >
                View all results for &ldquo;{query}&rdquo;
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
