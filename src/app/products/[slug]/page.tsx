import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ProductReview from "@/components/ProductReview";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug, getReviewsByProductId, createArtisanSlug } from "@/lib/queries";
import { auth } from "../../../../auth";
import Image from "next/image";
import { safeSrc } from "@/lib/imageUtils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="text-center text-gray-900 dark:text-white mt-20">
        Product not found
      </div>
    );
  }

  const reviews = await getReviewsByProductId(product.id);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header isLoggedIn={!!session} />
      <Container>
        <main className="py-16">
          <Link href="/products" className="text-yellow-400 hover:underline mb-6 block">
            ← Back to Products
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Product Image */}
            <div className="w-full h-64 rounded-lg mb-6 shadow-sm overflow-hidden">
              <Image
                src={safeSrc(product.image, "product")}
                alt={product.name}
                width={1200}
                height={600}
                className="w-full h-full object-cover bg-gray-200 dark:bg-gray-700"
                priority
              />
            </div>

            {/* Product Info */}
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {product.name}
            </h1>
            <p className="text-yellow-400 text-2xl font-bold mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {product.description}
            </p>
            <p className="text-yellow-400 mb-6">
              By{' '}
              <Link
                href={`/artisans/${createArtisanSlug(product.artisan_name)}`}
                className="underline hover:text-yellow-300"
              >
                {product.artisan_name}
              </Link>
            </p>

            <AddToCartButton product={product} />

            <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-sm font-semibold px-3 py-1 rounded-full mt-2 mb-4">
              {product.category}
            </span>
          </div>

          {/* Reviews Section */}
          <ProductReview productId={product.id} initialReviews={reviews} />
        </main>
      </Container>
      <Footer />
    </div>
  );
}
