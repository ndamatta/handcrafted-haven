
// Footer component for site-wide information and external links
import React from "react";

  return (
    // Main footer bar with copyright and external resource links
    <footer className="w-full py-6 px-6 bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 flex flex-col items-center gap-2 mt-8">
      {/* Copyright notice with dynamic year */}
      <p className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
      {/* External links to Next.js and Vercel */}
      <div className="flex gap-4">
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600 dark:text-gray-300">Powered by Next.js</a>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600 dark:text-gray-300">Hosted on Vercel</a>
      </div>
    </footer>
  );
}
