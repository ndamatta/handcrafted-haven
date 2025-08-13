import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import ProductReview from "@/components/ProductReview";
import AddToCartButton from "@/components/AddToCartButton";
import { getProductBySlug, getReviewsByProductId, createArtisanSlug } from "@/lib/queries";
import { auth } from "../../../../auth";
import { Metadata } from "next";
import { Product, WithContext } from "schema-dts";

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
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
      images: [product.image], // Assuming product.image is a full URL
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

  if (!product) {
    return (
      <div className="text-center text-gray-900 dark:text-white mt-20">
        Product not found
      </div>
    );
  }

  const reviews = await getReviewsByProductId(product.id);

  const averageRating = reviews.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  // JSON-LD Structured Data
  const structuredData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image, // Ensure this is an absolute URL
    sku: String(product.id),
    brand: {
      "@type": "Brand",
      name: product.artisan_name,
    },
    offers: {
      "@type": "Offer",
      url: `https://handcrafted-haven-nu-six.vercel.app/products/${product.slug}`,
      priceCurrency: "USD", // Change if needed
      price: String(product.price),
      availability: "https://schema.org/InStock",
    },
    ...(reviews.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating.toFixed(1),
        reviewCount: reviews.length,
      },
    }),
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header isLoggedIn={!!session} />
      <Container>
        <main className="py-16">
          <Link href="/products" className="text-yellow-400 hover:underline mb-6 block">
            ← Back to Products
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Product Image */}
            <div className="bg-gray-200 dark:bg-gray-700 w-full h-64 rounded-lg mb-6 shadow-sm"></div>

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
