// Product detail page with review, comment, and rating integration
import React, { useState } from "react";
import { useRouter } from "next/router";
import ProductReview from "@/components/ProductReview";
import productsData from "@/data/products.json";

// Find product by id from mock data
function getProductById(id: string) {
  return productsData.find((p: any) => p.id === id);
}

export default function ProductDetailPage() {
  // Get product id from URL
  const router = useRouter();
  const { id } = router.query;
  const product = getProductById(id as string);

  // Local state for reviews (replace with DB integration later)
  const [reviews, setReviews] = useState([]);

  // Add new review to state (replace with DB call later)
  const handleAddReview = (review: any) => {
    setReviews([review, ...reviews]);
  };

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      {/* Product details */}
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow p-6 mb-8">
        <img src={product.image} alt={product.title} className="w-48 h-48 object-cover mx-auto mb-4 rounded" />
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">{product.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-2">{product.description}</p>
        <span className="font-bold text-amber-500 text-lg mb-1 block">${product.price.toFixed(2)}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">By {product.seller}</span>
      </div>
      {/* Product reviews, comments, and ratings */}
      <ProductReview productId={id as string} reviews={reviews} onAddReview={handleAddReview} />
    </div>
  );
}
