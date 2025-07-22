import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import products from "../../data/products.json";
import Product, { ProductType } from "@/components/Product";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-200">
      <Header />
      <Container>
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 tracking-tight text-amber-400 drop-shadow-sm">
            Handcrafted Haven
          </h1>
          <p className="text-lg sm:text-xl text-center text-slate-700">
            Discover, share, and celebrate unique handmade creations from
            artisans around the world.
          </p>
        </section>

        {/* Product Grid */}
        <section id="products" className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product: ProductType) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </section>
      </Container>
      <Footer />
    </div>
  );
}
