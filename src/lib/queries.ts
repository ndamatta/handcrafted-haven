import postgres from 'postgres'
import { ProductType } from '@/components/Product'
import { Review } from '@/components/ProductReview'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

export async function getProductBySlug(slug: string) {
  const result = await sql`
    SELECT * FROM products WHERE slug = ${slug} LIMIT 1
  `
  return result[0] || null
}

export async function getAllProducts(): Promise<ProductType[]> {
  const result = await sql`
    SELECT * FROM products
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

export async function getReviewsByProductId(productId: number): Promise<Review[]> {
  const result = await sql`
    SELECT user, comment, rating, date FROM reviews WHERE product_id = ${productId} ORDER BY date DESC
  `;

  return result.map(row => ({
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
  `
}
