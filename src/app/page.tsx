import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Product, { type ProductType } from "@/components/Product";
import RecentlyViewed from "@/components/RecentlyViewed";
import Link from "next/link";
import { getAllProducts } from "@/lib/queries";
import { auth } from "../../auth";

export default async function Home() {
  const pageSize = 3;
  const products = await getAllProducts({ page: 1, pageSize });

  const session = await auth();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray--100 dark:from-[#18181b] dark:to-[#23232a]">
<<<<<<< HEAD
      <Header isLoggedIn={!!session} />
=======
      <Header products={products} />
>>>>>>> 7a021a30123585db3c996e4233d6925e4b643766

      <Container>
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-16">
          <img
            src="/logo.svg"
            alt="Handcrafted Haven logo"
            className="h-24 w-auto mb-6"
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 tracking-tight text-amber-400 drop-shadow-sm">
            Handcrafted Haven
          </h1>
          <p className="text-lg sm:text-xl text-center text-slate-700 dark:text-gray-300 max-w-2xl mb-8">
            Discover, share, and celebrate unique handmade creations from
            artisans around the world.
          </p>
        </section>

        {/* Featured Products */}
        <section id="featured-products" className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
            Some of our products...
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {products.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400">
                No products found.
              </p>
            ) : (
              products.map((product: ProductType) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Product product={product} />
                </Link>
              ))
            )}
          </div>

          <div className="flex justify-center">
            <Link href="/products">
              <button className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-slate-700 rounded font-semibold">
                See all products...
              </button>
            </Link>
          </div>
        </section>
      </Container>

      <RecentlyViewed />

      <Footer />
    </div>
  );
}
