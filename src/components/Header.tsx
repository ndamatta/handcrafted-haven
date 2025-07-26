
import Link from "next/link";
import NavButton from "./NavButton";

  const defaultNavLinks = [
    { href: "#features", label: "Features" },
    { href: "#products", label: "Products" },
    { href: "/seller-portal", label: "Seller Portal" },
  ];

  return (
    <header className="w-full py-4 px-6 bg-slate-700 border-b border-slate-400 shadow flex items-center justify-between">
      {/* Site title */}
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-white hover:underline"
      >
        Handcrafted Haven
      </Link>
      {/* Navigation links */}
      <nav className="space-x-4 flex items-center">
        {children ? (
          children
        ) : (
          defaultNavLinks.map(({ href, label }) => (
            <NavButton key={href} href={href}>
              {label}
            </NavButton>
          ))
        )}
        {/* User profile/avatar button (placeholder) */}
        <button
          type="button"
          aria-label="User Profile"
          className="ml-2 rounded-full bg-slate-600 hover:bg-slate-500 p-2 flex items-center justify-center"
        >
          {/* Simple user icon SVG */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-3.333 5.333-5 8-5s8 1.667 8 5" />
          </svg>
        </button>
        {/* Mobile menu button (hamburger icon, visible on small screens) */}
        <button
          type="button"
          aria-label="Open menu"
          className="ml-2 p-2 rounded bg-slate-600 hover:bg-slate-500 sm:hidden"
        >
          {/* Hamburger icon SVG */}
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </nav>
    </header>
  );
}