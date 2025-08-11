"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import { signOut } from "@/../auth";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import { ProductType } from "./Product";

interface HeaderProps {
  isLoggedIn?: boolean;
  children?: React.ReactNode;
  products?: ProductType[];
}

export default function Header({
  isLoggedIn = false,
  children,
  products = [],
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const defaultNavLinks = [
    { href: "/products", label: "Products" },
    { href: "/seller-portal", label: "Seller Portal" },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-yellow-300 text-black px-4 py-2 rounded z-50"
        tabIndex={0}
      >
        Skip to main content
      </a>
      <header
        className="w-full py-4 px-6 bg-slate-700 border-b border-slate-400 shadow flex items-center justify-between"
        role="banner"
      >
        <Link
          href="/"
          className="flex items-center space-x-3 text-xl font-bold tracking-tight text-white hover:underline"
          tabIndex={0}
        >
          <Image
            src="/logo.svg"
            alt="Handcrafted Haven logo"
            width={40}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span>Handcrafted Haven</span>
        </Link>
        {/* Search Bar */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchBar products={products} />
        </div>

        {/* Navigation links with ARIA label */}
        <nav className="space-x-4 flex items-center" aria-label="Main navigation">
          <div className="hidden sm:flex items-center space-x-4">
            {children
              ? children
              : defaultNavLinks.map(({ href, label }) => (
                  <NavButton key={href} href={href}>
                    {label}
                  </NavButton>
                ))}
          </div>

          {isLoggedIn && (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="inline-block"
            >
              <button
                type="submit"
                className="rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 py-2 px-4 text-sm font-medium hover:bg-amber-100 dark:hover:bg-zinc-700 transition-colors"
              >
                Sign Out
              </button>
            </form>
          )}
          {/* Cart Icon */}
          <CartIcon />

          {/* User profile/avatar button (placeholder) */}
          <button
            type="button"
            aria-label="User Profile"
            className="ml-2 rounded-full bg-slate-600 hover:bg-slate-500 p-2 flex items-center justify-center"
            tabIndex={0}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-3.333 5.333-5 8-5s8 1.667 8 5" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Open menu"
            className="ml-2 p-2 rounded bg-slate-600 hover:bg-slate-500 sm:hidden"
            tabIndex={0}
            onClick={() => setIsMenuOpen(true)}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </nav>
      </header>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-800 p-6">
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                className="p-2 rounded bg-slate-600 hover:bg-slate-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="mt-6">
              <SearchBar products={products} />
            </div>
            <nav className="mt-6 flex flex-col space-y-4">
              {children
                ? children
                : defaultNavLinks.map(({ href, label }) => (
                    <NavButton key={href} href={href}>
                      {label}
                    </NavButton>
                  ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
