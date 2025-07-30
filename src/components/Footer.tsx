import React from "react";

function Footer() {
  return (
    <footer className="w-full py-6 px-6 bg-slate-700 border-t border-slate-400 flex flex-col items-center gap-2 mt-8">
      <p className="text-sm text-white">
        &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
      </p>
      {/* Social media links */}
      <div className="flex gap-4 mt-2">
        {/* Twitter */}
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:underline">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-blue-400">
            <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37c-.83.5-1.75.87-2.72 1.07A4.28 4.28 0 0 0 12 17.5c-4.5 0-7.5-3.72-7.5-7.5 0-.12 0-.24.01-.36A6.7 6.7 0 0 0 4 7.5c-.5.86-1.2 1.6-2 2.07.01.01.01.01.01.02a4.28 4.28 0 0 0 3.44 4.19c-.43.12-.88.18-1.34.18-.33 0-.65-.03-.96-.09a4.29 4.29 0 0 0 4 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.38-.01-.57A8.7 8.7 0 0 0 24 4.59a8.6 8.6 0 0 1-2.54.7z" />
          </svg>
        </a>
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:underline">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-blue-600">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" />
          </svg>
        </a>
        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:underline">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-pink-500">
            <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
