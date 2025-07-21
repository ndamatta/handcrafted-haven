
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/Container";
import products from "../../data/products.json";


export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-[#18181b] dark:to-[#23232a]">
      <Header />
      <Container>
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-16">
          <Image
            className="dark:invert mb-6"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Welcome to Handcrafted Haven
          </h1>
          <p className="text-lg sm:text-xl text-center text-gray-700 dark:text-gray-300 max-w-2xl mb-8">
            Discover, share, and celebrate unique handmade creations from artisans around the world.
          </p>
        </section>

        {/* Product Grid */}
        <section id="products" className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col items-center">
                <div className="w-32 h-32 mb-4 bg-gray-100 dark:bg-zinc-800 rounded overflow-hidden flex items-center justify-center">
                  {/* Replace with actual images in public/products/ */}
                  <Image src={product.image} alt={product.title} width={100} height={100} className="object-cover" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm mb-2">{product.description}</p>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">${product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">By {product.seller}</span>
              </div>
            ))}
          </div>
        </section>
      </Container>
      <Footer />
    </div>
  );
}
