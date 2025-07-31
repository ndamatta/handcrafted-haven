import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Product, { type ProductType } from "@/components/Product";
import Link from "next/link";
import { getAllProducts, getTotalProducts } from "@/lib/queries";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? "1");
  const pageSize = 6;

  const totalProducts = await getTotalProducts();
  const totalPages = Math.ceil(totalProducts / pageSize);

  const validPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));

  const products = await getAllProducts({ page: validPage, pageSize });

  const prevPage = validPage > 1 ? validPage - 1 : null;
  const nextPage = validPage < totalPages ? validPage + 1 : null;

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray--100 dark:from-[#18181b] dark:to-[#23232a]">
      <Header />

      <Container>
        <section id="products" className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
            Products
          </h2>

          {totalProducts === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No products found.
            </p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No products found on this page.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {products.map((product: ProductType) => (
                <Link key={product.id} href={`/products/${product.slug}`}>
                  <Product product={product} />
                </Link>
              ))}
            </div>
          )}

          {totalProducts > pageSize && (
            <div className="flex justify-center items-center gap-4 text-sm">
              {prevPage && (
                <Link
                  href={`/products?page=${prevPage}`}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:underline"
                >
                  ← Previous
                </Link>
              )}
              <span className="text-gray-700 dark:text-gray-300">
                Page {validPage} of {totalPages}
              </span>
              {nextPage && (
                <Link
                  href={`/products?page=${nextPage}`}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:underline"
                >
                  Next →
                </Link>
              )}
            </div>
          )}
        </section>
      </Container>

      <Footer />
    </div>
  );
}
