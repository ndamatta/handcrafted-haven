// Custom 404 error page for better user experience
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-white">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-800"
      >
        Go Home
      </Link>
    </div>
  );
}
