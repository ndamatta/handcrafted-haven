import { MetadataRoute } from "next";
import { getAllProducts, getAllArtisans } from "@/lib/queries";
import { createArtisanSlug } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://handcrafted-haven-nu-six.vercel.app";

  // 1. Get all products
  const { products } = await getAllProducts({ page: 1, pageSize: 10000 }); // Fetch all products
  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(), // In a real app, you'd use a 'updated_at' field
  }));

  // 2. Get all artisans
  const { artisans } = await getAllArtisans({ page: 1, pageSize: 10000 }); // Fetch all artisans
  const artisanUrls = artisans.map((artisan) => ({
    url: `${baseUrl}/artisans/${createArtisanSlug(artisan.name)}`,
    lastModified: new Date(),
  }));

  // 3. Define static routes
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/artisans`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...productUrls, ...artisanUrls];
}
