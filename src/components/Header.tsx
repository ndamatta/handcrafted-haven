import Link from "next/link";
import NavButton from "./NavButton";

export default function Header({ children }: { children?: React.ReactNode }) {
  const defaultNavLinks = [
    { href: "#features", label: "Features" },
    { href: "#products", label: "Products" },
    { href: "/seller-portal", label: "Seller Portal" },
  ];

  return (
    <header className="w-full py-4 px-6 bg-slate-700 border-b border-slate-400 shadow flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-bold tracking-tight text-white hover:underline"
      >
        Handcrafted Haven
      </Link>
      <nav className="space-x-4">
        {children ? (
          children
        ) : (
          defaultNavLinks.map(({ href, label }) => (
            <NavButton key={href} href={href}>
              {label}
            </NavButton>
          ))
        )}
      </nav>
    </header>
  );
}