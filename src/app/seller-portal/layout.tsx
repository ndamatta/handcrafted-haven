import SideNav from "@/components/seller-portal/SideNav";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { auth } from "../../../auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-200 dark:from-[#18181b] dark:to-[#23232a]">
      <Header isLoggedIn={!!session} />

      {/* Shell: sidebar + content */}
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl pt-14 px-4 sm:px-6 lg:px-8 flex gap-6">
          {/* Sidebar, full viewport height on large screens */}
          <aside className="w-full max-w-xs lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen self-start">
            <SideNav />
          </aside>

          {/* Content */}
          <div className="flex-1">
            <Container>{children}</Container>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
