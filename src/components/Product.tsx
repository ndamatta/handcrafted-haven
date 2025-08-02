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
  artist_name: string;
};

export default function Product({ product }: { product: ProductType }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:bg-slate-800 border-2 border-transparent hover:border-amber-400">
      <div className="relative w-32 h-32 mb-4 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden flex items-center justify-center">
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
      </div>
      <h3 className="font-semibold text-lg mb-2 text-center text-white">{product.name}</h3>
      <p className="text-gray-300 text-center text-sm mb-2 overflow-hidden">
        <span className="line-clamp-2 block">
          {product.description}
        </span>
      </p>
      <span className="font-bold text-amber-400 mb-1">
        ${product.price.toFixed(2)}
      </span>
      <span className="text-xs text-gray-400 mb-3">
        By {product.artist_name}
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