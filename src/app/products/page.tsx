import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Product, { type ProductType } from "@/components/Product";
import ProductFilters from "@/components/ProductFilters";
import Link from "next/link";
import { getAllProducts, getProductCategories } from "@/lib/queries";
import { auth } from "../../../auth";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    page?: string;
    category?: string;
    sort?: string;
  }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const page = Number(params?.page ?? "1");
  const selectedCategory = params?.category || "";
  const sortOrder = params?.sort || "";
  
  const pageSize = 6;
  
  // Get categories for the filter dropdown
  const categories = await getProductCategories();
  
  // Get filtered and sorted products
  const { products, totalProducts } = await getAllProducts({ 
    page: page, 
    pageSize,
    category: selectedCategory || undefined,
    sort: sortOrder || undefined
  });
  
  const totalPages = Math.ceil(totalProducts / pageSize);
  const validPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  
  const prevPage = validPage > 1 ? validPage - 1 : null;
  const nextPage = validPage < totalPages ? validPage + 1 : null;

  // Helper function to build query string for pagination
  const buildQueryString = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    
    if (newParams.page && newParams.page !== "1") {
      params.set("page", newParams.page);
    }
    
    if (newParams.category || selectedCategory) {
      params.set("category", newParams.category || selectedCategory);
    }
    
    if (newParams.sort || sortOrder) {
      params.set("sort", newParams.sort || sortOrder);
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-[#18181b] dark:to-[#23232a]">
      <Header isLoggedIn={!!session} products={products} />
      <Container>
        <section id="products" className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
            Products
          </h2>
          
          {/* Filter and Sort Controls */}
          <ProductFilters 
            categories={categories}
            selectedCategory={selectedCategory}
            sortOrder={sortOrder}
          />

          {/* Active Filters Display */}
          {(selectedCategory || sortOrder) && (
            <div className="flex flex-wrap gap-3 mb-6 justify-center items-center">
              {selectedCategory && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  Category: {selectedCategory}
                </span>
              )}
              {sortOrder && (
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
                  Sort: {sortOrder === "price-low-high" ? "Price ↑" : sortOrder === "price-high-low" ? "Price ↓" : sortOrder}
                </span>
              )}
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Clear all filters
              </Link>
            </div>
          )}

          {totalProducts === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No products found{selectedCategory ? ` in "${selectedCategory}" category` : ""}.
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
                  href={`/products${buildQueryString({ 
                    category: selectedCategory || undefined,
                    sort: sortOrder || undefined,
                    page: prevPage.toString()
                  })}`}
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
                  href={`/products${buildQueryString({ 
                    category: selectedCategory || undefined,
                    sort: sortOrder || undefined,
                    page: nextPage.toString()
                  })}`}
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