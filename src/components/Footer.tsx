import React from "react";

function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-slate-700 border-t border-slate-400 flex flex-col items-center gap-2 mt-8">
      <p className="text-sm text-white">
        &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
