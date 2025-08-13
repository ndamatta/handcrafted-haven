import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import Artisan from "@/components/Artisan";
import Link from "next/link";
import { getAllArtisans, createArtisanSlug } from "@/lib/queries";
import { auth } from "../../../auth";
import type { User } from "@/lib/definitions";

export default async function ArtisansPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    page?: string;
  }>;
}) {
  const session = await auth();
  const params = await searchParams;
  const page = Number(params?.page ?? "1");
  
  const pageSize = 6;
  
  const { artisans, totalArtisans } = await getAllArtisans({ 
    page: page, 
    pageSize
  });
  
  const totalPages = Math.ceil(totalArtisans / pageSize);
  const validPage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  
  const prevPage = validPage > 1 ? validPage - 1 : null;
  const nextPage = validPage < totalPages ? validPage + 1 : null;

  const buildQueryString = (newParams: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    
    if (newParams.page && newParams.page !== "1") {
      params.set("page", newParams.page);
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : "";
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100 dark:from-[#18181b] dark:to-[#23232a]">
      <Header isLoggedIn={!!session} />
      <Container>
        <section id="artisans" className="py-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
            Our Artisans
          </h2>
          
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover talented craftspeople from around the world. Each artisan brings their unique skills and passion to create beautiful handmade items.
          </p>

          {totalArtisans === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No artisans found.
            </p>
          ) : artisans.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400">
              No artisans found on this page.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              {artisans.map((artisan: User & { product_count: number; average_rating: number | null }) => (
                <Link key={artisan.id} href={`/artisans/${createArtisanSlug(artisan.name)}`}>
                  <Artisan artisan={artisan} />
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalArtisans > pageSize && (
            <div className="flex justify-center items-center gap-4 text-sm">
              {prevPage && (
                <Link
                  href={`/artisans${buildQueryString({ 
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
                  href={`/artisans${buildQueryString({ 
                    page: nextPage.toString()
                  })}`}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:underline"
                >
                  Next →
                </Link>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Featuring {totalArtisans} talented artisan{totalArtisans !== 1 ? 's' : ''}
            </p>
          </div>
        </section>
      </Container>
      <Footer />
    </div>
  );
}