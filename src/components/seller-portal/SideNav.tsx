"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string; icon?: React.ReactNode }[] = [
  { href: "/seller-portal", label: "Overview" },
  { href: "/seller-portal/products", label: "Products" },
  { href: "/seller-portal/account", label: "Account" },
];

export default function SideNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Seller navigation"
      className="h-full rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow p-4"
    >
      <ul className="space-y-1 flex flex-col h-full">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-slate-700 text-white shadow"
                      : "text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
                  }
                `}
              >
                {label}
              </Link>
            </li>
          );
        })}
        {/* Spacer to ensure nav occupies full height when content is short */}
        <li className="flex-1" aria-hidden="true" />
      </ul>
    </nav>
  );
}
