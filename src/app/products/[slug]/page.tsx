import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ProductReview from "@/components/ProductReview";
import AddToCartButton from "@/components/AddToCartButton";
import {
  getProductBySlug,
  getReviewsByProductId,
  createArtisanSlug,
  getAllProducts,
} from "@/lib/queries";
import { auth } from "../../../../auth";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductRecommendations from "@/components/ProductRecommendations";
import ProductViewTracker from "@/components/ProductViewTracker";
import { Review } from "@/components/ProductReview";

type Props = {
  params: { slug: string };
};

// Generate dynamic metadata for each product page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
      type: "product",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  const { slug } = params;
  const product = await getProductBySlug(slug);
  const { products: allProducts } = await getAllProducts({ all: true });

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProductId(product.id);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) /
        reviews.length
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    sku: product.id.toString(),
    brand: {
      "@type": "Brand",
      name: product.artisan_name,
    },
    offers: {
      "@type": "Offer",
      url: `https://handcrafted-haven.com/products/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(averageRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating.toFixed(1),
        reviewCount: reviews.length.toString(),
      },
    }),
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Add JSON-LD to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductViewTracker product={product} />
      <Header isLoggedIn={!!session} products={allProducts} />
      <main id="main-content">
        <Container>
          <div className="py-8">
            <Link href="/products" className="text-amber-400 hover:underline mb-6 block">
              ← Back to Products
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-stone-100 dark:bg-slate-800 rounded-lg shadow-sm flex items-center justify-center p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-contain max-h-[400px]"
                  priority
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 text-sm font-semibold px-3 py-1 rounded-full mb-2 self-start">
                  {product.category}
                </span>
                <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
                  {product.name}
                </h1>
                <p className="text-amber-500 dark:text-amber-400 text-3xl font-bold mb-4">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {product.description}
                </p>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  By{" "}
                  <Link
                    href={`/artisans/${createArtisanSlug(product.artisan_name)}`}
                    className="underline hover:text-amber-400"
                  >
                    {product.artisan_name}
                  </Link>
                </p>

                <AddToCartButton product={product} />
              </div>
            </div>

            {/* Reviews Section */}
            <ProductReview productId={product.id} initialReviews={reviews} />
            
            {/* Recommendations Section */}
            <ProductRecommendations currentProduct={product} allProducts={allProducts} />
          </div>
        </main>
      <Footer />
    </div>
  );
}
