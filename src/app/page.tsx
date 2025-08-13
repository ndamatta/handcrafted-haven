import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Product, { type ProductType } from "@/components/Product";
import Link from "next/link";
import { Metadata } from "next";
import { getAllProducts } from "@/lib/queries";
import { auth } from "../../auth";

export const metadata: Metadata = {
  title: "Handcrafted Haven - Unique Handmade Creations",
  description:
    "Discover, share, and celebrate unique handmade creations from artisans around the world. Shop for one-of-a-kind gifts and home decor.",
};

export default async function Home() {
  const { products } = await getAllProducts({ page: 1, pageSize: 3 });

  const session = await auth();

  return (
    <div className="font-sans min-h-screen flex flex-col bg-stone-100 dark:bg-slate-900 transition-colors duration-200">
      <Header isLoggedIn={!!session} products={products} />
      <main id="main-content">
        <Container>
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center py-16">
            <img
              src="/logo.svg"
              alt="Handcrafted Haven logo"
              className="h-24 w-auto mb-6"
            />
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 tracking-tight text-amber-400 dark:text-amber-300 drop-shadow-sm">
              Handcrafted Haven
            </h1>
            <p className="text-lg sm:text-xl text-center text-slate-500 dark:text-slate-400 max-w-2xl mb-8">
              Discover, share, and celebrate unique handmade creations from
              artisans around the world.
            </p>
          </section>

          {/* Featured Products */}
          <section id="featured-products" className="py-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">
              Some of our products...
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {products.length === 0 ? (
                <p className="text-center text-slate-400 dark:text-slate-500">
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
              <Link
                href="/products"
                className="px-6 py-2 bg-slate-700 hover:bg-slate-800 dark:bg
      <Footer />
    </div>
  );
}