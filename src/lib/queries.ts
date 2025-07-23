import postgres from 'postgres'
import { ProductType } from '@/components/Product'

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