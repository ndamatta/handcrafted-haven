import React from "react";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
