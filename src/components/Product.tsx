'use client';

import Image from "next/image";
import { useCart } from "./CartContext";
import WishlistButton from "./WishlistButton";

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
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-slate-800 border-2 border-transparent hover:border-amber-400">
<<<<<<< HEAD
      <div className="relative w-32 h-32 mb-4 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
=======
      
      <div className="w-32 h-32 mb-4 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
>>>>>>> 7fd4602d78ced0ffe0a87fd62945fb512f025557
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover w-full h-full"
        />
                <div className="absolute top-2 right-2">
          <WishlistButton product={product} size="sm" />
        </div>
      </div>

      <h3 className="font-semibold text-lg mb-1 text-center text-white">
        {product.name}
      </h3>

      <p className="text-gray-300 text-center text-sm mb-2 line-clamp-2">
        {product.description}
      </p>

      <span className="font-bold text-amber-400 mb-1">
        ${product.price.toFixed(2)}
      </span>
<<<<<<< HEAD
      <span className="text-xs text-gray-400 mb-3">
        By {product.artist_name}
=======

      <span className="text-xs text-gray-400 mb-1">
        By {product.artisan_name}
      </span>

      <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full mt-1">
        {product.category}
>>>>>>> 7fd4602d78ced0ffe0a87fd62945fb512f025557
      </span>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product);
        }}
        className="bg-amber-400 hover:bg-amber-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}