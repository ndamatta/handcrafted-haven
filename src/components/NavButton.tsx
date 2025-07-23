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
      className="text-white px-2 py-1 rounded transition-all hover:bg-slate-800"
    >
      {children}
    </Link>
  );
}

export default NavButton;
