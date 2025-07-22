import Image from "next/image";

export type ProductType = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  seller: string;
};

export default function Product({ product }: { product: ProductType }) {
  return (
    <div className="bg-slate-800 rounded-xl shadow p-6 flex flex-col items-center">
      <div className="w-32 h-32 mb-4 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2 text-center">{product.title}</h3>
      <p className="text-gray-600 dark:text-gray-200 text-center text-sm mb-2">
        {product.description}
      </p>
      <span className="font-bold text-amber-400 mb-1">
        ${product.price.toFixed(2)}
      </span>
      <span className="text-xs text-gray-300">
        By {product.seller}
      </span>
    </div>
  );
}