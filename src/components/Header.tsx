"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import CartIcon from "./CartIcon";
import SearchBar from "./SearchBar";
import { ProductType } from "./Product";
import { signOutAction } from "@/lib/actions";

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
  const defaultNavLinks = [
    { href: "/products", label: "Products" },
    { href: "/artisans", label: "Artisans" },
    { href: "/seller-portal", label: "Seller Portal" },
  ];

  const toggleMobileMenu = () => {
    const menu = document.getElementById("mobileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-amber-400 dark:bg-amber-300 text-slate-900 dark:text-slate-800 px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a>

      <header className="w-full bg-slate-700 dark:bg-slate-800 border-b border-slate-600 dark:border-slate-700 shadow transition-colors duration-200">
        <div className="flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 text-xl font-bold tracking-tight text-white hover:text-amber-300 transition-colors duration-200"
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

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar products={products} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center space-x-4" aria-label="Main navigation">
            {children
              ? children
              : defaultNavLinks.map(({ href, label }) => (
                  <NavButton key={href} href={href}>
                    {label}
                  </NavButton>
                ))}
            {isLoggedIn && (
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-md border border-stone-200 dark:border-slate-600 bg-stone-50 dark:bg-slate-700 text-slate-900 dark:text-slate-400 py-2 px-4 text-sm font-medium hover:bg-stone-100 dark:hover:bg-slate-600 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </form>
            )}
            <CartIcon />
          </nav>

          {/* Mobile Burger Button */}
          <div className="sm:hidden flex items-center justify-end">
            <button
              type="button"
              aria-label="Toggle mobile menu"
              className="p-2 rounded bg-slate-600 hover:bg-slate-500 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200"
              onClick={toggleMobileMenu}
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
          </div>
        </div>

        {/* Mobile Menu */}
        <div id="mobileMenu" className="sm:hidden px-4 pb-4 space-y-3 hidden">
          <SearchBar products={products} />
          <div className="flex flex-col space-y-2">
            {children
              ? children
              : defaultNavLinks.map(({ href, label }) => (
                  <NavButton key={href} href={href}>
                    {label}
                  </NavButton>
                ))}

            {isLoggedIn && (
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="rounded-md border border-stone-200 dark:border-slate-600 bg-stone-50 dark:bg-slate-700 text-slate-900 dark:text-slate-400 py-2 px-4 text-sm font-medium hover:bg-stone-100 dark:hover:bg-slate-600 transition-colors duration-200 w-full text-left"
                >
                  Sign Out
                </button>
              </form>
            )}

            {/* Mobile Cart Icon */}
            <CartIcon />
          </div>
        </div>
      </header>
    </>
  );
}