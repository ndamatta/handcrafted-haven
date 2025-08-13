import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://handcrafted-haven-nu-six.vercel.app"; // Use production URL

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/seller-portal/", // Disallow indexing of seller-specific pages
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
