import Link from "next/link";
import React from "react";

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
};

function NavButton({ children, href }: NavButtonProps) {
  return (
    <Link
      href={href}
      className="text-white px-2 py-1 rounded transition-colors duration-200 hover:bg-slate-600 dark:hover:bg-slate-700 hover:text-amber-300 dark:hover:text-amber-300"
    >
      {children}
    </Link>
  );
}

export default NavButton;