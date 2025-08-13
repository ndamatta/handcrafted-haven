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
  metadataBase: new URL("https://handcrafted-haven.com"), // Replace with your actual domain
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description: "Unique handmade creations from artisans around the world.",
  openGraph: {
    title: "Handcrafted Haven",
    description: "Unique handmade creations from artisans around the world.",
    images: "/og-image.png", // Create and add an OG image to your /public folder
    url: "https://handcrafted-haven.com", // Replace with your actual domain
    siteName: "Handcrafted Haven",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handcrafted Haven",
    description: "Unique handmade creations from artisans around the world.",
    images: ["/og-image.png"], // Create and add an OG image to your /public folder
  },
  robots: "index, follow",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
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