import postgres from "postgres";
import { ProductType } from "@/components/Product";
import { Review } from "@/components/ProductReview";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function getProductBySlug(slug: string) {
  const result = await sql`
    SELECT * FROM products WHERE slug = ${slug} LIMIT 1
  `;
  return result[0] || null;
}

export async function getAllProducts({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<ProductType[]> {
  const offset = (page - 1) * pageSize;
  const result = await sql`
<<<<<<< HEAD
    SELECT * FROM products
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;
  return result.map((row) => ({
=======
    SELECT * FROM products ORDER BY id DESC
  `
  return result.map(row => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artist_name: row.artist_name,
  }))
}

export async function searchProducts(query: string): Promise<ProductType[]> {
  const searchTerm = `%${query}%`
  const result = await sql`
    SELECT * FROM products 
    WHERE name ILIKE ${searchTerm} 
    OR description ILIKE ${searchTerm} 
    OR artist_name ILIKE ${searchTerm}
    ORDER BY name ASC
  `
  return result.map(row => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artist_name: row.artist_name,
  }))
}

export async function getProductsByArtist(artistName: string): Promise<ProductType[]> {
  const result = await sql`
    SELECT * FROM products 
    WHERE artist_name = ${artistName}
    ORDER BY id DESC
  `
  return result.map(row => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artist_name: row.artist_name,
  }))
}

export async function getProductsByPriceRange(minPrice: number, maxPrice: number): Promise<ProductType[]> {
  const result = await sql`
    SELECT * FROM products 
    WHERE price >= ${minPrice} AND price <= ${maxPrice}
    ORDER BY price ASC
  `
  return result.map(row => ({
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artist_name: row.artist_name,
  }))
}

export async function getRecentProducts(limit: number = 8): Promise<ProductType[]> {
  const result = await sql`
    SELECT * FROM products 
    ORDER BY id DESC 
    LIMIT ${limit}
  `
  return result.map(row => ({
>>>>>>> 7a021a30123585db3c996e4233d6925e4b643766
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    artist_name: row.artist_name,
  }));
}

export async function getReviewsByProductId(
  productId: number
): Promise<Review[]> {
  const result = await sql`
    SELECT user, comment, rating, date FROM reviews WHERE product_id = ${productId} ORDER BY date DESC
  `;

  return result.map((row) => ({
    user: row.user,
    comment: row.comment,
    rating: Number(row.rating),
    date: row.date.toISOString(),
  }));
}

export async function addReview(
  productId: number,
  user: string,
  comment: string,
  rating: number
): Promise<void> {
  await sql`
    INSERT INTO reviews (product_id, user, comment, rating, date)
    VALUES (${productId}, ${user}, ${comment}, ${rating}, NOW())
  `;
}

export async function getTotalProducts(): Promise<number> {
  const result = await sql`SELECT COUNT(*) FROM products`;
  return Number(result[0].count);
}

export async function getProductStats() {
  const result = await sql`
    SELECT 
      COUNT(*) as total_products,
      COUNT(DISTINCT artist_name) as total_artists,
      AVG(price) as avg_price,
      MIN(price) as min_price,
      MAX(price) as max_price
    FROM products
  `
  return result[0]
}
