import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.pixabay.com",
      "i.imgur.com",
      "res.cloudinary.com",
      "www.google.com",
    ],
  },
};

export default nextConfig;
