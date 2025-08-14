'use client';

import Image from "next/image";
import { safeSrc } from "@/lib/imageUtils";
import { useCart } from "./CartContext";

export type ProductType = {
  id: number;
  slug: string;
  image: string;
  name: string;
  description: string;
  price: number;
  artisan_name: string;
  category: string;
};

export default function Product({ product }: { product: ProductType }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-stone-50 dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-stone-100 dark:hover:bg-slate-700 border-2 border-transparent hover:border-amber-400 dark:hover:border-amber-300">
      <div className="relative w-32 h-32 mb-4 bg-stone-100 dark:bg-slate-700 rounded overflow-hidden flex items-center justify-center">
        <Image
          src={safeSrc(product.image, "product")}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-2 right-2">
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-1 text-center text-slate-900 dark:text-white">
        {product.name}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 text-center text-sm mb-2 line-clamp-2">
        {product.description}
      </p>

      <span className="font-bold text-amber-400 dark:text-amber-300 mb-1">
        ${product.price.toFixed(2)}
      </span>

      <span className="text-xs text-slate-400 dark:text-slate-500 mb-1">
        By {product.artisan_name}
      </span>

      <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 text-xs font-semibold px-3 py-1 rounded-full mt-1">
        {product.category}
      </span>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product);
        }}
        className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 w-full mt-2"
      >
        Add to Cart
      </button>
    </div>
  );
}