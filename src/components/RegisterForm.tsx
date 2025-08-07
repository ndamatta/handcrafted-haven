"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions";

export default function RegisterForm() {
  const router = useRouter();
  const [errorMessage, formAction, isPending] = useActionState(
    registerUser,
    undefined
  );

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto w-full bg-white dark:bg-zinc-900 rounded-xl shadow p-6 space-y-4"
    >
      <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Create an account
      </h1>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Enter your email"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Enter your name"
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
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
          className="w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full mt-2 rounded-md bg-slate-700 hover:brightness-130 duration-200 text-white text-sm font-medium py-2 px-4 transition-colors cursor-pointer"
      >
        {isPending ? "Registering..." : "Register"}
      </button>

      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-2">{errorMessage}</p>
      )}

      <button
        type="button"
        onClick={() => router.push("/login?mode=login")}
        className="w-full mt-2 rounded-md bg-gray-300 hover:bg-gray-400 duration-200 text-gray-700 text-sm font-medium py-2 px-4 transition-colors cursor-pointer"
      >
        Back to Login
      </button>
    </form>
  );
}
