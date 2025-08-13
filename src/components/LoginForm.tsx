'use client';

import { useActionState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authenticate } from "@/lib/actions";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/seller-portal";

  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form
      action={formAction}
      className="space-y-4 bg-stone-50 dark:bg-slate-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-center text-slate-900 dark:text-white">
        Log in
      </h2>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-900 dark:text-white mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-stone-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-900 dark:text-white mb-1"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          placeholder="Enter your password"
          className="w-full rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-stone-50 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-slate-700 dark:bg-slate-600 hover:brightness-110 disabled:opacity-60 text-white text-sm font-medium py-2 px-4 transition-colors cursor-pointer"
      >
        {isPending ? "Logging in..." : "Log in"}
      </button>

      {errorMessage && (
        <p className="text-center text-sm text-red-500">{errorMessage}</p>
      )}

      <button
        type="button"
        onClick={() => router.push("/login?mode=register")}
        className="w-full mt-2 rounded-md bg-stone-200 dark:bg-slate-700 hover:brightness-110 text-slate-900 dark:text-white text-sm font-medium py-2 px-4 transition-colors cursor-pointer"
      >
        Need an account? Register
      </button>
    </form>
  );
}
