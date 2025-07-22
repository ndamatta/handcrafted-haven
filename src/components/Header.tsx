import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="w-full py-4 px-6 bg-slate-700 border-b border-slate-400 shadow flex items-center justify-between">
      <span className="text-xl font-bold tracking-tight text-white">
        Handcrafted Haven
      </span>
      <nav className="space-x-4">{children}</nav>
    </header>
  );
}
