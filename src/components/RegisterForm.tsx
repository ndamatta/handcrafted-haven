'use client';

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(registerUser, undefined);

  useEffect(() => {
    if (state?.ok && /Redirecting/i.test(state.message)) {
      const t = setTimeout(() => router.push("/seller-portal"), 700);
      return () => clearTimeout(t);
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto w-full bg-stone-50 dark:bg-slate-800 rounded-xl shadow-lg p-6 space-y-4"
    >
      <h1 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-4">
        Create an account
      </h1>

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
          htmlFor="name"
          className="block text-sm font-medium text-slate-900 dark:text-white mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter your name"
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

      <button
        type="submit"
        disabled={pending || (state?.ok && /Redirecting/i.test(state.message))}
        className="w-full mt-2 rounded-md bg-slate-700 dark:bg-slate-600 hover:brightness-110 disabled:opacity-60 text-white text-sm font-medium py-2 px-4 transition-colors cursor-pointer"
      >
        {pending
          ? "Registering..."
          : state?.ok && /Redirecting/i.test(state.message)
          ? "Redirecting..."
          : "Register"}
      </button>

      {state && (
        <p
          className={`text-center text-sm mt-2 ${
            state.ok ? "text-green-500" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <button
        type="button"
        onClick={() => router.push("/login?mode=login")}
        className="w-full mt-2 rounded-md bg-stone-200 dark:bg-slate-700 hover:brightness-110 text-slate-900 dark:text-white text-sm font-medium py-2 px-4 transition-colors cursor-pointer"
      >
        Back to Login
      </button>
    </form>
  );
}
