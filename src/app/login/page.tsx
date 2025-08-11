import AuthForms from "@/components/AuthForms";
import { Suspense } from "react";
import Container from "@/components/Container";
import Header from "@/components/Header";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray--100 dark:from-[#18181b] dark:to-[#23232a]">
      <Header />

      <Container>
        <section className="flex flex-col items-center justify-center py-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 tracking-tight text-amber-400 drop-shadow-sm">
            Welcome
          </h1>
          <p className="text-base sm:text-lg text-center text-slate-700 dark:text-gray-300 max-w-md mb-6">
            Log in or create an account to access your Seller Portal.
          </p>

          <div className="w-full max-w-md">
            <Suspense
              fallback={
                <div className="text-center text-sm text-gray-500">
                  Loading...
                </div>
              }
            >
              <AuthForms />
            </Suspense>
          </div>
        </section>
      </Container>
    </main>
  );
}
