import { Suspense } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Product, { type ProductType } from "@/components/Product";
import Link from "next/link";
import { searchProducts } from "@/lib/queries";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

async function SearchResults({ query }: { query: string }) {
  const products = await searchProducts(query);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <svg 
          width="64" 
          height="64" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="mx-auto text-gray-400 mb-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          No results found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We couldn&apos;t find any products matching &ldquo;{query}&rdquo;
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-lg transition-colors"
        >
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Found {products.length} product{products.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: ProductType) => (
          <Link key={product.id} href={`/products/${product.slug}`}>
            <Product product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;
  
  if (!query || query.trim() === '') {
    return (
      <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Header />
        <Container>
          <main className="py-16">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Search Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Enter a search term to find handcrafted products
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold rounded-lg transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          </main>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <Container>
        <main className="py-16">
          <Suspense fallback={
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Searching...</p>
            </div>
          }>
            <SearchResults query={query} />
          </Suspense>
        </main>
      </Container>
      <Footer />
    </div>
  );
}
