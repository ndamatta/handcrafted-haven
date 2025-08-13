// Custom 404 error page for better user experience
import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404: Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-100 dark:bg-slate-900 transition-colors duration-200">
      <h1 className="text-5xl font-bold text-rose-600 dark:text-rose-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-slate-900 dark:text-white">
        Page Not Found
      </h2>
      <p className="text-slate-500 dark:text-slate-400 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-slate-700 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-6 py-2 rounded font-semibold transition-colors duration-200"
      >
        Go Home
      </Link>
    </div>
  );
}