import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://handcrafted-haven.com"), // Replace with your actual domain
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
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
        </CartProvider>
      </body>
    </html>
  );
}