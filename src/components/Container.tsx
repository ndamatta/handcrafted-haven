
// Container component to center and constrain page content
import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    // Wrapper div to center content and provide responsive padding
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Render any child components or content passed to Container */}
      {children}
    </div>
  );
}
