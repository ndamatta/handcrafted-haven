import LoginForm from "@/components/LoginForm";
import { Suspense } from "react";
import Container from "@/components/Container";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray--100 dark:from-[#18181b] dark:to-[#23232a]">
      <Container>
        <section className="flex flex-col items-center justify-center py-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 tracking-tight text-amber-400 drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-base sm:text-lg text-center text-slate-700 dark:text-gray-300 max-w-md mb-6">
            Please log in to access your Seller Portal and manage your items.
          </p>

          <div className="w-full max-w-md">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>
        </section>
      </Container>
    </main>
  );
}
