import React from "react";

type NavButtonProps = {
  children: React.ReactNode;
  href: string;
};

function NavButton({ children, href }: NavButtonProps) {
  return (
    <a
      href={href}
      className="text-white px-2 py-1 rounded transition-all hover:bg-slate-800"
    >
      {children}
    </a>
  );
}

export default NavButton;
