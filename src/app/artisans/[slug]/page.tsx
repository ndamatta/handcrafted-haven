import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Product, { type ProductType } from "@/components/Product";
import { getArtisanByName, getProductsByArtist } from "@/lib/queries";
import { auth } from "../../../../auth";

export default async function ArtisanProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const { slug } = await params;

  // Convert slug back to name (simple approach)
  const artisanName = slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  const artisan = await getArtisanByName(artisanName);

  if (!artisan) {
    return (
      <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-[#18181b] dark:to-[#23232a]">
        <Header isLoggedIn={!!session} />
        <Container>
          <div className="text-center mt-20 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-4">Artisan not found</h1>
            <Link href="/artisans" className="text-yellow-400 hover:underline">
              ← Back to Artisans
            </Link>
          </div>
        </Container>
        <Footer />
      </div>
    );
  }

  const products = await getProductsByArtist(artisan.name);

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-[#18181b] dark:to-[#23232a]">
      <Header isLoggedIn={!!session} products={products} />
      <Container>
        <main className="py-16">
          <Link href="/artisans" className="text-yellow-400 hover:underline mb-6 block">
            ← Back to Artisans
          </Link>

          <div className="max-w-4xl mx-auto">
            {/* Artisan Profile Header */}
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Picture Placeholder */}
                <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
                  {artisan.profile_picture ? (
                    <Image
                      src={artisan.profile_picture}
                      alt={artisan.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {artisan.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Artisan Info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-4 text-white">{artisan.name}</h1>

                  {artisan.biography && (
                    <p className="text-gray-300 mb-4 leading-relaxed">{artisan.biography}</p>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                    {artisan.location && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>📍</span>
                        <span>{artisan.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-amber-400">
                      <span>📦</span>
                      <span>{artisan.product_count} products</span>
                    </div>

                    {artisan.average_rating && (
                      <div className="flex items-center gap-2 text-amber-400">
                        <span>⭐</span>
                        <span>{artisan.average_rating.toFixed(1)} rating</span>
                      </div>
                    )}

                    {artisan.years_of_experience && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>🕒</span>
                        <span>{artisan.years_of_experience} years experience</span>
                      </div>
                    )}
                  </div>

                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 text-sm font-semibold px-4 py-2 rounded-full">
                    Verified Artisan
                  </span>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-300">
                Products by {artisan.name}
              </h2>

              {products.length === 0 ? (
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  This artisan hasn&apos;t listed any products yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((product: ProductType) => (
                    <Link key={product.id} href={`/products/${product.slug}`}>
                      <Product product={product} />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
