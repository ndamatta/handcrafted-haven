import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import BackToTopButton from "@/components/BackToTopButton";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Unique handmade creations from artisans around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased bg-stone-100 dark:bg-slate-900 text-slate-900 dark:text-slate-400 transition-colors duration-200`}
      >
        <CartProvider>
          {children}
          {/* Add the BackToTopButton here so it's available on all pages */}
          <BackToTopButton />
        </CartProvider>
      </body>
    </html>
  );
}