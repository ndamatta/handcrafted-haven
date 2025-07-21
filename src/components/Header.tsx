import React from "react";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-white dark:bg-zinc-900 shadow flex items-center justify-between">
      <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Handcrafted Haven</span>
      <nav className="space-x-4">
        <a href="#features" className="text-gray-700 dark:text-gray-200 hover:underline">Features</a>
        <a href="#products" className="text-gray-700 dark:text-gray-200 hover:underline">Products</a>
      </nav>
    </header>
  );
}
