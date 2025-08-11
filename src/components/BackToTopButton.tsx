
// src/components/BackToTopButton.tsx
"use client";

import { useEffect, useState } from "react";

/**
 * A button that appears when the user scrolls down the page and allows them to
 * quickly scroll back to the top.
 */
export default function BackToTopButton() {
  // State to track whether the button should be visible
  const [isVisible, setIsVisible] = useState(false);

  // Effect to add and remove the scroll event listener
  useEffect(() => {
    // Function to check the scroll position and update the state
    const toggleVisibility = () => {
      // Show the button if the user has scrolled down more than 300 pixels
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("scroll", toggleVisibility);

    // Remove the event listener when the component unmounts
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for a smooth scrolling experience
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-slate-700 text-white hover:bg-slate-800 transition-colors shadow-lg"
          aria-label="Go to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}
