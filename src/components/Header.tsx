import React from "react";
import NavButton from "@/components/NavButton";

export default function Header() {
  return (
    <header className="w-full py-4 px-6 bg-slate-700 border-b border-slate-400 shadow flex items-center justify-between">
      <span className="text-xl font-bold tracking-tight text-white">
        Handcrafted Haven
      </span>
      <nav className="space-x-4">
        <NavButton href="/seller-portal">Seller Portal</NavButton>
        <NavButton href="#features">Features</NavButton>
        <NavButton href="#products">Products</NavButton>
      </nav>
    </header>
  );
}
