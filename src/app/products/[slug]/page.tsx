import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ProductReview from "@/components/ProductReview";
<<<<<<< HEAD
import AddToCartButton from "@/components/AddToCartButton";
import WishlistButton from "@/components/WishlistButton";
import ImageGallery from "@/components/ImageGallery";
import ProductRecommendations from "@/components/ProductRecommendations";
import ProductViewTracker from "@/components/ProductViewTracker";
import { getProductBySlug, getReviewsByProductId, getAllProducts } from "@/lib/queries";
=======
import { getProductBySlug, getReviewsByProductId } from "@/lib/queries";
import { auth } from "../../../../auth";
>>>>>>> 7fd4602d78ced0ffe0a87fd62945fb512f025557

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth()
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="text-white text-center mt-20">Product not found</div>
    );
  }

  const reviews = await getReviewsByProductId(product.id);
  const allProducts = await getAllProducts();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray--100 dark:from-[#18181b] dark:to-[#23232a]">
<<<<<<< HEAD
      <ProductViewTracker product={product} />
      <Header />
=======
      <Header isLoggedIn={!!session}/>
>>>>>>> 7fd4602d78ced0ffe0a87fd62945fb512f025557
      <Container>
        <main className="py-16">
          <Link href="/" className="text-yellow-400 hover:underline mb-6 block">
            ← Back to Gallery
          </Link>
          <div className="max-w-4xl mx-auto">
            <ImageGallery images={[product.image]} productName={product.name} />
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-yellow-400 text-2xl font-bold mb-4">
              ${product.price}
            </p>
            <p className="text-slate-700 dark:text-gray-300 mb-4">
              {product.description}
            </p>
<<<<<<< HEAD
            <p className="text-yellow-400 mb-6">By {product.artist_name}</p>
            
            <div className="flex items-center space-x-4 mb-6">
              <AddToCartButton product={product} />
              <WishlistButton product={product} size="lg" showText />
            </div>
=======
            <p className="text-yellow-400">By {product.artisan_name}</p>
            <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-sm font-semibold px-3 py-1 rounded-full mt-1 mb-4">
              {product.category}
            </span>
>>>>>>> 7fd4602d78ced0ffe0a87fd62945fb512f025557
          </div>
          <ProductReview productId={product.id} initialReviews={reviews} />
          
          <ProductRecommendations 
            currentProduct={product} 
            allProducts={allProducts} 
          />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
