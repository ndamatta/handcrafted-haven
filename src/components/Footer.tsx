import React from "react";

function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-slate-700 dark:bg-slate-800 border-t border-slate-600 dark:border-slate-700 flex flex-col items-center gap-2 mt-8 transition-colors duration-200">
      <p className="text-sm text-white">
        &copy; {new Date().getFullYear()} Handcrafted Haven
      </p>
      <div className="flex gap-4 mt-2">
        {/* Twitter */}
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:opacity-75 transition-opacity duration-200"
        >
          <img
            src="/twitter.svg"
            alt="Twitter icon"
            className="h-6 w-6"
          />
        </a>
        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:opacity-75 transition-opacity duration-200"
        >
          <img
            src="/facebook.svg"
            alt="Facebook icon"
            className="h-6 w-6"
          />
        </a>
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:opacity-75 transition-opacity duration-200"
        >
          <img
            src="/instagram.svg"
            alt="Instagram icon"
            className="h-6 w-6"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;